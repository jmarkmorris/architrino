# Stage B precision item, support role: dated companion instrument (coordinator contribution 8). Reuses the definitions of
# support-stageB-precision-iv.py v2 (sha256 76eca852...) unchanged (exec of its definition block), then: (C1) exact known control with a q-independent
# right-hand side (K = 0, constant deficit d): delta' = -g d h and delta = -g d h^2/2 exactly; (C2) zero-defect control (delta = 0); (C3) sign-flip
# negative; all BEFORE the target. Target: (a) self-consistent receiver box from the CANONICAL record alone, inflated by rho = 1e-6 (receiver box and
# delayed boxes), K_B on it, minimum transmitter factors, and the bootstrap check sigma*T*I_hi < rho; (b) the seam integral over the reading step using
# the reached interval of the arrival time t_a (b3 antipode_reading) instead of the whole step; (c) the coordinator's Volterra form
# |delta'(t1) + I| <= K eps_max h^3 / [6 (1 - c)], c = K h^2/2 (K = g L, eps_max = g Delta_max, I = g M).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import sys, json
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
exec(open(E + "spherical-six-pole-late-feedback-claude-support-stageB-precision-iv.py").read().split('out = {"controls": []}', 1)[0])
out = {"controls": []}
same = lambda a, b: lo(a) == lo(b) and up(a) == up(b)
d = iv.mpf("3e-5"); hh = iv.mpf("0.0866"); Ic = g*d*hh; E2c = g*d*hh*hh/2; dv, dx, eta, sig = bound(Ic, E2c, ZERO, hh)
out["controls"].append({"name": "(C1) exact known: right-hand side independent of q (K = 0), constant deficit d = 3e-5, h = 0.0866: the bound returns exactly delta' = -g d h and delta = -g d h^2/2 (zero remainder)", "bound_v": J(dv), "exact_v": J(-Ic), "bound_x": J(dx), "exact_x": J(-E2c), "pass": bool(same(dv, -Ic) and same(dx, -E2c))})
dv0, dx0, _, _ = bound(ZERO, ZERO, iv.mpf("0.5"), hh)
out["controls"].append({"name": "(C2) zero-defect: eps = 0 gives delta' = delta = 0 exactly (K = 0.5)", "bound_v": J(dv0), "bound_x": J(dx0), "pass": bool(lo(dv0) == 0 == up(dv0) and lo(dx0) == 0 == up(dx0))})
dvw, _, _, _ = bound(-Ic, -E2c, iv.mpf("0.5"), hh)
out["controls"].append({"name": "(C3) negative: sign-flipped deficit gives a proved positive speed difference", "bound_v": J(dvw), "pass": bool(lo(dvw) > 0)})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
b3 = json.load(open(E + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json")); full = {s["step"]: s for s in b3["steps"]}
rho = mp.mpf("1e-6"); infl = lambda x: I(lo(x) - rho, up(x) + rho)
ta = iv_of(b3["antipode_reading"]["t_anti"]); t13e = iv_of(full[13]["t_int"]); t13end = I(lo(t13e) + mp.mpf("0.01"), up(t13e)); t21 = iv_of(full[21]["t_int"]); t1 = I(lo(t21) + mp.mpf("0.01"), up(t21))
len13 = I(lo(t13end) - up(ta), up(t13end) - lo(ta)); h = I(lo(t1) - up(ta), up(t1) - lo(ta)); hhi = iv.mpf(up(h))
Iref = ZERO; E2ref = ZERO; Kb = mp.mpf(0); Dmin = {"unlike": None, "like": None}; eps_max = mp.mpf(0); kb_lo = None; kb_hi = None
for k in range(13, 22):
    f = full[k]; qf = iv_of(f["S"]); a = f["classes"]["antipode"]; p = iv_of(a["history_q_range"]); vA = iv_of(a["history_qdot_range"]); dd = qf - p; DA = ONE + vA*iv.sin(dd/2)
    eps = g*(Hp(hull(dd, qf))*p + H(dd)*(DA - ONE)/DA); eps_max = max(eps_max, up(eps))
    qB = infl(qf); kk = g*Hp(qB)
    for name, sg in (("unlike", 1), ("like", -1)):
        qp = infl(iv_of(f["classes"][name]["history_q_range"])); vp = infl(iv_of(f["classes"][name]["history_qdot_range"])); kk = kk + 2*g*dPsi_c(qB, qp, vp, g*fam.F(qp), sg)
        Dc = mer(qB, qp, vp, sg)["D"]; Dmin[name] = lo(Dc) if Dmin[name] is None else min(Dmin[name], lo(Dc))
    Kb = max(Kb, abs(lo(kk)), abs(up(kk))); kb_lo = lo(kk) if kb_lo is None else min(kb_lo, lo(kk)); kb_hi = up(kk) if kb_hi is None else max(kb_hi, up(kk))
    if k == 13: Iref = Iref + len13*eps; E2ref = E2ref + eps*len13*I(mp.mpf("0.08"), up(h))
    else: Iref = Iref + iv.mpf("0.01")*eps; E2ref = E2ref + eps*iv.mpf("0.01")*(iv.mpf("0.01")*(21 - k) + iv.mpf("0.005"))
K = iv.mpf(Kb); dv, dx, eta, sigma = bound(Iref, E2ref, K, hhi)
sup_delta = sigma*hhi*iv.mpf(up(Iref)); c = K*hhi*hhi/2; rem_c = K*iv.mpf(eps_max)*hhi**3/(6*(ONE - c)); dv_c = -Iref + I(-1, 1)*rem_c
out["target"] = {"rho": "1e-6", "t_a": J(ta), "len13_from_t_a": J(len13), "h": J(h), "I_eps_refined": J(Iref), "E2_refined": J(E2ref), "k_range_on_inflated_canonical_boxes": [s45(kb_lo), s45(kb_hi)], "K_B": s45(Kb),
    "min_D_unlike": s45(Dmin["unlike"]), "min_D_like": s45(Dmin["like"]), "sigma": J(sigma), "eta": J(eta), "sup_abs_delta_bound": J(sup_delta), "bootstrap_sup_delta_below_rho": bool(up(sup_delta) < rho),
    "speed_difference_refined_support_bound": J(dv), "position_difference_refined": J(dx), "eps_max": s45(eps_max), "c": J(c), "coordinator_volterra_remainder": J(rem_c), "speed_difference_coordinator_form": J(dv_c),
    "support_remainder": J(K*sigma*hhi*hhi*iv.mpf(up(Iref))/2)}
print(json.dumps(out["target"], indent=0), flush=True); json.dump(out, open(sys.argv[1], "w"), indent=1)
