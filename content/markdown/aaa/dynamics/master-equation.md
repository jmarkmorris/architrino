# Master Equation

This chapter answers the first dynamics question: given architrinos moving in absolute time through the Euclidean void, what exactly makes one of them accelerate? The answer is the delayed, receiver-local law used throughout the dynamics branch. It defines what counts as a causal hit, how path history selects the active emission events, and how those hits sum into the acceleration of the receiver.

For the primitive-entity ontology, see [Architrino](../foundations/architrino.md). This chapter begins where ontology becomes motion. A causal wake is not a vague field surrounding a transmitter; it is a delayed contact condition between a past emission event and a receiver event. When that condition closes, the receiver samples a line-of-action contribution whose strength is set by the density of emitted causal surfaces at the receiver event.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation. Later sections develop the delay differential equation form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface needed by binaries, Noether braids, effective geometry, and quantum closure.

## Foundations and Causal Geometry

### Purpose and Scope

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

### Overview and Key Principle

#### The Central Idea

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

#### Abstract Form

**Postulated substrate law.** The Master Equation of Motion at abstract level is:

$$
\boxed{
\frac{d^2 \mathbf X_r}{dT_r^2}
=
\sum_{t\ne r}\mathbf A_{r\leftarrow t}(\text{causal history})
+\mathbf A_{r\leftarrow r}(\text{self-hit})
}
$$

where:

- $\mathbf A_{r\leftarrow t}(\text{causal history})$: sum of all per-hit accelerations from transmitter $t\ne r$ arriving at receiver $r$ at $T_r$
- $\mathbf A_{r\leftarrow r}(\text{self-hit})$: sum of all self-hit acceleration contributions when the same architrino occupies both causal roles

(The per-hit acceleration $\mathbf A_{r\leftarrow t}(T_r;T_t)$ is defined below in canonical form. The substrate law is acceleration-first. If a force-like bookkeeping symbol is desired, introduce one universal conversion constant $\mu_{\text{arch}}$ and define $\mathbf F_{r\leftarrow t}\equiv\mu_{\text{arch}}\mathbf A_{r\leftarrow t}$.)

**Key insight:** Both terms have the same functional form: a radial inverse-square law weighted by the transmitter-side density of emitted causal surfaces. They differ only in whether transmitter and receiver are the same persistent architrino. The transmitter-side factor sets both root legality and transmitter-emission density. The receiver-side factor controls how a root is replayed as reception time advances; it does not multiply the instantaneous acceleration.

#### Path-History Sum and Integral Representation

The Master EOM is most naturally understood as a **path-history branch sum**: all of the physical content resides in the retained paths of the transmitters, and the causal constraint selects the emission events whose wakes reach the receiver event.

In integral form, the same branch-sum law can be written as

$$
\frac{d^2 \mathbf X_r}{dT_r^2}
= \sum_t \kappa\,\sigma_{tr}\,|q_tq_r|
\int_{-\infty}^{T_r}\mathrm dT_t\;
\frac{\hat{\mathbf r}_t(T_r;T_t)}{r_t^2(T_r;T_t)}
\delta\!\Big(g_{r\leftarrow t}(T_r;T_t)\Big)
$$

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
When this floor fails, the active root is caustic-like or degenerate and must be routed to a different branch chart or regularization regime. In special geometries the floor can be computed rather than declared; the principal circular partner branch derives $\kappa_{\mathrm{hit}}^{\mathrm{bin}}=c_f(1+\beta_f\sin(\phi/2)) > c_f$ in [Binary Dynamics](binary-dynamics.md#principal-partner-root-certificate), where Binary Dynamics uses $\phi/2=\xi$ for the circular delay angle used below.

#### Autonomous Emission-Labeled Wake Transport

The regular-domain causal-wake geometry has a self-contained present-time state realization. For each transmitter $t$ and emission time $T_e\le T$, retain one emitted surface label
$$
\mathsf w_{t,e}(T)
=
\left(
t,T_e,\mathbf C_{t,e},R_{t,e}(T),c_fq_t\,dT_e
\right)
$$
with emission boundary data
$$
\mathbf C_{t,e}(T_e)=\mathbf X_t(T_e),
\qquad
R_{t,e}(T_e)=0
$$
and free absolute-time update
$$
\frac{d\mathbf C_{t,e}}{dT}=\mathbf0,
\qquad
\frac{dR_{t,e}}{dT}=c_f,
\qquad
\frac{d(c_fq_t\,dT_e)}{dT}=0.
$$
The center is the transmitter site at emission and remains fixed in the Euclidean void. The surface radius grows at the primitive wake speed. After emission, this kinematic state reads neither the later transmitter path nor any future receiver path.

Plain language: each instant of emission creates a labeled expanding sphere. Its center is frozen at the place where the emission occurred, while its radius grows by $c_f$ times its age. Later transmitter motion does not drag an already emitted sphere through the void.

The surface measure is conserved during free propagation. With the conventional static-transmitter normalization absorbed into the emission measure, its uniform area density is
$$
\varrho_{t,e}^{\mathrm{surf}}(T)
=
\frac{c_fq_t\,dT_e}{4\pi R_{t,e}^2(T)}.
$$
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
Consequently every surface element has absolute speed $c_f$, and a receiver at $\mathbf X_r(T_r)$ intersects the surface only when
$$
\left\|
\mathbf X_r(T_r)-\mathbf C_{t,e}
\right\|
=
c_f(T_r-T_e).
$$
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

Plain language: constant emission time is pushed through the moving transmitter's sequence of sphere centers. Where successive spheres bunch together, the receiver encounters a larger surface density. That geometric conversion produces the canonical acceleration weight $c_f/|D_t|$; receiver velocity is unnecessary because reception time was held fixed during the collapse.

This state also adjudicates the inertially extrapolated direction under the current ontology. A direction-only replacement aimed at
$$
\mathbf X_t(T_e)+\mathbf V_t(T_e)(T_r-T_e)
$$
is not normal to the emitted surface above. Moving the surface center to that extrapolated point would instead give surface-element velocity
$$
\mathbf V_t(T_e)+c_f\boldsymbol\omega,
$$
whose magnitude is not generally $c_f$. It would define a different propagation law and a different causal support. For a smoothly accelerated transmitter, fixed-reception collapse of that moving-center family has denominator
$$
c_f
-
(T_r-T_e)
\mathbf A_t(T_e)\cdot
\hat{\mathbf r}_{\mathrm{ext}},
$$
not the canonical transmitter-velocity denominator.

Plain language: the alternative has only two coherent interpretations, and both leave the current wake ontology. If only the arrow changes, it no longer follows the wake surface normal. If the sphere itself moves with the extrapolated center, its points no longer propagate at the fixed absolute speed $c_f$, and its arrival weight changes as well.

Claim grade: **derived regular-domain state reduction** from fixed-speed causal-surface propagation, constant emission measure, and receiver-local surface-normal response. The executable reference is `scripts/equation-mapping/derive-causal-wake-update-law.mjs`; it checks center autonomy, the surface normal by an independent spatial finite difference, the source-time weight by direct mollified quadrature, and the absolute-speed failure of inertially transported centers. A fixed-speed independently evolving wake whose local normal is the extrapolated direction would refute the directional conclusion. Failure of the quadrature to converge to $c_f/|D_t|$ on a certified simple root would refute the weight reduction.

This result closes only the regular kinematic substate and its line-of-action decision. Transparent reception does not supply the missing maturity, wake energy, wake momentum, or reception-transfer accounts needed for a finite coincident same-transmitter birth and simultaneous energy, momentum, and angular-momentum closure. Those obligations remain fail closed; the present derivation must not be cited as an account-complete Master Equation closure.

#### Caustic Transit and Finite Impulse

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
and the Jacobian factor scales as
$$
\left|\partial_{T_t} g(T_r,T_{t,\pm}(T_r))\right|
=
2\sqrt{\alpha\lambda}\sqrt{T_{r,\ast}-T_r}
+
O(T_{r,\ast}-T_r)
$$
Thus each branch contribution has at worst the local bound
$$
\left\|
\mathbf A_{ij,\pm}(T_r)
\right\|
\le
\frac{C}{\sqrt{T_{r,\ast}-T_r}}
$$
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

The same conclusion holds for a finite-order algebraic caustic $g\sim (T_t-T_{t,\ast})^m-\lambda(T_r-T_{r,\ast})$ with finite $m > 1$: the transmitter-side weight scales like $|T_r-T_{r,\ast}|^{-(m-1)/m}$, whose exponent remains below one, so the branch strength is locally integrable in reception time when separation stays positive. A persistent interval with $D_t=0$, a cusp with no finite-order normal form, or a simultaneous collision-floor failure is not covered by this impulse lemma and must remain in the regularized chart. The regularized prescription is therefore to integrate the acceleration through a certified ordinary caustic transit and retain the finite $\Delta\mathbf V$; the state is not held exactly on $D_t=0$ as an infinite-acceleration constraint.

The singular set should be routed by stratum, not by the single phrase "small denominator." Let
$$
\Sigma_{ij}
=
\{(T_r,T_t,\lambda): g(T_r,T_t;\lambda)=0,\ \partial_{T_t} g(T_r,T_t;\lambda)=0\}
$$
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
Since $\partial_{T_t}g_{ij}(T_r;T_t)=D_{t,ij}(T_r;T_t)=c_fJ_{ij}^{t}(T_r;T_t)$, the transmitter-time collapse supplies the transmitter-side weight. The numerator $c_f$ fixes the static-transmitter normalization and may instead be absorbed into $\kappa$ if that convention is stated consistently. Receiver motion remains in the root-playback derivative $D_r/D_t$, but not in the instantaneous acceleration weight.

Numerical implementations discretize this representation by sampling candidate emission times and solving for the active roots. The familiar “sum over spherical wake surfaces” is therefore a numerical realization of the same branch-selection rule, not a separate physical mechanism.

**Simple-root transport lemma.** Let
$$
F_{ij}(T_r,S)=\|\mathbf X_i(T_r)-\mathbf X_j(S)\|-c_f(T_r-S)
$$
Here $S$ is a local placeholder for the branch's emission-time root as reception time varies; it is not a third physical time coordinate. On the physical branch, $S(T_r)=T_t$. Suppose $F_{ij}(T_r,S(T_r))=0$ on an interval where the active root is simple. Then $S(T_r)$ is differentiable and
$$
\frac{dS}{dT_r}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T_r;S)\cdot\mathbf V_i(T_r)}
{c_f-\hat{\mathbf{r}}_{ij}(T_r;S)\cdot\mathbf V_j(S)}
=
\frac{1-\hat{\mathbf{r}}_{ij}\cdot\mathbf V_i/c_f}{J^t_{ij}(T_r;S)}
$$
Thus a simple causal root moves continuously with receiver time as long as the denominator stays away from zero. Simulations should track this root-transport residual alongside the root residual and the $J$ floor; failure of the transport equation is a branch-chart failure, not an ordinary acceleration fluctuation.

#### Transmitter-Side Roots, Acceleration Weight, and Action Residual

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
Only the transmitter velocity projection along $\hat{\mathbf r}_{ij}$ appears in this transversality floor. Tangential transmitter motion still matters through the transmitter path, active root set, separation vector, and inactive-root gaps, but it is not a second instantaneous multiplier.

**Signed root playback.** The receiver velocity controls how the same causal root moves as reception time advances:
$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{1-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_i(T_r)/c_f}
{1-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})/c_f}.
$$
This ratio is a transport quantity, not an acceleration multiplier. The acceleration weight is
$$
W_{ij}^{\mathrm{acc}}(T_r;T_{t,\ell})
=
\frac{c_f}
{\left|c_f-\hat{\mathbf r}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})\right|}.
$$
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
with the same branch floors and boundary convention used by the branch chart. If this residual is retained rather than cancelled, it must close as a wake-history term in the same energy, momentum, and angular-momentum account. This residual condition does not alter the transmitter-side law. It is the test for promoting the action scaffold in [Exact Nonlocal Lagrangian](#exact-nonlocal-lagrangian) after the same transmitter-side floors, acceleration weights, signed root-playback records, and boundary convention have been declared.

#### Branch-Chart Closure Object

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
and the section return is stable, for example
$$
\rho\!\left(M_{\mathcal{S}}\vert_{E_\perp}\right)
\le
1-\lambda_{\mathrm{sec}},
\qquad
\lambda_{\mathrm{sec}}>0
$$
The inactive-gap condition means that nearby discarded causal roots remain separated from the active chart; the stability condition means that a small transverse section error is trapped rather than amplified.

Plain language: a branch chart is the replayable local record that says which
causal roots are active, which nearby roots stay inactive, how much history is
needed, and whether the returned section remains stable under small errors.

Equivalently, $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ is the local trivialization data for the causal-root sheaf near the retained history. Promotion requires more than naming the active roots: the map from retained history and section coordinates to active roots, receiver-side branch acceleration contributions, and wake-history increment records must be locally invertible onto the declared chart image, with inverse conditioning controlled by $\nu_J$, $\nu_{\mathrm{rec}}$, the inactive gaps, the finite memory margin, and $\lambda_{\mathrm{sec}}$. A plotted orbit with no controlled inverse is a trace, not a branch chart.

**Local promotion lemma.** If a candidate history supplies $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active-root floors, positive inactive gaps, finite memory, bounded return residual, and stable section monodromy, then the history may support a local master-equation closure claim on that section. The lemma does not prove global closure, eliminate all folds, control the $\eta\to0$ limit, or certify unrelated histories. It only promotes the branch chart from a numerical trace to a locally replayable causal-root closure record.

#### State-Dependent Delay Compatibility

A branch-chart closure object must also be compatible with the delayed history space that generates the active roots. Fix a retained history tube
$$
\mathcal{U}_{\mathfrak{B}}
\subset
C^1\!\left([-h,0],(\mathbb{R}^3)^N\right)
$$
around the returned history segment. For each active branch record $\ell$, write its emission offset as $\theta_\ell(\phi)\in[-h,0)$ for a history $\phi\in\mathcal{U}_{\mathfrak{B}}$, and define
$$
F_\ell(\phi,\theta)
=
\left\|
\phi_i(0)-\phi_j(\theta)
\right\|
-c_f(0-\theta)
$$
The branch chart is history-compatible on $\mathcal{U}_{\mathfrak{B}}$ only if
$$
F_\ell(\phi,\theta_\ell(\phi))=0,
\qquad
\left|\partial_\theta F_\ell(\phi,\theta_\ell(\phi))\right|
\ge c_f\nu_J>0
$$
and if every inactive complement remains separated by the declared positive gap. Under these conditions the implicit-function theorem gives $C^1$ dependence of $\theta_\ell$ on the retained history, so the branch acceleration, root-transport residual, transmitter-side acceleration-weight record, and wake-history Noether increments are functionals on one local history chart rather than pointwise records that only happen to close at one evaluation time. This is the reconstruction-regularity content of the branch chart: the root reconstruction has an inverse bound controlled by the transversality floor, schematically $\|D\theta_\ell\|\lesssim (c_f\nu_J)^{-1}$ times the history-evaluation norm, until a fold or chart boundary is reached.

This compatibility condition is a theorem-target requirement, not a new acceleration law. It says that a promoted branch chart must define a locally replayable delayed functional system: nearby retained histories must keep the same root identities, positive transmitter-side Jacobian floor, bounded transmitter-side acceleration-weight record, inactive gaps, and finite memory depth until a declared fold, branch transition, or chart boundary is reached.

#### Local-To-Global Branch-Chart Gluing Target

The branch-chart object above also defines a candidate causal-root sheaf for global closure. For an open history or parameter neighborhood $U$, let
$$
\mathcal{F}_{\mathrm{root}}(U)
=
\{\text{admissible branch charts on }U\text{ with the declared regularization data}\}
$$
and restrict a chart from $U$ to $V\subset U$ by restricting its active-root records, inactive gaps, memory tube, and endpoint convention. The implicit-function theorem supplies the local restriction maps while the root identities remain simple.

Global closure is the additional statement that local sections of $\mathcal{F}_{\mathrm{root}}$ glue. On an overlap $U_\alpha\cap U_\beta$, two local charts must agree not merely on the plotted trajectory but on the signed causal-root ledger, branch labels, endpoint convention, wake-history charges, and transition metadata. The global branch charts are the $H^0$ sections of this sheaf over the declared history window. A mismatch on triple overlaps defines a Cech-style obstruction class in $\check H^1(\{U_\alpha\};\mathcal{F}_{\mathrm{root}})$: locally replayable charts may exist while no single global branch chart exists. This is a theorem target, not a new postulate. It gives proof programs an explicit failure mode between "local residuals are small" and "the Master Equation branch is globally closed."

#### Dual-Mollified Absolute-Time Evolution Law

For proof work, branch sums should be derived from one regularized absolute-time law rather than treated as the primary definition through every causal fold. Fix a memory horizon
$$
h>0
$$
a causal-wake-surface width
$$
\eta>0
$$
and a short-distance core scale
$$
\epsilon_c>0
$$
Define
$$
\mathbf r_{ij}(T_r,T_t)
\equiv
\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
r_{ij}(T_r,T_t)\equiv \|\mathbf r_{ij}(T_r,T_t)\|
$$
and, away from the zero vector,
$$
\widehat{\mathbf r}_{ij}(T_r,T_t)
\equiv
\frac{\mathbf r_{ij}(T_r,T_t)}{r_{ij}(T_r,T_t)}
$$
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
At $\mathbf r_{ij}=\mathbf 0$, the softened vector kernel multiplying
$\delta_\eta$ is defined by its continuous extension, which is $\mathbf 0$.

The sign convention remains
$$
\sigma_{ij}=\mathrm{sign}(q_iq_j)
$$
This is the convention used in the exact branch law. For equal-magnitude charges
$$
|q_i|=\epsilon
$$
the factor
$$
|q_iq_j|
$$
reduces to
$$
\epsilon^2
$$

This equation is the reference law for certification work on the dual-mollified problem. The causal-surface mollifier
$$
\delta_\eta
$$
selects causal surfaces with finite width, while
$$
\epsilon_c
$$
smoothly regularizes the near-collision inverse-square amplitude. The factor
$c_f$ supplies the static-transmitter normalization. On a finite simple-root
chart, collapse of the causal-surface delta function gives
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
Thus the $\epsilon_c\to0^+$ limit away from coordinate coincidence recovers
the canonical inverse-square transmitter-side branch law. Branch-resolved
formulas are local reductions of this equation on finite simple-root charts.
They should not be used as the global definition across causal folds, caustic
transit, or chart-boundary verification.

The two regulators quarantine different singular loci. The width $\eta$ regularizes the causal-surface collapse, branch folds, and caustic-transit impulse; the core scale $\epsilon_c$ regularizes the coincidence or diagonal collision locus. A theorem packet may refine them together for computation, but a sharp-limit claim must state which of $\eta\to0^+$ and $\epsilon_c\to0^+$ is being taken, and why the other singular locus remains controlled during that limit.

Coordinate coincidence is also a provenance question, not an annihilation rule. Two architrinos may share $\mathbf X_i(T)=\mathbf X_j(T)$ on one absolute-time slice only as a boundary case of the retained history record; the next admissible update is determined by their identities, polarities, velocities, past causal-wake ledgers, and the same $\eta,\epsilon_c$ convention. If two like-polarity records agree through the retained memory window up to label permutation, the deterministic law is quotient-degenerate: relabeling the records changes no acceleration contribution until a provenance-visible history distinguishes them. If the polarities, velocities, or retained path histories differ, later incoming causal wakes can separate the records even though their current coordinates coincided. Thus the $r=0$ stratum is not a contact interaction or annihilation channel. It is a regularized or quarantined branch condition whose continuation must preserve provenance.

#### Finite-Regulator Pathology Quarantine Theorem Target

The classical point-transceiver pathologies are not closed by the sharp branch formula alone. The theorem target is finite-$\eta$, branch-chart local, and conditional on one regularized action and energy convention. Fix a finite architrino set, a finite window $W=[T_a,T_b]$, a memory depth $h < \infty$, a causal-surface width $\eta > 0$, a core scale $\epsilon_c > 0$, and a branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
$$
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
where $\Sigma_{\mathrm{transit}}$ has a unique finite post-transit chart, $\Sigma_{\mathrm{bif}}^{\mathrm{multi}}$ has a finite labeled family of admissible continuations, and $\Sigma_{\mathrm{sing}}^{\mathrm{fail}}$ lacks a promoted finite chart. A trajectory crossing this boundary is not promoted as a closed Master Equation solution until the appropriate route is certified. It is routed to branch transition, finite multistability, caustic transit, core-regularization repair, finite-window leakage, or $\eta$-ladder failure according to which boundary component is reached.

The validation residuals consumed by this theorem target are the root residual, root-transport residual, active transmitter-side Jacobian floor, transmitter-side acceleration-weight interval, inactive-gap residual, finite-memory residual, return residual, finite-window energy residual $\mathcal{R}_E$, momentum residual $\mathcal{R}_P$, angular-momentum residual $\mathcal{R}_J$, Euler residual of the same action, endpoint or period-cut leakage, transition-observable residuals across $\eta$ refinement, and the symplectic residual $\mathcal{R}_{\Omega}$ when the branch is promoted to a reduced Hamiltonian chart. The theorem is finite-$\eta$ only; any zero-width or infinite-system statement requires the separate convergence boundary stated in the regularization package.

---

#### Regularized Action-Energy Diagnostic

For computation with finite causal-wake-surface width $\eta>0$, an energy diagnostic must use the same time-normalized scalar kernel as the nonlocal action. When one wants a quadratic kinetic bookkeeping proxy, use a single universal conversion constant $\mu_{\text{arch}}$ rather than particle-specific substrate masses:
$$
E_{\text{tot}}^{(\eta)}(T_r)
= \sum_i \frac{1}{2} \mu_{\text{arch}} \left\|\mathbf V_i(T_r)\right\|^2
+ E_{\text{wake}}^{(\eta)}(T_r)
$$
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
Here $h$ bounds the retained causal memory. On a simple sharp root, integrating the delta function produces the transmitter-side factor once:
$$
E_{\text{wake}}^{\mathrm{sharp}}(T_r)
=
\frac{1}{2}\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\mu_{\text{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)}{r_{ij}(T_r;T_t)}.
$$
The ordered sum and factor $1/2$ count each pair once. The positive sign is required by the declared polarity convention: for a static like-polarity pair, outward acceleration must lower a positive interaction charge. An inverse-square expression would mix an acceleration density with an energy kernel, have dimensions of acceleration rather than energy, and insert the root weight before a delta collapse that generates it.

Plainly: the energy row uses a $1/r$ action kernel. Its delta function supplies the moving-transmitter weight during root evaluation; that weight is not inserted by hand a second time.

This expression remains a diagnostic unless it is derived from the same time-translation-invariant action regularization as the acceleration and boundary charge. If the dual-mollified law uses a core cutoff $\epsilon_c$, the energy diagnostic must carry the same cutoff convention. The theorem-level nonlocal charge is the boundary functional in [Action-Level Wake-Energy Functional at a Time Boundary](#action-level-wake-energy-functional-at-a-time-boundary).

### Causal Interaction Set (The Geometry of Delay)

#### Definition of Causal Emission Times

For a receiver at position $\mathbf X_i(T_r)$ and a transmitter with worldline $\mathbf X_j(T')$, the **causal emission times** $\mathcal{C}_{ij}(T_r)$ are all past times $T_t<T_r$ such that a causal wake surface emitted by transmitter $j$ at $T_t$ arrives at receiver $i$ at reception time $T_r$.

**Causal constraint:**

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t)
$$

where $c_f$ is the field speed (set to 1 in natural units).

**Notation:**

$$
\mathcal{C}_{ij}(T_r) = \Big\{ T_t<T_r \;\Big|\; \|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t) \Big\}
$$

#### Causal-Time Map and Root Topology

For fixed reception time $T_r$, define the causal-time map

$$
f_{T_r}^{(ij)}(T_t)
\equiv
T_t + \frac{1}{c_f}\,\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|,
\qquad
F_{T_r}^{(ij)}(T_t)\equiv f_{T_r}^{(ij)}(T_t)-T_r
$$

Then causal emission times are exactly the roots:

$$
T_t\in \mathcal{C}_{ij}(T_r)\quad \Longleftrightarrow\quad F_{T_r}^{(ij)}(T_t)=0
$$

Operationally, this is the branchwise transmitter-to-receiver reading of the dynamics. The transmitter path supplies a path-history map $T_t\mapsto(\mathbf X_t(T_t),\mathbf V_t(T_t))$, while the receiver supplies the event data $(\mathbf X_r(T_r),\mathbf V_r(T_r),T_r)$. Solving $F_{T_r}^{(r\leftarrow t)}(T_t)=0$ selects exactly those transmitter-history points whose causal isochrons are received at that event. Each selected root therefore maps one transmitter-history branch into one receiver-local line of action; the delay-map Jacobian below records how the uniform transmitter emission-time measure is mapped into a compressed or dilated received causal-surface density. When multiple roots exist, the causal-root ledger is the bookkeeping of these simultaneous transmitter-to-receiver branch matches.

The one-dimensional delay-map Jacobian is

$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
=
1-\frac{\hat{\mathbf{r}}_{ij}(T_r;T_t)\cdot \mathbf V_j(T_t)}{c_f}
$$

On a bounded history interval $I_{T_r}$ (e.g., simulation memory window), define:

- Unsigned root count: $N_{ij}(T_r)\equiv \#\mathcal{C}_{ij}(T_r)$,
- Signed Brouwer degree:
  $$
  D_{ij}(T_r)\equiv \deg(F_{T_r}^{(ij)},I_{T_r},0)=\sum_{T_t\in\mathcal{C}_{ij}(T_r)} \mathrm{sign}\!\left(\frac{dF_{T_r}^{(ij)}}{dT_t}\Big|_{T_t}\right)
  $$

#### Delay-Map Theorem Pack (Formalized)

Fix a bounded history interval $I_{T_r}=[a,b]\subset(-\infty,T_r)$ and define regularity conditions:

- **(R1) Boundary regularity:** $0\notin F_{T_r}^{(ij)}(\partial I_{T_r})$ (no root crossing at $a$ or $b$).
- **(R2) Simple roots:** if $F_{T_r}^{(ij)}(T_t)=0$, then $\frac{dF_{T_r}^{(ij)}}{dT_t}(T_t)\neq 0$.

**Theorem 1 (Degree invariance on regular families).**  
For any continuous deformation of worldlines/parameters that preserves (R1)-(R2), the signed degree
$D_{ij}(T_r)=\deg(F_{T_r}^{(ij)},I_{T_r},0)$ is invariant.

*Proof sketch:* In 1D, $D_{ij}$ is the oriented count of simple roots. Under a regular homotopy, roots move continuously and cannot appear/disappear in the interior without becoming critical, and cannot enter/leave through the boundary by (R1). Hence the oriented count is constant.

**Proposition 2 (Sub-$c_f$ monotonic single-hit regime).**  
If there exists $V_*<c_f$ such that $\|\mathbf V_j(T_t)\|\le V_*$ for all $T_t\in I_{T_r}$, then
$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
\ge
1-\frac{V_*}{c_f}
>0
$$
so $F_{T_r}^{(ij)}$ is strictly increasing on $I_{T_r}$. Therefore it has at most one root. If additionally $F_{T_r}^{(ij)}(a)<0<F_{T_r}^{(ij)}(b)$, then exactly one root exists and
$$
N_{ij}(T_r)=1,\qquad D_{ij}(T_r)=+1
$$

*Proof sketch:* Strict positivity of the Jacobian gives monotonicity, hence injectivity. Existence under endpoint sign change follows by the intermediate value theorem.

This proposition is retained-interval local. It controls roots whose emission times lie inside the declared interval $I_{T_r}$; it does not remove older path-history roots emitted outside $I_{T_r}$, including self-hit candidates from an earlier super-field-speed interval that remain inside a longer memory window. If the model retains such persistent-memory roots, the speed bound must be checked on the enlarged interval that contains their emission times.

**Proposition 3 (Fold criterion and even-jump law).**  
In a one-parameter family $F^{(ij)}(T_t;\lambda)$ (with $\lambda$ a control parameter, e.g. receiver time or orbit parameter), interior root-count changes occur only at fold points:
$$
F^{(ij)}(T_t;\lambda)=0,\qquad \partial_{T_t}F^{(ij)}(T_t;\lambda)=0
$$
For generic folds ($\partial_{T_tT_t}F\neq0$, $\partial_\lambda F\neq0$), one root pair is created/annihilated, so
$$
\Delta N_{ij}=\pm2,\qquad \Delta D_{ij}=0
$$
between regular intervals.

*Proof sketch:* Local normal form near a generic fold is equivalent to $u^2\pm\mu=0$, yielding either 0 or 2 simple roots. The two roots carry opposite Jacobian signs, so the degree is unchanged.

This delay-map theorem pack is foundational rather than merely model-specific. Within this chapter it serves as the fold-geometry reference for delayed-root constructions: regular charts preserve signed degree, while branch creation or annihilation requires a Jacobian-degenerate fold.

#### Signed Causal-Root Complex

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
Then
$$
N_{ij}=\dim C_+^{ij}+\dim C_-^{ij},
\qquad
D_{ij}=\dim C_+^{ij}-\dim C_-^{ij}.
$$
At a generic fold, the local boundary pairing creates or removes one positive and one negative generator, preserving $D_{ij}$ while changing $N_{ij}$ by two. In this reading, Theorem 1 is invariance of the Euler-characteristic-like signed count, and Proposition 3 is the elementary opposite-sign pair surgery.

An admissible retained record therefore reports the signed grading $(C_+^{ij},C_-^{ij})$, not only raw hit counts. The binary and Noether braid ledgers $N_s$ and $M_p$ are admissible topological labels only after their self-hit and partner-hit entries inherit this signed-root-complex data, together with the phase-return degree data used by the [assembly topological charge](../noether-braid/noether-braid-topological-charge.md) and resonance-lock chapters.

**Proposition 4 (forward partner-root starvation under field-speed drift).**
Let a candidate translating branch have center drift $u\hat{\mathbf e}$ on the retained interval, with $u\ge0$ and $\|\hat{\mathbf e}\|=1$. Write two partner constituents as
$$
\mathbf X_i(T_r)=uT_r\,\hat{\mathbf e}+\boldsymbol{\rho}_i(T_r),
\qquad
\mathbf X_j(T_t)=uT_t\,\hat{\mathbf e}+\boldsymbol{\rho}_j(T_t)
$$
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
Hence
$$
\left(c_f-u\right)\Delta\ge d_{\min}
$$
If $u\ge c_f$, no such forward partner root exists. If $u<c_f$, any such root has the lower delay bound
$$
\Delta\ge\frac{d_{\min}}{c_f-u}
$$
so the required memory depth diverges as $u\to c_f^-$.

This is a kinematic starvation result, not an acceleration-balance approximation. It says that a forward structural partner root cannot be retained at or above field-speed center drift because the causal wake cannot catch the leading receiver. A bound assembly branch that requires at least one such forward partner root for structural closure therefore cannot preserve the same causal-root ledger for sustained drift $u\ge c_f$. The proposition does not impose a speed cap on a single architrino, on internal curved self-hit motion, or on history-supported super-field-speed components; it applies to center translation of an internally bound branch whose leading-side partner closure is part of the retained ledger.

With finite retained memory $h$ and internal branch period $T_{\mathrm{int}}$, the same obstruction has a graded scale:
$$
\Lambda_{\mathrm{starv}}
=
\frac{\Delta_{\mathrm{fwd}}}{T_{\mathrm{int}}}
\ge
\frac{d_{\min}}{(c_f-u)T_{\mathrm{int}}}.
$$
The forward root remains available to the retained chart only while $\Delta_{\mathrm{fwd}}<h$, equivalently
$$
u<u_{\mathrm{crit}}
\equiv
c_f-\frac{d_{\min}}{h}.
$$
Thus starvation is a root-complex obstruction before it is a speed slogan: if the assembly requires that forward generator, the bare causal kernel cannot carry the same branch chart through $u_{\mathrm{crit}}$. Any promoted supra-$u_{\mathrm{crit}}$ branch must show a Noether-sea or assembly reorganization that removes or replaces the forward root without hiding a memory-window failure.

This is not the same event as the interior fold law of Proposition 3. A generic interior fold creates or removes one positive and one negative generator and therefore preserves the signed degree $D_{ij}$. Forward-root starvation is a memory-boundary event: a generator leaves the retained interval $[T_r-h,T_r)$ because its required delay has crossed the available history depth. The finite-window signed degree $D_{ij}^{(h)}$ may therefore change unless a replacement generator enters through the boundary or the branch chart is reorganized by the Noether sea. The retained branch ledger records this as boundary-exit degree bookkeeping, not as a $\Delta N=\pm2,\Delta D=0$ fold.

#### Separator Taxonomy

Three distinct events terminate a simple-root branch chart. They have different degeneracy conditions, different velocity arguments, and different ledger consequences, and a proof program that keys its arc partition to a single "field-speed separator" will conflate them.

| Event | Condition | Velocity that appears | Root ledger | Branch strength | Certificate route |
| --- | --- | --- | --- | --- | --- |
| **Transmitter-side fold** | $D_{t,ij}=0$, i.e. $\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}=c_f$ | transmitter, at emission time | fold: $\Delta N_{ij}=\pm2$, $\Delta D_{ij}=0$ (Proposition 3) | $W_{ij}^{\mathrm{acc}}\to\infty$ | finite-order caustic normal form and the finite-impulse lemma; cusps and higher strata route to a singular-stratum chart |
| **Receiver-side playback turn** | $D_{r,ij}=0$, i.e. $\mathbf V_i(T_r)\cdot\hat{\mathbf r}_{ij}=c_f$ | receiver, at reception time | unchanged: $\Delta N_{ij}=0$, $\Delta D_{ij}=0$ | acceleration remains finite when $D_t\ne0$ | signed root playback reverses; no acceleration event route is needed |
| **Memory-boundary exit** | $T_r-T_{t,\ell}\to h$ | either, through the delay | $\Delta N_{ij}=\pm1$ possible; $D_{ij}^{(h)}$ may change | finite | boundary-exit degree bookkeeping (Proposition 4); *not* a fold |

