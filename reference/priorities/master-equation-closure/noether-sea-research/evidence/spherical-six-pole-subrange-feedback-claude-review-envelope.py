# Subrange-feedback campaign, review (ramon-e-moore lens), Phase A instrument, 2026-10-12 ~18:08 UTC, written BEFORE any exposure to new-campaign files of other
# roles or the coordinator. A-priori brackets (conditional on stated box premises) from the accepted endpoint (like-reception s3b step 154) for the times at which
# a class's source time s_c = t - tau_c reaches a given source time s_src (source at the certified state there): t - s_src = r_c(q(t), q_src); the function
# f(Delta) = s_src + r_c(q(t0 + Delta), q_src) - (t0 + Delta) is strictly decreasing sub-wake. Envelope q in [q0 + v0 D + g B_lo D^2/2, q0 + v0 D + g B_hi D^2/2],
# B the unit bracket 2 h_U + 2 h_L + h_A bounded by interval evaluation over a receiver box and class-specific delayed boxes, in GENERAL SIGNED FORM (no sign of
# M, N or D - 1 assumed). Controls BEFORE targets: (K) known: the same machinery from the like-reception restart (s3d step 94, that campaign's boxes) must give a
# bracket for the like T* crossing intersecting the interval CERTIFIED since, (3.006684593623649597167969, 3.016684709182828044891357); (W) negative: the like
# chord used for the primary (unlike) event gives a disjoint bracket; (S) signed-kernel facts: M(0.5914, 0.2838) > 0, M(0.80, 0.47) < 0 (the unlike label flips
# on the expected path), N(0.80, 0.47) > 0, N(0.85, 0.55) < 0 (the tangent numerator changes sign in the far corner of the new box).
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
    assert lo(DU) > 0 and lo(DL) > 0 and lo(DA) > 0
    B = 2*hU + 2*hL + hA
    return lo(B), up(B), {"hit_U": [s(lo(hU)), s(up(hU))], "hit_L": [s(lo(hL)), s(up(hL))], "hit_A": [s(lo(hA)), s(up(hA))], "D_U": [s(lo(DU)), s(up(DU))], "D_L": [s(lo(DL)), s(up(DL))], "D_A": [s(lo(DA)), s(up(DA))], "r_U_min": s(lo(rU)), "r_L_min": s(lo(rL)), "r_A_min": s(lo(rA))}
def event(label, t0, q0, v0, bq, boxes, chord, s_src, q_src, dmax="0.9"):
    Blo, Bhi, info = Bbox(bq, boxes)
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
    return {"event": label, "B_unit_bracket": [s(Blo), s(Bhi)], "box_receiver": [s(lo(bq)), s(up(bq))], "box_info": info, "t_event": [s(t_lo), s(t_hi)], "q_at_event": [s(qlo), s(qhi)], "qdot_at_event": [s(vlo), s(vhi)], "receiver_box_ok": bool(qhi <= up(bq)), "subwake_ok": bool(vhi < 1)}
chord_U = lambda q, qs: r_mer(q, qs, 1); chord_L = lambda q, qs: r_mer(q, qs, -1); chord_A = lambda q, qs: 2*iv.cos((q - qs)/2)
out = {"controls": {}, "targets": {}}
# (K) known: like-reception restart, its boxes, like T* crossing certified in (3.006684593623649597167969, 3.016684709182828044891357)
Tstar = I("1.366684593623649597167969", "1.366684709182828044891357"); qstar = I("0.0935969659738805924504719", "0.09359717429472312322322282")
tK = I("2.806684593623649597167969", "2.806684709182828044891357"); qK = I("0.3992437701157277106661817", "0.3992985410325688180050535"); vK = I("0.2888830859193191819271821", "0.2890560052917000141651863")
bK = {"U": (I("0.12", "0.34"), I("0.15", "0.27")), "L": (I("0.06", "0.20"), I("0.10", "0.21")), "A": (I("0.03", "0.12"), I("0.08", "0.16"))}
K = event("K: like T* crossing from the like-reception restart", tK, qK, vK, I("0.399", "0.48"), bK, chord_L, Tstar, qstar, dmax="0.7")
okK = bool(mpf(K["t_event"][0]) <= mpf("3.016684709182828044891357") and mpf(K["t_event"][1]) >= mpf("3.006684593623649597167969"))
out["controls"]["K_like_Tstar_crossing"] = {"bracket": K["t_event"], "certified": ["3.006684593623649597167969", "3.016684709182828044891357"], "intersects": okK}
vals = {"M(0.5914,0.2838)": Mf(I("0.5914"), I("0.2838")), "M(0.80,0.47)": Mf(I("0.80"), I("0.47")), "N(0.80,0.47)": Nf(I("0.80"), I("0.47")), "N(0.85,0.55)": Nf(I("0.85"), I("0.55")), "M(0.80,0.27)": Mf(I("0.80"), I("0.27")), "N(0.80,0.27)": Nf(I("0.80"), I("0.27")), "M(0.72,0.40)": Mf(I("0.72"), I("0.40")), "M(0.73,0.41)": Mf(I("0.73"), I("0.41"))}
okS = bool(lo(vals["M(0.5914,0.2838)"]) > 0 and up(vals["M(0.80,0.47)"]) < 0 and lo(vals["N(0.80,0.47)"]) > 0 and up(vals["N(0.85,0.55)"]) < 0)
out["controls"]["S_signed_kernels"] = {k: [s(lo(v)), s(up(v))] for k, v in vals.items()}; out["controls"]["S_pass"] = okS
# targets from the accepted endpoint (s3b step 154)
t0 = I("3.406684593623649597167969", "3.406684709182828044891357"); q0 = I("0.5912383062043186217382439", "0.5915726917256567880265456"); v0 = I("0.3491807720407250904899195", "0.3500711716516838136758167")
boxes = {"U": (I("0.268", "0.53"), I("0.235", "0.335")), "L": (I("0.146", "0.30"), I("0.172", "0.25")), "A": (I("0.10", "0.24"), I("0.14", "0.225"))}
def SRC(a, b): return I(a, b)
src = {"2.8067": (SRC("2.806684593623649597167969", "2.806684709182828044891357"), I("0.3992437701157277106661817", "0.3992985410325688180050535")),
       "1.4667": (SRC("1.466684593623649597167969", "1.466684709182828044891357"), I("0.1078360786", "0.1078365558")),
       "1.8667": (SRC("1.866684593623649597167969", "1.866684709182828044891357"), I("0.1750516801723775893710754", "0.175056763736205971059134")),
       "1.9767": (SRC("1.976684593623649597167969", "1.976684709182828044891357"), I("0.1964426619820381217168754", "0.196449994294162961493939")),
       "2.0767": (SRC("2.076684593623649597167969", "2.076684709182828044891357"), I("0.2169889763507186775076704", "0.2169987970109094562817074"))}
