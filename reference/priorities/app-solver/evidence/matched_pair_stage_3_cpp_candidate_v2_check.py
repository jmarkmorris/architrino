"""Checker for version 2 of the scratch C++ validated far-step candidate.

Beyond the version 1 checks it verifies, in exact rational arithmetic and
without any candidate code: whole-step coverage of every published segment
(finding CPP-P1), exact end tokens and duration cover (CPP-P2), the issued
evidence and its chaining, the growth recorded in the solver's local-error
form, and the reviewer's independent three-path acceleration bracket.

Reads the candidate's JSON-lines outputs, converts every binary64 value and
decimal token to an exact rational, and compares with truth references that
use no candidate code: closed-form static brackets, the reviewer's exact
three-path initial accelerations, the small-time oscillating bracket, the
frozen bracket at t = 2, and exact straight lines at zero coupling. It also
runs the version 3 Python prototype on the same inputs for a cross-language
comparison, which checks two implementations of one theorem against each
other and is not a truth reference. Known cases run first; exit status 2 if
one fails. c_f = 1 throughout.

Usage: python <this file> <directory with candidate-*.jsonl>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_validated_far_step_carrier_v3 as v3  # noqa: E402
import matched_pair_stage_3_validated_far_step_qualification as qual  # noqa: E402

ROWS = []
KAPPA = Q(1, 1000)
H = Q(1, 128)


def row(name, passed, detail):
    ROWS.append({"check": name, "passed": bool(passed), "detail": detail})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def load(directory, name):
    with open(directory / f"candidate-{name}.jsonl", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def box(pair):
    return (Q(pair[0]), Q(pair[1]))


def contains(outer, inner):
    return outer[0] <= inner[0] and inner[1] <= outer[1]


def meets(a, b):
    return a[0] <= b[1] and b[0] <= a[1]


def sci(x):
    return f"{float(x):.9e}"


def end_tube(path, h, axis=2):
    """End position and velocity intervals rebuilt from the published tokens."""
    c = [Q(t) for t in path["coefficients"][axis]]
    rx = Q(path["position_error"][axis])
    rv = Q(path["velocity_error"][axis])
    x = c[0] + c[1] * h + c[2] * h * h + c[3] * h ** 3
    v = c[1] + 2 * c[2] * h + 3 * c[3] * h * h
    return (x - rx, x + rx), (v - rv, v + rv)


def by_case(rows, case, step=None):
    found = [r for r in rows if r["case"] == case
             and (step is None or r.get("step") == str(step))]
    if len(found) != 1:
        raise SystemExit(f"expected one row for {case} {step}, got {len(found)}")
    return found[0]


def path_of(record, name):
    return next(p for p in record["paths"] if p["id"] == name)


def whole_step_slack(record):
    """Smallest exact Bernstein coefficient, over all paths and axes, of the
    four position and four velocity slack polynomials on [0, H], where H is
    the larger of the exact token duration and the recorded cover. The
    theorem's set at elapsed time tau is X0 + tau V0 + tau^2 A / 2 for
    position and V0 + tau A for velocity; the published tube is the exact
    decimal cubic plus and minus the exact decimal radii."""
    H = max(Q(record["end"]) - Q(record["start"]), Q(record["duration_cover"]))
    worst = None
    for path in record["paths"]:
        for axis in range(3):
            c = [Q(t) for t in path["coefficients"][axis]]
            if c[3] != 0:
                raise SystemExit("published cubic coefficient is not zero")
            rx = Q(path["position_error"][axis])
            rv = Q(path["velocity_error"][axis])
            X0 = box(path["inherited_position"][axis])
            V0 = box(path["inherited_velocity"][axis])
            A = box(path["acceleration"][axis])
            for side in (0, 1):
                sign = 1 if side == 0 else -1
                q0 = sign * (X0[side] - c[0]) + rx
                q1 = sign * (V0[side] - c[1])
                q2 = sign * (A[side] / 2 - c[2])
                l0 = sign * (V0[side] - c[1]) + rv
                l1 = sign * (A[side] - 2 * c[2])
                values = (q0, q0 + q1 * H / 2, q0 + q1 * H + q2 * H * H,
                          l0, l0 + l1 * H)
                low = min(values)
                worst = low if worst is None else min(worst, low)
    return worst


def known(producer, consumer):
    print("Known cases, before any target")
    notes = {r["case"]: r for r in producer if r["case"].startswith("K0-")}
    ok = row("K0 SHA-256 of abc", notes["K0-sha256-abc"]["outcome"] ==
             "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
             "standard test vector")
    ok &= row("K0 exact token of the binary64 nearest 0.1",
              Q(notes["K0-exact-token-tenth"]["outcome"]) == Q(0.1),
              notes["K0-exact-token-tenth"]["outcome"])
    ok &= row("K0 exact decimal sum",
              notes["K0-decimal-sum"]["outcome"] == "10000000000.0002987",
              notes["K0-decimal-sum"]["outcome"])
    r = by_case(producer, "K1-static", 1)
    ok &= row("K1 static step certified", r["status"] == "certified", r["code"])
    ok &= row("K1 whole-step coverage holds exactly",
              whole_step_slack(r) >= 0, f"smallest exact slack"
              f" {sci(whole_step_slack(r))}")
    speed, shift = qual.static_axis_truth(KAPPA, Q(10), H)
    x, v = end_tube(path_of(r, "receiver"), H)
    ok &= row("K1 receiver tube contains the closed-form bracket",
              contains(v, (-speed[1], -speed[0]))
              and contains(x, (-shift[1], -shift[0])),
              f"velocity [{sci(v[0])}, {sci(v[1])}]")
    x, v = end_tube(path_of(r, "source"), H)
    ok &= row("K1 source tube contains the closed-form bracket",
              contains(v, speed)
              and contains(x, (10 + shift[0], 10 + shift[1])),
              f"velocity [{sci(v[0])}, {sci(v[1])}]")
    emitted = box(path_of(r, "receiver")["end_velocity"][2])
    ok &= row("K1 history layer's end interval contains the rebuilt tube",
              contains(emitted, end_tube(path_of(r, "receiver"), H)[1]),
              "published segment evaluated by the solver's history type")
    r = by_case(producer, "K2-three-path", 1)
    exact = {"receiver": Q(-21, 12100000), "plus": Q(101, 100000),
             "minus": Q(-122, 121000)}
    ok &= row("K2 three-path acceleration boxes contain the exact initial"
              " values", r["status"] == "certified" and all(
                  contains(box(path_of(r, n)["acceleration"][2]), (a, a))
                  for n, a in exact.items()),
              "; ".join(f"{n} {sci(a)}" for n, a in exact.items()))
    for traversal in (False, True):
        for case in ("C0-exact-histories-disabled",
                     "C0-exact-histories-validated-policy"):
            s = next(c for c in consumer if c["case"] == case
                     and c["traversal"] is traversal)
            ok &= row(f"{case}, traversal {traversal}: totals contain the"
                      " exact initial values",
                      s["status"] == "certified_complete" and all(
                          contains(box(s["totals"][n][2]), (a, a))
                          for n, a in exact.items()),
                      f"enclosed groups {s['enclosed_groups']}")
    return ok


def python_population(kind):
    seg = qual.segment
    if kind == "three":
        return [qual.static_path("receiver", 1, (0, 0, 0)),
                qual.static_path("plus", 1, (0, 0, 10)),
                qual.static_path("minus", -1, (0, 0, 11))]
    if kind == "static":
        return [qual.static_path("receiver", 1, (0, 0, 0)),
                qual.static_path("source", 1, (0, 0, 10))]
    raise ValueError(kind)


def parity(name, records, paths, h, steps):
    ok = True
    worst = Q(0)
    for k in range(1, steps + 1):
        certificate = v3.step(paths, (k - 1) * h, h, KAPPA, None)
        if certificate["status"] != "certified":
            return row(f"{name}: Python prototype certifies step {k}", False,
                       certificate["code"])
        paths = v3.extend(paths, certificate)
        r = by_case(records, name, k)
        for path in paths:
            X, V = v3.end_section(path)
            x, v = end_tube(path_of(r, path["id"]), h)
            ok &= meets(x, (X[2].lo, X[2].hi)) and meets(v, (V[2].lo, V[2].hi))
            if V[2].rad() > 0:
                worst = max(worst, (v[1] - v[0]) / 2 / V[2].rad())
    return row(f"{name}: C++ and Python tubes intersect at every step", ok,
               f"{steps} steps; largest C++ to Python velocity radius ratio"
               f" {float(worst):.3f}")


def producer_checks(producer, long_rows):
    print("\nProducer targets")
    ok = True
    r2 = by_case(producer, "K1-static", 2)
    r1 = by_case(producer, "K1-static", 1)
    ok &= row("K1 second step inherits and does not shrink radii",
              r2["status"] == "certified"
              and path_of(r2, "receiver")["total_velocity"][2]
              >= path_of(r1, "receiver")["total_velocity"][2] > 0
              and path_of(r2, "receiver")["total_position"][2]
              >= path_of(r1, "receiver")["total_position"][2] > 0,
              f"velocity radius {path_of(r1, 'receiver')['total_velocity'][2]:.3e}"
              f" then {path_of(r2, 'receiver')['total_velocity'][2]:.3e}")
    ok &= parity("K2-three-path", producer, python_population("three"), H, 2)
    for k in (1, 2):
        r = by_case(producer, "T1-control-small", k)
        v, z = qual.oscillating_truth(Q(1, 5), KAPPA, k * H)
        x, vel = end_tube(path_of(r, "receiver"), H)
        growth = [max(path_of(r, "receiver")["growth_position"]),
                  max(path_of(r, "receiver")["growth_velocity"])]
        ledger = next(e for e in r["local_errors"] if e["path"] == "receiver")
        ok &= row(f"T1 control step {k}: growth is recorded in the local-error"
                  " form", ledger["position_error"] == growth[0]
                  and ledger["velocity_error"] == growth[1]
                  and ledger["position_errors"]
                  == path_of(r, "receiver")["growth_position"],
                  f"position {ledger['position_error']:.3e}, velocity"
                  f" {ledger['velocity_error']:.3e}")
        ok &= row(f"T1 control step {k}: certified within 1e-8 budgets and"
                  " contains the true bracket",
                  r["status"] == "certified" and max(growth) <= 1e-8
                  and contains(vel, v) and contains(x, z),
                  f"growth position {growth[0]:.3e}, velocity {growth[1]:.3e};"
                  f" velocity tube [{sci(vel[0])}, {sci(vel[1])}]")
    truth = qual.frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                                 "step": "2"})
    r = by_case(producer, "T4-adversarial-unbudgeted", 1)
    x, vel = end_tube(path_of(r, "receiver"), Q(2))
    ok &= row("T4 adversarial step without a budget contains the frozen"
              " bracket", r["status"] == "certified"
              and contains(vel, truth["v_true"]) and contains(x, truth["z_true"]),
              f"velocity tube [{sci(vel[0])}, {sci(vel[1])}]")
    r = by_case(producer, "T4-adversarial-budgeted", 1)
    ok &= row("T4 adversarial step under budgets declines",
              r["code"] == "VFS-BUDGET-01" and not r["published"], r["code"])

    r = long_rows[-1]
    x, vel = end_tube(path_of(r, "receiver"), Q(1, 256))
    ok &= row("T3 long run: step 512 certified", r["case"] == "T3-control-long"
              and r["step"] == "512" and r["status"] == "certified",
              f"step {r['step']} {r['status']}")
    ok &= row("T3 end tubes contain the frozen true brackets",
              contains(vel, truth["v_true"]) and contains(x, truth["z_true"]),
              f"velocity [{sci(vel[0])}, {sci(vel[1])}], half-width"
              f" {sci((vel[1] - vel[0]) / 2)}; position half-width"
              f" {sci((x[1] - x[0]) / 2)}")
    aliased = None
    with open(HERE / "matched-pair-stage-3-aliasing-control-runs.jsonl",
              encoding="utf-8") as handle:
        for line in handle:
            rec = json.loads(line)
            if (rec.get("mode") == "evolve" and rec["amplitude"] == "0.2"
                    and rec["step"] == "2" and rec["status"] == "completed"):
                aliased = box(next(p for p in rec["paths"]
                                   if p["path"] == "receiver")["velocity_z"])
    separation = max(vel[0] - aliased[1], aliased[0] - vel[1])
    ok &= row("T3 end velocity tube is disjoint from the aliased interval",
              separation > 0, f"separation {sci(separation)}")
    return ok


EXPECTED = {
    "N-P2-exponent-start-token": "VFS-H0-01",
    "N-P2-history-does-not-end-at-start": "VFS-H0-01",
    "N-evidence-missing": "VFS-H0-01",
    "N-evidence-of-other-population": "VFS-H0-01",
    "N-evidence-stale-previous-step": "VFS-H0-01",
    "N-R1-unequal-starts": "VFS-H0-01",
    "N-R2-arch-after-genuine-step": "VFS-H1-01",
    "N-R2-arch-budgeted": "VFS-H1-01",
    "N-R3-altered-ancestor-joins-intact": "VFS-H0-01",
    "N-transfer-between-populations": "VFS-H0-01",
    "N-changed-coupling": "VFS-H0-01",
    "N-changed-charge": "VFS-H0-01",
    "N-renamed-path": "VFS-H0-01",
    "N-H2-step-longer-than-separation": "VFS-H2-01",
    "N-H3-root-on-boundary": "VFS-H3-01",
    "N-fast-affine-budgeted": "VFS-BUDGET-01",
    "N-H4-crossing-near-root": "VFS-H4-01",
    "N-H5-one-pass": "VFS-H5-01",
    "N-BUDGET-01-wide-step": "VFS-BUDGET-01",
    "N-BUDGET-02-total": "VFS-BUDGET-02",
}
NOTES = {
    "N-R3-reviewer-source-at-11": "refused-by-history-layer",
    "N-append-on-different-base": "refused",
    "N-append-declined": "refused",
    "N-append-altered-segment": "refused",
    "N-append-forged-status-no-evidence": "refused",
    "N-append-borrowed-evidence-other-segments": "refused",
}
POSITIVE = ("P-genuine-second-step", "P-same-population-control",
            "P-evidence-current", "P2-exact-end-token",
            "P-total-budget-first", "P-absent-equal-shallow-starts")


def publication_checks(producer, generated, long_rows):
    print("\nPublication, time extent and evidence (CPP-P1, CPP-P2)")
    ok = True
    certified = [r for r in producer + generated + long_rows
                 if r.get("status") == "certified"
                 and all("coefficients" in p for p in r["paths"])]
    slacks = [whole_step_slack(r) for r in certified]
    ok &= row("every published segment covers the theorem's sets over the"
              " whole step, exactly", min(slacks) >= 0,
              f"{len(certified)} certified steps; smallest exact slack"
              f" {sci(min(slacks))}")
    ok &= row("the producer's own certified slack is nonnegative everywhere",
              all(p["whole_step_slack"] >= 0 for r in certified
                  for p in r["paths"]), "lower bounds of Bernstein coefficients")
    ok &= row("every end token is the exact sum of start and step",
              all(Q(r["end"]) - Q(r["start"]) == Q(r["h"]) for r in certified),
              f"{len(certified)} certified steps")
    ok &= row("the duration cover is at least the exact step",
              all(Q(r["duration_cover"]) >= Q(r["h"]) for r in certified),
              "every duration-dependent bound uses the cover")
    r = by_case(producer, "P2-exact-end-token")
    ok &= row("reviewer's late-time case ends at the exact token",
              r["status"] == "certified" and r["end"] == "10000000000.0002987"
              and Q(r["duration_cover"]) >= Q("0.0002987"),
              f"end {r['end']}, cover {r['duration_cover']:.9e}")
    ok &= row("every certified step carries issued evidence for its whole"
              " population", all(
                  r["evidence"] is not None
                  and r["evidence"]["coupling"] == r["coupling"]
                  and r["evidence"]["step_start"] == r["start"]
                  and r["evidence"]["step_end"] == r["end"]
                  and [m["id"] for m in r["evidence"]["members"]]
                  == [p["id"] for p in r["paths"]] for r in certified),
              "coupling, step and members")
    ok &= row("every declined step carries no evidence and no ledger entry",
              all(r["evidence"] is None and r["local_errors"] == []
                  for r in producer + generated
                  if r.get("status") == "declined"), "nothing issued")
    chained = True
    for case in ("K1-static", "K2-three-path", "T1-control-small",
                 "G1-static-large-steps", "G2-zero-coupling-straight-line"):
        rows = sorted((r for r in producer + generated if r["case"] == case),
                      key=lambda r: int(r["step"]))
        for a, b in zip(rows, rows[1:]):
            chained &= all(
                x["digest_after"] == y["digest_before"]
                for x, y in zip(a["evidence"]["members"],
                                b["evidence"]["members"]))
    ok &= row("each step's evidence is generated from the previous step's"
              " published content", chained, "digest chain across steps")
    return ok


def negative_checks(producer):
    print("\nRefusals and controls")
    ok = True
    for case, code in EXPECTED.items():
        r = by_case(producer, case)
        ok &= row(case, r["status"] == "declined" and r["code"] == code
                  and r["published"] is False
                  and all("coefficients" not in p for p in r["paths"]),
                  f"{r['code']}: {r['reason']}")
    for case, outcome in NOTES.items():
        r = by_case(producer, case)
        ok &= row(case, r.get("outcome") == outcome,
                  f"{r.get('outcome')}: {r.get('detail')}")
    for case in POSITIVE:
        r = by_case(producer, case)
        ok &= row(case, r["status"] == "certified", "certified")
    r = by_case(producer, "T-fast-affine-unbudgeted")
    exact = Q(-199, 10000000)
    ok &= row("reviewer's fast affine source, no budget: certified and the"
              " acceleration box contains -199/10000000",
              r["status"] == "certified" and contains(
                  box(path_of(r, "receiver")["acceleration"][2]),
                  (exact, exact)),
              f"box {path_of(r, 'receiver')['acceleration'][2]}")
    r = by_case(producer, "P-absent-equal-shallow-starts")
    ok &= row("absent pairs give exactly zero acceleration",
              all(p["state"] == "absent" for p in r["pairs"]) and all(
                  box(a) == (0, 0) for p in r["paths"]
                  for a in p["acceleration"]), "finite retained domain")
    return ok


def generated_source_checks(generated):
    print("\nReception from generated source segments")
    ok = True
    for case in ("G1-static-large-steps", "G2-zero-coupling-straight-line"):
        rows = [r for r in generated if r["case"] == case]
        ok &= row(f"{case}: four steps certified",
                  len(rows) == 4 and all(r["status"] == "certified"
                                         for r in rows), "h = 4")
        last = by_case(generated, case, 4)
        windows = {p["receiver"]: p["window"] for p in last["pairs"]}
        ok &= row(f"{case}: at step 4 every root window lies on generated"
                  " segments", all(w[0] > 0 for w in windows.values()),
                  "; ".join(f"{k} [{w[0]:.4f}, {w[1]:.4f}]"
                            for k, w in windows.items()))
    ok &= parity("G1-static-large-steps", generated,
                 python_population("static"), Q(4), 4)
    for k in range(1, 5):
        r = by_case(generated, "G2-zero-coupling-straight-line", k)
        t = Q(4 * k)
        xs, vs = end_tube(path_of(r, "source"), Q(4))
        xr, vr = end_tube(path_of(r, "receiver"), Q(4))
        ok &= row(f"G2 step {k}: tubes contain the exact straight lines",
                  contains(xs, (10 + t / 10, 10 + t / 10))
                  and contains(vs, (Q(1, 10), Q(1, 10)))
                  and contains(xr, (0, 0)) and contains(vr, (0, 0)),
                  f"source position radius {sci((xs[1] - xs[0]) / 2)}")
    return ok


def consumer_checks(consumer):
    print("\nGrouped consumption of validated tubes")
    ok = True
    for traversal in (False, True):
        pick = lambda case: next(c for c in consumer if c["case"] == case
                                 and c["traversal"] is traversal)
        disabled = pick("C1-validated-tubes-disabled")
        grouped = pick("C1-validated-tubes-grouped")
        exact_only = pick("C1-validated-tubes-exact-only-policy")
        certified = [g for g in grouped["groups"]
                     if g["status"] == "certified_enclosed"]
        ok &= row(f"traversal {traversal}: one group certified from validated"
                  " tubes", len(certified) == 1
                  and certified[0]["grade"] == "validated_far_step_tubes"
                  and certified[0]["receiver"] == "receiver"
                  and {certified[0]["leader"], certified[0]["follower"]}
                  == {"plus", "minus"} and grouped["enclosed_groups"] == 1,
                  f"radius {certified[0]['radius']:.6e}, declared member radii"
                  f" position {certified[0]['leader_position_radius']:.3e},"
                  f" velocity {certified[0]['leader_velocity_radius']:.3e},"
                  f" join term {certified[0]['join_jump']:.3e}")
        ok &= row(f"traversal {traversal}: two identities, one interval",
                  grouped["logical_pairs"] == disabled["logical_pairs"] == 9
                  and grouped["exact"] == disabled["exact"] - 1
                  and grouped["enclosed"] == disabled["enclosed"] + 1
                  and grouped["unresolved"] == 0,
                  f"exact {disabled['exact']} -> {grouped['exact']}, enclosed"
                  f" {disabled['enclosed']} -> {grouped['enclosed']}")
        total = box(grouped["totals"]["receiver"][2])
        width = total[1] - total[0]
        emitted = Q(certified[0]["emitted_width"])
        ok &= row(f"traversal {traversal}: receiver width equals the one"
                  " emitted width", abs(width - emitted) <= emitted / 10 ** 9,
                  f"total width {sci(width)}, emitted {sci(emitted)}")
        ok &= row(f"traversal {traversal}: grouped and disabled totals"
                  " intersect for every receiver and axis",
                  all(meets(box(grouped["totals"][n][a]),
                            box(disabled["totals"][n][a]))
                      for n in disabled["totals"] for a in range(3)),
                  f"receiver z grouped [{sci(total[0])}, {sci(total[1])}]")
        ok &= row(f"traversal {traversal}: exact-only policy declines tubes"
                  " and equals the disabled totals",
                  exact_only["enclosed_groups"] == 0
                  and exact_only["totals"] == disabled["totals"]
                  and all(g["failure_code"] == "MPE-HISTORY-01"
                          for g in exact_only["groups"]),
                  "MPE-HISTORY-01, atomic exact fallback")
    a = next(c for c in consumer if c["case"] == "C1-validated-tubes-grouped"
             and c["traversal"] is False)
    b = next(c for c in consumer if c["case"] == "C1-validated-tubes-grouped"
             and c["traversal"] is True)
    ok &= row("both scheduling routes give identical totals and groups",
              a["totals"] == b["totals"] and a["groups"] == b["groups"],
              f"{a['route']} and {b['route']}")
    reference = next(c for c in consumer
                     if c["case"] == "C1-validated-tubes-disabled"
                     and c["traversal"] is False)
    bracket = (Q(-21, 12100000),
               Q(-2100000002000000000000000000000,
                 1210000004620000006610000004200000001))
    for traversal in (False, True):
        g = next(c for c in consumer
                 if c["case"] == "C1-validated-tubes-grouped"
                 and c["traversal"] is traversal)
        d = next(c for c in consumer
                 if c["case"] == "C1-validated-tubes-disabled"
                 and c["traversal"] is traversal)
        ok &= row(f"traversal {traversal}: grouped receiver total contains the"
                  " reviewer's independent true bracket at t = 1/32",
                  g["reception"] == "0.03125"
                  and contains(box(g["totals"]["receiver"][2]), bracket)
                  and contains(box(d["totals"]["receiver"][2]), bracket)
                  and all(x["evidence_bound"] for x in g["groups"]
                          if x["status"] == "certified_enclosed"),
                  f"bracket [{sci(bracket[0])}, {sci(bracket[1])}]")
    for case in ("N-consumer-no-evidence",
                 "N-consumer-stale-evidence",
                 "N-consumer-evidence-of-other-population",
                 "N-consumer-changed-coupling",
                 "N-consumer-changed-receiver-charge",
                 "N-consumer-altered-member-radius"):
        s = next(c for c in consumer if c["case"] == case)
        refused = (s.get("status") == "certified_complete"
                   and s["enclosed_groups"] == 0
                   and all(g["status"] == "declined" for g in s["groups"])
                   and any(g["failure_code"] == "MPE-EVIDENCE-01"
                           for g in s["groups"]))
        detail = "no group; exact fallback"
        if case in ("N-consumer-no-evidence", "N-consumer-stale-evidence",
                    "N-consumer-evidence-of-other-population",
                    "N-consumer-altered-member-radius"):
            refused = refused and s["totals"] == reference["totals"]
            detail += "; totals identical to the disabled route"
        ok &= row(case, refused, detail)
    return ok


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    producer = load(directory, "producer")
    consumer = load(directory, "consumer")
    generated = load(directory, "generated-source")
    long_rows = load(directory, "long")
    if any(r.get("case") == "FATAL" for r in producer + consumer + generated
           + long_rows):
        print("FATAL row present in candidate output")
        raise SystemExit(2)
    if not known(producer, consumer):
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = producer_checks(producer, long_rows)
    ok &= publication_checks(producer, generated, long_rows)
    ok &= negative_checks(producer)
    ok &= generated_source_checks(generated)
    ok &= consumer_checks(consumer)
    passed = sum(r["passed"] for r in ROWS)
    print(f"\n{passed} of {len(ROWS)} rows passed.")
    (directory / "candidate-check.json").write_text(json.dumps(
        {"schema": "validated_far_step_cpp_candidate_check/v2",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
