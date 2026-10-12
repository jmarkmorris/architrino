# Six-pole antipodal continuation wave 1: results table and class split from the retained JSON records (arithmetic on recorded enclosure strings only; no new enclosure).
import json, os, sys
from mpmath import mp, iv
mp.dps = 30; iv.dps = 30
print("pid", os.getpid())
E = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-"
A = json.load(open(E + "three-a.json")); B = json.load(open(E + "three-b3.json")); A2 = json.load(open(E + "two-a.json")); B2 = json.load(open(E + "two-b.json"))
full = A["steps"] + B["steps"]; held = A2["steps"] + B2["steps"]
assert [s["step"] for s in full] == list(range(1, 22)) and [s["step"] for s in held] == list(range(1, 22))
def I(p): return iv.mpf([mp.mpf(p[0]), mp.mpf(p[1])])
def f(x, n=10): return mp.nstr(mp.mpf(x), n)
# control: held mode reproduces the full run exactly through step 12 (same code path: antipode fixed in both)
same = all(full[k]["end_q_str"] == held[k]["end_q_str"] and full[k]["end_v_str"] == held[k]["end_v_str"] and full[k]["classes"] == held[k]["classes"] for k in range(12))
print("control: held mode == full mode end strings and class records through step 12:", same)
print("| step | t_end | moving | tau_A0 | D_A0 | s_A range (delayed arg) | q_end | qdot_end | reduction qdot | feedback | residual_end | a_rad_end | lambda_hat_end | sign |")
for s in full:
    ca = s["classes"].get("antipode")
    tauA = f"[{s45 if False else ca['tau0'][0][:10]}, {ca['tau0'][1][:10]}]" if ca else "fixed"
    DA = f"[{ca['Dt0'][0][:9]}, {ca['Dt0'][1][:9]}]" if ca else "1 (pre-release emission)"
    sA = f"[{mp.nstr(mp.mpf(ca['delayed_arg_range'][0]), 6)}, {mp.nstr(mp.mpf(ca['delayed_arg_range'][1]), 6)}]" if ca else "<= 0"
    print(f"| {s['step']} | {s['t_int'][1][:12]} | {'+'.join(m[0].upper() for m in s['moving'])} | {tauA} | {DA} | {sA} | [{s['end_q_str'][0][:11]}, {s['end_q_str'][1][:11]}] | [{s['end_v_str'][0][:11]}, {s['end_v_str'][1][:11]}] | [{s['reduction_speed_at_end'][0][:11]}, {s['reduction_speed_at_end'][1][:11]}] | {s['feedback_sign'].split(' ')[0]} | [{s['antipode_residual_end'][0][:9]}, {s['antipode_residual_end'][1][:9]}] | [{s['a_rad_end'][0][:10]}, {s['a_rad_end'][1][:10]}] | [{s['lambda_hat_end'][0][:10]}, {s['lambda_hat_end'][1][:10]}] | {s['lambda_hat_end_sign']} |")
print()
print("lambda_hat over-step ranges (candidate sets) and start values:")
for s in full: print(f"  step {s['step']}: start [{s['lambda_hat_start'][0][:10]}, {s['lambda_hat_start'][1][:10]}] {s['lambda_hat_start_sign']}; range [{s['lambda_hat_range'][0][:10]}, {s['lambda_hat_range'][1][:10]}] {s['lambda_hat_range_sign']}; a_rad range [{s['a_rad_range'][0][:10]}, {s['a_rad_range'][1][:10]}]; delayed args in window {s['delayed_args_in_window']}; closed in {s['iterations']} inflation(s)")
print()
vF = I(full[-1]["end_v_str"]); vH = I(held[-1]["end_v_str"]); qF = I(full[-1]["end_q_str"]); qH = I(held[-1]["end_q_str"]); red = I(full[-1]["reduction_speed_at_end"])
d = vF - vH; dq = qF - qH
print("antipode own contribution at t = 2.0767 (full minus held), speed:", f(d.a, 8), f(d.b, 8), "; q:", f(dq.a, 8), f(dq.b, 8))
print("full minus reduction (window enclosure) speed at the end:", f((vF - red).a, 8), f((vF - red).b, 8), "; held minus reduction:", f((vH - red).a, 8), f((vH - red).b, 8))
# first-order estimate (inference, point arithmetic on the recorded step-start hits): sum over post-reading steps of g * (hit0 - hit_fixed0) * Delta for the antipode
est = mp.mpf(0); rows = []
for s in full:
    ca = s["classes"].get("antipode")
    if not ca: continue
    h = (mp.mpf(ca["hit0"][0]) + mp.mpf(ca["hit0"][1]))/2; hf = (mp.mpf(ca["hit_fixed0"][0]) + mp.mpf(ca["hit_fixed0"][1]))/2
    est += mp.mpf("0.1")*(h - hf)*mp.mpf("0.01"); rows.append((s["step"], mp.nstr(h - hf, 6)))
print("first-order estimate of the antipode's own speed contribution (midpoints of the recorded step-start hit0 - hit_fixed0, times g Delta, summed over steps 13-21):", mp.nstr(est, 6), rows)
print("per-step widths of qdot (full):", [mp.nstr(mp.mpf(s["end_v_str"][1]) - mp.mpf(s["end_v_str"][0]), 4) for s in full])
print("antipode reading (diagnostic):", B["resumed_from"]["antipode_reading"] or B.get("antipode_reading"))
print("lambda sign changes (diagnostic):", B["resumed_from"]["lambda_hat_sign_changes"])
for s in full[12:]:
    ca = s["classes"]["antipode"]; print(f"  step {s['step']}: antipode delayed arg range {ca['delayed_arg_range'][0][:12]} .. {ca['delayed_arg_range'][1][:12]} two_regime {ca['two_regime']}; tau range [{ca['tau_range'][0][:11]}, {ca['tau_range'][1][:11]}]; D range [{ca['Dt_range'][0][:10]}, {ca['Dt_range'][1][:10]}]; hist q [{ca['history_q_range'][0][:10]}, {ca['history_q_range'][1][:10]}] qdot [{ca['history_qdot_range'][0][:10]}, {ca['history_qdot_range'][1][:10]}]")
for s in full[12:]:
    ce = s["end_classes"]["antipode"]; print(f"  step {s['step']} END: antipode tau [{ce['tau'][0][:11]}, {ce['tau'][1][:11]}] D [{ce['Dt'][0][:10]}, {ce['Dt'][1][:10]}] hist q [{ce['hist_q'][0][:10]}, {ce['hist_q'][1][:10]}] qdot [{ce['hist_qdot'][0][:10]}, {ce['hist_qdot'][1][:10]}]")
