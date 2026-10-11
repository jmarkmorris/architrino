# Wave 7 (1): structured search for tangent equilibria of three positrinos and three electrinos at rest on the unit sphere
# under the static field A_i = K sum_j sigma_ij (X_i - X_j)/|X_i - X_j|^3 (the release law with a stationary past, K = 1, R = 1).
# Objective: max_i |P_i A_i| over the twelve tangent coordinates (spherical angles of the six members).
# Method: Nelder-Mead on the objective, then Levenberg-Marquardt (Newton-type) on the twelve tangent residual components.
# Independent of the symmetry worker's census (none of its files read). Run from the checkout root, one thread, timed:
#   OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p ../.venv/bin/python -I <this file> <out.json>
import numpy as np, json, sys, time, itertools
from scipy.optimize import minimize, least_squares

POL = np.array([1, 1, 1, -1, -1, -1], float)
def points(theta):
    th = theta[:6]; ph = theta[6:]
    return np.stack([np.sin(th)*np.cos(ph), np.sin(th)*np.sin(ph), np.cos(th)], 1)
def angles(X):
    return np.concatenate([np.arccos(np.clip(X[:, 2], -1, 1)), np.arctan2(X[:, 1], X[:, 0])])
def field(X):
    A = np.zeros((6, 3))
    for i in range(6):
        for j in range(6):
            if j == i: continue
            r = X[i]-X[j]; A[i] += np.sign(POL[i]*POL[j])*r/np.linalg.norm(r)**3
    return A
def tangent_acc(X):
    A = field(X); return np.array([A[i] - (X[i] @ A[i])*X[i] for i in range(6)])
def objective(theta): return np.max(np.linalg.norm(tangent_acc(points(theta)), axis=1))
def residuals(theta):
    X = points(theta); PA = tangent_acc(X); out = []
    for i in range(6):   # two tangent components per member in a local orthonormal basis
        n = X[i]; a = np.array([0, 0, 1.0]) if abs(n[2]) < 0.9 else np.array([1.0, 0, 0])
        e1 = a - (a @ n)*n; e1 /= np.linalg.norm(e1); e2 = np.cross(n, e1)
        out += [PA[i] @ e1, PA[i] @ e2]
    return np.array(out)
def min_chord(X): return min(np.linalg.norm(X[i]-X[j]) for i in range(6) for j in range(i+1, 6))
def chord_set(X):
    """Sorted labelled chord multiset (PP, PE, EE classes), invariant under rotations and polarity-preserving permutations."""
    cs = {"PP": [], "PE": [], "EE": []}
    for i in range(6):
        for j in range(i+1, 6):
            lab = "PP" if POL[i] > 0 and POL[j] > 0 else ("EE" if POL[i] < 0 and POL[j] < 0 else "PE")
            cs[lab].append(round(float(np.linalg.norm(X[i]-X[j])), 6))
    return {k: sorted(v) for k, v in cs.items()}
def describe(X):
    cs = chord_set(X); allc = sorted(cs["PP"] + cs["PE"] + cs["EE"])
    distinct = sorted(set(round(c, 4) for c in allc))
    planar = bool(abs(np.linalg.det(np.cov(X.T))) < 1e-10 or np.linalg.svd(X - X.mean(0), compute_uv=False)[-1] < 1e-6)
    centroid = float(np.linalg.norm(X.mean(0)))
    inversion = bool(all(any(np.allclose(-X[i], X[j], atol=1e-6) and POL[j] == -POL[i] for j in range(6)) for i in range(6)))
    note = []
    if planar: note.append("coplanar")
    if inversion: note.append("inversion maps each member to an opposite-polarity member")
    if len(distinct) == 3 and sorted(distinct) == [1.0, round(np.sqrt(3), 4), 2.0] and planar: note.append("regular alternating hexagon")
    return {"chord_set": cs, "distinct_chords": distinct, "centroid_norm": centroid, "notes": note}
def canonical_key(X): cs = chord_set(X); return tuple(round(c, 4) for c in cs["PP"] + cs["PE"] + cs["EE"])

def run(theta0, label):
    t0 = time.time()
    r1 = minimize(objective, theta0, method="Nelder-Mead", options={"maxiter": 6000, "maxfev": 12000, "xatol": 1e-10, "fatol": 1e-12, "adaptive": True})
    r2 = least_squares(residuals, r1.x, method="lm", xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=2000)
    X = points(r2.x); f = objective(r2.x)
    return {"label": label, "nm_value": float(r1.fun), "nm_iters": int(r1.nit), "final_max_PA": float(f), "lm_cost": float(r2.cost), "min_chord": float(min_chord(X)), "X": X.tolist(), "wall_s": time.time()-t0, "describe": describe(X)}

