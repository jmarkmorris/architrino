# Support-Complete $M=3$ Post-Tail Proof Budget

Promotion status: `priority-only`. This packet is the single-ledger proof budget that starts after the exact-antipodal $M=3$ support-tail row has returned either `tail-exclusion-restored` or `tail-root-sheet-assimilated`. It composes [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md), [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md), [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md), [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md), and [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md) into one finite inequality.

It does not retain a branch. It says exactly what a post-tail $M=3$ solve must emit before the row can be called a support-complete dynamics/action candidate or a support-complete exact-antipodal obstruction.

---

## 1. Post-Tail Ledger Object

After the support-tail pass, freeze one ledger

$$
\mathsf{P}_{M3}^{+}
=
\left(
\mathsf{L}_{\mathrm{tail}},
\mathcal{A}_{\eta}^{+},
\mathsf{X}_{\mathrm{tail}},
\mathsf{D}_{\mathrm{sheet}},
\mathsf{R}_{\mathrm{chart}},
\mathsf{D}_{F},
\mathsf{K}_{\mathrm{range}},
\mathsf{C}_{\mathrm{cok}},
\mathsf{A}_{\Gamma},
\mathsf{E}_{\mathrm{disc}},
\mathsf{Status}
\right).
$$

The entries are:

| Entry | Meaning |
| --- | --- |
| $\mathsf{L}_{\mathrm{tail}}$ | tail execution ledger identity and endpoint/source-pair conventions |
| $\mathcal{A}_{\eta}^{+}$ | support-complete root ledger after tail exclusion or assimilation |
| $\mathsf{X}_{\mathrm{tail}}$ | atomic tail cell margins, coefficient-box persistence, and $E_{\mathrm{tail}}$ |
| $\mathsf{D}_{\mathrm{sheet}}$ | first and second root-sheet variation envelopes, or the zero packet when the tail is empty |
| $\mathsf{R}_{\mathrm{chart}}$ | every chart-preservation radius entering $\rho_{\mathrm{chart}}$ |
| $\mathsf{D}_{F}$ | support-complete derivative envelope for the weighted residual |
| $\mathsf{K}_{\mathrm{range}}$ | Krawczyk range closure values $Y$, $Z$, and $\rho_*$ |
| $\mathsf{C}_{\mathrm{cok}}$ | cokernel audit or lower-bound obstruction |
| $\mathsf{A}_{\Gamma}$ | $\Gamma_B$, curl, scalar inertia, fit/action compatibility, and derivative-gauge rows |
| $\mathsf{E}_{\mathrm{disc}}$ | collocation, projector-drift, and off-grid error budget |
| $\mathsf{Status}$ | one primary post-tail decision status |

Every entry must use the same root labels, memory depth, endpoint ownership, source-pair policy, row weights, action convention, and coefficient box. If any row changes one of those conventions, the result is

$$
\texttt{ledger-convention-mismatch}.
$$

---

## 2. Chart Radius

The post-tail Krawczyk ball must fit inside the certified chart:

$$
\rho\le\rho_{\mathrm{chart}},
$$

where

$$
\rho_{\mathrm{chart}}
=
\min
\left\{
\rho_{\mathrm{root}},
\rho_J,
\rho_{\mathrm{tail}},
\rho_d,
\rho_s,
\rho_{\mathrm{ep}},
\rho_{\Gamma},
\rho_{\mathrm{curl}},
\rho_{\mathrm{disc}}
\right\}.
$$

Each radius is a margin divided by a coefficient-variation envelope:

$$
\rho_m=\frac{m}{L_m}
$$

when the row is first-order certified, or the largest positive root of

$$
V_m\rho+\frac12A_m\rho^2<m
$$

when the row emits a second-order envelope.

The tail contribution is not guessed from the active window. It is imported from the execution ledger:

$$
\rho_{\mathrm{tail}}
=
\min
\left\{
\frac{m_{\emptyset}(c)-e_{\emptyset}(c)}{L_{\emptyset,c}^{\alpha}},
\frac{m_{\mathrm{root}}(u)-e_{\mathrm{tube}}(u)}{L_{\mathrm{tube},u}^{\alpha}},
\frac{m_{\mathrm{Newt}}(c)-e_{\mathrm{Newt}}(c)}{L_{\mathrm{Newt},c}^{\alpha}},
\frac{m_{\mathrm{Kraw}}(u)-e_{\mathrm{Kraw}}(u)}{L_{\mathrm{Kraw},u}^{\alpha}}
\right\}.
$$