Two consequences follow immediately.

First, $\|\mathbf V_i(T_r)\|=c_f$ is by itself none of these. It is a receiver-side playback turn only for branches whose line of action is aligned with the receiver's motion, and it is a transmitter-side fold only for the transmitter, at emission time, on the branches it emitted. A reduction that identifies the two manufactures a caustic at $\|\mathbf V_i\|=c_f$ that the exact law does not have. Locally affine branch tables are candidate generators; they may not be used to locate separators.

Second, a closed-cycle parity ledger cannot be written over folds alone. On a cycle, $\sum_\Sigma\Delta N_{ij}=0$ and $\sum_\Sigma\Delta D_{ij}=0$ hold only after boundary-exit events are counted in the same sum, and those events carry odd unsigned jumps. Requiring every local jump to be even is a sufficient test only on charts certified free of memory-boundary exit.

#### Single-Hit Regime

In the **sub-field-speed regime** ($\|\mathbf V_j(T_t)\| < c_f$ locally), Proposition 2 applies, and the map is strictly monotone:

$$
\frac{dF_{T_r}^{(ij)}}{dT_t}
\ge
1-\frac{\|\mathbf V_j(T_t)\|}{c_f}
>0
$$

so $f_{T_r}^{(ij)}$ is a diffeomorphic time map on $I_{T_r}$, and the causal set is generically a singleton:

$$
N_{ij}(T_r)=1,\qquad D_{ij}(T_r)=+1
$$

**Intuition:** If the transmitter is moving slower than the field speed, its past emissions form a non-overlapping family of concentric (or nearly concentric) isochrons. Any given receiver location lies on exactly one of those causal surfaces.

#### Multi-Hit Regime

In the **super-field-speed regime** ($\|\mathbf V_j\| > c_f$ at some past times), the delay map can fold when
$\hat{\mathbf{r}}_{ij}\cdot\mathbf V_j > c_f$, i.e. when $dF_{T_r}^{(ij)}/dT_t$ changes sign. Then $\mathcal{C}_{ij}(T_r)$ can contain multiple solutions:

$$
\mathcal{C}_{ij}(T_r) = \{T_{t,1}, T_{t,2}, \ldots, T_{t,m}\}
$$

Fold bifurcations create/annihilate roots in pairs. The signed degree $D_{ij}$ stays topologically fixed between folds, while the unsigned branch count $N_{ij}$ jumps by even integers.

Any assembly-level use of a folded root-count transition must define its persistent indices, action partition, and frequency-lock map in the owning assembly chapter. The even-jump theorem alone supplies none of those additional identifications.

**Intuition:** If the transmitter outruns its own emissions, it can emit multiple wake surfaces that later converge and intersect the same receiver location simultaneously (or nearly so, within regularization width $\eta$).

**Example:** In uniform circular motion at $\|\mathbf V\| > c_f$, a receiver can be hit by wake surfaces from multiple points on the transmitter's orbit (different "winding numbers" $m$ due to self-hit dynamics).

#### Self-Hit Regime

When $j = i$ (transmitter and receiver are the same architrino), the causal set $\mathcal{C}_{ii}(T_r)$ represents **self-hits**: times when architrino $i$ intersects its own past emissions.

**Self-hit condition:**

$$
\|\mathbf X_i(T_r) - \mathbf X_i(T_t)\| = c_f(T_r-T_t), \quad T_t<T_r
$$

This equation nominates a same-transmitter causal root. It becomes an admitted self-hit contribution only on a retained branch chart: the coincident $T_t=T_r$ branch is excluded by the $H(0)=0$ convention, the root has positive separation or explicit regularization data, the transversality/Jacobian floor is positive, the same-record transmitter-side acceleration weight $W_{ii}^{\mathrm{acc}}$ is retained on its floor or certified bounded interval $\nu_{\mathrm{rec}}$, the active-root count is controlled, inactive-root gaps and finite memory are certified, and the stability/action ledger entries required by the claimed assembly branch close.

**Interval-speed lemma.** Let $\Delta=T_r-T_t>0$ and suppose $\mathbf X_i$ is absolutely continuous on $[T_t,T_r]$. If
$$
\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|=c_f\Delta
$$
then
$$
\frac{1}{\Delta}\int_{T_t}^{T_r}\|\mathbf V_i(T')\|\,dT'\ge c_f
$$
This follows immediately from the triangle inequality. Therefore strict sub-field-speed motion on the whole interval forbids a nontrivial self-hit. A simple noncoincident self-hit requires super-field-speed motion somewhere along the interval, except for the degenerate straight field-speed case where the causal branch is tangent and the simple-root Jacobian condition fails.

**Critical requirements for self-hit:**

1. **Curvature**: Straight-line motion admits no self-hits (the worldline never intersects its own past causal isochrons).
2. **Super-field-speed interval history**: along the interval from emission to reception, the architrino must have exceeded $c_f$ somewhere, unless the branch is the degenerate straight field-speed case excluded by the simple-root assumptions.
3. **Regular branch admissibility**: the same-transmitter root must be retained on a branch chart with a positive transversality/Jacobian floor, a retained same-record transmitter-side acceleration-weight interval ($W_{ii}^{\mathrm{acc}}$ on its floor or certified bounded interval $\nu_{\mathrm{rec}}$), controlled distance or regularization data, inactive-root gaps, finite memory, and the stability/action ledger entries required by the claimed assembly branch.

**Key clarification:**

- **Self-hits can be plural**: $\mathcal{C}_{ii}(T_r)$ can contain multiple emission times (e.g., multiple winding numbers in circular motion).
- **Persistent memory**: Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from wake surfaces emitted during the super-field-speed phase. The self-hit regime is **not** instantaneously tied to current velocity; it depends on **path history**.

**Implication:** Self-hit is a **non-Markovian memory effect**. The architrino's current acceleration depends on whether it **ever** exceeded $c_f$ in the past and curved, not just on its current state.

#### Geometric Interpretation

**Visualize the causal constraint as:**

- Receiver at $\mathbf X_i(T_r)$ "now"
- Transmitter path $\{\mathbf X_j(T'): T' < T_r\}$ in the past
 - Field-speed causal wake surface: the expanding isochron at radius $c_f(T_r-T_t)$ centered at $\mathbf X_j(T_t)$
 - **Causal emission times**: where this wake surface **intersects** the receiver's current location

For each $T_t \in \mathcal{C}_{ij}(T_r)$, draw a line from $\mathbf X_j(T_t)$ to $\mathbf X_i(T_r)$; this is the **line of action** $\hat{\mathbf{r}}_{ij}$ for the acceleration.

This geometry should be read in terms of the transmitter path, the expanding causal isochrons centered on past emission points, and the receiver event at which one or more of those isochrons are intersected.

#### Reduced Translating-Loop Delay Checkpoint

To obtain a nontrivial analytic checkpoint from the same causal constraint, consider a translating phase-locked two-leg internal loop, with one leg parallel to motion and one transverse. Let the loop center translate with speed $v$ through the Euclidean void while every wake still propagates at the primitive field speed $c_f$. Define
$$
\beta_f \equiv \frac{v}{c_f},\qquad C(v)\equiv \frac{L_\parallel(v)}{L_0}
$$
with rest bond length $L_0$.

Parallel round-trip delay:
$$
T_\parallel(v)=\frac{L_\parallel}{c_f-v}+\frac{L_\parallel}{c_f+v}
=\frac{2L_0}{c_f}\frac{C(v)}{1-\beta_f^2}
$$

Transverse one-way delay satisfies
$$
c_f^2\Delta_\perp^2=L_0^2+v^2\Delta_\perp^2
\;\Rightarrow\;
\Delta_\perp=\frac{L_0}{c_f\sqrt{1-\beta_f^2}}
$$
so
$$
T_\perp(v)=2\Delta_\perp=\frac{2L_0}{c_f}\frac{1}{\sqrt{1-\beta_f^2}}
$$

If internal phase locking is operationally isotropic (no orientation-dependent clock leakage),
$$
T_\parallel(v)=T_\perp(v)
$$
then necessarily
$$
C(v)=\sqrt{1-\beta_f^2},\qquad
T(v)=\frac{T_0}{\sqrt{1-\beta_f^2}},
\quad
T_0=\frac{2L_0}{c_f}
$$

This gives a purely substrate-level period-stretch checkpoint. It says only that preserving the same internal phase closure while the receiver translates forces the physical period $T$ to increase in absolute time unless the longitudinal leg shortens. The full unresolved step is proving the same absolute-period scaling for the complete multi-hit NFDE Noether braid dynamics without reducing to a two-leg closure model.

The forward parallel leg carries the same starvation constraint as Proposition 4 with $d_{\min}$ replaced by the leading longitudinal leg length $L_\parallel$. Let $h_b^{\mathrm{lock}}(v)$ be the retained-history depth measured on the locked moving branch, distinct from the generic analysis horizon $h$. The two-leg checkpoint is admissible as a retained-record model only in the starvation-free regime
$$
v<c_f-\frac{L_\parallel}{h_b^{\mathrm{lock}}(v)}.
$$
Above that scale, the checkpoint no longer tracks the same causal-root ledger: the full Noether braid proof must show a ledger reorganization, a sea-mediated replacement record, or a declared failure of the translating-loop reduction.

The two-leg loop is only a checkpoint. It has two phase points and one chosen orientation relative to the absolute motion. A real assembly has an effective internal phase distribution over a finite three-dimensional volume, and operational isotropy has to hold for all loop orientations at once. The closure target is therefore a full oblate-envelope-to-sphere reduction in the internal Family-A phase space, not just the equality
$$
T_\parallel=T_\perp
$$
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
with every term evaluated in absolute time. The residual is the finite-loop-size, non-Markovian correction caused by acceleration during one internal phase cycle. Observer-inference chapters may later translate a branch-certified period record into clock and metric language, but no such translation is part of the Master EOM.

---

## Master Equation and DDE Formulation

### The Master Equation (Canonical Form)

#### Per-Hit Acceleration

For each causal emission time $T_t \in \mathcal{C}_{ij}(T_r)$, define:

**Separation vector and distance:**

$$
\mathbf{r}_{ij}(T_r;T_t) = \mathbf X_i(T_r) - \mathbf X_j(T_t), \quad r_{ij} = \|\mathbf{r}_{ij}\|
$$

**Unit direction (line of action):**

$$
\hat{\mathbf{r}}_{ij} = \frac{\mathbf{r}_{ij}}{r_{ij}} = \frac{\mathbf X_i(T_r) - \mathbf X_j(T_t)}{\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\|}
$$

**Polarity sign factor:**

$$
\sigma_{ij} = \mathrm{sign}(q_i q_j) = \begin{cases}
+1 & \text{like polarities (repel)} \\
-1 & \text{unlike polarities (attract)}
\end{cases}
$$

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

$$
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\equiv
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
\qquad
m_{ij}(T_r;T_t)
\equiv
\frac{D_{r,ij}(T_r;T_t)}{D_{t,ij}(T_r;T_t)}
$$

**Per-hit acceleration contribution:**

$$
\mathbf A_{ij}(T_r;T_t)
=
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T_r;T_t)
\, \hat{\mathbf{r}}_{ij}
$$

If a force-like bookkeeping symbol is desired, define
$$
\mathbf{F}_{ij}(T_r;T_t) \equiv \mu_{\text{arch}}\,\mathbf A_{ij}(T_r;T_t)
$$
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

#### Total Acceleration (Sum Over All Causal Hits)

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

**Note:** $\sigma_{ii} = +1$ (like polarities repel), so self-hits are always **repulsive**.

This sum can be viewed as a **path-history branch sum**: each emission time in $\mathcal{C}_{ij}(T_r)$ marks where the receiver's worldline crosses the causal wake surface emitted at $T_t$. The integral representation above is simply the distributional encoding of this branch-selection rule.

#### Conventions and Exclusions

**Heaviside Convention ($H(0) = 0$):**

The emission at $T_t = T_r$ (instantaneous self-acceleration) is **excluded**. Formally, this is enforced by writing:

$$
\mathcal{C}_{ij}(T_r) = \Big\{ T_t<T_r \;\Big|\; \|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t) \Big\}
$$

(Strict inequality $T_t<T_r$; no $T_t = T_r$ allowed.)

**Physical justification:** The causal wake surface at the instant of emission ($r=0$, $\Delta=0$) has not yet expanded; it cannot produce self-acceleration on the transmitter at that same event. This endpoint exclusion does not certify a finite transition when a nontrivial same-transmitter root is born from that endpoint.

**No accepted $r = 0$ sharp roots:**

Because $r = c_f(T_r-T_t)$, $r = 0$ implies $\Delta = T_r-T_t = 0$. This case is excluded by $H(0) = 0$. A coincident same-transmitter birth, simultaneous core/transmitter-side-factor failure, or regulator-dependent continuation remains uncertified and must fail closed.

