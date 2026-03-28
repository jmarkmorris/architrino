# Priorities

Scoring system:
- Score `Value` and `Cost` on the same `1-10` scale.
- For `Value`, prioritize:
  1. work that drives more solid mathematical closure, especially the EOM, assembly energy, shielding, mass, and adjacent derivations;
  2. work that improves visualization and animation enough to generate new understanding or insight.
- For `Cost`, assume math-heavy derivation cost is lower than before because the implementation/derivation burden is now mostly on Codex, while visualization and animation work is relatively cheap.
- Compute `ROI = Value / Cost`.
- Use the scoring table as the canonical ranking. The detailed notes below remain grouped by theme for continuity and are not yet fully re-sorted.
- Break ties by higher `Value`, then lower `Cost`.
- Remove items from the task list once they are genuinely finished; keep background notes in `Info`, not mixed into active priorities.

## Scoring Table

| # | Item | Value | Cost | ROI |
| ---: | --- | ---: | ---: | ---: |
| 1 | Execute the frozen breather proof program | 10 | 4 | 2.50 |
| 2 | Noether-core stability, shielding, parameter ledger, and first mass map | 10 | 4 | 2.50 |
| 3 | Scene system, composer, PDG solver, applications, and later enhancements | 9 | 4 | 2.25 |
| 4 | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | 10 | 5 | 2.00 |
| 5 | Dyadic resonance lock reduced-map program | 7 | 4 | 1.75 |
| 6 | Remaining Standard Model assembly gaps, flavor mixing, and confinement | 8 | 5 | 1.60 |
| 7 | Simulations, regularization, and shell numerics | 8 | 5 | 1.60 |
| 8 | Remaining black-hole / strong-field quantitative closure | 4 | 5 | 0.80 |
| 9 | Preserve strong-field / tri-binary hypotheses | 2 | 3 | 0.67 |
| 10 | Unified chapter authoring queue and legacy-material recovery | 3 | 5 | 0.60 |
| 11 | Born-rule / quantum closure with hard tests | 4 | 8 | 0.50 |
| 12 | Cosmology transfer-function closure | 2 | 9 | 0.22 |
| 13 | Deferred product / outlook work | 1 | 6 | 0.17 |

## Overall Task List

### 1. Execute the frozen breather proof program
- Value `10`, Cost `4`, ROI `2.50`.
- Treat [collinear-breather.md](../../content/markdown/aaa/dynamics/collinear-breather.md) as a frozen reference scaffold, not as the live place for new theorem discovery.
- Treat [master-equation-breather.md](../../content/markdown/aaa/dynamics/master-equation-breather.md) as a frozen proof-program blueprint rather than a live architecture notebook. The current task is now proof execution inside that already-built theorem DAG, not further scaffold expansion unless a real defect is found.
- Current state:
  - the 1D note now has a full theorem ladder from collapse-to-crossing through caustic transit, post-crossing recapture, outer-turn closure, seed-history nonvacuity, invariant-envelope synthesis, and the final Schauder capstone;
  - the major global packaging defects were audited and made explicit: the convex tame-envelope step is now honestly marked as a target, the admissible parameter regime is now a coupled solvability target rather than a false decoupling argument, and the section anchoring now explicitly quotients out time-translation symmetry;
  - the notation/domain hierarchy was cleaned so the raw section, the convex macro-envelope, and the closed convex tame envelope are no longer silently conflated;
  - the bridge chapter now records the portable return-map / tame-envelope / Schauder architecture, the completed reduced-planar binary bridge, and the completed first unreduced-planar binary bridge;
  - the reduced-planar bridge now runs end-to-end through section/gauge fixing, directional sorting, deep-past relocation, cone transversality, bounded caustic transit, vector recapture, tame-envelope closure, Schauder, and precise failure alternatives;
  - the unreduced-planar binary bridge now runs end-to-end through gauge-fixed sectioning, finite active branch graph control, deep-past provenance or exclusion, multi-channel recapture, tame-envelope closure, Schauder, and precise closure-stage obstruction alternatives;
  - the live bridge note has now completed that next boundary: the planar three-body bridge in [master-equation-breather.md](../../content/markdown/aaa/dynamics/master-equation-breather.md) now carries a full theorem-program ladder through unreduced well-posedness, gauge selection, no-accumulation, bounded caustic transit, finite active delay hypergraph, cluster-valued ancestry and deep-past exclusion, multi-observable recapture, explicit convex-core construction, boundary trapping, invariant-envelope closure, and the final Schauder capstone;
  - the planar three-body bridge now includes an explicit symmetric seed packet, a delayed seed-margin persistence lemma, a seed-centered realization of the convex tame core, an explicit principal-channel parameter corridor, and a sharpened caustic-transit package with exact fold-time cancellation and uniform fold ceilings;
  - the ancestry package now reduces deep-past memory to a finite-state backward-search problem with explicit trapped-cycle exclusion via monotone source-time drift, so the deep-past contribution has been converted into one fixed arithmetic ceiling
    $$
    \overline{A}^{\mathrm{mb}}_{\mathrm{deep}};
    $$
  - the recapture package now consumes only fixed fold ceilings
    $$
    F^{\mathrm{mb}}_m
    $$
    and the fixed deep-past ceiling
    $$
    \overline{A}^{\mathrm{mb}}_{\mathrm{deep}},
    $$
    rather than qualitative “smallness” language;
  - repeated review-and-repair cycles have now frozen the bridge architecturally: there are no remaining known structural gaps in the theorem program, and the next phase should be literal proof writing.
