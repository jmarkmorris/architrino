# EQ-02 Through EQ-04 Translating Binary Shared-Record Instantiation

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent packet: [EQ-02 Through EQ-04 Lorentz-Energy Closure Packet](eq-02-04-lorentz-energy-packet.md)
- Common architecture: [Equation Common Architecture 2026-06-23 C](equation-common-architecture-2026-06-23-c.md)
- Owned IDs: `EQ-02`, `EQ-03`, `EQ-04`
- Claim level: derivation/closure target and simulation target
- Promotion status: priority-only

## Purpose

This packet instantiates the common same-record residual on the translating maximum-curvature binary benchmark. The goal is to turn `lorentz_mass_shell_common_branch_residual` from a packet-level residual grammar into a concrete retained-record contract.

The test is intentionally smaller than the full nested shell braid. It asks whether the first available moving two-body branch can produce the same Lorentz factor in:

- clock period;
- oblate spheroidal envelope ratio;
- two-way signal leakage;
- moving energy and momentum;
- mass-shell closure;
- rest-mass invariance;
- Noether sea medium response.

The packet does not claim that the translating binary already proves Lorentz behavior, mass shell recovery, or rest-energy closure. It defines the first fail-closed calculation that would decide whether those rows share one branch or split into independent fits.

## Source Basis

The reader-facing Lorentz chapter already defines the translating binary benchmark. For opposite-polarity architrinos $\sigma\in\{+1,-1\}$ and drift direction $\hat{\mathbf e}$, the branch ansatz is

$$
\mathbf{x}_{\sigma}(t)
=
u t\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(t)),
\qquad
\theta(t+T_u)=\theta(t)+2\pi.
$$

For a root emitted by $\sigma'$ and received by $\sigma$, the delay equation is

$$
G_{\sigma\sigma'}(\tau;\theta,u)
\equiv
\left\|
u\tau\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta)
-
\sigma'\,\boldsymbol{\rho}_u(\theta-\Omega_u\tau)
\right\|
-c_f\tau
=0,
\qquad
\Omega_u\equiv\frac{2\pi}{T_u}.
$$

The branch Jacobian is

$$
J_{\sigma\sigma'}(\tau;\theta,u)
=
1-
\frac{
\left(
u\hat{\mathbf e}
+
\sigma'\Omega_u\boldsymbol{\rho}'_u(\theta-\Omega_u\tau)
\right)
\cdot\hat{\mathbf r}_{\sigma\sigma'}
}{c_f}.
$$

The primitive Lorentz benchmark is the residual triple

$$
\mathcal{R}_{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}(u),
R_{\xi}^{\mathrm{bin}}(u),
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\right),
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}.
$$

This packet extends that triple into the `EQ-02` through `EQ-04` same-record residual so the Lorentz rows and mass-shell rows cannot be tuned separately.

## Retained Record To Populate

For a drift value $0<u<c_f$, retain one packet-local common carrier

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathfrak B_u,
\mathcal N_0,
\mathcal L_{\mathrm{root}}(u),
\mathcal L_{\mathrm{wake}}(u),
\mathcal L_{E\mathbf p\mathbf J}(u)
\right).
$$

This carrier is the shared object consumed by the clock, envelope, two-way signal, energy, momentum, and mass-shell rows. The full retained record then adds exposure, medium response, and observer projection:

$$
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u),
\mathcal E_{\mathrm{exp}}(u),
\mathcal M_{\mathrm{sea}}^{ab}(u),
\Pi_{\mathrm{obs}}(u)
\right).
$$

The distinction is structural rather than ontological: $\mathcal C_{02\text{-}04}^{\mathrm{bin}}$ is the common carrier that must not be retuned between rows, while $\Theta_{02\text{-}04}^{\mathrm{bin}}$ is the complete same-record object used by the residual evaluator. Every clock, envelope, two-way signal, energy, momentum, rest-mass, mass-shell, and medium-response row must therefore be a declared projection of $\mathcal C_{02\text{-}04}^{\mathrm{bin}}$ or a declared projection of $\Theta_{02\text{-}04}^{\mathrm{bin}}$ whose first shared dependency is that same carrier.

The branch chart is

$$
\mathfrak B_u
=
\left(
\boldsymbol{\rho}_u,
T_u,
\Omega_u,
b_u,
h_u,
\eta_u,
\epsilon_{c,u},
J_{0,u},
\mathcal I_u,
\mathcal H_{\partial W,u}
\right),
$$

where $b_u$ is the active causal-root ledger, $h_u$ is the retained memory depth, $\eta_u$ is the regularization row, $\epsilon_{c,u}$ is the core or collision cutoff, $J_{0,u}$ is the Jacobian floor, $\mathcal I_u$ is the inactive-root gap cover, and $\mathcal H_{\partial W,u}$ is the boundary history.

