# Support-Complete Newton Closure Certificate

Promotion status: `priority-only`. This packet gives the constructive counterpart to [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) and shares its adjoint audit trail with [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md). The obstruction certificate says when a support-complete exact-antipodal dynamics zero is locally impossible. This packet states what must be certified to promote a finite-mode continuation row from residual descent to a local dynamics-closure candidate. It may be implemented either as a Kantorovich certificate or as the sharper SVD/Krawczyk certificate below.

The certificate is local to one exact-antipodal arclength-inverse chart, one equal-period gauge convention, one source-pair policy, one memory ledger, and one weighted residual norm.

---

## 1. Range-Cokernel Split

Use the support-complete residual map

$$
\mathcal{F}_{\eta}(\alpha)
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{tan}}^{(\eta)}(\alpha)\\
\mathcal{R}_{K}^{(\eta)}(\alpha)
\end{bmatrix}
$$

on the gauge-reduced equal-period tangent space $X=T_{\alpha_0}\mathcal{M}_{\mathrm{ep}}$. In coordinates,

$$
\alpha=\alpha_0+Nu,
\qquad
u\in\mathbb{R}^n,
$$

where $N$ embeds the reduced coordinate vector into the full coefficient chart. Let

$$
A=D\mathcal{F}_{\eta}(\alpha_0):X\to\mathcal{E}_{\eta}.
$$

Equivalently, in reduced coordinates,

$$
A_N=D(\mathcal{F}_{\eta}\circ N)(0).
$$

Use the thin singular-value decomposition

$$
A_N=U_R\Sigma V^T,
$$

where $U_R$ spans the numerical range. Let

$$
P_{\mathrm{cok}}=I-U_RU_R^T
$$

project onto the same numerical cokernel used by the obstruction certificate, and set

$$
Q_{\mathrm{ran}}=I-P_{\mathrm{cok}}.
$$

The range equation is

$$
\mathcal{F}_{\mathrm{ran}}(\alpha)
=
Q_{\mathrm{ran}}\mathcal{F}_{\eta}(\alpha)=0.
$$

The cokernel equation is

$$
\mathcal{F}_{\mathrm{cok}}(\alpha)
=
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha)=0.
$$

Because the present collocation systems are overdetermined, these rows must be certified separately. Full column rank of $A$ is useful, but it proves only that the chosen coefficient variables have independent first-order effects. It does not prove that the cokernel residual can vanish.

The square range residual used by the constructive certificate is

$$
F_R(u)
=
U_R^T\mathcal{F}_{\eta}(\alpha_0+Nu).
$$

---

## 2. Right-Inverse Bound

Assume the projected derivative

$$
A_{\mathrm{ran}}
=
Q_{\mathrm{ran}}A:X\to\operatorname{ran}A
$$

has a certified right inverse $B$ on $\operatorname{ran}A$ with

$$
B A_{\mathrm{ran}}=I_X,
\qquad
\|B\|\le\beta.
$$

For the base range residual, define

$$
\eta_R
=
\left\|
B\mathcal{F}_{\mathrm{ran}}(\alpha_0)
\right\|.
$$

Let $\rho_{\mathrm{chart}}$ be the smallest certified radius from root/Jacobian barriers, adaptive-memory trust radius, noncollision floors, support floors, and tail-certificate persistence. On the ball $\|\delta\|\le\rho_{\mathrm{chart}}$, assume a Lipschitz derivative bound

$$
\left\|
B\left[
D\mathcal{F}_{\mathrm{ran}}(\alpha_0+\delta_1)
-
D\mathcal{F}_{\mathrm{ran}}(\alpha_0+\delta_2)
\right]
\right\|
\le
K_R\|\delta_1-\delta_2\|.
$$

Set

$$
h_R=K_R\eta_R.
$$

---

## 3. Range Newton Certificate

If

$$
h_R\le\frac{1}{2},
$$

then the Kantorovich radius for the range equation is

$$
r_R
=
\frac{
1-\sqrt{1-2h_R}
}{K_R}
$$

when $K_R>0$, with the limiting value

$$
r_R=\eta_R
$$

when $K_R=0$. If

$$
r_R\le\rho_{\mathrm{chart}},
$$

then there is a unique correction $\delta_R$ in the certified ball satisfying

$$
\mathcal{F}_{\mathrm{ran}}(\alpha_0+\delta_R)=0,
\qquad
\|\delta_R\|\le r_R.
$$

This proves only range closure. It does not yet prove exact-antipodal dynamics closure because the cokernel rows may still be nonzero.

---

## 4. Krawczyk Alternative

The sharper constructive row uses the same SVD split. Choose an approximate inverse

$$
C\approx \left[DF_R(0)\right]^{-1}.
$$

For the SVD-normalized range coordinates, the natural first choice is

$$
C=V\Sigma^{-1}.
$$

On a ball $\|u\|\le\rho$, define

$$
Y=\|CF_R(0)\|,
\qquad
Z=\sup_{\|u\|\le\rho}\|I-CDF_R(u)\|.
$$

If

$$
Y+Z\rho<\rho,
\qquad
Z<1,
$$

then the Krawczyk map encloses a unique solution $u_*$ in the ball with

$$
F_R(u_*)=0.
$$

This form is often better for the tri-binary solver because the same SVD data supplies both the range projector and the approximate inverse. It also makes the distinction sharp: full column rank gives $U_R,\Sigma,V$, while the inequalities above are the constructive existence certificate.

---

## 5. Cokernel Closure Row

After the range Newton correction, evaluate or interval-enclose

$$
c_R
=
\left\|
P_{\mathrm{cok}}
\mathcal{F}_{\eta}(\alpha_0+\delta_R)
\right\|.
$$

For a Krawczyk enclosure $X_*$, replace this point value by the interval audit

