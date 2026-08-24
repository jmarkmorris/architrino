# A1.3/C5 Resolution and Coverage Calibration V1 Closeout

Date: 2026-07-24

Status: completed diagnostic campaign; calibration insufficient

Authority: the sealed V1 protocol and its receipt-bound final artifact

## Identity audit

| Bound object | SHA-256 or result hash |
| --- | --- |
| Final sweep analyzer receipt | `7ab3eda7a567b72ac073aa23d45e07072d25840d4e9643a25ead65ce791e71f6` |
| Sealed V1 protocol packet | `02ba64121279d157bc3803ca61152754adb172abc002e71c282c68249eb384e1` |
| Frozen implementation | `d6d9b8e99ebde7321df69522ae014a8366919c644c34424a03478e42b4e021f9` |
| Compact coverage protocol | `6fd0490db0cce13732a4483082a836480a6e91f18679c69f37faca2491f3e2db` |
| Full analytical protocol | `28de1f3583d6e8af5a95ded454643f56ce4dbc4d4fa0fa0a0b99a7ea9fcb93b8` |
| Final artifact bytes | `b6bd0c928c2269efb7b74c34b76c0973bd613c1b43d1b6c0001300be1b321738` |
| Final artifact `resultHash` | `af27058b00103ab9e9c2ab0f7784def308705c7818ef6c41b1b11b1818c05a1f` |

Plainly: these identities fix which inputs, rules, implementation, and output this closeout describes. Changing any of them creates a different campaign rather than revising V1.

The final artifact is `.local-data/braid-analysis/resolution-calibration/a1-3-c5-and-full-taxonomy-v1.json`. Its byte count is `79,476,657`. The sealed protocol remains unchanged; this closeout records the outcome without rewriting the packet that governed it.

Plainly: V1 is closed by preserving its original contract and pointing to the exact output bytes, not by editing the contract after seeing the result.

## Measured V1 result

The retained population contains `693` unique draws from `45` distinct campaign files: `24` shard files and `21` member files. It retains `674` evaluated compact rows and `19` null-score rows with their non-evaluation reasons. Campaign and case identities remain distinct; no synthetic merged campaign was created.

Plainly: every draw is still present, including failures and rows that could not be scored.

Among `673` jointly evaluated compact-versus-full-protocol rows, the diagnostic confusion counts were:

| Classification | Count |
| --- | ---: |
| Both pass | 0 |
| Both reject | 673 |
| Coverage false negative | 0 |
| Coverage false positive | 0 |
| Compact not evaluated, full evaluated | 1 |
| Full not evaluated, compact evaluated | 1 |
| Neither evaluated | 18 |

Plainly: zero observed disagreements at the final pass/reject level does not calibrate the compact screen. Because the full-protocol side had zero passes, both false-negative and false-positive denominators are zero, so neither error rate nor its required confidence bound exists.

Here `full-protocol` names V1's diagnostic evaluation under the full analytical protocol. It is not separately retained full-resolution evidence and it did not undergo independent acceptance; the artifact records both facts explicitly.

Plainly: V1 compared two analytical diagnostic paths. It did not convert either path into independently accepted evidence.

The predeclared sufficiency checks failed on the minimum of `59` joint full passes, three-family pass breadth, at least `11` member passes, both conditional error bounds, and the gate-disagreement rule. The compact and full non-evaluation rates both passed their five-percent limits at `19/693 = 0.027417...`.

Plainly: V1 established that the two diagnostic paths mostly reject together and that non-evaluation was uncommon. It did not establish how reliably the compact screen recognizes full-resolution passes.

Gate-level disagreements were measured on `673` jointly evaluated rows:

| Gate | Disagreements | Rate | Family breadth |
| --- | ---: | ---: | --- |
| Fixed internal, primary | 36 | 5.349% | A, B, C |
| Fixed internal, refined | 23 | 3.418% | A, B, C |
| Moving receiver, primary | 28 | 4.160% | A, B, C |
| Moving receiver, refined | 18 | 2.675% | A, B, C |

Plainly: even where both paths reached the same final rejection, they did not always agree on why. Those differences require full adjudication rather than a claim of compact-screen reliability.

The complete `66`-row A1.3/C5 ladder finished under the sealed `R0`-`R2` root tiers and `S0`-`S2` surface levels. Its final dispositions were:

| Member | Invalidated | Root-resolution unresolved | Surface-resolution unresolved |
| --- | ---: | ---: | ---: |
| A1.3 | 3 | 18 | 12 |
| C5 | 2 | 15 | 16 |
| Total | 5 | 33 | 28 |

Plainly: all 66 requested ladder rows were accounted for, but none reached a resolved pass or rejection that licenses changing a gate. The unresolved and invalidated classifications are the result.

The artifact retains the exact compact, full-protocol, and targeted-ladder failure records, including stages, error names, messages, details hashes where present, failed gates, measured changes, and thresholds.

