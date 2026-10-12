# Like-reception campaign, review (ramon-e-moore lens), 2026-10-11 22:17 UTC (rewritten before its first run for the continuation's v4 trace fields): comparison
# of each record's per-class delayed-ACCELERATION object consumed by the step remainder (v4: classes[c]["remainder_consumed"], traced from the frozen step's call
# of dhit_dt; "history_qddot_range" is set to it) with the review's own hull of the certified source enclosures over the consumed delayed range: g F(q') on the
# window part, a0 + ap*[0, Delta] over every certified record met, two-part hull at T* and across record joins. Definitions exec'd unchanged from audit6.py
# (hash asserted). Reports containment both ways, endpoint differences, the trace-identity flags, equality of the consumed delayed range with the record's
# delayed_arg_range, and for a step straddling T* the consumed window and record parts against the review's parts.
# Controls BEFORE targets: (K) on frozen late-feedback s3b2 (record-reading unlike class, steps 72-78; its history_qddot_range was verified in the late-feedback
# campaign) the recorded boxes equal the review hull to 1e-22; (W) a copy with one box shrunk is reported as not containing the review hull.
# Usage: acc-compare.py OUT.json TARGET.json ...
import os, sys, json, hashlib, copy
print("PID", os.getpid(), flush=True)
SRC = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-review-audit6.py"
src = open(SRC, "rb").read(); hsh = hashlib.sha256(src).hexdigest(); assert hsh == "0b68b7c21c95cabaed8d60d2b32b755e3854b993139f47a9c1f3ff00cbb979c2", hsh
exec(src.decode().split("def sgn(x)")[0].replace('print("PID", os.getpid(), flush=True)', ""))
RECS, counts = build_table(); assert len(RECS) == 144
def compare(d):
    rows = []
    for st in d["steps"]:
        for name in ("unlike", "like", "antipode"):
            c = st["classes"][name]; rcv = c.get("remainder_consumed") or {}
            if c.get("history_qddot_range") is None: rows.append({"step": st["step"], "class": name, "status": "no acceleration box recorded"}); continue
            ab = I(*c["history_qddot_range"]); da = [mpf(x) for x in (rcv.get("delayed_range") or c["delayed_arg_range"])]; qb = I(*(rcv.get("history_q") or c["history_q_range"]))
            two = bool(rcv.get("two_part_hull_at_T_star")) or ("history_qddot_record_part" in c)
            if da[1] < Tlo:
                mine = g*F(qb); src_ = "window law gF(q') on the consumed delayed-coordinate box"; names = ["window"]
                if da[0] <= 0: mine = iv.mpf([min(lo(mine), mpf(0)), max(up(mine), mpf(0))])
            else:
                H, names = rec_hull(RECS, max(da[0], Tlo), da[1]); mine = H[2]; src_ = "certified records a0 + ap*[0, Delta]"
                if da[0] <= Thi:
                    qw = I(*rcv["window_part"]["history_q"]) if "window_part" in rcv else (I(*c["history_q_window_part"]) if "history_q_window_part" in c else None)
                    names = ["window part"] + names; src_ = "two-part hull: window law on the consumed window-part coordinate box, and certified records"
                    if qw is not None: mine = hull(mine, g*F(qw))
            row = {"step": st["step"], "class": name, "records_met": names, "source": src_, "consumed": [str(lo(ab)), str(up(ab))], "review_hull": [str(lo(mine)), str(up(mine))], "consumed_contains_review": contains(ab, mine), "review_contains_consumed": contains(mine, ab),
                   "lo_diff_consumed_minus_review": str(lo(ab) - lo(mine)), "hi_diff_consumed_minus_review": str(up(ab) - up(mine)), "trace_identity": rcv.get("is_the_object_returned_by_the_history_call"), "trace_source": rcv.get("source"),
                   "consumed_range_equals_delayed_arg_range": (None if "delayed_range" not in rcv else bool(rcv["delayed_range"] == c["delayed_arg_range"])), "consumed_range": rcv.get("delayed_range"), "record_delayed_arg_range": c["delayed_arg_range"]}
            if two:
                Hr, nr = rec_hull(RECS, Tlo, da[1])
                rp = I(*(rcv["record_part"]["history_qddot"] if "record_part" in rcv else c["history_qddot_record_part"])); wp = I(*(rcv["window_part"]["history_qddot"] if "window_part" in rcv else c["history_qddot_window_part"])); qw = I(*(rcv["window_part"]["history_q"] if "window_part" in rcv else c["history_q_window_part"]))
                row["two_part"] = {"consumed_record_part": [str(lo(rp)), str(up(rp))], "review_record_part": [str(lo(Hr[2])), str(up(Hr[2]))], "record_part_records": nr, "record_part_contains_review": contains(rp, Hr[2]), "record_part_max_abs_diff": str(max(abs(lo(rp) - lo(Hr[2])), abs(up(rp) - up(Hr[2])))),
                                   "consumed_window_part": [str(lo(wp)), str(up(wp))], "window_q_box": [str(lo(qw)), str(up(qw))], "window_part_inside_gF_of_window_q_box": contains(g*F(qw), wp), "parts_overlap": bool(max(lo(rp), lo(wp)) <= min(up(rp), up(wp)))}
            rows.append(row)
    return rows
