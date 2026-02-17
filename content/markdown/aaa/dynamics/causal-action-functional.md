## Causal Self-Action Functional — Coherent Structure

### Problem Statement and Goal
The objective is to explain why only certain assemblies are stable and discrete, and to interpret emergent “mass” as a consequence of causal interaction structure: intrinsic self‑action of each worldline plus coupling to the ambient tri-binary sea (effective spacetime), rather than an externally assigned input. The target is a geometric/variational functional derived from the causal‑wake kernel that can be evaluated on periodic orbits, compared across topological classes, and tested against dynamical stability.

### Core Functional Definitions
**Self‑action functional:**
$$
\mathcal{A}_{\text{self}}[\gamma] = \iint_{\gamma \times \gamma}
\frac{\delta\!\big(\|\mathbf{x}(t)-\mathbf{x}(t')\| - c_f|t-t'|\big)}
{\|\mathbf{x}(t)-\mathbf{x}(t')\|^2}\,dt\,dt'
$$
We introduce a functional to replace ad‑hoc stability searches with a single quantity that can be compared across trajectories. The goal is to identify which worldlines are dynamically preferred and to connect that preference to discrete, reproducible particle‑like states.

This integrates over all pairs of points on a single worldline and counts only those pairs that are causally connected by a wake moving at speed $c_f$. The $1/r^2$ factor weights nearby self‑hits more strongly than distant ones.
Convention: this document uses the symmetric selector $|t-t'|$ in action integrals; the equivalent retarded form uses $(t-t')$ with an explicit $\Theta(t-t')$.

**Interpretation:**
1. **Object:** The full worldline $\gamma$ is treated as a single geometric object.
2. **Constraint:** The delta function enforces the light‑cone condition, selecting causally connected pairs.
3. **Measure:** The $1/r^2$ weight emphasizes close self‑hits over distant ones.

**Normalized (periodic) self‑action:**
$$
\bar{\mathcal{A}}_{\text{self}}[\gamma] =
\frac{1}{T^2}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r(t,t')-c_f|t-t'|\big)}{r(t,t')^2}\,dt\,dt'
$$
with $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$ and $\delta_\eta$ a mollified delta.
This version is defined for periodic orbits. The $T^2$ normalization makes values comparable across different periods, while $\delta_\eta$ regularizes the causal constraint for numerical evaluation.
Dimensional check: $[\bar{\mathcal{A}}_{\text{self}}]=1/\text{Length}^2$ (inverse area), consistent with a surface‑density measure over causal intersections.

**Total action (multi‑assembly):**
$$
\bar{\mathcal{A}}_{\text{total}}[\{\gamma_i\}] =
\frac{1}{T^2}\left[
\sum_i \int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ii}(t,t')-c_f|t-t'|\big)}{r_{ii}(t,t')^2}\,dt\,dt'
\;+\;
\frac{1}{2}\sum_{i\ne j}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ij}(t,t')-c_f|t-t'|\big)}{r_{ij}(t,t')^2}\,dt\,dt'
\right]
$$
This aggregates self‑terms and cross‑terms between components, with the $\frac{1}{2}\sum_{i\ne j}$ convention ensuring unordered pairs are counted once.

**Definitions:** $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $r_{ij}(t,t')=\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|$, and $\Delta t = t-t'$.

**Kernel comparison:**
$$
\text{Force kernel: } \left[ \frac{\hat{\mathbf{r}}(t,t')}{r^2}, \delta\!\big(r-c_f\Delta t\big) \right]
\qquad
\text{Action kernel: } \left[ \frac{1}{r^2}, \delta\!\big(r-c_f\Delta t\big) \right]
$$
The force kernel retains direction via $\hat{\mathbf{r}}$, while the action kernel keeps only the scalar magnitude. This is the minimal change that turns a vector interaction into a scalar functional suitable for variational comparisons.

As a scalar, $\mathcal{A}_{\text{self}}$ summarizes the total strength of causal self‑hits along a worldline. It is derived directly from the interaction structure, but with the directional information removed.

For reference, the self‑interaction term in the master equation uses the same kernel:
$$
\mathbf{a}_{\text{self}}(t)
=\kappa q^2\int dt' \,
\frac{\hat{\mathbf{r}}(t,t')}{r^2(t,t')}
\delta\!\big(r(t,t')-c_f(t-t')\big)
$$

### Regularized Mathematical Setting (Explicit Regime)

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
domain ($r(t,t')\ge r_{\min}>0$ on support of $\phi_\eta$), define
$$
\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]
=\frac{1}{T^2}\int_0^T\!\!\int_0^T
\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2}\,dt\,dt'.
$$

This is the primary object for proofs and numerics. The unregularized
$\eta\to0^+$ limit is treated only after bounds are established.

### Axioms and Admissibility Assumptions

We use the following minimal assumption set for theorem-level statements:

- **(A1) Regularity:** $\mathbf{x}\in C^2(\mathbb{R};\mathbb{R}^3)$ and is $T$-periodic.
- **(A2) Finite-speed causality:** The causal selector is $F_\gamma(t,t')=0$ with field speed $c_f>0$.
- **(A3) Collision exclusion on support:** $r(t,t')\ge r_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A4) Transversality (generic branch):** $\nabla F_\gamma\neq0$ along the selected causal set.
- **(A5) Fixed topological class:** Deformations are taken inside one homotopy class on $T^2$ unless a bifurcation condition is crossed.
- **(A6) Isolated system bookkeeping:** When connecting to dynamics, energy/momentum use the same $\eta$ and history window conventions as the master-equation diagnostics.

These assumptions are deliberately local and testable. If any assumption fails, the
corresponding theorem is not claimed.

### Rationale for the Functional
- **Natural Lyapunov/action‑like candidate:** If certain motion classes monotonically reduce a single functional, that quantity can label attractors and discrete minima that look like “mass levels” or particle configurations.
- **Bridge to geometric analysis / knot theory:** Showing that simple periodic motions (e.g., maximum‑curvature self‑hit orbits) locally minimize $\mathcal{A}_{\text{self}}$ within a topological class would give a clean geometric explanation for why some orbits are preferred over nearby perturbations.
- **Simulation‑friendly statistic:** Given any numerically computed orbit, we can Monte‑Carlo sample $(t,t')$, test the causal condition, and estimate $\mathcal{A}_{\text{self}}[\gamma]$ to compare shapes. This makes the “stable = local minimum” heuristic empirically testable.
- **Kolmogorov‑style appeal:** The functional is built directly from the microscopic law, convertible to empirical statistics, and a candidate for invariant measures that could explain attractor selection.

### Geometric/Topological Framework
**Causal locus on the torus:** For a periodic orbit the domain $(t,t')\in[0,T]^2$ is a torus. The causal locus
$$
\mathcal{L}_{\text{causal}} = \{(t,t')\in T^2 \mid \|\mathbf{x}(t)-\mathbf{x}(t')\| = c_f|t-t'|\}
$$
is the set of self‑hits. Its winding numbers $(p,q)$ on $T^2$ are **discrete labels** for orbit families. As $R$ or $v$ change, the locus undergoes reconnection events; these are the bifurcations where families appear or disappear, giving a natural quantization of admissible self‑hit patterns. Sub‑$c_f$ motion leaves $\mathcal{L}_{\text{causal}}$ empty; super‑$c_f$ creates branches whose closure determines the integer self‑hit count per period.
The self‑action integral is the **weighted arc length** of $\mathcal{L}_{\text{causal}}$ with weight $1/r^2$, so topology and metric weight enter together.

**Causal writhe (chirality):**
$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}} \text{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}\big)\,d\tau
$$
is a signed measure of handedness for the self‑interaction pattern. Nonzero $Wr_c$ ties intrinsic chirality/spin to the geometry of the wake rather than an imposed quantum number; changing $Wr_c$ requires tearing the causal locus.

**Topological vs Noether data:** Continuous symmetries (time shifts, rotations) give Noether charges (energy, angular momentum). The winding class of $\mathcal{L}_{\text{causal}}$ supplies **topological charges**. Stable “generations” live where a Noether‑stationary orbit is also topologically locked; decay would require changing the winding class, i.e., a reconnection of $\mathcal{L}_{\text{causal}}$.

**Multi‑component topology:** For assemblies, project the spatial trajectories over one period, classify the resulting link, and when hyperbolic, use the volume of the link complement as a complexity measure. Brunnian or highly knotted complements signal strong causal interlocking and higher action density.

### Theorem Spine (Provable Core under A1-A5)

#### Theorem 1 (Well-defined finite regularized action)
Under (A1)-(A3), $\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]$ is finite and nonnegative.

**Proof sketch:** Nonnegativity is immediate from $\phi_\eta\ge0$ and $r^{-2}>0$.
Finiteness follows from $r^{-2}\le r_{\min}^{-2}$ on support and bounded domain
$[0,T]^2$.

#### Theorem 2 (Coarea reduction to causal locus)
Under (A1)-(A4), the $\eta\to0^+$ leading term of
$\bar{\mathcal{A}}_{\text{self},\eta}$ is the weighted 1D measure of the causal locus:
$$
\bar{\mathcal{A}}_{\text{self}}
\sim
\frac{1}{T^2}
\int_{\mathcal{L}_{\text{causal}}}
\frac{1}{r(t,t')^2\,\|\nabla F_\gamma(t,t')\|}\,d\ell,
$$
where $\mathcal{L}_{\text{causal}}=\{(t,t')\in T^2: F_\gamma(t,t')=0\}$.

**Proof sketch:** Apply coarea in $(t,t')$ with level function $F_\gamma$ and use the
mollifier concentration on $F_\gamma=0$.

#### Corollary 2.1 (Discrete branch labels)
Connected components of $\mathcal{L}_{\text{causal}}$ carry winding numbers
$(p,q)\in\mathbb{Z}^2$ on $T^2$. These are unchanged under smooth deformations that
preserve (A4).

**Meaning:** integer labels are structural, not fit parameters.

#### Theorem 3 (Bifurcation criterion for quantized branch changes)
Integer labels and component counts can change only at parameter values where (A4)
fails, i.e., where $\nabla F_\gamma=0$ somewhere on $F_\gamma=0$ (tangent/degenerate
causal intersection).

**Proof sketch:** Away from critical values, implicit-function continuation gives
smooth families of causal-locus components with fixed topology. Topology change
requires critical-point crossing.

#### Theorem 4 (Two-sided bounds useful for validation)
Under (A1)-(A4), for any fixed $\eta>0$:
$$
0\le
\bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2}.
$$
If additionally $r\le r_{\max}$ on support, then
$$
\bar{\mathcal{A}}_{\text{self},\eta}
\ge
\frac{1}{r_{\max}^2T^2}
\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'.
$$

**Meaning:** numerical pipelines can assert hard pass/fail envelopes before any
physical interpretation is attempted.

### Analytic Benchmarks (Circular Orbit)
For a circular orbit of radius $R$ and speed $v=\beta c_f$:
$$
2R\left|\sin\left(\frac{\omega\Delta}{2}\right)\right| = c_f\Delta,
\quad \text{with } \omega=\frac{v}{R}
$$
Define $\xi=\frac{\omega\Delta}{2}$, giving the root condition:
$$
\sin\xi = \frac{\xi}{\beta}
$$

**Threshold:** The first non‑trivial self‑hit occurs at $\beta=\pi/2$.

**Closed‑form sum (with Jacobian):**
$$
\bar{\mathcal{A}}_{\text{self}}(\beta,R)=
\frac{\beta^3}{8\pi R^2}\sum_{n=1}^{N_{\text{max}}}
\frac{1}{\xi_n^2\sqrt{\beta^2-\xi_n^2}},
\quad \sin\xi_n=\frac{\xi_n}{\beta}
$$

**Asymptotics:**
$$
\bar{\mathcal{A}}_{\text{self}} \sim \frac{C}{\sqrt{\beta-\pi/2}}
\quad (\beta\to(\pi/2)^+)
$$
$$
\bar{\mathcal{A}}_{\text{self}} \sim \frac{\pi}{48R^2}
\quad (\beta\gg 1)
$$
The number of admissible roots $\xi_n$ (self‑hits per period) is the discrete count that matches the winding numbers of $\mathcal{L}_{\text{causal}}$; new roots appear only when the causal locus reconnects, so this analytic toy mirrors the bifurcation picture in the geometric/topological framework above.

### Circular Benchmark as a Branch-Count Theorem (Chosen Branch Convention)

In the branch convention used in this document (the same one used for the
$\beta=\pi/2$ caustic), define
$$
g_\beta(\xi)=\sin\xi-\frac{\xi}{\beta}.
$$
Let $I_{\text{branch}}\subset(0,\pi)$ denote the chosen admissible interval.
Then admissible causal roots are zeros of $g_\beta$ in $I_{\text{branch}}$.

#### Proposition 5.1 (Discrete root count)
For fixed $\beta$, the admissible set $\{\xi_n\}$ is finite and integer-valued.
Root count changes only when
$$
g_\beta(\xi)=0,\qquad \partial_\xi g_\beta(\xi)=0
$$
are simultaneously satisfied (tangent birth/death of roots).

**Proof sketch:** Real-analyticity of $g_\beta$ gives isolated simple roots except at
double-root points, which are exactly the simultaneous equations above.

This is the 1D analog of Theorem 3 and provides an explicit, checkable bifurcation
condition for the circular toy model.

### Dynamical Interpretation
- Stable periodic orbits are **critical points** of $\bar{\mathcal{A}}_{\text{total}}$ constrained within a winding class. The delay flow need not be a gradient flow of this functional, so extremality is a selection principle, not a proof of asymptotic stability.
- **Existence vs. stability:** Topology of $\mathcal{L}_{\text{causal}}$ dictates which families can exist (via bifurcations when branches reconnect). Linear spectra of the delay equation decide which of those families attract. The causal locus is the combinatorial skeleton; Lyapunov exponents tell who survives.
- **Discreteness:** Each winding class gives an integer self‑hit count; moving between classes requires a reconnection event, explaining mass gaps and “generations” without adding quantization by hand.
- **Conservation with memory:** Time‑translation and rotational symmetry of the kernel imply conserved total energy and angular momentum, but energy includes the “virial of the history” stored in active causal wakes.
- **Gradient vs. symplectic:** The master equation is conservative; critical points of $\bar{\mathcal{A}}$ correspond to KAM‑style islands, not sinks. If any dissipation couples to the Noether Sea, minima could become attractors, but absent that, stability means orbital persistence, not asymptotic convergence.

### Emergent Geometry Constraints
Define the coarse‑grained hit density
$$
\mathcal{I}(t,\mathbf{x})=\sum_j\int_{-\infty}^{t}\!\frac{\delta_\eta\!\big(\|\mathbf{x}-\mathbf{x}_j(t')\|-c_f(t-t')\big)}{\|\mathbf{x}-\mathbf{x}_j(t')\|^2}\,dt',
$$
and map it to an effective metric
$$
g_{\mu\nu}dx^\mu dx^\nu = -\alpha^2(\mathcal{I})\,c_f^2 dt^2 + \beta^2(\mathcal{I})\,\delta_{ij}dx^i dx^j,
$$
with small couplings $\alpha=1+\lambda_t\mathcal{I}$, $\beta=1+\lambda_s\mathcal{I}$ in the weak field. Bianchi identities and weak‑equivalence demands constrain the admissible $\lambda_{t,s}$; otherwise the emergent geometry reduces to a scalar‑tensor theory with potentially observable fifth forces. Matching the long‑range limit of test‑assembly motion to geodesics in $g_{\mu\nu}[\mathcal{I}]$ is the consistency check linking microscopic causal hits to macroscopic curvature.
Here, "fifth force" means an additional long-range interaction mediated by the scalar sector encoded in $\mathcal{I}$ (or equivalently in $\alpha,\beta$), on top of the usual spin-2 metric response. If that scalar coupling is not sufficiently constrained, test assemblies can acquire composition-dependent accelerations, producing weak-equivalence-principle violations and post-Newtonian deviations that are tightly bounded experimentally.
Numerical check: evolve two assemblies with different internal $\bar{\mathcal{A}}_{\text{total}}$ through the same prescribed $\mathcal{I}(t,\mathbf{x})$ background and verify their centers follow the same geodesic to numerical tolerance.
Mean‑field view: in a dilute limit with many architrinos, coarse‑graining the hit process should yield a Vlasov equation for $f(t,\mathbf{x},\mathbf{v})$ with force derived from $\mathcal{I}$, providing the statistical bridge to continuum geometry.

### Implementation Notes (Appendix)
- Use the same $\delta_\eta$ and $\eta$ for force and action estimators.
- For periodic orbits, normalize by $T^2$ and enforce periodic boundary conditions.
- For circular‑orbit calibration, compute $\xi_n$ roots numerically and sum with the Jacobian factor.
- Handle the $\beta=\pi/2$ caustic with care; the unregularized action diverges.
- Keep $\eta>0$ during variation: $\nabla\delta$ terms appear in $\delta\mathcal{A}$; regularization makes the Euler–Lagrange equations well‑posed. Take $\eta\to0$ only after solving or bounding solutions.

### Simulation Protocol (Minimal Theorem-Backed Checks)

For each simulated orbit family:

1. Verify (A1)-(A4) numerically (regularity, no-support collisions, transversality).
2. Compute $\bar{\mathcal{A}}_{\text{self},\eta}$ at multiple $\eta$ and confirm boundedness
   by Theorem 4.
3. Extract $\mathcal{L}_{\text{causal}}$ and its winding labels $(p,q)$.
4. Scan one control parameter (e.g., $\beta$ or radius ratio) and confirm labels change
   only at detected transversality failures.
5. In the circular benchmark, verify Proposition 5.1 double-root condition at branch
   transitions.

### Limitations and Caveats
- **Rest mass is not just self-action:** $\mathcal{A}_{\text{self}}$ needs careful units; true rest energy also depends on partner interactions, Noether Sea coupling, and external wakes.
- **Minima ≠ stability without dynamics:** Stability depends on the full DDE flow; the functional must be windowed/normalized (e.g., one period) to avoid divergences and to compare orbits meaningfully.
- **Topology needs precision:** Time is monotone; periodic motion yields a spatially closed path but a helical spacetime curve. Be explicit about which projection/linking notion defines the “topological class.”
- **Cohomology language is aspirational:** A cochain complex over the moduli of periodic orbits is not yet constructed; treat “cohomology of causal interaction” as a research direction, not a result.

### Summary and Status
- We defined a causal self-action and total-action functional directly from the $1/r^2$ delayed kernel, plus its normalized form for periodic orbits.
- Topology of the causal locus $\mathcal{L}_{\text{causal}}\subset T^2$ supplies discrete labels (winding, writhe, link type) that naturally segment orbit families.
- The circular-orbit benchmark gives an analytic threshold at $\beta=\pi/2$ and finite high-speed asymptotics, anchoring numerical calibrations.
- Under explicit assumptions (A1-A5), we now have a compact theorem spine:
  finiteness, coarea reduction, topological invariance away from critical points,
  and a precise bifurcation condition for branch changes.
- An emergent-metric ansatz from coarse-grained hit density $\mathcal{I}$ is proposed but must satisfy weak-field and equivalence constraints; this remains conjectural.
- Overall: the geometric quantization mechanism is now partly formalized (theorem-level
  in the regularized regime), while mass mapping, asymptotic stability, and emergent
  metric closure remain open.
