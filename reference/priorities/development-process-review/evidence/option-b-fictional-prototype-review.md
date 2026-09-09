# Option B fictional prototype: walkthrough and review

Reviewed on September 8, 2026. This is a feasibility demonstration using invented arithmetic only. The review read the delivered implementation and reran its read-only commands with the shared Architrino Python interpreter and scratch-local dependencies. Additional negative cases modified Python objects in memory only. No prototype, project, shared environment, or Git state was edited by this review.

## Walkthrough

The scratch example is at `/private/tmp/option-b-fictional.34OFBx`. Markdown contains the invented arithmetic; JSON-LD records identify six objects and their declared dependencies; a bundled context defines the vocabulary. Git retains source, records, context, and a receipt together in two snapshots. RDFLib follows the recorded dependency links.

The earlier snapshot uses `y = 2 * x`; the current snapshot uses `y = 3 * x`. The calculation's declared dependency on the derivation was deliberately removed in the second snapshot. This invented edit makes the query results distinguishable without implying a mathematical discovery.

| Question or check | Result measured during review |
| --- | --- |
| Known-case preflight | `run.sh selftest` passed before target checks. |
| What depends on the derivation now? | `run.sh query --object derivation` returned `[]`. |
| What depended on it earlier? | `run.sh query --ref HEAD~1 --object derivation` returned calculation, check, and result. |
| Can the earlier equation be recovered? | `run.sh source --ref HEAD~1 --object equation` returned `y = 2 * x`. |
| Does the current calculation pass? | `run.sh validate --object equation` executed inputs 0, 1, 4, and 7, producing 0, 3, 12, and 21, matching repeated addition. |
| Is an equation edit without a record update rejected? | An in-memory change to `y = 4 * x` was rejected as a stale source association. |
| Is a duplicate identity rejected? | An in-memory duplicate record was rejected. |
| Can punctuation outside selected blocks change? | An in-memory punctuation edit passed the gate and changed its full-source digest. |

Commands above use the full prefix `/private/tmp/option-b-fictional.34OFBx/`. Read-only Git inspection confirmed the two reported commit identifiers, an empty scratch status, and no configured remote. The commits were `d13e22e70e1318def11b4e11f23198cf4ff2747d` and `9ff47d0ace87d5edd2c01c46c1e2eb30a5137984`.

Repeated addition supplies a distinct arithmetic reference for multiplication on the exercised nonnegative integers. These finite checks establish the demonstrated behavior, not a general verification of mathematical claims or completeness of the dependency network.

## Findings and schema discrepancies

1. **Queries do not enforce freshness.** The command dispatch calls `dependents` without calling `validate`. An in-memory record with a deliberately stale equation digest still returned equation dependents; validation of the same records rejected it. Before relying on a query as current, validate the selected snapshot or explicitly label the result as an unchecked declared network. This is an executable gap relative to the requirement that stale records not silently appear current.

2. **Receipt digests do not uniformly mean exact file bytes.** The implementation hashes sorted JSON serialization of the parsed records and the inner context object. Direct comparisons with the stored JSON-LD file digests were false. Source loading also uses decoded text, and committed-file loading strips leading/trailing whitespace. Section B.5 of the design owner describes exact source, record, and context digests; it should distinguish these normalized representations from file-byte identities, or the implementation should bind raw bytes. The documentation owner remains responsible for that clarification; this review did not edit the shared guide.

3. **The arithmetic check does not validate the recorded result.** In memory, changing the result to 999 and refreshing its block digest still produced a passing gate. The check exercises the equation, while source digests establish correspondence with recorded text. This matches the README's stated limited coverage, but a pass must not be presented as verification of the derivation, calculation prose, or result record.

The remaining limits are explicit in the delivered README: incomplete field validation, no checker implementation or complete environment binding in the receipt, no external publication consumer, no proof of dependency completeness, and no actual merge-conflict or Git-object-loss recovery test. The retention report describes deleting an expendable exported copy while keeping Git history; this review reran historical retrieval but did not repeat that deletion.

These are measured findings from the delivered code and bounded in-memory probes. They can be overturned by changing the relevant execution paths and rerunning the same counterexamples. No production readiness, adoption, migration, scalability, or cost conclusion follows from this prototype.

## Recommended continuation

Keep the next iteration fictitious. First enforce freshness on queries and settle the exact digest contract. Then add explicit coverage for recorded results if that is intended, plus negative cases for field types, revisions, omitted relationships, and receipt checker/environment binding. Preserve the existing snapshots as the reviewed baseline.
