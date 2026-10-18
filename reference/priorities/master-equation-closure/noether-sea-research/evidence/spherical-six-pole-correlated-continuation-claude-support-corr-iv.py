# Correlated-continuation campaign, support role (emmy-noether): CONTROLS for the correlated evaluation of the radial term r, the support l = -w^2 - r
# and its rate l' = -2 w a - r' on DEPENDENT data (reference section 1). No target on the subject: this file only runs controls.
# Representation: a prescribed smooth history H(s; e) = H0(s) + e1 phi1(s) + e2 phi2(s) (+ remainder kappa where stated), receiver time t = tc + 1e-4 e3;
# latent e in [-1, 1]^3 with meanings: e1 a growing offset of the whole history, e2 a linear drift, e3 the uncertain clock origin. Receiver q, w, a and every
# partner's source state are read from the SAME H at the same e. Evaluators: BOX = all inputs boxed over the whole latent domain independently (correlation
# lost; valid but wide); CORR = latent-parameter subdivision (n^3 sub-boxes, receiver and sources on the same sub-box, roots by containment-checked
# contraction per sub-box), hull. Truth: exact roots by bisection at grid and random latent points (labelled numerical), l and l' by the frozen closed forms.
# Controls: (C1) known dependent data: CORR contains every truth and is not wider than BOX (matched widths and cost reported for r, l, l');
# (C2) independent versus shared: a truth model where the receiver and the sources carry SEPARATE latent parameters, evaluated with separate parameters,
# contains every truth; (N1) lost-correlation in its dangerous form: tying those separate parameters to one shared parameter misses some truth;
# (N2) unjustified intersection: CORR intersected with a shifted box not proved to contain the truth misses the truth or is empty, while CORR
# intersected with BOX (both proved) keeps every truth; (N3) swapped sign of the source sensitivity misses some truth; (N4) an independent source-history
# remainder present in the truth but omitted by the evaluator misses some truth, and kept as an interval remainder contains it.
# v3 (v2 bytes retained as -v2.py): v2 controls N1 and N4 still lacked power at the output level; v3 tests the dangerous tying on an accepted receiver RECTANGLE at the input level (uncovered admissible corners, the coordinator's falsifier) and the omitted remainder at the history level, with output-level results reported; C2 becomes the separate-parameter rectangle evaluation. C1, N2, N3 unchanged. Adds the genuinely KNOWN dependent-data inclusions K-A (exact affine flow with constant w: exact cancellation of q - Q) and K-B (exact correlated polynomial image (e1 + e2)(e1 - e2) with known range [-1, 1] and vertices); numerical truth grids (C1, C2, N3, N4 outputs) are labelled consistency checks.
# v2 (v1 bytes retained as -v1.py): v1 controls N1 and N4 lacked power (effects smaller than the enclosure width); v2 scales the independent perturbations by 5 in C2/N1 (tied evaluator with 8 x 8 sub-boxes) and uses a +-5e-3 remainder in N4. C1, N2, N3 unchanged.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <n>
import os, sys, json, time, random, itertools
print("PID", os.getpid(), flush=True)
EVD = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTC = sys.argv[1]; NSUB = int(sys.argv[2]) if len(sys.argv) > 2 else 3
exec(open(EVD + "spherical-six-pole-like-reception-claude-support-jerk-iv.py").read().split('out = {"controls": []}', 1)[0])
exec(open(EVD + "spherical-six-pole-late-feedback-claude-support-dlambda3-iv.py").read().split('t_begin = time.time(); out = {"controls": [], "target": None}', 1)[0])
mp.dps = 30; iv.dps = 30; outC = {"controls": [], "n": NSUB}; T0 = time.time()
def Iv(a, b): return iv.mpf([mp.mpf(a), mp.mpf(b)])
def lo_(x): return mp.mpf(x.a)
def up_(x): return mp.mpf(x.b)
def J_(x): return [mp.nstr(lo_(x), 20), mp.nstr(up_(x), 20)]
# history pieces with derivatives (value, first, second); L is mp or iv
def H0(s, L): return (L.mpf("0.3")*s - L.mpf("0.01")*s*s + L.mpf("0.0005")*s*s*s, L.mpf("0.3") - L.mpf("0.02")*s + L.mpf("0.0015")*s*s, -L.mpf("0.02") + L.mpf("0.003")*s)
SC = 1      # v2: amplitude scale of the latent sensitivities (5 in the independent-parameter controls C2 and N1)
def P1(s, L): return (SC*L.mpf("0.004")*(1 + L.mpf("0.2")*s), SC*L.mpf("0.0008") + 0*s, 0*s)
def P2(s, L): return (SC*L.mpf("0.002")*s, SC*L.mpf("0.002") + 0*s, 0*s)
def Hs(s, e1, e2, L, sgn=1, kap=0):
    a0 = H0(s, L); b1 = P1(s, L); b2 = P2(s, L); return tuple(a0[i] + sgn*(e1*b1[i] + e2*b2[i]) + (kap if i == 0 else 0) for i in range(3))