This also fixes the status of later short-distance regularizations. A finite core cutoff or core mollifier is not a hard exclusion sphere, an elastic contact collision, or a primitive rule saying that causal wakes are blocked by or transmitted through an opaque core. It is a declared mathematical control on the near-origin amplitude inside a regularized branch chart. In the canonical branch law, a transmitter contribution is admitted by the causal-root constraint, polarity sign $\sigma_{ij}$, separation or regularization data, transmitter-side transversality and transmitter-side control, active-root count, and the required stability/action/event accounts. A polarity-dependent short-distance kernel would therefore be an additional model term that must be derived and validated; it cannot be inserted as an unproved like-versus-opposite collision or opacity rule.

#### Superposition Principle

The Master EOM is **linear in transmitter contributions** on a declared branch chart:

$$
\mathbf A_{\text{total}}(T) = \sum_j \mathbf A_{j}(T)
$$

The causal-wake distributions from distinct transmitters superpose without mutual interference, and the receiver sums the branch accelerations that actually intersect it. Effective potentials reconstructed from those wakes also superpose in the corresponding linear diagnostic or continuum limit, but the substrate law remains the receiver-local branch sum.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the retained history of all transmitters and on the certified active causal-root records.

---

### Terms and Conventions (Detailed Breakdown)

#### Direction and Sign

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

#### Scaling and Normalization

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
This density is independent of the transmitter's state of motion. In the normalization used here, $\lambda_{\mathrm{em}}$ is absorbed into $\kappa$, so the path-history integral uses $\mathrm dT_t$ directly. The causal surfaces are continuously indexed by $T_t$; an equal-$\Delta T$ sequence is only a numerical discretization of this continuum, not the substrate emission law. This emission measure is inherited from the transceiver postulate in [Architrino: Constant-Time Emission Measure](../foundations/architrino.md#constant-time-emission-measure-postulate), its canonical home, and is a declared conditionality of the canonical boxed law above, not a derived result of this chapter.

Under the continuous uniform-emission rule stated above, transmitter motion maps the uniform $\mathrm dT_t$ measure onto a history-dependent family of expanding causal surfaces. Along a simple branch, surfaces with nearby emission labels $T_t$ and $T_t+\mathrm dT_t$ have local normal separation $\lvert D_t\rvert\,\mathrm dT_t$, where $D_t=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)$. The received causal-surface density per unit local normal distance is therefore proportional to $\lambda_{\mathrm{em}}/\lvert D_t\rvert$. Motion of the transmitter toward the active branch increases that density; motion away from the branch decreases it. After static-transmitter normalization, the geometric acceleration weight is
$$
W_{ij}^{\mathrm{acc}}
=
\frac{c_f}
{\left|c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)\right|}.
$$

**Absorption of geometric constants into $\kappa$:**

All geometric normalization factors (for example, $1/(4\pi)$ from spherical surface area) are absorbed into the coupling constant $\kappa$ by convention. The canonical per-hit law is therefore written with an explicit inverse-square factor together with the dimensionless transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$.

**Dimensional analysis:**

$$
[\kappa] = \frac{[\text{Length}]^3}{[\text{Time}]^2 [\text{Polarity}]^2}, \quad [\mathbf A] = \frac{[\text{Length}]}{[\text{Time}]^2}
$$

If the force-like bookkeeping variable $\mathbf{F}=\mu_{\text{arch}}\mathbf A$ is introduced, then $[\mathbf{F}]=[\mu_{\text{arch}}][\text{Length}]/[\text{Time}]^2$. In natural units with $c_f = 1$, $[\text{Length}] = [\text{Time}]$, and $\kappa$ has dimensions of $[\text{Length}]/[\text{Polarity}]^2$.

#### Receiver Kinematics (Radial vs Orthogonal Components)

At a given hit $(T_r;T_t)$, decompose the receiver's velocity into components parallel and orthogonal to the line of action $\hat{\mathbf{r}}_{ij}$:

$$
\mathbf V_i(T_r) = V_r \hat{\mathbf{r}}_{ij} + \mathbf V_\perp
$$

where:

- $V_r = \mathbf V_i(T_r) \cdot \hat{\mathbf{r}}_{ij}$ (radial component; positive = moving away from emission point)
- $\mathbf V_\perp = \mathbf V_i(T_r) - V_r \hat{\mathbf{r}}_{ij}$ (orthogonal component)

**Instantaneous effect of the hit:**

Because $\mathbf A_{ij}(T_r;T_t) \parallel \hat{\mathbf{r}}_{ij}$, its instantaneous effect satisfies:

$$
\frac{d}{dT_r}\mathbf V_\perp\Big|_{\text{hit}} = \mathbf{0}, \quad \frac{d}{dT_r}V_r\Big|_{\text{hit}} = \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij} = \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)
$$

**Plain language:** A hit only changes the along-the-line velocity component right now; sideways motion continues unaffected at the instant of the hit. Over time, the changing radial motion alters the trajectory and thus the subsequent orthogonal component.

**Translating-assembly deformation requirement:** The receiver kinematics described here must mechanically produce the moving-assembly deformation, branch-period stretch, and two-way signal-synchronization records that later observer-inference chapters consume. If Noether braids do not squash along the direction of motion and do not preserve one retained causal-root ledger while translating through the Noether sea, the downstream recovery program fails at the dynamics layer.

#### Work and Power

The **instantaneous power** (rate of kinetic energy change) from a single hit is:

$$
\frac{dE_k}{dT_r}\Big|_{\text{hit}} = \mathbf{F}_{ij} \cdot \mathbf V_i = \big(\mu_{\text{arch}} \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij}\big) V_r = \mu_{\text{arch}}\,\kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t) \, V_r
$$

**Key insight:** There is **no instantaneous work** on the orthogonal component. Power depends only on the radial velocity $V_r$.

**Radial motion and the $1/r^2$ factor (local trend):**

- **Inward motion** ($V_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
- **Outward motion** ($V_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.

**Important caveat:** Path-history delay shifts both the causal root $T_t$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all transmitters.

#### Moving Transceiver Geometry and Received Branch Strength

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

Then

$$
W_{ij}^{\mathrm{acc}}
=
\frac{1}{|1-\beta_f\cos\theta|},
$$

so transmitter motion compresses the emitted surface density in forward directions and dilates it in trailing directions. This is a transmitter-history effect, not a receiver-cadence multiplier and not an imported observer-level field law.

**Proposition 5 (exact transverse projection for a uniformly translating point cloud; derived).**
Let two architrinos translate with the same constant velocity
$\mathbf V=V\hat{\mathbf e}$, where $V=\|\mathbf V\|$ and
$0\leq\beta_f=V/c_f<1$. At a
reception time $T_r$, write their instantaneous ordered separation as
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
For the unique positive-delay partner root, let
$y\equiv c_f(T_r-T_t)/d$. Uniform translation of the fixed point cloud and the causal-root
constraint give
$$
\left\|
\hat{\mathbf n}+\beta_f y\hat{\mathbf e}
\right\|
=y,
\qquad
(1-\beta_f^2)y^2-2\beta_f\cos\psi\,y-1=0
$$
and therefore
$$
y
=
\frac{\alpha+\beta_f\cos\psi}{1-\beta_f^2}
=
\frac{1}{p}.
$$
The arriving separation, line of action, transmitter-side factor, and
acceleration weight are consequently
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
Substitution into the canonical per-hit law gives the exact
general-orientation acceleration
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
and, with
$\hat{\mathbf n}_{\perp}
\equiv
\hat{\mathbf n}-(\hat{\mathbf n}\cdot\hat{\mathbf e})\hat{\mathbf e}$,
its transverse projection is
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

For perpendicular instantaneous separation, $\psi=\pi/2$, define
$$
\gamma_f
\equiv
\frac{1}{\sqrt{1-\beta_f^2}}.
$$
Here $\gamma_f$ is only an abbreviation produced by the Euclidean
causal-root algebra; no relativistic transformation or observer-level
law has entered the derivation. In this configuration
$\alpha=p=1/\gamma_f$, so
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
with no expansion or truncation in $\beta_f$. The
general-orientation formula depends explicitly on $\psi$, so the
$1/\gamma_f$ result is not an orientation-independent identity.
Perpendicular separation is the only fixed orientation for which the
displayed equality holds identically in $\beta_f$; isolated
$\beta_f$-dependent angles may equal the same numerical value but do
not extend the identity to a general orientation.

This proposition is derived from the canonical per-hit acceleration,
the causal-root constraint, uniform translation of the fixed point cloud, and the
declared uniform absolute-time emission measure that supplies
$W_{ij}^{\mathrm{acc}}$. Its scope is one ordered partner hit with
$0\leq\beta_f<1$ and nonzero instantaneous separation. The
independent reference is the closed-form perpendicular projection
$\kappa|q_iq_j|/(\gamma_f d^2)$; numerical evaluation can check the
algebra but does not establish the proposition.

**Scope boundary and explicit non-claims.**

**Full-vector non-claim.** The full perpendicular-configuration vector
does not reproduce the observer-level two-body comparison target. It
retains the longitudinal component
$$
\mathbf A_{ij,\parallel}
=
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\beta_f\hat{\mathbf e}
$$
which is first order in $\beta_f$. Reversing the ordered transverse
separation reverses the transverse component but leaves this
longitudinal component unchanged.

**Parallel-separation non-claim.** For instantaneous separation
parallel to the translation, the trailing receiver has magnitude
$\kappa|q_iq_j|(1+\beta_f)/d^2$ and the leading receiver has magnitude
$\kappa|q_iq_j|(1-\beta_f)/d^2$. The observer-level comparison target
instead assigns $\kappa|q_iq_j|(1-\beta_f^2)/d^2$ to both. The
symmetric part is therefore already wrong at order $\beta_f^2$.

**Fixed-point-cloud drift non-claim.** The perpendicular pair sum is nonzero:
$$
\mathbf A_{ij}+\mathbf A_{ji}
=
2\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{d^2}
\beta_f\hat{\mathbf e}
$$
Thus a two-member configuration with fixed perpendicular separation cannot keep
the assumed common constant velocity under the canonical partner-hit law.
This is an acceleration statement, not a primitive mechanical-momentum claim.

**Covariance and recovery non-claim.** The result does not establish
Lorentz covariance of the substrate law, an observer-level two-body
law, a translating assembly branch, or a common
clock-ruler-momentum response.

The result is therefore one exactly recovered projection obtained
without relativistic input. It shows that the canonical
transmitter-side acceleration weight contains the required geometric
factor on this branch, while the longitudinal residual and pair sum
sharpen the separate question of what is missing from the line of
action. The fixed-point-cloud translation geometry does not by itself
identify the transmitter-side origin uniquely: because
$\mathbf V_i=\mathbf V_j$ here, replacing $D_t$ by $D_r$ leaves the
weight unchanged. The transmitter-side attribution instead comes
from the uniform-emission causal-surface-density derivation above.

**Falsifiers and attribution check.**

1. In normalized units $c_f=1$ with
   $\kappa=|q_iq_j|=d=1$, the perpendicular projection must equal
   $\sqrt{1-\beta_f^2}$. At $\beta_f=0.9$ and $0.99$ it must be,
   respectively, approximately $0.4358898944$ and $0.1410673598$.
   Any departure at any order overturns the exact projection claim.
2. At any $\beta_f>0$, direct evaluation of the full perpendicular
   vector must retain a longitudinal component of signed magnitude
   $\kappa\sigma_{ij}|q_iq_j|\beta_f/d^2$. A vanishing component
   contradicts the proposition and indicates an incorrect evaluator.
3. Replacing transmitter velocity by receiver velocity inside the
   weight on this fixed point-cloud branch must leave the result unchanged because
   the velocities are equal. That outcome overturns any claim that
   this projection alone uniquely identifies a transmitter-side
   weight, but it does not overturn the projection algebra. A
   discriminating check must instead hold the arriving root and
   transmitter state fixed while changing receiver velocity, or use
   $\mathbf V_i\ne\mathbf V_j$: the canonical per-hit strength must
   remain unchanged, and any receiver-velocity dependence falsifies
   the transmitter-side-only acceleration weight.

#### Exact Fixed Point-Cloud Residual

This calculation is a deliberately restricted negative control. Assume
$\mathbf X_i(T)=\mathbf R_i+\mathbf U T$ for every member, so every internal
velocity relative to the group center vanishes and every pair distance is
constant. Candidate braids do not satisfy those assumptions: their members
orbit internally and their pair distances generally vary with time.

Plainly: this subsection tests whether a frozen point cloud can drift without
deforming. It does not test an orbiting assembly.

The perpendicular example is one orientation of the resulting general
three-dimensional formula. Let an instantaneous unordered pair have unit separation
$\hat{\mathbf n}_{ij}$, common drift
$\mathbf V=\beta_f c_f\hat{\mathbf e}$, and signed inverse-square coefficient
$$
w_{ij}
\equiv
\sigma_{ij}\frac{|q_iq_j|}{d_{ij}^{2}}.
$$
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
This expression is exact only for the fixed-point-cloud common-translation ansatz and does
not assume that the pair lies in a selected plane.

Plainly: delayed partner hits do not usually cancel when the whole pair is
assigned one common velocity. Their leftover depends only on the drift
direction and the pair's instantaneous direction and signed strength.

This is not repaired by replacing the velocity sum with a polarity-weighted
one. Like-polarity weighting preserves the common-mode residual; for an
unlike-polarity pair it instead leaves a nonzero separation-direction
component. More generally, a universal differentiable mechanical map
$\sum_i f(\mathbf V_i)$ has local rate
$D f(\mathbf V)\sum_i\mathbf A_i$ on a common-drift state, so any
nondegenerate local response inherits the obstruction. The theory has not
derived $f$, and the quadratic $K_\mu$ map remains a bookkeeping convention.

Plainly: the acceleration test does not depend on a mass or momentum
definition. A future kinetic account can change the conservation ledger, but
it cannot make an assumed constant velocity constant when its calculated time
derivative is nonzero.

For an $N$-member fixed point cloud, define the signed second-moment operator
$$
W\equiv\sum_{i<j}w_{ij},
\qquad
\mathsf M\equiv
\sum_{i<j}w_{ij}\hat{\mathbf n}_{ij}\hat{\mathbf n}_{ij}^{\mathsf T},
\qquad
\mathsf K\equiv W\mathsf I-2\mathsf M.
$$
The total common-mode acceleration residual is
$$
\boxed{
\sum_i\mathbf A_i
=
2\kappa\beta_f\,\mathsf K\hat{\mathbf e}.
}
$$
Therefore the exact null condition for a declared drift direction is
$$
\mathsf K\hat{\mathbf e}=\mathbf0,
\qquad\text{equivalently}\qquad
\mathsf M\hat{\mathbf e}=\frac{W}{2}\hat{\mathbf e}.
$$

Plainly: cancellation is a signed directional-balance condition, not merely a
head count or a visual symmetry claim.

In a plane containing the drift direction, write
$\hat{\mathbf n}_{ij}=(\cos\psi_{ij},\sin\psi_{ij},0)$ in that plane. The null
condition becomes the vanishing signed second harmonic
$$
\sum_{i<j}w_{ij}e^{2\mathrm i\psi_{ij}}=0.
$$
A regular triangle and regular square satisfy this planar condition for equal
like-polarity weights. An alternating-polarity square also satisfies it because
its edge and diagonal direction orbits cancel separately. By contrast,
rotational symmetry about the drift axis only removes transverse components in
three dimensions; it does not by itself impose the required polar second
moment. For example, an equal-weight regular tetrahedron has
$\mathsf M=(W/3)\mathsf I$, hence
$\mathsf K=(W/3)\mathsf I$ and no nonzero drift-direction null.

Plainly: threefold symmetry is sufficient only in the appropriate planar
second-harmonic setting. A three-dimensional object can look highly symmetric
and still retain a common-drift residual.

If the fixed point cloud has an eigenmode
$\mathsf K\hat{\mathbf e}=\lambda\hat{\mathbf e}$ and
$\mathbf U=N^{-1}\sum_i\mathbf V_i$, then the local common-mode estimate is
$$
\frac{d\mathbf U}{dT}
=
\frac{2\kappa\lambda}{Nc_f}\mathbf U,
\qquad
\tau_{\mathrm{drift}}
=
\frac{Nc_f}{2\kappa|\lambda|}.
$$
Writing $\kappa|\lambda|/N=C_g a_{\mathrm{int}}$ and
$t_{\mathrm{dyn}}=v_{\mathrm{int}}/a_{\mathrm{int}}$ gives
$$
\frac{\tau_{\mathrm{drift}}}{t_{\mathrm{dyn}}}
=
\frac{c_f}{2C_gv_{\mathrm{int}}}.
$$
Within this fixed point-cloud ansatz, the often-used
$c_f/v_{\mathrm{int}}$ scaling is therefore only an order-of-magnitude
statement with a geometry coefficient; comparison with a full cycle adds the
cycle's own numerical factor. A time-dependent internal geometry requires a
return-map or Floquet calculation rather than this frozen exponential
estimate.

Plainly: a nonzero residual forbids indefinite translation of that fixed point
cloud, but it does not by itself say whether visible deformation takes one
cycle or many.

The independent reference for the pair formula is direct closed-form addition
of the two ordered roots in Proposition 5. The point-cloud analyzer
`scripts/equation-mapping/analyze-fixed-point-cloud-residual.mjs` separately
checks the matrix identity, planar nulls, and the tetrahedral negative control.
It is not a Borg-catalog evaluator. Sampling a prescribed orbit at frozen
phases while discarding its internal velocities does not evaluate that orbit's
history and supplies no necessary condition for a moving assembly.

Plainly: the point-cloud analyzer checks the algebra above and nothing more. It
cannot pass or fail an orbiting candidate.

#### Relative-Periodic Moving-Assembly Test

A translating orbiting assembly must be tested on its actual moving history.
For drift speed $u$ along $\hat{\mathbf e}$, write a candidate branch as
$$
\mathbf X_a^{(u)}(T)
=
uT\hat{\mathbf e}+\boldsymbol\xi_a^{(u)}(T).
$$
The internal orbit may change with $u$; it is not required to remain an
undeformed copy of the rest orbit. Relative-periodic closure requires a period
$P_u$ and an allowed member permutation $\pi$ such that
$$
\boldsymbol\xi_a^{(u)}(T+P_u)
=
\boldsymbol\xi_{\pi(a)}^{(u)}(T),
\qquad
\dot{\boldsymbol\xi}_a^{(u)}(T+P_u)
=
\dot{\boldsymbol\xi}_{\pi(a)}^{(u)}(T).
$$

Plainly: after one cycle, the assembly may have moved as a whole and identical
members may have exchanged roles, but the complete internal position and
velocity pattern must return.

The pair distances are periodic under the same relabeling, not constant:
$$
d_{ab}(T+P_u)
=
d_{\pi(a)\pi(b)}(T).
$$
The branch must satisfy the full master-equation residual on the evolved
history,
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

Plainly: orbital acceleration and every delayed hit remain in the test. A
snapshot-only cancellation cannot substitute for this equation.

The delayed ledger must close with the orbit. Each retained root must map as
$$
(a,j,T,T_t)
\longmapsto
(\pi(a),\pi(j),T+P_u,T_t+P_u),
$$
with root identity, multiplicity, $D_t$, acceleration weight, inactive
intervals, finite-memory contents, and event conventions preserved. Acceptance
then requires an EOM-solver evolution record, the full position-velocity
return residual modulo translation and permutation, the master-equation
residual along the orbit, and the applicable stability or Floquet
certificate.

Plainly: a successful moving assembly is a repeated solution of the complete
delayed dynamics, not a sequence of geometrically attractive pictures.

Prescribed-geometry records may be checked for closure of their declared chart,
but that is an integrity check only. Because they were not produced by the EOM
solver, they cannot establish or refute existence or stability of a
relative-periodic moving branch.

For a small-drift continuation from a rest branch, the useful first-order
expansion is
$$
\boldsymbol\xi^{(u)}
=
\boldsymbol\xi^{(0)}
+u\boldsymbol\chi
+O(u^2).
$$
Substitution into the full delayed equation gives a periodic correction
problem of the form
$$
\mathcal L\boldsymbol\chi
=
-\mathbf B_{\hat{\mathbf e}},
$$
after the neutral translation, phase, and allowed relabeling modes are fixed.
Here $\mathcal L$ is the full delayed linearization about the rest branch and
$\mathbf B_{\hat{\mathbf e}}$ is the uniform-drift defect.

Plainly: the correct first question is whether the internal orbit can deform
slightly so that all delayed accelerations still close. Freezing that
deformation to zero recovers the fixed point-cloud restriction, not a
necessary condition for the moving branch.

Claim grade: the relative-periodic conditions are derived acceptance
obligations, not evidence that a branch exists. A certified EOM-solver record
that satisfies the full residual, root-ledger return, state return, and
stability conditions passes this test. Failure of any one condition falsifies
that particular claimed branch; failure of a frozen point-cloud overlay does
not.

#### Restricted Transmitter-History Cancellation Family

The canonical law's perpendicular projection differs from the commonly used
observer-level two-body comparison target in its longitudinal component. A
constant rescaling of $\kappa$ cannot reconcile the two forms because their
relative gap varies as $\gamma_f^2$.

That mismatch does not prove that receiver velocity is mathematically
necessary. Define the inertially extrapolated separation at a causal hit,
$$
\mathbf s_{ij}
\equiv
\mathbf r_{ij}
-\mathbf V_j(T_t)(T_r-T_t),
$$
and consider the transmitter-history-only candidate family
$$
\mathbf A_{ij}^{H}
=
\kappa\sigma_{ij}|q_iq_j|\,
H(b_j^2,\zeta_{ij}^2)
\frac{\mathbf s_{ij}}{\|\mathbf s_{ij}\|^3},
$$
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
For fixed-point-cloud common translation, reversing the pair sends
$\mathbf s_{ij}\mapsto-\mathbf s_{ij}$ while leaving the two scalar arguments
unchanged. The pair therefore cancels exactly, receiver velocity remains
absent, and the declared transverse target is recovered. The simplest member
uses $H=\sqrt{1-b^2}$.

Plainly: the three requested algebraic properties can coexist without adding
receiver velocity. The price is a different line of action and a different
transmitter weight.

This family is guessed, not derived. It is not the canonical law, does not
follow from the current uniform-emission surface-density argument, and has not
been obtained from the accepted scalar action scaffold. It changes both the
emission-site line of action and the root-density weight. The live closure
question is therefore whether an Architrino-native wake construction derives
one such member while preserving the accepted causal and conservation
obligations. Deriving the canonical emission-site line of action and uniform
emission measure from that family would falsify the stated incompatibility;
showing that every admissible transmitter-history action reduces to the
canonical residual would eliminate the family.

At kernel-class comparison level, a scalar causal kernel
$\delta(\tilde g)/r$ supplies only a scalar root Jacobian, whereas a
vector-current direct-action comparison contains an additional
velocity-contraction numerator. Replacing that contraction by a constant is
therefore a plausible structural source of the missing cancellation terms.
This is an inferred comparison, not a derivation: causal-only time asymmetry
and unresolved variation residuals can also contribute. A complete variation
that closes the fixed-point-cloud residual without such a contraction would overturn this
diagnosis.

#### Receiver Turning Is Not an Acceleration Singularity

The receiver-side factor

$$
D_{r,ij}
=
c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r)
$$

appears in the signed root-playback derivative

$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{D_{r,ij}}{D_{t,ij}}.
$$

When $D_{r,ij}=0$, the tracked emission time has a stationary point as a function of reception time. The causal root does not disappear, and its acceleration does not go silent. A static transmitter with $D_t=c_f$ supplies $W^{\mathrm{acc}}=1$ whether the receiver is stationary, momentarily satisfies $D_r=0$, or has $D_r<0$.

This cleanly separates two events:

- $D_t=0$ is a transmitter-side fold or higher singularity and requires the declared fold or singular-event route.
- $D_r=0$ is a root-playback turning point. It changes the sign of branch playback but is not an acceleration pole, zero, or chart boundary.

There is therefore no receiver-velocity resistance tensor and no primitive field-speed barrier in the Master Equation. Any effective damping, velocity-dependent assembly response, or observer-level magnetic-like behavior must be derived from delayed multi-branch geometry and wake-state evolution rather than inserted as an instantaneous receiver multiplier.

---

### Delay Differential Equation (DDE) Formulation

#### State Vector and Evolution

Define the **state vector** for architrino $i$:

$$
\mathsf Z_i(T) = \begin{pmatrix} \mathbf X_i(T) \\ \mathbf V_i(T) \end{pmatrix} \in \mathbb{R}^6
$$

The Master EOM is a **second-order ODE** in $\mathbf X_i$, or equivalently a **first-order system** in $\mathsf Z_i$:

$$
\frac{d\mathsf Z_i}{dT} = \begin{pmatrix} \mathbf V_i(T) \\ \mathbf A_i(T) \end{pmatrix}
$$

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

#### Causal Functional Form

The acceleration $\mathbf A_i(T_r)$ depends on the **history** of all worldlines $\{\mathbf X_j(T') : T' < T_r\}$ through the implicit causal constraint:

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t)
$$

This makes the system a **delay differential equation (DDE)** with **state-dependent delays** (the delay $\Delta_j = T_r-T_t$ is not constant; it depends on the solution itself).

**Functional notation:**

$$
\frac{d\mathsf Z_i}{dT} = \mathcal{F}\Big[\mathsf Z_i(T), \{\mathsf Z_j(\cdot)\}_{j}, T\Big]
$$

where $\mathcal{F}$ is a **causal functional**: it depends on the current state $\mathsf Z_i(T)$ and the past states $\{\mathsf Z_j(T') : T' < T\}$ of all architrinos (including $i$ itself for self-hits).

#### Mollified Causal-Wake Regularization

The ideal model uses **surface-delta causal isochrons** in the emission-time integral. On a simple branch with a distance floor and a Jacobian floor, the delta collapses to a continuous reception-time branch contribution weighted by the transmitter-side acceleration weight; singular or impulse-like behavior arises only when branches hit collision support, lose transversality, accumulate, or are sampled as unresolved numerical events. One may treat the singular limit as a measure-valued branch law, or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - c_f\Delta) \longrightarrow \delta_\eta(r - c_f\Delta) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - c_f\Delta)^2}{2\eta^2}\Big)
$$

