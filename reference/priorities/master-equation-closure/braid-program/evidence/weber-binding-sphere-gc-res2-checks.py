# weber-binding-sphere-gc-res2-checks.py
# Great-circle closure lane, Section 18 (2026-10-06): spot checks for coprime odd radius ratios r:s (rates r and s), non-parallel axes.
# R = 1; only the squared separation D of a prescribed pair is involved. Known case first.
# Usage: ../../../../../../.venv/bin/python weber-binding-sphere-gc-res2-checks.py   (writes weber-binding-sphere-gc-res2-checks.json)
import json, datetime
import numpy as np
rng = np.random.default_rng(20261009)
out = {"script": "weber-binding-sphere-gc-res2-checks.py", "startedUTC": datetime.datetime.now(datetime.timezone.utc).isoformat()}

def pair(r, s, a0, C, ei, ej, phi, N=256):
    # member i: rate r, radius a_i = s a0; member j: rate s, radius a_j = r a0; frame u_i = u_j = l, phases phi_i = phi, phi_j = 0
    ai, aj = s * a0, r * a0; ci = ei * np.sqrt(1 - ai * ai); cj = ej * np.sqrt(1 - aj * aj)
    ni = np.array([0, 0, 1.0]); nj = np.array([np.sqrt(1 - C * C), 0, C]); l = np.cross(ni, nj); l /= np.linalg.norm(l)
    t = 2 * np.pi * np.arange(N) / N
    P = lambda n, c, a, th: c * n + a * (np.cos(th)[:, None] * l + np.sin(th)[:, None] * np.cross(n, l))
    D = np.sum((P(ni, ci, ai, r * t + phi) - P(nj, cj, aj, s * t)) ** 2, axis=1)
    Fh = np.fft.fft(D) / N
    return D, (lambda k: Fh[k % N]), dict(ai=ai, aj=aj, ci=ci, cj=cj)
def topdown(d, r, s):
    # h_k = g_{m-k}/g_m from the top: H^2 = E, E_k = d_{r+s-k}/d_{r+s}; returns h_0..h_{r+s} computed from E_0..E_{r+s} only
    n = r + s; E = [d(n - k) / d(n) for k in range(2 * n + 1)]; h = [1.0 + 0j]
    for k in range(1, n + 1): h.append((E[k] - sum(h[i] * h[k - i] for i in range(1, k))) / 2)
    resid = np.sqrt(sum(abs(sum(h[i] * h[k - i] for i in range(max(0, k - n), min(n, k) + 1)) - E[k]) ** 2 for k in range(n + 1, 2 * n + 1)))
    return h, float(resid / np.sqrt(sum(abs(e) ** 2 for e in E)))

# known case: the tangent 3:1 configuration of Lemma 17.4 is a square; a generic 3:1 pair is not
D, d, _ = pair(3, 1, np.sqrt(2 / 27), 7 / 9, 1, 1, np.pi); k1 = topdown(d, 3, 1)[1]
D, d, _ = pair(3, 1, 0.2, 0.3, 1, -1, 1.0); k2 = topdown(d, 3, 1)[1]
out["knownCase"] = {"defect_tangent_3to1": k1, "defect_generic_3to1": k2, "pass": bool(k1 < 1e-10 and k2 > 1e-2)}; print("known", out["knownCase"]); assert out["knownCase"]["pass"]

# support of D and of the top-down root for 5:3 and 7:3 (Lemma 18.1): D has only the exponents 0, s, r-s, r, r+s; h_k = 0 for 0 < k < r unless s | k
rec = {}
for (r, s) in [(5, 3), (7, 3), (7, 5)]:
    offD = 0; offH = 0; mind = np.inf; n = r + s
    for it in range(200):
        a0 = rng.uniform(0.02, 0.99 / r); D, d, g = pair(r, s, a0, rng.uniform(-0.95, 0.95), rng.choice([-1, 1]), rng.choice([-1, 1]), rng.uniform(0, 2 * np.pi))
        allowed = {0, s, r - s, r, r + s}; offD = max(offD, max(abs(d(k)) for k in range(0, 2 * n) if k not in allowed) / abs(d(0)))
        h, defect = topdown(d, r, s); offH = max(offH, max(abs(h[k]) for k in range(1, r) if k % s))
        mind = min(mind, defect)
    rec[f"{r}:{s}"] = {"pairs": 200, "maxOffSupportCoefficientOfD": float(offD), "max_h_k_notMultipleOf_s_below_r": float(offH), "minSquareDefect": float(mind)}
out["oddOdd_s_ge_3"] = rec; print("s>=3", rec)