- Resolved proof pivots to preserve from the frozen 1D scaffold:
  - the inbound hinge caustic is integrated through as a bounded caustic-transit impulse rather than excluded as a pathology;
  - the outer-turn geometry is organized around the sorting map
    $$
    z(t)=x(t)-c_f t,
    $$
    which forces explicit descent and exclusion inequalities on the apocenter window;
  - deep-past outward self-roots on the apocenter window are forced back onto the pre-crossing inbound leg, where they become unique and automatically transversal;
  - the affine seed history removes section-side vacuity by giving an explicit nonempty tame neighborhood;
  - the fixed-point route now acts, conditionally, on a closed convex tame envelope
    $$
    \mathcal{K}_{x_\ast,\eta},
    $$
    rather than on a mismatched tame-subclass / macro-envelope pair.
- Next-session prompt / active handoff:
  - read [master-equation-breather.md](../../content/markdown/aaa/dynamics/master-equation-breather.md) from the seed-side section through the no-accumulation, caustic-transit, ancestry, recapture, convex-core, and Schauder closure packages, treating the architecture as frozen;
  - do not add new theorem layers or new replacement packages unless a real proof-breaking defect is discovered;
  - begin formal proof execution inside the existing DAG, starting with the seed-side and early branch-regularity lemmas that feed everything else;
  - first target:
    - turn the delayed seed-margin persistence lemma into a clean formal proof, including:
      - the explicit implicit-function argument for unique simple seed-side branches,
      - the retardation estimate,
      - the `\varepsilon_A` neighborhood correction,
      - the Jacobian perturbation estimate,
      - and the projected-force perturbation bound for
        $$
        \Lambda^{\mathrm{mb}}_1
        \qquad
        \text{and}
        \qquad
        \Lambda^{\mathrm{mb}}_2;
        $$
  - second target:
    - formalize the no-accumulation / simple-branch persistence proof chain into polished lemmas with explicit dependence on
      $$
      \gamma_{\mathrm{fold}},
      \qquad
      \nu^{\mathrm{mb}}_J,
      \qquad
      \chi_{\mathrm{fold}},
      \qquad
      \Delta\tau_{\mathrm{evt}};
      $$
  - third target:
    - if time remains in the session, convert the sharpened Type II caustic-transit estimate into a more formal integral proof using the exact cancellation
      $$
      dt=\frac{|\partial_s g|}{|\partial_t g|}\,du
      $$
      and the explicit ceiling
      $$
      \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}
      \le
      \frac{
      2C_m^{\mathrm{proj}}\kappa\epsilon^2U^{\mathrm{mb}}_{\mathrm{tube}}
      }{
      \chi_{\mathrm{fold}}\bigl(d_{\min}^2+\epsilon_c^2\bigr)
      };
      $$
  - preserve the theorem-program structure exactly as written; the next work is proof writing, not architectural redesign.

