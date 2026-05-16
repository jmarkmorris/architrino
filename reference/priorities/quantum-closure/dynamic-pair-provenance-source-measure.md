# Dynamic Pair-Provenance Source-Measure Packet

This packet turns `pair_provenance_measure` into a source-measure proof target. It does not claim Bell closure. Its purpose is to define the exact mathematical object that must sit between the angular-momentum ledger and the Bell-family residual harness before [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md) can be rewritten as a passed or failed $\mathbb{A}\mathbb{A}\mathbb{A}$ account.

The immediate trigger is the executable negative control in `scripts/quantum/bell-family-residual-harness.mjs`: a finite pair-provenance grid plus local axis kernels can preserve no-signaling and measurement independence while still collapsing to Bell-local product screening. That result is valuable because it rules out a tempting shortcut. Explicit pair provenance is not enough; the source measure and apparatus response must show why the completed record law does not reduce to

$$
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi).
$$

## Incremental Value Over Existing Gates

This packet adds no new validation gate. It sharpens the existing Bell gate by giving `pair_provenance_measure` a source-side contract before any future scenario is added to the harness.

| Existing artifact | What it already protects | Increment supplied here |
| --- | --- | --- |
| [transfer-operator-basin-measure](transfer-operator-basin-measure.md) | Basin measures, invariant or metastable measures, detector-kernel discipline. | Specializes the measure grammar to a two-wing source event and joint record basins. |
| `scripts/quantum/bell-family-residual-harness.mjs` | CHSH, GHZ, Hardy, no-signaling, measurement-independence, product-screening diagnostics. | Identifies the source and apparatus variables that a future generated scenario must supply. |
| [photon-measurement-bell-gates](../angular-momentum-spin/photon-measurement-bell-gates.md) | Angular-momentum, Stern-Gerlach, photon Gate B, and Bell placement. | Supplies the quantum-closure side of the pair-provenance source-measure contract. |

The value is live because it protects contact with tested Bell-family data and prevents a proof from passing by naming shared provenance while silently re-entering the Bell-local class.

## Claim Map

| Bucket | Claim |
| --- | --- |
| Ontology | A pair-creation event leaves a definite pair-provenance ledger in the substrate history. The ledger is part of the same absolute-time causal-wake evolution as the daughter assemblies and apparatus records. |
| Derivation / closure target | Derive a source measure $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ and joint record basins $B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}$ from the angular-momentum ledger, detector kernels, and finite record window. |
| Effective summary | The observer-level singlet ket and Bell probability table are target summaries. They may be used as benchmarks, not as source-measure definitions. |
| Speculation | Any claim that pair provenance has a second Noether-Sea compliance coarse-graining remains discussion-scoped until a local statistic is derived and passes the no-signaling guardrail. |

## Source Measure Object

Let $P_{\mathrm{src}}$ denote a declared spin-pair or photon-pair preparation protocol. The source packet must identify a source return section $\Sigma_{\mathrm{src}}$ in the full regularized history space and a source occupation measure $\mu_{\mathrm{src}}$ on that section. The pair-provenance map is

$$
C_{\mathrm{pair}}
:
\Sigma_{\mathrm{src}}
\longrightarrow
\Pi_{AB},
$$

where each retained pair-provenance record has the form

$$
\Pi_{AB}
=
\left(
\Gamma_{\mathrm{parent}}(t_0^-),
\Gamma_A(t_0^+),
\Gamma_B(t_0^+),
\mathcal{L}_{\mathrm{root}}^{AB},
\mathcal{W}_{AB}[t_0,t_{\mathrm{sep}}],
\mathbf{J}_{AB}^{\mathrm{bal}},
\Theta_{AB}^{\mathrm{rel}},
\mathcal{Q}_{AB}^{\mathrm{cons}}
\right).
$$

Here $\mathcal{L}_{\mathrm{root}}^{AB}$ retains active causal-root branches through source separation, $\mathcal{W}_{AB}$ retains the pair wake and path-history record, $\mathbf{J}_{AB}^{\mathrm{bal}}$ records the angular-momentum balance such as $\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}$, $\Theta_{AB}^{\mathrm{rel}}$ records relative orientation and phase data, and $\mathcal{Q}_{AB}^{\mathrm{cons}}$ records conserved energy, momentum, polarity inventory, and admissible reaction provenance.

The source measure is the pushforward

$$
\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})
=
C_{\mathrm{pair}*}\mu_{\mathrm{src}}.
$$

This is the first object a future Bell simulation must emit. It is invalid if $\rho_{\mathrm{src}}$ is tuned against detector settings or chosen directly to reproduce the quantum table.

## Joint Record Measure

For local detector settings $\hat{\mathbf{m}}_A$ and $\hat{\mathbf{m}}_B$, unresolved apparatus and local Noether-Sea variables live in spaces $\Theta_A(\hat{\mathbf{m}}_A)$ and $\Theta_B(\hat{\mathbf{m}}_B)$ with local measures $d\nu_A$ and $d\nu_B$. The finite-window joint state space for one record trial is

$$
\Gamma_{AB}^{\mathrm{rec}}
=
\Pi_{AB}
\times
\Theta_A(\hat{\mathbf{m}}_A)
\times
\Theta_B(\hat{\mathbf{m}}_B).
$$

The record basins are measurable sets

$$
B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
\subset
\Gamma_{AB}^{\mathrm{rec}},
\qquad
a,b\in\{-1,+1\}.
$$

The candidate joint record law is

$$
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\int
\mathbf{1}_{B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}}
(\Pi_{AB},\zeta_A,\zeta_B)
\,d\nu_A(\zeta_A|\hat{\mathbf{m}}_A,\Pi_{AB})
\,d\nu_B(\zeta_B|\hat{\mathbf{m}}_B,\Pi_{AB})
\,d\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}}).
$$

