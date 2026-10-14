# Speed-maximum-feedback campaign, review (ramon-e-moore lens), Phase A instrument, 2026-10-12 ~21:18 UTC, written BEFORE any exposure to new-campaign files of other
# roles or the coordinator. (1) A-priori CONDITIONAL brackets from the accepted endpoint (s3w step 214) for the receiver times at which a class's source time reaches a
# given source time s_src: t - s_src = r_c(q(t), q_src); envelope q in [q0 + v0 D + g B_lo D^2/2, q0 + v0 D + g B_hi D^2/2] with the unit bracket B = 2 h_U + 2 h_L + h_A
# enclosed in GENERAL SIGNED FORM over a receiver box and class boxes (premises). (2) Signed geometry census by subdivision on the new box (receiver q in [0.81, 1.10],
# q' in [0, 0.85], v' in [0, 0.45]). Controls BEFORE targets: (K) known: the same machinery from the 3.4067 restart with the frozen subrange-campaign boxes must give a
# bracket meeting the since-certified primary crossing (3.786684593623649597167969, 3.796684709182828044891357); (W) negative: the like chord for the unlike target is
# disjoint; (S) signed kernel facts at hand-chosen points of the new box (both signs of N_U, N_L; M_U < 0, M_L < 0).
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
out = {"controls": {}, "targets": {}, "geometry": {}}
# (K) known: frozen subrange-campaign restart and boxes, primary crossing certified in (3.786684593623649597167969, 3.796684709182828044891357)
tK = I("3.406684593623649597167969", "3.406684709182828044891357"); qK = I("0.5912383062043186217382439", "0.5915726917256567880265456"); vK = I("0.3491807720407250904899195", "0.3500711716516838136758167")
bK = {"U": (I("0.268", "0.53"), I("0.235", "0.335")), "L": (I("0.146", "0.30"), I("0.172", "0.25")), "A": (I("0.10", "0.24"), I("0.14", "0.225"))}
B = (I("2.806684593623649597167969", "2.806684709182828044891357"), I("0.3992437701157277106661817", "0.3992985410325688180050535"))
K = event("K: unlike source at 2.8067 from the 3.4067 restart", tK, qK, vK, I("0.591", "0.78"), bK, chord_U, B[0], B[1])
okK = bool(mpf(K["t_event"][0]) <= mpf("3.796684709182828044891357") and mpf(K["t_event"][1]) >= mpf("3.786684593623649597167969") and K["t_event"][0][:16] == "3.79557160232969")
out["controls"]["K_known_primary_crossing"] = {"bracket": K["t_event"], "certified": ["3.786684593623649597167969", "3.796684709182828044891357"], "meets": okK}
pts = {"N_U(0.8139,0.4639)": Nf(I("0.8139"), I("0.4639")), "N_U(0.905,0.53)": Nf(I("0.905"), I("0.53")), "N_U(0.85,0.49)": Nf(I("0.85"), I("0.49")), "N_U(0.86,0.50)": Nf(I("0.86"), I("0.50")), "M_U(0.90,0.52)": Mf(I("0.90"), I("0.52")), "M_L(0.90,0.33)": Mf(I("0.90"), I("0.33")),
       "N_L(1.00,0.40)": Nf(I("1.00"), I("0.40")), "N_L(1.05,0.42)": Nf(I("1.05"), I("0.42")), "N_L(0.90,0.33)": Nf(I("0.90"), I("0.33"))}
