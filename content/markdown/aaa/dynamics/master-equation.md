# Master Equation

This chapter answers the first dynamics question: given architrinos moving in absolute time through the Euclidean void, what exactly makes one of them accelerate? The answer is the delayed, receiver-local law used throughout the dynamics branch. It defines what counts as a causal hit, how path history selects the active emission events, and how those hits sum into the acceleration of the receiver.

For the primitive-entity ontology, see [Architrino](../foundations/architrino.md). This chapter begins where ontology becomes motion. A causal wake is not a vague field surrounding a source; it is a delayed contact condition between a past emission event and a receiver event. When that condition closes, the receiver samples a line-of-action contribution with source-normal root legality and receiver-normal branch strength.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation. Later sections develop the delay differential equation form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface needed by binaries, Noether braids, effective geometry, and quantum closure.

## Foundations and Causal Geometry

### Purpose and Scope

This document presents the **Master Equation of Motion (EOM)** governing the lawful evolution of all architrinos in the Euclidean void and absolute time. It is the microscopic dynamics input for later closure programs: assemblies, effective continuum descriptions, observer-level geometry, quantum behavior, and gravity must be recovered from this law only after the corresponding assembly, coarse-graining, and validation burdens are met. The chapter keeps $c_f$ explicit in formulas; setting $c_f=1$ is a nondimensional convention, not a change in the causal law.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $T$. Causal roots, Jacobians, history integrals, and accelerations are all parameterized by $T$ and by emission times $T_{\mathrm{em}}<T$. Clock readouts, time-dilation language, and effective metric comparisons belong only to later observer-inference chapters after the assembly dynamics have supplied a branch-certified period record.

The Master EOM is:

- **Deterministic**: Given complete initial conditions at $T_\ast$, the future is determined, with **deterministic multistability** at threshold regimes.
- **Non-Markovian**: Depends on full path history, not just instantaneous state.
- **Event-local at the receiver**: Only delayed causal intersections at the receiver event contribute to acceleration (no action-at-a-distance).
- **Causal**: All influences propagate at finite field speed $c_f$.
- **Self-consistent**: Includes self-interaction (self-hit) when same-source causal roots exist; super-field-speed interval history is a necessary warning condition for simple nontrivial self-hit roots, not a sufficient criterion by itself.

The level distinction used throughout the chapter is:

| Level | What is asserted here | What is not asserted here |
| --- | --- | --- |
| Substrate ontology | Architrinos move in absolute time through the Euclidean void and emit causal wakes. | No fundamental spacetime metric, continuum field substance, or observer reconstruction is assumed. |
| Dynamics | Acceleration is the receiver-local sum over delayed causal-root hits. | A plotted orbit or numerical residual is not a proof unless its branch chart is certified. |
| Effective description | Potentials, fields, one-forms, metrics, and wave functions may be reconstructed after coarse-graining. | Effective variables are not promoted to substrate ontology by their predictive usefulness. |
| Inference and observation | A receiver or observer may infer source configurations from hit records and assembly responses. | Inference does not determine the full ontic history unless the missing path-history data are supplied. |

### Overview and Key Principle

#### The Central Idea

**Receiver-local relevance principle:**

> The only substrate-level contributions to $\mathbf A_i(T)$ are causal wake intersections at the receiver event.

At time $T$, the acceleration of architrino $i$ at position $\mathbf X_i(T)$ depends only on causal wake surfaces that intersect its current location.

- **Substrate event**: $\mathbf X_i(T)$ coincides with an expanding causal isochron emitted by some source at some past time $T_{\mathrm{em}}<T$.
- **Path-history input**: the source worldline determines which emission times solve the causal constraint.
- **Effective reconstruction**: a potential or field value away from the receiver is useful only after one has declared a continuum or diagnostic representation.
- **Inference layer**: source identity, distance, and emission velocity may be reconstructed from additional records, but they are not directly supplied by a single hit.

This is an **event-local delayed interaction rule**: the acceleration is evaluated at the receiver event, but depends on path history through the delayed causal roots.

In the absence of any causal hits, an architrino follows inertial motion: straight-line, constant-velocity trajectories in the fixed Euclidean background.

Operationally, the expanding causal wake is also the theory's minimal bridge between time and space. Absolute time orders emissions, Euclidean distance sets the propagation delay, and the receiver event is where those two inputs are rejoined into one physical interaction. The wake law is therefore not just a force prescription; it is the mechanism that turns temporal ordering plus spatial separation into concrete dynamics.

#### Abstract Form

The Master Equation of Motion (abstract level):

$$
\boxed{
\frac{d^2 \mathbf X_i}{dT^2} = \sum_{j \neq i} \mathbf A_{ij}(\text{causal history}) + \mathbf A_{ii}(\text{self-hit})
}
$$

where:

- $\mathbf A_{ij}(\text{causal history})$: Sum of all per-hit accelerations from source $j \neq i$ arriving at receiver $i$ at time $T$
- $\mathbf A_{ii}(\text{self-hit})$: Sum of all self-hit acceleration contributions (architrino $i$ intersecting its own past emissions)

(The per-hit acceleration $\mathbf A_{ij}(T;T_{\mathrm{em}})$ is defined below in canonical form. The substrate law is acceleration-first. If a force-like bookkeeping symbol is desired, introduce one universal conversion constant $\mu_{\text{arch}}$ and define $\mathbf F_{ij} \equiv \mu_{\text{arch}}\mathbf A_{ij}$.)

**Key insight:** Both terms have the same functional form: a radial inverse-square law modulated by the receiver-normal crossing of a causal wake branch. They differ only in source identity ($j = i$ vs $j \neq i$). The source-normal Jacobian remains the transversality floor that makes the causal root legal; the receiver-normal numerator says how the receiver path cuts through the emitted wake sequence.

#### Path-History Sum and Integral Representation

The Master EOM is most naturally understood as a **path-history branch sum**: all of the physical content resides in the past worldlines of the sources, and the causal constraint selects the emission points on those worldlines whose influence reaches the receiver event “now.”

In integral form, the same branch-sum law can be written as

$$
\frac{d^2 \mathbf X_i}{dT^2}
= \sum_j \kappa\,\sigma_{ij}\,|q_i q_j|
\int_{-\infty}^T \mathrm{d}T_{\mathrm{em}} \;
\frac{\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})}{r_{ij}^2(T;T_{\mathrm{em}})}
\delta\!\Big(g_{ij}(T;T_{\mathrm{em}})\Big)
$$

where

- $r_{ij}(T;T_{\mathrm{em}}) = \|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\|$,
- $\hat{\mathbf{r}}_{ij} = (\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}}))/r_{ij}$,
- $g_{ij}(T;T_{\mathrm{em}}) = r_{ij}(T;T_{\mathrm{em}}) - c_f(T-T_{\mathrm{em}})$,
- $\partial_{T_{\mathrm{em}}} g_{ij}(T;T_{\mathrm{em}}) = c_f - \hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}})$,
- $\delta(\cdot)$ enforces the causal constraint $g_{ij}=0$, and
- $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ encodes attraction/repulsion.

The causal delta collapses with the standard source-normal root Jacobian, so the source-time part of the integral evaluates to
$$
\int_{-\infty}^{T}\mathrm{d}T_{\mathrm{em}}\;
\! f(T_{\mathrm{em}})\,\delta\!\big(g_{ij}(T;T_{\mathrm{em}})\big)
=
\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\frac{f(T_{\mathrm{em}})}
{\left|\partial_{T_{\mathrm{em}}} g_{ij}(T;T_{\mathrm{em}})\right|}
$$
provided the active roots are simple. This source-time collapse supplies the root-selection denominator. The full receiver-time branch row must also account for how the receiver path crosses the same emitted wake sequence. For a simple branch $T_{\mathrm{em}}=T_\ell(T)$, define
$$
D_{s,ij}
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T;T_\ell)\cdot\mathbf V_j(T_\ell),
\qquad
D_{T,ij}
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T;T_\ell)\cdot\mathbf V_i(T)
$$
and
$$
m_{ij}
\equiv
\frac{D_{T,ij}}{D_{s,ij}},
\qquad
W_{ij}
\equiv
\left|m_{ij}\right|.
$$
Here $m_{ij}=dT_{\mathrm{em},\ell}/dT$ is the signed branch-orientation factor, while $W_{ij}$ is the unsigned receiver-normal branch strength used in the acceleration magnitude. Acceleration at $T$ therefore depends on causal contributions selected by the source worldline and on the receiver's normal crossing of those contributions, with no contribution from noncausal points on that worldline.

For a certified branch chart, simplicity is recorded as a transversality floor:
$$
\left|
\partial_{T_{\mathrm{em}}}g_{ij}(T;T_{\mathrm{em}})
\right|
=
\left|
c_f-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}})
\right|
\ge
\kappa_{\mathrm{hit}}>0
$$
When this floor fails, the active root is caustic-like or degenerate and must be routed to a different branch chart or regularization regime. In special geometries the floor can be computed rather than declared; the principal circular partner branch derives $\kappa_{\mathrm{hit}}^{\mathrm{bin}}=c_f(1+\beta\sin(\phi/2)) > c_f$ in [Binary Dynamics](binary-dynamics.md#principal-partner-root-certificate), where Binary Dynamics uses $\phi/2=\xi$ for the circular delay angle used below.

#### Caustic Transit and Finite Impulse

The branch expression with $W_{ij}^{\mathrm{rec}}$ should not be interpreted as a permission to pin an architrino at an infinite pointwise force. At a simple delay-map caustic, the branch chart fails, but the time-integrated velocity change can remain finite.

Let $T_{\mathrm{em}}$ denote the source emission-time variable near a degenerate root $(T_\ast,T_{\mathrm{em},\ast})$, and assume the local delay map has the nondegenerate fold form
$$
g(T,T_{\mathrm{em}})
=
\alpha(T_{\mathrm{em}}-T_{\mathrm{em},\ast})^2
+
\lambda(T-T_\ast)
+
O\!\left(|T_{\mathrm{em}}-T_{\mathrm{em},\ast}|^3+|T-T_\ast|\,|T_{\mathrm{em}}-T_{\mathrm{em},\ast}|+|T-T_\ast|^2\right)
$$
with $\alpha>0$, $\lambda>0$, and $r_{ij}\ge r_{\min}>0$ on the local support. For $T<T_\ast$ the two simple roots satisfy
$$
T_{\mathrm{em},\pm}(T)
=
T_{\mathrm{em},\ast}
\pm
\sqrt{\frac{\lambda}{\alpha}(T_\ast-T)}
+
O(T_\ast-T)
$$
and the Jacobian factor scales as
$$
\left|\partial_{T_{\mathrm{em}}} g(T,T_{\mathrm{em},\pm}(T))\right|
=
2\sqrt{\alpha\lambda}\sqrt{T_\ast-T}
+
O(T_\ast-T)
$$
Thus each branch contribution has at worst the local bound
$$
\left\|
\mathbf A_{ij,\pm}(T)
\right\|
\le
\frac{C}{\sqrt{T_\ast-T}}
$$
where $C$ absorbs the bounded numerator, $r_{\min}^{-2}$, polarity factor, and coupling. The mechanical impulse through the caustic window is finite:
$$
\int_{T_\ast-\varepsilon}^{T_\ast}
\left\|
\mathbf A_{ij,+}(T)
+
\mathbf A_{ij,-}(T)
\right\|dT
\le
4C\sqrt{\varepsilon}
$$

The same conclusion holds for a finite-order algebraic caustic $g\sim (T_{\mathrm{em}}-T_{\mathrm{em},\ast})^m-\lambda(T-T_\ast)$ with finite $m > 1$: the source-normal denominator in $W_{ij}^{\mathrm{rec}}$ scales like $|T-T_\ast|^{(m-1)/m}$ when the receiver-normal numerator is bounded, so the branch strength is locally integrable in receiver time. A persistent interval with $D_s=0$, a cusp with no finite-order normal form, a receiver-normal numerator degeneracy required by the proof chart, or a simultaneous collision-floor failure is not covered by this impulse lemma and must remain in the regularized chart. The simulation rule is therefore: integrate the regularized acceleration through a caustic transit and record the finite $\Delta\mathbf V$; do not hold the state exactly on $D_s=0$ as an infinite-force constraint.

The singular set should be routed by stratum, not by the single phrase "small denominator." Let
$$
\Sigma_{ij}
=
\{(T,T_{\mathrm{em}},\lambda): g(T,T_{\mathrm{em}};\lambda)=0,\ \partial_{T_{\mathrm{em}}} g(T,T_{\mathrm{em}};\lambda)=0\}
$$
inside a declared one- or multi-parameter branch family. The finite-impulse lemma covers the fold stratum $\Sigma^1$, where $\partial_{T_{\mathrm{em}}T_{\mathrm{em}}}g\ne0$ and the control parameter crosses the fold transversely. Cusp and higher strata, such as $\Sigma^{1,1}$, require extra degeneracy conditions and are not ordinary force rows. They may merge or split more than one opposite-sign root pair at once, so their ledger transition is not certified by the generic $\Delta N=\pm2,\ \Delta D=0$ fold law until a separate regularized normal form is supplied. Thus $\Sigma^1$ routes to finite impulse plus transition metadata, while $\Sigma^{1,1}$ or deeper routes to a singular-stratum chart before promotion.

The word "set" in $\mathcal{C}_{ij}(T)$ should therefore be read as a root set extracted from a continuous path-history integral, not as a replacement for that history. The source worldline is continuous data. In the sharp causal-wake limit the delta constraint collapses the received contribution to the emission times in $\mathcal{C}_{ij}(T)$; with $\eta > 0$ mollification, the received contribution comes from finite-width neighborhoods of those roots. A single source can contribute more than one root at the same receiver event when its worldline crosses the receiver's backward causal surface more than once, especially in curved or super-field-speed history. The same bookkeeping applies to nontrivial self-history roots when $j=i$.

Writing
$$
D_{s,ij}(T;T_{\mathrm{em}})
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}}),
\qquad
D_{T,ij}(T;T_{\mathrm{em}})
\equiv
c_f-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_i(T)
$$
and
$$
J_{ij}^{\mathrm{src}}(T;T_{\mathrm{em}})
\equiv
\frac{D_{s,ij}(T;T_{\mathrm{em}})}{c_f},
\qquad
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\equiv
\left|
\frac{D_{T,ij}(T;T_{\mathrm{em}})}
{D_{s,ij}(T;T_{\mathrm{em}})}
\right|,
$$
one obtains the exact branch-resolved form
$$
\frac{d^2 \mathbf X_i}{dT^2}
=
\sum_j \sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}^2(T;T_{\mathrm{em}})}
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})
$$
Since $\partial_{T_{\mathrm{em}}}g_{ij}(T;T_{\mathrm{em}})=D_{s,ij}(T;T_{\mathrm{em}})=c_fJ_{ij}^{\mathrm{src}}(T;T_{\mathrm{em}})$, the source-time collapse supplies the source-normal denominator. The receiver-time crossing of the same branch supplies the receiver-normal numerator $D_{T,ij}$. Constant factors of $c_f$ are absorbed into $\kappa$ by convention.
An architrino emits potential at a constant rate per unit absolute time, but a moving source and a moving receiver together determine how that steady output is sampled. The received branch strength is therefore velocity dependent through the receiver-normal branch factor $W_{ij}^{\mathrm{rec}}$: source motion compresses or dilates the emitted wake sequence, while receiver-normal motion changes the rate at which the receiver crosses that sequence. This factor is part of the fundamental branch law, not an optional correction.

Numerical implementations discretize this representation by sampling candidate emission times and solving for the active roots. The familiar “sum over spherical wake surfaces” is therefore a numerical realization of the same branch-selection rule, not a separate physical mechanism.

**Simple-root transport lemma.** Let
$$
F_{ij}(T,S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)
$$
and suppose $F_{ij}(T,S(T))=0$ on an interval where the active root is simple. Then $S(T)$ is differentiable and
$$
\frac{dS}{dT}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T;S)\cdot\mathbf V_i(T)}
{c_f-\hat{\mathbf{r}}_{ij}(T;S)\cdot\mathbf V_j(S)}
=
\frac{1-\hat{\mathbf{r}}_{ij}\cdot\mathbf V_i/c_f}{J_{ij}(T;S)}
$$
Thus a simple causal root moves continuously with receiver time as long as the denominator stays away from zero. Simulations should track this root-transport residual alongside the root residual and the $J$ floor; failure of the transport equation is a branch-chart failure, not an ordinary force fluctuation.

#### Source-Normal Roots, Receiver-Normal Branch Strength, and Action Residual

For a retained branch row $(i,j,T,T_{\mathrm{em}})$, keep the source-normal root floor, receiver-normal branch strength, and action residual as separate equations.

**Source-normal root floor.** The source, i.e. the emitting architrino, enters the root-selection denominator through the delay-map Jacobian
$$
J_{ij}^{\mathrm{src}}(T;T_{\mathrm{em}})
=
1-\frac{\hat{\mathbf r}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}})}{c_f},
\qquad
D_{s,ij}(T;T_{\mathrm{em}})
=
c_fJ_{ij}^{\mathrm{src}}(T;T_{\mathrm{em}}).
$$
Only the source velocity projection along $\hat{\mathbf r}_{ij}$ appears in this transversality floor. Tangential source motion still matters through the source worldline, active root set, separation vector, and inactive-root gaps, but it is not a second instantaneous multiplier.

