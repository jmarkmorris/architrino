# Six-pole POST-TURN campaign (Claude continuation role, jack-k-hale lens, 2026-10-21): ddl-jet v2 = ddl-jet v1 (sha256 c0756833a6d8e3fe6fc3fedbea145fc456ba1ca725b53648db2995164c51f444, kept)
# with ONE change: the record chain CHAINJ is the cm49 rebuild R1-R6 (anchor 154 -> 570, signed serializer; every file checked by name and sha256 and required to carry
# "affine_format": "signed-v49") instead of r1-r5, P1-P3 (whose resumes used the unsigned serializer, post-turn adjudication 10). Nothing else changed.
# (v1 header follows.) ddl-jet v1, a correlated whole-step enclosure of l'' = -2 a^2 - 2 w a' - r''
# (l = -w^2 - r, r the canonical radial acceleration, a the tangent acceleration) on the certified reconstructed history (r1-r5, P1-P3), for Q2 (uniqueness of the second support turn).
# Design: analysis/spherical-six-pole-post-turn-claude-continuation-ddl-design.md (sha256 00d63f5495b66645b4821300d4964f571b0466c802ea2b496f0b28d3b325d17d).
# Method (derived): 14 primitives at one receiver time box: receiver q, w; per class (unlike, like, antipode) the delayed source q', v', a' (sub-range reader) and source jerk j' (the stored
# rate box ap of every record met: the stored-rate premise). Order-2 Taylor jets in time whose coefficients are interval values WITH interval gradients over the 14 primitives
# (forward-mode differentiation in interval arithmetic). From the fixed law: a = g sum m N/(r^2 P), P = r - k v' M (r D = P), receiver jet q + w th + (a/2) th^2, delay jets from the
# fixed point tau = r(q(t), q'(t - tau)) solved order by order, source jets composed with sigma = th - (tau - tau0), radial r = g sum m sigma_c/(2 P); l'' = -2 a0^2 - 2 w a1 - 2 r2.
# Enclosure: first-order mean-value form F(xhat) + sum_j G_j(X)(X_j - xhat_j), intersected with the natural extension (both proved); per-variable budget |G_j| wid(X_j) reported.
# Base: executes the frozen cm471 (sha256 05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c, checked) up to (not including) the v4.4 controls exit, in recon setting, so that
# every inherited control (v3c1, v4.4, B1-B4, B7, B8) runs and is recorded first; then this file's controls C1-C5; then (mode target) the band.
# Modes: controls | target <first_step> <last_step> <K>
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this> <out.json> <mode> [args]
import sys, os, hashlib
print("pid " + str(os.getpid()), flush=True)
EVJ = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
CM471J = EVJ + "spherical-six-pole-path-continuation-claude-continuation-steps10-cm471.py"; CM471J_SHA = "05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c"
OUTJ = sys.argv[1]; MODEJ = sys.argv[2]; XJ = sys.argv[3:]
_bJ = open(CM471J, "rb").read(); assert hashlib.sha256(_bJ).hexdigest() == CM471J_SHA, "frozen cm471 hash mismatch"
_tJ = _bJ.decode(); _LASTJ = 'exec(compile(_t10_46, S10_46 + " [v4.6 insertions]", "exec"))'; assert _tJ.count(_LASTJ) == 1
_CUTJ = 'if RUNMODE == "controls" or not out["controls_all_pass"]:'
_tJ = _tJ.replace(_LASTJ, '_t10_46 = _t10_46.rsplit(_CUTJ, 1)[0]; assert "# ================= modes =================" not in _t10_46\n' + _LASTJ, 1)
_ARGVJ = list(sys.argv); sys.argv = [sys.argv[0], "4000", "recon", OUTJ, "154", "0"]
exec(compile(_tJ, CM471J + " [ddl-jet: cut at the v4.4 controls exit]", "exec"))
sys.argv = _ARGVJ
import json, time
t_beginJ = time.time()
out["ddl_jet"] = {"version": "2", "mode": MODEJ, "args": XJ, "cm471_sha256": CM471J_SHA, "inherited_controls_all_pass": bool(V9_ALL_PASS and all(c_["pass"] for c_ in out["controls"]))}
print("inherited controls: " + ("ALL PASS" if out["ddl_jet"]["inherited_controls_all_pass"] else "FAIL") + " (" + str(len(out["controls"])) + ")", flush=True)
# ================= gradient numbers and jets =================
IVTJ = type(iv.mpf(1)); NVJ = 14
class GN:
    __slots__ = ("v", "d")
    def __init__(s, v, d=None): s.v = v; s.d = d
