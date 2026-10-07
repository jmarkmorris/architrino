# weber-binding-sphere-gc-res-checks.py
# Great-circle closure lane, residual-set work after the 22:48:48Z extension freeze (2026-10-06).
# Spot checks for Section 17 of analysis/weber-binding-sphere-great-circle-closure.md. R = 1, K = c_f = 1 (the law's constants
# do not enter: everything here concerns the squared separation D_ij of a prescribed pair). Known case first.
# Usage: ../../../../../../.venv/bin/python weber-binding-sphere-gc-res-checks.py   (writes weber-binding-sphere-gc-res-checks.json)
import json, datetime
import numpy as np
import sympy as sp

rng = np.random.default_rng(20261008)
out = {"script": "weber-binding-sphere-gc-res-checks.py", "startedUTC": datetime.datetime.now(datetime.timezone.utc).isoformat()}

def frame(n):
    e = np.array([0, 0, 1.0]) if abs(n[2]) < 0.9 else np.array([1.0, 0, 0])
    u = e - n * (e @ n); u /= np.linalg.norm(u)
    return u, np.cross(n, u)
def unit():
    v = rng.normal(size=3); return v / np.linalg.norm(v)
def pos(n, u, up, c, a, th):
    return c * n + a * (np.cos(th)[..., None] * u + np.sin(th)[..., None] * up)

# ---------- known case: the mirror pair of Lemma 16.7 is a square on the line theta1 = theta2 but not on the torus ----------
def torus_coeffs(ni, ui, upi, ci, ai, nj, uj, upj, cj, aj, N=8):
    t = 2 * np.pi * np.arange(N) / N
    Xi = pos(ni, ui, upi, ci, ai, t); Xj = pos(nj, uj, upj, cj, aj, t)
    D = 2 - 2 * (Xi @ Xj.T)                      # D[k, l] = D(theta1 = t_k, theta2 = t_l)
    Fh = np.fft.fft2(D) / (N * N)                # coefficient of z1^p z2^q at Fh[p % N, q % N]
    return {(p, q): Fh[p % N, q % N] for p in (-1, 0, 1) for q in (-1, 0, 1)}, np.abs(Fh).sum() - sum(abs(Fh[p % N, q % N]) for p in (-1, 0, 1) for q in (-1, 0, 1))
known = {}
a = 0.5; c = np.sqrt(1 - a * a); ni = unit(); nj = ni + 0.4 * unit(); nj /= np.linalg.norm(nj); l = np.cross(ni, nj); l /= np.linalg.norm(l)
P, extra = torus_coeffs(ni, l, np.cross(ni, l), c, a, nj, l, np.cross(nj, l), -c, a)
gam = np.arccos(ni @ nj)
t = np.linspace(0, 2 * np.pi, 400, endpoint=False)
D_line = np.sum((pos(ni, l, np.cross(ni, l), c, a, t) - pos(nj, l, np.cross(nj, l), -c, a, t)) ** 2, axis=1)
nu = (ni + nj) / np.linalg.norm(ni + nj)
known["mirrorPair_lineIsSquare_maxErr"] = float(np.max(np.abs(D_line - (2 * pos(ni, l, np.cross(ni, l), c, a, t) @ nu) ** 2)))
known["mirrorPair_torusSquareDefect_p10"] = float(abs(P[(1, 0)] ** 2 - 4 * P[(1, 1)] * P[(1, -1)]))
known["pass"] = bool(known["mirrorPair_lineIsSquare_maxErr"] < 1e-12 and known["mirrorPair_torusSquareDefect_p10"] > 1e-3)
out["knownCase"] = known; print("known case", known)
assert known["pass"]

