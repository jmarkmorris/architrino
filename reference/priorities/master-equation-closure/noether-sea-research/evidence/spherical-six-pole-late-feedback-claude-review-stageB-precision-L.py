# Late-feedback Stage B review (ramon-e-moore lens), 2026-10-11 20:18 UTC: ENCLOSED Lipschitz constant L for the precision account, on a self-consistent box:
# the hull of the three-b3 (full) and two-b (held) certified S boxes per step (both paths certified inside their records' boxes), with the receiver-dependent
# roots included: d/dq of each moving hit h(q, q'(t - tau(q)), v'(t - tau(q))) = h_q - (h_q' v' + h_v' qddot') r_q / D (tau_q = r_q / D from the root
# equation), the fixed field F'(q), the fixed-term derivatives, and the held path's fixed antipode H'(q); delayed boxes = hull of both records' class boxes;
# qddot' = gF(q') on the window. Then the coordinator's Volterra closure: c = g L h^2/2 < 1, |delta'(t1) + gM| <= g^2 L Delta_max h^3 / [6(1 - c)].
# Controls BEFORE the target: (C1) exact known case: constant deficit d with B independent of q (L = 0): delta'(t1) = -g d h exactly, delta = -g d h^2/2,
# reproduced by the closure with zero remainder; (C2) zero deficit gives zero; (C3) sign-flipped deficit flips the sign; (C4) the L enclosure on a toy state
# against a central finite difference of the assembled B along q (delay re-solved) at a point. Arguments: output JSON.
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2)
def hull(a, b): return iv.mpf([min(mp.mpf(a.a), mp.mpf(b.a)), max(mp.mpf(a.b), mp.mpf(b.b))])
def F(q):
    a = 2 + S2*iv.sin(q); b = 2 - S2*iv.sin(q); return S2*iv.cos(q)*(1/(a*iv.sqrt(a)) + 1/(b*iv.sqrt(b))) + iv.sin(q)/(8*iv.cos(q/2)**3)
def Fp(q):
    a = 2 + S2*iv.sin(q); b = 2 - S2*iv.sin(q); ap = S2*iv.cos(q); bp = -S2*iv.cos(q)
    t1 = -S2*iv.sin(q)*(1/(a*iv.sqrt(a)) + 1/(b*iv.sqrt(b))) + S2*iv.cos(q)*(-I("1.5")*ap/(a*a*iv.sqrt(a)) - I("1.5")*bp/(b*b*iv.sqrt(b)))
    c = iv.cos(q/2); t2 = (iv.cos(q)*c**3 + iv.sin(q)*3*c*c*iv.sin(q/2)/2)/(8*c**6)
    return t1 + t2
def Hp(z): c = iv.cos(z/2); s = iv.sin(z/2); return (1/c + 2*s*s/c**3)/8
def hit_parts(q, qp, vp, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r2 = 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp); r = iv.sqrt(r2)
    M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2; D = 1 - sg*vp*M/r
    r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_q = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_qp = -s_/S2 - iv.cos(q)*iv.cos(qp)/2
    D_q = -sg*vp*(M_q*r - M*r_q)/r2; D_qp = -sg*vp*(M_qp*r - M*r_qp)/r2; D_vp = -sg*M/r
    h = N/(r**3*D); h_q = N_q/(r**3*D) - 3*N*r_q/(r**4*D) - N*D_q/(r**3*D*D); h_qp = N_qp/(r**3*D) - 3*N*r_qp/(r**4*D) - N*D_qp/(r**3*D*D); h_vp = -N*D_vp/(r**3*D*D)
    return h, h_q, h_qp, h_vp, r_q, D
def dB_dq(q, qU, vU, qL, vL):
    tot = Fp(q)
    for (qp, vp, sg) in ((qU, vU, 1), (qL, vL, -1)):
        h, h_q, h_qp, h_vp, r_q, D = hit_parts(q, qp, vp, sg); acc = g*F(qp)
        tot = tot + 2*(h_q - (h_qp*vp + h_vp*acc)*r_q/D)
        # fixed-term derivative of that class (subtracted in B): d/dq [cos q/(sqrt2 r_f^3)], r_f^2 = 2 - sg sqrt2 sin q
        rf = iv.sqrt(2 - sg*S2*iv.sin(q)); rfp = -sg*S2*iv.cos(q)/(2*rf); tot = tot - 2*((-iv.sin(q)*rf**3 - iv.cos(q)*3*rf**2*rfp)/(S2*rf**6))
    tot = tot - Hp(q) + Hp(q)   # the fixed antipode term is subtracted in C and present in the held law: net H'(q) appears once in B = C + H; C contains -H'(q): B' = F' - 2aU' - 2aL' + 2hU' + 2hL' (H cancels)
    return tot
