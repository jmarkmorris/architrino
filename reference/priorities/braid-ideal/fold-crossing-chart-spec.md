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

Claim level: **derivation** for the $\beta_{\mathrm{in}}\ge1$ straddling gate and the (A)-implies-(B) cooperativity; **measurement** for the realized $N_{\mathrm{click}}$ and coexistence region. **Correction (2026-07-08, Section 13):** a signed receiver-normal re-check shows this magnitude sum overstates the net — cross-hit sign is polarity-set (like-polarity absorbs, opposite ejects) and a neutral inner binary largely self-cancels, so the net absorption is not robustly established. The indicative impulse total (reference: $\approx3\times$ the pump) carries a schematic Section 2.2 coefficient ($\chi$, $\mu_0$ set to reference values), so its absolute size is order-of-magnitude only; the robust results are coexistence, the straddling gate, and saturation.

**Disposition:** `cross_hit_absorber_conditions_coexist_binding_gate_is_super_field_inner_binary`. The cross-hit click absorber survives this test — the two necessary conditions are jointly satisfiable at an admissible, only-marginally-super-field inner binary. The retention question therefore does not close negatively here; it transforms into a single sharper burden: **is a super-field inner binary ($\beta_{\mathrm{in}}\gtrsim1$) with the required coplanar/co-linear alignment itself dynamically admissible and sustainable?** That is the same formation-history / dynamic-alignment burden already isolated for induced sea orientational polarization and the Section 7 sustained-alignment requirement — now reduced to a concrete, quantitative target on one nested-shell sub-configuration. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: determine whether a nested-shell braid can hold an inner binary at $\beta_{\mathrm{in}}\gtrsim1$ with the coplanar hinge alignment as a self-consistent retained-history configuration (its own root-budget, causal-margin, and pump balance), or whether the super-field inner binary is itself unsustainable — the single burden that now stands between the cross-hit click absorber and a named retained-history candidate row.

---

## 10. Self-Consistency of the Super-Field Inner Binary: The Two Routes Are One Crux (2026-07-08)

Section 9 left the cross-hit absorber's survival contingent on holding an inner binary at $\beta_{\mathrm{in}}\gtrsim1$. This section asks whether that super-field inner binary is itself a self-consistent retained-history configuration, or unsustainable. Owner script [super-field-inner-binary-consistency-diagnostic.mjs](../../../scripts/braid-ideal/super-field-inner-binary-consistency-diagnostic.mjs), tests [braid-ideal-super-field-inner-binary-consistency-diagnostic.test.js](../../../tests/braid-ideal-super-field-inner-binary-consistency-diagnostic.test.js), 5 passing. Four results chain into one verdict.

**Result A — the inner binary has no available cross-hit absorber (derivation).** A cross-hit click requires a source whose alignment reaches field speed, $A_{ij}=\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$; since $|A_{ij}|\le|\mathbf v_j|=\beta_j c_f$, the source must be super-field ($\beta_j\ge1$). The outer shell is sub-field ($\beta_{\mathrm{out}}<1$) and cannot straddle any receiver — measured $\max A_{\mathrm{out}\to\mathrm{in}}=0.43<c_f$ — and a same-shell partner shares the inner frequency, giving a time-constant $A_{ij}$ (Section 8 Result 1; measured variation $2.4\times10^{-15}$). So the inner binary's only possible cross-hit absorber is a strictly faster, distinct third shell.

**Result B — the cross-hit-only regress cannot terminate (derivation).** Shell $k$ is absorbed only by a faster super-field shell $k{+}1$ ($\beta_{k+1}>\beta_k\ge1$), so the tower $\beta_1<\beta_2<\cdots$ is strictly increasing and bounded below by $1$: it diverges ($\beta_k\to\infty$, inadmissible) unless it stops at a shell that closes by a **non-cross-hit** absorber. Turtles cannot go all the way down.

**Result C — the terminal shell's only sufficient absorber is its own super-field self-hit (reduction).** For the innermost shell cross-hit is unavailable, leaving radial breathing ($\le27\%$ of the pump), the static/induced sea ($\le10\%$), and the single-site self-hit. Only the self-hit can reach the full pump, but its magnitude is set by the coincidence-stratum scale $d_0$ (operator-declared 2026-07-08; $\approx50\times$ the pump at $d_0$, coincidence-dominated, not chart-clean). Moreover, above $\beta=1$ the anti-damping partner pump is itself uncertified — the interval certificate explicitly bails for $\beta\ge1$ — so the terminal balance couples the *uncertified super-field partner pump* to the *$d_0$-dependent self-hit*.

**Result D — the self-hit absorber is intrinsically super-field, co-located with the inner binary (derivation + measurement).** The rigid-circle self-hit residual $F(\Delta)=2\rho\sin(\beta\Delta/2\rho)-c_f\Delta$ has $F'(0)=\beta-1$: no nontrivial self-hit root below field speed, a root born exactly at $\beta=1$, and a finite root count in the causal memory window (order $1$ through $\beta\sim3$). The self-hit brake and the cross-hit inner binary live in the same super-field regime.

**Verdict:** `super_field_inner_binary_self_consistency_reduces_to_d0_self_hit_balance_cross_hit_and_self_hit_routes_are_one_crux`. The super-field inner binary is not independently sustainable through the cross-hit mechanism: the cross-hit click *relocates* the outer pump inward rather than dissipating it, and the innermost shell cannot pass the pump on again. Its terminal closure requires the super-field self-hit to balance the (uncertified) super-field pump — which is exactly the $d_0$ coincidence-stratum self-hit magnitude question already carried by the symmetric self-hit channel (Section 6; owner row `central_solver_self_hit_brake_finding`). The retention hunt's two surviving candidates therefore collapse into **one** crux: the $d_0$-set self-hit tangential balance on a super-field shell. This does not close the cross-hit route negatively; it unifies it with the self-hit route and removes the illusion that the two were independent hedges. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: compute the super-field tangential force balance on a single rigid shell for $\beta\gtrsim1$ — the (uncertified) partner-wake pump plus the $d_0$-regularized self-hit brake — and determine whether it admits a zero at an admissible $\beta^\*$ (a self-balancing terminal shell, closing the retention hunt affirmatively) or stays net anti-damping (no terminal shell, forcing dissipation into the Noether sea/field as the only remaining sink). This single super-field balance now stands behind both the cross-hit and the self-hit routes.

---

## 11. Super-Field Tangential Balance: The Field-Speed Pin (2026-07-08)

This section computes the super-field ($\beta\gtrsim1$) tangential force balance on a single rigid shell — the crux behind both the cross-hit and self-hit routes (Section 10). Owner script [super-field-tangential-balance-diagnostic.mjs](../../../scripts/braid-ideal/super-field-tangential-balance-diagnostic.mjs), tests [braid-ideal-super-field-tangential-balance-diagnostic.test.js](../../../tests/braid-ideal-super-field-tangential-balance-diagnostic.test.js), 5 passing.

**Normal-convention audit (2026-07-08).** All cross-hit math this thread was audited against the production runtime `receiverNormalFields` ([AbsoluteHistoryRootRuntime.mjs](../../../src/solver/app/AbsoluteHistoryRootRuntime.mjs)): the direction is $\hat{\mathbf r}=(\mathbf x_{\mathrm{rec}}-\mathbf x_{\mathrm{src}})/|\cdots|$ (source $\to$ receiver), the source-normal is $D_s=c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf r}$ (the jacobian/denominator), the receiver-normal is $D_T=c_f-\mathbf v_{\mathrm{rec}}\cdot\hat{\mathbf r}$ (numerator, same $\hat{\mathbf r}$), and the signed branch orientation is $m=D_T/D_s$. The click-rate, coexistence, and consistency diagnostics were confirmed to use the source-normal correctly (their alignment scalar equals $c_f-D_s$ to $2\times10^{-16}$); their impulse totals used the *magnitude* only, so the absorptive/ejective **sign** — which is $\operatorname{sign}(D_T)$ — is evaluated here for the first time, with the signed convention.

**Validated force law.** The point-value partner-wake evaluator reproduces the certified band $2.881\beta\le\Phi_{\mathrm{tan}}\le2.925\beta$ across $\beta\in[0.1,0.985]$ (measured $\Phi/\beta\in[2.888,2.919]$, all in-band), and signed and unsigned normals agree sub-field (where $D_T>0$). This validates the law before extension into the uncertified super-field regime.

**Result 1 — the partner pump persists and strengthens super-field (derivation + measurement).** Extending the validated evaluator across $\beta=1$ with signed normals, the partner-wake tangential force stays anti-damping (positive) and grows monotonically: $\Phi_{\mathrm{tan}}=2.87,2.92,2.98,3.08,3.24,3.58,4.28$ at $\beta=0.985,1.0,1.02,1.05,1.1,1.2,1.4$. The partners sit at finite angular separation, so their causal geometry stays single-root and non-caustic ($D_s>0$) through $\beta=1.4$. **The pump does not switch off or reverse above field speed** — the "uncertified pump might vanish" escape of Section 10 is closed.

**Result 2 — the self-hit brake (inputs, provenance recorded).** The same-source term is absorptive ($m=D_T/D_s<0$ on the pumped crossing; [click-impulse packet](fold-crossing-click-impulse-packet.md)), onsets exactly at $\beta=1$ (Section 10 Result D), and at the operator-declared $d_0$ has magnitude $\approx50\times$ the certified pump ([self-hit-brake-central-measurement.mjs](../../../scripts/braid-ideal/self-hit-brake-central-measurement.mjs)), with exact size gated on the open $d_0$ value.

**Result 3 — no static super-field $\beta^\*$; instead a field-speed pin (derivation from the validated sign structure).** Since the partner pump only grows for $\beta>1$, there is no static balance from the pump side. But the net force $\Phi_{\mathrm{net}}(\beta)=\Phi_{\mathrm{partner}}(\beta)+\Phi_{\mathrm{self}}(\beta;d_0)$ has a switching structure: above $\beta=1$ the self-hit is ON, absorptive, and (at the declared $d_0$) $\sim\!50\times$ the pump, so $\Phi_{\mathrm{net}}<0$ and $\beta$ is driven back down toward $1$; below $\beta=1$ the self-hit is OFF (no root) and the anti-damping pump drives $\beta$ back up toward $1$. The field-speed edge $\beta\approx1$ is therefore a **dynamic self-limiting attractor** — a pin, not a static super-field solution.

**Verdict:** `partner_pump_persists_super_field_no_static_beta_star_switching_self_hit_yields_field_speed_pin_gated_on_d0_sea_field_dissipation_not_required`. The retention hunt closes **affirmatively-conditionally**: a terminal shell exists — the inner binary pinned at the field-speed edge $\beta\approx1$ by the interplay of the always-on partner pump (drives up) and the super-field-only self-hit brake (drives down) — and it does **not** require dissipation into the Noether sea/field. The result is gated on $d_0$: the exact pin stability and location are set by the self-hit brake magnitude, and the declared $d_0$ ($\sim\!50\times$ the pump) is comfortably sufficient to enforce the pin. Claim level: **derivation + measurement** for the validated partner pump and its super-field persistence; **derivation** for the switching structure; **hypothesis** for the pin as a proven dynamical attractor (the actual trajectory needs the retained-history solver). Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: confirm the field-speed pin as an actual attractor on the native retained-history solver (a two-shell row with the inner binary released near $\beta=1$), and invert the pin balance $\Phi_{\mathrm{partner}}(1)+\Phi_{\mathrm{self}}(1;d_0)=0$ to **derive $d_0$** as the coincidence stratum that makes the field-speed edge marginally stable — turning the open $d_0$ value (particle-masses.md) into a fixed point of the retention balance rather than a free operator input.

---

## 12. Field-Speed Pin: Attractor Confirmation and d0 Inversion (2026-07-08)

This section confirms the Section 11 field-speed pin as an attractor and inverts the pin balance for the coincidence stratum. Owner script [field-speed-pin-attractor-diagnostic.mjs](../../../scripts/braid-ideal/field-speed-pin-attractor-diagnostic.mjs), tests [braid-ideal-field-speed-pin-attractor-diagnostic.test.js](../../../tests/braid-ideal-field-speed-pin-attractor-diagnostic.test.js), 6 passing.

