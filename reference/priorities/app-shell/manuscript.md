# Interacting Paths on Closed Surfaces

## Research purpose

A fixed sphere gives six interacting architrinos freedom to change their paths in two surface directions while removing expansion and contraction as degrees of freedom. This makes a useful experimental question: given three electrinos, three positrinos and their complete preparation histories, what motion follows from the delayed interaction when only departure from the surface is prevented? Changing the sphere to an ellipsoid then varies curvature and geometric symmetry without prescribing the future paths.

**Claim grade: inferred.** Surface confinement can isolate geometric contributions to candidate assembly motion because it explicitly removes one positional degree of freedom per member. Its usefulness depends on measuring the supplied support and comparing constrained outcomes with free release. Falsifier: if the observed patterns depend entirely on large constraint contributions and disappear on every tested release, the app has studied supported surface motion without identifying a persistent free assembly. That outcome is still a bounded result about the selected experiment.

The shape is an imposed experimental boundary in Euclidean space. It is not a physical membrane, a recovered spacetime geometry or a derived confining mechanism. Its geometric volume is a size descriptor, not proof of an assembly's physical occupied volume. The initial population is 3:3; the app's later population interface can support other declared distributions without assuming that neutrality gives acceleration cancellation.

## Preparation and delayed interaction

Let $T$ be absolute time, $T_0$ the release time, and $\mathbf X_i(T)$ the position of member $i$. Let $\mathbf V_i=\dot{\mathbf X}_i$ be its velocity. A preparation provides each member's polarity and an evaluable continuous past with position, velocity, interpolation uncertainty and enough coverage for the admitted causal roots. Coordinates and velocities at $T_0$ alone do not define a delayed problem. Both the past and the release endpoint must be consistent with the chosen fixed surface, and the endpoint velocity must be tangent to it. The past can be prescribed preparation without being an all-time dynamical solution; that distinction belongs in the experiment record.

Use the canonical [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) for the interaction acceleration $\mathbf A_i[\mathbf X](T)$, with its actual model binding, coupling, self-history policy, root census and event treatment. This notation denotes dependence on the retained histories of all members. The selected additional rule is normal surface support. No tangent speed controller, damping term, root deletion or alternative response factor is selected.

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

## What a pattern would establish

Normal support does not fix speed. At nonzero speed $s_i=\|\mathbf V_i\|$, tangent velocity is perpendicular to support, so

$$
\frac{ds_i}{dT}=\frac{\mathbf V_i\cdot\mathbf A_i}{s_i}.
$$

At zero speed use the nonsingular identity $d(s_i^2)/dT=2\mathbf V_i\cdot\mathbf A_i$. These identities are derived within the selected constrained equation: support has zero velocity dot product on a fixed surface. A solver trace violating them beyond its declared error bounds would falsify the implementation. Neither identity supplies a physical energy functional or proves conservation of the full delayed-history account.

**Claim grade: guessed.** Some preparations may approach recurring paths or a common pattern. Competing outcomes include continuing speed change, clustering, collisions, irregular motion and a solver or root-chart obstruction. No dissipative mechanism is selected to make settling automatic. A proposed attractor is falsified, within its declared preparation basin, by independently checked perturbations that depart from it after numerical error and history-window effects are controlled.

Measure recurrence over retained history windows, not only a snapshot of positions. Return comparisons must include velocities and the relevant source histories. On a sphere, recurrence up to a common rigid rotation can be meaningful; on an ellipsoid, use only transformations preserving the actual shape. A repeated projection, short animation loop or finite return does not establish asymptotic stability. Verify a candidate's dynamical residual before any stability analysis.

The existing [spherical research account](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md) distinguishes prescribed constant-speed candidates, local prepared evolution and independently reviewed candidate exclusions. Those boundaries travel with any case imported into Shell. A negative for one family does not exclude all surface motion, and a prescribed path remains a diagnostic rather than an evolved result.

## Size, frequency and the energy hypothesis

The operator's hypothesis is that shrinking occupied size and increasing energy or frequency alter the path pattern across scales. Capture this as an open assembly-level proposal. The first study varies fixed radius, fixed ellipsoid aspect ratio and initial motion in separate experiments while retaining explicit coupling and histories. Frequency becomes a measured quantity when a recurrent motion or a stated spectral readout supports it; irregular traces need not have a single frequency.

The [scale and energy treatment](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry-scale-and-rigid-candidate.md#dimensionless-equation-and-the-missing-energy-map) identifies dimensionless coupling $g=K_{\mathrm{int}}/(Rc_f^2)$, where $K_{\mathrm{int}}$ is canonical interaction coupling. At fixed coupling and wake speed, a radius change changes $g$; a resized curve is therefore not automatically a new solution. The corresponding [independent adjudication](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-review.md#scaling-and-energy-obligations) owns that result and its exceptions.

**Claim grade: guessed.** A physical energy increase may select a smaller or faster assembly branch. Testing this requires an accepted energy account on the same history, a dynamical branch and a rule selecting among branches. A supported branch with increasing energy and increasing size would overturn a universal shrinkage claim. Until those prerequisites exist, label controls as radius, aspect ratio, initial speed and history; an energy slider would assert a mapping the study has not derived.

A time-dependent shrinking boundary is another experiment: it adds time derivatives of $\phi$ and can exchange an account with the paths. Sweeping separate fixed shapes avoids silently imposing that extra control. Likewise, a band near the surface requires a declared restoring or boundary rule; exact confinement does not define it.

## From supported paths to assembly candidates

A discovered pattern supplies a candidate preparation for unconstrained release. Continue from the same retained history with normal support removed, record the switch as part of the preparation, and measure departure, persistence or failure. Histories generated while supported remain supported past data; free release does not retroactively establish an all-time unconstrained solution.

Shell can reveal geometric organizations worth testing, and can show how much support each needs. A claim of a persistent physical assembly requires independently verified free evolution and the scientific owner's qualification criteria. The distinction remains visible in every displayed result.
