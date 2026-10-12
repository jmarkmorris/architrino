"""Admission probes for the version 2 prototype carrier.

Separate from the scientific qualification, which is run unchanged through
the import adapter. These probes close the review findings VFS-R1 and VFS-R2
explicitly, exercise label binding, the total-radius budget and the
VFS-H4-01 branch, and turn the long run's two recorded quantities into
blocking assertions. Where a finding is reproduced, the preserved version 1
carrier is run on the same input for the record. The unequal-start case, the
speed-arch mutation and the fast affine source are the reviewer's
constructions. Static analytic known cases run first; exit status 2 if they
fail. c_f = 1 throughout.

Usage: python <this file> <long-run-receipts.jsonl>
"""
import copy
import hashlib
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_validated_far_step_carrier as v1  # noqa: E402
import matched_pair_stage_3_validated_far_step_carrier_v2 as v2  # noqa: E402
import matched_pair_stage_3_validated_far_step_qualification as qual  # noqa: E402

ROWS = []
ZERO = (Q(0),) * 4
H = Q(1, 128)
KAPPA = Q(1, 1000)
BUDGETS = {"position": Q(1, 10 ** 8), "velocity": Q(1, 10 ** 8)}


def row(name, passed, detail, exact=None):
    ROWS.append({"check": name, "passed": bool(passed), "detail": detail,
                 "exact": exact})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def path(name, z, start=-20, charge=1):
    return {"id": name, "charge": Q(charge), "segments": [{
        "t0": Q(start), "t1": Q(0),
        "c": [ZERO, ZERO, (Q(z), Q(0), Q(0), Q(0))],
        "rx": [Q(0)] * 3, "rv": [Q(0)] * 3,
        "provenance": "exact_prescribed"}]}


def refused(certificate, code):
    return (certificate["status"] == "declined"
            and certificate["code"] == code
            and certificate["published"] is None)


def known():
    print("Known cases, before any target")
    state, _, kernel = v2.pair_enclosure(
        [v2.I(0)] * 3, path("source", 10), Q(-20), Q(0), H)
    ok = row("known static kernel contains -1/100", state == "present"
             and kernel[2].lo <= Q(-1, 100) <= kernel[2].hi
             and all(c.lo <= 0 <= c.hi for c in kernel[:2]),
             f"[{kernel[2].lo}, {kernel[2].hi}]" if False else "exact -1/100",
             v2.exact(kernel[2]))
    arch = (Q(10), Q(0), Q(1, 5), Q(-1, 150))
    rng = v2.derivative_range(arch, Q(20))
    ok &= row("known quadratic peak speed is exactly 2",
              rng.hi == 2 and rng.lo == 0, f"[{rng.lo}, {rng.hi}]")
    paths = [path("receiver", 0), path("source", 10)]
    certificate = v2.step(paths, 0, H, KAPPA, BUDGETS)
    ok &= row("known static step certified", certificate["status"]
              == "certified", certificate["code"] or "certified")
    if certificate["status"] == "certified":
        speed, _ = qual.static_axis_truth(KAPPA, Q(10), H)
        V = v2.end_section(v2.extend(paths, certificate)[0])[1]
        ok &= row("known static velocity tube contains analytic bracket",
                  V[2].lo <= -speed[1] and -speed[0] <= V[2].hi,
                  "closed-form bracket", v2.exact(V[2]))
        A = certificate["detail"]["acceleration_boxes"]["receiver"][2]
        ok &= row("known static acceleration box contains -1/100000",
                  A.lo <= Q(-1, 100000) <= A.hi, "exact", v2.exact(A))
    return ok