**Receiver-normal branch strength.** The receiver velocity controls how the same causal root moves as receiver time advances:
$$
\frac{dT_\ell}{dT}
=
\frac{1-\hat{\mathbf r}_{ij}(T;T_\ell)\cdot\mathbf V_i(T)/c_f}
{1-\hat{\mathbf r}_{ij}(T;T_\ell)\cdot\mathbf V_j(T_\ell)/c_f}.
$$
Thus receiver motion belongs in the branch strength row through
$$
W_{ij}^{\mathrm{rec}}(T;T_\ell)
=
\left|
\frac{c_f-\hat{\mathbf r}_{ij}(T;T_\ell)\cdot\mathbf V_i(T)}
{c_f-\hat{\mathbf r}_{ij}(T;T_\ell)\cdot\mathbf V_j(T_\ell)}
\right|.
$$
A chart that changes receiver-normal velocity can change the action magnitude even when the source-normal root denominator is unchanged.

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
with the same branch floors and boundary convention used by the branch chart. If this residual is retained rather than cancelled, it must close as a recoil-inclusive wake-history term in the same energy, momentum, and angular-momentum ledger. This residual condition is not a license to drop the receiver-normal factor. It is the test for promoting the action scaffold in [Exact Nonlocal Lagrangian](#exact-nonlocal-lagrangian) after the same source-normal floors, receiver-normal branch-strength rows, and boundary convention have been declared.

#### Branch-Chart Closure Object

A local master-equation closure claim should be attached to an explicit branch-chart object, not just to a plotted orbit or a small force residual. For a branch chart on a section $\mathcal{S}$, define
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
Here $\mathcal{R}^{\mathrm{act}}$ is the active causal-root set retained by the chart, $\mathcal{G}^{\mathrm{inact}}$ is the collection of inactive branch-gap functions, $\nu_J$ is the active-root source-normal Jacobian floor, $\nu_{\mathrm{rec}}$ is the retained receiver-normal branch-strength floor or certified bounded interval for $W_{ij}^{\mathrm{rec}}$, $h_{\mathrm{mem}}$ is the required memory depth, $\mathcal{R}_{\mathrm{return}}$ is the return residual on the section, and $\lambda_{\mathrm{sec}}$ is the transverse section-stability margin.

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

Equivalently, $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ is the local trivialization data for the causal-root sheaf near the retained history. Promotion requires more than naming the active roots: the map from retained history and section coordinates to active roots, receiver-normal branch acceleration rows, and wake-history increment rows must be locally invertible onto the declared chart image, with inverse conditioning controlled by $\nu_J$, $\nu_{\mathrm{rec}}$, the inactive gaps, the finite memory margin, and $\lambda_{\mathrm{sec}}$. A plotted orbit with no controlled inverse is a trace, not a branch chart.

**Local promotion lemma.** If a candidate history supplies $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active-root floors, positive inactive gaps, finite memory, bounded return residual, and stable section monodromy, then the history may support a local master-equation closure claim on that section. The lemma does not prove global closure, eliminate all folds, control the $\eta\to0$ limit, or certify unrelated histories. It only promotes the branch chart from a numerical trace to a locally replayable causal-root closure record.

#### State-Dependent Delay Compatibility

A branch-chart closure object must also be compatible with the delayed history space that generates the active roots. Fix a retained history tube
$$
\mathcal{U}_{\mathfrak{B}}
\subset
C^1\!\left([-h,0],(\mathbb{R}^3)^N\right)
$$
around the returned history segment. For each active branch row $\ell$, write its emission offset as $\theta_\ell(\phi)\in[-h,0)$ for a history $\phi\in\mathcal{U}_{\mathfrak{B}}$, and define
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
and if every inactive complement remains separated by the declared positive gap. Under these conditions the implicit-function theorem gives $C^1$ dependence of $\theta_\ell$ on the retained history, so the branch acceleration, root-transport residual, receiver-normal branch-strength row, and wake-history Noether increments are functionals on one local history chart rather than pointwise rows that only happen to close at one evaluation time. This is the reconstruction-regularity content of the branch chart: the root reconstruction has an inverse bound controlled by the transversality floor, schematically $\|D\theta_\ell\|\lesssim (c_f\nu_J)^{-1}$ times the history-evaluation norm, until a fold or chart boundary is reached.

This compatibility condition is a theorem-target requirement, not a new acceleration law. It says that a promoted branch chart must define a locally replayable delayed functional system: nearby retained histories must keep the same root identities, positive source-normal Jacobian floor, bounded receiver-normal branch-strength row, inactive gaps, and finite memory depth until a declared fold, branch transition, or chart boundary is reached.

#### Local-To-Global Branch-Chart Gluing Target

The branch-chart object above also defines a candidate causal-root sheaf for global closure. For an open history or parameter neighborhood $U$, let
$$
\mathcal{F}_{\mathrm{root}}(U)
=
\{\text{admissible branch charts on }U\text{ with the declared regularization data}\}
$$
and restrict a chart from $U$ to $V\subset U$ by restricting its active-root rows, inactive gaps, memory tube, and endpoint convention. The implicit-function theorem supplies the local restriction maps while the root identities remain simple.

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
\mathbf r_{ij}(T,T_{\mathrm{em}})
\equiv
\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}}),
\qquad
r_{ij}(T,T_{\mathrm{em}})\equiv \|\mathbf r_{ij}(T,T_{\mathrm{em}})\|
$$
and, away from the zero vector,
$$
\widehat{\mathbf r}_{ij}(T,T_{\mathrm{em}})
\equiv
\frac{\mathbf r_{ij}(T,T_{\mathrm{em}})}{r_{ij}(T,T_{\mathrm{em}})}
$$
The dual-mollified finite-memory evolution law is
$$
\boxed{
\frac{d^2\mathbf X_i}{dT^2}
=
\kappa
\sum_j \sigma_{ij}|q_iq_j|
\int_{T-h}^{T}
\frac{\mathbf r_{ij}(T,T_{\mathrm{em}})}
{\left(r_{ij}^2(T,T_{\mathrm{em}})+\epsilon_c^2\right)^{3/2}}
\left|D_{T,ij}(T,T_{\mathrm{em}})\right|
\delta_\eta\!\big(r_{ij}(T,T_{\mathrm{em}})-c_f(T-T_{\mathrm{em}})\big)\,dT_{\mathrm{em}}
}
$$
where, for $r_{ij} > 0$,
$$
D_{T,ij}(T,T_{\mathrm{em}})
\equiv
c_f-\widehat{\mathbf r}_{ij}(T,T_{\mathrm{em}})\cdot\mathbf V_i(T)
$$
At $\mathbf r_{ij}=\mathbf 0$, the complete vector product multiplying
$\delta_\eta$ is defined by its continuous extension, which is $\mathbf 0$.
The scalar $D_{T,ij}$ is not evaluated separately at that point.

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

This equation is the certification-level law for the dual-mollified problem. The causal-surface mollifier
$$
\delta_\eta
$$
selects causal surfaces with finite width, while
$$
\epsilon_c
$$
smoothly regularizes the near-collision inverse-square amplitude. The factor
$|D_{T,ij}|$ supplies the receiver-normal crossing rate. On a finite simple-root
chart, collapse of the causal-surface delta function gives
$$
\int
\frac{\mathbf r_{ij}}
{\left(r_{ij}^2+\epsilon_c^2\right)^{3/2}}
|D_{T,ij}|\,\delta(g_{ij})\,dT_{\mathrm{em}}
=
\sum_{T_{\mathrm{em}}\in\mathcal C_{ij}(T)}
\frac{\mathbf r_{ij}}
{\left(r_{ij}^2+\epsilon_c^2\right)^{3/2}}
\left|\frac{D_{T,ij}}{D_{s,ij}}\right|
$$
Thus the $\epsilon_c\to0^+$ limit away from coordinate coincidence recovers
the canonical inverse-square receiver-normal branch law. Branch-resolved
formulas are local reductions of this equation on finite simple-root charts.
They should not be used as the global definition across causal folds, caustic
transit, or chart-boundary verification.

The two regulators quarantine different singular loci. The width $\eta$ regularizes the causal-surface collapse, branch folds, and caustic-transit impulse; the core scale $\epsilon_c$ regularizes the coincidence or diagonal collision locus. A theorem packet may refine them together for computation, but a sharp-limit claim must state which of $\eta\to0^+$ and $\epsilon_c\to0^+$ is being taken, and why the other singular locus remains controlled during that limit.

Coordinate coincidence is also a provenance question, not an annihilation rule. Two architrinos may share $\mathbf X_i(T)=\mathbf X_j(T)$ on one absolute-time slice only as a boundary case of the retained history record; the next admissible update is determined by their identities, polarities, velocities, past causal-wake ledgers, and the same $\eta,\epsilon_c$ convention. If two like-polarity records agree through the retained memory window up to label permutation, the deterministic law is quotient-degenerate: relabeling the records changes no force row until a provenance-visible history distinguishes them. If the polarities, velocities, or retained path histories differ, later incoming causal wakes can separate the records even though their current coordinates coincided. Thus the $r=0$ stratum is not a contact-force or annihilation channel. It is a regularized or quarantined branch condition whose continuation must preserve provenance.

#### Finite-$\eta$ Pathology Quarantine Theorem Target

The classical point-source pathologies are not closed by the sharp branch formula alone. The theorem target is finite-$\eta$, branch-chart local, and conditional on one regularized action and energy convention. Fix a finite architrino set, a finite window $W=[T_a,T_b]$, a memory depth $h < \infty$, a causal-surface width $\eta > 0$, a core scale $\epsilon_c > 0$, and a branch chart
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
$$
whose retained rows are generated by the dual-mollified evolution law above.

The admissibility assumptions are:

1. The evolution is causal in absolute time: every force row is generated from $T_{\mathrm{em}} < T$, and the self-coincident endpoint is excluded by the $H(0)=0$ convention or by the declared core regularization.
2. The retained chart has finite memory, positive inactive-root gaps, a declared receiver-normal branch-strength interval, and either a positive active-root source-normal Jacobian floor $\nu_J > 0$ or an explicitly declared finite-order caustic transit integrated in the dual-mollified law.
3. The active support stays away from an unregularized collision: either $r_{ij,\ell}\ge d > 0$ on the retained rows or the same $\epsilon_c$ cutoff is used in the force, action, and energy rows.
4. The regularized right-hand side is locally Lipschitz on the retained history tube, so the finite-$\eta$ state-dependent delay problem has existence, uniqueness, and continuation until a declared boundary of the admissible class is reached.
5. The same regularized action or compatible realized-trajectory reconstruction supplies the force row, wake-history energy, momentum, and angular-momentum rows. Endpoint leakage, omitted branch rows, and period-cut terms must appear as residuals rather than hidden corrections.

Under these assumptions, the finite-$\eta$ theorem packet should prove the following local conclusions.

- **Divergent self-energy is quarantined.** There is no accepted instantaneous self-kick, no unregularized $r=0$ self-root inside the chart, and every retained self-hit contribution is bounded by the declared $d$, $\epsilon_c$, $\eta$, $\nu_J$, and receiver-normal branch-strength data. Any remaining divergence is therefore a failure of the branch floor, core convention, memory window, receiver-normal interval, or $\eta\to0^+$ convergence claim, not an accepted finite-$\eta$ state.
- **Runaway solution branches are quarantined.** If the same action-level bookkeeping gives
  $$
  E_{\text{tot}}^{(\eta)}(T)=K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T),
  \qquad
  E_{\text{wake}}^{(\eta)}(T)\ge U_{\min}^{(\eta)}>-\infty,
  $$
  then $K_{\mu}(T)$ remains bounded on $W$. A branch with $V_{\max}\to\infty$ must therefore leave the admissible class by driving the interaction charge downward without bound, losing a floor, or breaking the declared action-energy residual.
- **Pre-acceleration is excluded at finite $\eta$.** The acceleration at $T$ is a functional of the retained history segment $[T-h,T)$, together with the current receiver event, and contains no future state. A proposed action repair is admissible only when its endpoint convention contributes a wake-history boundary term or a vanishing residual, not a future-boundary force selection rule.
- **Caustic and Jacobian blow-up are quarantined.** Simple-root charts require $\nu_J > 0$. A finite-order caustic may be crossed only through the dual-mollified equation with finite integrated impulse and stable transition metadata. Persistent $J=0$, cusp behavior outside a finite-order normal form, simultaneous collision-floor failure, or regulator-dependent transition observables are chart failures rather than ordinary force rows.
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

The validation residuals consumed by this theorem target are the root residual, root-transport residual, active source-normal Jacobian floor, receiver-normal branch-strength interval, inactive-gap residual, finite-memory residual, return residual, finite-window energy residual $\mathcal{R}_E$, momentum residual $\mathcal{R}_P$, angular-momentum residual $\mathcal{R}_J$, Euler residual of the same action, endpoint or period-cut leakage, transition-observable residuals across $\eta$ refinement, and the symplectic residual $\mathcal{R}_{\Omega}$ when the branch is promoted to a reduced Hamiltonian chart. The theorem is finite-$\eta$ only; any zero-width or infinite-system statement requires the separate convergence boundary stated in the regularization package.

---

#### Regularized Energy Diagnostic for the Exact Charge

For computation with finite causal-wake-surface width $\eta>0$, it is useful to introduce an $\eta$-regularized diagnostic for the same history-aware energy charge tracked by the exact nonlocal action. When one wants a quadratic kinetic bookkeeping proxy, use a single universal conversion constant $\mu_{\text{arch}}$ rather than particle-specific substrate masses. This smooth expression is used for numerical evaluation and convergence testing of the conserved quantity:
$$
E_{\text{tot}}^{(\eta)}(T)
= \sum_i \frac{1}{2} \mu_{\text{arch}} \left\|\mathbf V_i(T)\right\|^2
+ E_{\text{wake}}^{(\eta)}(T)
$$
For the regularized interaction diagnostic, a convenient working expression is:
$$
E_{\text{wake}}^{(\eta)}(T) =
\frac{1}{2}\sum_{i,j} \kappa\,\sigma_{ij}\,|q_i q_j|
\int_{T-h}^{T} dT_{\mathrm{em}}\;
\frac{W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})}{r_{ij}^2(T; T_{\mathrm{em}})}\,
\delta_\eta\!\big(r_{ij}(T; T_{\mathrm{em}}) - c_f(T - T_{\mathrm{em}})\big)
$$
where $h$ bounds the causal memory depth used in analysis and simulation. Because this expression is written with the receiver-normal branch-level inverse-square force density, it should be treated as a diagnostic candidate unless it is derived from the same time-translation-invariant action-level regularization as the action charge below. If the dual-mollified law with a core cutoff $\epsilon_c$ is used, the energy diagnostic must carry the same cutoff convention. The nonlocal Noether charge used for theorem-level conservation is the boundary functional in [Action-level wake-energy functional at time boundary $T$](#action-level-wake-energy-functional-at-time-boundary-t).

### Causal Interaction Set (The Geometry of Delay)

#### Definition of Causal Emission Times

For a receiver at position $\mathbf X_i(T)$ and a source with worldline $\mathbf X_j(T')$, the **causal emission times** $\mathcal{C}_{ij}(T)$ are all past times $T_{\mathrm{em}} < T$ such that a causal wake surface emitted by source $j$ at $T_{\mathrm{em}}$ arrives at receiver $i$ at time $T$.

**Causal constraint:**

$$
\|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}})
$$

where $c_f$ is the field speed (set to 1 in natural units).

**Notation:**

$$
\mathcal{C}_{ij}(T) = \Big\{ T_{\mathrm{em}} < T \;\Big|\; \|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}}) \Big\}
$$

#### Causal-Time Map and Root Topology

For fixed receiver time $T$, define the causal-time map

$$
f_T^{(ij)}(T_{\mathrm{em}})
\equiv
T_{\mathrm{em}} + \frac{1}{c_f}\,\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\|,
\qquad
F_T^{(ij)}(T_{\mathrm{em}})\equiv f_T^{(ij)}(T_{\mathrm{em}})-T
$$

Then causal emission times are exactly the roots:

$$
T_{\mathrm{em}}\in \mathcal{C}_{ij}(T)\quad \Longleftrightarrow\quad F_T^{(ij)}(T_{\mathrm{em}})=0
$$

Operationally, this is the branchwise source-to-receiver reading of the dynamics. The source worldline supplies a path-history map $T_{\mathrm{em}}\mapsto(\mathbf X_j(T_{\mathrm{em}}),\mathbf V_j(T_{\mathrm{em}}))$, while the receiver supplies the event data $(\mathbf X_i(T),\mathbf V_i(T),T)$. Solving $F_T^{(ij)}(T_{\mathrm{em}})=0$ selects exactly those source-history points whose causal isochrons are received at that event. Each selected root therefore maps one source-history branch into one receiver-local line of action; the delay-map Jacobian below records how constant source emission cadence is compressed or dilated when read at the receiver. When multiple roots exist, the causal-root ledger is the bookkeeping of these simultaneous source-to-receiver branch matches.

The one-dimensional delay-map Jacobian is

$$
\frac{dF_T^{(ij)}}{dT_{\mathrm{em}}}
=
1-\frac{\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot \mathbf V_j(T_{\mathrm{em}})}{c_f}
$$

On a bounded history interval $I_T$ (e.g., simulation memory window), define:

- Unsigned root count: $N_{ij}(T)\equiv \#\mathcal{C}_{ij}(T)$,
- Signed Brouwer degree:
  $$
  D_{ij}(T)\equiv \deg(F_T^{(ij)},I_T,0)=\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)} \mathrm{sign}\!\left(\frac{dF_T^{(ij)}}{dT_{\mathrm{em}}}\Big|_{T_{\mathrm{em}}}\right)
  $$

#### Delay-Map Theorem Pack (Formalized)

Fix a bounded history interval $I_T=[a,b]\subset(-\infty,T)$ and define regularity conditions:

- **(R1) Boundary regularity:** $0\notin F_T^{(ij)}(\partial I_T)$ (no root crossing at $a$ or $b$).
- **(R2) Simple roots:** if $F_T^{(ij)}(T_{\mathrm{em}})=0$, then $\frac{dF_T^{(ij)}}{dT_{\mathrm{em}}}(T_{\mathrm{em}})\neq 0$.

**Theorem 1 (Degree invariance on regular families).**  
For any continuous deformation of worldlines/parameters that preserves (R1)-(R2), the signed degree
$D_{ij}(T)=\deg(F_T^{(ij)},I_T,0)$ is invariant.

*Proof sketch:* In 1D, $D_{ij}$ is the oriented count of simple roots. Under a regular homotopy, roots move continuously and cannot appear/disappear in the interior without becoming critical, and cannot enter/leave through the boundary by (R1). Hence the oriented count is constant.

**Proposition 2 (Sub-$c_f$ monotonic single-hit regime).**  
If there exists $V_*<c_f$ such that $\|\mathbf V_j(T_{\mathrm{em}})\|\le V_*$ for all $T_{\mathrm{em}}\in I_T$, then
$$
\frac{dF_T^{(ij)}}{dT_{\mathrm{em}}}
\ge
1-\frac{V_*}{c_f}
>0
$$
so $F_T^{(ij)}$ is strictly increasing on $I_T$. Therefore it has at most one root. If additionally $F_T^{(ij)}(a)<0<F_T^{(ij)}(b)$ (or the opposite sign ordering), then exactly one root exists and
$$
N_{ij}(T)=1,\qquad D_{ij}(T)=+1
$$

*Proof sketch:* Strict positivity of the Jacobian gives monotonicity, hence injectivity. Existence under endpoint sign change follows by the intermediate value theorem.

This proposition is retained-interval local. It controls roots whose emission times lie inside the declared interval $I_T$; it does not remove older path-history roots emitted outside $I_T$, including self-hit candidates from an earlier super-field-speed interval that remain inside a longer memory window. If the model retains such persistent-memory roots, the speed bound must be checked on the enlarged interval that contains their emission times.

**Proposition 3 (Fold criterion and even-jump law).**  
In a one-parameter family $F^{(ij)}(T_{\mathrm{em}};\lambda)$ (with $\lambda$ a control parameter, e.g. receiver time or orbit parameter), interior root-count changes occur only at fold points:
$$
F^{(ij)}(T_{\mathrm{em}};\lambda)=0,\qquad \partial_{T_{\mathrm{em}}}F^{(ij)}(T_{\mathrm{em}};\lambda)=0
$$
For generic folds ($\partial_{T_{\mathrm{em}}T_{\mathrm{em}}}F\neq0$, $\partial_\lambda F\neq0$), one root pair is created/annihilated, so
$$
\Delta N_{ij}=\pm2,\qquad \Delta D_{ij}=0
$$
between regular intervals.

*Proof sketch:* Local normal form near a generic fold is equivalent to $u^2\pm\mu=0$, yielding either 0 or 2 simple roots. The two roots carry opposite Jacobian signs, so the degree is unchanged.

This delay-map theorem pack is foundational rather than merely model-specific. Within this chapter it serves as the fold-geometry reference for delayed-root constructions: regular charts preserve signed degree, while branch creation or annihilation requires a Jacobian-degenerate fold.

#### Signed Causal-Root Complex

For a receiver-source pair $(i,j)$ on a regular interval, the root ledger can be sharpened from an unsigned set to a two-term signed complex. Split the simple active roots by Jacobian sign:
$$
C_+^{ij}(T)
=
\mathrm{span}\{T_{\mathrm{em},\ell}\in\mathcal{C}_{ij}(T): \partial_{T_{\mathrm{em}}}F_T^{(ij)}(T_{\mathrm{em},\ell})>0\},
\qquad
C_-^{ij}(T)
=
\mathrm{span}\{T_{\mathrm{em},\ell}\in\mathcal{C}_{ij}(T): \partial_{T_{\mathrm{em}}}F_T^{(ij)}(T_{\mathrm{em},\ell})<0\}.
$$
Then
$$
N_{ij}=\dim C_+^{ij}+\dim C_-^{ij},
\qquad
D_{ij}=\dim C_+^{ij}-\dim C_-^{ij}.
$$
At a generic fold, the local boundary pairing creates or removes one positive and one negative generator, preserving $D_{ij}$ while changing $N_{ij}$ by two. In this reading, Theorem 1 is invariance of the Euler-characteristic-like signed count, and Proposition 3 is the elementary opposite-sign pair surgery.

For assembly work, solver artifacts should therefore report the signed grading $(C_+^{ij},C_-^{ij})$, not only raw hit counts. The binary and Noether braid ledgers $N_s$ and $M_p$ are admissible topological labels only after their self-hit and partner-hit rows inherit this signed-root-complex data, together with the phase-return degree data used by the [assembly topological charge](../noether-braid/noether-braid-topological-charge.md) and resonance-lock chapters.

**Proposition 4 (forward partner-root starvation under field-speed drift).**
Let a candidate translating branch have center drift $u\hat{\mathbf e}$ on the retained interval, with $u\ge0$ and $\|\hat{\mathbf e}\|=1$. Write two partner constituents as
$$
\mathbf X_i(T)=uT\,\hat{\mathbf e}+\boldsymbol{\rho}_i(T),
\qquad
\mathbf X_j(T_{\mathrm{em}})=uT_{\mathrm{em}}\,\hat{\mathbf e}+\boldsymbol{\rho}_j(T_{\mathrm{em}})
$$
where $i$ is the receiver and $j\ne i$ is the source. Suppose the retained partner row is forward-directed in the co-moving branch chart:
$$
d_{\parallel}(T,T_{\mathrm{em}})
\equiv
\hat{\mathbf e}\cdot
\left(
\boldsymbol{\rho}_i(T)-\boldsymbol{\rho}_j(T_{\mathrm{em}})
\right)
\ge d_{\min}>0
$$
For any positive-delay candidate root with $\Delta=T-T_{\mathrm{em}}>0$,
$$
c_f\Delta
=
\left\|
u\Delta\,\hat{\mathbf e}
+
\boldsymbol{\rho}_i(T)-\boldsymbol{\rho}_j(T_{\mathrm{em}})
\right\|
\ge
u\Delta+d_{\min}
$$
Hence
$$
\left(c_f-u\right)\Delta\ge d_{\min}
$$
If $u\ge c_f$, no such forward partner root exists. If $u<c_f$, any such row has the lower delay bound
$$
\Delta\ge\frac{d_{\min}}{c_f-u}
$$
so the required memory depth diverges as $u\to c_f^-$.

