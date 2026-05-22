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

Git diagnosis: commit `5f830d3f` created the Noether Swarm hub and the six scene names using the clean `Noether Swarm`, `Neutral Swarm`, `Shell Swarm`, `Nested Shell Swarm`, `Swarm Geometry`, and `Swarm Dynamics` vocabulary. Commit `73d34ddd` had earlier introduced a separate generalized priority packet with disputed working labels. This control file now treats those disputed labels as quarantined priority history, not as accepted terminology.

| Reader-facing term | Working meaning for now | Status |
| --- | --- | --- |
| `neutral swarm` | The broad six-architrino neutral case before any required binary grouping or radial organization is assumed. | Accepted-for-now reader-facing term. |
| `shell swarm` | A neutral swarm whose six architrino paths remain in a controlled radial support band. | Accepted-for-now reader-facing term. |
| `nested shell swarm` | A shell swarm with three ordered radial support bands. | Accepted-for-now reader-facing term. |

All priority-only labels introduced during the architecture generalization are frozen. They may remain in existing file names, task identifiers, literal source references, and local proof-packet text until a cleanup pass reviews them, but they must not be promoted as reader-facing taxonomy or treated as accepted replacement terminology. Frozen labels include `neutral knot-cloud`, `knot-cloud`, `cloud`, `same-level`, `slot`, `sector`, `branch` when used as a public taxonomy label rather than a mathematical solution-family term, `triply`, and broad migration phrases such as `tri-binary-to-swarm-sector`.

`Noether Swarm` remains the current chapter/workstream umbrella. Do not globally replace `Noether core` with `Noether swarm` in corpus prose, formulas, file paths, or notation until the cleanup pass decides how legacy Noether-core usage maps into the triad.

## Task Queue

1. `reader_facing_swarm_triad_freeze` — Keep `neutral swarm`, `shell swarm`, and `nested shell swarm` as the only accepted reader-facing swarm taxonomy until the terminology cleanup pass. Status: `active`. Depends on: none. Notes: do not promote priority-only labels from architecture packets into corpus prose, simulations, scenes, or app copy.
2. `priority_label_freeze_inventory` — Inventory the priority-only labels that must not be promoted without review. Status: `active`. Depends on: `reader_facing_swarm_triad_freeze`. Notes: freeze `neutral knot-cloud`, `knot-cloud`, `cloud`, `same-level`, `slot`, `sector`, `triply`, and public-taxonomy uses of `branch`; keep literal file paths, task identifiers, and source labels unchanged until a cleanup plan is accepted.
3. `swarm_notation_compatibility_inventory` — Inventory notation that must survive the terminology freeze. Status: `active`. Depends on: `reader_facing_swarm_triad_freeze`. Notes: map $I=\{1,\ldots,6\}$, $\sigma_i$, $\mathbf{Y}_i$, $\nu_i$, $\mathcal{P}$, $P_a$, $i=(a,\sigma)$, $R_a$, support-band rows, and legacy Noether core notation symbols such as $\rho_{\text{core}}$ and $\Lambda_{\text{NC}}$; preserve legacy symbols until a compatibility note or rename is explicitly accepted.
4. `swarm_terminology_cleanup_pass` — Prepare the reviewable cleanup that reconciles the priority architecture packets with the reader-facing triad. Status: `open`. Depends on: `reader_facing_swarm_triad_freeze`, `priority_label_freeze_inventory`, `swarm_notation_compatibility_inventory`. Notes: no global replacement; propose replacements one term family at a time with samples and proof-scope consequences.
5. `user_facing_corpus_merge_gate` — Decide when to start the merge in the user-facing corpus. Status: `blocked-by-terminology-freeze`. Depends on: accepted cleanup pass, notation compatibility inventory, retained certificate plan, NTB comparison, comparison against the common-support architecture material, migration batch plan, and operator approval. Notes: this is the main decision gate for `content/markdown/aaa`, simulations, scene assets, and app copy; do not start user-facing merge edits until the terminology cleanup pass and the gate both pass.
6. `swarm_model_migration` — Execute the approved user-facing corpus, priority-ledger, validation-surface, simulation, and web/app merge batches. Status: `deferred`. Depends on: `user_facing_corpus_merge_gate`. Notes: migration must use the accepted reader-facing triad or later approved replacements, not frozen priority-only labels.