while preserving total emission $q$.

**Effect:** Under the finite-branch, distance-floor, and transversality assumptions stated below, this supports **continuous-in-time acceleration diagnostics** and classical $C^1$ solutions for $\mathbf X_i(T)$ given $C^1$ initial data.

**In the super-field-speed regime** ($\|\mathbf V_a\| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization gives a finite contribution only while the active-root count, separation floor, Jacobian floor, and transmitter-side acceleration weight remain controlled.

**Convergence requirement:** As $\eta \to 0$, numerical solutions must converge to a well-defined limit. If a theorem or simulation also introduces a short-distance core mollifier $\epsilon_c$, it must declare whether the amplitude remains polarity-blind apart from $\sigma_{ij}|q_i q_j|$ or whether a derived polarity-dependent kernel has been added. The default law uses the former convention; the latter is a new closure claim and must preserve the same causal-root, symmetry, and event-ledger checks before it can be used in an assembly or blackbody argument.

#### Conditional Well-Posedness for the Regularized Exact Model

To make the existence/uniqueness claim precise for the finite-$\eta$ regularization used in this chapter, we formalize the dynamics as a state-dependent delay system in first-order form:
$$
\frac{d\mathbf Y}{dT}=\mathcal{G}(\mathbf Y_T),\qquad
\mathbf Y_T(\theta)=\mathbf Y(T+\theta),\ \theta\in[-h,0]
$$
with phase space $\mathcal{H}=C^1([-h,0],\mathbb{R}^{6N})$.
This is the convenient proof scaffold used here because the active-root extraction uses the implicit-function theorem on
$$
C^1
$$
histories. For sharper state-dependent delay work, especially when acceleration bounds rather than classical second derivatives are the natural control, the phase space may need to be
$$
W^{1,\infty}([-h,0],\mathbb{R}^{6N})
$$
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
- **(W4) Distance floor on the branch support:** $\|\phi_i(0)-\phi_j(-\Delta_{ij,\ell}(\phi))\|\ge d_{\min}>0$.
- **(W5) Bounded charges/couplings:** $\kappa$, $|q_i|$ finite.

**Conditional theorem (local well-posedness and continuation).**  
Under (W1)-(W5), for any initial history $\phi^0\in\mathcal{H}$ there exists $T>0$ and a unique solution
$$
\mathbf{Y}\in C^1([T_{\mathrm{init}}-h,T_{\mathrm{init}}+\Delta T),\mathbb{R}^{6N}),\qquad \mathbf{Y}_{T_{\mathrm{init}}}=\phi^0
$$
The solution extends uniquely to a maximal interval $[T_{\mathrm{init}}-h,T_{\max})$. If on every finite interval
$$
\sup_{T<T^\ast}\|\mathbf V(T)\|<\infty,\quad
\inf_{T<T^\ast,\ i,j,\ell} r_{ij,\ell}(T)>0,\quad
\inf_{T<T^\ast,\ i,j,\ell}|\partial_\Delta g_{ij,\ell}(T)|>0
$$
and
$$
\sup_{T<T^\ast,\ i,j}B^{\mathrm{active}}_{ij}(T)<\infty
$$
then $T_{\max}=\infty$.
Here $r_{ij,\ell}(T)$ denotes the transmitter-receiver distance on branch $\ell$, and
$$
B^{\mathrm{active}}_{ij}(T)
$$
denotes the number of active causal branches of pair
$$
(i,j)
$$
inside the chosen memory horizon at receiver time
$$
T
$$

**Proof.**

1. By (W3), each active delay branch is simple; the Implicit Function Theorem gives $\Delta_{ij,\ell}(\phi)\in C^1$ on a neighborhood of $\phi^0$.
2. Each per-branch acceleration term is a composition of $C^1$ maps (evaluation, subtraction, norm, mollifier, and unit-direction projection). By (W4), denominators stay away from zero; by (W5), coefficients are bounded. Hence each branch term is locally Lipschitz in $\phi$.
3. By (W2), only finitely many branches contribute, so their sum $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ where (W3)-(W4) hold.
4. State-dependent DDE existence/uniqueness theory on Banach spaces is invoked, yielding a unique local $C^1$ solution and a maximal extension. For state-dependent delays the applicable results (solution-manifold / almost-Lipschitz frameworks, e.g. Walther-class theorems) impose conditions that are not verified here.
5. Continuation follows from the same theorem: finite-time breakdown can occur only by leaving every bounded subset of the admissible set, i.e. via unbounded speed, vanishing separation on active support, transversality loss/root accumulation, or unbounded active branch-count growth.

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ surface-delta limit still requires separate control of root accumulation and Jacobian-degenerate branches. The conclusion is conditional on the cited framework's hypotheses; their verification for this system is an open obligation, so no closing tombstone is claimed.

#### Finite-Continuation Criterion for Global Comparisons

The well-posedness theorem is the dynamics-side home for global-continuation comparisons used later in [General Relativity](../spacetime/general-relativity.md#global-continuation-and-cosmic-censorship-comparison) and [Singularity Resolution](../spacetime/singularity-resolution.md#cauchy-horizon-comparison-pressure). It should not be read as a claim that observer records determine a unique global spacetime. Its native claim is narrower: a declared finite history, boundary wake record, and branch chart either determine a finite continuation family or they do not.

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
The comparison passes only if
$$
0<\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|<\infty
$$
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
after the finite boundary data and regularization convention have been fixed. Finite labeled multistability is an admissible branch-statistics object. Empty, infinite, unlabeled, or non-gluing continuation families remain closure failures, and the obstruction should be reported as a local admissibility failure, an accumulation failure, or a nonzero gluing class in $\check H^1$.

## Operational Principles, Self-Interaction, and Examples

### Core Principles (Operational Summary)

#### Superposition

**Statement:** The potential wake contributions from all transmitters **superpose linearly**. The net potential at any point is the sum of the individual wake potentials:

$$
\Phi_{\text{net}}(\mathbf X, T) = \sum_{i} \Phi_i(\mathbf X, T)
$$

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when the same-transmitter root condition permits, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}$, branch gaps, and screening or cancellation assumptions that make the retained sum finite.

Inverse-square dilution alone is not a global convergence theorem. For an infinite transmitter family, a branch chart must declare a summation or continuum prescription under which
$$
\lim_{R\to\infty}
\sum_{j:\|\mathbf X_j\|<R}
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\mathbf A_{ij}(T_r;T_t)
$$
exists, or it must supply local neutrality, angular cancellation, shielding, a screened kernel, finite active horizon, or a mean-field/principal-value subtraction. Without this condition, the many-transmitter wake sum is not a well-defined acceleration law even though each individual hit has the correct surface-density falloff.

#### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. The received acceleration magnitude is modulated by the transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$. Transmitter motion controls this factor. Receiver motion controls signed root playback and affects the kinetic-rate diagnostic through its radial velocity, but it does not multiply the arriving acceleration.

**Self-interaction requirement:** Self-hit requires super-field-speed interval history: the worldline must exceed $c_f$ somewhere along a nontrivial emission-to-reception interval, except for the degenerate field-speed tangent case excluded by the simple-root branch condition. Curvature alone is insufficient if $\|\mathbf V_a\| < c_f$ everywhere on the relevant interval.

**Persistent memory:** Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

#### Causality and Locality

**Causal structure:** Event $A$ at $(T_A, \mathbf X_A)$ can influence event $B$ at $(T_B, \mathbf X_B)$ only if:

$$
T_B > T_A \quad \text{and} \quad \|\mathbf X_B - \mathbf X_A\| \leq c_f(T_B - T_A)
$$

This defines a **field-speed causal cone** centered at each event. The filled inequality is the reachability condition; exact hits still occur only on causal wake surfaces satisfying the equality root.

**No action-at-a-distance:** All influences propagate at finite speed $c_f$. There are no instantaneous interactions across spatial separation.

**Event-locality at the receiver:** The Master EOM is evaluated **at the receiver event**: only the causal wake surfaces intersecting $\mathbf X_i(T_r)$ contribute to the acceleration there and then. However, it is **path-history dependent**: the active branches depend on the **entire past worldline** of all transmitters.

---

### Self-Interaction (Self-Hit Dynamics)

#### Self-Hit Condition

An architrino $i$ experiences self-hit at reception time $T_r$ if there exists $T_t<T_r$ such that:

$$
\|\mathbf X_i(T_r) - \mathbf X_i(T_t)\| = c_f(T_r-T_t)
$$

**Geometric interpretation:** The architrino's current position $\mathbf X_i(T_r)$ lies on the causal isochron emitted from its past position $\mathbf X_i(T_t)$.

**Requirements:**

1. **Curvature**: The worldline must curve (straight-line motion admits no self-hits).
2. **Super-field-speed interval history**: the speed must exceed $c_f$ somewhere on the interval from emission to reception, except for the degenerate straight field-speed riding case excluded by the branch Jacobian condition.

#### Multiple Self-Hits (Plural)

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

where $\sigma_{ii} = +1$ (like polarities repel), so each self-hit contributes an **outward** (repulsive) acceleration.

#### Persistent Memory (Self-Hit After Slowing Down)

**Critical clarification:**

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $\|\mathbf V\| > c_f$ and emitted wake surfaces can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $T_1$: Architrino accelerates to $\|\mathbf V\| > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $T_2 > T_1$: Architrino slows down to $\|\mathbf V\| < c_f$ (e.g., due to partner attraction or external acceleration contributions).
3. At time $T_3 > T_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $T_1$ (when $\|\mathbf V\| > c_f$).

**Result:** Self-hit occurs at $T_3$ even though current velocity $\|\mathbf V(T_3)\| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf X_i(T_r)$ and $\mathbf V_i(T_r)$ is insufficient to determine $\mathbf A_i(T_r)$. The **full past worldline** $\{\mathbf X_i(T') : T' < T_r\}$ is needed to identify all causal self-hit times $T_t \in \mathcal{C}_{ii}(T_r)$.

#### Self-Hit as an Outward Barrier Mechanism

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

### Worked Examples (Analytic Baselines)

#### Stationary Opposite Charges (Radial Fall)

**Setup:**
- Two architrinos: Electrino at $\mathbf X_1(T)$, Positrino at $\mathbf X_2(T)$
- Initial conditions: Both at rest, separated by distance $d_0$
- No self-hits (speeds remain $< c_f$ if $d_0$ is not too small)

**Symmetry:** By polarity symmetry, both fall toward their common center of mass.

**Equations:** On a retained partner branch, the radial coordinate
$r(T)=\|\mathbf X_2(T)-\mathbf X_1(T)\|$ has the canonical receiver-side schematic form
with transmitter-side acceleration weight:

$$
\frac{d^2r}{dT^2}
=
-\frac{2\kappa \epsilon^2}{r^2}
W_p^{\mathrm{acc}}
\quad
\text{on the retained branch}
$$

where the factor of 2 comes from the symmetry when both sides consume the same
retained partner record. The stripped inverse-square form is only the
near-rest, single-branch calibration $W_p^{\mathrm{acc}}\approx1$, not a
canonical proof record.

**Solution structure:** The slow, single-branch calibration has the same
quadrature structure as Keplerian radial fall. A promoted branch must keep the
same-record $D_t$, $D_r$, and $W^{\mathrm{acc}}$ record.

**Key insight:** Partner attraction dominates; no self-hit (speeds remain sub-field-speed for moderate $d_0$).

#### Sub-Field-Speed Circular Orbit

**Setup:**
- Two opposite polarities in symmetric circular orbit at radius $R$, speed $v < c_f$
- No self-hits (sub-field-speed regime)

**Partner contribution:** The circular transmitter-side geometry nominates an
inward radial diagnostic and a tangential-sign diagnostic. In the canonical
Master EOM, those records are not acceleration verdicts until the same partner branch
emits $D_t$, $D_r$, and $W^{\mathrm{acc}}$.

**Result:** The transmitter-side circular sign record is an orientation
diagnostic, not the proof. The exact receiver-side calculation later in this
chapter supplies the canonical weighted acceleration and proves that the principal partner branch
cannot be a constant-speed circle because its tangential acceleration is
strictly positive. Stability of a broader multi-root or medium-coupled branch
remains a separate question.



#### Maximum-Curvature Orbit (Self-Hit Barrier)

**Setup:**
- A candidate opposite-polarity branch reaches super-field-speed curved history after a non-circular contraction, capture, or forced branch transition
- Self-hits activate → repulsive outward acceleration

**Geometric definition (Null Separatrix):**
For an active causal root $T_t \in \mathcal{C}_{ii}(T_r)$ on the self-hit branch, define

$$
J_{ii}(T_r;T_t)\equiv 1-\frac{\mathbf V_i(T_t)\cdot \hat{\mathbf{r}}_{ii}(T_r;T_t)}{c_f}
$$

The maximum-curvature binary (MCB) boundary is the Jacobian-degenerate set

$$
J_{ii}(T_r;T_t)=0
$$

with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal wake surface of its own past emission (the “riding-the-shock” limit).

**Why this is a hard wall in the exact theory:**
In the exact branch-resolved acceleration, the self-hit contribution carries the factor

$$
\frac{W_{ii}^{\mathrm{acc}}(T_r;T_t)}{r_{ii}^2(T_r;T_t)}
$$

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

### Informational Ambiguity at the Receiver

#### Limited Information Per Hit

From the perspective of the receiving architrino, the information carried by an intersecting causal isochron is **limited**. The receiver only knows:

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $\|\mathbf{F}\|$ when force bookkeeping is used).
2. The **unoriented line of action** through its current position (the line along which the acceleration points).

The receiver does **not** have direct knowledge of:
- The transmitter's identity (which architrino $j$?)
- The transmitter's precise distance $r_{ij}$ (without additional assumptions)
- The transmitter's velocity at emission $\mathbf V_j(T_t)$

#### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (polarity $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (polarity $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

#### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary surrogate transmitter** ($\|\mathbf V\|=0$) placed somewhere along the same unoriented line of action, with the actual transmitter speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched transmitter-side acceleration weight.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what transmitter configurations are consistent with a given hit?).

#### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of wakes** from many different transmitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the transmitter configuration.

#### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and transmitter-ambiguous information at the hit level is a candidate bridge to effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics. The bridge remains a closure target until the coarse-grained state map and record-formation dynamics are derived:

- **Wave function transition**: $\psi$ may be interpreted as a coarse-grained representation of the wake-defined potential landscape only after a density/phase map has been supplied.
- **Measurement interaction**: an outcome is a record formed by assembly interactions and causal-hit history, not by adding a fundamental collapse postulate at this level.
- **Uncertainty**: the native candidate mechanism is informational ambiguity at the receiver plus unresolved microstate sensitivity, not ontic randomness.

## Parameters and Numerical Implementation

### Parameter Definitions

The core parameters entering the Master Equation are:

| **Parameter** | **Symbol** | **Working convention** | **Dimensional** | **Comment** |
|:--------------|:-----------|:----------------------|:----------------|:------------|
| Wake speed | $c_f$ | Set to 1 in natural units unless otherwise stated | $\mathrm{L}\,\mathrm{T}^{-1}$ | Propagation speed in the causal constraint |
| Coupling constant | $\kappa$ | Universal coupling parameter | $\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | Controls the strength of the inverse-square interaction |
| Architrino polarity unit | $\epsilon$ | $\lvert e \rvert / 6$ | $\mathrm{Q}$ | Fundamental polarity magnitude |
| Causal-wake-surface thickness (regularization) | $\eta$ | Positive regularization width used in analysis and simulation | $\mathrm{L}$ | Mollifies delta singularities |

In this document, $c_f$ is treated primarily as a unit-setting convention, $\kappa$ as the universal coupling scale of the delayed interaction law, $\epsilon$ as the fundamental polarity unit, and $\eta$ as a regularization parameter used only when a smooth surrogate of the exact causal-wake dynamics is required.

### Numerical Implementation Notes

#### Delay Root-Finding Algorithms

At each reception step $T_r$, the numerical integrator must solve the **implicit causal constraint** for each transmitter $j$:

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f(T_r-T_t), \quad T_t<T_r
$$

**Algorithm (schematic):**

1. For each transmitter $j$, search the history buffer $\{\mathbf X_j(T') : T' < T_r\}$ for all $T_t$ satisfying the constraint.
2. Use **bisection** or **Newton-Raphson** to refine roots to tolerance $\epsilon_{\text{root}}$.
3. If multiple roots exist (multi-hit regime), enumerate all; sum their contributions.
4. If no roots exist (transmitter too far away or not yet causal), skip transmitter $j$ at this time step.

**Efficiency:** Use **history binning** or **spatial hashing** to avoid exhaustive search over all past times.

##### Spatial Hashing for History Buffers

**Efficiency requirement:** Naïve all-pairs history search scales as $O(N^2 T_{\text{history}})$, intractable for $N > 100$ particles. 

**Required optimization:** Implement spatial hash grid with cell size $\sim c_f \Delta T_{\max}$; only search cells within causal range of receiver. Expected scaling: $O(N \log N)$.

**Implementation notes:**
- Partition spatial domain into cubic cells of side length $\Delta_{\text{cell}} \approx c_f T_{\text{history,max}}$
- At each time step, bin all architrino positions into cells
- For receiver at $\mathbf X_i(T)$, only search cells within causal radius $r_{\text{max}} = c_f T_{\text{history}}$
- Update hash grid incrementally (not from scratch each step)


#### Time-Stepping Schemes for DDEs

The Master EOM is a **state-dependent DDE** (delay depends on the solution itself). Standard ODE integrators (e.g., RK4) must be adapted:

**Recommended methods:**

- **Fixed-point iteration** with predictor-corrector (for implicit delays)
- **Adaptive time-stepping** (small $\Delta T$ when roots are close or numerous)
- **Event detection** for exact root crossings (optional; improves accuracy in sharp-hit regime)

**Stability:** Ensure $\Delta T < \eta / c_f$ (resolve mollified wake surface width); adjust $\eta$ and $\Delta T$ together in convergence tests.

#### Emission-to-Receiver Provenance Tracking

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

## Analytic Regimes and Research Roadmap

### Summary and Key Takeaways

#### What This Document Establishes

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

**Key features:**

1. **Event-local at the receiver**: Only intersecting delayed causal wake surfaces contribute (no action-at-a-distance).
2. **Non-Markovian**: Depends on full path history (self-hit memory).
3. **Superposition**: Linear sum over all transmitters and causal roots.
4. **Self-hit**: Repulsive same-transmitter interaction when $\mathcal{C}_{ii}(T_r)$ is nonempty with a valid transversality floor and a retained transmitter-side acceleration weight; super-field-speed interval history is proved necessary for simple nontrivial roots and can persist as memory after slowing down.
5. **Radial line of action with transmitter-side weighting**: No magnetic or velocity-cross-product terms; all per-hit accelerations point along $\hat{\mathbf{r}}_{ij}$, with magnitude modulated by $W_{ij}^{\mathrm{acc}}=c_f/|D_{t,ij}|$.

#### Implications for Emergent Phenomena

The equation supplies the microscopic input for later emergence claims, but it does not by itself prove those claims. The status split is:

- **Binary stabilization**: supported by self-hit barriers and circular/spiral benchmarks; exact stable branches still require certified branch charts and tangential-power closure.
- **Noether braids and particle assemblies**: downstream assembly claims that must be derived from multi-body causal-root locking and hierarchy averaging.
- **Quantum behavior**: an effective closure target based on non-Markovian memory, attractor basins, and receiver-level informational ambiguity.
- **Observer-level geometry and gravity**: effective descriptions that must be recovered from Noether sea constitutive response and clock/ruler closure, not inserted into the substrate law.
- **Cosmology**: an effective observer-side program tied to Noether sea evolution, transport, and clock-rate comparison; the Euclidean void itself is not claimed to expand.

---

### Fully general case (arbitrary N, arbitrary trajectories)

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

### Ideal / symmetric cases where analytic work is realistic

The most tractable cases are the highly symmetric regimes in which closed forms or controlled approximations remain plausible.

#### Static / quasi-static limit (Coulomb analogue)

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

#### Two-body, 1D radial motion (head-on, no angular momentum)

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
  which has an exact analytic solution for $r(T)$ (same mathematics as Kepler fall-to-center).

We can:

- Write the exact integral for $T(r)$, and invert in special cases.
- Then treat causal delay as a small parameter $\epsilon_\mathrm{delay} \sim r/c_f T$ and develop a systematic expansion.

The reduced problem is analytic up to standard quadratures, with causal-delay corrections available as a systematic perturbation series.

For the local origin-crossing theorem program in the self-hit-capable collinear reduction, the working 1D model is dual-mollified rather than merely causal-surface-regularized: the causal-surface mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite.

---

#### Sub-Field-Speed Two-Body Uniform Circular Orbit

Consider the symmetric opposite-polarity circular ansatz
$$
\mathbf X_1(T)=R(\cos\omega T,\sin\omega T,0),
\qquad
\mathbf X_2(T)=-\mathbf X_1(T),
\qquad
\beta_f\equiv \frac{v}{c_f}=\frac{\omega R}{c_f}\in(0,1)
$$
Fix receiver $1$ at reception time $T_r$ and let the unique partner emission time be $T_t=T_r-\Delta$, with
$$
\xi\equiv \frac{\omega\Delta}{2}\in\left(0,\frac{\pi}{2}\right)
$$
Write $\mathbf{e}_r(T_r)=(\cos\omega T_r,\sin\omega T_r,0)$ and
$\mathbf{e}_\theta(T_r)=(-\sin\omega T_r,\cos\omega T_r,0)$ for the receiver polar frame.

#### Proposition (Unique partner branch and exact delay equation)

In the symmetric sub-$c_f$ circular ansatz, the partner branch is unique and its delay angle $\xi$ is the unique solution of
$$
\cos\xi=\frac{\xi}{\beta_f},
\qquad
0<\xi<\frac{\pi}{2}
$$

**Proof.**
The partner separation is
$$
\mathbf{r}_{12}(T_r;T_t)
=
\mathbf X_1(T_r)-\mathbf X_2(T_t)
=
R\big(\mathbf{e}_r(T_r)+\mathbf{e}_r(T_r-\Delta)\big)
$$
so
$$
r_{12}(T_r;T_t)=2R\cos\frac{\omega\Delta}{2}=2R\cos\xi
$$
The causal condition $r_{12}=c_f\Delta$ therefore becomes
$$
2R\cos\xi=c_f\frac{2\xi}{\omega}
$$
hence $\cos\xi=\xi/\beta_f$.
Define $h_{\beta_f}(\xi)=\cos\xi-\xi/\beta_f$ on $[0,\pi/2]$. Then
$$
h_{\beta_f}(0)=1>0,
\qquad
h_{\beta_f}\!\left(\frac{\pi}{2}\right)=-\frac{\pi}{2\beta_f}<0,
\qquad
h_{\beta_f}'(\xi)=-\sin\xi-\frac{1}{\beta_f}<0
$$
So $h_{\beta_f}$ is strictly decreasing and has exactly one root on $(0,\pi/2)$. $\square$

#### Lemma (Circular root-playback identity)

On every nondegenerate root of the uniform circular partner and self-hit charts,
the receiver-side factor equals the transmitter-side factor:
$$
D_r=D_t.
$$
For the partner branch below, both transmitter and receiver velocity projections onto
$\hat{\mathbf r}_{12}$ equal $-v\sin\xi$. For a uniform circular self root, the
same rotational symmetry makes the transmitter and receiver projections equal on the
same signed chord sheet. Thus the signed playback derivative is one, but the
acceleration weight remains
$$
W^{\mathrm{acc}}=\frac{c_f}{|D_t|}=\frac{1}{|J^t|}.
$$
Root playback and acceleration strength do not cancel one another.

#### Proposition (Exact partner-only circular receiver-side decomposition)

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
Therefore the exact radial and tangential components are
$$
a_r^{(\mathrm{part})}
=
-\frac{\kappa |q_1q_2|}
{4R^2\cos\xi\,(1+\beta_f\sin\xi)}<0
$$
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa |q_1q_2|\,\sin\xi}
{4R^2\cos^2\xi\,(1+\beta_f\sin\xi)}
>0
$$

**Proof.**
Using
$$
\mathbf{e}_r(T-\Delta)=\cos(2\xi)\,\mathbf{e}_r(T)-\sin(2\xi)\,\mathbf{e}_\theta(T)
$$
one finds
$$
\mathbf{r}_{12}
=
R\big(\mathbf{e}_r(T)+\mathbf{e}_r(T-\Delta)\big)
=
2R\cos\xi\left(\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T)\right)
$$
which gives the stated $r_{12}$ and $\hat{\mathbf{r}}_{12}$.
The transmitter velocity at emission is
$$
\mathbf V_2(T_t)
=
-v\,\mathbf{e}_\theta(T-\Delta)
$$
and
$$
\mathbf{e}_\theta(T-\Delta)\cdot\hat{\mathbf{r}}_{12}=\sin\xi
$$
so
$$
\mathbf V_2(T_t)\cdot\hat{\mathbf{r}}_{12}=-v\sin\xi,
\qquad
J_{12}^{t}=1-\frac{\mathbf V_2(T_t)\cdot\hat{\mathbf{r}}_{12}}{c_f}=1+\beta_f\sin\xi
$$
The receiver velocity is $\mathbf V_1(T)=v\mathbf e_\theta(T)$, and
$$
\mathbf V_1(T)\cdot\hat{\mathbf r}_{12}=-v\sin\xi.
$$
Therefore $D_r=D_t=c_f(1+\beta_f\sin\xi)$ and
$W_{12}^{\mathrm{acc}}=(1+\beta_f\sin\xi)^{-1}$ on this uniform circular branch.
Because $\sigma_{12}=-1$ for opposite polarities, the canonical branch acceleration is
$-\kappa|q_1q_2|\hat{\mathbf{r}}_{12}/[r_{12}^2(1+\beta_f\sin\xi)]$,
and projecting onto $\mathbf{e}_r(T)$ and $\mathbf{e}_\theta(T)$ yields the
stated components. Since $\xi\in(0,\pi/2)$, every denominator is positive and
$\sin\xi>0$, proving the sign claims. $\square$

