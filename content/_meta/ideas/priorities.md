# Priorities

Within `High`, `Medium`, and `Low`, items are ordered by estimated ROI: best payoff for the effort first. `Info` keeps status notes, hypotheses, terminology, and reference material that should not be lost but should not stay mixed into the task list.

## High

### 1. Finish the tractable master-equation stack
- Keep dynamics, math, geometry, and mapping as the top theory priority.
- Focus on [master-equation.md](../../markdown/aaa/dynamics/master-equation.md).
- Add the explicit statement that the null-separatrix / Jacobian-null surface is an amplitude wall for the self branch, not by itself a proof of circular closure.
- Push the remaining tractable circular math in this order:
  1. Higher-winding branch asymptotics beyond leading order.
  2. Large-`\beta` asymptotics for the full circular self-force sum.
  3. Exact partner-only circular formulas collected back into the chapter at theorem level.
  4. Bare-kernel circular MCB no-go theorem or existence theorem.
  5. Non-circular periodic-orbit closure for the isolated binary.
- Keep the spiral alternative live while doing the circular cleanup. Working question:
  `Does the symmetric delayed spiral admit a self-consistent limit cycle or radial turning point that the circular ansatz misses?`
- Spiral work order:
  1. Start with the symmetric ansatz `r(\theta) = R_0 e^{-a\theta}` with the partner phase-shifted by `\pi`.
  2. Parameterize `t(\theta)` explicitly.
  3. Recompute the delayed-hit condition `\|\mathbf{x}(\theta)-\mathbf{x}(\theta_0)\| = c_f (t(\theta)-t(\theta_0))`.
  4. Project each delayed branch onto the local Frenet frame.
  5. Check whether tangential / power terms can become braking terms on the spiral.
  6. Look for a radial turning condition `\dot r = 0`, `\ddot r \ge 0` at a minimum radius.
- Preserve the geometric intuition behind the spiral direction:
  - the circular ansatz hard-codes constant radius, constant speed, constant curvature, rigid branch geometry, and sign-definite tangential contributions;
  - a true spiral introduces radial velocity, varying curvature, intersections between later tighter turns and earlier wider-turn wakes, changing Jacobian amplification, and the possibility of a turning point before singular continuation.
- Keep the maximum-curvature-wall question tied to the same analysis: the Jacobian-null boundary amplifies the full self branch, so the tangential contribution also blows up. That is an obstruction, not yet a resolution.
- Longer-tail dynamics items from the same stack:
  1. Exact Noether derivation of momentum and angular momentum from the delayed action.
  2. `\eta \to 0` existence / uniqueness theory for the exact shell model.
  3. Controlled kinetic / coarse-grained equation from the master law.
  4. Lorentz-suppression emergence for moving assemblies in the full dynamics.
  5. Effective magnetic / Lorentz-force emergence from assemblies.
  6. Full attractor landscape for binaries and tri-binaries.
  7. Quantum closure from the master equation.

### 2. Take the fastest scorecard lift first
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

### 3. Close the metric / clock / ruler bridge to GR
- Close `d\tau/dt = F(v,\rho,\Phi)` and the substrate-to-metric functional.
- Derive the weak-field map from hit-density / medium variables to `g_{\mathrm{eff}}` constraints in [emergent-metric.md](../../markdown/aaa/spacetime/emergent-metric.md) and [proper-time-and-time-dilation.md](../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).
- Derive PPN numbers `\gamma`, `\beta`, and `\alpha_i` to Cassini / LLR precision and show Shapiro delay / light-bending equivalence to GR at the advertised `10^{-5}` level.
- Keep this as the direct bridge from substrate dynamics to GR tests: match GR in the weak field, then let strong-field differences emerge as predictions rather than assertions.
- Related mechanical task: derive emergent Lorentz invariance for fast-moving tri-binaries so lifetimes, scattering kinematics, and decay rates recover the standard `\gamma` factor.

