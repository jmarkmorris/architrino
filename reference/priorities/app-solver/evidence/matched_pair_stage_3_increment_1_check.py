"""Checker for Stage 3 increment 1: the serial validated evolution driver.

Reads the evolution fixture's JSON-lines outputs and verifies, in exact
rational arithmetic and without driver or producer code: truth containment
(closed-form static brackets, the reviewer's frozen three-path brackets read
unchanged, and the frozen aliasing bracket), exact decimal time bookkeeping,
the per-axis ledger, evidence chaining, atomic publication on every refusal,
the fixed response to every refusal code, callbacks, cancellation and
resumption. Known cases run first; exit status 2 if one fails.
c_f = 1 throughout.

Usage: python <this file> <directory with known.jsonl, controller.jsonl,
       refusals.jsonl, cancellation.jsonl, aliasing.jsonl>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_live_gate_check as gate  # noqa: E402

ROWS = []
STEP_SCHEMA = "eom_validated_far_step_atomic_step_certificate/v1"
RUN_SCHEMA = "eom_validated_far_step_evolution_certificate/v1"
POLICY = "canonical_validated_far_step_evolution/v1"


def row(name, passed, detail):
    ROWS.append({"kind": "assertion", "check": name, "passed": bool(passed),
                 "detail": detail})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def recorded(name, detail):
    """A measured quantity that is reported and asserts nothing."""
    ROWS.append({"kind": "recorded", "check": name, "detail": detail})
    print(f"  NOTE  {name}: {detail}")


def load(directory, name):
    with open(directory / f"{name}.jsonl", encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]


class Case:
    def __init__(self, rows, name):
        mine = [r for r in rows if r["case"] == name]
        self.name = name
        self.summary = next(r for r in mine if r.get("summary"))
        self.attempts = [r for r in mine if not r.get("summary")]
        self.accepted = [r for r in self.attempts
                         if r["disposition"] == "accepted"]
        self.log = self.summary["attempts"]

    def accepted_step(self, k):
        found = [r for r in self.accepted if r["step"] == str(k)]
        if len(found) != 1:
            raise SystemExit(f"{self.name}: no single accepted step {k}")
        return found[0]


def tubes(record, name, axis=2):
    return gate.end_tube(gate.path_of(record, name), Q(record["h"]), axis)


def known(rows):
    print("Known cases, before any target")
    notes = {r["case"]: r for r in rows if "outcome" in r}
    ok = row("exact halving", notes["K0-half"]["outcome"]
             == "0.00390625 1 0.00014935 5", notes["K0-half"]["outcome"])
    ok &= row("exact difference", notes["K0-difference"]["outcome"]
              == "0.0002987 0.004375", notes["K0-difference"]["outcome"])
    case = Case(rows, "K1-static")
    ok &= row("K1 static run completes at the exact end",
              case.summary["status"] == "completed"
              and case.summary["accepted_end"] == "0.015625"
              and len(case.accepted) == 2, case.summary["accepted_end"])
    for k in (1, 2):
        r = case.accepted_step(k)
        speed, shift = gate.qual.static_axis_truth(gate.KAPPA, Q(10),
                                                   k * gate.H)
        x, v = tubes(r, "receiver")
        xs, vs = tubes(r, "source")
        ok &= row(f"K1 step {k}: both paths' tubes contain the closed-form"
                  " brackets",
                  gate.contains(v, (-speed[1], -speed[0]))
                  and gate.contains(x, (-shift[1], -shift[0]))
                  and gate.contains(vs, speed)
                  and gate.contains(xs, (10 + shift[0], 10 + shift[1])),
                  f"receiver velocity [{gate.sci(v[0])}, {gate.sci(v[1])}]")
    reference = json.loads(
        (HERE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    case = Case(rows, "K2-three-path")
    step_of = {Q(1, 128): 1, Q(1, 64): 2, Q(1, 32): 4}
    for entry in reference["cases"]:
        t = Q(entry["time"])
        r = case.accepted_step(step_of[t])
        inside = Q(r["end"]) == t
        for name, brackets in entry["paths"].items():
            x, v = tubes(r, name)
            inside &= gate.contains(
                x, tuple(Q(s) for s in brackets["position_z"]))
            inside &= gate.contains(
                v, tuple(Q(s) for s in brackets["velocity_z"]))
        ok &= row(f"K2 t = {entry['time']}: reviewer's position and velocity"
                  " brackets for all three paths inside the tubes", inside,
                  f"step ends at {r['end']}")
    return ok


def bookkeeping(cases):
    print("\nExact time, atomic shape, ledger, evidence and callbacks")
    ok = True
    exact = shape = ledger_ok = chain = callbacks = state = slack = True
    counted = 0
    for case in cases:
        s = case.summary
        # Time from the complete attempt log, which exists for every run.
        current = Q(s["start"])
        accepted_ends = []
        for step_index, attempt_index, h, code, cause, disposition in case.log:
            if disposition == "accepted":
                current += Q(h)
                accepted_ends.append(current)
        exact &= current == Q(s["accepted_end"])
        if s["status"] == "completed":
            exact &= Q(s["accepted_end"]) == Q(s["requested_end"])
        exact &= s["accepted_steps"] == len(accepted_ends)
        exact &= s["rejected_steps"] == len(case.log) - len(accepted_ends)
        exact &= s["run_step_records"] == len(case.log)
        callbacks &= [c[0] for c in s["callbacks"]] == list(
            range(len(accepted_ends)))
        callbacks &= [Q(c[1]) for c in s["callbacks"]] == accepted_ends
        shape &= (s["schema"] == RUN_SCHEMA and s["run_schema"] == RUN_SCHEMA
                  and s["policy"] == POLICY and s["all_steps_atomic"])
        # State at return.
        if accepted_ends:
            members = s["evidence"]["members"]
            state &= all(members[p]["digest_after"] == d
                         for p, d in s["digests"].items())
            state &= s["evidence"]["step_end"] == s["accepted_end"]
            state &= all(e["end_token"] == s["accepted_end"]
                         for e in s["end"].values())
            state &= s["evidence_status"] == "validated_far_step_enclosure"
        else:
            state &= s["digests"] == s["input_digests"]
            state &= s["evidence"] == s["input_evidence"]
            state &= s["ledger"] == []
        previous = None
        for r in case.attempts:
            counted += 1
            a = r["atomic"]
            shape &= a["schema"] == STEP_SCHEMA and a["publication_atomic"]
            shape &= a["substeps"] == 0 and not a["has_snapshot"]
            shape &= a["integration_method"] == "validated_far_step/v1"
            if r["disposition"] == "accepted":
                exact &= Q(r["end"]) - Q(r["start"]) == Q(r["h"])
                exact &= a["attempted_end"] == r["end"] == a["accepted_time"]
                shape &= (a["status"] == "accepted" and r["published"]
                          and not a["published_equals_input"]
                          and a["local_errors"] == len(r["paths"])
                          and a["evidence_status"]
                          == "validated_far_step_enclosure"
                          and r["evidence"] is not None)
                slack &= gate.whole_step_slack(r) >= 0
                by_path = {e["path"]: e for e in r["ledger"]}
                for p in r["paths"]:
                    entry = by_path[p["id"]]
                    for kind, token_key in (("position", "position_error"),
                                            ("velocity", "velocity_error")):
                        for axis in range(3):
                            inherited = Q(entry[kind]["inherited"][axis])
                            increment = Q(entry[kind]["increment"][axis])
                            total = Q(entry[kind]["total"][axis])
                            ledger_ok &= total >= inherited >= 0
                            ledger_ok &= increment >= 0
                            ledger_ok &= total == Q(p[token_key][axis])
                            if (previous is not None
                                    and previous["case"] == r["case"]):
                                before = {e["path"]: e
                                          for e in previous["ledger"]}
                                ledger_ok &= inherited == Q(
                                    before[p["id"]][kind]["total"][axis])
                if previous is not None and previous["case"] == r["case"]:
                    chain &= r["start"] == previous["end"]
                    chain &= all(
                        x["digest_after"] == y["digest_before"]
                        for x, y in zip(previous["evidence"]["members"],
                                        r["evidence"]["members"]))
                previous = r
            else:
                shape &= (a["status"] == "rejected" and not r["published"]
                          and a["published_equals_input"]
                          and a["failure_code"] == r["code"]
                          and a["local_errors"] == 0
                          and r["evidence"] is None
                          and a["accepted_time"] == a["attempted_start"]
                          and all("coefficients" not in p
                                  for p in r["paths"]))
        if case.accepted and len(case.attempts) == len(case.log):
            ledger_ok &= s["ledger"] == case.accepted[-1]["ledger"]
    n = len(cases)
    ok &= row("accepted steps sum exactly to the accepted end, and completed"
              " runs end exactly at the requested end", exact, f"{n} runs")
    ok &= row("every attempt has the validated step shape: no substeps, no"
              " snapshot, atomic; refusals publish their inputs", shape,
              f"{counted} emitted attempts")
    ok &= row("ledger: totals equal the published radius tokens, never below"
              " the inherited radius, and each step inherits the previous"
              " total", ledger_ok, "per path and per axis")
    ok &= row("every published segment covers the theorem's sets over the"
              " whole step, exactly", slack, "exact Bernstein coefficients")
    ok &= row("each accepted step starts at the previous end and is generated"
              " from its published content", chain, "time and digest chains")
    ok &= row("returned state is the accepted boundary: histories, evidence"
              " and ledger agree, or all equal the inputs when nothing was"
              " accepted", state, f"{n} runs")
    ok &= row("one callback per accepted step, in order, with the accepted"
              " time", callbacks, f"{n} runs")
    return ok


def halves(log):
    """Within one step, each retried attempt is exactly half the previous."""
    good = True
    for a, b in zip(log, log[1:]):
        if a[0] == b[0] and a[5] != "accepted":
            good &= Q(b[2]) * 2 == Q(a[2])
    return good


def controller(rows):
    print("\nController extent")
    ok = True
    case = Case(rows, "T-remaining-time-clamp")
    ok &= row("last step is shortened to end exactly at the requested end",
              case.summary["status"] == "completed"
              and case.summary["accepted_end"] == "0.02"
              and case.log[-1][2] == "0.004375", str(case.log[-1][2]))
    case = Case(rows, "T-large-epoch")
    ends = [r["end"] for r in case.accepted]
    ok &= row("large epoch: three exact boundaries from 10000000000",
              ends == ["10000000000.0002987", "10000000000.0005974",
                       "10000000000.0008961"]
              and case.summary["status"] == "completed", ", ".join(ends))
    case = Case(rows, "T-zero-length")
    ok &= row("zero-length run completes with no attempt",
              case.summary["status"] == "completed" and case.log == [],
              "state equals the inputs")
    return ok


EXPECT_HALT = {
    "N-H0-unequal-starts": ("validated_step_refused", "VFS-H0-01", "", 1),
    "N-H0-evidence-missing": ("validated_step_refused", "VFS-H0-01", "", 1),
    "N-H0-evidence-of-other-population":
        ("validated_step_refused", "VFS-H0-01", "", 1),
    "N-H0-changed-coupling": ("validated_step_refused", "VFS-H0-01", "", 1),
    "N-H1-retained-past":
        ("validated_step_refused", "VFS-H1-01", "retained_past_speed", 1),
    "N-H3-lower-sign-unresolved":
        ("lower_sign_unresolved", "VFS-H3-01", "", 5),
    "N-H4-minimum-step": ("minimum_step_exhausted", "VFS-H4-01", "", 4),
    "N-BUDGET-01-minimum-step":
        ("minimum_step_exhausted", "VFS-BUDGET-01", "", 4),
    "N-BUDGET-02-inherited-total":
        ("validated_step_refused", "VFS-BUDGET-02", "inherited_total", 1),
    "N-attempt-limit": ("attempt_limit_exhausted", "VFS-BUDGET-01", "", 3),
}
EXPECT_RETRY = {
    "R-H1-step-velocity-box": ("VFS-H1-01", "step_velocity_box", "0.5"),
    "R-H2-step-longer-than-separation": ("VFS-H2-01", "", "24"),
    "R-BUDGET-02-new-growth": ("VFS-BUDGET-02", "new_growth", "0.015625"),
}
EXPECT_NOTE = {
    "N-request-wrong-policy": "refused:unsupported_execution_policy",
    "N-request-field-speed": "refused:unsupported_execution_policy",
    "N-request-exponent-token": "refused:unsupported_execution_policy",
    "N-request-zero-budget": "refused:unsupported_execution_policy",
    "N-ordinary-entry-refuses-validated-token": "refused",
}


def refusals(rows):
    print("\nFixed response to each refusal")
    ok = True
    for name, (halt, code, cause, count) in EXPECT_HALT.items():
        case = Case(rows, name)
        s = case.summary
        ok &= row(name, s["status"] == "halted" and s["halt_code"] == halt
                  and s["halt_refusal_code"] == code
                  and s["halt_refusal_cause"] == cause
                  and len(case.log) == count and s["accepted_steps"] == 0
                  and all(a[3] == code for a in case.log)
                  and case.log[-1][5] == "halt" and halves(case.log)
                  and s["digests"] == s["input_digests"]
                  and s["evidence"] == s["input_evidence"],
                  f"{halt}, {count} attempt(s), nothing published")
    for name, (code, cause, end) in EXPECT_RETRY.items():
        case = Case(rows, name)
        first = case.log[0]
        later = [a for a in case.log if a[0] == first[0]]
        ok &= row(name, first[3] == code and first[4] == cause
                  and first[5] == "retry_shorter_step"
                  and later[-1][5] == "accepted" and halves(case.log)
                  and case.summary["status"] == "completed"
                  and case.summary["accepted_end"] == end,
                  f"first attempt {code} {cause or '-'} at step {first[2]},"
                  f" accepted at {later[-1][2]}")
    case = Case(rows, "R-BUDGET-02-new-growth")
    ok &= row("total budget holds on every accepted step after the retries",
              all(Q(e["velocity"]["total"][2]) <= Q(2, 10 ** 9)
                  for r in case.accepted for e in r["ledger"]),
              "declared velocity radius at most 2e-9")
    case = Case(rows, "N-H4-minimum-step")
    ok &= row("minimum step bounds the retries exactly",
              Q(case.log[-1][2]) >= Q(case.summary["minimum_step"])
              and Q(case.log[-1][2]) / 2 < Q(case.summary["minimum_step"]),
              f"last attempted step {case.log[-1][2]}")
    notes = {r["case"]: r for r in rows if "outcome" in r}
    for name, outcome in EXPECT_NOTE.items():
        ok &= row(name, notes[name]["outcome"] == outcome,
                  notes[name]["detail"][:90])
    return ok


def cancellation(rows):
    print("\nCancellation and resumption")
    whole = Case(rows, "C-uninterrupted")
    stopped = Case(rows, "C-cancelled-after-two")
    resumed = Case(rows, "C-resumed")
    before = Case(rows, "C-cancelled-before-first-attempt")
    ok = row("cancellation stops at an accepted boundary",
             stopped.summary["status"] == "cancelled"
             and stopped.summary["accepted_end"] == "0.015625"
             and stopped.summary["accepted_steps"] == 2
             and stopped.summary["rejected_steps"] == 0,
             "after two accepted steps")
    ok &= row("resuming from the returned state reproduces the uninterrupted"
              " run exactly", resumed.summary["status"] == "completed"
              and resumed.summary["digests"] == whole.summary["digests"]
              and resumed.summary["end"] == whole.summary["end"]
              and resumed.summary["ledger"] == whole.summary["ledger"]
              and resumed.summary["input_digests"]
              == stopped.summary["digests"],
              "identical content chains, end states and ledger")
    ok &= row("cancellation before the first attempt returns the inputs",
              before.summary["status"] == "cancelled" and before.log == []
              and before.summary["digests"] == before.summary["input_digests"],
              "no attempt")
    return ok


def aliasing(rows):
    print("\nAliasing control through the driver")
    truth = gate.qual.frozen.bracket({"amplitude": "0.2", "coupling": "0.001",
                                      "step": "2"})
    aliased = None
    with open(HERE / "matched-pair-stage-3-aliasing-control-runs.jsonl",
              encoding="utf-8") as handle:
        for line in handle:
            rec = json.loads(line)
            if (rec.get("mode") == "evolve" and rec["amplitude"] == "0.2"
                    and rec["step"] == "2" and rec["status"] == "completed"):
                aliased = gate.box(next(p for p in rec["paths"]
                                        if p["path"] == "receiver")
                                   ["velocity_z"])
    ok = True
    for name in ("A-control-fine", "A-control-from-aliased-step"):
        case = Case(rows, name)
        s = case.summary
        last = case.accepted[-1]
        x, v = tubes(last, "receiver")
        separation = max(v[0] - aliased[1], aliased[0] - v[1])
        ok &= row(f"{name}: completes at exactly 2 and contains the frozen"
                  " true brackets", s["status"] == "completed"
                  and s["accepted_end"] == "2" and last["end"] == "2"
                  and gate.contains(v, truth["v_true"])
                  and gate.contains(x, truth["z_true"]),
                  f"{s['accepted_steps']} accepted, {s['rejected_steps']}"
                  f" refused; velocity half-width {gate.sci((v[1] - v[0]) / 2)}")
        if name == "A-control-fine":
            # At the resolved step the validated tube must also exclude the
            # interval the ordinary carrier published.
            ok &= row(f"{name}: end velocity tube is disjoint from the"
                      " aliased interval", separation > 0,
                      f"separation {gate.sci(separation)}")
        else:
            # Started from the aliased step the controller settles on longer
            # steps, so its valid tube is wider. Overlap with the aliased
            # interval is then possible and is not an error.
            recorded(f"{name}: end velocity tube against the aliased interval",
                     ("disjoint, separation " + gate.sci(separation))
                     if separation > 0 else
                     ("overlapping by " + gate.sci(-separation)
                      + "; the tube still contains the true bracket"))
        hull = gate.box(s["end"]["receiver"]["velocity"][2])
        ok &= row(f"{name}: the history layer's end interval contains the"
                  " rebuilt tube", gate.contains(hull, v), "published segment")
    case = Case(rows, "A-control-from-aliased-step")
    first_step = [a for a in case.log if a[0] == 0]
    ok &= row("the adversarial step of 2 is refused on budget and shortened"
              " until certified", first_step[0][2] == "2"
              and all(a[3] == "VFS-BUDGET-01" for a in first_step[:-1])
              and first_step[-1][5] == "accepted" and halves(case.log),
              f"{len(first_step) - 1} refusals, first accepted step"
              f" {first_step[-1][2]}")
    return ok


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    data = {name: load(directory, name) for name in
            ("known", "controller", "refusals", "cancellation", "aliasing")}
    if any(r.get("case") == "FATAL" for rows in data.values() for r in rows):
        print("FATAL row present in fixture output")
        raise SystemExit(2)
    if not known(data["known"]):
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    everything = [r for rows in data.values() for r in rows]
    names = []
    for r in everything:
        if r.get("summary") and r["case"] not in names:
            names.append(r["case"])
    cases = [Case(everything, name) for name in names]
    ok = bookkeeping(cases)
    ok &= controller(data["controller"])
    ok &= refusals(data["refusals"])
    ok &= cancellation(data["cancellation"])
    ok &= aliasing(data["aliasing"])
    assertions = [r for r in ROWS if r["kind"] == "assertion"]
    passed = sum(r["passed"] for r in assertions)
    print(f"\n{passed} of {len(assertions)} assertions passed;"
          f" {len(ROWS) - len(assertions)} recorded quantities.")
    (directory / "increment-1-check.json").write_text(json.dumps(
        {"schema": "validated_evolution_increment_1_check/v1",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