## First Reviewable Work Packets

The immediate start should be terminology and notation, not corpus migration and not a retained-branch proof. A terminology pass decides which words name the general object, which words name local mathematical cases, and which old labels remain only as local history. A notation pass then decides which symbols are safe to preserve, which become local-case notation, and which need compatibility notes. Only after those two passes should a tiny migration sample be prepared for operator review.

| Order | Work packet | Deliverable | Review risk |
| --- | --- | --- | --- |
| 1 | `reader_facing_swarm_triad_freeze` | A compact table fixing `neutral swarm`, `shell swarm`, and `nested shell swarm` as the only reader-facing swarm taxonomy for now. | Low: terminology guardrail only. |
| 2 | `priority_label_freeze_inventory` | A frozen-label table naming terms that may remain in priority files but may not be promoted into reader-facing taxonomy. | Low: prevents accidental corpus migration. |
| 3 | `swarm_notation_compatibility_inventory` | A symbol map separating base notation from optional local-case notation and legacy compatibility symbols. | Low: no formula rewrites outside the priority bucket. |

### Current Label Decisions

These rows replace the earlier partial translation table. They deliberately avoid approving broad replacements.

| Wording | Current status | Use now | Hold back for later |
| --- | --- | --- | --- |
| `neutral swarm`, `shell swarm`, `nested shell swarm` | Accepted-for-now reader-facing triad. | Use these as the only reader-facing taxonomy while cleanup is pending. | A later cleanup pass may refine definitions or replace one term with operator approval. |
| `Noether Swarm` | Umbrella chapter/workstream name. | Use for the page or workstream that contains the triad. | Do not globally replace `Noether core` until legacy usage and notation are mapped. |
| `Noether core` | Legacy corpus term still in force where it appears. | Preserve in existing corpus prose, notation, file paths, and formulas unless a specific cleanup sample is accepted. | Decide whether each occurrence maps to `neutral swarm`, `shell swarm`, `nested shell swarm`, or remains a legacy Noether-core term. |
| `nested tri-binary` | Legacy/source wording. | Treat as source terminology or as a candidate mapping to `nested shell swarm` only in explicitly reviewed samples. | Do not global-replace exact proof-packet language until the cleanup pass separates exact binary assumptions from reader-facing swarm taxonomy. |
| `neutral knot-cloud`, `knot-cloud`, `cloud`, `same-level`, `slot`, `sector`, `triply`, public-taxonomy `branch` | Frozen priority-only labels. | Leave in file paths, task identifiers, literal source references, and local proof-packet text until reviewed. | Replace, retain, or demote one term family at a time in the cleanup pass. |

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
- Residual row inventory for $\mathcal{B}_M^\nu$, including gauge, clock, speed-band, active-root, sheet-variation, tail-cover, tangential speed ODE, normal force balance, support-radius, attraction/repulsion inventory, self-hit exchange, variational Noether, and Krawczyk rows.
- Gauge matrix and neutral-mode quotient: declared group actions, gauge rows, expected neutral dimension, bordered Jacobian shape, and first rank test.
- Branch box $B$: center data, coordinate radii, speed-band margins, root-sheet boxes, Jacobian floors, inactive-gap floors, support-radius margins, tail-cover status, self-hit/event partitions, and Noether-Sea exchange status.
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
3. `swarm_notation_compatibility_inventory` — Map the symbols used by the three swarm cases. Status: `active`. Depends on: `swarm_triad_definition_table`, `priority_label_freeze_inventory`. Notes: include $I=\{1,\ldots,6\}$, $\sigma_i$, $\mathbf{Y}_i$, $\nu_i$, optional pair partitions, shell support radii, and legacy symbols such as $\rho_{\text{core}}$ and $\Lambda_{\text{NC}}$; do not rename symbols until the table is accepted.
4. `priority_packet_quarantine_audit` — Mark inherited architecture packets whose titles or task names contain disputed labels as priority-only history. Status: `active`. Depends on: `swarm_triad_definition_table`, `priority_label_freeze_inventory`. Notes: preserve paths for git continuity, but do not use those labels as reader-facing taxonomy or as the active workstream queue.
5. `neutral_swarm_model_restatement` — Restate the broad six-architrino neutral case under the accepted `neutral swarm` wording. Status: `open`. Depends on: `swarm_triad_definition_table`, `swarm_notation_compatibility_inventory`, `priority_packet_quarantine_audit`. Notes: start from the mathematical content in the inherited generalized packet, but replace disputed wording only after the operator accepts the translation table.
6. `shell_swarm_model_restatement` — Restate the controlled radial-support case under `shell swarm`. Status: `open`. Depends on: `neutral_swarm_model_restatement`. Notes: keep support-band, recovery, and near-antipodal rows as mathematical conditions; do not introduce new names for subcases without approval.
7. `nested_shell_swarm_preservation_map` — Preserve the old three-layer material as `nested shell swarm` source material while separating exact binary assumptions from reader-facing terminology. Status: `open`. Depends on: `shell_swarm_model_restatement`. Notes: compare against the restored NTB causal-closure packet set without treating source labels as current public taxonomy.
8. `certificate_and_gate_repair` — Reconnect proof obligations to the accepted swarm wording after the terminology and notation tables pass review. Status: `deferred`. Depends on: `neutral_swarm_model_restatement`, `shell_swarm_model_restatement`, `nested_shell_swarm_preservation_map`. Notes: update certificate, conservation, observer-export, and migration-gate language only after the terminology pass is accepted.
9. `user_facing_corpus_merge_gate` — Decide whether and when to edit `content/markdown/aaa`, simulations, scenes, or app copy. Status: `blocked`. Depends on: accepted terminology table, notation inventory, packet quarantine audit, certificate repair, migration batch plan, and operator approval. Notes: this gate blocks broad corpus edits and file/path migration.

