# Braid Intake Prompts — Verbatim Archive

Claim level. Priority-only archive, 2026-07-08, branch `codex/calcite`. This file preserves, verbatim, every braid prompt and thread handoff the operator supplied during the Phase 1 intake of the braid priority sort. Its companion `braid-intake-ledger.md` holds the classification and routing; this file holds the full text so the handoffs survive thread deletion and can be pasted directly into fresh threads. Operator side-notes are kept as block quotes after each prompt. Nothing here is edited from the source; it is a capture, not a rewrite.

Contents: Section 1 — saved prompt set (Prompts 09, 11–16). Section 2 — thread handoff prompts (`p10`, `o7`, and three unlabeled). Section 3 — `t1` last-turn summary. Ledger cross-reference: `p10`→Prompt 10 (§2.1); `o7`→Prompt 07 (§2.4); `unlabeled-1`→§2.2; `unlabeled-2`→§2.3; `unlabeled-3`→§2.5; `t1`→§3; saved prompts P09/P11–P16→§1.

---

## Section 1 — Saved Prompt Set (Prompts 09, 11–16)

Preamble as supplied:

> Braid-Ideal Thread Prompt Set — 2026-07-07
>
> Ordered, copy-pasteable goal-seeking thread prompts derived from the grouped Task Queue in reference/priorities/braid-ideal/priorities.md, with the braid-scene reorganization phases first per the operator's reorganization-first ranking. Group B item 9 (accessory_dressing_placement_decision) is resolved-superseded-by-scene-reorganization and is covered by Prompt 02; it gets no separate prompt.
>
> Every prompt carries the same standing-constraints block. Each thread applies reference/op/codex-goal-seeking-prompt-template.md as its meta wrapper.
>
> Dependency map (one line): ; 09 waits on a named row from 04 or 05; 11–16 mutually parallel anytime,

### 1.1 Prompt 09 — Group A items 6+7 (pair): self_hit_held_release_solver_row + native_retained_history_promotion

````text
Prompt 09 — Group A items 6+7 (pair): self_hit_held_release_solver_row + native_retained_history_promotion

Closure goal: Promote the held-release seed into a retained-history solver row with same-source self-hits enabled, then run the native central-solver retained-history path on the named row from the sweep or breathing hunt with the operator acceptance decision made in this same thread.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Gate: requires a named row from `angular_momentum_held_release_sweep` or `breathing_ansatz_eigen_braid_hunt`. If no named row exists, stop and return the gate status; do not open a search loop.
- Read first: reference/priorities/braid-ideal/priorities.md Group A items 6–7; reference/priorities/braid-ideal/sh-0-retained-history-evidence-audit.md (evidence-boundary map and the seed-path acceptance-certificate blocker); scripts/braid-ideal/self-hit-held-release-solver-row.mjs; scripts/braid-ideal/central-solver-retained-history-row.mjs; scripts/braid-ideal/central-solver-retained-source-adapter.mjs; scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs; their tests under tests/braid-ideal-*.test.js; AGENTS.md Solver Ownership section.
- Write ownership: the scripts and tests above; sh-0-retained-history-evidence-audit.md and sh-run-matrix.md updates; work-log and queue updates in the braid-ideal lane.
- Avoid touching: the native central solver itself beyond the existing bridge/ABI surfaces (extend the contract only if a capability is missing, never a parallel solver); corpus chapters.

Task:
1. Promote the held-release seed from the priority-only partner-wake toy into a retained-history solver row with same-source self-hits enabled, carrying root-ledger rows and a declared same-level failure-or-survival diagnostic after the first near pass.
2. Run the native central-solver retained-history path on the named row through the shared bridge; bind seed path rows, durable path-history stream refs, root-ledger detail refs, causal replay refs, action closure, wake history, retained record id, and source row id.
3. Put the operator acceptance decision for the resulting certificate chain in this thread (fixed-choice format), so the chain cannot re-enter a search loop.
4. Update the evidence audit and run matrix; update queue state per AGENTS.md.

Success condition (moves proof state): the named row runs end-to-end on the native retained-history path and the operator records an explicit accept or reject on the certificate chain — the SH-0 evidence boundary advances from "provider-backed seed-path blocker" to a decided state either way.
Failure condition (moves proof state): the chain blocks at a specific acceptance-certificate or ledger requirement — record the exact named blocker row fail-closed in the evidence audit, replacing the current generic blocker with a sharper one.

