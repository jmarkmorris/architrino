# Equation Breakthrough Search 2026-06-26

## Workstream Metadata

- Kind: `priority`
- Status: `active-checkpoint`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Score ladder: [Equation Score-5 Closure Ladder](equation-score-5-closure-ladder.md)
- Common architecture: [Equation Common Architecture 2026-06-23 C](equation-common-architecture-2026-06-23-c.md)
- Claim level: team-agent breakthrough-search checkpoint and priority-only attack cards
- Promotion status: priority-only

## Run Boundary

This run is a team-agent breakthrough search over least-advanced equation rows. It does not promote material into `content/markdown/aaa` and does not change equation scores. Candidate breakthroughs remain candidate-level until accepted retained evidence, source-backed carrier rows, or supported checker results land.

The queue order is:

1. rows with blank or missing `6/23 b`, rows present in packets/scripts but missing from `equation.md`, and suffix candidates not fully integrated;
2. score `1`;
3. score `2`;
4. score `3`;
5. score `4` only if the lower-score queue is exhausted.

`EQ-01` is skipped unless a low-score row directly needs the root law.

## Dynamic Queue

### Missing Or Not Fully Integrated

| ID | Live disposition |
| --- | --- |
| `EQ-07B` | Present as a remaining suffix candidate in [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md), absent from the main score table and score ladder. Candidate target: black-hole accretion, jet release, and horizon thermodynamics. |
| `EQ-23A` | Present as a remaining suffix candidate in [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md), absent from the main score table and score ladder. Candidate target: stellar explosive nucleosynthesis and shock-driven reaction networks. |
| `EQ-28B` | Mentioned only as an optional high-energy threshold provenance row. The live packet says to add it only if a concrete high-energy propagation or GZK-like consumer appears; otherwise ordinary pair thresholds stay in `EQ-28`. |

### Score `1`

`EQ-04A`.

### Score `2`

`EQ-07A`, `EQ-11A`, `EQ-12A`, `EQ-15`, `EQ-16`, `EQ-22A`, `EQ-22B`, `EQ-26A`, `EQ-27`, `EQ-28A`, `EQ-30`, `EQ-31`.

### Score `3`

`EQ-10`, `EQ-11`, `EQ-12`, `EQ-13`, `EQ-14`, `EQ-16A`, `EQ-18`, `EQ-19`, `EQ-20`, `EQ-21`, `EQ-22`, `EQ-23`, `EQ-24`, `EQ-25`, `EQ-26`, `EQ-28`, `EQ-29`, `EQ-32`.

### Score `4`

Not reached at checkpoint 0.

## Checkpoint 0

- Time: 2026-06-26 00:31 EDT.
- Elapsed: about 4 minutes from required `git status --short --untracked-files=all`.
- Worktree at start: clean.
- Active agents: 6.
- Agents active:
  - missing/unintegrated suffix candidates: `EQ-07B`, `EQ-23A`, `EQ-28B`;
  - score `1`: `EQ-04A`;
  - score `2` high-energy suffix rows: `EQ-07A`, `EQ-11A`, `EQ-22B`, `EQ-28A`;
  - score `2` action/gauge/precision rows: `EQ-12A`, `EQ-15`, `EQ-16`, `EQ-22A`, `EQ-26A`, `EQ-27`;
  - finite-window rows: `EQ-30`, `EQ-31`, with shared pressure from `EQ-14` and `EQ-25`;
  - score `3` carrier layer: `EQ-10`, `EQ-11`, `EQ-18`, `EQ-19`, `EQ-20`, `EQ-21`, `EQ-22`, `EQ-23`, `EQ-24`, `EQ-32`.
- Current best candidate: an unintegrated suffix packet may be more score-moving than another high-score blocker pass if it can name a single retained carrier instead of another broad equation list.
- Files edited so far: this checkpoint file.
- Validation status: not yet run after this checkpoint write.

### Checker Evidence At Checkpoint 0

| Row | Checker | Current first blocker | Notes |
| --- | --- | --- | --- |
| `EQ-07A` | `eq07a-compact-region-carrier-residual.mjs` | `missing_accepted_compact_region_carrier` | Solver diagnostics and negative controls pass on the attempt fixture; every required row remains attempt-level. |
| `EQ-11A` | `eq11a-gravitational-wave-source-residual.mjs` | `missing_accepted_gw_source_carrier` | Chirp, decay, flux, ringdown, ledger, provenance, hidden-retune, and negative controls pass on the attempt fixture; carrier and rows remain attempt-level. |
| `EQ-22B` | `eq22b-recombination-acoustic-residual.mjs` | `missing_accepted_recombination_acoustic_carrier` | Recombination, visibility, sound-horizon, damping, transfer, provenance, hidden-retune, and negative controls pass on the attempt fixture; carrier and rows remain attempt-level. |
| `EQ-28A` | `eq28a-path-frequency-exchange-residual.mjs` | `missing_accepted_path_frequency_exchange_carrier` | Inverse-Compton, signed path-frequency, SZ, photon-gate, provenance, hidden-retune, and negative controls pass on the attempt fixture; carrier and rows remain attempt-level. |
| `EQ-04A` dependency | `produce-eq02-04-coframe-extraction-certificate.mjs` | `source_status` on the current source attempt; `row_binding_raw_labeled_rows_preserved_on_retained_history` on the row-binding negative control | The current mass/Koide route remains downstream of accepted `EQ-02` through `EQ-04` retained-domain and mass-shell evidence. |
| `EQ-04A` dependency | `check-same-branch-chart-identity.mjs` | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` | The blocked source shell has matched carrier legs but no accepted retained identity rows or accepted domain witnesses. |
| `EQ-04A` dependency | `eq02-04-translating-binary-retained-record.mjs` | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` | The retained-record shell inherits the same same-branch blocker; downstream rows and witnesses are intentionally unpopulated. |

### Cycle 0 Implementation Target

The first safe implementation target is not a score change. It is to decide whether the missing suffix candidates should become focused priority packets or remain deferred:

- `EQ-23A` candidate object: one explosive-window carrier $\theta_{\mathrm{expl}}(\Omega,W)$ that binds shock jump/blast, neutrino heating, reaction-network yield, radioactive decay heating, photon output, remnant ledger, and no-hidden-retune witness.
- `EQ-07B` candidate object: one accretion-to-release carrier $\Theta_{\mathrm{AGN}}$ that binds inflow, disk transport, Eddington/opacity, jet release, feedback, horizon thermodynamic label, event ledger, and no-hidden-retune witness.
- `EQ-28B` candidate disposition: defer unless a concrete high-energy propagation consumer appears.

The coordinator will wait for the missing-suffix worker before creating any packet, to avoid adding a row whose first blocker is only another broad topic label.

## Remaining Queue After Checkpoint 0

No row has completed two substantive passes yet. All rows through score `3` remain in the active queue.

No score changes.
