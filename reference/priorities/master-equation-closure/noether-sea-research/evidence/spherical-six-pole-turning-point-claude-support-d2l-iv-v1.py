# Turning-point campaign, support role (emmy-noether): controlled ENCLOSURE of the second derivative of the signed support, l'' = d^2 l/dt^2, over whole steps.
# Method (derived): second-order Taylor jets (value, first, second time derivative) with interval components, propagated through this role's signed
# closed forms. Receiver jet q = (q, w, a), w = (w, a, j) with j = da/dt. Source time s(t) of class c: s' = (1 - r_q w)/D, D = 1 + r_q' w', and
# s'' = (-(r_q' w + r_q a) - s' D')/D with r_q', D' taken from first-order jets (here r_q' means d(r_q)/dt). Source jets q'(t) = (q', w' s', a' s'^2 + w' s''),
# w'(t) = (w', a' s', j' s'^2 + a' s''), with j' the source jerk. Then r_c, M (or the antipode half-angle sine), D_c and the radial term
# m_c g sigma_c/(2 r_c D_c) are evaluated on jets; a_r = sum; l = -w^2 - a_r, so l'' = -2 a^2 - 2 w j - a_r''. Over a step every input is replaced by its
# whole-step enclosure: receiver q, w, a, j from this role's slice7 record (S, VS, qddot_range, dqddot_dt_range), source q', w', a' from this role's
# sub-range lookup, and the source jerk j' from the hull of the stored rate bounds AP of the touched records (the stored-rate premise of those records).
# Each jet formula is an exact identity, so the result encloses l'' at every instant of the step.
# Controls BEFORE any target (exit on failure): (J1) EXACT HAND-KNOWN: antipode class alone, static source at q' = 0, q = pi/3, w = 2/5, a = j = 0:
# radial term -g/(4 cos(q/2)), its second derivative -g w^2 (1/4) sec(q/2)(tan^2(q/2) + sec^2(q/2))/4 = -g/(30 sqrt3); (J2) the jet's first derivative of l
# equals the frozen closed form dl/dt (contributions) at prescribed points; (J3, J4) NUMERICAL prescribed-history controls: l'' against Richardson second
# differences of l(t) on two smooth histories (a cubic with positive velocities at t = 4.8; the turning sine history at t = 6.6 with receiver w < 0 and
# unlike source w' < 0), all sources at their exact roots; negatives (each must miss the difference by more than 1e-8): (N1) source jerk omitted,
# (N2) receiver jerk sign flipped, (N3) s'' omitted, (N4) source acceleration omitted in the second-order source jets.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [slice7 record.json]
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDQ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTQ = sys.argv[1]; REC7 = sys.argv[2] if len(sys.argv) > 2 else None
_aq = sys.argv; sys.argv = [_aq[0], OUTQ + ".slice6-controls.json"]
exec(open(EVDQ + "spherical-six-pole-turning-point-claude-support-slice6-iv.py").read())
sys.argv = _aq; assert out6["controls_all_pass"] and len(SLABS) == 324
outQ = {"controls": []}; tQ = time.time()
class Jt:
    __slots__ = ("v", "d1", "d2")
    def __init__(s, v, d1, d2): s.v, s.d1, s.d2 = v, d1, d2
    def __add__(s, o): o = cj(o); return Jt(s.v + o.v, s.d1 + o.d1, s.d2 + o.d2)
    __radd__ = __add__
    def __neg__(s): return Jt(-s.v, -s.d1, -s.d2)
    def __sub__(s, o): return s + (-cj(o))
    def __rsub__(s, o): return cj(o) + (-s)
    def __mul__(s, o): o = cj(o); return Jt(s.v*o.v, s.d1*o.v + s.v*o.d1, s.d2*o.v + 2*s.d1*o.d1 + s.v*o.d2)
    __rmul__ = __mul__
    def inv(s): return Jt(1/s.v, -s.d1/(s.v*s.v), 2*s.d1*s.d1/(s.v*s.v*s.v) - s.d2/(s.v*s.v))
    def __truediv__(s, o): return s*cj(o).inv()
    def __rtruediv__(s, o): return cj(o)*s.inv()