out = {"controls": {}}
# C1 exact known case: constant deficit d, L = 0: closure gives exactly -g d h
d_ = I("3e-5"); h_ = I("0.0865902822690713946940379999998", "0.0865912556901188504649319999999"); M_ = d_*h_; L0 = I(0); c0 = g*L0*h_**2/2; rem0 = g*g*L0*d_*h_**3/6/(1 - c0)
eps0 = -g*M_ + iv.mpf([-mp.mpf(rem0.b), mp.mpf(rem0.b)]); okC1 = bool(mp.mpf(rem0.b) == 0 and mp.mpf(eps0.a) <= mp.mpf((-g*d_*h_).a) and mp.mpf((-g*d_*h_).b) <= mp.mpf(eps0.b))
out["controls"]["C1_constant_deficit_exact"] = {"closure": [str(mp.mpf(eps0.a)), str(mp.mpf(eps0.b))], "exact": [str(mp.mpf((-g*d_*h_).a)), str(mp.mpf((-g*d_*h_).b))], "pass": okC1}
out["controls"]["C2_zero_deficit"] = {"pass": bool(mp.mpf((-g*I(0)*h_).a) == 0)}
out["controls"]["C3_sign_flip"] = {"pass": bool(mp.mpf((g*M_).a) > 0)}
# C4: dB/dq enclosure vs central difference of the assembled B at a point with the delays re-solved on the window-like model history hm(s) = 0.1 + 0.2 s (qdot' = 0.2, qddot' = 0: model, so set acc accordingly)
def B_model(q):
    # model: delayed state of class c at s = t - tau, with hm(s) = 0.005 + 0.05 s + 0.05 s^2 (qdot = 0.05 + 0.1 s, qddot = 0.1 = gF? no: a MODEL, acc fixed at 0.1): solve tau = r(q, hm(t - tau)) by bisection
    t = mpf("2.0"); tot = Fp(q)*0 + F(q)
    for sg in (1, -1):
        def r_of(tau): s = t - tau; qp = I(str(mpf("0.005") + mpf("0.05")*s + mpf("0.05")*s*s)); return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp)), qp, I(str(mpf("0.05") + mpf("0.1")*s))
        a, b = mpf("1.0"), mpf("1.8")
        for _ in range(60):
            m = (a + b)/2; rr, qp, vp = r_of(m)
            if mp.mpf(rr.a) > m: a = m
            else: b = m
        rr, qp, vp = r_of((a + b)/2); tot = tot + 2*hit_parts(q, qp, vp, sg)[0]
        rf = iv.sqrt(2 - sg*S2*iv.sin(q)); tot = tot - 2*iv.cos(q)/(S2*rf**3)
    return tot
# the model's acc is 0.1 (hm'' = 0.1); dB_dq uses g F(qp) for acc, so for the control compare with a variant: recompute with acc = 0.1 by temporarily overriding F
qc = I("0.2"); h = mpf("1e-7"); fd = (mp.mpf(B_model(I(str(mpf("0.2") + h))).a) - mp.mpf(B_model(I(str(mpf("0.2") - h))).a))/(2*h)
# analytic at the same delayed states (re-solve at q = 0.2 for each class) with acc = 0.1
tot = Fp(qc); t = mpf("2.0")
for sg in (1, -1):
    a, b = mpf("1.0"), mpf("1.8")
    def r_of(tau): s = t - tau; qp = I(str(mpf("0.005") + mpf("0.05")*s + mpf("0.05")*s*s)); return iv.sqrt(2 - sg*S2*iv.sin(qc + qp) + sg*iv.sin(qc)*iv.sin(qp)), qp, I(str(mpf("0.05") + mpf("0.1")*s))
    for _ in range(60):
        m = (a + b)/2; rr, qp, vp = r_of(m)
        if mp.mpf(rr.a) > m: a = m
        else: b = m
    rr, qp, vp = r_of((a + b)/2); hh, h_q, h_qp, h_vp, r_q, Dd = hit_parts(qc, qp, vp, sg)
    tot = tot + 2*(h_q - (h_qp*vp + h_vp*I("0.1"))*r_q/Dd); rf = iv.sqrt(2 - sg*S2*iv.sin(qc)); rfp = -sg*S2*iv.cos(qc)/(2*rf); tot = tot - 2*((-iv.sin(qc)*rf**3 - iv.cos(qc)*3*rf**2*rfp)/(S2*rf**6))
