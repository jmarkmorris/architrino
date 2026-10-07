# Overnight C reproduction and evidence boundaries

The [research report](overnight-c-logarithmic-braids-2026-10-06.md) owns the scientific synthesis and current disposition. This companion records the actual research entrypoints and how their evidence is interpreted. All commands run from the existing repository checkout under the executable shared venv. Long calculations use the owned supervisor, one worker, fixed deadlines and the source instruments' resource limits. These are recorded execution commands; do not overwrite retained scientific receipts when repeating them. Use a distinct `--output` name where supported, and preserve the source-bound controls and ancestor files.

## Analytical results

The following proof/review pairs establish the mathematical results independently of every floating search and interval-cover target. The subject files are frozen, including historical pending-review text; the separate reviews and current report own their checked disposition.

| Result | Subject | Independent reconstruction |
| --- | --- | --- |
| Initial slow rotation | [Proof](overnight-c-slow-rotation-exclusion.md) | [Review](overnight-c-slow-rotation-independent-review.md) |
| Stronger slow rotation | [Proof](overnight-c-curvature-refined-exclusion.md) | [Review](overnight-c-curvature-independent-review.md) |
| Ordinary superfield sector | [Proof](overnight-c-superfield-aligned-exclusion.md) | [Review](overnight-c-superfield-independent-review.md) |
| Both outer radii at least eleven | [Proof](overnight-c-large-radius-ratio-exclusion.md) | [Review](overnight-c-large-radius-independent-review.md) |
| General separated-radius condition | [Proof](overnight-c-separated-radius-necessary-condition.md) | [Review](overnight-c-separated-radius-independent-review.md) |
| Distant-outer inner-separation bound | [Proof](overnight-c-distant-outer-pair-compactness.md) | [Review](overnight-c-distant-outer-independent-review.md) |
| Outermost radius ratio below four hundred | [Proof](overnight-c-outer-radius-bound.md) | [Review](overnight-c-outer-radius-independent-review.md) |
| Outermost radius ratio below one hundred | [Proof](overnight-c-outer-radius-hundred-bound.md) | [Review](overnight-c-outer-radius-hundred-independent-review.md) |
| Outermost radius ratio below thirty-five | [Proof](overnight-c-outer-radius-thirty-five-bound.md) | [Review](overnight-c-outer-radius-thirty-five-independent-review.md) |

Each independent review records its exact known-first control command, target command, instrument identity and small tracked JSON receipts. The controls use analytic identities and exact rational arithmetic; target arithmetic is not run before its matching controls pass. The frozen subject is not modified to agree with the independent checker. These arithmetic checks support the separately reconstructed proofs; they do not replace the continuous reasoning.

## Numerical proposal instruments

The [initial search](../evidence/overnight-c-subfield-search.py), [wider search](../evidence/overnight-c-expanded-search.py) and [intermediate-radius search](../evidence/overnight-c-intermediate-radii-search.py) all use the same frozen Cartesian evaluator. They are dependent proposal instruments, not three independent confirmations. Their complete-root justification is the analytical strictly subfield chart in the report. Their finite optimizer outcomes supply no absence proof.

The initial controls were run before the four-start pilot and 128-start extension:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-subfield-search.py --stage known
```

The wider and intermediate instruments similarly ran `--stage known` before their targets. The actual intermediate extension command was:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 150 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-intermediate-radii-search.py --stage search --starts 128 --seconds 120 --max-nfev 300 --output intermediate-search-128.json
```

The proposer fixes $K_{\log}=c_f=1$ and varies only the declared geometry. Multiplying each pair equation by its positive radius preserves its zeros and supplies no adjustable coupling. No candidate crossed the declared maximum-component threshold in the recorded searches; this is measured finite-search evidence only.

## Continuous interval calculation

The [first evaluator](../evidence/overnight-c-subfield-interval.py), [first continuation](../evidence/overnight-c-interval-continue.py), [tighter evaluator](../evidence/overnight-c-tight-interval.py) and [tighter continuation](../evidence/overnight-c-tight-cover.py) retain their frozen dependency digests. The [first method review](overnight-c-interval-method-independent-review.md) and [tighter method review](overnight-c-tight-method-independent-review.md) reconstruct the mathematics and preserve their domain restrictions. The tighter antipodal fast path is valid on the specified disjoint radius intervals; it is not a generic equal-interval dependency rule.

The local evidence ancestry is the weighted interval pilot, its first continuation, and successive tighter continuations. Each continuation consumes only its parent's unresolved leaves, leaves inherited excluded rows unchanged, and records its exact parent digest. Each retained file has a distinct name. Source-receipt names alone are insufficient because intermediate checkpoints can advance; the frozen digest and preserved bytes establish which snapshot was consumed.