def cj(x): return x if isinstance(x, Jt) else Jt(x, 0*x if not isinstance(x, (int,)) else 0, 0*x if not isinstance(x, (int,)) else 0)
def jsin(L, u): sv, cv = L.sin(u.v), L.cos(u.v); return Jt(sv, cv*u.d1, -sv*u.d1*u.d1 + cv*u.d2)
def jcos(L, u): sv, cv = L.sin(u.v), L.cos(u.v); return Jt(cv, -sv*u.d1, -cv*u.d1*u.d1 - sv*u.d2)
def jsqrt(L, u): r = L.sqrt(u.v); return Jt(r, u.d1/(2*r), u.d2/(2*r) - u.d1*u.d1/(4*r*u.v))
SIGR = {1: -1, -1: 1, 0: -1}; MULR = {1: 2, -1: 2, 0: 1}
def r_jet(L, c, Q, P):
    if c == 0: return 2*jcos(L, (Q - P)*L.mpf("0.5"))
    s2 = L.sqrt(2); return jsqrt(L, 2 - c*s2*jsin(L, Q + P) + c*jsin(L, Q)*jsin(L, P))
def rq_jets(L, c, Q, P):
    """first partials of r w.r.t. receiver and source coordinate, as jets."""
    if c == 0: h = jsin(L, (Q - P)*L.mpf("0.5")); return -h, h
    s2 = L.sqrt(2); r = r_jet(L, c, Q, P); Nn = jcos(L, Q + P)/s2 - jcos(L, Q)*jsin(L, P)/2; Mm = jcos(L, Q + P)/s2 - jsin(L, Q)*jcos(L, P)/2
    return -c*Nn/r, -c*Mm/r
def class_jets(L, c, q, w, a, qp, wp, ap, jp, with_sdd=True, with_ap=True, with_jp=True):
    Z = 0*q
    Q1 = Jt(q, w, Z); rq0, rqp0 = rq_jets(L, c, Jt(q, Z, Z), Jt(qp, Z, Z)); D0 = 1 + rqp0.v*wp; sd = (1 - rq0.v*w)/D0
    rq1, rqp1 = rq_jets(L, c, Q1, Jt(qp, wp*sd, Z)); Dd = rqp1.d1*wp + rqp0.v*ap*sd
    sdd = (-(rq1.d1*w + rq0.v*a) - sd*Dd)/D0 if with_sdd else Z
    apx = ap if with_ap else Z; jpx = jp if with_jp else Z
    Qj = Jt(q, w, a); Pj = Jt(qp, wp*sd, apx*sd*sd + wp*sdd); Wj = Jt(wp, apx*sd, jpx*sd*sd + apx*sdd)
    r = r_jet(L, c, Qj, Pj)
    if c == 0: Dj = 1 + Wj*jsin(L, (Qj - Pj)*L.mpf("0.5"))
    else:
        s2 = L.sqrt(2); Mm = jcos(L, Qj + Pj)/s2 - jsin(L, Qj)*jcos(L, Pj)/2; Dj = 1 - c*Wj*Mm/r
    rad = (MULR[c]*SIGR[c]*L.mpf(1)/10)/(2*r*Dj)
    return rad, {"sdot": sd, "sddot": sdd}
def l_jet(L, q, w, a, j, srcs, **kw):
    Wj = Jt(w, a, j); ar = None; info = {}
    for c in (1, -1, 0):
        rad, inf = class_jets(L, c, q, w, a, *srcs[c], **kw); ar = rad if ar is None else ar + rad; info[c] = (rad, inf)
    return -(Wj*Wj) - ar, ar, info
