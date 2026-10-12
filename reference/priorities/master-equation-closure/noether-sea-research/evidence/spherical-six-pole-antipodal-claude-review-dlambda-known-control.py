# Review (ramon-e-moore lens), 2026-10-11 18:42 UTC: closes the control obligation of the derivative instrument with an EXACT known case, recorded
# BEFORE a bounded rerun of the UNCHANGED target formula (the function definitions are exec'd from dlambda-check.py after verifying its sha256; no byte
# of that file is changed; the first outputs are preserved and this run writes a new output file).
# Known case, derived by hand by the review (local model, not a physical history): q = q' = 0 for both meridional classes, qdot = v' = 0, delayed
# acceleration gF(0) = g, so r_U = r_L = sqrt2, M = 1/sqrt2, D = 1, taudot = 0, rdot = 0, Ddot = -sigma g M/r = -sigma g/2, hence
# d/dt[1/(r_U D_U)] = g/(2 sqrt2), d/dt[1/(r_L D_L)] = -g/(2 sqrt2), the fixed antipode term's derivative is 0 (qdot = 0), da_rad/dt = -g^2/sqrt2,
# and d lambda_hat/dt = -2 qdot qddot - da_rad/dt = +g^2/sqrt2 exactly (= 0.00707106781...). Negative control: the flipped velocity sign gives -g^2/sqrt2.
import os, sys, json, hashlib
print("PID", os.getpid(), flush=True)
SRC = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-review-dlambda-check.py"
src = open(SRC, "rb").read(); h = hashlib.sha256(src).hexdigest(); assert h == "f3093e9615e1a759fc4cf7e93ac6c2ba670ae67eed7a0ccd531c9a5a1ad1540f", h
defs = src.decode().split('out = {"controls": {}, "steps": []}')[0]
exec(defs)   # defines I, g, S2, F, afix, cls, dinv_rD, qddot, dlam (unchanged bytes)
out = {"source_sha256": h, "controls": {}, "steps": []}
exact = g*g/S2; Z = I(0)
val, acc, darad, tdU, tdL = dlam(Z, Z, Z, Z, Z, Z)
bad, *_ = dlam(Z, Z, Z, Z, Z, Z, -1)
w = (val.b - val.a)
ok_known = bool(val.a <= exact.a and exact.b <= val.b and w < mpf("1e-25"))
ok_neg = bool(bad.a <= (-exact).a and (-exact).b <= bad.b and bad.b < 0 and val.a > 0)
out["controls"]["K_exact_known_case"] = {"enclosure": [str(val.a), str(val.b)], "exact": [str(exact.a), str(exact.b)], "contains_exact": ok_known, "width": str(w),
                                          "parts": {"qddot": [str(acc.a), str(acc.b)], "darad_dt": [str(darad.a), str(darad.b)], "taudot_U": str(tdU.a), "taudot_L": str(tdL.a)}}
out["controls"]["W_flipped_velocity_sign"] = {"enclosure": [str(bad.a), str(bad.b)], "expected": [str((-exact).a), str((-exact).b)], "contains_expected_and_negative": ok_neg}
print("known case", out["controls"]["K_exact_known_case"]["enclosure"], "exact", str(exact.a)[:20], "pass", ok_known, "| negative", out["controls"]["W_flipped_velocity_sign"]["enclosure"][0][:12], "pass", ok_neg, flush=True)
assert ok_known and ok_neg, "control failure"
d = json.load(open(sys.argv[1])); allneg = True
for st in d["steps"]:
    assert st["certified"] and "antipode" not in st["classes"]
    cu = st["classes"]["unlike"]; cl = st["classes"]["like"]
    assert mpf(cu["delayed_arg_range"][0]) > 0 and mpf(cl["delayed_arg_range"][0]) > 0 and cu["delayed_arg_in_window"] and cl["delayed_arg_in_window"]
    val, acc, darad, tdU, tdL = dlam(I(*st["S"]), I(*st["VS"]), I(*cu["history_q_range"]), I(*cu["history_qdot_range"]), I(*cl["history_q_range"]), I(*cl["history_qdot_range"]))
    neg = bool(val.b < 0); allneg = allneg and neg
    out["steps"].append({"step": st["step"], "t_int": st["t_int"], "dlambda_dt": [str(val.a), str(val.b)], "negative_proved": neg})
    print(st["step"], st["t_int"][1][:14], str(val.a)[:10], str(val.b)[:10], "neg" if neg else "UNDECIDED", flush=True)
out["all_steps_negative_proved"] = allneg; print("all negative proved:", allneg)
prev = json.load(open(sys.argv[2])); same = all(a["dlambda_dt"] == b["dlambda_dt"] for a, b in zip(out["steps"], prev["steps"])); out["identical_to_run13_output"] = same; print("identical to run 13:", same)
p = sys.argv[3]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p)
