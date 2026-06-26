# Equation Closure Pass 2026-06-23 AL

## Scope

- Target: score-neutral finite-window thermodynamic record residual for `EQ-25`.
- Primary runner: [eq25-thermodynamic-record-residual.mjs](../../../scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs).
- Primary attempt input: [eq25-thermodynamic-record-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-attempt.v1.json).
- Related packet: [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md).
- Claim level: score-neutral executable thermodynamic-record residual shape.
- Score disposition: no score changes.

## Closure Question

`EQ-25` needed a fail-closed residual that keeps entropy and thermalization tied to a declared finite window instead of importing Boltzmann, Planck, or second-law behavior as postulates. The executable question is:

$$
\theta_{\mathrm{therm}}
\longmapsto
\left(
\Gamma_{\mathcal Q,W},
\mu,
\Phi_{\Delta t},
\Pi_{\mathcal Q,W},
C_{\mathrm{eff}},
\mathcal R_{\mathrm{Boltz}},
\mathcal R_{\mathcal Q},
\mathcal D_{\mathrm{th}},
\mathcal L_{E\mathbf p\mathbf J}^{(W)}
\right).
$$

The new runner asks whether one thermodynamic record can carry the state space, coarse-graining, measure, deterministic pushforward, projected collision operator, entropy balance, thermalization depth, fluctuation row, event ledger, shared Noether sea variables, source provenance, and no-hidden-retune witness.

## Executable Shape

Run:

```sh
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs --summary --pretty
```

Current summary:

| Field | Value |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_theta_therm` |
| Common carrier pass | `true` |
| Shared keys accepted | `true` |
| Thermodynamic numeric pass | `true` |
| State-space pass | `true` |
| Pushforward pass | `true` |
| Collision-operator pass | `true` |
| Entropy-balance pass | `true` |
| Thermalization-depth pass | `true` |
| Fluctuation pass | `true` |
| Source provenance pass | `true` |
| Hidden retune pass | `true` |
| Negative controls | `4/4` pass |

The compact summary also reports the first blocker detail:

```text
nextBlockerDetails.id: theta_therm
nextBlockerDetails.status: attempt
nextBlockerDetails.reason: row_not_accepted
nextBlockerDetails.carrierId: theta_therm_CMB_attempt_0001
nextBlockerDetails.sourcePath: reference/priorities/equation-mapping/eq-06-24-25-continuum-medium-thermo-packet.md
nextBlockerDetails.sourceReferenceExists: true
```

This means the first row has a durable source reference, but the row is still not accepted retained evidence.

The populated mode fails as intended:

```sh
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs --require-populated --summary --pretty
```

It exits nonzero until the finite-window thermodynamic rows are accepted and source-backed.

## Required Rows

The runner requires these rows on one carrier:

| Row | Role |
| --- | --- |
| `theta_therm` | Common finite-window thermodynamic carrier. |
| `state_space_row` | Declares $\Gamma_{\mathcal Q,W(t)}$, $W(t)$, $\mathcal Q$, and measure support. |
| `coarse_graining_row` | Declares the retained projection class. |
| `measure_row` | Supplies the measure on compatible reduced states. |
| `deterministic_pushforward_row` | Supplies $\Phi_{\Delta t}$ and the pushed-forward measure. |
| `coarse_projection_row` | Supplies $\Pi_{\mathcal Q,W}$. |
| `collision_operator_row` | Derives or rejects $C_{\mathrm{eff}}$ from deterministic unresolved variables. |
| `entropy_balance_row` | Supplies $\sigma_W$, boundary flux, and $\mathcal R_{\mathcal Q}$. |
| `thermalization_depth_row` | Supplies $\mathcal D_{\mathrm{th}}$ and event-channel decomposition. |
| `fluctuation_row` | Supplies retained deterministic-history correlations. |
| `event_ledger_row` | Binds energy, momentum, recoil, medium, remnant, identity, and boundary rows. |
| `shared_noether_sea_row` | Keeps $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, and $\Gamma_N$ shared with CMB/radiation/cosmology consumers. |
| `source_provenance` | Prevents unledgered thermal source terms. |
| `no_hidden_retune_witness` | Blocks changing the thermodynamic record per observable. |

Every row in the attempt fixture is marked `attempt`, so the arithmetic passes are not score evidence.

## Residuals And Negative Controls

The attempt fixture evaluates:

- state-space and measure normalization;
- deterministic pushforward $\mu_{t+\Delta t}^{\mathcal Q,W}=\Pi_{\mathcal Q,W\,*}\Phi_{\Delta t\,*}\mu_t+\mathcal R_{\mathrm{coarse}}$;
- Boltzmann-like projection $df_{\mathcal Q,W}/dt=C_{\mathrm{eff}}+\mathcal R_{\mathrm{Boltz}}$, while rejecting imported-postulate sources;
- entropy balance $dS_{\mathcal Q,W}/dt=\sigma_W-\int_{\partial W}\mathbf J_S\cdot\hat{\mathbf n}\,dA+\mathcal R_{\mathcal Q}$;
- finite-window second-law margin with boundary/environment terms;
- thermalization depth $\mathcal D_{\mathrm{th}}$ and zero photon chemical-potential diagnostic;
- fluctuation covariance symmetry and positivity;
- source-provenance and hidden-retune residuals.

The negative controls are:

| Control | Intended caught failure |
| --- | --- |
| `entropy_without_boundary_balance` | Entropy arithmetic that omits or mismatches boundary/coarse-graining terms. |
| `boltzmann_postulate_import` | A collision operator imported as a postulate rather than derived from deterministic unresolved variables. |
| `insufficient_thermalization_depth` | A thermalization claim with too little integrated depth. |
| `hidden_thermo_retune` | A thermodynamic record changed per observable. |

All four controls fail where expected.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AL disposition |
| --- | --- | --- |
| `EQ-25` | `3` | Still below `4` because the state-space, measure, deterministic pushforward, collision, entropy, thermalization, fluctuation, event-ledger, source-provenance, and retune rows are attempt-level. |
| `EQ-22` and `EQ-23` | `3`, `3` | No change; this runner supplies a thermodynamic handoff shape for CMB/radiation/BBN consumers but no accepted source-window record. |
| `EQ-31` | `2` | No change; resonance statistics still use the finite-window statistical carrier, while this runner covers thermodynamic entropy and thermalization. |

This runner is a useful success marker because it prevents a loose entropy or thermalization statement from being mistaken for a finite-window same-record derivation.

## Promotion Disposition

Priority-only. The new runner does not supply a reader-facing thermodynamic derivation. Promotion remains blocked until a chosen finite window supplies a real measure, event ledger, deterministic pushforward, entropy balance, thermalization or record-locking calculation, fluctuation row, source provenance, and zero-retune witness on accepted source-backed rows.

## Next Closure Target

Populate one accepted $\theta_{\mathrm{therm}}$ finite-window record, preferably for CMB/radiation thermalization or measurement-record entropy, with source-backed state-space, coarse-graining, measure, pushforward, collision/projection, entropy-balance, thermalization-depth, fluctuation, event-ledger, source-provenance, and no-hidden-retune rows.

## Bucket D Worker Audit 2026-06-26 UTC

Re-running the `EQ-25` thermodynamic record fixture in ordinary mode still returns `blocked_missing_rows`, `scoreDecision: no_score_increase`, `missing_accepted_theta_therm`, numeric thermodynamic pass, and `4/4` negative-control pass. Re-running it with `--require-populated` exits nonzero, as intended.

No existing durable source can be safely wired as accepted `theta_therm` in this pass. The attempt fixture's source references resolve, but every required row remains `attempt`; changing status fields or pointing the wrapper back at this packet would overclaim a proof-target record as retained thermodynamic evidence.

The exact accepted `theta_therm` object must contain one carrier id binding these accepted, source-backed rows: `theta_therm`, `state_space_row`, `coarse_graining_row`, `measure_row`, `deterministic_pushforward_row`, `coarse_projection_row`, `collision_operator_row`, `entropy_balance_row`, `thermalization_depth_row`, `fluctuation_row`, `event_ledger_row`, `shared_noether_sea_row`, `source_provenance`, and `no_hidden_retune_witness`. It must also embed or reference the same accepted finite-window statistical carrier family headed by `W`; otherwise `EQ-25` would pass a thermodynamic wrapper while still splitting the underlying retained window.

First implementation target: build one CMB/radiation or measurement-record entropy fixture whose source file is not this coordination packet and whose accepted rows carry concrete ids, durable source references, same-carrier binding, passing pushforward/collision/entropy/thermalization/fluctuation/source-provenance/no-hidden-retune residuals, and passing negative controls.