Standing constraints: every output fail-closed (`retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate claimed before the operator decision, no central-solver retained-history acceptance claimed before the operator decision); no retained-branch claim; no accepted-evidence claim; receiver-normal branch weighting and same-record evidence boundaries preserved — evidence rows bind to one retained record; native central solver only, no parallel solver; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology.

Return: files changed; row/certificate chain status; operator decision recorded; evidence-audit delta; blockers; next closure goal.
````

### 1.2 Prompts 11–16 — Group D fork: corpus_insight_survey_fork directory batches

Shared checklist carried by each Group D prompt (referenced as "the inventory"):

> 1. invariant channels and equivariant reductions; 2. drum geometry (two staggered 120° rings, $54.7^\circ$ tilt, Thomson-ring reading); 3. axial dipole identity and dipole-quiet flattening; 4. momentum screw and helicity ($\mathbf J\cdot\mathbf P$, screw pitch as chirality datum); 5. exact quadrature speed budget $\beta^2c_f^2=u^2+v_t^2$ with pinned $\beta_\ast$; 6. anti-damping trilogy (frozen-octahedral zero-mean obstruction, held-release escape, planar rotating-channel pump $\Phi_{\mathrm{tan}}\approx2.9\beta$); 7. action clicks at the field-speed hinge / fold-set root-topology transitions; 8. multipole quietness ladder (lowest unquenched polarity-signed moment); 9. consilience principle (qualitative cross-chart agreement only; no cross-chart ledger consumption).

#### Prompt 11 — Group D batch 1: foundations remainder

````text
Prompt 11 — Group D batch 1: foundations remainder

Closure goal: Complete the foundations corpus survey — finish ontology.md and cross the six remaining foundations files against the derived-structure inventory with promote-or-capture discipline.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions, Foundations Survey Pass 1–2 precedent, promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/foundations/ontology.md (finish, beyond the first 80 lines), euclidean-void.md, absolute-time.md, absolute-time-defense.md, absolute-timespace.md, constructing-the-absolute-frame.md, detecting-the-absolute-frame.md. (architrino.md and emergence-of-structure.md are done.)
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed foundations files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion.

Task:
1. For each file, in order: read fully; identify clicks against the inventory; for each click decide promote (edit the owning corpus file at the correct claim level: lemma corollary / hypothesis / speculation) or capture (dated log entry with claim level, assumptions, proof burden, intended corpus destination).
2. Log every pass to the discussion log; update the survey-queue state line; keep the promotion ledger current.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): all seven files crossed against all nine inventory items with a recorded promote-or-capture decision per click, promotions at unweakened claim levels, validation clean, survey queue advanced to dynamics.
Failure condition (moves proof state): a surveyed file contradicts a derived-structure item in a way not resolvable at capture level — record the contradiction as a named finding in the discussion log with both claim levels, flagging a canon conflict for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; receiver-normal and same-record boundaries preserved in all promoted text; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology (superposed delayed potential/gradient, "net charge"/"net polarity inventory" over "monopole" in reader-facing prose); no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table (promote/capture/none); files changed; log entries; validation; contradictions; next closure goal.
````

#### Prompt 12 — Group D batch 2: dynamics

````text
Prompt 12 — Group D batch 2: dynamics

Closure goal: Cross the six dynamics chapters against the derived-structure inventory with promote-or-capture discipline, advancing the corpus survey queue through dynamics.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions, prior survey passes, promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/dynamics/master-equation.md, causal-action-functional.md, effective-lagrangian.md, binary-dynamics.md, energy.md, entropy.md.
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed dynamics files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion.

Task:
1. For each file, in order: read fully; identify clicks against the inventory (expect high density: wake-ledger conservation vs the momentum screw, anti-damping vs energy bookkeeping, clicks vs action increments); decide promote or capture per click with claim level, assumptions, proof burden, intended destination.
2. Log every pass to the discussion log; update the survey-queue state line and promotion ledger.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): all six files crossed against all nine inventory items with recorded decisions, promotions at unweakened claim levels, validation clean, survey queue advanced to spacetime.
Failure condition (moves proof state): a dynamics chapter contradicts a derived-structure item (e.g. a conservation statement inconsistent with the wake-ledger caveat) not resolvable at capture level — record the named contradiction with both claim levels for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; receiver-normal and same-record boundaries preserved; conservation stated as total-ledger including in-flight wake entries, never particle-only; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table; files changed; log entries; validation; contradictions; next closure goal.
````

#### Prompt 13 — Group D batch 3: spacetime

````text
Prompt 13 — Group D batch 3: spacetime

Closure goal: Cross the thirteen spacetime chapters against the derived-structure inventory with promote-or-capture discipline, advancing the corpus survey queue through spacetime.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions, dipole-quiet horizon and speed-budget precedents, promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/spacetime/lorentz-kinematics.md, proper-time-and-time-dilation.md, observer-framework.md, emergent-metric.md, general-relativity.md, ppn-parameters.md, gravitational-waves.md, black-holes.md, horizon-chirality.md, singularity-resolution.md, noether-sea.md, noether-sea-pro-anti-coupling.md, molecular-exclusion-and-noether-sea-response.md.
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed spacetime files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion.

Task:
1. For each file, in order: read fully; identify clicks against the inventory (expect: exact speed budget vs Lorentz clock/ruler export; dipole-quiet flattening vs horizon and chirality chapters; momentum screw vs frame content; anti-damping vs Noether sea response); decide promote or capture per click with claim level, assumptions, proof burden, intended destination.
2. Log every pass to the discussion log; update the survey-queue state line and promotion ledger.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): all thirteen files crossed against all nine inventory items with recorded decisions, promotions at unweakened claim levels, validation clean, survey queue advanced to assemblies.
Failure condition (moves proof state): a spacetime chapter contradicts a derived-structure item not resolvable at capture level — record the named contradiction with both claim levels for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; receiver-normal and same-record boundaries preserved; primitive propagation is field speed $c_f$, observer-level $c_0$ is a recovery target; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table; files changed; log entries; validation; contradictions; next closure goal.
````

#### Prompt 14 — Group D batch 4: assemblies + quantum

````text
Prompt 14 — Group D batch 4: assemblies + quantum

Closure goal: Cross the assemblies and quantum chapters against the derived-structure inventory with promote-or-capture discipline, advancing the corpus survey queue through assemblies and quantum.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions; Thomson dressing ladder, circulant neutrino reading, Koide and electron-personality speculation routing; promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/assemblies/particle-masses.md, gauge-symmetries.md, gauge-structure-emergence.md, fermions/electron.md, fermions/muon-tau.md, fermions/neutrinos.md, fermions/quarks.md, fermions/quantum-number-mapping.md, fermions/color-charge-su3.md, fermions/weak-mixing-angle.md, bosons/electroweak-bosons.md, bosons/gluons.md, mesons/mesons.md; then content/markdown/aaa/quantum/quantum-summary.md, wavefunction-ontology.md, measurement-ontology.md, reality-quantum-causality.md, fermi-dirac-and-bose-einstein-statistics.md, algorithmic-resonance.md.
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed assemblies/quantum files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion.

Task:
1. For each file, in order: read fully; identify clicks against the inventory (expect: quietness ladder vs dressing/mass chapters; helicity/screw pitch vs quantum-number mapping and chirality; clicks and basin-measure discipline vs measurement and statistics chapters; circulant/Fourier structure vs neutrino mixing). Check the electron-personality placement speculation against the fermion chapters before repeating it anywhere.
2. Decide promote or capture per click with claim level, assumptions, proof burden, intended destination; log every pass; update the survey-queue state line and promotion ledger.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): all listed files crossed against all nine inventory items with recorded decisions, promotions at unweakened claim levels, validation clean, survey queue advanced to reactions.
Failure condition (moves proof state): an assemblies or quantum chapter contradicts a derived-structure item not resolvable at capture level — record the named contradiction with both claim levels for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; mass-map and dressing statements remain hypothesis/speculation until retained-branch evidence exists; receiver-normal and same-record boundaries preserved; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table; files changed; log entries; validation; contradictions; next closure goal.
````

#### Prompt 15 — Group D batch 5: reactions + nuclear-atomic

````text
Prompt 15 — Group D batch 5: reactions + nuclear-atomic

Closure goal: Cross the reactions and nuclear-atomic chapters against the derived-structure inventory with promote-or-capture discipline, advancing the corpus survey queue through reactions and nuclear-atomic.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions; adiabatic/diabatic re-pointing threshold and click-transaction precedents; promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/reactions/mode-taxonomy.md, radiation.md, atomic-transition-radiation.md, bremsstrahlung.md, synchrotron.md; then content/markdown/aaa/nuclear-atomic/nucleon-structure.md, nuclear-binding.md, atomic-structure.md, atomic-spectra.md, molecular-geometry.md, condensed-matter.md, hyde-periodic-table.md.
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed reactions/nuclear-atomic files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion.

Task:
1. For each file, in order: read fully; identify clicks against the inventory (expect: re-pointing threshold vs radiation modes; clicks vs transition/spectra chapters; quietness ladder and multipole-completion confinement reading vs nucleon and binding chapters); decide promote or capture per click with claim level, assumptions, proof burden, intended destination.
2. Log every pass; update the survey-queue state line and promotion ledger.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): all twelve files crossed against all nine inventory items with recorded decisions, promotions at unweakened claim levels, validation clean, survey queue advanced to cosmology.
Failure condition (moves proof state): a reactions or nuclear-atomic chapter contradicts a derived-structure item not resolvable at capture level — record the named contradiction with both claim levels for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; receiver-normal and same-record boundaries preserved; no new validator or schema unless strictly necessary; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table; files changed; log entries; validation; contradictions; next closure goal.
````

#### Prompt 16 — Group D batch 6: cosmology + validation + philosophy-history

````text
Prompt 16 — Group D batch 6: cosmology + validation + philosophy-history

Closure goal: Cross the cosmology, validation, and philosophy-history chapters against the derived-structure inventory with promote-or-capture discipline, completing the corpus survey queue.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper; this is the broadest batch — if context grows large, sub-split by directory per reference/op/codex-multiprompt.md with this prompt's discipline carried into each worker.
- Read first: reference/priorities/braid-ideal/priorities.md Group D item; reference/priorities/braid-ideal/brainstorming.md#axis-neutral-transport-channel-discussion-log (inventory definitions; 't Hooft cogwheel comparison routing; promotion ledger); reference/op/theory-orientation.md.
- Files to survey, in scene order: content/markdown/aaa/cosmology/ (all ten files: cosmology-ontology.md, expansion-mechanism.md, inflation-model.md, BBN-constraints.md, CMB.md, dark-matter.md, dark-energy.md, hubble-s8-tensions.md, structure-formation.md, cosmology-reconstruction.md); content/markdown/aaa/validation/ (top-level ledgers and protocols, then validation/simulations/ including action-energy/); content/markdown/aaa/philosophy-history/ (top-level files, then theory-bridges/).
- The inventory (cross each file against all nine): invariant channels/equivariant reductions; drum geometry; axial dipole; momentum screw/helicity; exact speed budget; anti-damping trilogy; clicks at the fold set; quietness ladder; consilience principle.
- Write ownership: promotion edits in the surveyed cosmology/validation/philosophy-history files only; capture entries and survey-queue state update in the braid-ideal brainstorming discussion log; work-log entry.
- Avoid touching: content/markdown/aaa/noether-braid/ chapters while the reorganization threads (Prompts 01–03) are live — capture instead and queue the promotion; validation ledgers are controlled surfaces — prefer capture over ledger edits unless a row is factually stale.

Task:
1. For each file, in order: read fully; identify clicks against the inventory (expect: consilience principle vs validation protocols and scorecard language; clicks/circulant structure vs theory-bridges quantum chapters; anti-damping trilogy vs simulation protocol chapters; treat newer external frameworks as comparison-level per AGENTS.md); decide promote or capture per click with claim level, assumptions, proof burden, intended destination.
2. Log every pass; update the survey-queue state line to complete and close the Group D item in priorities.md per AGENTS.md queue discipline.
3. Run `node scripts/validate-content.mjs --check --strict` after promotion edits.

Success condition (moves proof state): every file in the three directories crossed against all nine inventory items with recorded decisions, promotions at unweakened claim levels, validation clean, and the survey queue closed.
Failure condition (moves proof state): a chapter or ledger contradicts a derived-structure item not resolvable at capture level — record the named contradiction with both claim levels for operator review.

Standing constraints: all outputs fail-closed; no retained-branch claim; no accepted-evidence claim; consilience stays qualitative — no cross-chart ledger consumption anywhere; receiver-normal and same-record boundaries preserved; no new validator, schema, gate, or ledger row unless strictly necessary with stated incremental value; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no corpus links to reference/priorities; forward-only documentation.

Return: per-file click table; files changed; log entries; validation; contradictions; survey-queue closure status; next closure goal.
````

---

## Section 2 — Thread Handoff Prompts

### 2.1 `p10` — Prompt 10 — Group A item 3 crux adjudication: fold_crossing_branch_orientation_sign

````text
Prompt 10 — Group A item 3 crux adjudication: fold_crossing_branch_orientation_sign

Closure goal: Adjudicate the branch-orientation sign discrepancy at the same-source fold crossing — decide, by independent derivation and executable check, whether $m=D_T/D_s$ at self-hit onset is the rigid-rotation $+1$ (chart-spec: cusp at coincidence, absorber closed) or the accelerating-worldline $<0$ (click-impulse packet: absorptive, absorber alive), and route the surviving disposition.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- This lane is hot with parallel threads. Before writing anything, inspect `git status --short --untracked-files=all` and the top entries of reference/priorities/braid-ideal/work-log.md; if a later adjudication artifact already landed, verify it instead of duplicating it.
- Two same-day artifacts disagree on the crux and both are recorded in reference/priorities/braid-ideal/priorities.md Group A item 3:
  - reference/priorities/braid-ideal/fold-crossing-chart-spec.md (Section 6) + scripts/braid-ideal/fold-crossing-chart-measurement.mjs: reconstructs the recorded `vt095` crossing as a rigid rotation at fixed $\rho=0.816497$, fixed $\beta_c=1.00196$, residual $F(\Delta;\beta)=2\rho\sin(\omega\Delta/2)-c_f\Delta$; concludes $D_T=D_s$ exactly by reflection symmetry, so $m=1$, the onset is a cusp ($A_3$) born at the coincidence stratum, the impulse is regulator-dependent, and the symmetric-channel hinge-click absorber is closed at kernel level.
  - reference/priorities/braid-ideal/fold-crossing-click-impulse-packet.md + scripts/braid-ideal/fold-crossing-click-impulse-diagnostic.mjs: measures the same crossing on the actual accelerating worldline (distinct reception/emission velocities sampled from the toy path history); confirms the coincidence birth and the magnitude regulator-dependence (cut sweep $-9\to-23\to-56\to-137\to-588$), but finds $D_T<0<D_s$ hence $m<0$ at every reception time past the hinge, arbitrarily close to birth (`vt095`: $D_s=+0.00629$, $D_T=-0.00270$, $m=-0.43$ at $T=0.4304$, hinge $T_\ast=0.42893$; steepening to $m=-0.87$ at $T=0.44$; same absorptive sign on `vt080`/`vt099`). Claimed mechanism: the certified tangential pump accelerates the site through the hinge, so the receiver crosses $c_f$ ahead of its own emitting past; the fixed-$\beta$ model sets $\mathbf V(T)=\mathbf V(s_r)$ and removes exactly that asymmetry.
- Read first: both artifacts above and their tests; the Whitney-fold set $\Sigma_{ij}=\{F_{ij}=0,\ \partial_{T_{\mathrm{em}}}F_{ij}=0\}$, the signed branch-orientation factor $m_{ij}=D_{T,ij}/D_{s,ij}$, and the coincidence-vs-caustic stratum distinction in content/markdown/aaa/foundations/architrino.md (Core Definition, Point-Transceiver Status); the click section of content/markdown/aaa/noether-braid/braid-mathematics.md#action-clicks-at-the-fold-set; Lemma 5 transversality in reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md.
- Write ownership: one adjudication note under reference/priorities/braid-ideal/ (or a scoped section appended to whichever packet survives); at most one new diagnostic under scripts/braid-ideal/ with a matching test under tests/; work-log and Group A item 3 queue updates in the braid-ideal lane.
- Avoid touching: native central-solver sources; corpus chapters; held-release-causal-wake-toy.mjs and sh-0-sea-diagnostic-candidate-model.mjs beyond reuse via import or CLI runs. Do not delete or silently overwrite either disagreeing artifact — the losing one is amended with the corrected reading and its disposition retracted in place.

Task:
1. Adjudicate analytically. Decide whether the branch orientation at a same-source root is a property of the instantaneous worldline (so $\mathbf V(T)\ne\mathbf V(s_r)$ under acceleration and $m<0$ post-hinge) or whether the rigid-rotation reflection symmetry is the correct chart idealization at onset. State exactly which object $\Sigma$ is defined on, and whether the fixed-$\beta$ reconstruction is a legitimate chart or an idealization that removes a first-order term. Settle whether $D_T\to0^-$ and $D_s\to0^+$ approach zero at the same rate (so $m$ has a finite negative limit) or whether the limit is $+1$.
2. Adjudicate executably. On the recorded `vt080`/`vt095`/`vt099` sea-screened worldlines, resolve $D_T$, $D_s$, and $m$ at the same-source root as $T\to T_\ast^+$ under time-step refinement, with an independent root solver and independent history interpolation from both existing scripts. Report whether $m$ has a finite negative limit, tends to $+1$, or is refinement-unstable. Include an adversarial control: an exactly rigid (zero-acceleration) rotating worldline must reproduce $m=1$ from the same code path, and a declared-acceleration worldline must reproduce the negative branch — a code path that cannot recover both is not adjudicating.
3. Settle the magnitude question separately and honestly. Both artifacts agree the fold births at the coincidence stratum, so state whether any chart-defined magnitude exists on the symmetric channel, or whether the transacted amount is set by the declared point-transceiver spatial self-regularization. Do not let the magnitude verdict silently decide the sign verdict.
4. Route. Retract or amend the losing disposition in place (`symmetric_self_hit_fold_is_cusp_at_coincidence_no_regulator_independent_click_impulse` versus `absorptive_branch_orientation_sign_regulator_independent_magnitude_coincidence_sensitive`), record the adjudication in the Group A item 3 queue note, the work-log, and the discussion log if mechanism-level; then name the single surviving next producer boundary: either the `central_solver_retained_history_row` signed-orientation + spatial-self-regularization contract extension, or the non-coincident hinge-geometry hunt.

Success condition (moves proof state): the branch-orientation sign at self-hit onset is decided by derivation plus a refinement-stable executable measurement that passes both adversarial controls, and exactly one of the two dispositions survives with the other amended in place.
Failure condition (moves proof state): the sign is refinement-unstable or chart-ambiguous at onset — record the negative, state precisely which additional structure (fold-resolution chart, spatial regulator ordering, or a non-coincident geometry) is required before any hinge-click absorber claim can be made, and close the symmetric-channel click route pending it.

Standing constraints: every output fail-closed; diagnostic-only — no retained-branch claim, no accepted-evidence claim, no stability claim; owner-row and candidate-request blocker chains preserved (fail-closed at central_solver_retained_history_row / held_release_seed_path_rows_acceptance_certificate.v0); signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; causal-delay terminology only; do not propose git worktrees.

Return: files changed; the analytic adjudication and which idealization is rejected; the refinement table ($D_T$, $D_s$, $m$ versus $T-T_\ast$ and versus time step) with both adversarial controls; the magnitude verdict stated separately from the sign verdict; the surviving disposition and the retraction/amendment made to the other; tests run; capture entry; next closure goal.
````

Operator notes on `p10`:

> Closure goal: none required — paste the prompt above into a fresh thread when ready.
>
> One note worth carrying over: the adversarial control in task 2 is the load-bearing part. My measurement and the chart spec's disagree because they sample velocity differently, so any adjudicating code must be able to reproduce both answers from the same path — $m=1$ on a rigid worldline, $m<0$ on an accelerating one — before its verdict means anything. I believe my reading is right, but I built one side of the disagreement, so the new thread should treat both as suspect.

### 2.2 `unlabeled-1` — retained-history dynamic-braid row deciding the tangential-absorber question

````text
Closure goal: Decide the tangential-absorber question on the one object that now gates both surviving routes — a retained-history dynamic-braid row — by jointly testing (a) whether the non-coincident cross-hit hinge sustains velocity alignment with a definite absorptive impulse sign and sufficient click recurrence, and (b) whether the neighbor braid orientational AC susceptibility reaches the derived threshold. Report which, if either, closes the (S)-persistence burden.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- The braid-ideal lane is fast-moving with several parallel threads in the same checkout. Inspect `git status --short --untracked-files=all` first. If an owner artifact for a sub-question has already landed, verify and record rather than build a second implementation (a prior thread correctly deleted its duplicate script/test/packet on discovering the owner script in flight). A dirty tree is normal ambient state.
- Read first:
  - reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md — the certified pump band 2.881β ≤ Φ_tan ≤ 2.925β, the certified (S)-failure clock, Lemma T / Corollary T (certified tube), and Corollary S (the static aligned FCC sea is a certified non-absorber: Π_tan^sea = c0(φ) − βQ(φ), c0 has exact zero cyclic work, sup|Q| ≤ 0.2746 < c1, margin ≥ 2.606).
  - reference/priorities/braid-ideal/sh-0-sea-diagnostic-candidate-model.md — the static induced-polarization relaxation (anti-retentive, radial) and the Dynamic Induced Polarization section (threefold-drive lemma: C3 symmetry admits only m = 3,6,9 harmonics; sign-definite absorptive damping Φ_tan^ind ≈ (0.03–0.17)·χ''(3ω); absorbing the pump needs χ''(3ω) ≳ 8.6–19.2, i.e. orientational stiffness K ≲ 0.026–0.058; the cluster-derived K ~ 0.3–0.5 (χ''max ~ 1–1.7) falls short by 5–15×). Owner script scripts/braid-ideal/sh-0-sea-dynamic-polarization-drive-diagnostic.mjs.
  - reference/priorities/braid-ideal/fold-crossing-chart-spec.md — Section 2 (finite chart impulse |Δp| = χ·κ·r_c^-2·sqrt(2μ0/a), regularization-independent given a generic A2 fold), Section 6 (the symmetric circular self-hit is a cusp born at coincidence: a → 0 and r_c → 0 together, so no regulator-independent magnitude; absorbed fraction ≈ 0.19 even at the regulator-inflated value), Section 7 (non-coincident cross-hit hinge restores the A2 finite impulse).
  - reference/priorities/braid-ideal/fold-crossing-click-impulse-packet.md — the signed branch orientation m = D_T/D_s < 0 past the hinge, so the same-source transfer is absorptive in direction while its magnitude stays coincidence-sensitive.
  - scripts/braid-ideal/fold-crossing-hinge-geometry-diagnostic.mjs and its test — the Mach threshold (source causal folds exist only for β_s > 1; Mach half-angle arcsin(1/β_s)), finite chord r_c = O(ρ) at finite base separation (r_c = 0.777, curvature a = 0.775 ≠ 0 at ρ = 1, separation 1.5, β_s = 1.1), and the coincidence control showing the impulse diverges as r_c → 0. Disposition: non_coincident_cross_hit_hinge_restores_a2_finite_impulse_contingent_on_sustained_velocity_alignment.
  - reference/priorities/braid-ideal/work-log.md (top five entries) and sh-run-matrix.md (SH-0-sea section) for the recorded rows and dispositions.
- The convergent finding to build on: every fixed-geometry and single-site-self-hit tangential absorber is now closed or insufficient — static aligned sea ≤10% (certified non-absorber), common-phase breathing ≤27%, dynamic induced polarization ≤10% at cluster stiffness, symmetric self-hit a cusp at coincidence. The two surviving routes are the non-coincident cross-hit hinge and a near-Goldstone-soft neighbor orientation mode, and BOTH reduce to the same gating burden: sustained dynamic alignment / formation history, which only a retained-history dynamic-braid row can supply.

Write ownership: a new section or sibling packet under reference/priorities/braid-ideal/; extensions to scripts/braid-ideal/fold-crossing-hinge-geometry-diagnostic.mjs and/or scripts/braid-ideal/sh-0-sea-dynamic-polarization-drive-diagnostic.mjs and their tests; queue, run-matrix, and work-log updates in the braid-ideal lane.

Avoid touching: corpus chapters under content/markdown/aaa (promotion is downstream), other lanes' packets, the central solver production path, and the Archie canon files.

Task:
1. Establish the minimal retained-history dynamic-braid row that decides both routes. Name it, state exactly which fields it must carry (signed branch orientation across Σ rather than |m|; fold-set chart coordinates ξ, μ with curvature a and chord r_c; coincidence-stratum spatial self-regularization; same-record h_act action-ledger rows; neighbor orientation degrees of freedom with their torque history), and state which existing contract surfaces it extends. Do not mint a new schema or validator unless strictly necessary.
2. Cross-hit hinge branch. Determine whether a physically reachable configuration sustains v_j · r̂_ij = c_f at finite separation, given that the fold requires a super-field source segment (β_s > 1) and (S) has already failed there. Resolve the impulse sign for a cross-hit (polarity- and geometry-dependent, unlike the same-polarity self-hit) and the recurrence N_click per rotation. Test N_click·Δβ_click ≥ ∫_rot dβ_pump against the certified pump. If sustained alignment is unreachable, record the obstruction and what would make it reachable.
3. Orientational-susceptibility branch. Compute or bound the neighbor braid orientational AC susceptibility χ''(3ω) from the braid's own retained dynamics rather than from the cluster pair potential. Test it against the derived threshold χ'' ≳ 8.6–19.2 (K ≲ 0.05) and the resonance condition γ ≈ K/(3ω). Note that an isolated braid's orientation is a flat (Goldstone-like) direction, so the cluster-bond stiffness estimate may be an upper bound — decide whether the true χ'' is above or below threshold, or prove the question is undecidable without the retained-history row.
4. If either route clears its threshold, name the first retention-window candidate row and its balance set; if neither does, prove the joint no-absorber statement and state precisely what the (S)-persistence lemma then requires (the certified clock would become unconditional, closing the isolated-and-embedded retained-branch route at kernel level).
5. Carry forward every standing caveat on results that assume alignment: aligned neighbor order is frustrated rather than self-selected, and sustained hinge velocity alignment is an unproven dynamic condition. All conclusions on either route are conditional on a named alignment mechanism.
6. Label every step derivation / computation / hypothesis / speculation; record claim level, assumptions, proof burden, and intended corpus destination.

Success condition (moves proof state): a decision on at least one route — either a named balance/retention-window row with its threshold cleared, or a proved joint no-absorber statement narrowing (S)-persistence to a single named mechanism — with the deciding retained-history row's contract stated exactly.

Failure condition (also moves proof state): a demonstrated obstruction — sustained alignment shown unreachable, or χ'' shown undecidable without the retained-history row — recorded with the sharpened hypothesis set and the diagnostic that would resolve it.

Standing constraints: every claim fail-closed; no retained-branch claim, no accepted-evidence claim, no stability claim, no score movement; all outputs remain blocked at held_release_seed_path_rows_acceptance_certificate.v0 and central_solver_retained_history_row; receiver-normal branch weighting and same-record evidence boundaries preserved in all row references; signed polarity-unit notation ε_{+,•}/ε_{-,•}; potential-superposition terminology; propagation at field speed c_f with causal-delay language only (never "retarded"); no frozen-octahedral chart imports; no new validator, gate, or schema unless it protects a concrete tested constraint and has a current consumer.

Return: packet file or section; decision and proof status per route; the deciding retained-history row contract; gaps or counterexamples; proof-state movement; next closure goal.
````

Operator notes on `unlabeled-1`:

> Two things I'd flag verbally to whoever picks this up: the lane has many concurrent agents, so the "verify, don't duplicate" instruction in the Context block is doing real work — my last thread nearly rebuilt a hinge diagnostic that landed mid-flight. And the task deliberately keeps both routes in one thread because they collapsed onto a single gating object; splitting them would re-derive that object twice.
>
> Closure goal: none required — the prompt above is the next thread's objective.

### 2.3 `unlabeled-2` — clean finite-chord differential cross-hit drain over the multi-source inter-band set

````text
Closure goal: Determine whether the clean finite-chord differential cross-hit drain, summed over the actual multi-charge inter-band source set of a nested shell braid (or an inner/middle binary pair), clears the certified tangential pump with every chord finite — producing the first coincidence-free clock-beating absorber — or else measure the clean multi-source absorption ceiling, fail-closed.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- This lane is highly concurrent (multiple agents in the same checkout). At startup, reconcile against the newest entries in reference/priorities/braid-ideal/work-log.md, brainstorming.md, and the Group A queue in reference/priorities/braid-ideal/priorities.md, and shrink scope to what is still open before writing anything. A dirty working tree is normal ambient state.
- Read first: the 2026-07-07 brainstorming.md entries "Differential Cross-Hit Is the Strongest Clean Absorber Yet" and "The Coincidence-Stratum Regulator Is the $d_0$ Scale"; fold-crossing-chart-spec.md Section 7 (non-coincident hinge geometry); fold-crossing-click-impulse-packet.md (signed branch orientation, and its Central-Solver Path Measurement section); priorities.md Group A item `self_hit_held_release_solver_row`; content/markdown/aaa/noether-braid/nested-shell-braid.md (three energy-separated bands, inner fastest, integer frequency locks, middle band = hinge/transfer role).
- Prior state you inherit. The single-site self-hit is coincidence-bound and retired as the load-bearing absorber (its magnitude is set by $d_0\sim R_*=\kappa\epsilon^2/c_f^2$, ~50x too large; self-hits remain fully in the ontology and keep their absorptive contribution — they set $d_0$). The non-coincident cross-hit is the surviving load-bearing route. A single differential cross-hit source reaches a chart-clean, softening-independent 0.742 of the certified pump (pump-per-rotation 22.17 at $\rho=\sqrt{2/3}$, $c_1=2.881$, $c_2=2.925$); radial band proximity is the strong lever (frequency ratio saturates near 0.15); alignment is realized as many narrow clicks, not a held window (sustained fraction ~0); and crossing the pump in one source only happens as the fold approaches coincidence (min chord -> 0, softening-dependent) and is flagged not-clean.
- CRITICAL RISK to resolve first, not assume away: the drain sign flips exactly with the polarity product ($\sigma_{ij}=+1$ absorbs, $\sigma_{ij}=-1$ anti-absorbs, equal magnitude). A neutral braid carries both like and unlike inter-band pairs, so a naive multi-source sum can cancel to ~0. The multi-source total is therefore NOT 3x0.74. Whether a net absorptive total survives depends on the polarity/phase/chord arrangement of the actual band decoration. Establish this before reporting any positive result.
- Available production capability (already landed, use it): src/solver/app/AbsoluteHistoryRootRuntime.mjs now emits an explicit `signedBranchOrientation` = $D_T/D_s$ on every causal root, and its moving-circular source history accepts an optional `angularAcceleration` (default 0 is bit-for-bit backward-compatible). Consume read-only; do not change `branchWeight` or `hit.strength` (contractually unsigned, mirrored by the F64 twin and asserted in check-solver-contract-fixtures).
- Write ownership: extend scripts/braid-ideal/differential-cross-hit-alignment-diagnostic.mjs (do not mint a parallel script), its test file tests/braid-ideal-differential-cross-hit-alignment-diagnostic.test.js, plus brainstorming.md / work-log.md / priorities.md / sh-run-matrix.md updates in the braid-ideal lane.
- Avoid touching: central-solver production code and ABI, the interval-certificate script, the escape-certificate checker, corpus chapters, other lanes' scripts.
- Capture discipline (operator-enforced): unpromoted ideas and derivations go in brainstorming.md. The work-log carries only a dated narrative note of work performed plus a pointer. The priorities tracker carries the compact promotion gate and current blocker. Do not put idea content in the work-log.

Task:
1. Resolve the polarity-cancellation question first. Enumerate the actual inter-band source charges of a nested shell braid (or an inner/middle binary pair) with their signed polarity units $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$, phases, and radii. State as a written convention in the owning capture whether the net inter-band cross-hit drain is protected from cancellation by geometry/phase, or cancels. If two defensible band decorations survive, run both as named diagnostic variants and flag the choice for the operator.
2. Sum the signed tangential cross-hit drain over the full inter-band source set per receiver rotation, with the existing softening-independence guard, and report the total against the certified pump.
3. Enforce the cleanliness gate on every row: all contributing chords finite (min chord above the declared floor) AND softening-independent (absorbed fraction stable under softening -> softening/4). A row that clears the pump only with a shrinking min chord is coincidence-contaminated and must be reported as such, not as a win.
4. Report per configuration: band radii/rates/frequency lock, polarity arrangement, clicks per rotation, min chord over all contributing roots, softening spread, sustained-alignment fraction, signed total drain, absorbed fraction of the certified pump, clean/contaminated verdict, and fail-closed proof status. Note explicitly whether the Theorem M partner-pair root-count guarantee applies here (cross-hits ARE partner pairs, unlike the same-source rows it does not cover) and what that buys.
5. Carry the band-order caveat on every result: the differential/aligned band order is assumed, not self-selected — the shared dynamic-alignment / formation-history burden that also gates induced sea orientational polarization.
6. Tests: polarity-cancellation behavior is pinned; the single-source clean ceiling (~0.742) remains reproduced; the near-coincidence rows remain flagged not-clean; all new rows diagnostic/candidate only. Update sh-run-matrix.md; update the queue item and renumber per AGENTS.md if it completes.

Success condition (moves proof state): a named multi-source nested-band configuration whose clean, softening-independent, all-chords-finite total drain reaches or exceeds the certified pump — the first coincidence-free absorber that beats the (S)-failure clock, feeding the retention program and the operator acceptance decision.
Failure condition (moves proof state): the clean multi-source total saturates below the pump (or cancels by polarity) — yielding a measured clean multi-source absorption ceiling, closing the free-orbit cross-hit absorber, and leaving a genuinely locked sustained alignment (holding $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ over a click window) as the sole surviving retention route, sharpening the dynamic-alignment / formation-history burden.

Standing constraints: every output fail-closed (`retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no central-solver retained-history acceptance); no retained-branch claim; no accepted-evidence claim; same-record evidence boundaries preserved; propagation at field speed $c_f$, never light-delay language; signed polarity-unit notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; causal-delay terminology only; no new validator or schema unless strictly necessary; these rows remain priority-only toy probes, not accepted evidence.

