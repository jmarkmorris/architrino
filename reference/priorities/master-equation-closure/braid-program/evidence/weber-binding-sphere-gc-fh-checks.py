# weber-binding-sphere-gc-fh-checks.py
# Great-circle closure lane, Section 20 (2026-10-06): numerical test of the finite-harmonic lemma.
# A real vector trigonometric polynomial X(t) of degree <= M with |X| = 1 and |X'| = v > 0 is a uniformly traversed circle.
# For M = 2, 3, 4: least-squares minimization of the sphere and speed defects from random starts; every zero found is examined.
# Known case first. Usage: ../../../../../../.venv/bin/python weber-binding-sphere-gc-fh-checks.py  (writes weber-binding-sphere-gc-fh-checks.json)
import json, datetime
import numpy as np
from scipy.optimize import least_squares
rng = np.random.default_rng(20261010)
out = {"script": "weber-binding-sphere-gc-fh-checks.py", "startedUTC": datetime.datetime.now(datetime.timezone.utc).isoformat()}

def curve(c, M, t):
    # c: (2M+1, 3): row 0 constant, row 2m-1 cos(m t), row 2m sin(m t); returns X, X', X''
    X = np.tile(c[0], (len(t), 1)); X1 = np.zeros_like(X); X2 = np.zeros_like(X)
    for m in range(1, M + 1):
        co, si = np.cos(m * t)[:, None], np.sin(m * t)[:, None]; a, b = c[2 * m - 1], c[2 * m]
        X = X + co * a + si * b; X1 = X1 + m * (-si * a + co * b); X2 = X2 - m * m * (co * a + si * b)
    return X, X1, X2
def defects(p, M, t):
    c = p[:-1].reshape(2 * M + 1, 3); w = p[-1]; X, X1, _ = curve(c, M, t)
    return np.concatenate([np.sum(X * X, axis=1) - 1, np.sum(X1 * X1, axis=1) - w]) / np.sqrt(len(t))
def jac(p, M, t):
    c = p[:-1].reshape(2 * M + 1, 3); X, X1, _ = curve(c, M, t); N = len(t); nb = 2 * M + 1
    phi = np.ones((N, nb)); dphi = np.zeros((N, nb))
    for m in range(1, M + 1):
        phi[:, 2 * m - 1] = np.cos(m * t); phi[:, 2 * m] = np.sin(m * t); dphi[:, 2 * m - 1] = -m * np.sin(m * t); dphi[:, 2 * m] = m * np.cos(m * t)
    J = np.zeros((2 * N, 3 * nb + 1))
    J[:N, :-1] = (2 * phi[:, :, None] * X[:, None, :]).reshape(N, 3 * nb); J[N:, :-1] = (2 * dphi[:, :, None] * X1[:, None, :]).reshape(N, 3 * nb); J[N:, -1] = -1
    return J / np.sqrt(N)
def solve(p, M, t, nfev=600):
    # the zero set is not isolated and the Jacobian is rank deficient on it, so convergence is slow; a capped number of evaluations is used
    return least_squares(defects, p, jac=jac, args=(M, t), method="lm", xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=nfev)
def examine(p, M):
    c = p[:-1].reshape(2 * M + 1, 3); t = np.linspace(0, 2 * np.pi, 720, endpoint=False); X, X1, X2 = curve(c, M, t)
    v = np.sqrt(np.sum(X1 * X1, axis=1)); e1 = X / np.linalg.norm(X, axis=1)[:, None]; e2 = X1 / v[:, None]; e3 = np.cross(e1, e2)
    k = np.sum((X2 / v[:, None]) * e3, axis=1)                      # e2' . e3 with the parameter t (v here is the parameter speed)
    amp = [float(np.hypot(np.linalg.norm(c[2 * m - 1]), np.linalg.norm(c[2 * m]))) for m in range(1, M + 1)]; dom = int(np.argmax(amp)) + 1
    # fixed axis test: D = k e1 + v e3 (R = 1) must be a constant vector
    D = k[:, None] * e1 + v[:, None] * e3
    return {"kVariation": float(k.max() - k.min()), "kMean": float(k.mean()), "axisVariation": float(np.max(np.linalg.norm(D - D.mean(axis=0), axis=1))), "winding": dom, "otherHarmonics": float(max([a for m, a in enumerate(amp, 1) if m != dom] + [0.0])), "speed": float(v.mean()), "height": float(abs(np.linalg.norm(c[0])))}

# ---------- known case: a doubly traversed tilted small circle is a zero, and is recovered from a perturbed start ----------
M = 3; n = np.array([0.3, -0.5, 0.8]); n /= np.linalg.norm(n); u = np.cross(n, [0, 0, 1.0]); u /= np.linalg.norm(u); up = np.cross(n, u); cc, aa = 0.6, 0.8
c0 = np.zeros((2 * M + 1, 3)); c0[0] = cc * n; c0[3] = aa * u; c0[4] = aa * up                    # harmonic 2
t = 2 * np.pi * np.arange(8 * M + 8) / (8 * M + 8); p0 = np.concatenate([c0.ravel(), [(2 * aa) ** 2]])
ex0 = examine(p0, M); d0 = float(np.max(np.abs(defects(p0, M, t))))
# Jacobian check against central differences
pj = p0 + 0.1 * rng.normal(size=p0.size); Jn = np.zeros((2 * len(t), pj.size))
for kk in range(pj.size):
    e_ = np.zeros(pj.size); e_[kk] = 1e-6; Jn[:, kk] = (defects(pj + e_, M, t) - defects(pj - e_, M, t)) / 2e-6