### 2. Finish Noether-core stability, shielding, the parameter ledger, and the first mass map
- Value `10`, Cost `4`, ROI `2.50`.
- For scorecard purposes, this is now the main Parameter Closure + Mass Formulas bucket.
- If the goal is fastest total-score increase, pair this item with item `10` for Parameter Closure + Coverage first.
- Treat [parameter-ledger.md](../../content/markdown/aaa/validation/parameter-ledger.md) as bookkeeping only. The real priority is to turn the open mass-side symbols it names into one reusable derived map.
- First concrete deliverable: one derived tri-binary attractor family with radii, frequencies, binding scales, and a reproducible shielding-extraction protocol.
- Second concrete deliverable: derive `\zeta(A)` from the delayed kernel strongly enough to predict a baseline electron mass and at least one next-step hierarchy check such as `m_\mu / m_e`.
- Third concrete deliverable: decide which quantities survive as shared inputs across the mass-side program, especially `\kappa`, the physical role of `\eta`, and whether the first mass map also constrains the bridge to `h` and `G`.
- Theorems and calculations to finish here:
  - solve the exact 6-body non-Markovian path-history equations for the tri-binary and locate the relevant limit cycles or other robust attractors,
  - derive the minimum radius `R_{\text{min}}`, radii ratios, frequency structure, binding scales, shielding / leakage factors, and far-field cancellation directly from the delayed `1/r^2` kernel rather than from calibration targets,
  - turn `\zeta` from a placeholder into a derived quantity and use it to predict the baseline electron mass and the first generational hierarchy checks such as `m_\mu / m_e`,
  - test whether the same derived geometry explains the structural origin of the fine-structure constant `\alpha` from `\kappa` and `c_f`.
- Test the first map against electron / muon / tau or hadron constraints.
- Keep the constants question attached to the mass map only if it sharpens that derivation; otherwise leave it as background, not as part of the active deliverable.

### 3. Scene system, composer, PDG solver, and remaining composer objectives
- Value `9`, Cost `4`, ROI `2.25`.
- The canonical references now live in [composer.md](../composer-reaction/overview2.md) and [reaction.md](../composer-reaction/overview3.md). Treat those notes as the implementation-aware architecture references for the current composer and reaction surfaces rather than repeating the full completed baseline here.
- Current state, only what matters for the remainder:
  - the composer shell is already real enough that the remaining work is about closing specific gaps rather than inventing the whole authoring model;
  - the reaction app is now the primary manual provenance surface, and the old `Map On Canvas` bridge should be treated as transitional scaffolding only;
  - the first shared canonical-structure bridge now exists in the composer as a read-only integration path, but it does not yet drive live structure mutations;
  - observer-path controls exist, but true authored observer intervals still do not;
  - and `Audio` remains placeholder-only.
- Remaining composer objectives, in order:
  1. finish the reaction app as a genuinely usable manual provenance tool;
  2. bridge solved reactions back into the main composer as staged animated results;
  3. replace observer/editorial placeholders with a real authored timeline model;
  4. move composer-side structural editing and visualization onto the shared canonical structure model.
- Priority 1: finish the reaction app manual workflow:
  - keep the current left / center / right hierarchy solver as the near-term reaction-authoring baseline rather than trying to jump immediately to full free placement;
  - improve state legibility inside the existing reaction app:
    - show explicit `Transmute` incoming / outgoing ledgers,
    - make balanced vs unbalanced center tiles self-explanatory,
    - make source / target / mapped / ineligible anchor roles more visually distinct,
    - and make path tracing easier through hover, selection, endpoint emphasis, or temporary dimming of unrelated mappings;
  - keep refining composite depiction:
    - preserve seam-side composite cards,
    - keep split behavior reversible through re-add rather than hidden state,
    - and keep internal composite join lines visually subordinate to the main mapping lines;
  - clean up the right-click grammar and top-bar guidance so the reaction app can be learned from the surface itself;
  - extend the current automated solver coverage beyond the new baseline so it also protects:
    - `Transmute` UI semantics and overflow blocking,
    - timeline/reaction handoff assumptions,
    - and the remaining visual/manual regression points that still need refresh-and-audit checking;
  - keep the old straight transfer-drafting bridge only as compatibility scaffolding while the dedicated reaction app becomes the clear primary workflow.
- Priority 2: bridge solved reactions back into the main composer:
  - convert an accepted reaction-app solve into durable reaction data rather than leaving it trapped in the temporary solver UI state;
  - feed solved participants, mappings, and provenance into the shared reaction item on the timeline;
  - define the first concrete handoff from hierarchy mappings to staged motion grammar such as `detach`, `flight`, and `reassemble`;
  - make the accepted mapping geometry become the starting point for observer-facing spline refinement rather than a disposable diagnostic overlay;
  - and keep the normal composer responsible for staging, timing, viewpoint, and explanatory overlays rather than for re-solving the reaction.
