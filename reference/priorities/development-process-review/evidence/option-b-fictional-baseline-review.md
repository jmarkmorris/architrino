# Fictional graph review against a fixed baseline

The added report preserves the modeled A review boundary: every candidate file-byte change requires review. B adds a readable list of changed objects, relationship additions/removals, and affected declared dependents. Refreshing hashes or writing an approval label cannot approve a candidate.

The explicitly designated fictional baseline is `9ff47d0ace87d5edd2c01c46c1e2eb30a5137984`. The command requires the full commit ID, resolves it exactly, and records baseline and candidate file digests. This designation is an input to the experiment, not evidence that an authorized human reviewed that commit. Both snapshots must pass consistency validation before graph differences are reported.

| Case | Modeled A file-pin boundary | B with baseline report |
| --- | --- | --- |
| Unchanged snapshot | No byte mismatch | Unchanged relative to baseline; no approval granted |
| Harmless punctuation | Changed bytes require review | Same review requirement; no declared graph changes |
| Delete assumption dependency and refresh metadata | Changed bytes require review | Same requirement; identifies removed edge and downstream objects |
| Change assumption and refresh its digest | Changed bytes require review | Same requirement; displays old/new assumption and affected dependents |
| Add dependency | Changed bytes require review | Same requirement; identifies added edge and downstream objects |

A column follows the bounded pin model from the preceding comparison, not a rerun of production A. The concrete gain is structured review information while retaining the byte-change boundary; this does not establish fewer human review steps or stronger semantic completeness.

## Demonstrated cases

### unchanged

```text
Baseline: 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984
Consistency: pass
Review status: unchanged-relative-to-baseline
Approval: not granted by this tool
Changed files: none
Added relationships: none
Removed relationships: none
Changed objects: none
Affected declared dependents before: none
Affected declared dependents after: none
```

### harmless-prose

```text
Baseline: 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984
Consistency: pass
Review status: review-required
Approval: not granted by this tool
Changed files: source.md
Added relationships: none
Removed relationships: none
Changed objects: none
Affected declared dependents before: none
Affected declared dependents after: none
```

### omitted-dependency

```text
Baseline: 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984
Consistency: pass
Review status: review-required
Approval: not granted by this tool
Changed files: records.jsonld
Added relationships: none
Removed relationships: equation --dependsOn--> assumption
Changed objects: equation (dependencyRevisions, dependsOn)
Affected declared dependents before: calculation, check, derivation, result
Affected declared dependents after: calculation, check, derivation, result
```

### changed-assumption

```text
Baseline: 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984
Consistency: pass
Review status: review-required
Approval: not granted by this tool
Changed files: records.jsonld, source.md
Added relationships: none
Removed relationships: none
Changed objects: assumption (sourceDigest)
Affected declared dependents before: calculation, check, derivation, equation, result
Affected declared dependents after: calculation, check, derivation, equation, result
assumption before: x and multiplier are nonnegative integers.
assumption after: x and multiplier are positive integers.
```

### added-dependency

```text
Baseline: 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984
Consistency: pass
Review status: review-required
Approval: not granted by this tool
Changed files: records.jsonld
Added relationships: calculation --dependsOn--> derivation
Removed relationships: none
Changed objects: calculation (dependencyRevisions, dependsOn)
Affected declared dependents before: check, result
Affected declared dependents after: check, result
```

## Verification and use

Five test methods passed after known-case preflight. They cover independently specified outcomes for five scenarios, explicit baseline identity, stale-candidate rejection, refreshed-hash review requirements, and inability of an edited review label to grant approval. Separate CLI probes confirmed exit 0 for unchanged bytes and exit 2 for a changed historical candidate. Invalid input exits 1. Exit 0 only means unchanged relative to the designated baseline; it does not authenticate baseline approval.

Run the read-only report in the scratch environment:

```bash
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=/private/tmp/option-b-fictional.34OFBx/dependencies "${AAA_VENV:-/Users/markmorris/vibe/.venv}/bin/python" /private/tmp/option-b-fictional.34OFBx/review.py --baseline 9ff47d0ace87d5edd2c01c46c1e2eb30a5137984 --ref working
```

Add `--json` for file digests and structured changes. `test_review.py` reruns the controls and cases; `review-report.json` retains their reports; `review-tests.log` records the test run. All implementation and invented data remain in `/private/tmp/option-b-fictional.34OFBx`. This document is the user-facing report copy.

## Remaining gaps

The tool lists `dependsOn`, `used`, and `generatedBy` edge changes; affected reachability follows declared `dependsOn` paths in both snapshots. It also reports record-field changes and selected source text changes. It cannot discover unrecorded dependencies, prove mathematics, or establish that changing an assumption preserves a claim. Harmless prose still requires review because identifying its semantic harmlessness is not automated. Significant prose outside selected blocks receives a file-change alert but no object-level impact mapping.

There is no approval-writing command, authenticated reviewer, trusted baseline registry, or publication integration. A caller could designate an inappropriate baseline; the full commit ID prevents accidental movement of a symbolic ref but does not establish authority. Existing consistency-only query and validation commands do not become approval gates. This separate comparison command supplies the review-needed signal; adoption would require a trusted consumer, which is outside this fictitious trial.

No production files, shared dependencies, or Git history were changed. No runtime, review-time, or cost advantage was measured. The independently specified cases establish the listed behavior only; a missed edge, omitted changed file, or auto-approval in these cases would falsify the relevant result.