This is a kinematic starvation result, not a force-balance approximation. It says that a forward structural partner row cannot be retained at or above field-speed center drift because the causal wake cannot catch the leading receiver. A bound assembly branch that requires at least one such forward partner row for structural closure therefore cannot preserve the same causal-root ledger for sustained drift $u\ge c_f$. The proposition does not impose a speed cap on a single architrino, on internal curved self-hit motion, or on history-supported super-field-speed components; it applies to center translation of an internally bound branch whose leading-side partner closure is part of the retained ledger.

With finite retained memory $h$ and internal branch period $T_{\mathrm{int}}$, the same obstruction has a graded scale:
$$
\Lambda_{\mathrm{starv}}
=
\frac{\Delta_{\mathrm{fwd}}}{T_{\mathrm{int}}}
\ge
\frac{d_{\min}}{(c_f-u)T_{\mathrm{int}}}.
$$
The forward row remains available to the retained chart only while $\Delta_{\mathrm{fwd}}<h$, equivalently
$$
u<u_{\mathrm{crit}}
\equiv
c_f-\frac{d_{\min}}{h}.
$$
Thus starvation is a root-complex obstruction before it is a speed slogan: if the assembly requires that forward generator, the bare causal kernel cannot carry the same branch chart through $u_{\mathrm{crit}}$. Any promoted supra-$u_{\mathrm{crit}}$ branch must show a Noether-sea or assembly reorganization that removes or replaces the forward row without hiding a memory-window failure.

This is not the same event as the interior fold law of Proposition 3. A generic interior fold creates or removes one positive and one negative generator and therefore preserves the signed degree $D_{ij}$. Forward-row starvation is a memory-boundary event: a generator leaves the retained interval $[T-h,T)$ because its required delay has crossed the available history depth. The finite-window signed degree $D_{ij}^{(h)}$ may therefore change unless a replacement generator enters through the boundary or the branch chart is reorganized by the Noether sea. Search artifacts should log this as boundary-exit degree bookkeeping, not as a $\Delta N=\pm2,\Delta D=0$ fold.

#### Separator Taxonomy

Three distinct events terminate a simple-root branch chart. They have different degeneracy conditions, different velocity arguments, and different ledger consequences, and a proof program that keys its arc partition to a single "field-speed separator" will conflate them.

| Event | Condition | Velocity that appears | Root ledger | Branch strength | Certificate route |
| --- | --- | --- | --- | --- | --- |
| **Source-normal caustic** | $D_{s,ij}=0$, i.e. $\mathbf V_j(T_{\mathrm{em}})\cdot\hat{\mathbf r}_{ij}=c_f$ | source, at emission time | fold: $\Delta N_{ij}=\pm2$, $\Delta D_{ij}=0$ (Proposition 3) | $W_{ij}^{\mathrm{rec}}\to\infty$ | finite-order caustic normal form and the finite-impulse lemma; cusps and higher strata route to a singular-stratum chart |
| **Receiver-normal null** | $D_{T,ij}=0$, i.e. $\mathbf V_i(T)\cdot\hat{\mathbf r}_{ij}=c_f$ | receiver, at reception time | unchanged: $\Delta N_{ij}=0$, $\Delta D_{ij}=0$ | $W_{ij}^{\mathrm{rec}}\to0$ | none needed for existence; the branch goes silent and the receiver-velocity affine chart ends at a modulus kink |
| **Memory-boundary exit** | $T-T_{\mathrm{em},\ell}\to h$ | either, through the delay | $\Delta N_{ij}=\pm1$ possible; $D_{ij}^{(h)}$ may change | finite | boundary-exit degree bookkeeping (Proposition 4); *not* a fold |

Two consequences follow immediately.

First, $\|\mathbf V_i(T)\|=c_f$ is by itself none of these. It is a receiver-normal null only for branches whose line of action is aligned with the receiver's motion, and it is a source-normal caustic only for the source, at emission time, on the branches it emitted. A reduction that identifies the two — for instance by freezing the source velocity equal to the receiver's on a locally affine window — manufactures a caustic at $\|\mathbf V_i\|=c_f$ that the exact law does not have. Locally affine branch tables are candidate generators; they may not be used to locate separators.

Second, a closed-cycle parity ledger cannot be written over folds alone. On a cycle, $\sum_\Sigma\Delta N_{ij}=0$ and $\sum_\Sigma\Delta D_{ij}=0$ hold only after boundary-exit events are counted in the same sum, and those events carry odd unsigned jumps. Requiring every local jump to be even is a sufficient test only on charts certified free of memory-boundary exit.

#### Single-Hit Regime (Unique $T_{\mathrm{em}}$)

In the **sub-field-speed regime** ($\|\mathbf V_j(T_{\mathrm{em}})\| < c_f$ locally), Proposition 2 applies, and the map is strictly monotone:

$$
\frac{dF_T^{(ij)}}{dT_{\mathrm{em}}}
\ge
1-\frac{\|\mathbf V_j(T_{\mathrm{em}})\|}{c_f}
>0
$$

so $f_T^{(ij)}$ is a diffeomorphic time map on $I_T$, and the causal set is generically a singleton:

$$
N_{ij}(T)=1,\qquad D_{ij}(T)=+1
$$

**Intuition:** If the source is moving slower than the field speed, its past emissions form a non-overlapping family of concentric (or nearly concentric) isochrons. Any given receiver location lies on exactly one of those causal surfaces.

#### Multi-Hit Regime (Multiple $T_{\mathrm{em}}$)

In the **super-field-speed regime** ($\|\mathbf V_j\| > c_f$ at some past times), the delay map can fold when
$\hat{\mathbf{r}}_{ij}\cdot\mathbf V_j > c_f$, i.e. when $dF_T^{(ij)}/dT_{\mathrm{em}}$ changes sign. Then $\mathcal{C}_{ij}(T)$ can contain multiple solutions:

$$
\mathcal{C}_{ij}(T) = \{T_{\mathrm{em},1}, T_{\mathrm{em},2}, \ldots, T_{\mathrm{em},m}\}
$$

Fold bifurcations create/annihilate roots in pairs. The signed degree $D_{ij}$ stays topologically fixed between folds, while the unsigned branch count $N_{ij}$ jumps by even integers.

For a suggestive first folded branch used as a nested shell braid closure target, the reduced root-count analogy is

$$
N_O=1 \;\longrightarrow\; N_I=2
$$

This is not yet a nested shell braid closure result. It is the root-count counterpart one would need to justify before using the action-partition doubling target ($w_I=2w_O$) or the associated $1:2:4$ frequency-lock discussion as derived structure.

**Intuition:** If the source outruns its own emissions, it can emit multiple wake surfaces that later converge and intersect the same receiver location simultaneously (or nearly so, within regularization width $\eta$).

**Example:** In uniform circular motion at $\|\mathbf V\| > c_f$, a receiver can be hit by wake surfaces from multiple points on the source's orbit (different "winding numbers" $m$ due to self-hit dynamics).

#### Self-Hit (Source = Receiver, $j = i$)

When $j = i$ (source and receiver are the same architrino), the causal set $\mathcal{C}_{ii}(T)$ represents **self-hits**: times when architrino $i$ intersects its own past emissions.

**Self-hit condition:**

$$
\|\mathbf X_i(T) - \mathbf X_i(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}}), \quad T_{\mathrm{em}} < T
$$

This equation nominates a same-source causal root. It becomes an admitted self-hit contribution only on a retained branch chart: the coincident $T_{\mathrm{em}}=T$ branch is excluded by the $H(0)=0$ convention, the root has positive separation or explicit regularization data, the transversality/Jacobian floor is positive, the same-record receiver-normal branch strength $W_{ii}^{\mathrm{rec}}$ is retained on its floor or certified bounded interval $\nu_{\mathrm{rec}}$, the active-root count is controlled, inactive-root gaps and finite memory are certified, and the stability/action ledger rows required by the claimed assembly branch close.

**Interval-speed lemma.** Let $\Delta=T-T_{\mathrm{em}}>0$ and suppose $\mathbf X_i$ is absolutely continuous on $[T_{\mathrm{em}},T]$. If
$$
\|\mathbf X_i(T)-\mathbf X_i(T_{\mathrm{em}})\|=c_f\Delta
$$
then
$$
\frac{1}{\Delta}\int_{T_{\mathrm{em}}}^{T}\|\mathbf V_i(T')\|\,dT'\ge c_f
$$
This follows immediately from the triangle inequality. Therefore strict sub-field-speed motion on the whole interval forbids a nontrivial self-hit. A simple noncoincident self-hit requires super-field-speed motion somewhere along the interval, except for the degenerate straight field-speed case where the causal branch is tangent and the simple-root Jacobian condition fails.

**Critical requirements for self-hit:**

1. **Curvature**: Straight-line motion admits no self-hits (the worldline never intersects its own past causal isochrons).
2. **Super-field-speed interval history**: along the interval from emission to reception, the architrino must have exceeded $c_f$ somewhere, unless the branch is the degenerate straight field-speed case excluded by the simple-root assumptions.
3. **Regular branch admissibility**: the same-source root must be retained on a branch chart with a positive transversality/Jacobian floor, a retained same-record receiver-normal branch-strength row ($W_{ii}^{\mathrm{rec}}$ on its floor or certified bounded interval $\nu_{\mathrm{rec}}$), controlled distance or regularization data, inactive-root gaps, finite memory, and the stability/action ledger rows required by the claimed assembly branch.

**Key clarification:**

- **Self-hits can be plural**: $\mathcal{C}_{ii}(T)$ can contain multiple emission times (e.g., multiple winding numbers in circular motion).
- **Persistent memory**: Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from wake surfaces emitted during the super-field-speed phase. The self-hit regime is **not** instantaneously tied to current velocity; it depends on **path history**.

**Implication:** Self-hit is a **non-Markovian memory effect**. The architrino's current acceleration depends on whether it **ever** exceeded $c_f$ in the past and curved, not just on its current state.

#### Geometric Interpretation

**Visualize the causal constraint as:**

- Receiver at $\mathbf X_i(T)$ "now"
- Source worldline $\{\mathbf X_j(T'): T' < T\}$ in the past
 - Field-speed causal wake surface: the expanding isochron at radius $c_f(T - T_{\mathrm{em}})$ centered at $\mathbf X_j(T_{\mathrm{em}})$
 - **Causal emission times**: where this wake surface **intersects** the receiver's current location

For each $T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)$, draw a line from $\mathbf X_j(T_{\mathrm{em}})$ to $\mathbf X_i(T)$; this is the **line of action** $\hat{\mathbf{r}}_{ij}$ for the force.

This geometry should be read in terms of the source worldline, the expanding causal isochrons centered on past emission points, and the receiver event at which one or more of those isochrons are intersected.

#### Reduced Translating-Loop Delay Checkpoint

To obtain a nontrivial analytic checkpoint from the same causal constraint, consider a translating phase-locked two-leg internal loop, with one leg parallel to motion and one transverse. Let the loop center translate with speed $v$ through the Euclidean void while every wake still propagates at the primitive field speed $c_f$. Define
$$
\beta \equiv \frac{v}{c_f},\qquad C(v)\equiv \frac{L_\parallel(v)}{L_0}
$$
with rest bond length $L_0$.

Parallel round-trip delay:
$$
T_\parallel(v)=\frac{L_\parallel}{c_f-v}+\frac{L_\parallel}{c_f+v}
=\frac{2L_0}{c_f}\frac{C(v)}{1-\beta^2}
$$

Transverse one-way delay satisfies
$$
c_f^2\Delta_\perp^2=L_0^2+v^2\Delta_\perp^2
\;\Rightarrow\;
\Delta_\perp=\frac{L_0}{c_f\sqrt{1-\beta^2}}
$$
so
$$
T_\perp(v)=2\Delta_\perp=\frac{2L_0}{c_f}\frac{1}{\sqrt{1-\beta^2}}
$$

If internal phase locking is operationally isotropic (no orientation-dependent clock leakage),
$$
T_\parallel(v)=T_\perp(v)
$$
then necessarily
$$
C(v)=\sqrt{1-\beta^2},\qquad
T(v)=\frac{T_0}{\sqrt{1-\beta^2}},
\quad
T_0=\frac{2L_0}{c_f}
$$

This gives a purely substrate-level period-stretch checkpoint. It says only that preserving the same internal phase closure while the receiver translates forces the physical period $T$ to increase in absolute time unless the longitudinal leg shortens. The full unresolved step is proving the same absolute-period scaling for the complete multi-hit NFDE Noether braid dynamics without reducing to a two-leg closure model.

The forward parallel leg carries the same starvation constraint as Proposition 4 with $d_{\min}$ replaced by the leading longitudinal leg length $L_\parallel$. Therefore the two-leg checkpoint is admissible as a retained-row model only in the starvation-free regime
$$
v<c_f-\frac{L_\parallel}{h}.
$$
Above that scale, the checkpoint no longer tracks the same causal-root ledger: the full Noether braid proof must show a ledger reorganization, a sea-mediated replacement row, or a declared failure of the translating-loop reduction.

The two-leg loop is only a checkpoint. It has two phase points and one chosen orientation relative to the absolute motion. A real assembly has an effective internal phase distribution over a finite three-dimensional volume, and operational isotropy has to hold for all loop orientations at once. The closure target is therefore a full oblate-envelope-to-sphere reduction in the internal nested shell braid phase space, not just the equality
$$
T_\parallel=T_\perp
$$
for one leg pair.

In spherical-harmonic language this checkpoint is the $\ell=0$ isotropy projection of the moving internal delay record. The next leakage row is the $\ell=2$ quadrupole anisotropy, denoted schematically by $Q_A$ for assembly $A$. A retained Lorentz or clock-universality claim must show that $Q_A$ is either cancelled by the full three-dimensional branch ledger or bounded below the relevant anisotropy ceiling; otherwise the two-leg period result is only an orientation-specific delay identity.

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

For each causal emission time $T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)$, define:

**Separation vector and distance:**

$$
\mathbf{r}_{ij}(T; T_{\mathrm{em}}) = \mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}}), \quad r_{ij} = \|\mathbf{r}_{ij}\|
$$

**Unit direction (line of action):**

$$
\hat{\mathbf{r}}_{ij} = \frac{\mathbf{r}_{ij}}{r_{ij}} = \frac{\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})}{\|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\|}
$$

**Polarity sign factor:**

$$
\sigma_{ij} = \mathrm{sign}(q_i q_j) = \begin{cases}
+1 & \text{like polarities (repel)} \\
-1 & \text{unlike polarities (attract)}
\end{cases}
$$

**Source-normal denominator and receiver-normal branch factor:**

$$
D_{s,ij}(T;T_{\mathrm{em}})
\equiv
c_f-\mathbf V_j(T_{\mathrm{em}})\cdot \hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}}),
\qquad
D_{T,ij}(T;T_{\mathrm{em}})
\equiv
c_f-\mathbf V_i(T)\cdot \hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})
$$

$$
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\equiv
\left|
\frac{D_{T,ij}(T;T_{\mathrm{em}})}
{D_{s,ij}(T;T_{\mathrm{em}})}
\right|
$$

**Per-hit acceleration contribution:**

$$
\mathbf A_{ij}(T; T_{\mathrm{em}})
=
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\, \hat{\mathbf{r}}_{ij}
$$

If a force-like bookkeeping symbol is desired, define
$$
\mathbf{F}_{ij}(T; T_{\mathrm{em}}) \equiv \mu_{\text{arch}}\,\mathbf A_{ij}(T; T_{\mathrm{em}})
$$
where $\mu_{\text{arch}}$ is a universal conversion constant used only for force/energy bookkeeping. It is not a particle-specific inertial mass.

where:

- $\kappa$: universal coupling constant
- $q_i, q_j$: intrinsic polarities of receiver and source ($\pm \epsilon$ for electrinos/positrinos)
- $r_{ij}$: distance from emission point to reception point
- $\hat{\mathbf{r}}_{ij}$: radial direction from emission to reception
- $D_{s,ij}$: source-normal denominator controlling root transversality and emitted-wake compression/dilation
- $D_{T,ij}$: receiver-normal numerator controlling how the receiver crosses the emitted wake sequence
- $W_{ij}^{\mathrm{rec}}$: unsigned receiver-normal branch strength

**Note on interaction structure:** The per-hit acceleration $\mathbf A_{ij}(T; T_{\mathrm{em}})$ is **radial in direction**: it points along the line of action $\hat{\mathbf{r}}_{ij}$ from the source's past position to the receiver's current position. There are **no velocity-dependent cross-product terms** (no $\mathbf V_i \times \mathbf{B}$-like contributions) in the fundamental interaction kernel. However, the force magnitude is not purely $1/r^2$; it is modulated by the receiver-normal branch factor $W_{ij}^{\mathrm{rec}}$. Constant emission per unit absolute time at the source is sampled by the receiver at a rate set by both source-normal and receiver-normal motion.

**Implication for emergent forces**: All "magnetic" or velocity-dependent forces (e.g., Lorentz force $\mathbf V_{\mathrm{eff}} \times \mathbf{B}$) must arise from **delay geometry**, **receiver-normal branch modulation**, and **superposition of radial hits**, not from intrinsic cross-product terms in the fundamental law. This places the burden of magnetic-field emergence on the assembly structure, Noether sea dynamics, and the finite-speed causal geometry itself.

#### Total Acceleration (Sum Over All Causal Hits)

The total acceleration on architrino $i$ at time $T$ is the **vector sum** over:

1. All sources $j \neq i$ (partner hits)
2. All causal emission times $T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)$ for each source
3. Self-hits ($j = i$), if any exist

**Master Equation of Motion (Canonical Form):**

$$
\boxed{
\frac{d^2 \mathbf X_i}{dT^2}
=
\sum_{j} \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\, \hat{\mathbf{r}}_{ij}
}
$$

where:

- Outer sum: over all sources $j$ (including $j = i$ for self-hits)
- Inner sum: over all causal emission times $T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)$
- Each term: radial inverse-square acceleration with sign $\sigma_{ij}$ and receiver-normal branch strength $W_{ij}^{\mathrm{rec}}$

**Explicit separation of partner and self-hit terms:**

$$
\frac{d^2 \mathbf X_i}{dT^2}
=
\underbrace{\sum_{j \neq i} \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)} \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}}) \, \hat{\mathbf{r}}_{ij}}_{\text{Partner hits}} + \underbrace{\sum_{T_{\mathrm{em}} \in \mathcal{C}_{ii}(T)} \kappa \, \sigma_{ii} \, \frac{|q_i q_i|}{r_{ii}^2}W_{ii}^{\mathrm{rec}}(T;T_{\mathrm{em}}) \, \hat{\mathbf{r}}_{ii}}_{\text{Self-hits}}
$$

**Note:** $\sigma_{ii} = +1$ (like polarities repel), so self-hits are always **repulsive**.

This sum can be viewed as a **path-history branch sum**: each emission time in $\mathcal{C}_{ij}(T)$ marks where the receiver's worldline crosses the causal wake surface emitted at $T_{\mathrm{em}}$. The integral representation above is simply the distributional encoding of this branch-selection rule.

#### Conventions and Exclusions

**Heaviside Convention ($H(0) = 0$):**

The emission at $T_{\mathrm{em}} = T$ (instantaneous self-force) is **excluded**. Formally, this is enforced by writing:

$$
\mathcal{C}_{ij}(T) = \Big\{ T_{\mathrm{em}} < T \;\Big|\; \|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}}) \Big\}
$$

(Strict inequality $T_{\mathrm{em}} < T$; no $T_{\mathrm{em}} = T$ allowed.)

**Physical justification:** The causal wake surface at the instant of emission ($r = 0$, $\Delta = 0$) has not yet expanded; it cannot exert a force on the emitter "now." Under symmetric regularization (mollification), the $r \to 0$ limit yields zero net push.

**No $r = 0$ causal roots beyond $\Delta = 0$:**

Because $r = c_f(T - T_{\mathrm{em}})$, $r = 0$ implies $\Delta = T - T_{\mathrm{em}} = 0$. This case is excluded by $H(0) = 0$. There are no "collision singularities" in the causal set (architrinos can pass through each other; forces are mediated by expanding wake surfaces, not by contact).