This equation is a closure target, not a proof. If the basin indicator decomposes into independent local indicators after conditioning on the complete retained $\Pi_{AB}$,

$$
\mathbf{1}_{B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}}
(\Pi_{AB},\zeta_A,\zeta_B)
=
K_A(a|\hat{\mathbf{m}}_A,\Pi_{AB},\zeta_A)
K_B(b|\hat{\mathbf{m}}_B,\Pi_{AB},\zeta_B),
$$

then the candidate has product-screened itself. In that case the Bell-family gate must fail unless some declared incompleteness in $\Pi_{AB}$ is repaired by a stronger retained record.

## Obstruction Lemmas

**Lemma 1: product-screening obstruction.** If $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ is independent of detector settings and every context admits the product-screening form

$$
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\int
K_A(a|\hat{\mathbf{m}}_A,\Pi_{AB})
K_B(b|\hat{\mathbf{m}}_B,\Pi_{AB})
d\rho_{\mathrm{src}}(\Pi_{AB}),
$$

then the induced two-wing table lies in the Bell-local polytope for the corresponding measurement family. Therefore it cannot pass CHSH beyond the local bound, cannot pass the GHZ perfect-correlation parity obstruction, and cannot pass Hardy with the required zero/positive-event pattern.

Proof route: stochastic local kernels are convex combinations of deterministic one-wing response tables. Integrating over $\Pi_{AB}$ forms a convex mixture of local deterministic vertices. The CHSH, GHZ, and Hardy contradictions apply to that convex hull.

**Lemma 2: setting-provenance guard.** If

$$
\rho_{\mathrm{src}}(\Pi_{AB}|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B,P_{\mathrm{src}})
\ne
\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}}),
$$

then the candidate must report a nonzero measurement-independence residual. A correlation fit obtained this way is a measurement-independence failure, not the intended pair-provenance route.

**Lemma 3: no-signaling guard.** If the one-wing marginal depends on the distant setting before causal-wake contact,

$$
\sum_b
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
\ne
\sum_b
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}'_B),
$$

then the candidate has introduced a signal-transfer failure. The failure cannot be repaired by saying the source ledger is shared; it must be routed to an apparatus, timing, or causal-window defect.

**Lemma 4: classical-axis obstruction.** If $\Pi_{AB}$ reduces to one unresolved opposite axis $\hat{\mathbf{n}}_A=-\hat{\mathbf{n}}_B$ and each detector returns a hemisphere sign, then

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi},
$$

so the generated table reaches only the local CHSH bound. This is exactly the failure mode represented by the current generated pair-provenance negative control.

## Simulation Target

The next simulation should not add another hand-written probability table. It should emit a source-measure candidate with the following fields:

| Field | Required content |
| --- | --- |
| `source_protocol` | Preparation label and source-section assumptions. |
| `source_records` | Finite or sampled records representing $\Pi_{AB}$, each with a weight from $C_{\mathrm{pair}*}\mu_{\mathrm{src}}$. |
| `source_balance` | Energy, momentum, angular-momentum, polarity-inventory, and causal-wake provenance diagnostics for each record or record class. |
| `local_apparatus_records` | Detector-side unresolved variables $\zeta_A,\zeta_B$ and local measures $d\nu_A,d\nu_B$. |
| `record_basins` | Generated membership or transition rule for $B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}$. |
| `contexts` | Emitted two-wing probability tables for CHSH, GHZ, Hardy, and any photon-polarization variant being tested. |
| `compression_audit` | Product-screening residual against the declared complete $\Pi_{AB}$ and apparatus variables. |
| `guardrails` | $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^A$, $\Delta_{\mathrm{NS}}^B$, Tsirelson, GHZ, and Hardy diagnostics. |

The minimal executable target is to produce a JSON scenario that can be read by the Bell-family harness:

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/product-screened-axis-candidate.json \
  --pretty
```

The `--candidate` reader is an intake path, not a new gate. The included `product-screened-axis-candidate.json` fixture is a success marker for the existing failure mode: it reproduces a no-signaling, measurement-independent, product-screened negative control from explicit source records. Candidate scenarios must supply `source_protocol`, `source_records`, `source_balance`, `local_apparatus_records`, `record_basins`, `compression_audit`, `guardrails`, and `contexts`. If a context omits provenance, the reader uses the normalized `source_records` weights. If a context omits screening records and every source record supplies a `local_response`, the reader builds the product-screening audit from those local responses. A positive candidate may be added only after its probability tables are generated from the source records and record basins above.

The first generated joint-basin target is emitted by

```text
node scripts/quantum/source-measure-joint-basin-emitter.mjs \
  --pretty \
  --out scripts/quantum/source-measure-joint-basin-candidate.json
```

and checked by

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/source-measure-joint-basin-candidate.json \
  --pretty
```

This target uses a setting-independent six-cell source measure over a uniform threshold coordinate and an unbiased marginal branch. Its context-indexed joint basin recovers the singlet CHSH benchmark, preserves zero measurement-independence and no-signaling residuals, and does not reduce to the declared product-screening baseline. It is not a Bell closure proof: the threshold rule is a reduced target object whose substrate origin must still be derived from the pair-provenance ledger, the local apparatus record-window measures, and the joint record basins.

The same emitter now also includes `candidate_record_cycle_pair_coordinate`, which replaces the abstract `correlation_interval` label with records carrying the reduced coordinate

$$
\eta_{AB}
=
\operatorname{frac}
\left(
\theta_{\text{rec}}^A
-
\theta_{\text{rec}}^B
+
\varphi_{\Pi}
\right).
$$

