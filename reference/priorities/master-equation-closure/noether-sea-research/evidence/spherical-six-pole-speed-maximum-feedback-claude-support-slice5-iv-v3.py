# Speed-maximum-feedback campaign, support role (emmy-noether): OWN sub-range history lookup extended to the 264 accepted records, EVENT detector, and
# slice evaluation. Reuses unchanged, by executing its definition block, this role's frozen subrange-feedback instrument support-slice4-iv.py v2
# (da88113f...: lookup, make_slabs, the 204-slab chain and, through it, kern, dh_dt, contributions); appends the 60 accepted w-chain records
# (steps 155-214 of s1w, s2w, s3w; file names are the allow-list: any other file's records enter flagged NOT accepted and are refused).
# Controls BEFORE any target, exit on failure:
#   L1-L3, N1-N4 synthetic cubic slabs (the frozen control lines re-executed unchanged); L4 all 263 joins of the 264-record chain (polynomial end box
#   meets the next start strings and a0; start times step by exactly Delta); L5 window seam; L6 self-append (s = 3.5 refused with 204 records, answered
#   with 264; request at the guaranteed end of step 214 meets its end strings); N5 gap; N6 uncertified; N7 beyond guaranteed coverage; N8 PROVISIONAL
#   record (the provisional file s1 appended instead of s1w) refused; N9 read into the possible (uncertain) end refused.
#   Event controls on synthetic step sequences: E1 positive-to-negative qddot crossing with qdot > 0 -> local speed maximum, bracket = earlier end's
#   lower time to later end's upper time; E2 negative-to-positive -> minimum, not a maximum; E3 zero-containing box -> undecided, bracket widened over
#   it, never a certified adjacent-step crossing; E4 source times crossing 2.8067 but not L -> no target reception; E5 source times crossing L ->
#   target reception with full time uncertainty; E6 qdot through zero -> coordinate turn, not a speed maximum; E7 uniqueness needs a proved negative
#   rate on every bracket step (one undecided rate -> not unique).
# Target: slice JSON files (argv[2:], in order; each slice's certified records are appended to the chain after evaluation, join-checked).
# v2 (v1 bytes retained as -v1.py): v1 stopped in the post-processing of its first replay run (old subject s3w, not a campaign target) on the history-age line (lo() applied to a plain number); v2 computes the age as an interval. Nothing else changed.
# v3 (v2 bytes retained as -v2.py): adds (i) a start-of-step root check per class (the root at the step START, the previous certified end, must not lie below the recorded source range) and (ii) the join intersection of a step-end box with the next step whole-step box (control E8); the per-step enclosures themselves are unchanged from v2.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> [slice.json ...] [--wholestep-first-reading]
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVD0 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUT5 = sys.argv[1]; SLICE_FILES = [a for a in sys.argv[2:] if not a.startswith("--")]
SRC4 = open(EVD0 + "spherical-six-pole-subrange-feedback-claude-support-slice4-iv.py").read()
_argv = sys.argv; sys.argv = [_argv[0], OUT5] + [a for a in _argv[2:] if a.startswith("--")]
HEAD4, REST4 = SRC4.split('t_start = time.time(); out = {"controls": []}', 1)
exec(HEAD4); sys.argv = _argv
t_start = time.time(); out = {"controls": []}
SLABS204 = SLABS; assert len(SLABS204) == 204 and len(RECORDS) == 204
WPATH = EVD + "spherical-six-pole-subrange-feedback-claude-continuation-steps7-iv-N4000-%s.json"; ACCEPTED_W = ("s1w", "s2w", "s3w")
WC = [json.load(open(WPATH % n)) for n in ACCEPTED_W]
RAW204 = RAW144 + RAW_LR; LAW204 = list(RECORDS)
RAW_W = [("sw", s) for d_ in WC for s in d_["steps"]]; LAW_W = [rec_boxes(s, "sw") for d_ in WC for s in d_["steps"]]
ALLRAW = RAW204 + RAW_W; ALLLAW = LAW204 + LAW_W
SLABS = make_slabs(ALLRAW, ALLLAW, QT, VT); RECORDS.extend(LAW_W); REC_END = up(RECORDS[-1]["t_int"])
# ---- synthetic lookup controls: frozen control lines re-executed unchanged (L1, L2, L3 and the N1-N4 lines)
CTRL_A = REST4.split("# L4 real-record joins", 1)[0]; exec(CTRL_A)
def joins(slabs):
    bad = []; maxw = mp.mpf(0)
    for a_, b_ in zip(slabs[:-1], slabs[1:]):
        Sg = I(DELTA, DELTA); ae_ = a_["A0"] + a_["AP"]*Sg; ve_ = a_["V0"] + a_["A0"]*Sg + a_["AP"]*Sg*Sg/2; qe_ = a_["Q0"] + a_["V0"]*Sg + a_["A0"]*Sg*Sg/2 + a_["AP"]*Sg*Sg*Sg/6
        if not (meets(qe_, b_["Q0"]) and meets(ve_, b_["V0"]) and meets(ae_, b_["A0"])): bad.append("%s#%d->%s#%d" % (a_["src"], a_["step"], b_["src"], b_["step"]))
        if not abs(lo(b_["T"]) - (lo(a_["T"]) + DELTA)) < mp.mpf("1e-20"): bad.append("time %s#%d" % (b_["src"], b_["step"]))
        if not abs(up(b_["T"]) - (up(a_["T"]) + DELTA)) < mp.mpf("1e-20"): bad.append("time-upper %s#%d" % (b_["src"], b_["step"]))
        maxw = max(maxw, wid(qe_))
    return bad, maxw