This also fixes the status of later short-distance regularizations. A finite core cutoff or core mollifier is not a hard exclusion sphere, an elastic contact collision, or a primitive rule saying that causal wakes are blocked by or transmitted through an opaque core. It is a declared mathematical control on the near-origin amplitude inside a regularized branch chart. In the canonical branch law, a source contribution is admitted by the causal-root constraint, polarity sign $\sigma_{ij}$, separation or regularization data, transversality/Jacobian control, the same-record receiver-normal branch strength $W_{ij}^{\mathrm{rec}}$, active-root count, and the required stability/action/event ledgers. A polarity-dependent short-distance kernel would therefore be an additional model term that must be derived and validated; it cannot be inserted as an unproved like-versus-opposite collision or opacity rule.

#### Superposition Principle

The Master EOM is **linear in source contributions** on a declared branch chart:

$$
\mathbf A_{\text{total}}(T) = \sum_j \mathbf A_{j}(T)
$$

The causal-wake distributions from distinct sources superpose without mutual interference, and the receiver sums the branch accelerations that actually intersect it. Effective potentials reconstructed from those wakes also superpose in the corresponding linear diagnostic or continuum limit, but the substrate law remains the receiver-local branch sum.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the retained history of all sources and on the certified active causal-root rows.

---

### Terms and Conventions (Detailed Breakdown)

#### Direction and Sign

**Direction of $\hat{\mathbf{r}}_{ij}$:**

$\hat{\mathbf{r}}_{ij}$ points **from the source's historical position** $\mathbf X_j(T_{\mathrm{em}})$ **to the receiver's current position** $\mathbf X_i(T)$.

**Sign of the acceleration:**

- **Like polarities** ($\sigma_{ij} = +1$): acceleration along $+\hat{\mathbf{r}}_{ij}$ (repulsion; pushes receiver away from emission point)
- **Unlike polarities** ($\sigma_{ij} = -1$): acceleration along $-\hat{\mathbf{r}}_{ij}$ (attraction; pulls receiver toward emission point)

**Two-body checks (stationary sources):**

- Electrino + Electrino (like polarities): repulsion
- Positrino + Positrino (like polarities): repulsion
- Electrino + Positrino (unlike polarities): attraction
- All symmetric: if source and receiver swap roles, the force direction reverses (Newton's third law in the instantaneous-interaction limit)

#### Scaling and Normalization

**The $1/r^2$ factor:**

Reflects the **surface density** of potential on the causal isochron. As that surface grows, the potential spreads over area $4\pi r^2$, so the density at any point scales as $1/r^2$.

**The receiver-normal branch factor $W_{ij}^{\mathrm{rec}}$:**

Under the constant-time emission rule stated above, source motion between emission instants deposits the output onto a history-dependent family of expanding causal surfaces. Motion of the source toward the active branch compresses the spacing of successive wake arrivals; motion away from the branch dilates it. Receiver-normal motion then changes how quickly the receiver cuts through that same sequence. The geometric branch factor is therefore
$$
W_{ij}^{\mathrm{rec}}
=
\left|
\frac{c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T)}
{c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_{\mathrm{em}})}
\right|.
$$

**Absorption of geometric constants into $\kappa$:**

All geometric normalization factors (e.g., $1/(4\pi)$ from spherical surface area and overall $1/c_f$ factors from $\delta$-function change-of-variables) are absorbed into the coupling constant $\kappa$ by convention. The canonical per-hit law is therefore written with an explicit inverse-square factor together with the dimensionless receiver-normal branch factor $W_{ij}^{\mathrm{rec}}$.

**Dimensional analysis:**

$$
[\kappa] = \frac{[\text{Length}]^3}{[\text{Time}]^2 [\text{Polarity}]^2}, \quad [\mathbf A] = \frac{[\text{Length}]}{[\text{Time}]^2}
$$

If the force-like bookkeeping variable $\mathbf{F}=\mu_{\text{arch}}\mathbf A$ is introduced, then $[\mathbf{F}]=[\mu_{\text{arch}}][\text{Length}]/[\text{Time}]^2$. In natural units with $c_f = 1$, $[\text{Length}] = [\text{Time}]$, and $\kappa$ has dimensions of $[\text{Length}]/[\text{Polarity}]^2$.

#### Receiver Kinematics (Radial vs Orthogonal Components)

At a given hit $(T; T_{\mathrm{em}})$, decompose the receiver's velocity into components parallel and orthogonal to the line of action $\hat{\mathbf{r}}_{ij}$:

$$
\mathbf V_i(T) = V_r \hat{\mathbf{r}}_{ij} + \mathbf V_\perp
$$

where:

- $V_r = \mathbf V_i(T) \cdot \hat{\mathbf{r}}_{ij}$ (radial component; positive = moving away from emission point)
- $\mathbf V_\perp = \mathbf V_i(T) - V_r \hat{\mathbf{r}}_{ij}$ (orthogonal component)

**Instantaneous effect of the hit:**

Because $\mathbf A_{ij}(T; T_{\mathrm{em}}) \parallel \hat{\mathbf{r}}_{ij}$, its instantaneous effect satisfies:

$$
\frac{d}{dT}\mathbf V_\perp\Big|_{\text{hit}} = \mathbf{0}, \quad \frac{d}{dT}V_r\Big|_{\text{hit}} = \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij} = \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
$$

**Plain language:** A hit only changes the along-the-line velocity component right now; sideways motion continues unaffected at the instant of the hit. Over time, the changing radial motion alters the trajectory and thus the subsequent orthogonal component.

**Translating-assembly deformation requirement:** The receiver kinematics described here must mechanically produce the moving-assembly deformation, branch-period stretch, and two-way signal-synchronization records that later observer-inference chapters consume. If Noether braids do not squash along the direction of motion and do not preserve one retained causal-root ledger while translating through the Noether sea, the downstream recovery program fails at the dynamics layer.

#### Work and Power

The **instantaneous power** (rate of kinetic energy change) from a single hit is:

$$
\frac{dE_k}{dT}\Big|_{\text{hit}} = \mathbf{F}_{ij} \cdot \mathbf V_i = \big(\mu_{\text{arch}} \mathbf A_{ij} \cdot \hat{\mathbf{r}}_{ij}\big) V_r = \mu_{\text{arch}}\,\kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}}) \, V_r
$$

**Key insight:** There is **no instantaneous work** on the orthogonal component. Power depends only on the radial velocity $V_r$.

**Radial motion and the $1/r^2$ factor (local trend):**

- **Inward motion** ($V_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
- **Outward motion** ($V_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.

**Important caveat:** Path-history delay shifts both the causal root $T_{\mathrm{em}}$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all sources.

#### Moving Transceiver Geometry and Received Branch Strength

**Critical modeling note:**

- **Emission rule**: fixed by the constant-time law stated above
- **Spatial deposition**: velocity dependent because the source changes position between emission instants

The **emitted potential pattern in space** is not speed independent: a moving source lays down successive wake surfaces from different points on its worldline. The **received** force magnitude is therefore not purely a function of $r_{ij}$. It is modulated by $W_{ij}^{\mathrm{rec}}$, which measures how source-normal emission spacing and receiver-normal crossing cadence combine on the active branch.

The receiver's velocity $\mathbf V_i(T)$ appears directly through $D_{T,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T)$. It also influences:

1. The **branch strength** through $W_{ij}^{\mathrm{rec}}$.
2. The **instantaneous power** through $\mathbf{F} \cdot \mathbf V = \|\mathbf{F}\| V_r$.
3. The **subsequent evolution of $r_{ij}$** and future branch strengths.
4. Which delayed branches are actually sampled along the receiver worldline over time.

For a uniformly moving source and a fixed receiver on a simple branch, direct
substitution in the receiver-normal law gives a useful check. Let
$$
\mathbf X_j(T_{\mathrm{em}})=\mathbf X_{j,0}+\mathbf V_{j,0}T_{\mathrm{em}},
\qquad
\beta=\frac{\|\mathbf V_{j,0}\|}{c_f},
\qquad
\cos\theta=\frac{\mathbf V_{j,0}\cdot\hat{\mathbf{r}}_{ij}}{\|\mathbf V_{j,0}\|}
$$
at the emission event. Then, with $\mathbf V_i(T)=0$,
$$
W_{ij}^{\mathrm{rec}}
=
\frac{1}{|1-\beta\cos\theta|}
$$
and the received wake density attached to the simple root is proportional to
$$
\frac{1}{r_{ij}^2\,|1-\beta\cos\theta|}
$$
For $0\le\beta<1$ this fixed-receiver substitution gives a headlight-style causal-wake anisotropy:
$$
\mathcal{D}_{\mathrm{wake}}(\theta;\beta)
=
\frac{1}{1-\beta\cos\theta}
$$
up to the common inverse-square dilution and coupling normalization. The formula is not the general transceiver law; it is the $\mathbf V_i(T)=0$ reduction of $W_{ij}^{\mathrm{rec}}$ obtained from the canonical equation. It is also not a Lorentz transformation and does not add electrodynamic velocity-field or acceleration-field terms. Forward directions with $\cos\theta>0$ receive compressed isochron spacing, while trailing directions receive diluted spacing in this fixed-receiver check. Doppler shift, aberration, magnetic-like response, preferred-frame leakage estimates, and translating-binary asymmetry must be rederived from the full receiver-normal branch geometry plus assembly and observer-channel closure rather than inserted as independent laws.

For $\beta\ll1$,
$$
\mathcal{D}_{\mathrm{wake}}(\theta;\beta)
=
1+\beta\cos\theta+O(\beta^2).
$$
The even scalar part feeds the coarse scalar wake potential, while the odd velocity-directed part is the single-hit seed of the recoil and vector-transport channel described in [Effective Lagrangian](effective-lagrangian.md#regularized-nonlocal-action-and-variation). Under coarse-graining this is the same source of $\mathbf{A}_{\mathrm{wake}}$ and antisymmetric wake-stress diagnostics; it is not an independent magnetic law added on top of the Master Equation.

**Receiver-normal branch modulation:** Unlike models that make source strength itself a function of speed, the velocity dependence here enters through the **moving-transceiver geometry** of emission and reception, the **geometry of causal intersections**, and the **source-normal/receiver-normal cadence ratio** in the Euclidean void. This is the origin of the receiver-normal denominator-numerator law and the seed of relativistic and magnetic behavior in the emergent theory.

#### Receiver-Velocity Affine Form and the Branch Resistance Tensor

The receiver-normal numerator enters the canonical law only through $D_{T,ij}=c_f-\mathbf V_i(T)\cdot\hat{\mathbf r}_{ij}$, and it is the one place where the receiver's *instantaneous* velocity appears. Everything else in a branch row — the root $T_{\mathrm{em},\ell}$, the separation $r_{ij}$, the line of action $\hat{\mathbf r}_{ij}$, the source-normal denominator $D_{s,ij}$ — is determined by the receiver's position and the retained source history. That asymmetry has an exact consequence.

On the **sub-field-speed receiver chart** $\|\mathbf V_i(T)\| < c_f$ every active branch satisfies $D_{T,ij} > 0$, so the modulus in $W_{ij}^{\mathrm{rec}}$ resolves. Define the branch coefficient

$$
w_\ell
\equiv
\kappa\,\sigma_{ij}\,
\frac{|q_iq_j|}{r_{ij}^2\,|D_{s,ij}|},
$$

which carries the polarity sign and is independent of $\mathbf V_i(T)$. Then each per-hit term is $w_\ell(c_f-\mathbf V_i\cdot\hat{\mathbf r}_\ell)\hat{\mathbf r}_\ell$, and summing over the active causal-root set gives the **receiver-velocity affine form of the Master Equation**:

$$
\boxed{
\frac{d^2\mathbf X_i}{dT^2}
=
c_f\,\boldsymbol{\Xi}_i
-
\mathsf{M}_i\,\mathbf V_i(T)
}
$$

$$
\boldsymbol{\Xi}_i
\equiv
\sum_{\ell} w_\ell\,\hat{\mathbf r}_\ell,
\qquad
\mathsf{M}_i
\equiv
\sum_{\ell} w_\ell\,\hat{\mathbf r}_\ell\otimes\hat{\mathbf r}_\ell
$$

Both the **branch drive** $\boldsymbol{\Xi}_i$ and the **branch resistance tensor** $\mathsf{M}_i$ are functionals of the retained history and of $\mathbf X_i(T)$ alone. The Master Equation is therefore *exactly affine* in the receiver's instantaneous velocity on this chart, with no approximation and no expansion in $\|\mathbf V_i\|/c_f$.

**Polarity fixes the sign of the resistance.** $\mathsf{M}_i$ is a sum of rank-one projectors weighted by $w_\ell$, hence symmetric, with signature set entirely by $\sigma_{ij}$: every repulsive branch contributes a positive-semidefinite term, every attractive branch a negative-semidefinite term. Since $\sigma_{ii}=+1$, **every self-hit contributes positively.** Contracting the affine form with $\mathbf V_i$ gives the branch power

$$
\frac{d}{dT}\left(\tfrac{1}{2}\|\mathbf V_i\|^2\right)
=
c_f\,\boldsymbol{\Xi}_i\cdot\mathbf V_i
-
\sum_\ell w_\ell\, s_\ell^2,
\qquad
s_\ell\equiv \mathbf V_i\cdot\hat{\mathbf r}_\ell
$$

The first term is odd in the radial rate $s_\ell$: it reverses sign when the radial motion reverses, and it is the only term a source-normal-only weight $c_f/|D_{s,ij}|$ retains. The second term is **even** in $s_\ell$ and does not reverse. Attraction ($w_\ell<0$) therefore injects at rate $|w_\ell|s_\ell^2$ on every branch, in both directions of radial motion; repulsion drains at the same rate, vanishing only at $s_\ell=0$. This is the exact sense in which the receiver-normal factor is not a small kinematic correction: it is the entire velocity-dependent force, and it is a polarity-signed damping law.

Dropping the receiver-normal numerator and weighting a branch by $c_f/|D_{s,ij}|$ instead — the source-normal-only Doppler weight — removes precisely the $w_\ell s_\ell^2$ term and leaves a work-symmetric law. A calculation built on that weight studies a different dynamical system, not a conservative approximation to this one.

**Emergent velocity-dependent force.** $\mathsf{M}_i\mathbf V_i$ is the velocity-dependent force promised in [Implication for emergent forces](#total-acceleration-sum-over-all-causal-hits). Because $\mathsf{M}_i$ is symmetric, the instantaneous branch law carries **no antisymmetric part**: there is no $\mathbf V_i\times\mathbf B$ contribution hidden inside a single evaluation of the causal-root set. Any magnetic-like antisymmetric response must therefore be generated by the history dependence of $\boldsymbol{\Xi}_i$ and $\mathsf{M}_i$ under assembly and Noether sea closure, not by the pointwise kernel.

**Field-speed barrier.** As $\mathbf V_i\cdot\hat{\mathbf r}_\ell \to c_f^-$ on a branch, that branch's entire contribution vanishes. Since $\hat{\mathbf r}_\ell$ points from the past source position toward the present receiver position, $\mathbf V_i\cdot\hat{\mathbf r}_\ell = c_f$ says the receiver recedes from that emission point at exactly field speed. Hence:

> A branch whose source lies behind the receiver, in the sense $\mathbf V_i\cdot\hat{\mathbf r}_\ell>0$, cannot accelerate the receiver through field speed along its own line of action. Only a branch with $\mathbf V_i\cdot\hat{\mathbf r}_\ell<c_f$ can. In one dimension this means a receiver can be carried through $|dX/dT|=c_f$ only by attraction from a source image lying ahead of it, never by self-repulsion from its own path history.

**Common-sightline arcs.** If every active branch on an arc shares one line-of-action sign, $\hat{\mathbf r}_\ell=\rho\,\hat{\mathbf e}$ with $\rho$ fixed, then $D_{T,\ell}=c_f-\rho\,\mathbf V_i\cdot\hat{\mathbf e}$ is a *common positive prefactor* of every term in the branch sum. On such an arc the receiver-normal factor cannot change which branch family dominates; it rescales all magnitudes together by $|D_T|/c_f$. Dominance arguments survive the factor unchanged; acceleration floors and transit times do not, and must be rescaled by $|D_T|/c_f\in[1-U_{\max}/c_f,\,1+U_{\max}/c_f]$ on a tame envelope $\|\mathbf V_i\|\le U_{\max}<c_f$.

**Chart boundary.** The affine form holds up to the **receiver-normal null surface** $D_{T,ij}=0$, that is $\mathbf V_i(T)\cdot\hat{\mathbf r}_{ij}=c_f$. There the branch goes silent and the modulus in $W_{ij}^{\mathrm{rec}}$ acquires a kink; the acceleration is continuous but the affine chart ends. This surface changes no root count and is not a fold. Its relation to the other branch events is fixed in [Separator Taxonomy](#separator-taxonomy).

In the collinear reduction $\hat{\mathbf r}_\ell=\pm1$ and $\hat{\mathbf r}_\ell\otimes\hat{\mathbf r}_\ell=1$, so the affine form collapses to a scalar delayed equation with polarity-signed damping,

$$
\frac{d^2X}{dT^2}
+
\Gamma(T)\,\frac{dX}{dT}
=
c_f\,\Xi(T),
\qquad
\Gamma=\sum_\ell w_\ell,
\qquad
\Xi=\sum_\ell w_\ell\,\hat r_\ell
$$

with $\Gamma$ and $\Xi$ independent of $dX/dT$ at time $T$.

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

where:

$$
\mathbf A_i(T)
=
\sum_{j} \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\, \hat{\mathbf{r}}_{ij}
$$

#### Causal Functional Form

The acceleration $\mathbf A_i(T)$ depends on the **history** of all worldlines $\{\mathbf X_j(T') : T' < T\}$ through the implicit causal constraint:

$$
\|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}})
$$

This makes the system a **delay differential equation (DDE)** with **state-dependent delays** (the delay $\Delta_j = T - T_{\mathrm{em}}$ is not constant; it depends on the solution itself).

**Functional notation:**

$$
\frac{d\mathsf Z_i}{dT} = \mathcal{F}\Big[\mathsf Z_i(T), \{\mathsf Z_j(\cdot)\}_{j}, T\Big]
$$

where $\mathcal{F}$ is a **causal functional**: it depends on the current state $\mathsf Z_i(T)$ and the past states $\{\mathsf Z_j(T') : T' < T\}$ of all architrinos (including $i$ itself for self-hits).

#### Regularization (Mollified Causal Wake Surfaces, Finite $\eta$)

The ideal model uses **surface-delta causal isochrons** in the emission-time integral. On a simple branch with a distance floor and a Jacobian floor, the delta collapses to a continuous receiver-time branch contribution weighted by the receiver-normal branch strength; singular or impulse-like behavior arises only when branches hit collision support, lose transversality, accumulate, or are sampled as unresolved numerical events. One may treat the singular limit as a measure-valued branch law, or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - c_f\Delta) \longrightarrow \delta_\eta(r - c_f\Delta) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - c_f\Delta)^2}{2\eta^2}\Big)
$$

while preserving total emission $q$.

**Effect:** Under the finite-branch, distance-floor, and transversality assumptions stated below, this supports **continuous-in-time force diagnostics** and classical $C^1$ solutions for $\mathbf X_i(T)$ given $C^1$ initial data.

