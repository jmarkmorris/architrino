"""Interval certificate for the untwisted rotating alternating ladder at a general radius R.

Same method as certify_untwisted_r1000.py (frozen; see the R = 1000 note): F = (G, S - R eps^2),
2-D Krawczyk test over a box X around a float centre, head |k| <= N in interval arithmetic,
tails |k| > N by the proved bounds of ladder_interval_kernel.tail_bounds (imported unchanged).
Differences: R, seed and N are arguments; guess-box radii scale with 1/L, L = 1 - eps^2;
the box is inflated by 4 up to max_attempts times and every attempt (failed or not) is kept;
an optional independent reference point is checked against the final enclosure (known case);
a progress heartbeat file is flushed at least every 30 s.

Usage: python certify_untwisted_fast.py R delta_seed eps_seed N r_delta r_eps receipt_name
                                        [ref_delta ref_eps] [max_attempts]
Refuses to run unless controls_receipt.json and controls_fast_receipt.json record a pass.
"""
import json, math, os, sys, time
import numpy as np
from mpmath import iv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, *([".."] * 7)))
PROG_DIR = os.path.join(ROOT, ".local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/untwisted-certificate")

R = float(sys.argv[1])
seed = (float(sys.argv[2]), float(sys.argv[3]))
N = int(sys.argv[4])
r_d = float(sys.argv[5])
r_e = float(sys.argv[6])
RECEIPT = sys.argv[7]
REF = (sys.argv[8], sys.argv[9]) if len(sys.argv) > 9 and sys.argv[8] and sys.argv[9] else None  # "" "" = no reference
MAX_ATT = int(sys.argv[10]) if len(sys.argv) > 10 else 4

for name in ("controls_receipt.json", "controls_fast_receipt.json"):
    assert json.load(open(os.path.join(HERE, name)))["all_pass"], name + " has not passed"

os.makedirs(PROG_DIR, exist_ok=True)
prog_path = os.path.join(PROG_DIR, "progress_" + RECEIPT.replace(".json", ".txt"))
_last = [0.0]


def heartbeat(msg, force=False):
    now = time.time()
    if force or now - _last[0] >= 30:
        with open(prog_path, "a") as fh:
            fh.write("%s %s\n" % (time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), msg))
            fh.flush()
        _last[0] = now


t0 = time.time()
heartbeat("start R=%g N=%d" % (R, N), force=True)


def s(x):
    return [str(x.a), str(x.b)]


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
        out[nu] = (g, c / (t * t * w))
    t0m = L.float_roots(-1, [0], d, e)[0]
    th0 = e * t0m
    p0 = math.sin(th0) / th0
    w0 = t0m * (1 + e * e * p0)
    g0 = p0 / (t0m * w0)
    h0 = 2 * math.cos(th0 / 2) ** 2 / (t0m * t0m * w0)
    sg = np.where(ks % 2 == 0, 2.0, -2.0)
    Fg = out[1][0] + out[-1][0]
    Fh = out[-1][1] - out[1][1]
    G = g0 + np.sum(sg[:-1] * Fg[:-1]) + 0.5 * sg[-1] * Fg[-1]
    S = h0 + np.sum(sg[:-1] * Fh[:-1]) + 0.5 * sg[-1] * Fh[-1]
    return G, S


x = np.array(seed, dtype=float)
for it in range(8):
    G, S = float_GS(*x)
    F = np.array([G, S - R * x[1] ** 2])
    hd, he = 1e-7, 1e-9
    G1, S1 = float_GS(x[0] + hd, x[1])
    G2, S2 = float_GS(x[0], x[1] + he)
    J = np.array([[(G1 - G) / hd, (G2 - G) / he], [(S1 - S) / hd, (S2 - S) / he - 2 * R * x[1]]])
    x = x - np.linalg.solve(J, F)
center = [float(x[0]), float(x[1])]
Gc, Sc = float_GS(*center)
float_info = {"seed": list(seed), "center": center, "float_residuals": [float(Gc), float(Sc - R * center[1] ** 2)],
              "float_jacobian": J.tolist(), "note": "float Newton, not certified; supplies the box centre only"}
print("float center", center, "residuals", float_info["float_residuals"], flush=True)
heartbeat("float centre %r" % center, force=True)
Lc = 1 - center[1] ** 2


def rho_factory(rd, re):
    return lambda k: 3 * (k * rd + re) / Lc + 1e-12 * (1 + 4 * k)