**Authority.** This is a *reduced reference* integrator of the 1-D rim-fraction dynamics $\dot\beta\propto\Phi_{\mathrm{net}}(\beta)$, built from the already-validated signed-normal partner pump (Section 11) plus the switching self-hit brake. It is explicitly reference/comparison code, **not** the native central solver and not a new production solver. Confirming the pin on the native retained-history solver remains the gated acceptance step (`native_retained_history_promotion`).

**Correct brake law.** The self-hit brake is a *multiple of the local pump* (both scale together), not a fixed magnitude: $\Phi_{\mathrm{net}}(\beta)=\Phi_{\mathrm{partner}}(\beta)\,[1-\varrho\,\Theta(\beta-1)]$ with $\varrho=$ brake/pump ratio and $\Theta$ the field-speed switch. Above $\beta=1$, $\Phi_{\mathrm{net}}=\Phi_{\mathrm{partner}}(1-\varrho)$: since the partner pump grows super-field, the pin threshold is the *ratio* $\varrho>1$, not a fixed brake magnitude at $\beta=1$.

**Result 1 — the field-speed edge is a two-sided attractor (reduced level).** Integrating from releases on both sides of field speed: at $\varrho=1.5$ all releases $\{0.9,0.95,1.05,1.1\}$ converge to $\beta\approx1.00$; at the declared-$d_0$ strength $\varrho\approx50$ they pin at $\beta\approx0.98$ (a very strong brake with finite switch width sits marginally below the edge). Both are two-sided pins. At $\varrho=1$ the edge is marginal (attracts from below, neutral above); at $\varrho=0.5$ super-field releases run away upward (no pin). So $\beta=1$ is a two-sided attractor **iff $\varrho>1$**.

**Result 2 — inverting the balance bounds $d_0$; it does not uniquely derive it.** Using the measured self-hit-brake-versus-stratum curve (absorbed fraction of the pump $0.031/0.115/0.371/2.69/9.67$ as $\rho_c$ runs $0.2/0.1/0.05/0.01/0.001$; [click-impulse packet](fold-crossing-click-impulse-packet.md)), the marginal condition $\varrho=1$ (brake $=$ pump at $\beta=1$) lands at $\rho_c^\*\approx2.2\times10^{-2}$ (in $\rho=0.8165$, $c_f=\kappa=1$ units). The pin holds for $d_0\le\rho_c^\*$ (smaller stratum $\Rightarrow$ stronger brake $\Rightarrow$ stable), with $d_0=\rho_c^\*$ marginal. **This is an inequality, not a unique fixed point** — over-braking is also stable, so the balance *bounds* $d_0$ from above rather than pinning it. The independently-declared $d_0=R_{\mathrm{MCB}}\sim\kappa\epsilon^2/c_f^2$ corresponds to $\varrho\approx50$ (much smaller stratum), so it sits well inside the stable range and gives a firm, over-damped pin.

**Verdict:** `field_speed_edge_two_sided_attractor_for_ratio_above_one_balance_bounds_d0_by_marginal_stratum_declared_d0_over_damped_inside_range`. The field-speed pin is confirmed as an attractor at the reduced-dynamics level, and the retention balance yields the checkable condition $d_0\le\rho_c^\*\approx0.022$ (equivalently, the self-hit brake must exceed the partner pump above field speed), which the declared $d_0$ satisfies with large margin. The closure goal's hoped-for *unique* $d_0$ fixed point does not exist — the balance is a stability inequality — but it does convert $d_0$ from a free input into a bounded quantity tied to the retention mechanism. Claim level: **derivation + measurement** (reference) for the attractor and the marginal stratum; **hypothesis** for the pin on the native retained-history solver (gated) and for the assumption that $\varrho$ stays $>1$ as $\beta$ grows well above $1$ (the $\beta$-dependence of the self-hit-brake/pump ratio is not yet measured). Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: (a) confirm the pin on the native retained-history solver (gated two-shell row released near $\beta=1$); (b) measure the $\beta$-dependence of the self-hit-brake/pump ratio $\varrho(\beta)$ above field speed — if $\varrho(\beta)$ stays $>1$ the pin is unconditional in the super-field range, if it falls below $1$ at some $\beta$ there is an upper escape; and (c) reconcile the marginal stratum $\rho_c^\*\approx0.022$ against the $R_{\mathrm{MCB}}\sim\kappa\epsilon^2/c_f^2$ value ([particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md)) to check the declared $d_0$'s position inside the bound quantitatively.

---

## 13. Signed Re-Check of the Cross-Hit Coexistence Absorption (2026-07-08)

The 2026-07-08 receiver-normal audit flagged that Section 9 summed cross-hit click *magnitudes* to report a "$\approx3\times$ surplus" absorption and never evaluated the per-click receiver-normal sign $m=D_T/D_s$. This section redoes the tangential transfer to the sub-field outer receiver with the canonical **signed** convention (the same $m=D_T/D_s$ validated against the certified pump band in Section 11). Owner script [cross-hit-signed-absorption-recheck.mjs](../../../scripts/braid-ideal/cross-hit-signed-absorption-recheck.mjs), tests [braid-ideal-cross-hit-signed-absorption-recheck.test.js](../../../tests/braid-ideal-cross-hit-signed-absorption-recheck.test.js), 3 passing. The tangential force on a receiver from a source is $f=\sigma\,m\,(\hat{\mathbf r}\cdot\hat{\mathbf t}_{\mathrm{rec}})/L^2$ with $\hat{\mathbf t}_{\mathrm{rec}}$ the receiver tangential unit; $f<0$ brakes (absorptive), $f>0$ accelerates (ejective).

**Result 1 — the sign is set by polarity, with no per-pair cancellation (robust).** For a fixed source$\to$receiver polarity product $\sigma$, every click contributes the same sign (net $=\pm|{\rm sum}|$ to machine precision). The sign is $\sigma$: a **like-polarity** source is net **absorptive**, an **opposite-polarity** source is net **ejective**. The sign is regulator-robust. So Section 9's magnitude sum was not hiding per-pair cancellation — but it silently assumed every click absorbs.

**Result 2 — a neutral inner binary largely self-cancels (robust qualitatively).** The physical inner binary is neutral (one $+$, one $-$ member), so its two members deliver *opposite-sign* transfers to each outer receiver. These substantially cancel: the surviving net is far below the magnitude sum, and the cancellation grows as the fold pole is resolved (measured $\sim25\%$ at soft $=0.1$ up to $\gtrsim90\%$ at fine resolution). The "$\approx3\times$ surplus" is the *magnitude* sum; the polarity-residual *net* is a small fraction of it.

**Caveat — the instantaneous-proxy magnitudes are not converged.** Both the magnitude sum and the residual net grow as the $D_s\to0$ fold pole is resolved (regulator- and sampling-dependent). A converged magnitude requires the causal root-sum with the density-of-states measure (the Section 11 approach), not the instantaneous reception-time integral used here and in Section 9. Only the sign structure (Result 1) and the existence of strong polarity cancellation (Result 2) are robust. **Superseded 2026-07-08 by Section 14:** the causal root-sum converges and gives the neutral-binary net directly ($\approx1\%$ of the pump, ejective), so the magnitude non-convergence here is a proxy limitation, not a physical one.

**Verdict:** `section9_absorption_was_a_magnitude_sum_signed_recheck_shows_polarity_sets_absorb_vs_eject_neutral_binary_largely_cancels_net_absorption_not_robustly_established`. Section 9's "$\approx3\times$ surplus" overstated the case on two counts: it summed magnitudes (ignoring that opposite-polarity clicks *eject*) and it used a regulator-dependent instantaneous integral. The **necessary** conditions of the coexistence result (Section 8/9: enough clicks $+$ $\beta_{\mathrm{in}}\ge1$ straddling) are sign-independent and stand. The **sufficiency** — that a neutral inner binary net-absorbs the tangential pump through cross-hits — is **not** established; the net is a small, largely-cancelled, regulator-sensitive polarity residual. This does **not** affect the field-speed pin (Sections 11–12), which rests on the self-hit/partner-pump balance rather than the cross-hit channel, and it reinforces Section 10: the cross-hit is not an independent clean absorber, and the load-bearing terminal mechanism is the self-hit pin. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: if the cross-hit channel is to be revisited as an absorber, compute the neutral-binary net on the native causal root-sum (density-of-states measure) rather than the instantaneous proxy, to get a converged magnitude — and test whether a *deliberately polarity-imbalanced* inner configuration (which would break the self-cancellation) is itself dynamically admissible, or whether neutrality forces the cancellation and leaves the self-hit pin as the sole absorber.

---

## 14. Cross-Hit Absorption on the Causal Root-Sum (Fidelity Raise, 2026-07-08)

Section 13's signed re-check used an *instantaneous* alignment integral whose magnitude did not converge (it sampled the $D_s=0$ fold pole in reception time). This section raises the fidelity: it puts the cross-hit signed transfer on the same footing as the validated partner pump by solving the actual **causal root problem** — for each reception time $T$ it finds every emission time $T_{\mathrm{em}}<T$ with $|\mathbf X_i(T)-\mathbf x_j(T_{\mathrm{em}})|=c_f(T-T_{\mathrm{em}})$ and sums the signed branch contribution over roots, with source velocity at emission and receiver velocity at reception. Owner script [cross-hit-causal-absorption.mjs](../../../scripts/braid-ideal/cross-hit-causal-absorption.mjs), tests [braid-ideal-cross-hit-causal-absorption.test.js](../../../tests/braid-ideal-cross-hit-causal-absorption.test.js), 4 passing.

**Geometry (operator clarification, 2026-07-08).** The equal-radius single-shell *shell braid* in its planar state carries one common frequency, so by Section 8 it produces **zero** cross-hit clicks; the cross-hit absorber lives only in the **nested** two-frequency structure (inner binary at a distinct frequency from the outer shell). This evaluator models the nested case.

**Result 1 — the causal root-sum converges.** The neutral-binary net is stable under grid refinement ($0.214\to0.220\to0.224$ as $N_T=2000\to4000\to8000$; magnitude sum stable at $7.42$), and the caustic is a measure-zero set in reception time, so no regulator is needed. This is the well-defined quantity the Section 13 proxy could not produce.

**Result 2 — a neutral inner binary does not absorb.** Its two opposite-polarity members cancel to $\approx97\%$: the surviving net average tangential force is $\approx+0.035$ against a certified pump of $\approx2.9\beta\approx2.84$ — about $1\%$ of the pump, and *slightly ejective* (positive), not absorptive. The cross-hit channel supplies no net tangential absorption for a neutral braid.

**Result 3 — polarity sets the sign, and even an imbalanced shell is insufficient.** An all-like-polarity inner source is absorptive (avg tangential force $\approx-0.19$ per source), an all-opposite source ejective ($\approx+0.19$); a fully polarity-imbalanced (charged) inner shell reaches only $\sim20\%$ of the pump — the same "insufficient" league as radial breathing ($\le27\%$) and the static/induced sea ($\le10\%$). Neutrality forces near-total cancellation.

**Verdict:** `cross_hit_absorber_closed_for_neutral_braid_causal_root_sum_net_about_one_percent_of_pump_and_ejective`. On the causal root-sum, the Section 9 coexistence "$\approx3\times$ surplus" collapses entirely: a neutral inner binary's cross-hit transfer is $\sim1\%$ of the pump and ejective, and even a charged inner shell only reaches the insufficient league. The **necessary** coexistence conditions (Section 8/9 count $+$ straddling) still hold, but the cross-hit absorber is **closed** for the neutral braid. This does **not** affect the field-speed pin (Sections 11–12), which rests on the self-hit/partner-pump balance, and it confirms Section 10: the self-hit pin is the load-bearing terminal absorber; the cross-hit is not an independent absorber. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: with the cross-hit channel now closed for the neutral braid on the causal root-sum, concentrate the retention question on the self-hit field-speed pin — specifically the $\varrho(\beta)$ measurement (does the self-hit-brake/pump ratio stay $>1$ above field speed) and the native retained-history confirmation of the pin, which are now the sole remaining absorber path.

---

## 15. Iso-Frequency Planar Tri-Binary Restart: Internal Torque Closure on the Rail (2026-07-08)