**In the super-field-speed regime** ($\|\mathbf V_a\| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization gives a finite contribution only while the active-root count, separation floor, Jacobian floor, and receiver-normal branch strength remain controlled.

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
\mathbf{Y}\in C^1([T_0-h,T_0+\Delta T),\mathbb{R}^{6N}),\qquad \mathbf{Y}_{T_0}=\phi^0
$$
The solution extends uniquely to a maximal interval $[T_0-h,T_{\max})$. If on every finite interval
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
Here $r_{ij,\ell}(T)$ denotes the source-receiver distance on branch $\ell$, and
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
4. Standard state-dependent DDE existence/uniqueness theory on Banach spaces applies, yielding a unique local $C^1$ solution and a maximal extension.
5. Continuation follows from the same theorem: finite-time breakdown can occur only by leaving every bounded subset of the admissible set, i.e. via unbounded speed, vanishing separation on active support, transversality loss/root accumulation, or unbounded active branch-count growth.

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ surface-delta limit still requires separate control of root accumulation and Jacobian-degenerate branches. $\square$

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

**Statement:** The potential wake contributions from all sources **superpose linearly**. The net potential at any point is the sum of the individual wake potentials:

$$
\Phi_{\text{net}}(\mathbf X, T) = \sum_{i} \Phi_i(\mathbf X, T)
$$

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when the same-source root condition permits, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting modulated by the receiver-normal branch strength $W^{\mathrm{rec}}$, branch gaps, and screening or cancellation assumptions that make the retained sum finite.

Inverse-square dilution alone is not a global convergence theorem. For an infinite source family, a branch chart must declare a summation or continuum prescription under which
$$
\lim_{R\to\infty}
\sum_{j:\|\mathbf X_j\|<R}
\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\mathbf A_{ij}(T;T_{\mathrm{em}})
$$
exists, or it must supply local neutrality, angular cancellation, shielding, a screened kernel, finite active horizon, or a mean-field/principal-value subtraction. Without this condition, the many-source wake sum is not a well-defined acceleration law even though each individual hit has the correct surface-density falloff.

#### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. Because both transceiver paths enter the causal geometry, the received force magnitude is modulated by the receiver-normal branch factor $W_{ij}^{\mathrm{rec}}$. Source motion controls the source-normal denominator; receiver motion controls the receiver-normal numerator and also affects the work rate through $\mathbf{F} \cdot \mathbf V = \|\mathbf{F}\| V_r$.

**Self-interaction requirement:** Self-hit requires super-field-speed interval history: the worldline must exceed $c_f$ somewhere along a nontrivial emission-to-reception interval, except for the degenerate field-speed tangent case excluded by the simple-root branch condition. Curvature alone is insufficient if $\|\mathbf V_a\| < c_f$ everywhere on the relevant interval.

**Persistent memory:** Once an architrino has exceeded $\|\mathbf V\| > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

#### Causality and Locality

**Causal structure:** Event $A$ at $(T_A, \mathbf X_A)$ can influence event $B$ at $(T_B, \mathbf X_B)$ only if:

$$
T_B > T_A \quad \text{and} \quad \|\mathbf X_B - \mathbf X_A\| \leq c_f(T_B - T_A)
$$

This defines a **field-speed causal cone** centered at each event. The filled inequality is the reachability condition; exact hits still occur only on causal wake surfaces satisfying the equality root.

**No action-at-a-distance:** All influences propagate at finite speed $c_f$. There are no instantaneous interactions across spatial separation.

**Event-locality at the receiver:** The Master EOM is evaluated **at the receiver event**: only the causal wake surfaces intersecting $\mathbf X_i(T)$ contribute to the acceleration there and then. However, it is **path-history dependent**: the active branches depend on the **entire past worldline** of all sources.

---

### Self-Interaction (Self-Hit Dynamics)

#### Self-Hit Condition

An architrino $i$ experiences self-hit at time $T$ if there exists $T_{\mathrm{em}} < T$ such that:

$$
\|\mathbf X_i(T) - \mathbf X_i(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}})
$$

**Geometric interpretation:** The architrino's current position $\mathbf X_i(T)$ lies on the causal isochron emitted from its past position $\mathbf X_i(T_{\mathrm{em}})$.

**Requirements:**

1. **Curvature**: The worldline must curve (straight-line motion admits no self-hits).
2. **Super-field-speed interval history**: the speed must exceed $c_f$ somewhere on the interval from emission to reception, except for the degenerate straight field-speed riding case excluded by the branch Jacobian condition.

#### Multiple Self-Hits (Plural)

**Key insight:** An architrino can experience **multiple self-hits simultaneously** (or within a regularization window $\eta$).

**Mechanism:** In curved motion at super-field-speed, the worldline may intersect **multiple past isochrons** at the same observation time $T$. Each intersection corresponds to a distinct emission time $T_{\mathrm{em},k} \in \mathcal{C}_{ii}(T)$.

**Example:** In uniform circular motion at speed $\|\mathbf V\| > c_f$, an architrino can be hit by wake surfaces from multiple points on its own orbit, corresponding to different "winding numbers" $m = 0, 1, 2, \ldots$ (see Maximum-Curvature Orbit).

**Sum over all self-hit roots:**

$$
\mathbf{F}_{ii}(\text{self-hit})
=
\sum_{T_{\mathrm{em}} \in \mathcal{C}_{ii}(T)}
\kappa \, \sigma_{ii} \,
\frac{|q_i q_i|}{r_{ii}^2}
W_{ii}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\, \hat{\mathbf{r}}_{ii}
$$

where $\sigma_{ii} = +1$ (like polarities repel), so each self-hit contributes an **outward** (repulsive) force.

#### Persistent Memory (Self-Hit After Slowing Down)

**Critical clarification:**

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $\|\mathbf V\| > c_f$ and emitted wake surfaces can **later slow down** to $\|\mathbf V\| < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $T_1$: Architrino accelerates to $\|\mathbf V\| > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $T_2 > T_1$: Architrino slows down to $\|\mathbf V\| < c_f$ (e.g., due to partner attraction or external forces).
3. At time $T_3 > T_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $T_1$ (when $\|\mathbf V\| > c_f$).

**Result:** Self-hit occurs at $T_3$ even though current velocity $\|\mathbf V(T_3)\| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf X_i(T)$ and $\mathbf V_i(T)$ is insufficient to determine $\mathbf A_i(T)$. The **full past worldline** $\{\mathbf X_i(T') : T' < T\}$ is needed to identify all causal self-hit times $T_{\mathrm{em}} \in \mathcal{C}_{ii}(T)$.

#### Self-Hit as Stabilization Mechanism

**Role in binary formation:** Self-hit provides a **repulsive radial contribution** that opposes the attractive pull of opposite-polarity partners. This competition produces:

- **Maximum-curvature candidates**: the circular toy model identifies where a minimum-radius barrier must be analyzed.
- **Null-separatrix protection**: the source-normal denominator boundary $D_s=0$ acts as a geometric wall against collapse in the exact kernel when the receiver-normal numerator remains bounded.
- **A closure test, not a closure proof**: the same receiver-normal branch factor multiplies tangential as well as radial projections, so a source-normal null branch does not by itself prove vanishing tangential power or an exact locked orbit.

**Self-hit stabilization is field-speed gated (necessary condition for binding).** The [receiver-velocity affine form](#receiver-velocity-affine-form-and-the-branch-resistance-tensor) makes this precise. The velocity-dependent force is the branch resistance $\mathsf{M}_i=\sum_\ell w_\ell\,\hat{\mathbf r}_\ell\otimes\hat{\mathbf r}_\ell$, and its signature is set by polarity: an opposite-polarity partner branch has $w_\ell<0$ and therefore **anti-damps**, injecting kinetic energy at rate $|w_\ell|(\mathbf V_i\cdot\hat{\mathbf r}_\ell)^2$ on both approach and recession, while a self-branch has $w_\ell>0$ and **damps**. Self-repulsion is thus the only channel that can make the net velocity-dependent response dissipative. But a self-hit exists only where the retained history reaches field speed: on any stored interval with $\|\mathbf V_i\|\le c_f-\sigma$ for $\sigma>0$, the exact bound $\|\mathbf X_i(T)-\mathbf X_i(T_{\mathrm{em}})\|\le(c_f-\sigma)(T-T_{\mathrm{em}})<c_f(T-T_{\mathrm{em}})$ forbids a same-path causal root. Therefore a bound self-hit orbit must reach field speed somewhere in its retained history; a strictly sub-field assembly cannot self-stabilize against partner anti-damping, and its only dissipative channel is inaccessible. This is why the stabilizing configurations are the maximum-curvature and persistent-memory orbits above, whose self-hits are born exactly at the field-speed excursion, and it is the reason a bound binary is intrinsically a field-speed object rather than a slow Keplerian one.

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
$r(T)=\|\mathbf X_2(T)-\mathbf X_1(T)\|$ has the canonical receiver-normal schematic form
with receiver-normal branch strength:

$$
\frac{d^2r}{dT^2}
=
-\frac{2\kappa \epsilon^2}{r^2}
W_p^{\mathrm{rec}}
\quad
\text{on the retained branch}
$$

where the factor of 2 comes from the symmetry when both sides consume the same
retained partner record. The stripped inverse-square form is only the
near-rest, single-branch calibration $W_p^{\mathrm{rec}}\approx1$, not a
canonical proof row.

**Solution structure:** The slow, single-branch calibration has the same
quadrature structure as Keplerian radial fall. A promoted branch must keep the
same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ row.

**Key insight:** Partner attraction dominates; no self-hit (speeds remain sub-field-speed for moderate $d_0$).

#### Sub-Field-Speed Circular Orbit (Receiver-Normal Restart Target)

**Setup:**
- Two opposite polarities in symmetric circular orbit at radius $R$, speed $v < c_f$
- No self-hits (sub-field-speed regime)

**Partner contribution:** The circular source-normal geometry nominates an
inward radial diagnostic and a tangential-sign diagnostic. In the canonical
Master EOM, those rows are not force verdicts until the same partner branch
emits $D_s$, $D_T$, and $W^{\mathrm{rec}}$.

**Result:** The source-normal circular sign row is a restart diagnostic, not a
no-go. A constant-speed circular conclusion requires the receiver-normal
branch row plus finite-window work, wake-flux, recoil, and multi-root ledger
checks on the same retained record.

**Conclusion within this circular benchmark:** The sub-field circular row is
unclosed against the canonical Master EOM. No stable-orbit or no-stable-orbit verdict is
promoted until the receiver-normal proof process is restarted.



#### Maximum-Curvature Orbit (Self-Hit Stabilization)

**Setup:**
- A candidate opposite-polarity branch reaches super-field-speed curved history after a non-circular contraction, capture, or forced branch transition
- Self-hits activate → repulsive outward force

**Geometric definition (Null Separatrix):**
For an active causal root $T_{\mathrm{em}} \in \mathcal{C}_{ii}(T)$ on the self-hit branch, define

$$
J_{ii}(T;T_{\mathrm{em}})\equiv 1-\frac{\mathbf V_i(T_{\mathrm{em}})\cdot \hat{\mathbf{r}}_{ii}(T;T_{\mathrm{em}})}{c_f}
$$

The maximum-curvature binary (MCB) boundary is the Jacobian-degenerate set

$$
J_{ii}(T;T_{\mathrm{em}})=0
$$

with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal wake surface of its own past emission (the “riding-the-shock” limit).

**Why this is a hard wall in the exact theory:**
In the exact branch-resolved force, the self-hit contribution carries the factor

$$
\frac{W_{ii}^{\mathrm{rec}}(T;T_{\mathrm{em}})}{r_{ii}^2(T;T_{\mathrm{em}})}
$$

Hence as $D_{s,ii}\to 0^+$ with bounded nonzero $D_{T,ii}$, the ideal branch-resolved pointwise response diverges, producing a restoring barrier that blocks naive continuation into a collapsing branch. This divergence should not be treated as a literal state pinned at infinite force. Across a simple caustic transit, [Caustic Transit and Finite Impulse](#caustic-transit-and-finite-impulse) shows that the integrated velocity change can remain finite; with finite numerical regularization $\eta > 0$, the event appears as a large but finite impulse that sharpens as $\eta\to 0$.

This null-separatrix is therefore an **amplitude wall** for the self branch only after the receiver-normal numerator is controlled. It is not, by itself, a theorem of circular closure. The same receiver-normal branch factor multiplies every projection of the self-hit force, including the tangential component, so contact with $D_{s,ii}=0$ obstructs collapse but does not by itself establish a periodic orbit or zero net cycle-averaged power.

**Operational characterization of MCB:**
- The inner branch evolves by caustic grazing near $J_{ii}=0$, with finite impulses across the regularized boundary rather than exact pinning on an infinite-force surface.
- The minimum radius $R_{\min}$ is the smallest orbit radius compatible with $J_{ii}\ge 0$ on active roots.
- Tangential power must be controlled separately; near-zero cycle-average power is an additional closure condition, not a consequence of $J_{ii}=0$ alone.

**Significance:**
- Defines a **fundamental length scale** $R_{\min}$ that sets the tightest stable orbit radius
- In the exact geometric model, excludes classical $r \to 0$ collapse by a null-separatrix barrier
- Supplies one geometric ingredient in candidate stable particle assemblies such as Noether braids

**Status split (analytic vs numeric):**
- **Analytic:** Existence of the Jacobian-null boundary and its singular restoring scaling in the exact kernel.
- **Numeric still required:** Basin size, global attractivity, and long-time capture probability for realistic multi-body assemblies.

### Informational Ambiguity at the Receiver

#### Limited Information Per Hit

From the perspective of the receiving architrino, the information carried by an intersecting causal isochron is **limited**. The receiver only knows:

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $\|\mathbf{F}\|$ when force bookkeeping is used).
2. The **unoriented line of action** through its current position (the line along which the acceleration points).

The receiver does **not** have direct knowledge of:
- The source's identity (which architrino $j$?)
- The source's precise distance $r_{ij}$ (without additional assumptions)
- The source's velocity at emission $\mathbf V_j(T_{\mathrm{em}})$

#### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (polarity $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (polarity $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

#### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary emitter** ($\|\mathbf V\| = 0$) placed somewhere along the same unoriented line of action, with the emitter's actual speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched receiver-normal branch factor.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what source configurations are consistent with a given hit?).

#### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of wakes** from many different emitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the source configuration.

#### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and source-ambiguous information at the hit level is a candidate bridge to effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics. The bridge remains a closure target until the coarse-grained state map and record-formation dynamics are derived:

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

At each time step $T$, the numerical integrator must solve the **implicit causal constraint** for each source $j$:

$$
\|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f(T - T_{\mathrm{em}}), \quad T_{\mathrm{em}} < T
$$

**Algorithm (schematic):**

1. For each source $j$, search the history buffer $\{\mathbf X_j(T') : T' < T\}$ for all $T_{\mathrm{em}}$ satisfying the constraint.
2. Use **bisection** or **Newton-Raphson** to refine roots to tolerance $\epsilon_{\text{root}}$.
3. If multiple roots exist (multi-hit regime), enumerate all; sum their contributions.
4. If no roots exist (source too far away or not yet causal), skip source $j$ at this time step.

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

#### Provenance Tracking (Emission Event → Receiver → Response)

**For debugging and interpretation:**

At each hit, log:
- Source ID $j$
- Emission time $T_{\mathrm{em}}$
- Emission position $\mathbf X_j(T_{\mathrm{em}})$
- Reception time $T$
- Reception position $\mathbf X_i(T)$
- Force contribution $\mathbf{F}_{ij}(T; T_{\mathrm{em}})$

**Use cases:**

- Visualize causal cones and causal isochrons
- Identify self-hit events and winding numbers
- Trace energy transfer pathways
- Validate superposition (sum of logged forces = total acceleration?)

## Analytic Regimes and Research Roadmap

### Summary and Key Takeaways

#### What This Document Establishes

The **Master Equation of Motion** is the deterministic law governing the evolution of all architrinos:

$$
\frac{d^2 \mathbf X_i}{dT^2}
=
\sum_{j} \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})
\, \hat{\mathbf{r}}_{ij}
$$

**Key features:**

1. **Event-local at the receiver**: Only intersecting delayed causal wake surfaces contribute (no action-at-a-distance).
2. **Non-Markovian**: Depends on full path history (self-hit memory).
3. **Superposition**: Linear sum over all sources and causal roots.
4. **Self-hit**: Repulsive same-source interaction when $\mathcal{C}_{ii}(T)$ is nonempty with a valid transversality floor and a retained receiver-normal branch strength; super-field-speed interval history is a necessary warning condition for simple nontrivial roots and can persist as memory after slowing down.
5. **Radial line of action with receiver-normal branch weighting**: No magnetic or velocity-cross-product terms; all per-hit accelerations point along $\hat{\mathbf{r}}_{ij}$, with magnitude modulated by $W_{ij}^{\mathrm{rec}}$.

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
  $\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\| = c_f (T-T_{\mathrm{em}})$,
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

#### Static / quasi‑static limit (Coulomb analogue)

Assumptions:

- All particles move slowly: $\|\mathbf V_j\| \ll c_f$,
- Configuration changes on timescales long compared to light‑crossing time across the system,
- No self‑hits (sub‑$c_f$ everywhere, weak curvature).

Then:

- For each pair $(i,j)$, the causal root is essentially unique and very close to the instantaneous causal-delay emission time.
- We can neglect acceleration and velocity corrections in the past-emission position.

To leading order, we should recover:

- A **Coulomb‑like 1/r^2 law** between quasi‑static sources,
- The usual Kepler‑like two‑body dynamics.

Analytic status:

- Two‑body problem in this limit: solvable exactly (ellipses, etc.).
- N‑body: same qualitative status as Newtonian gravity/electrostatics—no closed form in general, but standard perturbation methods apply.

This is the basic consistency-check regime of the theory.

---

#### Two‑body, 1D radial motion (head‑on, no angular momentum)

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
- Then treat causal delay as a small parameter $\epsilon_\mathrm{ret} \sim r/c_f T$ and develop a systematic expansion.

The reduced problem is analytic up to standard quadratures, with causal-delay corrections available as a systematic perturbation series.

For the self-hit-capable reduced problem that goes beyond the sub-$c_f$ perturbative regime and sets up a return-map breather question, see [collinear-breather.md](../proof-programs/collinear-breather.md).

For the local origin-crossing theorem program in that reduced note, the working 1D model is dual-mollified rather than merely causal-surface-regularized: the causal-surface mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite. That dual-mollified local model is the one used for the first recapture lemmas there.

---

#### Two‑body uniform circular orbit, sub‑$c_f$ (no self‑hit)

Consider the symmetric opposite-polarity circular ansatz
$$
\mathbf X_1(T)=R(\cos\omega T,\sin\omega T,0),
\qquad
\mathbf X_2(T)=-\mathbf X_1(T),
\qquad
\beta\equiv \frac{v}{c_f}=\frac{\omega R}{c_f}\in(0,1)
$$
Fix receiver $1$ at time $T$ and let the unique partner emission time be $T_{\mathrm{em}}=T-\Delta$, with
$$
\xi\equiv \frac{\omega\Delta}{2}\in\left(0,\frac{\pi}{2}\right)
$$
Write $\mathbf{e}_r(T)=(\cos\omega T,\sin\omega T,0)$ and
$\mathbf{e}_\theta(T)=(-\sin\omega T,\cos\omega T,0)$ for the receiver polar frame.

#### Proposition (Unique partner branch and exact delay equation)

In the symmetric sub-$c_f$ circular ansatz, the partner branch is unique and its delay angle $\xi$ is the unique solution of
$$
\cos\xi=\frac{\xi}{\beta},
\qquad
0<\xi<\frac{\pi}{2}
$$

**Proof.**
The partner separation is
$$
\mathbf{r}_{12}(T;T_{\mathrm{em}})
=
\mathbf X_1(T)-\mathbf X_2(T_{\mathrm{em}})
=
R\big(\mathbf{e}_r(T)+\mathbf{e}_r(T-\Delta)\big)
$$
so
$$
r_{12}(T;T_{\mathrm{em}})=2R\cos\frac{\omega\Delta}{2}=2R\cos\xi
$$
The causal condition $r_{12}=c_f\Delta$ therefore becomes
$$
2R\cos\xi=c_f\frac{2\xi}{\omega}
$$
hence $\cos\xi=\xi/\beta$.
Define $h_\beta(\xi)=\cos\xi-\xi/\beta$ on $[0,\pi/2]$. Then
$$
h_\beta(0)=1>0,
\qquad
h_\beta\!\left(\frac{\pi}{2}\right)=-\frac{\pi}{2\beta}<0,
\qquad
h_\beta'(\xi)=-\sin\xi-\frac{1}{\beta}<0
$$
So $h_\beta$ is strictly decreasing and has exactly one root on $(0,\pi/2)$. $\square$

#### Lemma (Circular receiver-normal cancellation)

On every nondegenerate root of the uniform circular partner and self-hit charts,
the receiver-normal numerator equals the source-normal denominator:
$$
D_T=D_s,
\qquad
W^{\mathrm{rec}}=\left|\frac{D_T}{D_s}\right|=1.
$$
For the partner branch below, both source and receiver velocity projections onto
$\hat{\mathbf r}_{12}$ equal $-v\sin\xi$. For a uniform circular self root, the
same rotational symmetry makes the source and receiver projections equal on the
same signed chord sheet. Thus the circular source-normal Jacobian remains a
root-transversality and coarea diagnostic, but it is not an extra canonical
branch-strength factor for the uniform circular force rows.

#### Proposition (Exact partner-only circular receiver-normal decomposition)

For the unique partner branch above,
$$
\hat{\mathbf{r}}_{12}
=
\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T),
\qquad
r_{12}=2R\cos\xi,
\qquad
J_{12}^{\mathrm{src}}=1+\beta\sin\xi,
\qquad
W_{12}^{\mathrm{rec}}=1
$$
Since the charges are opposite, the partner acceleration on receiver $1$ is
$$
\mathbf A_{12}
=
-\frac{\kappa |q_1q_2|}{4R^2\cos^2\xi}
\left(
\cos\xi\,\mathbf{e}_r(T)-\sin\xi\,\mathbf{e}_\theta(T)
\right)
$$
Therefore the exact radial and tangential components are
$$
a_r^{(\mathrm{part})}
=
-\frac{\kappa |q_1q_2|}{4R^2\cos\xi}<0
$$
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa |q_1q_2|\,\sin\xi}{4R^2\cos^2\xi}
=
\frac{\kappa |q_1q_2|\,\tan\xi}{4R^2\cos\xi}
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
The source velocity at emission is
$$
\mathbf V_2(T_{\mathrm{em}})
=
-v\,\mathbf{e}_\theta(T-\Delta)
$$
and
$$
\mathbf{e}_\theta(T-\Delta)\cdot\hat{\mathbf{r}}_{12}=\sin\xi
$$
so
$$
\mathbf V_2(T_{\mathrm{em}})\cdot\hat{\mathbf{r}}_{12}=-v\sin\xi,
\qquad
J_{12}^{\mathrm{src}}=1-\frac{\mathbf V_2(T_{\mathrm{em}})\cdot\hat{\mathbf{r}}_{12}}{c_f}=1+\beta\sin\xi
$$
The receiver velocity is $\mathbf V_1(T)=v\mathbf e_\theta(T)$, and
$$
\mathbf V_1(T)\cdot\hat{\mathbf r}_{12}=-v\sin\xi.
$$
Therefore $D_T=D_s=c_f(1+\beta\sin\xi)$ and $W_{12}^{\mathrm{rec}}=1$ on this
uniform circular branch. Because $\sigma_{12}=-1$ for opposite polarities, the
canonical branch acceleration is $-\kappa|q_1q_2|\hat{\mathbf{r}}_{12}/r_{12}^2$,
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
These are the exact receiver-normal partner-only circular formulas needed elsewhere in the chapter. They show that the delayed partner branch supplies inward radial pull, but it also drives the motion forward along $\mathbf{e}_\theta$. Removing the stale source-normal denominator strengthens the tangential obstruction on the uniform circular chart. Any tightening history must be certified on a non-circular branch or by an explicit finite-window energy ledger.