def r1_unequal_starts():
    print("\nVFS-R1 unequal retained starts")
    make = lambda: [path("receiver", 0, -5), path("source", 10, -20)]
    old = v1.step(make(), 0, H, KAPPA, BUDGETS)
    old_box = (old["detail"]["acceleration_boxes"]["receiver"][2]
               if old["status"] == "certified" else None)
    row("R1 reproduction: version 1 certifies zero acceleration",
        old["status"] == "certified" and old_box.lo == 0 == old_box.hi,
        "the source's retained root at -10 gives exactly -1/100000, outside"
        " the certified box [0, 0]")
    new = v2.step(make(), 0, H, KAPPA, BUDGETS)
    ok = row("R1 closed: version 2 declines unequal starts",
             refused(new, "VFS-H0-01"), f"{new['code']}: {new['reason']}")
    swapped = v2.step([path("receiver", 0, -20), path("source", 10, -5)],
                      0, H, KAPPA, BUDGETS)
    ok &= row("R1 closed in the other order", refused(swapped, "VFS-H0-01"),
              swapped["code"])
    equal = v2.step([path("receiver", 0, -5), path("source", 10, -5)],
                    0, H, KAPPA, BUDGETS)
    ok &= row("R1 boundary: equal shallow starts remain a finite retained"
              " domain", equal["status"] == "certified" and all(
                  a.lo == 0 == a.hi for a in
                  equal["detail"]["acceleration_boxes"]["receiver"]),
              "both pairs absent; conditional on the retained window being"
              " the complete emission domain")
    full = v2.step([path("receiver", 0), path("source", 10)], 0, H, KAPPA,
                   BUDGETS)
    box = full["detail"]["acceleration_boxes"]["receiver"][2]
    ok &= row("R1 same geometry with full common history sees the root",
              full["status"] == "certified" and box.lo <= Q(-1, 100000)
              <= box.hi, "acceleration box contains -1/100000",
              v2.exact(box))
    return ok


def r2_cache_binding():
    print("\nVFS-R2 speed evidence bound to the data")
    arch = (Q(10), Q(0), Q(1, 5), Q(-1, 150))
    ok = True
    for name, module in (("version 1", v1), ("version 2", v2)):
        paths = [path("receiver", 0), path("source", 10)]
        first = module.step(paths, 0, H, KAPPA, BUDGETS)
        assert first["status"] == "certified"
        paths[1]["segments"][0]["c"][2] = arch    # same objects, mutated
        unbudgeted = module.step(paths, 0, H, KAPPA, None)
        budgeted = module.step(paths, 0, H, KAPPA, BUDGETS)
        if module is v1:
            row("R2 reproduction: version 1 certifies after the mutation",
                unbudgeted["status"] == "certified",
                f"unbudgeted {unbudgeted['status']}, budgeted"
                f" {budgeted['code']}; true peak speed 2")
        else:
            ok &= row("R2 closed: version 2 declines H1 after the mutation",
                      refused(unbudgeted, "VFS-H1-01")
                      and refused(budgeted, "VFS-H1-01"),
                      f"past speed bound"
                      f" {float(unbudgeted['detail']['past_speed_bounds']['source']):.6f}",
                      v2.exact(unbudgeted["detail"]["past_speed_bounds"]))
    planted = [path("receiver", 0), path("source", 10)]
    planted[1]["segments"][0]["c"][2] = arch
    planted[1]["segments"][0]["_speed_bound"] = Q(0)
    certificate = v2.step(planted, 0, H, KAPPA, None)
    ok &= row("R2 a caller-supplied cache field is ignored",
              refused(certificate, "VFS-H1-01"), certificate["code"])
    untouched = planted[1]["segments"][0].get("_speed_bound") == 0 and set(
        planted[1]["segments"][0]) == {"t0", "t1", "c", "rx", "rv",
                                        "provenance", "_speed_bound"}
    clean = [path("receiver", 0), path("source", 10)]
    v2.step(clean, 0, H, KAPPA, BUDGETS)
    untouched &= set(clean[1]["segments"][0]) == {"t0", "t1", "c", "rx", "rv",
                                                   "provenance"}
    ok &= row("R2 version 2 writes nothing into caller segments", untouched,
              "segment keys unchanged after a step")
    # Mutate in the other direction: an arch first, then a genuine static
    # history, must not inherit a refusal either.
    back = [path("receiver", 0), path("source", 10)]
    back[1]["segments"][0]["c"][2] = arch
    assert refused(v2.step(back, 0, H, KAPPA, None), "VFS-H1-01")
    back[1]["segments"][0]["c"][2] = (Q(10), Q(0), Q(0), Q(0))
    ok &= row("R2 restoring the static data certifies again",
              v2.step(back, 0, H, KAPPA, BUDGETS)["status"] == "certified",
              "no stale refusal")
    radius = [path("receiver", 0), path("source", 10)]
    radius[1]["segments"][0]["rv"] = [Q(0), Q(0), Q(2)]
    certificate = v2.step(radius, 0, H, KAPPA, None)
    ok &= row("R2 a mutated velocity radius on prescribed data declines",
              refused(certificate, "VFS-H0-01"), certificate["reason"])
    return ok


