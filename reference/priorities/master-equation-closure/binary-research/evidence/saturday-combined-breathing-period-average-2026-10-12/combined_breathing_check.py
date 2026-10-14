#!/usr/bin/env python3
"""Saturday continuation round 2026-10-12, breathing stage: checks of the exact
identities for the combined breathing integral  Btilde = oint H d(r/J),
H = Q/8 - Phi(b1) - Phi(b2).

Standard library only.  Usage:  combined_breathing_check.py OUT.json

Imports the frozen Z0 instrument (sibling evidence folder) for its path class, its
integrand routine and its exact-rational helpers; does not modify it.

Statements checked (all kinematic: they hold on prescribed rigidly repeating paths, with
the paths' own accelerations in place of rows):
  N   oint F(J/r) d(r/J) = 0                      (null weights)
  S   Phi(b1)+Phi(b2)-2Phi(d/2) = m^2 * int_{-1}^{1} (1-|s|) phi2(d/2 + s m) ds,
      d = b1-b2, m = (b1+b2)/2, phi2(b) = (1-b^2)^(-3/2) - 1
  W   -(1+2 phi2(wmax)) Pperp^2/8 <= H' <= Ppar^2/8,  H' = Q/8 - [Phi(b1)+Phi(b2)-2Phi(d/2)]
  B   oint H d(r/J) = oint H' d(r/J)
  C   Lambda_kin + Btilde = -C0 + T1 + T3, with Lambda_kin = oint (r/(4J)) (Apar Ppar -
      Aperp Pperp) dt formed from the paths' own accelerations and
      C0 = oint (u1/S1 + u2/S2)(b1+b2)/(2r) dt
Prescribed paths do not obey the equation; nothing here is a statement about solutions.
Known cases run first; a failed known case stops the run before any target (exit 2).
"""
import importlib.util
import json
import math
import os
import random
import sys
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))
Z0_PATH = os.path.join(HERE, "..", "saturday-straight-strength-period-average-2026-10-12",
                       "straight_strength_identity_check.py")
spec = importlib.util.spec_from_file_location("z0", Z0_PATH)
z0 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(z0)

Phi, g, trap = z0.Phi, z0.g, z0.trapezoid_period


def phi2(b):
    return (1.0 - b * b) ** -1.5 - 1.0


def phi_stable(x):
    return x ** 4 / (2.0 * (1.0 + math.sqrt(1.0 - x * x)) ** 2)


def simpson(f, a, b, n=2000):
    h = (b - a) / n
    s = f(a) + f(b)
    for k in range(1, n):
        s += (4 if k % 2 else 2) * f(a + k * h)
    return s * h / 3


def second_difference_integral(d, m):
    f = lambda s: (1.0 - abs(s)) * phi2(d / 2 + s * m)
    return m * m * (simpson(f, -1.0, 0.0) + simpson(f, 0.0, 1.0))


class MirrorPair:
    """x1 = -x2 = rho(t) (cos th(t), sin th(t)); zero common velocity; breathing."""

    def __init__(self, om, rho0, e, k, drift_phase):
        self.om, self.rho0, self.e, self.k, self.ph = om, rho0, e, k, drift_phase
        self.period = 2.0 * math.pi / om

    def state(self, t):
        om = self.om
        rho = self.rho0 * (1.0 + self.e * math.cos(self.k * om * t + self.ph))
        rhod = -self.rho0 * self.e * self.k * om * math.sin(self.k * om * t + self.ph)
        rhodd = -self.rho0 * self.e * (self.k * om) ** 2 * math.cos(self.k * om * t + self.ph)
        th = om * t + 0.3 * math.sin(om * t)
        thd = om * (1.0 + 0.3 * math.cos(om * t))
        thdd = -0.3 * om * om * math.sin(om * t)
        # member 1 at +rho e_r, member 2 at -rho e_r: r = 2 rho, axis e_r
        r = 2.0 * rho
        u1, b1 = rhod, rho * thd
        u2, b2 = -rhod, -rho * thd
        q1 = rho * thdd + 2.0 * rhod * thd
        q2 = -q1
        ar1 = rhodd - rho * thd * thd
        J = r * (b1 - b2)
        return {"r": r, "u": (u1, u2), "b": (b1, b2), "q": (q1, q2), "J": J,
                "rdot": u1 - u2, "Jdot": r * (q1 - q2), "apar": (ar1, -ar1),
                "speed": math.hypot(rhod, rho * thd)}


