# Diagnostic (continuation role): why the resumed step from the frozen b3 step-20 state does not reproduce the step-21 end_v string exactly at N = 4000.
import sys, json, os, time
print("pid", os.getpid(), flush=True)
sys.argv = [sys.argv[0], "4000", "/dev/null", "0", "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv-N4000-three-b3.json", "21"]
src = open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-late-feedback-claude-continuation-steps4-iv.py").read().split("# ---- controls before target", 1)[0]
exec(src)
b3 = json.load(open(B3JSON)); s20 = b3["steps"][-2]; s21 = b3["steps"][-1]
t20 = I(mp.mpf(s20["t_int"][0]) + mp.mpf("0.01"), mp.mpf(s20["t_int"][1])); Q20 = I(mp.mpf(s20["end_q_str"][0]), mp.mpf(s20["end_q_str"][1])); V20 = I(mp.mpf(s20["end_v_str"][0]), mp.mpf(s20["end_v_str"][1]))
print("b3 resumed t0 for step 12 was", b3["resumed_from"]["t0"], "; our t20", s45(t20.a), s45(t20.b), "; s21 t_int", s21["t_int"])
for label, hfun in (("history_ext", history_ext), ("window-only (frozen v10 history)", _history_window)):
    history = hfun
    st = step(enc, t20, Q20, V20, iv.mpf("0.01"), (1, -1, 0))
    print(label, "end_q", st["end_q_str"], "frozen", s21["end_q_str"]); print(label, "end_v", st["end_v_str"], "frozen", s21["end_v_str"]); print(label, "a0", st["a0"], "frozen", s21["a0"]); print(label, "ap", st["ap"], "frozen", s21["ap"])
    print(label, "classes tau0", {k: v["tau0"] for k, v in st["classes"].items()}); print("frozen tau0", {k: v["tau0"] for k, v in s21["classes"].items()})