TC = mp.mpf("5.1")
def rch(q, qp, c, L):
    if c == 0: return 2*L.cos((q - qp)/2)
    return L.sqrt(2 - c*L.sqrt(2)*L.sin(q + qp) + c*L.sin(q)*L.sin(qp))
def truth(eR1, eR2, eS1, eS2, e3, kap=0):
    """exact (point) evaluation: receiver from (eR1, eR2), sources from (eS1, eS2) and remainder kap; returns (r, l, l')."""
    t = TC + mp.mpf("1e-4")*e3; qR, wR, aR = Hs(t, eR1, eR2, mp); st = {}
    for c in (1, -1, 0):
        lo1, hi1 = t - mp.mpf("2.6"), t - mp.mpf("0.3")
        for _ in range(140):
            m = (lo1 + hi1)/2
            if t - m - rch(qR, Hs(m, eS1, eS2, mp, 1, kap)[0], c, mp) > 0: lo1 = m
            else: hi1 = m
        st[c] = Hs((lo1 + hi1)/2, eS1, eS2, mp, 1, kap)
    cf = contributions(qR, wR, aR, st, 1, mp); return cf["a_rad"], cf["lambda_hat"], cf["dlambda_dt"]
def eval_box(ER1, ER2, ES1, ES2, E3, sgnS=1, KAP=None):
    """interval evaluation on given latent boxes (receiver and sources may use different or identical boxes)."""
    t = iv.mpf(TC) + iv.mpf("1e-4")*E3; qR, wR, aR = Hs(t, ER1, ER2, iv); st = {}; kap = KAP if KAP is not None else 0
    for c in (1, -1, 0):
        S = t - Iv("2.6", "2.6"); S = iv.mpf([lo_(t) - mp.mpf("2.6"), up_(t) - mp.mpf("0.3")])
        for _ in range(60):
            Sn = t - rch(qR, Hs(S, ES1, ES2, iv, sgnS, kap)[0], c, iv); lo2 = max(lo_(Sn), lo_(S)); hi2 = min(up_(Sn), up_(S))
            if lo2 > hi2: return None
            Sn = iv.mpf([lo2, hi2]); shr = (up_(S) - lo_(S)) - (hi2 - lo2); S = Sn
            if shr < (hi2 - lo2)*mp.mpf("1e-6"): break
        st[c] = Hs(S, ES1, ES2, iv, sgnS, kap)
    cf = contributions(qR, wR, aR, st, 1, iv); return cf["a_rad"], cf["lambda_hat"], cf["dlambda_dt"]
def hullv(a, b): return a if b is None else (b if a is None else tuple(iv.mpf([min(lo_(x), lo_(y)), max(up_(x), up_(y))]) for x, y in zip(a, b)))
def parts(n): return [Iv(-1 + mp.mpf(2)*i/n, -1 + mp.mpf(2)*(i + 1)/n) for i in range(n)]
FULL = Iv(-1, 1)
def corr_shared(n, sgnS=1, KAP=None):
    h = None
    for E1, E2, E3 in itertools.product(parts(n), parts(n), parts(n)):
        r_ = eval_box(E1, E2, E1, E2, E3, sgnS, KAP)
        if r_ is None: return None
        h = hullv(h, r_)
    return h