Plainly: the summary counts do not erase or replace the row-level reasons.

Measured campaign cost was `2,300.087` coordinator wall seconds with four workers, `32,580.847` aggregate full-protocol case wall seconds, `7,214.407` aggregate targeted-surface wall seconds, and a maximum observed process lifetime RSS of `1,561,648` KiB. The final artifact occupies `79,476,657` bytes.

Plainly: these are V1 measurements only. They do not measure the runtime or storage of the separate 172-row independent-adjudication campaign.

## Verdict and claim boundary

**Measured diagnostic verdict:** `calibration-insufficient`.

**Derived sufficiency conclusion:** the predeclared calibration conditions cannot be satisfied because there are no joint full passes and therefore no conditional error-rate denominators. This is not evidence that the compact screen is accurate or inaccurate on passing rows.

**Falsifier:** this closeout is invalid if any bound hash fails to reproduce, if the artifact does not contain all `693` draws and all `66` ladder rows, if its confusion inventory differs from the counts above, or if an independent audit finds that a predeclared sufficiency condition was evaluated incorrectly.

Plainly: the campaign answered whether V1 was adequate for calibration. Its answer was no. It did not answer whether any prescribed configuration is a stable or physical assembly.

No stability, retention, binding, energy closure, quantization, particle identity, catalog acceptance, or physical realization is established. No path was evolved and the EOM solver was not invoked.

Plainly: all results concern analytical consequences of prescribed paths and the behavior of the diagnostic instruments.

## Next burden: independent adjudication of 172 rows

The V1 artifact retains a `172`-row queue. Queue triggers overlap and comprise `42` boundary-stress selections, `36` deterministic five-percent concordant both-reject audits, `19` `full-resolution-not-evaluated` rows, and gate disagreements of `36`, `23`, `28`, and `18` rows for the four gates listed above. The artifact explicitly records `independentAcceptancePerformed: false` and `separatelyRetainedPacketsCreated: false`.

Plainly: V1 selected the cases that need stronger review, but it did not perform that review.

The 172-row campaign must be separately predeclared before its first evaluation. Its packet must:

1. bind the V1 artifact byte hash and `resultHash`, all 172 original campaign/case identities, every selection reason, the frozen implementation, the full protocol, `fieldSpeed = 1`, and the separately authored independent acceptance instrument;
2. retain complete raw packets and all non-evaluation reasons, verify raw and compressed hashes, and independently reconstruct acceptance gates from raw ledgers;
3. classify every queued row as independently accepted, independently rejected, or not evaluated with an exact failure record;
4. use a resumable, integrity-checked journal and content-addressed raw storage so a disposable database can be purged and rebuilt without silently losing adjudication evidence;
5. stop on receipt, implementation, protocol, field-speed, queue, raw-packet, or independent-instrument drift; and
6. forbid gate or threshold relaxation after any result is observed.

Plainly: database deletion is operationally acceptable only if the immutable raw evidence and rebuild manifest survive, or if the operator knowingly accepts the cost of recomputation. A database row alone is not the evidence.

The full 172-row execution is not part of V1 and has not begun under this closeout. Resource authorization should follow a fixed pilot that measures per-row runtime and retained storage under the exact adjudication packet.

Plainly: the next campaign needs its own sealed rules and a measured cost boundary before committing to the entire queue.

## Conditional V2 calibration route

V2 is warranted only if compact-screen calibration remains decision-relevant after independent adjudication. It must be a new, separately receipted population fixed before scoring. Rows used to discover or construct positive-support regions must not also serve as blind V2 calibration rows.

Plainly: V2 may learn where passes are possible from prior independent work, but it must test its calibration claims on new, predeclared draws.

Before launch, V2 must specify its population, sampling measure, positive and negative controls, member/family breadth, confusion denominators, minimum statistical requirements, stop rules, and treatment of non-evaluation. It may not weaken V1 gates or error thresholds merely to obtain a favorable verdict. If the 172-row adjudication yields no independently accepted rows, V2 remains blocked until a separately justified population-design study demonstrates full-resolution positive support.

Plainly: a second all-reject population would repeat the V1 limitation. V2 needs a defensible way to include genuinely pass-capable regions without choosing its test rows after seeing their answers.

**Methodological claim grade:** inferred from the zero-denominator result and the independence requirement.

**Falsifier:** replace this routing if an independently reviewed design can estimate both conditional error rates without full-resolution passes, or if the 172-row adjudication establishes that compact calibration is no longer useful for any live decision.

## Closure

V1 is complete as a diagnostic campaign and closed with an insufficient calibration verdict. No additional V1 draws, ladder rows, gate changes, or artifact rewrites are authorized. The next evidence-producing burden is the separately predeclared independent adjudication of all 172 queued rows. V2 is a conditional later campaign, not a continuation or repair of V1.