## Architecture Files

The sibling files in this directory are inherited priority packets. Their path names and legacy descriptions are preserved for git continuity and audit, not as terminology approval. Nested shell swarm causal-closure packets live separately in [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md) and remain source material until the cleanup pass decides how each packet maps into the triad.

| File | Current role in architecture development |
| --- | --- |
| [neutral-knot-cloud-branch-model.md](neutral-knot-cloud-branch-model.md) | Quarantined generalized-packet source introduced before the clean scene triad. Mine only through `neutral_swarm_model_restatement`. |
| [hybrid-variable-radius-model-card.md](hybrid-variable-radius-model-card.md) | Quarantined variable-radius source packet. Mine only after the triad definition table and notation inventory are accepted. |
| [hybrid-support-radius-functional.md](hybrid-support-radius-functional.md) | Support-radius functional source packet. Preserve formulas; defer terminology changes until the notation inventory. |
| [swarm-architecture.md](swarm-architecture.md) | Quarantined architecture draft. Mine for certificate obligations after terminology repair. |
| [proof-program-and-decision-gate.md](proof-program-and-decision-gate.md) | Quarantined gate map. Reconnect gates to accepted swarm wording only after the cleanup pass. |
| [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md) | Composite promotion theorem for moving a same-level branch from priority-only candidate to retained branch candidate. |
| [current-dynamics-synthesis.md](current-dynamics-synthesis.md) | Current dynamics conclusion and next intrinsic-curve solve target. |
| [source-signal-triage.md](source-signal-triage.md) | Triage of the rearchitecture source discussion into converted theorem targets, blockers, priority-only signals, and rejected overclaims. |
| [same-level-branch-mathematics.md](same-level-branch-mathematics.md) | Branch chart, history space, causal-root ledger, Jacobian floor, finite-memory, regularized DDE, weak-limit, and tangential-closure targets. |
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
| [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) | Intrinsic delayed curve equation and curve-level residual vector for retained same-level dynamics. |
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
| [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md) | Free-support bounded-speed dynamics packet separating closed arclength curves in $\mathbb{R}^3$ from the fixed-radius special sector. |
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
| [plane-normal-precession-ansatz.md](plane-normal-precession-ansatz.md) | Intrinsic arclength precession ansatz and residual rows for nonplanar same-level carrier deformation. |
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
