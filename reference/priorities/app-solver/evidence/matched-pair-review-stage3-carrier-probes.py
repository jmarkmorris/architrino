"""Independent admission probes; subject and its truth references unchanged.

Run only with the repository shared venv. Numerical instances use c_f=1.
"""
import copy
import importlib.util
import json
import pathlib
from fractions import Fraction as Q

root = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location(
    "frozen_carrier", root / "matched_pair_stage_3_validated_far_step_carrier.py")
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def path(name, z, start=-20):
    return {"id": name, "charge": Q(1), "segments": [{
        "t0": Q(start), "t1": Q(0),
        "c": [(Q(0),) * 4, (Q(0),) * 4, (Q(z), Q(0), Q(0), Q(0))],
        "rx": [Q(0)] * 3, "rv": [Q(0)] * 3,
        "provenance": "exact_prescribed"}]}


h = Q(1, 128)
kappa = Q(1, 1000)
budgets = {"position": Q(1, 10**8), "velocity": Q(1, 10**8)}
source = path("source", 10)
known_state, known_info, known_kernel = v.pair_enclosure(
    [v.I(0)] * 3, source, Q(-20), Q(0), h)
assert known_state == "present"
assert known_kernel[2].lo <= Q(-1, 100) <= known_kernel[2].hi
assert all(c.lo <= 0 <= c.hi for c in known_kernel[:2])
assert v.derivative_range((Q(10), Q(0), Q(1, 5), Q(-1, 150)), Q(20)).hi == 2
known_paths = [path("receiver", 0), path("source", 10)]
known = v.step(known_paths, 0, h, kappa, budgets)
assert known["status"] == "certified"
assert known["detail"]["acceleration_boxes"]["receiver"][2].lo <= Q(-1, 100000)
print("Known cases passed BEFORE targets: exact static kernel -1/100, exact quadratic peak speed 2, and genuine static step certified.", flush=True)

# The source retains a root at -10. The receiver's shorter past cannot
# erase that source emission or change the declared source search domain.
unequal = v.step([path("receiver", 0, -5), path("source", 10)],
                 0, h, kappa, budgets)
print(json.dumps({"target": "unequal_starts_unexcluded_source_prefix",
                  "status": unequal["status"], "code": unequal["code"],
                  "s_min": str(unequal["detail"].get("s_min")),
                  "pair_states": {key: info["state"] for key, info in
                                  unequal["detail"].get("pairs", {}).items()},
                  "source_root_at_receiver_zero": "-10",
                  "receiver_acceleration_at_start": "-1/100000"}), flush=True)

# Same object as the known static step: a real cache has already been
# installed by the subject. Mutating its exact cubic makes the speed arch
# reach 2 at S=-10 while both endpoint velocities stay zero.
cached_paths = known_paths
cached_paths[1]["segments"][0]["c"][2] = (Q(10), Q(0), Q(1, 5), Q(-1, 150))
assert cached_paths[1]["segments"][0]["_speed_bound"] < 1
fresh_paths = copy.deepcopy(cached_paths)
for p in fresh_paths:
    for seg in p["segments"]:
        seg.pop("_speed_bound", None)
fresh = v.step(fresh_paths, 0, h, kappa, budgets)
cached = v.step(cached_paths, 0, h, kappa, budgets)
unbudgeted = v.step(cached_paths, 0, h, kappa)
print(json.dumps({"target": "mutated_cubic_reuses_speed_cache",
                  "exact_peak_speed": "2", "fresh_status": fresh["status"],
                  "fresh_code": fresh["code"], "cached_status": cached["status"],
                  "cached_code": cached["code"],
                  "unbudgeted_cached_status": unbudgeted["status"],
                  "unbudgeted_cached_code": unbudgeted["code"],
                  "cached_reported_past_speed": str(cached["detail"].get(
                      "past_speed_bounds", {}).get("source"))}), flush=True)

# A valid affine past crosses the receiver long before its unique root.
# Eight conservative root-window intersections still retain the crossing,
# so the box distance floor stays zero: exercise the reported missing H4
# branch without constructing a singular true root.
affine = path("source", -188, -200)
affine["segments"][0]["c"][2] = (Q(-188), Q(99, 100), Q(0), Q(0))
h4 = v.step([path("receiver", 0, -200), affine], 0, h, kappa)
assert h4["status"] == "declined" and h4["code"] == "VFS-H4-01"
assert h4["published"] is None
print(json.dumps({"target": "conservative_window_distance_floor_h4",
                  "status": h4["status"], "code": h4["code"],
                  "true_start_root": "-1000/199",
                  "true_start_acceleration": "-199/10000000",
                  "continuation": None}), flush=True)