- Priority 3: replace observer/editorial placeholders with a real authored timeline model:
  - turn `Observer` into a true timeline item with authored spans, framing intent, and synchronized observer-path behavior;
  - define the first concrete observer-object model for the design view, the observer path, and any future synchronized inset;
  - finish the placeholder editorial items, especially `Audio`, observer transitions, and framing behavior;
  - improve timeline zoom and local navigation so short spans remain editable in long scenes;
  - improve media-asset entry beyond typed paths where practical;
  - continue visible observer-language cleanup while allowing runtime internals to remain transitional until the object model is stable.
- Priority 4: move composer-side structure onto the shared canonical model:
  - keep the new canonical structure bridge as the only direction of travel and stop adding fresh ontology to ad hoc composer-only assembly helpers;
  - extend the first composer-side visual path that already reads canonical structure into additional viewport and editor surfaces instead of leaving the bridge as isolated summaries and badges;
  - move at least one actual composer mutation path onto shared structure transforms, likely regroup/group-split or another narrow hierarchy edit;
  - make parent/child nesting read as local structure rather than grouped ids alone;
  - add richer subassembly transforms, presets, and instance overrides once the canonical edit path exists;
  - decide how anti-Noether cores and similar theory-facing structures should be depicted and edited;
  - add structure-changing edits such as detaching an axial architrino into a free architrino and breaking a binary into free architrinos;
  - keep free architrinos as outputs of structure-changing edits, not as top-level add-menu stamps;
  - make scale changes legible in-scene, including clear indication when a structure, inset, or derived view is shown at a different scale;
  - support richer geometric depictions that matter across cases, especially oblate spheroids and spiral structures;
  - animate deeper structural behaviors directly from the architrino picture, including photon counter-rotation, self-propulsion, polarization, Malus-law behavior, axial-polarity-driven precession, equivalence-principle explanations, and ephemeral `W` and `Z` configurations;
  - make momentum constraints legible in the structure model, especially the angular/linear momentum relations that maintain relative plane angles;
  - and add notation and display conventions that distinguish apparent energy from total energy.
- Keep active but below the active four:
  - PDG solver and reaction-app follow-on after the manual workflow is genuinely solid:
    - ranked candidate proposals,
    - pin / forbid / rerun-on-remainder controls,
    - provenance summaries and diagram exports,
    - external API use where it sharpens solving rather than distracting from the manual baseline,
    - possible MadGraph-assisted channel work,
    - and scene-builder / API-mode handoff once the stored reaction payload is stable;
  - composer architecture follow-on:
    - retire the remaining raw timing / reaction text bridges once structured authoring can replace them cleanly;
    - close the gap between the current preview bridge and the dedicated `Scene-Composed-Animation` runtime path;
  - history traces and exclusion envelopes:
    - improve UI authoring for `historyTraces`,
    - refine rendering and controls for path-history traces with window and fade semantics,
    - improve UI authoring and editing for `envelopes`,
    - and connect those displays more explicitly to the delayed/path-history model rather than treating them as generic effects;
  - workspace and persistence cleanup:
    - keep the central viewport dominant,
    - do not reintroduce large persistent assembly-detail panels,
    - keep turning repeated text-entry flows into structured or direct-manipulation authoring where that improves clarity,
    - and leave repo-facing persistence, validation, reusable libraries, and lint as later follow-on work unless they become blockers for the above priorities.
- Guardrails for the next pass:
  - the composer should stay visual, canvas-first, and light on persistent text authoring;
  - anything about a given assembly should be managed through that assembly's center control point where practical;
  - path markers should remain directly draggable;
  - timeline items should become more authorable, not more abstract;
  - observer language should replace camera language in the user-facing design wherever possible;
  - keep the left panel gone as a visible authoring surface;
  - preserve consistent look and feel as the UI gets richer;
  - avoid reintroducing large persistent inspector-style editing;
  - do not make unrelated changes.

### 4. Finish the tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure
- Value `10`, Cost `5`, ROI `2.00`.
- Keep dynamics, math, geometry, and mapping centered on [master-equation.md](../../content/markdown/aaa/dynamics/master-equation.md) as the top theory priority.
- This is now also the home of the Lorentz / metric / clock / ruler bridge to GR. Item `8` is no longer separate because it is a downstream closure branch of this same master-equation stack.
- This stack has to carry the whole closure program from the `\eta`-regularized delayed action to the continuum bridges:
  1. full 3D translating tri-binary NFDE / DDE analysis for emergent `\gamma`-scaling,
  2. transfer-operator and invariant-measure control for Born-rule emergence from metastable separatrix crossing,
  3. exact 6-body core stability and shielding extraction for the first-principles mass program.
