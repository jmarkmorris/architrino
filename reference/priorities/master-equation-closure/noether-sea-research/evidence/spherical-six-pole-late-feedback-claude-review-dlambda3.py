# Late-feedback review (ramon-e-moore lens), 2026-10-11 19:21 UTC: INDEPENDENT three-class enclosure of d(lambda_hat)/dt on step boxes (the review's own
# formulas, extended from its antipodal-campaign instrument by the moving-antipode terms). lambda_hat = -qdot^2 - a_rad,
# a_rad = g[1/(rL DL) - 1/(rU DU) - 1/(2 rA DA)]; d/dt[1/(rD)] = -(rdot D + r Ddot)/(rD)^2 per class; taudot = (r_q qdot + r_q' v')/D.
# Antipode (d = q - q'): r = 2cos(d/2), r_q = -sin(d/2), r_q' = +sin(d/2); D = 1 + v' sin(d/2); rdot = -sin(d/2)(qdot - v'(1 - taudot));
# Ddot = vdot' sin(d/2) + v' cos(d/2)(qdot - v'(1 - taudot))/2, vdot' = acc'(1 - taudot). Meridional classes as in the review's antipodal instrument.
# Controls BEFORE the target: (K1) exact: all three classes at q = q' = 0, qdot = v' = 0, delayed accelerations g: d lambda/dt = g^2/sqrt2 exactly
# (the antipode term is exactly 0 there); (K2) chain-rule consistency: formula vs central difference of the closed-form lambda_hat along a local affine
# model of all three classes at random point states; (W) flipped velocity sign gives a disjoint enclosure. Target: b3 steps 12-21 boxes (shared data).
import os, sys, json, random
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def mid(x): return (mp.mpf(x.a) + mp.mpf(x.b))/2
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2)
def F(q): return S2*iv.cos(q)*((2 + S2*iv.sin(q))**I(-1.5) + (2 - S2*iv.sin(q))**I(-1.5)) + iv.sin(q)/(8*iv.cos(q/2)**3)
def mer(q, qp, vp, sg, dsign=1):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp)
    r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - dsign*sg*vp*M/r; hit = N/(r**3*D)
    r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    return r, D, hit, r_q, r_qp, M, M_q, M_qp
def d_mer(q, qp, vp, qdot, sg, accp, dsign=1):
    r, D, hit, r_q, r_qp, M, M_q, M_qp = mer(q, qp, vp, sg, dsign)
    taudot = (r_q*qdot + r_qp*vp)/D; one = 1 - taudot
    rdot = r_q*qdot + r_qp*vp*one; vdotp = accp*one; Mdot = M_q*qdot + M_qp*vp*one
    Ddot = -dsign*sg*(vdotp*M/r + vp*(Mdot*r - M*rdot)/r**2)
    return -(rdot*D + r*Ddot)/(r*D)**2, hit, D, r
def anti(q, qp, vp, dsign=1):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + dsign*vp*iv.sin(d/2); return r, D, iv.sin(d)/(r**3*D)
def d_anti(q, qp, vp, qdot, accp, dsign=1):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + dsign*vp*sd
    taudot = (-sd*qdot + sd*vp)/D; one = 1 - taudot
    rdot = -sd*(qdot - vp*one); vdotp = accp*one
    Ddot = dsign*(vdotp*sd + vp*cd*(qdot - vp*one)/2)
    return -(rdot*D + r*Ddot)/(r*D)**2, iv.sin(d)/(r**3*D), D, r
def qddot(q, qU, vU, qL, vL, qA, vA, dsign=1):
    return g*(2*mer(q, qU, vU, 1, dsign)[2] + 2*mer(q, qL, vL, -1, dsign)[2] + anti(q, qA, vA, dsign)[2])   # all three classes read: no fixed terms remain
def lam(q, qdot, qU, vU, qL, vL, qA, vA, dsign=1):
    rU, DU = mer(q, qU, vU, 1, dsign)[:2]; rL, DL = mer(q, qL, vL, -1, dsign)[:2]; rA, DA = anti(q, qA, vA, dsign)[:2]
    return -qdot**2 - g*(1/(rL*DL) - 1/(rU*DU) - 1/(2*rA*DA))
def dlam(q, qdot, qU, vU, aU, qL, vL, aL, qA, vA, aA, dsign=1):
    acc = qddot(q, qU, vU, qL, vL, qA, vA, dsign)
    dU = d_mer(q, qU, vU, qdot, 1, aU, dsign)[0]; dL = d_mer(q, qL, vL, qdot, -1, aL, dsign)[0]; dA = d_anti(q, qA, vA, qdot, aA, dsign)[0]
    darad = g*(dL - dU - dA/2)
    return -2*qdot*acc - darad, acc, darad, {"U": dU, "L": dL, "A": dA}