def inside_all(enc, truths): return enc is not None and all(lo_(enc[i]) <= tv[i] <= up_(enc[i]) for tv in truths for i in range(3))
def w3(enc): return [mp.nstr(up_(x) - lo_(x), 5) for x in enc]
random.seed(1014)
pts = [tuple(mp.mpf(v) for v in p) for p in itertools.product((-1, 0, 1), repeat=3)] + [tuple(mp.mpf(2*random.random() - 1) for _ in range(3)) for _ in range(15)]
TR = [truth(e1, e2, e1, e2, e3) for e1, e2, e3 in pts]
t1 = time.time(); BOX = eval_box(FULL, FULL, FULL, FULL, FULL); tb = time.time() - t1
t1 = time.time(); CORR = corr_shared(NSUB); tc = time.time() - t1
okC1 = inside_all(CORR, TR) and inside_all(BOX, TR) and all((up_(CORR[i]) - lo_(CORR[i])) <= (up_(BOX[i]) - lo_(BOX[i])) for i in range(3))
outC["controls"].append({"name": "(C1) KNOWN dependent data (shared latent e1, e2 for receiver and sources; clock e3): CORR (latent subdivision) contains all %d truths and is not wider than BOX for r, l, l'; matched widths and cost" % len(TR),
    "BOX": {"r": J_(BOX[0]), "l": J_(BOX[1]), "lp": J_(BOX[2]), "widths": w3(BOX), "cost_s": round(tb, 3)}, "CORR": {"r": J_(CORR[0]), "l": J_(CORR[1]), "lp": J_(CORR[2]), "widths": w3(CORR), "cost_s": round(tc, 3)},
    "truth_range_lp": [mp.nstr(min(t_[2] for t_ in TR), 15), mp.nstr(max(t_[2] for t_ in TR), 15)], "pass": bool(okC1)})
# (C2) / (N1), v3: an accepted RECTANGLE for the receiver state, q = q(t) + 0.01 xi and w = w(t) + 0.01 eta with INDEPENDENT xi, eta (sources unperturbed).
# C2: the evaluator with separate parameters covers every rectangle corner (input level) and its outputs contain every truth.
# N1: the evaluator that TIES eta := xi (8 sub-boxes) leaves admissible corners uncovered (input level: the coordinator's falsifier "a missing admissible
# rectangle corner"); the output-level miss is reported as information.
def ev_rect(X, Y): 
    t = iv.mpf(TC); qR, wR, aR = Hs(t, Iv(0, 0), Iv(0, 0), iv); qR = qR + iv.mpf("0.01")*X; wR = wR + iv.mpf("0.01")*Y; st = {}
    for c in (1, -1, 0):
        S_ = iv.mpf([lo_(t) - mp.mpf("2.6"), up_(t) - mp.mpf("0.3")])
        for _ in range(60):
            Sn = t - rch(qR, Hs(S_, Iv(0, 0), Iv(0, 0), iv)[0], c, iv); l2, h2_ = max(lo_(Sn), lo_(S_)), min(up_(Sn), up_(S_))
            if l2 > h2_: return None
            shr = (up_(S_) - lo_(S_)) - (h2_ - l2); S_ = iv.mpf([l2, h2_])
            if shr < (h2_ - l2)*mp.mpf("1e-6"): break
        st[c] = Hs(S_, Iv(0, 0), Iv(0, 0), iv)
    cf = contributions(qR, wR, aR, st, 1, iv); return (cf["a_rad"], cf["lambda_hat"], cf["dlambda_dt"]), (qR, wR)
def truth_rect(x, y):
    t = TC; qR, wR, aR = Hs(t, 0, 0, mp); qR += mp.mpf("0.01")*x; wR += mp.mpf("0.01")*y; st = {}
    for c in (1, -1, 0):
        lo1, hi1 = t - mp.mpf("2.6"), t - mp.mpf("0.3")
        for _ in range(140):
            m = (lo1 + hi1)/2
            if t - m - rch(qR, Hs(m, 0, 0, mp)[0], c, mp) > 0: lo1 = m
            else: hi1 = m
        st[c] = Hs((lo1 + hi1)/2, 0, 0, mp)
    cf = contributions(qR, wR, aR, st, 1, mp); return (cf["a_rad"], cf["lambda_hat"], cf["dlambda_dt"]), (qR, wR)