Operator restart on the true inventory: six architrinos as **three neutral antipodal axes** (each axis one electrino + one positrino at $\phi_a$ and $\phi_a+\pi$) at radii $R_I<R_M<R_O$, all at **one common frequency** $\omega$ (iso-frequency planar state), with the **middle binary riding the $c_f$ rail** ($\beta_M=\omega R_M=1$ — the hinge/clicker). Owner script [planar-tri-binary-iso-frequency-evaluator.mjs](../../../scripts/braid-ideal/planar-tri-binary-iso-frequency-evaluator.mjs), tests [braid-ideal-planar-tri-binary-iso-frequency-evaluator.test.js](../../../tests/braid-ideal-planar-tri-binary-iso-frequency-evaluator.test.js), 6 passing. Per-layer representative receivers, full causal-root solve per partner, signed $m=D_T/D_s$ throughout. Cross-reference: [Planar Tri-Binary Noether Braid Reduced Chart](../braid-angular-momentum-spin/planar-tri-binary-noether-braid-reduced-chart.md) (this evaluator populates its $s_a=\omega\rho_a$ speed rows for the iso-frequency case).

**Validation anchors.** (i) Rigidity: the per-layer tangential residual is time-independent to $2\times10^{-15}$ (one common $\omega$ $\Rightarrow$ global rigid rotation $\Rightarrow$ single-time evaluation is exact). (ii) Equal-radii limit reproduces the certified hexagon band ($\Phi/\beta=2.9028\in[2.881,2.925]$ at $\beta=0.9$, layer-symmetric) — the evaluator degenerates to the certified planar shell-braid state, confirming the 3e:3p alternating-hexagon polarity inventory.

**Result 1 — regime map at the rail (structural).** With one common $\omega$, speeds order with radius ($s_a=\omega R_a$), so at $\beta_M=1$: inner sub-field, **outer super-field**. Self-hit roots confirm it: $0/0/1$ for I/M/O across the scanned window — the same-source root is born exactly at the rail (middle at birth, none), and the outer layer alone holds an open self-hit ledger. The iso-frequency state places the self-hit ledger on the **outer** layer, inverting the frequency-locked (4:2:1-type) picture where the inner layer is super-field.

**Result 2 — nesting reverses the tangential sign on the inner layer.** On the equal-radii shell every site is pumped ($+2.9\beta$). With nested radii the inner layer's partner-wake tangential residual turns **negative** (braking) over most of the scanned map (e.g. $\Phi_I=-1.15$ at $q_I=0.3$, $q_O=2$). The tangential pump is **not sign-definite across nested layers**: cross-layer delayed-wake geometry alone can brake a sub-field layer, with no self-hit and no external medium.

**Result 3 — a whole-braid net-torque closure curve exists on the rail.** Summing per-layer residuals with lever arms ($N=2\sum_a R_a\Phi_a$; antipodal symmetry gives both sites of a layer the same residual), the net partner-wake torque **crosses zero** along a curve near $q_O\approx2.2$, $q_I\approx0.25$–$0.35$ (bracketed: $N=+0.175\to-0.104$ across $q_O=2.0\to2.2$ at $q_I=0.3$; $N\approx-0.023$ at $q_I=0.35$, $q_O=2.2$). At the closure region the ledger reads: inner braked ($\Phi_I\approx-1.1$), middle mildly pumped ($\Phi_M\approx+0.1$–$0.3$), outer nearly free ($\Phi_O\approx+0.03$, its own near-null along $q_O\approx2.2$) with one open self-hit root available as its $d_0$-set brake. **This is the first configuration family found in the retention hunt where the tangential ledger can close internally — by cross-layer geometry — with no external absorber.** The residual per-layer values are internal redistribution (angular momentum shuttled between layers through the wake field); the middle's residual pump at the rail is exactly the throughput the escapement reading quantizes into $h_{\mathrm{act}}$ clicks, and the pin (Sections 11–12) holds the clicker on the rail.

**Caveats (honest scope).** Prescribed rigid worldlines (not the native retained-history solver — the layers cannot respond or exchange, so "closure" here means the ansatz's residual vanishes, a necessary condition only); partner channel only (the outer's self-hit contribution is $d_0$-dependent and reported as a root count, not added); radial force balance not computed; phases fixed at $\mathbb Z_3$ ($0/120/240°$) — the phase degrees of freedom will move all three curves and are unscanned; no sustained cross-pair hinge tuned in this pass ($A_{ij}=c_f$ pairs: none at the sampled points).

**Disposition:** `iso_frequency_tri_binary_rail_state_admits_internal_net_torque_closure_curve_first_geometric_internal_absorber_candidate`. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: refine the closure curve — locate the net-torque zero precisely in $(q_I,q_O)$, scan the axis-phase degrees of freedom, and add the radial (support) residual per layer on the same evaluator, to test whether tangential net-closure and radial support can hold at one iso-frequency rail configuration — the planar 1:1:1 eigen-braid candidate row.

---

## 16. Rail Closure Refinement: Radial Support Rejects the Circular Ansatz (2026-07-08)

