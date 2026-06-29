# Delayed Force Lipschitz Envelope

Promotion status: `priority-only`. This packet supplies the force-regularity bounds needed by the adaptive-memory trust radius, collocation-refinement certificate, Newton/Krawczyk closure certificate, and history-force variationality row. It turns the informal claim "the delayed force is smooth on a root-regular chart" into explicit inequalities. In the arclength-inverse chart, the curve-variation constants must be computed with [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md), not with fixed construction phase.

The envelope is local to one root ledger, one memory convention, one finite-mode coefficient norm, and one source-pair policy.

---

## 1. Per-Root Force Term

For a retained delayed root

$$
a=(i,j,\lambda,\mu),
$$

write

$$
\mathbf{R}_a
=
\mathbf{Y}_i(\lambda)
-
\mathbf{Y}_j(\lambda-\eta_a),
\qquad
\widehat{\mathbf{R}}_a
=
\frac{\mathbf{R}_a}{\eta_a},
$$

and

$$
J_a
=
1-\mathbf{T}_j(\lambda-\eta_a)\cdot\widehat{\mathbf{R}}_a.
$$

The dimensionless force contribution is

$$
\mathbf{f}_a
=
\sigma_i\sigma_j\,\eta_a^{-2}W_a^{\mathrm{rec}}
\widehat{\mathbf{R}}_a.
$$

Here the same retained record must carry

$$
D_{s,a}=J_a,
\qquad
D_{t,a}
=
1-\mathbf{T}_i(\lambda)\cdot\widehat{\mathbf{R}}_a,
\qquad
W_a^{\mathrm{rec}}=\left|\frac{D_{t,a}}{D_{s,a}}\right|.
$$

$W_a^{\mathrm{rec}}$ is the receiver-normal branch strength. The
source-normal $J_a$ row below is retained only as a simple-root diagnostic for
the root chart.

Assume the root chart has floors

$$
\eta_a\ge\eta_0>0,
\qquad
|J_a|\ge J_0>0.
$$

Assume the same record also emits fixed sign labels

$$
\zeta_{s,a}=\operatorname{sign}D_{s,a},
\qquad
\zeta_{t,a}=\operatorname{sign}D_{t,a},
$$

with

$$
\zeta_{s,a}D_{s,a}\ge D_{s,0}=J_0>0,
\qquad
\zeta_{t,a}D_{t,a}\ge D_{t,0}>0.
$$

For every unit coefficient variation consumed by the certificate, the
same-record receiver-normal first-derivative row is

$$
D_vW_a^{\mathrm{rec}}
=
\frac{\zeta_{t,a}\zeta_{s,a}}{D_{s,a}^2}
\left(
D_{s,a}D_vD_{t,a}
-
D_{t,a}D_vD_{s,a}
\right).
$$

Equivalently, on this fixed $D_s,D_t$ sign stratum,

$$
D_vW_a^{\mathrm{rec}}
=
W_a^{\mathrm{rec}}
\left(
\frac{D_vD_{t,a}}{D_{t,a}}
-
\frac{D_vD_{s,a}}{D_{s,a}}
\right).
$$

If the emitted row has bounds

$$
|D_vD_{s,a}|\le E_s,
\qquad
|D_vD_{t,a}|\le E_t,
$$

then the branch-strength derivative bound used below may be rebuilt as

$$
|D_vW_a^{\mathrm{rec}}|
\le
\frac{E_t}{D_{s,0}}
+
\frac{W_0E_s}{D_{s,0}}
=
E_W,
$$

provided the same row also emits

$$
0\le W_a^{\mathrm{rec}}\le W_0,
$$

Without this same-record bundle, the first blocker is

$$
\texttt{receiver-normal-first-derivative-row-missing}.
$$

The receiver force is

$$
\widetilde{\mathbf{F}}_i
=
\sum_{a\in\mathcal{A}_i}\mathbf{f}_a.
$$

---

## 2. Root And Direction Variation

Let $v$ be a unit coefficient variation in the declared solver norm. Define coefficient envelopes

$$
C_0
\ge
\max_k\|D_v\mathbf{Y}_k\|_{C^0},
\qquad
C_1
\ge
\max_k\|D_v\mathbf{T}_k\|_{C^0}.
$$

The root equation gives

$$
D_v\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
D_v\mathbf{Y}_i(\lambda)
-
D_v\mathbf{Y}_j(\lambda-\eta_a)
\right]
}{J_a}.
$$

Hence

$$
|D_v\eta_a|
\le
\frac{2C_0}{J_0}
=
E_\eta.
$$

The delayed separation variation is

