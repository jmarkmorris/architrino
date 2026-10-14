# Persistence Scratch Review: Two Admission Findings

Increment 4 live integration is held for I4-R1 and I4-R2 below. The record/replay design, identity bases and positive generated-history checks remain supported. These are admission and request-binding defects, not evidence of forged generated-history certificates or a failure of the positive true-state cases. Correct the narrow paths and return a versioned scratch packet before live application.

## Bound candidate and positive evidence

**Measured:** `shasum -a 256 -c` verifies the packet manifest, ninety-three scratch source entries and thirty-four output identities. `wc -l` measures fifteen packet manifest entries; the peer entry's thirteen-entry count is stale and should be corrected. The separately measured library is `e4d085eb80cd30dc7a3c7e7d39c2083483d1c6032bc78e8ede137e930304faed`. Bounded reads cover the complete 1117-line record source: canonical serializer/parser, expectation comparison, driver-leg replay, refusal clearing, open/append, reseal and file publication. The [returned receipt](../evidence/matched-pair-stage-3-increment-4-scratch-receipt-2026-10-12.md) attributes its own fixture/checker results to the writer, rather than treating them as independent.

The separately authored [record probe](../evidence/matched-pair-review-stage3-record-probe.cpp) compiles against the bound scratch archive; compiler completion precedes execution. An exact-origin zero-leg known case passes before malformed-origin/control targets. A genuine one-leg append and restore against its complete byte identity, using another worker count, passes and reproduces all original chains before request mutations. Issued evidence and continuation are returned only for that genuine positive run. The initial instrument and outputs are retained; the final version adds one stale-request-evidence target while preserving all prior inputs and known controls. No solver subject was edited by Codex.

The frozen [publication/ledger checker](../evidence/matched-pair-review-stage3-increment1-check.py), adapted only by directory/file selection to include record and worker rows, records its known exact arithmetic/hash controls before targets. It verifies 172 certified evolution attempts/1473 publication axes, exact whole-step slack, extent and publication chains, zero radius-growth violations, the original nine frozen three-path states and both aliasing truths. This preserves positive numerical evidence while the new admission obligations remain open. Raw compiler/probe/arithmetic outputs, original instrument version and adapters remain under `.local-data/eom-matched-pair/2026-10-12/reviewer-targets/`.

## I4-R1: zero-leg replay bypasses the admitted driver domain

Starting from the known canonical exact-origin record with no legs, the independent probe changes one field and reseals the body. Each of these targets returns `status=restored` with three origin paths:

| Target | Mutated field |
| --- | --- |
| Zero minimum step | `minimum_step = "0"` |
| No attempt allowance | `max_attempts_per_step = 0` |
| Invalid charge | First origin charge is `not-a-number` |
| Coupling outside binary64 | Coupling is `1e400` |
| Duplicate identifier | Second origin path identifier repeats the first |

There is no evidence or continuation on these zero-leg results, but the restored-state claim and returned origin/record are not admitted under the actual driver domain. In a record with at least one leg, the real driver would refuse these inputs. The source cause is exact: `restore` constructs an origin with `ValidatedRunRecord::open`, then calls the driver only inside the leg loop. `open` checks exact radii, absence of issued capabilities and terminal time, but not the complete request/identity domain; `record_of_body` supplies only partial controls validation. With zero legs, no actual admission call occurs before returning `restored`.

Validate the complete origin/request domain before every successful restore, including zero legs. Use the actual current driver/producer admission or a common authoritative admission path rather than another partial copy of scalar, grouping and controller rules. Cover finite representable coupling/charges, unique identifiers, common coverage/boundary, step/control domain, policies and disjoint declarations. A failed admission returns no usable state. Preserve valid exact-origin zero-leg behaviour and genuine nonempty records; no positive dummy step is needed. The public record-opening/read contract should match the domain it claims, or explicitly distinguish unadmitted claims-only data from restore success.

Falsifier: the unchanged five targets refuse with cleared usable state after a recorded valid zero-leg known control, while all genuine record/replay cases and ordinary output protection still pass.

## I4-R2: append checks history chains without full request population binding

After the genuine known one-leg certificate is produced, the probe opens a fresh record from its original request and changes only the request passed to `append`:

| Target | Measured result |
| --- | --- |
| Receiver charge changed from `1` to `2` | Append succeeds |
| Receiver path identifier changed | Append succeeds |
| Evidence from the later generated population supplied with the original exact prefix | Append succeeds |
| Field speed changed to `2` | Correctly refused; retained control comparison works |

The source compares request controls, start, continuation pointer, population size and history chains. A history content chain does not bind the request path's identifier or charge. The request's supplied evidence is not checked against its actual input population either. The genuine output certificate is checked against its own sealed continuation and against the record's original identities, so these targets do not create forged output evidence; they show that the input request/certificate pairing is accepted despite its mismatch.

Before append, bind the full supplied request population to the record's accepted input boundary: ordered path identifiers, charges, histories/content chains, coverage and any supplied evidence, together with the existing controls/start/continuation. For an initial exact prefix any supplied evidence still must bind it; for later legs the input evidence must agree with the actual accepted boundary and continuation. Preserve the accepted-step sealed ancestry walk that the writer added, including the different-run refusal. A rejected append must leave the record unchanged. Do not require arbitrary transcript fields to be independently sealed: they remain claims verified by driver-leg replay.

Falsifier: the unchanged charge/identifier/stale-evidence targets refuse without changing the record; the field-speed refusal remains; the genuine known append/restoration and actual continued records still pass.

## Disposition

No live application is released. Claude owns the two narrow corrections and versioned scratch evidence. Preserve this subject and failures, leave the accepted live worker source untouched, and keep existing independent probes/references frozen for reexecution. Correct the manifest count in the next receipt. No ordinary checkpoint/transport change, record trust/authentication expansion, chain optimization, budget looseness or new operator selection is requested. The substantial-work cutoff remains 23:30:23Z and hard closeout 23:50:23Z on October 12.
