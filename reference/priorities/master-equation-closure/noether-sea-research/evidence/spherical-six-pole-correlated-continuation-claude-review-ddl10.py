# Correlated-continuation campaign, review (ramon-e-moore lens): whole-step sign of dl/dt on RECONSTRUCTED records by the end-plus-second-derivative lemma
# (adjudication 8, section 3); written 2026-10-14 ~12:50 UTC; NOT run before a PI grant.
# It executes my frozen turning-point audit9 v5 (sha256 b1aca358..., verified) WHOLE with no targets and one insertion before its own-append loop:
#   (1) my frozen ddl-refine controls R1-R3 (ddl-refine sha256 0e6c51c0..., verified; the text between "def class_boxes" and its target block, unchanged) on the
#       FULL frozen table, so the refined l'' instrument is re-qualified in every invocation before any target;
#   (2) the table cut to the 204 records through step 154 (as in audit10), then NEW insertion controls: I1 the truncated table's last record reproduces the
#       step-154 strings that the first reconstructed slice starts from (exact strings); I2 a known append of the first reconstructed step is accepted;
#       I3 a gap (that step's time shifted by one step) is refused; I4 a record whose end does not meet its frozen accepted counterpart is refused;
#   (3) every certified reconstructed step appended in order through the same checked function (alignment, continuity, frozen meet), labelled own-k,
#       so audit9's own loop then skips them and sets the guaranteed end as usual.
# After audit9 saves OUT.json: for steps K1..K2, my refined whole-step l'' (K sub-intervals, from the step's own Taylor form) and my own end evaluation of
# dl/dt (own_end2) on the reconstructed end boxes; per step the lemma bound sup dl/dt <= min(A + U D, B + |L| D, crossing value) with A, B the upper ends of
# dl/dt at the step's start (previous end) and end and [L, U] the refined l'' hull (interval arithmetic, outward); "negative" only if the bound is < 0.
# Per step it also lists which records the refined l'' read (frozen labels = records through step 154; own-k = reconstructed).
# Usage: ddl10.py OUT.json K1 K2 KSUB --own SLICE1.json SLICE2.json ... --      (writes OUT.json from audit9 and OUT.json.ddl10.json; both must not exist)
import os, sys, json, hashlib
E10 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
SELF_SHA = hashlib.sha256(open(sys.argv[0], "rb").read()).hexdigest(); print("PID", os.getpid(), "ddl10 sha256", SELF_SHA, flush=True)
_b = open(E10 + "spherical-six-pole-turning-point-claude-review-audit9.py", "rb").read(); assert hashlib.sha256(_b).hexdigest() == "b1aca3581b817bfd0abbe74c85feddfcf3b45c0605105e560ea1fc8a55f0ce8c"
_d = open(E10 + "spherical-six-pole-turning-point-claude-review-ddl-refine.py", "rb").read(); assert hashlib.sha256(_d).hexdigest() == "0e6c51c0832250ddc415055a02783d7dd3a145ed96474cc463f36f7528266e70"
_dt = _d.decode(); _M0 = "def class_boxes("; _M1 = "# ---------- targets ----------"; assert _dt.count(_M0) == 1 and _dt.count(_M1) == 1
DR_MID = _M0 + _dt.split(_M0, 1)[1].split(_M1, 1)[0]
A_ = sys.argv[1:]; OUTP = A_[0]; K1, K2, KSUB = int(A_[1]), int(A_[2]), int(A_[3]); assert A_[4] == "--own" and A_[-1] == "--" and len(A_) > 6; OWNF = A_[5:-1]
for p_ in (OUTP, OUTP + ".ddl10.json"): assert not os.path.exists(p_), ("output exists", p_)
INPUT_SHA = {p_: hashlib.sha256(open(p_, "rb").read()).hexdigest() for p_ in OWNF}
sys.argv = [sys.argv[0], OUTP, "--own"] + OWNF + ["--"]
FROZEN = {}
for nm in ("subrange-feedback-claude-continuation-steps7-iv-N4000-s1w", "subrange-feedback-claude-continuation-steps7-iv-N4000-s2w", "subrange-feedback-claude-continuation-steps7-iv-N4000-s3w", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t1b", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t2", "speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t3",
           "turning-point-claude-continuation-steps9-iv-N4000-p1", "turning-point-claude-continuation-steps9-iv-N4000-p2", "turning-point-claude-continuation-steps9-iv-N4000-p3", "turning-point-claude-continuation-steps9-iv-N4000-p4", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p5", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p6", "turning-point-claude-continuation-steps9-iv-v3b-N4000-p7", "turning-point-claude-continuation-steps9-iv-v3c1-N4000-q1", "turning-point-claude-continuation-steps9-iv-v3c1-N4000-q2"):
    for st_ in json.load(open(E10 + "spherical-six-pole-" + nm + ".json"))["steps"]:
        if st_.get("certified") is True: FROZEN[st_["step"]] = (st_["end_q_str"], st_["end_v_str"])