okS = bool(lo(pts["N_U(0.8139,0.4639)"]) > 0 and up(pts["N_U(0.905,0.53)"]) < 0 and lo(pts["N_U(0.85,0.49)"]) > 0 and up(pts["N_U(0.86,0.50)"]) < 0 and up(pts["M_U(0.90,0.52)"]) < 0 and up(pts["M_L(0.90,0.33)"]) < 0 and lo(pts["N_L(1.00,0.40)"]) > 0 and up(pts["N_L(1.05,0.42)"]) < 0)
out["controls"]["S_signed_kernels"] = {k: [s(lo(v)), s(up(v))] for k, v in pts.items()}; out["controls"]["S_pass"] = okS
# targets from the accepted endpoint (s3w step 214)
t0 = I("4.006684593623649597167969", "4.006684709182828044891357"); q0 = I("0.8133846082509829763113406", "0.8144991287777617099871676"); v0 = I("0.3850091496059063693672473", "0.3868893027880675261383852")
boxes = {"U": (I("0.463", "0.70"), I("0.311", "0.40")), "L": (I("0.2569", "0.44"), I("0.2299", "0.31")), "A": (I("0.2206", "0.40"), I("0.2125", "0.29"))}
def P(a, b, c, d): return (I(a, b), I(c, d))
src = {"L_3.4067": P("3.406684593623649597167969", "3.406684709182828044891357", "0.5912383062043186217382439", "0.5915726917256567880265456"),
       "3.1067": P("3.106684593623649597167969", "3.106684709182828044891357", "0.4906834845802867001124733", "0.4908248692940519963879255"),
       "3.2067": P("3.206684593623649597167969", "3.206684709182828044891357", "0.5232341485451652734960506", "0.5234250485912267569427141"),
       "3.3067": P("3.306684593623649597167969", "3.306684709182828044891357", "0.5567684619494608997950057", "0.5570229266910271962584909"),
       "2.8067": B, "2.3067": P("2.306684593623649597167969", "2.306684709182828044891357", "0.2682548897108832844147014", "0.2682722348201430693813555"),
       "2.5067": P("2.506684593623649597167969", "2.506684709182828044891357", "0.3174215050973258168151511", "0.3174476357049886764715778"),
       "2.6467": P("2.646684593623649597167969", "2.646684709182828044891357", "0.3543985590884071228124339", "0.3544332051883565299139656"),
       "2.1667": P("2.166684593623649597167969", "2.166684709182828044891357", "0.2363815274827344393252612", "0.2363939808878887293542157")}
plan = [("unlike_at_3.1067", chord_U, "3.1067", "0.87"), ("unlike_at_3.2067", chord_U, "3.2067", "0.92"), ("unlike_at_3.3067", chord_U, "3.3067", "0.97"), ("TARGET2_unlike_at_L_3.4067", chord_U, "L_3.4067", "1.02"),
        ("like_at_2.3067", chord_L, "2.3067", "0.85"), ("like_at_2.5067", chord_L, "2.5067", "0.95"), ("like_at_2.6467", chord_L, "2.6467", "1.02"), ("like_at_2.8067", chord_L, "2.8067", "1.10"),
        ("antipode_at_2.1667", chord_A, "2.1667", "0.87"), ("antipode_at_2.3067", chord_A, "2.3067", "0.93"), ("antipode_at_2.5067", chord_A, "2.5067", "1.02"), ("antipode_at_2.6467", chord_A, "2.6467", "1.08")]
evs = {}
for name, ch, key, qmax in plan:
    try: evs[name] = event(name, t0, q0, v0, I("0.813", qmax), boxes, ch, src[key][0], src[key][1])
    except AssertionError as ex: evs[name] = {"event": name, "not_bracketed_within_0.9": str(ex)[:200]}
W_ev = event("W: WRONG chord (like chord) for target 2", t0, q0, v0, I("0.813", "1.60"), boxes, chord_L, src["L_3.4067"][0], src["L_3.4067"][1], dmax="3.0")
tg = evs["TARGET2_unlike_at_L_3.4067"]; okW = bool("t_event" in tg and (mpf(W_ev["t_event"][0]) > mpf(tg["t_event"][1]) or mpf(W_ev["t_event"][1]) < mpf(tg["t_event"][0])))
out["controls"]["W_wrong_chord"] = {"bracket_wrong": W_ev["t_event"], "disjoint_from_target": okW}
print("controls K", okK, K["t_event"], "S", okS, "W", okW, flush=True)
assert okK and okS and okW, "control failure"
for name, ev in evs.items():
    out["targets"][name] = ev
    if "t_event" in ev: print(name, "t in", ev["t_event"][0][:12], ev["t_event"][1][:12], "q", ev["q_at_event"][0][:7], ev["q_at_event"][1][:7], "qdot", ev["qdot_at_event"][0][:7], ev["qdot_at_event"][1][:7], "B", ev["B_unit_bracket"][0][:7], ev["B_unit_bracket"][1][:7], "box ok", ev["receiver_box_ok"], flush=True)
    else: print(name, ev, flush=True)
