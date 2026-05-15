# Simulations, Regularization, and Shell Numerics

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `13.45`
- Cost: `4.1`
- ROI: `3.28`
- Status: `queued`

## Task Queue

1. `tier0_tier1_runs` — Implement the $A_0$ self-root fold/splitting diagnostic, then run the one-period adaptive direct-root Tier 1 continuation only after the surplus event is classified. Status: `next`. Depends on: none.
2. `convergence_and_provenance` — Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs. Status: `pending`. Depends on: `tier0_tier1_runs`.
3. `eta_positive_package` — Consolidate the formal $\eta > 0$ existence and continuation package. Status: `pending`. Depends on: `tier0_tier1_runs`.

## Scope

Lock the simulation and numerics side tightly enough to support the analytic closure program. This includes tier-0 / tier-1 runs, convergence, maximum-curvature orbit behavior, and the formal $\eta > 0$ package.

This file remains the control surface for the simulations workstream. No sibling detailed priority file is needed yet; concrete campaign packets can be added later if a run family becomes too large for this queue.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `tier0_tier1_runs` | This file | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Tier 1 runs classify self-root surplus events, emit root ledgers, branch residuals, regularization data, and explicit failure codes rather than generic instability summaries. |
| `convergence_and_provenance` | This file | [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) and [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md) | Convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs are reproducible enough to audit a promoted result. |
| `eta_positive_package` | This file | [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | The formal $\eta > 0$ package states existence, uniqueness, continuation criteria, and no-runaway bounds for the relevant causal-wake model. |

## Simulation Campaign Object

A simulation campaign is the typed object
$$
\mathcal{C}_{\mathrm{sim}}
=
\big(
\mathsf{id},
S_\eta,
\mathcal{G}_h,
\Delta t,
\eta,
\mathcal{L}_{\mathrm{root}},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big),
$$
where $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_h$ is the spatial mesh and history mesh, $\Delta t$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

The regularized state history is
$$
S_\eta(t)
=
\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)\}_{i=1}^{N}
\quad\text{with}\quad
S_{\eta,t}(\theta)=S_\eta(t+\theta),\ \theta\in[-h,0],
$$
and every tier-1 run must declare whether $S_{\eta,t}$ is evaluated in $C^1([-h,0])$, $W^{1,\infty}([-h,0])$, or a stricter history class.