# ---------- R1: coefficients of P(z1, z2) on the torus and the three necessary conditions for P = c Q^2 / (z1 z2) ----------
e = {"modP11": 0, "modP1m1": 0, "modP10": 0, "modP01": 0, "P00": 0, "offSupport": 0, "id10": 0, "id01": 0}
minConstGap = np.inf; minDefect = np.inf
for n in range(300):
    ai, aj = rng.uniform(0.1, 0.99, 2); ci = rng.choice([-1, 1]) * np.sqrt(1 - ai * ai); cj = rng.choice([-1, 1]) * np.sqrt(1 - aj * aj)
    ni, nj = unit(), unit(); ui, upi = frame(ni); uj, upj = frame(nj); C = ni @ nj; S = np.sqrt(1 - C * C)
    P, extra = torus_coeffs(ni, ui, upi, ci, ai, nj, uj, upj, cj, aj)
    e["modP11"] = max(e["modP11"], abs(abs(P[(1, 1)]) - ai * aj / 2 * (1 - C))); e["modP1m1"] = max(e["modP1m1"], abs(abs(P[(1, -1)]) - ai * aj / 2 * (1 + C)))
    e["modP10"] = max(e["modP10"], abs(abs(P[(1, 0)]) - abs(cj) * ai * S)); e["modP01"] = max(e["modP01"], abs(abs(P[(0, 1)]) - abs(ci) * aj * S))
    e["P00"] = max(e["P00"], abs(P[(0, 0)] - (2 - 2 * ci * cj * C))); e["offSupport"] = max(e["offSupport"], extra)
    # |p10|^2 - 4 |p11| |p1,-1| = a_i^2 S^2 (c_j^2 - a_j^2), and the same with i and j exchanged
    e["id10"] = max(e["id10"], abs(abs(P[(1, 0)]) ** 2 - 4 * abs(P[(1, 1)]) * abs(P[(1, -1)]) - ai * ai * S * S * (cj * cj - aj * aj)))
    e["id01"] = max(e["id01"], abs(abs(P[(0, 1)]) ** 2 - 4 * abs(P[(1, 1)]) * abs(P[(-1, 1)]) - aj * aj * S * S * (ci * ci - ai * ai)))
    # constant term exceeds every value 2 (+-|p11| +- |p1,-1|) allowed by a square: p00 - 2 a_i a_j >= (a_i - a_j)^2 + (1 - |C|)(...) > 0
    minConstGap = min(minConstGap, (P[(0, 0)].real - 2 * (abs(P[(1, 1)]) + abs(P[(1, -1)]))) / (1 - abs(C)))
    minDefect = min(minDefect, max(abs(abs(P[(1, 0)]) ** 2 - 4 * abs(P[(1, 1)]) * abs(P[(1, -1)])), abs(abs(P[(0, 1)]) ** 2 - 4 * abs(P[(1, 1)]) * abs(P[(-1, 1)])), P[(0, 0)].real - 2 * (abs(P[(1, 1)]) + abs(P[(1, -1)]))) / (S * S))
out["R1"] = {"pairs": 300, "maxAbsErr": {k: float(v) for k, v in e.items()}, "min_(p00 - 2|p11| - 2|p1,-1|)/(1-|cos gamma|)": float(minConstGap), "minSquareDefectOverSin2": float(minDefect)}
print("R1", out["R1"])

# ---------- R2: ratio 3:1. Symbolic reduction and the exact solution ----------
q, u = sp.symbols("q u", positive=True)       # q = c_j^2 = 1 - 9 a^2, u = c_i / c_j > 0 with 9 u^2 q = 8 + q
poly = sp.expand(q * (8 + q) * (4 * q ** 2 - 8 * q + 5) ** 2 - (4 + 5 * q - 8 * q ** 2 - 4 * q ** 3) ** 2)
fac = sp.factor(poly)
qq_ = sp.symbols("qq", real=True)
rr = sp.real_roots(sp.Poly(poly.subs(q, qq_), qq_))          # exact isolation, with multiplicity
out_all = [float(sp.N(r, 20)) for r in rr]
real01 = [complex(float(sp.N(r, 20))) for r in rr if 0 < sp.N(r) < 1]
unsq = lambda qq: float(np.sqrt(qq * (8 + qq)) * (4 * qq ** 2 - 8 * qq + 5) - (4 + 5 * qq - 8 * qq ** 2 - 4 * qq ** 3))
out["R2_symbolic"] = {"squaredCondition": str(fac), "allRealRootsWithMultiplicity": out_all, "rootsIn(0,1)": [float(r.real) for r in real01], "unsquaredResidualAtRoots": [unsq(r.real) for r in real01]}
print("R2 symbolic", out["R2_symbolic"])
# direct construction at q = 1/3: a_i^2 = 2/27 (rate 3), a_j^2 = 2/3 (rate 1), cos gamma = 7/9, heights of equal sign, phase phi_i - 3 phi_j = pi in the common-perpendicular frame
def pair31(ai, C, epsj, phi, N=4096):
    aj = 3 * ai; ci = np.sqrt(1 - ai * ai); cj = epsj * np.sqrt(1 - aj * aj)
    ni = np.array([0, 0, 1.0]); nj = np.array([np.sqrt(1 - C * C), 0, C]); l = np.cross(ni, nj); l /= np.linalg.norm(l)
    t = 2 * np.pi * np.arange(N) / N
    Xi = pos(ni, l, np.cross(ni, l), ci, ai, 3 * t + phi); Xj = pos(nj, l, np.cross(nj, l), cj, aj, t)
    return t, np.sum((Xi - Xj) ** 2, axis=1)
