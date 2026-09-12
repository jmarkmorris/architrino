# CRW-005 Mesons Bounded Review — 2026-09-12

## Scope and authority

This is a bounded assurance review and claim-preserving repair of [Mesons](../../../../content/markdown/aaa/assemblies/mesons/mesons.md), the Priority 40 target. The review used the repository startup routing and corpus-review procedure: [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill owner](../../../op/skills/skill-architrino-review.md), and [corpus reviewer owner](../../../office-of-research/cto/prompts/corpus-reviewer.md). The live CRW-005 status, priorities, and work queue were inspected read-only; no shared status, priority, queue, or work-log file was edited.

The target pre-edit SHA-256, measured with `shasum -a 256` immediately before the first edit, was `f7ca63be000439ca347fb6bf4b4e4050ac3ceeef8e8622c125ca5b184cfd4eb4`, matching the dispatch value. The target final SHA-256, measured after the last edit and again before report creation, is `5e3311408fce6f3053b9aedac06d0e055ccde17ec64f6c5e29699523ccb9b4fd`. The final chapter has 236 lines. The report path was absent before report creation. Exactly these two paths were authorized and changed: this report and the target chapter.

This review does not claim theory closure, EOM solver acceptance, physical branch existence, or downstream corpus closure. It is an implementation-owner assurance review with direct repairs; mathematical and physical obligations that require independent derivations remain open.

## Sources inspected

The task-relevant canon and nearby owners inspected were:

- [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), and [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) for primitive ontology, delayed path-history dynamics, acceleration-first language, and equilibrium-before-stability discipline.
- [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md), [Color Charge and SU(3)](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), [Gluons](../../../../content/markdown/aaa/assemblies/bosons/gluons.md), and [Nucleon Structure](../../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md) for generation, color, singlet, baryon, and downstream spin/mass boundaries.
- [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md), [Gauge Symmetries](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md), and [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md) for effective-layer and mass-bookkeeping boundaries.
- [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) and the applicable academic, mathematics, terminology, and comparative-glossary canon referenced by the review owner.
- Live owner material: [CRW review status](../corpus-review-status.md), [CRW priorities](../priorities.md), and [CRW work queue](../work-queue.md), read-only for routing and ownership context.

The inspected working-copy SHA-256 values for the principal canon files were recorded during review: `ontology.md` `48bf11bec4defceb1a317443928e43ecebfae28340aef02ac2f8c0754e47c43d`; `architrino.md` `f91c2123169e3f1efd46a905769838f90a4da67cd268dc64d972a000d40f322d`; `master-equation.md` `99257f523c551d778a7d577ca965fe5d6f23f6963aa4f873f5b4b360b8f6090a`; `quarks.md` `e4ea5dfe452b20e54055d2694fbfb770a3cdf02fc261c02fb4bea8be217ab028`; `color-charge-su3.md` `c92e84c7f2025661f5894fb41b39c46dfda7d43f623e5a59941ad35ca54147d0`; `gluons.md` `99d326692ff6020e5cfeefebbe0ac9153f2889128273d2d6dcb899a0d4742986`; `nucleon-structure.md` `c59045877b888820184a789dec27289f9898d2319f591c3fb0d0edff24228fe5`; `gauge-symmetries.md` `4f82806b04932ff1b39cbc45b3b7d8e76162e8b6f768c2bfdf7a2c5fd598507d`; `particle-masses.md` `7c12ec4982c88d82c7e0d07af8e6f690f559352a05cbad342024eacecc23e945`; and `about-architrino.md` `bab0a2cbe3a73eab5241ef15cf6b9da45689c7b5b86b18e04a06599658666100`. These identify the inspected working copies; they are not causal attribution for concurrent edits.

## Findings and repairs

Finding count: 7 exact IDs, `MES-001` through `MES-007`.

### MES-001 — Stability and dissociation status was too strong