- For scorecard purposes, this item now carries the deepest foundational lift in:
  - Internal-Core Dynamics,
  - Charge-Carrier Dynamics,
  - Cross-Regime Bridge,
  - and UV/IR Completion.
- The reduced delay-loop result is not enough anymore; the live target is full translating-tri-binary control in a form that can feed GR, QM, and Standard Model closure directly.
- Use the current tractable footholds as fixed starting points:
  1. every new circular self-hit branch is born at an interior tangency of `g_\beta(\xi)=\sin\xi-\xi/\beta`, equivalently at a root of `\tan\xi=\xi`;
  2. every such branch is born exactly on a Jacobian-null surface, since at threshold `J^\star = 0`;
  3. the circular self-branch count grows only linearly, `N_{\text{self}}(\beta)=\beta/\pi+O(1)`;
  4. within the symmetric isolated circular two-body ansatz, tangential contributions do not cancel branchwise, so exact constant-speed closure is obstructed unless something beyond the bare ansatz does the work.
- The chapter now explicitly records:
  1. the null-separatrix / Jacobian-null surface as an amplitude wall for the self branch, not by itself a proof of circular closure;
  2. the exact partner-only circular formulas at theorem level, including the strict tangential-positivity corollary for the isolated sub-`c_f` circular binary;
  3. a first non-circular logarithmic-spiral benchmark with the delayed-root equation and Frenet-frame force projections.
- Circular-closure work order:
  1. higher-winding branch asymptotics beyond leading order;
  2. large-`\beta` asymptotics for the full circular self-force sum;
  3. bare-kernel circular MCB no-go theorem or existence theorem;
  4. non-circular periodic-orbit closure for the isolated binary.
- Keep the spiral alternative live in parallel. Working question:
  `Does the symmetric delayed spiral admit a self-consistent limit cycle or radial turning point that the circular ansatz misses?`
- Spiral track:
  1. upgrade the current constant-`\Omega` logarithmic-spiral benchmark into a variable-pitch or other non-circular ansatz that can realize `\dot r = 0`;
  2. determine whether admissible delayed roots actually realize negative tangential numerator in the Frenet projection, rather than only allowing it algebraically;
  3. add the self-branch analogue of the spiral Frenet decomposition and compare it to the partner branch on the same orbit;
  4. derive a genuine minimum-radius turning condition `\dot r = 0`, `\ddot r \ge 0`;
  5. test whether any such non-circular closure can beat the circular tangential obstruction without extra medium coupling.
- Spiral intuition to preserve:
  1. the circular ansatz hard-codes constant radius, constant speed, constant curvature, rigid branch geometry, and sign-definite tangential contributions;
  2. a true spiral introduces radial velocity, varying curvature, intersections between later tighter turns and earlier wider-turn wakes, changing Jacobian amplification, and the possibility of a turning point before singular continuation.
- Keep the maximum-curvature-wall question tied to both tracks: the Jacobian-null boundary amplifies the full self branch, so the tangential contribution also blows up. That is an obstruction, not yet a resolution.
- Lorentz / GR bridge inside this same stack:
  - treat the bridge as a two-stage theorem program:
    1. prove that moving tri-binaries in the Noether Sea realize `R_\parallel = R_\perp / \gamma` and `T(v) = T_0 \gamma` as a stable delayed-dynamics attractor rather than by tuning,
    2. coarse-grain the same causal medium into a constitutive response that yields `g_{\mu\nu}^{\mathrm{eff}}`, weak-field PPN closure, and suppressed preferred-frame leakage;
  - make the empirical stakes explicit:
    - the absolute-time / Euclidean-void ontology survives only if the exact compensation works at modern Lorentz-violation bounds below `10^{-17}`,
    - if the contraction and clock-slowing law require ad hoc tuning of `\kappa`, `\eta`, or axial-structure-specific detail, the bridge fails;
  - close `d\tau/dt = F(v,\rho,\Phi)` and the substrate-to-metric functional;
  - derive the weak-field map from hit-density / medium variables to `g_{\mathrm{eff}}` constraints in [emergent-metric.md](../../content/markdown/aaa/spacetime/emergent-metric.md) and [proper-time-and-time-dilation.md](../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md);
  - derive the constitutive closure from the coarse-grained medium itself:
    - take the continuum limit of the `\eta`-regularized delayed action and the effective medium Lagrangian seriously enough that the constitutive law is derived rather than postulated,
    - compute the relevant continuum stress-strain or equivalent constitutive variables of the causal medium,
    - derive PPN numbers `\gamma`, `\beta`, and `\alpha_i` to Cassini / LLR precision,
    - recover the target weak-field values `\gamma_{\mathrm{eff}} = 1`, `\beta_{\mathrm{eff}} = 1`, and vanishing preferred-frame coefficients `\alpha_1`, `\alpha_2`, `\alpha_3`,
    - show Shapiro delay and light-bending equivalence to GR at the advertised `10^{-5}` level;
  - keep this as the direct bridge from substrate dynamics to GR tests: match GR in the weak field, then let strong-field differences emerge as predictions rather than assertions.