def gconst(x): return GN(x if isinstance(x, IVTJ) else iv.mpf(x))
def gvar(x, j):
    d = [ZERO]*NVJ; d[j] = ONE; return GN(x, d)
def _dc(a, b, sg):
    if a is None and b is None: return None
    if a is None: return [y if sg > 0 else -y for y in b]
    if b is None: return list(a)
    return [x + y for x, y in zip(a, b)] if sg > 0 else [x - y for x, y in zip(a, b)]
def gadd(a, b): return GN(a.v + b.v, _dc(a.d, b.d, 1))
def gsub(a, b): return GN(a.v - b.v, _dc(a.d, b.d, -1))
def gneg(a): return GN(-a.v, None if a.d is None else [-x for x in a.d])
def gsc(a, s): return GN(a.v*s, None if a.d is None else [x*s for x in a.d])
def gmul(a, b):
    v = a.v*b.v
    if a.d is None and b.d is None: return GN(v)
    if a.d is None: return GN(v, [a.v*y for y in b.d])
    if b.d is None: return GN(v, [b.v*x for x in a.d])
    return GN(v, [b.v*x + a.v*y for x, y in zip(a.d, b.d)])
def gdiv(a, b):
    v = a.v/b.v
    if a.d is None and b.d is None: return GN(v)
    if b.d is None: return GN(v, [x/b.v for x in a.d])
    if a.d is None: return GN(v, [-(v*y)/b.v for y in b.d])
    return GN(v, [(x - v*y)/b.v for x, y in zip(a.d, b.d)])
def gsincos(a):
    s_ = iv.sin(a.v); c_ = iv.cos(a.v)
    if a.d is None: return GN(s_), GN(c_)
    return GN(s_, [c_*x for x in a.d]), GN(c_, [-s_*x for x in a.d])
def gsqrt(a):
    v = iv.sqrt(a.v); return GN(v, None if a.d is None else [x/(2*v) for x in a.d])
G0J = GN(ZERO)
def jc(g): return [g, G0J, G0J]
def jadd(a, b): return [gadd(x, y) for x, y in zip(a, b)]
def jsub(a, b): return [gsub(x, y) for x, y in zip(a, b)]
def jneg(a): return [gneg(x) for x in a]
def jsc(a, s): return [gsc(x, s) for x in a]
def jmul(a, b): return [gmul(a[0], b[0]), gadd(gmul(a[0], b[1]), gmul(a[1], b[0])), gadd(gadd(gmul(a[0], b[2]), gmul(a[1], b[1])), gmul(a[2], b[0]))]
def jdiv(a, b):
    c0 = gdiv(a[0], b[0]); c1 = gdiv(gsub(a[1], gmul(c0, b[1])), b[0]); c2 = gdiv(gsub(gsub(a[2], gmul(c0, b[2])), gmul(c1, b[1])), b[0]); return [c0, c1, c2]
HALFJ = iv.mpf(1)/2
def jsincos(u):
    s0, c0 = gsincos(u[0]); u11 = gmul(u[1], u[1])
    s1 = gmul(c0, u[1]); c1 = gneg(gmul(s0, u[1]))
    s2 = gsub(gmul(c0, u[2]), gsc(gmul(s0, u11), HALFJ)); c2 = gsub(gneg(gmul(s0, u[2])), gsc(gmul(c0, u11), HALFJ))
    return [s0, s1, s2], [c0, c1, c2]
def jsqrt(u):
    r0 = gsqrt(u[0]); two_r0 = gsc(r0, iv.mpf(2)); r1 = gdiv(u[1], two_r0); r2 = gdiv(gsub(u[2], gmul(r1, r1)), two_r0); return [r0, r1, r2]
def jcompose(f0, f1, f2, sig):
    """f(sigma) = f0 + f1 sigma + f2 sigma^2 for a jet sigma with sigma_0 = 0"""
    return [f0, gmul(f1, sig[1]), gadd(gmul(f1, sig[2]), gmul(f2, gmul(sig[1], sig[1])))]
