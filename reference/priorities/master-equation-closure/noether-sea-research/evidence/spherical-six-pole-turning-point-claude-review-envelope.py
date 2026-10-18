# Turning-point campaign, review (ramon-e-moore lens), Phase A instrument, 2026-10-14 ~10:13 UTC, written BEFORE any exposure to new-campaign files of other roles or
# the coordinator; derived from my frozen speed-maximum envelope (same functions). v2 (v1 retained): v1 copied too few header lines (event() lost its return), no target ran.
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
# (K) known: the frozen speed-maximum restart and boxes reproduce my frozen target-2 bracket, which meets the since-certified (4.426684593623649597167969, 4.436684709182828044891357)
tK = I("4.006684593623649597167969", "4.006684709182828044891357"); qK = I("0.8133846082509829763113406", "0.8144991287777617099871676"); vK = I("0.3850091496059063693672473", "0.3868893027880675261383852")
bK = {"U": (I("0.463", "0.70"), I("0.311", "0.40")), "L": (I("0.2569", "0.44"), I("0.2299", "0.31")), "A": (I("0.2206", "0.40"), I("0.2125", "0.29"))}
Lb = (I("3.406684593623649597167969", "3.406684709182828044891357"), I("0.5912383062043186217382439", "0.5915726917256567880265456"))
K = event("K", tK, qK, vK, I("0.813", "1.02"), bK, chord_U, Lb[0], Lb[1])
okK = bool(K["t_event"][0][:16] == "4.42919157095188" and mpf(K["t_event"][0]) <= mpf("4.436684709182828044891357") and mpf(K["t_event"][1]) >= mpf("4.426684593623649597167969"))
out["controls"]["K"] = {"bracket": K["t_event"], "pass": okK}
pts = {"dNdq_at_p=1.0": None}
t0 = I("4.606684593623649597167969", "4.606684709182828044891357"); q0 = I("1.045210315569370832259362", "1.048063603726783075030252"); v0 = I("0.3821099822311932454794886", "0.3863400661206562789504872")
boxes = {"U": (I("0.642", "0.95"), I("0.36", "0.392")), "L": (I("0.414", "0.66"), I("0.2943", "0.37")), "A": (I("0.374", "0.61"), I("0.2793", "0.355"))}
def P(a, b, c, d): return (I(a, b), I(c, d))
def tt(x): return "%s.%s" % (x[0], x[1:])
SR = {"2.8067": "0.3992437701157277106661817 0.3992985410325688180050535", "2.9067": "0.4286670033639066141742331 0.42874241439421191995251", "3.0067": "0.4591525341524837711992566 0.4592561639425522811594391", "3.1067": "0.4906834845802867001124733 0.4908248692940519963879255",
      "3.2067": "0.5232341485451652734960506 0.5234250485912267569427141", "3.3067": "0.5567684619494608997950057 0.5570229266910271962584909", "3.4067": "0.5912383062043186217382439 0.5915726917256567880265456",
      "3.6067": "0.6627327067191011813623429 0.6632654033860232453293408", "3.8067": "0.7370648831887008774655915 0.7378501255736750739054564", "4.0067": "0.8133846082509829763113406 0.8144991287777617099871676"}
def src(k): a, b = SR[k].split(); return P(k + "06684593623649597167969", k + "06684709182828044891357", a, b)
plan = [("unlike", chord_U, k) for k in ("3.6067", "3.8067", "4.0067")] + [("like", chord_L, k) for k in ("2.9067", "3.0067", "3.1067", "3.2067", "3.3067", "3.4067")] + [("antipode", chord_A, k) for k in ("2.8067", "2.9067", "3.0067", "3.1067", "3.2067")]
evs = {}
for cl, ch, k in plan:
    nm = cl + "_at_" + k
    try: evs[nm] = event(nm, t0, q0, v0, I("1.045", "1.36"), boxes, ch, src(k)[0], src(k)[1], dmax="0.75")
    except AssertionError as ex: evs[nm] = {"event": nm, "not_bracketed_within_0.75": str(ex)[:160]}
W_ev = event("W", t0, q0, v0, I("1.045", "2.0"), boxes, chord_L, src("4.0067")[0], src("4.0067")[1], dmax="3.0")
tg = evs["unlike_at_4.0067"]; okW = bool("t_event" in tg and (mpf(W_ev["t_event"][0]) > mpf(tg["t_event"][1]) or mpf(W_ev["t_event"][1]) < mpf(tg["t_event"][0])))
out["controls"]["W_wrong_chord"] = {"bracket": W_ev["t_event"], "disjoint": okW}
print("controls K", okK, K["t_event"], "W", okW, flush=True); assert okK and okW
for name, ev in evs.items():
    out["targets"][name] = ev
    if "t_event" in ev: print(name, "t in", ev["t_event"][0][:12], ev["t_event"][1][:12], "q", ev["q_at_event"][0][:7], ev["q_at_event"][1][:7], "w", ev["qdot_at_event"][0][:7], ev["qdot_at_event"][1][:7], "B", ev["B_unit_bracket"][0][:8], ev["B_unit_bracket"][1][:8], "box", ev["receiver_box_ok"], flush=True)
    else: print(name, ev, flush=True)
