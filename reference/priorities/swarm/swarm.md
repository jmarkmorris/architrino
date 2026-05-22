# Swarm

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `28.34`
- Cost: `5.4`
- ROI: `5.25`
- Status: `terminology-freeze`

## Terminology Freeze

The remembered reader-facing swarm triad is frozen here until a dedicated terminology cleanup pass replaces or confirms it:

Git diagnosis: commit `5f830d3f` created the Noether swarm hub and the six scene names using the clean `Noether Swarm`, `Neutral Swarm`, `Shell Swarm`, `Nested Shell Swarm`, `Swarm Geometry`, and `Swarm Dynamics` vocabulary. Commit `73d34ddd` had earlier introduced a separate generalized priority packet with disputed working labels. This control file now treats those disputed labels as quarantined priority history, not as accepted terminology.

| Reader-facing term | Working meaning for now | Status |
| --- | --- | --- |
| `neutral swarm` | The broad six-architrino neutral case before any required binary grouping or radial organization is assumed. | Accepted-for-now reader-facing term. |
| `shell swarm` | A neutral swarm whose six architrino paths remain in a controlled radial support band. | Accepted-for-now reader-facing term. |
| `nested shell swarm` | A shell swarm with three ordered radial support bands. | Accepted-for-now reader-facing term. |

Priority-only labels introduced during the architecture generalization are cleanup-controlled. They may remain in existing file names, task identifiers, literal source references, and local proof-packet text until a scoped cleanup pass edits them, but they must not be promoted as reader-facing taxonomy or treated as accepted replacement terminology. The approved transitions below should be used in new priority prose. `Slot` and `sector` are allowed only in standard mathematical usage, not as reader-facing swarm taxonomy. Broad migration phrases such as `tri-binary-to-swarm-sector` still need explicit source/target wording.

`Noether swarm` is approved for prose. Use `Noether Swarm` only in titles, headings, scene titles, and other title-case labels. Prose cleanup may replace `Noether core` with `Noether swarm`; formula symbols, file paths, task identifiers, and notation such as $\rho_{\text{core}}$ and $\Lambda_{\text{NC}}$ still require the separate notation/file-path pass.

## Task Queue

1. `reader_facing_swarm_triad_freeze` — Keep `neutral swarm`, `shell swarm`, and `nested shell swarm` as the only accepted reader-facing swarm taxonomy until the terminology cleanup pass. Status: `active`. Depends on: none. Notes: do not promote priority-only labels from architecture packets into corpus prose, simulations, scenes, or app copy.
2. `priority_label_freeze_inventory` — Inventory the priority-only labels and apply the approved transition table in this file before broader edits. Status: `active`. Depends on: `reader_facing_swarm_triad_freeze`. Notes: approved prose transitions include `Noether core` to `Noether swarm`, `neutral knot-cloud` / `knot-cloud` to `neutral swarm`, `nested tri-binary` to `nested shell swarm`, `same-level tri-binary` to `shell swarm`, public-taxonomy `branch` to mathematical-use-only, `triply` to descriptive wording, `cloud` to the actual mathematical object, `exact nested tri-binary` to proof-specific exact-binary wording, `neutral Noether-core branch` to neutral-swarm wording plus mathematical `branch` only if needed, `pair` / `pairing` to `binary` or explicit partition language, and `slot` / `sector` as mathematical-use-only terms; broad compound migration labels still need explicit source/target wording.
3. `swarm_notation_compatibility_inventory` — Inventory notation that must survive the terminology freeze. Status: `review-ready`. Depends on: `reader_facing_swarm_triad_freeze`. Notes: the notation compatibility inventory below maps $I=\{1,\ldots,6\}$, $\sigma_i$, $\mathbf{Y}_i$, $\nu_i$, $\mathcal{P}$, $P_a$, $i=(a,\sigma)$, $R_a$, support-band rows, and legacy Noether core notation symbols such as $\rho_{\text{core}}$ and $\Lambda_{\text{NC}}$; preserve legacy symbols until a compatibility note or rename is explicitly accepted.
4. `swarm_terminology_cleanup_pass` — Prepare the reviewable cleanup that reconciles the priority architecture packets with the reader-facing triad. Status: `open`. Depends on: `reader_facing_swarm_triad_freeze`, `priority_label_freeze_inventory`, `swarm_notation_compatibility_inventory`. Notes: no global replacement; propose replacements one term family at a time with samples and proof-scope consequences.
5. `user_facing_corpus_merge_gate` — Decide when to start the merge in the user-facing corpus. Status: `blocked-by-terminology-freeze`. Depends on: accepted cleanup pass, notation compatibility inventory, retained certificate plan, NTB comparison, comparison against the common-support architecture material, migration batch plan, and operator approval. Notes: this is the main decision gate for `content/markdown/aaa`, simulations, scene assets, and app copy; do not start user-facing merge edits until the terminology cleanup pass and the gate both pass.
6. `swarm_model_migration` — Execute the approved user-facing corpus, priority-ledger, validation-surface, simulation, and web/app merge batches. Status: `deferred`. Depends on: `user_facing_corpus_merge_gate`. Notes: migration must use the accepted reader-facing triad or later approved replacements, not frozen priority-only labels.
7. `assembly_swarm_fallback_investigation` — If closure stalls after the triad migration, study whether assembly swarms are needed. Status: `low-priority`. Depends on: stalled closure after the triad migration. Notes: an assembly swarm would let all architrinos in an assembly participate in one swarm rather than being added externally as poles or kept separately in a nucleus.

## First Reviewable Work Packets

The immediate start should be terminology and notation, not corpus migration and not a retained-branch proof. A terminology pass decides which words name the general object, which words name local mathematical cases, and which old labels remain only as local history. A notation pass then decides which symbols are safe to preserve, which become local-case notation, and which need compatibility notes. Only after those two passes should a tiny migration sample be prepared for operator review.

| Order | Work packet | Deliverable | Review risk |
| --- | --- | --- | --- |
| 1 | `reader_facing_swarm_triad_freeze` | A compact table fixing `neutral swarm`, `shell swarm`, and `nested shell swarm` as the only reader-facing swarm taxonomy for now. | Low: terminology guardrail only. |
| 2 | `priority_label_freeze_inventory` | An approved-transition table plus a pending-label table for terms that still need decisions. | Low: prevents accidental corpus migration. |
| 3 | `swarm_notation_compatibility_inventory` | A symbol map separating base notation from optional local-case notation and legacy compatibility symbols. | Low: no formula rewrites outside the priority bucket. |

