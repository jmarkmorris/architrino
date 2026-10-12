"""Independent v2 review: frozen v1 probes, admission adapter, and chain probe.

Only the subject import and the old caller-cache implementation assertion
are adapted. Scientific known cases and all target inputs stay unchanged.
Use the shared venv; numerical c_f=1.
"""
import copy
import pathlib
from fractions import Fraction as Q

here = pathlib.Path(__file__).resolve().parent
frozen = (here / "matched-pair-review-stage3-carrier-probes.py").read_text()
assert frozen.count('root / "matched_pair_stage_3_validated_far_step_carrier.py"') == 1
assert frozen.count('assert cached_paths[1]["segments"][0]["_speed_bound"] < 1') == 1
adapted = frozen.replace('root / "matched_pair_stage_3_validated_far_step_carrier.py"',
                        'root / "matched_pair_stage_3_validated_far_step_carrier_v2.py"')
adapted = adapted.replace('assert cached_paths[1]["segments"][0]["_speed_bound"] < 1',
                         'assert "_speed_bound" not in cached_paths[1]["segments"][0]')
ns = {"__file__": str(here / "matched-pair-review-stage3-carrier-probes.py"),
      "__name__": "frozen_independent_adapter"}
exec(compile(adapted, "frozen-independent-probes-v2-adapter", "exec"), ns)
v, path, h, kappa, budgets = (ns[k] for k in ("v", "path", "h", "kappa", "budgets"))
print("Frozen known cases and target inputs completed before the new chain target.", flush=True)
paths = [path("receiver", 0), path("source", 10)]
first = v.step(paths, 0, h, kappa, budgets)
assert first["status"] == "certified"
extended = v.extend(paths, first)
second = v.step(extended, h, h, kappa, budgets)
assert second["status"] == "certified"
print("Chain known case: genuine unchanged two-step continuation certified.", flush=True)
altered = copy.deepcopy(extended)
altered[1]["segments"][0]["c"][2] = (Q(11), Q(0), Q(0), Q(0))
published = altered[1]["segments"][-1]
assert v.segment_digest(published) in v._PUBLISHED
assert published["c"][2][0] + published["rx"][2] < 11
result = v.step(altered, h, h, kappa, budgets)
print({"target": "changed_ancestor_of_published_segment", "status": result["status"],
       "code": result["code"], "exact_previous_endpoint": "11",
       "published_start_upper": str(published["c"][2][0] + published["rx"][2]),
       "published_digest_still_registered": True}, flush=True)
