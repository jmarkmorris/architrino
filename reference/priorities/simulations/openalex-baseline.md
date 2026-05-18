# OpenAlex Baseline for Simulations

## Query Scope

Queried: 2026-05-18.

Method: OpenAlex `works` searches were sorted by `cited_by_count:desc`. The source lanes were chosen from the rank-3 `simulations` workstream rather than from a generic numerics search:

- state-dependent delay differential equations, especially solution manifolds and active-root smoothness;
- numerical methods for history-dependent functional differential equations;
- neutral or derivative-sensitive state-dependent delay equations, where derivative jumps can propagate through a run;
- regularization, weak/classical branch selection, and singular perturbation behavior near transition points;
- shared-reference roots that connect this literature back to delayed electrodynamics.

OpenAlex method references:

- [How do I find the most cited publications?](https://help.openalex.org/hc/en-us/articles/27219504981655-How-do-I-find-the-most-cited-publications)
- [List works - OpenAlex Developers](https://developers.openalex.org/api-reference/works/list-works)

Citation counts below are OpenAlex `cited_by_count` values at query time. They are prioritization signals, not claims that every highly cited work should become a closure target.

## Selected Top Publications

### State-Dependent Delay Baseline

| OpenAlex work | Publication | Year | Cited by | Relevance to $\mathbb{A}\mathbb{A}\mathbb{A}$ |
| --- | --- | ---: | ---: | --- |
| [W1535375949](https://openalex.org/W1535375949) | Hartung, Krisztin, Walther, and Wu, state-dependent delay theory and applications chapter | 2006 | 312 | Closest broad survey baseline for treating active causal roots as history-dependent functional objects rather than one-time algebraic solves. |
| [W1988906184](https://openalex.org/W1988906184) | Walther, solution manifold and $C^1$ smoothness for state-dependent delay equations | 2003 | 166 | Direct support for the branch-chart requirement that root offsets and Jacobian data vary smoothly on a retained history tube. |
| [W2149899468](https://openalex.org/W2149899468) | Cooke and Huang, linearization for state-dependent delay equations | 1996 | 110 | Supports separating equilibrium/periodic-branch stability from the raw presence of a state-dependent delay. |
| [W2021908089](https://openalex.org/W2021908089) | Arino, Hadeler, and Hbid, periodic solutions for state-dependent delay equations | 1998 | 80 | Baseline for treating periodic branch closure as a functional-dynamical result, not as a plotted recurrence. |
| [W4243174912](https://openalex.org/W4243174912) | Hartung, linearized stability in periodic functional differential equations with state-dependent delays | 2004 | 71 | Supports the current Tier 1 insistence on Floquet and monodromy diagnostics after one-period residuals pass. |

### Numerical And Regularization Baseline

| OpenAlex work | Publication | Year | Cited by | Relevance to $\mathbb{A}\mathbb{A}\mathbb{A}$ |
| --- | --- | ---: | ---: | --- |
| [W1550341792](https://openalex.org/W1550341792) | Bellen and Zennaro, numerical methods for delay differential equations | 2003 | 972 | General numerical baseline for interpolation, history mesh, discontinuity handling, and convergence discipline. |
| [W2040890176](https://openalex.org/W2040890176) | Guglielmi and Hairer, Radau IIA methods for stiff delay differential equations | 2001 | 130 | Relevant to stiff finite-$\eta$ continuations and cross-integrator checks. |
| [W1996995731](https://openalex.org/W1996995731) | Shampine, residual-control solvers for ODEs and DDEs | 2004 | 110 | Supports residual-controlled integration as an implementation baseline, but $\mathbb{A}\mathbb{A}\mathbb{A}$ promotion still requires root-ledger and provenance artifacts. |
| [W2070252545](https://openalex.org/W2070252545) | Bellen, Maset, Zennaro, and Guglielmi, causal-delay functional differential equation numerics survey | 2009 | 55 | Supports the existing convergence split into temporal, history, spatial, cross-integrator, and regulator rows. |
| [W2006380387](https://openalex.org/W2006380387) | Feldstein and Neves, high-order methods for state-dependent delay equations with nonsmooth solutions | 1984 | 53 | The key signal is that high-order accuracy requires locating propagated derivative-jump points, not merely shrinking $\Delta t$. |

### Neutral And Transition-Layer Baseline

| OpenAlex work | Publication | Year | Cited by | Relevance to $\mathbb{A}\mathbb{A}\mathbb{A}$ |
| --- | --- | ---: | ---: | --- |
| [W1987026304](https://openalex.org/W1987026304) | Bellen and Guglielmi, neutral state-dependent delay solution methods | 2008 | 36 | Important because the paper explicitly names two-body classical electrodynamics as a source of neutral state-dependent delay problems. |
| [W1973333950](https://openalex.org/W1973333950) | Fusco and Guglielmi, regularization of discontinuous equations for neutral state-dependent delay systems | 2011 | 27 | Strongest direct baseline for continuation through derivative-discontinuity points by declaring the regularization and limiting branch behavior. |
| [W1965225890](https://openalex.org/W1965225890) | Guglielmi and Hairer, asymptotic expansions for regularized state-dependent neutral delay equations | 2012 | 14 | Supplies the useful warning that a singularly perturbed regularization can converge to different classical or weak branch behavior depending on transition dynamics. |
| [W2126019919](https://openalex.org/W2126019919) | Guglielmi and Hairer, numerical approaches for state-dependent neutral delay equations with discontinuities | 2011 | 13 | Supports making each fold-layer or separator transition a declared finite-$\eta$ route, not an unreported solver event. |

### Shared-Reference Roots

The shared-reference aggregation over the top state-dependent delay works found a concentrated core of foundational sources. The $\mathbb{A}\mathbb{A}\mathbb{A}$-relevant ones are:

| OpenAlex work | Publication | Year | Cited by | Relevance to $\mathbb{A}\mathbb{A}\mathbb{A}$ |
| --- | --- | ---: | ---: | --- |
| [W1607633954](https://openalex.org/W1607633954) | Hale and Verduyn Lunel, introduction to functional differential equations | 1993 | 5673 | General history-space and semigroup baseline. |
| [W1937028141](https://openalex.org/W1937028141) | Diekmann, van Gils, Verduyn Lunel, and Walther, delay-equation analysis monograph | 1995 | 916 | Broad nonlinear/history-space reference baseline. |
| [W1973972204](https://openalex.org/W1973972204) | R. D. Driver, one-dimensional two-body classical electrodynamics | 1963 | 133 | Closest historical evidence that finite-propagation two-body electrodynamics naturally produces state-dependent delay dynamics requiring initial histories. |
| [W14240986](https://openalex.org/W14240986) | R. D. Driver, neutral functional-differential system from a two-body electrodynamics problem | 1963 | 92 | Confirms that derivative-sensitive delayed equations are not an artificial numerical corner case for the current priority. |
| [W2759818069](https://openalex.org/W2759818069) | Mallet-Paret and Nussbaum, boundary-layer phenomena for state-dependent time lags I | 1992 | 120 | Baseline for treating transition layers as real mathematical objects rather than solver noise. |
| [W1786847840](https://openalex.org/W1786847840) | Mallet-Paret and Nussbaum, boundary-layer phenomena II | 1996 | 51 | Same transition-layer baseline, useful for asymptotic discipline. |
| [W2063052140](https://openalex.org/W2063052140) | Mallet-Paret and Nussbaum, boundary-layer phenomena III | 2003 | 49 | Same transition-layer baseline, useful for deeper follow-up if fold-layer asymptotics become the live bottleneck. |

## Source Signals And Outcomes

1. State-dependent delay solution-manifold discipline.
   Outcome: already represented in the rank-1 master-equation baseline and in the existing simulations campaign object. No new gate is needed. The simulations lane should continue to require root-ledger persistence under $\Delta t$, $\Delta h$, and $\eta$ refinement before downstream claims consume a branch.

2. Derivative-sensitive and neutral-delay warning.
   Outcome: promoted now into [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md). The safe $\mathbb{A}\mathbb{A}\mathbb{A}$ version is a finite-$\eta$ branch-transition packet: every transition where active roots appear, disappear, or pass through a fold-layer must declare a status and converge under the same regulator ladder as the promoted observable.

3. High-order method warning from nonsmooth solutions.
   Outcome: converted into the same branch-transition packet. High-order accuracy is not credible when derivative-jump or fold-layer locations are inferred only after a run; the transition window and branch status have to be part of the campaign artifact.

4. Numerical convergence and residual-control baseline.
   Outcome: already represented by [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) and the campaign packet in [simulations](simulations.md). The OpenAlex sweep supports the existing choice to require temporal, history-resolution, spatial, cross-integrator, provenance, conservation, regulator, and negative-control rows rather than a single best-fit plot.

5. Delayed electrodynamics roots.
   Outcome: comparison and motivation only. Driver's two-body electrodynamics papers show that two-body finite-propagation force laws naturally lead to state-dependent delayed and derivative-sensitive problems. They do not authorize importing Maxwell-Lorentz ontology, radiation-reaction assumptions, or advanced terms into $\mathbb{A}\mathbb{A}\mathbb{A}$. The usable linkage is mathematical: initial histories, branch continuation, and collision/termination boundaries are first-class objects.

6. False positives and rejected directions.
   Outcome: rejected for this pass. Broad OpenAlex queries pulled in ecology, population dynamics, nutrition-support guidelines, neural systems, stochastic equations, fractional controllability, and unrelated PDE/control literature. Those sources are not better consumers of the current rank-3 priority than the native state-dependent delay, regularization, and delayed-electrodynamics lanes above.

## Concrete Mathematical Advance

The OpenAlex sweep sharpens the simulation acceptance surface from "the finite-$\eta$ run did not crash" to "the finite-$\eta$ run selected a stable branch-transition status under refinement."

For a declared transition window $I_*=[t_*-\Delta_*,t_*+\Delta_*]$, define the finite-$\eta$ branch-transition record
$$
\mathcal{T}_{\eta,*}
=
\big(
I_*,
\mathcal{L}_{\mathrm{root}}|_{I_*},
\mathsf{status}_{\eta,*},
\mathcal{Y}_{\eta,*},
\mathcal{E}_{\mathrm{trans},*}
\big),
$$
where $\mathsf{status}_{\eta,*}$ is one of the existing branch statuses `simple-root`, `fold-layer`, `inactive-gap`, or `rejected`, and $\mathcal{Y}_{\eta,*}$ is the set of observables promoted through that window.

For every $Y\in\mathcal{Y}_{\eta,*}$, the transition residual is
$$
E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)
=
\frac{\|R(Y_{\eta/2}|_{I_*})-Y_{\eta}|_{I_*}\|_{L^2(I_*,\{x_k\})}}
{\|R(Y_{\eta/2}|_{I_*})\|_{L^2(I_*,\{x_k\})}+\varepsilon_0}.
$$
The transition passes only if
$$
\mathsf{status}_{\eta,*}=\mathsf{status}_{\eta/2,*},
\qquad
E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)\le\tau_{\mathrm{trans},Y}
\quad\text{for every }Y\in\mathcal{Y}_{\eta,*},
$$
and every root-ledger row in $I_*$ keeps source identity, branch class, and status metadata under the same matching rule used by $\Delta_{\eta,\mathrm{root}}$. A status flip is $\mathsf{branch\_root\_instability}$; a stable status with unstable promoted observables is $\mathsf{regulator\_dependence}$; a missing transition record is $\mathsf{artifact\_incomplete}$.

This is a simulation-level criterion, not an analytic theorem. Its value is that it prevents the current $A_0$ corrected branch-equation attempt from treating a fold-layer, separator, or derivative-sensitive transition as a successful one-period correction unless the transition itself survives the regulator ladder.

## Initial $\mathbb{A}\mathbb{A}\mathbb{A}$ Linkages

| Target | Linkage | Status |
| --- | --- | --- |
| [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Add finite-$\eta$ branch-transition discipline for fold-layer, separator, and active-root status changes. | Edited now. |
| [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) | Existing convergence rows already match the OpenAlex numerical baseline; a future edit may add `transition` rows if this diagnostic becomes machine-output. | No edit needed now. |
| [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) | Existing Tier 0 / Tier 1 packet already names root ledger, branch residuals, convergence table, regulator ladder, failure report, and hashes. | No edit needed now. |
| [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md) | Fold-layer and branch-chart material already has the right proof vocabulary; use this OpenAlex baseline if a simulation packet starts consuming those rows. | Follow-up only if a run is selected. |
| [master-equation-closure baseline](../master-equation-closure/openalex-baseline.md) | Rank-1 baseline already captured state-dependent delay compatibility. This simulations baseline is the numerical/regularization counterpart. | Cross-workstream linkage established. |

## Next Use

Use this baseline when advancing the rank-3 workstream:

1. For `tier0_tier1_runs`, require the corrected one-period branch-equation attempt to emit $\mathcal{T}_{\eta,*}$ for every fold-layer or active-root status transition in the retained period.
2. For `convergence_and_provenance`, add transition-window residuals only if the implementation can emit them as rows in `convergence_table.csv`; otherwise keep them in `failure_report.md` as a non-promotional diagnostic.
3. For `eta_positive_package`, prove that $\mathsf{WP}_\eta$, $\mathsf{NR}_\eta$, and $\mathsf{Cont}_\eta$ apply across each accepted $\mathcal{T}_{\eta,*}$ rather than only on simple-root intervals.