Environment notes (pre-existing, not yours to fix): `build-scene-graph --check` reports TOC drift in content/graph and content/generated from other lanes' corpus edits — report it, do not regenerate unless explicitly asked. `check-solver-migration-parity` fails on an `animator-causal-root-smoke.path` manifest assertion, and the WASM-bridge/precision checks fail on `emscripten: missing`; all three are environmental. A stale `.git/index.lock` may be present.

Return: files changed; per-configuration result table with signed totals, min chords, softening spreads, and absorbed fractions against the certified pump; polarity-arrangement decision record; tests and validation run; proof-state movement (named clean clock-beating row, or a measured clean multi-source ceiling); blockers; next closure goal.
````

Operator notes on `unlabeled-2`:

> Two things I'd flag verbally to whoever picks this up: the polarity-cancellation risk is the real crux and I deliberately put it as step 1 — my 0.742 number is a single like-polarity source, and a neutral braid's unlike pairs contribute the exact negative, so the honest answer may be that geometry (differing chords and phases per pair) is what breaks the cancellation, or that it doesn't break at all. And the "sustained" framing in the original goal turned out to be the wrong lever: free orbits never lock the alignment, so the absorption comes from click multiplicity and band proximity instead.

### 2.4 `o7` — Prompt 07 — Group A item 3: sustained cross-hit hinge alignment

