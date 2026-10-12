# Review check (ramon-e-moore lens), 2026-10-11 18:35 UTC: INDEPENDENT closed form and interval enclosure of d(lambda_hat)/dt on the N=4000 part-a step
# boxes (shared DATA from the continuation JSON; the review's own formulas, written from the wave-17 header partials and the review reference).
# lambda_hat = -qdot^2 - a_rad, a_rad = g[1/(rL DL) - 1/(rU DU) - 1/(2 rA)] (antipode fixed on part a).
# d lambda/dt = -2 qdot qddot - d a_rad/dt; d/dt[1/(rD)] = -(rdot D + r Ddot)/(rD)^2; rdot = r_q qdot + r_q' v'(1 - taudot);
# Ddot = -sg[ vdot' M/r + v'(Mdot r - M rdot)/r^2 ], vdot' = gF(q')(1 - taudot), Mdot = M_q qdot + M_q' v'(1 - taudot); taudot = (r_q qdot + r_q' v')/D.
# v2 (after run 11 TypeError in the midpoint conversion of control K; v1 retained; formulas unchanged). Controls first: (K) formula vs mpmath numerical derivative of lambda along a local affine model of (q, q', v') at random point states; (W) flipped
# velocity sign gives a detectably different enclosure. Then the target: sign of d lambda/dt over each part-a step box.
import os, sys, json, random
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv, diff
mp.dps = 30; iv.dps = 30
def mid(x): return (mp.mpf(x.a) + mp.mpf(x.b))/2
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2)
def F(q): return S2*iv.cos(q)*((2 + S2*iv.sin(q))**I(-1.5) + (2 - S2*iv.sin(q))**I(-1.5)) + iv.sin(q)/(8*iv.cos(q/2)**3)
def afix(q, sg): return iv.cos(q)/(S2*(2 - sg*S2*iv.sin(q))**I(1.5))
def cls(q, qp, vp, sg, dsign=1):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp)
    r = iv.sqrt(2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp)); M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2
    D = 1 - dsign*sg*vp*M/r; hit = N/(r**3*D)
    r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2
    return r, M, D, hit, r_q, r_qp, M_q, M_qp
def dinv_rD(q, qp, vp, qdot, sg, accp, dsign=1):
    r, M, D, hit, r_q, r_qp, M_q, M_qp = cls(q, qp, vp, sg, dsign)
    taudot = (r_q*qdot + r_qp*vp)/D; one = 1 - taudot
    rdot = r_q*qdot + r_qp*vp*one; vdotp = accp*one; Mdot = M_q*qdot + M_qp*vp*one
    Ddot = -dsign*sg*(vdotp*M/r + vp*(Mdot*r - M*rdot)/r**2)
    return -(rdot*D + r*Ddot)/(r*D)**2, hit, taudot
def qddot(q, qU, vU, qL, vL):
    hU = cls(q, qU, vU, 1)[3]; hL = cls(q, qL, vL, -1)[3]
    return g*(F(q) - 2*afix(q, 1) - 2*afix(q, -1) + 2*hU + 2*hL)
def dlam(q, qdot, qU, vU, qL, vL, dsign=1):
    acc = qddot(q, qU, vU, qL, vL)
    dU, _, tdU = dinv_rD(q, qU, vU, qdot, 1, g*F(qU), dsign); dL, _, tdL = dinv_rD(q, qL, vL, qdot, -1, g*F(qL), dsign)
    rA = 2*iv.cos(q/2); rAdot = -iv.sin(q/2)*qdot; dA = rAdot/(2*rA**2)
    darad = g*(dL - dU + dA)
    return -2*qdot*acc - darad, acc, darad, tdU, tdL
out = {"controls": {}, "steps": []}
# (K): at random point states, lambda along the local model: q(t) = q + qdot t, q'_c(t) = q'_c + v'_c(1 - taudot_c) t, v'_c(t) = v'_c + gF(q'_c)(1 - taudot_c) t
random.seed(3); worst = mpf(0)
for _ in range(40):
    q = I(random.uniform(0.17, 0.2)); qd = I(random.uniform(0.185, 0.2)); qU = I(random.uniform(0.01, 0.03)); vU = I(random.uniform(0.02, 0.07)); qL = I(random.uniform(0.001, 0.01)); vL = I(random.uniform(0.005, 0.03))
    val, acc, darad, tdU, tdL = dlam(q, qd, qU, vU, qL, vL)
    def lam_t(t):
        t = I(t); qq = q + qd*t; qdd = qd + acc*t
        qUt = qU + vU*(1 - tdU)*t; vUt = vU + g*F(qU)*(1 - tdU)*t; qLt = qL + vL*(1 - tdL)*t; vLt = vL + g*F(qL)*(1 - tdL)*t
        rU, _, DU, *_ = cls(qq, qUt, vUt, 1); rL, _, DL, *_ = cls(qq, qLt, vLt, -1); rA = 2*iv.cos(qq/2)
        return mid(-qdd**2 - g*(1/(rL*DL) - 1/(rU*DU) - 1/(2*rA)))
    fd = diff(lam_t, mpf(0))
    worst = max(worst, abs(mid(val) - fd))
out["controls"]["K_formula_vs_numerical_derivative_max"] = str(worst)
# (W): flipped velocity sign on a sample box gives a disjoint enclosure
q = I("0.19", "0.1905"); qd = I("0.197", "0.1971"); qU = I("0.02", "0.021"); vU = I("0.05", "0.051"); qL = I("0.005", "0.0055"); vL = I("0.015", "0.0155")
a_ok = dlam(q, qd, qU, vU, qL, vL)[0]; a_bad = dlam(q, qd, qU, vU, qL, vL, -1)[0]
out["controls"]["W_wrong_sign"] = {"correct": [str(a_ok.a), str(a_ok.b)], "wrong": [str(a_bad.a), str(a_bad.b)], "disjoint": bool(a_ok.b < a_bad.a or a_bad.b < a_ok.a)}
print("controls", json.dumps(out["controls"]), flush=True)
assert worst < mpf("1e-18") and out["controls"]["W_wrong_sign"]["disjoint"], "control failure"
d = json.load(open(sys.argv[1]))
allneg = True
for st in d["steps"]:
    assert st["certified"] and "antipode" not in st["classes"]
    cu = st["classes"]["unlike"]; cl = st["classes"]["like"]
    assert mpf(cu["delayed_arg_range"][0]) > 0 and mpf(cl["delayed_arg_range"][0]) > 0 and cu["delayed_arg_in_window"] and cl["delayed_arg_in_window"]
    val, acc, darad, tdU, tdL = dlam(I(*st["S"]), I(*st["VS"]), I(*cu["history_q_range"]), I(*cu["history_qdot_range"]), I(*cl["history_q_range"]), I(*cl["history_qdot_range"]))
    neg = bool(val.b < 0); allneg = allneg and neg
    rec = {"step": st["step"], "t_int": st["t_int"], "dlambda_dt": [str(val.a), str(val.b)], "negative_proved": neg, "qddot": [str(acc.a), str(acc.b)], "darad_dt": [str(darad.a), str(darad.b)]}
    out["steps"].append(rec); print(rec["step"], rec["t_int"][1][:10], "dlam", str(val.a)[:9], str(val.b)[:9], "neg" if neg else "UNDECIDED", "qddot", str(acc.a)[:7], str(acc.b)[:7], "darad", str(darad.a)[:8], str(darad.b)[:8], flush=True)
out["all_steps_negative_proved"] = allneg; print("all negative proved:", allneg)
p = sys.argv[2]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
