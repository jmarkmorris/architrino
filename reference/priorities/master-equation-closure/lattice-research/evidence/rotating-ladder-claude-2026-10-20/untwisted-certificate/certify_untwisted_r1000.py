"""Interval certificate: the untwisted rotating alternating ladder balances at R = 1000 (c_f = K = 1).

Unknowns (delta, eps) = (d/R, omega R). Equations (Lemma 2(d), unit ladder):
    F1 = G(delta, eps) = 0,    F2 = S(delta, eps) - R eps^2 = 0,   R = 1000.
Method: 2-D Krawczyk test over a box X around a float center (center found by a
non-certified float Newton iteration; the center plays no role in the proof except as a point of X).
All rungs k in Z are retained: |k| <= N exactly in interval arithmetic, |k| > N by proved tail bounds.

Usage: python certify_untwisted_r1000.py [N] [r_delta] [r_eps] [receipt_name]
Must be run after controls.py has passed (it checks controls_receipt.json).
Writes certificate_receipt.json next to this file.
"""
import json, math, os, sys, time
import numpy as np
from mpmath import iv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))
R = 1000
N = int(sys.argv[1]) if len(sys.argv) > 1 else 10000
r_d = float(sys.argv[2]) if len(sys.argv) > 2 else 1e-9
r_e = float(sys.argv[3]) if len(sys.argv) > 3 else 2e-10
RECEIPT = sys.argv[4] if len(sys.argv) > 4 else "certificate_receipt.json"
RECORDED = (3.345035293, 0.01384081428)

ctrl = json.load(open(os.path.join(HERE, "controls_receipt.json")))
assert ctrl["all_pass"], "controls have not passed; refusing to run on the target"

t0 = time.time()


def s(x):
    return [str(x.a), str(x.b)]


# ------------------------------------------------ float center (not part of the proof)
def float_GS(d, e, Nf=200000):
    ks = np.arange(1, Nf + 2)
    out = {}
    for nu in (1, -1):
        t = L.float_roots(nu, ks, d, e)
        th = e * t
        p = np.sin(th) / th
        w = t * (1 - nu * e * e * p)
        g = p / (t * w)
        c = 2 * np.sin(th / 2) ** 2 if nu == 1 else 2 * np.cos(th / 2) ** 2
        h = c / (t * t * w)
        out[nu] = (g, h)
    t0m = L.float_roots(-1, [0], d, e)[0]
    th0 = e * t0m
    p0 = math.sin(th0) / th0
    w0 = t0m * (1 - (-1) * e * e * p0)
    g0 = p0 / (t0m * w0)
    h0 = 2 * math.cos(th0 / 2) ** 2 / (t0m * t0m * w0)
    sg = np.where(ks % 2 == 0, 2.0, -2.0)
    Fg = out[1][0] + out[-1][0]
    Fh = out[-1][1] - out[1][1]
    # sum to Nf, plus half of term Nf+1 (Euler half-term)
    G = g0 + np.sum(sg[:-1] * Fg[:-1]) + 0.5 * sg[-1] * Fg[-1]
    S = h0 + np.sum(sg[:-1] * Fh[:-1]) + 0.5 * sg[-1] * Fh[-1]
    return G, S


x = np.array(RECORDED, dtype=float)
for it in range(6):
    G, S = float_GS(*x)
    F = np.array([G, S - R * x[1] ** 2])
    hd, he = 1e-7, 1e-9
    G1, S1 = float_GS(x[0] + hd, x[1])
    G2, S2 = float_GS(x[0], x[1] + he)
    J = np.array([[(G1 - G) / hd, (G2 - G) / he], [(S1 - S) / hd, (S2 - S) / he - 2 * R * x[1]]])
    x = x - np.linalg.solve(J, F)
center = [float(x[0]), float(x[1])]
Gc, Sc = float_GS(*center)
float_info = {"center": center, "float_residuals": [float(Gc), float(Sc - R * center[1] ** 2)],
              "float_jacobian": J.tolist(), "note": "float Newton, not certified; supplies the box center only"}
print("float center", center, "residuals", float_info["float_residuals"], flush=True)


def rho_factory(rd, re):
    return lambda k: 2 * (k * rd + re) + 1e-12 * (1 + 4 * k)


