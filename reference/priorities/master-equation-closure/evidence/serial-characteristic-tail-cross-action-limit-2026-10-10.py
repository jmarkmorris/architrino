"""Zero-amplitude limit of the cross-action mixed coefficient at the finest time spacing.

Imports the direct action evaluator serial-characteristic-tail-cross-action-2026-10-10.py unchanged and
evaluates its central second difference of the action at time spacing 0.0025, regulator width 0.1 and
probe 5e-4 for future amplitudes 0.01 and 0.005, then forms the Richardson combination
(4 M(0.005) - M(0.01))/3, which removes the even-order amplitude error. The derived expectation, from
this review's own action-side calculation and not used in the evaluation, is -(1/2)(1+eps^2)^(-3/2) at
small probe and -1/2 in the limit. The evaluator's known controls run first and must pass.
Float instrument: measured.
"""
import importlib.util
import json
import pathlib
import sys
import time

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ca", here / "serial-characteristic-tail-cross-action-2026-10-10.py")
ca = importlib.util.module_from_spec(spec)
sys.argv = [sys.argv[0], "import-only"]
try:
    spec.loader.exec_module(ca)
except SystemExit:
    pass

t0 = time.time()
k, detail = ca.known()
out = {"known_result": "PASS" if all(k.values()) else "FAIL", "known": {a: bool(b) for a, b in k.items()}}
if out["known_result"] == "PASS":
    rows = []
    for eps in (0.01, 0.005):
        s = dict(eps=eps, p=5e-4, dt=0.0025, eta=0.1)
        r = ca.mixed(**s)
        rows.append(dict(s, **r, derived_finite_amplitude=-0.5 * (1 + eps * eps) ** -1.5))
    out["rows"] = rows
    out["richardson_M"] = (4 * rows[1]["M"] - rows[0]["M"]) / 3
    out["richardson_M_grid_normalised"] = (4 * rows[1]["M_grid_normalised"] - rows[0]["M_grid_normalised"]) / 3
    out["exact_mixed_coefficient"] = -0.5
out["seconds"] = round(time.time() - t0, 1)
print(json.dumps(out, indent=1))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