S2J = iv.sqrt(iv.mpf(2))
def geomj(qj, pj, c, kflip=1):
    """class geometry (frozen steps3 geom, written in jets): r^2, N, M, k"""
    if c == 0:
        sd, cd = jsincos(jsub(qj, pj)); return jadd(jc(gconst(2)), jsc(cd, iv.mpf(2))), sd, jneg(sd), 1*kflip
    sg = iv.mpf(c); spq, cpq = jsincos(jadd(qj, pj)); sq, cq = jsincos(qj); sp, cp = jsincos(pj)
    r2 = jadd(jsub(jc(gconst(2)), jsc(spq, sg*S2J)), jsc(jmul(sq, sp), sg))
    N = jsub(jsc(cpq, 1/S2J), jsc(jmul(cq, sp), HALFJ)); M = jsub(jsc(cpq, 1/S2J), jsc(jmul(sq, cp), HALFJ))
    return r2, N, M, c*kflip
CLS = (1, -1, 0); RESID46 = {}
def r2_qp(q, p, c):
    """d r^2 / d q' at order 0 (frozen steps3 geom r2_qp)"""
    if c == 0: return gsc(gsincos(gsub(q, p))[0], iv.mpf(2))
    sg = iv.mpf(c); spq, cpq = gsincos(gadd(q, p)); sq, _ = gsincos(q); _, cp = gsincos(p)
    return gadd(gsc(cpq, -sg*S2J), gsc(gmul(sq, cp), sg))
def law_jets(prim, a_path=None, kflip=1, drop_sddot=False, zero_jerk=False):
    """prim: {"q","w", ("p",c),("v",c),("a",c),("j",c)} -> GN. Returns jets of a and r, the delay jets, P0 per class, and l''."""
    q = prim["q"]; w = prim["w"]
    # order 0: tangent acceleration from the law (or the constructed path's own second derivative in control C1)
    a0 = None; P0 = {}
    for c in CLS:
        r2, N, M, k = geomj(jc(q), jc(prim[("p", c)]), c, kflip); r_ = gsqrt(r2[0]); P = gsub(r_, gsc(gmul(prim[("v", c)], M[0]), iv.mpf(k))); P0[c] = P
        h = gdiv(N[0], gmul(r2[0], P)); t_ = gsc(h, g*MULT[c]); a0 = t_ if a0 is None else gadd(a0, t_)
    qa = a_path if a_path is not None else a0
    qj = [q, w, gsc(qa, HALFJ)]
    aj = None; rj_ = None; taus = {}
    for c in CLS:
        p0 = prim[("p", c)]; v0 = prim[("v", c)]; ac = prim[("a", c)]; jk = gconst(0) if zero_jerk else prim[("j", c)]
        r2_0, _, _, _ = geomj(jc(q), jc(p0), c, kflip); t0_ = gsqrt(r2_0[0])
        # tau_k (k = 1, 2) solves a LINEAR equation tau_k = T_k(guess) - B (tau_k - guess), B = r_q' v' (derived: the order-k coefficient of sqrt(r^2) depends on sigma_k = -tau_k
        # only through r_q' v' sigma_k); so tau_k = (T_k + B guess)/(1 + B), exact, with guess 0
        B = gmul(gdiv(r2_qp(q, p0, c), gsc(t0_, iv.mpf(2))), v0); onepB = gadd(gconst(1), B)
        def _pass(t1, t2):
            sig = [G0J, gsub(gconst(1), t1), (G0J if drop_sddot else gneg(t2))]
            pj = jcompose(p0, v0, gsc(ac, HALFJ), sig); vj = jcompose(v0, ac, gsc(jk, HALFJ), sig)
            r2, N, M, k = geomj(qj, pj, c, kflip); return jsqrt(r2), pj, vj, r2, N, M, k
        T, _, _, _, _, _, _ = _pass(G0J, G0J); t1_ = gdiv(T[1], onepB)
        T, _, _, _, _, _, _ = _pass(t1_, G0J); t2_ = T[2] if drop_sddot else gdiv(T[2], onepB)
        tau_new, pj, vj, r2, N, M, k = _pass(t1_, t2_); tau = [t0_, t1_, t2_]
        resid = max(abs(lo(gsub(tau_new[1], t1_).v)), abs(up(gsub(tau_new[1], t1_).v)), abs(lo(gsub(tau_new[2], t2_).v)), abs(up(gsub(tau_new[2], t2_).v)))
        RESID46[c] = resid
        P = jsub(tau, jsc(jmul(vj, M), iv.mpf(k)))
        hit = jdiv(N, jmul(r2, P)); rad = jdiv(jc(gconst(SIG_HIT[c])), jsc(P, iv.mpf(2)))
        aj = jsc(hit, g*MULT[c]) if aj is None else jadd(aj, jsc(hit, g*MULT[c])); rr = jsc(rad, g*MULT[c]); rj_ = rr if rj_ is None else jadd(rj_, rr)
        taus[c] = tau
    ldd = gsub(gsub(gsc(gmul(aj[0], aj[0]), iv.mpf(-2)), gsc(gmul(w, aj[1]), iv.mpf(2))), gsc(rj_[2], iv.mpf(2)))
    return {"a": aj, "r": rj_, "tau": taus, "P0": P0, "ldd": ldd, "a0": a0}
