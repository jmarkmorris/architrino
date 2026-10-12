# Like-reception campaign, review (ramon-e-moore lens), Phase A instrument, 2026-10-11 ~22:04 UTC, written BEFORE any exposure to new-campaign files of
# other roles or the coordinator. A-priori brackets (conditional on stated box premises) from the accepted endpoint (late-feedback s3d step 94 strings) for:
# (L) the like class's delayed argument reaching the window end T* (source at q(T*)); (U) the unlike class's delayed argument reaching the end of the
# antipodal records s_e (source at the b3 step-21 end state); (A) the own antipode's delayed argument reaching T*. Each event solves
# t - s_src = r_c(q(t), q_src); f(Delta) = s_src + r_c(q(t0 + Delta), q_src) - (t0 + Delta) is strictly decreasing sub-wake. Envelope:
# q in [q0 + v0 D + g B_lo D^2/2, q0 + v0 D + g B_hi D^2/2] with B the unit bracket 2 h_U + 2 h_L + h_A bounded over a receiver box and class-specific
# delayed boxes (premises verified by hand in the reference from certified history). Controls BEFORE targets: (K) known: the same machinery from the Stage A
# endpoint (b3 step 21) with the Stage A boxes for the unlike T* crossing must give a bracket intersecting the CERTIFIED interval
# (2.566684593623649597167969, 2.576684709182828044891357); (W) negative: the like chord used for the unlike exit gives a disjoint bracket;
# (S) sign lemma on the expanded box: M and N at the corner (q, q') = (0.7, 0.4) positive (minimum by monotonicity), M(0.75, 0.4) negative (the lemma's boundary).
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
def lo(x): return mp.mpf(x.a)
def up(x): return mp.mpf(x.b)
g = I(1)/10; S2 = iv.sqrt(2)
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def Mf(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def Nf(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def hit_mer(q, qp, vp, sg):
    r = r_mer(q, qp, sg); D = 1 - sg*vp*Mf(q, qp)/r; return Nf(q, qp)/(r**3*D), D, r
def hit_anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return iv.sin(d)/(r**3*D), D, r
def s(x): return str(x)
def Bbox(bq, boxes):
    hU, DU, rU = hit_mer(bq, boxes["U"][0], boxes["U"][1], 1); hL, DL, rL = hit_mer(bq, boxes["L"][0], boxes["L"][1], -1); hA, DA, rA = hit_anti(bq, boxes["A"][0], boxes["A"][1])
    B = 2*hU + 2*hL + hA
    return lo(B), up(B), {"hit_U": [s(lo(hU)), s(up(hU))], "hit_L": [s(lo(hL)), s(up(hL))], "hit_A": [s(lo(hA)), s(up(hA))], "D_U": [s(lo(DU)), s(up(DU))], "D_L": [s(lo(DL)), s(up(DL))], "D_A": [s(lo(DA)), s(up(DA))], "r_U_min": s(lo(rU)), "r_L_min": s(lo(rL)), "r_A_min": s(lo(rA))}
def event(label, t0, q0, v0, bq, boxes, chord, s_src, q_src, dmax="0.7"):
    Blo, Bhi, info = Bbox(bq, boxes); assert Blo > 0
    def q_env(D, hi): Dv = I(D); return (I(up(q0)) + I(up(v0))*Dv + g*I(Bhi)*Dv*Dv/2) if hi else (I(lo(q0)) + I(lo(v0))*Dv + g*I(Blo)*Dv*Dv/2)
    def v_env(D, hi): Dv = I(D); return (I(up(v0)) + g*I(Bhi)*Dv) if hi else (I(lo(v0)) + g*I(Blo)*Dv)
    res = {}
    for name, hi in (("q_hi", True), ("q_lo", False)):
        f = lambda D: s_src + chord(q_env(D, hi), q_src) - (t0 + I(D))
        a = mpf(0); b = mpf(dmax); assert lo(f(a)) > 0 and up(f(b)) < 0, (label, name, s(lo(f(a))), s(up(f(b))))
        a1, b1 = a, b
        for _ in range(70):
            m = (a1 + b1)/2
            if lo(f(m)) > 0: a1 = m
            else: b1 = m
        a2, b2 = a, b
        for _ in range(70):
            m = (a2 + b2)/2
            if up(f(m)) < 0: b2 = m
            else: a2 = m
        res[name] = (a1, b2)
    Dlo = min(res["q_hi"][0], res["q_lo"][0]); Dhi = max(res["q_hi"][1], res["q_lo"][1])
    t_lo = lo(t0 + I(Dlo)); t_hi = up(t0 + I(Dhi)); qlo = lo(q_env(Dlo, False)); qhi = up(q_env(Dhi, True)); vlo = lo(v_env(Dlo, False)); vhi = up(v_env(Dhi, True))
    return {"event": label, "B_unit_bracket": [s(Blo), s(Bhi)], "box_receiver": [s(lo(bq)), s(up(bq))], "box_info": info, "Delta": [s(Dlo), s(Dhi)], "t_event": [s(t_lo), s(t_hi)], "q_at_event": [s(qlo), s(qhi)], "qdot_at_event": [s(vlo), s(vhi)], "receiver_box_ok": bool(qhi <= up(bq))}
chord_U = lambda q, qs: r_mer(q, qs, 1); chord_L = lambda q, qs: r_mer(q, qs, -1); chord_A = lambda q, qs: 2*iv.cos((q - qs)/2)
Tstar = I("1.366684593623649597167969", "1.366684709182828044891357"); qstar = I("0.0935969659738805924504719", "0.09359717429472312322322282")
out = {"controls": {}, "targets": {}}
# (K) known: Stage A endpoint, Stage A boxes, unlike T* crossing, certified in (2.566684593623649597167969, 2.576684709182828044891357)
tA = I("2.076684593623649597167969", "2.076684709182828044891357"); qA = I("0.2169889763507186775076704", "0.2169987970109094562817074"); vA = I("0.210722148448371948628582", "0.2107493474124994851533159")
bA = {"U": (I("0", "0.15"), I("0", "0.20")), "L": (I("0", "0.15"), I("0", "0.20")), "A": (I("0", "0.10"), I("0", "0.20"))}
qS1 = I("0.0935969659738805924504719", "0.09497531240358474050374513")
K = event("K: Stage A unlike T* crossing", tA, qA, vA, I("0.21", "0.50"), bA, chord_U, Tstar, qS1, dmax="1.2")
okK = bool(mpf(K["t_event"][0]) <= mpf("2.576684709182828044891357") and mpf(K["t_event"][1]) >= mpf("2.566684593623649597167969"))
out["controls"]["K_stageA_unlike_crossing"] = {"bracket": K["t_event"], "certified": ["2.566684593623649597167969", "2.576684709182828044891357"], "intersects": okK}
# (S) sign lemma corner values
Mc = Mf(I("0.7"), I("0.4")); Nc = Nf(I("0.7"), I("0.4")); Mout = Mf(I("0.75"), I("0.4"))
okS = bool(lo(Mc) > 0 and lo(Nc) > 0 and up(Mout) < 0)
out["controls"]["S_sign_lemma_corner"] = {"M(0.7,0.4)": [s(lo(Mc)), s(up(Mc))], "N(0.7,0.4)": [s(lo(Nc)), s(up(Nc))], "M(0.75,0.4)": [s(lo(Mout)), s(up(Mout))], "pass": okS}
# targets from the accepted endpoint (s3d step 94)
t0 = I("2.806684593623649597167969", "2.806684709182828044891357"); q0 = I("0.3992437701157277106661817", "0.3992985410325688180050535"); v0 = I("0.2888830859193191819271821", "0.2890560052917000141651863")
boxes = {"U": (I("0.12", "0.34"), I("0.15", "0.27")), "L": (I("0.06", "0.20"), I("0.10", "0.21")), "A": (I("0.03", "0.12"), I("0.08", "0.16"))}
s_e = I("2.076684593623649597167969", "2.076684709182828044891357"); q_e = qA
L_ev = event("L: like delayed argument reaches T*", t0, q0, v0, I("0.399", "0.48"), boxes, chord_L, Tstar, qstar)
U_ev = event("U: unlike delayed argument reaches the end of the antipodal records (2.0767)", t0, q0, v0, I("0.399", "0.53"), boxes, chord_U, s_e, q_e)
A_ev = event("A: antipode delayed argument reaches T*", t0, q0, v0, I("0.399", "0.62"), boxes, chord_A, Tstar, qstar)
W_ev = event("W: WRONG chord (like chord) for the unlike exit", t0, q0, v0, I("0.399", "0.62"), boxes, chord_L, s_e, q_e, dmax="1.5")
okW = bool(mpf(W_ev["t_event"][0]) > mpf(U_ev["t_event"][1]) or mpf(W_ev["t_event"][1]) < mpf(U_ev["t_event"][0]))
out["controls"]["W_wrong_chord"] = {"bracket_wrong": W_ev["t_event"], "disjoint_from_U": okW}
print("controls K", okK, K["t_event"], "S", okS, "W", okW, flush=True)
assert okK and okS and okW, "control failure"
for k, ev in (("like_Tstar", L_ev), ("unlike_exit_antipodal_records", U_ev), ("antipode_Tstar", A_ev)):
    out["targets"][k] = ev; print(k, "t in", ev["t_event"][0][:16], ev["t_event"][1][:16], "q", ev["q_at_event"][0][:8], ev["q_at_event"][1][:8], "qdot", ev["qdot_at_event"][0][:8], ev["qdot_at_event"][1][:8], "B", ev["B_unit_bracket"][0][:7], ev["B_unit_bracket"][1][:7], "box ok", ev["receiver_box_ok"], flush=True)
# envelope state at t = 3.0, 3.2, 3.4 (antipode box, widest) for the join points
Blo, Bhi, info = Bbox(I("0.399", "0.62"), boxes); out["targets"]["widest_box_info"] = info; st = {}
for tj in ("3.0", "3.2", "3.4"):
    Dl = I(tj) - I(up(t0)); Dh = I(tj) - I(lo(t0))
    ql = lo(I(lo(q0)) + I(lo(v0))*Dl + g*I(Blo)*Dl*Dl/2); qh = up(I(up(q0)) + I(up(v0))*Dh + g*I(Bhi)*Dh*Dh/2); vl = lo(I(lo(v0)) + g*I(Blo)*Dl); vh = up(I(up(v0)) + g*I(Bhi)*Dh)
    st[tj] = {"q": [s(ql), s(qh)], "qdot": [s(vl), s(vh)]}; print("envelope at t =", tj, "q", s(ql)[:8], s(qh)[:8], "qdot", s(vl)[:8], s(vh)[:8], flush=True)
out["targets"]["envelope_states"] = st
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
