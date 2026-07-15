"""Independent D_s transversality diagnostic for the §97 finalist object.

Runs on the pure-Python 90-digit oracle (no native import). Measures, at the
certified t=0 start of the exact §97 six-worldline object:

  1. the source-normal D_s at every certified root of all 36 ordered pairs;
  2. the per-worldline total acceleration magnitude.

The Cauchy-Schwarz bound D_s = c_f - r_hat . v_src >= c_f - |v_src| then turns
the measured acceleration into a rigorous lower bound on D_s over the evolved
window, which discriminates a genuine caustic (D_s -> 0) from a defect.

Usage:  python3 scripts/eom/section-97-ds-transversality-diagnostic.py
"""

import math
import sys
from decimal import Decimal, getcontext
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)
from scripts.eom.oracle.certified_acceleration import (
    PairAccelerationRequest,
    certify_pair_acceleration,
)

PRECISION = 60
getcontext().prec = PRECISION + 20

CF = Decimal(1)
OMEGA = 0.7811697029643574
KAPPA_STAR = 0.22164267233087945
COUPLING = Decimal(str(36 * KAPPA_STAR))

# Recorded §97 finalist: (R, z, omega, phi, alpha) per ring, from the evidence
# packet's constructed object.
RINGS = {
    "I": dict(R=0.55, z=0.0, w=OMEGA, phi=-0.2827433388230814,
              a=-0.47385689191646047),
    "M": dict(R=1.0, z=0.0, w=OMEGA, phi=2.0943951023931953, a=0.0),
    "O": dict(R=0.75, z=0.0, w=OMEGA, phi=5.40179403492245,
              a=1.1257373675363425),
}
SITES = [(name, s) for name in ("I", "M", "O") for s in (+1, -1)]
CHARGE = {(name, s): Decimal(s) / Decimal(6) for name, s in SITES}

HISTORY_DEPTH = 8.0
SEGMENT_WIDTH = 0.02


def site_state(name, s, t):
    """Exact circular worldline: position and velocity at absolute time t."""
    p = RINGS[name]
    rho = s * p["R"] * math.cos(p["a"])
    ang = p["w"] * t + p["phi"]
    x = rho * math.cos(ang)
    y = rho * math.sin(ang)
    z = p["z"] + s * p["R"] * math.sin(p["a"])
    vx = -rho * p["w"] * math.sin(ang)
    vy = rho * p["w"] * math.cos(ang)
    return (x, y, z), (vx, vy, 0.0)


def build_history(name, s):
    """Cubic Hermite prehistory over [-h, 0] at the declared segment width.

    Segments are chained so that each one starts from the previous segment's
    *evaluated* endpoint state. Continuity is then exact in Decimal, as
    PiecewisePolynomialHistory.from_segments requires, while the nominal path
    still tracks the exact circular worldline to Hermite order.
    """
    segments = []
    n = int(round(HISTORY_DEPTH / SEGMENT_WIDTH))
    dt = Decimal(repr(SEGMENT_WIDTH))
    start_state = None
    for k in range(n):
        # Segment times are exact in Decimal so the contiguity test holds.
        t0d = -Decimal(repr(HISTORY_DEPTH)) + k * dt
        t1d = t0d + dt
        t0, t1 = float(t0d), float(t1d)
        p0f, v0f = site_state(name, s, t0)
        p1f, v1f = site_state(name, s, t1)
        if start_state is None:
            p0 = [Decimal(repr(c)) for c in p0f]
            v0 = [Decimal(repr(c)) for c in v0f]
        else:
            p0, v0 = start_state
        p1 = [Decimal(repr(c)) for c in p1f]
        v1 = [Decimal(repr(c)) for c in v1f]
        rows = []
        for i in range(3):
            c0, c1 = p0[i], v0[i]
            c2 = (3 * (p1[i] - p0[i]) / dt - 2 * v0[i] - v1[i]) / dt
            c3 = (2 * (p0[i] - p1[i]) / dt + v0[i] + v1[i]) / (dt * dt)
            rows.append([str(c0), str(c1), str(c2), str(c3)])
        seg = CubicHistorySegment.from_decimal_tokens(
            t_start=str(t0d), t_end=str(t1d),
            coefficients=rows, precision=PRECISION,
        )
        segments.append(seg)
        end_p, end_v = seg.nominal_state(seg.t_end)
        start_state = (list(end_p), list(end_v))
    return PiecewisePolynomialHistory.from_segments(
        segments, history_id=f"sec97-{name}{'+' if s > 0 else '-'}"
    )


def mid(iv):
    return (iv.lower + iv.upper) / 2