#### Corollary (Tangential positivity and circular instability)

Within the isolated partner-only circular ansatz, the tangential power is strictly positive:
$$
\mathbf A_{12}\cdot\mathbf V_1(T)=v\,a_\theta^{(\mathrm{part})}>0
$$
Therefore an isolated opposite-polarity binary cannot realize an exact constant-speed circular orbit from partner delay alone.

**Interpretation.**
These are the exact transmitter-side partner-only circular formulas needed elsewhere in the chapter. They show that the delayed partner branch supplies inward radial pull, but it also drives the motion forward along $\mathbf{e}_\theta$. The transmitter-side transmitter-side denominator rescales both projections without changing their signs. Any tightening history must be certified on a non-circular branch or by an explicit finite-window conserved-account closure.

---

#### Super-Field-Speed Single-Architrino Uniform Circular Self-Hit

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

Let $\Delta = T_r-T_t > 0$. Then:

$$
2R\left|\sin\frac{\omega \Delta}{2}\right| = c_f \Delta
$$

Introduce the dimensionless variables
$$
\beta_f=\frac{v}{c_f}=\frac{\omega R}{c_f},
\qquad
\xi=\frac{\omega \Delta}{2}
$$
Then the circular self-hit condition becomes
$$
\left|\sin\xi\right|=\frac{\xi}{\beta_f},
\qquad 0<\xi<\beta_f
$$
For fixed $\beta_f>1$, the admissible self-hit set is therefore **finite**, not infinite: roots are exactly the intersections of $\left|\sin\xi\right|$ with the line $\xi/\beta_f$ inside the compact interval $(0,\beta_f)$. Dropping the absolute value restricts the calculation to the positive-sine sheets and omits physical roots on alternating half-windings.

The principal branch turns on at $\beta_f=1$. Writing $\beta_f=1+\mu$ with $\mu>0$ small, the smallest root obeys
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
\Delta_0 \sim \frac{2\sqrt{6\mu}}{\omega},
\qquad
r_0=c_f\Delta_0\sim 2R\sqrt{6\mu}
$$
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
On the principal branch,
$$
J_0 \sim 2\mu
$$
The transmitter-side coarea diagnostic therefore scales like
$$
\frac{1}{r_0^2|J_0|}
\sim
\frac{1}{48R^2\,\mu^2}
$$
This is also the canonical transmitter-side scaling on the nondegenerate side of the
uniform circular chart, because $W_0^{\mathrm{acc}}=1/|J_0|$. Thus the principal
self-root amplitude scales as $O(\mu^{-2})$ near its coincident endpoint birth.
The endpoint exclusion alone does not make that transition finite; it remains a
failed singular event until one regularized treatment certifies a finite accepted
impulse and the corresponding conserved accounts.

Higher branches are also tractable. For the circular root function
$$
g_{\beta_f}(\xi)\equiv \sin\xi-\frac{\xi}{\beta_f}
$$
new admissible roots can appear only at interior tangencies satisfying
$$
g_{\beta_f}(\xi)=0,
\qquad
g_{\beta_f}'(\xi)=0
$$
Eliminating $\beta_f$ gives the tangency equation
$$
\tan\xi = \xi
$$
and the corresponding threshold speed is
$$
\beta_f^\star = \sec\xi^\star
$$
At every such tangency,
$$
J^\star = 1-\beta_f^\star \cos\xi^\star = 0
$$
So each new circular self branch is born directly on a Jacobian-null boundary: branch creation and null-separatrix contact are the same event in the uniform circular toy model.

> **Proposition (Signed higher-winding circular branch birth).**
> The circular distance equation should be read branchwise as
> $$
> g_{\beta_f,s}(\xi)\equiv s\sin\xi-\frac{\xi}{\beta_f}=0,
> \qquad
> s=\operatorname{sign}(\sin\xi)\in\{+1,-1\}.
> $$
> For each higher half-winding $n\ge 1$, set
> $$
> I_n=\left(n\pi,\left(n+\frac{1}{2}\right)\pi\right),
> \qquad
> s_n=(-1)^n,
> $$
> and let $\xi_n^\star\in I_n$ be the unique positive solution of
> $$
> \tan\xi_n^\star=\xi_n^\star.
> $$
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
> If
> $$
> a_n=\left(n+\frac{1}{2}\right)\pi,
> $$
> then
> $$
> \xi_n^\star=a_n-\frac{1}{a_n}+O(a_n^{-3}),
> \qquad
> \beta_n^\star=a_n-\frac{1}{2a_n}+O(a_n^{-3}).
> $$
> For $\beta_f=\beta_n^\star+\mu$ with $0<\mu\ll 1$, the two newly active roots satisfy
> $$
> \xi_{n,\pm}(\beta_f)
> =
> \xi_n^\star
> \pm
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu),
> $$
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
> Thus a higher-winding fold creates a signed root pair on a Jacobian-null boundary. Since $r_{n,\pm}\to 2R\xi_n^\star/\beta_n^\star\neq0$, the transmitter-side diagnostic part of the branch kernel scales as
> $$
> \frac{1}{r_{n,\pm}^2|J_{n,\pm}|}
> =
> O(\mu^{-1/2}).
> $$
> The causal-action coarea weight is a separate collapse factor:
> $$
> g_{\beta_f,s_n}'(\xi_{n,\pm})
> =
> s_n\cos\xi_{n,\pm}-\frac{1}{\beta_f}
> =
> -\frac{J_{n,\pm}}{\beta_f},
> $$
> so the action-counting density carries an additional $|g_{\beta_f,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$. Under the transmitter-side law the acceleration weight is already $W^{\mathrm{acc}}=c_f/|D_t|=1/|J^t|$. Action counting remains a separate variational question and may not be inferred by multiplying the acceleration by signed root playback.
>
> Consequently the circular self-hit combinatorics remain linearly bounded in $\beta_f$. A one-sign subchart has
> $$
> N_{\text{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1),
> $$
> while the full signed $|\sin\xi|$ chart has the same no-proliferation form with the convention-dependent leading constant.

> **Benchmark Proposition (Circular branch-count bound).**
> In the symmetric circular benchmark, if the speed ratio obeys
> $$
> |\beta_f(T)|\le \beta_{\max}<\infty
> $$
> uniformly, then the active circular self-hit count is uniformly bounded:
> $$
> N_{\mathrm{self}}(T)
> \le
> \frac{\beta_{\max}}{\pi}+C_{\mathrm{circ}},
> $$
> where
> $$
> C_{\mathrm{circ}}
> $$
> is an absolute endpoint-count constant for the circular root equation. This supplies the missing branch-count input in the continuation criterion for that benchmark. A general super-field-speed trajectory still needs its own no-proliferation theorem; tight spirals or repeatedly folded histories can otherwise leave the finite-branch chart even without speed blowup, collision, or a single Jacobian floor loss. The natural generalization is a curvature-bounded no-proliferation lemma: on a retained interval with bounded speed, bounded curvature or total turning, positive separation, and the declared transversality floor away from finite folds, active causal roots should remain uniformly finite. Until such a lemma is proved for a trajectory class, the circular bound is a benchmark, not a global branch-count theorem.

This circular benchmark already:

- Gives us analytic control of the causal roots (as solutions of a simple scalar transcendental),
- Lets us write the transmitter-side self-acceleration target as
  $$
  \mathbf A_\text{self}(T) =
  \sum_n \kappa \frac{q^2}{r_n^2}W_{n}^{\mathrm{acc}}\hat{\mathbf{r}}_n
  $$
  with $r_n = c_f \Delta_n$, $W_{n}^{\mathrm{acc}}=1/|J_n|$ on nondegenerate uniform circular roots, and directions that can be written explicitly in terms of the phase difference.

The benchmark does not provide an elementary closed-form sum, but it gives the following controlled inputs:

- the root geometry is explicitly analyzable,
- At high speed the number of admissible roots grows only linearly with $\beta_f$ because all roots lie in $(0,\beta_f)$,
- Large‑$n$ roots admit asymptotic expansions,
- the canonical self-acceleration series can be studied away from circular root-map degeneracies,
- and the asymptotic radial/tangential components can be recomputed as functions of $v/c_f$.

Near a circular transmitter-side degeneracy, $D_r$ approaches zero with $D_t$, so
the signed root-playback derivative stays equal to $1$ on the nondegenerate roots.
The acceleration weight $W_n^{\mathrm{acc}}=c_f/|D_t|$ instead grows without bound
as the simple-root chart approaches $D_t=0$. The pointwise simple-root formula does
not continue through the birth event; only an accepted finite transition rule could
replace it there.

This is therefore a root-transversality and branch-birth statement, not a
closure theorem. A circular self branch born on $D_t=0$ marks a chart boundary;
it does not supply a singular receiver-side amplitude on the uniform circular
ansatz. Any locked-orbit claim must still control the signed radial and
tangential sums on a retained branch chart.

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
Resolving the line-of-action direction into the instantaneous circular frame gives
$$
\hat{\mathbf{r}}(\xi)=\sin\xi\,\mathbf{e}_r+\cos\xi\,\mathbf{e}_\theta
$$
With
$$
C=\frac{\kappa q^2}{4R^2}
$$
and uniform-circular transmitter-side acceleration weight
$$
W_s^{\mathrm{acc}}(\xi)=\frac{c_f}{|D_t(\xi)|}=\frac{1}{|J(\xi)|},
$$
the branchwise self-hit projections are therefore
$$
a_r(\xi)=C\frac{\beta_f}{\xi|J(\xi)|},
\qquad
a_\theta(\xi)=C\frac{\beta_f^2\cos\xi}{\xi^2|J(\xi)|}
$$
Thus the radial projection is outward on every active self root, while the tangential projection is controlled entirely by the sign of $\cos\xi$.

> **Proposition (Circular self-hit radial sign and principal tangential threshold).**
> On every nondegenerate root of the full uniform-circular self-hit equation, the radial projection is strictly outward. On the principal root $\xi_0\in(0,\pi)$, the tangential projection is forward for $1<\beta_f<\pi/2$, zero at $\beta_f=\pi/2$, and backward for $\beta_f>\pi/2$.
>
> **Proof.** On the full signed chart, let
> $$
> s_\xi=\operatorname{sign}(\sin\xi)
> $$
> so
> $$
> \hat{\mathbf r}(\xi)
> =
> |\sin\xi|\,\mathbf e_r+s_\xi\cos\xi\,\mathbf e_\theta
> $$
> The canonical multiplier $C/(\sin^2\xi\,|J|)$ is positive away from a fold. Therefore the radial coefficient is proportional to $|\sin\xi|>0$, while the tangential sign is $\operatorname{sign}(s_\xi\cos\xi)$. On the principal branch $s_\xi=+1$ and
> $$
> \beta_f=\frac{\xi_0}{\sin\xi_0}
> $$
> is strictly increasing on $(0,\pi)$ because $\sin\xi_0-\xi_0\cos\xi_0>0$. The tangential sign changes only at $\xi_0=\pi/2$, where the root equation gives
> $$
> \beta_f=\frac{\pi/2}{\sin(\pi/2)}=\frac{\pi}{2}
> $$
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

Away from fold neighborhoods, substituting the canonical transmitter-side weight
$W_s^{\mathrm{acc}}=1/|J|$ gives the formal large-$\beta_f$ sums
$$
A_{r,\mathrm{src}}^{\mathrm{diag}}(\beta_f)
=
\frac{C}{\pi}\log\beta_f+O(C)
$$
and
$$
A_{\theta,\mathrm{src}}^{\mathrm{diag}}(\beta_f)
=
-\frac{C\beta_f}{12}+O(C\log\beta_f)
$$
The corresponding absolute tangential activity is
$$
\sum_{\xi_n}|a_{\theta,\mathrm{src}}^{\mathrm{diag}}(\xi_n)|
=
\frac{C\beta_f}{6}+O(C\log\beta_f)
$$
These are formal simple-root transmitter-side sums, not accepted global acceleration
certificates, because their treatment of fold neighborhoods and coincident branch
births is incomplete. The signed tangential constants must be recomputed with the
same regulated event convention before any cancellation estimate is promoted.

The full signed $|\sin\xi|$ circular chart uses $s=\operatorname{sign}(\sin\xi)$ and
$$
s\sin\xi=\frac{\xi}{\beta_f},
\qquad
J=1-\beta_f s\cos\xi,
\qquad
\hat{\mathbf{r}}(\xi)=|\sin\xi|\,\mathbf{e}_r+s\cos\xi\,\mathbf{e}_\theta
$$
Thus the full signed-chart projections, including the canonical transmitter-side weight, are
$$
a_r^{|\sin|}(\xi)=C\frac{\beta_f}{\xi|J(\xi)|},
\qquad
a_\theta^{|\sin|}(\xi)=C\frac{\beta_f^2s\cos\xi}{\xi^2|J(\xi)|}
$$
The radial contribution is still outward on every active self root. The tangential contribution is forward on each left sheet and backward on each right sheet, independent of the sine-lobe sign. Pure circular self-hit is therefore not tangentially neutral branchwise; it supplies outward radial support and signed forward/backward tangential activity that must be summed on the retained receiver-side ledger, without by itself proving or disproving full binary closure.

The complete root census follows from the absolute-value equation, not from the positive-sine subchart alone. In each higher lobe $\xi\in(n\pi,(n+1)\pi)$, $n\ge1$, a pair is born when
$$
\tan\xi_n^\star=\xi_n^\star,
\qquad
\beta_{f,n}^\star
=
\sqrt{1+(\xi_n^\star)^2}
$$
The first two pair-birth speeds are
$$
\beta_{f,1}^\star\approx4.6033388488,
\qquad
\beta_{f,2}^\star\approx7.7897057675
$$
At $\beta_f=8$, the five self-hit delay angles $\phi=2\xi$ are approximately
$$
319.2409^\circ,\quad
413.6433^\circ,\quad
632.7112^\circ,\quad
859.1794^\circ,\quad
911.8419^\circ
$$
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
   and the radial equation selects $R/R_*\approx0.0869416735$. The partner-root Jacobian floor at this point is approximately $0.7071$.

These are measured algebraic facts of the unregularized uniform-circular simple-root chart, not retained-branch or stability results. The null result for the restricted principal-partner ledger is not a theorem on $(1,\infty)$, while the first full-ledger zero already establishes numerical existence inside the searched interval. Promotion to a circular MCB requires the same finite singular-event convention for the folds that created the older roots, a retained-history certificate, wake-boundary closure, and a stable return map.

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
This closed form is the independent directional reference used by the executable check.

The full branchwise recomputation changes the existence verdict for that counterfactual. At the first three canonical emission-site candidates $\beta_f\approx3.0703566254$, $6.2184549634$, and $9.3764360282$, the extrapolated-direction radial coefficients are respectively $+0.1986630540$, $+0.1969175233$, and $+0.1881554019$, while the tangential coefficients are $-0.3350989817$, $-0.1271086141$, and $-0.0742863069$. Each row is outward and tangentially unbalanced. The counterfactual ledger develops replacement tangential zeros near $\beta_f\approx3.2253960989$, $6.2226379612$, and $9.3769260902$, but their radial coefficients remain outward. A scan through $1<\beta_f<20$ finds six tangential zeros and no simultaneous inward-radial point.

Claim grade: **measured counterfactual**. This result shows that the canonical algebraic candidates are line-of-action sensitive; it does not promote the extrapolated construction into the Master Equation. The [autonomous emission-labeled wake transport](#autonomous-emission-labeled-wake-transport) derives the canonical direction and weight on regular support from the present fixed-speed wake ontology. The direction-only extrapolated construction is not the wake-surface normal, while a coherently moving extrapolated center changes the propagation law, causal support, and collapse weight. The counterfactual therefore cannot demote the canonical candidates unless the substrate wake postulates are changed.

The equilibrium test precedes every stability test. Because all extrapolated-direction tangential zeros in the searched domain have outward radial acceleration, none is a circular equilibrium and no linearized delay spectrum about those rows is meaningful. The stability result is therefore not applicable after acceleration-balance failure; it is not a measured instability.

Falsifiers are direct. A negative canonical self-hit radial projection on any admissible circular root refutes the radial-sign proposition. Failure of the principal tangential term to change sign between $\beta_f=1.5$ and $\beta_f=1.65$ refutes the threshold result. A missed root with chord residual below the declared tolerance refutes the census. Recomputing the complete canonical ledger without the algebraic zero near $\beta_f=3.07036$ refutes the canonical measurement. Finding an extrapolated-direction tangential zero with negative radial coefficient inside $1<\beta_f<20$ refutes the counterfactual nonexistence measurement.

#### High-Speed-Ratio Partner and Self Circular Residual Status

The receiver-side partner branch has a clean high-speed asymptotic form. Let $\xi_p(\beta_f)$ solve
$$
\cos\xi_p=\frac{\xi_p}{\beta_f},
\qquad
0<\xi_p<\frac{\pi}{2}
$$
and set
$$
C=\frac{\kappa q^2}{4R^2}
$$
Then
$$
\xi_p=\frac{\pi}{2}-\frac{\pi}{2\beta_f}+O(\beta_f^{-2})
$$
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
belong to the formal simple-root transmitter-side chart. They remain useful for
comparing root families, but they do not certify a global acceleration residual or
a large-$\beta_f$ circular exclusion until fold neighborhoods and coincident births
share one accepted event convention. The complete unregularized simple-root sum has
now been recomputed over $1<\beta_f<20$: the restricted principal-partner ledger
stays tangentially positive, while the full partner-plus-self ledger has algebraic
zeros after older partner-root births. The regulated chart must still be recomputed
before either pattern is promoted to retained dynamics.

Thus the equal-magnitude bare circular chart remains an obstruction benchmark,
not a closed no-go theorem. A retained constant-radius exclusion still requires
positive transmitter-side floors, inactive gaps, finite memory depth, the
receiver-side branch records, and signed radial/tangential residual closure on
the same branch chart.

The circular self-hit and partner-hit formulas are kernel benchmarks. They are not the Noether braid model. The Noether braid model is the six-body branch chart containing self, partner, and inter-binary causal roots, with hierarchy averaging only where justified by separated scales and certified branch data.

---

#### Maximum-curvature binary (declared indexed-binary idealization)

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
Stability is a different question: linearizing the delayed dynamics about the candidate orbit gives a delay operator
$$
L(\lambda)
$$
and the characteristic equation
$$
\det(\lambda I-L(\lambda))=0
$$
Any root with
$$
\operatorname{Re}\lambda>0
$$
is an unstable mode.

> **Target Proposition (MCB transverse stability diagnostic).**
> For any candidate bare two-body maximum-curvature binary, compute the linearized delay operator on radial and tangential perturbations. The null-separatrix self-hit wall may block the radial collapse channel but cannot supply centripetal acceleration on the circular chart. The complete unregularized circular partner-plus-self ledger has measured algebraic cancellation points, while the restricted principal-partner ledger remains tangentially positive on $1<\beta_f<20$. Thus a bare MCB should be treated as an uncertified organizing orbit in
> $$
> (R,v)
> $$
> space until the net signed tangential balance and transverse eigenvalues are certified.

This is the intended dynamical interpretation. Stable particles in the Noether braid architecture are Noether braid assemblies; a bare MCB, if it exists, is a high-curvature component or limiting scaffold whose instability explains why additional locking structure is needed.

The resulting status would be an analytic scaffold with a numerical stability check, not a closed-form certification.

---

#### Symmetric delayed spiral (advanced non-circular benchmark)

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
with fixed pitch $a>0$ and constant angular rate $\Omega>0$.

The variable-pitch extension replaces the constant pitch by
$$
p(\theta)\equiv-\frac{r'(\theta)}{r(\theta)}
$$
At a transmitter angle $\theta_0=\theta-\Delta$, write
$$
p_0\equiv p(\theta-\Delta),
\qquad
\omega_0\equiv \dot\theta(\theta-\Delta),
\qquad
\rho\equiv \frac{r(\theta-\Delta)}{r(\theta)}
$$
The logarithmic benchmark is the special case $p(\theta)=a$, $\omega_0=\Omega$, and $\rho=e^{a\Delta}$. This extension is useful because a true minimum-radius event requires
$$
\dot r=0,
\qquad
\ddot r\ge 0
$$
which in the pitch variable means
$$
p(\theta_\ast)=0,
\qquad
p'(\theta_\ast)\le 0
$$
when $\dot\theta(\theta_\ast)\ne0$.

For a receiver event at angle $\theta$ and a partner emission at $\theta_0=\theta-\Delta$ with $\Delta>0$, define
$$
\Lambda_p(\theta,\Delta)\equiv \sqrt{1+\rho^2+2\rho\cos\Delta}
$$
Then
$$
\mathbf{r}_{12}(\theta;\theta_0)
=
r(\theta)\Big[(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)\Big]
$$
so the exact delayed-hit condition is
$$
r(\theta)\,\Lambda_p(\theta,\Delta)=c_f\,(T(\theta)-T(\theta-\Delta))
$$
For constant angular rate this reduces to
$$
\Lambda_p(\theta,\Delta)=\frac{\Delta}{b(\theta)},
\qquad
b(\theta)\equiv \frac{\Omega r(\theta)}{c_f}
$$
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
where $p=p(\theta)$ and $\hat{\mathbf{N}}$ points inward in the circular limit.
Using the branch unit vector
$$
\hat{\mathbf{r}}_{12}
=
\frac{(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_p}
$$
the partner transmitter-velocity projection entering the Jacobian is
$$
\mathbf V_2(\theta-\Delta)\cdot\hat{\mathbf{r}}_{12}
=
\frac{r(\theta)\rho\,\omega_0}{\Lambda_p}
\Big[p_0(\cos\Delta+\rho)-\sin\Delta\Big]
$$
Hence
$$
J_{12}
=
1+
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big]
$$
The sign is fixed by the circular limit: when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta_f\sin(\Delta/2)$.

##### Closed Transmitter-Side Spiral Factors

For acceleration contributions the transmitter-side factor fixes the transmitter-side weight. Define
the current and transmitter-event dimensionless tangential speeds
$$
b\equiv\frac{r(\theta)\dot\theta(\theta)}{c_f},
\qquad
b_0\equiv\frac{r(\theta)\rho\omega_0}{c_f}
$$
Then the transmitter-side and receiver-side factors on the same retained partner
root are available in closed form:
$$
\frac{D_{t,p}}{c_f}
=
1+
\frac{b_0}{\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big]
$$
$$
\frac{D_{r,p}}{c_f}
=
1+
\frac{b}{\Lambda_p}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
Hence the exact partner acceleration weight is
$$
W_p^{\mathrm{acc}}(\theta,\Delta)
=
\frac{1}{\left|
1+\dfrac{b_0}{\Lambda_p}
\big[\sin\Delta-p_0(\cos\Delta+\rho)\big]
\right|}
$$
This expression is algebraic once a delayed root $\Delta$ is known. The
receiver-side expression remains useful for signed root playback but does not
enter this weight. In the uniform circular limit,
$W_p^{\mathrm{acc}}=(1+\beta_f\sin(\Delta/2))^{-1}$.

For opposite polarities, the branch acceleration is
$$
\mathbf A_{12}
=
-\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}{r(\theta)^2\Lambda_p^2}\,
\hat{\mathbf{r}}_{12}
$$
Projecting onto the variable-pitch Frenet frame gives
$$
a_T^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}
{r(\theta)^2\Lambda_p^3\sqrt{1+p^2}}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
$$
a_N^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{acc}}(\theta,\Delta)}
{r(\theta)^2\Lambda_p^3\sqrt{1+p^2}}
\Big[1+\rho\cos\Delta-p\rho\sin\Delta\Big]
$$
The partner tangential numerator is therefore
$$
S_T^{p}(\theta,\Delta)
\equiv
p(1+\rho\cos\Delta)+\rho\sin\Delta
$$