- Severity: P1, claim-boundary defect.
- Baseline references: lines 31, 113, and 152.
- Final references: lines 31, 113, and 152.
- Issue: the baseline used stability, Morse-index, deterministic-slide, and mandatory-dissociation language while the chapter’s own status section left the action, basin, and stability proof open.
- Smallest repair: label the criterion and Rho saddle as proposed/candidate, state that acceleration balance and unstable directions require demonstration, and retain dissociation as a target rather than a derived fact.
- Claim grade: proposal/inference; no equilibrium, basin, Hessian, or return-map result was supplied.
- Operator-checkable falsifier: an independently reproduced retained branch with force-free primitive wording replaced by acceleration balance, a demonstrated action/basin, and a perturbation result showing the claimed attractor or unstable direction would overturn the remaining non-derivation qualifier.

### MES-002 — Kaon topology and CP response were presented as established

- Severity: P1, theory-layer claim-boundary defect.
- Baseline references: lines 70 and 75–84, especially lines 76–79 and 83.
- Final references: lines 70 and 75–84.
- Issue: the baseline said generation-cycle mismatch would force a twist, that the twist set CP asymmetry, and that torsion-driven chirality inversion followed from the candidate oscillation. Those are not derived by the cited chapter or nearby canon.
- Smallest repair: preserve the generation and CKM comparison framing, mark the topology, twist, torsion response, chirality flip, and CP-odd contribution as hypotheses/candidates, and state that an independent response map and event ledger are required.
- Claim grade: proposal with unresolved physical obligation; no new numerical instantiation was introduced, and any future numerical work must use `c_f=1`.
- Operator-checkable falsifier: an independently constructed Architrino branch/response calculation that derives the cycle connection, its CP-even/odd projections, and the kaon observable without fitting the same asymmetry twice would overturn the present open status.

### MES-003 — Dense-matter consequences were inferred without a constitutive derivation

- Severity: P1, effective-layer overreach.
- Baseline reference: line 128.
- Final reference: line 128.
- Issue: the baseline inferred EoS softening and a lower maximum neutron-star mass from a qualitative N-to-Delta conversion picture.
- Smallest repair: retain the conversion as a proposed excitation channel and explicitly leave the dense-matter EoS, softening/stiffening sign, and maximum-mass consequence as validation targets.
- Claim grade: inference, not derived.
- Operator-checkable falsifier: a coupled Architrino-to-effective-matter calculation on the stated branch that derives the EoS and maximum-mass shift would resolve the deferred obligation; the qualitative packing sketch alone cannot falsify the repair.

### MES-004 — Excitation-ladder arrows implied a derived mass map

- Severity: P2, effective-layer claim-boundary defect.
- Baseline references: lines 139–140.
- Final references: lines 139–140.
- Issue: arrows from flux/spin changes to `m_rho` and `m_delta` read as if the mass gaps followed directly from the listed geometry.
- Smallest repair: relabel both as comparison targets while preserving the excitation bookkeeping.
- Claim grade: inference/comparison target; mass remains emergent bookkeeping rather than a primitive output in this chapter.
- Operator-checkable falsifier: an independent angular-momentum, energy, and effective-mass map deriving those gaps from the listed configurations would promote the arrows beyond comparison status.

### MES-005 — Isospin representation consequences were claimed as direct

- Severity: P2, representation-map overreach.
- Baseline reference: line 166.
- Final reference: line 166.
- Issue: the baseline said the isospin change and triplet/doublet structure followed directly, although the Architrino representation map was not supplied.
- Smallest repair: label the swap and triplet/doublet statements as proposed/comparison descriptions and state that recovery is not derived here.
- Claim grade: inference/comparison target.
- Operator-checkable falsifier: an explicit independent representation map from the stated braid branches to the observed isospin multiplets would discharge the open obligation.

### MES-006 — Fixed color orderings were treated as color-neutral baryons

- Severity: P1, mathematical representation defect.
- Baseline references: lines 204, 212, and 221–236.
- Final references: lines 204, 212, and 221–236.
- Issue: the baseline’s displayed fixed-axis rows and schematic assignment were described as color neutral, but nearby canon requires the normalized antisymmetric singlet; a single ordering such as `|123\rangle` is not invariant under general color rotations.
- Smallest repair: state the exact candidate effective singlet export, `3^{-1/2}\sum_{a,b,c=1}^{3}\varepsilon_{abc}|abc\rangle`, and clarify that the repeated fixed-axis matrices are schematic occupancies, not invariant singlets.
- Claim grade: derived conditional representation arithmetic from the effective SU(3) target, with the original chapter statement repaired as an inferred defect; this does not derive the Architrino-to-SU(3) map.
- Operator-checkable falsifier: an independent representation treatment showing that the displayed fixed ordering is invariant under the relevant general color action, or an equivalent explicit singlet construction in each row, would overturn the defect finding.

