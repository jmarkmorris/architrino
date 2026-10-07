# Independent audit of saved interval-cover evidence

## Preparation disposition

**Derived method finding:** the frozen witness refresh preserves the partition and supplies exact binary endpoints for inherited display-only exclusions by replaying the original reviewed evaluator. No mathematical or partition defect was found in that bounded source inspection. Its `complete_exclusion` flag is inherited from the input, however, and can remain true while a limited refresh still has display-only rows. A finished evidence claim must additionally require `remaining_display_only == 0` and independently inspect every final row.

**Measured preparation result:** the independently authored [saved-evidence checker](../evidence/overnight-c-review-cover-audit.py) passed its synthetic positive and malformed-input controls under the shared venv, recorded in [the controls receipt](../evidence/overnight-c-review-cover-controls.json). This was a preparation result, not a final target audit. The active `tight-cover.json` was not read during this preparation. The final disposition below records the subsequent frozen-target audit using a separately versioned memory-bounded checker; the original checker remains unchanged.

This review is a bounded Specialist report under the existing overnight authorization. The parent owns integration and any acceptance disposition. No physical acceptance, stability, larger-domain exclusion, or new equation is asserted.

## Mathematical reference and claim domain

The [original independent method review](overnight-c-interval-method-independent-review.md) reconstructs the logarithmic all-root equation, the circular radial and tangential residuals, the unique ordinary partner root, absence of positive self roots, global delay contraction bounds, and strict-sign exclusion. The [tight-method review](overnight-c-tight-method-independent-review.md) separately establishes the sharper circle-distance derivative bound, the shared-radius antipodal formulas, and intersection of equivalent radial formulas. These derivations, together with their known-first exact controls, remain the mathematical references; this audit does not modify them.

The exact five-coordinate domain is

$$
(r_2,r_3,\omega,\phi_2,\phi_3)\in
[6/5,7/5]\times[8/5,9/5]\times[1/10,1/2]
\times[-22/7,22/7]^2,
$$

with $r_1=1$, $K_{\log}=c_f=1$, complete common-center circular histories, opposite polarities within each antipodal pair, and every ordinary positive-delay root. The phase rectangle contains representatives of every pair of relative phases. The strictly subfield source speeds provide 30 partner roots and no positive self roots throughout this box. For any leaf, one rigorously nonzero component of the necessary six-component circular residual excludes simultaneous circular balance there. A complete partition of excluded leaves would therefore support bounded full-vector exclusion on precisely this domain, conditional on the reviewed interval implementation and its arithmetic behaving as specified.

## Refresh inspection

The read-only subject is [the refresh driver](../evidence/overnight-c-witness-refresh.py), SHA-256 `8d0fee5eede003a59b7dfaf06ae620e005ad2b9083e7b15955380863e28c3500`. It pins the original interval evaluator and continuation helper, requires its own successful known-case receipt, accepts only the reviewed tight-cover producer and exact declared domain, and checks the complete leaf partition before evaluation and before saving.

For each inherited three-field row, it decodes the same exact rational leaf and reruns the original residual evaluator. It requires a strict-sign component and stores that component's raw binary interval tuple with the original evaluator identity. A different excluded component from the original display row is permissible: either strict-sign necessary component is sufficient. Existing five-field rows and all unresolved paths are preserved. The output names and hashes its input bytes and saves atomically. The `refreshed` count refers to this invocation. Interrupted or limited runs can remain incomplete as an endpoint refresh even when the geometric exclusion cover was already complete.

This replay establishes recoverable endpoint evidence produced by the subject evaluator. It is not independent target residual recomputation. The independent checks below verify the saved endpoints and their provenance without importing the evaluator.

## Independent exact checker

The checker uses only the Python standard library. It does not import the subject, execute a residual, or use floating-point interval conversion. A finite raw endpoint tuple $(s,m,e,b)$ is read as the exact rational $(-1)^s m2^e$. All fields must be integer strings; $s\in\{0,1\}$, $m\ge0$, and $b$ must equal the mantissa bit length. Canonical zero is enforced and special nonfinite tuples are rejected. Both endpoint ordering and the strict condition $\ell>0$ or $u<0$ are checked exactly. The displayed interval must have the same sign, but display rounding is not used to establish the exact sign.