The missing self-branch analogue uses
$$
\Lambda_s(\theta,\Delta)\equiv \sqrt{1+\rho^2-2\rho\cos\Delta}
$$
$$
\hat{\mathbf{r}}_{11}
=
\frac{(1-\rho\cos\Delta)\mathbf{e}_r(\theta)+\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_s}
$$
The self-hit delay equation is
$$
r(\theta)\,\Lambda_s(\theta,\Delta)=c_f\,(T(\theta)-T(\theta-\Delta))
$$
and the self-branch Jacobian is
$$
J_{11}
=
1-
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big]
$$
Again the circular limit agrees with the uniform circular self-hit formula, $J_{11}=1-\beta_f\cos(\Delta/2)$.

The receiver projection on the same self line of action gives the companion
closed-form records
$$
\frac{D_{t,s}}{c_f}
=
1-
\frac{b_0}{\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big]
$$
$$
\frac{D_{r,s}}{c_f}
=
1-
\frac{b}{\Lambda_s}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
and therefore
$$
W_s^{\mathrm{acc}}(\theta,\Delta)
=
\frac{1}{\left|
1-\dfrac{b_0}{\Lambda_s}
\big[\sin\Delta+p_0(\rho-\cos\Delta)\big]
\right|}
$$
The uniform circular limit again gives $D_{r,s}=D_{t,s}$ for root playback, while
$W_s^{\mathrm{acc}}=1/|J_{11}|$. Thus the transmitter-side calculation requires
evaluating the transmitter-side denominator on the retained root intervals and
recording $D_r/D_t$ separately for continuation.

For self-hit, $\sigma_{11}=+1$, so
$$
\mathbf A_{11}
=
\frac{\kappa q_1^2}{r(\theta)^2\Lambda_s^2}\,
W_{11}^{\mathrm{acc}}\,
\hat{\mathbf{r}}_{11}
$$
The self-branch tangential projection is
$$
a_T^{s}
=
\frac{\kappa q_1^2 W_{11}^{\mathrm{acc}}}{r(\theta)^2\Lambda_s^3 \sqrt{1+p^2}}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
so
$$
S_T^{s}(\theta,\Delta)
\equiv
-p(1-\rho\cos\Delta)+\rho\sin\Delta
$$

##### Closed Spiral-Direction Flow

The physical question is whether the binary's radius is shrinking or growing.
The delayed acceleration does two different jobs, and they must be kept separate. Its
radial part changes the inward or outward motion. Its azimuthal part changes the
rotation rate and angular momentum. A forward azimuthal push can spin the binary
up while the radius is still shrinking, so the torque sign alone does not answer
the spiral-direction question.

The geometry separates those jobs into two dimensionless sums. $B_r$ is the net
outward-radial contribution, while $B_\theta$ is the net forward-azimuthal
contribution. For an equal-magnitude opposite-polarity binary, let
$q^2=|q_1q_2|=q_1^2$, and define
$$
B_r
\equiv
-\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{acc}}(1+\rho_p\cos\Delta_p)}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{acc}}(1-\rho_s\cos\Delta_s)}{\Lambda_s^3}
$$
$$
B_\theta
\equiv
\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{acc}}\rho_p\sin\Delta_p}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{acc}}\rho_s\sin\Delta_s}{\Lambda_s^3}
$$
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
and the angular-momentum record is
$$
\frac{d}{dT}(r^2\omega)
=
\frac{\kappa q^2}{r}B_\theta
$$
Thus $B_\theta>0$ means that the wakes are adding angular momentum. It does not
mean that the binary is moving outward. Radial direction is carried separately
by the changing radius.

The signed pitch packages the direction into one number:
$$
p\equiv-\frac{\dot r}{r\omega},
\qquad
\Gamma\equiv\frac{r^3\omega^2}{\kappa q^2}>0
$$
for $\omega>0$. The sign convention is simple: $p>0$ means that the radius
shrinks as the binary turns, while $p<0$ means that the radius grows. Direct
substitution into the polar equations gives the closed receiver-side pitch
flow
$$
\frac{dp}{d\theta}
=
-(1+p^2)-\frac{B_r+pB_\theta}{\Gamma}
$$
$$
\frac{d}{d\theta}\log\omega
=
2p+\frac{B_\theta}{\Gamma}
$$
together with $d\log r/d\theta=-p$. These identities are exact on any smooth
retained spiral chart. The complicated path-history information is confined to
the delayed roots inside $B_r$ and $B_\theta$. Once those roots are known, the
equations directly evolve the spiral direction.

At a radial turning point, the binary is momentarily neither moving inward nor
outward, so $p=0$. The direction after that instant is decided by one balance:
$$
\left.\frac{dp}{d\theta}\right|_{p=0}
=
-\frac{\Gamma+B_r}{\Gamma}
$$
Therefore
$$
\Gamma+B_r>0
\quad\Longleftrightarrow\quad
\text{minimum radius followed by outward motion}
$$
while
$$
\Gamma+B_r<0
\quad\Longleftrightarrow\quad
\text{maximum radius followed by inward motion}
$$
In plain language, $\Gamma$ is the outward centrifugal requirement and $B_r$ is
the signed radial wake contribution. If their sum is positive, the radius has
reached a minimum and rebounds outward. If their sum is negative, the radius
has reached a maximum and turns inward. The equality case is radially tangent
and requires the next derivative. This is the closed-form in-versus-out decision
rule.

The simplest proposed spiral assumes that its tightness and angular rate never
change. In symbols, its signed pitch is constant, $p=p_\star$, and its angular
rate is constant. Under those assumptions, the two compatibility conditions
reduce to
$$
B_r=(p_\star^2-1)\Gamma,
\qquad
B_\theta=-2p_\star\Gamma
$$
or, after eliminating the positive scale $\Gamma$,
$$
(p_\star^2-1)B_\theta+2p_\star B_r=0,
\qquad
\Gamma=-\frac{B_\theta}{2p_\star}
$$
for $p_\star\ne0$. The immediate conclusion is that a constant-rate inward
spiral requires a net backward azimuthal contribution, $B_\theta<0$. The
principal partner root instead contributes forward, with $B_\theta>0$. That
single delayed partner wake therefore cannot produce the proposed constant-rate
inward spiral by itself. Older signed roots, self roots, or a changing angular
rate would have to alter the balance.

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
and the branch-strength factor cancels from the pitch-compatibility equation.
The remaining necessary condition is
$$
(p_\star^2-1)\rho\sin\Delta
-2p_\star(1+\rho\cos\Delta)
=0
$$
For fixed $p_\star\ne0$, the left-hand side is analytic in $\Delta$ and is not
identically zero; its continuation to $\Delta=0$ has value $-4p_\star$. Its
zeros on a retained principal interval are therefore isolated. A continuous
single-root history satisfying the compatibility equation must keep $\Delta$
constant. The delay equation then keeps $b$ constant, and constant angular rate
keeps $r$ constant, contradicting $p_\star\ne0$. Hence:

> **Proposition (single-principal-partner logarithmic-spiral no-go).** No exact
> nonzero constant-pitch, constant-angular-rate logarithmic spiral, inward or
> outward, exists over an open interval of the strictly sub-field,
> single-principal-partner receiver-side chart.

The proposition does not say that binaries cannot spiral. It says that the
simple logarithmic picture is too rigid: a real spiral cannot preserve both its
tightness and its angular rate while responding only to one delayed partner
wake. At least one feature must evolve. The spiral can change tightness, change
angular rate, acquire another delayed root, cross into the self-hit regime, or
receive multi-body contributions.

The Frenet tangential sum used below is the same information in a rotated basis:
$$
B_T
=
\frac{-pB_r+B_\theta}{\sqrt{1+p^2}}
$$
so the polar pitch flow and the Frenet obstruction are equivalent statements,
not separate tests.

The circular obstruction yields a branch-chart test. A non-circular spiral can beat the isolated circular tangential obstruction only if the certified active roots satisfy a negative weighted tangential sum on enough of the controlled cycle:
$$
\sum_{\mathrm{part}}
|q_1q_2|\frac{W_p^{\mathrm{acc}}S_T^p}{\Lambda_p^3}
+
\sum_{\mathrm{self}}
q_1^2\frac{W_s^{\mathrm{acc}}S_T^s}{\Lambda_s^3}
<0
$$
after the common positive factors are removed. Algebraic sign allowance is not enough; the delayed-root equations must actually admit those roots with positive transmitter-side floors, transmitter-side acceleration-weight intervals, and finite memory depth.

At a minimum-radius event $\theta_\ast$, the pitch condition gives $p(\theta_\ast)=0$. Therefore both tangential numerators reduce locally to
$$
S_T^p(\theta_\ast,\Delta)=S_T^s(\theta_\ast,\Delta)=\rho\sin\Delta
$$
Principal roots with $0<\Delta<\pi$ still carry the same positive tangential sign as the circular benchmark. The only bare-kernel escape routes are therefore:

1. admissible older or wrapped roots with $\sin\Delta<0$ and enough transmitter-side acceleration weight;
2. off-turn variable-pitch intervals where the $p$-terms dominate the positive principal branches;
3. additional medium, Noether braid, or multi-body structure outside the isolated two-body spiral ansatz.

The radial turn condition is equally explicit. Since
$$
\ddot r=a_r+r\dot\theta^2
$$
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
so the normalized turn record is
$$
\Gamma_{\mathrm{rs}}+B_r^{\mathrm{rec}}(\theta_\ast)>0
$$
The subscript $\mathrm{rs}$ identifies this retained-spiral benchmark. The retained branch chart must emit same-record $D_t$, $D_r$, transmitter-side acceleration weights, and signed root-playback records before $B_r^{\mathrm{rec}}$ exists as acceleration evidence. It does not determine $\Gamma_{\mathrm{rs}}$ from $b_\ast=\Omega r_\ast/c_f$, from the delayed-root offsets, or from a branch-sum threshold. A branch certificate must therefore either supply an independently derived acceleration-ratio interval after the transmitter-side branch sum exists or report the radial result as blocked.

A fixed retained-chart benchmark illustrates this burden without supplying canonical dynamics. Let $a_{\mathrm{rs}}=0.204$ be the prescribed pitch amplitude, $b_\ast=7/2$ the prescribed turn-center speed ratio, and $C_{\mathrm{rs}}$ the complete fixed record consisting of those inputs, the interval $I_\ast=[-\pi/6,\pi/6]$, three retained partner-root tubes $P_1,P_2,P_3$, one retained self-root tube $S_1$, and the associated inactive-gap and finite-memory data. The labels $P_k$ and $S_1$ identify those root tubes only; they are not particle or persistent-braid indices. Every equation below that consumes $C_{\mathrm{rs}}$, $a_{\mathrm{rs}}$, or $b_\ast$ is a diagnostic for this prescribed benchmark, not a derived Master EOM result. Promotion requires same-record $c_f/|D_t|$ acceleration-weight intervals and $D_r/D_t$ playback intervals on all four tubes.

If the same turn-center radial curve is allowed a variable angular rate, with $\omega_\ast=\dot\theta(0)>0$ and $\alpha_\ast=\ddot\theta(0)$, then $r'(0)=0$ and the local kinematic targets become
$$
B_r^{\mathrm{rec}}(C_{\mathrm{rs}};0)=(a_{\mathrm{rs}}-1)\Gamma_\ast,
\qquad
B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)=\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2}
$$
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
However, the delayed roots are controlled by a finite-memory integral, not by this local slope alone. If
$$
H(\Delta)
=
\omega_\ast
\int_{-\Delta}^{0}
\frac{d\phi}{\dot\theta(\phi)}
$$
then the turn-center root equation is $\Lambda_{P/S}(0,\Delta)=H(\Delta)/b_\ast$. Retaining a constant-rate root at the same offset would require $H(\Delta_\alpha)=\Delta_\alpha$, or
$$
\int_{-\Delta_\alpha}^{0}
\left(
\frac{\omega_\ast}{\dot\theta(\phi)}-1
\right)d\phi=0
$$
Thus the variable-rate retained-spiral continuation is a finite-memory time-law problem: the local angular-deceleration target must be reconciled with inverse-rate averages over the delayed branch intervals and with the same-box transmitter-side acceleration contributions. Simple one-parameter extensions of the local slope are not evidence unless they preserve the retained roots and recompute $W^{\mathrm{acc}}=c_f/|D_t|$ on the resulting branch record.

This finite-memory condition is nevertheless not an algebraic no-go at the turn center. In past-lag coordinates $x=-\phi$, define
$$
q(x)=\frac{\omega_\ast}{\dot\theta(-x)}
$$
A retained-root profile must satisfy both moment and endpoint constraints,
$$
\int_0^{\Delta_\alpha}\bigl(q(x)-1\bigr)\,dx=0,
\qquad
q(\Delta_\alpha)=1
$$
for each retained-spiral delay. Because the local target gives $q'(0)=B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)/\Gamma_\ast<0$, the inverse-rate profile dips below $1$ just behind the turn and must compensate by rising above $1$ before the first retained delay. A positive retained-root inverse-rate profile can satisfy these constraints, keep the active transmitter-speed factors at their constant-rate values at the retained offsets, and make the same branch sums give the required local angular-rate slope.

The first off-center transport record is also fixed at the turn center. If $q_\theta(u)=\dot\theta(\theta)/\dot\theta(\theta-u)$ and $H(\theta,\Delta)=\int_0^\Delta q_\theta(u)\,du$, then the retained endpoint constraints imply
$$
\left.\partial_\theta H(\theta,\Delta_\alpha)\right|_{\theta=0}
=
k_\ast\Delta_\alpha,
\qquad
k_\ast=\frac{B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)}{\Gamma_\ast}
$$
Since $b'(\theta)/b(\theta)=k_\ast$ at the turn center, the first $\theta$-derivative of $H/b$ cancels at the retained endpoints. Thus the retained-memory witness inherits the constant-chart first-order root-transport identity at $\theta=0$. This is still only a branch-chart existence target, not an orbit certificate: the active roots, inactive gaps, transmitter-speed Jacobians, finite-memory depth, generalized root-transport residuals, and acceleration-balance records still have to be recomputed on a finite $\theta$ interval for the chosen nonconstant time law.

The finite-collar target can be stated without adding a new law. Let
$$
Q(\theta)=\frac{\omega_\ast}{\dot\theta(\theta)},
\qquad
\sigma(\theta)=\frac{r(\theta)}{r_\ast},
\qquad
K_Q(\theta,\Delta)=\int_{\theta-\Delta}^{\theta}Q(\phi)\,d\phi
$$
Then the transported retained-root equation is
$$
F_{\alpha,Q}(\theta,\Delta)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{K_Q(\theta,\Delta)}{b_\ast\sigma(\theta)}=0
$$
At each retained endpoint, $K_Q(0,\Delta_\alpha)=\Delta_\alpha$ and $\partial_\theta K_Q(0,\Delta_\alpha)=0$, so the first memory drift begins at second order in $\theta$. The branch-chart certificate must bound that drift while satisfying the tangential transport equation for $Q$ and the radial residual on the same active root ledger.

A local convergence diagnostic can sharpen this finite-collar target, but it
does not by itself fix the full continuation class. After the tangential record is
imposed on the retained ledger, the transported radial record should be tested
through the leading one-sided jet of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near
$\theta=0$. For a specified tangential-transport profile, the jet coefficient is
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)
$$
The retained endpoint and moment constraints do not yet fix all transmitter-side
endpoint-slope data entering $B'_+(0)$. A nonzero sampled coefficient is
therefore a local obstruction candidate for that profile, not a theorem that
every positive $C^2$ variable-rate continuation fails.

A sampled endpoint-slope construction sharpens the same caution. By perturbing
the retained past inverse-rate profile while preserving the retained endpoint
values, moment records, compact $C^2$ tail, and center slope, one can cancel the
leading affine radial jet at sampled level and still keep a positive retained
past profile with the expected $3+1$ active-root ledger after tangential
transport. This does not certify retained-spiral closure. It moves the theorem-grade burden
to finite-collar control after endpoint-slope cancellation: positivity,
inactive gaps, Jacobian floors, transmitter-side acceleration weights, finite memory, tangential transport, and the
full radial residual must all be bounded on the same branch chart. Provenance note: this sampled construction and the adjacent prescribed benchmark record currently name no instrument or archived computation artifact; until one is linked, both carry construction-note grade, not measured grade, and they license no dynamical inference.

---

### Effective Continuum Limits

Another class of analytic work appears only after coarse-graining the microscopic DDE:

#### Homogeneous, isotropic Noether Sea

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

### Analytic footholds and remaining targets

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

### Analytic Summary

- **General N‑body analytic solution:** No; the structure is too complex (DDE with state‑dependent delays and self‑hit multiplicity).
- **Idealized / symmetric cases:** Yes, in several important classes:
  - 1D radial two‑body,
  - sub‑$c_f$ circular orbit,
  - uniform circular self‑hit,
  - algebraic maximum‑curvature conditions,
  - continuum/wave limits of the Noether sea.

---

## Energy, Symmetry, and Conservation

### Energy, Lagrangian, and Hamiltonian Structure of the Architrino Dynamics

In this section we outline how **energy** and **variational structure** are handled in $\mathbb{A}\mathbb{A}\mathbb{A}$, given the Master Equation of Motion:

$$
\frac{d^2 \mathbf X_i}{dT_r^2} =
\sum_{j} \sum_{T_t \in \mathcal{C}_{ij}(T_r)}
\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2(T_r;T_t)}W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}(T_r;T_t)
$$

where each contribution comes from a **causal wake intersection** at reception time $T_r$ between receiver $i$ and a wake emitted by transmitter $j$ at emission time $T_t$. The set $\mathcal{C}_{ij}(T_r)$ encodes all such emission times selected by the causal constraint

$$
\|\mathbf X_i(T_r) - \mathbf X_j(T_t)\| = c_f (T_r-T_t),\quad T_t<T_r
$$

Once any internal binary reaches the $v>c_f$ regime at some stage in its curved history, **self‑hit** becomes a live branch candidate and must be checked explicitly in realistic energy accounting. Completed assemblies cannot be assigned a “no self-hit” energy record merely from current sub-field-speed motion; the retained path history must show that same-transmitter roots are absent or inactive with a certified branch gap.