For any forward translating row, the same branch chart must also expose the minimum retained forward separation $d_{\min}(u)$, the locked moving-branch history depth $h_b^{\mathrm{lock}}(u)$, and the inherited root-starvation diagnostic

$$
\mathcal R_{\mathrm{Lor\text{-}root}}(u)
=
\frac{\tau_{\mathrm{forward}}(u)/T_u}
{M_b^{\mathrm{mem}}(u)+\epsilon_h},
\qquad
M_b^{\mathrm{mem}}(u)=\frac{h_b^{\mathrm{lock}}(u)}{T_u}.
$$

This is a branch-validity row rather than an extra Lorentz fit. If the moving binary loses the forward causal roots needed by its own clock, envelope, or force rows, a small Lorentz-looking residual is not eligible for promotion.

The local Noether sea cell for the first primitive run is

$$
\mathcal N_0
=
\left(
\mathbf u_{\mathrm{sea}}=0,\,
G_{\mathrm{grad}}=0,\,
n=1,\,
\chi_{\text{sea}}=1,\,
\Gamma_N=1,\,
c_{\star}=c_f
\right).
$$

Observer-facing replay may later replace $c_{\star}=c_f$ with a declared $c_{\text{eff}}=c_f/\chi_{\text{sea}}$, but that replay must be a projection of the same common carrier and retained record plus declared Noether sea dressing rows. It cannot change the branch ledger to make the mass or clock rows pass.

## Same-Record Residual Specialization

The common architecture residual specializes here to

$$
\mathcal R_{\mathrm{shared}}^{02\text{-}04}
\left(
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
\right)
=
\left\|
\mathcal R_{02\text{-}04}^{\mathrm{bin}}(u)
\right\|_{W_{02\text{-}04}}
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u)
+
\lambda_{\mathrm{split}}
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u).
$$

For readability below, write $\mathcal C_u\equiv\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ and $\Theta_u\equiv\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$. The carrier-only projections are

$$
\begin{aligned}
\Pi_T^C\mathcal C_u
&=
\left(T_u,T_0,b_u,\mathcal N_0\right),
\\
\Pi_{\xi}^C\mathcal C_u
&=
\left(R_{\parallel,u},R_{\perp,u},\boldsymbol{\rho}_u,b_u,\mathcal N_0\right),
\\
\Pi_{\mathrm{shape}}^C\mathcal C_u
&=
\left(\boldsymbol{\rho}_u,\Pi_{\mathrm{ell}},b_u,\mathcal N_0\right),
\\
\Pi_{\mathrm{tw}}^C\mathcal C_u
&=
\left(\Delta_{\mathrm{tw}}^{\mathrm{bin}},\beta_f,\theta,b_u,\mathcal N_0\right).
\end{aligned}
$$

The full-record projections may add exposure, Noether sea response, and observer projection rows, but they still carry $\mathcal C_u$ as the non-retunable carrier:

$$
\begin{aligned}
\Pi_E^{\Theta}\Theta_u
&=
\left(\mathcal C_u,E_{\mathrm{CM},u},M_0^{\mathrm{bin}},c_f,\mathcal E_{\mathrm{exp}}(u)\right),
\\
\Pi_{\mathbf p}^{\Theta,a}\Theta_u
&=
\left(\mathcal C_u,p_{\mathrm{CM},u}^{a},M_0^{\mathrm{bin}},c_f,u,\hat e^a,\mathcal E_{\mathrm{exp}}(u)\right),
\\
\Pi_{\mathrm{shell}}^{\Theta}\Theta_u
&=
\left(\mathcal C_u,E_{\mathrm{CM},u},p_{\mathrm{CM},u}^{a},M_0^{\mathrm{bin}},c_f,h_{ab}\right),
\\
\Pi_{M_0}^{\Theta}\Theta_u
&=
\left(\mathcal C_u,M_0^{\mathrm{bin}}(u),M_0^{\mathrm{bin}}(0)\right),
\\
\Pi_{\mathcal M}^{\Theta}\Theta_u
&=
\left(\mathcal C_u,\mathcal M_{\mathrm{sea}}^{ab}(u),h^{ab},\mathcal N_0,c_f\right).
\end{aligned}
$$

The residual vector is therefore

$$
\mathcal R_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}\!\left[\Pi_T^C\mathcal C_u\right],
R_{\xi}^{\mathrm{bin}}\!\left[\Pi_{\xi}^C\mathcal C_u\right],
R_{\mathrm{shape}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{shape}}^C\mathcal C_u\right],
R_{\mathrm{tw}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{tw}}^C\mathcal C_u\right],
R_E^{\mathrm{bin}}\!\left[\Pi_E^{\Theta}\Theta_u\right],
R_p^{\mathrm{bin},a}\!\left[\Pi_{\mathbf p}^{\Theta,a}\Theta_u\right],
R_{\mathrm{shell}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{shell}}^{\Theta}\Theta_u\right],
R_{M_0}^{\mathrm{bin}}\!\left[\Pi_{M_0}^{\Theta}\Theta_u\right],
R_{\mathcal M}^{\mathrm{bin}}\!\left[\Pi_{\mathcal M}^{\Theta}\Theta_u\right]
\right)(u).
$$