bad, maxw = joins(SLABS); steps_w = [s["step"] for s in SLABS[204:]]
out["controls"].append({"name": "(L4) known, REAL records: on each of the 263 joins of the 264-record chain the polynomial box of slab k at sigma = Delta meets the start strings (q, qdot) and the a0 of slab k+1, and both start-time endpoints step by exactly Delta; the appended records are steps 155..214, all certified", "joins": len(SLABS) - 1, "failures": bad[:5], "max_poly_end_q_width": mp.nstr(maxw, 5), "pass": bool(not bad and len(SLABS) == 264 and steps_w == list(range(155, 215)) and all(s["certified"] for s in SLABS[204:]))})
r5, _ = lookup(I(TSTAR_LO - mp.mpf("0.004"), TSTAR_HI + mp.mpf("0.004")), SLABS)
out["controls"].append({"name": "(L5) known: request straddling T* (+-0.004): hull of the window part and wave-16 step 1 contains the window state at T*", "touched": r5[3] if r5 else None, "pass": bool(r5 is not None and r5[3][0] == "window" and "w16#1" in r5[3] and inside(QT, r5[0]) and inside(VT, r5[1]))})
t214 = I(lo(SLABS[-1]["T"]) + DELTA, up(SLABS[-1]["T"]) + DELTA); req6 = I(lo(t214), lo(t214))
r6a, why6 = lookup(I(mp.mpf("3.5"), mp.mpf("3.5")), SLABS204); r6b, _ = lookup(I(mp.mpf("3.5"), mp.mpf("3.5")), SLABS); r6c, _ = lookup(req6, SLABS)
END214 = {"t": ["4.006684593623649597167969", "4.006684709182828044891357"], "q": ["0.8133846082509829763113406", "0.8144991287777617099871676"], "qdot": ["0.3850091496059063693672473", "0.3868893027880675261383852"]}
ok_end = bool(lo(SLABS[-1]["Qe"]) == mp.mpf(END214["q"][0]) and up(SLABS[-1]["Qe"]) == mp.mpf(END214["q"][1]) and lo(SLABS[-1]["Ve"]) == mp.mpf(END214["qdot"][0]) and up(SLABS[-1]["Ve"]) == mp.mpf(END214["qdot"][1]) and abs(lo(t214) - mp.mpf(END214["t"][0])) < mp.mpf("1e-22") and abs(up(t214) - mp.mpf(END214["t"][1])) < mp.mpf("1e-22"))
out["controls"].append({"name": "(L6) known, self-append: s = 3.5 is refused with the 204-record chain and answered after appending the w-chain records 155-214; a request at the guaranteed (lower) end time of step 214 meets the step-214 end strings; the chain end equals the campaign's restart endpoint strings", "refusal": why6, "touched_after": r6b[3] if r6b else None, "end_matches_restart": ok_end, "pass": bool(r6a is None and r6b is not None and r6c is not None and meets(r6c[0], SLABS[-1]["Qe"]) and meets(r6c[1], SLABS[-1]["Ve"]) and ok_end)})
neg = {}
exec("\n".join(l for l in REST4.split("\n") if l.startswith("ok1, r1 = ") or l.startswith("ok2, _ = ") or l.startswith("ok3, _ = ") or l.startswith("ok4, _ = ")))
assert len([k for k in neg]) == 4
gapped = [s for s in SLABS if not (s["src"] == "sw" and s["step"] == 180)]; r7, why7 = lookup(I(mp.mpf("3.652"), mp.mpf("3.672")), gapped); neg["N5 gap (w-chain step 180 removed): request across it refused"] = bool(r7 is None); neg["N5 reason"] = why7
unc = [dict(s, certified=(False if (s["src"] == "sw" and s["step"] == 190) else s["certified"])) for s in SLABS]; r8, why8 = lookup(I(mp.mpf("3.760"), mp.mpf("3.770")), unc); neg["N6 uncertified record (w-chain step 190 flagged): refused"] = bool(r8 is None); neg["N6 reason"] = why8
r9, why9 = lookup(I(lo(t214) - mp.mpf("0.001"), lo(t214) + mp.mpf("0.001")), SLABS); neg["N7 beyond guaranteed coverage (past step 214): refused"] = bool(r9 is None)
PROV = json.load(open(WPATH % "s1")); RAW_P = [("sw_provisional", s) for s in PROV["steps"]]; LAW_P = [rec_boxes(s, "sw_provisional") for s in PROV["steps"]]
SLABS_P = [dict(s, certified=(s["certified"] and s["src"] != "sw_provisional")) for s in make_slabs(RAW204 + RAW_P, LAW204 + LAW_P, QT, VT)]   # not on the allow-list -> never accepted
r10, why10 = lookup(I(mp.mpf("3.45"), mp.mpf("3.45")), SLABS_P); neg["N8 provisional record (file s1, not on the allow-list) refused"] = bool(r10 is None and "sw_provisional" in why10); neg["N8 reason"] = why10
r11, why11 = lookup(I(up(t214), up(t214)), SLABS); r11b, _ = lookup(I(lo(t214) + mp.mpf("1e-9"), lo(t214) + mp.mpf("1e-9")), SLABS); neg["N9 read into the possible (uncertain) end of step 214 (its upper end time, and guaranteed end + 1e-9) refused"] = bool(r11 is None and r11b is None)
out["controls"].append({"name": "(N1-N9) negatives", "detail": neg, "pass": bool(all(v for k, v in neg.items() if not k.endswith("reason")))})
# ---- event detector
LB = I(mp.mpf("3.406684593623649597167969"), mp.mpf("3.406684709182828044891357"))     # boundary L (one true number): end of step 154 = start of steps 155-214
def psign(x): return 1 if lo(x) > 0 else (-1 if up(x) < 0 else 0)
def sign_events(seq):
    """seq: list of (step, t_end interval, value interval) at consecutive certified step ends. Returns crossings between PROVED signs; steps whose box
    contains zero are undecided, are listed, and widen the bracket (earlier proved end's LOWER time endpoint to later proved end's UPPER endpoint)."""
    evs = []; last = None; und = []
    for step, t, x in seq:
        s = psign(x)
        if s == 0: und.append(step); continue
        if last is not None and s != last[0]: evs.append({"kind": "pos_to_neg" if last[0] > 0 else "neg_to_pos", "from_step_end": last[1], "to_step_end": step, "bracket": [s45(lo(last[2])), s45(up(t))], "undecided_ends_between": list(und), "adjacent": bool(step == last[1] + 1)})
        last = (s, step, t); und = []
    return evs, und