VARNAMES = ["q", "w"] + [nm + "_" + NAME[c] for c in CLS for nm in ("p", "v", "a", "j")]
def _prim_keys():
    ks = ["q", "w"]
    for c in CLS: ks += [("p", c), ("v", c), ("a", c), ("j", c)]
    return ks
PKEYS = _prim_keys()
def midpt(x): a_ = mp.mpf(lo(x)); b_ = mp.mpf(up(x)); return iv.mpf(a_ + (b_ - a_)/2)
def outputs(R):
    return {"ldd": R["ldd"], "a0": R["a"][0], "a1": R["a"][1], "r0": R["r"][0], "r1": R["r"][1], "r2x2": gsc(R["r"][2], iv.mpf(2)),
            "tau1_like": R["tau"][-1][1], "tau2x2_like": gsc(R["tau"][-1][2], iv.mpf(2))}
def mv_eval(boxes, **opts):
    """boxes: list of 14 intervals in PKEYS order. Returns per output: mean-value, natural, final (intersection) enclosures; gradient budget for l''."""
    ctr = [midpt(b) for b in boxes]
    Rc = law_jets({k_: GN(x) for k_, x in zip(PKEYS, ctr)}, **opts); Oc = outputs(Rc)
    Rb = law_jets({k_: gvar(x, j) for j, (k_, x) in enumerate(zip(PKEYS, boxes))}, **opts); Ob = outputs(Rb)
    res = {}
    for key in Oc:
        nat = Ob[key].v; mv = Oc[key].v
        if Ob[key].d is not None:
            for j in range(NVJ): mv = mv + Ob[key].d[j]*(boxes[j] - ctr[j])
        lo_ = max(lo(mv), lo(nat)); up_ = min(up(mv), up(nat))
        if lo_ > up_: raise ValueError("empty intersection of mean-value and natural enclosures for " + key)
        res[key] = {"final": I(lo_, up_), "mv": mv, "nat": nat}
    bud = {}
    if Ob["ldd"].d is not None:
        for j in range(NVJ): gj = Ob["ldd"].d[j]; bud[VARNAMES[j]] = max(abs(lo(gj)), abs(up(gj)))*wid(boxes[j])
    res["_budget"] = bud; res["_P0_min"] = min(lo(Rb["P0"][c].v) for c in CLS)
    return res
def ser2(x): return [mp.nstr(lo(x), 12), mp.nstr(up(x), 12)]
# ================= controls C1-C5 =================
okJ = {}
# ---- (C1) KNOWN: a constructed cubic history p(t), the SAME path for receiver and sources (one trajectory); independent reference: findroot on the direct-vector chord, direct-vector
# hits (frozen (0b) embedding), mp.diff at 40 digits. The receiver jet uses the path's own second derivative (a_path), so the reference is the same objects along p.
PJ = [mp.mpf("1.80"), mp.mpf("0.05"), mp.mpf("-0.38"), mp.mpf("-0.30")]     # p, p', p'', p''' at t = 0
def pth(t, n=0):
    t = mp.mpf(t)
    if n == 0: return PJ[0] + PJ[1]*t + PJ[2]*t*t/2 + PJ[3]*t**3/6
    if n == 1: return PJ[1] + PJ[2]*t + PJ[3]*t*t/2
    if n == 2: return PJ[2] + PJ[3]*t
    return PJ[3]
def _X1(q): return [mp.cos(q), -mp.sin(q)/mp.sqrt(2), -mp.sin(q)/mp.sqrt(2)]
def _T1(q): return [-mp.sin(q), -mp.cos(q)/mp.sqrt(2), -mp.cos(q)/mp.sqrt(2)]
def _X2(q): return [-mp.sin(q)/mp.sqrt(2), mp.cos(q), -mp.sin(q)/mp.sqrt(2)]
def _T2(q): return [-mp.cos(q)/mp.sqrt(2), -mp.sin(q), -mp.cos(q)/mp.sqrt(2)]
def _src(c, qp, vp):
    if c == 1: return [-x for x in _X2(qp)], [-vp*x for x in _T2(qp)]
    if c == -1: return _X2(qp), [vp*x for x in _T2(qp)]
    return [-x for x in _X1(qp)], [-vp*x for x in _T1(qp)]
