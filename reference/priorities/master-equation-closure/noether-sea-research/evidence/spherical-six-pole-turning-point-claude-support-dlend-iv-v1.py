# Turning-point campaign, support role (emmy-noether): SUBDIVIDED END-INSTANT enclosure of dl/dt at certified step ends (PI-approved alternative to the
# centered form). Premise: the subject's certified end box (end time interval, q and w end strings). The end box is cut into n x n sub-boxes in (q, w),
# the end time kept whole; the UNION of the sub-boxes is the whole end box, so the hull of the sub-box enclosures is a valid enclosure of dl/dt at the
# true end state. On each sub-box every partner's source time is pinned by this role's containment-checked contraction S <- (t_e - r_c(q, q'(S))) cap S
# (start: the whole-box contraction, itself started from the subject's recorded source range after a residual-sign containment check), the source state
# is looked up on the accepted chain, the tangent acceleration a = sum of tangent terms is evaluated there, and dl/dt = -2 w a - da_r/dt by this role's
# frozen closed forms (contributions with the receiver acceleration supplied).
# Executes this role's slice6-iv.py (6f1de0ee...) first: all lookup and detector controls (exit on failure). Controls of this instrument, before any
# target: (C1) EXACT static-source case: constant history q' = 0 written as exact records; receiver q = pi/3 (point), w in [0.39, 0.41]: dl/dt is linear in
# w there, so its exact range is spanned by the two w endpoints; the n x n hull must contain both and exceed the exact range by less than 1e-12; the
# point value at w = 2/5 satisfies dl/dt + 2 w a = -da_r/dt with the hand formula of the reference (H2); (C2) labelled NUMERICAL grid case on a REAL end box
# (subject step 334): direct evaluations at a 3 x 3 grid of (q, w) points (end time whole) lie inside the hull; (N1) negative: the same box shifted by three
# widths in w gives a hull that misses some true grid value; (N2) negative: omitting the -2 w a term (receiver acceleration set to zero) gives a hull that
# misses some true grid value.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <n> <first step> <last step> <subject slice.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDE = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTD = sys.argv[1]; NS = int(sys.argv[2]); K1, K2 = int(sys.argv[3]), int(sys.argv[4]); SUBJD = sys.argv[5:]
_ad = sys.argv; sys.argv = [_ad[0], OUTD + ".slice6-controls.json"]
exec(open(EVDE + "spherical-six-pole-turning-point-claude-support-slice6-iv.py").read())
sys.argv = _ad; assert out6["controls_all_pass"]
mp.dps = 30; iv.dps = 30; outD = {"controls": [], "n": NS}; tD = time.time()
def rcE(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def contractE(te, qe, c, S0, slabs, check=True, maxit=40):
    if check:
        for sp, want in ((lo(S0), "ge"), (up(S0), "le")):
            rs, why = lookup(I(sp, sp), slabs)
            if rs is None: return None, "refused: " + why
            x = (te - sp) - rcE(qe, rs[0], c)
            if (want == "ge" and lo(x) < 0) or (want == "le" and up(x) > 0): return None, "start interval not proved to contain the root"
    S_ = S0
    for _ in range(maxit):
        rs, why = lookup(S_, slabs)
        if rs is None: return None, "refused during contraction: " + why
        Sn = inter(te - rcE(qe, rs[0], c), S_)
        if Sn is None: return None, "empty intersection"
        shr = wid(S_) - wid(Sn); S_ = Sn
        if shr < wid(S_)*mp.mpf("1e-6"): break
    return S_, "ok"
def F_box(te, qb, wb, Sx, slabs, omit_a=False):
    states = {}; Sn = {}
    for c in (1, -1, 0):
        S_, why = contractE(te, qb, c, Sx[c], slabs, check=False)
        if S_ is None: return None, why
        rs, why = lookup(S_, slabs); states[c] = (rs[0], rs[1], rs[2]); Sn[c] = S_
    r0 = contributions(qb, wb, ZERO, states); a_ = r0["tan_sum"]; r1 = contributions(qb, wb, ZERO if omit_a else a_, states)
    return (r1["dlambda_dt"], a_, r1["lambda_hat"]), "ok"
def end_dl(te, qb, wb, das, slabs, n, omit_a=False):
    Sx = {}
    for c, d_ in das.items():
        S_, why = contractE(te, qb, c, d_, slabs)
        if S_ is None: return None, "class %d: %s" % (c, why)
        Sx[c] = S_
    hullv = None; ah = None
    for i in range(n):
        for k in range(n):
            qs = I(lo(qb) + (up(qb) - lo(qb))*i/n, lo(qb) + (up(qb) - lo(qb))*(i + 1)/n); ws = I(lo(wb) + (up(wb) - lo(wb))*k/n, lo(wb) + (up(wb) - lo(wb))*(k + 1)/n)
            r_, why = F_box(te, qs, ws, Sx, slabs, omit_a)
            if r_ is None: return None, why
            hullv = r_[0] if hullv is None else hull(hullv, r_[0]); ah = r_[1] if ah is None else hull(ah, r_[1])
    return (hullv, ah, Sx), "ok"
# ---- (C1) exact static-source case
mp.dps = 40
STAT = [{"src": "sm", "step": 8000 + k, "T": I(mp.mpf(2) + DELTA*k, mp.mpf(2) + DELTA*k), "Q0": I(0, 0), "V0": I(0, 0), "A0": I(0, 0), "AP": I(0, 0), "S": None, "VS": None, "law": None, "certified": True, "Qe": None, "Ve": None} for k in range(400)]
TSH = TSTAR_HI; TSTAR_HI = mp.mpf("-1")
qh = mp.pi/3; teh = I(mp.mpf(5), mp.mpf(5)); dah = {1: I(mp.mpf("3.0"), mp.mpf("4.6")), -1: I(mp.mpf("2.5"), mp.mpf("4.4")), 0: I(mp.mpf("2.5"), mp.mpf("4.4"))}
rC, whyC = end_dl(teh, I(qh, qh), I(mp.mpf("0.39"), mp.mpf("0.41")), dah, STAT, NS)
pts = {}
for wv in ("0.39", "0.40", "0.41"):
    r_, _ = end_dl(teh, I(qh, qh), I(mp.mpf(wv), mp.mpf(wv)), dah, STAT, 1); pts[wv] = r_
okC1 = rC is not None and all(p is not None for p in pts.values())
if okC1:
    v1, v2 = pts["0.39"][0], pts["0.41"][0]; ex_lo = min(lo(v1), lo(v2)); ex_hi = max(up(v1), up(v2))
    rUh = mp.sqrt(2 - mp.sqrt(2)*mp.sin(qh)); rLh = mp.sqrt(2 + mp.sqrt(2)*mp.sin(qh)); rAh = 2*mp.cos(qh/2); wv = mp.mpf("0.4")
    dar_h = mp.mpf(1)/10*wv*(-mp.sqrt(2)*mp.cos(qh)/(2*rLh**3) - mp.sqrt(2)*mp.cos(qh)/(2*rUh**3) - mp.sin(qh/2)/(2*rAh**2))
    mid = pts["0.40"]; chk = mid[0] + 2*wv*mid[1]
    okC1 = bool(lo(rC[0]) <= ex_lo and ex_hi <= up(rC[0]) and (up(rC[0]) - lo(rC[0])) - (ex_hi - ex_lo) < mp.mpf("1e-12") and lo(chk) - mp.mpf("1e-30") <= -dar_h <= up(chk) + mp.mpf("1e-30"))
    outD["controls"].append({"name": "(C1) EXACT static-source case (constant history q' = 0 as exact records; q = pi/3; w in [0.39, 0.41]): the n x n hull contains the exact range spanned by the w endpoints, exceeds it by less than 1e-12, and at w = 2/5 dl/dt + 2 w a equals the hand value -da_r/dt", "hull": J(rC[0]), "exact_range": [s45(ex_lo), s45(ex_hi)], "hand_minus_dar": mp.nstr(-dar_h, 25), "pass": okC1})
else: outD["controls"].append({"name": "(C1) EXACT static-source case", "detail": whyC, "pass": False})
TSTAR_HI = TSH; mp.dps = 30
# ---- (C2) grid on a real end box, (N1) shifted box, (N2) omitted -2wa
SLD = SLABS
d334 = [s for f in SUBJD for s in json.load(open(f))["steps"] if s["step"] == 334]
if d334:
    st = d334[0]; te = I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1])); qb = iv_of(st["end_q_str"]); wb = iv_of(st["end_v_str"]); das = {c: iv_of(st["classes"][n_]["delayed_arg_range"]) for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0))}
    rH, whyH = end_dl(te, qb, wb, das, SLD, NS); grid = []
    for i in range(3):
        for k in range(3):
            qv = lo(qb) + (up(qb) - lo(qb))*i/2; wv = lo(wb) + (up(wb) - lo(wb))*k/2; r_, _ = end_dl(te, I(qv, qv), I(wv, wv), das, SLD, 1); grid.append(r_[0] if r_ else None)
    ok2 = rH is not None and all(g is not None and inside(g, rH[0]) for g in grid)
    outD["controls"].append({"name": "(C2) NUMERICAL grid case on the real end box of subject step 334: 9 direct evaluations at grid points of (q, w) (end time whole) lie inside the n x n hull", "hull": J(rH[0]) if rH else whyH, "grid": [J(g) for g in grid if g is not None], "pass": bool(ok2)})
    wsh = wb + 3*(up(wb) - lo(wb)); rN1, _ = end_dl(te, qb, wsh, das, SLD, NS)
    outD["controls"].append({"name": "(N1) negative: the box shifted by three widths in w misses some true grid value (or is refused)", "pass": bool(rN1 is None or not all(inside(g, rN1[0]) for g in grid))})
    rN2, _ = end_dl(te, qb, wb, das, SLD, NS, omit_a=True)
    outD["controls"].append({"name": "(N2) negative: omitting the -2 w a term misses some true grid value", "hull": J(rN2[0]) if rN2 else None, "pass": bool(rN2 is not None and not all(inside(g, rN2[0]) for g in grid))})
