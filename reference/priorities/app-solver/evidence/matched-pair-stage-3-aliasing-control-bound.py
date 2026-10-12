"""Exact-rational bracket of the true receiver end state for the aliasing control.

Separately authored from the solver: no solver import, no floating arithmetic in
any bound. It reads only the published end intervals from the control's JSON
output and converts each binary64 endpoint to its exact rational value.

Setting (c_f = 1, everything on the z axis). A receiver of charge 1 rests at the
origin until T = 0. One source of charge 1 has the prescribed past
z_s(S) = R + A p(S), p of period 1, p(u) = 12 u^2 - 16 u^3 on [0, 1/2] and
p(u) = p(1 - u) on [1/2, 1]. For a receiver at z = zeta <= 0 and reception
time t the causal root S solves t - S = z_s(S) - zeta, the transmitter factor
is D = 1 + z_s'(S), and the canonical acceleration is
a(t, zeta) = -kappa / ((z_s(S) - zeta)^2 D).

Bound 1 (fixed receiver). With zeta = 0, dt/dS = D > 0, so
integral_0^h a(t, 0) dt = -kappa * integral_{S(0)}^{S(h)} dS / z_s(S)^2.
For integer h, S(0) = -R and S(h) = h - R, so the integral is h * I with
I = integral_0^1 du / (R + A p(u))^2 = 2 * integral_0^{1/2} du / (R + A p(u))^2.
p increases on [0, 1/2], so left and right Riemann sums bracket I.

Bound 2 (receiver motion). a <= 0 throughout, so zeta(t) <= 0, the distance
is >= R, D >= 1 - 3A, |a| <= kappa / (R^2 (1 - 3A)) and
|zeta(t)| <= kappa t^2 / (2 R^2 (1 - 3A)). The function zeta -> a(t, zeta) is
Lipschitz with constant kappa * L,
L = 2 / (R^3 (1 - 3A)^2) + 24 A / (R^2 (1 - 3A)^3),
from d/dzeta [1/(r^2 D)] = 2/(r^3 D^2) - z_s''/(r^2 D^3), |z_s''| <= 24 A.
Hence |v(h) - v_fixed(h)| <= kappa^2 L h^3 / (6 R^2 (1 - 3A)) and
|z(h) - z_fixed(h)| <= kappa^2 L h^4 / (24 R^2 (1 - 3A)).

Usage: python <this file> <control-evolve-output.jsonl> [more outputs ...]
The static case (amplitude 0) is evaluated first as the known case whenever it
is among the inputs; the script exits 2 if a known check fails.
"""
import json
import sys
from fractions import Fraction as Q

DIGITS = 40
SCALE = 10 ** DIGITS