Blo, Bhi, info = Bbox(I("0.813", "1.10"), boxes); out["targets"]["widest_box_info"] = info; out["targets"]["widest_B"] = [s(Blo), s(Bhi)]; st = {}
for tj in ("4.2", "4.4", "4.6"):
    Dl = I(tj) - I(up(t0)); Dh = I(tj) - I(lo(t0))
    ql = lo(I(lo(q0)) + I(lo(v0))*Dl + g*I(Blo)*Dl*Dl/2); qh = up(I(up(q0)) + I(up(v0))*Dh + g*I(Bhi)*Dh*Dh/2); vl = lo(I(lo(v0)) + g*I(Blo)*Dl); vh = up(I(up(v0)) + g*I(Bhi)*Dh)
    st[tj] = {"q": [s(ql), s(qh)], "qdot": [s(vl), s(vh)]}; print("envelope at t =", tj, "q", s(ql)[:7], s(qh)[:7], "qdot", s(vl)[:7], s(vh)[:7], flush=True)
out["targets"]["envelope_states"] = st
# (2) geometry census by subdivision on the new box
def census(qa, qb, pa, pb, vmax, n=44):
    acc = {}
    def upd(k, x): acc[k] = (min(acc[k][0], lo(x)), max(acc[k][1], up(x))) if k in acc else (lo(x), up(x))
    cnt = {"M": [0, 0, 0], "N": [0, 0, 0]}; vp = I("0", vmax)
    for i in range(n):
        q = I(mpf(qa) + (mpf(qb) - mpf(qa))*i/n, mpf(qa) + (mpf(qb) - mpf(qa))*(i + 1)/n)
        for j in range(n):
            p = I(mpf(pa) + (mpf(pb) - mpf(pa))*j/n, mpf(pa) + (mpf(pb) - mpf(pa))*(j + 1)/n)
            M = Mf(q, p); N = Nf(q, p); rU = r_mer(q, p, 1); rL = r_mer(q, p, -1); upd("M", M); upd("N", N); upd("r_U", rU); upd("r_L", rL); upd("D_U", 1 - vp*M/rU); upd("D_L", 1 + vp*M/rL)
            for k, x in (("M", M), ("N", N)): cnt[k][0 if lo(x) > 0 else (1 if up(x) < 0 else 2)] += 1
            if lo(q) >= up(p): d = q - p; upd("r_A", 2*iv.cos(d/2)); upd("D_A", 1 + vp*iv.sin(d/2))
    return {k: [s(v[0]), s(v[1])] for k, v in acc.items()}, {k: {"positive": v[0], "negative": v[1], "undecided": v[2]} for k, v in cnt.items()}
rng, cnt = census("0.81", "1.10", "0", "0.85", "0.45"); out["geometry"]["new_box"] = {"ranges": rng, "cells": cnt}
print("new box ranges", {k: (v[0][:9], v[1][:9]) for k, v in rng.items()}, cnt, flush=True)
for lab, (qa, qb, pa, pb, vm) in {"unlike_path_box q[0.813,1.10] q'[0.463,0.70] v'<=0.40": ("0.813", "1.10", "0.463", "0.70", "0.40"), "like_path_box q[0.813,1.10] q'[0.2569,0.44] v'<=0.31": ("0.813", "1.10", "0.2569", "0.44", "0.31"), "antipode_path_box q[0.813,1.10] q'[0.2206,0.40] v'<=0.29": ("0.813", "1.10", "0.2206", "0.40", "0.29")}.items():
    r_, c_ = census(qa, qb, pa, pb, vm, n=30); out["geometry"][lab] = {"ranges": r_, "cells": c_}; print(lab, {k: (v[0][:8], v[1][:8]) for k, v in r_.items()}, c_, flush=True)
# zero loci of N (unlike and like tangent numerators) on sample q' lines, by bisection in q
def nzero(pv):
    a, b = mpf("0.5"), mpf("1.4"); f = lambda q: mp.cos(q + pv)/mp.sqrt(2) - mp.cos(q)*mp.sin(pv)/2
    if f(a)*f(b) > 0: return None
    for _ in range(90):
        m = (a + b)/2
        if f(a)*f(m) <= 0: b = m
        else: a = m
    return mp.nstr((a + b)/2, 12)
out["geometry"]["N_zero_q_for_qprime"] = {pv: nzero(mpf(pv)) for pv in ("0.25", "0.30", "0.35", "0.40", "0.45", "0.47", "0.50", "0.55", "0.60", "0.65", "0.70")}
print("N = 0 locus q(q')", out["geometry"]["N_zero_q_for_qprime"], flush=True)
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