The first tighter continuation command was:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 1830 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-tight-cover.py --stage cover --source interval-continued.json --output tight-cover.json --seconds 1800 --limit 100000
```

The second uses the same command with `--source tight-cover.json --output tight-cover-2.json`. The third uses `--source tight-cover-2.json --output tight-cover-3.json`. All use the exact initial radius and angular-rate domain, phase bounds $[-22/7,22/7]$, interval precision thirty decimal digits, 400 MB measured resident limit, 150,000 retained-leaf limit, and 75 MB serialized-output limit. A limit stops calculation without excluding its retained unresolved leaves. The driver records a complete partition before every save. Strict signs of complete residual components exclude leaves; the geometry, polarity, coefficient and root selection are never modified to obtain a sign.

Before each instrument's first target, its `--stage known` controls passed. They include exact static and moving chords, the static hexagon, complete and deliberately malformed partitions, path reconstruction, and exact endpoint serialization. The target refuses a mismatching controls receipt. `mpmath.iv` is the outward arithmetic backend. The retained runtime inventory was captured during the active calculation, not as a launch-time attestation; that distinction remains explicit.

## Exact witness refresh and independent saved-evidence audit

The [original refresh instrument](../evidence/overnight-c-witness-refresh.py), and the separately frozen [streamed serializer refinement](../evidence/overnight-c-witness-refresh-stream.py), rerun only inherited display-only leaves with their original frozen evaluator and saves exact binary endpoint tuples. This is a reproduction and evidence-format improvement, not an independent residual calculation. Already exact witnesses and the partition remain unchanged. A stopped refresh must not be treated as finished merely because it inherits a `complete_exclusion` flag.

The prepared [independent audit](overnight-c-cover-independent-review.md) and [checker](../evidence/overnight-c-review-cover-audit.py) require a frozen manifest containing the final receipt, every source ancestor, all source-bound controls and runtime identity. Its known-first controls include malformed endpoint tuples, missing siblings, changed inherited rows, false completion flags and display-only final witnesses. The final audit checks exact strict signs, complete tree coverage, dependency identities, ancestry refinement and runtime-source inventory. It does not independently replay target residuals. A successful partial-cover audit remains partial; a whole-box exclusion also requires no unresolved leaves.

## Additional bounded studies and display artifact

The centered-residual, tighter-centered and derivative-guided split pilots are research companions retained to explain the method selection. Their small measured trials did not justify replacing the tighter natural evaluator and fixed subdivision rule. They supply no accepted target exclusions in the final cover. The postprocessed tangential-sign and unresolved-projection observations likewise supply no independent continuous theorem.

The [radius illustration](overnight-c-radius-exclusion-map.svg) visualizes the analytical separated-radius bound and was inspected through its local PNG. Its [source](../evidence/overnight-c-radius-exclusion-map.py) checks floating evaluations against exact-rational corner references at tolerance $10^{-14}$ before drawing. Numerical contour sampling provides no proof beyond the analytical inequality. The blue region depicts the separately proved all-phase exclusion at outer-radius ratio thirty-five.

## Scope of final validation

Final syntax and link checks cover only the new `overnight-c-` analysis and evidence files. Markdown checks establish local file existence, not anchor validity or scientific correctness. Python AST and Node syntax checks establish parsing only. The independent mathematical reviews and the separately bounded saved-evidence audit carry their own stated verification scopes. Production solvers, regular test suites, shared owners, corpus, frozen pre-existing references and publication state are outside this task's write scope.

## Bounded serializer recovery

The original refresh crossed its post-save memory threshold and left a preserved partial receipt. The streamed refinement changes JSON output allocation only; its literal-byte serialization control and prior mathematical controls passed before its ten-row resource pilot and final retry. The final retry uses:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 630 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-witness-refresh-stream.py --stage refresh --source tight-cover-3.json --output exact-witness-cover-stream.json --seconds 600 --limit 20000
```

The partial original refresh and ten-row pilot are not ancestors of this final target. They are retained operational evidence. A separate audit version must explicitly recognize the streamed producer and its own source-bound controls; the frozen original checker does not authorize substituting source hashes.

## Final independent saved-evidence check

The [streaming independent auditor](../evidence/overnight-c-review-cover-streaming-audit.py) preserves the frozen original exact endpoint validator and adds bounded JSON parsing, disk-backed adjacent ancestry tables and ordered tree checks. Its [synthetic controls](../evidence/overnight-c-review-cover-streaming-controls.json) passed before target use, including malformed trees, changed inherited witnesses, false completion, invalid signs and values crossing parser chunk boundaries. The [frozen manifest](../evidence/overnight-c-cover-manifest.json) requests a partial-cover audit explicitly.

The actual target command was run under the owned supervisor with a 630-second deadline and fifteen-second operational heartbeat:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 630 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-streaming-audit.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-streaming-controls.json --manifest reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-cover-manifest.json --scratch .local-data/master-equation-closure/overnight-c/overnight-c-review-cover-audit.sqlite
```

The scratch path must not already exist; the auditor removes its own temporary database on exit. The [retained target receipt](../evidence/overnight-c-review-cover-streaming-target.json) is the successful supervisor stdout copied byte-for-byte, not a manually recreated summary. It verifies 114,308 exact witnesses, 35,693 unresolved leaves, a complete 150,001-leaf partition, all six ancestry receipts, five applicable subject controls and 87 installed mpmath source files. Its explicit conclusion is `complete_exclusion: false`. This is an independent saved-evidence audit, not independent residual replay or formal verification of the arithmetic library.

The [process closeout record](../evidence/overnight-c-process-closeout.json) records the supervisor's owner-scoped clear result and terminal lease metadata. It carries no scientific acceptance authority. All analytical exclusions retain their separate proof/review evidence.
