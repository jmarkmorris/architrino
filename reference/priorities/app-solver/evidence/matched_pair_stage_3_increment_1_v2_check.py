"""Checker for Stage 3 increment 1, version 2: the serial validated evolution
driver after the corrections for review findings I1-R1, I1-R2 and I1-R3.

Every check of the version 1 checker is kept. Added: the sealed continuation
and exact resumption of adaptive runs (I1-R1), refusal of declared budgets
that are not finite and positive at the driver and at the producer (I1-R2),
and admission of the initial population before every early return (I1-R3).

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
       continuation.jsonl, budgets.jsonl, admission.jsonl>
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


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    data = {name: load(directory, name) for name in
            ("known", "controller", "refusals", "cancellation", "aliasing",
             "continuation", "budgets", "admission")}
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
    ok &= continuation(data["continuation"])
    ok &= budgets(data["budgets"])
    ok &= admission(data["admission"])
    assertions = [r for r in ROWS if r["kind"] == "assertion"]
    passed = sum(r["passed"] for r in assertions)
    print(f"\n{passed} of {len(assertions)} assertions passed;"
          f" {len(ROWS) - len(assertions)} recorded quantities.")
    (directory / "increment-1-v2-check.json").write_text(json.dumps(
        {"schema": "validated_evolution_increment_1_check/v2",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