### 4. Lock the simulations, regularization, and shell numerics
- Implement tier-0 / tier-1 simulations per [run-protocols.md](../../markdown/aaa/simulations/run-protocols.md) and the `synthesis/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / tri-binary stability numerically.
- Publish convergence plots and `\mathbb{U}_{\text{now}}` provenance logs.
- Consolidate a formal `\eta > 0` package: existence, uniqueness, continuation criteria, and no-runaway bounds.
- Tie Planck mapping back to the master equation and validate it numerically instead of leaving key identifications conjectural.
- If a quick intuition tool is useful, make a simple model with sliders for escaping potential versus different frequencies so the `f_{\mathrm{MCB}}` behavior is easier to see.

### 5. Finish the drafted theory/history/philosophy chapters
- These are already drafted and now need information passes rather than first drafts.
- `crisis-in-physics.md` received a full review on March 12, 2026.
- Next drafted chapters to deepen:
  1. `historical-context-and-missed-opportunities.md`
  2. `information-computation.md`
  3. `philosophy-of-science.md`
  4. `religious-ontologies.md`
  5. `theory-differentials.md`
  6. `unknowns-paradoxes.md`
  7. `major-thinkers.md`
  8. `theory-mapping.md`
- Apply targeted label polish to `theory-mapping` and `major-thinkers`.
- Do publication-style prose smoothing on whichever chapter matters most next.

### 6. Finish the parameter ledger, constants, couplings, and first mass map
- Populate [parameter-ledger.md](../../markdown/aaa/foundations/parameter-ledger.md) with `\kappa`, `\epsilon_0 / \mu_0` analogues, density scales, regularization widths, extraction equations, and observable links.
- Tie that ledger to [action.md](../../markdown/aaa/foundations/action.md), [architrino-si-base-units.md](../../markdown/aaa/foundations/architrino-si-base-units.md), and [constraint-ledger.md](../../markdown/aaa/validation/constraint-ledger.md).
- Move Mass Formulas from roadmap status to one closed mass map, even if first-pass.
- Test the first map against electron / muon / tau or hadron constraints.
- Keep the constants question active: why `h`, `c_f`, and `G`; one spiral; maybe `G` is emergent rather than fundamental.

### 7. Close the Standard Model assembly layer where the leverage is best
- Finish [quarks.md](../../markdown/aaa/assemblies/fermions/quarks.md) as a full quark catalog:
  - six quark geometries,
  - decoration patterns,
  - color phase assignments,
  - architrino counts,
  - coupling rules to gluons,
  - first mass predictions.
- Fill the quantum-number dictionary from the tri-binary geometry:
  - full `SU(3)\times SU(2)\times U(1)` assignments,
  - `Q`, `Y`, `T_3`, `B/L`, and spin / statistics,
  - anomaly cancellation,
  - mixing-angle checks against Standard Model pulls.
- Work the chirality crisis explicitly: show whether spiral handedness can generate the weak `V-A` selection rule. If right-handed neutrinos couple to `W` with the same strength as left-handed ones, the model fails.
- Derive `\alpha` and the other coupling constants from geometry rather than treating them as arbitrary inputs.

### 8. Close the quantum-interpretation gap only after making it testable
- Populate the missing `quantum/*.md` with pilot-wave / self-hit mechanics, superposition, entanglement, measurement pathways, and explicit predictions.
- Show how receiver-side informational ambiguity can yield the Born rule `P \propto |\psi|^2`.
- Keep Bell / CHSH / Tsirelson as a hard gate, not a side note.
- Preserve the side question: is the missing neutrino chirality tied to converting a pro-Noether core?

### 9. Use the highest-value textbook authoring sequence
- Missing canonical homes with the best current payoff:
  1. `Assembly Atlas`
  2. `Chronology of Nature`
- Existing stubs with the best current payoff:
  1. [nuclear-binding.md](../../markdown/aaa/nuclear-atomic/nuclear-binding.md)
  2. [nucleon-structure.md](../../markdown/aaa/nuclear-atomic/nucleon-structure.md)
  3. [atomic-spectra.md](../../markdown/aaa/nuclear-atomic/atomic-spectra.md)

## Medium

### 1. Convert cosmology from narrative strength to equation-level closure
- Turn the current CMB / tri-binary cosmology story into a predictive transfer-function pipeline.
- Build per-component observable interfaces for `\Lambda\mathrm{CDM}` comparison:
  1. background expansion,
  2. recombination / CMB transfer,
  3. BBN yields,
  4. growth / lensing,
  5. distance-ladder calibration.
- Goal: isolate dependencies so removing one foundation assumption does not collapse the whole stack, and expose exactly where `$\mathbb{A}\mathbb{A}\mathbb{A}$` matches, replaces, or diverges from each component.
- This is the path to direct CMB / `H_0` / `S_8` comparison rather than narrative analogy.

### 2. Keep building the scene system, but only in the order that compounds
- Build the 3D visualizer for the oblating Noether core and related scenes such as the sphere.
- Continue the ellipsoid work, aiming to understand time through that geometry.
- Work on the scene builder first.
- Add a language for describing animations.
- Port every scene to that format once the format stabilizes.
- Make the composer use the same frame elements in the corners.
- Use the scene builder in API mode where it helps.
- Keep `sim2rewrite.md` as a later porting source, but wait until the scene builder is working before using it.

### 3. Build the PDG solver after the scene system is usable
- PDG solver tasks:
  - provenance,
  - diagrams,
  - core disposition,
  - use the API that now exists,
  - look into MadGraph for reactions,
  - use the scene builder in API mode.

### 4. Continue the textbook backlog after the highest-ROI chapters
- Missing canonical homes still worth doing after the top group:
  1. `Black Holes, Jets, and Recycling`
  2. `Dense Matter and Degeneracy Pressure`
  3. `Hierarchy Problem and Asymptotic Safety`
  4. `Reconstructing Physics and Cosmology`
- Existing stubs still worth doing after the top group:
  1. [molecular-geometry.md](../../markdown/aaa/nuclear-atomic/molecular-geometry.md)
  2. [condensed-matter.md](../../markdown/aaa/nuclear-atomic/condensed-matter.md)
  3. [no-go-theorems.md](../../markdown/aaa/validation/no-go-theorems.md)
  4. [known-tensions.md](../../markdown/aaa/validation/known-tensions.md)

### 5. Turn the black-hole / strong-field ideas into disciplined chapters
- Work on event horizon, curvature, and singularity in a way that separates geometry, causal-delay dynamics, and observables.
- Keep `Black Holes, Jets, and Recycling` tied to:
  - collapse without singular ontological commitment,
  - jet production,
  - recycling and re-emission,
  - observational signatures.
- Revisit what was written on the equivalence principle and check whether it still makes sense in the current framework.

### 6. Recover useful old material before rewriting it from scratch
- Mine material from WordPress where it can save time.
- Clean up PowerPoints, or better, migrate the worthwhile ones into the web site.

### 7. Build a few focused exploratory applications
- Make application pages that show Gell-Mann's eightfold way and tenfold diagram, placing the relevant particle from the scene creator at each vertex.
- Use those pages to look for correlations with `T_3`, `Y`, and mass patterns.
- Keep Kaiser's MIT lecture 22 as a prompt for that direction.

## Low

### 1. Clean up payment, account, and identity loose ends
- Figure out what to do with the subscription site on Liberapay.
- Figure out Stripe.
- Figure out the QR code situation.
- `architrino@gmail.com` was disabled by Google; appeal filed on March 14, 2026.
- Attempt to understand OpenAI billing.
- Use whatever OpenAI credits are available.
- Use the `$50` entourages each month.

### 2. Do the lightweight repo / branding / community cleanup
- The new `architrino` repository went live on February 17, 2026.
- Go back and clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### 3. Sweep small workflow and conventions tasks
- Double-click pins the VS Code tab.
- Link [textbook-file-structure.md](../../markdown/aaa/archie/textbook-file-structure.md) from the relevant system prompts / notes.
- Keep one H1 heading per Markdown file.
- Branches are now `alpha`, `beta`, `gamma`, `delta`, `omega` in git.
- OG entourage IDs to check in `lmcouncil`: `Jan 13ab`, `15ab`, `17a`, `24a`.

### 4. Leave pure convenience purchases for later
- Get a Mac mini when the `M5` comes out.

### 5. Keep deferred product / outlook work explicitly low priority
- `Vision for the Future / Toward New Technologies` belongs at the end of the textbook stack, not in the core derivation spine.
- Future enhancements once core navigation is stable:
  - branching zoom paths and user-directed exploration,
  - integration of external data sources for scale-specific content,
  - richer materials, particles, and effects once core navigation is stable.
- Narrative export notes to revisit only after the core interaction flow is stable:
  - scripted navigation paths for smooth MP4 output,
  - export presets for desktop `16:9` and mobile `9:16`,
  - formal narrative / export spec later, not now.

## Info

### Current master-equation footholds
- The tractable circular results already added to [master-equation.md](../../markdown/aaa/dynamics/master-equation.md) are:
  - every new circular self-hit branch is born at an interior tangency of `g_\beta(\xi)=\sin\xi-\xi/\beta`, equivalently at a root of `\tan\xi=\xi`;
  - every such branch is born exactly on a Jacobian-null surface, since at threshold `J^\star = 0`;
  - the circular self-branch count grows only linearly, `N_{\text{self}}(\beta)=\beta/\pi+O(1)`;
  - within the symmetric isolated circular two-body ansatz, tangential contributions do not cancel branchwise, so exact constant-speed closure is obstructed unless something beyond the bare ansatz does the work.

### Strong-field / tri-binary hypotheses worth preserving
- One working black-hole idea: the tri-binary may open up inside the black hole, with quadrupole resonance appearing when a given core pops early or late.
- Another working picture: the event horizon may not be a clean sphere but a rough surface with significant radial depth.
- Related image to preserve: a brief neck to planar motion before returning to 3D motion while still shrinking.
- Open volume question: how to avoid volume going to zero at the event horizon.
- Open kinematic question: is there a viable solution exactly at the event horizon when all three binaries are at `c_f`.
- Possible alternative horizon geometry: a throat that looks like a planar circle times `c_f` in translation, more like a cylinder.
- Possible connection to preserve: this may offer a different way to think about Fermi-Dirac versus Pauli exclusion.
- Preserve the `4:2:1` model idea even if it turns out to be wrong:
  - maybe the zero on the `4:2:1` scale is wrong;
  - maybe the correct baseline is the MCB frequency rather than `1` Hz;
  - maybe the reference scale is `f_{\mathrm{MCB}}`, with `f_{\max}`, `f_{\max}/2`, `f_{\max}/4`, then subtracting `1`, `2`, `4` from there for each click;
  - maybe the MCB should be treated as zero potential energy and maximum kinetic energy until freeze-out;
  - maybe nature wants `v = c_f` and the Planck-scale juncture to define zero;
  - maybe the internal radius can enter self-hit first as the tri-binary rides the rail;
  - maybe Stacy's gravity / MOND intuition is somehow related to the inner binary crossing `c_f`, though that seems doubtful.

### Research prompts that are still too raw to prioritize highly
- What is the smallest assembly that can make a decision?
- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will.

### Comparative-theory notes to retain
- Closest prior “assembly architecture” lines for Standard Model replacement / reconstruction:
  1. Preon / rishon models.
  2. Early quark-lepton compositeness.
  3. Technicolor.
  4. Extended technicolor / walking technicolor.
  5. Composite Higgs / pseudo-Nambu-Goldstone Higgs.
  6. Partial compositeness.
  7. Top condensation / topcolor.
  8. Topological / preon braid ideas.
- Bottom line: many frameworks propose Standard Model “assembly,” but none is experimentally established as a full, unique UV-complete replacement.
- The closest literature to the generation idea is compositeness / preon / rishon work where higher generations are treated as excited states of deeper constituents.
- The exact claim “remove or destroy the outer binary and you get the next generation” does not appear to be a standard mainstream formulation.

### Textbook backlog reference snapshot
- Earlier practical authoring order worth remembering:
  1. `Assembly Atlas`
  2. `Chronology of Nature`
  3. [nuclear-binding.md](../../markdown/aaa/nuclear-atomic/nuclear-binding.md)
  4. [nucleon-structure.md](../../markdown/aaa/nuclear-atomic/nucleon-structure.md)
  5. `Black Holes, Jets, and Recycling`
  6. [atomic-spectra.md](../../markdown/aaa/nuclear-atomic/atomic-spectra.md)
  7. `Dense Matter and Degeneracy Pressure`
  8. [molecular-geometry.md](../../markdown/aaa/nuclear-atomic/molecular-geometry.md)
  9. [condensed-matter.md](../../markdown/aaa/nuclear-atomic/condensed-matter.md)
  10. [no-go-theorems.md](../../markdown/aaa/validation/no-go-theorems.md)
  11. [known-tensions.md](../../markdown/aaa/validation/known-tensions.md)
  12. `Hierarchy Problem and Asymptotic Safety`
  13. `Reconstructing Physics and Cosmology`
  14. `Vision for the Future / Toward New Technologies`
