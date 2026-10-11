import json, mpmath as mp
mp.mp.dps = 40
from independent_reference import field
req = json.load(open("request-h.json"))["request"]; kappa = mp.mpf(req["modelControls"]["coupling"])
anch = [([mp.mpf(c[0]) for c in h["segments"][0]["coefficients"]], int(h["charge"]), h["pathId"]) for h in req["histories"]]
sols = {pid: mp.odefun(field(kappa, q, [(a[0], a[1]) for j, a in enumerate(anch) if j != i]), 0, list(c) + [mp.mpf(0)] * 3, tol=mp.mpf(10) ** -30) for i, (c, q, pid) in enumerate(anch)}
b = json.load(open("ladder-six-with-histories.json"))
for case in b["cases"][:3]:
    rows = []
    for h in case["histories"]:
        for seg in h["segments"]:
            if mp.mpf(seg["endTime"]) <= 0: continue
            T = mp.mpf(seg["endTime"]); t = T - mp.mpf(seg["startTime"]); y = sols[h["pathId"]](T)
            for k in range(3):
                c = [mp.mpf(x) for x in seg["coefficients"][k]]
                pos = c[0] + t * (c[1] + t * (c[2] + t * c[3])); vel = c[1] + t * (2 * c[2] + 3 * t * c[3])
                rows.append((float(abs(pos - y[k]) / mp.mpf(seg["positionErrors"][k])), "position", h["pathId"], k, float(T), float(mp.mpf(seg["positionErrors"][k])), float(abs(pos - y[k]))))
                rows.append((float(abs(vel - y[3 + k]) / mp.mpf(seg["velocityErrors"][k])), "velocity", h["pathId"], k, float(T), float(mp.mpf(seg["velocityErrors"][k])), float(abs(vel - y[3 + k]))))
    rows.sort(reverse=True)
    ratios = [r[0] for r in rows]
    print(case["id"], "segment-end checks:", len(rows), "; largest |nominal - reference| / published radius:", ["%.4f %s path %s axis %d T=%.4f radius %.3e diff %.3e" % r for r in rows[:2]], "; median ratio %.3f" % sorted(ratios)[len(ratios)//2])