corners = [(mp.mpf(x), mp.mpf(y)) for x in (-1, 0, 1) for y in (-1, 0, 1)]; TRr = [truth_rect(x, y) for x, y in corners]
def covers(subs, pt): return any(lo_(qq) <= pt[0] <= up_(qq) and lo_(ww) <= pt[1] <= up_(ww) for qq, ww in subs)
sep = [ev_rect(X, Y) for X in parts(3) for Y in parts(3)]; tie = [ev_rect(X, X) for X in parts(8)]
hs = None; ht = None
for o, _ in sep: hs = hullv(hs, o)
for o, _ in tie: ht = hullv(ht, o)
cov_sep = all(covers([b for _, b in sep], tr[1]) for tr in TRr); cov_tie = all(covers([b for _, b in tie], tr[1]) for tr in TRr)
outC["controls"].append({"name": "(C2) independent rectangle: the evaluator with SEPARATE parameters for receiver q and w covers every admissible corner (input level) and contains every truth (output level)", "enc_lp": J_(hs[2]), "pass": bool(cov_sep and inside_all(hs, [tr[0] for tr in TRr]))})
outC["controls"].append({"name": "(N1) negative, lost-correlation in its dangerous form: TYING w's parameter to q's (eta := xi) leaves admissible rectangle corners uncovered (input level); output-level miss reported", "corners_uncovered": [[mp.nstr(tr[1][0], 8), mp.nstr(tr[1][1], 8)] for tr in TRr if not covers([b for _, b in tie], tr[1])], "output_misses_some_truth": bool(not inside_all(ht, [tr[0] for tr in TRr])), "pass": bool(not cov_tie)})
# (N2), (N3) unchanged from v1
wlp = up_(CORR[2]) - lo_(CORR[2]); SHIFT = tuple(iv.mpf([lo_(x) + 2*(up_(x) - lo_(x)), up_(x) + 2*(up_(x) - lo_(x))]) for x in CORR)
def inter3(a, b):
    out_ = []
    for x, y in zip(a, b):
        l_, u_ = max(lo_(x), lo_(y)), min(up_(x), up_(y))
        if l_ > u_: return None
        out_.append(iv.mpf([l_, u_]))
    return tuple(out_)
bad = inter3(CORR, SHIFT); good = inter3(CORR, BOX)
outC["controls"].append({"name": "(N2) negative: CORR intersected with a shifted box NOT proved to contain the truth is empty or misses the truth; CORR intersected with BOX (both proved) keeps every truth", "pass": bool((bad is None or not inside_all(bad, TR)) and inside_all(good, TR))})
h3 = corr_shared(NSUB, sgnS=-1)
outC["controls"].append({"name": "(N3) negative: the source-history sensitivity entered with the swapped sign misses some truth (or the contraction empties)", "pass": bool(h3 is None or not inside_all(h3, TR))})
# (N4) v3: an independent source-history remainder kappa in [-0.03, 0.03] present in the truth. Input level: the evaluator's history enclosure at s = 4.0 omits
# the truth when the remainder is omitted and contains it when the remainder is kept; output level: the kept-remainder enclosure contains every truth.
KAPS = (mp.mpf("-0.03"), mp.mpf("0.03")); s4 = mp.mpf(4)
hist_omit = Hs(iv.mpf(s4), FULL, FULL, iv)[0]; hist_keep = Hs(iv.mpf(s4), FULL, FULL, iv, 1, Iv("-0.03", "0.03"))[0]
tv4 = [Hs(s4, e1, e2, mp, 1, k)[0] for (e1, e2, e3) in pts[:27] for k in KAPS]
TR4 = [truth(e1, e2, e1, e2, e3, k) for (e1, e2, e3) in pts[:27:4] for k in KAPS]
h4good = corr_shared(NSUB, KAP=Iv("-0.03", "0.03")); h4bad = corr_shared(NSUB)
outC["controls"].append({"name": "(N4) negative/known: independent source-history remainder +-0.03: omitted -> the history enclosure misses the true history (input level); kept -> it contains it and the output enclosure contains every truth", "omitted_output_misses": bool(h4bad is None or not inside_all(h4bad, TR4)),
    "pass": bool(not all(lo_(hist_omit) <= v <= up_(hist_omit) for v in tv4) and all(lo_(hist_keep) <= v <= up_(hist_keep) for v in tv4) and inside_all(h4good, TR4))})
