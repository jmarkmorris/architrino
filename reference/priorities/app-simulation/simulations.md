# Simulation Detailed Priority Packets

This file preserves detailed simulation protocols, campaign objects, acceptance contracts, and executable diagnostics during the ownership consolidation recorded in the [routing index](priorities.md). It is not an independent workstream or evidence authority. Each section advances only through the canonical owner named in that index. Loose idea and open-question material lives in [brainstorming.md](brainstorming.md).

## Hydrogen Native Extractor Boundary

The May 22, 2026 hydrogen inspection did not find a native $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ derivation packet. The missing row is
$$
\mathsf{N}_{\mathrm H,\mathrm{spec}}^{(\ell)}
:
\left(
S(T)|_{\Omega_{\mathrm H}},
\mathcal A_{\mathrm H}(t),
C_{\ell,\mathrm{spec}},
\Pi_{\mathrm{spec}}
\right)
\mapsto
\left(
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
D_{p,\mathrm{spec}}^{(\ell)},
D_{e,\mathrm{spec}}^{(\ell)},
\mathbf g_{N,\mathrm H}^{(\ell)},
\{\Delta E_{\mathrm{env}}^{(\ell)}(a,b)\},
\{\nu_{a\to b}^{\mathrm{obs},(\ell)}\},
\mathbf a^G_{\mathrm H}
\right).
$$
Its response decomposition must be native to the same hydrogen spectral channel ledger:
$$
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}
=
\Theta_{\mathrm{bg},\mathrm{spec}}^{(\ell)}
+
\delta\Theta_{p(uud),\mathrm{spec}}^{(\ell)}
[\mathcal W_{p,\mathrm{spec}}^{\mathrm{locked}},D_{p,\mathrm{spec}}]
+
\delta\Theta_{e\text{-env},\mathrm{spec}}^{(\ell)}
[\mathcal B_e,D_{e,\mathrm{spec}}].
$$
The smallest executable target is two admissible atomic resolutions and at least two isolated hydrogen transitions emitted from one $S(T)|_{\Omega_{\mathrm H}}$ provenance ledger, with $\mathbf g_{N,\mathrm H}^{(\ell)}$, envelope gaps, observer frequencies, and $\mathbf a^G_{\mathrm H}$ all coming from that same ledger.