jacErr = float(np.max(np.abs(Jn - jac(pj, M, t))))
res = solve(p0 + 0.05 * rng.normal(size=p0.size), M, t, nfev=20000)
exr = examine(res.x, M)
# a non-circle with the same harmonics has a non-constant k and a positive defect (tennis-ball seam curve on the sphere, not equal speed)
a_, b_ = 0.7, 0.3; cs = np.zeros((7, 3)); cs[1] = [a_, 0, 0]; cs[2] = [0, a_, 0]; cs[5] = [b_, 0, 0]; cs[6] = [0, -b_, 0]; cs[4] = [0, 0, 2 * np.sqrt(a_ * b_)]
ps = np.concatenate([cs.ravel(), [1.0]]); exs = examine(ps, 3); Xs, X1s, _ = curve(cs, 3, t)
out["knownCase"] = {"circle_defect": d0, "circle_kVariation": ex0["kVariation"], "circle_axisVariation": ex0["axisVariation"], "circle_winding": ex0["winding"],
                    "jacobianMaxErr": jacErr, "recovered_cost": float(2 * res.cost), "recovered_axisVariation": exr["axisVariation"], "recovered_kVariation": exr["kVariation"], "recovered_winding": exr["winding"],
                    "seamCurve_sphereDefect": float(np.max(np.abs(np.sum(Xs * Xs, axis=1) - 1))), "seamCurve_speedSpread": float(np.ptp(np.sqrt(np.sum(X1s * X1s, axis=1)))), "seamCurve_kVariation": exs["kVariation"]}
out["knownCase"]["pass"] = bool(d0 < 1e-13 and ex0["kVariation"] < 1e-12 and ex0["winding"] == 2 and jacErr < 1e-8 and res.cost < 1e-18 and exr["kVariation"] < 1e-3 and out["knownCase"]["seamCurve_speedSpread"] > 0.1 and exs["kVariation"] > 0.1)
print("known", out["knownCase"]); assert out["knownCase"]["pass"]

# ---------- targets: M = 2, 3, 4 ----------
rec = {}
for M in (2, 3, 4):
    t = 2 * np.pi * np.arange(8 * M + 8) / (8 * M + 8); zeros = []; nonzero = []; degenerate = 0; starts = 120
    for s in range(starts):
        c = rng.normal(size=(2 * M + 1, 3)) * (0.6 / (1 + np.arange(2 * M + 1) // 2 + 0.0))[:, None] * rng.uniform(0.3, 1.5)
        if s % 4 == 0: c[0] = 0
        p = np.concatenate([c.ravel(), [rng.uniform(0.2, 6.0)]])
        r = solve(p, M, t)
        dmax = float(np.max(np.abs(defects(r.x, M, np.linspace(0, 2 * np.pi, 512, endpoint=False))) * np.sqrt(512)))
        if dmax < 1e-7:                                  # near-zero: record the defect with the curvature variation; the lemma predicts kVariation -> 0 with the defect
            if r.x[-1] < 1e-4: degenerate += 1; continue
            r = solve(r.x, M, t, nfev=3000)              # polish
            dmax = float(np.max(np.abs(defects(r.x, M, np.linspace(0, 2 * np.pi, 512, endpoint=False))) * np.sqrt(512)))
            z = examine(r.x, M); z["defect"] = dmax; z["relK"] = z["kVariation"] / (abs(z["kMean"]) + z["speed"]); zeros.append(z)
        else: nonzero.append(dmax)
    rec[str(M)] = {"starts": starts, "zerosFound": len(zeros), "degenerateConstantCurves": degenerate, "notConverged": len(nonzero), "smallestDefectAmongNotConverged": float(min(nonzero)) if nonzero else None,
                   "max_kVariation_amongZeros": max(z["kVariation"] for z in zeros) if zeros else None, "median_kVariation_amongZeros": float(np.median([z["kVariation"] for z in zeros])) if zeros else None, "max_axisVariation_amongZeros": max(z["axisVariation"] for z in zeros) if zeros else None,
                   "max_otherHarmonics_amongZeros": max(z["otherHarmonics"] for z in zeros) if zeros else None, "largestDefectAmongZeros": max(z["defect"] for z in zeros) if zeros else None,  "zerosWithDefectBelow1e-12": sum(1 for z in zeros if z["defect"] < 1e-12), "max_kVariation_amongThose": max([z["kVariation"] for z in zeros if z["defect"] < 1e-12] + [0.0]), "converged(defect<1e-12)": {"count": sum(1 for z in zeros if z["defect"] < 1e-12), "max_otherHarmonics": max([z["otherHarmonics"] for z in zeros if z["defect"] < 1e-12] + [0.0]), "max_relative_kVariation": max([z["relK"] for z in zeros if z["defect"] < 1e-12] + [0.0]), "median_otherHarmonics": float(np.median([z["otherHarmonics"] for z in zeros if z["defect"] < 1e-12] or [0.0]))}, "stillDescending(defect>=1e-12)": {"count": sum(1 for z in zeros if z["defect"] >= 1e-12), "max_otherHarmonics": max([z["otherHarmonics"] for z in zeros if z["defect"] >= 1e-12] + [0.0])}, "windingCounts": {str(w): sum(1 for z in zeros if z["winding"] == w) for w in range(1, M + 1)},
                   "greatCircles": sum(1 for z in zeros if z["height"] < 1e-6), "smallCircles": sum(1 for z in zeros if z["height"] >= 1e-6)}
    print("M", M, rec[str(M)])
out["targets"] = rec
out["finishedUTC"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
json.dump(out, open(__file__.replace(".py", ".json"), "w"), indent=1); print("written", out["finishedUTC"])
