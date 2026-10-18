# Turning-point campaign, support role (emmy-noether): SUBDIVIDED enclosure of l'' (second derivative of the signed support) over sub-intervals of each step.
# Executes this role's d2l-iv.py v2 (12ecb51b...) up to its target section: the full slice6 control set, the jet rules and the jet controls J1-J4 with
# negatives N1-N4 (exit on failure). New here, with its own controls before any target:
#   each step [t_k, t_k + Delta] (uncertain origin) is cut into n equal sub-intervals; on sub-interval i the RECEIVER q, w, a come from this role's
#   sub-range lookup on the receiver's OWN accepted record (the continuation's step record, appended to the chain after a join check), the receiver jerk
#   from the intersection of that record's stored rate bound with this role's whole-step d(a)/dt enclosure; each partner's source-time range is
#   contracted on the sub-interval by S <- (tau_i - r_c(q_i, q'(S))) intersect S, starting from the step's recorded source range (valid: every true source
#   time of an instant in tau_i lies in S and satisfies the delay relation); source q', w', a' from the lookup on the contracted range and the source
#   jerk from the hull of the stored rate bounds of the touched records. Jets as in d2l-iv give l'' on each sub-interval.
# Controls of the new part (before the target): (S1) inclusion: on the closed campaign's accepted steps 270-274 every sub-interval enclosure lies inside
# the whole-step enclosure of d2l-iv for that step (inclusion isotonicity); (S2) known: the receiver lookup on the last sub-interval of a step meets that
# step's end strings, on the first meets its start strings; (S3) negative: a sub-interval shifted by one step (wrong origin) fails S2; (S4) negative: the
# source contraction run with the wrong class chord on a real step either empties or excludes the recorded source range's true end root (checked against
# this role's residual signs).
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json> <n> <slice7 record> <subject slice.json ...>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
EVDS = "reference/priorities/master-equation-closure/noether-sea-research/evidence/"
OUTS = sys.argv[1]; NSUB = int(sys.argv[2]); REC7S = sys.argv[3]; SUBJ = sys.argv[4:]
_as = sys.argv; sys.argv = [_as[0], OUTS + ".d2l-controls.json"]
exec(open(EVDS + "spherical-six-pole-turning-point-claude-support-d2l-iv.py").read().split("# ---- target: whole-step enclosure", 1)[0])
sys.argv = _as; assert outQ["controls_all_pass"]
mp.dps = 30; iv.dps = 30; outS = {"controls": [], "n_sub": NSUB}; tS = time.time()
def rcS(q, qp, c):
    if c == 0: return 2*iv.cos((q - qp)/2)
    return iv.sqrt(2 - c*S2*iv.sin(q + qp) + c*iv.sin(q)*iv.sin(qp))
def add_subject(files, slabs_raw, slabs_law):
    raw = list(slabs_raw); law = list(slabs_law)
    for f in files:
        for st in json.load(open(f))["steps"]:
            if not st.get("certified"): break
            raw.append(("sm", st)); law.append(rec_boxes(st, "sm"))
    sl = make_slabs(raw, law, QT, VT); bad, _ = joins(sl); return sl, bad
def sub_eval(row, slabs, n, chord_override=None, shift=0):
    k = row["step"]; rec = [s for s in slabs if s["src"] == "sm" and s["step"] == k]
    if not rec: return None, "receiver record not in chain"
    rec = rec[0]; T0 = rec["T"]; jr = iv_of(row["dqddot_dt_range"]); jr2 = inter(jr, rec["AP"]); jr = jr2 if jr2 is not None else None
    if jr is None: return None, "receiver jerk enclosures disjoint"
    outl = []
    for i in range(n):
        tau = I(lo(T0) + DELTA*i/n + shift, up(T0) + DELTA*(i + 1)/n + shift)
        rr, why = lookup(tau, slabs)
        if rr is None: return None, "receiver lookup refused: " + why
        q_, w_, a_ = rr[0], rr[1], rr[2]; srcs = {}
        for name, c in (("unlike", 1), ("like", -1), ("antipode", 0)):
            Sx = iv_of(row["cls"][name]["delayed_arg"]); cc = chord_override.get(name, c) if chord_override else c
            for _ in range(4):
                rs, why = lookup(Sx, slabs)
                if rs is None: return None, "source lookup refused: " + why
                Sn = inter(tau - rcS(q_, rs[0], cc), Sx)
                if Sn is None: return None, "empty source contraction (%s)" % name
                Sx = Sn
            rs, why = lookup(Sx, slabs); jp = None
            for t_ in rs[3]:
                sl_ = [s for s in slabs if "%s#%d" % (s["src"], s["step"]) == t_][0]; jp = sl_["AP"] if jp is None else hull(jp, sl_["AP"])
            srcs[c] = (rs[0], rs[1], rs[2], jp)
        lj, arj, inf = l_jet(iv, q_, w_, a_, jr, srcs); outl.append((tau, lj.d2, lj.d1, q_, w_))
    return outl, "ok"