# 5:1 (Lemma 18.2): closed forms of the low coefficients and of e_5, e_6; the quantity f = 1 - h_2 - h_2^2 on the constraint; direct defect
e = {"e1": 0, "e2": 0, "sigma1": 0, "sigma2": 0, "sigma3": 0, "sigma4": 0, "e5": 0, "e6": 0}; mind = np.inf; mindFree = np.inf
for it in range(300):
    a0 = rng.uniform(0.02, 0.198); C = rng.uniform(-0.95, 0.95); ei, ej = rng.choice([-1, 1]), rng.choice([-1, 1]); phi = rng.uniform(0, 2 * np.pi)
    D, d, g = pair(5, 1, a0, C, ei, ej, phi); kap = np.sqrt((1 + C) / (1 - C)); be = g["cj"] / g["aj"]; bi = g["ci"] / g["ai"]
    h, defect = topdown(d, 5, 1); mind = min(mind, defect)
    if D.min() > 0.01: mindFree = min(mindFree, defect)
    E = lambda k: d(6 - k) / d(6)
    e["e1"] = max(e["e1"], abs(E(1) - 2j * be * kap)); e["e2"] = max(e["e2"], abs(E(2) - kap ** 2))
    e["sigma1"] = max(e["sigma1"], abs(h[1] - 1j * be * kap)); e["sigma2"] = max(e["sigma2"], abs(h[2] - kap ** 2 * (1 + be ** 2) / 2))
    e["sigma3"] = max(e["sigma3"], abs(h[3] + 1j * kap ** 3 * be * (1 + be ** 2) / 2) / (1 + abs(h[3]))); e["sigma4"] = max(e["sigma4"], abs(h[4] + kap ** 4 * (1 + be ** 2) * (1 + 5 * be ** 2) / 8) / (1 + abs(h[4])))
    e["e5"] = max(e["e5"], abs(E(5) + 2j * bi * kap * np.exp(-1j * phi)) / (1 + abs(E(5))))
    e["e6"] = max(e["e6"], abs(E(6) + (2 - 2 * g["ci"] * g["cj"] * C) * np.exp(-1j * phi) / (g["ai"] * g["aj"] / 2 * (1 - C))) / (1 + abs(E(6))))
# the inequality of Lemma 18.2 on a grid of alpha = a_i^2 in (0, 1/25): |1 - h2 - h2^2| < 5 < |beta_i / beta_j|
al = np.linspace(1e-5, 1 / 25 - 1e-5, 4000); be2 = (1 - 25 * al) / (25 * al); h2 = 2 * (1 + be2) / (1 + 5 * be2); f = np.abs(1 - h2 - h2 ** 2); ratio = 5 * np.sqrt((1 - al) / (1 - 25 * al))
out["fiveToOne"] = {"pairs": 300, "closedFormMaxErr": {k: float(v) for k, v in e.items()}, "minSquareDefect": float(mind), "minSquareDefect_collisionFree": float(mindFree), "grid_max_absf": float(f.max()), "grid_min_ratio": float(ratio.min()), "grid_min_(ratio - absf)": float((ratio - f).min())}
print("5:1", out["fiveToOne"])
# r:1 for odd r >= 5 (Lemma 18.3): h_k = tau_k (-i kappa)^k for k <= r-1 with (n+1) tau_{n+1} = (2n-1) beta tau_n + (n-2) tau_{n-1};
# e_r = -2 i beta_i kappa e^{-i phi}; and the maximum of 2 r W over the curve (P1) against 2 r (r+1)
recr = {}
for r in (5, 7, 9, 11):
    eh = 0; ee = 0; mind = np.inf
    for it in range(150):
        a0 = rng.uniform(0.02, 0.99 / r); C = rng.uniform(-0.9, 0.9); ei, ej = rng.choice([-1, 1]), rng.choice([-1, 1]); phi = rng.uniform(0, 2 * np.pi)
        D, d, g = pair(r, 1, a0, C, ei, ej, phi, N=512); kap = np.sqrt((1 + C) / (1 - C)); be = g["cj"] / g["aj"]; bi = g["ci"] / g["ai"]
        h, defect = topdown(d, r, 1); mind = min(mind, defect)
        tau = [1.0, -be]
        for n in range(1, r - 1): tau.append(((2 * n - 1) * be * tau[n] + (n - 2) * tau[n - 1]) / (n + 1))
        eh = max(eh, max(abs(h[k] - tau[k] * (-1j * kap) ** k) / (1 + abs(h[k])) for k in range(1, r)))
        ee = max(ee, abs(d(1) / d(r + 1) + 2j * bi * kap * np.exp(-1j * phi)) / (1 + abs(d(1) / d(r + 1))))
    # curve (P1): (r-1) = (2r-5) b p + (r-4) p^2 (1+5b)/4, solved for p > 0 at each b >= 0
    b = np.concatenate([[0.0], np.logspace(-6, 6, 4001)]); A2 = (r - 4) * (1 + 5 * b) / 4; B1 = (2 * r - 5) * b
    pp = (-B1 + np.sqrt(B1 * B1 + 4 * A2 * (r - 1))) / (2 * A2); W2r = (1 + b) * pp * ((2 * r - 3) + (r - 3) * pp)
    recr[f"{r}:1"] = {"pairs": 150, "h_vs_recurrence_relErr": float(eh), "e_r_relErr": float(ee), "minSquareDefect": float(mind), "max_2rW_on_P1": float(W2r.max()), "argmax_b": float(b[W2r.argmax()]), "required_exceeds": 2 * r * (r + 1), "P1_residual_max": float(np.max(np.abs(B1 * pp + A2 * pp * pp - (r - 1))))}
out["rToOne"] = recr; print("r:1", recr)
out["finishedUTC"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
json.dump(out, open(__file__.replace(".py", ".json"), "w"), indent=1); print("written", out["finishedUTC"])
