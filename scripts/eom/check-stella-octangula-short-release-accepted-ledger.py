#!/usr/bin/env python3

import argparse
import importlib.util
import json
from pathlib import Path


HERE = Path(__file__).resolve().parent
BASE_PATH = HERE / "check-stella-octangula-short-release.py"
SCHEMA = "braid-program/stella-octangula-short-eom-release-independent-check.v2"


def load_base():
    spec = importlib.util.spec_from_file_location("stella_short_release_base_check", BASE_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def accepted_step_ledger(response):
    rows = response.get("stepFailures", [])
    nonaccepted = [
        row for row in rows
        if row.get("status") != "accepted" or row.get("failureCode") not in (None, "")
    ]
    root_rows = [root for row in rows for root in row.get("rootAccounting", [])]
    incomplete_roots = [root for root in root_rows if root.get("status") != "certified_complete"]
    traversal_complete = all(
        row.get("traversalCoverageDisjointComplete") is True and
        row.get("traversalUnresolvedPairs") == 0 and
        row.get("traversalLogicalPairs") == 64 and
        row.get("traversalExactPairs") == 64
        for row in rows
    )
    return {
        "fieldName": "stepFailures",
        "semanticInterpretation": "accepted-and-rejected-step-ledger",
        "ledgerRowCount": len(rows),
        "acceptedStepCount": response.get("acceptedStepCount"),
        "rejectedStepCount": response.get("rejectedStepCount"),
        "nonacceptedLedgerRowCount": len(nonaccepted),
        "rootCertificateRowCount": len(root_rows),
        "incompleteRootCertificateRowCount": len(incomplete_roots),
        "traversalComplete": traversal_complete,
        "passed": (
            response.get("status") == "completed" and
            response.get("rejectedStepCount") == 0 and
            len(rows) == response.get("acceptedStepCount") and
            not nonaccepted and
            len(root_rows) == 64 * len(rows) and
            not incomplete_roots and
            traversal_complete
        ),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--predeclaration", required=True, type=Path)
    parser.add_argument("--run-summary", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    if args.out.exists():
        raise ValueError("output already exists")

    base = load_base()
    result = base.check_run(args.predeclaration, args.run_summary)
    run = json.loads(args.run_summary.read_text(encoding="utf-8"))
    ledgers = {}
    for rung in run["rungs"]:
        response_path = Path(rung["response"]["path"])
        response = json.loads(response_path.read_text(encoding="utf-8"))
        ledgers[rung["rung"]["id"]] = accepted_step_ledger(response)

    result["schema"] = SCHEMA
    result["supersedesOnly"] = {
        "check": "primaryHasNoStepFailures",
        "reason": "The native response field stepFailures is an accepted-and-rejected step ledger; accepted rows have status=accepted and an empty failureCode.",
    }
    result["acceptedStepLedgers"] = ledgers
    result["audits"]["fine"]["actualFailureCount"] = ledgers["fine"]["nonacceptedLedgerRowCount"]
    result["audits"]["medium"]["actualFailureCount"] = ledgers["medium"]["nonacceptedLedgerRowCount"]
    if "coarse" in result["audits"]:
        result["audits"]["coarse"]["actualFailureCount"] = ledgers["coarse"]["nonacceptedLedgerRowCount"]
    result["checks"]["primaryHasNoStepFailures"] = ledgers["fine"]["passed"]
    result["accepted"] = all(result["checks"].values())
    args.out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"out": str(args.out), "accepted": result["accepted"]}))


if __name__ == "__main__":
    main()