### MES-007 — `c_0` was used without a local definition

- Severity: P2, notation/provenance defect.
- Baseline reference: line 55.
- Final reference: line 55.
- Issue: the baseline used `c_0` in a causality comparison without defining it locally or distinguishing it from primitive wake speed `c_f`.
- Smallest repair: define `c_0` in place as the observer asymptotic channel speed and distinguish it from `c_f`.
- Claim grade: notation repair; the comparison remains a proposed effective-layer constraint, not an Architrino-level premise.
- Operator-checkable falsifier: a page-local or hierarchy-authoritative definition already governing this exact passage would make the original omission non-blocking, but it would not remove the need to preserve the `c_0`/`c_f` distinction.

## Repairs and non-repairs

The repairs are limited to claim qualifiers, one local speed definition, one exact singlet expression, and clarifying text around schematic tables. No existing equation was algebraically changed. No new numerical instantiation was added; where future numerical instantiation is named, the repository rule `c_f=1` remains binding. The chapter still records proposed, comparison, and unresolved obligations rather than promoting them to derived Architrino results.

No generated artifact, fixture, shared status file, priority list, queue, work log, or unrelated path was edited. Generated outputs remain read-only. The equation-mapping corpus check reported stale generated registry state at `content/generated/equation-mapping/corpus-equations.json`; the exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`, but regeneration was outside this request and was not run.

## Validation receipts

Known controls were run before target-specific parsing: `node --test tests/reference-surface-math-rendering.test.js` passed 1 test with 0 failures; the corrected fragment parser control passed for `Child -> #child`; and the corrected local-link parser control passed for `child.md#child`. An earlier malformed ad hoc fragment probe failed its own known control before it was run on the target; it was discarded and not used as evidence.

Final target-specific and repository checks:

- Final local-link parser: `target local-link final control: 7 occurrences checked; missing=0`.
- Registered equation-link check: `node scripts/validate-equation-mapping-links.mjs` passed, 23 registered links resolved.
- KaTeX/math known control: `node --test tests/reference-surface-math-rendering.test.js` passed, 1 test and 0 failures.
- Strict content check: `node scripts/validate-content.mjs --check --strict` exited 0 with 0 errors, 0 warnings, and 30 notes. The notes are repository-wide diagnostics, not evidence of Mesons defects.
- Generated registry: `node scripts/build-equation-mapping-corpus.mjs --check` exited 1 because the generated registry is stale; this is deferred drift, not regenerated or silently treated as a chapter semantic failure.
- Final complete reread: the 236-line target was reread in full after the final edit; the final line references above were checked against that reread.
- Scoped whitespace: the final report was checked for trailing horizontal whitespace with an `awk` report-whitespace check; no violations were found.
- Scoped diff: `git diff --check -- content/markdown/aaa/assemblies/mesons/mesons.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-mesons-review-2026-09-12.md` passed with exit 0. It covers the tracked target diff; the report’s untracked-file whitespace check is recorded separately above.

The strict validator’s scene/config and no-incoming-link notes are out-of-scope concurrent diagnostics. They do not establish or negate Mesons correctness. The stale equation registry is likewise a generated-surface obligation, not a license to edit generated output in this bounded review.

## Closure limits and remaining obligations

This review closes the seven listed wording/representation defects at the chapter level only. It does not establish a stable meson attractor, Rho saddle, kaon cycle, torsion response, CP asymmetry, EOM solver acceptance, physical branch existence, dense-matter EoS consequence, effective mass spectrum, isospin recovery, or downstream corpus convergence. Those claims require independent Architrino-level derivations or measurements with explicit instruments, equilibria, response maps, effective-layer mappings, and falsifiers. The generated equation registry remains stale until an authorized regeneration workflow runs the exact deferred command.
