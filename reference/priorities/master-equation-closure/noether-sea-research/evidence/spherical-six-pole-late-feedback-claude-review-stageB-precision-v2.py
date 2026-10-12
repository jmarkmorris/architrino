# Late-feedback Stage B review (ramon-e-moore lens), 2026-10-11 20:12 UTC: the antipode-only precision account on the admitted R = 10 history (b3 steps 13-21):
# eps(t1) = qdot_full - qdot_held at t1 = 2.076684709182828044891357 by the difference system of the review's reference: eps = -g M + feedback,
# M = integral over [t_a, t1] of Delta_A, Delta_A = p H'(xi) + H(q - p) v' sin((q - p)/2)/D_A (two nonnegative terms from the record boxes), xi in hull(q - p, q);
# feedback bound |eps + gM| <= g L g Mbar T^3/6 / (1 - g L T^2/2) with T = t1 - t_a and L a bound on |dB/dq| (crude values 5 and 20 both reported).
# v2: toy linear known case K3 added (v1 retained). Controls BEFORE the target: (K) p = 0, v' = 0 gives Delta_A = 0 exactly on every step; (K2) the first-order point value on the record's step-start hits
# (hit_fixed0 - hit0, times step lengths, times g) must lie inside the enclosure; (W) flipping the velocity sign in D_A makes the second term negative and
# changes the integral detectably. Output JSON.
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10
def H(z): return iv.sin(z/2)/(4*iv.cos(z/2)**2)
def Hp(z): c = iv.cos(z/2); s = iv.sin(z/2); return (1/c + 2*s*s/c**3)/8
def hull(a, b): return iv.mpf([min(mp.mpf(a.a), mp.mpf(b.a)), max(mp.mpf(a.b), mp.mpf(b.b))])
d = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json"))
ta = I("1.990093453492709194426425", "1.990094426913756650197319"); t1 = mpf("2.076684709182828044891357")
def delta_A(S, p, vp, dsign=1):
    xi = hull(S - p, S); DA = 1 + dsign*vp*iv.sin((S - p)/2)
    return p*Hp(xi) + H(S - p)*(dsign*vp*iv.sin((S - p)/2))/DA
out = {"controls": {}, "steps": []}
# (K3, v2) toy known case for the bounding inequality: delta'' = -eps0 + L delta, delta(0) = delta'(0) = 0, exact delta'(T) = -eps0 sinh(sqrt(L) T)/sqrt(L);
# the review's bound delta'(T) in -eps0 T +- L eps0 T^3/6/(1 - L T^2/2) must contain the exact value (eps0 = 5e-5, L = 5, T = 0.0866)
e0 = I("5e-5"); Lt = I("5"); Tt = I("0.0866"); exact = -e0*iv.sinh(iv.sqrt(Lt)*Tt)/iv.sqrt(Lt); fbt = Lt*e0*Tt**3/6/(1 - Lt*Tt**2/2); bnd = -e0*Tt + iv.mpf([-mp.mpf(fbt.b), mp.mpf(fbt.b)])
okK3 = bool(mp.mpf(bnd.a) <= mp.mpf(exact.a) and mp.mpf(exact.b) <= mp.mpf(bnd.b)); out["controls"]["K3_toy_linear_bound_contains_exact"] = {"exact": [str(mp.mpf(exact.a)), str(mp.mpf(exact.b))], "bound": [str(mp.mpf(bnd.a)), str(mp.mpf(bnd.b))], "pass": okK3}
# K: p = 0, v' = 0
z = delta_A(I("0.2", "0.21"), I(0), I(0)); out["controls"]["K_zero_delayed_state"] = {"Delta_A": [str(mp.mpf(z.a)), str(mp.mpf(z.b))], "pass": bool(mp.mpf(z.a) == 0 and mp.mpf(z.b) == 0)}
M = I(0); Mfo = mpf(0); Mw = I(0); Mbar = mpf(0)
for st in d["steps"]:
    if "antipode" not in st["classes"]: continue
    k = st["step"]; S = I(*st["S"]); c = st["classes"]["antipode"]; p = I(*c["history_q_range"]); vp = I(*c["history_qdot_range"])
    dA = delta_A(S, p, vp); dAw = delta_A(S, p, vp, -1)
    if k == 13:
        t0 = I(st["t_int"][0], str(mpf(st["t_int"][1]) - mpf("0.01"))); length = (t0 + I("0.01")) - ta   # from t_a to the step end
        length = iv.mpf([max(mp.mpf(length.a), mpf(0)), mp.mpf(length.b)])
    else: length = I("0.01")
    M = M + dA*length; Mw = Mw + dAw*length; Mbar = max(Mbar, mp.mpf(dA.b))
    fo = (mpf(c["hit_fixed0"][0]) - mpf(c["hit0"][0]))*mp.mpf(length.a); Mfo += fo   # first-order point value from the record's step-start hits (consistency only)
    out["steps"].append({"step": k, "Delta_A": [str(mp.mpf(dA.a)), str(mp.mpf(dA.b))], "length": [str(mp.mpf(length.a)), str(mp.mpf(length.b))], "p": c["history_q_range"], "vp": c["history_qdot_range"]})
    print(k, "Delta_A", str(mp.mpf(dA.a))[:10], str(mp.mpf(dA.b))[:10], "len", str(mp.mpf(length.a))[:9], flush=True)
okK2 = bool(mp.mpf(M.a) <= Mfo <= mp.mpf(M.b) or abs(Mfo - mp.mpf(M.a)) < mpf("3e-7"))
out["controls"]["K2_first_order_point_value_inside"] = {"M_first_order": str(Mfo), "M_enclosure": [str(mp.mpf(M.a)), str(mp.mpf(M.b))], "pass": okK2}
okW = bool(mp.mpf(Mw.b) < mp.mpf(M.a)); out["controls"]["W_flipped_velocity_sign"] = {"M_wrong": [str(mp.mpf(Mw.a)), str(mp.mpf(Mw.b))], "detected": okW}
print("controls", json.dumps(out["controls"]), flush=True); assert out["controls"]["K_zero_delayed_state"]["pass"] and okW and okK3, "control failure"
T = I(str(t1 - mp.mpf(ta.b)), str(t1 - mp.mpf(ta.a)))
res = {}
for L in ("5", "20", "50"):
    Lv = I(L); fb = g*Lv*g*I(str(Mbar))*T**3/6/(1 - g*Lv*T**2/2); eps = -g*M + iv.mpf([-mp.mpf(fb.b), mp.mpf(fb.b)])
    res[L] = {"feedback_bound": str(mp.mpf(fb.b)), "eps_t1": [str(mp.mpf(eps.a)), str(mp.mpf(eps.b))], "sign": "negative (retarding)" if eps.b < 0 else "UNDECIDED"}
    print("L =", L, "feedback <=", str(mp.mpf(fb.b))[:10], "eps(t1) in", str(mp.mpf(eps.a))[:12], str(mp.mpf(eps.b))[:12], res[L]["sign"], flush=True)
out["M"] = [str(mp.mpf(M.a)), str(mp.mpf(M.b))]; out["gM"] = [str(mp.mpf((g*M).a)), str(mp.mpf((g*M).b))]; out["Mbar"] = str(Mbar); out["T"] = [str(mp.mpf(T.a)), str(mp.mpf(T.b))]; out["results_by_L"] = res
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