def speed_events(seq_qdd, qdot_boxes, rate_boxes):
    """classify qddot crossings. qdot_boxes[step], rate_boxes[step]: whole-step boxes of the steps (step = the step ENDING at that step end)."""
    evs, trailing = sign_events(seq_qdd); res = []
    for e in evs:
        steps = list(range(e["from_step_end"] + 1, e["to_step_end"] + 1)); vb = [qdot_boxes[k] for k in steps]; vh = I(min(lo(v) for v in vb), max(up(v) for v in vb))
        vs = psign(vh); rneg = all(up(rate_boxes[k]) < 0 for k in steps); rpos = all(lo(rate_boxes[k]) > 0 for k in steps)
        if vs == 0: kind = "undecided: qdot not of proved sign on the bracket (possible coordinate turn)"
        elif (e["kind"] == "pos_to_neg") == (vs > 0): kind = "local speed maximum"
        else: kind = "local speed minimum"
        res.append(dict(e, classification=kind, qdot_sign_on_bracket=vs, speed_hull_on_bracket=[s45(min(abs(lo(vh)), abs(up(vh))) if vs != 0 else mp.mpf(0)), s45(max(abs(lo(vh)), abs(up(vh))))], unique_zero_in_bracket=bool(rneg or rpos), bracket_steps=steps))
    return res, trailing