### Approved Transition Table

These rows are approved for controlled priority-side cleanup and later sampled corpus migration. They do not authorize formula-symbol, file-path, or task-id rewrites unless the row explicitly says so.

| Source wording | Approved wording | Use rule | Hold back for later |
| --- | --- | --- | --- |
| `Noether core` | `Noether swarm` | Approved prose transition. Use lowercase `swarm` in running text. | Preserve formula symbols, file paths, task identifiers, and notation such as $\rho_{\text{core}}$ and $\Lambda_{\text{NC}}$ until the notation/file-path pass. |
| `Noether Swarm` in running text | `Noether swarm` | Keep `Noether` capitalized and lowercase `swarm` in prose. | Keep `Noether Swarm` in titles, headings, scene titles, and title-case labels. |
| `neutral swarm` | `neutral swarm` | Reader-facing swarm type: broad six-architrino neutral case before required binary grouping or radial organization. | A later cleanup pass may refine the definition with operator approval. |
| `shell swarm` | `shell swarm` | Reader-facing swarm type: neutral swarm with controlled radial support. | A later cleanup pass may refine the definition with operator approval. |
| `nested shell swarm` | `nested shell swarm` | Reader-facing swarm type: shell swarm with three ordered radial support bands. | A later cleanup pass may refine the definition with operator approval. |
| `neutral knot-cloud` / `knot-cloud` | `neutral swarm` | Use when the passage means the broad six-architrino case. | Keep literal file paths, task identifiers, and source references unchanged until a file/path cleanup is approved. |
| `nested tri-binary` | `nested shell swarm` | Use when the passage means the old three-layer picture. | Do not use this transition when a proof specifically requires exact binary assumptions. |
| `exact nested tri-binary` | `nested shell swarm with exact binary assumptions` | Use only when the passage names a proof-specific exact binary condition. | Do not promote as a reader-facing swarm type. |
| `same-level tri-binary` | `shell swarm` | Use `shell swarm` when the passage means the shared-support-band case. | Avoid `same-level` as reader-facing terminology. |
| `branch` | mathematical-use-only `branch` | Keep only for solver, continuation, or solution-family mathematics. | Do not use `branch` as a reader-facing swarm type. |
| `triply` | `three ordered radial support bands` | Use descriptive wording instead of a new label. | Keep exact source quotations or identifiers unchanged until sampled cleanup. |
| `cloud` | actual mathematical object | Avoid as taxonomy; replace with the actual object when needed, such as support distribution or occupancy measure. | Sample uses before replacing because some packets may use `cloud` only as literal source history. |
| `neutral Noether-core branch` | `neutral swarm` plus mathematical `branch` only if needed | Use `neutral swarm` when the wording is reader-facing taxonomy. Keep `branch` only when a solver, continuation, or solution-family object is meant. | Preserve notation and file paths until the notation/file-path pass. |
| `pair` / `pairing` as swarm taxonomy or binary replacement | `binary`; `partition` or $\mathcal{P}$ only for the grouping | In a nested shell swarm, each shell contains one binary, so `binary` may refer to that shell when the nested shell context is clear. Use `partition`, `binary partition`, or $\mathcal{P}$ when the passage means the optional grouping of the six architrinos into three binaries, one per shell. | Do not use `pair` as the approved replacement label for a binary. Preserve formula symbols and file paths until the notation/file-path pass. |
| `slot` / `binary slot` | mathematical-use-only `slot` | Use only in standard mathematical usage, such as an argument position, coordinate position, or explicitly defined chart coordinate. | Do not use as reader-facing taxonomy; prefer `binary`, `partition`, or explicit notation $\mathcal{P}$ when describing optional grouping. |
| `sector` | mathematical-use-only `sector` | Use only in standard mathematical usage, such as a subset, invariant subspace, or solution region cut out by stated constraints. | Do not use as a reader-facing swarm type or loose workstream label. |
| `variable radius` / `variable-radius` | `nested shell swarm` or `shell swarm`, by context | Do not use as a swarm type. Shells already allow radii to vary. | If the passage means the old ordered-shell picture, use `nested shell swarm`; if it means one common support band, use `shell swarm`. |
| `fixed radius` / `fixed-radius` | idealized zero-variation case inside the relevant shell model | Do not use as a swarm type. | State the mathematical condition directly when needed: the relevant variation row is set to zero or below tolerance. |

### Notation Compatibility Inventory

This table is review-ready for priority-side cleanup. It preserves formula symbols and local residual names until the operator explicitly approves a notation/file-path pass.

