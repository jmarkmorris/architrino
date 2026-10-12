"""Import adapter: runs the unchanged version 1 qualification against the
version 3 carrier and records an exact rational receipt of every step.

The qualification module, its truth references and the frozen bracket are
imported as they are and are not edited. The adapter replaces only the
module's reference to the carrier, through a recording proxy whose step()
calls the version 3 step() and keeps its exact receipt. It then calls the
qualification's own case functions in the order of its own main(), with the
static known cases first and an exit status of 2 if any of them fails, and
writes results to version 3 paths so no version 1 output is overwritten.

Usage: python <this file> <full-receipts.jsonl> [--long-step-denominator N]
"""
import hashlib
import json
import pathlib
import sys
import types

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import matched_pair_stage_3_validated_far_step_carrier_v3 as v2  # noqa: E402
import matched_pair_stage_3_validated_far_step_qualification as qual  # noqa: E402

RECEIPTS = []
CASE = {"name": "unset"}


def recording_step(*args, **kwargs):
    certificate = v2.step(*args, **kwargs)
    RECEIPTS.append({"case": CASE["name"], "index": len(RECEIPTS),
                     "receipt": v2.receipt(certificate)})
    return certificate


proxy = types.SimpleNamespace(**{name: getattr(v2, name) for name in dir(v2)
                                 if not name.startswith("__")})
proxy.step = recording_step
qual.vfs = proxy


def run(name, function, *args):
    CASE["name"] = name
    return function(*args)


def main(argv):
    if len(argv) < 2:
        raise SystemExit(__doc__)
    full_path = pathlib.Path(argv[1])
    denominator = 256
    if len(argv) == 4 and argv[2] == "--long-step-denominator":
        denominator = int(argv[3])
    print(f"Subject: {v2.__file__} ({v2.SCHEMA})")
    known = run("K1", qual.known_static_axis)
    known &= run("K2", qual.known_static_oblique)
    known &= run("K3", qual.known_truth_bracket)
    if not known:
        print("\nKNOWN CASE FAILED; no target evaluated.")
        raise SystemExit(2)
    print("\nKnown cases passed before any target.")
    ok = run("T1-T2", qual.target_small_and_two_step)
    ok &= run("T4", qual.target_adversarial_step)
    ok &= run("N", qual.negatives)
    ok &= run("T3", qual.target_long_run, denominator)
    passed = sum(r["passed"] for r in qual.RESULTS)
    print(f"\n{passed} of {len(qual.RESULTS)} rows passed.")

    with open(full_path, "w", encoding="utf-8") as handle:
        for row in RECEIPTS:
            handle.write(json.dumps(row, sort_keys=True) + "\n")
    full_digest = hashlib.sha256(full_path.read_bytes()).hexdigest()
    long_run = [r for r in RECEIPTS if r["case"] == "T3"]
    selected = [r for r in RECEIPTS if r["case"] != "T3"]
    selected += long_run[:1] + long_run[-1:]
    (HERE / "matched-pair-stage-3-validated-far-step-v3-qualification.json"
     ).write_text(json.dumps({
         "schema": "validated_far_step_prototype_qualification/v3",
         "subject": v2.SCHEMA, "long_step_denominator": denominator,
         "all_passed": bool(ok), "rows": qual.RESULTS,
         "recorded_quantity_rows": [
             r["check"] for r in qual.RESULTS
             if r["check"] in ("K1 radius growth", "T1 receiver radius growth",
                               "T3 velocity tube contains the whole true bracket",
                               "T3 validated velocity tube versus the solver's"
                               " aliased interval",
                               "T3 largest per-step velocity radius growth")],
     }, indent=1) + "\n", encoding="utf-8")
    (HERE / "matched-pair-stage-3-validated-far-step-v3-receipts.json"
     ).write_text(json.dumps({
         "schema": "validated_far_step_prototype_exact_receipts/v3",
         "note": "Exact rationals as p/q text. Every step receipt of the "
                 "qualification except the interior of the long run, whose "
                 "first and last steps are included; the full set is the "
                 "JSON-lines file identified below.",
         "full_receipt_count": len(RECEIPTS),
         "full_receipts_sha256": full_digest,
         "full_receipts_file": str(full_path),
         "receipts": selected}, indent=1, sort_keys=True) + "\n",
        encoding="utf-8")
    print(f"{len(RECEIPTS)} exact receipts; full set SHA-256 {full_digest}")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv)