````text
Prompt 07 — Group A item 3: sustained cross-hit hinge alignment

Closure goal: Decide whether a differential (nested-shell / inner–middle-binary)
configuration sustains the cross-hit alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$
at finite separation over a click window — booking a real $h_{\mathrm{act}}$ against the
certified pump — or else resolve the shared dynamic-alignment / formation-history burden
that equally gates induced sea orientational polarization.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first:
  * reference/priorities/braid-ideal/fold-crossing-chart-spec.md — Sections 1–3 (fold chart,
    A2 normal form, finite click impulse |Δp| = χ κ r_c^{-2} √(2μ0/a), same-record ledger
    contract), Section 6 (vt095 measurement: symmetric self-hit is a cusp at coincidence),
    Section 7 (self-hit coincidence theorem; cross-hit finite-chord fold; alignment condition).
  * reference/priorities/braid-ideal/fold-crossing-click-impulse-packet.md (parallel thread) —
    the SIGNED branch orientation: on the accelerating crossing D_T < 0 < D_s so m < 0
    (absorptive); the toy ejection was |m| discarding the sign. Magnitude stays
    coincidence-sensitive. Cite; do not edit.
  * reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md —
    certified pump Φ_tan ∈ [2.881, 2.925]β, clock Δt ≤ 1.353 c_f ρ²/κ, and Corollary S
    (aligned FCC sea is a certified non-absorber, ≤10% of pump). Cite; do not edit.
  * content/markdown/aaa/noether-braid/nested-shell-braid.md — the middle binary as the
    field-speed hinge (s_M ≈ c_f), and the coplanar/co-linear alignment at the braid
    symmetry-breaking point. This is the candidate home of the sustained alignment.
  * content/markdown/aaa/foundations/architrino.md#core-definition — Σ_ij, the two singular
    strata (coincidence {r_ij=0} vs caustic {∂_Tem F_ij=0}), density-of-states reading of D_s.
  * reference/priorities/braid-ideal/priorities.md Group A items 1 and 3; work-log tail.

