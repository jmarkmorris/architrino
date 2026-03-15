# Priorities

Scoring system:
- Score `Value` and `Cost` on the same `1-10` scale.
- Compute `ROI = Value / Cost`.
- Sort the task list by `ROI`, highest first.
- Break ties by higher `Value`, then lower `Cost`.
- Remove items from the task list once they are genuinely finished; keep background notes in `Info`, not mixed into active priorities.

## Scoring Table

| Item | Value | Cost | ROI |
| --- | ---: | ---: | ---: |
| Fastest scorecard lift | 9 | 3 | 3.00 |
| PDG solver | 10 | 4 | 2.50 |
| Preserve strong-field / tri-binary hypotheses | 5 | 2 | 2.50 |
| 421 resonance reduced-map program | 7 | 3 | 2.33 |
| Unified chapter authoring queue | 8 | 4 | 2.00 |
| Remaining black-hole / strong-field quantitative closure | 4 | 2 | 2.00 |
| Noether-core stability, shielding, parameter ledger, and first mass map | 9 | 5 | 1.80 |
| Remaining Standard Model assembly gaps, flavor mixing, and confinement | 7 | 4 | 1.75 |
| Tractable master-equation stack for Lorentz, quantum, and core closure | 10 | 8 | 1.25 |
| Scene system, scene builder, applications, and later enhancements | 8 | 7 | 1.14 |
| Simulations, regularization, and shell numerics | 9 | 8 | 1.13 |
| Cosmology transfer-function closure | 9 | 8 | 1.13 |
| Lorentz kinematics and metric / clock / ruler bridge to GR | 10 | 9 | 1.11 |
| Born-rule / quantum closure with hard tests | 10 | 9 | 1.11 |
| Recover useful old material | 6 | 6 | 1.00 |
| Deferred product / outlook work | 3 | 5 | 0.60 |

## Overall Task List

### 1. Take the fastest scorecard lift first
- Value `9`, Cost `3`, ROI `3.00`.
- Based on the current `$\mathbb{A}\mathbb{A}\mathbb{A}$` scorecard, the fastest lift is still:
  1. Coverage.
  2. Parameter Closure.
  3. Mass Formulas.
  4. Internal-Core Dynamics.
  5. Charge-Carrier Dynamics.
  6. Cross-Regime Bridge.
  7. UV/IR Completion.
- If the goal is fastest total-score increase, do Coverage + Parameter Closure first.
- If the goal is strongest foundational credibility increase, do Mass + Internal-Core / Charge-Carrier + Cross-Regime Bridge + UV/IR.
- Fast practical lift: fill empty or thin chapters with formal minimums:
  - definitions,
  - governing equations,
  - closure target,
  - falsification gate.
- Rule of thumb to retain: each `+10` points in one category adds about `+0.56` to the total 18-category mean.

### 2. Build the PDG solver after the scene system is usable
- Value `10`, Cost `4`, ROI `2.50`.
- PDG solver tasks:
  - provenance,
  - diagrams,
  - core disposition,
  - use the API that now exists,
  - look into MadGraph for reactions,
  - use the scene builder in API mode.

### 3. Preserve the strong-field / tri-binary hypotheses
- Value `5`, Cost `2`, ROI `2.50`.
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

### 4. Advance the dyadic resonance lock reduced-map program
- Value `7`, Cost `3`, ROI `2.33`.
- [dyadic-resonance-lock.md](../../markdown/aaa/dynamics/dyadic-resonance-lock.md) should now be treated as the live note for a **candidate** dyadic lock, not as a proof that the full dynamics uniquely select `1:2:4`.
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
  1. Use [dyadic-resonance-lock.md](../../markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics.md](phenomenological-heuristics.md) as the scratch/archive notebook.
  2. Build the regularized two-layer phase-amplitude return map at fixed finite `\eta > 0`, not a pure phase-only reduction.
  3. Prove or numerically demonstrate a stable `1:2` fixed point in that reduction, then examine whether chaining the second layer yields a stable `1:2:4` state.
  4. Study the Jacobian and eigenvalues near the suspected dyadic fixed point as `\beta \to 1`.
  5. Only after that revisit `\eta \to 0^+` and promote archive material that can be rederived from the reduced dynamics.