The mesh object is
$$
\mathcal{G}_h=(\Omega_h,\Delta x,\{x_k\}_{k=1}^{K},\Theta_h,\Delta h,\mathsf{bc}),
$$
where $\Omega_h\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{x_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_h\subset[-h,0]$ is the stored path-history mesh, $\Delta h$ is the history resolution, and $\mathsf{bc}$ records boundary conditions.

For each receiver-source pair $(i,j)$ at absolute time $t$, the root ledger is
$$
\mathcal{L}_{\mathrm{root}}(t)
=
\{(i,j,\ell,t_{0,\ell},r_{ij,\ell},J_{ij,\ell},\mathsf{class}_{\ell},\mathsf{status}_{\ell})\},
$$
with
$$
g_{ij}(t_{0,\ell};t)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(t_{0,\ell})\|-c_f(t-t_{0,\ell}),
\qquad
J_{ij,\ell}=1-\frac{\mathbf{v}_j(t_{0,\ell})\cdot\hat{\mathbf{r}}_{ij,\ell}}{c_f}.
$$

Root-ledger completeness means
$$
\mathcal{L}_{\mathrm{raw}}
=
\mathcal{L}_{\mathrm{active}}
\sqcup
\mathcal{L}_{\mathrm{excluded}}
\sqcup
\mathcal{L}_{\mathrm{separator}},
$$
where near-zero self roots excluded by $H(0)=0$ must appear in $\mathcal{L}_{\mathrm{excluded}}$ and may not be counted as active self-hit closure.

The branch-residual vector is
$$
\mathcal{R}_{\mathrm{branch}}
=
\big(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\big),
$$
and a campaign must publish a tolerance vector $\tau_{\mathrm{branch}}$ with the same component order before any branch row is promoted.

The root residual component is normalized as
$$
\mathcal{R}_{\text{root}}
=
\max_{t,i,j,\ell}
\frac{|g_{ij}(t_{0,\ell};t)|}
{\max(c_f\Delta t,\eta,\varepsilon_0)},
\qquad
\varepsilon_0=10^{-12}.
$$

The provenance log is
$$
\Pi_{\mathbb{U}_{\text{now}}}
=
\{(\mathsf{receiver}_m,t_m,\mathsf{emitter}_m,t_{\mathrm{emit},m},
\mathsf{contribution}_m,\rho_m,\theta_m)\}_{m=1}^{M},
$$
where
$$
\rho_m
=
\frac{\left|\|x_{\mathsf{receiver}_m}-x_{\mathsf{emitter}_m}(t_{\mathrm{emit},m})\|-c_f(t_m-t_{\mathrm{emit},m})\right|}
{\max(c_f\Delta t,\varepsilon_0)},
\qquad
\theta_m=\frac{t_{\mathrm{emit},m}-t_m}{\Delta t}.
$$

The convergence-measure vector is
$$
\mathcal{E}_{\mathrm{conv}}
=
\big(
E_{\mathrm{rel}}(\Phi),
E_{\mathrm{rel}}(\|\nabla\Phi\|),
D_W,
D_{JS},
p_{\mathrm{obs}},
\epsilon_{\mathrm{self}},
\epsilon_H,
\epsilon_P,
\epsilon_L,
E_\eta,
\Delta_{\eta,\mathrm{root}}
\big),
$$
with $\epsilon_H$, $\epsilon_P$, and $\epsilon_L$ denoting declared relative drifts of total energy, total momentum, and total angular momentum on the analysis window.

The regulator-dependence observable for any promoted channel $Y$ is
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{x_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{x_k\})}+\varepsilon_0},
$$
and the branch-regulator defect $\Delta_{\eta,\mathrm{root}}$ is the number of unmatched active root-ledger entries after matching $(i,j,\ell,\mathsf{class}_{\ell})$ between $\eta$ and $\eta/2$ runs.

The failure-code set is
$$
\mathcal{F}
=
\{\mathsf{pass},
\mathsf{mesh\_nonconvergence},
\mathsf{branch\_root\_instability},
\mathsf{provenance\_discontinuity},
\mathsf{conservation\_drift},
\mathsf{regulator\_dependence},
\mathsf{hidden\_tuning},
\mathsf{null\_control\_passed},
\mathsf{eta\_continuation\_failure},
\mathsf{artifact\_incomplete}\}.
$$

## Executable Diagnostic Contract