def roots_zeta(D):                     # the eight roots in zeta of zeta^4 D(zeta), from the Fourier coefficients
    N = len(D); Fh = np.fft.fft(D) / N; co = [Fh[k % N] for k in range(4, -5, -1)]
    return np.roots(co), float(np.abs(Fh[5:N - 4]).max())
t, D = pair31(np.sqrt(2 / 27), 7 / 9, 1, np.pi)
r, hi = roots_zeta(D); r = r[np.argsort(np.angle(r))]
gaps = sorted(abs(r[i] - r[j]) for i in range(8) for j in range(i + 1, 8))
out["R2_exactSolution"] = {"minD_over_period": float(D.min()), "maxD": float(D.max()), "fourSmallestRootGaps": [float(g) for g in gaps[:4]], "fifthRootGap": float(gaps[4]), "rootModuli": [float(abs(x)) for x in r], "higherHarmonics": hi}
print("R2 exact", out["R2_exactSolution"])
# random 3:1 pairs: smallest root gap (all eight roots simple), and the phase condition: with phi != pi the candidate geometry is not a square
mins = []
for n in range(300):
    ai = rng.uniform(0.03, 0.33); C = rng.uniform(-0.98, 0.98); t, D = pair31(ai, C, rng.choice([-1, 1]), rng.uniform(0, 2 * np.pi))
    if D.min() < 1e-3: continue
    r, hi = roots_zeta(D); mins.append(min(abs(r[i] - r[j]) for i in range(8) for j in range(i + 1, 8)))
out["R2_random"] = {"collisionFreePairs": len(mins), "minRootGap": float(min(mins)), "medianRootGap": float(np.median(mins))}
print("R2 random", out["R2_random"])
# least-squares attempt to make a collision-free 3:1 pair a square: minimize the residual of conditions A and B together with a margin
from scipy.optimize import least_squares
def AB(x, eps):
    a, C = x; q_ = 1 - 9 * a * a; uu = eps * np.sqrt((1 - a * a) / q_)
    A = (1 + C) - 18 * a * a * (1 - C) * (3 * uu + 1)
    B = 2 - 2 * uu * q_ * C - (3 * a * a * (1 - C) + (1 + C) ** 2 / (216 * a * a * (1 - C)) + q_ * (1 + C) / 3)
    return [A, B]
best = {}
for eps in (1, -1):
    sols = []
    for k in range(300):
        x0 = [rng.uniform(0.02, 0.33), rng.uniform(-0.98, 0.98)]
        res = least_squares(AB, x0, args=(eps,), bounds=([1e-3, -0.999], [1 / 3 - 1e-6, 0.999]), xtol=1e-15, ftol=1e-15, gtol=1e-15)
        sols.append((float(np.max(np.abs(res.fun))), float(res.x[0] ** 2), float(res.x[1])))
    sols.sort(); best["sameSignHeights" if eps == 1 else "oppositeSignHeights"] = {"smallestResidual": sols[0][0], "at_a2_cosGamma": sols[0][1:], "countBelow1e-8": sum(1 for s in sols if s[0] < 1e-8), "spreadOfSolutions_a2": [min(s[1] for s in sols if s[0] < 1e-8), max(s[1] for s in sols if s[0] < 1e-8)] if any(s[0] < 1e-8 for s in sols) else None}