A path digit $2j$ or $2j+1$ selects the lower or upper half of coordinate $j$ of the current closed rational rectangle. The checker rejects duplicate leaves, an ancestor leaf overlapping a descendant, malformed digits, a missing sibling, and siblings that split different coordinates. Every internal node must have precisely the two complementary children for one coordinate. Induction from the root therefore proves complete coverage by these midpoint subdivisions, with only shared boundaries. An independent exact normalized-volume sum $\sum_p2^{-|p|}=1$ is also checked. Arbitrary adaptive choices of split coordinate do not invalidate that argument.

Every receipt is required to use the exact reviewed domain, a pinned producer, appropriate dependency identities, a complete partition, and a completion flag consistent with its unresolved list. The final receipt must be the refresh output and all its rows must contain exact endpoints. When `require_complete` is true, any unresolved path causes failure.

The checker traverses source hashes through an explicitly supplied frozen manifest. It never follows a `source_receipt` filename automatically. This matters because a checkpoint path can be reused while the source hash still identifies an older state. Each ancestor must be supplied by its own byte digest. At continuation transitions, every inherited exclusion must remain byte-for-byte equal as parsed JSON, and every newly produced leaf must descend from exactly one prior unresolved leaf. Tight-produced exclusions must carry the tight evaluator identity. At refresh transitions, all excluded paths and their order, every prior exact row, and the unresolved list must remain unchanged; changed display rows must carry the original evaluator identity, with an exact matching refresh count.

All five reviewed source files and five subject known-case receipts are checked against their producer/dependency identities. The frozen runtime identity is checked against the final refresh's Python and mpmath metadata; every inventoried mpmath Python source is hashed, and the inventory must match the current installed source tree. This verifies the supplied runtime record against current files. It does not convert a mid-run inventory into a launch-time attestation or establish formal correctness of Python, mpmath, hardware arithmetic, or all library operations.

## Frozen manifest contract

The parent supplies a JSON object with `frozen: true`, explicit Boolean `require_complete`, `target_sha256`, `receipts`, `subject_controls`, and `runtime_identity`. Each receipt/control/runtime entry has a `path` and `sha256`. `receipts` includes the final exact-witness output and every ancestor back to the original pilot. `subject_controls` includes one successful receipt for each of the original evaluator, original continuation driver, tight evaluator, tight cover driver, and witness refresh driver. Optional `code_files` maps the five reviewed source basenames to their frozen paths; by default the checker reads their sibling evidence paths.

The parent reports that the preserved pilot and original continuation hashes are respectively `4c364cf02a35d5fb9a301e3a0f071b19e5717b0376e8e40572591030ef0d387d` and `04f8ac3489be894568168188306305ddf5b593eec809d140f789a804f230e720`. It reports the runtime identity hash `f5de98f995fda3a28615ea345fb493656b30e88a75726a4eabaf86155370b33f`, with Python 3.13.2 and mpmath 1.3.0, captured during the active run. These are provenance inputs for the future target check, not final-cover measurements made in this preparation.