We organize the discussion into four pieces:

1. Aggregate kinetic energy for a finite, isolated set of architrinos,
2. An action-level nonlocal Noether energy charge compatible with path‑history dynamics,
3. A nonlocal Lagrangian scaffold whose variations reproduce the Master Equation only when the constraint residual closes,
4. A corresponding Hamiltonian / total energy functional, with energy exchange only at $T=\text{now}$ between architrinos.

---

#### Aggregate Kinetic Energy

We work with **absolute time** $T$ and Euclidean 3‑space. For each architrino $i$, define:

- Position $\mathbf X_i(T)$,
- Velocity $\mathbf V_i(T) = d\mathbf X_i/dT$,
- Optional universal bookkeeping constant $\mu_{\text{arch}}$ when a quadratic kinetic proxy is desired.

We do **not** a priori assign energy to any continuous field; energy is carried by architrinos and their assemblies and is updated only at the instants where wake surfaces intersect receivers.

**Definition (Quadratic kinetic bookkeeping proxy).** For a finite isolated set of architrinos $\{i=1,\dots,N\}$,

$$
K_{\mu}(T) \equiv \sum_{i=1}^N \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2
$$

Remarks:

- This is a bookkeeping choice for analysis, numerics, and Noether-style energy accounting. The substrate law itself remains acceleration-first.
- Because $\mu_{\text{arch}}$ is universal, it can be absorbed into units or into an overall normalization of force-like quantities if desired.
- For assemblies (binaries, Noether braids), one defines an effective assembly mass $M_\text{assembly}$ as
  $$
  M_\text{assembly} = \frac{1}{V_\text{CM}} \frac{d}{dV_\text{CM}} \left(\text{total kinetic + interaction energy of internal motion}\right)
  $$
  where $V_\text{CM}$ is the center‑of‑mass speed. In practice, this is computed from the internal architrino motions (e.g., the tight indexed-binary self-hit orbit plus its interaction with partner binaries).

Thus kinetic energy splits naturally into:

- **Internal kinetic energy** of bound assemblies (setting rest mass),
- **Center‑of‑mass kinetic energy** of assemblies relative to the Noether sea.

---

#### Action-Level Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of a symmetry-preserving nonlocal action model supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the action-derived delayed model, not to every regularized implementation of the Master Equation.

For the dual-mollified local 1D collinear model, the same conservation language should be read more carefully: the causal-surface mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

##### Energy exchange per causal hit

Consider a single contribution to the acceleration of receiver $i$ at reception time $T_r$ from a causal hit emitted by transmitter $j$ at time $T_t\in\mathcal{C}_{ij}(T_r)$. The acceleration contribution is:

$$
\mathbf A_{ij}(T_r;T_t)
= \kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}
$$

The instantaneous power delivered to architrino $i$ by this hit is:

$$ 
P_{ij}(T_r;T_t)
= \mu_{\text{arch}}\,\mathbf A_{ij}\cdot \mathbf V_i
= \mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{acc}}(T_r;T_t)\, V_{r,ij}
$$

where $V_{r,ij} = \mathbf V_i(T_r)\cdot \hat{\mathbf{r}}_{ij}$ is the radial component of the receiver’s velocity along the line of action. This is the **only instant** when the interaction can change the kinetic energy of $i$. Between hits, $\mathbf A_{ij}$ from this specific emission is zero.

Summing over all contributing transmitters and all causal emission times at a given $T_r$,

$$
\frac{dK_{\mu}}{dT_r}(T_r)
= \sum_i \sum_j \sum_{T_t \in \mathcal{C}_{ij}(T_r)} P_{ij}(T_r;T_t)
$$

with the understanding that for self‑hit we include $j=i$ as well.

##### Action-Level Wake-Energy Functional at a Time Boundary

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

The tilde marks this as the time-normalized action constraint. The length-valued
Master Equation constraint remains $g_{ij}=r_{ij}-c_f(T_r-T_t)$.
Because $[\delta(\tilde g)]=T^{-1}$, the prefactor
$\mu_{\text{arch}}\kappa$ gives this kernel the required energy-per-time
dimension. A $\kappa/c_f$ prefactor would not.

For an isolated system, the nonlocal Noether charge associated with $T\mapsto T+T_{\mathrm{shift}}$ is

$$
E_{\text{tot}}(T)=K_{\mu}(T)+E_{\text{wake}}(T)
$$

with

$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_t)
$$

The outer minus sign follows the convention that the interaction enters the
action as $-\tfrac12\sum S_{ij}$. It also makes the sharp static
like-polarity interaction charge positive, as required by the work integral.

Plainly: one action convention now fixes the interaction units, the static
sign, and the boundary charge together.

For $i=j$, the same rule applies with the trivial coincidence branch ($T_1=T_t$) excluded, matching the self-hit convention used throughout this chapter.

Interpretation: the double integral measures interaction links that cross the absolute-time boundary $T$ (past emission side $T_t\le T$ and future reception side $T_1\ge T$). This is the exact “in-flight” interaction contribution in the nonlocal theory.

For exact solutions of the causal action, nonlocal Noether’s theorem gives

$$
\frac{d}{dT}\Big(K_{\mu}(T)+E_{\text{wake}}(T)\Big)=0
$$

No separate spatial field-energy ontology is required; conservation is encoded directly in worldline geometry and the causal kernel.

For proof and simulation, the same statement can be written as a residual balance. Let
$$
\mathbf{R}_i^{(\eta)}(T)
=
\mu_{\text{arch}}\mathbf A_i(T)
-
\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(T)
$$
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
For isolated compactly supported or period-matched histories, $\mathbf{R}_i^{(\eta)}=\mathbf{0}$ and $\mathcal{B}_{E}^{(\eta)}=0$ give the exact conserved charge. A nonzero residual identifies a real failure mode: branch-chart loss, nonsymmetric regularization, leakage through the finite memory window, or an unaccounted derivative-of-delta counterterm.

##### Equivalent work-integral form

For direct trajectory evaluation, one may reconstruct a compatible interaction contribution through the accumulated power exchange along the realized trajectory:

$$
U(T)=U_\ast-\int_{T_\ast}^{T}\sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot\mathbf V_i(T')\,dT'
$$

This work-integral form is a practical trajectory-level reconstruction when the same action-derived acceleration law and boundary convention are used. It should not be treated as an independent off-shell Noether functional; outside the symmetry-preserving action model it is a diagnostic bookkeeping quantity rather than a proved conserved charge.

In short-delay effective limits, $E_{\text{wake}}$ reduces to an approximate instantaneous pair form

$$
E_{\text{wake}}(T)\approx\sum_{i<j}U_{ij}\big(\mathbf X_i(T),\mathbf X_j(T)\big)
$$

with leading $1/r_{ij}$ behavior plus geometry-dependent self-hit corrections.

---

#### Exact Nonlocal Lagrangian

**Transmitter-side action target.** A scalar-action scaffold is closure-relevant
only if its variation produces the transmitter-side target
$W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}/r_{ij}^2$ on the retained branch
chart with $W_{ij}^{\mathrm{acc}}=c_f/|D_{t,ij}|$. The signed playback factor
$D_r/D_t$ is retained for root continuation but is not multiplied into the
acceleration or action target.

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

##### Exact causal-delay Fokker-type interaction term