- Longer-tail dynamics program:
  1. exact Noether derivation of momentum and angular momentum from the delayed action;
  2. `\eta \to 0` existence / uniqueness theory for the exact shell model;
  3. controlled kinetic / coarse-grained equation from the master law;
  4. Lorentz-suppression emergence for moving assemblies in the full dynamics, ideally independent of specific axial-layer details;
  5. effective magnetic / Lorentz-force emergence from assemblies;
  6. full attractor landscape for binaries and tri-binaries;
  7. quantum closure from the master equation.

### 5. Advance the dyadic resonance lock reduced-map program
- Value `7`, Cost `4`, ROI `1.75`.
- [dyadic-resonance-lock.md](../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) should now be treated as the live note for a **candidate** dyadic lock, not as a proof that the full dynamics uniquely select `1:2:4`.
- What is now solid enough to build on:
  - exact periodic closure gives a rational resonance lattice rather than an arbitrary hierarchy,
  - self-similar near-horizon closure gives the broader family $1:s:s^2$,
  - the dyadic member $1:2:4$ appears as the minimal integer member of that family, not yet as a theorem of the full master equation,
  - the theorem-level statements currently established are conditional kinematic radius identities under the dyadic assumptions plus the $\mathbb{Z}_3$ dipole-cancellation identity,
  - the exact global invariants worth anchoring the reduction are total energy and total angular momentum rather than branchwise action slices.
- What remains open:
  - whether the dynamical system actually selects the dyadic member $s=2$ rather than some other rational or self-similar lock,
  - whether the common-speed and self-similar assumptions are valid only near the horizon or across a wider operating range,
  - whether a Lyapunov-Krasovskii, phase-slip, or cycle-averaged causal-work functional can contract the reduced map toward the dyadic fixed point,
  - whether the $\mathbb{Z}_3$ organization is only radiative-stealth bookkeeping or a genuine adiabatic stabilizer,
  - whether any old `1:1:2` branch ledger emerges only on an attractor rather than belonging in the foundation.
- Immediate next move:
  1. Use [dyadic-resonance-lock.md](../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics.md](../phenomenological-heuristics/overview.md) as the scratch/archive notebook.
  2. Build the regularized two-layer phase-amplitude return map at fixed finite `\eta > 0`, not a pure phase-only reduction.
  3. Prove or numerically demonstrate a stable `1:2` fixed point in that reduction, then examine whether chaining the second layer yields a stable `1:2:4` state.
  4. Study the Jacobian and eigenvalues near the suspected dyadic fixed point as `\beta \to 1`.
  5. Only after that revisit `\eta \to 0^+` and promote archive material that can be rederived from the reduced dynamics.

