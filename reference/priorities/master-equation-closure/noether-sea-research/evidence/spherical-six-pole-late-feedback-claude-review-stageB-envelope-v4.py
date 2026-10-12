# Late-feedback Stage B review (ramon-e-moore lens), 2026-10-11 ~19:45 UTC, Phase A instrument, written before any exposure to Stage B files of other roles.
# General-g a-priori envelopes for the rest-release six poles (unit sphere, K = c_f = 1, g = 1/R): (a) window: q'' = gF(q) with F in [F_lo, F_hi] on
# [0, q_box] (interval-evaluated), so q in [gF_lo t^2/2, gF_hi t^2/2], qdot in [gF_lo t, gF_hi t]; window end T*: t = r_U(q(t), 0) (unlike chord, first
# reception; verified against the like and antipode chords); (b) after T*: envelopes from the T* state with the unit bracket B bounded over a box of
# receiver and delayed states (all classes moving, antipode fixed-or-moving hull); brackets for the like reading t = r_L(q(t), 0), the antipodal
# reception 2cos(q/2) = t, and the support zero via lambda_hat in [-qdot_hi^2 + g A_lo, -qdot_lo^2 + g A_hi], A = 1/(rU DU) + 1/(2 rA DA) - 1/(rL DL)
# bounded over the box (A > 0 there). Controls (g = 1/10, frozen certified values as the known case) BEFORE the g = 1/8 and g = 1/12 targets:
# K1 T* bracket contains the frozen T*; K2 reception bracket contains the certified [1.9900934535, 1.9900944269]; K3 zero bracket contains the certified
# [1.945684593623649597167969, 1.946684709182828044891357]; K4 like-reading bracket contains the wave-16 bracket [1.4670405072, 1.4677497282];
# W a wrong window chord (like chord) gives a T* disjoint from the frozen one. Output: JSON with exact outward-rounded endpoints.
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
S2 = iv.sqrt(2)
def F(q): return S2*iv.cos(q)*((2 + S2*iv.sin(q))**I(-1.5) + (2 - S2*iv.sin(q))**I(-1.5)) + iv.sin(q)/(8*iv.cos(q/2)**3)
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def Mf(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def Nf(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def hit_mer(q, qp, vp, sg):
    r = r_mer(q, qp, sg); D = 1 - sg*vp*Mf(q, qp)/r; return Nf(q, qp)/(r**3*D), D, r
def hit_anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return iv.sin(d)/(r**3*D), D, r
def s(x): return str(mp.mpf(x))
def bisect_sign(f_lo, f_hi, a, b, n=80):
    # f_lo(x) > 0 proved before the root, f_hi(x) < 0 proved after; returns [largest x proved before, smallest x proved after]
    assert f_lo(a) > 0 and f_hi(b) < 0, ('bracket ends', str(a), str(f_lo(a)), str(b), str(f_hi(b)))   # v4: diagnostic message only
    a1, b1 = a, b
    for _ in range(n):
        m = (a1 + b1)/2
        if f_lo(m) > 0: a1 = m
        else: b1 = m
    a2, b2 = a, b
    for _ in range(n):
        m = (a2 + b2)/2
        if f_hi(m) < 0: b2 = m
        else: a2 = m
    return a1, b2
def cell(gs, wrong=False, qbox_w="0.16", qbox_p="0.30", qpbox="0.06", vpbox="0.15"):
    # v2: tighter post-window box (q <= 0.30, delayed q' <= 0.06, v' <= 0.15), verified a posteriori from the window envelope of the delayed state (s <= t - 1.2, chords >= 1.2 on the box)
    g = I(gs); out = {"g": gs}
    # window
    Fw = F(I("0", qbox_w)); Flo, Fhi = mp.mpf(Fw.a), mp.mpf(Fw.b); out["window_F_bounds_on_[0,%s]" % qbox_w] = [s(Flo), s(Fhi)]
    def q_w(t, hi): return g*(Fhi if hi else Flo)*I(t)**2/2
    def v_w(t, hi): return g*(Fhi if hi else Flo)*I(t)
    chord = (lambda q: r_mer(q, I(0), -1)) if wrong else (lambda q: r_mer(q, I(0), 1))
    # unlike window end: f(t) = r_U(q(t),0) - t decreasing; before: proved positive with q_hi (smaller r) -> actually r_U decreases in q, so q_hi gives the smaller r: f_lo uses q_hi; f_hi uses q_lo
    a1, b1 = bisect_sign(lambda t: (chord(q_w(t, True)) - I(t)).a, lambda t: (chord(q_w(t, False)) - I(t)).b, mpf("1.0"), mpf("1.45"))
    Ts = (a1, b1); out["T_star"] = [s(a1), s(b1)]
    qT = I(mp.mpf(q_w(a1, False).a), mp.mpf(q_w(b1, True).b)); vT = I(mp.mpf(v_w(a1, False).a), mp.mpf(v_w(b1, True).b))
    out["q_at_Tstar"] = [s(qT.a), s(qT.b)]; out["qdot_at_Tstar"] = [s(vT.a), s(vT.b)]
    assert mp.mpf(qT.b) <= mp.mpf(qbox_w), "window box exceeded"
    # first reception is the unlike one: at T*, like chord and antipode chord exceed T*
    out["like_chord_at_Tstar_exceeds"] = bool(mp.mpf(r_mer(qT, I(0), -1).a) > b1); out["antipode_chord_at_Tstar_exceeds"] = bool(mp.mpf((2*iv.cos(qT/2)).a) > b1)
    # post-window box and B bounds (all classes moving; antipode hull of fixed and moving)
    bq = I(s(qT.a), qbox_p); bqp = I("0", qpbox); bvp = I("0", vpbox)
    hU, DU, rU = hit_mer(bq, bqp, bvp, 1); hL, DL, rL = hit_mer(bq, bqp, bvp, -1); hAm, DA, rA = hit_anti(bq, I("0", qpbox), bvp); hAf = iv.sin(bq)/(8*iv.cos(bq/2)**3)
    hA = I(min(mp.mpf(hAf.a), mp.mpf(hAm.a)), max(mp.mpf(hAf.b), mp.mpf(hAm.b)))
    Bb = 2*hU + 2*hL + hA; Blo, Bhi = mp.mpf(Bb.a), mp.mpf(Bb.b); out["post_box"] = {"q": [s(bq.a), s(bq.b)], "qp": [s(bqp.a), s(bqp.b)], "vp": [s(bvp.a), s(bvp.b)], "B": [s(Blo), s(Bhi)], "DU_lo": s(DU.a), "DL_hi": s(DL.b), "DA_hi": s(DA.b)}
    assert Blo > 0 and mp.mpf(DU.a) > 0
    T0lo, T0hi = Ts
    def q_p(t, hi): return (qT.b + vT.b*(I(t) - T0lo) + g*Bhi*(I(t) - T0lo)**2/2) if hi else (qT.a + vT.a*(I(t) - T0hi) + g*Blo*(I(t) - T0hi)**2/2)   # v3: interval endpoints kept in the iv context (mp.mpf + interval raised)
    def v_p(t, hi): return (vT.b + g*Bhi*(I(t) - T0lo)) if hi else (vT.a + g*Blo*(I(t) - T0hi))
    # like reading: t = r_L(q(t), 0), r_L increasing in q: before-proof with q_lo (smaller r)? f(t) = r_L(q(t)) - t: before the root f > 0; smaller q gives smaller r -> f_lo uses q_lo; after: f < 0 with q_hi
    la, lb = bisect_sign(lambda t: (r_mer(q_p(t, False), I(0), -1) - I(t)).a, lambda t: (r_mer(q_p(t, True), I(0), -1) - I(t)).b, b1, mpf("1.9"))
    out["t_like"] = [s(la), s(lb)]
    # antipodal reception: 2cos(q/2) - t, decreasing in q: before-proof with q_hi; after with q_lo
    aa, ab = bisect_sign(lambda t: (2*iv.cos(q_p(t, True)/2) - I(t)).a, lambda t: (2*iv.cos(q_p(t, False)/2) - I(t)).b, b1, mpf("2.4"))
    out["t_anti"] = [s(aa), s(ab)]; out["q_at_anti"] = [s(q_p(aa, False).a), s(q_p(ab, True).b)]; out["qdot_at_anti"] = [s(v_p(aa, False).a), s(v_p(ab, True).b)]
    # support zero: A = 1/(rU DU) + 1/(2 rA DA) - 1/(rL DL) over the box (DA hull with 1 for the fixed antipode)
    DAh = I("1", s(DA.b)); rAh = I(min(mp.mpf(rA.a), mp.mpf((2*iv.cos(bq/2)).a)), max(mp.mpf(rA.b), mp.mpf((2*iv.cos(bq/2)).b)))
    A = 1/(rU*DU) + 1/(2*rAh*DAh) - 1/(rL*DL); Alo, Ahi = mp.mpf(A.a), mp.mpf(A.b); out["A_bounds"] = [s(Alo), s(Ahi)]; assert Alo > 0
    # lambda_hat positive proved while -v_hi^2 + g A_lo > 0; negative proved when -v_lo^2 + g A_hi < 0 (post-window envelopes; on the window use the window envelopes)
    def lam_lo(t): return (-(v_p(t, True))**2 + g*Alo).a if t >= b1 else (-(v_w(t, True))**2 + g*Alo).a
    def lam_hi(t): return (-(v_p(t, False))**2 + g*Ahi).b if t >= b1 else (-(v_w(t, False))**2 + g*Ahi).b
    za, zb = bisect_sign(lambda t: lam_lo(t), lambda t: lam_hi(t), mpf("0.5"), mpf("3.0"))
    out["lambda_zero_bracket"] = [s(za), s(zb)]
    # a-posteriori box checks at the latest bracket end: receiver q, and the delayed state from the window envelope at s <= t - 1.2 (every chord >= 1.2 on the box)
    tmax = max(zb, ab, lb); out["box_checks"] = {"q_receiver_max": s(q_p(tmax, True).b), "q_delayed_max": s(q_w(tmax - mpf("1.2"), True).b), "v_delayed_max": s(v_w(tmax - mpf("1.2"), True).b), "min_chord_on_box": s(min(mp.mpf(rU.a), mp.mpf(rL.a), mp.mpf(rA.a)))}
    out["box_ok"] = bool(mp.mpf(q_p(tmax, True).b) <= mp.mpf(qbox_p) and mp.mpf(q_w(tmax - mpf("1.2"), True).b) <= mp.mpf(qpbox) and mp.mpf(v_w(tmax - mpf("1.2"), True).b) <= mp.mpf(vpbox) and min(mp.mpf(rU.a), mp.mpf(rL.a), mp.mpf(rA.a)) >= mpf("1.2"))
    # ordering verdict from the envelopes
    out["ordering_envelope"] = "zero before reception" if zb < aa else ("reception before zero" if ab < za else "undecided (envelopes overlap)")
    return out
res = {"controls": {}, "cells": {}}
c10 = cell("0.1"); res["controls"]["g_0.1_known"] = c10
def inside(br, lo_, hi_): return bool(mp.mpf(br[0]) <= mpf(lo_) and mpf(hi_) <= mp.mpf(br[1]))
k1 = inside(c10["T_star"], "1.366684593623649597167969", "1.366684709182828044891357"); k2 = inside(c10["t_anti"], "1.990093453492709194426425", "1.990094426913756650197319")
k3 = inside(c10["lambda_zero_bracket"], "1.945684593623649597167969", "1.946684709182828044891357"); k4 = inside(c10["t_like"], "1.4670405072", "1.4677497282")
cw = cell("0.1", wrong=True); w = bool(mp.mpf(cw["T_star"][0]) > mpf("1.366684709182828044891357") or mp.mpf(cw["T_star"][1]) < mpf("1.366684593623649597167969"))
res["controls"]["pass"] = {"K1_Tstar": k1, "K2_reception": k2, "K3_zero": k3, "K4_like": k4, "W_wrong_chord_Tstar_disjoint": w, "wrong_Tstar": cw["T_star"]}
print("controls", res["controls"]["pass"], flush=True); print("g=1/10 T*", c10["T_star"], "like", c10["t_like"], "anti", c10["t_anti"], "zero", c10["lambda_zero_bracket"], c10["ordering_envelope"], flush=True)
assert k1 and k2 and k3 and k4 and w, "control failure"
for gs in ("0.125", "0.08333333333333333333333333333333"):
    c = cell(gs); res["cells"][gs] = c
    print("g=%s T* %s like %s anti %s zero %s q(T*) %s B %s -> %s" % (gs[:6], [x[:12] for x in c["T_star"]], [x[:10] for x in c["t_like"]], [x[:10] for x in c["t_anti"]], [x[:10] for x in c["lambda_zero_bracket"]], [x[:8] for x in c["q_at_Tstar"]], [x[:6] for x in c["post_box"]["B"]], c["ordering_envelope"]), flush=True)
p = sys.argv[1]; assert not os.path.exists(p); json.dump(res, open(p, "w"), indent=1); print("saved", p)