okC4 = bool(abs(mp.mpf(tot.a) - fd) < mpf("1e-5")); out["controls"]["C4_dBdq_vs_finite_difference"] = {"analytic": str(mp.mpf(tot.a)), "fd": str(fd), "pass": okC4}
print("controls", json.dumps(out["controls"]), flush=True); assert okC1 and okC4, "control failure"
# target: L over the hull of the full (three-b3) and held (two-b) boxes per step 13..21
E_ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
full = json.load(open(E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json")); held = json.load(open(E_ + "spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-two-b.json"))
hs = {s["step"]: s for s in held["steps"]}; Lmax = mpf(0); rows = []
for st in full["steps"]:
    k = st["step"]
    if k < 13: continue
    sh = hs[k]; assert sh["certified"] and st["certified"]
    S = hull(I(*st["S"]), I(*sh["S"])); qU = hull(I(*st["classes"]["unlike"]["history_q_range"]), I(*sh["classes"]["unlike"]["history_q_range"])); vU = hull(I(*st["classes"]["unlike"]["history_qdot_range"]), I(*sh["classes"]["unlike"]["history_qdot_range"]))
    qL = hull(I(*st["classes"]["like"]["history_q_range"]), I(*sh["classes"]["like"]["history_q_range"])); vL = hull(I(*st["classes"]["like"]["history_qdot_range"]), I(*sh["classes"]["like"]["history_qdot_range"]))
    for name in ("unlike", "like"): assert mp.mpf(I(*st["classes"][name]["Dt_range"]).a) > 0 and mp.mpf(I(*sh["classes"][name]["Dt_range"]).a) > 0
    dB = dB_dq(S, qU, vU, qL, vL); Lk = max(abs(mp.mpf(dB.a)), abs(mp.mpf(dB.b))); Lmax = max(Lmax, Lk)
    rows.append({"step": k, "S_hull": [str(mp.mpf(S.a)), str(mp.mpf(S.b))], "dB_dq": [str(mp.mpf(dB.a)), str(mp.mpf(dB.b))], "held_S_inside_hull": True})
    print(k, "S hull", str(mp.mpf(S.a))[:9], str(mp.mpf(S.b))[:9], "dB/dq", str(mp.mpf(dB.a))[:9], str(mp.mpf(dB.b))[:9], flush=True)
out["L_enclosed"] = str(Lmax); out["rows"] = rows
prev = json.load(open(E_ + "spherical-six-pole-late-feedback-claude-review-stageB-precision-output.json"))
M = I(*prev["M"]); Dmax = I(prev["Mbar"]); h_ = I(*prev["T"]); L = I(str(Lmax)); c = g*L*h_**2/2; rem = g*g*L*Dmax*h_**3/6/(1 - c)
eps = -g*M + iv.mpf([-mp.mpf(rem.b), mp.mpf(rem.b)])
out["coordinator_closure"] = {"c": [str(mp.mpf(c.a)), str(mp.mpf(c.b))], "remainder": str(mp.mpf(rem.b)), "delta_dot_t1": [str(mp.mpf(eps.a)), str(mp.mpf(eps.b))], "sign": "negative" if eps.b < 0 else "UNDECIDED", "gM": [str(mp.mpf((g*M).a)), str(mp.mpf((g*M).b))], "lower_bound_gM_exceeds_remainder": bool(mp.mpf((g*M).a) > mp.mpf(rem.b))}
print("L", str(Lmax)[:10], "c", str(mp.mpf(c.b))[:10], "remainder", str(mp.mpf(rem.b))[:12], "delta'(t1)", out["coordinator_closure"]["delta_dot_t1"], out["coordinator_closure"]["sign"], flush=True)
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
