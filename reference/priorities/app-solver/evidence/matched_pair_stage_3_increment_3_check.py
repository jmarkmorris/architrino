"""Checker for Stage 3 increment 3: worker threads in the validated far step.

The claim under test is that the worker count changes nothing but how a step
is executed. The fixture takes the worker count as a program argument and
prints no row that depends on it, so the claim is tested on whole files:

  known    the indexed runner's synthetic cases give the expected terminal
           index, kind and task count at each worker count;
  known    with one worker every output file is byte-identical to the
           accepted increment 2 live output;
  target   with 2, 3, 4 and 8 workers, and on repeats, every output file is
           byte-identical to the one-worker file;
  target   eight paths, without and with three disjoint declared pairs, have
           the expected accounting;
  target   a step refused at the first, a middle or the last receiver holds
           exactly the entries a plain loop over receivers holds there;
  target   a grouped run cancelled after two steps and resumed with another
           worker count equals the uninterrupted run;
  target   a worker count of zero is refused.

Byte comparison of outputs of one implementation at different worker counts
establishes determinism of that implementation. It does not establish that
any output is right; that rests on the increment 1 and 2 checkers, which the
same files pass. Known cases run first; exit status 2 if one fails.

Usage: python <this file> <increment 3 output directory> <accepted
       increment 2 live output directory>
"""
import json
import pathlib
import sys

EVOLUTION = ("known", "controller", "refusals", "cancellation", "aliasing",
             "continuation", "budgets", "admission", "ledger", "admission-b",
             "grouping")
OTHER = ("candidate-producer.jsonl", "candidate-generated-source.jsonl",
         "candidate-consumer.jsonl", "candidate-long.jsonl",
         "eom_native_fixture_cli-all.stdout",
         "eom_native_acceleration_fixture_cli-all.stdout",
         "eom_native_evolution_fixture_cli-all.stdout",
         "matched-pair-module.jsonl", "matched-pair-piecewise.jsonl",
         "matched-pair-evolution-guard.jsonl")
RUNS = ("w2", "w3", "w4", "w8", "w4-repeat-2", "w4-repeat-3", "w8-repeat-2",
        "w8-repeat-3")
ROWS = []


def row(name, passed, detail):
    ROWS.append({"check": name, "passed": bool(passed), "detail": detail})
    print(f"  {'PASS' if passed else 'FAIL'}  {name}: {detail}")
    return bool(passed)


def expected_runner(workers, refuse_at, throw_at):
    terminal = min([i for i in (refuse_at, throw_at) if i >= 0], default=8)
    kind = ("none" if terminal == 8
            else "exception" if terminal == throw_at else "refusal")
    ran = 8 if workers > 1 or terminal == 8 else terminal + 1
    return f"terminal={terminal} kind={kind} ran={ran} once=true"


