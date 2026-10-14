"""Checker for Stage 3 increment 4: validated run records and restoration by
replay.

Every check of the increment 1 and increment 2 checkers is kept, and their
general rows (exact time, atomic shape, whole-step publication slack, the
ledger and its debit, evidence chains, continuation, accounting) are also
applied to every run of the worker and record fixture commands, including
the leg continued from a restored state. Added for increment 4, with known
cases first: the record file's digest and identity recomputed here with
hashlib, and the absence of any evidence or continuation in it; restoration
under each of the three identity bases equal to the original accepted state;
a further leg from the restored state equal to the same leg from the
original, with the reviewer's frozen three-path brackets inside its tubes;
the replayed evidence admitted by the grouped snapshot route; and then,
kept apart, expectation admission, raw corruption, resealed selected-record
changes, intended acceptance in the weaker bases, false step, leg and final
claims, malformed records, the record builder's boundary checks, and reading
without replay. Every refusal must return no usable state.

The increment 2 checker's own description follows.

Checker for Stage 3 increment 2: declared matched pairs enclosed by the
whole-step tube-form bound inside the serial validated evolution driver.

Every check of the increment 1 checkers, versions 1 to 4, is kept and is
also applied to the grouped runs: exact time, atomic shape, whole-step
publication slack, the ledger and its debit, evidence chains, continuation.
Added for increment 2, with known cases first: the step accounting, in which
a path's relationship to itself is excluded and every other ordered
relationship is in exactly one class; the bound recomputed in exact rational
arithmetic from the bounds the step exposes; the true pair contribution, in
closed form from the exact prescribed past, inside the grouped interval over
the whole receiver box; the reviewer's frozen three-path state brackets
inside the grouped tubes at two step sizes; a between-node case in which the
true contribution at reception times strictly inside one step exceeds the
bound that the same pair has when seen at rest, yet lies inside the
whole-step bound; exact individual fallback for mixed dispositions, equal
charges, unsupported geometry and absent pairs; refusals; and continuation
binding of the declaration. Truth references use no solver code:
matched_pair_stage_3_increment_2_truth.py.

Increment 1, version 4, added
I1-R3b: supplied evidence that does not bind the population it is supplied
with is refused even where the histories declare no radius, and a coupling or
charge that is not an exact finite decimal token is refused, in both cases
before any early return and with no accepted time, evidence or continuation;
the genuine exact-prefix and generated early returns still complete.

Earlier versions: Version 2 added
the sealed continuation and exact resumption of adaptive runs (I1-R1),
refusal of declared budgets that are not finite and positive at the driver
and at the producer (I1-R2), and admission of the initial population before
every early return (I1-R3). Version 3 adds the debit (I1-R4): on every
accepted step, for every path and axis, inherited + increment is never below
the published total and the increment is within the run's increment budget,
both by exact rational comparison of the emitted binary64 values; the
producer's own record satisfies the same inequality; and the reviewer's
tiny-budget case publishes nothing.

Reads the evolution fixture's JSON-lines outputs and verifies, in exact
rational arithmetic and without driver or producer code: truth containment
(closed-form static brackets, the reviewer's frozen three-path brackets read
unchanged, and the frozen aliasing bracket), exact decimal time bookkeeping,
the per-axis ledger, evidence chaining, atomic publication on every refusal,
the fixed response to every refusal code, callbacks, cancellation and
resumption. Known cases run first; exit status 2 if one fails.
c_f = 1 throughout.

Usage: python <this file> <directory with known.jsonl, controller.jsonl,
       refusals.jsonl, cancellation.jsonl, aliasing.jsonl,
       continuation.jsonl, budgets.jsonl, admission.jsonl, ledger.jsonl,
       admission-b.jsonl, grouping.jsonl, workers.jsonl, record.jsonl and
       records/*.json>
"""
import hashlib
import json
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_live_gate_check as gate  # noqa: E402
import matched_pair_stage_3_increment_2_truth as truth  # noqa: E402

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
    debit = within = parts = True
    debit_axes = 0
    smallest_margin = None
    counted = 0
    refused_shape = continuation_ok = True
    refused_count = 0
    for case in cases:
        s = case.summary
        if s["evidence_status"] == "initial_state_refused":
            # A refused initial population or continuation: nothing accepted,
            # nothing issued, nothing to resume from.
            refused_count += 1
            refused_shape &= (s["status"] == "halted" and s["accepted_end"] == ""
                              and s["evidence"] is None
                              and s["continuation"] is None
                              and case.log == [] and s["callbacks"] == []
                              and s["ledger"] == [] and s["halt_reason"] != ""
                              and s["digests"] == s["input_digests"])
            continue
        base = (s["input_continuation"]["accepted_step_count"]
                if s["input_continuation"] else 0)
        c = s["continuation"]
        continuation_ok &= (c is not None
                            and c["accepted_time"] == s["accepted_end"]
                            and c["accepted_step_count"]
                            == base + s["accepted_steps"]
                            and c["controller_step_size"]
                            == s["controller_step_size"]
                            and c["members"] == s["digests"]
                            and c["ledger"] == s["ledger"]
                            and c["has_evidence"] == (s["evidence"] is not None))
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
            range(base, base + len(accepted_ends)))
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
            state &= s["ledger"] == (s["input_continuation"]["ledger"]
                                     if s["input_continuation"] else [])
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
                            # I1-R4: the whole newly declared radius is
                            # charged, and the charge is within the budget.
                            debit_axes += 1
                            debit &= inherited + increment >= total
                            budget = Q(s["increment_budget"][
                                0 if kind == "position" else 1])
                            within &= increment <= budget
                            margin = inherited + increment - total
                            if smallest_margin is None or margin < smallest_margin:
                                smallest_margin = margin
                            declared = Q(p[f"declared_{kind}"][axis])
                            growth = Q(p[f"growth_{kind}"][axis])
                            parts &= (declared == inherited
                                      and growth == increment
                                      and declared + growth
                                      >= Q(p[f"total_{kind}"][axis])
                                      and Q(p[f"total_{kind}"][axis]) == total
                                      and Q(entry[kind]["section_allowance"][axis])
                                      == Q(p[f"section_allowance_{kind}"][axis])
                                      and Q(entry[kind]["step_growth"][axis])
                                      == Q(p[f"step_growth_{kind}"][axis])
                                      and Q(p[f"section_allowance_{kind}"][axis])
                                      + Q(p[f"step_growth_{kind}"][axis])
                                      >= total - inherited)
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
    n = len(cases) - refused_count
    ok &= row("a refused initial population or continuation returns no"
              " accepted time, evidence, ledger or continuation",
              refused_shape, f"{refused_count} runs")
    ok &= row("every admitted run returns a continuation equal to its accepted"
              " state: time, ordinal, controller step, content chains, ledger",
              continuation_ok, f"{n} runs")
    ok &= row("accepted steps sum exactly to the accepted end, and completed"
              " runs end exactly at the requested end", exact, f"{n} runs")
    ok &= row("every attempt has the validated step shape: no substeps, no"
              " snapshot, atomic; refusals publish their inputs", shape,
              f"{counted} emitted attempts")
    ok &= row("ledger: totals equal the published radius tokens, never below"
              " the inherited radius, and each step inherits the previous"
              " total", ledger_ok, "per path and per axis")
    ok &= row("debit (I1-R4): inherited + increment is never below the"
              " published total, exactly", debit,
              f"{debit_axes} path-axis records; smallest margin"
              f" {float(smallest_margin):.3e}")
    ok &= row("debit (I1-R4): every charged increment is within the run's"
              " increment budget", within, f"{debit_axes} path-axis records")
    ok &= row("debit (I1-R4): the driver's ledger is the producer's record,"
              " and the two reported parts together cover the charge", parts,
              "declared, growth, section allowance and step growth")
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