def down(x):
    return Q((x.numerator * SCALE) // x.denominator, SCALE)


def up(x):
    return Q(-((-x.numerator * SCALE) // x.denominator), SCALE)


def p_rise(u):
    return 12 * u * u - 16 * u * u * u


def riemann(f_decreasing, cells):
    """Bracket integral_0^{1/2} f for f decreasing on [0, 1/2]."""
    lower = Q(0)
    upper = Q(0)
    width = Q(1, 2 * cells)
    previous = f_decreasing(Q(0))
    for k in range(1, cells + 1):
        current = f_decreasing(k * width)
        if current > previous:
            raise SystemExit("integrand is not decreasing; bracket invalid")
        upper += up(previous * width)
        lower += down(current * width)
        previous = current
    return lower, upper


def weighted(R, A, cells):
    """Bracket integral_0^1 (3 - 2 t(u)) du / (R + A p(u))^2 for h = 2.

    t(u) = u + A p(u) is the reception time of the emission at S = u - R for a
    fixed receiver, and integral_0^2 (2 - t) a dt folds to this by period 1.
    Each cell uses interval bounds from the monotone pieces of p.
    """
    lower = Q(0)
    upper = Q(0)
    width = Q(1, 2 * cells)
    for half in (0, 1):
        for k in range(cells):
            u0 = Q(half, 2) + k * width
            u1 = u0 + width
            if half == 0:
                p0, p1 = p_rise(u0), p_rise(u1)
            else:
                p1, p0 = p_rise(1 - u0), p_rise(1 - u1)
            if not p0 <= p1:
                raise SystemExit("p cell bounds out of order")
            t_low, t_high = u0 + A * p0, u1 + A * p1
            w_low, w_high = 3 - 2 * t_high, 3 - 2 * t_low
            if w_low <= 0:
                raise SystemExit("weight not positive; bracket invalid")
            g_low, g_high = 1 / (R + A * p1) ** 2, 1 / (R + A * p0) ** 2
            lower += down(w_low * g_low * width)
            upper += up(w_high * g_high * width)
    return lower, upper


def known_checks():
    # Riemann bracket on a closed form: integral_0^{1/2} du/(R + 2 A u)^2
    # equals (1/R - 1/(R + A)) / (2 A).
    R, A = Q(10), Q(1, 5)
    low, high = riemann(lambda u: 1 / (R + 2 * A * u) ** 2, 2000)
    exact = (1 / R - 1 / (R + A)) / (2 * A)
    if not (low <= exact <= high and high - low < Q(1, 10 ** 6)):
        print("KNOWN CASE FAILED: closed-form Riemann bracket")
        raise SystemExit(2)
    # Static source: I is exactly 1/R^2 and the weighted integral is
    # integral_0^1 (3 - 2u) du / R^2 = 2 / R^2.
    low, high = riemann(lambda u: 1 / (R + 0 * p_rise(u)) ** 2, 50)
    if not (low <= Q(1, 200) <= high and high - low <= Q(100, SCALE)):
        print("KNOWN CASE FAILED: static I")
        raise SystemExit(2)
    low, high = weighted(R, Q(0), 2000)
    if not (low <= Q(2, 100) <= high and high - low < Q(1, 10 ** 4)):
        print("KNOWN CASE FAILED: static weighted integral")
        raise SystemExit(2)
    print("Known checks passed before targets: closed-form Riemann bracket;"
          " static I = 1/R^2; static weighted integral = 2/R^2.")


def bracket(record, cells=4000):
    R = Q(10)
    A = Q(record["amplitude"])
    kappa = Q(record["coupling"])
    h = Q(record["step"])
    if 3 * A >= 1:
        raise SystemExit("source speed bound 3A must be below 1")
    half_low, half_high = riemann(lambda u: 1 / (R + A * p_rise(u)) ** 2, cells)
    I_low, I_high = 2 * half_low, 2 * half_high
    floor = 1 - 3 * A
    L = 2 / (R ** 3 * floor ** 2) + 24 * A / (R ** 2 * floor ** 3)
    dv = kappa ** 2 * L * h ** 3 / (6 * R ** 2 * floor)
    dz = kappa ** 2 * L * h ** 4 / (24 * R ** 2 * floor)
    # a <= 0 and receiver recession only weakens |a| is NOT assumed; use the
    # two-sided Lipschitz bound.
    v_true = (-kappa * h * I_high - dv, -kappa * h * I_low + dv)
    out = {"I": (I_low, I_high), "L": L, "dv": dv, "dz": dz, "v_true": v_true}
    if h == 2:
        w_low, w_high = weighted(R, A, cells)
        out["z_true"] = (-kappa * w_high - dz, -kappa * w_low + dz)
    return out


def exact_interval(pair):
    return Q(pair[0]), Q(pair[1])


def gap(published, true):
    """Signed separation: positive when the intervals are disjoint."""
    return max(true[0] - published[1], published[0] - true[1])


def show(x):
    return f"{float(x):.12e}"


def main(paths):
    known_checks()
    records = []
    for path in paths:
        with open(path, encoding="utf-8") as handle:
            for line in handle:
                if line.strip():
                    records.append((path, json.loads(line)))
    records.sort(key=lambda item: Q(item[1]["amplitude"]) != 0)
    for path, record in records:
        print(f"\n{path}")
        print(f"  amplitude {record['amplitude']} coupling {record['coupling']}"
              f" step {record['step']} status {record['status']}"
              f" accepted {record['accepted_steps']}")
        if record["status"] != "completed":
            print("  not completed; no published end state to compare")
            continue
        receiver = next(p for p in record["paths"] if p["path"] == "receiver")
        b = bracket(record)
        published_v = exact_interval(receiver["velocity_z"])
        radius_v = (published_v[1] - published_v[0]) / 2
        print(f"  I in [{show(b['I'][0])}, {show(b['I'][1])}]; L = {show(b['L'])}")
        print(f"  receiver-motion corrections: velocity {show(b['dv'])},"
              f" position {show(b['dz'])}")
        print(f"  true end velocity in [{show(b['v_true'][0])},"
              f" {show(b['v_true'][1])}]")
        print(f"  published end velocity [{show(published_v[0])},"
              f" {show(published_v[1])}], half-width {show(radius_v)}")
        g = gap(published_v, b["v_true"])
        if g > 0:
            print(f"  VELOCITY: published interval EXCLUDES the true value;"
                  f" separation >= {show(g)} = {float(g / radius_v):.1f}"
                  f" published half-widths")
        else:
            print("  VELOCITY: published interval intersects the true bracket")
        if "z_true" in b:
            published_z = exact_interval(receiver["position_z"])
            radius_z = (published_z[1] - published_z[0]) / 2
            print(f"  true end position in [{show(b['z_true'][0])},"
                  f" {show(b['z_true'][1])}]")
            print(f"  published end position [{show(published_z[0])},"
                  f" {show(published_z[1])}], half-width {show(radius_z)}")
            g = gap(published_z, b["z_true"])
            if g > 0:
                print(f"  POSITION: published interval EXCLUDES the true value;"
                      f" separation >= {show(g)} = {float(g / radius_z):.1f}"
                      f" published half-widths")
            else:
                print("  POSITION: published interval intersects the true"
                      " bracket")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    main(sys.argv[1:])