def _dist(c, q, qp):
    Z, _ = _src(c, qp, 0); X = _X1(q); return mp.sqrt(sum((X[i] - Z[i])**2 for i in range(3)))
def tau_ref(c, t):
    f = lambda tau: tau - _dist(c, pth(t), pth(t - tau))
    return mp.findroot(f, (mp.mpf("0.05"), mp.mpf("2.05")), solver="illinois")
def hits_ref(c, t):
    tau = tau_ref(c, t); s = t - tau; Z, V = _src(c, pth(s), pth(s, 1)); X = _X1(pth(t)); T = _T1(pth(t))
    r = [X[i] - Z[i] for i in range(3)]; rn = mp.sqrt(sum(x*x for x in r)); rh = [x/rn for x in r]; Dt = 1 - sum(V[i]*rh[i] for i in range(3))
    A = [SIG_HIT[c]*x/(rn*rn*Dt) for x in rh]; return sum(T[i]*A[i] for i in range(3)), sum(X[i]*A[i] for i in range(3))
def a_ref(t): return sum(mp.mpf(1)/10*MULT[c]*hits_ref(c, t)[0] for c in CLS)
def r_ref(t): return sum(mp.mpf(1)/10*MULT[c]*hits_ref(c, t)[1] for c in CLS)
_dpsJ = mp.dps; mp.dps = 40
REF = {"tau1_like": mp.diff(lambda t: tau_ref(-1, t), 0, 1), "tau2x2_like": mp.diff(lambda t: tau_ref(-1, t), 0, 2), "a0": a_ref(0), "a1": mp.diff(a_ref, 0, 1),
       "r0": r_ref(0), "r1": mp.diff(r_ref, 0, 1), "r2x2": mp.diff(r_ref, 0, 2)}
REF["ldd"] = -2*REF["a0"]**2 - 2*PJ[1]*REF["a1"] - REF["r2x2"]
PRIM1 = {"q": pth(0), "w": pth(0, 1)}
for c in CLS:
    s_ = -tau_ref(c, 0); PRIM1[("p", c)] = pth(s_); PRIM1[("v", c)] = pth(s_, 1); PRIM1[("a", c)] = pth(s_, 2); PRIM1[("j", c)] = pth(s_, 3)
mp.dps = _dpsJ
BOX1 = [iv.mpf(PRIM1[k_]) for k_ in PKEYS]; APATH = iv.mpf(PJ[2])
def _cmp(res, tol):
    d_ = {}; ok_ = True
    for key, rv in REF.items():
        x = res[key]["final"]; inside = bool(lo(x) - tol <= rv <= up(x) + tol); ok_ = ok_ and inside; d_[key] = {"enclosure": ser2(x), "reference": mp.nstr(rv, 16), "inside_tol": inside}
    return ok_, d_
r1 = mv_eval(BOX1, a_path=GN(APATH)); ok1, d1 = _cmp(r1, mp.mpf("1e-12")); d1["delay_fixed_point_residual"] = {NAME[c]: mp.nstr(RESID46[c], 4) for c in CLS}
out["controls"].append({"name": "(C1) KNOWN constructed cubic history (one trajectory for receiver and sources): the jet enclosures of tau', tau'' (like), a, a', r, r', r'' and the assembled l'' contain the INDEPENDENT reference (findroot on the direct-vector chord, direct-vector hits, mp.diff at 40 digits) to 1e-12", "pass": ok1, "detail": d1})
okJ["C1"] = ok1
# ---- (C2) KNOWN correlated case: the same primitives on a box of half-width 1e-3 (all 14); the mean-value enclosure contains the jet's values at 9 points of the box and is narrower than the natural extension
HW = mp.mpf("1e-3"); BOX2 = [I(lo(b) - HW, up(b) + HW) for b in BOX1]
r2_ = mv_eval(BOX2, a_path=GN(APATH)); import random as _rnd; _rnd.seed(20261021); pts = []
pts.append([iv.mpf(lo(b)) for b in BOX2]); pts.append([iv.mpf(up(b)) for b in BOX2]); pts.append([midpt(b) for b in BOX2])
for _ in range(6): pts.append([iv.mpf(lo(b) + mp.mpf(_rnd.random())*(up(b) - lo(b))) for b in BOX2])
ok2 = True; d2 = {"mv_width": mp.nstr(wid(r2_["ldd"]["mv"]), 8), "natural_width": mp.nstr(wid(r2_["ldd"]["nat"]), 8), "final": ser2(r2_["ldd"]["final"]), "samples": []}
for pt_ in pts:
    v_ = law_jets({k_: GN(x) for k_, x in zip(PKEYS, pt_)}, a_path=GN(APATH))["ldd"].v; inside = bool(lo(r2_["ldd"]["mv"]) <= lo(v_) and up(v_) <= up(r2_["ldd"]["mv"])); ok2 = ok2 and inside; d2["samples"].append({"value": ser2(v_), "inside_mv": inside})