out["R2_conditionsAB"] = best; print("R2 AB", best)
# the reduction of (B): with (1+C)/(1-C) = t = 2 (1-q)(3u+1) from (A), 3 q (1+t) [lhs(B) - rhs(B)] = 2 [(4q^3+8q^2-5q-4) + sqrt(q(8+q)) (4q^2-8q+5)]
worst = 0.0; signs = []
for qv in np.linspace(0.01, 0.99, 197):
    a2 = (1 - qv) / 9; uu = np.sqrt((8 + qv) / (9 * qv)); tt = 2 * (1 - qv) * (3 * uu + 1); Cc = (tt - 1) / (tt + 1); av = np.sqrt(a2)
    Bres = AB([av, Cc], 1)[1]; Ares = AB([av, Cc], 1)[0]
    red = 2 * ((4 * qv ** 3 + 8 * qv ** 2 - 5 * qv - 4) + np.sqrt(qv * (8 + qv)) * (4 * qv ** 2 - 8 * qv + 5))
    worst = max(worst, abs(3 * qv * (1 + tt) * Bres - red), abs(Ares)); signs.append(float(np.sign(red)) if abs(qv - 1 / 3) > 0.004 else 0.0)
out["R2_reductionIdentity"] = {"gridPoints": 197, "maxAbsErr": float(worst), "signOfReducedConditionBelowOneThird": sorted(set(s for s, qv in zip(signs, np.linspace(0.01, 0.99, 197)) if qv < 1 / 3 - 0.004)), "signAboveOneThird": sorted(set(s for s, qv in zip(signs, np.linspace(0.01, 0.99, 197)) if qv > 1 / 3 + 0.004))}
print("R2 reduction", out["R2_reductionIdentity"])
# ---------- R3: direct squareness defect of 3:1 pairs, independent of the reduction: top-down square root of the Laurent polynomial ----------
def square_defect(D):
    N = len(D); Fh = np.fft.fft(D) / N; d = {k: Fh[k % N] for k in range(-4, 5)}
    g2 = np.sqrt(d[4]); g1 = d[3] / (2 * g2); g0 = (d[2] - g1 * g1) / (2 * g2); gm1 = (d[1] - 2 * g1 * g0) / (2 * g2); gm2 = (d[0] - 2 * g1 * gm1 - g0 * g0) / (2 * g2)
    g = {2: g2, 1: g1, 0: g0, -1: gm1, -2: gm2}
    res = 0.0
    for k in range(-4, 0):
        sq = sum(g[i] * g[k - i] for i in g if (k - i) in g); res += abs(sq - d[k]) ** 2
    return float(np.sqrt(res) / np.sqrt(sum(abs(v) ** 2 for v in d.values())))
samples = []
for n in range(20000):
    ai = rng.uniform(0.02, 0.333); C = rng.uniform(-0.99, 0.99); ej = rng.choice([-1, 1]); phi = rng.uniform(0, 2 * np.pi)
    t, D = pair31(ai, C, ej, phi, N=64); samples.append((square_defect(D), float(D.min()), ai * ai, C, int(ej), phi))
free = [x for x in samples if x[1] >= 0.01]
free.sort()
tang = pair31(np.sqrt(2 / 27), 7 / 9, 1, np.pi, N=64)[1]
# local refinement of the best collision-free samples with the margin enforced by a penalty
from scipy.optimize import minimize
def obj(x, ej):
    ai, C, phi = x
    if not (0.01 < ai < 0.3333 and -0.995 < C < 0.995): return 10.0
    t, D = pair31(ai, C, ej, phi, N=64); return square_defect(D) + 10.0 * max(0.0, 0.01 - D.min())
refined = []
for x in free[:15]:
    r_ = minimize(obj, [np.sqrt(x[2]), x[3], x[5]], args=(x[4],), method="Nelder-Mead", options={"xatol": 1e-10, "fatol": 1e-14, "maxiter": 4000})
    t, D = pair31(r_.x[0], r_.x[1], x[4], r_.x[2], N=64); refined.append((float(r_.fun), float(D.min()), float(r_.x[0] ** 2), float(r_.x[1]), float(np.mod(r_.x[2], 2 * np.pi))))
refined.sort()
out["R3_directDefect"] = {"samples": 20000, "collisionFreeWithMargin0.01": len(free), "defectAtTangentConfiguration": square_defect(tang), "minDefectAmongCollisionFreeSamples": free[0][0], "bestRefinedWithMargin": {"defect": refined[0][0], "minD": refined[0][1], "a_i^2": refined[0][2], "cosGamma": refined[0][3], "phi": refined[0][4]}}
print("R3", out["R3_directDefect"])
out["finishedUTC"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
json.dump(out, open(__file__.replace(".py", ".json"), "w"), indent=1)
print("written", out["finishedUTC"])