out = {"objective": "max_i |P_i A_i| at rest, K = R = 1, polarities (+,+,+,-,-,-)", "controls": [], "starts": [], "equilibria": [], "stalled": [], "others": []}
T0 = time.time()
# ---- starts
hexX = np.array([[np.cos(k*np.pi/3), np.sin(k*np.pi/3), 0.0] for k in range(6)]); hexPOL = np.array([(-1)**k for k in range(6)], float)
# the objective uses polarities (+,+,+,-,-,-) by member index, so reorder the hexagon so that members 0-2 are its positrinos
hexX = np.concatenate([hexX[hexPOL > 0], hexX[hexPOL < 0]])
rng = np.random.default_rng(20261011)
def perturb(X, eps, rng):
    Y = []
    for n in X:
        v = rng.normal(size=3); v -= (v @ n)*n; v = v/np.linalg.norm(v)*eps
        y = n*np.cos(eps) + v/eps*np.sin(eps); Y.append(y/np.linalg.norm(y))
    return np.array(Y)
starts = [("hexagon perturbed 0.1 rad (control)", angles(perturb(hexX, 0.1, rng)))]
octA = np.array([[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]], float)                  # canonical: antipodes opposite polarity
octB = np.array([[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], float)                  # one ++ pair, one -- pair, one mixed pair
starts += [("octahedron class A (canonical six poles) as start", angles(octA)), ("octahedron class B (++, --, +-) as start", angles(octB))]
out["controls"].append({"name": "octahedron class A is not an equilibrium: max |PA| = 1 exactly", "pass": bool(abs(objective(angles(octA)) - 1.0) < 1e-12), "value": float(objective(angles(octA)))})
out["controls"].append({"name": "octahedron class B is not an equilibrium: max |PA| > 0.05", "pass": bool(objective(angles(octB)) > 0.05), "value": float(objective(angles(octB)))})
out["controls"].append({"name": "unperturbed hexagon is an equilibrium: max |PA| < 1e-12", "pass": bool(objective(angles(hexX)) < 1e-12), "value": float(objective(angles(hexX)))})
def random_start(rng):
    for _ in range(10000):
        X = rng.normal(size=(6, 3)); X /= np.linalg.norm(X, axis=1)[:, None]
        if min_chord(X) >= 0.3: return X
for k in range(12):
    starts.append((f"random start {k} (seed 20261011 stream, chord rule 0.3)", angles(random_start(rng))))
# ---- runs
for label, th in starts:
    r = run(th, label); out["starts"].append({k: v for k, v in r.items() if k != "X"} | {"X": r["X"]})
    key = canonical_key(np.array(r["X"]))
    if r["final_max_PA"] < 1e-6:
        if not any(e["key"] == key for e in out["equilibria"]): out["equilibria"].append({"key": key, "first_label": label, "max_PA": r["final_max_PA"], "min_chord": r["min_chord"], "describe": r["describe"], "X": r["X"], "count": 1})
        else: [e for e in out["equilibria"] if e["key"] == key][0]["count"] += 1
    elif r["final_max_PA"] > 0.05: out["stalled"].append({"label": label, "max_PA": r["final_max_PA"], "chord_set": r["describe"]["chord_set"], "min_chord": r["min_chord"]})
    else: out["others"].append({"label": label, "max_PA": r["final_max_PA"], "chord_set": r["describe"]["chord_set"]})
    print(f"{label}: NM {r['nm_value']:.3e} ({r['nm_iters']} it) -> LM max|PA| {r['final_max_PA']:.3e}, min chord {r['min_chord']:.4f}, {r['wall_s']:.1f} s; notes {r['describe']['notes']}; distinct chords {r['describe']['distinct_chords']}")
out["controls"].append({"name": "hexagon perturbed by 0.1 rad returns to the hexagon with max |PA| < 1e-8", "pass": bool(out["starts"][0]["final_max_PA"] < 1e-8) and "regular alternating hexagon" in out["starts"][0]["describe"]["notes"], "value": out["starts"][0]["final_max_PA"]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); out["wall_s"] = time.time()-T0
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"], c.get("value")) for c in out["controls"]]
print(f"distinct equilibria (max|PA| < 1e-6, up to rotation and polarity-preserving permutation): {len(out['equilibria'])}; stalled (> 0.05): {len(out['stalled'])}; intermediate: {len(out['others'])}; total wall {out['wall_s']:.1f} s")
json.dump(out, open(sys.argv[1], "w"), indent=1)