The first minimum is over all empty atomic cells, the second over all assimilated tail tubes, and the last two over selected Newton exclusions and Krawczyk tubes. Terms for predicates not selected in the terminal tail ledger are absent. The sensitivity denominators are supplied by [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md). If the tail is purely excluded, tube terms are absent. If the tail contains sheets, empty-cell and tube rows are both present.

This formula is meaningful only when

$$
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
=
\texttt{coefficient-box}.
$$

If the tail certificate is pointwise only, then for proof-budget purposes

$$
\rho_{\mathrm{tail}}=0
$$

and the primary status is

$$
\texttt{tail-certificate-pointwise-only}.
$$

---

## 3. Derivative Envelope

Let

$$
F^{+}(x)
=
W_{\mathcal{E}}^{1/2}
\mathcal{F}_{M3}^{+}(x),
\qquad
x=(u,\gamma),
$$

where the plus sign means the support-complete ledger after the tail row.

On $B_\rho(x_0)$ the range derivative envelope must satisfy

$$
\left\|
DF_R^{+}(x_0+h)-DF_R^{+}(x_0)
\right\|
\le
L_R^{+}\rho.
$$

The ledger must decompose

$$
L_R^{+}
=
L_R^{\mathrm{geom}}
+L_R^{\mathrm{active}}
+\mathbf{1}_{\mathrm{sheet}}L_R^{\mathrm{sheet}}
+L_R^{\Gamma}
+\mathbf{1}_{\mathrm{curl}}L_R^{\mathrm{curl}}
+\mathbf{1}_{\mathrm{iso}}L_R^{\mathrm{iso}}
+L_R^{\mathrm{proj}}.
$$

Here $\mathbf{1}_{\mathrm{sheet}}=0$ for `tail-exclusion-restored` and $\mathbf{1}_{\mathrm{sheet}}=1$ for `tail-root-sheet-assimilated`. When sheets are present, $L_R^{\mathrm{sheet}}$ must bound the chart-ball variation of

$$
D\eta_u,
\qquad
DJ_u,
\qquad
D\mathbf{f}_u,
$$

using the second sheet variation or an equivalent interval automatic-differentiation enclosure from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). First sheet derivatives alone are not enough for a Krawczyk $Z$ bound.

The cokernel nonlinear envelope is a separate row:

$$
\left\|
P_{\mathrm{cok}}
\left[
F^{+}(x_0+h)-F^{+}(x_0)-DF^{+}(x_0)h
\right]
\right\|
\le
\frac12L_{\mathrm{cok}}^{+}\|h\|^2.
$$

If either $L_R^{+}$ or $L_{\mathrm{cok}}^{+}$ is missing, the status is

$$
\texttt{krawczyk-derivative-envelope-open}.
$$

If the missing piece is specifically $L_R^{\mathrm{sheet}}$ or its second-variation data, use

$$
\texttt{root-sheet-second-variation-open}.
$$

---

## 4. Range Closure

Let

$$
A_0=DF^{+}(x_0),
$$

and let

$$
A_0=U_R\Sigma V^T
$$

be the certified range SVD with

$$
\sigma_{\min}=\min\operatorname{diag}\Sigma.
$$

Set

$$
C=V\Sigma^{-1},
\qquad
F_R^{+}=U_R^TF^{+}.
$$

The range quantities are

$$
Y=\|CF_R^{+}(x_0)\|,
$$

and

$$
Z
\le
\|I-CDF_R^{+}(x_0)\|
+
\frac{L_R^{+}\rho}{\sigma_{\min}}.
$$

If $C$ is the certified inverse of $DF_R^{+}(x_0)$ on the chosen range,

$$
Z
\le
\frac{L_R^{+}\rho}{\sigma_{\min}}.
$$

The range row passes when

$$
Z<1,
\qquad
Y+Z\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}.
$$

The enclosed range-zero radius is

$$
\rho_*=\frac{Y}{1-Z}.
$$

This proves only range closure:

$$
F_R^{+}(x_*)=0.
$$

It does not prove a full dynamics/action candidate until the cokernel and action rows pass.

---

## 5. Cokernel Audit And Obstruction

Let

