"""Checker for gate O1, version 2, after review finding O1-R1. Every row of
version 1 is kept except the four above-wake-speed rows, which version 1
wrote for behaviour O1-R1 rejects. Added: every unsupported origin (source
or receiver above wake speed, coincident paths, an increment budget that
admits no step) is refused unsupported_validated_domain, naming the
producer's code, normally, cancelled, under a one-byte memory budget and
under the diagnostic limit; a request with no finite working-set bound is
refused; the reviewer's unchanged admission probe, run on this build,
passes its two supported known cases before its six targets and every
target is an explicit domain refusal; and the working-set estimates are
recorded.

Version 1 description follows.

Checker for gate O1 of the ordinary integration: the ordinary typed entry
point evolve_native_coupled_histories with the validated far-step method
selected.

Reads the O1 fixture's JSON lines for one and four workers. The accepted
Stage 3 increment 4 version 2 checker is imported unchanged and applied to
the rows the ordinary entry produced: its known cases first (the reviewer's
frozen three-path brackets, closed-form static brackets, exact decimal
arithmetic), then its general bookkeeping over every ordinary-entry run
(exact time, atomic shape, whole-step publication slack, ledger and debit,
evidence chain, continuation). Added for O1, with the ordinary controller's
own row as the known case for every ordinary-view predicate: cumulative
accepted and rejected counts, attempt numbering and callback counts across
resumption; the status and halt-code mapping; frozen brackets inside the
grouped tubes reached through the ordinary entry at two step sizes; parity
with the direct driver; per-invocation diagnostic limits; memory admission
with no continuation after a resource halt; every refusal by name; and
byte identity across worker counts. Exact rational arithmetic, no solver
code. Exit status 2 if a known case fails. c_f = 1.

Usage: python <this file> <directory with ordinary-w1.jsonl and
       ordinary-w4.jsonl>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

ROOT = next(p for p in pathlib.Path(__file__).resolve().parents
            if (p / "AGENTS.md").is_file())
EVIDENCE = ROOT / "reference/priorities/app-solver/evidence"
sys.path.insert(0, str(EVIDENCE))
import matched_pair_stage_3_increment_4_v2_check as acc  # noqa: E402

ROWS = []
ORDINARY_SCHEMA = "eom_native_coupled_evolution_certificate/v1"


def row(name, passed, detail):
    ROWS.append({"kind": "assertion", "check": name, "passed": bool(passed),
                 "detail": str(detail)})
    print(f"{'PASS' if passed else 'FAIL'}  {name}  [{detail}]")
    return bool(passed)


def load(path):
    with open(path, encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]


def ordinary_rows(rows):
    return {r["case"]: r for r in rows if r.get("ordinary")}


def notes(rows):
    return {r["case"]: r for r in rows if "outcome" in r}


def ordinary_view_ok(o, s):
    """Predicates of the ordinary view of one run against its accepted-format
    summary `s` (None for the ordinary controller, whose own row is the
    known case). Returns a list of failed predicate names."""
    failed = []
    base_acc, base_rej = o["initial_accepted"], o["initial_rejected"]
    local_acc = s["accepted_steps"] if s else o["accepted_steps"] - base_acc
    local_rej = s["rejected_steps"] if s else o["rejected_steps"] - base_rej
    if o["accepted_steps"] != base_acc + local_acc:
        failed.append("cumulative accepted count")
    if o["rejected_steps"] != base_rej + local_rej:
        failed.append("cumulative rejected count")
    first = base_acc + base_rej
    if o["step_indices"] != list(range(first, first + local_acc + local_rej)):
        failed.append("attempt numbering")
    if [c[0] for c in o["callbacks"]] != list(
            range(base_acc + 1, base_acc + 1 + local_acc)):
        failed.append("callback counts")
    accepted_times = [c[1] for c in o["callbacks"]]
    if s:
        current = Q(s["start"])
        ends = []
        for _, _, h, _, _, disposition in s["attempts"]:
            if disposition == "accepted":
                current += Q(h)
                ends.append(current)
        if [Q(t) for t in accepted_times] != ends:
            failed.append("callback times")
        if o["step_status"] != ["accepted" if a[5] == "accepted"
                                else "rejected" for a in s["attempts"]]:
            failed.append("attempt statuses")
        if o["digests"] != s["digests"] or o["accepted_end"] != (
                s["accepted_end"] or o["start"]):
            if not (s["evidence_status"] == "initial_state_refused"):
                failed.append("published state")
        expect_status = "completed" if s["status"] == "completed" else "halted"
        if o["status"] != expect_status:
            failed.append("status")
        if s["status"] == "cancelled":
            expect_halt = "cancelled_at_accepted_boundary"
        else:
            expect_halt = s["halt_code"]
        if s["halt_code"] == "step_limit_exhausted":
            expect_halt = "diagnostic_accepted_step_limit_reached"
        if o["halt_code"] != expect_halt:
            failed.append("halt code")
        if o["evidence_status"] != s["evidence_status"]:
            failed.append("evidence status")
        has = s["continuation"] is not None
        if o["has_continuation"] != has:
            failed.append("continuation presence")
        if has and (o["continuation_accepted"] != o["accepted_steps"]
                    or o["continuation_rejected"] != o["rejected_steps"]
                    or s["continuation"]["accepted_step_count"]
                    != o["accepted_steps"]):
            failed.append("continuation counters")
        if o["controller_step_size"] != s["controller_step_size"]:
            failed.append("controller step")
    else:
        if o["accepted_end"] != o["requested_end"] or o["status"] != "completed":
            failed.append("ordinary completion")
    if o["cost_cooldown"] != 0 or o["growth_headroom"] != 0:
        failed.append("unused ordinary controller state")
    if not o["all_steps_atomic"]:
        failed.append("atomic")
    return failed


def known(rows):
    print("Known cases, before any target")
    ok = acc.known(rows)
    ordinary = ordinary_rows(rows)["K-ordinary-selection"]
    ok &= row("known: the ordinary selection runs the ordinary controller,"
              " with no validated run or continuation",
              ordinary["schema"] == ORDINARY_SCHEMA
              and not ordinary["has_validated_run"]
              and not ordinary["has_continuation"]
              and ordinary["evidence_status"]
              == "executable_architecture_evidence", ordinary["schema"])
    failed = ordinary_view_ok(ordinary, None)
    ok &= row("known: the ordinary-view predicates hold on the ordinary"
              " controller's own row", failed == [],
              f"callbacks {[c[0] for c in ordinary['callbacks']]}, attempt"
              f" indices {ordinary['step_indices']}; {failed}")
    # Negative known: the driver's zero-based ordinals must fail the
    # callback predicate.
    shifted = dict(ordinary, callbacks=[[c[0] - 1, c[1]]
                                        for c in ordinary["callbacks"]])
    ok &= row("known: zero-based ordinals in place of counts fail the"
              " callback predicate",
              "callback counts" in ordinary_view_ok(shifted, None), "")
    return ok


def brackets_inside(case, h):
    reference = json.loads(
        (EVIDENCE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    inside = True
    times = []
    for entry in reference["cases"]:
        t = Q(entry["time"])
        k = t / h
        if k.denominator != 1:
            continue
        r = case.accepted_step(int(k))
        inside &= Q(r["end"]) == t
        times.append(entry["time"])
        for name, b in entry["paths"].items():
            x, v = acc.tubes(r, name)
            inside &= acc.gate.contains(x, tuple(Q(s) for s in b["position_z"]))
            inside &= acc.gate.contains(v, tuple(Q(s) for s in b["velocity_z"]))
    return inside, times


def strip_case(rows, name):
    return [{k: v for k, v in r.items() if k != "case"}
            for r in rows if r["case"] == name and not r.get("ordinary")]


def targets(rows):
    ok = True
    ordinary = ordinary_rows(rows)
    names = []
    for r in rows:
        if (r.get("summary") and r["case"] not in names
                and r["case"] in ordinary):
            names.append(r["case"])
    driver_rows = [r for r in rows if not r.get("ordinary")]
    cases = {name: acc.Case(driver_rows, name) for name in names}
    print("\nAccepted bookkeeping over every ordinary-entry run")
    ok &= acc.bookkeeping(list(cases.values()))
    print("\nOrdinary entry")
    k1 = cases["O-K1-static"]
    static_ok = True
    for k in (1, 2):
        r = k1.accepted_step(k)
        speed, shift = acc.gate.qual.static_axis_truth(acc.gate.KAPPA, Q(10),
                                                       k * acc.gate.H)
        x, v = acc.tubes(r, "receiver")
        static_ok &= (acc.gate.contains(v, (-speed[1], -speed[0]))
                      and acc.gate.contains(x, (-shift[1], -shift[0])))
    ok &= row("static: the closed-form receiver brackets lie inside the tubes"
              " reached through the ordinary entry", static_ok, "two steps")
    for name, h in (("O-K2-three-path", Q(1, 128)),
                    ("O-three-path-ungrouped", Q(1, 128)),
                    ("O-three-path-grouped", Q(1, 128)),
                    ("O-three-path-grouped-fine", Q(1, 256))):
        inside, times = brackets_inside(cases[name], h)
        ok &= row(f"frozen brackets: {name}, all three paths' position and"
                  " velocity", inside, f"t = {', '.join(times)}")
    grouped = cases["O-three-path-grouped"]
    plain = cases["O-three-path-ungrouped"]
    ok &= row("grouping reaches the driver: grouped intervals on every"
              " grouped step and none without the declaration",
              all(r["accounting"]["group_intervals"] > 0
                  for r in grouped.accepted)
              and all(r["accounting"]["group_intervals"] == 0
                      for r in plain.accepted),
              f"{[r['accounting']['group_intervals'] for r in grouped.accepted]}")
    for o_name, d_name in (("O-three-path-ungrouped", "D-three-path-ungrouped"),
                           ("O-three-path-grouped", "D-three-path-grouped")):
        ok &= row(f"parity: {o_name} equals the direct driver run, every row",
                  strip_case(rows, o_name) == strip_case(rows, d_name),
                  f"{len(strip_case(rows, o_name))} rows")
    view_failures = {}
    for name in names:
        failed = ordinary_view_ok(ordinary[name], cases[name].summary)
        if failed:
            view_failures[name] = failed
    ok &= row("ordinary view of every run: cumulative counts, attempt"
              " numbering, callback counts and times, status and halt code,"
              " continuation counters, published state",
              view_failures == {}, f"{len(names)} runs; {view_failures}")
    o = ordinary
    ok &= row("resumption: cancelled at the second callback and resumed with"
              " another worker count equals the uninterrupted run",
              o["O-grouped-resumed"]["digests"]
              == o["O-three-path-grouped"]["digests"]
              and cases["O-grouped-resumed"].summary["continuation"]
              == cases["O-three-path-grouped"].summary["continuation"]
              and o["O-grouped-resumed"]["accepted_steps"] == 4
              and [c[0] for c in o["O-grouped-resumed"]["callbacks"]] == [3, 4],
              "content, continuation, cumulative count 4, callbacks 3 and 4")
    a, b = o["O-adaptive-resumed"], o["O-adaptive-uninterrupted"]
    ok &= row("resumption with rejections: cumulative accepted and rejected"
              " counts equal the uninterrupted run's",
              a["digests"] == b["digests"]
              and (a["accepted_steps"], a["rejected_steps"])
              == (b["accepted_steps"], b["rejected_steps"])
              and o["O-adaptive-cancelled-after-three"]["rejected_steps"] > 0,
              f"{a['accepted_steps']} accepted, {a['rejected_steps']} rejected;"
              f" {o['O-adaptive-cancelled-after-three']['rejected_steps']}"
              " before the cut")
    chain = [o[n] for n in ("O-limit-first", "O-limit-second",
                            "O-limit-reaches-end")]
    ok &= row("diagnostic limit is per invocation: 1, 1, then 2 to the end",
              [c["accepted_steps"] for c in chain] == [1, 2, 4]
              and [c["halt_code"] for c in chain]
              == ["diagnostic_accepted_step_limit_reached"] * 2 + [""]
              and chain[2]["status"] == "completed"
              and chain[2]["digests"] == o["O-three-path-grouped"]["digests"],
              "cumulative 1, 2, 4; completed equals the uninterrupted run")
    for name, initial in (("K-memory-budget-one-byte", 0),
                          ("K-memory-budget-one-below-estimate", 0),
                          ("K-resumed-memory-budget-one-byte", 4)):
        m = o[name]
        ok &= row(f"memory: {name} halts before any step with no validated run"
                  " or continuation, its counters unchanged",
                  m["status"] == "halted"
                  and m["halt_code"] == "memory_budget_exhausted"
                  and not m["has_validated_run"] and not m["has_continuation"]
                  and m["digests"] == m["input_digests"]
                  and m["accepted_end"] == m["start"]
                  and m["accepted_steps"] == initial == m["initial_accepted"]
                  and m["step_indices"] == [] and m["callbacks"] == []
                  and m["memory_estimate"] > m["memory_budget"],
                  f"estimate {m['memory_estimate']}, budget {m['memory_budget']}")
    eq = o["K-memory-budget-equal-to-estimate"]
    ok &= row("memory: a budget equal to the estimate is admitted and equals"
              " the unbudgeted run",
              eq["status"] == "completed"
              and eq["memory_budget"] == eq["memory_estimate"]
              and eq["digests"] == o["O-three-path-grouped"]["digests"],
              f"{eq['memory_estimate']} bytes")
    ok &= row("the default ordinary memory budget leaves the run unchanged,"
              " and the estimate is reported with the run",
              o["O-three-path-grouped"]["memory_estimate"]
              == eq["memory_estimate"], "")
    for name, halt in (
            ("N-evidence-for-another-population", "initial_population_refused"),
            ("N-evidence-for-another-population-tiny-memory",
             "initial_population_refused"),
            ("N-evidence-for-another-population-cancelled",
             "initial_population_refused"),
            ("N-continuation-declaration-removed", "continuation_refused")):
        m, s = o[name], cases[name].summary
        ok &= row(f"driver admission through the ordinary entry: {name} is"
                  " refused before any early return, with no continuation",
                  m["status"] == "halted" and m["halt_code"] == halt
                  and s["evidence_status"] == "initial_state_refused"
                  and not m["has_continuation"] and m["callbacks"] == []
                  and m["accepted_steps"] == m["initial_accepted"]
                  and m["rejected_steps"] == m["initial_rejected"]
                  and m["digests"] == m["input_digests"],
                  f"{halt}: {s['halt_reason'][:70]}")
    k = o["K-maximum-step-equal-to-initial"]
    ok &= row("maximum step equal to the initial step is admitted and changes"
              " nothing", k["digests"] == o["O-three-path-grouped"]["digests"],
              "")
    k = o["K-equation-selection-canonical-default"]
    ok &= row("an explicit canonical default equation selection is admitted"
              " and changes nothing",
              k["digests"] == o["O-three-path-grouped"]["digests"], "")

    print("\nRefusals")
    n = notes(rows)
    named = {name: name[len("N-control-"):] for name in n
             if name.startswith("N-control-")}
    ok &= row("every ordinary-only control off its default is refused, naming"
              " the control",
              all(n[name]["outcome"] == "refused:unsupported_execution_policy"
                  and control in n[name]["detail"]
                  for name, control in named.items()), f"{len(named)} controls")
    budget = [name for name in n if "-budget-" in name
              and not name.startswith("N-origin-")]
    ok &= row("empty, zero, negative, overflowing, nonfinite and malformed"
              " budget tokens, and a one-field or zero total budget, are"
              " refused",
              all(n[name]["outcome"] == "refused:unsupported_execution_policy"
                  for name in budget), f"{len(budget)} requests")
    method = ["N-unknown-integration-method", "N-empty-integration-method",
              "N-validated-controls-under-ordinary-groups",
              "N-validated-controls-under-ordinary-attempts"]
    ok &= row("unknown or empty selections, and validated controls under the"
              " ordinary selection, are refused",
              all(n[name]["outcome"] == "refused:unsupported_execution_policy"
                  for name in method), "four requests")
    restart = [name for name in n if name.startswith("N-restart-")]
    ok &= row("restart counters that differ from the continuation's are"
              " refused",
              len(restart) == 3 and all(
                  n[name]["outcome"] == "refused:unsupported_execution_policy"
                  and "_step_count" in n[name]["detail"] for name in restart),
              f"{len(restart)} requests")
    admission = [name for name in n if name.startswith("N-ordinary-admission-")]
    ok &= row("the ordinary admission still applies under the selection",
              len(admission) == 5 and all(
                  n[name]["outcome"] == "refused:invalid_argument"
                  for name in admission), f"{len(admission)} requests")
    origins = {name: r for name, r in n.items() if name.startswith("N-origin-")}
    expected_code = {"source-above-wake-speed": "VFS-H1-01",
                     "receiver-above-wake-speed": "VFS-H1-01",
                     "coincident-paths": "VFS-H2-01",
                     "budget-admits-no-step": "VFS-BUDGET-0"}
    origin_ok = len(origins) == 16
    for name, r in origins.items():
        kind = next(k for k in expected_code if name.startswith("N-origin-" + k))
        origin_ok &= (r["outcome"] == "refused:unsupported_validated_domain"
                      and expected_code[kind] in r["detail"])
    ok &= row("O1-R1: every unsupported origin is refused by the producer's own"
              " hypothesis, normally, cancelled, at one byte and under the"
              " diagnostic limit", origin_ok,
              f"{len(origins)} requests: {sorted(set(expected_code.values()))}")
    nb = n["N-no-finite-resource-bound"]
    ok &= row("a request with no finite working-set bound is refused",
              nb["outcome"] == "refused:validated_resource_bound_unavailable",
              nb["detail"][:80])
    entries = [name for name in n if name.startswith("N-entry-")]
    ok &= row("atomic step, snapshot, reusable start snapshot, v7 and v8"
              " checkpoint entries refuse the selection before computing",
              len(entries) == 7 and all(
                  n[name]["outcome"] == "refused:unsupported_execution_policy"
                  for name in entries), f"{len(entries)} entries")
    ok &= row("no request was accepted where a refusal was expected",
              all(r["outcome"] != "NOT-REFUSED" for r in n.values()), "")
    return ok


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    w1 = (directory / "ordinary-w1.jsonl").read_bytes()
    w4 = (directory / "ordinary-w4.jsonl").read_bytes()
    rows = load(directory / "ordinary-w1.jsonl")
    if any(r.get("case") == "FATAL" for r in rows):
        print("FATAL row present in fixture output")
        raise SystemExit(2)
    if not known(rows):
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = targets(rows)
    ok &= row("one and four workers produce byte-identical output", w1 == w4,
              f"{len(w1)} bytes")
    probe = (directory / "reviewer-o1-admission-probe.stdout").read_text(
        encoding="utf-8").splitlines()
    ok &= row("the reviewer's unchanged admission probe: two supported known"
              " cases pass first, then all six targets are explicit domain"
              " refusals",
              len(probe) == 8
              and probe[0] == "KNOWN static exact origin completed one step PASS"
              and probe[1] == "KNOWN supported cancellation issued its"
              " admitted origin PASS"
              and all(line.startswith("TARGET ")
                      and "exception=unsupported_validated_domain" in line
                      for line in probe[2:]),
              f"{len(probe)} lines")
    o = ordinary_rows(rows)
    for name in ("O-K2-three-path", "O-three-path-grouped",
                 "O-adaptive-uninterrupted"):
        ROWS.append({"kind": "recorded", "check": f"working-set estimate {name}",
                     "detail": str(o[name]["memory_estimate"])})
        print(f"RECORDED  working-set estimate {name}:"
              f" {o[name]['memory_estimate']} bytes")
    every = acc.ROWS + ROWS
    assertions = [r for r in every if r["kind"] == "assertion"]
    passed = sum(r["passed"] for r in assertions)
    print(f"\n{passed} of {len(assertions)} assertions passed.")
    (directory / "o1-v2-check.json").write_text(json.dumps(
        {"schema": "ordinary_integration_o1_check/v2", "all_passed": bool(ok),
         "rows": every}, indent=1) + "\n", encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