A campaign that is intended to discipline a proof certificate must reduce its numerical status to predeclared scalar diagnostics. Define
$$
\mathcal{D}_{\mathrm{exec}}
=
\big(
D_{\mathrm{branch}},
D_{\mathrm{ref}},
D_{\mathrm{ord}},
D_{\mathrm{hist}},
D_{\mathrm{space}},
D_{\mathrm{cross}},
D_{\mathrm{prov}},
D_{\mathrm{cons}},
D_{\eta}
\big),
$$
where every component is a ratio whose passing threshold is $1$:
$$
D_{\mathrm{branch}}
=
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}},
$$
$$
D_{\mathrm{ref}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi;\Delta t,\Delta t/2)}{0.02},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|;\Delta t,\Delta t/2)}{0.03},
\frac{|\Delta\lambda_{\text{self}}|}{0.05(\lambda_{\text{self}}+\varepsilon_0)}
\right),
$$
$$
D_{\mathrm{ord}}
=
\frac{0.8}{\max(p_{\mathrm{obs}}(\Phi),p_{\mathrm{obs}}(\|\nabla\Phi\|),\varepsilon_0)},
$$
$$
D_{\mathrm{hist}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi)}{0.02},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|)}{0.03},
\frac{D_W}{0.05},
\frac{D_{JS}}{0.02}
\right),
$$
$$
D_{\mathrm{space}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi\text{-map})}{0.03},
\frac{E_{\mathrm{rel}}(\nabla\Phi\text{-map})}{0.05},
\frac{\Delta_{\mathrm{self}}}{0.05}
\right),
$$
$$
D_{\mathrm{cross}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi)}{0.03},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|)}{0.05},
\frac{D_W}{0.08},
\frac{D_{JS}}{0.03}
\right),
$$
$$
D_{\mathrm{prov}}
=
\max\left(
\frac{\#\{m:\rho_m>10^{-2}\}}{10^{-3}M},
\frac{\max_m\rho_m}{5\times10^{-2}},
\frac{\#\{m:\theta_m>10^{-9}\}}{10^{-6}M}
\right),
$$
$$
D_{\mathrm{cons}}
=
\max\left(
\frac{\epsilon_H}{\tau_H},
\frac{\epsilon_P}{\tau_P},
\frac{\epsilon_L}{\tau_L}
\right),
\qquad
D_{\eta}
=
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}.
$$

The executable Tier 1 acceptance predicate is
$$
\mathsf{Accept}_1(\mathcal{C}_{\mathrm{sim}})
\Longleftrightarrow
R_0\in\mathsf{Candidate}_{1},
\quad
\max_a\mathcal{D}_{\mathrm{exec},a}\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta t,\Delta t/2)=0,
$$
$$
\Delta_{\mathrm{root}}(\Delta h,\Delta h/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1.
$$
Here $\Delta_{\mathrm{self}}$ is the larger relative shift of self-hit counts and stability-window boundaries under spatial refinement. $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact in the output contract exists with a content hash and source commit.

Failure routing is deterministic. The first violated row in the following order supplies the campaign failure code:

| Route condition | Failure code |
| --- | --- |
| required artifact, source commit, pre-run tolerance, or hash is missing | $\mathsf{artifact\_incomplete}$ |
| a promoted observable, tolerance, branch label, or regulator ladder is changed after output inspection | $\mathsf{hidden\_tuning}$ |
| $R_0\notin\mathsf{Candidate}_{1}$ or active roots are unstable under root-ledger refinement | $\mathsf{branch\_root\_instability}$ |
| $D_{\mathrm{ref}}>1$, $D_{\mathrm{ord}}>1$, $D_{\mathrm{hist}}>1$, $D_{\mathrm{space}}>1$, or $D_{\mathrm{cross}}>1$ | $\mathsf{mesh\_nonconvergence}$ |
| $D_{\mathrm{prov}}>1$ | $\mathsf{provenance\_discontinuity}$ |
| $D_{\mathrm{cons}}>1$ | $\mathsf{conservation\_drift}$ |
| $D_{\eta}>1$ or $\Delta_{\eta,\mathrm{root}}>0$ | $\mathsf{regulator\_dependence}$ |
| the continuation exits $\mathcal{A}_\eta$ or crosses $\partial\mathcal{A}_\eta$ without a stricter replacement bound | $\mathsf{eta\_continuation\_failure}$ |
| the negative control also passes all convergence gates | $\mathsf{null\_control\_passed}$ |
| every row above passes | $\mathsf{pass}$ |

## Tier-0 Acceptance Criteria

A tier-0 row is an algebraic branch-certificate row
$$
R_0=(S_{\mathrm{red}},\mathcal{L}_{\mathrm{root}},\mathcal{R}_{\mathrm{branch}},\tau_{\mathrm{branch}},\mathcal{F})
$$
that searches finite causal-root branches without claiming a physical attractor.

Tier 0 accepts only if every active branch satisfies
$$
\mathcal{R}_{\text{root}}\le \tau_{\text{root},0},
\qquad
\min_{t,i,j,\ell\in\mathcal{L}_{\mathrm{active}}}|J_{ij,\ell}(t)|\ge \nu_0>0,
\qquad
\sup_{t,i,j}B_{ij}^{\mathrm{active}}(t)\le B_0<\infty.
$$

Tier 0 accepts a speed-ordered tri-binary row only if the row declares the ordering inequalities used by the branch label and verifies them as strict inequalities, for example
$$
s_I>c_f,\qquad |s_M-c_f|\le \tau_{\mathrm{speed},0},\qquad s_O<c_f.
$$

Tier 0 accepts a branch row only if
$$
\mathcal{R}_{\mathrm{branch},a}\le \tau_{\mathrm{branch},a}
\quad\text{for every component }a,
$$
and every nonzero residual component has role metadata assigning it to averaging, locking, leakage, speed ordering, phase closure, root closure, drift, energy, or Floquet diagnostics.

Tier 0 rejects a row if
$$
\mathcal{L}_{\mathrm{separator}}\ne\varnothing
$$
and any separator entry lacks a signed sheet label, a fold or inactive-gap status, and an explicit reason it is not being counted as a simple active root.

Tier 0 rejects a row if any near-zero self root enters $\mathcal{L}_{\mathrm{active}}$ without a named regularized fold-layer condition, because $H(0)=0$ excludes instantaneous self-kicks from active self-hit closure.

Tier 0 promotion means only
$$
R_0\in\mathsf{Candidate}_{1},
$$
where $\mathsf{Candidate}_{1}$ is the set of rows eligible for tier-1 $\eta > 0$ delayed-dynamics continuation.

## Tier-1 Acceptance Criteria

A tier-1 run is a direct delayed-dynamics continuation
$$
R_1=(R_0,S_\eta,W,\eta,\Delta t,\Delta h,\mathcal{G}_h,\Pi_{\mathbb{U}_{\text{now}}},\mathcal{E}_{\mathrm{conv}},\mathcal{F})
$$
over an analysis window $W=[t_a,t_b]$ with fixed $\eta > 0$ and at least one declared cycle or certificate period when the claim is periodic.

Tier 1 requires admissible continuation on $W$:
$$
\sup_{t\in W}\|\mathbf{v}(t)\|\le V_{\max},
\qquad
\inf_{t\in W,i,j,\ell}r_{ij,\ell}(t)\ge d_{\min}>0,
\qquad
\inf_{t\in W,i,j,\ell}|\partial_\tau g_{ij,\ell}(t)|\ge \nu_1>0,
$$
and
$$
\sup_{t\in W,i,j}B_{ij}^{\mathrm{active}}(t)\le B_1<\infty.
$$

Tier 1 requires temporal convergence
$$
E_{\mathrm{rel}}(\Phi;\Delta t,\Delta t/2)\le 0.02,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|;\Delta t,\Delta t/2)\le 0.03,
\qquad
\frac{|\Delta\lambda_{\text{self}}|}{\lambda_{\text{self}}+\varepsilon_0}\le 0.05,
$$
with
$$
p_{\mathrm{obs}}(\Phi)\ge 0.8
\quad\text{or}\quad
p_{\mathrm{obs}}(\|\nabla\Phi\|)\ge 0.8.
$$

