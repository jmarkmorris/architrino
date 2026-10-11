# Wave 17: feedback split at the common reached time from the four N = 4000 runs (full, unlike-only, like-only, fixed), all started from the same
# wave-16 end state, and the comparison with the fixed-image reduction's own enclosure (window enclosure continued). Interval differences:
# lower = lo(a) - up(b), upper = up(a) - lo(b). Also lists the full run's per-step table rows and the step-1 like-class record (reading crossing).
import sys, json
from mpmath import mp
mp.dps = 30
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-"
runs = {m: json.load(open(E + m + ".json")) for m in ("full", "unlike", "like", "fixed")}
def iv(s): return (mp.mpf(s[0]), mp.mpf(s[1]))
def diff(a, b): return (a[0] - b[1], a[1] - b[0])
def fmt(x, n=12): return "[" + mp.nstr(x[0], n) + ", " + mp.nstr(x[1], n) + "]"
for m, d in runs.items():
    print(m, "T*", d["T_star"], "reproduces wave 16:", d["T_star_reproduces_wave16"], "controls all pass:", d["controls_all_pass"], "steps certified:", sum(1 for s in d["steps"] if s.get("certified")), "reached", d["reached_time"], "stop:", d["stop_reason"], "wall %.1f" % d["wall_s"])
full = runs["full"]; last = full["steps"][-1]; assert all(runs[m]["steps"][-1]["t_int"] == last["t_int"] for m in runs)
red_v = iv(last["reduction_speed_at_end"]); red_q = iv(last["reduction_q_at_end"])
v = {m: iv(runs[m]["steps"][-1]["end_v_str"]) for m in runs}; q = {m: iv(runs[m]["steps"][-1]["end_q_str"]) for m in runs}
print("\nreached time", last["t_int"][1]); print("reduction (window enclosure) speed", fmt(red_v), "q", fmt(red_q))
for m in runs: print(f"{m:7s} speed {fmt(v[m])} q {fmt(q[m])}  speed - reduction {fmt(diff(v[m], red_v), 6)}  q - reduction {fmt(diff(q[m], red_q), 6)}")
print("\nsplit (same start state): unlike-only - fixed", fmt(diff(v['unlike'], v['fixed']), 6), "; like-only - fixed", fmt(diff(v['like'], v['fixed']), 6), "; full - fixed", fmt(diff(v['full'], v['fixed']), 6), "; full - unlike-only", fmt(diff(v['full'], v['unlike']), 6), "; full - like-only", fmt(diff(v['full'], v['like']), 6))
su = diff(v['unlike'], v['fixed']); sl = diff(v['like'], v['fixed']); print("sum of the two single-class effects", fmt((su[0] + sl[0], su[1] + sl[1]), 6), "versus full - fixed", fmt(diff(v['full'], v['fixed']), 6))
print("\nfull run, step 1 (crossing of the like reading):", json.dumps(full["steps"][0]["classes"]["like"]))
print("full run, step 2 like class:", json.dumps(full["steps"][1]["classes"]["like"]))
print("\ncontrols (full run):"); [print(" ", json.dumps(c)) for c in full["controls"]]
print("\nfull run table: step | t_end | tauU0 | DU0 | tauL0 | DL0 | q_end | v_end | reduction v | sign | antipode chord")
for s in full["steps"]:
    cu = s["classes"]["unlike"]; cl = s["classes"]["like"]
    print(f"| {s['step']} | {s['t_int'][1][:10]} | [{cu['tau0'][0][:12]}, {cu['tau0'][1][:12]}] | [{cu['Dt0'][0][:10]}, {cu['Dt0'][1][:10]}] | [{cl['tau0'][0][:12]}, {cl['tau0'][1][:12]}] | [{cl['Dt0'][0][:10]}, {cl['Dt0'][1][:10]}] | [{s['end_q_str'][0][:12]}, {s['end_q_str'][1][:12]}] | [{s['end_v_str'][0][:12]}, {s['end_v_str'][1][:12]}] | [{s['reduction_speed_at_end'][0][:12]}, {s['reduction_speed_at_end'][1][:12]}] | {s['feedback_sign'].split(' ')[0]} | {s['fixed_chords_at_end']['antipode -e1']:.5f} |")
mins = {k: min(float(s["classes"][k]["Dt_range"][0]) for s in full["steps"]) for k in ("unlike", "like")}; maxs = {k: max(float(s["classes"][k]["Dt_range"][1]) for s in full["steps"]) for k in ("unlike", "like")}
print("\nD_t ranges over the whole plan (full run): unlike [%.6f, %.6f], like [%.6f, %.6f]" % (mins["unlike"], maxs["unlike"], mins["like"], maxs["like"]))
print("max speed upper end over the plan:", max(float(s["VS"][1]) for s in full["steps"]), "; min antipode chord at step ends:", min(s["fixed_chords_at_end"]["antipode -e1"] for s in full["steps"]), "; all tau containment asserted:", all(s["classes"][k]["tau_containment_asserted"] for s in full["steps"] for k in s["classes"]), "; all closed at first inflation:", all(s["iterations"] == 1 for s in full["steps"]), "; reduction F positive at all steps:", all(s["reduction_F_positive"] for s in full["steps"]))
