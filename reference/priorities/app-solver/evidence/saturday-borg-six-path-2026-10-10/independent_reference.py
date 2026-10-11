"""Saturday initiative 3: an independent reference for the frozen six-path Borg seed-0 row on [0, 0.01].

Why a closed-form-like reference exists.  The admitted preparation has all six paths at rest for T <= 0
(inertial C1 past with zero velocity).  The smallest pair separation is about 0.28, so every causal root
received during [0, 0.01] was emitted before T = 0, when its source was at rest at its anchor c_j.  With
c_f = 1 the transmitter factor is then exactly 1 and the Master Equation for receiver i reduces to
  x_i'' = kappa q_i sum_{j != i} q_j (x_i - c_j) / |x_i - c_j|^3 ,     x_i(0) = c_i, x_i'(0) = 0,
six uncoupled ordinary differential equations in a static field (like polarities repel).  No self root
exists below wake speed.  The condition "emitted before 0" is checked below, not assumed.

This script was written without reading the EOM solver sources.  It integrates the six equations with a
Taylor-series method in 40-digit arithmetic (mpmath.odefun) and compares with the endpoints printed by the
unmodified ladder driver.  Known cases run first:
  K1  radial fall from rest toward one fixed opposite source: closed-form time of fall;
  K2  conservation of e = v^2/2 + kappa q_i sum_j q_j / |x - c_j| along the target integration.
"""
import json, sys
import mpmath as mp
mp.mp.dps = 40

def field(kappa, qi, others):
    def f(t, y):
        x = y[:3]; v = y[3:]
        a = [mp.mpf(0)] * 3
        for (c, qj) in others:
            d = [x[k] - c[k] for k in range(3)]
            r = mp.sqrt(sum(dk * dk for dk in d))
            for k in range(3):
                a[k] += kappa * qi * qj * d[k] / r ** 3
        return list(v) + a
    return f

def integrate(kappa, qi, x0, others, T):
    sol = mp.odefun(field(kappa, qi, others), 0, [mp.mpf(v) for v in x0] + [mp.mpf(0)] * 3, tol=mp.mpf(10) ** -30)
    return sol(mp.mpf(T))

# ---- K1: radial fall, attraction strength k = kappa, from rest at r0: t(r) = sqrt(r0^3/(2k)) [sqrt(p(1-p)) + acos(sqrt(p))], p = r/r0
kappa = mp.mpf("0.05"); r0 = mp.mpf("0.3")
y = integrate(kappa, 1, [r0, 0, 0], [([mp.mpf(0)] * 3, -1)], "0.01")
p = y[0] / r0
t_closed = mp.sqrt(r0 ** 3 / (2 * kappa)) * (mp.sqrt(p * (1 - p)) + mp.acos(mp.sqrt(p)))
print("K1 radial fall: integrated to T = 0.01, closed-form time for the reached radius =", mp.nstr(t_closed, 25), "; |difference| =", mp.nstr(abs(t_closed - mp.mpf("0.01")), 5))
if abs(t_closed - mp.mpf("0.01")) > mp.mpf(10) ** -24:
    print("KNOWN CASE FAILED"); sys.exit(1)

req = json.load(open("request-h.json"))["request"]
kappa = mp.mpf(req["modelControls"]["coupling"])
assert req["modelControls"]["fieldSpeed"] == "1"
H = req["histories"]
anchors = []
for h in H:
    seg = h["segments"]
    assert len(seg) == 1 and all(c[1] == "0" and c[2] == "0" and c[3] == "0" for c in seg[0]["coefficients"]), "past is not at rest"
    anchors.append(([mp.mpf(c[0]) for c in seg[0]["coefficients"]], int(h["charge"]), h["pathId"]))
print("six paths at rest for T <= 0; charges", [a[1] for a in anchors], "coupling", req["modelControls"]["coupling"])
dmin = min(mp.sqrt(sum((anchors[i][0][k] - anchors[j][0][k]) ** 2 for k in range(3))) for i in range(6) for j in range(i))
print("smallest anchor separation", mp.nstr(dmin, 12))

ref = {}
worst_e = mp.mpf(0); max_disp = mp.mpf(0)
for i, (c, q, pid) in enumerate(anchors):
    others = [(a[0], a[1]) for j, a in enumerate(anchors) if j != i]
    y = integrate(kappa, q, c, others, "0.01")
    def energy(yv):
        x = yv[:3]; v = yv[3:]
        pot = sum(kappa * q * qj / mp.sqrt(sum((x[k] - cj[k]) ** 2 for k in range(3))) for cj, qj in others)
        return sum(vk * vk for vk in v) / 2 + pot
    e0 = energy(list(c) + [mp.mpf(0)] * 3); e1 = energy(y)
    worst_e = max(worst_e, abs(e1 - e0))
    max_disp = max(max_disp, mp.sqrt(sum((y[k] - c[k]) ** 2 for k in range(3))))
    ref[pid] = y
print("K2 largest energy drift over the six integrations:", mp.nstr(worst_e, 5), "; largest displacement over [0, 0.01]:", mp.nstr(max_disp, 8))
if worst_e > mp.mpf(10) ** -25:
    print("KNOWN CASE FAILED"); sys.exit(1)
# reduction check: every root received in [0, 0.01] was emitted before 0 iff |x_i(T) - c_j| > T for all T in [0, 0.01];
# displacements are below max_disp, so it suffices that dmin - max_disp > 0.01
print("reduction check: smallest separation minus largest displacement =", mp.nstr(dmin - max_disp, 10), "> 0.01 :", bool(dmin - max_disp > mp.mpf("0.01")))
if not dmin - max_disp > mp.mpf("0.01"):
    print("REDUCTION NOT VALID"); sys.exit(1)

for name in sys.argv[1:]:
    d = json.load(open(name))
    print(f"\n{name}: strictControlPassed = {d['strictControlPassed']}")
    for case in d["cases"]:
        if not case.get("endpoint"):
            print(f"  {case['id']:20s} step {case['step']}: no endpoint ({case['status']})"); continue
        dp = dv = mp.mpf(0)
        est_p = est_v = 0.0
        for ep in case["endpoint"]:
            y = ref[ep["pathId"]]
            for k in range(3):
                dp = max(dp, abs(mp.mpf(ep["position"][k]) - y[k])); dv = max(dv, abs(mp.mpf(ep["velocity"][k]) - y[3 + k]))
        steps = [s for g in case["diagnostics"] for s in g.get("stepFailures", []) if s.get("status") == "accepted"]
        for s in steps:
            for le in s.get("localErrors", []):
                est_p = max(est_p, le["positionError"]); est_v = max(est_v, le["velocityError"])
        print(f"  {case['id']:20s} step {case['step']} threads {case['threadCount']}: max |position - reference| = {mp.nstr(dp, 4)}, max |velocity - reference| = {mp.nstr(dv, 4)}; accepted steps {len(steps)}, solver's largest per-step local-error estimates: position {est_p:.3e}, velocity {est_v:.3e}")
with open("independent_reference_endpoint.json", "w") as fh:
    json.dump({pid: [mp.nstr(v, 30) for v in y] for pid, y in ref.items()}, fh, indent=1)
