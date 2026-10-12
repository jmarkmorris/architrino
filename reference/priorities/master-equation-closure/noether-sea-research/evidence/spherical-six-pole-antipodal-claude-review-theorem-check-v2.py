# Review check (ramon-e-moore lens), 2026-10-11 18:30 UTC: independent verification of the coordinator's scoped theorem (counterchecks section 2):
# moving own-antipode hit g H(q-p)/D_A <= fixed hit g H(q) for 0 <= p <= q < pi, v' >= 0, with H(z) = sin(z/2)/(4 cos^2(z/2)), H'(z) > 0.
# v2 (after run 8 assertion with no values printed; v1 retained): print the control values before asserting. Controls first: (K) H(z)/D equals the review's kernel sin(z)/(r^3 D), r = 2 cos(z/2), at random z; H' formula vs central finite difference;
# (W) a wrong kernel (sum argument) violates the inequality somewhere. Then the domain conditions on b3 steps 13-21 from the JSON (shared data).
import os, sys, json, random
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, sin, cos, sec, pi
mp.dps = 30
def H(z): return sin(z/2)/(4*cos(z/2)**2)
def Hp(z): return (sec(z/2) + 2*sin(z/2)**2*sec(z/2)**3)/8
def kernel(z, D): return sin(z)/((2*cos(z/2))**3*D)
random.seed(7); out = {"controls": {}, "targets": {}}
mK = mpf(0); mD = mpf(0)
for _ in range(200):
    z = mpf(random.uniform(0, 3.0)); D = mpf(random.uniform(1.0, 1.3)); h = mpf("1e-8")
    mK = max(mK, abs(H(z)/D - kernel(z, D))); mD = max(mD, abs(Hp(z) - (H(z+h) - H(z-h))/(2*h)))
out["controls"]["K_kernel_identity_max"] = str(mK); out["controls"]["K_derivative_vs_fd_max"] = str(mD)
# exact derivative check by symbolic-free route: d/dz [sin(z/2) cos(z/2)^-2 /4] = (1/8)[cos(z/2) cos^-2 + 2 sin^2(z/2) cos^-3] = formula
# W: wrong kernel with sum argument H(q+p)/D vs H(q): violated whenever p > 0 (H increasing) -> inequality fails
viol = 0
for _ in range(200):
    q = mpf(random.uniform(0, 0.5)); p = mpf(random.uniform(0, 0.5)); v = mpf(random.uniform(0, 0.3)); D = 1 + v*sin((q+p)/2)
    if H(q+p)/D > H(q): viol += 1
out["controls"]["W_sum_kernel_violations_of_200"] = viol
print("controls", out["controls"], flush=True)
assert mK < mpf("1e-28") and mD < mpf("1e-14") and viol > 0, "control failure"
# Target 1: inequality on the stated domain at random points, with the strict version for p > 0
bad = 0; minmargin = mpf(10)
for _ in range(2000):
    q = mpf(random.uniform(0, 3.1)); p = mpf(random.uniform(0, 1)) * q; v = mpf(random.uniform(0, 0.999)); D = 1 + v*sin((q-p)/2)
    m = H(q) - H(q-p)/D
    if m < 0 or (p > 0 and m <= 0): bad += 1
    if p > mpf("0.01"): minmargin = min(minmargin, m)
out["targets"]["inequality_random_domain_violations_of_2000"] = bad; out["targets"]["min_margin_p_above_0.01"] = str(minmargin)
# H' > 0 on [0, pi): each term positive since cos(z/2) > 0 there; sample
out["targets"]["Hprime_min_on_grid"] = str(min(Hp(mpf(k)*pi/400) for k in range(0, 399)))
# Target 2: domain conditions on the b3 JSON steps 13-21: p <= q (history_q_range upper <= S lower), v' >= 0, D_A >= 1, q < pi
d = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"))
rows = []
for st in d["steps"]:
    if "antipode" not in st["classes"]: continue
    a = st["classes"]["antipode"]; q_lo = mpf(st["S"][0]); q_hi = mpf(st["S"][1]); p_hi = mpf(a["history_q_range"][1]); v_lo = mpf(a["history_qdot_range"][0]); D_lo = mpf(a["Dt_range"][0])
    rows.append({"step": st["step"], "p_hi": str(p_hi)[:12], "q_lo": str(q_lo)[:10], "p_le_q": bool(p_hi <= q_lo), "v_lo_ge_0": bool(v_lo >= 0), "D_lo_ge_1": bool(D_lo >= 1), "q_lt_pi": bool(q_hi < pi),
                 "moving_hit_range": a.get("hit_range"), "fixed_hit_at_q0": a.get("hit_fixed0"), "hit0": a.get("hit0")})
out["targets"]["b3_domain_rows"] = rows; out["targets"]["b3_domain_all_ok"] = all(r["p_le_q"] and r["v_lo_ge_0"] and r["D_lo_ge_1"] and r["q_lt_pi"] for r in rows)
print(json.dumps({k: v for k, v in out.items()}, indent=0)[:3000])
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
