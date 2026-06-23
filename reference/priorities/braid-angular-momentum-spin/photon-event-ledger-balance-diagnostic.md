# Photon Event Ledger Balance Diagnostic

Status. Priority diagnostic for `photon_planar_pair_transverse_ledger`, downstream of [planar-pair-symbolic-substrate-instance.md](planar-pair-symbolic-substrate-instance.md) and [photon-planar-pair-ledger-substrate-packet.md](photon-planar-pair-ledger-substrate-packet.md). This file isolates the source, recoil, wake, and handoff residuals that must be populated before declared symbolic planar-pair rows can become a physical Gate B candidate. It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Defer with blocker. The symbolic substrate instance declares static cancellation, transverse survival, bridge state, helicity, and no free longitudinal support. This diagnostic accepts those rows only as a declared substrate target until one retained emission event supplies the event-balance terms below from the native ledger.

Promotion decision. Do not promote. A physical Gate B candidate requires a populated source event, local recoil ledger, retained wake-history angular-momentum ledger, and analyzer handoff record. Until those four pieces close in one event window, the planar-pair rows remain priority-only and blocked.

## Event Window And Inputs

Fix a candidate photon event window

$$
W_{\gamma}^{0}
=
[t_0^-,t_0^+]
$$

with propagation axis $\hat{\mathbf e}$ and symbolic helicity sign

$$
\lambda_{\mathrm{hel}}\in\{+1,-1\}.
$$

The declared photon-side substrate ledger is inherited from the symbolic instance:

$$
\mathbf J_{\gamma}^{\mathrm{sub}}
=
\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e},
\qquad
\mathbf a_{\perp}^{\mathrm{sub}}
=
A_\gamma
\left(
\hat{\mathbf u}
+
i\lambda_{\mathrm{hel}}\hat{\mathbf v}
\right),
\qquad
A_\gamma>\varepsilon_{\mathrm{amp}}.
$$

This diagnostic does not reprove those rows. It asks whether the declared photon ledger can be embedded in one physical event ledger with source depletion, material/Noether sea recoil, retained wake angular momentum, and downstream analyzer handoff.

The event record must supply

$$
\mathfrak E_{\gamma}^{0}
=
\left(
\mathbf J_{\mathrm{src}}^-,
\mathbf J_{\mathrm{src}}^+,
\mathbf J_{\gamma}^{\mathrm{sub}},
\mathbf J_{\mathrm{recoil}}^{0},
\mathbf J_{\mathrm{wake}}^{0},
\mathbf J_{\mathrm{handoff}}^{0},
\mathcal W_\gamma,
\mathcal H_\gamma
\right).
$$

Here $\mathbf J_{\mathrm{src}}^-$ and $\mathbf J_{\mathrm{src}}^+$ are the source angular-momentum ledgers before and after the event, $\mathbf J_{\mathrm{recoil}}^{0}$ is the local material or Noether sea recoil ledger, $\mathbf J_{\mathrm{wake}}^{0}$ is the retained causal-wake angular-momentum contribution across $W_{\gamma}^{0}$, $\mathbf J_{\mathrm{handoff}}^{0}$ is any angular momentum still carried by the outgoing handoff interface rather than by the free photon branch, $\mathcal W_\gamma$ is the retained wake-history record, and $\mathcal H_\gamma$ is the analyzer handoff record.

## Event-Balance Equation

Define the source-side angular-momentum change

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+.
$$

The physical event-balance equation required by the diagnostic is

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\gamma}^{\mathrm{sub}}
+
\mathbf J_{\mathrm{recoil}}^{0}
+
\mathbf J_{\mathrm{wake}}^{0}
+
\mathbf J_{\mathrm{handoff}}^{0}.
$$

Equivalently, the raw balance defect is

$$
\mathbf B_{\gamma}^{0}
=
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}.
$$

The event-balance residual is

$$
\Delta_{\mathrm{bal}}^\gamma
=
\frac{
\left\|
\mathbf B_{\gamma}^{0}
\right\|
}{
1+
\left\|
\Delta\mathbf J_{\mathrm{src}}^{0}
\right\|
}.
$$

The symbolic instance may make $\mathbf B_{\gamma}^{0}=\mathbf 0$ by declaration. A physical Gate B candidate may not. It must provide the source depletion, recoil, wake, and handoff terms as retained ledger rows from the same event window.

## Isolated Residual Rows

The source residual checks that the photon ledger is not created without a depleted source ledger:

$$
\Delta_{\mathrm{src}}^\gamma
=
\mathbf 1_{\mathbf J_{\mathrm{src}}^-\text{ unavailable}}
+
\mathbf 1_{\mathbf J_{\mathrm{src}}^+\text{ unavailable}}
+
\mathbf 1_{\Delta\mathbf J_{\mathrm{src}}^{0}\text{ not derived from }W_{\gamma}^{0}}.
$$

The recoil residual checks that non-photon angular momentum is routed locally rather than hidden inside the declared photon helicity:

$$
\Delta_{\mathrm{recoil}}^\gamma
=
\mathbf 1_{\mathbf J_{\mathrm{recoil}}^{0}\text{ unavailable}}
+
\frac{
\left\|
P_{\perp}\mathbf J_{\mathrm{recoil}}^{0}
\right\|_{\mathrm{unrouted}}
}{
\hbar+\varepsilon_J
}.
$$

The wake residual checks that the causal-wake angular momentum is retained and not silently dropped:

$$
\Delta_{\mathrm{wake}}^\gamma
=
\mathbf 1_{\mathcal W_\gamma\text{ unavailable}}
+
\mathbf 1_{\mathbf J_{\mathrm{wake}}^{0}\text{ unavailable}}
+
\frac{
\left\|
\mathbf J_{\mathrm{wake}}^{0}
-
\operatorname{Pull}_{W_{\gamma}^{0}}(\mathcal W_\gamma)
\right\|
}{
\hbar+\varepsilon_J
}.
$$

The handoff residual checks that the outgoing branch supplies the exact objects consumed by analyzer and no-signaling packets:

$$
\Delta_{\mathrm{handoff}}^\gamma
=
\mathbf 1_{\mathbf a_{\perp}^{\mathrm{sub}}\text{ unavailable}}
+
\mathbf 1_{\mathbf J_{\gamma}^{\mathrm{sub}}\text{ unavailable}}
+
\mathbf 1_{\mathcal W_\gamma\text{ unavailable}}
+
\mathbf 1_{\mathcal H_\gamma\text{ unavailable}}
+
\mathbf 1_{\mathcal H_\gamma\text{ not tied to }W_{\gamma}^{0}}.
$$

These rows are evaluated in addition to the substrate rows from [photon-planar-pair-ledger-substrate-packet.md](photon-planar-pair-ledger-substrate-packet.md):

$$
\Delta_A,\quad
\Delta_Q^\gamma,\quad
\Delta_{\mathrm{surv}}^\gamma,\quad
\Delta_{\parallel}^{\mathrm{sub}},\quad
\Delta_{\mathrm{hel}}^\gamma,\quad
\Delta_{\epsilon}^{\gamma}.
$$

## Diagnostic Residual Vector

The event-ledger diagnostic residual vector is

$$
\mathcal R_{\gamma B}^{\mathrm{event}}
=
\left(
\Delta_A,
\Delta_Q^\gamma,
\Delta_{\mathrm{surv}}^\gamma,
\Delta_{\parallel}^{\mathrm{sub}},
\Delta_{\mathrm{hel}}^\gamma,
\Delta_{\epsilon}^{\gamma},
\Delta_{\mathrm{src}}^\gamma,
\Delta_{\mathrm{recoil}}^\gamma,
\Delta_{\mathrm{wake}}^\gamma,
\Delta_{\mathrm{handoff}}^\gamma,
\Delta_{\mathrm{bal}}^\gamma
\right).
$$

A declared symbolic planar-pair row may enter physical Gate B review only if every component is available and below its tolerance:

$$
\mathcal R_{\gamma B}^{\mathrm{event}}
\preceq
\left(
\varepsilon_A,
\varepsilon_Q,
0,
\varepsilon_{\parallel},
\varepsilon_{\mathrm{hel}},
\varepsilon_{\epsilon},
0,
\varepsilon_{\mathrm{recoil}},
\varepsilon_{\mathrm{wake}},
0,
\varepsilon_{\mathbf J}
\right).
$$

The zero tolerances on $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\mathrm{src}}^\gamma$, and $\Delta_{\mathrm{handoff}}^\gamma$ mean that missing branch survival, missing source data, or missing handoff data are blockers, not small numerical errors.

## Blocked / Pass / Fail Meanings

| Outcome | Meaning | Downstream use |
| --- | --- | --- |
| `event_balance_blocked` | At least one of $\mathbf J_{\mathrm{src}}^\pm$, $\mathbf J_{\mathrm{recoil}}^{0}$, $\mathbf J_{\mathrm{wake}}^{0}$, $\mathcal W_\gamma$, or $\mathcal H_\gamma$ is absent. | Keep the symbolic planar-pair rows as a priority target only. |
| `symbolic_rows_pass_event_blocked` | $\Delta_Q^\gamma$, $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\parallel}^{\mathrm{sub}}$, $\Delta_{\mathrm{hel}}^\gamma$, and $\Delta_{\epsilon}^{\gamma}$ pass by declaration, but at least one event-ledger residual is blocked. | Do not declare a physical Gate B candidate. |
| `event_balance_pass` | All substrate and event residuals are populated from the same event window and below tolerance. | The branch may be reviewed as a physical Gate B candidate and may hand off to analyzer and no-signaling packets. |
| `source_fail` | $\Delta_{\mathrm{src}}^\gamma>0$ because source depletion is missing or not derived from $W_{\gamma}^{0}$. | The photon ledger is unsourced. |
| `recoil_fail` | $\Delta_{\mathrm{recoil}}^\gamma>\varepsilon_{\mathrm{recoil}}$ or recoil is hidden in the photon helicity row. | Route the missing material or Noether sea angular momentum before Gate B review. |
| `wake_fail` | $\Delta_{\mathrm{wake}}^\gamma>\varepsilon_{\mathrm{wake}}$ or the wake pullback disagrees with $\mathbf J_{\mathrm{wake}}^{0}$. | The causal-wake ledger is not conserved over the event window. |
| `handoff_fail` | $\Delta_{\mathrm{handoff}}^\gamma>0$ after a claimed handoff. | The analyzer arithmetic remains a reduced chart rather than a substrate response. |
| `event_ledger_fail` | $\Delta_{\mathrm{bal}}^\gamma>\varepsilon_{\mathbf J}$ with all terms available. | The event violates angular-momentum balance and cannot be promoted. |

## Promotion Decision

The current promotion decision is `defer_with_blocker`. The blocker is not the bridge-state algebra; it is the absence of one retained event record $\mathfrak E_{\gamma}^{0}$ that simultaneously supplies source depletion, recoil routing, wake pullback, and handoff provenance. The next promotable artifact should be a populated branch certificate or simulation packet that evaluates $\mathcal R_{\gamma B}^{\mathrm{event}}$ without replacing missing event ledgers by declarations.