def provenance_binding():
    print("\nLabel binding for validated segments")
    paths = [path("receiver", 0), qual.oscillating_source(Q(1, 5))]
    first = v2.step(paths, 0, H, KAPPA, BUDGETS)
    extended = v2.extend(paths, first)
    genuine = v2.step(extended, H, H, KAPPA, BUDGETS)
    ok = row("genuine published segment is admitted",
             genuine["status"] == "certified", genuine["code"] or "certified",
             first["provenance"])
    forged = copy.deepcopy(extended)
    seg = forged[0]["segments"][-1]
    seg["rv"] = [r / 1000 for r in seg["rv"]]       # claim a narrower tube
    certificate = v2.step(forged, H, H, KAPPA, BUDGETS)
    ok &= row("published segment with shrunken radius is refused",
              refused(certificate, "VFS-H0-01"), certificate["reason"])
    forged = copy.deepcopy(extended)
    seg = forged[0]["segments"][-1]
    before = seg["c"][2]
    # The quadratic coefficient is half the midpoint acceleration and is not
    # zero here; the linear one is zero, so altering it would change nothing.
    seg["c"][2] = (before[0], before[1], before[2] / 2, before[3])
    assert before[2] != 0 and seg["c"][2] != before
    certificate = v2.step(forged, H, H, KAPPA, BUDGETS)
    ok &= row("published segment with altered coefficients is refused",
              refused(certificate, "VFS-H0-01"), certificate["code"])
    invented = [path("receiver", 0), path("source", 10)]
    invented[0]["segments"].append({
        "t0": Q(0), "t1": H, "c": [ZERO, ZERO, ZERO],
        "rx": [Q(1, 10 ** 12)] * 3, "rv": [Q(1, 10 ** 12)] * 3,
        "provenance": "validated_far_step"})
    invented[1]["segments"].append({
        "t0": Q(0), "t1": H, "c": [ZERO, ZERO, (Q(10), Q(0), Q(0), Q(0))],
        "rx": [Q(1, 10 ** 12)] * 3, "rv": [Q(1, 10 ** 12)] * 3,
        "provenance": "validated_far_step"})
    certificate = v2.step(invented, H, H, KAPPA, BUDGETS)
    ok &= row("invented segment carrying the validated label is refused",
              refused(certificate, "VFS-H0-01"), certificate["code"])
    old = v1.step(invented, H, H, KAPPA, BUDGETS)
    row("reproduction: version 1 trusted the invented label",
        old["status"] == "certified", old["status"])
    return ok


def h4_branch():
    print("\nVFS-H4-01 branch (reviewer's fast affine source)")
    receiver = path("receiver", 0, -200)
    source = {"id": "source", "charge": Q(1), "segments": [{
        "t0": Q(-200), "t1": Q(0),
        "c": [ZERO, ZERO, (Q(-188), Q(99, 100), Q(0), Q(0))],
        "rx": [Q(0)] * 3, "rv": [Q(0)] * 3,
        "provenance": "exact_prescribed"}]}
    certificate = v2.step([receiver, source], 0, H, KAPPA, BUDGETS)
    return row("fast affine source declines on the chart",
               refused(certificate, "VFS-H4-01"),
               f"{certificate['code']}: {certificate['reason']}; the real root"
               " -1000/199 is regular, the refusal is conservative")