Historical May 22, 2026 promotion note is preserved in [work-log.md](work-log.md#2026-07-02-may-22-2026-promotion-note).

## Field-Speed Action Self-Hit Scan Packet

The priority-side campaign target for `field_speed_action_self_hit_scan` is the non-promotional packet
$$
\mathcal{C}_{c_f}^{\mathrm{self/action}}
=
\left(
\mathcal{C}_{\mathrm{sim}},
\mathcal{B}_{\Delta I},
\mathcal{S}_{c_f},
\mathcal{R}_{c_f},
\mathcal{N}_{\mathrm{dN}},
\mathcal{E}_{\mathrm{p+w}},
\mathcal{P}_{c_f}
\right),
$$
where $\mathcal{B}_{\Delta I}$ is the retained branch-row set from the nested shell braid action-increment protocol, $\mathcal{S}_{c_f}$ is the binary approach-to-$c_f$ scan grid, $\mathcal{R}_{c_f}$ is the retained root-ledger and branch-selection row family, $\mathcal{N}_{\mathrm{dN}}$ records the delayed-Noether status, $\mathcal{E}_{\mathrm{p+w}}$ is the particle-plus-wake energy row, and $\mathcal{P}_{c_f}$ is the promotion-blocker ledger. This packet is priority-only until executable artifacts exist and pass the same source-commit, refinement, negative-control, and artifact-hash rules as $\mathcal{C}_{\mathrm{sim}}$.

The scan variables are declared before output inspection:

| Variable | Meaning | Pre-run declaration |
| --- | --- | --- |
| $\mathsf{branch\_row\_id}$ | Nested shell braid endpoint or transition row consumed from $\mathcal{B}_{\Delta I}$ | Must match the row identifiers used by `action_increment_rows.csv`; no scan-only branch row may vote on `candidate_h_recovery`. |
| $a$ | Scanned layer or speed coordinate | Must name the layer speed ratio being varied while all unscanned branch labels, plane normals, endpoint charges, and transaction axis remain declared. |
| $\beta_a=s_a/c_f$ | Dimensionless field-speed coordinate | The only scan coordinate for approach-to-$c_f$ status; fitted reparameterizations are diagnostic-only. |
| $W=[t_0,t_1]$ and $P$ | Analysis window and declared cycle or certificate period | Must match the action-increment packet window when the row contributes to stable-cycle clustering. |
| $(\Delta t,\Delta h,\Delta x,\eta)$ | Temporal, history, spatial, and regulator resolutions | Must include at least one refinement pair for each active gate: $(\Delta t,\Delta t/2)$, $(\Delta h,\Delta h/2)$, $(\Delta x,\Delta x/2)$, and $(\eta,\eta/2)$ when the run makes a regulator claim. |
| $\nu_{\min}$ and $B_{\max}$ | Minimum accepted Jacobian floor and active-root count bound | Must be declared before the scan; rows that choose these after seeing near-boundary behavior route to $\mathsf{hidden\_tuning}$. |
| $\tau_{E,\mathrm{p+w}}$ and $\tau_{\Delta I}$ | Energy-drift and action-cluster tolerances | Must be no looser than the tolerances in the action-increment packet that consumes the row. |

The binary scan grid is
$$
\mathcal{S}_{c_f}
=
\left\{
1-2^{-m}:m\in\{6,7,8,9\}
\right\}
\cup
\mathcal{S}_{=}
\cup
\mathcal{S}_{+},
$$
with
$$
\mathcal{S}_{=}
=
\begin{cases}
\{1\},&\text{if the finite-}\eta\text{ continuation reaches }\beta_a=1\text{ without leaving }\mathcal{A}_\eta,\\
\varnothing,&\text{otherwise,}
\end{cases}
$$
and
$$
\mathcal{S}_{+}
=
\begin{cases}
\{1+2^{-9},1+2^{-8},1+2^{-7},1+2^{-6}\},&\text{if the declared branch chart admits that super-field-speed interval,}\\
\varnothing,&\text{otherwise.}
\end{cases}
$$
The below-boundary rows are mandatory for the first artifact. The boundary and super-field-speed rows are retained as explicit `not-admitted` or `eta-continuation-failure` rows when the declared continuation cannot lawfully enter them; omitting them silently makes the artifact incomplete.

Each retained row in `field_speed_approach_scan.csv` must contain:

| Column family | Required entries |
| --- | --- |
| Identity | `scan_family_id`, `branch_row_id`, source commit, run id, protocol version, $\beta_a$, speed-window label `below_cf` / `at_cf` / `above_cf`, and refinement level. |
| Root ledger | Active partner-root count, active self-root count, active inter-layer-root count, excluded near-zero self-root count, separator count, active-root identity hash, root-ledger refinement match flag, and transition-record hash when a fold-layer, separator, or active-root status window is crossed. |
| Jacobian and branch status | Minimum accepted $|J|$, declared $\nu_{\min}$, branch-selection verdict, branch-status label, and failure code if the row is rejected. |
| Action and energy | $\Delta I_{\mathrm{ME}}$, cluster id, cluster spread contribution, $E_{\mathrm{p+w}}^{(\eta)}(t_0)$, $E_{\mathrm{p+w}}^{(\eta)}(t_1)$, and $\epsilon_{E,\mathrm{p+w}}$. |
| Noether status | Delayed-Noether status `action-derived`, `quasi-Noether`, or `diagnostic-only`, plus the artifact that justifies the status. |
| Promotion blockers | Boolean columns for root identity change, Jacobian floor loss, unbounded or nonconvergent particle-plus-wake energy, `diagnostic-only` Noether status, nonuniform action spacing, missing negative-control failure, missing artifact hash, and hidden tuning. |

The particle-plus-wake energy row is
$$
E_{\mathrm{p+w}}^{(\eta)}(t)
=
K_{\mu}(t)+E_{\mathrm{wake}}^{(\eta)}(t),
\qquad
\epsilon_{E,\mathrm{p+w}}
=
\frac{
\sup_{t\in W}\left|E_{\mathrm{p+w}}^{(\eta)}(t)-E_{\mathrm{p+w}}^{(\eta)}(t_0)\right|
}{
\left|E_{\mathrm{p+w}}^{(\eta)}(t_0)\right|+\varepsilon_0
}.
$$
If $E_{\mathrm{wake}}^{(\eta)}$ lacks a lower bound on the same branch row, the scan status is `energy-row-unbounded` and no action-spacing promotion may consume the row.

Failure routing requires verification for advancement:

| Condition | Status or failure code |
| --- | --- |
| Required campaign metadata, source commit, declared tolerance, or artifact hash is missing | $\mathsf{artifact\_incomplete}$ |
| $\beta_a$, $\nu_{\min}$, $\tau_{E,\mathrm{p+w}}$, $\tau_{\Delta I}$, branch labels, or promoted observables are changed after output inspection | $\mathsf{hidden\_tuning}$ |
| Active-root identity changes under $\Delta t$, $\Delta h$, $\Delta x$, or $\eta$ refinement without a certified separator or fold-layer explanation | $\mathsf{branch\_root\_instability}$ |
| A boundary or super-field-speed row is not admitted by the declared branch chart | `not-admitted` |
| The minimum accepted $|J|$ falls below $\nu_{\min}$ on a retained near-boundary row | `jacobian-floor-loss` |
| $E_{\mathrm{p+w}}^{(\eta)}$ is unbounded or lacks a lower bound on the same branch row | `energy-row-unbounded` |
| $E_{\mathrm{p+w}}^{(\eta)}$ is nonconvergent or exceeds $\tau_{E,\mathrm{p+w}}$ | $\mathsf{conservation\_drift}$ |
| The finite-$\eta$ continuation leaves $\mathcal{A}_\eta$ before completing the declared row | $\mathsf{eta\_continuation\_failure}$ |
| The delayed-Noether row remains `diagnostic-only` | `noether-diagnostic-only` |
| Stable-cycle $\Delta I_{\mathrm{ME}}$ rows split into multiple clusters without a derived branch-class reason | `nonuniform-action-spacing` |
| The negative control also passes the scan gates | $\mathsf{null\_control\_passed}$ |
| All declared rows pass with artifact hashes and the action-increment packet also passes its own gates | `candidate_h_recovery-eligible` |

The minimal first executable artifact is `field_speed_action_self_hit_scan/v0`: one declared scan family over one already-retained nested shell braid action-increment branch row, the four mandatory below-$c_f$ values in $\mathcal{S}_{c_f}$, one temporal refinement pair, one history-resolution refinement pair, the active-root identity hash at both refinements, $J_{\min}$, $\Delta I_{\mathrm{ME}}$, $E_{\mathrm{p+w}}^{(\eta)}$, delayed-Noether status, a wrong-$c_f$ negative control, `field_speed_approach_scan.csv`, and `failure_report.md`. This v0 artifact may only produce `diagnostic-only`, one of the Not advanced dispositions above, or `candidate_h_recovery-eligible` priority statuses; it may not assert accepted physics or theorem-level conservation.

### V0 Source-Row Binding

The first v0 row must bind to an action-increment source before any scan output is interpreted. The binding object is

$$
\mathcal{B}_{c_f}^{v0}
=
\left(
\mathsf{branch\_row\_id},
\mathsf{endpoint\_eligibility},
\mathsf{action\_row\_hash},
\mathsf{root\_ledger\_hash},
\mathsf{conservation\_pullback\_hash},
\mathsf{source\_verdict}
\right).
$$

The `endpoint_eligibility` value is inherited from the nested shell braid action-increment protocol. Because that protocol sets $\mathcal{T}_{\mathrm{acc}}=\varnothing$ until both endpoint packets have matching ledger identity, matching active-root convention, positive Jacobian floors, finite transmitter-side acceleration-contribution intervals, inactive-root or tail status, $\Delta_{\mathbf{k}}>0$, conservation pullback, and refinement records, the field-speed scan has only two legal pre-acceptance modes:

| Source verdict | Meaning | Allowed v0 interpretation |
| --- | --- | --- |
| `accepted_transition_source` | The named `branch_row_id` is an accepted action-increment transition row with source hashes for the same root ledger and conservation pullback. | May test `candidate_h_recovery-eligible`, subject to all scan gates. |
| `diagnostic_rejected_endpoint_source` | The named `branch_row_id` is present in the action-increment packet but rejected by endpoint eligibility or conservation pullback. | May emit only `diagnostic-only` or a Not advanced disposition. |
| `source_row_binding_open` | No named action-increment row and matching hashes exist. | The scan artifact is incomplete and cannot vote on action spacing, self-hit well-posedness, or `candidate_h_recovery`. |

This binding rule is not an additional promotion gate. It is the row-identity bridge between `action_increment_rows.csv` and `field_speed_approach_scan.csv`. If a run only has a visual branch, an unversioned notebook row, or a row whose root ledger and conservation pullback hashes differ, the correct v0 result is `source_row_binding_open` before any near-$c_f$ behavior is interpreted.

Current fixture boundary, 2026-06-28. The repository contains the shape-only fixture packet under `scripts/nested-shell-braid/fixtures/action-increment-packet/`. Its `action_increment_rows.csv` includes two fixture rows with `status=accepted`, but `cluster_summary.json` declares `promotion_status: fixture-shape-only`. Therefore those rows may validate parser shape and failure-code plumbing only. They do not satisfy `accepted_transition_source`, do not bind to a retained branch certificate, and do not authorize `field_speed_action_self_hit_scan/v0` to vote on `candidate_h_recovery`. Current live v0 status remains `source_row_binding_open` until a non-fixture action-increment packet emits matching root-ledger and conservation-pullback hashes.

Minimum non-fixture `accepted_transition_source` object:

| Field | Required content | Fixture packet reading |
| --- | --- | --- |
| `transition_source_ref` | Path or generated artifact id for the branch-emitted transition source. | fixture-only |
| `branch_certificate_ref` | Retained branch certificate that owns the source row. | absent |
| `root_ledger_hash` | Hash of the active-root ledger consumed by the action-increment row. | absent for live binding |
| `conservation_pullback_hash` | Hash of the conservation-pullback row consumed by the same action-increment row. | absent for live binding |
| `action_increment_row_id` | Named non-fixture action-increment row with accepted status. | fixture row only |
| `negative_control_ref` | Control required for advancement showing mismatched root or conservation hashes reject. | absent |
| `candidate_h_recovery_vote` | May be emitted only after every row above binds on the same retained branch record. | not authorized |

Current source-binding report object: `field_speed_action_self_hit_scan_source_binding_report/v0`. It now embeds the priority-only acceptance artifact `field_speed_action_self_hit_scan_source_acceptance_contract/v0`, which orders the same-record source requirements and reports the first blocking field before any scan output is interpreted.

| Field | Current reading | Verdict |
| --- | --- | --- |
| `transition_source_ref` | `scripts/nested-shell-braid/fixtures/action-increment-packet/` | first required source field; blocked by `fixture_shape_only_packet_not_source` |
| `action_increment_row_id` | fixture row `fixture-B12-B13-a` | blocked by `fixture_action_increment_row_not_source` |
| `branch_certificate_ref` | absent | next branch-ownership blocker after a non-fixture source exists |
| `action_row_hash` | fixture row `fixture-B12-B13-a` now hashes to `sha256:0f6bab71d0aec1882afcbd9dcbe40f97f19a90ef928f85f392ed5602160d7bb9`; absent for a non-fixture row | `source_row_binding_open` |
| `root_ledger_hash` | absent for live binding | `source_row_binding_open` |
| `conservation_pullback_hash` | absent for live binding | `source_row_binding_open` |
| `source_verdict` | fixture rows have `status=accepted`, but `promotion_status=fixture-shape-only` | `diagnostic_rejected_endpoint_source` for closure purposes |
| `negative_control_ref` | absent | hash-mismatch control required before advancement still required |
| `candidate_h_recovery_vote` | not authorized | no simulation vote |

Executable report status, 2026-06-28: `scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs` emits and validates the source-binding report object. Running it on the fixture packet with `--branch-row-id fixture-B12-B13-a` produces `source_verdict=diagnostic_rejected_endpoint_source`, `first_failure=source_row_binding_open`, `first_required_source_field=transition_source_ref`, `first_missing_or_rejected_failure_code=fixture_shape_only_packet_not_source`, `source_acceptance_contract.status=blocked`, and `candidate_h_recovery_vote=not_authorized`.

The fixture packet, blocked source-contract fixture, and rank-2 transition-source attempt at `scripts/nested-shell-braid/fixtures/action-increment-source-contract-rank2-transition-source-attempt.json` can test parser, failure-code, and source-binding behavior, but they do not satisfy `accepted_transition_source`. The rank-2 attempt intentionally provides a populated transition shell with no accepted branch-state source; the checker therefore fails at the accepted-source boundary while keeping the benchmark policy clean. The first executable closure move is a non-fixture action-increment row with a retained branch certificate, matching active-root and conservation-pullback hashes, and a failing negative control for mismatched hashes.

The remaining promotion blockers are executable, not editorial: no current artifact has shown same-row active-root identity under refinement, a positive Jacobian floor through the approach-to-$c_f$ scan, bounded particle-plus-wake energy on the retained branch rows, delayed-Noether status above `diagnostic-only`, stable one-cluster $\Delta I_{\mathrm{ME}}$ behavior, and a failing negative control with content hashes.

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
I_h^q,
\mathcal{L}_{\mathrm{root}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big),
$$
where $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_h$ is the spatial mesh and history mesh, $\Delta t$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_h^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the finite-$\eta$ transition-record family when the run crosses fold, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

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

The interpolation operator $I_h^q$ must be declared before delayed source states are evaluated. Its history-resolution diagnostic is
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})-I_{\Delta h}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}+\varepsilon_0
}.
$$
When a nonsmooth state-dependent delay row appears, disappears, or crosses a fold-layer, the campaign must also emit a jump/transition ledger
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
\Delta_{\eta,\mathrm{root}},
E_{\mathrm{hist}},
E_{\mathrm{jump}}
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