At the current harness level this diagnostic has $|S|=2\sqrt{2}$, zero measurement-independence residual, zero no-signaling residual, zero Tsirelson excess, and product-screening residual $0.35355339059327373$ against the declared independent local-marginal baseline. This is a reduced-coordinate success marker, not a substrate derivation: the open work is still to derive $\varphi_{\Pi}$ from $\Theta_{AB}^{\mathrm{rel}}$ and to compute the local record-cycle measures from apparatus return maps.

### Complete-Record Parity Audit

The harness now separates the existing declared-baseline product-screening residual from a stricter complete-record parity audit. The old product-screening residual asks whether the emitted table differs from the screening baseline supplied in the candidate JSON. The stricter audit asks whether each retained source record can be assigned deterministic one-wing responses across the four CHSH contexts.

For a complete local-response record, write

$$
C_{ij}=A_iB_j,
\qquad
i,j\in\{0,1\}.
$$

Then every pointwise local assignment satisfies

$$
C_{00}C_{01}C_{10}C_{11}
=
+1,
$$

because each one-wing sign appears twice. The generated joint-basin candidate violates this condition on the middle source interval. For both `candidate_joint_record_basin_singlet_target` and `candidate_record_cycle_pair_coordinate`, the middle interval requires

$$
(C_{00},C_{01},C_{10},C_{11})
=
(-1,+1,-1,-1),
$$

so

$$
C_{00}C_{01}C_{10}C_{11}=-1.
$$

This is the completed-record obstruction. It means the current candidate does not merely need a better label for $\eta_{AB}$; it must derive why the retained Bell coarse-graining is not restartable as a single common-cause record with local one-wing maps. If the completed retained variables can be refined until this parity obstruction disappears, the construction has product-screened itself and the Bell-family gate fails. If the obstruction survives while $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^A$, and $\Delta_{\mathrm{NS}}^B$ remain zero, the remaining burden is to prove that the nonfactorizing parity pattern is produced by finite-time joint record basins rather than by a fitted context table.

The harness reports this as the parity residual

$$
\Delta_{\mathrm{par}}
=
\mu_{AB}^{\mathrm{rec}}
\left(
\left\{
\lambda:
C_{00}C_{01}C_{10}C_{11}=-1
\right\}
\right).
$$

For the two generated joint-basin candidates, $\Delta_{\mathrm{par}}=1/\sqrt{2}$ at the table level. This demotes those candidates from possible Bell closure candidates to failure-boundary fixtures and simulation targets. They preserve the exact obstruction a substrate derivation must explain, but they do not yet explain it. A claim that $\Delta_{\mathrm{div}}^{AB}=O(1)$ explains the obstruction is admissible only if that residual is computed before the completed local record boundary. If $\Delta_{\mathrm{div}}^{AB}=O(1)$ remains after both wings satisfy their local $\Delta_{\mathrm{rec}}$ and $\Delta_{\mathrm{div}}$ record tests, then the model has not supplied completed local measurement records in the sense required by measurement ontology.

### Local-Response Replay Target

Before another positive Bell-table candidate is promoted, the next simulation target should replay the same retained source row through the declared local apparatus response for each CHSH setting. The purpose is not to add a new Bell gate; it is to decide whether the current parity obstruction is a lawful finite-time record-window effect or a fitted context table.

| Replay input | Required content |
| --- | --- |
| Source row | $\Pi_{AB}$ identifier, weight, phase-certificate identifier, $\varphi_{\Pi}$ status, and any retained $\eta_{AB}$ or correlation interval. |
| Local apparatus row | For each $X\in\{A,B\}$ and each setting $i\in\{0,1\}$: apparatus kernel, local return-map measure, local record-cycle phase coordinate, and outcome sign when the record completes. |
| Local record residuals | $\Delta_{\mathrm{rec}}^X$, $\Delta_{\mathrm{div}}^X$, entropy-locking residual, and event-ledger residual for the same record window. |
| Pair audit row | $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^A$, $\Delta_{\mathrm{NS}}^B$, $\Delta_{\mathrm{prod}}$, and $\Delta_{\mathrm{par}}$ on the emitted table. |

The replay pass/fail rule is:

1. If replay supplies deterministic local signs $A_0,A_1,B_0,B_1$ for each completed retained row, then $C_{00}C_{01}C_{10}C_{11}=+1$ pointwise. Any resulting Bell-table success has product-screened or used another prohibited escape route.
2. If replay cannot supply the four one-wing signs because the retained source row is not restartable before the local record window, the route remains only a simulation target. It must next show how actual-setting local records still satisfy $\Delta_{\mathrm{rec}}^X\le\varepsilon_{\mathrm{rec}}$ and $\Delta_{\mathrm{div}}^X\le\varepsilon_{\mathrm{div}}$ without distant-setting dependence.
3. If $\Delta_{\mathrm{par}}>0$ is caused by setting-dependent source weights, signaling marginals, or failed local record residuals, the candidate is classified as measurement-dependent, signaling, or incomplete-record behavior rather than Bell closure.

The executable replay fixture is:

```text
node scripts/quantum/source-measure-joint-basin-emitter.mjs \
  --pretty \
  --out /tmp/source-measure-joint-basin-candidate.json

node scripts/quantum/source-measure-local-response-replay.mjs \
  --candidate /tmp/source-measure-joint-basin-candidate.json \
  --pretty \
  --out /tmp/source-measure-local-response-replay.json
```

On the current generated joint-basin candidate, the expected replay status is `failure_boundary_missing_local_response`: $\Delta_{\mathrm{par}}=1/\sqrt{2}$ remains visible, but no completed local one-wing response signs or local record residuals have been supplied.

The fail-closed local-response adapter is:

```text
node scripts/quantum/local-response-contract-adapter.mjs \
  --pretty \
  --out /tmp/local-response-contract-adapter-blocked.json
```

This adapter emits replay-ready `local_response` patches only when a candidate local Stern-Gerlach apparatus row already supplies `source_record_id`, `party`, `setting`, `sign`, `response_source`, `apparatus_kernel_id`, `setting_axis`, `Z_in_id`, `G_rec`, `Q_m`, `theta_rec_fraction`, and the same-window residuals `Delta_rec`, `Delta_div`, `entropy_locking`, and `event_ledger`. It refuses to synthesize signs from `correlation_interval`, `eta_AB_interval`, or Bell target tables. Its stable blocker codes are `local-response-row-missing`, `source-record-id-missing`, `party-missing`, `setting-missing`, `response-sign-missing`, `response-source-not-accepted`, `forbidden-bell-threshold-source`, `apparatus-kernel-missing`, `setting-axis-missing`, `z-in-missing`, `record-gate-missing`, `local-return-map-measure-missing`, `record-cycle-phase-missing`, `local-record-residuals-missing`, `delta-rec-missing`, `delta-div-missing`, `entropy-locking-missing`, `event-ledger-missing`, and `local-response-duplicate-row`.

The minimal diagnostic Stern-Gerlach response emitter is:

```text
node scripts/quantum/stern-gerlach-response-toy-emitter.mjs \
  --pretty \
  --out /tmp/stern-gerlach-response-toy-emitter-blocked.json

node scripts/quantum/local-response-contract-adapter.mjs \
  --input /tmp/stern-gerlach-response-toy-emitter-blocked.json \
  --pretty \
  --out /tmp/local-response-contract-adapter-from-sg.json
```

This emitter is intentionally narrower than the adapter. It emits `local_response_rows` only from explicit local Stern-Gerlach apparatus response inputs with `G_rec`, a nonzero signed `Q_m` or `mathcal_Q_m`, `theta_rec_fraction`, `setting_axis`, `Z_in_id`, `record_window_id`, an accepted `response_source`, and same-window residuals. It refuses `correlation_interval`, `eta_AB_interval`, Bell target tables, context probability tables, and separatrix-zero rows. Its stable blocker codes are `sg-response-row-missing`, `source-record-id-missing`, `party-missing`, `setting-missing`, `response-source-not-accepted`, `forbidden-bell-threshold-source`, `apparatus-kernel-missing`, `setting-axis-missing`, `z-in-missing`, `record-window-missing`, `record-gate-missing`, `signed-response-functional-missing`, `signed-response-separatrix-zero`, `record-cycle-phase-missing`, `local-record-residuals-missing`, `residual-window-missing`, `residual-window-mismatch`, `delta-rec-missing`, `delta-div-missing`, `entropy-locking-missing`, `event-ledger-missing`, and `sg-response-duplicate-row`.

The fail-closed apparatus-window extractor upstream of that emitter is:

```text
node scripts/quantum/stern-gerlach-apparatus-window-source-emitter.mjs \
  --pretty \
  --out /tmp/stern-gerlach-apparatus-window-source-emitter-blocked.json

node scripts/quantum/stern-gerlach-apparatus-response-input-extractor.mjs \
  --input /tmp/stern-gerlach-apparatus-window-source-emitter-blocked.json \
  --pretty \
  --out /tmp/stern-gerlach-apparatus-response-input-extractor-blocked.json

node scripts/quantum/stern-gerlach-response-toy-emitter.mjs \
  --input /tmp/stern-gerlach-apparatus-response-input-extractor-blocked.json \
  --pretty \
  --out /tmp/stern-gerlach-response-toy-emitter-from-apparatus-window.json
```

The source emitter is a blocked-first producer for the extractor. It emits `apparatus_response_windows` only when a row supplies accepted-history provenance, local apparatus target metadata, an explicit response-functional source, a complete local record gate, a record-cycle phase, and same-window record residuals. For each response sample, it either carries an explicit `Jdot_app` vector or computes it from

$$
\dot{\mathbf{J}}_{C}^{\mathrm{app}}
=
\mu_{\mathrm{arch}}
\sum_i
\left(\mathbf{x}_i-\mathbf{X}_C\right)
\times
\mathbf a_i^{\mathrm{app}}
+
\dot{\mathbf L}_{\mathrm{wake}}.
$$

The extractor then emits `stern_gerlach_response_rows` only from explicit Master-Equation apparatus-window rows. A ready row must supply `Sigma_m_in`, `Lambda_m_in_out`, strictly ordered integrand samples with `Lambda_m_to_out`, `N_m`, and `Jdot_app`, the local record gate inputs `R_pre`, `R_rec`, `R_star`, `T_rec`, and `tau_persist`, an explicit record-cycle phase, and the same-window residuals required by the toy emitter. It computes

$$
\mathcal{Q}_{\hat{\mathbf{m}}}
=
e^{\Lambda_{\hat{\mathbf{m}}}(t_{\mathrm{in}},t_{\mathrm{out}})}
\Sigma_{\hat{\mathbf{m}}}(Z_{\mathrm{in}})
+
\int
e^{\Lambda_{\hat{\mathbf{m}}}(s,t_{\mathrm{out}})}
\mathcal{N}_{\hat{\mathbf{m}}}(Z(s),s)
\cdot
\dot{\mathbf{J}}_{C}^{\mathrm{app}}(s)\,ds
$$

by trapezoid rule on the declared samples, computes `G_rec` with the project convention $H(0)=0$, and refuses Bell target tables, `correlation_interval`, `eta_AB_interval`, context probabilities, separatrix-zero rows, incomplete record gates, and residual-window mismatches. This supplies the first executable bridge between apparatus-window dynamics and the local-response adapter without treating a Bell-table target as a sign source.