# Since version 2 an inadmissible initial population is refused by the
# driver's own admission, before any producer attempt.
EXPECT_INITIAL = {
    "N-H0-unequal-starts":
        "retained histories do not start at one common time",
    "N-H0-evidence-missing":
        "histories declare radii but no evidence was supplied",
    "N-H0-evidence-of-other-population": "evidence does not bind path",
    "N-H0-changed-coupling":
        "generated history was published under a different coupling",
}
EXPECT_HALT = {
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
    for name, reason in EXPECT_INITIAL.items():
        s = Case(rows, name).summary
        ok &= row(name, s["status"] == "halted"
                  and s["halt_code"] == "initial_population_refused"
                  and s["halt_refusal_code"] == "VFS-H0-01"
                  and s["halt_reason"].startswith(reason)
                  and s["accepted_end"] == "" and s["evidence"] is None
                  and s["continuation"] is None and s["attempts"] == []
                  and s["digests"] == s["input_digests"],
                  f"refused at admission, no attempt: {reason}")
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


def same_publication(a, b):
    """Two runs returned the same accepted state, exactly."""
    return (a["digests"] == b["digests"] and a["end"] == b["end"]
            and a["ledger"] == b["ledger"]
            and a["accepted_end"] == b["accepted_end"]
            and a["continuation"] == b["continuation"])


def continuation(rows):
    print("\nContinuation and exact resumption (I1-R1)")
    get = lambda name: Case(rows, name)
    whole, stopped, resumed = (get("R1-uninterrupted"),
                               get("R1-cancelled-after-two"),
                               get("R1-resumed"))
    ok = row("reviewer's adaptive case: uninterrupted run shortens to 0.75"
             " and takes four steps",
             [a[2] for a in whole.log if a[5] == "accepted"] == ["0.75"] * 4
             and whole.log[0][3] == "VFS-H2-01"
             and whole.summary["accepted_end"] == "3",
             "initial step 1.5 refused on isolation")
    ok &= row("cancelled after two at 1.5 with the controller state retained",
              stopped.summary["status"] == "cancelled"
              and stopped.summary["accepted_end"] == "1.5"
              and stopped.summary["continuation"]["controller_step_size"]
              == "0.75"
              and stopped.summary["continuation"]["cooldown_remaining"] == 3
              and stopped.summary["continuation"]["accepted_step_count"] == 2,
              "step 0.75, cooldown 3, ordinal 2")
    suffix = [a[2:] for a in whole.log if a[0] >= 2]
    ok &= row("resumed with the continuation it reproduces the uninterrupted"
              " suffix and final state exactly",
              [a[2:] for a in resumed.log] == suffix
              and [a[0] for a in resumed.log] == [2, 3]
              and same_publication(resumed.summary, whole.summary),
              "two steps of 0.75, identical content chains, ledger and"
              " continuation")
    fresh = get("R1-new-run-without-continuation")
    recorded("the same population without the continuation is a new run",
             f"steps {[a[2] for a in fresh.log]}, ordinal restarts at"
             f" {fresh.log[0][0]}; content chains"
             f" {'equal' if fresh.summary['digests'] == whole.summary['digests'] else 'differ from'}"
             " the uninterrupted run")
    halted_now = get("R1-resume-cancelled-immediately")
    ok &= row("immediate cancellation after resume keeps the prior ledger and"
              " the same continuation",
              halted_now.summary["status"] == "cancelled"
              and halted_now.log == []
              and halted_now.summary["ledger"] == stopped.summary["ledger"]
              and halted_now.summary["ledger"] != []
              and halted_now.summary["continuation"]
              == stopped.summary["continuation"]
              and halted_now.summary["digests"] == stopped.summary["digests"],
              "no attempt, nothing changed")
    whole, stopped, resumed = (get("R1b-uninterrupted"),
                               get("R1b-cancelled-after-three"),
                               get("R1b-resumed"))
    ok &= row("cancelled during a cooldown that followed retries, then"
              " resumed: identical to the uninterrupted run",
              stopped.summary["continuation"]["cooldown_remaining"] > 0
              and any(a[5] == "retry_shorter_step" for a in stopped.log)
              and [a[2:] for a in resumed.log]
              == [a[2:] for a in whole.log if a[0] >= 3]
              and same_publication(resumed.summary, whole.summary),
              f"cooldown {stopped.summary['continuation']['cooldown_remaining']}"
              f" at the cut; {resumed.summary['accepted_steps']} accepted and"
              f" {resumed.summary['rejected_steps']} refused after it")
    first, again = get("R1c-halted"), get("R1c-resumed-halts-again")
    ok &= row("a run halted on the total budget, resumed, halts again at once"
              " with its ledger intact",
              first.summary["status"] == "halted"
              and again.summary["status"] == "halted"
              and again.summary["halt_code"] == first.summary["halt_code"]
              and again.summary["halt_refusal_code"] == "VFS-BUDGET-02"
              and again.summary["accepted_steps"] == 0
              and len(again.log) == 1
              and again.log[0][0] == first.summary["accepted_steps"]
              and again.summary["ledger"] == first.summary["ledger"]
              and again.summary["ledger"] != []
              and again.summary["digests"] == first.summary["digests"]
              and again.summary["continuation"]
              == first.summary["continuation"],
              f"{first.summary['halt_code']}, ordinal"
              f" {first.summary['accepted_steps']}")
    for name, reason in (
            ("N-continuation-changed-initial-step",
             "initial or minimum step differs"),
            ("N-continuation-changed-increment-budget", "a budget differs"),
            ("N-continuation-total-budget-added", "a budget differs"),
            ("N-continuation-changed-cooldown-length",
             "an attempt limit or the cooldown length differs"),
            ("N-continuation-changed-attempt-limit",
             "an attempt limit or the cooldown length differs"),
            ("N-continuation-stale",
             "accepted time differs from the requested start"),
            ("N-continuation-foreign",
             "evidence is not the continuation's evidence")):
        s = get(name).summary
        ok &= row(name, s["status"] == "halted"
                  and s["halt_code"] == "continuation_refused"
                  and s["halt_reason"] == reason
                  and s["continuation"] is None and s["evidence"] is None,
                  reason)
    s = get("N-continuation-changed-coupling").summary
    ok &= row("N-continuation-changed-coupling", s["status"] == "halted"
              and s["halt_code"] == "initial_population_refused"
              and s["halt_refusal_code"] == "VFS-H0-01"
              and s["continuation"] is None, s["halt_reason"])
    return ok


def budgets(rows):
    print("\nDeclared budgets must be finite and positive (I1-R2)")
    case = Case(rows, "K-total-budget-finite-positive")
    ok = row("known: a finite positive total budget is admitted",
             case.summary["status"] == "completed"
             and case.summary["accepted_steps"] == 1, "one accepted step")
    known = next(r for r in rows if r["case"] == "K-producer-finite-budgets")
    ok &= row("known: the producer certifies with finite positive budgets",
              known["status"] == "certified" and known["published"],
              "certified")
    kinds = ("nan", "positive-infinity", "negative-infinity", "zero",
             "negative")
    notes = {r["case"]: r for r in rows if "outcome" in r}
    names = ([f"N-total-budget-{field}-{kind}" for kind in kinds
              for field in ("position", "velocity")]
             + ["N-total-budget-both-nan", "N-total-budget-both-infinity"])
    ok &= row("driver refuses every malformed total budget before any"
              " attempt", all(notes[n]["outcome"]
                              == "refused:unsupported_execution_policy"
                              for n in names),
              f"{len(names)} requests: each field with NaN, both infinities,"
              " zero and a negative value, and both fields together")
    produced = [r for r in rows if r["case"].startswith("N-producer-")]
    expected = {f"N-producer-{which}-{field}-{kind}" for kind in kinds
                for which in ("total", "increment")
                for field in ("position", "velocity")}
    ok &= row("producer declines every malformed increment or total budget",
              {r["case"] for r in produced} == expected
              and all(r["status"] == "declined" and r["code"] == "VFS-H0-01"
                      and not r["published"] and r["evidence"] is None
                      for r in produced),
              f"{len(produced)} steps, VFS-H0-01, nothing published")
    return ok


def admission(rows):
    print("\nInitial admission before every early return (I1-R3)")
    get = lambda name: Case(rows, name).summary
    s = get("K-zero-length-at-history-end")
    ok = row("known: zero-length run at the histories' end completes",
             s["status"] == "completed" and s["accepted_end"] == "0"
             and s["continuation"] is not None
             and s["digests"] == s["input_digests"], "no attempt")
    s = get("K-zero-length-grown-with-own-evidence")
    ok &= row("known: zero-length run on a generated population with its own"
              " evidence completes and keeps it",
              s["status"] == "completed" and s["evidence"] is not None
              and s["evidence"] == s["input_evidence"]
              and s["continuation"]["has_evidence"], "evidence retained")
    s = get("K-step-limit-at-valid-start")
    ok &= row("known: a step limit of zero at a valid start halts as a limit",
              s["status"] == "halted"
              and s["halt_code"] == "step_limit_exhausted"
              and s["continuation"] is not None, "state returned")
    for name, reason in (
            ("N-zero-length-mismatched-start",
             "a history does not end exactly at the step start"),
            ("N-early-cancellation-mismatched-start",
             "a history does not end exactly at the step start"),
            ("N-step-limit-mismatched-start",
             "a history does not end exactly at the step start"),
            ("N-zero-length-missing-evidence",
             "histories declare radii but no evidence was supplied")):
        s = get(name)
        ok &= row(name, s["status"] == "halted"
                  and s["halt_code"] == "initial_population_refused"
                  and s["halt_refusal_code"] == "VFS-H0-01"
                  and s["halt_reason"] == reason and s["accepted_end"] == ""
                  and s["evidence"] is None and s["continuation"] is None,
                  reason)
    for name in ("N-zero-length-foreign-evidence",
                 "N-early-cancellation-foreign-evidence"):
        s = get(name)
        ok &= row(name, s["status"] == "halted"
                  and s["halt_code"] == "initial_population_refused"
                  and s["halt_reason"].startswith("evidence does not bind")
                  and s["evidence"] is None and s["continuation"] is None
                  and s["input_evidence"] is not None,
                  "foreign evidence is not returned as a resumable state")
    return ok


def ledger(rows):
    print("\nThe increment budget is compared with all newly declared radius"
          " (I1-R4)")
    large = Case(rows, "K-ledger-large-budget")
    step = large.accepted_step(1) if large.accepted else None
    source = gate.path_of(step, "source") if step else None
    ok = row("known: the reviewer's static case with a large budget accepts"
             " one step", large.summary["status"] == "completed"
             and large.summary["accepted_steps"] == 1 and source is not None,
             "one accepted step of 0.125")
    if not ok:
        return False
    total = Q(source["total_position"][2])
    growth = Q(source["growth_position"][2])
    declared = Q(source["declared_position"][2])
    old_charge = Q(source["step_growth_position"][2])
    ok &= row("known: the newly declared source radius is all charged",
              declared == 0 and growth >= total > 0,
              f"declared 0, published {float(total):.17g}, charged"
              f" {float(growth):.17g}")
    recorded("the part the first subject charged",
             f"step growth alone {float(old_charge):.17g}, below the published"
             f" radius by a factor {float(total / old_charge):.3e}")
    tiny = Case(rows, "N-ledger-tiny-budget")
    ok &= row("the reviewer's tiny-budget target publishes nothing",
              tiny.summary["status"] == "halted"
              and tiny.summary["accepted_steps"] == 0
              and tiny.summary["accepted_end"] == "0"
              and tiny.summary["evidence"] is None
              and tiny.summary["ledger"] == []
              and tiny.summary["halt_refusal_code"] == "VFS-BUDGET-01"
              and tiny.summary["digests"] == tiny.summary["input_digests"]
              and all(r["code"] == "VFS-BUDGET-01" and not r["published"]
                      for r in tiny.attempts),
              f"halted {tiny.summary['halt_code']}, VFS-BUDGET-01,"
              f" {len(tiny.attempts)} attempt(s), inputs returned")
    tight = Case(rows, "K-ledger-tight-budget-accepted")
    budget = Q(tight.summary["increment_budget"][0])
    accepted = tight.accepted_step(1) if tight.accepted else None
    charged = (Q(gate.path_of(accepted, "source")["growth_position"][2])
               if accepted else None)
    ok &= row("a position budget just above the newly declared radius accepts"
              " and charges all of it",
              accepted is not None and total <= charged <= budget,
              f"budget {float(budget):.3g}, charged"
              f" {float(charged) if charged is not None else None}")
    below = Case(rows, "N-ledger-budget-below-declared-growth")
    ok &= row("a position budget just below the newly declared radius refuses",
              below.summary["status"] == "halted"
              and below.summary["accepted_steps"] == 0
              and below.summary["halt_refusal_code"] == "VFS-BUDGET-01"
              and Q(below.summary["increment_budget"][0]) < total
              and Q(below.summary["increment_budget"][0]) > old_charge,
              f"budget {below.summary['increment_budget'][0]} lies between the"
              " first subject's charge and the published radius")
    produced = {r["case"]: r for r in rows
                if r["case"].startswith(("K-producer-", "N-producer-"))}
    ok &= row("the public producer applies the same charge",
              produced["K-producer-ledger-large-budget"]["status"]
              == "certified"
              and produced["K-producer-ledger-tight-budget-accepted"]["status"]
              == "certified"
              and all(produced[n]["status"] == "declined"
                      and produced[n]["code"] == "VFS-BUDGET-01"
                      and not produced[n]["published"]
                      and produced[n]["evidence"] is None
                      for n in ("N-producer-ledger-tiny-budget",
                                "N-producer-ledger-budget-below-declared-"
                                "growth")),
              "two certified, two declined VFS-BUDGET-01 without publication")
    two = Case(rows, "K-ledger-second-step-inherits-declared-total")
    if len(two.accepted) == 2:
        first = gate.path_of(two.accepted_step(1), "source")
        second = gate.path_of(two.accepted_step(2), "source")
        ok &= row("a second step inherits the first step's declared total and"
                  " charges only the growth beyond it",
                  Q(second["declared_position"][2])
                  == Q(first["total_position"][2])
                  and Q(second["declared_position"][2])
                  + Q(second["growth_position"][2])
                  >= Q(second["total_position"][2])
                  and Q(second["growth_position"][2])
                  <= Q(two.summary["increment_budget"][0]),
                  f"inherited {second['declared_position'][2]}, charged"
                  f" {second['growth_position'][2]}, published"
                  f" {second['total_position'][2]}")
    else:
        ok &= row("a second step inherits the first step's declared total and"
                  " charges only the growth beyond it", False,
                  f"{len(two.accepted)} accepted steps")
    return ok


def refused_initial(s, reason):
    return (s["status"] == "halted"
            and s["halt_code"] == "initial_population_refused"
            and s["halt_refusal_code"] == "VFS-H0-01"
            and s["evidence_status"] == "initial_state_refused"
            and s["accepted_end"] == "" and s["accepted_steps"] == 0
            and s["evidence"] is None and s["continuation"] is None
            and s["ledger"] == [] and s["attempts"] == []
            and s["digests"] == s["input_digests"]
            and reason in s["halt_reason"])


def admission_b(rows):
    print("\nSupplied evidence must bind, and scalars must be admitted, before"
          " every early return (I1-R3b)")
    get = lambda name: Case(rows, name).summary
    s = get("K-exact-prefix-zero-length-without-evidence")
    ok = row("known: an exact prefix without evidence completes at zero"
             " length and claims no validated evidence",
             s["status"] == "completed" and s["accepted_end"] == "0"
             and s["evidence"] is None and s["continuation"] is not None
             and s["evidence_status"] == "no_validated_step_accepted",
             s["evidence_status"])
    s = get("K-generated-zero-length-with-own-evidence")
    binds = (s["evidence"] is not None and s["input_evidence"] == s["evidence"]
             and {k: v["digest_after"]
                  for k, v in s["evidence"]["members"].items()}
             == s["digests"])
    ok &= row("known: a generated population with its own evidence completes"
              " at zero length, and that evidence binds its content chains",
              s["status"] == "completed" and binds
              and s["evidence_status"] == "validated_far_step_enclosure",
              "digest_after of every member equals the history's chain")
    if not ok:
        return False
    stale = ("N-stale-evidence-exact-prefix-zero-length",
             "N-stale-evidence-exact-prefix-early-cancellation",
             "N-stale-evidence-exact-prefix-step-limit",
             "N-stale-evidence-exact-prefix-positive-run",
             "N-foreign-evidence-exact-prefix-zero-length")
    for name in stale:
        s = get(name)
        supplied = s["input_evidence"]
        not_binding = (supplied is not None
                       and {k: v["digest_after"]
                            for k, v in supplied["members"].items()}
                       != s["input_digests"])
        ok &= row(name, not_binding
                  and refused_initial(s, "evidence does not bind"),
                  "supplied evidence does not bind the exact prefix; refused"
                  " with no accepted time, evidence or continuation")
    produced = {r["case"]: r for r in rows if r["case"].startswith("N-producer-")}
    r = produced["N-producer-stale-evidence-exact-prefix"]
    ok &= row("the public producer declines the same object on the exact"
              " prefix", r["status"] == "declined" and r["code"] == "VFS-H0-01"
              and not r["published"] and r["evidence"] is None, r["reason"])
    good = ("zero", "negative", "exponent", "explicit-plus")
    ok &= row("known: signed and exponent couplings are admitted at zero"
              " length",
              all(get(f"K-coupling-{g}-zero-length")["status"] == "completed"
                  for g in good), ", ".join(
                  get(f"K-coupling-{g}-zero-length")["coupling"] for g in good))
    one = Case(rows, "K-coupling-exponent-one-step")
    signed = Case(rows, "K-charges-signed-and-exponent-one-step")
    ok &= row("known: an exponent coupling and signed, exponent charges take"
              " a certified step",
              one.summary["status"] == "completed"
              and one.summary["accepted_steps"] == 1
              and signed.summary["status"] == "completed"
              and signed.summary["accepted_steps"] == 1,
              "one accepted step each")
    bad = ("not-a-number", "nan", "infinity", "empty", "dangling-exponent",
           "hexadecimal", "two-points", "leading-space", "binary64-overflow")
    ok &= row("every malformed coupling is refused at zero length",
              all(refused_initial(get(f"N-coupling-{b}-zero-length"),
                                  "coupling is not an exact finite decimal")
                  for b in bad), f"{len(bad)} tokens")
    ok &= row("every malformed charge is refused at zero length",
              all(refused_initial(get(f"N-charge-{b}-zero-length"),
                                  "is not an exact finite decimal")
                  for b in bad), f"{len(bad)} tokens")
    ok &= row("a malformed coupling is refused under early cancellation, a"
              " step limit of zero and a positive run",
              all(refused_initial(get(f"N-coupling-not-a-number-{k}"),
                                  "coupling is not an exact finite decimal")
                  for k in ("early-cancellation", "step-limit",
                            "positive-run")), "three requests")
    ok &= row("the public producer declines a malformed coupling or charge",
              all(produced[n]["status"] == "declined"
                  and produced[n]["code"] == "VFS-H0-01"
                  and not produced[n]["published"]
                  for n in ("N-producer-coupling-not-a-number",
                            "N-producer-charge-not-a-number")),
              "VFS-H0-01, nothing published")
    return ok


def exact_radius(g):
    """The tube-form radius from the exposed bounds, in exact rationals."""
    r, v, nu = Q(g["distance_floor"]), Q(g["speed_upper"]), Q(g["factor_floor"])
    ell, w = Q(g["separation_upper"]), Q(g["relative_speed_upper"])
    a, jump = Q(g["acceleration_upper"]), Q(g["join_jump_upper"])
    return Q(g["prefactor_upper"]) * (
        (2 * nu + v) * ell / (r ** 3 * nu ** 3)
        + (w + a * ell / nu + jump) / (r ** 2 * nu ** 2))


def receiver_box(record, name="receiver"):
    return [(Q(lo), Q(hi)) for lo, hi in gate.path_of(record, name)["position_box"]]


def acceleration_box(record, name="receiver"):
    return [(Q(lo), Q(hi)) for lo, hi in gate.path_of(record, name)["acceleration"]]


def static_pair_truth(record, kappa, plus_z=10, minus_z=11):
    """Outer enclosure of the true pair contribution to the receiver over
    its whole step box, from the exact static prescribed past. Valid while
    no emission after time zero can have arrived, t < 10 here."""
    box = receiver_box(record)
    return truth.add(truth.static_hit(kappa, 1, 1, box, (0, 0, plus_z)),
                     truth.static_hit(kappa, 1, -1, box, (0, 0, minus_z)))


def within(inner, outer):
    return all(o[0] <= i[0] and i[1] <= o[1] for i, o in zip(inner, outer))


def published(case):
    return [(r["step"], [(p["id"], p.get("coefficients"),
                          p.get("position_error"), p.get("velocity_error"))
                         for p in r["paths"]]) for r in case.accepted]


def grouping(rows, known_rows):
    print("\nWhole-step matched pairs (increment 2)")
    kappa = Q(1, 1000)
    get = lambda name: Case(rows, name)
    if not truth.known():
        return row("known: the truth reference's own known cases", False, "")
    ok = row("known: the truth reference's own known cases pass", True,
             "static, symmetric, opposite pair, receding, piecewise, box")
    plain, pair = get("G-three-path-ungrouped"), get("G-three-path-grouped")
    k2 = Case(known_rows, "K2-three-path")
    ok &= row("known: with no declaration the three-path run publishes exactly"
              " the increment 1 content",
              plain.summary["digests"] == k2.summary["digests"]
              and plain.summary["status"] == "completed",
              "content chains equal those of K2-three-path")
    first = pair.accepted_step(1) if pair.accepted else None
    g = next((x for x in first["groups"] if x["receiver"] == "receiver"),
             None) if first else None
    analytic = (g is not None and g["disposition"] == "grouped"
                and Q(g["separation_upper"]) >= 1
                and Q(g["separation_upper"]) < 1 + Q(1, 10 ** 12)
                and Q(g["speed_upper"]) < Q(1, 10 ** 100)
                and Q(g["distance_floor"]) <= 10
                and Q(g["distance_floor"]) > 10 - Q(1, 10 ** 9)
                and Q(g["radius_upper"]) >= kappa * 2 / 1000
                and Q(g["radius_upper"]) < kappa * 2 / 1000 * (1 + Q(1, 10 ** 9)))
    ok &= row("known: for the static pair at 10 and 11 the first-step bound is"
              " the analytic 2 kappa l / r^3 = 2e-9 / 1e-3", analytic,
              f"B = {g['radius_upper'] if g else None}")
    if not ok:
        return False

    # Accounting, on every certified attempt of every file.
    accounts = recomputed = 0
    acct_ok = radius_ok = box_ok = True
    for r in ALL_ATTEMPTS:
        if r.get("status") != "certified":
            continue
        a, n = r["accounting"], len(r["paths"])
        states = [p["state"] for p in r["pairs"]]
        grouped_rows = [x for x in r["groups"] if x["disposition"] == "grouped"]
        accounts += 1
        acct_ok &= (a["paths"] == n and a["self_excluded"] == n
                    and a["off_diagonal"] == n * (n - 1)
                    and len(states) == n * (n - 1)
                    and a["individual_present"] == states.count("present")
                    and a["individual_absent"] == states.count("absent")
                    and a["grouped_members"] == states.count("grouped")
                    and a["individual_present"] + a["individual_absent"]
                    + a["grouped_members"] == a["off_diagonal"]
                    and a["group_intervals"] == len(grouped_rows)
                    and a["grouped_members"] == 2 * len(grouped_rows)
                    and all(p["receiver"] != p["source"] for p in r["pairs"]))
        for x in grouped_rows:
            recomputed += 1
            exact = exact_radius(x)
            b = Q(x["radius_upper"])
            radius_ok &= (exact <= b <= exact * (1 + Q(1, 10 ** 12))
                          and Q(x["interval_width"]) >= 2 * b
                          and 0 < Q(x["factor_floor"]) <= 1 - Q(x["speed_upper"])
                          and Q(x["distance_floor"]) > 0
                          and x["receiver"] not in (x["leader"], x["follower"])
                          and [p["state"] for p in r["pairs"]
                               if p["receiver"] == x["receiver"]
                               and p["source"] in (x["leader"], x["follower"])]
                          == ["grouped", "grouped"])
        # A receiver whose only sources are one grouped pair has the one
        # interval as its acceleration box: it contains [-B, B], and exceeds
        # it by no more than the outward rounding of one addition to zero.
        for x in grouped_rows:
            others = [p for p in r["pairs"] if p["receiver"] == x["receiver"]
                      and p["state"] == "present"]
            if not others:
                b = Q(x["radius_upper"])
                slack = b * (1 + Q(1, 10 ** 15))
                box_ok &= all(-slack <= lo <= -b and b <= hi <= slack
                              for lo, hi in acceleration_box(
                                  r, x["receiver"]))
    ok &= row("accounting: N self relationships excluded, and each of the"
              " N (N - 1) others is individual, absent or one of two grouped"
              " members", acct_ok, f"{accounts} certified attempts")
    ok &= row("every grouped bound equals the tube-form radius recomputed"
              " exactly from the exposed bounds, rounded outward", radius_ok,
              f"{recomputed} receiver-group intervals")
    ok &= row("two identities, one interval: a receiver whose sources are one"
              " grouped pair has [-B, B] on every axis, widened only by the"
              " outward rounding of one addition", box_ok,
              "acceleration boxes")

    # Truth over the whole receiver box, every step of the static runs.
    truth_ok = individual_ok = True
    steps = 0
    smallest = None
    for name in ("G-three-path-grouped", "G-three-path-grouped-fine",
                 "K-generated-with-evidence-declared"):
        for r in get(name).accepted:
            x = next(v for v in r["groups"] if v["receiver"] == "receiver")
            enclosure = static_pair_truth(r, kappa)
            b = Q(x["radius_upper"])
            truth_ok &= truth.inside(enclosure, b)
            margin = b - max(abs(enclosure[2][0]), abs(enclosure[2][1]))
            smallest = margin if smallest is None else min(smallest, margin)
            steps += 1
    # For the individual route the comparison uses exact values, because an
    # outer enclosure of the truth cannot be required to fit inside another
    # enclosure. On the axis the contribution is monotone in the receiver
    # point, so its range over the box's axis extent is spanned by the two
    # ends; the transverse components vanish on the axis.
    for name in ("G-three-path-ungrouped", "G-three-path-ungrouped-fine"):
        for r in get(name).accepted:
            box = receiver_box(r)
            solver = acceleration_box(r)
            individual_ok &= (solver[0][0] <= 0 <= solver[0][1]
                              and solver[1][0] <= 0 <= solver[1][1])
            for z in box[2]:
                value = kappa * (1 / (11 - z) ** 2 - 1 / (10 - z) ** 2)
                individual_ok &= solver[2][0] <= value <= solver[2][1]
    ok &= row("truth: the closed-form pair contribution over the whole"
              " receiver box lies inside the grouped interval, every step",
              truth_ok, f"{steps} grouped steps; smallest margin"
              f" {float(smallest):.3e}; continuous over the box")
    ok &= row("truth: the exact closed-form contribution at both axis ends of"
              " the receiver box lies inside the individual route's"
              " acceleration box, every step", individual_ok,
              "ungrouped runs; monotone on the axis, so the axis range")

    # Frozen three-path state brackets inside the grouped tubes.
    reference = json.loads(
        (HERE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    for name, step_of in (
            ("G-three-path-grouped", {Q(1, 128): 1, Q(1, 64): 2, Q(1, 32): 4}),
            ("G-three-path-grouped-fine",
             {Q(1, 128): 2, Q(1, 64): 4, Q(1, 32): 8})):
        case = get(name)
        inside = True
        for entry in reference["cases"]:
            t = Q(entry["time"])
            r = case.accepted_step(step_of[t])
            inside &= Q(r["end"]) == t
            for path, brackets in entry["paths"].items():
                x, v = tubes(r, path)
                inside &= gate.contains(
                    x, tuple(Q(s) for s in brackets["position_z"]))
                inside &= gate.contains(
                    v, tuple(Q(s) for s in brackets["velocity_z"]))
        ok &= row(f"{name}: reviewer's position and velocity brackets for all"
                  " three paths inside the grouped tubes at 1/128, 1/64, 1/32",
                  inside, f"{len(case.accepted)} steps")

    def end_radius(case):
        return Q(gate.path_of(case.accepted[-1], "receiver")
                 ["position_error"][2])
    widths = {n: end_radius(get(n)) for n in
              ("G-three-path-ungrouped", "G-three-path-grouped",
               "G-three-path-ungrouped-fine", "G-three-path-grouped-fine")}
    recorded("receiver position radius at t = 1/32",
             "; ".join(f"{n[13:]} {float(w):.3e}" for n, w in widths.items()))
    recorded("grouped over ungrouped radius at t = 1/32",
             f"{float(widths['G-three-path-grouped'] / widths['G-three-path-ungrouped']):.3e}"
             " at step 1/128, "
             f"{float(widths['G-three-path-grouped-fine'] / widths['G-three-path-ungrouped-fine']):.3e}"
             " at step 1/256")

    tight = get("N-three-path-grouped-tight-budget")
    ok &= row("under the default increment budget the grouped run is refused"
              " and publishes nothing",
              tight.summary["status"] == "halted"
              and tight.summary["accepted_steps"] == 0
              and tight.summary["halt_refusal_code"] == "VFS-BUDGET-01"
              and tight.summary["digests"] == tight.summary["input_digests"],
              "VFS-BUDGET-01")

    # Exact individual fallback.
    for declared, plain_name, disposition, code in (
            ("G-two-path-declared", "G-two-path-undeclared",
             None, ""),
            ("G-mixed-declared", "G-mixed-undeclared", "mixed_ungrouped", ""),
            ("G-same-charge-declared", "G-same-charge-undeclared",
             "not_opposite_ungrouped", ""),
            ("G-straddle-declared", "G-straddle-undeclared",
             "bound_declined_ungrouped", "MPE-GEO-01"),
            ("G-both-absent-declared", "G-both-absent-undeclared",
             "both_absent", "")):
        a, b = get(declared), get(plain_name)
        dispositions = {x["disposition"] for r in a.accepted
                        for x in r["groups"]
                        if x["receiver"] not in (x["leader"], x["follower"])}
        codes = {x["failure_code"] for r in a.accepted for x in r["groups"]
                 if x["receiver"] not in (x["leader"], x["follower"])}
        members = all(x["disposition"] == "receiver_is_member"
                      for r in a.accepted for x in r["groups"]
                      if x["receiver"] in (x["leader"], x["follower"]))
        expected = set() if disposition is None else {disposition}
        ok &= row(f"{declared}: not grouped, and identical to the undeclared"
                  " run",
                  a.summary["status"] == b.summary["status"] == "completed"
                  and len(a.accepted) == len(b.accepted) > 0
                  and a.summary["digests"] == b.summary["digests"]
                  and a.summary["end"] == b.summary["end"]
                  and a.summary["ledger"] == b.summary["ledger"]
                  and published(a) == published(b)
                  and dispositions == expected and members
                  and codes <= {code}
                  and all(r["accounting"]["group_intervals"] == 0
                          for r in a.accepted),
                  f"{sorted(dispositions) or ['receiver_is_member']}"
                  f" {sorted(c for c in codes if c)}")

    # Between-node coverage.
    still, moved = get("G-bump-absent-grouped"), get("G-bump-present-grouped")
    alone = get("G-bump-present-ungrouped")
    node = Q(next(x for x in still.accepted_step(1)["groups"]
                  if x["receiver"] == "receiver")["radius_upper"])
    whole = Q(next(x for x in moved.accepted_step(1)["groups"]
                   if x["receiver"] == "receiver")["radius_upper"])
    ok &= row("known: with the follower at rest the one-step bound contains"
              " the static truth",
              truth.inside(static_pair_truth(still.accepted_step(1), kappa),
                           node), f"B at rest = {float(node):.10e}")
    pieces = [(-20, Q("-10.96875"), (11, 0, 0, 0)),
              (Q("-10.96875"), Q("-10.9375"), (11, 0, Q("7.68"), Q("-163.84"))),
              (Q("-10.9375"), Q("-10.90625"),
               (Q("11.0025"), 0, Q("-7.68"), Q("163.84"))),
              (Q("-10.90625"), 0, (11, 0, 0, 0))]
    box = receiver_box(moved.accepted_step(1))
    individual_box = acceleration_box(alone.accepted_step(1))
    zero_in_box = all(lo <= 0 <= hi for lo, hi in box)
    samples = 128
    outside_node = inside_whole = inside_individual = 0
    extreme = Q(0)
    ends = []
    for k in range(samples + 1):
        t = Q(k, samples) * Q(1, 8)
        plus = truth.static_hit(kappa, 1, 1, [truth.point(0)] * 3, (0, 0, 10))
        _, minus = truth.axis_piecewise_hit(kappa, 1, -1, 0, t, pieces)
        value = truth.add(plus, minus)
        size = max(abs(value[2][0]), abs(value[2][1]))
        extreme = max(extreme, size)
        outside_node += min(abs(value[2][0]), abs(value[2][1])) > node
        inside_whole += truth.inside(value, whole)
        inside_individual += within(value, individual_box)
        if k in (0, samples):
            ends.append(truth.inside(value, node))
    ok &= row("between nodes: at both ends of the step the pair is seen at"
              " rest and its contribution is inside the at-rest bound",
              zero_in_box and ends == [True, True],
              "reception times 0 and 0.125, receiver point 0")
    ok &= row("between nodes: at reception times strictly inside the step the"
              " true contribution exceeds the at-rest bound",
              outside_node > 0,
              f"{outside_node} of {samples + 1} sampled times; largest"
              f" {float(extreme):.4e} against {float(node):.4e}")
    ok &= row("between nodes: every sampled true contribution lies inside the"
              " whole-step grouped interval",
              inside_whole == samples + 1 and moved.summary["status"]
              == "completed",
              f"{inside_whole} of {samples + 1} sampled times; B ="
              f" {float(whole):.4e}; sampled, not continuous")
    ok &= row("between nodes: every sampled true contribution lies inside the"
              " individual route's whole-step box",
              inside_individual == samples + 1,
              f"{inside_individual} of {samples + 1} sampled times")

    # Refusals.
    end = get("N-endpoint-declared")
    ok &= row("endpoint: a member at the edge of the retained past declines"
              " the step on the lower sign, nothing published",
              end.summary["status"] == "halted"
              and end.summary["halt_refusal_code"] == "VFS-H3-01"
              and end.summary["accepted_steps"] == 0
              and end.summary["digests"] == end.summary["input_digests"]
              and all(not r["published"] for r in end.attempts),
              "VFS-H3-01")
    s = get("N-generated-without-evidence-declared").summary
    ok &= row("uncertainty: generated histories declared in a group without"
              " their evidence are refused", refused_initial(
                  s, "histories declare radii but no evidence"),
              s["halt_reason"])
    with_evidence = get("K-generated-with-evidence-declared")
    x = next(v for v in with_evidence.accepted_step(1)["groups"]
             if v["receiver"] == "receiver")
    ok &= row("uncertainty: with their evidence the generated tubes are"
              " grouped, with radii in the separation and velocity allowance",
              with_evidence.summary["status"] == "completed"
              and x["disposition"] == "grouped"
              and Q(x["relative_speed_upper"]) > 0 and x["cells"] == 2,
              f"relative speed bound {x['relative_speed_upper']}")
    for name, reason in (
            ("N-group-unknown-path", "names an unknown path"),
            ("N-group-one-path-twice", "names one path twice"),
            ("N-group-overlapping", "is declared in two groups")):
        ok &= row(name, refused_initial(get(name).summary, reason),
                  get(name).summary["halt_reason"])
    notes = {r["case"]: r for r in rows if "outcome" in r}
    ok &= row("policy and declaration must come together, with the whole-step"
              " policy token",
              all(notes[n]["outcome"] == "refused:unsupported_execution_policy"
                  for n in ("N-policy-without-groups",
                            "N-groups-without-policy",
                            "N-unknown-pair-policy")), "three requests")

    # Continuation.
    cut, resumed = get("G-grouped-cancelled-after-two"), get("G-grouped-resumed")
    ok &= row("continuation: a grouped run cancelled after two steps and"
              " resumed with the same declaration equals the uninterrupted"
              " run",
              cut.summary["status"] == "cancelled"
              and cut.summary["continuation"]["pairing"]
              == pair.summary["pairing"]
              and resumed.summary["digests"] == pair.summary["digests"]
              and resumed.summary["ledger"] == pair.summary["ledger"]
              and resumed.summary["end"] == pair.summary["end"]
              and resumed.summary["continuation"]
              == pair.summary["continuation"],
              "content chains, end states, ledger and continuation")
    for name in ("N-continuation-groups-removed",
                 "N-continuation-members-swapped",
                 "N-continuation-groups-added"):
        s = get(name).summary
        ok &= row(name, s["status"] == "halted"
                  and s["halt_code"] == "continuation_refused"
                  and s["continuation"] is None and s["evidence"] is None
                  and "declared groups differ" in s["halt_reason"],
                  s["halt_reason"])
    produced = {r["case"]: r for r in rows if r["case"].startswith("G-producer-")}
    a, b = produced["G-producer-ungrouped"], produced["G-producer-grouped"]
    ok &= row("the public producer: the declaration changes the receiver's"
              " box and nothing about the members' own boxes",
              a["status"] == b["status"] == "certified"
              and b["accounting"]["group_intervals"] == 1
              and a["accounting"]["group_intervals"] == 0
              and acceleration_box(a, "plus") == acceleration_box(b, "plus")
              and acceleration_box(a, "minus") == acceleration_box(b, "minus")
              and acceleration_box(a) != acceleration_box(b),
              "members are receivers of each other individually")
    return ok


def keys_of(value):
    if isinstance(value, dict):
        for k, v in value.items():
            yield k
            yield from keys_of(v)
    elif isinstance(value, list):
        for v in value:
            yield from keys_of(v)


# For each resealed change: the stage at which each basis must refuse, or
# "restored". Order: expected record, expected controls and origin, expected
# controls, record only. The expectations are always the original record's.
FAMILIES = {
    "M-slack-budget": ("expectation", "expectation", "expectation", "restored"),
    "M-binding-budget": ("expectation", "expectation", "expectation", "replay"),
    "M-cooldown-length": ("expectation", "expectation", "expectation",
                          "restored"),
    "M-attempt-limit": ("expectation", "expectation", "expectation",
                        "restored"),
    "M-coupling": ("expectation", "expectation", "expectation", "replay"),
    "M-origin-charge": ("expectation", "expectation", "replay", "replay"),
    "M-origin-coefficient": ("expectation", "expectation", "replay", "replay"),
    "M-leg-limit-slack": ("expectation", "restored", "restored", "restored"),
    "M-leg-end": ("expectation", "replay", "replay", "replay"),
    "M-false-step-chain": ("expectation", "replay", "replay", "replay"),
    "M-false-step-end": ("expectation", "replay", "replay", "replay"),
    "M-false-leg-status": ("expectation", "replay", "replay", "replay"),
    "M-false-leg-count": ("expectation", "replay", "replay", "replay"),
    "M-false-final-controller-step": ("expectation", "final", "final", "final"),
    "M-false-final-cooldown": ("expectation", "final", "final", "final"),
    "M-false-final-ledger": ("expectation", "final", "final", "final"),
    "W-other-origin-same-controls": ("expectation", "expectation", "restored",
                                     "restored"),
    "W-other-legs-same-controls-and-origin": ("expectation", "restored",
                                              "restored", "restored"),
}
BASES = (("expected-record", "expected_record", 1),
         ("expected-controls-and-origin", "expected_controls", 13),
         ("expected-controls", "expected_controls", 12),
         ("record-only", "record_only", 0))


def record(rows, directory):
    print("\nValidated run records and restoration by replay (increment 4)")
    get = lambda name: Case(rows, name)
    notes = {r["case"]: r for r in rows if "outcome" in r}
    restores = {r["case"]: r for r in rows if r.get("restore")}
    snapshots = {r["case"]: r for r in rows if r.get("snapshot")}

    # Known cases first.
    raw = (directory / "records" / "single.json").read_bytes()
    identity = hashlib.sha256(raw).hexdigest()
    text = raw.decode("utf-8")
    marker = ',"body":'
    body = text[text.index(marker) + len(marker):-1]
    document = json.loads(text)
    ok = row("known: the record file's identity and stored digest, recomputed"
             " here", notes["K-record-identity"]["outcome"] == identity
             and document["digest"] == hashlib.sha256(
                 body.encode("utf-8")).hexdigest()
             and list(document) == ["format", "digest", "body"]
             and list(document["body"]) == ["scalars", "policies", "controls",
                                            "origin", "legs", "steps", "final"],
             f"identity {identity[:16]}, {len(raw)} bytes")
    forbidden = {k for k in keys_of(document)
                 if "evidence" in k or "continuation" in k}
    exact_origin = all(
        token in ("0", "0.0") for path in document["body"]["origin"]["paths"]
        for segment in path["segments"]
        for token in segment["position_error"] + segment["velocity_error"])
    ok &= row("known: the record holds claims only: no evidence and no"
              " continuation, and an exact origin", not forbidden
              and exact_origin, f"forbidden keys {sorted(forbidden)}")
    ok &= row("known: resealing a sound record changes nothing, by the library"
              " and by the text alone",
              notes["K-reseal-is-identity-on-a-sound-record"]["outcome"]
              == "equal", "equal")
    known_restores = (("K-restore-expected-record", "expected_record", 1),
                      ("K-restore-expected-controls-and-origin",
                       "expected_controls", 13),
                      ("K-restore-expected-controls", "expected_controls", 12),
                      ("K-replay-record-only", "record_only", 0),
                      ("K-replay-record-only-other-worker-count",
                       "record_only", 0))
    restored_ok = True
    for name, basis, compared in known_restores:
        r = restores[name]
        restored_ok &= (r["status"] == "restored" and r["basis"] == basis
                        and len(r["compared"]) == compared
                        and r["identity"] == identity and r["usable"]
                        and r["has_evidence"] and r["has_continuation"]
                        and r["has_record"] and r["same_as_reference"] is True
                        and r["legs"] == 1 and r["steps"] == 2)
    ok &= row("known: restored under each basis, the state equals the"
              " original's accepted state: content chains, ledger and"
              " continuation", restored_ok,
              "expected record, expected controls with and without origin,"
              " record only, and record only with another worker count")
    original, again = get("P-continued-from-original"), get(
        "P-continued-from-restored")
    ok &= row("known: a further leg from the restored state equals the same"
              " leg from the original state, and the restored record accepts"
              " it",
              again.summary["status"] == "completed"
              and again.summary["digests"] == original.summary["digests"]
              and again.summary["ledger"] == original.summary["ledger"]
              and again.summary["end"] == original.summary["end"]
              and again.summary["continuation"]
              == original.summary["continuation"]
              and notes["P-continued-from-restored/append"]["outcome"]
              == "appended", "content chains, end states, ledger, continuation")
    reference = json.loads(
        (HERE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    entry = next(e for e in reference["cases"] if Q(e["time"]) == Q(1, 32))
    final_step = again.accepted_step(4)
    inside = Q(final_step["end"]) == Q(1, 32)
    for path, brackets in entry["paths"].items():
        x, v = tubes(final_step, path)
        inside &= gate.contains(x, tuple(Q(s) for s in brackets["position_z"]))
        inside &= gate.contains(v, tuple(Q(s) for s in brackets["velocity_z"]))
    ok &= row("known: the reviewer's frozen brackets at t = 1/32 lie inside"
              " the tubes of the leg continued from the restored state",
              inside, "all three paths, position and velocity")
    with_evidence = snapshots["K-snapshot-with-replayed-evidence"]
    without = snapshots["N-snapshot-without-evidence"]
    group = next(g for g in with_evidence["groups"]
                 if g["receiver"] == "receiver")
    ok &= row("known: the grouped snapshot route admits the replayed"
              " evidence, and refuses the same histories without it",
              with_evidence["status"] == "certified_complete"
              and group["status"] == "certified_enclosed"
              and group["grade"] == "validated_far_step_tubes"
              and group["evidence_bound"]
              and without["enclosed_groups"] == 0
              and all(g["failure_code"] == "MPE-EVIDENCE-01"
                      for g in without["groups"]),
              "certified_enclosed with replayed evidence; MPE-EVIDENCE-01"
              " without")
    leg1, leg3 = get("P-multi-leg-1-cancelled"), get("P-multi-leg-3")
    whole = get("P-multi-uninterrupted")
    multi = (restores["K-multi-restore-expected-record"],
             restores["K-multi-replay-record-only"])
    ok &= row("known: a grouped run of three legs, cancelled after two steps"
              " and resumed under another worker count, restores to its own"
              " accepted state and equals the uninterrupted run",
              leg1.summary["status"] == "cancelled"
              and all(r["status"] == "restored" and r["legs"] == 3
                      and r["steps"] == 6 and r["same_as_reference"] is True
                      for r in multi)
              and leg3.summary["digests"] == whole.summary["digests"]
              and leg3.summary["pairing"]["groups"] == [["plus", "minus"]],
              "three legs, six steps")
    adaptive = restores["K-adaptive-replay-record-only"]
    changed = restores["N-adaptive-first-leg-end-changed/record-only"]
    ok &= row("known: an adaptive run whose first leg's requested end clamps"
              " its step restores from its legs, and a changed first-leg end"
              " is refused at replay",
              adaptive["status"] == "restored" and adaptive["legs"] == 2
              and adaptive["same_as_reference"] is True
              and changed["status"] == "refused" and changed["stage"] == "replay"
              and not changed["usable"], changed["reason"])
    ok &= row("known: a record file is written to a temporary file and"
              " renamed", notes["K-file-write-then-rename"]["outcome"]
              == "replaced no-temporary bad-path-refused",
              notes["K-file-write-then-rename"]["outcome"])
    if not ok:
        return False

    # No refusal returns usable state; every restore reports what it read.
    refusals = [r for r in restores.values() if r["status"] == "refused"]
    granted = [r for r in restores.values() if r["status"] == "restored"]
    ok &= row("no refusal returns usable state: no paths, evidence,"
              " continuation, ledger or record",
              all(not r["usable"] and not r["has_evidence"]
                  and not r["has_continuation"] and not r["has_record"]
                  and r["paths"] == 0 for r in refusals)
              and all(r["usable"] and r["has_continuation"] and r["has_record"]
                      for r in granted),
              f"{len(refusals)} refusals, {len(granted)} restorations")
    ok &= row("every result reports the identity of the bytes it read",
              all(len(r["identity"]) == 64 for r in restores.values()),
              f"{len(restores)} results")

    # Expectation admission.
    admission_rows = ("N-expectation-empty", "N-expectation-origin-only",
                      "N-expectation-identity-with-controls",
                      "N-expectation-identity-not-a-hash",
                      "N-expectation-identity-uppercase")
    ok &= row("an empty, origin-only, contradictory or malformed expectation"
              " is refused before any replay, and is never treated as a"
              " record-only replay",
              all(restores[n]["status"] == "refused"
                  and restores[n]["stage"] == "expectation"
                  and restores[n]["legs"] == 0
                  and restores[n]["basis"] != "record_only"
                  for n in admission_rows)
              and all(restores[n]["basis"] == "" for n in admission_rows[:3]),
              f"{len(admission_rows)} expectations")

    # Raw corruption.
    stale = [restores[f"N-raw-corruption/{b}"]
             for b in ("expected-controls-and-origin", "expected-controls",
                       "record-only",
                       "expected-record-of-the-corrupt-bytes")]
    ok &= row("raw corruption with the stored digest left alone is refused on"
              " the digest under every basis, and on the bytes under the"
              " original's identity",
              all(r["status"] == "refused" and r["stage"] == "read"
                  and "digest does not match" in r["reason"] for r in stale)
              and restores["N-raw-corruption/expected-record"]["stage"]
              == "expectation", "one character changed")

    # Resealed selected-record changes and intended weaker acceptance.
    family_ok = weaker_ok = True
    weaker = 0
    for label, stages in FAMILIES.items():
        for (suffix, basis, compared), stage in zip(BASES, stages):
            r = restores[f"{label}/{suffix}"]
            family_ok &= r["basis"] == basis
            if stage == "restored":
                weaker += 1
                family_ok &= r["status"] == "restored"
                weaker_ok &= (r["identity"] != identity and r["usable"]
                              and len(r["compared"]) == compared
                              and basis != "expected_record")
            else:
                family_ok &= (r["status"] == "refused" and r["stage"] == stage)
    ok &= row("resealed changes: the original's record identity refuses every"
              " one; expected controls refuse every changed control and, with"
              " an origin, every changed origin; false step, leg and final"
              " claims are refused at replay or at the final comparison",
              family_ok, f"{len(FAMILIES)} changes under four bases each")
    ok &= row("weaker bases accept what they cannot distinguish, and say so:"
              " a slack control, a slack operational limit, another origin"
              " when none was expected, other legs",
              weaker_ok and weaker == 11,
              f"{weaker} intended acceptances, each reporting its basis, the"
              " fields compared and an identity that is not the original's")

    # Malformed records.
    bad = {n: r for n, r in restores.items() if n.startswith("X-")}
    ok &= row("malformed records are refused when read, for their content and"
              " not their digest",
              len(bad) == 15 and all(r["status"] == "refused"
                                     and r["stage"] == "read"
                                     and "digest" not in r["reason"]
                                     for r in bad.values()),
              f"{len(bad)} records: scalars, policies, budgets, steps, origin"
              " radius, missing part, format, not JSON, not canonical, zero"
              " workers")

    # The record builder.
    builder = {"K-append-genuine-certificate": "appended",
               "N-append-boundary-ledger-altered": "refused",
               "N-append-boundary-time-altered": "refused",
               "N-append-boundary-controller-step-altered": "refused",
               "N-append-boundary-population-swapped": "refused",
               "N-append-boundary-evidence-swapped": "refused",
               "N-append-another-runs-certificate": "refused",
               "N-append-no-continuation": "refused",
               "N-append-request-control-differs": "refused",
               "N-append-request-start-differs": "refused",
               "N-append-second-leg-without-continuation": "refused",
               "K-append-transcript-altered-is-carried": "appended",
               "N-open-not-an-origin": "refused"}
    ok &= row("the record builder refuses a certificate whose boundary fields"
              " disagree with its seals, a certificate of another run, and a"
              " leg that does not continue the record",
              all(notes[n]["outcome"] == o for n, o in builder.items()),
              f"{len(builder)} cases")
    carried = restores["N-transcript-altered/record-only"]
    ok &= row("a transcript field altered after the driver returned is carried"
              " as a claim and then refused at replay",
              carried["status"] == "refused" and carried["stage"] == "replay"
              and not carried["usable"], carried["reason"])

    # Reading without replay.
    ok &= row("reading without replay returns claims only, cannot be"
              " extended, and returns nothing for a corrupt record",
              notes["K-read-without-replay"]["outcome"] == "read"
              and notes["N-read-without-replay-cannot-be-extended"]["outcome"]
              == "refused"
              and notes["N-read-without-replay-corrupt"]["outcome"]
              == "refused no-record",
              notes["K-read-without-replay"]["detail"])
    return ok


ALL_ATTEMPTS = []


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    data = {name: load(directory, name) for name in
            ("known", "controller", "refusals", "cancellation", "aliasing",
             "continuation", "budgets", "admission", "ledger",
             "admission-b", "grouping", "workers", "record")}
    if any(r.get("case") == "FATAL" for rows in data.values() for r in rows):
        print("FATAL row present in fixture output")
        raise SystemExit(2)
    if not known(data["known"]):
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    everything = [r for rows in data.values() for r in rows]
    ALL_ATTEMPTS.extend(r for r in everything
                        if "accounting" in r and not r.get("summary"))
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
    ok &= continuation(data["continuation"])
    ok &= budgets(data["budgets"])
    ok &= admission(data["admission"])
    ok &= ledger(data["ledger"])
    ok &= admission_b(data["admission-b"])
    ok &= grouping(data["grouping"], data["known"])
    ok &= record(data["record"], directory)
    assertions = [r for r in ROWS if r["kind"] == "assertion"]
    passed = sum(r["passed"] for r in assertions)
    print(f"\n{passed} of {len(assertions)} assertions passed;"
          f" {len(ROWS) - len(assertions)} recorded quantities.")
    (directory / "increment-4-check.json").write_text(json.dumps(
        {"schema": "validated_evolution_increment_4_check/v1",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