$$
P_{\mathrm{cok}}=I-U_RU_R^T.
$$

The base cokernel residual is

$$
c_0=P_{\mathrm{cok}}F^{+}(x_0).
$$

On the range enclosure, the certified cokernel error is

$$
\epsilon_C
\le
\|c_0\|
+
\frac12L_{\mathrm{cok}}^{+}\rho_*^2.
$$

The support-complete dynamics row passes only if

$$
\epsilon_C
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{root}}
+
\epsilon_{\Gamma}
\le
\tau_{\mathrm{dyn}}.
$$

Here $\epsilon_{\mathrm{root}}$ includes residual root-solver and root-sheet enclosure error after the tail has been excluded or assimilated. It does not include an unbounded omitted-tail term; that would have stopped the proof at the tail row.

If the audit fails, an exact-antipodal obstruction requires the lower bound

$$
\|c_0\|
-
\frac12L_{\mathrm{cok}}^{+}\rho^2
-
\epsilon_{\mathrm{disc}}
-
\epsilon_{\mathrm{root}}
-
\epsilon_{\Gamma}
>
\tau_{\mathrm{dyn}}.
$$

Equivalently, for a normalized adjoint vector $\ell$,

$$
|\langle F^{+}(x_0),\ell\rangle|
>
\epsilon_{\mathrm{adj}}\rho
+
\frac12L_{\ell}^{+}\rho^2
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{root}}
+
\epsilon_{\Gamma}
+
\tau_{\mathrm{dyn}}.
$$

This obstruction is local to the exact-antipodal $M=3$ chart and ledger. It does not open midpoint relaxation until higher exact-antipodal mode refinement also fails.

---

## 6. Action Compatibility

The action packet must certify

$$
R_{\gamma}=\gamma-\Gamma_B(u),
$$

where

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2}.
$$

The derivative row is

$$
D\Gamma_B[\delta u]
=
\Gamma_B
\left(
\frac{DE_\epsilon[\delta u]}{E_\epsilon}
-
\frac{Dm_{\mathrm{car}}[\delta u]}{m_{\mathrm{car}}}
\right),
$$

or, for $E_\epsilon=\kappa\epsilon^2/R_*$ with fixed $\kappa$, $\epsilon$, and $c_f$,

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

The curl row is

$$
E_{\mathrm{curl}}
=
\frac{\|\mathcal{C}^{+}\|_{\mathrm{F}}}
{\epsilon_{\mathrm{curl}}(1+\|W^{+}\|_{\mathrm{F}})}.
$$

The scalar inertia row is

$$
E_{\mathrm{iso}}
=
\frac{R_{\mathrm{iso}}^{+}}{\epsilon_{\mathrm{iso}}}.
$$

The fit/action compatibility row is

$$
E_{\Gamma}
=
\frac{
A_0^{\mathrm{norm}}\,
\operatorname{dist}(\Gamma_B,I_{\Gamma})
}{
\tau_K+\tau_M
},
$$

where

$$
I_{\Gamma}
=
[\Gamma_K^{\mathrm{fit}}-\epsilon_{\Gamma},\,
\Gamma_K^{\mathrm{fit}}+\epsilon_{\Gamma}].
$$

The action row passes only if

$$
\max\{E_{\mathrm{curl}},E_{\mathrm{iso}},E_{\Gamma}\}\le1,
\qquad
m_{\mathrm{car}}>0,
$$

and the inertia derivative uses a declared parallel-basis gauge or includes the $DQ$ terms. Otherwise the first failing status is one of

$$
\texttt{history-one-form-curl-open},
\qquad
\texttt{scalar-inertia-reduction-failed},
\qquad
\texttt{gamma-fit-action-mismatch},
\qquad
\texttt{inertia-derivative-gauge-open}.
$$

---

## 7. Post-Tail Master Score

The post-tail proof budget exports the normalized score

$$
\mathfrak{E}_{M3}^{\mathrm{post}}
=
\max
\left\{
E_{\mathrm{tail}},
E_{\mathrm{sheet}},
Z,
\frac{Y+Z\rho}{\rho},
\frac{
\epsilon_C+\epsilon_{\mathrm{disc}}+\epsilon_{\mathrm{root}}+\epsilon_{\Gamma}
}{
\tau_{\mathrm{dyn}}
},
E_{\mathrm{curl}},
E_{\mathrm{iso}},
E_{\Gamma}
\right\}.
$$

