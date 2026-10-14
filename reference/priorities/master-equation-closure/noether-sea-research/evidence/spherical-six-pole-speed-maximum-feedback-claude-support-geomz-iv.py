# Speed-maximum-feedback campaign, support role (emmy-noether), Phase A instrument: SIGNED geometry and derivative controls on the NEW box
# receiver q in [0.81, 1.10], delayed q' in [0, 0.85], delayed speed v' in [0, 0.45]. General signed closed forms only (no approach/recede label, no
# sign of M, N or of any tangent contribution is imposed). Reuses unchanged, by executing their definition blocks, this role's frozen instruments:
# like-reception support-jerk-iv.py (860f04bc...: kern, dh_dt) and late-feedback support-dlambda3-iv.py v2 (14b4660b...: geom, contributions).
# Order (controls BEFORE the target): (K1) closed forms vs direct vector computation at 400 random points of the new box, three classes, with counts of
# points where M < 0 and where N < 0; (H1) EXACT HAND-KNOWN derivative: antipode class, static source at q' = 0, receiver q = pi/3, qdot = 2/5:
# h_A = sin(q/2)/(4 cos^2(q/2)) = 1/6, dh_A/dt = qdot (1 + sin^2(q/2))/(8 cos^3(q/2)) = 1/(6 sqrt 3); (W1) source velocity sign flipped; (W3) old label
# imposed (|M|); (K2) d(lambda_hat)/dt, d(a_rad)/dt and (K3) each class's dh_c/dt and d(qddot)/dt against Richardson differences on a prescribed history
# with a generated segment (NUMERICAL prescribed-history controls, labelled as such) at t = 3.8 (q = 0.885) and t = 4.2 (q = 1.069); (W2) pre-seam
# acceleration used beyond the seam; (W4) source acceleration OMITTED; (W5) sign of the delayed-speed term flipped in dh/dt. TARGET: subdivision of the
# (q, q') box for N, M (ranges, proved-sign cell counts, zero loci), chords, signed transmitter ratios M/r and the D_c ranges.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json, random
print("PID", os.getpid(), flush=True)
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT_PATH = sys.argv[1]
exec(open(EVD + "spherical-six-pole-like-reception-claude-support-jerk-iv.py").read().split('out = {"controls": []}', 1)[0])
exec(open(EVD + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
out = {"box": {"q": ["0.81", "1.10"], "q_delayed": ["0", "0.85"], "v_delayed": ["0", "0.45"]}, "controls": []}
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
Mfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.sin(q)*mp.cos(p)/2; Nfun = lambda q, p: mp.cos(q + p)/mp.sqrt(2) - mp.cos(q)*mp.sin(p)/2
random.seed(20261012); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; nMneg = 0; nNneg = 0; sign_ok = True
for _ in range(400):
    q = mp.mpf("0.81") + mp.mpf(random.random())*mp.mpf("0.29"); qp = mp.mpf(random.random())*mp.mpf("0.85"); vp = mp.mpf(random.random())*mp.mpf("0.45")
    if Mfun(q, qp) < 0: nMneg += 1
    if Nfun(q, qp) < 0: nNneg += 1
    for c in (1, -1, 0):
        k = kern(q, qp, vp, c, mp); rn, Dv, tv, rv = vec(q, qp, vp, c); r, D, r_q, r_qp, D_q, D_qp, D_vp, Nn = geom(q, qp, vp, c, 1, mp)
        worst[c] = max(worst[c], abs(k["r"] - rn), abs(k["D"] - Dv), abs(k["h"] - tv), abs(mp.mpf(SIG[c])/(2*k["r"]*k["D"]) - rv), abs((1 + r_qp*vp) - D), abs(r - rn), abs(D - Dv))
        if c != 0 and Dv > 0 and (tv > 0) != (Nfun(q, qp) > 0): sign_ok = False     # the vector tangent hit of a meridional class has the sign of N
out["controls"].append({"name": "(K1) known: signed closed forms (chord, D_t, tangential N/(r^3 D), radial sigma/(2 r D), identity 1 + r_q' v' = D; both code paths kern and geom) vs direct vector computation, 400 random points of the NEW box, three classes; the vector tangent hit of each meridional class has the sign of N", "points_with_M_negative": nMneg, "points_with_N_negative": nNneg, "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "pass": bool(all(w < mp.mpf("1e-30") for w in worst.values()) and nMneg > 20 and nNneg > 20 and sign_ok)})
qh = mp.pi/3; hk = kern(qh, mp.mpf(0), mp.mpf(0), 0, mp)["h"]; dk = dh_dt(qh, mp.mpf(2)/5, mp.mpf(0), mp.mpf(0), mp.mpf(0), 0, mp)
out["controls"].append({"name": "(H1) EXACT HAND-KNOWN: antipode class, static source q' = 0, receiver q = pi/3, qdot = 2/5: h_A = 1/6 and dh_A/dt = 1/(6 sqrt 3)", "h": mp.nstr(hk, 30), "dh_dt": mp.nstr(dk, 30), "hand_dh_dt": mp.nstr(1/(6*mp.sqrt(3)), 30), "pass": bool(abs(hk - mp.mpf(1)/6) < mp.mpf("1e-35") and abs(dk - 1/(6*mp.sqrt(3))) < mp.mpf("1e-35"))})
q, qp, vp = mp.mpf("1.0"), mp.mpf("0.7"), mp.mpf("0.4"); det = {}; okW1 = True
for c in (1, -1, 0):
    D = kern(q, qp, vp, c, mp)["D"]; _, Dw, _, _ = vec(q, qp, vp, c, flip=-1); det[NAME[c]] = {"D_closed": mp.nstr(D, 15), "D_wrong_velocity": mp.nstr(Dw, 15)}; okW1 = okW1 and abs(D - Dw) > mp.mpf("1e-3")
out["controls"].append({"name": "(W1) negative (sign flip): source velocity sign flipped at (1.0, 0.7, 0.4) changes D_t by > 1e-3 in every class", "detail": det, "pass": bool(okW1)})
Mv = Mfun(q, qp); rU = kern(q, qp, vp, 1, mp)["r"]; D_true = vec(q, qp, vp, 1)[1]; D_label = 1 - vp*abs(Mv)/rU
out["controls"].append({"name": "(W3) negative: the OLD LABEL imposed (unlike D computed as 1 - v'|M|/r, i.e. approach assumed) at (1.0, 0.7, 0.4), where M < 0, differs from the vector D_t", "M": mp.nstr(Mv, 12), "N": mp.nstr(Nfun(q, qp), 12), "D_vector": mp.nstr(D_true, 15), "D_old_label": mp.nstr(D_label, 15), "pass": bool(Mv < 0 and D_true > 1 and abs(D_true - D_label) > mp.mpf("1e-3"))})
# ---- prescribed history with a generated segment reaching the new box (NUMERICAL controls: Richardson differences of an exactly known history)
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
def states(t, wrong=None, omit=None):
    st = {}; info = {}
    for c in (1, -1, 0):
        s = t - tau_of(t, c); qs, vs, as_ = hist(s)
        if wrong == c: as_ = 2*c2
        if omit == c: as_ = mp.mpf(0)
        st[c] = (qs, vs, as_); info[NAME[c]] = {"delayed_arg": mp.nstr(s, 8), "q_delayed": mp.nstr(qs, 6), "v_delayed": mp.nstr(vs, 6), "beyond_seam": bool(s > s1), "M": mp.nstr(Mfun(hist(t)[0], qs), 8), "N": mp.nstr(Nfun(hist(t)[0], qs), 8), "D": mp.nstr(kern(hist(t)[0], qs, vs, c, mp)["D"], 10)}
    return st, info
def lam_parts(t):
    st, _ = states(t); qt, vt, at = hist(t); return contributions(qt, vt, at, st, 1, mp)
def hsum(t):
    st, _ = states(t); qt = hist(t)[0]; return {c: kern(qt, st[c][0], st[c][1], c, mp)["h"] for c in (1, -1, 0)}
def rich(f, t, h=mp.mpf("1e-7")): return (4*(f(t + h) - f(t - h))/(2*h) - (f(t + 2*h) - f(t - 2*h))/(4*h))/3
gm = mp.mpf(1)/10; k2 = {}; okK2 = True; okK3 = True
for tK in (mp.mpf("3.8"), mp.mpf("4.2")):
    st, info = states(tK); qt, vt, at = hist(tK); cf = contributions(qt, vt, at, st, 1, mp)
    e1 = abs(cf["dlambda_dt"] - rich(lambda x: lam_parts(x)["lambda_hat"], tK)); e2 = abs(cf["d_arad_dt"] - rich(lambda x: lam_parts(x)["a_rad"], tK)); okK2 = okK2 and e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12")
    row = {"q": mp.nstr(qt, 8), "qdot": mp.nstr(vt, 8), "classes": info, "dlambda_closed": mp.nstr(cf["dlambda_dt"], 22), "dlambda_abs_err": mp.nstr(e1, 5), "darad_abs_err": mp.nstr(e2, 5), "jerk": {}}
    tot_c = 0; tot_f = 0
    for c in (1, -1, 0):
        cj = dh_dt(qt, vt, st[c][0], st[c][1], st[c][2], c, mp); fj = rich(lambda x, c=c: hsum(x)[c], tK); e = abs(cj - fj); okK3 = okK3 and e < mp.mpf("1e-12"); tot_c += MULT[c]*gm*cj; tot_f += MULT[c]*gm*fj
        row["jerk"][NAME[c]] = {"closed": mp.nstr(cj, 20), "abs_err": mp.nstr(e, 5)}
    row["dqddot_dt_closed"] = mp.nstr(tot_c, 20); row["dqddot_dt_fd"] = mp.nstr(tot_f, 20); k2[mp.nstr(tK, 3)] = row
out["controls"].append({"name": "(K2) NUMERICAL prescribed-history control: d(lambda_hat)/dt and d(a_rad)/dt closed forms vs Richardson differences on an exactly known history with a generated segment, NEW box, t = 3.8 (q = 0.885) and t = 4.2 (q = 1.069)", "detail": k2, "pass": bool(okK2)})
out["controls"].append({"name": "(K3) NUMERICAL prescribed-history control: each class's dh_c/dt and d(qddot)/dt closed forms vs Richardson differences, same history and times (values inside the K2 detail)", "pass": bool(okK3)})
tK = mp.mpf("4.2"); stw, _ = states(tK, wrong=1); sto, _ = states(tK, omit=1); st, _ = states(tK); qt, vt, at = hist(tK)
a_ = contributions(qt, vt, at, st, 1, mp)["dlambda_dt"]; b_ = contributions(qt, vt, at, stw, 1, mp)["dlambda_dt"]; ja = dh_dt(qt, vt, st[1][0], st[1][1], st[1][2], 1, mp); jb = dh_dt(qt, vt, stw[1][0], stw[1][1], stw[1][2], 1, mp)
out["controls"].append({"name": "(W2) negative: the pre-seam acceleration used for the unlike source beyond the seam at t = 4.2 changes d(lambda_hat)/dt and dh_U/dt by more than 1e-6", "dlambda": [mp.nstr(a_, 15), mp.nstr(b_, 15)], "dhU": [mp.nstr(ja, 15), mp.nstr(jb, 15)], "pass": bool(abs(a_ - b_) > mp.mpf("1e-6") and abs(ja - jb) > mp.mpf("1e-6"))})
fdU = rich(lambda x: hsum(x)[1], tK); jo = dh_dt(qt, vt, sto[1][0], sto[1][1], sto[1][2], 1, mp); co = contributions(qt, vt, at, sto, 1, mp)["dlambda_dt"]
out["controls"].append({"name": "(W4) negative (acceleration omission): the unlike source acceleration set to zero at t = 4.2 moves dh_U/dt away from the Richardson difference and changes d(lambda_hat)/dt, each by more than 1e-6", "dhU_true_omitted_fd": [mp.nstr(ja, 15), mp.nstr(jo, 15), mp.nstr(fdU, 15)], "dlambda": [mp.nstr(a_, 15), mp.nstr(co, 15)], "pass": bool(abs(jo - fdU) > mp.mpf("1e-6") and abs(ja - fdU) < mp.mpf("1e-12") and abs(a_ - co) > mp.mpf("1e-6"))})
jf = dh_dt(qt, vt, st[1][0], -st[1][1], st[1][2], 1, mp)
out["controls"].append({"name": "(W5) negative (sign flip): the delayed speed entered with the wrong sign in dh_U/dt at t = 4.2 is rejected by the Richardson difference (difference > 1e-6)", "dhU_flipped": mp.nstr(jf, 15), "pass": bool(abs(jf - fdU) > mp.mpf("1e-6"))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
json.dump(out, open(OUT_PATH, "w"), indent=1)
if not out["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- TARGET: subdivision
mp.dps = 30; iv.dps = 30
nq, nqp = 58, 85; ext = {}; cnt = {"N_pos": 0, "N_neg": 0, "N_und": 0, "M_pos": 0, "M_neg": 0, "M_und": 0}
def upd(key, val, how):
    if key not in ext or (how == "min" and val < ext[key]) or (how == "max" and val > ext[key]): ext[key] = val
for i in range(nq):
    qc = I(mp.mpf("0.81") + mp.mpf("0.29")*i/nq, mp.mpf("0.81") + mp.mpf("0.29")*(i + 1)/nq)
    for j in range(nqp):
        pc = I(mp.mpf("0.85")*j/nqp, mp.mpf("0.85")*(j + 1)/nqp); cc = iv.cos(qc + pc); ss = iv.sin(qc + pc)
        Nn = cc/S2 - iv.cos(qc)*iv.sin(pc)/2; Mm = cc/S2 - iv.sin(qc)*iv.cos(pc)/2
        rU = iv.sqrt(2 - S2*ss + iv.sin(qc)*iv.sin(pc)); rL = iv.sqrt(2 + S2*ss - iv.sin(qc)*iv.sin(pc)); rA = 2*iv.cos((qc - pc)/2)
        cnt["N_pos" if lo(Nn) > 0 else ("N_neg" if up(Nn) < 0 else "N_und")] += 1; cnt["M_pos" if lo(Mm) > 0 else ("M_neg" if up(Mm) < 0 else "M_und")] += 1
        for key, val, how in (("N_min", lo(Nn), "min"), ("N_max", up(Nn), "max"), ("M_min", lo(Mm), "min"), ("M_max", up(Mm), "max"), ("rU_min", lo(rU), "min"), ("rL_min", lo(rL), "min"), ("rA_min", lo(rA), "min"),
                              ("MrU_min", lo(Mm/rU), "min"), ("MrU_max", up(Mm/rU), "max"), ("MrL_min", lo(Mm/rL), "min"), ("MrL_max", up(Mm/rL), "max")): upd(key, val, how)
vmax = mp.mpf("0.45")
def zero_on(fn, a, b):
    a, b = mp.mpf(a), mp.mpf(b)
    if not (fn(a) > 0 and fn(b) < 0): return None
    for _ in range(120):
        m = (a + b)/2
        if fn(m) > 0: a = m
        else: b = m
    return mp.nstr((a + b)/2, 12)
PS = ("0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.55", "0.6", "0.65", "0.7", "0.75", "0.8", "0.85")
out["target"] = {"cells": [nq, nqp], "N_range": [s45(ext["N_min"]), s45(ext["N_max"])], "M_range": [s45(ext["M_min"]), s45(ext["M_max"])], "cell_sign_counts": cnt,
    "min_chord_unlike": s45(ext["rU_min"]), "min_chord_like": s45(ext["rL_min"]), "min_chord_antipode_any_order": s45(ext["rA_min"]),
    "M_over_rU_range": [s45(ext["MrU_min"]), s45(ext["MrU_max"])], "M_over_rL_range": [s45(ext["MrL_min"]), s45(ext["MrL_max"])],
    "D_unlike_range_v_le_0.45": [s45(1 - vmax*ext["MrU_max"]), s45(1 - vmax*ext["MrU_min"])], "D_like_range_v_le_0.45": [s45(1 + vmax*ext["MrL_min"]), s45(1 + vmax*ext["MrL_max"])],
    "D_antipode_range_d_in_[-0.04,1.10]": [s45(1 + vmax*mp.sin(mp.mpf("-0.02"))), s45(1 + vmax*mp.sin(mp.mpf("0.55")))],
    "M_zero_q_of_qp": {p: zero_on(lambda q, p=p: Mfun(q, mp.mpf(p)), "0", "1.57") for p in PS},
    "N_zero_q_of_qp": {p: zero_on(lambda q, p=p: Nfun(q, mp.mpf(p)), "0", "1.57") for p in PS}}
print(json.dumps(out["target"], indent=0), flush=True); json.dump(out, open(OUT_PATH, "w"), indent=1)