def turn_events(seq_qdot):
    evs, trailing = sign_events(seq_qdot); return [dict(e, classification="coordinate turn (qdot through zero), not a speed maximum") for e in evs], trailing
def reception_events(seq_src, boundary):
    """seq_src: (step, t_end, source-time interval). The sign of source time minus the boundary is computed HERE from the boundary passed in."""
    evs, trailing = sign_events([(k, t, s - boundary) for k, t, s in seq_src]); return [dict(e, classification="source time crosses the boundary upward" if e["kind"] == "neg_to_pos" else "source time crosses the boundary downward") for e in evs], trailing
def Tn(k): return I(mp.mpf(4) + DELTA*k, mp.mpf(4) + DELTA*k + mp.mpf("1e-7"))
ev = {}
sq = [(k, Tn(k), I(mp.mpf("0.003") - mp.mpf("0.002")*k - mp.mpf("0.0004"), mp.mpf("0.003") - mp.mpf("0.002")*k + mp.mpf("0.0004"))) for k in range(0, 5)]   # 0.003, 0.001 | -0.001 ...
qb = {k: I(mp.mpf("0.38"), mp.mpf("0.39")) for k in range(0, 6)}; rb = {k: I(mp.mpf("-0.21"), mp.mpf("-0.19")) for k in range(0, 6)}
e1, _ = speed_events(sq, qb, rb)
ev["E1 positive-to-negative qddot with qdot > 0 -> exactly one event, a local speed maximum, adjacent ends 1 -> 2, bracket [4.01, 4.02 + 1e-7], speed hull [0.38, 0.39], unique"] = bool(len(e1) == 1 and e1[0]["classification"] == "local speed maximum" and e1[0]["from_step_end"] == 1 and e1[0]["to_step_end"] == 2 and e1[0]["adjacent"] and mp.mpf(e1[0]["bracket"][0]) == mp.mpf("4.01") and abs(mp.mpf(e1[0]["bracket"][1]) - (mp.mpf("4.02") + mp.mpf("1e-7"))) < mp.mpf("1e-20") and e1[0]["unique_zero_in_bracket"] and e1[0]["speed_hull_on_bracket"] == [s45(mp.mpf("0.38")), s45(mp.mpf("0.39"))])
e2, _ = speed_events([(k, t, -x) for k, t, x in sq], qb, {k: -rb[k] for k in rb})
ev["E2 negative-to-positive qddot with qdot > 0 -> a minimum, NOT a maximum"] = bool(len(e2) == 1 and e2[0]["classification"] == "local speed minimum")
sq3 = [(0, Tn(0), I(mp.mpf("0.002"), mp.mpf("0.003"))), (1, Tn(1), I(mp.mpf("-0.0002"), mp.mpf("0.0008"))), (2, Tn(2), I(mp.mpf("-0.0001"), mp.mpf("0.0001"))), (3, Tn(3), I(mp.mpf("-0.003"), mp.mpf("-0.002")))]
e3, _ = speed_events(sq3, qb, rb); e3b, tr3 = speed_events(sq3[:3], qb, rb)
ev["E3 zero-containing boxes are UNDECIDED: the crossing is bracketed only by the proved ends 0 -> 3 (not adjacent, undecided ends 1, 2 listed), and a sequence ending undecided reports no event and lists the trailing undecided ends"] = bool(len(e3) == 1 and e3[0]["undecided_ends_between"] == [1, 2] and not e3[0]["adjacent"] and e3[0]["from_step_end"] == 0 and e3[0]["to_step_end"] == 3 and e3b == [] and tr3 == [1, 2])
src_wrong = [(k, Tn(k), I(mp.mpf("2.79") + mp.mpf("0.01")*k, mp.mpf("2.7905") + mp.mpf("0.01")*k)) for k in range(0, 5)]      # crosses 2.8067, never L
B94 = I(mp.mpf("2.806684593623649597167969"), mp.mpf("2.806684709182828044891357"))
e4, _ = reception_events(src_wrong, LB); e4b, _ = reception_events(src_wrong, B94)
ev["E4 source times crossing the WRONG boundary (2.8067) are not reported as the target reception at L (while the same detector does report the crossing when handed 2.8067)"] = bool(e4 == [] and len(e4b) == 1 and e4b[0]["kind"] == "neg_to_pos")
src_L = [(k, Tn(k), I(mp.mpf("3.39") + mp.mpf("0.01")*k, mp.mpf("3.3905") + mp.mpf("0.01")*k)) for k in range(0, 5)]      # 3.39.., 3.40.. | 3.41..
e5, _ = reception_events(src_L, LB)
ev["E5 source times crossing L: one upward crossing, adjacent ends 1 -> 2, bracket = earlier end's lower time to later end's upper time"] = bool(len(e5) == 1 and e5[0]["kind"] == "neg_to_pos" and e5[0]["from_step_end"] == 1 and e5[0]["to_step_end"] == 2 and mp.mpf(e5[0]["bracket"][0]) == mp.mpf("4.01") and abs(mp.mpf(e5[0]["bracket"][1]) - (mp.mpf("4.02") + mp.mpf("1e-7"))) < mp.mpf("1e-20"))
sv = [(k, Tn(k), I(mp.mpf("0.0015") - mp.mpf("0.001")*k - mp.mpf("0.0002"), mp.mpf("0.0015") - mp.mpf("0.001")*k + mp.mpf("0.0002"))) for k in range(0, 4)]
e6, _ = turn_events(sv); qb6 = {k: I(mp.mpf("-0.002"), mp.mpf("0.002")) for k in range(0, 6)}; e6b, _ = speed_events(sq, qb6, rb)
ev["E6 qdot through zero is reported as a coordinate turn, and a qddot crossing where qdot has no proved sign is NOT called a speed maximum"] = bool(len(e6) == 1 and "coordinate turn" in e6[0]["classification"] and len(e6b) == 1 and e6b[0]["classification"].startswith("undecided"))
rb7 = dict(rb); rb7[2] = I(mp.mpf("-0.2"), mp.mpf("0.01")); e7, _ = speed_events(sq, qb, rb7)
ev["E7 uniqueness requires a proved one-signed rate on every bracket step: an undecided rate box gives unique = False"] = bool(len(e7) == 1 and e7[0]["unique_zero_in_bracket"] is False)
def join_intersect(ends, next_ranges, next_ok):
    """v3. ends: list of (step, t, box at the step END); next_ranges[k]: whole-step box of step k. The whole-step box of step k+1 also encloses the value at
    its START instant, which is the same true instant as the end of step k, PROVIDED the start checks of step k+1 passed (next_ok[k+1]): then the end
    box is intersected with it. Returns the intersected sequence and the steps whose intersection is empty (an inconsistency, never silently dropped)."""
    seq = []; bad = []
    for step, t, x in ends:
        if next_ok.get(step + 1) and (step + 1) in next_ranges:
            y = inter(x, next_ranges[step + 1])
            if y is None: bad.append(step)
            else: x = y
        seq.append((step, t, x))
    return seq, bad