attempts = []
result = None
for attempt in range(MAX_ATT):
    xt = [L.I(center[0]), L.I(center[1])]
    X = [L.radius_box(center[0], r_d), L.radius_box(center[1], r_e)]
    ta = time.time()
    Fp = L.ladder_sums(xt[0], xt[1], N, grad=False, seed=(center[0], center[1], rho_factory(0, 0)),
                       progress=lambda k: heartbeat("attempt %d point k=%d" % (attempt, k)))
    t_point = time.time() - ta
    Fx = [Fp["G"], Fp["S"] - R * xt[1] * xt[1]]
    tb = time.time()
    Jb = L.ladder_sums(X[0], X[1], N, grad=True, seed=(center[0], center[1], rho_factory(r_d, r_e)),
                       progress=lambda k: heartbeat("attempt %d box k=%d" % (attempt, k)))
    t_box = time.time() - tb
    JX = [[Jb["dG"][0], Jb["dG"][1]], [Jb["dS"][0], Jb["dS"][1] - 2 * R * X[1]]]
    Jm = np.array([[float(JX[i][j].mid) for j in range(2)] for i in range(2)])
    Y = np.linalg.inv(Jm).tolist()
    K, C, ok, normC = L.krawczyk_2d(Fx, JX, xt, X, Y)
    inside = [bool(L.strictly_inside(K[i], X[i])) for i in range(2)]
    att = {"R": R, "N": N, "r_delta": r_d, "r_eps": r_e, "X": [s(X[0]), s(X[1])], "center": center,
           "F_center": [s(Fx[0]), s(Fx[1])], "F_center_widths": [L.width(Fx[0]), L.width(Fx[1])],
           "tail_bounds_box": {k: str(v.b) for k, v in Jb["tail_bounds"].items()},
           "J_X": [[s(JX[i][j]) for j in range(2)] for i in range(2)],
           "J_head_X": [[s(Jb["dG_head"][0]), s(Jb["dG_head"][1])], [s(Jb["dS_head"][0]), s(Jb["dS_head"][1])]],
           "G_over_X": s(Jb["G"]), "S_over_X": s(Jb["S"]),
           "Y": Y, "C": [[s(C[i][j]) for j in range(2)] for i in range(2)], "normC_upper": normC,
           "K": [s(K[0]), s(K[1])], "K_inside_X_per_coordinate": inside,
           "K_strictly_inside_X_and_normC_lt_1": ok,
           "newton_iterations_max": [Fp["newton_iterations_max"], Jb["newton_iterations_max"]],
           "rows_evaluated": [Fp["rows"], Jb["rows"]], "seconds": [t_point, t_box]}
    attempts.append(att)
    print("attempt", attempt, "ok", ok, "inside", inside, "K", K, "normC", normC, "time", t_point, t_box, flush=True)
    heartbeat("attempt %d done ok=%s" % (attempt, ok), force=True)
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
    rec["certified"] = True
    rec["final_enclosure"] = {"delta": s(E[0]), "eps": s(E[1]),
                              "delta_halfwidth": L.width(E[0]) / 2, "eps_halfwidth": L.width(E[1]) / 2,
                              "d_equals_delta_R": s(E[0] * R), "omega_equals_eps_over_R": s(E[1] / R)}
    rec["uniqueness_box"] = {"delta": s(X[0]), "eps": s(X[1])}
    rec["seed_in_final_enclosure"] = [bool(E[0].a <= seed[0] <= E[0].b), bool(E[1].a <= seed[1] <= E[1].b)]
    if REF is not None:
        rd_, re_ = L.I(REF[0]), L.I(REF[1])
        rec["reference_point"] = list(REF)
        rec["reference_in_final_enclosure"] = [bool(E[0].a <= rd_.a and rd_.b <= E[0].b),
                                               bool(E[1].a <= re_.a and re_.b <= E[1].b)]
    Lx = 1 - X[1] * X[1]
    rec["side_conditions"] = {
        "eps_upper_lt_1": bool(X[1].b < 1), "member_speed_upper": str(X[1].b),
        "D_lower_bound_1_minus_eps2": str(Lx.a), "S_over_X_positive": bool(Jb["S"].a > 0), "S_over_X": s(Jb["S"]),
        "delta_lower_gt_2": bool(X[0].a > 2), "min_member_separation_unit_ladder_lower": str(min(X[0].a, iv.mpf(2)).a)}
else:
    rec["certified"] = False
rec["runtime_s"] = time.time() - t0
with open(os.path.join(HERE, RECEIPT), "w") as fh:
    json.dump(rec, fh, indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o))
heartbeat("finished certified=%s" % rec["certified"], force=True)
print("certified", rec["certified"], "runtime", rec["runtime_s"])
if rec["certified"]:
    print(json.dumps(rec["final_enclosure"], indent=1))
    print("reference in enclosure", rec.get("reference_in_final_enclosure"))