def main(argv):
    if len(argv) != 3:
        raise SystemExit(__doc__)
    out, legacy = pathlib.Path(argv[1]), pathlib.Path(argv[2])
    rows = [json.loads(s) for s in
            (out / "w1" / "workers.jsonl").read_text().splitlines() if s]
    if any(r.get("case") == "FATAL" for r in rows):
        print("FATAL row present in fixture output")
        raise SystemExit(2)
    notes = {r["case"]: r for r in rows if "outcome" in r}

    print("Known cases, before any target")
    cases = (("R-none", -1, -1), ("R-refusal-2-exception-5", 2, 5),
             ("R-exception-2-refusal-5", 5, 2), ("R-refusal-0", 0, -1),
             ("R-exception-7", -1, 7), ("R-launch-fails-at-0", 2, 5),
             ("R-launch-fails-at-1", 2, 5))
    runner = True
    for workers in (1, 2, 3, 4, 8):
        for name, refuse_at, throw_at in cases:
            runner &= (notes[f"{name}-w{workers}"]["outcome"]
                       == expected_runner(workers, refuse_at, throw_at))
    ok = row("indexed runner: the lowest terminal index decides whatever its"
             " kind, every task runs at most once, and a failed helper launch"
             " changes nothing", runner,
             f"{5 * len(cases)} synthetic cases at 1, 2, 3, 4 and 8 workers")
    same = [name for name in EVOLUTION
            if (out / "w1" / f"{name}.jsonl").read_bytes()
            == (legacy / f"{name}.jsonl").read_bytes()]
    ok &= row("one worker reproduces the accepted increment 2 evolution"
              " outputs byte for byte", len(same) == len(EVOLUTION),
              f"{len(same)} of {len(EVOLUTION)} files")
    other = [name for name in OTHER
             if (out / "other" / name).read_bytes()
             == (legacy / name).read_bytes()]
    ok &= row("far-step and ordinary solver fixture outputs are unchanged",
              len(other) == len(OTHER), f"{len(other)} of {len(OTHER)} files")
    if not ok:
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.\n\nTargets")

    names = EVOLUTION + ("workers",)
    different = [(run, name) for run in RUNS for name in names
                 if (out / run / f"{name}.jsonl").read_bytes()
                 != (out / "w1" / f"{name}.jsonl").read_bytes()]
    noisy = [(run, name) for run in ("w1",) + RUNS for name in names
             if (out / run / f"{name}.stderr").read_bytes() != b""]
    ok &= row("every output file at 2, 3, 4 and 8 workers, and on two repeats"
              " of 4 and of 8, is byte-identical to the one-worker file",
              not different, f"{len(RUNS) * len(names) - len(different)} of"
              f" {len(RUNS) * len(names)} files; {different[:3]}")
    ok &= row("no fixture run wrote to its error stream", not noisy,
              f"{len(noisy)} nonempty")

    def attempts(case):
        return [r for r in rows if r["case"] == case and not r.get("summary")
                and "outcome" not in r]

    def summary(case):
        return next(r for r in rows if r["case"] == case and r.get("summary"))

    def accounting(case):
        return [list(r["accounting"].values()) for r in attempts(case)]

    ok &= row("eight paths, no declaration: 8 self relationships excluded and"
              " 56 others, all individual, on each of four steps",
              accounting("W-eight-ungrouped") == [[8, 8, 56, 56, 0, 0, 0]] * 4
              and summary("W-eight-ungrouped")["status"] == "completed",
              "four certified steps")
    ok &= row("eight paths, three disjoint pairs: 18 group intervals standing"
              " for 36 members, 20 individual, on each of four steps",
              accounting("W-eight-grouped") == [[8, 8, 56, 20, 0, 36, 18]] * 4
              and summary("W-eight-grouped")["status"] == "completed",
              "four certified steps")

    def refusal(case, receiver, source, complete_before, partial):
        first = attempts(case)[0]
        pairs = first["pairs"]
        by_receiver = {}
        for p in pairs:
            by_receiver.setdefault(p["receiver"], []).append(p)
        order = list(by_receiver)
        return (first["status"] == "declined" and first["code"] == "VFS-H3-01"
                and not first["published"] and first["evidence"] is None
                and len(pairs) == 7 * complete_before + partial
                and order[-1] == receiver and len(order) == complete_before + 1
                and all(len(by_receiver[r]) == 7 for r in order[:-1])
                and len(by_receiver[receiver]) == partial
                and (pairs[-1]["source"], pairs[-1]["state"])
                == (source, "VFS-H3-01")
                and all(p["state"] in ("present", "absent")
                        for p in pairs[:-1])
                and summary(case)["accepted_steps"] == 0
                and summary(case)["digests"] == summary(case)["input_digests"])

    ok &= row("refusal at the first receiver, with the last receiver also"
              " refusing: the first decides",
              refusal("W-refusal-first-and-last", "p0", "p7", 0, 7),
              "7 entries, all of receiver p0, ending at source p7")
    ok &= row("refusal at a middle receiver, with a later one also refusing:"
              " the lower decides",
              refusal("W-refusal-middle", "p2", "p5", 2, 5),
              "19 entries: two complete receivers, then p2 up to source p5")
    ok &= row("refusal at the last receiver only",
              refusal("W-refusal-last-only", "p7", "p0", 7, 1),
              "50 entries: seven complete receivers, then p7 at source p0")

    whole, cut = summary("W-eight-grouped"), summary(
        "W-eight-grouped-cancelled-after-two")
    resumed = summary("W-eight-grouped-resumed-other-worker-count")
    ok &= row("cancelled after two steps at an accepted boundary and resumed"
              " with another worker count: equal to the uninterrupted run",
              cut["status"] == "cancelled" and cut["accepted_end"] == "0.015625"
              and resumed["status"] == "completed"
              and resumed["digests"] == whole["digests"]
              and resumed["ledger"] == whole["ledger"]
              and resumed["end"] == whole["end"]
              and resumed["continuation"] == whole["continuation"],
              "content chains, end states, ledger and continuation")
    ok &= row("a worker count of zero is refused by the producer and by the"
              " driver",
              notes["N-producer-zero-workers"]["outcome"] == "refused"
              and notes["N-request-zero-workers"]["outcome"]
              == "refused:unsupported_execution_policy", "two refusals")

    passed = sum(r["passed"] for r in ROWS)
    print(f"\n{passed} of {len(ROWS)} assertions passed.")
    (out / "increment-3-check.json").write_text(json.dumps(
        {"schema": "validated_evolution_increment_3_check/v1",
         "all_passed": bool(ok), "rows": ROWS}, indent=1) + "\n",
        encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