For the focused scalar causal-locus statistic (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](causal-action-functional.md#core-functional-definitions). That chapter's scalar action-counting functional is not an acceleration/action record unless it is rebuilt with $W_{ij}^{\mathrm{acc}}/r^2$. It is not automatically identical to the exact Fokker-type variational action below, whose $1/r$ causal kernel must be tested against the transmitter-side branch law after variation.

Let the worldline of architrino $i$ be $\mathbf X_i(T)$. For the action-scaffold discussion, the same universal bookkeeping constant may be inserted in the quadratic kinetic term:
$$
S[\{\mathbf X_i\}]
=
\sum_i \int dT\, \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2
\;-\;
\frac{1}{2}\sum_{i\neq j} S_{ij}
$$

with interaction contributions

$$
S_{ij}
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
\int dT \int dT'\,
\Theta(T-T')\,
\frac{\delta\!\big(\tilde g_{ij}(T,T')\big)}{r_{ij}(T,T')}
$$

where

$$
\tilde g_{ij}(T,T') \equiv T-T' - \frac{r_{ij}(T,T')}{c_f},
\qquad
r_{ij}(T,T') = \|\mathbf X_i(T) - \mathbf X_j(T')\|
$$

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

This branch-resolved form is written per reception time after the transmitter-time
delta has been integrated out. On a retained smooth root $T_t=T_{t,\ell}(T_r)$,
the causal constraint also gives
$$
\frac{dT_{t,\ell}}{dT_r}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_i(T_r)}
{c_f-\hat{\mathbf{r}}_{ij}(T_r;T_{t,\ell})\cdot\mathbf V_j(T_{t,\ell})}
$$
This derivative is required for root continuation and change-of-reception-time calculations. It does not create a second acceleration weight. An action, wake-history state, or conservation account that uses $D_r$ as an instantaneous strength must therefore be recomputed. Records may retain $D_r/D_t$ as playback evidence while using $c_f/|D_t|$ for acceleration.

##### Variation and line-of-action acceleration law

This subsection is the bridge from the causal-hit rule to an action-style account. The physical rule has already said what a receiver feels: delayed line-of-action hits with transmitter-side acceleration weight. The variation below asks whether the same rule can be obtained from one regularized action ledger, so that acceleration, power, and conservation bookkeeping come from the same functional rather than from separate matching rules.

The branch law targeted by the action-level variation is:

$$
\frac{d}{dT_r}\left(\mu_{\text{arch}}\mathbf V_i(T_r)\right)
= \sum_j \mathbf{F}_{ij}(T_r)
$$

and the branch-resolved acceleration is

$$
\mathbf{F}_{ij}(T_r)
=
\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_i q_j|
\sum_{T_t\in\mathcal{C}_{ij}(T_r)}
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}}_{ij}(T_r;T_t)}
{r_{ij}^2(T_r;T_t)}
$$

The inverse-square factor follows in the theorem sketch from the variation of the scale-invariant kernel. On a simple-root chart, the interaction density is
$$
\frac{1}{r_{ij}}\delta(\tilde g_{ij}),
\qquad
\tilde g_{ij}=T-T'-\frac{r_{ij}}{c_f}
$$
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
The variation of
$$
\delta(\tilde g_{ij})
$$
is the remaining distributional part of the proof. After the transmitter-side variation, integration by parts on the root-selected chart, and boundary terms are accounted for, the target branch-resolved Euler-Lagrange term is proportional to
$$
\frac{W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}}{r_{ij}^2}
$$
This $1/r^2$ scaling is not an added ansatz in the accepted proof route: it is the pull-back expected from a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel. The full proof now also requires deriving the transmitter-side acceleration weight and controlling the derivative-of-delta term under the same symmetry-preserving regularization.

The derivative-of-delta term has a useful exact reduction on any transversal branch. Since
$$
\partial_{T'}\tilde g_{ij}(T,T')
=
-J_{ij}(T;T')
$$
one has
$$
\delta_\eta'(\tilde g_{ij})
=
-
\frac{1}{J_{ij}}
\partial_{T'}\delta_\eta(\tilde g_{ij})
$$
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
The first term is an endpoint or excluded-coincidence contribution; the second is the root-chart interior derivative that must be accounted for before the pure scalar kernel can be claimed to derive any branch-resolved acceleration law. Therefore the action proof does not license dropping $\delta_\eta'(\tilde g_{ij})$ by fiat. It requires the symmetry-preserving regularization to make this interior derivative vanish, become a boundary/transmitter-side contribution under the allowed variations, or be cancelled by an explicit counterterm. In the canonical Master EOM the branch-resolved target is $W_{ij}^{\mathrm{acc}}\hat{\mathbf r}_{ij}/r_{ij}^2$, so this residual must be rebuilt inside the receiver-side proof rather than reused as closure evidence.

The transmitter-side variation narrows the issue further. Holding the receiver point fixed and varying the emission point gives
$$
\delta r_{ij}
=
-\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_j(T'),
\qquad
\delta \tilde g_{ij}
=
\frac{1}{c_f}\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_j(T')
$$
so
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(\tilde g_{ij})}{r_{ij}}\right)
=
\left[
\frac{\delta_\eta(\tilde g_{ij})}{r_{ij}^2}
+
\frac{\delta_\eta'(\tilde g_{ij})}{c_f r_{ij}}
\right]
\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_j(T')
$$
Selecting the future reception time as the root gives
$$
\partial_T \tilde g_{ij}(T,T')
=
1-\frac{\hat{\mathbf r}_{ij}(T,T')\cdot\mathbf V_i(T)}{c_f}
$$
and hence the transmitter-side derivative-of-delta term integrates by parts as
$$
\int dT\,
\Theta(T-T')
\frac{\delta_\eta'(\tilde g_{ij})}{c_f r_{ij}}
\hat{\mathbf r}_{ij}
=
\widetilde{\mathcal{B}}_{ij}^{(\eta)}(T')
-
\int dT\,
\delta_\eta(\tilde g_{ij})
\partial_T
\left[
\Theta(T-T')
\frac{\hat{\mathbf r}_{ij}}
{c_f r_{ij}\left(1-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T)/c_f\right)}
\right]
$$
This is a coefficient of $\delta\mathbf X_j(T')$, not of $\delta\mathbf X_i(T)$. For arbitrary compactly supported interior variations, the receiver and transmitter variations are independent. The transmitter-side term therefore does not generically cancel the receiver-side root-chart derivative in the Euler-Lagrange equation for $\mathbf X_i(T)$. Noether boundary terms control endpoint contributions and global time-translation, spatial-translation, and rotation charges; they do not remove an interior coefficient under compact variations.

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
Thus the scalar $1/r$ causal kernel produces the inverse-square scale term as
a receiver-side proof ingredient only if the admitted branch also satisfies the
residual-vanishing condition
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
or if the action is supplemented by an explicit regularized counterterm whose receiver Euler derivative cancels this residual interior vector. Such a counterterm must come from an invariant action-level mechanism, not from fitting the already accepted acceleration law. Under the transmitter-side law this is not a completed derivation; it is a warning that the pure scalar $1/r$ Fokker-type action is only a partial variational scaffold until the $W_{ij}^{\mathrm{acc}}$ target is derived.

Equivalently, define the direct scale term
$$
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(T)
=
\int_{-\infty}^{T}dT'\,
\frac{\hat{\mathbf r}_{ij}(T,T')}{r_{ij}^2(T,T')}\,
\delta_\eta(\tilde g_{ij}(T,T'))
$$
and the constraint residual
$$
\mathbf{C}_{ij}^{(\eta)}(T)
=
\mathbf{C}_{ij,r}^{(\eta)}(T)
+
\mathbf{C}_{ij,t}^{(\eta)}(T)
+
\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}(T)
$$
where $\mathbf{C}_{ij,r}^{(\eta)}$ is the receiver-side interior derivative displayed above, $\mathbf{C}_{ij,t}^{(\eta)}$ is the transmitter-side coefficient on $\delta\mathbf X_j(T')$, and $\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}$ is the boundary contribution. On a regularized chart the action-derived equation has the diagnostic form
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
with the same branch floors and boundary convention used to define the action. This windowed residual condition is the minimal proof obligation for upgrading the variational scaffold to an exact action derivation of the Master EOM.

**Decision (pure scalar action).** The pure scalar $1/r$ Fokker-type scaffold remains unpromoted. The receiver-factor obstruction has been removed from its target, but the local derivative-of-delta residual and the future-reception boundary problem still must be resolved on the same causal retained-history update.

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
is a certificate that the pure scalar scaffold leaves a nonzero receiver-acceleration residual on that branch. This falsifies the universal claim "the scalar $1/r$ action by itself is the exact action for the Master EOM." It does not falsify the transmitter-side Master Equation or the possibility of a later causal wake-state action. It means the action proof must close the residual, retained-history update, and conserved accounts without reintroducing receiver velocity into the arriving acceleration.

**No-go scaffold (same-support local scalar counterterm).** The clean local scalar counterterm route is closed under the following restricted assumptions: the added term has the same causal-surface support as the $1/r$ kernel, uses only $\tilde g_{ij}$, $r_{ij}$, and $J_{ij}$ on the existing branch chart, introduces no new variables, adds no off-surface support, and is not fitted after the acceleration law is already known. Suppressing the common coupling and sign factors, the allowed branch-pair form is
$$
S_{\mathrm{ct},ij}^{(\eta)}
=
\int dT\,dT'\,
\Theta(T-T')\,
a(r_{ij},J_{ij})\,\delta_\eta(\tilde g_{ij})
$$
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
The optional $J_{ij}$-dependence can add transverse and transmitter-velocity terms, but it does not remove the scalar radial coefficient that must cancel the original derivative-of-delta residual. Cancelling that coefficient for all admitted receiver variations requires
$$
a(r_{ij},J_{ij})
=
-\frac{1}{r_{ij}}
$$
This choice necessarily adds
$$
\partial_{r_{ij}}a\,\delta_\eta(\tilde g_{ij})
=
\frac{\delta_\eta(\tilde g_{ij})}{r_{ij}^{2}}
$$
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
The direct kernel $K_0^{(\eta)}=\delta_\eta(g)/r$ has
$$
D_{ij}K_0^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2}
-\frac{\delta_\eta'(g)}{c_f r}
$$
Cancelling only the derivative-of-constraint residual would require
$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_f r}
$$
without adding another $\delta_\eta(g)/r^2$ scale term. For $N\ge1$, the highest derivative coefficient is $-a_N(r)\delta_\eta^{(N+1)}(g)/c_f$, so $a_N=0$; descending through the jet order forces $a_n=0$ for every $n\ge1$. The remaining $N=0$ case requires $a_0(r)=-1/r$, but then $\partial_r a_0=1/r^2$, so the counterterm again changes the inverse-square scale term it was supposed to preserve.

The conclusion is narrow but decisive for local repairs: no finite same-support local scalar or delta-jet counterterm cancels the scalar-kernel residual while leaving the canonical branch strength intact. A viable action-level repair must instead be nonlocal along the $(r,g)$ characteristic, or must use a richer velocity/history-dependent invariant action. Either route changes the action ontology enough that it should be discussed explicitly before canonization.

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
with the same positive-delay, Jacobian-floor, and boundary convention used by the branch chart. This is not the Master EOM acceleration residual and not the Noether conservation ledger. It is the additional condition needed for the scalar action scaffold to have no leftover interior Euler derivative on that receiver. If the signed sum is nonzero, the scalar action candidate fails on that chart; the residual does not become a new acceleration term.

**Nonlocal characteristic repair target.** The least invasive remaining action-level route is to solve the counterterm equation before imposing causal-surface support. In the reduced scalar variables, the required receiver-gradient correction has the form
$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\frac{\delta_\eta'(g)}{c_f r},
\qquad
D_{ij}
=
\partial_r-\frac{1}{c_f}\partial_g
$$
The characteristics of $D_{ij}$ preserve
$$
u
=
g+\frac{r}{c_f}
$$
Thus a formal characteristic solution is
$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
H_{\mathrm{ct}}^{(\eta)}\!\left(g+\frac{r}{c_f}\right)
+
\int_{r_\ast}^{r}
\frac{1}{c_f\rho}\,
\delta_\eta'\!\left(g+\frac{r-\rho}{c_f}\right)
d\rho
$$
with $H_{\mathrm{ct}}^{(\eta)}$ and the lower characteristic endpoint $r_\ast$ fixed by the history-window, core-regularization, or boundary convention. This expression is invariant under time translation, spatial translation, and spatial rotation because it depends only on the causal scalar $g$, the Euclidean separation $r$, and declared scalar endpoints. It is not a same-support wake-surface term: it carries a characteristic tail in $(r,g)$ and therefore changes the action scaffold.

This gives a concrete proof target rather than a completed replacement action. A candidate nonlocal action may be promoted only if its endpoint convention preserves $H(0)=0$, its Euler derivative cancels the residual above without changing the accepted inverse-square branch term, and its Noether boundary terms close the same energy, momentum, and angular-momentum ledger used by the Master EOM.

The endpoint calculation sharpens that target. The lower-endpoint form above is only the formal characteristic integral. A delayed-interior tail should instead be oriented toward an outgoing endpoint:
$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}\!\left(g+\frac{r}{c_f}\right)
-
\int_{r}^{R_{+}}
\frac{1}{c_f\rho}\,
\delta_\eta'\!\left(u-\frac{\rho}{c_f}\right)
d\rho,
\qquad
u=g+\frac{r}{c_f}
$$
with $R_{+}\ge r$ on the retained finite history chart, or with an explicitly controlled $R_{+}=\infty$ limit. A characteristic endpoint is the special case $R_{+}=R_{+}(u)$. Since $D_{ij}u=0$, differentiation gives
$$
D_{ij}K_{\mathrm{ct},+}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_f r}
-
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
$$
Thus the desired interior cancellation holds without an extra endpoint contribution only when $R_{+}$ is itself a characteristic endpoint, $D_{ij}R_{+}=0$.

**Endpoint-ledger decision.** The displayed endpoint term is not automatically a Noether boundary term. Its support is
$$
u=\frac{R_{+}}{c_f},
\qquad
g=\frac{R_{+}-r}{c_f}
$$
which is generally an interior tail surface of the retained delayed chart, not the primary arrival surface $g=0$. If $D_{ij}R_{+}\ne0$, compact receiver variations inside the retained chart see
$$
-\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
$$
as an Euler coefficient. Moving that term into the Noether wake-history ledger would hide an acceleration-law change unless the endpoint is a declared fixed history boundary whose variation is held fixed. Therefore the characteristic-tail repair preserves the accepted Master EOM branch acceleration only under one of the following conditions:
$$
D_{ij}R_{+}=0,
\qquad\text{or}\qquad
\lim_{\eta\to0^+}
\int_W
\left\|
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
\right\|dT
=0
$$
for the declared branch chart and fixed endpoint convention. In that admissible case the endpoint contributes only a boundary wake-history flux, not a new receiver acceleration. In the generic non-characteristic case, the repair is a no-go for the canonical Master EOM because it adds an extra interior action-level acceleration.

In the sharp-support limit, the outgoing form is supported on
$$
0
\le
g
\le
\frac{R_{+}-r}{c_f}
$$
so it is a causal interior tail behind the arriving wake surface, not a same-support surface density. Conversely, a lower endpoint $r_\ast<r$ supports a tail with $g\le0$ and is not delayed-interior causal support unless the boundary convention supplies a separate interpretation. This proves a useful but limited result: the characteristic-tail equation can cancel the scalar scaffold's interior derivative residual at the level of the Euler derivative, but it does so by adding a nonlocal tail and endpoint ledger obligation. It is not yet an exact action for the Master EOM.

A nondegenerate characteristic endpoint gives the cleanest candidate. On a retained chart choose
$$
R_{+}(u)
=
c_f(u+h_{+}),
\qquad
h_{+}>0
$$
or take the controlled $R_{+}=\infty$ limit. Since $R_{+}=R_{+}(u)$ and $D_{ij}u=0$, the endpoint is characteristic and the Euler leakage term proportional to $D_{ij}R_{+}$ vanishes. The outgoing counterterm can then be written, after the change of variable $s=u-\rho/c_f$, as
$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}(u)
-
\int_{-h_{+}}^{g}
\frac{\delta_\eta'(s)}
{c_f(u-s)}
ds
$$
Integrating by parts gives
$$
\frac{\delta_\eta(g)}{r}
+
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}(u)
+
\frac{\delta_\eta(-h_{+})}
{c_f(u+h_{+})}
+
\int_{-h_{+}}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds
$$
The finite-endpoint clearance condition is therefore
$$
\mathcal{B}_{+}^{(\eta)}(u,h_{+})
\equiv
\frac{\delta_\eta(-h_{+})}
{c_f(u+h_{+})}
=0
$$
for a compactly supported mollifier with $h_{+}$ outside the support, or $\mathcal{B}_{+}^{(\eta)}\to0$ in the declared weak limit for a Gaussian mollifier. If finite-$\eta$ endpoint clearance is not exact, the characteristic gauge must be fixed by
$$
H_{+}^{(\eta)}(u)
=
-
\mathcal{B}_{+}^{(\eta)}(u,h_{+})
$$
before the kernel is treated as a normalized action object. This condition is invisible to the receiver Euler derivative because it depends only on $u$, but it is visible to the Noether wake-history charge.

With the endpoint-clear normalization imposed, the delayed-interior effective kernel is
$$
K_{\mathrm{eff},h_{+}}^{(\eta)}(r,g)
=
\int_{-h_{+}}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
\qquad
u=g+\frac{r}{c_f}
$$
In the infinite-endpoint form,
$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds
$$
Both forms satisfy the receiver-gradient identity
$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2}
$$
with the finite form using the same identity after endpoint clearance. Thus the delayed-interior characteristic-tail kernel cancels the derivative-of-constraint residual without adding a second inverse-square scale term. The accompanying Noether boundary terms for energy, momentum, and angular momentum must be taken from the same normalized kernel, as below; replacement of a diagnostic inverse-square adapter on any concrete branch still requires the branch-chart residual and conservation checks.

**Noether boundary increments for the normalized tail.** With the endpoint-clear normalization imposed, there is no remaining free $H_{+}^{(\eta)}(u)$ gauge term that can shift the wake-history charge. Define the weighted effective action kernel
$$
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\Theta(T_1-T_t)
K_{\mathrm{eff}}^{(\eta)}
\!\left(
r_{ij}(T_1;T_t),
\tilde g_{ij}(T_1,T_t)
\right)
$$
with the same finite-endpoint version when the chart uses $h_{+}<\infty$. For a time cut $T_\ast$, let
$$
X_{ij}(T_\ast)
=
\{(T_1,T_t):T_t\le T_\ast<T_1,\ T_1>T_t\}
$$
with the trivial self-coincidence branch excluded when $i=j$. The normalized characteristic-tail wake increments are
$$
E_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\partial_{T_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
$$
\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
The minus signs in the spatial charges follow the sign convention that the interaction contribution appears with a minus sign in the action. The receiver-gradient identity gives
$$
\nabla_{\mathbf X_i(T_1)}
K_{\mathrm{eff}}^{(\eta)}
=
\hat{\mathbf r}_{ij}D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(\tilde g_{ij})}{r_{ij}^{2}}
\hat{\mathbf r}_{ij}
$$
while the transmitter-end gradient is the opposite. Therefore a global spatial translation or rotation of both endpoints changes no interior action density, and a step translation or step rotation across $T_\ast$ exposes exactly the boundary increments above. The characteristic endpoint condition $D_{ij}R_{+}=0$, together with endpoint clearance, is the local reason these increments are wake-history boundary terms rather than a hidden extra receiver acceleration.

This closes the local kernel-normalization and Noether-increment definition for the delayed-interior characteristic-tail repair. It does not by itself certify any proposed branch, terminal label, or Noether braid attractor: a branch chart must still show vanishing Euler residual, finite memory depth, positive transmitter-side Jacobian floors, retained same-record transmitter-side acceleration-weight records, and closure of $K_{\mu}+E_{\mathrm{wake,eff}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}$, and $\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}$ over the same retained branch set.

**Branch-chart conservation pullback.** Let $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ be a retained branch chart with active causal-root records $\mathcal{R}^{\mathrm{act}}$, positive inactive-root gaps, positive transmitter-side Jacobian floor, a retained transmitter-side acceleration-weight floor $\nu_{\mathrm{rec}}$, finite memory depth, and declared endpoint convention. For a time cut $T_\ast$, define the chart-restricted crossing domain
$$
X_{ij}^{\mathfrak{B}}(T_\ast)
\equiv
X_{ij}(T_\ast)
\cap
\{(T_1,T_t): (i,j,T_1,T_t)\ \text{lies on a retained record of }\mathcal{R}^{\mathrm{act}}\}
$$
with trivial self-coincidence excluded when $i=j$. The pulled-back wake-history charges are the same Noether boundary terms above, restricted to $X_{ij}^{\mathfrak{B}}(T_\ast)$:
$$
E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\partial_{T_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
$$
\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
\,dT_t\,dT_1
$$
The matching mechanical charges on the same chart are
$$
K_{\mu,\mathfrak{B}}(T)=\sum_{i\in\mathfrak{B}}\frac{1}{2}\mu_{\text{arch}}\|\mathbf V_i(T)\|^2,
\qquad
\mathbf{P}_{\mathrm{mech},\mathfrak{B}}(T)=\sum_{i\in\mathfrak{B}}\mu_{\text{arch}}\mathbf V_i(T)
$$
$$
\mathbf{J}_{\mathrm{mech},\mathfrak{B}}(T)
=
\sum_{i\in\mathfrak{B}}
\mathbf X_i(T)\times\mu_{\text{arch}}\mathbf V_i(T)
$$
For a retained window $W=[T_a,T_b]$, the branch-chart conservation test is
$$
\Delta_W\left(K_{\mu,\mathfrak{B}}+E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf V_i(T)\cdot\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(T)\,dT
+
\int_W\mathcal{B}_{E,\mathfrak{B}}^{(\eta)}(T)\,dT
$$
$$
\Delta_W\left(\mathbf{P}_{\mathrm{mech},\mathfrak{B}}+\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(T)\,dT
+
\int_W\boldsymbol{\mathcal{B}}_{P,\mathfrak{B}}^{(\eta)}(T)\,dT
$$
$$
\Delta_W\left(\mathbf{J}_{\mathrm{mech},\mathfrak{B}}+\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf X_i(T)\times\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(T)\,dT
+
\int_W\boldsymbol{\mathcal{B}}_{J,\mathfrak{B}}^{(\eta)}(T)\,dT
$$
The theorem-level branch claim requires the three residual balances to converge to zero with $\epsilon_{\mathrm{var}}^{(\eta)}(W)\to0$, vanishing declared endpoint or period-cut leakage, stable branch floors, and the same retained record set in the acceleration residuals and in the three wake-history charges. A work-integral reconstruction $U(T)$ or a projected torque increment is only a numerical diagnostic unless it is derived from this same action kernel, endpoint convention, and retained branch chart.

For a finite spatial window, the energy boundary record can be read as the wake-escapement flux defined in [Energy](energy.md#wake-escapement). In that notation, a theorem-level conservation packet should be able to rewrite the energy balance in the form
$$
\frac{dE_W}{dT}
=
-\Phi_{\mathrm{wake},\partial W}(T)
+P_{\mathrm{ext},W}(T)
+\mathcal{R}_{E,W}(T),
\qquad
\Phi_{\mathrm{wake},\partial W}(T)
=
\frac{d}{dT}
\sum_{\alpha\in\mathcal{E}_{\mathrm{esc}}(W)}
E_\alpha^{\mathrm{emit}}.
$$
This does not add a second energy channel. It identifies the endpoint and boundary term of the delayed action with the causal-wake history that exits the retained window without a retained receiver. The same boundary object is the entropy-arrow theorem target in [Entropy](entropy.md#second-law-and-same-record-monotonicity): energy flux, wake escapement, and observer-window entropy production are three projections of one finite-window path-history defect.

Self‑interaction ($i=j$) is included by adding $S_{ii}$ with the same kernel, but explicitly excluding the trivial coincidence $T'=T$ (no instantaneous self‑push at the moment of emission). Self‑hit corresponds to nontrivial roots $T_t<T_r$ where the worldline re‑intersects its own causal isochrons, which are captured naturally by the same double‑integral structure.

Thus:

- The scalar $1/r$ action above is a nonlocal variational scaffold for the delayed dynamics under the stated branch and regularization assumptions,
- It becomes an exact action derivation of the Master EOM only on branch charts where the constraint residual vanishes or is cancelled by an invariant action-level counterterm,
- A finite same-support local scalar or delta-jet counterterm has been ruled out because it cancels the derivative residual only by disturbing the inverse-square scale term,
- The currently minimal known action repair is the delayed-interior characteristic-tail kernel above; its receiver Euler derivative has the desired inverse-square identity, and its normalized wake-history boundary increments are explicit,
- Without such closure, the pure scalar action is falsified as the universal exact action for the Master EOM and should be treated as a diagnostic scaffold,
- Any $\delta_\eta$ replacement must preserve the symmetries that supply the Noether charges if conservation claims are to remain exact.

---

#### Trajectory Work Reconstruction and Total-Energy Target

Given the kinetic energy definition, the next object separates a realized-trajectory identity from a genuine Noether charge.

##### General structure

Along any realized trajectory, define the diagnostic reconstruction

$$
H_U[\{\mathbf X_i(\cdot)\},\{\mathbf V_i(\cdot)\}; T]
\equiv
K_{\mu}(T) + U(T)
$$

with $U(T)$ reconstructed along the realized trajectory by:

$$
U(T) = U_\ast - \int_{T_\ast}^{T} \sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot \mathbf V_i(T')\,dT'
$$

where $U_\ast$ is a fixed reference and $\mathbf A_i$ is the actual acceleration given by the Master Equation (including self‑hit and partner contributions). Then:

$$
\frac{dH_U}{dT} = \frac{dK_{\mu}}{dT} + \frac{dU}{dT}
= \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
- \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
= 0
$$

This constancy is true by construction and is not independent conservation evidence. The reconstruction is not a local function only of $(\mathbf X_i(T),\mathbf P_i(T))$, but neither does it become an off-shell Noether charge merely by retaining history.

The theorem-grade total-energy target is instead
$$
E_{\text{tot}}(T)=K_\mu(T)+E_{\text{wake}}(T),
$$
where $E_{\text{wake}}$ must arise as the boundary charge of the same symmetry-preserving delayed action whose interior variation reproduces the Master EOM. Only that derivation, together with closed boundary flux, promotes conservation beyond the trajectory identity $dH_U/dT=0$.

##### Local canonical form in effective limits

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

which:

- Approximates the full history-aware energy functional when assemblies are well separated and slowly varying,
- Recovers familiar particle‑mechanics structure for many emergent phenomena (orbital motion, scattering, bound states) without ever attributing energy to a continuous field.

---

#### Summary

- **Kinetic energy** is defined in the usual way at the architrino level, with internal kinetic energy of tightly bound self‑hit binaries contributing to assembly rest masses.
- **Interaction energy** is not primitive as an instantaneous position function; it is encoded in the nonlocal causal charge $E_{\text{wake}}$ and may be reconstructed from the work-integral form $U$.
- A **nonlocal variational scaffold** is available under the regularity and boundary assumptions stated above: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and targets the Master EOM with its transmitter-side inverse-square law, becoming an exact action derivation only when the constraint residual vanishes or is explicitly cancelled.
- The theorem-grade **total energy** is the action-derived history charge $K_\mu+E_{\text{wake}}$; the realized-trajectory quantity $K_\mu+U$ is a diagnostic identity. In suitable limits the former reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $T = \text{now}$. The action-derived conserved charge is written as $K_{\mu}(T)+E_{\text{wake}}(T)$; a work-integral reconstruction $K_{\mu}(T)+U(T)$ is compatible only along realized trajectories after the same boundary convention and acceleration law have been declared.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

The Master Equation is a state-dependent delay system: acceleration at time $T$ depends on the path-history segment over $[T-h,T]$. In this setting, conservation laws are not functions of the instantaneous state $(\mathbf X,\mathbf V)$ alone. Instead, they are **functionals on path history** that track "in-flight" wake contributions.

The comparison to delay-equation theory should therefore be read literally but narrowly. A finite-propagation two-body law is not an ordinary present-state ODE: a valid update needs a retained history segment, the active causal-root ledger, and the same receiver/transmitter branch records used by the acceleration law. In standard terminology, a reduced chart whose delayed dependencies reach only positions and velocities resembles a state-dependent delay differential equation, while a chart that retains delayed accelerations or highest-derivative constraints is closer to a neutral delay differential equation. That classification is only a mathematical comparison; the native burden remains the same-record causal-root, $D_t$, $D_r$, $W^{\mathrm{acc}}$, and wake-history ledger.

This section makes the symmetry group explicit and states the corresponding conserved functionals for isolated systems with $\eta > 0$.

#### Fundamental Symmetry Group

**Definition (Fundamental symmetry group).** The substrate and interaction kernel are invariant under
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$
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
for every $i$, with the same transformation also preserving all causal-root relations $\mathcal{C}_{ij}(T_r)$. For generic states this condition fails, so effective indistinguishability must be treated as coarse-grained observer bookkeeping rather than substrate identity.

#### Generalized Momentum and Angular Momentum

The delayed theory separates ordinary mechanical motion from the causal-wake history that is still in flight. For an action-derived delayed model with translation and rotation symmetry, the full Noether charges are history functionals: the particle-only quantities need not be conserved by themselves, but the particle-plus-wake totals are. In regularized or numerical variants, the same expressions should be treated as conserved diagnostics only when the chosen regularization preserves those symmetries.

**Definition (Mechanical momentum).**
$$
\mathbf{P}_{\text{mech}}(T) = \sum_i \mu_{\text{arch}} \mathbf V_i(T)
$$
This is the mechanical momentum of the optional quadratic kinetic proxy. On a
general primitive kinetic-scalar chart, each
$\mu_{\text{arch}}\mathbf V_i$ is replaced by the declared conjugate momentum
$\mathbf p_i=P(\|\mathbf V_i\|)\hat{\mathbf V}_i$, with
$P'(s)=K'(s)/s$ as specified in [Energy](energy.md#kinetic-energy-and-momentum-of-a-single-architrino).
Neither construction assigns primitive mass to an architrino.

Because the accelerations are delayed, $d\mathbf{P}_{\text{mech}}/dT$ is generally nonzero.

**Definition (Wake momentum functional).** For an isolated system, define
$$
\mathbf{P}_{\text{wake}}(T) = \mathbf{P}_{\text{wake}}(T_\ast) - \int_{T_\ast}^{T} \sum_i \mathbf{F}_i(T')\,dT'
$$
with $\mathbf{F}_i = \mu_{\text{arch}} \mathbf A_i$ from the Master Equation.

**Validation condition (total momentum).**
$$
\mathbf{P}_{\text{tot}}(T) \equiv \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}(T)
$$
is constant in time for isolated solutions of the symmetry-preserving nonlocal action. With the integral definition above, constancy along one realized trajectory is true by construction; independent conservation evidence requires $\mathbf P_{\text{wake}}$ to be derived as the spatial-translation boundary charge of that same action. For working regularized models it remains a validation condition.

**Definition (Mechanical angular momentum).**
$$
\mathbf{L}_{\text{mech}}(T) = \sum_i \mathbf X_i(T) \times \mu_{\text{arch}} \mathbf V_i(T)
$$

**Definition (Wake angular momentum functional).**
$$
\mathbf{L}_{\text{wake}}(T) = \mathbf{L}_{\text{wake}}(T_\ast) - \int_{T_\ast}^{T} \sum_i \mathbf X_i(T')\times \mathbf{F}_i(T')\,dT'
$$

**Conservation target (total angular momentum).**
$$
\mathbf{L}_{\text{tot}}(T) \equiv \mathbf{L}_{\text{mech}}(T) + \mathbf{L}_{\text{wake}}(T)
$$
is the angular-momentum decomposition associated with rotational invariance of the nonlocal causal action. For isolated solutions of the symmetry-preserving action model it is conserved. For working regularized models, conservation of $\mathbf{L}_{\text{tot}}$ is a validation condition rather than an automatic consequence.

**Remark.** These definitions mirror the energy decomposition used earlier: the apparent "missing" momentum and angular momentum are assigned to in-flight causal-wake geometry. The total quantities are therefore functionals of the path history, not functions of the instantaneous particle state alone.

#### Energy Functional and No-Runaway Criterion

Time-translation invariance implies a conserved history functional, which we write as
$$
E_{\text{tot}}(T) = K_{\mu}(T) + E_{\text{wake}}(T)
$$
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as a compatible reconstruction up to a constant offset when it is derived from the same action-level acceleration law and boundary convention.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local collinear recapture model, it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

There is an important independence limit. If $E_{\text{wake}}$ or $U$ is defined only by integrating the same realized acceleration power $-\sum_i\mu_{\text{arch}}\mathbf A_i\cdot\mathbf V_i$, then constancy of $K_\mu+E_{\text{wake}}$ is true by construction. That reconstruction cannot independently detect a persistent same-sign tangential acceleration: it merely books the kinetic change into the opposite wake entry. An independent no-runaway or circular-closure test therefore needs the action-derived time-translation boundary charge, or another separately derived finite-window wake account, rather than the work integral alone.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit acceleration, then there exists $F_{\max}(\eta)$ such that
$$
\bigg|\frac{dK_{\mu}}{dT}\bigg| \le \sum_i \|\mathbf{F}_i\|\,\|\mathbf V_i\|
\le N\,F_{\max}(\eta)\,V_{\max}(T)
$$

**Theorem target (No-runaway criterion).** For an isolated system with fixed $\eta>0$, if the action-derived interaction charge $E_{\text{wake}}(T)$, or a compatible realized-trajectory reconstruction $U(T)$, is bounded below on the admissible history class (for example, by enforcing a minimum separation within the regularized kernel support), then $K_{\mu}(T)$ is bounded for all times where the solution exists. In particular, a runaway $V_{\max}(T)\to\infty$ is only possible if the corresponding interaction term tends to $-\infty$, which requires a collapse toward the singular regime or a breakdown of the regularized assumptions.

*Interpretation.* Self-hit repulsion can transfer energy between $U$ and $K$, but it cannot generate unbounded kinetic energy without a corresponding unbounded decrease in $U$. This is the core conservation argument for excluding unphysical runaway acceleration in the regularized model.

#### Simulation Diagnostics (Symmetry and Conservation)

In addition to the convergence checks in [Numerical Implementation Notes](#numerical-implementation-notes), track these conserved functionals in any isolated run:

- **Total energy**: $H_{\text{tot}}(T) = K_{\mu}(T) + E_{\text{wake}}(T)$, or a declared compatible reconstruction $K_{\mu}+U$, should remain constant within the chosen numerical tolerance.
- **Total momentum**: $\mathbf{P}_{\text{tot}}(T)$ should be constant; monitor $\|\mathbf{P}_{\text{tot}}(T)-\mathbf{P}_{\text{tot}}(T_{\mathrm{init}})\|$.
- **Total angular momentum**: $\mathbf{L}_{\text{tot}}(T)$ should be constant; in planar runs, the unit axis $\hat{\mathbf{n}} = \mathbf{L}_{\text{tot}}/\|\mathbf{L}_{\text{tot}}\|$ should remain fixed.
- **Binary symmetry defect** (for symmetric initial data):
$$
\Delta_{\text{sym}}(T)=\|\mathbf X_1(T)+\mathbf X_2(T)\|
$$
A secular drift indicates numerical asymmetry or a symmetry-breaking perturbation.

These diagnostics operationalize the symmetry constraints and provide early warning of numerical artifacts or model inconsistencies.

#### Closure Interface: Coarse-Graining Gate to Effective Quantum Envelope

For integration with the quantum closure program, the master equation provides the microscopic gate:
$$
\frac{d^2\mathbf X_i}{dT_r^2}=\text{delayed causal-hit sum over }\mathcal{C}_{ij}(T_r)
$$

The required next reduction is a controlled map to mesoscopic density dynamics:
$$
f(T,\mathbf X,\mathbf V)
\Longrightarrow
(\rho,\mathbf{u},S)
\Longrightarrow
\psi=\sqrt{\rho}\,e^{iS/\hbar_{\mathrm{eff}}}
$$

Closure condition for this interface:
- the same coarse-graining window that preserves validated dynamical invariants must recover the effective Schrödinger limit in the non-relativistic, weak-field, fixed-particle-number regime;
- residual non-Markovian terms must be explicitly retained as correction operators, not absorbed into uncontrolled fitting.

**Return-map symplectic residual for action-derived branch promotion.** When a replayable branch chart is promoted to an action-derived reduced Hamiltonian chart, the section return map must preserve the reduced symplectic structure. Let $z=(Q^a,\Pi_a)$ be local reduced coordinates after the retained root constraints and section condition have been solved, let
$$
\mathcal{P}_{\mathcal{S}}:z_n\mapsto z_{n+1},
\qquad
M_{\mathcal{S}}=D\mathcal{P}_{\mathcal{S}}
$$
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
The velocity-coupled one-form shifts canonical momentum and yields the effective Lorentz-force law. Under
$$
\phi_{\mathrm{eff}}\mapsto\phi_{\mathrm{eff}}-\partial_{t_{\mathrm{eff}}}\chi,
\qquad
A_i^{\mathrm{eff}}\mapsto A_i^{\mathrm{eff}}+\partial_{x_{\mathrm{eff}}^i}\chi
$$
the Lagrangian changes only by $e\,d\chi/dt_{\mathrm{eff}}$, so the effective equations are unchanged. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a comparison structure, not substrate ontology: the primitive kernel still contains only radial causal hits. The corresponding closure target is to extract an assembly-level effective one-form
$$
\mathcal{A}_{\mathrm{eff}}
=
A_a^{\mathrm{eff}}(Q,t_{\mathrm{eff}})\,dQ^a-\phi_{\mathrm{eff}}(Q,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$
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
provided the record has no explicit $dT_{t,ij,\ell}/dT$ dependence after the chosen reduction. Variation with respect to the receiver position exposes the constraint contribution
$$
\delta_{\mathbf X_i}
\int_W\lambda_{ij,\ell}G_{ij,\ell}\,dT
=
\int_W
\lambda_{ij,\ell}(T)\,
\hat{\mathbf r}_{ij,\ell}(T)\cdot\delta\mathbf X_i(T)\,dT
$$
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
Here $o_\ell$ denotes the receiver index of branch record $\ell$. This is the delayed-action analogue of ordinary holonomic constraint handling: one may solve constraints into generalized coordinates, or retain them with multipliers, but the multiplier ledger must not be hidden inside a claimed exact acceleration law.

**Noether history-functional balance target.** Let $S_{\mathfrak{B}}^{(\eta)}$ be a symmetry-preserving regularized action on a retained branch chart, and let a one-parameter transformation have infinitesimal generator $\boldsymbol{\xi}_i(T)$ on each worldline. If the action changes only by endpoint terms,
$$
\delta_{\xi}S_{\mathfrak{B}}^{(\eta)}
=
\left[
B_{\xi}^{(\eta)}(T)
\right]_{T_a}^{T_b}
$$
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
where $\mathbf{R}_i^{(\eta)}$ is the Euler residual of the same action and $\mathcal{B}_{\xi}^{(\eta)}$ collects leakage through finite memory endpoints, period cuts, omitted branch records, and non-characteristic tail endpoints. Exact conservation follows only when both terms vanish. Time translation, spatial translation, and rotation are the special cases that produce energy, momentum, and angular momentum above. This is the delayed version of the standard symmetry-to-conservation statement, with the crucial difference that the conserved object is a particle-plus-wake history functional rather than an equal-time particle function.
