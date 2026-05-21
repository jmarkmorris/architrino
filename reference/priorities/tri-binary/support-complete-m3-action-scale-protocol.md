# Support-Complete $M=3$ Action-Scale Protocol

Promotion status: `priority-only`. This packet gives the post-tail action-scale computation needed by the exact-antipodal $M=3$ corrector. It specializes [gamma-scale-action-row.md](gamma-scale-action-row.md), [history-force-variationality-condition.md](history-force-variationality-condition.md), and [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md) to one support-complete $M=3$ ledger.

It does not retain a branch. Its purpose is to decide whether the scale in the dynamics row is an action-derived branch quantity $\Gamma_B$ or only a diagnostic fit $\Gamma_K^{\mathrm{fit}}$.

This packet is fixed-speed unless the corrector variables include the bounded speed factor. In a bounded-speed successor, the normal and tangential residuals are

$$
R_{N,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu},
$$

and

$$
R_{T,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}.
$$

The work one-form, fitted scale, action-derived scale, and curl row must use the bounded-speed ledger from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

---

## 1. Frozen Ledger

After the tail pass returns either `tail-exclusion-restored` or `tail-root-sheet-assimilated`, freeze

$$
\mathcal{L}
=
\left(
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J,
W_{\mathcal{E}}
\right).
$$

Every object below must use this same ledger: the force, fitted scale, action, inertia, curl, derivatives, Krawczyk rows, and cokernel rows. If any row uses a different root set, memory depth, endpoint convention, or source-pair policy, the status is

$$
\texttt{force-action-ledger-mismatch}.
$$

Set

$$
A=P^\perp\widetilde{\mathbf{F}},
\qquad
K=\mathbf{K}.
$$

The diagnostic fitted scale is

$$
\Gamma_K^{\mathrm{fit}}
=
\frac{\langle K,A\rangle_{\mathcal{E}}}
{\langle A,A\rangle_{\mathcal{E}}},
$$

with fitted residual

$$
R_{\mathrm{fit}}
=
K-\Gamma_K^{\mathrm{fit}}A.
$$

This projection is useful for Newton initialization. It is not the physical scale row.

---

## 2. Action-Derived Scale

The action-derived scale is

$$
\Gamma_B(u)
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}(u)c_f^2}.
$$

With

$$
E_\epsilon(R_*)=\frac{\kappa\epsilon^2}{R_*},
$$

this becomes

$$
\Gamma_B(u)
=
\frac{\kappa\epsilon^2}
{m_{\mathrm{car}}(u)R_*(u)c_f^2}.
$$

The corrector may use $x=(u,\gamma)$ as numerical variables, but the scale row is

$$
R_\gamma
=
\gamma-\Gamma_B(u).
$$

If $\Gamma_B$ is absent and the row uses only $\Gamma_K^{\mathrm{fit}}$, the status is

$$
\texttt{gamma-fitted-not-derived}.
$$

If the dimensions or scale convention do not satisfy $\Gamma_B=E_\epsilon/(m_{\mathrm{car}}c_f^2)$ under the declared $R_*$ convention, the status is

$$
\texttt{scale-row-dimension-error}.
$$

---

## 3. Virtual-Work Exactness

For reduced coefficient coordinates $\alpha^p$, define the finite-mode work one-form

$$
W_p(u)
=
\int
\sum_i
P_i^\perp\widetilde{\mathbf{F}}_i
\cdot
\partial_p\mathbf{Y}_i^\perp
d\lambda.
$$

The exterior curl is

$$
\mathcal{C}_{pq}
=
\partial_pW_q-\partial_qW_p.
$$

The support-complete force is action-compatible only if

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}
{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

The derivatives $\partial_pW_q$ must include root motion. For every retained root $r$ and coefficient direction $\xi=\partial_p\mathbf{Y}$,

$$
\delta\eta_r[\xi]
=
\frac{
\widehat{\mathbf{R}}_r\cdot(\xi_i-\xi_j^-)
}{J_r}.
$$

A curl test that freezes root delays has status

$$
\texttt{frozen-root-curl-invalid}.
$$

If the tail pass returns `tail-root-sheet-assimilated`, the curl row must use the sheet-complete one-form and the sheet derivatives from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). A row that differentiates only the old active ledger has status