ok2 = ok2 and bool(wid(r2_["ldd"]["mv"]) < wid(r2_["ldd"]["nat"])); d2["gain_natural_over_mv"] = mp.nstr(wid(r2_["ldd"]["nat"])/wid(r2_["ldd"]["mv"]), 6)
out["controls"].append({"name": "(C2) KNOWN correlated case: on a box of half-width 1e-3 about the C1 primitives, the mean-value enclosure of l'' contains the jet values at 9 points (both corners, centre, 6 random) and is narrower than the natural interval extension (gain reported)", "pass": ok2, "detail": d2})
okJ["C2"] = ok2
# ---- (C3) NEGATIVES on C1: source jerk set to 0, class sign k flipped, the s'' = -tau'' term dropped: each must EXCLUDE the reference (r'' or l'')
d3 = {}; ok3 = True
for nm, opt, key in (("zero_jerk", {"zero_jerk": True}, "r2x2"), ("k_flipped", {"kflip": -1}, "r0"), ("s_ddot_dropped", {"drop_sddot": True}, "r2x2")):
    rr = mv_eval(BOX1, a_path=GN(APATH), **opt); x = rr[key]["final"]; excl = bool(REF[key] < lo(x) - mp.mpf("1e-9") or REF[key] > up(x) + mp.mpf("1e-9")); ok3 = ok3 and excl
    d3[nm] = {"output": key, "enclosure": ser2(x), "reference": mp.nstr(REF[key], 14), "excluded": excl}
out["controls"].append({"name": "(C3) NEGATIVES on the C1 history: with the source jerk set to 0 (r''), with the class sign k flipped (r), with the s'' = -tau'' term dropped (r''), each enclosure EXCLUDES the independent reference", "pass": ok3, "detail": d3})
okJ["C3"] = ok3
# ================= the record chain (r1-r5, P1-P3 by name and sha256) =================
CHAINJ = [("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json", "f81012daaaf76d660ec76fd731193a020c078d26e6487aa0e4ba2477874869ce"),
          ("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json", "93eb668c642752b3077102e03acad2b216d929c4a0a39158559b450fb9a263dd"),
          ("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json", "034afdb7660197afaf7c38bc7126ce3ecfe1ff5e03887b45970882a7f4029d79"),
          ("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json", "051f2252c883a7eca7c2c3d78189827acbf2a6a7a32c56055842bf36b1feb5c0"),
          ("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json", "acbafff3e4f45711f18ed66b13256c5ff14dfa793ec4b941f895d3eab234015f"),
          ("spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json", "c1454e398553ca639a2ed2412472602b2c3c3d7d8459942f3d599bc764c48c2e")]
def _load_chainJ():
    global RECORDS
    RECORDS = list(RECORDS_ALL[:ia + 1]); rebuild_index(); stepsJ = {}
    for n_, h_ in CHAINJ:
        b_ = open(EVJ + n_, "rb").read(); assert hashlib.sha256(b_).hexdigest() == h_, "record refused (sha256): " + n_
        dj_ = json.loads(b_); assert dj_.get("affine_format") == "signed-v49", "record refused (not a signed-v49 rebuild record): " + n_
        for st_ in dj_["steps"]:
            if st_.get("certified") is True: self_append10(st_, "reconstruction step " + str(st_["step"])); stepsJ["reconstruction step " + str(st_["step"])] = st_
    return stepsJ