INSERT = r'''
exec(DR_MID)
print("ddl-refine controls R1-R3 passed on the full frozen table", flush=True)
RECS[:] = [R_ for R_ in RECS if not (R_["label"].startswith("sf-") or R_["label"].startswith("tc-"))]; assert len(RECS) == 204 and RECS[-1]["label"].endswith("-154"), (len(RECS), RECS[-1]["label"]); out["truncated_to_step_154"] = True
F154 = (list(RECS[-1]["end_q"]), list(RECS[-1]["end_v"]))
def app_checked(st, x):
    a = mpf(st["t_int"][0]); b = mpf(st["t_int"][1])
    if not (abs(a - (x["a"] + DELTA)) <= TOL and abs(b - (x["b"] + DELTA)) <= TOL): raise ValueError("gap or misalignment at step %d" % st["step"])
    R = {"a": a, "b": b, "S": Ip(st["S"]), "VS": Ip(st["VS"]), "a0": Ip(st["a0"]), "ap": Ip(st["ap"]), "end_q": st["end_q_str"], "end_v": st["end_v_str"], "label": "own-%d" % st["step"], "st": st, "Q0": Ip(x["end_q"]), "V0": Ip(x["end_v"]), "first_read": []}
    R["A"] = R["a0"] + R["ap"]*I("0", "0.01")
    if not (contains(R["S"], Ip(x["end_q"])) and contains(R["VS"], Ip(x["end_v"]))): raise ValueError("discontinuous at step %d" % st["step"])
    if st["step"] in FROZEN:
        fq, fv = FROZEN[st["step"]]
        if not (meets(Ip(st["end_q_str"]), Ip(fq)) and meets(Ip(st["end_v_str"]), Ip(fv))): raise ValueError("does not meet its frozen record at step %d" % st["step"])
    return R
_S0 = json.load(open(OWN[0])); _st0 = [s_ for s_ in _S0["steps"] if s_.get("certified")][0]; _start = _S0.get("start") or {}
cI = {"I1_reproduces_step154_strings": bool(_start.get("after_step") == 154 and _start.get("q") == F154[0] and _start.get("w") == F154[1] and _st0["step"] == 155)}
try: app_checked(_st0, RECS[-1]); cI["I2_known_append_accepted"] = True
except ValueError: cI["I2_known_append_accepted"] = False
_g = dict(_st0); _g["t_int"] = [str(mpf(_st0["t_int"][0]) + DELTA), str(mpf(_st0["t_int"][1]) + DELTA)]
try: app_checked(_g, RECS[-1]); cI["I3_gap_refused"] = False
except ValueError as e_: cI["I3_gap_refused"] = "gap" in str(e_)
_m = dict(_st0); _m["end_q_str"] = [str(mpf(_st0["end_q_str"][0]) + mpf("0.01")), str(mpf(_st0["end_q_str"][1]) + mpf("0.01"))]
try: app_checked(_m, RECS[-1]); cI["I4_frozen_mismatch_refused"] = False
except ValueError as e_: cI["I4_frozen_mismatch_refused"] = "frozen" in str(e_)
out["controls"]["ddl10_insertion"] = cI; print("insertion controls", cI, flush=True); assert all(cI.values()), "ddl10 insertion control failure"
for p_o in OWN:
    for st in json.load(open(p_o))["steps"]:
        if not st.get("certified"): continue
        x = RECS[-1]
        if x["label"].startswith("own-") and st["step"] <= int(x["label"].rsplit("-", 1)[1]): continue
        RECS.append(app_checked(st, x))
print("checked append done; last", RECS[-1]["label"], flush=True)
'''
_t = _b.decode(); _A = "for p_o in OWN:"; assert _t.count(_A) == 1; _t = _t.replace(_A, INSERT + _A, 1)
exec(_t)
# ---------- after audit9 v5 (controls, R1-R3, insertion controls, append; no targets) ----------
STEPS = {}
for p_o in OWNF:
    for st_ in json.load(open(p_o))["steps"]:
        if st_.get("certified") is True: STEPS[st_["step"]] = st_