Proof state carried in (do not re-derive):
- Self-hit coincidence theorem (derivation, general): for ANY smooth worldline a same-source
  root nucleates from Δ→0 at the speed crossing, since |X(T)−X(T−Δ)| = |v|Δ + O(Δ²). So the
  self-hit fold chord r_c → 0 at birth; no single-site path gives a chart-clean magnitude.
- Symmetric self-hit (vt095, ρ=0.816497, β_c=1.00196): cusp (A3) at coincidence,
  r_c²/ε_β → 16.0, a/√ε_β → −1.50; magnitude regulator-dependent (log in the spatial
  regulator); sign absorptive (m < 0) per the parallel packet.
- Cross-hit fold at finite chord: D_s = c_f − v_j·r̂_ij = 0 at finite separation ⇒ r_c = O(ρ),
  a = ∂²_τF ≠ 0 (generic A2) ⇒ Section 2 impulse is finite AND softening-independent.
  Decoupling holds only while the click window stays non-coincident.
- Every fixed-geometry absorber is now closed or insufficient: static sea non-absorber
  (Corollary S); radial breathing ≤27%; dynamic induced polarization ≤10% at cluster
  stiffness; symmetric self-hit cusp. Two survivors: (a) a non-coincident hinge geometry
  sustaining the alignment; (b) a near-Goldstone-soft neighbor orientation mode.