Executing the Section 15 closure goal: locate the net-torque zero precisely, scan the axis phases, and add the per-layer radial (support) channel. Owner script extended in place ([planar-tri-binary-iso-frequency-evaluator.mjs](../../../scripts/braid-ideal/planar-tri-binary-iso-frequency-evaluator.mjs): `receiverResiduals` now returns tangential and radial projections plus `supportRatio`, with `netZeroInQO` and `phaseScan`); tests extended to 8, passing. New anchor: the equal-radii radial value lands inside the certified bound ($a_{\mathrm{rad}}=-0.7605\le-0.672$; the interval certificate's $\Phi_{\mathrm{rad}}$ row), so both projections of the evaluator are now certified-anchored.

**Support convention.** For a rigid circular layer the kinematic requirement is $a_{\mathrm{rad}}=-\omega^2R_a$; report $\mathrm{suppR}_a=-a_{\mathrm{rad},a}/(\omega^2R_a)$. A self-supported candidate row needs $\mathrm{suppR}$ **equal and positive across the three layers** (one common constant, absorbed into $\kappa$ — with one global coupling, only the ratios matter).

**Result 4 — the net-torque zero is a dip with two precise roots.** At $q_I=0.3$ the net crosses zero at $q_O^\*=2.0916$ and returns through zero at $q_O^\*=2.3724$ (at $q_I=0.35$: $2.1590$); the ledger at the lower zero reads $\Phi_I=-1.142$, $\Phi_M=+0.160$, $\Phi_O=+0.087$, $N=6\times10^{-9}$.

**Result 5 — every layer is bound, but the radial support ratios are strongly mismatched.** At the zero, $\mathrm{suppR}=10.9/1.97/0.32$ for I/M/O: all positive (net inward on all three layers — the braid binds itself), but the inner is over-bound and the outer under-bound by factors of $\sim5$–$6$ relative to the middle. The physics is structural: the needed centripetal grows with radius ($\omega^2R_a$) while the wake binding concentrates at small radius, so deep nesting — exactly what tangential net-closure requires — drives the radial ratios apart.

**Result 6 — phases cannot repair it.** Scanning both relative axis phases over $\pm60°$ at the zero: the best inner/outer ratio achieved is $\approx12.5$ (still an order of magnitude from matching), and pushing the outer phase past $+30°$ flips the outer layer to net-outward (unbound). Tangential net-closure and radial support-matching pull in opposite directions in $(q_I,q_O)$ for the circular ansatz, and the phase freedom does not reconcile them.

**Verdict:** `iso_frequency_rail_circular_ansatz_fails_simultaneous_tangential_and_radial_closure_candidate_row_must_be_non_circular_or_environmentally_confined`. The rigid **circular** three-layer iso-frequency rail state closes its tangential ledger on a curve (Section 15) but cannot simultaneously match radial support with one coupling — so if the iso-frequency braid exists, its layers are **not three concentric circles**: the surviving readings are (i) non-circular same-level realizations (eccentric/breathing layers, exactly the lane's own mandate that the ideal-braid search "should not assume circular orbits"), or (ii) outer confinement supplied environmentally (Noether sea), out of scope here. Note the outer's open self-hit root does not help: the same-source contribution is like-polarity repulsive (outward), worsening outer binding. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema. Forward tasks captured as Group E items 17–18 in [priorities](priorities.md) (lock perturbation basin; formation auto-tune).

Next closure goal: relax circularity in the reduced ansatz — give each layer an eccentricity/breathing degree of freedom (lowest Fourier mode per layer) on the same signed-normal causal evaluator, and test whether the radial-support mismatch at the tangential-closure curve can be absorbed by orbit shape rather than by phases — the non-circular planar 1:1:1 eigen-braid candidate.

---

## 17. Non-Circular Relaxation: The m=2 Shape Mode Is Rejected (2026-07-08)

Executing the Section 16 closure goal. New owner script [planar-tri-binary-breathing-extension.mjs](../../../scripts/braid-ideal/planar-tri-binary-breathing-extension.mjs) (tests [braid-ideal-planar-tri-binary-breathing-extension.test.js](../../../tests/braid-ideal-planar-tri-binary-breathing-extension.test.js), 4 passing): inner/outer layers get the lowest antipodal-symmetric radius modulation $r=R_a(1+e_a\cos(2\varphi+\psi_a))$ at constant angular rate (the $m{=}2$ centered-ellipse mode; middle stays circular so the rail is exact); breathing breaks rigidity, so residuals are cycle-sampled. New **unified closure metric**: fit one global coupling $\kappa^\*$ by least squares over all layers, both force components, and the full cycle, and report per-layer relative residuals $\rho_a=\|a_{\mathrm{kin}}-\kappa^\*a_{\mathrm{wake}}\|/\|a_{\mathrm{kin}}\|$ — a candidate row is a configuration driving all $\rho_a\to0$. This metric subsumes the separate tangential (Section 15) and radial (Section 16) rows.

**Result 7 — the circular family bottoms out far from closure, and not on the net-torque curve.** In the unified metric the circular map minimizes at milder nesting ($q_I=0.5$, $q_O=1.6$: $\rho=1.15/0.35/0.67$, global $0.646$), not at the Section 15 net-torque zero (global $0.888$ there). Even at its optimum the wake field coherently supplies only $\sim\!\tfrac13$ of the required acceleration pattern.

**Result 8 — $\psi$ is a gauge; only $e$ matters.** At constant angular rate the inter-axis angles never change, so shifting a layer's modulation phase merely relabels the cycle average: residuals are exactly $\psi$-independent (verified to $10^{-6}$). The $m{=}2$ mode at constant $\dot\varphi$ therefore carries **one** effective knob per layer, not two.

**Result 9 — circular is a shape-space local minimum: the $m{=}2$ mode is rejected.** Every scanned breathing direction degrades global closure ($0.646\to0.66$–$0.95$ across $e_I,e_O\in\{0.1,0.2,0.4\}$ singly and jointly, at both the circular optimum and the net-torque zero). Orbit shape at the lowest Fourier mode with uniform angular rate cannot absorb the mismatch.

**Verdict:** `iso_frequency_deep_nesting_tangential_closure_and_radial_self_support_mutually_exclusive_m2_shape_rejected`. Combining Sections 15–17: the iso-frequency circular braid closes its tangential ledger only when deeply nested, deep nesting cannot radially self-support under one coupling, and the lowest shape mode cannot bridge the two. The missing ingredient is structural, not a polish; the untried freedoms, in order of physical promise: (i) **speed modulation** (Kepler-like $\dot\varphi$ variation — the mode $m{=}2$-at-constant-rate cannot reach; it exchanges tangential and radial around the cycle, and for the middle layer it is exactly the escapement *ticking*: crossing the rail twice per cycle and transacting self-hit clicks, which requires the $d_0$ self-hit channel in the balance); (ii) **frequency hierarchy** (the 4:2:1 / 3:2:1 nested states, restoring the inner-super-field ordering of the original intuition); (iii) **out-of-plane structure** (the planar restriction); (iv) **sea confinement** (the braid may not be isolated — the outer binding deficit is exactly where an external medium term would sit). Note the outer's own self-hit cannot rescue the isolated planar state: same-source pushes are like-polarity repulsive with outward radial component, worsening the outer deficit. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: run the frequency-locked nested candidates (4:2:1 and 3:2:1, inner-super-field per the original intuition) through the same unified global-closure metric — different per-layer frequencies make the configuration periodic at the common period, which the cycle-sampling machinery already supports — and compare their closure floors against the iso-frequency family's $0.646$, to determine whether a frequency hierarchy relieves the tangential/radial exclusivity that closes the iso-frequency circular family.

---

## 18. Frequency Locks, Kepler Mode, and Counter-Rotation: The Harmonic-Matching Principle (2026-07-08)

Autonomous exploration window (operator-approved). Two new owner scripts: [planar-tri-binary-frequency-lock-evaluator.mjs](../../../scripts/braid-ideal/planar-tri-binary-frequency-lock-evaluator.mjs) (per-layer integer frequency multiples, cycle-sampled over the common period, declared caustic regulator soft $=0.02$ since beats revive fold passages; tests 4 passing) and [planar-tri-binary-kepler-extension.mjs](../../../scripts/braid-ideal/planar-tri-binary-kepler-extension.mjs) (equal-area speed modulation, Kepler's second law $r^2\dot\varphi=$ const per layer with common period; exact $e{=}0$ regression to the circular floor; tests 4 passing). All on the unified global-closure metric.

**League table (planar prescribed-worldline families, global relative residual; lower is better):**

| Family | Floor found | Status |
| --- | --- | --- |
| Co-rotating iso-frequency circular (rigid) | **0.646** at $(q_I,q_O)=(0.5,1.6)$ | planar champion |
| + $m{=}2$ shape, constant rate (Section 17) | degrades ($0.66$–$0.95$) | rejected |
| + $m{=}2$ shape, equal-area **Kepler** | degrades ($0.65$–$0.94$; $\psi$ live but unhelpful) | rejected |
| Counter-rotating variants ($\pm1$ circulations) | $0.85$–$0.99$ | rejected |
| Frequency-locked 4:2:1 / 3:2:1 circles (inner-super-field restored, middle rail) | $0.96$–$1.0$, incl. at Kepler-third-law radii $n_a^2R_a^3=$ const | rejected at circular level |

**The harmonic-matching principle (the structural finding).** A circular orbit's kinematic requirement is a single-harmonic rotating vector, so only the *time-constant part of the wake field in the co-rotating frame* can match it. Rigid co-rotation puts **all** wake power into that DC part — which is exactly why the iso-frequency family closes best and why its Section 15 internal-transfer structure exists. Any relative layer motion — frequency locks (beats), counter-rotation, or speed modulation — moves wake power into oscillating harmonics that circular kinematics cannot absorb, and the lowest-mode orbit deformations add kinematic harmonics faster than they match wake harmonics. Retardation kills the naive Kepler-third-law scaling for locks (during one antipodal wake transit at $\beta\sim1$ the pair rotates $\sim115°$, so static-binding intuition does not transfer). The fair continuation for locks is a *harmonically-forced response orbit* (each layer deformed at the beat harmonics its wake forcing actually contains) — expensive, untried.

**What survives for the remaining $0.646$:** the missing ingredient is not an in-plane prescribed-orbit freedom. Untried: (i) **out-of-plane structure** — the operator's sphere-state shell braid and its 3D nesting (the largest structural gap; the planar restriction was a convenience, not physics); (ii) **the $d_0$ self-hit channel at the rail** (the escapement's force-balance contribution, excluded so far); (iii) **sea confinement** (the outer binding deficit is shaped exactly like an external medium term); (iv) $m{=}1$ (focus-offset) shape modes, which break antipodal central symmetry and need both-site evaluation. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: lift the evaluator out of plane — evaluate the sphere-state shell braid (three neutral axes on one sphere, the operator's equal-$r$ 3D state) and its 3D nested variants on the same unified global-closure metric, to test whether the polar degree of freedom supplies the closure the planar family cannot.

---

## 19. Sphere State and the Completed Planar-Era League Table (2026-07-08)

First out-of-plane lift, executing the Section 18 closure goal at v0 scope. Owner script [sphere-state-shell-braid-evaluator.mjs](../../../scripts/braid-ideal/sphere-state-shell-braid-evaluator.mjs) (tests [braid-ideal-sphere-state-shell-braid-evaluator.test.js](../../../tests/braid-ideal-sphere-state-shell-braid-evaluator.test.js), 3 passing): the shell braid's sphere state — three neutral antipodal binaries at one radius and one frequency in three mutually orthogonal planes (xy/yz/zx), six architrinos, full 3D causal-root solve, unified metric. The configuration is non-rigid (inter-binary distances beat at $2\omega$), so the harmonic-cancellation question — does the three-fold orthogonal symmetry cancel the oscillating wake content? — is exactly what the metric measures.

**Result: it does not cancel.** The sphere state scores $0.986$–$0.997$ across $\beta\in[0.7,0.98]$ and phase choices (perfectly binary-symmetric, as required by the geometry, but the wake is nearly uncorrelated with the circular kinematic need). The harmonic-matching principle extends unbroken to this 3D state. For completeness the pure planar hexagon (equal radii, the certified shell state) was also measured in the unified metric: $0.960$ — its binding is coherent but the $2.9\beta$ pump dominates the residual.

**Completed league table (unified global-closure residual; prescribed circular worldlines unless noted):**

| Configuration | Global residual |
| --- | --- |
| **Co-rotating nested iso-frequency, $(q_I,q_O)=(0.5,1.6)$, middle rail** | **0.646** |
| + best $m{=}2$ shape (constant-rate or Kepler equal-area) | $\ge0.65$ (both rejected) |
| Counter-rotating variants | $0.85$–$0.99$ |
| Planar hexagon (equal radii, certified shell state) | $0.960$ |
| Frequency-locked 4:2:1 / 3:2:1 (incl. Kepler-third-law radii) | $0.96$–$1.0$ |
| Orthogonal-plane sphere state | $0.99$ |

The story the table tells: coherence with circular kinematics requires rigidity (co-rotation), the hexagon's residual is the pump, **nesting cancels the pump internally** ($0.96\to0.646$ — the Section 15 mechanism, the single largest closure gain found), and everything that breaks rigidity scores $\sim1$. The remaining $0.646$ is the radial-support-ratio mismatch, and no prescribed-circle freedom — in-plane or this 3D state — touches it. The surviving routes are unchanged from Section 18 but sharpened: tilted/precessing 3D *nested* states that preserve co-rotation rigidity in a rotating frame (rigid 3D rotations exist — the planar restriction of the nested family, not the sphere state, is the right thing to lift), the $d_0$ self-hit channel at the rail, sea confinement, and harmonically-forced response orbits. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: evaluate a **rigid 3D nested** configuration — the three nested neutral binaries co-rotating about one common axis but with the three binary planes tilted (a rigid body rotation, preserving the DC-only wake structure that makes closure possible), tilt angles as new knobs — on the unified metric, testing whether tilt can absorb the radial-support mismatch that the planar nested family cannot.

---

## 20. Rigid Tilted-Nested Braid: First Improvement Below the Planar Floor (2026-07-08)

**Naming ratification (operator, 2026-07-08):** this rigid uniaxial tilted-dumbbell family — Sections 20–23's subject — is the **spindle braid** (corpus definition: [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md), [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md)). The Section 22 champion is the spindle braid rest-state candidate; the planar tri-binary is its flat limit; the axial-dipole limit is its full-cap-tilt member.

Executing the Section 19 closure goal. Owner script [rigid-tilted-nested-braid-evaluator.mjs](../../../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs) (tests [braid-ideal-rigid-tilted-nested-braid-evaluator.test.js](../../../tests/braid-ideal-rigid-tilted-nested-braid-evaluator.test.js), 5 passing). Construction: to preserve co-rotation rigidity (the harmonic-matching requirement), the three nested neutral binaries are **tilted dumbbells** rigidly co-rotating about one axis — axis $a$'s pair at $\pm R_a\hat{\mathbf n}_a(t)$ with tilt $\alpha_a$ (elevation from the equator) and azimuth $\theta_a$. Every site traces a horizontal circle at cylindrical radius $R_a\cos\alpha_a$ and fixed height; rigidity verified with tilts to $1.3\times10^{-15}$; the $\alpha=0$ regression reproduces the planar floor exactly ($0.6460$). Tilt rescales each layer's kinematic **need** ($\omega^2R_a\cos\alpha_a$) while reshaping its 3D wake supply, and adds a vertical force-balance row that the 3-component unified metric counts automatically. Middle stays equatorial ($\alpha_M=0$): the rail is exact.

**Result 1 — outer tilt is the first freedom to beat the planar floor.** Inner tilt degrades (as the over-binding diagnosis predicts: lowering the inner's need worsens its surplus). Outer tilt initially degrades (aberrated geometry) but past $\alpha_O\approx60°$ turns and crosses below the floor at $\alpha_O\approx75°$ ($0.616$), continuing down monotonically: $0.589/0.564/0.545/0.531/0.527$ at $78°/81°/84°/87°/89°$. With a radius rescan, $(q_I,q_O,\alpha_O)=(0.5,2.0,84°)$ reaches $\mathbf{0.5237}$ — a $19\%$ improvement over the planar champion, with the outer still orbiting ($\beta_O\approx0.21$).

**Result 2 — the geometry is morphing toward an axial dipole.** As $\alpha_O\to90°$ the outer binary's sites approach the rotation axis at $\pm R_O$: a **static axial pair** — an axial dipole above and below the co-rotating planar core. That is an existing corpus structure (the derived-structure inventory's axial-dipole channel), and the metric is discovering it unprompted.

**Caveat (metric honesty).** The unified metric weights layers by $|a_{\mathrm{kin}}|^2$, and the outer's need $\to0$ as $\alpha_O\to90°$, so part of the near-polar gain is the outer *leaving the ledger* rather than closing it (its own need-relative residual grows: $1.05\to3.4$ across the same sweep). The honest closure question in the polar limit changes form: a static axial pair needs near-zero **absolute** force, so the polar family must be scored on absolute residuals for the axial pair alongside need-relative residuals for the orbiting core. Untried knobs: middle tilt (moves the rail definition), azimuthal stagger $\theta_a$, and counter-tilted ($\pm\alpha$) arrangements. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: score the axial-dipole limit honestly — absolute-force residuals for the near-polar outer pair together with need-relative residuals for the orbiting inner+middle core, sweeping $\alpha_O\to90°$, the axial height $R_O$, azimuths, and counter-tilt — to determine whether "co-rotating nested planar core + static axial dipole" is a genuine closure candidate or a metric artifact.

---

## 21. Polar Scoring, Counter-Tilt, and the Flywheel Family (2026-07-08)

Executing the Section 20 closure goal, widened per operator input (the original gyroscopic-flywheel intuition pictures: three nested binaries orbiting along mutually inclined "Lorentzian" rings). Owner scripts: [rigid-tilted-nested-braid-evaluator.mjs](../../../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs) extended with `polarScore` (absolute-force scoring for the static polar pair), and new [inclined-rings-flywheel-evaluator.mjs](../../../scripts/braid-ideal/inclined-rings-flywheel-evaluator.mjs) (sites orbiting along inclined rings — the operator's picture; exact $\iota{=}0$ regression to the planar floor after fixing a chirality trap in the node-line convention: staggered nodes must phase-compensate or the $\iota\to0$ limit silently mirrors the phase order against the rotation sense, and the delayed-wake braid is strongly chiral). Tests: 11 passing across both.

**Result 1 — no axial-dipole levitation.** At $\alpha_O=90°$ the static polar pair's net force is inward at every height ($F_z<0$, decaying $\sim$ inverse-square from $-0.046$ at $q_O{=}1.2$ to $-0.005$ at $4.0$): the caps are always pulled toward the core; there is no equilibrium height. The near-polar metric gain of Section 20 was therefore partly real (finite-tilt orbiting caps at $84°$ do help) but the $\alpha_O\to90°$ *limit* is not a static structure — the caps must orbit (finite tilt) or fall in. Revealing byproduct: the core scores *improve* monotonically as the caps recede — the bare inner+middle two-binary core alone scores $\rho_I/\rho_M\approx0.53/0.46$, better than any six-site configuration found, so the outer binary as placed is a net closure burden in every tested arrangement.

**Result 2 — counter-tilt is the new champion; the rail resists tilting.** Widened tilt scan at $(q_I,q_O)=(0.5,2.0)$: middle tilt degrades sharply ($0.52\to0.69\to0.88$ by $\alpha_M=30°$ — the clicker wants to stay clean), inner co-tilt degrades, but inner **counter**-tilt against the outer helps: $(\alpha_I,\alpha_M,\alpha_O)=(-15°,0,84°)$ reaches $\mathbf{0.5088}$, the best score found.

**Result 3 — the flywheel (inclined-rings) family does not beat the planar champion, but carries a layer-resolved consonance.** Uniform inclination about a common node is a global rotation (score exactly invariant — a passed consistency check). *Relative* ring inclination degrades: outer-ring $\iota_O=15°/30°/45°/60°$ gives $0.667/0.716/0.765/0.799$; mixed all-different combos likewise. The exception: **small inner-ring inclinations are nearly free** ($\iota_I=15°$: $0.6457$ vs $0.6460$). Layer tolerance for inclination runs inversely with layer speed — the fast outer layers must stay harmonic-clean (planar or rigid-dumbbell) while the slow inner binary retains genuine 3D orientation freedom. This is the operator's Lorentzian-flattening panel (fast cores flatten to 2D; slow cores keep 3D fermion orientation) recovered layer-by-layer by the closure metric.

**Standings after this pass:** rigid counter-tilted dumbbell family $0.5088$ > planar nested $0.646$ > everything non-rigid. Persistent structure: the inner+middle core closes well and improves whenever the outer's burden is reduced; the outer layer is the unsolved element — it wants to be far away, nearly polar, slowly orbiting, and counter-tilted against the inner, and even then contributes the worst per-layer residual ($\approx0.97$). Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: attack the outer-layer burden directly — sweep the outer binary's remaining cheap freedoms on the counter-tilted champion (azimuthal phase relative to the core, radius at fixed tilt, and the outer-polarity swap, i.e. which cap is positive) and test the two-binary core + *detached* outer reading (is the six-architrino braid better modeled as a tightly-closed inner+middle core weakly binding a peripheral third binary — a hierarchy rather than three peers?).

---

## 22. Outer-Layer Tuning: The Caps Join the Braid (2026-07-08)

Executing the Section 21 closure goal (outer azimuth, radius, polarity swap; hierarchy scoring). Evaluator extended with receiver-subset scoring; tests 8 passing.

**Result 1 — the outer azimuth is a live, strong knob.** Sweeping the outer dumbbell's azimuthal phase against the core (champion had the Z₃ value $240°$): the score improves monotonically to an optimum near $\theta_O\approx330$–$345°$, i.e. the cap pair sitting roughly $30°$ *behind* the inner axis rather than at the symmetric Z₃ slot. The cap-polarity swap ($+$ cap below, $\alpha_O\to-\alpha_O$) degrades ($0.48\to0.59$): with the inner counter-tilted, the up/down cap orientation is physically selected.

**Result 2 — new champion at $\mathbf{0.4721}$**: $(q_I,q_O)=(0.5,1.65)$, $(\alpha_I,\alpha_M,\alpha_O)=(-12°,0°,84°)$, $\theta_O=330°$, in a flat basin ($0.472$–$0.476$ over $q_O\in[1.5,1.65]$, $\theta_O\in[330,345]$). Ladder: planar $0.646\to$ tilt $0.524\to$ counter-tilt $0.509\to$ azimuth/radius-tuned $\mathbf{0.472}$. The outer layer's own residual collapses from $\approx0.97$ (worst layer) to $0.33$–$0.50$ at tuned placement, with $\beta_O\approx0.17$ and caps at $z\approx\pm1.6$.

**Result 3 — the hierarchy verdict reverses: the braid wants its caps.** Scoring the inner+middle core alone: with the tuned caps present the core closes at $0.4685$; with the outer decoupled ($q_O=40$) it closes at $0.5039$. The Section 21 "outer as net burden" conclusion was an artifact of the untuned Z₃ azimuth — at the tuned placement the caps *improve* the core's closure (notably the middle's rail row). The six-architrino braid is not a four-site core plus a parasite; correctly placed, the third binary is a functional part of the closure, and the hierarchy reading is rejected.

**Emerging champion geometry (rest state):** a fast equatorial rail pair ($\beta_M=1$, the clicker at root birth), a slightly counter-dished inner pair ($\beta_I\approx0.48$), and two slow polar caps ($\beta_O\approx0.17$) offset $\sim30°$ behind the inner axis — all rigidly co-rotating at one frequency, fully sub-field except the middle exactly on the hinge. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: item 19 — the translating screw-motion evaluator: drift the tuned champion along its axis at $u$, re-optimize $(\omega,R_a,\alpha_a,\theta_O)$ per $u$ under the same metric, and test whether the rail forces cadence $\to\omega/\gamma$ (time dilation from closure) and the tilts flow toward the operator's Lorentzian-flattening sequence as $u\to c_f$.

---

## 23. Champion Stiffness Spectrum: Saddle, Backbone, and the Pump in the Gradient (2026-07-08)

Queue item 20 executed. Owner script [champion-stiffness-spectrum.mjs](../../../scripts/braid-ideal/champion-stiffness-spectrum.mjs) (tests [braid-ideal-champion-stiffness-spectrum.test.js](../../../tests/braid-ideal-champion-stiffness-spectrum.test.js), 3 passing): gradient and full $7\times7$ Hessian of the unified closure residual around the Section 22 champion in $(q_I,q_O,\alpha_I,\alpha_M,\alpha_O,\theta_O,\beta_M)$ (angles in radians, radii/$\beta_M$ dimensionless — the eigenbasis depends on this declared scaling), with Jacobi eigen-decomposition.

**Result 1 — the spectrum.** Eigenvalues (soft$\to$stiff): $-0.34$ (coupled relative-tilt mode, $\alpha_I$ against $\alpha_M$), $-0.04$ ($q_O/\theta_O$), $+0.05$ ($\theta_O$ — the flat azimuth basin made quantitative), $+0.23$ ($\beta_M$, the rail knob), $+3.7$ ($\alpha_O$), $+5.3$ ($\alpha_M$), $+18.9$ ($q_I$). The **inner radius is the rigidity backbone** (5× anything else); the cap azimuth is nearly free; the softest directions are relative-tilt combinations — the predicted strain sinks under external hits and the natural candidates for h-click storage (brainstorm items 3–4).

**Result 2 — the champion is a saddle, and the rail gradient is the pump.** Two negative eigenvalues mean descent directions remain; following them (with $q_I\to0.47$) refines the sub-field-honest score to $\mathbf{0.4531}$, with the geometry morphing (inner dish flattening toward $+3°$, middle acquiring $\approx-8°$ in the coupled move) — a systematic minimizer is now warranted over hand-stacking. Separately, the $\beta_M$ gradient is **negative** ($-0.27$): partner-only closure improves *past* the rail ($0.4468$ at $\beta_M=1.1$). Read correctly this is not an instability of the model but a consistency closure: the partner-channel gradient pushing $\beta_M$ up **is the anti-damping pump** appearing in the closure landscape, and the self-hit brake — excluded from this evaluator by construction, opening exactly at $\beta_M>1$ — is what the pin (Sections 11–12) supplies to stop the slide at the rail. The saddle's downhill rail direction is precisely what the escapement exists to catch.

**Result 3 — the clock-hypothesis bridge (captured as a bound target).** Per the 2026-07-08 brainstorm, storage-ring clock-hypothesis tests (pure $1/\gamma$ decay at $\sim10^{18}\,g$) bound how much braid-geometry strain per unit acceleration may leak into transaction rates; once the $\kappa$ force normalization is fixed, this spectrum's soft eigenvalues acquire an experimental floor. Promoted to the corpus as a new row in [Braid Recovery Requirements](../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md) ("Decay-rate dilation and the clock hypothesis"), operator-directed. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: item 19 — the translating screw-motion evaluator: drift the champion along its axis, find the closure-optimal cadence at each $u$ and compare against $\omega_0/\gamma$ (the rail-condition prediction — time dilation from closure), then read the flattening, the running of the misalignment angles, $L^*(u)$, and the preferred leader.

---

## 24. Spindle Braid Under Drift: Time Dilation From Pump-Plus-Pin, and the Electrino Leads (2026-07-08)

Queue item 19, pass 1 (fixed rest-state geometry; per-$u$ re-optimization deferred to pass 2). Owner script [spindle-braid-screw-drift-evaluator.mjs](../../../scripts/braid-ideal/spindle-braid-screw-drift-evaluator.mjs) (tests [braid-ideal-spindle-braid-screw-drift-evaluator.test.js](../../../tests/braid-ideal-spindle-braid-screw-drift-evaluator.test.js), 5 passing). The spindle braid champion is drifted along its spin axis at $u$; rotation + translation is a screw motion, so rigidity survives exactly (co-screwing wake constant to $3\times10^{-16}$) and single-time evaluation remains valid. The kinematic need is unchanged; only the causal wake geometry becomes fore-aft anisotropic (root lookback stretched by $1/(1-u)$; scan windows scaled).

**Result 1 — no interior cadence optimum in the partner channel: the pump, at every drift.** Scanning the transverse middle cadence $c=\omega R_M$ at $u\in\{0.2,0.4,0.6\}$, the closure optimum slides up-cadence off the grid top at every $u$ — the same anti-damping pump signature as the Section 23 rail gradient, now at drift. In rail-normalized cadence $c/\sqrt{1-u^2}$ the landscape is approximately self-similar across $u$ (pump slopes parallel to $\sim5\%$): the natural cadence variable at drift is the $\gamma$-scaled one.

**Result 2 — time dilation from pump-plus-pin.** The general coincidence-birth theorem (Section 10 Result D; any smooth worldline) applies to helical motion: the same-source root opens exactly when the site's **total** speed crosses $c_f$, i.e. at $c=\sqrt{1-u^2}$. So the measured pump (pushes cadence up at every $u$) meets the self-hit brake (opens at exactly the $\gamma$-scaled rail) precisely at $c^{\mathrm{pin}}(u)=\omega_0\sqrt{1-u^2}=\omega_0/\gamma$: **the pinned internal cadence dilates as $1/\gamma$**, deriving clock (and, via cadence-paced transactions, decay-rate) dilation from the closure landscape plus the pin — the mechanism half of the new [Braid Recovery Requirements](../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md) decay-dilation row. Caveats: fixed geometry (pass 1); the brake magnitude is $d_0$-dependent (the pin's existence needs only its sign and onset); partner-channel metric.

**Result 3 — the electrino cap leads.** Flipping the drift sign on the same braid ($+$ cap north, $h=\hat{\mathbf d}\cdot\hat{\boldsymbol\omega}=+1$): closure prefers drift **anti-parallel to the polarity dipole** — the electrino cap in front — at every speed, with the preference growing strongly ($\Delta f=0.044/0.104/0.174$ at $u=0.2/0.4/0.6$; the operator's "especially visible at high speeds," measured). By exact C-degeneracy the anti-braid leads positrino-first: **helicity-polarity locking selected by closure**, the neutrino-flavored texture of the operator's intuition panels. Curiosity flagged: preferred-direction drift at $u=0.2$ scores $0.4721$ — the rest value to four digits — so slow preferred-direction travel is nearly free.

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: item 19 pass 2 — re-optimize the spindle geometry per $u$ (tilts, radii, cap azimuth) at the pinned cadence $\omega_0/\gamma$, reading the Lorentzian flattening, the running of the misalignment angles, and $L^*(u)$ with geometry response included; then the native retained-history confirmation of the spindle rest state.

---

## 25. Drift Pass 2: The Angles Run, and Motion Is Preferred (2026-07-08)

Item 19 pass 2: per-$u$ geometry re-optimization at the pinned cadence $c=\sqrt{1-u^2}$, drifting in the preferred direction (electrino cap leading), coordinate descent over $(\alpha_I,\alpha_O,\theta_O,q_O)$ with $q_I$ held (stiffness backbone) and $\alpha_M=0$ (rail clean). Owner script extended with `pass2Optimize`; tests 6 passing.

| $u$ | pinned $c$ | $f^{\mathrm{opt}}$ | $\alpha_I$ | $\alpha_O$ | $\theta_O$ | $q_O$ |
| --- | --- | --- | --- | --- | --- | --- |
| $0$ (rest) | $1.000$ | $0.4721$ | $-12°$ | $84°$ | $330°$ | $1.65$ |
| $0.2$ | $0.980$ | $0.4351$ | $-4°$ | $78°$ | $346°$ | $1.33$ |
| $0.4$ | $0.917$ | $0.4110$ | $+8°$ | $78°$ | $346°$ | $1.41$ |
| $0.6$ | $0.800$ | $0.4037$ | $+16°$ | $81°$ | $354°$ | $1.73$ |

**Result 1 — the misalignment angles RUN with group velocity.** The inner dish angle runs strongly and monotonically ($-12°\to-4°\to+8°\to+16°$), sweeping through exactly flat near $u\approx0.25$; the cap azimuth lag closes toward alignment ($30°\to14°\to14°\to6°$ behind the inner axis). The 2026-07-08 brainstorm's beyond-numerology test is answered in-model: the closure-optimal internal angles are $u$-dependent — the weak-mixing-flavored misalignments behave like running quantities, and any angle-to-observable mapping must be stated at a declared kinematic point. The cap tilt $\alpha_O$ barely moves ($84°\to78$–$81°$): the caps stay near-polar; the geometry response lives in the dish, the lag, and the cap radius (non-monotone $1.65\to1.33\to1.73$).

**Result 2 — motion is preferred: the rest state is not the family optimum.** $f^{\mathrm{opt}}$ falls monotonically with preferred-direction drift ($0.472\to0.435\to0.411\to0.404$, still descending at $u=0.6$). Within the partner-channel metric, the spindle braid closes better *moving* than at rest — the operator's "a braid wants a speed matched to its inventory" intuition (brainstorm item 4) appearing as a global tilt of the closure landscape toward motion. Read with care: this is a preferred-frame-sensitive statement from a prescribed-worldline partner-channel metric (no self-hit brake, no radiation cost, $q_I$ frozen, radial rebalance partial); whether the descent continues toward the photon limit ($u\to c_f$, the operator's $v\ge c$ panel) or turns at a finite optimal $u$ is the sharpest open question this pass creates. $L^*(u)$ at the re-optimized geometry falls slightly slower than the pinned $1/\gamma$ alone (geometry partially compensates the cadence factor).

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: extend the preferred-direction sweep toward $u\to c_f$ (with stretched root windows) to locate the closure optimum of the moving family — finite optimal $u$ (an inertia-anchored rest-mass-flavored state) versus monotone descent to the photon limit — and compute the inertia curve $f^{\mathrm{opt}}(u)$ curvature; in parallel, the native retained-history confirmation of the spindle rest state remains the gated acceptance step.

---

## 26. Drift Pass 3: A Finite Optimal Speed — The Moving Family Is Inertia-Anchored (2026-07-08)

Extending the preferred-direction sweep toward $u\to c_f$ (root windows stretched $1/(1-u)$, coordinate-descent re-optimization per $u$; noise $\sim\pm0.003$ from descent resolution):

| $u$ | $0$ | $0.2$ | $0.4$ | $0.5$ | $0.55$ | $0.6$ | $0.65$ | $0.7$ | $0.8$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $f^{\mathrm{opt}}$ | $0.4721$ | $0.4351$ | $0.4110$ | $0.4073$ | $0.4085$ | $0.4037$ | $0.4074$ | $0.4131$ | $0.4444$ |
| $\alpha_I$ | $-12°$ | $-4°$ | $+8°$ | $+16°$ | $+20°$ | $+16°$ | $+20°$ | $+20°$ | $+24°$ |
| $\theta_O$ | $330°$ | $346°$ | $346°$ | $354°$ | $354°$ | $354°$ | $362°$ | $362°$ | $378°$ |

**Result — finite optimum, not monotone descent.** The closure landscape of the moving spindle family has a **broad flat basin at $u^\*\approx0.5$–$0.65$** and climbs steeply beyond ($+10\%$ by $u=0.8$): approaching the photon limit costs closure. The moving family is inertia-anchored at a finite speed rather than running away to $u\to c_f$. Robust claim: the *structure* (tilt from rest $\to$ finite basin $\to$ climb toward the photon limit); artifact-prone number: the basin's *location* (partner-channel metric, no brake/radiation costs, coordinate-descent noise). The cap azimuth swings through exact alignment ($\theta_O=360°$) near the basin and becomes a *lead* at high $u$; the dish angle keeps running ($+24°$ at $u=0.8$).

**Interpretation discipline (preferred-frame accounting).** A finite preferred $u$ in the void frame is a preferred-frame statement: taken alone it would predict matter self-accelerating to $u^\*$, which observed matter kinematics forbids. Two in-model reconciliations are already on the table: (i) the $L^*(u)$ toll — reaching the basin requires transacting inventory (clicks/emission), so the tilt is gated, not free; and (ii) the missing **sea**: this evaluator is an empty-void calculation, and in a populated Noether sea the relevant drift is relative to the local sea state, whose drag/dressing reshapes the landscape (the observed near-rest of matter in the local sea frame would then be the dressed optimum). Both are open burdens, stated, not resolved. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new validator or schema.

Next closure goal: native retained-history confirmation of the spindle rest state (the gated acceptance step) — and, on the evaluator track, the sea-dressed drift question: whether adding a minimal sea environment moves the basin to $u=0$ relative to the sea (the dressed-inertia reconciliation).

---

## 27. Sea-Dressed Drift, First Pass: Sparse Static Sea Is Negligible (2026-07-08)

The Section 26 reconciliation question, minimal form: does a sea environment move the drift basin to rest-relative-to-sea? Evaluator extended with a toy static sea (six aligned dipole pairs at the SH-0-sea named spacing $R_{\mathrm{sea}}=4.25$, static in the void frame so sea-rest $=u{=}0$; environment sources only). **Result: negligible** — the closure curve shifts uniformly by $\lesssim7\times10^{-4}$ at every drift; the landscape shape is untouched. A sparse static neutral-dipole shell at this spacing cannot dress the braid's kinematics (near-cancelling dipoles at $1/r^2$ over $r\approx4$–$6$). The reconciliation burden therefore sharpens: either a denser/closer sea, a *dynamically responsive* sea (orientational polarization, which the 2026-07-07 work showed is the sea's live channel), or — the leading candidate — the $L^*(u)$ transaction toll as the primary anchor, with sea drag secondary. Fail-closed; toy-sea caveat explicit (6 dipoles, not FCC-12, not self-consistent).

Next closure goal: the native retained-history confirmation run (handoff packet [spindle-braid-native-confirmation-handoff.md](spindle-braid-native-confirmation-handoff.md), operator thread); evaluator track continues with the MM-analog perpendicular-drift computation (brainstorm entry 10) and the two-party $h$-transaction study (entry 12) as the queued follow-ons.

---

## 28. MM-Analog First Pass: Orientation Anisotropy, Alignment Torque, and the u^1.5 Puzzle (2026-07-09)

The Michelson-Morley-analog question (brainstorm entry 10): does the drifting spindle braid's closure depend on drift orientation relative to the spin axis? Evaluator extended with `residualsPerp` (perpendicular drift breaks the screw symmetry — no one-parameter worldtube invariance — so residuals are cycle-sampled); tests 7 passing.

**Result 1 — a kinematic anisotropy exists at the budget level.** Perpendicular drift adds linearly to the tangential speed once per cycle: the all-cycle sub-field budget is $c\le c_f-u$ (linear), versus the parallel Pythagorean $c\le\sqrt{c_f^2-u^2}$. Running perpendicular at the parallel-pinned cadence carries the middle binary across $c_f$ twice per cycle — the escapement actively clicking — so the perpendicular state is not a quieter version of the parallel state but a different regime (transaction-active).

**Result 2 — measured closure anisotropy, and the alignment torque.** At matched pinned cadence: $f_\perp-f_\parallel = 0.0091/0.0256/0.0747$ at $u=0.05/0.1/0.2$ (perpendicular 16–25% worse at relativistic drift). Closure prefers axis-parallel motion — combined with the preferred-leader result, the spindle braid wants to fly axis-first, electrino cap forward: an **orientation torque** under drift (rifle-bullet flavor). This torque is itself a candidate mechanism for isotropy recovery in bulk matter (braids reorient rather than leak anisotropy), and equally a constraint: whatever fixes real matter's spin orientations must not expose the anisotropy.

**Result 3 — the scaling puzzle.** The gap scales as $\sim u^{1.5}$ across $[0.05,0.2]$ ($2.8$–$2.9\times$ per doubling) — super-linear but not cleanly quadratic. A residual first-order component would be the preferred-frame leakage risk (Hughes-Drever/matter-sector isotropy rows), so the small-$u$ law needs finer resolution, regulator checks, and separation of the parallel *gain* (preferred-direction tilt) from the perpendicular *loss* before any observable-facing claim. Naive extrapolation to lab velocities ($\beta\sim10^{-3}$): gap $\sim3\times10^{-5}$ relative in closure units, with the map from closure anisotropy to clock/ruler observables entirely open. Fail-closed; the anisotropy number is a property of the prescribed rigid family, not of dressed matter.

Next closure goal: resolve the small-$u$ scaling law (finer $u$ grid, regulator sweep, parallel-gain/perpendicular-loss decomposition), then the $h_{\mathrm{act}}(u)$ invariance computation (brainstorm entry 16); the native confirmation run proceeds in the operator's parallel thread.

---

## 29. The u^1.5 Resolved: A Linear-Quadratic Crossover, Not an Exponent (2026-07-09)

Instrument: `scripts/braid-ideal/spindle-drift-anisotropy-scaling-scan.mjs` (+ 4 tests). Protocol held fixed from Section 28 (all readouts at pinned cadence $c=\sqrt{1-u^2}$), grid refined to $u\in\{0.0125,0.025,0.05,0.075,0.1,0.15,0.2\}$, rest baseline at matched cadence subtracted, regulator sweep soft $\in\{0.01,0.02,0.04\}$, cycle-sampling sweep $N_t\in\{8,16\}$.

**The decomposition dissolves the puzzle.** The Section 28 gap splits into two components with *different, clean* small-$u$ laws:

| channel | small-$u$ law | coefficient stability |
|---|---|---|
| perpendicular loss $f_\perp - f_{\mathrm{rest}}$ | $+2.01\,u^2$ | $2.006\to1.93$ over $u=0.0125\to0.1$ (pure quadratic) |
| helicity-**averaged** parallel cost $\tfrac{1}{2}(f_{+u}+f_{-u})-f_{\mathrm{rest}}$ | $+0.422\,u^2$ | $0.4219\to0.4204$ over the *entire* grid (strikingly clean) |
| leader-**selected** parallel gain $f_\parallel - f_{\mathrm{rest}}$ | $-0.102\,|u| + 0.39\,u^2$ | the only first-order term |

So the composite gap is $f_\perp - f_\parallel = 0.102\,|u| + 1.61\,u^2 + O(u^3)$ (predicts $0.00153$ at $u=0.0125$; measured $0.00153$). The crossover between the linear and quadratic terms sits at $u_\times = 0.102/1.61 \approx 0.063$ — dead center of the Section 28 coarse grid $[0.05,0.2]$, which is exactly why a single power-law fit returned the fake exponent $1.5$.

**Where the first-order term lives, and why it is not MM leakage.** The linear piece exists *only* in the leader-selected channel: $f(+u)\ne f(-u)$ is the helicity-polarity lock (Section 24), odd under drift reversal at fixed braid chirality, and $\min_\pm$ converts an odd term into $-|a u|$. It is **spin-coupled, not orientation-coupled**: any helicity-averaged (unpolarized) comparison — which is what an MM-type orientation experiment performs — is purely second order, $\Delta f_{\mathrm{avg}} = (2.01-0.42)\,u^2 = 1.59\,u^2$. The MM-analog statement is therefore: *orientation anisotropy is second-order in $u$ with no first-order component*, structurally parallel to the real MM null being second order in $v/c$. The residual exposure is Hughes-Drever-class (spin-anisotropy), not MM-class: a chiral braid whose helicity locks to its drift carries a first-order closure difference $0.102|u|$, and mapping that to laboratory spin-anisotropy bounds requires the closure-to-energy map, which remains open (flagged, not claimed).

**Artifact checks.** Regulator: gaps move by $\lesssim2\times10^{-5}$ across soft $=0.01\to0.04$. Sampling: $N_t=8\to16$ moves gaps by $\lesssim10^{-8}$. The exponents are physical properties of the prescribed family, not regulator or sampling artifacts. Large-$u$ corrections are ordinary (quadratic coefficients soften: $2.01\to1.73$, $0.102$-linear bends over by $u\approx0.2$).

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`; prescribed rigid family, not dressed matter; no observable-facing claim without the closure-to-energy map.

Next closure goal: the $h_{\mathrm{act}}(u)$ invariance computation (brainstorm entry 16) — action transacted per hinge click on the drifting spindle at pinned cadence; tests whether $h$ is topological bookkeeping (u-invariant) or runs.

---

## 30. Spindle Braid Native Retained-History Confirmation Run: Certificate Rejected; The Rest State Disperses; The Pin Is a Speed Attractor (2026-07-09)

Executing the [handoff packet](spindle-braid-native-confirmation-handoff.md) (queue item 4, `native_retained_history_promotion`) in the operator thread. Owner script [spindle-braid-native-retained-history-confirmation-run.mjs](../../../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs) (tests [braid-ideal-spindle-braid-native-retained-history-confirmation-run.test.js](../../../tests/braid-ideal-spindle-braid-native-retained-history-confirmation-run.test.js), 4 passing). Method: the six tabled worldlines are seeded as exact moving-circular histories in the production runtime's own source model (held phase), then released at $t=0$; every causal root and every $D_s$/$D_T$/$W^{\mathrm{rec}}$/signed-$m$ row is solved and read from the production `AbsoluteHistoryRootRuntime.solveMovingCircularSourceCausalRoots` surface, consumed read-only (no new solver, no schema change). Post-release retained history is presented to the production solver through its own declared approximation policy (`linearized-moving-circular-source-segments`: zero-radius moving-circular segment sources); local sampling of the retained record only brackets candidate segments. Declared regulators: $\kappa=\kappa^\*$ seed-fitted and frozen ($0.31511$), soft $=0.02$, coincidence stratum $\rho_c=0.01$ (inside the Section 12 pin-stability bound), $d_{\min}=10^{-4}<\rho_c$ (a first smoke run showed $d_{\min}\ge\rho_c$ silently skips the same-source click booking — the stratum-scale roots live at delays of order $\rho_c$), $\Delta t=0.0025$, memory window 3 rotations.

**Validation anchor.** The native seed record reproduces the Section 22 prescribed-worldline champion to four digits: global residual $0.47212$ vs $0.47209$, $\kappa^\*=0.31511$ vs $0.31504$, per-site rows matching — the two evaluation stacks agree on the same physics at the shared record.

**Certificate rows (same-record, all produced; report at `.tmp/braid-ideal/spindle-braid-native-confirmation/report.json`).** Active causal-root ledger: 32 roots (30 directed cross pairs + 2 middle same-source) at each record time with per-root $D_s$, $D_T$, $W^{\mathrm{rec}}$, signed $m$; $\nu_J=\min D_s=+0.2199$ (0.25 rot) and $+0.3235$ (0.5 rot), positive, no fold-flagged rows at record times; $W^{\mathrm{rec}}\in[0.070,1.243]$ / $[0.0035,1.756]$ (co-equal floors reported). Inactive-root gaps: the four sub-field same-source channels (I$\pm$, O$\pm$), correctly closed, scan gaps logged. Finite memory: max active root delay $3.35\ll18.85$. Same-source policy declared: production cross-pair surface on the site's own retained history; parity note — fold pairs book as $+1$ because the near branch sits inside $d_{\min}$ at birth. $h_{\mathrm{act}}$ click ledger: $+1$ same-source root per middle site at $t=0$ — **the poised clicker opens exactly at release**, the packet's property (ii) confirmed natively — and $+1$ per cap at $t=4.80$ (the caps crossing field speed in the terminal runaway). Stability row: a $10^{-3}$ tangential kick on M$+$ first contracts to $\sim2\times10^{-4}$ (the pin damping tangential perturbations), then grows to $1.2\times10^{-2}$ riding the dispersal — no return basin for the dispersing base trajectory.

**The three decisive questions.** (1) *Shape:* **no** — tube residence (declared $0.1R_M$) is lost at $t\approx0.83$ ($\sim$0.13 rotation); the middle spirals outward $1.0\to4.3$, the inner sweeps $0.50\to0.37\to1.3$, the caps fall inward $1.65\to0.75$ and eject (first blocker `shape_loss_radial_under_support`; halt at $t=4.80$ on cap speed runaway, downstream). The cap fall-in is the Section 21 no-levitation result appearing natively. (2) *Rail:* **qualified yes — the field-speed pin is real, as a speed attractor, not an orbit pin.** The pump lifts $\beta_M$ above the rail immediately (pump-below confirmed); with the self-hit root open the climb turns at $\beta_M=1.083$ ($t\approx1.0$) and decays back toward the rail from above ($1.019$ at halt) — the first NATIVE evidence of the pump-plus-pin mechanism on a released worldline. At the declared regulators the brake is sub-marginal ($\varrho<1$ regime: no re-crossing, no click chatter) and radius is unconfined: the middle rides the rail outward. (3) *Tangential closure:* at the seed record yes (native rows match the prescribed pattern: I $-0.248$ braked, M $+0.360$ pumped, O $\approx0$ free); dynamically no — net torque $+0.48$, the transfer is not sustained, and the middle's tangential row decays to zero as it detaches.

**Findings (not fixes).** The early inner-radius drift sweeps through the refined-variant $q_I\approx0.47$ ($t\approx1.35$) without settling — the Section 23 saddle-descent direction appears in the native flow. Radial support ratios at the seed are $0.90/0.76/0.53$ (all $<1$): at the unified-closure $\kappa^\*$ the braid is under-bound everywhere, and the release converts the $0.472$ residual into secular dispersal — the Section 16 support-mismatch diagnosis, confirmed dynamically. Regulator rows: halving $\Delta t$ shifts the trajectory $\le6\times10^{-4}$ (integrator-converged); $\rho_c$ $0.01\to0.02$ indistinguishable; hardening soft $0.02\to0.005$ produces immediate caustic ejection (the known pointwise-booking artifact), confirming the Section 3.1 chart-clean integrated click booking as the open path for the brake magnitude.

**Operator decision (same thread, 2026-07-09): REJECTED**, per the run recommendation — first blocker `shape_loss_radial_under_support`. The tabled spindle-braid rest state is not a self-supporting equilibrium of the native retained-history dynamics at the declared regulators (the Section 16 support-ratio diagnosis, confirmed dynamically). The candidate row is consumed; the gate stays fail-closed (`retainedBranchClaim=false`, `scoreMovement=no_score_increase`) and the archive call on superseded configuration families does NOT ripen. Durable positive findings retained at priority level: the native speed pin, the native cap fall-in, the native saddle-drift direction, the poised-clicker opening, and the accepted-quality run machinery (owner script + tests), which future candidate rows can reuse as-is.

Next closure goal: produce a candidate row that can survive release — the chart-clean integrated click booking (Section 3.1) for the brake magnitude, and a sea-confined or non-circular same-level release on the same run machinery — without touching the tabled-seed discipline.

---

## 31. h_act(u) First Pass: The Stored Ledger Dilates, the Transacted Ledger Runs Quadratically — and h-Constancy Becomes a Selection Constraint (2026-07-09)

Instrument: `scripts/braid-ideal/spindle-braid-click-action-invariance-evaluator.mjs` (+ 4 tests). Brainstorm entry 16's dynamical half, first-pass protocol: frozen champion geometry, pinned cadence $c=\sqrt{1-u^2}$, click $=$ one hinge (rotation) period $T=2\pi/\omega$ (prescribed-family stand-in for the native self-hit click ledger, which the native-confirmation thread owns). Three action-dimension candidates per click, with $\kappa^*(u)$ as the wake$\to$kinematic bridge.

**Result 1 — the stored ledger dilates exactly.** $S_{\mathrm{kin}}$/click $= 2\pi\omega\sum_a (R_a\cos\alpha_a)^2 \propto \omega = \omega_0/\gamma$: at frozen geometry the stored internal action per click is $1/\gamma$ *identically* (pinned-cadence restatement of time dilation; asserted to $10^{-9}$ in tests). If inertia per site were $\gamma m_0$ rather than $m_0$, this candidate would be exactly invariant — the familiar relativistic-mass bookkeeping appears here as the *condition* for stored-action invariance, not as an assumption.

**Result 2 — the transacted ledger has the same helicity/orientation split as Section 29.** The wake angular impulse per click $J_z = T\,\kappa^*\sum_a [\mathbf r_a\times \mathbf a_a]_z$ decomposes cleanly: $J_z(u)/J_z(0) = 1 \pm 0.236\,|u| - 1.28\,u^2$ — a helicity-odd LINEAR term (coefficient stable $0.236\to0.224$ over $u=0.05\to0.3$; preferred leader transacts *more* per click) and a helicity-even QUADRATIC run-down (coefficient $1.27\to1.31$; $\approx2.6\times$ steeper than $1/\gamma$'s rate $0.5$). Regulator-independent ($\lesssim10^{-5}$ across soft $=0.01\to0.04$). So at frozen geometry the per-click transaction is NOT invariant — it runs at $O(u^2)$ helicity-averaged, $O(|u|)$ helicity-locked.

**Result 3 — the pump-work channel reverses.** The pump-work action $S_E = \kappa^* (\sum_a \mathbf a_a\cdot\mathbf v_a)\,T^2$ collapses monotonically and crosses zero near $u\approx0.5$ (clearly negative by $0.6$): the frozen rest geometry is so far off the moving family by mid-drift that the wake channel does net negative work. Frozen-geometry candidates are meaningless beyond $u\approx0.3$; all quantitative claims above are small-$u$.

**Result 4 — the re-optimized readout is instrument-limited.** On the pass-2 re-optimized geometries ($q_O$ moves $1.65\to1.33/1.41$), $J_z$ jumps to $1.07$ at $u=0.2$ and $0.81$ at $0.4$: coordinate-descent wander in the saddle landscape (Section 23) changes the braid's intrinsic angular-momentum scale, mixing "which family member" into "does the transaction run." Resolving $h_{\mathrm{act}}$ on the *moving family* needs the systematic minimizer (item 20 remainder) or the native ledger.

**The reframe (new, discovery-grade if it closes).** The frozen-geometry run-down inverts into a *constraint*: since $J_z$ depends on geometry and there exist nearby geometries with $J_z$ ratio above and below 1 at the same $u$ (frozen $0.995$, pass-2 $1.074$ at $u=0.2$), a **$J_z$-conserving trajectory** $u\mapsto \mathrm{geo}(u)$ exists in configuration space. If the closure-optimal trajectory and the $J_z$-conserving trajectory *coincide* (within instrument grade), then Planck-constant constancy is not an extra postulate — the braid holds its per-click transaction fixed *because* that is where closure is best, and $h$-constancy is derived from the same principle as everything else. If they diverge, observed $h$-constancy becomes a selection constraint on which family members are dressed into matter. Named computation, queued (priorities item 23).

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`; prescribed family, not dressed matter; the click here is the cadence period, not yet the native self-hit ledger.

Cross-note (same day): the native confirmation run (Section 30, operator thread) REJECTED the tabled rest-state candidate — the champion is under-bound at $\kappa^*$ and disperses on release. Sections 29 and 31 are therefore properties of the prescribed rigid family, not of a native equilibrium; their fail-closed framing already says so, and their *methods* (decomposition, artifact sweeps, the two-ledger split, the $J_z$-conserving-trajectory reframe) carry over unchanged to whatever candidate row survives release. The item-23 comparison should be run on the next surviving family, not tuned further on this one.

Next closure goal: operator's choice — (a) attack the survivability blocker directly (Section 30's named path: chart-clean integrated click booking for the brake magnitude, then a sea-confined or non-circular same-level release on the reusable run machinery), or (b) the $J_z$-conserving vs closure-optimal trajectory comparison (item 23, needs the item-20 systematic minimizer), on hold until a surviving candidate exists.