From the repository root, the target command will be:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-audit.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-controls.json --manifest <frozen-manifest-path>
```

The target command is not authorized by a filename alone: the parent must first identify the final artifacts as frozen. A partial cover can be structurally audited with `require_complete: false`; success then explicitly remains partial.

## Controls, falsifiers, and limitations

The known-first controls include exact $3/2$ and $-5/4$ endpoint reconstruction, a mantissa larger than machine integer precision, both strict signs, root and mixed-axis complete trees, and a synthetic pilot-to-continuation-to-tight-to-refresh chain. They reject nonfinite/malformed tuples, wrong mantissa bit counts, reversed and zero-containing intervals, exact/display sign disagreement, missing or overlapping leaves, mismatched siblings, duplicate JSON keys, altered inherited witnesses, a false completion flag, and a final display-only row.

The method or final claim would be overturned by a saved interval containing zero, an omitted/overlapping geometric region, a changed inherited exclusion without the declared replay, a missing source ancestor, a source/runtime hash mismatch, an unresolved final leaf, or a defect in the underlying outward interval enclosure or root census. The first six are direct checker rejection conditions; the last requires mathematical or interval-implementation review beyond saved-evidence inspection.

Exact saved signs plus a complete tree do not themselves prove that the saved numbers enclose the true residual. The independent mathematical reviews establish why the reviewed operations should enclose it; the subject execution produces those enclosures; this separate checker verifies the saved evidence and chain. This separation is the strongest justified description without an independently authored full target residual replay, which is outside this assignment.

## Preparation receipts

- Shared-venv `overnight-c-review-cover-audit.py controls` exited 0 and wrote `passed: true` before any target-mode use. Checker SHA-256: `601b32127cab24f9c40ca27824f7d908d0af5523c41b5a4f5661524708986df8`.
- Shared-venv standard-library `ast.parse` accepted the checker; `shasum -a 256` matched the frozen refresh and checker hashes and measured controls-receipt SHA-256 `ebb9bfab3ad8b2b2e6de1eacb19e735075ce40b298cd119577728df85952efac`. `git diff --no-index --check /dev/null` for this new report emitted no whitespace diagnostics (exit 1 denotes a difference from the empty input).
- Files authored for this preparation: this report, the independent checker, and its controls receipt. No subject, prior review, shared owner, queue, corpus file, or runtime cover was changed.
- At preparation, the final evidence audit remained pending the frozen manifest. No sustained job or residual replay was launched by the reviewer.

## Final disposition: valid partial cover

**Measured result:** the independently authored [streaming saved-evidence auditor](../evidence/overnight-c-review-cover-streaming-audit.py), executed by the parent's single owned supervisor after its [known-first controls](../evidence/overnight-c-review-cover-streaming-controls.json) passed, validates the frozen [manifest](../evidence/overnight-c-cover-manifest.json) and produces the [final audit receipt](../evidence/overnight-c-review-cover-streaming-target.json). The receipt reports `passed: true`, `all_final_witnesses_exact: true`, and `complete_exclusion: false`. Independent read-only inspection of that receipt and manifest, followed by `shasum -a 256` of both and the frozen checker/control files, matched the declared identities.

The justified disposition is **valid partial saved exclusion evidence**, not whole-box exclusion. The final domain is exactly the five-coordinate subfield rectangle specified above, with all ordinary roots treated by the reviewed mathematical method. The final evidence contains:

| Quantity | Audited result |
| --- | ---: |
| Excluded leaves with exact strict-sign witnesses | 114,308 |
| Explicitly unresolved leaves | 35,693 |
| Complete partition leaves | 150,001 |
| Internal partition nodes | 150,000 |
| Maximum retained depth | 25 |
| Exact normalized volume of excluded plus unresolved leaves | 1 |
| Positive exact witness intervals | 49,033 |
| Negative exact witness intervals | 65,275 |
| Original-evaluator witnesses refreshed to exact tuples | 9,057 |
| Retained tight-evaluator exact witnesses | 105,251 |

The positive and negative exact signs sum to all excluded leaves. All final witnesses exclude zero exactly; the partition traversal covers the full declared rectangle with only shared cell boundaries. The unresolved leaves are retained as unresolved. Leaf counts do not give an excluded-volume fraction because adaptive leaves have different sizes, and no such fraction is inferred here.

The final retained count is the reviewed driver's single split beyond the 150,000-leaf threshold, after which the parent reports that the worker stopped normally. The checker admits that terminal 150,001-leaf crossing state and does not authorize continuation beyond the resource limit. The parent's supervisor record `be6a17dd-0e10-46c3-8e36-6fdfb7bb60df` reports audit exit 0, a closed process group, and 10.878 supervisor seconds. Those execution facts are attributed to the parent-provided supervisor receipt; this reviewer did not launch a second target computation.

## Final ancestry, source identity, and independence

The checker validated all six explicitly frozen receipts, traversed their exact source hashes, and found the following preserved chain:

| Stage | Excluded | Unresolved | New exclusions or refresh |
| --- | ---: | ---: | ---: |
| Weighted original pilot | 1,080 | 7,448 | Original exclusions |
| Original continuation | 9,057 | 29,130 | 7,977 new exclusions |
| First tighter continuation | 56,413 | 34,418 | 47,356 new exclusions |
| Second tighter continuation | 106,630 | 33,984 | 50,217 new exclusions |
| Third tighter continuation | 114,308 | 35,693 | 7,678 new exclusions |
| Streamed exact-witness refresh | 114,308 | 35,693 | 9,057 display rows replaced by exact witnesses |

Every continuation preserved all inherited exclusions and refined only its parent's unresolved regions. The refresh preserved all leaf paths and order, all previously exact rows, and the full unresolved list. Its 9,057 changed rows use the original frozen evaluator. The abandoned partial output of the earlier refresh is preserved by the parent but is not an ancestor of the final output, so it supplies no independent claim or missing ancestry link.

The audit matched six source-code identities, five source-bound known-case receipts, and all 87 inventoried mpmath Python source files. The final refresh's Python and mpmath metadata match the frozen runtime record. That runtime inventory was captured during the original active calculation, not at launch; its limitations are unchanged. Source/runtime identity and successful known cases support provenance and reproducibility, not formal verification of the arithmetic library or historical process environment.

The mathematical root census, circular reduction and enclosure inequalities have separate analytical reviews. The final residual intervals were produced by the reviewed subject evaluators; the endpoint refresh is subject reproduction. The independent checker validates exact saved signs, domain, partition, dependency identities, and source ancestry without replaying target residuals. Consequently this is independently reviewed mathematics plus independently audited saved evidence, **not an independently authored residual recomputation over every leaf**. An enclosure defect in the reviewed evaluator would still invalidate the affected exclusion despite a valid saved-sign audit. No full-vector balance, candidate existence, stability, superfield extension, physical assembly, or whole-box absence is admitted by this partial cover.

## Memory-safe audit and final receipts

The [memory-method companion](../evidence/overnight-c-review-cover-memory.md) records why the original all-receipts-in-memory checker was not used on the large final chain. A known-first synthetic measurement showed approximately 1,008 parsed-object bytes per representative row, making simultaneous receipt retention incompatible with an assured 400 MB budget at permitted sizes. The new checker streams bounded JSON values into two adjacent disk tables, checks trees and ancestry with ordered cursors, and uses an 8 MiB SQLite cache with file-backed temporary storage. It preserves the original independent endpoint validator by hash and all original audit obligations. Its 320 MB periodic memory guard is not described as a hard operating-system cap.

The [streamed refresh source](../evidence/overnight-c-witness-refresh-stream.py) was separately inspected against the original frozen source. Its changes only stream atomic JSON serialization, test the output against literal known signed-dyadic/Boolean bytes, and select distinct control/output names. Evaluator, source/dependency pins, root logic, partition checks, row semantics, and inherited evidence remain unchanged. This is why the new refresh producer is admitted as a separately pinned source in the new checker rather than silently substituted into the original instrument.

The final target audit measured peak resident memory **36,667,392 bytes**, below the unchanged 400 MB research budget. Its preceding synthetic controls measured 26,001,408 bytes. The target and its exact source/control binding are retained at these SHA-256 identities:

| Artifact | SHA-256 |
| --- | --- |
| New streaming checker | `54567e2a95fbdd364be24ad425da7847c3d3065ff5914964a99a257e1d1909f5` |
| New checker controls | `82fcba0ee484c49ab4b784d1f47a49253ce4e2eee45dae8724d1daf4aa3d3e6d` |
| Frozen manifest | `097cc39c68e855bdf7c2045f6a715666309f4fabe16bbc802ebcf9a341763959` |
| Final exact-witness source receipt | `bcc6e3100518f4167cefdc8a19d517f7e0e6e955cf9cc521c26a3b1a88a8c6cc` |
| New audit result | `b5d80459bb488656341fb4fc2c37c01b1094076ac9d39578cb211b9ea1ff7d60` |
| Preserved original independent checker | `601b32127cab24f9c40ca27824f7d908d0af5523c41b5a4f5661524708986df8` |

The frozen manifest binds every ancestor, subject control and runtime record individually. No unchecked filename substitution is used. The shared-venv command, parser controls, initially discovered and repaired checker cursor-cleanup issue, and exact new refresh identity are documented in the memory-method companion. Final AST parsing of the new checker passed; the final read-only hash checks matched the identities above. No subject or prior independent checker was edited to obtain agreement.

Final scoped documentation validation used `git diff --no-index --check /dev/null` on this report and the memory-method companion; both emitted no whitespace diagnostics and returned 1 for their difference from the empty input. `git --no-optional-locks status --short` restricted to the seven cover-review paths listed those paths as untracked; this is no claim about the broader checkout. The reviewer authored the streaming checker, its controls and memory-method companion and updated this report; the parent retained the supervised target stdout as the target-receipt companion. Original checker, subject and ancestor bytes were preserved.

No blocker remains for the **partial saved-evidence disposition**. The 35,693 unresolved leaves and the terminal resource limit block a whole-box exclusion claim. A future computation would require a separately authorized continuation or method change; this audit authorizes neither. It also leaves intact the separate analytical radius and slow/superfield exclusions, whose domains and proofs do not depend on completion of this cover.