attempts = []
result = None
for attempt in range(5):
    xt = [L.I(center[0]), L.I(center[1])]
    X = [L.radius_box(center[0], r_d), L.radius_box(center[1], r_e)]
    ta = time.time()
    Fp = L.ladder_sums(xt[0], xt[1], N, grad=False, seed=(center[0], center[1], rho_factory(0, 0)))
    t_point = time.time() - ta
    Fx = [Fp["G"], Fp["S"] - R * xt[1] * xt[1]]
    tb = time.time()
    Jb = L.ladder_sums(X[0], X[1], N, grad=True, seed=(center[0], center[1], rho_factory(r_d, r_e)),
                       progress=lambda k: print("  box rows k =", k, round(time.time() - tb, 1), "s", flush=True)
                       if k % 2500 == 0 else None)
    t_box = time.time() - tb
    JX = [[Jb["dG"][0], Jb["dG"][1]], [Jb["dS"][0], Jb["dS"][1] - 2 * R * X[1]]]
    Jm = np.array([[float(JX[i][j].mid) for j in range(2)] for i in range(2)])
    Y = np.linalg.inv(Jm).tolist()
    K, C, ok, normC = L.krawczyk_2d(Fx, JX, xt, X, Y)
    att = {"N": N, "r_delta": r_d, "r_eps": r_e, "X": [s(X[0]), s(X[1])], "center": center,
           "F_center": [s(Fx[0]), s(Fx[1])], "F_center_widths": [L.width(Fx[0]), L.width(Fx[1])],
           "G_tail_part": s(Fp["G_tail"]), "S_tail_part": s(Fp["S_tail"]),
           "tail_bounds_point": {k: str(v.b) for k, v in Fp["tail_bounds"].items()},
           "tail_bounds_box": {k: str(v.b) for k, v in Jb["tail_bounds"].items()},
           "J_X": [[s(JX[i][j]) for j in range(2)] for i in range(2)],
           "J_head_X": [[s(Jb["dG_head"][0]), s(Jb["dG_head"][1])], [s(Jb["dS_head"][0]), s(Jb["dS_head"][1])]],
           "G_over_X": s(Jb["G"]), "S_over_X": s(Jb["S"]),
           "Y": Y, "C": [[s(C[i][j]) for j in range(2)] for i in range(2)], "normC_upper": normC,
           "K": [s(K[0]), s(K[1])], "K_strictly_inside_X_and_normC_lt_1": ok,
           "newton_iterations_max": [Fp["newton_iterations_max"], Jb["newton_iterations_max"]],
           "rows_evaluated": [Fp["rows"], Jb["rows"]], "seconds": [t_point, t_box]}
    attempts.append(att)
    print("attempt", attempt, "ok", ok, "K", K, "normC", normC, "time", t_point, t_box, flush=True)
    if ok:
        result = (X, K, Jb)
        break
    r_d *= 4
    r_e *= 4

rec = {"R": R, "law": "canonical Master Equation, c_f=1, K=1, unit ladder (lengths in R)",
       "interval_library": "mpmath 1.3.0 iv, dps %d" % iv.dps, "float_center": float_info, "attempts": attempts}
if result is not None:
    X, K, Jb = result
    E = [L.intersect(K[i], X[i]) for i in range(2)]
    dR = E[0] * R
    om = E[1] / R
    rec["certified"] = True
    rec["final_enclosure"] = {"delta": s(E[0]), "eps": s(E[1]),
                              "delta_halfwidth": L.width(E[0]) / 2, "eps_halfwidth": L.width(E[1]) / 2,
                              "d_equals_delta_R": s(dR), "omega_equals_eps_over_R": s(om)}
    rec["uniqueness_box"] = {"delta": s(X[0]), "eps": s(X[1])}
    rec["recorded_values_in_uniqueness_box"] = [bool(X[0].a <= RECORDED[0] <= X[0].b),
                                                bool(X[1].a <= RECORDED[1] <= X[1].b)]
    rec["recorded_values_in_final_enclosure"] = [bool(E[0].a <= RECORDED[0] <= E[0].b),
                                                 bool(E[1].a <= RECORDED[1] <= E[1].b)]
    # side conditions over X
    L_ = 1 - X[1] * X[1]
    rec["side_conditions"] = {
        "eps_upper_lt_1": bool(X[1].b < 1), "member_speed_upper": str(X[1].b),
        "D_lower_bound_1_minus_eps2": str(L_.a),
        "S_over_X_positive": bool(Jb["S"].a > 0), "S_over_X": s(Jb["S"]),
        "min_member_separation_unit_ladder_lower": str(min(X[0].a, iv.mpf(2)).a),
        "note_separation": "members at distance >= min(2, delta) in units of R; delta > 2 so the minimum is the rung length 2R"}
else:
    rec["certified"] = False
rec["runtime_s"] = time.time() - t0
with open(os.path.join(HERE, RECEIPT), "w") as fh:
    json.dump(rec, fh, indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o))
print("certified", rec["certified"], "runtime", rec["runtime_s"])
if rec["certified"]:
    print(json.dumps(rec["final_enclosure"], indent=1))