B_ = lambda a, b: I(mp.mpf(a), mp.mpf(b)); ends8 = [(0, Tn(0), B_("0.0005", "0.002")), (1, Tn(1), B_("-0.0003", "0.001")), (2, Tn(2), B_("-0.0013", "0.00004")), (3, Tn(3), B_("-0.0023", "-0.0009"))]
rng8 = {1: B_("-0.0006", "0.0016"), 2: B_("-0.0016", "0.0007"), 3: B_("-0.0026", "-0.0003")}
s8a, b8a = join_intersect(ends8, rng8, {1: True, 2: True, 3: True}); e8a, _ = speed_events(s8a, qb, rb); s8b, b8b = join_intersect(ends8, rng8, {1: True, 2: True, 3: False}); e8b, _ = speed_events(s8b, qb, rb)
s8c, b8c = join_intersect(ends8, {3: B_("0.001", "0.002")}, {3: True})
ev["E8 (v3) join intersection: an end box spanning zero becomes negative when the NEXT step's whole-step box is negative and that step's start checks passed (crossing 0 -> 2 with end 1 undecided); with the start check failed nothing is intersected (crossing 0 -> 3, ends 1, 2 undecided); an empty intersection is reported, not dropped"] = bool(len(e8a) == 1 and e8a[0]["to_step_end"] == 2 and e8a[0]["undecided_ends_between"] == [1] and up(s8a[2][2]) == mp.mpf("-0.0003") and lo(s8a[2][2]) == mp.mpf("-0.0013") and b8a == [] and len(e8b) == 1 and e8b[0]["to_step_end"] == 3 and e8b[0]["undecided_ends_between"] == [1, 2] and b8c == [2])
out["controls"].append({"name": "(E1-E8) event-detector controls on synthetic step sequences", "detail": ev, "pass": bool(all(ev.values()))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); print(json.dumps([{"name": c["name"][:90], "pass": c["pass"]} for c in out["controls"]]), flush=True); print(json.dumps(neg), flush=True); print(json.dumps(ev), flush=True)
out["chain"] = {"slabs": len(SLABS), "guaranteed_coverage_end": s45(lo(t214)), "possible_end": s45(up(t214))}
json.dump(out, open(OUT5, "w"), indent=1)
if not out["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---------------- slice targets: the frozen slice4 target block re-executed per file with three declared textual extensions ----------------
TGT = REST4.split("# ---------------- slice target ----------------", 1)[1]; TGT, LASTLINE = TGT.rstrip("\n").rsplit("\n", 1); assert LASTLINE.startswith('out["wall_s"]')
REPL = [('"s154_end_3.4067": slab_end("lr", 154)}', '"s154_end_3.4067": slab_end("lr", 154), "s214_end_4.0067": slab_end("sw", 214)}'),
        ('(("unlike", 1, ("s94_end_2.8067", "s154_end_3.4067")), ("like", -1, ("w17_end_1.8667", "pa_end_1.9767", "b3_end_2.0767", "s94_end_2.8067")), ("antipode", 0, ("w16_end_1.4667", "w17_end_1.8667", "pa_end_1.9767")))',
         '(("unlike", 1, ("s94_end_2.8067", "s154_end_3.4067", "s214_end_4.0067")), ("like", -1, ("w17_end_1.8667", "s94_end_2.8067", "s154_end_3.4067")), ("antipode", 0, ("w17_end_1.8667", "s94_end_2.8067", "s154_end_3.4067")))'),
        ('"D_t": J(k["D"]),', '"tan_end": J(Re[name]["tan_x_mult"]), "tan_end_sign": sgn3(Re[name]["tan_x_mult"]), "rad_end": J(Re[name]["rad_x_mult"]), "D_end": J(kern(qe, states[c][0], states[c][1], c)["D"]), "D_t": J(k["D"]),')]
for a_, b_ in REPL:
    assert TGT.count(a_) == 1, a_[:40]
    TGT = TGT.replace(a_, b_)
Mi = lambda q, p: iv.cos(q + p)/S2 - iv.sin(q)*iv.cos(p)/2; Ni = lambda q, p: iv.cos(q + p)/S2 - iv.cos(q)*iv.sin(p)/2
BOX = {"q": I(mp.mpf("0.81"), mp.mpf("1.10")), "qp": I(mp.mpf(0), mp.mpf("0.85")), "vp": I(mp.mpf(0), mp.mpf("0.45"))}
ALLROWS = []; out["targets"] = []; out["appended"] = []; PREV_END = (I(lo(SLABS[-1]["T"]) + DELTA, up(SLABS[-1]["T"]) + DELTA), SLABS[-1]["Qe"])     # v3: accepted step-214 end (time, q strings)
for f in SLICE_FILES:
    SLICE4 = f; exec(TGT); rows = out.pop("target"); out.pop("target_file", None); dslice = json.load(open(f))
    for r, st in zip(rows, dslice["steps"]):
        if "qddot_range" not in r: PREV_END = None; continue
        qe = iv_of(st["end_q_str"]); S_ = iv_of(st["S"]); r["S"] = st["S"]; r["VS"] = st["VS"]; inbox = inside(S_, BOX["q"])
        te = t_end_of(st)
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            e = r["cls"][name]; qp = iv_of(e["q"]); vp = iv_of(e["qdot"]); inbox = inbox and inside(qp, BOX["qp"]) and inside(vp, BOX["vp"]); da = iv_of(e["delayed_arg"])
            if c != 0: e["M_sign"] = sgn3(Mi(S_, qp)); e["N_sign"] = sgn3(Ni(S_, qp)); e["N_end_sign"] = sgn3(Ni(qe, qp))
            else: e["N_sign"] = sgn3(iv.sin(S_ - qp)); e["N_end_sign"] = sgn3(iv.sin(qe - qp)); e["M_sign"] = "n/a (difference chord)"
            e["age_range"] = J(iv_of(st["t_int"]) - da)
            e["source_vs_L"] = "above L" if lo(da) > up(LB) else ("below L" if up(da) < lo(LB) else "straddles L")
            # own source-time check at the step end: f(s) = t_e - s - r_c(q_e, q(s)) is decreasing in s (D > 0), so the root lies in [s1, s2] iff f(s1) >= 0 >= f(s2)
            chk_ = {}
            for nm_, sp_ in (("lower", lo(da)), ("upper", up(da))):
                rs, why = lookup(I(sp_, sp_), SLABS)
                chk_[nm_] = sgn3((te - sp_) - r_cls(qe, rs[0], c)) if rs is not None else "refused: " + why
            e["own_root_check_at_end"] = chk_
            # v3: at the step START (the previous certified end: same true instant) the root must not lie below the recorded source range: f_start(lower) > 0
            if PREV_END is not None:
                rs0, why0 = lookup(I(lo(da), lo(da)), SLABS); e["own_root_check_at_start_lower"] = sgn3((PREV_END[0] - lo(da)) - r_cls(PREV_END[1], rs0[0], c)) if rs0 is not None else "refused: " + why0
            else: e["own_root_check_at_start_lower"] = "no previous certified end"
        r["inside_new_box"] = bool(inbox); r["start_checks_ok"] = bool(all(r["cls"][n_]["own_root_check_at_start_lower"] == "positive" for n_ in ("unlike", "like", "antipode")) and inside(PREV_END[1], S_)); PREV_END = (te, qe)
    out["targets"].append({"file": f, "rows": rows}); ALLROWS += rows
    # self-append the slice's certified records (stop at the first uncertified), join-checked
    newraw = []; 
    for st in dslice["steps"]:
        if not st.get("certified"): break
        newraw.append(("sm", st))
    if newraw:
        cand = make_slabs(ALLRAW + newraw, ALLLAW + [rec_boxes(s, "sm") for _, s in newraw], QT, VT); badj, _ = joins(cand)
        if badj: out["appended"].append({"file": f, "refused_join": badj[:5]}); print("APPEND REFUSED", f, badj[:3], flush=True)
        else: ALLLAW = ALLLAW + [rec_boxes(s, "sm") for _, s in newraw]; ALLRAW = ALLRAW + newraw; SLABS = cand; out["appended"].append({"file": f, "steps": [newraw[0][1]["step"], newraw[-1][1]["step"]], "slabs_now": len(SLABS)})
# ---- own event certificates over all evaluated rows (consecutive step ends)
good = [r for r in ALLROWS if "qddot_range" in r]
if good:
    T_ = lambda r: iv_of(r["t_end"]); seq_qdd = [(r["step"], T_(r), iv_of(r["qddot_end"])) for r in good]; seq_v = [(r["step"], T_(r), iv_of(r["qdot_end"])) for r in good]
    qb = {r["step"]: iv_of(r["VS"]) for r in good}; rbx = {r["step"]: iv_of(r["dqddot_dt_range"]) for r in good}
    contiguous = all(b["step"] == a["step"] + 1 for a, b in zip(good[:-1], good[1:]))
    evq, trq = speed_events(seq_qdd, qb, rbx); evv, trv = turn_events(seq_v); cert = {"contiguous_steps": contiguous, "steps": [good[0]["step"], good[-1]["step"]], "qddot_events": evq, "qddot_trailing_undecided_ends": trq, "qdot_events": evv,
        "qdot_positive_every_step": bool(all(lo(qb[k]) > 0 for k in qb)), "rate_negative_every_step": bool(all(up(rbx[k]) < 0 for k in rbx)), "rate_undecided_steps": [k for k in rbx if psign(rbx[k]) == 0], "qddot_end_signs": {r["step"]: r["qddot_end_sign"][:3] for r in good}}
    for name in ("unlike", "like", "antipode"):
        for sm in ("s154_end_3.4067", "s94_end_2.8067", "s214_end_4.0067"):
            key = name + "@" + sm
            if all(key in r["residuals"] for r in good):
                e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["residuals"][key]["rho"])) for r in good]); cert["rho_" + key] = {"events": e_, "trailing_undecided": tr_, "first_sign": good[0]["residuals"][key]["sign"], "last_sign": good[-1]["residuals"][key]["sign"]}
        e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["cls"][name]["tan_end"])) for r in good]); cert["tan_end_" + name] = {"events": e_, "trailing_undecided": tr_, "first_sign": good[0]["cls"][name]["tan_end_sign"], "last_sign": good[-1]["cls"][name]["tan_end_sign"]}
        sj_, bj_ = join_intersect([(r["step"], T_(r), iv_of(r["cls"][name]["tan_end"])) for r in good], {r["step"]: iv_of(r["cls"][name]["tan"]) for r in good}, okn); e_, tr_ = sign_events(sj_); cert["tan_end_join_intersected_" + name] = {"events": e_, "trailing_undecided": tr_, "empty_intersections": bj_}
        cert["D_side_" + name] = sorted(set(r["cls"][name]["D_side"] for r in good)); cert["source_vs_L_" + name] = {k: [r["step"] for r in good if r["cls"][name]["source_vs_L"] == k][:1] + [r["step"] for r in good if r["cls"][name]["source_vs_L"] == k][-1:] for k in ("below L", "straddles L", "above L")}
    e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["lambda_hat_end"])) for r in good]); cert["lambda_hat_end"] = {"events": e_, "trailing_undecided": tr_}
    e_, tr_ = sign_events([(r["step"], T_(r), iv_of(r["dlambda_dt_range"])) for r in good]); cert["dlambda_dt_range_sign_changes_between_steps"] = {"events": e_, "trailing_undecided": tr_}
    cert["all_inside_new_box"] = bool(all(r["inside_new_box"] for r in good)); cert["own_root_checks_all_enclose"] = bool(all(not r["cls"][n]["own_root_check_at_end"]["lower"].startswith("neg") and not r["cls"][n]["own_root_check_at_end"]["upper"].startswith("pos") and not r["cls"][n]["own_root_check_at_end"]["upper"].startswith("ref") for r in good for n in ("unlike", "like", "antipode")))
    out["event_certificates"] = cert; print("CERT", json.dumps(cert), flush=True)
out["wall_s"] = time.time() - t_start; json.dump(out, open(OUT5, "w"), indent=1); print("wall", out["wall_s"], flush=True)