$$
\texttt{tail-root-curl-ledger-stale}.
$$

Nodewise tail roots without continuous sheet derivatives leave the action row at

$$
\texttt{nodewise-root-sheet-curl-invalid}.
$$

If the curl row exceeds tolerance after root-sensitive derivatives and refinement errors are included, the status is

$$
\texttt{history-one-form-curl-open}.
$$

---

## 4. Scalar Inertia Reduction

The action row may produce a normal inertia operator

$$
\mathsf{M}_{B,\perp}
$$

rather than a scalar. A scalar branch scale is valid only after this operator reduces to a scalar on the retained normal carrier subspace.

Let $Q$ be an orthonormal basis for the reduced normal carrier subspace after quotienting gauge, tangent, and constraint directions. Let $d=\dim Q$. Define

$$
m_{\mathrm{car}}
=
\frac{1}{d}
\operatorname{tr}
\left(
Q^T\mathsf{M}_{B,\perp}Q
\right).
$$

The scalar-isotropy residual is

$$
R_{\mathrm{iso}}
=
\sup_{\|v\|=1}
\frac{
\|\mathsf{M}_{B,\perp}Qv-m_{\mathrm{car}}Qv\|
}{m_{\mathrm{car}}}.
$$

The scalar inertia row passes when

$$
R_{\mathrm{iso}}\le\epsilon_{\mathrm{iso}},
\qquad
m_{\mathrm{car}}>0.
$$

If no inertia operator or scalar inertia is emitted, the status is

$$
\texttt{inertia-ledger-missing}.
$$

If the isotropy row fails, the status is

$$
\texttt{scalar-inertia-reduction-failed}.
$$

In that case the correct dynamics row is operator-valued:

$$
\mathsf{M}_{B,\perp}K
=
\frac{E_\epsilon(R_*)}{c_f^2}A,
$$

not the scalar equation $K=\Gamma_BA$.

If the tail pass returns `tail-root-sheet-assimilated`, the inertia operator must also be sheet-complete:

$$
\mathsf{M}_{B,\perp}^{+}
=
\mathsf{M}_{B,\perp}^{\mathrm{act}}
+
\Delta\mathsf{M}_{B,\perp}^{\mathrm{sheet}}.
$$

The scalar row must then use $Q^{+}$, $m_{\mathrm{car}}^{+}$, and $R_{\mathrm{iso}}^{+}$ from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). If it continues to use the old active-ledger operator, the status is

$$
\texttt{root-sheet-inertia-ledger-stale}.
$$

---

## 5. Derivative Of $\Gamma_B$

The Krawczyk corrector needs

$$
\delta R_\gamma
=
\delta\gamma-D\Gamma_B(u)[\delta u].
$$

The general logarithmic derivative is

$$
D\Gamma_B[\delta u]
=
\Gamma_B
\left(
\frac{DE_\epsilon[\delta u]}{E_\epsilon}
-
\frac{Dm_{\mathrm{car}}[\delta u]}{m_{\mathrm{car}}}
\right).
$$

With $E_\epsilon=\kappa\epsilon^2/R_*$ and fixed $\kappa,\epsilon,c_f$,

$$
D\Gamma_B[\delta u]
=
-\Gamma_B
\left(
\frac{DR_*[\delta u]}{R_*}
+
\frac{Dm_{\mathrm{car}}[\delta u]}{m_{\mathrm{car}}}
\right).
$$

If $Q$ is transported by a parallel orthonormal basis gauge on the reduced normal subspace, then

$$
Dm_{\mathrm{car}}[\delta u]
=
\frac{1}{d}
\operatorname{tr}
\left(
Q^TD\mathsf{M}_{B,\perp}[\delta u]Q
\right).
$$

If the basis variation is not gauged away, the derivative must include the $DQ$ terms. Omitting them without a declared parallel-basis convention leaves the status

$$
\texttt{inertia-derivative-gauge-open}.
$$

---

## 6. Fit/Action Compatibility

On the frozen ledger,

$$
K-\Gamma_BA
=
R_{\mathrm{fit}}
+
(\Gamma_K^{\mathrm{fit}}-\Gamma_B)A.
$$

Thus

