# Independent campaign computation census and proof-status handoff

**Measured operational result:** at 2026-10-06 08:21:39 UTC, the [known-tested read-only census](../evidence/authorized-cases-ten-hour-reference-campaign-compute-census.py) found 61 retained leases whose current `owner.task` equals exactly `01a10ebb-fea3-7150-a18f-f0c33c30a2fb` or `authorized-cases-ten-hour-coordinator`. All 61 are terminal and have `processGroupClosed: true`. No selected operational exception remains. This is a lease/supervisor-state result, not a scientific acceptance or a census of unrelated processes.

## Scope, controls and identities

The [known receipt](../evidence/authorized-cases-ten-hour-reference-campaign-compute-census-known.json) was written before target access. Its closed, live and unrelated fixtures test exact owner selection, terminal-status counts, a live process-group exception, and the distinction between a closed failed run and scientific acceptance. A fourth fixture checks that a literal campaign marker under an unrelated owner is reported without broadening the selected set.

The [target receipt](../evidence/authorized-cases-ten-hour-reference-campaign-compute-census-receipt.json) reads 1,552 retained lease files and calls the live supervisor's read-only `status --run-id` for each of the 61 selected IDs. It binds each selected lease file and the supervisor source. No process was signalled, pruned, stopped or repaired by this census. No state-changing reconciliation was requested. The supplementary command/argument scan found no lease containing the literal `authorized-cases-ten-hour` marker outside the two selectors. That finite scan does not establish that no unregistered process or differently named earlier job ever existed.

| Item | SHA-256 |
| --- | --- |
| Census instrument | `ef4f107da49b2f67ca9a99d24d2703e5af25b305f0a4fc103a18b1ca63ce4e57` |
| Known receipt | `f94f62b81e6227d0553187329b7e93e0f86d27479e161373f1c498e627d0716f` |
| Target receipt | `21cd8dc9d49f7ce419ce76371eb54c62d44c5024734ee462b39f8dc35860f075` |
| Supervisor source at census | `4da8f0f9b9f8e156b5cba5123f6ac19e96087d6c53ea2edd0d53fec635054c9b` |
| A's six-lease scoped receipt | `61edc2c916fe2b9eac6cec65d00d0f15636c98426156e6e15a9f12c92cdef463` |

The A receipt is the preserved ignored file `.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/a/own-lease-closeout-v3.json`. All six of its unique IDs occur in the selected census: `06bef7d3-0a29-450d-9ee1-5a8bd0ec06e1`, `58e9fff7-f2c6-481b-91da-59e02f381bfb`, `937ec5fb-a4a2-49e0-97cd-b0e570536614`, `a189e1d0-f03a-43d2-a1b7-51ad1aa6139a`, `b2b0935c-39d4-4c94-b6f1-03e0ff53e2c0`, and `f6bbfe8a-c533-447a-a590-d9031b51a95f`. Each is completed with its group closed. The separately required coordinator scalar lease `83a634b7-7e19-4e30-ba63-9a69eb4e1b95` is likewise completed and closed.

## Status counts and preserved failures

| Current owner | Leases |
| --- | ---: |
| Session owner `01a10ebb-fea3-7150-a18f-f0c33c30a2fb` | 55 |
| `authorized-cases-ten-hour-coordinator` | 6 |
| Total | 61 |

| Terminal status | Count | Interpretation |
| --- | ---: | --- |
| Completed | 45 | Process completion; scientific acceptance remains separately documented. |
| Failed | 12 | Preserved prelaunch, resource-interface, audit-interface or audit-cost failures, classified below. |
| Stopped | 4 | The four E streams deliberately closed after the exact-time-ten certificate was accepted. |

The four E IDs are `13e2ddb1-06a5-4880-b64d-71fc7bfe7c81` (subject residual), `67cdad56-c4ed-4660-86c0-361f3b439d06` (subject propagation), `6168ba99-13e7-41d4-992b-f43fdec45a28` (independent residual), and `47cdc13e-e600-405c-9e70-42098d737a0e` (independent actual-error verifier). Every one is stopped with its process group closed. The [independent E closure](../../braid-program/analysis/authorized-cases-ten-hour-reference-e-compute-closure.md) binds the retained complete prefixes, consumed-byte rehashes and exact faces. The independent residual stream intentionally has no footer after controlled termination; the separate verifier's cooperative footer and prefix receipts establish its consumed boundary. This is not completion through time fifteen. The accepted observation remains [exact time ten](../../braid-program/analysis/authorized-cases-ten-hour-reference-e-time10-acceptance.md).