---

#### Self‑hit for uniform circular motion, $v > c_f$ (single particle)

This is the key toy model for self‑hit/maximum curvature.

Take:

- One architrino on a circle of radius $R$, angular speed $\omega$, velocity $v = \omega R > c_f$.
- We ignore partner forces; pure self‑hit geometry.

Then causal condition:

$$
\big\|\mathbf X(T) - \mathbf X(T_{\mathrm{em}})\big\|
= 2R\left|\sin\frac{\omega (T-T_{\mathrm{em}})}{2}\right|
= c_f (T-T_{\mathrm{em}})
$$

Let $\Delta = T - T_{\mathrm{em}} > 0$. Then:

$$
2R\left|\sin\frac{\omega \Delta}{2}\right| = c_f \Delta
$$

Introduce the dimensionless variables
$$
\beta=\frac{v}{c_f}=\frac{\omega R}{c_f},
\qquad
\xi=\frac{\omega \Delta}{2}
$$
Then the circular self-hit condition becomes
$$
\sin\xi=\frac{\xi}{\beta},
\qquad 0<\xi<\beta
$$
For fixed $\beta>1$, the admissible self-hit set is therefore **finite**, not infinite: roots are exactly the intersections of $\sin\xi$ with the line $\xi/\beta$ inside the compact interval $(0,\beta)$.

The principal branch turns on at $\beta=1$. Writing $\beta=1+\mu$ with $\mu>0$ small, the smallest root obeys
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
\Delta_0 \sim \frac{2\sqrt{6\mu}}{\omega},
\qquad
r_0=c_f\Delta_0\sim 2R\sqrt{6\mu}
$$
The associated circular source-normal Jacobian diagnostic is
$$
J_n
=
1-\frac{\mathbf V(T-\Delta_n)\cdot\hat{\mathbf{r}}_n}{c_f}
=
1-\beta\cos\xi_n
=
1-\xi_n\cot\xi_n
$$
On the principal branch,
$$
J_0 \sim 2\mu
$$
The source-normal coarea diagnostic therefore scales like
$$
\frac{1}{r_0^2|J_0|}
\sim
\frac{1}{48R^2\,\mu^2}
$$
This is a root-map caustic diagnostic, not the canonical force strength on the
uniform circular chart. By the circular receiver-normal cancellation lemma,
$D_T=D_s$ and $W_0^{\mathrm{rec}}=1$ away from the degenerate endpoint, so the
canonical branch amplitude scales instead as $1/r_0^2\sim1/(24R^2\mu)$ before
regularization and finite-impulse interpretation are applied.

Higher branches are also tractable. For the circular root function
$$
g_\beta(\xi)\equiv \sin\xi-\frac{\xi}{\beta}
$$
new admissible roots can appear only at interior tangencies satisfying
$$
g_\beta(\xi)=0,
\qquad
g_\beta'(\xi)=0
$$
Eliminating $\beta$ gives the tangency equation
$$
\tan\xi = \xi
$$
and the corresponding threshold speed is
$$
\beta^\star = \sec\xi^\star
$$
At every such tangency,
$$
J^\star = 1-\beta^\star \cos\xi^\star = 0
$$
So each new circular self branch is born directly on a Jacobian-null boundary: branch creation and null-separatrix contact are the same event in the uniform circular toy model.

> **Proposition (Signed higher-winding circular branch birth).**
> The circular distance equation should be read branchwise as
> $$
> g_{\beta,s}(\xi)\equiv s\sin\xi-\frac{\xi}{\beta}=0,
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
> For $\beta=\beta_n^\star+\mu$ with $0<\mu\ll 1$, the two newly active roots satisfy
> $$
> \xi_{n,\pm}(\beta)
> =
> \xi_n^\star
> \pm
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu),
> $$
> and their source-normal Jacobians have opposite signs:
> $$
> J_{n,\pm}
> =
> 1-\beta s_n\cos\xi_{n,\pm}
> =
> \pm\,\xi_n^\star
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu).
> $$
> Thus a higher-winding fold creates a signed root pair on a Jacobian-null boundary. Since $r_{n,\pm}\to 2R\xi_n^\star/\beta_n^\star\neq0$, the source-normal diagnostic part of the branch kernel scales as
> $$
> \frac{1}{r_{n,\pm}^2|J_{n,\pm}|}
> =
> O(\mu^{-1/2}).
> $$
> The causal-action coarea weight is a separate collapse factor:
> $$
> g_{\beta,s_n}'(\xi_{n,\pm})
> =
> s_n\cos\xi_{n,\pm}-\frac{1}{\beta}
> =
> -\frac{J_{n,\pm}}{\beta},
> $$
> so the action-counting density carries an additional $|g_{\beta,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$. Under the receiver-normal law this source-normal scaling is not a force/action certificate by itself; it must be combined with the same-row receiver-normal numerator through $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ before any action or force row is promoted.
>
> Consequently the circular self-hit combinatorics remain linearly bounded in $\beta$. A one-sign subchart has
> $$
> N_{\text{self}}^{(+)}(\beta)=\frac{\beta}{\pi}+O(1),
> $$
> while the full signed $|\sin\xi|$ chart has the same no-proliferation form with the convention-dependent leading constant.

> **Benchmark Proposition (Circular branch-count bound).**
> In the symmetric circular benchmark, if the speed ratio obeys
> $$
> |\beta(T)|\le \beta_\ast<\infty
> $$
> uniformly, then the active circular self-hit count is uniformly bounded:
> $$
> N_{\mathrm{self}}(T)
> \le
> \frac{\beta_\ast}{\pi}+C_{\mathrm{circ}},
> $$
> where
> $$
> C_{\mathrm{circ}}
> $$
> is an absolute endpoint-count constant for the circular root equation. This supplies the missing branch-count input in the continuation criterion for that benchmark. A general super-field-speed trajectory still needs its own no-proliferation theorem; tight spirals or repeatedly folded histories can otherwise leave the finite-branch chart even without speed blowup, collision, or a single Jacobian floor loss. The natural generalization is a curvature-bounded no-proliferation lemma: on a retained interval with bounded speed, bounded curvature or total turning, positive separation, and the declared transversality floor away from finite folds, active causal roots should remain uniformly finite. Until such a lemma is proved for a trajectory class, the circular bound is a benchmark, not a global branch-count theorem.

This circular benchmark already:

- Gives us analytic control of the causal roots (as solutions of a simple scalar transcendental),
- Lets us write the receiver-normal self-force target as
  $$
  \mathbf A_\text{self}(T) =
  \sum_n \kappa \frac{q^2}{r_n^2}W_{n}^{\mathrm{rec}}\hat{\mathbf{r}}_n
  $$
  with $r_n = c_f \Delta_n$, $W_{n}^{\mathrm{rec}}=1$ on nondegenerate uniform circular roots, and directions that can be written explicitly in terms of the phase difference.

The benchmark does not provide an elementary closed-form sum, but it gives the following controlled inputs:

- the root geometry is explicitly analyzable,
- At high speed the number of admissible roots grows only linearly with $\beta$ because all roots lie in $(0,\beta)$,
- Large‑$n$ roots admit asymptotic expansions,
- the canonical self-force series can be studied away from circular root-map degeneracies,
- and the asymptotic radial/tangential components can be redriven as functions of $v/c_f$.

Near a circular source-normal degeneracy, this uniform chart does not by itself
capture the geometric-wall force limit: $D_T$ approaches zero with $D_s$, so
$W_n^{\mathrm{rec}}$ stays equal to $1$ on the nondegenerate roots. The
geometric-wall statement belongs to charts where $D_s\to0$ while $D_T$ remains
bounded away from zero.

This is therefore a root-transversality and branch-birth statement, not a
closure theorem. A circular self branch born on $D_s=0$ marks a chart boundary;
it does not supply a singular receiver-normal amplitude on the uniform circular
ansatz. Any locked-orbit claim must still control the signed radial and
tangential sums on a retained branch chart.

The circular benchmark is therefore useful for:

- deriving a condition for equilibrium between self‑repulsion and an imposed centripetal requirement,
- defining $R_\text{min}(v)$ and in particular the extremal radius / speed.

The same circular chart also gives a branchwise force decomposition. On the positive-sine self-hit subchart, every active root satisfies
$$
\sin\xi=\frac{\xi}{\beta},
\qquad
r=2R\sin\xi=2R\frac{\xi}{\beta},
\qquad
J=1-\beta\cos\xi=1-\xi\cot\xi
$$
Resolving the line-of-action direction into the instantaneous circular frame gives
$$
\hat{\mathbf{r}}(\xi)=\sin\xi\,\mathbf{e}_r+\cos\xi\,\mathbf{e}_\theta
$$
With
$$
C=\frac{\kappa q^2}{4R^2}
$$
and uniform-circular receiver-normal strength
$$
W_s^{\mathrm{rec}}(\xi)=\left|\frac{D_T(\xi)}{D_s(\xi)}\right|=1,
$$
the branchwise self-hit projections are therefore
$$
a_r(\xi)=C\frac{\beta}{\xi},
\qquad
a_\theta(\xi)=C\frac{\beta^2\cos\xi}{\xi^2}
$$
Thus the radial projection is outward on every active self root, while the tangential projection is controlled entirely by the sign of $\cos\xi$.

The branch sheets have the following one-sign structure:

| Sheet | Root status for $\sin\xi=\xi/\beta$ | Radial projection | Tangential projection |
| --- | --- | --- | --- |
| Negative sine lobes | No roots, because $\xi/\beta>0$ | Inactive | Inactive |
| First positive lobe | One nonzero root for $\beta>1$ | Outward | Forward for $\cos\xi>0$, backward for $\cos\xi<0$ |
| Higher positive left sheets | One root after birth from a Jacobian-null fold | Outward | Forward |
| Higher positive right sheets | Paired root after the same birth | Outward | Backward |

For comparison with older source-normal circular diagnostics, if one substitutes
the coarea factor $1/|J|$ in place of the canonical uniform-circular value
$W_s^{\mathrm{rec}}=1$, the diagnostic large-$\beta$ sums obey
$$
A_{r,\mathrm{src}}^{\mathrm{diag}}(\beta)
=
\frac{C}{\pi}\log\beta+O(C)
$$
and
$$
A_{\theta,\mathrm{src}}^{\mathrm{diag}}(\beta)
=
-\frac{C\beta}{12}+O(C\log\beta)
$$
The corresponding absolute tangential activity is
$$
\sum_{\xi_n}|a_{\theta,\mathrm{src}}^{\mathrm{diag}}(\xi_n)|
=
\frac{C\beta}{6}+O(C\log\beta)
$$
These are source-normal diagnostics only. They are retained to compare root
families, but they are not canonical force sums under the receiver-normal law.
With $W_s^{\mathrm{rec}}=1$, the positive-sine canonical radial sum has leading
order $(C\beta/\pi)\log\beta$; the signed tangential constants must be redriven
from the same receiver-normal branch rows before any cancellation estimate is
promoted.

The full signed $|\sin\xi|$ circular chart uses $s=\operatorname{sign}(\sin\xi)$ and
$$
s\sin\xi=\frac{\xi}{\beta},
\qquad
J=1-\beta s\cos\xi,
\qquad
\hat{\mathbf{r}}(\xi)=|\sin\xi|\,\mathbf{e}_r+s\cos\xi\,\mathbf{e}_\theta
$$
Thus the full signed-chart projections are
$$
a_r^{|\sin|}(\xi)=C\frac{\beta}{\xi},
\qquad
a_\theta^{|\sin|}(\xi)=C\frac{\beta^2s\cos\xi}{\xi^2}
$$
The radial contribution is still outward on every active self root. The tangential contribution is forward on each left sheet and backward on each right sheet, independent of the sine-lobe sign. Pure circular self-hit is therefore not tangentially neutral branchwise; it supplies outward radial support and signed forward/backward tangential activity that must be summed on the retained receiver-normal ledger. This corrects the stronger blanket statement that self branches are always positive-tangential, without by itself proving or disproving full binary closure.

#### Large-$\beta$ partner/self circular residual status

The receiver-normal partner branch has a clean high-speed asymptotic form. Let $\xi_p(\beta)$ solve
$$
\cos\xi_p=\frac{\xi_p}{\beta},
\qquad
0<\xi_p<\frac{\pi}{2}
$$
and set
$$
C=\frac{\kappa q^2}{4R^2}
$$
Then
$$
\xi_p=\frac{\pi}{2}-\frac{\pi}{2\beta}+O(\beta^{-2})
$$
so the partner projections satisfy
$$
a_{\theta}^{(\mathrm{part})}
=
\frac{4C}{\pi^2}\beta^2+O(C\beta),
\qquad
a_{r}^{(\mathrm{part})}
=
-\frac{2C}{\pi}\beta+O(C)
$$
The older residual constants
$$
C\left(\frac{4}{\pi^2}-\frac{1}{12}\right)\beta,
\qquad
\frac{C}{\pi}\log\beta-\frac{2C}{\pi},
\qquad
\frac{4C}{\pi^2}\beta,
\qquad
\frac{2C}{\pi}\log\beta-\frac{2C}{\pi}
$$
belong to the source-normal diagnostic chart in which $1/|J|$ was substituted
for the receiver-normal branch strength. They remain useful for comparing
root-family bookkeeping, but they no longer certify a force residual or a
large-$\beta$ circular exclusion. Under the receiver-normal law, the partner
tangential drive grows one order faster in $\beta$, and the self-hit signed
tangential and radial sums must be redriven with $W_s^{\mathrm{rec}}=1$ on the
same signed chart before any large-$\beta$ residual verdict is promoted.

Thus the equal-magnitude bare circular chart remains an obstruction benchmark,
not a closed no-go theorem. A retained constant-radius exclusion still requires
positive source-normal floors, inactive gaps, finite memory depth, the
receiver-normal branch rows, and signed radial/tangential residual closure on
the same branch chart.

The circular self-hit and partner-hit formulas are kernel benchmarks. They are not the Noether braid model. The Noether braid model is the six-body branch chart containing self, partner, and inter-layer causal roots, with hierarchy averaging only where justified by separated scales and certified branch data.

---

#### Maximum‑curvature binary (inner binary idealization)

For the full **two‑body** maximum‑curvature orbit (inner binary), we have:

- Two charges on roughly circular orbits about their COM,
- Both potentially with self‑hit,
- Plus partner forces with causal delay.

Analytic expectations:

- An *exact closed form* is very unlikely.
- But:

  - We can construct a controlled circular ansatz:
    - Assume perfectly circular orbits with fixed $R$, $\omega$,
    - Compute partner force including causal delay (as in [Sub-Field-Speed Circular Orbit (Receiver-Normal Restart Target)](#sub-field-speed-circular-orbit-receiver-normal-restart-target)),
    - Compute self‑force (as in [Self-Interaction (Self-Hit Dynamics)](#self-interaction-self-hit-dynamics)),
    - Demand that time‑averaged radial force gives exactly $\omega^2 R$,
    - Demand that time‑averaged tangential force vanish.

  - That gives us a **pair of algebraic conditions** in $R$ and $\omega$ (or equivalently $R$ and $v$).
  - Solving those algebraic conditions (perhaps numerically) defines a maximum‑curvature solution family.

However, the circular benchmark still exposes a serious obstruction in the bare two-body kernel. In the symmetric isolated binary, every active partner branch contributes a positive tangential component. The self sector is different: the circular self-hit branch table above gives outward radial support, while the tangential projection changes sign by sheet. The old source-normal large-$\beta$ cancellation constants are diagnostic only; under $W_s^{\mathrm{rec}}=1$, the signed self sums must be redriven before any cancellation claim is promoted. Therefore the former blanket self-branch positive-tangential claim is too strong. Exact constant-speed closure of the bare circular two-body ansatz is not ruled out by a branchwise sign argument alone; it requires the actual signed partner-plus-self tangential sum to vanish on a certified branch chart.

This sharpens the maximum-curvature program into a concrete fork:

- either the certified signed branch sum fails to cancel the partner drive, so the isolated two-body MCB does **not** exist as an exact constant-speed circular orbit of the bare kernel, or
- an algebraic cancellation exists, after which stability still requires a separate delay-operator proof and may require additional structure beyond the bare circular two-body ansatz, such as medium coupling, genuine Noether braid multi-body locking, or a more subtle non-circular periodic balance.

- Analytically: we can reduce the existence question to algebraic conditions and asymptotic expansions, and in the bare circular ansatz we can identify the partner-positive/self-signed tangential balance that any closure certificate must satisfy.
- Dynamically: the stability question remains separate from the algebraic construction and requires numerical analysis of attractivity versus fine-tuned orbit families.

The expected answer for the bare two-body kernel is instability, not robust attraction. Existence of a circular or maximum-curvature solution would only solve the algebraic balance conditions
$$
\overline F_{\mathrm{rad}}(R,v)=\omega^2R,
\qquad
\overline F_{\mathrm{tan}}(R,v)=0
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
> For any candidate bare two-body maximum-curvature binary, compute the linearized delay operator on radial and tangential perturbations. The null-separatrix self-hit wall may stabilize or block the radial collapse channel; partner branches supply sign-definite forward drive, while circular self branches supply outward radial support and a signed tangential channel whose receiver-normal large-$\beta$ sum must be redriven before cancellation is claimed. Thus a bare MCB should be treated as an uncertified organizing orbit in
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
At a source angle $\theta_0=\theta-\Delta$, write
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
which is the non-circular analogue of the circular partner equation $\cos\xi=\xi/\beta$.

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
the partner source-velocity projection entering the Jacobian is
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
The sign is fixed by the circular limit: when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta\sin(\Delta/2)$.

##### Closed Receiver-Normal Spiral Branch Factors

For force rows the source-normal denominator is not the branch strength. Define
the current and source-event dimensionless tangential speeds
$$
b\equiv\frac{r(\theta)\dot\theta(\theta)}{c_f},
\qquad
b_0\equiv\frac{r(\theta)\rho\omega_0}{c_f}
$$
Then the source-normal and receiver-normal factors on the same retained partner
root are available in closed form:
$$
\frac{D_{s,p}}{c_f}
=
1+
\frac{b_0}{\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big]
$$
$$
\frac{D_{T,p}}{c_f}
=
1+
\frac{b}{\Lambda_p}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
Hence the exact partner branch strength is
$$
\boxed{
W_p^{\mathrm{rec}}(\theta,\Delta)
=
\left|
\frac{
1+\dfrac{b}{\Lambda_p}
\big[p(1+\rho\cos\Delta)+\rho\sin\Delta\big]
}{
1+\dfrac{b_0}{\Lambda_p}
\big[\sin\Delta-p_0(\cos\Delta+\rho)\big]
}
\right|
}
$$
This expression is algebraic once a delayed root $\Delta$ is known. In the
uniform circular limit $p=p_0=0$, $\rho=1$, and $b_0=b$, its numerator and
denominator coincide, recovering $W_p^{\mathrm{rec}}=1$.

For opposite polarities, the branch acceleration is
$$
\mathbf A_{12}
=
-\kappa |q_1q_2|
\frac{W_p^{\mathrm{rec}}(\theta,\Delta)}{r(\theta)^2\Lambda_p^2}\,
\hat{\mathbf{r}}_{12}
$$
Projecting onto the variable-pitch Frenet frame gives
$$
a_T^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{rec}}(\theta,\Delta)}
{r(\theta)^2\Lambda_p^3\sqrt{1+p^2}}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
$$
a_N^{p}
=
\kappa |q_1q_2|
\frac{W_p^{\mathrm{rec}}(\theta,\Delta)}
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
Again the circular limit agrees with the uniform circular self-hit formula, $J_{11}=1-\beta\cos(\Delta/2)$.

The receiver projection on the same self line of action gives the companion
closed-form rows
$$
\frac{D_{s,s}}{c_f}
=
1-
\frac{b_0}{\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big]
$$
$$
\frac{D_{T,s}}{c_f}
=
1-
\frac{b}{\Lambda_s}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big]
$$
and therefore
$$
\boxed{
W_s^{\mathrm{rec}}(\theta,\Delta)
=
\left|
\frac{
1-\dfrac{b}{\Lambda_s}
\big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\big]
}{
1-\dfrac{b_0}{\Lambda_s}
\big[\sin\Delta+p_0(\rho-\cos\Delta)\big]
}
\right|
}
$$
The uniform circular limit again gives $D_{T,s}=D_{s,s}$ and
$W_s^{\mathrm{rec}}=1$ away from the common null endpoint. Thus the
receiver-normal restart does not require a new numerical ansatz for either
spiral branch family: it requires evaluating these exact ratios on the retained
root intervals.

For self-hit, $\sigma_{11}=+1$, so
$$
\mathbf A_{11}
=
\frac{\kappa q_1^2}{r(\theta)^2\Lambda_s^2}\,
W_{11}^{\mathrm{rec}}\,
\hat{\mathbf{r}}_{11}
$$
The self-branch tangential projection is
$$
a_T^{s}
=
\frac{\kappa q_1^2 W_{11}^{\mathrm{rec}}}{r(\theta)^2\Lambda_s^3 \sqrt{1+p^2}}
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
The delayed force does two different jobs, and they must be kept separate. Its
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
\frac{W_p^{\mathrm{rec}}(1+\rho_p\cos\Delta_p)}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{rec}}(1-\rho_s\cos\Delta_s)}{\Lambda_s^3}
$$
$$
B_\theta
\equiv
\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{rec}}\rho_p\sin\Delta_p}{\Lambda_p^3}
+\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{rec}}\rho_s\sin\Delta_s}{\Lambda_s^3}
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
and the angular-momentum row is
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
substitution into the polar equations gives the closed receiver-normal pitch
flow
$$
\boxed{
\frac{dp}{d\theta}
=
-(1+p^2)-\frac{B_r+pB_\theta}{\Gamma}
}
$$
$$
\boxed{
\frac{d}{d\theta}\log\omega
=
2p+\frac{B_\theta}{\Gamma}
}
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
\boxed{
(p_\star^2-1)\rho\sin\Delta
-2p_\star(1+\rho\cos\Delta)
=0
}
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
> single-principal-partner receiver-normal chart.

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
|q_1q_2|\frac{W_p^{\mathrm{rec}}S_T^p}{\Lambda_p^3}
+
\sum_{\mathrm{self}}
q_1^2\frac{W_s^{\mathrm{rec}}S_T^s}{\Lambda_s^3}
<0
$$
after the common positive factors are removed. Algebraic sign allowance is not enough; the delayed-root equations must actually admit those roots with positive source-normal floors, receiver-normal branch-strength intervals, and finite memory depth.

