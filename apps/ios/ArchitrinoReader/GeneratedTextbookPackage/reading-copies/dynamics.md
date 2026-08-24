# Dynamics

## Master Equation

This chapter answers the first dynamics question: given architrinos moving in absolute time through the Euclidean void, what exactly makes one of them accelerate? The answer is the delayed, receiver-local law used throughout the dynamics branch. It defines what counts as a causal hit, how path history selects the active emission events, and how those hits sum into the acceleration of the receiver.

For the primitive-entity ontology, see [Architrino](../../../../markdown/aaa/foundations/architrino.md). This chapter begins where ontology becomes motion. A causal wake is not a vague field surrounding a transmitter; it is a delayed contact condition between a past emission event and a receiver event. When that condition closes, the receiver samples a line-of-action contribution whose strength is set by the density of emitted causal surfaces at the receiver event.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation. Later sections develop the delay differential equation form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface needed by binaries, Noether braids, effective geometry, and quantum closure.

### Foundations and Causal Geometry

#### Purpose and Scope

This document presents the **Master Equation of Motion (EOM)** governing the lawful evolution of all architrinos in the Euclidean void and absolute time. It is the microscopic dynamics input for later closure programs: assemblies, effective continuum descriptions, observer-level geometry, quantum behavior, and gravity must be recovered from this law only after the corresponding assembly, coarse-graining, and validation burdens are met. The chapter keeps $c_f$ explicit in formulas; setting $c_f=1$ is a nondimensional convention, not a change in the causal law.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time. For one causal hit, $T_t$ is the transmitter emission time and $T_r$ is the receiver reception time, with $T_t<T_r$. Bare $T$ remains the generic absolute-time parameter only where the discussion is not distinguishing the two events. Clock readouts, time-dilation language, and effective metric comparisons belong only to later observer-inference chapters after the assembly dynamics have supplied a branch-certified period record.

In the many-body indexed formulas below, receiver index $i$ occupies role $r$ and transmitter index $j$ occupies role $t$ on each ordered hit. Thus $\mathbf X_i(T_r)=\mathbf X_r(T_r)$ and $\mathbf X_j(T_t)=\mathbf X_t(T_t)$. The role notation prevents the generic indices from hiding which event supplies each position and velocity.

The Master EOM is:

- **Deterministic**: Given complete initial conditions at $T_\ast$, the future is determined, with **deterministic multistability** at threshold regimes; determinism is established at finite mollification $\eta$ under the stated well-posedness hypotheses, and the sharp $\eta\to 0$ limit remains conditional.
- **Non-Markovian**: Depends on full path history, not just instantaneous state.
- **Event-local at the receiver**: Only delayed causal intersections at the receiver event contribute to acceleration (no action-at-a-distance).
- **Causal**: All influences propagate at finite field speed $c_f$.
- **Self-consistent**: Includes self-interaction (self-hit) when same-transmitter causal roots exist; super-field-speed interval history is proved necessary for simple nontrivial self-hit roots, but is not sufficient by itself.

The level distinction used throughout the chapter is:

| Level | What is asserted here | What is not asserted here |
| --- | --- | --- |
| Substrate ontology | Architrinos move in absolute time through the Euclidean void and emit causal wakes. | No fundamental spacetime metric, continuum field substance, or observer reconstruction is assumed. |
| Dynamics | Acceleration is the receiver-local sum over delayed causal-root hits. | A plotted orbit or numerical residual is not a proof unless its branch chart is certified. |
| Effective description | Potentials, fields, one-forms, metrics, and wave functions may be reconstructed after coarse-graining. | Effective variables are not promoted to substrate ontology by their predictive usefulness. |
| Inference and observation | A receiver or observer may infer transmitter configurations from hit records and assembly responses. | Inference does not determine the full ontic history unless the missing path-history data are supplied. |

**Claim-status convention.** **Postulated** names the substrate law itself, while **derived** names a consequence proved from that law on its stated branch domain. **Conditional** holds only under its declared assumptions, while **certified** has passed the declared branch and residual gates, plus any required independence gate, within its stated scope. **Target** names an unproved closure obligation, **diagnostic** names a computable comparison or branch record that cannot establish the underlying dynamics by itself, and **benchmark** names a reference case whose agreement does not promote a general branch claim; these meanings apply chapter-wide, and unlabeled prose does not upgrade any claim.

#### Overview and Key Principle

##### The Central Idea

**Receiver-local relevance principle:**

> The only substrate-level contributions to $\mathbf A_r(T_r)$ are causal wake intersections at the receiver event.

At reception time $T_r$, the acceleration of receiver $r$ at position $\mathbf X_r(T_r)$ depends only on causal wake surfaces that intersect that reception site.

- **Substrate event**: $\mathbf X_r(T_r)$ coincides with an expanding causal isochron emitted by a transmitter at a past time $T_t<T_r$.
- **Path-history input**: the transmitter path determines which emission times solve the causal constraint.
- **Effective reconstruction**: a potential or field value away from the receiver is useful only after one has declared a continuum or diagnostic representation.
- **Inference layer**: transmitter identity, distance, and emission velocity may be reconstructed from additional records, but they are not directly supplied by a single hit.

This is an **event-local delayed interaction rule**: the acceleration is evaluated at the receiver event, but depends on path history through the delayed causal roots.

In the absence of any causal hits, an architrino follows inertial motion: straight-line, constant-velocity trajectories in the fixed Euclidean background.

Operationally, the expanding causal wake is also the theory's minimal bridge between time and space. Absolute time orders emissions, Euclidean distance sets the propagation delay, and the receiver event is where those two inputs are rejoined into one physical interaction. The wake law is therefore not just an acceleration prescription; it is the mechanism that turns temporal ordering plus spatial separation into concrete dynamics.

##### Abstract Form

**Postulated substrate law.** The Master Equation of Motion at abstract level is:

$$
\boxed{
\frac{d^2 \mathbf X_r}{dT_r^2}
=
\sum_{t\ne r}\mathbf A_{r\leftarrow t}(\text{causal history})
+\mathbf A_{r\leftarrow r}(\text{self-hit})
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-75a00188d24fee33)

where:

- $\mathbf A_{r\leftarrow t}(\text{causal history})$: sum of all per-hit accelerations from transmitter $t\ne r$ arriving at receiver $r$ at $T_r$
- $\mathbf A_{r\leftarrow r}(\text{self-hit})$: sum of all self-hit acceleration contributions when the same architrino occupies both causal roles

(The per-hit acceleration $\mathbf A_{r\leftarrow t}(T_r;T_t)$ is defined below in canonical form. The substrate law is acceleration-first. If a force-like bookkeeping symbol is desired, introduce one universal conversion constant $\mu_{\text{arch}}$ and define $\mathbf F_{r\leftarrow t}\equiv\mu_{\text{arch}}\mathbf A_{r\leftarrow t}$.)

**Key insight:** Both terms have the same functional form: a radial inverse-square law weighted by the transmitter-side density of emitted causal surfaces. They differ only in whether transmitter and receiver are the same persistent architrino. The transmitter-side factor sets both root legality and transmitter-emission density. The receiver-side factor controls how a root is replayed as reception time advances; it does not multiply the instantaneous acceleration.

##### Path-History Sum and Integral Representation

The Master EOM is most naturally understood as a **path-history branch sum**: all of the physical content resides in the retained paths of the transmitters, and the causal constraint selects the emission events whose wakes reach the receiver event.

In integral form, the same branch-sum law can be written as

$$
\frac{d^2 \mathbf X_r}{dT_r^2}
= \sum_t \kappa\,\sigma_{tr}\,|q_tq_r|
\int_{-\infty}^{T_r}\mathrm dT_t\;
\frac{\hat{\mathbf r}_t(T_r;T_t)}{r_t^2(T_r;T_t)}
\delta\!\Big(g_{r\leftarrow t}(T_r;T_t)\Big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-af53a2180046cc0a)

where

- $\mathbf r_t(T_r;T_t)=\mathbf X_r(T_r)-\mathbf X_t(T_t)$ and $r_t=\|\mathbf r_t\|$,
- $\hat{\mathbf r}_t=\mathbf r_t/r_t$,
- $g_{r\leftarrow t}(T_r;T_t)=r_t(T_r;T_t)-c_f(T_r-T_t)$,
- $\partial_{T_t}g_{r\leftarrow t}=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)=D_t$,
- $\delta(\cdot)$ enforces the causal constraint $g_{r\leftarrow t}=0$, and
- $\sigma_{tr}=\operatorname{sign}(q_tq_r)$ encodes attraction or repulsion.

The causal delta collapses with the standard transmitter-side root Jacobian, so the transmitter-time part of the integral evaluates to
$$
\int_{-\infty}^{T_r}\mathrm dT_t\;
\! f(T_t)\,\delta\!\big(g_{r\leftarrow t}(T_r;T_t)\big)
=
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\frac{f(T_t)}
{\left|\partial_{T_t}g_{r\leftarrow t}(T_r;T_t)\right|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-305293da3aebce0b)
provided the active roots are simple. This transmitter-time collapse supplies the root-selection denominator. The retained branch record must also track how the receiver path crosses the same emitted wake sequence, because that controls root playback as reception time changes. For a simple branch $T_t=T_{t,\ell}(T_r)$, define
$$
D_t
\equiv
c_f-\hat{\mathbf r}_t(T_r;T_{t,\ell})\cdot\mathbf V_t(T_{t,\ell}),
\qquad
D_r
\equiv
c_f-\hat{\mathbf r}_t(T_r;T_{t,\ell})\cdot\mathbf V_r(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0595b52cd764e9d3)
and
$$
m_{r\leftarrow t}
\equiv
\frac{D_r}{D_t},
\qquad
W_{r\leftarrow t}^{\mathrm{acc}}
\equiv
\frac{c_f}{|D_t|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7a571cb8d4cf8ebc)
Here $m_{r\leftarrow t}=dT_{t,\ell}/dT_r=D_r/D_t$ is the signed root-playback derivative, while $W_{r\leftarrow t}^{\mathrm{acc}}$ is the dimensionless transmitter-side acceleration weight. Receiver velocity changes root playback and future geometry, but it does not change the strength of a causal surface that has already arrived. Acceleration at the reception event depends on the receiver's current position and the transmitter's retained emission history, with no contribution from noncausal points on that path. The transmitter's present position at $T_r$ is not part of the arriving-hit geometry.

For a certified branch chart, simplicity is recorded as a transversality floor:
$$
\left|
\partial_{T_t}g_{r\leftarrow t}(T_r;T_t)
\right|
=
\left|
c_f-\hat{\mathbf r}_t(T_r;T_t)\cdot\mathbf V_t(T_t)
\right|
\ge
\kappa_{\mathrm{hit}}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3a792928c9153685)
When this floor fails, the active root is caustic-like or degenerate and must be routed to a different branch chart or regularization regime. In special geometries the floor can be computed rather than declared; the principal circular partner branch derives $\kappa_{\mathrm{hit}}^{\mathrm{bin}}=c_f(1+\beta_f\sin(\phi/2)) > c_f$ in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#principal-partner-root-certificate), where Binary Dynamics uses $\phi/2=\xi$ for the circular delay angle used below.

##### Autonomous Emission-Labeled Wake Transport

The regular-domain causal-wake geometry has a self-contained present-time state realization. For each transmitter $t$ and emission time $T_e\le T$, retain one emitted surface label
$$
\mathsf w_{t,e}(T)
=
\left(
t,T_e,\mathbf C_{t,e},R_{t,e}(T),c_fq_t\,dT_e
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-482745af2025f5d4)
with emission boundary data
$$
\mathbf C_{t,e}(T_e)=\mathbf X_t(T_e),
\qquad
R_{t,e}(T_e)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6f2ab64749f3bcda)
and free absolute-time update
$$
\frac{d\mathbf C_{t,e}}{dT}=\mathbf0,
\qquad
\frac{dR_{t,e}}{dT}=c_f,
\qquad
\frac{d(c_fq_t\,dT_e)}{dT}=0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e110a2303b56c12a)
The center is the transmitter site at emission and remains fixed in the Euclidean void. The surface radius grows at the primitive wake speed. After emission, this kinematic state reads neither the later transmitter path nor any future receiver path.

Plain language: each instant of emission creates a labeled expanding sphere. Its center is frozen at the place where the emission occurred, while its radius grows by $c_f$ times its age. Later transmitter motion does not drag an already emitted sphere through the void.

The surface measure is conserved during free propagation. With the conventional static-transmitter normalization absorbed into the emission measure, its uniform area density is
$$
\varrho_{t,e}^{\mathrm{surf}}(T)
=
\frac{c_fq_t\,dT_e}{4\pi R_{t,e}^2(T)}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e9dd8680264972d5)
The inverse-square factor is therefore the dilution of one fixed emitted measure over the expanding spherical area. For a finite retained spatial window, the kinematic boundary update exports the labeled surface portion when it crosses the window boundary; it is not silently deleted. This geometric export is not yet an energy or momentum flux.

Plain language: the sphere carries a fixed amount of signed emission measure. As its area grows, the same measure is spread more thinly, producing the inverse-square strength. A local simulation may hand an outgoing piece to its boundary record, but this alone says nothing about how much energy or momentum that piece carries.

For a direction $\boldsymbol\omega\in S^2$, a point on the emitted surface is
$$
\mathbf Y_{t,e}(T,\boldsymbol\omega)
=
\mathbf C_{t,e}
+
c_f(T-T_e)\boldsymbol\omega.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c9cd01bbbbc0f9df)
Consequently every surface element has absolute speed $c_f$, and a receiver at $\mathbf X_r(T_r)$ intersects the surface only when
$$
\left\|
\mathbf X_r(T_r)-\mathbf C_{t,e}
\right\|
=
c_f(T_r-T_e).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7f9d661e443bfd5a)
At a noncoincident intersection, the outward surface normal is
$$
\boldsymbol\omega_{\mathsf h}
=
\frac{
\mathbf X_r(T_r)-\mathbf X_t(T_e)
}{
\left\|
\mathbf X_r(T_r)-\mathbf X_t(T_e)
\right\|
}
=
\hat{\mathbf r}_t.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-78c541d435a0c862)

Plain language: the acceleration direction is not an additional choice. It is the local normal of the actual wake sphere where that sphere meets the receiver, so it points from the emission site to the receiver.

The transparent regular-domain reception rule leaves the kinematic wake surface unchanged and adds the receiver-local acceleration contribution
$$
\mathbf A_r(T_r)
=
\sum_t
\kappa\sigma_{tr}|q_tq_r|c_f
\int_{-\infty}^{T_r}
\frac{\hat{\mathbf r}_t}{r_t^2}
\delta\!\left(
r_t-c_f(T_r-T_e)
\right)
dT_e.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bfc3be319e4c9962)
At fixed $T_r$, differentiating the support function with respect to $T_e$ gives
$$
\frac{\partial}{\partial T_e}
\left[
r_t-c_f(T_r-T_e)
\right]
=
c_f-\mathbf V_t(T_e)\cdot\hat{\mathbf r}_t
=
D_t.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ea30f41aee8f06e5)
The coarea collapse therefore yields
$$
c_f
\int dT_e\,
f(T_e)\,
\delta\!\left(
r_t-c_f(T_r-T_e)
\right)
=
\sum_{T_e\in\mathcal C_{r\leftarrow t}(T_r)}
\frac{c_f\,f(T_e)}{|D_t|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-59ab4cff34d44a58)

Plain language: constant emission time is pushed through the moving transmitter's sequence of sphere centers. Where successive spheres bunch together, the receiver encounters a larger surface density. That geometric conversion produces the canonical acceleration weight $c_f/|D_t|$; receiver velocity is unnecessary because reception time was held fixed during the collapse.

This state also adjudicates the inertially extrapolated direction under the current ontology. A direction-only replacement aimed at
$$
\mathbf X_t(T_e)+\mathbf V_t(T_e)(T_r-T_e)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2513ee184a5d4797)
is not normal to the emitted surface above. Moving the surface center to that extrapolated point would instead give surface-element velocity
$$
\mathbf V_t(T_e)+c_f\boldsymbol\omega,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2a51cd4638a4142e)
whose magnitude is not generally $c_f$. It would define a different propagation law and a different causal support. For a smoothly accelerated transmitter, fixed-reception collapse of that moving-center family has denominator
$$
c_f
-
(T_r-T_e)
\mathbf A_t(T_e)\cdot
\hat{\mathbf r}_{\mathrm{ext}},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d19cae1158dad716)
not the canonical transmitter-velocity denominator.

Plain language: the alternative has only two coherent interpretations, and both leave the current wake ontology. If only the arrow changes, it no longer follows the wake surface normal. If the sphere itself moves with the extrapolated center, its points no longer propagate at the fixed absolute speed $c_f$, and its arrival weight changes as well.

Claim grade: **derived regular-domain state reduction** from fixed-speed causal-surface propagation, constant emission measure, and receiver-local surface-normal response. The executable reference is `scripts/equation-mapping/derive-causal-wake-update-law.mjs`; it checks center autonomy, the surface normal by an independent spatial finite difference, the source-time weight by direct mollified quadrature, and the absolute-speed failure of inertially transported centers. A fixed-speed independently evolving wake whose local normal is the extrapolated direction would refute the directional conclusion. Failure of the quadrature to converge to $c_f/|D_t|$ on a certified simple root would refute the weight reduction.

This result closes only the regular kinematic substate and its line-of-action decision. Transparent reception does not supply the missing maturity, wake energy, wake momentum, or reception-transfer accounts needed for a finite coincident same-transmitter birth and simultaneous energy, momentum, and angular-momentum closure. Those obligations remain fail closed; the present derivation must not be cited as an account-complete Master Equation closure.

##### Caustic Transit and Finite Impulse

The branch expression with $W_{ij}^{\mathrm{acc}}$ should not be interpreted as a permission to pin an architrino at an infinite pointwise acceleration. At a simple delay-map caustic, the branch chart fails, but the time-integrated velocity change can remain finite.

Let $T_t$ denote the transmitter emission-time variable near a degenerate root $(T_{r,\ast},T_{t,\ast})$, and assume the local delay map has the nondegenerate fold form
$$
g(T_r,T_t)
=
\alpha(T_t-T_{t,\ast})^2
+
\lambda(T_r-T_{r,\ast})
+
O\!\left(|T_t-T_{t,\ast}|^3+|T_r-T_{r,\ast}|\,|T_t-T_{t,\ast}|+|T_r-T_{r,\ast}|^2\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-368263439ea5b1fc)
with $\alpha>0$, $\lambda>0$, and $r_{ij}\ge r_{\min}>0$ on the local support. For $T_r<T_{r,\ast}$ the two simple roots satisfy
$$
T_{t,\pm}(T_r)
=
T_{t,\ast}
\pm
\sqrt{\frac{\lambda}{\alpha}(T_{r,\ast}-T_r)}
+
O(T_{r,\ast}-T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dd0b300381789070)
and the Jacobian factor scales as
$$
\left|\partial_{T_t} g(T_r,T_{t,\pm}(T_r))\right|
=
2\sqrt{\alpha\lambda}\sqrt{T_{r,\ast}-T_r}
+
O(T_{r,\ast}-T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-53b644c6a299d5f9)
Thus each branch contribution has at worst the local bound
$$
\left\|
\mathbf A_{ij,\pm}(T_r)
\right\|
\le
\frac{C}{\sqrt{T_{r,\ast}-T_r}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6076a1b1e8af0576)
where $C$ absorbs the bounded numerator, $r_{\min}^{-2}$, polarity factor, and coupling. The mechanical impulse through the caustic window is finite:
$$
\int_{T_{r,\ast}-\varepsilon}^{T_{r,\ast}}
\left\|
\mathbf A_{ij,+}(T_r)
+
\mathbf A_{ij,-}(T_r)
\right\|dT_r
\le
4C\sqrt{\varepsilon}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ceb7d590bafa754)

The same conclusion holds for a finite-order algebraic caustic $g\sim (T_t-T_{t,\ast})^m-\lambda(T_r-T_{r,\ast})$ with finite $m > 1$: the transmitter-side weight scales like $|T_r-T_{r,\ast}|^{-(m-1)/m}$, whose exponent remains below one, so the branch strength is locally integrable in reception time when separation stays positive. A persistent interval with $D_t=0$, a cusp with no finite-order normal form, or a simultaneous collision-floor failure is not covered by this impulse lemma and must remain in the regularized chart. The regularized prescription is therefore to integrate the acceleration through a certified ordinary caustic transit and retain the finite $\Delta\mathbf V$; the state is not held exactly on $D_t=0$ as an infinite-acceleration constraint.

The singular set should be routed by stratum, not by the single phrase "small denominator." Let
$$
\Sigma_{ij}
=
\{(T_r,T_t,\lambda): g(T_r,T_t;\lambda)=0,\ \partial_{T_t} g(T_r,T_t;\lambda)=0\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-556dc1a80dd8f272)
inside a declared one- or multi-parameter branch family. The finite-impulse lemma covers the fold stratum $\Sigma^1$, where $\partial_{T_tT_t}g\ne0$ and the control parameter crosses the fold transversely. Cusp and higher strata, such as $\Sigma^{1,1}$, require extra degeneracy conditions and are not ordinary acceleration contributions. They may merge or split more than one opposite-sign root pair at once, so their ledger transition is not certified by the generic $\Delta N=\pm2,\ \Delta D=0$ fold law until a separate regularized normal form is supplied. Thus $\Sigma^1$ routes to finite impulse plus transition metadata, while $\Sigma^{1,1}$ or deeper routes to a singular-stratum chart before promotion.

The word "set" in $\mathcal{C}_{ij}(T_r)$ should therefore be read as a root set extracted from a continuous path-history integral, not as a replacement for that history. The transmitter path is continuous data. In the sharp causal-wake limit the delta constraint collapses the received contribution to the emission times in $\mathcal{C}_{ij}(T_r)$; with $\eta > 0$ mollification, the received contribution comes from finite-width neighborhoods of those roots. A single transmitter can contribute more than one root at the same receiver event when its worldline crosses the receiver's backward causal surface more than once, especially in curved or super-field-speed history. The same bookkeeping applies to nontrivial self-history roots when $j=i$.

Writing
$$
D_{t,ij}(T_r;T_t)
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot\mathbf V_j(T_t),
\qquad
D_{r,ij}(T_r;T_t)
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot\mathbf V_i(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bbfe7b5baa03d91b)
and
$$
J_{ij}^{t}(T_r;T_t)
\equiv
\frac{D_{t,ij}(T_r;T_t)}{c_f},
\qquad
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\equiv
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4b86652c66695619)
one obtains the exact branch-resolved form
$$
\frac{d^2 \mathbf X_i}{dT_r^2}
=
\sum_j \sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}^2(T_r;T_t)}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\hat{\mathbf{r}}_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d24e3cf4e2542956)
Since $\partial_{T_t}g_{ij}(T_r;T_t)=D_{t,ij}(T_r;T_t)=c_fJ_{ij}^{t}(T_r;T_t)$, the transmitter-time collapse supplies the transmitter-side weight. The numerator $c_f$ fixes the static-transmitter normalization and may instead be absorbed into $\kappa$ if that convention is stated consistently. Receiver motion remains in the root-playback derivative $D_r/D_t$, but not in the instantaneous acceleration weight.

Numerical implementations discretize this representation by sampling candidate emission times and solving for the active roots. The familiar “sum over spherical wake surfaces” is therefore a numerical realization of the same branch-selection rule, not a separate physical mechanism.

**Simple-root transport lemma.** Let
$$
F_{ij}(T_r,S)=\|\mathbf X_i(T_r)-\mathbf X_j(S)\|-c_f(T_r-S)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-16d7c6cb60da06cd)
Here $S$ is a local placeholder for the branch's emission-time root as reception time varies; it is not a third physical time coordinate. On the physical branch, $S(T_r)=T_t$. Suppose $F_{ij}(T_r,S(T_r))=0$ on an interval where the active root is simple. Then $S(T_r)$ is differentiable and
$$
\frac{dS}{dT_r}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T_r;S)\cdot\mathbf V_i(T_r)}
{c_f-\hat{\mathbf{r}}_{ij}(T_r;S)\cdot\mathbf V_j(S)}
=
\frac{1-\hat{\mathbf{r}}_{ij}\cdot\mathbf V_i/c_f}{J^t_{ij}(T_r;S)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2210b5fda86298f6)
Thus a simple causal root moves continuously with receiver time as long as the denominator stays away from zero. Simulations should track this root-transport residual alongside the root residual and the $J$ floor; failure of the transport equation is a branch-chart failure, not an ordinary acceleration fluctuation.

##### Transmitter-Side Roots, Acceleration Weight, and Action Residual

For a retained causal-root record $(i,j,T_r,T_t)$, keep the transmitter-side root floor, transmitter-side acceleration weight, signed root playback, and action residual as separate equations.

**Transmitter-side root floor.** The transmitter, meaning the emitting architrino on this causal hit, enters the root-selection denominator through the delay-map Jacobian
$$
J_{ij}^{t}(T_r;T_t)
=
1-\frac{\hat{\mathbf r}_{ij}(T_r;T_t)\cdot\mathbf V_j(T_t)}{c_f},
\qquad
D_{t,ij}(T_r;T_t)
=
c_fJ_{ij}^{t}(T_r;T_t).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d42a83b347215419)
Only the transmitter velocity projection along $\hat{\mathbf r}_{ij}$ appears in this transversality floor. Tangential transmitter motion still matters through the transmitter path, active root set, separation vector, and inactive-root gaps, but it is not a second instantaneous multiplier.

**Signed root playback.** The receiver velocity controls how the same causal root moves as reception time advances:
$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{1-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_i(T_r)/c_f}
{1-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})/c_f}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cd7f0580078f72e2)
This ratio is a transport quantity, not an acceleration multiplier. The acceleration weight is
$$
W_{ij}^{\mathrm{acc}}(T_r;T_{t,\ell})
=
\frac{c_f}
{\left|c_f-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})\right|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e184c087ad1f1a17)
A chart that changes only receiver velocity at a fixed reception event does not change this arriving contribution. It changes root playback, later receiver positions, and therefore future causal records.

**Action residual.** The variational-action question adds an independent proof burden. On a regularized action chart,
$$
\mu_{\text{arch}}\mathbf A_i(T)
=
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\left(
\mathbf F_{ij,\mathrm{scale}}^{(\eta)}(T)
+
\mathbf C_{ij}^{(\eta)}(T)
\right),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dd7f386ae1fe4597)
and the scale-only action scaffold derives the canonical branch law only when
$$
\lim_{\eta\to0^+}
\int_W
\left\|
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf C_{ij}^{(\eta)}(T)
\right\|dT
=
0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-50c56746487803bc)
with the same branch floors and boundary convention used by the branch chart. If this residual is retained rather than cancelled, it must close as a wake-history term in the same energy, momentum, and angular-momentum account. This residual condition does not alter the transmitter-side law. It is the test for promoting the action scaffold in [Exact Nonlocal Lagrangian](#exact-nonlocal-lagrangian) after the same transmitter-side floors, acceleration weights, signed root-playback records, and boundary convention have been declared.

##### Branch-Chart Closure Object

A local master-equation closure claim should be attached to an explicit branch-chart object, not just to a plotted orbit or a small acceleration residual. For a branch chart on a section $\mathcal{S}$, define
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
\nu_{\mathrm{rec}},
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{return}},
\lambda_{\mathrm{sec}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-79bfe606baa33963)
Here $\mathcal{R}^{\mathrm{act}}$ is the active causal-root set retained by the chart, $\mathcal{G}^{\mathrm{inact}}$ is the collection of inactive branch-gap functions, $\nu_J$ is the active-root transmitter-side Jacobian floor, $\nu_{\mathrm{rec}}$ is the retained transmitter-side acceleration-weight floor or certified bounded interval for $W_{ij}^{\mathrm{acc}}$, $h_{\mathrm{mem}}$ is the required memory depth, $\mathcal{R}_{\mathrm{return}}$ is the return residual on the section, and $\lambda_{\mathrm{sec}}$ is the transverse section-stability margin.

The object is acceptable only when
$$
\nu_J>0,
\qquad
0<\nu_{\mathrm{rec}}<\infty,
\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}} g_a^{ij}>0,
\qquad
0<h_{\mathrm{mem}}<h<\infty,
\qquad
\|\mathcal{R}_{\mathrm{return}}\|\le\epsilon_{\mathrm{return}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-111bdb2c7947a5f1)
and the section return is stable, for example
$$
\rho\!\left(M_{\mathcal{S}}\vert_{E_\perp}\right)
\le
1-\lambda_{\mathrm{sec}},
\qquad
\lambda_{\mathrm{sec}}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6119732fdc47af84)
The inactive-gap condition means that nearby discarded causal roots remain separated from the active chart; the stability condition means that a small transverse section error is trapped rather than amplified.

Plain language: a branch chart is the replayable local record that says which causal roots are active, which nearby roots stay inactive, how much history is needed, and whether the returned section remains stable under small errors.

Equivalently, $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ is the local trivialization data for the causal-root sheaf near the retained history. Promotion requires more than naming the active roots: the map from retained history and section coordinates to active roots, receiver-side branch acceleration contributions, and wake-history increment records must be locally invertible onto the declared chart image, with inverse conditioning controlled by $\nu_J$, $\nu_{\mathrm{rec}}$, the inactive gaps, the finite memory margin, and $\lambda_{\mathrm{sec}}$. A plotted orbit with no controlled inverse is a trace, not a branch chart.

**Local promotion lemma.** If a candidate history supplies $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active-root floors, positive inactive gaps, finite memory, bounded return residual, and stable section monodromy, then the history may support a local master-equation closure claim on that section. The lemma does not prove global closure, eliminate all folds, control the $\eta\to0$ limit, or certify unrelated histories. It only promotes the branch chart from a numerical trace to a locally replayable causal-root closure record.

##### State-Dependent Delay Compatibility

A branch-chart closure object must also be compatible with the delayed history space that generates the active roots. Fix a retained history tube
$$
\mathcal{U}_{\mathfrak{B}}
\subset
C^1\!\left([-h,0],(\mathbb{R}^3)^N\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-35bf8fa182646e31)
around the returned history segment. For each active branch record $\ell$, write its emission offset as $\theta_\ell(\phi)\in[-h,0)$ for a history $\phi\in\mathcal{U}_{\mathfrak{B}}$, and define
$$
F_\ell(\phi,\theta)
=
\left\|
\phi_i(0)-\phi_j(\theta)
\right\|
-c_f(0-\theta)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8afd9ee7338379b2)
The branch chart is history-compatible on $\mathcal{U}_{\mathfrak{B}}$ only if
$$
F_\ell(\phi,\theta_\ell(\phi))=0,
\qquad
\left|\partial_\theta F_\ell(\phi,\theta_\ell(\phi))\right|
\ge c_f\nu_J>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e439e87c3594cee5)
and if every inactive complement remains separated by the declared positive gap. Under these conditions the implicit-function theorem gives $C^1$ dependence of $\theta_\ell$ on the retained history, so the branch acceleration, root-transport residual, transmitter-side acceleration-weight record, and wake-history Noether increments are functionals on one local history chart rather than pointwise records that only happen to close at one evaluation time. This is the reconstruction-regularity content of the branch chart: the root reconstruction has an inverse bound controlled by the transversality floor, schematically $\|D\theta_\ell\|\lesssim (c_f\nu_J)^{-1}$ times the history-evaluation norm, until a fold or chart boundary is reached.

This compatibility condition is a theorem-target requirement, not a new acceleration law. It says that a promoted branch chart must define a locally replayable delayed functional system: nearby retained histories must keep the same root identities, positive transmitter-side Jacobian floor, bounded transmitter-side acceleration-weight record, inactive gaps, and finite memory depth until a declared fold, branch transition, or chart boundary is reached.

##### Local-To-Global Branch-Chart Gluing Target

The branch-chart object above also defines a candidate causal-root sheaf for global closure. For an open history or parameter neighborhood $U$, let
$$
\mathcal{F}_{\mathrm{root}}(U)
=
\{\text{admissible branch charts on }U\text{ with the declared regularization data}\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e220dba094df61be)
and restrict a chart from $U$ to $V\subset U$ by restricting its active-root records, inactive gaps, memory tube, and endpoint convention. The implicit-function theorem supplies the local restriction maps while the root identities remain simple.

Global closure is the additional statement that local sections of $\mathcal{F}_{\mathrm{root}}$ glue. On an overlap $U_\alpha\cap U_\beta$, two local charts must agree not merely on the plotted trajectory but on the signed causal-root ledger, branch labels, endpoint convention, wake-history charges, and transition metadata. The global branch charts are the $H^0$ sections of this sheaf over the declared history window. A mismatch on triple overlaps defines a Cech-style obstruction class in $\check H^1(\{U_\alpha\};\mathcal{F}_{\mathrm{root}})$: locally replayable charts may exist while no single global branch chart exists. This is a theorem target, not a new postulate. It gives proof programs an explicit failure mode between "local residuals are small" and "the Master Equation branch is globally closed."

##### Dual-Mollified Absolute-Time Evolution Law

For proof work, branch sums should be derived from one regularized absolute-time law rather than treated as the primary definition through every causal fold. Fix a memory horizon
$$
h>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dcbd8ac754c16aa6)
a causal-wake-surface width
$$
\eta>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ea0b685d8b374df3)
and a short-distance core scale
$$
\epsilon_c>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-effa7b083d300eed)
Define
$$
\mathbf r_{ij}(T_r,T_t)
\equiv
\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
r_{ij}(T_r,T_t)\equiv \|\mathbf r_{ij}(T_r,T_t)\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-55c1bbf23f546444)
and, away from the zero vector,
$$
\widehat{\mathbf r}_{ij}(T_r,T_t)
\equiv
\frac{\mathbf r_{ij}(T_r,T_t)}{r_{ij}(T_r,T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b77e33b0c3477625)
The dual-mollified finite-memory evolution law is
$$
\boxed{
\frac{d^2\mathbf X_i}{dT_r^2}
=
\kappa
\sum_j \sigma_{ij}|q_iq_j|
\int_{T_r-h}^{T_r}
\frac{\mathbf r_{ij}(T_r,T_t)}
{\left(r_{ij}^2(T_r,T_t)+\epsilon_c^2\right)^{3/2}}
c_f
\delta_\eta\!\big(r_{ij}(T_r,T_t)-c_f(T_r-T_t)\big)\,dT_t
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f3d38778f6559850)
At $\mathbf r_{ij}=\mathbf 0$, the softened vector kernel multiplying $\delta_\eta$ is defined by its continuous extension, which is $\mathbf 0$.

The sign convention remains
$$
\sigma_{ij}=\mathrm{sign}(q_iq_j)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c826175966057e0)
This is the convention used in the exact branch law. For equal-magnitude charges
$$
|q_i|=\epsilon
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dfc085e6ddee2fc8)
the factor
$$
|q_iq_j|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-41fbffa3e9379ff3)
reduces to
$$
\epsilon^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-454720b62ed063d2)

This equation is the reference law for certification work on the dual-mollified problem. The causal-surface mollifier
$$
\delta_\eta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-23c6c3ffa2f7dec7)
selects causal surfaces with finite width, while
$$
\epsilon_c
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e14381ea291259b2)
smoothly regularizes the near-collision inverse-square amplitude. The factor $c_f$ supplies the static-transmitter normalization. On a finite simple-root chart, collapse of the causal-surface delta function gives
$$
\int
\frac{\mathbf r_{ij}}
{\left(r_{ij}^2+\epsilon_c^2\right)^{3/2}}
c_f\,\delta(g_{ij})\,dT_t
=
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{\mathbf r_{ij}}
{\left(r_{ij}^2+\epsilon_c^2\right)^{3/2}}
\frac{c_f}{|D_{t,ij}|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9d56381b92186eaf)
Thus the $\epsilon_c\to0^+$ limit away from coordinate coincidence recovers the canonical inverse-square transmitter-side branch law. Branch-resolved formulas are local reductions of this equation on finite simple-root charts. They should not be used as the global definition across causal folds, caustic transit, or chart-boundary verification.

The two regulators quarantine different singular loci. The width $\eta$ regularizes the causal-surface collapse, branch folds, and caustic-transit impulse; the core scale $\epsilon_c$ regularizes the coincidence or diagonal collision locus. A theorem packet may refine them together for computation, but a sharp-limit claim must state which of $\eta\to0^+$ and $\epsilon_c\to0^+$ is being taken, and why the other singular locus remains controlled during that limit.

Coordinate coincidence is also a provenance question, not an annihilation rule. Two architrinos may share $\mathbf X_i(T)=\mathbf X_j(T)$ on one absolute-time slice only as a boundary case of the retained history record; the next admissible update is determined by their identities, polarities, velocities, past causal-wake ledgers, and the same $\eta,\epsilon_c$ convention. If two like-polarity records agree through the retained memory window up to label permutation, the deterministic law is quotient-degenerate: relabeling the records changes no acceleration contribution until a provenance-visible history distinguishes them. If the polarities, velocities, or retained path histories differ, later incoming causal wakes can separate the records even though their current coordinates coincided. Thus the $r=0$ stratum is not a contact interaction or annihilation channel. It is a regularized or quarantined branch condition whose continuation must preserve provenance.

##### Finite-Regulator Pathology Quarantine Theorem Target

The classical point-transceiver pathologies are not closed by the sharp branch formula alone. The theorem target is finite-$\eta$, branch-chart local, and conditional on one regularized action and energy convention. Fix a finite architrino set, a finite window $W=[T_a,T_b]$, a memory depth $h < \infty$, a causal-surface width $\eta > 0$, a core scale $\epsilon_c > 0$, and a branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1bb64bcad800fc98)
whose retained records are generated by the dual-mollified evolution law above.

The admissibility assumptions are:

1. The evolution is causal in absolute time: every acceleration contribution is generated from $T_t<T_r$, and the self-coincident endpoint is excluded by the $H(0)=0$ convention or by the declared core regularization.
2. The retained chart has finite memory, positive inactive-root gaps, a declared transmitter-side acceleration-weight interval, and either a positive active-root transmitter-side Jacobian floor $\nu_J > 0$ or an explicitly declared finite-order caustic transit integrated in the dual-mollified law.
3. The active support stays away from an unregularized collision: either $r_{ij,\ell}\ge d > 0$ on the retained records or the same $\epsilon_c$ cutoff is used in the acceleration, action, and energy records.
4. The regularized right-hand side is locally Lipschitz on the retained history tube, so the finite-$\eta$ state-dependent delay problem has existence, uniqueness, and continuation until a declared boundary of the admissible class is reached.
5. The same regularized action or compatible realized-trajectory reconstruction supplies the acceleration contribution, wake-history energy, momentum, and angular-momentum records. Endpoint leakage, omitted branch records, and period-cut terms must appear as residuals rather than hidden corrections.

Under these assumptions, the finite-$\eta$ theorem packet should prove the following local conclusions.

- **Divergent self-energy is quarantined.** There is no accepted instantaneous self-kick, no unregularized $r=0$ self-root inside the chart, and every retained self-hit contribution is bounded by the declared $d$, $\epsilon_c$, $\eta$, $\nu_J$, and transmitter-side acceleration-weight data. Any remaining divergence is therefore a failure of the branch floor, core convention, memory window, or $\eta\to0^+$ convergence claim, not an accepted finite-$\eta$ state. A coincident same-transmitter root birth is not an accepted transition under this theorem target.
- **Runaway solution branches are quarantined.** If the same action-level bookkeeping gives
  $$
  E_{\text{tot}}^{(\eta)}(T)=K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T),
  \qquad
  E_{\text{wake}}^{(\eta)}(T)\ge U_{\min}^{(\eta)}>-\infty,
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-70e5563432f1625a)
  then $K_{\mu}(T)$ remains bounded on $W$. A branch with $V_{\max}\to\infty$ must therefore leave the admissible class by driving the interaction charge downward without bound, losing a floor, or breaking the declared action-energy residual.
- **Pre-acceleration is excluded at finite $\eta$.** The acceleration at $T$ is a functional of the retained history segment $[T-h,T)$, together with the current receiver event, and contains no future state. A proposed action repair is admissible only when its endpoint convention contributes a wake-history boundary term or a vanishing residual, not a future-boundary acceleration selection rule.
- **Caustic and Jacobian blow-up are quarantined.** Simple-root charts require $\nu_J > 0$. A finite-order caustic may be crossed only through the dual-mollified equation with finite integrated impulse and stable transition metadata. Persistent $J=0$, cusp behavior outside a finite-order normal form, simultaneous collision-floor failure, or regulator-dependent transition observables are chart failures rather than ordinary acceleration contributions.
- **Finite deterministic multistability is routed, not quarantined.** At a fold boundary, if the regularized post-transit data supply exactly one admissible continuation chart, the event is an ordinary branch transition. If they supply two or more inequivalent admissible charts with positive floors and finite memory, the complete microstate still selects one deterministic continuation, but a record-limited comparison must route the event to a finite basin-weight or multistability record. Multistability is a failure only when the finite continuation family is empty, infinite, unlabeled, or lacks the common branch data needed for comparison.

The failure boundary for the theorem packet is the union of the following conditions:
$$
\partial\mathcal{A}_\eta
=
\{\nu_J=0\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{\inf \mathcal{G}^{\mathrm{inact}}=0\}
\cup
\{h_{\mathrm{mem}}\ge h\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow-\infty\}
\cup
\{\text{non-vanishing action or boundary residual}\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4210435ee5145eb1)
The first component is refined as
$$
\{\nu_J=0\}
=
\Sigma_{\mathrm{transit}}
\sqcup
\Sigma_{\mathrm{bif}}^{\mathrm{multi}}
\sqcup
\Sigma_{\mathrm{sing}}^{\mathrm{fail}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-881fed3da323b266)
where $\Sigma_{\mathrm{transit}}$ has a unique finite post-transit chart, $\Sigma_{\mathrm{bif}}^{\mathrm{multi}}$ has a finite labeled family of admissible continuations, and $\Sigma_{\mathrm{sing}}^{\mathrm{fail}}$ lacks a promoted finite chart. A trajectory crossing this boundary is not promoted as a closed Master Equation solution until the appropriate route is certified. It is routed to branch transition, finite multistability, caustic transit, core-regularization repair, finite-window leakage, or $\eta$-ladder failure according to which boundary component is reached.

The validation residuals consumed by this theorem target are the root residual, root-transport residual, active transmitter-side Jacobian floor, transmitter-side acceleration-weight interval, inactive-gap residual, finite-memory residual, return residual, finite-window energy residual $\mathcal{R}_E$, momentum residual $\mathcal{R}_P$, angular-momentum residual $\mathcal{R}_J$, Euler residual of the same action, endpoint or period-cut leakage, transition-observable residuals across $\eta$ refinement, and the symplectic residual $\mathcal{R}_{\Omega}$ when the branch is promoted to a reduced Hamiltonian chart. The theorem is finite-$\eta$ only; any zero-width or infinite-system statement requires the separate convergence boundary stated in the regularization package.

---

##### Regularized Action-Energy Diagnostic

For computation with finite causal-wake-surface width $\eta>0$, an energy diagnostic must use the same time-normalized scalar kernel as the nonlocal action. When one wants a quadratic kinetic bookkeeping proxy, use a single universal conversion constant $\mu_{\text{arch}}$ rather than particle-specific substrate masses:
$$
E_{\text{tot}}^{(\eta)}(T_r)
= \sum_i \frac{1}{2} \mu_{\text{arch}} \left\|\mathbf V_i(T_r)\right\|^2
+ E_{\text{wake}}^{(\eta)}(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d23960f9834532ff)
with
$$
E_{\text{wake}}^{(\eta)}(T_r)
=
\frac{1}{2}\sum_{i,j}
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
\int_{T_r-h}^{T_r} dT_t\;
\frac{\delta_\eta\!\big(\tilde g_{ij}(T_r,T_t)\big)}
{r_{ij}(T_r;T_t)}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-12f8bf7b83ad6932)
Here $h$ bounds the retained causal memory. On a simple sharp root, integrating the delta function produces the transmitter-side factor once:
$$
E_{\text{wake}}^{\mathrm{sharp}}(T_r)
=
\frac{1}{2}\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\mu_{\text{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)}{r_{ij}(T_r;T_t)}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4bcbf1dfc357b683)
The ordered sum and factor $1/2$ count each pair once. The positive sign is required by the declared polarity convention: for a static like-polarity pair, outward acceleration must lower a positive interaction charge. An inverse-square expression would mix an acceleration density with an energy kernel, have dimensions of acceleration rather than energy, and insert the root weight before a delta collapse that generates it.

Plainly: the energy row uses a $1/r$ action kernel. Its delta function supplies the moving-transmitter weight during root evaluation; that weight is not inserted by hand a second time.

This expression remains a diagnostic unless it is derived from the same time-translation-invariant action regularization as the acceleration and boundary charge. If the dual-mollified law uses a core cutoff $\epsilon_c$, the energy diagnostic must carry the same cutoff convention. The theorem-level nonlocal charge is the boundary functional in [Action-Level Wake-Energy Functional at a Time Boundary](#action-level-wake-energy-functional-at-a-time-boundary).

#### Causal Interaction Set (The Geometry of Delay)

##### Definition of Causal Emission Times

For a receiver at position $\mathbf X_i(T_r)$ and a transmitter with worldline $\mathbf X_j(T')$, the **causal emission times** $\mathcal{C}_{ij}(T_r)$ are all past times $T_t<T_r$ such that a causal wake surface emitted by transmitter $j$ at $T_t$ arrives at receiver $i$ at reception time $T_r$.

**Causal constraint:**

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40566c3998a7df11)

where $c_f$ is the field speed (set to 1 in natural units).

**Notation:**

$$
\mathcal{C}_{ij}(T_r) = \Big\{ T_t<T_r \;\Big|\; \|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t) \Big\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9be0b9d55788940e)

##### Causal-Time Map and Root Topology

For fixed reception time $T_r$, define the causal-time map

$$
f_{T_r}^{(ij)}(T_t)
\equiv
T_t + \frac{1}{c_f}\,\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|,
\qquad
F_{T_r}^{(ij)}(T_t)\equiv f_{T_r}^{(ij)}(T_t)-T_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dc56c98295267df5)

Then causal emission times are exactly the roots:

$$
T_t\in \mathcal{C}_{ij}(T_r)\quad \Longleftrightarrow\quad F_{T_r}^{(ij)}(T_t)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-21bb33201b0a74f3)

Operationally, this is the branchwise transmitter-to-receiver reading of the dynamics. The transmitter path supplies a path-history map $T_t\mapsto(\mathbf X_t(T_t),\mathbf V_t(T_t))$, while the receiver supplies the event data $(\mathbf X_r(T_r),\mathbf V_r(T_r),T_r)$. Solving $F_{T_r}^{(r\leftarrow t)}(T_t)=0$ selects exactly those transmitter-history points whose causal isochrons are received at that event. Each selected root therefore maps one transmitter-history branch into one receiver-local line of action; the delay-map Jacobian below records how the uniform transmitter emission-time measure is mapped into a compressed or dilated received causal-surface density. When multiple roots exist, the causal-root ledger is the bookkeeping of these simultaneous transmitter-to-receiver branch matches.

The one-dimensional delay-map Jacobian is

$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
=
1-\frac{\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot \mathbf V_j(T_t)}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3b1deef7883a2a0c)

On a bounded history interval $I_{T_r}$ (e.g., simulation memory window), define:

- Unsigned root count: $N_{ij}(T_r)\equiv \#\mathcal{C}_{ij}(T_r)$,
- Signed Brouwer degree:
  $$
  D_{ij}(T_r)\equiv \deg(F_{T_r}^{(ij)},I_{T_r},0)=\sum_{T_t\in\mathcal{C}_{ij}(T_r)} \mathrm{sign}\!\left(\frac{dF_{T_r}^{(ij)}}{dT_t}\Big|_{T_t}\right)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-51f0fbdd4e87a082)

##### Delay-Map Theorem Pack (Formalized)

Fix a bounded history interval $I_{T_r}=[a,b]\subset(-\infty,T_r)$ and define regularity conditions:

- **(R1) Boundary regularity:** $0\notin F_{T_r}^{(ij)}(\partial I_{T_r})$ (no root crossing at $a$ or $b$).
- **(R2) Simple roots:** if $F_{T_r}^{(ij)}(T_t)=0$, then $\frac{dF_{T_r}^{(ij)}}{dT_t}(T_t)\neq 0$.

**Theorem 1 (Degree invariance on regular families).**
For any continuous deformation of worldlines/parameters that preserves (R1)-(R2), the signed degree $D_{ij}(T_r)=\deg(F_{T_r}^{(ij)},I_{T_r},0)$ is invariant.

*Proof sketch:* In 1D, $D_{ij}$ is the oriented count of simple roots. Under a regular homotopy, roots move continuously and cannot appear/disappear in the interior without becoming critical, and cannot enter/leave through the boundary by (R1). Hence the oriented count is constant.

**Proposition 2 (Sub-$c_f$ monotonic single-hit regime).**
If there exists $V_*<c_f$ such that $\|\mathbf V_j(T_t)\|\le V_*$ for all $T_t\in I_{T_r}$, then
$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
\ge
1-\frac{V_*}{c_f}
>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dca4e58866f6fcd4)
so $F_{T_r}^{(ij)}$ is strictly increasing on $I_{T_r}$. Therefore it has at most one root. If additionally $F_{T_r}^{(ij)}(a)<0<F_{T_r}^{(ij)}(b)$, then exactly one root exists and
$$
N_{ij}(T_r)=1,\qquad D_{ij}(T_r)=+1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-05747f79bc1f6d66)

*Proof sketch:* Strict positivity of the Jacobian gives monotonicity, hence injectivity. Existence under endpoint sign change follows by the intermediate value theorem.

This proposition is retained-interval local. It controls roots whose emission times lie inside the declared interval $I_{T_r}$; it does not remove older path-history roots emitted outside $I_{T_r}$, including self-hit candidates from an earlier super-field-speed interval that remain inside a longer memory window. If the model retains such persistent-memory roots, the speed bound must be checked on the enlarged interval that contains their emission times.

**Proposition 3 (Fold criterion and even-jump law).**
In a one-parameter family $F^{(ij)}(T_t;\lambda)$ (with $\lambda$ a control parameter, e.g. receiver time or orbit parameter), interior root-count changes occur only at fold points:
$$
F^{(ij)}(T_t;\lambda)=0,\qquad \partial_{T_t}F^{(ij)}(T_t;\lambda)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-88e7364c43151f37)
For generic folds ($\partial_{T_tT_t}F\neq0$, $\partial_\lambda F\neq0$), one root pair is created/annihilated, so
$$
\Delta N_{ij}=\pm2,\qquad \Delta D_{ij}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cbbbb347b54ded36)
between regular intervals.

*Proof sketch:* Local normal form near a generic fold is equivalent to $u^2\pm\mu=0$, yielding either 0 or 2 simple roots. The two roots carry opposite Jacobian signs, so the degree is unchanged.

This delay-map theorem pack is foundational rather than merely model-specific. Within this chapter it serves as the fold-geometry reference for delayed-root constructions: regular charts preserve signed degree, while branch creation or annihilation requires a Jacobian-degenerate fold.

##### Signed Causal-Root Complex

For a receiver-transmitter pair $(i,j)$ on a regular interval, the root ledger can be sharpened from an unsigned set to a two-term signed complex. Split the simple active roots by Jacobian sign:
$$
C_+^{ij}(T_r)
=
\mathrm{span}\{T_{t,\ell}\in\mathcal{C}_{ij}(T_r): \partial_{T_t}F_{T_r}^{(ij)}(T_{t,\ell})>0\},
\qquad
C_-^{ij}(T_r)
=
\mathrm{span}\{T_{t,\ell}\in\mathcal{C}_{ij}(T_r): \partial_{T_t}F_{T_r}^{(ij)}(T_{t,\ell})<0\}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-72f3566651f719fc)
Then
$$
N_{ij}=\dim C_+^{ij}+\dim C_-^{ij},
\qquad
D_{ij}=\dim C_+^{ij}-\dim C_-^{ij}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c515304de375d5a6)
At a generic fold, the local boundary pairing creates or removes one positive and one negative generator, preserving $D_{ij}$ while changing $N_{ij}$ by two. In this reading, Theorem 1 is invariance of the Euler-characteristic-like signed count, and Proposition 3 is the elementary opposite-sign pair surgery.

An admissible retained record therefore reports the signed grading $(C_+^{ij},C_-^{ij})$, not only raw hit counts. The binary and Noether braid ledgers $N_s$ and $M_p$ are admissible topological labels only after their self-hit and partner-hit entries inherit this signed-root-complex data, together with the phase-return degree data used by the [assembly topological charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) and resonance-lock chapters.

**Proposition 4 (forward partner-root starvation under field-speed drift).** Let a candidate translating branch have center drift $u\hat{\mathbf e}$ on the retained interval, with $u\ge0$ and $\|\hat{\mathbf e}\|=1$. Write two partner constituents as
$$
\mathbf X_i(T_r)=uT_r\,\hat{\mathbf e}+\boldsymbol{\rho}_i(T_r),
\qquad
\mathbf X_j(T_t)=uT_t\,\hat{\mathbf e}+\boldsymbol{\rho}_j(T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2206a9de3966492f)
where $i$ is the receiver and $j\ne i$ is the transmitter. Suppose the retained partner root is forward-directed in the co-moving branch chart:
$$
d_{\parallel}(T_r,T_t)
\equiv
\hat{\mathbf e}\cdot
\left(
\boldsymbol{\rho}_i(T_r)-\boldsymbol{\rho}_j(T_t)
\right)
\ge d_{\min}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c027c645fa87d2bc)
For any positive-delay candidate root with $\Delta=T_r-T_t>0$,
$$
c_f\Delta
=
\left\|
u\Delta\,\hat{\mathbf e}
+
\boldsymbol{\rho}_i(T_r)-\boldsymbol{\rho}_j(T_t)
\right\|
\ge
u\Delta+d_{\min}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ebb39a0314171b1f)
Hence
$$
\left(c_f-u\right)\Delta\ge d_{\min}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-93201c7ee4341273)
If $u\ge c_f$, no such forward partner root exists. If $u<c_f$, any such root has the lower delay bound
$$
\Delta\ge\frac{d_{\min}}{c_f-u}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b948067065fbbbd2)
so the required memory depth diverges as $u\to c_f^-$.

On a declared smooth chasing-root history with $r\sim c_fd_{\min}/(c_f-u)$ and $D_t\sim c_f-u$, the same root's canonical acceleration weight has the conditional companion scaling

$$
\frac{1}{r^2}\frac{c_f}{|D_t|}
\sim
\frac{c_f-u}{c_fd_{\min}^2}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e6202f75e82e7133)

Thus the retained forward contribution decays linearly in the gap on that simple-root chart even as its delay diverges. A finite retained window can nevertheless delete the row abruptly when the root crosses the history boundary. Neither statement determines the branch period or licenses unbounded physical memory; a simultaneous Jacobian-floor loss falsifies the smooth-decay estimate.

Plainly: the forward root can become very old and very weak at the same time. A finite history boundary can still remove it suddenly, and neither fact fixes the orbit period.

This is a kinematic starvation result, not an acceleration-balance approximation. It says that a forward structural partner root cannot be retained at or above field-speed center drift because the causal wake cannot catch the leading receiver. A bound assembly branch that requires at least one such forward partner root for structural closure therefore cannot preserve the same causal-root ledger for sustained drift $u\ge c_f$. The proposition does not impose a speed cap on a single architrino, on internal curved self-hit motion, or on history-supported super-field-speed components; it applies to center translation of an internally bound branch whose leading-side partner closure is part of the retained ledger.

With finite retained memory $h$ and internal branch period $T_{\mathrm{int}}$, the same obstruction has a graded scale:
$$
\Lambda_{\mathrm{starv}}
=
\frac{\Delta_{\mathrm{fwd}}}{T_{\mathrm{int}}}
\ge
\frac{d_{\min}}{(c_f-u)T_{\mathrm{int}}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-59c6a20d48d728d3)
The forward root remains available to the retained chart only while $\Delta_{\mathrm{fwd}}<h$, equivalently
$$
u<u_{\mathrm{crit}}
\equiv
c_f-\frac{d_{\min}}{h}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b3d1eaa2840f3e77)
Thus starvation is a root-complex obstruction before it is a speed slogan: if the assembly requires that forward generator, the bare causal kernel cannot carry the same branch chart through $u_{\mathrm{crit}}$. Any promoted supra-$u_{\mathrm{crit}}$ branch must show a Noether-sea or assembly reorganization that removes or replaces the forward root without hiding a memory-window failure.

This is not the same event as the interior fold law of Proposition 3. A generic interior fold creates or removes one positive and one negative generator and therefore preserves the signed degree $D_{ij}$. Forward-root starvation is a memory-boundary event: a generator leaves the retained interval $[T_r-h,T_r)$ because its required delay has crossed the available history depth. The finite-window signed degree $D_{ij}^{(h)}$ may therefore change unless a replacement generator enters through the boundary or the branch chart is reorganized by the Noether sea. The retained branch ledger records this as boundary-exit degree bookkeeping, not as a $\Delta N=\pm2,\Delta D=0$ fold.

##### Separator Taxonomy

Three distinct events terminate a simple-root branch chart. They have different degeneracy conditions, different velocity arguments, and different ledger consequences, and a proof program that keys its arc partition to a single "field-speed separator" will conflate them.

| Event | Condition | Velocity that appears | Root ledger | Branch strength | Certificate route |
| --- | --- | --- | --- | --- | --- |
| **Transmitter-side fold** | $D_{t,ij}=0$, i.e. $\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}=c_f$ | transmitter, at emission time | fold: $\Delta N_{ij}=\pm2$, $\Delta D_{ij}=0$ (Proposition 3) | $W_{ij}^{\mathrm{acc}}\to\infty$ | finite-order caustic normal form and the finite-impulse lemma; cusps and higher strata route to a singular-stratum chart |
| **Receiver-side playback turn** | $D_{r,ij}=0$, i.e. $\mathbf V_i(T_r)\cdot\hat{\mathbf r}_{ij}=c_f$ | receiver, at reception time | unchanged: $\Delta N_{ij}=0$, $\Delta D_{ij}=0$ | acceleration remains finite when $D_t\ne0$ | signed root playback reverses; no acceleration event route is needed |
| **Memory-boundary exit** | $T_r-T_{t,\ell}\to h$ | either, through the delay | $\Delta N_{ij}=\pm1$ possible; $D_{ij}^{(h)}$ may change | finite | boundary-exit degree bookkeeping (Proposition 4); *not* a fold |

Two consequences follow immediately.

First, $\|\mathbf V_i(T_r)\|=c_f$ is by itself none of these. It is a receiver-side playback turn only for branches whose line of action is aligned with the receiver's motion, and it is a transmitter-side fold only for the transmitter, at emission time, on the branches it emitted. A reduction that identifies the two manufactures a caustic at $\|\mathbf V_i\|=c_f$ that the exact law does not have. Locally affine branch tables are candidate generators; they may not be used to locate separators.

Second, a closed-cycle parity ledger cannot be written over folds alone. On a cycle, $\sum_\Sigma\Delta N_{ij}=0$ and $\sum_\Sigma\Delta D_{ij}=0$ hold only after boundary-exit events are counted in the same sum, and those events carry odd unsigned jumps. Requiring every local jump to be even is a sufficient test only on charts certified free of memory-boundary exit.

##### Single-Hit Regime

In the **sub-field-speed regime** ($\|\mathbf V_j(T_t)\| < c_f$ locally), Proposition 2 applies, and the map is strictly monotone:

$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
\ge
1-\frac{\|\mathbf V_j(T_t)\|}{c_f}
>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-747a69a140a72222)

so $f_{T_r}^{(ij)}$ is a diffeomorphic time map on $I_{T_r}$, and the causal set is generically a singleton:

$$
N_{ij}(T_r)=1,\qquad D_{ij}(T_r)=+1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-05747f79bc1f6d66-2)

**Intuition:** If the transmitter is moving slower than the field speed, its past emissions form a non-overlapping family of concentric (or nearly concentric) isochrons. Any given receiver location lies on exactly one of those causal surfaces.

##### Multi-Hit Regime

In the **super-field-speed regime** ($\|\mathbf V_j\| > c_f$ at some past times), the delay map can fold when $\hat{\mathbf{r}}_{ij}\cdot\mathbf V_j > c_f$, i.e. when $dF_{T_r}^{(ij)}/dT_t$ changes sign. Then $\mathcal{C}_{ij}(T_r)$ can contain multiple solutions:

$$
\mathcal{C}_{ij}(T_r) = \{T_{t,1}, T_{t,2}, \ldots, T_{t,m}\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9e79798a9d8a0acb)

Fold bifurcations create/annihilate roots in pairs. The signed degree $D_{ij}$ stays topologically fixed between folds, while the unsigned branch count $N_{ij}$ jumps by even integers.

Any assembly-level use of a folded root-count transition must define its persistent indices, action partition, and frequency-lock map in the owning assembly chapter. The even-jump theorem alone supplies none of those additional identifications.

**Intuition:** If the transmitter outruns its own emissions, it can emit multiple wake surfaces that later converge and intersect the same receiver location simultaneously (or nearly so, within regularization width $\eta$).

**Example:** In uniform circular motion at $\|\mathbf V\| > c_f$, a receiver can be hit by wake surfaces from multiple points on the transmitter's orbit (different "winding numbers" $m$ due to self-hit dynamics).

##### Self-Hit Regime

When $j = i$ (transmitter and receiver are the same architrino), the causal set $\mathcal{C}_{ii}(T_r)$ represents **self-hits**: times when architrino $i$ intersects its own past emissions.

**Self-hit condition:**

$$
\|\mathbf X_i(T_r) - \mathbf X_i(T_t)\| = c_f(T_r-T_t), \quad T_t<T_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4273f40d2eb5fbd1)

This equation nominates a same-transmitter causal root. It becomes an admitted self-hit contribution only on a retained branch chart: the coincident $T_t=T_r$ branch is excluded by the $H(0)=0$ convention, the root has positive separation or explicit regularization data, the transversality/Jacobian floor is positive, the same-record transmitter-side acceleration weight $W_{ii}^{\mathrm{acc}}$ is retained on its floor or certified bounded interval $\nu_{\mathrm{rec}}$, the active-root count is controlled, inactive-root gaps and finite memory are certified, and the stability/action ledger entries required by the claimed assembly branch close.

**Interval-speed lemma.** Let $\Delta=T_r-T_t>0$ and suppose $\mathbf X_i$ is absolutely continuous on $[T_t,T_r]$. If
$$
\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|=c_f\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-674845092ada584f)
then
$$
\frac{1}{\Delta}\int_{T_t}^{T_r}\|\mathbf V_i(T')\|\,dT'\ge c_f
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-69077d54dbd77ab3)
This follows immediately from the triangle inequality. Therefore strict sub-field-speed motion on the whole interval forbids a nontrivial self-hit. A simple noncoincident self-hit requires super-field-speed motion somewhere along the interval, except for the degenerate straight field-speed case where the causal branch is tangent and the simple-root Jacobian condition fails.

**Critical requirements for self-hit:**

1. **Curvature**: Straight-line motion admits no self-hits (the worldline never intersects its own past causal isochrons).
2. **Super-field-speed interval history**: along the interval from emission to reception, the architrino must have exceeded $c_f$ somewhere, unless the branch is the degenerate straight field-speed case excluded by the simple-root assumptions.
3. **Regular branch admissibility**: the same-transmitter root must be retained on a branch chart with a positive transversality/Jacobian floor, a retained same-record transmitter-side acceleration-weight interval ($W_{ii}^{\mathrm{acc}}$ on its floor or certified bounded interval $\nu_{\mathrm{rec}}$), controlled distance or regularization data, inactive-root gaps, finite memory, and the stability/action ledger entries required by the claimed assembly branch.

**Key clarification:**

- **Self-hits can be plural**: $\mathcal{C}_{ii}(T_r)$ can contain multiple emission times (e.g., multiple winding numbers in circular motion).
- **Persistent memory**: Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from wake surfaces emitted during the super-field-speed phase. The self-hit regime is **not** instantaneously tied to current velocity; it depends on **path history**.

**Implication:** Self-hit is a **non-Markovian memory effect**. The architrino's current acceleration depends on whether it **ever** exceeded $c_f$ in the past and curved, not just on its current state.

##### Geometric Interpretation

**Visualize the causal constraint as:**

- Receiver at $\mathbf X_i(T_r)$ "now"
- Transmitter path $\{\mathbf X_j(T'): T' < T_r\}$ in the past
 - Field-speed causal wake surface: the expanding isochron at radius $c_f(T_r-T_t)$ centered at $\mathbf X_j(T_t)$
 - **Causal emission times**: where this wake surface **intersects** the receiver's current location

For each $T_t \in \mathcal{C}_{ij}(T_r)$, draw a line from $\mathbf X_j(T_t)$ to $\mathbf X_i(T_r)$; this is the **line of action** $\hat{\mathbf{r}}_{ij}$ for the acceleration.

This geometry should be read in terms of the transmitter path, the expanding causal isochrons centered on past emission points, and the receiver event at which one or more of those isochrons are intersected.

##### Reduced Translating-Loop Delay Checkpoint

To obtain a nontrivial analytic checkpoint from the same causal constraint, consider a translating phase-locked two-leg internal loop, with one leg parallel to motion and one transverse. Let the loop center translate with speed $v$ through the Euclidean void while every wake still propagates at the primitive field speed $c_f$. Define
$$
\beta_f \equiv \frac{v}{c_f},\qquad C(v)\equiv \frac{L_\parallel(v)}{L_0}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1d109b3c1b2f5af4)
with rest bond length $L_0$.

Parallel round-trip delay:
$$
T_\parallel(v)=\frac{L_\parallel}{c_f-v}+\frac{L_\parallel}{c_f+v}
=\frac{2L_0}{c_f}\frac{C(v)}{1-\beta_f^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-53a762e22989f890)

Transverse one-way delay satisfies
$$
c_f^2\Delta_\perp^2=L_0^2+v^2\Delta_\perp^2
\;\Rightarrow\;
\Delta_\perp=\frac{L_0}{c_f\sqrt{1-\beta_f^2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac4bf841da4f49f6)
so
$$
T_\perp(v)=2\Delta_\perp=\frac{2L_0}{c_f}\frac{1}{\sqrt{1-\beta_f^2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-624a9b6b9f99b08d)

If internal phase locking is operationally isotropic (no orientation-dependent clock leakage),
$$
T_\parallel(v)=T_\perp(v)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7d6ad6b97e5ca473)
then necessarily
$$
C(v)=\sqrt{1-\beta_f^2},\qquad
T(v)=\frac{T_0}{\sqrt{1-\beta_f^2}},
\quad
T_0=\frac{2L_0}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c785b382c51c06c8)

This gives a purely substrate-level period-stretch checkpoint. It says only that preserving the same internal phase closure while the receiver translates forces the physical period $T$ to increase in absolute time unless the longitudinal leg shortens. The full unresolved step is proving the same absolute-period scaling for the complete multi-hit NFDE Noether braid dynamics without reducing to a two-leg closure model.

The forward parallel leg carries the same starvation constraint as Proposition 4 with $d_{\min}$ replaced by the leading longitudinal leg length $L_\parallel$. Let $h_b^{\mathrm{lock}}(v)$ be the retained-history depth measured on the locked moving branch, distinct from the generic analysis horizon $h$. The two-leg checkpoint is admissible as a retained-record model only in the starvation-free regime
$$
v<c_f-\frac{L_\parallel}{h_b^{\mathrm{lock}}(v)}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d70f47d976124de)
Above that scale, the checkpoint no longer tracks the same causal-root ledger: the full Noether braid proof must show a ledger reorganization, a sea-mediated replacement record, or a declared failure of the translating-loop reduction.

The two-leg loop is only a checkpoint. It has two phase points and one chosen orientation relative to the absolute motion. A real assembly has an effective internal phase distribution over a finite three-dimensional volume, and operational isotropy has to hold for all loop orientations at once. The closure target is therefore a full oblate-envelope-to-sphere reduction in the internal Family-A phase space, not just the equality
$$
T_\parallel=T_\perp
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b1a0039d9faefcac)
for one leg pair.

In spherical-harmonic language this checkpoint is the $\ell=0$ isotropy projection of the moving internal delay record. The next leakage record is the $\ell=2$ quadrupole anisotropy, denoted schematically by $Q_A$ for assembly $A$. A retained Lorentz or clock-universality claim must show that $Q_A$ is either cancelled by the full three-dimensional branch ledger or bounded below the relevant anisotropy ceiling; otherwise the two-leg period result is only an orientation-specific delay identity.

Accelerated motion adds a second burden. Even if the inertial translating-loop scaling is recovered, acceleration requires a transport law for the internal phase ledger through the Noether sea. For a stable branch with rest size $L_0$, center speed $v(T)$, and small acceleration scale $a(T)$, the dynamics target is a branch-period transport law of the schematic form
$$
T_q[v(T),a(T)]
=
T_q[v(T),0]\,
\left(
1+
O\!\left(\frac{a^2L_0^2}{c_f^2}\right)
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3a2d23af3d6800e0)
with every term evaluated in absolute time. The residual is the finite-loop-size, non-Markovian correction caused by acceleration during one internal phase cycle. Observer-inference chapters may later translate a branch-certified period record into clock and metric language, but no such translation is part of the Master EOM.

---

### Master Equation and DDE Formulation

#### The Master Equation (Canonical Form)

##### Per-Hit Acceleration

For each causal emission time $T_t \in \mathcal{C}_{ij}(T_r)$, define:

**Separation vector and distance:**

$$
\mathbf{r}_{ij}(T_r;T_t) = \mathbf X_i(T_r) - \mathbf X_j(T_t), \quad r_{ij} = \|\mathbf{r}_{ij}\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-69c0c455388f6b18)

**Unit direction (line of action):**

$$
\hat{\mathbf{r}}_{ij} = \frac{\mathbf{r}_{ij}}{r_{ij}} = \frac{\mathbf X_i(T_r) - \mathbf X_j(T_t)}{\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-73dfe9cbc1ad61da)

**Polarity sign factor:**

$$
\sigma_{ij} = \mathrm{sign}(q_i q_j) = \begin{cases}
+1 & \text{like polarities (repel)} \\
-1 & \text{unlike polarities (attract)}
\end{cases}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-56bc503645e1eed1)

**Transmitter-side factor, transmitter-side weight, and signed root playback:**

$$
D_{t,ij}(T_r;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot \hat{\mathbf{r}}_{ij}(T_r;T_t),
\qquad
D_{r,ij}(T_r;T_t)
\equiv
c_f-\mathbf V_i(T_r)\cdot \hat{\mathbf{r}}_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d334dc49ca4e16c)

$$
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\equiv
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
\qquad
m_{ij}(T_r;T_t)
\equiv
\frac{D_{r,ij}(T_r;T_t)}{D_{t,ij}(T_r;T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7ddcf6e568f3d9c1)

**Per-hit acceleration contribution:**

$$
\mathbf A_{ij}(T_r;T_t)
=
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#causal-wake-per-hit-law)

If a force-like bookkeeping symbol is desired, define
$$
\mathbf{F}_{ij}(T_r;T_t) \equiv \mu_{\text{arch}}\,\mathbf A_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-294f2da9e1cc87a7)
where $\mu_{\text{arch}}$ is a universal conversion constant used only for force/energy bookkeeping. It is not a particle-specific inertial mass.

where:

- $\kappa$: universal coupling constant
- $q_i, q_j$: intrinsic polarities of receiver and transmitter ($\pm \epsilon$ for electrinos/positrinos)
- $r_{ij}$: distance from emission point to reception point
- $\hat{\mathbf{r}}_{ij}$: radial direction from emission to reception
- $D_{t,ij}$: transmitter-side factor controlling root transversality and emitted-wake compression/dilation
- $D_{r,ij}$: receiver-side factor used in signed root playback
- $W_{ij}^{\mathrm{acc}}$: dimensionless transmitter-side acceleration weight
- $m_{ij}$: signed rate at which the active emission root changes with reception time

**Note on interaction structure:** The per-hit acceleration $\mathbf A_{ij}(T_r;T_t)$ is **radial in direction**: it points along the line of action $\hat{\mathbf{r}}_{ij}$ from the transmitter's past position to the receiver's current position. There are **no velocity-dependent cross-product terms** in the fundamental interaction kernel. The acceleration magnitude is the inverse-square density multiplied by the transmitter-side acceleration weight. Receiver velocity is absent from the instantaneous multiplier.

**Implication for emergent velocity dependence**: Any observer-level velocity-dependent response must arise from delayed geometry, root playback, wake-state evolution, and superposition of radial hits, not from an intrinsic receiver-velocity multiplier or cross-product term in the fundamental law.

**Fixed-hit acceleration-order boundary.** At one fixed causal hit, the canonical multiplier reads the transmitter position and velocity at $T_t$, the receiver position at $T_r$, and the polarity and coupling data. It does not read transmitter acceleration or any higher transmitter derivative. This derived statement is local to one evaluated hit. A retained sequence of hits can still encode changing transmitter velocity, root timing, and line of action, so it may carry information about an accelerated history.

Plainly: acceleration is absent as a separate input field at one hit, but an accelerated path can still change the later sequence of hits.

This boundary proves neither absence nor presence of radiation. The inverse-square acceleration falloff alone does not determine an energy flux at infinity because the wake-energy current and its constitutive relation have not yet been derived. Likewise, the canonical law contains no primitive instantaneous acceleration-derivative self-term, but delayed self-hits, assembly recoil, wake-state exchange, and photon emission remain possible effective reaction channels. A contrary per-hit code path that reads transmitter acceleration would falsify the fixed-hit statement; a derived wake-energy current with a nonzero far-boundary limit would establish radiative transport without changing it.

##### Total Acceleration (Sum Over All Causal Hits)

The total acceleration on receiver $i$ at reception time $T_r$ is the **vector sum** over:

1. All transmitters $j \neq i$ (partner hits)
2. All causal emission times $T_t \in \mathcal{C}_{ij}(T_r)$ for each transmitter
3. Self-hits ($j = i$), if any exist

**Master Equation of Motion (Canonical Form):**

$$
\boxed{
\frac{d^2 \mathbf X_i}{dT_r^2}
=
\sum_{j} \sum_{T_t \in \mathcal{C}_{ij}(T_r)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ij}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#causal-wake-master-equation)

where:

- Outer sum: over all transmitters $j$ (including $j = i$ for self-hits)
- Inner sum: over all causal emission times $T_t \in \mathcal{C}_{ij}(T_r)$
- Each term: radial inverse-square acceleration with sign $\sigma_{ij}$ and transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$

**Explicit separation of partner and self-hit terms:**

$$
\frac{d^2 \mathbf X_i}{dT_r^2}
=
\underbrace{\sum_{j \neq i} \sum_{T_t \in \mathcal{C}_{ij}(T_r)} \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t) \, \hat{\mathbf{r}}_{ij}}_{\text{Partner hits}} + \underbrace{\sum_{T_t \in \mathcal{C}_{ii}(T_r)} \kappa \, \sigma_{ii} \, \frac{|q_i q_i|}{r_{ii}^2}W_{ii}^{\mathrm{acc}}(T_r;T_t) \, \hat{\mathbf{r}}_{ii}}_{\text{Self-hits}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5a044e245f07a102)

**Note:** $\sigma_{ii} = +1$ (like polarities repel), so self-hits are always **repulsive**.

This sum can be viewed as a **path-history branch sum**: each emission time in $\mathcal{C}_{ij}(T_r)$ marks where the receiver's worldline crosses the causal wake surface emitted at $T_t$. The integral representation above is simply the distributional encoding of this branch-selection rule.

##### Conventions and Exclusions

**Heaviside Convention ($H(0) = 0$):**

The emission at $T_t = T_r$ (instantaneous self-acceleration) is **excluded**. Formally, this is enforced by writing:

$$
\mathcal{C}_{ij}(T_r) = \Big\{ T_t<T_r \;\Big|\; \|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t) \Big\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9be0b9d55788940e-2)

(Strict inequality $T_t<T_r$; no $T_t = T_r$ allowed.)

**Physical justification:** The causal wake surface at the instant of emission ($r=0$, $\Delta=0$) has not yet expanded; it cannot produce self-acceleration on the transmitter at that same event. This endpoint exclusion does not certify a finite transition when a nontrivial same-transmitter root is born from that endpoint.

**No accepted $r = 0$ sharp roots:**

Because $r = c_f(T_r-T_t)$, $r = 0$ implies $\Delta = T_r-T_t = 0$. This case is excluded by $H(0) = 0$. A coincident same-transmitter birth, simultaneous core/transmitter-side-factor failure, or regulator-dependent continuation remains uncertified and must fail closed.

This also fixes the status of later short-distance regularizations. A finite core cutoff or core mollifier is not a hard exclusion sphere, an elastic contact collision, or a primitive rule saying that causal wakes are blocked by or transmitted through an opaque core. It is a declared mathematical control on the near-origin amplitude inside a regularized branch chart. In the canonical branch law, a transmitter contribution is admitted by the causal-root constraint, polarity sign $\sigma_{ij}$, separation or regularization data, transmitter-side transversality and transmitter-side control, active-root count, and the required stability/action/event accounts. A polarity-dependent short-distance kernel would therefore be an additional model term that must be derived and validated; it cannot be inserted as an unproved like-versus-opposite collision or opacity rule.

##### Superposition and Local Wake Geometry

**Postulated vector superposition.** On one declared regular branch chart at a receiver event, let $\mathcal B$ be the finite set of admitted causal-root rows. The Master EOM states that the receiver-local acceleration is the linear sum

$$
\mathbf A_{\mathrm{total}}(T;\mathbf X_r)
=
\sum_{b\in\mathcal B}\mathbf A_b(T;\mathbf X_r).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a1b34ca188cb9037)

Plainly: each admitted wake intersection contributes one acceleration vector, and the receiver adds those vectors. This vector sum is the postulated substrate rule. It does not require a scalar wake landscape.

**Moving-single-root scalar representative (derived on one regular chart).** Fix the reception time, a retained transmitter history, and a connected receiver chart $U$ on which one selected causal root $s_b(\mathbf X_r)$ is unique and differentiable. For the canonical row, write

$$
\begin{aligned}
\mathbf R_b
&=\mathbf X_r-\mathbf X_{t(b)}(s_b),
&r_b&=\|\mathbf R_b\|,
&\mathbf n_b&=\frac{\mathbf R_b}{r_b},\\
D_b
&=c_f-\mathbf n_b\cdot\mathbf V_{t(b)}(s_b),
&C_b&=\kappa\,\sigma_b|q_rq_{t(b)}|,
\end{aligned}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f320108876777c46)

with $r_b\ge r_{\min}>0$ and $|D_b|\ge D_{\min}>0$ throughout $U$.

Plainly: this is one admitted moving-source row with a smoothly tracked past emission event. The chart excludes sources, folds, coincidences, and singular self roots by keeping both the separation and transmitter factor away from zero.

Differentiating the causal constraint $r_b-c_f(T-s_b)=0$ with respect to the receiver position gives

$$
0
=
d\!\left[r_b-c_f(T-s_b)\right]
=
\mathbf n_b\cdot d\mathbf X_r+D_b\,ds_b,
\qquad
\nabla_{\mathbf X_r}s_b
=
-\frac{\mathbf n_b}{D_b},
\qquad
\nabla_{\mathbf X_r}r_b
=
\frac{c_f}{D_b}\mathbf n_b.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d1e584019eb76b1)

Plainly: moving the receiver changes both its separation from the retained source point and the emission time selected by the causal equation. These two effects combine into the signed factor $1/D_b$.

The sign $\epsilon_b=\operatorname{sgn}(D_b)$ is constant on the connected regular chart. Therefore the receiver-local scalar

$$
\Phi_b
=
C_b\frac{\epsilon_b}{r_b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c68e6145352e9dc)

satisfies

$$
-\nabla_{\mathbf X_r}\Phi_b
=
C_b\frac{c_f}{r_b^2|D_b|}\mathbf n_b
=
\mathbf A_b.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-193390fd300cb6a5)

Plainly: the branch sign converts the signed derivative of $1/r_b$ into the absolute transmitter-side weight in the canonical acceleration ledger. This is an exact local rewrite of the existing row, not a new response based on slope or curvature.

The claim grade is **derived on one connected regular moving-simple-root chart**. A separately structured $c_f=1$ circular-history check computes the scalar gradient from freshly solved roots and finite differences, while the ledger vector comes from an unchanged causal-root record and the canonical row. Across five step refinements, the largest component residual was $2.12\times10^{-12}$; a raw $1/r_b^2$ scalar left a residual of $0.513$ because its radial scaling is wrong. The check is recorded in `verify-moving-single-root-scalar-gradient.mjs`.

Plainly: the proof supplies the identity, and an independently structured calculation checks its numerical realization on one moving regular chart. A nonzero scalar-gradient-versus-ledger residual on any certified point would falsify the claimed local representation.

**Finite-ledger scalar-superposition theorem (conditional derivation).** Fix the retained histories, root selections, regularization, and boundary convention of that chart. If every row $b\in\mathcal B$ has a differentiable receiver-local scalar representative $\Phi_b$ on the same chart satisfying

$$
\mathbf A_b
=
-\nabla_{\mathbf X_r}\Phi_b,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2837fc9fb586113c)

Plainly: the condition says that moving the receiver within this one regular chart changes a scalar $\Phi_b$ in exactly the way needed to reproduce row $b$'s acceleration. The theorem assumes that per-row identity; it does not derive the identity from vector superposition.

Define the finite superposed scalar by

$$
\Phi_{\mathcal B}
=
\sum_{b\in\mathcal B}\Phi_b.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-379c9faa834280a0)

Plainly: $\Phi_{\mathcal B}$ is only the sum of the valid row scalars on the shared chart. No scalar from a different retained history, root convention, regularization, or boundary prescription can be inserted into this sum.

Linearity of the receiver gradient then gives

$$
\mathbf A_{\mathrm{total}}
=
\sum_{b\in\mathcal B}\mathbf A_b
=
-\nabla_{\mathbf X_r}\Phi_{\mathcal B}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fdd480956fb47265)

Plainly: once every admitted acceleration contribution is already the negative gradient of its own valid scalar, adding the scalars reproduces the same complete vector ledger. This is a **conditional derivation** for a finite regular chart, not a proof that one global scalar exists. The preceding moving-single-root theorem discharges the per-row premise for canonical rows that share its fixed-history, fixed-sign regular chart. A row with a different kernel, regularization, or boundary rule still requires its own matching scalar derivation.

Where $\nabla_{\mathbf X_r}\Phi_{\mathcal B}\ne\mathbf0$, the local level-set normal, acceleration direction, and acceleration magnitude obey

$$
\widehat{\mathbf n}_{\Phi}
=
\frac{\nabla_{\mathbf X_r}\Phi_{\mathcal B}}
{\|\nabla_{\mathbf X_r}\Phi_{\mathcal B}\|},
\qquad
\frac{\mathbf A_{\mathrm{total}}}
{\|\mathbf A_{\mathrm{total}}\|}
=
-\widehat{\mathbf n}_{\Phi},
\qquad
\|\mathbf A_{\mathrm{total}}\|
=
\|\nabla_{\mathbf X_r}\Phi_{\mathcal B}\|.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-42e56943d45030f7)

Plainly: the normalized gradient gives only the local normal direction, the minus sign selects the acceleration direction, and the unnormalized gradient retains the acceleration magnitude. Direction alone is not the complete acceleration vector.

At a cancellation point, and under a small receiver displacement away from a regular point, the same representation gives

$$
\nabla_{\mathbf X_r}\Phi_{\mathcal B}=\mathbf0
\Longrightarrow
\mathbf A_{\mathrm{total}}=\mathbf0,
\qquad
\nabla_{\mathbf X_r}\mathbf A_{\mathrm{total}}
=
-\nabla_{\mathbf X_r}^{2}\Phi_{\mathcal B}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-636bd7314a06b248)

Plainly: when the row accelerations cancel, the gradient vanishes, so there is no preferred level-set normal and the net acceleration is zero. The Hessian, which is the matrix of second scalar derivatives, and related curvature data describe how the acceleration changes after displacement. They are not extra instantaneous acceleration contributions.

Finite induction over added architrinos is an intuitive corollary, not the proof: after the retained histories and regular branch chart are fixed, one may start with one admitted row and add the rows associated with each further label. This reasoning does not transfer directly to self-consistently evolved $N$-architrino solutions, because adding an architrino may change every previous trajectory, causal root, transmitter-side weight, and branch identity.

Plainly: adding another fixed ledger entry preserves a finite sum. Adding a new moving architrino to the dynamical system can rebuild the ledger itself, so the old induction hypotheses must be proved again on the new histories.

The characteristic-tail construction in the receiver-gradient discussion supplies an exact receiver-gradient identity for its declared regularized kernel, retained-history conditions, and regular branch chart. It is therefore an example of the kind of per-row identity that the conditional theorem can use only where its normalization, polarity, root selection, regularization, history depth, and boundary convention match the ledger row. It does not by itself establish an exact action, a conservation account, an independently evolving causal-wake state, a globally defined scalar, or a singular self-inclusive continuation.

Plainly: the characteristic-tail calculation proves one controlled local gradient equality. It does not turn that local equality into a complete history law, boundary law, or universe-wide scalar.

A raw $1/r^2$ wake-intensity scalar is not the required representative: its receiver gradient has inverse-cube radial scaling rather than the canonical inverse-square acceleration scaling. A bare $1/r$ scalar is also not a universal delayed-wake solution: root-constrained differentiation carries a signed transmitter factor, and the direct scalar action route leaves the derivative-of-constraint residual derived later in this chapter. A displayed wake-intensity scalar or display-only color transfer is therefore not a physical potential. None of these scalar constructions licenses an additional slope, curvature, or Hessian response in the Master EOM.

Plainly: a picture of wake intensity can be useful without being the scalar whose gradient equals the acceleration ledger. Differentiating the wrong scalar gives the wrong acceleration, and differentiating any display a second time would add a response that the Master Equation does not contain.

The finite theorem has no implication by itself for action, energy, momentum, angular momentum, conservation, stability, retention, or physical realization. Each such claim requires its own Architrino-native derivation and boundary account.

Plainly: rewriting the same finite acceleration sum as a scalar gradient does not create new dynamics or new conserved quantities.

**Open theorem target: global extension.** Define the complete acceleration one-form on a regular receiver domain by

$$
\omega_{\mathcal B}
\equiv
-\mathbf A_{\mathrm{total}}\cdot d\mathbf X_r.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c551a5c6b1a6bb3a)

Plainly: $\omega_{\mathcal B}$ records the component of the negative total acceleration along each possible receiver displacement. If a scalar exists, this one-form must equal the scalar differential $d\Phi_{\mathcal B}$.

A global extension must prove local closedness $d\omega_{\mathcal B}=0$ on every certified regular receiver domain, check closed-loop integrals and the agreement of scalar charts on overlaps, and keep sources, folds, coincidences, and self-diagonal events as quarantined boundaries unless an accepted prescription covers them. For a countable or continuum Noether-sea limit, it must also justify

$$
\nabla_{\mathbf X_r}
\int \Phi_b\,d\mu(b)
=
\int \nabla_{\mathbf X_r}\Phi_b\,d\mu(b)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8966e69eb713fa6d)

using declared lower-distance and Jacobian bounds together with an integrable summability bound on the source-history measure $\mu$.

Plainly: local scalar pieces become one global scalar only if they have no circulation, match wherever their charts overlap, and never cross an untreated singularity. An infinite sea adds another burden: differentiating the combined history must be provably interchangeable with summing or integrating its individual rows.

The scalar representation is falsified on its claimed domain by any one of the following operator-checkable results:

- nonzero curl of the complete acceleration on a certified regular chart;
- a nonzero integral of the acceleration around an admissible closed receiver loop;
- failure of local scalar representatives to agree, up to their allowed chart constants, on overlaps;
- a certified nonzero residual $\mathbf A_{\mathrm{ledger}}+ \nabla_{\mathbf X_r}\Phi_{\mathcal B}$ when the scalar gradient and unchanged causal-root ledger are computed independently; or
- failure of the declared distance, Jacobian, or summability bound needed for the countable or continuum source limit.

Plainly: any one of these checks shows that the proposed scalar description does not reproduce or extend the acceleration ledger on the stated domain. It does not overturn the postulated vector superposition rule, which remains the substrate law even when a scalar representation fails.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the retained history of all transmitters and on the certified active causal-root records.

Plainly: each architrino's next acceleration depends on the stored past paths that supply its currently admitted wake intersections. The equations are coupled because changing one path can change the later root ledger seen by the others.

---

#### Terms and Conventions (Detailed Breakdown)

##### Direction and Sign

**Direction of $\hat{\mathbf{r}}_{ij}$:**

$\hat{\mathbf{r}}_{ij}$ points **from the transmitter's historical position** $\mathbf X_j(T_t)$ **to the receiver's current position** $\mathbf X_i(T_r)$.

**Sign of the acceleration:**

- **Like polarities** ($\sigma_{ij} = +1$): acceleration along $+\hat{\mathbf{r}}_{ij}$ (repulsion; pushes receiver away from emission point)
- **Unlike polarities** ($\sigma_{ij} = -1$): acceleration along $-\hat{\mathbf{r}}_{ij}$ (attraction; pulls receiver toward emission point)

**Two-body checks (stationary transmitters):**

- Electrino + Electrino (like polarities): repulsion
- Positrino + Positrino (like polarities): repulsion
- Electrino + Positrino (unlike polarities): attraction
- For stationary pair geometry, swapping transmitter and receiver reverses the line-of-action unit vector and leaves the acceleration magnitude unchanged, so the two acceleration contributions are equal and opposite. This static statement does not extend to delayed moving histories; see [Exact Fixed Point-Cloud Residual](#exact-fixed-point-cloud-residual).

##### Scaling and Normalization

**The $1/r^2$ factor:**

Reflects the **surface density** of potential on the causal isochron. As that surface grows, the potential spreads over area $4\pi r^2$, so the density at any point scales as $1/r^2$.

**The transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$:**

**Continuous uniform-emission rule (declared premise).** Each architrino emits its causal wake at every absolute emission time $T_t$ in its worldline domain. Uniformity means that the emitted wake measure is proportional to the absolute-time measure,
$$
\mathrm d\mu_{\mathrm{em},j}(T_t)
=
\lambda_{\mathrm{em}}\,\mathrm dT_t,
\qquad
\lambda_{\mathrm{em}}>0
\ \text{constant}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9f6a7736c5f24601)
This density is independent of the transmitter's state of motion. In the normalization used here, $\lambda_{\mathrm{em}}$ is absorbed into $\kappa$, so the path-history integral uses $\mathrm dT_t$ directly. The causal surfaces are continuously indexed by $T_t$; an equal-$\Delta T$ sequence is only a numerical discretization of this continuum, not the substrate emission law. This emission measure is inherited from the transceiver postulate in [Architrino: Constant-Time Emission Measure](../../../../markdown/aaa/foundations/architrino.md#constant-time-emission-measure-postulate), its canonical home, and is a declared conditionality of the canonical boxed law above, not a derived result of this chapter.

Under the continuous uniform-emission rule stated above, transmitter motion maps the uniform $\mathrm dT_t$ measure onto a history-dependent family of expanding causal surfaces. Along a simple branch, surfaces with nearby emission labels $T_t$ and $T_t+\mathrm dT_t$ have local normal separation $\lvert D_t\rvert\,\mathrm dT_t$, where $D_t=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)$. The received causal-surface density per unit local normal distance is therefore proportional to $\lambda_{\mathrm{em}}/\lvert D_t\rvert$. Motion of the transmitter toward the active branch increases that density; motion away from the branch decreases it. After static-transmitter normalization, the geometric acceleration weight is
$$
W_{ij}^{\mathrm{acc}}
=
\frac{c_f}
{\left|c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)\right|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0462dd6bc9619562)

**Absorption of geometric constants into $\kappa$:**

All geometric normalization factors (for example, $1/(4\pi)$ from spherical surface area) are absorbed into the coupling constant $\kappa$ by convention. The canonical per-hit law is therefore written with an explicit inverse-square factor together with the dimensionless transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$.

**Dimensional analysis:**

$$
[\kappa] = \frac{[\text{Length}]^3}{[\text{Time}]^2 [\text{Polarity}]^2}, \quad [\mathbf A] = \frac{[\text{Length}]}{[\text{Time}]^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0bdc9dc9cb68a65d)

If the force-like bookkeeping variable $\mathbf{F}=\mu_{\text{arch}}\mathbf A$ is introduced, then $[\mathbf{F}]=[\mu_{\text{arch}}][\text{Length}]/[\text{Time}]^2$. In natural units with $c_f = 1$, $[\text{Length}] = [\text{Time}]$, and $\kappa$ has dimensions of $[\text{Length}]/[\text{Polarity}]^2$.

##### Receiver Kinematics (Radial vs Orthogonal Components)

At a given hit $(T_r;T_t)$, decompose the receiver's velocity into components parallel and orthogonal to the line of action $\hat{\mathbf{r}}_{ij}$:

$$
\mathbf V_i(T_r) = V_r \hat{\mathbf{r}}_{ij} + \mathbf V_\perp
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac2348b607a55bbe)

where:

- $V_r = \mathbf V_i(T_r) \cdot \hat{\mathbf{r}}_{ij}$ (radial component; positive = moving away from emission point)
- $\mathbf V_\perp = \mathbf V_i(T_r) - V_r \hat{\mathbf{r}}_{ij}$ (orthogonal component)

**Instantaneous effect of the hit:**

Because $\mathbf A_{ij}(T_r;T_t) \parallel \hat{\mathbf{r}}_{ij}$, its instantaneous effect satisfies:

$$
\frac{d}{dT_r}\mathbf V_\perp\Big|_{\text{hit}} = \mathbf{0}, \quad \frac{d}{dT_r}V_r\Big|_{\text{hit}} = \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij} = \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f6fece95bc9e32ef)

**Plain language:** A hit only changes the along-the-line velocity component right now; sideways motion continues unaffected at the instant of the hit. Over time, the changing radial motion alters the trajectory and thus the subsequent orthogonal component.

**Translating-assembly deformation requirement:** The receiver kinematics described here must mechanically produce the moving-assembly deformation, branch-period stretch, and two-way signal-synchronization records that later observer-inference chapters consume. If Noether braids do not squash along the direction of motion and do not preserve one retained causal-root ledger while translating through the Noether sea, the downstream recovery program fails at the dynamics layer.

##### Work and Power

The **instantaneous power** (rate of kinetic energy change) from a single hit is:

$$
\frac{dE_k}{dT_r}\Big|_{\text{hit}} = \mathbf{F}_{ij} \cdot \mathbf V_i = \big(\mu_{\text{arch}} \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij}\big) V_r = \mu_{\text{arch}}\,\kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t) \, V_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d46b0d492e8dd8bf)

**Key insight:** There is **no instantaneous work** on the orthogonal component. Power depends only on the radial velocity $V_r$.

**Radial motion and the $1/r^2$ factor (local trend):**

- **Inward motion** ($V_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
- **Outward motion** ($V_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.

**Important caveat:** Path-history delay shifts both the causal root $T_t$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all transmitters.

##### Moving Transceiver Geometry and Received Branch Strength

**Critical modeling note:**

- **Emission rule**: continuous and uniform in absolute time, as stated above
- **Spatial deposition**: velocity dependent because the surface indexed by $T_t$ is centered at the historical position $\mathbf X_j(T_t)$

The **emitted potential pattern in space** is velocity dependent because a moving transmitter centers the continuously indexed causal surfaces at different historical positions. On a simple root, the resulting transmitter-side weight is

$$
W_{ij}^{\mathrm{acc}}
=
\frac{c_f}
{\left|c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)\right|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0462dd6bc9619562-2)

The receiver's instantaneous velocity is absent from this weight. Receiver motion still matters in three causal ways:

1. the receiver's current position selects the arriving root, separation, and line of action;
2. the signed derivative $D_r/D_t$ controls how that root is replayed as reception time advances;
3. acceleration changes the receiver's later path and therefore changes future transmissions and receptions.

For a uniformly moving transmitter and a fixed receiver, let

$$
\mathbf X_j(T_t)=\mathbf X_{j,0}+\mathbf V_{j,0}T_t,
\qquad
\beta_f=\frac{\|\mathbf V_{j,0}\|}{c_f},
\qquad
\cos\theta=
\frac{\mathbf V_{j,0}\cdot\hat{\mathbf r}_{ij}}
{\|\mathbf V_{j,0}\|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fadd809f0c4b7cd4)

Then

$$
W_{ij}^{\mathrm{acc}}
=
\frac{1}{|1-\beta_f\cos\theta|},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-45facc4ba4712e59)

so transmitter motion compresses the emitted surface density in forward directions and dilates it in trailing directions. This is a transmitter-history effect, not a receiver-cadence multiplier and not an imported observer-level field law.

**Proposition 5 (exact transverse projection for a uniformly translating point cloud; derived).** Let two architrinos translate with the same constant velocity $\mathbf V=V\hat{\mathbf e}$, where $V=\|\mathbf V\|$ and $0\leq\beta_f=V/c_f<1$. At a reception time $T_r$, write their instantaneous ordered separation as
$$
\mathbf s
\equiv
\mathbf X_i(T_r)-\mathbf X_j(T_r)
=
d\hat{\mathbf n},
\qquad
\hat{\mathbf n}\cdot\hat{\mathbf e}=\cos\psi,
\qquad
d>0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a8a42914c7c81076)
Define
$$
\alpha(\beta_f,\psi)
\equiv
\sqrt{1-\beta_f^2\sin^2\psi},
\qquad
p(\beta_f,\psi)
\equiv
\alpha-\beta_f\cos\psi.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1bcccdc91b71f160)
For the unique positive-delay partner root, let $y\equiv c_f(T_r-T_t)/d$. Uniform translation of the fixed point cloud and the causal-root constraint give
$$
\left\|
\hat{\mathbf n}+\beta_f y\hat{\mathbf e}
\right\|
=y,
\qquad
(1-\beta_f^2)y^2-2\beta_f\cos\psi\,y-1=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f1c75a1190b08da)
and therefore
$$
y
=
\frac{\alpha+\beta_f\cos\psi}{1-\beta_f^2}
=
\frac{1}{p}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b3fab26714621246)
The arriving separation, line of action, transmitter-side factor, and acceleration weight are consequently
$$
r_{ij}=dy,
\qquad
\hat{\mathbf r}_{ij}
=
p\hat{\mathbf n}+\beta_f\hat{\mathbf e},
\qquad
D_{t,ij}=c_f\alpha p,
\qquad
W_{ij}^{\mathrm{acc}}=\frac{1}{\alpha p}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac614e7edb3064ed)
Substitution into the canonical per-hit law gives the exact general-orientation acceleration
$$
\boxed{
\mathbf A_{ij}
=
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\frac{
p^2\hat{\mathbf n}
+
\beta_f p\hat{\mathbf e}
}{\alpha}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1d0a250393a3309a)
and, with $\hat{\mathbf n}_{\perp} \equiv \hat{\mathbf n}-(\hat{\mathbf n}\cdot\hat{\mathbf e})\hat{\mathbf e}$, its transverse projection is
$$
\boxed{
\mathbf A_{ij,\perp}
=
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\frac{p^2}{\alpha}
\hat{\mathbf n}_{\perp},
\qquad
\left\|\mathbf A_{ij,\perp}\right\|
=
\kappa\,
\frac{|q_iq_j|}{d^2}
\frac{
\sin\psi\,
\left(
\sqrt{1-\beta_f^2\sin^2\psi}
-\beta_f\cos\psi
\right)^2
}{
\sqrt{1-\beta_f^2\sin^2\psi}
}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a12eb2b4ab9f67ce)

For perpendicular instantaneous separation, $\psi=\pi/2$, define
$$
\gamma_f
\equiv
\frac{1}{\sqrt{1-\beta_f^2}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-801fb5600024ad12)
Here $\gamma_f$ is only an abbreviation produced by the Euclidean causal-root algebra; no relativistic transformation or observer-level law has entered the derivation. In this configuration $\alpha=p=1/\gamma_f$, so
$$
\boxed{
\mathbf A_{ij}
=
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\left(
\beta_f\hat{\mathbf e}
+
\frac{1}{\gamma_f}\hat{\mathbf n}
\right),
\qquad
\left\|\mathbf A_{ij,\perp}\right\|
=
\kappa\,
\frac{|q_iq_j|}{\gamma_f d^2}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d963470881ff9f6b)
with no expansion or truncation in $\beta_f$. The general-orientation formula depends explicitly on $\psi$, so the $1/\gamma_f$ result is not an orientation-independent identity. Perpendicular separation is the only fixed orientation for which the displayed equality holds identically in $\beta_f$; isolated $\beta_f$-dependent angles may equal the same numerical value but do not extend the identity to a general orientation.

This proposition is derived from the canonical per-hit acceleration, the causal-root constraint, uniform translation of the fixed point cloud, and the declared uniform absolute-time emission measure that supplies $W_{ij}^{\mathrm{acc}}$. Its scope is one ordered partner hit with $0\leq\beta_f<1$ and nonzero instantaneous separation. The independent reference is the closed-form perpendicular projection $\kappa|q_iq_j|/(\gamma_f d^2)$; numerical evaluation can check the algebra but does not establish the proposition.

**Scope boundary and explicit non-claims.**

**Full-vector non-claim.** The full perpendicular-configuration vector does not reproduce the observer-level two-body comparison target. It retains the longitudinal component
$$
\mathbf A_{ij,\parallel}
=
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\beta_f\hat{\mathbf e}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9b2b5c6be243b416)
which is first order in $\beta_f$. Reversing the ordered transverse separation reverses the transverse component but leaves this longitudinal component unchanged.

**Parallel-separation non-claim.** For instantaneous separation parallel to the translation, the trailing receiver has magnitude $\kappa|q_iq_j|(1+\beta_f)/d^2$ and the leading receiver has magnitude $\kappa|q_iq_j|(1-\beta_f)/d^2$. The observer-level comparison target instead assigns $\kappa|q_iq_j|(1-\beta_f^2)/d^2$ to both. The symmetric part is therefore already wrong at order $\beta_f^2$.

**Fixed-point-cloud drift non-claim.** The perpendicular pair sum is nonzero:
$$
\mathbf A_{ij}+\mathbf A_{ji}
=
2\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\beta_f\hat{\mathbf e}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-56fc877d86d46f7c)
Thus a two-member configuration with fixed perpendicular separation cannot keep the assumed common constant velocity under the canonical partner-hit law. This is an acceleration statement, not a primitive mechanical-momentum claim.

**Covariance and recovery non-claim.** The result does not establish Lorentz covariance of the substrate law, an observer-level two-body law, a translating assembly branch, or a common clock-ruler-momentum response.

The result is therefore one exactly recovered projection obtained without relativistic input. It shows that the canonical transmitter-side acceleration weight contains the required geometric factor on this branch, while the longitudinal residual and pair sum sharpen the separate question of what is missing from the line of action. The fixed-point-cloud translation geometry does not by itself identify the transmitter-side origin uniquely: because $\mathbf V_i=\mathbf V_j$ here, replacing $D_t$ by $D_r$ leaves the weight unchanged. The transmitter-side attribution instead comes from the uniform-emission causal-surface-density derivation above.

**Falsifiers and attribution check.**

1. In normalized units $c_f=1$ with $\kappa=|q_iq_j|=d=1$, the perpendicular projection must equal $\sqrt{1-\beta_f^2}$. At $\beta_f=0.9$ and $0.99$ it must be, respectively, approximately $0.4358898944$ and $0.1410673598$. Any departure at any order overturns the exact projection claim.
2. At any $\beta_f>0$, direct evaluation of the full perpendicular vector must retain a longitudinal component of signed magnitude $\kappa\sigma_{ij}|q_iq_j|\beta_f/d^2$. A vanishing component contradicts the proposition and indicates an incorrect evaluator.
3. Replacing transmitter velocity by the other member's velocity inside the weight on this fixed point-cloud branch must leave the result unchanged because the velocities are equal. That outcome overturns any claim that this projection alone uniquely identifies a transmitter-side weight, but it does not overturn the projection algebra. A discriminating check must instead hold the arriving root and transmitter state fixed while varying $\mathbf V_i$, or use $\mathbf V_i\ne\mathbf V_j$. The canonical per-hit strength must remain unchanged; dependence on $\mathbf V_i$ falsifies the transmitter-side-only acceleration weight.

##### Exact Fixed Point-Cloud Residual

This calculation is a deliberately restricted negative control. Assume $\mathbf X_i(T)=\mathbf R_i+\mathbf U T$ for every member, so every internal velocity relative to the group center vanishes and every pair distance is constant. Candidate braids do not satisfy those assumptions: their members orbit internally and their pair distances generally vary with time.

Plainly: this subsection tests whether a frozen point cloud can drift without deforming. It does not test an orbiting assembly.

The perpendicular example is one orientation of the resulting general three-dimensional formula. Let an instantaneous unordered pair have unit separation $\hat{\mathbf n}_{ij}$, common drift $\mathbf V=\beta_f c_f\hat{\mathbf e}$, and signed inverse-square coefficient
$$
w_{ij}
\equiv
\sigma_{ij}\frac{|q_iq_j|}{d_{ij}^{2}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b624786be42d0fe)
Adding the two ordered canonical partner hits gives
$$
\boxed{
\mathbf A_{ij}+\mathbf A_{ji}
=
2\kappa\beta_f w_{ij}
\left[
\hat{\mathbf e}
-2(\hat{\mathbf n}_{ij}\cdot\hat{\mathbf e})\hat{\mathbf n}_{ij}
\right].
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7778eab0a578ac7c)
This expression is exact only for the fixed-point-cloud common-translation ansatz and does not assume that the pair lies in a selected plane.

Plainly: delayed partner hits do not usually cancel when the whole pair is assigned one common velocity. Their leftover depends only on the drift direction and the pair's instantaneous direction and signed strength.

This is not repaired by replacing the velocity sum with a polarity-weighted one. Like-polarity weighting preserves the common-mode residual; for an unlike-polarity pair it instead leaves a nonzero separation-direction component. More generally, a universal differentiable mechanical map $\sum_i f(\mathbf V_i)$ has local rate $D f(\mathbf V)\sum_i\mathbf A_i$ on a common-drift state, so any nondegenerate local response inherits the obstruction. The theory has not derived $f$, and the quadratic $K_\mu$ map remains a bookkeeping convention.

Plainly: the acceleration test does not depend on a mass or momentum definition. A future kinetic account can change the conservation ledger, but it cannot make an assumed constant velocity constant when its calculated time derivative is nonzero.

For an $N$-member fixed point cloud, define the signed second-moment operator
$$
W\equiv\sum_{i<j}w_{ij},
\qquad
\mathsf M\equiv
\sum_{i<j}w_{ij}\hat{\mathbf n}_{ij}\hat{\mathbf n}_{ij}^{\mathsf T},
\qquad
\mathsf K\equiv W\mathsf I-2\mathsf M.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9c71a04e44640980)
The total common-mode acceleration residual is
$$
\boxed{
\sum_i\mathbf A_i
=
2\kappa\beta_f\,\mathsf K\hat{\mathbf e}.
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d2effc73c80f5993)
Therefore the exact null condition for a declared drift direction is
$$
\mathsf K\hat{\mathbf e}=\mathbf0,
\qquad\text{equivalently}\qquad
\mathsf M\hat{\mathbf e}=\frac{W}{2}\hat{\mathbf e}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b6ba1702f161d2ba)

Plainly: cancellation is a signed directional-balance condition, not merely a head count or a visual symmetry claim.

In a plane containing the drift direction, write $\hat{\mathbf n}_{ij}=(\cos\psi_{ij},\sin\psi_{ij},0)$ in that plane. The null condition becomes the vanishing signed second harmonic
$$
\sum_{i<j}w_{ij}e^{2\mathrm i\psi_{ij}}=0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-daf1c5952b5aca0e)
A regular triangle and regular square satisfy this planar condition for equal like-polarity weights. An alternating-polarity square also satisfies it because its edge and diagonal direction orbits cancel separately. By contrast, rotational symmetry about the drift axis only removes transverse components in three dimensions; it does not by itself impose the required polar second moment. For example, an equal-weight regular tetrahedron has $\mathsf M=(W/3)\mathsf I$, hence $\mathsf K=(W/3)\mathsf I$ and no nonzero drift-direction null.

Plainly: threefold symmetry is sufficient only in the appropriate planar second-harmonic setting. A three-dimensional object can look highly symmetric and still retain a common-drift residual.

If the fixed point cloud has an eigenmode $\mathsf K\hat{\mathbf e}=\lambda\hat{\mathbf e}$ and $\mathbf U=N^{-1}\sum_i\mathbf V_i$, then the local common-mode estimate is
$$
\frac{d\mathbf U}{dT}
=
\frac{2\kappa\lambda}{Nc_f}\mathbf U,
\qquad
\tau_{\mathrm{drift}}
=
\frac{Nc_f}{2\kappa|\lambda|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5668d5c837b947bd)
Writing $\kappa|\lambda|/N=C_g a_{\mathrm{int}}$ and $t_{\mathrm{dyn}}=v_{\mathrm{int}}/a_{\mathrm{int}}$ gives
$$
\frac{\tau_{\mathrm{drift}}}{t_{\mathrm{dyn}}}
=
\frac{c_f}{2C_gv_{\mathrm{int}}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fd4d478b0c1fc3f1)
Within this fixed point-cloud ansatz, the often-used $c_f/v_{\mathrm{int}}$ scaling is therefore only an order-of-magnitude statement with a geometry coefficient; comparison with a full cycle adds the cycle's own numerical factor. A time-dependent internal geometry requires a return-map or Floquet calculation rather than this frozen exponential estimate.

Plainly: a nonzero residual forbids indefinite translation of that fixed point cloud, but it does not by itself say whether visible deformation takes one cycle or many.

The independent reference for the pair formula is direct closed-form addition of the two ordered roots in Proposition 5. The point-cloud analyzer `scripts/equation-mapping/analyze-fixed-point-cloud-residual.mjs` separately checks the matrix identity, planar nulls, and the tetrahedral negative control. It is not a Borg-catalog evaluator. Sampling a prescribed orbit at frozen phases while discarding its internal velocities does not evaluate that orbit's history and supplies no necessary condition for a moving assembly.

Plainly: the point-cloud analyzer checks the algebra above and nothing more. It cannot pass or fail an orbiting candidate.

##### Relative-Periodic Moving-Assembly Test

A translating orbiting assembly must be tested on its actual moving history. For drift speed $u$ along $\hat{\mathbf e}$, write a candidate branch as
$$
\mathbf X_a^{(u)}(T)
=
uT\hat{\mathbf e}+\boldsymbol\xi_a^{(u)}(T).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0fcc62bcc9218026)
The internal orbit may change with $u$; it is not required to remain an undeformed copy of the rest orbit. Relative-periodic closure requires a period $P_u$ and an allowed member permutation $\pi$ such that
$$
\boldsymbol\xi_a^{(u)}(T+P_u)
=
\boldsymbol\xi_{\pi(a)}^{(u)}(T),
\qquad
\dot{\boldsymbol\xi}_a^{(u)}(T+P_u)
=
\dot{\boldsymbol\xi}_{\pi(a)}^{(u)}(T).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-21740688be1b2c54)

Plainly: after one cycle, the assembly may have moved as a whole and identical members may have exchanged roles, but the complete internal position and velocity pattern must return.

The pair distances are periodic under the same relabeling, not constant:
$$
d_{ab}(T+P_u)
=
d_{\pi(a)\pi(b)}(T).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-799ba33d1006de93)
The branch must satisfy the full master-equation residual on the evolved history,
$$
\mathbf R_a^{(u)}(T_r)
\equiv
\ddot{\mathbf X}_a^{(u)}(T_r)
-
\sum_j\sum_{T_t\in\mathcal C_{aj}(T_r)}
\mathbf A_{aj}(T_r;T_t)
=
\mathbf0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-95f106e15319ebdc)

Plainly: orbital acceleration and every delayed hit remain in the test. A snapshot-only cancellation cannot substitute for this equation.

The delayed ledger must close with the orbit. Each retained root must map as
$$
(a,j,T,T_t)
\longmapsto
(\pi(a),\pi(j),T+P_u,T_t+P_u),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4882dbbe09f516e2)
with root identity, multiplicity, $D_t$, acceleration weight, inactive intervals, finite-memory contents, and event conventions preserved. Acceptance then requires an EOM-solver evolution record, the full position-velocity return residual modulo translation and permutation, the master-equation residual along the orbit, and the applicable stability or Floquet certificate.

Plainly: a successful moving assembly is a repeated solution of the complete delayed dynamics, not a sequence of geometrically attractive pictures.

Prescribed-geometry records may be checked for closure of their declared chart, but that is an integrity check only. Because they were not produced by the EOM solver, they cannot establish or refute existence or stability of a relative-periodic moving branch.

For a small-drift continuation from a rest branch, the useful first-order expansion is
$$
\boldsymbol\xi^{(u)}
=
\boldsymbol\xi^{(0)}
+u\boldsymbol\chi
+O(u^2).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bcaef920d8bfc163)
Substitution into the full delayed equation gives a periodic correction problem of the form
$$
\mathcal L\boldsymbol\chi
=
-\mathbf B_{\hat{\mathbf e}},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de4fdd27013b912e)
after the neutral translation, phase, and allowed relabeling modes are fixed. Here $\mathcal L$ is the full delayed linearization about the rest branch and $\mathbf B_{\hat{\mathbf e}}$ is the uniform-drift defect.

Plainly: the correct first question is whether the internal orbit can deform slightly so that all delayed accelerations still close. Freezing that deformation to zero recovers the fixed point-cloud restriction, not a necessary condition for the moving branch.

Claim grade: the relative-periodic conditions are derived acceptance obligations, not evidence that a branch exists. A certified EOM-solver record that satisfies the full residual, root-ledger return, state return, and stability conditions passes this test. Failure of any one condition falsifies that particular claimed branch; failure of a frozen point-cloud overlay does not.

##### Restricted Transmitter-History Cancellation Family

The canonical law's perpendicular projection differs from the commonly used observer-level two-body comparison target in its longitudinal component. A constant rescaling of $\kappa$ cannot reconcile the two forms because their relative gap varies as $\gamma_f^2$.

That mismatch does not prove that receiver velocity is mathematically necessary. Define the inertially extrapolated separation at a causal hit,
$$
\mathbf s_{ij}
\equiv
\mathbf r_{ij}
-\mathbf V_j(T_t)(T_r-T_t),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ce840aa6df8507de)
and consider the transmitter-history-only candidate family
$$
\mathbf A_{ij}^{H}
=
\kappa\sigma_{ij}|q_iq_j|\,
H(b_j^2,\zeta_{ij}^2)
\frac{\mathbf s_{ij}}{\|\mathbf s_{ij}\|^3},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c25271f8247ac86b)
where
$$
b_j^2=\frac{\|\mathbf V_j(T_t)\|^2}{c_f^2},
\qquad
\zeta_{ij}
=
\frac{\mathbf V_j(T_t)\cdot\mathbf s_{ij}}
{c_f\|\mathbf s_{ij}\|},
\qquad
H(b^2,0)=\sqrt{1-b^2}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-59e8ecc06367f929)
For fixed-point-cloud common translation, reversing the pair sends $\mathbf s_{ij}\mapsto-\mathbf s_{ij}$ while leaving the two scalar arguments unchanged. The pair therefore cancels exactly, receiver velocity remains absent, and the declared transverse target is recovered. The simplest member uses $H=\sqrt{1-b^2}$.

Plainly: the three requested algebraic properties can coexist without adding receiver velocity. The price is a different line of action and a different transmitter weight.

This family is guessed, not derived. It is not the canonical law, does not follow from the current uniform-emission surface-density argument, and has not been obtained from the accepted scalar action scaffold. It changes both the emission-site line of action and the root-density weight. The live closure question is therefore whether an Architrino-native wake construction derives one such member while preserving the accepted causal and conservation obligations. Deriving the canonical emission-site line of action and uniform emission measure from that family would falsify the stated incompatibility; showing that every admissible transmitter-history action reduces to the canonical residual would eliminate the family.

At kernel-class comparison level, a scalar causal kernel $\delta(\tilde g)/r$ supplies only a scalar root Jacobian, whereas a vector-current direct-action comparison contains an additional velocity-contraction numerator. Replacing that contraction by a constant is therefore a plausible structural source of the missing cancellation terms. This is an inferred comparison, not a derivation: causal-only time asymmetry and unresolved variation residuals can also contribute. A complete variation that closes the fixed-point-cloud residual without such a contraction would overturn this diagnosis.

##### Receiver Turning Is Not an Acceleration Singularity

The receiver-side factor

$$
D_{r,ij}
=
c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-63b0e9a497cd90c5)

appears in the signed root-playback derivative

$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{D_{r,ij}}{D_{t,ij}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-446bd08d1ec02117)

When $D_{r,ij}=0$, the tracked emission time has a stationary point as a function of reception time. The causal root does not disappear, and its acceleration does not go silent. A static transmitter with $D_t=c_f$ supplies $W^{\mathrm{acc}}=1$ whether the receiver is stationary, momentarily satisfies $D_r=0$, or has $D_r<0$.

This cleanly separates two events:

- $D_t=0$ is a transmitter-side fold or higher singularity and requires the declared fold or singular-event route.
- $D_r=0$ is a root-playback turning point. It changes the sign of branch playback but is not an acceleration pole, zero, or chart boundary.

There is therefore no receiver-velocity resistance tensor and no primitive field-speed barrier in the Master Equation. Any effective damping, velocity-dependent assembly response, or observer-level magnetic-like behavior must be derived from delayed multi-branch geometry and wake-state evolution rather than inserted as an instantaneous receiver multiplier.

---

#### Delay Differential Equation (DDE) Formulation

##### State Vector and Evolution

Define the **state vector** for architrino $i$:

$$
\mathsf Z_i(T) = \begin{pmatrix} \mathbf X_i(T) \\ \mathbf V_i(T) \end{pmatrix} \in \mathbb{R}^6
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de59930e803903fd)

The Master EOM is a **second-order ODE** in $\mathbf X_i$, or equivalently a **first-order system** in $\mathsf Z_i$:

$$
\frac{d\mathsf Z_i}{dT} = \begin{pmatrix} \mathbf V_i(T) \\ \mathbf A_i(T) \end{pmatrix}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-571a29cc12708e85)

At a receiver evaluation event, set the generic evolution parameter to $T=T_r$. The branch-resolved acceleration is then

$$
\mathbf A_i(T_r)
=
\sum_{j} \sum_{T_t \in \mathcal{C}_{ij}(T_r)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-90ef81ce19629159)

##### Causal Functional Form

The acceleration $\mathbf A_i(T_r)$ depends on the **history** of all worldlines $\{\mathbf X_j(T') : T' < T_r\}$ through the implicit causal constraint:

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40566c3998a7df11-2)

This makes the system a **delay differential equation (DDE)** with **state-dependent delays** (the delay $\Delta_j = T_r-T_t$ is not constant; it depends on the solution itself).

**Functional notation:**

$$
\frac{d\mathsf Z_i}{dT} = \mathcal{F}\Big[\mathsf Z_i(T), \{\mathsf Z_j(\cdot)\}_{j}, T\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b9175fdad3255977)

where $\mathcal{F}$ is a **causal functional**: it depends on the current state $\mathsf Z_i(T)$ and the past states $\{\mathsf Z_j(T') : T' < T\}$ of all architrinos (including $i$ itself for self-hits).

##### Mollified Causal-Wake Regularization

The ideal model uses **surface-delta causal isochrons** in the emission-time integral. On a simple branch with a distance floor and a Jacobian floor, the delta collapses to a continuous reception-time branch contribution weighted by the transmitter-side acceleration weight; singular or impulse-like behavior arises only when branches hit collision support, lose transversality, accumulate, or are sampled as unresolved numerical events. One may treat the singular limit as a measure-valued branch law, or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - c_f\Delta) \longrightarrow \delta_\eta(r - c_f\Delta) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - c_f\Delta)^2}{2\eta^2}\Big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b6e1afdb2502e398)

while preserving total emission $q$.

**Effect:** Under the finite-branch, distance-floor, and transversality assumptions stated below, this supports **continuous-in-time acceleration diagnostics** and classical $C^1$ solutions for $\mathbf X_i(T)$ given $C^1$ initial data.

**In the super-field-speed regime** ($\|\mathbf V_a\| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization gives a finite contribution only while the active-root count, separation floor, Jacobian floor, and transmitter-side acceleration weight remain controlled.

**Convergence requirement:** As $\eta \to 0$, numerical solutions must converge to a well-defined limit. If a theorem or simulation also introduces a short-distance core mollifier $\epsilon_c$, it must declare whether the amplitude remains polarity-blind apart from $\sigma_{ij}|q_i q_j|$ or whether a derived polarity-dependent kernel has been added. The default law uses the former convention; the latter is a new closure claim and must preserve the same causal-root, symmetry, and event-ledger checks before it can be used in an assembly or blackbody argument.

##### Conditional Well-Posedness for the Regularized Exact Model

To make the existence/uniqueness claim precise for the finite-$\eta$ regularization used in this chapter, we formalize the dynamics as a state-dependent delay system in first-order form:
$$
\frac{d\mathbf Y}{dT}=\mathcal{G}(\mathbf Y_T),\qquad
\mathbf Y_T(\theta)=\mathbf Y(T+\theta),\ \theta\in[-h,0]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6b991106182a29cd)
with phase space $\mathcal{H}=C^1([-h,0],\mathbb{R}^{6N})$. This is the convenient proof scaffold used here because the active-root extraction uses the implicit-function theorem on
$$
C^1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-54616ce70f194ece)
histories. For sharper state-dependent delay work, especially when acceleration bounds rather than classical second derivatives are the natural control, the phase space may need to be
$$
W^{1,\infty}([-h,0],\mathbb{R}^{6N})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bd14516c5e69a043)
or an absolutely continuous history class. The exact choice is a regularity burden of the theorem being proved, not a change in the causal law.

**Assumptions (regularized regime):**

- **(W1) Kernel regularity:** $\delta_\eta$ is $C^1$, bounded, and integrable.
- **(W2) Uniform branch finiteness:** on the considered history neighborhood, each pair $(i,j)$ has at most $B_{ij}<\infty$ active causal branches.
- **(W3) Root transversality:** for every active branch $\Delta_{ij,\ell}$,
  $$
  \left|\partial_\Delta g_{ij}(\Delta,\phi)\right|\ge \nu>0,
  \qquad
  g_{ij}(\Delta,\phi)=\|\phi_i(0)-\phi_j(-\Delta)\|-c_f\Delta
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0f2702a3c4737cdc)
- **(W4) Distance floor on the branch support:** $\|\phi_i(0)-\phi_j(-\Delta_{ij,\ell}(\phi))\|\ge d_{\min}>0$.
- **(W5) Bounded charges/couplings:** $\kappa$, $|q_i|$ finite.

**Conditional theorem (local well-posedness and continuation).**
Under (W1)-(W5), for any initial history $\phi^0\in\mathcal{H}$ there exists $T>0$ and a unique solution
$$
\mathbf{Y}\in C^1([T_{\mathrm{init}}-h,T_{\mathrm{init}}+\Delta T),\mathbb{R}^{6N}),\qquad \mathbf{Y}_{T_{\mathrm{init}}}=\phi^0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-895203daa899cb12)
The solution extends uniquely to a maximal interval $[T_{\mathrm{init}}-h,T_{\max})$. If on every finite interval
$$
\sup_{T<T^\ast}\|\mathbf V(T)\|<\infty,\quad
\inf_{T<T^\ast,\ i,j,\ell} r_{ij,\ell}(T)>0,\quad
\inf_{T<T^\ast,\ i,j,\ell}|\partial_\Delta g_{ij,\ell}(T)|>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-df9ae82933b9f65d)
and
$$
\sup_{T<T^\ast,\ i,j}B^{\mathrm{active}}_{ij}(T)<\infty
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-77834eb14ccd82e8)
then $T_{\max}=\infty$. Here $r_{ij,\ell}(T)$ denotes the transmitter-receiver distance on branch $\ell$, and
$$
B^{\mathrm{active}}_{ij}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4bf994e3495eadaf)
denotes the number of active causal branches of pair
$$
(i,j)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6f90e0f43a7344fc)
inside the chosen memory horizon at receiver time
$$
T
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fea9020f3f30fc8d)

**Proof.**

1. By (W3), each active delay branch is simple; the Implicit Function Theorem gives $\Delta_{ij,\ell}(\phi)\in C^1$ on a neighborhood of $\phi^0$.
2. Each per-branch acceleration term is a composition of $C^1$ maps (evaluation, subtraction, norm, mollifier, and unit-direction projection). By (W4), denominators stay away from zero; by (W5), coefficients are bounded. Hence each branch term is locally Lipschitz in $\phi$.
3. By (W2), only finitely many branches contribute, so their sum $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ where (W3)-(W4) hold.
4. State-dependent DDE existence/uniqueness theory on Banach spaces is invoked, yielding a unique local $C^1$ solution and a maximal extension. For state-dependent delays the applicable results (solution-manifold / almost-Lipschitz frameworks, e.g. Walther-class theorems) impose conditions that are not verified here.
5. Continuation follows from the same theorem: finite-time breakdown can occur only by leaving every bounded subset of the admissible set, i.e. via unbounded speed, vanishing separation on active support, transversality loss/root accumulation, or unbounded active branch-count growth.

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ surface-delta limit still requires separate control of root accumulation and Jacobian-degenerate branches. The conclusion is conditional on the cited framework's hypotheses; their verification for this system is an open obligation, so no closing tombstone is claimed.

##### Finite-Continuation Criterion for Global Comparisons

The well-posedness theorem is the dynamics-side home for global-continuation comparisons used later in [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md#global-continuation-and-cosmic-censorship-comparison) and [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#cauchy-horizon-comparison-pressure). It should not be read as a claim that observer records determine a unique global spacetime. Its native claim is narrower: a declared finite history, boundary wake record, and branch chart either determine a finite continuation family or they do not.

For a compact subsystem $\Omega$ and window $W=[T_i,T_f]$, let $\mathcal{A}_{\Omega,W}^{(\eta)}$ be the set of branch charts that satisfy the regularized assumptions (W1)-(W5), the bounded active-branch condition, the distance floor, and the root-transversality floor on $W$ using the same finite boundary data $\mathcal{B}_{\partial\Omega}|_W$. The dynamics-side continuation family is
$$
\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}
=
\left\{
\mathbf{Y}_{T_f}^{a}
:
a\in\mathcal{A}_{\Omega,W}^{(\eta)},
\ \mathbf{Y}_{T_f}^{a}
\text{ is generated by the regularized master equation from }
\left(\mathbf{Y}_{T_i},\mathcal{B}_{\partial\Omega}|_W\right)
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d60d8e392bd6977c)
The comparison passes only if
$$
0<\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|<\infty
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-548a520d042a52a9)
with every element carrying the causal-root ledger, energy diagnostic or exact charge used for the run, and the boundary wake data that selected it. Empty, infinite, or unlabeled families are not global closure; they mark an unresolved continuation ambiguity. A later strong-field or cosmology chapter may quotient this family by observer-accessible records, but the quotient must be derived from the same master-equation data rather than imposed as a global-hyperbolicity assumption.

The cardinality is itself a structural diagnostic:

- $\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|=0$ means no compatible global section of the declared branch-chart data exists.
- $\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|=1$ means the finite data select a unique deterministic continuation.
- $2\le\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|<\infty$ means deterministic multistability: the complete state occupies one branch, while record-limited comparisons must use the basin weights induced on the finite labeled family.
- $\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|=\infty$ means root accumulation, noncompact branch freedom, or unresolved chart gluing, not a mature global comparison.

Equivalently, this is the section count of the causal-root gluing target over the finite window:
$$
\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}
\subset
H^0(W;\mathcal{F}_{\mathrm{root}})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-210bb933126c8c9e)
after the finite boundary data and regularization convention have been fixed. Finite labeled multistability is an admissible branch-statistics object. Empty, infinite, unlabeled, or non-gluing continuation families remain closure failures, and the obstruction should be reported as a local admissibility failure, an accumulation failure, or a nonzero gluing class in $\check H^1$.

### Operational Principles, Self-Interaction, and Examples

#### Core Principles (Operational Summary)

##### Superposition

**Statement:** The potential wake contributions from all transmitters **superpose linearly**. The net potential at any point is the sum of the individual wake potentials:

$$
\Phi_{\text{net}}(\mathbf X, T) = \sum_{i} \Phi_i(\mathbf X, T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0656af3bfbbee2de)

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when the same-transmitter root condition permits, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}$, branch gaps, and screening or cancellation assumptions that make the retained sum finite.

Inverse-square dilution alone is not a global convergence theorem. For an infinite transmitter family, a branch chart must declare a summation or continuum prescription under which
$$
\lim_{R\to\infty}
\sum_{j:\|\mathbf X_j\|<R}
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\mathbf A_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e2f11f4fb23e401)
exists, or it must supply local neutrality, angular cancellation, shielding, a screened kernel, finite active horizon, or a mean-field/principal-value subtraction. Without this condition, the many-transmitter wake sum is not a well-defined acceleration law even though each individual hit has the correct surface-density falloff.

##### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. The received acceleration magnitude is modulated by the transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$. Transmitter motion controls this factor. Receiver motion controls signed root playback and affects the kinetic-rate diagnostic through its radial velocity, but it does not multiply the arriving acceleration.

**Self-interaction requirement:** Self-hit requires super-field-speed interval history: the worldline must exceed $c_f$ somewhere along a nontrivial emission-to-reception interval, except for the degenerate field-speed tangent case excluded by the simple-root branch condition. Curvature alone is insufficient if $\|\mathbf V_a\| < c_f$ everywhere on the relevant interval.

**Persistent memory:** Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

##### Causality and Locality

**Causal structure:** Event $A$ at $(T_A, \mathbf X_A)$ can influence event $B$ at $(T_B, \mathbf X_B)$ only if:

$$
T_B > T_A \quad \text{and} \quad \|\mathbf X_B - \mathbf X_A\| \leq c_f(T_B - T_A)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d525134c862a100)

This defines a **field-speed causal cone** centered at each event. The filled inequality is the reachability condition; exact hits still occur only on causal wake surfaces satisfying the equality root.

**No action-at-a-distance:** All influences propagate at finite speed $c_f$. There are no instantaneous interactions across spatial separation.

**Event-locality at the receiver:** The Master EOM is evaluated **at the receiver event**: only the causal wake surfaces intersecting $\mathbf X_i(T_r)$ contribute to the acceleration there and then. However, it is **path-history dependent**: the active branches depend on the **entire past worldline** of all transmitters.

---

#### Self-Interaction (Self-Hit Dynamics)

##### Self-Hit Condition

An architrino $i$ experiences self-hit at reception time $T_r$ if there exists $T_t<T_r$ such that:

$$
\|\mathbf X_i(T_r) - \mathbf X_i(T_t)\| = c_f(T_r-T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-baa274dff3803dde)

**Geometric interpretation:** The architrino's current position $\mathbf X_i(T_r)$ lies on the causal isochron emitted from its past position $\mathbf X_i(T_t)$.

**Requirements:**

1. **Curvature**: The worldline must curve (straight-line motion admits no self-hits).
2. **Super-field-speed interval history**: the speed must exceed $c_f$ somewhere on the interval from emission to reception, except for the degenerate straight field-speed riding case excluded by the branch Jacobian condition.

##### Multiple Self-Hits (Plural)

**Key insight:** An architrino can experience **multiple self-hits simultaneously** (or within a regularization window $\eta$).

**Mechanism:** In curved motion at super-field-speed, the worldline may intersect **multiple past isochrons** at the same reception time $T_r$. Each intersection corresponds to a distinct emission time $T_{t,k} \in \mathcal{C}_{ii}(T_r)$.

**Example:** In uniform circular motion at speed $\|\mathbf V\| > c_f$, an architrino can be hit by wake surfaces from multiple points on its own orbit, corresponding to different "winding numbers" $m = 0, 1, 2, \ldots$ (see Maximum-Curvature Orbit).

**Sum over all self-hit roots:**

$$
\mathbf{A}_{ii}(\text{self-hit})
=
\sum_{T_t \in \mathcal{C}_{ii}(T_r)}
\kappa \, \sigma_{ii} \,
\frac{|q_i q_i|}{r_{ii}^2}
W_{ii}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ii}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-77a4f0ea28904251)

where $\sigma_{ii} = +1$ (like polarities repel), so each self-hit contributes an **outward** (repulsive) acceleration.

##### Persistent Memory (Self-Hit After Slowing Down)

**Critical clarification:**

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $\|\mathbf V\| > c_f$ and emitted wake surfaces can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $T_1$: Architrino accelerates to $\|\mathbf V\| > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $T_2 > T_1$: Architrino slows down to $\|\mathbf V\| < c_f$ (e.g., due to partner attraction or external acceleration contributions).
3. At time $T_3 > T_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $T_1$ (when $\|\mathbf V\| > c_f$).

**Result:** Self-hit occurs at $T_3$ even though current velocity $\|\mathbf V(T_3)\| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf X_i(T_r)$ and $\mathbf V_i(T_r)$ is insufficient to determine $\mathbf A_i(T_r)$. The **full past worldline** $\{\mathbf X_i(T') : T' < T_r\}$ is needed to identify all causal self-hit times $T_t \in \mathcal{C}_{ii}(T_r)$.

##### Self-Hit as an Outward Barrier Mechanism

**Role in binary formation:** Self-hit provides a **repulsive radial contribution** that opposes the attractive pull of opposite-polarity partners. On the uniform circular chart, this contribution is always outward, so it can furnish a floor against collapse but cannot furnish the centripetal acceleration needed to maintain the circle. This competition produces:

- **Maximum-curvature candidates**: the circular toy model identifies where a minimum-radius barrier must be analyzed.
- **Transmitter-side fold boundary**: $D_t=0$ is a transmitter-side pole. Ordinary folds require finite-impulse certification; coincident same-transmitter birth and undeclared higher singularities fail closed.
- **A closure test, not a closure proof**: the same transmitter-side acceleration weight multiplies tangential as well as radial projections, so a transmitter-side null branch does not by itself prove vanishing tangential power or an exact locked orbit.

**Self-hit root existence is field-speed gated.** On any stored interval with $\|\mathbf V_i\|\le c_f-\sigma$ for $\sigma>0$, the exact bound $\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|\le(c_f-\sigma)(T_r-T_t)<c_f(T_r-T_t)$ forbids a nontrivial same-transmitter causal root. Therefore a candidate self-hit orbit must reach field speed somewhere in its retained history. This is a root-existence condition, not a damping theorem or a proof of binding. Under the transmitter-side law the receiver-velocity resistance term does not exist; stabilization, if present, must be demonstrated by the full delayed branch geometry, singular-event routing, and conserved wake-state accounts.

**Connection to quantum behavior:** At this chapter's claim level, non-Markovian memory and deterministic-but-complex self-hit dynamics are a candidate substrate mechanism for effective quantum-like behavior, not yet a derivation of the quantum formalism:

- effective guidance by self-interference and causal-wake history,
- discrete stable states as attractors in phase space,
- measurement uncertainty as receiver-level informational ambiguity.

An important open problem is to map the phase-space attractor landscape for self-hit binaries, including basin size for maximum-curvature orbits, escape conditions, and the existence of secondary attractors such as long-lived elliptical families.

#### Worked Examples (Analytic Baselines)

##### Stationary Opposite Charges (Radial Fall)

**Setup:**
- Two architrinos: Electrino at $\mathbf X_1(T)$, Positrino at $\mathbf X_2(T)$
- Initial conditions: Both at rest, separated by distance $d_0$
- No self-hits (speeds remain $< c_f$ if $d_0$ is not too small)

**Symmetry:** By polarity symmetry, both fall toward their common center of mass.

**Equations:** On a retained partner branch, the radial coordinate $r(T)=\|\mathbf X_2(T)-\mathbf X_1(T)\|$ has the canonical receiver-side schematic form with transmitter-side acceleration weight:

$$
\frac{d^2r}{dT^2}
=
-\frac{2\kappa \epsilon^2}{r^2}
W_p^{\mathrm{acc}}
\quad
\text{on the retained branch}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f76f00bdf41efe4e)

where the factor of 2 comes from the symmetry when both sides consume the same retained partner record. The stripped inverse-square form is only the near-rest, single-branch calibration $W_p^{\mathrm{acc}}\approx1$, not a canonical proof record.

**Solution structure:** The slow, single-branch calibration has the same quadrature structure as Keplerian radial fall. A promoted branch must keep the same-record $D_t$, $D_r$, and $W^{\mathrm{acc}}$ record.

**Key insight:** Partner attraction dominates; no self-hit (speeds remain sub-field-speed for moderate $d_0$).

##### Sub-Field-Speed Circular Orbit

**Setup:**
- Two opposite polarities in symmetric circular orbit at radius $R$, speed $v < c_f$
- No self-hits (sub-field-speed regime)

**Partner contribution:** The circular transmitter-side geometry nominates an inward radial diagnostic and a tangential-sign diagnostic. In the canonical Master EOM, those records are not acceleration verdicts until the same partner branch emits $D_t$, $D_r$, and $W^{\mathrm{acc}}$.

**Result:** The transmitter-side circular sign record is an orientation diagnostic, not the proof. The exact receiver-side calculation later in this chapter supplies the canonical weighted acceleration and proves that the principal partner branch cannot be a constant-speed circle because its tangential acceleration is strictly positive. Stability of a broader multi-root or medium-coupled branch remains a separate question.

##### Maximum-Curvature Orbit (Self-Hit Barrier)

**Setup:**
- A candidate opposite-polarity branch reaches super-field-speed curved history after a non-circular contraction, capture, or forced branch transition
- Self-hits activate → repulsive outward acceleration

**Geometric definition (Null Separatrix):** For an active causal root $T_t \in \mathcal{C}_{ii}(T_r)$ on the self-hit branch, define

$$
J_{ii}(T_r;T_t)\equiv 1-\frac{\mathbf V_i(T_t)\cdot \hat{\mathbf{r}}_{ii}(T_r;T_t)}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cdcbaeed1328ec5f)

The maximum-curvature binary (MCB) boundary is the Jacobian-degenerate set

$$
J_{ii}(T_r;T_t)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2f93531dee60f25e)

with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal wake surface of its own past emission (the “riding-the-shock” limit).

**Why this is a hard wall in the exact theory:** In the exact branch-resolved acceleration, the self-hit contribution carries the factor

$$
\frac{W_{ii}^{\mathrm{acc}}(T_r;T_t)}{r_{ii}^2(T_r;T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-864cdc4c73133e01)

On a generic off-circular branch, $D_{t,ii}\to0$ makes the ideal branch-resolved pointwise response diverge whenever the remaining geometry stays regular. A uniform-circular retained root is a special chart: the circular root-playback identity gives $D_{r,ii}=D_{t,ii}$, so both factors vanish together and the event must be handled as a fold rather than under a bounded-nonzero-$D_r$ hypothesis. In either case, the divergence should not be treated as a literal state pinned at infinite acceleration. Across a simple caustic transit, [Caustic Transit and Finite Impulse](#caustic-transit-and-finite-impulse) shows that the integrated velocity change can remain finite; with finite numerical regularization $\eta > 0$, the event appears as a large but finite impulse that sharpens as $\eta\to 0$.

This transmitter-side fold is therefore an **amplitude pole** for the self branch. It is not, by itself, a theorem of circular closure. The same transmitter-side acceleration weight multiplies every projection of the self-hit acceleration, including the tangential component, so contact with $D_{t,ii}=0$ requires a certified event treatment and does not by itself establish a periodic orbit or zero net cycle-averaged kinetic-rate change.

**Operational characterization of MCB:**
- The inner branch evolves by caustic grazing near $J_{ii}=0$, with finite impulses across the regularized boundary rather than exact pinning on an infinite-acceleration surface.
- The minimum radius $R_{\min}$ is the smallest orbit radius compatible with $J_{ii}\ge 0$ on active roots.
- Tangential power must be controlled separately; near-zero cycle-average power is an additional closure condition, not a consequence of $J_{ii}=0$ alone.

**Significance:**
- Nominates a candidate inner scale $R_{\min}$; it does not define a fundamental length until one retained bound branch is certified
- Supplies an outward null-separatrix barrier candidate against $r\to0$ collapse, subject to a finite accepted transition rule at the singular event
- Supplies one geometric ingredient in candidate stable assemblies such as Noether braids without acting as their centripetal binder

**Status split (analytic vs numeric):**
- **Derived:** Existence of the Jacobian-null boundary and the outward sign of every circular self-hit radial projection.
- **Measured on the unregularized circular simple-root chart:** Algebraic partner-plus-self acceleration-balance candidates exist, but they are not retained or stable branch records.
- **Numeric still required:** A common finite singular-event convention, retained-history persistence, basin size, return-map stability, and long-time capture probability for realistic multi-body assemblies.

#### Informational Ambiguity at the Receiver

##### Limited Information Per Hit

From the perspective of the receiving architrino, the information carried by an intersecting causal isochron is **limited**. The receiver only knows:

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $\|\mathbf{F}\|$ when force bookkeeping is used).
2. The **unoriented line of action** through its current position (the line along which the acceleration points).

The receiver does **not** have direct knowledge of:
- The transmitter's identity (which architrino $j$?)
- The transmitter's precise distance $r_{ij}$ (without additional assumptions)
- The transmitter's velocity at emission $\mathbf V_j(T_t)$

##### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (polarity $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (polarity $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

##### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary surrogate transmitter** ($\|\mathbf V\|=0$) placed somewhere along the same unoriented line of action, with the actual transmitter speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched transmitter-side acceleration weight.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what transmitter configurations are consistent with a given hit?).

##### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of wakes** from many different transmitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the transmitter configuration.

##### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and transmitter-ambiguous information at the hit level is a candidate bridge to effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics. The bridge remains a closure target until the coarse-grained state map and record-formation dynamics are derived:

- **Wave function transition**: $\psi$ may be interpreted as a coarse-grained representation of the wake-defined potential landscape only after a density/phase map has been supplied.
- **Measurement interaction**: an outcome is a record formed by assembly interactions and causal-hit history, not by adding a fundamental collapse postulate at this level.
- **Uncertainty**: the native candidate mechanism is informational ambiguity at the receiver plus unresolved microstate sensitivity, not ontic randomness.

### Parameters and Numerical Implementation

#### Parameter Definitions

The core parameters entering the Master Equation are:

| **Parameter** | **Symbol** | **Working convention** | **Dimensional** | **Comment** |
|:--------------|:-----------|:----------------------|:----------------|:------------|
| Wake speed | $c_f$ | Set to 1 in natural units unless otherwise stated | $\mathrm{L}\,\mathrm{T}^{-1}$ | Propagation speed in the causal constraint |
| Coupling constant | $\kappa$ | Universal coupling parameter | $\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | Controls the strength of the inverse-square interaction |
| Architrino polarity unit | $\epsilon$ | $\lvert e \rvert / 6$ | $\mathrm{Q}$ | Fundamental polarity magnitude |
| Causal-wake-surface thickness (regularization) | $\eta$ | Positive regularization width used in analysis and simulation | $\mathrm{L}$ | Mollifies delta singularities |

In this document, $c_f$ is treated primarily as a unit-setting convention, $\kappa$ as the universal coupling scale of the delayed interaction law, $\epsilon$ as the fundamental polarity unit, and $\eta$ as a regularization parameter used only when a smooth surrogate of the exact causal-wake dynamics is required.

#### Numerical Implementation Notes

##### Delay Root-Finding Algorithms

At each reception step $T_r$, the numerical integrator must solve the **implicit causal constraint** for each transmitter $j$:

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t), \quad T_t<T_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d3bb81527b84a791)

**Algorithm (schematic):**

1. For each transmitter $j$, search the history buffer $\{\mathbf X_j(T') : T' < T_r\}$ for all $T_t$ satisfying the constraint.
2. Use **bisection** or **Newton-Raphson** to refine roots to tolerance $\epsilon_{\text{root}}$.
3. If multiple roots exist (multi-hit regime), enumerate all; sum their contributions.
4. If no roots exist (transmitter too far away or not yet causal), skip transmitter $j$ at this time step.

**Efficiency:** Use **history binning** or **spatial hashing** to avoid exhaustive search over all past times.

###### Spatial Hashing for History Buffers

**Efficiency requirement:** Naïve all-pairs history search scales as $O(N^2 T_{\text{history}})$, intractable for $N > 100$ particles.

**Required optimization:** Implement spatial hash grid with cell size $\sim c_f \Delta T_{\max}$; only search cells within causal range of receiver. Expected scaling: $O(N \log N)$.

**Implementation notes:**
- Partition spatial domain into cubic cells of side length $\Delta_{\text{cell}} \approx c_f T_{\text{history,max}}$
- At each time step, bin all architrino positions into cells
- For receiver at $\mathbf X_i(T)$, only search cells within causal radius $r_{\text{max}} = c_f T_{\text{history}}$
- Update hash grid incrementally (not from scratch each step)

##### Time-Stepping Schemes for DDEs

The Master EOM is a **state-dependent DDE** (delay depends on the solution itself). Standard ODE integrators (e.g., RK4) must be adapted:

**Recommended methods:**

- **Fixed-point iteration** with predictor-corrector (for implicit delays)
- **Adaptive time-stepping** (small $\Delta T$ when roots are close or numerous)
- **Event detection** for exact root crossings (optional; improves accuracy in sharp-hit regime)

**Stability:** Ensure $\Delta T < \eta / c_f$ (resolve mollified wake surface width); adjust $\eta$ and $\Delta T$ together in convergence tests.

##### Emission-to-Receiver Provenance Tracking

**For debugging and interpretation:**

At each hit, log:
- Transmitter ID $j$
- Emission time $T_t$
- Emission position $\mathbf X_j(T_t)$
- Reception time $T_r$
- Reception position $\mathbf X_i(T_r)$
- Per-hit acceleration contribution (bookkeeping variable $\mathbf{F}_{ij}(T_r;T_t)$)

**Use cases:**

- Visualize causal cones and causal isochrons
- Identify self-hit events and winding numbers
- Trace energy transfer pathways
- Validate superposition (sum of logged accelerations = total acceleration?)

### Analytic Regimes and Research Roadmap

#### Summary and Key Takeaways

##### What This Document Establishes

The **Master Equation of Motion** is the deterministic law governing the evolution of all architrinos:

$$
\frac{d^2 \mathbf X_i}{dT_r^2}
=
\sum_{j} \sum_{T_t \in \mathcal{C}_{ij}(T_r)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-12b8c03c2ee11dd1)

**Key features:**

1. **Event-local at the receiver**: Only intersecting delayed causal wake surfaces contribute (no action-at-a-distance).
2. **Non-Markovian**: Depends on full path history (self-hit memory).
3. **Superposition**: Linear sum over all transmitters and causal roots.
4. **Self-hit**: Repulsive same-transmitter interaction when $\mathcal{C}_{ii}(T_r)$ is nonempty with a valid transversality floor and a retained transmitter-side acceleration weight; super-field-speed interval history is proved necessary for simple nontrivial roots and can persist as memory after slowing down.
5. **Radial line of action with transmitter-side weighting**: No magnetic or velocity-cross-product terms; all per-hit accelerations point along $\hat{\mathbf{r}}_{ij}$, with magnitude modulated by $W_{ij}^{\mathrm{acc}}=c_f/|D_{t,ij}|$.

##### Implications for Emergent Phenomena

The equation supplies the microscopic input for later emergence claims, but it does not by itself prove those claims. The status split is:

- **Binary stabilization**: supported by self-hit barriers and circular/spiral benchmarks; exact stable branches still require certified branch charts and tangential-power closure.
- **Noether braids and particle assemblies**: downstream assembly claims that must be derived from multi-body causal-root locking and hierarchy averaging.
- **Quantum behavior**: an effective closure target based on non-Markovian memory, attractor basins, and receiver-level informational ambiguity.
- **Observer-level geometry and gravity**: effective descriptions that must be recovered from Noether sea constitutive response and clock/ruler closure, not inserted into the substrate law.
- **Cosmology**: an effective observer-side program tied to Noether sea evolution, transport, and clock-rate comparison; the Euclidean void itself is not claimed to expand.

---

#### Fully general case (arbitrary N, arbitrary trajectories)

The master EOM is a coupled system of **state‑dependent delay differential equations** with:

- non-linear dependence on all worldlines,
- implicit causal roots defined by
  $\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\| = c_f (T_r-T_t)$,
- potentially **multiple roots** per pair (multi‑hit, self‑hit),
- non-smooth behavior in the $\eta \to 0$ limit.

In PDE/DDE theory, systems of this type almost never admit closed‑form analytic solutions except in toy limits.

- **Claim:** There is no expectation of general analytic solutions for arbitrary N and trajectories.
- The tractable analytic targets are:
  - Existence/uniqueness theorems in broad classes,
  - qualitative theory (invariants, attractors, bifurcations),
  - asymptotic approximations (multipole / far‑field, continuum limits),
  - special highly symmetric exact solutions.

This status is not exceptional: even Newtonian N‑body gravity is analytically intractable in the generic case, and the Master EOM adds state-dependent delays and self-hit branch structure.

---

#### Ideal / symmetric cases where analytic work is realistic

The most tractable cases are the highly symmetric regimes in which closed forms or controlled approximations remain plausible.

##### Static / quasi-static limit (Coulomb analogue)

Assumptions:

- All particles move slowly: $\|\mathbf V_j\| \ll c_f$,
- Configuration changes on timescales long compared to light‑crossing time across the system,
- No self‑hits (sub‑$c_f$ everywhere, weak curvature).

Then:

- For each pair $(i,j)$, the causal root is essentially unique and very close to the current quasi-static causal emission time.
- We can neglect acceleration and velocity corrections in the past-emission position.

To leading order, we should recover:

- A **Coulomb‑like 1/r^2 law** between quasi‑static sources,
- The usual Kepler‑like two‑body dynamics.

Analytic status:

- Two‑body problem in this limit: solvable exactly (ellipses, etc.).
- N‑body: same qualitative status as Newtonian gravity/electrostatics—no closed form in general, but standard perturbation methods apply.

This is the basic consistency-check regime of the theory.

---

##### Two-body, 1D radial motion (head-on, no angular momentum)

Setup:

- Two opposite polarities on a line, starting at rest, moving directly toward each other,
- Symmetry: center-of-mass at rest, only radial variable $r(T)$,
- Speeds sub-$c_f$ so no self-hit.

Then:

- Causal delay gives a small correction; in the slow regime we can treat it perturbatively.
- To zeroth order, the reduced equation is:
  $$
  \frac{d^2 r}{dT^2} = -\frac{2\kappa \epsilon^2}{r^2}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6686eebbecb0c417)
  which has an exact analytic solution for $r(T)$ (same mathematics as Kepler fall-to-center).

We can:

- Write the exact integral for $T(r)$, and invert in special cases.
- Then treat causal delay as a small parameter $\epsilon_\mathrm{delay} \sim r/c_f T$ and develop a systematic expansion.

The reduced problem is analytic up to standard quadratures, with causal-delay corrections available as a systematic perturbation series.

For the local origin-crossing theorem program in the self-hit-capable collinear reduction, the working 1D model is dual-mollified rather than merely causal-surface-regularized: the causal-surface mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite.

---

##### Sub-Field-Speed Two-Body Uniform Circular Orbit

Consider the symmetric opposite-polarity circular ansatz
$$
\mathbf X_1(T)=R(\cos\omega T,\sin\omega T,0),
\qquad
\mathbf X_2(T)=-\mathbf X_1(T),
\qquad
\beta_f\equiv \frac{v}{c_f}=\frac{\omega R}{c_f}\in(0,1)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-72b39c8fee9daa24)
Fix receiver $1$ at reception time $T_r$ and let the unique partner emission time be $T_t=T_r-\Delta$, with
$$
\xi\equiv \frac{\omega\Delta}{2}\in\left(0,\frac{\pi}{2}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f5945bf534e7ed5)
Write $\mathbf{e}_r(T_r)=(\cos\omega T_r,\sin\omega T_r,0)$ and $\mathbf{e}_\theta(T_r)=(-\sin\omega T_r,\cos\omega T_r,0)$ for the receiver polar frame.

##### Proposition (Unique partner branch and exact delay equation)

In the symmetric sub-$c_f$ circular ansatz, the partner branch is unique and its delay angle $\xi$ is the unique solution of
$$
\cos\xi=\frac{\xi}{\beta_f},
\qquad
0<\xi<\frac{\pi}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b1d4848f1b734df9)

**Proof.** The partner separation is
$$
\mathbf{r}_{12}(T_r;T_t)
=
\mathbf X_1(T_r)-\mathbf X_2(T_t)
=
R\big(\mathbf{e}_r(T_r)+\mathbf{e}_r(T_r-\Delta)\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fdeb59abb334a594)
so
$$
r_{12}(T_r;T_t)=2R\cos\frac{\omega\Delta}{2}=2R\cos\xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a0ff21e01ad6554f)
The causal condition $r_{12}=c_f\Delta$ therefore becomes
$$
2R\cos\xi=c_f\frac{2\xi}{\omega}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-714d033f2af4f39e)
hence $\cos\xi=\xi/\beta_f$. Define $h_{\beta_f}(\xi)=\cos\xi-\xi/\beta_f$ on $[0,\pi/2]$. Then
$$
h_{\beta_f}(0)=1>0,
\qquad
h_{\beta_f}\!\left(\frac{\pi}{2}\right)=-\frac{\pi}{2\beta_f}<0,
\qquad
h_{\beta_f}'(\xi)=-\sin\xi-\frac{1}{\beta_f}<0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-375864eec50b12d1)
So $h_{\beta_f}$ is strictly decreasing and has exactly one root on $(0,\pi/2)$. $\square$

##### Lemma (Circular root-playback identity)

On every nondegenerate root of the uniform circular partner and self-hit charts, the receiver-side factor equals the transmitter-side factor:
$$
D_r=D_t.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cca1f75acb52bbee)
For the partner branch below, both transmitter and receiver velocity projections onto $\hat{\mathbf r}_{12}$ equal $-v\sin\xi$. For a uniform circular self root, the same rotational symmetry makes the transmitter and receiver projections equal on the same signed chord sheet. Thus the signed playback derivative is one, but the acceleration weight remains
$$
W^{\mathrm{acc}}=\frac{c_f}{|D_t|}=\frac{1}{|J^t|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6b2d48f2d39ccb09)
Root playback and acceleration strength do not cancel one another.

##### Proposition (Exact partner-only circular receiver-side decomposition)

For the unique partner branch above,
$$
\hat{\mathbf{r}}_{12}
=
\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T),
\qquad
r_{12}=2R\cos\xi,
\qquad
J_{12}^{t}=1+\beta_f\sin\xi,
\qquad
W_{12}^{\mathrm{acc}}=\frac{1}{1+\beta_f\sin\xi}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6be01316b043d538)
Since the charges are opposite, the partner acceleration on receiver $1$ is
$$
\mathbf A_{12}
=
-\frac{\kappa |q_1q_2|}{4R^2\cos^2\xi}
\frac{1}{1+\beta_f\sin\xi}
\left(
\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T)
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fe7254e0a9fa1325)
Therefore the exact radial and tangential components are
$$
a_r^{(\mathrm{part})}
=
-\frac{\kappa |q_1q_2|}
{4R^2\cos\xi\,(1+\beta_f\sin\xi)}<0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d0a7a6768b194a0)
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa |q_1q_2|\,\sin\xi}
{4R^2\cos^2\xi\,(1+\beta_f\sin\xi)}
>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-433daa8cd3c7afac)

**Proof.** Using
$$
\mathbf{e}_r(T-\Delta)=\cos(2\xi)\,\mathbf{e}_r(T)-\sin(2\xi)\,\mathbf{e}_\theta(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3e5b43d41414eed8)
one finds
$$
\mathbf{r}_{12}
=
R\big(\mathbf{e}_r(T)+\mathbf{e}_r(T-\Delta)\big)
=
2R\cos\xi\left(\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T)\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2a09150c83a20afb)
which gives the stated $r_{12}$ and $\hat{\mathbf{r}}_{12}$. The transmitter velocity at emission is
$$
\mathbf V_2(T_t)
=
-v\,\mathbf{e}_\theta(T-\Delta)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1aba8313d232592a)
and
$$
\mathbf{e}_\theta(T-\Delta)\cdot\hat{\mathbf{r}}_{12}=\sin\xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de4c138b26be7a5b)
so
$$
\mathbf V_2(T_t)\cdot\hat{\mathbf{r}}_{12}=-v\sin\xi,
\qquad
J_{12}^{t}=1-\frac{\mathbf V_2(T_t)\cdot\hat{\mathbf{r}}_{12}}{c_f}=1+\beta_f\sin\xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-403fead705cd58eb)
The receiver velocity is $\mathbf V_1(T)=v\mathbf e_\theta(T)$, and
$$
\mathbf V_1(T)\cdot\hat{\mathbf r}_{12}=-v\sin\xi.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cf9cd42b9c09c4f1)
Therefore $D_r=D_t=c_f(1+\beta_f\sin\xi)$ and $W_{12}^{\mathrm{acc}}=(1+\beta_f\sin\xi)^{-1}$ on this uniform circular branch. Because $\sigma_{12}=-1$ for opposite polarities, the canonical branch acceleration is $-\kappa|q_1q_2|\hat{\mathbf{r}}_{12}/[r_{12}^2(1+\beta_f\sin\xi)]$, and projecting onto $\mathbf{e}_r(T)$ and $\mathbf{e}_\theta(T)$ yields the stated components. Since $\xi\in(0,\pi/2)$, every denominator is positive and $\sin\xi>0$, proving the sign claims. $\square$

##### Corollary (Tangential positivity and circular instability)

Within the isolated partner-only circular ansatz, the tangential power is strictly positive:
$$
\mathbf A_{12}\cdot\mathbf V_1(T)=v\,a_\theta^{(\mathrm{part})}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ea17bde5cab587ad)
Therefore an isolated opposite-polarity binary cannot realize an exact constant-speed circular orbit from partner delay alone.

**Interpretation.** These are the exact transmitter-side partner-only circular formulas needed elsewhere in the chapter. They show that the delayed partner branch supplies inward radial pull, but it also drives the motion forward along $\mathbf{e}_\theta$. The transmitter-side transmitter-side denominator rescales both projections without changing their signs. Any tightening history must be certified on a non-circular branch or by an explicit finite-window conserved-account closure.

---

##### Super-Field-Speed Single-Architrino Uniform Circular Self-Hit

This is the key toy model for self‑hit/maximum curvature.

Take:

- One architrino on a circle of radius $R$, angular speed $\omega$, velocity $v = \omega R > c_f$.
- We ignore partner acceleration contributions; pure self-hit geometry.

Then causal condition:

$$
\big\|\mathbf X(T) - \mathbf X(T_t)\big\|
= 2R\left|\sin\frac{\omega (T_r-T_t)}{2}\right|
= c_f (T_r-T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7068a77891fbecbe)

Let $\Delta = T_r-T_t > 0$. Then:

$$
2R\left|\sin\frac{\omega \Delta}{2}\right| = c_f \Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ab50da214438c373)

Introduce the dimensionless variables
$$
\beta_f=\frac{v}{c_f}=\frac{\omega R}{c_f},
\qquad
\xi=\frac{\omega \Delta}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-935b7ec9ca41568a)
Then the circular self-hit condition becomes
$$
\left|\sin\xi\right|=\frac{\xi}{\beta_f},
\qquad 0<\xi<\beta_f
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-caaedd3110ac60e9)
For fixed $\beta_f>1$, the admissible self-hit set is therefore **finite**, not infinite: roots are exactly the intersections of $\left|\sin\xi\right|$ with the line $\xi/\beta_f$ inside the compact interval $(0,\beta_f)$. Dropping the absolute value restricts the calculation to the positive-sine sheets and omits physical roots on alternating half-windings.

The principal branch turns on at $\beta_f=1$. Writing $\beta_f=1+\mu$ with $\mu>0$ small, the smallest root obeys
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
\Delta_0 \sim \frac{2\sqrt{6\mu}}{\omega},
\qquad
r_0=c_f\Delta_0\sim 2R\sqrt{6\mu}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a171d1c27affaece)
The associated circular transmitter-side Jacobian diagnostic is
$$
J_n
=
1-\frac{\mathbf V(T-\Delta_n)\cdot\hat{\mathbf{r}}_n}{c_f}
=
1-\beta_f\cos\xi_n
=
1-\xi_n\cot\xi_n
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f8e5991668be6a70)
On the principal branch,
$$
J_0 \sim 2\mu
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b238d35188b14339)
The transmitter-side coarea diagnostic therefore scales like
$$
\frac{1}{r_0^2|J_0|}
\sim
\frac{1}{48R^2\,\mu^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6ba64c728c0f9dc0)
This is also the canonical transmitter-side scaling on the nondegenerate side of the uniform circular chart, because $W_0^{\mathrm{acc}}=1/|J_0|$. Thus the principal self-root amplitude scales as $O(\mu^{-2})$ near its coincident endpoint birth. The endpoint exclusion alone does not make that transition finite; it remains a failed singular event until one regularized treatment certifies a finite accepted impulse and the corresponding conserved accounts.

Higher branches are also tractable. For the circular root function
$$
g_{\beta_f}(\xi)\equiv \sin\xi-\frac{\xi}{\beta_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e92d1f3302a66cdd)
new admissible roots can appear only at interior tangencies satisfying
$$
g_{\beta_f}(\xi)=0,
\qquad
g_{\beta_f}'(\xi)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-768dda4ec2f623ad)
Eliminating $\beta_f$ gives the tangency equation
$$
\tan\xi = \xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e7d9e9566129f08d)
and the corresponding threshold speed is
$$
\beta_f^\star = \sec\xi^\star
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-71f6a502702f36ca)
At every such tangency,
$$
J^\star = 1-\beta_f^\star \cos\xi^\star = 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b3db123d26853a19)
So each new circular self branch is born directly on a Jacobian-null boundary: branch creation and null-separatrix contact are the same event in the uniform circular toy model.

> **Proposition (Signed higher-winding circular branch birth).** The circular distance equation should be read branchwise as
> $$
> g_{\beta_f,s}(\xi)\equiv s\sin\xi-\frac{\xi}{\beta_f}=0,
> \qquad
> s=\operatorname{sign}(\sin\xi)\in\{+1,-1\}.
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9fde524d2e04ec58)
> For each higher half-winding $n\ge 1$, set
> $$
> I_n=\left(n\pi,\left(n+\frac{1}{2}\right)\pi\right),
> \qquad
> s_n=(-1)^n,
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1bd1b458d4df8410)
> and let $\xi_n^\star\in I_n$ be the unique positive solution of
> $$
> \tan\xi_n^\star=\xi_n^\star.
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e8acc8226da06dbd)
> The signed branch-birth speed is
> $$
> \beta_n^\star
> =
> s_n\sec\xi_n^\star
> =
> |\sec\xi_n^\star|
> =
> \sqrt{1+(\xi_n^\star)^2}.
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6956c72d0eca2d44)
> If
> $$
> a_n=\left(n+\frac{1}{2}\right)\pi,
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-59fe7430f5c0ed9e)
> then
> $$
> \xi_n^\star=a_n-\frac{1}{a_n}+O(a_n^{-3}),
> \qquad
> \beta_n^\star=a_n-\frac{1}{2a_n}+O(a_n^{-3}).
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5cbad85fdee8bdaa)
> For $\beta_f=\beta_n^\star+\mu$ with $0<\mu\ll 1$, the two newly active roots satisfy
> $$
> \xi_{n,\pm}(\beta_f)
> =
> \xi_n^\star
> \pm
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu),
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4bd37897d39af357)
> and their transmitter-side Jacobians have opposite signs:
> $$
> J_{n,\pm}
> =
> 1-\beta_f s_n\cos\xi_{n,\pm}
> =
> \pm\,\xi_n^\star
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu).
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c11c3efca576f80)
> Thus a higher-winding fold creates a signed root pair on a Jacobian-null boundary. Since $r_{n,\pm}\to 2R\xi_n^\star/\beta_n^\star\neq0$, the transmitter-side diagnostic part of the branch kernel scales as
> $$
> \frac{1}{r_{n,\pm}^2|J_{n,\pm}|}
> =
> O(\mu^{-1/2}).
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-268dd099077af803)
> The causal-action coarea weight is a separate collapse factor:
> $$
> g_{\beta_f,s_n}'(\xi_{n,\pm})
> =
> s_n\cos\xi_{n,\pm}-\frac{1}{\beta_f}
> =
> -\frac{J_{n,\pm}}{\beta_f},
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b3537df58b39163)
> so the action-counting density carries an additional $|g_{\beta_f,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$. Under the transmitter-side law the acceleration weight is already $W^{\mathrm{acc}}=c_f/|D_t|=1/|J^t|$. Action counting remains a separate variational question and may not be inferred by multiplying the acceleration by signed root playback.
>
> Consequently the circular self-hit combinatorics remain linearly bounded in $\beta_f$. A one-sign subchart has
> $$
> N_{\text{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1),
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-863203b676e23cf9)
> while the full signed $|\sin\xi|$ chart has the same no-proliferation form with the convention-dependent leading constant.

> **Benchmark Proposition (Circular branch-count bound).** In the symmetric circular benchmark, if the speed ratio obeys
> $$
> |\beta_f(T)|\le \beta_{\max}<\infty
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-66b62f4a0667b726)
> uniformly, then the active circular self-hit count is uniformly bounded:
> $$
> N_{\mathrm{self}}(T)
> \le
> \frac{\beta_{\max}}{\pi}+C_{\mathrm{circ}},
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d7075f59d87f4e1f)
> where
> $$
> C_{\mathrm{circ}}
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-711e4bc86f951bbd)
> is an absolute endpoint-count constant for the circular root equation. This supplies the missing branch-count input in the continuation criterion for that benchmark. A general super-field-speed trajectory still needs its own no-proliferation theorem; tight spirals or repeatedly folded histories can otherwise leave the finite-branch chart even without speed blowup, collision, or a single Jacobian floor loss. The natural generalization is a curvature-bounded no-proliferation lemma: on a retained interval with bounded speed, bounded curvature or total turning, positive separation, and the declared transversality floor away from finite folds, active causal roots should remain uniformly finite. Until such a lemma is proved for a trajectory class, the circular bound is a benchmark, not a global branch-count theorem.

This circular benchmark already:

- Gives us analytic control of the causal roots (as solutions of a simple scalar transcendental),
- Lets us write the transmitter-side self-acceleration target as
  $$
  \mathbf A_\text{self}(T) =
  \sum_n \kappa \frac{q^2}{r_n^2}W_{n}^{\mathrm{acc}}\hat{\mathbf{r}}_n
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c42d36557705a15)
  with $r_n = c_f \Delta_n$, $W_{n}^{\mathrm{acc}}=1/|J_n|$ on nondegenerate uniform circular roots, and directions that can be written explicitly in terms of the phase difference.

The benchmark does not provide an elementary closed-form sum, but it gives the following controlled inputs:

- the root geometry is explicitly analyzable,
- At high speed the number of admissible roots grows only linearly with $\beta_f$ because all roots lie in $(0,\beta_f)$,
- Large‑$n$ roots admit asymptotic expansions,
- the canonical self-acceleration series can be studied away from circular root-map degeneracies,
- and the asymptotic radial/tangential components can be recomputed as functions of $v/c_f$.

Near a circular transmitter-side degeneracy, $D_r$ approaches zero with $D_t$, so the signed root-playback derivative stays equal to $1$ on the nondegenerate roots. The acceleration weight $W_n^{\mathrm{acc}}=c_f/|D_t|$ instead grows without bound as the simple-root chart approaches $D_t=0$. The pointwise simple-root formula does not continue through the birth event; only an accepted finite transition rule could replace it there.

This is therefore a root-transversality and branch-birth statement, not a closure theorem. A circular self branch born on $D_t=0$ marks a chart boundary; it does not supply a singular receiver-side amplitude on the uniform circular ansatz. Any locked-orbit claim must still control the signed radial and tangential sums on a retained branch chart.

The circular benchmark is therefore useful for:

- deriving a condition for equilibrium between self‑repulsion and an imposed centripetal requirement,
- defining $R_\text{min}(v)$ and in particular the extremal radius / speed.

The same circular chart also gives a branchwise acceleration decomposition. On the positive-sine self-hit subchart, every active root satisfies
$$
\sin\xi=\frac{\xi}{\beta_f},
\qquad
r=2R\sin\xi=2R\frac{\xi}{\beta_f},
\qquad
J=1-\beta_f\cos\xi=1-\xi\cot\xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-188199d4b3e7c81e)
Resolving the line-of-action direction into the instantaneous circular frame gives
$$
\hat{\mathbf{r}}(\xi)=\sin\xi\,\mathbf{e}_r+\cos\xi\,\mathbf{e}_\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b4e31683228d4263)
With
$$
C=\frac{\kappa q^2}{4R^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c5b91b300948a7b5)
and uniform-circular transmitter-side acceleration weight
$$
W_s^{\mathrm{acc}}(\xi)=\frac{c_f}{|D_t(\xi)|}=\frac{1}{|J(\xi)|},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-13c9cbae710dd5dd)
the branchwise self-hit projections are therefore
$$
a_r(\xi)=C\frac{\beta_f}{\xi|J(\xi)|},
\qquad
a_\theta(\xi)=C\frac{\beta_f^2\cos\xi}{\xi^2|J(\xi)|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6d35860891c97a79)
Thus the radial projection is outward on every active self root, while the tangential projection is controlled entirely by the sign of $\cos\xi$.

> **Proposition (Circular self-hit radial sign and principal tangential threshold).** On every nondegenerate root of the full uniform-circular self-hit equation, the radial projection is strictly outward. On the principal root $\xi_0\in(0,\pi)$, the tangential projection is forward for $1<\beta_f<\pi/2$, zero at $\beta_f=\pi/2$, and backward for $\beta_f>\pi/2$.
>
> **Proof.** On the full signed chart, let
> $$
> s_\xi=\operatorname{sign}(\sin\xi)
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-abc9d0c7fcfb621b)
> so
> $$
> \hat{\mathbf r}(\xi)
> =
> |\sin\xi|\,\mathbf e_r+s_\xi\cos\xi\,\mathbf e_\theta
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-484a0f5847f8fa29)
> The canonical multiplier $C/(\sin^2\xi\,|J|)$ is positive away from a fold. Therefore the radial coefficient is proportional to $|\sin\xi|>0$, while the tangential sign is $\operatorname{sign}(s_\xi\cos\xi)$. On the principal branch $s_\xi=+1$ and
> $$
> \beta_f=\frac{\xi_0}{\sin\xi_0}
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a1edf960321b7a3d)
> is strictly increasing on $(0,\pi)$ because $\sin\xi_0-\xi_0\cos\xi_0>0$. The tangential sign changes only at $\xi_0=\pi/2$, where the root equation gives
> $$
> \beta_f=\frac{\pi/2}{\sin(\pi/2)}=\frac{\pi}{2}
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c009bde02192ca0)
> This proves both statements. $\square$

The threshold $\beta_f=\pi/2$ is exact for the principal root of this uniform-circular chart with the present emission-point-to-reception-point line of action. It is not a speed-only theorem for a non-circular history, a multi-architrino assembly, or a kernel whose line of action is defined from another point.

Here “tangential power” means the kinematic rate $\mathbf A\cdot\mathbf V=v\,a_\theta$ on the circular chart, so it has the same sign as $a_\theta$. Converting that rate into the quadratic assembly-level energy bookkeeping uses $\mu_{\text{arch}}\mathbf A\cdot\mathbf V$ and does not assign physical mass to an architrino.

The branch sheets have the following one-sign structure:

| Sheet | Root status for $\sin\xi=\xi/\beta_f$ | Radial projection | Tangential projection |
| --- | --- | --- | --- |
| Negative sine lobes | No roots, because $\xi/\beta_f>0$ | Inactive | Inactive |
| First positive lobe | One nonzero root for $\beta_f>1$ | Outward | Forward for $\cos\xi>0$, backward for $\cos\xi<0$ |
| Higher positive left sheets | One root after birth from a Jacobian-null fold | Outward | Forward |
| Higher positive right sheets | Paired root after the same birth | Outward | Backward |

Away from fold neighborhoods, substituting the canonical transmitter-side weight $W_s^{\mathrm{acc}}=1/|J|$ gives the formal large-$\beta_f$ sums
$$
A_{r,\mathrm{src}}^{\mathrm{diag}}(\beta_f)
=
\frac{C}{\pi}\log\beta_f+O(C)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0e346dceb745708d)
and
$$
A_{\theta,\mathrm{src}}^{\mathrm{diag}}(\beta_f)
=
-\frac{C\beta_f}{12}+O(C\log\beta_f)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5da8fca0c916985c)
The corresponding absolute tangential activity is
$$
\sum_{\xi_n}|a_{\theta,\mathrm{src}}^{\mathrm{diag}}(\xi_n)|
=
\frac{C\beta_f}{6}+O(C\log\beta_f)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8b1b77533dc41262)
These are formal simple-root transmitter-side sums, not accepted global acceleration certificates, because their treatment of fold neighborhoods and coincident branch births is incomplete. The signed tangential constants must be recomputed with the same regulated event convention before any cancellation estimate is promoted.

The full signed $|\sin\xi|$ circular chart uses $s=\operatorname{sign}(\sin\xi)$ and
$$
s\sin\xi=\frac{\xi}{\beta_f},
\qquad
J=1-\beta_f s\cos\xi,
\qquad
\hat{\mathbf{r}}(\xi)=|\sin\xi|\,\mathbf{e}_r+s\cos\xi\,\mathbf{e}_\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-05b1617dca4d0fe5)
Thus the full signed-chart projections, including the canonical transmitter-side weight, are
$$
a_r^{|\sin|}(\xi)=C\frac{\beta_f}{\xi|J(\xi)|},
\qquad
a_\theta^{|\sin|}(\xi)=C\frac{\beta_f^2s\cos\xi}{\xi^2|J(\xi)|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d451bacb40a64361)
The radial contribution is still outward on every active self root. The tangential contribution is forward on each left sheet and backward on each right sheet, independent of the sine-lobe sign. Pure circular self-hit is therefore not tangentially neutral branchwise; it supplies outward radial support and signed forward/backward tangential activity that must be summed on the retained receiver-side ledger, without by itself proving or disproving full binary closure.

The complete root census follows from the absolute-value equation, not from the positive-sine subchart alone. In each higher lobe $\xi\in(n\pi,(n+1)\pi)$, $n\ge1$, a pair is born when
$$
\tan\xi_n^\star=\xi_n^\star,
\qquad
\beta_{f,n}^\star
=
\sqrt{1+(\xi_n^\star)^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-02336e43b9fa72c9)
The first two pair-birth speeds are
$$
\beta_{f,1}^\star\approx4.6033388488,
\qquad
\beta_{f,2}^\star\approx7.7897057675
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4433362582bfe60b)
At $\beta_f=8$, the five self-hit delay angles $\phi=2\xi$ are approximately
$$
319.2409^\circ,\quad
413.6433^\circ,\quad
632.7112^\circ,\quad
859.1794^\circ,\quad
911.8419^\circ
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a63159e1cf54b435)
The three-angle positive-sine census omits the two roots at $413.6433^\circ$ and $632.7112^\circ$. The additional pairs can reverse the sign of the summed self tangential contribution: on the formal simple-root chart, the first post-birth reversal occurs at $\beta_f\approx4.6914503106$, with analogous reversals after later births. Because every pair is born at $J=0$, these sign reversals are branch-chart measurements rather than accepted finite-event dynamics.

The independently executable instrument `scripts/equation-mapping/analyze-circular-self-hit-binary.mjs` enumerates each monotone half-lobe, checks every root against the Euclidean chord residual, and evaluates acceleration from the position and velocity vectors rather than replaying the scalar component formulas. In units $\kappa|q^2|/R^2$ with outward radial sign positive, its scan over $1<\beta_f<20$ gives two distinct results:

1. With the principal partner root plus every physical self root, the tangential total has no zero; its measured minimum is approximately $0.2389668633$ at $\beta_f\approx1.7972747766$. The radial total crosses from outward to inward at $\beta_f\approx1.8471246228$, so that crossing is real but has no exact relation to $\pi/2$.
2. With every physical partner root and every physical self root, the simple-root circular ledger does have simultaneous tangential-zero and inward-radial points. The first occurs at
   $$
   \beta_f\approx3.0703566254,
   \qquad
   A_{\mathrm{tan}}\approx0,
   \qquad
   A_{\mathrm{rad}}\approx-0.8196069638
   $$

   [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ea7f82246f7ddeb6)
   and the radial equation selects $R/R_*\approx0.0869416735$. The partner-root Jacobian floor at this point is approximately $0.7071$.

These are measured algebraic facts of the unregularized uniform-circular simple-root chart, not retained-branch or stability results. The null result for the restricted principal-partner ledger is not a theorem on $(1,\infty)$, while the first full-ledger result establishes a numerical zero of the prescribed algebraic ledger inside the searched interval. Promotion to a circular MCB requires the same finite singular-event convention for the folds that created the older roots, a retained-history certificate, wake-boundary closure, and a stable return map.

The line-of-action sensitivity can be recomputed without changing the causal-root measure. In the counterfactual inertially extrapolated construction, retain the actual roots, emission-site distance, and canonical transmitter-side acceleration weight, but replace the acceleration direction by
$$
\hat{\mathbf d}_{\mathrm{ext}}
=
\frac{\mathbf d_{\mathrm{ext}}}{\|\mathbf d_{\mathrm{ext}}\|},
\qquad
\mathbf d_{\mathrm{ext}}
=
\mathbf X_r(T_r)
-
\left[
\mathbf X_t(T_t)+\mathbf V_t(T_t)(T_r-T_t)
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8fc18133e8bb0aef)
For a circular self root with receiver at $(R,0)$ and delay half-angle $\xi$, its dimensionless extrapolated separation is
$$
\frac{\mathbf d_{\mathrm{ext}}^{\mathrm{self}}}{R}
=
\left(
1-\cos 2\xi-2\xi\sin 2\xi,
\;
\sin 2\xi-2\xi\cos 2\xi
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-80adace57e20a127)
This closed form is the independent directional reference used by the executable check.

The full branchwise recomputation changes the existence verdict for that counterfactual. At the first three canonical emission-site candidates $\beta_f\approx3.0703566254$, $6.2184549634$, and $9.3764360282$, the extrapolated-direction radial coefficients are respectively $+0.1986630540$, $+0.1969175233$, and $+0.1881554019$, while the tangential coefficients are $-0.3350989817$, $-0.1271086141$, and $-0.0742863069$. Each row is outward and tangentially unbalanced. The counterfactual ledger develops replacement tangential zeros near $\beta_f\approx3.2253960989$, $6.2226379612$, and $9.3769260902$, but their radial coefficients remain outward. A scan through $1<\beta_f<20$ finds six tangential zeros and no simultaneous inward-radial point.

Claim grade: **measured counterfactual**. This result shows that the canonical algebraic candidates are line-of-action sensitive; it does not promote the extrapolated construction into the Master Equation. The [autonomous emission-labeled wake transport](#autonomous-emission-labeled-wake-transport) derives the canonical direction and weight on regular support from the present fixed-speed wake ontology. The direction-only extrapolated construction is not the wake-surface normal, while a coherently moving extrapolated center changes the propagation law, causal support, and collapse weight. The counterfactual therefore cannot demote the canonical candidates unless the substrate wake postulates are changed.

The equilibrium test precedes every stability test. Because all extrapolated-direction tangential zeros in the searched domain have outward radial acceleration, none is a circular equilibrium and no linearized delay spectrum about those rows is meaningful. The stability result is therefore not applicable after acceleration-balance failure; it is not a measured instability.

Falsifiers are direct. A negative canonical self-hit radial projection on any admissible circular root refutes the radial-sign proposition. Failure of the principal tangential term to change sign between $\beta_f=1.5$ and $\beta_f=1.65$ refutes the threshold result. A missed root with chord residual below the declared tolerance refutes the census. Recomputing the complete canonical ledger without the algebraic zero near $\beta_f=3.07036$ refutes the canonical measurement. Finding an extrapolated-direction tangential zero with negative radial coefficient inside $1<\beta_f<20$ refutes the counterfactual nonexistence measurement.

##### High-Speed-Ratio Partner and Self Circular Residual Status

The receiver-side partner branch has a clean high-speed asymptotic form. Let $\xi_p(\beta_f)$ solve
$$
\cos\xi_p=\frac{\xi_p}{\beta_f},
\qquad
0<\xi_p<\frac{\pi}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-78b7b3688a7645d2)
and set
$$
C=\frac{\kappa q^2}{4R^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c5b91b300948a7b5-2)
Then
$$
\xi_p=\frac{\pi}{2}-\frac{\pi}{2\beta_f}+O(\beta_f^{-2})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ea553489defe825)
so the partner projections satisfy
$$
a_{\theta}^{(\mathrm{part})}
=
\frac{4C}{\pi^2}\beta_f+O(C),
\qquad
a_{r}^{(\mathrm{part})}
=
-\frac{2C}{\pi}+O(C\beta_f^{-1})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ae29b84dc61b68ec)
The older residual constants
$$
C\left(\frac{4}{\pi^2}-\frac{1}{12}\right)\beta_f,
\qquad
\frac{C}{\pi}\log\beta_f-\frac{2C}{\pi},
\qquad
\frac{4C}{\pi^2}\beta_f,
\qquad
\frac{2C}{\pi}\log\beta_f-\frac{2C}{\pi}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d76edda03c5a0739)
belong to the formal simple-root transmitter-side chart. They remain useful for comparing root families, but they do not certify a global acceleration residual or a large-$\beta_f$ circular exclusion until fold neighborhoods and coincident births share one accepted event convention. The complete unregularized simple-root sum has now been recomputed over $1<\beta_f<20$: the restricted principal-partner ledger stays tangentially positive, while the full partner-plus-self ledger has algebraic zeros after older partner-root births. The regulated chart must still be recomputed before either pattern is promoted to retained dynamics.

Thus the equal-magnitude bare circular chart remains an obstruction benchmark, not a closed no-go theorem. A retained constant-radius exclusion still requires positive transmitter-side floors, inactive gaps, finite memory depth, the receiver-side branch records, and signed radial/tangential residual closure on the same branch chart.

The circular self-hit and partner-hit formulas are kernel benchmarks. They are not the Noether braid model. The Noether braid model is the six-body branch chart containing self, partner, and inter-binary causal roots, with hierarchy averaging only where justified by separated scales and certified branch data.

---

##### Maximum-curvature binary (declared indexed-binary idealization)

For a declared **two‑body** maximum-curvature orbit of binary $a$, we have:

- Two charges on roughly circular orbits about their COM,
- Both potentially with self‑hit,
- Plus partner acceleration contributions with causal delay.

Analytic expectations:

- An *exact closed form* is very unlikely.
- But:

  - We can construct a controlled circular ansatz:
    - Assume perfectly circular orbits with fixed $R$, $\omega$,
    - Compute partner acceleration including causal delay (as in [Sub-Field-Speed Circular Orbit](#sub-field-speed-circular-orbit)),
    - Compute self-acceleration (as in [Self-Interaction (Self-Hit Dynamics)](#self-interaction-self-hit-dynamics)),
    - Demand that time-averaged radial acceleration gives exactly $\omega^2 R$,
    - Demand that time-averaged tangential acceleration vanish.

  - That gives us a **pair of algebraic conditions** in $R$ and $\omega$ (or equivalently $R$ and $v$).
  - Solving those algebraic conditions (perhaps numerically) defines a maximum‑curvature solution family.

However, the circular benchmark still exposes a serious certification burden in the bare two-body kernel. The principal partner branch contributes positive tangential acceleration, but older signed partner sheets can contribute negatively. The self sector gives outward radial support while its tangential projection changes sign by sheet. On the current unregularized simple-root chart, the complete partner-plus-self sum does vanish at discrete algebraic points, beginning near $\beta_f=3.07036$, where the net radial acceleration is inward. Exact constant-speed circular algebraic balance is therefore not excluded. No stable or retained circular branch follows until the fold-born roots share one accepted singular-event convention and pass the branch-history, wake-boundary, and return-map requirements.

This sharpens the maximum-curvature program into a concrete fork:

- the measured simple-root algebraic cancellations survive the finite-event and retained-history completion, after which stability still requires a separate delay-operator proof, or
- the cancellations disappear under that completion. The tested inertially extrapolated direction already removes them and supplies no replacement equilibrium on $1<\beta_f<20$, but it can decide the canonical branch only if a wake-state derivation promotes that direction and its accompanying weight.

- Analytically: we can reduce the existence question to algebraic conditions and asymptotic expansions, and in the bare circular ansatz we can identify the partner-positive/self-signed tangential balance that any closure certificate must satisfy.
- Dynamically: the stability question remains separate from the algebraic construction and requires numerical analysis of attractivity versus fine-tuned orbit families.

No stability verdict follows from the present algebraic record. Existence of a circular or maximum-curvature solution would only solve the acceleration-balance conditions
$$
\overline A_{\mathrm{rad}}(R,v)=\omega^2R,
\qquad
\overline A_{\mathrm{tan}}(R,v)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7705ed04455d82e7)
Stability is a different question: linearizing the delayed dynamics about the candidate orbit gives a delay operator
$$
L(\lambda)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4392713c122d5694)
and the characteristic equation
$$
\det(\lambda I-L(\lambda))=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac2c8b20ba373624)
Any root with
$$
\operatorname{Re}\lambda>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8afcf893e20afec5)
is an unstable mode.

> **Target Proposition (MCB transverse stability diagnostic).** For any candidate bare two-body maximum-curvature binary, compute the linearized delay operator on radial and tangential perturbations. The null-separatrix self-hit wall may block the radial collapse channel but cannot supply centripetal acceleration on the circular chart. The complete unregularized circular partner-plus-self ledger has measured algebraic cancellation points, while the restricted principal-partner ledger remains tangentially positive on $1<\beta_f<20$. Thus a bare MCB should be treated as an uncertified organizing orbit in
> $$
> (R,v)
> $$

> [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5bde4838410ecdfd)
> space until the net signed tangential balance and transverse eigenvalues are certified.

This is the intended dynamical interpretation. Stable particles in the Noether braid architecture are Noether braid assemblies; a bare MCB, if it exists, is a high-curvature component or limiting scaffold whose instability explains why additional locking structure is needed.

The resulting status would be an analytic scaffold with a numerical stability check, not a closed-form certification.

---

##### Symmetric delayed spiral (advanced non-circular benchmark)

The circular obstruction makes a non-circular benchmark worthwhile. A workable first ansatz is the symmetric logarithmic spiral
$$
r(\theta)=R_0 e^{-a\theta},
\qquad
T(\theta)=\frac{\theta}{\Omega},
\qquad
\mathbf X_1(\theta)=r(\theta)\,\mathbf{e}_r(\theta),
\qquad
\mathbf X_2(\theta)=-r(\theta)\,\mathbf{e}_r(\theta)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-108a9263a03f9300)
with fixed pitch $a>0$ and constant angular rate $\Omega>0$.

The variable-pitch extension replaces the constant pitch by
$$
p(\theta)\equiv-\frac{r'(\theta)}{r(\theta)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5d3610d686990f75)
At a transmitter angle $\theta_0=\theta-\Delta$, write
$$
p_0\equiv p(\theta-\Delta),
\qquad
\omega_0\equiv \dot\theta(\theta-\Delta),
\qquad
\rho\equiv \frac{r(\theta-\Delta)}{r(\theta)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d2d3ef285781bc29)
The logarithmic benchmark is the special case $p(\theta)=a$, $\omega_0=\Omega$, and $\rho=e^{a\Delta}$. This extension is useful because a true minimum-radius event requires
$$
\dot r=0,
\qquad
\ddot r\ge 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2e4f9bc54d352a5c)
which in the pitch variable means
$$
p(\theta_\ast)=0,
\qquad
p'(\theta_\ast)\le 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2224b8fe08acbee6)
when $\dot\theta(\theta_\ast)\ne0$.

For a receiver event at angle $\theta$ and a partner emission at $\theta_0=\theta-\Delta$ with $\Delta>0$, define
$$
\Lambda_p(\theta,\Delta)\equiv \sqrt{1+\rho^2+2\rho\cos\Delta}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6ad006deccd53df1)
Then
$$
\mathbf{r}_{12}(\theta;\theta_0)
=
r(\theta)\Big[(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-949e0c7fd22fa079)
so the exact delayed-hit condition is
$$
r(\theta)\,\Lambda_p(\theta,\Delta)=c_f\,(T(\theta)-T(\theta-\Delta))
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bd4e39f3d1dacb33)
For constant angular rate this reduces to
$$
\Lambda_p(\theta,\Delta)=\frac{\Delta}{b(\theta)},
\qquad
b(\theta)\equiv \frac{\Omega r(\theta)}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ae1bfb2daf45a500)
which is the non-circular analogue of the circular partner equation $\cos\xi=\xi/\beta_f$.

The receiver Frenet frame for the variable-pitch spiral is
$$
\hat{\mathbf{T}}
=
\frac{-p\,\mathbf{e}_r(\theta)+\mathbf{e}_\theta(\theta)}{\sqrt{1+p^2}},
\qquad
\hat{\mathbf{N}}
=
\frac{-\mathbf{e}_r(\theta)-p\,\mathbf{e}_\theta(\theta)}{\sqrt{1+p^2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7236f16ff7fc1049)
where $p=p(\theta)$ and $\hat{\mathbf{N}}$ points inward in the circular limit. Using the branch unit vector
$$
\hat{\mathbf{r}}_{12}
=
\frac{(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_p}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-013a5593a000c8ca)
the partner transmitter-velocity projection entering the Jacobian is
$$
\mathbf V_2(\theta-\Delta)\cdot\hat{\mathbf{r}}_{12}
=
\frac{r(\theta)\rho\,\omega_0}{\Lambda_p}
\Big[p_0(\cos\Delta+\rho)-\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e4cb31a4c839e07b)
Hence
$$
J_{12}
=
1+
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0192f990113be677)
The sign is fixed by the circular limit: when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta_f\sin(\Delta/2)$.

###### Closed Transmitter-Side Spiral Factors

For acceleration contributions the transmitter-side factor fixes the transmitter-side weight. Define the current and transmitter-event dimensionless tangential speeds
$$
b\equiv\frac{r(\theta)\dot\theta(\theta)}{c_f},
\qquad
b_0\equiv\frac{r(\theta)\rho\omega_0}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-42394b04a1973e00)
Then the transmitter-side and receiver-side factors on the same retained partner root are available in closed form:
$$
\frac{D_{t,p}}{c_f}
=
1+
\frac{b_0}{\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-43e9524d36eecb97)
$$
\frac{D_{r,p}}{c_f}
=
1+
\frac{b}{\Lambda_p}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f9df71a7451c03c5)
Hence the exact partner acceleration weight is
$$
W_p^{\mathrm{acc}}(\theta,\Delta)
=
\frac{1}{\left|
1+\dfrac{b_0}{\Lambda_p}
\big[\sin\Delta-p_0(\cos\Delta+\rho)\big]
\right|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-80e47ebf46f47d03)
This expression is algebraic once a delayed root $\Delta$ is known. The receiver-side expression remains useful for signed root playback but does not enter this weight. In the uniform circular limit, $W_p^{\mathrm{acc}}=(1+\beta_f\sin(\Delta/2))^{-1}$.

For opposite polarities, the branch acceleration is
$$
\mathbf A_{12}
=
-\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}{r(\theta)^2\Lambda_p^2}\,
\hat{\mathbf{r}}_{12}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dfe30a522a7d6e68)
Projecting onto the variable-pitch Frenet frame gives
$$
a_T^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}
{r(\theta)^2\Lambda_p^3\sqrt{1+p^2}}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-09853c1b012d2aa7)
$$
a_N^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}
{r(\theta)^2\Lambda_p^3\sqrt{1+p^2}}
\Big[1+\rho\cos\Delta-p\rho\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fdbec97de6ed7228)
The partner tangential numerator is therefore
$$
S_T^{p}(\theta,\Delta)
\equiv
p(1+\rho\cos\Delta)+\rho\sin\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e259fa03ad44e071)

The missing self-branch analogue uses
$$
\Lambda_s(\theta,\Delta)\equiv \sqrt{1+\rho^2-2\rho\cos\Delta}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-be4cedd98961cc03)
$$
\hat{\mathbf{r}}_{11}
=
\frac{(1-\rho\cos\Delta)\mathbf{e}_r(\theta)+\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_s}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-16d5ba6f5d10dcca)
The self-hit delay equation is
$$
r(\theta)\,\Lambda_s(\theta,\Delta)=c_f\,(T(\theta)-T(\theta-\Delta))
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cb17f04dd810f2ea)
and the self-branch Jacobian is
$$
J_{11}
=
1-
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-11f291c20b7a12ad)
Again the circular limit agrees with the uniform circular self-hit formula, $J_{11}=1-\beta_f\cos(\Delta/2)$.

The receiver projection on the same self line of action gives the companion closed-form records
$$
\frac{D_{t,s}}{c_f}
=
1-
\frac{b_0}{\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3b7a0d14a827ab06)
$$
\frac{D_{r,s}}{c_f}
=
1-
\frac{b}{\Lambda_s}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ef757d1a4540afd8)
and therefore
$$
W_s^{\mathrm{acc}}(\theta,\Delta)
=
\frac{1}{\left|
1-\dfrac{b_0}{\Lambda_s}
\big[\sin\Delta+p_0(\rho-\cos\Delta)\big]
\right|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-37e3915d3da027a5)
The uniform circular limit again gives $D_{r,s}=D_{t,s}$ for root playback, while $W_s^{\mathrm{acc}}=1/|J_{11}|$. Thus the transmitter-side calculation requires evaluating the transmitter-side denominator on the retained root intervals and recording $D_r/D_t$ separately for continuation.

For self-hit, $\sigma_{11}=+1$, so
$$
\mathbf A_{11}
=
\frac{\kappa q_1^2}{r(\theta)^2\Lambda_s^2}\,
W_{11}^{\mathrm{acc}}\,
\hat{\mathbf{r}}_{11}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b5ed53276d5537b5)
The self-branch tangential projection is
$$
a_T^{s}
=
\frac{\kappa q_1^2 W_{11}^{\mathrm{acc}}}{r(\theta)^2\Lambda_s^3 \sqrt{1+p^2}}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-633657fc9e4d3dcf)
so
$$
S_T^{s}(\theta,\Delta)
\equiv
-p(1-\rho\cos\Delta)+\rho\sin\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-270c9791c2befac7)

###### Closed Spiral-Direction Flow

The physical question is whether the binary's radius is shrinking or growing. The delayed acceleration does two different jobs, and they must be kept separate. Its radial part changes the inward or outward motion. Its azimuthal part changes the rotation rate and angular momentum. A forward azimuthal push can spin the binary up while the radius is still shrinking, so the torque sign alone does not answer the spiral-direction question.

The geometry separates those jobs into two dimensionless sums. $B_r$ is the net outward-radial contribution, while $B_\theta$ is the net forward-azimuthal contribution. For an equal-magnitude opposite-polarity binary, let $q^2=|q_1q_2|=q_1^2$, and define
$$
B_r
\equiv
-\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{acc}}(1+\rho_p\cos\Delta_p)}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{acc}}(1-\rho_s\cos\Delta_s)}{\Lambda_s^3}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-19ba27eb71eefd2f)
$$
B_\theta
\equiv
\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{acc}}\rho_p\sin\Delta_p}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{acc}}\rho_s\sin\Delta_s}{\Lambda_s^3}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f44191dcfaf0c965)
With $\omega=\dot\theta$, the exact polar equations are
$$
\ddot r-r\omega^2
=
\frac{\kappa q^2}{r^2}B_r,
\qquad
r\dot\omega+2\dot r\,\omega
=
\frac{\kappa q^2}{r^2}B_\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c8a375e92a68b25c)
and the angular-momentum record is
$$
\frac{d}{dT}(r^2\omega)
=
\frac{\kappa q^2}{r}B_\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d936b10b2fdaae96)
Thus $B_\theta>0$ means that the wakes are adding angular momentum. It does not mean that the binary is moving outward. Radial direction is carried separately by the changing radius.

The signed pitch packages the direction into one number:
$$
p\equiv-\frac{\dot r}{r\omega},
\qquad
\Gamma\equiv\frac{r^3\omega^2}{\kappa q^2}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a7b89af580862c6c)
for $\omega>0$. The sign convention is simple: $p>0$ means that the radius shrinks as the binary turns, while $p<0$ means that the radius grows. Direct substitution into the polar equations gives the closed receiver-side pitch flow
$$
\frac{dp}{d\theta}
=
-(1+p^2)-\frac{B_r+pB_\theta}{\Gamma}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-35fb61035227a12b)
$$
\frac{d}{d\theta}\log\omega
=
2p+\frac{B_\theta}{\Gamma}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5f96c566b59b1c43)
together with $d\log r/d\theta=-p$. These identities are exact on any smooth retained spiral chart. The complicated path-history information is confined to the delayed roots inside $B_r$ and $B_\theta$. Once those roots are known, the equations directly evolve the spiral direction.

At a radial turning point, the binary is momentarily neither moving inward nor outward, so $p=0$. The direction after that instant is decided by one balance:
$$
\left.\frac{dp}{d\theta}\right|_{p=0}
=
-\frac{\Gamma+B_r}{\Gamma}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d26c98e1dcd53bf3)
Therefore
$$
\Gamma+B_r>0
\quad\Longleftrightarrow\quad
\text{minimum radius followed by outward motion}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9f8207a7bf1fd9d2)
while
$$
\Gamma+B_r<0
\quad\Longleftrightarrow\quad
\text{maximum radius followed by inward motion}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-38b4dc36e8f1e8ab)
In plain language, $\Gamma$ is the outward centrifugal requirement and $B_r$ is the signed radial wake contribution. If their sum is positive, the radius has reached a minimum and rebounds outward. If their sum is negative, the radius has reached a maximum and turns inward. The equality case is radially tangent and requires the next derivative. This is the closed-form in-versus-out decision rule.

The simplest proposed spiral assumes that its tightness and angular rate never change. In symbols, its signed pitch is constant, $p=p_\star$, and its angular rate is constant. Under those assumptions, the two compatibility conditions reduce to
$$
B_r=(p_\star^2-1)\Gamma,
\qquad
B_\theta=-2p_\star\Gamma
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-35e8fed3b9f47cd6)
or, after eliminating the positive scale $\Gamma$,
$$
(p_\star^2-1)B_\theta+2p_\star B_r=0,
\qquad
\Gamma=-\frac{B_\theta}{2p_\star}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a3c36a5aa138dcb3)
for $p_\star\ne0$. The immediate conclusion is that a constant-rate inward spiral requires a net backward azimuthal contribution, $B_\theta<0$. The principal partner root instead contributes forward, with $B_\theta>0$. That single delayed partner wake therefore cannot produce the proposed constant-rate inward spiral by itself. Older signed roots, self roots, or a changing angular rate would have to alter the balance.

The stronger result concerns three assumptions taken together:

- the spiral keeps the same tightness;
- the angular rate stays constant;
- only the single principal partner root is active.

With no active self root, constant signed pitch gives
$$
\rho=e^{p_\star\Delta},
\qquad
\Lambda_p^2=1+\rho^2+2\rho\cos\Delta,
\qquad
b=\frac{\Delta}{\Lambda_p}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fb3bbf2f5619904f)
and the branch-strength factor cancels from the pitch-compatibility equation. The remaining necessary condition is
$$
(p_\star^2-1)\rho\sin\Delta
-2p_\star(1+\rho\cos\Delta)
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5699e8a9c553c6e9)
For fixed $p_\star\ne0$, the left-hand side is analytic in $\Delta$ and is not identically zero; its continuation to $\Delta=0$ has value $-4p_\star$. Its zeros on a retained principal interval are therefore isolated. A continuous single-root history satisfying the compatibility equation must keep $\Delta$ constant. The delay equation then keeps $b$ constant, and constant angular rate keeps $r$ constant, contradicting $p_\star\ne0$. Hence:

> **Proposition (single-principal-partner logarithmic-spiral no-go).** No exact nonzero constant-pitch, constant-angular-rate logarithmic spiral, inward or outward, exists over an open interval of the strictly sub-field, single-principal-partner receiver-side chart.

The proposition does not say that binaries cannot spiral. It says that the simple logarithmic picture is too rigid: a real spiral cannot preserve both its tightness and its angular rate while responding only to one delayed partner wake. At least one feature must evolve. The spiral can change tightness, change angular rate, acquire another delayed root, cross into the self-hit regime, or receive multi-body contributions.

The Frenet tangential sum used below is the same information in a rotated basis:
$$
B_T
=
\frac{-pB_r+B_\theta}{\sqrt{1+p^2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f628aa4c8decf73)
so the polar pitch flow and the Frenet obstruction are equivalent statements, not separate tests.

The circular obstruction yields a branch-chart test. A non-circular spiral can beat the isolated circular tangential obstruction only if the certified active roots satisfy a negative weighted tangential sum on enough of the controlled cycle:
$$
\sum_{\mathrm{part}}
|q_1q_2|\frac{W_p^{\mathrm{acc}}S_T^p}{\Lambda_p^3}
+
\sum_{\mathrm{self}}
q_1^2\frac{W_s^{\mathrm{acc}}S_T^s}{\Lambda_s^3}
<0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-16f86b0b9423db1e)
after the common positive factors are removed. Algebraic sign allowance is not enough; the delayed-root equations must actually admit those roots with positive transmitter-side floors, transmitter-side acceleration-weight intervals, and finite memory depth.

At a minimum-radius event $\theta_\ast$, the pitch condition gives $p(\theta_\ast)=0$. Therefore both tangential numerators reduce locally to
$$
S_T^p(\theta_\ast,\Delta)=S_T^s(\theta_\ast,\Delta)=\rho\sin\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4fb5e4955e01a138)
Principal roots with $0<\Delta<\pi$ still carry the same positive tangential sign as the circular benchmark. The only bare-kernel escape routes are therefore:

1. admissible older or wrapped roots with $\sin\Delta<0$ and enough transmitter-side acceleration weight;
2. off-turn variable-pitch intervals where the $p$-terms dominate the positive principal branches;
3. additional medium, Noether braid, or multi-body structure outside the isolated two-body spiral ansatz.

The radial turn condition is equally explicit. Since
$$
\ddot r=a_r+r\dot\theta^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a4967f8769e5eccb)
at a point with $\dot r=0$, a minimum-radius turn requires
$$
r_\ast\dot\theta_\ast^2
-
\sum_{\mathrm{part}}
\frac{\kappa |q_1q_2|\,W_p^{\mathrm{acc}}(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3}
+
\sum_{\mathrm{self}}
\frac{\kappa q_1^2\,W_s^{\mathrm{acc}}(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3}
>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dc4642a647ac1ef1)
This is a theorem target, not a closure proof. It supplies the concrete falsification gate: enumerate the admissible partner and self roots on a variable-pitch candidate, certify their transmitter-side floors and same-record transmitter-side acceleration-weight intervals, and test both the radial turn inequality and the weighted tangential sum. If all admissible roots keep the weighted tangential sum nonnegative on every candidate turn corridor, the bare isolated spiral does not beat the circular obstruction.

For a retained chart at a turn center, the radial record can be normalized by the common acceleration factor, but that normalization separates the branch sum from the independent acceleration ratio. In the equal-magnitude opposite-polarity case, one may write
$$
\Gamma_{\mathrm{rs}}\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
\qquad
B_r^{\mathrm{rec}}(\theta_\ast)
=
-\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{acc}}(1+\rho_p\cos\Delta_p)}{\Lambda_p^3}
+
\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{acc}}(1-\rho_s\cos\Delta_s)}{\Lambda_s^3}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4a62dd1d1f94411a)
so the normalized turn record is
$$
\Gamma_{\mathrm{rs}}+B_r^{\mathrm{rec}}(\theta_\ast)>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e81d09e5a25186a)
The subscript $\mathrm{rs}$ identifies this retained-spiral benchmark. The retained branch chart must emit same-record $D_t$, $D_r$, transmitter-side acceleration weights, and signed root-playback records before $B_r^{\mathrm{rec}}$ exists as acceleration evidence. It does not determine $\Gamma_{\mathrm{rs}}$ from $b_\ast=\Omega r_\ast/c_f$, from the delayed-root offsets, or from a branch-sum threshold. A branch certificate must therefore either supply an independently derived acceleration-ratio interval after the transmitter-side branch sum exists or report the radial result as blocked.

A fixed retained-chart benchmark illustrates this burden without supplying canonical dynamics. Let $a_{\mathrm{rs}}=0.204$ be the prescribed pitch amplitude, $b_\ast=7/2$ the prescribed turn-center speed ratio, and $C_{\mathrm{rs}}$ the complete fixed record consisting of those inputs, the interval $I_\ast=[-\pi/6,\pi/6]$, three retained partner-root tubes $P_1,P_2,P_3$, one retained self-root tube $S_1$, and the associated inactive-gap and finite-memory data. The labels $P_k$ and $S_1$ identify those root tubes only; they are not particle or persistent-braid indices. Every equation below that consumes $C_{\mathrm{rs}}$, $a_{\mathrm{rs}}$, or $b_\ast$ is a diagnostic for this prescribed benchmark, not a derived Master EOM result. Promotion requires same-record $c_f/|D_t|$ acceleration-weight intervals and $D_r/D_t$ playback intervals on all four tubes.

If the same turn-center radial curve is allowed a variable angular rate, with $\omega_\ast=\dot\theta(0)>0$ and $\alpha_\ast=\ddot\theta(0)$, then $r'(0)=0$ and the local kinematic targets become
$$
B_r^{\mathrm{rec}}(C_{\mathrm{rs}};0)=(a_{\mathrm{rs}}-1)\Gamma_\ast,
\qquad
B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)=\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f0498f4190026df9)
where $\Gamma_\ast=r_\ast^3\omega_\ast^2/(\kappa q_1^2)$. This supplies only a local angular-deceleration target for a variable-angular-rate continuation. It does not by itself close such a continuation, because the delayed roots and transmitter-side acceleration weights must be recomputed for the nonconstant time law.

The stronger invariant form of the target is the angular slope of the time law,
$$
\left.
\frac{d}{d\theta}\log\dot\theta
\right|_{\theta=0}
=
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)}{\Gamma_\ast}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-988261ee2d2261a5)
However, the delayed roots are controlled by a finite-memory integral, not by this local slope alone. If
$$
H(\Delta)
=
\omega_\ast
\int_{-\Delta}^{0}
\frac{d\phi}{\dot\theta(\phi)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-464243499eb81a52)
then the turn-center root equation is $\Lambda_{P/S}(0,\Delta)=H(\Delta)/b_\ast$. Retaining a constant-rate root at the same offset would require $H(\Delta_\alpha)=\Delta_\alpha$, or
$$
\int_{-\Delta_\alpha}^{0}
\left(
\frac{\omega_\ast}{\dot\theta(\phi)}-1
\right)d\phi=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8e855eed3479e35a)
Thus the variable-rate retained-spiral continuation is a finite-memory time-law problem: the local angular-deceleration target must be reconciled with inverse-rate averages over the delayed branch intervals and with the same-box transmitter-side acceleration contributions. Simple one-parameter extensions of the local slope are not evidence unless they preserve the retained roots and recompute $W^{\mathrm{acc}}=c_f/|D_t|$ on the resulting branch record.

This finite-memory condition is nevertheless not an algebraic no-go at the turn center. In past-lag coordinates $x=-\phi$, define
$$
q(x)=\frac{\omega_\ast}{\dot\theta(-x)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b00973eeb1571d03)
A retained-root profile must satisfy both moment and endpoint constraints,
$$
\int_0^{\Delta_\alpha}\bigl(q(x)-1\bigr)\,dx=0,
\qquad
q(\Delta_\alpha)=1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c566a3d2eedd9d35)
for each retained-spiral delay. Because the local target gives $q'(0)=B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)/\Gamma_\ast<0$, the inverse-rate profile dips below $1$ just behind the turn and must compensate by rising above $1$ before the first retained delay. A positive retained-root inverse-rate profile can satisfy these constraints, keep the active transmitter-speed factors at their constant-rate values at the retained offsets, and make the same branch sums give the required local angular-rate slope.

The first off-center transport record is also fixed at the turn center. If $q_\theta(u)=\dot\theta(\theta)/\dot\theta(\theta-u)$ and $H(\theta,\Delta)=\int_0^\Delta q_\theta(u)\,du$, then the retained endpoint constraints imply
$$
\left.\partial_\theta H(\theta,\Delta_\alpha)\right|_{\theta=0}
=
k_\ast\Delta_\alpha,
\qquad
k_\ast=\frac{B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)}{\Gamma_\ast}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ef5c2e83cc82ea19)
Since $b'(\theta)/b(\theta)=k_\ast$ at the turn center, the first $\theta$-derivative of $H/b$ cancels at the retained endpoints. Thus the retained-memory witness inherits the constant-chart first-order root-transport identity at $\theta=0$. This is still only a branch-chart existence target, not an orbit certificate: the active roots, inactive gaps, transmitter-speed Jacobians, finite-memory depth, generalized root-transport residuals, and acceleration-balance records still have to be recomputed on a finite $\theta$ interval for the chosen nonconstant time law.

The finite-collar target can be stated without adding a new law. Let
$$
Q(\theta)=\frac{\omega_\ast}{\dot\theta(\theta)},
\qquad
\sigma(\theta)=\frac{r(\theta)}{r_\ast},
\qquad
K_Q(\theta,\Delta)=\int_{\theta-\Delta}^{\theta}Q(\phi)\,d\phi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f5947a51ac67a630)
Then the transported retained-root equation is
$$
F_{\alpha,Q}(\theta,\Delta)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{K_Q(\theta,\Delta)}{b_\ast\sigma(\theta)}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ef987fae310066ce)
At each retained endpoint, $K_Q(0,\Delta_\alpha)=\Delta_\alpha$ and $\partial_\theta K_Q(0,\Delta_\alpha)=0$, so the first memory drift begins at second order in $\theta$. The branch-chart certificate must bound that drift while satisfying the tangential transport equation for $Q$ and the radial residual on the same active root ledger.

A local convergence diagnostic can sharpen this finite-collar target, but it does not by itself fix the full continuation class. After the tangential record is imposed on the retained ledger, the transported radial record should be tested through the leading one-sided jet of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near $\theta=0$. For a specified tangential-transport profile, the jet coefficient is
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bfda6cac91258e09)
The retained endpoint and moment constraints do not yet fix all transmitter-side endpoint-slope data entering $B'_+(0)$. A nonzero sampled coefficient is therefore a local obstruction candidate for that profile, not a theorem that every positive $C^2$ variable-rate continuation fails.

A sampled endpoint-slope construction sharpens the same caution. By perturbing the retained past inverse-rate profile while preserving the retained endpoint values, moment records, compact $C^2$ tail, and center slope, one can cancel the leading affine radial jet at sampled level and still keep a positive retained past profile with the expected $3+1$ active-root ledger after tangential transport. This does not certify retained-spiral closure. It moves the theorem-grade burden to finite-collar control after endpoint-slope cancellation: positivity, inactive gaps, Jacobian floors, transmitter-side acceleration weights, finite memory, tangential transport, and the full radial residual must all be bounded on the same branch chart. Provenance note: this sampled construction and the adjacent prescribed benchmark record currently name no instrument or archived computation artifact; until one is linked, both carry construction-note grade, not measured grade, and they license no dynamical inference.

---

#### Effective Continuum Limits

Another class of analytic work appears only after coarse-graining the microscopic DDE:

##### Homogeneous, isotropic Noether Sea

Assume:

- Very large number of architrinos,
- Statistically homogeneous and isotropic distribution,
- Global neutrality.

Then, at coarse‑grained level:

- Conditional on a declared convergent summation prescription for the infinite-transmitter wake sum (the convergence burden stated under Superposition above), symmetry dictates the net acceleration on a test architrino at rest is zero.
- Small perturbations can be analyzed by linearizing around the homogeneous background.

The targets are to:

- derive an effective wave equation for small perturbations in density or potential diagnostics,
- show that disturbances propagate at an emergent channel speed tied to $c_f$ and medium response,
- recover Maxwell-like or acoustic-like behavior as effective continuum behavior.

These are field-theory-style analytic solutions (plane waves, Green's functions) of the **coarse-grained** equations, not of the micro DDEs. They are useful only when the continuum variables are explicitly derived from the master equation by a declared coarse-graining limit.

This regime is analytically tractable and important for:

- Emergent electromagnetism,
- Emergent metric propagation (gravitational‑wave analogues),
- Stability of the Noether sea itself.

---

#### Analytic footholds and remaining targets

Several analytic checks provide footholds for the remaining closure targets. Root-existence, inactive-gap, and transmitter-side transversality records remain usable as topology inputs; radial/tangential acceleration balance, action, power, and finite-window conservation records must be recomputed with $W_{ij}^{\mathrm{acc}}$ before they can be promoted.

1. **Partner-only circular orbit with causal delay ($v<c_f$)** has explicit radial and tangential components, including the positive tangential-drive obstruction for a bare constant-speed circle.
2. **Uniform circular self-hit ($v>c_f$)** has principal-root onset asymptotics, signed higher-winding branch birth, branchwise radial/tangential projections, transmitter-side diagnostic large-$\beta_f$ estimates, and a same-record acceleration-recomputation target for promoted sums.
3. **Variable-pitch spiral retained-chart benchmarks** expose both branch-chart records and prescribed-history compatibility records. The fixed retained-spiral constant-$\Omega$ history has active-root, inactive-gap, transmitter-side Jacobian-floor, finite-memory, and root-transport records, but its acceleration-balance and outward-constant records require transmitter-side acceleration-weight intervals on the same branch cells before they can act as closure evidence. The retained spiral is therefore a prescribed-history diagnostic, not an acceleration-balance no-go, until the retained chart is recomputed with $W_{ij}^{\mathrm{acc}}$.

The remaining analytic targets are sharper:

1. build the maximum-curvature branch certificate from active roots, inactive gaps, transmitter-side Jacobian floors, transmitter-side acceleration-weight intervals, finite memory, root transport, returned-section residuals, radial/tangential balance, and the independent acceleration-ratio record;
2. coarse-grain the master equation around a homogeneous Noether sea and extract the linear response and dispersion relation $\omega(k)$;
3. prove which regularized energy diagnostic is actually induced by a symmetry-preserving action-level regularization.

These targets keep the bridge between the formal law and the broader closure program mathematical: a branch chart, a conserved charge, or a response equation must be supplied before a stability or mass claim is promoted.

---

#### Analytic Summary

- **General N‑body analytic solution:** No; the structure is too complex (DDE with state‑dependent delays and self‑hit multiplicity).
- **Idealized / symmetric cases:** Yes, in several important classes:
  - 1D radial two‑body,
  - sub‑$c_f$ circular orbit,
  - uniform circular self‑hit,
  - algebraic maximum‑curvature conditions,
  - continuum/wave limits of the Noether sea.

---

### Energy, Symmetry, and Conservation

#### Energy, Lagrangian, and Hamiltonian Structure of the Architrino Dynamics

In this section we outline how **energy** and **variational structure** are handled in $\mathbb{A}\mathbb{A}\mathbb{A}$, given the Master Equation of Motion:

$$
\frac{d^2 \mathbf X_i}{dT_r^2} =
\sum_{j} \sum_{T_t \in \mathcal{C}_{ij}(T_r)}
\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2(T_r;T_t)}W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0621e106fd2aab22)

where each contribution comes from a **causal wake intersection** at reception time $T_r$ between receiver $i$ and a wake emitted by transmitter $j$ at emission time $T_t$. The set $\mathcal{C}_{ij}(T_r)$ encodes all such emission times selected by the causal constraint

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f (T_r-T_t),\quad T_t<T_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6eea64077b62a67b)

Once any internal binary reaches the $v>c_f$ regime at some stage in its curved history, **self‑hit** becomes a live branch candidate and must be checked explicitly in realistic energy accounting. Completed assemblies cannot be assigned a “no self-hit” energy record merely from current sub-field-speed motion; the retained path history must show that same-transmitter roots are absent or inactive with a certified branch gap.

We organize the discussion into four pieces:

1. Aggregate kinetic energy for a finite, isolated set of architrinos,
2. An action-level nonlocal Noether energy charge compatible with path‑history dynamics,
3. A nonlocal Lagrangian scaffold whose variations reproduce the Master Equation only when the constraint residual closes,
4. A corresponding Hamiltonian / total energy functional, with energy exchange only at $T=\text{now}$ between architrinos.

---

##### Aggregate Kinetic Energy

We work with **absolute time** $T$ and Euclidean 3‑space. For each architrino $i$, define:

- Position $\mathbf X_i(T)$,
- Velocity $\mathbf V_i(T) = d\mathbf X_i/dT$,
- Optional universal bookkeeping constant $\mu_{\text{arch}}$ when a quadratic kinetic proxy is desired.

We do **not** a priori assign energy to any continuous field; energy is carried by architrinos and their assemblies and is updated only at the instants where wake surfaces intersect receivers.

**Definition (Quadratic kinetic bookkeeping proxy).** For a finite isolated set of architrinos $\{i=1,\dots,N\}$,

$$
K_{\mu}(T) \equiv \sum_{i=1}^N \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f73f92c13a69d1c8)

Remarks:

- This is a bookkeeping choice for analysis, numerics, and Noether-style energy accounting. The substrate law itself remains acceleration-first.
- Because $\mu_{\text{arch}}$ is universal, it can be absorbed into units or into an overall normalization of force-like quantities if desired.
- For assemblies (binaries, Noether braids), one defines an effective assembly mass $M_\text{assembly}$ as
  $$
  M_\text{assembly} = \frac{1}{V_\text{CM}} \frac{d}{dV_\text{CM}} \left(\text{total kinetic + interaction energy of internal motion}\right)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d5bdca4a9a935f44)
  where $V_\text{CM}$ is the center‑of‑mass speed. In practice, this is computed from the internal architrino motions (e.g., the tight indexed-binary self-hit orbit plus its interaction with partner binaries).

Thus kinetic energy splits naturally into:

- **Internal kinetic energy** of bound assemblies (setting rest mass),
- **Center‑of‑mass kinetic energy** of assemblies relative to the Noether sea.

---

##### Action-Level Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of a symmetry-preserving nonlocal action model supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the action-derived delayed model, not to every regularized implementation of the Master Equation.

For the dual-mollified local 1D collinear model, the same conservation language should be read more carefully: the causal-surface mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

###### Energy exchange per causal hit

Consider a single contribution to the acceleration of receiver $i$ at reception time $T_r$ from a causal hit emitted by transmitter $j$ at time $T_t\in\mathcal{C}_{ij}(T_r)$. The acceleration contribution is:

$$
\mathbf A_{ij}(T_r;T_t)
= \kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9017a0da7576866e)

The instantaneous power delivered to architrino $i$ by this hit is:

$$
P_{ij}(T_r;T_t)
= \mu_{\text{arch}}\,\mathbf A_{ij}\cdot \mathbf V_i
= \mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)\, V_{r,ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7b9d7e7ccfa78f68)

where $V_{r,ij} = \mathbf V_i(T_r)\cdot \hat{\mathbf{r}}_{ij}$ is the radial component of the receiver’s velocity along the line of action. This is the **only instant** when the interaction can change the kinetic energy of $i$. Between hits, $\mathbf A_{ij}$ from this specific emission is zero.

Summing over all contributing transmitters and all causal emission times at a given $T_r$,

$$
\frac{dK_{\mu}}{dT_r}(T_r)
= \sum_i \sum_j \sum_{T_t \in \mathcal{C}_{ij}(T_r)} P_{ij}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2c1a52de384aa249)

with the understanding that for self‑hit we include $j=i$ as well.

###### Action-Level Wake-Energy Functional at a Time Boundary

Let $\mathcal{K}_{ij}(T_1,T_t)$ denote the causal-delay interaction kernel appearing in the nonlocal action scaffold below:

$$
\mathcal{K}_{ij}(T_1,T_t)
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|\,
\Theta(T_1-T_t)\,
\frac{\delta\!\big(\tilde g_{ij}(T_1,T_t)\big)}{r_{ij}(T_1,T_t)},
\qquad
\tilde g_{ij}(T_1,T_t)=T_1-T_t-\frac{r_{ij}(T_1,T_t)}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0dadf64cd91414f7)

The tilde marks this as the time-normalized action constraint. The length-valued Master Equation constraint remains $g_{ij}=r_{ij}-c_f(T_r-T_t)$. Because $[\delta(\tilde g)]=T^{-1}$, the prefactor $\mu_{\text{arch}}\kappa$ gives this kernel the required energy-per-time dimension. A $\kappa/c_f$ prefactor would not.

For an isolated system, the nonlocal Noether charge associated with $T\mapsto T+T_{\mathrm{shift}}$ is

$$
E_{\text{tot}}(T)=K_{\mu}(T)+E_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d00bde3ebf3177a)

with

$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-60df624ac580a2e5)

The outer minus sign follows the convention that the interaction enters the action as $-\tfrac12\sum S_{ij}$. It also makes the sharp static like-polarity interaction charge positive, as required by the work integral.

Plainly: one action convention now fixes the interaction units, the static sign, and the boundary charge together.

For $i=j$, the same rule applies with the trivial coincidence branch ($T_1=T_t$) excluded, matching the self-hit convention used throughout this chapter.

Interpretation: the double integral measures interaction links that cross the absolute-time boundary $T$ (past emission side $T_t\le T$ and future reception side $T_1\ge T$). This is the exact “in-flight” interaction contribution in the nonlocal theory.

For exact solutions of the causal action, nonlocal Noether’s theorem gives

$$
\frac{d}{dT}\Big(K_{\mu}(T)+E_{\text{wake}}(T)\Big)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d18167db9d725e17)

No separate spatial field-energy ontology is required; conservation is encoded directly in worldline geometry and the causal kernel.

For proof and simulation, the same statement can be written as a residual balance. Let
$$
\mathbf{R}_i^{(\eta)}(T)
=
\mu_{\text{arch}}\mathbf A_i(T)
-
\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4452811dbf16959b)
be the Euler-Lagrange residual of the symmetry-preserving regularized action, where $\mathbf{F}_{i,\mathrm{act}}^{(\eta)}$ includes the scale term and any nonzero constraint-variation residual from the action. Let $\mathcal{B}_{E}^{(\eta)}(T)$ collect energy flux through finite history-window endpoints, period cuts, and excluded self-coincidence boundaries. Then the action-level energy balance is
$$
\frac{d}{dT}
\left(
K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T)
\right)
=
\sum_i\mathbf V_i(T)\cdot\mathbf{R}_i^{(\eta)}(T)
+
\mathcal{B}_{E}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5504bf1156900600)
For isolated compactly supported or period-matched histories, $\mathbf{R}_i^{(\eta)}=\mathbf{0}$ and $\mathcal{B}_{E}^{(\eta)}=0$ give the exact conserved charge. A nonzero residual identifies a real failure mode: branch-chart loss, nonsymmetric regularization, leakage through the finite memory window, or an unaccounted derivative-of-delta counterterm.

###### Equivalent work-integral form

For direct trajectory evaluation, one may reconstruct a compatible interaction contribution through the accumulated power exchange along the realized trajectory:

$$
U(T)=U_\ast-\int_{T_\ast}^{T}\sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot\mathbf V_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-57c967684d4bb221)

This work-integral form is a practical trajectory-level reconstruction when the same action-derived acceleration law and boundary convention are used. It should not be treated as an independent off-shell Noether functional; outside the symmetry-preserving action model it is a diagnostic bookkeeping quantity rather than a proved conserved charge.

In short-delay effective limits, $E_{\text{wake}}$ reduces to an approximate instantaneous pair form

$$
E_{\text{wake}}(T)\approx\sum_{i<j}U_{ij}\big(\mathbf X_i(T),\mathbf X_j(T)\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-81b824130cd58e2d)

with leading $1/r_{ij}$ behavior plus geometry-dependent self-hit corrections.

---

##### Exact Nonlocal Lagrangian

**Transmitter-side action target.** A scalar-action scaffold is closure-relevant only if its variation produces the transmitter-side target $W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}/r_{ij}^2$ on the retained branch chart with $W_{ij}^{\mathrm{acc}}=c_f/|D_{t,ij}|$. The signed playback factor $D_r/D_t$ is retained for root continuation but is not multiplied into the acceleration or action target.

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

###### Exact causal-delay Fokker-type interaction term

For the focused scalar causal-locus statistic (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions). That chapter's scalar action-counting functional is not an acceleration/action record unless it is rebuilt with $W_{ij}^{\mathrm{acc}}/r^2$. It is not automatically identical to the exact Fokker-type variational action below, whose $1/r$ causal kernel must be tested against the transmitter-side branch law after variation.

Let the worldline of architrino $i$ be $\mathbf X_i(T)$. For the action-scaffold discussion, the same universal bookkeeping constant may be inserted in the quadratic kinetic term:
$$
S[\{\mathbf X_i\}]
=
\sum_i \int dT\, \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2
\;-\;
\frac{1}{2}\sum_{i\neq j} S_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b30e84035612b9cc)

with interaction contributions

$$
S_{ij}
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
\int dT \int dT'\,
\Theta(T-T')\,
\frac{\delta\!\big(\tilde g_{ij}(T,T')\big)}{r_{ij}(T,T')}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-435966228b999426)

where

$$
\tilde g_{ij}(T,T') \equiv T-T' - \frac{r_{ij}(T,T')}{c_f},
\qquad
r_{ij}(T,T') = \|\mathbf X_i(T) - \mathbf X_j(T')\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f8c1a92690e78153)

Key points:

- $\Theta(T-T')$ enforces the purely past-causal branch ($T' \le T$).
- $\delta(\tilde g_{ij})$ restricts support to the characteristic causal surface $r_{ij}=c_f(T-T')$.
- The sharp action scaffold contains no fundamental mollifier: $\eta$ is a regularization parameter used to test branch limits.

At a receiver event $T=T_r$, integrating out the delta via the delay-map Jacobian gives the branch-resolved form:

$$
\delta\!\big(\tilde g_{ij}(T_r,T')\big)
=
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\frac{\delta(T'-T_t)}
{\left|\partial_{T'} \tilde g_{ij}(T_r,T_t)\right|},
\qquad
\partial_{T'} \tilde g_{ij}
= -1 + \frac{\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot \mathbf V_j(T_t)}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-19dec4b883fdd690)

Hence

$$
S_{ij}
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
\int dT_r\,
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\frac{1}
{r_{ij}(T_r;T_t)\,\left|1-\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot\mathbf V_j(T_t)/c_f\right|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9c4613d6732d44bc)

This branch-resolved form is written per reception time after the transmitter-time delta has been integrated out. On a retained smooth root $T_t=T_{t,\ell}(T_r)$, the causal constraint also gives
$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_i(T_r)}
{c_f-\hat{\mathbf{r}}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b732278055678125)
This derivative is required for root continuation and change-of-reception-time calculations. It does not create a second acceleration weight. An action, wake-history state, or conservation account that uses $D_r$ as an instantaneous strength must therefore be recomputed. Records may retain $D_r/D_t$ as playback evidence while using $c_f/|D_t|$ for acceleration.

###### Variation and line-of-action acceleration law

This subsection is the bridge from the causal-hit rule to an action-style account. The physical rule has already said what a receiver feels: delayed line-of-action hits with transmitter-side acceleration weight. The variation below asks whether the same rule can be obtained from one regularized action ledger, so that acceleration, power, and conservation bookkeeping come from the same functional rather than from separate matching rules.

The branch law targeted by the action-level variation is:

$$
\frac{d}{dT_r}\left(\mu_{\text{arch}}\mathbf V_i(T_r)\right)
= \sum_j \mathbf{F}_{ij}(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9f367793f632319d)

and the branch-resolved acceleration is

$$
\mathbf{F}_{ij}(T_r)
=
\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_i q_j|
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}(T_r;T_t)}
{r_{ij}^2(T_r;T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-117bd06c7fd26525)

The inverse-square factor follows in the theorem sketch from the variation of the scale-invariant kernel. On a simple-root chart, the interaction density is
$$
\frac{1}{r_{ij}}\delta(\tilde g_{ij}),
\qquad
\tilde g_{ij}=T-T'-\frac{r_{ij}}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b27699733d185de)
Varying the receiver position gives
$$
\delta r_{ij}
=
\hat{\mathbf r}_{ij}\cdot \delta\mathbf X_i,
\qquad
\delta\!\left(\frac{1}{r_{ij}}\right)
=
-\frac{\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_i}{r_{ij}^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-33ef3e908420c696)
The variation of
$$
\delta(\tilde g_{ij})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bccd888e51f32192)
is the remaining distributional part of the receiver-coordinate calculation. After integration by parts on the root-selected chart and its declared boundary terms are accounted for, the target branch-resolved term is proportional to
$$
\frac{W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}}{r_{ij}^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8f15a71d51f06f07)
This $1/r^2$ scaling is not an added ansatz in the accepted proof route: it is the pull-back expected from a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel. The full proof now also requires deriving the transmitter-side acceleration weight and controlling the derivative-of-delta term under the same symmetry-preserving regularization.

The derivative-of-delta term has a useful exact reduction on any transversal branch. Since
$$
\partial_{T'}\tilde g_{ij}(T,T')
=
-J_{ij}(T;T')
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fed3a1a9df8db3ab)
one has
$$
\delta_\eta'(\tilde g_{ij})
=
-
\frac{1}{J_{ij}}
\partial_{T'}\delta_\eta(\tilde g_{ij})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c24e108d6723d7e)
Thus the root-constraint variation can be integrated by parts in the transmitter time $T'$:
$$
\int dT'\,
\Theta(T-T')
\frac{\delta_\eta'(\tilde g_{ij})}{c_f r_{ij}}
\hat{\mathbf r}_{ij}
=
\mathcal{B}_{ij}^{(\eta)}(T)
+
\int dT'\,
\delta_\eta(\tilde g_{ij})
\partial_{T'}
\left[
\Theta(T-T')
\frac{\hat{\mathbf r}_{ij}}{c_f r_{ij}J_{ij}}
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d8f6b59162992504)
The first term is an endpoint or excluded-coincidence contribution; the second is the root-chart interior derivative that must be accounted for before the pure scalar kernel can be claimed to derive any branch-resolved acceleration law. Therefore the action proof does not license dropping $\delta_\eta'(\tilde g_{ij})$ by fiat. It requires the symmetry-preserving regularization to make this interior derivative vanish, become a boundary/transmitter-side contribution under the allowed variations, or be cancelled by an explicit counterterm. In the canonical Master EOM the branch-resolved target is $W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}/r_{ij}^2$, so this residual must be rebuilt inside the receiver-side proof rather than reused as closure evidence.

In the sharp positive-delay transmitter-time-collapse limit,
$$
\int dT'\,
\delta_\eta(\tilde g_{ij})
\partial_{T'}
\left[
\Theta(T-T')
\frac{\hat{\mathbf r}_{ij}}{c_f r_{ij}J_{ij}}
\right]
\longrightarrow
\frac{1}{|J_{ij}(T_r;T_t)|}
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}{c_f r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_t}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d9279e12f2c4bb6)
Thus the scalar $1/r$ causal kernel produces the inverse-square scale term as a receiver-side proof ingredient only if the admitted branch also satisfies the residual-vanishing condition
$$
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}{r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_t}
=
\mathbf{0}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ce436b797741bc7b)
or if the action is supplemented by an explicit regularized counterterm whose receiver Euler derivative cancels this residual interior vector. Such a counterterm must come from an invariant action-level mechanism, not from fitting the already accepted acceleration law. Under the transmitter-side law this is not a completed derivation; it is a warning that the pure scalar $1/r$ Fokker-type action is only a partial variational scaffold until the $W_{ij}^{\mathrm{acc}}$ target is derived.

Equivalently, define the direct scale term
$$
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(T)
=
\int_{-\infty}^{T}dT'\,
\frac{\hat{\mathbf r}_{ij}(T,T')}{r_{ij}^2(T,T')}\,
\delta_\eta(\tilde g_{ij}(T,T'))
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-14a237bb05dafa2f)
and the constraint residual
$$
\mathbf{C}_{ij}^{(\eta)}(T)
=
\mathbf{C}_{ij,r}^{(\eta)}(T)
+
\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-25b443fd8296d4f9)
where $\mathbf{C}_{ij,r}^{(\eta)}$ is the receiver-side interior derivative displayed above and $\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}$ is its declared boundary contribution. On a regularized chart the receiver-coordinate action diagnostic has the form
$$
\mu_{\text{arch}}\mathbf A_i(T)
=
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\left(
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(T)
+
\mathbf{C}_{ij}^{(\eta)}(T)
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-276afc963dbc08d9)
The canonical branch law is recovered on a tested window $W$ in the weak simple-root limit only if
$$
\lim_{\eta\to0^+}
\int_W
\left\|
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf{C}_{ij}^{(\eta)}(T)
\right\|dT
=
0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-414c7089deb84134)
with the same branch floors and boundary convention used to define the action. This windowed residual condition is the minimal proof obligation for upgrading the variational scaffold to an exact action derivation of the Master EOM.

**Decision (pure scalar action).** The pure scalar $1/r$ Fokker-type scaffold remains unpromoted because its receiver-coordinate variation leaves the local derivative-of-delta residual above.

Equivalently, on an admissible branch with $r_{ij}>0$ and $|J_{ij}|>J_{\min}>0$,
$$
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}
{r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_t}
\ne
\mathbf{0}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c1b3cd3b6a70c21)
is a certificate that the pure scalar scaffold leaves a nonzero receiver-acceleration residual on that branch. This falsifies the universal claim "the scalar $1/r$ action by itself is the exact action for the Master EOM." It does not falsify the transmitter-side Master Equation or the possibility of a later causal wake-state action. It means the action proof must close the residual, retained-history update, and conserved accounts without reintroducing receiver velocity into the arriving acceleration.

**No-go scaffold (same-support local scalar counterterm).** The clean local scalar counterterm route is closed under the following restricted assumptions: the added term has the same causal-surface support as the $1/r$ kernel, uses only $\tilde g_{ij}$, $r_{ij}$, and $J_{ij}$ on the existing branch chart, introduces no new variables, adds no off-surface support, and is not fitted after the acceleration law is already known. Suppressing the common coupling and sign factors, the allowed branch-pair form is
$$
S_{\mathrm{ct},ij}^{(\eta)}
=
\int dT\,dT'\,
\Theta(T-T')\,
a(r_{ij},J_{ij})\,\delta_\eta(\tilde g_{ij})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e0e658a8d1699088)
For receiver variation,
$$
\delta r_{ij}
=
\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_i,
\qquad
\delta \tilde g_{ij}
=
-\frac{1}{c_f}\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d2f3846e22a3675c)
Before any optional $J_{ij}$-variation is included, the radial part of the counterterm variation contains
$$
\delta_{\mathbf X_i}S_{\mathrm{ct},ij}^{(\eta)}
\supset
\left[
\partial_{r_{ij}}a\,\delta_\eta(\tilde g_{ij})
-
\frac{a}{c_f}\delta_\eta'(\tilde g_{ij})
\right]
\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5d01ce803adcf4f0)
The optional $J_{ij}$-dependence can add transverse and transmitter-velocity terms, but it does not remove the scalar radial coefficient that must cancel the original derivative-of-delta residual. Cancelling that coefficient for all admitted receiver variations requires
$$
a(r_{ij},J_{ij})
=
-\frac{1}{r_{ij}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d7c49dd7c2a624a8)
This choice necessarily adds
$$
\partial_{r_{ij}}a\,\delta_\eta(\tilde g_{ij})
=
\frac{\delta_\eta(\tilde g_{ij})}{r_{ij}^{2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f1daf17135613a3f)
which changes the accepted inverse-square scale term. Any further same-support scalar correction that removes this scale change reintroduces a derivative-of-delta coefficient. A $\tilde g_{ij}$-antiderivative of $\delta_\eta(\tilde g_{ij})$ would move support away from the causal wake surface and is outside the assumptions. Therefore no same-support local scalar counterterm built only from $\tilde g_{ij}$, $r_{ij}$, and $J_{ij}$ is admissible under this restricted route.

The obstruction also survives a finite local delta-jet extension. Let
$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\sum_{n=0}^{N}a_n(r)\delta_\eta^{(n)}(g),
\qquad
D_{ij}
\equiv
\partial_r-\frac{1}{c_f}\partial_g
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-773c385331edc063)
The direct kernel $K_0^{(\eta)}=\delta_\eta(g)/r$ has
$$
D_{ij}K_0^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2}
-\frac{\delta_\eta'(g)}{c_f r}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-68406e61d45abeaf)
Cancelling only the derivative-of-constraint residual would require
$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_f r}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ec01240ded674123)
without adding another $\delta_\eta(g)/r^2$ scale term. For $N\ge1$, the highest derivative coefficient is $-a_N(r)\delta_\eta^{(N+1)}(g)/c_f$, so $a_N=0$; descending through the jet order forces $a_n=0$ for every $n\ge1$. The remaining $N=0$ case requires $a_0(r)=-1/r$, but then $\partial_r a_0=1/r^2$, so the counterterm again changes the inverse-square scale term it was supposed to preserve.

The conclusion is narrow but decisive for local repairs: no finite same-support local scalar or delta-jet counterterm cancels the scalar-kernel residual while leaving the canonical branch strength intact. A receiver-gradient construction that preserves the inverse-square term must leave the finite same-support delta-jet class, for example by integrating along the $(r,g)$ characteristic. An exact action requires a separate complete derivation.

The terminal common-center inter-layer chart gives a concrete obstruction to the remaining per-branch stationarity route. In that specialization, stationarity of $\hat{\mathbf r}/(rJ)$ forces the transmitter tangent to be parallel to the transmitter-receiver separation. The scalar part then reduces to $\rho_\delta(1-\rho_\delta)=0$, where $\rho_\delta$ denotes the branch value of $\partial_\delta\rho_b$: the first factor collapses a positive-delay branch when the transmitter speed is nonzero, and the second factor is $J=0$, a grazing branch excluded by the Jacobian floor. Thus terminal inter-layer charts should not expect the scalar scaffold to close by per-branch stationarity. The remaining local target is branch-summed residual closure for a scalar scaffold or a different action candidate derived from Architrino primitives.

For the transmitter-side branch target, the branch-summed residual target is the vanishing of the signed receiver-side interior Euler derivative after the direct inverse-square term is removed:
$$
\sum_{b:\,o_b=i}
\kappa\,
\operatorname{sign}(q_{j_b}q_i)
\left|q_{j_b}q_i\right|
\mathbf{C}_{b}^{(0)}(T)
=
\mathbf{0}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-865333152053c61a)
with the same positive-delay, Jacobian-floor, and boundary convention used by the branch chart. This is not the Master EOM acceleration residual and not the Noether conservation ledger. It is the additional condition needed for the scalar action scaffold to have no leftover interior Euler derivative on that receiver. If the signed sum is nonzero, the scalar action candidate fails on that chart; the residual does not become a new acceleration term.

**Characteristic-tail receiver-gradient identity.** The receiver-coordinate counterterm equation can be integrated along the characteristic operator
$$
D_{ij}
\equiv
\partial_r-\frac{1}{c_f}\partial_g,
\qquad
u
\equiv
g+\frac{r}{c_f},
\qquad
D_{ij}u=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c7253662ea006f9f)
For a compactly supported regularizer and a declared depth $h_+>0$ with $\delta_\eta(-h_+)=0$, define
$$
K_{\mathrm{eff},h_+}^{(\eta)}(r,g)
=
\int_{-h_+}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4985c07c2c46c679)
The infinite-depth form replaces the lower limit by $-\infty$ when the integral converges. Because $D_{ij}$ preserves $u$ and moves the upper limit at rate $-1/c_f$,
$$
D_{ij}K_{\mathrm{eff},h_+}^{(\eta)}
=
-
\frac{\delta_\eta(g)}
{c_f^2(u-g)^2}
=
-
\frac{\delta_\eta(g)}{r^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-78d8ceb7e0c482a1)
This is the useful characteristic-tail result: a controlled history integral has exactly the desired inverse-square receiver gradient without the derivative-of-constraint term of the direct $1/r$ kernel.

The identity is a receiver-coordinate construction. It does not by itself define an action principle, an independently evolving causal-wake state, a Noether boundary charge, or a modification of the Master EOM. Any action or conservation construction must be derived separately from Architrino primitives and must reproduce the same retained motion and boundary records.

Thus:

- The scalar $1/r$ action above is a nonlocal variational scaffold for the delayed dynamics under the stated branch and regularization assumptions,
- An exact action derivation requires the complete variation, endpoint convention, and symmetry charges to reproduce the same Master EOM and retained boundary records,
- A finite same-support local scalar or delta-jet counterterm has been ruled out because it cancels the derivative residual only by disturbing the inverse-square scale term,
- The characteristic-tail integral above is retained as an exact receiver-gradient identity, not as an accepted action or conservation kernel,
- Without such closure, the pure scalar action is falsified as the universal exact action for the Master EOM and should be treated as a diagnostic scaffold,
- Any $\delta_\eta$ replacement must preserve the symmetries that supply the Noether charges if conservation claims are to remain exact.

---

##### Trajectory Work Reconstruction and Total-Energy Target

Given the kinetic energy definition, the next object separates a realized-trajectory identity from a genuine Noether charge.

###### General structure

Along any realized trajectory, define the diagnostic reconstruction

$$
H_U[\{\mathbf X_i(\cdot)\},\{\mathbf V_i(\cdot)\}; T]
\equiv
K_{\mu}(T) + U(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-74e0837897bee063)

with $U(T)$ reconstructed along the realized trajectory by:

$$
U(T) = U_\ast - \int_{T_\ast}^{T} \sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot \mathbf V_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-023f35ee976ad5b6)

where $U_\ast$ is a fixed reference and $\mathbf A_i$ is the actual acceleration given by the Master Equation (including self‑hit and partner contributions). Then:

$$
\frac{dH_U}{dT} = \frac{dK_{\mu}}{dT} + \frac{dU}{dT}
= \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
- \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
= 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0ec95eb1076a0a18)

This constancy is true by construction and is not independent conservation evidence. The reconstruction is not a local function only of $(\mathbf X_i(T),\mathbf P_i(T))$, but neither does it become an off-shell Noether charge merely by retaining history.

The theorem-grade total-energy target is instead
$$
E_{\text{tot}}(T)=K_\mu(T)+E_{\text{wake}}(T),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d7349125df7d1009)
where $E_{\text{wake}}$ must arise as the boundary charge of the same symmetry-preserving delayed action whose interior variation reproduces the Master EOM. Only that derivation, together with closed boundary flux, promotes conservation beyond the trajectory identity $dH_U/dT=0$.

###### Local canonical form in effective limits

In regimes where:

- Internal binaries are in tight, quasi‑stationary maximum‑curvature orbits (giving approximately fixed internal energies),
- Wake travel times across the system are short compared to dynamical timescales of the center‑of‑mass motion of assemblies,
- Self‑hit contributions primarily renormalize the internal energies (rest masses),

we can introduce **effective assemblies** with:

- Effective masses $M_A$,
- Positions $\mathbf{X}_A$,
- Momenta $\mathbf{P}_A = M_A\,d\mathbf X_A/dT$,
- An approximate instantaneous interaction potential $U_\text{eff}(\{\mathbf{X}_A\})$,

and write a **local canonical Hamiltonian**:

$$
H_\text{eff}(\{\mathbf{X}_A\},\{\mathbf{P}_A\})
=
\sum_A \frac{\|\mathbf{P}_A\|^2}{2M_A} + U_\text{eff}(\{\mathbf{X}_A\})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f722f412d236b2c7)

which:

- Approximates the full history-aware energy functional when assemblies are well separated and slowly varying,
- Recovers familiar particle‑mechanics structure for many emergent phenomena (orbital motion, scattering, bound states) without ever attributing energy to a continuous field.

---

##### Summary

- **Kinetic energy** is defined in the usual way at the architrino level, with internal kinetic energy of tightly bound self‑hit binaries contributing to assembly rest masses.
- **Interaction energy** is not primitive as an instantaneous position function; it is encoded in the nonlocal causal charge $E_{\text{wake}}$ and may be reconstructed from the work-integral form $U$.
- A **nonlocal variational scaffold** is available under the regularity and boundary assumptions stated above: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and targets the Master EOM with its transmitter-side inverse-square law, becoming an exact action derivation only when the constraint residual vanishes or is explicitly cancelled.
- The theorem-grade **total energy** is the action-derived history charge $K_\mu+E_{\text{wake}}$; the realized-trajectory quantity $K_\mu+U$ is a diagnostic identity. In suitable limits the former reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $T = \text{now}$. The action-derived conserved charge is written as $K_{\mu}(T)+E_{\text{wake}}(T)$; a work-integral reconstruction $K_{\mu}(T)+U(T)$ is compatible only along realized trajectories after the same boundary convention and acceleration law have been declared.

---

#### Symmetry, Conservation, and Lyapunov Functionals

##### Introduction

The Master Equation is a state-dependent delay system: acceleration at time $T$ depends on the path-history segment over $[T-h,T]$. In this setting, conservation laws are not functions of the instantaneous state $(\mathbf X,\mathbf V)$ alone. Instead, they are **functionals on path history** that track "in-flight" wake contributions.

The comparison to delay-equation theory should therefore be read literally but narrowly. A finite-propagation two-body law is not an ordinary present-state ODE: a valid update needs a retained history segment, the active causal-root ledger, and the same receiver/transmitter branch records used by the acceleration law. In standard terminology, a reduced chart whose delayed dependencies reach only positions and velocities resembles a state-dependent delay differential equation, while a chart that retains delayed accelerations or highest-derivative constraints is closer to a neutral delay differential equation. That classification is only a mathematical comparison; the native burden remains the same-record causal-root, $D_t$, $D_r$, $W^{\mathrm{acc}}$, and wake-history ledger.

This section makes the symmetry group explicit and states the corresponding conserved functionals for isolated systems with $\eta > 0$.

##### Fundamental Symmetry Group

**Definition (Fundamental symmetry group).** The substrate and interaction kernel are invariant under
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0dd5e8e5d11a752f)
where $E(3)=\mathbb{R}^3 \rtimes O(3)$ acts by spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ acts by time translation.

**Theorem (Invariance of the Master Equation).** If $\mathbf X(T)$ is a solution, then:

1. **Time translation:** $\mathbf Y(T)=\mathbf X(T+T_{\mathrm{shift}})$ is a solution for any $T_{\mathrm{shift}} \in \mathbb{R}$.
2. **Spatial isometry:** $\mathbf Y(T)=R\mathbf X(T)+\mathbf b$ is a solution for any $R\in O(3)$ and $\mathbf b\in\mathbb{R}^3$.

*Proof sketch.* The causal constraint depends only on Euclidean distances and time differences. Both are invariant under $G_{\text{fund}}$. The line-of-action vector $\hat{\mathbf{r}}_{ij}$ transforms covariantly under rotations, so the per-hit acceleration retains the same form.

This symmetry statement applies to the background, the interaction kernel, and the transformed full histories. It does not license arbitrary architrino flips or permutations after provenance has been assigned. Let $H_i^T$ denote the path-history/provenance record of architrino $i$ up to time $T$. A label permutation $P$ is an exact symmetry only on the restricted histories for which
$$
H_{P(i)}^T
=
P(H_i^T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40278c47924a9c80)
for every $i$, with the same transformation also preserving all causal-root relations $\mathcal{C}_{ij}(T_r)$. For generic states this condition fails, so effective indistinguishability must be treated as coarse-grained observer bookkeeping rather than substrate identity.

##### Generalized Momentum and Angular Momentum

The delayed theory separates ordinary mechanical motion from the causal-wake history that is still in flight. For an action-derived delayed model with translation and rotation symmetry, the full Noether charges are history functionals: the particle-only quantities need not be conserved by themselves, but the particle-plus-wake totals are. In regularized or numerical variants, the same expressions should be treated as conserved diagnostics only when the chosen regularization preserves those symmetries.

**Definition (Mechanical momentum).**
$$
\mathbf{P}_{\text{mech}}(T) = \sum_i \mu_{\text{arch}} \mathbf V_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fd6a611390bec855)
This is the mechanical momentum of the optional quadratic kinetic proxy. On a general primitive kinetic-scalar chart, each $\mu_{\text{arch}}\mathbf V_i$ is replaced by the declared conjugate momentum $\mathbf p_i=P(\|\mathbf V_i\|)\hat{\mathbf V}_i$, with $P'(s)=K'(s)/s$ as specified in [Energy](../../../../markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino). Energy also owns the near-zero assumptions and the kinetic-Lagrangian reconstruction for a general $K$. The action-derived charges displayed here use the quadratic bookkeeping proxy; a general kinetic chart requires that reconstructed kinetic Lagrangian and a complete revariation of the delayed action. Neither construction assigns primitive mass to an architrino, and no general conservation claim follows by substitution alone.

Because the accelerations are delayed, $d\mathbf{P}_{\text{mech}}/dT$ is generally nonzero.

**Definition (Wake momentum functional).** For an isolated system, define
$$
\mathbf{P}_{\text{wake}}(T) = \mathbf{P}_{\text{wake}}(T_\ast) - \int_{T_\ast}^{T} \sum_i \mathbf{F}_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-92e4ca1e090913fd)
with $\mathbf{F}_i = \mu_{\text{arch}} \mathbf A_i$ from the Master Equation.

**Validation condition (total momentum).**
$$
\mathbf{P}_{\text{tot}}(T) \equiv \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f9ded81301c3aab8)
is constant in time for isolated solutions of the symmetry-preserving nonlocal action. With the integral definition above, constancy along one realized trajectory is true by construction; independent conservation evidence requires $\mathbf P_{\text{wake}}$ to be derived as the spatial-translation boundary charge of that same action. For working regularized models it remains a validation condition.

**Definition (Mechanical angular momentum).**
$$
\mathbf{L}_{\text{mech}}(T) = \sum_i \mathbf X_i(T) \times \mu_{\text{arch}} \mathbf V_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7447bf33b2bd3cef)

**Definition (Wake angular momentum functional).**
$$
\mathbf{L}_{\text{wake}}(T) = \mathbf{L}_{\text{wake}}(T_\ast) - \int_{T_\ast}^{T} \sum_i \mathbf X_i(T')\times \mathbf{F}_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fcee7e82042c41df)

**Conservation target (total angular momentum).**
$$
\mathbf{L}_{\text{tot}}(T) \equiv \mathbf{L}_{\text{mech}}(T) + \mathbf{L}_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7bd7f724990f8ce8)
is the angular-momentum decomposition associated with rotational invariance of the nonlocal causal action. For isolated solutions of the symmetry-preserving action model it is conserved. For working regularized models, conservation of $\mathbf{L}_{\text{tot}}$ is a validation condition rather than an automatic consequence.

**Remark.** These definitions mirror the energy decomposition used earlier: the apparent "missing" momentum and angular momentum are assigned to in-flight causal-wake geometry. The total quantities are therefore functionals of the path history, not functions of the instantaneous particle state alone.

##### Energy Functional and No-Runaway Criterion

Time-translation invariance implies a conserved history functional, which we write as
$$
E_{\text{tot}}(T) = K_{\mu}(T) + E_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6e4c87345302dc6a)
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as a compatible reconstruction up to a constant offset when it is derived from the same action-level acceleration law and boundary convention.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local collinear recapture model, it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

There is an important independence limit. If $E_{\text{wake}}$ or $U$ is defined only by integrating the same realized acceleration power $-\sum_i\mu_{\text{arch}}\mathbf A_i\cdot\mathbf V_i$, then constancy of $K_\mu+E_{\text{wake}}$ is true by construction. That reconstruction cannot independently detect a persistent same-sign tangential acceleration: it merely books the kinetic change into the opposite wake entry. An independent no-runaway or circular-closure test therefore needs the action-derived time-translation boundary charge, or another separately derived finite-window wake account, rather than the work integral alone.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit acceleration, then there exists $F_{\max}(\eta)$ such that
$$
\bigg|\frac{dK_{\mu}}{dT}\bigg| \le \sum_i \|\mathbf{F}_i\|\,\|\mathbf V_i\|
\le N\,F_{\max}(\eta)\,V_{\max}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-43a9adac0a00528d)

**Theorem target (No-runaway criterion).** For an isolated system with fixed $\eta>0$, if the action-derived interaction charge $E_{\text{wake}}(T)$, or a compatible realized-trajectory reconstruction $U(T)$, is bounded below on the admissible history class (for example, by enforcing a minimum separation within the regularized kernel support), then $K_{\mu}(T)$ is bounded for all times where the solution exists. In particular, a runaway $V_{\max}(T)\to\infty$ is only possible if the corresponding interaction term tends to $-\infty$, which requires a collapse toward the singular regime or a breakdown of the regularized assumptions.

*Interpretation.* Self-hit repulsion can transfer energy between $U$ and $K$, but it cannot generate unbounded kinetic energy without a corresponding unbounded decrease in $U$. This is the core conservation argument for excluding unphysical runaway acceleration in the regularized model.

##### Simulation Diagnostics (Symmetry and Conservation)

In addition to the convergence checks in [Numerical Implementation Notes](#numerical-implementation-notes), track these conserved functionals in any isolated run:

- **Total energy**: $H_{\text{tot}}(T) = K_{\mu}(T) + E_{\text{wake}}(T)$, or a declared compatible reconstruction $K_{\mu}+U$, should remain constant within the chosen numerical tolerance.
- **Total momentum**: $\mathbf{P}_{\text{tot}}(T)$ should be constant; monitor $\|\mathbf{P}_{\text{tot}}(T)-\mathbf{P}_{\text{tot}}(T_{\mathrm{init}})\|$.
- **Total angular momentum**: $\mathbf{L}_{\text{tot}}(T)$ should be constant; in planar runs, the unit axis $\hat{\mathbf{n}} = \mathbf{L}_{\text{tot}}/\|\mathbf{L}_{\text{tot}}\|$ should remain fixed.
- **Binary symmetry defect** (for symmetric initial data):
$$
\Delta_{\text{sym}}(T)=\|\mathbf X_1(T)+\mathbf X_2(T)\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8f14a30e289f615b)
A secular drift indicates numerical asymmetry or a symmetry-breaking perturbation.

These diagnostics operationalize the symmetry constraints and provide early warning of numerical artifacts or model inconsistencies.

##### Closure Interface: Coarse-Graining Gate to Effective Quantum Envelope

For integration with the quantum closure program, the master equation provides the microscopic gate:
$$
\frac{d^2\mathbf X_i}{dT_r^2}=\text{delayed causal-hit sum over }\mathcal{C}_{ij}(T_r)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-43f75583f580d9cf)

The required next reduction is a controlled map to mesoscopic density dynamics:
$$
f(T,\mathbf X,\mathbf V)
\Longrightarrow
(\rho,\mathbf{u},S)
\Longrightarrow
\psi=\sqrt{\rho}\,e^{iS/\hbar_{\mathrm{eff}}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4846742902c81c7b)

Closure condition for this interface:
- the same coarse-graining window that preserves validated dynamical invariants must recover the effective Schrödinger limit in the non-relativistic, weak-field, fixed-particle-number regime;
- residual non-Markovian terms must be explicitly retained as correction operators, not absorbed into uncontrolled fitting.

**Return-map symplectic residual for action-derived branch promotion.** When a replayable branch chart is promoted to an action-derived reduced Hamiltonian chart, the section return map must preserve the reduced symplectic structure. Let $z=(Q^a,\Pi_a)$ be local reduced coordinates after the retained root constraints and section condition have been solved, let
$$
\mathcal{P}_{\mathcal{S}}:z_n\mapsto z_{n+1},
\qquad
M_{\mathcal{S}}=D\mathcal{P}_{\mathcal{S}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-01e9e734e2bb48b2)
and let $\Omega_{\mathcal{S}}$ be the pulled-back symplectic matrix on the reduced section. Define
$$
\mathcal{R}_{\Omega}
\equiv
\left\|
M_{\mathcal{S}}^{T}\Omega_{\mathcal{S}}M_{\mathcal{S}}
-
\Omega_{\mathcal{S}}
\right\|,
\qquad
\mathcal{R}_{\mathrm{vol}}
\equiv
\left|\det M_{\mathcal{S}}-1\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ef487038526ffcc4)
For an exact finite-dimensional Hamiltonian reduction, $\mathcal{R}_{\Omega}=0$ and therefore $\mathcal{R}_{\mathrm{vol}}=0$. For the delayed Master EOM these are not automatic consequences of a small orbit residual: they are closure diagnostics for the claim that the retained branch chart has captured the missing path-history degrees of freedom well enough to behave like a canonical return map. A nonzero $\mathcal{R}_{\Omega}$ means at least one of the following remains unresolved: omitted causal-root records, window-boundary wake flux, an action-level residual, or a reduction that is not actually Hamiltonian. Thus a local master-equation closure claim still uses $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ as defined above, while the stronger Hamiltonian claim must additionally report $\mathcal{R}_{\Omega}\le\epsilon_{\Omega}$.

**Standard charged-particle comparison target.** In ordinary electromagnetic mechanics, a charged particle can be described by
$$
L_{\mathrm{EM}}
=
\frac{1}{2}m\,\gamma_{ij}^{\mathrm{eff}}
\frac{dx_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}}
\frac{dx_{\mathrm{eff}}^j}{dt_{\mathrm{eff}}}
-e\phi_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
+e\,\frac{dx_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}}A_i^{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}),
\qquad
p_{i,\mathrm{can,eff}}
=
m\gamma_{ij}^{\mathrm{eff}}\frac{dx_{\mathrm{eff}}^j}{dt_{\mathrm{eff}}}+eA_i^{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-992724fa24beb261)
The velocity-coupled one-form shifts canonical momentum and yields the effective Lorentz-force law. Under
$$
\phi_{\mathrm{eff}}\mapsto\phi_{\mathrm{eff}}-\partial_{t_{\mathrm{eff}}}\chi,
\qquad
A_i^{\mathrm{eff}}\mapsto A_i^{\mathrm{eff}}+\partial_{x_{\mathrm{eff}}^i}\chi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b37b69f05a1c86e)
the Lagrangian changes only by $e\,d\chi/dt_{\mathrm{eff}}$, so the effective equations are unchanged. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a comparison structure, not substrate ontology: the primitive kernel still contains only radial causal hits. The corresponding closure target is to extract an assembly-level effective one-form
$$
\mathcal{A}_{\mathrm{eff}}
=
A_a^{\mathrm{eff}}(Q,t_{\mathrm{eff}})\,dQ^a-\phi_{\mathrm{eff}}(Q,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-71f7095a28149cb9)
from coarse-grained causal-root geometry, then show that the observer-level residual
$$
\mathcal{R}_{\mathrm{EM}}(W)
=
\int_W
\left\|
\mu_A a_{A,\mathrm{eff}}^i(t_{\mathrm{eff}})
-
e_A\left(
E_{\mathrm{eff}}^i(x_{A,\mathrm{eff}}^i,t_{\mathrm{eff}})
+
\epsilon^i{}_{jk}V_{A,\mathrm{eff}}^j(t_{\mathrm{eff}})B_{\mathrm{eff}}^k(x_{A,\mathrm{eff}}^i,t_{\mathrm{eff}})
\right)
\right\|dt_{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c39fcffaa291e22b)
vanishes in the stated approximation while the underlying branch ledger remains a sum of line-of-action contributions. Failure of this residual is a magnetic-emergence failure, not evidence for inserting an intrinsic cross-product term into the Master EOM.

**Constrained branch-multiplier formulation.** A constrained action is an active evidence record only if its branch kernel carries transmitter-side acceleration weight. On a fixed retained branch chart, the causal roots may still be represented as constrained variables rather than solved away immediately. Let $T_{t,ij,\ell}(T)$ be the emission time assigned to retained record $\ell$ and define
$$
G_{ij,\ell}(T)
\equiv
r_{ij,\ell}(T)-c_f\big(T-T_{t,ij,\ell}(T)\big),
\qquad
r_{ij,\ell}(T)
=
\left\|
\mathbf X_i(T)-\mathbf X_j(T_{t,ij,\ell}(T))
\right\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ff08ef4ba61b108d)
The transmitter-side target uses
$$
\mathcal{K}_{ij,\ell}^{\mathrm{rec},\eta}(T)
\equiv
\frac{w_{ij,\ell}^{(\eta)}(T)\,W_{ij,\ell}^{\mathrm{acc}}(T)}
{r_{ij,\ell}(T)},
\qquad
W_{ij,\ell}^{\mathrm{acc}}(T)
=
\frac{c_f}{|D_{t,ij,\ell}(T)|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9237adce6961b195)
where $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_j(T_t)$. The receiver-side quantity $D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_i(T)$ remains in signed root playback, not in this action-kernel target. A branch-reduced constrained scaffold on a window $W$ must therefore be recomputed in the form
$$
S_{\mathfrak{B}}^{(\eta)}
=
\int_W
\left[
\sum_i\frac{1}{2}\mu_{\text{arch}}\|\mathbf V_i(T)\|^2
-
\sum_{(i,j,\ell)\in\mathcal{R}^{\mathrm{act}}}
\tilde\alpha_{ij}
\mathcal{K}_{ij,\ell}^{\mathrm{rec},\eta}(T)
+
\sum_{(i,j,\ell)\in\mathcal{R}^{\mathrm{act}}}
\lambda_{ij,\ell}(T)G_{ij,\ell}(T)
\right]dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-66e5b9df2fda295e)
where $\tilde\alpha_{ij}$ carries the coupling and polarity convention, $w_{ij,\ell}^{(\eta)}$ carries the retained mollified branch and cutoff convention, and $\lambda_{ij,\ell}$ is a Lagrange multiplier for the causal-root constraint. Variation with respect to $\lambda_{ij,\ell}$ enforces $G_{ij,\ell}=0$. Variation with respect to the root variable gives the branch-record equation
$$
0
=
\partial_{T_{t,ij,\ell}}
\left[
-
\tilde\alpha_{ij}
\mathcal{K}_{ij,\ell}^{\mathrm{rec},\eta}
+
\lambda_{ij,\ell}G_{ij,\ell}
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a9afcdaaaa62df44)
provided the record has no explicit $dT_{t,ij,\ell}/dT$ dependence after the chosen reduction. Variation with respect to the receiver position exposes the constraint contribution
$$
\delta_{\mathbf X_i}
\int_W\lambda_{ij,\ell}G_{ij,\ell}\,dT
=
\int_W
\lambda_{ij,\ell}(T)\,
\hat{\mathbf r}_{ij,\ell}(T)\cdot\delta\mathbf X_i(T)\,dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3c0ff3816b3ca015)
Thus the multiplier term is not a new substrate acceleration. It is the finite-dimensional record of the work required to keep the retained branch record on the causal-root surface while the surrounding path history is varied. The unconstrained branch action is recovered only when these multiplier contributions are either solved into the same invariant action-level counterterm used above, converted into legitimate boundary wake-history terms, or shown to vanish in the branch-summed residual:
$$
\mathcal{R}_{\lambda,i}(W)
\equiv
\int_W
\left\|
\sum_{\ell:\,o_\ell=i}
\lambda_\ell(T)\hat{\mathbf r}_\ell(T)
-
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf{C}_{ij}^{(\eta)}(T)
\right\|dT
\longrightarrow0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-476c1f32e3d8c447)
Here $o_\ell$ denotes the receiver index of branch record $\ell$. This is the delayed-action analogue of ordinary holonomic constraint handling: one may solve constraints into generalized coordinates, or retain them with multipliers, but the multiplier ledger must not be hidden inside a claimed exact acceleration law.

**Noether history-functional balance target.** Let $S_{\mathfrak{B}}^{(\eta)}$ be a symmetry-preserving regularized action on a retained branch chart, and let a one-parameter transformation have infinitesimal generator $\boldsymbol{\xi}_i(T)$ on each worldline. If the action changes only by endpoint terms,
$$
\delta_{\xi}S_{\mathfrak{B}}^{(\eta)}
=
\left[
B_{\xi}^{(\eta)}(T)
\right]_{T_a}^{T_b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c27b169c168184bc)
after the retained causal-root constraints, endpoint convention, and excluded self-coincidence convention are applied, then the corresponding history charge at a cut $T_\ast$ has the form
$$
Q_{\xi}^{(\eta)}(T_\ast)
=
\sum_i
\mu_{\text{arch}}\mathbf V_i(T_\ast)\cdot\boldsymbol{\xi}_i(T_\ast)
+
Q_{\xi,\mathrm{wake}}^{(\eta)}(T_\ast)
-
B_{\xi}^{(\eta)}(T_\ast)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0153fbafc16b3371)
Its finite-window balance is
$$
\frac{dQ_{\xi}^{(\eta)}}{dT}
=
\sum_i
\boldsymbol{\xi}_i(T)\cdot
\mathbf{R}_i^{(\eta)}(T)
+
\mathcal{B}_{\xi}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ff4727403c877a68)
where $\mathbf{R}_i^{(\eta)}$ is the Euler residual of the same action and $\mathcal{B}_{\xi}^{(\eta)}$ collects leakage through finite memory endpoints, period cuts, omitted branch records, and non-characteristic tail endpoints. Exact conservation follows only when both terms vanish. Time translation, spatial translation, and rotation are the special cases that produce energy, momentum, and angular momentum above. This is the delayed version of the standard symmetry-to-conservation statement, with the crucial difference that the conserved object is a particle-plus-wake history functional rather than an equal-time particle function.

## Energy

In $\mathbb{A}\mathbb{A}\mathbb{A}$, energy accounting begins with moving architrinos and the causal wakes recorded by their motion. A wake is not a hidden fuel, a vacuum reservoir, or a second substance in the Euclidean void. It is the source-dependent causal-isochron record of an architrino's emissions. Motion changes the wake geometry, branch timing, and received potential; it does not turn the wake into an independent material thing.

This chapter answers four linked questions. What kinetic bookkeeping is allowed for a single architrino? How does work occur when a receiver crosses delayed causal wakes? How do assemblies hide or expose internal energy? How can Noether sea coupling make energy, inertia, and effective geometry appear at larger scales?

The chapter underwrites [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), and the constructive delay-energy standard in [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Accelerations and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and transmitter-side acceleration weight, on this fixed background. Derivations keep $c_f$ symbolic so the primitive-speed dependence remains visible; numerical instantiations use normalized units with $c_f=1$.

The chapter keeps four levels separate. At the substrate level, kinetic and potential terms are architrino and causal-wake records on absolute time and the Euclidean void. At the dynamical level, energy changes through receiver-side causal hits and radial power. At the effective level, assemblies acquire inertia, apparent energy, and effective metric response through Noether sea coupling. At the inference level, scalar masses, thermodynamic records, and cosmological inventories are accepted only after a window, boundary record, and residual are declared.

Spacetime in this framework belongs to the effective level, not the ontological one. The ambient Noether sea is built from dense populations of neutral Noether braid assemblies occupying the Euclidean void. Its energetic state and configuration control how energy, inertia, and effective geometry appear at larger scales.

---

### Kinetic Energy and Momentum of a Single Architrino

An architrino in motion possesses kinetic energy and momentum.

- **Kinetic Energy $E_k$**

  A scalar quantity representing the energy of motion. For a single architrino $a$ with velocity $\mathbf V_a(T)$, we write

  $$E_{k,a}(T) = K(s_a),\qquad s_a=\|\mathbf V_a(T)\|,$$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9c26d744155fdd7c)

  where $s_a$ denotes the speed argument and $K$ is a strictly convex, monotonically increasing function with $K(0)=0$. If an effective saturation proxy is being used, $K'(s_a)\to\infty$ at the saturation scale; in the primitive limit, $K$ grows unboundedly. $K$ is left unspecified because mass is emergent from interactions between assemblies, especially the Noether braids in the Noether sea. Strict convexity ensures a one-to-one mapping between kinetic energy and speed magnitude. Because a free architrino has no intrinsic speed limit in the micro-model, $E_k$ is, in principle, unbounded as $\|\mathbf V_a\|\to\infty$. **Scaffold-grade:** at this stage $K(s)$ is an unconstrained functional degree of freedom; it must eventually be fixed by back-solution consistency across certified branches, and inconsistent back-solved $\mu_K$ across certified branches would falsify this kinetic-scalar scaffold.

- **Momentum $\mathbf{p}_a$**

  The vector counterpart of kinetic energy:

  $$\mathbf p_a(T) = P\big(\|\mathbf V_a(T)\|\big)\,\hat{\mathbf V}_a(T), \quad \hat{\mathbf V}_a = \frac{\mathbf V_a}{\|\mathbf V_a\|},$$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cea96aa9e5fc3a55)

  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

  If this momentum is treated as the conjugate momentum for the primitive kinetic scalar, its rate must reproduce the kinetic-scalar power for arbitrary nonzero velocity and acceleration. This work-power compatibility makes $P$ and $K$ dependent:
  $$
  P'(s)=\frac{K'(s)}{s}=\mu_K(s),
  \qquad
  P(s)=\int_0^s\frac{K'(u)}{u}\,du
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7ef7b1701c66d826)
  after choosing $P(0)=0$. The integral through rest additionally requires $K'(0)=0$ and local integrability of $K'(u)/u$ near $u=0$; these conditions are not supplied by differentiability away from rest alone. If work-power compatibility is not imposed, $\mathbf{p}$ should be read as a momentum-like bookkeeping vector rather than a conjugate momentum generated by the same kinetic chart.

  Under the stated differentiability and near-zero assumptions, the kinetic Lagrangian associated with this momentum account is

  $$
  \ell_K(s)=sP(s)-K(s)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b34cbd136b8d7b64)

  because

  $$
  \ell_K'(s)
  =
  P(s)+sP'(s)-K'(s)
  =
  P(s),
  \qquad
  \mathbf p\cdot\mathbf V-\ell_K=K.
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9055ca326d6a89e1)

  Plainly: $K$ is the kinetic-energy scalar, while $\ell_K$ is the kinetic Lagrangian whose velocity derivative generates the declared momentum. A general action cannot use $K$ itself as the kinetic Lagrangian.

  **Conditional radial-collinearity theorem.** Let $D\subseteq\mathbb R^3$ be a connected open velocity domain. Assume every pair $\mathbf u,\mathbf w\in D$ is admissible, or that the admissible increment graph is separately proved triangle-connected, and require

  $$
  \mathbf p(\mathbf w)-\mathbf p(\mathbf u)
  \parallel
  \mathbf w-\mathbf u
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d49282c6e572403e)

  for every admitted pair. Non-collinear velocity triangles then force one common scale on every increment, so

  $$
  \mathbf p(\mathbf V)=a\mathbf V+\mathbf b.
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3de3ad511a7d2acd)

  If the domain contains rest with $\mathbf p(\mathbf0)=\mathbf0$, or if proper-rotation equivariance excludes a fixed nonzero offset, then $\mathbf p(\mathbf V)=a\mathbf V$ and $P(s)=as$. Work-power compatibility and $K(0)=0$ then give

  $$
  K(s)=\frac{a}{2}s^2.
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f07d9efe71f026b)

  Plainly: the linear momentum and quadratic kinetic family follows only when all sufficiently rich radial velocity increments must remain radial in momentum-account space. Radial acceleration by itself does not supply this hypothesis.

  Claim grade: **derived conditional theorem**. A non-affine momentum map on a connected open domain satisfying the stated all-pairs or triangle-connected collinearity condition would falsify it. The coefficient $a$ is an undetermined bookkeeping scale, not primitive architrino mass, and the theorem does not establish a physical conservation law.

  **Kinetic-scalar / closure compatibility.** The conjugacy relation above also prevents a hidden second speed scale. If the primitive kinetic scalar is modeled with a finite saturation scale $c_K$, meaning $K'(s)\to\infty$ as $s\to c_K^-$, then any effective assembly closure using a signal speed $c_{\text{eff}}$ is admissible on the declared comparison window only when
  $$
  \left|\frac{c_{\text{eff}}}{c_K}-1\right|\le\epsilon_{cK}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-551a6457c0e9f82d)
  with $\epsilon_{cK}$ declared before the comparison is promoted. If $K$ is instead kept in the primitive unbounded-speed limit, then $c_{\text{eff}}$ is wholly a Noether sea response quantity and no substrate-level particle speed cap may be invoked in the energy or mass-shell argument. This is the Legendre-compatibility condition for the kinetic scalar: once $K$ is chosen, the canonical radial momentum magnitude is fixed by the same generating function. A later effective mass-shell closure may introduce $c_{\text{eff}}$ only as the declared sea-response scale, or as the same finite scale already present in $K$ to the stated tolerance; it may not carry an unrelated second speed limit.

**No fundamental mass:**

In this model, there is no **particle-specific substrate mass** assigned to individual architrinos. We do **not** assume $E_k = \frac{1}{2}m\|\mathbf V\|^2$ or $\mathbf p = m \mathbf V$ at the substrate level for distinct architrino species. Instead:

- Kinetic energy and momentum are **primitive kinematic quantities** of architrinos.
- The substrate law is written in **acceleration-first** form.
- If force-like or quadratic-kinetic bookkeeping is needed, one may introduce a single universal conversion constant $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
- "Mass" in the usual observer sense appears **only at the assembly level** as a derived property of how a large internal energy distribution responds to external forcing in the Noether sea.

---

### Work–Energy Relation and Per-Hit Power

Kinetic-energy accounting is controlled by the acceleration-first master law, but the familiar quadratic work-energy form applies only after a kinetic proxy has been chosen. For a general primitive kinetic scalar with $s_a=\|\mathbf V_a\|$,

$$
\frac{dE_{k,a}}{dT}
=
K'(s_a)\frac{\mathbf V_a\cdot\mathbf A_a}{s_a}
=
\mu_K(s_a)\,\mathbf A_a\cdot\mathbf V_a,
\qquad
\mu_K(s)\equiv\frac{K'(s)}{s}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a5a7fe4b87f9cb63)

If one introduces the optional universal bookkeeping constant $\mu_{\text{arch}}$ and defines $\mathbf F_a \equiv \mu_{\text{arch}}\mathbf A_a$, then the quadratic bookkeeping proxy $K_{\mu,a}=\frac{1}{2}\mu_{\text{arch}}\|\mathbf V_a\|^2$ satisfies

$$
\frac{dK_{\mu,a}}{dT} = \mathbf F_a(T)\cdot\mathbf V_a(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a47c01bd459d1e0f)

Here $\mathbf{F}_a$ is the optional force-like bookkeeping quantity associated with the net acceleration from all causal hits; it is not a particle-specific substrate mass law.

From the canonical per-hit law

$$
\mathbf A_{ij}(T;T_t)
=
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T;T_t)\,\hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e78bc4ad7eaf2974)

where
$$
D_{t,ij}(T;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{ij},
\qquad
D_{r,ij}(T;T_t)
\equiv
c_f-\mathbf V_i(T)\cdot\hat{\mathbf{r}}_{ij},
\qquad
W_{ij}^{\mathrm{acc}}(T;T_t)
\equiv
\frac{c_f}{|D_{t,ij}(T;T_t)|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f456741d2054c9b9)
is the transmitter-side acceleration weight. Here $r_{ij}$ and $\hat{\mathbf r}_{ij}$ are evaluated on the same retained causal branch. The transmitter-side factor $D_t$ sets root transversality and acceleration density; $D_r/D_t$ separately records signed root playback.

Decompose the receiver's velocity into radial and transverse components:

$$\mathbf V_i = V_r \hat{\mathbf{r}}_{ij} + \mathbf V_\perp, \quad V_r=\mathbf V_i\cdot\hat{\mathbf{r}}_{ij}.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1dac00db984c671b)

Because $\mathbf A_{ij}\parallel\hat{\mathbf{r}}_{ij}$:

- The **instantaneous work rate** from this hit is

  $$
  \frac{dK_\mu}{dT}\bigg|_{\text{hit}}
  =
  \mu_{\text{arch}}\mathbf A_{ij}\cdot\mathbf V_i
  =
  \mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
  \frac{W_{ij}^{\mathrm{acc}}(T;T_t)}{r_{ij}^2}\,V_r
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-30b33c7cd55f1df3)

  Only $V_r$ contributes to instantaneous quadratic-proxy power. For the primitive scalar $K$, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf V_\perp$ is unchanged instantaneously.

---

### Potential Energy and Causal-Wake Potential

Potential energy arises from the interaction of an architrino with the **net causal-wake potential** generated by all architrinos, including in some regimes its own past emissions.

#### Net Causal-Wake Potential

At a point $\mathbf X$ and time $T$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf X,T) = \sum_o \Phi_o(\mathbf X,T).$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1743c15c55550355)

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf X,T)$; in the ideal limit $\eta\to 0$ it becomes a measure-valued distribution supported on causal isochrons.

#### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a transmitter continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the transmitter's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a transmitter's path-history causal-wake record and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the transmitter-side root denominator, the transmitter-side acceleration weight, and the receiver's radial motion through the line of action. In the general per-hit law the transmitter-side factor is

$$
D_{t,ij}(T;T_t)
=
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ef3fbb3ed212556d)

and the receiver-side factor is

$$
D_{r,ij}(T;T_t)
=
c_f-\mathbf V_i(T)\cdot\hat{\mathbf{r}}_{ij}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bc6aaccf1c17c159)

The branch strength is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, while the instantaneous power delivered to the receiver is controlled by

$$
\mathbf A_{ij}\cdot\mathbf V_i
=
\|\mathbf A_{ij}\|\,V_r
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-31d12a9f37326e23)

On an affine partner chart, the transmitter-side factor and receiver-side factor must both be tracked. The simple branch expression $J_p=1+(dX/dT)/c_f$ is only a transmitter-side topology expression unless the receiver-side factor is also present on the same chart.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

#### Potential Energy

For a receiver architrino $i$ with polarity $q_i$ at position $\mathbf X_i(T)$, the potential energy $U_i(T)$ is the fixed-history bookkeeping value assigned to the current configuration against the causal path-history wake record:

$$U_i(T) = q_i\,\Phi_{\text{net}}[\text{history}]\big(\mathbf X_i(T),T\big).$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-db8d90188e15f2f2)

The sign of $\Phi_{\text{net}}$ is not a sign on total energy. A negative causal-wake potential contribution from an electrino source is a polarity-signed interaction record; it becomes energy bookkeeping only after the receiver polarity, active causal root, line-of-action geometry, transmitter-side factor, transmitter-side acceleration weight, and receiver radial motion are specified. Work can therefore occur relative to a negative potential without introducing a negative-energy substance or a negative total-energy reservoir.

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal-wake record of $\mathbf X_i(T)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

When we work with the mollified effective potential $\Phi_\eta$, we can also write the fixed-history, force-like relation:

$$\mathbf F_i(T) = -\nabla_{\mathbf X_i}U_i(T) = -q_i \nabla_{\mathbf X_i} \Phi_\eta[\text{history}]\big(\mathbf X_i(T),T\big),$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6eef4154628cac82)

and this is required to be equivalent to the Master Equation in the quasi-static, resolved-in-time limit after the same force normalization, such as $\mathbf F_i=\mu_{\text{arch}}\mathbf A_i$ or the appropriate $\mu_K\mathbf A_i$, has been declared; the recovery is graded a target in the Master Equation chapter. The force-as-gradient identity is valid only when taking the gradient at fixed causal history; the fundamental acceleration law remains the per-hit sum of the Master EOM.

#### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic force. The net causal-wake potential is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, macroscopic quietness is a two-moment condition, not only a mean-zero statement:

$$
\left\|
\left\langle \nabla \Phi_{\text{net}}\right\rangle_W
\right\|
\le
\epsilon_{\text{mean}},
\qquad
\frac{
\operatorname{Var}_W\!\left(\nabla\Phi_{\text{net}}\right)
}{
\left\|\nabla\Phi_{\text{coh}}^{\text{bound}}\right\|^2
}
\le
\epsilon_{\text{var}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7380906ec15d3d86)

Both bounds must use the same horizon, screening, and summation prescription that makes the many-source wake sum converge. The variance bound is the load-bearing part: incoherent fluctuation must remain small compared with the coherent bound-state gradient that phase-locked assemblies preserve. This cancellation is one reason the Noether sea can be densely active while remaining macroscopically quiet. What standard prose may call a vacuum state is not empty Euclidean void; it is the effective limit in which the local Noether sea assemblies and their causal wakes balance so well that only small residual gradients remain available to ordinary probes.

Mean-zero wake potential is therefore not zero total energy. A statistically neutral $50/50$ electrino/positrino inventory can make the large-scale potential gradient and received power nearly vanish while still carrying kinetic energy, local correlated interaction energy, retained wake-history content, and Noether sea organization. The candidate conserved quantity for an isolated exact trajectory is a history-aware total ledger, not "initial kinetic energy plus a naive instantaneous potential" evaluated after the wake record has been discarded. Its conservation remains a closure target until one accepted causal action or causal-wake update derives the motion, wake, and boundary accounts on the same provenance-complete causal-root record.

For energy accounting, cancellation is applied only after transmitter identity, polarity, emission time, active causal root, branch Jacobian, line-of-action geometry, and receiver radial power have been retained. A net-zero scalar potential channel is therefore a projection of a richer transmitter-tagged ledger, not proof that no wake-history energy, internal branch energy, or coherent work opportunity remains available to a receiver whose branch resolves the contributing rows.

Phase-locked bound states are the important exception. In a localized assembly, nearby constituents do not sample random phases; their active causal roots are correlated, and the $1/r^2$ distance factor lets the nearest coherent branches dominate over the far incoherent background. A collinear breather, for example, is precisely a reduced setting in which two opposite-polarity architrinos can form a localized, non-canceling causal resonance: instead of averaging away, the partner-hit and self-hit branches stay phase organized enough to exchange kinetic and potential energy across a bounded cycle.

---

### Energy Conservation and Exchange

Energy conservation is a required closure target. Its derivation must show, on one retained causal-root record, how kinetic motion exchanges with causal-history interaction content while every active root, admitted self entry, fold, and boundary transfer has unique provenance. The wake term in the candidate ledger should not be read as an independent material reservoir that drains from the transmitter with every unreceived isochron; it must be derived as nonlocal bookkeeping from the same time-translation-invariant causal action or causal-wake update that generates the acceleration contributions. Time-translation symmetry is necessary but insufficient: the action route also requires a proved delay-compatible Noether theorem with retained-history boundary terms, while either route requires signed motion, wake, and boundary accounts with complete pairwise provenance and no double booking. For mollified working models, an exact conservation claim additionally requires the regularization to inherit the accepted action or update rather than being inserted only at the acceleration-operator level.

Classical virial language is recovered only at branch level. The familiar comparison form $\langle 2K-pU\rangle=0$ is admissible after a retained branch chart supplies a branch-local potential, homogeneity degree, and proof that the same acceleration contribution used by the Master EOM is generated by that potential over the declared window. Standard mechanics often writes $T$ for kinetic energy in this formula; here $K$ avoids collision with absolute time $T$. Until those rows close, virial behavior remains a diagnostic on the causal-root ledger rather than a primitive substrate axiom; see the branch-virial target in [Analytic Baselines](../../../../markdown/aaa/validation/simulations/action-energy/analytic-baselines.md#analytic-baselines).

With a declared assembly-level bookkeeping normalization and a fixed set of sources, the branch-local work identity has the candidate form:

$$
\Delta E_k
=
\int
\mu_K(\|\mathbf V\|)\,\mathbf A\cdot d\mathbf X
=
-\Delta U
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-179020f3e21467c8)

For an **isolated system** of architrinos and their wakes, the candidate total-energy functional is:

$$E_{\text{total}} = \sum_a E_{k,a} + U_{\text{int}} + E_{\text{wake}},$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c38f91bbb573425)

Its promotion to a constant of motion requires a derivation from the accepted causal action or causal-wake update, a provenance-complete causal-root ledger with no double booking, and closed motion, wake, and boundary accounts on the same record. In mollified working models, this same bookkeeping is exact only when the mollified kernel inherits the action-level time-translation symmetry; otherwise it remains the natural candidate history functional to monitor, but not an established exact invariant.

- $U_{\text{int}}$ is an optional effective decomposition of near-field interaction energy.
- $E_{\text{wake}}$ is the candidate history-dependent account for nonlocal interaction content carried by wake structures and any radiation-like transport through the Noether sea.

Plainly: these equations specify the ledger that must be derived and closed; they do not assert that exact energy conservation has already been established.

The same distinction governs cosmological redshift. Because the Euclidean void does not expand and absolute time supplies the comparison parameter, a transparent redshift branch cannot treat the photon's missing energy as a bookkeeping disappearance. At the universe-state level, the conservation target is a scalar ledger of architrino kinetic/configuration energy, causal-wake energy in flight, and Noether sea constitutive energy:

$$
E_{\mathrm{tot}}(T)
=
E_{\mathrm{arch}}(T)
+E_{\mathrm{wake}}(T)
+E_{\mathrm{sea}}(T),
\qquad
\frac{dE_{\mathrm{tot}}}{dT}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ad1ce80deb662efa)

This global target requires the total energy on the constant-$T$ leaf to be finite or convergently summable. For an unbounded or observationally truncated cosmology, the safe conservation statement is local continuity,

$$
\partial_T\rho_E+\nabla_{\mathbf X}\cdot\mathbf S_E=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8906a676cd2c9cc2)

tested through finite windows and boundary fluxes. In the pure transparent-path limit, after source, recoil, remnant, and boundary terms have been separated, a bundle redshifted by $1+z$ carries the deficit

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z},
\qquad
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c9d3af81587e21ed)

If the Noether sea update needed to close this row is nonlocal, re-radiating, path-history inconsistent, or incompatible with image sharpness and CMB blackbody preservation, the fixed-void redshift branch has failed the energy ledger rather than solved cosmological redshift.

Consistency rule: either use $E_{\text{wake}}$ alone for all interaction energy, or, if a $U_{\text{int}}$ pairwise term is retained as an effective decomposition inside assemblies, then $E_{\text{wake}}$ must explicitly omit the corresponding near-field content to prevent double counting.

For a hybrid decomposition, the omission must be checkable on the same finite window. Let the near/far split be made with the same coarse-graining window $W_\ell$ used in the matter-to-sea source $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$. Define the partition-overlap residual
$$
\mathcal{R}_{\mathrm{dbl},W}
=
\frac{
\left|
E_{\mathrm{wake},W}^{(\eta)}
-
\left(E_{\mathrm{wake},W}^{\mathrm{far}}+E_{\mathrm{wake},W}^{\mathrm{near}}\right)
\right|
+
\left|
U_{\mathrm{int},W}
-
E_{\mathrm{wake},W}^{\mathrm{near}}
\right|
}{
\left|E_{\mathrm{wake},W}^{(\eta)}\right|
+
\left|U_{\mathrm{int},W}\right|
+
\varepsilon_E
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-89a902362ac9cb61)
with $\varepsilon_E > 0$ a declared denominator floor. A retained $U_{\text{int}}+E_{\text{wake}}$ decomposition is admissible only when $\mathcal{R}_{\mathrm{dbl},W}\to0$ under refinement of the same window, boundary record, and regularized causal action.

#### Conservation Status

The conservation claim is a level-specific statement. For an isolated branch whose acceleration law is generated by a time-translation-invariant causal action for which a delay-compatible Noether theorem has been proved, and whose signed motion, wake, and boundary accounts close on a provenance-complete causal-root record, the target statement is:

$$
\frac{d}{dT}E_{\text{total}}(T)=0,
\qquad
E_{\text{total}}(T)
=
\sum_a E_{k,a}(T)
+
U_{\text{int}}(T)
+
E_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8925bc8fee546c1f)

No accepted causal action, delay-compatible Noether theorem, provenance-complete signed-account record, or boundary-flux closure currently establishes this display as a physical invariant. It gives the shape of the theorem to be proved.

This is not a claim that $\sum_a E_{k,a}$ is constant on $\Sigma_T$, nor that a finite simulation window conserves its particle-only ledger. Delayed hits move energy between mechanical motion and causal-wake history, and finite windows must also name boundary flux, external work, and residuals. A calculation that omits one of those terms has not established energy nonconservation; it has exposed an incomplete retained record.

For any candidate scalar action kernel proportional to $1/r$ with the time-normalized constraint $\tilde g=T_r-T_t-r/c_f$, dimensional consistency requires the coefficient $\mu_{\text{arch}}\kappa$, not $\kappa/c_f$. The corresponding regularized interaction diagnostic for that candidate is proportional to $\delta_\eta(\tilde g)/r$; simple-root collapse produces $W^{\mathrm{acc}}/r$ once. An inverse-square acceleration density with a manually inserted $W^{\mathrm{acc}}$ is not an energy functional. With the polarity convention that like signs repel, the sharp like-polarity interaction charge is positive and the boundary derivative inherits the outer minus sign declared in the action.

Plainly: the wake-energy account must come from whatever action kernel is eventually accepted as generating the acceleration operator. The $1/r$ construction above constrains candidates only. Reusing the $1/r^2$ acceleration formula as energy gives the wrong units and double-counts the root weight.

In working models the exact claim is conditional. If the mollifier, history window, self-branch cutoff, or another history-kernel construction is inserted only at the equation-of-motion level, then the same expression is a diagnostic to monitor, not a proved Noether charge. Exact conservation is promoted only when the same symmetry-preserving action or independently derived causal-wake update supplies both the acceleration contribution and the energy row, and when the energy residual in this section vanishes under refinement. The formal construction routes, crosswalk residual, and promotion conditions for $E_{\text{wake}}$ are isolated in [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md).

The finite-$\eta$ pathology theorem target in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#finite-regulator-pathology-quarantine-theorem-target) uses this conservation status in a restricted way. The no-runaway conclusion is available only when the action-derived $E_{\text{wake}}^{(\eta)}$, or a compatible realized-trajectory reconstruction, has a declared lower bound on the same admissible branch chart. If the lower bound is absent, the run is not promoted as a closed solution; it is routed to the continuation boundary where collapse, missing wake-history bookkeeping, regulator dependence, or endpoint leakage must be resolved.

For reaction or radiation events, energy can leave the source assembly as photon output, recoil, medium excitation, remnant excitation, wake-carried exchange, or handoff terms, but those are named outputs rather than hidden losses. The event-level version is the componentwise ledger closure in [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md#residual-routing-event-ledger-contract).

#### Wake Escapement

This is a boundary-accounting idea, not a new energy reservoir. If a wake leaves the chosen local window before any retained receiver crosses it, the local work ledger cannot spend that wake internally. The accounting must therefore mark it as escaped flux, recoil, boundary exchange, or another declared handoff rather than hiding it inside the local assembly.

For a finite local window $W\subset\Sigma_T$, the **wake-escapement diagnostic set** is the set of emitted causal isochrons whose first retained boundary crossing occurs before any retained receiver intersection inside that window. More explicitly, if architrino $a$ emits at $T_t$, define the causal isochron at later time $T$ by

$$
C_a(T;T_t)
=
\left\{
\mathbf Y\in\Sigma_T:
\left\|\mathbf Y-\mathbf X_a(T_t)\right\|
=
c_f(T-T_t)
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f9ab8f3a26ebd83e)
The emitted isochron belongs to the escapement set $\mathcal{E}_{\mathrm{esc}}(W)$ when it has a first retained boundary crossing
$$
C_a(T_{\partial W};T_t)\cap\partial W\ne\varnothing
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cf92985fd69d74d1)
and there is no retained receiver hit before that crossing:
$$
\nexists\, b,T_r
\quad
\text{with}
\quad
T_t<T_r<T_{\partial W},
\quad
\mathbf X_b(T_r)\in W,
\quad
\mathbf X_b(T_r)\in C_a(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-012f94e1f66b159d)

This isochron-level set is an earliest-crossing diagnostic, not a measure of the escaped fraction of a wake. When only some surface sectors cross $\partial W$, or when retained receivers intersect other sectors, quantitative escapement is the surface-resolved boundary flux through $\partial W$, with a declared solid-angle or surface partition when needed. A receiver intersection records local work; it does not imply depletion or absorption of the remaining isochron unless that mechanism is separately derived from the action.

Wake escapement is therefore a finite-window boundary classification, not a new substance in the Euclidean void. It names the portion of causal-wake history that cannot be balanced by local receiver work because no local receiver intercepted it. In a contracting binary, the persistent positive tangential drive identified in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#tangential-drive-and-wake-escapement) should be read against this boundary ledger: particle kinetic gain, local interaction-energy change, recoil, and escaped wake flux are parts of one balance law.

For a finite spatial window $W\subset\Sigma_T$, conservation is a balance law rather than a claim that the window is isolated. This is the conservation-law upgrade relative to instantaneous mechanics: energy, momentum, and angular momentum are not generally conserved equal-time particle snapshots, but finite-window history functionals whose apparent deficits must be carried by causal-wake fluxes or by an explicit residual. Write
$$
E_W(T)
=
\sum_{a:\mathbf X_a(T)\in W}K_a(T)
+
U_{\mathrm{int},W}(T)
+
E_{\mathrm{wake},W}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-caaead4cfb7cf0ad)
where the terms include only the kinetic, interaction, and wake-history content retained by the declared window record. The finite-window energy balance should take the residual form
$$
\frac{dE_W}{dT}
+
\int_{\partial W}\mathbf{J}_E\cdot\hat{\mathbf{n}}\,dA
=
P_{\mathrm{ext},W}
+
\mathcal{R}_E(\eta,\Delta T,W)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-06b99ef1ba25294f)
Here $\mathbf{J}_E$ is the boundary flux of causal-wake energy bookkeeping, including any wake escapement through $\partial W$; $P_{\mathrm{ext},W}$ is declared external work through sources or controls not included in $W$; and $\mathcal{R}_E$ records mollifier, timestep, and omitted-boundary-history error. A finite-window conservation claim is mature only when $\mathcal{R}_E\to0$ under the same regularized causal action used for the local equation of motion.

A receiver-gradient kernel identity does not by itself define a wake-energy boundary flux. Any proposed boundary contribution must be derived from the same accepted action or causal-wake update as the motion law, and its finite-window leakage must vanish or appear explicitly in $\mathbf J_E$. Otherwise it remains a diagnostic partition rather than exact energy conservation.

The analogous momentum and angular-momentum closures must also remain tied to the same window and boundary data. The finite-window momentum functional $P_W^i$ contains the mechanical momentum retained in $W$ plus the retained wake-history momentum record:
$$
\frac{dP_W^i}{dT}
+
\int_{\partial W}\Pi^{ij}\hat{n}_j\,dA
=
F_{\mathrm{ext},W}^i
+
\mathcal{R}_P^i(\eta,\Delta T,W)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-304b6c99102112b3)
For a declared origin $\mathbf X_0$, the corresponding angular-momentum history functional has the schematic form
$$
\mathbf{L}_W(T)
=
\sum_{a:\mathbf X_a(T)\in W}
\big(\mathbf X_a(T)-\mathbf X_0\big)\times\mathbf p_a(T)
+
\mathbf{L}_{\mathrm{wake},W}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b1002c4d8bd76364)
where $\mathbf p_a$ is the declared mechanical momentum proxy for the chosen kinetic bookkeeping. Its finite-window balance target is
$$
\frac{dL_W^i}{dT}
+
\int_{\partial W}\Lambda^{ij}\hat{n}_j\,dA
=
\tau_{\mathrm{ext},W}^i
+
\mathcal{R}_L^i(\eta,\Delta T,W)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#noether-conservation)

Here $\Pi^{ij}$ and $\Lambda^{ij}$ are finite-window flux diagnostics for retained causal wakes and assembly crossings, not new substrate fields. $\tau_{\mathrm{ext},W}^i$ is the external torque about the same origin $\mathbf X_0$. If the energy, momentum, and angular-momentum residuals can be made small only by changing the window measure, boundary wake record, or regularization separately for each observable, the calculation has fitted separate summaries rather than demonstrated one causal-history conservation law.

Cosmological inventory comparisons add one more finite-window caution. A gravitational binding contribution is negative relative to dispersed matter in the declared window, but the sign is meaningful only after the boundary and coarse-graining are fixed. In this chapter, $G_{\mathrm{eff}}$ in the binding line is a provisional external comparison input until the mass map and Noether sea response tensor independently derive it. For a component inventory over $W$,
$$
E_{\mathrm{bind},W}^{\mathrm{grav}}
=
-\frac{1}{2}
\int_W\!\int_W
\frac{G_{\mathrm{eff}}(\theta;x_{\mathrm{eff}}^i,y_{\mathrm{eff}}^i)\,
\rho_{\mathrm{eff}}(x_{\mathrm{eff}}^i)\rho_{\mathrm{eff}}(y_{\mathrm{eff}}^i)}
{\|\mathbf x_{\mathrm{eff}}-\mathbf y_{\mathrm{eff}}\|}
\,dV_{x_{\mathrm{eff}}}\,dV_{y_{\mathrm{eff}}}
+
\mathcal{B}_{\partial W}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b85e0d24b6eb535b)
where $\mathcal{B}_{\partial W}$ records boundary and embedding terms. The corresponding inventory residual is
$$
\mathcal{R}_{\mathrm{grav\,bind},W}
=
\frac{
\left|
E_{\mathrm{bind},W}^{\mathrm{grav}}
-
E_{\mathrm{bind},W}^{\mathrm{obs}}
\right|
}{\epsilon_{\mathrm{bind}}}
+
\frac{|\mathcal{B}_{\partial W}|}{\epsilon_{\partial W}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6855e08f0b925e8f)
The circularity check is the post-handoff residual
$$
\mathcal{R}_{G\text{-consist},W}
=
\frac{
\left|
G_{\mathrm{eff}}^{\mathrm{bind}}
-
G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}
\right|
}{
\left|G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}\right|
+
\varepsilon_G
}
\le
\epsilon_G
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de6b1951adaebcc7)
where $G_{\mathrm{eff}}^{\mathrm{bind}}$ is the value used in the inventory comparison and $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$ is the value derived from shielding, exposed response, and the Noether sea response tensor. Until $\mathcal{R}_{G\text{-consist},W}$ is reported on the same window, the cosmological binding line is comparison bookkeeping only, not a derived inventory contribution. This keeps gravitational binding from being used as an adjustable bookkeeping sign that can repair the cosmic energy inventory without specifying the same window, boundary wake history, and effective $G_{\mathrm{eff}}$ used by the rest of the cosmology branch. The stronger same-record requirement is that $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$, the response-speed tensor that supplies $c_{\text{eff}}$, and the ruler/metric response consumed by the effective geometry chapter all be read from one Noether sea response record. If those quantities require separate sea records or separately tuned response tensors, the gravity, clock, and ruler sectors have been fitted independently rather than derived from one exposed-energy and medium-response ledger.

**Theorem target (center of response).** The standard center-of-mass theorem depends on equal-time internal force cancellation. In delayed causal dynamics that cancellation is not available as a particle-only statement on $\Sigma_T$: the reciprocal hit generally belongs to a different emission time, a different causal-root branch, or a boundary wake record not retained by the finite window. For an assembly window $W_A(T)$, the replacement target is to prove that there is a response center $\mathbf X_{\mathrm{resp}}(T)$ and an assembly response tensor $M_A^{ij}$ such that the finite-window momentum balance reduces, over resolved windows, to
$$
\frac{d}{dT}\left(M_A^{ij}\frac{dX_{\mathrm{resp},j}}{dT}\right)
=
F_{\mathrm{ext},W_A}^i
-
\int_{\partial W_A}\Pi^{ij}\hat{n}_j\,dA
+
\mathcal{R}_{\mathrm{resp}}^i(\eta,\Delta T,W_A)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-460fea5f9bf52b7e)
The pair $(\mathbf{X}_{\mathrm{resp}},M_A^{ij})$ is not free to be chosen after the balance is fitted. The response center must be pinned independently by the exposed internal-energy ledger,
$$
X_{\mathrm{resp}}^i(T)
\equiv
\frac{
\displaystyle\int_{W_A(T)}
X^i\,
\zeta_{\mathrm{loc}}(\mathbf X,T)\,
e_{\text{internal}}(\mathbf X,T)\,dV
}{
\displaystyle\int_{W_A(T)}
\zeta_{\mathrm{loc}}(\mathbf X,T)\,
e_{\text{internal}}(\mathbf X,T)\,dV
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1ace26de4419922b)
whenever the denominator is positive and the window contains the exposed assembly record on the native slice $\Sigma_T$. The tensor $M_A^{ij}$ must then reduce to the independently extracted response tensor $\mathsf{I}_A^{ij}$ on the same branch chart. Only when these independently defined objects satisfy the balance with $\mathcal{R}_{\mathrm{resp}}^i\to0$ does it reduce to the familiar center-of-mass form. A non-vanishing irreducible residual means the exposed-energy center is not the inertial response center for that branch, rather than a license to redefine the center. Until that theorem is closed, a center-of-mass trajectory is an effective readout of the assembly response, not a substrate-level proof that internal delayed forces cancel instantaneously. Equivalently, $\mathbf{X}_{\mathrm{resp}}$ and the inertial-response center are two different moment maps on the same retained assembly record: one weights exposed internal energy, while the other is inferred from momentum response. Their coincidence is a theorem target, not a definition. The obstruction is the finite-window wake-momentum flux across $\partial W_A$; if that boundary record has a secular or nonrecurrent component, the two centers can differ even when the equal-time particle picture looks nearly balanced. This is the center-of-response version of the memory-boundary recurrence condition used by the effective-Lagrangian symplectic-promotion row.

Particle-only recoil is therefore not anomalous merely because mechanical momentum changes. The anomalous-recoil row is the already defined irreducible $\mathcal R_{\mathrm{resp}}^i$ after the independently defined response center, external contribution, and boundary wake-momentum flux have been fixed on the same window. A nonzero mechanical recoil balanced by that ledger is ordinary delayed exchange, not isolated self-acceleration.

In practice, finite systems or simulation domains should monitor $E_W(T)$, $P_W^i(T)$, and $L_W^i(T)$ together with their boundary fluxes and residuals. $E_{\text{total}}(T)$ is the isolated-system limit when the declared window contains the full wake-history record and the boundary terms vanish.

---

### Entropy, Free Energy, and Coarse Residuals

Entropy and free-energy language belongs to coarse-grained records, not to empty Euclidean void. It is useful when a simulation or continuum reduction groups many microhistories into the same retained macrostate. For a declared coarse map $\mathcal Q:S(T)\mapsto z$ with cell probabilities $p_\alpha$ over the retained histories, the entropy diagnostic is
$$
S_{\mathcal Q}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c0ed442a8c9df90d)
When a temperature-like channel $T_{\mathcal Q}$ is declared by the same record, the Helmholtz-style free-energy diagnostic is
$$
F_{\mathcal Q}
=
E_{\mathcal Q}
-
T_{\mathcal Q}S_{\mathcal Q}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fa5054ee6924be6c)
This is not an added thermodynamic postulate. It is a test that the chosen coarse variables have retained enough state counting to make relaxation and response claims reproducible.

The distinction matters because energy conservation does not by itself measure work availability. Two records with the same total energy can have different free-energy diagnostics when one retains a concentrated heat, chemical, photon-channel, or potential-gradient channel and the other has dispersed the same energy into unresolved thermal, boundary, or wake-history records. A finite-window calculation must therefore close the energy ledger and the entropy ledger on the same retained record before claiming that energy remained useful, became waste heat, or crossed the boundary as low-grade radiation.

For an isolated finite window, the minimum coarse thermodynamic gate is the same-record entropy-production residual
$$
\mathcal R_{S,W}
=
\frac{
\left[
-
\Delta_W S_{\mathcal Q}
+
\int_W
\frac{
\mathcal D_{\mathcal Q}
}{
T_{\mathcal Q}+\varepsilon_T
}
dT'
\right]_+
}{
|\Delta_W S_{\mathcal Q}|
+
\int_W
\left|
\frac{\mathcal D_{\mathcal Q}}{T_{\mathcal Q}+\varepsilon_T}
\right|dT'
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-11c8271067035366)
where $[x]_+=\max(x,0)$ and $\mathcal D_{\mathcal Q}$ is the declared coherent-to-incoherent transfer rate, including viscous, thermal, wake-boundary, or Noether sea response channels retained by the packet. Passing this gate means only that the selected coarse record has not made entropy decrease after unresolved boundary leakage is accounted for. It does not prove a fundamental stochastic substrate.

For the consolidated mapping from legacy entropy formulas into $\mathbb{A}\mathbb{A}\mathbb{A}$ record projections, see [Entropy](../../../../markdown/aaa/dynamics/entropy.md).

In near-equilibrium comparison runs, response and fluctuation must also come from one record. The fluctuation-dissipation map may be invoked only after that same retained record supplies an admissible temperature channel. Concretely, the record $\theta_W$ that supplies $\chi_{AB}''$ and $S_{AB}^{\mathrm{meas}}$ must pass $\mathcal R_{S,W}$ and must yield consistent temperatures from at least two independent observable pairs:
$$
\mathcal{R}_{T,W}
=
\frac{
\left|
T_{\mathcal Q}^{(AB)}
-
T_{\mathcal Q}^{(A'B')}
\right|
}{
\left|T_{\mathcal Q}^{(AB)}\right|
+
\left|T_{\mathcal Q}^{(A'B')}\right|
+
\varepsilon_T
}
\le
\epsilon_T
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-866c9c36d6549fc3)
If this sea-temperature admissibility check fails, the packet may report the dissipative response $\chi_{AB}''$ alone, but it may not use an equilibrium fluctuation-dissipation map as closure evidence. If an observable $O_A$ has response kernel $\chi_{AB}(\omega)$ to a controlled source coupled to $O_B$, the causal-response check is that the dissipative part and the equilibrium fluctuation spectrum $S_{AB}(\omega)$ obey a declared classical or quantum fluctuation-dissipation row. A dimensionless packet residual can be written as
$$
\mathcal R_{\mathrm{FD}}(A,B)
=
\frac{
\left\|
S_{AB}^{\mathrm{meas}}(\omega)
-
\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)
\right\|_{\omega}
}{
\left\|S_{AB}^{\mathrm{meas}}(\omega)\right\|_{\omega}
+
\left\|\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)\right\|_{\omega}
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d9aa2aa4280bef2)
Here $\mathcal F_T$ is the packet's chosen fluctuation-dissipation map, and $\chi_{AB}''$ is the imaginary, dissipative response. A passing value supports the coarse response chart; a failing value means the noise, dissipation, and energy ledger have been fitted separately.

---

### Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy Noether braid assemblies**. The following size and energy statements are hypotheses awaiting a certified Noether braid and scale map:

- These Noether braids are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each Noether braid is itself a tightly bound architrino assembly with very high internal kinetic and potential energy; A1 is the best-developed Family-A member, not the definition of the sea.
- As a sea, they form a **dense population of coupled assemblies** occupying the Euclidean void. This ambient Noether sea content carries non-zero assembly density and internal stress. It provides the constitutive relations (permittivity, permeability, and medium-dressed inertial response) that deform the primitive architrino dynamics into effective relativistic kinematics, providing the bridge-level spacetime medium for:
  - Emergent inertia and mass,
  - Effective causal-cone behavior and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (rare at low energies),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **Noether sea** and, in bridge prose, the spacetime medium.

---

### Assemblies: Internal vs Apparent Energy

For composite systems such as Standard Model particles, nuclei, and composite bound states formed from architrinos and embedded in the Noether sea, we distinguish:

- **Total internal energy**: energy retained by the assembly and by its immediate Noether braid environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

#### Internal Energy of an Assembly

For an assembly $A$ (e.g., Noether braid or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a355acf2081a9004)

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding Noether sea, that is, the local Noether sea environment (or in bridge prose, the local spacetime medium).

**Hypothesis.** The internal energy can be much larger than the externally exposed energy. Any comparison to the Planck scale or a higher scale remains a benchmark-level possibility until a certified branch fixes the native energy map.

#### Apparent Energy and Shielding

The surrounding Noether sea, and the arrangement of positive- and negative-polarity architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Polarity cancellation**: positive- and negative-polarity architrinos within the assembly (and in surrounding Noether braids) emit wakes that interfere destructively at larger distances.
- **Phase-structured far-field cancellation**: the geometry of internal orbits and Noether braid polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size.
- **Indexed support shielding**: in candidate multi-tier fermion braid scaffolds, source-record support indices can partially screen other rows from the surrounding sea. Generation shifts are hypothesized to reflect loss of declared support rows, not a fixed outer-to-inner identity or only a loss of constituent count.

At the reference-attractor level, define the **shielding (leakage) factor** as the leading isotropic projection of a larger far-field wake ledger:

$$
\zeta(A_0)
\equiv
\frac{\|\Pi_0\mathcal{L}_{\text{wake}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|},
\qquad
\mathcal{L}_{\text{aniso}}(A_0)
\equiv
\mathcal{L}_{\text{wake}}(A_0)-\Pi_0\mathcal{L}_{\text{wake}}(A_0)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5da0199a4b2c37b1)

evaluated in a regime where the assembly appears as an effective point source. Here $\Pi_0$ extracts the monopole/isotropic component of the far-field wake ledger and $\mathcal{L}_{\text{aniso}}$ retains anisotropic leakage instead of hiding it inside a scalar error term. For a strongly shielded, neutral Noether braid in the Noether sea, we expect $\zeta\ll 1$. Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ (or hit amplitude) at $r \gg \text{size}(A)$: $\zeta \equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ (or multipole) coefficient to the naive constituent sum, with anisotropic residuals reported separately. The scalar shielding summary is admissible only when anisotropic leakage is small enough for the comparison being made, for example
$$
\frac{\|\mathcal{L}_{\text{aniso}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|}
\le
\epsilon_{\text{aniso}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f4acab4b99976a5d)
with $\epsilon_{\text{aniso}}$ declared before the branch is promoted to a scalar mass-facing result.

The scalar apparent-energy proxy that influences other assemblies at large distances is then:

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-70c7b08600f11ed4)

This is a roadmap relation, not a substrate identity; proportionality constants must be fixed by matching to effective low-energy theory (e.g. mapping to $mc^2$).

The exposed energy cannot be counted twice as both the direct probe readout and the sea-retuning source. On a declared comparison window, split the exposed ledger into a probe channel and a sea-coupled channel:
$$
\zeta(A)E_{\text{internal}}(A)
=
E_{\text{probe}}(A)
+
E_{\text{sea-coupled}}(A)
+
E_{\text{unresolved}}(A),
\qquad
E_{\text{probe}}(A)+E_{\text{sea-coupled}}(A)
\le
\zeta(A)E_{\text{internal}}(A)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8b37e9a042bf7aac)
with partition residual
$$
\mathcal R_{\text{part}}(A)
=
\frac{
\left|
\zeta(A)E_{\text{internal}}(A)
-
E_{\text{probe}}(A)
-
E_{\text{sea-coupled}}(A)
-
E_{\text{unresolved}}(A)
\right|
}{
\left|\zeta(A)E_{\text{internal}}(A)\right|
+
\varepsilon_{\text{part}}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-96170d01e45cbeac)
The mass map couples distant probes to $E_{\text{probe}}$ through the retuned Noether sea; the matter-to-sea source uses $E_{\text{sea-coupled}}$. A calculation that uses the raw $\zeta E_{\text{internal}}$ in both roles must report $\mathcal R_{\text{part}}$ as unresolved rather than treating the two uses as independent evidence. This is an exactness condition on one forgetting map. The full internal ledger is first projected to the exposed ledger $\zeta E_{\text{internal}}$, and the probe, sea-coupled, and unresolved channels are further projections of that same exposed ledger. The residual $\mathcal R_{\text{part}}$ measures whether those fibers close back to the once-projected total; it is therefore an anti-double-count rule, not an optional accounting convention.

Define the probe-channel share
$$
\zeta_{\text{probe}}(A)
\equiv
\frac{E_{\text{probe}}(A)}{E_{\text{internal}}(A)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7ce39270e77ce478)
when $E_{\text{internal}}(A)>0$. The raw far-field scalar $\zeta(A)$ names the total exposed ledger before the probe, sea-coupled, and unresolved split. The probe-channel scalar $\zeta_{\text{probe}}(A)$ names only the trace part consumed by the inertial probe formulas below.

---

### Emergent Inertia (Mass) from Shielded Energy

**Inertia** is not fundamental; it is the externally exposed response of an assembly's closed internal causal-history ledger, shielding factor, and Noether sea coupling to changes in bulk motion.

#### Operational Definition of Inertial Mass

For an assembly $A$, define its inertial mass $m_{\text{inertial}}(A)$ operationally via:

- Apply a small external wake potential (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of the response center; in regimes where the effective center-of-mass readout has been justified, denote this acceleration by $\mathbf A_{\text{cm}}$,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{\|\mathbf F_{\text{ext}}\|}{\|\mathbf A_{\text{cm}}\|}.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c454de0e25062cfd)

Because the external wake couples mainly to the probe-facing exposed energy, not the full internal circulation, the scalar roadmap limit is:

$$m_{\text{inertial}}(A) \approx \alpha_{\mathrm{m}}\,\frac{E_{\text{probe}}(A)}{c_{\text{eff}}^2}.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9785ed6d237481f0)

The tensor handoff is more precise. In the formulas below, $\mathcal{Z}_A^{ab}$ is the probe-channel exposure tensor after the exposed-energy partition has been declared; the sea-coupled channel enters through $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$ and the resulting Noether sea response, not as a second direct inertial source. For a small center-of-mass velocity $V_{\text{cm},b}$ through a declared Noether sea response record,
$$
p_{\text{int}}^{a}
\approx
\alpha_{\mathrm{m}}\,\zeta_{\text{probe}}(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}\,
V_{\text{cm},b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1ca96579d18d148e)
with homogeneous isotropic limit
$$
\mathcal{M}_{\text{sea}}^{ab}\to \frac{h^{ab}}{c_{\text{eff}}^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-689a5b7976efc5d1)
A more complete first-order handoff keeps the scalar and trace-free exposure pieces visible. Write

$$
\mathcal{Z}_{A}^{ab}
=
\zeta_{\text{probe}}(A)h^{ab}
+
\mathcal{Z}_{\mathrm{tf}}^{ab}(A),
\qquad
h_{ab}\mathcal{Z}_{\mathrm{tf}}^{ab}(A)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1c295864d52fdb22)

and split the local Noether sea response as

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\frac{1}{c_{\text{eff},0}^{2}}
\left[
(1+\delta\mathcal{M}_{0})h^{ab}
+
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a14b67d3000d9772)

Then the exposed inertial-response tensor is

$$
\mathsf{I}_{A}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A)}{2}
\left(
\mathcal{Z}_{A}^{a}{}_{c}\mathcal{M}_{\text{sea}}^{cb}
+
\mathcal{Z}_{A}^{b}{}_{c}\mathcal{M}_{\text{sea}}^{ca}
\right),
\qquad
p_{\text{int}}^{a}
\approx
\mathsf{I}_{A}^{ab}V_{\text{cm},b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b42a7c80ad55be1)

Its rotational scalar trace is

$$
m_{\mathrm{tr}}(A)
\equiv
\frac{1}{3}h_{ab}\mathsf{I}_{A}^{ab}
=
\alpha_{\mathrm{m}}
\frac{E_{\text{internal}}(A)}{c_{\text{eff},0}^{2}}
\left[
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bc9d01090363429b)

Only in the homogeneous isotropic limit does the scalar mass formula above follow. The trace formula gives a stricter diagnostic: pure exposure anisotropy does not shift scalar mass in an isotropic medium, and pure trace-free medium response does not shift scalar mass for scalar exposure. A scalar mass shift from anisotropy appears only through the contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}$; otherwise the residue remains directional inertia in $\mathsf{I}_{A}^{ab}$. Here $E_{\text{internal}}$ names the large internal energy circulation, while $\zeta_{\text{probe}}(A)$ names the probe-facing share of the small external leakage that survives cancellation and Noether sea shielding. The formula therefore explains weak long-range gravitational and inertial footprints without making the internal energy small: ordinary probes couple to the leaked pattern, not to every internal exchange branch. The trace-free exposure tensor is also the mass-side carrier of orientation and framing leakage. Clock-orientation leakage, Hughes-Drever-style matter anisotropy, and scalar-mass anisotropy should therefore be compared as different contractions of the same branch-emitted trace-free exposure record against different probe or medium-response tensors. If $\mathcal{Z}_{\mathrm{tf}}^{ab}=0$ for an accepted branch in a homogeneous response record, all of these trace-free leakage channels vanish at this order; if it is nonzero, scalar mass remains protected only when the retained medium response has no matching trace-free component.

This scalar trace is admissible as a positive inertial mass only inside the shielding window
$$
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
>
\frac{1}{3}
\left|
\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fbad2ac2378276f1)
with the comparison sea state declared. If a certified $A_0$ branch reports $\zeta_{\text{probe}}$ so small that this inequality fails for plausible $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$ in the accepted environment, the shielded-energy mass map is falsified for that branch. Thus deep probe-channel shielding is a constrained exposure window, not an unconstrained way to suppress all long-range response. When $1+\delta\mathcal{M}_{0}>0$, a conservative sufficient lower bound is
$$
\zeta_{\text{probe}}(A)
>
\frac{
\left\|\mathcal{Z}_{\mathrm{tf}}(A)\right\|_h
\left\|\delta\mathcal{M}_{\mathrm{tf}}\right\|_h
}{
3(1+\delta\mathcal{M}_{0})
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0c71e78a30c3a8e3)
on the same window. More anisotropic exposure therefore permits less deep scalar shielding before the trace response can become zero or negative. Highly anisotropic branches must either reduce their trace-free exposure, keep the medium response nearly isotropic, or leave the scalar-mass regime.

At the matter-to-medium interface, a Standard Model fermion assembly should therefore be treated as a localized source of exposed response, not as an unshielded transfer of all internal energy into the surrounding Noether sea. For a coarse cell $\Omega_\ell$, the source supplied by stable matter assemblies can be written schematically as

$$
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}(\mathbf X,T)
=
\sum_{A\subset\Omega_\ell}
W_\ell(\mathbf X-\mathbf X_A(T))\,
E_{\text{sea-coupled}}(A)
+
S_{\mathrm{aniso}}^{(\ell)}(\mathbf X,T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1191069627ac79ef)

where $W_\ell$ is the coarse-graining window, $\mathbf{X}_A$ is the assembly center, and $S_{\mathrm{aniso}}^{(\ell)}$ records exposed tensor, orientation, spin, or wake-history residue that cannot be collapsed into the scalar shielding factor. This source then perturbs the local Noether sea state through a constitutive response map,

$$
\delta\theta_{\mathrm{sea}}^{(\ell)}
=
\mathcal{C}_{\mathrm{mat}\to\mathrm{sea}}
\left(
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)},
\lambda_A,\xi_A,\mathcal{H}_A,
\theta_{\mathrm{sea},0}^{(\ell)}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-01e8e60015d53f14)

with $\delta\theta_{\mathrm{sea}}^{(\ell)}$ projecting into $n$, $\chi_{\text{sea}}$, $\Gamma_N$, strain, orientation, cadence, and envelope-scale variables. In this language, saying that neighboring Noether braids absorb the exposed potential means that they retune their branch state. Depending on the accepted branch, that retuning may appear as higher cadence, changed strain, stronger alignment, envelope-scale shift, or altered coupling to nearby Noether braids; it should not be compressed into a generic statement that the braids simply gain energy and expand.

This is the same shielding-based logic developed more directly in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md). The matching factor $\alpha_{\mathrm{m}}$ should be fixed only after a calibration-free reference attractor has supplied $E_{\text{internal}}$, raw $\zeta$, $E_{\text{probe}}$ or $\zeta_{\text{probe}}$, the exposed-energy partition, and the medium-response map; it should not be fitted separately to each particle species. Universality is a cross-species invariant, not a notation choice. For any certified assembly $A$, define the back-solved value
$$
\alpha_{\mathrm{m}}(A)
\equiv
\frac{
m_{\mathrm{tr}}(A)c_{\text{eff},0}^2
}{
E_{\text{internal}}(A)
\left[
\zeta_{\text{probe}}(A)(1+\delta\mathcal M_0)
+
\frac{1}{3}\mathcal Z_{\mathrm{tf},ab}(A)\delta\mathcal M_{\mathrm{tf}}^{ab}
\right]
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b2bc9bc06a945d4)
on branches that pass the positivity gate above. For any pair $A,A'$ in the mass-map test set, require
$$
\mathcal R_{\alpha}(A,A')
\equiv
\frac{
\left|\alpha_{\mathrm{m}}(A)-\alpha_{\mathrm{m}}(A')\right|
}{
\left|\alpha_{\mathrm{m}}(A)\right|
+
\left|\alpha_{\mathrm{m}}(A')\right|
}
\le
\epsilon_{\alpha}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0778c4b0460cae13)
with $\epsilon_{\alpha}$ declared before promotion. If this residual cannot be held small without per-species tuning, the universality claim fails and the parameter count must be raised explicitly. On a connected family of realized assembly branches, this is a flatness condition for $\alpha_{\mathrm{m}}$ over the retained moduli. An irreducible jump in the back-solved $\alpha_{\mathrm{m}}$ across different assembly topological charge sectors would not be hidden inside the same symbol; it would mark either a disconnected mass-map family or a failed universality claim for the compared species.

Thermodynamic or entropic derivations of gravitational force are therefore comparison benchmarks for this chapter, not replacements for the mass mechanism. They may sharpen the observer-level equation-of-state target for gravity, but $m_{\text{inertial}}(A)$ is not closed until the same assembly ledger supplies its closed internal causal-history record, shielding extraction, Noether sea response tensor, and acceleration response.

The immediate hand-off is the $A_0$ reference attractor gate. The energy chapter owns the internal-energy and apparent-energy definitions that $A_0$ must report: layer energies, interaction and wake terms, total $E_{\text{internal}}(A_0)$, far-field wake coefficients, $E_{\text{probe}}(A_0)$, $E_{\text{sea-coupled}}(A_0)$, and $\mathcal R_{\text{part}}(A_0)$. Those outputs are still closure targets until a stable branch, shielding extraction, and response tensor are computed. Compact finite-coordinate no-go records and branch-chart checker results cannot be consumed as energy-accounting inputs: a rejection blocks the chart path, and a clearance authorizes only a rerun candidate until Tier 2 shielding exists on an accepted branch.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant motion on a measured fast binary may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

#### Noether Sea and Effective Relativistic Behavior

The Noether sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether sea coupling.
- The proposed mechanism is that the effective resistance to high center-of-mass speed (near the relevant internal Noether braid causal-wake propagation scale) increases steeply, producing an emergent saturation speed scale $c_{\text{eff}}$ at which assemblies effectively saturate. This presupposes stable sea-coupled assemblies, none of which has yet been derived. Its identification with the photon-channel speed is a separate closure.

Thus:

- At low center-of-mass speeds $v_{\text{CM}}\ll c_{\text{eff}}$, the effective readout recovers $E_k \approx \frac{1}{2}m_{\text{inertial}} v_{\text{CM}}^2$ for assemblies.
- At high center-of-mass speeds approaching $c_{\text{eff}}$, internal coupling to the Noether sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}c_{\text{eff}}^2(\gamma_{\text{eff}}-1)$, with $\gamma_{\text{eff}} = 1/\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrino stripping and oblation are failure channels or branch-transition hypotheses to test, not assumed parts of the mass mechanism.

The details of this emergent relativistic law arise from the combined dynamics of the assembly and the Noether sea; they are not postulated but must be confirmed by coefficient extraction, simulation, and matching to known particle kinematics. Ordinary dissipative drag is a failure channel for this program, not the mass mechanism. The mass-side integration and quantitative derivation path is tracked in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md).

---

### Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#energy-momentum-rest-energy)

Here:
- $M_0$ is the assembly rest/internal invariant extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are the total center-of-mass energy and momentum measured from trajectory dynamics.
- $c_{\text{eff}}$ is the isotropic projection of the local Noether sea response-speed record. In weak-field homogeneous and neutral conditions that also pass the two-moment quietness condition above, $c_{\text{eff}}\to c_\infty$, with $c_\infty=c_0$ by observer calibration. The relation between $c_0$ and the primitive wake speed $c_f$ remains the declared hierarchy question in the [speed-role table](../../../../markdown/aaa/foundations/absolute-timespace.md#speed-convention); the active Bell route requires $c_f>c_0$ rather than silently identifying them.

More precisely, the response-speed tensor may be written schematically as
$$
\left(c_{\text{eff}}^2\right)^{ab}
=
c_0^2
\left[
(1+\delta c_0)h^{ab}
+
\delta c_{\mathrm{tf}}^{ab}
\right],
\qquad
c_{\text{eff}}^2
\equiv
\frac{1}{3}h_{ab}\left(c_{\text{eff}}^2\right)^{ab}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c633c02ee1ae0156)
The scalar mass-shell closure is admissible only when the anisotropic propagation correction is bounded,
$$
\left\|\delta c_{\mathrm{tf}}\right\|
\le
\epsilon_{c,\mathrm{tf}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40ad4b4ea6bfb56c)
on the same comparison window. The scalar offset $\delta c_0\to0$ is not assumed by isotropy language alone; it must follow from the same homogeneous neutral summation and screening conditions that make the Noether sea macroscopically quiet.

Equivalent parameterization:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1efcb1026be589f8)

This parameterization must keep rest, motion, and null transport separate. The rest term is the exposed internal ledger $M_0c_{\text{eff}}^2$, not a velocity-dependent rest mass. Motion changes the center-of-mass readout through $\gamma_{\text{eff}}$ and $p_{\text{CM}}$, while the massless photon-channel limit is a separate null closure,
$$
E_\gamma=c_\gamma\|\mathbf{p}_\gamma\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c8abb51062ca1203)
after the photon channel and its speed record have been declared. A calculation that uses the same scalar mass-shell formula to explain a massive assembly, a moving massive assembly, and a photon without naming these three records has collapsed distinct observer-level closures into one slogan.

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../../../../markdown/aaa/philosophy-history/theory-mapping.md#special-relativity-sr)

---

### Energy and Self-Hit in the Noether Sea

In the **super-field-speed** regime ($\|\mathbf V_a\|>1$ somewhere along the relevant path-history interval), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the Noether sea:

- Self-hit repulsion supplies an internal **outward floor** against collapse in Noether braids and more complex assemblies. On the uniform-circular chart it cannot supply centripetal support, and its tangential contribution is signed, so stability requires the other retained branch and wake-boundary entries.
- Under a candidate signed wake account, energy represented in an architrino's causal wake and local Noether sea response would be partially routed back through delayed self-interaction. The exchange between internal kinetic energy and wake/medium energy is candidate bookkeeping pending an accepted signed account on the same causal-root record.

If an accepted causal action with a proved delay-compatible Noether theorem supplies both the acceleration contributions and the signed energy accounts on one provenance-complete record, then global conservation would follow and self-hit would route energy along more complex paths (architrino → causal isochron → local Noether sea → back to architrino/assembly) without net creation or loss. That action, theorem, account construction, pairwise provenance result, and boundary-flux closure remain open; until they close, self-hit routing is a candidate bookkeeping picture rather than an established conservation result.

---

### Intuition (Plain Language)

Inside an assembly, large internal causal-history energy can circulate through many branch channels. Outside the assembly, distant probes couple only to the portion of that ledger that survives phase cancellation, shielding, and Noether sea response.

Architrinos and their assemblies are where the energy bookkeeping lives. The Noether sea is a dense population of high-energy Noether braid assemblies whose net long-range wake response is usually quiet because incoherent contributions cancel and shielded internal rows leak only weakly. In candidate indexed fermion source records, declared support rows screen other rows from the ambient Noether sea. The small residual exposure is what the mass and gravitational-response program must derive; no screening order follows from the persistent indices.

### Summary and Role in the Larger Theory

- **At the architrino level:**

  Kinetic energy and potential energy are defined via the Master EOM. Exact global conservation is a closure target for an accepted causal-action or causal-wake theory with proved same-record signed accounts and boundary closure. For the action route, time-translation symmetry and a symmetry-preserving regularization are necessary but insufficient without a delay-compatible Noether theorem, complete pairwise provenance, and no-double-booking closure. The substrate law is acceleration-first; no particle-specific fundamental mass is assigned to architrinos, and speeds are unbounded in principle. Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**

  Large internal energies, plus coupling to the Noether sea, generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through which declared support rows remain active and how their shielding map changes,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior. Macroscopic quietness follows from superposition and shielding: incoherent populations cancel statistically, while phase-locked assemblies such as collinear breathers preserve localized, non-canceling wake structure.

- **For spacetime and gravity:**

  The sea of small, high-energy Noether braids forms the Noether sea and, at coarse-grained level, the effective spacetime medium whose energy density and stress give rise to an emergent metric. The shielding factors and internal energies of both Noether braids in the Noether sea and "matter" assemblies contribute to:
  - The effective Newton constant $G$,
  - The cosmological Noether sea energy density,
  - How strongly observer-level effective metric response is reconstructed from different kinds of energy.

  Density-driven oblation is a candidate contribution to the effective gravitational-coupling closure: as the Noether sea encounters denser matter, local Noether braids may scale down and oblate, creating a compliance gradient that must be mapped through the Noether sea response tensor before it can be read as part of $G$.

---

### Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a **binding-energy convention** that fixes the zero of potential energy at the **inner turning point** of an accepted bound branch (the maximum-curvature binary (MCB) radius when that branch has been certified). This choice is operational: on a branch with a self-hit lower boundary, the deepest accessible state supplies the reference. The present circular simple-root ledger supplies measured algebraic MCB candidates, not an accepted inner turning point. Until one candidate passes finite-event, retained-history, and stability certification, the energy gauge must use another explicitly declared reference event or radius and may not be described as a derived ground-state zero.

Cosmology inventory prose uses the same convention only after declaring the comparison window. Positive component entries such as matter, radiation, dark-sector bookkeeping, and thermal reservoirs are mass-equivalent or energy-density terms measured relative to that window, while gravitational binding is a negative finite-window contribution. Mixing a local branch convention with a cosmological inventory convention without naming the window and boundary term risks double counting the same retained wake-history energy.

#### Physical Setup and Why a New Zero is Needed

For an accepted attractive bound branch (opposite polarities), the inward motion accelerates until it reaches a **minimum radius** $r_{\min}$ where the certified self-hit and curvature records prevent further collapse. The motion then rebounds or orbits. Unlike a pure Coulomb potential, this branch has a lower bound on radius (and hence on accessible energy states).

Because a lower bound exists, the natural reference is **not** "infinite separation" but the **ground configuration** at $r_{\min}$.

#### The Bookkeeping Convention

We adopt a **singular-boundary gauge**: on a certified branch chart with a declared self-hit lower boundary $r_{\min}$, we fix the potential gauge at this wall. If an MCB branch is later certified, its lower boundary is one candidate realization of this reference. Without such a certified wall, choose and name a conventional reference radius $r_{\mathrm{ref}}$ instead; that gauge supports comparisons within the declared ledger cell but carries no claim that $r_{\mathrm{ref}}$ is a physical minimum.

$$U(r_{\min}) \equiv 0.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-eb4839c3b5a6c05d)

In this gauge, $U(r)$ represents the **accumulated work** performed to separate the binary from its ground state to radius $r$. Total energy is thus partitioned into *kinetic* (motion) and *deformation* (separation) components, with fully separated (unbound) pairs carrying maximal deformation energy $U_{\max} \equiv B_{\max}$.

When the active causal-root ledger changes, this gauge must be indexed by the branch ledger. For ledger cell $b$,
$$
U^{(b)}(r)
\equiv
B_{\max}^{(b)}-B^{(b)}(r),
\qquad
B_{\max}^{(b)}
=
B^{(b)}\!\left(r_{\min}^{(b)}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cd28152abf4b06a2)
so a separator crossing that changes the effective inner wall cannot be counted once as a gauge-origin jump and again as an independent $h$-like energy quantum. At a crossing radius $r_\ast$ between ledger cells $b$ and $b'$, the physical bookkeeping must satisfy
$$
\left[E_{\text{total}}\right]_{b\to b'}
=
K^{(b)}(r_\ast)+U^{(b)}(r_\ast)
=
K^{(b')}(r_\ast)+U^{(b')}(r_\ast)+\Delta_{\text{ledger}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-90adb8aeda556212)
where $\Delta_{\text{ledger}}$ is the declared root-change energy routed through the table entries such as $\varepsilon_3$, $\varepsilon_w$, and the binary-2 adjustment. The visible step is the ledger/gauge matching term; it is not additional to that matching. Thus $U^{(b)}$ is a ledger-indexed potential, and the zero-section can jump when the active causal-root cell changes. A globally consistent energy ledger requires the $\Delta_{\text{ledger}}$ increments to glue around overlaps of ledger cells; otherwise the local potential gauges are individually consistent but the global binding-energy record is multivalued.

#### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4de56cf4b153a741)

Define

$$U(r) = B_{\max} - B(r).$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-176c8c556150fe31)

Then total energy bookkeeping is:

$$E_{\text{total}} = K(r) + U(r), \qquad U(r) \ge 0.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f91f6ff9a16feefa)

At the minimum radius:

$$E_{\text{total}} = K_{\max}, \quad U(r_{\min}) = 0.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-82fb0af67261acf9)

All available mechanical energy is kinetic at the inner turning point. Moving outward converts kinetic energy into potential energy (the rebound / climb-out phase).

#### Effective Potential Language

If an effective potential is used, the centrifugal term and the self-hit barrier both contribute:

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 m_{\text{eff}} r^2} + V_{\text{self-hit}}(r).$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d328e989dfe05eaa)

Here $m_{\text{eff}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not a primitive architrino mass.

The convention above fixes:

$$V_{\text{eff}}(r_{\min}) = 0.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aaaf2218ee120aa3)

This does **not** change dynamics; it sets a physically meaningful reference.

#### Self-Hit Echo and Discrete Steps (Working Note)

In this picture, the self-hit region is **not** assumed to change the local acceleration law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ remains finite and continuous across the retained regularized branch chart.}$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b1b6e0fabff8a2c3)

So the transition between the $v=c_f$ regime and the self-hit regime is a **regularized branch transition**, not a kink in the potential. The distinction shows up in **how action and energy bookkeeping are routed** between binaries, not in a new macroscopic slope.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$. In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](../../../../markdown/aaa/dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

The mechanical event behind such a ledger change can be a caustic-grazing impulse. When a regularized branch crosses a $J=0$ caustic, the pointwise branch expression may become large while the integrated velocity change remains finite, as in [Caustic Transit and Finite Impulse](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse):
$$
\Delta\mathbf{V}_{a,n}
=
\int_{T_n^-}^{T_n^+}
\mathbf{A}_a^{(\eta)}(T)\,dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5b0e0e63d5a78d85)
This finite impulse is a candidate substrate mechanism for changing the active causal-root ledger by a discrete amount without making primitive energy granular.

Thus the candidate quantum of action is geometric bookkeeping: it is the action scale assigned to a threshold crossing of the causal-root ledger. The energy shift appears in steps because the allowed causal intersections have changed discretely, even though the path-history geometry and the local potential slope remain continuous through the regularized fold layer. A closed branch chart must still expose the root-change energy, wake exchange, closure-channel adjustment, and any mismatch routed into unresolved modes.

Working bookkeeping hypothesis:

- Source-record binary 3 registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Source-record binary 2 adjusts to conserve total energy.
- Source-record binary 1 executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because source-record binary 1 is **releasing or reconfiguring retained internal energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$. The assigned transaction, closure, and self-hit roles in this working record are hypotheses; the persistent indices do not carry those meanings in the taxonomy.

#### Candidate Braid as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of this candidate braid record as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to source-record binary 3, binary 2 acts as a closure buffer that maintains overall consistency, and binary 1 can respond with a two-step reconfiguration when the self-hit echo is engaged. These provisional roles do not identify a taxonomy member. The effective response can resemble a geared or ratcheted redistribution, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new candidate braid configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

#### Closed-Cycle Action Bookkeeping Table for the Sub-Field Source Record

This table records one $h$ of closed-cycle action for source-record binary 3 in the sub-field-speed regime $v_3<c_f$.

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $f$ labels a discrete binary-3 orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wave function.
- The transaction is a single closed-cycle action unit, $\Delta A_{\text{cycle}} = +h$, coupled first to source-record binary 3 while $v_3 < c_f$.
- The symbol $h$ labels action per full causal phase cycle. The associated radian-normalized rotational-action increment is $\hbar = h/(2\pi)$; in this local bookkeeping pass $\Delta I$ denotes that angular-momentum/action variable.
- Energy bookkeeping uses action-angle language: for a small discrete step, $\Delta E \approx \omega\,\Delta I = f\,\Delta A_{\text{cycle}}$. This is a **notation choice**, not a claim about the exact micro-law.
- Source-record binary 1 responds with a two-step reconfiguration. Binary 2 adjusts to satisfy conservation of total energy and total angular momentum (including any causal-wake exchange).

Notation in the table:

- $K_3, U_3$ = binary-3 kinetic and potential energies.
- $K_2, U_2$ = binary-2 kinetic and potential energies.
- $K_1, U_1$ = binary-1 kinetic and potential energies.
- Superscripts $(f-1)$, $(f_{\psi})$, and $(f)$ denote the state index (one-step update).

Per-step increments (explicit, no deltas):

- Binary-3 step energy: $\varepsilon_3 \equiv \omega_3 \hbar$ with $$k_3 \equiv \chi_3\,\varepsilon_3,\quad u_3 \equiv (1-\chi_3)\,\varepsilon_3,$$ [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a35196e899147084) so $k_3 + u_3 = \varepsilon_3$.
- Binary-1 step energy: $\varepsilon_1 \equiv \omega_1 \hbar$ with $$k_1 \equiv \chi_1\,\varepsilon_1,\quad u_1 \equiv (1-\chi_1)\,\varepsilon_1,$$ [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b910a5e36da23c3) so $k_1 + u_1 = \varepsilon_1$. Because binary 1 takes **two steps** in this source record, it adds $2k_1$ and $2u_1$.
- Binary-2 adjustment energy: $\varepsilon_2$ is whatever is needed to close the ledger. Here $\varepsilon_w$ denotes the **causal-wake exchange energy** during the step: $$\varepsilon_2 \equiv \varepsilon_w - 2\varepsilon_1,$$ [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3af21b70c4a6036c) and we split it as $$k_2 \equiv \chi_2\,\varepsilon_2,\quad u_2 \equiv (1-\chi_2)\,\varepsilon_2.$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5334a3bc018c97a8)

| State | Binary 3 | Binary 2 | Binary 1 | Notes |
| --- | --- | --- | --- | --- |
| $f-1$ | $K_3^{f-1}$, $U_3^{f-1}$ | $K_2^{f-1}$, $U_2^{f-1}$ | $K_1^{f-1}$, $U_1^{f-1}$ | Baseline. No pending transaction. |
| $f_{\psi}$ | $K_3^{f_{\psi}} = K_3^{f-1} + k_3$<br>$U_3^{f_{\psi}} = U_3^{f-1} + u_3$ | $K_2^{f_{\psi}} = K_2^{f-1}$<br>$U_2^{f_{\psi}} = U_2^{f-1}$ | $K_1^{f_{\psi}} = K_1^{f-1}$<br>$U_1^{f_{\psi}} = U_1^{f-1}$ | Immediate post-hit. <br>Binary 3 receives $\Delta I_3 = +\hbar$ in the initial bookkeeping gauge. <br>Binary 3 records a $(k_3,u_3)$ increment. |
| $f$ | $K_3^{f} = K_3^{f-1} + k_3$<br>$U_3^{f} = U_3^{f-1} + u_3$ | $K_2^{f} = K_2^{f-1} + k_2$<br>$U_2^{f} = U_2^{f-1} + u_2$ | $K_1^{f} = K_1^{f-1} + 2k_1$<br>$U_1^{f} = U_1^{f-1} + 2u_1$ | Post-redistribution. <br>Binary-3 update is complete at $f_{\psi}$; <br>only binaries 2 and 1 continue to settle. |

Constraints to apply across the $f-1 \to f$ transition (bookkeeping level):

- **Angular momentum / rotational action**: the sign rule is gauge-invariant only after declaring the allowed wake share:
  $$
  \Delta I_3+\Delta I_2+\Delta I_1+\Delta I_{\text{wake}}
  =
  +\hbar,
  \qquad
  |\Delta I_{\text{wake}}|
  \le
  \epsilon_w\hbar
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-729564ce33deeadc)
  For a **net positive** transaction, the binary increments must satisfy $\Delta I_a\ge-\epsilon_w\hbar$ for $a\in\{1,2,3\}$. For a **net negative** transaction, the same bound applies with signs reversed. The nonnegative-increment claim is therefore an up-to-wake-tolerance statement, not a gauge-free statement that the wake channel carries exactly zero rotational action.
- **Energy**: $(k_3+u_3) + (k_2+u_2) + 2(k_1+u_1) = \varepsilon_3 + \varepsilon_w$. This is the explicit version of conservation using the per-step increments defined above.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, separator crossings obey the parity rule $\Delta N\in 2\mathbb{Z}$ and $\Delta D=0$; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Cross-ledger gauge matching**: any jump in $r_{\min}^{(b)}$ and $B_{\max}^{(b)}$ is part of the declared $\Delta_{\text{ledger}}$ budget above. A table row may not count the same gauge-origin shift once in $U^{(b)}$ and again as an extra wake or oscillator energy.
- **Smooth slope**: $dU/dr$ remains continuous across the graft; the discrete behavior comes from **state updates**, not a kink in $U(r)$.

This table is intentionally explicit: every $h$ closed-cycle action transaction is represented by a radian-normalized $\hbar$ rotational-action increment, split into a kinetic part ($k$) and a potential part ($u$). The remaining freedom is **how** each binary partitions its step (the $\chi$ fractions) and how binaries 2 and 1 plus the causal-wake channel redistribute the initial binary-3 coupling in this source record.

#### Comparison to Coulomb and Standard Conventions

In pure Coulomb,

$$V(r) = -\frac{k q^2}{r},$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-84d9060789dea048)

so there is no inner bound and no natural finite zero. Classical mechanics therefore chooses $V(\infty)=0$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a certified hard inner bound **supplies** a natural zero at $r_{\min}$, which is the lowest accessible state. The bookkeeping therefore switches from "energy relative to infinity" to "energy relative to the ground state."

#### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | max | 0 | Fully bound (ground) |
| $r > r_{\min}$ | $\downarrow$ | $\uparrow$ | Climbing out / rebound |
| escape limit | 0 | $B_{\max}$ | Free (unbound) |

#### One-Line Rule

If the model has a hard inner bound, **set the potential zero at that bound** and measure all energies outward from it.

**Adiabatic branch invariant target.** On a certified branch chart for binary layer $a$, suppose an accepted action supplies a canonical pair $(Q_a,\Pi_a)$ for the reduced cycle and the branch has a slowly varying parameter $\lambda(T)$, such as a local Noether sea response variable, shielding parameter, or neighboring-layer phase parameter. The existence of this canonical pair is itself unestablished pending that accepted action, so the invariant target below is conditional on both the action and the adiabatic hypotheses. Define the rotational action
$$
I_a(\lambda)
\equiv
\frac{1}{2\pi}
\oint_{\gamma_a(\lambda)}
\Pi_a\,dQ_a
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-22dd0aed2ee55168)
If the parameter changes slowly compared with the cycle period $T_a(\lambda)$,
$$
\epsilon_{\mathrm{ad},a}
\equiv
\max_{T\in W}
\left(
T_a(\lambda(T))\,
\left\|\frac{d\lambda}{dT}\right\|\,
\ell_{\lambda}^{-1}
\right)
\ll1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cb93cafc55af9651)
and the path remains a positive distance from the causal-root ledger-cell boundary,
$$
\operatorname{dist}\!\left(\gamma_a(\lambda),\partial\mathcal{G}_a\right)
\ge
\delta_{\text{cell}}
>
0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c550a86d8d431b5)
the interior adiabatic theorem target is
$$
\frac{dI_a}{dT}
=
O(\epsilon_{\mathrm{ad},a})
+
\mathcal{R}_{\mathrm{int},a}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d1710e1ccb8d3aa2)
Here $\ell_{\lambda}$ is the declared scale over which the reduced Hamiltonian changes appreciably, and $\mathcal{R}_{\mathrm{int},a}$ records omitted wake-history exchange, non-characteristic boundary leakage, or small chart error while the branch stays inside one ledger cell. At a separator crossing or root-fold boundary, the interior estimate is void. The crossing rule is instead
$$
\Delta I_a\big|_{\mathrm{fold}}
=
\frac{1}{2\pi}
\left(
\oint_{\gamma_a'}\Pi_a\,dQ_a
-
\oint_{\gamma_a}\Pi_a\,dQ_a
\right)
=
\Delta I_{\mathrm{ledger},a}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aebe9d3eb2270c88)
where $\Delta I_{\mathrm{ledger},a}$ is the declared quantized ledger increment associated with the change in active causal-root multiplicity or branch chart. Thus the action variable is expected to drift only adiabatically inside a ledger cell, while a root-ledger transition may produce the discrete $\Delta I$ recorded above. This turns the $h$-like bookkeeping into a branch-boundary invariant target rather than an assumption that energy itself is quantized at the primitive level. In this form, an $h$-like action transaction is the finite phase-space area jump across a root-fold wall, not a primitive grain of energy. The floor $\delta_{\text{cell}}>0$ is the adiabatic validity condition: inside the cell the action is nearly invariant; at the wall the fold impulse, ledger update, and cross-ledger gauge matching must be booked together on the same retained branch record.

## Action-Energy

### Action Model

This note compares three modeling options for the emission-propagation-interaction pipeline and recommends a primary approach, with supporting roles for the others. We work in normalized wake-speed units with $c_f=1$ unless stated otherwise; emission cadence and per-wavefront amplitude are constant at the transmitter; per-hit accelerations are directed along $\hat{\mathbf{r}}$ with inverse-square geometric decay and transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; $H(0)=0$ excludes the coincident-time self-kick; no cross products or right-hand-rule terms appear.

---

**Setup / assumptions**

* The transmitter is at position $\mathbf X_t(T)$ in 3-D space and may move.
* The transmitter emits **thin causal wake surfaces**. Each wake surface is created at a single instant $T_t$ and then expands outward **spherically** from the creation point.
* The wake surface radius after emission time $T_t$ is

  $$
  r(T,T_t) = c_f\,(T-T_t) \quad \text{for } T\ge T_t
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6d62a72cb059c662)

  where $c_f$ is the constant **field speed**.
* Each emitted wake surface carries a **strength** $Q$, interpreted here as wake-surface amplitude. Its physical bookkeeping role depends on the comparison target: polarity, potential impulse, energy, or another declared quantity.
* Continuous source term (preferred): model the transmitter as a moving point injection with time-density $q(T)$ (amplitude per unit time) at its instantaneous position, i.e., $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$. Each instant $T_t$ contributes a causal wake surface; we do not count “wake surfaces per second” (pulse trains are merely numerical surrogates).
* The diagnostic target is the effective scalar potential $\phi(\mathbf X,T)$ produced at any point $\mathbf X$ and time $T$.
* Global neutrality (working hypothesis): on large scales the total architrino polarity inventory sums to zero (equal counts of $\pm\epsilon$); use this as the default boundary condition in PDE/Green’s-function comparisons.

We compare three frameworks: (1) a time-domain PDE source term, (2) an integral/Green's-function path-history solution, and (3) event-driven radial transport plus the per-hit EOM. For each, we define symbols, show how the expanding causal wake surfaces appear, discuss how slowing or stopping the transmitter is handled, and weigh trade-offs to inform a recommendation.

---

#### Time-based PDE (wave equation with a moving point source term)

**Physical idea:** keep the mathematical source term as an injection per unit time at the transmitter location, put that into a PDE surrogate for causal wake propagation at speed $c_f$, and let the PDE produce expanding spherical causal wake surfaces. This is a standard grid formulation; its cost and accuracy still have to be measured for the declared domain and resolution.

##### PDE model

Use the scalar wave equation as a continuum comparison surrogate for finite-speed causal-wake reconstruction. The source normalization below is chosen so its free-space Green function has the $1/(4\pi r)$ convention used later:

$$
\boxed{\;\frac{\partial^2 \phi}{\partial T^2}(\mathbf X,T) - c_f^2 \,\nabla^2 \phi(\mathbf X,T) \;=\; c_f^2 S(\mathbf X,T)\;}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b7443792b3fc11a9)

**Symbols**

* $\phi(\mathbf X,T)$: scalar potential surrogate at position $\mathbf X\in\mathbb{R}^3$ and time $T$.
* $c_f$: field propagation speed (units length/time).
* $\nabla^2$: Laplacian operator in space (sums second spatial derivatives).
* $S(\mathbf X,T)$: source term (right-hand side) — this is how the transmitter injects wake surfaces into the field.

##### Moving point source-term form

Use a continuous time-density of emission at the moving point:

$$
S(\mathbf X,T) \;=\; q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f2d9279a5d05f9d6)

Here $q(T)$ has units “amplitude per unit time.” The finite-speed wave operator then generates outgoing spherical causal wake surfaces automatically; no discrete wake surface count is assumed.

**How expanding causal wake surfaces appear**

* The source term does not explicitly insert a radius into the right-hand side. Instead, the PDE and the finite speed $c_f$ cause any instantaneous injection at the point $\mathbf X_t(T_t)$ to produce an outgoing spherical causal wake surface whose front moves outward at speed $c_f$. That is the built-in behavior of the wave-equation surrogate.
* The Green’s function ensures that, at $(\mathbf X,T)$, only simple causal roots satisfying $T-T_t=r(T_t)/c_f$ contribute. A moving or super-field-speed transmitter can supply more than one such root. Thus Method 1 with $S(\mathbf X,T)=q(T)\delta(\mathbf X-\mathbf X_t(T))$ yields finite-speed outgoing support, while the root multiplicity remains part of the path-history geometry.

**Why $\|\mathbf V\|$ (transmitter speed) does not cause blow-ups**

* If the transmitter slows or stops, $S(\mathbf X,T)$ remains nonzero at the same spatial location; the wave equation spreads each injection outward at speed $c_f$. No $1/\|\mathbf V\|$ singularity appears because the formulation does not convert from per-time emission to per-distance emission.
* Numerically, represent the point delta by a small, smooth kernel when avoiding grid artifacts. For example, instead of $\delta(\mathbf X-\mathbf X_t)$ use a small Gaussian of width $\sigma$ comparable to grid spacing.

**Numerical recipe (simple)**

* Choose spatial grid $\mathbf X_i$ and time step $\Delta T$ satisfying CFL stability (roughly $c_f\Delta T/\Delta X \le \text{const}$).
* Use a standard finite-difference time stepping for the wave equation (centered difference in time and space).
* At each time step $T_n$ add the source contribution $S(\cdot,T_n)$ to the right-hand side at the grid cells nearest $\mathbf X_t(T_n)$. If the transmitter stops, it remains injecting at that grid location—the solver propagates outgoing wake surfaces.
* To avoid a numerical spike, spread the delta over a few cells with a mollifier, representing a thin wake surface of finite thickness.

**Summary for Method 1**

* Model is explicit, straightforward, numerically robust.
* Emission is naturally time-based; wake surfaces expand automatically at speed $c_f$.
* No division by transmitter speed appears; stopping the transmitter is handled simply by keeping the source term at the same location.

---

#### Integral (Green’s function / path-history potential) approach

**Physical idea:** instead of evolving a PDE in time, write the solution as the sum of contributions from every past emission. For the wave equation the contribution from an impulse emitted at time $T_t$ and place $\mathbf X_t(T_t)$ arrives at a field point $\mathbf X$ only at the **path-history time** when the causal wake surface reaches $\mathbf X$. The Green’s function neatly encodes the expanding causal wake surface.

##### Fundamental formula (general)

If the wave equation is

$$
\frac{\partial^2 \phi}{\partial T^2} - c_f^2 \nabla^2 \phi = c_f^2 S(\mathbf X,T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1735c6072eb804c0)

then the solution may be written as the space–time convolution with the Green’s function $G$:

$$
\boxed{\;\displaystyle \phi(\mathbf X,T)
\;=\;
\iint G\big(\mathbf X,T;\mathbf Y,T_t\big)\;S(\mathbf Y,T_t)\;dT_t\,d^3Y\;}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b6aacae5e98e622d)

* $G(\mathbf X,T;\mathbf Y,T_t)$ is the response at $(\mathbf X,T)$ to an instantaneous unit impulse at $(\mathbf Y,T_t)$.

##### The 3-D free-space wave Green’s function

For three spatial dimensions (the usual case for causal wake surfaces), the causal Green’s function is

$$
G(\mathbf X,T;\mathbf Y,T_t)
\;=\;
\frac{\delta\!\big(T-T_t - \tfrac{\|\mathbf X-\mathbf Y\|}{c_f}\big)}{4\pi\,\|\mathbf X-\mathbf Y\|},
\qquad T>T_t
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8217f0db27be9e8e)

**Interpretation:** a unit impulse at location $\mathbf Y$ and time $T_t$ influences $\mathbf X$ at time $T$ only when the travel time $\|\mathbf X-\mathbf Y\|/c_f$ has elapsed; the $1/(4\pi r)$ factor is the usual geometric decay of an outgoing spherical wave in 3D.

##### Plugging in a moving point source term

If the transmitter supplies a moving point source term with time-dependent amplitude $q(T_t)$ at location $\mathbf X_t(T_t)$, then $S(\mathbf Y,T_t)= q(T_t)\,\delta(\mathbf Y-\mathbf X_t(T_t))$. Plugging this into the convolution gives an integral over $T_t$ only:

$$
\boxed{\;\displaystyle
\phi(\mathbf X,T) \;=\; \int_{-\infty}^{T}
\frac{q(T_t)\;
\delta\!\big(T-T_t - \tfrac{\|\mathbf X-\mathbf X_t(T_t)\|}{c_f}\big)}
{4\pi\,\|\mathbf X-\mathbf X_t(T_t)\|}\; dT_t\;}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6e6292bf1f2b171a)

* $q(T_t)$ is the continuous emission density per unit time at the emission instant $T_t$. For a steady transmitter, $q(T_t)=q_0$ (constant); more generally, $q$ may vary smoothly with $T_t$.

##### Evaluating the integral — the path-history time

The $\delta$-function in the integrand enforces the *path-history-time condition*:

$$
T-T_t=\frac{r(T_t)}{c_f}, \qquad r(T_t)\equiv\|\mathbf X-\mathbf X_t(T_t)\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fb1ccbe031c60bee)

So the contribution to $\phi(\mathbf X,T)$ comes only from times $T_t$ such that the expanding causal wake surface emitted at $T_t$ has just reached $\mathbf X$ at time $T$.

Mathematically, use the identity $\delta(g(T_t))=\sum_i \delta(T_t-T_{t,i})/|g'(T_{t,i})|$ where $T_{t,i}$ are simple roots of $g$. With $g(T_t)=T-T_t - r(T_t)/c_f$ we find (after algebra) the standard path-history solution:

$$
\boxed{\;
\phi(\mathbf X,T) \;=\; \sum_{T_{t,i}}
\frac{q(T_{t,i})}{4\pi\,r(T_{t,i})\,\big|1 + \tfrac{1}{c_f}\,r'(T_{t,i})\big|}
\;=\;
\sum_{T_{t,i}}
\frac{q(T_{t,i})}{4\pi\,r(T_{t,i})\,\big|1 - \tfrac{\mathbf{n}(T_{t,i})\cdot\mathbf V_t(T_{t,i})}{c_f}\big|}\;}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e747c94dfd869141)

where:

* the sum runs over **path-history times** $T_{t,i}$ solving $T-T_{t,i}=r(T_{t,i})/c_f$ (usually there is a single relevant root).
* $r(T_{t,i})=\|\mathbf X-\mathbf X_t(T_{t,i})\|$.
* $r'(T_t)=\dfrac{d}{dT_t}\|\mathbf X-\mathbf X_t(T_t)\|=-\,\mathbf{n}(T_t)\cdot\mathbf V_t(T_t)$.
* $\mathbf V_t(T_t)=\dfrac{d\mathbf X_t}{dT_t}$ is the transmitter velocity at emission time $T_t$.
* $\mathbf{n}(T_t) = \dfrac{\mathbf X-\mathbf X_t(T_t)}{r(T_t)}$ is the unit vector pointing from the transmitter at emission to the field point.

In standard wave-equation solutions, a Jacobian factor $|1 - \mathbf{n}\!\cdot\!\mathbf V_t/c_f|$ arises from the change of variables used to evaluate the path-history-time delta. In this project's canonical per-hit law, emission cadence and per-wavefront amplitude are constant and do not depend on transmitter speed. The same transmitter-side factor controls root transversality, while the active acceleration weight is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. The receiver-side factor $D_r$ is retained separately for signed root playback; it does not multiply the instantaneous acceleration.

##### Special simple case — stationary transmitter

If $\mathbf X_t(T_t)=\mathbf X_0$ (transmitter fixed) and $q(T_t)=Q\,\delta(T_t-T_{t,0})$ (single wake surface at $T_{t,0}$), then the formula reduces to the intuitive result:

* The field at $(\mathbf X,T)$ is nonzero only when $T-T_{t,0}=\|\mathbf X-\mathbf X_0\|/c_f$, i.e., when the causal wake surface of radius $r=c_f(T-T_{t,0})$ reaches $\mathbf X$.
* The amplitude is $\displaystyle \phi(\mathbf X,T) = \frac{Q}{4\pi\,r}$ (no extra Jacobian factor because $v_s=0$).

##### How wake surfaces show up here

* Each emitted wake surface corresponds to one emission time $T_t$. The delta in the Green’s function selects the observation times $T$ at which the wake surface reaches $\mathbf X$.
* The shape of the contribution is the $1/(4\pi r)$ geometric factor for wave amplitude; the wake surface is thin in time if $q(T_t)$ is a delta in $T_t$, so the receiver gets a short impulse when the wavefront passes.

##### Handling a transmitter that stops / $\|\mathbf V_t\|\to 0$

* If the transmitter slows or stops, the Jacobian factor $1-\mathbf n\cdot\mathbf V_t/c_f$ tends to $1$ and nothing singular happens. The path-history equation still has a solution and each wake surface arrives at the predicted time.
* If the transmitter sits still and emits many wake surfaces (continuous $q(T_t)$), the field is the time integral or sum of all wake-surface contributions evaluated at their respective causal times. No $1/\|\mathbf V_t\|$ blowup occurs.

---

#### Event-driven Radial-Transport + Per-Hit EOM (Canonical Method)

Physical idea: represent emission as a conserved, razor-thin causal wake surface (a measure on the causal isochron), then drive particle motion by summing line-of-action per-hit accelerations with transmitter-side acceleration weight at causal intersection times. Numerical instantiations use $c_f=1$; symbolic derivations retain $c_f$ where its dependence matters.

Field representation (transport/continuity form)
- Source impulse at $(T_t,\mathbf X_0)$ creates a wake surface supported on $r = c_f(T-T_t)$ with surface density that conserves a constant per-wake surface amplitude $q$:
  $$
  \rho(T,\mathbf X) \;=\; \frac{q}{4\pi r^2}\,\delta\!\big(r - c_f(T-T_t)\big)\,H(T-T_t),\quad r=\|\mathbf X-\mathbf X_0\|
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2b7111dd5480ce0b)
- This solves the radial continuity (transport) equation
  $$
  \partial_T \rho + \nabla_{\mathbf X}\!\cdot\!\big(c_f\,\hat{\mathbf{r}}\,\rho\big) \;=\; q\,\delta(T-T_t)\,\delta^{(3)}(\mathbf X-\mathbf X_0)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-206248c4dd4c66c3)
- A continuous emission density is obtained by integrating these impulse responses over $T_t$ with $q(T_t)\equiv q_0$.

Per-hit equation of motion (EOM)
- For a receiver $o'$ at reception time $T_r$ and a transmitter $j$, causal emission times satisfy
  $$
  \|\mathbf X_{o'}(T_r) - \mathbf X_j(T_t)\| = c_f\,(T_r-T_t),\qquad T_t<T_r
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ba3fb2308de0f62e)
- Each root contributes a line-of-action acceleration
  $$
  \mathbf A_{o'\leftarrow j}(T_r;T_t)
  \;=\;
  \kappa\,\sigma_{q_j q_{o'}}\,\frac{|q_j q_{o'}|}{r^2}\,
  W_{o'j}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}},
  \quad
  \hat{\mathbf{r}}=\frac{\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)}{r},\ r>0
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-257a5ab02e2be0c7)
  with $W_{o'j}^{\mathrm{acc}}=c_f/\lvert D_{t,o'j}\rvert$, $D_{t,o'j}=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}$, and $D_{r,o'j}=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf{r}}$. Total acceleration is the sum over transmitters and roots. Convention $H(0)=0$ removes the instantaneous self-kick at zero delay. Optional mollification replaces $\delta(\cdot)$ by $\delta_\eta(\cdot)$ to produce smooth acceleration contributions.

Implementation checklist
- Root finding: solve $F(T_t;T_r)=\|\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0$ for all transmitters $j$ (including $j=o'$ for self-hits when kinematics permit).
- Accumulation: compute $r,\hat{\mathbf{r}}$, $D_t$, $D_r$, and $W^{\mathrm{acc}}$, apply $W^{\mathrm{acc}}/r^2$, then superpose.
- Time stepping: impulsive mode (events) or mollified mode ($\eta>0$) with a delayed-history integrator that retains and interpolates the required path segment.
- Self-interaction: a super-field-speed history interval nominates the channel, but an admitted self-hit still requires a nonzero-delay same-transmitter root and the declared branch floors; accepted self-hits are repulsive (like-on-like).

Relation to Methods 1 and 2
- This is a transport/continuity model, not the scalar wave equation. The $1/r^2$ factor is a surface-density normalization (Gauss-like on the spherically expanding causal wake surfaces); it is compatible with conserving total emission per wake surface. In Method 2 the $\!1/(4\pi r)$ factor appears for a wave amplitude; taking gradients connects these scalings when mapping to accelerations.
- The Doppler-type Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_t/c_f$ from Method 2 is the transmitter-side branch-transversality factor. Geometric constants are absorbed into $\kappa$ by convention, but the canonical per-hit strength uses the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; no additional transmitter-speed amplitude factor is introduced.
- Numerically, this method targets particle dynamics directly (per-hit ODEs) rather than evolving a full field (Method 1) or evaluating fields at sparse probes (Method 2).

Operator diagnostics (finite-window checks)
- Use vector-calculus identities only on declared, reconstructed diagnostic channels such as $\nabla\Phi_\eta$ or the mollified transport current $\mathbf{J}_\eta=c_f\,\hat{\mathbf{r}}\,\rho_\eta$. These channels are validation objects, not new substrate ontology.
- For any finite control volume $V\subset\Sigma_T$ with outward unit normal $\hat{\mathbf{n}}$, define the Gauss residual
  $$
  R_G[V,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e42c5aa6dbc91b27)
- For any oriented smooth surface $S\subset\Sigma_T$ with boundary $\partial S$, define the Stokes residual
  $$
  R_S[S,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot d\mathbf X-\int_S(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf X\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-01ccdd4818c686c6)
- A PDE surrogate and event-root reconstruction are comparable only after a common observable map, normalization, boundary condition, and regulator have been declared. Their agreement then tests the implementations of that declared map; it is not independent evidence for the canonical acceleration law. If $\Delta\mathbf{Y}_\eta=\mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta)$, use
  $$
  E_{\mathrm{op}}(V,S,T)\equiv
  \max\!\left\{R_G[V,T;\Delta\mathbf{Y}_\eta],\,R_S[S,T;\Delta\mathbf{Y}_\eta]\right\}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a73f55aca07554f3)
  For the conservative potential channel $\mathbf{Y}_\eta=\nabla\Phi_\eta$, nonzero circulation is a numerical, boundary, or coordinate-operator error unless a non-gradient effective channel has been explicitly declared.

Plain language: treat the potential contribution as a conserved amount spread over a growing causal wake surface. When a wake surface reaches a receiver, the receiver gets a straight-line push that falls off like $1/r^2$; the calculation may treat it as a sharp kick or as a short, smooth nudge.

#### Cross-Method Guidance

##### Cross-Method Selection
- Method 1 (PDE): whole-field grid simulations, visualization, and complex media/boundaries. Deposit a smeared source term each step; robust when a transmitter slows or stops. Aggregate particle data to coarse-grained densities $n(\mathbf X,T)$, $\rho(\mathbf X,T)$, and $\mathcal E(\mathbf X,T)$ as inputs/targets for PDE runs and validation.
- Method 2 (Green’s function / path-history integral): closed forms and sparse probe evaluation. Enforce the path-history condition $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ during evaluation; root-solve one or more $T_t$ values per observer-time pair.
- Method 3 (Event-driven canonical): production many-body dynamics. Find causal roots and sum per-hit $W^{\mathrm{acc}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

Short worked example — stationary transmitter, continuous source term (consistent across methods)
- Setup: transmitter at origin $\mathbf X_t=0$ with $q(T)\equiv q_0$ (constant).
- Method 1: for a source active since $T_0$, solving the wave PDE with $S(\mathbf X,T)=q_0\,\delta(\mathbf X)H(T-T_0)$ gives $\phi(r,T)=q_0H(T-T_0-r/c_f)/(4\pi r)$ under the declared normalization.
- Method 2: the path-history formula gives the same switched-on profile, with the path-history time $T_t=T-r/c_f$ admitted only when $T_t\ge T_0$.
- Method 3: the path-history condition selects the single causal time $T_t=T-r/c_f$; the per-hit EOM yields one radial push along $\hat{\mathbf{r}}$ with $1/r^2$ scaling, consistent with taking spatial gradients of the $1/r$ potential to connect amplitude to acceleration.

Practical implementation notes (concise)
- PDE: smear $\delta(\mathbf X-\mathbf X_t)$ to grid scale; enforce CFL ($c_f\,\Delta T/\Delta X$ within the scheme’s bound).
- Path-history: robust root-finding for $T_t$ from $T-T_t=r(T_t)/c_f$; take care near grazing geometries where $1-\mathbf{n}\cdot\mathbf V_t/c_f$ is small.
- Event-driven: bracket causal roots for continuity, optionally use $\delta_\eta$ for smooth pushes, and limit step sizes so only a controlled number of mollified wake surfaces overlap.

##### Operational Summary
- Model the transmitter through the source term $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$ (time-based emission density).
- Use Method 3 as the primary dynamics engine; use Method 2 for declared-normalization and implementation spot checks; use Method 1 for whole-field or comparison-media studies.
- After the normalization and observable map are fixed, all three coincide on the declared stationary comparison case. That shared construction checks implementation parity, not the truth of the common rule.

---

#### Differential analysis (criteria-by-criteria)

Axiomatic fidelity (delayed-only, line-of-action, constant transmitter emission)
- Method 1: Partially aligned. The PDE yields $1/(4\pi r)$ wave amplitudes; mapping to $1/r^2$ per-hit accelerations requires gradients and conventions. Radial-only action is not built-in.
- Method 2: Causality and superposition are exact; amplitudes are $1/(4\pi r)$ with a transmitter-side Jacobian $\left|1-\mathbf{n}\cdot\mathbf V_t/c_f\right|^{-1}$ when evaluating the path-history time delta. The canonical law keeps the corresponding transmitter-side factor as root-transversality data, while received acceleration magnitude uses $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ and overall geometric normalizations are absorbed into $\kappa$ when comparing accelerations.
- Method 3: Exact match. Delayed-only, line-of-action per-hit with constant transmitter emission is native, and the transmitter-side acceleration weight appears explicitly in the received acceleration magnitude. Geometric normalizations are conventionally absorbed into $\kappa$.

Causal root structure, self-interaction, multiplicity
- Method 1: Self-hits and multiple roots are implicit in the evolving field; they are not directly enumerated as discrete events.
- Method 2: Causal roots arise via solving $T-T_t=r(T_t)/c_f$; multiple roots and tangencies are explicit but require robust root-finding.
- Method 3: Roots are primitive; multi-hit and self-hit regimes are treated natively. Conventions H(0)=0 and exclusion of $r=0$ beyond $T_t=0$ are explicit.

Energetics and work
- Method 1: Continuum energy bookkeeping is natural ($\phi$, $\partial_T\phi$, $\nabla_{\mathbf X}\phi$). Mapping to radial per-hit work needs careful averaging and alignment with the EOM.
- Method 2: Exact potentials in free space; gradients give acceleration contributions; care is needed near $\left|1-\mathbf{n}\cdot\mathbf V_t/c_f\right|\to0$ geometries.
- Method 3: Energetics are tested via $\eta$-mollified potentials $\Phi_\eta$ and work–energy residuals on resolved windows. An impulsive $\eta\to0$ claim requires a separate weak-convergence result with stable root identity.

Numerical stability and well-posedness
- Method 1: CFL constraints; dispersion/reflection control needed; robust under regularized sources; well posed on grids.
- Method 2: Stable as an evaluation formula; computational issues concentrate in robust, multi-root solving and handling near-tangency Jacobians.
- Method 3: Event handling or $\eta$-regularization supplies a candidate numerical chart. Well-posedness still requires the declared history class, root floors, continuation bounds, and regulator-refinement checks.

Computational scaling
- Method 1: Work and storage scale with grid volume, spatial resolution, duration, and the CFL-limited step count.
- Method 2: Work scales with receivers × sample times × transmitters × causal roots, plus the cost of root solving.
- Method 3: Work scales with receivers × transmitters × active roots per step and with retained-history reconstruction. Actual wall time and memory must be profiled for the declared implementation.

Boundaries, media, and heterogeneity
- Method 1: Natural for comparison media and boundaries—modify effective coefficients such as $c_{\mathrm{eff}}(\mathbf X,T)$, damping, and boundary data without changing the primitive wake speed $c_f$.
- Method 2: Natural only in homogeneous free space; complex media/boundaries require bespoke Green’s functions.
- Method 3: Natural in free space. Media/boundaries need additional modeling (e.g., corridor-level effective rules); not PDE-native.

##### Observables and Inference
- Method 1: Full-field pictures aid intuition and corridor studies but obscure per-hit ambiguity without extra processing.
- Method 2: Clarifies causal timing and geometry at probes; good for inference templates and surrogate-location recasts.
- Method 3: Directly aligned with hit histories $\{A(T_k),L(T_k)\}$ and therefore the most direct substrate representation among these three options.

Summary (one line each)
- Method 1: Best for whole-field, media, and visualization; poorest fit to per-hit radial-only axioms without translation layers.
- Method 2: Best for exact, pointwise analysis of the scalar-wave surrogate in free space; useful for declared-normalization and sparsely sampled implementation checks.
- Method 3: Native choice for many-architrino and assembly dynamics under the canonical law.

Operational guidance — when to use which method
- Method 1 (PDE): use this for whole-field grid simulations, visualization, and complex media or boundaries; step the wave PDE forward with a smeared source term. Robust when a transmitter slows or stops.
- Method 2 (Path history integral): use this for closed forms, analytic insight, or sparse probe evaluation; enforce the path-history condition $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ in evaluation; solve one root per observer-time pair in slow-motion, more if transmitters move fast.
- Method 3 (Event-driven canonical): use this for production many-body dynamics; find causal roots and sum per-hit $W^{\mathrm{acc}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

#### Pros and cons (comparative)

Method 1 — Time-based PDE (wave equation)
- Pros
- Physically standard propagation at fixed speed $c_f$; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
- Cons
  - Computationally heavy for many-particle dynamics (3D grids, CFL constraints).
  - Requires careful numerics to avoid dispersion/reflection; mesh choices can bias results.
  - Mapping grid fields to the radial-only per-hit ODE can add another modeling layer.

Method 2 — Green’s function (path-history integral)
- Pros
  - Exact for the declared scalar-wave comparison problem in homogeneous free space; no grid or time stepping for that surrogate field.
  - Makes causality explicit via path-history times; captures Doppler/Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_t/c_f$ automatically.
  - Efficient for field evaluation at a few observation points; excellent for analysis and cross-checks.
- Cons
  - Requires root-finding for each receiver-time pair; multiple roots are possible when transmitters outrun wake surfaces.
  - Costly when many receivers and transmitters are present; bookkeeping grows quickly.
  - Needs careful handling near tangencies (small Jacobians) and in multi-hit/self-hit regimes.

Method 3 — Event-driven radial-transport + per-hit EOM (canonical)
- Pros
  - Directly implements the project’s delayed, radial-only interaction law with constant emission cadence.
  - Natural support for self-hits and superposition; local $1/r^2$ weighting makes nearby coherent roots dominate once the far-field cutoff, screening, cancellation, or summation prescription is declared.
  - Numerically lightweight for particle dynamics; works cleanly with impulsive or mollified ODE integration.
- Cons
  - Not derived from the scalar wave equation; global field-energy accounting is indirect (via mollified potentials).
  - Must retain the transmitter-side factor and transmitter-side acceleration weight from the Master EOM; a reduced test harness that omits either one is a noncanonical approximation rather than a calibration of $\kappa$.
  - Accuracy depends on robust causal-root finding and regularization choices in complex multi-hit scenarios.

---

#### Recommendation

- Use Method 3 as the primary engine for architrino and assembly dynamics. It directly implements radial-only action and constant emission cadence.
- Adopt Method 2 as an analytic comparison instrument for the scalar-wave surrogate. Fix normalization on the stationary-transmitter case, then verify that the moving-source Jacobian maps once, and only once, to $W^{\mathrm{acc}}$ under the declared observable map. Because both methods share that map, their agreement is implementation parity rather than an independent oracle.
- Baseline formula (stationary transmitter at origin): with $q(T)\equiv q_0$, $\displaystyle \phi(r,T)=\frac{q_0}{4\pi r}$ since the path-history condition selects $T_t=T-r/c_f$; if $q$ varies, $\displaystyle \phi(r,T)=\frac{q(T-r/c_f)}{4\pi r}$.
- Reserve Method 1 for full-field studies (visualization, media, boundary effects) and for end-to-end tests of numerical stability; it is valuable but unnecessary for routine ODE-based assembly simulations.
- Keep the continuity-form wake definition and per-hit EOM as the canonical statement. Any density-to-potential comparison must declare the operator that maps the $1/r^2$ surface measure to the $1/r$ scalar surrogate, including normalization and boundary conditions.
- Numerical cautions:
  - Always smear $\delta(\mathbf X-\mathbf X_t)$ to a normalized kernel of width $\sigma$ comparable to the grid spacing in PDE runs to avoid grid-scale artifacts.
  - Enforce CFL: choose $\Delta T$ so that $c_f\,\Delta T/\Delta X$ meets the stability bound for the chosen stencil to prevent instability.
  - Path history solving: solve $T-T_t=r(T_t)/c_f$ carefully; near $\|\mathbf V_t\|\approx c_f$, root finding and the factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ require extra care.
  - Finite temporal thickness: if wake surfaces have duration, replace $\delta(T-T_t)$ with a smooth profile to model finite-width wavefronts.

Plain language: use the event-driven, radial-only method for dynamics, use the path-history integral to check the declared comparison map, and use the PDE when the calculation needs whole-field pictures or explicitly modeled comparison media.

Recap
- Model the transmitter through the source term $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$ (time-based emission density).
- Method 1: easiest for grid-based whole-field runs; wake surfaces emerge at speed $c_f$.
- Method 2: exact path-history formula; contributions occur only when $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$, with amplitude decaying as $1/(4\pi r)$ and a geometric $1-\mathbf{n}\cdot\mathbf V_t/c_f$ factor in evaluation.

The comparison ends at propagation and acceleration-method selection. Particle-penetration, shielding, neutrino, photon, and dark-sector claims require their own assembly records and observer-level instruments; this method note does not assign those outcomes.

#### Sibling Derivation Notes

This note is the hub of the action-energy derivation set. The companion notes develop the individual pieces:

- [Background and Simple Action](../../../../markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md) and [Analytic Baselines](../../../../markdown/aaa/validation/simulations/action-energy/analytic-baselines.md) — starting point and closed-form checks.
- [Causal Set and Delay Geometry](../../../../markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md) and [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md) — path-history geometry and its energy bookkeeping.
- [Radial Attraction](../../../../markdown/aaa/validation/simulations/action-energy/radial-attraction.md), [Attraction](../../../../markdown/aaa/validation/simulations/action-energy/attraction.md), and [Like-Polarity Symmetric Repulsion](../../../../markdown/aaa/validation/simulations/action-energy/repulsion.md) — signed two-body cases.
- [Self-energy and Regularization Notes](../../../../markdown/aaa/validation/simulations/action-energy/self-energy.md) and [Self-interaction Switch](../../../../markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md) — self-hit handling.
- [Superposition and Locality](../../../../markdown/aaa/validation/simulations/action-energy/superposition-and-locality.md), [Informational Ambiguity](../../../../markdown/aaa/validation/simulations/action-energy/informational-ambiguity.md), and [Receiver Velocity and Work](../../../../markdown/aaa/validation/simulations/action-energy/receiver-velocity-and-work.md) — multi-source and receiver-side effects.
- [Numerical Recipe and Stability](../../../../markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md), [Units and Constants](../../../../markdown/aaa/validation/simulations/action-energy/units-and-constants.md), and [Well-posedness and Regularization](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) — implementation and regulator discipline.

### Analytic Baselines

Purpose:
- State the delay differential equations (DDEs) that govern canonical interactions under the delayed line-of-action law with transmitter-side acceleration weight.
- Record exact analytical solutions only where they exist; otherwise, state solvability status without approximations.

Models:
- Fixed center (one receiver, one stationary transmitter):
  - For unlike polarities, $\sigma_{qq'}=-1$. The causal root is explicit and $D_t=c_f$, so $W^{\mathrm{acc}}=1$ independently of receiver velocity. The canonical radial equation is $\ddot r=-K/r^2$ with $K=\kappa |q q'|>0$. This is an exact fixed-transmitter attraction baseline for the corrected delayed law.
- Two-body mutual interaction (opposite or equal charges):
  - Coupled DDEs with causal roots $T_t$ defined by $|X_i(T)-X_j(T_t)|=T-T_t$ ($c_f=1$); accelerations superpose as $\pm \kappa \epsilon^2 W^{\mathrm{acc}}/r^2$ along the line of action.
  - No exact closed-form solutions are presently known for the coupled DDEs in general.

Methodological priority:
- Treat the two-point-potential problem as the canonical first laboratory for the delayed theory.
- Any proposed energy, momentum, virial-like, or kinetic/potential closure claim should be checked here before being generalized to assemblies or Noether sea response arguments.
- In practice this means: solve the fixed-center and symmetric two-body cases first, then ask which familiar ODE identities survive, which acquire delay corrections, and which fail outright.
- For the nontrivial electrino:positrino binary, use the finite-$\eta$ closure packet and canonical residual tuple owned by [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target), together with the constructive residual definitions in [Delay-Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md). This document does not restate the tuple. Until every owned entry is computed on the same window, regulator, and branch chart, the binary remains an existence candidate rather than a validated closure result.
- The first constructive energy baseline for such a branch is the branch-local work reconstruction
  $$
  U_{b,\mathrm{work}}^{(\eta)}(T)
  =
  U_b(T_\ast)
  -
  \int_{T_\ast}^{T}
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf A_{i,b}^{(\eta)}(T')
  \cdot
  \mathbf V_i(T')\,dT'
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bf602e9a8aeaade5)
  with the same replacement by $\mu_K(\|\mathbf V_i\|)$ when the primitive kinetic scalar is used. For a circular branch, the period-averaged integrand reduces to $\mu_{\text{arch}}s_b\langle A_{\eta,b}^{\mathrm{tan}}\rangle_{P_b}$ in the quadratic proxy.
- The adiabatic consistency check is branch preservation under slow drift. Along a quasi-static path $\gamma:\lambda\mapsto(R(\lambda),s(\lambda),b)$ that does not cross a root-ledger threshold, the work-integral energy change should match the energy difference inferred from the neighboring solved branch family:
  $$
  \Delta_{\mathrm{ad},E}^{2\mathrm{B}}(\gamma)
  =
  \frac{
  \left|
  \Delta_\gamma U_{b,\mathrm{work}}^{(\eta)}
  -
  \left(E_b^{(\eta)}(\lambda_1)-E_b^{(\eta)}(\lambda_0)\right)
  \right|
  }{
  \left|\Delta_\gamma U_{b,\mathrm{work}}^{(\eta)}\right|
  +
  \left|E_b^{(\eta)}(\lambda_1)-E_b^{(\eta)}(\lambda_0)\right|
  +
  \varepsilon
  }
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e723374df0c8beb5)
  Here $E_b^{(\eta)}(\lambda)$ denotes the candidate branch energy extracted at fixed $\lambda$ by the same declared construction route. The test is valid only while the same signed causal-root ledger persists with positive Jacobian and inactive-root gap floors. A jump in the ledger is a bifurcation, not a failure of adiabatic energy consistency.
  - Branch-virial theorem target: separate the kinematic virial identity from the stronger classical potential virial theorem. On a fixed finite-$\eta$ branch chart $b$ over an averaging window $W=[T_a,T_b]$, define the branch virial diagnostic
  $$
  \mathcal{G}_b^{(\eta)}(T)
  =
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf V_i(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1676e7d52ade38b1)
  and the quadratic kinetic bookkeeping scalar
  $$
  T_{\mu,b}^{(\eta)}(T)
  =
  \frac{1}{2}
  \sum_i
  \mu_{\text{arch}}\,
  \|\mathbf V_i(T)\|^2
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8bc11bdeb4e4414f)
  Before the branch average is formed, retain the root-resolved virial rows
  $$
  V_{i\leftarrow j,T_t}^{(\eta)}(T)
  =
  \mu_{\text{arch}}\,
  \mathbf X_i(T)
  \cdot
  \mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e5ad6762bf0280ae)
  and the corresponding delivered-power rows
  $$
  P_{i\leftarrow j,T_t}^{(\eta)}(T)
  =
  \mu_{\text{arch}}\,
  \mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
  \cdot
  \mathbf V_i(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b5085d10a50323f5)
  for every retained source/root hit $T_t\in\mathcal C_{ij,b}^{(\eta)}(T)$. The net virial term is then the ledger-preserving sum
  $$
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  =
  \sum_i
  \sum_j
  \sum_{T_t\in\mathcal C_{ij,b}^{(\eta)}(T)}
  V_{i\leftarrow j,T_t}^{(\eta)}(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e4ad858f88cfece)
  on the same active causal-root ledger used by the acceleration residual and energy crosswalk. Thus a small branch-virial residual is meaningful only after transmitter identity, polarity, emission time, Jacobian, transmitter-side acceleration weight, and receiver radial power have survived aggregation over the retained records. When the branch is differentiable after mollification and the same signed causal-root ledger is retained, direct differentiation gives the finite-window identity
  $$
  \left\langle
  2T_{\mu,b}^{(\eta)}
  +
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  \right\rangle_W
  =
  \frac{
  \mathcal{G}_b^{(\eta)}(T_b)
  -
  \mathcal{G}_b^{(\eta)}(T_a)
  }{
  T_b-T_a
  }
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8c35f444d2dc9497)
  The branch-virial closure target is the special bounded or periodic case in which the right-hand side is zero or below the declared tolerance:
  $$
  \mathcal{R}_{\mathrm{vir},b}^{(\eta)}(W)
  =
  \left|
  \left\langle
  2T_{\mu,b}^{(\eta)}
  +
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  \right\rangle_W
  \right|
  \le
  \epsilon_{\mathrm{vir}}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-71d5f0000e02ad98)
  This is not yet the classical potential statement. The reduction to $\langle 2T-pU\rangle=0$ additionally requires a branch-local potential $U_b^{(\eta)}$ whose scale variation is controlled by a homogeneity degree $p$,
  $$
  U_b^{(\eta)}(\lambda\mathbf X)
  =
  \lambda^p U_b^{(\eta)}(\mathbf X)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-81cfa99d0635cea7)
  together with a proof that the same branch acceleration is generated by that potential over $W$. A scale/virial residual that contains zero is therefore diagnostic only until it supplies the same-domain scale generator, homogeneity degree, and branch coordinate needed for this stronger reduction.
- Velocity-regime scope for the branch-virial target:
  - Strict sub-field-speed branch windows are the closest to the classical comparison because nontrivial self-hit roots are excluded on the strictly sub-field-speed interval; delayed partner hits, transmitter-side factors, and transmitter-side acceleration weights still remain in the acceleration term.
  - Field-speed or near-field-speed windows are threshold-sensitive. They require an explicit Jacobian floor, inactive-root gap floor, and unchanged causal-root ledger before the virial residual is meaningful.
  - Super-field-speed history requires the retained self-hit and multi-root rows to be included in $\mathbf A_{i,b}^{(\eta)}(T)$. A speed label alone never certifies the branch; root existence, transversality, transmitter-side acceleration weight, and bounded endpoint virial drift do the work.
- Failure modes:
  - $\mathcal{G}_b^{(\eta)}$ has unbounded secular drift on $W$.
  - The causal-root ledger changes, an inactive-root gap closes, or the Jacobian floor fails.
  - Collision support or the $\eta\to0$ limit is not controlled.
  - No branch-local potential, scale generator, or homogeneity degree is supplied, so the classical potential virial theorem has not been recovered.

Symmetric two-body on a line (exact DDE; challenges):
- Let $X_1(T)=+\tfrac{1}{2}r(T)$ and $X_2(T)=-\tfrac{1}{2}r(T)$ with $r(T)>0$ and $c_f=1$. The causal-time condition implies
  $$
  \frac{r(T)+r(T_t)}{2} \;=\; T - T_t,\qquad T_t<T
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e3608150113cf43c)
  or, writing $\Delta(T)=T-T_t>0$ implicitly,
  $$
  r(T) + r\!\big(T-\Delta(T)\big) \;=\; 2\,\Delta(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-beb22c39a4d20983)
- For opposite polarities, the exact relative-coordinate equation is the state-dependent DDE
  $$
  \frac{d^2 r}{dT^2} \;=\; -\,\frac{8\,\kappa\,\epsilon^2}{\big(r(T) + r(T-\Delta(T))\big)^2}
  W^{\mathrm{acc}}(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-450e0dfa223303b2)
  with $\Delta(T)$ determined by the implicit constraint above. For equal charges, the sign is reversed.

Integral (delta) form selecting the causal root:
- For particle 1 one may write
  $$
  A_1(T) \;=\; -\,\kappa\,\epsilon^2 \int_{0}^{\infty}
  \frac{c_f\,\delta\!\big(\lvert X_1(T)-X_2(T-\Delta)\rvert - c_f\Delta\big)\,
  \mathrm{sgn}\!\big(X_1(T)-X_2(T-\Delta)\big)}
  {\lvert X_1(T)-X_2(T-\Delta)\rvert^{2}}\; d\Delta
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aed5720ddeb2bf44)
  whose evaluation selects the causal delay $\Delta(T)$. The delta change of variables contributes $c_f/\lvert c_f-\hat{\mathbf r}\cdot\mathbf V_2(T-\Delta)\rvert=W^{\mathrm{acc}}$ automatically. Multiplying by another $W^{\mathrm{acc}}$ after evaluating the integral would double-count the transmitter-side Jacobian.

Why closed-form solutions are unlikely (even with symmetry):
- The delay is state-dependent: the unknown $r(T)$ appears both in the right-hand side and in the implicit constraint defining $\Delta(T)$, making the problem a nonlinear functional equation rather than an ODE.
- Even linear constant-delay DDEs rarely admit elementary closed forms; state-dependent delays are generically non-integrable. The fixed-center problem is a special case that collapses to an ODE (see [Radial Attraction](../../../../markdown/aaa/validation/simulations/action-energy/radial-attraction.md)).

Solution techniques (toolbox for delayed, radial DDEs):
- Method of steps (constant delays): for problems with fixed delay $\Delta$ and a given history $X(T)=\phi(T)$ on $T\in[-\Delta,0]$, integrate an ODE on successive intervals, using the known past segment on each step.
- State-dependent delay root-tracking: treat $\Delta(T)$ as an algebraic unknown constrained by the causal-time equation (e.g., $r(T)+r(T-\Delta)=2\Delta$). On each step, solve the coupled system with a Newton corrector for $\Delta(T)$; ensures consistency of the delay with the evolving state.
- Collocation / implicit Runge–Kutta with history interpolation: represent the recent history by Hermite/spline polynomials; at each step solve stage equations together with the causal constraint(s), updating a continuous extension of the history.
- Shooting and continuation for periodic motions: pose a boundary-value problem over one period with delay constraints; solve by Newton shooting or collocation and continue solutions via pseudo-arclength. Useful for detecting limit cycles and their stability.
- Spectral-in-time methods: on (quasi-)periodic windows, expand in Fourier/Chebyshev bases; constant delays enter as phase factors, while state-dependent delays are handled by iterating a frozen-delay linearization.
- Stability analysis (qualitative): Lyapunov–Krasovskii and Razumikhin functionals yield sufficient conditions for stability without solving trajectories; applicable to history classes with bounded delays.
- PDE embeddings (transport representation): introduce an auxiliary history field $Y(T,\theta)$ on $\theta\in[-\Delta_{\max},0]$ with $\partial_T Y + \partial_\theta Y = 0$ and boundary $Y(T,0)=X(T)$; discretize in $\theta$ (method of lines). For state-dependent delays, use a moving boundary; aligns with the project’s radial-transport perspective.
- Green’s-function / hit-integral formulations: write per-hit actions as delta-weighted time integrals selecting causal roots; evaluate by robust root-finding and quadrature. This matches the event-driven law used here.
- Measure-driven/event-driven solvers with mollification: replace surface deltas by narrow Gaussians ($\eta>0$) to obtain $C^1$ trajectories; take $\eta\to 0$ in the weak sense after validating work–energy over resolved windows.
- Linear constant-delay benchmarks: for linear DDEs (e.g., $dX/dT = aX + bX(T-\Delta)$) use Laplace transforms/characteristic equations and Lambert W; helpful for validation and step-size/error control, even though the canonical two-body problems here are nonlinear and state-dependent.
- A posteriori error control: use defect/residual of collocation, step halving with history re-interpolation, and event-time error estimates for adaptive step and tolerance selection.
- Fixed-point frameworks: establish local existence/uniqueness by contraction on history spaces $C([-\Delta T_{\max},0])$ (or their mollified variants); use Picard iterations as a solver preconditioner.

Deliverables:
- Precise DDE forms and causal-root conditions for use in analysis and computation.
- Cross-references to sections with receiver-side baseline equations and status notes.
- A minimal benchmark ladder for closure tests:
  - fixed-center ODE recovery,
  - symmetric two-body delayed dynamics,
  - finite-$\eta$ two-body binary closure packet with branch floors and characteristic frequency extraction,
  - work-energy balance on resolved windows,
  - branch-virial residuals where periodic, quasi-periodic, or bounded-drift regimes exist.

Plain language: We give only the exact delayed equations; where an exact solution exists (fixed source), we present it, and where it does not (mutual interaction), we say so without approximations.

### Attraction

Setup:
- Two architrinos with polarities $q_1=-\epsilon$ and $q_2=+\epsilon$.
- Initial velocities $V_1\approx0$, $V_2\approx0$; initial separation $r_0$ is large relative to the declared reference length and mollifier width.
- For all examples, we restrict motion to a single geometrical line.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Canonical delayed-law considerations:
- Delay enters through the implicit emission times $T_t$ satisfying $\lvert X_1(T) - X_2(T_t)\rvert = T - T_t$ (and its counterpart).
- All per-hit actions are radial along the line of action and carry the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; $H(0)=0$ excludes $T_t=T$.

Equations of motion (canonical delayed law; two-body, $c_f=1$):
- Definitions:
  - Polarities: $q_1=-\epsilon$ (particle 1), $q_2=+\epsilon$ (particle 2); $\epsilon>0$ is the polarity-unit magnitude.
  - Coupling: $\kappa>0$ is the universal coupling constant; numerical instantiations use normalized wake-speed units with $c_f=1$.
  - Separation: $r(T)=|X_1(T)-X_2(T)|>0$.
- Causal (path-history) times:
  - $T_t^{(2\to 1)}\in\mathcal{C}_2(T)$ solves $\lvert X_1(T)-X_2(T_t)\rvert = T-T_t$.
  - $T_t^{(1\to 2)}\in\mathcal{C}_1(T)$ solves $\lvert X_2(T)-X_1(T_t)\rvert = T-T_t$.
- Per-particle accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  -\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-21b743159cf3e3b1)
  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  -\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2c5b3d8a9fb366b7)
  Here $\sigma_{q_2 q_1}=\sigma_{q_1 q_2}=-1$ (unlike polarities attract), $W_{ab}^{\mathrm{acc}}=c_f/\lvert D_{t,ab}\rvert$ is the transmitter-side acceleration weight on the corresponding root, $H(0)=0$ excludes $T_t=T$, and $\mathrm{sgn}(\cdot)$ denotes the sign function.

Relative-coordinate DDE:
- Define $r(T)=X_1(T)-X_2(T)>0$. Then $s_{12}(T;T_t)=X_1(T)-X_2(T_t)$ and $s_{21}(T;T_t)=X_2(T)-X_1(T_t)$ are the signed delayed separations, with $r_{12}=|s_{12}|$ and $r_{21}=|s_{21}|$. Subtracting the two per-particle rows gives
  $$
  \frac{d^2r}{dT^2}\;=\;A_1(T)-A_2(T)
  \;=\;
  -\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_2(T)}W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(s_{12}(T;T_t)\big)}{r_{12}^2}
  +\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_1(T)}W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(s_{21}(T;T_t)\big)}{r_{21}^2}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-770f081643146eb7)
  with the two absolute distances fixed by their respective causal-root conditions. For an ordered symmetric history with $X_1>0>X_2$, the first signed separation is positive and the second is negative, so both displayed terms are negative and the instantaneous separation accelerates inward. No exact closed-form solution is presently known for the coupled DDE system.

Nonlinear history-anchored form (vector notation for clarity):
  $$
  \mathbf A_1(T)\;=\;-\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}\,
  \frac{\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)}{\big\|\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)\big\|^3},
  \qquad
  \mathbf A_2(T)\;=\;-\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}\,
  \frac{\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)}{\big\|\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)\big\|^3}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c0bb2e2964b4da3)
  The attachment points are the partners’ path-history locations at their respective causal emission times; linearizations and small-parameter expansions are intentionally omitted.

Central-origin kinematics (1D positions and velocities; symmetric two-body frame)
- Choose a fixed origin at the geometric midpoint. With equal-magnitude charges and symmetric initial data, this midpoint remains at rest by symmetry.
- Define the separation
  $$
  r(T) \equiv X_1(T) - X_2(T) > 0
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e10678a75233e78)
  Positions relative to the central origin are then
  $$
  X_1(T) = \tfrac{1}{2}\,r(T),\qquad
  X_2(T) = -\,\tfrac{1}{2}\,r(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c4fa207618fc9e4)
- Velocities follow by differentiation:
  $$
  V_1(T) = \frac{dX_1}{dT}
  = \tfrac{1}{2}\,\frac{dr}{dT},
  \qquad
  V_2(T) = \frac{dX_2}{dT}
  = -\,\tfrac{1}{2}\,\frac{dr}{dT}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-67a4cf4a320971d3)
- Symmetric initial conditions (example):
  $$
  X_1(0)=\tfrac{r_0}{2},\quad
  X_2(0)=-\tfrac{r_0}{2},\quad
  V_1(0)=V_2(0)=0
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e0defb4c22d7efd2)

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Solvability status: no known closed-form solution; numerical integration requires robust root-finding and event-aware stepping.

Plain language: Start very far apart and nearly at rest—motion remains on the initial line. Delay enters through the partner’s past position via the causal-time condition; there is no sideways component in this example.

### Background and Simple Action

The dynamics of an architrino are governed by a simple action: acceleration occurs when the receiver intersects a delayed causal wake surface emitted by a transmitter architrino.

The background is fixed absolute time times Euclidean space. Free paths are straight. Accelerations come only from delayed causal hits, with line-of-action direction and transmitter-side acceleration weight, never from background curvature.

#### Dynamical Geometry

- Background kinematics (Newton-Cartan/Galilean):
  - The arena is absolute time × Euclidean space, $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, with simultaneity slices $\Sigma_T=\{T\}\times\mathbb{R}^3$ carrying the flat spatial metric $h_{ij}=\delta_{ij}$.
  - "Geodesics are straight" means: in the absence of any interaction, a worldline $\mathbf X(T)$ satisfies $\mathbf A(T)=d^2\mathbf X/dT^2=\mathbf{0}$; motion is uniform and rectilinear in each slice $\Sigma_T$. The fixed background contributes no acceleration.

- Wake geometry as a continuous causal flux:
  - Each architrino streams potential continuously. At any reception time $T_r$, the contribution emitted at past time $T_t$ sits on the **causal wake surface** (spherical isochron) $r=c_f(T_r-T_t)$ centered on $\mathbf X(T_t)$, with surface density $\propto 1/r^2$ so the integrated flux remains $q$.
  - The potential wake is the superposition of all such causal isochrons from past emissions. The flux never shuts off; the surfaces are bookkeeping devices isolating portions of the path history whose intersection with a receiver delivers acceleration.

- Intersection as the driver of acceleration:
  - The receiver's worldline is $\mathbf X_{o'}(T_r)$. An intersection at reception time $T_r$ means some earlier emission time $T_t<T_r$ satisfies the causal-distance condition
    $$
    \|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=c_f(T_r-T_t)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a8349ac32e45787a)
    That event is a causal hit from transmitter $o$'s emission event to the receiver's reception event.
  - At a hit, the acceleration impulse is directed along
    $$
    \hat{\mathbf{r}}
    =
    \frac{\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)}
    {\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a7da923f089a140d)
    No cross products or right-hand-rule terms appear; the action is collinear with $\hat{\mathbf{r}}$. Its magnitude is weighted by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$: $D_t$ captures transmitter-side wake spacing and root transversality, while $D_r$ captures how the receiver cuts through that wake sequence.

- “Simple action” in precise terms:
  - The law is event-driven: acceleration is a sum of per-hit line-of-action contributions, each scaled by $W^{\mathrm{acc}}/r^2$. Between hits (as $\eta\to 0$) motion is inertial; with mollification ($\eta>0$) the impulses become short, smooth pushes.
  - The background adds no acceleration; departures from straight motion arise only from these intersections with emitted causal wakes, including self-hits when the causal-root and branch conditions allow.

- Physical picture:
  - Picture many continuously expanding wake surfaces (causal isochrons). An acceleration contribution occurs whenever one of those surfaces intersects the receiver, directed straight along the radius back to its emission point, with inverse-square geometric decay multiplied by the transmitter-side acceleration weight. Receiver crossing rate belongs to root playback and does not multiply that arriving contribution.

### Causal Set and Delay Geometry

The receiver $o'$ at reception time $T_r$ interacts with transmitter $o$ through the possibly multi-valued set of causal emission times
$$
\mathcal{C}_o(T_r)
=
\big\{\,T_t<T_r\mid \|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=T_r-T_t\,\big\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9435e7c724a2ce9d)
Local sub-field-speed transversality guarantees a unique smooth root branch near a given root. It does not by itself make the global set $\mathcal C_o(T_r)$ a singleton. Global uniqueness follows when $\|\mathbf V_o(T_t)\|<c_f$ throughout the entire searched history interval; histories that reach or exceed $c_f$ may admit folds or multiple solutions, including self-hits when $o'=o$.

Clarification: "Multi-valued" means that, for a fixed reception time $T_r$, there can be more than one emission time $T_t$ that satisfies the causal-distance condition. This multiplicity requires the transmitter history to reach or exceed field speed somewhere on the searched interval; tangency can occur at equality. If $\|\mathbf V_o\|<c_f$ everywhere on that interval, $F(T_t;T_r)$ is strictly increasing in $T_t$ and the causal root is unique.

Terminology note: the `causal set` in this simulation note is the causal interaction set $\mathcal{C}_o(T_r)$: a set of delayed emission times that reach a receiver at reception time $T_r$. It is not Causal Set Theory, the external quantum-gravity program that treats discrete spacetime events and partial order as fundamental. That outside program remains useful as a comparison for causal ordering and continuum emergence, but the substrate object here is a path-history root set inside absolute timespace.

#### Geometry of Delay and Roots

- Root condition as an expanding causal isochron intersection:
  - Define $F(T_t; T_r) \equiv \|\mathbf X_{o'}(T_r) - \mathbf X_o(T_t)\| - c_f(T_r - T_t)$. Numerical runs use $c_f=1$. Causal roots satisfy $F(T_t; T_r)=0$ with $T_t < T_r$ and $H(T_r-T_t)$.
- Geometrically: the transmitter point $\mathbf X_o(T_t)$ must lie on the causal wake surface (isochron) of radius $\Delta = T_r - T_t$ centered at the receiver's reception position $\mathbf X_{o'}(T_r)$.

- Local uniqueness (sub-field-speed, transverse crossing):
  - If the transmitter speed is locally sub-field-speed and the derivative $\partial_{T_t}F(T_t;T_r) = c_f-\hat{\mathbf{r}}\!\cdot\!\mathbf V_o(T_t)$ is nonzero at the root, then the implicit function theorem guarantees a unique, smooth root branch near $T_r$.
  - Intuition: the expanding causal isochron intersects the moving transmitter path transversely.

- Multiple roots (require super-field-speed):
  - When $\|\mathbf V_o\|\ge c_f$ at some emission times, the transmitter history can develop tangencies or outpace recent wake surfaces, allowing several distinct historical points to satisfy the same distance-time constraint. If $\|\mathbf V_o\|<c_f$ everywhere on the searched interval, $F(T_t;T_r)$ is strictly increasing in $T_t$, so at most one causal root exists.

- Conventions at singular cases:
  - We adopt $H(0)=0$ so the instantaneous emission at $T_t=T_r$ does not produce an immediate self-kick.
  - No $r=0$ causal roots beyond $\Delta=0$: because $r=c_f(T_r-T_t)$, $r=0$ implies $\Delta=0$; the $\Delta=0$ case is excluded by $H(0)=0$. Under mollification, any claimed symmetric $r\to0$ limit must be verified for the declared kernel and geometry.

Plain language: a receiver is accelerated only by earlier transmitter events whose causal isochrons pass through it at reception time $T_r$. Usually there is one such event; if the transmitter is very fast or its path loops around, there can be several.

Non-technical visualization — outrunning your own wake (speedboat analogy):
- Picture a speedboat continuously laying down circular wake ridges that spread outward across the water at a fixed wave speed $c_w$ (analogy variable: wake ridge expansion speed). If the boat stays slower than $c_w$, it remains inside its newest ridge and will never meet it again, no self-hits. Once the boat exceeds $c_w$, it moves ahead of its freshest ridge. Later, if it curves or slows, it can run into older ridges it created earlier. Each crossing delivers a brief shove normal to the ridge (straight outward from the ridge’s center), mirroring the model’s line-of-action push. The ridge “drop rate” never changes. Earlier transmitter motion bunches or dilates ridge spacing and therefore maps to the transmitter-side acceleration weight; receiver motion changes the order and rate at which the ridge history is replayed, not the strength of a ridge that has already arrived. This is an analogy: real Kelvin wakes are dispersive; we idealize to circular ridges expanding at one speed to match the model’s fixed-speed causal isochrons.

Four self-hits in one maneuver (storyboard):
1) Sprint phase (exceed the field speed): The boat accelerates to a speed strictly greater than $c_w$ and holds it for several ticks. During this super-speed run it lays down several concentric ridges that it immediately outruns.
2) Set up spacing: Maintain the super-speed for long enough to create at least four successive ridges with noticeable gaps (their radii grow at $c_w\cdot \Delta T$ while the boat advances faster than $c_w$).
3) Curving return: Bank into a broad, smooth turn (a teardrop/U-turn or a gentle outward spiral) that arcs back toward the track laid moments earlier.
4) Crossings: As the boat’s curved path cuts across the expanding circles, it re-enters first the outermost of those recent ridges, then the next three in sequence. With a steady arc and timing, four distinct ridge crossings occur in quick succession—four self-hits. The shove at each crossing points straight away from the center of that ring (the boat’s earlier position).
5) Tuning intuition: to make four hits likely, use a fast straight run $(\lvert v\rvert>c_w)$ to lay multiple rings, then a wide-radius turn whose chord length is comparable to the ring spacing. Tighter loops and longer super-speed runs increase the chance of multiple crossings; without exceeding $c_w$, this multi-hit pattern cannot occur.

### Delay Dynamics Energy

This chapter isolates the energy problem created by causal-delay dynamics. It is foundations-adjacent because it states what kind of energy object the substrate law is allowed to use before later chapters invoke conservation, no-runaway arguments, event ledgers, or Noether sea exchange.

The core warning is simple: time-translation invariance of a state-dependent delay equation does not by itself supply the familiar local Noether energy of finite-dimensional mechanics. In $\mathbb{A}\mathbb{A}\mathbb{A}$, any term written as $E_{\text{wake}}$ must be constructed from the same causal-history law, regularization, branch chart, and boundary convention that generate the acceleration contribution. Otherwise it is a diagnostic label, not a conserved charge.

#### Energy Construction Problem

Fix a finite retained system over a time window $W=[T_a,T_b]$, a spatial window $\Omega\subset\Sigma_T$ when boundary flux is relevant, memory depth $H_{\mathrm{hist}} < \infty$, causal-surface width $\eta > 0$, optional core cutoff $\epsilon_c > 0$, and branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4bb181a0010ce0c0)
for the same active causal-root rows used by the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md). The retained history at time $T$ is the segment
$$
X_T
=
\left\{
\mathbf X_a(T+\theta),
\mathbf V_a(T+\theta),
q_a
:
a\in A_\Omega,\,
-H_{\mathrm{hist}}\le\theta\le0
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3a71609f8761a10f)
with any excluded rows, endpoint conventions, and boundary crossings recorded explicitly. Here $A_\Omega$ is the retained architrino index set for the window, not a new kind of assembly.

A promoted delay-energy functional has the form
$$
E_{\mathrm{delay}}^{(\eta)}[X_T;\mathfrak{B},\Omega]
=
K_{\mu}^{(\eta)}(T)
+
E_{\text{wake},\mathfrak{B}}^{(\eta)}(T)
+
E_{\mathrm{sea},\Omega}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0b89f3a69cbb51f2)
where $K_{\mu}^{(\eta)}$ is the declared mechanical kinetic bookkeeping proxy, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$ is the causal-history interaction contribution, and $E_{\mathrm{sea},\Omega}^{(\eta)}$ is included only when retained Noether sea degrees of freedom are part of the window. None of these terms is allowed to absorb an unreported boundary flux or unresolved reaction channel.

Observer-level gravitational potential energy is therefore a comparison construct, not a fourth primitive term. When a Newtonian or general-relativistic benchmark writes a gravitational-potential term, this chapter must not carry that term into an $\mathbb{A}\mathbb{A}\mathbb{A}$ action as a primitive. Over a declared window it has to be reconstructed on the same branch chart from the existing packet: $K_{\mu}^{(\eta)}$, $E_{\text{wake},\mathfrak{B}}^{(\eta)}$, any retained $E_{\mathrm{sea},\Omega}^{(\eta)}$, and the boundary-flux row required by finite-window balance. Until that reconstruction is supplied, the gravitational potential remains an effective comparison label rather than an action-level energy.

#### Accepted Construction Routes

There are three admissible ways to define the wake-energy term. A calculation may use one route directly, but a theorem-level conservation claim must also state why the other routes are equivalent or irrelevant on the declared chart.

##### Action-Boundary Route

If a symmetry-preserving nonlocal action supplies the acceleration contribution, then the energy term is the time-boundary charge induced by absolute-time translation. With causal-delay interaction kernel $\mathcal{K}_{ij}^{E}(T_1,T_t)$ chosen by the same action as the acceleration residual,
$$
E_{\text{wake},\mathfrak{B}}^{(\eta)}(T)
=
\frac{1}{2}
\sum_{i,j}
\int_{-\infty}^{T}dT_t
\int_T^\infty dT_1\,
\partial_{T_1}
\mathcal{K}_{ij,\mathfrak{B}}^{E,\eta}(T_1,T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b18404360b9e9267)
is the candidate in-flight causal-history charge. This is the route developed in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#action-level-wake-energy-functional-at-a-time-boundary) and [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#symmetries-and-history-aware-conservation-laws). It becomes theorem-level only when the same action also gives the accepted acceleration law and the endpoint leakage residual vanishes.

##### Work-Integral Route

For a realized trajectory, one may reconstruct a compatible interaction contribution by integrating the delivered power:
$$
U_{\mathfrak{B}}(T)
=
U_\ast
-
\int_{T_\ast}^{T}
\sum_i
\mu_{\text{arch}}\,
\mathbf A_{i,\mathfrak{B}}^{(\eta)}(T')
\cdot
\mathbf V_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9fec1cfc2a8e2139)
This route is trajectory-local. It is useful for simulations and branch replay, but it is not an off-shell conserved charge unless the same action and boundary convention have already been declared.

###### Binary Branch Work Ledger

For a solved two-body branch chart $b$, the work-integral route has a concrete first test. Let $\mathbf A_{i,b}^{(\eta)}(T)$ be the acceleration contribution obtained from exactly the active causal roots retained by the binary branch chart. With the quadratic kinetic proxy, define the delivered branch power by
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_{i=1}^{2}
\mu_{\text{arch}}\,
\mathbf A_{i,b}^{(\eta)}(T)
\cdot
\mathbf V_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1d2aea80ef648845)
The same row must also be available before superposition. For each retained source/root hit $(i,j,T_t)$ on the branch chart, define the root-resolved delivered power
$$
P_{i\leftarrow j,T_t}^{(\eta)}(T)
=
\mu_{\text{arch}}\,
\mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
\cdot
\mathbf V_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-87675bd20c2fe1a8)
so that
$$
P_{b,\mathrm{work}}^{(\eta)}(T)
=
\sum_i
\sum_j
\sum_{T_t\in\mathcal C_{ij,b}^{(\eta)}(T)}
P_{i\leftarrow j,T_t}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7d54e85f39a0ca25)
on the same active causal-root ledger. This root-resolved form is the accounting guardrail: transmitter identity, polarity, emission time, Jacobian, and receiver radial power are retained before the net branch work is collapsed to one scalar. The work-integral route then reconstructs the compatible causal-history interaction contribution by
$$
U_{b,\mathrm{work}}^{(\eta)}(T)
=
U_b(T_\ast)
-
\int_{T_\ast}^{T}
P_{b,\mathrm{work}}^{(\eta)}(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9e8999683a519427)
For a primitive kinetic scalar, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$ inside the sum. This is the operational binary definition: the wake-history row is whatever balances the delivered branch work along the realized trajectory, after the window, regulator, and branch ledger have been declared.

On a circular benchmark with speed $s_b$, the radial component is orthogonal to the receiver velocity, so the branch power is the tangential row:
$$
\left\langle
P_{b,\mathrm{work}}^{(\eta)}
\right\rangle_{P_b}
=
\mu_{\text{arch}}\,s_b\,
\left\langle
A_{\eta,b}^{\mathrm{tan}}
\right\rangle_{P_b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-df0c816928641a89)
for the quadratic proxy. A nonzero value is not by itself an energy-conservation failure; it is the quantity that the boundary flux, recoil row, or constructed wake-history term must balance. A stable binary claim must therefore compute this row on the same branch chart as the motion residuals before invoking a Noether-style conserved energy.

##### Boundary-Flux Route

For finite retained windows, missing energy must be routed to boundary exchange rather than hidden in $E_{\text{wake}}$. The finite-window balance target is
$$
\frac{dE_{\Omega}^{(\eta)}}{dT}
+
\int_{\partial\Omega}
\mathbf{J}_E^{(\eta)}
\cdot
\hat{\mathbf{n}}\,dA
=
P_{\mathrm{ext},\Omega}^{(\eta)}
+
\mathcal{R}_{E,\Omega}^{(\eta)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7b791109cb7df0be)
where $\mathbf{J}_E^{(\eta)}$ records causal-wake escapement, assembly crossings, and declared medium exchange through the retained boundary. The flux term is not a new substrate field; it is the boundary part of the retained causal-history ledger.

#### Crosswalk Residual

The three routes must not define three different energies for the same branch. On any chart where more than one construction is available, use the crosswalk residual
$$
\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})
=
\frac{
\left|
\Delta_W E_{\text{wake,act}}^{(\eta)}
-
\Delta_W U_{\mathfrak{B}}
-
\Phi_{\partial\Omega,E}^{(\eta)}(W)
\right|
}{
\left|
\Delta_W E_{\text{wake,act}}^{(\eta)}
\right|
+
\left|
\Delta_W U_{\mathfrak{B}}
\right|
+
\left|
\Phi_{\partial\Omega,E}^{(\eta)}(W)
\right|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d5decd3fbd04c168)
where $\Phi_{\partial\Omega,E}^{(\eta)}(W)=\int_W\int_{\partial\Omega}\mathbf{J}_E^{(\eta)}\cdot\hat{\mathbf{n}}\,dA\,dT$ is the declared boundary energy flux. The chart promotes only if $\Delta_{\mathrm{E,cross}}^{(\eta)}\to0$ under the same refinement limit used for the acceleration residual.

#### Conservation Residual

Let $\mathbf{R}_i^{(\eta)}$ be the Euler or acceleration residual of the declared action-derived model, and let $\mathcal{B}_E^{(\eta)}$ collect endpoint leakage, period cuts, excluded self-coincidence boundaries, and omitted branch rows. The finite-window conservation residual is
$$
\mathcal{R}_{E}^{(\eta)}(W;\mathfrak{B})
=
\Delta_W
\left(
K_{\mu}^{(\eta)}
+
E_{\text{wake},\mathfrak{B}}^{(\eta)}
+
E_{\mathrm{sea},\Omega}^{(\eta)}
\right)
-
\int_W
\sum_i
\mathbf V_i\cdot\mathbf{R}_i^{(\eta)}\,dT
-
\int_W
\mathcal{B}_E^{(\eta)}\,dT
-
W_{\partial\Omega}^{(\eta)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8a842cfc126e9669)
The normalized diagnostic is
$$
\epsilon_E^{(\eta)}(W;\mathfrak{B})
=
\frac{
\left|
\mathcal{R}_{E}^{(\eta)}(W;\mathfrak{B})
\right|
}{
\left|
\Delta_W K_{\mu}^{(\eta)}
\right|
+
\left|
\Delta_W E_{\text{wake},\mathfrak{B}}^{(\eta)}
\right|
+
\left|
\Delta_W E_{\mathrm{sea},\Omega}^{(\eta)}
\right|
+
\left|
W_{\partial\Omega}^{(\eta)}
\right|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9940d732ab394ab3)
An exact isolated conservation claim requires $\epsilon_E^{(\eta)}\to0$, $\Delta_{\mathrm{E,cross}}^{(\eta)}\to0$ when applicable, and stable branch floors as $\eta$ and the numerical/history-window resolution are refined.

#### No-Double-Counting Rule

The interaction contribution may be carried by $E_{\mathrm{wake}}$, by an equivalent work-integral reconstruction, or by an explicitly retained near-field decomposition, but not by all of them at once. If a pairwise $U_{\mathrm{int}}$ term is used inside an assembly, the wake-energy term must omit the same near-field content. If a Noether sea update is retained inside $E_{\mathrm{sea},\Omega}$, it must not also appear as an outgoing event-ledger channel. The same rule is used by [Emergence](../../../../markdown/aaa/foundations/emergence-of-structure.md#context-changes-and-energy-ledger) and [Energy](../../../../markdown/aaa/dynamics/energy.md#energy-conservation-and-exchange).

#### Promotion and Failure Conditions

A delay-energy construction is promotable only when the branch chart names:

1. the retained history window $h$ and memory truncation residual;
2. the causal-surface regularization $\eta$ and any core cutoff $\epsilon_c$;
3. active causal roots, inactive-root gaps, the active transmitter-side Jacobian floor, and the retained transmitter-side acceleration-weight floor or certified interval $\nu_{\mathrm{rec}}$ for $W^{\mathrm{acc}}$;
4. the exact route used for $E_{\text{wake}}$;
5. boundary flux, endpoint leakage, period-cut terms, and excluded self-coincidence rows;
6. the crosswalk residual whenever more than one energy construction is invoked;
7. the lower-bound condition needed for no-runaway arguments.

The construction fails if conservation is recovered only by changing the energy definition per observable, if $E_{\text{wake}}^{(\eta)}$ has no lower bound on the admitted chart, if endpoint leakage is silently discarded, if the regulator is not the same regulator used by the acceleration law, or if the branch chart loses its causal-root floors. In those cases $E_{\text{wake}}$ remains a diagnostic placeholder and cannot be used to close energy bookkeeping, stability, or no-runaway claims.

#### Downstream Use

This chapter is the shared energy standard for [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md), [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md), [Energy](../../../../markdown/aaa/dynamics/energy.md), [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), and event-ledger uses in [Emergence](../../../../markdown/aaa/foundations/emergence-of-structure.md). The [two-body binary closure packet](../../../../markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target) must report $\epsilon_E^{(\eta)}(W;\mathfrak{B})$, $\Delta_{\mathrm{E,cross}}^{(\eta)}(W;\mathfrak{B})$, and the lower-bound entry on the same branch chart as its motion, branch-floor, stability, and frequency residuals. Existence and stability are not enough unless the accepted branch also carries a constructive energy ledger.

### Informational Ambiguity

From the perspective of the receiving architrino, the information carried by an intersecting causal wake surface is limited. The receiver-local dynamical record contains two direct facts:

1. The net strength of the potential at the point of intersection.
2. The signed acceleration vector $\mathbf A$ at the receiver event.

The vector fixes the direction of the net acceleration. What it does not fix is the transmitter ray and polarity assignment that produced that vector. An attractive source on one ray and a repulsive source on the opposite ray can produce the same $\mathbf A$. Only after quotienting those source hypotheses does one obtain an unoriented inference axis; that axis is not the raw received datum.

#### Degeneracies and Inference Limits

- Many-to-one mapping:
  - Different combinations of transmitter identity, polarity magnitudes, distances, and emission timing/geometry can yield the same receiver-local magnitude and line-of-action record.

- Sign ambiguity across a line:
  - An attractive pull toward an opposite-polarity source on one ray is indistinguishable, at one receiver event, from a repulsive push by a same-polarity source on the opposite ray. If the receiver polarity flips, the physical source-polarity labels flip too; the invariant ambiguity is the exchange of side with attraction/repulsion.

- Consequence for reconstruction:
  - Instantaneous local data at the receiver are insufficient to invert for sources; this remains true even for an $\mathbb{U}_{\text{now}}$ universe-state perspective who knows the universal clock $T$ and the Euclidean rest frame. The $\mathbb{U}_{\text{now}}$ universe-state perspective can eliminate coordinate uncertainty (perfect synchronization and alignment) but not the physical ambiguities below.
  - Irreducible ambiguities at an instant:
    - Sign/side ambiguity: an attractive lift on one ray and a repulsive lift on the opposite ray can produce the same receiver-local acceleration record. With receiver polarity held fixed, this can be written as a side/polarity flip of the source; with receiver polarity flipped, the source-polarity labels interchange as well.
    - Superposition along an axis: multiple sources aligned on either ray of the inference axis can sum to the same receiver-local acceleration vector at one instant, while their transmitter count, side distribution, and polarities remain hidden.
    - Self-hit confound: a self-interaction and an external source can yield identical instantaneous data if they lie on the same line with compensating magnitudes.
    - Super-field-speed self-history ambiguity: when same-transmitter delayed roots exist, the receiver-local event still reports an acceleration contribution, not the full past trajectory that produced it. The self-hit label must come from the retained causal-root ledger, not from the instantaneous vector alone.
    - Continuum of surrogate locations: for any instantaneous hit there exists a continuum of stationary surrogate source positions on the two rays of the inference axis, with polarity chosen consistently and with a correspondingly adjusted emission time $T_t$, that reproduces the same instantaneous vector; hence instantaneous inversion is severely underdetermined.

  - Surrogate-location recast: For one resolved line-of-action component at receiver event $R=(T,\mathbf X_{o'}(T))$, the receiver-local datum can be written as
    $$
    D_R=(A_R,[\hat{\mathbf{u}}]),
    \qquad
    [\hat{\mathbf{u}}]=\{\hat{\mathbf{u}},-\hat{\mathbf{u}}\},
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-20664d22782d3770)
    where $A_R\ge0$ is the net magnitude assigned to that component and $[\hat{\mathbf{u}}]$ is the unoriented axis through the receiver. A single surrogate lift chooses a side coordinate $\lambda\ne0$, a stationary surrogate position, and a source polarity:
    $$
    \mathbf X_{\mathrm{sur}}=\mathbf X_{o'}(T)-\lambda\hat{\mathbf{u}},
    \qquad
    \sigma_{\mathrm{sur}}=\operatorname{sign}(q_{\mathrm{sur}}q_{o'}),
    \qquad
    \hat{\mathbf{r}}_{\lambda}=\operatorname{sgn}(\lambda)\hat{\mathbf{u}}.
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-383675d093e32642)
    The surrogate contribution is
    $$
    \mathbf A_{\mathrm{sur}}=A_R\sigma_{\mathrm{sur}}\hat{\mathbf{r}}_{\lambda}.
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6329e70c98e750c0)
    It is unchanged under
    $$
    (\lambda,\sigma_{\mathrm{sur}})
    \sim
    (-\lambda,-\sigma_{\mathrm{sur}}),
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-04196174cb6f1e33)
    or, with receiver polarity fixed, by moving the surrogate to the opposite ray and flipping the surrogate source polarity. This recast is an inference device, not a claim that the original source inventory contained a single architrino.

  - What helps (over time or with more views):
    - Track the time series of the line of action $\hat{\mathbf{r}}(T)$ and separation proxy $r(T)$ inferred from timing and geometry; curvature and rotation of $\hat{\mathbf{r}}$ constrain source trajectories.
    - Use multiple receivers (an array) to triangulate the unoriented inference axes obtained after the side/polarity quotient; intersecting rays at the same $T$ narrow candidate locations while preserving the two-sided ambiguity.
    - Actively vary the receiver path to sample different directions and ranges, turning the inverse problem into a controlled experiment.
    - Impose priors: polarity inventories, speed bounds, and assembly templates reduce degeneracy space.
    - Use surrogate-location recasts: for instantaneous hits, place a stationary surrogate source on either ray of the inference axis, choose the corresponding polarity, and adjust the emission time; this simplifies hypothesis testing without altering per-wavefront amplitude.
    - Use solver-side quotient diagnostics: collapse exact branch contributions into receiver-local line bins, compare the bin to a one-surrogate representative, and treat the result as lossy compression. The quotient may help inverse-problem tests, noisy-background compression, and residual diagnosis, but it cannot replace retained causal-root ledgers because it discards transmitter count, side, polarity, emission time, transmitter velocity, and Jacobian data.
  - Absolute-observer note: Access to absolute time and a common Euclidean frame enables global correlation of events across receivers, but unique inversion at an instant would require hidden information (the full emission ledger $\{(T_t,\mathbf X_j(T_t),q_j,\mathbf V_j(T_t))\}_j$). Practical reconstruction is therefore necessarily temporal, statistical, and multi-view.

Plain language: a hit reports magnitude and line of action, not transmitter identity or distance. Many different source histories can fit the same momentary push. A null action at an instant conveys no information about sources; superposition can cancel perfectly even in a non-empty universe.

### Numerical Recipe and Stability

Event-aware integration (practical algorithm):

1. Root finding:
   - For each transmitter $o$ (including $o'=o$ for potential self-hits), solve $F(T_t;T_r)=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|-(T_r-T_t)=0$ for $T_t<T_r$.
   - Discard non-physical roots by convention $H(0)=0$ (exclude $\Delta T=0$); note $r=0$ occurs only at $\Delta T=0$ and is thus excluded.

2. Per-hit accumulation:
   - For each accepted root, compute $r$, $\hat{\mathbf{r}}$, $D_t=1-\mathbf V_o(T_t)\cdot\hat{\mathbf r}$, $D_r=1-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf r}$, and $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. Then use
     $$
     \mathbf A_{o'\leftarrow o}(T_r;T_t)=\kappa\,\sigma_{q_o q_{o'}}\,\frac{|q_o q_{o'}|}{r^2}W^{\mathrm{acc}}\,\hat{\mathbf{r}}
     $$

     [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-af40ad24c32aee01)
   - Sum over all transmitters and all roots (superposition).

3. Time stepping:
   - Impulsive mode: advance velocities with jumps at hit times (measure-driven ODE with velocity of bounded variation).
   - Mollified mode: replace $\delta(\cdot)$ by $\delta_\eta(\cdot)$ and integrate with a delayed-history solver or an augmented-state method that retains the required path segment; choose $\eta$ small relative to local geometric scales.

4. Stability tips:
   - Use event bracketing or root trackers for continuity of $T_t(T)$ across steps.
   - Limit step size so that at most one (or a controlled number of) mollified wake surfaces overlap significantly per step.
   - Monitor invariants over resolved windows (work–energy balance with $\Phi_\eta$) to validate settings.

5. Units:
   - Use $c_f=1$ nondimensionalization throughout. Remember: emission cadence and per-wavefront amplitude are constant; receiver speed enters signed root playback through $D_r/D_t$ and instantaneous power through $v_r$, not the acceleration weight.

6. Two-body closure run packet:
   - For a candidate electrino:positrino binary, emit the signed branch ledger $b$, regulator $\eta$, step or collocation scale $\Delta T_{\mathrm{step}}$, candidate period $P_b$, and the canonical residual tuple owned by [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target). This recipe does not define a second tuple or field order.
   - Do not advance the candidate if the signed ledger changes during the reported period, an active transmitter-side Jacobian floor or inactive-root gap vanishes, the transmitter-side acceleration weight leaves its certified interval or its floor $\nu_{\mathrm{rec}}^{2\mathrm{B}}$ vanishes, the projected return-map spectrum is not computed, the energy residuals use a different window or branch chart than the motion residuals, or the extracted frequency is not stable under refinement.
   - Treat a visually periodic orbit without these entries as a search hit only. It is not a binary closure certificate.

Plain language: At each reception time, find which past emissions can reach the receiver, compute how the transmitter laid down the wake and how the receiver crosses it, sum the radial acceleration contributions with $W^{\mathrm{acc}}/r^2$ strength, and step forward either with sharp kicks at exact hit times or with thin mollified wake surfaces for smooth integration.

### Radial Attraction

Setup:
- A test architrino with polarity $q'$ falls radially toward a fixed center with polarity $q$.
- Attraction requires unlike polarities, so $\sigma_{qq'}=-1$.
- The fixed transmitter has a unique causal emission time. Its transmitter-side factor is $D_t=c_f$, so receiver radial velocity does not multiply the arriving acceleration.

Objectives:
- Receiver-side baseline equations for $r(T)$ and $V_r(T)$.
- Energy balance and integral expressions suitable for comparison.

Delay equation and exact reduction:
- With field speed normalized to $c_f=1$ and a fixed transmitter location $X_c$, the causal root satisfies $|X(T_r)-X_c|=T_r-T_t$ with $T_t<T_r$.
- The per-hit law yields a line-of-action acceleration whose magnitude depends on the current separation $r(T)=|X(T)-X_c|$ and the transmitter-side acceleration weight:
  $$
  \frac{d^2X}{dT^2} \;=\; \kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(T)^2}W^{\mathrm{acc}}(T)\,\mathrm{sgn}\!\big(X(T)-X_c\big)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bb516dea67c24324)
  With $\sigma_{qq'}=-1$, writing $K=\kappa\,|q q'|>0$ and $r=\lvert X-X_c\rvert$, the radial ODE is
  $$
  \frac{d^2r}{dT^2} \;=\; -\,\frac{K}{r(T)^2}W^{\mathrm{acc}}(T),
  \qquad
  W^{\mathrm{acc}}(T)=1
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3ca850ee2b457e94)
  in field-speed units.

Solvability status:
- The fixed-transmitter case reduces exactly to the inverse-square radial equation. Its mathematical closed forms are therefore valid comparison cases for the trajectory once initial conditions are declared.
- This does not establish a conserved Master-Equation energy account; it establishes only the reduced acceleration equation for this fixed-transmitter geometry.

Notes:
- For a fixed transmitter, $D_t=1$ and $W^{\mathrm{acc}}=1$ in field-speed units. The receiver-side factor $D_r=1-dr/dT$ controls signed root playback, and radial velocity controls instantaneous power.

Use:
- An analytic fixed-transmitter check that must remain invariant when receiver velocity is varied at fixed reception position and retained transmitter history.

Plain language: At the same position and against the same fixed transmitter history, two receivers with different velocities get the same arriving acceleration. Their later paths and the rate at which they replay emission history differ.

### Receiver Velocity and Work

Because $\mathbf A_{o'\leftarrow o}(T_r;T_t)\parallel\hat{\mathbf{r}}$, a single hit changes only the velocity component along its instantaneous line of action:
$$
\left.\frac{d}{dT_r}\mathbf V_\perp\right|_{\text{this hit}}=\mathbf{0},
\qquad
\left.\frac{d}{dT_r}V_r\right|_{\text{this hit}}
=
\mathbf A_{o'\leftarrow o}(T_r;T_t)\cdot\hat{\mathbf{r}}
=
\frac{\kappa\,\sigma_{q_o q_{o'}}\,\lvert q_o q_{o'}\rvert}{r^2}
W_{o'\leftarrow o}^{\mathrm{acc}}(T_r;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-79f5d2581fbf221a)

#### Decomposition and Energetics

- Decomposition at a hit:
  - Write $\mathbf V = V_r\,\hat{\mathbf{r}} + \mathbf V_\perp$, where $V_r=\mathbf V\cdot\hat{\mathbf{r}}$ and $\mathbf V_\perp\cdot\hat{\mathbf{r}}=0$.
  - A single hit changes $V_r$ but not $\mathbf V_\perp$ instantaneously.

- Power and work:
  - The signed instantaneous acceleration-power proxy is $\mathbf A\cdot\mathbf V=(\mathbf A\cdot\hat{\mathbf r})V_r$. It reduces to $\|\mathbf A\|V_r$ only for a repulsive contribution directed along $+\hat{\mathbf r}$; an attractive contribution carries the opposite sign.
  - For the specific kinetic proxy $K_{\mathrm{spec}}=\tfrac12\|\mathbf V\|^2$, the per-hit rate is $dK_{\mathrm{spec}}/dT=\mathbf A\cdot\mathbf V$. An energy-valued bookkeeping row must instead declare the universal conversion $\mu_{\text{arch}}$ and use $K_\mu=\tfrac12\mu_{\text{arch}}\|\mathbf V\|^2$, so $dK_\mu/dT=\mu_{\text{arch}}\mathbf A\cdot\mathbf V$.
  - Orthogonal motion contributes no instantaneous acceleration power. A fixed-transmitter benchmark may identify the radial integral with a potential-energy change, but moving-transmitter, self-hit, and open-boundary histories require the constructive wake/history and boundary terms in [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md).

- Local trend via $1/r^2$:
  - If $V_r<0$ (moving inward), near-future hits tend to be stronger because $r$ shrinks between events; if $V_r>0$, they tend to weaken.

Plain language: Each hit changes only the along-the-line speed at that event; sideways speed is untouched by that contribution. The signed specific-power row follows directly from acceleration and velocity, while an energy claim additionally needs the declared bookkeeping conversion and the applicable history-aware energy construction.

### Repulsion

Setup:
- Two identical-polarity architrinos (for example, $q_1=q_2=+\epsilon$) placed at separation $r_0$ with $V_1=V_2=0$ and symmetry about the midpoint.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Delay differential equations (two-body, $c_f=1$):
- Causal times:
  - $T_t^{(2\to 1)}\in\mathcal{C}_2(T)$ solves $\lvert X_1(T)-X_2(T_t)\rvert = T-T_t$.
  - $T_t^{(1\to 2)}\in\mathcal{C}_1(T)$ solves $\lvert X_2(T)-X_1(T_t)\rvert = T-T_t$.
- Accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  +\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6f74f489f538e74a)
  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  +\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-667f2aac178100cf)
- $W_{12}^{\mathrm{acc}}$ and $W_{21}^{\mathrm{acc}}$ are the corresponding transmitter-side acceleration weights. A root with a failed transmitter-side floor is a branch-transition or caustic case, not an ordinary stable row of this two-body DDE.
- Because the two line-of-action signs are opposite, symmetry implies $X_1(T)=-X_2(T)$ and $A_1(T)=-A_2(T)$ for all $T$ given symmetric initial data.

Solvability status:
- No exact closed-form solution is presently known for the coupled DDE system under mutual repulsion with delay.

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Notes on symmetry and qualitative properties without invoking approximations.

Plain language: Two like polarities at rest push apart along the line under the delayed law; the governing equations are implicit in the causal times, and no closed-form solution is currently known.

### Self-Energy

Purpose: explain why classical "point-charge self-energy" divergences do not arise in this framework, and summarize the role of measure-valued causal surfaces, the $H(0)=0$ convention, and $\eta$-mollification.

#### Classical self-energy pathology (contrast)

In classical electrostatics, a static $1/r$ potential yields an electric field $\mathbf{E}\propto 1/r^2$ with energy density proportional to $\|\mathbf{E}\|^2\propto 1/r^4$. Integrating $1/r^4$ over a ball produces a divergent $\int (1/r^2)\,dr$ near $r\to0$, the textbook "infinite self-energy of a point charge." This is an artifact of modeling the source as an enduring, everywhere-filled near field.

#### Why the zero-radius divergence is quarantined here

This project does not posit a static near field. Instead:

- Measure-valued expanding causal surfaces (no static $1/r$ near field):
  - Each emission is a razor-thin causal isochron with surface density $q/(4\pi r^2)$, represented by $\rho(T,T_t)=(q/(4\pi r^2))\delta(r-c_f\Delta)H(\Delta)$. The support at fixed $T$ is a causal wake surface $S_r$, not a three-dimensional $1/r^2$ fill down to $r=0$. See [Background and Simple Action](../../../../markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md).

- $H(0)=0$ (no coincident self-kick):
  - The instantaneous emission $(\Delta=0)$ contributes no acceleration to the transmitter; $r=0$ roots beyond $\Delta=0$ do not exist because $r=c_f(T_r-T_t)$. This removes the only event where a literal $r=0$ could enter. See [Causal Set and Delay Geometry](../../../../markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md).

- $\eta$-mollification (finite, well-defined work over resolved windows):
  - Replace $\delta(r-c_f\Delta)$ by a narrow Gaussian $\delta_\eta$ with width $\eta>0$ when differentiability is required. Potentials $\Phi_\eta$ and the corresponding potential-gradient bookkeeping variables are then regular functions. On a fixed-transmitter benchmark, a promoted run must test, rather than assume, the resolved-window identity $\Delta E_k=-\Delta U$, with $U=q'\Phi_\eta$, together with boundedness and regulator refinement. A moving-transmitter or self-hit branch instead requires the history-aware energy construction in [Delay Dynamics and Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md); a local potential difference alone does not close its wake and boundary exchange. An $\eta\to0$ claim requires weak convergence of the promoted integrals and stable causal-root identity; mollification alone does not prove that limit. See [Well-posedness and Regularization](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md).

- Event-driven geometry (self-hits occur at $r>0$):
  - A super-field-speed history interval is necessary for simple nontrivial self roots, but the accepted channel additionally requires a same-transmitter causal root, positive separation or declared core regularization, and retained branch floors. On such a chart, self-hits occur at $r>0$ and yield finite $W^{\mathrm{acc}}/r^2$ contributions. The chart does not establish a global absence of short-distance or regulator-limit divergences.

Net effect: within a declared admissible finite-$\eta$ branch chart, the canonical ontology does not include the static near-field integral that generates the classical point-charge divergence. The narrower result is a quarantine, not a global finiteness theorem: a failed branch floor, core convention, window limit, or $\eta\to0$ convergence test still blocks promotion.

#### Practical guidance (numerics and analysis)

- Choose $\eta$ small relative to local geometry (path curvature radius, inter-transmitter spacing) for smooth delayed-history integration. Use $\Delta E_k=-\Delta U$ only for the declared fixed-transmitter benchmark; use the history-aware ledger for general branches.
- Fix comparison normalization on an independently known stationary-transmitter baseline. Agreement between the Green-function surrogate and event-root implementation is parity evidence and does not calibrate away the canonical transmitter-side acceleration weight.
- Treat self-hits as finite-$r$ events only after their root and branch floors pass; ensure $H(0)=0$ in implementation to exclude coincident-time artifacts.

#### Sign-resolved bookkeeping

An additional numerical caution is worth stating explicitly: a Noether sea region or assembly may carry a large internal action budget even when its coarse far-wake potential appears weak.

- Positive and negative sectors can superpose so that the net far-field potential is small.
- That cancellation does **not** imply the underlying kinetic work or stored interaction content is individually small in each sector.
- For this reason, diagnostics should track sign-resolved contributions whenever possible rather than relying only on net-potential summaries.

This matters especially for shielding claims. A strongly shielded assembly may look energetically modest from afar while still containing substantial internal positive/negative activity whose cancellation is only effective after superposition. Sign-resolved ledgers therefore help distinguish true low-energy states from high-content states hidden by cancellation.

Plain language: We do not keep a permanent $1/r$ field attached to an architrino. Thin expanding causal surfaces and the $H(0)=0$ endpoint rule remove the classical static self-energy construction from the admitted chart, while finite-width and zero-width limits still have to pass their own boundedness and convergence tests.

### Self-Interaction Switch

An architrino can intersect an expanding causal isochron that it emitted earlier in its own history. Self-hit occurs when the same-transmitter causal-root set is nonempty, $\mathcal{C}_{aa}(T_r)\ne\varnothing$. Super-field-speed history is a necessary warning condition for simple nontrivial roots, but it is not sufficient by itself; curvature, branch geometry, and the transversality floor determine whether the worldline actually intersects its own causal wake, and an admitted self-hit contribution additionally carries a retained transmitter-side acceleration weight $W^{\mathrm{acc}}$. The like-polarity self-hit contribution is repulsive. On the uniform-circular chart its radial projection is always outward, so it can oppose collapse but cannot supply centripetal support; stability belongs to the complete signed branch ledger.

#### Conditions and Effects

- Root multiplicity and self-roots:
  - The simulation should open the self-hit channel only when it finds same-transmitter roots
    $$
    \mathcal{C}_{aa}(T_r)=\{\,T_t<T_r:\|\mathbf X_a(T_r)-\mathbf X_a(T_t)\|=c_f(T_r-T_t)\,\}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5c21f41edba4512c)
    A speed excursion above $c_f$ flags a candidate interval; it is not an acceptance test without root existence, a nonzero Jacobian/transversality margin, and a retained transmitter-side acceleration weight.
  - Coincident $r=0$ contact is not an active same-transmitter hit. At $\Delta=0$ the convention $H(0)=0$ blocks instantaneous self-kicks, and for a coincident delayed candidate the unit line of action $\hat{\mathbf{r}}$ is undefined. The active channel begins with a nonzero-delay same-transmitter root that supplies direction, transversality, and the transmitter-side acceleration weight.

- Repulsive character:
  - For like-on-like (self) interaction, $\sigma_{q_a q_a}=+1$ ensures the self-contribution points outward along $+\hat{\mathbf{r}}$, opposing further collapse.

- Barrier and scale selection:
  - In binaries and multi-binary assemblies, delayed attraction competes with self-repulsion. On a closed branch chart, the outward self-hit barrier can participate in setting a minimal sustainable radius $d_0$, but the fastest natural frequency $2\pi/t_0$ additionally requires tangential and return-map closure.

Plain language: A fast interval can make self-hit possible, but the code must still solve the same-transmitter root equation and weight each accepted hit by its transmitter-side acceleration weight; only actual same-transmitter hits push outward and help set the smallest sizes and fastest rhythms of stable structures.

### Superposition and Locality

Potential wake contributions from all sources superpose linearly. The net potential at any point is the sum of the individual contributions:
$$
\Phi_{\text{net}}=\sum_i\Phi_i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7b385746e404ec84)
The total acceleration on an architrino at any instant is the vector sum of the contributions from every intersecting causal wake surface. Operationally, every architrino is continuously immersed in the superposed wakes of all others and, when the same-transmitter root condition permits, its own. Calculating the path-history integral requires isolating each causal emission event, evaluating the transmitter-side $W^{\mathrm{acc}}/r^2$ acceleration kernel at that emission, and then summing under a declared finite active horizon, screening rule, cancellation argument, or summation prescription.

The simple rule is: add every causal wake contribution that actually reaches the receiver, but do not pretend that distance alone solves the infinite-background problem. A local simulation must say how far-field wakes are cut off, screened, canceled, summarized, or subtracted.

#### Why Nearby Wakes Dominate

Linear addition happens at the causal-surface level. Each source contributes a distribution supported on its causal wake surfaces, the total wake measure is a sum of those measures, and the acceleration law is linear in the summed contributions.

Locality comes from $1/r^2$ only after convergence control is declared. The surface density on each causal wake surface scales as $1/r^2$, so nearby coherent hits contribute disproportionately compared to distant ones. In an infinite three-dimensional source population this does not by itself guarantee convergence, because the number of sources in a radial layer grows like $r^2\,dr$. Random phases, angular cancellation, screening, finite active horizons, or explicit mean-field/principal-value subtraction must be part of the branch prescription.

The practical consequence is narrow: simulations can prioritize nearby sources and recent roots only after declaring the far-field treatment. The declaration may be cutoff error, multipole cancellation, screened background, sampled mean field, principal-value subtraction, or another explicit summation prescription.

Plain language: Add the pushes from all causal wake surfaces, but do not assume one over distance squared makes an infinite universe automatically finite; the simulation must say how distant wakes cancel, screen, or get summarized.

### Units and Constants

This note fixes the unit and symbol conventions used by the action-energy simulation notes. We work in normalized wake-speed units with $c_f=1$ unless stated otherwise, use $\kappa>0$ for the universal coupling, and use $\eta>0$ as the default regularization thickness for causal isochrons.

Core symbols:

- $c_f=1$: wake speed in normalized units.
- $\kappa>0$: universal coupling constant.
- $\eta>0$: causal-isochron thickness.
- $\epsilon>0$: polarity-unit magnitude; Electrino $q=-\epsilon$, Positrino $q=+\epsilon$.
- $\sigma_{q q'}=\mathrm{sign}(q\,q')\in\{+1,-1\}$.
- $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$, with $\hat{\mathbf{r}}=(\mathbf X_{o'}(T_r)-\mathbf X_o(T_t))/r$.

#### Dynamical Geometry

- Wake-speed units ($c_f=1$):
  - Choosing $L_0,T_0$ with $c_f=L_0/T_0=1$ fixes a conversion between spatial and temporal scales so that all speeds are dimensionless ratios to the wake speed. Kinematics still lives on absolute time × Euclidean space; no spacetime substrate is introduced.
  - Consequence: every velocity appears as a pure number $\|\mathbf V\|$; the threshold $\|\mathbf V\|=c_f$ becomes $\|\mathbf V\|=1$. Rescaling $L_0$ and $T_0$ together leaves all dimensionless predictions invariant.

- Coupling constant ($\kappa>0$):
  - $\kappa$ sets the overall scale of per-hit acceleration. In the canonical law, $ \mathbf A_{o'\leftarrow o} = \kappa\,\sigma_{q_o q_{o'}}\,\dfrac{|q_o q_{o'}|}{r^2}W_{o'\leftarrow o}^{\mathrm{acc}}\,\hat{\mathbf{r}}, $ larger $\kappa$ uniformly strengthens every interaction.
  - Scaling insight: if you scale $\kappa\mapsto \alpha\kappa$ while keeping $(\epsilon,\eta)$ fixed, accelerations scale by $\alpha$. Characteristic assembly scales such as the minimal binary radius $d_0$ and period $t_0$ shift accordingly through the dynamical balance that defines them.

- Regularization width ($\eta>0$):
  - $\eta$ is the width applied to each causal isochron (wake surface) to mollify the surface delta $\delta(r-\Delta)$. It converts impulsive hits into brief, smooth pushes so pointwise quantities such as gradients are defined. The evolution remains a delayed-history problem; an ordinary instantaneous-state ODE solver is insufficient unless the retained history and root reconstruction are supplied explicitly.
  - Geometric guidance: choose $\eta$ small relative to local geometric scales (e.g., the receiver's instantaneous curvature radius along its path and the local receiver-transmitter separation) so the regularized dynamics approximate the ideal path-history picture while remaining numerically stable.

- Polarity-unit magnitude ($\epsilon>0$):
  - $\epsilon$ is the fundamental polarity scale of an architrino (Electrino $q=-\epsilon$, Positrino $q=+\epsilon$). The observer-level calibration target $|e|=6\epsilon$ makes quark electric-charge labels integer multiples of $\epsilon$; it is not an input to the substrate dynamics. The owning conversion convention is in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md#2-charge-reconstruction).
  - Per-wavefront amplitude and emission cadence are constant at the transmitter. The received acceleration magnitude is modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, where $D_t$ records transmitter-side root transversality and $D_r$ records receiver-side playback geometry.

- Sign of interaction ($\sigma_{q q'}$):
  - $\sigma_{q q'}=\mathrm{sign}(q\,q')$ selects attraction vs repulsion while keeping the acceleration strictly collinear with $\hat{\mathbf{r}}$. Like-on-like ($\sigma$=+1) points along +$\hat{\mathbf{r}}$ (repulsion); unlike ($\sigma$=-1) points along -$\hat{\mathbf{r}}$ (attraction).

- Line of action ($r$, $\hat{\mathbf{r}}$, $D_t$, $D_r$, $W^{\mathrm{acc}}$):
  - $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$ is the separation between the receiver at reception time $T_r$ and the transmitter at emission time $T_t$. $\hat{\mathbf{r}}$ is the corresponding unit vector. The transmitter-side factor is $D_t=c_f-\mathbf V_o(T_t)\cdot\hat{\mathbf{r}}$, the receiver-side factor is $D_r=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf{r}}$, and the active branch strength is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. All per-hit acceleration contributions are directed along this line; no transverse or right-hand-rule terms appear.

- Combined role in assembly scales:
  - The trio $(\kappa,\epsilon,\eta)$, together with the $1/r^2$ law, determines emergent scales such as the smallest sustainable orbit $d_0$ and fastest natural frequency $2\pi/t_0$. Intuitively, stronger coupling (larger $\kappa\epsilon^2$) and sharper wake surfaces (smaller $\eta$) favor tighter, faster structures until self-interaction and delay balance inward trends.

- Dimensionless branch-scan controls:
  - Simulation sweeps should report dimensionless controls rather than only raw choices of $(\kappa,\epsilon,\eta,L_0,T_0)$. Choose a reference length $L_\star$ and the corresponding reference time $T_\star=L_\star/c_f$; in field-speed units, $c_f=1$ and $T_\star=L_\star$.
  - **Speed ratio:** use
    $$
    \beta_i(T)=\frac{\|\mathbf V_i(T)\|}{c_f}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0a0bc5d65e8e1afd)
    and, for circular binary scans, the existing speed factor
    $$
    s=\frac{R\omega}{c_f}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dac301d02838fb90)
    A branch scan must state whether the sampled histories remain below, cross, or remain above the self-hit onset $\beta_f=1$.
  - **Delay/window ratio:** use
    $$
    \Theta_{\Delta T}=\frac{\Delta T_{\max}}{T_{\mathrm{win}}}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-22dec982b4dd6f58)
    where $\Delta T_{\max}$ is the longest active causal lookback time and $T_{\mathrm{win}}$ is the averaging, diagnostic, or return-map window. The stored history horizon $h$ must satisfy $h\ge\Delta T_{\max}$ on the scanned branch chart.
  - **Regularization thickness:** use
    $$
    \hat{\eta}=\frac{\eta}{L_\star}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1f5196ad240d203b)
    with local checks such as $\eta/r_{\min}$ against the smallest resolved separation. A scan is numerically meaningful only when branch counts and averaged observables stabilize as $\hat{\eta}$ is reduced while the causal wakes remain resolved.
  - **Coupling scale:** compare the per-hit acceleration scale with the reference acceleration $L_\star/T_\star^2$:
    $$
    g_\kappa
    =
    \frac{\kappa\epsilon^2 T_\star^2}{L_\star^3}
    =
    \frac{\kappa\epsilon^2}{c_f^2 L_\star}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bdfce55a112e1b3c)
    In field-speed units this reduces to $g_\kappa=\kappa\epsilon^2/L_\star$.
  - **Branch/root tolerances:** for the causal-root residual
    $$
    g_{ij}(\Delta T,\phi)
    =
    \|\phi_i(0)-\phi_j(-\Delta T)\|-c_f\Delta T
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-328277424a05be28)
    accept a root only when $|g_{ij}|/L_\star\le\varepsilon_{\mathrm{root}}$, keep distinct roots separated by $|\Delta T_a-\Delta T_b|/T_\star>\varepsilon_{\mathrm{sep}}$, and treat $|J|\le\varepsilon_J$ as a branch-birth or caustic zone rather than an ordinary stable branch.
  - A branch-scan report should therefore include at least
    $$
    (\beta_{\max}\ \text{or}\ s,\ \Theta_{\Delta T},\ \hat{\eta},\ g_\kappa,\ \varepsilon_{\mathrm{root}},\ \varepsilon_{\mathrm{sep}},\ \varepsilon_J)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aaa8556681b2a511)
    together with the active causal-root ledger. This prevents a change in units, regularization, or root finder tolerance from masquerading as a new physical branch.

Plain language: We measure speeds in units where the field speed is one, use $\kappa$ to set how hard every hit pushes, use $\eta$ to slightly thicken the razor-thin isochrons so calculus works, and use $\epsilon$ as the basic unit of polarity. The push is always straight along the line back to where the isochron was emitted, but its received strength is shaped by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; like polarities push out, unlike polarities pull in.

### Well-Posedness and Regularization

The regularized simulation replaces each sharp causal-surface delta by a narrow mollifier while preserving total emission $q$:
$$
\delta(r-\Delta)\longrightarrow
\frac{1}{\sqrt{2\pi}\,\eta}
\exp\!\left(-\frac{(r-\Delta)^2}{2\eta^2}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-54e0db80794b3977)

#### Impulses Versus Smooth Pushes

- Measure-driven dynamics:
  - With exact surface deltas, dynamics are impulsive: velocities are functions of bounded variation with jump discontinuities at hit times.

- Mollified isochron surfaces:
  - Replacing $\delta(\cdot)$ by a narrow Gaussian of width $\eta > 0$ spreads each causal surface’s intersection into a short, smooth push. This can yield classical $C^1$ trajectories on an admitted history chart, but the solver must still retain and reconstruct the delayed path segment.

- Choosing $\eta$:
  - Select $\eta$ small relative to local geometric scales (path curvature radius, inter-source spacing) to approximate the event-driven picture while maintaining numerical stability.

- Distributional wake-surface normalization:
  - Treat $\delta(r-c_f\Delta)$ and $\delta_\eta(r-c_f\Delta)$ as distributions, so the invariant statement is an integrated statement against a test function, not the sampled height of the spike. For $\Delta=T-T_t$ and $r=\|\mathbf X-\mathbf X_0\|$,
    $$
    \rho_\eta(T,\mathbf X)=
    \frac{q}{4\pi r^2}\,\delta_\eta(r-c_f\Delta)\,H(\Delta)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e1212e0b88264975)
    must satisfy
    $$
    \lim_{\eta\to0}\int_{\Sigma_T} f(\mathbf X)\,\rho_\eta(T,\mathbf X)\,dV
    =
    \frac{qH(\Delta)}{4\pi}\int_{S^2} f(\mathbf X_0+c_f\Delta\,\hat{\boldsymbol{\omega}})\,d\Omega
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cfd19abc35d0379a)
  - In particular, $f\equiv1$ gives the total-emission check
    $$
    \int_{\Sigma_T}\rho_\eta(T,\mathbf X)\,dV \longrightarrow qH(\Delta)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-584741a8cc53012c)
    On a finite annulus $R_-\le r\le R_+$, the expected retained amount is
    $$
    Q_{\eta}^{\mathrm{ann}}(R_-,R_+;T)=
    qH(\Delta)\int_{R_-}^{R_+}\delta_\eta(r-c_f\Delta)\,dr
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d4178ffb5c5f9e3f)
    The annular residual is therefore
    $$
    R_N(R_-,R_+;T)\equiv
    \frac{\left|\int_{R_-\le r\le R_+}\rho_\eta(T,\mathbf X)\,dV-Q_{\eta}^{\mathrm{ann}}(R_-,R_+;T)\right|}
    {|q|+\varepsilon_q}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ca1da5e9188e06a9)
    This catches missing $4\pi r^2$ factors, lost radial Jacobians, and mollifiers that do not preserve total emission.

- Curvilinear-coordinate hygiene:
  - Operator checks in spherical or cylindrical charts must use the Euclidean metric scale factors, not Cartesian component formulas applied to curvilinear components. For spherical coordinates $(r,\theta,\varphi)$ centered on the emission point,
    $$
    dV=r^2\sin\theta\,dr\,d\theta\,d\varphi,\qquad
    dS_R=R^2\sin\theta\,d\theta\,d\varphi
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2514fe601e4fff90)
    and a radial diagnostic channel $F_r(r)\hat{\mathbf{r}}$ obeys
    $$
    \nabla\!\cdot\!\big(F_r(r)\hat{\mathbf{r}}\big)=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r(r)\right)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7fbc1f7932406b41)
    For a radial scalar $f(r)$,
    $$
    \Delta f=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2\frac{\partial f}{\partial r}\right)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8efcb9a9ee802fdc)
    The invalid shortcut $\nabla\!\cdot(F_r\hat{\mathbf{r}})=\partial_rF_r$ breaks the conservation normalization of causal wake surfaces.

- Finite-limit discipline:
  - Treat finite architrino count, finite memory depth, finite step size, finite domain/window, and finite $\eta > 0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, transmitter-side Jacobian floors, transmitter-side acceleration weights, work-energy residuals, and thermodynamic summaries being claimed.

- State-dependent branch-transition discipline:
  - State-dependent delay systems can lose classical branch continuation at transition points where a delayed argument crosses a branch boundary, a causal-root count changes, or a derivative-sensitive row enters a fold-layer. A finite-$\eta$ run must therefore record how the regularized trajectory crosses each such window rather than treating the crossing as ordinary time-step noise.
  - For every declared transition window $I_*=[t_*-\Delta_*,t_*+\Delta_*]$, emit
    $$
    \mathcal{T}_{\eta,*}
    =
    \big(
    I_*,
    \mathcal{L}_{\mathrm{root}}|_{I_*},
    \mathsf{status}_{\eta,*},
    \mathsf{regularization}_{\eta,*},
    \mathsf{window\_scale}_{\eta,*},
    \mathcal{Y}_{\eta,*},
    \mathcal{E}_{\mathrm{trans},*}
    \big)
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c7f0b16f67182f63)
    where $\mathsf{status}_{\eta,*}$ is the candidate branch status, chosen from the existing simple-root, fold-layer, inactive-gap, or rejected statuses, $\mathsf{regularization}_{\eta,*}$ names the finite-$\eta$ route used through the window, $\mathsf{window\_scale}_{\eta,*}$ records the declared transition scaling, and $\mathcal{Y}_{\eta,*}$ is the set of observables promoted through that window.
  - For each promoted observable $Y\in\mathcal{Y}_{\eta,*}$, define
    $$
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)
    =
    \frac{\|R(Y_{\eta/2}|_{I_*})-Y_{\eta}|_{I_*}\|_{L^2(I_*,\{x_k\})}}
    {\|R(Y_{\eta/2}|_{I_*})\|_{L^2(I_*,\{x_k\})}+\varepsilon_0}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d9635afe98d7ad56)
  - The transition passes only if
    $$
    \mathsf{status}_{\eta,*}=\mathsf{status}_{\eta/2,*},
    \qquad
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)\le\tau_{\mathrm{trans},Y}
    \quad\text{for every }Y\in\mathcal{Y}_{\eta,*}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c5b6ff3e2bcbcee6)
    and every root-ledger row in $I_*$ keeps transmitter identity, branch class, and status metadata under the same matching rule used by $\Delta_{\eta,\mathrm{root}}$.
  - If the branch status flips under $\eta$ refinement, route the run to $\mathsf{branch\_root\_instability}$. If the status is stable but the promoted transition observables fail the tolerance, route it to $\mathsf{regulator\_dependence}$. If the transition record is missing, route it to $\mathsf{artifact\_incomplete}$.
  - For nonsmooth windows, the transition record must include jump-location rows
    $$
    \mathcal{D}_{\mathrm{jump}}
    =
    \{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
    \qquad
    R_{\mathrm{jump},a}
    =
    \frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
    {\max(\Delta T,\Delta h,\eta/c_f,\varepsilon_0)}
    $$

    [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-96f13f070ee4acb8)
    Unstable jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved jump or interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

- Fold-layer status is only a transition classification. A stable fold-layer row may preserve branch identity through $\eta$ refinement, but it does not prove branch-equation balance. When the run claims a corrected one-period carrier, the acceleration-balance residual for that period must also pass before the result can proceed to monodromy, $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence.

- Energetic consistency:
  - A fixed-transmitter benchmark may verify $\Delta E_k=-\Delta U$ with $U=q'\Phi_\eta$ on resolved intervals. A moving-transmitter, self-hit, or open-boundary branch must instead close the history-aware energy, wake, and boundary terms defined in [Delay Dynamics and Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md). Convergence of interval integrals as $\eta\to0$ is a separate claim governed by the continuation package below; it is not implied by choosing a Gaussian mollifier.

#### Formal $\eta > 0$ Continuation Package

The regularization package for a promoted run family is
$$
\mathsf{Reg}_\eta
=
(\delta_\eta,\mathcal{A}_\eta,\mathsf{WP}_\eta,\mathsf{NR}_\eta,\mathsf{Cont}_\eta,\partial\mathcal{A}_\eta)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7c09d5b583113615)
where $\delta_\eta$ is the mollified causal-wake kernel, $\mathcal{A}_\eta$ is the admissible history set, $\mathsf{WP}_\eta$ is the existence-uniqueness statement, $\mathsf{NR}_\eta$ is the no-runaway bound, $\mathsf{Cont}_\eta$ is the continuation criterion, and $\partial\mathcal{A}_\eta$ is the failure boundary.

On a finite interval $[0,T]$, the admissible history set is
$$
\mathcal{A}_\eta(T;V,d,\nu,B)
=
\left\{
S_{\eta,U}:
\sup_{U\le T}\|\mathbf V(U)\|\le V,\quad
\inf r_{ij,\ell}(U)\ge d,\quad
\inf|\partial_\Delta g_{ij,\ell}(U)|\ge \nu,\quad
\sup B_{ij}^{\mathrm{active}}(U)\le B
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ac37c7d7f2469014)
Existence and uniqueness mean that every declared initial history $S_{\eta,0}\in\mathcal{A}_\eta(T;V,d,\nu,B)$ generates a unique $S_\eta(U)$ on $[0,T]$ in the declared history class, and that the emitted root ledger is generated by that solution rather than by a post-hoc branch choice.

The no-runaway condition requires a validated energy construction, not time-translation symmetry alone. On the same branch chart and isolated window, the packet must identify one accepted construction route from [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), retain the corresponding boundary convention, establish the lower bound
$$
E_{\text{tot}}^{(\eta)}(T)
=
K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T),
\qquad
E_{\text{wake}}^{(\eta)}(T)\ge U_{\min}^{(\eta)}>-\infty
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4d30cffcadfb8fca)
and report
$$
\epsilon_E^{(\eta)}([0,T];\mathfrak B)\le\tau_E
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ed22d01407d60eb)
for a predeclared tolerance $\tau_E$ that remains satisfied under temporal, history-window, and regulator refinement. Only those jointly validated rows license the finite-window kinetic bound
$$
K_{\mu}(T)
\le
E_{\text{tot}}^{(\eta)}(0)-U_{\min}^{(\eta)}
+\left|\mathcal R_E^{(\eta)}([0,T];\mathfrak B)\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6cec12a538a7fe68)
on the isolated run window. Preserved time-translation symmetry is a required input to an action-boundary construction, but it is not by itself a conservation or no-runaway certificate.

The continuation criterion is
$$
S_\eta([0,T])\subset\mathcal{A}_\eta(T;V,d,\nu,B)
\quad\Longrightarrow\quad
\text{the run may be extended past }T
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e9cd9e0c392ca38e)
using the same local well-posedness constants after refreshing the history segment at $T$. The failure boundary is
$$
\partial\mathcal{A}_\eta
=
\{\|\mathbf V\|=V\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{|\partial_\Delta g_{ij,\ell}|=\nu\}
\cup
\{B_{ij}^{\mathrm{active}}=B\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow -\infty\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e4921be8ddf74cc)
Crossing any component of $\partial\mathcal{A}_\eta$ changes the promotion status to $\mathsf{eta\_continuation\_failure}$ unless a stricter replacement bound is proved in the same artifact packet.

For the finite-$\eta$ pathology theorem target in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#finite-regulator-pathology-quarantine-theorem-target), a promoted run family must report the same boundary components as observables, not only as solver diagnostics. Divergent self-energy is routed through the $d$ or $\epsilon_c$ row, runaway behavior through the $E_{\text{wake}}^{(\eta)}$ lower-bound row, pre-acceleration through the retained-history and endpoint-convention row, and caustic blow-up through the $\nu$ and transition-status rows. The minimum residual packet is:

- root residual and root-transport residual for every retained row,
- active transmitter-side Jacobian floor, transmitter-side acceleration-weight floor or certified interval, and inactive-root gap,
- finite-memory coverage and endpoint or period-cut leakage,
- energy, momentum, and angular-momentum residuals computed with the same $\eta$, window, and endpoint convention,
- transition-observable refinement residuals $E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)$ for every fold-layer or caustic transit promoted through the window,
- $\Delta_{\eta,\mathrm{root}}$ for every active branch ledger in the $\eta$ ladder.

If any row is missing, the artifact status is $\mathsf{artifact\_incomplete}$. If a row is present but fails under refinement, the status is the corresponding continuation, regulator-dependence, or branch-root instability failure already defined above.

The $\eta\to0^+$ claim boundary is
$$
\limsup_{\eta\to0^+}E_\eta(Y;\eta,\eta/2)=0,
\qquad
\limsup_{\eta\to0^+}\Delta_{\eta,\mathrm{root}}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-45dc377fe66781af)
for every promoted observable and active branch ledger. Otherwise the result remains finite-$\eta$ evidence only.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges that a delayed-history solver can integrate. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.

## Entropy

Entropy asks what a finite record has forgotten. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it is not a primitive substance, not a field in the Euclidean void, not the generator of absolute time, and not an independent gravitational mechanism. It is a functional of the histories a declared observer, apparatus, simulation packet, or effective description retains after the complete deterministic state has been projected into a finite record.

This chapter collects the entropy rule used across time, energy, measurement, computation, horizon, and cosmology discussions. The central discipline is the same-record rule: a packet may not fit entropy, temperature, flux, probability weights, apparatus cost, or horizon labels from separate hidden ensembles. If a thermal, quantum, horizon, or computational comparison is claimed, the entropy appearing in that comparison must be a projection of the same record that supplies the other quantities.

### Plain-Language Reading

A simple way to read entropy is: entropy measures how many hidden detailed stories could produce the same thing a record can see. A room does not contain an entropy substance. Rather, many exact arrangements of dust, air, books, and clothing can still project to the same coarse record of "messy room." Entropy counts or measures those compatible detailed arrangements after the level of detail has been fixed.

This is also why visible disorder is only a shortcut, not the definition. A jagged, broken, or visually mixed object can still have lower entropy than a smoother thermal state if fewer complete histories are compatible with its retained record. In this chapter, disorder language is acceptable only when it tracks the declared measure, macrostate partition, and unresolved history count.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, inherited entropy language usually measures unresolved path history without naming it that way. Heat spreading, phase scrambling, apparatus irreversibility, and horizon bookkeeping all express the same pressure: a finite record no longer retains enough exact architrino, assembly, causal-wake, boundary, and Noether sea history to reconstruct one unique detailed past.

Entropy remains useful because it audits coarse descriptions. It asks whether a measurement record is really stable, whether heat and work bookkeeping close, whether computation or memory reset has a physical cost, whether a horizon label count comes from real boundary records, and whether a packet is using one hidden record for entropy while using another for temperature, flux, or probability. In that sense, entropy is not fundamental ontology, but it is a powerful test of whether an effective description is physically honest.

For a fixed coarse-graining and access window, entropy is determined by universe path history. The complete path history determines the retained record, the compatible alternatives, and the boundary exchanges. The entropy value is not just a bare property of the universe by itself; it is the value obtained after declaring which histories are being distinguished and which histories are being grouped together.

The retained record may also include incoming causal-wake and potential data. A wake-inclusive entropy measures how many complete source and path-history configurations could produce the same incoming potential record, boundary-wake record, or apparatus response in the declared window. This is the form needed when measurement, radiation, horizon, or Noether sea thermodynamic bookkeeping depends on incoming causal structure rather than only on material state variables inside the window.

A common thermodynamic lesson can therefore be restated without changing the ontology: the same amount of energy can be more or less usable depending on how concentrated, phase-organized, spectrally sharp, or gradient-bearing the retained record is. Energy conservation belongs to the full same-record ledger. Entropy asks how much of that ledger has been dispersed into unresolved alternatives.

The quantum version says the same thing in a sharper language. A complete comparison state may remain pure or measure-preserving, while a subsystem looks mixed after the rest of the entangled record has been placed outside the access window. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that is not proof that information is a primitive substance. It is another record-coarse-graining: the retained channel cannot carry the full compatible path-history and correlation record.

### Core Definition

Let $\mu_T$ be a measure on complete deterministic histories compatible with a declared preparation. In a deterministic substrate this measure is not fundamental randomness. It is the pushforward of preparation-limited ignorance over the unresolved initial history and incoming-wake data. If the preparation fixes the present record at $T_{\mathrm{prep}}$ only up to a retained history depth $h$, let $\nu_{\mathrm{prep}}$ be the measure on the unfixed segment $[T_{\mathrm{prep}}-h,T_{\mathrm{prep}}]$ and let $\mathcal{F}_{T_{\mathrm{prep}}\to T}$ be the deterministic delayed-flow map. Then

$$
\mu_T
=
\left(\mathcal{F}_{T_{\mathrm{prep}}\to T}\right)_*\nu_{\mathrm{prep}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d02a207cc2ecbebe)

This is the official reading of $\mu_T$ in this chapter: probabilities describe unresolved retained history under a declared preparation, not stochastic substrate law. Deterministic multistability becomes important because $\nu_{\mathrm{prep}}$ can spread over multiple basins before the flow sharpens it into a record-limited outcome distribution.

Let $W(T)$ be the access window and let $\mathcal{Q}$ be the coarse-graining used by a Physical Observer, apparatus, or simulation packet. The record projection

$$
\Pi_{\mathcal{Q},W}:\Gamma_T\longrightarrow \mathcal{Z}_{\mathcal{Q},W}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c51d1c26cf596fd3)

maps complete histories into retained record variables. Here $\Gamma_T$ is the preparation-conditioned complete-history space at absolute time $T$, and $\mathcal{Z}_{\mathcal{Q},W}$ is the retained record-state space selected by the coarse-graining and access window. The pushed-forward record measure is

$$
\nu_{\mathcal{Q},W,T}
=
(\Pi_{\mathcal{Q},W})_*\mu_T
=
(\Pi_{\mathcal{Q},W})_*
\left(\mathcal{F}_{T_{\mathrm{prep}}\to T}\right)_*
\nu_{\mathrm{prep}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d5fa004c9aae8977)

and the corresponding observer-window entropy is

$$
S_{\Pi,W}(T)
=
k_B\,\mathcal{H}\!\left(\nu_{\mathcal{Q},W,T}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-652414f6f55d17de)

where $\mathcal{H}$ is the entropy functional appropriate to the retained record measure.

On a continuous record space, the entropy functional also requires a declared reference measure $\lambda_{\mathcal{Q},W}$. When $\nu_{\mathcal{Q},W,T}$ is absolutely continuous with respect to that reference, write

$$
\mathcal{H}_{\lambda_{\mathcal{Q},W}}
\!\left(\nu_{\mathcal{Q},W,T}\right)
=
-
\int_{\mathcal{Z}_{\mathcal{Q},W}}
\log\!\left(
\frac{d\nu_{\mathcal{Q},W,T}}
{d\lambda_{\mathcal{Q},W}}
\right)
d\nu_{\mathcal{Q},W,T}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7ae0d5858da7a312)

Bare differential entropy is chart-dependent, so neither the coordinate chart nor its volume element may remain implicit in a quantitative entropy claim.

Thus the entropy is evaluated on the composite forgetting map from unresolved preparation history, through deterministic delayed evolution, into the retained record quotient. A quantity is entropy-relevant only when it is not constant on the fibers of this composite map. If two complete histories differ but project to the same retained record, that unresolved fiber contributes to the entropy; if an invariant remains constant across every compatible fiber, it does not create entropy in that coarse-graining.

The exact data-processing statement concerns distinguishability between candidate history measures. For two preparation-conditioned measures $\mu_T$ and $\mu'_T$ satisfying the required absolute-continuity conditions,

$$
D_{\mathrm{KL}}
\!\left(
(\Pi_{\mathcal{Q},W})_*\mu_T
\mathrel{\|}
(\Pi_{\mathcal{Q},W})_*\mu'_T
\right)
\le
D_{\mathrm{KL}}
\!\left(
\mu_T
\mathrel{\|}
\mu'_T
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-545fdfd3ca357464)
Projection cannot increase the retained record's ability to distinguish the two candidate history ensembles. This loss of distinguishability is not automatically an increase of Shannon or thermodynamic entropy; an entropy-growth claim still requires the fixed reference measure, coarse-graining, access window, and boundary ledger declared above.

For a discrete coarse partition with probabilities $p_\alpha$, this reduces to the familiar Gibbs/Shannon form

$$
S_{\mathcal{Q}}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-07a57793d3877ba2)

For a microcanonical retained window, the same idea is written as

$$
S_{\mathcal{Q},W}(T)
=
k_B\log \mu\!\left(\Gamma_{\mathcal{Q},W(T)}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3004d4ff5fe0f531)

where $\Gamma_{\mathcal{Q},W(T)}$ is the set of complete microhistories compatible with the retained macroscopic records in that window.

Plain language: entropy is not counted over reality in the abstract. It is counted over the alternatives left unresolved after the record map, measure, coarse-graining, and access window have been specified.

The exact-record limit is useful as a guardrail. If the retained partition distinguishes one complete deterministic history from every other complete deterministic history, then the active cell has probability one and the corresponding entropy is zero. That does not mean thermodynamics has disappeared from the world. It means the record has been refined until it no longer asks a thermodynamic question. A thermodynamic macrostate is a physically declared grouping of histories: a pressure, temperature, density, spectral, boundary, apparatus, or control-relevant record that a real system can retain and use.

Equivalently, entropy is a functional on the quotient $\Gamma_T/\!\sim_{\mathcal Q,W}$. Refining the quotient shrinks fibers and cannot increase the active-cell log-fiber measure when the underlying preparation measure is held fixed; coarsening the quotient merges fibers and can increase it. The number therefore has physical content only after the quotient map, measure, access window, and comparison job are declared.

#### Measure-Domain and Flow Guardrail

The measure notation above is conditional on a declared delayed-history domain. For a finite retained memory depth $h$ and regularization $\eta>0$, one admissible setting is a path-history space
$$
\mathfrak{X}_{h,\eta}
=
C\!\left([-h,0];\mathcal{Z}_{\eta}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-88e352bcac5be834)

where $\mathcal{Z}_{\eta}$ is the declared regularized state space for $\mathsf Z=(\mathbf X,\mathbf V)$; a finite-dimensional Galerkin or return-section chart is another admissible setting when its projection error is included in the record. The preparation measure must be defined on that domain, and the delayed flow must at least be measurable on the retained window.

Conservation of fine-grained entropy requires more. The branch must supply an invariant or suitably quasi-invariant history measure for the declared flow, with its regularization, endpoints, and memory-boundary convention fixed. Determinism alone does not provide a Liouville theorem for a state-dependent or neutral delayed system. Extending a finite-memory or regularized claim to $h\to\infty$ or $\eta\to0$ is therefore a closure target, not a consequence of the entropy definition.

#### Receiver Inference Fibers and Provenance Graphs

The wake-inclusive form has a canonical substrate construction. For a receiver $i$ at event $(\mathbf X_i(T),T)$, let the retained hit record be

$$
\mathcal{H}_i^{\mathrm{hit}}(T)
=
\left\{
\left(\ell_\rho,\|\mathbf{A}_\rho\|\right)
\right\}_{\rho\in R_i(T)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c1a96d4138be1abb)

where $\rho\in R_i(T)$ indexes an active received root, $\ell_\rho$ is the retained unoriented line of action, and $\|\mathbf{A}_\rho\|$ is the retained hit strength. If an apparatus retains oriented directions or source tags, those data are added to $\mathcal{H}_i^{\mathrm{hit}}$ explicitly. The receiver inference fiber is

$$
\Gamma_i^{\mathrm{hit}}(T)
=
\left\{
\gamma\in\Gamma_T:
\text{the delayed branch sum of }\gamma
\text{ reproduces }
\mathcal{H}_i^{\mathrm{hit}}(T)
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7cdb17d11b9d0cd8)

and the receiver-hit entropy is

$$
S_i^{\mathrm{hit}}(T)
=
k_B\,\mathcal{H}
\left(
\mu_T\big|_{\Gamma_i^{\mathrm{hit}}(T)}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5e11552e3011c989)

This is the entropy of the receiver's inference fiber. The electrino/positrino antipode ambiguity and the surrogate-location recast described in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#informational-ambiguity-at-the-receiver) are then measure-preserving involutions on $\Gamma_i^{\mathrm{hit}}(T)$ whenever the retained hit record is unchanged by the recast. Measurement uncertainty at this level is therefore a computable fiber multiplicity, not a slogan added after the dynamics.

When $\mathcal{H}$ is evaluated as a probability entropy, the restricted measure is normalized on $\Gamma_i^{\mathrm{hit}}(T)$. If the fiber has zero or undefined measure under the declared preparation, the receiver-hit entropy is not licensed for that packet.

For windows with many retained roots, define the causal-wake provenance graph $G_{\mathrm{prov}}(W)$: vertices are retained causal roots in $W$, and two vertices are joined when their roots trace to a common transmitter worldline segment in the compatible complete histories. This graph is the common native carrier for three entropy uses below: its connectedness supplies history-backed concordance, its edge cuts supply access-cut entropy, and its boundary-crossing edges supply the wake-escapement contribution to the arrow-of-time ledger.

More precisely, $G_{\mathrm{prov}}(W)$ is the 1-skeleton of the receiver-transmitter provenance complex retained by the packet. Its connected components give the local concordance structure, its cut space gives access-cut entropy, and its boundary operator records which provenance edges leave the retained window. The graph is therefore not an analogy for information. It is the combinatorial record of which transmitter labels and path-history distinctions remain recoverable after the hit record has been projected.

### Minimum Specification

Every entropy statement in $\mathbb{A}\mathbb{A}\mathbb{A}$ should declare five ingredients before the number is treated as physical. First, it should name the preparation and measure $\mu_T$ on compatible deterministic histories. Second, it should name the access window $W(T)$ and retained record carrier: apparatus state, boundary wake data, Noether sea state, Physical Observer record, or simulation packet. Third, it should name the coarse-graining $\mathcal{Q}$ and the projection $\Pi_{\mathcal{Q},W}$. Fourth, it should state the comparison job: work availability, heat flow, coding, measurement locking, horizon label counting, cosmology, or another defined use. Fifth, for open windows, it should include boundary flux and record-change residuals rather than silently treating the window as isolated.

This checklist is not extra ontology. It is the minimum context needed for an entropy claim to say something definite. Without these ingredients, a phrase such as "the entropy increased," "the system is maximally entropic," or "information was lost" has not yet specified which alternatives were unresolved, which record retained them, or which comparison class made the claim meaningful.

### Temperature as a Same-Record Ensemble Variable

Temperature inherits the same discipline. It is not a primitive substrate property of an architrino, a single Noether braid, or the Euclidean void. It is an effective ensemble variable admitted only when a declared coarse-graining retains enough accessible energy exchange, state counting, and local stability for a thermodynamic or kinetic readout to be meaningful.

A minimal temperature-availability record should declare the ensemble, retained window, measure, energy ledger, fixed inventory, fixed volume or access variable, retained Noether sea state, equilibrium or thermalization residual, and observer handoff. Schematically,

$$
\mathcal A_T(W)
=
\left(
\mathcal Q,
W,
\mu,
E_{\mathcal Q,W},
\mathcal N,
\mathcal V,
\theta_{\text{sea}},
\mathcal R_{\mathrm{eq}},
\mathcal O_{\mathrm{obs}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7fa143c0847a4786)

where $\mathcal R_{\mathrm{eq}}$ records whether local thermodynamic equilibrium, detailed balance, or another thermalization condition has been derived, and $\mathcal O_{\mathrm{obs}}$ records how the temperature is measured, redshifted, or reconstructed. If $S_{\mathcal Q,W}$ is physical entropy and the derivative is stable inside the declared record, the temperature channel is

$$
\frac{1}{T_{\mathcal Q,W}}
=
\left(
\frac{\partial S_{\mathcal Q,W}}
{\partial E_{\mathcal Q,W}}
\right)_{\mathcal N,\mathcal V}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e50470a88034bb5c)

A kinetic temperature is a special limit of the same rule, not a separate ontology. It is available only when the accessible velocity or mode distribution has thermalized under the local interaction rules. For example, a Maxwell-Boltzmann comparison may be used only after the retained packet shows

$$
f_{\mathcal Q}(\mathbf{v};\theta_{\text{sea}})
\approx
f_{\mathrm{MB}}(\mathbf{v};T_{\mathrm{kin}})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d05af14c09f7f759)

inside a declared tolerance. Without that ensemble measure or entropy-energy derivative, a high cadence, high internal energy, strong medium response, or local excitation is not yet a temperature.

At human scales, the temperature of matter is therefore a bulk property of Standard Model assemblies and their accessible modes. Atoms, molecules, solids, and plasmas redistribute energy through translational motion, molecular rotation and vibration, electron-envelope excitation, lattice or phonon occupation, photon exchange, recoil, and local Noether sea response. The scalar temperature summarizes the accessible distribution after coarse-graining; it does not measure all shielded internal assembly energy, and it is not a hidden sink for event-ledger imbalance. If a channel becomes heat, the event record must still route the energy into named electron-envelope, bonding or lattice, Noether sea, recoil, remnant, boundary, or radiation rows.

For Noether sea cadence transport, the same-record condition means temperature may bias the rates of accepted branch-ledger transitions but may not be treated as a direct single-braid heat property. The theorem target is stated in [Noether Sea](../../../../markdown/aaa/spacetime/noether-sea.md#temperature-conditioned-branch-transition-target).

### Work Availability and Energy Spread

Traditional thermodynamics often introduces entropy as a measure of energy spread. In this chapter that is the work-availability face of record coarse-graining. A hot reservoir, chemical store, coherent photon-channel stream, or gravitational potential gradient is low entropy only relative to a work channel and comparison record that can use the concentration. After the same energy is distributed among many thermal, boundary, or wake-history microrecords, the total energy ledger may still close, but the retained record supports less extractable work.

For a fixed reference bath or readout channel with temperature $T_R$ declared by the same record, define the availability diagnostic

$$
A_{\mathcal{Q},W}^{(T_R)}(T)
=
E_{\mathcal{Q},W}(T)
-
T_R S_{\mathcal{Q},W}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9e9e516ea1e74787)

This is a diagnostic, not a new substrate property. In a closed isothermal comparison, the useful work extractable from the retained packet is bounded by the decrease of this same-record availability,

$$
W_{\mathrm{useful}}
\le
A_{\mathcal{Q},W}^{(T_R)}(T_i)
-
A_{\mathcal{Q},W}^{(T_R)}(T_f)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3adfd7250e4ba0ba)

up to declared control and boundary residuals. A packet that conserves $E_{\mathcal{Q},W}$ while increasing $S_{\mathcal{Q},W}$ has not lost energy. It has lost retained work availability in that comparison channel.

For resource-theory uses, the maximum work must also be indexed by the allowed apparatus control and readout class. Let $\mathcal{C}^{\mathrm{ctrl}}_W$ denote the declared controls, measurements, feedback operations, and reset operations available in the window, and let $R_f$ denote the required final record. Then the same physical packet supports the diagnostic

$$
W_{\max}\!\left(\theta_W;\mathcal{C}^{\mathrm{ctrl}}_W,R_f\right)
=
\sup_{\alpha\in\mathcal{C}^{\mathrm{ctrl}}_W}
\Delta E_{\mathrm{weight}}\!\left[\alpha:\theta_W\to R_f\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ca4951d25b4b8f31)

The value can change when the apparatus record contains which pressure side, molecule class, isotope channel, or other controllable distinction is present. That is not a psychological addition to physics. It is a different physical record and a different control/readout channel. In $\mathbb{A}\mathbb{A}\mathbb{A}$, an entropy that claims to measure available work must therefore declare $\theta_W$, $\mathcal{C}^{\mathrm{ctrl}}_W$, and $R_f$ together.

This also disciplines heat-death language. A claim that a universe window has no usable work left is not a bare statement about the complete microstate; it is a statement about a declared class of controls, readouts, reservoirs, and final records. For a control family $\mathcal{C}^{\mathrm{ctrl}}$ over admissible windows, the remaining work-availability envelope can be written schematically as

$$
\mathcal{A}_{\mathrm{use}}(T;\mathcal{C}^{\mathrm{ctrl}})
=
\sup_{W,R_f}
W_{\max}\!\left(\theta_W(T);\mathcal{C}^{\mathrm{ctrl}}_W,R_f\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d244d05e174e24c)

For $\mathbb{A}\mathbb{A}\mathbb{A}$ this envelope must distinguish exposed gradients from shielded internal assembly energy. If the declared control class includes operations that can change shielding, write schematically

$$
\mathcal{A}_{\mathrm{use}}
=
\mathcal{A}_{\mathrm{exposed}}
+
\mathcal{A}_{\mathrm{deshield}},
\qquad
\mathcal{A}_{\mathrm{deshield}}
=
\sup_{\alpha\in\mathcal{C}^{\mathrm{ctrl}}_{\mathrm{shield}}}
\sum_A
\left(\zeta_{\text{probe},\alpha}(A)-\zeta_{\text{probe},0}(A)\right)_+
E_{\text{internal}}(A)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c57f5580363bf27d)

Here $\mathcal{C}^{\mathrm{ctrl}}_{\mathrm{shield}}$ is the possibly empty class of operations that can raise an assembly's probe-channel leakage in the declared window, $\zeta_{\text{probe},0}$ is the initial probe-channel leakage, and $[x]_+=\max(x,0)$. If topological assembly protection forbids such leakage-raising operations, $\mathcal{A}_{\mathrm{deshield}}$ is not available to the control family. If shielding is reversible or partially controllable, heat-death language is stronger than exposed-gradient exhaustion and must include the accessible de-shielding term.

This reservoir term is not unlimited. The reservoir branch must begin inside the same scalar-mass shielding window used by the mass map. In the probe channel, deep shielding is constrained by the positivity condition in [Energy](../../../../markdown/aaa/dynamics/energy.md#emergent-inertia-mass-from-shielded-energy):

$$
\zeta_{\text{probe}}(A)(1+\delta\mathcal M_0)
>
\frac{1}{3}
\left|
\mathcal Z_{\mathrm{tf},ab}(A)\delta\mathcal M_{\mathrm{tf}}^{ab}
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-00d5e9889b634686)

If the initial branch lies below that window, it has not supplied a positive scalar-mass reservoir for this work-availability comparison. Raising $\zeta_{\text{probe}}$ can expose internal energy, but the extraction path is still constrained by branch survival: an assembly de-shielded so far that it exits the mass map or dissociates has stopped being the same matter reservoir whose work availability was being counted.

A heat-death statement for that control family means $\mathcal{A}_{\mathrm{use}}$ tends to zero or below the declared operational threshold. It does not prove that every possible future record system, assembly class, or Noether sea access channel has no usable distinction. It proves only the exhaustion of usable gradients and accessible shielded reservoirs for the stated comparison class.

For open windows, the same point must be stated with boundary records. A planetary, biological, or engineered window may receive and emit nearly equal total energy while still being driven by low-entropy input. The relevant record distinguishes incoming concentrated photon-channel packets, chemical gradients, or potential-gradient data from outgoing lower-frequency radiation, heat, and boundary-wake history:

$$
\mathcal{B}_{\partial W}^{\mathrm{therm}}
=
\left(
\dot E_{\mathrm{in}},
\rho_{\mathrm{in}}(\nu,\Omega),
\dot E_{\mathrm{out}},
\rho_{\mathrm{out}}(\nu,\Omega),
\mathcal{B}_{\mathrm{wake}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-023b39cf30d1f321)

where $\rho_{\mathrm{in}}$ and $\rho_{\mathrm{out}}$ are retained spectral/angular records, not new ontological fluids. The entropy claim is physical only when this boundary record is the same one used for energy flux, internal work, heat, and observer readout.

### Complexity and Driven Intermediate Windows

Entropy and complexity answer different questions. Entropy compares how many compatible histories remain unresolved after a coarse-graining. Complexity asks whether the path between low-entropy and high-entropy records passes through organized intermediate structures. Low entropy can be simple, high entropy can be simple, and the interesting dynamics often occur in a driven window between them.

For a locally organized window $W$, the same-record statement is not that organization defeats the second law. It is that internal record maintenance is paid for by boundary exchange:

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{inside}}
+
\Delta S_{\mathcal{Q},\partial W+\mathrm{env}}^{\mathrm{export}}
\ge
0,
\qquad
\Delta S_{\mathcal{Q},W}^{\mathrm{inside}}\le 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-862813fe9924497e)

where both terms are computed from the same access window, coarse-graining, and boundary record. The first term may describe the maintained organization of a cell, reaction network, engineered refrigerator, or other open subsystem. The second term records the exported heat, lower-grade radiation, reaction byproducts, wake-boundary history, and environmental disorder that make the local organization possible.

Origin-of-life and metabolism-first arguments are useful comparison pressure at this level. They do not show that entropy creates life, and they do not add biological ontology to $\mathbb{A}\mathbb{A}\mathbb{A}$. They say that a plausible prebiotic reaction window must name usable gradients, compartment-like retention, reaction throughput, and entropy export. In native terms, that becomes a finite-window reaction-ledger problem: the source record must show how low-entropy chemical, photon-channel, geothermal, or potential-gradient input is converted into persistent organized records while the boundary ledger exports a larger entropy burden.

For assembly formation, the driven intermediate window can be made into an order parameter rather than only a qualitative contrast. Split the retained wake record in $W$ into a coherent phase-locked part and an incoherent exported or background part under the same coarse-graining $\mathcal Q$. Define

$$
\mathcal{C}_W
=
\frac{S_{\mathcal{Q},W}^{\mathrm{incoh}}}
{S_{\mathcal{Q},W}^{\max}}
\left(
1
-
\frac{S_{\mathcal{Q},W}^{\mathrm{coh}}}
{S_{\mathcal{Q},W}^{\max}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7cefab91c3835353)

The quantity peaks when a sharply organized coherent core coexists with substantial exported or surrounding incoherent entropy. Stable assemblies are therefore candidate local maxima or ridges of $\mathcal{C}_W$ under the second-law export constraint above. The Noether braid program can test this directly by asking whether phase-locked trajectory bundles sit on such ridges while the surrounding Noether sea and wake-boundary ledger pay the entropy cost.

### Mapping in from Standard Entropies

Legacy entropy formulas survive as effective projections with different prerequisites.

Clausius entropy, $dS=\delta Q_{\mathrm{rev}}/T_{\mathrm{temp}}$, is licensed only in a regime where the reversible comparison class, heat channel, and temperature channel are defined by the same physical record. Without that record, the formula is a comparison mnemonic rather than a substrate claim.

The Clausius definition also has a direction of dependence that must not be reversed. A cycle statement can be made without entropy:

$$
\oint \frac{\delta Q}{T}\le 0,
\qquad
\oint_{\mathrm{rev}}\frac{\delta Q_{\mathrm{rev}}}{T}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-eb3ae6f3bd77fe38)

for the declared heat reservoirs, temperature scale, and reversible comparison class. Only after that integrability condition is available does the entropy difference

$$
\Delta S_{\mathrm{Cl}}
=
\int_{A}^{B}\frac{\delta Q_{\mathrm{rev}}}{T}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-427412577e15da0c)

become path-independent. In this chapter, a claim that "entropy broke the second law" must therefore specify which entropy is being used. If the Clausius integrability condition fails, the thermodynamic entropy used in that comparison was not well-defined in the first place.

The framework also conditionally expects, on a certified sea branch, where this integrability fails. Let the Noether sea retuning lag on a thermodynamic cycle be

$$
\Lambda_{\text{sea}}(W)
=
\frac{
T_{\text{retune}}\!\left(\theta_{\text{sea}}\right)
}{
T_{\text{cycle}}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de8aeecf345df1bf)

where $T_{\text{retune}}$ is the relaxation time for the Noether sea response variables retained by the packet and $T_{\text{cycle}}$ is the duration of the reversible-comparison cycle. Clausius entropy is expected to be path-independent only in the regime $\Lambda_{\text{sea}}\ll1$. When $\Lambda_{\text{sea}}\gtrsim1$, the sea carries cycle-scale hysteresis, the heat channel is history-dependent, and $\oint\delta Q_{\mathrm{rev}}/T_{\mathrm{temp}}$ is not a well-defined state function for that record.

In differential-form language, $\delta Q/T_{\mathrm{temp}}$ is an exact 1-form only in the fast-retuning regime where the Noether sea response closes before the comparison cycle completes. When $\Lambda_{\text{sea}}\gtrsim1$, the same form acquires a nonzero period around the cycle: the hysteresis-loop area is the observable obstruction to treating thermodynamic entropy as a state function on that packet. The predicted simulation signature is a loop area that grows with the sea-retuning lag rather than with an independently assigned entropy defect.

Boltzmann entropy, $S=k_B\log \Omega$, maps to the count or measure of complete architrino and assembly histories compatible with the retained macrostate. The textbook counting form is the uniform-weight special case of Gibbs/Shannon entropy:

$$
p_\alpha=\frac{1}{\Omega}
\quad\Longrightarrow\quad
-k_B\sum_{\alpha=1}^{\Omega}p_\alpha\log p_\alpha
=
k_B\log\Omega
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-56ca9b5506deb8f2)

Thus the count is not licensed by cardinality alone. It also assumes the measure that gives the compatible microstates equal weight, usually through an isolated equilibrium comparison or another declared physical preparation. The macrostate partition is part of the claim. Changing the partition or the measure changes the entropy statement. A singleton partition over exact complete histories would assign zero Boltzmann entropy to every cell, but it would also erase the thermodynamic question. Useful Boltzmann entropy requires retained macrostates tied to measurable, controllable, or dynamically stable distinctions.

Elementary thermal examples often count energy-quanta arrangements: one macrostate may specify only how much energy lies in each body, while many bond-level or molecule-level allocations remain unresolved. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement is the same mathematical role with a deeper state space: count complete deterministic histories compatible with the retained energy, wake, boundary, apparatus, and Noether sea records.

Gibbs and Shannon entropies map to pushed-forward measures over unresolved alternatives. They are useful for apparatus states, basin weights, branch records, and coding descriptions, but they become thermodynamic only when the apparatus, environment, boundary exchange, and work or heat ledger are physical parts of the same packet. Gibbs entropy is the natural comparison when the retained measure encodes uncertainty over alternatives that change available work under a declared control class; Boltzmann entropy is tied to the retained macrostate partition itself. Both are valid only with their intended job stated.

At deterministic-multistability points, the same measure gives the effective branch weights a record-limited observer must assign. If the unresolved preparation fiber is $\Gamma_{\mathrm{prep}}$ and the deterministic basins $\{B_k\}$ partition the post-event branch outcomes, define

$$
w_k
=
\frac{
\mu_T\!\left(
\mathcal{F}_{T\to T_+}^{-1}(B_k)
\cap
\Gamma_{\mathrm{prep}}
\right)
}{
\mu_T\!\left(\Gamma_{\mathrm{prep}}\right)
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d66a142244462fcd)

and the effective outcome entropy is $-k_B\sum_k w_k\log w_k$. Entropy does not select which branch the actual complete microstate takes. The measure $\mu_T$ predicts the branch weights that any record-limited observer must assign before the missing path-history distinctions are recovered. This is the direct entropy handoff to Born-rule closure.

Von Neumann and entanglement entropies map to a declared quantum comparison record, factorization, and access cut. For a retained sector $A$ and unresolved complement $\bar A$, the standard reduced record is

$$
\rho_A(\theta)
=
\mathrm{Tr}_{\bar A}\rho_{A\bar A}(\theta)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cac11114d19667e3)

with entropy

$$
S_A(\theta)
=
-k_B\,\mathrm{Tr}\!\left(\rho_A(\theta)\log\rho_A(\theta)\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8864618cd932a12a)

Even when the full comparison state is pure, reversible, or measure-preserving, $S_A$ can be nonzero because correlations with $\bar A$ have been excluded from the retained record. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is an access-cut entropy: the same mathematical role must be recovered as coarse-graining over unresolved path-history, apparatus, boundary-wake, and Noether sea correlations that cross the declared cut.

The native carrier is the provenance graph across the access cut. For a cut $\Sigma$ separating retained sector $A$ from complement $\bar A$, build

$$
G_{\mathrm{prov}}(\Sigma)
=
\left(
V_A\sqcup V_{\bar A},
E_{\Sigma}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-13793d1954c6ff5d)

where vertices are retained roots on the two sides and an edge records that two roots share a compatible transmitter worldline segment. The record entropy across the cut is governed by the number of transmitter-history assignments compatible with the same boundary hit record,

$$
S_{\Sigma}^{\mathrm{rec}}
\sim
k_B\log
\left|
\operatorname{Assign}
\left(
G_{\mathrm{prov}}(\Sigma),
\mathcal{B}_{\Sigma}
\right)
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dbca934e3fdd96a1)

The global record can remain pure or closed because $G_{\mathrm{prov}}$ is connected in the complete history, while the retained subregion is mixed because the edge cut has hidden the complementary provenance.

This gives a native area-law route. The access-cut entropy is bounded by the crossing-edge capacity $|E_{\Sigma}|$: it cannot exceed the log of the compatible assignments carried by provenance edges that thread the cut. For a horizon interface, the terminal-alignment target becomes the special case in which the crossing-edge density is set by aligned Noether braid patches and their admissible labels $(\chi_u,N_{s,u},M_{p,u})$. The $1/4$ coefficient is then a statement about cut capacity per retained patch area, not a coefficient fitted after a separate horizon entropy has been assumed.

For a coding record with source distribution $P=\{p_i\}$, the Shannon entropy in bits is

$$
H_2(P)
=
-\sum_i p_i\log_2 p_i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-55d214c966975711)

This has a precise compression interpretation: for any prefix-free code $\mathcal{C}$ that encodes symbols drawn from $P$, the average code length obeys

$$
\bar L_{\mathcal{C}}(P)
\ge
H_2(P)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-91a0fc328c7189d2)

with block codes able to approach the bound under the usual coding assumptions. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this is not free-floating information. It is an entropy of a declared symbol record, model class, and decoding channel.

Cross-entropy makes the model dependence explicit. If an encoding or prediction model uses $Q=\{q_i\}$ while the retained source record is distributed as $P$, the expected code length is

$$
H_2(P,Q)
=
-\sum_i p_i\log_2 q_i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aa7fc6e93bb39f97)

The excess over $H_2(P)$ measures model mismatch, not a new substrate ingredient. This is why next-symbol prediction and compression can be equivalent for a predictive coding apparatus while remaining an observer-level modeling statement. The entropy becomes physical only after the symbol carrier, probability source, encoder, decoder, training or update channel, and device/boundary cost are part of the same record.

Record entropy maps to durable alternatives in an apparatus or observer channel. A record is not merely a symbolic label. It is an assembly/environment state that persists long enough to be read, copied, or reset within a declared window.

Horizon entropy maps to observer-accessible boundary or horizon-interface label capacity. It is not a literal statement that the Euclidean void is made of area bits. The label count must be derived from strong-field Noether sea and Family-A records.

Computation entropy maps to implemented device cost. Bit logic alone does not create a thermodynamic cost. A cost claim is physical only after the device state space, success criterion, reset operation, heat/work ledger, and boundary exchange have been declared.

### Mapping out to Effective Physics

The outward map from $\mathbb{A}\mathbb{A}\mathbb{A}$ to effective entropy has five steps.

First, choose the physical window $W$ and the record carrier: apparatus, boundary wake data, Noether sea state, simulation domain, or Physical Observer record. When work extraction is in view, also choose the allowed control/readout class. Second, choose the coarse-graining $\mathcal{Q}$ that defines which complete histories count as the same retained state. Third, push the complete-history measure forward through $\Pi_{\mathcal{Q},W}$. Fourth, compute the entropy functional on the retained measure. Fifth, compare that result to the relevant effective law only with the same record still in force.

For open or cosmological windows, entropy bookkeeping must expose production, boundary flux, and record-change residuals:

$$
\frac{dS_{\mathcal{Q},W}}{dT}
=
\sigma_W(T)
-
\int_{\partial W(T)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
+
\mathcal{R}_{\mathcal{Q}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-efa0c673ea34bd29)

Here $\sigma_W$ is local production inside the retained window, $\mathbf{J}_S$ is entropy flux through the boundary, $s_{\mathcal{Q}}$ is the retained entropy density, $\mathbf{u}_{\partial W}$ is the velocity of a moving window boundary, and $\mathcal{R}_{\mathcal{Q}}$ records changes in the coarse-graining or retained record set. For a fixed window, $\mathbf{u}_{\partial W}=\mathbf{0}$ and the expression reduces to the ordinary boundary-flux form.

On a regular observer chart, the projection rank, retained variables, reference measure, and coarse-graining are fixed. When a branch fold, record separator, projection-rank change, or coarse-graining handoff changes that chart, $\mathcal{R}_{\mathcal{Q}}$ is the bookkeeping correction produced by comparing the old and new record maps. It is not a local production term and must not be absorbed into $\sigma_W$ or the boundary flux. A quantitative chart-change row must name both maps and compare them through a declared common refinement; otherwise an apparent entropy jump cannot be assigned uniquely to physical irreversibility rather than changed bookkeeping.

A monotone entropy statement is therefore conditional:

$$
\frac{dS_{\mathcal{Q},W}}{dT}\ge 0
\quad\Longleftrightarrow\quad
\sigma_W(T)+\mathcal{R}_{\mathcal{Q}}(T)
\ge
\int_{\partial W(T)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-abb650d46adaa80a)

for the declared record. The phrase "entropy of the universe" is not a complete claim unless it supplies the measure, window, boundary, and residual terms.

The entropy-arrow theorem target ties this boundary term to wake escapement. Let $\mathcal{E}_{\mathrm{esc}}(W)$ be the wake-escapement set defined in [Energy](../../../../markdown/aaa/dynamics/energy.md#wake-escapement), and let $\Sigma_{\mathrm{esc}}(\mathcal{E}_{\mathrm{esc}}(W),T)$ be the rate at which retained path-history distinctions leave $W$ on causal wakes that no longer hit a retained receiver. The structural target is

$$
\frac{d}{dT}S_{\Pi,W}(T)
=
k_B\,\sigma_W^{\mathrm{int}}(T)
+
k_B\,\Sigma_{\mathrm{esc}}
\left(
\mathcal{E}_{\mathrm{esc}}(W),
T
\right)
+
\mathcal{R}_{\Pi,W}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3a30bd457031e485)

on a fixed coarse-graining and boundary convention. In words: observer-window entropy production equals the retained-history distinctions lost to escaping wakes plus the declared interior production and projection-residual terms. The thermodynamic arrow is therefore a theorem target about the same causal-wake boundary ledger used by finite-window energy bookkeeping, not a second primitive arrow.

The same memory-boundary flux has several readings in the dynamics stack. As an energy 0-form it is wake escapement; as a corrected symplectic 2-form it is the $\omega_{\mathrm{mem}}$ leak in [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#effective-hamiltonian-domain-gate); as a momentum 1-form it is the response-center drift obstruction in [Energy](../../../../markdown/aaa/dynamics/energy.md#energy-conservation-and-exchange); and as a record count it is entropy production. A retained branch is energy-flat, Hamiltonian-promotable, response-center stable, and entropy-flat only when this memory-boundary flux is recurrent over the return window. A secular boundary flux is the common source of apparent dissipation, non-Hamiltonian projection, center drift, and observer-window entropy growth.

### Second Law and Same-Record Monotonicity

The traditional second law has several equivalent-looking forms only after the comparison class has been fixed. Clausius uses a cycle or reversible-comparison statement, Kelvin-Planck forbids a cyclic device from converting heat from one reservoir wholly into work, Boltzmann says overwhelmingly many compatible microstates lie in larger macrostates, and Maxwell-demon analyses require memory and reset costs to be included. These are not four independent substances called entropy. They are four projections of the same discipline: the complete thermodynamic packet must not shrink the retained compatible-history record for free.

The traditional slogan that entropy increases is therefore a shorthand. The safer statement is that, for an admissible isolated comparison with fixed record class and no hidden boundary or apparatus reset, the retained entropy must not decrease beyond the allowed finite-window fluctuation. It can remain constant in an ideal reversible comparison, and it can be exactly zero for a singleton exact-history partition that has stopped asking a thermodynamic question. Irreversibility enters when the retained macrostate loses access to distinctions that the complete deterministic history still contains.

The conservation instinct behind stronger universal-entropy claims should therefore be placed at the complete-ledger level, not written as a universal entropy equality. Energy, architrino inventory, causal-root provenance, and complete path history may close on the full same-record ledger while $S_{\mathcal{Q},W}$ still increases for a finite observer window because $\Pi_{\mathcal{Q},W}$ has projected away distinctions the complete state still carries. The $\Delta S_U=0$ shorthand is not the rule; the rule is same-record closure plus projection-dependent entropy accounting.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the second law is therefore not the source of absolute time and not a primitive command that a substance called entropy must always rise. It is a finite-window typicality and bookkeeping claim over a declared record. For a fixed window, coarse-graining, boundary record, and apparatus/control class, the same-record second-law diagnostic is

$$
\Delta S_{\mathcal{Q},\mathrm{tot}}(\theta_W;T_i,T_f)
=
\Delta S_{\mathcal{Q},W}
+
\Delta S_{\mathcal{Q},\partial W+\mathrm{env}}
+
\int_{T_i}^{T_f}\mathcal{R}_{\mathcal{Q}}(T)\,dT
\ge
-\epsilon_{\mathrm{fluc}}(W,\mathcal{Q},T_f-T_i)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bef0d330f181c4dd)

Here $\Delta S_{\mathcal{Q},W}$ is the retained entropy change inside the window, $\Delta S_{\mathcal{Q},\partial W+\mathrm{env}}$ is the boundary and environmental entropy change assigned by the same record, $\mathcal{R}_{\mathcal{Q}}$ records changes in the retained coarse-graining or record set, and $\epsilon_{\mathrm{fluc}}$ allows finite-window statistical fluctuations. In the macroscopic thermodynamic regime, $\epsilon_{\mathrm{fluc}}$ is negligible for ordinary comparisons. In microscopic or short-time windows it is not.

This formula explains how the familiar readings fit together. For an isolated macroscopic packet with fixed coarse-graining and no boundary term, it reduces to the usual effective statement $\Delta S\gtrsim0$. For a refrigerator, cell, planet, or reaction network, $\Delta S_{\mathcal{Q},W}$ may be negative while the boundary and environment term is larger and positive. For an ideal reversible comparison, the inequality is saturated. For an irreversible comparison, the residual is positive. For a Maxwell-demon packet, the memory, actuator, partition, target, and reset channel must all be included in the same $\theta_W$, or the apparent violation is a split-record error.

Record-circularity pressure lands exactly here. The second law does not by itself prove that a present record descends from a low-entropy past; it uses a low-defect boundary condition and ordinary history-backed records to make the second-law inference trustworthy. In this chapter that burden is not hidden. The path-history measure, boundary-condition prior, and observer record all belong in $\theta_W$, and the Boltzmann-brain residual $\mathcal{R}_{\mathrm{BB}}(\theta)$ below is the extreme test of whether isolated observer-fluctuation records have been suppressed relative to shared history-backed records.

What survives from the traditional interpretation is strong: thermodynamics is not being rejected. Heat engines, irreversible mixing, work availability, macrostate dominance, memory reset, decoherence, and horizon bookkeeping remain real effective constraints. What changes is the level assignment. The second law is a theorem target about projected deterministic histories and declared records, not an ontological rival to the substrate dynamics.

### Same-Record Closure Rule

A thermodynamic packet has one declared record. In a local horizon, measurement, computation, or near-equilibrium simulation, write that record schematically as

$$
\theta_W
=
\left(
\mathcal{H}^{W},
\mathcal{B}^{(O)}(W),
\left.\mathcal{N}_{\mathrm{sea}}\right|_W,
O_W,
\Pi_{\mathrm{eff}},
\mu_{\theta}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5da3c27369963180)

where $\mathcal{H}^{W}$ is retained path-history data, $\mathcal{B}^{(O)}(W)$ is observer-accessible boundary or apparatus record data, $\left.\mathcal{N}_{\mathrm{sea}}\right|_W$ is the resolved Noether sea state on the window, $O_W$ is the observer clock/ruler/readout state when an observer is part of the comparison, $\Pi_{\mathrm{eff}}$ is the effective projection, and $\mu_{\theta}$ is the conditional measure over unresolved deterministic histories.

The admissible comparison has the form

$$
\left(
S,\,
T,\,
dQ,\,
\Delta E,\,
\{p_i\},\,
\mathcal{B}_{\mathrm{rec}}
\right)
=
\mathcal{P}_{\mathcal{Q},W}(\theta_W)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-543128a06c7e474c)

where all listed quantities are projections of the same $\theta_W$. If entropy is computed from one $\theta_W$, temperature from another, Born-style basin weights from a third, and flux from a fourth, the packet has not derived a closure. It has fitted separate descriptions.

This rule is why entropy appears as a discipline across many chapters. It protects the Born-rule program from using one ensemble for outcome weights and another for apparatus thermodynamics. It protects horizon thermodynamics from assigning independent entropy, temperature, and stress records. It protects computation-cost claims from treating logical form as a free physical process.

In the language of the core definition, the same-record rule says that entropy, temperature, heat flux, basin weights, and record costs must all factor through one projection of the same fiber. Fitting them from separate ensembles is a split-fiber error: the quantities may be individually meaningful, but the packet has not shown that they are compatible projections of one physical record.

### Entropy and Absolute Time

Absolute time is the ordering parameter of the substrate law. Entropy does not create it. The causal arrow enters the dynamics through delayed causal wakes: only emissions from $T_t < T_r$ can contribute to a receiver at reception time $T_r$. Thermodynamic, biological, measurement, and cosmological arrows are finite-window consequences of dynamics, boundary conditions, and retained records.

Even if the complete deterministic dynamics preserve the underlying measure, the observer-window entropy $S_{\Pi,W}$ can increase when $\Pi_{\mathcal{Q},W}$ discards path-history, boundary-wake, or apparatus-record information. That increase is a projection effect inside the declared record. It is not evidence that time itself is generated by entropy.

The arrow-of-time closure problem is therefore sharper than a generic second-law slogan. A mature account must explain why the admissible early record is low-defect or low-entropy in the relevant coarse-graining, and why later macroscopic reversal would require reconstruction of path-history and wake-phase detail no finite observer or apparatus can retain.

The past-hypothesis comparison also depends on the partition. A nearly uniform early matter record can look high entropy under a non-gravitating gas coarse-graining and low entropy under a gravitational coarse-graining, because gravitational clumping, potential-energy release, and horizon labels open far larger compatible records later. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the lesson is not that gravity is entropy. It is that a cosmological entropy statement must name whether its macrostate includes Noether sea state, potential gradients, causal-wake boundary data, and horizon-interface records.

The standard cosmology comparison gives a useful scale check for this distinction. Standard-literature estimates often summarize a radiation-only CMB count as $S_{\gamma,\mathrm{CMB}}\sim10^{89}k_B$, the present observable universe as black-hole dominated with $S_{\mathrm{BH,pop}}\sim10^{104}k_B$, and a rough maximum black-hole-like entropy for the same mass-energy budget near $S_{\max}\sim10^{123}k_B$. In this chapter those numbers are not treated as substrate entropy of the Euclidean void. They are comparison-scale records: the closure target is to recover the ordering $S_{\gamma,\mathrm{CMB}}\ll S_{\mathrm{BH,pop}}\ll S_{\max}$ only after the radiation, matter, Noether sea, and horizon-interface coarse-grainings are all declared. The corresponding Penrose-style initial-state fraction is a benchmark for the size of the compatible-history fiber,
$$
f_{\mathrm{early}}
\sim
\exp\!\left[-\frac{S_{\max}-S_{\mathrm{early}}}{k_B}\right]
\approx
\exp(-10^{123})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de56fe84878a628b)
not proof that an external random draw selected the universe.

### Heat Death and Its Escapes

Claim level: the first escape is conditional on a measure-preservation certificate for the retained delayed-history flow; the negative-heat-capacity and horizon comparisons are standard physics observations stated at effective grade. A cyclic or recycling cosmology that would use them remains an open target.

A pure relaxation to maximum entropy — classical heat death — is not forced in this framework, and three openings keep the arrow from having to terminate. First, on a retained regularized branch for which the delayed flow is invertible and preserves the declared history measure, the fine-grained entropy is constant while coarse-grained observer-window entropy can rise. That is a conditional measure-preservation result, not a consequence of determinism alone; without the certificate, fine-grained entropy conservation remains a closure target and cannot yet support a globally reversible cosmological history. Second, self-gravitating systems have negative heat capacity and no equilibrium maximum-entropy state — the horizon-labelled records keep growing, as the ordering $S_{\gamma,\mathrm{CMB}}\ll S_{\mathrm{BH,pop}}\ll S_{\max}$ above already shows — so the premise that every gradient equilibrates and all shedding stops may simply be false. Third, a cosmological de Sitter-like horizon carries an entropy that grows with its area, so the accessible ceiling $S_{\max}(T)$ can recede at least as fast as $S(T)$ climbs; the record chases a moving bound rather than reaching a fixed one.

These are openings, not a mechanism. Any concrete cyclic or recycling cosmology that would exploit them must still close a global entropy ledger — every local decrease over-paid by disorder exported elsewhere — and that accounting, together with a named substrate driver, remains open work rather than a result asserted here.

Boltzmann-brain pressure exposes the same rule in extreme form. A retained observer record cannot certify the low-entropy history that is then used to certify the retained observer record. The packet must separate the internal consistency of a memory record from the boundary-condition claim that the record descends from a shared low-defect universe path history. Let $\Gamma_{\mathrm{hist}}$ denote compatible complete histories in which observer records, cosmological traces, and low-defect boundary data descend from one shared path-history record. Let $\Gamma_{\mathrm{BB}}$ denote compatible complete histories in which an observer record is an isolated high-entropy fluctuation with no shared supporting cosmological record. The corresponding fluctuation residual is

$$
\mathcal{R}_{\mathrm{BB}}(\theta)
=
\frac{
\mu_{\theta}\!\left(\Gamma_{\mathrm{BB}}\right)
}{
\mu_{\theta}\!\left(\Gamma_{\mathrm{hist}}\right)
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-204207c15eada109)

for the same declared measure, coarse-graining, and access window. A mature same-record entropy cosmology requires $\mathcal{R}_{\mathrm{BB}}(\theta)\ll 1$ or an explicit reason why the comparison class is not admissible. Otherwise the theory has only renamed the circularity: records infer a low-entropy past, while the assumed low-entropy past is what made the records trustworthy.

The delayed dynamics supply a sharper discriminator than the bare measure ratio. For a candidate observer record $O_W$, define the wake-concordance order parameter

$$
\mathcal{K}(O_W)
=
\frac{
\#\left\{
\text{roots at }O_W
\text{ sharing a transmitter worldline with roots at neighboring receivers}
\right\}
}{
\#\left\{
\text{incoming roots at }O_W
\right\}
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ae0767b0c14ea807)

with the denominator restricted to the retained incoming roots in the declared window. Equivalently, $\mathcal{K}$ is the local edge-connectivity fraction of $G_{\mathrm{prov}}$: it measures how many retained incoming roots share transmitter-worldline edges with neighboring receivers' roots. History-backed records are expected to have $\mathcal{K}\to1$ because the same matter and Noether sea transmitters illuminate a neighborhood with correlated causal timing. Isolated fluctuation records have $\mathcal{K}\to0$ unless they also fabricate shared-transmitter concordance across neighboring receivers. Thus low-$\mathcal{K}$ configurations are measure-suppressed rather than forbidden by provenance mismatch, and high-$\mathcal{K}$ fluctuation records are costly because they require coherent transmitter-history coincidences, not only a memory snapshot. At this claim level, high-$\mathcal K$ fluctuations are treated as measure-suppressed rather than forbidden; forbiddance would require a separate theorem that no compatible transmitter-history assignment exists.

### Measurement and Computation

Measurement records require entropy locking. For a declared apparatus/environment channel,

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(T_{\mathrm{rec},0}+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(T_{\mathrm{rec},0})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-152e11c0be2d33aa)

is the entropy change associated with the candidate record, with $T_{\mathrm{rec},0}$ the start of the record-formation window. A strong record candidate satisfies

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
S_{\mathrm{lock}}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-970ce7dd80e2198c)

with $S_{\mathrm{lock}}$ fixed by the apparatus class and readout channel. This is not a collapse law. It is the requirement that the branch has exported enough unresolved apparatus/environment history that coherent reversal is no longer part of the retained measurement window.

Resetting a memory-bearing apparatus with $N$ distinguishable retained record classes also requires a physical entropy ledger:

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8e32d3ee892a905c)

with $\varepsilon_\mu$ the declared measure/readout tolerance.

For a non-uniform retained distribution, $k_B\log N$ is replaced by $-k_B\sum_i p_i\log p_i$.

A Maxwell-demon packet therefore has two admissible readings. If the demon does not reset, it spends a low-entropy blank-memory record as a resource and converts that resource into a pressure, temperature, or sorting record. If the demon is required to act cyclically, the memory, actuator, partition, target system, and boundary environment must return to the same physical record. A cyclic packet that claims to sort a broad complete-history region into a narrower one while preserving the same boundary and memory record is not a thermodynamic miracle. It is a failed same-record closure.

The same logic applies to computation. For an implemented step $s$ with completion probability $p_s$, a lower-bound claim must attach to the device and boundary records:

$$
\Delta S_{\mathrm{env},s}
+
\Delta S_{\mathrm{target},s}
+
\Delta S_{\mathrm{boundary},s}
\ge
k_B\log(1/p_s)-\epsilon_s
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b97fdcb000af71bb)

The inequality is not a new law of symbols. It states the burden that the same physical record defining success must also supply the entropy, heat, work, and boundary terms used to claim a cost.

### Horizons and Emergent Gravity

Horizon entropy is the most stringent test of this mapping because it connects record counting, effective geometry, energy flux, and unitarity pressure. The useful comparison target is not that gravity is "really entropy." The target is that one strong-field Noether sea record supplies the observer-level entropy, temperature, flux, and metric response together.

For an observer-accessible local horizon patch $\partial\Omega$, the boundary-label entropy target is

$$
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d4b9f11a3d394868)

with $\mathcal{B}_{\partial\Omega}^{(O)}$ defined by retained boundary-wake labels readable by the same Physical Observer record. The local Clausius comparison becomes a residual or variation target:

$$
\delta_\ell Q_{\partial\Omega}^{(O)}
=
T_U^{(O)}
\delta_\ell S_{\partial\Omega}^{(O)}
+
\mathcal{O}(k_B T_U^{(O)}\epsilon_{\mathrm{local}})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-942866b57cc90932)

This is a recovery target, not a postulate. The proof fails if $S_{\partial\Omega}^{(O)}$, $T_U^{(O)}$, $dQ_{\partial\Omega}^{(O)}$, and the effective metric are assigned independent records.

For black holes, the area-law coefficient must come from terminal Family-A alignment and horizon-interface label compatibility. For a connected block $U$ of alignment-area patches,

$$
s_{\mathrm{align}}(\theta)
=
\lim_{\lvert U\rvert\to\infty}
\frac{1}{\lvert U\rvert}
\log
\left|
\mathcal{L}_U(\theta)
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cba6c463de59bfe3)

when the limit exists after boundary corrections. The required coefficient is area-normalized:

$$
\frac{s_{\mathrm{align}}(\theta)}
{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2bef8565d46260ad)

This target avoids a false one-patch interpretation. The coefficient is a block entropy density and patch-area normalization, not a literal independent count on one microscopic patch.

The label set is not arbitrary. At terminal alignment a Family-A braid collapses its binary-axis directions onto one interface axis, so the surviving discrete labels are the handedness assignment and the causal-root ledger index still carried by the aligned branch. In a block $U$,

$$
\left|
\mathcal{L}_U(\theta)
\right|
=
\prod_{u\in U}
\#
\left\{
\left(
\chi_u,
N_{s,u},
M_{p,u}
\right)
:
\text{admissible at patch }u
\right\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ff215aa6d15e556)

where $\chi_u$ is the retained terminal-alignment handedness label and $(N_{s,u},M_{p,u})$ is the local self-hit and partner-hit root-ledger index. The $1/4$ coefficient is therefore a falsifiable statement about the per-patch admissible ledger multiplicity and the patch area $a_{\theta}$ in the accepted alignment units, not a coefficient to fit after the fact.

Page-curve, island, replica-wormhole, Ryu-Takayanagi, and AdS/CFT calculations remain high-value comparison mathematics. They sharpen the required entropy and unitarity bookkeeping. They do not provide the $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism unless their constraints are recovered from horizon-interface labels, path-history bookkeeping, Noether sea storage, and release-channel selection.

Entanglement-entropy calculations sharpen the access-cut side of that same problem. A horizon partition can make an outside retained record mixed while the full comparison record remains closed. The native target is therefore not to import an abstract inaccessible complement as ontology, but to derive which horizon-interface labels, Noether sea storage modes, and release-channel selections play the role of the traced-out complement.

### Failure Modes

The most common failure mode is an unqualified entropy statement. An entropy claim is incomplete when it omits the measure, coarse-graining, access window, retained record, or boundary terms.

Another failure mode is disembodied information. Shannon uncertainty over symbols is not automatically heat, work, Clausius entropy, or physical record cost. A compression or prediction score is a statement about a declared symbol model and record channel. It becomes thermodynamic only when implemented through an apparatus and boundary ledger.

A third failure mode is entropic gravity as a substitute for the mass mechanism. Thermodynamic or entropic derivations of force are comparison benchmarks, but inertial mass remains open until the assembly ledger supplies closed internal causal history, shielding extraction, Noether sea response, and acceleration response.

A fourth failure mode is fitted horizon bookkeeping. If a black-hole or local-horizon packet uses one record for entropy, another for temperature, another for stress, and another for release channels, the apparent agreement is not a native closure.

The fifth failure mode is promoting entropy into time. Entropy can diagnose an emergent arrow inside a stated physical and inferential window. It does not supply the absolute ordering parameter $T$.

A sixth failure mode is confusing entropy with complexity. Low entropy can be simple, maximum entropy can be simple, and complex organized structures normally belong to driven intermediate windows that export more entropy than they locally suppress. For $\mathbb{A}\mathbb{A}\mathbb{A}$, biological or self-organizing examples are open-window bookkeeping, not exceptions to deterministic dynamics.

A seventh failure mode is record circularity. If a packet uses retained records to infer a low-entropy past while also using that inferred low-entropy past to justify the reliability of the retained records, it has not closed the arrow-of-time problem. It must expose the same-record path-history measure and boundary-condition prior that suppress isolated observer-fluctuation records relative to history-backed observer records.

An eighth failure mode is treating "entropy never decreases" as a primitive second law. Clausius entropy depends on a reversible-cycle integrability condition, statistical entropy can fluctuate in small or finite windows, and resource entropy depends on the declared control/readout class. A packet must state which second-law form it is invoking before monotonicity has content.

A ninth failure mode is quoting entanglement entropy without declaring the factorization and access cut. A subsystem entropy is not automatically entropy of the whole universe. It is a statement about what remains after a complement has been excluded from the retained record.

A tenth failure mode is promoting present human or laboratory macrostates into the final state-space partition of the universe. Heat-death claims, order claims, and "maximum entropy" claims must declare the manipulation class and record system for which usable gradients are exhausted. Otherwise they have converted a useful thermodynamic extrapolation into an unsupported ontology of all future access.

### Interfaces

The energy-side residuals are stated in [Energy](../../../../markdown/aaa/dynamics/energy.md#entropy-free-energy-and-coarse-residuals). The time-side arrow distinction is stated in [Absolute Time](../../../../markdown/aaa/foundations/absolute-time.md#time-orientation-and-causal-ordering). Measurement locking is stated in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md). Computation cost is treated in [Information / Computation](../../../../markdown/aaa/philosophy-history/information-computation.md#thermodynamic-cost-of-computation). Local-horizon recovery is stated in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#local-horizon-recovery-target), with the simulation-facing scaffold in [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md). The strong-field horizon target is stated in [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md#horizon-interface).

The consolidated rule is simple: entropy is accepted only as a declared projection of retained deterministic histories, and every effective entropy claim must name the record that makes the projection physical.

## Binary Dynamics

This chapter starts with the simplest possible assembly question: what happens when one Electrino and one Positrino try to stay together under delayed causal wakes? The answer is not ordinary central-force orbit mechanics. Each architrino responds to where the partner was when the relevant wake was emitted, not to where the partner sits at the same absolute time.

That delay makes the binary the first serious test of the Master Equation. Partner hits, self-hits, branch birth, caustic onset, circular anti-damping, non-circular spiral hypotheses, and maximum-curvature binary analysis all appear here before they are used in larger Noether braid structures. Two status boundaries govern the chapter: self-hit makes the dynamics non-Markovian (path-history dependent), and stability or attractor claims are conjectural unless explicitly established.

Read the chapter as a branch atlas, not as a single orbit story. The partner-only contribution shows why ordinary circular central-force intuition fails. The self-hit records show where the system becomes path-history dependent. The maximum-curvature and spiral sections are candidate ways to control that delayed feedback, and each must close its own root, action, wake, and stability ledger before it can become an assembly building block.

**Claim-status convention.** A **derived** statement follows from the declared circular or history-space equations on its stated chart. A **conditional** statement follows only under the assumptions named with it. A **target** states a proof or certificate obligation that is not yet closed. A **diagnostic** is a computable comparison or branch record whose agreement does not by itself promote the underlying claim. These labels apply chapter-wide; an unlabeled explanation does not upgrade a conditional, target, or diagnostic statement.

This chapter is the foundational precursor to [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md), [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md), and the assembly-level [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md). The primitive-entity ontology in [Architrino](../../../../markdown/aaa/foundations/architrino.md) points here once the discussion becomes a behavioral regime or assembly-stability mechanism.

### The Spiral Orbiting Binary and the Contraction Phase

An orbiting binary is the simplest emergent assembly, consisting of two architrinos of opposite polarity: an Electrino and a Positrino. With polarities $-\epsilon$ and $+\epsilon$, the assembly is electrically neutral overall. This system is the first teaching case for delayed causal wakes, partner-hit contraction, and the self-hit onset boundary.

Consider the ideal case of a symmetric orbit in a universe with no other architrinos. In general, each architrino is subject to a superposition of external causal wake contributions from all other transmitters; the analysis below isolates the binary by setting those external contributions to zero.

Let the Electrino be architrino 1 and the Positrino be architrino 2.
-  **Positions:** $\mathbf X_1(T)$ and $\mathbf X_2(T)$
-  **Polarities:** $q_1 = -\epsilon$ and $q_2 = +\epsilon$

The motion of each architrino is determined by the wake emitted by the other at a delayed time. The acceleration of the Electrino (architrino 1) at absolute time $T$ is caused by the Positrino's (architrino 2) wake emitted at an emission time $T_t$. This is governed by the interaction condition:
$$
\|\mathbf X_1(T) - \mathbf X_2(T_t)\| = c_f(T - T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d3a5068ed97efb1)
The acceleration vector for the Electrino is attractive, pointing towards the Positrino's delayed position:
$$
\mathbf A_1(T) \propto -\hat{\mathbf{r}}_{21} = - \frac{\mathbf X_1(T) - \mathbf X_2(T_t)}{\|\mathbf X_1(T) - \mathbf X_2(T_t)\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-02fabdc1ab817101)
The Electrino's emissions govern the Positrino's symmetric response through the corresponding partner equation.

In the strictly sub-field-speed regime (no self-interaction, $\|\mathbf V\|\le c_f$), a stable, circular orbit is impossible. Because the attractive acceleration on each architrino points to the *past* position of its partner, it is not a true central acceleration. The principal circular branch proves a sharper direction diagnostic: the partner line of action has a forward tangential projection, so the partner-only near-circular ledger is anti-damped rather than a contraction proof. This diagnostic is not a receiver-side acceleration-balance certificate. A logarithmic inward spiral can still be used as a separate non-circular ansatz or capture target, but its radial tightening must be certified by solving that branch chart with same-record transmitter-side acceleration weight; it is not implied by the principal circular sign.

The receiver-side reduction makes the direction test exact. The signed pitch $p=-\dot r/(r\omega)$ is positive while the binary spirals inward and negative while it spirals outward. The [closed spiral-direction flow](../../../../markdown/aaa/dynamics/master-equation.md#closed-spiral-direction-flow) computes how that sign changes from the radial and azimuthal wake contributions.

The practical conclusion is narrower than “binaries spiral in” or “binaries spiral out.” A binary cannot follow an exact logarithmic spiral while simultaneously keeping a fixed spiral tightness, a fixed angular rate, and only one principal delayed partner root. Those assumptions are mutually incompatible under the transmitter-side Master Equation. An actual spiral must change its tightness or angular rate, acquire another causal root, enter the self-hit regime, or receive additional multi-body contributions. The formulas decide the direction once that evolving branch history is supplied.

Standard central-force mechanics conserves angular momentum because the force at absolute time $T$ is collinear with the equal-time separation vector. The partner-hit branch does not have that geometry. Define the equal-time separation and delayed line of action by
$$
\mathbf{r}_{12}^{\mathrm{eq}}(T)
\equiv
\mathbf X_1(T)-\mathbf X_2(T),
\qquad
\widehat{\mathbf{r}}_{12}(T;T_t)
=
\frac{\mathbf X_1(T)-\mathbf X_2(T_t)}
{\|\mathbf X_1(T)-\mathbf X_2(T_t)\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-76f4af57d07f67ed)
The delayed partner branch carries the angular-momentum-change direction
$$
\mathbf{r}_{12}^{\mathrm{eq}}(T)
\times
\widehat{\mathbf{r}}_{12}(T;T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d395058f3a923c57)
which is generically nonzero because $\mathbf X_2(T_t)$ is not the partner's equal-time position. Therefore the usual angular-momentum barrier and the instantaneous effective potential
$$
V_{\mathrm{eff}}(r)=V(r)+\frac{ml^2}{2r^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-184fcbda3dfe0a02)
cannot be imported as the binary's governing reduction. A conserved angular-momentum-like quantity, if present, must include the causal-wake history term that balances the delayed torque.

**Circular root-playback simplification for the sub-field partner contribution.** In units with $c_f=1$, the circular speed is $s=R\omega$. On the non-translating symmetric circular chart, the transmitter and receiver velocity projections on every retained chord are equal. If two points on the circle have angles $a$ and $b$, then
$$
\mathbf e_\theta(a)\cdot(\mathbf e_r(a)-\mathbf e_r(b))
=
\sin(a-b)
=
\mathbf e_\theta(b)\cdot(\mathbf e_r(a)-\mathbf e_r(b)).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ad3da309fb63960)
Thus $D_r=D_t$ and the signed root-playback derivative is one for every retained root on this chart. The acceleration weight is instead $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert=1/|J^t|$. The circular partner contribution gives
$$
T_p
\propto
\frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)}
\quad (0<\delta_p<\pi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-eae7bd168382c02e)
where $\delta_p$ is the partner delay angle. This is a canonical acceleration contribution only for the non-translating symmetric circular benchmark; deformed, translating, or non-circular histories must recompute the same-record $D_t$, $D_r$, and $W^{\mathrm{acc}}$ before any acceleration-balance conclusion is promoted.

-  The circular geometry gives a positive tangential acceleration contribution for the partner-only ledger.
-  The radial component points inward, but inward radial pull plus positive tangential work does not by itself prove a tightening spiral.

With perfectly symmetric initial conditions, the paths of the electrino and positrino are distinct but mirror-related. If the branch begins as a radial fall or enters a non-circular capture basin, it may still contract, but that is a separate branch-history statement. Emission cadence and intrinsic per-wavefront amplitude remain constant, while the **received** acceleration is velocity-dependent because the causal-delay Jacobian compresses or dilates the causal flux along each active branch. For action or wake-history rates accumulated along a moving receiver path, the same root also carries the receiver-side factor $dT_{t,\ell}/dT=(c_f-\hat{\mathbf r}\cdot\mathbf V_i(T))/(c_f-\hat{\mathbf r}\cdot\mathbf V_j(T_{t,\ell}))$. The evolution is therefore driven by delay geometry, branch bunching, receiver-path sampling, and, once active, self-interaction.

Initially, and as long as the speeds of both architrinos are less than or equal to the wake propagation speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive acceleration contribution:
$$
\mathbf A_{1, \text{total}}(T) = \mathbf A_{1,2}(T) \quad \text{and} \quad \mathbf A_{2, \text{total}}(T) = \mathbf A_{2,1}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-341b78634c74be5b)
During this partner-only phase, the retained circular contribution has an inward radial component and a forward tangential work term. That combination is anti-damping: it accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must come from a certified non-circular branch, a capture basin, or an explicit finite-window wake-history account.

#### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each architrino's path is the mirror-conjugate of the other's path rather than the same curve traced by both architrinos.

This matters because the ideal spiral is a **transient, scale-similar contraction ansatz**, not a consequence of the principal circular calculation. Within a fixed velocity regime and fixed active-root ledger, the model assumes that the local acceleration geometry repeats after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two architrinos. When the trajectory crosses a threshold such as $\|\mathbf V\|=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit acceleration components. That circular model is useful as a limiting or diagnostic case, and it gives the anti-damping obstruction that any non-circular contraction story must beat. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#symmetric-delayed-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

#### Translating Binary Trace

The same binary has a co-moving orbit and an absolute-history trace. If a circular binary translates with center velocity $\mathbf{V}$ while its orbital plane is spanned by orthonormal axes $\mathbf{e}_1,\mathbf{e}_2$, a first kinematic diagnostic is

$$
\mathbf X_{\pm}(T)
=
\mathbf X_0+\mathbf V T
\pm
R\left(\cos\omega T\,\mathbf e_1+\sin\omega T\,\mathbf e_2\right),
\qquad
\mathbf n=\mathbf e_1\times\mathbf e_2 .
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d21026dd32a1ca98)

When $\mathbf{V}$ is parallel to $\mathbf{n}$, each architrino draws a constant-pitch helical trace with pitch $2\pi\|\mathbf{V}\|/\omega$ per binary cycle. At a tilted orientation, the absolute-history trace combines longitudinal pitch $2\pi|\mathbf{V}\cdot\mathbf{n}|/\omega$ with transverse drift from $\mathbf{V}-(\mathbf{V}\cdot\mathbf{n})\mathbf{n}$. This trace is a visualization and solver diagnostic, not a stability proof: the dynamical question is still whether the translated path-history ledger retains the same active causal roots, Jacobian floors, energy/action records, and branch identity.

### Spiral Momentum Budget Across the Hinge (Speculative)

This subsection records a modeling hypothesis rather than a derived law. The desired closure would link the spiral path, the per-hit acceleration law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, and the principal circular branch has positive tangential work. A contraction ansatz must therefore explain how radial tightening survives that anti-damping record through non-circular geometry, wake-flux export, or a later multi-root ledger. We introduce a per-cycle gain parameter $\Delta L_c$ only as a provisional bookkeeping variable for that unresolved branch-history calculation.

**Branch-birth jump target:** a smooth doubling rule is too strong unless the active causal-root ledger stays unchanged. On a fixed signed branch chart $b(s)$, the per-cycle escaped angular-momentum entry should instead be written
$$
\Delta L_{\mathrm{cycle}}(s)
=
\sum_{\rho\in b(s)}
\ell_{\rho}^{\mathrm{esc}}(s),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f9340e93e3880a6c)
where $\rho$ ranges over the active partner and self records that actually send wake angular momentum through the window boundary. At a branch birth the ledger changes, so the cycle budget has a jump law rather than an automatic smooth continuation. At the principal self-hit hinge,
$$
\Delta L_{\mathrm{cycle}}(1^+)-\Delta L_{\mathrm{cycle}}(1^-)
=
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c23a0717c77b6a1a)
with the right-hand side evaluated in the same finite-$\eta$ chart that regularizes the caustic. The older heuristic $\Delta L_c\mapsto2\Delta L_c$ is recovered only in the special case where the newly born principal self record exports exactly the same cycle increment as the pre-hinge partner ledger. More precisely, $\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)$ is not the value of a divergent pointwise tangential coefficient at the hinge. It is the finite angular impulse
$$
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)
=
\lim_{\eta\to0^+}
\int_{T^-}^{T^+}
R(T)\,A_{\mathrm{self},0,\eta}^{\mathrm{tan}}(T)\,dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e7f7eabed7564de)
when that limit exists under the same finite-caustic transit convention used for the velocity impulse. If the impulse limit is regulator-dependent, the branch-birth jump remains a diagnostic record rather than a promoted angular-momentum ledger entry.

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It sets the bookkeeping target: a path-history acceleration sum whose signed branch-birth increments and boundary wake fluxes yield the spiral contraction. Near $s=1^+$ the principal self branch inherits the transmitter-side fold onset displayed below, and the canonical acceleration weight is $W^{\mathrm{acc}}=1/|J_s|$. Its coincident endpoint birth is therefore more singular than the former stripped model, and its verification remains incomplete.

### Spiral Binary Field-Speed Symmetry-Breaking Point

The binary system's evolution is organized around the **field-speed symmetry point** $\|\mathbf V\|=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay acceleration contributions exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{\|\mathbf V\|}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7af528a44359dc7c)
Writing $s=1+\mu$ with $\mu>0$ small, the principal root satisfies
$$
\delta_s \sim \sqrt{24\mu},
\qquad
\sin(\delta_s/2)\sim \sqrt{6\mu}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3bc38b3b7bfc47bf)
The associated branch Jacobian is
$$
J_s = 1-s\cos(\delta_s/2)=1-\frac{\delta_s}{2}\cot(\delta_s/2)\sim 2\mu
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b3bf24b912c47c07)
The transmitter-side root-density diagnostics therefore scale as
$$
\frac{1}{\sin(\delta_s/2)\,|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)\,|J_s|}\sim \mu^{-2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f24fd137abed9a1c)
This is the first major consequence of the transmitter-side Jacobian: the hinge is not merely a change in root count but a genuine **caustic onset** for transmitter-emission density and action counting. On the non-translating symmetric circular chart the equal-projection lemma gives $D_r=D_t$, but $W^{\mathrm{acc}}=1/|J_s|$. The canonical self-hit acceleration components therefore scale as
$$
\frac{1}{\sin(\delta_s/2)|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)|J_s|}\sim \mu^{-2}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c15fe92f2b57d467)
The principal self branch therefore has a non-integrable coincident-birth warning in the current analytic control. Any candidate maximum-curvature balance must route that transition through a finite accepted singular-event treatment before appealing to higher-winding smoothing.

### Self-Hit: Definition and Diagnostics

Self-hit is the key non-Markovian feature of architrino dynamics. It occurs when an architrino interacts with potential it emitted earlier along its own worldline.

**Geometric condition (absolute coordinates):** For a given architrino with trajectory $\mathbf X(T)$, a self-hit event is a pair of times $(T_t, T_{\mathrm{hit}})$ with $T_{\mathrm{hit}} > T_t$ such that
$$
\|\mathbf X(T_{\mathrm{hit}}) - \mathbf X(T_t)\| = c_f (T_{\mathrm{hit}} - T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4c581ca6c1e9cf32)
and the architrino is the transmitter of the causal wake surface emitted at $T_t$.

**Terminology split:** Hit type is determined by **transmitter identity**. A **self-hit** has the same transmitter and receiver; a **partner hit** has a different transmitter and receiver. Root count is a separate question: either transmitter can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- On any interval with strict sub-field-speed motion, self-hit is absent by the triangle-inequality root test, unless older path-history emissions from a prior super-field-speed interval remain active.
- As velocities exceed $c_f$ on curved histories, emission isochrons can catch up with the transmitter's future positions, generating candidate nonlocal feedback and effective restoring or destabilizing accelerations depending on configuration.
- In generic trajectories, once an architrino has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions because the active record is non-Markovian.
- For binary and Noether braid assemblies, repeated self-hit events are a proposed outward barrier against collapse. Stable radii, frequencies, limit cycles, and attractors require separate tangential, radial, wake-boundary, and return-map closure.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

### Post-Threshold Self-Hit Phase

Once the circular branch admits same-transmitter roots, the architrinos interact with their own earlier, repulsive wakes. The total acceleration on each architrino then becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf A_{1, \text{total}}(T) = \mathbf A_{1,2}(T) + \mathbf A_{1,1}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9a69dd9bee7ee82e)
In the circular benchmark, the principal self-hit branch ($m=0$) becomes available only on the super-field-speed side; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf A_{1,1}(T)$, grows rapidly as the path curvature increases and changes the tangential ledger. On the same-sheet principal chart that tangential contribution is forward; in the full signed ledger, older sheets can contribute with the opposite tangential sign. This post-threshold phase is therefore a branch-certificate target, not a generic tightening law: any radial arrest or continued contraction must be decided by the signed multi-root ledger, wake-history accounting, and stability certificate described below.

### Maximum-Curvature Binary — Circular

Receiver-side validity notice. The circular MCB branch topology, root labels, transmitter-side Jacobian formulas, and canonical acceleration components use $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. The algebraic root-ledger result below is therefore a Master EOM measurement on the unregularized circular simple-root chart. Stability, finite-event continuation, action records, and retained-history claims remain outside that measurement.

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, acceleration components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed; any $\eta \to 0$ statement is outside the claims established here unless a weak-limit argument is explicitly supplied. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-polarity architrinos and investigate where curvature $1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and transmitter-side acceleration weight.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-polarity pair can trace when the only acceleration contributions come from delayed line-of-action interactions with the partner and from each architrino's own past emissions. In the canonical transmitter-side law, each retained hit carries $c_f/|D_t|$ as its acceleration weight and $D_r/D_t$ separately for root playback.

#### Foundational Context (Ontological Clarification)

##### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by one declared persistent binary index of a candidate Noether braid. On the super-field-speed circular chart, certified same-transmitter roots can supply only the outward barrier against collapse; centripetal and tangential closure must come from the complete signed ledger. This mechanism does not by itself assign a braid-taxonomy member. If the branch is certified as a stable and reproducible attractor, it would supply candidate **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap target (explicit):** If a stable MCB branch is certified, it would define a single limit state with one radius/speed pair. Binaries may sit below that limit, but the claim that no binary can exceed the MCB curvature or pass beyond its defining radius/speed remains conditional on the full signed-root ledger and stability certificate.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. opposite-polarity causal-wake attraction, with the stripped inverse-square surrogate scaling as $\epsilon^2/r^2$,
2. self-hit repulsion (non-Markovian feedback when same-transmitter roots exist; super-field-speed circular history is the relevant branch),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the candidate Family-A ladder and broader Noether braid claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

#### Setup and Notation (Symmetric Frame)

- **Two architrinos** with polarity bookkeeping labels $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e|/6$).
- **Equal-time positions** (in absolute time $T$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

#### Translating Binary Handoff to Lorentz Closure

The circular maximum-curvature benchmark is also the rest-frame boundary condition for the first material clock/ruler test. The translating ansatz keeps absolute time and the primitive wake speed explicit:
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T)),
\qquad
\sigma\in\{+1,-1\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-116ae71707d08388)
where $\boldsymbol{\rho}_0$ is the circular branch studied here and $\boldsymbol{\rho}_u$ is the deformed periodic orbit, if it exists, on the retained moving branch chart.

This is a direct delayed-root calculation, not a coordinate boost imposed on the answer. The root equations must be solved again with the transmitter positions, transmitter velocities, partner-hit records, self-hit records, and Jacobian factors evaluated on the translating history. The decisive outputs are the moving period $T_u$ and the projected size ratio $L_{\parallel}(u)/L_{\perp}(u)$. In primitive units the Lorentz target is
$$
\frac{T_u}{T_0}=\gamma_f(u),
\qquad
\frac{L_{\parallel}(u)}{L_{\perp}(u)}=\frac{1}{\gamma_f(u)},
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ed308a8866ffe052)
The exact residual definitions and Theorem G role are recorded in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#translating-binary-benchmark). A Lorentzian result would make the two-body branch the first derived substrate clock. A non-Lorentzian residual would be equally informative because it would identify the first place where the primitive two-body kernel pressures the larger Lorentz-closure program.

Two conditional results constrain this handoff without producing a moving branch. First, for the exactly circular planar rest record, full spatial equivariance, global polarity-reversal invariance, smooth drift dependence, and local branch uniqueness modulo center and phase imply $T(\mathbf u)=T(-\mathbf u)$, so the first-order period coefficient vanishes. This fails as a branch statement if the symmetry exchanges two inequivalent moving branches, the rest record is chiral or nonplanar, or the retained-history rule distinguishes drift directions.

Second, no real linear map of the restricted form

$$
T'=\alpha T+\lambda x_\parallel,
\qquad
x_\parallel'=\frac{x_\parallel}{\gamma_f}+\beta T,
\qquad
\mathbf x_\perp'=\mathbf x_\perp
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ec622d7b2b0d86e0)

preserves every causal-root quadratic at nonzero drift, because coefficient matching requires $c_f^2\lambda^2=\gamma_f^{-2}-1=-u^2/c_f^2<0$. This is an exact no-go only for that complete map class; a wider class that also changes transverse lengths lies outside the claim. Neither result is evidence that a translating branch exists.

Plainly: symmetry removes one cheap linear-period test, and the restricted map cannot manufacture the desired branch. The delayed dynamics still has to find or reject the branch directly.

The moving-branch test also has a root-starvation obligation. If a forward transmitter root has minimum forward separation $d_{\min}$ in the direction of motion, then the causal delay needed to receive that root obeys the elementary bound
$$
\Delta_{\mathrm{forward}}(u)\geq \frac{d_{\min}}{c_f-u}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bfe09dc75a000d92)
This divergence is stronger than the Lorentz factor divergence,
$$
\gamma_f(u)\sim(c_f-u)^{-1/2},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4b089642eac934b5)
as $u\to c_f^-$. Therefore a bare translating binary cannot be promoted to the Lorentz handoff merely by showing that one clock period stretches. It must also show that the locked branch retains enough memory depth to supply the forward roots it claims. One diagnostic target is
$$
\mathcal{R}_{\mathrm{Lor\text{-}root}}(u)
=
\frac{\Delta_{\mathrm{forward}}(u)/T_u}
{M_b^{\mathrm{mem}}(u)+\epsilon_h},
\qquad
M_b^{\mathrm{mem}}(u)=\frac{h_b^{\mathrm{lock}}(u)}{T_u},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e324194a02a56819)
where $h_b^{\mathrm{lock}}$ is the declared retained-history depth of the moving branch and $\epsilon_h>0$ is a fixed normalization floor. If this residual diverges on the finite-$\eta$ moving chart, the two-body branch has run out of retained causal roots before it has derived Lorentz closure; the handoff must then move to a Noether-sea or larger assembly response rather than being booked as a bare-binary result.

On a declared smooth simple-root history, the companion canonical weight scales as

$$
\frac{1}{r^2}\frac{c_f}{|D_t|}
\sim
\frac{c_f-u}{c_fd_{\min}^2}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e96c7e69227c7e82)

The forward hit therefore weakens linearly in the gap while its delay diverges. A finite window can still remove it discontinuously at the retained boundary. This local result neither fixes the branch period nor interprets numerical history truncation as a physical memory law; it also fails if the same root approaches a transmitter-side fold.

Plainly: an older forward hit can become weaker while remaining necessary to the declared ledger. Losing it at a finite window is a separate boundary event.

The branch-qualified symbol matters: $h_b^{\mathrm{lock}}$ is the measured retained-history depth of this locked moving branch, whereas bare $h$ later denotes a generic history-space horizon. A translating-branch certificate must report $h_b^{\mathrm{lock}}$ rather than silently substituting the generic horizon.

Equivalently, with finite retained memory $h_b^{\mathrm{lock}}$, the bare translating binary hits a root-ledger wall at
$$
u_{\mathrm{crit}}
=
c_f-\frac{d_{\min}}{h_b^{\mathrm{lock}}},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a12c1a15fd910bca)
for any retained forward record with separation floor $d_{\min}$. At or above this wall that record exits the memory window, so the active causal-root ledger cannot be preserved on the same two-body chart. This is the binary-level version of the forward partner-root starvation theorem in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized): the obstruction is kinematic/topological before it is an acceleration-balance residual.

Let $C_i(T_t)$ denote the causal wake surface emitted by architrino $i$ at emission time $T_t$. For uniform circular motion, self-hit events are discrete intersections between the worldline and its own wake surfaces. Define the **principal self-delay angle** $\tilde{\delta}_s \in (0, \pi]$ as the minimal angular separation between the current position and the emission point that yields a hit. Additional self-hits occur at longer delays indexed by winding number $m \ge 0$, giving a discrete family $\delta_s(m) = \tilde{\delta}_s + 2\pi m$.

##### Phase Angles and Delays

Let $\delta_s$ and $\delta_p$ denote the angular phase separations (measured along the circle) between:
- **Self** (same architrino): Current position -> its own past emission position that hits "now."
  - Causal delay: $\Delta_s$; angular separation: $\delta_s = \omega \Delta_s$.
  - Chord length: $r_s = 2R \sin(\delta_s / 2)$.

- **Partner** (other architrino): Current position -> partner's past emission position that hits "now."
  - Causal delay: $\Delta_p$; angular separation: $\delta_p = \omega \Delta_p$.
  - Chord length: $r_p = 2R \cos(\delta_p / 2)$.

##### Causal-Time Constraints in Normalized Field-Speed Units

For a signal to travel from emission point to reception point:
$$
r = c_f \cdot \Delta \quad \Rightarrow \quad r = \Delta \quad \text{(in units where } c_f = 1\text{)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5d72250b685366bf)

This yields two delay equations:

1. **Self-hit**:
  $$
  \delta_s = \omega \Delta_s = \omega \cdot r_s = \omega \cdot 2R \sin(\delta_s / 2) = 2s \sin(\delta_s / 2)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-679084cba0182b7a)

2. **Partner hit**:
  $$
  \delta_p = \omega \Delta_p = \omega \cdot r_p = \omega \cdot 2R \cos(\delta_p / 2) = 2s \cos(\delta_p / 2)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c0098e33ef4500fd)

**These two transcendental equations determine** $(\delta_s, \delta_p)$ **as functions of speed** $s$.

**Circular-branch threshold**: On this uniform circular branch, self-hit roots exist only when $s > 1$ (i.e., $\|\mathbf V\| > c_f$). For $s \le 1$, no self-hit roots occur on the circular chart. This is a branch-specific root result, not a general speed-only criterion for arbitrary histories.

---

##### Principal Partner-Root Certificate

For the partner branch, write the full delay angle as
$$
\phi=\omega\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f2f257da55db47df)
and the chapter speed ratio as
$$
\beta_f=\frac{\omega R}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-19e481375424b42f)
In this non-translating circular certificate, $\beta_f$ is the same speed ratio denoted $s$ elsewhere in the chapter. The principal partner-root equation is
$$
2\beta_f\cos\frac{\phi}{2}=\phi,
\qquad
0<\phi<\pi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dd3c84cc0800fa6e)
The function $F(\phi)=2\beta_f\cos(\phi/2)-\phi$ satisfies $F(0)=2\beta_f>0$, $F(\pi)=-\pi$, and
$$
F'(\phi)=-\beta_f\sin\frac{\phi}{2}-1<0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ca2a51f9363e76b5)
on $(0,\pi)$. Therefore the principal partner root exists and is unique for every $\beta_f>0$.

The same conclusion gives a derived transversality floor. On the principal partner branch,
$$
J_p=1+\beta_f\sin\frac{\phi}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c58a6a7553be6587)
so the dimensional root-transversality quantity is
$$
\kappa_{\mathrm{hit}}^{\mathrm{bin}}
\equiv
\left|
c_f-\hat{\mathbf r}\cdot\mathbf V_j(T-\Delta)
\right|
=
c_f\left(1+\beta_f\sin\frac{\phi}{2}\right)
>
c_f
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-03f0682d60a16f1c)
This floor is not an admissibility parameter for the principal branch; it is a computed property of the circular geometry. It certifies that the simple-root chart cannot fail by partner-root tangency on the principal partner branch.

The instantaneous radial-balance equation is also closed form. Setting the inward partner radial acceleration equal to the required centripetal acceleration gives
$$
\frac{\beta_f^2c_f^2}{R}
=
\frac{\kappa\epsilon^2}
{4R^2\cos(\phi/2)J_p}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0d4201e774ca3534)
and therefore, with $R_*=\kappa\epsilon^2/c_f^2$,
$$
\frac{R}{R_*}
=
\frac{1}
{4\beta_f^2\cos(\phi/2)J_p}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4fad02f6365fca11)
As $\beta_f\to0$, the root satisfies $\phi\sim2\beta_f$, and the balance reduces to
$$
\omega^2R^3=\frac{\kappa\epsilon^2}{4}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-874ac7b8086a1de5)
which is the delayed Coulomb-Kepler scaling for the isolated opposite-polarity pair.

The same principal branch still cannot be a uniform orbit. The delayed partner line of action has a forward tangential projection, so
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa\epsilon^2\sin(\phi/2)}
{4R^2\cos^2(\phi/2)J_p}
>
0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f18f2f353f33b583)
and the instantaneous work rate satisfies $A_\theta^{(\mathrm{part})}R\omega>0$. Thus the principal branch has positive tangential work in the partner-only circular reduction: it gives the radial family above, but it also pumps tangential energy. A constant-speed circular binary therefore requires a signed multi-root tangential residual
$$
\sum_{T_t\in\mathcal{C}_{12}(T)}A_\theta^{(12)}(T;T_t)
+
\sum_{T_t\in\mathcal{C}_{11}(T)}A_\theta^{(11)}(T;T_t)
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6d474b13a9ba4ecb)
on the retained ledger, or an explicitly retained wake-flux channel in the finite-window energy ledger. Since circular self-hit roots require super-field-speed history on this branch, an MCB candidate using the self-hit barrier must live on the super-field-speed side of the circular ledger rather than on the principal partner branch alone.

Additional partner roots are not speculative. The full delay-angle equation is
$$
\phi=2\beta_f\left|\cos\frac{\phi}{2}\right|,
\qquad
\phi>0,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3e24b4ed75e3a368)
and the retained ledger must record the sheet sign
$$
\sigma_p=\operatorname{sign}\!\left(\cos\frac{\phi}{2}\right).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5e86613c4eaf9f85)
Positive-cosine and negative-cosine windows both contain admissible partner sheets. The principal root lies on the positive sheet in $(0,\pi)$. Higher positive-sheet pairs appear when the corresponding window maximum reaches zero:
$$
\sqrt{\beta_f^2-1}
+
\arcsin\frac{1}{\beta_f}
=
2\pi k
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b5263e714814f61)
for $k\ge1$. At equality the two roots are born at a tangency; above it they thicken the partner-hit ledger. Negative-sheet partner roots are represented by $\phi=2\pi m-\alpha_p$ in the signed-sheet notation below. The first such branch is born at the minimum of
$$
\beta_-(\alpha_p)
=
\frac{2\pi-\alpha_p}{2\cos(\alpha_p/2)},
\qquad
0<\alpha_p<\pi,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f5b62cfd3e5010ef)
whose tangency condition is $\tan(\alpha_p/2)=2/(2\pi-\alpha_p)$. It carries the opposite tangential sign. The root census is therefore a computed signed branch diagram rather than a positive-window-only conjecture.

##### Signed Root Census and Speed Ladder

**Root**: An emission time $T_t < T_r$ (from either self or partner) that satisfies the causal constraint $r = c_f (T_r - T_t)$ and produces a hit at reception time $T_r$.

**Integer-indexed older roots (winding numbers)**:

Let $\tilde{\delta}_s \in (0, \pi]$ and $\tilde{\delta}_p \in (0, \pi)$ denote the **minimal (principal) angular separations** that determine the chord lengths and acceleration directions. The partner endpoint is open because $\tilde{\delta}_p=\pi$ makes the partner chord length vanish and the inverse-square coefficient singular; the self endpoint remains closed and carries zero tangential projection.

In the same-sheet convention used for the first circular no-go, the full families of causal delays are:

- **Self**:
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6b3508d6d529e695)

- **Partner**:
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d24b00d3b8013558)

**Geometric interpretation**:
- The minimal separations $\tilde{\delta}_s$, $\tilde{\delta}_p$ determine the **same-sheet principal geometry** (chord lengths, acceleration directions).
- The winding index $m$ affects **timing/ordering** of multiple hits inside that same-sheet convention.

**Signed-sheet completion:** A full circular root certificate must also track whether the full delay angle is represented as $2\pi m+\alpha$ or $2\pi m-\alpha$, with $\alpha_s\in(0,\pi]$ for self roots and $\alpha_p\in(0,\pi)$ for partner roots. The same-sheet convention is the quotient that forgets the orientation of the delay direction; the signed sheet $\sigma\in\{+1,-1\}$ lifts the circular root to the orientation double cover of the retained delay strip. Opposite signed sheets can reverse the tangential projection of a self-hit line of action. The sign-invariant statements below are therefore certified only on the same-sheet principal branch chart unless the signed sheet has been explicitly included in the root ledger.

For the full signed ledger, write
$$
\Delta_s^{\sigma,m}=2\pi m+\sigma\alpha_s,
\qquad
\Delta_p^{\sigma,m}=2\pi m+\sigma\alpha_p,
\qquad
\sigma\in\{+1,-1\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4b8936a3ab67cdda)
with $\sigma=-1$ requiring $m\ge1$. The signed circular root equations become
$$
2\pi m+\sigma\alpha_s=2s\sin(\alpha_s/2),
\qquad
2\pi m+\sigma\alpha_p=2s\cos(\alpha_p/2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5cbb5c55957b27ff)
The corresponding tangential signs are $\sigma\cos(\alpha_s/2)$ for self roots and $\sigma\sin(\alpha_p/2)$ for partner roots, up to positive branch weights. The signed sheet is therefore not a cosmetic ledger choice: it is the first place the bare circular kernel can acquire a tangential contribution with the opposite sign from the same-sheet no-go record.

| Transmitter identity | Sheet | Allowed winding | Tangential sign away from endpoints | First boundary |
| --- | --- | ---: | ---: | ---: |
| Partner | $\sigma=+1$ | $m\ge0$ | positive | principal branch for all $s>0$; first older positive-sheet representation at $s=\pi$ |
| Partner | $\sigma=-1$ | $m\ge1$ | negative | first interior tangency at $s=s_{p,-}^\star$ |
| Self | $\sigma=+1$ | $m\ge0$ | positive | principal branch at $s=1$; first older branch at $s=s_1^\star$ |
| Self | $\sigma=-1$ | $m\ge1$ | negative | first boundary at $s=\pi/2$ |

The consolidated structural speed ladder of the circular atlas is therefore

| Speed | Root-ledger event |
| ---: | --- |
| $s=1$ | principal positive-sheet self root enters from $\alpha_s=0$ |
| $s=\pi/2$ | first negative-sheet self root enters at $\alpha_s=\pi$ |
| $s=s_{p,-}^\star\approx2.97169$ | first negative-sheet partner pair is born at an interior tangency |
| $s=\pi$ | a negative-partner branch reaches $\alpha_p=0$ and continues onto the first older positive-sheet representation |
| $s=s_1^\star\approx4.60334$ | first older positive-sheet self pair is born at an interior tangency |

The negative-partner threshold and the first older positive-self threshold are fixed by
$$
s_{p,-}^\star
=
\min_{0<\alpha<\pi}
\frac{2\pi-\alpha}{2\cos(\alpha/2)}
\approx
2.97169,
\qquad
\sqrt{(s_1^\star)^2-1}
-
\arccos\!\left(\frac{1}{s_1^\star}\right)
=
\pi.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9221dccabe0a9274)

The first negative self sheet, $m=1,\sigma=-1$, obeys
$$
2\pi-\alpha=2s\sin(\alpha/2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ff6bb373ed56f825)
and appears at $s=\pi/2$ with $\alpha=\pi$. Equivalently, at the threshold a wake crosses the diameter $2R$ in time $2R/c_f$, while the transmitter advances half a circumference $\pi R$ at speed $s c_f$; the equality $\pi R=s c_f(2R/c_f)$ gives $s=\pi/2$. For $s>\pi/2$ it contributes negative tangential drive. This does not prove circular closure, but it makes the $\sigma=-1$ sheet the first internal generator capable of carrying opposite period in the tangential cohomology class. A useful floor conjecture is:

> No isolated, bare, constant-speed circular MCB branch can close for $s<\pi/2$, because the first negative same-transmitter sheet is absent and the same-sheet tangential cohomology class has no internal cancellation generator. In cochain language, the space available to the retained two-body ledger has no opposite-period self-record before the $\sigma=-1$ wall at $s=\pi/2$.

The decision procedure is finite on any compact speed interval below $\pi/2$: enumerate the full signed partner and self-root ledger, certify the inactive gaps and positive $|J|$ floors, include the finite-window wake boundary term, and evaluate the signed tangential period. A retained negative-period root, a zero total period with closed wake flux, or a branch missed by the enumeration falsifies the floor conjecture.

For $s\geq\pi/2$, closure is still not automatic. The negative sheet must survive the finite-$\eta$ branch chart, satisfy the Jacobian and inactive-gap floors, and balance the remaining tangential class through signed-root cancellation, wake escapement, or multi-body exchange.

---

#### Per-Hit Directions and Acceleration Components

##### Local Coordinate Frame at Receiver

- **Radial outward**: $\hat{e}_r$ (from rotation center toward receiver).
- **Tangential**: $\hat{e}_t$ (direction of motion along circle).

##### Unit Directions from Emission to Reception

**Self-hit**:
$$
\hat{u}_s = \sin(\delta_s / 2) \, \hat{e}_r + \cos(\delta_s / 2) \, \hat{e}_t
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d528317cc5516f91)

**Partner hit** (geometric chord across circle):
$$
\hat{u}_p = \cos(\delta_p / 2) \, \hat{e}_r - \sin(\delta_p / 2) \, \hat{e}_t
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-999fc8e5bd526ce2)

##### Canonical Per-Hit Accelerations

Using the delayed law with line-of-action direction and transmitter-side acceleration weight (where $\kappa$ is a coupling constant and $\epsilon = |e|/6$), define the same-root factors

$$
W_s^{\mathrm{acc}}=\frac{c_f}{|D_{t,s}|},
\qquad
W_p^{\mathrm{acc}}=\frac{c_f}{|D_{t,p}|}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-345420b59d5b4f34)

The canonical per-hit acceleration contributions are

$$
\mathbf A_s = +\kappa \epsilon^2 \frac{W_s^{\mathrm{acc}}}{r_s^2} \hat{u}_s,
\qquad
\mathbf A_p = -\kappa \epsilon^2 \frac{W_p^{\mathrm{acc}}}{r_p^2} \hat{u}_p.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8283dd3ffa815b21)

On the non-translating symmetric circular benchmark, the equal-projection lemma gives $D_r=D_t$ on every retained self or partner chord, so signed root playback is one. The acceleration weights remain $W_s^{\mathrm{acc}}=1/|J_s|$ and $W_p^{\mathrm{acc}}=1/J_p$. The circular canonical contributions are

$$
\mathbf A_s = +\kappa \epsilon^2 \frac{1}{r_s^2|J_s|} \hat{u}_s,
\qquad
\mathbf A_p = -\kappa \epsilon^2 \frac{1}{r_p^2J_p} \hat{u}_p.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-46fc98c0ea86dc48)

The transmitter-side factors remain the root-density and transversality diagnostics:

$$
J_s \equiv 1-\frac{\mathbf V_{\text{self}}(T_t)\cdot \hat{u}_s}{c_f},
\qquad
J_p \equiv 1-\frac{\mathbf V_{\text{partner}}(T_t)\cdot \hat{u}_p}{c_f}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-222a78eb8bf4caf1)

---

##### Explicit Circular Jacobians

For the symmetric circular geometry, the transmitter velocities can be resolved exactly against the line-of-action directions:
$$
\mathbf V_{\text{self}}(T_t)\cdot \hat{u}_s = s\cos(\delta_s/2),
\qquad
\mathbf V_{\text{partner}}(T_t)\cdot \hat{u}_p = -s\sin(\delta_p/2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3f67145e70534eba)
Hence the branch Jacobians reduce to
$$
J_s = 1-s\cos(\delta_s/2),
\qquad
J_p = 1+s\sin(\delta_p/2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a1fa1ea81d573082)
Using the delay constraints gives equivalent forms
$$
J_s = 1-\frac{\delta_s}{2}\cot(\delta_s/2),
\qquad
J_p = 1+\frac{\delta_p}{2}\tan(\delta_p/2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e20a3822a1516ea4)
These formulas make the transmitter-side transversality asymmetry between the two branch types explicit:

- The partner branch always satisfies $J_p > 1$, so its transmitter-side acceleration is diluted relative to a static inverse-square surrogate.
- The self branch can satisfy $J_s \to 0^+$, producing the causal bunching that sharpens self-hit into a null-separatrix wall for root density, action counting, and finite-$\eta$ branch certification.

---

##### Transmitter-Side Radial and Tangential Diagnostics

Define **inward radial** as positive (toward center) and **tangential** as positive in direction of motion.

The projections in this subsection are transmitter-side circular diagnostics. They record root playback and root geometry, but they are not canonical Master EOM acceleration contributions until the same retained branches are recomputed with $D_t$, $D_r$, and $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$.

**Chord lengths**:
$$
r_s = 2R \sin(\delta_s / 2), \quad r_p = 2R \cos(\delta_p / 2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2aa860050763be5e)

**Inward radial diagnostic components**:

- **Self** (repulsive -> outward -> negative):
 $$
	 A_{s,\text{rad}}^{t} = -\kappa \epsilon^2 \frac{\sin(\delta_s / 2)}{r_s^2\,|J_s|} = -\frac{\kappa \epsilon^2}{4R^2 \sin(\delta_s / 2)\,|J_s|}
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ec403851e72cedfe)

- **Partner** (attractive -> inward -> positive):
 $$
	 A_{p,\text{rad}}^{t} = +\kappa \epsilon^2 \frac{\cos(\delta_p / 2)}{r_p^2\,|J_p|} = +\frac{\kappa \epsilon^2}{4R^2 \cos(\delta_p / 2)\,|J_p|}
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3aa80ae0062942b8)

**Net inward radial diagnostic**:
$$
A_{\text{rad}}^{t} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-49d425561ed2044a)

**Tangential diagnostic components**:

- **Self**:
 $$
	 T_s^{t} = +\kappa \epsilon^2 \frac{\cos(\delta_s / 2)}{r_s^2\,|J_s|} = \frac{\kappa \epsilon^2 \cos(\delta_s / 2)}{4R^2 \sin^2(\delta_s / 2)\,|J_s|}
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9b5af381c8c1e16e)

- **Partner**:
 $$
	 T_p^{t} = +\kappa \epsilon^2 \frac{\sin(\delta_p / 2)}{r_p^2\,|J_p|} = \frac{\kappa \epsilon^2 \sin(\delta_p / 2)}{4R^2 \cos^2(\delta_p / 2)\,|J_p|}
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-84fa67ffb7a47f8f)

**Net tangential diagnostic**:
$$
T^{t} = T_s^{t} + T_p^{t}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2a5247be966ed03d)

---

##### Sub-Field-Speed Simplification

When $s \le 1$, self-hits do not occur ($\delta_s$ has no solution). Only the partner contributes to this transmitter-side diagnostic:

$$
T^{t}(s \le 1) = T_p^{t} = \frac{\kappa \epsilon^2}{4R^2} \frac{\sin(\delta_p / 2)}{\cos^2(\delta_p / 2)\,|J_p|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1d7442a967d9b4c9)

Using the delay relation $\delta_p = 2s \cos(\delta_p / 2)$:

$$
T^{t}(s \le 1) = \frac{\kappa \epsilon^2 s^2}{R^2} \frac{\sin(\delta_p / 2)}{\delta_p^2\,|J_p|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7e6136bf8133adc8)

Because $J_p = 1+s\sin(\delta_p/2) > 1$, the transmitter-side delay geometry weakens the canonical contribution relative to a stripped inverse-square surrogate by the factor $1/J_p$. Its tangential sign remains positive. For $s\le1$, the full signed census contains only this principal partner root: no self root, older positive partner root, or negative sheet is active. A particle-only constant-speed circular orbit is therefore excluded on the full circular root ledger throughout the sub-field-speed regime. A causal retained-history account is still required for any broader conservation claim.

---

#### Requirements for True Circular Orbit (Working Hypothesis)

For uniform circular motion at fixed radius $R$ and constant speed $s$:

1. **Receiver-side centripetal balance**:
  $$
  A_{\text{rad}}^{\mathrm{rec}} = \frac{s^2}{R}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a0642be4451c6de4)

2. **Finite-window energy balance**:
  $$
  \left\langle
  \frac{dK_{\mu}}{dT}
  \right\rangle_W
  +
  \left\langle
  \Phi_{\mathrm{wake},\partial W}
  \right\rangle_W
  =
  0
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-26557bc502288453)
  Here $K_{\mu}$ is the chosen quadratic kinetic proxy and $\Phi_{\mathrm{wake},\partial W}$ is the causal-wake energy flux through the boundary of the local window. The older shorthand $\langle T\rangle=0$ is valid only for a particle-only closed window with no boundary wake flux.

  On a declared branch chart $b$, this balance has an operational work record:
  $$
  P_{b,\mathrm{work}}^{(\eta)}(T)
  =
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf A_{i,b}^{(\eta)}(T)
  \cdot
  \mathbf V_i(T)
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ad8965a858b7e5b)
  For a circular constant-speed benchmark, $\mathbf V_i$ is tangent to the orbit and the radial record does no instantaneous work, so
  $$
  \left\langle
  P_{b,\mathrm{work}}^{(\eta)}
  \right\rangle_{P_b}
  =
  \mu_{\text{arch}}\,s_b\,
  \left\langle
  A_{\eta,b}^{\mathrm{tan}}
  \right\rangle_{P_b}
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7fb3fe13d2d79f07)
  for the quadratic proxy. Thus the tangential term is not merely a geometric nuisance; it is the first constructive entry in the binary wake-energy ledger. If the primitive kinetic scalar is used instead, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$ inside the summed power.

---

##### Tangential Drive and Wake Escapement

**Theorem (Same-sheet no-go for constant-speed circular orbit in the bare two-body kernel).** In the symmetric, non-translating circular binary with canonical delayed radial acceleration contributions only, and with active roots restricted to the same-sheet principal branch chart defined above, the net tangential acceleration is strictly positive whenever at least one causal root contributes.

$$
T_{\mathrm{net}}
=
\sum_{m\in\mathcal{M}_p} w_{p,m} T_{p,m}
\;+\;
\sum_{m\in\mathcal{M}_s} w_{s,m} T_{s,m}
>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ed91b29f8aba3607)
where $w_{p,m},w_{s,m}\ge 0$ are same-root transmitter-side weights induced by $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ and any declared regularization/time averaging, and $\mathcal{M}_p,\mathcal{M}_s$ are active partner/self root sets.

*Proof.*
For any active partner branch, the tangential contribution is
$$
T_{p,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\sin(\tilde{\delta}_{p,m}/2)}{\cos^2(\tilde{\delta}_{p,m}/2)}
>0,
\qquad \tilde{\delta}_{p,m}\in(0,\pi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5c31b988a2090bd0)
and for any active self branch (when present),
$$
T_{s,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\cos(\tilde{\delta}_{s,m}/2)}{\sin^2(\tilde{\delta}_{s,m}/2)}
\ge0,
\qquad \tilde{\delta}_{s,m}\in(0,\pi]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cd922f4c09761daf)
The sign is branch-invariant on this same-sheet chart because winding changes timing, not chord orientation. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative. The always-present principal partner root is strictly positive, including when a self branch sits at its endpoint with zero tangential projection. Hence $T_{\mathrm{net}}>0$ on the certified chart. $\square$

**Corollary.**
Within the same-sheet bare isolated two-body kernel, an exact constant-speed circular orbit with no boundary wake-state exchange is impossible. Any MCB-like steady state must therefore close a finite-window balance: signed-root cancellation may reduce the local tangential drive, but any remaining forward kinetic-rate change must close against the causal wake state or genuinely multi-body Noether braid exchange.

**Interpretation.** The positive tangential component is not merely an obstruction to be erased. In a finite local window, partner and self wakes are continually emitted while only a subset of their causal isochrons later hit a local receiver. A local binary can be called conservative only if the retained causal wake state, its boundary exchange, and the active-root record close energy, momentum, and angular momentum on the same update.

**Cohomology reading.** On a closed circular branch, write $\theta$ for the receiver phase and let
$$
\omega_T^{(b)} = R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-19c31bb40d3a5aef)
be the tangential torque one-form on the retained signed ledger $b$. Same-sheet records give a positive period integral,
$$
\oint_{S^1}\omega_T^{(b)}>0,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bcd3689fdb93dd85)
so $[\omega_T^{(b)}]\ne0$ in $H^1(S^1)$ and $\omega_T^{(b)}$ is not an exact derivative of a single-valued mechanical angular-momentum potential on the particle-only chart. Closure requires a coboundary supplied by retained non-particle channels:
$$
\left[\omega_T^{(b)}
+\omega_{\partial W}^{(b)}
+\omega_{\mathrm{wake}}^{(b)}
+\omega_{\mathrm{multi}}^{(b)}
\right]=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ae449c3f33bf0eff)
in the cycle cohomology of the branch chart. A compact escaped-action diagnostic is
$$
N_{\mathrm{esc}}^{(b)}
=
\frac{\mu_{\text{arch}}}{h_{\mathrm{act}}}
\int_0^{P_b} R\,T_{\mathrm{net}}^{(b)}(T)\,dT
=
\frac{\mu_{\text{arch}}}{h_{\mathrm{act}}\,\omega_b}
\oint R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5ee2d900406f5b30)
where $h_{\mathrm{act}}$ is the declared action unit used by the branch packet and the second equality assumes a uniform circular benchmark. It is distinct from the retained-history depth $h$. If the primitive kinetic scalar is used instead of the quadratic proxy, the same packet must replace $\mu_{\text{arch}}$ by the declared $\mu_K$ entry. A bare two-body circular closure can pass only when this class is cancelled by an explicitly retained signed sheet, causal wake-state, boundary, or multi-body exchange entry.

**Plain language**: On the same-sheet chart, the isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every certified root accelerates the same way. The stable-branch question is whether one causal wake-state or multi-body update closes that drive without destroying the retained branch. This is a primary test of the MCB attractor hypothesis.

---

#### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a radial outward component and a signed tangential component. As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$ times their transmitter-side weights $1/|J|$. Maximum curvature would require the outward self-hit radial component to balance the inward partner pull without the tangential sum destroying constant-speed closure, and the coincident self-root birth must first have a finite accepted event treatment.

The non-translating symmetric circular radial target is therefore the transmitter-side weighted acceleration contribution:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)J_p} - \frac{1}{\sin(\delta_s / 2)|J_s|} \right).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9aef3ea1a516f4b5)

For translating, deformed, or non-circular branches, this target must be restored to the same-root form with $W_{\bullet}^{\mathrm{acc}}=c_f/|D_{t,\bullet}|$, with $D_{r,\bullet}/D_{t,\bullet}$ retained separately for root playback.

**Increasing curvature** ($1/R$ larger, so $R$ smaller) requires **stronger inward radial acceleration**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on the same-root transmitter-side acceleration weight $W_s^{\mathrm{acc}}$.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold inverse-distance hinge plus transmitter-side fold.** On the principal self branch, $D_t$ loses its floor as $s\downarrow 1^+$, and the transmitter-side acceleration weight diverges as $1/|D_t|$. The coincident branch birth therefore remains a failed singular event until a finite regulator-independent transition is certified.

2. **Higher-speed multi-branch redistribution.** At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full transmitter-side weighted sum over all active branches rather than on the principal branch alone.

**Current status**: The same-sheet per-hit $T>0$ result excludes only the restricted same-sheet chart. The complete unregularized signed simple-root ledger has algebraic circular candidates, beginning near $s=3.07036$, so existence is measured rather than excluded on that chart. The maximum-curvature state remains uncertified for the isolated two-body system because finite-event continuation, retained-history persistence, wake-boundary closure, and return-map stability have not been established.

Because the desired MCB branch is expected to graze the $J=0$ wall, the stability target is not only a smooth Floquet calculation. On smooth arcs with a fixed ledger, Floquet multipliers are the right local test. At the null separatrix itself, the branch is a caustic-grazing limit cycle: the appropriate theorem target is an isolating block in history space that straddles the $J=0$ wall and has a persistent Conley index under finite-$\eta$ continuation. The concrete target is uniform index persistence: for sufficiently small $\eta>0$, the regularized return map must carry the same Conley index on one isolating neighborhood of the grazing orbit, with the finite-caustic impulse bound controlling the velocity jump through the wall. If the index changes as $\eta\to0^+$, the MCB is not a robust attractor. In that reading, the MCB branch is stable only if the orbit returns through the grazing chart without escaping the isolating block or changing its declared signed ledger except at the certified fold records.

---

#### Emergent Properties and Measurement Standards

If a stable MCB exists, it provides a concrete **rod** and **clock** defined entirely by the two-body delay dynamics. Let
$$
d_0 := R_{\text{MCB}}, \qquad T_0 := \frac{2\pi}{\omega_{\text{MCB}}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1f72dd4e4e729012)
The natural Layer-I two-body units are
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a18476ab029c629b)
so the first MCB outputs are the dimensionless ratios
$$
\frac{R_{\mathrm{MCB}}}{R_*},
\qquad
\frac{T_0}{T_*},
\qquad
\beta_{\mathrm{MCB}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e6cca7d00e47ed2e)
rather than additional fitted constants. Once $(c_f,\kappa,\epsilon)$ fixes the length, time, and polarity units, the signed-root ledger and stability problem must compute those ratios as pure numbers.

Then $d_0$ is the candidate fundamental length scale of the architecture, and $T_0$ is the candidate fundamental time scale. Their comparison with the wake propagation speed is the dimensionless MCB speed factor
$$
\beta_{\mathrm{MCB}}
=
\frac{R_{\mathrm{MCB}}\omega_{\mathrm{MCB}}}{c_f}
=
\frac{2\pi d_0}{c_fT_0}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0259af4b1bc11ab2)
so the wake propagation speed is not an imposed architrino-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
\|\mathbf V\|>c_f
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-159a10b5ae5d31fe)

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, T_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

A certified MCB would also define the first handedness marker. In the binary plane set
$$
\hat{\mathbf n}_{\mathrm{MCB}}
=
\hat{\mathbf r}\times\hat{\mathbf V},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b1bce6b032776b52)
with $\hat{\mathbf r}$ pointing from the center to one chosen polarity record and $\hat{\mathbf V}$ its direction of motion. The two signs of $\hat{\mathbf n}_{\mathrm{MCB}}$ label two branch basins, $B_+$ and $B_-$, not two coordinate conventions. A branch-preserving deformation can rotate the plane, but it cannot flip this $\mathbb{Z}_2$ label without passing through a degeneracy where the circular plane, transmitter order, or signed causal-root ledger changes. Thus chirality is carried by the joint path-history and signed-root framing of the branch, not by a freely chosen drawing orientation.

This handedness claim is falsified by any continuous retained deformation from $B_+$ to $B_-$ that preserves a nondegenerate plane, transmitter order, the signed causal-root ledger, and all declared Jacobian floors throughout the path. Such a deformation would show that the proposed $\mathbb Z_2$ label is a chart convention rather than a branch invariant.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

#### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Transmitter identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-transmitter feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In the same-sheet uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f28884b49ad67b66)

##### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-aac7e4226c4dbf5c)
An $m$-branch same-sheet self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

- For the principal branch $m=0$, the threshold is sharp:
  $$
  s_0^\star = 1
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f6c717f00f8d3a75)
- For higher winding numbers $m\ge 1$, the appearance threshold is determined by the tangency condition at the interior maximizer $f_m'(\delta;s)=0$, namely
  $$
  \cos(\delta^\star_m/2)=\frac{1}{s},
  \qquad
  \sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m
  $$

  [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1f9c6d29dc1762e6)

Thus the higher same-sheet self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve. A full signed-root ledger must add the $\sigma=-1$ sheets described above; the first such negative self sheet appears at $s=\pi/2$, earlier than the first higher same-sheet self branch.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bfea2a29a2e9a7c7)
so the equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

The self-hit root count is therefore a genuine branch-bifurcation diagram for the circular benchmark. Here
$$
s=\frac{\|\mathbf V\|}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3549cb7a383b91c5)
is the chapter's speed ratio, equivalent to $\beta_f$ in the usual notation. Between neighboring branch-birth thresholds, the active self-root ledger $N_s(s)$ is constant and the same root labels can be transported. At the thresholds, the delay equation has a tangency and the newly born circular root lies on a Jacobian-null boundary. Thus the root census, the caustic locations, and the ledger-transition speeds are one computed object rather than three separate assumptions.

##### Root Ledger as a One-Parameter Morse Complex

For a fixed reception event on a one-parameter family of branch histories, write the root function as
$$
F_{ij}(T_t;s)
=
\|\mathbf X_i(T;s)-\mathbf X_j(T_t;s)\|
-c_f(T-T_t).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e039ae2ca69de5bd)
Active causal roots are the zeros of $F_{ij}$. A branch birth or death is a fold record:
$$
F_{ij}=0,
\qquad
\partial_{T_t}F_{ij}=0,
\qquad
\partial_{T_t}^{2}F_{ij}\neq0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5ae7567fc04d918b)
Away from those folds, the signed degree
$$
D_{ij}(s)
=
\sum_{T_t\in\mathcal{C}_{ij}(T;s)}
\operatorname{sign}\!\left(\partial_{T_t}F_{ij}(T_t;s)\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c7591e4bdb50ca80)
is locally constant, while the unsigned counts $N_s$ and $M_p$ track the ranks of the same-transmitter and partner-root records. This is the binary version of the [assembly topological charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md): the later rank-three braid label $(N_s,M_p,c_1)$ uses the two root-complex integers from this chapter and the phase-return degree data from the resonance-lock chart. A solver that reports only raw root counts loses the signed degree needed to distinguish a true branch fold from a harmless relabeling of records.

##### Parameter-Free Circular Branch Packet

The circular two-body benchmark can now be stated as a parameter-free branch packet. Use the Layer-I units
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
\rho=\frac{R}{R_*},
\qquad
s=\frac{R\omega}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4f1f4bf1ed5e3967)
and factor out the acceleration scale $c_f^2/R_*$. The remaining equations depend only on the dimensionless radius $\rho$, the speed ratio $s$, and the signed causal-root ledger.

For the principal partner branch, let $\xi_p=\delta_p/2$. The delay equation is
$$
\cos\xi_p=\frac{\xi_p}{s},
\qquad
0<\xi_p<\frac{\pi}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cfa3ec6a61efb761)
with
$$
J_p=1+s\sin\xi_p
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-969e1e922d667c33)
as the transmitter-side transversality diagnostic. For a general signed partner branch $\alpha_p=(\xi,\sigma,m)$, use
$$
2\pi m+2\sigma\xi=2s\cos\xi,
\qquad
J_p(\xi,\sigma;s)=1+\sigma s\sin\xi.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6fb95ab7bbce2f30)
The canonically weighted circular acceleration coefficients are
$$
P_{\mathrm{rad}}(\xi,\sigma;s)=\frac{1}{\cos\xi\,|J_p|},
\qquad
P_{\mathrm{tan}}(\xi,\sigma;s)=\frac{\sigma\sin\xi}{\cos^2\xi\,|J_p|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4422a91942b79d59)
where radial is measured inward and tangential is measured in the direction of motion.

For a signed self branch $\alpha_s=(\xi,\sigma)$ in the full circular ledger, use
$$
\sigma\sin\xi=\frac{\xi}{s},
\qquad
\sigma=\operatorname{sign}(\sin\xi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-48786dfa3d2c7508)
with
$$
J_s(\xi,\sigma;s)=1-s\sigma\cos\xi
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0c217ffbd2986532)
as the transmitter-side transversality diagnostic. The outward radial and signed tangential canonical circular coefficients are
$$
S_{\mathrm{rad}}(\xi,\sigma;s)=\frac{s}{\xi\,|J_s|},
\qquad
S_{\mathrm{tan}}(\xi,\sigma;s)=\frac{s^2\sigma\cos\xi}{\xi^2\,|J_s|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dac177081b1631e8)
Higher self-root births occur at tangencies:
$$
\tan\xi^\star=\xi^\star,
\qquad
s^\star=|\sec\xi^\star|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-16c46242ccebe455)
and these births are also Jacobian-null events, $J_s=0$.

On a fixed signed ledger $b$, the dimensionless circular MCB candidate equations are therefore
$$
\mathcal{G}_{\mathrm{rad}}^{(b)}(\rho,s)
=
\frac{1}{4\rho^2}
\left(
\sum_{\alpha_p\in b_p}P_{\mathrm{rad}}(\alpha_p;s)
-
\sum_{\alpha_s\in b_s}S_{\mathrm{rad}}(\alpha_s;s)
\right)
-
\frac{s^2}{\rho}
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5ad6daf7ca9c08c6)
and
$$
\mathcal{G}_{\mathrm{tan}}^{(b)}(\rho,s)
=
\frac{1}{4\rho^2}
\left(
\sum_{\alpha_p\in b_p}P_{\mathrm{tan}}(\alpha_p;s)
+
\sum_{\alpha_s\in b_s}S_{\mathrm{tan}}(\alpha_s;s)
\right)
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e03435a2612340e5)
Here $b_p$ and $b_s$ are the partner-hit and self-hit entries in the signed causal-root ledger. The equations are parameter-free because $\kappa$, $\epsilon$, and $c_f$ have already been absorbed into $R_*$ and the acceleration scale. A common zero of these two residuals is only an algebraic circular MCB candidate; promotion to a stable branch still requires the finite-window return-map certificate, positive Jacobian floors, and energy packet described below.

##### Circular Self-Hit Sign Theorem and Complete-Ledger Measurement

The uniform-circular self-hit geometry supplies a derived sign result. For the full delay half-angle $\xi>0$,
$$
\left|\sin\xi\right|=\frac{\xi}{s},
\qquad
\hat{\mathbf u}_s
=
|\sin\xi|\,\hat{\mathbf e}_r
+
\operatorname{sign}(\sin\xi)\cos\xi\,\hat{\mathbf e}_t
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7637a296378ff6bd)
Every nondegenerate self-hit therefore has a strictly outward radial projection. On the principal branch $\xi\in(0,\pi)$, the tangential projection changes from forward to backward exactly at
$$
\xi=\frac{\pi}{2},
\qquad
s=\frac{\pi}{2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-48fd5d41c94a7b8e)
This is exact on the uniform-circular chart, not a general threshold for non-circular histories. The derivation and falsifiers are given in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#super-field-speed-single-architrino-uniform-circular-self-hit).

The absolute value in the root equation is essential. The first additional self-root pair is born at
$$
\tan\xi_1^\star=\xi_1^\star,
\qquad
s_1^\star
=
\sqrt{1+(\xi_1^\star)^2}
\approx
4.6033388488
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-36d4a8566bb7167a)
not near $7.8$. The next pair is born at $s_2^\star\approx7.7897057675$. At $s=8$, the complete self ledger contains five roots, with full delay angles approximately $319.2409^\circ$, $413.6433^\circ$, $632.7112^\circ$, $859.1794^\circ$, and $911.8419^\circ$. A three-root census at that speed has omitted the alternating-sine pair.

Claim grade: **derived** for the radial sign, principal $\pi/2$ threshold, and pair-birth equations; **measured** for the numerical root and residual values below. The independent analysis instrument is `scripts/equation-mapping/analyze-circular-self-hit-binary.mjs`. It brackets every monotone half-lobe, verifies roots against the direct Euclidean chord condition, and evaluates acceleration from the circular position and velocity vectors.

The principal partner formula reproduces the supplied tangential values through $s=6$, including $0.7083439236$ there, and confirms their positive sign. At $s=10$ the canonical value is $1.1141796596$, not $1.05588$. The principal self value at $s=10$ is $-0.2782507206$, while the sum over all five active self roots is $-0.0902141750$.

On $1<s<20$, the restricted ledger containing the principal partner root and every self root has no tangential zero. Its minimum is approximately $0.2389668633$ in units $\kappa\epsilon^2/R^2$ at $s\approx1.7972747766$. Its radial coefficient changes sign at $s\approx1.8471246228$, not at $\pi/2$; the two values solve different balance equations, so their proximity has no derived significance.

The complete ledger gives the opposite existence verdict because older partner roots cannot be omitted. The measured simple-root zeros are:

| $s$ | Net radial coefficient, outward positive | Algebraic radius $R/R_*$ |
| ---: | ---: | ---: |
| $3.0703566254$ | $-0.8196069638$ | $0.0869416735$ |
| $6.2184549634$ | $-1.2902686401$ | $0.0333668459$ |
| $9.3764360282$ | $-1.8001431321$ | $0.0204753554$ |

At each listed point the complete tangential coefficient is zero to the scan tolerance and the radial coefficient is inward, so the algebraic circular conditions have solutions inside the searched domain. This establishes measured existence on the current unregularized simple-root chart; it does not certify a periodic history. Each older branch descends from a $J=0$ birth and still needs the common finite-event convention, retained root ledger, wake-boundary account, and return-map stability certificate.

The measurement is conditional on the canonical line of action from the transmitter's emission point to the receiver event. A counterfactual inertially extrapolated construction replaces only the acceleration direction by
$$
\hat{\mathbf d}_{\mathrm{ext}}
=
\frac{
\mathbf X_r(T_r)
-
\left[
\mathbf X_t(T_t)+\mathbf V_t(T_t)(T_r-T_t)
\right]
}{
\left\|
\mathbf X_r(T_r)
-
\left[
\mathbf X_t(T_t)+\mathbf V_t(T_t)(T_r-T_t)
\right]
\right\|
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2022ac7e8e371495)
while retaining the actual causal roots, emission-site distance, and canonical transmitter-side acceleration weight. This convention isolates the line-of-action sensitivity without substituting a different wake-density law.

The recomputed complete ledger moves the first three emission-site candidates off both balance conditions:

| Emission-site candidate $s$ | Extrapolated-direction radial coefficient | Extrapolated-direction tangential coefficient |
| ---: | ---: | ---: |
| $3.0703566254$ | $+0.1986630540$ | $-0.3350989817$ |
| $6.2184549634$ | $+0.1969175233$ | $-0.1271086141$ |
| $9.3764360282$ | $+0.1881554019$ | $-0.0742863069$ |

The same counterfactual ledger has tangential zeros near $s=3.2253960989$, $6.2226379612$, and $9.3769260902$, but their radial coefficients are respectively $+0.1357894119$, $+0.1768252822$, and $+0.1802347924$, with outward sign positive. The scan through $1<s<20$ finds six tangential zeros and no simultaneous inward-radial point. Claim grade: **measured counterfactual**, not canonical dynamics. The closed-form extrapolated direction independently checks the vector evaluator, while the causal roots remain checked against the Euclidean chord residual.

The equilibrium gate therefore fails before stability analysis: none of the extrapolated-direction zeros is a circular solution, so a Floquet multiplier or delayed-history spectrum about those rows would have no dynamical referent. This closes the requested counterfactual stability test as an acceleration-balance negative, not as a measured instability.

The autonomous wake-state reduction in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#autonomous-emission-labeled-wake-transport) resolves the regular-domain ontology dependency under the present postulates. A fixed emission-site center with radius growing at absolute speed $c_f$ has the canonical emission-site normal and the canonical $c_f/|D_t|$ weight. Redirecting only the acceleration is not a surface-normal response; moving the emitted center inertially changes absolute propagation speed, causal support, and root weight. The extrapolated calculation therefore remains a sensitivity diagnostic and does not eliminate the canonical emission-site candidates.

The circular result forecloses neither non-circular contraction nor the symmetric logarithmic spiral, multi-architrino braids, or Noether sea embedded configurations. It also does not yet establish the circular MCB: it promotes the current chart from an unanswered algebraic question to a measured candidate family while leaving finite-event persistence and stability open.

---

#### Discrete Azimuth Pattern of Circular Hits

**Context**: Non-translating, uniform circular binary at fixed speed $s$. Receiver "now" at azimuth $\theta = 0$.

The emission points on the circle that can produce hits "now" form a **finite, discrete set** of azimuths determined by the delay equations--**not arbitrary locations**. Because roots are indexed by winding number $m$ and, in the full ledger, sheet sign $\sigma$, multiple hits at the same "now" can occur for different signed windings, but the admissible azimuths remain a finite comb and never fill the circle.

##### Partner Hits

- Minimal angular separation: $\tilde{\delta}_p \in (0, \pi)$.
- The signed causal delays and their allowed windings are those in the **Signed Root Census and Speed Ladder** above.

- **Emission azimuth** at reception:
 $$
 \varphi_p^{\sigma,m}(s) = \pi-\sigma\tilde{\delta}_p^{\sigma,m}(s)
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1bcd94b7531bdac6)

- **Existence thresholds**: each signed sheet is born when its delay equation first becomes tangent; the positive-sheet family has boundary threshold $s=m\pi$, while the negative-sheet family uses the interior minimum displayed above.
- As winding grows, the admissible azimuths approach the diametrically opposite point on their respective signed sheets.
- Partner multi-hit means $M_p(s)>1$: the base partner branch plus one or more older partner roots. These additional roots affect the inward partner-root ledger, but they do not create same-transmitter feedback.

##### Self-Hits

- Minimal angular separation: $\tilde{\delta}_s \in (0, \pi]$.
- The signed causal delays and their allowed windings are those in the **Signed Root Census and Speed Ladder** above.

- **Emission azimuth** at reception:
 $$
 \varphi_s^{\sigma,m}(s) = -\sigma\tilde{\delta}_s^{\sigma,m}(s)
 $$

 [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-74fcfe83066fcbb3)

- **Existence windows**:
 - Principal branch ($m = 0$): exists for every $s>1$, with $\tilde{\delta}_s\to0^+$ as $s\downarrow1$.
 - The first negative sheet enters at $s=\pi/2$ through $\tilde{\delta}_s=\pi$.
 - For older positive sheets with $m \ge 1$, the branch appears only when the self-delay equation develops an interior tangency. The exact threshold $s_m^\star$ is determined in **Counting Self-Hits by Winding Index** above.
 - Within each branch, $\tilde{\delta}_s$ initially enters at a tangency angle and then decreases with $s$, so $\varphi_s$ drifts toward $-\pi$ at high speed.

---

#### Super-Field-Speed Root Ledgers and Resonance Lock

The super-field-speed regime is not merely the same spiral at a larger speed. It changes the root topology of the binary. Once
$$
\|\mathbf V\|>c_f
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-159a10b5ae5d31fe-2)
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{(m,\sigma):\text{self branch }(m,\sigma)\text{ is active at speed }s\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fcd6561e8a6c2301)
$$
M_p(s)
\equiv
\#\{(m,\sigma):\text{partner branch }(m,\sigma)\text{ is active at speed }s\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-521f686be8eefbf0)
The self-ledger
$$
N_s
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a6a99a74942169d4)
tracks outward self-hit channels. The partner-ledger
$$
M_p
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-576a149f2fb73f35)
tracks inward partner-hit channels. Both are integer-valued because a causal root either exists or it does not. As
$$
s
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6eed536a611d6853)
varies, these counts change only at branch birth/death thresholds where a causal delay equation develops a tangency.

A candidate stable super-field-speed bound state therefore cannot be described by a single smooth acceleration curve alone. It must satisfy a finite root-ledger balance:
$$
\sum_{m\in\mathcal{M}_p(s)}
A_{p,m}^{\mathrm{rad}}(R,s)
-
\sum_{m\in\mathcal{M}_s(s)}
A_{s,m}^{\mathrm{rad}}(R,s)
=
\frac{s^2}{R}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-22fc4463538b634d)
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. On a fixed signed branch ledger $b$, the corresponding constant-speed closure target has the form
$$
\left\langle
\sum_{\rho\in b} T_\rho(R,s;\eta)
\right\rangle_{P_b}
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c06daf1549fd17c5)
where the average is taken over one candidate period $P_b$ of the regularized history. The tangential condition remains the hard part: in the same-sheet bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive; in the full signed ledger, negative sheets must be included before any global no-go or closure theorem is claimed.

Equivalently, on a fixed signed ledger $b$, the circular MCB search is the intersection problem
$$
G_{\mathrm{rad}}^{(b)}(R,s)=0,
\qquad
G_{\mathrm{tan}}^{(b)}(R,s)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-333b6fba15075b4f)
where
$$
G_{\mathrm{rad}}^{(b)}(R,s)
\equiv
\sum_{\alpha_p\in b_p}A_{\alpha_p}^{\mathrm{rad}}(R,s)
-
\sum_{\alpha_s\in b_s}A_{\alpha_s}^{\mathrm{rad}}(R,s)
-
\frac{s^2}{R}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9911c5b04660eb1d)
and
$$
G_{\mathrm{tan}}^{(b)}(R,s)
\equiv
\left\langle
\sum_{\alpha\in b}T_\alpha(R,s;\eta)
\right\rangle_{P_b}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-10d46f86a116af12)
with $b_p$ and $b_s$ denoting the partner-hit and self-hit entries inside the signed ledger $b$. The first curve enforces inward/outward radial balance, while the second enforces finite-window tangential closure. In the natural Layer-I units, the search lives in $(R/R_*,s)$, so any intersection is a parameter-free candidate point for that ledger. It is still only an algebraic MCB candidate until the fixed-ledger return map proves stability, positive Jacobian floors, and persistence under perturbation.

This gives a precise, conditional meaning to binary resonance lock. A stable slot would be a region of history space in which the integer pair
$$
(N_s,M_p)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-62b23a38136d33e4)
is fixed, the branch Jacobians stay transversal, and perturbations that approach a root threshold are pushed back into the same ledger rather than escaping to a neighboring one. If such a self-map certificate exists, the discreteness of
$$
N_s
\quad\text{and}\quad
M_p
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8fa572c7b03fcbbb)
would provide a deterministic mechanism for quantized bound-state geometry: allowed radii and frequencies would be selected by integer causal-root ledgers rather than by a continuum of arbitrary circular orbits.

This statement is deliberately conditional. This chapter derives the discrete root ledgers and the radial balance target, but the stability and quantization claims require the missing full-history certificate: finite active branches, positive Jacobian floors, transmitter-side acceleration-weight floors, returned-history closure, and a monodromy or boundary-trapping argument. In practice, that certificate may close first in a collinear breather or Noether braid setting rather than in the bare circular two-body kernel.

##### Branch Stability Target (Hessian Bridge)

The standard equilibrium test in central-force mechanics uses the Hessian of an instantaneous effective potential. If $q_\star$ is an equilibrium, the matrix
$$
H_{ab}(q_\star)=\partial_a\partial_b V_{\mathrm{eff}}(q_\star)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-936d35dcd5f53639)
tests local stiffness in the non-symmetry directions. This is useful as comparison language, but it is not yet a stability proof for an architrino binary because the acceleration law depends on path-history, the active signed causal-root ledger, the transmitter-side acceleration weight, and the branch Jacobian floors.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-stability target is therefore a cycle-averaged stiffness matrix on a fixed branch chart. Let $b$ denote a fixed signed causal-root ledger and let $\mathbf{X}_b(T)$ be a candidate periodic history with period $P_b$. For reduced branch coordinates $y^a$ transverse to time shift, period reparameterization, Euclidean motions, and any phase-locked flat-connection moduli retained by an enclosing assembly chart, define the diagnostic stiffness target
$$
K^{(b)}_{ab}
=
\frac{1}{P_b}\int_0^{P_b}
\left.
\frac{\delta^2 U_{\eta,b}^{\mathrm{hist}}}{\delta y^a\,\delta y^b}
\right|_{\mathbf X_T=\mathbf X_{b,T}}
dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-894223f7794f8693)
where $U_{\eta,b}^{\mathrm{hist}}$ is the action-compatible history potential, or the corresponding diagnostic reconstruction when the regularization has not yet been derived from the delayed action. Negative stiffness in this matrix is a local instability signal; positive stiffness is only a necessary reduced-coordinate check, not a certificate.

The actual branch certificate must be delayed-history and Floquet-style. Let
$$
\mathcal{P}_b:\mathcal{N}_b\subset\mathcal{H}\to\mathcal{H}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4ee26b2542ac95ef)
advance an admissible history by one candidate cycle while the signed causal-root ledger remains fixed. A stable branch requires the return map to stay inside the same branch neighborhood,
$$
\mathcal{P}_b(\mathcal{N}_b)\subset\mathcal{N}_b,
\qquad
\inf_{\phi\in\mathcal{N}_b}|J(\phi)|\ge J_{\min}>0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c04f4f985bc8860c)
and the non-symmetry Floquet multipliers of $D\mathcal{P}_b[\mathbf{X}_b]$ to satisfy
$$
|\mu_\alpha|<1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-92a6df169651777e)
Only that return-map condition would upgrade the Hessian-style stiffness picture into branch stability. If the candidate touches a branch-fold or $J=0$ wall, this smooth Floquet test must be supplemented by the Conley-index isolating-block certificate named above; otherwise the multiplier calculation has evaluated the smooth arcs while missing the grazing transition. Until those certificates are supplied, MCB stability remains a conditional target rather than a completed proof.

##### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

##### Two-Body Closure Packet (Theorem Target)

The practical standard is replayability. A binary branch is not accepted because the picture is circular, compact, or suggestive. It is accepted only when the same finite record supplies the motion, active roots, excluded roots, return map, energy packet, and residuals needed to reproduce the branch under the delayed law.

A nontrivial electrino:positrino binary is promoted only by a replayable finite-$\eta$ packet, not by the circular ansatz alone. For a fixed signed causal-root ledger $b$, the binary closure packet is

$$
\mathfrak{C}_{2\mathrm{B}}^{(\eta)}
=
\left(
b,\mathbf{X}_b,P_b,R_b,s_b,\mathfrak{B}_b,\mathcal{P}_b,\mathcal{E}_b
\right),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4d6d25495c77af1e)

where $\mathbf X_b(T)$ is the two-body history, $P_b$ is its return period, $R_b$ and $s_b$ are the circular benchmark radius and speed when that reduction is valid, $\mathfrak{B}_b$ is the branch chart of active and excluded roots, $\mathcal{P}_b$ is the history-space return map, and $\mathcal{E}_b$ is the constructive energy packet of [Delay-Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md). The packet must report the following residuals before the branch can be used as a closed result.

This chapter owns the normative two-body residual tuple:
$$
\mathsf{Res}_{2\mathrm{B}}^{(\eta)}
=
\left(
\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}},
\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}},
\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}},
\nu_J^{2\mathrm{B}},
\nu_{\mathrm{rec}}^{2\mathrm{B}},
\Delta_{\mathrm{gap}}^{2\mathrm{B}},
\lambda_{\mathrm{sec}}^{2\mathrm{B}},
\epsilon_E^{(\eta)},
\Delta_{\mathrm{E,cross}}^{(\eta)},
\mathcal{R}_{\omega}^{2\mathrm{B}}
\right).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1c4ed318198bb04c)
Simulation recipes consume this tuple by reference; they must not define shorter or reordered variants.

The equation-of-motion residual is

$$
\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}(b,\eta)
=
\frac{1}{P_b}
\int_0^{P_b}
\frac{
\left\|
\frac{d^2\mathbf X_b}{dT^2}(T)
-
\mathcal A_{\eta,b}[\mathbf X_{b,T}]
\right\|
}{
1+\left\|\mathcal A_{\eta,b}[\mathbf X_{b,T}]\right\|
}
\,dT,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-31d98afbd185e844)

where $\mathcal A_{\eta,b}$ is the regularized two-body branch acceleration obtained from the active self and partner records in $b$. The period residual is

$$
\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}(b,\eta)
=
\frac{
\left\|\mathbf{X}_{b,P_b}-\mathbf{X}_{b,0}\right\|_{\mathcal{H}}
}{
\left\|\mathbf{X}_{b,0}\right\|_{\mathcal{H}}+\epsilon_{\mathcal{H}}
},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-28b8761149423402)

with $\mathcal{H}$ the declared history norm and $\epsilon_{\mathcal{H}} > 0$ a fixed normalization floor.

The packet must also report the signed-degree record
$$
\deg_s^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_s}
\operatorname{sign}J_\rho,
\qquad
\deg_p^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_p}
\operatorname{sign}J_\rho,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c8a829ee02417622)
where $b_s$ and $b_p$ are the retained self-hit and partner-hit entries. On a smooth certified window these integers must be constant. If the branch crosses a fold inside the window, the packet must log the corresponding $\Delta N=\pm2,\Delta D=0$ surgery rather than treating the unsigned root counts as conserved data.

The branch-chart admissibility certificate is

$$
\nu_J^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b,\ 0\leq T\leq P_b}
|J_\rho(T)|
>0,
\qquad
\Delta_{\mathrm{gap}}^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b^{\mathrm{off}},\ 0\leq T\leq P_b}
|g_\rho(T)|
>0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-877ef7a82a571b89)

Here $J_\rho$ is the root Jacobian for an active record and $g_\rho$ is the signed gap of a declared inactive record in the finite branch complement $b^{\mathrm{off}}$. The certificate fails if either floor tends to zero under refinement or under the advertised $\eta$-continuation.

The same active records must also certify a nonvanishing lower acceleration-weight margin
$$
\nu_{\mathrm{rec}}^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b,\ 0\leq T\leq P_b}
W_{\rho}^{\mathrm{acc}}(T)
>0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a003897847428110)
Together with $\nu_J^{2\mathrm{B}}>0$, this keeps the canonical transmitter-side acceleration weight inside a finite positive interval on the retained branch chart.

For a circular benchmark the radial and tangential balance residual is

$$
\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}}
=
\frac{
\left|
\left\langle A^{\mathrm{rad}}_{\eta,b}(R_b,s_b)\right\rangle_{P_b}
-s_b^2/R_b
\right|
}{
1+s_b^2/R_b+
\left|\left\langle A^{\mathrm{rad}}_{\eta,b}\right\rangle_{P_b}\right|
}
+
\frac{
\left|
\left\langle A^{\mathrm{tan}}_{\eta,b}
+A^{\mathrm{tan}}_{\partial W}
\right\rangle_{P_b}
\right|
}{
1+\left\langle
|A^{\mathrm{tan}}_{\eta,b}|
+|A^{\mathrm{tan}}_{\partial W}|
\right\rangle_{P_b}
}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2907bc9136459a5f)

The boundary term is not optional bookkeeping: it is required by the constructive finite-window wake-energy account. If it is absent, verification is incomplete and the packet is not advanced; tangential work cannot be hidden in an undefined reservoir.

The stability certificate is a secular Floquet margin in history space,

$$
\lambda_{\mathrm{sec}}^{2\mathrm{B}}(b,\eta)
=
1-\rho\!\left(
D\mathcal{P}_b[\mathbf{X}_b]\big|_{E_\perp}
\right)
>0,
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-747f7330dc2f2b26)

where $E_\perp$ removes the neutral phase and symmetry directions. A numerical orbit without this projected return-map certificate is an existence candidate, not a stable binary certificate.

For a standalone circular binary, the neutral quotient includes the global time phase, the period-reparameterization direction, and Euclidean translations and rotations of the complete history. When the same two-body packet is embedded into a phase-locked rank-three braid or larger assembly chart, a neutral-direction audit is required: a direction may be removed from $E_\perp$ only if it is neutral for the full enclosing chart, not merely for the isolated subsystem. The flat-connection moduli declared by the enclosing chart are physical lock variables unless the full chart proves them neutral. Otherwise a slow drift of relative phase can be hidden as an allowed symmetry even though it breaks the lock.

The energy packet is

$$
\mathcal{E}_b
=
\left(
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b),
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b),
U_{b,\mathrm{work}}^{(\eta)}(T),
U_{\min,b}^{(\eta)}
\right),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-175a787e6ac22ab7)

and must satisfy

$$
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b)\leq \epsilon_E^\star,
\qquad
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b)
\leq \epsilon_{\mathrm{cross}}^\star,
\qquad
E_{\mathrm{wake},b}^{(\eta)}(T)\geq U_{\min,b}^{(\eta)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5ae980f445ac0e3f)

on the same window, branch chart, and regulator used for the motion residuals. The work reconstruction is
$$
U_{b,\mathrm{work}}^{(\eta)}(T)
=
U_b(T_\ast)
-
\int_{T_\ast}^{T}
\sum_i
\mu_{\text{arch}}\,
\mathbf A_{i,b}^{(\eta)}(T')
\cdot
\mathbf V_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c539e6904ab9c89b)
for the quadratic proxy, with $\mu_K(\|\mathbf V_i\|)$ replacing $\mu_{\text{arch}}$ when the primitive kinetic scalar is used. The lower-bound entry applies to the constructed action-level wake charge when that route is available, or to the compatible work reconstruction when that is the declared route. This is the handoff point to the constructive delay-energy chapter: ordinary Noether language is not sufficient until $E_{\mathrm{wake},b}^{(\eta)}$ or its compatible work-integral reconstruction has been constructed for the chosen chart.

Finally, the characteristic frequency is extracted from the return period,

$$
\omega_b=\frac{2\pi}{P_b},
\qquad
\mathcal{R}_{\omega}^{2\mathrm{B}}
=
\frac{\left|2\pi/P_b-s_b/R_b\right|}
{|2\pi/P_b|+|s_b/R_b|+\epsilon_{\omega}},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c7fd891b38fac32d)

when the circular reduction is claimed. For a noncircular branch, $\omega_b=2\pi/P_b$ remains the fundamental return frequency, but the $s_b/R_b$ comparison is inadmissible unless an effective radius and speed have been independently defined. A breather or spiral candidate must instead report its harmonic-extraction rule on the retained history record and compare the extracted fundamental or locked harmonic to $2\pi/P_b$.

The theorem target is therefore:

> If a finite-$\eta$ branch supplies $\mathfrak{C}_{2\mathrm{B}}^{(\eta)}$ with $\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}}$, and $\mathcal{R}_{\omega}^{2\mathrm{B}}$ below declared tolerances, $\nu_J^{2\mathrm{B}}$, $\nu_{\mathrm{rec}}^{2\mathrm{B}}$, and $\Delta_{\mathrm{gap}}^{2\mathrm{B}}$ bounded away from zero, $\lambda_{\mathrm{sec}}^{2\mathrm{B}} > 0$, and the constructive energy residuals closed on the same branch chart, then that branch is a certified local electrino:positrino two-body binary at that finite regulator.

No such finite-$\eta$ packet is supplied in this chapter yet. The status is a theorem target and simulation closure contract, not a closed proof. The $\eta\to0$ limit, the basin measure of the branch, and the later use of the binary as a universal clock or matter standard remain separate obligations.

### State Space and Well-Posedness of the Two-Body Delay System

#### Introduction and Scope

The master equation of motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the architrinos.

We denote the position of the $i$-th architrino as $\mathbf X_i(T) \in \mathbb{R}^3$. We work in the **Euclidean void** with fixed metric $\delta_{ij}$.

---

#### Functional Phase Space

To define the evolution at time $T$, we require knowledge of the trajectory over an interval $[T - \Delta_{\max}, T]$, where $\Delta_{\max}$ is the maximum causal lookback time relevant to the current dynamics.

##### Definition 1 (The History Space)
Let $h > 0$ be a history horizon (sufficiently large to capture all active causal roots). On a smooth simple-root branch, the **smooth history space** $\mathcal{H}_{\mathrm{sm}}$ is the Banach space of continuously differentiable functions mapping the delay interval to the configuration space:
$$
\mathcal{H}_{\mathrm{sm}} = C^1\left([-h, 0]; (\mathbb{R}^3)^N\right).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-eb7232637fc1adee)
For a trajectory $\mathbf X: [-h, \infty) \to (\mathbb{R}^3)^N$, the **state at time $T$**, denoted $\mathbf X_T$, is the element of $\mathcal{H}_{\mathrm{sm}}$ on smooth charts, or of $\mathcal{H}_*$ on caustic-extension charts, given by:
$$
\mathbf X_T(\theta) = \mathbf X(T + \theta), \quad \theta \in [-h, 0]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f157ade25feabdc3)
The norm on the smooth chart is the standard $C^1$ sup-norm: $\|\phi\|_{\mathcal{H}_{\mathrm{sm}}} = \sup_{\theta \in [-h,0]} (\|\phi(\theta)\| + \|\dot{\phi}(\theta)\|)$.

**Remark:** We require $C^1$ rather than $C^0$ because the causal delay $\Delta$ depends on the state. In such systems, the vector field is typically not Lipschitz continuous in the $C^0$ topology, endangering uniqueness.

For caustic-grazing packets this smooth space is not the whole story. The working extension is
$$
\mathcal{H}_*
=
W^{1,\infty}\left([-h,0];(\mathbb{R}^3)^N\right),
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-baba0dacd7bb9adf)
with $C^1$ regularity retained on smooth arcs and finite impulse transitions handled by the finite-$\eta$ kernel before any $\eta\to0$ statement is made. The existence theorem below is a smooth-chart theorem. A branch that crosses a $J=0$ wall must supply a separate impulse lemma or isolating-block continuation certificate showing that the finite-$\eta$ solutions converge in $\mathcal{H}_*$ with bounded velocity and finite total impulse. This makes $\mathcal{H}_*$ the common functional-analytic home for caustic-grazing two-body packets, doubling-frequency middle-carrier caustics, and any later breather packet that relies on finite impulse rather than a globally $C^1$ path.

Below, $\mathcal{H}$ denotes the declared history chart for the packet being tested. Unless a caustic-extension certificate is explicitly named, $\mathcal{H}=\mathcal{H}_{\mathrm{sm}}$.

---

#### The Regularized Interaction Functional

We formalize the acceleration term derived in the master equation.

##### Definition 2 (Causal Constraint Functional)
For a receiver architrino $i$ at reception time $T_r$ and transmitter $j$, the delay $\Delta_{ij}(T_r)$ is implicitly defined by the causal-isochron condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\Delta > 0$ satisfying:
$$
g_{ij}(\Delta, \phi) \equiv \|\phi_i(0) - \phi_j(-\Delta)\| - c_f \Delta = 0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-14f4055b5329f20d)

##### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $\|\mathbf V_j\| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

*Statement:* If $\phi \in \mathcal{H}$ and $\Delta^*$ is a simple root of $g_{ij}(\Delta, \phi) = 0$ (i.e., $\partial_\Delta g_{ij} \neq 0$), then there exists a neighborhood $U \subset \mathcal{H}$ of $\phi$ and a continuously differentiable functional $\Delta: U \to \mathbb{R}^+$ such that $\Delta(\phi) = \Delta^*$.

*Proof.*
Define
$$
g_{ij}(\Delta,\phi)=\|\phi_i(0)-\phi_j(-\Delta)\|-c_f\Delta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8d9a7e52353d7a9d)
Because $\phi\in C^1$, the evaluation maps $\phi\mapsto \phi_i(0)$ and $(\Delta,\phi)\mapsto \phi_j(-\Delta)$ are $C^1$, hence $g_{ij}$ is $C^1$ on $\mathbb{R}^+\times\mathcal{H}$. At a root $(\Delta^*,\phi)$,
$$
\partial_\Delta g_{ij}
=\hat{\mathbf{r}}_{ij}\!\cdot\!\dot{\phi}_j(-\Delta^*)-c_f,
\quad
\hat{\mathbf{r}}_{ij}
\equiv
\frac{\phi_i(0)-\phi_j(-\Delta^*)}{\|\phi_i(0)-\phi_j(-\Delta^*)\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9dad0a59feb16019)
Equivalently, $\partial_\Delta g_{ij}=-D_{t,ij}$ on this root. The simple-root condition is exactly $\partial_\Delta g_{ij}\neq 0$, i.e. no delayed tangency/causal-shock degeneracy. Therefore, by the Banach-space Implicit Function Theorem, there exist a neighborhood $U$ of $\phi$ and a unique $C^1$ map $\Delta:U\to\mathbb{R}^+$ with $g_{ij}(\Delta(\psi),\psi)=0$ and $\Delta(\phi)=\Delta^*$. $\square$

##### Definition 3 (Regularized Acceleration Functional)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\delta_\eta$ (see [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} |q_i q_j| \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \delta_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e3a7f07a7a30e112)
**Crucial Property:** For $\eta > 0$ and smooth $\delta_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

This finite-$\eta$ functional is a certification surrogate until its sharp-limit branch reduction reproduces the canonical transmitter-side acceleration weight. Each retained simple root must carry $W_{ij}^{\mathrm{acc}}=c_f/\lvert D_{t,ij}\rvert$. The same record also carries $D_{r,ij}/D_{t,ij}$ for signed root playback, but that ratio does not multiply the instantaneous acceleration.

On $\mathcal{H}_*$ this same formula is interpreted through the finite-$\eta$ integral first. The admissibility claim is weaker: the packet must show bounded velocity and finite total impulse across the grazing chart before it can pass to the $\eta\to0$ limit.

---

#### Local Well-Posedness

##### Theorem 1 (Local Existence and Uniqueness)
**Assumptions:**
1. $\eta > 0$, and $\delta_\eta$ is $C^1$ with bounded value and bounded derivative.
2. Initial history $\phi^0 \in \mathcal{H}$ is admissible: there exists $d_{\min}>0$ such that all interaction channels used by Definition 3 satisfy
   $$
   \|\phi_i(0)-\phi_j(\theta)\|\ge d_{\min},\qquad \theta\in[-h,0]
   $$

   [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9996ca4c48763e5f)
   on a neighborhood of $\phi^0$.
3. Delay roots used in channel construction are simple (transversal), i.e. no causal-shock degeneracy (Lemma 1).
4. Active branches are uniformly finite on the considered history neighborhood.
5. Couplings and polarity magnitudes are finite.
6. Optional higher-smoothness gluing condition at $T=T_{\mathrm{init}}$ (needed for $C^2$ at the junction, not for $C^1$ well-posedness).

**Statement:** Let $\mathbf Y=(\mathbf X,\mathbf V)$ and write the system in first-order form
$$
\frac{d\mathbf Y}{dT}=\mathcal{G}(\mathbf Y_T),\qquad
\mathbf Y_{T_{\mathrm{init}}}=\phi^0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b2a556fd2efbe164)
Then there exists $\Delta T>0$ and a unique $C^1$ solution on $[T_{\mathrm{init}}-h,T_{\mathrm{init}}+\Delta T)$. Equivalently, there is a unique maximal solution interval
$$
[T_{\mathrm{init}}-h,T_{\max}),\qquad T_{\max}>T_{\mathrm{init}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-31fdd6129fc2f986)
If the optional gluing condition holds, the solution is $C^2$ at $T_{\mathrm{init}}$.

*Proof.*
Define
$$
\mathcal{G}(\phi)=(\phi_v(0),F(\phi))
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-42e5134853c2c76e)
with $F$ from Definition 3.

1. By Assumption 2, every denominator in the interaction kernel is bounded away from zero on the admissible neighborhood; therefore the map
   $$
   (\mathbf{u},\mathbf{w})\mapsto \frac{\mathbf{u}-\mathbf{w}}{\|\mathbf{u}-\mathbf{w}\|^3}
   $$

   [Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-86f76f80fa7dd382)
   is $C^1$ there with bounded derivative.
2. By Assumption 1, composition with $\delta_\eta$ preserves $C^1$ regularity and bounded derivatives.
3. By Lemma 1 and Assumption 3, delay branches (where used) depend $C^1$ on history; thus branch-evaluation maps are locally Lipschitz in $\phi$.
4. Finite sums over channels and integration over finite interval $[-h,0]$ preserve local Lipschitz continuity; hence $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ containing $\phi^0$.
5. Apply the standard Banach-space existence/uniqueness theorem for state-dependent DDEs: a unique local $C^1$ solution exists and extends uniquely to a maximal interval.

Therefore Theorem 1 holds. $\square$

---

#### Global Existence vs. Blow-Up

Unlike Newtonian gravity, global existence is **not guaranteed** simply by avoiding collisions, because the delay equation can harbor "runaway" modes where self-acceleration diverges.

##### Theorem 2 (Continuation Principle)
The solution $\mathbf X(T)$ can be extended as long as the state $\mathbf X_T$ remains within a compact subset of the phase space where causal roots are simple.

##### Definition 4 (Blow-Up Criteria)
The solution ceases to exist at finite time $T^*$ if:
1. **Collision:** $\inf_{i,j} \|\mathbf X_i(T) - \mathbf X_j(T')\| \to 0$ inside the regularization kernel support.
2. **Infinite Speed:** $\sup_i \|\mathbf V_i(T)\| \to \infty$.
3. **Causal Shock:** The derivative of the delay $d\Delta/dT$ diverges because the transmitter-side factor becomes singular. The branch condition is $\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}=c_f$ at emission, not merely $\|\mathbf V_j\|=c_f$.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

Standard conservation laws (energy, momentum, angular momentum) rely on the application of Noether's theorem to local Lagrangian densities. In this delayed setting, the acceleration at absolute time $T$ depends on the phase-space trajectory over the interval $[T-h,T]$.

For an action-derived, symmetry-preserving delayed model, symmetries of the substrate (Euclidean void + absolute time) imply conservation laws, but the conserved quantities are no longer simple functions of the instantaneous state $(\mathbf X, \mathbf V)$. Instead, they are **functionals on the history space** $\mathcal{H}$. For a working regularized kernel not yet derived from an action, the same expressions function as validation diagnostics rather than established Noether charges.

This section derives these functionals, establishes the exact symmetry group of the regularized dynamics ($\eta > 0$), and provides the *a priori* bounds required to ensure physical well-posedness (preventing unphysical runaway acceleration).

---

#### The Global Symmetry Group

We consider the regularized two-body system in the Euclidean void $\mathbb{R}^3$ with metric $\delta_{ij}$ and absolute time $T$.

In this symmetry proof, bare $T$ is intentionally the generic absolute-time parameter transformed by time translation. When one delayed term is read as a causal hit, that evaluation event has reception time $T_r$ and the retained earlier root has emission time $T_t$.

##### Definition (The Fundamental Symmetry Group)
The background substrate and the master equation interaction kernel
$$
\mathbf A_{ij}(T) \propto
\frac{W_{ij}^{\mathrm{acc}}(T;T_t)}
{\|\mathbf X_i(T) - \mathbf X_j(T_t)\|^3}
\left(\mathbf X_i(T) - \mathbf X_j(T_t)\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2fc690245b5bb8d4)
(regularized by $\eta$) respect the group:
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-583b437b0adbc430)
where $E(3) = \mathbb{R}^3 \rtimes O(3)$ is the Euclidean group of spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ denotes time translation.

##### Theorem (Invariance of the Equations of Motion)
Let $\mathbf X(T)$ be a solution to the master equation.
1. **Time Translation:** For any $\Delta T \in \mathbb{R}$, $\mathbf Y(T) = \mathbf X(T + \Delta T)$ is also a solution.
2. **Spatial Isometry:** For any $R \in O(3)$ and $\mathbf b \in \mathbb{R}^3$, $\mathbf Y(T) = R\mathbf X(T) + \mathbf b$ is also a solution.

*Proof.*
For time translation, set $\mathbf Y_i(T)=\mathbf X_i(T+\Delta T)$. If $T_t\in\mathcal{C}_{ij}^X(T+\Delta T)$ for the original solution, then $T_t-\Delta T\in\mathcal{C}_{ij}^Y(T)$ because
$$
\|\mathbf Y_i(T)-\mathbf Y_j(T_t-\Delta T)\|
=\|\mathbf X_i(T+\Delta T)-\mathbf X_j(T_t)\|
=c_f[(T+\Delta T)-T_t]
=c_f[T-(T_t-\Delta T)]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c58e41463f3593a5)
Hence the same branch contributions appear with shifted times, and $\frac{d^2\mathbf Y_i}{dT^2}(T)=\frac{d^2\mathbf X_i}{dT^2}(T+\Delta T)$ satisfies the same acceleration law.

For spatial isometries, set $\mathbf Y_i(T)=R\mathbf X_i(T)+\mathbf b$, $R\in O(3)$. Distances are preserved:
$$
\|\mathbf Y_i(T)-\mathbf Y_j(T_t)\|
=\|R(\mathbf X_i(T)-\mathbf X_j(T_t))\|
=\|\mathbf X_i(T)-\mathbf X_j(T_t)\|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ca2338bae35b3213)
so causal-root times are unchanged. Unit directions transform covariantly: $\hat{\mathbf{r}}_{ij}^Y=R\hat{\mathbf{r}}_{ij}^X$. The dot products defining $D_t$, $D_r$, and $W^{\mathrm{acc}}$ are preserved by the same spatial isometry. Therefore each acceleration term transforms as $\mathbf A_{ij}^Y=R\mathbf A_{ij}^X$, and
$$
\frac{d^2\mathbf Y_i}{dT^2}(T)=R\frac{d^2\mathbf X_i}{dT^2}(T)
=\sum_j\sum_{T_t\in\mathcal{C}_{ij}(T)}
\kappa\sigma_{ij}\frac{|q_iq_j|\,W_{ij}^{\mathrm{acc}}(T;T_t)}
{r_{ij}^2}\,\hat{\mathbf{r}}_{ij}^Y
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-56c453325c784131)
Thus $\mathbf Y$ solves the same equations. $\square$

**Implication:** In an action-derived regularization, these symmetries correspond to exact history-space integrals of motion. Because the interaction is non-local in time, those integrals must account for momentum and energy carried by causal wake surfaces rather than only by the instantaneous mechanical coordinates.

---

#### Conservation of Generalized Momentum

As a standard instantaneous-interaction comparison, equal bookkeeping weights would give $\mu_{\text{arch}}\mathbf A_{12}(T)=-\mu_{\text{arch}}\mathbf A_{21}(T)$. The delayed system does not generally satisfy that equal-time relation: $\mathbf A_{12}(T)$ samples architrino 2 at $T-\Delta_1$, while $\mathbf A_{21}(T)$ samples architrino 1 at $T-\Delta_2$. This comparison does not introduce force as a substrate quantity; the Master Equation remains acceleration-first.

##### Definition (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(T) = \sum_{i} \mu_{\text{arch}} \mathbf V_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-80d5ba33852e8a56)
This is the mechanical momentum of the optional quadratic kinetic proxy. On a general primitive kinetic-scalar chart, each $\mu_{\text{arch}}\mathbf V_i$ is replaced by the declared conjugate momentum $\mathbf p_i=P(\|\mathbf V_i\|)\hat{\mathbf V}_i$, with $P'(s)=K'(s)/s$ as specified in [Energy](../../../../markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino). Neither construction assigns primitive mass to an architrino.

Because of the delay, $\frac{d}{dT}\mathbf{P}_{\text{mech}} \neq 0$ generally.

##### Conservation Target (Total Momentum Functional)
For an action-derived delayed model with translation symmetry, there exists a functional $\mathbf{P}_{\text{wake}}[\mathbf X_T]$ representing the momentum flux encoded in the active causal wake surfaces such that the total momentum:
$$
\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}[\mathbf X_T]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2d7f5b32fa849f58)
is conserved. For working regularized models, this same expression is a validation diagnostic unless the chosen regularization preserves the translation symmetry of the underlying action.

**Explicit Form (Weak Coupling Limit):** For $\eta \to 0$, the wake momentum can be approximated by integrating the acceleration impulse over the delay time:
$$
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{T - \Delta_{ij}(T)}^{T} \mu_{\text{arch}}\mathbf A_{ij}^{\text{emit}}(T') \, dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-09d0270897868038)
*Physical interpretation:* The "missing" momentum is accounted for by the causal wake surfaces currently traversing the space between transmitters and receivers in an action-derived model; otherwise this balance is the momentum diagnostic to verify.

**Corollary (Center of Response Motion):** For an isolated binary, the center of mass $\mathbf X_{\text{cm}}$ need not move at constant velocity in the mechanical coordinates alone. Instead, it can oscillate around a mean trajectory while wake momentum carries the compensating history term. This is the two-body version of the [center-of-response theorem target](../../../../markdown/aaa/dynamics/energy.md#energy-conservation-and-exchange): in an exactly symmetric circular binary, the exposed-energy response center $\mathbf{X}_{\mathrm{resp}}$ is pinned to the circle center by symmetry, while the particle-only mechanical center can still show finite-window oscillatory bookkeeping if wake momentum is not included. A runaway center-of-mass self-acceleration is forbidden only in an action-derived model whose regularization preserves translation symmetry; in working regularized models this is a conservation diagnostic to be checked.

---

#### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions.

##### Definition (The History Hamiltonian)
For an action-derived delayed model with time-translation symmetry, the target conserved quantity $\mathcal{H}$ is a history functional. For state-dependent delays, the useful comparison object is a **Lyapunov-Krasovskii-style functional**:
$$
\mathcal{H}(\mathbf X_T) = K(T) + \mathcal{U}_{\text{history}}(\mathbf X_T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b85f9571774650f8)

1. **Kinetic Energy:** $K(T) = \sum \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2$.
2. **Potential Functional:** $\mathcal{U}_{\text{history}}$ accumulates the assembly-level work bookkeeping from the delayed acceleration contributions. Unlike an instantaneous potential $V(r)$, this depends on the configuration of all active wake surfaces.

##### Trajectory Identity (Energy Balance)
$$
\frac{dK}{dT} = \sum_{i} \mu_{\text{arch}}\mathbf V_i(T) \cdot \mathbf A_i(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9a8dc6555582a60f)
We define the **Interaction Potential Functional** $\mathcal{W}(T)$ such that:
$$
\mathcal{W}(T) = -\int_{T_{\mathrm{init}}}^T \sum_i \mu_{\text{arch}}\mathbf V_i(T') \cdot \mathbf A_i(T') \, dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-baaa1f0c2124b785)
This functional is nonlocal in time: it accumulates deferred work along the path-history of wakes and is not an instantaneous potential $U(r)$. Then, by construction along the realized trajectory, $\mathcal{E}_{\text{tot}} = K(T) + \mathcal{W}(T)$ is constant. It is an exact Noether charge only when $\mathcal{W}$ is the boundary term of the same symmetry-preserving delayed action; otherwise it is a diagnostic reconstruction.

That distinction is decisive for the circular tangential channel. A $\mathcal W$ obtained by integrating the same $\mathbf A\cdot\mathbf V$ record cannot test whether the record contains persistent forward tangential acceleration; it assigns the opposite change to $\mathcal W$ by definition. Independent circular energy closure requires the action-derived boundary charge or a separately derived finite-window wake account.

##### Lemma (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the per-hit acceleration is bounded: $\|\mathbf A_{ij}\| \le A_{\max}(\eta)$. **Statement:** For a bound system (architrinos confined to a finite volume $V$), the magnitude of the assembly-level work rate is bounded by $N\mu_{\text{arch}}A_{\max}V_{\max}$.

##### Conditional Target (No-Runaway Criterion)
This criterion is not a completed theorem until the same symmetry-preserving regularized action supplies $\mathcal{W}$ on the retained branch chart and a lower bound is proven for that branch. Under those hypotheses, in an action-derived master-equation branch with fixed $\eta>0$, an isolated binary cannot undergo runaway acceleration ($\|\mathbf V\| \to \infty$) *unless* the action-compatible potential energy functional $\mathcal{W}(T)$ diverges to $-\infty$.

*Proof Logic:* Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(T) = \mathcal{E}_{\text{tot}} - \mathcal{W}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bc09cddcdde16f33)
For $K(T)$ to diverge, $\mathcal{W}(T)$ must decrease without bound.
1. **Partner attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy in the standard Kepler singularity pattern; in this architecture, self-hit is the proposed counter-channel.
2. **Self-hit repulsion:** $q_1 q_1 > 0$. The acceleration is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If an architrino is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial bound:** The deferred work encoded in a self-wake is finite when the emitted causal-wake budget is finite. An architrino cannot extract infinite energy from its own past unless the history functional has already assigned an infinite budget to that causal wake.

**Conclusion:** A self-acceleration runaway, where an architrino accelerates itself indefinitely using self-acceleration contributions, is excluded only on branches satisfying the action-derived conservation and lower-bound hypotheses. In other working models, the same statement is a validation target: the system can oscillate or settle, but an apparent explosion to $\|\mathbf V\|=\infty$ must be traced either to singular collapse, transversality loss, or a broken conservation diagnostic.

### Summary

The circular atlas establishes exact delay equations, signed-sheet root thresholds, and canonically weighted radial and tangential coefficients. The principal partner branch cannot form a particle-only constant-speed circle because its tangential acceleration is positive. The complete unregularized canonical simple-root ledger does contain algebraic radial/tangential balance points, so the circular ansatz is not excluded at that level. Redirecting the acceleration toward an inertially extrapolated emission site removes those candidates and supplies no replacement equilibrium on $1<s<20$, but the autonomous fixed-speed wake state rejects that construction as the local response of the present causal surfaces. A maximum-curvature binary remains conditional: the canonical candidates must survive one finite singular-event convention, retained-history transport, wake-boundary exchange, return-map stability, Jacobian floors, and the action-derived conservation charges on one retained history record.

## Causal Action Functional

This chapter explains how action-like scalar summaries are allowed to enter delayed dynamics with transmitter-side acceleration weight. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) remains the vector law. The causal action functional is a branch statistic used to compare retained histories, estimate barriers, and feed stability or mass-response tests without replacing the line-of-action acceleration.

The central warning is simple: a scalar action value is valid only on the same retained branch record that supplies the causal roots, transmitter-side factor, receiver-side factor, and transmitter-side acceleration weight. Otherwise the statistic has lost the causal information that made the branch physical.

### Problem Statement and Goal

This chapter gives the action-functional side of the canonical transmitter-side Master EOM. Its job is not to preserve a separate scalar law. Its job is to define which retained branch records may be used for action, stability, mass-response, and transition-cost calculations after the branch has been rebuilt with transmitter-side acceleration weight.

The active branch strength is
$$
W_{ij}^{\mathrm{acc}}(T_r;T_t)
=
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-590fe06025cd1656)
with
$$
D_{t,ij}
=
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}(T_r;T_t),
\qquad
D_{r,ij}
=
c_f-\mathbf V_i(T_r)\cdot\hat{\mathbf r}_{ij}(T_r;T_t).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8a6251085e86126c)

Plain language: a retained hit must say how densely the transmitter laid down the arriving wake surface. The receiver-side quantity is recorded separately through the signed playback derivative $D_r/D_t$.

A branch record that contains $D_t$ but omits $D_r$ can still define the instantaneous acceleration weight, but it cannot certify root continuation through reception time. Action, power, wake-history, mass-response, and conservation claims must state whether they consume transmitter-side acceleration, signed root playback, or both; they may not multiply the two by default.

### Core Functional Definitions

On a retained chart $\mathfrak B$ with active causal roots $T_t\in\mathcal C_{ij}(T_r)$, the receiver-side scalar branch statistic over a native-time window $T_{\mathrm{win}}$ is
$$
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B]
=
\frac{1}{T_{\mathrm{win}}}
\int_0^{T_{\mathrm{win}}}
\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)}
{r_{ij}^2(T_r;T_t)+\epsilon_c^2}
\,dT.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1dd1374a989fc66f)

This statistic is sign-blind and coupling-normalized: it suppresses $\kappa$, $|q_iq_j|$, and the polarity sign $\sigma_{ij}=\mathrm{sign}(q_iq_j)$. Attractive and repulsive records therefore add by received magnitude rather than canceling by direction. After the native-time average, $\bar{\mathcal A}_{\mathrm{rec}}$ has inverse-area units; it is action-like only in the sense that it accumulates receiver-side branch-magnitude density on the retained causal record. It is not automatically the exact Fokker-type variational action, whose causal kernel is tested separately in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-causal-delay-fokker-type-interaction-term).

Plain language: this number asks how much same-record causal-hit magnitude a branch carries over the window after signs, coupling scale, and push direction have been stripped off.

This is a scalar statistic, not the vector Master EOM itself. It keeps the same causal roots and transmitter-side acceleration weight while discarding the line-of-action direction. Its use is limited:

1. compare candidate branch classes,
2. define transition-cost and barrier targets,
3. supply scalar records for later mass or medium-response tests,
4. hand candidates back to the Master EOM for vector acceleration and conservation checks.

The exact vector acceleration/action consumer must use
$$
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}^2}
\hat{\mathbf r}_{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1c3f87e44bcd0f9a)
on the same retained branch record. A scalar extremum of $\bar{\mathcal A}_{\mathrm{rec}}$ is therefore only a candidate branch label until the vector residuals close.

### Geometric/Topological Framework

The causal root locus is defined by
$$
g_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40b63d537ff1ba90)

Plain language: the root condition says that a wake emitted by transmitter $j$ at $T_t$ reaches receiver $i$ exactly at reception time $T_r$.

On a simple retained root, $D_t\ne0$ supplies the local inverse-function condition. A retained record is the branch-local data packet that binds the root, transmitter identity, receiver identity, regulator state, and acceleration/action entries to one history chart. A retained box is an interval or chart neighborhood that encloses those entries together; outward-rounded intervals have endpoints rounded away from the computed value so the true entry remains enclosed. The branch label persists as long as the same retained record keeps:

| Row | Required status |
| --- | --- |
| root residual | zero on the retained box |
| transmitter-side factor | bounded away from zero except declared caustic routing |
| receiver-side factor | present on the same retained record |
| transmitter-side acceleration weight | outward-rounded $W^{\mathrm{acc}}$ interval |
| inactive gaps | positive on the retained complement |
| finite memory | declared finite horizon |
| regulator state | declared $\eta$ and $\epsilon_c$ limits or finite values |

Branch labels may change only at declared boundaries: a root enters or leaves the memory window, an inactive gap closes, $D_t$ reaches a caustic boundary, a collision regulator is invoked, or the retained records no longer occupy the same box.

### Causal Writhe and Topological Use

Topological quantities such as causal writhe remain admissible only as branch geometry:
$$
Wr_c(\mathfrak B)
=
\sum_{\alpha,\beta}
\operatorname{sgn}(\alpha,\beta)\,
\chi_{\mathrm{causal}}(\alpha,\beta).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d01dac9d72a83d7d)

This notation records signed causal-locus crossings or linkages in the retained record. Here $\alpha$ and $\beta$ index oriented retained causal-locus strands or strand segments in the declared projection. The indicator $\chi_{\mathrm{causal}}(\alpha,\beta)$ equals $1$ only when the two strands form an admissible crossing or linkage event on the same retained record, and equals $0$ otherwise. The sign $\operatorname{sgn}(\alpha,\beta)$ is the orientation sign of the ordered strand pair relative to the declared branch framing; it is not defined at a fold, framing slip, or unresolved collision record.

$Wr_c$ is therefore a causal-locus crossing statistic, not a replacement for the canonical framed-topology records such as $Lk=\operatorname{Wr}+\operatorname{Tw}$ in [Constructing the Absolute Frame](../../../../markdown/aaa/foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality) and [Architrino](../../../../markdown/aaa/foundations/architrino.md#provenance-and-persistence). It does not supply acceleration strength. Any use of $Wr_c$ in spin, chirality, confinement, or horizon-interface arguments must also state the branch record on which $D_t$, $D_r$, and $W^{\mathrm{acc}}$ are available.

### Circular Benchmark (Branch-Count Theorem)

The circular branch-count benchmark is topology only. Circular self-hit births, Jacobian-null thresholds, and inactive-gap ledgers may classify causal-root structure, but they do not imply a circular no-go, acceleration-balance result, action minimum, or mass scale.

The theorem spine is the circular no-proliferation result already used by the delayed dynamics stack. In the symmetric circular benchmark, write
$$
\beta_f(T)=\frac{\omega(T)R(T)}{c_f}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dbf48509e929cd9b)
If $|\beta_f(T)|\le\beta_{\max}<\infty$ uniformly, then the active circular self-hit count is uniformly bounded:
$$
N_{\mathrm{self}}(T)
\le
\frac{\beta_{\max}}{\pi}+C_{\mathrm{circ}},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a320e7a66f6e837c)
where $C_{\mathrm{circ}}$ is an absolute endpoint-count constant for the circular root equation. On a one-sign subchart this has the sharper asymptotic form
$$
N_{\mathrm{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2376285d1dd4b77c)
The branch births occur at tangencies of the circular root equation, so the root census, Jacobian-null thresholds, and inactive-gap changes are one topological ledger. On the non-translating circular chart, $D_r=D_t$, so the playback ratio is one. The acceleration weight is instead $W^{\mathrm{acc}}=c_f/|D_t|=1/|J|$ in normalized units and is not generally one. The branch-count theorem therefore uses the root structure and does not certify acceleration balance, action closure, or stability. The detailed circular derivations are in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and the winding-index census in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#root-multiplicity-vs-speed).

A current circular benchmark must emit:

| Evidence record | Required content |
| --- | --- |
| retained roots | partner/self labels and windows |
| $D_t$ | nonzero denominator floor or declared caustic route |
| $D_r$ | receiver-side factor interval |
| $W^{\mathrm{acc}}$ | same-record branch strength interval |
| vector residual | radial and tangential Master EOM residuals |
| scalar statistic | $\bar{\mathcal A}_{\mathrm{rec}}$ on the same record |
| negative control | Not advanced disposition: verification is incomplete when $D_r$ is absent and failed when $D_r$ is mismatched |

Until those records exist, circular material is not evidence for action closure.

### Branch Barrier and Transition Cost

For a path $\Gamma:\lambda\mapsto\mathfrak B_\lambda$ of retained charts with endpoints $\mathfrak B_{\lambda_0}$ and $\mathfrak B_{\lambda_1}$, define the candidate receiver-side barrier by the reparametrization-invariant saddle height
$$
B_{\mathrm{rec}}(\lambda_0,\lambda_1)
=
\inf_{\Gamma:\mathfrak B_{\lambda_0}\to\mathfrak B_{\lambda_1}}
\sup_{\lambda\in[\lambda_0,\lambda_1]}
\left[
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_\lambda]
-
\max\!\left(
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_{\lambda_0}],
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_{\lambda_1}]
\right)
\right]_+
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7f3f13319fb1edf1)

This is a transition-cost target, not a proof of stability. A promoted barrier must state the retained branch path, the root identity across the path, the regulator state, and the same-record transmitter-side acceleration-weight records. If a later certificate uses an integral barrier instead, the promoted record must also declare the path measure, for example arclength in a stated metric on chart space.

### Reduced Branch-Certificate Targets

A branch certificate that consumes this chapter must report:

| Certificate entry | Required content |
| --- | --- |
| branch identity | retained roots, inactive gaps, finite memory |
| transmitter-side acceleration weight | $D_t$, $D_r$, and $W^{\mathrm{acc}}$ enclosed on the same retained box |
| scalar stationarity | first-variation or discrete comparison record for $\bar{\mathcal A}_{\mathrm{rec}}$ |
| vector consistency | Master EOM residual on the same retained record |
| Noether pullback | energy, momentum, and angular-momentum wake-history records from the same action or realized-trajectory record; see [Energy](../../../../markdown/aaa/dynamics/energy.md#energy-conservation-and-exchange) and [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#accepted-construction-routes) |
| negative controls | rejection of missing, mismatched, or incomplete records |

The branch certificate is not promoted if any of those entries are supplied by different root boxes, different regulator states, or different history records.

### Summary and Status

The current action-functional program is a receiver-side rebuild target. It keeps causal-root topology, branch labels, caustic routing, and scalar comparison targets, but action evidence requires complete transmitter-side branch records. The next useful mathematical artifact is one retained branch packet that binds root topology, $D_t$, $D_r$, $W^{\mathrm{acc}}$, vector residuals, scalar statistic, Noether pullback, and negative controls required before advancement on the same record.

## Effective Lagrangian

This chapter asks whether the delayed Master EOM can be recovered from an action principle. In ordinary mechanics, a Lagrangian is useful because varying one scalar history functional gives the equations of motion. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the target is harder: the functional must remember delayed causal roots, transmitter identities, boundary terms, and transmitter-side acceleration weight.

The validity condition is simple. Any variational scaffold in this chapter that does not produce transmitter-side acceleration weight is invalid as closure evidence. The current target is to vary a path-history functional whose branch-reduced acceleration law carries $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on the same retained roots as the Master EOM. Transmitter-side factors remain transversality diagnostics until paired with the receiver-side factor and checked by the stated residuals.

Variational proof work therefore begins from this canonical receiver-side target. No prior action stationarity, energy balance, or Noether wake-history verdict is inherited unless the same derivation reproduces the receiver-side branch law on the retained record.

The bridge is deliberately conditional. The Master EOM remains the primary dynamics at the substrate level; an action or Lagrangian chart becomes theorem-grade only after its variation, boundary, and conservation residuals close on the retained branch chart. Until then, the effective Lagrangian is a disciplined inference device rather than an independent ontology.

#### Ordinary Lagrangian Orientation

In a standard comparison form for ordinary local mechanics, one chooses generalized coordinates $q_{\mathrm{std}}^a(t_{\mathrm{std}})$ and writes a Lagrangian $L_{\mathrm{std}}(q_{\mathrm{std}},dq_{\mathrm{std}}/dt_{\mathrm{std}},t_{\mathrm{std}})$, often in the simple form
$$
L_{\mathrm{std}} = K - V
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-87d3a21a45134235)
where $K$ is kinetic energy and $V$ is potential energy. The corresponding action is
$$
S_{\mathrm{std}}[q_{\mathrm{std}}]=\int_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}L_{\mathrm{std}}\!\left(q_{\mathrm{std}},\frac{dq_{\mathrm{std}}}{dt_{\mathrm{std}}},t_{\mathrm{std}}\right)\,dt_{\mathrm{std}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-34b0c8d6f27f9862)
and fixed-endpoint stationarity,
$$
\delta S_{\mathrm{std}}=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c6139ede77af1ab2)
gives the Euler-Lagrange equation
$$
\frac{d}{dt_{\mathrm{std}}}\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})}
-
\frac{\partial L_{\mathrm{std}}}{\partial q_{\mathrm{std}}^a}
=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d885015918a12c61)
for each coordinate $q_{\mathrm{std}}^a$. This equation is not a separate force postulate. It is the recovery condition that the chosen scalar $L_{\mathrm{std}}$ must satisfy if the action is to generate the equations of motion.

Operationally, stationarity is tested by nearby trial paths $q_{\mathrm{std},\epsilon}^a(t_{\mathrm{std}})=q_{\mathrm{std}}^a(t_{\mathrm{std}})+\epsilon\xi^a(t_{\mathrm{std}})$ with $\xi^a(t_{\mathrm{std},a})=\xi^a(t_{\mathrm{std},b})=0$. Because $\xi^a$ is otherwise arbitrary, setting the first variation of $S_{\mathrm{std}}$ to zero forces the Euler-Lagrange expression itself to vanish. The action is therefore a history functional with units of energy times time, not an instruction to minimize instantaneous energy.

A minimal recovery check is the one-dimensional harmonic oscillator. In the standard comparison form, for a mass $m$ attached to an ideal spring of stiffness $k$ with displacement $x_{\mathrm{std}}(t_{\mathrm{std}})$,
$$
L_{\mathrm{std}}\!\left(x_{\mathrm{std}},\frac{dx_{\mathrm{std}}}{dt_{\mathrm{std}}}\right)
=
\frac{1}{2}m\left(\frac{dx_{\mathrm{std}}}{dt_{\mathrm{std}}}\right)^2-\frac{1}{2}kx_{\mathrm{std}}^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f73274cc845a9a02)
so the Euler-Lagrange equation gives
$$
\frac{d}{dt_{\mathrm{std}}}\left(m\frac{dx_{\mathrm{std}}}{dt_{\mathrm{std}}}\right)-(-kx_{\mathrm{std}})=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-96b5c507dc3ce54f)
or equivalently
$$
m\frac{d^2x_{\mathrm{std}}}{dt_{\mathrm{std}}^2}=-kx_{\mathrm{std}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-dd9f79c7c52bcad6)
which is the same equation obtained from Newton's law and Hooke's law. The value of the example is not that Lagrangian mechanics replaces the tested motion, but that it recovers the same equation from an energy scalar and generalizes cleanly to many coordinates.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ correction to this toy example is more informative than the recovery itself. A real assembly-level spring is a delayed restoring channel, so the first effective model is not exactly $m_{\mathrm{eff}}d^2x_{\mathrm{eff}}/dt_{\mathrm{eff}}^2=-k_{\mathrm{eff}}x_{\mathrm{eff}}$ but

$$
m_{\mathrm{eff}}\frac{d^2x_{\mathrm{eff}}}{dt_{\mathrm{eff}}^2}(t_{\mathrm{eff}})
=
-k_{\mathrm{eff}}\,x_{\mathrm{eff}}(t_{\mathrm{eff}}-\Delta_{\mathrm{eff}})
+\cdots
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b343e799bfe0b84)

for an effective causal-wake delay $\Delta_{\mathrm{eff}}$ across the assembly. Expanding the delayed displacement gives

$$
\left(
m_{\mathrm{eff}}+\frac{1}{2}k_{\mathrm{eff}}\Delta_{\mathrm{eff}}^2
\right)
\frac{d^2x_{\mathrm{eff}}}{dt_{\mathrm{eff}}^2}
-
k_{\mathrm{eff}}\Delta_{\mathrm{eff}}\frac{dx_{\mathrm{eff}}}{dt_{\mathrm{eff}}}
+
k_{\mathrm{eff}}x_{\mathrm{eff}}
=
O\!\left(k_{\mathrm{eff}}\Delta_{\mathrm{eff}}^3\frac{d^3x_{\mathrm{eff}}}{dt_{\mathrm{eff}}^3}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5ac5ba28c095b6b8)

on a slowly varying branch. The leading correction is therefore sign-definite once the branch delay orientation is fixed. For the causal restoring convention displayed above it is anti-damping, an analogous local pattern to the one that appears as positive tangential work in the circular binary. The mass-like coefficient is also shifted by the delayed response. This does not prove the full assembly mass map, but it shows in the simplest chart why inertia and dissipation-like terms are delayed-response quantities rather than primitive architrino constants.

The two displayed corrections are not independent parameters. They are the first even and odd moments of the same delayed restoring channel:

$$
m_{\mathrm{delay}}
\sim
\frac{1}{2}k_{\mathrm{eff}}\Delta_{\mathrm{eff}}^2,
\qquad
\Gamma_{\mathrm{delay}}
\sim
k_{\mathrm{eff}}\Delta_{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7ee267c26da2a4e8)

where $m_{\mathrm{delay}}$ denotes the mass-like shift and $\Gamma_{\mathrm{delay}}$ denotes the signed anti-damping coefficient for this convention. On a fixed branch, their ratio is a kernel-shape consequence of the same causal-wake delay, not two fitted material constants. This toy calculation is the finite-dimensional seed of the continuum statement below: even-frequency kernel moments feed inertia-like response, while odd-frequency moments feed dissipation or anti-damping channels.

Historically, the route into this form matters. Newtonian force balance can be projected along fixed-endpoint variations as virtual work. For conservative interactions, $\mathbf{F}=-\nabla V$ turns the work term into a variation of potential energy, while the inertial term supplies a variation of kinetic energy plus an endpoint term. When the endpoint variation vanishes, Hamilton's construction turns that differential relation into the stationary action of $K-V$. The useful condition is therefore stationarity of the action, not a literal minimum in every case.

The same idea survives in $\mathbb{A}\mathbb{A}\mathbb{A}$ only after changing the object being varied. The Master EOM is not local in the instantaneous native variables $(\mathbf X_i(T),\mathbf V_i(T))$: receiver acceleration depends on delayed transmitter coordinates, causal-root branches, transmitter-side acceleration weights, and the retained causal-wake history. A local expression $L(\mathbf X,\mathbf V,T)$ therefore cannot be the substrate-level action for the exact law. The appropriate candidate is a multi-time path-history functional whose variation must reproduce the delayed receiver-side branch law.

The operational bridge is:

1. ordinary mechanics uses $L_{\mathrm{std}}(q_{\mathrm{std}},dq_{\mathrm{std}}/dt_{\mathrm{std}},t_{\mathrm{std}})$ and tests $\delta S_{\mathrm{std}}=0$;
2. $\mathbb{A}\mathbb{A}\mathbb{A}$ uses a regularized delayed action $S_\eta[\{\mathbf X_i\}]$ over path history;
3. the action is promoted only if its variation yields the Master EOM on the retained branch chart;
4. failure is measured by the variation residual $\mathbf{R}_i^{(\eta)}(T)$ and the window diagnostic $\epsilon_{\mathrm{var}}^{(\eta)}(W)$ defined below.

Thus the Lagrangian question in $\mathbb{A}\mathbb{A}\mathbb{A}$ is not whether one can write a familiar-looking $T-V$ expression. The question is whether a delayed action with the same causal-root, transmitter-side factor, transmitter-side acceleration-weight, boundary, and wake-history conventions as the Master EOM has a stationary variation whose residual closes. Only then do Noether-style energy, momentum, and angular-momentum statements become theorem-grade rather than diagnostic.

#### Ordinary Hamiltonian Orientation

Hamiltonian mechanics repackages the same standard comparison dynamics into coordinates and canonical momenta. Starting from a local Lagrangian $L_{\mathrm{std}}(q_{\mathrm{std}},dq_{\mathrm{std}}/dt_{\mathrm{std}},t_{\mathrm{std}})$, define the canonical momentum
$$
p_a\equiv\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-08dbb70e53657502)
and, when the velocity-momentum map can be inverted, define the Hamiltonian by the Legendre transform
$$
H_{\mathrm{std}}(q_{\mathrm{std}},p,t_{\mathrm{std}})=p_a\frac{dq_{\mathrm{std}}^a}{dt_{\mathrm{std}}}-L_{\mathrm{std}}\!\left(q_{\mathrm{std}},\frac{dq_{\mathrm{std}}}{dt_{\mathrm{std}}},t_{\mathrm{std}}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b129e45a1f0edf36)
with the velocities rewritten in terms of $(q_{\mathrm{std}},p,t_{\mathrm{std}})$. Hamilton's equations are
$$
\frac{dq_{\mathrm{std}}^a}{dt_{\mathrm{std}}}=\frac{\partial H_{\mathrm{std}}}{\partial p_a},
\qquad
\frac{dp_a}{dt_{\mathrm{std}}}=-\frac{\partial H_{\mathrm{std}}}{\partial q_{\mathrm{std}}^a}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8dd2f4e54fcdbbd3)
so one second-order equation in $q_{\mathrm{std}}^a$ becomes a first-order flow on phase space $(q_{\mathrm{std}}^a,p_a)$. In simple time-independent mechanical systems $H_{\mathrm{std}}$ is often the total energy $K+V$, but the defining statement is the Legendre transform and the canonical flow, not the energy slogan by itself.

The same equations can also be read from the phase-space action
$$
S_H[q_{\mathrm{std}},p]=\int_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}\left(p_a\frac{dq_{\mathrm{std}}^a}{dt_{\mathrm{std}}}-H_{\mathrm{std}}(q_{\mathrm{std}},p,t_{\mathrm{std}})\right)dt_{\mathrm{std}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-eb1d4529cd8f5d09)
when variations in both $q_{\mathrm{std}}^a$ and $p_a$ are admitted and endpoint variations of $q_{\mathrm{std}}^a$ vanish. Variation with respect to $p_a$ gives $dq_{\mathrm{std}}^a/dt_{\mathrm{std}}=\partial H_{\mathrm{std}}/\partial p_a$, while variation with respect to $q_{\mathrm{std}}^a$ gives $dp_a/dt_{\mathrm{std}}=-\partial H_{\mathrm{std}}/\partial q_{\mathrm{std}}^a$. This is the action-level form of the canonical flow, and it is the part that matters when asking whether a reduced $\mathbb{A}\mathbb{A}\mathbb{A}$ chart is genuinely Hamiltonian rather than only an energy-like fit.

The conjugate momenta are more than bookkeeping in ordinary mechanics. When a coordinate is cyclic, the corresponding conjugate momentum is conserved; the same coordinate-momentum pairing later becomes the classical object used in Bohr-Sommerfeld action integrals and in canonical commutation rules. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these are recovery targets for a reduced effective chart, not permission to quantize the substrate variables directly.

This matters for $\mathbb{A}\mathbb{A}\mathbb{A}$ because the exact Master EOM is a delayed path-history law, not an ordinary finite-dimensional phase-space law. The instantaneous pair $(\mathbf X_i(T),\mathbf P_i(T))$ does not contain all active causal-root, boundary, and wake-history data. A Hamiltonian chart is therefore an effective reduction: it is admissible only when a coarse-graining compresses the retained path history into coordinates and momenta while preserving the comparison invariants. The test is not merely that an expression called $H_{\text{eff}}$ can be written, but that the induced return map preserves the relevant measure, symplectic form, or Poisson-bracket structure to the declared tolerance.

Canonical transformations sharpen the same test. In ordinary Hamiltonian mechanics, a change from $(q,p)$ to $(Q,P)$ is not automatically an equivalent mechanics; it is canonical only when the new variables preserve Hamilton's equation form, equivalently the symplectic form or Poisson brackets on the admitted phase-space functions. Generating functions are useful because they construct such transformations and can expose cyclic coordinates, conserved momenta, action-angle variables, or Hamilton-Jacobi constants. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this remains an effective-chart claim: a reduced chart may be transformed for calculation only while the same branch record keeps the canonical-chart, bracket, or symplectic residual controlled. Otherwise the transformation is a coordinate fit that has lost causal-wake history, not a bridge to operator recovery.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the strongest phase-space use case is therefore not an arbitrary instantaneous snapshot. It is a replayable or phase-locked branch chart: a reduced description in which the retained internal motion returns to a comparable section despite bounded surrounding influences. If a retained assembly is modeled by coarse coordinates $Q^A$ and by phase-bearing sub-assemblies indexed by $\alpha=1,\ldots,N_{\mathrm{ph}}$, the candidate chart has the form
$$
z_{\mathfrak B}=(Q^A,\Pi_A,\theta^\alpha,I_\alpha)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7c787d8a7da2b0a9)
where $\theta^\alpha$ records the sub-assembly phase and $I_\alpha$ is the conjugate action variable for that phase. Each retained phase-locked sub-assembly adds its own phase-action pair. Surrounding influences are admissible only when they are represented as fixed branch data, slow parameters, or additional coordinates over the comparison window; otherwise the chart is a driven open system rather than a closed Hamiltonian phase space.

On a single periodic channel, the action variable is not an arbitrary label once the chart is required to be canonical and the angle is required to advance uniformly. With the local $2\pi$ convention, the reduced action is the closed-cycle integral of the canonical one-form,
$$
I_\alpha
=
\frac{1}{2\pi}
\oint_{\gamma_\alpha}\Pi\,dQ
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-23ef1ea9c1ab82a4)
and the frequency readout is
$$
\omega_\alpha
=
\frac{\partial H_{\mathrm{eff}}}{\partial I_\alpha}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9700d8bcef28fc29)
on that reduced chart. The value of this comparison is methodological: a replayable branch can expose frequency and harmonic content before the full path-history solution is written, but only if the same causal-root ledger and retained branch record make the closed-cycle integral and canonical residual stable.

The action variables are local objects unless the phase torus is globally unobstructed. For a three-binary Family-A chart, the indexed phase circles need not form a trivial $T^3$ bundle over the retained branch family. Choose any declared ordering $(a,b,c)$ of the persistent binary indices. A retained return cycle of binary $a$ can carry a phase-entry degree pair rather than a single scalar winding. With $\rho_a:S^1_a\to\mathfrak B$ denoting that return cycle,

$$
c_1[\theta^a,\theta^b,\theta^c]
=
\left(
\operatorname{deg}(\theta^b\circ\rho_a),\,
\operatorname{deg}(\theta^c\circ\rho_a)
\right)
=(m,n)
\in\mathbb{Z}^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a0bfe0d7c31089ab)

when the relative phase connection closes on the branch. This is the topological content of integer resonance lock: the lock ratios $(m,n)$ in [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md) make the phase-entry data integral rather than irrationally drifting. The symbol $c_1$ is retained as the established phase-entry notation, but here it means return-map degree data, not a scalar curvature integral. The effective Hamiltonian chart is therefore globally promotable only on resonance-locked branches where the returned phase torus and causal-root ledger close together. Off-lock, the same $I_\alpha$ may exist on a local patch but acquires monodromy under return, so quantization and measure preservation become local fitting statements rather than global chart facts.

More precisely, the action variables $I_\alpha$ are sections of a flat action bundle over the retained branch family. They are globally defined only when the return holonomy is trivial on the admitted observables; equivalently, the phase-return degree pair closes by integer multiples of $2\pi$ on the same causal-root ledger. A Bohr-Sommerfeld-like condition is therefore admissible only on this trivial-holonomy locus:

$$
\oint_{\gamma_\alpha}\Pi\,dQ
\in
2\pi\hbar_{\mathrm{eff}}\mathbb{Z}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-23c2058112f4157f)

Outside that locus, the action integral is multivalued under the return map, so the apparent integer is a local chart artifact rather than a branch invariant.

#### Regularized Nonlocal Action and Variation

The Master Equation of Motion for architrinos is non-Markovian, driven by intersections between receiver trajectories and past causal wake surfaces. Consequently, any action-level scaffold for this law cannot be a local integral over instantaneous states. It must be a multi-time functional over path history, and its variation residual must be identified before the scaffold is treated as an exact action derivation. If that residual does not vanish or reduce to a declared boundary term, the proposed action does not derive the Master EOM.

For a finite, isolated set of architrinos parameterized by absolute time $T$ in the Euclidean void, use the $\eta>0$ regularized delayed action below. The exact causal wake kernel is recovered in the weak branch limit as $\eta\to0^+$. The admissible interaction sum excludes trivial self-coincidence: $i\ne j$ terms are retained, and $i=j$ terms are retained only on nontrivial self-hit branches with $T-T_t\ge\Delta_{\min}>0$ or with an explicitly declared core regularization.

The $\eta\to0^+$ statement is a weak or distributional scaling claim over declared observables unless a stronger topology is explicitly supplied. A finite-regulator trend supports this action scaffold only after the observable map, normalization, admissible test functions, and uniform control needed for the limit are stated. It is not by itself a proof of the exact causal-wake action.

$$
S_\eta[\{\mathbf X_i\}]
=
\int dT \sum_i \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2
- \frac{1}{2}\sum_{i,j}^{\mathrm{adm}}\mu_{\text{arch}}\kappa \, \sigma_{ij} |q_i q_j|
\int dT \int_{-\infty}^{T} dT_t\,
\frac{\phi_\eta\!\big(\tilde g_{ij}(T,T_t)\big)}{r_{ij}(T;T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cefa429262156257)
$$
\tilde g_{ij}(T,T_t)\equiv T-T_t-\frac{r_{ij}(T;T_t)}{c_f},
\qquad
r_{ij}(T;T_t)=\|\mathbf X_i(T)-\mathbf X_j(T_t)\|,
\qquad
\phi_\eta\equiv\delta_\eta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2fdd1b274a404efb)

With $[\tilde g]=T$ and $[\delta(\tilde g)]=T^{-1}$, the coefficient $\mu_{\text{arch}}\kappa$ gives the interaction term the same action dimension as the quadratic bookkeeping term. A factor $\kappa/c_f$ would instead leave the kernel with acceleration dimensions before time integration.

Plainly: the same universal conversion used in the kinetic row must also multiply the interaction row; dividing by the wake speed does not repair the units.

The displayed action uses the quadratic bookkeeping kinetic Lagrangian $\ell_\mu(s)=\frac12\mu_{\text{arch}}s^2$. It therefore derives only the quadratic conjugate momentum $\mu_{\text{arch}}\mathbf V$ on the charts where the complete delayed variation succeeds. For a general kinetic-energy scalar $K(s)$, [Energy](../../../../markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) owns the work-power compatibility conditions and the reconstruction $\ell_K(s)=sP(s)-K(s)$.

Plainly: the energy scalar $K$ cannot be substituted directly for the kinetic Lagrangian. A generalized kinetic chart must use the reconstructed $\ell_K$ and then rederive the complete action variation, including the interaction normalization, constraint residual, boundary charge, and momentum and energy functionals. No general conservation claim follows from the quadratic calculation without that revariation.

Here:
- $\mathbf X_i(T)$ is the trajectory of architrino $i$.
- $T$ is the generic dummy variable of the action integral. At a retained causal hit it takes the receiver role $T_r$, while $T_t$ remains the transmitter emission time.
- $\mu_{\text{arch}}$ is the universal force/energy bookkeeping constant, not a particle-specific inertial mass.
- $r_{ij}(T;T_t)$ is the Euclidean separation between reception and emission events.
- $\delta_\eta$ is a mollified delta function of width $\eta > 0$. It supports Lipschitz control only together with the collision floor, finite-branch, transversality, and integrability assumptions below.
- $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ enforces attraction for opposite polarities and repulsion for like polarities.

##### Regularization and Admissibility Assumptions

The derivation below is valid under:

- **(EL1)** $\mathbf X_i\in C^2([T_a,T_b];\mathbb{R}^3)$ and variations $\boldsymbol{\xi}_i$ are $C^1$ with $\boldsymbol{\xi}_i(T_a)=\boldsymbol{\xi}_i(T_b)=0$.
- **(EL2)** $\phi_\eta$ is a normalized $C^1$ approximate identity: either $\phi_\eta\in C_c^1(\mathbb{R})$, $\phi_\eta\ge0$, $\int\phi_\eta(s)\,ds=1$, or a Gaussian/sufficiently fast-decaying mollifier with an explicit tail bound on the chosen analysis window.
- **(EL3)** Collision and trivial-self exclusion on active support, or on the tail-controlled analysis window for noncompact mollifiers: $r_{ij}(T;T_t)\ge r_{\min}>0$ whenever the retained window admits $\phi_\eta(\tilde g_{ij}(T,T_t))$, and for $i=j$ the retained window also satisfies $T-T_t\ge\Delta_{\min}>0$ unless a separate core regularization supplies the same lower-bound control.
- **(EL4)** Delay-root transversality on active branches: $\partial_{T_t}\tilde g_{ij}(T,T_t)\neq0$ when $\tilde g_{ij}(T,T_t)=0$.
- **(EL5)** Integrability on the chosen history window, either by finite support or sufficient tail falloff, so differentiation under the time integrals is justified.
- **(EL6)** Delayed branch convention: only $T_t\le T$ contributes (equivalently, the $\Theta(T-T_t)$ branch of the causal selector).

##### Kernel Variation and Branch Reduction

This subsection isolates the exact step at which a variational scaffold can fail. Set $\mathbf X_i^\varepsilon=\mathbf X_i+\varepsilon\boldsymbol{\xi}_i$ and differentiate at $\varepsilon=0$.

Kinetic term:
$$
\delta S_{\eta,\text{kin}}
=
\sum_i\int_{T_a}^{T_b} \mu_{\text{arch}}\mathbf V_i\cdot\frac{d\boldsymbol{\xi}_i}{dT}\,dT
=
-\sum_i\int_{T_a}^{T_b} \mu_{\text{arch}}\mathbf A_i\cdot\boldsymbol{\xi}_i\,dT
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6b659d874841901a)

For the interaction kernel
$$
\mathcal{K}_{ij}(T,T_t)\equiv \frac{\phi_\eta(\tilde g_{ij}(T,T_t))}{r_{ij}(T;T_t)},
\qquad
\hat{\mathbf{r}}_{ij}\equiv\frac{\mathbf X_i(T)-\mathbf X_j(T_t)}{r_{ij}(T;T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f46e64acd074075b)
the receiver-coordinate gradient is
$$
\nabla_{\mathbf X_i(T)}\mathcal{K}_{ij}
=
-\hat{\mathbf{r}}_{ij}
\left[
\frac{\phi_\eta(\tilde g_{ij})}{r_{ij}^2}
+
\frac{\phi_\eta'(\tilde g_{ij})}{c_f\,r_{ij}}
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-deecf3fbaf475319)

This receiver-side gradient is one ingredient in a complete first variation, but it is not the complete Euler-Lagrange expression. The term proportional to $\phi_\eta'(\tilde g_{ij})$ is an action-variation residual. It is not an independently justified architrino acceleration. An action candidate succeeds only if its complete variation reproduces the Master EOM and converts every additional interior contribution into a valid boundary term or a vanishing residual under the declared endpoint convention.

On charts where the constraint-variation residual is boundary-only, or is cancelled by an explicitly declared regularized action-level term, the branch-reduced target is the transmitter-side delayed acceleration law
$$
\mu_{\text{arch}}\mathbf A_i(T)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{T_t\in\mathcal{C}_{ij}(T)}
\frac{
W_{ij}^{\mathrm{acc}}(T;T_t)\,
\hat{\mathbf{r}}_{ij}(T;T_t)
}
{r_{ij}(T;T_t)^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2219499d5f2ea7af)
where $W_{ij}^{\mathrm{acc}}=c_f/\lvert D_{t,ij}\rvert$ is computed on the same retained root record. This includes nontrivial self-hit branches $j=i$ when the trivial coincidence root is excluded.

The branch collapse used here is an $\eta\to0^+$ simple-root statement, not an identity at arbitrary finite $\eta$. Since
$$
\partial_{T_t}\tilde g_{ij}(T,T_t)
=
-\left(1-\frac{\hat{\mathbf{r}}_{ij}(T;T_t)\cdot\mathbf V_j(T_t)}{c_f}\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6e473cc76623b4ad)
any branch-local smooth $f$ satisfies
$$
\lim_{\eta\to0^+}\int_{-\infty}^{T} f(T_t)\phi_\eta\!\big(\tilde g_{ij}(T,T_t)\big)\,dT_t
=
\sum_{T_t\in\mathcal{C}_{ij}(T)}
\frac{f(T_t)}{
\left|1-\hat{\mathbf{r}}_{ij}(T;T_t)\cdot\mathbf V_j(T_t)/c_f\right|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-412295f81bc71acc)
provided the active roots are simple and separated from collision support.

Equivalently, in the finite-$\eta$ branch-selector form one may write
$$
\mu_{\text{arch}}\mathbf A_i(T)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\int_{-\infty}^{T}dT_t\,
\frac{\hat{\mathbf{r}}_{ij}(T;T_t)}{r_{ij}(T;T_t)^2}\,
\phi_\eta\!\big(\tilde g_{ij}(T,T_t)\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e3232fa0259734af)
with the understanding that the displayed finite-$\eta$ integral is a branch-selector surrogate. Its weak limit must be recomputed so that the retained branch law carries the transmitter-side factor $W^{\mathrm{acc}}$. The derivative term in $\nabla_{\mathbf X_i}\mathcal{K}_{ij}$ is cleared only after the full delayed variation is assembled and the branch reduction is performed. If it survives in the interior, this action candidate fails to derive the Master EOM.

A derivation, reduction, or simulation that claims action-derived dynamics must therefore report the variation residual
$$
\mathbf{R}_i^{(\eta)}(T)
=
\mu_{\text{arch}}\mathbf A_i(T)
-
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-898560791bbbde22)
using the scale term and constraint residual defined in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian). The dimensionless window diagnostic is
$$
\epsilon_{\mathrm{var}}^{(\eta)}(W)
=
\frac{
\sum_i\int_W\|\mathbf{R}_i^{(\eta)}(T)\|\,dT
}{
\sum_i\int_W
\left(
\mu_{\text{arch}}\|\mathbf A_i(T)\|
+
\|\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(T)\|
\right)dT
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3c8b7f134ec4fa3a)
The transmitter-side branch target is theorem-grade on $W$ only when this residual tends to zero with the declared branch floors and boundary convention. Otherwise the local effective Lagrangian remains a fitted chart. The surviving derivative-of-constraint term is evidence against this action candidate; it does not license a new acceleration term, a vector potential, or a magnetic-like mechanism.

The same-support local scalar route and its finite delta-jet extension are ruled out under the restricted assumptions in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian): cancelling the derivative residual forces the counterterm to change the accepted inverse-square scale term. A useful receiver-coordinate identity is obtained by integrating along the causal characteristic. With
$$
u=\tilde g+\frac{r}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4ab76a315be4dffa)
the endpoint-clear candidate is
$$
K_{\mathrm{eff}}^{(\eta)}(r,\tilde g)
=
\int_{-\infty}^{\tilde g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a07a5490ecc8bcab)
or the finite-endpoint variant with lower limit $-h_{+}$ after the characteristic gauge has cancelled the endpoint-clearance term. It satisfies
$$
\left(
\partial_r-\frac{1}{c_f}\partial_{\tilde g}
\right)
K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(\tilde g)}{r^2}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7a782c98fe0924b5)
so the receiver-coordinate derivative contains the accepted inverse-square scale term without a derivative-of-constraint remainder.

The operator in this identity is the derivative along the causal characteristic. With
$$
D_{\mathrm{char}}
\equiv
\partial_r-\frac{1}{c_f}\partial_{\tilde g},
\qquad
u=\tilde g+\frac{r}{c_f},
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fcf20579bf465a11)
one has $D_{\mathrm{char}}u=0$. The kernel is therefore a characteristic integral of the regularized hit density along $u=\mathrm{const}$. This establishes a local receiver-gradient construction only. It is not an accepted action, a causal-wake update, or a source of Noether charges. Effective Lagrangian reductions therefore inherit the Master EOM from retained solutions and must derive any action and conservation boundary functional independently.

#### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate when the mollifier, history window, and self-branch cutoff preserve those symmetries: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit. If the regularization is inserted only at the equation-of-motion level or uses a non-invariant window, the associated energy, momentum, and angular-momentum expressions become diagnostics rather than proved Noether charges.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking interactions that are still carried by causal wakes between emission and reception.

Here symmetry means an active transformation of the retained physical record, not merely a passive relabeling of coordinates. A passive relabeling is a representation check: the same assembly, causal-wake history, and Noether sea record should not acquire a different physical meaning because the chart changed. An active transformation asks whether the transformed branch record obeys the same action principle. Only the active question produces a Noether conservation statement.

The ordinary boundary-term identity makes the recovery burden precise. For a local action, the first variation splits into an interior Euler-Lagrange term and an endpoint term,
$$
\delta S_{\mathrm{std}}
=
\int_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
\left(
\frac{\partial L_{\mathrm{std}}}{\partial q_{\mathrm{std}}^a}
-
\frac{d}{dt_{\mathrm{std}}}\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})}
\right)\delta q_{\mathrm{std}}^a\,dt_{\mathrm{std}}
+
\left[p_a\delta q_{\mathrm{std}}^a-H_{\mathrm{std}}\delta t_{\mathrm{std}}\right]_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-55035c3eafba0d92)
with
$$
p_a=\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})},
\qquad
H_{\mathrm{std}}=p_a\frac{dq_{\mathrm{std}}^a}{dt_{\mathrm{std}}}-L_{\mathrm{std}}.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a1670016d06beaff)
On a stationary path, the interior term vanishes. Spatial translation symmetry then compares endpoint momentum, while absolute-time translation symmetry compares the Hamiltonian energy. This is the standard Noether route: a conserved quantity is the boundary charge induced by a continuous symmetry of the action, not an independently imposed storage rule.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ this identity is a recovery template, not a substrate replacement. A delayed action is promoted only if the same split appears on the retained causal-root chart: the interior term must reduce to the Master EOM residual, and the endpoint term must become the wake-history boundary functional on the same branch record. Spatial translation invariance then protects $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}$ only when the wake momentum record is retained, and absolute-time translation protects $K+E_{\mathrm{wake}}$ only when the endpoint leakage record is declared. Dropping the interior residual, the wake-history endpoint term, or the boundary flux turns the Noether statement back into a diagnostic comparison.

The more general local Noether form also matters. For an infinitesimal active transformation
$$
q_{\mathrm{std}}^a\mapsto q_{\mathrm{std}}^a+\epsilon X^a(q_{\mathrm{std}},t_{\mathrm{std}})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ec8d962586991540)
the action variation is unchanged when the Lagrangian changes at most by a total time derivative,
$$
\delta L
=
\epsilon\frac{dG}{dt_{\mathrm{std}}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-509138bb258fe13d)
On stationary paths this gives the conserved charge
$$
\frac{d}{dt_{\mathrm{std}}}\left(p_aX^a-G\right)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-44f731886c2fe3a9)
Spatial translations have $G=0$ and recover momentum. Rotations recover angular momentum. Time translations are the case where the total-derivative term supplies the Hamiltonian energy. In the delayed chart, the same pattern is admissible only after $X^a$, $G$, and the boundary functional are replaced by history-aware branch quantities from the retained causal-root record.

**Energy Functional:** Invariance under absolute time translation yields a conserved total energy only for the symmetry-preserving action-derived model:
$$
E_{\text{tot}}(T)=K(T)+E_{\text{wake}}(T)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-8a6963cef3c0a396)
where the action-level nonlocal Noether charge can be written with the weighted causal kernel from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#action-level-wake-energy-functional-at-a-time-boundary). To avoid confusing the receiver-gradient kernel above with the Noether-energy kernel, write
$$
\mathcal{K}_{ij}^{E}(T_1,T_t)
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_iq_j|
\Theta(T_1-T_t)
\frac{\delta\!\big(\tilde g_{ij}(T_1,T_t)\big)}
{r_{ij}(T_1,T_t)}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-98c72a643a2228d4)
Then:

$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}^{E}(T_1,T_t)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6da92b5088a86221)

The outer minus sign matches the action convention $S=S_{\mathrm{kinetic}}-\tfrac12\sum S_{ij}$ and makes the sharp static like-polarity pair charge positive. Reversing that sign would contradict the positive work required to bring a repelling like-polarity pair closer.

Plainly: the boundary charge must inherit both the units and the sign of the same action kernel.

For compatible trajectory reconstruction one may use the work-integral form
$$
U(T)=U_\ast-\int_{T_\ast}^{T}\sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot\mathbf V_i(T')\,dT'
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5c605fb8c4cd0e0e)
when it is derived from the same action-level acceleration law and boundary convention. Otherwise $U(T)$ is a diagnostic history functional, not an independently proved Noether charge.

The corresponding finite-window energy residual is
$$
\epsilon_E^{(\eta)}(W)
=
\frac{
\left|
\Delta_W\left(K+E_{\text{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf V_i\cdot\mathbf{R}_i^{(\eta)}\,dT
-
\int_W\mathcal{B}_E^{(\eta)}\,dT
\right|
}{
\left|\Delta_W K\right|
+
\left|\Delta_W E_{\text{wake}}^{(\eta)}\right|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4a57b4bb29eb73f9)
Here $\mathcal{B}_E^{(\eta)}$ is the declared endpoint or period-cut leakage. For isolated period-matched tests, $\epsilon_{\mathrm{var}}^{(\eta)}\to0$, $\mathcal{B}_E^{(\eta)}\to0$, and $\epsilon_E^{(\eta)}\to0$ are the minimal conservation checks before the effective Hamiltonian is promoted beyond a diagnostic fit.

The energy residual above is theorem-level only after the chart declares one symmetry-preserving action or independently derived causal-wake update, its endpoint convention, branch floors, and endpoint or period-cut leakage terms. The work-integral reconstruction $U(T)$ remains a trajectory diagnostic unless it is derived from that same construction and boundary convention.

**Generalized Momentum:** Spatial translation invariance guarantees the conservation of total momentum, $\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}(T)$, where the mechanical momentum of the architrinos is balanced by the momentum flux propagating within the causal wake surfaces. Boundedness of the history-aware energy is therefore the natural diagnostic against runaway behavior, not a separate postulate.

For an effective reduction to promote a retained chart rather than fit it, it must also report vector residuals for the same branch pullback:
$$
\epsilon_P^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{R}_i^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_P^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{P}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0ba4bd8ad6f57dca)
and
$$
\epsilon_J^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf X_i(T)\times\mathbf{R}_i^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_J^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{J}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-99a9f4f7031036a2)
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ are conservation diagnostics when the regularization is inserted at the equation-of-motion level. They become Noether-charge tests only when the action regularization itself preserves time translation, spatial translation, and rotation symmetry on the retained chart.

#### Coarse-Graining: The Effective Continuum Lagrangian

The continuum Lagrangian belongs to a coarse-grained level. To describe emergent behavior of the Noether sea and complex assemblies, the description passes from discrete trajectories to continuum densities on native slices. Define a coarse-grained architrino polarity density $\rho_q(\mathbf X,T)$ and current density $\mathbf{j}_q(\mathbf X,T)$, smoothed over a scale much larger than the Noether braid scale but smaller than macroscopic gradients. This notation is deliberately distinct from Noether braid density variables such as $\rho_{\text{NS}}$ and $n$.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\mu_{\text{arch}}\kappa}{2} \int dT \int d^3X \int d^3X' \,
\frac{\rho_q(\mathbf X, T) \rho_q(\mathbf X', T - \|\mathbf X-\mathbf X'\|/c_f)}
{\|\mathbf X-\mathbf X'\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3c5cdf8fe6291707)
with delayed transmitter time
$$
T' = T - \frac{\|\mathbf X-\mathbf X'\|}{c_f}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5bcc1e7cd872a604)
propagation direction
$$
\hat{\mathbf{n}}(\mathbf X,\mathbf X')=
\frac{\mathbf X-\mathbf X'}{\|\mathbf X-\mathbf X'\|}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1b972556a7cd8af2)
coarse transport velocity
$$
\mathbf{u}(\mathbf X',T')
=
\frac{\mathbf{j}_q(\mathbf X',T')}{\rho_q(\mathbf X',T')}
\qquad (\rho_q\neq 0)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7de07e9ecefe01d1)
Here $\rho_q$ has polarity-density units. The emission-time delta collapse has already been absorbed into the delayed Eulerian density, and the discrete action uses the time-normalized causal constraint. No additional $1/c_f$ therefore remains in the continuum prefactor; the same universal $\mu_{\text{arch}}\kappa$ conversion that supplies the discrete interaction action supplies this coarse-grained row.

This Eulerian double-space functional is a continuum inheritance target for the discrete delayed causal $1/r$ action kernel. It contains no additional transmitter-side factor: the delayed density $\rho_q(\mathbf X',T')$ already carries the transmitter-side compression or dilation produced by the Lagrangian-to-Eulerian coarse-graining. For a point transmitter, the familiar transmitter-velocity factor appears when the particle delta is collapsed through its emission-time root; it is not an extra denominator to multiply into the Eulerian density kernel. A corrected delayed action must reproduce the canonical inverse-square acceleration density weighted by $W^{\mathrm{acc}}=c_f/|D_t|$. Receiver velocity may enter the full variation, root playback, and conserved accounts, but it may not reappear as an extra multiplier on the instantaneous acceleration.

The remaining action correction is also one continuum location where delayed pairwise mechanical acceleration fails to cancel. The branch chart must distinguish transmitter-side acceleration weight from receiver-side root playback, so the receiver/transmitter exchange is not represented by a symmetric mechanical stress alone. Translation invariance still protects total momentum when the wake momentum is included, but the mechanical current must split as

$$
\Pi_q^{ij}
=
\Pi_{q,\mathrm{sym}}^{ij}
+
\Pi_{q,J}^{ij},
\qquad
\Pi_{q,J}^{[ij]}
\equiv
\frac{1}{2}
\left(
\Pi_{q,J}^{ij}
-
\Pi_{q,J}^{ji}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d8ef06242754fe6e)

where $\Pi_{q,J}^{[ij]}$ is a candidate antisymmetric branch-correction contribution. It is not a new substrate acceleration term. A continuum simulation may test this effective description only after $\Pi_{q,J}^{[ij]}$ has been derived from the same delayed branch record and shown to close the relevant wake-history account.

The continuum variables are admitted only through balance laws inherited from resolved histories. A coarse polarity density and current must satisfy
$$
\partial_T\rho_q+\nabla_{\mathbf X}\cdot\mathbf{j}_q
=
R_{\rho}^{\mathrm{cg}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-69a0d2ac8a3910ec)
and the first two kinetic moments must close through a declared momentum-current tensor and energy-flux vector,
$$
\partial_T(\rho_q u^i)
+\partial_{X^j}\Pi_q^{ij}
=
f_q^i+R_{P,q}^i
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-56f42458a943fe02)
$$
\partial_T e_q
+\nabla_{\mathbf X}\cdot\mathbf{J}_{e,q}
=
\mathbf{f}_q\cdot\mathbf{u}
+R_{E,q}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5062ac5690b6ba0a)
Here $\Pi_q^{ij}$ and $\mathbf{J}_{e,q}$ are coarse-history summaries of the retained causal-wake record, not new substrate fields. The effective action is a promoted continuum chart only when $R_{\rho}^{\mathrm{cg}}$, $R_{P,q}^i$, and $R_{E,q}$ are small under history, spatial, and regulator refinement. Otherwise the chart has reproduced only low-order moments while leaving unresolved memory in the omitted kinetic hierarchy.

For near-equilibrium reductions, a constitutive response may be written schematically as
$$
\Pi_q^{ij}
=
\Pi_{\mathrm{rev}}^{ij}
-
2\eta_{\mathrm{cg}}
\left(
E^{ij}-\frac{1}{3}(\nabla_{\mathbf X}\cdot\mathbf{u})h^{ij}
\right)
-
\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf{u})h^{ij}
+\Pi_{\mathrm{mem}}^{ij}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-09968b456a04e06c)
where $E^{ij}=\frac{1}{2}(\partial_{X^i}u^j+\partial_{X^j}u^i)$ and $\mathring E^{ij}=E^{ij}-\frac{1}{3}(\nabla_{\mathbf X}\cdot\mathbf{u})h^{ij}$ is the deviatoric strain-rate tensor. This is a comparison form borrowed from continuum mechanics and kinetic theory. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it becomes native only after $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and $\Pi_{\mathrm{mem}}^{ij}$ are derived from the same delayed branch record that supplies the acceleration law. The subscript in $\eta_{\mathrm{cg}}$ marks a coarse-grained viscosity-like coefficient and is distinct from the regulator $\eta$ in $\delta_\eta$.

The constructive route is to read the transport coefficients as low-frequency moments of the delayed response kernel, not as independent material constants. If $\widetilde K_{\mathrm{shear}}(\omega)$ and $\widetilde K_{\mathrm{bulk}}(\omega)$ are the shear and bulk projections of the same branch-derived causal kernel, then the leading near-equilibrium coefficients have the schematic form

$$
\eta_{\mathrm{cg}}
\sim
\lim_{\omega\to0}
\frac{
\operatorname{Im}\widetilde K_{\mathrm{shear}}(\omega)
}{
\omega
},
\qquad
\zeta_{\mathrm{cg}}
\sim
\lim_{\omega\to0}
\frac{
\operatorname{Im}\widetilde K_{\mathrm{bulk}}(\omega)
}{
\omega
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9b2d16601638704f)

and $\Pi_{\mathrm{mem}}^{ij}$ carries the finite-frequency remainder. This makes the viscosity-like channel an odd-frequency readout of the delayed acceleration kernel. The ratio between $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and the acceleration-law coupling $\kappa$ is therefore a kernel-shape consequence on a certified branch, not an additional parameter family.

This is the continuum version of the delayed oscillator expansion. A branch-derived response kernel has one Taylor structure:

$$
\widetilde K(\omega)
=
\widetilde K_{\mathrm{even}}(\omega)
+
\widetilde K_{\mathrm{odd}}(\omega)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-33d24372e957ca14)

Its even part supplies candidate inertia-like and mass-renormalization coefficients; its odd part supplies candidate anti-damping, viscosity-like response, and antisymmetric stress. Ratios such as $\eta_{\mathrm{cg}}/m_{\mathrm{eff}}$ or $\eta_{\mathrm{cg}}/\kappa$ become branch invariants only after the same delayed kernel and comparison window have been independently certified.

The corresponding dissipation residual is
$$
\mathcal R_{\mathrm{diss}}(W)
=
\frac{
\left|
\Delta_W K_{\mathrm{cg}}
+\int_W
\left(
2\eta_{\mathrm{cg}}\mathring E_{ij}\mathring E^{ij}
+\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf{u})^2
\right)\,dT\,dV
+\Delta_W E_{\mathrm{wake}}
\right|
}{
|\Delta_W K_{\mathrm{cg}}|
+\int_W
\left(
2\eta_{\mathrm{cg}}\mathring E_{ij}\mathring E^{ij}
+\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf{u})^2
\right)dT\,dV
+|\Delta_W E_{\mathrm{wake}}|
+\varepsilon
}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f7d1b01b63153dd5)
This residual prevents ordinary viscous loss language from replacing the exact wake-history energy ledger. A nonzero positive quadratic term is allowed as a coarse channel for coherent-to-incoherent transfer, but the transferred content must appear in the retained wake, heat, or medium-response record.

By defining an effective scalar potential $\Phi_{\text{wake}}(\mathbf X,T)$ and a vector transport potential $\mathbf{A}_{\text{wake}}(\mathbf X,T)$ that track the integrated causal wakes of the continuous medium, the system maps locally onto an effective field theory. These potentials are bookkeeping variables for delayed transport, not additional ontological primitives. The resulting local Lagrangian density $\mathcal{L}_{\text{eff}}$ therefore belongs to a further closure step beyond the exact delayed causal action.

At the standard local-field level, the action principle changes the object being varied rather than the logic of stationarity. A particle path in the recognition form is replaced by effective fields $\varphi_{\mathrm{eff}}^A(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$, and the local action has the layer-explicit schematic form
$$
S[\varphi]
=
\int dt_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}\,
\mathcal{L}
\left(
\varphi_{\mathrm{eff}}^A,
\partial_{t_{\mathrm{eff}}}\varphi_{\mathrm{eff}}^A,
\partial_{x_{\mathrm{eff}}^i}\varphi_{\mathrm{eff}}^A,
\ldots
\right).
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-de37b7be766d1bc4)
Fixed-boundary variation gives the field Euler-Lagrange expression
$$
\frac{\partial \mathcal{L}}{\partial \varphi_{\mathrm{eff}}^A}
-
\partial_{t_{\mathrm{eff}}}
\frac{\partial \mathcal{L}}{\partial(\partial_{t_{\mathrm{eff}}}\varphi_{\mathrm{eff}}^A)}
-
\partial_{x_{\mathrm{eff}}^i}
\frac{\partial \mathcal{L}}{\partial(\partial_{x_{\mathrm{eff}}^i}\varphi_{\mathrm{eff}}^A)}
=0.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-04b6dbbd41f78abe)
This is the common effective grammar behind Maxwell, Einstein-Hilbert, and Standard Model action formulations. For $\mathbb{A}\mathbb{A}\mathbb{A}$ it is not a license to treat fields as substrate objects. It is the recovery grammar a local chart must satisfy after the delayed branch record has been coarse-grained into admitted fields and after its Euler-Lagrange residual has been checked against the same causal-wake, boundary, and transmitter-side acceleration-weight records.

#### Effective Hamiltonian Domain Gate

A local Hamiltonian or local Lagrangian description is admissible only after the path-history law has been reduced to a finite set of coarse variables that preserve the relevant state-counting measure over the comparison window. This is an inference condition: it tests whether exact histories can be represented by local canonical coordinates without losing the invariants under comparison. Let $\mathcal{Q}$ be the coarse-graining from exact histories $\Gamma(T)$ to effective coordinates $z=(\rho_q,\mathbf{j}_q,\ldots)$, and let $\mathcal{P}_{\Delta T}^{\mathrm{eff}}$ be the induced effective flow. The local canonical approximation must supply a measure $\mu_{\mathcal{Q}}$ such that
$$
(\mathcal{P}_{\Delta T}^{\mathrm{eff}})_*\mu_{\mathcal{Q}}
=
\mu_{\mathcal{Q}}
+O(\epsilon_{\mathcal{Q}})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-debb4171db332304)
on the retained regime. This measure condition is necessary but not sufficient for canonical mechanics. The same handoff must also control a bracket or symplectic residual, for example
$$
\left\|
(\mathcal{P}_{\Delta T}^{\mathrm{eff}})^*\omega_{\mathcal{Q}}
-
\omega_{\mathcal{Q}}
\right\|
\le
\epsilon_{\omega}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-12af1e91038b7a1a)
for the retained two-form $\omega_{\mathcal{Q}}$, or an equivalent Poisson-bracket residual on the admitted observables. If $\epsilon_{\mathcal{Q}}$ or $\epsilon_{\omega}$ is not controlled, the local Hamiltonian is only a fitting chart, not a derived mechanics.

For a replayable branch chart, this measure condition is the $\mathbb{A}\mathbb{A}\mathbb{A}$ analogue of Liouville's theorem. In ordinary finite-dimensional Hamiltonian mechanics the phase-space flow is divergence-free, $\nabla_z\cdot\dot z=0$, so a phase-space volume element may stretch and fold but is not compressed by the exact flow. In the delayed setting, the analogous statement is valid only after $\mathcal{Q}$ retains the phase variables, causal-root ledger, wake-history record, and surrounding context that actually control the return map. Dropping an active sub-assembly phase can make a closed chart look dissipative or probabilistic merely because the chart has thrown away one of the variables that carries the recurrence.

The preserved two-form is likewise not the naive instantaneous form alone. On a delayed branch the candidate symplectic structure is posited to carry a memory correction,

$$
\omega_{\mathcal{Q}}
=
\omega_0+\omega_{\mathrm{mem}},
\qquad
\omega_0
=
\sum_A dQ^A\wedge d\Pi_A
+
\sum_\alpha d\theta^\alpha\wedge dI_\alpha
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-4baf6168f27206ec)

with

$$
\omega_{\mathrm{mem}}
=
\int_{-h}^{0}
\mathcal K_{\mathrm{symp}}(\vartheta)\,
\delta\mathbf X(\vartheta)
\wedge
\delta\mathbf V(\vartheta)
\,d\vartheta
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-032c65b1cf93ee48)

where $h$ is the retained memory depth and $\mathcal K_{\mathrm{symp}}$ is built from the same branch causal kernel that supplies the acceleration. The explicit construction of $\mathcal K_{\mathrm{symp}}$ and the boundary-flux identity below are open obligations of the Hamiltonian-promotion gate. The residual $\epsilon_{\omega}$ is small only when this memory term is replayable: after one return, the retained history segment $[-h,0]$ must map to a congruent segment with the same branch records and boundary convention. This is why phase-locked branches are the natural Hamiltonian domain. They replay the history window that carries $\omega_{\mathrm{mem}}$, while off-lock branches leak symplectic content through the memory boundary and can look dissipative after projection.

Equivalently, $\omega_{\mathrm{mem}}$ is the symplectic flux through the boundary of the retained memory interval. A Hamiltonian-promotable branch must make that boundary periodic under the return map:

$$
\oint_{\mathrm{return}}
\omega_{\mathrm{mem},\partial[-h,0]}
=
O(\epsilon_{\omega})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-bc15e350deb87913)

after quotienting only true zero-Floquet neutral directions. If the memory-boundary flux has a secular component, the projected chart can conserve neither the corrected symplectic form nor the apparent energy ledger without adding the missing history variable. This is the same branch-symplectic promotion condition used by the scalar causal-action return-map residual and by binary or doubling-frequency return-map packets: preserve $\omega_0+\omega_{\mathrm{mem}}$ on the retained delayed chart, not merely the instantaneous phase volume.

This gate keeps the exact and effective levels separate. The Master Equation owns the delayed causal dynamics; the effective Hamiltonian owns only those regimes where internal wake memory, branch changes, and unresolved Noether sea exchange have been compressed without losing the observer-level invariants being compared.

The same domain restriction applies before translating an effective Hamiltonian chart into quantum operators. The admissible observable set in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail) must be derived from this retained coarse-graining and record window, not chosen afterward as a free quantization convention.

The positive selection rule is that the quantizable algebra is generated by the globally defined branch variables,

$$
\{Q^A,\Pi_A\}
\cup
\{e^{i\theta^\alpha},I_\alpha\}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-40c3f6cf7e8dc650)

not by arbitrary functions on a projected chart. The phases enter through the single-valued observables $e^{i\theta^\alpha}$, while $I_\alpha$ records the corresponding action. A Bohr-Sommerfeld-like integer is admissible only when it is forced by single-valuedness around the resonance-locked phase bundle,

$$
\oint_{\gamma_\alpha}\Pi\,dQ
\in
2\pi\hbar_{\mathrm{eff}}\mathbb{Z}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-23c2058112f4157f-2)

with the integer tied to the phase-return degree pair above. Thus quantization in this reduction is a topological single-valuedness condition on a retained phase-locked bundle, not a global quantization convention imposed on every smooth effective observable.

#### Topological Constraints and Assembly Stability

The delayed action, after branch reduction to causal-locus and root-ledger data, constrains the allowed topological configurations of architrino assemblies in the Noether sea. Stable assemblies, such as maximum-curvature candidates inside Family-A braids, should therefore be treated as theorem targets for localized, phase-locked causal-locus classes rather than as already-proved vortices or continuum topological defects.

The stability of these assemblies must be checked by the nonlinear self-hit feedback embedded in the interaction functional. When internal circulation velocities exceed $c_f$, the non-Markovian repulsion supplies a candidate outward branch barrier, not the centripetal binder. It becomes part of a robust geometric attractor only after the complete signed acceleration ledger, a branch chart, Lyapunov or Floquet diagnostic, and history-aware energy bound are supplied. Likewise, mass-gap language is a closure target tied to discrete admissible branch classes, not an automatic consequence of writing the effective action.

The native topological sector is the stabilized causal-root ledger, not a borrowed field-theory vortex number. The canonical definition is given in [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md); in the effective-action chart, the same assembly topological charge is the retained sector

$$
[\mathfrak B]
=
\left(
N_s,\,
M_p,\,
c_1[\theta_1,\theta_2,\theta_3]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c5d4f3b002fd9866)

where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1[\theta_1,\theta_2,\theta_3]$ is the phase-return degree pair of the resonance-locked Noether braid chart in persistent-index order. This class is deformation-stable only inside the nondegenerate branch domain: a causal-root fold, reconnection, or loss of phase-bundle closure changes the sector.

The corresponding mass-gap target is therefore native and computable. The gap is the minimum action cost to change $[\mathfrak B]$ by an admissible branch transition, such as a $\Delta N_s=\pm2$ root birth or death under the same Jacobian floor and boundary convention. In a caustic-grazing transition this cost should be estimated from the finite impulse and wake-history increment across the fold. If that minimum vanishes under refinement, the action chart has no protected assembly gap; if it remains positive, the gap is a property of the branch ledger and delayed action, not an imported continuum-defect assumption.

In the action-counting notation of [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#branch-barrier-and-transition-cost), let $\mathfrak B_{\lambda_0(\eta)}$ and $\mathfrak B_{\lambda_1(\eta)}$ be retained finite-regulator branch charts on opposite sides of a path that crosses the specific codimension-one wall $\Sigma_{\mathrm{fold}}$. The same target is

$$
\Delta_{\mathrm{gap}}
=
\liminf_{\eta\to0^+}
B_{\mathrm{rec}}(\lambda_0(\eta),\lambda_1(\eta))
>
0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7a787cfbfd45cc1b)

for the wall that changes the targeted entry of the assembly topological charge. The wall may be a causal-root fold, a phase-lock wall, or a frame-degeneracy wall. The mass gap is positive exactly when the receiver-side fold-crossing cost survives regulator refinement with the finite memory and regulator state declared by those charts; this is the action view of the same uniform-in-$\eta$ fold-survival problem that stability packets test through Conley, Lyapunov, or Floquet data.

#### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain. The bridge remains effective and comparative: it tests when a signed polarity/current history can be compressed into a nonnegative envelope without erasing memory terms.

From the regularized nonlocal action, the first step is to derive a continuum effective action in terms of coarse variables $(\rho_q,\mathbf{j}_q)$. The second step tests a phase-amplitude closure ansatz for the retained nonnegative envelope channel:
$$
\rho_{\mathrm{env}}=|\psi|^2,\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\hbar_{\mathrm{eff}}}{m_{\mathrm{eff}}}\Im(\psi^*\nabla_{\mathbf X}\psi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e7da832232253a9d)
Here $m_{\mathrm{eff}}$ is the retained envelope mass parameter of the benchmark chart, not a primitive architrino mass. The projection from the signed polarity/current data $(\rho_q,\mathbf{j}_q)$ to the nonnegative envelope channel must be declared before $\rho_{\mathrm{env}}$ is interpreted as $|\psi|^2$.

That projection has a topological cost. The signed polarity density carries a polarity-sign sheet

$$
\sigma(\mathbf X,T)
=
\operatorname{sign}\rho_q(\mathbf X,T)
\qquad
(\rho_q\neq0)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-6165139131460889)

and the interfaces $\rho_q=0$ are polarity domain walls. The envelope map is faithful only on a region where $\sigma$ is constant. When a loop $\gamma$ encloses domain-wall crossings, the phase chart must carry the lost sign sheet as a $\mathbb{Z}_2$ bundle datum:

$$
\oint_{\gamma}
\nabla_{\mathbf X} S_{\mathrm{env}}\cdot d\boldsymbol{\ell}
=
\pi\,N_{\mathrm{wall}}(\gamma)
\quad
(\mathrm{mod}\ 2\pi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d82ceea8512a3fe8)

where $N_{\mathrm{wall}}(\gamma)$ is the parity count of enclosed polarity-domain-wall intersections in the retained projection. The memory current is therefore not generic residue in this regime. Its circulation classifies the polarity-domain-wall topology that the nonnegative envelope has forgotten. A spin-$\tfrac12$-like double-valued envelope can be promoted only if this $\mathbb{Z}_2$ sign-sheet circulation is recovered from the same $(\rho_q,\mathbf{j}_q)$ history and persists under branch-preserving deformation.

This is a hard wall for the spinor and exchange-statistics program and is the action-side realization of the [exchange-loop hard wall](../../../../markdown/aaa/foundations/ontology.md#the-fundamental-entity). The nonnegative envelope forgets an orientation double cover of the signed-density configuration space; the polarity domain walls are the branch locus of that cover. If the parity $N_{\mathrm{wall}}(\gamma)\pmod 2$ can change without crossing a certified fold, reconnection, or declared surgery event in the retained branch record, then the half-integer envelope response has been fitted rather than derived. Conversely, a deformation-stable $\mathbb{Z}_2$ holonomy gives a concrete substrate carrier for the $-1$ sign under an exchange cycle, provided the exchange cycle is computed from the same signed polarity/current history rather than from an imposed quantum label.

The handoff must report the continuity residual
$$
R_{\mathrm{cg}}=\partial_T\rho_{\mathrm{env}}+\nabla_{\mathbf X}\cdot\mathbf{j}_{\mathrm{env}},
\qquad
\epsilon_{\mathrm{cg}}=
\frac{\|R_{\mathrm{cg}}\|}
{\|\partial_T\rho_{\mathrm{env}}\|+\|\nabla_{\mathbf X}\cdot\mathbf{j}_{\mathrm{env}}\|+\varepsilon}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-08a294e6fc0fc7dd)
and keep the memory current
$$
\mathbf{j}_{\mathrm{mem}}
=
\mathbf{j}_q-\mathbf{j}_{\mathrm{env}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fc40dcf37b468c39)
as an explicit residual rather than absorbing it into fitted constants. Equivalently, with $\Delta\rho=\rho_q-\rho_{\mathrm{env}}$,
$$
\partial_T\rho_q+\nabla_{\mathbf X}\cdot\mathbf{j}_q
=
R_{\mathrm{cg}}
+
\partial_T\Delta\rho
+
\nabla_{\mathbf X}\cdot\mathbf{j}_{\mathrm{mem}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-989217797594e8c1)
Thus a small $R_{\mathrm{cg}}$ by itself does not prove envelope closure; the projection mismatch and memory-current divergence must be controlled as well.

For the non-relativistic, fixed-particle-number benchmark, the same envelope must also admit a phase chart
$$
\psi=\sqrt{\rho_{\mathrm{env}}}\,e^{iS_{\mathrm{env}}/\hbar_{\mathrm{eff}}},
\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\rho_{\mathrm{env}}}{m_{\mathrm{eff}}}\nabla_{\mathbf X} S_{\mathrm{env}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-39600a63328a7b86)
Define
$$
K_{\mathrm{env}}=\frac{\|\nabla_{\mathbf X} S_{\mathrm{env}}\|^2}{2m_{\mathrm{eff}}},
\qquad
Q_{\mathrm{env}}
=
-\frac{\hbar_{\mathrm{eff}}^2}{2m_{\mathrm{eff}}}
\frac{\nabla_{\mathbf X}^2\sqrt{\rho_{\mathrm{env}}}}{\sqrt{\rho_{\mathrm{env}}}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a21c9b500c69bd9c)
and test the corresponding Hamilton-Jacobi residual
$$
R_{\mathrm{HJ}}
=
\partial_T S_{\mathrm{env}}
+K_{\mathrm{env}}
+V_{\mathrm{eff}}
+Q_{\mathrm{env}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-23da802de9bf92c6)
This is the current form-level quantum recovery. The residual-controlled envelope chart reproduces the Madelung/Hamilton-Jacobi structure of the non-relativistic Schrödinger equation, and the action-bundle single-valuedness condition above supplies the Bohr-Sommerfeld integer on a resonance-locked branch. Those statements are chart recoveries, not full quantum closure: the Born rule still requires the finite-window basin measure to push forward to $|\psi|^2$ on record-forming apparatus channels, and spin-$\tfrac{1}{2}$ exchange still requires the polarity-domain-wall $\mathbb{Z}_2$ holonomy to remain deformation-stable on the same retained branch.

The effective Schrödinger/Madelung chart is licensed on a retained window only when
$$
\mathcal{R}_{\mathrm{env}}
=
\max\!\left(
\epsilon_{\mathrm{cg}},
\frac{\|R_{\mathrm{HJ}}\|}
{\|\partial_T S_{\mathrm{env}}\|+\|K_{\mathrm{env}}\|+\|V_{\mathrm{eff}}\|+\|Q_{\mathrm{env}}\|+\varepsilon},
\frac{\|\mathbf{j}_{\mathrm{mem}}\|}{\|\mathbf{j}_q\|+\varepsilon}
\right)
\le\epsilon_{\mathrm{env}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3229e5449d3897a5)
This is a comparison residual, not a new ontology. If it fails, the wave function and Hamiltonian remain useful fitting charts for that window rather than promoted quantum closure.

The interface is closed only when:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../../../../markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md);
- the phase-amplitude chart reports $\mathcal{R}_{\mathrm{env}}$ rather than assuming the Schrödinger limit;
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