def add_apar(pr, t, st):
    """Accelerations along the axis for a z0.Pair state."""
    x1, x2 = pr._eval(0, t, 0), pr._eval(1, t, 0)
    a1, a2 = pr._eval(0, t, 2), pr._eval(1, t, 2)
    rx, ry = x1[0] - x2[0], x1[1] - x2[1]
    r = math.hypot(rx, ry)
    e = (rx / r, ry / r)
    st["apar"] = (e[0] * a1[0] + e[1] * a1[1], e[0] * a2[0] + e[1] * a2[1])
    return st


def integrands(st):
    r, u, b, q, J = st["r"], st["u"], st["b"], st["q"], st["J"]
    Ppar, Pperp = u[0] + u[1], b[0] + b[1]
    Q = Ppar * Ppar - Pperp * Pperp
    d = b[0] - b[1]
    rate = st["rdot"] / J - r * st["Jdot"] / (J * J)             # d/dt (r/J)
    H = Q / 8.0 - Phi(b[0]) - Phi(b[1])
    Hp = Q / 8.0 - (Phi(b[0]) + Phi(b[1]) - 2.0 * Phi(d / 2.0))
    out = {"Btilde": H * rate, "Bprime": Hp * rate, "rate": rate, "H": H, "Hp": Hp,
           "Ppar": Ppar, "Pperp": Pperp, "d": d,
           "null_d2": d * d * rate, "null_phi": 2.0 * Phi(d / 2.0) * rate,
           "null_sin": math.sin(3.0 * d) * rate}
    S1, S2 = math.sqrt(1 - b[0] ** 2), math.sqrt(1 - b[1] ** 2)
    out["C0"] = (u[0] / S1 + u[1] / S2) * Pperp / (2.0 * r)
    g1, g2 = g(b[0]), g(b[1])
    out["T1"] = (r / J) * (b[0] * g1 * q[0] + b[1] * g2 * q[1])
    out["T3"] = -0.5 * (g1 * q[0] - g2 * q[1])
    if "apar" in st:
        Apar, Aperp = st["apar"][0] + st["apar"][1], q[0] + q[1]
        out["Lambda"] = (r / (4.0 * J)) * (Apar * Ppar - Aperp * Pperp)
    return out


def period_integrals(state_fn, period, n, keys):
    acc = {k: 0.0 for k in keys}
    for j in range(n):
        v = integrands(state_fn(period * j / n))
        for k in keys:
            acc[k] += v[k]
    return {k: acc[k] * period / n for k in keys}


def known_cases(rng):
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 hand values: phi2(3/5) = (16/25)^(-3/2) - 1 = 125/64 - 1 = 61/64; phi2(0) = 0
    rec("K1 phi2(3/5)=61/64, phi2(0)=0", abs(phi2(0.6) - 61 / 64) < 1e-14 and phi2(0.0) == 0.0, phi2(0.6))
    worst = 0.0
    for _ in range(200):
        b = rng.uniform(-0.9, 0.9)
        h = 1e-3
        second = (-Phi(b + 2 * h) + 16 * Phi(b + h) - 30 * Phi(b) + 16 * Phi(b - h) - Phi(b - 2 * h)) / (12 * h * h)
        worst = max(worst, abs(second - phi2(b)))
    rec("K1 Phi'' = phi2 by five-point second differences (200 points)", worst < 1e-6, worst)
    # K2 Simpson on a known integral: int_{-1}^{1} (1-|s|) ds = 1; int_0^1 s^2 ds = 1/3
    one = simpson(lambda s: 1.0 - abs(s), -1.0, 0.0) + simpson(lambda s: 1.0 - abs(s), 0.0, 1.0)
    rec("K2 Simpson: int (1-|s|) = 1, int_0^1 s^2 = 1/3",
        abs(one - 1.0) < 1e-13 and abs(simpson(lambda s: s * s, 0.0, 1.0) - 1 / 3) < 1e-13, one)
    # K3 second-difference identity at d = 0: 2 Phi(m) = m^2 int (1-|s|) phi2(s m) ds; hand value 2 Phi(3/5) = 1/25
    val = second_difference_integral(0.0, 0.6)
    rec("K3 second-difference integral at d=0, m=3/5 equals 2 Phi(3/5) = 1/25", abs(val - 0.04) < 1e-10, val)
    # K4 periodic trapezoid (the imported rule) on oint cos^2 = pi
    rec("K4 imported trapezoid: oint cos^2 = pi", abs(trap(lambda t: math.cos(t) ** 2, 2 * math.pi, 64) - math.pi) < 1e-13)
    # K5 hand-known family 1: drift plus rigid rotation, r/J constant: every breathing integral is 0
    worst = 0.0
    for _ in range(10):
        V = (rng.uniform(-0.3, 0.3), rng.uniform(-0.3, 0.3))
        pr = z0.Pair(V, rng.uniform(0.02, 0.2), [(1, rng.uniform(0.5, 2.0), 0.0)], [(1, rng.uniform(0.5, 2.0), math.pi)])
        ints = period_integrals(pr.state, pr.period, 512, ("Btilde", "Bprime"))
        worst = max(worst, abs(ints["Btilde"]), abs(ints["Bprime"]))
    rec("K5 rigid rotation with drift: Btilde = 0", worst < 1e-13, worst)
    # K6 hand-known family 2: mirror pair with zero common velocity and real breathing.
    # Q = 0 and H = -2 Phi(J/(2r)) is a function of J/r alone, so oint H d(r/J) = 0 by the
    # antiderivative, although H and the rate of r/J are not zero.
    worst, biggest, var = 0.0, 0.0, 0.0
    for _ in range(10):
        mp = MirrorPair(rng.uniform(0.05, 0.3), rng.uniform(0.5, 2.0), rng.uniform(0.1, 0.4), rng.choice((1, 2, 3)), rng.uniform(0, 6.28))
        n = 2048
        ints = period_integrals(mp.state, mp.period, n, ("Btilde",))
        tv = sum(abs(integrands(mp.state(mp.period * j / n))["rate"]) for j in range(n)) * mp.period / n
        amp = max(abs(integrands(mp.state(mp.period * j / 64))["H"]) for j in range(64))
        worst = max(worst, abs(ints["Btilde"]) / max(amp * tv, 1e-300))
        biggest, var = max(biggest, amp), max(var, tv)
    rec("K6 mirror breathing pair: Btilde = 0 relative to |H|max * variation",
        worst < 1e-11 and biggest > 1e-6 and var > 1e-2, {"relative": worst, "Hmax": biggest, "variation": var})
    return ok, out


