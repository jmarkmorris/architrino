# Independent reference for H1 release states: static inverse-square acceleration field of the fixed release configuration
# (valid because every release root lies in the stationary past: min delay > R/4). Also computes d(v.A)/dT along the selected law.
import json, sys, numpy as np
d = json.load(open(sys.argv[1]))
out = []
for row in d["rows"]:
    if row["H"] != "H1" or row["s"] != 0: continue
    R = row["R"]; mem = row["members"]
    X = np.array([m["X"] for m in mem]); V = np.array([m["V"] for m in mem]); q = np.array([m["q"] for m in mem], float)
    maxdiff = 0.0; curv = []
    for i in range(6):
        F = np.zeros(3); J = np.zeros((3,3))
        for j in range(6):
            if j == i: continue
            r = X[i] - X[j]; rn = np.linalg.norm(r); s = np.sign(q[i]*q[j])
            F += s * r / rn**3
            J += s * (np.eye(3)/rn**3 - 3*np.outer(r, r)/rn**5)
        Ai = np.array(mem[i]["A"]); maxdiff = max(maxdiff, np.linalg.norm(F - Ai))
        n = X[i]/R; P = np.eye(3) - np.outer(n, n); v = V[i]; sp = np.linalg.norm(v)
        a = P @ F - (sp**2/R) * n                      # selected law at release
        dvA = a @ F + v @ (J @ v)                        # d/dT (v.A) along the selected law, static sources
        dspeed = (v @ F)/sp if sp > 0 else None
        d2speed = (dvA - dspeed**2)/sp if sp > 0 else None   # d^2|v|/dT^2
        curv.append((dspeed, d2speed))
    out.append((row["id"], maxdiff, row["minLeadingDelay"], R/4, curv))
for id_, md, mt, q4, curv in out:
    print(f"{id_:10s} max|A_static - A_instrument| = {md:.3e}  minDelay {mt:.4f} > R/4 {q4:.4f}: {mt > q4}")
    print("   d|v|/dT:", ", ".join(f"{c[0]:+.6f}" for c in curv))
    print("   d2|v|/dT2:", ", ".join(f"{c[1]:+.6f}" for c in curv))