If

$$
\mathfrak{E}_{M3}^{\mathrm{post}}\le1
$$

and every chart floor in $\rho_{\mathrm{chart}}$ is positive, the finite row has status

$$
\texttt{support-complete-exact-antipodal-dynamics-action-candidate}.
$$

This is still not a retained branch. It must still pass finite-mode convergence, Noether/event closure, stability, inventory, and the master theorem.

If the range row passes but the cokernel/action tolerance row fails without an obstruction lower bound, the status is

$$
\texttt{krawczyk-cokernel-tolerance-open}.
$$

If the obstruction lower bound passes after exact-antipodal mode refinement fails, the status is

$$
\texttt{support-complete-exact-antipodal-obstruction}.
$$

---

## 8. Theorem Target

**Theorem target: post-tail single-ledger proof budget.** Fix an exact-antipodal $M=3$ arclength-inverse chart and one support-complete ledger emitted by the tail execution row. Suppose:

1. the tail execution ledger has coefficient-box persistence and exports $E_{\mathrm{tail}}$;
2. any assimilated tail sheets export first and second variation envelopes, fixed $J$ sign strata, and $E_{\mathrm{sheet}}$;
3. every chart-preservation radius in $\rho_{\mathrm{chart}}$ is positive;
4. the weighted residual derivative has envelopes $L_R^{+}$ and $L_{\mathrm{cok}}^{+}$ on $B_\rho(x_0)$;
5. the Krawczyk range inequalities pass;
6. the cokernel audit and action compatibility rows pass on the same ledger.

Then the finite exact-antipodal $M=3$ row is a support-complete dynamics/action candidate on that ledger. Conversely, if the certified cokernel lower bound passes and higher exact-antipodal mode refinement fails, then the exact-antipodal $M=3$ chart is locally obstructed on that ledger.

Proof route:

1. the tail execution ledger removes unbounded omitted-tail force error;
2. positive chart radii keep root labels, tail statuses, noncollision, speed, equal-period gauge, action scale, curl, and discretization rows fixed;
3. Krawczyk range closure produces a range zero inside the certified chart ball;
4. the cokernel audit bounds the unreached residual components at that range zero;
5. action compatibility turns the fitted curvature scale into an action-derived scale row;
6. the obstruction lower bound is the contrapositive case when cokernel residual cannot be absorbed by nonlinear, root, discretization, or action errors.

---

## 9. Output Schema

A post-tail proof-budget run must emit:

| Field | Payload |
| --- | --- |
| `ledger_id` | exact root, memory, source-pair, endpoint, action, row-weight, and coefficient-box convention |
| `tail_import` | $E_{\mathrm{tail}}$, persistence status, $\mathcal{A}_{\eta}^{+}$, and tail primary status |
| `sheet_import` | $E_{\mathrm{sheet}}$, $L_R^{\mathrm{sheet}}$, fixed $J$ sign strata, or zero-sheet packet |
| `chart_radius` | all entries of $\rho_{\mathrm{chart}}$ and the limiting row |
| `derivative_envelope` | $L_R^{+}$, $L_{\mathrm{cok}}^{+}$, and included residual rows |
| `range_budget` | $\sigma_{\min}$, $Y$, $Z$, $\rho$, and $\rho_*$ |
| `cokernel_budget` | $c_0$, $\epsilon_C$, adjoint lower bounds if needed |
| `action_budget` | $\Gamma_B$, $D\Gamma_B$, curl score, inertia score, and fit/action score |
| `proof_errors` | $\epsilon_{\mathrm{disc}}$, $\epsilon_{\mathrm{root}}$, $\epsilon_{\Gamma}$, and row tolerances |
| `post_tail_score` | $\mathfrak{E}_{M3}^{\mathrm{post}}$ |
| `primary_status` | one status from Section 7 |

---

## 10. Current $M=3$ Reading

The current exact-antipodal $M=3$ data have not emitted this post-tail proof budget. The known row remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{not-retained}.
$$

If the tail ledger is solved next, this packet is the immediate downstream decision surface. It prevents a future lower residual from being overread: after tail closure, the row must satisfy the chart-radius, derivative-envelope, Krawczyk, cokernel, and action inequalities above before it becomes a support-complete dynamics/action candidate.
