# Second-Variation Action Stability Theorem

Promotion status: `priority-only`. This packet refines [root-dependent-variational-equation.md](root-dependent-variational-equation.md), [history-force-variationality-condition.md](history-force-variationality-condition.md), [gamma-scale-action-row.md](gamma-scale-action-row.md), and [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md). It supplies the action-side stability certificate: the Hessian of the retained branch action on a fixed root stratum, its gauge-neutral quotient, and its compatibility with root-ledger monodromy.

It is not a substitute for Floquet stability. A coercive action Hessian proves local action minimality in the declared chart. Floquet contraction requires a separate return-map action-decrease or spectral row. On a conservative Noether/action ledger, [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) further requires reciprocal multiplier pairing unless a dissipative medium or boundary-exchange row is declared.

For a bounded speed factor branch, this Hessian packet is fixed-speed only unless the tangent space is enlarged from $\xi=\delta\mathbf{Y}$ to

$$
(\xi,\rho)
=
(\delta\mathbf{Y},\delta\nu),
$$

and the second variation differentiates the bounded-speed action, clock map, and root sheets. A Hessian that omits $\rho$ after $\nu_i$ becomes a branch variable has status

$$
\texttt{bounded-speed-hessian-stale}.
$$

---

## 1. Fixed Root Stratum

Let $B$ be a support-complete branch candidate with curve family $\mathbf{Y}_B$, active root ledger $\mathcal{A}_B$, memory convention $\eta_{\mathrm{mem}}$, source-pair policy $\Pi_{\mathrm{src}}$, endpoint convention $\Pi_{\mathrm{end}}$, and action-derived scale $\Gamma_B$. Define the root-regular stratum

$$
\mathscr{M}_B
=
\left\{
\mathbf{Y}:
\mathcal{A}(\mathbf{Y})=\mathcal{A}_B,\ 
\eta_{\mathrm{mem}},\Pi_{\mathrm{src}},\Pi_{\mathrm{end}}\ \text{fixed},\ 
|J_a|\ge J_0
\right\},
$$

with noncollision, support, excluded-gap, and tail rows inherited from the root certificate.

The tangent space used by the second variation is

$$
T_B\mathscr{M}_B
$$

after imposing center gauge, equal period, arclength regularity, support convention, and inventory labels. A perturbation is denoted $\xi=\{\xi_i(\lambda)\}$.

---

## 2. First And Second Root Sensitivities

For a root label

$$
a=(i,j,\lambda,\mu),
\qquad
\nu_a=\lambda-\eta_a,
$$

write

$$
h_a^{\xi}
=
\delta\eta_a[\xi]
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left(\xi_i-\xi_j^{-}\right)
}{J_a},
$$

where $\xi_j^-=\xi_j(\nu_a)$. Define the total first chord variation

$$
u_a^{\xi}
=
\xi_i-\xi_j^{-}+\mathbf{T}_j^{-}h_a^{\xi},
$$

and

$$
P_a=I-\widehat{\mathbf{R}}_a\widehat{\mathbf{R}}_a^T.
$$

The bilinear second root shift has the form

$$
\delta^2\eta_a[\xi,\zeta]
=
\frac{
\widehat{\mathbf{R}}_a\cdot q_a^{\xi\zeta}
+
\eta_a^{-1}
\left(P_a u_a^{\xi}\right)\cdot u_a^{\zeta}
}{J_a},
$$

where

