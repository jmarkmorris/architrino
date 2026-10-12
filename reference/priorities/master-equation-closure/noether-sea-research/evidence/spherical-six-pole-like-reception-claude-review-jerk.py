# Like-reception campaign, review (ramon-e-moore lens), 2026-10-11 22:29 UTC, written before reading the support's section 5: the review's OWN enclosure of
# the tangent jerk d(qddot)/dt = g (2 hdot_U + 2 hdot_L + hdot_A) on the v4 chain's consumed boxes (steps 95-154), with the per-class contribution derivatives.
# Quotient rule for a meridional class, h = N/(r^3 D): hdot = Ndot/(r^3 D) - 3 N rdot/(r^4 D) - N Ddot/(r^3 D^2), with
#   taudot = (r_q qdot + r_q' v')/D, sdot = 1 - taudot = (1 - r_q qdot)/D, Ndot = N_q qdot + N_q' v' sdot, rdot = r_q qdot + r_q' v' sdot,
#   Mdot = M_q qdot + M_q' v' sdot, vdot' = a' sdot (a' the source acceleration), Ddot = -sg [vdot' M/r + v' (Mdot r - M rdot)/r^2].
# Antipode, h = sin d/(r^3 D), d = q - q', r = 2 cos(d/2), D = 1 + v' sin(d/2): ddot = qdot - v' sdot, taudot = sin(d/2)(v' - qdot)/D, rdot = -sin(d/2) ddot,
#   Ddot = vdot' sin(d/2) + v' cos(d/2) ddot/2, hdot = cos d ddot/(r^3 D) - 3 sin d rdot/(r^4 D) - sin d Ddot/(r^3 D^2).
# Controls BEFORE any target: (K1) EXACT hand-derived case at an expanded-domain state with the sources at rest but accelerating (v' = 0): for a meridional
#   class hdot = N_q qdot/r^3 - 3 N r_q qdot/r^4 + sg N a (1 - r_q qdot) M/r^4 with r_q = -sg N/r; antipode hdot = cos d qdot/r^3 + 3 sin d sd qdot/r^4
#   - sin d a (1 + sd qdot) sd/r^3; separately written point arithmetic. (K2) prescribed-history case with MOVING sources on the new domain (delays re-solved,
#   Richardson central difference of each class's hit along the history) at t = 3.0 and 3.3. (W1) zero source accelerations must change K1; (W2) the unlike and
#   like class signs exchanged in the closed form must be detected in K2. Usage: jerk.py OUT.json TARGET.json ...
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv, sin, cos, sqrt
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
def lo(x): return mp.mpf(x.a)
def up(x): return mp.mpf(x.b)
def mid(x): return (lo(x) + up(x))/2
g = I(1)/10; S2 = iv.sqrt(2)
def hdot_mer(q, qp, vp, qdot, acc, sg):
    s_ = iv.sin(q + qp); c_ = iv.cos(q + qp); r2 = 2 - sg*S2*s_ + sg*iv.sin(q)*iv.sin(qp); r = iv.sqrt(r2)
    M = c_/S2 - iv.sin(q)*iv.cos(qp)/2; N = c_/S2 - iv.cos(q)*iv.sin(qp)/2; D = 1 - sg*vp*M/r
    r_q = sg*(-S2*c_ + iv.cos(q)*iv.sin(qp))/(2*r); r_qp = sg*(-S2*c_ + iv.sin(q)*iv.cos(qp))/(2*r)
    M_q = -s_/S2 - iv.cos(q)*iv.cos(qp)/2; M_qp = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_q = -s_/S2 + iv.sin(q)*iv.sin(qp)/2; N_qp = -s_/S2 - iv.cos(q)*iv.cos(qp)/2
    sdot = (1 - r_q*qdot)/D; Ndot = N_q*qdot + N_qp*vp*sdot; rdot = r_q*qdot + r_qp*vp*sdot; Mdot = M_q*qdot + M_qp*vp*sdot; vdot = acc*sdot
    Ddot = -sg*(vdot*M/r + vp*(Mdot*r - M*rdot)/r2)
    return Ndot/(r**3*D) - 3*N*rdot/(r**4*D) - N*Ddot/(r**3*D*D), N/(r**3*D)
def hdot_anti(q, qp, vp, qdot, acc):
    d = q - qp; sd = iv.sin(d/2); cd = iv.cos(d/2); r = 2*cd; D = 1 + vp*sd
    sdot = (1 + sd*qdot)/D; ddot = qdot - vp*sdot; rdot = -sd*ddot; vdot = acc*sdot; Ddot = vdot*sd + vp*cd*ddot/2
    return iv.cos(d)*ddot/(r**3*D) - 3*iv.sin(d)*rdot/(r**4*D) - iv.sin(d)*Ddot/(r**3*D*D), iv.sin(d)/(r**3*D)
