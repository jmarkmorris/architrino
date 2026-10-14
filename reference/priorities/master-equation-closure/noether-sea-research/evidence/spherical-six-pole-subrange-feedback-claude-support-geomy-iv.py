# Subrange-feedback campaign, support role (emmy-noether), Phase A instrument: SIGNED geometry and derivative controls on the new box
# q in [0.59, 0.85], q' in [0, 0.55], v' in [0, 0.40]. General signed closed forms only (no approach/recede label is imposed anywhere).
# Reuses unchanged, by executing their definition blocks, this role's frozen instruments: like-reception support-jerk-iv.py (sha256 860f04bc...: kern,
# dh_dt, and through it the record lookup) and late-feedback support-dlambda3-iv.py v2 (14b4660b...: geom, contributions with a library switch).
# Order: (K1) closed forms vs direct vector computation at 300 random box points, three classes; (W1) velocity sign flipped; (W3) the OLD LABEL imposed
# (D_U computed with |M|) must be detected where M < 0; (K2) d(lambda_hat)/dt, d(a_rad)/dt and (K3) each class's dh_c/dt and d(qddot)/dt against
# Richardson differences on a prescribed history with a generated segment, at t = 3.2 (q = 0.642, M > 0 for the unlike source) and t = 3.6 (q = 0.800,
# M < 0 for the unlike source: flipped-label regime); (W2) pre-seam acceleration used beyond the seam. TARGET: subdivision of the (q, q') box for N, M
# (ranges, proved-sign cell counts, zero loci), chords, M/r (signed transmitter ranges).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import sys, json, random
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT_PATH = sys.argv[1]
exec(open(EVD + "spherical-six-pole-like-reception-claude-support-jerk-iv.py").read().split('out = {"controls": []}', 1)[0])
exec(open(EVD + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
out = {"box": {"q": ["0.59", "0.85"], "q_delayed": ["0", "0.55"], "v_delayed": ["0", "0.40"]}, "controls": []}
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
random.seed(20261012); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; nMneg = 0
for _ in range(300):
    q = mp.mpf("0.59") + mp.mpf(random.random())*mp.mpf("0.26"); qp = mp.mpf(random.random())*mp.mpf("0.55"); vp = mp.mpf(random.random())*mp.mpf("0.40")
    if mp.cos(q + qp)/mp.sqrt(2) - mp.sin(q)*mp.cos(qp)/2 < 0: nMneg += 1
    for c in (1, -1, 0):
        k = kern(q, qp, vp, c, mp); rn, Dv, tv, rv = vec(q, qp, vp, c); r, D, r_q, r_qp, D_q, D_qp, D_vp, Nn = geom(q, qp, vp, c, 1, mp)
        worst[c] = max(worst[c], abs(k["r"] - rn), abs(k["D"] - Dv), abs(k["h"] - tv), abs(mp.mpf(SIG[c])/(2*k["r"]*k["D"]) - rv), abs((1 + r_qp*vp) - D), abs(r - rn), abs(D - Dv))
out["controls"].append({"name": "(K1) known: signed closed forms (chord, D_t, tangential N/(r^3 D), radial sigma/(2 r D), identity 1 + r_q' v' = D; both code paths kern and geom) vs direct vector computation, 300 random points of the new box, three classes", "points_with_M_negative": nMneg, "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "pass": bool(all(w < mp.mpf("1e-30") for w in worst.values()) and nMneg > 20)})
q, qp, vp = mp.mpf("0.82"), mp.mpf("0.45"), mp.mpf("0.3"); det = {}; okW1 = True
for c in (1, -1, 0):
    D = kern(q, qp, vp, c, mp)["D"]; _, Dw, _, _ = vec(q, qp, vp, c, flip=-1); det[NAME[c]] = {"D_closed": mp.nstr(D, 15), "D_wrong_velocity": mp.nstr(Dw, 15)}; okW1 = okW1 and abs(D - Dw) > mp.mpf("1e-3")
out["controls"].append({"name": "(W1) negative: source velocity sign flipped at (0.82, 0.45, 0.3) changes D_t by > 1e-3 in every class", "detail": det, "pass": bool(okW1)})
Mv = mp.cos(q + qp)/mp.sqrt(2) - mp.sin(q)*mp.cos(qp)/2; rU = kern(q, qp, vp, 1, mp)["r"]; D_true = vec(q, qp, vp, 1)[1]; D_label = 1 - vp*abs(Mv)/rU
out["controls"].append({"name": "(W3) negative: the OLD LABEL imposed (unlike D computed as 1 - v'|M|/r, i.e. approach assumed) at (0.82, 0.45, 0.3), where M < 0, differs from the vector D_t", "M": mp.nstr(Mv, 12), "D_vector": mp.nstr(D_true, 15), "D_old_label": mp.nstr(D_label, 15), "pass": bool(Mv < 0 and D_true > 1 and abs(D_true - D_label) > mp.mpf("1e-3"))})
# ---- prescribed history with a generated segment reaching the new box
s1 = mp.mpf(1); c0, c1, c2, c2b = mp.mpf(0), mp.mpf("0.05"), mp.mpf("0.04"), mp.mpf("0.055"); h1 = c0 + c1*s1 + c2*s1*s1; v1 = c1 + 2*c2*s1
def hist(s):
    if s <= s1: return c0 + c1*s + c2*s*s, c1 + 2*c2*s, 2*c2
    u = s - s1; return h1 + v1*u + c2b*u*u, v1 + 2*c2b*u, 2*c2b
def tau_of(t, c):
    a, b = mp.mpf("0.4"), mp.mpf("2.6")
    for _ in range(220):
        m = (a + b)/2
        if m - kern(hist(t)[0], hist(t - m)[0], 0, c, mp)["r"] < 0: a = m
        else: b = m
    return (a + b)/2
def states(t, wrong=None):
    st = {}; info = {}
    for c in (1, -1, 0):
        s = t - tau_of(t, c); qs, vs, as_ = hist(s)
        if wrong == c: as_ = 2*c2
        st[c] = (qs, vs, as_); info[NAME[c]] = {"delayed_arg": mp.nstr(s, 8), "q_delayed": mp.nstr(qs, 6), "beyond_seam": bool(s > s1), "M": mp.nstr(mp.cos(hist(t)[0] + qs)/mp.sqrt(2) - mp.sin(hist(t)[0])*mp.cos(qs)/2, 8), "D": mp.nstr(kern(hist(t)[0], qs, vs, c, mp)["D"], 10)}
    return st, info
def lam_parts(t):
    st, _ = states(t); qt, vt, at = hist(t); return contributions(qt, vt, at, st, 1, mp)
def hsum(t):
    st, _ = states(t); qt = hist(t)[0]; return {c: kern(qt, st[c][0], st[c][1], c, mp)["h"] for c in (1, -1, 0)}
def rich(f, t, h=mp.mpf("1e-7")): return (4*(f(t + h) - f(t - h))/(2*h) - (f(t + 2*h) - f(t - 2*h))/(4*h))/3
gm = mp.mpf(1)/10; k2 = {}; okK2 = True; okK3 = True
for tK in (mp.mpf("3.2"), mp.mpf("3.6")):
    st, info = states(tK); qt, vt, at = hist(tK); cf = contributions(qt, vt, at, st, 1, mp)
    e1 = abs(cf["dlambda_dt"] - rich(lambda x: lam_parts(x)["lambda_hat"], tK)); e2 = abs(cf["d_arad_dt"] - rich(lambda x: lam_parts(x)["a_rad"], tK)); okK2 = okK2 and e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12")
    row = {"q": mp.nstr(qt, 8), "qdot": mp.nstr(vt, 8), "classes": info, "dlambda_closed": mp.nstr(cf["dlambda_dt"], 22), "dlambda_abs_err": mp.nstr(e1, 5), "darad_abs_err": mp.nstr(e2, 5), "jerk": {}}
    tot_c = 0; tot_f = 0
    for c in (1, -1, 0):
        cj = dh_dt(qt, vt, st[c][0], st[c][1], st[c][2], c, mp); fj = rich(lambda x, c=c: hsum(x)[c], tK); e = abs(cj - fj); okK3 = okK3 and e < mp.mpf("1e-12"); tot_c += MULT[c]*gm*cj; tot_f += MULT[c]*gm*fj
        row["jerk"][NAME[c]] = {"closed": mp.nstr(cj, 20), "abs_err": mp.nstr(e, 5)}
    row["dqddot_dt_closed"] = mp.nstr(tot_c, 20); row["dqddot_dt_fd"] = mp.nstr(tot_f, 20); k2[mp.nstr(tK, 3)] = row
out["controls"].append({"name": "(K2) exact known: d(lambda_hat)/dt and d(a_rad)/dt closed forms vs Richardson differences on a prescribed history with a generated segment, new box, t = 3.2 (unlike M > 0) and t = 3.6 (unlike M < 0, flipped-label regime)", "detail": k2, "pass": bool(okK2)})
out["controls"].append({"name": "(K3) exact known: each class's dh_c/dt and d(qddot)/dt closed forms vs Richardson differences, same history and times (values inside the K2 detail)", "pass": bool(okK3)})
tK = mp.mpf("3.6"); stw, _ = states(tK, wrong=1); st, _ = states(tK); qt, vt, at = hist(tK)
a_ = contributions(qt, vt, at, st, 1, mp)["dlambda_dt"]; b_ = contributions(qt, vt, at, stw, 1, mp)["dlambda_dt"]; ja = dh_dt(qt, vt, st[1][0], st[1][1], st[1][2], 1, mp); jb = dh_dt(qt, vt, stw[1][0], stw[1][1], stw[1][2], 1, mp)
out["controls"].append({"name": "(W2) negative: the pre-seam acceleration used for the unlike source beyond the seam at t = 3.6 changes d(lambda_hat)/dt and dh_U/dt by more than 1e-6", "dlambda": [mp.nstr(a_, 15), mp.nstr(b_, 15)], "dhU": [mp.nstr(ja, 15), mp.nstr(jb, 15)], "pass": bool(abs(a_ - b_) > mp.mpf("1e-6") and abs(ja - jb) > mp.mpf("1e-6"))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
# ---- TARGET: subdivision
mp.dps = 30; iv.dps = 30
nq, nqp = 104, 110; ext = {}; cnt = {"N_pos": 0, "N_neg": 0, "N_und": 0, "M_pos": 0, "M_neg": 0, "M_und": 0}
def upd(key, val, how):
    if key not in ext or (how == "min" and val < ext[key]) or (how == "max" and val > ext[key]): ext[key] = val
for i in range(nq):
    qc = I(mp.mpf("0.59") + mp.mpf("0.26")*i/nq, mp.mpf("0.59") + mp.mpf("0.26")*(i + 1)/nq)
    for j in range(nqp):
        pc = I(mp.mpf("0.55")*j/nqp, mp.mpf("0.55")*(j + 1)/nqp); cc = iv.cos(qc + pc); ss = iv.sin(qc + pc)
        Nn = cc/S2 - iv.cos(qc)*iv.sin(pc)/2; Mm = cc/S2 - iv.sin(qc)*iv.cos(pc)/2
        rU = iv.sqrt(2 - S2*ss + iv.sin(qc)*iv.sin(pc)); rL = iv.sqrt(2 + S2*ss - iv.sin(qc)*iv.sin(pc)); rA = 2*iv.cos((qc - pc)/2)
        cnt["N_pos" if lo(Nn) > 0 else ("N_neg" if up(Nn) < 0 else "N_und")] += 1; cnt["M_pos" if lo(Mm) > 0 else ("M_neg" if up(Mm) < 0 else "M_und")] += 1
        for key, val, how in (("N_min", lo(Nn), "min"), ("N_max", up(Nn), "max"), ("M_min", lo(Mm), "min"), ("M_max", up(Mm), "max"), ("rU_min", lo(rU), "min"), ("rL_min", lo(rL), "min"), ("rA_min", lo(rA), "min"),
                              ("MrU_min", lo(Mm/rU), "min"), ("MrU_max", up(Mm/rU), "max"), ("MrL_min", lo(Mm/rL), "min"), ("MrL_max", up(Mm/rL), "max")): upd(key, val, how)
vmax = mp.mpf("0.40")
def zero_on(fn, a, b):
    a, b = mp.mpf(a), mp.mpf(b)
    if not (fn(a) > 0 and fn(b) < 0): return None
    for _ in range(120):
        m = (a + b)/2
        if fn(m) > 0: a = m
        else: b = m
    return mp.nstr((a + b)/2, 12)
Mfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.sin(q)*mp.cos(p)/2; Nfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.cos(q)*mp.sin(p)/2
out["target"] = {"cells": [nq, nqp], "N_range": [s45(ext["N_min"]), s45(ext["N_max"])], "M_range": [s45(ext["M_min"]), s45(ext["M_max"])], "cell_sign_counts": cnt,
    "min_chord_unlike": s45(ext["rU_min"]), "min_chord_like": s45(ext["rL_min"]), "min_chord_antipode_any_order": s45(ext["rA_min"]),
    "M_over_rU_range": [s45(ext["MrU_min"]), s45(ext["MrU_max"])], "M_over_rL_range": [s45(ext["MrL_min"]), s45(ext["MrL_max"])],
    "D_unlike_range_v_le_0.40": [s45(1 - vmax*ext["MrU_max"]), s45(1 - vmax*ext["MrU_min"])], "D_like_range_v_le_0.40": [s45(1 + vmax*ext["MrL_min"]), s45(1 + vmax*ext["MrL_max"])], "D_antipode_range_q_ge_qp": ["1", s45(1 + vmax*mp.sin(mp.mpf("0.425")))],
    "M_zero_q_of_qp": {p: zero_on(lambda q, p=p: Mfun(q, mp.mpf(p)), "0.5", "1.2") for p in ("0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.55")},
    "N_zero_q_of_qp": {p: zero_on(lambda q, p=p: Nfun(q, mp.mpf(p)), "0.5", "1.57") for p in ("0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.55")}}
print(json.dumps(out["target"], indent=0), flush=True); json.dump(out, open(OUT_PATH, "w"), indent=1)