| Notation | Scope | Current meaning under the swarm triad | Migration rule |
| --- | --- | --- | --- |
| $I=\{1,\ldots,6\}$ | base notation | The six architrino sites in a neutral swarm, shell swarm, or nested shell swarm branch. | Preserve. Do not replace with binary-index notation unless a partition is declared. |
| $i,j\in I$ | base notation | Site/source/receiver labels for the six architrinos. Source sums over $j\ne i$ remain all-site sums in the neutral swarm case. | Preserve. `Ordered source pair` and `all-pairs root ledger` are standard mathematical uses of pair and do not create swarm taxonomy. |
| $\sigma_i$ | base notation | Polarity sign at site $i$. | Preserve. Do not reinterpret as the second coordinate in $i=(a,\sigma)$ unless $\mathcal{P}$ is declared. |
| $\mathbf{Y}_i$ | base notation | Closed arclength curve or path for site $i$. | Preserve as the neutral-swarm notation. Partition-indexed path notation is a sector shorthand only. |
| $\nu_i$ | base notation | Bounded speed factor for site $i$. | Preserve. In partition-indexed sectors, $\nu_{a,\sigma}$ is the same speed factor written after $i=(a,\sigma)$ is available. |
| $\mathcal{P}=\{P_1,P_2,P_3\}$ | optional sector notation | Binary partition of the six architrinos into three two-site binaries. It is not part of the base neutral swarm definition. | Use only after the packet declares the optional binary partition. |
| $P_a$ | optional sector notation | The $a$th binary in the declared binary partition. In a nested shell swarm, each shell contains one binary, so the shell may also be referred to as that binary when the nested shell context is clear. | Preserve. Do not call this a `pair` or `slot` in replacement prose. |
| $i=(a,\sigma)$ | optional sector notation | Binary-index notation available only after $\mathcal{P}$ is declared: $a$ indexes one of the three binaries and $\sigma$ selects the two architrinos in that binary. | Use only in shell swarm, nested shell swarm, or exact-binary sector rows where the partition is explicit. |
| $\mathbf{x}_{a,\sigma}$ | optional sector shorthand | Partition-indexed path notation for the two architrinos in binary $a$. | Treat as shorthand for the underlying $\mathbf{Y}_i$ after $\mathcal{P}$ is declared. |
| $R_a$ | derived sector notation | Partition-indexed radius functional derived from the support descriptor and $\mathcal{P}$; it is not a primitive radius type. | Preserve formulas. In a nested shell swarm, ordered $R_a$ rows describe the three ordered shell binaries; in a shell swarm, spread rows test a common support band. |
| $\bar R$, $\mathcal{R}_{\mathrm{spread}}$, $\mathcal{G}_{ab}^R$ | derived sector rows | Radius summary, spread residual, and shell-gap residuals used to distinguish shell swarm, nested shell swarm, and transition sectors. | Preserve row symbols. Do not introduce `variable radius`, `fixed radius`, or `support radius` as swarm types. |
| $\mathcal{D}_{\mathrm{supp}}$, $R_{\mathrm{in}}$, $R_{\mathrm{out}}$ | base/support notation | Support descriptor and support-band bounds for neutral swarm and shell-sector rows. | Preserve. Use `support band` or the exact mathematical object rather than `cloud` as taxonomy. |
| $\mathcal{R}_{\mathrm{slot}}$, $\mathsf{OptionalSlot}$ | legacy residual/status notation | Existing residual and certificate labels for optional partition or sector reductions. These names are compatibility symbols, not terminology approval. | Preserve until the notation/file-path pass. In prose, say `optional binary-partition reduction row` or `optional reduction row`. |
| $\mathcal{R}_{\nu\mathrm{pair}}$ | legacy formula symbol | Existing speed-parity residual for exact-antipodal binary behavior. | Preserve as a formula symbol until the notation/file-path pass. In prose, say `binary residual`, `speed parity row`, or `exact-antipodal binary row`. |
| $Q_{\mathrm{core}}$, $\rho_{\text{core}}$, $\Lambda_{\text{NC}}$ | legacy Noether-core notation | Established legacy notation still used in priority/corpus formulas. | Preserve until a separate compatibility note or notation rename is accepted. Prose may say `Noether swarm`; formula symbols are not renamed in this pass. |

### Pending Transition Decisions

These rows remain unresolved and should be handled one term family at a time with samples.

| Source wording | Current handling | Candidate direction | Notes |
| --- | --- | --- | --- |
| broad migration phrases such as `tri-binary-to-swarm-sector` | Cleanup-controlled priority label. | Likely replace with a specific migration task or explicit source/target wording. | Needs review after `slot` and `sector` are decided. |

## Next Team-Agent Prompt

```text
Cody, continue in team-agent mode inside `reference/priorities/swarm/` only.

Context:
- The bounded speed factor proof stack now has a branch-search decision layer:
  `bounded-speed-factor-branch-search-certificate.md`,
  `bounded-speed-factor-finite-mode-branch-system.md`,
  `bounded-speed-factor-symmetry-gauge-reduction.md`, and
  `bounded-speed-factor-branch-krawczyk-decision-theorem.md`.
- No branch is retained yet. The current mathematical blocker is instantiating the first concrete bounded-speed finite-mode branch box from the exact-antipodal $M=3$ seed evidence.
- Treat fixed-speed exact-antipodal $M=3$ data as seed material only. Do not claim bounded-speed retention unless the bounded-speed root, speed, support, action, event, gauge, and Krawczyk rows all close on one live ledger.

Task:
- Instantiate the first executable bounded-speed finite-mode branch-box artifact.
- Choose the exact-antipodal $M=3$ seed chart unless a local document proves that a different seed is mathematically prior.
- Develop concrete fields for the solver artifact required by `bounded-speed-factor-finite-mode-branch-system.md` and `bounded-speed-factor-branch-krawczyk-decision-theorem.md`.

Required mathematical output:
- Finite-mode variable dimensions for $z_M=(a,\ell,c,\theta,b,\kappa,r,j,s,\mu,h,e,\gamma,\Theta,p,q,g)$, with fixed-speed-special-case columns clearly separated from active bounded-speed columns.
- Residual row inventory for $\mathcal{B}_M^\nu$, including gauge, clock, speed-band, active-root, sheet-variation, tail-cover, tangential speed ODE, normal force balance, radius, attraction/repulsion inventory, self-hit exchange, variational Noether, and Krawczyk rows.
- Gauge matrix and neutral-mode quotient: declared group actions, gauge rows, expected neutral dimension, bordered Jacobian shape, and first rank test.
- Branch box $B$: center data, coordinate radii, speed-band margins, root-sheet boxes, Jacobian floors, inactive-gap floors, radius margins, tail-cover status, self-hit/event partitions, and Noether-Sea exchange status.
- Derivative enclosure plan: active columns, Schur complements for root/support/event variables, second-root envelope constants, and stale-column rejection criteria.
- Preconditioner plan: square or range-projected row choice, SVD/rank convention, $Y_M^\nu$, $Z_M^\nu$, $\rho_{\mathrm{chart},M}^\nu$, cokernel audit, and obstruction alternative.
- First decision status: exactly one of retained candidate, event reset, certified local rejection, or proof-budget/refinement status, with the first failed row named.

Constraints:
- Edit authority: safe scoped edits allowed inside `reference/priorities/swarm/` only.
- Write new documents only in `reference/priorities/swarm/`.
- Preserve TeX delimiters and use inline `$...$` and display `$$...$$` consistently.
- Use canonical terms: architrino, bounded speed factor, causal root sheet, live ledger, self-hit, Noether Sea as standalone noun, and Noether-Sea as compound modifier.
- Do not introduce new project terminology unless the local documents already establish it.
- Do not edit `content/markdown/aaa`, simulations, scene assets, or app code.

Expected result:
- One or more concrete branch-box artifact packets in `reference/priorities/swarm/`.
- Integrations into `swarm.md`, `swarm-architecture.md`, `proof-program-and-decision-gate.md`, `current-dynamics-synthesis.md`, and the bounded-speed master/solver packets as needed.
- Validation with `git diff --check -- reference/priorities/swarm`, a terminology scan for disallowed/stale phrases, `node scripts/validate-content.mjs --check --strict`, and `node scripts/build-scene-graph.mjs --check --strict`.
- Final status must say whether the artifact is a retained candidate, event reset, certified local rejection, or proof-budget/refinement status. If no branch is retained, state the first mathematical blocker.
```