def end_strings(k): return (F154[0], F154[1]) if k == 154 else (STEPS[k]["end_q_str"], STEPS[k]["end_v_str"])
ENDS = {}
for k in range(K1 - 1, K2 + 1):
    if k in STEPS: oe = own_end2(STEPS[k]); ENDS[k] = {"dl": oe.get("dl"), "dl_sign": oe.get("dl_sign"), "subject_dl": oe.get("subject_dl"), "on_subject_boxes_dl": (oe.get("on_subject_boxes") or {}).get("dl")}
rows = []; Dv = iv.mpf(DELTA)
for k in range(K1, K2 + 1):
    if k not in STEPS: rows.append({"step": k, "status": "absent"}); continue
    q0s, v0s = end_strings(k - 1); rf = refine_step(STEPS[k], q0s, v0s, KSUB); row = {"step": k, "ddl": rf.get("ddl_hull"), "ddl_sign": rf.get("sign", rf.get("status")), "dl_end": ENDS.get(k, {}).get("dl")}
    labs = sorted(set(nm for p_ in rf.get("pieces", []) for v_ in (p_.get("records") or {}).values() for nm in (v_ or [])))
    row["reads_frozen_records_through_154"] = [x for x in labs if not x.startswith("own-")]; row["reads_reconstructed_records"] = [x for x in labs if x.startswith("own-")]
    row["history"] = "reconstructed only" if labs and not row["reads_frozen_records_through_154"] else ("frozen (through 154) only" if labs and not row["reads_reconstructed_records"] else "mixed")
    ea = ENDS.get(k - 1, {}).get("dl"); eb = ENDS.get(k, {}).get("dl")
    if k - 1 == 154 or rf.get("ddl_hull") is None or ea is None or eb is None: row["lemma"] = "not evaluated"; rows.append(row); print(k, row["ddl_sign"], row["lemma"], flush=True); continue
    Au = iv.mpf(up(I(*ea))); Bu = iv.mpf(up(I(*eb))); Lw = mpf(rf["ddl_hull"][0]); Uw = mpf(rf["ddl_hull"][1])
    Up = iv.mpf(max(Uw, mpf(0))); Lp = iv.mpf(max(-Lw, mpf(0)))
    c1 = up(Au + Up*Dv); c2 = up(Bu + Lp*Dv); cands = [c1, c2]
    if up(Up + Lp) > 0 and lo(Up + Lp) > 0: cands.append(up((Au*Lp + Bu*Up + Up*Lp*Dv)/(Up + Lp)))
    bnd = min(cands); row["lemma"] = {"A_up": str(up(Au)), "B_up": str(up(Bu)), "L": str(Lw), "U": str(Uw), "start_only": str(c1), "end_only": str(c2), "bound": str(bnd), "sign": "negative" if bnd < 0 else "UNDECIDED"}
    rows.append(row); print(k, "ddl", (rf.get("ddl_hull") or ["", ""])[0][:10], (rf.get("ddl_hull") or ["", ""])[1][:10], "end dl up", str(up(Bu))[:11], "bound", str(bnd)[:12], row["lemma"]["sign"], "|", row["history"], flush=True)
neg = [r_["step"] for r_ in rows if isinstance(r_.get("lemma"), dict) and r_["lemma"]["sign"] == "negative"]
res = {"ddl10_sha256": SELF_SHA, "inputs_sha256": INPUT_SHA, "range": [K1, K2], "ksub": KSUB, "insertion_controls": out["controls"]["ddl10_insertion"], "refine_controls": {k_: (v_ if isinstance(v_, bool) else True) for k_, v_ in out["controls"]["refine"].items()}, "rows": rows, "lemma_negative_steps": neg}
json.dump(res, open(OUTP + ".ddl10.json", "w"), indent=1); print("lemma negative steps:", neg, flush=True); print("saved", OUTP + ".ddl10.json", flush=True)
