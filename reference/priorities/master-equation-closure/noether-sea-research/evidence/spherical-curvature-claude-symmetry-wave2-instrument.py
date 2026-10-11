#!/usr/bin/env python
"""Symmetry wave-2 instrument (run with ../.venv/bin/python; numpy + sympy; foreground, < 10 s).

Order enforced: CONTROLS first (the script exits before targets if any fails), then targets.
  (i)   Rotating alternating hexagon, uniform rotation at dimensionless rate omega = beta on 0 < beta <= 1,
        complete rotating history: root census per partner by scan+bisection on (0, 2+margin], self scan,
        azimuthal tangent sum B_phi(omega). Controls: omega = 0 gives B_phi = 0 (reflection), omitted-root
        negative control changes the value, partner count 5 and self count 0 at a sample omega.
  (ii)  Static-field Jacobians at a hexagon vertex and at a pi/6 antiprism vertex, giving the second-order
        speed law coefficients; sympy closed forms versus numpy values.
  (iii) Lower bounds on the first upward wake-speed crossing time for G1 V2 and G3 V2 at beta = 1 on the
        stationary-source window, by the explicit inequality chain described in the report.
c_f = K = R = 1 throughout.
"""
import json
import math
import sys

import numpy as np
import sympy as sp


def _json_default(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(str(type(o)))


# ----------------------------------------------------------------- (i) rotating hexagon
def hex_pos(k, t, omega):
    th = k * math.pi / 3 + omega * t
    return np.array([math.cos(th), math.sin(th), 0.0])


def hex_vel(k, t, omega):
    th = k * math.pi / 3 + omega * t
    return omega * np.array([-math.sin(th), math.cos(th), 0.0])


def roots_for_source(k, omega, x0, n_scan=20000, umax=2.5, umin=0.0):
    """All u in (umin, umax] with |x0 - x_k(-u)| = u, by sign scan and bisection."""
    us = np.linspace(umin, umax, n_scan + 1)[1:]
    f = np.array([np.linalg.norm(x0 - hex_pos(k, -u, omega)) - u for u in us])
    roots = []
    for a, b, fa, fb in zip(us[:-1], us[1:], f[:-1], f[1:]):
        if fa == 0:
            roots.append(a)
        elif fa * fb < 0:
            lo, hi = a, b
            for _ in range(80):
                mid = 0.5 * (lo + hi)
                fm = np.linalg.norm(x0 - hex_pos(k, -mid, omega)) - mid
                if (np.linalg.norm(x0 - hex_pos(k, -lo, omega)) - lo) * fm <= 0:
                    hi = mid
                else:
                    lo = mid
            roots.append(0.5 * (lo + hi))
    return roots


def hexagon_B(omega, omit=None):
    x0 = np.array([1.0, 0.0, 0.0])
    B = np.zeros(3)
    census = {}
    for k in range(6):
        if k == 0:
            self_roots = roots_for_source(0, omega, x0, umin=1e-3)  # derived: none for omega <= 1
            census["self_roots_above_1e-3"] = len(self_roots)
            continue
        rs = roots_for_source(k, omega, x0)
        census[f"partner_{k}"] = [{"u": u, "D_t": None} for u in rs]
        for idx, u in enumerate(rs):
            if omit == (k, idx):
                continue
            r = x0 - hex_pos(k, -u, omega)
            rhat = r / u
            Dt = 1.0 - float(np.dot(hex_vel(k, -u, omega), rhat))
            census[f"partner_{k}"][idx]["D_t"] = Dt
            B += (-1) ** k * rhat / (abs(Dt) * u * u)
    return B, census


# ----------------------------------------------------------------- (ii) Jacobians
def static_field_and_jacobian(X, Q, i):
    A = np.zeros(3)
    J = np.zeros((3, 3))
    for j in range(len(X)):
        if j == i:
            continue
        r = X[i] - X[j]
        d = np.linalg.norm(r)
        s = np.sign(Q[i] * Q[j])
        A += s * r / d**3
        J += s * (np.eye(3) / d**3 - 3 * np.outer(r, r) / d**5)
    return A, J


def hexagon_sites():
    X = np.array([[math.cos(k * math.pi / 3), math.sin(k * math.pi / 3), 0.0] for k in range(6)])
    Q = np.array([(-1) ** k for k in range(6)])
    return X, Q


def antiprism_sites(alpha=math.pi / 6):
    X = np.zeros((6, 3))
    for k in range(3):
        ph = 2 * math.pi * k / 3
        X[k] = [math.cos(alpha) * math.cos(ph), math.cos(alpha) * math.sin(ph), math.sin(alpha)]
        X[k + 3] = -X[k]
    Q = np.array([1, 1, 1, -1, -1, -1])
    return X, Q


def six_pole_sites():
    E = np.eye(3)
    X = np.array([E[0], E[1], E[2], -E[0], -E[1], -E[2]])
    Q = np.array([1, 1, 1, -1, -1, -1])
    return X, Q


def sympy_jacobian_closed_forms():
    out = {}
    x1, x2, x3 = sp.symbols('x1 x2 x3', real=True)
    x = sp.Matrix([x1, x2, x3])

    def field(srcs):
        A = sp.zeros(3, 1)
        for s, q in srcs:
            r = x - s
            A += q * r / (r.dot(r)) ** sp.Rational(3, 2)
        return A

    # hexagon, receiver at vertex 0 (+1 polarity), sources k=1..5 with polarity (-1)^k
    srcs = [(sp.Matrix([sp.cos(k * sp.pi / 3), sp.sin(k * sp.pi / 3), 0]), (-1) ** k) for k in range(1, 6)]
    A = field(srcs)
    at = {x1: 1, x2: 0, x3: 0}
    A0 = sp.simplify(A.subs(at))
    J = sp.simplify(A.jacobian(x).subs(at))
    out["hexagon"] = {"B_n": sp.nsimplify(A0[0]), "B_phi": sp.nsimplify(A0[1]), "B_z": sp.nsimplify(A0[2]),
                      "J_phiphi": sp.nsimplify(J[1, 1]), "J_zz": sp.nsimplify(J[2, 2]), "J_phiz": sp.nsimplify(J[1, 2]),
                      "J_nn": sp.nsimplify(J[0, 0])}
    # antiprism alpha = pi/6, receiver positrino k=0
    al = sp.pi / 6
    P = [sp.Matrix([sp.cos(al) * sp.cos(2 * sp.pi * k / 3), sp.cos(al) * sp.sin(2 * sp.pi * k / 3), sp.sin(al)]) for k in range(3)]
    srcs = [(P[1], 1), (P[2], 1), (-P[0], -1), (-P[1], -1), (-P[2], -1)]
    A = field(srcs)
    at = {x1: sp.cos(al), x2: 0, x3: sp.sin(al)}
    A0 = sp.simplify(A.subs(at))
    J = sp.simplify(A.jacobian(x).subs(at))
    ea = sp.Matrix([-sp.sin(al), 0, sp.cos(al)])
    ep = sp.Matrix([0, 1, 0])
    n = sp.Matrix([sp.cos(al), 0, sp.sin(al)])
    out["antiprism"] = {"B_alpha": sp.nsimplify(sp.simplify(A0.dot(ea))), "B_phi": sp.nsimplify(sp.simplify(A0.dot(ep))),
                        "B_n": sp.nsimplify(sp.simplify(A0.dot(n))),
                        "J_aa": sp.nsimplify(sp.simplify((ea.T * J * ea)[0])), "J_pp": sp.nsimplify(sp.simplify((ep.T * J * ep)[0])),
                        "J_ap": sp.nsimplify(sp.simplify((ea.T * J * ep)[0]))}
    return out


# ----------------------------------------------------------------- (iii) crossing-time lower bounds
def crossing_lower_bound(X, Q, i, vhat, g=1.0, window=0.37):
    """Largest That <= window such that |phi0|/C1(That) >= That, where
    C1(T) = (g M_B + 1) M_B / beta_min + M_J with M_B = sum 1/(d_k - T)^2, M_J = sum 2/(d_k - T)^3,
    beta_min = 1 - g M_B T, over the five partner chords d_k, using beta <= 1 before the crossing and
    path length <= T. Revision 2 (00:33 UTC): run 1 omitted the 1/beta_min factor; run-1 output retained."""
    A, _ = static_field_and_jacobian(X, Q, i)
    n = X[i] / np.linalg.norm(X[i])
    PA = A - np.dot(A, n) * n
    phi0 = float(np.dot(vhat, PA))  # = vhat . B at release (vhat tangent)
    ds = [np.linalg.norm(X[i] - X[j]) for j in range(len(X)) if j != i]
    best = 0.0
    for T in np.linspace(1e-4, window, 20000):
        MB = sum(1.0 / (d - T) ** 2 for d in ds)
        MJ = sum(2.0 / (d - T) ** 3 for d in ds)
        beta_min = 1.0 - g * MB * T  # speed lower bound before the crossing (|beta'| <= g M_B)
        if beta_min <= 0:
            continue
        C1 = (g * MB + 1.0) * MB / beta_min + MJ
        if abs(phi0) / C1 >= T:
            best = T
    return {"phi0": phi0, "T_lower_bound": best, "chords": ds}


def main():
    out = {"controls": [], "targets": {}}
    # ---------------- controls for (i)
    B0, c0 = hexagon_B(0.0)
    out["controls"].append({"name": "known: omega=0 gives B_phi = 0 and B_n = -5/4 + 1/sqrt3",
                            "B_phi": B0[1], "B_n": B0[0], "B_n_closed": -1.25 + 1 / math.sqrt(3),
                            "pass": abs(B0[1]) < 1e-12 and abs(B0[0] - (-1.25 + 1 / math.sqrt(3))) < 1e-9})
    Bs, cs = hexagon_B(0.5)
    Bo, _ = hexagon_B(0.5, omit=(1, 0))
    out["controls"].append({"name": "negative: omitting partner 1's root at omega=0.5 changes B_phi",
                            "B_phi_full": Bs[1], "B_phi_omitted": Bo[1], "pass": abs(Bs[1] - Bo[1]) > 1e-6})
    npart = sum(len(cs[f"partner_{k}"]) for k in range(1, 6))
    out["controls"].append({"name": "census at omega=0.5: five partner roots, zero self roots above 1e-3, all D_t>0",
                            "partner_roots": npart, "self_roots": cs["self_roots_above_1e-3"],
                            "min_Dt": min(r["D_t"] for k in range(1, 6) for r in cs[f"partner_{k}"]),
                            "pass": npart == 5 and cs["self_roots_above_1e-3"] == 0})
    # control for (ii): six-pole Jacobian reproduces v.Jv = -|v|^2/8 for a tangent v
    X6, Q6 = six_pole_sites()
    _, J6 = static_field_and_jacobian(X6, Q6, 0)
    v = np.array([0.0, 0.6, -0.8])
    out["controls"].append({"name": "known: six-pole Jacobian gives v.Jv = -|v|^2/8", "vJv": float(v @ J6 @ v),
                            "expected": -1 / 8, "pass": abs(v @ J6 @ v + 1 / 8) < 1e-12})
    # control for (iii): zero interaction (g=0, empty field) gives no crossing bound issue -> phi0 = 0 handled;
    # known: for G1 V2 phi0 must equal -1 exactly
    Xh, Qh = hexagon_sites()
    cap = np.array([0.0, 1.0, 1.0]) / math.sqrt(2)
    cb = crossing_lower_bound(X6, Q6, 0, cap)
    out["controls"].append({"name": "known: G1 V2 release v.B = -1", "phi0": cb["phi0"], "pass": abs(cb["phi0"] + 1) < 1e-12})
    if not all(c["pass"] for c in out["controls"]):
        print(json.dumps(out, indent=1, default=_json_default))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["controls_all_pass_before_targets"] = True

    # ---------------- (i) target: scan B_phi over 0 < beta <= 1
    betas = np.concatenate([np.linspace(0.005, 1.0, 120)])
    rows = []
    for b in betas:
        B, c = hexagon_B(float(b))
        npart = sum(len(c[f"partner_{k}"]) for k in range(1, 6))
        minDt = min(r["D_t"] for k in range(1, 6) for r in c[f"partner_{k}"])
        rows.append({"beta": float(b), "B_phi": float(B[1]), "B_n": float(B[0]), "B_z": float(B[2]),
                     "partner_roots": npart, "self_roots_above_1e-3": c["self_roots_above_1e-3"], "min_Dt": minDt})
    signs = [np.sign(r["B_phi"]) for r in rows]
    sign_changes = [(rows[k]["beta"], rows[k + 1]["beta"]) for k in range(len(rows) - 1) if signs[k] * signs[k + 1] < 0]
    # small-omega slope
    Bsm, _ = hexagon_B(1e-4)
    slope = Bsm[1] / 1e-4
    out["targets"]["rotating_hexagon_B_phi"] = {
        "rows": rows, "sign_changes": sign_changes, "min_B_phi": min(r["B_phi"] for r in rows),
        "max_B_phi": max(r["B_phi"] for r in rows), "all_partner_roots_five": all(r["partner_roots"] == 5 for r in rows),
        "any_self_roots": any(r["self_roots_above_1e-3"] > 0 for r in rows), "min_Dt_overall": min(r["min_Dt"] for r in rows),
        "dBphi_domega_at_0": float(slope), "B_phi_at_beta_1": rows[-1]["B_phi"],
    }

    # ---------------- (ii) Jacobians
    cf = sympy_jacobian_closed_forms()
    Ah, Jh = static_field_and_jacobian(Xh, Qh, 0)
    Xa, Qa = antiprism_sites()
    Aa, Ja = static_field_and_jacobian(Xa, Qa, 0)
    al = math.pi / 6
    ea = np.array([-math.sin(al), 0, math.cos(al)])
    ep = np.array([0.0, 1.0, 0.0])
    na = np.array([math.cos(al), 0, math.sin(al)])
    out["targets"]["jacobians"] = {
        "hexagon": {k: {"closed": str(v), "value": float(v)} for k, v in cf["hexagon"].items()},
        "hexagon_numeric": {"B_n": float(Ah[0]), "B_phi": float(Ah[1]), "J_phiphi": float(Jh[1, 1]), "J_zz": float(Jh[2, 2]), "J_phiz": float(Jh[1, 2])},
        "antiprism": {k: {"closed": str(v), "value": float(v)} for k, v in cf["antiprism"].items()},
        "antiprism_numeric": {"B_alpha": float(Aa @ ea), "B_phi": float(Aa @ ep), "B_n": float(Aa @ na),
                              "J_aa": float(ea @ Ja @ ea), "J_pp": float(ep @ Ja @ ep), "J_ap": float(ea @ Ja @ ep)},
        "hexagon_c_check": {"J_phiphi_minus_B_n": float(Jh[1, 1] - Ah[0]), "c_closed": 29 / 8 - 5 * math.sqrt(3) / 18},
    }

    # ---------------- (iii) crossing lower bounds
    out["targets"]["crossing_lower_bounds"] = {
        "G1_V2_beta1": crossing_lower_bound(X6, Q6, 0, cap, window=0.37),
        "G3_V2_beta1": crossing_lower_bound(Xa, Qa, 0, ea, window=0.34),
    }
    print(json.dumps(out, indent=1, default=_json_default))


if __name__ == "__main__":
    main()