def md(r): return max(abs(mpf(r["lo_diff_consumed_minus_review"])), abs(mpf(r["hi_diff_consumed_minus_review"])))
out = {"controls": {}, "targets": {}}
lf = json.load(open(E_ + "spherical-six-pole-late-feedback-claude-continuation-steps4-iv-N4000-s3b2.json")); rk = [r for r in compare(lf) if r["class"] == "unlike" and r["step"] >= 72]
okK = bool(len(rk) == 7 and all(r["consumed_contains_review"] and md(r) < mpf("1e-22") for r in rk))
out["controls"]["K_frozen_s3b2_boxes_equal_review_hull"] = {"pass": okK, "max_abs_diff": str(max(md(r) for r in rk))}
bad = copy.deepcopy(lf); cb = bad["steps"][4]["classes"]["unlike"]; cb["history_qddot_range"] = [cb["history_qddot_range"][0], cb["history_qddot_range"][0]]
rw = [r for r in compare(bad) if r["class"] == "unlike" and r["step"] == bad["steps"][4]["step"]]; okW = bool(len(rw) == 1 and not rw[0]["consumed_contains_review"])
out["controls"]["W_shrunk_box_detected"] = okW
print("controls K", okK, out["controls"]["K_frozen_s3b2_boxes_equal_review_hull"]["max_abs_diff"], "W", okW, flush=True); assert okK and okW, "control failure"
for p in sys.argv[2:]:
    d = json.load(open(p)); rows = compare(d); out["targets"][os.path.basename(p)] = rows
    rec = [r for r in rows if "consumed" in r]; beyond = [r for r in rec if r["records_met"] != ["window"]]; win = [r for r in rec if r["records_met"] == ["window"]]
    print("==", os.path.basename(p), "rows", len(rows), "with box", len(rec), "| all consumed contain review:", all(r["consumed_contains_review"] for r in rec), "| record-reading rows", len(beyond), "max |diff|", mp.nstr(max([md(r) for r in beyond] or [mpf(0)]), 3), "| window rows", len(win), "max |diff|", mp.nstr(max([md(r) for r in win] or [mpf(0)]), 3),
          "| trace identity all:", all(r["trace_identity"] for r in rec) if rec and rec[0]["trace_identity"] is not None else "n/a", "| consumed range == delayed_arg_range all:", all(r["consumed_range_equals_delayed_arg_range"] for r in rec) if rec and rec[0]["consumed_range_equals_delayed_arg_range"] is not None else "n/a", "| step flags trace_identity_all_classes:", all(s.get("trace_identity_all_classes", None) for s in d["steps"]) if "trace_identity_all_classes" in d["steps"][0] else "n/a", flush=True)
    for r in rec:
        if "two_part" in r: print("   two-part step", r["step"], r["class"], "consumed", [x[:15] for x in r["consumed"]], "review", [x[:15] for x in r["review_hull"]], json.dumps(r["two_part"])[:900], flush=True)
po = sys.argv[1]; assert not os.path.exists(po); json.dump(out, open(po, "w"), indent=1); print("saved", po)