def target(rng, n_pairs):
    res = {"pairs": 0}
    worst = {"null_d2": 0.0, "null_phi": 0.0, "null_sin": 0.0, "B_eq_Bprime": 0.0, "coupling": 0.0,
             "second_difference": 0.0, "weight_upper_excess": 0.0, "weight_lower_excess": 0.0}
    signs = {"positive": 0, "negative": 0}
    ratio_max = 0.0
    rows = []
    keys = ("Btilde", "Bprime", "null_d2", "null_phi", "null_sin", "C0", "T1", "T3", "Lambda")
    for idx in range(n_pairs):
        pr = z0.random_breathing_pair(rng)
        sf = lambda t, pr=pr: add_apar(pr, t, pr.state(t))
        n = 4096
        I = period_integrals(sf, pr.period, n, keys)
        tv = 0.0
        wmax = 0.0
        pmax2tv = 0.0
        for j in range(n):
            st = pr.state(pr.period * j / n)
            v = integrands(st)
            tv += abs(v["rate"])
            wmax = max(wmax, st["speed"])
            pmax2tv += (v["Ppar"] ** 2 + v["Pperp"] ** 2) * abs(v["rate"])
        tv *= pr.period / n
        pmax2tv *= pr.period / n
        scale = max(abs(I["Btilde"]), 1e-3 * tv * 0.5)
        for k in ("null_d2", "null_phi", "null_sin"):
            worst[k] = max(worst[k], abs(I[k]) / max(tv, 1e-300))
        worst["B_eq_Bprime"] = max(worst["B_eq_Bprime"], abs(I["Btilde"] - I["Bprime"]) / scale)
        lhs, rhs = I["Lambda"] + I["Btilde"], -I["C0"] + I["T1"] + I["T3"]
        size = abs(I["Lambda"]) + abs(I["Btilde"]) + abs(I["C0"]) + abs(I["T1"]) + abs(I["T3"])
        worst["coupling"] = max(worst["coupling"], abs(lhs - rhs) / max(size, 1e-300))
        # pointwise checks at sampled instants
        for _ in range(20):
            st = pr.state(rng.uniform(0, pr.period))
            v = integrands(st)
            b1, b2 = st["b"]
            d, m = b1 - b2, 0.5 * (b1 + b2)
            direct = phi_stable(b1) + phi_stable(b2) - 2.0 * phi_stable(d / 2.0)
            worst["second_difference"] = max(worst["second_difference"], abs(direct - second_difference_integral(d, m)))
            wloc = max(abs(b1), abs(b2))
            Hp = v["Ppar"] ** 2 / 8.0 - v["Pperp"] ** 2 / 8.0 - direct
            worst["weight_upper_excess"] = max(worst["weight_upper_excess"], Hp - v["Ppar"] ** 2 / 8.0)
            worst["weight_lower_excess"] = max(worst["weight_lower_excess"],
                                               -(1 + 2 * phi2(wloc)) * v["Pperp"] ** 2 / 8.0 - Hp)
        kB = (1 + 2 * phi2(wmax)) / 8.0
        ratio_max = max(ratio_max, abs(I["Btilde"]) / (kB * pmax2tv))
        signs["positive" if I["Btilde"] > 0 else "negative"] += 1
        res["pairs"] += 1
        if idx < 6:
            rows.append({"Btilde": I["Btilde"], "Lambda_kin": I["Lambda"], "C0": I["C0"], "T1": I["T1"],
                         "T3": I["T3"], "variation_of_r_over_J": tv,
                         "Btilde_over_kB_int_P2_dx": abs(I["Btilde"]) / (kB * pmax2tv)})
    res["max_relative_defects"] = worst
    res["thresholds"] = {"null (relative to variation)": 1e-11, "B_eq_Bprime": 1e-9, "coupling": 1e-9,
                         "second_difference (absolute)": 1e-9, "weight excess (absolute)": 1e-14}
    res["sign_counts_of_Btilde"] = signs
    res["max |Btilde| / (kB * oint |P|^2 |d(r/J)|)"] = ratio_max
    res["first_rows"] = rows
    res["pass"] = bool(max(worst["null_d2"], worst["null_phi"], worst["null_sin"]) < 1e-11
                       and worst["B_eq_Bprime"] < 1e-9 and worst["coupling"] < 1e-9
                       and worst["second_difference"] < 1e-9 and worst["weight_upper_excess"] < 1e-14
                       and worst["weight_lower_excess"] < 1e-14 and ratio_max <= 1.0 + 1e-12)
    return res


