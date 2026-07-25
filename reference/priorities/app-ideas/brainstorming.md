# App Ideas Brainstorming

This file is the portfolio and idea bank for reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ apps. It groups new ideas as capabilities of existing or proposed apps instead of treating every visualization as a separate product.

## App Portfolio

Portfolio scope includes the public Navigator, every reader-facing app on the production Applications surface, public standalone learning and inspection apps, and planned user-facing reader or question apps. It excludes developer-only tools such as PDG Edit, review exports, the solver GPU harness, the EOM solver, and MCP transport.

`Deployed` means the current production Applications manifest or public standalone route was live on 2026-07-23. `Started` means implementation exists but the product is not publicly released. `Not started` means the concept is scoped but has no implementation. `Deferred` means the concept is intentionally parked.

`Backlog` counts the new learner-facing capabilities grouped in this file, not every engineering ticket in the app's own tracker. `Backlog Value` is the current learner-value assessment: `H`, `M`, or `L`. A zero backlog receives `L` because this idea bank currently assigns it no unclaimed learner-facing feature value.

| Name | Status | Backlog | Backlog Value |
| --- | --- | ---: | :---: |
| [$\mathbb{A}\mathbb{A}\mathbb{A}$ Navigator](../../../index.html) | deployed | 0 | L |
| [A1 Lorentz Geometry](../../../content/scenes/archie/ideal_braid.json) | deployed | 0 | L |
| [Animator](../app-animator/priorities.md) | deployed | 0 | L |
| [Assembly Configuration Explorer](../../../assembly-explorer.html) | deployed | 0 | L |
| [Atom](../../../content/scenes/nuclear/atom.json) | deployed | 0 | L |
| [Braid Search](../../../braid-search.html) | deployed | 0 | L |
| [Borg](../app-borg/priorities.md) | deployed | 4 | H |
| [Causal Delay Feedback](../app-causal-delay-feedback/priorities.md) | deployed | 5 | H |
| [Equation Mapping](../app-equation-mapping/priorities.md) | deployed | 0 | L |
| [Hyde Periodic Table](../../../content/scenes/chemistry/hyde_periodic_table_scene.json) | deployed | 0 | L |
| [It's Greek to Me!](../../../greek-letter-match.html) | deployed | 0 | L |
| [Molecule Visualization](../../../molecule.html) | deployed | 0 | L |
| [Periodic Table](../../../content/scenes/chemistry/periodic_table_scene.json) | deployed | 0 | L |
| [Photon and Polarization Visualization](../app-photon/priorities.md) | deployed | 0 | L |
| [Standard Model](../../../content/scenes/standard-model-particles/standard_model.json) | deployed | 2 | H |
| [Website Stats](../../../website-stats.html) | deployed | 0 | L |
| [Architrino Reader for iOS and iPadOS](../app-ios/priorities.md) | started | 0 | L |
| [Archie Interface](../app-archie-interface/priorities.md) | not started | 0 | L |
| Interaction Ledger Lab | not started | 2 | H |
| Emergence and Measurement Lab | deferred | 4 | M |
| Lorentz Recovery Lab | deferred | 2 | M |
| Noether Sea Response Lab | deferred | 3 | L |

### Audit Basis And Backlog Reconciliation

The 2026-07-23 audit reconciled the table against the live production Applications manifest, the standalone launch runtime, the public routes, and the active app priority folders.

- The production Applications manifest contains thirteen reader-facing entries.
- The Navigator is the public host surface rather than a child of its own Applications scene.
- Assembly Configuration Explorer and Website Stats remain public standalone routes with HTTP 200 responses but are intentionally absent from the Applications manifest.
- Architrino Reader has an implemented in-repo app and is in release preparation, so it remains `started` until public release.
- Archie Interface has extensive planning contracts but no user-facing implementation, so it remains `not started`.

Every nonzero backlog reconciles to the numbered capabilities assigned below:

| App or lab | Counted capabilities | Backlog | Disposition |
| --- | ---: | ---: | --- |
| Causal Delay Feedback | 5 | 5 | promote now — Story and Prediction is the first implementation slice |
| Borg | 4 | 4 | promote now — Prescribed Translation and Causal-History Tubes is the first implementation slice |
| Standard Model | 2 | 2 | priority-only — retain the paired classification and bookkeeping journey |
| Interaction Ledger Lab | 2 | 2 | priority-only — preserve as one proposed accounting app |
| Emergence and Measurement Lab | 4 | 4 | defer with blocker — record-backed basin and preparation-measure rows are missing |
| Lorentz Recovery Lab | 2 | 2 | defer with blocker — one accepted clock, ruler, and two-way-signal record is missing |
| Noether Sea Response Lab | 3 | 3 | defer with blocker — independently accepted constitutive and mass-map rows are missing |

The remaining table rows have no capabilities assigned by this idea bank and therefore retain backlog `0`.

## Portfolio Rules

- Prefer capabilities inside an existing app when they share its data, visual grammar, or teaching sequence.
- Create a new app only when the capability set has one coherent learner journey that does not fit an existing surface.
- Prefer a central animation, a small control set, and a live diagnostic or puzzle readout.
- Keep prescribed geometry, display-only records, candidate mappings, measured rows, and derived results at their actual authority levels.
- Defer concepts whose main lesson depends on a constitutive law, recovery map, or retained physical branch that has not yet been derived.
- Promote a capability into an app tracker only when it has a teaching mechanism, corpus authority, implementation boundary, acceptance condition, and owner.

## Deployed Apps With New Capability Backlogs

### Causal Delay Feedback

- Status: `deployed`
- Backlog: `5`
- Backlog value: `H`
- Disposition: `promote now`; execute [Causal Delay Feedback learner progression](causal-delay-feedback-advancement.md) with Story and Prediction first.

These capabilities form one progressive learning suite over a shared source, receiver, retained-history model, causal-root evaluator, and wake renderer. They should become modes of Causal Delay Feedback rather than separate apps.

#### 1. Story And Prediction

- Begin with one emitted wake, one reception event, and one visible line back to the old emission point.
- Pause before reception and ask the learner which earlier source position will matter.
- Reveal the causal path, explain the travel delay in age-appropriate language, and keep scoring light.
- Introduce moving-source, moving-receiver, curved-path, and hidden-wake rounds only after the single-root lesson is secure.
- Generate the answer from the same causal-root calculation used by the animation.

#### 2. Path-History Ledger

- Pair the spatial scene with a horizontal history timeline.
- Highlight source-history segments as inactive, causally active, selected, or rejected.
- Let a learner select a ledger row and trace the corresponding emission event, path, receiver event, and contribution.
- Show that the present readout cannot generally be reconstructed from current positions alone.
- Keep retained interior samples in diagnostics while the first teaching layer exposes only the history needed for the selected hit.

#### 3. Roots Mode

- Use the existing [Roots requirements](../app-roots/requirements-and-design.md) as the mathematical and acceptance authority for an advanced linked-view mode.
- Plot the delay-map function against emission time and synchronize its zero-crossings with wake intersections and the active-root count.
- Slow the scene at a generic fold so a tangent zero becomes two causal roots and the ledger changes by $\Delta N=\pm2$.
- Keep the pointwise acceleration spike visually separate from the finite accumulated velocity change through an ordinary interior fold.
- Resolve the provisional $c(\cdot)$ label against the packet's $g(T_r;T_t)$ notation before end-user implementation.
- Do not generalize the ordinary-fold result to coincident same-source root birth, which remains not advanced under the current sharp equation.

#### 4. Self-Hit Near $c_f$

- Compare sub-$c_f$, threshold, and super-$c_f$ source paths using the same geometry and scale.
- Draw earlier causal wakes and mark their intersections with the later source path.
- Let speed, curvature, and perturbation controls reveal absent roots, tangencies, active branches, and failed Jacobian floors.
- Plot $D_s=c_f-\mathbf v_s\cdot\mathbf n$ and $D_T=c_f-\mathbf v_r\cdot\mathbf n$ for the selected root.
- Teach that self-hit is a causal-root geometry question, not a total-speed label.

#### 5. Branch Geometry Explorer

- Show all accepted and rejected delayed-hit branches for one source-receiver pair.
- Keep branch colors and labels stable while the user changes the source path or receiver position.
- Display branch-local acceleration contributions and their vector sum at the receiver.
- Provide filters for age, contribution magnitude, root kind, and Jacobian floor.
- Make every acceptance or rejection reason visible rather than presenting a hidden solver verdict.

Shared acceptance boundary:

- The five modes must use one canonical causal-history state and agree on root identity, root count, emission time, and receiver time.
- Story mode hides complexity but never substitutes different geometry.
- Use acceleration language, never force language.

### Borg

- Status: `deployed`
- Backlog: `4`
- Backlog value: `H`
- Disposition: `promote now`; execute [Prescribed Translation and Causal-History Tubes](prescribed-translation.md) before the later Borg capability stages.

These capabilities extend Borg's sealed-record prescribed-assembly replay. They must reuse source-carried coordinates and preserve the distinction between prescribed chart geometry and EOM-solver-retained motion.

#### 1. Prescribed Translation And Causal-History Tubes

Implementation prompt: [Prescribed Translation And Causal-History Tubes](prescribed-translation.md).

- Add fixed-frame and co-translating-frame views of the same prescribed record.
- Let declared group translation turn periodic internal paths into extended spiral or braided strands in the fixed frame.
- Offer a translucent display tube around each strand, trail-depth control, freeze control, and split compact-orbit/translated view.
- When a source-matched prescribed-analysis result is available, let the user select an architrino receiver or declared virtual probe and display every certified causal root, emission point, arrival direction, root ordinal, $D_t$, and root-specific acceleration contribution at the selected observation time.
- Keep root-free, unresolved, invalidated, and drawn-not-evaluated cases visible with their producer-carried status and reason.
- Obtain analytical rows from the canonical prescribed-path evaluator through one compact provider contract; do not add root solving or analytical acceleration calculation to Borg, the browser replay runner, or the shared history adapter.
- Change only the display transform when switching frames. Preserve the sealed record, absolute time, path identities, analytical values, and source/protocol/implementation hashes.
- Do not call display tubes wake streams. Keep them distinct from analytical wake-arrival links and from EOM-retained wake streams, which remain unavailable without source-carried rows.
- Treat the feature as prescribed geometry plus record-derived analysis. It does not establish stability, binding, energy, retention, quantization, photon identity, or physical realization.

#### 2. Assembly Taxonomy Morph Lab

- Let learners select Family A, B, or C and move one chart-owned coordinate at a time.
- Update the 3D paths and coordinate table together.
- Animate Family-A flattening, Family-B cap or axial coordinates, and Family-C counterpart relations only where the selected canonical chart defines them.
- Disable coordinates the chart does not own and never infer missing numerical values.
- Label every morph as prescribed-chart exploration unless an evolved record independently supplies retention evidence.

#### 3. Braid Harmonics Studio

- Combine three orbit traces, phase rings, waveform lanes, and a common-return clock.
- Sonify declared binary frequencies and provide an equivalent silent visual mode.
- Use constrained ratios such as $4:2:1$ as named examples and allow declared integer-ratio comparisons.
- Offer short puzzles such as finding the smallest common return period.
- Call the result prescribed-period closure, not stability or physical resonance selection.

#### 4. Family-A Exclusion Geometry

- Use the current Family-A chart directly.
- Show two Family-A A1 candidates approaching with near-spherical exclusion envelopes at the prescribed near-rest endpoint.
- Let the prescribed flattening coordinate $\lambda_A$ move the displayed envelope toward the oblate flat endpoint.
- Highlight overlap of the display envelopes and compare volumetric and strongly oblate geometry.
- Present exclusion behavior as a geometry and closure target; do not claim fermionic exchange, binding, stability, or a physical branch from the display.

Shared acceptance boundary:

- Every value must come from a sealed prescribed record, an exact source formula, or an explicitly labeled display transform.
- Frame changes, morphs, tubes, harmonics, and exclusion overlays never upgrade record authority.

### Standard Model

- Status: `deployed`
- Backlog: `2`
- Backlog value: `H`
- Disposition: `priority-only`; keep both capabilities in this idea bank until an implementation packet is selected.

These two capabilities belong together because both teach the difference between observer-level particle bookkeeping and an underlying $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

#### 1. Gell-Mann Pattern Atlas

- Recreate the baryon octet and decuplet as interactive diagrams organized by $I_3$, $Y$, $S$, and $Q$.
- Teach classification first: let the learner switch among octet, decuplet, quark-content, and charge-axis views and read how neighboring nodes relate.
- Test pattern understanding second: hide one node or label and ask the learner to reconstruct it from neighboring states and the active quantum-number axes.
- Contrast mechanism third: a `classification / mechanism` switch preserves the observed organization on one side and reveals the still-open assembly, confinement, mass, and reaction rows on the other.
- Keep the capability active only while this three-stage sequence remains intact; a decorative diagram without the pattern-completion and open-mechanism contrast should be deferred.
- Keep flavor-octet classification distinct from color $SU(3)$.

#### 2. Polarity Ledger Builder

- Let learners place electrino and positrino units into corpus-backed candidate axial or assembly sites.
- Update primitive polarity inventory, observer-level charge, weak-isospin exposure, hypercharge bookkeeping, and color closure as separate rows.
- Offer puzzles for neutral pairs, charged-lepton candidates, and quark charge-bookkeeping patterns.
- Reveal the arithmetic connecting integer primitive inventory to the observer-level charge label.
- Never mark a bookkeeping match as a retained, stable, confined, or massive particle.

Shared acceptance boundary:

- Use [Color Charge and $SU(3)$](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) for the Eightfold-Way recovery boundary and [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) for effective charge-label bookkeeping.
- Show unavailable AAA rows explicitly rather than filling them with illustrative guesses.

## Proposed New App

### Interaction Ledger Lab

- Status: `not started`
- Backlog: `2`
- Backlog value: `H`
- Disposition: `priority-only`; do not promote it ahead of the selected Causal Delay Feedback and Borg slices.

This app would make interaction accounting into a visual puzzle. It is a better home for surface routing than adding another dense mode to Photon.

#### 1. Conservation Flow Board

- Place incoming objects on the left, outgoing objects on the right, and ledger channels below.
- Animate energy, momentum, angular momentum, and record state through elastic output, recoil, heat, radiation-like transport, retained excitation, or branch transition.
- Keep a balance meter that reaches zero only when every declared channel closes.
- Turn a missing channel into a named residual block the learner must route.

#### 2. Material Surface Routing

- Show an incoming candidate planar pair meeting active material components rather than a featureless wall.
- Let surface presets expose coherent re-release, capture, scattering, heat, recoil, and retained-excitation channels.
- Keep nuclear inventory unchanged unless a separate reaction mode explicitly supplies it.
- Reuse Photon visual grammar for the incoming pair while keeping the interaction ledger as the app's governing object.

Acceptance boundary:

- Every preset must declare its input and output ledgers.
- A visual route may illustrate accounting structure without claiming that the material constitutive law has been derived.

## Deferred Ideas

These ideas remain worth preserving, but their current learner journey depends too heavily on unresolved recovery or constitutive work. They should not compete with the high-value causal-delay, Borg, Standard Model, or ledger capabilities.

### Emergence And Measurement Lab

- Status: `deferred`
- Backlog: `4`
- Backlog value: `M`
- Disposition: `defer with blocker`.

Deferred capabilities:

1. **Threshold Crossing Map** — delayed wake input moves a state across a basin separatrix while the underlying motion remains continuous.
2. **Born Rule As Basin Measure** — ensemble frequencies are compared with deterministic basin measures.
3. **Record Autonomy And Restartability** — two visually similar intermediate states diverge because their retained histories differ.
4. **Emergence Layer Lens** — a resolution control moves among path histories, assembly records, and observer-level summaries.

Deferral reason:

- The four ideas are conceptually related but can easily teach an assumed measurement or probability mechanism as though it were derived. Resume only after a record-backed example supplies the basin, preparation measure, retained variables, and falsifiable recovery rows.

### Lorentz Recovery Lab

- Status: `deferred`
- Backlog: `2`
- Backlog value: `M`
- Disposition: `defer with blocker`.

Deferred capabilities:

1. **Clock-Cadence Retuning** — compare identical assembly clocks in declared Noether sea states.
2. **Two-Way Signal Recovery** — synchronize moving emitter, reflector, receiver, clock, and ruler readouts.

Deferral reason:

- These would be valuable once clock, ruler, and two-way signal behavior are recovered together from one accepted record. Building them now would risk turning adjustable recovery knobs into apparent derivation.

### Noether Sea Response Lab

- Status: `deferred`
- Backlog: `3`
- Backlog value: `L`
- Disposition: `defer with blocker`.

Deferred capabilities:

1. **Reversible Retuning** — distinguish reversible stored response from explicit excitation, heating, radiation-like shedding, or branch transition.
2. **Directional Response** — use response ellipses or ellipsoids and directional probes to visualize anisotropic local response.
3. **Mass-Map Exposure** — compare exposed, shielded, and partially exposed assembly contributions.

Deferral reason:

- The learner value is currently limited by missing constitutive and mass-map closure. A parameterized response display would mostly report what its author built into it. Resume only when the app can consume independently accepted response or mass-map rows.

## Flat-List Consolidation Map

| Prior ideas | Owning app | Disposition |
| --- | --- | --- |
| Path-History Ledger; Self-Hit Near $c_f$; Branch Geometry Explorer; Roots; Causal Delay Prediction Game | Causal Delay Feedback | active backlog |
| Family-A Exclusion Geometry; Prescribed Translation and Causal-History Tubes; Braid Harmonics Studio; Assembly Taxonomy Morph Lab | Borg | active backlog |
| Gell-Mann Pattern Atlas; Polarity Ledger Builder | Standard Model | active backlog |
| Action Ledger Conservation; Photon Surface Routing | Interaction Ledger Lab | not started |
| Threshold Crossing Map; Born Rule As Basin Measure; Record Autonomy And Restartability; Emergence Layer Lens | Emergence and Measurement Lab | deferred |
| Clock-Cadence Retuning; Two-Way Signal Recovery | Lorentz Recovery Lab | deferred |
| Noether Sea Reversible Retuning; Noether Sea Response Tensor; Mass-Map Exposure Viewer | Noether Sea Response Lab | deferred |

## Recommended Build Order

1. Causal Delay Feedback: Story and Prediction, then Path-History Ledger, then Roots.
2. Borg: Prescribed Translation and Causal-History Tubes, then Taxonomy Morph Lab.
3. Standard Model: Gell-Mann Pattern Atlas paired with the Polarity Ledger Builder.
4. Interaction Ledger Lab: Conservation Flow Board before Material Surface Routing.

The deferred labs should remain parked until their stated record or derivation blockers change.