The branch-level clock and envelope projection rows are

$$
R_T^{\mathrm{bin}}\!\left[\Pi_T^C\mathcal C_u;u\right]
=
\frac{T_u}{T_0}
-
\gamma_f(u),
\qquad
R_{\xi}^{\mathrm{bin}}\!\left[\Pi_{\xi}^C\mathcal C_u;u\right]
=
\frac{R_{\parallel,u}}{R_{\perp,u}}
-
\frac{1}{\gamma_f(u)}.
$$

The shape residual records all non-ellipsoidal branch deformation not captured by the principal-axis ratio:

$$
R_{\mathrm{shape}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{shape}}^C\mathcal C_u;u\right]
=
\frac{
\left\|
\boldsymbol{\rho}_u
-
\Pi_{\mathrm{ell}}\boldsymbol{\rho}_u
\right\|_{\mathrm{cyc}}
}{
\left\|\boldsymbol{\rho}_u\right\|_{\mathrm{cyc}}+\varepsilon_{\rho}
}.
$$

The two-way leakage row is

$$
R_{\mathrm{tw}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{tw}}^C\mathcal C_u;u,\theta\right]
=
\Delta_{\mathrm{tw}}^{\mathrm{bin}}(\beta_f,\theta),
\qquad
\beta_f=\frac{u}{c_f}.
$$

The energy and momentum rows are

$$
R_E^{\mathrm{bin}}\!\left[\Pi_E^{\Theta}\Theta_u;u\right]
=
\frac{
E_{\mathrm{CM},u}
}{
M_0^{\mathrm{bin}}c_f^2
}
-
\gamma_f(u),
$$

$$
R_p^{\mathrm{bin},a}\!\left[\Pi_{\mathbf p}^{\Theta,a}\Theta_u;u\right]
=
\frac{
p_{\mathrm{CM},u}^{a}
}{
M_0^{\mathrm{bin}}c_f
}
-
\gamma_f(u)\frac{u\hat e^a}{c_f}.
$$

The primitive mass-shell residual is

$$
R_{\mathrm{shell}}^{\mathrm{bin}}\!\left[\Pi_{\mathrm{shell}}^{\Theta}\Theta_u;u\right]
=
\frac{
E_{\mathrm{CM},u}^{2}
-
c_f^2h_{ab}p_{\mathrm{CM},u}^{a}p_{\mathrm{CM},u}^{b}
-
\left(M_0^{\mathrm{bin}}\right)^2c_f^4
}{
\left(M_0^{\mathrm{bin}}\right)^2c_f^4+\varepsilon_{\mathrm{shell}}
}.
$$

The rest-invariance row is

$$
R_{M_0}^{\mathrm{bin}}\!\left[\Pi_{M_0}^{\Theta}\Theta_u;u\right]
=
\frac{
M_0^{\mathrm{bin}}(u)
-
M_0^{\mathrm{bin}}(0)
}{
M_0^{\mathrm{bin}}(0)+\varepsilon_M
}.
$$

The medium-response row is a null check in the primitive homogeneous cell and a carrier for later dressed replay:

$$
R_{\mathcal M}^{\mathrm{bin},ab}\!\left[\Pi_{\mathcal M}^{\Theta}\Theta_u;u\right]
=
c_f^2
\left(
\mathcal M_{\mathrm{sea}}^{ab}(u)
-
\frac{h^{ab}}{c_f^2}
\right).
$$

For the first primitive run, any nonzero $R_{\mathcal M}^{\mathrm{bin},ab}$ must be classified as a declared Noether sea dressing row or an error. It cannot be used as a hidden compensator for failed clock, envelope, or mass-shell rows.

## Split And Retune Witnesses

The root-signature split witness is

$$
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u)
=
\sum_{X<Y}
d_{\mathrm{root}}
\left(
\operatorname{RootSig}_X(u),
\operatorname{RootSig}_Y(u)
\right),
$$

where $X,Y$ range over clock, envelope, two-way signal, energy, momentum, rest mass, mass shell, and medium-response rows. It must vanish for a same-record pass.

The signatures $\operatorname{RootSig}_X$ and distance $d_{\mathrm{root}}$ are inherited from the `EQ-01`/`EQ-05` same-root conservation contract. This packet should not define a parallel root-identity test that can disagree with $\mathcal{R}_{01-05}^{\mathfrak B_u}(W_u)$.

The retune witness is