---

## 32. Chart-Clean Click Booking on the Native Run: The Coincidence Push Rules the Poised Clicker; A Two-Sided Escapement Appears at Moderate Stratum; Shape Loss Is Stratum-Robust (2026-07-09)

Executing the Section 30 closure goal (chart-clean integrated click booking, the Section 3.1/3.3 contract) on the native run machinery. Owner script extended in place ([spindle-braid-native-retained-history-confirmation-run.mjs](../../../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs), `--chart` mode; tests 4 passing). Booking: wherever a same-source row is fold-flagged ($|D_s|<$ soft) or the site's total speed crosses the rail within a step, the same-source channel is substep-integrated with the production row's **unsoftened** signed branch orientation $m=D_T/D_s$ treated as a density-of-states integral (Section 3.3), with the declared $d_0$ stratum in the force denominator ($r^2+\rho_c^2$) and the accepted brake-measurement window convention ($d_{\min}^{\mathrm{window}}=0.002$); cross-pair channels keep the canonical soft-regularized $m_{\mathrm{reg}}$. Click rows carry the Section 3.1 shape (crossing time, chart impulse vector, fold chord, unfolding window $\mu$, fold-curvature fit, integer root counts, substep-convergence witness; $\chi$ convention: single resolved branch). Anchor: the accepted stratum-sweep machinery ([self-hit-brake-central-measurement.mjs](../../../scripts/braid-ideal/self-hit-brake-central-measurement.mjs)) reproduces absorbed fraction $2.6884$ at $\rho_c=0.01$ on the same integrand form.

