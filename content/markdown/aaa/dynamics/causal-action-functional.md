# Causal Action Functional

This chapter develops the action-counting complement to the master-equation treatment of dynamics. Its job is to define a scalar causal-hit statistic that compares delayed worldline structures, labels candidate assembly classes, and supplies one geometric input to later mass, shielding, and medium-response closure. It is not the exact variational action for the Master EOM; action-derived dynamics require the variation residual to vanish under the test stated in [Effective Lagrangian](effective-lagrangian.md#regularized-nonlocal-action-and-variation) and [Master Equation](master-equation.md#exact-nonlocal-lagrangian).

The current scope is mixed. Some statements are theorem-backed in the regularized setting, while the larger closure program remains open. The chapter therefore begins with the problem statement and core functional definitions, then separates the controlled theorem spine from benchmarks, implementation notes, and longer-range closure targets.

## Problem Statement and Goal
The broad objective is to explain why only certain assemblies are stable and discrete, and to treat observer-level mass as an exposed response of a closed internal causal-history ledger, shielding, and Noether sea coupling rather than an externally assigned input. The target in this chapter is narrower: a geometric causal-locus statistic derived from the causal-wake kernel that can be evaluated on periodic orbits, compared across topological classes, and tested against dynamical stability.
Canonical dynamics are defined in [The Master Equation (Canonical Form)](master-equation.md#the-master-equation-canonical-form); this chapter provides the complementary action-functional lens.

The level separation is essential:

1. **Ontology:** architrino histories emit causal wakes in absolute time and the Euclidean void.
2. **Dynamics:** the master equation sums delayed, Jacobian-weighted line-of-action hits.
3. **Statistic:** the functional in this chapter removes direction and counts weighted causal intersections.
4. **Effective/inferential use:** mass response, effective geometry, and branch spectra are later reconstructions that must be checked against the actual delayed dynamics.

The conservation status has three allowed levels. At theorem level, a symmetry-preserving delayed action produces history charges by the branch-chart Noether pullback in [Master Equation](master-equation.md#exact-nonlocal-lagrangian), with Euler residuals and boundary leakage vanishing on the same retained rows. At quasi-Noether level, the same calculation is accepted only after explicit residual, boundary, wake, and history-channel terms close the finite-window balance under refinement. If neither action-derived nor quasi-Noether structure survives self-hit and state-dependent delay, then energy, momentum, and angular-momentum rows are diagnostic quantities only; they may reject a branch by showing unbounded or refinement-unstable drift, but they may not be advertised as derived conservation laws.

## Core Functional Definitions
**Scalar causal-hit counting functional:**
$$
\mathcal{A}_{\text{self}}[\gamma] = \iint_{\gamma \times \gamma}
\frac{\delta\!\big(\|\mathbf{x}(t)-\mathbf{x}(t')\| - c_f|t-t'|\big)}
{\|\mathbf{x}(t)-\mathbf{x}(t')\|^2\,J_\gamma(t,t')}\,dt\,dt'
$$
We introduce a scalar causal-hit counting functional to make stability searches comparable across trajectories. This is not the exact Fokker-type variational action of [Effective Lagrangian](effective-lagrangian.md); it is the branch-density statistic obtained after retaining the received inverse-square and Jacobian weights while discarding line-of-action direction. Its appropriate use is to nominate dynamically preferred worldline classes, then test those nominations with the master-equation flow before interpreting them as discrete observer-level particle states.

Geometrically, the statistic is the mass of a weighted causal-locus current. On a regular chart, let
$$
\mathsf C_\gamma
=
\left[\mathcal{L}_{\text{causal}},\tau_\gamma,w_\gamma\right],
\qquad
w_\gamma(t,t')
=
\frac{1}{r(t,t')^2J_\gamma(t,t')\|\nabla F_\gamma(t,t')\|}
$$
where $\tau_\gamma$ is the chosen orientation on each retained component. The coarea limit below reads
$$
\mathcal{A}_{\text{self}}[\gamma]
=
\mathbb{M}(\mathsf C_\gamma)
$$
up to the declared normalization: it is the weighted length, or current mass, of the causal locus. The force law uses the same support and weights but pairs the oriented current with the line-of-action direction field $\hat{\mathbf r}$. Thus the scalar statistic detects branch support and branch topology, while the vector dynamics require the oriented current pairing that the statistic has intentionally discarded.

This integrates over all nontrivial pairs of points on a single worldline and counts only those pairs that are causally connected by a wake moving at speed $c_f$. The trivial diagonal $t=t'$ is excluded, either by a punctured domain or by a cutoff $|t-t'|\ge\tau_{\min}>0$. The inverse-square factor weights nearby self‑hits more strongly than distant ones, while $J_\gamma^{-1}$ accounts for the geometric bunching or dilation of the delayed flux along the active branch.
Convention: this document distinguishes the compact symmetric selector $|t-t'|$ from the lifted delayed selector $\Delta_m=t-t'+mT$. The symmetric form is useful on one-period charts; the lifted delayed form is required when multi-period causal roots are active.
Here $J_\gamma(t,t')$ denotes the branch Jacobian induced by the causal constraint. In lifted delay coordinates one may use the absolute root Jacobian $J_\gamma=\left|\partial_{t'}\big(\|\mathbf{x}(t)-\mathbf{x}(t')\|-c_f\Delta\big)\right|$; when comparing to the Master Equation, the dimensionless received-flux factor is the corresponding $1-\mathbf{v}\cdot\hat{\mathbf{r}}/c_f$, with constant factors absorbed into the declared normalization. This branch Jacobian is distinct from the coarea factor $\|\nabla F_\gamma\|$ that appears when the two-time integral is reduced to a one-dimensional causal locus.

**Interpretation:**
1. **Object:** The full worldline $\gamma$ is treated as a single geometric object.
2. **Constraint:** The delta function enforces the causal-isochron condition, selecting causally connected pairs.
3. **Measure:** The inverse-square weight emphasizes close self‑hits over distant ones, while the Jacobian factor converts constant source emission into the correct received causal flux.

**Lifted normalized periodic self‑action statistic:**
$$
\Delta_m(t,t')=t-t'+mT,
\qquad
F_m(t,t')=r(t,t')-c_f\Delta_m(t,t')
$$
For a $T$-periodic orbit, finite memory depth $h$, and nontrivial-branch cutoff $\tau_{\min}>0$, use
$$
\bar{\mathcal{A}}_{\text{self},\eta,h,\tau_{\min}}[\gamma]
=
\frac{1}{T}
\int_0^T\sum_{m\in\mathbb{Z}}\int_0^T
\mathbf{1}_{\tau_{\min}\le\Delta_m\le h}
\frac{\delta_\eta\!\big(F_m(t,t')\big)}
{r(t,t')^2\,J_m(t,t')}\,dt'\,dt
$$
with $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $\delta_\eta$ a mollified delta, and $J_m(t,t')=\left|\partial_{t'}F_m(t,t')\right|$ on a simple delayed branch. This lifted form captures multi-period circular roots and avoids the trivial diagonal. A symmetric $|t-t'|$ selector is equivalent only after the diagonal is excluded and the delayed half-domain normalization is corrected; otherwise it misses high-winding branches or double-counts them.
Dimensional status depends on the chosen time/length units and normalization by $T$, $h$, and $c_f$; use a declared dimensionless rescaling before comparing this statistic to mass or action coefficients.

**Lifted finite-memory bound.** If the lifted statistic is restricted to $\tau_{\min}\le\Delta_m\le h$, the active support satisfies $r\ge r_{\min}>0$, and the simple-branch floor $J_m\ge J_{\min}>0$ holds, then
$$
0\le
\bar{\mathcal{A}}_{\text{self},\eta,h,\tau_{\min}}
\le
\frac{(h-\tau_{\min})\|\delta_\eta\|_\infty}
{r_{\min}^2J_{\min}}
$$
The reason is that, for each fixed $t$, the lifted intervals selected by $m$ partition the delay line over the retained memory window:
$$
\sum_m\int_0^T
\mathbf{1}_{\tau_{\min}\le\Delta_m\le h}\,dt'
=
h-\tau_{\min}
$$
Under transversality, the weak coarea limit becomes
$$
\frac{1}{T}\sum_m
\int_{\mathcal{L}_m}
\frac{1}{r^2J_m\|\nabla F_m\|}\,d\ell,
\qquad
\mathcal{L}_m=\{F_m=0,\ \tau_{\min}\le\Delta_m\le h\}
$$
Therefore simulations comparing lifted action-density values must report $h$, $\tau_{\min}$, the retained $m$ range, $r_{\min}$, $J_{\min}$, the transversality floor, and inactive-root gaps.

**Total scalar action-counting statistic (multi‑assembly):**
$$
\bar{\mathcal{A}}_{\text{total}}[\{\gamma_i\}] =
\frac{1}{T^2}\left[
\sum_i \int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ii}(t,t')-c_f|t-t'|\big)}{r_{ii}(t,t')^2\,J_{ii}(t,t')}\,dt\,dt'
\;+\;
\frac{1}{2}\sum_{i\ne j}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ij}(t,t')-c_f|t-t'|\big)}{r_{ij}(t,t')^2\,J_{ij}(t,t')}\,dt\,dt'
\right]
$$
This single-period symmetric form aggregates self‑terms and cross‑terms between components, with the $\frac{1}{2}\sum_{i\ne j}$ convention ensuring unordered pairs are counted once. Self-terms inherit the same nontrivial-branch exclusion used above. When multi-period branches are active, replace each symmetric selector by the lifted finite-memory form before comparing totals across branch charts.

**Definitions:** $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $r_{ij}(t,t')=\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|$, $\Delta t = t-t'$, and $J_{ij}(t,t')=\left|\partial_{t'}\big(r_{ij}(t,t')-c_f|t-t'|\big)\right|$ is the branch Jacobian induced by the delayed causal constraint.

**Kernel comparison:**
$$
\text{Force kernel: } \left[ \frac{\hat{\mathbf{r}}(t,t')}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
\qquad
\text{Scalar statistic kernel: } \left[ \frac{1}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
$$
The force kernel retains direction via $\hat{\mathbf{r}}$, while the scalar statistic kernel keeps only the magnitude. This is the minimal change that turns a vector interaction into a scalar comparison functional while preserving the same causal Jacobian geometry as the master equation. It should not be read as the exact Fokker-type action whose variation derives the force law.

Causal-set action constructions provide a useful external comparison at this point. Their lesson is that interval counts can be arranged so that a discrete causal-order statistic approximates continuum curvature or action in a suitable large-scale regime. The analogous $\mathbb{A}\mathbb{A}\mathbb{A}$ question is whether causal-wake and causal-root statistics built from the master-equation kernel admit a coarse-grained operator or action statistic that matches the required GR and QFT recovery targets. That benchmark does not license importing causal-set dynamics; it only sharpens the test for any proposed scalar action-counting functional.

As a scalar, $\mathcal{A}_{\text{self}}$ summarizes the total strength of causal self‑hits along a worldline. It is derived directly from the interaction structure, but with the directional information removed.

For reference, the self‑interaction term in the master equation uses the same kernel:
$$
\mathbf{a}_{\text{self}}(t)
=\kappa q^2\int dt' \,
\frac{\hat{\mathbf{r}}(t,t')}{r^2(t,t')\,J_\gamma(t,t')}
\delta\!\big(r(t,t')-c_f(t-t')\big)
$$

## Regularized Mathematical Setting (Explicit Regime)

To separate what is already controlled from what remains conjectural, we work in the
regularized regime $\eta>0$ and state all claims on one period.

Define
$$
\phi_\eta(u)\equiv \delta_\eta(u),
\qquad
F_\gamma(t,t')\equiv r(t,t')-c_f|t-t'|,
\qquad
r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|
$$

For a $T$-periodic $C^2$ trajectory $\mathbf{x}(t)$ with no collisions or trivial self-support on the sampled
domain ($r(t,t')\ge r_{\min}>0$, $|t-t'|\ge\tau_{\min}>0$ on self terms, and $J_\gamma(t,t')\ge J_{\min}>0$ on support of $\phi_\eta$), define
$$
\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]
=\frac{1}{T^2}\int_0^T\!\!\int_0^T
\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'
$$

This is the single-period symmetric object for proofs and numerics when one period contains the full relevant causal memory. It is therefore a controlled chart, not the most general causal-memory functional. When high-winding or multi-period branches are active, replace it by the lifted statistic above with the same lower-bound and Jacobian assumptions. The unregularized $\eta\to0^+$ limit is treated only after bounds are established.

## Axioms and Admissibility Assumptions

We use the following minimal assumption set for theorem-level statements:

- **(A1) Regularity:** $\mathbf{x}\in C^2(\mathbb{R};\mathbb{R}^3)$ and is $T$-periodic.
- **(A2) Finite-speed causality:** The causal selector is $F_\gamma(t,t')=0$ with field speed $c_f>0$.
- **(A3) Collision and trivial-diagonal exclusion on support:** $r(t,t')\ge r_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$, with $|t-t'|\ge\tau_{\min}>0$ on self terms unless a separate core regularization is declared.
- **(A3b) Jacobian nondegeneracy on support:** $J_\gamma(t,t')\ge J_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A4) Uniform transversality (generic branch):** on the retained compact domain, the selected causal set has a floor
  $$
  \|\nabla F_\gamma\|\ge\nu>0
  $$
  in a neighborhood of the zero level. Pointwise nonvanishing is the geometric condition; the uniform floor is the operative form used in coarea limits and simulations. On the retained compact chart this also gives a local uniform length bound
  $$
  \mathcal{H}^1\!\left(F_\gamma^{-1}(s)\cap K\right)\le L_{\max}
  \qquad (|s|\le s_0)
  $$
  for each compact retained chart $K$, after reducing $s_0$ if necessary. This length bound is the measure-theoretic reason the coarea weak limit remains controlled rather than only pointwise transverse.
- **(A5) Fixed topological class:** Deformations are taken inside one time-domain homotopy or relative-homology class on the retained torus or lifted strip unless a bifurcation condition is crossed. For cut components, endpoints may move along the declared diagonal-collar or memory-window boundary, but they may not cross into a different boundary component or leave the retained chart.
- **(A6) Isolated system bookkeeping:** When connecting to dynamics, energy/momentum use the same $\eta$ and history window conventions as the master-equation diagnostics.

These assumptions are deliberately local and testable. If any assumption fails, the
corresponding theorem is not claimed.

For the finite-$\eta$ pathology theorem target, (A3) and (A3b) are the action-statistic side of the self-energy and caustic quarantine. They bound the scalar causal-hit statistic on the retained chart, but they do not by themselves prove the Master EOM, no-runaway behavior, or exact conservation. Those stronger claims require the same branch chart to pass the force residual, action residual, and energy-momentum residuals stated in [Master Equation](master-equation.md#finite-eta-pathology-quarantine-theorem-target).

## Rationale for the Functional
- **Action-like comparison candidate:** If a motion class is stationary or extremal for this statistic, the result gives a candidate branch label. It does not by itself prove attraction, rest mass, or a variational derivation of the master equation.
- **Bridge to geometric analysis and knot theory:** Showing that simple periodic motions, such as maximum-curvature self-hit orbits, locally minimize $\mathcal{A}_{\text{self}}$ within a topological class would give a geometric reason to test those orbits as preferred branches.
- **Simulation-friendly statistic:** Given any numerically computed orbit, one can sample $(t,t')$, test the causal-isochron condition, and estimate $\mathcal{A}_{\text{self}}[\gamma]$ to compare geometries. This makes the "stable = local minimum" heuristic a testable claim rather than a definition.
- **Statistical-invariant candidate:** Because the functional is built from the master-equation kernel and can be estimated from simulated histories, it is a candidate input to invariant-measure or basin-measure studies of attractor selection.

## Geometric/Topological Framework
**Causal locus and lifted-strip degree:** For a periodic orbit the compact coordinates $(t,t')\in[0,T]^2$ form a torus before the trivial diagonal is removed. The causal locus
$$
\mathcal{L}_{\text{causal}} = \{(t,t')\in T^2 \mid \|\mathbf{x}(t)-\mathbf{x}(t')\| = c_f|t-t'|\}
$$
is the set of self-hits. Once the diagonal collar $|t-t'|<\tau_{\min}$ is excluded, the working domain is not the closed torus but a torus with boundary. A regular component that closes on the unpunctured torus carries a winding class $(p,q)\in H_1(T^2,\mathbb{Z})$, but a near-threshold component may instead be an arc with endpoints on the excluded collar. The primary invariant on the retained finite-memory chart is therefore the lifted-strip fiber-intersection number.

On the lifted strip
$$
S_{\tau,h}
=
\{(t,t'):\tau_{\min}\le \Delta_m(t,t')\le h\},
\qquad
\Delta_m=t-t'+mT,
$$
let $\mathcal{L}_a$ be a connected component of $F_m^{-1}(0)$ and define
$$
\iota_a
=
\#_{\mathrm{alg}}\big(\mathcal{L}_a\cap\{t=t_0\}\big)
$$
for a generic vertical fiber $\{t=t_0\}$. The algebraic sign is the branch-orientation sign, equivalently the sign convention used for the delayed-root Jacobian on that component. The unsigned sum $\sum_a|\iota_a|$ recovers the per-period self-hit count on the retained strip, while the signed sum recovers the signed degree used by the causal-root ledger. If a component also closes on the unpunctured torus with winding class $(p_a,q_a)$, then $\iota_a=q_a$ after the same orientation convention is fixed. The winding language is therefore valid for closed components, while the fiber-intersection degree is the bridge to the root-ledger entries used in the assembly topological charge.

For components cut by the diagonal collar or finite-memory window, the precise object is a relative class
$$
[\mathcal{L}_a]\in H_1(S_{\tau,h},\partial S_{\tau,h};\mathbb{Z})
$$
together with its intersection pairing against the vertical fiber. The pairing is invariant while endpoints remain on the declared boundary pieces and do not migrate across the memory-wall convention $\Delta_m=h$ or the nontrivial-branch collar $\Delta_m=\tau_{\min}$. This is the same relative-versus-absolute distinction used by [Assembly Topological Charge](assembly-topological-charge.md): closed causal-locus components may carry torus winding data, while cut components feed the signed root degrees through $\iota_a$.

As geometric control parameters change, the locus can undergo reconnection or fold events; these are the bifurcations where families appear or disappear, giving a branch-topology mechanism for discrete self-hit patterns. In the circular benchmark below, sub-$c_f$ motion leaves the retained causal locus empty after the trivial diagonal is removed, while super-$c_f$ motion creates branches whose lifted-strip intersections determine the integer self-hit count per period.
The self-action integral is the **weighted arc length** of the retained causal locus, including the coarea factor in the weak limit. Equivalently, it is the mass $\mathbb M(\mathsf C_\gamma)$ of the weighted causal-locus current defined above, so topology and metric weight enter together.

**Causal writhe (chirality):**
$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}} \text{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}(t,t')\big)\,d\ell
$$
where $\mathbf{r}(t,t')=\mathbf{x}(t)-\mathbf{x}(t')$ and $d\ell$ is the induced line measure on the causal locus. This is a candidate signed measure of handedness for the self‑interaction pattern. Nonzero $Wr_c$ is a possible topological handle for chirality/spin closure; it is not yet a proof that spin is fixed by the causal locus alone.
The symmetric torus chart counts the same unordered self-hit pair twice. A chirality comparison must therefore either restrict the integral to the delayed half-domain $\Delta_m>0$ or divide the symmetric quotient value by two, with the orientation convention stated before comparing handedness between branches.
The notation $Wr_c$ should not be confused with the full Călugăreanu writhe of a framed spatial curve. It is a Gauss-map-like signed density restricted to the causal-locus support, so it is a **causally weighted partial writhe**: it sees only pairs connected by accepted causal roots. The framed self-linking carrier needed by spin-statistics closure is the full invariant
$$
Lk=Wr+Tw
$$
on a declared framed spatial bundle. Whether $Wr_c$ equals, bounds, or merely correlates with that framed invariant is an open bridge problem; if the causal locus samples only part of the pair set, $Wr_c$ can undercount the chirality relevant to exchange statistics.

**Topological vs Noether data:** Continuous symmetries (time shifts, rotations) identify Noether-charge targets: energy from time-translation symmetry and total angular momentum from rotational symmetry. In a closed symmetry-preserving delayed action these would become conserved history functionals. The winding class of closed components and the lifted-strip intersection degree supply candidate inputs to the assembly topological charge program. A generation-level claim would require a branch that is both Noether-stationary and topologically locked; dissociation would then require changing the causal-locus sector, i.e., a reconnection or fold transit of the retained causal locus.

**Causal-locus sector as a comparison invariant:** The soliton comparison teaches a useful restraint: a sector label does not by itself select a representative inside that sector. For this chapter the native data are the homology classes of closed causal-locus components together with lifted-strip intersection degrees. Write
$$
Q_{\mathrm{causal}}(\gamma)
=
\left(
\{[(\mathcal{L}_{\text{causal}})_a]\}_{a\in C_{\mathrm{closed}}},
\{\iota_b\}_{b\in C_{\mathrm{strip}}}
\right)
$$
the multiset of closed-component winding classes and retained lifted-strip fiber-intersection degrees, optionally refined by source identity and chirality sign. The comparison rule is:
$$
Q_{\mathrm{causal}}(\gamma_0)=Q_{\mathrm{causal}}(\gamma_1)
$$
means the two trajectories lie in the same branch-topology sector; it does not imply equal action, equal mass response, or stability. A stability claim additionally needs either a constrained critical-point test for
$$
\bar{\mathcal{A}}_{\text{total}}
$$
or a return-map spectrum for the actual delayed dynamics.
This sector label lives on the **time-domain** chart: the torus or lifted strip whose coordinates are $(t,t')$ and whose intersections feed the self-hit and partner-hit ledgers $(N_s,M_p)$ and their signed refinements. Spatial knot, link, writhe, and framed self-linking data live on a different object: the spatial projection of the worldline or worldline bundle in $\Sigma_t$ over a declared period or history window. The two data sets may be correlated on a certified branch, but the chapter does not identify them. In particular, $Q_{\mathrm{causal}}$ is the root-ledger sector label, while framed chirality is a separate spatial-domain calculation.

**Instanton-style path competition:** When two branch-topology sectors are connected only by passing through a transversality failure, the useful comparison object is not a new force law but a minimal regularized barrier in path space. For a one-parameter path of histories
$$
\Gamma:[0,1]\to \mathcal{H}_h,
\qquad
\Gamma(0)=\gamma_0,
\qquad
\Gamma(1)=\gamma_1
$$
define the barrier proxy
$$
B_{\eta,h}(\gamma_0\to\gamma_1)
\equiv
\inf_{\Gamma}
\max_{s\in[0,1]}
\bar{\mathcal{A}}_{\text{total},\eta,h}[\Gamma(s)]
$$
The infimum is taken over paths whose endpoints lie in the declared sectors and whose intermediate histories obey the same regularization convention. This is an instanton-like comparison only in the variational sense: it measures the least regularized action-counting barrier between sectors. It does not assert tunneling, supersymmetry, or Euclidean field-theory ontology.
For this expression to be more than formal, take $\mathcal{H}_h$ to be a declared history space such as $C^2([-h,0];\mathbb{R}^{3N})$ with the $C^2$ norm, or a Sobolev closure strong enough to preserve the delayed root map. Under the finite-$\eta$ bounds above, $\bar{\mathcal{A}}_{\text{total},\eta,h}$ is continuous on an admissible chart. The physical mountain-pass hypothesis is then that different causal-locus sectors are separated by a transversality wall where $J_\gamma$ or $\|\nabla F_\gamma\|$ loses its floor. Across such a caustic wall the unregularized barrier is expected to diverge, while $B_{\eta,h}$ records the regulator-controlled cost of crossing the wall. This is the action-counting version of topological protection, not an additional force law.
More precisely, the pass is a crossing of a fold stratum such as
$$
\Sigma_{ij}
=
\{F_{ij}=0,\ \partial_{t'}F_{ij}=0\}
$$
or its full coarea-degenerate analogue $\{F=0,\nabla F=0\}$ on the retained chart. The barrier height is therefore the regularized saddle height of $\bar{\mathcal A}$ over the codimension-one branch wall. The same reading connects this chapter to the assembly-gap program: a positive sector gap requires a lower bound on the fold-crossing barrier that survives the declared $\eta\to0^+$ refinement.

**Multi-component topology:** For assemblies, project the spatial trajectories over one period, classify the resulting link, and when hyperbolic, use the volume of the link complement as a comparison measure. Brunnian or highly knotted complements are evidence for strong causal interlocking; higher action density remains a dynamical/statistical claim to be measured with the same kernel.

## Theorem Spine (Provable Core under A1-A5)

In this section we also assume standard approximate-identity properties:
$\phi_\eta\ge0$, $\int_{\mathbb{R}}\phi_\eta(s)\,ds=1$, $\|\phi_\eta\|_\infty<\infty$ for fixed $\eta>0$, and $\phi_\eta\to\delta$ weakly as $\eta\to0^+$. Compact support or sufficient decay may be used; the estimates below require boundedness on the sampled domain.

### Assumptions Checklist (Use Before Citing a Theorem)

| Claim | A1 | A2 | A3 | A3b | A4 | A5 |
| --- | --- | --- | --- | --- | --- | --- |
| Theorem 1 (finiteness/nonnegativity) | required | required | required | required | not required | not required |
| Theorem 2 (coarea limit) | required | required | required | required | required | not required |
| Corollary 2.1 (integer labels) | required | required | required | not required | required | required |
| Theorem 3 (bifurcation criterion) | required | required | required | not required | required (except at critical value) | required |
| Theorem 4 (two-sided bounds) | required | required | required | required | not required | not required |

### Theorem 1 (Well-defined finite regularized action)
Under (A1)-(A3b), $\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]$ is finite and nonnegative.

**Proof.** Write
$$
\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2 J_\gamma(t,t')}\,dt\,dt'
$$
The integrand is nonnegative because $\phi_\eta\ge0$, $r^{-2}>0$, and $J_\gamma^{-1}>0$, so $\bar{\mathcal{A}}_{\text{self},\eta}\ge0$.
By (A3) and (A3b), on the support of $\phi_\eta(F_\gamma)$ we have $r\ge r_{\min}>0$ and $J_\gamma\ge J_{\min}>0$, hence
$r^{-2}J_\gamma^{-1}\le r_{\min}^{-2}J_{\min}^{-1}$. Therefore
$$
0\le \bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{1}{T^2}\,r_{\min}^{-2}J_{\min}^{-1}\,\|\phi_\eta\|_\infty\,|[0,T]^2|
=
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}<\infty
$$
So the functional is finite and nonnegative.

### Theorem 2 (Coarea reduction to causal locus)
Under (A1)-(A4), the $\eta\to0^+$ limit of
$\bar{\mathcal{A}}_{\text{self},\eta}$ is the weighted 1D measure of the causal locus:
$$
\lim_{\eta\to0^+}\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}
\int_{\mathcal{L}_{\text{causal}}}
\frac{1}{r(t,t')^2\,J_\gamma(t,t')\,\|\nabla F_\gamma(t,t')\|}\,d\ell
$$
where $\mathcal{L}_{\text{causal}}=\{(t,t')\in T^2: F_\gamma(t,t')=0\}$.

**Proof.** Apply the coarea formula on $[0,T]^2$ with level function $F_\gamma$:
$$
\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
=
\int_{\mathbb{R}}\phi_\eta(s)\,
H(s)\,ds
$$
with
$$
H(s)\equiv
\int_{F_\gamma^{-1}(s)}
\frac{1}{r^2\,J_\gamma\,\|\nabla F_\gamma\|}\,d\ell
$$
By (A4), $\|\nabla F_\gamma\|\ge\nu>0$ on a tubular neighborhood of the retained zero level, so nearby level sets are regular 1-manifolds and $H(s)$ is continuous near $s=0$. By (A3) and (A3b), both $r^{-2}$ and $J_\gamma^{-1}$ are bounded on the active support, and the diagonal collar prevents accumulation on the excluded trivial branch. Hence $H(s)$ is locally bounded. Since $\phi_\eta$ is an approximate identity, $\int \phi_\eta(s)H(s)\,ds\to H(0)$ as $\eta\to0^+$. Dividing by $T^2$ yields the claimed limit.
The compact-chart length bound in (A4) is the technical step behind this local boundedness: it prevents nearby regular level sets from acquiring unbounded total length while the zero level itself remains regular.

### Corollary 2.1 (Discrete branch labels)
Closed connected components of $\mathcal{L}_{\text{causal}}$ carry winding numbers $(p,q)\in\mathbb{Z}^2$ on the unpunctured torus. Components retained on the lifted strip carry algebraic fiber-intersection degrees $\iota_a$ with generic vertical fibers. These labels are unchanged under smooth deformations that preserve (A4), keep the same diagonal-collar and memory-window convention, and remain inside one homotopy class (A5).

**Proof.** Under (A4), each retained component of the level set $F_\gamma=0$ is a smooth embedded 1-manifold in the chosen chart. If it closes on the unpunctured torus, it defines a homology class in $H_1(T^2,\mathbb{Z})\cong\mathbb{Z}^2$, whose coordinates are the winding numbers $(p,q)$. If the diagonal collar or finite-memory boundary cuts the component, the component need not define a closed torus class, but its algebraic intersection number with a generic vertical fiber is well-defined as long as the component remains transverse to that fiber and endpoints do not cross the declared boundary. Under a smooth deformation preserving regularity, boundary convention, and homotopy class, these data evolve by isotopy, so the winding classes and fiber-intersection degrees are unchanged.

### Theorem 3 (Bifurcation criterion for quantized branch changes)
For a smooth one-parameter family $\gamma_\lambda$ (equivalently $F_\lambda$), component count and winding labels can change only at parameter values $\lambda_*$ where transversality fails:
$$
F_{\lambda_*}(t,t')=0,\qquad \nabla F_{\lambda_*}(t,t')=0
$$
for some $(t,t')\in T^2$.

**Proof.** Fix $\lambda_0$ such that $F_{\lambda_0}^{-1}(0)$ is regular (A4). By the implicit function theorem, near every point of $F_{\lambda_0}^{-1}(0)$ the zero set is a smooth curve varying smoothly with $\lambda$. Compactness of $T^2$ gives a finite cover, so the full causal locus varies by isotopy for $\lambda$ in a neighborhood of $\lambda_0$. Isotopy preserves component count and homology labels. Therefore these quantities are locally constant on regular parameter intervals. Any change between two regular intervals must pass through a non-regular parameter where $\nabla F=0$ at a zero-level point.

### Theorem 4 (Two-sided bounds useful for validation)
Under (A1)-(A3b), for any fixed $\eta>0$:
$$
0\le
\bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}
$$
If additionally $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then
$$
\bar{\mathcal{A}}_{\text{self},\eta}
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}
\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'
$$

**Proof.** The upper bound is exactly the estimate used in Theorem 1. For the lower bound, if $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then $r^{-2}\ge r_{\max}^{-2}$ and $J_\gamma^{-1}\ge J_{\max}^{-1}$ on support, hence
$$
\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'
$$

**Meaning:** numerical pipelines can assert hard pass/fail envelopes before any
physical interpretation is attempted.

## Analytic Benchmarks (Circular Orbit)
For a circular orbit of radius $R$ and speed $v=\beta c_f$:
$$
2R\left|\sin\left(\frac{\omega\Delta}{2}\right)\right| = c_f\Delta,
\quad \text{with } \omega=\frac{v}{R}
$$
Define $\xi=\frac{\omega\Delta}{2}$, giving the root condition:
$$
\sin\xi = \frac{\xi}{\beta}
$$

The nontrivial self-hit threshold is
$$
\beta^\star = 1
$$
For $\beta \le 1$, the only solution is the trivial coincidence $\xi=0$, so the circular self-action vanishes. For $\beta>1$, each admissible root $\xi_n$ determines a concrete branch datum:
$$
\Delta_n = \frac{2\xi_n}{\omega},
\qquad
r_n = c_f\Delta_n = \frac{2R\xi_n}{\beta},
\qquad
J_n = 1-\beta\cos\xi_n = 1-\xi_n\cot\xi_n
$$
The derivative of the root function is
$$
g_\beta'(\xi_n)=\cos\xi_n-\frac{1}{\beta}
=
\cos\xi_n-\frac{\sin\xi_n}{\xi_n}
$$
which is the additional coarea factor controlling branch weight when the two-time integral is collapsed onto the circular causal locus.

Near threshold, write $\beta=1+\mu$ with $\mu>0$ small. The principal root then satisfies
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
r_0 \sim 2R\sqrt{6\mu},
\qquad
J_0 \sim 2\mu,
\qquad
g_\beta'(\xi_0)\sim -2\mu
$$
Hence the principal branch contribution to the circular action density scales like
$$
\frac{1}{r_0^2\,|J_0|\,|g_\beta'(\xi_0)|}
\sim
\frac{1}{96R^2\,\mu^3}
$$
Here $J_n$ is the dimensionless Master Equation received-flux Jacobian, while $|g_\beta'(\xi_n)|$ is the root-density/coarea factor from reducing the circular causal locus to discrete roots. They are distinct geometric factors, not a double count, and both scale as $\mu$ on the principal near-threshold branch. The denominator arithmetic is $r_0^2|J_0||g_\beta'|\sim(24R^2\mu)(4\mu^2)=96R^2\mu^3$. This is the action-functional expression of the same circular caustic seen in the force law: the onset of self-hit is already singular once the Jacobian and coarea reduction are both kept.

At high speed, all admissible roots lie in $(0,\beta)$, so the branch count grows only linearly with $\beta$. The circular toy therefore gives a controlled benchmark: discrete branch creation, explicit near-threshold asymptotics, and a root-by-root action density that can be compared directly to numerical orbit scans.

## Circular Benchmark as a Branch-Count Theorem

Define
$$
g_\beta(\xi)=\sin\xi-\frac{\xi}{\beta}
$$
Admissible circular self-hit branches are zeros of $g_\beta$ in $(0,\beta)$.

### Proposition 5.1 (Discrete Root Count and Branch-Change Criterion)
Fix a compact admissible interval $I_{\text{branch}}=[a,b]\subset(0,\beta)$ with boundary regularity $g_\beta(a)\neq0$, $g_\beta(b)\neq0$.

1. For fixed $\beta>0$, the admissible root set
   $\{\xi\in I_{\text{branch}}:g_\beta(\xi)=0\}$ is finite.
2. In a smooth one-parameter scan $\beta=\beta(\lambda)$, the root count in
   $I_{\text{branch}}$ is locally constant except when
$$
g_\beta(\xi)=0,\qquad \partial_\xi g_\beta(\xi)=0
$$
at some interior point $\xi\in(a,b)$.

**Proof.** For fixed $\beta$, $g_\beta$ is real-analytic on $(0,\beta)$, hence zeros are isolated unless the function is identically zero on an interval. That cannot occur here because $g_\beta$ is not identically zero. A discrete subset of a compact interval is finite, proving (1).

For (2), if $\xi_*$ is a simple root ($\partial_\xi g_\beta(\xi_*)\neq0$), the implicit function theorem gives a unique smooth continuation of that root under small parameter changes, so simple roots cannot be created or destroyed locally. Root-count change can therefore occur only when simplicity fails, i.e. when $g_\beta=0$ and $\partial_\xi g_\beta=0$ simultaneously (multiple/tangent root). Boundary-root events are excluded by the boundary-regularity condition.

For the principal circular branch, the bifurcation point occurs at $(\beta,\xi)=(1,0)$ in the limiting sense. Higher branches appear at interior tangencies where both equations hold with $\xi>0$. This is the 1D analog of Theorem 3 and provides an explicit, checkable bifurcation condition for the circular toy model.

At an interior tangency the two equations imply the familiar branch condition $\tan\xi=\xi$ on the eligible signed sheet, together with the corresponding positive-$\beta$ sign constraint inherited from the root equation. This gives a reachable bridge to assembly topological charge: for a layer with winding or return degree $k_a$, the number and sign of circular self-hit births below the layer speed ratio can be computed by counting eligible tangency roots before that speed threshold. Because signed sheets and the absolute-value convention in the circular distance decide which intervals contribute, this chapter treats the resulting parity or lower-bound law
$$
D_s^{(a)}\equiv f(k_a)\pmod 2
$$
as a theorem target rather than as a proved formula. The useful point is narrower and established here: the tangency sequence supplies the concrete input from which such a layerwise self-hit degree constraint must be derived.

## Dynamical Interpretation
- Candidate stable periodic orbits should first appear as **critical points** of $\bar{\mathcal{A}}_{\text{total}}$ constrained within a winding class. The delay flow need not be a gradient flow of this functional, so extremality is a branch-selection test, not a proof of asymptotic stability.
- **Existence vs. stability:** Topology of $\mathcal{L}_{\text{causal}}$ constrains which families can exist by identifying bifurcations where branches reconnect. Linear spectra of the delay equation decide which of those families persist or attract. The causal locus gives the branch skeleton; Lyapunov exponents and return-map spectra test dynamical survival.
- **Discreteness:** Each winding class gives an integer self-hit count; moving between classes requires a reconnection event. This supplies a candidate mechanism for mass gaps and generation-like families, but the actual mass map still requires shielding, partner terms, and Noether sea response.
- **Conservation with memory:** In the symmetry-preserving delayed action, time-translation and rotational symmetry imply conserved total energy and total angular momentum as history functionals. In regularized working models, these same quantities become validation diagnostics. Energy includes the history contribution stored in active causal wakes.
- **Gradient vs. symplectic:** The master equation is conservative; critical points of $\bar{\mathcal{A}}$ should be compared with KAM-style persistence islands, not with dissipative sinks. If a separate Noether sea coupling introduces dissipation, minima could become attractors, but absent that extra channel, stability means orbital persistence rather than asymptotic convergence.

## Emergent Geometry Constraints
Define the coarse‑grained hit density
$$
\mathcal{I}(t,\mathbf{x})=\sum_j\int_{-\infty}^{t}\!\frac{\delta_\eta\!\big(\|\mathbf{x}-\mathbf{x}_j(t')\|-c_f(t-t')\big)}{\|\mathbf{x}-\mathbf{x}_j(t')\|^2\,J_j(t,\mathbf{x};t')}\,dt'
$$
where
$$
J_j(t,\mathbf{x};t')
=
\left|1-\frac{\mathbf{v}_j(t')\cdot\hat{\mathbf{n}}(t,\mathbf{x};t')}{c_f}\right|,
\qquad
\hat{\mathbf{n}}(t,\mathbf{x};t')
=
\frac{\mathbf{x}-\mathbf{x}_j(t')}{\|\mathbf{x}-\mathbf{x}_j(t')\|}
$$
This scalar hit density is an effective coarse-grained summary of causal-wake intersections, not a substrate metric and not by itself the observer-level effective metric. At most, it supplies one provisional scalar channel feeding the ADM/Cartan effective-metric handoff. A restricted isotropic subcase may be written as
$$
g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu = -N^2(\mathcal{I})\,c_\star^2 dt^2 + \Omega_s^2(\mathcal{I})\,h_{ij}dx^i dx^j
$$
with small couplings $N=1+\lambda_t\mathcal{I}$ and $\Omega_s=1+\lambda_s\mathcal{I}$ in the weak-field regime. Here $c_\star$ must be declared: primitive branch charts may set $c_\star=c_f$, while observer-level metric comparisons normally use the dressed asymptotic channel speed. The full geometry program must also include the Noether sea lapse, shift/medium velocity, spatial metric response, stress, and PPN decision variables used by the spacetime chapters. Bianchi identities and weak-equivalence demands constrain the admissible scalar subcase; otherwise the emergent geometry reduces to a scalar-tensor approximation with potentially observable fifth forces. Matching the long-range limit of test-assembly motion to geodesics in $g^{\text{eff}}_{\mu\nu}$ is the consistency check linking microscopic causal hits to macroscopic effective curvature.
Here, "fifth force" means an additional long-range interaction mediated by the scalar sector encoded in $\mathcal{I}$, on top of the shared effective-metric response. If that scalar coupling is not sufficiently constrained, test assemblies can acquire composition-dependent accelerations, producing weak-equivalence-principle violations and post-Newtonian deviations that are tightly bounded experimentally.
Numerical check: evolve two assemblies with different internal $\bar{\mathcal{A}}_{\text{total}}$ through the same prescribed $\mathcal{I}(t,\mathbf{x})$ background and verify their centers follow the same geodesic to numerical tolerance.
Mean-field view: in a dilute limit with many architrinos, the closure target is not an ordinary instantaneous Vlasov equation but a delayed kinetic equation,
$$
\partial_t f
+
\mathbf{v}\cdot\nabla_{\mathbf{x}}f
+
\mathbf{F}_{\mathcal I_{\mathrm{hist}}}(t,\mathbf{x},\mathbf{v})\cdot\nabla_{\mathbf{v}}f
=0
$$
where $\mathcal I_{\mathrm{hist}}$ is built from the past distribution along causal isochrons. That derivation would provide the statistical bridge from causal-wake microdynamics to continuum geometry. The transport coefficients used in [Effective Lagrangian](effective-lagrangian.md#native-continuum-action-closure-target) should be read as moment closures of this same Vlasov-delay system, not as independent continuum parameters.

## Implementation Notes (Appendix)
- Use the same $\delta_\eta$ and $\eta$ for force and action estimators.
- For periodic orbits, normalize by $T^2$ and enforce periodic boundary conditions.
- For circular‑orbit calibration, compute $\xi_n$ roots numerically and sum with the Jacobian factor.
- Handle the $\beta=1$ onset caustic with care; the unregularized circular action is singular there once both Jacobian and coarea factors are retained.
- Keep $\eta>0$ during variation: $\nabla\delta$ terms appear in $\delta\mathcal{A}$; regularization makes the Euler–Lagrange equations well‑posed. Take $\eta\to0$ only after solving or bounding solutions.

## Simulation Protocol (Minimal Theorem-Backed Checks)

For each simulated orbit family:

1. Verify (A1)-(A4) numerically (regularity, no-support collisions, transversality).
2. Compute $\bar{\mathcal{A}}_{\text{self},\eta}$ at multiple $\eta$ and confirm boundedness
   by Theorem 4.
3. Extract $\mathcal{L}_{\text{causal}}$, its closed-component winding labels $(p,q)$ where available, and its lifted-strip fiber-intersection degrees $\iota_a$.
4. Scan one control parameter (e.g., $\beta$ or radius ratio) and confirm labels change
   only at detected transversality failures.
5. In the circular benchmark, verify Proposition 5.1 double-root condition at branch
   transitions.

## Limitations and Caveats
- **Rest mass is not just self-action:** $\mathcal{A}_{\text{self}}$ needs careful units; observer-level rest energy also depends on partner interactions, shielding, Noether sea coupling, and the medium-response tensor.
- **Minima ≠ stability without dynamics:** Stability depends on the full DDE flow; the functional must be windowed/normalized (e.g., one period) to avoid divergences and to compare orbits meaningfully.
- **Topology needs precision:** Time is monotone; periodic motion yields a spatially closed path but a helical curve in absolute timespace. Be explicit about which projection or linking notion defines the "topological class."
- **Cohomology language is aspirational:** A cochain complex over the moduli of periodic orbits is not yet constructed; treat “cohomology of causal interaction” as a research direction, not a result.

## Closure Extension: Spin Bundle and Confinement Energy Law

Two downstream theorem targets can be stated on top of the existing causal-locus spine. They are not used by the theorems above; they mark what would have to be proven before spin and confinement language becomes native rather than comparative.

### (T5.1) Spinor lift target

Construct a framed configuration bundle for nested shell braid ordered axes and prove that the relevant internal-orientation transport lifts through
$$
\widetilde{R}:SU(2)\simeq\mathrm{Spin}(3)\to SO(3)
$$
so the internal phase distinguishes 2$\pi$ and 4$\pi$ loops.

### (T5.2) Open-vs-closed braid energy target

Define an effective color-braid energy law:
$$
E_{\mathrm{open}}(L)=\sigma_{\mathrm{eff}}L+E_0+\mathcal{O}(1/L),\qquad \sigma_{\mathrm{eff}}>0
$$
$$
E_{\mathrm{closed}}(L)\to E_{\infty}<\infty\quad (L\to\infty)
$$
Combined with causal-locus class constraints, this would give a quantitative separation between confined open sectors and screened singlet sectors after the color-braid and singlet-sector proof is supplied. Until that proof is supplied, the equations are an effective closure target rather than a result of this chapter.
In the action-counting language above, the same target can be stated as a barrier lower bound: the sector gap is positive only if the fold-crossing proxy $B_{\eta,h}$ between the open and closed branch classes remains bounded below under the declared regulator refinement. If that barrier collapses to zero as $\eta\to0^+$, the causal-locus sector has no action-counting protection even if its symbolic label is different.

### Integration map

- causal-locus topology and bifurcation class invariants: **this chapter**
- color-algebra and singlet braid structure: [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md)
- gauge-covariant effective layer and failure criteria: [assemblies/gauge-symmetries.md](../assemblies/gauge-symmetries.md)

## Reduced Branch-Certificate Targets

The theorem spine proves that the scalar statistic is finite, has a coarea limit, and carries branch labels that remain invariant under the stated deformations. The next question is stronger: whether a retained branch chart also behaves like a conservative reduced action system. The following residuals are therefore validation targets, not additional theorems of this chapter.

**Branch return-map symplectic residual.** The scalar statistic can identify candidate stationary branch classes, but a stationary value of $\bar{\mathcal{A}}$ is not yet a Hamiltonian closure claim. On a retained branch chart $\mathfrak{B}$ with reduced section coordinates $z=(Q^a,\Pi_a)$, let
$$
\mathcal{P}_{\mathfrak{B}}:z_n\mapsto z_{n+1}
$$
be the one-cycle return map and let
$$
M_{\mathfrak{B}}(z)=D\mathcal{P}_{\mathfrak{B}}(z)
$$
be its linearized monodromy. If the reduced chart is genuinely inherited from a symmetry-preserving delayed action, then after the retained constraints and section condition are solved there must be a pulled-back symplectic form $\Omega_{\mathfrak{B}}$ for which
$$
\mathcal{R}_{\Omega}(\mathfrak{B})
\equiv
\sup_{z\in U}
\left\|
M_{\mathfrak{B}}(z)^T
\Omega_{\mathfrak{B}}(z)
M_{\mathfrak{B}}(z)
-
\Omega_{\mathfrak{B}}(\mathcal{P}_{\mathfrak{B}}(z))
\right\|
$$
is small on the tested neighborhood $U$ of the branch. The companion phase-volume residual
$$
\mathcal{R}_{\mathrm{vol}}(\mathfrak{B})
\equiv
\sup_{z\in U}
\left|
\det M_{\mathfrak{B}}(z)-1
\right|
$$
is weaker but easier to compute. The closure direction is therefore:
$$
\nabla_{\gamma}\bar{\mathcal{A}}=0
\quad\text{within a winding class}
\qquad
\mathcal{R}_{\Omega}(\mathfrak{B})\le\epsilon_{\Omega}
\qquad
\lambda_{\mathrm{sec}}>0
$$
The first condition marks a candidate branch class, the second tests whether the retained return map has the canonical structure expected of an action-derived conservative reduction, and the third checks local section persistence. A failure of $\mathcal{R}_{\Omega}$ does not falsify the Master EOM; it says that the scalar action-counting extremum has not yet been promoted to a reduced Hamiltonian branch certificate.

This is the same branch-symplectic-promotion certificate used by the effective-Hamiltonian domain gate and by binary return-map packets. Because the underlying law is delayed, $\Omega_{\mathfrak B}$ is not assumed to be the naive instantaneous form. The tested two-form must include the retained memory correction,
$$
\Omega_{\mathfrak B}
=
\Omega_0+\Omega_{\mathrm{mem}}
$$
pulled back to the reduced section after the active causal-root rows and history-window boundary convention have been solved. A branch passes the promotion test only when the one-cycle return replays the memory segment congruently enough that this corrected form, not merely the instantaneous phase volume, is preserved to tolerance.

**Hamilton-Jacobi branch phase target.** If a retained branch chart passes the action-derived return-map tests, one can ask for a Hamilton-Jacobi description of the same reduced motion. This is only a comparison target until the delayed action residual closes. Let $H_{\mathfrak{B}}(Q,\Pi,t)$ be the reduced Hamiltonian on the certified chart. A branch principal function $W_{\mathfrak{B}}(Q,t)$ should satisfy
$$
\mathcal{R}_{\mathrm{HJ}}(Q,t)
\equiv
\partial_t W_{\mathfrak{B}}(Q,t)
+
H_{\mathfrak{B}}\!\left(Q,\partial_Q W_{\mathfrak{B}}(Q,t),t\right)
$$
with $\mathcal{R}_{\mathrm{HJ}}\to0$ on the retained window. The associated momentum reconstruction is
$$
\Pi_a=\partial_{Q^a}W_{\mathfrak{B}}
$$
and the first-order branch motion is
$$
\dot Q^a
=
\left.
\frac{\partial H_{\mathfrak{B}}}{\partial \Pi_a}
\right|_{\Pi=\partial_Q W_{\mathfrak{B}}}
$$
For a time-independent reduced chart, the separated form
$$
W_{\mathfrak{B}}(Q,t)=W_{\mathfrak{B}}^{0}(Q)-E_{\mathfrak{B}}t
$$
turns the energy label $E_{\mathfrak{B}}$ into a branch-family parameter. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this would not replace the causal-root ledger; it would be a compact phase-function certificate that the retained ledger, wake-history charge, and reduced canonical coordinates are mutually consistent.

## Summary and Status

- The chapter defines causal self-hit and total action-counting statistics from the Jacobian-weighted inverse-square delayed kernel, plus normalized forms for periodic orbits.
- The causal locus $\mathcal{L}_{\text{causal}}\subset T^2$ supplies discrete branch labels such as winding class, writhe candidate, and link type; those labels segment orbit families but do not by themselves prove stability or mass.
- The circular-orbit benchmark gives an analytic threshold at $\beta=1$, explicit branchwise Jacobians, and controlled near-threshold asymptotics, anchoring numerical calibrations.
- Under explicit assumptions (A1-A5), the theorem spine establishes finiteness, coarea reduction, topological invariance away from critical points, and a bifurcation condition for branch changes.
- The emergent-metric ansatz from coarse-grained hit density $\mathcal{I}$ remains conjectural until weak-field, equivalence, and PPN constraints are met.
- Overall, the causal-locus action-counting route is theorem-level in the regularized regime, while mass mapping, asymptotic stability, branch Hamiltonian certification, and emergent metric closure remain open.
