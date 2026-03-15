# Causal Action Functional

This chapter develops the variational complement to the master-equation treatment of dynamics. Its job is to define a causal action functional that can compare delayed worldline structures, separate stable from unstable assembly classes, and turn emergent mass claims into a geometric quantity that can be evaluated, bounded, and tested.

The current scope is mixed. Some statements are theorem-backed in the regularized setting, while the larger closure program remains open. The chapter therefore begins with the problem statement and core functional definitions, then separates the controlled theorem spine from benchmarks, implementation notes, and longer-range closure targets.

## Problem Statement and Goal
The objective is to explain why only certain assemblies are stable and discrete, and to interpret emergent “mass” as a consequence of causal interaction structure: intrinsic self‑action of each worldline plus coupling to the ambient tri-binary sea (effective spacetime), rather than an externally assigned input. The target is a geometric/variational functional derived from the causal‑wake kernel that can be evaluated on periodic orbits, compared across topological classes, and tested against dynamical stability.
Canonical dynamics are defined in [The Master Equation (Canonical Form)](master-equation.md#the-master-equation-canonical-form); this chapter provides the complementary action-functional lens.

## Core Functional Definitions
**Self‑action functional:**
$$
\mathcal{A}_{\text{self}}[\gamma] = \iint_{\gamma \times \gamma}
\frac{\delta\!\big(\|\mathbf{x}(t)-\mathbf{x}(t')\| - c_f|t-t'|\big)}
{\|\mathbf{x}(t)-\mathbf{x}(t')\|^2\,J_\gamma(t,t')}\,dt\,dt'
$$
We introduce a functional to replace ad‑hoc stability searches with a single quantity that can be compared across trajectories. The goal is to identify which worldlines are dynamically preferred and to connect that preference to discrete, reproducible particle‑like states.

This integrates over all pairs of points on a single worldline and counts only those pairs that are causally connected by a wake moving at speed $c_f$. The inverse-square factor weights nearby self‑hits more strongly than distant ones, while $J_\gamma^{-1}$ accounts for the geometric bunching or dilation of the delayed flux along the active branch.
Convention: this document uses the symmetric selector $|t-t'|$ in action integrals; the equivalent delayed form uses $(t-t')$ with an explicit $\Theta(t-t')$.
Here $J_\gamma(t,t')$ denotes the absolute delay-map Jacobian induced by the causal constraint, namely $J_\gamma(t,t')=\left|\partial_{t'}\big(\|\mathbf{x}(t)-\mathbf{x}(t')\|-c_f|t-t'|\big)\right|$.

**Interpretation:**
1. **Object:** The full worldline $\gamma$ is treated as a single geometric object.
2. **Constraint:** The delta function enforces the light‑cone condition, selecting causally connected pairs.
3. **Measure:** The inverse-square weight emphasizes close self‑hits over distant ones, while the Jacobian factor converts constant source emission into the correct received causal flux.

**Normalized (periodic) self‑action:**
$$
\bar{\mathcal{A}}_{\text{self}}[\gamma] =
\frac{1}{T^2}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r(t,t')-c_f|t-t'|\big)}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'
$$
with $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$ and $\delta_\eta$ a mollified delta.
This version is defined for periodic orbits. The $T^2$ normalization makes values comparable across different periods, while $\delta_\eta$ regularizes the causal constraint for numerical evaluation.
Dimensional check: $[\bar{\mathcal{A}}_{\text{self}}]=1/\text{Length}^2$ (inverse area), consistent with a surface‑density measure over causal intersections.

**Total action (multi‑assembly):**
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
This aggregates self‑terms and cross‑terms between components, with the $\frac{1}{2}\sum_{i\ne j}$ convention ensuring unordered pairs are counted once.

**Definitions:** $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $r_{ij}(t,t')=\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|$, $\Delta t = t-t'$, and $J_{ij}(t,t')=\left|\partial_{t'}\big(r_{ij}(t,t')-c_f|t-t'|\big)\right|$ is the branch Jacobian induced by the delayed causal constraint.

**Kernel comparison:**
$$
\text{Force kernel: } \left[ \frac{\hat{\mathbf{r}}(t,t')}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
\qquad
\text{Action kernel: } \left[ \frac{1}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
$$
The force kernel retains direction via $\hat{\mathbf{r}}$, while the action kernel keeps only the scalar magnitude. This is the minimal change that turns a vector interaction into a scalar functional suitable for variational comparisons while preserving the same causal Jacobian geometry as the master equation.

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
r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|.
$$

For a $T$-periodic $C^2$ trajectory $\mathbf{x}(t)$ with no collisions on the sampled
domain ($r(t,t')\ge r_{\min}>0$ and $J_\gamma(t,t')\ge J_{\min}>0$ on support of $\phi_\eta$), define
$$
\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]
=\frac{1}{T^2}\int_0^T\!\!\int_0^T
\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'.
$$

This is the primary object for proofs and numerics. The unregularized
$\eta\to0^+$ limit is treated only after bounds are established.

## Axioms and Admissibility Assumptions

We use the following minimal assumption set for theorem-level statements:

- **(A1) Regularity:** $\mathbf{x}\in C^2(\mathbb{R};\mathbb{R}^3)$ and is $T$-periodic.
- **(A2) Finite-speed causality:** The causal selector is $F_\gamma(t,t')=0$ with field speed $c_f>0$.
- **(A3) Collision exclusion on support:** $r(t,t')\ge r_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A3b) Jacobian nondegeneracy on support:** $J_\gamma(t,t')\ge J_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A4) Transversality (generic branch):** $\nabla F_\gamma\neq0$ along the selected causal set.
- **(A5) Fixed topological class:** Deformations are taken inside one homotopy class on $T^2$ unless a bifurcation condition is crossed.
- **(A6) Isolated system bookkeeping:** When connecting to dynamics, energy/momentum use the same $\eta$ and history window conventions as the master-equation diagnostics.

These assumptions are deliberately local and testable. If any assumption fails, the
corresponding theorem is not claimed.

## Rationale for the Functional
- **Natural Lyapunov/action‑like candidate:** If certain motion classes monotonically reduce a single functional, that quantity can label attractors and discrete minima that look like “mass levels” or particle configurations.
- **Bridge to geometric analysis / knot theory:** Showing that simple periodic motions (e.g., maximum‑curvature self‑hit orbits) locally minimize $\mathcal{A}_{\text{self}}$ within a topological class would give a clean geometric explanation for why some orbits are preferred over nearby perturbations.
- **Simulation‑friendly statistic:** Given any numerically computed orbit, we can Monte‑Carlo sample $(t,t')$, test the causal condition, and estimate $\mathcal{A}_{\text{self}}[\gamma]$ to compare shapes. This makes the “stable = local minimum” heuristic empirically testable.
- **Kolmogorov‑style appeal:** The functional is built directly from the microscopic law, convertible to empirical statistics, and a candidate for invariant measures that could explain attractor selection.

## Geometric/Topological Framework
**Causal locus on the torus:** For a periodic orbit the domain $(t,t')\in[0,T]^2$ is a torus. The causal locus
$$
\mathcal{L}_{\text{causal}} = \{(t,t')\in T^2 \mid \|\mathbf{x}(t)-\mathbf{x}(t')\| = c_f|t-t'|\}
$$
is the set of self‑hits. Its winding numbers $(p,q)$ on $T^2$ are **discrete labels** for orbit families. As $R$ or $v$ change, the locus undergoes reconnection events; these are the bifurcations where families appear or disappear, giving a natural quantization of admissible self‑hit patterns. Sub‑$c_f$ motion leaves $\mathcal{L}_{\text{causal}}$ empty; super‑$c_f$ creates branches whose closure determines the integer self‑hit count per period.
The self‑action integral is the **weighted arc length** of $\mathcal{L}_{\text{causal}}$ with weight $1/(r^2 J_\gamma)$, so topology and metric weight enter together.

**Causal writhe (chirality):**
$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}} \text{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}\big)\,d\tau
$$
is a signed measure of handedness for the self‑interaction pattern. Nonzero $Wr_c$ ties intrinsic chirality/spin to the geometry of the wake rather than an imposed quantum number; changing $Wr_c$ requires tearing the causal locus.

**Topological vs Noether data:** Continuous symmetries (time shifts, rotations) give Noether charges (energy, angular momentum). The winding class of $\mathcal{L}_{\text{causal}}$ supplies **topological charges**. Stable “generations” live where a Noether‑stationary orbit is also topologically locked; decay would require changing the winding class, i.e., a reconnection of $\mathcal{L}_{\text{causal}}$.

**Multi‑component topology:** For assemblies, project the spatial trajectories over one period, classify the resulting link, and when hyperbolic, use the volume of the link complement as a complexity measure. Brunnian or highly knotted complements signal strong causal interlocking and higher action density.

## Theorem Spine (Provable Core under A1-A5)

In this section we also assume the standard mollifier properties:
$\phi_\eta\in C_c^\infty(\mathbb{R})$, $\phi_\eta\ge0$, $\int_{\mathbb{R}}\phi_\eta(s)\,ds=1$, and $\phi_\eta\to\delta$ weakly as $\eta\to0^+$.

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
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2 J_\gamma(t,t')}\,dt\,dt'.
$$
The integrand is nonnegative because $\phi_\eta\ge0$, $r^{-2}>0$, and $J_\gamma^{-1}>0$, so $\bar{\mathcal{A}}_{\text{self},\eta}\ge0$.
By (A3) and (A3b), on the support of $\phi_\eta(F_\gamma)$ we have $r\ge r_{\min}>0$ and $J_\gamma\ge J_{\min}>0$, hence
$r^{-2}J_\gamma^{-1}\le r_{\min}^{-2}J_{\min}^{-1}$. Therefore
$$
0\le \bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{1}{T^2}\,r_{\min}^{-2}J_{\min}^{-1}\,\|\phi_\eta\|_\infty\,|[0,T]^2|
=
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}<\infty.
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
\frac{1}{r(t,t')^2\,J_\gamma(t,t')\,\|\nabla F_\gamma(t,t')\|}\,d\ell,
$$
where $\mathcal{L}_{\text{causal}}=\{(t,t')\in T^2: F_\gamma(t,t')=0\}$.

**Proof.** Apply the coarea formula on $[0,T]^2$ with level function $F_\gamma$:
$$
\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
=
\int_{\mathbb{R}}\phi_\eta(s)\,
H(s)\,ds,
$$
with
$$
H(s)\equiv
\int_{F_\gamma^{-1}(s)}
\frac{1}{r^2\,J_\gamma\,\|\nabla F_\gamma\|}\,d\ell.
$$
By (A4), $\|\nabla F_\gamma\|$ is nonzero on $F_\gamma^{-1}(0)$, so in a small tubular neighborhood of the zero level the level sets are regular 1-manifolds and $H(s)$ is continuous near $s=0$. By (A3) and (A3b), both $r^{-2}$ and $J_\gamma^{-1}$ are bounded on the active support, so $H(s)$ is locally bounded. Since $\phi_\eta$ is an approximate identity, $\int \phi_\eta(s)H(s)\,ds\to H(0)$ as $\eta\to0^+$. Dividing by $T^2$ yields the claimed limit.

### Corollary 2.1 (Discrete branch labels)
Connected components of $\mathcal{L}_{\text{causal}}$ carry winding numbers
$(p,q)\in\mathbb{Z}^2$ on $T^2$. These are unchanged under smooth deformations that
preserve (A4) and remain inside one homotopy class (A5).

**Proof.** Under (A4), each connected component of the level set $F_\gamma=0$ is a smooth embedded closed curve on $T^2$, hence defines a homology class in $H_1(T^2,\mathbb{Z})\cong\mathbb{Z}^2$. The coordinates of this class are the winding numbers $(p,q)$. Under a smooth deformation preserving regularity and homotopy class, components evolve by isotopy, so their homology classes are unchanged.

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
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}.
$$
If additionally $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then
$$
\bar{\mathcal{A}}_{\text{self},\eta}
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}
\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'.
$$

**Proof.** The upper bound is exactly the estimate used in Theorem 1. For the lower bound, if $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then $r^{-2}\ge r_{\max}^{-2}$ and $J_\gamma^{-1}\ge J_{\max}^{-1}$ on support, hence
$$
\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'.
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
\beta^\star = 1.
$$
For $\beta \le 1$, the only solution is the trivial coincidence $\xi=0$, so the circular self-action vanishes. For $\beta>1$, each admissible root $\xi_n$ determines a concrete branch datum:
$$
\Delta_n = \frac{2\xi_n}{\omega},
\qquad
r_n = c_f\Delta_n = \frac{2R\xi_n}{\beta},
\qquad
J_n = 1-\beta\cos\xi_n = 1-\xi_n\cot\xi_n.
$$
The derivative of the root function is
$$
g_\beta'(\xi_n)=\cos\xi_n-\frac{1}{\beta}
=
\cos\xi_n-\frac{\sin\xi_n}{\xi_n},
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
g_\beta'(\xi_0)\sim -2\mu.
$$
Hence the principal branch contribution to the circular action density scales like
$$
\frac{1}{r_0^2\,|J_0|\,|g_\beta'(\xi_0)|}
\sim
\frac{1}{96R^2\,\mu^3}.
$$
This is the action-functional expression of the same circular caustic seen in the force law: the onset of self-hit is already singular once the Jacobian and coarea reduction are both kept.

At high speed, all admissible roots lie in $(0,\beta)$, so the branch count grows only linearly with $\beta$. The circular toy therefore gives a controlled benchmark: discrete branch creation, explicit near-threshold asymptotics, and a root-by-root action density that can be compared directly to numerical orbit scans.

## Circular Benchmark as a Branch-Count Theorem

Define
$$
g_\beta(\xi)=\sin\xi-\frac{\xi}{\beta}.
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

## Dynamical Interpretation
- Stable periodic orbits are **critical points** of $\bar{\mathcal{A}}_{\text{total}}$ constrained within a winding class. The delay flow need not be a gradient flow of this functional, so extremality is a selection principle, not a proof of asymptotic stability.
- **Existence vs. stability:** Topology of $\mathcal{L}_{\text{causal}}$ dictates which families can exist (via bifurcations when branches reconnect). Linear spectra of the delay equation decide which of those families attract. The causal locus is the combinatorial skeleton; Lyapunov exponents tell who survives.
- **Discreteness:** Each winding class gives an integer self‑hit count; moving between classes requires a reconnection event, explaining mass gaps and “generations” without adding quantization by hand.
- **Conservation with memory:** Time‑translation and rotational symmetry of the kernel imply conserved total energy and angular momentum, but energy includes the “virial of the history” stored in active causal wakes.
- **Gradient vs. symplectic:** The master equation is conservative; critical points of $\bar{\mathcal{A}}$ correspond to KAM‑style islands, not sinks. If any dissipation couples to the Noether Sea, minima could become attractors, but absent that, stability means orbital persistence, not asymptotic convergence.

## Emergent Geometry Constraints
Define the coarse‑grained hit density
$$
\mathcal{I}(t,\mathbf{x})=\sum_j\int_{-\infty}^{t}\!\frac{\delta_\eta\!\big(\|\mathbf{x}-\mathbf{x}_j(t')\|-c_f(t-t')\big)}{\|\mathbf{x}-\mathbf{x}_j(t')\|^2\,J_j(t,\mathbf{x};t')}\,dt',
$$
where
$$
J_j(t,\mathbf{x};t')
=
\left|1-\frac{\mathbf{v}_j(t')\cdot\hat{\mathbf{n}}(t,\mathbf{x};t')}{c_f}\right|,
\qquad
\hat{\mathbf{n}}(t,\mathbf{x};t')
=
\frac{\mathbf{x}-\mathbf{x}_j(t')}{\|\mathbf{x}-\mathbf{x}_j(t')\|}.
$$
and map it to an effective metric
$$
g_{\mu\nu}dx^\mu dx^\nu = -\alpha^2(\mathcal{I})\,c_f^2 dt^2 + \beta^2(\mathcal{I})\,\delta_{ij}dx^i dx^j,
$$
with small couplings $\alpha=1+\lambda_t\mathcal{I}$, $\beta=1+\lambda_s\mathcal{I}$ in the weak field. Bianchi identities and weak‑equivalence demands constrain the admissible $\lambda_{t,s}$; otherwise the emergent geometry reduces to a scalar‑tensor theory with potentially observable fifth forces. Matching the long‑range limit of test‑assembly motion to geodesics in $g_{\mu\nu}[\mathcal{I}]$ is the consistency check linking microscopic causal hits to macroscopic curvature.
Here, "fifth force" means an additional long-range interaction mediated by the scalar sector encoded in $\mathcal{I}$ (or equivalently in $\alpha,\beta$), on top of the usual spin-2 metric response. If that scalar coupling is not sufficiently constrained, test assemblies can acquire composition-dependent accelerations, producing weak-equivalence-principle violations and post-Newtonian deviations that are tightly bounded experimentally.
Numerical check: evolve two assemblies with different internal $\bar{\mathcal{A}}_{\text{total}}$ through the same prescribed $\mathcal{I}(t,\mathbf{x})$ background and verify their centers follow the same geodesic to numerical tolerance.
Mean‑field view: in a dilute limit with many architrinos, coarse‑graining the hit process should yield a Vlasov equation for $f(t,\mathbf{x},\mathbf{v})$ with force derived from $\mathcal{I}$, providing the statistical bridge to continuum geometry.

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
3. Extract $\mathcal{L}_{\text{causal}}$ and its winding labels $(p,q)$.
4. Scan one control parameter (e.g., $\beta$ or radius ratio) and confirm labels change
   only at detected transversality failures.
5. In the circular benchmark, verify Proposition 5.1 double-root condition at branch
   transitions.

## Limitations and Caveats
- **Rest mass is not just self-action:** $\mathcal{A}_{\text{self}}$ needs careful units; true rest energy also depends on partner interactions, Noether Sea coupling, and external wakes.
- **Minima ≠ stability without dynamics:** Stability depends on the full DDE flow; the functional must be windowed/normalized (e.g., one period) to avoid divergences and to compare orbits meaningfully.
- **Topology needs precision:** Time is monotone; periodic motion yields a spatially closed path but a helical spacetime curve. Be explicit about which projection/linking notion defines the “topological class.”
- **Cohomology language is aspirational:** A cochain complex over the moduli of periodic orbits is not yet constructed; treat “cohomology of causal interaction” as a research direction, not a result.

## Closure Extension: Spin Bundle and Confinement Energy Law

To complete the topological closure program, add two theorem targets on top of the existing causal-locus spine.

### (T5.1) Spinor lift target

Construct a framed configuration bundle for tri-binary ordered axes and prove that physical orientation transport lifts through
$$
\widetilde{R}:SU(2)\simeq\mathrm{Spin}(3)\to SO(3),
$$
so the internal phase distinguishes 2$\pi$ and 4$\pi$ loops.

### (T5.2) Open-vs-closed braid energy target

Define an effective color-braid energy law:
$$
E_{\mathrm{open}}(L)=\sigma_{\mathrm{eff}}L+E_0+\mathcal{O}(1/L),\qquad \sigma_{\mathrm{eff}}>0,
$$
$$
E_{\mathrm{closed}}(L)\to E_{\infty}<\infty\quad (L\to\infty).
$$
Combined with causal-locus class constraints, this gives a quantitative separation between confined open sectors and screened singlet sectors.

### Integration map

- causal-locus topology and bifurcation class invariants: **this chapter**
- color-algebra and singlet braid structure: [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md)
- gauge-covariant effective layer and failure criteria: [dynamics/gauge-symmetries.md](./gauge-symmetries.md)

## Summary and Status
- We defined a causal self-action and total-action functional directly from the Jacobian-weighted inverse-square delayed kernel, plus its normalized form for periodic orbits.
- Topology of the causal locus $\mathcal{L}_{\text{causal}}\subset T^2$ supplies discrete labels (winding, writhe, link type) that naturally segment orbit families.
- The circular-orbit benchmark gives an analytic threshold at $\beta=1$, explicit branchwise Jacobians, and controlled near-threshold asymptotics, anchoring numerical calibrations.
- Under explicit assumptions (A1-A5), we now have a compact theorem spine:
  finiteness, coarea reduction, topological invariance away from critical points,
  and a precise bifurcation condition for branch changes.
- An emergent-metric ansatz from coarse-grained hit density $\mathcal{I}$ is proposed but must satisfy weak-field and equivalence constraints; this remains conjectural.
- Overall: the geometric quantization mechanism is now partly formalized (theorem-level
  in the regularized regime), while mass mapping, asymptotic stability, and emergent
  metric closure remain open.