**Result 1 — at the declared-$d_0$-scale stratum ($\rho_c=0.01$), the quasi-static repulsive coincidence push rules the poised clicker.** At release the middle's same-source root opens at the rail with the held (constant-$\omega$) history reflection-locking $m\approx+1$; the near-birth root at chord $\sim\rho_c$ books a violent **repulsive** tangential kick ($+0.18$ in $\beta$ within one step, $\sim650\times$ the per-step pump) — the Section 10/16 "coincidence-dominated, like-polarity repulsive, $\approx50\times$ pump, NOT load-bearing" object, now seen natively and seen to be *actively destructive*: it ejects the clicker through the rail, the subsequent absorptive clicks over-brake it to $\beta_M\approx0.78$, and the geometry scrambles far faster than in the Section 30 pointwise run. The absorptive sign appears only on fast crossings (receiver outrunning its emission); slow crossings are repulsive — the sign structure is $\dot\beta$-gated, natively measured.

**Result 2 — at moderate stratum ($\rho_c=0.05$) the native two-sided escapement appears.** No initial kick (the push is capped at $1/\rho_c^2$); after one over-absorbed transient the middle **hunts just below the rail** ($\beta_M\approx0.97$–$0.995$ early, settling $\approx0.92$) through $\sim10^3$ two-sided crossing transactions — the Section 12 prediction that a strong brake pins marginally *below* the edge, realized on released native worldlines for the first time. Tube residence also improves early (deviation $0.13$ at $t=1.0$ vs $0.154$ pointwise), though not enough to survive.

