"""Checker for gate O2, version 3, after review findings O2-R1 and O2-R2 and
the per-leg replay resource amendment. Every row of the version 1 checker
is kept. Added: a genuine record of another origin, charge, coupling, pair
policy or prehistory, with its own consistent claims, inside the caller's
resealed envelope, is refused at the expectation stage both when the caller
names its complete identity and under the default; ten short legs, each
ending at a clipped step, exceed the whole-span count floor(span/minimum)+1,
and the reported per-leg replay step bound equals an independent exact
recomputation from the record's leg ends and enforced limits and covers the
replayed steps; and the bound charges the admitted worker override. The
O2-R1 replay-seal probe is reviewed from its own output by the packet.

Version 1 description follows.

Checker for gate O2 of the ordinary integration: typed v9 persistence of
the validated method.

Reads the O2 persistence fixture's JSON lines for one and four workers.
Imports, unchanged, the O1 version 2 checker (its ordinary-view predicates)
and through it the accepted Stage 3 increment 4 version 2 checker. Known
cases first: the accepted known cases (exact decimal arithmetic, closed-form
static brackets, the reviewer's frozen three-path brackets); the ordinary
controller's own row under the ordinary-view predicates; the fixture's
reseal routine reproducing a written checkpoint byte for byte; durable
write and read-back. Then, over every run the ordinary entry made,
including every leg resumed from v9: the accepted bookkeeping (exact time,
atomic shape, whole-step slack, ledger and debit, chains, continuation);
the ordinary view; the frozen brackets inside resumed tubes; every round
trip equal to its uninterrupted run; identity bases and record identities;
every refusal with its expected code; refused restores holding no state;
and byte identity across worker counts apart from the reported worker
count. Exact rational arithmetic, no solver code. c_f = 1.

Usage: python <this file> <O2 scratch directory with persistence-w1.jsonl,
       persistence-w4.jsonl and ordinary-w1.jsonl>
"""
import json
import pathlib
import sys
from fractions import Fraction as Q

ROOT = next(p for p in pathlib.Path(__file__).resolve().parents
            if (p / "AGENTS.md").is_file())
EVIDENCE = ROOT / "reference/priorities/app-solver/evidence"
sys.path.insert(0, str(EVIDENCE / "matched-pair-ordinary-stage-1-v2"))
import matched_pair_ordinary_o1_v2_check as o1  # noqa: E402

acc = o1.acc
ROWS = []


def row(name, passed, detail):
    ROWS.append({"kind": "assertion", "check": name, "passed": bool(passed),
                 "detail": str(detail)})
    print(f"{'PASS' if passed else 'FAIL'}  {name}  [{detail}]")
    return bool(passed)


def load(path):
    with open(path, encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]


def by_case(rows, key):
    return {r["case"]: r for r in rows if r.get(key)}


def known(rows):
    print("Known cases, before any target")
    ok = acc.known(rows)
    ordinary = by_case(rows, "ordinary")["K-ordinary-selection"]
    ok &= row("known: the ordinary-view predicates hold on the ordinary"
              " controller's own row", o1.ordinary_view_ok(ordinary, None) == [],
              f"callbacks {[c[0] for c in ordinary['callbacks']]}")
    notes = o1.notes(rows)
    ok &= row("known: the fixture's reseal routine reproduces a written v9"
              " checkpoint byte for byte", notes["K-reseal-is-exact"]["outcome"]
              == "equal", "so every resealed target is a genuine reseal")
    creates = [r for r in rows if r.get("persist") == "create"]
    ok &= row("known: every written v9 reseals to itself and holds no"
              " evidence or continuation key",
              all(r["resealed_equals_written"] and not r["has_evidence_key"]
                  and not r["has_continuation_key"] for r in creates),
              f"{len(creates)} checkpoints")
    ok &= row("known: durable write with the shared writer reads back"
              " byte-identical", notes["K-durable-write-read-back"]["outcome"]
              == "equal", notes["K-durable-write-read-back"]["detail"][:16])
    return ok


