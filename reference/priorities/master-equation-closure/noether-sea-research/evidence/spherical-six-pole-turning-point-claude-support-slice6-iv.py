# Turning-point campaign, support role (emmy-noether): OWN sub-range lookup extended to the 324 accepted records, PATH-TURN and SUPPORT-TURN event
# detectors, controls first. Reuses unchanged, by executing its text up to its slice-target marker, this role's speed-maximum slice5-iv.py v5
# (a5d4212e...): the 264-record chain (204 inherited + 60 w-chain), lookup, make_slabs, joins(), the event detector sign_events/speed_events and ALL its
# controls (L1-L6, N1-N9, E1-E8), which rerun first. Then appends the 60 accepted records of steps 215-274 (speed-maximum continuation t1b 6448afe4...,
# t2 34ae3de4..., t3 d8f54944...; allow-list by file) and runs, BEFORE any target:
#   M4: all 323 joins of the 324-record chain; M6 self-append: source time 4.1 refused with 264 records, answered with 324; the chain end equals the
#   campaign restart strings; M7 negatives: gap (step 250 removed), uncertified (step 260 flagged), unaccepted record (t1b records off the allow-list),
#   beyond the guaranteed coverage end, read into the uncertain end of step 274.
#   Event controls on synthetic sequences: E9 w positive-to-negative -> PATH TURN (q local maximum, |w| local minimum), not a speed maximum; E10 w
#   negative-to-positive -> reverse turn (q local minimum); E11 zero-containing w box undecided; E12 dl/dt negative-to-positive -> local MINIMUM of the
#   signed support l (maximum of inward magnitude while l < 0); E13 dl/dt positive-to-negative -> local MAXIMUM of l; E14 a support zero (l through 0
#   with dl/dt one-signed) is not a support turn; E15 a zero of a = dw/dt with dl/dt one-signed is not a support turn; E16 undecided dl/dt box stays
#   undecided; E17 a derivative seam with one-sided boxes: a sign change across the seam is reported as a one-sided (corner) turn, equal one-sided signs
#   as no turn.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [slice.json ...]
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDY = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT6 = sys.argv[1]; _argv = sys.argv; sys.argv = [_argv[0], OUT6 + ".slice5-controls.json"]
exec(open(EVDY + "spherical-six-pole-speed-maximum-feedback-claude-support-slice5-iv.py").read().split("# ---------------- slice targets: the frozen slice4", 1)[0])
sys.argv = _argv; assert out["controls_all_pass"] and len(SLABS) == 264
SLABS264 = SLABS; out6 = {"slice5_controls": [{"name": c["name"][:60], "pass": c["pass"]} for c in out["controls"]], "controls": []}
TPATH = EVDY + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-%s.json"; ACC_T = ("t1b", "t2", "t3")
RAW_T = [("sm", s) for n in ACC_T for s in json.load(open(TPATH % n))["steps"]]; LAW_T = [rec_boxes(s, "sm") for _, s in RAW_T]
ALLRAW6 = ALLRAW + RAW_T; ALLLAW6 = ALLLAW + LAW_T; SLABS = make_slabs(ALLRAW6, ALLLAW6, QT, VT)
bad, maxw = joins(SLABS)
out6["controls"].append({"name": "(M4) known, REAL records: all 323 joins of the 324-record chain (polynomial end box meets next start strings and a0; both uncertain start-time endpoints step by Delta); appended steps 215..274 all certified", "failures": bad[:5], "max_poly_end_q_width": mp.nstr(maxw, 5), "pass": bool(not bad and len(SLABS) == 324 and [s["step"] for s in SLABS[264:]] == list(range(215, 275)) and all(s["certified"] for s in SLABS[264:]))})
t274 = I(lo(SLABS[-1]["T"]) + DELTA, up(SLABS[-1]["T"]) + DELTA)
END274 = {"t": ["4.606684593623649597167969", "4.606684709182828044891357"], "q": ["1.045210315569370832259362", "1.048063603726783075030252"], "w": ["0.3821099822311932454794886", "0.3863400661206562789504872"]}
ok_end = bool(lo(SLABS[-1]["Qe"]) == mp.mpf(END274["q"][0]) and up(SLABS[-1]["Qe"]) == mp.mpf(END274["q"][1]) and lo(SLABS[-1]["Ve"]) == mp.mpf(END274["w"][0]) and up(SLABS[-1]["Ve"]) == mp.mpf(END274["w"][1]) and abs(lo(t274) - mp.mpf(END274["t"][0])) < mp.mpf("1e-22") and abs(up(t274) - mp.mpf(END274["t"][1])) < mp.mpf("1e-22"))
ra, whya = lookup(I(mp.mpf("4.1"), mp.mpf("4.1")), SLABS264); rb_, _ = lookup(I(mp.mpf("4.1"), mp.mpf("4.1")), SLABS); rc_, _ = lookup(I(lo(t274), lo(t274)), SLABS)
out6["controls"].append({"name": "(M6) known, self-append: source time 4.1 refused with 264 records, answered with 324; a request at the guaranteed end of step 274 meets its end strings; the chain end equals the campaign restart strings", "refusal": whya, "touched": rb_[3] if rb_ else None, "end_matches_restart": ok_end, "pass": bool(ra is None and rb_ is not None and rc_ is not None and meets(rc_[0], SLABS[-1]["Qe"]) and meets(rc_[1], SLABS[-1]["Ve"]) and ok_end)})
neg6 = {}
g_ = [s for s in SLABS if not (s["src"] == "sm" and s["step"] == 250)]; r_, w_ = lookup(I(mp.mpf("4.352"), mp.mpf("4.372")), g_); neg6["gap (step 250 removed) refused"] = bool(r_ is None); neg6["gap reason"] = w_
u_ = [dict(s, certified=(False if (s["src"] == "sm" and s["step"] == 260) else s["certified"])) for s in SLABS]; r_, w_ = lookup(I(mp.mpf("4.460"), mp.mpf("4.470")), u_); neg6["uncertified (step 260 flagged) refused"] = bool(r_ is None); neg6["uncertified reason"] = w_
x_ = [dict(s, certified=(False if (s["src"] == "sm" and s["step"] <= 234) else s["certified"])) for s in SLABS]; r_, w_ = lookup(I(mp.mpf("4.1"), mp.mpf("4.1")), x_); neg6["unaccepted records (t1b off the allow-list) refused"] = bool(r_ is None); neg6["unaccepted reason"] = w_
r_, w_ = lookup(I(lo(t274) - mp.mpf("0.001"), lo(t274) + mp.mpf("0.001")), SLABS); neg6["beyond guaranteed coverage (past step 274) refused"] = bool(r_ is None)
r_, _ = lookup(I(up(t274), up(t274)), SLABS); r2_, _ = lookup(I(lo(t274) + mp.mpf("1e-9"), lo(t274) + mp.mpf("1e-9")), SLABS); neg6["read into the uncertain end of step 274 refused"] = bool(r_ is None and r2_ is None)
out6["controls"].append({"name": "(M7) negatives on the 324-record chain", "detail": neg6, "pass": bool(all(v for k, v in neg6.items() if not k.endswith("reason")))})
# ---- path-turn and support-turn detectors
def sign_events2(seq):
    """seq items: (step, t, box) or (step, t, (left_box, right_box)) at a derivative seam. Crossings between PROVED signs; zero-containing boxes are
    undecided and widen the bracket; at a seam the left sign closes the previous run and the right sign opens the next; a sign change across the seam
    itself is a one-sided (corner) event with bracket [lower t, upper t] of that step end."""
    evs = []; last = None; und = []
    def push(step, t, x, seam_side=None):
        nonlocal last, und
        s = psign(x)
        if s == 0: und.append(step); return
        if last is not None and s != last[0]:
            evs.append({"kind": "pos_to_neg" if last[0] > 0 else "neg_to_pos", "from_step_end": last[1], "to_step_end": step, "bracket": [s45(lo(last[2])), s45(up(t))], "undecided_ends_between": list(und), "adjacent": bool(step == last[1] + 1), "one_sided_at_seam": bool(seam_side == "right" and last[1] == step)})
        last = (s, step, t); und = []
    for step, t, x in seq:
        if isinstance(x, tuple): push(step, t, x[0], "left"); push(step, t, x[1], "right")
        else: push(step, t, x)
    return evs, und