| Failed lease | Recorded disposition and source |
| --- | --- |
| `9159fd95-0f61-4d01-9383-c12d79768cf7` | Supervisor control-listener `EPERM` before target spawn; the census retains the error and absent start. |
| `3a815f01-d3bf-47c5-8444-001b0ac82014` | Same pretarget control-listener `EPERM`, for the E seam audit; no target started. |
| `549d54a0-609e-4c02-8ade-a0c88fb7f11c` | Unsupported macOS address-space-limit call before trial loading; preserved v3 and separately admitted operational v4, as recorded in the [v4 assessment](../../braid-program/analysis/authorized-cases-ten-hour-reference-e-v4-and-observable-admission.md). |
| `88cf885c-269c-474b-a558-094952785370` | Aligned-checkpoint reference v1 compared a rounded interval endpoint with an exact checkpoint. The [Cartesian assessment](authorized-cases-ten-hour-reference-a-cartesian-adjudication.md) preserves the failed comparison. |
| `e75f5e14-6202-4164-98a7-af4850556fa5` | Aligned-checkpoint reference v2 demanded an unjustified comparison between two different valid lower-bound representations. Later independent v3 accepted the transfer, as recorded in the [transverse assessment](authorized-cases-ten-hour-reference-a-transverse-adjudication.md). |
| `589eda18-df79-4b4c-af6e-eb91581288e6` | Cartesian-checkpoint reference v1 compared a grid-rounded square root against a tighter exact rational bound. The [Cartesian assessment](authorized-cases-ten-hour-reference-a-cartesian-adjudication.md) records the exact squared-norm successor and accepted v2. |
| `c1ae29ae-3311-4b16-9ab5-fb286bf34e5e` | Receiving audit v1's alternate natural interval expression was too wide for a required entry. |
| `b75d18b3-5dc8-4988-8456-cdb6ffceabb1` | Receiving audit v2 imposed unnecessary component lower-face containment after the required complete upper norms passed. |
| `20709a55-e294-4892-95a6-930814b1fb96` | Receiving audit v3's whole-box original-E operator enclosure was too wide. The [receiving assessment](authorized-cases-ten-hour-reference-a-receiving-adjudication.md) preserves all three failures and accepts independently checked v4 without changing the subject bound or history. |
| `d861a0a8-efd7-4c12-a765-fed9aeb63886` | Independent normal-coordinate audit reached its 300-second alarm in direct composition. This is measured method cost, not a polynomial mismatch; the [v2 protocol](authorized-cases-ten-hour-reference-b-normal-audit-v2-protocol.md) and [acceptance](authorized-cases-ten-hour-reference-b-normal-acceptance.md) retain the distinction. |
| `c3ddb9c8-aa23-4bba-b60e-752cefbec3b7` | E pilot reference v1 encountered a negative interval norm-square lower face from an uncollected Hermite representation before emitting a cell. The [v2 protocol](../../braid-program/analysis/authorized-cases-ten-hour-reference-e-pilot-audit-v2-protocol.md) records this audit-method failure. |
| `4267244b-d06e-4aac-aac7-c7a21b5c6ab7` | E seam reference v1 failed on interval-left multiplication of a custom jet after segment zero and before a seam result. The [v2 protocol](../../braid-program/analysis/authorized-cases-ten-hour-reference-e-seam-audit-v2-protocol.md) preserves this implementation failure. |

None of these twelve failed statuses is a physical failure result. Later accepted instruments do not erase the failed records. The census's empty exception list means no selected lease lacks terminal/group closure; it does not erase these historical operational exceptions.

## Proof-status handoff

**Source/status inspection, not new mathematical verification:** the [current synthesis](../../analysis/authorized-cases-ten-hour-codex-investigation.md), read at SHA-256 `890dd8e45faf831dfd3e19bc06b9e0a5015222a40772347bbb3291748ef1ba0f`, names independent assessments for the A–E conclusions it currently uses. The [compact B dependency record](authorized-cases-ten-hour-b-terminal-classification-record.md), SHA-256 `6f2c41d88c6cbe83d201b2ab711fc41f2d877be43588575211d336a3abae62cc`, is governed by its later [adversarial assessment](authorized-cases-ten-hour-reference-b-classification-adversarial.md), despite retaining its original frozen “awaiting” sentence. The initial B allocation's unreviewed finite-map contracts were subsequently assessed through the layer, autonomous, conjugacy, remainder, input/slow-expression and corrected physical-consumer records linked in the current synthesis. Those historical pending labels are not current missing assessments.

| Package | Current independently assessed scope | Boundary that remains open |
| --- | --- | --- |
| A | Fixed-trial improvement, one receiving interval and current-method information obstruction. | First physical event; the declined longer scalar recurrence supplies no premise. |
| B | Quantitative original-family admission, fixed-member finite phase exclusion, subsequent analytical interval/parameter-length/speed refinements. | Possible zero-speed members inside the test-unresolved set; no claimed existence of one. The invalid transverse chart interpretation remains withdrawn. |
| C | Conditional actual-family later-fate alternative, normalized infinite regime and boundary/attained-exit refinements. | Selection of a specified nonzero member's branch; an attained limiting connection is not an actual infinite member. |
| D | Nominal-prefix entry and conditional planar continuation; separate local N02 nonmirror neighborhoods. | Angular-floor persistence, the full spatial neighborhood and historical request/build identity; N02 numerical neighborhood constants remain unevaluated. |
| E | Complete actual-history certificate and square-distance inequality at exact ten. | Later fate, family instability and time-fifteen completion. |

Two additional skeptical reviews remain **pending and unreceived at this handoff**, by the coordinator's current assignment: the coordinator's B regularity audit and D's C-compactness audit. Their conclusions have not been assumed here. The existing accepted records are not represented as having passed those new reviews. Any resulting objection must reopen the corresponding dependencies before final campaign certification. Within the named synthesis and compact B dependency record, this source/status pass identified no further conclusion promoted solely from an unreviewed new candidate; this statement is confined to those records and their explicitly linked assessment dispositions, not every campaign file or an independent repetition of their proofs.

The known-first [document checker](../evidence/authorized-cases-ten-hour-reference-check.mjs) passed both inspected records at 08:25:27 UTC: 110 and 16 link targets respectively, with 174 and 28 mathematical spans. That establishes link-file/anchor existence and KaTeX syntax only. The synthesis still says E computation closure is underway and retains a pending closeout list; the coordinator should replace those operational placeholders using the present census and the existing E closure records, while leaving the two new skeptical reviews pending until received. No shared owner was edited by this handoff.

Falsifiers of the operational result are a changed owner or lease identity, a nonterminal selected supervisor state, a false process-group closure, or a required campaign ID absent from the selected set. A later launch requires a fresh census. This snapshot does not authorize broad process management, unrelated cleanup or any new scientific target.