$$
\epsilon_C
=
\sup_{u\in X_*}
\left\|
P_{\mathrm{cok}}
\mathcal{F}_{\eta}(\alpha_0+Nu)
\right\|.
$$

Let $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$ be the residual-space tail error and let $\epsilon_{\mathrm{disc}}$ be the discretization projection error from [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md). A tolerance-level support-complete dynamics closure certificate requires either

$$
c_R
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
\le
\tau_{\mathrm{dyn}}.
$$

or, for a Krawczyk enclosure,

$$
\epsilon_C
+
\epsilon_{\mathrm{disc}}
\le
\tau_{\mathrm{dyn}},
$$

with $\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0$ under support-complete memory. If a tail is not excluded, the Krawczyk audit must add the tail residual envelope explicitly.

For an exact theorem target rather than a numerical branch certificate, replace this tolerance inequality by an interval or symbolic proof that

$$
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0+\delta_R)=0
$$

on the support-complete ledger.

If the cokernel row fails but the obstruction inequality in [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) also fails, the decision is not `open-antipodal-relaxation`. The correct decision is to refine mode number, grid, memory, tail certificates, and action scale.

---

## 6. Combined Closure Lemma

**Lemma target: support-complete Newton closure.** Fix a support-complete exact-antipodal chart and a base point $\alpha_0$. Suppose:

1. root/Jacobian, noncollision, support, and adaptive-memory trust radii give a positive $\rho_{\mathrm{chart}}$;
2. the force, $\Gamma_K$, action, variationality, and event rows are all evaluated on the same ledger;
3. $A_{\mathrm{ran}}$ has certified right-inverse bound $\beta$;
4. either the Kantorovich bounds $K_R,h_R,r_R$ pass, or the Krawczyk bounds $Y+Z\rho<\rho$ and $Z<1$ pass inside $\rho_{\mathrm{chart}}$;
5. the cokernel closure inequality holds at the range Newton correction or on the Krawczyk enclosure.

Then the finite-mode exact-antipodal row is a certified local dynamics-closure candidate within tolerance $\tau_{\mathrm{dyn}}$ on that support-complete ledger.

It is still not a full same-level tri-binary retained branch until the inventory, event, action, stability, observer-export, and decision-gate rows are populated.

---

## 7. Relationship To Obstruction

The obstruction and closure certificates bracket the decision:

$$
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}(\alpha_0)
\right\|
>
\frac{1}{2}L_{\mathrm{cok}}\rho^2
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
\quad
\Rightarrow
\quad
\text{local exact-antipodal zero excluded}.
$$

The constructive certificate instead seeks

$$
\mathcal{F}_{\mathrm{ran}}(\alpha_0+\delta_R)=0,
\qquad
\left\|
\mathcal{F}_{\mathrm{cok}}(\alpha_0+\delta_R)
\right\|
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
\le
\tau_{\mathrm{dyn}}.
$$

Between these two regimes lies the present useful but unretained state:

$$
\texttt{descent-without-closure}.
$$

This is the correct classification for rows that reduce $\mathcal{R}_K$ or $\mathcal{R}_{\mathrm{tan}}$ but do not yet certify memory completeness, action consistency, or cokernel closure.

---

## 8. Current $M=3$ Reading

The exact-antipodal $M=3$ data is promising but cannot yet satisfy this certificate. It has:

1. full restricted column rank in the emitted rank screen;
2. strong residual descent under clipped continuation;
3. root-front recovery under $\eta_{\max}=4.5$.

It lacks:

1. support-complete memory or a passed tail-exclusion certificate;
2. a finite tail-force error envelope for the unresolved support tail;
3. a certified range right-inverse bound on the support-complete ledger;
4. a range derivative Lipschitz bound or Krawczyk $Y,Z$ enclosure;
5. a range Newton correction recomputed after memory repair;
6. a cokernel closure row at the corrected point.

Therefore the status is

$$
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{descent-without-closure},
\qquad
\texttt{continue-exact-antipodal}.
$$

---

## 9. Required Output Fields

The next exact-antipodal support-complete solver packet should emit:

| Field | Required payload |
| --- | --- |
| `range_projector` | $Q_{\mathrm{ran}}$, $P_{\mathrm{cok}}$, singular values, and tolerance |
| `right_inverse_bound` | $\beta$ and construction of $B$ |
| `base_range_residual` | $\eta_R=\|B\mathcal{F}_{\mathrm{ran}}(\alpha_0)\|$ |
| `range_lipschitz_bound` | $K_R$ on the certified chart ball |
| `kantorovich_radius` | $h_R$, $r_R$, and whether $r_R\le\rho_{\mathrm{chart}}$ |
| `krawczyk_enclosure` | $C$, $Y$, $Z$, $\rho$, and whether $Y+Z\rho<\rho$ |
| `range_newton_correction` | full-precision $\delta_R$ and resulting range residual |
| `cokernel_closure_norm` | $c_R$ after the range correction |
| `cokernel_interval_audit` | $\epsilon_C$ over the Krawczyk enclosure, if used |
| `tail_and_disc_errors` | $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$ and $\epsilon_{\mathrm{disc}}$ |
| `dynamics_tolerance` | $\tau_{\mathrm{dyn}}$ and row-wise tolerance convention |
| `closure_decision` | `support-complete-dynamics-candidate`, `descent-without-closure`, `obstructed`, or `rerun-ledger` |

Failure/status codes:

$$
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{range-kantorovich-failed},
\qquad
\texttt{range-krawczyk-failed},
\qquad
\texttt{range-radius-exceeds-chart},
$$

$$
\texttt{cokernel-closure-failed},
\qquad
\texttt{descent-without-closure},
\qquad
\texttt{not-retained}.
$$