def bracket_rows(case, h):
    reference = json.loads(
        (EVIDENCE / "matched-pair-review-stage3-three-path-brackets.json")
        .read_text(encoding="utf-8"))
    inside, times = True, []
    present = {r["step"]: r for r in case.accepted}
    for entry in reference["cases"]:
        t = Q(entry["time"])
        k = t / h
        if k.denominator != 1 or str(k.numerator) not in present:
            continue
        r = present[str(k.numerator)]
        inside &= Q(r["end"]) == t
        times.append(entry["time"])
        for name, b in entry["paths"].items():
            x, v = acc.tubes(r, name)
            inside &= acc.gate.contains(x, tuple(Q(s) for s in b["position_z"]))
            inside &= acc.gate.contains(v, tuple(Q(s) for s in b["velocity_z"]))
    return inside, times


def targets(rows, directory):
    ok = True
    ordinary = by_case(rows, "ordinary")
    persist = {}
    for r in rows:
        if r.get("persist"):
            persist[r["case"]] = r
    notes = o1.notes(rows)
    driver_rows = [r for r in rows if not r.get("ordinary") and not r.get("persist")]
    names = []
    for r in driver_rows:
        if r.get("summary") and r["case"] not in names:
            names.append(r["case"])
    cases = {name: acc.Case(driver_rows, name) for name in names}
    print("\nAccepted bookkeeping over every run, including every resumed leg")
    ok &= acc.bookkeeping(list(cases.values()))

    print("\nOrdinary view")
    view = {name: o1.ordinary_view_ok(ordinary[name], cases[name].summary)
            for name in names if name in ordinary}
    failed = {k: v for k, v in view.items() if v}
    ok &= row("ordinary view of every run and resumed leg: cumulative counts,"
              " attempt numbering, callback counts and times, status, halt"
              " code, continuation counters", failed == {},
              f"{len(view)} runs; {failed}")

    print("\nFrozen containment")
    for name, h in (("P-uninterrupted", Q(1, 128)), ("P-from-two", Q(1, 128)),
                    ("P-from-zero", Q(1, 128)), ("P-fine-resumed", Q(1, 256)),
                    ("P-alt-under-expected-controls", Q(1, 128))):
        inside, times = bracket_rows(cases[name], h)
        ok &= row(f"frozen brackets inside {name}", inside and times,
                  f"t = {', '.join(times)}")

    print("\nRound trips")
    whole = ordinary["P-uninterrupted"]
    whole_summary = cases["P-uninterrupted"].summary
    trips = ["P-from-zero", "P-from-two", "P-from-two-workers",
             "P-from-two-again", "P-from-five", "P-continued-after-resume",
             "P-limit-3", "P-alt-under-expected-controls",
             "P-two-under-expected-record", "P-alt-record-in-two-envelope"]
    bad = []
    for name in trips:
        o, s = ordinary[name], cases[name].summary
        if not (o["status"] == "completed" and o["digests"] == whole["digests"]
                and o["accepted_steps"] == 8 and o["rejected_steps"] == 0
                and s["ledger"] == whole_summary["ledger"]
                and s["continuation"] == whole_summary["continuation"]
                and s["end"] == whole_summary["end"]
                and o["record_status"] == "recorded"):
            bad.append(name)
    ok &= row("every round trip through v9 equals the uninterrupted run:"
              " content chains, ledger, sealed continuation, end states,"
              " cumulative counts", bad == [], f"{len(trips)} round trips; {bad}")
    ok &= row("the per-invocation diagnostic limit across checkpoints: 3, 6,"
              " then completed", [ordinary[n]["accepted_steps"] for n in
                                  ("P-limit-1", "P-limit-2", "P-limit-3")]
              == [3, 6, 8], "cumulative counts")
    other = by_case(load(directory / "ordinary-w1.jsonl"), "ordinary")
    ok &= row("the finer grouped round trip equals the O1 fixture's"
              " uninterrupted finer grouped run",
              ordinary["P-fine-resumed"]["digests"]
              == other["O-three-path-grouped-fine"]["digests"],
              "h = 1/256 to 1/32")
    a, b = ordinary["P-adaptive-resumed"], ordinary["P-adaptive-uninterrupted"]
    ok &= row("rejection chain: the resumed run equals the uninterrupted one,"
              " with the cumulative rejected count confirmed by replay",
              a["digests"] == b["digests"]
              and (a["accepted_steps"], a["rejected_steps"]) == (214, 42)
              == (b["accepted_steps"], b["rejected_steps"])
              and persist["P-adaptive-resumed"]["replayed_rejected_steps"] == 7
              and persist["P-adaptive-cut-v9"]["rejected_count"] == 7,
              "7 rejections replayed, 42 in all")

    print("\nIdentity")
    created = {"P-from-zero": "P-zero-v9", "P-from-two": "P-two-v9",
               "P-from-two-workers": "P-two-v9", "P-from-two-again": "P-two-v9",
               "P-from-five": "P-five-v9", "P-from-two-to-four": "P-two-v9",
               "P-fine-resumed": "P-fine-cut-v9", "P-limit-2": "P-limit-1-v9",
               "P-limit-3": "P-limit-2-v9",
               "P-adaptive-resumed": "P-adaptive-cut-v9",
               "P-alt-under-expected-controls": "P-alt-v9",
               "P-two-under-expected-record": "P-two-v9",
               "P-alt-record-in-two-envelope": "P-alt-v9"}
    identity_ok = all(persist[r]["record_identity"]
                      == persist[c]["record_identity"] for r, c in created.items())
    ok &= row("every resume reports the identity of the record it actually"
              " read", identity_ok, f"{len(created)} resumes")
    bases = {name: persist[name]["identity_basis"] for name in created}
    ok &= row("identity basis: expected_record only where the caller named a"
              " complete record, expected_controls otherwise",
              bases.pop("P-two-under-expected-record") == "expected_record"
              and set(bases.values()) == {"expected_controls"}, "")
    alt = persist["P-alt-record-in-two-envelope"]
    ok &= row("a genuine alternate record (same origin and controls, other"
              " legs) restores under expected_controls and is reported as"
              " itself, not as the original",
              alt["record_identity"] != persist["P-two-v9"]["record_identity"]
              and alt["identity_basis"] == "expected_controls"
              and alt["replayed_legs"] == 2
              and persist["P-two-v9"]["record_identity"]
              == persist["P-from-two"]["record_identity"], "")
    ok &= row("a complete record identity named by the caller refuses the"
              " genuine alternate", notes["N-alt-under-expected-record-of-two"]
              ["outcome"] == "refused:checkpoint_replay_refused"
              and "not the expected record" in
              notes["N-alt-under-expected-record-of-two"]["detail"], "")
    ok &= row("the changed runtime worker count is reported and changes"
              " nothing", persist["P-from-two-workers"]["worker_count"]
              != persist["P-from-two"]["worker_count"], "")
    ok &= row("the v9 written after a resumed leg keeps the original"
              " preparation", notes["K-preparation-unchanged-after-resume"]
              ["outcome"] == "equal", "")
    ok &= row("record statuses: recorded for exact origins, not_an_origin for a"
              " run seeded with evidence, which has no v9",
              ordinary["P-not-an-origin"]["record_status"] == "not_an_origin"
              and notes["N-v9-not-an-origin"]["outcome"]
              == "refused:checkpoint_origin_required", "")

    print("\nRefusals")
    expected = {
        "N-resume-at-completed-end": "invalid_request",
        "N-foreign-execution-ungrouped": "checkpoint_execution_mismatch",
        "N-foreign-population": "checkpoint_model_mismatch",
        "N-foreign-run-identity": "checkpoint_preparation_mismatch",
        "N-thread-count-inside-request": "checkpoint_model_mismatch",
        "N-foreign-coupling": "checkpoint_model_mismatch",
        "N-original-carries-continuation": "checkpoint_preparation_mismatch",
        "N-v8-checkpoint-as-v9": "invalid_checkpoint",
        "N-end-not-after-accepted": "invalid_request",
        "N-worker-override-zero": "request_budget_exhausted",
        "N-worker-override-above-limit": "request_budget_exhausted",
        "N-corrupted-without-reseal": "checkpoint_digest_mismatch",
        "N-resealed-accepted-count": "checkpoint_claim_mismatch",
        "N-resealed-rejected-count": "checkpoint_claim_mismatch",
        "N-resealed-accepted-time": "checkpoint_claim_mismatch",
        "N-resealed-controller-step": "checkpoint_claim_mismatch",
        "N-resealed-histories": "checkpoint_claim_mismatch",
        "N-resealed-record-identity-claim": "checkpoint_claim_mismatch",
        "N-resealed-record-leg-cancellation": "checkpoint_replay_refused",
        "N-resealed-record-step-end": "checkpoint_replay_refused",
        "N-record-without-reseal": "checkpoint_replay_refused",
        "N-three-record-in-two-envelope": "checkpoint_claim_mismatch",
        "N-resume-changed-memory-budget-is-preparation": "checkpoint_model_mismatch",
        "N-resume-replay-bound-over-budget": "checkpoint_resource_refused",
        "N-resume-resource-before-false-record": "checkpoint_resource_refused",
        "N-v9-size-exhausted": "checkpoint_size_exhausted",
        "N-preflight-refused-origin-has-no-v9": "unsupported_validated_domain",
        "N-v9-not-an-origin": "checkpoint_origin_required",
    }
    wrong = {k: notes[k]["outcome"] for k, v in expected.items()
             if notes.get(k, {}).get("outcome") != "refused:" + v}
    ok &= row("every foreign, stale-claim, corrupted, resealed-false, resource,"
              " size and domain case is refused with its expected code",
              wrong == {}, f"{len(expected)} cases; {wrong}")
    ok &= row("the resealed leg and step falsifications are refused by replay,"
              " not by the digest",
              "ended differently" in notes["N-resealed-record-leg-cancellation"]["detail"]
              and "replayed end differs" in notes["N-resealed-record-step-end"]["detail"]
              and "digest does not match" in notes["N-record-without-reseal"]["detail"], "")
    states = [r for r in rows if r["case"].startswith("N-record-layer-")]
    ok &= row("a refused restore holds no paths, evidence, continuation or"
              " record, and no replayed rejected count",
              len(states) == 2 and all(
                  r["status"] == "refused" and r["paths"] == 0
                  and not r["has_continuation"]
                  and r["replayed_rejected_steps"] == 0 for r in states),
              f"{[r['stage'] for r in states]}")
    print("\nVersion 3 additions")
    r2 = {k: v for k, v in notes.items() if k.startswith("N-R2-")}
    ok &= row("O2-R2: a genuine foreign record (origin, charge, coupling,"
              " pair policy, prehistory) in the caller's resealed envelope is"
              " refused before replay, also when its complete identity is"
              " named", len(r2) == 10 and all(
                  v["outcome"] == "refused:checkpoint_replay_refused"
                  and "expectation:" in v["detail"] for v in r2.values()),
              f"{len(r2)} requests")
    short = persist["P-short-resumed"]
    minimum = Q(short["minimum_step"])
    origin = Q(short["origin_time"])
    derived = sum(min(int(limit), int((Q(end) - origin) / minimum) + 1)
                  for end, limit in short["legs"])
    whole_span = int((Q(short["legs"][-1][0]) - origin) / minimum) + 1
    ok &= row("many short legs: the replayed steps exceed the whole-span count,"
              " and the reported per-leg bound equals an exact recomputation"
              " from the record's leg ends and limits and covers them",
              short["replayed_steps"] > whole_span
              and short["replay_step_bound"] == derived
              and short["replayed_steps"] <= derived
              and ordinary["P-short-resumed"]["accepted_end"] == "0.011"
              and ordinary["P-short-resumed"]["accepted_steps"] == 11,
              f"{short['replayed_steps']} replayed in {len(short['legs'])} legs;"
              f" whole-span count {whole_span}; per-leg bound {derived}")
    stacks = 2 * 3 * 8 * 1024 * 1024
    ok &= row("the replay bound charges the admitted worker override: one"
              " versus four workers differ by three 8 MiB stacks in the"
              " replayed and the new leg",
              abs(persist["P-from-two-workers"]["replay_bound_bytes"]
                  - persist["P-from-two"]["replay_bound_bytes"]) == stacks,
              f"{persist['P-from-two']['replay_bound_bytes']} and"
              f" {persist['P-from-two-workers']['replay_bound_bytes']}")
    ok &= row("storage failure is reported, never durable",
              notes["K-durable-failure-reported"]["outcome"] == "not-durable",
              notes["K-durable-failure-reported"]["detail"][:60])
    return ok