$$
q_a^{\xi\zeta}
=
h_a^{\zeta}(\xi_j')^{-}
+
h_a^{\xi}(\zeta_j')^{-}
-
h_a^{\xi}h_a^{\zeta}\mathbf{K}_j^{-}.
$$

This is the root-level object a second-variation packet must emit or enclose. A Hessian computed with fixed root delays has status

$$
\texttt{second-root-sensitivity-missing}.
$$

---

## 3. Action Hessian On The Stratum

Let

$$
A_i=P_i^\perp\widetilde{\mathbf{F}}_i.
$$

The first-variation dynamics operator from [root-dependent-variational-equation.md](root-dependent-variational-equation.md) is

$$
\xi_i''
-
\Gamma_B\delta A_i[\xi]
-
\delta\Gamma_B[\xi]A_{i,B}.
$$

Use the action Hessian sign convention

$$
\mathscr{J}_{B,i}\xi
=
-
\left(
\xi_i''
-
\Gamma_B\delta A_i[\xi]
-
\delta\Gamma_B[\xi]A_{i,B}
\right).
$$

The constrained dimensionless Hessian is

$$
Q_B[\xi,\zeta]
=
\int_0^L
\sum_i
\zeta_i^\perp\cdot
\mathscr{J}_{B,i}\xi
d\lambda
+
Q_{\mathrm{constr}}[\xi,\zeta]
+
Q_{\mathrm{sea/event}}[\xi,\zeta].
$$

The constraint block contains center gauge, equal-period, unit-speed/arclength, support, endpoint, and inventory multiplier contributions. The sea/event block is present only when the total action includes those rows on the same event interval.

The history-force block is symmetric only if the one-form curl row is closed:

$$
Q_{\mathrm{hist}}[\xi,\zeta]
-
Q_{\mathrm{hist}}[\zeta,\xi]
=
\Gamma_B\mathcal{C}_B(\xi,\zeta).
$$

Therefore

$$
\|\mathcal{C}_B\|\le\epsilon_{\mathrm{curl}}
$$

is a precondition for treating $Q_B$ as an action Hessian rather than a nonsymmetric force derivative.

---

## 4. Root-Dependent Force Hessian Inputs

The first force variation is

$$
\delta\mathbf{f}_a[\xi]
=
\frac{\sigma_i\sigma_j}{\eta_a^2|J_a|}
\left[
\delta\widehat{\mathbf{R}}_a[\xi]
-
\left(
2\frac{h_a^{\xi}}{\eta_a}
+
\frac{\delta J_a[\xi]}{J_a}
\right)
\widehat{\mathbf{R}}_a
\right].
$$

For direct second-variation audits, the packet must also emit or enclose

$$
\delta^2J_a[\xi,\zeta]
=
-
\delta^2\mathbf{T}_j^{-}[\xi,\zeta]\cdot\widehat{\mathbf{R}}_a
-
\delta\mathbf{T}_j^{-}[\xi]\cdot\delta\widehat{\mathbf{R}}_a[\zeta]
-
\delta\mathbf{T}_j^{-}[\zeta]\cdot\delta\widehat{\mathbf{R}}_a[\xi]
-
\mathbf{T}_j^{-}\cdot\delta^2\widehat{\mathbf{R}}_a[\xi,\zeta].
$$

The remaining terms in $\delta^2\mathbf{f}_a[\xi,\zeta]$ are obtained by differentiating the scalar prefactor

$$
\eta_a^{-2}|J_a|^{-1}
$$

and the direction variation $\delta\widehat{\mathbf{R}}_a$. A certificate may avoid writing every tensor component if it emits an interval or automatic-differentiation Hessian bound for the same root solver and validates the skew part against the curl row.

---

## 5. Gauge-Neutral Quotient

Let $\mathcal{G}_B$ be the declared gauge subspace and let $\mathcal{T}_B$ be the phase, torus, or branch-neutral subspace. The action stability quotient is

$$
\mathcal{Q}_B
=
T_B\mathscr{M}_B
/
\left(
\mathcal{G}_B\oplus\mathcal{T}_B
\right).
$$

The Hessian descends to $\mathcal{Q}_B$ only if

$$
Q_B[g,\xi]=0
\qquad
\text{for every }g\in\mathcal{G}_B
$$

and if the declared neutral tangent directions have the expected nullity. Extra null directions mean the branch is not an isolated action critical branch in the claimed quotient.

Define the quotient operator $\mathscr{J}_{B,\perp}$ by

$$
Q_B[\xi,\zeta]
=
\langle \zeta,\mathscr{J}_{B,\perp}\xi\rangle
\qquad
\text{on }\mathcal{Q}_B.
$$

Its Morse data are

$$
m_-(B)
=
\#\{\lambda<0:\lambda\in\operatorname{spec}(\mathscr{J}_{B,\perp})\},
\qquad
\nu(B)
=
\dim\ker\mathscr{J}_{B,\perp}.
$$

---

## 6. Morse And Floquet Compatibility

Let $M_B$ be the reduced monodromy from [root-dependent-variational-equation.md](root-dependent-variational-equation.md). Periodic Jacobi fields should match unit Floquet directions on the same quotient:

$$
\ker\mathscr{J}_{B,\perp}
\cong
\ker(M_B-I).
$$

If

$$
\nu(B)
>
\dim\ker(M_B-I)
$$

after declared gauge and tangent directions are removed, the action packet has an unaccounted flat direction. If

$$
\dim\ker(M_B-I)
>
\nu(B),
$$

the Floquet packet has a neutral return direction that is not explained by action criticality or declared branch symmetry.

Coercivity is the bound

$$
Q_B[\xi,\xi]
\ge
c_B\|\xi\|_{H^1_{\eta}}^2
\qquad
\text{for }\xi\in\mathcal{Q}_B.
$$

This proves local action minimality in the retained chart. It does not by itself prove return-map contraction. To infer contraction from action geometry, add an action-decrease row:

$$
Q_B[M_B\xi,M_B\xi]
\le
(1-\alpha_B)Q_B[\xi,\xi],
\qquad
\alpha_B>0.
$$

Then

$$
\rho\left(M_B|_{\perp}\right)
\le
\sqrt{1-\alpha_B}
$$

in the action norm. Without this row, the correct status is

$$
\texttt{action-coercive-not-floquet-contracting}.
$$

---

## 7. Theorem Target

**Theorem target: second-variation action stability.** Suppose a same-level branch packet passes support-complete dynamics closure, delayed-force one-form exactness, action-derived scale or inertia closure, Noether/event ledger matching, and root-ledger variational differentiability. Suppose the second root sensitivities above are emitted or interval-enclosed and the constrained Hessian $Q_B$ descends to the gauge-neutral quotient.

If $Q_B$ is coercive on $\mathcal{Q}_B$, then $B$ is a local action minimum on the declared fixed root stratum. If, in addition, the Morse/Floquet nullity match holds and the action-decrease row passes, then the action norm bounds the transverse monodromy spectrum by the displayed contraction inequality.

If $Q_B$ has negative quotient directions, the branch is an action saddle even if a short numerical perturbation screen looks quiet. If $Q_B$ has extra nullity, the branch needs a larger neutral-family declaration, a missing constraint row, or a corrected action ledger before retention.

---

## 8. Output Schema And Status Codes

Future retained branch packets should emit:

| Field | Required content |
| --- | --- |
| `second_root_sensitivities` | $\delta^2\eta_a[\xi,\zeta]$ rows or certified Hessian envelope for every retained root label |
| `action_hessian` | quotient Hessian matrix/operator with force, root, projector, $\Gamma$, constraint, and event terms |
| `hessian_skew_audit` | $\|Q_B-Q_B^T\|$ and relation to the work-one-form curl tolerance |
| `gauge_neutral_quotient` | declared $\mathcal{G}_B$, $\mathcal{T}_B$, quotient dimension, and expected nullity |
| `morse_index` | $m_-(B)$, $\nu(B)$, and eigenvalue tolerances |
| `morse_floquet_match` | comparison between $\ker\mathscr{J}_{B,\perp}$ and $\ker(M_B-I)$ |
| `action_decrease_row` | whether $Q_B[M_B\xi,M_B\xi]\le(1-\alpha_B)Q_B[\xi,\xi]$ was certified |
| `second_variation_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{action-hessian-not-defined},
\qquad
\texttt{second-root-sensitivity-missing},
\qquad
\texttt{hessian-curl-skew-open},
$$

$$
\texttt{gauge-nullity-unresolved},
\qquad
\texttt{extra-action-nullity},
\qquad
\texttt{action-saddle-branch},
$$

$$
\texttt{morse-floquet-mismatch},
\qquad
\texttt{action-coercive-not-floquet-contracting},
\qquad
\texttt{gamma-derivative-missing},
$$

$$
\texttt{force-action-ledger-mismatch},
\qquad
\texttt{root-event-hessian-reset},
\qquad
\texttt{not-retained}.
$$

Current $M=3$ rows cannot pass this theorem because they are still

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{root-ledger-floquet-stability-open}.
$$