At a minimum-radius event $\theta_\ast$, the pitch condition gives $p(\theta_\ast)=0$. Therefore both tangential numerators reduce locally to
$$
S_T^p(\theta_\ast,\Delta)=S_T^s(\theta_\ast,\Delta)=\rho\sin\Delta
$$
Principal roots with $0<\Delta<\pi$ still carry the same positive tangential sign as the circular benchmark. The only bare-kernel escape routes are therefore:

1. admissible older or wrapped roots with $\sin\Delta<0$ and enough receiver-normal branch strength;
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
\frac{\kappa |q_1q_2|\,W_p^{\mathrm{rec}}(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3}
+
\sum_{\mathrm{self}}
\frac{\kappa q_1^2\,W_s^{\mathrm{rec}}(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3}
>0
$$
This is a theorem target, not a closure proof. It supplies the concrete falsification gate: enumerate the admissible partner and self roots on a variable-pitch candidate, certify their source-normal floors and same-row receiver-normal branch-strength intervals, and test both the radial turn inequality and the weighted tangential sum. If all admissible roots keep the weighted tangential sum nonnegative on every candidate turn corridor, the bare isolated spiral does not beat the circular obstruction.

For a retained chart at a turn center, the radial row can be normalized by the common force factor, but that normalization separates the branch sum from the independent force ratio. In the equal-magnitude opposite-polarity case, one may write
$$
\Gamma_{\mathrm{A1}}\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
\qquad
B_r^{\mathrm{rec}}(\theta_\ast)
=
-\sum_{\mathrm{part}}
\frac{W_p^{\mathrm{rec}}(1+\rho_p\cos\Delta_p)}{\Lambda_p^3}
+
\sum_{\mathrm{self}}
\frac{W_s^{\mathrm{rec}}(1-\rho_s\cos\Delta_s)}{\Lambda_s^3}
$$
so the normalized turn row is
$$
\Gamma_{\mathrm{A1}}+B_r^{\mathrm{rec}}(\theta_\ast)>0
$$
The retained branch chart must emit same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ rows before $B_r^{\mathrm{rec}}$ exists as force evidence. It does not determine $\Gamma_{\mathrm{A1}}$ from $b_\ast=\Omega r_\ast/c_f$, from the delayed-root offsets, or from a branch-sum threshold. A branch certificate must therefore either supply an independently derived force-ratio interval after the receiver-normal branch sum exists or report the radial row as blocked.

A fixed retained-chart benchmark is a receiver-normal restart target. For the $a_{\mathrm{A1}}=0.204$, $b_\ast=7/2$ constant-$\Omega$ variable-pitch spiral on $I_\ast=[-\pi/6,\pi/6]$, the retained $3+1$ chart has active-root, inactive-gap, source-normal floor, finite-memory, and root-transport rows. Its radial, tangential, action, and pass/fail rows are not canonical Master EOM evidence until the same retained boxes emit $D_T/D_s$ branch-strength intervals for $P_1,P_2,P_3,S_1$.

If the same turn-center radial curve is allowed a variable angular rate, with $\omega_\ast=\dot\theta(0)>0$ and $\alpha_\ast=\ddot\theta(0)$, then $r'(0)=0$ and the local kinematic targets become
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma_\ast,
\qquad
T_0^{\mathrm{rec}}(C_{\mathrm{A1}})=\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2}
$$
where $\Gamma_\ast=r_\ast^3\omega_\ast^2/(\kappa q_1^2)$. This supplies only a local angular-deceleration target for a variable-angular-rate continuation. It does not by itself close such a continuation, because the delayed roots and receiver-normal branch strengths must be recomputed for the nonconstant time law.

The stronger invariant form of the target is the angular slope of the time law,
$$
\left.
\frac{d}{d\theta}\log\dot\theta
\right|_{\theta=0}
=
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{T_0^{\mathrm{rec}}(C_{\mathrm{A1}})}{\Gamma_\ast}
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
Thus the variable-rate A1 continuation is a finite-memory time-law problem: the local angular-deceleration target must be reconciled with inverse-rate averages over the delayed branch intervals and with the same-box receiver-normal force rows. Simple one-parameter extensions of the local slope are not evidence unless they preserve the retained roots and recompute $W^{\mathrm{rec}}$ on the resulting branch ledger.

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
for each retained A1 delay. Because the local target gives $q'(0)=T_0^{\mathrm{rec}}(C_{\mathrm{A1}})/\Gamma_\ast<0$, the inverse-rate profile dips below $1$ just behind the turn and must compensate by rising above $1$ before the first retained delay. A positive retained-root inverse-rate profile can satisfy these constraints, keep the active source-speed factors at their constant-rate values at the retained offsets, and make the same branch sums give the required local angular-rate slope.

The first off-center transport row is also fixed at the turn center. If $q_\theta(u)=\dot\theta(\theta)/\dot\theta(\theta-u)$ and $H(\theta,\Delta)=\int_0^\Delta q_\theta(u)\,du$, then the retained endpoint constraints imply
$$
\left.\partial_\theta H(\theta,\Delta_\alpha)\right|_{\theta=0}
=
k_\ast\Delta_\alpha,
\qquad
k_\ast=\frac{T_0^{\mathrm{rec}}(C_{\mathrm{A1}})}{\Gamma_\ast}
$$
Since $b'(\theta)/b(\theta)=k_\ast$ at the turn center, the first $\theta$-derivative of $H/b$ cancels at the retained endpoints. Thus the retained-memory witness inherits the constant-chart first-order root-transport identity at $\theta=0$. This is still only a branch-chart search target, not an orbit certificate: the active roots, inactive gaps, source-speed Jacobians, finite-memory depth, generalized root-transport residuals, and force-balance rows still have to be recomputed on a finite $\theta$ interval for the chosen nonconstant time law.

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
does not by itself fix the full continuation class. After the tangential row is
imposed on the retained ledger, the transported radial row should be tested
through the leading one-sided jet of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near
$\theta=0$. For a specified tangential-transport profile, the jet coefficient is
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a_{\mathrm{A1}}-2)T_0^{\mathrm{rec}}(C_{\mathrm{A1}})
$$
The retained endpoint and moment constraints do not yet fix all source-side
endpoint-slope data entering $B'_+(0)$. A nonzero sampled coefficient is
therefore a local obstruction candidate for that profile, not a theorem that
every positive $C^2$ variable-rate continuation fails.

A sampled endpoint-slope construction sharpens the same caution. By perturbing
the retained past inverse-rate profile while preserving the retained endpoint
values, moment rows, compact $C^2$ tail, and center slope, one can cancel the
leading affine radial jet at sampled level and still keep a positive retained
past profile with the expected $3+1$ active-root ledger after tangential
transport. This does not certify A1 closure. It moves the theorem-grade burden
to finite-collar control after endpoint-slope cancellation: positivity,
inactive gaps, Jacobian floors, receiver-normal branch strengths, finite memory, tangential transport, and the
full radial residual must all be bounded on the same branch chart.

---

### Effective Continuum Limits

Another class of analytic work appears only after coarse-graining the microscopic DDE:

#### Homogeneous, isotropic Noether Sea

Assume:

- Very large number of architrinos,
- Statistically homogeneous and isotropic distribution,
- Global neutrality.

Then, at coarse‑grained level:

- Symmetry dictates the net acceleration on a test architrino at rest is zero.
- Small perturbations can be analyzed by linearizing around the homogeneous background.

We can:

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

Several analytic checks provide footholds for the remaining closure targets. Root-existence, inactive-gap, and source-normal transversality rows remain usable as topology inputs; radial/tangential force balance, action, power, and finite-window conservation rows must be redriven with $W_{ij}^{\mathrm{rec}}$ before they can be promoted.

1. **Partner-only circular orbit with causal delay ($v<c_f$)** has explicit radial and tangential components, including the positive tangential-drive obstruction for a bare constant-speed circle.
2. **Uniform circular self-hit ($v>c_f$)** has principal-root onset asymptotics, signed higher-winding branch birth, branchwise radial/tangential projections, source-normal diagnostic large-$\beta$ estimates, and a receiver-normal redrive target for promoted force sums.
3. **Variable-pitch spiral retained-chart benchmarks** expose both branch-chart rows and prescribed-history compatibility rows. The fixed A1 constant-$\Omega$ history has active-root, inactive-gap, source-normal Jacobian-floor, finite-memory, and root-transport rows, but its force-balance and outward-constant rows require receiver-normal branch-strength intervals on the same boxes before they can act as closure evidence. A1 is therefore a restart target, not a replayable force-balance no-go, until the retained chart is redriven with $W_{ij}^{\mathrm{rec}}$.

The remaining analytic targets are sharper:

1. build the maximum-curvature branch certificate from active roots, inactive gaps, source-normal Jacobian floors, receiver-normal branch-strength intervals, finite memory, root transport, returned-section residuals, radial/tangential balance, and the independent force-ratio row;
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
\frac{d^2 \mathbf X_i}{dT^2} =
\sum_{j} \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)}
\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2(T;T_{\mathrm{em}})}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})\,\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})
$$

where each contribution comes from a **causal wake intersection** at time $T$ between architrino $i$ and a wake emitted by architrino $j$ at earlier time $T_{\mathrm{em}}$. The set $\mathcal{C}_{ij}(T)$ encodes all such emission times selected by the causal constraint

$$
\|\mathbf X_i(T) - \mathbf X_j(T_{\mathrm{em}})\| = c_f (T - T_{\mathrm{em}}),\quad T_{\mathrm{em}} < T
$$

Once any internal binary reaches the $v>c_f$ regime at some stage in its curved history, **self‑hit** becomes a live branch candidate and must be checked explicitly in realistic energy accounting. Completed assemblies cannot be assigned a “no self-hit” energy row merely from current sub-field-speed motion; the retained path history must show that same-source roots are absent or inactive with a certified branch gap.

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
  where $V_\text{CM}$ is the center‑of‑mass speed. In practice, this is computed from the internal architrino motions (e.g., the tight inner binary self‑hit orbit plus its interaction with partner binaries).

Thus kinetic energy splits naturally into:

- **Internal kinetic energy** of bound assemblies (setting rest mass),
- **Center‑of‑mass kinetic energy** of assemblies relative to the Noether sea.

---

#### Action-Level Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of a symmetry-preserving nonlocal action model supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the action-derived delayed model, not to every regularized implementation of the Master Equation.

For the dual-mollified local 1D model used later in [collinear-breather.md](../proof-programs/collinear-breather.md), the same conservation language should be read more carefully: the causal-surface mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

##### Energy exchange per causal hit

Consider a single contribution to the acceleration of architrino $i$ at time $T$ from a causal hit emitted by $j$ at time $T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)$. The acceleration contribution is:

$$
\mathbf A_{ij}(T;T_{\mathrm{em}})
= \kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})\,\hat{\mathbf{r}}_{ij}
$$

The instantaneous power delivered to architrino $i$ by this hit is:

$$ 
P_{ij}(T;T_{\mathrm{em}})
= \mu_{\text{arch}}\,\mathbf A_{ij}\cdot \mathbf V_i
= \mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2}W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})\, V_{r,ij}
$$

where $V_{r,ij} = \mathbf V_i(T)\cdot \hat{\mathbf{r}}_{ij}$ is the radial component of the receiver’s velocity along the line of action. This is the **only instant** when the interaction can change the kinetic energy of $i$. Between hits, $\mathbf A_{ij}$ from this specific emission is zero.

Summing over all contributing sources and all causal emission times at a given $T$,

$$
\frac{dK_{\mu}}{dT}(T)
= \sum_i \sum_j \sum_{T_{\mathrm{em}} \in \mathcal{C}_{ij}(T)} P_{ij}(T;T_{\mathrm{em}})
$$

with the understanding that for self‑hit we include $j=i$ as well.

##### Action-level wake-energy functional at time boundary $T$

Let $\mathcal{K}_{ij}(T_1,T_{\mathrm{em}})$ denote the causal-delay interaction kernel appearing in the nonlocal action scaffold below:

$$
\mathcal{K}_{ij}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}\,
\Theta(T_1-T_{\mathrm{em}})\,
\frac{\delta\!\big(\tilde g_{ij}(T_1,T_{\mathrm{em}})\big)}{r_{ij}(T_1,T_{\mathrm{em}})},
\qquad
\tilde g_{ij}(T_1,T_{\mathrm{em}})=T_1-T_{\mathrm{em}}-\frac{r_{ij}(T_1,T_{\mathrm{em}})}{c_f}
$$

The tilde marks this as the time-normalized action constraint. The length-valued
Master Equation constraint remains $g_{ij}=r_{ij}-c_f(T-T_{\mathrm{em}})$.

For an isolated system, the nonlocal Noether charge associated with $T\mapsto T+T_{\mathrm{shift}}$ is

$$
E_{\text{tot}}(T)=K_{\mu}(T)+E_{\text{wake}}(T)
$$

with

$$
E_{\text{wake}}(T)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_{\mathrm{em}}
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_{\mathrm{em}})
$$

For $i=j$, the same rule applies with the trivial coincidence branch ($T_1=T_{\mathrm{em}}$) excluded, matching the self-hit convention used throughout this chapter.

Interpretation: the double integral measures interaction links that cross the absolute-time boundary $T$ (past emission side $T_{\mathrm{em}}\le T$ and future reception side $T_1\ge T$). This is the exact “in-flight” interaction contribution in the nonlocal theory.

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

**Receiver-normal action target.** A scalar-action scaffold is closure-relevant
only if its variation produces the receiver-normal target
$W_{ij}^{\mathrm{rec}}\hat{\mathbf r}_{ij}/r_{ij}^2$ on the retained branch
chart. Source-normal Jacobian terms in this subsection are transversality and
root-chart diagnostics; they are not branch-strength rows unless paired with
the receiver-normal numerator.

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

##### Exact causal-delay Fokker-type interaction term

For the focused scalar causal-locus statistic (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](causal-action-functional.md#core-functional-definitions). That chapter's scalar action-counting functional is not a force/action row unless it is rebuilt with $W_{ij}^{\mathrm{rec}}/r^2$. It is not automatically identical to the exact Fokker-type variational action below, whose $1/r$ causal kernel must be tested against the receiver-normal branch law after variation.

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
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}
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

Integrating out the delta via the delay-map Jacobian gives the branch-resolved form:

$$
\delta\!\big(\tilde g_{ij}(T,T')\big)
=
\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\frac{\delta(T'-T_{\mathrm{em}})}
{\left|\partial_{T'} \tilde g_{ij}(T,T_{\mathrm{em}})\right|},
\qquad
\partial_{T'} \tilde g_{ij}
= -1 + \frac{\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot \mathbf V_j(T_{\mathrm{em}})}{c_f}
$$

Hence

$$
S_{ij}
=
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}
\int dT\,
\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\frac{1}
{r_{ij}(T;T_{\mathrm{em}})\,\left|1-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}})/c_f\right|}
$$

This branch-resolved form is written per receiver time after the source-time
delta has been integrated out. It should not be silently reused as a
receiver-normal action-rate measure. On a retained smooth root $T_{\mathrm{em}}=T_\ell(T)$,
the causal constraint also gives
$$
\frac{dT_{\mathrm{em},\ell}}{dT}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em},\ell})\cdot\mathbf V_i(T)}
{c_f-\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em},\ell})\cdot\mathbf V_j(T_{\mathrm{em},\ell})}
$$
Therefore a source-emission cadence mapped onto a moving receiver path carries a receiver-normal numerator in addition to the source-normal Jacobian denominator. The action, power, wake-history, and finite-window conservation rows must consume the receiver-normal branch measure on the same retained branch chart. Rows that omit $D_T$ are not canonical force/action rows; fixed-receiver reductions must be obtained by direct substitution in $W_{ij}^{\mathrm{rec}}$.

##### Variation and line-of-action forces

This subsection is the bridge from the causal-hit rule to an action-style account. The physical rule has already said what a receiver feels: delayed line-of-action hits with receiver-normal branch strength. The variation below asks whether the same rule can be obtained from one regularized action ledger, so that force, power, and conservation bookkeeping come from the same source rather than from separate matching rules.

The branch law targeted by the action-level variation is:

$$
\frac{d}{dT}\left(\mu_{\text{arch}}\mathbf V_i(T)\right)
= \sum_j \mathbf{F}_{ij}(T)
$$

and the branch-resolved force is