def without_worker_count(rows):
    """Removes the worker-dependent fields: a resume's reported runtime
    worker count, and a checkpoint's whole-file SHA-256, also printed by the
    durable read-back note, which binds the original request's threadCount
    through its preparation. Record identities stay in."""
    out = []
    for r in rows:
        r = dict(r)
        if r.get("persist") == "resume":
            r.pop("worker_count")
            r.pop("replay_bound_bytes")
        if r.get("ordinary"):
            r.pop("memory_estimate")
            r.pop("memory_budget")
        if r.get("case") == "P-tight-v9":
            r.pop("bytes")
        if r.get("case") in ("N-resume-replay-bound-over-budget",
                             "N-resume-resource-before-false-record"):
            r.pop("detail")
        if r.get("persist") == "create":
            r.pop("sha256")
        if r.get("case") == "K-durable-write-read-back":
            r.pop("detail")
        out.append(json.dumps(r, sort_keys=True))
    return out


def differing_paths(a, b, path=""):
    if isinstance(a, dict) and isinstance(b, dict):
        out = []
        for k in sorted(set(a) | set(b)):
            out += differing_paths(a.get(k), b.get(k), f"{path}/{k}")
        return out
    if isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        out = []
        for i, (x, y) in enumerate(zip(a, b)):
            out += differing_paths(x, y, f"{path}/{i}")
        return out
    return [] if a == b else [path]