Write ownership: reference/priorities/braid-ideal/fold-crossing-chart-spec.md (new section);
optionally a new owner script scripts/braid-ideal/ + sibling test replaying a differential
two-rate (inner/middle) configuration; queue and work-log updates in the braid-ideal lane.
Avoid touching: native central-solver production code and ABI, the held-release toy's default
behavior (read-only runs are fine), corpus chapters, and the two cited packets.

Task:
1. Build the differential hinge configuration: two shells (or inner+middle binary) at distinct
   angular rates with the middle at rim fraction β → 1. Determine whether the causal root
   between an inner receiver and a middle source ever satisfies D_s = c_f − v_j·r̂_ij = 0 at
   finite separation, and for how long (the click window). Prior scans of static/antipodal/
   rigid-co-rotating placements found |D_s| floored at ≈0.5–1.7 — the alignment is NOT generic
   and needs the differential sweep plus phase locking.
2. If the alignment is realized: measure (r_c, a, χ, μ0, sign(D_T), N_click per rotation) on the
   configuration, confirm softening-independence, and evaluate
   N_click·Δβ_click ≥ ∫_rot dβ_pump  (= 2π c1 κ / (c_f² ρ) at unit coupling)
   with the SIGNED orientation (absorptive requires sign(D_T) < 0). Emit the Section 3 contract
   rows populated with the measured values.
