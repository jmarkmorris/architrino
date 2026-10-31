# Post-turn campaign (2026-10-21), support role (emmy-noether): geomx, a NEW file built from the frozen October geometry instrument geomv-iv.py
# (spherical-six-pole-correlated-continuation-claude-support-geomv-iv.py, sha256 1b0077c041d0940b740cb910bc28ca5053ae6d004fe0f05136ca05cd1dcef7ab, unchanged).
# Purpose: extend the qualified signed-geometry chart G1 (receiver q [1.45, 2.10], source q' [0, 1.80], source w' [-0.10, 0.45]) to source q' [0, 1.83]
# (the review's sizing: q' <= q(t*) <= 1.817731, plus margin) and source w' [-0.20, 0.45] (the like source reads post-turn history, w' < 0, from about
# step 624 and w' < -0.10 from about step 648; inferred from the like delay ~0.67 and a ~ -0.41 at the turn). Receiver box unchanged.
# Changes (complete list): (X1) box and K1 sampling extended; (X2) known control on the extension strips; (X3) swapped-sign negatives at an extension
# point; (X4) numerical prescribed-history control whose reads reach q' > 1.80 and like w' < -0.10, with sign-flip and omission negatives;
# (X5) target: cells over the extended box with exact first/last edges and shared internal edges (box read outward from its decimals), D ranges also
# in interval arithmetic with a proved-positivity flag. All geomv controls (K1, H1, W1, W3, K2, K3, W2, W4, W5, H2, K2b, W6, W7) are retained.
# ---- geomv header follows unchanged ----
# Correlated-continuation campaign, support role (emmy-noether): SIGNED geometry and tangent/radial derivative controls on the WIDER chart
# receiver q in [1.45, 2.10] (passing pi/2), source q' in [0, 1.80], source SIGNED velocity w' in [-0.10, 0.45]. Derived from this role's frozen turning-point geomw-iv.py
# (2b9e57a1...) with the box changed, negative w' sampled, and added controls: (H2) exact hand-known RADIAL derivative (all classes, static sources at q' = 0),
# (K2b) numerical prescribed-history control on a smooth history with NEGATIVE receiver w and NEGATIVE unlike source w', (W6) delayed-velocity sign flip
# in d(a_rad)/dt rejected. Reuses unchanged, by executing their definition blocks, like-reception support-jerk-iv.py (860f04bc...: kern, dh_dt) and
# late-feedback support-dlambda3-iv.py v2 (14b4660b...: geom, contributions with d_arad_dt and dlambda_dt). Controls first, exit on failure; then the
# subdivision target (N, M ranges and proved-sign cell counts, zero loci, chords, signed transmitter ratios, D_c ranges for w' in [-0.10, 0.45]). Hand cases H1 and H2 are placed AT q = pi/2 (an ordinary point of the signed forms).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json, random
print("PID", os.getpid(), flush=True)
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT_PATH = sys.argv[1]
exec(open(EVD + "spherical-six-pole-like-reception-claude-support-jerk-iv.py").read().split('out = {"controls": []}', 1)[0])
exec(open(EVD + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
out = {"box": {"q": ["1.45", "2.10"], "q_delayed": ["0", "1.83"], "w_delayed": ["-0.20", "0.45"]}, "controls": [], "instrument": "geomx (post-turn support; from geomv 1b0077c0)"}      # geomx (X1): extended source box
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
random.seed(20261012); worst = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; nMneg = 0; nNneg = 0; sign_ok = True; nvneg = 0
for _ in range(400):
    q = mp.mpf("1.45") + mp.mpf(random.random())*mp.mpf("0.65"); qp = mp.mpf(random.random())*mp.mpf("1.83"); vp = mp.mpf("-0.20") + mp.mpf(random.random())*mp.mpf("0.65"); nvneg += (vp < 0)
    if Mfun(q, qp) < 0: nMneg += 1
    if Nfun(q, qp) < 0: nNneg += 1
    for c in (1, -1, 0):
        k = kern(q, qp, vp, c, mp); rn, Dv, tv, rv = vec(q, qp, vp, c); r, D, r_q, r_qp, D_q, D_qp, D_vp, Nn = geom(q, qp, vp, c, 1, mp)
        worst[c] = max(worst[c], abs(k["r"] - rn), abs(k["D"] - Dv), abs(k["h"] - tv), abs(mp.mpf(SIG[c])/(2*k["r"]*k["D"]) - rv), abs((1 + r_qp*vp) - D), abs(r - rn), abs(D - Dv))
        if c != 0 and Dv > 0 and (tv > 0) != (Nfun(q, qp) > 0): sign_ok = False     # the vector tangent hit of a meridional class has the sign of N
out["controls"].append({"name": "(K1) known: signed closed forms (chord, D_t, tangential N/(r^3 D), radial sigma/(2 r D), identity 1 + r_q' v' = D; both code paths kern and geom) vs direct vector computation, 400 random points of the EXTENDED box (geomx: source q' in [0, 1.83], source velocity in [-0.20, 0.45]), three classes; the vector tangent hit of each meridional class has the sign of N", "points_with_M_negative": nMneg, "points_with_N_negative": nNneg, "points_with_negative_source_velocity": nvneg, "max_abs_diff": {NAME[c]: mp.nstr(worst[c], 5) for c in worst}, "pass": bool(all(w < mp.mpf("1e-30") for w in worst.values()) and nMneg > 20 and nNneg > 20 and nvneg > 20 and sign_ok)})
# ---- geomx (X2): known control concentrated on the EXTENSION strips (source q' in [1.80, 1.83], or source w' in [-0.20, -0.10])
random.seed(20261021); worstx = {1: mp.mpf(0), -1: mp.mpf(0), 0: mp.mpf(0)}; sign_okx = True; nA = nB = 0
for i_ in range(300):
    q = mp.mpf("1.45") + mp.mpf(random.random())*mp.mpf("0.65")
    if i_ % 2 == 0: qp = mp.mpf("1.80") + mp.mpf(random.random())*mp.mpf("0.03"); vp = mp.mpf("-0.20") + mp.mpf(random.random())*mp.mpf("0.65"); nA += 1
    else: qp = mp.mpf(random.random())*mp.mpf("1.83"); vp = mp.mpf("-0.20") + mp.mpf(random.random())*mp.mpf("0.10"); nB += 1
    for c in (1, -1, 0):
        k = kern(q, qp, vp, c, mp); rn, Dv, tv, rv = vec(q, qp, vp, c); r, D, r_q, r_qp, D_q, D_qp, D_vp, Nn = geom(q, qp, vp, c, 1, mp)
        worstx[c] = max(worstx[c], abs(k["r"] - rn), abs(k["D"] - Dv), abs(k["h"] - tv), abs(mp.mpf(SIG[c])/(2*k["r"]*k["D"]) - rv), abs((1 + r_qp*vp) - D), abs(r - rn), abs(D - Dv))
        if c != 0 and Dv > 0 and (tv > 0) != (Nfun(q, qp) > 0): sign_okx = False
out["controls"].append({"name": "(X2) known, EXTENSION strips: closed forms (both code paths) vs direct vectors at 150 points with q' in [1.80, 1.83] (w' in [-0.20, 0.45]) and 150 points with w' in [-0.20, -0.10] (q' in [0, 1.83]), receiver q in [1.45, 2.10], three classes; tangent-hit sign = sign N for meridional classes", "n_qp_strip": nA, "n_wp_strip": nB, "max_abs_diff": {NAME[c]: mp.nstr(worstx[c], 5) for c in worstx}, "pass": bool(all(w < mp.mpf("1e-30") for w in worstx.values()) and nA == 150 and nB == 150 and sign_okx)})
# ---- geomx (X3): SWAPPED-SIGN negatives at an extension point (q, q', w') = (1.70, 1.82, -0.15)
qx, qpx, vpx = mp.mpf("1.70"), mp.mpf("1.82"), mp.mpf("-0.15"); dx = {}; okx3 = True
for c in (1, -1, 0):
    kk = kern(qx, qpx, vpx, c, mp); _, Dflip, _, _ = vec(qx, qpx, vpx, c, flip=-1); rv_, Dv_, tv_, _ = vec(qx, qpx, vpx, c)
    swap_cls = kern(qx, qpx, vpx, (-c if c != 0 else 1), mp); swap_rs = kern(qpx, qx, vpx, c, mp)
    e1 = abs(kk["D"] - Dflip); e2 = abs(swap_cls["r"] - rv_) + abs(swap_cls["h"] - tv_); e3 = abs(swap_rs["h"] - tv_)
    dx[NAME[c]] = {"D": mp.nstr(kk["D"], 15), "D_velocity_flipped_vector": mp.nstr(Dflip, 15), "class_swapped_diff": mp.nstr(e2, 8), "receiver_source_swapped_tangent_diff": mp.nstr(e3, 8), "true_matches_vector": bool(abs(kk["D"] - Dv_) < mp.mpf("1e-30") and abs(kk["h"] - tv_) < mp.mpf("1e-30"))}
    okx3 = okx3 and e1 > mp.mpf("1e-3") and e2 > mp.mpf("1e-3") and dx[NAME[c]]["true_matches_vector"] and (c == 0 or e3 > mp.mpf("1e-3"))
out["controls"].append({"name": "(X3) NEGATIVES, swapped signs at the extension point (1.70, 1.82, -0.15): (i) source velocity sign flipped changes D_t by > 1e-3; (ii) the other class's geometry (unlike<->like; antipode->unlike) differs from the vector chord/tangent hit by > 1e-3; (iii) receiver and source exchanged changes the meridional tangent hit by > 1e-3; the true closed forms match the vector to 1e-30", "detail": dx, "pass": bool(okx3)})
qh = mp.pi/2; hk = kern(qh, mp.mpf(0), mp.mpf(0), 0, mp)["h"]; dk = dh_dt(qh, mp.mpf(2)/5, mp.mpf(0), mp.mpf(0), mp.mpf(0), 0, mp)
out["controls"].append({"name": "(H1) EXACT HAND-KNOWN: antipode class, static source q' = 0, receiver q = pi/2, qdot = 2/5: h_A = sqrt2/4 and dh_A/dt = 3 sqrt2/20", "h": mp.nstr(hk, 30), "dh_dt": mp.nstr(dk, 30), "hand_dh_dt": mp.nstr(3*mp.sqrt(2)/20, 30), "pass": bool(abs(hk - mp.sqrt(2)/4) < mp.mpf("1e-35") and abs(dk - 3*mp.sqrt(2)/20) < mp.mpf("1e-35"))})
q, qp, vp = mp.mpf("1.7"), mp.mpf("1.2"), mp.mpf("0.4"); det = {}; okW1 = True
for c in (1, -1, 0):
    D = kern(q, qp, vp, c, mp)["D"]; _, Dw, _, _ = vec(q, qp, vp, c, flip=-1); det[NAME[c]] = {"D_closed": mp.nstr(D, 15), "D_wrong_velocity": mp.nstr(Dw, 15)}; okW1 = okW1 and abs(D - Dw) > mp.mpf("1e-3")
out["controls"].append({"name": "(W1) negative (sign flip): source velocity sign flipped at (1.7, 1.2, 0.4) changes D_t by > 1e-3 in every class", "detail": det, "pass": bool(okW1)})
Mv = Mfun(q, qp); rU = kern(q, qp, vp, 1, mp)["r"]; D_true = vec(q, qp, vp, 1)[1]; D_label = 1 - vp*abs(Mv)/rU
out["controls"].append({"name": "(W3) negative: the OLD LABEL imposed (unlike D computed as 1 - v'|M|/r, i.e. approach assumed) at (1.7, 1.2, 0.4), where M < 0, differs from the vector D_t", "M": mp.nstr(Mv, 12), "N": mp.nstr(Nfun(q, qp), 12), "D_vector": mp.nstr(D_true, 15), "D_old_label": mp.nstr(D_label, 15), "pass": bool(Mv < 0 and D_true > 1 and abs(D_true - D_label) > mp.mpf("1e-3"))})
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
for tK in (mp.mpf("5.1"), mp.mpf("5.6")):
    st, info = states(tK); qt, vt, at = hist(tK); cf = contributions(qt, vt, at, st, 1, mp)
    e1 = abs(cf["dlambda_dt"] - rich(lambda x: lam_parts(x)["lambda_hat"], tK)); e2 = abs(cf["d_arad_dt"] - rich(lambda x: lam_parts(x)["a_rad"], tK)); okK2 = okK2 and e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12")
    row = {"q": mp.nstr(qt, 8), "qdot": mp.nstr(vt, 8), "classes": info, "dlambda_closed": mp.nstr(cf["dlambda_dt"], 22), "dlambda_abs_err": mp.nstr(e1, 5), "darad_abs_err": mp.nstr(e2, 5), "jerk": {}}
    tot_c = 0; tot_f = 0
    for c in (1, -1, 0):
        cj = dh_dt(qt, vt, st[c][0], st[c][1], st[c][2], c, mp); fj = rich(lambda x, c=c: hsum(x)[c], tK); e = abs(cj - fj); okK3 = okK3 and e < mp.mpf("1e-12"); tot_c += MULT[c]*gm*cj; tot_f += MULT[c]*gm*fj
        row["jerk"][NAME[c]] = {"closed": mp.nstr(cj, 20), "abs_err": mp.nstr(e, 5)}
    row["dqddot_dt_closed"] = mp.nstr(tot_c, 20); row["dqddot_dt_fd"] = mp.nstr(tot_f, 20); k2[mp.nstr(tK, 3)] = row
out["controls"].append({"name": "(K2) NUMERICAL prescribed-history control: d(lambda_hat)/dt and d(a_rad)/dt closed forms vs Richardson differences on an exactly known history with a generated segment, NEW box, t = 5.1 (q about 1.55) and t = 5.6 (q about 1.86)", "detail": k2, "pass": bool(okK2)})
out["controls"].append({"name": "(K3) NUMERICAL prescribed-history control: each class's dh_c/dt and d(qddot)/dt closed forms vs Richardson differences, same history and times (values inside the K2 detail)", "pass": bool(okK3)})
tK = mp.mpf("5.6"); stw, _ = states(tK, wrong=1); sto, _ = states(tK, omit=1); st, _ = states(tK); qt, vt, at = hist(tK)
a_ = contributions(qt, vt, at, st, 1, mp)["dlambda_dt"]; b_ = contributions(qt, vt, at, stw, 1, mp)["dlambda_dt"]; ja = dh_dt(qt, vt, st[1][0], st[1][1], st[1][2], 1, mp); jb = dh_dt(qt, vt, stw[1][0], stw[1][1], stw[1][2], 1, mp)
out["controls"].append({"name": "(W2) negative: the pre-seam acceleration used for the unlike source beyond the seam at t = 5.6 changes d(lambda_hat)/dt and dh_U/dt by more than 1e-6", "dlambda": [mp.nstr(a_, 15), mp.nstr(b_, 15)], "dhU": [mp.nstr(ja, 15), mp.nstr(jb, 15)], "pass": bool(abs(a_ - b_) > mp.mpf("1e-6") and abs(ja - jb) > mp.mpf("1e-6"))})
fdU = rich(lambda x: hsum(x)[1], tK); jo = dh_dt(qt, vt, sto[1][0], sto[1][1], sto[1][2], 1, mp); co = contributions(qt, vt, at, sto, 1, mp)["dlambda_dt"]
out["controls"].append({"name": "(W4) negative (acceleration omission): the unlike source acceleration set to zero at t = 5.6 moves dh_U/dt away from the Richardson difference and changes d(lambda_hat)/dt, each by more than 1e-6", "dhU_true_omitted_fd": [mp.nstr(ja, 15), mp.nstr(jo, 15), mp.nstr(fdU, 15)], "dlambda": [mp.nstr(a_, 15), mp.nstr(co, 15)], "pass": bool(abs(jo - fdU) > mp.mpf("1e-6") and abs(ja - fdU) < mp.mpf("1e-12") and abs(a_ - co) > mp.mpf("1e-6"))})
jf = dh_dt(qt, vt, st[1][0], -st[1][1], st[1][2], 1, mp)
out["controls"].append({"name": "(W5) negative (sign flip): the delayed speed entered with the wrong sign in dh_U/dt at t = 5.6 is rejected by the Richardson difference (difference > 1e-6)", "dhU_flipped": mp.nstr(jf, 15), "pass": bool(abs(jf - fdU) > mp.mpf("1e-6"))})
# ---- added controls (turning-point campaign)
# (H2) EXACT HAND-KNOWN radial derivative: static sources at q' = 0 for all classes (w' = 0, a' = 0, D = 1), receiver q = pi/2, qdot = 2/5:
# a_r = g [1/r_L - 1/r_U - 1/(2 r_A)], r_U^2 = 2 - sqrt2 sin q, r_L^2 = 2 + sqrt2 sin q, r_A = 2 cos(q/2);
# da_r/dt = g qdot [ -sqrt2 cos q/(2 r_L^3) - sqrt2 cos q/(2 r_U^3) - sin(q/2)/(2 r_A^2) ]; with qddot = 0 also dl/dt = -da_r/dt.
qh = mp.pi/2; vh = mp.mpf(2)/5; st0 = {c: (mp.mpf(0), mp.mpf(0), mp.mpf(0)) for c in (1, -1, 0)}; cf0 = contributions(qh, vh, mp.mpf(0), st0, 1, mp)
rUh = mp.sqrt(2 - mp.sqrt(2)*mp.sin(qh)); rLh = mp.sqrt(2 + mp.sqrt(2)*mp.sin(qh)); rAh = 2*mp.cos(qh/2); gm = mp.mpf(1)/10
ar_h = gm*(1/rLh - 1/rUh - 1/(2*rAh)); dar_h = gm*vh*(-mp.sqrt(2)*mp.cos(qh)/(2*rLh**3) - mp.sqrt(2)*mp.cos(qh)/(2*rUh**3) - mp.sin(qh/2)/(2*rAh**2))
out["controls"].append({"name": "(H2) EXACT HAND-KNOWN radial account: static sources at q' = 0, receiver q = pi/2, qdot = 2/5, qddot = 0: a_r and da_r/dt from the hand formula; dl/dt = -da_r/dt", "a_r": mp.nstr(cf0["a_rad"], 25), "a_r_hand": mp.nstr(ar_h, 25), "da_r_dt": mp.nstr(cf0["d_arad_dt"], 25), "da_r_dt_hand": mp.nstr(dar_h, 25), "dl_dt": mp.nstr(cf0["dlambda_dt"], 25),
    "pass": bool(abs(cf0["a_rad"] - ar_h) < mp.mpf("1e-35") and abs(cf0["d_arad_dt"] - dar_h) < mp.mpf("1e-35") and abs(cf0["dlambda_dt"] + dar_h) < mp.mpf("1e-35"))})
# (K2b) NUMERICAL prescribed-history control on a smooth history that turns: q(s) = 1.45 + 0.3 sin(0.5 (s - 2)); at t = 7.2 the receiver w < 0 and the unlike source w' < 0
hist_old = hist
def hist(s):
    x = mp.mpf("0.5")*(s - 2); return mp.mpf("1.45") + mp.mpf("0.3")*mp.sin(x), mp.mpf("0.15")*mp.cos(x), -mp.mpf("0.075")*mp.sin(x)
tK = mp.mpf("7.2"); st, info = states(tK); qt, vt, at = hist(tK); cf = contributions(qt, vt, at, st, 1, mp)
e1 = abs(cf["dlambda_dt"] - rich(lambda x: lam_parts(x)["lambda_hat"], tK)); e2 = abs(cf["d_arad_dt"] - rich(lambda x: lam_parts(x)["a_rad"], tK)); ejs = {}
for c in (1, -1, 0): ejs[NAME[c]] = mp.nstr(abs(dh_dt(qt, vt, st[c][0], st[c][1], st[c][2], c, mp) - rich(lambda x, c=c: hsum(x)[c], tK)), 5)
stf = {c: ((st[c][0], -st[c][1], st[c][2]) if c == 1 else st[c]) for c in st}; cff = contributions(qt, vt, at, stf, 1, mp); fdr = rich(lambda x: lam_parts(x)["a_rad"], tK)
out["controls"].append({"name": "(K2b) NUMERICAL prescribed-history control, smooth turning history q(s) = 1.45 + 0.3 sin(0.5 (s - 2)) at t = 7.2 (receiver w < 0, unlike source w' < 0): d(a_r)/dt, dl/dt and each dh_c/dt against Richardson differences", "q": mp.nstr(qt, 8), "w": mp.nstr(vt, 8), "classes": info, "dl_err": mp.nstr(e1, 5), "dar_err": mp.nstr(e2, 5), "dh_err": ejs,
    "pass": bool(vt < 0 and mp.mpf(info["unlike"]["v_delayed"]) < 0 and mp.mpf("1.45") <= qt <= mp.mpf("2.10") and e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12") and all(mp.mpf(v) < mp.mpf("1e-12") for v in ejs.values()))})
out["controls"].append({"name": "(W6) negative (sign flip): the unlike delayed velocity entered with the wrong sign in d(a_r)/dt at t = 7.2 is rejected by the Richardson difference (difference > 1e-6)", "dar_true": mp.nstr(cf["d_arad_dt"], 15), "dar_flipped": mp.nstr(cff["d_arad_dt"], 15), "dar_fd": mp.nstr(fdr, 15), "pass": bool(abs(cff["d_arad_dt"] - fdr) > mp.mpf("1e-6"))})
sto = {c: ((st[c][0], st[c][1], mp.mpf(0)) if c == 1 else st[c]) for c in st}; cfo = contributions(qt, vt, at, sto, 1, mp)
out["controls"].append({"name": "(W7) negative (acceleration omission): the unlike source acceleration set to zero changes d(a_r)/dt at t = 7.2 by more than 1e-6 and is rejected by the Richardson difference", "dar_omitted": mp.nstr(cfo["d_arad_dt"], 15), "pass": bool(abs(cfo["d_arad_dt"] - fdr) > mp.mpf("1e-6"))})
# ---- geomx (X4): NUMERICAL prescribed-history control REACHING THE EXTENSION. q(s) = 1.46 + 0.36 sin(0.5 (s - 2)) (maximum 1.82); times chosen by rule:
# the first of 6.7..7.0 at which some class reads a source with q' > 1.80, and the first of 7.3..7.6 at which the like source has w' < -0.10 (receiver q >= 1.45).
def hist(s):
    x = mp.mpf("0.5")*(s - 2); return mp.mpf("1.46") + mp.mpf("0.36")*mp.sin(x), mp.mpf("0.18")*mp.cos(x), -mp.mpf("0.09")*mp.sin(x)
x4 = {}; okx4 = True; tq = tw = None
for tc in ("6.7", "6.8", "6.9", "7.0"):
    st_, _ = states(mp.mpf(tc))
    if max(st_[c][0] for c in (1, -1, 0)) > mp.mpf("1.80"): tq = mp.mpf(tc); break
for tc in ("7.3", "7.4", "7.5", "7.6"):
    st_, _ = states(mp.mpf(tc))
    if st_[-1][1] < mp.mpf("-0.10") and hist(mp.mpf(tc))[0] >= mp.mpf("1.45"): tw = mp.mpf(tc); break
for lab, tK in (("source_qp_beyond_1.80", tq), ("like_source_wp_below_-0.10", tw)):
    if tK is None: okx4 = False; x4[lab] = "no time found by the rule"; continue
    st, info = states(tK); qt, vt, at = hist(tK); cf = contributions(qt, vt, at, st, 1, mp)
    fdl = rich(lambda x: lam_parts(x)["lambda_hat"], tK); fdr = rich(lambda x: lam_parts(x)["a_rad"], tK)
    e1 = abs(cf["dlambda_dt"] - fdl); e2 = abs(cf["d_arad_dt"] - fdr); ejs = {}
    for c in (1, -1, 0): ejs[NAME[c]] = abs(dh_dt(qt, vt, st[c][0], st[c][1], st[c][2], c, mp) - rich(lambda x, c=c: hsum(x)[c], tK))
    inbox = bool(mp.mpf("1.45") <= qt <= mp.mpf("2.10") and all(mp.mpf(0) <= st[c][0] <= mp.mpf("1.83") and mp.mpf("-0.20") <= st[c][1] <= mp.mpf("0.45") for c in (1, -1, 0)))
    stf = {c: ((st[c][0], -st[c][1], st[c][2]) if c == -1 else st[c]) for c in st}; sto = {c: ((st[c][0], st[c][1], mp.mpf(0)) if c == -1 else st[c]) for c in st}
    neg_flip = bool(abs(contributions(qt, vt, at, stf, 1, mp)["d_arad_dt"] - fdr) > mp.mpf("1e-6")); neg_omit = bool(abs(contributions(qt, vt, at, sto, 1, mp)["dlambda_dt"] - fdl) > mp.mpf("1e-6"))
    ok_ = bool(e1 < mp.mpf("1e-12") and e2 < mp.mpf("1e-12") and all(v < mp.mpf("1e-12") for v in ejs.values()) and inbox and neg_flip and neg_omit)
    x4[lab] = {"t": mp.nstr(tK, 4), "q": mp.nstr(qt, 8), "w": mp.nstr(vt, 8), "classes": info, "dl_err": mp.nstr(e1, 5), "dar_err": mp.nstr(e2, 5), "dh_err": {k_: mp.nstr(v, 5) for k_, v in ejs.items()}, "all_inside_extended_box": inbox, "neg_like_velocity_flip_rejected": neg_flip, "neg_like_acceleration_omitted_rejected": neg_omit, "pass": ok_}
    okx4 = okx4 and ok_
out["controls"].append({"name": "(X4) NUMERICAL prescribed-history control reaching the extension (q(s) = 1.46 + 0.36 sin(0.5 (s - 2))): at a time where a class reads q' > 1.80 and at a time where the like source has w' < -0.10, dl/dt, d(a_r)/dt and each dh_c/dt closed forms agree with Richardson differences to 1e-12, every read lies in the extended box; NEGATIVES at both times: the like delayed velocity sign-flipped (in d(a_r)/dt) and the like source acceleration omitted (in dl/dt) are rejected by > 1e-6", "detail": x4, "pass": bool(okx4)})
hist = hist_old
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps(out["controls"]), flush=True)
json.dump(out, open(OUT_PATH, "w"), indent=1)
if not out["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- TARGET: subdivision of the new box
mp.dps = 30; iv.dps = 30
nq, nqp = 65, 183; ext = {};      # geomx (X5): source q' cells over [0, 1.83] (width 0.01)
QA, QB, PA_, PB = lo(iv.mpf("1.45")), up(iv.mpf("2.10")), mp.mpf(0), up(iv.mpf("1.83"))      # box read outward from its decimals
EQ = [QA] + [QA + (QB - QA)*i/nq for i in range(1, nq)] + [QB]; EP = [PA_] + [PA_ + (PB - PA_)*j/nqp for j in range(1, nqp)] + [PB]      # exact first/last edges, shared internal edges
assert all(EQ[i] < EQ[i + 1] for i in range(nq)) and all(EP[j] < EP[j + 1] for j in range(nqp)) and EQ[0] == QA and EQ[-1] == QB and EP[0] == PA_ and EP[-1] == PB
cnt = {"N_pos": 0, "N_neg": 0, "N_und": 0, "M_pos": 0, "M_neg": 0, "M_und": 0}
def upd(key, val, how):
    if key not in ext or (how == "min" and val < ext[key]) or (how == "max" and val > ext[key]): ext[key] = val
for i in range(nq):
    qc = I(EQ[i], EQ[i + 1])
    for j in range(nqp):
        pc = I(EP[j], EP[j + 1]); cc = iv.cos(qc + pc); ss = iv.sin(qc + pc)
        Nn = cc/S2 - iv.cos(qc)*iv.sin(pc)/2; Mm = cc/S2 - iv.sin(qc)*iv.cos(pc)/2
        rU = iv.sqrt(2 - S2*ss + iv.sin(qc)*iv.sin(pc)); rL = iv.sqrt(2 + S2*ss - iv.sin(qc)*iv.sin(pc)); rA = 2*iv.cos((qc - pc)/2)
        cnt["N_pos" if lo(Nn) > 0 else ("N_neg" if up(Nn) < 0 else "N_und")] += 1; cnt["M_pos" if lo(Mm) > 0 else ("M_neg" if up(Mm) < 0 else "M_und")] += 1
        for key, val, how in (("N_min", lo(Nn), "min"), ("N_max", up(Nn), "max"), ("M_min", lo(Mm), "min"), ("M_max", up(Mm), "max"), ("rU_min", lo(rU), "min"), ("rL_min", lo(rL), "min"), ("rA_min", lo(rA), "min"),
                              ("MrU_min", lo(Mm/rU), "min"), ("MrU_max", up(Mm/rU), "max"), ("MrL_min", lo(Mm/rL), "min"), ("MrL_max", up(Mm/rL), "max")): upd(key, val, how)
W_LO, W_HI = lo(iv.mpf("-0.20")), up(iv.mpf("0.45"))      # geomx (X5)
def prod_range(a, b): ps = [W_LO*a, W_LO*b, W_HI*a, W_HI*b]; return min(ps), max(ps)
def zero_on(fn, a, b):
    a, b = mp.mpf(a), mp.mpf(b)
    if not (fn(a) > 0 and fn(b) < 0): return None
    for _ in range(120):
        m = (a + b)/2
        if fn(m) > 0: a = m
        else: b = m
    return mp.nstr((a + b)/2, 12)
pU = prod_range(ext["MrU_min"], ext["MrU_max"]); pL = prod_range(ext["MrL_min"], ext["MrL_max"]); pA = prod_range(mp.sin(mp.mpf("-0.19")), mp.sin(mp.mpf("1.05")))
WI = I(W_LO, W_HI); DU_iv = 1 - WI*I(ext["MrU_min"], ext["MrU_max"]); DL_iv = 1 + WI*I(ext["MrL_min"], ext["MrL_max"]); DA_iv = 1 + WI*iv.sin(I(lo(iv.mpf("-0.19")), up(iv.mpf("1.05"))))      # geomx (X5): interval-arithmetic D ranges (outer)
PS = ("0", "0.1", "0.2", "0.3", "0.35", "0.4", "0.5", "0.6", "0.8", "1.0", "1.2", "1.4", "1.6", "1.8")
out["target"] = {"cells": [nq, nqp], "N_range": [s45(ext["N_min"]), s45(ext["N_max"])], "M_range": [s45(ext["M_min"]), s45(ext["M_max"])], "cell_sign_counts": cnt,
    "min_chord_unlike": s45(ext["rU_min"]), "min_chord_like": s45(ext["rL_min"]), "min_chord_antipode_any_order": s45(ext["rA_min"]),
    "M_over_rU_range": [s45(ext["MrU_min"]), s45(ext["MrU_max"])], "M_over_rL_range": [s45(ext["MrL_min"]), s45(ext["MrL_max"])],
    "D_unlike_range_w_in_[-0.20,0.45]": [s45(1 - pU[1]), s45(1 - pU[0])], "D_like_range": [s45(1 + pL[0]), s45(1 + pL[1])], "D_antipode_range_d_in_[-0.38,2.10]": [s45(1 + pA[0]), s45(1 + pA[1])], "D_unlike_interval_outer": J(DU_iv), "D_like_interval_outer": J(DL_iv), "D_antipode_interval_outer": J(DA_iv), "D_all_positive_proved": bool(lo(DU_iv) > 0 and lo(DL_iv) > 0 and lo(DA_iv) > 0),
    "M_zero_q_of_qp_on_[0,1.57]": {p: zero_on(lambda q, p=p: Mfun(q, mp.mpf(p)), "0", "1.57") for p in PS},
    "N_zero_q_of_qp_on_[0,1.57]": {p: zero_on(lambda q, p=p: Nfun(q, mp.mpf(p)), "0", "1.57") for p in PS},
    "N_zero_formula_q_star": {p: (mp.nstr(mp.atan(mp.cot(mp.mpf(p)) - 1/mp.sqrt(2)), 12) if mp.mpf(p) > 0 and mp.cot(mp.mpf(p)) > 1/mp.sqrt(2) else None) for p in PS}}
print(json.dumps(out["target"], indent=0), flush=True); json.dump(out, open(OUT_PATH, "w"), indent=1)