**Result 3 — shape loss is stratum-robust; the reject disposition is regulator-complete.** All three bookings — pointwise soft-regularized (Section 30), chart at $\rho_c=0.01$, chart at $\rho_c=0.05$ — end in dispersal driven by the same radial-support deficit (halts: cap ejection at $t=7.6$; middle radius runaway at $t=14.2$). The tangential rail mechanism, however booked, cannot confine radius. The Section 30 first blocker `shape_loss_radial_under_support` stands under every declared regulator setting.

**Honesty rows.** The first-click witness shows substep spread $0.13$ (32 vs 64 substeps) on the violent kick — the fast transient is not fully converged and its magnitude is stratum-dominated in any case; later clicks book smaller and cleaner. The $\chi$ orientation projection is booked at the single-resolved-branch convention (the second fold branch sits inside the window floor at birth). The stratum dependence of the near-rail regime (destructive push vs escapement) is exactly the open declared-$d_0$ magnitude question ([particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md)); this run measures the regimes, it cannot pick $d_0$.

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`; the Section 30 operator rejection of the candidate row stands, now with regulator-complete evidence. Surviving candidate-row routes: sea-confined release and non-circular same-level release on the same machinery; the $d_0$ ontology decision gates the near-rail regime.

Next closure goal: a sea-confined native release (minimal confining environment on the same run machinery) to test whether external radial support plus the native escapement yields tube residence — the first candidate row that could survive release.

---

## 32. The Brake Attack, Evaluator Track: Vector Click Booking, the Phase-Sensitive Valve, and Why the Steady Rail-Rider Disperses (2026-07-09)

Instrument: `scripts/braid-ideal/spindle-rail-click-booking-vector-evaluator.mjs` (+ 4 tests). Responds to the Section 30 rejection's two named same-source gaps: the under-booked brake (near fold branch inside $d_{\min}$ books the pair as $+1$) and the missing radial confinement. Extends the Section 2.2 chart booking from the tangential projection to the FULL VECTOR — exact signed $m=D_T/D_s$, all live branches, no min-delay gate, coincidence cut as the only (declared, physical) regulator — on prescribed planar rotating channels ($\rho=1$, $\kappa=c_f=1$).

**Result 1 — the click impulse is absorptive AND inward.** Across the field-speed crossing on a pump-scale ramp: impulse $(\Delta p_{\mathrm{tan}},\Delta p_{\mathrm{rad}}) = (-98.8, -0.83)$ at cut $0.005$ ($(-45.4,-0.64)$ at the native run's $\rho_c=0.01$). nstep-converged to $0.07\%$; both signs stable across cuts $0.02\to0.0025$ while magnitudes grow as the cut shrinks (tangential $\sim$ doubling per cut halving, radial $\sim$ logarithmic) — the stratum-set magnitude of Section 2.3, with the signs regulator-free. Each hinge click both brakes and pulls INWARD.

**Result 2 — the sustained supra-rail channel is a phase-sensitive valve.** The persistent same-source root's signed booking on rail-riding worldlines, mapped over $(\beta,\dot\beta)$:

| regime | $m$ | force direction | reading |
|---|---|---|---|
| $\dot\beta=0$ (steady rider) | $+1$ EXACTLY (to $10^{-15}$; reflection symmetry) | outward $+$ forward | steady self-channel is a PUMP — anti-confining |
| $\dot\beta<0$ (decaying rider) | $>1$ (up to $2.27$ at $\beta=1.005$, $\dot\beta=-0.1$) | outward $+$ forward, boosted | decay is opposed; rider pushed out |
| $\dot\beta>0$ (driven rider) | falls, then $<0$ ($-0.74$ at $\beta=1.005$, $\dot\beta=+0.1$) | INWARD $+$ brake, huge ($-86$ tangential) | confinement exists only while actively pumped |

The asymmetry is large because the accelerating rider catches its own recent wake at close range (root delay $0.093$ vs $1.115$ for the mirror decay case). The valve opposes $\dot\beta$ in both directions — derivative feedback — with the radial sign following, superposed on a static outward-pump bias at $\dot\beta=0$.

**Result 3 — the native dispersal, explained mechanistically.** The Section 30 middle binary overshot to $\beta_M=1.083$ and then decayed slowly toward the rail while spiraling OUT. On this map that trajectory sits in the $\dot\beta\le0$ rows: $m\ge1$, outward $+$ forward — the steady/decaying rail-rider's own wake pushes it out. Radial confinement CANNOT come from the quasi-steady self-channel; it is only available in the click-rich, actively-driven regime. The physical middle state consistent with confinement is therefore not a steady supra-rail circle but a rail-STRADDLING limit cycle — the poised clicker, chattering through $c_f$, booking absorptive+inward click impulses each crossing. The operator's original "the middle rides the rail and is the clicker" intuition survives as: the middle must CLICK, not ride.

**Result 4 — the amortized budget yields a sharp candidate-row design constraint.** At the native regulators (cut $0.01$): the middle's radial deficit per rotation ($0.24\times2\pi\beta\approx1.5$) needs $\approx2.4$ clicks/rotation at $-0.64$ radial each, but the tangential budget (pump $18.1$/rotation vs $-45.4$/click) saturates at $\approx0.4$ clicks/rotation — a click channel with the ramp geometry's tangential:radial ratio ($\approx70$) CANNOT balance both ledgers. Budget consistency requires that ratio $\lesssim12$: the self-hit ray must be re-angled toward radial-dominant clicks, which a circular worldline cannot do but a NON-CIRCULAR same-level motion (radial breathing superposed on rotation — an epicyclic clicker) naturally does. This puts a number on the Section 30 run's named route ("non-circular same-level release"): the next candidate row should give the middle a radial oscillation whose self-hit geometry delivers per-click tangential:radial $\lesssim12$, with the caps' deficits ($0.90/0.53$, sub-field, no self-channel) still owed to sea confinement or geometry change.

Caveats: prescribed constant-$\dot\beta$ histories (quasi-static approximation, not self-consistent chatter); planar single-site channel (no partner interference in the same rows); $\kappa=1$ schematic units. Named next instrument: the reduced self-consistent chatter integrator (true retained history, $\beta$ and radial DOF) to find the limit cycle and its click recurrence $N_{\mathrm{click}}$, feeding the epicyclic candidate row. Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`.