Tier 1 requires history-resolution convergence
$$
E_{\mathrm{rel}}(\Phi)\le 0.02,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03,
\qquad
D_W\le 0.05,
\qquad
D_{JS}\le 0.02.
$$

Tier 1 requires spatial convergence
$$
E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03,
\qquad
E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05,
$$
and self-hit counts plus stability-window boundaries must have relative shift at most $0.05$.

Tier 1 requires cross-integrator agreement
$$
E_{\mathrm{rel}}(\Phi)\le 0.03,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05,
\qquad
D_W\le 0.08,
\qquad
D_{JS}\le 0.03.
$$

Tier 1 requires provenance validity
$$
\#\{m:\rho_m\le 10^{-2}\}\ge 0.999M,
\qquad
\max_m\rho_m\le 5\times10^{-2},
\qquad
\frac{\#\{m:\theta_m>10^{-9}\}}{M}\le 10^{-6}.
$$

Tier 1 requires conservation control
$$
\epsilon_H\le \tau_H,
\qquad
\epsilon_P\le \tau_P,
\qquad
\epsilon_L\le \tau_L,
$$
where $\tau_H$, $\tau_P$, and $\tau_L$ are campaign-declared before the run and must be no looser than the tolerances used in the promoted claim packet.

Tier 1 requires branch persistence under refinement:
$$
\Delta_{\mathrm{root}}(\Delta t,\Delta t/2)=0,
\qquad
\Delta_{\mathrm{root}}(\Delta h,\Delta h/2)=0,
$$
except for entries explicitly classified as separator or fold-layer rows with nonzero inactive-gap certificates.

Tier 1 requires $\eta > 0$ continuation stability on a declared ladder $\eta_{m+1}=\eta_m/2$:
$$
E_\eta(Y;\eta_m,\eta_{m+1})\le \tau_{\eta,Y}
\quad\text{for every promoted observable }Y,
\qquad
\Delta_{\eta,\mathrm{root}}(\eta_m,\eta_{m+1})=0,
$$
unless the run is explicitly labeled as a finite-$\eta$ result and barred from $\eta\to0^+$ claims.

Tier 1 rejects a pipeline if the negative control also passes the convergence gates, because the null run must violate at least one expected invariant, provenance stability condition, or stability-window boundary by the margins named in [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md).

## Proof-Certificate Handoff Contract

The proof-to-simulation handoff for a finite certificate is
$$
\mathsf{H}_{\mathrm{proof}\to\mathrm{sim}}
=
\big(
\mathsf{certificate\_id},
S_{\eta,0},
W,
\Lambda,
\mathcal{L}_{\mathrm{root}}^{\mathrm{expected}},
\tau_{\mathrm{branch}},
\tau_{\mathrm{conv}},
\tau_{\eta},
\mathsf{Null},
\mathsf{Outputs}
\big).
$$
It must name the source certificate, initial history, analysis window, branch label, expected active-root classes, branch tolerances, convergence tolerances, regulator ladder, negative-control mutation, and required output channels before the run starts.

The simulation-to-proof handoff is
$$
\mathsf{H}_{\mathrm{sim}\to\mathrm{proof}}
=
\big(
\mathsf{artifact\_hashes},
\mathcal{L}_{\mathrm{root}}^{\mathrm{matched}},
\mathcal{R}_{\mathrm{branch}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{D}_{\mathrm{exec}},
\mathsf{failure\_code},
\mathsf{promotion\_status}
\big).
$$
It must state whether every expected active root was matched under $\Delta t$, $\Delta h$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value. A proof-program packet may cite a Tier 1 run only through this handoff; a plot, best-fit branch, or un-hashed table is not simulation support for a theorem target.

## Numerical Promotion Lemma

**Lemma (Simulation-promotion criterion).** Let $Q$ be a priority-theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a tier-1 continuation of a tier-0 candidate $R_0$. If $R_0$ satisfies the tier-0 acceptance criteria, $R_1$ satisfies the tier-1 acceptance criteria, the negative control fails as required, and the campaign satisfies
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1,
\qquad
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1,
$$
with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported priority claim for $Q$.

The vectors in the promotion lemma are
$$
\mathcal{E}_{\mathrm{ref}}=(E_{\mathrm{rel}}(\Phi),E_{\mathrm{rel}}(\|\nabla\Phi\|),p_{\mathrm{obs}},\epsilon_{\mathrm{self}}),
\qquad
\mathcal{E}_{\mathrm{prov}}=(D_W,D_{JS},\max_m\rho_m,\#\{m:\theta_m>10^{-9}\}/M),
\qquad
\mathcal{E}_{\mathrm{cons}}=(\epsilon_H,\epsilon_P,\epsilon_L).
$$

The promotion lemma does not convert a simulation-supported priority claim into an analytic theorem; it permits the claim to support proof-program routing, mass-map gating, master-equation closure tests, or validation-gate decisions only with the artifact hashes and failure-code ledger attached.

The promotion lemma fails if a promoted scalar, tensor, root count, branch label, stability gap, conservation quantity, or provenance distribution is selected after inspecting the output without a logged pre-run declaration, because that is $\mathsf{hidden\_tuning}$.

## $\eta > 0$ Regularization Package

The $\eta > 0$ package is the continuation contract
$$
\mathsf{Reg}_\eta=(\delta_\eta,\mathcal{A}_\eta,\mathsf{WP}_\eta,\mathsf{NR}_\eta,\mathsf{Cont}_\eta,\partial\mathcal{A}_\eta),
$$
where $\delta_\eta$ is the mollified causal-wake kernel, $\mathcal{A}_\eta$ is the admissible history set, $\mathsf{WP}_\eta$ is the existence-uniqueness statement, $\mathsf{NR}_\eta$ is the no-runaway bound, $\mathsf{Cont}_\eta$ is the continuation criterion, and $\partial\mathcal{A}_\eta$ is the failure boundary.

The admissible history set on $[0,T]$ is
$$
\mathcal{A}_\eta(T;V,d,\nu,B)
=
\left\{
S_{\eta,t}:
\sup_{t\le T}\|\mathbf{v}(t)\|\le V,\quad
\inf r_{ij,\ell}(t)\ge d,\quad
\inf|\partial_\tau g_{ij,\ell}(t)|\ge \nu,\quad
\sup B_{ij}^{\mathrm{active}}(t)\le B
\right\}.
$$

Existence and uniqueness for a campaign mean that for every declared initial history $S_{\eta,0}\in\mathcal{A}_\eta(T;V,d,\nu,B)$, the $\eta$-regularized delayed system has a unique solution $S_\eta(t)$ on $[0,T]$ in the declared history class, and the emitted root ledger is the ledger generated by that solution rather than by a post-hoc branch choice.

The no-runaway condition is
$$
E_{\text{tot}}^{(\eta)}(t)
=
K_{\mu}(t)+E_{\text{wake}}^{(\eta)}(t),
\qquad
E_{\text{wake}}^{(\eta)}(t)\ge U_{\min}^{(\eta)}>-\infty,
$$
which implies
$$
K_{\mu}(t)\le E_{\text{tot}}^{(\eta)}(0)-U_{\min}^{(\eta)}
$$
on every isolated run whose regularization preserves the relevant time-translation symmetry.

The continuation criterion is
$$
S_\eta([0,T])\subset\mathcal{A}_\eta(T;V,d,\nu,B)
\quad\Longrightarrow\quad
\text{the run may be extended past }T
$$
by the same local well-posedness constants after refreshing the history segment at $T$.

The failure boundary is
$$
\partial\mathcal{A}_\eta
=
\{\|\mathbf{v}\|=V\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{|\partial_\tau g_{ij,\ell}|=\nu\}
\cup
\{B_{ij}^{\mathrm{active}}=B\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow -\infty\},
$$
and crossing any component of $\partial\mathcal{A}_\eta$ changes the promotion status from pass to $\mathsf{eta\_continuation\_failure}$ unless a stricter replacement bound is proved in the same artifact packet.

The $\eta\to0^+$ claim boundary is
$$
\limsup_{\eta\to0^+}E_\eta(Y;\eta,\eta/2)=0
\quad\text{and}\quad
\limsup_{\eta\to0^+}\Delta_{\eta,\mathrm{root}}=0
$$
for every promoted observable and active branch ledger; otherwise the result remains finite-$\eta$ evidence only.

## Falsifiers

Mesh nonconvergence is the falsifier
$$
\mathsf{mesh\_nonconvergence}
\Longleftrightarrow
E_{\mathrm{rel}}(\Phi),\ E_{\mathrm{rel}}(\|\nabla\Phi\|),\ p_{\mathrm{obs}},
\text{ or stability-window shifts violate their tier threshold}.
$$

Branch-root instability is the falsifier
$$
\mathsf{branch\_root\_instability}
\Longleftrightarrow
\Delta_{\mathrm{root}}>0
\text{ under }\Delta t,\ \Delta h,\ \text{or }\eta\text{ refinement without a certified separator or fold-layer explanation}.
$$

Provenance discontinuity is the falsifier
$$
\mathsf{provenance\_discontinuity}
\Longleftrightarrow
D_W,\ D_{JS},\ \rho_m,\ \text{or }\theta_m
\text{ violates the provenance threshold}.
$$

Conservation drift is the falsifier
$$
\mathsf{conservation\_drift}
\Longleftrightarrow
\epsilon_H>\tau_H
\text{ or }
\epsilon_P>\tau_P
\text{ or }
\epsilon_L>\tau_L.
$$

Regulator dependence is the falsifier
$$
\mathsf{regulator\_dependence}
\Longleftrightarrow
\exists Y\ \text{promoted with}\ E_\eta(Y)>\tau_{\eta,Y}
\text{ or }\Delta_{\eta,\mathrm{root}}>0.
$$

Hidden tuning is the falsifier
$$
\mathsf{hidden\_tuning}
\Longleftrightarrow
\eta,\ \Delta t,\ \Delta h,\ \tau_{\mathrm{branch}},\ \tau_\eta,\ \mathsf{bc},\ \text{or promoted observable selection changes after output inspection without a logged pre-run declaration}.
$$

## Output Artifact Contract

A tier-0 artifact packet must contain `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`.

The tier-0 `root_ledger.json` must contain raw roots, active roots, excluded near-zero self roots, separator rows, branch Jacobians, branch classes, branch statuses, and the finite active count $B_{ij}^{\mathrm{active}}$ for each receiver-source pair.

The tier-0 `branch_residuals.json` must contain every component of $\mathcal{R}_{\mathrm{branch}}$, its tolerance, its role, its pass/fail status, and the exact failure code for any failed component.

A tier-1 artifact packet must contain the tier-0 packet hash, `run_metadata.json`, `u_now_provenance.csv` or `u_now_provenance.parquet`, `observables/phi_timeseries.csv`, `observables/grad_phi_timeseries.csv`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`.

The tier-1 plot contract requires `plots/convergence_phi.png`, `plots/convergence_grad_phi.png`, `plots/provenance_t_emit_distribution.png`, `plots/eta_ladder.png`, `plots/conservation_drift.png`, and one branch-ledger stability plot whose axes are the refinement level and matched active root count.

The tier-1 `failure_report.md` must exist even on pass and must report $\mathcal{F}=\mathsf{pass}$, the null-control verdict, the artifact hashes, the declared tolerances, and the statement that no promoted observable or tolerance was selected after output inspection.

The promotion artifact `promotion_lemma_check.md` must list the exact priority-theory claim $Q$, the variables of $Q$, the artifacts containing those variables, each inequality in the numerical promotion lemma, the pass/fail value of each inequality, and the resulting promotion status.

## Main Work

- Use the collinear-breather finite certificate as the smallest solver benchmark for candidate-cycle input, root enumeration, $\eta > 0$ continuation, monodromy, returned-history residuals, and topology reporting, with every failed row assigned one element of $\mathcal{F}$ and the exact failed inequality.
- Implement tier-0 and tier-1 simulations by instantiating $\mathcal{C}_{\mathrm{sim}}$ and satisfying the tier acceptance criteria above before any result is used in [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) or the `validation/simulations/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / tri-binary stability numerically only when the branch-root ledger is stable under $\Delta t$, $\Delta h$, and $\eta$ refinement.
- Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs only as promotion artifacts paired with `convergence_table.csv`, `u_now_provenance.*`, `failure_report.md`, and `promotion_lemma_check.md`.
- Consolidate the formal $\eta > 0$ package by verifying $\mathsf{WP}_\eta$, $\mathsf{NR}_\eta$, $\mathsf{Cont}_\eta$, and $\partial\mathcal{A}_\eta$ for each promoted run family.
- Tie the Planck mapping back to the master equation only through simulation-supported priority claims whose variables are present in $\mathcal{C}_{\mathrm{sim}}$ and whose regulator-dependence row passes.
- Build any quick intuition tool for escaping potential versus frequency only as a non-promotional diagnostic unless it emits the campaign object, root ledger, convergence table, provenance log, and failure report.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [mass-map](../mass-map/mass-map.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)

## Related AAA Notes

- [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md)
- [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md)
- [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md)
- [planck-scale-tri-binary-alignment](../../../content/markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md)
