# Surface — Closed-Surface Path Research

## Application brief

### Selected scope

The operator selected a research app for distributions of architrinos supplied with initial conditions and history on a fixed closed shape. Begin with a sphere and three electrinos plus three positrinos, then compare an oblate spheroid and a ring torus. The selected Master Equation variant and speed regime determine the interaction acceleration; its two tangent components determine surface motion. Normal artificial support preserves the shape. [The constrained equation](#the-normal-only-constrained-equation) and [acceleration records](#tangent-dynamics-and-superposed-normal-acceleration) define this rule and its scientific limits.

The geometric domain is the smooth closed surface itself, excluding the enclosed volume from the path domain. Cube edges and corners are outside the selected goal. Admit smooth embedded surfaces without boundary, with at least $C^2$ regularity and nonzero normal gradient for the support equation; [the geometric definition](#geometric-surface-class) explains these conditions.

Surface is the operator-selected app name; `app-surface` is its priority-folder identity. Reuse suitable Borg rendering, camera, path playback and record inspection after checking their actual interfaces. A dedicated entry point does not justify a second solver or copied scientific catalog. The [spherical Surface entry](../../../surface.html) implements the first bounded local-service experience; [Stage E delivery](../app-solver/analysis/equation-provider-stage-e-2026-10-11.md) records its verification and limits.

Use the standard EOM solver for numerical evolution. Its shared mode selection must identify the Master Equation and speed regime explicitly; the default is the **canonical Master Equation with no speed limit**. Surface confinement is a separate experimental geometry setting, not a replacement solver or an implicit speed ceiling. Precise analytical methods are also permitted where they establish the requested result within their stated domain and are demonstrably much less expensive than numerical evolution.

### Experiment inputs

| Input | Required meaning |
| --- | --- |
| Shape | Fixed surface definition, dimensions, center and orientation. Initial cases: sphere, oblate spheroid and ring torus. Positive finite dimensions and a smooth nonzero normal gradient. |
| Population | Stable member identities and explicit polarity counts; initial preset is 3:3. |
| Preparation | Surface-consistent continuous position and velocity histories with provenance, coverage, interpolant and error bounds. Endpoint velocity must be tangent. |
| Interaction | Exact selected Master Equation variant and model binding, coupling, numerical $c_f=1$, self-history, causal-root, superposition, receiver-response and event policies. Canonical baseline unless a run explicitly selects an approved variant within its authorized scope. |
| Speed regime | Default: unrestricted, with no speed limit. Explicit alternatives are inclusive-ceiling or strict-ceiling domains, where supported by the selected equation. Record the ceiling, boundary response or halt rule and admissible preparation histories. A domain inequality alone supplies no continuation law. |
| Constraint | Explicit normal-only experimental support. No prescribed future path, tangent controller or implicit damping. |
| Run | Finite requested duration, tolerances and resource limits, with accepted coverage and halt reason returned by EOM. |
| Reproducibility | Full input record and deterministic seed for any generated preparation; seed alone cannot replace retained history. |

Preparation presets may include stationary points, same-surface prescribed pasts and perturbations of a verified record. Any past not satisfying the future evolution law is labeled as preparation. Import the existing spherical candidate records with their actual evidence status. Random surface points and tangent directions do not by themselves provide causal history.

### Solver ownership and capability boundary

The EOM solver remains the only forward engine. The existing [canonical contract](../app-solver/contracts/evolution-contract-v1.md#initial-data-retained-history-functions) excludes future constraints. The proposed mode therefore needs an explicit EOM-owned experimental contract and evidence identity covering the normal-support rule, constrained history construction, error bounds, independent controls, restart and event handling. Its output must be distinguishable from accepted unconstrained canonical evolution.

Compute the interaction from the actual constrained histories and ambient Euclidean causal distances. Enforce surface and tangent consistency in accepted evolution segments, including the dense history evaluated by root finding, rather than only in displayed endpoints. Keep interaction acceleration and constraint acceleration separately available. A missing capability or unsupported event yields a stated blocker or halt; the browser must not calculate substitute dynamics or snap a free trajectory to the surface and label it evolved.

Evaluate the selected variant in its specified superposition and receiver-response order, then project the resulting total interaction acceleration at each member. Do not replace that operation with a new response applied separately to projected hits. If a selected variant depends implicitly on acceleration, its interaction and constrained acceleration must be solved consistently together; an unconstrained acceleration followed by projection is not automatically that solution. Record unsupported variant/surface/speed combinations as unavailable.

### Shared solver modes

Equation and speed selection belong to the shared EOM solver and its request contract, so Surface, Borg and headless research consumers use the same definitions. The [EOM mode requirement](../app-solver/manuscript.md#9-equation-modes-and-precise-analytical-methods) owns the common design. Keep three settings distinct: the interaction equation, the admissible speed domain and its boundary rule, and the optional geometric constraint. The default interaction/speed pair is canonical and unrestricted; a Surface request explicitly adds its fixed-surface constraint. An unconstrained request remains unconstrained unless a geometric mode is selected.

Every run must resolve a complete mode identity before execution: equation definition/version and parameters, speed-domain definition and boundary treatment, and geometry/support definition where selected. Preserve that identity in results and checkpoints; changing a mode requires a new run or an explicitly recorded branch. Alternative equations must not be labeled as canonical output merely because EOM computed them. Existing canonical requests and their accepted behavior remain governed by their frozen contract. Unsupported combinations are rejected before evolution, rather than silently falling back to the default.

The operator selected a general equation-provider interface. The [shared design](../app-solver/manuscript.md#composable-equation-providers-and-evaluation-plans) specifies built-in registered providers with explicit evaluation plans, with dynamic plug-in loading as a possible later packaging choice. The named family is [Master Equation with a surface constraint](../master-equation-closure/equation-variants/surface-constraint/definition.md); its initial specification is **Canonical Master Equation with a surface constraint**. The reusable surface module supplies geometry and normal support while the composite definition binds interaction, response order and speed policy. Stage A supplies the [canonical provider/inspection boundary](../app-solver/manuscript.md#implemented-stage-a-provider-boundary); [Stage B](../app-solver/manuscript.md#stage-b-constrained-evolution) adds constrained evolution with validated dense error tubes and ordinary-chart limits. [Stage C](../app-solver/manuscript.md#stage-c-domains-consumer-transport-and-restart) supplies shared v2 requests, durable cancellation and provider/preparation-bound v8 checkpoints, preserving canonical v1/v7 interfaces. Analytical versus numerical method choice is independent. [Stage D](../app-solver/analysis/equation-provider-stage-d-2026-10-11.md) supplies the independently qualified bounded spherical 3:3 calculation. Stage E supplies the [spherical app and bounded record consumption](../app-solver/analysis/equation-provider-stage-e-2026-10-11.md).

The current EOM chart admits exactly certified circular preparation on the selected shape, coherent speed below wake speed and sharp partner roots in accepted past history. This remains a chart restriction even under the default unrestricted selector; it introduces no tangent control or speed-changing response. Stage C also admits inclusive/strict domain selection with halt-only publication checks. Inclusive equality alone does not support forward evolution in the sharper Surface chart. The [Stage B record](../app-solver/analysis/equation-provider-stage-b-2026-10-10.md) and [Stage C record](../app-solver/analysis/equation-provider-stage-c-2026-10-11.md) distinguish mathematical controls, engineering continuity and remaining scientific gates. A cube, an uncertified generic cubic history, singular/event evolution or an unqualified surface band cannot enter this route by passing endpoint checks.

The [existing speed taxonomy](../master-equation-closure/equation-variants/manuscript.md#three-speed-options) defines unrestricted, inclusive $\|\mathbf V_i\|\le c_f$ and strict $\|\mathbf V_i\|<c_f$. Its [examined inclusive response](../master-equation-closure/equation-variants/manuscript.md#the-examined-inclusive-response) acts after summation on finite ordinary input and separately changes self response. Those clauses are not imported into Surface by choosing a ceiling label. Strict equality remains excluded without a continuation rule; inclusive singular input is not repaired by projection. A constrained composite must specify admissible histories, self rules, response order and events together.

### Precise analytical methods

Analytical methods can establish a result directly or replace a proven portion of numerical work, such as an exact root calculation or a symmetry reduction. They are eligible only when the derivation uses the selected equation, speed regime, constraint and retained-history domain, and accounts for every admitted interaction required by the claim. A prescribed candidate curve is not an analytical solution until its full delayed equation and constraint residual are established. The spherical great-circle example below is exact only for zero interaction; it does not solve the interacting 3:3 problem.

Record the derivation, assumptions, domain, exactness or controlled error, independent mathematical check and quantities actually established. A precise analytical answer need not first be reproduced by an expensive numerical run, but it must retain its own evidence and scope. Label displayed results as analytical, numerical EOM evolution or a declared combination. A reduced analytical method used inside EOM must retain the histories, root accounting and error information needed for continuation; leaving its proven domain routes to full EOM evaluation or a stated halt.

The operator's selection criterion is precision with substantially lower cost. Measure wall time and resource use on matched questions, accuracy and coverage, including applicability checks and any fallback costs, before claiming an advantage. No cost comparison is supplied by this design. **Claim grade: inferred** for the expectation that analytical reductions can avoid expensive evolution in some cases; a reduction that changes the selected law, misses an admitted root, exceeds its error bound or loses its savings after validation and fallback falsifies that expectation for its claimed domain.

### Implementation design and agent handoff

The [EOM provider and Surface implementation packet](../app-solver/contracts/equation-provider-design-v1.md) completes the concrete design: built-in registered providers; immutable complete equation plans; canonical/no-limit/unconstrained default; explicit fixed-surface mode; sphere, oblate-spheroid and ring-torus geometry; receiver-total acceleration diagnostics; certified dense-history surface/tangency errors; speed-domain/halt policies; v2 requests, capability queries and checkpoint identity; analytical applicability; and the app preparation/run/inspect/export flow. The packet owns these shared contracts rather than duplicating them in app code.

The initial restricted-speed choices certify the inclusive or strict domain and halt at its boundary where forward response is unspecified. They do not import the taxonomy’s separately examined capped response or its zero-self clause. The initial numerical surface route is ordinary interval execution; unavailable joint, event or implicit combinations remain explicitly unavailable. Cubic history centerlines approximate a constrained path within certified error tubes; endpoint projection alone is insufficient.

The operator selected Codex review/collaboration and Stage A implementation, then Stage B constrained evolution, Stage C transport/restart and Stage D bounded interacting qualification. The [separately authored mathematical review](../app-solver/analysis/equation-provider-design-review-2026-10-10.md) checks the constraint mathematics and bounded integral-map implementation; its findings are integrated into the [handoff](../app-solver/contracts/equation-provider-design-v1.md#12-implementation-agent-handoff). SURFACE-001's design/review obligation is complete. The [Stage B record](../app-solver/analysis/equation-provider-stage-b-2026-10-10.md) and separately reviewed [Stage C record](../app-solver/analysis/equation-provider-stage-c-2026-10-11.md) report passing engineering controls, including exact restart fingerprints and real transport cancellation. The [Stage D calculation](../app-solver/analysis/equation-provider-stage-d-2026-10-11.md) and [separate review](../app-solver/analysis/equation-provider-stage-d-review-2026-10-11.md) qualify one finite spherical 3:3 case; the separately reviewed [Stage E consumer](../app-solver/analysis/equation-provider-stage-e-2026-10-11.md) supplies preparation, calculation, accepted-only playback and exports. Agent allocation is an operator decision, not a measured comparative-capability claim.

### Qualified spherical experiment

The first qualified calculation uses three electrinos and three positrinos with alternating polarity on a fixed sphere of radius $0.1$. Circular past histories at speed $0.01$ cover $[-0.5,0]$; the EOM solver computes the future through time $0.25$ under `canonical-surface/v1`, unrestricted speed, coupling $10^{-6}$ and $c_f=1$. Generated histories contribute delayed emissions during the run. The artificial surface support is explicit, and discarded normal interaction is measured after receiver superposition.

**Claim grade: measured** by the frozen independent reference and [Stage D review](../app-solver/analysis/equation-provider-stage-d-review-2026-10-11.md): three numerical refinements pass root/kernel and normal/tangent/support comparisons, full nominal polynomial plus emitted-tube geometry screens and common-time history comparisons. The largest midpoint equation residual is $9.38\times10^{-11}$. Reviewed production validated inclusion supplies the coherent-solution premise. The accompanying derived root argument covers the declared memory; excluding older unprovided emissions additionally requires the same fixed-shape radius bound for that older past. The [full calculation record](../app-solver/analysis/equation-provider-stage-d-2026-10-11.md) retains original observations, a failed resource admission, the contact halt and falsifiers. This short constrained experiment establishes no settled pattern, stability, recurrence, free release or physical energy law.

Stage E turns this qualified case into a preparation/run/inspect/export experience with accepted-only playback and visible scope. Shared EOM record routes preserve complete raw ledgers on disk while returning bounded histories, checkpoints and receiver-total interval samples. The app distinguishes independently compared retained reference data, newly calculated numerical runs and imported unverified provenance. A [bounded off-equator oblate case](#qualified-oblate-experiment) has independent numerical qualification. Its [browser extension](evidence/oblate-app-delivery-2026-10-12.md) supplies preparation and checked-run playback; the [completed browser verification](evidence/oblate-app-browser-delivery-2026-10-14.md) adds fresh execution, accepted-boundary pause/resume, actual import and desktop/narrow observations. The [qualified ring-torus cases](#ring-torus-interacting-qualification) supply their separate finite scientific comparison and consumer delivery.

### Qualified oblate experiment

The first independently checked interacting oblate case uses semiaxes $(0.1,0.1,0.06)$, polar/equatorial ratio $q=0.6$, three electrinos and three positrinos with alternating polarity, coupling $10^{-6}$ and $c_f=1$. Circular preparation occupies a northern latitude of cylindrical radius $0.06$ and height $0.048$, with speed $0.006$ over $[-0.5,0]$. The ratios $0.06/0.1=3/5$ and $0.048/0.06=4/5$ place that circle exactly on the spheroid. EOM calculates the future over $[0,0.15]$ under canonical surface interaction and unrestricted speed; it does not prescribe future latitude or speed.

Off-equator preparation exercises the polar normal and curvature. An equatorial symmetric run would conceal flattening in this family. Three refinements complete with generated-history feedback. Matched controls use the same reduced latitude on the $q=1$ oblate definition and the sphere, with height $0.08$. Their histories agree within summed emitted error radii, while the separately derived shape equation recovers the sphere exactly at $q=1$.

**Claim grade: measured** by the frozen independently authored [oblate reference and reviewed records](analysis/oblate-qualification-2026-10-12.md#independent-calculation-outcome): delayed roots/kernel, superposed tangent/normal/support, midpoint equation residual, whole-polynomial-plus-emitted-tube geometry/tangency and common-time refinements pass. The largest oblate midpoint residual is approximately $2.01\times10^{-11}$. At time $0.15$, vertical displacements relative to each case's own initial height differ between $q=0.6$ and $q=1$ by approximately $4.91664\times10^{-7}$, exceeding the summed vertical error radii for every member. This resolves a shape-dependent response for the specified mapped preparations; it supplies no universal constitutive or physical energy law. The [separate review](analysis/oblate-qualification-review-2026-10-12.md) owns adjudication.

The scope is one finite artificially supported experiment, bound to the [retained executable and source snapshot](analysis/oblate-qualification-2026-10-12.md#preservation-and-closeout). A subsequent live EOM library port requires separate verification of its rebuilt outputs. Reviewed production inclusion supplies coherent-solution existence; the independent instrument evaluates retained observables rather than proving that inclusion anew. Conditional causal uniqueness covers declared memory under the verified coherent speed/radius bounds; excluding unprovided older hits additionally assumes those older paths obey the same ambient radius bound. A missed root, reference point outside its production enclosure, excess geometry/tangency error, failed sphere recovery or refinement discrepancy beyond summed radii falsifies the corresponding qualification. No settled pattern, stability or free confinement follows. The [bounded inner/outer torus qualification](analysis/torus-qualification-2026-10-14.md) is separately completed below. The oblate app's bounded browser delivery is verified below.

### Ring-torus interacting qualification

The operator selected the [ring-torus scientific comparison](analysis/torus-qualification-2026-10-14.md) after completing oblate browser verification. It is independently qualified over the declared finite interval. A ring torus with major radius $0.1$ and minor radius $0.05$ admits two exact off-equator preparation circles at cylindrical radii $0.13$ and $0.07$, both at height $0.04$. Six alternating electrinos/positrinos follow supplied circular pasts on each shoulder; EOM determines their subsequent supported motion under canonical surface interaction and unrestricted speed. Three numerical refinements per shoulder and invalid-preparation refusal are selected. The torus presets, checked playback and bounded consumer verification are delivered below.

**Claim grade: derived** for the geometric comparison: the outer and inner azimuthal curvature terms have opposite normal signs. The parameterized torus gives $A_{\mathrm{curv}}=-(r\dot\theta^2+\rho\cos\theta\dot\varphi^2)N$, with outward normal $N$, meridional angle $\theta$ and azimuth $\varphi$. The chosen circles have $\cos\theta=0.6$ and $-0.6$. The complete acceleration also includes the delayed tangent interaction; the geometric sign alone predicts neither its complete motion nor stability. Wake propagation still uses ambient Euclidean separation, including chords across the central hole, rather than surface geodesic distance. The surface changes allowed paths and their artificial support, while the selected interaction rule remains the canonical one.

The [qualification protocol](analysis/torus-qualification-2026-10-14.md#predeclared-acceptance) fixes retained history, future interval, independent root/kernel/support and dense geometry checks, refinement comparisons, precision and residual thresholds, and conditional older-tail exclusion. A short supported evolution does not establish motion around both torus cycles, a topological dynamical effect, settling, physical confinement or an energy law. Each result must retain its exact build and preparation; no existing sphere/oblate qualification transfers to it automatically.

**Claim grade: measured, conditional on the emitted coherent-solution tubes:** the separately authored exact-rational [endpoint readout](analysis/torus-qualification-review-2026-10-14.md#independent-resolved-endpoint-readout) places all six members' vertical displacement at time $0.15$ below zero for each outer refinement and above zero for each inner refinement, beyond the respective emitted vertical error radii. Rounded displacements are approximately $-6.805723\times10^{-6}$ and $+3.038547\times10^{-6}$. A displacement interval containing zero would overturn its resolved sign. Changing shoulder changes both cylindrical radius and speed at fixed angular speed, so this is a result for the two specified preparations. The frozen separately authored reference passes delayed-root/kernel sums, receiver-total acceleration/support, full nominal-plus-tube geometry/tangency and all four matched refinement checks at 70/100 digits; the [separate review](analysis/torus-qualification-review-2026-10-14.md) accepts the bounded subcase. Its largest midpoint residual is approximately $1.77\times10^{-10}$, below the declared $2\times10^{-5}$ limit. The coherent-solution existence premise remains production validated inclusion; excluding unprovided older hits remains conditional on the stated ambient-radius bound.

<a id="implemented-spherical-app"></a>

### Implemented surface app

The dedicated [Surface page](../../../surface.html) uses the local EOM service supplied by `npm run dev`. Its preparation controls select a centered, unrotated sphere, oblate spheroid or ring torus, latitude circle, an even population from two to twelve members, circular past, radius, initial speed, coupling, future duration, maximum step and one of the three declared speed domains. Explicit presets supply the equatorial sphere, northern oblate, matched northern sphere and inner/outer northern torus circles. Major/tube radius edits preserve each torus member’s normalized tube coordinates and branch; a preset explicitly replaces preparation when changing between sphere topology and torus topology. The display requires radii that remain strictly separated in binary64, and exact circular speed/radius edits require a terminating decimal angular speed. Each initial 3:3 preset resembles its finite reference preparation; a new run does not inherit independent qualification. Imported requests expose phases, latitude circles and numerical controls. Edits preserve unedited imported history and precision; choosing a preset explicitly replaces them. Exact decimal arithmetic enforces the supplied circle's surface identity, while EOM independently admits the past before execution.

Inspection admits the supplied history and displays the resolved model. Edits invalidate readiness immediately. Start, accepted-boundary Pause, checkpoint-bound Resume and Reset share EOM transport ownership. Playback evaluates published accepted cubics through the existing shared history evaluator, without projection or extrapolation; prepared past remains visibly distinct. The primary support readout is a pair of linked time plots: outward-positive/inward-negative normal support for every member, and the sum of their support magnitudes. Clicking either plot seeks playback, with a shared cursor and member highlighting. Window controls select time averages, with coverage failures and sampled estimates identified explicitly. Receiver selection also shows net/tangent/discarded-normal/curvature/support/total acceleration intervals; normalized direction arrows are optional. Geometry certificate maxima and retained position/velocity error radii are displayed as rounded summaries with full records available separately.

Playback JSON retains preparation, full model, accepted extensions, checkpoint, sampled receiver-total diagnostics and complete-raw references. Complete raw ledgers remain downloadable from their EOM host. The app enforces 12 MiB serialized playback and 48 MiB serialized session allowances and never silently deletes evidence. Imports carry unverified declared provenance; any continuation is revalidated by EOM. Service absence permits preparation and imported replay but reports execution unavailable. This static page has no local dynamics fallback.

**Claim grade: measured** for the engineering experience by the explicit-use Stage E consumer controls, actual EOM pause/resume/download checks, browser DOM observations and retained desktop/narrow screenshots named in [Stage E delivery](../app-solver/analysis/equation-provider-stage-e-2026-10-11.md). The separate [review](../app-solver/analysis/equation-provider-stage-e-review-2026-10-11.md) checks source/receipts and screenshots. Native file-chooser automation stalled; post-correction successful native import round-trip was not repeated, while JSON validation/serialization and operation ownership were checked. An edited request launched with stale inspection, a displayed unaccepted extension, a false complete/durable receipt or browser fallback dynamics falsifies the corresponding engineering claim. None supplies a broader independent scientific result.

**Claim grade: measured, bounded oblate consumer delivery** by the [browser receipt](evidence/oblate-app-browser-delivery-2026-10-14.md) and [independent review](evidence/oblate-app-browser-review-2026-10-14.md): actual fresh Inspect/Start reaches accepted progress; Pause preserves a durable prefix through time 0.02; Resume retains the same model and extends coverage contiguously through 0.15. Actual chooser import admits the preserved playback with unverified declared provenance. Desktop 1280×800 and narrow 390×844 observations verify replay, preparation controls and no horizontal overflow. A stylesheet repair prevents header/navigation and legend/timeline overlap when content wraps. Exact northern presets and negative imports retain their independent consumer controls, and body Z remains the compression/camera axis without projecting future histories. These are checks of the local source/service candidate, not a deployed Pages observation or broader scientific acceptance. The older build-bound numerical qualification remains unchanged. The bounded ring-torus interacting calculation is qualified above; the torus consumer is delivered below.

**Claim grade: measured, bounded torus consumer delivery** by the [delivery](evidence/torus-app-delivery-2026-10-15.md) and [independent review](evidence/torus-app-review-2026-10-15.md): both checked records load/replay, fresh outer EOM execution pauses after accepted progress through 0.02 and resumes to 0.15, and the actual exported playback returns through the file chooser with unverified imported provenance. Fresh inner continuation reaches 0.25 with its numerical grade. Desktop 1280×800 and narrow 390×844 observations show the torus opening and usable controls; invalid major radius disables inspection, while exact corrected inner edits preserve the branch and are admitted. The scientific archives retain their October 14 build bindings. Browser export/chooser calls report severe return delays despite short requested timeouts; their completed files and original observations are preserved, and this is not app-performance evidence. All selected preview groups are closed.

### First research experience

The primary view shows the selected translucent shape, polarity-marked members and their calculated path histories. A short explanation states what was prepared, what was allowed to evolve, what happened over the accepted interval and what remains unestablished. Shape, speed and history are named controls; physical energy is not a preparation slider without an accepted mapping.

Expose setup, Start, Pause, Reset and replay of completed records. Keep future trajectories distinct from prescribed preparation and diagnostic candidate curves. Additional inspection shows support acceleration, speed, close approaches, surface error, causal-root events and solver halts. Wake illustrations preserve ambient propagation. An optional flattening or surface-coordinate view is a presentation transform of the same three-dimensional record.

### Outcome records

Record per-member position, velocity, speed, total interaction acceleration, tangent interaction acceleration, discarded normal interaction vector, curvature acceleration, normal support and surface/tangent residuals over accepted coverage. The discarded vector is calculated only after superposition at each receiving member; no per-hit or per-source discarded-normal records are emitted. Keep all vectors in the same recorded ambient coordinate frame, with their reception times and accepted coverage. Report minimum pair separation, root-chart events and numerical uncertainty. Describe recurrence, clustering or irregular motion only through a named readout with its interval and error bound. Finite recurrence is a candidate observation, not a stability verdict.

Every result retains exact preparation, surface, model and constraint identity. A free-release comparison branches from the same supported history and records removal of support. A shape or scale comparison is a separate calculation with its own preparation. Physical energy, frequency, stability and assembly qualification are displayed only when their scientific source supplies the corresponding account or certificate; otherwise state the specific unestablished quantity.

### Proposed verification scope

Verification belongs with the implementation change and its agreed testing scope; this proposal creates no recurring test suite. Before target evolution, independently check zero-interaction spherical great-circle motion against the analytical reference developed below, recovery of the sphere when ellipsoid semiaxes are equal, and the differentiated constraint identity. Add a separately derived interacting control before reporting coupled six-member correctness. Dense-segment surface and tangent residuals, timestep/error refinement and full-history recurrence comparisons are necessary evidence for the claims they support.

The independent reference must remain separate from the implemented subject. Agreement between a projected implementation and its own output replay establishes repeatability only. No numerical target run is part of this folder-opening task.

### Later extensions

Additional shapes beyond the selected sphere, oblate spheroid and ring torus remain proposals, as listed below. Near-surface bands and moving boundaries are also provisional. Each requires its own declared geometric domain and equation. A dynamically shrinking shape is not included in a sweep of separate fixed-radius experiments. An energy–size–frequency map depends on the accepted history account and branch-selection result owned by the scientific lane.

## Research purpose

A fixed sphere gives six interacting architrinos freedom to change their paths in two surface directions while removing expansion and contraction as degrees of freedom. This makes a useful experimental question: given three electrinos, three positrinos and their complete preparation histories, what motion follows from the delayed interaction when only departure from the surface is prevented? Changing the sphere to an ellipsoid then varies curvature and geometric symmetry without prescribing the future paths.

**Claim grade: inferred.** Surface confinement can isolate geometric contributions to candidate assembly motion because it explicitly removes one positional degree of freedom per member. Its usefulness depends on measuring the supplied support and comparing constrained outcomes with free release. Falsifier: if the observed patterns depend entirely on large constraint contributions and disappear on every tested release, the app has studied supported surface motion without identifying a persistent free assembly. That outcome is still a bounded result about the selected experiment.

The shape is an imposed experimental boundary in Euclidean space. It is not a physical membrane, a recovered spacetime geometry or a derived confining mechanism. Its geometric volume is a size descriptor, not proof of an assembly's physical occupied volume. The initial population is 3:3; the app's later population interface can support other declared distributions without assuming that neutrality gives acceleration cancellation.

## Geometric surface class

The intended geometric object is a **smooth closed surface**: a compact smooth two-dimensional manifold without boundary, embedded in three-dimensional Euclidean space. The description concerns the surface itself, excluding its enclosed interior from the path domain. This terminology is used explicitly in the [University of Utah's differential geometry examination material](https://quals.math.utah.edu/topics/smooth-manifolds-and-embedded-submanifolds/).

- **Surface / two-dimensional manifold:** locally, two coordinates describe a position on it.
- **Closed:** compact and without boundary edges.
- **Smooth:** no creases or corners; tangent planes vary smoothly.
- **Embedded:** situated in three-dimensional space without self-intersections.

Spheres and ellipsoid surfaces belong to this class. A cube boundary is a topological surface, but its creases and corners prevent it from being a smooth embedded surface: neighboring faces give different limiting tangent planes. The operator excludes that nonsmooth geometry from the intended study. A smoothly rounded cube could belong to the geometric class, but no such case is selected.

Smooth usually means derivatives of every order exist and are continuous. The displayed normal-support equation uses second derivatives, so its geometric minimum is a regular $C^2$ surface, meaning twice continuously differentiable with a nonzero normal gradient. Differentiability at each point alone does not establish that requirement. This is a regularity requirement for the equation, not a claim of solver support for every surface in the class.

The selected class permits different topologies. Sphere and ellipsoid surfaces have genus zero, meaning no handles. The selected ring torus has genus one, meaning one handle, so the study is not restricted to sphere topology. For an ellipsoid, the map from a unit-sphere point $(u_1,u_2,u_3)$ to $(au_1,bu_2,cu_3)$, with positive semiaxes, gives an invertible smooth correspondence. This derives their shared surface topology without identifying their curvatures. A crease, self-intersection, boundary edge or failed regularity would invalidate admission to the stated smooth embedded class.

## Surface configurations to test

The following configurations separate changes in shape symmetry, curvature and topology. Their geometric definitions are explicit; their usefulness for explaining assembly dynamics is an inference to be tested, not a measured result. Selection here specifies the app design and does not launch numerical experiments.

| Configuration | Disposition | Geometric definition | Comparison purpose |
| --- | --- | --- | --- |
| Sphere | Selected; first case | Radius $R>0$, genus zero and equal curvature in every tangent direction at every point. | Establish the most symmetric reference and analytical geometry controls. |
| Squashed sphere: oblate spheroid | Selected | Ellipsoid semiaxes $a=b=R$, $c=qR$, with $0<q<1$; compression along one axis. | Change curvature while retaining rotational symmetry and sphere topology. |
| One-loop torus: ring torus | Selected | Major radius $L$ and tube radius $r$, with $L>r>0$; genus one. | Compare paths around the hole and around the tube, and motion on the inner and outer sides. |
| Stretched sphere: prolate spheroid | Proposed additional case | Ellipsoid semiaxes $a=b<c$. | Compare stretching and squashing while retaining rotational symmetry. |
| Triaxial ellipsoid | Proposed additional case | Three positive, mutually unequal semiaxes. | Remove continuous rotational symmetry without adding a handle. |
| Smooth two-lobed surface | Proposed additional case | Two lobes joined by a smooth neck; exact regular surface definition still required. | Compare motion within a lobe and through a narrow connecting region. |

Squashing a sphere along one axis does produce an ellipsoid; when the two perpendicular semiaxes remain equal, the more specific name is **oblate spheroid**. In body coordinates, the selected case obeys

$$
\frac{y_1^2+y_2^2}{R^2}+\frac{y_3^2}{(qR)^2}=1,\qquad 0<q<1.
$$

Here $R$ is the equatorial radius and $q$ is the dimensionless compression factor. The limit $q=1$ recovers the sphere; $q=0$ collapses the surface and is excluded. The [Hunter College geometric explanation](https://www.geo.hunter.cuny.edu/~jochen/gtech201/lectures/lec6concepts/Datums/The%20earths%20shape%20is%20a%20spheroid.htm) distinguishes oblate and prolate spheroids from general ellipsoids.

A ring torus can be specified in body coordinates by two periodic angles $u,v$:

$$
\mathbf y(u,v)=\big((L+r\cos v)\cos u,\;(L+r\cos v)\sin u,\;r\sin v\big),\qquad L>r>0.
$$

The angle $u$ travels around the central hole; $v$ travels around the tube. Translation and fixed rotation place this surface in the ambient space. This is the standard [Ohio State torus parameterization](https://ximera.osu.edu/mooculus/calculus3/normalVectors/digInDrawingATorus). Its area factor is $\|\partial_u\mathbf y\times\partial_v\mathbf y\|=r(L+r\cos v)>0$, so it has a well-defined tangent plane throughout the admitted domain. The inequality $L>r$ also avoids the pinched horn case and the self-intersecting spindle case. The two angles are periodic local coordinates, not a single one-to-one planar chart of the entire torus.

**Claim grade: inferred** for the comparison purposes in the table. Controlled comparisons require declared history preparation and the same selected interaction law and speed regime; shape change alone need not isolate a single causal effect. Falsifier: a proposed shape dependence that disappears under equivalent preparation classes and numerical refinement fails that interpretation. The next artifact is the EOM surface specification and geometry controls, followed by finite calculations once that capability is available.

## Preparation and delayed interaction

Let $T$ be absolute time, $T_0$ the release time, and $\mathbf X_i(T)$ the position of member $i$. Let $\mathbf V_i=\dot{\mathbf X}_i$ be its velocity. A preparation provides each member's polarity and an evaluable continuous past with position, velocity, interpolation uncertainty and enough coverage for the admitted causal roots. Coordinates and velocities at $T_0$ alone do not define a delayed problem. Both the past and the release endpoint must be consistent with the chosen fixed surface, and the endpoint velocity must be tangent to it. The past can be prescribed preparation without being an all-time dynamical solution; that distinction belongs in the experiment record.

Use the selected Master Equation variant for the interaction acceleration $\mathbf A_i[\mathbf X](T)$, with its actual model binding, coupling, self-history policy, root census, superposition/response order and event treatment. This notation denotes dependence on the retained histories of all members. The default is the canonical [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form); another run must explicitly name its selected specification and remain within the [variant registry's authorized scope](../master-equation-closure/equation-variants/README.md). This document does not select or authorize a new interaction variant. Normal surface support is the selected additional geometric rule; no extra tangent speed controller, damping term, root deletion or unrecorded response factor follows from it.

The speed regime is also part of the run's equation identity. An unrestricted domain imposes no ceiling; a strict ceiling excludes equality; an inclusive ceiling admits equality but needs a defined boundary response or an explicit halt where acceleration is undefined. These meanings and their limits are owned by the [equation-variant account](../master-equation-closure/equation-variants/manuscript.md). Surface support does not impose constant speed or supply a missing ceiling law. Record actual member speeds relative to $c_f=1$ separately from the selected domain.

Wake propagation continues through the surrounding Euclidean space. A root's emission time $S<T$ obeys the ambient-distance equation

$$
c_f(T-S)=\left\|\mathbf X_i(T)-\mathbf X_j(S)\right\|.
$$

Here $c_f$ is wake speed, numerically fixed to $1$ in every new instance. The surface constrains architrino positions; it does not replace wake travel distance with arc length along the surface. Geodesic wake propagation would be another model and is outside this experiment.

## The normal-only constrained equation

Describe a smooth fixed surface by $\phi(\mathbf X)=0$. At a point on it, let $\mathbf g=\nabla\phi$ be its nonzero normal gradient and $H=\nabla^2\phi$ its matrix of second derivatives. The artificial acceleration $\mathbf C_i$ is parallel to $\mathbf g_i$ and supplies only the component needed to preserve the surface condition:

$$
\ddot{\mathbf X}_i=\mathbf A_i+\mathbf C_i,\qquad
\mathbf C_i=\lambda_i\mathbf g_i.
$$

Differentiate $\phi(\mathbf X_i)=0$ once to obtain $\mathbf g_i\cdot\mathbf V_i=0$, which is tangent motion. Differentiating again gives

$$
\mathbf g_i\cdot\ddot{\mathbf X}_i+\mathbf V_i^{\mathsf T}H_i\mathbf V_i=0.
$$

Substitution determines the scalar support coefficient uniquely wherever $\mathbf g_i\ne0$:

$$
\lambda_i=-\frac{\mathbf g_i\cdot\mathbf A_i+\mathbf V_i^{\mathsf T}H_i\mathbf V_i}{\|\mathbf g_i\|^2}.
$$

Equivalently, define $P_i=I-\mathbf g_i\mathbf g_i^{\mathsf T}/\|\mathbf g_i\|^2$, where $I$ is the identity matrix and $P_i$ removes a vector's normal component. The constrained acceleration is

$$
\ddot{\mathbf X}_i=P_i\mathbf A_i-\frac{\mathbf V_i^{\mathsf T}H_i\mathbf V_i}{\|\mathbf g_i\|^2}\mathbf g_i.
$$

The second term supplies the turning acceleration required by surface curvature. Merely projecting $\mathbf A_i$ into the tangent plane omits this term. Projecting an already evolved unconstrained trajectory back onto the surface also changes its velocity and retained history; a visually confined trace alone does not solve the equation above.

**Claim grade: derived, independently checked in the [Codex mathematical review](../app-solver/analysis/equation-provider-design-review-2026-10-10.md).** The displayed support follows from twice differentiating the fixed surface condition and requiring normal-only support. It is a kinematic derivation of the selected artificial rule, not a new substrate interaction. Falsifier: substitution that fails either differentiated constraint, a zero normal gradient in the admitted domain, or a tangent component in $\mathbf C_i$ would invalidate its use. The derivation assumes differentiable motion on an ordinary acceleration chart. Singular impulses require a separately verified constrained event treatment; this formula alone does not authorize continuation through them.

For a sphere of center $\mathbf O$ and radius $R>0$, write $\mathbf y_i=\mathbf X_i-\mathbf O$, $\phi=\|\mathbf y\|^2-R^2$ and unit normal $\mathbf n_i=\mathbf y_i/R$. The equation reduces to

$$
\ddot{\mathbf X}_i=(I-\mathbf n_i\mathbf n_i^{\mathsf T})\mathbf A_i-\frac{\|\mathbf V_i\|^2}{R}\mathbf n_i,
\qquad
\mathbf C_i=-\left(\mathbf n_i\cdot\mathbf A_i+\frac{\|\mathbf V_i\|^2}{R}\right)\mathbf n_i.
$$

For an ellipsoid with positive semiaxes $a,b,c$, use body coordinates $\mathbf y$ relative to its fixed center and orientation and $\phi=y_1^2/a^2+y_2^2/b^2+y_3^2/c^2-1$. The gradient and second derivatives in the general formula determine support without assuming that the normal points along the radius. Setting $a=b=c=R$ must reproduce the spherical equation.

An independent analytical control is zero interaction on a unit sphere: $\mathbf X(T)=(\cos(T/2),\sin(T/2),0)$ has speed $1/2$ and acceleration $-\mathbf X/4$. Its curvature acceleration matches the formula exactly at $c_f=1$. This is a reference for future solver verification, not an executed numerical check or a six-member solution.

## Tangent dynamics and superposed normal acceleration

The operator-selected dynamics retain both directions in the two-dimensional tangent plane. One direction can change speed and the other can bend the path within the surface; the rule is not a projection onto velocity alone. First evaluate the total interaction acceleration $\mathbf A_i$ at receiving member $i$ from all admitted self and partner contributions, following the selected variant's superposition and receiver-response order. Only then split that total vector using the unit normal $\mathbf n_i=\mathbf g_i/\|\mathbf g_i\|$ and tangent projector $P_i=I-\mathbf n_i\mathbf n_i^{\mathsf T}$:

$$
\mathbf A_i^{\mathrm{tan}}=P_i\mathbf A_i,\qquad
\mathbf A_i^{\mathrm{discard}}=(I-P_i)\mathbf A_i=(\mathbf n_i\cdot\mathbf A_i)\mathbf n_i.
$$

The first vector is the tangent interaction acceleration that drives surface motion. The second is the normal interaction vector excluded from that driving acceleration. Store $\mathbf A_i^{\mathrm{discard}}$ as a three-component ambient vector at each recorded reception time for each architrino. This is superposition-level bookkeeping at each receiver, not a population-wide sum that could hide cancellations between members. Do not produce discarded-normal acceleration records for individual hits or source members; retain the root and interaction provenance otherwise required by the selected equation. Normal contributions may cancel before the total is projected, which is why this record is defined at the receiver total.

The normal vector required by surface curvature is a separate quantity:

$$
\mathbf A_i^{\mathrm{geom}}=-\frac{\mathbf V_i^{\mathsf T}H_i\mathbf V_i}{\|\mathbf g_i\|^2}\mathbf g_i,\qquad
\ddot{\mathbf X}_i=\mathbf A_i^{\mathrm{tan}}+\mathbf A_i^{\mathrm{geom}},\qquad
\mathbf C_i=\mathbf A_i^{\mathrm{geom}}-\mathbf A_i^{\mathrm{discard}}.
$$

Here $\mathbf A_i^{\mathrm{geom}}$ is the acceleration that keeps a tangent-moving path on the curved surface, and $\mathbf C_i$ is the artificial normal support defined above. The discarded normal interaction vector is therefore not the full support vector. On a sphere, the curvature term is $-\|\mathbf V_i\|^2\mathbf n_i/R$, even when the discarded interaction vector is zero. Logging the total interaction, its tangent and discarded-normal parts, curvature and support separately makes this distinction checkable without retaining per-hit normal decompositions.

**Claim grade: derived, independently checked in the [Codex mathematical review](../app-solver/analysis/equation-provider-design-review-2026-10-10.md).** The split follows from the orthogonal-projector identities $P_i^2=P_i$ and $P_i\mathbf n_i=0$ and the differentiated constraint above. A nonzero $\mathbf n_i\cdot\mathbf A_i^{\mathrm{tan}}$, failure of $\mathbf A_i^{\mathrm{tan}}+\mathbf A_i^{\mathrm{discard}}=\mathbf A_i$, or failure of $\mathbf A_i+\mathbf C_i=\ddot{\mathbf X}_i$ beyond declared numerical errors would falsify an implementation. These are geometric bookkeeping identities, not an energy conservation or physical confinement claim.

### Signed support histories and population summaries

The signed normal support for member $i$ is the projection of its additional support acceleration onto the local outward unit normal:

$$
c_i(T)=\mathbf n_i(T)\cdot\mathbf C_i(T),\qquad
S(T)=\sum_{i=1}^{N}|c_i(T)|.
$$

Positive $c_i$ means outward support and negative $c_i$ means inward support. On a sphere this is the radial direction; on an ellipsoid or torus it is the local surface normal, which need not point away from the global center. The population quantity $S$ adds magnitudes before summing, so opposite signs and antipodal vectors cannot conceal the support needed by individual members. Because the added support is normal-only, $|c_i|=\|\mathbf C_i\|$. These are derived geometric identities, falsified by a tangent component of support, reversed normal orientation or disagreement with this projection beyond the recorded error bounds.

For a selected nonzero window $[T_a,T_b]$, the mean total support and mean per architrino are

$$
\overline S=\frac{1}{T_b-T_a}\int_{T_a}^{T_b}S(T)\,dT,
\qquad \overline M=\frac{\overline S}{N}.
$$

Surface displays every member's signed history against a prominent zero line and $S(T)$ below it. Selecting a curve highlights the same member in the path view and receiver diagnostics. Visibility controls affect only the member plot; population totals always retain all $N$ members. Coincident histories are labelled explicitly, with no artificial displacement of curves. These summaries describe the additional acceleration supplied by the imposed constraint; they are not an energy, physical support-provider or stability account.

The plots retain uncertainty and missing data. EOM support vectors are projected using the normal over the same reception domain and retained position tube, rather than the normal at an unrelated playback time. Whole-slab bounds support a rounded integral reduction only over complete coverage. Analytical endpoint observations show their time and value bounds; connecting their midpoints is display interpolation. Means based on adjacent complete observations use time-weighted trapezoids and are labelled sampled estimates, not certified continuous averages. Missing observations or members break coverage; they are neither zero nor filled across a gap. The longest-complete-span control selects an available averaging window. For the radius-ten replay, physical time is $T=10t$ and physical support is $c_i=l/10$, with the conversion applied once. The release control gives $c_i=1/400$ for each member and $S=3/200$ for the six-member population.

**Claim grade: measured** for the local implementation by the explicit-use analytical controls and actual desktop/narrow browser observations in the [readout verification](analysis/normal-support-time-series-design.md#bounded-implementation-verification--october-29-2026). Incorrect signs or units, changed population totals after hiding a curve, a mean spanning missing data, or cursor disagreement with playback falsifies the corresponding display claim. These checks do not expand the scientific qualification of any retained trajectory.

## What a pattern would establish

Normal support does not fix speed. At nonzero speed $s_i=\|\mathbf V_i\|$, tangent velocity is perpendicular to support, so

$$
\frac{ds_i}{dT}=\frac{\mathbf V_i\cdot\mathbf A_i}{s_i}.
$$

At zero speed use the nonsingular identity $d(s_i^2)/dT=2\mathbf V_i\cdot\mathbf A_i$. These identities are derived within the selected constrained equation: support has zero velocity dot product on a fixed surface. A solver trace violating them beyond its declared error bounds would falsify the implementation. Neither identity supplies a physical energy functional or proves conservation of the full delayed-history account.

**Claim grade: guessed.** Some preparations may approach recurring paths or a common pattern. Competing outcomes include continuing speed change, clustering, collisions, irregular motion and a solver or root-chart obstruction. No dissipative mechanism is selected to make settling automatic. A proposed attractor is falsified, within its declared preparation basin, by independently checked perturbations that depart from it after numerical error and history-window effects are controlled.

Measure recurrence over retained history windows, not only a snapshot of positions. Return comparisons must include velocities and the relevant source histories. On a sphere, recurrence up to a common rigid rotation can be meaningful; on an ellipsoid or torus, use only transformations preserving the actual shape. A repeated projection, short animation loop or finite return does not establish asymptotic stability. Verify a candidate's dynamical residual before any stability analysis.

### Defined six-member recurrence experiment

The [longer-duration experiment design](analysis/recurrence-experiment-2026-10-18.md) fixes the existing outer-shoulder torus preparation, canonical surface equation, unrestricted speed and $c_f=1$. It compares a recent history $H_t=(\mathbf X_i(t+s),\mathbf V_i(t+s))_{i=0}^{5}$ over $-\tau\le s\le0$, with $\tau=0.31$. **Claim grade: derived, conditional** for this memory choice: an admitted ambient radius at most 0.1501 bounds any wake delay by 0.3002. Coherent subwake chart, positive partner separation and the same bound on unprovided older paths remain premises. Existing 0→0.15 torus archives do not contain a complete generated comparison window.

The first anchor is $a=1$ and eligible lags satisfy $P\ge1$. Position discrepancy is divided by the torus extent $\ell=L+r=0.15$; velocity discrepancy is divided by $c_f=1$. Proposed normalized thresholds are $10^{-3}$ and $10^{-4}$, respectively, with numerical enclosure widths at most one tenth of those thresholds. These are research resolution choices, not physical constants. Compare all six complete continuous histories, using one fixed polarity-preserving permutation and, for a relative return, one common axial rotation. Fixed-frame labeled returns are reported separately. The [independent mathematical review](analysis/recurrence-experiment-review-2026-10-18.md) derives the error/tube enclosure and identifies false positives that endpoint or sampled comparisons miss.

Require three disjoint but dependent windows at $a,a+P,a+2P$. Check the first return under one transformation $g$, the second against $g^2H_a$, and the adjacent second return against $gH_{a+P}$ at the same thresholds. The adjacent test matters because two opposite discrepancies from the first anchor can differ by twice the threshold. Exact polynomial bounds on common cells include position and velocity errors; missing coverage or excessive uncertainty remains unresolved. A steady rotation can match relatively at every lag, and low-activity drift can pass finite tolerances without oscillation. Retain activity and the tested lag band rather than assign either behavior a period.

**Claim grade: derived from inspected EOM admission and a measured ABI probe** for the present execution limit: the dominant six-path reservation is $19{,}138{,}560(A+1)$ bytes for cumulative allowance $A$, limiting it to at most 111 under the 2 GiB wire ceiling before other terms. The unchanged 0.01/0.005 settings cannot reach the minimum repeated-return horizon 3 with numerical refinement. The [prepared alternative](analysis/recurrence-experiment-2026-10-18.md#concrete-first-execution-packet) proposes separately qualified 0.06/0.03 steps, 110 cumulative attempts and continuation through 3. Its actual admission, chart validity, accuracy, cost and persistence remain unverified. Longer/finer campaigns need an EOM capacity or proved analytical-method decision; resetting counters or pruning checkpoints is not an existing continuation capability. No new forward calculation, recurrence measurement, settling or stability claim is supplied by defining this experiment.

The existing [spherical research account](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md) distinguishes prescribed constant-speed candidates, local prepared evolution and independently reviewed candidate exclusions. Those boundaries travel with any case imported into Surface. A negative for one family does not exclude all surface motion, and a prescribed path remains a diagnostic rather than an evolved result.

## Size, frequency and the energy hypothesis

The operator's hypothesis is that shrinking occupied size and increasing energy or frequency alter the path pattern across scales. Capture this as an open assembly-level proposal. The first study varies fixed radius, fixed ellipsoid aspect ratio and initial motion in separate experiments while retaining explicit coupling and histories. Frequency becomes a measured quantity when a recurrent motion or a stated spectral readout supports it; irregular traces need not have a single frequency.

The [scale and energy treatment](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry-scale-and-rigid-candidate.md#dimensionless-equation-and-the-missing-energy-map) identifies dimensionless coupling $g=K_{\mathrm{int}}/(Rc_f^2)$, where $K_{\mathrm{int}}$ is canonical interaction coupling. At fixed coupling and wake speed, a radius change changes $g$; a resized curve is therefore not automatically a new solution. The corresponding [independent adjudication](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-review.md#scaling-and-energy-obligations) owns that result and its exceptions.

**Claim grade: guessed.** A physical energy increase may select a smaller or faster assembly branch. Testing this requires an accepted energy account on the same history, a dynamical branch and a rule selecting among branches. A supported branch with increasing energy and increasing size would overturn a universal shrinkage claim. Until those prerequisites exist, label controls as radius, aspect ratio, initial speed and history; an energy slider would assert a mapping the study has not derived.

A time-dependent shrinking boundary is another experiment: it adds time derivatives of $\phi$ and can exchange an account with the paths. Sweeping separate fixed shapes avoids silently imposing that extra control. Likewise, a band near the surface requires a declared restoring or boundary rule; exact confinement does not define it.

## Reviewed six-pole release from rest

Surface includes a separately identified analytical replay of the radius-ten six-pole history. Three positrinos initially occupy $(10,0,0)$, $(0,10,0)$ and $(0,0,10)$; the three electrinos occupy their antipodes. Every member is at rest at release after a complete stationary past. Coupling is $K=1$, normalized wake speed is $c_f=1$, and the dimensionless interaction parameter is $g=1/10$. The exact preparation is read-only in this mode. A fresh EOM calculation for this preparation is not supplied by replaying its analytical records.

The [scientific account](../master-equation-closure/noether-sea-research/manuscript.md#513-retaining-dependence-while-enclosing-the-same-motion) and [recomputed-history synthesis](../master-equation-closure/noether-sea-research/analysis/spherical-six-pole-post-turn-claude-synthesis.md) own the motion and its accepted evidence. The app uses only the accepted prefix and repaired signed-v49 reconstruction; the earlier sign-losing resumed sets are not used. A compact export retains original interval strings, uncertain endpoint times, selected source ranges and source/review hashes. The app checks the complete shipped export identity before loading or importing it. This is faithful evidence consumption, not a new independent scientific verification of the history.

The display maps the common path coordinate onto six great circles. For the positrino initially on axis $i$, its unit position is $n_i=e_i\cos q-(e_{i+1}+e_{i+2})\sin q/\sqrt2$, with indices taken cyclically; the antipodal electrino has position $-10n_i$. Thus the members retain antipodal partners but do not rotate as a rigid octahedron. The speed magnitude is $|w|$, while signed $w=dq/dt$ distinguishes advance from return. Physical time is $T=10t$.

For each selected receiver the table names its two same-polarity partners, two non-antipodal opposite-polarity partners and single opposite-polarity antipode. The retained class sums already include multiplicities $2/2/1$. Tangent signs refer to increasing $q$: a negative contribution slows forward motion but accelerates returning motion. The panel separately shows total tangent acceleration, canonical radial acceleration $r$ and outward-positive additional support $l=-w^2-r$. These displayed acceleration/support values use units $c_f^2/R$; at this radius their physical values are one tenth of the scaled values. Normal arrows refer to the nearest retained sample and are normalized in length for visibility.

**Measured display boundary:** the source-bound export contains 740 observations, including exact release and the first retained window endpoint, and copies 738 admitted step endpoints from 27 history files. It retains 37 total source/review identities. Physical replay coverage stops at the guaranteed lower bound of the final uncertain endpoint, approximately $T=87.466846$. Animation interpolates interval midpoints and does not certify the interpolated curve. In particular, the first span has no saved dense per-time history table: only release and its window-end bounds are retained. Missing early class diagnostics remain unavailable rather than being reconstructed. Rounded readouts are summaries; exact retained intervals remain in the export. The original late-return review's missing negative-source-speed known control remains an explicit qualification.

The [independent display review](evidence/six-pole-replay-review-2026-10-29.md) freezes a separate geometry/scaling reference before subject inspection and checks the adapter, source conversion and panel against it. The [delivery account](analysis/six-pole-replay-2026-10-29.md) records actual browser, import/export and existing-case verification. Event jumps select bracket midpoints for inspection, not exact event instants. Analytical playback is distinct from the EOM checked-run archives, cannot start or resume an EOM job, and carries no recurrence, free-confinement or physical support-provider claim.

## From supported paths to assembly candidates

A discovered pattern supplies a candidate preparation for unconstrained release. Continue from the same retained history with normal support removed, record the switch as part of the preparation, and measure departure, persistence or failure. Histories generated while supported remain supported past data; free release does not retroactively establish an all-time unconstrained solution.

Surface can reveal geometric organizations worth testing, and can show how much support each needs. A claim of a persistent physical assembly requires independently verified free evolution and the scientific owner's qualification criteria. The distinction remains visible in every displayed result.
