# Like-reception campaign (continuation role): fills the report template with exact strings from the events JSON, the table and the v4 records (strings only; no enclosure).
# Usage: <this> <template.md> <events.json> <table.md> <hashes.txt> <kib> <out.md>
import json, os, sys
from decimal import Decimal, ROUND_FLOOR, ROUND_CEILING
print("pid", os.getpid())
tpl, evf, tabf, hashf, kib, outf, runsf = sys.argv[1:8]
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-like-reception-claude-continuation-steps6-iv-N4000-"
def outw(p, nd=10):
    q = Decimal(1).scaleb(-nd); return "[" + str(Decimal(p[0]).quantize(q, rounding=ROUND_FLOOR)) + ",\\," + str(Decimal(p[1]).quantize(q, rounding=ROUND_CEILING)) + "]"
def full(p): return "[" + p[0] + ",\\," + p[1] + "]"
# control first: outward rounding known cases (lower end floors, upper end ceils, also for negatives)
assert outw(["0.123456789", "0.123456781"], 4) == "[0.1234,\\,0.1235]" and outw(["-0.123456789", "-0.123456781"], 4) == "[-0.1235,\\,-0.1234]", "outward rounding control failed"
print("control: outward rounding known cases pass")
d = json.load(open(evf)); ev = d["events"]; sm = d["summary"]; ad = d["additions"]
steps = []
for p in sm["parts"]: steps += [s for s in json.load(open(E + p + ".json"))["steps"] if s.get("certified") is True]
T = {}
T["NSTEPS"] = str(sm["n_certified_steps"]); T["FIRST"] = str(sm["first_step"]); T["LAST"] = str(sm["last_step"])
T["REACHED_T_LO"] = str(Decimal(sm["reached_t"][0].split(" + ")[0]) + Decimal("0.01")); T["REACHED_T_HI"] = sm["reached_t"][1]
T["REACHED_Q"] = "$" + outw(sm["reached_q"]) + "$"; T["REACHED_QDOT"] = "$" + outw(sm["reached_qdot"]) + "$"
TS = "1.366684593623649597167969"; TSU = "1.366684709182828044891357"
def cross(e, sym, name):
    return ("The " + name + " delayed argument $" + sym + "$ is enclosed below the original window end at the step-" + str(e["earlier_step"]) + " end, $" + sym + "\\in" + full(e["delayed_arg_at_earlier_end"]) + "<{\\rm lo}(T^*)=" + TS + "$, and above it at the step-" + str(e["later_step"]) + " end, $" + sym + "\\in" + full(e["delayed_arg_at_later_end"]) + ">{\\rm up}(T^*)=" + TSU + "$; with full time uncertainty the crossing lies in $t\\in" + full(e["t_bracket_full_uncertainty"]) + "$.")
lk = ev["like_crossing_of_T_star"]; assert len(lk) == 1 and lk[0]["T_star"] == [TS, TSU]; T["LIKE_EVENT"] = cross(lk[0], "s_L=t-\\tau_L", "like")
an = ev.get("antipode_crossing_of_T_star", []); T["ANTIPODE_EVENT"] = cross(an[0], "s_A=t-\\tau_A", "antipode") if len(an) == 1 else "Not reached within the certified steps."
un = ev.get("unlike_entry_into_late_feedback_records", [])
if len(un) == 1:
    u = un[0]; T["UNLIKE_EVENT"] = ("The unlike delayed argument $s_U=t-\\tau_U$ is enclosed below the end of the antipodal-campaign records (the start of the late-feedback records, $" + full(u["antipodal_records_end_time"]) + "$) at the step-" + str(u["last_step_end_below"]) + " end, $s_U\\in" + full(u["delayed_arg_at_last_below"]) + "$, and above it at the step-" + str(u["first_step_end_above"]) + " end, $s_U\\in" + full(u["delayed_arg_at_first_above"]) + "$ (the intermediate step end straddles the seam); with full time uncertainty the passage lies in $t\\in" + full(u["t_bracket_full_uncertainty"]) + "$.")