### 5. Run the chapter authoring queue
- Value `8`, Cost `4`, ROI `2.00`.
- This item is the ranked queue for chapter-writing work.
- Use it for both:
  1. improving chapters that already have drafts,
  2. writing missing or thin chapters in the highest-payoff order.
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
  3. [nuclear-binding.md](../../markdown/aaa/nuclear-atomic/nuclear-binding.md)
  4. [nucleon-structure.md](../../markdown/aaa/nuclear-atomic/nucleon-structure.md)
  5. [atomic-spectra.md](../../markdown/aaa/nuclear-atomic/atomic-spectra.md)
  6. `Dense Matter and Degeneracy Pressure`
  7. [molecular-geometry.md](../../markdown/aaa/nuclear-atomic/molecular-geometry.md)
  8. [condensed-matter.md](../../markdown/aaa/nuclear-atomic/condensed-matter.md)
  9. [no-go-theorems.md](../../markdown/aaa/validation/no-go-theorems.md)
  10. [known-tensions.md](../../markdown/aaa/validation/known-tensions.md)
  11. `Hierarchy Problem and Asymptotic Safety`
  12. `Reconstructing Physics and Cosmology`
  13. `Vision for the Future / Toward New Technologies`

### 6. Finish the remaining black-hole / strong-field quantitative closure
- Value `4`, Cost `2`, ROI `2.00`.
- The core chapter architecture is now in place:
  - [black-holes.md](../../markdown/aaa/spacetime/black-holes.md),
  - [singularity-resolution.md](../../markdown/aaa/spacetime/singularity-resolution.md),
  - the aligned cosmology chapters,
  - and the equivalence-principle rewrite in [tri-binary-dynamics.md](../../markdown/aaa/dynamics/tri-binary-dynamics.md).
- The remaining work is narrower:
  - derive stronger observer-level strong-field predictions,
  - clarify release-channel selection between jets, diffuse outflow, and dark-sector escape,
  - and keep neighboring chapters synchronized when the strong-field story changes.
- Treat this as a mostly-completed architecture item, not as a missing-canonical-home item anymore.

### 7. Finish Noether-core stability, shielding, the parameter ledger, and the first mass map
- Value `9`, Cost `5`, ROI `1.80`.
- Move this item from placeholder bookkeeping to first-principles tri-binary closure.
- Populate [parameter-ledger.md](../../markdown/aaa/foundations/parameter-ledger.md) with `\kappa`, `\epsilon_0 / \mu_0` analogues, density scales, regularization widths, extraction equations, and observable links.
- Tie that ledger to [action.md](../../markdown/aaa/foundations/action.md), [architrino-si-base-units.md](../../markdown/aaa/foundations/architrino-si-base-units.md), and [constraint-ledger.md](../../markdown/aaa/validation/constraint-ledger.md).
- Move Mass Formulas from roadmap status to one closed mass map, even if first-pass.
- Theorems and calculations to finish here:
  - solve the exact 6-body non-Markovian path-history equations for the tri-binary and locate the relevant limit cycles or other robust attractors,
  - derive the minimum radius `R_{\text{min}}`, radii ratios, frequency structure, binding scales, shielding / leakage factors, and far-field cancellation directly from the delayed `1/r^2` kernel rather than from calibration targets,
  - turn `\zeta` from a placeholder into a derived quantity and use it to predict the baseline electron mass and the first generational hierarchy checks such as `m_\mu / m_e`,
  - test whether the same derived geometry explains the structural origin of the fine-structure constant `\alpha` from `\kappa` and `c_f`.
- Test the first map against electron / muon / tau or hadron constraints.
- Keep the constants question active: why `h`, `c_f`, and `G`; one spiral; maybe `G` is emergent rather than fundamental.