Next closure goal: build the reduced chatter integrator, measure the limit cycle's click recurrence and net (radial, tangential) budget, and if the budgets close, shape the epicyclic (breathing-middle) candidate row for the reusable native run machinery.

---

## 33. Reduced Chatter Integrator, First Pass: The Clicker Exists, Is Deterministic and Self-Timed — and the Pointwise Artifact Bites Its Own Instrument (2026-07-09)

Instrument: `scripts/braid-ideal/spindle-rail-chatter-limit-cycle-integrator.mjs` (+ 3 tests). Queue item 24, first pass: one planar site with a TRUE retained history (self-roots solved on its own stored worldline, exact signed $m$, declared stratum $d_0$ the only regulator), driven by a modeled partner channel (certified pump $c_1\beta\kappa/r^2$; partner radial support fraction $s$ of centripetal need).

**Result 1 — the relaxation oscillation exists and needs no external tipping.** From a sub-rail seed the pump drives the site up through $c_f$ deterministically; the self-channel (nonexistent below the rail — the wake outruns the site) switches on at the crossing and knocks the site back down; the cycle repeats as a self-timed sawtooth. At the reference parameters: $\beta$ swings over roughly $[0.2,1.0]$, clicking at $\sim1$ per time unit ($\sim$several clicks per rotation), every click booked at an up-crossing. This is a **relaxation oscillator** (dripping-faucet / stick-slip class): the "tipping" over the rail is metronomic and pump-driven, not rare and not noise-seeded. External wakes would *phase-advance or retard* a click rather than cause it — the analog $h/2$-tipping channel (brainstorm entry on analog tipping) rides on top of an intrinsic clock. Null test: with the pump off, a sub-rail site stays clickless and circular indefinitely.

**Result 2 — circular-chatter radial confinement is real but small (provisional).** Bracketing runs at $s=0.76$ (native middle deficit) vs $s=1.0$: radius walks out at $0.76$ and creeps in at $1.0$, placing the click channel's net radial supply near $s^*\approx0.97$ — i.e. circular-geometry chatter makes up only $\sim3\%$ of centripetal need, not the missing $24\%$. This independently confirms the Section 32 budget verdict (tangential:radial $\approx70$, needed $\lesssim12$): the epicyclic re-angling is the lever, deeper strata are not (radial impulse grows only logarithmically in $d_0$).

**Result 3 — the convergence failure is the old enemy, and it names the fix.** The dt-halving witness FAILS (trajectories diverge qualitatively): the integrator resolves each click's $1/r_c^2$ spike pointwise, which is precisely the resolution-limited caustic pathology of Section 2.3 — the artifact now biting the instrument built to study it. Result 2's numbers are therefore provisional (Result 1's structure is dt-robust and is all the tests assert). The named redesign, second pass: **event-based chart booking** — integrate the smooth inter-click dynamics with an ordinary stepper, detect each crossing as an event, and apply the Section 2.2 chart-integrated impulse $(\Delta p_{\mathrm{rad}},\Delta p_{\mathrm{tan}})$ as a finite jump, with the sustained-channel valve force (Section 32 map) between events. That integrator is regulator-honest by construction and cheap enough for parameter sweeps and the epicyclic candidate-row search.

Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`; single-site reduced model, modeled partner channel, schematic units.

Next closure goal: the event-based chart-booked chatter integrator (second pass), then the epicyclic candidate-row search on it.