3. If the alignment is not realized (or holds only on a measure-zero phase set), state the
   obstruction sharply and hand the retention program to the shared dynamic-alignment /
   formation-history burden, connecting it explicitly to the near-Goldstone-soft orientation
   mode (the neighbor braid orientational AC susceptibility χ''(3ω), the single computable
   internal quantity the dynamic-polarization branch reduced to).
4. Resolve or restate the open operator decision recorded in the queue: admit the sign-definite,
   spatially-self-regularized symmetric-channel hinge transfer for the absorber program, or
   require a non-coincident hinge geometry for a chart-clean magnitude.
5. Record claim levels per section (derivation / hypothesis / contract), update the queue item
   `self_hit_held_release_solver_row` per AGENTS.md, and log the work.

Success condition (moves proof state): a differential configuration in which the cross-hit
alignment holds at finite separation over a finite click window, with measured (r_c, a, χ, μ0,
sign(D_T), N_click) and a signed, softening-independent absorber verdict against the certified
pump — the first hinge geometry that books a chart-clean h_act.

Failure condition (also moves proof state): the alignment condition is shown to be
non-sustainable (measure-zero in phase, or self-destroying because the fold crossing detunes
the very rate lock that produced it) — closes the hinge-click absorber route entirely and
concentrates the whole retention program on the near-Goldstone-soft neighbor orientation mode
and its formation-history burden.

Standing constraints: every output fail-closed (`retainedBranchClaim=false`,
`scoreMovement=no_score_increase`, no accepted seed-path certificate, no central-solver
retained-history acceptance); no new validator or schema unless strictly necessary; a spec,
fixture, or diagnostic is not evidence and names no retained branch; signed polarity-unit
notation ε_{+,•}/ε_{-,•}; potential-superposition terminology; causal-delay terminology only
(never "retarded"); use the SIGNED branch orientation m = D_T/D_s, never |m|.

Return: files changed; the alignment verdict with measured chart quantities (or the
non-sustainability proof); the signed absorber comparison against the certified clock;
fixture/tests run; queue and packet disposition updates; the operator decision from Task 4;
blockers; next closure goal.
````

Operator notes on `o7`:

> Two things worth flagging for whoever picks this up: the parallel `fold-crossing-click-impulse-packet.md` thread was running concurrently and its signed-orientation result corrects the `m=1` in my Section 6 — the prompt tells the new agent to use signed `m`, never `|m|`. And the current held-release toy is single-shell, so Task 1 likely needs a new differential-rate diagnostic rather than a toy flag.

### 2.5 `unlabeled-3` — self-consistent dynamic-braid toy for the shared alignment / formation-history burden

````text
Closure goal: Decide the shared dynamic-alignment / formation-history burden with a declared
self-consistent dynamic-braid toy — does nested-shell braid evolution (formation, capture,
ring-down) sustain the middle-binary field-speed co-linear hinge, equivalently aligned sea
orientational order, over a click window? Compute the signed outcome either way, with zero
free amplitude and every output fail-closed.

Context:
- Apply reference/op/codex-goal-seeking-prompt-template.md as the meta wrapper.
- Read first: reference/priorities/braid-ideal/fold-crossing-sustained-alignment-window-packet.md
  (the packet that reduced both routes to one burden); reference/priorities/braid-ideal/
  fold-crossing-chart-spec.md Sections 2, 6, 7; reference/priorities/braid-ideal/
  fold-crossing-click-impulse-packet.md; reference/priorities/braid-ideal/
  sh-0-sea-diagnostic-candidate-model.md (Orientational-Order, Induced Sea Orientational
  Polarization, and Dynamic Induced Polarization sections); the 2026-07-07 work-log entries in
  reference/priorities/braid-ideal/work-log.md (top five); priorities.md Group A item 3.
- State of the retention-mechanism hunt (all 2026-07-07): every fixed-geometry, single-site, and
  kinematic absorber is closed or insufficient. Aligned FCC sea is a certified non-absorber
  (Corollary S, <=10% of pump). Common-phase breathing <=27%. Static induced sea orientational
  polarization is anti-retentive (overdamped SO(3) descent drives generic starts outward at every
  spacing). Dynamic induced polarization is absorptive but <=10% at cluster stiffness. The
  symmetric single-site self-hit fold is a cusp born at the coincidence stratum (no
  regulator-independent magnitude; sign absorptive). The non-coincident cross-hit fold restores
  the Section 2 finite A_2 impulse at finite chord, but its alignment is transient: measured
  window is ~1-3% of the source period, N_click=1, absorbing <0.5% of the pump, and a
  conservative full-dwell hold still reaches only ~2.3%.
- Therefore the two surviving retention routes -- (a) a sustained field-speed co-linear
  middle-binary hinge click, and (b) aligned sea orientational order -- are the SAME problem:
  whether the braid's own formation/recycling dynamics maintain that alignment long enough to
  transact. This is the last named open burden in the lane.

Known tension to resolve, not assume away:
- Every toy so far has been fixed-geometry or kinematic: the alignment was imposed, never
  self-generated. A self-consistent dynamic braid may (i) settle into the aligned hinge (both
  routes reopen), (ii) actively destroy it -- note static pair energetics prefers the exactly
  anti-retentive conjugate orientation -- or (iii) hold it only marginally/transiently. In the
  truly held limit the cross-hit fold becomes NON-TRANSVERSAL (curvature a -> 0), so the Section 2
  transversal impulse formula does not apply there and the transacted action must be obtained
  from the dwell dynamics, not the chart. Do not extrapolate the Section 2 formula into the held
  limit. A clean falsification moves the proof state as much as a confirmation.
- This burden is diagnostic-level and does NOT require the blocked seed-path certificate. The
  certificate blocks accepted evidence, not a declared dynamic computation. Do not stall on it.

Write ownership: a new sibling script scripts/braid-ideal/<name>.mjs and its test; a new sibling
packet in reference/priorities/braid-ideal/; work-log and queue updates in the braid-ideal lane.
Reuse exports from sh-0-sea-diagnostic-candidate-model.mjs (kernel constants, FCC sites and
directions, escape floor, buildFailClosedAuthorization, blocker constants); extend it only
additively if a shared helper is needed.

Avoid touching (owned by an ACTIVE parallel thread in this same checkout -- verify ownership
before writing anything in this lane): fold-crossing-chart-spec.md, fold-crossing-chart-fixture.mjs,
fold-crossing-chart-measurement.mjs, fold-crossing-click-impulse-diagnostic.mjs and its packet,
fold-crossing-hinge-geometry-diagnostic.mjs, held-release-causal-wake-toy.mjs,
self-hit-held-release-solver-row.mjs, the sea-screened rows, central-solver scripts, corpus
chapters. A parallel thread previously landed an identical diagnostic concurrently; before
building, grep for an existing implementation of your target and, if one exists, verify rather
than duplicate. Delete any duplicate you create.

Task:
1. Declare the dynamic model: a self-consistent nested-shell (inner/middle/outer binary) braid, or
   the 13-braid cluster with mobile neighbor orientations, evolving under potential-superposition
   forces with declared causal delay at field speed c_f. Kernel constants identical to the wake-sum
   runs. Declared initial ensembles (formation-like capture at separated levels, ring-down from a
   perturbed symmetric configuration, and an aligned control). Integrator, step, horizon, and
   convergence tolerance declared; no fitted or free response parameter anywhere in the output path.