$$
D_v\mathbf{R}_a
=
D_v\mathbf{Y}_i(\lambda)
-
D_v\mathbf{Y}_j(\lambda-\eta_a)
+
\mathbf{T}_j(\lambda-\eta_a)D_v\eta_a.
$$

Since $\|\mathbf{T}_j\|=1$,

$$
\|D_v\mathbf{R}_a\|
\le
2C_0+E_\eta.
$$

The direction variation obeys

$$
D_v\widehat{\mathbf{R}}_a
=
\frac{
\left(I-\widehat{\mathbf{R}}_a\widehat{\mathbf{R}}_a^T\right)
D_v\mathbf{R}_a
}{\eta_a},
$$

so

$$
\|D_v\widehat{\mathbf{R}}_a\|
\le
\frac{2C_0+E_\eta}{\eta_0}
=
E_{\widehat{R}}.
$$

---

## 3. Jacobian Variation

The root Jacobian variation has the schematic form

$$
D_vJ_a
=
-
D_v\mathbf{T}_j(\lambda-\eta_a)\cdot\widehat{\mathbf{R}}_a
-
\mathbf{T}_j(\lambda-\eta_a)\cdot D_v\widehat{\mathbf{R}}_a
-
\partial_\lambda\mathbf{T}_j(\lambda-\eta_a)\cdot\widehat{\mathbf{R}}_a\,D_v\eta_a.
$$

Let

$$
C_2
\ge
\max_k\|\partial_\lambda\mathbf{T}_k\|_{C^0}
$$

on the same curve. Then

$$
|D_vJ_a|
\le
C_1
+
E_{\widehat{R}}
+
C_2E_\eta
=
E_J.
$$

This is conservative but sufficient. If the solver differentiates the root function by automatic differentiation or interval arithmetic, it may emit a sharper $E_J$ directly.

---

## 4. Per-Root Force Derivative

Let

$$
w_a^{\mathrm{rec}}=\eta_a^{-2}W_a^{\mathrm{rec}}.
$$

On a fixed receiver-normal branch-strength row,

$$
|D_vw_a^{\mathrm{rec}}|
\le
\frac{2W_0E_\eta}{\eta_0^3}
+
\frac{E_W}{\eta_0^2}.
$$

Therefore

$$
\|D_v\mathbf{f}_a\|
\le
\frac{2W_0E_\eta}{\eta_0^3}
+
\frac{E_W}{\eta_0^2}
+
\frac{W_0E_{\widehat{R}}}{\eta_0^2}
=
L_a.
$$

Without the $W_a^{\mathrm{rec}}$ and $D_vW_a^{\mathrm{rec}}$ rows, this
Lipschitz envelope is `receiver-normal-restart-required`.

For a receiver with at most $N_i$ retained roots,

$$
\|D_v\widetilde{\mathbf{F}}_i\|
\le
\sum_{a\in\mathcal{A}_i}L_a
\le
N_iL_{\max}.
$$

For the full residual packet,

$$
L_F
=
\left(
\sum_i
\left[
\sum_{a\in\mathcal{A}_i}L_a
\right]^2
\right)^{1/2}
$$

is a valid first-derivative force envelope in the declared coefficient norm.

---

## 5. Projected Force And Curvature Residual

The projected force is

$$
A_i=P_i^\perp\widetilde{\mathbf{F}}_i,
\qquad
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

Since

$$
D_vP_i^\perp
=
-
D_v\mathbf{T}_i\mathbf{T}_i^T
-
\mathbf{T}_i(D_v\mathbf{T}_i)^T,
$$

we have

$$
\|D_vP_i^\perp\|\le2C_1.
$$

If

$$
\|\widetilde{\mathbf{F}}_i\|\le F_i^0,
$$

then

$$
\|D_vA_i\|
\le
\|D_v\widetilde{\mathbf{F}}_i\|
+
2C_1F_i^0.
$$

For a fitted scalar residual

$$
R_K=K-\Gamma_K^{\mathrm{fit}}A,
$$

a derivative envelope must include curvature, projected force, and fitted-scale variation:

$$
\|D_vR_K\|
\le
\|D_vK\|
+
|\Gamma_K^{\mathrm{fit}}|\|D_vA\|
+
|D_v\Gamma_K^{\mathrm{fit}}|\|A\|.
$$

If $\Gamma_K$ is action-derived rather than fitted, replace $D_v\Gamma_K^{\mathrm{fit}}$ by the derivative of the action/inertia ledger. If that derivative is not emitted, the residual derivative envelope is incomplete.

---

## 6. Lipschitz Use In Certificates

The constants above feed four rows:

| Consumer | Required force envelope |
| --- | --- |
| [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) | root-front and support-growth derivative bounds that keep the same ledger valid |
| [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) | $L_H$ for off-grid residual envelopes |
| [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) | $K_R$ or Krawczyk $Z$ bounds for range closure |
| [history-force-variationality-condition.md](history-force-variationality-condition.md) | one-form derivative and curl entries with moving roots included |

If any root-chart floor or receiver-normal branch-strength bound is missing, the
envelope fails:

$$
\eta_0\le0
\quad\text{or}\quad
J_0\le0
\quad\text{or}\quad
W_0<0
\quad\text{or}\quad
E_W<0
\quad\Rightarrow
\quad
\texttt{force-lipschitz-envelope-failed}.
$$

If a memory or tail row changes the root ledger, the emitted $L_F$ is invalid until recomputed.

---

## 7. Lemma Target

**Lemma target: delayed-force differentiability envelope.** On a
root-regular finite-mode chart with $\eta_a\ge\eta_0>0$, $|J_a|\ge J_0>0$,
bounded curve variation constants $C_0,C_1,C_2$, finite active-root count, and
receiver-normal rows $0\le W_a^{\mathrm{rec}}\le W_0$ with
$|D_vW_a^{\mathrm{rec}}|\le E_W$, the delayed force map

$$
\alpha\mapsto\widetilde{\mathbf{F}}^{(\eta_{\mathrm{mem}})}(\alpha)
$$

is locally Lipschitz. For every unit coefficient variation $v$,

$$
\|D_v\widetilde{\mathbf{F}}\|
\le
L_F,
$$

with $L_F$ assembled from the per-root bounds above. The same chart also gives a projected-force residual derivative envelope when $D_vP^\perp$, $D_vK$, and $D_v\Gamma_K$ are included.

Proof route. The implicit root derivative is bounded by the source-normal Jacobian floor. The unit line-of-action derivative is bounded by the delay floor and curve-variation envelope. The inverse-square and receiver-normal weights are differentiable on fixed sign strata with $\eta_a\ge\eta_0$, $|D_{s,a}|\ge J_0$, and bounded $D_{t,a}$. Summing finitely many retained roots gives the force envelope.

---

## 8. Current $M=3$ Reading

The current $M=3$ packets report useful root floors and residual descent, but they do not emit the derivative envelopes required by this packet:

1. $C_0,C_1,C_2$ for the reduced $M=3$ basis;
2. the same-record receiver-normal derivative bundle
   $D_{s,a},D_{t,a},D_vD_{s,a},D_vD_{t,a}$, fixed sign labels, and
   $D_vW_a^{\mathrm{rec}}$;
3. per-root $E_\eta,E_{\widehat{R}},E_J,L_a$;
4. full $L_F$ on the support-complete memory ledger;
5. derivative bounds for $\Gamma_K^{\mathrm{fit}}$ or for an action-derived $\Gamma_K$;
6. second-variation or interval derivative bounds needed for Krawczyk $Z$.

Therefore the status is

$$
\texttt{delayed-force-lipschitz-envelope-open},
\qquad
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{not-retained}.
$$

---

## 9. Required Output Fields

Future solver packets should emit:

| Field | Required payload |
| --- | --- |
| `curve_variation_bounds` | $C_0,C_1,C_2$ in the reduced coefficient norm |
| `receiver_normal_first_derivative_row` | $D_{s,a}$, $D_{t,a}$, fixed sign labels, $D_vD_{s,a}$, $D_vD_{t,a}$, $W_a^{\mathrm{rec}}$, and $D_vW_a^{\mathrm{rec}}$ on the same retained record |
| `root_derivative_bounds` | $E_\eta$ per retained label and worst-case value |
| `direction_derivative_bounds` | $E_{\widehat{R}}$ per retained label |
| `jacobian_derivative_bounds` | $E_J$ per retained label |
| `force_derivative_bounds` | $L_a$, $L_F$, and source-pair/root counts |
| `projected_force_derivative_bounds` | derivative envelope for $P^\perp\widetilde{\mathbf{F}}$ |
| `gamma_derivative_status` | `fit-derived`, `action-derived`, or `not_computed` |
| `certificate_consumers` | which trust, refinement, Newton, and variationality rows used the emitted envelope |

Failure/status codes:

$$
\texttt{delayed-force-lipschitz-envelope-open},
\qquad
\texttt{receiver-normal-first-derivative-row-missing},
\qquad
\texttt{receiver-normal-sign-stratum-open},
\qquad
\texttt{force-lipschitz-envelope-failed},
\qquad
\texttt{gamma-derivative-missing},
$$

$$
\texttt{root-ledger-derivative-mismatch},
\qquad
\texttt{not-retained}.
$$