$$
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u)
=
d_b(b_T,b_{\xi})
+d_b(b_T,b_E)
+d_b(b_T,b_p)
+d_{\mathcal N}(\mathcal N_T,\mathcal N_E)
+d_c(c_T,c_E)
+d_M(M_{0,T},M_{0,E}).
$$

It reports whether the packet secretly changed the branch ledger, Noether sea cell, speed convention, or rest-mass row between observables. The pass condition requires

$$
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u)=0,
\qquad
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u)=0,
$$

before any small residual is interpreted as a physical Lorentz or mass-map leakage.

## Outputs Required From The First Calculation

For each sampled drift $u_k$, the run must output:

| Output | Required content | Consumed by |
| --- | --- | --- |
| Common carrier | $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)$ with one shared branch chart, Noether sea cell, root ledger, wake ledger, and energy-momentum-angular-momentum ledger. | All row projections. |
| Retained branch chart | $\boldsymbol{\rho}_{u_k}$, $T_{u_k}$, $\Omega_{u_k}$, $b_{u_k}$, $h_{u_k}$, $\eta_{u_k}$, $\epsilon_{c,u_k}$, $J_{0,u_k}$, and inactive-root gaps. | Same-record eligibility. |
| Root-starvation row | $d_{\min}(u_k)$, $h_b^{\mathrm{lock}}(u_k)$, $T_{u_k}$, $M_b^{\mathrm{mem}}(u_k)=h_b^{\mathrm{lock}}(u_k)/T_{u_k}$, and $\mathcal R_{\mathrm{Lor\text{-}root}}(u_k)$ using the same active forward-root rows. | Same-record eligibility and finite-memory falsifier for `EQ-02` and `EQ-03`. |
| Same-root conservation row | $\mathcal{R}_{01-05}^{\mathfrak B_{u_k}}(W_k)$ or a declared inherited conservation certificate using the same $\mathfrak B_{u_k}$, active roots, wake ledger, event ledger, and boundary flux convention. | `EQ-05`, same-record eligibility for `EQ-02` through `EQ-04`. |
| Clock row | $T_{u_k}/T_0$, $\gamma_f(u_k)$, and $R_T^{\mathrm{bin}}(u_k)$. | `EQ-02`. |
| Envelope row | $R_{\parallel,u_k}$, $R_{\perp,u_k}$, $\xi_{u_k}$, $R_{\xi}^{\mathrm{bin}}(u_k)$, and $R_{\mathrm{shape}}^{\mathrm{bin}}(u_k)$. | `EQ-03`. |
| Two-way signal row | $\Delta_{\mathrm{tw}}^{\mathrm{bin}}(\beta_f,\theta)$ and angular decomposition of any leakage. | `EQ-02`, `EQ-07`, `EQ-09`. |
| Energy row | $E_{\mathrm{internal}}(u_k)$, wake-energy convention, boundary flux, event updates, and $E_{\mathrm{CM},u_k}$. | `EQ-04`, `EQ-05`. |
| Exposure row | Preliminary $\zeta^{\mathrm{bin}}$ or a declared absence of shielding extraction for this two-body benchmark. | Mass-map handoff. |
| Momentum row | $p_{\mathrm{CM},u_k}^a$, recoil/boundary exchange, and $R_p^{\mathrm{bin},a}(u_k)$. | `EQ-04`, `EQ-05`. |
| Rest-mass row | $M_0^{\mathrm{bin}}(0)$, $M_0^{\mathrm{bin}}(u_k)$, and $R_{M_0}^{\mathrm{bin}}(u_k)$. | Rest-invariance check. |
| Mass-shell row | $R_{\mathrm{shell}}^{\mathrm{bin}}(u_k)$. | `EQ-04`. |
| Medium-response row | $R_{\mathcal M}^{\mathrm{bin},ab}(u_k)$ with trace and trace-free parts. | Noether sea constitutive handoff. |
| Split witnesses | $\mathcal S_{\mathrm{root}}^{02\text{-}04}$ and $\mathcal S_{\mathrm{retune}}^{02\text{-}04}$. | Common-architecture pass/fail. |

## Current Solver Proxy Intake

The live tri-binary runner may be referenced here only as current solver-proxy evidence. Its solver report carries a nested `cases[].branchChartProjection.equationBearing` payload. That payload is fail-closed and does not yet populate $R_T^{\mathrm{bin}}$, $R_{\xi}^{\mathrm{bin}}$, $R_{\mathrm{tw}}^{\mathrm{bin}}$, $R_E^{\mathrm{bin}}$, $R_p^{\mathrm{bin},a}$, $R_{\mathrm{shell}}^{\mathrm{bin}}$, $R_{M_0}^{\mathrm{bin}}$, or $R_{\mathcal M}^{\mathrm{bin},ab}$ from one retained translating branch chart.

The next score-neutral executable object is the retained-row extraction