$$
\|K-\Gamma_BA\|_{\mathcal{E}}^2
=
\|R_{\mathrm{fit}}\|_{\mathcal{E}}^2
+
(\Gamma_K^{\mathrm{fit}}-\Gamma_B)^2
\|A\|_{\mathcal{E}}^2.
$$

Let

$$
\|A\|_{\mathcal{E}}\ge A_0>0.
$$

After the support tail is excluded or assimilated, unresolved tail error should be zero. The fitted-scale uncertainty interval is therefore

$$
[\Gamma_K^{\mathrm{fit}}-\epsilon_\Gamma,\,
\Gamma_K^{\mathrm{fit}}+\epsilon_\Gamma],
$$

where $\epsilon_\Gamma$ includes root-solver, interval, and discretization errors. The action scale is compatible with the fitted dynamics row only if

$$
\operatorname{dist}
\left(
\Gamma_B,
[\Gamma_K^{\mathrm{fit}}-\epsilon_\Gamma,
\Gamma_K^{\mathrm{fit}}+\epsilon_\Gamma]
\right)
\le
\frac{\tau_K+\tau_M}{A_0}.
$$

If unresolved tail error remains, the comparison status is

$$
\texttt{gamma-fit-tail-unstable}.
$$

If the displayed inequality fails, the status is

$$
\texttt{gamma-fit-action-mismatch}.
$$

---

## 7. Corrector Integration

The support-complete $M=3$ corrector may use the residual stack

$$
\mathcal{F}_{M3}^{\mathrm{act}}
=
\begin{bmatrix}
R_T\\
R_K\\
R_\gamma
\end{bmatrix}
$$

as the Newton/Krawczyk row when $R_{\mathrm{curl}}$ and $R_{\mathrm{iso}}$ do not yet have certified derivatives. In that case, curl exactness and scalar inertia are post-corrector interval audits:

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}},
\qquad
R_{\mathrm{iso}}\le\epsilon_{\mathrm{iso}}.
$$

If certified derivatives are available, the full residual may be used:

$$
\mathcal{F}_{M3}^{\mathrm{full}}
=
\begin{bmatrix}
R_T\\
R_K\\
R_\gamma\\
R_{\mathrm{curl}}\\
R_{\mathrm{iso}}
\end{bmatrix}.
$$

In both cases, a retained dynamics/action candidate requires all rows to pass on the same ledger.

---

## 8. Decision Statuses

Return

$$
\texttt{gamma-action-compatible}
$$

only if the frozen support-complete ledger, virtual-work curl row, scalar inertia row, $\Gamma_B$ derivative row, fit/action compatibility row, and refinement errors all pass.

The first-failure statuses are:

| Status | Trigger |
| --- | --- |
| `tail-force-error-unbounded` | tail ledger not fixed |
| `force-action-ledger-mismatch` | force, action, inertia, or curl rows use different ledgers |
| `history-one-form-curl-open` | $\mathcal{C}$ exceeds tolerance |
| `frozen-root-curl-invalid` | curl derivative freezes root motion |
| `tail-root-curl-ledger-stale` | curl row uses the active ledger after tail-root-sheet assimilation |
| `nodewise-root-sheet-curl-invalid` | curl row uses nodewise tail roots without continuous sheet derivatives |
| `inertia-ledger-missing` | no $\mathsf{M}_{B,\perp}$ or $m_{\mathrm{car}}$ emitted |
| `root-sheet-inertia-ledger-stale` | inertia row uses the active ledger after tail-root-sheet assimilation |
| `scalar-inertia-reduction-failed` | $\mathsf{M}_{B,\perp}$ does not reduce to scalar inertia |
| `inertia-derivative-gauge-open` | $D\Gamma_B$ omits required inertia-basis variation |
| `gamma-fitted-not-derived` | solve uses only $\Gamma_K^{\mathrm{fit}}$ |
| `gamma-fit-tail-unstable` | unresolved tail error destabilizes $\Gamma_K^{\mathrm{fit}}$ |
| `gamma-fit-action-mismatch` | $\Gamma_B$ lies outside the fitted compatibility interval |
| `scale-row-dimension-error` | $\Gamma_B$ violates the declared scale convention |

Current $M=3$ status remains

$$
\texttt{gamma-fitted-not-derived}
$$

until this protocol is run on a support-complete tail ledger.