# ---- (J1) exact hand case: antipode alone, static source
mp.dps = 40; qh = mp.pi/3; wh = mp.mpf(2)/5; Z0 = mp.mpf(0)
radA, _ = class_jets(mp, 0, qh, wh, Z0, Z0, Z0, Z0, Z0)
handA = -mp.mpf(1)/(10*30*mp.sqrt(3))
outQ["controls"].append({"name": "(J1) EXACT HAND-KNOWN: antipode radial term with a static source at q' = 0, q = pi/3, w = 2/5, a = j = 0: value -g/(4 cos(q/2)) = -1/(20 sqrt3), first derivative -g w sin(q/2)/(8 cos^2(q/2)) = -1/300, second derivative -g/(30 sqrt3)",
    "value": mp.nstr(radA.v, 25), "d1": mp.nstr(radA.d1, 25), "d2": mp.nstr(radA.d2, 25), "hand_d2": mp.nstr(handA, 25), "pass": bool(abs(radA.v + 1/(20*mp.sqrt(3))) < mp.mpf("1e-35") and abs(radA.d1 + mp.mpf(1)/300) < mp.mpf("1e-35") and abs(radA.d2 - handA) < mp.mpf("1e-35"))})
# ---- prescribed smooth histories with exact derivatives up to the jerk
def H_cubic(s): return (mp.mpf("0.3")*s - mp.mpf("0.01")*s**2 + mp.mpf("0.0005")*s**3, mp.mpf("0.3") - mp.mpf("0.02")*s + mp.mpf("0.0015")*s**2, -mp.mpf("0.02") + mp.mpf("0.003")*s, mp.mpf("0.003"))
def H_sine(s): x = mp.mpf("0.5")*(s - 2); return (1 + mp.mpf("0.3")*mp.sin(x), mp.mpf("0.15")*mp.cos(x), -mp.mpf("0.075")*mp.sin(x), -mp.mpf("0.0375")*mp.cos(x))
def root_src(H, t, c):
    a_, b_ = mp.mpf("0.3"), mp.mpf("2.6"); qt = H(t)[0]
    for _ in range(200):
        m = (a_ + b_)/2
        if m - kern(qt, H(t - m)[0], 0, c, mp)["r"] < 0: a_ = m
        else: b_ = m
    return t - (a_ + b_)/2
def srcs_at(H, t, **mod):
    out_ = {}
    for c in (1, -1, 0):
        s = root_src(H, t, c); q_, w_, a_, j_ = H(s); out_[c] = (q_, w_, a_, j_)
    return out_
def l_point(H, t):
    q_, w_, a_, _ = H(t); st = {c: v[:3] for c, v in srcs_at(H, t).items()}; cf = contributions(q_, w_, a_, st, 1, mp); return cf["lambda_hat"], cf["dlambda_dt"]
def d2_rich(f, t, h=mp.mpf("1e-6")):
    D = lambda hh: (f(t + hh) - 2*f(t) + f(t - hh))/(hh*hh); return (4*D(h/2) - D(h))/3
okJ2 = True; rowsJ = {}
for nm, H, tK in (("cubic", H_cubic, mp.mpf("4.8")), ("sine_turning", H_sine, mp.mpf("6.6"))):
    q_, w_, a_, j_ = H(tK); sr = srcs_at(H, tK); lj, arj, inf = l_jet(mp, q_, w_, a_, j_, sr); l0, dl0 = l_point(H, tK); fd2 = d2_rich(lambda x: l_point(H, x)[0], tK)
    e_v = abs(lj.v - l0); e_1 = abs(lj.d1 - dl0); e_2 = abs(lj.d2 - fd2); okJ2 = okJ2 and e_v < mp.mpf("1e-30") and e_1 < mp.mpf("1e-30")
    negs = {}
    for lab, kw in (("N1_source_jerk_omitted", {"with_jp": False}), ("N3_sddot_omitted", {"with_sdd": False}), ("N4_source_accel_omitted_in_jets", {"with_ap": False})):
        lw, _, _ = l_jet(mp, q_, w_, a_, j_, sr, **kw); negs[lab] = mp.nstr(abs(lw.d2 - fd2), 5)
    lw, _, _ = l_jet(mp, q_, w_, a_, -j_, sr); negs["N2_receiver_jerk_sign_flipped"] = mp.nstr(abs(lw.d2 - fd2), 5)
    rowsJ[nm] = {"t": mp.nstr(tK, 4), "q": mp.nstr(q_, 8), "w": mp.nstr(w_, 8), "src_w": {NAME[c]: mp.nstr(sr[c][1], 6) for c in sr}, "l": mp.nstr(l0, 15), "dl_jet": mp.nstr(lj.d1, 20), "dl_closed": mp.nstr(dl0, 20), "d2l_jet": mp.nstr(lj.d2, 20), "d2l_richardson": mp.nstr(fd2, 20), "abs_err_d2": mp.nstr(e_2, 5), "negatives_abs_miss": negs,
                 "pass": bool(e_2 < mp.mpf("1e-15") and all(mp.mpf(v) > mp.mpf("1e-8") for v in negs.values()))}