plan = [("PRIMARY_unlike_at_2.8067", chord_U, "2.8067", "0.78"), ("antipode_at_1.4667", chord_A, "1.4667", "0.61"), ("like_at_1.8667", chord_L, "1.8667", "0.68"), ("like_at_1.9767", chord_L, "1.9767", "0.74"),
        ("like_at_2.0767", chord_L, "2.0767", "0.79"), ("antipode_at_1.8667", chord_A, "1.8667", "0.78"), ("antipode_at_1.9767", chord_A, "1.9767", "0.83")]
evs = {}
for name, ch, key, qmax in plan:
    evs[name] = event(name, t0, q0, v0, I("0.591", qmax), boxes, ch, src[key][0], src[key][1])
W_ev = event("W: WRONG chord (like chord) for the primary event", t0, q0, v0, I("0.591", "0.85"), boxes, chord_L, src["2.8067"][0], src["2.8067"][1], dmax="2.0")
okW = bool(mpf(W_ev["t_event"][0]) > mpf(evs["PRIMARY_unlike_at_2.8067"]["t_event"][1]) or mpf(W_ev["t_event"][1]) < mpf(evs["PRIMARY_unlike_at_2.8067"]["t_event"][0]))
out["controls"]["W_wrong_chord"] = {"bracket_wrong": W_ev["t_event"], "disjoint_from_primary": okW}
print("controls K", okK, K["t_event"], "S", okS, "W", okW, flush=True)
assert okK and okS and okW, "control failure"
for name, ev in evs.items():
    out["targets"][name] = ev; print(name, "t in", ev["t_event"][0][:14], ev["t_event"][1][:14], "q", ev["q_at_event"][0][:7], ev["q_at_event"][1][:7], "qdot", ev["qdot_at_event"][0][:7], ev["qdot_at_event"][1][:7], "B", ev["B_unit_bracket"][0][:7], ev["B_unit_bracket"][1][:7], "box ok", ev["receiver_box_ok"], ev["subwake_ok"], "rUmin", ev["box_info"]["r_U_min"][:6], flush=True)
Blo, Bhi, info = Bbox(I("0.591", "0.85"), boxes); out["targets"]["widest_box_info"] = info; st = {}
for tj in ("3.6", "3.8", "4.0"):
    Dl = I(tj) - I(up(t0)); Dh = I(tj) - I(lo(t0))
    ql = lo(I(lo(q0)) + I(lo(v0))*Dl + g*I(Blo)*Dl*Dl/2); qh = up(I(up(q0)) + I(up(v0))*Dh + g*I(Bhi)*Dh*Dh/2); vl = lo(I(lo(v0)) + g*I(Blo)*Dl); vh = up(I(up(v0)) + g*I(Bhi)*Dh)
    st[tj] = {"q": [s(ql), s(qh)], "qdot": [s(vl), s(vh)]}; print("envelope at t =", tj, "q", s(ql)[:7], s(qh)[:7], "qdot", s(vl)[:7], s(vh)[:7], flush=True)
out["targets"]["envelope_states"] = st; out["targets"]["widest_B"] = [s(Blo), s(Bhi)]
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
