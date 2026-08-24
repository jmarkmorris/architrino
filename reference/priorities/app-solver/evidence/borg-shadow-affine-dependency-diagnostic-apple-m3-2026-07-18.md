# Borg Shadow Affine Dependency Diagnostic — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_shadow_affine_dependency_diagnostic/apple-m3/2026-07-18`
- Protocol: unchanged `EOM_BORG_NATIVE_V8`
- Budgets: unchanged `research-certified-v1` and `interactive-certified-v1`
- Population: six paths, deterministic seeds 0–3, history depth `1.01`, 100 chunks
- Diagnostic: flag-gated, binary64 round-to-nearest, non-authoritative shadow affine propagation with a 256-symbol cap
- Decision: `FALSIFIED`
- Gate, preset, allocation hash, published token, and terminal-row changes: no
- Existing endurance, reconditioning, and architecture packets modified: no

The proposed shared-symbol architecture is not the next remedy. On Research seed 0, the shadow observer produces a one-sided affine radius of `5.6122612883862972e-4`, hence a two-sided width of `1.1224522576772594e-3`. The fixed decision ceiling was `1.042e-3`. The diagnostic therefore fails its falsification gate before the full eight-row matrix can support the architecture.

Claim grade: `measured-current-shadow-binary` for the widths and `derived` for the comparison with the stated gate. Falsifier: an exact rebuilt replay of the same fixed contract gives a two-sided Research seed-0 shadow width below `1.042e-3` without changing the diagnostic algebra, cap, or inputs.

## Diagnostic Boundary

The implementation is an observer, not a solver branch. The command-line flag `--shadow-affine-diagnostic=PATH` creates a separate NDJSON sidecar. With the flag absent, no observer is constructed. With the flag present, the certified evolution still owns every accept, reject, root, regulator, publication, and halt decision. Observer exceptions are caught and ignored.

The shadow state uses signed binary64 coefficient rows over shared symbols for all six paths. Each accepted step allocates fresh symbols for:

- four-quarter local position and velocity error;
- certified acceleration half-width;
- each consumed delayed-root-time half-width.

The same root-time symbol is used by the source evaluation and the receiver's cross-path acceleration response. The delayed-root sensitivity is computed from the certified source normal. Stored cubic segment coefficient rows retain their shared identities across later delayed evaluations. The corrector's first-order cross-path acceleration sensitivity is iterated for the same number of corrector passes as the certified request.

At 256 live symbols, the observer selects the smallest rowwise maximum coefficients and replaces them with one sign-independent hull symbol. Every replacement is an NDJSON `condensation` record naming the merged symbols and the replacement. This is the only rewrite of retained affine rows.

The observer uses ordinary binary64 arithmetic without directed rounding and is therefore not a certified enclosure. Its values are diagnostic estimates; they cannot pass a production gate or weaken a rejection.

Claim grade: `derived-current-tree` for this architecture. Falsifier: a code path from an observer value into a certified request, published history, acceptance decision, or terminal status; an allocation above 256 live symbols; or an unlogged row condensation.

## Flag Isolation

The focused process test sends the same fixed protocol record through the EOM solver with the flag off and on. It canonicalizes the complete published extensions and the certified status, evidence status, claim grade, accepted end, accepted/rejected counts, atomicity token, controller step, halt code, budget provenance, and failure rows. Those fields are exactly equal. The flag only adds the sidecar records.

The full fixed-contract Research seed-0 runs also terminate at the same accepted solver time, `6.350099999999999`, with `root_completeness_not_certified`. No preset or allocation hash was changed.

Claim grade: `measured-current-binary`. Falsifier: the focused test finds any different canonical published or terminal token, or a fixed-contract replay moves the accepted prefix when the flag alone is toggled.

## Research Seed-0 Decision Row

The terminal difficult row is receiver `1001`, source `1002`, reception time `6.3501999999999992`, and emission time `6.3010467529296879`.

| Quantity | Shadow diagnostic | Recorded independent box |
| --- | ---: | ---: |
| One-sided projected radius | `5.6122612883862972e-4` | not retained as a signed shared radius |
| Two-sided projected width | `1.1224522576772594e-3` | `1.053790867320591e-3` |
| Source normal | `[1.0423370158200226, 1.0507634721357815]` | same certified row |
| Decision ceiling | `1.042e-3` | `1.042e-3` |

The shared-symbol observer is about `6.51%` wider than the recorded product-box residual and about `7.72%` above the decision ceiling. In this linearized binary64 instrument, cross-path sharing does not contract the blocker; the feedback sensitivities outweigh the cancellations it preserves.

The result rejects this shadow affine architecture as the next implementation target. It does not prove that every theorem-backed joint-state representation must fail. The first missing object is now a derived root-time budget theorem: an analytic bound that maps the admitted state and source-normal ranges to the fixed root-time ceiling before another representation rewrite is attempted. Changing the tolerance is not proposed.

Claim grade: `measured` for the row and `inferred-adjudication` for the next missing object. Falsifier for the adjudication: a separately validated joint-state method, under the same fixed budgets and hashes, directly certifies this row below the ceiling while retaining the complete root-free complement.

## Eight-Row Terminal Matrix

Each root-terminal row reports the last difficult receiver/source pair. The Research seed-2 row is the state projection at the finite-width event rather than a root-terminal row.

