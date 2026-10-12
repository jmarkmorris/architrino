"""Admission probes for the version 3 prototype carrier.

Separate from the scientific qualification, which runs unchanged through the
version 3 import adapter. After static analytic known cases (exit status 2 if
they fail), these probes check: genuine inherited continuation; the reviewer's
VFS-R1 and VFS-R2 constructions; the reviewer's VFS-R3 altered-ancestor
construction and variants; transfer of generated segments between paths and
between populations; changed coupling and changed charge; altered, forged and
misapplied certificates at append; the VFS-H4-01 branch; the total-radius
budget; and a long run with blocking assertions and exact receipts. Where a
finding is reproduced, the preserved earlier carrier is run on the same input
for the record. c_f = 1 throughout.

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
import matched_pair_stage_3_validated_far_step_carrier_v3 as v3  # noqa: E402
import matched_pair_stage_3_validated_far_step_qualification as qual  # noqa: E402

ROWS = []
ZERO = (Q(0),) * 4
H = Q(1, 128)
KAPPA = Q(1, 1000)
BUDGETS = {"position": Q(1, 10 ** 8), "velocity": Q(1, 10 ** 8)}
ARCH = (Q(10), Q(0), Q(1, 5), Q(-1, 150))


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


def static_population(source_z=10):
    return [path("receiver", 0), path("source", source_z)]


def refused(certificate, code="VFS-H0-01"):
    return (certificate["status"] == "declined"
            and certificate["code"] == code
            and certificate["published"] is None)


def grown(module, paths, steps, kappa=KAPPA):
    """Genuine continuation: returns the extended population and certificates."""
    certificates = []
    for k in range(steps):
        certificate = module.step(paths, k * H, H, kappa, BUDGETS)
        assert certificate["status"] == "certified", certificate["reason"]
        certificates.append(certificate)
        paths = module.extend(paths, certificate)
    return paths, certificates


def append_refused(paths, certificate):
    try:
        v3.extend(paths, certificate)
    except ValueError as error:
        return str(error)
    return ""


def known():
    print("Known cases, before any target")
    state, _, kernel = v3.pair_enclosure(
        [v3.I(0)] * 3, path("source", 10), Q(-20), Q(0), H)
    ok = row("known static kernel contains -1/100", state == "present"
             and kernel[2].lo <= Q(-1, 100) <= kernel[2].hi
             and all(c.lo <= 0 <= c.hi for c in kernel[:2]), "exact -1/100",
             v3.exact(kernel[2]))
    rng = v3.derivative_range(ARCH, Q(20))
    ok &= row("known quadratic peak speed is exactly 2",
              rng.hi == 2 and rng.lo == 0, f"[{rng.lo}, {rng.hi}]")
    paths = static_population()
    certificate = v3.step(paths, 0, H, KAPPA, BUDGETS)
    ok &= row("known static step certified",
              certificate["status"] == "certified",
              certificate["code"] or "certified")
    if certificate["status"] == "certified":
        speed, _ = qual.static_axis_truth(KAPPA, Q(10), H)
        V = v3.end_section(v3.extend(paths, certificate)[0])[1]
        ok &= row("known static velocity tube contains analytic bracket",
                  V[2].lo <= -speed[1] and -speed[0] <= V[2].hi,
                  "closed-form bracket", v3.exact(V[2]))
        A = certificate["detail"]["acceleration_boxes"]["receiver"][2]
        ok &= row("known static acceleration box contains -1/100000",
                  A.lo <= Q(-1, 100000) <= A.hi, "exact", v3.exact(A))
    return ok


def genuine_inheritance():
    print("\nGenuine inherited continuation")
    paths, certificates = grown(v3, static_population(), 3)
    ok = row("three genuine static steps chain", len(certificates) == 3,
             "each step admitted the layers before it",
             [c["provenance"]["certificate_digest"] for c in certificates])
    seg1, seg2, seg3 = paths[0]["segments"][1:4]
    ok &= row("radii are inherited and do not shrink",
              seg1["rv"][2] > 0 and seg2["rv"][2] >= seg1["rv"][2]
              and seg3["rv"][2] >= seg2["rv"][2]
              and seg3["rx"][2] >= seg2["rx"][2] >= seg1["rx"][2],
              "position and velocity, z axis",
              v3.exact([seg1["rv"][2], seg2["rv"][2], seg3["rv"][2]]))
    speed, shift = qual.static_axis_truth(KAPPA, Q(10), 3 * H)
    X, V = v3.end_section(paths[0])
    ok &= row("three-step tube contains the analytic bracket",
              V[2].lo <= -speed[1] and -speed[0] <= V[2].hi
              and X[2].lo <= -shift[1] and -shift[0] <= X[2].hi,
              "velocity and position at 3h", v3.exact(V[2]))
    osc, _ = grown(v3, [path("receiver", 0),
                        qual.oscillating_source(Q(1, 5))], 2)
    v, z = qual.oscillating_truth(Q(1, 5), KAPPA, 2 * H)
    X, V = v3.end_section(osc[0])
    ok &= row("two genuine steps on the oscillating past contain the true"
              " bracket", V[2].lo <= v[0] and v[1] <= V[2].hi
              and X[2].lo <= z[0] and z[1] <= X[2].hi, "at 2h",
              v3.exact(V[2]))
    copied = copy.deepcopy(paths)
    ok &= row("an unaltered deep copy of a genuine history is admitted",
              v3.step(copied, 3 * H, H, KAPPA, BUDGETS)["status"]
              == "certified", "binding is to content, not object identity")
    return ok


def r1_r2():
    print("\nVFS-R1 and VFS-R2 remain closed (reviewer's constructions)")
    unequal = v3.step([path("receiver", 0, -5), path("source", 10, -20)],
                      0, H, KAPPA, BUDGETS)
    ok = row("R1 unequal retained starts decline", refused(unequal),
             unequal["reason"])
    swapped = v3.step([path("receiver", 0, -20), path("source", 10, -5)],
                      0, H, KAPPA, BUDGETS)
    ok &= row("R1 in the other order", refused(swapped), swapped["code"])
    paths = static_population()
    assert v3.step(paths, 0, H, KAPPA, BUDGETS)["status"] == "certified"
    paths[1]["segments"][0]["c"][2] = ARCH
    unbudgeted = v3.step(paths, 0, H, KAPPA, None)
    budgeted = v3.step(paths, 0, H, KAPPA, BUDGETS)
    ok &= row("R2 in-place speed-2 arch after a genuine step declines H1",
              refused(unbudgeted, "VFS-H1-01")
              and refused(budgeted, "VFS-H1-01"),
              "with and without a budget",
              v3.exact(unbudgeted["detail"]["past_speed_bounds"]))
    planted = static_population()
    planted[1]["segments"][0]["c"][2] = ARCH
    planted[1]["segments"][0]["_speed_bound"] = Q(0)
    certificate = v3.step(planted, 0, H, KAPPA, None)
    ok &= row("R2 caller-supplied cache field is ignored",
              refused(certificate, "VFS-H1-01"), certificate["code"])
    clean = static_population()
    v3.step(clean, 0, H, KAPPA, BUDGETS)
    ok &= row("R2 nothing is written into caller segments",
              set(clean[1]["segments"][0]) == {"t0", "t1", "c", "rx", "rv",
                                               "provenance"}, "keys unchanged")
    return ok


def r3_ancestry():
    print("\nVFS-R3 altered ancestor (reviewer's construction) and variants")
    ok = True
    for name, module in (("version 2", v2), ("version 3", v3)):
        paths, _ = grown(module, static_population(), 1)
        genuine = module.step(paths, H, H, KAPPA, BUDGETS)
        assert genuine["status"] == "certified"
        altered = copy.deepcopy(paths)
        altered[1]["segments"][0]["c"][2] = (Q(11), Q(0), Q(0), Q(0))
        certificate = module.step(altered, H, H, KAPPA, BUDGETS)
        if module is v2:
            row("R3 reproduction: version 2 certifies on the altered ancestor",
                certificate["status"] == "certified",
                "source past moved from 10 to 11 under its generated segment")
        else:
            ok &= row("R3 closed: version 3 declines the altered ancestor",
                      refused(certificate), certificate["reason"])
    paths, _ = grown(v3, static_population(), 2)
    other = copy.deepcopy(paths)
    other[0]["segments"][0]["c"][2] = (Q(1, 1000), Q(0), Q(0), Q(0))
    certificate = v3.step(other, 2 * H, H, KAPPA, BUDGETS)
    ok &= row("altering the other path's prescribed past declines",
              refused(certificate), certificate["reason"])
    middle = copy.deepcopy(paths)
    seg = middle[0]["segments"][1]
    seg["c"][2] = (seg["c"][2][0], seg["c"][2][1], seg["c"][2][2] / 2, Q(0))
    certificate = v3.step(middle, 2 * H, H, KAPPA, BUDGETS)
    ok &= row("altering an earlier generated layer declines",
              refused(certificate), certificate["reason"])
    # Replace the first layer by a genuine first layer of a different
    # population; the second layer then sits on an ancestor it did not have.
    foreign, _ = grown(v3, static_population(11), 1)
    spliced = copy.deepcopy(paths)
    for k in (0, 1):
        spliced[k]["segments"][0] = copy.deepcopy(foreign[k]["segments"][0])
        spliced[k]["segments"][1] = copy.deepcopy(foreign[k]["segments"][1])
    certificate = v3.step(spliced, 2 * H, H, KAPPA, BUDGETS)
    ok &= row("a genuine later layer on a different genuine ancestor declines",
              refused(certificate), certificate["reason"])
    shortened = copy.deepcopy(paths)
    del shortened[0]["segments"][1]
    shortened[0]["segments"][1]["t0"] = Q(0)
    certificate = v3.step(shortened, 2 * H, H, KAPPA, BUDGETS)
    ok &= row("removing a generated layer from one path declines",
              refused(certificate), certificate["reason"])
    return ok


def transfers():
    print("\nTransferred segments and paths")
    paths, _ = grown(v3, static_population(), 1)
    swapped = copy.deepcopy(paths)
    swapped[0]["segments"][1], swapped[1]["segments"][1] = (
        swapped[1]["segments"][1], swapped[0]["segments"][1])
    certificate = v3.step(swapped, H, H, KAPPA, BUDGETS)
    ok = row("generated segments swapped between the two paths decline",
             refused(certificate), certificate["reason"])
    renamed = copy.deepcopy(paths)
    renamed[0]["id"] = "other"
    certificate = v3.step(renamed, H, H, KAPPA, BUDGETS)
    ok &= row("a renamed path declines", refused(certificate),
              certificate["reason"])
    # A genuine receiver segment from one population placed in another
    # genuine population over the same step.
    host, _ = grown(v3, static_population(11), 1)
    transplant = copy.deepcopy(host)
    transplant[0]["segments"][1] = copy.deepcopy(paths[0]["segments"][1])
    certificate = v3.step(transplant, H, H, KAPPA, BUDGETS)
    ok &= row("a genuine segment transplanted into another population"
              " declines", refused(certificate), certificate["reason"])
    third = copy.deepcopy(paths) + [path("third", -15)]
    third[2]["segments"].append({
        "t0": Q(0), "t1": H, "c": [ZERO, ZERO, (Q(-15), Q(0), Q(0), Q(0))],
        "rx": [Q(1, 10 ** 9)] * 3, "rv": [Q(1, 10 ** 9)] * 3,
        "provenance": "validated_far_step"})
    certificate = v3.step(third, H, H, KAPPA, BUDGETS)
    ok &= row("adding a path with an invented generated segment declines",
              refused(certificate), certificate["reason"])
    return ok


def scalars():
    print("\nChanged coupling and changed charge")
    paths, _ = grown(v3, static_population(), 1)
    certificate = v3.step(copy.deepcopy(paths), H, H, 2 * KAPPA, BUDGETS)
    ok = row("continuing under a different coupling declines",
             refused(certificate), certificate["reason"])
    recharged = copy.deepcopy(paths)
    recharged[1]["charge"] = Q(-1)
    certificate = v3.step(recharged, H, H, KAPPA, BUDGETS)
    ok &= row("continuing with a changed source charge declines",
              refused(certificate), certificate["reason"])
    recharged = copy.deepcopy(paths)
    recharged[0]["charge"] = Q(2)
    certificate = v3.step(recharged, H, H, KAPPA, BUDGETS)
    ok &= row("continuing with a changed receiver charge declines",
              refused(certificate), certificate["reason"])
    same = v3.step(copy.deepcopy(paths), H, H, KAPPA, BUDGETS)
    ok &= row("the same history under the same scalars is admitted",
              same["status"] == "certified", "control for the three refusals")
    return ok


def certificates_and_append():
    print("\nAltered, forged and misapplied certificates at append")
    paths = static_population()
    certificate = v3.step(paths, 0, H, KAPPA, BUDGETS)
    ok = row("a genuine certificate appends to its own history",
             append_refused(paths, certificate) == "", "appended")
    altered = copy.deepcopy(certificate)
    seg = altered["published"]["receiver"]
    seg["rv"] = [r / 1000 for r in seg["rv"]]
    reason = append_refused(paths, altered)
    ok &= row("a certificate with an altered published segment is refused",
              bool(reason), reason)
    reason = append_refused(static_population(11), certificate)
    ok &= row("a genuine certificate is refused on a different history",
              bool(reason), reason)
    declined = v3.step(paths, 0, 12, KAPPA, None)
    assert declined["status"] == "declined"
    forged = copy.deepcopy(declined)
    forged["status"] = "certified"
    forged["published"] = copy.deepcopy(certificate["published"])
    forged["provenance"] = {"certificate_digest": "0" * 64}
    reason = append_refused(paths, forged)
    ok &= row("a declined certificate edited to look certified is refused",
              bool(reason), reason)
    borrowed = copy.deepcopy(certificate)
    borrowed["published"]["receiver"]["c"][2] = (Q(0), Q(0), Q(1), Q(0))
    reason = append_refused(paths, borrowed)
    ok &= row("a genuine digest with substituted segments is refused",
              bool(reason), reason)
    reason = append_refused(paths, declined)
    ok &= row("a declined certificate is refused", bool(reason), reason)
    # Bypassing extend(): hand-append the altered segments and step.
    manual = [dict(p, segments=p["segments"] + [altered["published"][p["id"]]])
              for p in static_population()]
    result = v3.step(manual, H, H, KAPPA, BUDGETS)
    ok &= row("hand-appending altered segments is refused at admission",
              refused(result), result["reason"])
    return ok


def h4_and_budget():
    print("\nVFS-H4-01 branch and total-radius budget")
    receiver = path("receiver", 0, -200)
    source = {"id": "source", "charge": Q(1), "segments": [{
        "t0": Q(-200), "t1": Q(0),
        "c": [ZERO, ZERO, (Q(-188), Q(99, 100), Q(0), Q(0))],
        "rx": [Q(0)] * 3, "rv": [Q(0)] * 3,
        "provenance": "exact_prescribed"}]}
    certificate = v3.step([receiver, source], 0, H, KAPPA, BUDGETS)
    ok = row("reviewer's fast affine source declines on the chart",
             refused(certificate, "VFS-H4-01"), "conservative refusal")
    paths = [path("receiver", 0), qual.oscillating_source(Q(1, 5))]
    total = {"position": Q(1, 10 ** 8), "velocity": Q(2, 10 ** 9)}
    first = v3.step(paths, 0, H, KAPPA, BUDGETS, total_budgets=total)
    second = v3.step(v3.extend(paths, first), H, H, KAPPA, BUDGETS,
                     total_budgets=total)
    ok &= row("increment budget met, total budget refused",
              first["status"] == "certified"
              and refused(second, "VFS-BUDGET-02")
              and second["detail"]["radius_growth"]["receiver"]["velocity"]
              <= BUDGETS["velocity"], "VFS-BUDGET-02 on the second step",
              {"growth": v3.exact(second["detail"]["radius_growth"]),
               "total": v3.exact(second["detail"]["radius_total"])})
    return ok


def long_run(full_path):
    print("\nLong run with blocking assertions: 512 steps of 1/256 to t = 2")
    h = Q(1, 256)
    paths = [path("receiver", 0), qual.oscillating_source(Q(1, 5))]
    receipts = []
    for k in range(512):
        certificate = v3.step(paths, k * h, h, KAPPA, BUDGETS)
        receipts.append(v3.receipt(certificate))
        if certificate["status"] != "certified":
            break
        paths = v3.extend(paths, certificate)
    with open(full_path, "w", encoding="utf-8") as handle:
        for index, receipt in enumerate(receipts):
            handle.write(json.dumps({"index": index, "receipt": receipt},
                                    sort_keys=True) + "\n")
    digest = hashlib.sha256(pathlib.Path(full_path).read_bytes()).hexdigest()
    ok = row("all 512 steps certified, each admitting every earlier layer",
             len(receipts) == 512 and receipts[-1]["status"] == "certified",
             f"{sum(r['status'] == 'certified' for r in receipts)} of 512;"
             f" receipts SHA-256 {digest}")
    if not ok:
        return False
    X, V = v3.end_section(paths[0])
    truth = qual.frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                                 "step": "2"})
    ok &= row("end velocity tube contains the whole frozen true bracket",
              V[2].lo <= truth["v_true"][0] and truth["v_true"][1] <= V[2].hi,
              f"half-width {float(V[2].rad()):.6e}",
              {"tube": v3.exact(V[2]), "true": v3.exact(list(truth["v_true"]))})
    ok &= row("end position tube contains the whole frozen true bracket",
              X[2].lo <= truth["z_true"][0] and truth["z_true"][1] <= X[2].hi,
              f"half-width {float(X[2].rad()):.6e}",
              {"tube": v3.exact(X[2]), "true": v3.exact(list(truth["z_true"]))})
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
              {"aliased": v3.exact(list(published)),
               "separation": v3.exact(separation)})
    # Shift the receiver's whole prescribed past by 1e-9. Its single
    # prescribed segment has no prescribed join to break, so only the
    # ancestry check can refuse it.
    late = copy.deepcopy(paths)
    late[0]["segments"][0]["c"][2] = (Q(1, 10 ** 9), Q(0), Q(0), Q(0))
    certificate = v3.step(late, Q(2), h, KAPPA, BUDGETS)
    ok &= row("after 512 layers, a 1e-9 shift of the prescribed past declines"
              " on ancestry", refused(certificate)
              and "preceding history" in certificate["reason"],
              certificate["reason"])
    late = copy.deepcopy(paths)
    late[1]["segments"][3]["c"][2] = tuple(
        c + (Q(1, 10 ** 9) if k == 0 else 0)
        for k, c in enumerate(late[1]["segments"][3]["c"][2]))
    certificate = v3.step(late, Q(2), h, KAPPA, BUDGETS)
    ok &= row("a 1e-9 change of one prescribed source segment declines on"
              " its join", refused(certificate), certificate["reason"])
    genuine = v3.step(copy.deepcopy(paths), Q(2), h, KAPPA, BUDGETS)
    ok &= row("the unaltered 512-layer history is admitted for step 513",
              genuine["status"] == "certified", "control for the two refusals")
    return ok


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    if not known():
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = genuine_inheritance()
    ok &= r1_r2()
    ok &= r3_ancestry()
    ok &= transfers()
    ok &= scalars()
    ok &= certificates_and_append()
    ok &= h4_and_budget()
    ok &= long_run(argv[1])
    passed = sum(r["passed"] for r in ROWS)
    print(f"\n{passed} of {len(ROWS)} rows passed.")
    (HERE / "matched-pair-stage-3-validated-far-step-v3-admission-probes.json"
     ).write_text(json.dumps({
         "schema": "validated_far_step_prototype_admission_probes/v3",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