# ---- controls of the subdivision
CLS = EVDS + "spherical-six-pole-speed-maximum-feedback-claude-continuation-steps8-iv-N4000-t3.json"
d7r = json.load(open(EVDS + "spherical-six-pole-turning-point-claude-support-slice7-replay-t3.json")); rows_r = {r["step"]: r for tg in d7r["targets"] for r in tg["rows"] if "qddot_range" in r}
d2r = {r["step"]: r for r in json.load(open(EVDS + "spherical-six-pole-turning-point-claude-support-d2lv2-replay-t3.json"))["target"] if "d2l_over_step" in r}
SLr = [dict(s, src=("sm" if s["src"] == "sm" else s["src"])) for s in SLABS]      # steps 215-274 are already "sm" records of the 324-chain
okS1 = True; okS2 = True; det = {}
for k in (270, 272, 274):
    res, why = sub_eval(rows_r[k], SLr, 4)
    if res is None: okS1 = False; det[k] = why; continue
    whole = iv_of(d2r[k]["d2l_over_step"]); ins = all(inside(x[1], whole) for x in res); okS1 = okS1 and ins
    rec = [s for s in SLr if s["src"] == "sm" and s["step"] == k][0]; okS2 = okS2 and meets(res[-1][3], rec["Qe"]) and meets(res[0][3], rec["Q0"]) and meets(res[-1][4], rec["Ve"])
    det[k] = {"sub": [J(x[1]) for x in res], "whole": d2r[k]["d2l_over_step"], "inside": bool(ins)}
outS["controls"].append({"name": "(S1) inclusion: on accepted steps 270, 272, 274 of the closed campaign each of 4 sub-interval enclosures of l'' lies inside the whole-step enclosure", "detail": det, "pass": bool(okS1)})
outS["controls"].append({"name": "(S2) known: the receiver lookup on the last sub-interval meets the step's end strings (q, w), on the first its start strings", "pass": bool(okS2)})
r3, w3 = sub_eval(rows_r[272], SLr, 4, shift=DELTA*2)
ok3 = bool(r3 is None or not meets(r3[-1][3], [s for s in SLr if s["src"] == "sm" and s["step"] == 272][0]["Qe"]))
outS["controls"].append({"name": "(S3) negative: sub-intervals shifted by two steps (wrong origin) no longer meet the step-272 end strings (or are refused)", "outcome": w3 if r3 is None else "evaluated", "pass": ok3})
r4, w4 = sub_eval(rows_r[272], SLr, 4, chord_override={"unlike": -1})
outS["controls"].append({"name": "(S4) negative: the unlike source contraction with the like chord on step 272 empties (inconsistent root) or is refused", "outcome": w4 if r4 is None else "evaluated", "pass": bool(r4 is None)})
outS["controls_all_pass"] = all(c["pass"] for c in outS["controls"]); print(json.dumps(outS["controls"])[:3000], flush=True); json.dump(outS, open(OUTS, "w"), indent=1)
if not outS["controls_all_pass"]: print("CONTROL FAILURE: no target", flush=True); sys.exit(3)
# ---- target
SLt, badj = add_subject(SUBJ, ALLRAW6, ALLLAW6)
if badj: print("JOIN FAILURE", badj[:3], flush=True); sys.exit(4)
d7 = json.load(open(REC7S)); rows7 = [r for tg in d7["targets"] for r in tg["rows"] if "qddot_range" in r]; res_all = []
for r in rows7:
    res, why = sub_eval(r, SLt, NSUB)
    if res is None: res_all.append({"step": r["step"], "refused": why}); print(r["step"], "REFUSED", why, flush=True); continue
    lo_ = min(lo(x[1]) for x in res); hi_ = max(up(x[1]) for x in res); sg = "pos" if lo_ > 0 else ("neg" if hi_ < 0 else "und")
    res_all.append({"step": r["step"], "t_end": r["t_end"], "sub_d2l": [J(x[1]) for x in res], "hull": [s45(lo_), s45(hi_)], "sign_over_step": sg, "sub_dl": [J(x[2]) for x in res]})
    print(r["step"], "d2l hull", s45(lo_)[:10], s45(hi_)[:10], sg, flush=True); outS["target"] = res_all; json.dump(outS, open(OUTS, "w"), indent=1)
outS["signs"] = {r["step"]: r.get("sign_over_step", "refused") for r in res_all}; outS["wall_s"] = time.time() - tS; json.dump(outS, open(OUTS, "w"), indent=1); print("signs", json.dumps(outS["signs"]), flush=True)
