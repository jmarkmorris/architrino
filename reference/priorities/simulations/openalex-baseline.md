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

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

### Numerical And Regularization Baseline

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

### Neutral And Transition-Layer Baseline

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

### Shared-Reference Roots

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

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
\mathsf{regularization}_{\eta,*},
\mathsf{window\_scale}_{\eta,*},
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

The numerical-methods mining adds a history-interpolation diagnostic for delayed source states:
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})-I_{\Delta h}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}+\varepsilon_0
}.
$$
For nonsmooth state-dependent delay windows, add a jump/transition ledger
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
$$
Missing interpolation or jump rows route to `artifact_incomplete`; unstable branch or jump identity routes to `branch_root_instability`; unresolved interpolation convergence routes to `mesh_nonconvergence`.

## Initial $\mathbb{A}\mathbb{A}\mathbb{A}$ Linkages

| Target | Linkage | Status |
| --- | --- | --- |
| [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Add finite-$\eta$ branch-transition discipline for fold-layer, separator, active-root status changes, regularization routes, window scales, and jump-location rows. | Edited now. |
| [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) | Add declared history interpolation, jump residuals, cross-integrator branch-identity discipline, and transition-window convergence rows. | Edited now. |
| [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) | Add `history_interpolation.json`, conditional `transition_records.json`, and stricter cross-integrator report contents to the Tier 1 packet. | Edited now. |
| [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md) | Fold-layer and branch-chart material already has the right proof vocabulary; use this OpenAlex baseline if a simulation packet starts consuming those rows. | Follow-up only if a run is selected. |
| [master-equation-closure baseline](../master-equation-closure/openalex-baseline.md) | Rank-1 baseline already captured state-dependent delay compatibility. This simulations baseline is the numerical/regularization counterpart. | Cross-workstream linkage established. |

## Next Use

Use this baseline when advancing the rank-3 workstream:

1. For `tier0_tier1_runs`, require the corrected one-period branch-equation attempt to emit $\mathcal{T}_{\eta,*}$ for every fold-layer or active-root status transition in the retained period.
2. For `convergence_and_provenance`, add transition-window residuals only if the implementation can emit them as rows in `convergence_table.csv`; otherwise keep them in `failure_report.md` as a non-promotional diagnostic.
3. For `eta_positive_package`, prove that $\mathsf{WP}_\eta$, $\mathsf{NR}_\eta$, and $\mathsf{Cont}_\eta$ apply across each accepted $\mathcal{T}_{\eta,*}$ rather than only on simple-root intervals.
