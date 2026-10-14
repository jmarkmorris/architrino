#!/usr/bin/env python3
"""Saturday continuation round 2026-10-12, Lambda/common-motion stage: checks of the
exact decomposition of the straight-row torque over a period.

Standard library only.  Usage:  common_motion_balance_check.py OUT.json

Imports the frozen Z0 instrument (sibling evidence folder) for its path class, random
breathing pairs, trapezoid rule and exact-rational helpers; does not modify it.

Kinematic statements checked (they hold on prescribed rigidly repeating paths, with the
paths' own accelerations across the axis q_i):

  tau0 := [b1 (1 + u1/S1) - b2 (1 - u2/S2)] / r           (straight-row torque)
  P1   oint tau0 dt = Theta + oint (r/J)(b1 q1/S1 + b2 q2/S2) dt - oint (S1+S2) d(r/J)
  A1   tau0 = r (a2^0 b1 - a1^0 b2),  a1^0 = (1 - u2/S2)/r^2,  a2^0 = (1 + u1/S1)/r^2
  A2   with q1^0 = -a1^0 b2, q2^0 = -a2^0 b1:
       (r/J)(b1 q1^0/S1 + b2 q2^0/S2) = -(r Pperp^2/(4J)) K0 + (J/(4r)) K0,
       K0 = a1^0/S1 + a2^0/S2
  W    sig(b1)+sig(b2)-2 sig(d/2) lies in [Pperp^2/4, (1+phi2(wt)) Pperp^2/4], sig = 1-sqrt(1-b^2)
  P2   oint tau0 dt = Theta - Mplus0 + Mrel0 + BS + oint (r/J) sum_i (b_i/S_i)(q_i - q_i^0) dt,
       Mplus0 = oint (r Pperp^2/(4J)) K0 dt,  Mrel0 = oint (J/(4r)) K0 dt,
       BS = oint WS' d(r/J)
Prescribed paths do not obey the equation; the solution-only bounds of the note are not
tested.  Known cases run first; a failed known case stops the run (exit 2).
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


def sig(b):
    """1 - sqrt(1-b^2), cancellation-free."""
    return b * b / (1.0 + math.sqrt(1.0 - b * b))


def phi2(b):
    return (1.0 - b * b) ** -1.5 - 1.0


def pieces(st):
    r, u, b, q, J = st["r"], st["u"], st["b"], st["q"], st["J"]
    S1, S2 = math.sqrt(1 - b[0] ** 2), math.sqrt(1 - b[1] ** 2)
    Pperp, d = b[0] + b[1], b[0] - b[1]
    rate = st["rdot"] / J - r * st["Jdot"] / (J * J)
    a10, a20 = (1 - u[1] / S2) / r ** 2, (1 + u[0] / S1) / r ** 2
    K0 = a10 / S1 + a20 / S2
    q10, q20 = -a10 * b[1], -a20 * b[0]
    tau0 = (b[0] * (1 + u[0] / S1) - b[1] * (1 - u[1] / S2)) / r
    wsp = sig(b[0]) + sig(b[1]) - 2.0 * sig(d / 2.0)
    return {"tau0": tau0, "Omega": J / r ** 2,
            "accel": (r / J) * (b[0] * q[0] / S1 + b[1] * q[1] / S2),
            "S_dx": (S1 + S2) * rate,
            "A1": r * (a20 * b[0] - a10 * b[1]),
            "A2_lhs": (r / J) * (b[0] * q10 / S1 + b[1] * q20 / S2),
            "A2_rhs": -(r * Pperp ** 2 / (4 * J)) * K0 + (J / (4 * r)) * K0,
            "Mplus0": (r * Pperp ** 2 / (4 * J)) * K0, "Mrel0": (J / (4 * r)) * K0,
            "BS": wsp * rate, "BS_direct": (2.0 - S1 - S2) * rate,
            "rho": (r / J) * (b[0] * (q[0] - q10) / S1 + b[1] * (q[1] - q20) / S2),
            "wsp": wsp, "Pperp": Pperp, "rate": rate, "wt": max(abs(b[0]), abs(b[1])),
            "P2dx": Pperp ** 2 * abs(rate)}


class AxialSumFamily:
    """Exact prescribed family (Codex breathing review): r = 1, J = 1/[10(1+cos(t)/10)],
    velocity sum along the axis, p = sqrt(1 + eps sin t)/10.  State-level kinematics."""

    def __init__(self, eps):
        self.eps, self.period = eps, 2.0 * math.pi

    def state(self, t):
        den = 1.0 + math.cos(t) / 10.0
        J = 1.0 / (10.0 * den)
        Jdot = math.sin(t) / (100.0 * den * den)
        p = math.sqrt(1.0 + self.eps * math.sin(t)) / 10.0
        u = (p / 2.0, p / 2.0)
        b = (J / 2.0, -J / 2.0)
        # q_i = b_i' + Omega u_i, Omega = J (r = 1)
        q = (Jdot / 2.0 + J * p / 2.0, -Jdot / 2.0 + J * p / 2.0)
        return {"r": 1.0, "u": u, "b": b, "q": q, "J": J, "rdot": 0.0, "Jdot": Jdot}


def integrate(state_fn, period, n, keys):
    acc = {k: 0.0 for k in keys}
    for j in range(n):
        v = pieces(state_fn(period * j / n))
        for k in keys:
            acc[k] += v[k]
    return {k: acc[k] * period / n for k in keys}


KEYS = ("tau0", "Omega", "accel", "S_dx", "Mplus0", "Mrel0", "BS", "BS_direct", "rho", "P2dx")


def known_cases(rng):
    out, ok = {}, True

    def rec(name, cond, detail=None):
        nonlocal ok
        out[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    # K1 exact algebra A1, A2 in fractions at two hand states with rational square roots
    # (b = 3/5 -> S = 4/5; b = 5/13 -> S = 12/13; b = 0 -> S = 1).
    good, det = True, []
    for (u1, u2, b1, S1, b2, S2, r) in ((Fr(1, 5), Fr(-1, 10), Fr(3, 5), Fr(4, 5), Fr(0), Fr(1), Fr(2)),
                                        (Fr(1, 7), Fr(2, 9), Fr(3, 5), Fr(4, 5), Fr(-5, 13), Fr(12, 13), Fr(3))):
        J = r * (b1 - b2)
        a10, a20 = (1 - u2 / S2) / r ** 2, (1 + u1 / S1) / r ** 2
        tau0 = (b1 * (1 + u1 / S1) - b2 * (1 - u2 / S2)) / r
        A1 = r * (a20 * b1 - a10 * b2)
        K0 = a10 / S1 + a20 / S2
        lhs = (r / J) * (b1 * (-a10 * b2) / S1 + b2 * (-a20 * b1) / S2)
        rhs = -(r * (b1 + b2) ** 2 / (4 * J)) * K0 + (J / (4 * r)) * K0
        good = good and tau0 == A1 and lhs == rhs
        det.append([str(tau0), str(A1), str(lhs), str(rhs)])
    # first state by hand: tau0 = [ (3/5)(1 + (1/5)/(4/5)) - 0 ]/2 = (3/5)(5/4)/2 = 3/8
    rec("K1 exact algebra A1, A2 at two rational states; first tau0 = 3/8",
        good and det[0][0] == "3/8", det)
    # K2 sig: hand values sig(3/5) = 1/5, sig(0) = 0; sig'' = 1 + phi2 by second differences
    worst = 0.0
    for _ in range(200):
        b = rng.uniform(-0.9, 0.9)
        h = 1e-3
        second = (-sig(b + 2 * h) + 16 * sig(b + h) - 30 * sig(b) + 16 * sig(b - h) - sig(b - 2 * h)) / (12 * h * h)
        worst = max(worst, abs(second - (1.0 + phi2(b))))
    rec("K2 sig(3/5)=1/5; sig'' = (1-b^2)^(-3/2) by second differences",
        abs(sig(0.6) - 0.2) < 1e-15 and sig(0.0) == 0.0 and worst < 1e-6, worst)
    # K3 imported trapezoid rule on oint cos^2 = pi and on oint dt/(1 + cos(t)/10) = 2 pi/sqrt(99/100)
    v = z0.trapezoid_period(lambda t: 1.0 / (1.0 + math.cos(t) / 10.0), 2 * math.pi, 256)
    rec("K3 trapezoid: oint cos^2 = pi; oint dt/(1+cos t/10) = 2 pi/sqrt(0.99)",
        abs(z0.trapezoid_period(lambda t: math.cos(t) ** 2, 2 * math.pi, 64) - math.pi) < 1e-13
        and abs(v - 2 * math.pi / math.sqrt(0.99)) < 1e-12, v)
    # K4 hand-known family: drift plus rigid rotation.  r/J constant, q_i = 0, and the tau0
    # integrand beyond Omega is cos(alpha) times a function of sin(alpha): oint tau0 = Theta = 2 pi.
    worst = 0.0
    for _ in range(10):
        V = (rng.uniform(-0.3, 0.3), rng.uniform(-0.3, 0.3))
        pr = z0.Pair(V, rng.uniform(0.02, 0.2), [(1, rng.uniform(0.5, 2.0), 0.0)], [(1, rng.uniform(0.5, 2.0), math.pi)])
        I = integrate(pr.state, pr.period, 512, ("tau0", "Omega", "accel", "S_dx"))
        worst = max(worst, abs(I["tau0"] - 2 * math.pi), abs(I["Omega"] - 2 * math.pi), abs(I["accel"]), abs(I["S_dx"]))
    rec("K4 rigid rotation with drift: oint tau0 = Theta = 2 pi, other terms 0", worst < 1e-12, worst)
    # K5 exact prescribed family with the velocity sum along the axis (Pperp = 0, r = 1):
    # tau0 = J exactly, so oint tau0 = Theta = (2 pi/10)/sqrt(99/100); Mplus0 = 0; and the
    # acceleration term cancels the S-term because both are functions of J times J'.
    theta_exact = (2 * math.pi / 10.0) / math.sqrt(0.99)
    worst, det = 0.0, {}
    for eps in (0.1, -0.1):
        fam = AxialSumFamily(eps)
        I = integrate(fam.state, fam.period, 1024, KEYS)
        errs = [abs(I["tau0"] - theta_exact), abs(I["Omega"] - theta_exact), abs(I["Mplus0"]),
                abs(I["accel"] - I["S_dx"])]
        worst = max(worst, max(errs))
        det[str(eps)] = [I["tau0"], theta_exact, I["Mplus0"], I["accel"], I["S_dx"]]
    rec("K5 axial-sum family: oint tau0 = Theta = 0.2 pi/sqrt(0.99), Mplus0 = 0, accel = S-term", worst < 1e-13, det)
    return ok, out


def target(rng, n_pairs):
    worst = {"P1": 0.0, "P2": 0.0, "BS_null": 0.0, "A1": 0.0, "A2": 0.0, "W_lower_excess": 0.0, "W_upper_excess": 0.0}
    ratio_BS, rows = 0.0, []
    stats = {"Mplus0_over_Theta": [float("inf"), 0.0], "BS_over_Theta": [float("inf"), -float("inf")]}
    for idx in range(n_pairs):
        pr = z0.random_breathing_pair(rng)
        I = integrate(pr.state, pr.period, 4096, KEYS)
        size1 = abs(I["tau0"]) + abs(I["Omega"]) + abs(I["accel"]) + abs(I["S_dx"])
        worst["P1"] = max(worst["P1"], abs(I["tau0"] - (I["Omega"] + I["accel"] - I["S_dx"])) / size1)
        rhs2 = I["Omega"] - I["Mplus0"] + I["Mrel0"] + I["BS"] + I["rho"]
        size2 = abs(I["tau0"]) + abs(I["Omega"]) + abs(I["Mplus0"]) + abs(I["Mrel0"]) + abs(I["BS"]) + abs(I["rho"])
        worst["P2"] = max(worst["P2"], abs(I["tau0"] - rhs2) / size2)
        tv = 0.0
        wmax = 0.0
        for j in range(1024):
            v = pieces(pr.state(pr.period * j / 1024))
            tv += abs(v["rate"])
            wmax = max(wmax, v["wt"])
        tv *= pr.period / 1024
        worst["BS_null"] = max(worst["BS_null"], abs(I["BS"] - I["BS_direct"]) / max(tv, 1e-300))
        for _ in range(20):
            v = pieces(pr.state(rng.uniform(0, pr.period)))
            worst["A1"] = max(worst["A1"], abs(v["tau0"] - v["A1"]) / (abs(v["tau0"]) + 1e-300))
            worst["A2"] = max(worst["A2"], abs(v["A2_lhs"] - v["A2_rhs"]) / (abs(v["Mplus0"]) + abs(v["Mrel0"]) + 1e-300))
            worst["W_lower_excess"] = max(worst["W_lower_excess"], v["Pperp"] ** 2 / 4.0 - v["wsp"])
            worst["W_upper_excess"] = max(worst["W_upper_excess"], v["wsp"] - (1 + phi2(v["wt"])) * v["Pperp"] ** 2 / 4.0)
        kS = (1.0 + phi2(wmax)) / 4.0
        ratio_BS = max(ratio_BS, abs(I["BS"]) / (kS * I["P2dx"]))
        th = I["Omega"]
        stats["Mplus0_over_Theta"][0] = min(stats["Mplus0_over_Theta"][0], I["Mplus0"] / th)
        stats["Mplus0_over_Theta"][1] = max(stats["Mplus0_over_Theta"][1], I["Mplus0"] / th)
        stats["BS_over_Theta"][0] = min(stats["BS_over_Theta"][0], I["BS"] / th)
        stats["BS_over_Theta"][1] = max(stats["BS_over_Theta"][1], I["BS"] / th)
        if idx < 6:
            rows.append({"oint_tau0": I["tau0"], "Theta": th, "Mplus0": I["Mplus0"], "Mrel0": I["Mrel0"],
                         "BS": I["BS"], "rho_term": I["rho"]})
    res = {"pairs": n_pairs, "max_relative_defects": worst,
           "thresholds": {"P1, P2 (of sum of term sizes)": 1e-9, "BS_null (of variation)": 1e-11,
                          "A1, A2 (relative)": 1e-11, "W excess (absolute)": 1e-14,
                          "|BS|/(kS oint Pperp^2 |dx|)": "<= 1 + 1e-12"},
           "max |BS| / (kS * oint Pperp^2 |dx|)": ratio_BS, "ranges_on_prescribed_paths": stats,
           "first_rows": rows}
    res["pass"] = bool(worst["P1"] < 1e-9 and worst["P2"] < 1e-9 and worst["BS_null"] < 1e-11
                       and worst["A1"] < 1e-11 and worst["A2"] < 1e-11
                       and worst["W_lower_excess"] < 1e-14 and worst["W_upper_excess"] < 1e-14
                       and ratio_BS <= 1.0 + 1e-12)
    return res


def table():
    c_acc = {Fr(1, 100): "4.447", Fr(1, 50): "4.952", Fr(1, 20): "6.922", Fr(1, 10): "12.725", Fr(1, 8): "17.812",
             Fr(7, 50): "22.086", Fr(1, 5): "60.347", Fr(1, 4): "192.283", Fr(3, 10): "1498.300"}   # accepted c(w) bounds
    rows = []
    cs = z0.ceil_sig
    for w, cstr in c_acc.items():
        s_lo, _ = z0.sqrt_bounds(w)
        kM = (1 + w) ** 2 / (2 * (1 - w) * s_lo)
        kS = 1 / (4 * s_lo ** 3)
        c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
        e1 = c3 + w * Fr(cstr)
        e2 = w * c3 / s_lo
        rows.append({"w": f"{w.numerator}/{w.denominator}", "kM<=": str(cs(kM, 4)), "kS<=": str(cs(kS, 4)),
                     "4w^2kM<=": str(cs(4 * w * w * kM, 4)), "4w^2kS<=": str(cs(4 * w * w * kS, 4)),
                     "e1=c3+w*c<=": str(cs(e1, 4)), "e2=w*c3/sqrt(1-w^2)<=": str(cs(e2, 4))})
    return rows


def main():
    out_path = sys.argv[1]
    rng = random.Random(2026101203)
    res = {"instrument": "common_motion_balance_check.py",
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
    s_lo, _ = z0.sqrt_bounds(Fr(3, 5))
    ctrl = (s_lo == Fr(4, 5) and Fr(64, 25) / (2 * Fr(2, 5) * s_lo) == Fr(4) and 1 / (4 * s_lo ** 3) == Fr(125, 256))
    res["exact_constant_controls_pass"] = bool(ctrl)
    print("EXACT CONSTANT CONTROLS (kM(3/5) = 4, kS(3/5) = 125/256)", "PASS" if ctrl else "FAIL")
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