$$
\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}(u_k):
\texttt{equationBearing}(\mathfrak a,u_k)
\longmapsto
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k),
\Theta_{02\text{-}04}^{\mathrm{bin}}(u_k),
\mathcal R_{02\text{-}04}^{\mathrm{bin}}(u_k),
\mathcal R_{01-05}^{\mathfrak B_{u_k}}(W_k),
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u_k),
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u_k)
\right),
$$

with `blocked_not_evaluable` returned for every component whose required projection is absent from the same retained branch chart.

| Current `equationBearing` field | Use in this packet | Current disposition |
| --- | --- | --- |
| `roleFrequencyRowIMO` | Candidate-family display only until `roleMapRetained=true`; raw labels remain generic before retained role assignment. | Proxy only. |
| `rootSignature` | May seed $\operatorname{RootSig}_X$ after `row_set_identity` clears. | Partial proxy; not same-root acceptance. |
| `geometryEnergyResidual` | Identifies reduced geometry/energy rows and the missing energy route. | Blocked; does not populate the `EQ-02` through `EQ-04` residual vector. |
| `eventLedgerResidual` | Points to wake, recoil, vector-partition, and energy-routing blockers. | Blocked; not $\mathcal R_{01-05}^{\mathfrak B_u}(W_u)$. |
| `stabilityResidual` | Records whether the candidate survives retained branch stability checks. | Blocked. |

Do not cite this solver payload as evidence for a score increase until the emitted retained-row extraction supplies the rows above with zero $\mathcal S_{\mathrm{root}}^{02\text{-}04}$, zero $\mathcal S_{\mathrm{retune}}^{02\text{-}04}$, and a populated or inherited $\mathcal R_{01-05}^{\mathfrak B_{u_k}}(W_k)$.

## Executable Emit Contract Check

The current executable contract check is:

```sh
node scripts/equation-mapping/check-emit-02-04-contract.mjs --input <tri-binary-solver-report.json> --summary --pretty
```

The checker consumes `cases[].branchChartProjection.equationBearing`, maps it onto $\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}(u_k)$, and reports missing retained projection rows instead of converting current-proxy rows into Lorentz, energy-momentum, or mass-shell evidence. Against the 2026-06-23 equal-frequency smoke report, the summary is `blocked_not_evaluable`: 0 evaluable cases, 7 blocked cases, `retainedBranchClaim=false`, and `scoreDecision=no_score_increase`.

The checker keeps two row-name classes separate: `requiredRows` are retained $\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}$ target rows, while `currentProxyRows` are current tri-binary solver-report rows. The aggregate missing rows identify the first concrete reducer burden. The common carrier is blocked by absent `retained_branch_chart`, `root_starvation_row`, `row_set_identity`, `tail_wake_pullback`, `vector_partition_retained`, `energy_routing`, and `retained_noether_sea_cell` rows. The reduced `root_chart_reduced` row remains proxy-only. The clock, envelope, two-way signal, energy, momentum, mass-shell, rest-mass, medium-response, and same-record witness projections are likewise blocked until the same retained branch chart supplies their declared rows. This is the intended fail-closed result: the common carrier has a checkable interface, but the current solver report has not earned a score increase.

## Executable Same-Branch Identity Check

The same-row-set acceptance extractor is:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input <tri-binary-solver-report.json> --summary --pretty
```

It consumes `frequencyTripletSearch.equalFrequencyEnergyRadiusAudit`, especially the `retainedRowSetScaffold` and `retainedRowSetIdentityStructuralWitnessAudit` rows for $S_{\mathrm{eq}}$. Against the 2026-06-23 equal-frequency smoke report, it returns `blocked_current_proxy_only`, `scoreDecision=no_score_increase`, `retainedBranchClaim=false`, `currentProxyEvidencePopulatedCount=7`, `structuralWitnessCurrentPopulatedCount=15`, `acceptedRetainedIdentityRequirementCount=0` out of 14, and `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