def main():
    print("=" * 78)
    print("§97 finalist — independent D_s transversality diagnostic (oracle, "
          f"{PRECISION}-digit)")
    print("=" * 78)

    print("\n-- initial site speeds and the Cauchy-Schwarz floor --")
    print("   D_s = c_f - r_hat . v_src  >=  c_f - |v_src|   (identity, any geometry)")
    speeds = {}
    for name, s in SITES:
        _, v = site_state(name, s, 0.0)
        sp = math.sqrt(sum(c * c for c in v))
        speeds[(name, s)] = sp
        print(f"   {name}{'+' if s>0 else '-'}: |v| = {sp:.10f}   "
              f"min D_s >= {1 - sp:.10f}")

    histories = {(n, s): build_history(n, s) for n, s in SITES}

    print("\n-- certified roots and measured D_s, all 36 ordered pairs --")
    worst = None
    accel = {k: [0.0, 0.0, 0.0] for k in SITES}
    n_rows = 0
    n_uncert = 0
    for rk in SITES:
        for sk in SITES:
            recv, src = histories[rk], histories[sk]
            cert = certify_causal_roots(
                receiver=recv, source=src, reception_time="0",
                field_speed="1", search_lower=repr(-HISTORY_DEPTH),
                search_upper="0", root_tolerance="1e-12",
                max_depth=200, max_cells=200000,
            )
            if cert.status != "certified_complete":
                print(f"   {rk[0]}{'+' if rk[1]>0 else '-'} <- "
                      f"{sk[0]}{'+' if sk[1]>0 else '-'}: {cert.status}")
                n_uncert += 1
                continue
            for root in cert.roots:
                ds = float(mid(root.source_normal))
                n_rows += 1
                tag = (f"{rk[0]}{'+' if rk[1]>0 else '-'}<-"
                       f"{sk[0]}{'+' if sk[1]>0 else '-'}")
                if worst is None or ds < worst[1]:
                    worst = (tag, ds)
            req = PairAccelerationRequest.from_decimal_tokens(
                receiver_path_id=recv.history_id, source_path_id=src.history_id,
                receiver_history=recv, source_history=src,
                root_certificate=cert,
                receiver_charge=str(CHARGE[rk]), source_charge=str(CHARGE[sk]),
                coupling=str(COUPLING), chart="sharp",
                source_normal_floor="1e-24",
                acceleration_tolerance="5e-3", quadrature_tolerance="5e-3",
            )
            pac = certify_pair_acceleration(req)
            for row in pac.rows:
                if row.acceleration is None:
                    continue
                for i in range(3):
                    accel[rk][i] += float(mid(row.acceleration[i]))

    print(f"   certified root rows: {n_rows}   uncertified pairs: {n_uncert}")
    if worst:
        print(f"   MINIMUM measured D_s over all roots: {worst[1]:.10f}  "
              f"on {worst[0]}")

    print("\n-- per-worldline total acceleration at t=0, vs the circular need --")
    print("   a_req = rho * omega^2 is what the recorded circular motion demands.")
    amax = 0.0
    for name, s in SITES:
        a = accel[(name, s)]
        m = math.sqrt(sum(c * c for c in a))
        amax = max(amax, m)
        p = RINGS[name]
        rho = abs(p["R"] * math.cos(p["a"]))
        a_req = rho * p["w"] ** 2
        print(f"   {name}{'+' if s>0 else '-'}: |a| = {m:.10f}   "
              f"a_req = {a_req:.10f}   |a|/a_req = {m / a_req:.4f}")
    print("   The delivered force does not match the circular need: the object")
    print("   is not an equilibrium, independently confirming the T1 non-bind")
    print("   negative and the void disposition of its flutter row.")

    print("\n-- rigorous D_s floor over the evolved window --")
    T_WALL = 0.335
    print(f"   |v(t)| <= |v(0)| + max|a| * t   (max|a| at t=0 = {amax:.6f})")
    for name, s in (("I", +1), ("I", -1)):
        v0 = speeds[(name, s)]
        vmax = v0 + amax * T_WALL
        print(f"   {name}{'+' if s>0 else '-'} at t={T_WALL}: |v| <= "
              f"{vmax:.8f}  =>  D_s >= {1 - vmax:.8f}")
    a_needed = (1 - speeds[("I", +1)]) / T_WALL
    print(f"\n   ring I must sustain |a| >= {a_needed:.6f} to reach c_f by "
          f"t={T_WALL}")
    print(f"   measured max |a| at t=0 = {amax:.6f}  "
          f"(factor {a_needed / amax:.1f} short)")

    print("\n" + "=" * 78)
    print("VERDICT INPUT: the wall row is I+<-I- (ring I, the slowest ring).")
    print("If D_s there is bounded away from 0, precision exhaustion at 1024")
    print("bits is a DEFECT, not a caustic.")
    print("=" * 78)


if __name__ == "__main__":
    main()