Blo, Bhi, info = Bbox(I("1.045", "1.36"), boxes); out["targets"]["widest_B"] = [s(Blo), s(Bhi)]; out["targets"]["widest_info"] = info; st = {}
for tj in ("4.8", "5.0", "5.2", "5.3"):
    Dl = I(tj) - I(up(t0)); Dh = I(tj) - I(lo(t0))
    ql = lo(I(lo(q0)) + I(lo(v0))*Dl + g*I(Blo)*Dl*Dl/2); qh = up(I(up(q0)) + I(up(v0))*Dh + g*I(Bhi)*Dh*Dh/2); vl = lo(I(lo(v0)) + g*I(Blo)*Dh); vh = up(I(up(v0)) + g*I(Bhi)*Dh)
    st[tj] = {"q": [s(ql), s(qh)], "w": [s(vl), s(vh)]}; print("envelope t =", tj, "q", s(ql)[:7], s(qh)[:7], "w", s(vl)[:7], s(vh)[:7], flush=True)
out["targets"]["envelope_states"] = st
def census(qa, qb, pa, pb, wlo, whi, n=40):
    acc = {}; cnt = {"M": [0, 0, 0], "N": [0, 0, 0], "sinA": [0, 0, 0], "dNdq": [0, 0, 0]}; vp = I(wlo, whi)
    def upd(k, x): acc[k] = (min(acc[k][0], lo(x)), max(acc[k][1], up(x))) if k in acc else (lo(x), up(x))
    for i in range(n):
        q = I(mpf(qa) + (mpf(qb) - mpf(qa))*i/n, mpf(qa) + (mpf(qb) - mpf(qa))*(i + 1)/n)
        for j in range(n):
            p = I(mpf(pa) + (mpf(pb) - mpf(pa))*j/n, mpf(pa) + (mpf(pb) - mpf(pa))*(j + 1)/n)
            M = Mf(q, p); N = Nf(q, p); rU = r_mer(q, p, 1); rL = r_mer(q, p, -1); d = q - p; rA = 2*iv.cos(d/2); dNq = -(iv.sin(q)/S2)*(iv.cos(p) - iv.sin(p)/S2) - iv.cos(q)*iv.sin(p)/S2
            for k, x in (("M", M), ("N", N), ("r_U", rU), ("r_L", rL), ("r_A", rA), ("D_U", 1 - vp*M/rU), ("D_L", 1 + vp*M/rL), ("D_A", 1 + vp*iv.sin(d/2)), ("dNdq", dNq), ("dNdp", -iv.sin(q + p)/S2 - iv.cos(q)*iv.cos(p)/2)): upd(k, x)
            for k, x in (("M", M), ("N", N), ("sinA", iv.sin(d)), ("dNdq", dNq)): cnt[k][0 if lo(x) > 0 else (1 if up(x) < 0 else 2)] += 1
    return {k: [s(v[0]), s(v[1])] for k, v in acc.items()}, {k: {"pos": v[0], "neg": v[1], "und": v[2]} for k, v in cnt.items()}
rng, cnt = census("1.04", "1.50", "0", "1.20", "-0.05", "0.45"); out["geometry"]["new_box"] = {"ranges": rng, "cells": cnt}; print("new box", {k: (v[0][:8], v[1][:8]) for k, v in rng.items()}, cnt, flush=True)
for lab, a in {"unlike_path": ("1.045", "1.36", "0.642", "0.95", "0.36", "0.392"), "like_path": ("1.045", "1.36", "0.414", "0.66", "0.2943", "0.37"), "antipode_path": ("1.045", "1.36", "0.374", "0.61", "0.2793", "0.355")}.items():
    r_, c_ = census(*a, n=24); out["geometry"][lab] = {"ranges": r_, "cells": c_}; print(lab, {k: (v[0][:8], v[1][:8]) for k, v in r_.items()}, c_, flush=True)
def nz(pv):
    f = lambda q: mp.cos(q + pv)/mp.sqrt(2) - mp.cos(q)*mp.sin(pv)/2; a, b = mpf("0.3"), mpf("1.55")
    if f(a)*f(b) > 0: return None
    for _ in range(90):
        m = (a + b)/2
        if f(a)*f(m) <= 0: b = m
        else: a = m
    return mp.nstr((a + b)/2, 12)
out["geometry"]["N_zero_q"] = {pv: nz(mpf(pv)) for pv in ("0.30", "0.40", "0.50", "0.60", "0.70", "0.80", "0.90", "1.00")}; print("N zero", out["geometry"]["N_zero_q"], flush=True)
p_ = sys.argv[1]; assert not os.path.exists(p_); json.dump(out, open(p_, "w"), indent=1); print("saved", p_)