def path_turn_events(seq_w):
    evs, tr = sign_events2(seq_w)
    return [dict(e, classification=("PATH TURN: q local maximum, |w| local minimum (not a speed maximum)" if e["kind"] == "pos_to_neg" else "reverse path turn: q local minimum, |w| local minimum")) for e in evs], tr
def support_turn_events(seq_dl, l_boxes=None):
    evs, tr = sign_events2(seq_dl); res = []
    for e in evs:
        kind = "local MINIMUM of signed support l" if e["kind"] == "neg_to_pos" else "local MAXIMUM of signed support l"
        if l_boxes is not None:
            lb = [l_boxes[k] for k in range(e["from_step_end"], e["to_step_end"] + 1) if k in l_boxes]
            if lb and all(up(x) < 0 for x in lb): kind += " (l < 0 on the bracket: a local " + ("maximum" if e["kind"] == "neg_to_pos" else "minimum") + " of the inward magnitude |l|)"
            elif lb and all(lo(x) > 0 for x in lb): kind += " (l > 0 on the bracket)"
            else: kind += " (sign of l not proved on the bracket)"
        if e.get("one_sided_at_seam"): kind += "; one-sided (corner) at a derivative seam"
        res.append(dict(e, classification=kind))
    return res, tr
Bx = lambda a, b: I(mp.mpf(a), mp.mpf(b)); ev6 = {}
seqw = [(k, Tn(k), Bx(mp.mpf("0.003") - mp.mpf("0.002")*k - mp.mpf("0.0004"), mp.mpf("0.003") - mp.mpf("0.002")*k + mp.mpf("0.0004"))) for k in range(5)]
e9, _ = path_turn_events(seqw); e9s, _ = speed_events(seqw, {k: Bx("0.3", "0.4") for k in range(6)}, {k: Bx("-0.2", "-0.1") for k in range(6)})
ev6["E9 w positive-to-negative -> one PATH TURN (q maximum, |w| minimum), ends 1 -> 2, bracket [4.01, 4.02 + 1e-7]"] = bool(len(e9) == 1 and e9[0]["classification"].startswith("PATH TURN") and e9[0]["from_step_end"] == 1 and e9[0]["to_step_end"] == 2 and mp.mpf(e9[0]["bracket"][0]) == mp.mpf("4.01"))
e10, _ = path_turn_events([(k, t, -x) for k, t, x in seqw]); ev6["E10 w negative-to-positive -> reverse turn (q minimum), not a path turn"] = bool(len(e10) == 1 and e10[0]["classification"].startswith("reverse"))
e11, tr11 = path_turn_events([(0, Tn(0), Bx("0.001", "0.002")), (1, Tn(1), Bx("-0.0005", "0.0005")), (2, Tn(2), Bx("-0.0003", "0.0004"))]); ev6["E11 flat / zero-containing w boxes after a positive end: no turn, trailing undecided ends listed"] = bool(e11 == [] and tr11 == [1, 2])
lneg = {k: Bx("-0.10", "-0.09") for k in range(6)}
e12, _ = support_turn_events([(k, t, -x) for k, t, x in seqw], lneg); ev6["E12 dl/dt negative-to-positive with l < 0 -> local MINIMUM of signed support (local maximum of inward magnitude)"] = bool(len(e12) == 1 and "MINIMUM of signed support" in e12[0]["classification"] and "maximum of the inward magnitude" in e12[0]["classification"])
e13, _ = support_turn_events(seqw, lneg); ev6["E13 dl/dt positive-to-negative -> local MAXIMUM of signed support"] = bool(len(e13) == 1 and "MAXIMUM of signed support" in e13[0]["classification"])
lzero = [(k, Tn(k), Bx(mp.mpf("-0.003") + mp.mpf("0.002")*k - mp.mpf("0.0003"), mp.mpf("-0.003") + mp.mpf("0.002")*k + mp.mpf("0.0003"))) for k in range(5)]
dl_pos = [(k, Tn(k), Bx("0.15", "0.25")) for k in range(5)]
e14a, _ = support_turn_events(dl_pos); e14b, _ = sign_events2(lzero); ev6["E14 a support ZERO (l crosses 0 while dl/dt is proved positive) is detected as a zero of l and NOT as a support turn"] = bool(e14a == [] and len(e14b) == 1)
e15, _ = support_turn_events(dl_pos); e15a, _ = sign_events2([(k, t, -x) for k, t, x in seqw]); ev6["E15 a zero of a = dw/dt while dl/dt is proved one-signed is NOT a support turn"] = bool(e15 == [] and len(e15a) == 1)
e16, tr16 = support_turn_events([(0, Tn(0), Bx("-0.002", "-0.001")), (1, Tn(1), Bx("-0.001", "0.0005")), (2, Tn(2), Bx("-0.0004", "0.0002"))]); ev6["E16 undecided dl/dt boxes stay undecided (no event, trailing undecided ends listed)"] = bool(e16 == [] and tr16 == [1, 2])
e17a, _ = support_turn_events([(0, Tn(0), Bx("-0.003", "-0.002")), (1, Tn(1), (Bx("-0.002", "-0.001"), Bx("0.001", "0.002"))), (2, Tn(2), Bx("0.002", "0.003"))], lneg)
e17b, _ = support_turn_events([(0, Tn(0), Bx("-0.003", "-0.002")), (1, Tn(1), (Bx("-0.002", "-0.001"), Bx("-0.0015", "-0.0005"))), (2, Tn(2), Bx("-0.002", "-0.001"))], lneg)
ev6["E17 derivative seam: a sign change between the one-sided boxes at a seam is a one-sided (corner) support minimum at that step end; equal one-sided signs give no turn"] = bool(len(e17a) == 1 and e17a[0]["one_sided_at_seam"] and "corner" in e17a[0]["classification"] and e17b == [])
out6["controls"].append({"name": "(E9-E17) path-turn and support-turn detector controls on synthetic sequences", "detail": ev6, "pass": bool(all(ev6.values()))})
out6["controls_all_pass"] = all(c["pass"] for c in out6["controls"]); print(json.dumps([{"name": c["name"][:100], "pass": c["pass"]} for c in out6["controls"]]), flush=True); print(json.dumps(neg6), flush=True); print(json.dumps(ev6), flush=True)
out6["chain"] = {"slabs": len(SLABS), "guaranteed_coverage_end": s45(lo(t274)), "possible_end": s45(up(t274))}
json.dump(out6, open(OUT6, "w"), indent=1)
if not out6["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# (Phase B target code is added in a later version under a new name; Phase A runs controls only.)