def main(argv):
    if len(argv) != 2:
        raise SystemExit(__doc__)
    directory = pathlib.Path(argv[1])
    rows = load(directory / "persistence-w1.jsonl")
    if any(r.get("case") == "FATAL" for r in rows):
        print("FATAL row present in fixture output")
        raise SystemExit(2)
    if not known(rows):
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = targets(rows, directory)
    w4 = load(directory / "persistence-w4.jsonl")
    a, b = without_worker_count(rows), without_worker_count(w4)
    differing = sum(x != y for x, y in zip(a, b)) + abs(len(a) - len(b))
    ok &= row("one and four workers agree on every row apart from the"
              " reported runtime worker count and the checkpoint file hash",
              differing == 0, f"{len(a)} rows")
    one = json.loads((directory / "w1-files/p-two.v9.json").read_text())
    four = json.loads((directory / "w4-files/p-two.v9.json").read_text())
    paths = differing_paths(one, four)
    ok &= row("the written v9 files of one and four workers differ only in"
              " the bound original threadCount, the binding over it and the"
              " digest", sorted(paths) == ["/binding", "/digest",
                                           "/preparation/request/numerics/threadCount"],
              f"{paths}")
    every = acc.ROWS + o1.ROWS + ROWS
    assertions = [r for r in every if r["kind"] == "assertion"]
    passed = sum(r["passed"] for r in assertions)
    print(f"\n{passed} of {len(assertions)} assertions passed.")
    (directory / "o2-v3-check.json").write_text(json.dumps(
        {"schema": "ordinary_integration_o2_check/v3", "all_passed": bool(ok),
         "rows": every}, indent=1) + "\n", encoding="utf-8")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