## Scope

This workstream now owns priority-only architecture development for the remembered reader-facing triad: `neutral swarm`, `shell swarm`, and `nested shell swarm`. Existing architecture packets also contain staging labels from the generalization pass. Those labels are frozen until cleanup and should be read as proof-scaffold placeholders, not as accepted reader-facing terminology. The mathematical burden remains unchanged: the architecture must preserve charge bookkeeping, conservation ledgers, Standard Model-facing mappings, Lorentz / photon closure targets, strong-field behavior, and simulation reproducibility before any corpus merge begins.

The first priority is not migration. The first priority is a reviewable terminology and notation surface that lets the operator sample the architecture shift without absorbing accidental corpus-content changes. Corpus migration, priority-ledger rewrites outside this bucket, simulations, and web/app asset changes should stay deferred until the user-facing corpus merge gate passes. During this phase, identify affected theory surfaces, decide what survives as a theorem target, and keep the inherited architecture source and nested shell swarm source material legible while the merged architecture is derived.

## Architecture And Migration Work Items

The work items below replace the inherited pre-freeze queue. Older architecture packets remain in the directory for audit and recovery, but their disputed terminology is not active workstream vocabulary.

1. `swarm_triad_definition_table` — Write a compact priority-side table for `neutral swarm`, `shell swarm`, and `nested shell swarm`. Status: `active`. Depends on: `reader_facing_swarm_triad_freeze`. Notes: this is the first operator-reviewable task because it is small, terminology-only, and does not rewrite corpus content.
2. `priority_label_freeze_inventory` — Name the priority-only labels that stay frozen until cleanup. Status: `active`. Depends on: `swarm_triad_definition_table`. Notes: keep file paths, task identifiers, literal source references, and local proof-packet text unchanged while preventing those labels from becoming reader-facing taxonomy.
3. `swarm_notation_compatibility_inventory` — Map the symbols used by the three swarm cases. Status: `review-ready`. Depends on: `swarm_triad_definition_table`, `priority_label_freeze_inventory`. Notes: see the notation compatibility inventory above; do not rename symbols until the table is accepted.
4. `priority_packet_quarantine_audit` — Mark inherited architecture packets whose titles or task names contain disputed labels as priority-only history. Status: `review-ready`. Depends on: `swarm_triad_definition_table`, `priority_label_freeze_inventory`. Notes: see the packet quarantine audit below; preserve paths for git continuity, but do not use those labels as reader-facing taxonomy or as the active workstream queue.
5. `neutral_swarm_model_restatement` — Restate the broad six-architrino neutral case under the accepted `neutral swarm` wording. Status: `review-ready`. Depends on: `swarm_triad_definition_table`, `swarm_notation_compatibility_inventory`, `priority_packet_quarantine_audit`. Notes: see the neutral swarm model restatement below; it restates the base object without promoting the quarantined generalized packet or renaming formulas.
6. `shell_swarm_model_restatement` — Restate the controlled radial-support case under `shell swarm`. Status: `open`. Depends on: `neutral_swarm_model_restatement`. Notes: keep support-band, recovery, and near-antipodal rows as mathematical conditions; do not introduce new names for subcases without approval.
7. `nested_shell_swarm_preservation_map` — Preserve the old three-layer material as `nested shell swarm` source material while separating exact binary assumptions from reader-facing terminology. Status: `open`. Depends on: `shell_swarm_model_restatement`. Notes: compare against the restored NTB causal-closure packet set without treating source labels as current public taxonomy.
8. `certificate_and_gate_repair` — Reconnect proof obligations to the accepted swarm wording after the terminology and notation tables pass review. Status: `deferred`. Depends on: `neutral_swarm_model_restatement`, `shell_swarm_model_restatement`, `nested_shell_swarm_preservation_map`. Notes: update certificate, conservation, observer-export, and migration-gate language only after the terminology pass is accepted.
9. `user_facing_corpus_merge_gate` — Decide whether and when to edit `content/markdown/aaa`, simulations, scenes, or app copy. Status: `blocked`. Depends on: accepted terminology table, notation inventory, packet quarantine audit, certificate repair, migration batch plan, and operator approval. Notes: this gate blocks broad corpus edits and file/path migration.

### Priority Packet Quarantine Audit

This audit controls how inherited packets are used while the swarm triad is being restated. It does not rename files, rewrite formula symbols, or authorize migration into `content/markdown/aaa`.