out = {"controls": {}, "targets": {}}
# ---------- K1 exact (v' = 0), expanded-domain state ----------
r2p = sqrt(mpf(2)); q4, qd4 = mpf("0.55"), mpf("0.33"); st4 = {"U": (mpf("0.28"), mpf("0.105")), "L": (mpf("0.15"), mpf("0.103")), "A": (mpf("0.10"), mpf("0.101"))}
def ex_mer(q, qp, qd, a, sg):
    r = sqrt(2 - sg*r2p*sin(q + qp) + sg*sin(q)*sin(qp)); N = cos(q + qp)/r2p - cos(q)*sin(qp)/2; M = cos(q + qp)/r2p - sin(q)*cos(qp)/2; Nq = -sin(q + qp)/r2p + sin(q)*sin(qp)/2; rq = -sg*N/r
    return Nq*qd/r**3 - 3*N*rq*qd/r**4 + sg*N*a*(1 - rq*qd)*M/r**4
def ex_anti(q, qp, qd, a):
    d = q - qp; sd = sin(d/2); r = 2*cos(d/2); return cos(d)*qd/r**3 + 3*sin(d)*sd*qd/r**4 - sin(d)*a*(1 + sd*qd)*sd/r**3
P = lambda x: I(str(x)); Z = I(0)
ex = {"U": ex_mer(q4, st4["U"][0], qd4, st4["U"][1], 1), "L": ex_mer(q4, st4["L"][0], qd4, st4["L"][1], -1), "A": ex_anti(q4, st4["A"][0], qd4, st4["A"][1])}
cf = {"U": hdot_mer(P(q4), P(st4["U"][0]), Z, P(qd4), P(st4["U"][1]), 1)[0], "L": hdot_mer(P(q4), P(st4["L"][0]), Z, P(qd4), P(st4["L"][1]), -1)[0], "A": hdot_anti(P(q4), P(st4["A"][0]), Z, P(qd4), P(st4["A"][1]))[0]}
cw = {"U": hdot_mer(P(q4), P(st4["U"][0]), Z, P(qd4), Z, 1)[0], "L": hdot_mer(P(q4), P(st4["L"][0]), Z, P(qd4), Z, -1)[0], "A": hdot_anti(P(q4), P(st4["A"][0]), Z, P(qd4), Z)[0]}
e1 = {k: abs(mid(cf[k]) - ex[k]) for k in ex}; w1 = {k: abs(mid(cw[k]) - ex[k]) for k in ex}
okK1 = all(v < mpf("1e-26") for v in e1.values()); okW1 = all(v > mpf("1e-5") for v in w1.values())
out["controls"]["K1_exact_v0_expanded_state"] = {"state": "q=0.55 qdot=0.33; U q'=0.28 a=0.105; L q'=0.15 a=0.103; A q'=0.10 a=0.101; v'=0", "exact": {k: str(v) for k, v in ex.items()}, "abs_err": {k: str(v) for k, v in e1.items()}, "pass": bool(okK1)}
out["controls"]["W1_zero_source_acceleration"] = {"abs_diff": {k: str(v) for k, v in w1.items()}, "detected": bool(okW1)}
# ---------- K2 prescribed history, moving sources ----------
c0, c1, c2 = mpf("0.02"), mpf("0.03"), mpf("0.045")
def hq(s): return c0 + c1*s + c2*s*s
def hv(s): return c1 + 2*c2*s
def chord(q, qp, cls):
    if cls == "A": return 2*cos((q - qp)/2)
    sg = 1 if cls == "U" else -1; return sqrt(2 - sg*r2p*sin(q + qp) + sg*sin(q)*sin(qp))
def tau_of(t, cls):
    q = hq(t); a, b = mpf("0.5"), mpf("2.5")
    for _ in range(110):
        m = (a + b)/2
        if m - chord(q, hq(t - m), cls) < 0: a = m
        else: b = m
    return (a + b)/2
def hit_pt(t, cls):
    q = hq(t); tau = tau_of(t, cls); qp = hq(t - tau); vp = hv(t - tau); r = chord(q, qp, cls)
    if cls == "A": return sin(q - qp)/(r**3*(1 + vp*sin((q - qp)/2))), qp, vp
    sg = 1 if cls == "U" else -1; M = cos(q + qp)/r2p - sin(q)*cos(qp)/2; N = cos(q + qp)/r2p - cos(q)*sin(qp)/2; return N/(r**3*(1 - sg*vp*M/r)), qp, vp