| Preset | Seed | Accepted solver time | Native wall s | Terminal mechanism | Receiver/source | Shadow radius | Two-sided width | Recorded box width |
| --- | ---: | ---: | ---: | --- | --- | ---: | ---: | ---: |
| Research | 0 | `6.3501000` | `4.518` | root completeness | `1001/1002` | `5.61226e-4` | `1.12245e-3` | `1.05379e-3` |
| Research | 1 | `8.6021484` | `8.702` | root completeness | `1004/1003` | `4.72412e-4` | `9.44823e-4` | `1.04667e-3` |
| Research | 2 | `11.3500000` | `46.519` | finite-width regulator | `1001/1002` | `3.93853e-5` | `7.87705e-5` | `1.67784e-4` |
| Research | 3 | `4.9527943` | `9.458` | root completeness | `1004/1003` | `6.10323e-4` | `1.22065e-3` | `1.01892e-3` |
| Interactive | 0 | `6.3501000` | `4.588` | root completeness | `1001/1002` | `5.61226e-4` | `1.12245e-3` | `1.05379e-3` |
| Interactive | 1 | `8.6021484` | `6.915` | root completeness | `1004/1003` | `4.72381e-4` | `9.44763e-4` | `1.03862e-3` |
| Interactive | 2 | `11.4751000` | `40.868` | root completeness | `1001/1006` | `1.50980e-4` | `3.01960e-4` | `1.03946e-3` |
| Interactive | 3 | `4.9530297` | `5.055` | root completeness | `1003/1004` | `2.53273e-4` | `5.06545e-4` | `9.94060e-4` |

The matrix is not uniformly contractive: Research seeds 0 and 3 are wider than the recorded boxes, while the other root rows are narrower. This is why the fixed Research seed-0 falsification rule, rather than an average, decides the architecture.

Claim grade: `measured-current-shadow-binary`. Falsifier: an exact replay of a named preset/seed produces a different terminal pair or width outside ordinary binary64 replay stability.

## Per-Step Fresh Versus Feedback Decomposition

Across Research seed 0's 128 accepted steps, six paths, and three axes, the observer recorded 2,304 axis-step rows.

| Radius contribution | Fresh local | Retained-state feedback | Fresh share |
| --- | ---: | ---: | ---: |
| Position | `1.6924120112615793e-5` | `1.041633762754642e-3` | `1.60%` |
| Velocity | `6.807625924388357e-4` | `6.4591512453901195e-3` | `9.53%` |

Here feedback means the engineering feedback loop terms $hE_v$, $\tfrac12 h^2r_a$, and $hr_a$; fresh means the new four-quarter local-error symbols. The sums are diagnostic component totals, not a replacement for the certified radius recurrence. The active symbol count never exceeds 256. The run logs 765 hull condensations.

The measured signal is therefore feedback-dominated, consistent with the earlier blocker diagnosis. It does not follow that shared symbols necessarily make the terminal projection narrow: the seed-0 result shows that the signed linearized feedback itself can remain too large.

Claim grade: `measured` for the totals and `inferred` for the mechanism interpretation. Falsifier: an independent per-step instrument attributes most of the same terminal width to fresh local error, or direct higher-order propagation contracts the feedback terms below the fixed ceiling.

## Research Seed-2 Event Estimate

At receiver `1001`, source `1002`, reception time `11.350050000000003`, the observer's projected state radius is `3.9385264195056514e-5`, versus the recorded box-state width `1.677839597764943e-4`. Applying that ratio to the recorded last maximum component width gives the following diagnostic estimate:

| Quantity | Value | Fraction of Research slice |
| --- | ---: | ---: |
| Research ladder slice | `1.5e-8` | `100%` |
| Recorded last maximum component width | `5.484829801699706e-10` | `3.66%` |
| Shadow event-enclosure estimate | `1.2874977506349563e-10` | `0.858%` |

This event value is `inferred`, not directly propagated through the finite-width quadrature. It suggests that dependency retention would not make the Research event slice the first barrier, but it cannot certify regulator convergence and cannot rescue the architecture after the seed-0 falsification.

Falsifier: direct affine propagation through the finite-width quadrature and ladder comparison exceeds this state-projection estimate or remains above `1.5e-8`.

## Runtime Cost

Research seed 0 with the observer disabled took `5.548543002` outer wall seconds. The enabled run took `17.587266335` outer wall seconds, an overhead of `216.97%`. The certified solver's internal timer is not a valid observer cost measure because the observer runs after each evolution call and its file I/O is outside that timer. The measured overhead is dominated by diagnostic coefficient propagation and verbose symbol/condensation logging.

The cost is far above the requested low-single-digit target. Because this architecture is already falsified mathematically, no optimization is proposed.

Claim grade: `measured-current-host`. Falsifier: repeated paired runs on the same host show the observer's median outer overhead below `5%` with the same logging and symbol cap.

## Validation And Reproduction

The final rebuild is newer than every changed EOM source. The standard CTest suite and the full Borg process test suite pass. The focused flag-isolation test is part of that process suite.

```text
cmake --build .tmp/eom-shadow-affine-build --target eom_borg_shadow_cli -j 4
ctest --test-dir .tmp/eom-shadow-affine-build --output-on-failure
AAA_EOM_NATIVE_BINARY=.tmp/eom-shadow-affine-build/eom_borg_shadow_cli \
  "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_borg_native_process.py
node --check scripts/eom/profile-borg-incremental-chunks.mjs
git diff --check
```

Representative fixed-contract invocation:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-shadow-affine-build/eom_borg_shadow_cli \
  --certified-budget-id=research-certified-v1 --seed=0 --chunks=100 \
  --history-depth=1.01 --root-details=false --history-error-series=false \
  --shadow-affine-output=/tmp/borg-shadow-affine-research-seed0.ndjson
```

The profiling wrapper emits a heartbeat every 10 seconds while the child is running. No job was left unwatched. No reader-facing theory claim is promoted by this packet.