| Packet class | Files or file patterns | Quarantine decision | Safe use before cleanup |
| --- | --- | --- | --- |
| Control file | [swarm.md](swarm.md) | Active priority control file. | Use as the local authority for the reader-facing triad, transition table, notation inventory, and this quarantine audit. |
| Source transcript and signal triage | [swarm-rearchitecture-source.md](swarm-rearchitecture-source.md), [source-signal-triage.md](source-signal-triage.md) | Priority-only source material. Stale labels inside these files are historical evidence, not active terminology. | Mine for proof targets, rejected overclaims, and original source signals only through the accepted transition table. |
| Generalization packets with disputed labels | [neutral-knot-cloud-branch-model.md](neutral-knot-cloud-branch-model.md), [hybrid-variable-radius-model-card.md](hybrid-variable-radius-model-card.md), [hybrid-support-radius-functional.md](hybrid-support-radius-functional.md) | Quarantined architecture source. Their titles and legacy residual names remain for git continuity. | Mine through `neutral_swarm_model_restatement`, `shell_swarm_model_restatement`, and `nested_shell_swarm_preservation_map`; do not promote `knot-cloud`, `variable-radius`, `support-radius`, `slot`, or `same-level` as taxonomy. |
| Architecture and gate syntheses | [swarm-architecture.md](swarm-architecture.md), [proof-program-and-decision-gate.md](proof-program-and-decision-gate.md), [current-dynamics-synthesis.md](current-dynamics-synthesis.md), [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md) | Quarantined synthesis and gate material. Useful proof obligations remain valid only after restatement against the triad. | Mine for certificate rows, conservation ledgers, observer exports, mass-map targets, and migration gates after the terminology cleanup pass. |
| Legacy shell swarm branch program | [same-level-branch-mathematics.md](same-level-branch-mathematics.md), [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md), [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md), [gamma-scale-action-row.md](gamma-scale-action-row.md), [plane-normal-precession-ansatz.md](plane-normal-precession-ansatz.md), and related deformation/search packets | Priority-only theorem and solver material whose stale `same-level` wording maps to `shell swarm` when the shared-support-band case is meant. | Preserve file paths and theorem targets. Use `shell swarm` in new prose; defer broad in-file cleanup until `shell_swarm_model_restatement` or `certificate_and_gate_repair`. |
| Bounded-speed solver stack | [variable-speed-factor-extension.md](variable-speed-factor-extension.md), files beginning `bounded-speed-factor-`, [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md) | Active priority-only proof stack with stale local wording in places. Not reader-facing terminology. | Keep equations, solver schemas, branch-box rows, and residual symbols. Replace prose labels only when a row is touched for the accepted restatement or certificate repair. |
| Exact-antipodal and support-complete $M=3$ stack | files beginning `exact-antipodal-`, `support-complete-`, `tail-`, plus [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md), [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md), and [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md) | Nested shell swarm source and exact-binary proof material. Exact-antipodal assumptions remain mathematical assumptions, not reader-facing swarm names. | Preserve exact-binary and exact-antipodal mathematics. Use as comparison/fallback source for `nested_shell_swarm_preservation_map`. |
| Path names with inherited labels | file names containing `same-level`, `pair-specific`, `hybrid-support-radius`, or similar inherited labels | File-path compatibility only. The path is not terminology approval. | Preserve until a file/path cleanup is explicitly approved. New prose should use the accepted table, while links may keep legacy file names. |
| Allowed mathematical non-taxonomy uses | `ordered source pair`, `all-pairs root ledger`, `pair production`, `reciprocal multiplier pairing`, `color sector`, and true argument/coordinate `slot` usage | Not quarantine triggers by themselves. These are mathematical or physics uses, not swarm taxonomy. | Leave in place unless the passage also uses the word as a reader-facing swarm type or replacement label. |

Quarantine consequence: every packet in this directory remains `priority-only` unless a later promotion pass explicitly restates the needed theorem target, assumption, proof burden, and blocker inside `content/markdown/aaa`. No source packet here is currently promotion-ready by itself, because the retained branch certificate and user-facing corpus merge gate remain open.

### Neutral Swarm Model Restatement

Status: `review-ready`, `priority-only`. This restatement is the controlled priority-side definition of the broad neutral case. It is not a retained-branch proof and does not authorize corpus migration.

A neutral swarm branch is the six-architrino base case before any required binary partition, radial ordering, or common support band is assumed. Its base data are:

| Data | Meaning | Required at base level |
| --- | --- | --- |
| $I=\{1,\ldots,6\}$ | Six architrino site labels. | yes |
| $\sigma_i\in\{+1,-1\}$ | Polarity sign at site $i$, with exactly three positive and three negative sites. | yes |
| $Q_{\mathrm{core}}=\epsilon\sum_{i\in I}\sigma_i=0$ | Legacy neutral-inventory formula symbol. | yes; preserve notation until the notation/file-path pass |
| $\mathbf{Y}_i$ | Closed arclength curve for site $i$. | yes |
| $\nu_i$ | Bounded speed factor for site $i$. | yes, unless a fixed-speed special case explicitly sets $\nu_i\equiv1$ |
| $\mathcal{D}_{\mathrm{supp}}$ | Support descriptor, such as a hollow or annular support band with declared margins. | yes |
| $\mathcal{A}_\nu$ | Active causal-root ledger for all retained source/receiver site interactions. | yes |
| $\mathsf{Action}^{\nu}$, $\mathsf{Event}^{\nu}$, $\mathsf{Inventory}$ | Action, event, and inventory ledgers computed on the same branch convention. | yes |

The neutral inventory condition is

$$
\#\{i:\sigma_i=+1\}=3,
\qquad
\#\{i:\sigma_i=-1\}=3,
\qquad
Q_{\mathrm{core}}=0.
$$

The following data are not part of the base neutral swarm definition:

| Optional structure | When it becomes available | Restatement rule |
| --- | --- | --- |
| $\mathcal{P}=\{P_1,P_2,P_3\}$ | Only after a packet declares a binary partition. | Then $P_a$ is a binary; in a nested shell swarm each shell contains one such binary. |
| $i=(a,\sigma)$ | Only after $\mathcal{P}$ is declared. | Use as binary-index notation, not as base neutral swarm notation. |
| $R_a$ | Only after $\mathcal{P}$ and a radius functional are declared. | Treat as a derived partition-indexed radius, not a primitive radius type. |
| exact antipodality | Only after an exact-binary or exact-antipodal row is declared. | Keep as a mathematical assumption, not a reader-facing swarm type. |
| common support band | Only when the shell swarm sector is claimed. | This is a sector condition added to the neutral swarm base. |
| three ordered radial support bands | Only when the nested shell swarm sector is claimed. | This is a stronger sector condition added after the shell swarm condition. |
| occupancy measure or support distribution | Only when a coarse support-distribution claim is made. | Use the mathematical object; do not revive `cloud` as taxonomy. |

A retained neutral swarm branch would need one live certificate closing these rows on the same branch convention:

| Certificate row | Required content |
| --- | --- |
| neutral inventory | three positive and three negative sites, neutral total, source-site inventory |
| curves and speeds | closed curves, bounded speed factors or fixed-speed special row, period or winding closure |
| support | support descriptor, support margins, noncollision, and any hollow-center exclusion claimed |
| causal roots | finite active roots, positive Jacobian floors, inactive-gap margins, and same-source policy |
| dynamics | force, tangent, normal, support, and speed rows computed from the same root ledger |
| action and event ledgers | energy, momentum, angular momentum, charge, source provenance, self-hit, boundary, and exchange rows |
| optional reductions | binary partition, exact-antipodal, shell swarm, or nested shell swarm rows only if claimed |
| observer exports | Lorentz, photon, mass, generation, color, and strong-field rows marked `passed`, `failed`, or `not_computed` |

Promotion decision: `priority-only`. The neutral swarm restatement is a definition and certificate target, not a corpus-ready theorem. The blocker is a retained or rigorously rejected neutral swarm branch certificate with the rows above populated on one live ledger.

## Architecture Files

The sibling files in this directory are inherited priority packets. Their path names and legacy descriptions are preserved for git continuity and audit, not as terminology approval. Nested shell swarm causal-closure packets live separately in [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md) and remain source material until the cleanup pass decides how each packet maps into the triad.

