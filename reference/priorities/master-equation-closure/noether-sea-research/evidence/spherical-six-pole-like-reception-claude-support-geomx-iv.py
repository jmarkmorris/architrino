# Like-reception campaign, support role (emmy-noether), Phase A instrument: expanded-domain geometry and support-derivative controls.
# Box: q in [0.39, 0.70], delayed coordinate q' in [0, 0.40], delayed speed v' in [0, 0.40].
# Reuses, unchanged, the closed forms geom()/contributions() of this role's frozen late-feedback instrument support-dlambda3-iv.py v2
# (sha256 14b4660bac619eaafa5cae7041b8a04f6a11c9cebc42093de5883811ef6a61a5) by executing its definition block.
# Order (controls before targets): (K1) closed forms vs DIRECT VECTOR computation from the path maps at 300 random points of the expanded box, all three
# classes (chord, D_t, tangential, radial); (W1) velocity sign flipped must be detected; (K2) exact known case for d(lambda_hat)/dt on a prescribed history
# WITH A GENERATED SEGMENT (acceleration jump at s1 = 1): delays solved to 40 digits, Richardson differences, at t = 2.4 (unlike source beyond the seam,
# like and antipode before) and t = 2.7 (like source also beyond the seam); (W2) the pre-seam acceleration used for a source beyond the seam must be
# detected. TARGET: interval subdivision of the box: lower bounds of N, M, chords; upper bounds of M/r (transmitter ranges); zero loci of M and N on q' = 0.40.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import sys, json, random
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
exec(open(E + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
out = {"box": {"q": ["0.39", "0.70"], "q_delayed": ["0", "0.40"], "v_delayed": ["0", "0.40"]}, "controls": []}
mp.dps = 40
def vec(q, qp, vp, c, flip=1):
    s2 = mp.sqrt(2)
    X1 = lambda a: [mp.cos(a), -mp.sin(a)/s2, -mp.sin(a)/s2]; T1 = lambda a: [-mp.sin(a), -mp.cos(a)/s2, -mp.cos(a)/s2]
    X2 = lambda a: [-mp.sin(a)/s2, mp.cos(a), -mp.sin(a)/s2]; T2 = lambda a: [-mp.cos(a)/s2, -mp.sin(a), -mp.cos(a)/s2]
    X = X1(q); T = T1(q)
    if c == 1: Y = [-x for x in X2(qp)]; V = [-vp*x for x in T2(qp)]; sh = -1
    elif c == -1: Y = X2(qp); V = [vp*x for x in T2(qp)]; sh = 1
    else: Y = [-x for x in X1(qp)]; V = [-vp*x for x in T1(qp)]; sh = -1
    V = [flip*x for x in V]; r = [X[i] - Y[i] for i in range(3)]; rn = mp.sqrt(sum(x*x for x in r)); rh = [x/rn for x in r]
    D = 1 - sum(V[i]*rh[i] for i in range(3)); A = [sh*x/(rn*rn*D) for x in rh]
    return rn, D, sum(T[i]*A[i] for i in range(3)), sum(X[i]*A[i] for i in range(3))
random.seed(20261011); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}
for _ in range(300):
    q = mp.mpf("0.39") + mp.mpf(random.random())*mp.mpf("0.31"); qp = mp.mpf(random.random())*mp.mpf("0.40"); vp = mp.mpf(random.random())*mp.mpf("0.40")
    for c in (1, -1, 0):
        r, D, r_q, r_qp, D_q, D_qp, D_vp, N = geom(q, qp, vp, c, 1, mp); rn, Dv, tv, rv = vec(q, qp, vp, c)
        worst[c] = max(worst[c], abs(r - rn), abs(D - Dv), abs(N/(r**3*D) - tv), abs(mp.mpf(SIG[c])/(2*r*D) - rv), abs((1 + r_qp*vp) - D))
out["controls"].append({"name": "(K1) known: closed forms (chord, D_t, tangential N/(r^3 D), radial sigma/(2 r D), identity 1 + r_q' v' = D) vs direct vector computation from the path maps, 300 random points of the expanded box, three classes", "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "pass": bool(all(w < mp.mpf("1e-30") for w in worst.values()))})
q, qp, vp = mp.mpf("0.6"), mp.mpf("0.3"), mp.mpf("0.3"); det = {}
okW1 = True
for c in (1, -1, 0):
    r, D, *_ = geom(q, qp, vp, c, 1, mp); _, Dw, _, _ = vec(q, qp, vp, c, flip=-1); det[NAME[c]] = {"D_closed": mp.nstr(D, 15), "D_wrong_velocity": mp.nstr(Dw, 15)}; okW1 = okW1 and abs(D - Dw) > mp.mpf("1e-3")
out["controls"].append({"name": "(W1) negative: source velocity sign flipped (wrong path map) at (0.6, 0.3, 0.3) gives a D_t differing by > 1e-3 in every class", "detail": det, "pass": bool(okW1)})
# ---- (K2) derivative on a prescribed history with a generated segment
s1 = mp.mpf(1); c0, c1, c2, c2b = mp.mpf(0), mp.mpf("0.05"), mp.mpf("0.05"), mp.mpf("0.07"); h1 = c0 + c1*s1 + c2*s1*s1; v1 = c1 + 2*c2*s1
def hist(s):
    if s <= s1: return c0 + c1*s + c2*s*s, c1 + 2*c2*s, 2*c2
    u = s - s1; return h1 + v1*u + c2b*u*u, v1 + 2*c2b*u, 2*c2b
def tau_of(t, c):
    a, b = mp.mpf("0.5"), mp.mpf("2.5")
    for _ in range(220):
        m = (a + b)/2
        if m - geom(hist(t)[0], hist(t - m)[0], 0, c, 1, mp)[0] < 0: a = m
        else: b = m
    return (a + b)/2
def model(t, wrong_class=None):
    st = {}; sarg = {}
    for c in (1, -1, 0):
        s = t - tau_of(t, c); qh_, vh_, ah_ = hist(s); sarg[NAME[c]] = s
        if wrong_class == c: ah_ = 2*c2          # negative control: pre-seam acceleration used for a source beyond the seam
        st[c] = (qh_, vh_, ah_)
    qt, vt, at = hist(t); return contributions(qt, vt, at, st, 1, mp), sarg
k2 = {}; okK2 = True; hh = mp.mpf("1e-7")
for tK in (mp.mpf("2.4"), mp.mpf("2.7")):
    cf, sarg = model(tK); f = lambda x, key: model(x)[0][key]
    fd = (4*(f(tK + hh, "lambda_hat") - f(tK - hh, "lambda_hat"))/(2*hh) - (f(tK + 2*hh, "lambda_hat") - f(tK - 2*hh, "lambda_hat"))/(4*hh))/3
    fa = (4*(f(tK + hh, "a_rad") - f(tK - hh, "a_rad"))/(2*hh) - (f(tK + 2*hh, "a_rad") - f(tK - 2*hh, "a_rad"))/(4*hh))/3
    e1 = abs(cf["dlambda_dt"] - fd); e2 = abs(cf["d_arad_dt"] - fa); okK2 = okK2 and e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12")
    k2[mp.nstr(tK, 3)] = {"q": mp.nstr(hist(tK)[0], 8), "delayed_args": {k: mp.nstr(v, 8) for k, v in sarg.items()}, "beyond_seam": {k: bool(v > s1) for k, v in sarg.items()}, "closed_dlambda": mp.nstr(cf["dlambda_dt"], 25), "fd_dlambda": mp.nstr(fd, 25), "abs_err": mp.nstr(e1, 5), "abs_err_darad": mp.nstr(e2, 5)}
out["controls"].append({"name": "(K2) exact known: d(lambda_hat)/dt and d(a_rad)/dt closed forms vs Richardson differences on a prescribed history with an acceleration jump at s1 = 1 (generated segment), delays solved to 40 digits, at t = 2.4 and t = 2.7", "detail": k2, "pass": bool(okK2)})
tK = mp.mpf("2.4"); cw, _ = model(tK, wrong_class=1); cf, _ = model(tK)
out["controls"].append({"name": "(W2) negative: the pre-seam (window-type) acceleration used for the unlike source beyond the seam at t = 2.4 changes d(lambda_hat)/dt detectably (> 1e-6)", "correct": mp.nstr(cf["dlambda_dt"], 20), "wrong": mp.nstr(cw["dlambda_dt"], 20), "pass": bool(abs(cw["dlambda_dt"] - cf["dlambda_dt"]) > mp.mpf("1e-6"))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
# ---- TARGET: subdivision of the box (q, q') for N, M, chords, M/r
mp.dps = 30; iv.dps = 30
nq, nqp = 62, 80; mins = {"N": None, "M": None, "rU": None, "rL": None, "rA": None, "sin_ant": None}; maxs = {"M_over_rU": None, "M_over_rL": None, "N": None, "M": None}; argmin = {}
def upd(d, key, val, how, where=None):
    if d[key] is None or (how == "min" and val < d[key]) or (how == "max" and val > d[key]):
        d[key] = val
        if where is not None: argmin[key] = where
for i in range(nq):
    qc = I(mp.mpf("0.39") + mp.mpf("0.31")*i/nq, mp.mpf("0.39") + mp.mpf("0.31")*(i + 1)/nq)
    for j in range(nqp):
        pc = I(mp.mpf("0.40")*j/nqp, mp.mpf("0.40")*(j + 1)/nqp); cc = iv.cos(qc + pc); ss = iv.sin(qc + pc)
        Nn = cc/S2 - iv.cos(qc)*iv.sin(pc)/2; Mm = cc/S2 - iv.sin(qc)*iv.cos(pc)/2
        rU = iv.sqrt(2 - S2*ss + iv.sin(qc)*iv.sin(pc)); rL = iv.sqrt(2 + S2*ss - iv.sin(qc)*iv.sin(pc)); rA = 2*iv.cos((qc - pc)/2)
        w = [s45(qc.a), s45(pc.a)]
        upd(mins, "N", lo(Nn), "min", w); upd(mins, "M", lo(Mm), "min", w); upd(mins, "rU", lo(rU), "min"); upd(mins, "rL", lo(rL), "min"); upd(mins, "rA", lo(rA), "min"); upd(mins, "sin_ant", lo(iv.sin(qc - pc)), "min")
        upd(maxs, "M_over_rU", up(Mm/rU), "max"); upd(maxs, "M_over_rL", up(Mm/rL), "max"); upd(maxs, "N", up(Nn), "max"); upd(maxs, "M", up(Mm), "max")
vmax = mp.mpf("0.40")
def zero_on(fn, a, b):
    a, b = mp.mpf(a), mp.mpf(b)
    for _ in range(120):
        m = (a + b)/2
        if fn(m) > 0: a = m
        else: b = m
    return (a + b)/2
Mfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.sin(q)*mp.cos(p)/2; Nfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.cos(q)*mp.sin(p)/2
out["target"] = {"cells": [nq, nqp], "min_N": s45(mins["N"]), "min_M": s45(mins["M"]), "argmin_cells": argmin, "max_N": s45(maxs["N"]), "max_M": s45(maxs["M"]),
    "min_chord_unlike": s45(mins["rU"]), "min_chord_like": s45(mins["rL"]), "min_chord_antipode": s45(mins["rA"]), "min_sin_q_minus_qp": s45(mins["sin_ant"]),
    "max_M_over_rU": s45(maxs["M_over_rU"]), "max_M_over_rL": s45(maxs["M_over_rL"]),
    "D_unlike_range_for_v_le_0.40": [s45(1 - vmax*maxs["M_over_rU"]), "1"], "D_like_range_for_v_le_0.40": ["1", s45(1 + vmax*maxs["M_over_rL"])], "D_antipode_range_for_q_ge_qp": ["1", s45(1 + vmax*mp.sin(mp.mpf("0.35")))],
    "N_positive_on_box": bool(mins["N"] > 0), "M_positive_on_box": bool(mins["M"] > 0),
    "M_zero_q_at_qp_0.40": mp.nstr(zero_on(lambda q: Mfun(q, mp.mpf("0.40")), "0.6", "0.9"), 12), "M_zero_q_at_qp_0": mp.nstr(zero_on(lambda q: Mfun(q, mp.mpf(0)), "0.6", "1.2"), 12),
    "N_zero_q_at_qp_0.40": mp.nstr(zero_on(lambda q: Nfun(q, mp.mpf("0.40")), "0.7", "1.4"), 12), "N_zero_q_at_qp_0": mp.nstr(zero_on(lambda q: Nfun(q, mp.mpf(0)), "0.7", "1.6"), 12)}
print(json.dumps(out["target"], indent=0), flush=True); json.dump(out, open(sys.argv[1], "w"), indent=1)
