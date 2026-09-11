# OPS-024 analytical calibration prerequisites review

Date: 2026-09-10. Status: **review only; no acceptance, retirement, or execution decision**. Scope: OPS-024 item 5, the Braid Program calibration prerequisite retained after the methodology review. The inspected checkout reported `84b156643f2280418f232ea4d414c5baf5c2bbf0` by `git rev-parse HEAD` and Node `v26.3.0` by `node --version`.

The remaining choice is whether any current decision still needs a calibrated compact analytical screen. If that route is retained, it needs an explicitly selected source composition, independently adjudicated evidence, and a defensible fresh population. A source hash refresh supplies none of those scientific inputs. This review recommends resolving the route's purpose before further preparation; it does not change any owner, queue, hash, threshold, test, scientific record, or generated output.

## Current methodology and frozen composition

The existing named methodology test passes, including rejection of a changed methodology byte and a wrong review token, under the first command in the verification section. `shasum -a 256` reproduces the [coverage contract](../../../../src/prescribed-path-analysis/analytical-measure-coverage.v2.json)'s methodology digest `611b89ce6a099571a54acbf76730925a9238438754c0f7c2c61419cfa3ee83bc`. The contract names the September 8 statement review, which preserves all 29 measure definitions and gates in the [semantic closeout](../../development-process-review/analysis/semantic-closeout-review.md#g9-methodology-impact). This is current admission evidence, not numerical acceptance of a calibration campaign.

The second focused test command passes both uninstantiated-V2 guards and fails the frozen implementation assertion. The full-protocol digest, compact-protocol digest, and normalized field speed assertions preceding that failure pass. The measured implementation comparison is:

| Object | SHA-256 |
| --- | --- |
| Frozen V2 expectation | `7cceed6734253268c47ec53bfa81fcd204a9db626816825ff0e78b657dd47c65` |
| Current declared composition | `c03cdbd37165368d04f92bd90882143b02eaa29eaf6198f6d7a19a7aca0cfdb8` |

Direct inspection of the [calibration runner](../../../../scripts/eom/run-coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.mjs), especially `IMPLEMENTATION_FILES` and `implementationIdentity()`, shows that this digest hashes an ordered JSON list of seven path/digest pairs. It excludes the calibration runner itself, transitive dependencies, and runtime; runtime and platform are separate reported fields. Some other inputs have separate checks. This digest alone therefore cannot authenticate the full executable dependency set. Direct `nl`/`rg` comparison of `TARGET_CONFIGURATIONS` with the [current registry](../../../../src/prescribed-path-analysis/campaigns/all-candidate-analytical-campaign.registry.v2.json) confirms that both target source slugs and exact reference identity pairs still agree; that comparison does not establish a sampled population.

The source-history audit first passed the known SHA-256 `abc` control, then applied the runner's declared composition recipe to files read with `git show`. At `897fe1aa7`, where `git log --all -S` and its introduction diff locate the frozen V2 expectation, the committed composition already hashes to `f82d36aa8eefc94d5a59e3f4efc219f3d41fb25b8efe1e335c521a6ec89b9599`. It has that same value at `00710092e^`, and becomes the current `c03cdbd3…` at `00710092e`. The original matching preimage for `7cceed67…` remains unresolved within this inspected history; this review does not attribute its origin to the last editor.

`git diff 00710092e^ 00710092e --` over the seven declared paths changes only the prescribed-record generator. The change advances its emitter identifier from V3 to V5 and adds display-record numeric canonicalization and carriers. Source inspection shows that calibration uses `createPrescribedBraidExactSourceRecord`, which includes the emitter identifier in the subsequently hashed exact source; the display coefficient-rounding path is separate. Thus this is an identity-relevant source transition. This review establishes neither an acceleration change nor scientific invalidity, and does not classify the mismatch as documentation-only.

## Three distinct populations

