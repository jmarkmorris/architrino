# Surface — Closed-Surface Path Research

## Application brief

### Selected scope

The operator selected a research app for distributions of architrinos supplied with initial conditions and history on a fixed closed shape. Begin with a sphere and three electrinos plus three positrinos, then compare an oblate spheroid and a ring torus. The selected Master Equation variant and speed regime determine the interaction acceleration; its two tangent components determine surface motion. Normal artificial support preserves the shape. [The constrained equation](#the-normal-only-constrained-equation) and [acceleration records](#tangent-dynamics-and-superposed-normal-acceleration) define this rule and its scientific limits.

The geometric domain is the smooth closed surface itself, excluding the enclosed volume from the path domain. Cube edges and corners are outside the selected goal. Admit smooth embedded surfaces without boundary, with at least $C^2$ regularity and nonzero normal gradient for the support equation; [the geometric definition](#geometric-surface-class) explains these conditions.

Surface is the operator-selected app name; `app-surface` is its priority-folder identity. Reuse suitable Borg rendering, camera, path playback and record inspection after checking their actual interfaces. A dedicated entry point does not justify a second solver or copied scientific catalog. No executable app is delivered by this brief.

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

### Precise analytical methods

Analytical methods can establish a result directly or replace a proven portion of numerical work, such as an exact root calculation or a symmetry reduction. They are eligible only when the derivation uses the selected equation, speed regime, constraint and retained-history domain, and accounts for every admitted interaction required by the claim. A prescribed candidate curve is not an analytical solution until its full delayed equation and constraint residual are established. The spherical great-circle example below is exact only for zero interaction; it does not solve the interacting 3:3 problem.

Record the derivation, assumptions, domain, exactness or controlled error, independent mathematical check and quantities actually established. A precise analytical answer need not first be reproduced by an expensive numerical run, but it must retain its own evidence and scope. Label displayed results as analytical, numerical EOM evolution or a declared combination. A reduced analytical method used inside EOM must retain the histories, root accounting and error information needed for continuation; leaving its proven domain routes to full EOM evaluation or a stated halt.

The operator's selection criterion is precision with substantially lower cost. Measure wall time and resource use on matched questions, accuracy and coverage, including applicability checks and any fallback costs, before claiming an advantage. No cost comparison is supplied by this design. **Claim grade: inferred** for the expectation that analytical reductions can avoid expensive evolution in some cases; a reduction that changes the selected law, misses an admitted root, exceeds its error bound or loses its savings after validation and fallback falsifies that expectation for its claimed domain.

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

**Claim grade: derived, self-reviewed; independent review pending.** The displayed support follows from twice differentiating the fixed surface condition and requiring normal-only support. It is a kinematic derivation of the selected artificial rule, not a new substrate interaction. Falsifier: substitution that fails either differentiated constraint, a zero normal gradient in the admitted domain, or a tangent component in $\mathbf C_i$ would invalidate its use. The derivation assumes differentiable motion on an ordinary acceleration chart. Singular impulses require a separately verified constrained event treatment; this formula alone does not authorize continuation through them.

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

**Claim grade: derived, self-reviewed; independent review pending.** The split follows from the orthogonal-projector identities $P_i^2=P_i$ and $P_i\mathbf n_i=0$ and the differentiated constraint above. A nonzero $\mathbf n_i\cdot\mathbf A_i^{\mathrm{tan}}$, failure of $\mathbf A_i^{\mathrm{tan}}+\mathbf A_i^{\mathrm{discard}}=\mathbf A_i$, or failure of $\mathbf A_i+\mathbf C_i=\ddot{\mathbf X}_i$ beyond declared numerical errors would falsify an implementation. These are geometric bookkeeping identities, not an energy conservation or physical confinement claim.

## What a pattern would establish

Normal support does not fix speed. At nonzero speed $s_i=\|\mathbf V_i\|$, tangent velocity is perpendicular to support, so

$$
\frac{ds_i}{dT}=\frac{\mathbf V_i\cdot\mathbf A_i}{s_i}.
$$

At zero speed use the nonsingular identity $d(s_i^2)/dT=2\mathbf V_i\cdot\mathbf A_i$. These identities are derived within the selected constrained equation: support has zero velocity dot product on a fixed surface. A solver trace violating them beyond its declared error bounds would falsify the implementation. Neither identity supplies a physical energy functional or proves conservation of the full delayed-history account.

**Claim grade: guessed.** Some preparations may approach recurring paths or a common pattern. Competing outcomes include continuing speed change, clustering, collisions, irregular motion and a solver or root-chart obstruction. No dissipative mechanism is selected to make settling automatic. A proposed attractor is falsified, within its declared preparation basin, by independently checked perturbations that depart from it after numerical error and history-window effects are controlled.

Measure recurrence over retained history windows, not only a snapshot of positions. Return comparisons must include velocities and the relevant source histories. On a sphere, recurrence up to a common rigid rotation can be meaningful; on an ellipsoid, use only transformations preserving the actual shape. A repeated projection, short animation loop or finite return does not establish asymptotic stability. Verify a candidate's dynamical residual before any stability analysis.

The existing [spherical research account](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md) distinguishes prescribed constant-speed candidates, local prepared evolution and independently reviewed candidate exclusions. Those boundaries travel with any case imported into Surface. A negative for one family does not exclude all surface motion, and a prescribed path remains a diagnostic rather than an evolved result.

## Size, frequency and the energy hypothesis

The operator's hypothesis is that shrinking occupied size and increasing energy or frequency alter the path pattern across scales. Capture this as an open assembly-level proposal. The first study varies fixed radius, fixed ellipsoid aspect ratio and initial motion in separate experiments while retaining explicit coupling and histories. Frequency becomes a measured quantity when a recurrent motion or a stated spectral readout supports it; irregular traces need not have a single frequency.

The [scale and energy treatment](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry-scale-and-rigid-candidate.md#dimensionless-equation-and-the-missing-energy-map) identifies dimensionless coupling $g=K_{\mathrm{int}}/(Rc_f^2)$, where $K_{\mathrm{int}}$ is canonical interaction coupling. At fixed coupling and wake speed, a radius change changes $g$; a resized curve is therefore not automatically a new solution. The corresponding [independent adjudication](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-review.md#scaling-and-energy-obligations) owns that result and its exceptions.

**Claim grade: guessed.** A physical energy increase may select a smaller or faster assembly branch. Testing this requires an accepted energy account on the same history, a dynamical branch and a rule selecting among branches. A supported branch with increasing energy and increasing size would overturn a universal shrinkage claim. Until those prerequisites exist, label controls as radius, aspect ratio, initial speed and history; an energy slider would assert a mapping the study has not derived.

A time-dependent shrinking boundary is another experiment: it adds time derivatives of $\phi$ and can exchange an account with the paths. Sweeping separate fixed shapes avoids silently imposing that extra control. Likewise, a band near the surface requires a declared restoring or boundary rule; exact confinement does not define it.

## From supported paths to assembly candidates

A discovered pattern supplies a candidate preparation for unconstrained release. Continue from the same retained history with normal support removed, record the switch as part of the preparation, and measure departure, persistence or failure. Histories generated while supported remain supported past data; free release does not retroactively establish an all-time unconstrained solution.

Surface can reveal geometric organizations worth testing, and can show how much support each needs. A claim of a persistent physical assembly requires independently verified free evolution and the scientific owner's qualification criteria. The distinction remains visible in every displayed result.