else: outD["controls"].append({"name": "(C2) grid case: subject step 334 not found in the given files", "pass": False})
outD["controls_all_pass"] = all(c["pass"] for c in outD["controls"]); print(json.dumps(outD["controls"])[:3500], flush=True); json.dump(outD, open(OUTD, "w"), indent=1)
if not outD["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target: ends K1..K2
rowsD = []
for f in SUBJD:
    for st in json.load(open(f))["steps"]:
        k = st["step"]
        if k < K1 or k > K2: continue
        if not st.get("certified"): rowsD.append({"step": k, "uncertified": True}); continue
        te = I(mp.mpf(st["t_int"][0]) + DELTA, mp.mpf(st["t_int"][1])); qb = iv_of(st["end_q_str"]); wb = iv_of(st["end_v_str"]); das = {c: iv_of(st["classes"][n_]["delayed_arg_range"]) for n_, c in (("unlike", 1), ("like", -1), ("antipode", 0))}
        r_, why = end_dl(te, qb, wb, das, SLD, NS)
        if r_ is None: rowsD.append({"step": k, "refused": why}); print(k, "REFUSED", why, flush=True); continue
        rowsD.append({"step": k, "t_end": J(te), "dl_end": J(r_[0]), "width": mp.nstr(wid(r_[0]), 4), "sign": "pos" if lo(r_[0]) > 0 else ("neg" if up(r_[0]) < 0 else "und"), "a_end": J(r_[1])})
        print(k, "dl_end", s45(lo(r_[0]))[:11], s45(up(r_[0]))[:11], rowsD[-1]["sign"], "w", rowsD[-1]["width"], flush=True); outD["target"] = rowsD; json.dump(outD, open(OUTD, "w"), indent=1)
good = [r for r in rowsD if "dl_end" in r]; dec = []
for i, ri in enumerate(good):
    for rk in good[i + 1:]:
        if up(iv_of(rk["dl_end"])) < lo(iv_of(ri["dl_end"])): dec.append([ri["step"], rk["step"]])
outD["proved_decreases"] = dec[:50]; outD["n_proved_decreases"] = len(dec); outD["all_negative"] = bool(all(r["sign"] == "neg" for r in good)); outD["target"] = rowsD; outD["wall_s"] = time.time() - tD
json.dump(outD, open(OUTD, "w"), indent=1); print("decreases", len(dec), dec[:10], "all_negative", outD["all_negative"], flush=True)