The [V1 closeout](2026-07-24-three-axis-circular-coincident-midpoints-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-calibration-v1-closeout.md) and direct reads of the retained artifact distinguish the following objects:

| Population | Recorded purpose and present limitation |
| --- | --- |
| Historical V1 census: 693 draws, 45 campaign files | Diagnostic comparison under the sealed V1 identities. Its 673 jointly evaluated rows all reject; there are zero full-protocol passes. |
| Historical 172-row adjudication subset | Selected V1 rows requiring complete raw packets and separately authored independent acceptance. The retained artifact declares both `independentAcceptancePerformed: false` and `separatelyRetainedPacketsCreated: false`. These selected rows are not a blind V2 sample. |
| Uninstantiated factual V2 population | The current runner declares 660 draws, 44 campaign files, 24 shards, and 20 configurations with 33 draws each. These are code expectations, not evidence that a population was produced or scientifically accepted. |

The conditional false-negative rate asks how often compact evaluation rejects among jointly evaluated full-protocol passes. With no such passes, that denominator is zero; the error rate is unidentified, not measured as zero. The analogous false-positive denominator is also zero in V1. This derived conclusion follows directly from the retained confusion counts and explains why intact historical records cannot establish compact-screen reliability.

The closeout requires a separately receipted V2 population fixed before scoring, with a declared sampling measure, positive and negative controls, exact configuration breadth, conditional denominators, non-evaluation treatment, and stop rules. Rows used to discover positive-support regions cannot also be blind calibration rows. If the historical adjudication produces no independently accepted rows, a separately justified population-design study must establish full-resolution positive support first.

Inspection of the current runner's `assessSufficiency()` preserves the minimum 59 jointly evaluated full passes, 11 source configurations, the 5% false-negative and 10% false-positive upper bounds, and the 5% non-evaluation limits. It requires passes in both target configurations and counts gate-disagreement breadth by factual source configuration; V1 used historical geometric strata. A new factual packet must explicitly reconcile this design with its intended population. Neither the old packet nor the placeholder count of 660 performs that review. No requirement is changed here.

## Retained bytes and missing authentication

`shasum -a 256` reproduced the recorded hashes of the following two retained local files:

| Retained object | Measured SHA-256 |
| --- | --- |
| `.local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/final-sweep-analyzer-receipt.v1.json` | `7ab3eda7a567b72ac073aa23d45e07072d25840d4e9643a25ead65ce791e71f6` |
| `.local-data/braid-analysis/resolution-calibration/a1-3-c5-and-full-taxonomy-v1.json` | `b6bd0c928c2269efb7b74c34b76c0973bd613c1b43d1b6c0001300be1b321738` |

A read-only Node manifest auditor compared each receipt-named file's SHA-256 and byte length with `fileSha256` and `fileBytes`. Before the target, it correctly classified the known `abc` digest/three-byte case, a wrong digest, and a missing file. It then matched all 45 manifest rows with no defects. This authenticates those retained bytes and sizes against the sealed manifest. It does not reconstruct internal campaign/case hashes, recover the historical executable environment, independently check numerical results, or perform the 172-row adjudication.

Direct `test -e` checks find no declared `.local-data/braid-analysis/compact-monte-carlo/configuration-sweep-v2/` directory or its `final-sweep-analyzer-receipt.v2.json`, and no declared `.local-data/braid-analysis/resolution-calibration/coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-v2.json` output. The supplied [protocol document](../campaigns/three-axis-circular-coincident-midpoints-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-and-coverage-calibration-protocol.md) explicitly remains historical V1. The runner declares `RECEIPT_SHA256 = null`, `DEFAULT_PACKET = null`, and rejects before reading a packet. A scoped `rg --files -uuu .local-data/braid-analysis` search finds older files named `full-taxonomy-calibration-v2.json` and `v3.json`; inspection of their headers identifies V1 schema and historical sampling, so their filename suffixes do not supply factual V2 evidence.