The current repo does not yet contain a real accepted-history Stern-Gerlach apparatus-window artifact. Running the nearest available mass-map path,

```text
node scripts/mass-map/a0-tier1-continuation-source-prototype.mjs \
  --tier0 scripts/tri-binary/fixtures/a0-tier0-branch-search-minimal.json \
  --pretty \
  --out /tmp/a0-tier1-continuation-source-prototype.json

node scripts/mass-map/a0-tier1-one-period-continuation-prototype.mjs \
  --source /tmp/a0-tier1-continuation-source-prototype.json \
  --pretty \
  --out /tmp/a0-tier1-one-period-continuation-prototype.json

node scripts/mass-map/a0-tier1-accepted-history-writer.mjs \
  --tier0 scripts/tri-binary/fixtures/a0-tier0-branch-search-minimal.json \
  --continuation /tmp/a0-tier1-continuation-source-prototype.json \
  --pretty \
  --out /tmp/a0-tier1-accepted-history-from-continuation-source.json
```

now reconstructs finite carrier-chart samples and the carrier root ledger from the compact Tier 0 fixture. The default short direct-root ladder blocks the one-period intake at `blocked_fold_splitting_probe_horizon_short`, with `estimated_steps_for_one_period=46141573`; the sharper controller-and-lock diagnostic is:

```text
node scripts/mass-map/a0-tier1-continuation-source-prototype.mjs \
  --tier0 scripts/tri-binary/fixtures/a0-tier0-branch-search-minimal.json \
  --direct-probe-steps 64 \
  --direct-step-fraction-ladder 0.0009765625 \
  --pretty \
  --out /tmp/a0-tier1-continuation-source-prototype-fold-lock.json

node scripts/mass-map/a0-tier1-one-period-continuation-prototype.mjs \
  --source /tmp/a0-tier1-continuation-source-prototype-fold-lock.json \
  --pretty \
  --out /tmp/a0-tier1-one-period-continuation-prototype-fold-lock.json
```

On the compact Tier 0 fixture this run classifies the first self-root surplus as `fold-layer` at step `276` with `dynamics_step_fraction=0.0009765625`, surplus keys `I+|I+|self|active` and `I-|I-|self|active`, and an event horizon fraction `0.00002386388014033042`. The event-local `direct-root-fold-layer-lock` is `ready`. The raw controller lowers the estimate from `46247370` to `11561729` direct-root steps per period, and the raw fold-layer-lock event estimate is `11565597`, still about `11.56` times the current direct attempt cap. The fold-layer-locked integrator seed then compresses the locked event work into `41905` locked events with `276` retained direct-root steps per event, selects macro stride `12`, and the one-period intake reports `ready_for_fold_layer_locked_one_period_attempt` with `estimated_steps_for_one_period=963815` under the current `1000000` cap. This is an attempt-budget milestone only, not accepted Tier 1 history: residual closure, no secular center drift, `Delta_k_positive`, and same-branch persistence across the eta ladder remain uncomputed and fail-closed. The accepted-history writer remains correctly blocked at `blocked_tier1_acceptance_incomplete`; the remaining acceptance blockers are `status_is_accepted_history_segment`, `source_row_identity_matches` because the compact fixture lacks `z_lambda`, `residuals_below_tolerance`, `no_secular_center_drift`, `Delta_k_positive`, and `same_branch_persists_across_eta_ladder`. Feeding that writer output into the apparatus-window source emitter gives the live missing-field set: `accepted-history-status-missing`, missing local apparatus target metadata (`party`, `setting`, `apparatus_kernel_id`, `setting_axis`, `Z_in_id`, `record_window_id`), missing response-functional source (`Sigma_m_in`, `Lambda_m_in_out`, sample `N_m`, and `Jdot_app` or computable torque terms), missing `record_gate`, missing `record_cycle`, and missing same-window residuals.

The next minimal quantum-side producer remains a data artifact, not another Bell-table fixture, but it is blocked on the upstream fold-layer-locked Tier 1 continuation emitting a real `accepted_history_segment`. Once that exists, pair one accepted-history row with an apparatus target overlay and a response-functional source. The required row shape is

| Component | Required fields |
| --- | --- |
| Accepted history | `status=accepted_history_segment`, ordered `samples`, and nonempty `active_causal_root_ledger`. |
| Apparatus target | `source_record_id`, `party`, `setting`, `apparatus_kernel_id`, `setting_axis`, `Z_in_id`, and `record_window_id`. |
| Response-functional source | `Sigma_m_in`, `Lambda_m_in_out`, and ordered samples with `Lambda_m_to_out`, `N_m`, and either `Jdot_app` or torque terms `mu_arch`, `X_C`, `x_i`, `a_i_app`, and optional wake angular-momentum rate. |
| Record closure | `record_gate`, `record_cycle`, and same-window `Delta_rec`, `Delta_div`, `entropy_locking`, and `event_ledger`. |

### Phase-Certificate Diagnostic Contract

The next executable object is not another Bell table. It is a branch-certificate phase row that can say whether the proposed $\varphi_{\Pi}$ was computed from retained source data or merely inserted as a reduced coordinate. Each row should contain:

| Field | Required content |
| --- | --- |
| `source_event` | $t_0$, $t_{\mathrm{sep}}$, daughter positions $\mathbf X_A(t_{\mathrm{sep}})$ and $\mathbf X_B(t_{\mathrm{sep}})$, the derived $\hat{\mathbf a}_{AB}$, and a nonzero-axis margin. |
| `layer_phase_ledgers` | For each $X\in\{A,B\}$ and $\ell\in\{I,M,O\}$: $\phi_{\ell X}(t_0^+)$, $\int_{t_0}^{t_{\mathrm{sep}}}\omega_{\ell X}(t)\,dt$, $\Phi_{\ell X}^{\text{root}}$, and $\Phi_{\ell X}^{\text{frame}}$. |
| `angular_momentum_ledger` | $\mathbf J_{\ell X}^{\mathrm{bal}}$, the projection $\hat{\mathbf a}_{AB}\cdot\mathbf J_{\ell X}^{\mathrm{bal}}$, and the total balance residual for $\mathbf J_A+\mathbf J_B$ plus any retained wake term. |
| `wake_phase_ledger` | $\mathbf L_{\mathrm{wake},X}^{AB}$, $\Theta_{\mathrm{wake},X}^{AB}$, $\Phi_{AB}^{\text{wake}}$, and a flag saying whether the wake phase is substrate-derived or diagnostic. |
| `phasor_output` | $Z_A^{AB}$, $Z_B^{AB}$, their magnitudes, $\varphi_{\Pi}$, and the derived $\eta_{AB}$ fraction when local record phases are supplied. |
| `quotient_audit` | Probe rows for allowed branch-preserving gauge changes and the resulting $\Delta_{\varphi}^{\mathrm{gauge}}$. |
| `failure_residuals` | Nonzero-axis, angular-balance, wake-certificate, zero-phasor, and gauge-phase residuals. |

The focused diagnostic emitter is:

```text
node scripts/quantum/pair-phase-certificate-emitter.mjs \
  --pretty \
  --out /tmp/pair-phase-certificate-diagnostic.json
```

This emitter computes $Z_A^{AB}$, $Z_B^{AB}$, $\varphi_{\Pi}$, the derived $\eta_{AB}$ fraction, and the residual fields from declared diagnostic rows. It is not a Bell-family harness candidate and does not claim substrate derivation. A row with `wake_certificate_missing=1` or `certificate_status=diagnostic_declared_row` is a JSON-shape success marker only. A future positive source-measure candidate may copy this shape into `source_records` only after the same fields are filled from an accepted branch certificate and the product-screening audit remains nonzero without setting-dependent source weights.

The fail-closed intake adapter is:

```text
node scripts/quantum/pair-phase-certificate-adapter.mjs \
  --pretty \
  --out /tmp/pair-phase-certificate-adapter-blocked.json
```

This adapter reads accepted-history or action-increment style artifacts and refuses to synthesize a positive pair-phase row unless the accepted branch certificate already supplies the pair-source event, daughter certificates, layer phase ledgers, angular-momentum balances, substrate-derived wake phase ledger, local record-cycle phases, and gauge probes. Its stable blocker codes are `accepted-branch-certificate-missing`, `pair-source-event-missing`, `source-weight-missing`, `daughter-certificate-missing`, `layer-phase-ledger-missing`, `angular-momentum-balance-missing`, `wake-phase-ledger-missing`, and `gauge-probe-missing`. A blocked adapter artifact is a provenance audit, not a failure of the phase diagnostic itself.

The accepted-history layer-phase diagnostic is:

```text
node scripts/quantum/accepted-history-layer-phase-extractor.mjs \
  --input /tmp/a0-tier1-accepted-history-layer-phase-extractor.json \
  --pretty \
  --out /tmp/accepted-history-layer-phase-extractor.json
```

This extractor computes provisional per-layer relative vectors, reduced angular-momentum vectors, unwrapped phase samples, and plane-stability residuals from accepted-history samples. It remains fail-closed: unaccepted history rows stay blocked, and the script emits pair-phase-certificate input only when the pair-source event, daughter ledgers, substrate-derived wake phase, source weight, local record-cycle phases, and quotient-audit probes are already explicit in the input. It therefore narrows the layer phase part of $\Theta_{\ell X}^{AB}$ without claiming $\varphi_{\Pi}$, $\eta_{AB}$, or Bell-family closure.

The diagnostic residuals should be read as first filters:

$$
\widehat{\Delta}_{\varphi}^{\mathrm{gauge}}
=
\max_j
\operatorname{dist}_{S^1}
\left(
\varphi_{\Pi}^{(j)},
\varphi_{\Pi}^{(0)}
\right),
$$

where $j$ ranges over declared branch-preserving gauge probes, and

$$
m_Z
=
\min\left(|Z_A^{AB}|,|Z_B^{AB}|\right),
\qquad
\Delta_Z^{0}
=
\mathbf 1_{m_Z\le\epsilon_0}.
$$

The wake-certificate residual is not a physics residual by itself. It is a provenance flag: it vanishes only when $\Phi_{AB}^{\text{wake}}$, $\Theta_{\mathrm{wake},X}^{AB}$, and $\mathbf L_{\mathrm{wake},X}^{AB}$ are supplied by a retained causal-wake ledger rather than declared for a diagnostic row.

## Pair-Basin Threshold Theorem Target

The diagnostic target becomes a useful proof problem only if the inserted threshold can be replaced by a derived basin coordinate. A candidate reduced record may refine $\Gamma_{AB}^{\mathrm{rec}}$ by a sign branch $\sigma\in\{-1,+1\}$ and a threshold coordinate $\eta_{AB}\in[0,1]$:

$$
\Gamma_{AB}^{\mathrm{thr}}
=
\Pi_{AB}
\times
\Theta_A(\hat{\mathbf{m}}_A)
\times
\Theta_B(\hat{\mathbf{m}}_B)
\times
\{-1,+1\}_{\sigma}
\times
[0,1]_{\eta}.
$$

The required source-and-apparatus measure must be invariant under the sign flip

$$
F(\Pi_{AB},\zeta_A,\zeta_B,\sigma,\eta_{AB})
=
(\Pi_{AB},\zeta_A,\zeta_B,-\sigma,\eta_{AB}),
\qquad
F_*\mu_{AB}^{\mathrm{thr}}=\mu_{AB}^{\mathrm{thr}}.
$$

