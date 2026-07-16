# Fold-Crossing Click-Impulse Packet

Status: verification/refinement packet, 2026-07-07. Verifies and refines the branch-orientation half of the [Fold-Crossing Chart Spec](fold-crossing-chart-spec.md) for `self_hit_held_release_solver_row` (Group A item 3).

Proof ID: `SH-0-sea` (self-hit fold-chart sub-target).

Claim level: measurement and chart derivation. This packet does not claim accepted retained evidence, retained-branch closure, force/action closure, Noether sea response closure, stability, branch-chart output, click-mechanism closure, observer export, score movement, or corpus promotion. Every output fails closed at the central seed-path certificate and the central retained-history row.

Executable artifact: [fold-crossing-click-impulse-diagnostic.mjs](../../../../scripts/braid-ideal/fold-crossing-click-impulse-diagnostic.mjs), with focused tests in [braid-ideal-fold-crossing-click-impulse-diagnostic.test.js](../../../../tests/braid-ideal-fold-crossing-click-impulse-diagnostic.test.js).

Accepted-evidence blocker preserved (unchanged):

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- candidate artifact: `held_release_seed_path_rows:5833f18e53586201`;
- downstream producer boundary: `central_solver_retained_history_row`.

## Relation To The Fold-Crossing Chart Spec

The [Fold-Crossing Chart Spec](fold-crossing-chart-spec.md) landed the same day with the Whitney-fold normal-form derivation and a measurement on the recorded `vt095` crossing. Its Section 6 reconstructs the crossing as a rigid rotation at fixed radius $\rho$ and fixed crossing speed $\beta_c$, with self-hit residual $F(\Delta;\beta)=2\rho\sin(\omega\Delta/2)-c_f\Delta$, and finds two exact consequences of that reconstruction: the self-hit onset is a cusp ($A_3$) born at the coincidence stratum $\{r=0\}$, so the click-impulse **magnitude** grows without bound as the spatial regulator shrinks; and the branch orientation is $m=D_T/D_s=1$ by reflection symmetry, giving no orientation caustic. Its disposition closes the naive hinge-click absorber on the symmetric channel at the kernel level.

This packet verifies the magnitude half and refines the branch-orientation half. It confirms the coincidence birth and the resulting magnitude regulator-dependence directly on the actual worldline. It then shows that the $m=1$ result is an artifact of the fixed-$\beta$ reconstruction: freezing the tangential speed discards the pump-driven acceleration, which is exactly the asymmetry that sets the branch-orientation sign. On the actual accelerating crossing the sign is not indeterminate — it is regulator-independently **absorptive**.

## Notation And Kernel

Architrino sites use the signed polarity-unit labels $\epsilon_{+,\bullet}$ and $\epsilon_{-,\bullet}$. The kernel, coupling, field speed $c_f$, softening, Jacobian floor, and self-hit minimum delay are exactly those of the sea-screened self-hit toy row. Propagation is at field speed $c_f$; only causal-delay terminology is used. A same-source pair is a site and its own path history, so its polarity product is $\sigma_{\mathrm{self}}=+1$.