$$
\mathbf{F}_{ij}(T)
=
\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_i q_j|
\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\frac{W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})\,\hat{\mathbf{r}}_{ij}(T;T_{\mathrm{em}})}
{r_{ij}^2(T;T_{\mathrm{em}})}
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
is the remaining distributional part of the proof. After the source-side variation, integration by parts on the root-selected chart, and boundary terms are accounted for, the target branch-resolved Euler-Lagrange term is proportional to
$$
\frac{W_{ij}^{\mathrm{rec}}\hat{\mathbf r}_{ij}}{r_{ij}^2}
$$
This $1/r^2$ scaling is not an added ansatz in the accepted proof route: it is the pull-back expected from a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel. The full proof now also requires deriving the receiver-normal branch factor and controlling the derivative-of-delta term under the same symmetry-preserving regularization.

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
Thus the root-constraint variation can be integrated by parts in the source time $T'$:
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
The first term is an endpoint or excluded-coincidence contribution; the second is the root-chart interior derivative that must be accounted for before the pure scalar kernel can be claimed to derive any branch-resolved acceleration law. Therefore the action proof does not license dropping $\delta_\eta'(\tilde g_{ij})$ by fiat. It requires the symmetry-preserving regularization to make this interior derivative vanish, become a boundary/source-side contribution under the allowed variations, or be cancelled by an explicit counterterm. In the canonical Master EOM the branch-resolved target is $W_{ij}^{\mathrm{rec}}\hat{\mathbf r}_{ij}/r_{ij}^2$, so this residual must be rebuilt inside the receiver-normal proof rather than reused as closure evidence.

The source-side variation narrows the issue further. Holding the receiver point fixed and varying the emission point gives
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
and hence the source-side derivative-of-delta term integrates by parts as
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
This is a coefficient of $\delta\mathbf X_j(T')$, not of $\delta\mathbf X_i(T)$. For arbitrary compactly supported interior variations, the receiver and source variations are independent. The source-side term therefore does not generically cancel the receiver-side root-chart derivative in the Euler-Lagrange equation for $\mathbf X_i(T)$. Noether boundary terms control endpoint contributions and global time-translation, spatial-translation, and rotation charges; they do not remove an interior coefficient under compact variations.

In the sharp positive-delay source-time-collapse limit,
$$
\int dT'\,
\delta_\eta(\tilde g_{ij})
\partial_{T'}
\left[
\Theta(T-T')
\frac{\hat{\mathbf r}_{ij}}{c_f r_{ij}J_{ij}}
\right]
\longrightarrow
\frac{1}{|J_{ij}(T;T_{\mathrm{em}})|}
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}{c_f r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_{\mathrm{em}}}
$$
Thus the scalar $1/r$ causal kernel produces the inverse-square scale term as
a receiver-normal proof ingredient only if the admitted branch also satisfies the
residual-vanishing condition
$$
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}{r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_{\mathrm{em}}}
=
\mathbf{0}
$$
or if the action is supplemented by an explicit regularized counterterm whose receiver Euler derivative cancels this residual interior vector. Such a counterterm must come from an invariant action-level mechanism, not from fitting the already accepted acceleration law. Under the receiver-normal law this is not a completed derivation; it is a warning that the pure scalar $1/r$ Fokker-type action is only a partial variational scaffold until the $W_{ij}^{\mathrm{rec}}$ target is derived.

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
\mathbf{C}_{ij,\mathrm{recv}}^{(\eta)}(T)
+
\mathbf{C}_{ij,\mathrm{src}}^{(\eta)}(T)
+
\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}(T)
$$
where $\mathbf{C}_{ij,\mathrm{recv}}^{(\eta)}$ is the receiver-side interior derivative displayed above, $\mathbf{C}_{ij,\mathrm{src}}^{(\eta)}$ is the source-side coefficient on $\delta\mathbf X_j(T')$, and $\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}$ is the boundary contribution. On a regularized chart the action-derived equation has the diagnostic form
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

**Decision (pure scalar action).** The pure scalar $1/r$ Fokker-type scaffold does not generically derive the receiver-normal canonical branch law. The remaining obstruction is local, not merely a boundary convention: the variational scaffold must produce the receiver-normal numerator as well as the source-normal denominator.

Equivalently, on an admissible branch with $r_{ij}>0$ and $|J_{ij}|>J_{\min}>0$,
$$
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}
{r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_{\mathrm{em}}}
\ne
\mathbf{0}
$$
is a certificate that the pure scalar scaffold leaves a nonzero receiver-force residual on that branch. This falsifies the universal claim "the scalar $1/r$ action by itself is the exact action for the Master EOM." It does not falsify the receiver-normal Master EOM, the action-level Noether bookkeeping on closed charts, or the possibility of a later invariant counterterm derived from a richer regularized action. It does mean the action proof path must start from the receiver-normal branch target.

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
The optional $J_{ij}$-dependence can add transverse and source-velocity terms, but it does not remove the scalar radial coefficient that must cancel the original derivative-of-delta residual. Cancelling that coefficient for all admitted receiver variations requires
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

The terminal common-center inter-layer chart gives a concrete obstruction to the remaining per-branch stationarity route. In that specialization, stationarity of $\hat{\mathbf r}/(rJ)$ forces the source tangent to be parallel to the source-receiver separation. The scalar part then reduces to $\rho_\delta(1-\rho_\delta)=0$, where $\rho_\delta$ denotes the branch value of $\partial_\delta\rho_b$ in the [common-center inter-layer stationarity obstruction](../proof-programs/terminal-alignment.md#lemma-common-center-inter-layer-stationarity-obstruction): the first factor collapses a positive-delay branch when the source speed is nonzero, and the second factor is $J=0$, a grazing branch excluded by the Jacobian floor. Thus terminal inter-layer charts should not expect the scalar scaffold to close by per-branch stationarity. The remaining local target is either branch-summed residual closure for a scale-only scaffold, or a recoil-inclusive action ledger that retains the residual as wake-emission resistance.

For the scale-only receiver-normal branch target, the branch-summed residual target is the vanishing of the signed receiver-side interior Euler derivative after the direct inverse-square term is removed:
$$
\sum_{b:\,o_b=i}
\kappa\,
\operatorname{sign}(q_{j_b}q_i)
\left|q_{j_b}q_i\right|
\mathbf{C}_{b}^{(0)}(T)
=
\mathbf{0}
$$
with the same positive-delay, Jacobian-floor, and boundary convention used by the branch chart. This is not the Master EOM force residual and not the Noether conservation ledger. It is the additional condition needed for the scalar action scaffold to have no leftover interior Euler derivative on that receiver. If the same signed sum is nonzero and is retained by the action rather than cancelled, it is the local recoil term that must appear in the finite-window force and energy ledger.

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
Thus the desired interior cancellation holds without an extra endpoint source only when $R_{+}$ is itself a characteristic endpoint, $D_{ij}R_{+}=0$.

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
as an Euler coefficient. Moving that term into the Noether wake-history ledger would hide a force-law change unless the endpoint is a declared fixed history boundary whose variation is held fixed. Therefore the characteristic-tail repair preserves the accepted Master EOM branch force only under one of the following conditions:
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
for the declared branch chart and fixed endpoint convention. In that admissible case the endpoint contributes only a boundary wake-history flux, not a new receiver force. In the generic non-characteristic case, the repair is a no-go for the canonical Master EOM because it adds an extra interior action force.

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
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
K_{\mathrm{eff}}^{(\eta)}
\!\left(
r_{ij}(T_1;T_{\mathrm{em}}),
\tilde g_{ij}(T_1,T_{\mathrm{em}})
\right)
$$
with the same finite-endpoint version when the chart uses $h_{+}<\infty$. For a time cut $T_\ast$, let
$$
X_{ij}(T_\ast)
=
\{(T_1,T_{\mathrm{em}}):T_{\mathrm{em}}\le T_\ast<T_1,\ T_1>T_{\mathrm{em}}\}
$$
with the trivial self-coincidence branch excluded when $i=j$. The normalized characteristic-tail wake increments are
$$
E_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\partial_{T_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
$$
$$
\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
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
while the source-end gradient is the opposite. Therefore a global spatial translation or rotation of both endpoints changes no interior action density, and a step translation or step rotation across $T_\ast$ exposes exactly the boundary increments above. The characteristic endpoint condition $D_{ij}R_{+}=0$, together with endpoint clearance, is the local reason these increments are wake-history boundary terms rather than a hidden extra receiver force.

This closes the local kernel-normalization and Noether-increment definition for the delayed-interior characteristic-tail repair. It does not by itself certify any proposed branch, terminal label, or Noether braid attractor: a branch chart must still show vanishing Euler residual, finite memory depth, positive source-normal Jacobian floors, retained same-record receiver-normal branch-strength rows, and closure of $K_{\mu}+E_{\mathrm{wake,eff}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}$, and $\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}$ over the same retained branch set.

**Branch-chart conservation pullback.** Let $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ be a retained branch chart with active causal-root rows $\mathcal{R}^{\mathrm{act}}$, positive inactive-root gaps, positive source-normal Jacobian floor, a retained receiver-normal branch-strength floor $\nu_{\mathrm{rec}}$, finite memory depth, and declared endpoint convention. For a time cut $T_\ast$, define the chart-restricted crossing domain
$$
X_{ij}^{\mathfrak{B}}(T_\ast)
\equiv
X_{ij}(T_\ast)
\cap
\{(T_1,T_{\mathrm{em}}): (i,j,T_1,T_{\mathrm{em}})\ \text{lies on a retained row of }\mathcal{R}^{\mathrm{act}}\}
$$
with trivial self-coincidence excluded when $i=j$. The pulled-back wake-history charges are the same Noether boundary terms above, restricted to $X_{ij}^{\mathfrak{B}}(T_\ast)$:
$$
E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\partial_{T_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
$$
$$
\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(T_\ast)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1
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
The theorem-level branch claim requires the three residual balances to converge to zero with $\epsilon_{\mathrm{var}}^{(\eta)}(W)\to0$, vanishing declared endpoint or period-cut leakage, stable branch floors, and the same retained row set in the force residuals and in the three wake-history charges. A work-integral reconstruction $U(T)$ or a projected torque increment is only a numerical diagnostic unless it is derived from this same action kernel, endpoint convention, and retained branch chart.

For a finite spatial window, the energy boundary row can be read as the wake-escapement flux defined in [Energy](energy.md#wake-escapement). In that notation, a theorem-level conservation packet should be able to rewrite the energy balance in the form
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

Self‑interaction ($i=j$) is included by adding $S_{ii}$ with the same kernel, but explicitly excluding the trivial coincidence $T'=T$ (no instantaneous self‑push at the moment of emission). Self‑hit corresponds to nontrivial roots $T_{\mathrm{em}}<T$ where the worldline re‑intersects its own causal isochrons, which are captured naturally by the same double‑integral structure.

Thus:

- The scalar $1/r$ action above is a nonlocal variational scaffold for the delayed dynamics under the stated branch and regularization assumptions,
- It becomes an exact action derivation of the Master EOM only on branch charts where the constraint residual vanishes or is cancelled by an invariant action-level counterterm,
- A finite same-support local scalar or delta-jet counterterm has been ruled out because it cancels the derivative residual only by disturbing the inverse-square scale term,
- The remaining minimal action repair is the delayed-interior characteristic-tail kernel above; its receiver Euler derivative has the desired inverse-square identity, and its normalized wake-history boundary increments are explicit,
- Without such closure, the pure scalar action is falsified as the universal exact action for the Master EOM and should be treated as a diagnostic scaffold,
- Any $\delta_\eta$ replacement must preserve the symmetries that supply the Noether charges if conservation claims are to remain exact.

---

#### Total Energy for an Isolated Set

Given the kinetic energy definition, the next object is the most useful history-aware total energy for an isolated architrino set.

##### General structure

We define a functional $H_{\text{tot}}$ such that:

- $H_{\text{tot}}$ is constant in $T$ for isolated exact trajectories,
- $H_{\text{tot}}$ reduces to $K_{\mu}+U$ in regimes where an effective potential description is adequate.

For an isolated action-derived system,

$$
H_{\text{tot}}[\{\mathbf X_i(\cdot)\},\{\mathbf V_i(\cdot)\}; T]
\equiv
K_{\mu}(T) + U(T)
$$

with $U(T)$ reconstructed along the realized trajectory by:

$$
U(T) = U_\ast - \int_{T_\ast}^{T} \sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot \mathbf V_i(T')\,dT'
$$

where $U_\ast$ is a fixed reference and $\mathbf A_i$ is the actual acceleration given by the Master Equation (including self‑hit and partner contributions). Then:

$$
\frac{dH_{\text{tot}}}{dT} = \frac{dK_{\mu}}{dT} + \frac{dU}{dT}
= \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
- \sum_i \mu_{\text{arch}}\,\mathbf A_i\cdot\mathbf V_i
= 0
$$

In this sense, the total energy functional is:

- Not a local function only of $(\mathbf X_i(T),\mathbf P_i(T))$,
- But a **history‑aware conserved quantity** that accounts for all past wake emission and all energy exchange via causal intersections.

This matches the ontology:

- **Energy resides in the architrinos and their assemblies**, not in a separate field substance,
- It is only updated at the absolute times $T$ when wake surfaces intersect receivers,
- Yet there exists a global invariant $H_{\text{tot}}$ for isolated trajectories, defined entirely from the particle worldlines and their induced accelerations.

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
- A **nonlocal variational scaffold** is available under the regularity and boundary assumptions stated above: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and targets the Master EOM with its receiver-normal inverse-square law, becoming an exact action derivation only when the constraint residual vanishes or is explicitly cancelled.
- The **total energy** for an isolated trajectory is history-aware; in suitable limits it reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $T = \text{now}$. The action-derived conserved charge is written as $K_{\mu}(T)+E_{\text{wake}}(T)$; a work-integral reconstruction $K_{\mu}(T)+U(T)$ is compatible only along realized trajectories after the same boundary convention and acceleration law have been declared.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

The Master Equation is a state-dependent delay system: acceleration at time $T$ depends on the path-history segment over $[T-h,T]$. In this setting, conservation laws are not functions of the instantaneous state $(\mathbf X,\mathbf V)$ alone. Instead, they are **functionals on path history** that track "in-flight" wake contributions.

The comparison to delay-equation theory should therefore be read literally but narrowly. A finite-propagation two-body law is not an ordinary present-state ODE: a valid update needs a retained history segment, the active causal-root ledger, and the same receiver/source branch rows used by the acceleration law. In standard terminology, a reduced chart whose delayed dependencies reach only positions and velocities resembles a state-dependent delay differential equation, while a chart that retains delayed accelerations or highest-derivative constraints is closer to a neutral delay differential equation. That classification is only a mathematical comparison; the native burden remains the same-record causal-root, $D_s$, $D_T$, $W^{\mathrm{rec}}$, and wake-history ledger.

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
for every $i$, with the same transformation also preserving all causal-root relations $\mathcal{C}_{ij}(T)$. For generic states this condition fails, so effective indistinguishability must be treated as coarse-grained observer bookkeeping rather than substrate identity.

#### Generalized Momentum and Angular Momentum

The delayed theory separates ordinary mechanical motion from the causal-wake history that is still in flight. For an action-derived delayed model with translation and rotation symmetry, the full Noether charges are history functionals: the particle-only quantities need not be conserved by themselves, but the particle-plus-wake totals are. In regularized or numerical variants, the same expressions should be treated as conserved diagnostics only when the chosen regularization preserves those symmetries.

**Definition (Mechanical momentum).**
$$
\mathbf{P}_{\text{mech}}(T) = \sum_i \mu_{\text{arch}} \mathbf V_i(T)
$$
Because the forces are delayed, $d\mathbf{P}_{\text{mech}}/dT$ is generally nonzero.

**Definition (Wake momentum functional).** For an isolated system, define
$$
\mathbf{P}_{\text{wake}}(T) = \mathbf{P}_{\text{wake}}(T_\ast) - \int_{T_\ast}^{T} \sum_i \mathbf{F}_i(T')\,dT'
$$
with $\mathbf{F}_i = \mu_{\text{arch}} \mathbf A_i$ from the Master Equation.

**Conservation law (total momentum).**
$$
\mathbf{P}_{\text{tot}}(T) \equiv \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}(T)
$$
is constant in time for isolated solutions. It is the momentum decomposition associated with spatial-translation invariance of the nonlocal causal action.

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
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as a compatible reconstruction up to a constant offset when it is derived from the same action-level force and boundary convention.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local recapture model of [collinear-breather.md](../proof-programs/collinear-breather.md), it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit force, then there exists $F_{\max}(\eta)$ such that
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
\frac{d^2\mathbf X_i}{dT^2}=\text{delayed causal-hit sum over }\mathcal{C}_{ij}(T)
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
For an exact finite-dimensional Hamiltonian reduction, $\mathcal{R}_{\Omega}=0$ and therefore $\mathcal{R}_{\mathrm{vol}}=0$. For the delayed Master EOM these are not automatic consequences of a small orbit residual: they are closure diagnostics for the claim that the retained branch chart has captured the missing path-history degrees of freedom well enough to behave like a canonical return map. A nonzero $\mathcal{R}_{\Omega}$ means at least one of the following remains unresolved: omitted causal-root rows, window-boundary wake flux, an action-level residual, or a reduction that is not actually Hamiltonian. Thus a local master-equation closure claim still uses $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ as defined above, while the stronger Hamiltonian claim must additionally report $\mathcal{R}_{\Omega}\le\epsilon_{\Omega}$.

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

**Constrained branch-multiplier formulation.** A constrained action is an active evidence row only if its branch kernel carries receiver-normal strength. On a fixed retained branch chart, the causal roots may still be represented as constrained variables rather than solved away immediately. Let $T_{\mathrm{em},ij,\ell}(T)$ be the emission time assigned to retained row $\ell$ and define
$$
G_{ij,\ell}(T)
\equiv
r_{ij,\ell}(T)-c_f\big(T-T_{\mathrm{em},ij,\ell}(T)\big),
\qquad
r_{ij,\ell}(T)
=
\left\|
\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em},ij,\ell}(T))
\right\|
$$
The receiver-normal target uses
$$
\mathcal{K}_{ij,\ell}^{\mathrm{rec},\eta}(T)
\equiv
\frac{w_{ij,\ell}^{(\eta)}(T)\,W_{ij,\ell}^{\mathrm{rec}}(T)}
{r_{ij,\ell}(T)},
\qquad
W_{ij,\ell}^{\mathrm{rec}}(T)
=
\left|
\frac{D_{T,ij,\ell}(T)}{D_{s,ij,\ell}(T)}
\right|
$$
where $D_s=c_f-\hat{\mathbf r}\cdot\mathbf V_j(T_{\mathrm{em}})$ and $D_T=c_f-\hat{\mathbf r}\cdot\mathbf V_i(T)$. A branch-reduced constrained scaffold on a window $W$ must therefore be redriven in the form
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
where $\tilde\alpha_{ij}$ carries the coupling and polarity convention, $w_{ij,\ell}^{(\eta)}$ carries the retained mollified branch and cutoff convention, and $\lambda_{ij,\ell}$ is a Lagrange multiplier for the causal-root constraint. Variation with respect to $\lambda_{ij,\ell}$ enforces $G_{ij,\ell}=0$. Variation with respect to the root variable gives the restart row equation
$$
0
=
\partial_{T_{\mathrm{em},ij,\ell}}
\left[
-
\tilde\alpha_{ij}
\mathcal{K}_{ij,\ell}^{\mathrm{rec},\eta}
+
\lambda_{ij,\ell}G_{ij,\ell}
\right]
$$
provided the row has no explicit $dT_{\mathrm{em},ij,\ell}/dT$ dependence after the chosen reduction. Variation with respect to the receiver position exposes the constraint contribution
$$
\delta_{\mathbf X_i}
\int_W\lambda_{ij,\ell}G_{ij,\ell}\,dT
=
\int_W
\lambda_{ij,\ell}(T)\,
\hat{\mathbf r}_{ij,\ell}(T)\cdot\delta\mathbf X_i(T)\,dT
$$
Thus the multiplier term is not a new substrate force. It is the finite-dimensional record of the work required to keep the retained branch row on the causal-root surface while the surrounding path history is varied. The unconstrained branch action is recovered only when these multiplier contributions are either solved into the same invariant action-level counterterm used above, converted into legitimate boundary wake-history terms, or shown to vanish in the branch-summed residual:
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
Here $o_\ell$ denotes the receiver index of branch row $\ell$. This is the delayed-action analogue of ordinary holonomic constraint handling: one may solve constraints into generalized coordinates, or retain them with multipliers, but the multiplier ledger must not be hidden inside a claimed exact acceleration law.

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
where $\mathbf{R}_i^{(\eta)}$ is the Euler residual of the same action and $\mathcal{B}_{\xi}^{(\eta)}$ collects leakage through finite memory endpoints, period cuts, omitted branch rows, and non-characteristic tail endpoints. Exact conservation follows only when both terms vanish. Time translation, spatial translation, and rotation are the special cases that produce energy, momentum, and angular momentum above. This is the delayed version of the standard symmetry-to-conservation statement, with the crucial difference that the conserved object is a particle-plus-wake history functional rather than an equal-time particle function.