### 6. Close the remaining Standard Model assembly gaps, flavor mixing, and confinement where the leverage is best
- Value `8`, Cost `5`, ROI `1.60`.
- The quark catalog, the basic `SU(3)\times SU(2)\times U(1)` bookkeeping, and the current spinor / statistics framing are now in place. The remaining leverage is:
  - extend [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions for `u,d,c,s,t,b`,
  - finish the remaining quantum-number dictionary pieces from the tri-binary geometry:
    - move from mixing-angle checks against Standard Model pulls to explicit overlap-integral derivations for CKM / PMNS data.
- Push the Standard Model bridge from calibration to geometry:
  - compute the exact 3D charge distributions or effective wavefunctions of the Gen I, II, and III core geometries and use them as mass-basis and weak-basis objects,
  - derive the overlap integrals `V_{ij} = \int \psi_{j,\text{mass}}^* \psi_{i,\text{weak}} \, d\mu` rather than treating transport costs as fit knobs,
  - derive `\kappa_{12}`, `\kappa_{23}`, and any analogous transport parameters from radii ratios, field drag, and shielding mismatch,
  - test whether the CP phase can be recovered as a holonomy or torsion consequence, including the current closure target `\cos\delta = s_{13}/(s_{12}s_{23})`,
  - derive confinement-scale behavior from topological or strain energetics of flux tubes, braids, or other line defects, aiming for linear tension `V \propto r` or `\sigma_{\mathrm{eff}} L` and finite relaxed bounds for closed color-singlet configurations.
- Work the chirality crisis explicitly: show whether spiral handedness can generate the weak `V-A` selection rule. If right-handed neutrinos couple to `W` with the same strength as left-handed ones, the model fails.
- Derive `\alpha` and the other coupling constants from geometry rather than treating them as arbitrary inputs.

### 7. Lock the simulations, regularization, and shell numerics
- Value `8`, Cost `5`, ROI `1.60`.
- Implement tier-0 / tier-1 simulations per [run-protocols.md](../../content/markdown/aaa/validation/simulations/run-protocols.md) and the `validation/simulations/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / tri-binary stability numerically.
- Publish convergence plots and `\mathbb{U}_{\text{now}}` provenance logs.
- Consolidate a formal `\eta > 0` package: existence, uniqueness, continuation criteria, and no-runaway bounds.
- Tie Planck mapping back to the master equation and validate it numerically instead of leaving key identifications conjectural.
- If a quick intuition tool is useful, make a simple model with sliders for escaping potential versus different frequencies so the `f_{\mathrm{MCB}}` behavior is easier to see.

### 8. Finish the remaining black-hole / strong-field quantitative closure
- Value `4`, Cost `5`, ROI `0.80`.
- The core chapter architecture is now in place:
  - [black-holes.md](../../content/markdown/aaa/spacetime/black-holes.md),
  - [singularity-resolution.md](../../content/markdown/aaa/spacetime/singularity-resolution.md),
  - the aligned cosmology chapters,
  - and the equivalence-principle rewrite in [tri-binary-dynamics.md](../../content/markdown/aaa/dynamics/tri-binary-dynamics.md).
- The actual priority here is now narrow and quantitative:
  - derive a stronger observer-level strong-field prediction set,
  - decide the release-channel selection between jets, diffuse outflow, and dark-sector escape,
  - and extract at least one discriminating observable that separates this story from GR-like strong-field behavior.

### 9. Preserve the strong-field / tri-binary hypotheses
- Value `2`, Cost `3`, ROI `0.67`.
- Keep the following strong-field / tri-binary ideas alive while the quantitative closures tighten:
  - the tri-binary may open up inside the black hole, with quadrupole resonance appearing when a given core pops early or late;
  - the event horizon may not be a clean sphere but a rough surface with significant radial depth;
  - there may be a brief neck to planar motion before returning to 3D motion while still shrinking;
  - open questions remain on avoiding zero volume at the event horizon and on whether there is a viable solution exactly at the horizon when all three binaries are at `c_f`;
  - an alternative horizon geometry may look more like a throat or cylinder than a sphere;
  - there may be a nontrivial connection to Fermi-Dirac versus Pauli exclusion.
- Preserve the `4:2:1` model idea even if it turns out to be wrong:
  - maybe the zero on the `4:2:1` scale is wrong;
  - maybe the correct baseline is the MCB frequency rather than `1` Hz;
  - maybe the reference scale is `f_{\mathrm{MCB}}`, with `f_{\max}`, `f_{\max}/2`, `f_{\max}/4`, then subtracting `1`, `2`, `4` from there for each click;
  - maybe the MCB should be treated as zero potential energy and maximum kinetic energy until freeze-out;
  - maybe nature wants `v = c_f` and the Planck-scale juncture to define zero;
  - maybe the internal radius can enter self-hit first as the tri-binary rides the rail;
  - maybe Stacy's gravity / MOND intuition is somehow related to the inner binary crossing `c_f`, though that seems doubtful.

### 10. Run the chapter authoring queue and recover useful old material
- Value `3`, Cost `5`, ROI `0.60`.
- This item is the ranked queue for chapter-writing work.
- This is also now the home of the old material-recovery task. Item `13` is no longer separate.
- For scorecard purposes, this is the main Coverage bucket.
- If the goal is fastest total-score increase, pair this item with item `2` for Coverage + Parameter Closure first.
- Fast practical lift inside this queue: fill empty or thin chapters with formal minimums:
  - definitions,
  - governing equations,
  - closure target,
  - falsification gate.
- Rule of thumb to retain: each `+10` points in one category adds about `+0.56` to the total 18-category mean.
- Use it for both:
  1. improving chapters that already have drafts,
  2. writing missing or thin chapters in the highest-payoff order.
- Feed this queue with legacy-source recovery where it saves time:
  - mine material from WordPress where it can save time,
  - clean up PowerPoints, or better, migrate the worthwhile ones into the web site.
- Current drafted chapters to deepen:
  1. `historical-context-and-missed-opportunities.md`
  2. `information-computation.md`
  3. `philosophy-of-science.md`
  4. `religious-ontologies.md`
  5. `theory-differentials.md`
  6. `unknowns-paradoxes.md`
  7. `major-thinkers.md`
  8. `theory-mapping.md`
- `crisis-in-physics.md` received a full review on March 12, 2026.
- When working this queue, apply targeted label polish to `theory-mapping` and `major-thinkers`, then do publication-style prose smoothing on the most important drafted chapter next.
- Chapter-writing order after that:
  1. `Assembly Atlas`
  2. `Chronology of Nature`
  3. [nuclear-binding.md](../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md)
  4. [nucleon-structure.md](../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md)
  5. [atomic-spectra.md](../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md)
  6. `Dense Matter and Degeneracy Pressure`
  7. [molecular-geometry.md](../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md)
  8. [condensed-matter.md](../../content/markdown/aaa/nuclear-atomic/condensed-matter.md)
  9. [no-go-theorems.md](../../content/markdown/aaa/validation/no-go-theorems.md)
  10. [known-tensions.md](../../content/markdown/aaa/validation/known-tensions.md)
  11. `Hierarchy Problem and Asymptotic Safety`
  12. `Reconstructing Physics and Cosmology`
  13. `Vision for the Future / Toward New Technologies`

### 11. Close the Born-rule / quantum gap only after making it testable
- Value `4`, Cost `8`, ROI `0.50`.
- Populate the missing `quantum/*.md` with pilot-wave / self-hit mechanics, superposition, entanglement, measurement pathways, and explicit predictions.
- Make the Born-rule target fully measure-theoretic rather than only interpretive:
  - construct the relevant Perron-Frobenius or equivalent transfer operator for metastable assemblies under causal background driving,
  - identify the invariant measure on competing attractor basins during deterministic finite-time separatrix crossing,
  - model the background causal weather with enough specificity that the noise floor is part of the theorem rather than a handwave,
  - show that the basin weights recover `P \propto |\psi|^2` and the squared amplitudes of the effective linear envelope equation rather than only qualitative multistability,
  - use that closure to support quantitative scattering and decay predictions rather than only interpretive rhetoric.
- Keep Bell / CHSH / Tsirelson as a hard gate, not a side note.
- Preserve the side question: is the missing neutrino chirality tied to converting a pro-Noether core?

### 12. Convert cosmology from narrative strength to equation-level closure
- Value `2`, Cost `9`, ROI `0.22`.
- Turn the current CMB / tri-binary cosmology story into a predictive transfer-function pipeline.
- Build per-component observable interfaces for `\Lambda\mathrm{CDM}` comparison:
  1. background expansion,
  2. recombination / CMB transfer,
  3. BBN yields,
  4. growth / lensing,
  5. distance-ladder calibration.
- Goal: isolate dependencies so removing one foundation assumption does not collapse the whole stack, and expose exactly where `$\mathbb{A}\mathbb{A}\mathbb{A}$` matches, replaces, or diverges from each component.
- This is the path to direct CMB / `H_0` / `S_8` comparison rather than narrative analogy.

### 13. Defer product / outlook work until the theory spine is stable
- Value `1`, Cost `6`, ROI `0.17`.
- Keep productization, big-picture outlook writing, and future-technology packaging behind the core theory and derivation work.
- This includes:
  - broad future-tech narrative material,
  - product-facing presentation layers that do not sharpen the equations,
  - and other outlook work that is better handled after the mathematical core is compressed and stable.
- Preserve the ideas, but do not let them outrank the derivation spine.

## Info

### Repo / branding / community cleanup notes
- The new `architrino` repository went live on February 17, 2026.
- Go back and clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### Payment / account / identity notes
- Attempt to understand OpenAI billing.
- Use whatever OpenAI credits are available.
- Use the `$50` entourages each month.

### Convenience purchase notes
- Get a Mac mini when the `M5` comes out.

### Research prompts that are still too raw to prioritize highly
- What is the smallest assembly that can make a decision?
- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will.