t_l = time.time(); STEPSJ = _load_chainJ(); out["ddl_jet"]["chain"] = {"records": len(RECORDS), "last": RECORDS[-1]["label"], "load_s": round(time.time() - t_l, 1)}
print("chain loaded: " + str(len(RECORDS)) + " records, last " + RECORDS[-1]["label"] + "; %.1f s" % (time.time() - t_l), flush=True)
def jerk_box(s_int):
    """hull of the stored (padded) rate boxes ap of every certified record met by s_int; refuses on a first-reading (rate-jump) record or a record without its step data"""
    cs = cands(lo(s_int), up(s_int), RECORDS)
    if not cs or max(r_["th"] for r_ in cs) < up(s_int): raise ValueError("jerk read outside the records")
    h_ = None
    for r_ in cs:
        if r_.get("rate_jump_class"): raise ValueError("first-reading (rate-jump) record in a jerk read: " + r_["label"])
        x = r_.get("ap")     # the padded stored rate box set by the frozen enrich (steps7) for every appended record
        if x is None: raise ValueError("no stored rate box (ap) for record " + r_["label"])
        h_ = x if h_ is None else hull(h_, x)
    return h_
def primitives(Tsub, Qhint=None):
    """the 14 primitive boxes at receiver time box Tsub, read from the certified records; refuses (ValueError) on any failed read"""
    if up(Tsub) > guaranteed_end(): raise ValueError("receiver read past the guaranteed coverage end")
    hr = history(enc, Tsub)
    if hr is None: raise ValueError("receiver read failed")
    Q, W = hr[0], hr[1]; bx = [Q, W]; info = {}
    for c in CLS:
        tp = tau_point46(enc, Tsub, Q, c)
        if tp is None: raise ValueError("delay root refused for class " + NAME[c])
        s_int = Tsub - tp[0]; hs = history(enc, s_int)
        if hs is None: raise ValueError("source read failed for class " + NAME[c])
        jb = jerk_box(s_int); bx += [hs[0], hs[1], hs[2], jb]; info[NAME[c]] = {"tau": ser2(tp[0]), "s": ser2(s_int)}
        if not (abs(lo(hs[1])) < 1 and abs(up(hs[1])) < 1): raise ValueError("source speed not sub-wake")
    return bx, info
# ---- (C4) consistency with the frozen evaluations at the step-540 end (P2): a0 vs tangent_sum_end, r0 vs a_rad_end, r1 vs da_r_dt_end, a1 vs the frozen dhit_dt rate on the same boxes
st540 = STEPSJ["reconstruction step 540"]; Te = I(mp.mpf(st540["t_int"][0]) + DLT, mp.mpf(st540["t_int"][1])); Qe = Istr(st540["end_q_str"]); Ve = Istr(st540["end_v_str"])
bx4 = [Qe, Ve]; fr_rate = ZERO
for c in CLS:
    e = st540["end_classes"][NAME[c]]; hq = Istr(e["hist_q"]); hv = Istr(e["hist_qdot"]); ha = Istr(e["hist_qddot"]); bx4 += [hq, hv, ha, jerk_box(Istr(e["delayed_arg"]))]
    fr_rate = fr_rate + g*MULT[c]*dhit_dt(Qe, hq, hv, ha, Ve, c)[0]
r4 = mv_eval(bx4); d4 = {}
for key, ref_ in (("a0", Istr(st540["qddot_end"])), ("r0", Istr(st540["a_rad_end"])), ("r1", Istr(st540["da_r_dt_end"])), ("a1", fr_rate)):
    d4[key] = {"jet": ser2(r4[key]["final"]), "frozen": ser2(ref_), "intersect": inter(r4[key]["final"], ref_), "jet_width": mp.nstr(wid(r4[key]["final"]), 6), "frozen_width": mp.nstr(wid(ref_), 6)}