The same command now also accepts a direct retained-domain packet:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json --summary --pretty
```

That attempt packet returns `blocked_missing_retained_event_or_domain`, `scoreDecision=no_score_increase`, `acceptedRetainedIdentityRequirementCount=0` out of 14, and `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`. It exists to make the retained event or positive-width domain shape executable; because its support and rows are marked `attempt`, it does not populate `same_branch_chart_identity`. The summary now also reports `retainedRequirementStatuses`, `retainedRequirementReasons`, `domainWitnessStatuses`, and `domainWitnessReasons`; in the current attempt all 14 retained requirements and all three witnesses report `attempt`, with row and witness reasons remaining explicit. Accepted-looking supports, row bindings, and witnesses are rejected with source-not-found reasons when their source reference does not resolve to an existing file.

The result is useful but not score evidence. It shows that the current solver rows are consistently pointing at $S_{\mathrm{eq}}$, but no retained identity has been accepted. The missing retained inputs are:

- raw labeled rows preserved on retained history;
- six-body polarity-neutral inventory preserved;
- role map or quotient-sector policy declared;
- shared retained event or positive-width domain;
- path-history rows bound to $S_{\mathrm{eq}}$;
- causal-root ledger rows bound to $S_{\mathrm{eq}}$;
- wake-tail rows bound to $S_{\mathrm{eq}}$;
- energy/action rows bound to $S_{\mathrm{eq}}$;
- momentum and angular-momentum rows bound to $S_{\mathrm{eq}}$;
- phase rows bound to $S_{\mathrm{eq}}$;
- retained plane-orientation rows bound to $S_{\mathrm{eq}}$;
- response-center and group-velocity rows bound to $S_{\mathrm{eq}}$;
- Noether sea record bound to $S_{\mathrm{eq}}$;
- binary-to-binary phase row-set identity.

Running the checker with `--require-accepted` exits nonzero for both the current solver report and the retained-domain attempt while these retained inputs are missing. That is the intended guardrail: current proxy row-set alignment is a useful search signal, but `same_branch_chart_identity` is not populated until a retained event or retained positive-width domain binds the rows above and supplies zero split, zero hidden-retune, and overlap-preimage witnesses.

### Minimum Accepted `S_eq` Retained-Domain Fixture

The next score-moving artifact is not another proxy summary. It is a source-backed retained-domain packet that can replace [same-branch-retained-domain-attempt.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json) without changing the checker. In the notation of the common architecture, the fixture must instantiate

$$
\mathfrak D_{S_{\mathrm{eq}}}
=
\left(
D,\Theta_D,S_{\mathrm{eq}},\iota_D,\{\Pi_r\}_{r\in S_{\mathrm{eq}}},\mathcal R_D
\right),
$$

where $D$ is one accepted finite event, retained event, or positive-width domain, and $\Theta_D$ contains the same $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)$ carrier consumed by the clock, envelope, two-way signal, energy, momentum, rest-mass, mass-shell, phase, and Noether sea rows.

The same condition can be stated more sharply as a fiber product over the common carrier. For this packet, write $\mathcal C_u=\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)$ and require

$$
\Theta_D
=
\Theta_{\mathrm{clock}}
\times_{\mathcal C_u}
\Theta_{\mathrm{env}}
\times_{\mathcal C_u}
\Theta_{\mathrm{tw}}
\times_{\mathcal C_u}
\Theta_E
\times_{\mathcal C_u}
\Theta_{\mathbf p}
\times_{\mathcal C_u}
\Theta_{\mathrm{phase}}
\times_{\mathcal C_u}
\Theta_{\mathrm{sea}}.
$$

Under this reading, the acceptance vector is the source-backed existence proof for every leg of the fiber product. The split witness is the failure row for this universal property: $\mathcal S_{\mathrm{split}}=0$ says the packet is not merely a subset of separately tuned row products but a genuine same-carrier retained-domain object.

The minimum fixture contract is:

| Packet field | Minimum accepted content | Acceptance-vector coordinate |
| --- | --- | --- |
| `domain` | `status` is `accepted`, `passed`, or `populated`; `id`, `kind`, `rowId`, and `sourcePath` or `source` are concrete; the source resolves to a durable evidence file. | $A_D$, $A_{\mathrm{src}}$ |
| `rowBindings.raw_labeled_rows_preserved_on_retained_history` | Accepted row proving raw generator labels are preserved on the retained history before any `I:M:O` role map is imposed. This is the current first blocker. | $A_{\iota}$, $A_r$ |
| `rowBindings.six_body_polarity_neutral_inventory_preserved` | Accepted row preserving six-body polarity-neutral inventory on the same support. | $A_{\iota}$, $A_r$ |
| `rowBindings.role_map_selected_or_quotient_policy_declared` | Accepted row declaring either the retained nested-role map or the quotient policy that keeps raw labels role-neutral. | $A_{\iota}$, $A_r$ |
| `rowBindings.shared_retained_event_or_positive_width_domain` | Accepted support binding when represented as a row binding rather than only as `domain`. | $A_D$, $A_r$ |
| `rowBindings.path_history_rows_bound_to_S_eq` | Accepted path-history rows bound to `retainedRowSetId: "S_eq"` and the same `domainId`. | $A_r$ |
| `rowBindings.causal_root_ledger_rows_bound_to_S_eq` | Accepted causal-root ledger rows on the same support. | $A_r$ |
| `rowBindings.wake_tail_rows_bound_to_S_eq` | Accepted wake-tail rows on the same support. | $A_r$ |
| `rowBindings.energy_action_rows_bound_to_S_eq` | Accepted energy/action rows on the same support. | $A_r$ |
| `rowBindings.momentum_and_angular_momentum_rows_bound_to_S_eq` | Accepted momentum and angular-momentum rows on the same support. | $A_r$ |
| `rowBindings.phase_rows_bound_to_S_eq` | Accepted phase rows on the same support, including the equal-frequency common-clock row and residual phase rows when present. | $A_r$ |
| `rowBindings.retained_plane_orientation_rows_bound_to_S_eq` | Accepted oriented-bivector sector rows on the same support, including local $\mathcal B_a$, effective lever arms $\rho_a$, Gram matrix $\ell_{ab}$, rank/conditioning, and derived normals only when a chart needs them. | $A_r$ |
| `rowBindings.response_center_and_group_velocity_rows_bound_to_S_eq` | Accepted response-center and group-velocity rows on the same support. | $A_r$ |
| `rowBindings.Noether_sea_record_bound_to_S_eq` | Accepted local Noether sea row bound to the same retained domain. | $A_r$ |
| `rowBindings.binary_to_binary_phase_row_set_identity` | Accepted binary-to-binary phase row-set identity on the same retained domain. | $A_{\mathrm{overlap}}$, $A_r$ |
| `witnesses.split_witness_zero` | Accepted, source-backed witness with zero split residual. | $A_{\mathrm{split}}$ |
| `witnesses.retune_witness_zero` | Accepted, source-backed witness with zero hidden-retune residual. | $A_{\mathrm{retune}}$ |
| `witnesses.overlap_preimage_identity` | Accepted, source-backed witness with `consistent: true`. | $A_{\mathrm{overlap}}$ |

Every accepted row binding must include concrete `rowId`, `retainedRowSetId: "S_eq"`, matching `domainId`, and a durable `sourcePath` or `source`. A row label, current proxy row, temporary file, generated reading copy, or nonresolving source path does not count.

Current structural witnesses and ignored temporary frequency reports remain useful search signals, but they are not durable retained-domain evidence. The next accepted source object must be tracked source-backed row extraction, beginning with `raw_labeled_rows_preserved_on_retained_history`, not a pointer to a current proxy report.

The expected acceptance command is:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/<source-backed-S_eq-fixture>.json \
  --summary --pretty --require-accepted
```