The history and jump components use the declared interpolation operator and transition ledger:
$$
E_{\mathrm{hist}}\le\tau_{\mathrm{hist}},
\qquad
E_{\mathrm{jump}}
=
\max_a R_{\mathrm{jump},a}
\le\tau_{\mathrm{jump}}.
$$
Missing interpolation rows route to $\mathsf{artifact\_incomplete}$; unstable branch or jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

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

## Public Gravitational-Wave Benchmark Campaign

A gravitational-wave benchmark campaign is a specialization of $\mathcal{C}_{\mathrm{sim}}$:
$$
\mathcal{C}_{\mathrm{GWOSC}}
=
\big(
\mathsf{event\_id},
\mathsf{catalog},
\mathsf{event\_version},
\mathcal{D},
\mathcal{S}_{h},
\mathcal{P}_{\mathrm{PE}},
\mathcal{P}_{\mathrm{wave}},
\mathcal{Q}_{\mathrm{det}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{R}_{\mathrm{GW}},
\Pi_{\mathrm{wave}},
\mathcal{F}
\big),
$$
where $\mathcal{D}$ is the detector set, $\mathcal{S}_{h}$ is the versioned public strain-file set, $\mathcal{P}_{\mathrm{PE}}$ names posterior samples and parameter-estimation lifecycle rows, $\mathcal{P}_{\mathrm{wave}}$ names the waveform family or numerical-relativity provenance used for comparison, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the predeclared waveform residual vector, and $\Pi_{\mathrm{wave}}$ maps each plotted or fitted sample back to public artifacts.

The executable diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big),
$$
with
$$
D_h=\frac{R_h}{\tau_h},
\qquad
D_\phi=\frac{R_\phi}{\tau_\phi},
\qquad
D_E=\frac{R_E}{\tau_E},
\qquad
D_{c_g}=\frac{|R_{c_g}|}{\tau_{c_g}}.
$$
$D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, PE release metadata, and artifact hashes are all present. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$
and the public-data provenance row was fixed before the waveform comparison. If a packet reweights posterior samples, changes waveform family, excludes a detector, changes the analysis band, or substitutes cleaned data after seeing the residuals, the change must appear as a new event-version row rather than an in-place correction.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff. | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and PE waveform-family record. | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with luminosity distance, observed delay, and intrinsic source-emission lag nuisance. | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This campaign is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its incremental value is that public strain, PE samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing GR waveform success as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

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
D_{\eta},
D_{\mathrm{jump}}
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
\frac{E_{\mathrm{hist}}}{\tau_{\mathrm{hist}}},
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
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}},
\qquad
D_{\mathrm{jump}}
=
\frac{E_{\mathrm{jump}}}{\tau_{\mathrm{jump}}}.
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
| $D_{\mathrm{jump}}>1$ or jump identities are unstable under refinement | $\mathsf{branch\_root\_instability}$ |
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