The same-source causal residual is the fold-set object of the [core definition](../../../../content/markdown/aaa/foundations/architrino.md#core-definition) specialized to receiver equal to source,

$$
F_T(s)=\lVert \mathbf X(T)-\mathbf X(s)\rVert-c_f\,(T-s),
$$

with root distance $d$, unit ray $\hat{\mathbf d}$, source-normal denominator $D_s=c_f-\mathbf V(s_r)\cdot\hat{\mathbf d}$, and receiver-normal numerator $D_T=c_f-\mathbf V(T)\cdot\hat{\mathbf d}$. The signed branch orientation is $m=D_T/D_s$. The canonical master equation carries the **signed** $m$; the toy's same-source kernel carries only $\lvert m\rvert$.

## The Branch-Orientation Sign Is Set By The Pump-Driven Asymmetry

The rigid-rotation reconstruction freezes the site at one tangential speed $\beta_c$. Then the receiver at reception time $T$ and its emitting past at $s_r$ sit at reflected points of one circle with equal speeds, and the chord geometry gives $\mathbf V(T)\cdot\hat{\mathbf d}=\mathbf V(s_r)\cdot\hat{\mathbf d}$ exactly, hence $D_T=D_s$ and $m=1$. This is correct for a static circle.

The pumped crossing is not static. The certified tangential pump $\Phi_{\mathrm{tan}}\approx2.9\beta$ is accelerating the site through the field-speed edge, so the tangential speed is strictly increasing across the crossing. At a same-source root the emission event is earlier than the reception event, so the receiver is faster than its own emitting past: $\lvert\mathbf V(T)\rvert>\lvert\mathbf V(s_r)\rvert$. The field-speed edge is crossed by the receiver first. In the window just past the crossing the receiver is super-field along the ray while its own past is still sub-field:

$$
D_T=c_f-\mathbf V(T)\cdot\hat{\mathbf d}<0<c_f-\mathbf V(s_r)\cdot\hat{\mathbf d}=D_s,
\qquad m=\frac{D_T}{D_s}<0.
$$

The sign is opposite to the rigid-rotation $m=1$ precisely because the fixed-$\beta$ model set $\mathbf V(T)=\mathbf V(s_r)$ and removed the acceleration. Measured on the recorded `vt095` clean incoming worldline (field-speed hinge at $T_\ast=0.42893$), the same-source root carries opposite-signed denominators at every reception time past the hinge, arbitrarily close to birth:

| $T$ | receiver speed | source speed | $D_s$ | $D_T$ | $m=D_T/D_s$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| `0.4304` | `1.00270` | `0.99373` | `+0.00629` | `-0.00270` | `-0.43` |
| `0.4320` | `1.00567` | `0.99085` | `+0.00920` | `-0.00565` | `-0.62` |
| `0.4360` | `1.01320` | `0.98367` | `+0.01648` | `-0.01311` | `-0.80` |
| `0.4400` | `1.02088` | `0.97660` | `+0.02372` | `-0.02066` | `-0.87` |

Because $\sigma_{\mathrm{self}}=+1$ and the fold ray is forward ($\hat{\mathbf t}\cdot\hat{\mathbf d}\to+1$), the sign of the tangential click impulse is $\operatorname{sign}(\sigma_{\mathrm{self}}(\hat{\mathbf t}\cdot\hat{\mathbf d})\,m)=\operatorname{sign}(m)<0$: **absorptive**. The controlled-click question reduces to the sign of the receiver-normal numerator at the fold, and the pump-driven acceleration makes that sign negative.

## What Is And Is Not Regulator-Independent

The chart impulse is

$$
\mathcal I_{\mathrm{tan}}
=\sigma_{\mathrm{self}}\,\kappa
\int
\frac{(\hat{\mathbf t}\cdot\hat{\mathbf d})}{d^2}\,
\frac{D_T}{D_s}\;dT .
$$

Fed the softening, the Jacobian floor, and the self-hit minimum delay, the chart integrand does not read any of them (it uses exact $D_s$, no clamp, no softened denominator, no delay gate), so $\mathcal I_{\mathrm{tan}}$ is bit-identical across those three regularizers while the naive absolute-weight impulse drifts across them. That part matches the intended chart independence.

The self-hit fold on the symmetric channel is nonetheless born at the coincidence stratum $d\to0$, exactly as the chart spec measured. The magnitude therefore depends on the resolved lower edge $d_{\mathrm{cut}}$: the executable cut sweep on the sea-screened rows gives, at fixed sign,

| resolved chord $d_{\mathrm{cut}}$ | $\mathcal I_{\mathrm{tan}}$ | sign |
| ---: | ---: | --- |
| `0.040` | `-9.0` | absorptive |
| `0.020` | `-23.1` | absorptive |
| `0.010` | `-55.7` | absorptive |
| `0.005` | `-137.1` | absorptive |
| `0.0025` | `-588.3` | absorptive |

The magnitude grows without bound as $d_{\mathrm{cut}}\to0$ (the coincidence-stratum divergence the chart spec named), so there is no regulator-independent magnitude. The sign is absorptive at every cut. This is the reconciled statement: the branch-orientation **sign** is regulator-independent; the impulse **magnitude** is coincidence-sensitive and is set by the point-transceiver spatial self-regularization of the coincidence stratum — the same declared spatial regulator that makes a retained point-transceiver branch admissible in the [point-transceiver status](../../../../content/markdown/aaa/foundations/architrino.md#point-transceiver-status) — not by the fold parameters.

## Executable Diagnostic

The diagnostic builds the incoming worldline of one receiver site through the hinge, either from the sea-screened self-hit rows via [held-release-causal-wake-toy.mjs](../../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs) (`--drive-toy`) or from a hermetic canonical rotating-channel model with the same fold sign structure, and computes side by side the naive absolute-branch-weight impulse and the chart-defined signed impulse, plus a convergence witness (nstep at fixed cut), a regularization-invariance witness (softening / floor / min-delay), a coincidence-cut sensitivity witness, and a diagnostic-only $h_{\mathrm{act}}$ ledger row per row.

Naive post-hinge ejection magnitude (final field-speed ratio, `--include-self-hits`, duration $3$), reproducing the recorded drift on `vt095`:

| Regularization | vt095 final $c_f$ ratio |
| --- | ---: |
| Jacobian floor $0.05$, self-hit min delay $0.002$ | `12.39` |
| Jacobian floor $0.20$, self-hit min delay $0.002$ | `9.83` |
| Jacobian floor $0.05$, self-hit min delay $0.050$ | `10.55` |

Chart-defined signed impulse on the three sea-screened rows (resolved edge $d_{\mathrm{cut}}=0.01$):

| Run handle | $\beta$ | fold birth $D_s$ | fold birth $D_T$ | $m$ | sign | sign stable across cuts | magnitude regulator-independent |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `sh0sea-a4.25-selfhit-vt080-moving-prehistory` | `0.80` | `+0.0125` | `-0.0084` | `-0.67` | absorptive | yes | no |
| `sh0sea-a4.25-selfhit-vt095-moving-prehistory` | `0.95` | `+0.0110` | `-0.0074` | `-0.68` | absorptive | yes | no |
| `sh0sea-a4.25-selfhit-vt099-moving-prehistory` | `0.99` | `+0.0105` | `-0.0071` | `-0.68` | absorptive | yes | no |

The signed impulse is invariant across the softening / Jacobian-floor / self-hit-minimum-delay triples that drive the recorded naive $12.4\to9.8\to10.6$ ejection drift, and its sign is absorptive in every row and at every coincidence cut, while its magnitude is coincidence-sensitive.

## Booked Action Ledger

Each witnessed fold crossing emits a diagnostic-only $h_{\mathrm{act}}$ ledger row that reuses the closed-cycle action-unit convention of the [action clicks section](../../../../content/markdown/aaa/noether-braid/braid-families.md#action-clicks-at-the-field-speed-hinge) without minting a new validator or schema. The row books one closed-cycle action unit $h_{\mathrm{act}}$ per crossing, with the transacted cycle increment $-1\cdot h_{\mathrm{act}}$ for the absorptive sign and the absorber decision, and fails closed at the seed-path certificate. The magnitude of the transacted unit is left to the spatial self-regularization; the rows book direction, not amount.

## Decision

`absorptive_branch_orientation_sign_regulator_independent_magnitude_coincidence_sensitive`. The symmetric self-hit fold has no regulator-independent click-impulse magnitude, confirming the chart spec's coincidence finding, so this is not a clean chart impulse. But its branch-orientation sign is regulator-independently absorptive, refining the chart spec's rigid-rotation $m=1$: the click, if it transacts at all, transacts in the direction that drains the pumped tangential action, not the direction that ejects it. The toy's uniform ejection was the absolute-value branch weight discarding this sign.

Consequence for the queue: the hinge-click absorber on the symmetric channel is not closed by an ejective sign, as the naive toy suggested and as a fixed-$\beta$ reading would imply. It is instead reduced to a spatial-self-regularization question — the transacted amount is set by the coincidence-stratum regulator that the point-transceiver ontology already carries — while its direction is fixed and absorptive. The non-coincident-geometry route named by the chart spec would additionally give a regulator-independent magnitude; the operator decision is whether a sign-definite, spatially-self-regularized hinge transfer on the symmetric channel is admitted for the absorber program, or whether a non-coincident hinge geometry is required for a chart-clean magnitude.

## Follow-Up Producer Boundary

The retained-history path needs a central-solver contract extension, named here as the next producer boundary rather than implemented in this thread:

- the `central_solver_retained_history_row` must carry the **signed** branch orientation $m=D_T/D_s$ across the fold set, not the absolute branch weight $\lvert m\rvert$, so the same-source hinge row inherits the absorptive sign rather than the toy's ejective magnitude;
- it must treat the same-source root at the field-speed edge through the declared spatial self-regularization of the coincidence stratum, so the transacted amount is finite and set by the point-transceiver regulator rather than by the fold caps;
- it must book the transacted $h_{\mathrm{act}}$ on the same record as the fold-crossing row, closing the action ledger the diagnostic rows only stage.

Until that contract exists, every output here stays fail-closed at the seed-path certificate and the central retained-history row.

## Central-Solver Path Measurement (2026-07-07)

The follow-up producer boundary above was then driven directly against the production causal-root runtime rather than left as a named contract. Owner script [self-hit-brake-central-measurement.mjs](../../../../scripts/braid-ideal/self-hit-brake-central-measurement.mjs) with tests [braid-ideal-self-hit-brake-central-measurement.test.js](../../../../tests/braid-ideal-self-hit-brake-central-measurement.test.js) (6 passing) imports `solveMovingCircularSameSourceCausalRoots` from [AbsoluteHistoryRootRuntime.mjs](../../../../src/solver/app/AbsoluteHistoryRootRuntime.mjs) and reads what the production path can and cannot decide. No native runtime, ABI, bridge schema, or contract fixture was modified; the runtime is consumed read-only.

Production reproduction (exact). Driving the runtime on the recorded `vt095` crossing ($\rho=\sqrt{2/3}$, $\beta_c=1.00196$) returns the same-source root with chord radius $r_c=0.17662$, $D_s=D_T=0.0039177$, and the emitted signed branch orientation `receiverNormalFactor` $=+1.0000$ — reproducing the packet's rigid-rotation reconstruction to the digit and confirming the runtime already emits the signed $m=D_T/D_s$.

Three named producer gaps localized on the production path:

- **Sign discarded by the exposed weight.** `buildMovingCircularSameSourceRoot` sets the same-source `branchWeight` to `unsignedReceiverNormalFactor` $=\lvert m\rvert$; the signed `receiverNormalFactor` is emitted alongside but is not the branch weight. This is exactly the naive-kernel sign error, localized to one field on one root object.
- **Rigid-circle history reflection-locks the sign.** The production same-source history is a fixed-$\omega$ rigid circle, so $D_T=D_s$ and $m=+1$ identically; it cannot carry the pump-driven tangential acceleration that sets the absorptive sign. Reconstructing an accelerating crossing with the production receiver-normal definition returns $D_T<0<D_s$ and $m<0$ at every reception time past the hinge (`allAbsorptive`), reproducing this packet's sign refinement through the production formula.
- **Coincidence stratum is a numerical floor.** `safeDistance = max(EPSILON, distance)` with `EPSILON = 1e-9` is a numerical floor, not a physical length. The signed tangential click impulse integrates $\kappa\,m/(r^2+\rho_c^2)$ across the crossing and grows without bound as the declared stratum $\rho_c$ shrinks: absorbed fraction of the certified per-rotation pump ($22.17$) runs $0.031\to0.115\to0.371\to2.69\to9.67$ as $\rho_c$ runs $0.2\to0.1\to0.05\to0.01\to0.001$. The beat-the-clock verdict therefore flips with $\rho_c$: it is undecidable without a declared coincidence-stratum length scale. The T3 engine already models this exact input as `jacobianFloorOrDeclaredStratum` (blocker `missing_same_record_jacobian_floor_or_declared_stratum`).

Disposition `central_solver_self_hit_brake_sign_decided_absorptive_magnitude_reduces_to_declared_coincidence_stratum`. The production path decides the sign (absorptive) and localizes the remaining undecidability to a single declared physical input — the coincidence-stratum length scale — plus two mechanical runtime extensions (signed same-source branch weight; accelerating same-source history). All outputs fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no central retained-history acceptance; the first missing object is the declared coincidence stratum for the same-source hinge magnitude. **Update 2026-07-08:** the operator declared that stratum as $d_0$ (of order $\kappa\epsilon^2/c_f^2=R_*$; minimum-circular-binary reading $R_{\mathrm{MCB}}$; exact value open). At $d_0$ the symmetric single-site self-hit is $\approx50\times$ the pump, so it is dispositioned NOT load-bearing; the owner row and this measurement now share the disposition `central_solver_self_hit_brake_sign_absorptive_magnitude_set_by_operator_declared_d0_not_load_bearing`, and the surviving frontier is the non-coincident cross-hit hinge (formation-history burden). See [work-log 2026-07-08](work-log.md) and [priorities item 3](priorities.md).

**Runtime extensions landed (2026-07-07).** The two mechanical extensions named above are now in the production runtime (`AbsoluteHistoryRootRuntime.mjs`), additively and backward-compatibly: (i) `receiverNormalFields` emits an explicit `signedBranchOrientation` $=D_T/D_s$ on every root (partner and same-source), leaving the contractual unsigned `branchWeight` unchanged; and (ii) the moving-circular source history accepts an optional `angularAcceleration` (default $0$ reproduces the fixed-$\omega$ circle exactly), so the same-source root realizes the pump-driven crossing directly and returns $m<0$ from the production path — the measurement above now reads the absorptive sign off the runtime rather than reconstructing it. Runtime coverage in `tests/absolute-history-root-runtime.test.js` (signed field emitted; rigid $m=+1$ preserved; accelerating $m<0$; zero-acceleration exact backward-compatibility); `check-solver-contract-fixtures` passes. The only remaining producer gap is the ontology decision — the declared coincidence-stratum length scale — which sets a finite magnitude and is not the agent's to invent.

## Model Output Classification

| Output | Current classification |
| --- | --- |
| Coincidence birth of the symmetric self-hit fold | Verification; confirms the chart spec, magnitude regulator-dependent |
| Branch-orientation sign on the accelerating worldline | Refinement; $m<0$ absorptive, corrects the rigid-rotation $m=1$ |
| Chart impulse sign vs cut / softening / floor / min-delay | Diagnostic; sign regulator-independent, magnitude coincidence-sensitive |
| Naive-vs-chart sweep table | Diagnostic; reproduces the recorded ejection drift |
| Diagnostic $h_{\mathrm{act}}$ ledger rows | Diagnostic bookkeeping; direction only, no action closure |
| Absorptive-sign decision | Diagnostic decision; routed to operator against the chart spec disposition |
| Central-solver signed-orientation contract extension | Named follow-up producer boundary; production runtime measured read-only, three gaps localized, magnitude reduces to a declared coincidence stratum |
| Accepted retained evidence / force-action closure / stability | Not authorized |
| Score movement / corpus promotion | Not authorized; defer with blocker |