Until that command passes, `EQ-02`, `EQ-03`, and `EQ-04` keep their current scores.

## Drift Sampling And Local Expansion

The first run should sample small and moderate primitive drift:

$$
0
=
\beta_0
<
\beta_1
<
\cdots
<
\beta_K
<
1,
\qquad
\beta_k=\frac{u_k}{c_f}.
$$

Near $\beta=0$, fit even-power rows for clock and envelope:

$$
\frac{T_u}{T_0}
=
1+a_2\beta^2+a_4\beta^4+R_T^{(6)},
\qquad
\frac{R_{\parallel,u}}{R_{\perp,u}}
=
1+b_2\beta^2+b_4\beta^4+R_{\xi}^{(6)}.
$$

The Lorentz target coefficients are

$$
a_2=\frac{1}{2},
\qquad
a_4=\frac{3}{8},
\qquad
b_2=-\frac{1}{2},
\qquad
b_4=-\frac{1}{8}.
$$

If the branch chart supplies the more detailed coefficient vector

$$
\mathbf c_{\mathrm L}
=
\left(
k_2,\ell_2,k_4,\ell_4
\right),
$$

it should be compared to the existing Lorentz-kinematics target

$$
\mathbf{c}_{\mathrm{L}}
=
\left(-\frac{1}{3},-\frac{4}{3},-\frac{1}{9},\frac{2}{9}\right)
+O(\epsilon_{\mathrm{br}}+\epsilon_{\mathrm{hier}}+\epsilon_{\mathrm{reg}}),
$$

with the coefficient definitions carried over from the retained branch chart that computes $\mathbf c_{\mathrm L}$. The two coefficient checks must not be mixed unless their projection relation is declared.

For the fixed-action retuning subclass used by the Lorentz-kinematics coefficient target, define the coefficient-basis projection before either small-$\beta$ check is counted as evidence:

$$
\Pi_{\mathrm{coef}}\mathbf c_{\mathrm L}
=
\left(
a_2^C,a_4^C,b_2^C,b_4^C
\right).
$$

The projected clock-side coefficients are

$$
a_2^C=-\frac{k_2+2\ell_2}{6},
\qquad
a_4^C=
\frac{7}{72}(k_2+2\ell_2)^2
-
\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}.
$$

The projected envelope-side coefficients are

$$
b_2^C=\frac{\ell_2-k_2}{2},
\qquad
b_4^C=
\frac{\ell_4-k_4}{2}
+\frac{3k_2^2}{8}
-\frac{k_2\ell_2}{4}
-\frac{\ell_2^2}{8}.
$$

The coefficient-projection residual is

$$
R_{\mathrm{coef}}^{\mathrm{bin}}
=
\left(
a_2^C-\frac{1}{2},
a_4^C-\frac{3}{8},
b_2^C+\frac{1}{2},
b_4^C+\frac{1}{8}
\right).
$$