### 8. Close the remaining Standard Model assembly gaps, flavor mixing, and confinement where the leverage is best
- Value `7`, Cost `4`, ROI `1.75`.
- The quark catalog, the basic `SU(3)\times SU(2)\times U(1)` bookkeeping, and the current spinor / statistics framing are now in place. The remaining leverage is:
  - extend [quarks.md](../../markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions for `u,d,c,s,t,b`,
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

### 9. Finish the tractable master-equation stack for Lorentz, quantum, and core closure
- Value `10`, Cost `8`, ROI `1.25`.
- Keep dynamics, math, geometry, and mapping centered on [master-equation.md](../../markdown/aaa/dynamics/master-equation.md) as the top theory priority.
- This stack has to carry the whole closure program from the `\eta`-regularized delayed action to the continuum bridges:
  1. full 3D translating tri-binary NFDE / DDE analysis for emergent `\gamma`-scaling,
  2. transfer-operator and invariant-measure control for Born-rule emergence from metastable separatrix crossing,
  3. exact 6-body core stability and shielding extraction for the first-principles mass program.
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
- Longer-tail dynamics program:
  1. exact Noether derivation of momentum and angular momentum from the delayed action;
  2. `\eta \to 0` existence / uniqueness theory for the exact shell model;
  3. controlled kinetic / coarse-grained equation from the master law;
  4. Lorentz-suppression emergence for moving assemblies in the full dynamics, ideally independent of specific charge decoration details;
  5. effective magnetic / Lorentz-force emergence from assemblies;
  6. full attractor landscape for binaries and tri-binaries;
  7. quantum closure from the master equation.

### 10. Scene system, scene builder, applications, and later enhancements
- Value `8`, Cost `7`, ROI `1.14`.
- Build the 3D visualizer for the oblating Noether core and related scenes such as the sphere.
- Continue the ellipsoid work, aiming to understand time through that geometry.
- Work on the scene builder first.
- Add a language for describing animations.
- Port every scene to that format once the format stabilizes.
- Make the composer use the same frame elements in the corners.
- Use the scene builder in API mode where it helps.
- Keep `sim2rewrite.md` as a later porting source, but wait until the scene builder is working before using it.
- Use the resulting tooling for a few focused exploratory applications:
  - make application pages that show Gell-Mann's eightfold way and tenfold diagram, placing the relevant particle from the scene creator at each vertex;
  - use those pages to look for correlations with `T_3`, `Y`, and mass patterns;
  - keep Kaiser's MIT lecture 22 as a prompt for that direction.
- Keep later scene/product enhancements explicitly deferred inside the same workstream:
  - `Vision for the Future / Toward New Technologies` belongs after the core scene and theory work, not in the derivation spine;
  - future enhancements once core navigation is stable:
    - branching zoom paths and user-directed exploration,
    - integration of external data sources for scale-specific content,
    - richer materials, particles, and effects once core navigation is stable;
  - narrative export notes to revisit only after the core interaction flow is stable:
    - scripted navigation paths for smooth MP4 output,
    - export presets for desktop `16:9` and mobile `9:16`,
    - formal narrative / export spec later, not now.

### 11. Lock the simulations, regularization, and shell numerics
- Value `9`, Cost `8`, ROI `1.13`.
- Implement tier-0 / tier-1 simulations per [run-protocols.md](../../markdown/aaa/simulations/run-protocols.md) and the `synthesis/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / tri-binary stability numerically.
- Publish convergence plots and `\mathbb{U}_{\text{now}}` provenance logs.
- Consolidate a formal `\eta > 0` package: existence, uniqueness, continuation criteria, and no-runaway bounds.
- Tie Planck mapping back to the master equation and validate it numerically instead of leaving key identifications conjectural.
- If a quick intuition tool is useful, make a simple model with sliders for escaping potential versus different frequencies so the `f_{\mathrm{MCB}}` behavior is easier to see.

### 12. Convert cosmology from narrative strength to equation-level closure
- Value `9`, Cost `8`, ROI `1.13`.
- Turn the current CMB / tri-binary cosmology story into a predictive transfer-function pipeline.
- Build per-component observable interfaces for `\Lambda\mathrm{CDM}` comparison:
  1. background expansion,
  2. recombination / CMB transfer,
  3. BBN yields,
  4. growth / lensing,
  5. distance-ladder calibration.
- Goal: isolate dependencies so removing one foundation assumption does not collapse the whole stack, and expose exactly where `$\mathbb{A}\mathbb{A}\mathbb{A}$` matches, replaces, or diverges from each component.
- This is the path to direct CMB / `H_0` / `S_8` comparison rather than narrative analogy.

### 13. Close Lorentz kinematics and the metric / clock / ruler bridge to GR
- Value `10`, Cost `9`, ROI `1.11`.
- Treat the bridge as a two-stage theorem program:
  1. prove that moving tri-binaries in the Noether Sea realize `R_\parallel = R_\perp / \gamma` and `T(v) = T_0 \gamma` as a stable delayed-dynamics attractor rather than by tuning,
  2. coarse-grain the same causal medium into a constitutive response that yields `g_{\mu\nu}^{\mathrm{eff}}`, weak-field PPN closure, and suppressed preferred-frame leakage.
- Make the empirical stakes explicit:
  - the absolute-time / Euclidean-void ontology survives only if the exact compensation works at modern Lorentz-violation bounds below `10^{-17}`,
  - if the contraction and clock-slowing law require ad hoc tuning of `\kappa`, `\eta`, or decoration-specific structure, the bridge fails.
- Close `d\tau/dt = F(v,\rho,\Phi)` and the substrate-to-metric functional.
- Derive the weak-field map from hit-density / medium variables to `g_{\mathrm{eff}}` constraints in [emergent-metric.md](../../markdown/aaa/spacetime/emergent-metric.md) and [proper-time-and-time-dilation.md](../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).
- Derive the constitutive closure from the coarse-grained medium itself:
  - take the continuum limit of the `\eta`-regularized delayed action and the effective medium Lagrangian seriously enough that the constitutive law is derived rather than postulated,
  - compute the relevant continuum stress-strain or equivalent constitutive variables of the causal medium,
  - derive PPN numbers `\gamma`, `\beta`, and `\alpha_i` to Cassini / LLR precision,
  - recover the target weak-field values `\gamma_{\mathrm{eff}} = 1`, `\beta_{\mathrm{eff}} = 1`, and vanishing preferred-frame coefficients `\alpha_1`, `\alpha_2`, `\alpha_3`,
  - show Shapiro delay and light-bending equivalence to GR at the advertised `10^{-5}` level.
- Keep this as the direct bridge from substrate dynamics to GR tests: match GR in the weak field, then let strong-field differences emerge as predictions rather than assertions.
- Related mechanical task: derive emergent Lorentz invariance for fast-moving tri-binaries so lifetimes, scattering kinematics, and decay rates recover the standard `\gamma` factor.

### 14. Close the Born-rule / quantum gap only after making it testable
- Value `10`, Cost `9`, ROI `1.11`.
- Populate the missing `quantum/*.md` with pilot-wave / self-hit mechanics, superposition, entanglement, measurement pathways, and explicit predictions.
- Make the Born-rule target fully measure-theoretic rather than only interpretive:
  - construct the relevant Perron-Frobenius or equivalent transfer operator for metastable assemblies under causal background driving,
  - identify the invariant measure on competing attractor basins during deterministic finite-time separatrix crossing,
  - model the background causal weather with enough specificity that the noise floor is part of the theorem rather than a handwave,
  - show that the basin weights recover `P \propto |\psi|^2` and the squared amplitudes of the effective linear envelope equation rather than only qualitative multistability,
  - use that closure to support quantitative scattering and decay predictions rather than only interpretive rhetoric.
- Keep Bell / CHSH / Tsirelson as a hard gate, not a side note.
- Preserve the side question: is the missing neutrino chirality tied to converting a pro-Noether core?

### 15. Recover useful old material before rewriting it from scratch
- Value `6`, Cost `6`, ROI `1.00`.
- Mine material from WordPress where it can save time.
- Clean up PowerPoints, or better, migrate the worthwhile ones into the web site.

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