else: T["UNLIKE_EVENT"] = "Not reached within the certified steps."
T["MAX_SL"] = sm["max_delayed_arg_end"]["like"]; T["MAX_SU"] = sm["max_delayed_arg_end"]["unlike"]
maxsu_over = max(Decimal(s["classes"]["unlike"]["delayed_arg_range"][1]) for s in steps); T["MIN_MARGIN_U"] = str((Decimal("2.806684709182828044891357") - maxsu_over).quantize(Decimal("0.0001"), rounding=ROUND_FLOOR))
T["ITER"] = str(sm["iterations_seen"]); T["RECON"] = "true at every step" if sm["all_reconciled"] else "NOT all true"; T["TRACE"] = "true at every step and class" if (ad["trace_identity_all_steps"] and ad["consumed_object_identity_all"]) else "NOT all true"
for c, k in (("unlike", "D_U"), ("like", "D_L"), ("antipode", "D_A")): T[k] = "$" + outw(sm["Dt_range_extremes"][c], 4) + "$"
T["QDD"] = "signs seen at step starts " + str(ev["qddot_start_sign_values_seen"]) + ", over steps " + str(sorted(set(s["qddot_range_sign"] for s in steps))) + ", at step ends " + str(ev["qddot_end_sign_values_seen"])
T["TAN_95"] = "$" + outw(ad["tangent_sum_end_by_step"]["95"], 6) + "$"; T["TAN_154"] = "$" + outw(ad["tangent_sum_end_by_step"]["154"], 6) + "$"
T["ARAD_FIRST"] = "$" + outw(sm["a_rad_end_first_last"][0], 6) + "$"; T["ARAD_LAST"] = "$" + outw(sm["a_rad_end_first_last"][1], 6) + "$"
T["LAM"] = "signs seen at step starts " + str(ev["lambda_hat_start_sign_values_seen"]) + ", over steps " + str(ev["lambda_hat_range_sign_values_seen"]) + ", at step ends " + str(ev["lambda_hat_end_sign_values_seen"])
T["LAM_FIRST"] = "$" + outw(sm["lambda_hat_end_first_last"][0], 6) + "$"; T["LAM_LAST"] = "$" + outw(sm["lambda_hat_end_first_last"][1], 6) + "$"
cc = sm["class_contributions_end_last"]
for c, a in (("unlike", "U"), ("like", "L"), ("antipode", "A")): T["C_T" + a] = "$" + outw(cc[c]["tangent"], 6) + "$"; T["C_R" + a] = "$" + outw(cc[c]["radial"], 6) + "$"
lc = ad["crossing_step_consumed"]["like"]["remainder_consumed"]; T["LIKE_CONS_RANGE"] = full(lc["delayed_range"]); T["LIKE_CONS_ACC"] = full(lc["history_qddot"]); T["LIKE_CONS_ACC_W"] = full(lc["window_part"]["history_qddot"]); T["LIKE_CONS_ACC_R"] = full(lc["record_part"]["history_qddot"]); T["LIKE_CONS_Q"] = full(lc["history_q"])
if "antipode" in ad["crossing_step_consumed"]:
    ac = ad["crossing_step_consumed"]["antipode"]["remainder_consumed"]; T["ANTI_CONS_RANGE"] = full(ac["delayed_range"]); T["ANTI_CONS_ACC"] = full(ac["history_qddot"])