def total_budget():
    print("\nIncrement budget versus total published radius")
    paths = [path("receiver", 0), qual.oscillating_source(Q(1, 5))]
    total = {"position": Q(1, 10 ** 8), "velocity": Q(2, 10 ** 9)}
    first = v2.step(paths, 0, H, KAPPA, BUDGETS, total_budgets=total)
    ok = row("first step within increment and total budgets",
             first["status"] == "certified", "certified",
             v2.exact(first["detail"]["radius_total"]))
    second = v2.step(v2.extend(paths, first), H, H, KAPPA, BUDGETS,
                     total_budgets=total)
    growth = second["detail"]["radius_growth"]["receiver"]["velocity"]
    ok &= row("second step meets the increment budget and is refused on the"
              " total", refused(second, "VFS-BUDGET-02")
              and growth <= BUDGETS["velocity"],
              f"increment {float(growth):.3e} <= 1e-08; total"
              f" {float(second['detail']['radius_total']['receiver']['velocity']):.3e}"
              " > 2e-09",
              {"growth": v2.exact(second["detail"]["radius_growth"]),
               "total": v2.exact(second["detail"]["radius_total"]),
               "total_budgets": v2.exact(total)})
    return ok


def long_run_assertions(full_path):
    print("\nLong run with blocking assertions: 512 steps of 1/256 to t = 2")
    h = Q(1, 256)
    paths = [path("receiver", 0), qual.oscillating_source(Q(1, 5))]
    receipts = []
    for k in range(512):
        certificate = v2.step(paths, k * h, h, KAPPA, BUDGETS)
        receipts.append(v2.receipt(certificate))
        if certificate["status"] != "certified":
            break
        paths = v2.extend(paths, certificate)
    with open(full_path, "w", encoding="utf-8") as handle:
        for index, receipt in enumerate(receipts):
            handle.write(json.dumps({"index": index, "receipt": receipt},
                                    sort_keys=True) + "\n")
    digest = hashlib.sha256(pathlib.Path(full_path).read_bytes()).hexdigest()
    ok = row("all 512 steps certified within the increment budgets",
             len(receipts) == 512 and receipts[-1]["status"] == "certified",
             f"{sum(r['status'] == 'certified' for r in receipts)} of 512;"
             f" receipts SHA-256 {digest}")
    if not ok:
        return False
    X, V = v2.end_section(paths[0])
    truth = qual.frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                                 "step": "2"})
    ok &= row("end velocity tube contains the whole frozen true bracket",
              V[2].lo <= truth["v_true"][0] and truth["v_true"][1] <= V[2].hi,
              f"half-width {float(V[2].rad()):.6e}",
              {"tube": v2.exact(V[2]), "true": v2.exact(list(truth["v_true"]))})
    ok &= row("end position tube contains the whole frozen true bracket",
              X[2].lo <= truth["z_true"][0] and truth["z_true"][1] <= X[2].hi,
              f"half-width {float(X[2].rad()):.6e}",
              {"tube": v2.exact(X[2]), "true": v2.exact(list(truth["z_true"]))})
    aliased = None
    with open(HERE / "matched-pair-stage-3-aliasing-control-runs.jsonl",
              encoding="utf-8") as handle:
        for line in handle:
            record = json.loads(line)
            if (record.get("mode") == "evolve" and record["amplitude"] == "0.2"
                    and record["step"] == "2"
                    and record["status"] == "completed"):
                aliased = next(p for p in record["paths"]
                               if p["path"] == "receiver")
    published = (Q(aliased["velocity_z"][0]), Q(aliased["velocity_z"][1]))
    separation = max(V[2].lo - published[1], published[0] - V[2].hi)
    ok &= row("end velocity tube is disjoint from the solver's aliased"
              " interval", separation > 0,
              f"separation {float(separation):.6e}",
              {"aliased": v2.exact(list(published)),
               "separation": v2.exact(separation)})
    ok &= row("every long-run segment is bound to a certificate",
              all(v2.segment_digest(seg) in v2._PUBLISHED
                  for seg in paths[0]["segments"][1:]),
              f"{len(paths[0]['segments']) - 1} receiver segments")
    return ok


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    if not known():
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = r1_unequal_starts()
    ok &= r2_cache_binding()
    ok &= provenance_binding()
    ok &= h4_branch()
    ok &= total_budget()
    ok &= long_run_assertions(argv[1])
    passed = sum(r["passed"] for r in ROWS)
    print(f"\n{passed} of {len(ROWS)} rows passed.")
    (HERE / "matched-pair-stage-3-validated-far-step-v2-admission-probes.json"
     ).write_text(json.dumps({
         "schema": "validated_far_step_prototype_admission_probes/v2",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