# (K-A) EXACT affine flow with constant w (genuinely known dependent data): H(s) = 0.2 + 0.3 s + 0.01 e1, e1 in [-1, 1] shared by receiver and source.
# Known: q(t) - Q(s) = 0.3 (t - s) for every e1 (exact cancellation); the joint image of (q(t), Q(s)) is a segment. The latent subdivision with n cells
# must enclose 0.3 (t - s) on every cell and its hull width must be at most 2 * 0.02 / n (two boxes of width 0.02/n subtracted); the independent box
# (correlation lost) has width 0.04.
tA, sA = mp.mpf("5.1"), mp.mpf("4.0"); exA = mp.mpf("0.3")*(tA - sA); okA = True; wmax = mp.mpf(0)
for EE in parts(NSUB*4):
    d = (iv.mpf("0.2") + iv.mpf("0.3")*iv.mpf(tA) + iv.mpf("0.01")*EE) - (iv.mpf("0.2") + iv.mpf("0.3")*iv.mpf(sA) + iv.mpf("0.01")*EE); okA = okA and lo_(d) <= exA <= up_(d); wmax = max(wmax, up_(d) - lo_(d))
dbox = (iv.mpf("0.2") + iv.mpf("0.3")*iv.mpf(tA) + iv.mpf("0.01")*FULL) - (iv.mpf("0.2") + iv.mpf("0.3")*iv.mpf(sA) + iv.mpf("0.01")*FULL)
outC["controls"].append({"name": "(K-A) EXACT affine flow with constant w: every latent cell encloses the exact q(t) - Q(s) = 0.33; cell width at most 2 x 0.02 / n; the independent box has width 0.04", "max_cell_width": mp.nstr(wmax, 6), "box_width": mp.nstr(up_(dbox) - lo_(dbox), 6), "pass": bool(okA and wmax <= mp.mpf("0.04")/(NSUB*4) + mp.mpf("1e-25") and abs((up_(dbox) - lo_(dbox)) - mp.mpf("0.04")) < mp.mpf("1e-25"))})
# (K-B) EXACT correlated polynomial image with known range and vertices: (x, y) = (e1 + e2, e1 - e2), F = x y = e1^2 - e2^2, exact range [-1, 1]
# (attained at the vertices e = (1, 0), (0, 1) etc. of the latent square). Latent subdivision must contain [-1, 1] and converge to it (excess at most
# 4/n + 4/n^2 here); the box evaluation x in [-2, 2], y in [-2, 2] gives [-4, 4] (lost correlation).
nB = NSUB*8; hB = None
for E1 in parts(nB):
    for E2 in parts(nB):
        v = (E1 + E2)*(E1 - E2); hB = v if hB is None else iv.mpf([min(lo_(hB), lo_(v)), max(up_(hB), up_(v))])
vbox = (FULL + FULL)*(FULL - FULL); exc = (up_(hB) - lo_(hB)) - 2
outC["controls"].append({"name": "(K-B) EXACT correlated polynomial image: F = (e1 + e2)(e1 - e2) has exact range [-1, 1] with known vertices; the latent subdivision contains it with excess at most 4/n + 4/n^2; the independent box gives [-4, 4]", "subdivision": J_(hB), "box": J_(vbox), "excess": mp.nstr(exc, 6),
    "pass": bool(lo_(hB) <= -1 and up_(hB) >= 1 and exc <= mp.mpf(4)/nB + mp.mpf(4)/nB**2 and lo_(vbox) == -4 and up_(vbox) == 4)})
outC["controls_all_pass"] = all(c["pass"] for c in outC["controls"]); outC["wall_s"] = time.time() - T0
print(json.dumps(outC, indent=0)[:5000], flush=True); json.dump(outC, open(OUTC, "w"), indent=1)