| File | Current role in architecture development |
| --- | --- |
| [neutral-knot-cloud-branch-model.md](neutral-knot-cloud-branch-model.md) | Quarantined generalized-packet source introduced before the clean scene triad. Mine only through `neutral_swarm_model_restatement`. |
| [hybrid-variable-radius-model-card.md](hybrid-variable-radius-model-card.md) | Quarantined nested shell swarm source packet. Mine only after the triad definition table and notation inventory are accepted. |
| [hybrid-support-radius-functional.md](hybrid-support-radius-functional.md) | Legacy radius-functional source packet. Preserve formulas; defer terminology changes until the notation inventory. |
| [swarm-architecture.md](swarm-architecture.md) | Quarantined architecture draft. Mine for certificate obligations after terminology repair. |
| [proof-program-and-decision-gate.md](proof-program-and-decision-gate.md) | Quarantined gate map. Reconnect gates to accepted swarm wording only after the cleanup pass. |
| [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md) | Composite promotion theorem for moving a shell swarm branch from priority-only candidate to retained branch candidate. |
| [current-dynamics-synthesis.md](current-dynamics-synthesis.md) | Current dynamics conclusion and next intrinsic-curve solve target. |
| [source-signal-triage.md](source-signal-triage.md) | Triage of the rearchitecture source discussion into converted theorem targets, blockers, priority-only signals, and rejected overclaims. |
| [same-level-branch-mathematics.md](same-level-branch-mathematics.md) | Shell swarm branch chart, history space, causal-root ledger, Jacobian floor, finite-memory, regularized DDE, weak-limit, and tangential-closure targets. |
| [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md) | Carrier families, phase-lock residuals, noncollision node clearances, framed-wake parity targets, angular-momentum ledgers, and color scaffold. |
| [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) | Worked zero-offset octahedral carrier with exact noncollision floor, partner-root calculation, same-source root status, first cross-root/Jacobian screening, and rigid neutral tangential-residual failure. |
| [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md) | Phase-offset and radial-support diagnostics showing rigid octahedral rows improve but do not close force balance. |
| [polarity-phase-rigid-screen-results.md](polarity-phase-rigid-screen-results.md) | Neutral polarity-assignment and rigid phase-offset screen showing polarity reassignment helps slightly but does not retain a rigid branch. |
| [force-balance-reduction.md](force-balance-reduction.md) | Projection reduction for partner, cross-binary, self/fold-layer, and medium-response terms in tangential and radial/support closure. |
| [deformed-carrier-dynamics-ansatz.md](deformed-carrier-dynamics-ansatz.md) | Low-order deformation variables, root/force linearization, and ansatz packets for radial breathing, phase modulation, plane-normal precession, antipodal relaxation, and center-gauge motion. |
| [low-order-deformation-search-results.md](low-order-deformation-search-results.md) | First bounded deformation search showing radial breathing improves tangential residuals but fails speed/radial closure. |
| [pair-specific-deformation-search-results.md](pair-specific-deformation-search-results.md) | Site-specific radial and speed-coupled phase screen showing better speed/root behavior but persistent tangential and support residuals. |
| [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md) | Arclength-clock reduction replacing naive angle-clock speed residuals with period, tangent, and curvature closure for deformed curves. |
| [arclength-deformation-search-results.md](arclength-deformation-search-results.md) | Arclength-clock common-breathing screen: tangential improvement survives, but force-versus-curvature closure still fails. |
| [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) | Intrinsic delayed curve equation and curve-level residual vector for retained shell swarm dynamics. |
| [variable-speed-factor-extension.md](variable-speed-factor-extension.md) | Bounded speed factor model with modified root Jacobians, tangential acceleration, and short self-hit rows. |
| [bounded-speed-factor-proof-stack-impact-map.md](bounded-speed-factor-proof-stack-impact-map.md) | Impact map for redoing fixed-speed proof rows on the bounded speed factor ledger. |
| [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md) | Executable finite-mode protocol for solving bounded speed factor branches with augmented variables and first-event rows. |
| [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md) | Branch-search decision certificate defining the bounded-speed chart, residual, margin vector, trichotomy, and solver report needed to accept, reject, or event-reset a candidate box. |
| [bounded-speed-factor-finite-mode-branch-system.md](bounded-speed-factor-finite-mode-branch-system.md) | Finite-mode branch system for the bounded speed factor search, including variables, residual rows, dimension counts, and solver artifact schema. |
| [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md) | Symmetry and gauge reduction packet for removing neutral modes and building bordered bounded-speed branch matrices. |
| [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md) | Interval/Krawczyk decision theorem for accepting, rejecting, or deferring bounded-speed branch boxes on one live ledger. |
| [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md) | Center-time/event-time dynamics packet deriving $\dot{\mathbf{x}}_i$, $\ddot{\mathbf{x}}_i$, $G_{ij}^{\nu}$, $J_{ij}^{\nu}$, and force projection residuals from $\nu_i$. |
| [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md) | Speed-ODE solvability packet for zero-mean tangent forcing, primitive excursion, speed-band feasibility, and clock/length closure. |
| [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md) | Normal reconstruction theorem for rebuilding closed arclength curves from the bounded-speed normal force row after the speed ODE closes. |
| [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md) | Coupled fixed-point theorem target joining curves, bounded speed factors, roots, support rows, action scale, and event rows into one live-ledger Krawczyk certificate. |
| [bounded-speed-factor-event-normal-forms.md](bounded-speed-factor-event-normal-forms.md) | Event normal forms for bounded-speed continuation, including speed-band, period, root-fold, self-hit, and antipodal speed-pair events. |
| [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md) | Self-hit return lemma for bounded speed factor excursions, with nontrapping, repulsive-potential, dwell-time, and overspeed-budget rows. |
| [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md) | Free-support bounded-speed dynamics packet separating closed arclength curves in $\mathbb{R}^3$ from the ideal zero-variation shell case. |
| [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md) | Action compatibility theorem adding support multipliers, support work, and Noether rows for free-support bounded-speed branches. |
| [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md) | Inventory theorem for the $3$ attractive / $2$ repulsive neutral source-site count and its weighted delayed-force interpretation. |
| [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md) | Force-moment decomposition turning the $3$-$2$ source-site inventory into weighted tangent-power, normal-curvature, and support-radial diagnostics without overclaiming closure. |
| [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) | Causal-time root-sheet and force-derivative certificate needed before bounded-speed tail/root data can enter Krawczyk proof budgets. |
| [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md) | Second root-sheet variation lemma giving $D^2\eta^\nu$, $D^2J^\nu$, force-weight Hessians, and Krawczyk/Hessian export constants. |
| [bounded-speed-factor-tail-krawczyk-certificate.md](bounded-speed-factor-tail-krawczyk-certificate.md) | Support-tail and Krawczyk certificate for bounded-speed causal-time slabs. |
| [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md) | Finite tail-cover completeness lemma requiring owned causal-time tail cells, terminal predicates, overlap consistency, and coefficient-box persistence before $\rho_{\mathrm{tail}}^\nu$ is usable. |
| [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md) | Action, Noether, Hessian, monodromy, and observer-export closure packet for bounded-speed branches. |
| [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md) | Variational Noether closure packet relating speed-factor Euler-Lagrange rows, speed ODE, storage/exchange, support work, period multipliers, and Noether currents. |
| [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md) | Self-hit exchange closure packet ledgering speed energy, self-hit potential, support/constraint/medium work, endpoint jumps, and event provenance over a finite self-hit window. |
| [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md) | Master retained-branch theorem target for the bounded speed factor model, with fixed-speed rows as the $\nu_i\equiv1$ special case. |
| [plane-normal-precession-ansatz.md](plane-normal-precession-ansatz.md) | Intrinsic arclength precession ansatz and residual rows for nonplanar shell swarm carrier deformation. |
| [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md) | Common nonplanar arclength screen: curvature alignment improves, but tangential closure and Jacobian margin remain open. |
| [binary-specific-plane-normal-search-results.md](binary-specific-plane-normal-search-results.md) | Binary-specific normal-mode screen showing non-refining residual valleys without hard period/Jacobian constraints. |
| [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md) | Local rank screen showing the six-variable radial-plus-normal ansatz is independent but insufficient for intrinsic residual closure. |
| [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md) | $M=2$ exact-antipodal vector Fourier rank screen with full local rank and useful clipped descent directions. |
| [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md) | First bounded nonlinear $M=2$ solve: strong training-grid descent, but off-grid residual peaks and period/unit rows remain open. |
| [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) | Denser-grid $M=2$ restart: refined force residuals improve, but period-length closure becomes the blocker. |
| [period-closure-and-winding-targets.md](period-closure-and-winding-targets.md) | Equal-period and rational-winding rows needed to retain force-improving intrinsic curves. |
| [equal-period-projection-results.md](equal-period-projection-results.md) | Minimum-norm equal-period projection preserving root floors while keeping the best refined $M=2$ force progress mostly intact. |
| [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) | Equal-period constraint-qualification lemma and restricted residual target on $\ker D\mathbf{L}$. |
| [rational-winding-screen-results.md](rational-winding-screen-results.md) | Low-integer winding screen rejecting nontrivial winding support in the current refined $M=2$ lengths. |
| [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md) | Reparameterization lemma separating physical force rows from construction-speed chart rows. |
| [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md) | Variation formulas for inverse arclength phase, tangent, curvature, and delayed source phase. |
| [branch-tangent-sensitivity-equations.md](branch-tangent-sensitivity-equations.md) | Branch-tangent sensitivity equations for roots, forces, residuals, action rows, and event margins. |
| [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) | Arclength-inverse rescore showing equal-period/root stability but persistent force residuals and $\Gamma$-convention sensitivity. |
| [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) | Equal-period-restricted rank screen showing full local arclength-inverse rank and oversized Newton step. |
| [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md) | Trust-region screen showing real restricted descent through $\rho=0.8$ but root-count loss at larger radius. |
| [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md) | Exact-antipodal $M=3$ rank and trust screen with full restricted rank, root-preserving descent through $\rho=0.3$, and root-ledger loss at $\rho=0.4$. |
| [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) | Root-frontier packet showing the $M=3$ root loss is an $\eta_{\max}=4$ memory-window exit and that extended-window descent survives. |
| [adaptive-root-front-dynamics.md](adaptive-root-front-dynamics.md) | Root-front velocity and memory-crossing theorem target for the $M=3$ fixed-window exit near $\rho\approx0.32056$. |
| [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) | Trust-radius lemma for preserving active roots, support memory, tail certificates, and ledger consistency across continuation steps. |
| [branch-event-classification-theorem.md](branch-event-classification-theorem.md) | First-event classification theorem for exact-antipodal $M=3$ continuation and proof-budget versus true-obstruction separation. |
| [branch-event-normal-forms.md](branch-event-normal-forms.md) | Local event-surface normal forms and reset rules for exact-antipodal $M=3$ branch continuation. |
| [adaptive-memory-action-row.md](adaptive-memory-action-row.md) | Adaptive memory/action row deriving a support-bound finite-memory criterion and its $\Gamma_K$ ledger obligations. |
| [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) | Tail-root exclusion certificate for proving no delayed roots exist beyond the active window before calling memory support-complete. |
| [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) | Tail-root assimilation theorem for extending the root ledger when support-tail roots exist. |
| [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md) | Concrete exact-antipodal $M=3$ tail-resolution protocol for the $\rho=0.8$ support gap beyond $\eta_{\mathrm{mem}}=4.5$. |
| [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md) | Executable interval enclosures for tail-slab distance, Jacobian, endpoint, and Lipschitz tests. |
| [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md) | Interval Newton and Krawczyk refinement for certifying empty tail cells or unique tail-root tubes. |
| [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md) | Coefficient-box sensitivity formulas that turn pointwise tail margins into a proof-budget radius $\rho_{\mathrm{tail}}$. |
| [support-complete-m3-tail-slab-schedule.md](support-complete-m3-tail-slab-schedule.md) | Support-tail slab schedule requiring one owned coefficient-box persistent terminal predicate per atomic cell. |
| [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) | Mesh-lift theorem upgrading nodewise $M=3$ tail certificates to continuous arclength-cell certificates. |
| [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) | Executable support-tail ledger for endpoint ownership, cell margins, coefficient-box persistence, and master-error export. |
| [support-complete-m3-tail-algorithm-termination.md](support-complete-m3-tail-algorithm-termination.md) | Finite termination theorem for adaptive support-tail subdivision under regular tail hypotheses. |
| [support-complete-m3-tail-frontier-shrinkage.md](support-complete-m3-tail-frontier-shrinkage.md) | Diagnostic split of the unresolved support tail using the observed $\eta_{\max}=4.5$ and $5.0$ rescoring agreement. |
| [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) | Root-sheet variation theorem for differentiating assimilated tail sheets through force, curl, action, and Krawczyk rows. |
| [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) | Worst-case omitted-force and curvature-residual error bound when the finite-memory tail is not yet certified absent. |
| [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md) | Exact-antipodal parity calculation for force, tangential residuals, curvature residuals, and antipodal-relaxation trigger rules. |
| [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md) | Row-aware pair-parity and binary-Fourier block decomposition for obstruction and midpoint-relaxation decisions. |
| [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) | Left-null/cokernel obstruction certificate for deciding whether exact-antipodal dynamics is locally blocked on a support-complete ledger. |
| [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md) | Root-dependent adjoint cokernel equations, obstruction scalar bounds, and relaxation-column projected-range tests. |
| [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) | Constructive support-complete Newton closure test splitting range closure from cokernel tolerance. |
| [support-complete-m3-successor-certificate-target.md](support-complete-m3-successor-certificate-target.md) | Composite exact-antipodal $M=3$ successor target for distinguishing active-window descent, support-complete closure, and true obstruction. |
| [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md) | Executable solve theorem for the exact-antipodal $M=3$ decision sequence and exhaustive statuses. |
| [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md) | Support-complete exact-antipodal $M=3$ residual and corrector system for deciding candidate, obstruction, or refinement. |
| [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md) | Support-complete exact-antipodal $M=3$ action-scale protocol for deriving $\Gamma_B$ instead of fitting $\Gamma_K$. |
| [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md) | Krawczyk proof-budget certificate for support-complete exact-antipodal $M=3$ range/cokernel closure. |
| [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) | Single-ledger proof budget after tail closure for chart radius, derivative envelopes, Krawczyk, cokernel, and action rows. |
| [support-complete-m3-augmented-root-corrector.md](support-complete-m3-augmented-root-corrector.md) | Augmented exact-antipodal $M=3$ corrector with retained delayed roots as explicit variables. |
| [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md) | Exact-antipodal mode-refinement certificate for testing M4/M5 columns before opening antipodal relaxation. |
| [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md) | Exact-antipodal $M=3$ Noether/event handoff after a dynamics/action candidate. |
| [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md) | Exact-antipodal $M=3$ stability handoff after dynamics/action and Noether/event closure. |
| [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md) | Exact-antipodal $M=3$ finite-mode convergence handoff from finite support-complete candidates to a curve-level candidate. |
| [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md) | Master exact-antipodal $M=3$ retention theorem and normalized certificate. |
| [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md) | Pseudo-arclength continuation theorem for a support-complete exact-antipodal $M=3$ dynamics/action branch. |
| [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md) | Lyapunov-Schmidt branch-switch and symmetry-breaking theorem for support-complete dynamics/action zeros. |
| [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) | Mesh-refinement certificate for off-grid residual, root-ledger, and projector-drift errors. |
| [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md) | Convergence theorem target from uniformly certified finite-mode rows to a curve-level branch. |
| [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) | Pair-midpoint column/range certificate for deciding whether antipodal relaxation is the right next chart. |
| [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md) | Pair-midpoint chart for relaxing exact antipodality while preserving center gauge, inventory, and branch-certificate obligations. |
| [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md) | Concrete retained-branch search protocol with state variables, root solver, residual objective, continuation, stability diagnostics, and acceptance thresholds. |
| [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md) | Fourier/collocation solver protocol for the intrinsic curve equation with gauges, roots, barriers, and output schema. |
| [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md) | Finite-mode first-order balance matrix around the rigid octahedral carrier, with rank/solvability theorem targets. |
| [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md) | Minimal arclength-clock dynamics closure theorem target and residual/transversality conditions. |
| [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md) | Perturbation and barrier lemma for preserving active root labels, Jacobian floors, and finite memory in intrinsic solves. |
| [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md) | Ordinary same-curve self-root exclusion lemma and fold-layer obligation. |
| [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md) | Regulated fold-layer action and weak-limit theorem target for admissible self/fold contributions. |
| [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md) | Constitutive theorem target for admissible medium-response force and event exchange. |
| [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md) | Per-root force derivative and projected-force Lipschitz envelope for certificate constants. |
| [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) | Floquet/return-map stability certificate computed on the same root ledger as the dynamics row. |
| [root-dependent-variational-equation.md](root-dependent-variational-equation.md) | Root-dependent variational equation and monodromy construction behind retained-branch Floquet multipliers. |
| [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md) | Action-side stability theorem with second root sensitivities, Hessian quotient, Morse index, and Floquet compatibility. |
| [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) | Noether/action-aware stability classification distinguishing conservative reciprocal multipliers from dissipative contraction. |
| [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) | Noether and gauge neutral-mode quotient theorem for expected Hessian nullity and unit multipliers. |
| [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md) | Krein-signature stability theorem for conservative unit-circle multipliers and collision risk. |
| [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md) | Energy-momentum symplectic-slice theorem for conservative orbital stability modulo symmetries. |
| [gamma-scale-action-row.md](gamma-scale-action-row.md) | Scale/action row for deriving $\Gamma_K$ from branch inertia and history action rather than fitting it. |
| [history-force-variationality-condition.md](history-force-variationality-condition.md) | Work one-form exactness and curl test for deciding whether a delayed-force ledger is action-derived. |
| [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md) | Projection identity and compatibility bounds separating fitted $\Gamma_K$ from action-derived $\Gamma_B$. |
| [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md) | Noether/action closure theorem for event conservation on one root, action, inventory, and event ledger. |
| [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md) | Neutral/charged inventory rows, central-inventory split, pair-production provenance, reaction conservation, recoil, Noether-Sea updates, and heat-channel restrictions. |
| [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md) | Lorentz/moving-branch exports, photon transition, mass/exposure map, generation/color rows, and strong-field/cosmology export residuals. |
| [swarm-rearchitecture-source.md](swarm-rearchitecture-source.md) | Deferred source discussion and analysis packet for the swarm architecture switch; mine selectively, do not promote wholesale. |

## Promotion Decision

Current architecture material is `priority-only`. It is not ready for direct promotion into `content/markdown/aaa`, and it does not authorize broad migration or merge edits, until the reader-facing triad has a completed terminology cleanup pass, the frozen priority-only labels have accepted replacements or demotions, the necessary certificate packets are retained, the charge/provenance replacement for the former axial layer is settled, and the user-facing corpus merge gate passes.