k2 = {}; okK2 = True; okW2 = True
for tt in ("3.0", "3.3"):
    t = mpf(tt); h1 = mpf("1e-5"); row = {}
    for cls in ("U", "L", "A"):
        d1 = (hit_pt(t + h1, cls)[0] - hit_pt(t - h1, cls)[0])/(2*h1); d2 = (hit_pt(t + h1/2, cls)[0] - hit_pt(t - h1/2, cls)[0])/h1; fd = (4*d2 - d1)/3
        _, qp, vp = hit_pt(t, cls); acc = P(2*c2)
        if cls == "A": cfv = hdot_anti(P(hq(t)), P(qp), P(vp), P(hv(t)), acc)[0]; cwv = None
        else:
            sg = 1 if cls == "U" else -1; cfv = hdot_mer(P(hq(t)), P(qp), P(vp), P(hv(t)), acc, sg)[0]; cwv = hdot_mer(P(hq(t)), P(qp), P(vp), P(hv(t)), acc, -sg)[0]
        err = abs(mid(cfv) - fd); row[cls] = {"closed": str(mid(cfv)), "fd": str(fd), "abs_err": str(err), "delayed": [str(qp)[:10], str(vp)[:10]]}; okK2 = okK2 and err < mpf("1e-12")
        if cwv is not None: wd = abs(mid(cwv) - fd); row[cls]["wrong_class_sign_diff"] = str(wd); okW2 = okW2 and wd > mpf("1e-4")
    k2[tt] = row
out["controls"]["K2_prescribed_history_moving_sources"] = {"pass": bool(okK2), "cases": k2}; out["controls"]["W2_exchanged_class_sign_detected"] = bool(okW2)
print("controls K1", okK1, {k: mp.nstr(v, 3) for k, v in e1.items()}, "W1", okW1, "K2", okK2, {t: {c: mp.nstr(mpf(v["abs_err"]), 3) for c, v in r.items()} for t, r in k2.items()}, "W2", okW2, flush=True)
assert okK1 and okW1 and okK2 and okW2, "control failure"
# ---------- targets: v4 chain consumed boxes ----------
def sg3(x): return "negative" if up(x) < 0 else ("positive" if lo(x) > 0 else "UNDECIDED")
def s2(x): return [str(lo(x)), str(up(x))]
for p in sys.argv[2:]:
    d = json.load(open(p)); rows = []
    for st in d["steps"]:
        S = I(*st["S"]); VS = I(*st["VS"]); c = st["classes"]; ok = all(c[n].get("history_qddot_range") is not None for n in ("unlike", "like", "antipode"))
        if not ok: rows.append({"step": st["step"], "status": "no consumed acceleration box"}); continue
        a = {n: (I(*c[n]["history_q_range"]), I(*c[n]["history_qdot_range"]), I(*c[n]["history_qddot_range"])) for n in ("unlike", "like", "antipode")}
        hU = hdot_mer(S, a["unlike"][0], a["unlike"][1], VS, a["unlike"][2], 1)[0]; hL = hdot_mer(S, a["like"][0], a["like"][1], VS, a["like"][2], -1)[0]; hA = hdot_anti(S, a["antipode"][0], a["antipode"][1], VS, a["antipode"][2])[0]
        cU = g*2*hU; cL = g*2*hL; cA = g*hA; tot = cU + cL + cA; ap = I(*st["ap"])
        rows.append({"step": st["step"], "t_int": st["t_int"], "d_tan_unlike": s2(cU), "d_tan_like": s2(cL), "d_tan_antipode": s2(cA), "jerk_total": s2(tot), "sign_unlike": sg3(cU), "sign_like": sg3(cL), "sign_antipode": sg3(cA), "sign_total": sg3(tot),
                     "record_ap": st["ap"], "review_total_intersects_record_ap": bool(max(lo(tot), lo(ap)) <= min(up(tot), up(ap))), "trace_identity": st.get("trace_identity_all_classes")})
    out["targets"][os.path.basename(p)] = rows
    for r in rows:
        if "jerk_total" in r: print(r["step"], r["t_int"][1][:10], "U", r["d_tan_unlike"][0][:9], r["d_tan_unlike"][1][:9], r["sign_unlike"], "| L", r["d_tan_like"][0][:9], r["d_tan_like"][1][:9], r["sign_like"], "| A", r["d_tan_antipode"][0][:9], r["d_tan_antipode"][1][:9], r["sign_antipode"], "| total", r["jerk_total"][0][:9], r["jerk_total"][1][:9], r["sign_total"], "| ap", r["record_ap"][0][:9], r["record_ap"][1][:9], "meets", r["review_total_intersects_record_ap"], flush=True)
        else: print(r["step"], r["status"])
po = sys.argv[1]; assert not os.path.exists(po); json.dump(out, open(po, "w"), indent=1); print("saved", po)