2. Evolve and measure, per declared initial condition: the middle-binary along-sightline alignment
   v_M . rhat versus c_f as a function of time (dwell fraction above a declared alignment band);
   the neighbor-orientation order parameter (dipole projection onto the central braid dipole) as a
   function of time; and whether either persists over a click window. Report the dwell fraction, its
   time series statistics, and the persistence classification.
3. If a sustained alignment window appears, compute the transacted action in the held
   (non-transversal) limit from the dwell dynamics directly -- NOT from the Section 2 transversal
   formula -- and test the absorber inequality against the certified pump band 2.881*beta ..
   2.925*beta (per-rotation pump 2*pi*c_1*kappa/(c_f^2*rho)). If no sustained window appears,
   report the decay law and the falsification.
4. Classify the outcome: formation_sustains_hinge_alignment / formation_destroys_alignment /
   marginal_transient_only / basin_dependent (report per-seed statistics with a declared sampler).
   Verify exact controls: the aligned control must be a fixed point or report its escape rate;
   conjugation antisymmetry and paired-antiphase null must be preserved where applicable.
5. Tests: zero-free-amplitude assertions, deterministic seeded evolution, control lemmas,
   fail-closed outputs. Update queue state per AGENTS.md; record the disposition in the lane,
   including what the result does to BOTH surviving retention routes simultaneously.

Success condition (moves proof state): self-consistent formation/ring-down dynamics sustain the
middle-binary field-speed co-linear hinge (or aligned sea order) over a click window, and the
transacted action in the held limit meets the absorber inequality -- the retention mechanism is
named and executable, and both surviving routes reopen together.

Failure condition (moves proof state): the dynamics destroy or fail to sustain the alignment (or
sustain it but transact insufficient action) -- both surviving retention routes close together,
the environment-theorem and hinge-click programs are falsified at diagnostic level, and the
retention program must either name a new mechanism class or route to the top-level blocker
(producing the non-circular held_release_seed_path_rows_acceptance_certificate.v0 for
held_release_seed_path_rows:5833f18e53586201, whose producer is still absent).

Standing constraints: every output fail-closed (retainedBranchClaim=false,
scoreMovement=no_score_increase, no accepted seed-path certificate, no central-solver
retained-history acceptance, no accepted click-mechanism closure); no retained-branch claim; no
accepted-evidence claim; receiver-normal branch weighting and same-record evidence boundaries
preserved; declared histories and declared seeded dynamics only -- no undeclared environment
degrees of freedom; no new validator or schema unless strictly necessary; signed polarity-unit
notation $\epsilon_{+,\bullet}$/$\epsilon_{-,\bullet}$; potential-superposition terminology; no
"retard"/"retarded" variants (use causal/delayed/path-history).

Return: files changed; result table (dwell fraction, order parameter, persistence class,
transacted action, absorber comparison per initial condition); tests run; proof-state movement
for BOTH surviving routes; blockers; next closure goal.
````

Operator notes on `unlabeled-3`:

> Two things worth flagging to whoever picks this up. First, the burden is genuinely diagnostic-level — it does not need the blocked seed-path certificate, so the new agent should not stall on it. Second, this lane has an active parallel thread that has twice landed work concurrently; the prompt tells the agent to grep for an existing implementation and verify rather than duplicate, which is what I had to do (I built a non-coincident hinge diagnostic, discovered the parallel thread had landed the identical result, and deleted my duplicate).

---

## Section 3 — `t1` Last-Turn Summary (six-point equivariance-lemma / native-kernel audit)

Not a handoff prompt; this is `t1`'s reported last turn, preserved for its result and next closure goal. Its next step (`native_retained_history_promotion`) is the same object as Prompt 09 (§1.1).

> This task requires access to your repository (AGENTS.md, reference/, scripts/, tests/, and the native solver sources), but no folder is connected to this session. Let me request access. Native kernel located at `src/solver/src/`. The causal-root path is clear; now I need the force-accumulation path where polarity, coupling, and softening enter. Root-ledger policy is clean (time-ordered, no pruning). Now the bridge side — where polarity and the inverse-square factor combine with the hit-row strength. Now the queue row and work log. The queue was renumbered by a concurrent agent (the lemma row is now item 6). Applying the update to the current text. The audit is complete and recorded. The success condition holds: the native kernel is equivariant under both lemma actions on all audited retained-history force-row paths, and the staged lemma is cleared for native-record application at the equivariance obligation.
>
> Audited paths (seven, with exact locations in the packet): causal-root search for all three source-history forms including bracketing, bisection, and time-proximity dedupe (`src/solver/src/CausalRootSolver.cpp:76-601`); receiver-normal-over-source-normal branch weighting (`compute_receiver_normal_fields`, lines 193-241); delay evaluation including the delayed-potential fixed-point path (`Geometry.cpp:768-809`); same-source classification (`RootLedger.cpp:61-72`); retained-root ledger construction — no pruning, invariant sort keys (`RootLedger.cpp:221-303`); the MotionSampler causal-delay pair force law (`MotionSampler.cpp:509-540, 1334-1433, 1809-1896`); and delayed-hit row emission (`CausalRootSolver.cpp:903-942`, `SolverCAbi.cpp:782-819`).
>
> Verdict per action. $S_3\times\langle\iota\rangle$: equivariant — every force-path scalar is a norm or dot product of jointly transformed vectors, and polarity enters only through the charge-product sign, exactly $\sigma_i\sigma_j$ for unit polarity charges, which $\iota$ preserves. $C_3\times\langle\iota\rangle$: equivariant — the $C_3$ generator is the cyclic coordinate permutation contained in the $S_3$ argument, so both sweep prehistory modes are covered.
>
> Defects/exclusions with locations. One genuinely non-equivariant term exists but is not a force row: the axis-fixed `comparison_b` cross product against $\hat{\mathbf x}$ (`SolverCAbi.cpp:582-584`, mirrored in `SolverAppBridge.mjs:9583-9585`) — named and excluded from lemma scope. Also excluded: the single-sided observer-field polarity factor (field-level convention; receiver polarity must bind from the same record), the Animator display adapter's hard-coded zero source-normal speed (`AnimatorDelayedHitRows.mjs:301`), and T3 periodic-box stepping. Documented convention mismatches that are equivariant but differ from the packet kernel: status-code plus magnitude floors instead of a sign-preserving Jacobian floor (including the delayed-potential $\max(0.08,|\kappa|)$ floor), single-root selection versus the all-root sum (coincident on the (A3) window), branch weight absent from the integrated pair force, and the floating-point ordering caveat limiting bitwise — not exact-arithmetic — equivariance per Corollary 5.
>
> Records updated. Audit section appended to the proof packet with status/disposition/obligation-map/application-boundary rewritten forward-only; queue item 6 (renumbered from 8 by a concurrent agent) moved to `staged-native-kernel-audit-complete`; dated work-log entry added. Validation: the 8 owner-row tests pass, the CLI row with the packet ref still fails closed at the retained-root ledger with `no_score_increase`, and the receiver-normal clean-slate check passes. Solver sources untouched. Fail-closed boundaries preserved: no retained-branch claim, no accepted-evidence claim, same-record binding still blocked by design.
>
> Closure goal: build the same-record binding chain — via `native_retained_history_promotion` once an eigen-braid hunt names a candidate row — so the cleared lemma can bind a retained record, source row, provider object, and receiver-normal branch-strength rows.
