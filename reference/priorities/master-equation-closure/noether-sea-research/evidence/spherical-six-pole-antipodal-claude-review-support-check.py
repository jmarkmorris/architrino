# Review check 2 (ramon-e-moore lens), 2026-10-11 ~18:17 UTC: independent evaluation of the support enclosure lambda_hat = -qdot^2 - a_rad on
# selected certified steps of the frozen wave-17 full N4000 JSON (shared DATA, not shared code: the closed forms are the review's own, verified
# against direct vector computation in the Phase A instrument). Reads the support role's JSON only to compare numbers after computing its own.
import os, sys, json, time
print("PID", os.getpid(), flush=True)
from mpmath import iv
iv.dps = 30
T0 = time.time()
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
g = I(1)/10; S2 = iv.sqrt(2)
def Mf(q, qp): return iv.cos(q+qp)/S2 - iv.sin(q)*iv.cos(qp)/2
def r_mer(q, qp, sg): return iv.sqrt(2 - sg*S2*iv.sin(q+qp) + sg*iv.sin(q)*iv.sin(qp))
w17 = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave17-sixpole-steps2-iv-N4000-full.json"))
out = {"steps": [], "note": "review's own closed forms on the wave-17 JSON step boxes (S, VS, per-class history_q_range, Dt_range); antipode fixed (certified unread) at chord 2cos(q/2)"}
def lam_on(q, v, cu, cl):
    rU = r_mer(q, I(*cu["history_q_range"]), 1); DU = I(*cu["Dt_range"])
    rL = r_mer(q, I(*cl["history_q_range"]), -1); DL = I(*cl["Dt_range"])
    rA = 2*iv.cos(q/2)
    arad = g*(1/(rL*DL) - 1/(rU*DU) - 1/(2*rA))
    lam = -v**2 - arad
    return arad, lam, rU, DU, rL, DL
def J(x): return [str(x.a), str(x.b)]
for k in [1, 10, 20, 30, 40]:
    st = w17["steps"][k-1]; assert st["certified"] and st["step"] == k
    q = I(*st["S"]); v = I(*st["VS"]); cu = st["classes"]["unlike"]; cl = st["classes"]["like"]
    assert cu["tau_containment_asserted"] and cl["tau_containment_asserted"]
    arad, lam, rU, DU, rL, DL = lam_on(q, v, cu, cl)
    sign = "positive" if lam.a > 0 else ("negative" if lam.b < 0 else "UNDECIDED")
    rec = {"step": k, "t_int": st["t_int"], "arad": J(arad), "qdot2": J(v**2), "lambda_hat": J(lam), "sign": sign, "arad_negative": bool(arad.b < 0), "DU": J(DU), "DL": J(DL)}
    out["steps"].append(rec); print(json.dumps({k2: rec[k2] for k2 in ["step", "lambda_hat", "sign", "arad"]}), flush=True)
# endpoint: end q, qdot with the step-40 delayed boxes as outer bounds (the support role's stated premise)
st = w17["steps"][39]; qe = I(*st["end_q_str"]); ve = I(*st["end_v_str"])
arad, lam, *_ = lam_on(qe, ve, st["classes"]["unlike"], st["classes"]["like"])
out["endpoint"] = {"q": J(qe), "qdot": J(ve), "arad": J(arad), "lambda_hat": J(lam), "sign": "positive" if lam.a > 0 else ("negative" if lam.b < 0 else "UNDECIDED"),
                   "premise": "step-40 history_q_range and Dt_range boxes contain the end-state delayed values only if those boxes cover the step end; the JSON records them as whole-step ranges (tau_range, Dt_range, history ranges over t_int), so the premise holds for the end state"}
print("endpoint", json.dumps(out["endpoint"]["lambda_hat"]), out["endpoint"]["sign"], flush=True)
# comparison with the support role's JSON (read AFTER the review's own values are computed)
try:
    sp = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-support-geometry-iv.json"))
    out["support_endpoint_as_recorded"] = sp.get("endpoint"); srec = {s.get("step"): s for s in sp.get("steps", []) if isinstance(s, dict)}
    out["support_steps_as_recorded"] = {str(k): srec.get(k) for k in [1, 10, 20, 30, 40]}
    out["support_step_keys"] = list(sp.get("steps", [{}])[0].keys()) if sp.get("steps") else []
except Exception as ex:
    out["support_read_error"] = repr(ex)
out["wall_s"] = time.time() - T0
p = sys.argv[1]; assert not os.path.exists(p); json.dump(out, open(p, "w"), indent=1); print("saved", p, "wall", round(out["wall_s"], 2))