This row is evaluable only when $(k_2,\ell_2,k_4,\ell_4)$, $T_u/T_0$, and $R_{\parallel,u}/R_{\perp,u}$ are extracted from the same $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ and the same inherited finite-window conservation convention. If that shared extraction is absent, report `blocked_not_evaluable`; do not set $R_{\mathrm{coef}}^{\mathrm{bin}}=0$ by assumption.

## Negative Controls

The first executable should include four negative controls:

1. **Clock-only retune:** adjust $T_u$ to match $\gamma_f$ while holding the branch ledger fixed incorrectly. This must pass $R_T$ and fail $\mathcal S_{\mathrm{retune}}^{02\text{-}04}$ or $R_{\xi}$.
2. **Envelope-only retune:** impose $R_{\parallel}/R_{\perp}=1/\gamma_f$ without the root ledger. This must pass $R_{\xi}$ and fail $\mathcal S_{\mathrm{root}}^{02\text{-}04}$.
3. **Velocity-dependent rest mass:** let $M_0(u)$ absorb energy-momentum error. This must fail $R_{M_0}^{\mathrm{bin}}$ even if $R_{\mathrm{shell}}$ shrinks.
4. **Medium-response compensator:** change $\mathcal M_{\mathrm{sea}}^{ab}$ inside the primitive homogeneous cell to repair momentum. This must fail $R_{\mathcal M}^{\mathrm{bin},ab}$ or the declared Noether sea cell equality.

These controls are useful because they test whether the same-record residual detects the most tempting ways to manufacture a Lorentz-looking result without deriving it.

## Pass Classes

| Class | Meaning | Consequence |
| --- | --- | --- |
| `pass.native_binary` | $\mathcal R_{\mathrm{shared}}^{02\text{-}04}$ is within tolerance with zero root split, zero retune witness, and a populated or inherited $\mathcal{R}_{01-05}^{\mathfrak B_u}(W_u)$ on the same primitive cell. | The binary benchmark becomes a serious theorem route for Lorentz plus mass-shell closure. |
| `pass.with_declared_residual` | Clock, envelope, and mass-shell rows share one branch, but residuals are nonzero and assigned to named branch-transition, finite-memory, shape-mode, or Noether sea dressing rows. | The next task is to prove the residual source survives nested shell braid averaging without hidden retune. |
| `fail.clock_envelope_split` | Clock and envelope rows need different branches, roots, or speed conventions. | `EQ-02` and `EQ-03` cannot be raised; nested shell braid closure must repair a real primitive failure. |
| `fail.mass_shell_split` | Mass shell or momentum rows pass only by changing $M_0$, $\zeta$, $\mathcal M_{\mathrm{sea}}^{ab}$, or $c_{\star}$. | `EQ-04` remains a residual grammar, not a recovery result. |
| `fail.no_branch` | No stable translating branch exists for the sampled drift domain. | The Lorentz program must move to a different retained branch family or explain why the binary is not the right primitive test. |

## Relationship To Other Equation Rows

- `EQ-01` supplies the active causal roots and Jacobian floors. This packet cannot bypass the native per-hit law.
- `EQ-05` supplies event, wake, boundary, and finite-window conservation rows. Energy-momentum closure in this packet is invalid without them.
- `EQ-06`, `EQ-07`, and `EQ-11` consume the Noether sea response rows after the primitive cell is replaced by a dressed cell.
- `EQ-12`, `EQ-17`, and `EQ-26` consume the same clock/frequency discipline when photon, redshift, and atomic-frequency rows are tested.
- `EQ-20`, `EQ-21`, `EQ-22`, and `EQ-32` inherit the same Noether sea constitutive-state discipline if the metric and growth rows later use $\mathcal M_{\mathrm{sea}}^{ab}$ or $G_{\mathrm{eff}}$.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: no executed branch calculation has populated $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$, assembled $\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$, or evaluated $\mathcal R_{\mathrm{shared}}^{02\text{-}04}$. The packet is ready to guide a solver or proof pass, not a reader-facing promotion.

## Next Solver Target

The next solver-facing task is:

> Populate $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ and then assemble $\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$ for a small grid of $0<u<c_f$ using the certified rest binary as the seed. Report the projection inputs, $\mathcal R_{\mathrm{shared}}^{02\text{-}04}$, $\mathcal R_{\mathrm{Lor\text{-}root}}(u)$ for every retained forward-root row, $\mathcal R_{01-05}^{\mathfrak B_u}(W_u)$ or its inherited certificate, $\mathcal S_{\mathrm{root}}^{02\text{-}04}$, and $\mathcal S_{\mathrm{retune}}^{02\text{-}04}$ with all residuals assigned to named branch, wake, event, boundary, regularization, or Noether sea rows.

That task should use the general solver architecture. It should not add a one-off Lorentz solver path that bypasses the same retained-record schema needed by the other equation-map rows.