else: T["ANTI_CONS_RANGE"] = "\\text{n/a}"; T["ANTI_CONS_ACC"] = "\\text{n/a}"
T["UNLIKE_BOTH"] = "step " + ", ".join(str(x) for x in ad["unlike_steps_reading_both_antipodal_and_late_feedback_records"]) if ad["unlike_steps_reading_both_antipodal_and_late_feedback_records"] else "none"
chg = [k for k in ("lambda_hat_end_sign_changes", "lambda_hat_start_sign_changes", "lambda_hat_range_sign_changes", "qddot_end_sign_changes", "qddot_start_sign_changes") if ev[k]]
T["SIGN_EVENTS"] = "none: no change of sign of $\\hat\\lambda$ or of $\\ddot q$ at step starts, over steps or at step ends (every enclosure has a proved sign; no undecided interval)." if not chg else "sign changes recorded in the events JSON: " + ", ".join(chg)
def fam(c): return "; ".join("from step " + str(a) + ": " + b for a, b in sm["families_read_at_step_ends"][c])
T["FAM_U"] = fam("unlike"); T["FAM_L"] = fam("like"); T["FAM_A"] = fam("antipode")
for c, k in (("unlike", "MARG_U"), ("like", "MARG_L"), ("antipode", "MARG_A")): T[k] = str(Decimal(sm["min_margin_to_coverage_end"][c]).quantize(Decimal("0.001"), rounding=ROUND_FLOOR))
ms = sm["min_separations"]; T["SEP_U"] = ms["r_unlike_delayed_min"][:6]; T["SEP_L"] = ms["r_like_delayed_min"][:6]; T["SEP_A"] = ms["r_antipode_delayed_min"][:6]; T["SEP_SIM"] = ms["simultaneous_unlike_pair_chord_min"][:6]
T["W_FIRST"] = "$" + sm["qdot_width_first_last"][0] + "$"; T["W_LAST"] = "$" + sm["qdot_width_first_last"][1] + "$"
T["MAX_QP"] = str(max(Decimal(s["classes"][c]["history_q_range"][1]) for s in steps for c in ("unlike", "like", "antipode")).quantize(Decimal("0.001"), rounding=ROUND_CEILING))
T["MAX_VP"] = str(max(Decimal(s["classes"][c]["history_qdot_range"][1]) for s in steps for c in ("unlike", "like", "antipode")).quantize(Decimal("0.001"), rounding=ROUND_CEILING))
T["MAX_Q"] = str(max(Decimal(s["S"][1]) for s in steps).quantize(Decimal("0.0001"), rounding=ROUND_CEILING))
T["TABLE"] = open(tabf).read().rstrip(); T["HASHES"] = open(hashf).read().rstrip(); T["KIB"] = kib; T["RUNS"] = open(runsf).read().rstrip()
txt = open(tpl).read()
fixes = [("The traversed values stay inside that box ($q\\le0.5916$; delayed coordinates at most $0.283$, delayed speeds at most $0.245$, from the recorded history hulls).", "The traversed values stay inside that box ($q\\le@@MAX_Q@@$ over every step; delayed coordinates at most $@@MAX_QP@@$ and delayed speeds at most $@@MAX_VP@@$, from the recorded history hulls of all classes)."),
         ("(wave-16, then wave-17 from about step 127; like delayed argument up to @@MAX_SL@@)", "(families at step ends: @@FAM_L@@; like delayed argument up to @@MAX_SL@@)"),
         ("Before that it passed from the wave-17 records into the antipodal-campaign records (step ends 111/112).", "Families read by the unlike class at step ends: @@FAM_U@@."),
         ("the common speed increases from $0.2889$ to $0.3501$; no turning point.", "the common speed increases from $[0.2888830859,\\,0.2890560053]$ at the restart to @@REACHED_QDOT@@; no turning point."),
         ("still @@MIN_MARGIN_U@@ below the end of the predecessor records", "still at least @@MIN_MARGIN_U@@ (over every step) below the end of the predecessor records"),
         ("since the widths now grow by about a factor two per 25 steps.", "since the $\\dot q$ width grew about fivefold over these 60 steps.")]
for a, b in fixes:
    assert txt.count(a) == 1, a[:60]; txt = txt.replace(a, b)
import re
for k, v in T.items(): txt = txt.replace("@@" + k + "@@", v)
left = sorted(set(re.findall(r"@@[A-Z_0-9]+@@", txt))); assert not left, left
assert "retard" not in txt.lower()
open(outf, "w").write(txt); print("report written:", len(txt), "chars;", len(steps), "steps; tokens", len(T))
for k in ("REACHED_T_LO", "MIN_MARGIN_U", "MAX_QP", "MAX_VP", "MAX_Q", "D_U", "D_L", "D_A", "TAN_95", "TAN_154", "ARAD_FIRST", "ARAD_LAST", "LAM_FIRST", "LAM_LAST", "C_TU", "C_TL", "C_TA", "C_RU", "C_RL", "C_RA", "FAM_U", "FAM_L", "FAM_A", "MARG_U", "MARG_L", "MARG_A", "UNLIKE_BOTH"): print(k, "=", T[k])