Tier 0 accepts a speed-ordered nested shell braid row only if the row declares the ordering inequalities used by the branch label and verifies them as strict inequalities, for example
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
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{D}_{\mathrm{exec}},
\mathsf{failure\_code},
\mathsf{promotion\_status}
\big).
$$
where $\mathcal{T}_{\eta}$ is present whenever the run crosses a fold-layer, separator, or active-root status window. Proof packets may consume a transition-sensitive run only if the simulation handoff carries the same transition record required by the run protocol. It must state whether every expected active root was matched under $\Delta t$, $\Delta h$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value. A proof-program packet may cite a Tier 1 run only through this handoff; a plot, best-fit branch, or un-hashed table is not simulation support for a theorem target.

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

A tier-1 artifact packet must contain the tier-0 packet hash, `run_metadata.json`, `u_now_provenance.csv` or `u_now_provenance.parquet`, `observables/phi_timeseries.csv`, `observables/grad_phi_timeseries.csv`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `independent_reference_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`.

A Tier 1 packet making a numerical-correctness claim must include `independent_reference_report.md`, naming the closed form, theorem, analytically known case, or separately authored instrument used as its oracle.

The tier-1 plot contract requires `plots/convergence_phi.png`, `plots/convergence_grad_phi.png`, `plots/provenance_t_emit_distribution.png`, `plots/eta_ladder.png`, `plots/conservation_drift.png`, and one branch-ledger stability plot whose axes are the refinement level and matched active root count.