If retained, the next authentication burden is a separately accepted adjudication packet binding every original selected row and reason, exact implementation/protocol identities, an independent reference, complete raw and compressed hashes, gate reconstruction, explicit failed/not-evaluated results, a resumable journal, and raw storage that survives database replacement. A fixed cost pilot belongs to that accepted packet. Replaying a producer can check repeatability; it cannot provide independent correctness evidence. Only after the population-design obligations are resolved can a fresh terminal V2 receipt and factual calibration packet instantiate the later paired campaign.

## Route decision and F5/F6 boundaries

Direct inspection of [BP-007](../work-queue.md#bp-007--421-coincident-midpoint--co-rotating-two-planar-braid-adjudication) finds an optional, deferred/blocked route whose completion condition permits accepted preparation or explicit retirement. The [current candidate registry](../configurations/candidate-registry.md#admitted-candidates) records independent H1/H2 admission for both targets and scoped prescribed H3 closure for the co-rotating two-planar-braid target. Here H2 concerns prescribed-history admissibility, and H3 concerns causal-root coverage. The unchanged 4:2:1 history still needs a method covering its actual root regime; choosing a slower history is a separate freeze and H2 reconfirmation. Those obligations do not become compact-screen calibration claims.

Reading [BP-018 and BP-019](../work-queue.md#bp-018--f5-current-generation-ordinary-eom-regeneration) shows distinct current-generation campaigns: F5 must resolve its configuration-versus-fixture contract and produce its declared ordinary-EOM horizon or a measured fail-closed result; F6c must cover all 160 cells, the complete declared interval, M05/M06, and three refinement rungs. Both require fresh identities and independent numerical/operational review. The [cleanup receipt](2026-09-10-f5-f6-current-generation-regeneration-cleanup.md) retains calibration evidence outside its superseded payload scope. These actions neither instantiate V2 nor retire BP-007.

**Smallest operator decision:** identify whether a named current decision will rely on compact-screen calibration. Recommendation: explicitly retire the optional route if there is no such consumer, preserving V1's insufficient verdict and all historical evidence. The inspected BP-007 owner offers retirement but does not record its adoption. Retirement would resolve the need to pursue calibration; it would not establish screen reliability. Any associated disposition of the active executable/test expectation requires separately authorized owner work, not a silent repin. Deferral alone leaves the prerequisite open.

If calibration remains needed, name that consumer and intended population, then select either recovery of the exact frozen source preimage or a new versioned composition with new paired evidence. The next evidence is the reviewed adjudication/population-design packet and its independent reference and measured pilot, followed by the separately authenticated factual V2 inputs. No scientific campaign is selected by this review. OPS-024 item 5 therefore has a concrete decision and evidence path, but is not accepted or closed here.

## Verification and falsifiers

The following existing tests were run without a scientific campaign:

```bash
node --test --test-name-pattern='^methodology coverage is exact and a methodology byte change does not advance$' tests/all-candidate-analytical-rebuild.test.js

node --test --test-name-pattern='^(v2 exact-configuration calibration remains fail-closed|the sealed v1 priority packet cannot be rebound|current producer, full protocol, and coverage protocol match frozen identities)' tests/coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.test.js
```

The first selection passes 1/1; the second passes 2/3 with the exact frozen-composition mismatch reported above. This is a bounded contract result, not an overall test-health verdict. Source and retained-byte findings are measured by the named inspection/hash instruments; population sufficiency reasoning is derived from the recorded denominators; route retirement is a recommendation, not an adopted decision.

An archived manifest reproducing `7cceed67…` would resolve the missing preimage. Changed methodology bytes or a failing named admission test would reopen the current-admission finding. A mismatching retained file would overturn the corresponding byte-integrity result. Authenticated independent adjudication or a terminal factual V2 receipt and accepted packet would supersede the corresponding missing-evidence disposition. A named live calibration consumer or explicit operator retirement decision would settle route necessity. None of these observations, alone, establishes balance, persistence, stability, binding, score, or physical realization.