def table():
    rows = []
    for w in (Fr(1, 100), Fr(1, 50), Fr(1, 20), Fr(1, 10), Fr(1, 8), Fr(7, 50), Fr(1, 5), Fr(1, 4), Fr(3, 10)):
        s_lo, _ = z0.sqrt_bounds(w)
        p2 = 1 / s_lo ** 3 - 1                      # upper bound of phi2(w)
        kB = (1 + 2 * p2) / 8
        rows.append({"w": f"{w.numerator}/{w.denominator}", "phi2(w)<=": str(z0.ceil_sig(p2, 4)),
                     "kB(w)<=": str(z0.ceil_sig(kB, 4)),
                     "c1=(1+w)^2/(1-w)": str(z0.ceil_sig((1 + w) ** 2 / (1 - w), 4)),
                     "c2=(3w+w^3)/(1-w^2)": str(z0.ceil_sig((3 * w + w ** 3) / (1 - w * w), 4)),
                     "c3=(1+w)^3/(1-3w)^2": str(z0.ceil_sig((1 + w) ** 3 / (1 - 3 * w) ** 2, 4)),
                     "1/alpha=(1+w)/(1-w)^2": str(z0.ceil_sig((1 + w) / (1 - w) ** 2, 4))})
    return rows


def main():
    out_path = sys.argv[1]
    rng = random.Random(2026101202)
    res = {"instrument": "combined_breathing_check.py",
           "note": "prescribed paths; kinematics, algebra and transcription only"}
    ok, known = known_cases(rng)
    res["known_cases"], res["known_cases_pass"] = known, ok
    print("KNOWN CASES")
    for k, v in known.items():
        print(("  PASS  " if v["pass"] else "  FAIL  ") + k + "   " + json.dumps(v["detail"]))
    if not ok:
        res["targets"] = "not run: a known case failed"
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        print("KNOWN CASE FAILED - targets not run")
        return 2
    s_lo, s_hi = z0.sqrt_bounds(Fr(3, 5))
    ctrl = (s_lo == Fr(4, 5) and 1 / s_lo ** 3 - 1 == Fr(61, 64) and (1 + 2 * Fr(61, 64)) / 8 == Fr(93, 256))
    res["exact_constant_controls_pass"] = bool(ctrl)
    print("EXACT CONSTANT CONTROLS", "PASS" if ctrl else "FAIL")
    if not ctrl:
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        return 2
    tg = target(rng, 40)
    tab = table()
    res["target"], res["table"] = tg, tab
    print("TARGET", json.dumps(tg, indent=1))
    print("TABLE (exact rational, rounded up)")
    for r in tab:
        print(json.dumps(r))
    res["targets_pass"] = bool(tg["pass"])
    with open(out_path, "w") as fh:
        json.dump(res, fh, indent=1)
    print("TARGETS PASS" if res["targets_pass"] else "TARGET FAILURE")
    return 0 if res["targets_pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
