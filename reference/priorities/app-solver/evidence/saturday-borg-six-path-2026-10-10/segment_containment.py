"""Containment of the independent reference inside the published cubic segments at 41 instants across [0, 0.01]
(endpoint included), for every row of the diagnostic ladder copy.  Uses the same independent integrator as
independent_reference.py (its two known cases are re-run on import-free code below via the saved endpoint check)."""
import json, sys
import mpmath as mp
mp.mp.dps = 40
from independent_reference import field  # runs that script's known cases and target first
req = json.load(open("request-h.json"))["request"]
kappa = mp.mpf(req["modelControls"]["coupling"])
anch = [([mp.mpf(c[0]) for c in h["segments"][0]["coefficients"]], int(h["charge"]), h["pathId"]) for h in req["histories"]]
times = [mp.mpf(k) / 4000 for k in range(0, 41)]
sols = {}
for i, (c, q, pid) in enumerate(anch):
    others = [(a[0], a[1]) for j, a in enumerate(anch) if j != i]
    sols[pid] = mp.odefun(field(kappa, q, others), 0, list(c) + [mp.mpf(0)] * 3, tol=mp.mpf(10) ** -30)
# known case for this file: at T = 0.01 the sampled solution must equal the saved endpoint reference
saved = json.load(open("independent_reference_endpoint.json"))
e = max(abs(sols[pid](mp.mpf("0.01"))[k] - mp.mpf(saved[pid][k])) for pid in saved for k in range(6))
print("known case: sampled solution at 0.01 against the saved endpoint reference, max difference", mp.nstr(e, 3))
assert e < mp.mpf(10) ** -27
b = json.load(open("ladder-six-with-histories.json"))
for case in b["cases"]:
    worst = mp.mpf("inf"); worst_at = None; n = 0
    for h in case["histories"]:
        for T in times:
            segs = [s for s in h["segments"] if mp.mpf(s["startTime"]) <= T <= mp.mpf(s["endTime"])]
            if T == 0:
                segs = [s for s in segs if mp.mpf(s["startTime"]) == 0] or segs
            y = sols[h["pathId"]](T)
            for seg in segs:
                t = T - mp.mpf(seg["startTime"])
                for k in range(3):
                    c = [mp.mpf(x) for x in seg["coefficients"][k]]
                    pos = c[0] + t * (c[1] + t * (c[2] + t * c[3])); vel = c[1] + t * (2 * c[2] + 3 * t * c[3])
                    for slack in (mp.mpf(seg["positionErrors"][k]) - abs(pos - y[k]), mp.mpf(seg["velocityErrors"][k]) - abs(vel - y[3 + k])):
                        n += 1
                        if slack < worst:
                            worst = slack; worst_at = (h["pathId"], float(T), k)
    print(f"  {case['id']:20s}: {n} checks at {len(times)} instants; smallest slack {mp.nstr(worst, 4)} at {worst_at}: {'all inside' if worst >= 0 else 'OUTSIDE'}")