The tier-1 `failure_report.md` must exist even on pass and must report $\mathcal{F}=\mathsf{pass}$, the null-control verdict, the artifact hashes, the declared tolerances, and the statement that no promoted observable or tolerance was selected after output inspection.

The promotion artifact `promotion_lemma_check.md` must list the exact priority-theory claim $Q$, the variables of $Q$, the artifacts containing those variables, each inequality in the numerical promotion lemma, the pass/fail value of each inequality, and the resulting promotion status.

## Main Work

- Implement tier-0 and tier-1 simulations by instantiating $\mathcal{C}_{\mathrm{sim}}$ and satisfying the tier acceptance criteria above before any result is used in [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) or the `validation/simulations/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / nested shell braid stability numerically only when the branch-root ledger is stable under $\Delta t$, $\Delta h$, and $\eta$ refinement.
- Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs only as promotion artifacts paired with `convergence_table.csv`, `u_now_provenance.*`, `failure_report.md`, and `promotion_lemma_check.md`.
- Consolidate the formal $\eta > 0$ package by verifying $\mathsf{WP}_\eta$, $\mathsf{NR}_\eta$, $\mathsf{Cont}_\eta$, and $\partial\mathcal{A}_\eta$ for each promoted run family.
- Tie the Planck mapping back to the master equation only through simulation-supported priority claims whose variables are present in $\mathcal{C}_{\mathrm{sim}}$ and whose regulator-dependence row passes.
- Build any quick intuition tool for escaping potential versus frequency only as a non-promotional diagnostic unless it emits the campaign object, root ledger, convergence table, provenance log, and failure report.

## Related Priorities

- [master-equation-closure](../master-equation-closure/priorities.md)
- mass-map
- doubling-frequency-lock
- [mapping-quantum](../mapping-quantum/priorities.md)
- [mapping-strong-field](../mapping-strong-field/priorities.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md)
- [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md)
- [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md)
- [planck-scale-nested-shell-braid-alignment](../../../content/markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md)

## Preserved Implementation Contracts

These unimplemented interface details were separated from reader-facing exposition on 2026-08-30. This archival placement does not reactivate the retired app-simulation workstream or authorize implementation. Scientific conditions remain in the linked corpus chapters; future execution follows current solver and theory ownership.

### Reduced A0 result interface

Source: [a0-tier0-result-interpretation.md](../../../content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md). This is an unimplemented interface specification, not computed evidence or authorization to run a campaign.

**Implementation status:** not implemented. The specified path `scripts/mass-map/a0-tier0-branch-search.mjs` does not currently exist in the repository. The tables below define the required output contract; they do not report an executed artifact or measured branch result.

## Output Status

The planned runtime must emit rows with six separate layers of interpretation:

| Output layer | Meaning | Promotion role |
| --- | --- | --- |
| `z_lambda` | Quotient-coordinate row $z_\Lambda$ after removing global rotations, the common closed-cycle phase gauge, and allowed branch-preserving chart relabelings | Decides whether the row can be read as a reduced moduli coordinate rather than a raw carrier representative |
| `root_ledger` | Active and raw causal-root counts by source relation, with excluded instantaneous self-root counts separated from active roots | Decides whether the carrier chart has a finite active partner, self, and inter-layer ledger |
| `residuals` and `residual_values` | The complete $\mathcal{R}_{A_0}$ row surface, plus a numeric mirror where Tier 0 omissions remain null | Prevents a numerical value, a diagnostic placeholder, and a later-tier obligation from being confused |
| `Delta_k` | $\Delta_{\mathbf{k}}$ handoff object with null value and `not_computed_in_tier0` status until Tier 1 builds the return map | Keeps Floquet stability from being silently omitted or treated as a Tier 0 result |
| `certificate_gates` | Pass/fail/not-computed status for the Tier 0 promotion checks | Decides whether the row may seed Tier 1 continuation |
| `failure_code` | One machine-readable row code, or `candidate` when the row survives Tier 0 | Gives scripts and readers the same rejection reason |

A record with `failure_code: "candidate"` may seed Tier 1. Any other `failure_code` rejects Tier 0 continuation until the named gate is resolved. This is the sole row-level status vocabulary; `certificate_gates.tier0_continuation` is its gate-level mirror. Neither outcome accepts an attractor, computes $\zeta(A_0)$, validates $E_{\text{internal}}(A_0)$, or derives $\mathcal{M}_{\text{sea}}^{ab}$.

The same boundary applies when a compact finite-coordinate chart or coarse branch split fails. Such a failure means the proposed reduced coordinate did not earn a continuation run; it does not by itself falsify the broader $A_0$ branch program. A branch-chart checker can authorize only a new Tier 1 rerun path after the coordinate source, equality map, fit degrees of freedom, held-out residuals, phase-origin handling when relevant, and benchmark exclusions are declared before fitting. It does not create accepted history, and it does not convert Tier 0 readiness into an attractor claim.

| `z_lambda` entry | Row semantics |
| --- | --- |
| `schema` | version marker for the quotient-coordinate row |
| `radius_ratios` | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| `period_ratios` | $P_I/P_M$ and $P_M/P_O$, where $P_I,P_M,P_O$ are the cycle periods for the declared layer aliases, so time-scale separation is checked alongside radius separation |
| `delta_2` | source-record binary-2 speed offset $(s_2-c_f)/c_f$; `delta_M` may appear only as a documented input alias and must normalize to `delta_2` before validation |
| `ellipticity` and `ellipticity_status` | layer ellipticity data and whether Tier 0 used a shared scalar chart |
| `plane_gram` | $G_{\ell m}$ values for the quotient-reduced binary-plane normals |
| `orientation_class` | $\chi_N$, the triple product, and a nondegenerate or degenerate status |
| `handedness` | $H_1,H_2,H_3$ persistent-index handedness labels, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| `phase_offset_quotient` | $\Phi_{\text{rel}}$ status after removing the common $S^1_{\mathbf{k}}$ phase origin; the planned Tier 0 schema uses a gauge-fixed zero-offset representative and marks the quotient basis `not_computed_in_tier0` |
| `branch_class` and `branch_class_status` | $[\Lambda]$ data from winding integers, inter-layer closure, active and raw root classes, and excluded roots; Tier 0 marks the representative as not yet a canonical discrete quotient |
| `removed_gauges` | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| `quotient_degenerate` | Boolean failure surface for `quotient-degenerate` |

The `Delta_k` object is the Tier 0 handoff for $\Delta_{\mathbf{k}}$. Tier 0 does not construct the monodromy operator, so a conforming packet must use a null value, status `not_computed_in_tier0`, and role `tier1_required`. The reserved failure code is `nonpositive-floquet-gap`, which applies only after Tier 1 computes $\Delta_{\mathbf{k}}\le0$.

The same handoff appears in `certificate_gates.floquet_gap` with status `not_computed_in_tier0`. This is a positive omission rule: Tier 0 must show that Floquet stability remains open, not leave the field absent.

## Certificate Gates and Failure Codes

The Tier 0 `certificate_gates` object names the promotion checks directly:

| Gate | Meaning |
| --- | --- |
| `quotient_coordinates` | $z_\Lambda$ must be nondegenerate after global rotations are removed |
| `scale_separation` | radius and period ratios must remain inside the declared separated-scale regime |
| `speed_ordering` | $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ must hold within tolerance |
| `phase_closure` | layer winding closure over $P_{\mathbf{k}}$ must hold |
| `carrier_residuals` | state return and center drift residuals must remain bounded |
| `root_residual` | active causal-root defects must remain within tolerance |
| `active_root_ledger` | partner, self, and inter-layer active root classes must all be present |
| `active_separator_roots` | active near-separator roots must have an explicit continuation rule or remain below allowance |
| `near_zero_self_roots` | near-zero self roots remain excluded under $H(0)=0$ and may not count as active self hits |
| `residual_vector_semantics` | every residual component must carry value, tolerance, status, role, and note fields |
| `floquet_gap` | $\Delta_{\mathbf{k}}$ is not computed at Tier 0 and must be computed in Tier 1 |
| `tier0_continuation` | only rows whose row-level code is `candidate` may seed Tier 1 |

The row-level `failure_code` enum preserves the existing Tier 0 codes and reserves the new quotient and Floquet codes:

| Code | Meaning |
| --- | --- |
| `candidate` | the row survives Tier 0 and may seed Tier 1 only |
| `quotient-degenerate` | the quotient-coordinate row is degenerate after gauge removal |
| `scale-separation-collapse` | radius or period ratios collapse the declared separated-scale regime |
| `speed-order-collapse` | sign-aware speed ordering fails |
| `phase-closure-open` | integer layer-winding closure fails |
| `carrier-residual-open` | carrier return or drift residuals fail |
| `root-residual-open` | active causal-root residuals fail |
| `averaging-residual-open` | terms claimed to average out exceed their declared tolerance |
| `locking-residual-open` | selected locking terms exceed their declared tolerance |
| `separator-singularity-unresolved` | active near-separator roots lack an accepted handling rule |
| `near-zero-self-root-excluded` | excluded instantaneous self roots block Tier 0 promotion |
| `root-ledger-instability` | the active root ledger is empty or lacks partner, self, or inter-layer classes |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ |



### A0 certificate interface

Source: [A0 Branch Certificate Protocol](../../../content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md). These schemas and paths are preserved specifications, not completed implementation or branch evidence.

## Certificate Packet Schema

An auditable $A_0$ branch certificate should preserve one top-level packet shape across all tiers. Fields that are not computed at a given tier must remain present with an explicit status, role, and note rather than disappearing from the packet.

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the packet reproducible |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| `branch_label` | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| `z_lambda` | quotient-coordinate row $z_\Lambda$: $\varepsilon_{12}$, $\varepsilon_{23}$, $T_1/T_2$, $T_2/T_3$, $\delta_2$, binary ellipticities, $G_{\ell m}$, $\chi_N$, $H_1,H_2,H_3$, $\Phi_{\text{rel}}$, removed gauges $SO(3)$, $S^1_{\mathbf{k}}$, $\Gamma_\Lambda$, branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| `branch_chart_revision` | conditional pre-rerun record for any revised reduced branch coordinate, including source fields, equality map, equation and coefficient counts, held-out residual rule, phase-origin rule when a phase split is used, symmetry or quotient behavior, locked-key exclusion, benchmark exclusion, and `accepted_history_boundary: false` | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| `state_vector` | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| `closure_system` | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| `root_ledger` | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| `term_classification` | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | prevents internal corrections from being hidden before promotion |
| `residuals` | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | gives a machine-checkable promotion surface with later-tier omissions explicit |
| `residual_values` | numeric mirror of $\mathcal{R}_{A_0}$ values, with Tier 0 omissions recorded as null rather than hidden | gives scripts a stable audit surface without erasing row semantics |
| `Delta_k` | $\Delta_{\mathbf{k}}$ value, status, role, nonpositive-gap failure code, and note; Tier 0 emits null with `not_computed_in_tier0` | keeps the Floquet handoff visible before Tier 1 computes the return map |
| `stability` | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists | separates integer closure from attractor stability |
| `group_velocity_anisotropy` | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| `energy_ledger` | sign-resolved kinetic content, interaction terms, wake/history terms, binary totals $E_1,E_2,E_3$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
| `far_field_shielding` | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| `medium_response` | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | compatibility field for testing Noether sea inertial and gravitational response after shielding passes |
| `mass_summary` | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
| `certificate_gates` | pass/fail/not-computed gates for quotient nondegeneracy, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root-ledger stability, active separator-root handling, near-zero self-root handling, residual semantics, Floquet handoff, and Tier 0 continuation | controls promotion between branch search, attractor, shielding, and response claims |
| `failure_code` | reason the row or packet failed, or the next allowed promotion status | prevents failed packets from being read as mass-map results |

Required outputs:

| Output | Meaning |
| --- | --- |
| `branch_label` | indexed-binary windings, inter-binary closure integers, handedness, and active root-branch summary |
| `closure_labels` | declared $P_{\mathbf{k}}$, winding integers, inter-binary closure integers, and active root classes |
| `z_lambda` | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_2$, binary ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and `quotient_degenerate` |
| `state_vector` | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| `closure_system` | active causal-root, phase-closure, inter-binary closure, center-gauge, and speed-ordering equations used by the row |
| `root_ledger` | active and raw partner, self, and inter-binary root counts with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated |
| `term_classification` | terms assigned to averaging, locking, and leakage channels |
| `residuals` | every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note fields; $\mathcal{R}_{E}$ and $\mathcal{R}_{\text{Floquet}}$ are explicit Tier 0 omissions unless supplied by a later diagnostic |
| `residual_values` | numeric value mirror for the same $\mathcal{R}_{A_0}$ components, with omitted components recorded as null |
| `Delta_k` | $\Delta_{\mathbf{k}}$ status object; Tier 0 sets value to null and status to `not_computed_in_tier0` until Tier 1 constructs the monodromy or finite-difference return map |
| `group_velocity_anisotropy` | rest-branch residue if computed, or an explicit not-computed Tier 0 status; no Tier 0 row may use this as shielding evidence |
| `certificate_gates` | pass/fail/not-computed gates for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root ledger, active separator roots, near-zero self roots, residual vector semantics, $\Delta_{\mathbf{k}}$, and Tier 0 continuation |
| `failure_code` | reason the row failed, or `candidate` if it survives Tier 0 |

Tier 0 passes only if at least one row has a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. Passing Tier 0 only authorizes Tier 1 continuation.

### Tier 0 Failure-Code Enum

The row-level `failure_code` field is a machine-readable enum. The accepted values are:

| Code | Trigger | Promotion consequence |
| --- | --- | --- |
| `candidate` | all Tier 0 promotion gates pass | row may seed Tier 1 continuation only |
| `quotient-degenerate` | $z_\Lambda$ has degenerate plane-normal Gram or orientation data after quotienting global rotations | reject the row as a reduced moduli coordinate |
| `scale-separation-collapse` | radius or period ratios violate the declared separated-scale Tier 0 regime | reject the row or widen the scan only as a controlled scale-separation test |
| `speed-order-collapse` | $\mathcal{R}_{\text{speed}}$ fails the declared $s_1 > c_f$, $s_2 \approx c_f$, $s_3 < c_f$ constraint | reject the row before attractor continuation |
| `phase-closure-open` | $\mathcal{R}_{\text{phase}}$ fails layer winding closure over $P_{\mathbf{k}}$ | reject the row until integer closure is restored |
| `carrier-residual-open` | $\mathcal{R}_{\text{state}}$ or $\mathcal{R}_{\text{drift}}$ fails the Tier 0 carrier chart tolerance | reject the row as an unclosed diagnostic carrier |
| `root-residual-open` | $\mathcal{R}_{\text{root}}$ fails on candidate active causal-root branches | reject the row until active roots solve within tolerance |
| `averaging-residual-open` | $\mathcal{R}_{\text{avg}}$ fails its declared averaging tolerance | keep the term in the branch equations or reject the row |
| `locking-residual-open` | $\mathcal{R}_{\text{lock}}$ fails its declared locking tolerance | keep the near-separator or resonance term in Tier 1 or reject the row |
| `separator-singularity-unresolved` | active near-separator roots exceed the configured allowance without a locking continuation rule | reject the row until separator handling is explicit |
| `near-zero-self-root-excluded` | excluded near-zero self roots exceed the configured allowance under $H(0)=0$ | reject the row until a positive-delay self branch or regularized fold-layer rule exists |
| `root-ledger-instability` | the active causal-root ledger is empty or lacks partner, self, or inter-layer classes | reject the row as a finite-ledger failure |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ | reject the branch as a non-attractor even if integer closure holds |

At Tier 0, `nonpositive-floquet-gap` appears only as the reserved `Delta_k.failure_code_if_nonpositive` and `certificate_gates.floquet_gap.failure_code`, because Tier 0 does not compute $\Delta_{\mathbf{k}}$.

## Planned Runtime Artifacts

**Implementation status:** not implemented. The following paths are reserved by this specification but do not currently exist:

- `scripts/mass-map/a0-tier0-branch-search.mjs`
- `scripts/mass-map/a0-tier0-default-grid.json`
- `scripts/mass-map/a0-tier1-continuation-scaffold.mjs`
- `scripts/audit-a0-mass-map-promotion.mjs`

The Tier 0 implementation must be an algebraic branch-search scaffold, not a production simulator. It must emit candidate records with parameter choices, quotient coordinates, carrier diagnostics, root ledgers, term classifications, residual surfaces, $\Delta_{\mathbf{k}}$ handoff status, leakage placeholders, certificate gates, and failure codes matching this protocol. The Tier 1 scaffold must consume those records and emit the $\eta>0$ continuation contract and required artifact list; it cannot certify the branch without a later delayed-dynamics run. The planned audit must reject prose that promotes $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ before the tier gates pass.



### Retuning arithmetic interface and controls

Source: [Retuning-Map Toy Model](../../../content/markdown/aaa/validation/simulations/retuning-map-toy-model.md). The following targets were specified before implementation and have not been computed by the reserved runtime.

## Runtime Artifact

**Implementation status:** not implemented. The reserved script and fixture paths below do not currently exist. They specify the intended interface and must not be cited as executed evidence:

```text
node scripts/nested-shell-braid/retuning-map-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/nested-shell-braid/retuning-map-mock.json
```

The planned runtime must emit one result entry per scenario. The packet is dimensionless: action increments are in units of $h$, speeds are compared to the declared $c_f$, and radius/cadence changes are reported as logarithmic increments plus reconstructed component changes.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `reference_state` | baseline $R_1,R_2,R_3,\lambda,\xi,\nu_N,s_1,s_2,s_3,c_f,\epsilon_2$ |
| `representative_cadence_weights` | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| `compliance_diagonal` | diagonal version of $\mathbf{K}^{\mathrm{ret}}_q$ |
| `action_gradient_h_per_log` | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| `constraints` | linearized branch constraints, each with coefficients and target |
| `f_N` | local Noether braid cadence-state distribution value |
| `partial_nu_f_N` | local slope used only to estimate the higher-order current remainder |
| `transactions` | accepted or control $\sigma$ transactions with wake action increment and local rate density |

This fixture intentionally starts with a diagonal compliance matrix. A later branch packet can replace it with a full matrix once the linearized return map supplies off-diagonal coupling.

## Output Diagnostics

The planned fixture must report:

| Output field | Meaning |
| --- | --- |
| `status` | `candidate` only when constraints and speed gates pass |
| `delta_y` | solved logarithmic retuning vector |
| `retuning_components` | $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ |
| `constraint_residual_max` | largest absolute residual in the declared linear constraints |
| `speed_gates` | post-retuning checks for the declared binary 1, 2, and 3 speed regimes |
| `J_nu.contribution` | $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$ for the transaction |
| `net_J_nu.value` | sum of transaction contributions in the scenario |
| `net_J_nu.higher_order_estimate` | magnitude estimate for the omitted $O((\Delta\nu_N)^2\partial_\nu f_N)$ term |

## Required Mock Behavior

The reserved mock packet must contain two hand-checkable scenarios. The values below are specification targets, not current runtime outputs.

| Scenario | Expected behavior |
| --- | --- |
| `same_branch_plus_minus_balance` | Plus and minus one-$h$ retunings both pass the speed gates. The planned arithmetic fixture must use its declared unequal local rates to produce the specified small signed current, with target `net_J_nu.value` near `0.0017019`. |
| `middle_hinge_violation_control` | The linear action constraint solves, but source-record binary 2 leaves the declared hinge tolerance. The compatibility ID remains unchanged; the row fails with `middle-hinge-violation`. |

These numbers are fixture expectations only. They validate arithmetic, packet shape, branch-gate reporting, and the current estimate. They do not validate a physical Noether braid branch.

## Failure Reading

The first failure modes are concrete:

| Diagnostic pattern | Meaning |
| --- | --- |
| nonzero `constraint_residual_max` above tolerance | the declared linearized branch constraints are not actually solved |
| `middle-hinge-violation` | compatibility diagnostic: binary 2 leaves the source-record field-speed tolerance |
| `inner-speed-regime-crossing` or `outer-speed-regime-crossing` | the transaction crosses a speed-regime boundary |
| large higher-order current estimate | the continuum current requires smaller steps, narrower bins, or a higher-order transport model |
| candidate branch with missing physical return-map source | the fixture is arithmetic only and must be replaced by a delayed-dynamics branch packet before promotion |

A promotable retuning packet must eventually replace the mock compliance matrix with a return-map-derived $\mathbf{K}^{\mathrm{ret}}_q$, preserve the same causal-root ledger, and keep the speed gates attached to the same branch state that supplies $\Delta\nu_N$.
