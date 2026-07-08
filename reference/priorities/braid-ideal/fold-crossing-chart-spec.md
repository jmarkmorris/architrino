# Fold-Crossing Chart Specification

Status: producer-boundary specification packet for `self_hit_held_release_solver_row` (Group A item 3), 2026-07-07. This packet is a specification and a failure-mode fixture binding; it is not evidence, it names no retained branch, and it authorizes no central-solver retained-history acceptance. Every output is fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate.

Scope. This packet draws the packet-level producer boundary that the central-solver retained-history extension must implement so that same-source self-hits at the field-speed hinge are booked as a controlled click rather than reproduced as an uncontrolled Whitney-fold ejection. It consumes the 2026-07-07 self-hit ejection witness ([sea diagnostic, self-hit probe](sh-0-sea-diagnostic-candidate-model.md#self-hit-probe-inside-the-sea-shell---2026-07-07)) as its declared failure-mode fixture, and it cites — without editing — the certified anti-damping clock of the [Delayed Escape Certificate Lemma Proof Packet](delayed-escape-certificate-lemma-proof-packet.md) as the pump the click must beat. Meta wrapper: [reference/op/codex-goal-seeking-prompt-template.md](../../op/codex-goal-seeking-prompt-template.md).

Notation. Architrino sites use the signed polarity-unit labels $\epsilon_{+,\bullet}$ and $\epsilon_{-,\bullet}$. The self-hit pair is same-source and therefore same-polarity, so its polarity sign factor is $\sigma_{ii}=+1$ (repulsion of a site from its own delayed path). Propagation is at field speed $c_f$; only causal-delay terminology is used (`causal`, `delayed`, `path-history`). The kernel, branch weight, softening $\varepsilon$, coupling $\kappa$, and Jacobian floor $J_f$ are those of the partner-wake master-equation kernel; the fold set, causal residual, source-normal denominator, and receiver-normal numerator are the canonical objects of [Architrino](../../../content/markdown/aaa/foundations/architrino.md#core-definition). Interactions are stated in strict potential-superposition terms: the click impulse is the transacted momentum of a superposed delayed-potential branch pair, integrated over reception time.

Claim-level key. Each section closes with a claim level: **derivation** (follows from the declared kernel conventions and the fold normal form), **hypothesis** (a geometric coefficient or recurrence estimate requiring per-box certification by a future owner script), or **contract** (a required emission surface for any implementation, carrying no truth claim of its own).

---

## 0. The Object Being Bound

The producer boundary for `self_hit_held_release_solver_row` sharpened on 2026-07-07 from "self-hit rows enabled" to "regularization-independent fold-crossing treatment." The toy ([held-release causal-wake toy](../../../scripts/braid-ideal/held-release-causal-wake-toy.mjs)) established two facts on the sea-screened `vt095` row:

1. **Exact hinge timing (positive).** The first same-source root opens at exactly the first recorded field-speed crossing in every executed row; sub-field motion admits no same-source roots. Same-source roots are an exact hinge phenomenon — executable support for the click hypothesis's location on the fold set.
2. **Chart-dependent ejection (negative with mechanism).** The naive self-hit kernel, applied unchanged, ejects violently at the first crossing with a magnitude that tracks the regularization ($v_{\max}$ moving across $12.4/9.8/10.6\,c_f$), voiding well-posedness (WP) on the post-hinge record. The toy witnesses the uncontrolled Whitney-fold crossing, not the controlled click.

The disposition `naive_self_hit_kernel_ejects_at_hinge_no_absorption_in_toy` states the deciding object's required contents: a canonical fold-set chart, a finite click impulse defined by the chart rather than by softening or floor parameters, and same-record action-ledger rows that book the transacted $h_{\mathrm{act}}$. This packet supplies those three, plus the executable rejection test the implementation must not reproduce.

---

## 1. The Fold-Resolution Chart

### 1.1 Local coordinates on $\Sigma_{ij}$

The causal residual is the length-valued constraint $F_{ij}=r_{ij}-c_f(T-T_{\mathrm{em}})$, evaluated on the same-source directed pair $i=j$ (the site against its own retained path). The Whitney-fold set is
$$
\Sigma_{ij}=\{F_{ij}=0,\ \partial_{T_{\mathrm{em}}} F_{ij}=0\},
$$
the locus where the residual and its emission-time derivative vanish together. Fix a reception time $T$ and let $\tau=T_{\mathrm{em}}$. Near a same-source root birth at the field-speed crossing, expand $F_{ij}$ in $\tau$ about the fold point $\tau_*$, where $F_{ij}=\partial_\tau F_{ij}=0$ by definition of $\Sigma_{ij}$:
$$
F_{ij}(\tau;T)=\tfrac12\,a\,(\tau-\tau_*)^2-\mu(T)+O\big((\tau-\tau_*)^3\big),
\qquad a=\partial_\tau^2 F_{ij}\big|_*,\qquad \mu(T)=-F_{ij}(\tau_*;T).
$$
The fold-resolution chart carries the two coordinates
$$
\xi=\tau-\tau_*\quad(\text{fold coordinate, emission-time offset}),\qquad
\mu\quad(\text{unfolding parameter, transverse to } \Sigma_{ij}),
$$
with $\Sigma_{ij}=\{\mu=0\}$ and the same-source root pair carried on the $\mu>0$ side. The nondegeneracy condition is $a\neq0$ (the Whitney fold, catastrophe $A_2$). Where $a\to0$ the crossing degenerates to a cusp ($A_3$) and the chart above is invalid; the contract in Section 3 requires the row to flag $a$ below a declared floor and fall out of the fold chart rather than book a click. Claim level: **derivation** (normal form under the declared kernel conventions), with the $a\neq0$ restriction stated as a monitored chart-validity condition.

### 1.2 Normal form of the root pair created at the fold

Solving the normal form for $\mu>0$,
$$
\xi_\pm=\pm\sqrt{2\mu/a},\qquad \tau_\pm=\tau_*\pm\sqrt{2\mu/a}.
$$
Two same-source roots are born symmetric about $\tau_*$, coalesce at $\mu=0$, and are absent ($\xi$ complex) for $\mu<0$. This is the codimension-one transition of [Emergence of Structure](../../../content/markdown/aaa/foundations/emergence-of-structure.md#the-dynamics-of-structure-and-asymmetry) realized at the self-hit onset fold: an integer branch label changes only when the retained chart crosses a singular stratum. The hinge click is that stratum crossed deliberately. In the signed active-root ledger the two nascent roots carry opposite source-normal orientation (Section 1.3), so the double-entry books post one net integer entry per accepted crossing — the $h_{\mathrm{act}}$ unit — as required by [Braid Mathematics](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#action-clicks-at-the-fold-set). Claim level: **derivation** (fold root pair), inheriting the hypothesis-level claim status of the click mechanism in the corpus.

### 1.3 Branch-weight behavior in chart coordinates

The source-normal denominator is $D_{s,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(\tau)=\partial_\tau F_{ij}$; on the pair,
$$
D_s^{\pm}=a\,\xi_\pm=\pm\sqrt{2a\,\mu}\ \xrightarrow[\mu\to0^+]{}\ 0.
$$
The receiver-normal numerator $D_{T,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T)$ is generic and finite at the fold. The toy's branch weight is the branch-orientation magnitude $|m_{ij}|=|D_{T,ij}/D_{s,ij}|$, which in chart coordinates is
$$
|m^{\pm}(\mu)|=\frac{|D_{T}|}{\sqrt{2a\,\mu}}\ \sim\ \mu^{-1/2}\ \xrightarrow[\mu\to0^+]{}\ \infty.
$$
This is the inverse-square-root fold caustic, and it is exactly where the toy's `|receiverNormal/sourceJacobian|` diverges — recorded branch weights up to $163$ at the $J_f=0.05$ floor, with $24$ small-Jacobian roots. The two branches carry opposite-sign $m^{\pm}$ (opposite $D_s^{\pm}$), so the double-entry orientation is intrinsic to the pair.

What replaces the pointwise weight. Per [Architrino](../../../content/markdown/aaa/foundations/architrino.md#core-definition), $D_{s,ij}=c_f J_{ij}^{\mathrm{src}}$ is the density-of-states factor of the causal-root map, not a free inverse-strength coefficient; the active received branch strength is the finite $W_{ij}^{\mathrm{rec}}$. Therefore $1/D_s$ is a Jacobian to be integrated against the reception-time (root-map) measure, and the physically transacted quantity is not the divergent pointwise $|m^{\pm}|$ but its integral over the crossing window, where $\mu^{-1/2}$ is integrable. The chart weight that the implementation must book is the finite integrated transfer of Section 2, not the pointwise amplitude the toy evaluates. Claim level: **derivation**.

---

## 2. The Finite Click Impulse

### 2.1 The control-sweep identity (cancellation engine)

The unfolding parameter's reception-time rate is
$$
\dot\mu=-\partial_T F_{ij}(\tau_*;T)=-\big(\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T)-c_f\big)=D_{T,ij}.
$$
The receiver-normal numerator is exactly the rate at which the control crosses the fold. This is the cancellation that removes the caustic from the physical transfer. Claim level: **derivation**.

### 2.2 Reception-time impulse integral

The self-hit branch force magnitude in the toy kernel is $f^{\pm}=\kappa\,\sigma_{ii}\,|m^{\pm}|/(r^2+\varepsilon^2)$ with $\sigma_{ii}=+1$. The click impulse is the net momentum delivered by the fold-born same-source pair over the crossing window $\mu\in[0,\mu_0]$ (equivalently reception-time $[T_c,T_c+\Delta T]$). Changing variable with $dT=d\mu/\dot\mu=d\mu/D_T$, each branch contributes
$$
\int f^{\pm}\,dT=\frac{\kappa}{r_c^2}\int_0^{\mu_0}\frac{|D_T|}{\sqrt{2a\,\mu}}\cdot\frac{d\mu}{|D_T|}
=\frac{\kappa}{r_c^2}\int_0^{\mu_0}\frac{d\mu}{\sqrt{2a\,\mu}}
=\frac{\kappa}{r_c^2}\sqrt{\frac{2\mu_0}{a}}.
$$
The receiver-normal numerator $D_T$ cancels exactly, and the $\mu^{-1/2}$ caustic integrates to a finite $\sqrt{\mu_0}$. Summing the two branches with the geometric orientation-projection factor $\chi$ (set by the angle between $\hat{\mathbf r}^{+}$ and $\hat{\mathbf r}^{-}$; $\chi\in[0,2]$, with the radial components adding and the near-collinear tangential components partially cancelling),
$$
\boxed{\ \big|\Delta\mathbf p_{\mathrm{click}}\big|=\chi\,\frac{\kappa}{r_c^2}\sqrt{\frac{2\mu_0}{a}}\;+\;O\!\big(\mu_0^{3/2}\big)\ }
$$
The impulse is finite. Claim level: **derivation** for finiteness and the $\mu^{-1/2}$-integrable structure; **hypothesis** for $\chi$ and the higher-order geometric corrections, to be certified per $\beta$-box by the future owner script.

### 2.3 Independence of softening, Jacobian floor, and time step

The boxed impulse contains none of $J_f$, $\varepsilon$, $\Delta t$. Each regulator perturbs it by a vanishing amount:

- Softening replaces $r^2\to r^2+\varepsilon^2$, a bounded multiplicative correction $\le1$ that tends to $1$ as $\varepsilon\to0$; it cannot change the finiteness or the leading coefficient.
- The Jacobian floor replaces $|D_s|$ by $\max(|D_s|,J_f)$ only on the shrinking set $\mu<J_f^2/(2a)$, contributing at most $O(J_f)$ to the integral and vanishing as $J_f\to0$.
- The time step Riemann-samples a convergent integral with error $O(\Delta t)$.

So the chart impulse is regularization-independent by construction. This is the precise contrast with the toy ejection, whose peak velocity ($12.4/9.8/10.6\,c_f$) tracks the regulators because it reads the pointwise peak of an integrable singularity rather than its integral — a resolution-limited caustic artifact. Claim level: **derivation**.

### 2.4 Scaling in $(\beta,\rho,\kappa)$

On the rigid rotating channel of the certified pump (radius $\rho$, rim fraction $\beta=v_t/c_f$, angular speed $\omega=\beta c_f/\rho$), the chart quantities scale as: fold chord $r_c\sim\rho$; fold curvature $a\sim|\dot{\mathbf V}_{\mathrm{src}}|=\omega^2\rho=\beta^2 c_f^2/\rho$ (source centripetal acceleration projected on the sightline, $O(1)$ geometric factor); chart window depth $\mu_0=O(\rho)$ (length units, the pair-persistence scale). Then
$$
\boxed{\ \big|\Delta\mathbf p_{\mathrm{click}}\big|\ \sim\ \frac{\kappa}{\rho^2}\sqrt{\frac{\rho}{\beta^2 c_f^2/\rho}}\ =\ \frac{\kappa}{\beta\,c_f\,\rho}\ }
$$
per hinge crossing. In rim-fraction units, with schematic unit integration weight, $\Delta\beta_{\mathrm{click}}\sim\kappa/(\beta\,c_f^2\,\rho)$. Claim level: **hypothesis** for the coefficients (per-box certification pending); **derivation** for the functional form $\kappa/(\beta c_f\rho)$ given the chart scalings.

### 2.5 Absorber comparison against the certified pump clock

The certified anti-damping pump ([escape packet](delayed-escape-certificate-lemma-proof-packet.md), interval certificate) is $\Phi_{\mathrm{tan}}(\beta)\in[2.881,2.925]\,\beta$, tangential acceleration $(\kappa/\rho^2)\,\Phi_{\mathrm{tan}}$, with the certified clock
$$
\frac{d\beta}{dt}\ \ge\ \frac{c_1\,\kappa}{c_f\,\rho^2}\,\beta,\qquad c_1=2.881,
\qquad\Longrightarrow\qquad
\Delta t\ \le\ 1.353\,\frac{c_f\,\rho^2}{\kappa}.
$$
If a hinge click recurs once per rotation period $\tau_{\mathrm{rot}}=2\pi\rho/(\beta c_f)$, the click absorption rate in rim-fraction is
$$
\frac{\Delta\beta_{\mathrm{click}}}{\tau_{\mathrm{rot}}}\ \sim\ \frac{\kappa/(\beta c_f^2\rho)}{2\pi\rho/(\beta c_f)}\ =\ \frac{\kappa}{2\pi\,c_f\,\rho^2}.
$$
One click per rotation beats the pump iff
$$
\frac{\kappa}{2\pi c_f\rho^2}\ \ge\ \frac{c_1\,\kappa\,\beta}{c_f\rho^2}
\quad\Longleftrightarrow\quad
\beta\ \le\ \frac{1}{2\pi c_1}\ \approx\ \frac{1}{2\pi\,(2.881)}\ \approx\ 0.055.
$$
Both $\kappa$ and $\rho^{-2}$ cancel: the sufficiency of a single click per rotation is a pure rim-fraction threshold, independent of coupling and radius. This answers the packet question directly. **One click per crossing cannot absorb $\Phi_{\mathrm{tan}}\approx2.9\beta$ at the rim fractions where the hinge lives** ($\beta\to1$): near the ceiling it falls short by a factor $2\pi c_1\beta\approx18\beta$. Sufficiency requires either roughly $N_{\mathrm{click}}\gtrsim2\pi c_1\beta\approx18$ clicks per rotation near the ceiling, or a per-click $\chi\sqrt{\mu_0/a}$ larger than the geometric estimate by that factor.

Crucially, the impulse is finite and regularization-independent, so the click-absorber route is **not** closed at the kernel level (this is the success branch, not the failure branch of the task). What the comparison establishes is that the click-absorber question is now a computable central-solver target: measure $\chi$, $\mu_0$, $a$, and the click recurrence $N_{\mathrm{click}}$ per rotation on the retained-history row, and test
$$
N_{\mathrm{click}}\,\Delta\beta_{\mathrm{click}}\ \ge\ \int_{\mathrm{rot}} d\beta_{\mathrm{pump}}.
$$
Claim level: **derivation** for the finite-impulse-versus-clock inequality and the $\beta\le1/(2\pi c_1)$ threshold; **hypothesis** for $N_{\mathrm{click}}$ recurrence, which only the retained-history row can supply.

---

## 3. The Same-Record Ledger Contract

Any central-solver retained-history row that books a hinge click must emit the following, extending existing contract surfaces rather than minting parallel ones. The surfaces extended are the `same_record_action_ledger_rows`, `same_source_self_hit_rows`, and `partner_causal_root_replay_rows` fields of [`self_hit_held_release_solver_row.v0`](../../../scripts/braid-ideal/self-hit-held-release-solver-row.mjs), and the native root-ledger detail's existing receiver-normal factors and retained/appeared/disappeared/folded transition classification. No new schema, validator, or gate is introduced. Claim level for the whole section: **contract**.

### 3.1 Action-ledger rows (extends `same_record_action_ledger_rows`)

One row per click, posting one $h_{\mathrm{act}}$ entry as a double-entry pair:

- `click_id`, `crossing_time` $T_c$ (must equal the recorded `firstFieldSpeedCrossing.time` to the step, per the exact-hinge-timing lemma);
- `fold_curvature` $a$, `unfolding_window` $\mu_0$, `fold_chord` $r_c$, `orientation_projection` $\chi$;
- `chart_impulse` $\Delta\mathbf p_{\mathrm{click}}$ (vector, the Section 2.2 integral, not a pointwise force sample);
- `action_transacted` $h_{\mathrm{act}}$ with `internal_ledger_delta` (signed integer, $\pm1$) and matching `wake_ledger_entry_ref` (the double-entry outgoing wake posting);
- `regularization_independence_witness`: the chart impulse recomputed at $\ge2$ distinct $(J_f,\varepsilon,\Delta t)$ triples with recorded spread below the declared tolerance — the row is rejected if the spread matches the naive-ejection signature of Section 4.

### 3.2 Root-ledger transition rows (extends `partner_causal_root_replay_rows` via the existing `folded` class)

One pair of transitions per click on the same-source directed self-pair, reusing the native root-ledger's existing classification:

- birth: `disappeared`$\to$`folded`$\to$`appeared` across $\mu:0^-\to0\to0^+$; annihilation is the time-reverse;
- per branch: `root_key`, `emission_time` $\tau_\pm$, `fold_coordinate` $\xi_\pm$, `unfolding_parameter` $\mu$, `source_normal_jacobian` $D_s^\pm=\pm\sqrt{2a\mu}$, `transition_class`$\in\{$`folded`,`appeared`,`disappeared`$\}$;
- `integer_root_count_before` / `integer_root_count_after` (the integer change that makes the click a whole step);
- `chart_validity`: `a_above_cusp_floor` boolean; a click with $a$ below the declared floor must be flagged out of the fold chart, not booked.

### 3.3 Receiver-normal fields (extends the root-ledger detail's receiver-normal factors)

Per branch, on fold-flagged rows:

- `receiver_normal_numerator` $D_T$, `source_normal_denominator` $D_s$, `branch_orientation_factor` $m=D_T/D_s$ (retained as dynamics-level branch data);
- `density_of_states_measure`: boolean flag marking $1/D_s$ as an integration Jacobian on fold-flagged rows (so downstream code integrates rather than evaluates it);
- `chart_integrated_weight`: the finite $\int|m|\,dT$ over the click window (Section 2.2), which **replaces the pointwise $|m|$ as the transacted branch strength on fold-flagged rows**. Emitting the pointwise weight in place of the integrated weight on a fold-flagged row is a contract violation and reproduces the toy caustic.

---

## 4. Failure-Mode Fixture Binding

The 2026-07-07 naive-kernel ejection on the sea-screened `vt095` row is bound here as the executable rejection test any implementation must not reproduce. The regularization-dependence signature (recorded in the [self-hit probe section](sh-0-sea-diagnostic-candidate-model.md#self-hit-probe-inside-the-sea-shell---2026-07-07)):

| regularization $(J_f,\ \text{self-hit min delay})$ | final $v_{\max}$ | branch-weight peak | small-Jacobian roots | final $R$ | missing directed roots |
|---|---|---|---|---|---|
| $(0.05,\ 0.002)$ | $12.4\,c_f$ | $163$ | $24$ | $\approx32$ | $\approx33{,}000$ |
| $(0.20,\ 0.002)$ | $9.8\,c_f$ | — | — | — | — |
| $(0.20,\ 0.05)$ | $10.6\,c_f$ | — | — | — | — |

Rejection predicate. A post-hinge record reproduces the uncontrolled fold crossing (and must be rejected) when both hold: (a) post-crossing $v_{\max}$ exceeds $c_f$ by an $O(1)$ factor, and (b) $v_{\max}$ varies with $(J_f,\varepsilon,\Delta t)$ at the recorded spread ($9.8$–$12.4\,c_f$, spread $\approx2.6\,c_f$). The chart-defined click impulse of Section 2 must instead be regularization-independent (spread below tolerance across the same three triples) and must not eject the site through the shell. The executable form of this test is the fixture script and its test (Section 6). Without absorption, and without a chart-defined impulse, any post-hinge trajectory is chart noise and (WP) is correctly reported lost — as it is on all five toy rows.

---

## 5. Claim-Level Summary and Disposition

- Section 1 (fold chart, root-pair normal form): **derivation**, under the declared kernel conventions and the $a\neq0$ Whitney nondegeneracy; the click mechanism it realizes remains hypothesis-level in the corpus.
- Section 2.1–2.3 (control-sweep identity, finite impulse, regularization independence): **derivation**.
- Section 2.4–2.5 ($( \beta,\rho,\kappa)$ scaling, absorber comparison): **derivation** for functional form and the $\beta\le1/(2\pi c_1)$ threshold; **hypothesis** for the geometric coefficients $\chi,\mu_0,a$ and the recurrence $N_{\mathrm{click}}$.
- Section 3 (ledger contract): **contract**; extends existing surfaces, no new schema.
- Section 4 (failure-mode fixture): recorded witness bound as executable rejection test.

Disposition (superseded by Section 6 for the symmetric channel): `fold_crossing_chart_spec_finite_impulse_absorber_question_computable`. The Section 2 normal-form analysis yields a finite, regularization-independent chart impulse $|\Delta\mathbf p_{\mathrm{click}}|=\chi\,\kappa\,r_c^{-2}\sqrt{2\mu_0/a}$ with scaling $\kappa/(\beta c_f\rho)$ **conditional on a generic Whitney fold** — finite fold chord $r_c=O(\rho)$ and nondegenerate curvature $a\neq0$. This condition is the $a\neq0$ restriction already stated in Section 1.1. Section 6 measures the actually-available channel and finds that condition violated: the symmetric circular self-hit is a cusp born at coincidence ($a\to0$ and $r_c\to0$ together as $\beta\to1^+$), so no regulation-independent chart impulse exists for it. The finite-impulse result therefore stands only for a hinge geometry that realizes a non-coincident generic fold; the symmetric self-hit channel does not. This is a specification with a measurement; it is not evidence, it names no retained branch, and it authorizes no acceptance. `retainedBranchClaim=false`, `acceptedSameLevelBranchClaim=false`, `scoreMovement=no_score_increase`.

---

## 6. Measurement on the vt095 Sea+Self-Hit Crossing (2026-07-07)

The Section 2 finite-impulse derivation was tested on the recorded `sh0sea-a4.25-selfhit-vt095-moving-prehistory` crossing (owner script [fold-crossing-chart-measurement.mjs](../../../scripts/braid-ideal/fold-crossing-chart-measurement.mjs), tests [braid-ideal-fold-crossing-chart-measurement.test.js](../../../tests/braid-ideal-fold-crossing-chart-measurement.test.js), 7 passing). Recorded crossing inputs from the toy run ($c_f=1$, $\kappa=1$): $\rho=0.816497$, $T_c=0.43$, crossing $\beta_c=1.00196$, first self-hit root opens at $T_c$ exactly, `maxBranchWeight`$=163.5$. The site's near-constant crossing radius makes a rigid rotation at $\rho$ a faithful model of the crossing kinematics; the self-hit residual is $F(\Delta;\beta)=2\rho\sin(\omega\Delta/2)-c_f\Delta$, $\omega=\beta c_f/\rho$.

**Measured result (derivation on the reconstructed channel).** Two degeneracies coincide at the self-hit onset, and both are exact consequences of the rotational reflection symmetry:

- **Cusp, not fold.** The fold curvature and chord both vanish as $\beta\to1^+$: over the offset window $\varepsilon_\beta=\beta-1$, the measurement finds $r_c^2/\varepsilon_\beta\to16.0$ and $a/\sqrt{\varepsilon_\beta}\to-1.50$ (both ratios constant to $<3\%$). Hence $r_c\sim\sqrt{\varepsilon_\beta}\to0$ and $a\sim\sqrt{\varepsilon_\beta}\to0$: the crossing is a cusp ($A_3$), not the generic Whitney fold ($A_2$) Section 2 assumed. At the recorded $\beta_c=1.00196$: $\Delta_*=r_c=0.1768$, $a=-0.0666$, $D_s=D_T=0.00393$.
- **Branch orientation under the fixed-$\beta$ reconstruction is unity** (refined below). Under this section's rigid fixed-$\beta$ reconstruction the receiver-normal numerator and source-normal denominator coincide by reflection symmetry, $D_T=D_s$, giving $m=D_T/D_s=1$. That $m=1$ is an artifact of freezing the tangential speed the pump is changing: on the *accelerating* worldline the receiver crosses field speed ahead of its own emitting past, so $D_T<0<D_s$ and the signed orientation is $m<0$ (absorptive) at every reception time past the hinge — the [Fold-Crossing Click-Impulse Packet](fold-crossing-click-impulse-packet.md) measures $m=-0.43$ to $-0.87$ on `vt095`. The naive toy ejection (`maxBranchWeight`$=163$) is the *absolute-value* weight $|m|$ discarding this sign; the signed transfer is directionally absorptive, with only its magnitude coincidence-sensitive.
- **Fold born at the coincidence stratum.** Because $r_c=c_f\Delta_*\to0$ at birth, the causal-root fold coincides with the spatial coincidence stratum $\{r_{ij}=0\}$ — the *other* singular locus of [Architrino](../../../content/markdown/aaa/foundations/architrino.md#core-definition), regulated by the declared spatial regulator, not by the fold chart. The self-hit branch force $f=\kappa\,|m|/(r_c^2+\text{reg}^2)$ with $|m|=1$ and $r_c^2\propto\varepsilon_\beta$ then gives a click impulse $\int f\,dT$ that **grows without bound as the spatial regulator shrinks** (measured $\Delta\beta_{\mathrm{click}}$: $0.30\to5.4$ as the regulator runs $0.2\to0.001$; log growth). The impulse is regulator-dependent — the exact opposite of a chart-defined click impulse, and the mechanism behind the toy's recorded regularization-dependent ejection ($v_{\max}$ across $12.4/9.8/10.6\,c_f$).

**Absorber verdict.** One pump sweep crosses $\beta=1$ once, so $N_{\mathrm{click}}=1$ per crossing (the opened self-hit branch is continuous, not a recurring discrete click). Even taking the regulator-inflated impulse at the toy's coincidence cutoff, $N_{\mathrm{click}}\Delta\beta_{\mathrm{click}}=4.31$ against the pump-per-rotation $\int_{\mathrm{rot}}d\beta_{\mathrm{pump}}=2\pi c_1\kappa/(c_f^2\rho)=22.17$ — absorbed fraction $\approx0.19$, and not a legitimate chart impulse in any case.

**Disposition:** `symmetric_self_hit_fold_is_cusp_at_coincidence_no_regulator_independent_click_impulse`. This is the **failure branch** for the symmetric circular self-hit channel — the channel the held-release toy and the `vt095` row actually realize: the fold transfer is intrinsically regulator-dependent because the causal-root fold births at coincidence, so no finite chart-defined click impulse exists there, and the naive hinge-click absorber route is closed at the kernel level for this channel. It does **not** close the general click hypothesis: Section 2's finite impulse survives for any hinge geometry that realizes a *non-coincident* generic fold ($r_c=O(\rho)$ at birth), which the symmetric single-site self-hit cannot. Combined with the same-day Corollary S in the [Delayed Escape Certificate Lemma Proof Packet](delayed-escape-certificate-lemma-proof-packet.md) (the aligned FCC sea is a certified non-absorber, $\le10\%$ of the pump), the two named kernel-level absorbers are both closed on the symmetric channel, concentrating the retention program on induced sea orientational polarization and on exhibiting a non-coincident hinge geometry. Fail-closed throughout: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new schema or validator.

---

## 7. Non-Coincident Hinge Geometry (2026-07-07)

The Section 6 closure was tested directly (owner script [fold-crossing-hinge-geometry-diagnostic.mjs](../../../scripts/braid-ideal/fold-crossing-hinge-geometry-diagnostic.mjs), tests [braid-ideal-fold-crossing-hinge-geometry-diagnostic.test.js](../../../tests/braid-ideal-fold-crossing-hinge-geometry-diagnostic.test.js), 5 passing). Two results resolve the fork.

**Self-hit coincidence theorem (derivation).** For *any* smooth worldline, a same-source root nucleates from $\Delta\to0$ exactly at the instant the site speed crosses $c_f$, because the self-separation expands as $|\mathbf X(T)-\mathbf X(T-\Delta)|=|\mathbf v|\,\Delta+O(\Delta^2)$, so the root condition $|\mathbf v|\Delta=c_f\Delta$ forces birth at $\Delta=0$. Hence the self-hit fold chord $r_c=c_f\Delta_*\to0$ at birth for every path — symmetric or asymmetric. The diagnostic confirms this on an explicitly asymmetric worldline (radial drift plus tangential pump): the fold chord shrinks monotonically toward zero as $\beta\to1$ ($r_c=0.073$ at $\beta=1.02$). This upgrades Section 6's circular-channel measurement to a general statement: **no single-site self-hit path escapes coincidence birth**, so the self-hit absorber route is closed generally, not just for `vt095`.

**Cross-hit finite-chord fold (derivation + measurement).** A fold between *distinct* sites $i\neq j$ is born where the source-normal denominator vanishes, $D_{s,ij}=c_f-\mathbf v_j\cdot\hat{\mathbf r}_{ij}=0$ — the alignment condition $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ (the source moving along the sightline to the receiver's causal position at field speed). When that alignment holds at finite separation, the diagnostic's head-on realization gives $r_c=L=O(\rho)$ (finite) and fold curvature $a=\partial^2_{\tau}F=-g\neq0$ (set by the pump/approach acceleration): a **generic Whitney fold ($A_2$)**, not a cusp. Section 2.2's finite impulse then applies ($|\Delta\mathbf p_{\mathrm{click}}|=\chi\,\kappa\,r_c^{-2}\sqrt{2\mu_0/a}=1.41$ at the reference values), and it is **independent of the spatial softening** (measured impulse flat to $3\times10^{-4}$ below softening $0.02$), because the finite chord holds the kernel $1/(r_c^2+\varepsilon^2)$ bounded — the fold is decoupled from the coincidence stratum $\{r_{ij}=0\}$. The residual orientation caustic $|m|=|D_T/D_s|$ is the ordinary $A_2$ caustic, regulated by the causal-root density-of-states Jacobian of Section 1.3, not by softening; the decoupling holds while the click window stays non-coincident ($L$ larger than the window reach).

**Reconciliation with the signed-orientation refinement.** The parallel [Fold-Crossing Click-Impulse Packet](fold-crossing-click-impulse-packet.md) corroborates the coincidence-birth theorem directly on the recorded worldline and adds the sign result above: the symmetric self-hit transfer is *absorptive* ($m<0$, regulator-independent sign) with a coincidence-sensitive, spatially-self-regularized magnitude. The two packets combine into one picture of the transfer at a hinge. The magnitude behaves as follows: at the **symmetric self-hit** the fold coincides with the coincidence stratum, so the magnitude is set by the point-transceiver spatial self-regularization (not chart-clean); at a **non-coincident cross-hit** the fold sits at finite chord, so the magnitude is chart-clean and softening-independent (this section). The sign is absorptive in the measured self-hit case; whether a given cross-hit hinge is absorptive or ejective is set by the receiver-normal sign $\operatorname{sign}(D_T)$ there and must be measured per geometry.

**Disposition:** `non_coincident_cross_hit_hinge_restores_a2_finite_impulse_contingent_on_sustained_velocity_alignment`. The non-coincident hinge exists in principle — a finite-chord cross-hit fold restores the Section 2 finite, softening-independent chart impulse — so the click-absorber route is **not** closed in general; only the single-site self-hit realization has a coincidence-sensitive magnitude (though even there the sign is absorptive, per the parallel packet). The surviving requirement is a hinge geometry that *sustains* the alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ at finite separation, which is exactly the field-speed middle-binary hinge with the coplanar/co-linear alignment of [Nested Shell Braid](../../../content/markdown/aaa/noether-braid/nested-shell-braid.md) at the braid symmetry-breaking point. That sustained-alignment condition is the same dynamic-alignment / formation-history burden already isolated for induced sea orientational polarization: the two remaining open burdens are one problem. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new schema or validator.

Next closure goal: exhibit the sustained cross-hit alignment in a differential (nested-shell or inner/middle-binary) configuration — show that the middle-binary field-speed hinge holds $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ at finite separation over a click window, so the Section 2 finite impulse books a real $h_{\mathrm{act}}$ against the pump — or resolve the shared dynamic-alignment / formation-history burden that also gates induced sea orientational polarization.

---

## 8. Cross-Hit Hinge Click Rate: The Internal-Frequency Requirement (2026-07-08)

Section 2.5 reduced the click-absorber sufficiency test to the per-rotation click count $N_{\mathrm{click}}$ and left it as a hypothesis "only the retained-history row can supply." That is too pessimistic: the click *rate* is a property of the frequency content of the configuration, not of the force ledger, so it admits a kinematic bound with no retained-history dynamics. Owner script [cross-hit-hinge-click-rate-diagnostic.mjs](../../../scripts/braid-ideal/cross-hit-hinge-click-rate-diagnostic.mjs), tests [braid-ideal-cross-hit-hinge-click-rate-diagnostic.test.js](../../../tests/braid-ideal-cross-hit-hinge-click-rate-diagnostic.test.js), 5 passing.

A cross-hit hinge is born at a zero of the source-normal denominator $D_{s,ij}=c_f-\mathbf v_j\cdot\hat{\mathbf r}_{ij}$, so one click occurs each time the alignment scalar $A_{ij}(T):=\mathbf v_j\cdot\hat{\mathbf r}_{ij}(T)$ crosses $c_f$. $N_{\mathrm{click}}$ per rotation is the number of such crossings, summed over directed pairs.

**Result 1 — the single-frequency braid produces no click train ($N_{\mathrm{click}}=0$).** Suppose every site shares one angular frequency $\omega$ (any number of shells, any radii, any phases). The whole configuration is then a global rigid rotation $\mathrm{Rot}(\omega t)$, and a rotation preserves inner products, so
$$
A_{ij}(t)=\big(\mathrm{Rot}(\omega t)\,\mathbf v_j(0)\big)\cdot\big(\mathrm{Rot}(\omega t)\,\hat{\mathbf r}_{ij}(0)\big)=\mathbf v_j(0)\cdot\hat{\mathbf r}_{ij}(0)=\text{const}.
$$
Hence $D_{s,ij}$ never changes sign: generically $A_{ij}\neq c_f$ for all time and $N_{\mathrm{click}}=0$; the measure-zero exception $A_{ij}\equiv c_f$ is a *static sustained hinge*, not a recurring click. The argument is delay-independent — a global rigid rotation carries causal roots to causal roots — so it holds for the causal alignment, not just the instantaneous proxy. The diagnostic confirms $A_{ij}$ constant to machine precision ($\max$ variation $1.6\times10^{-15}$ single-shell, $2.7\times10^{-15}$ multi-shell) with exactly zero crossings. **A rigidly co-rotating braid, however many shells it carries, cannot absorb the pump through cross-hit clicks at all.**

**Result 2 — recurring clicks require at least two distinct frequencies.** For a cross pair with receiver frequency $\omega_{\mathrm{out}}$ and source frequency $\omega_{\mathrm{in}}$, $A_{ij}$ is periodic in the beat angle $(\omega_{\mathrm{out}}-\omega_{\mathrm{in}})t$. Over one outer rotation the beat advances by $|1-\omega_{\mathrm{in}}/\omega_{\mathrm{out}}|$ periods, each contributing at most two crossings of any straddled level, so
$$
N_{\mathrm{click}}\ \lesssim\ 2\,P\,\Big|1-\frac{\omega_{\mathrm{in}}}{\omega_{\mathrm{out}}}\Big|
$$
over $P$ directed cross pairs whose alignment amplitude actually reaches $c_f$. The delay shifts the beat phase but not its frequency, so the count is delay-robust. The diagnostic shows the click train switching on with the second frequency (ratio $1.5$ gave $0$ clicks here because the amplitude did not straddle $c_f$; ratio $6$ gave $90$ clicks across the inter-shell pairs, tracking the $5$ beats per rotation).

**Verdict.** Combining the bound with Section 2.4/2.5 (pump-per-rotation $2\pi c_1\kappa/(c_f^2\rho)=22.17$ at reference, per-click $\kappa/(\beta c_f^2\rho)$, so $N_{\mathrm{click}}^{\mathrm{req}}=2\pi c_1\beta\approx18\beta$):

- **Single-frequency architecture:** `closed_negative_N_click_is_zero`. No cross-hit click absorber exists on any rigidly co-rotating braid.
- **Multi-frequency architecture:** open, but now with a concrete quantitative gate. The internal frequency ratio must satisfy $\big|1-\omega_{\mathrm{in}}/\omega_{\mathrm{out}}\big|\gtrsim \pi c_1\beta/P$ (a fast inner shell — for $P=6$ straddling directed pairs at $\beta\to1$ this is $\omega_{\mathrm{in}}/\omega_{\mathrm{out}}\gtrsim2.5$), *and* each contributing pair must carry its alignment amplitude across $c_f$ (a $\beta\ge1$-along-the-ray geometry).

This sharpens the Section 7 "sustained-alignment / formation-history burden" into two separable, checkable conditions on the nested-shell architecture: a fast inner frequency (so the beat delivers enough crossings) and amplitude straddling (so each crossing is a real fold). It also closes the single-shell reading of the retention hunt negatively without the retained-history certificate chain. Disposition `cross_hit_click_train_requires_fast_inner_shell_single_frequency_braid_gives_zero`. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: measure, on a two-frequency (inner-binary + outer-shell) nested configuration, whether the fast-inner-shell frequency ratio that clears $N_{\mathrm{click}}\gtrsim18\beta$ is simultaneously compatible with amplitude straddling ($A_{ij}$ reaching $c_f$) at a physically admissible inner rim fraction — i.e. whether the two necessary conditions can hold together, or whether they are mutually exclusive and close the cross-hit route as well.

---

## 9. Two-Frequency Coexistence Test: The Conditions Are Not Mutually Exclusive (2026-07-08)

Section 8 left the cross-hit route open for multi-frequency architectures under two separable necessary conditions: (A) enough clicks, $N_{\mathrm{click}}\ge2\pi c_1\beta_{\mathrm{out}}$ (a fast inner shell), and (B) amplitude straddling, $A_{ij}=\mathbf v_j\cdot\hat{\mathbf r}_{ij}$ actually reaching $c_f$. This section tests whether (A) and (B) can hold at once at an admissible inner rim fraction, or are mutually exclusive. Owner script [cross-hit-hinge-coexistence-diagnostic.mjs](../../../scripts/braid-ideal/cross-hit-hinge-coexistence-diagnostic.mjs), tests [braid-ideal-cross-hit-hinge-coexistence-diagnostic.test.js](../../../tests/braid-ideal-cross-hit-hinge-coexistence-diagnostic.test.js), 5 passing. Configuration: three outer sites (radius $R_{\mathrm{out}}$, frequency $\omega_{\mathrm{out}}$) and three inner sites (radius $R_{\mathrm{in}}=qR_{\mathrm{out}}$, frequency $\omega_{\mathrm{in}}=r\omega_{\mathrm{out}}$), so the inner rim fraction is $\beta_{\mathrm{in}}=r\,\beta_{\mathrm{out}}\,q$. Clicks are counted on directed pairs with an outer receiver and an inner source (the pump lives on the outer channel).

**Verdict: the two conditions coexist — they are not mutually exclusive.** At the reference small-inner-binary point ($r=2.5$, $q=0.44$, $\beta_{\mathrm{out}}=0.98$) the inner shell is super-field ($\beta_{\mathrm{in}}=1.08$), the alignment straddles ($\max A_{ij}=1.08>c_f$), and the realized count $N_{\mathrm{click}}=27$ clears the requirement $2\pi c_1\beta_{\mathrm{out}}\approx17.7$. The coexistence region is broad (20 of 36 grid points at $\beta_{\mathrm{out}}=0.98$; every radius ratio $q\in[0.2,0.8]$ clears with a ratio $r$ chosen to reach $\beta_{\mathrm{in}}\gtrsim1$), and its cost is minimal: the least admissible inner rim fraction in the region is $\beta_{\mathrm{in}}\approx1.18$, just above field speed.

Three structural facts sharpen the picture:

1. **$\beta_{\mathrm{in}}\ge1$ is the single binding gate.** A sub-field inner shell cannot project its velocity onto any sightline at $c_f$, so it never straddles: at $r=2$, $q=0.44$ ($\beta_{\mathrm{in}}=0.86$) the click count is exactly zero. The click train switches on precisely as $\beta_{\mathrm{in}}$ crosses $1$.

2. **Condition (A) delivers condition (B).** Because $\beta_{\mathrm{in}}=r\beta_{\mathrm{out}}q$, the same frequency increase that raises the click count also raises the inner rim fraction. Far from competing, the fast-inner-shell requirement is what carries the inner binary super-field, which is exactly what straddling needs. The two necessary conditions are cooperative, not antagonistic.

3. **Frequency-ratio saturation: raw frequency is not the control variable.** Once $\beta_{\mathrm{in}}\ge1$, the total absorption is essentially independent of $r$ (flat within $20\%$ across $r\in[3,8]$ at fixed $q$): the click count grows $\propto r$ while the per-click impulse falls to compensate ($a\sim$ source centripetal acceleration $\propto\omega_{\mathrm{in}}^2$), so spinning the inner shell faster buys more-but-weaker clicks with no net gain. The real control knobs are the inner rim fraction $\beta_{\mathrm{in}}$ and the radius ratio $q$, not $\omega_{\mathrm{in}}$ alone.

Claim level: **derivation** for the $\beta_{\mathrm{in}}\ge1$ straddling gate and the (A)-implies-(B) cooperativity; **measurement** for the realized $N_{\mathrm{click}}$ and coexistence region. The indicative impulse total (reference: $\approx3\times$ the pump) carries a schematic Section 2.2 coefficient ($\chi$, $\mu_0$ set to reference values), so its absolute size is order-of-magnitude only; the robust results are coexistence, the straddling gate, and saturation.

**Disposition:** `cross_hit_absorber_conditions_coexist_binding_gate_is_super_field_inner_binary`. The cross-hit click absorber survives this test — the two necessary conditions are jointly satisfiable at an admissible, only-marginally-super-field inner binary. The retention question therefore does not close negatively here; it transforms into a single sharper burden: **is a super-field inner binary ($\beta_{\mathrm{in}}\gtrsim1$) with the required coplanar/co-linear alignment itself dynamically admissible and sustainable?** That is the same formation-history / dynamic-alignment burden already isolated for induced sea orientational polarization and the Section 7 sustained-alignment requirement — now reduced to a concrete, quantitative target on one nested-shell sub-configuration. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: determine whether a nested-shell braid can hold an inner binary at $\beta_{\mathrm{in}}\gtrsim1$ with the coplanar hinge alignment as a self-consistent retained-history configuration (its own root-budget, causal-margin, and pump balance), or whether the super-field inner binary is itself unsustainable — the single burden that now stands between the cross-hit click absorber and a named retained-history candidate row.