out = {"controls": {}, "steps": []}
Z = I(0); exact = g*g/S2
v, acc, darad, parts = dlam(Z, Z, Z, Z, g, Z, Z, g, Z, Z, g)
bad = dlam(Z, Z, Z, Z, g, Z, Z, g, Z, Z, g, -1)[0]
okK1 = bool(v.a <= exact.a and exact.b <= v.b and (v.b - v.a) < mpf("1e-25") and parts["A"].a == 0 and parts["A"].b == 0)
out["controls"]["K1_exact_zero_state"] = {"enclosure": [str(mp.mpf(v.a)), str(mp.mpf(v.b))], "exact_g2_over_sqrt2": str(mp.mpf(exact.a)), "antipode_term": [str(mp.mpf(parts["A"].a)), str(mp.mpf(parts["A"].b))], "pass": okK1}
# K2: chain-rule consistency along a local affine model for all three classes at random point states (antipode included)
random.seed(11); worst = mpf(0)
for _ in range(30):
    q = I(random.uniform(0.19, 0.22)); qd = I(random.uniform(0.2, 0.21)); qU = I(random.uniform(0.02, 0.032)); vU = I(random.uniform(0.06, 0.08)); qL = I(random.uniform(0.01, 0.016)); vL = I(random.uniform(0.04, 0.056)); qA = I(random.uniform(0.0001, 0.0004)); vA = I(random.uniform(0.004, 0.009))
    aU = g*F(qU); aL = g*F(qL); aA = g*F(qA)
    val, acc, darad, parts = dlam(q, qd, qU, vU, aU, qL, vL, aL, qA, vA, aA)
    tdU = (mer(q, qU, vU, 1)[3]*qd + mer(q, qU, vU, 1)[4]*vU)/mer(q, qU, vU, 1)[1]; tdL = (mer(q, qL, vL, -1)[3]*qd + mer(q, qL, vL, -1)[4]*vL)/mer(q, qL, vL, -1)[1]
    sdA = iv.sin((q - qA)/2); tdA = (-sdA*qd + sdA*vA)/anti(q, qA, vA)[1]
    def lam_t(t):
        t = I(t); qq = q + qd*t; qdd = qd + acc*t
        return mid(lam(qq, qdd, qU + vU*(1 - tdU)*t, vU + aU*(1 - tdU)*t, qL + vL*(1 - tdL)*t, vL + aL*(1 - tdL)*t, qA + vA*(1 - tdA)*t, vA + aA*(1 - tdA)*t))
    h = mpf("1e-10"); fd = (lam_t(h) - lam_t(-h))/(2*h); worst = max(worst, abs(mid(val) - fd))
out["controls"]["K2_chain_rule_vs_central_difference_max"] = str(worst)
# W: flipped velocity sign on a sample box
q = I("0.20", "0.2005"); qd = I("0.2023", "0.2024"); qU = I("0.030", "0.0301"); vU = I("0.077", "0.078"); qL = I("0.0146", "0.0147"); vL = I("0.054", "0.055"); qA = I("0.0003", "0.00031"); vA = I("0.0078", "0.0079")
good = dlam(q, qd, qU, vU, g*F(qU), qL, vL, g*F(qL), qA, vA, g*F(qA))[0]; wrong = dlam(q, qd, qU, vU, g*F(qU), qL, vL, g*F(qL), qA, vA, g*F(qA), -1)[0]
okW = bool(good.b < wrong.a or wrong.b < good.a)
out["controls"]["W_flipped_velocity_sign"] = {"correct": [str(mp.mpf(good.a)), str(mp.mpf(good.b))], "wrong": [str(mp.mpf(wrong.a)), str(mp.mpf(wrong.b))], "disjoint": okW}
print("controls K1", okK1, "K2 worst", worst, "W", okW, flush=True)
assert okK1 and worst < mpf("1e-9") and okW, "control failure"
# target: b3 steps (shared data; the review's formulas); delayed accelerations gF(q') on the window; two-regime antipode box -> hull with 0
Tstar_lo = mpf("1.366684593623649597167969")
d = json.load(open(sys.argv[1])); allneg = True
for st in d["steps"]:
    if "antipode" not in st["classes"]: continue
    assert st["certified"]
    S = I(*st["S"]); VS = I(*st["VS"]); states = {}
    for name in ("unlike", "like", "antipode"):
        c = st["classes"][name]; da = c["delayed_arg_range"]; assert mpf(da[1]) < Tstar_lo
        qp = I(*c["history_q_range"]); vp = I(*c["history_qdot_range"]); acc = g*F(qp)
        if mpf(da[0]) <= 0: acc = I(min(mp.mpf(acc.a), mpf(0)), max(mp.mpf(acc.b), mpf(0)))
        states[name] = (qp, vp, acc)
    val, acc, darad, parts = dlam(S, VS, *states["unlike"], *states["like"], *states["antipode"])
    neg = bool(val.b < 0); allneg = allneg and neg
    rec = {"step": st["step"], "t_int": st["t_int"], "dlambda_dt": [str(mp.mpf(val.a)), str(mp.mpf(val.b))], "negative_proved": neg, "qddot": [str(mp.mpf(acc.a)), str(mp.mpf(acc.b))], "darad_dt": [str(mp.mpf(darad.a)), str(mp.mpf(darad.b))],
           "antipode_d_inv_rD": [str(mp.mpf(parts["A"].a)), str(mp.mpf(parts["A"].b))]}
    out["steps"].append(rec); print(rec["step"], st["t_int"][1][:14], rec["dlambda_dt"][0][:9], rec["dlambda_dt"][1][:9], "neg" if neg else "UNDECIDED", "qddot", rec["qddot"][0][:7], rec["qddot"][1][:7], "antipode d(1/rD)", rec["antipode_d_inv_rD"][0][:9], flush=True)
out["all_negative_proved"] = allneg; print("all negative proved:", allneg)
# comparison with the support's output (read after the review's own values)
try:
    sp = json.load(open(sys.argv[2])); recs = sp["target"]["records"]; cmp = []
    for r in recs:
        mine = [x for x in out["steps"] if x["step"] == r.get("step")]
        if mine: cmp.append({"step": r["step"], "support": r.get("dlambda_dt"), "review": mine[0]["dlambda_dt"]})
    out["support_comparison"] = cmp; print("support records compared:", len(cmp))
except Exception as ex: out["support_read_error"] = repr(ex)
p = sys.argv[3]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
