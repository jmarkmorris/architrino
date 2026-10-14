# Support role check of the coordinator's algebraic companion (signed tangent numerator), against this role's signed geometry. Controls first:
# (A0 known) the companion's hand zero N(pi/4, arctan[1/(1 + 1/sqrt2)]) = 0 to 30 digits, and (A0 negative) a wrong sign in the source sine term breaks it.
# Targets: (A1) factorisation N = (cos q cos p / sqrt2)[1 - tan p (tan q + 1/sqrt2)] and M(q,p) = N(p,q) at 300 random box points; (A2) the zero formula
# q*(p) = arctan(cot p - 1/sqrt2) against this role's bisection zeros of N (geomz record) at the tabulated p; (A3) interval proof that both partial
# derivatives of N are negative on the whole box q in [0.81, 1.10], p in [0, 0.85] (subdivision); (A4) cell counts of this role's 58 x 85 subdivision
# re-derived from the formula: a cell is proved positive / negative iff it lies wholly on one side of q*(p).
import os, sys, json, random
print("PID", os.getpid(), flush=True)
from mpmath import mp, iv
mp.dps = 40; iv.dps = 30; s2 = mp.sqrt(2)
N = lambda q, p: mp.cos(q + p)/s2 - mp.cos(q)*mp.sin(p)/2; M = lambda q, p: mp.cos(q + p)/s2 - mp.sin(q)*mp.cos(p)/2
out = {"controls": [], "targets": {}}
ph = mp.atan(1/(1 + 1/s2)); Nw = lambda q, p: mp.cos(q + p)/s2 + mp.cos(q)*mp.sin(p)/2
out["controls"].append({"name": "(A0) known hand zero N(pi/4, arctan[1/(1+1/sqrt2)]) = 0; just below pi/4 positive, just above negative; negative: wrong sign of the source sine term is nonzero there", "N": mp.nstr(N(mp.pi/4, ph), 5), "wrong": mp.nstr(Nw(mp.pi/4, ph), 8), "pass": bool(abs(N(mp.pi/4, ph)) < mp.mpf("1e-35") and N(mp.pi/4 - mp.mpf("1e-6"), ph) > 0 and N(mp.pi/4 + mp.mpf("1e-6"), ph) < 0 and abs(Nw(mp.pi/4, ph)) > mp.mpf("0.1"))})
print(json.dumps(out["controls"]), flush=True)
if not all(c["pass"] for c in out["controls"]): sys.exit(3)
random.seed(7); w1 = mp.mpf(0); w2 = mp.mpf(0)
for _ in range(300):
    q = mp.mpf("0.81") + mp.mpf(random.random())*mp.mpf("0.29"); p = mp.mpf(random.random())*mp.mpf("0.85")
    w1 = max(w1, abs(N(q, p) - (mp.cos(q)*mp.cos(p)/s2)*(1 - mp.tan(p)*(mp.tan(q) + 1/s2)))); w2 = max(w2, abs(M(q, p) - N(p, q)))
out["targets"]["A1_factorisation_max_abs_diff"] = mp.nstr(w1, 5); out["targets"]["A1_M_equals_N_swapped_max_abs_diff"] = mp.nstr(w2, 5)
g = json.load(open(sys.argv[1]))["target"]["N_zero_q_of_qp"]; z = {}
for p, v in g.items():
    if v is None or mp.mpf(p) == 0: continue
    z[p] = {"bisection": v, "formula": mp.nstr(mp.atan(mp.cot(mp.mpf(p)) - 1/s2), 12), "abs_diff": mp.nstr(abs(mp.mpf(v) - mp.atan(mp.cot(mp.mpf(p)) - 1/s2)), 3)}
out["targets"]["A2_zero_formula_vs_bisection"] = z; out["targets"]["A2_max_abs_diff"] = mp.nstr(max(mp.mpf(x["abs_diff"]) for x in z.values()), 3)
S2 = iv.sqrt(2); mq = mp.mpf("-10"); mpp = mp.mpf("-10"); nq, npp = 29, 85; cnt = {"pos": 0, "neg": 0, "und": 0}
for i in range(nq):
    qc = iv.mpf([mp.mpf("0.81") + mp.mpf("0.29")*i/nq, mp.mpf("0.81") + mp.mpf("0.29")*(i + 1)/nq])
    for j in range(npp):
        pc = iv.mpf([mp.mpf("0.85")*j/npp, mp.mpf("0.85")*(j + 1)/npp])
        dq = -iv.sin(qc + pc)/S2 + iv.sin(qc)*iv.sin(pc)/2; dp = -iv.sin(qc + pc)/S2 - iv.cos(qc)*iv.cos(pc)/2; mq = max(mq, mp.mpf(dq.b)); mpp = max(mpp, mp.mpf(dp.b))
out["targets"]["A3_max_upper_bound_dN_dq"] = mp.nstr(mq, 8); out["targets"]["A3_max_upper_bound_dN_dp"] = mp.nstr(mpp, 8); out["targets"]["A3_both_partials_proved_negative_on_box"] = bool(mq < 0 and mpp < 0)
qstar = lambda p: mp.atan(mp.cot(p) - 1/s2) if p > 0 else mp.pi/2
for i in range(58):
    qa = mp.mpf("0.81") + mp.mpf("0.29")*i/58; qb = mp.mpf("0.81") + mp.mpf("0.29")*(i + 1)/58
    for j in range(85):
        pa = mp.mpf("0.85")*j/85; pb = mp.mpf("0.85")*(j + 1)/85
        # N decreasing in q and p: the cell is positive iff N > 0 at its upper corner, negative iff N < 0 at its lower corner
        cnt["pos" if N(qb, pb) > 0 else ("neg" if N(qa, pa) < 0 else "und")] += 1
out["targets"]["A4_exact_cell_classification_58x85"] = cnt; out["targets"]["A4_geomz_interval_counts"] = {k: json.load(open(sys.argv[1]))["target"]["cell_sign_counts"][k] for k in ("N_pos", "N_neg", "N_und")}
print(json.dumps(out["targets"], indent=0)); json.dump(out, open(sys.argv[2], "w"), indent=1)
