# Late-feedback review (ramon-e-moore lens), Phase A instrument, 2026-10-11 ~19:17 UTC, written BEFORE any exposure to new-campaign files of other roles.
# A-priori brackets, from the accepted endpoint (b3 step 21 exact strings) and crude rigorous acceleration bounds on a box, of the times at which each
# delayed argument s_c(t) = t - tau_c(t) reaches the window end T* (the next source-history boundary). At the crossing the source coordinate is
# q* = q(T*), contained in the wave-16 step-1 candidate set S_1 (the step starts at T*), so the crossing solves t - T* = r_c(q(t), q*).
# Envelope: q(t) in [q0 + qdot0 D + g B_lo D^2/2, q0 + qdot0 D + g B_hi D^2/2], qdot in [qdot0 + g B_lo D, qdot0 + g B_hi D], B = bounds of the
# unit bracket (five hits) over the box; the three delayed classes' states on the box; antipode q' <= q. Controls first: (K) the window-end identity
# r_U(q*, 0) contains T* (wave-15 definition of T*, an independent known case); (W) a wrong chord (the like chord used for the unlike class) gives a
# crossing outside the correct bracket. mpmath iv, 30 digits (directed-rounding premise).
import os, sys, json
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv
mp.dps = 30; iv.dps = 30
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2)
Tstar = I("1.366684593623649597167969", "1.366684709182828044891357")
qstar = I("0.0935969659738805924504719", "0.09497531240358474050374513")   # wave-16 step-1 S (contains q(T*))
vstar = I("0.1373057801796165107074406", "0.138321790907505577966415")     # wave-16 step-1 VS (contains qdot(T*))
t0 = I("2.076684593623649597167969", "2.076684709182828044891357")   # resume convention: the end-time interval (step-21 t_int lower + 0.01, t_int upper); v2: literal strings
q0 = I("0.2169889763507186775076704", "0.2169987970109094562817074"); v0 = I("0.210722148448371948628582", "0.2107493474124994851533159")
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q + qp) + sg*iv.sin(q)*iv.sin(qp))
def Mf(q, qp): return iv.cos(q + qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def Nf(q, qp): return iv.cos(q + qp)/S2 - iv.cos(q)*iv.sin(qp)/2
def hit_mer(q, qp, vp, sg):
    r = r_mer(q, qp, sg); D = 1 - sg*vp*Mf(q, qp)/r; return Nf(q, qp)/(r**3*D), D, r
def hit_anti(q, qp, vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2); return iv.sin(d)/(r**3*D), D, r
out = {"controls": {}, "targets": {}}
# (K) window-end identity
rK = r_mer(qstar, I(0), 1); okK = bool(rK.a <= Tstar.b and Tstar.a <= rK.b)
out["controls"]["K_window_end_identity"] = {"r_U(q*,0)": [str(rK.a), str(rK.b)], "T*": [str(Tstar.a), str(Tstar.b)], "intersects": okK}
# box and acceleration bounds
box_q = I("0.21", "0.50"); box_qp = I("0", "0.15"); box_vp = I("0", "0.20")
hU, DU, rU = hit_mer(box_q, box_qp, box_vp, 1); hL, DL, rL = hit_mer(box_q, box_qp, box_vp, -1); hA, DA, rA = hit_anti(box_q, I("0", "0.10"), box_vp)
rhs = 2*hU + 2*hL + hA; B_lo, B_hi = rhs.a, rhs.b
out["targets"]["box"] = {"q": [str(box_q.a), str(box_q.b)], "qp": [str(box_qp.a), str(box_qp.b)], "vp": [str(box_vp.a), str(box_vp.b)], "hit_U": [str(hU.a), str(hU.b)], "hit_L": [str(hL.a), str(hL.b)], "hit_A": [str(hA.a), str(hA.b)],
                        "D_U": [str(DU.a), str(DU.b)], "D_L": [str(DL.a), str(DL.b)], "D_A": [str(DA.a), str(DA.b)], "B_unit_bracket": [str(B_lo), str(B_hi)]}
print("B over box", mp.nstr(B_lo, 8), mp.nstr(B_hi, 8), "D_U", mp.nstr(DU.a, 6), "D_L", mp.nstr(DL.b, 6), flush=True)
assert B_lo > 0 and DU.a > 0
def q_env(Dl, hi): return q0.b + v0.b*I(Dl) + g*B_hi*I(Dl)**2/2 if hi else q0.a + v0.a*I(Dl) + g*B_lo*I(Dl)**2/2
def v_env(Dl, hi): return v0.b + g*B_hi*I(Dl) if hi else v0.a + g*B_lo*I(Dl)
def crossing(sg, label, wrong=False):
    # f(Dl) = T* + r(q(t0+Dl), q*) - (t0 + Dl); true crossing where f = 0; f strictly decreasing in Dl (|dr/dq| qdot < 1 sub-wake)
    def r_of(q): return r_mer(q, qstar, (-sg) if wrong else sg)
    res = {}
    for name, hiq in (("q_hi_envelope", True), ("q_lo_envelope", False)):
        def f_lo(Dl): return (Tstar + r_of(q_env(Dl, hiq)) - (t0 + I(Dl))).a   # proved positive -> before crossing
        def f_hi(Dl): return (Tstar + r_of(q_env(Dl, hiq)) - (t0 + I(Dl))).b   # proved negative -> after crossing
        a = mpf(0); b = mpf("1.2"); assert f_lo(a) > 0 and f_hi(b) < 0, (label, name)
        a1, b1 = a, b
        for _ in range(70):
            m = (a1 + b1)/2
            if f_lo(m) > 0: a1 = m
            else: b1 = m
        a2, b2 = a, b
        for _ in range(70):
            m = (a2 + b2)/2
            if f_hi(m) < 0: b2 = m
            else: a2 = m
        res[name] = {"Delta_lo": str(a1), "Delta_hi": str(b2)}
    Dlo = min(mpf(res[k]["Delta_lo"]) for k in res); Dhi = max(mpf(res[k]["Delta_hi"]) for k in res)
    t_lo = (t0.a + I(Dlo)).a; t_hi = (t0.b + I(Dhi)).b
    qc = iv.mpf([q_env(Dlo, False).a, q_env(Dhi, True).b]); vc = iv.mpf([v_env(Dlo, False).a, v_env(Dhi, True).b])   # v3: endpoints passed as mpf
    box_ok = bool(qc.b <= box_q.b and vc.b <= I("0.5").b)
    return {"class": label, "per_envelope": res, "Delta": [str(Dlo), str(Dhi)], "t_cross": [str(t_lo), str(t_hi)], "q_at_cross": [str(qc.a), str(qc.b)], "qdot_at_cross": [str(vc.a), str(vc.b)], "box_assumption_q_ok": box_ok}
cU = crossing(1, "unlike (E2,E3) reaches T*"); cL = crossing(-1, "like (P2,P3) reaches T*")
out["targets"]["unlike_crossing"] = cU; out["targets"]["like_crossing"] = cL
print("unlike crossing t in", cU["t_cross"][0][:14], cU["t_cross"][1][:14], "q", cU["q_at_cross"][0][:8], cU["q_at_cross"][1][:8], "box ok", cU["box_assumption_q_ok"], flush=True)
print("like crossing t in", cL["t_cross"][0][:14], cL["t_cross"][1][:14], "q", cL["q_at_cross"][0][:8], cL["q_at_cross"][1][:8], "box ok", cL["box_assumption_q_ok"], flush=True)
# (W) wrong chord for the unlike class (the like chord): crossing must lie outside the correct unlike bracket
cW = crossing(1, "WRONG chord (like chord used for the unlike class)", wrong=True)
def num(x): return mp.mpf(x.strip("[]").split(",")[0])   # v4: the iv context prints an endpoint as "[v, v]"; parse it
okW = bool(num(cW["t_cross"][0]) > num(cU["t_cross"][1]) or num(cW["t_cross"][1]) < num(cU["t_cross"][0]))
out["controls"]["W_wrong_chord"] = {"t_cross_wrong": cW["t_cross"], "disjoint_from_correct": okW}
print("controls K", okK, "W", okW, flush=True)
# antipode: delayed argument at t0 about 0.088; it reaches T* only when t - tau_A = T*, tau_A ~ 1.99: t ~ 3.36, outside the box premise; report the lower bound only
out["targets"]["antipode_note"] = "s_A(t0) in [0.0782, 0.0884]; reaching T* needs t - tau_A = T* with tau_A = 2cos((q - q')/2) <= 2, so t >= T* + 2cos((q-q')/2); not bracketed here (outside the box premise); the antipode reads window history on the whole Stage A range"
# transmitter-factor and speed envelope on the unlike crossing bracket
out["targets"]["speed_envelope_at_unlike_cross"] = cU["qdot_at_cross"]
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