For spin-singlet settings, the target same-outcome threshold is

$$
T_{\mathrm{same}}(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\frac{1-\hat{\mathbf{m}}_A\cdot\hat{\mathbf{m}}_B}{2}.
$$

The reduced target basins are then

$$
B_{\sigma,\sigma}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
=
\left\{
(\cdots,\sigma,\eta_{AB}):
0\le\eta_{AB}<T_{\mathrm{same}}(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
\right\},
$$

and

$$
B_{\sigma,-\sigma}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
=
\left\{
(\cdots,\sigma,\eta_{AB}):
T_{\mathrm{same}}(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)<\eta_{AB}\le1
\right\},
$$

with boundary measure zero. If $(\eta_{AB})_*\mu_{AB}^{\mathrm{thr}}=d\eta$ and the sign branch has equal measure, the induced table is

$$
P(\sigma,\sigma|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\frac{1}{2}T_{\mathrm{same}},
\qquad
P(\sigma,-\sigma|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\frac{1}{2}\left(1-T_{\mathrm{same}}\right),
$$

so

$$
E(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
2T_{\mathrm{same}}-1
=
-\hat{\mathbf{m}}_A\cdot\hat{\mathbf{m}}_B.
$$

**No-signaling marginal lemma.** Under the sign-flip symmetry above, the one-wing marginals are

$$
\sum_bP(+1,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\sum_bP(-1,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\frac{1}{2},
$$

and similarly for the $B$ wing. Therefore the emitted probability table has zero no-signaling residual even though the joint basin is context-indexed. This is only a table-level lemma. A substrate proof must still show that the context-indexed basin is produced by pair provenance, local apparatus record-window dynamics, and ordinary later record comparison, not by distant-setting dependence at either detector.

### Candidate Source For $\eta_{AB}$

The first substrate candidate for the inserted threshold coordinate should reuse existing record-window variables rather than add a new random label. Let $\theta_{\text{rec}}^A$ and $\theta_{\text{rec}}^B$ be the local apparatus record-cycle phases inside $\Theta_A(\hat{\mathbf{m}}_A)$ and $\Theta_B(\hat{\mathbf{m}}_B)$, and let

$$
\varphi_{\Pi}:\Pi_{AB}\to S^1
$$

read the relative phase component retained by $\Theta_{AB}^{\mathrm{rel}}$. A concrete theorem target for this map starts from the source-separation axis

$$
\hat{\mathbf a}_{AB}
=
\frac{\mathbf X_A(t_{\mathrm{sep}})-\mathbf X_B(t_{\mathrm{sep}})}
{\|\mathbf X_A(t_{\mathrm{sep}})-\mathbf X_B(t_{\mathrm{sep}})\|},
$$

when that axis is nonzero. For each daughter $X\in\{A,B\}$ and layer $\ell\in\{I,M,O\}$, define the source-to-separation phase ledger

$$
\Theta_{\ell X}^{AB}
=
\phi_{\ell X}(t_0^+)
+
\int_{t_0}^{t_{\mathrm{sep}}}\omega_{\ell X}(t)\,dt
+
\Phi_{\ell X}^{\text{root}}
+
\Phi_{\ell X}^{\text{frame}}.
$$

Let $\mathbf J_{\ell X}^{\mathrm{bal}}$ denote the layer contribution to $\mathbf J_{AB}^{\mathrm{bal}}$, and let $\mathbf L_{\mathrm{wake},X}^{AB}$ denote the daughter-side wake contribution retained by $\mathcal W_{AB}[t_0,t_{\mathrm{sep}}]$. The angular-momentum-weighted phase phasor is

$$
Z_X^{AB}
=
\sum_{\ell\in\{I,M,O\}}
\left(\hat{\mathbf a}_{AB}\cdot\mathbf J_{\ell X}^{\mathrm{bal}}\right)
e^{i\Theta_{\ell X}^{AB}}
+
\left(\hat{\mathbf a}_{AB}\cdot\mathbf L_{\mathrm{wake},X}^{AB}\right)
e^{i\Theta_{\mathrm{wake},X}^{AB}}.
$$

The candidate relative phase is then

$$
\varphi_{\Pi}(\Pi_{AB})
=
\arg\!\left(
-
Z_A^{AB}\overline{Z_B^{AB}}
e^{i\Phi_{AB}^{\text{wake}}}
\right),
$$

where $\Phi_{AB}^{\text{wake}}$ denotes the cross-wake phase contribution extracted from $\mathcal W_{AB}[t_0,t_{\mathrm{sep}}]$. This is not a new ontology term; it is a temporary proof symbol for the phase part of the retained pair wake. The minus sign is the singlet-like phase inversion associated with the angular-momentum balance, not an imported quantum postulate.

This map is admissible only if it survives the pair-provenance quotient. Let $G_{\mathrm{pair}}$ be the allowed branch-preserving gauge action on the retained pair record: time-origin changes, smooth phase reparameterizations inside one closed root-ledger cell, and deformations that preserve the declared source, root, wake, balance, and reaction-provenance records. The gauge residual is

$$
\Delta_{\varphi}^{\mathrm{gauge}}
=
\sup_{g\in G_{\mathrm{pair}}}
\operatorname{dist}_{S^1}
\left(
\varphi_{\Pi}(g\cdot\Pi_{AB}),
\varphi_{\Pi}(\Pi_{AB})
\right).
$$

If $\Delta_{\varphi}^{\mathrm{gauge}}\ne0$, then $\varphi_{\Pi}$ is a coordinate artifact and the pair-basin route fails before any Bell-family comparison. If $Z_A^{AB}=0$ or $Z_B^{AB}=0$ on a positive-measure source class, the scalar phase is undefined there and the retained pair record is not strong enough for this candidate.

With this candidate, the pair coordinate is

$$
\eta_{AB}
=
\frac{1}{2\pi}
\left[
\theta_{\text{rec}}^A
-
\theta_{\text{rec}}^B
+
\varphi_{\Pi}(\Pi_{AB})
\right]_{2\pi},
$$

where $[\cdot]_{2\pi}$ denotes the representative in $[0,2\pi)$. This equation is only a theorem target. It is admissible only if $\varphi_{\Pi}$ is computed from the retained pair-provenance ledger and if the two local record-cycle phases are sampled from the local apparatus return-map measures already present in the joint record law.

For each detector-setting context, let $\mu_{AB}^{\mathrm{rec}}$ denote the joint measure in the earlier record-law integral. The closure target is

$$
(\eta_{AB})_*\mu_{AB}^{\mathrm{rec}}=d\eta,
\qquad
\mu_{AB}^{\mathrm{rec}}
\left(
0\le\eta_{AB}
<
T_{\mathrm{same}}(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
\right)
=
\frac{1-\hat{\mathbf{m}}_A\cdot\hat{\mathbf{m}}_B}{2}.
$$

In expanded form, the first equality means

$$
\left(
\operatorname{frac}
\left(
\frac{
\theta_{\text{rec}}^A
-
\theta_{\text{rec}}^B
+
\varphi_{\Pi}(\Pi_{AB})
}{2\pi}
\right)
\right)_*
\left(
d\nu_A\,d\nu_B\,d\rho_{\mathrm{src}}
\right)
=
d\eta.
$$

The first equality is the uniform-pushforward burden; the second says the same-outcome basin measure is the singlet benchmark rather than a fitted table. The candidate fails if the pushforward is imposed by hand, if the required relative phase cannot be extracted from $\Theta_{AB}^{\mathrm{rel}}$, if $\varphi_{\Pi}$ is not invariant under $G_{\mathrm{pair}}$, or if the four induced basins product-screen after conditioning on the complete retained record. A concrete screening diagnostic is

$$
\Delta_{\mathrm{prod}}
=
\inf_{K_A,K_B}
\sup_{a,b,\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
\left|
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
-
\int
K_A(a|\hat{\mathbf{m}}_A,\Pi_{AB},\zeta_A)
K_B(b|\hat{\mathbf{m}}_B,\Pi_{AB},\zeta_B)
\,d\mu_{AB}^{\mathrm{rec}}
\right|.
$$

If $\Delta_{\mathrm{prod}}$ vanishes within the declared harness tolerance, the coordinate has reduced to the Bell-local class and the Bell-family gate fails. If $\Delta_{\mathrm{prod}}$ remains nonzero while $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^A$, and $\Delta_{\mathrm{NS}}^B$ vanish, the construction becomes a serious candidate for a substrate derivation.

This theorem target fails in any of the following cases:

1. $\eta_{AB}$ or $T_{\mathrm{same}}$ is chosen directly to reproduce the singlet table rather than derived as a basin coordinate and separatrix threshold.
2. $\Delta_{\varphi}^{\mathrm{gauge}}\ne0$, so the proposed relative phase is changed by a branch-preserving gauge transformation.
3. The retained record admits a factorization into one-wing kernels after conditioning on the complete $\Pi_{AB}$ and local apparatus variables.
4. $F_*\mu_{AB}^{\mathrm{thr}}\ne\mu_{AB}^{\mathrm{thr}}$, so the local marginals drift away from $\frac{1}{2}$.
5. $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ depends on later detector settings.
6. The construction requires superluminal signal, energy transfer, causal-wake transfer, or treating information as ontology.

## Promotion Gates

1. $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ is a pushforward of a declared source measure, not a fitted Bell table.
2. The source measure is independent of later detector settings within the declared causal-window tolerance.
3. The local apparatus measures are derived from detector or material return maps, not from inserted Born-rule weights.
4. The joint record basins are measurable and cover the retained trial space up to a declared escape tolerance.
5. The product-screening audit is explicit. If the completed retained record product-screens, Bell closure fails rather than being reworded.
6. The emitted tables pass or fail the harness with named residuals for CHSH, GHZ, Hardy, no-signaling, measurement independence, and Tsirelson.
7. Photon-polarization variants use the photon Gate B angle law and analyzer measure; spin-singlet variants use the spin-$\tfrac{1}{2}$ Stern-Gerlach response route.

## Remaining Blockers

- The delayed total-angular-momentum functional still needs a source-event evaluation for a changing-frequency Noether core.
- The effective spinor coordinate and the conditions under which the record-cycle measure flattens to the ideal chart remain lower-level proof obligations.
- The current product-screened generated axis model is a correct failure control, not a partial success.
- The generated joint-basin target is now a failure-boundary fixture and simulation target, not a positive Bell closure candidate. Its table-level success is blocked by $\Delta_{\mathrm{par}}=1/\sqrt{2}$ until a local-response replay target locates the obstruction before the completed local record boundary without setting-dependent source weights or signaling.
- Any future source-measure scenario must decide whether nonfactorization comes from an incomplete retained record, a genuinely joint record-basin construction, or a failed premise in the attempted $\Pi_{AB}$ compression. Vague nonlocality language is not an acceptable output.

## Handoff

This packet upgrades `pair_provenance_measure` from a deferred label to a scaffolded source-measure target. It leaves `bell_gate` blocked until a source-measure candidate emits tables into the harness and the compression audit reports whether the result is Bell-local, subquantum, quantum-compatible, signaling, measurement-dependent, or superquantum.