d4["ldd_at_540_end"] = {"final": ser2(r4["ldd"]["final"]), "mv_width": mp.nstr(wid(r4["ldd"]["mv"]), 6), "natural_width": mp.nstr(wid(r4["ldd"]["nat"]), 6), "budget": {k_: mp.nstr(v_, 4) for k_, v_ in sorted(r4["_budget"].items(), key=lambda kv: -kv[1])}}
ok4 = all(v_["intersect"] for k_, v_ in d4.items() if k_ in ("a0", "r0", "r1", "a1"))
out["controls"].append({"name": "(C4) consistency (shared reader, NOT independent): at the P2 step-540 end the jet's a, r, r' and a' intersect the frozen tangent sum, radial sum, da_r/dt and the frozen dhit_dt rate on the same boxes; l'' there and its width budget reported", "pass": ok4, "detail": d4})
okJ["C4"] = ok4
# ---- (C5) refusals: a jerk read over a first-reading record; a receiver read past the guaranteed coverage end
d5 = {}; rj = [r_ for r_ in RECORDS if r_.get("rate_jump_class")]
d5["rate_jump_records_in_reader"] = [r_["label"] for r_ in rj]
d5["seam_read_refused"] = refused(lambda: jerk_box(I(rj[0]["tl"], rj[0]["th"])))[0] if rj else False
d5["past_coverage_refused"] = refused(lambda: primitives(I(guaranteed_end() - mp.mpf("1e-3"), guaranteed_end() + mp.mpf("1e-9"))))[0]
d5["known_ordinary_read_accepted"] = not refused(lambda: jerk_box(I(lo(Te) - mp.mpf("0.5"), lo(Te) - mp.mpf("0.49"))))[0]
ok5 = bool(d5["seam_read_refused"] and d5["past_coverage_refused"] and d5["known_ordinary_read_accepted"])
out["controls"].append({"name": "(C5) refusals: a jerk read over a first-reading (rate-jump) record refuses; a receiver read 1e-9 past the guaranteed coverage end refuses; an ordinary read is accepted", "pass": ok5, "detail": d5})
okJ["C5"] = ok5
out["controls_all_pass"] = bool(out["ddl_jet"]["inherited_controls_all_pass"] and all(okJ.values()))
print("ddl-jet controls: " + ", ".join(k_ + (" pass" if v_ else " FAIL") for k_, v_ in okJ.items()) + "; all " + str(out["controls_all_pass"]) + "; %.1f s" % (time.time() - t_beginJ), flush=True)
print("  C4 l'' at 540 end: " + str(d4["ldd_at_540_end"]["final"]) + " mv width " + d4["ldd_at_540_end"]["mv_width"] + " natural " + d4["ldd_at_540_end"]["natural_width"], flush=True)
out["partial"] = False
if MODEJ == "controls" or not out["controls_all_pass"]:
    save(); sys.exit(0 if out["controls_all_pass"] else 2)
# ================= target: steps first..last, K time sub-intervals each =================
FIRST, LAST, KJ = int(XJ[0]), int(XJ[1]), int(XJ[2]); out["band"] = []; out["partial"] = True
for k in range(FIRST, LAST + 1):
    ta = time.time(); st_ = STEPSJ["reconstruction step " + str(k)]; tl = mp.mpf(st_["t_int"][0]); th = mp.mpf(st_["t_int"][1]); row = {"step": k, "t_int": st_["t_int"], "K": KJ, "subs": []}
    if st_.get("derivative_seam_inside_step"): row["refusal"] = "derivative seam inside step"; out["band"].append(row); save(); continue
    hullv = None; allneg = True
    for i in range(KJ):
        Ts = I(tl + DLT*i/KJ, th - DLT*(KJ - 1 - i)/KJ)
        try:
            bx, info = primitives(Ts); res = mv_eval(bx)
        except ValueError as e_:
            row["subs"].append({"i": i, "refusal": str(e_)}); allneg = False; hullv = None; break
        x = res["ldd"]["final"]; hullv = x if hullv is None else hull(hullv, x); allneg = allneg and bool(up(x) < 0)
        sub = {"i": i, "T": ser2(Ts), "ldd": ser2(x), "mv_width": mp.nstr(wid(res["ldd"]["mv"]), 6), "natural_width": mp.nstr(wid(res["ldd"]["nat"]), 6), "P_min": mp.nstr(res["_P0_min"], 6),
               "a0": ser2(res["a0"]["final"]), "a1": ser2(res["a1"]["final"]), "r2x2": ser2(res["r2x2"]["final"]), "box_widths": {VARNAMES[j]: mp.nstr(wid(bx[j]), 4) for j in range(NVJ)}}
        if i == 0 or not up(x) < 0: sub["budget_top"] = {k_: mp.nstr(v_, 4) for k_, v_ in sorted(res["_budget"].items(), key=lambda kv: -kv[1])[:6]}
        row["subs"].append(sub)
    row["ldd_hull"] = ser2(hullv) if hullv is not None else None; row["ldd_sign_whole_step"] = "negative" if (allneg and hullv is not None) else ("refused" if hullv is None else ("positive" if lo(hullv) > 0 else "not proved negative"))
    row["wall_s"] = round(time.time() - ta, 2); out["band"].append(row); save()
    print("step " + str(k) + ": l'' hull " + str(row["ldd_hull"]) + " " + row["ldd_sign_whole_step"] + "; sub widths " + ",".join(s_.get("mv_width", "-") for s_ in row["subs"]) + "; %.1f s" % (time.time() - t_beginJ), flush=True)
out["partial"] = False; out["wall_s"] = time.time() - t_beginJ; save(); print("done; wall %.1f s" % out["wall_s"], flush=True)
