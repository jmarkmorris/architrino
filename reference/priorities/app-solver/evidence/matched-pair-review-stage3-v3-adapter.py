"""Independent version 3 review using frozen reviewer inputs/references.

The v2 adapter is retargeted only at the subject import and a registry
implementation assertion. The independent receipt checker is retargeted
only at its input directory. Neither frozen instrument is edited.
"""
import copy
import pathlib
from fractions import Fraction as Q

here = pathlib.Path(__file__).resolve().parent
source = (here / "matched-pair-review-stage3-carrier-v2-adapter.py").read_text()
assert source.count("matched_pair_stage_3_validated_far_step_carrier_v2.py") == 1
assert source.count("assert v.segment_digest(published) in v._PUBLISHED") == 1
source = source.replace("matched_pair_stage_3_validated_far_step_carrier_v2.py",
                        "matched_pair_stage_3_validated_far_step_carrier_v3.py")
source = source.replace("assert v.segment_digest(published) in v._PUBLISHED",
                        'assert any(v.segment_digest(published) == r["published"]["source"] for r in v._CERTIFICATES.values())')
ns = {"__file__": str(here / "matched-pair-review-stage3-carrier-v2-adapter.py"),
      "__name__": "independent_v3_adapter"}
exec(compile(source, "frozen-independent-v2-probes-v3-adapter", "exec"), ns)
v, path, h, kappa, budgets = (ns[k] for k in ("v", "path", "h", "kappa", "budgets"))
assert ns["ns"]["unequal"]["code"] == "VFS-H0-01"
assert all(ns["ns"][key]["code"] == "VFS-H1-01" for key in ("fresh", "cached", "unbudgeted"))
assert ns["result"]["code"] == "VFS-H0-01" and ns["result"]["published"] is None
print("Independent R1/R2/R3 targets refused with no continuation.", flush=True)
base = [path("receiver", 0), path("source", 10)]
first = v.step(base, 0, h, kappa, budgets)
assert first["status"] == "certified"
extended = v.extend(base, first)
assert v.step(copy.deepcopy(extended), h, h, kappa, budgets)["status"] == "certified"
print("Known content-copy continuation admitted BEFORE extra mutation targets.", flush=True)

def refuse(label, paths, coupling=kappa):
    out = v.step(paths, h, h, coupling, budgets)
    assert out["code"] == "VFS-H0-01" and out["published"] is None
    print({"target": label, "code": out["code"], "reason": out["reason"]}, flush=True)

mutated = copy.deepcopy(extended)
mutated[0]["segments"][0]["c"][2] = (Q(1),Q(0),Q(0),Q(0))
refuse("receiver_ancestor", mutated)
mutated = copy.deepcopy(extended)
mutated[0]["segments"][-1],mutated[1]["segments"][-1] = (
    mutated[1]["segments"][-1],mutated[0]["segments"][-1])
refuse("transferred_path_segments", mutated)
refuse("changed_coupling", copy.deepcopy(extended), 2*kappa)
mutated = copy.deepcopy(extended)
mutated[1]["charge"] = Q(-1)
refuse("changed_source_charge", mutated)
mutated = copy.deepcopy(extended)
mutated[0]["id"] = "renamed_receiver"
refuse("renamed_path", mutated)
for label, paths, certificate in (
    ("altered_base_append", mutated, first),
    ("altered_segment_append", base, copy.deepcopy(first))):
    if label == "altered_segment_append":
        c = certificate["published"]["source"]["c"][2]
        certificate["published"]["source"]["c"][2] = (c[0]+1,c[1],c[2],c[3])
    try:
        v.extend(paths, certificate)
    except ValueError as error:
        print({"target":label, "append_refused":str(error)}, flush=True)
    else:
        raise AssertionError(label)

receipt_source = (here / "matched-pair-review-stage3-v2-receipt-check.py").read_text()
assert receipt_source.count("validated-far-step-v2/") == 1
receipt_source = receipt_source.replace("validated-far-step-v2/", "validated-far-step-v3/")
exec(compile(receipt_source, "frozen-independent-receipt-check-v3-adapter", "exec"),
     {"__file__": str(here / "matched-pair-review-stage3-v2-receipt-check.py")})