outQ["controls"].append({"name": "(J2) the jet's first derivative of l equals the frozen closed-form dl/dt, and its value equals l, at the prescribed points below", "pass": bool(okJ2)})
outQ["controls"].append({"name": "(J3, J4) NUMERICAL prescribed-history controls: jet l'' against Richardson second differences of l(t) (cubic history at t = 4.8, positive velocities; turning sine history at t = 6.6, receiver w < 0, unlike source w' < 0); negatives N1-N4 must miss by more than 1e-8", "detail": rowsJ, "pass": bool(all(r["pass"] for r in rowsJ.values()) and mp.mpf(rowsJ["sine_turning"]["w"]) < 0 and mp.mpf(rowsJ["sine_turning"]["src_w"]["unlike"]) < 0)})
outQ["controls_all_pass"] = all(c["pass"] for c in outQ["controls"]); print(json.dumps(outQ["controls"]), flush=True); json.dump(outQ, open(OUTQ, "w"), indent=1)
if not outQ["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target: whole-step enclosure of l'' on the steps of this role's slice7 record
if REC7:
    mp.dps = 30; iv.dps = 30; d7 = json.load(open(REC7)); SL = {"%s#%d" % (s["src"], s["step"]): s for s in SLABS}; rowsT = []
    rows7 = [r for tg in d7["targets"] for r in tg["rows"] if "qddot_range" in r]
    for r in rows7:
        q_, w_, a_, j_ = iv_of(r["S"]), iv_of(r["VS"]), iv_of(r["qddot_range"]), iv_of(r["dqddot_dt_range"]); srcs = {}; miss = None
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            e = r["cls"][name]; tch = e["touched"]
            if any(t_ not in SL for t_ in tch): miss = "%s touches a record outside the 324-record chain: %s" % (name, tch); break
            jp = None
            for t_ in tch: jp = SL[t_]["AP"] if jp is None else hull(jp, SL[t_]["AP"])
            srcs[c] = (iv_of(e["q"]), iv_of(e["qdot"]), iv_of(e["qddot"]), jp)
        if miss: rowsT.append({"step": r["step"], "refused": miss}); continue
        lj, arj, inf = l_jet(iv, q_, w_, a_, j_, srcs)
        rowsT.append({"step": r["step"], "t_end": r["t_end"], "d2l_over_step": J(lj.d2), "sign": "pos" if lo(lj.d2) > 0 else ("neg" if up(lj.d2) < 0 else "und"), "dl_over_step_jet": J(lj.d1), "dl_over_step_closed": r["dlambda_dt_range"], "jet_dl_meets_closed": bool(meets(lj.d1, iv_of(r["dlambda_dt_range"]))), "a_r_dd": J(arj.d2), "minus_2a2_minus_2wj": J(-2*a_*a_ - 2*w_*j_)})
        print(r["step"], "d2l", rowsT[-1]["d2l_over_step"][0][:10], rowsT[-1]["d2l_over_step"][1][:10], rowsT[-1]["sign"], "| dl jet", rowsT[-1]["dl_over_step_jet"][0][:9], rowsT[-1]["dl_over_step_jet"][1][:9], flush=True)
    outQ["target_record"] = REC7; outQ["target"] = rowsT; outQ["signs"] = {r["step"]: r.get("sign", "refused") for r in rowsT}
outQ["wall_s"] = time.time() - tQ; json.dump(outQ, open(OUTQ, "w"), indent=1); print("signs", json.dumps(outQ.get("signs")), flush=True)
