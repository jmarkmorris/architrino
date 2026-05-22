# Support-Complete $M=3$ Tail Margin Sensitivity

Promotion status: `priority-only`. This packet supplies the coefficient-box sensitivity formulas behind the support-tail Newton and execution ledgers. It is the missing bridge from pointwise tail predicates to a Krawczyk/master-eligible tail radius $\rho_{\mathrm{tail}}$.

It complements [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md), [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md), and [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md).

---

## 1. Fixed-Delay Tail Variations

On a tail cell, the root function is evaluated at fixed $(\lambda,\eta)$:

$$
G(\lambda,\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda;\alpha)-\mathbf{Y}_j(\lambda-\eta;\alpha)\|
-\eta.
$$

Let

$$
\mathbf{R}
=
\mathbf{Y}_i(\lambda;\alpha)-\mathbf{Y}_j(\lambda-\eta;\alpha),
\qquad
r=\|\mathbf{R}\|,
\qquad
\widehat{\mathbf{R}}=\frac{\mathbf{R}}{r}.
$$

For a reduced coefficient direction $v$, write

$$
\xi_i(\lambda)=D_v\mathbf{Y}_i(\lambda),
\qquad
\xi_j^- = D_v\mathbf{Y}_j(\lambda-\eta).
$$

Because this is a fixed-delay tail predicate, not a retained root sheet, there is no $D_v\eta$ term. The first variation is

$$
D_vG
=
\widehat{\mathbf{R}}\cdot(\xi_i-\xi_j^-).
$$

If

$$
\|\xi_i-\xi_j^-\|\le \Lambda_Y\|v\|,
$$

then

$$
|D_vG|\le\Lambda_Y\|v\|.
$$

Thus a coefficient ball of radius $\rho$ inflates the scalar root-function interval by

$$
E_G(\rho)\le \Lambda_Y\rho+\frac12\Lambda_{G,2}\rho^2,
$$

where $\Lambda_{G,2}$ is a second-variation or interval automatic-differentiation bound.

---

## 2. Jacobian Sensitivity

The Jacobian is

$$
J
=
1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}},
\qquad
\mathbf{T}_j^-=\mathbf{T}_j(\lambda-\eta;\alpha).
$$

At fixed $(\lambda,\eta)$,

$$
D_v\widehat{\mathbf{R}}
=
\frac{
\left(I-\widehat{\mathbf{R}}\widehat{\mathbf{R}}^T\right)
(\xi_i-\xi_j^-)
}{r},
$$

and

$$
D_vJ
=
-
(D_v\mathbf{T}_j)^-\cdot\widehat{\mathbf{R}}
-
\mathbf{T}_j^-\cdot D_v\widehat{\mathbf{R}}.
$$

If

$$
\|(D_v\mathbf{T}_j)^-\|\le\Lambda_T\|v\|,
\qquad
r\ge r_0>0,
$$

then

$$
|D_vJ|
\le
\left(
\Lambda_T+\frac{\Lambda_Y}{r_0}
\right)\|v\|.
$$

Set

$$
\Lambda_J
=
\Lambda_T+\frac{\Lambda_Y}{r_0}.
$$

The coefficient-box Jacobian inflation is

$$
E_J(\rho)
\le
\Lambda_J\rho+\frac12\Lambda_{J,2}\rho^2.
$$

The fixed sign stratum persists when

$$
E_J(\rho)<J_{\min}-\epsilon_J.
$$

This row supplies the coefficient-box part of the status

$$
\texttt{root-sheet-jacobian-sign-stratum-open}
$$

when it fails for an assimilated tube.

---

## 3. Newton-Image Sensitivity

For a Newton exclusion row with center $\eta_c$, the scalar image is

$$
N(\alpha)
=
\eta_c+\frac{G(\eta_c;\alpha)}{J(Q;\alpha)}.
$$

On a fixed $J$ sign interval with

$$
|J|\ge J_0>0,
$$

the first variation of the quotient satisfies

$$
\left|
D_v\left(\frac{G}{J}\right)
\right|
\le
\frac{|D_vG|}{J_0}
+
\frac{|G|\,|D_vJ|}{J_0^2}.
$$

If

$$
|G|\le G_{\max},
$$

then

$$
|D_vN|
\le
\left(
\frac{\Lambda_G}{J_0}
+
\frac{G_{\max}\Lambda_J}{J_0^2}
\right)\|v\|.
$$

Define

$$
L_{\mathrm{Newt},c}^{\alpha}
=
\frac{\Lambda_G}{J_0}
+
\frac{G_{\max}\Lambda_J}{J_0^2}.
$$

If $m_{\mathrm{Newt}}(c)$ is the disjointness margin from the tail Newton certificate, then a sufficient coefficient-box persistence radius is

$$
\rho_{\mathrm{Newt},c}
=
\frac{m_{\mathrm{Newt}}(c)-e_{\mathrm{Newt}}(c)}
{L_{\mathrm{Newt},c}^{\alpha}},
$$

provided the numerator is positive. If the numerator is nonpositive, the Newton exclusion is pointwise only.

---

## 4. Krawczyk-Tube Sensitivity

For a predicted root tube, write

$$
H(\lambda,z;\alpha)
=
G(\lambda,\eta_p(\lambda)+z;\alpha),
\qquad
z\in Z=[-w,w].
$$

The scalar Krawczyk image is

$$
K_Z(\alpha)
=
-C\,H(I,0;\alpha)
+
\left(1+C\,J(I,Z;\alpha)\right)Z.
$$

Let

$$
|C|\le C_0,
\qquad
|Z|\le w,
$$

and suppose

$$
|D_vH(I,0)|\le \Lambda_H\|v\|,
\qquad
|D_vJ(I,Z)|\le \Lambda_J^{\mathrm{tube}}\|v\|.
$$

Then the Krawczyk image sensitivity is bounded by

$$
d_{\mathrm{H}}\big(K_Z(\alpha),K_Z(\alpha_0)\big)
\le
\left(
C_0\Lambda_H
+
C_0w\Lambda_J^{\mathrm{tube}}
\right)\|\alpha-\alpha_0\|,
$$

where $d_{\mathrm{H}}$ is interval Hausdorff distance. Define

$$
L_{\mathrm{Kraw},u}^{\alpha}
=
C_0\Lambda_H
+
C_0w\Lambda_J^{\mathrm{tube}}.
$$

If

$$
m_{\mathrm{Kraw}}(u)
=
\operatorname{dist}(K_Z,\partial Z),
$$

then a sufficient coefficient-box persistence radius is

$$
\rho_{\mathrm{Kraw},u}
=
\frac{m_{\mathrm{Kraw}}(u)-e_{\mathrm{Kraw}}(u)}
{L_{\mathrm{Kraw},u}^{\alpha}},
$$

with positive numerator required.

---

## 5. Tail Radius Assembly

The coefficient-box tail radius exported to the post-tail proof budget is

$$
\rho_{\mathrm{tail}}
=
\min
\left\{
\rho_{\emptyset,c},
\rho_{\mathrm{tube},u},
\rho_{\mathrm{Newt},c},
\rho_{\mathrm{Kraw},u}
\right\},
$$

where the minimum is over the selected predicates in the terminal tail ledger. The empty and tube radii from non-Newton predicates have the same form:

$$
\rho_{\emptyset,c}
=
\frac{m_{\emptyset}(c)-e_{\emptyset}(c)}
{L_{\emptyset,c}^{\alpha}},
\qquad
\rho_{\mathrm{tube},u}
=
\frac{m_{\mathrm{root}}(u)-e_{\mathrm{tube}}(u)}
{L_{\mathrm{tube},u}^{\alpha}}.
$$

The exported radius is valid only if every selected numerator is positive and every selected predicate uses arclength-inverse coefficient-box variation. A fixed construction-phase bound leaves the status

$$
\texttt{tail-certificate-pointwise-only}.
$$

---

## 6. Theorem Target

**Theorem target: tail margin persistence.** Fix a terminal support-tail execution ledger at $\alpha_0$. Suppose every terminal predicate has a positive point margin, every associated interval object has the coefficient sensitivity bounds above, and every selected persistence radius is positive. Then for every $\alpha$ in the ball

$$
\|\alpha-\alpha_0\|
\le
\rho_{\mathrm{tail}},
$$

the terminal tail statuses remain unchanged. Empty cells remain empty, Krawczyk tubes remain included, Jacobian sign strata remain fixed, and the same support-complete root ledger is valid throughout the coefficient ball.

Proof route:

1. fixed-delay variations give Lipschitz envelopes for $G$ and $J$;
2. quotient variation gives a Lipschitz envelope for interval Newton images;
3. affine image variation gives a Lipschitz envelope for Krawczyk tube images;
4. positive margin minus certified error divided by coefficient sensitivity gives a safe persistence radius for each predicate;
5. the minimum of those radii preserves every selected predicate at once.

---

## 7. Output Schema

A tail margin-sensitivity run must emit:

| Field | Payload |
| --- | --- |
| `fixed_delay_variation` | $\Lambda_Y$, $\Lambda_G$, and second-variation bound for $G$ |
| `jacobian_variation` | $\Lambda_T$, $r_0$, $\Lambda_J$, and $E_J(\rho)$ |
| `newton_sensitivity` | $G_{\max}$, $J_0$, $L_{\mathrm{Newt},c}^{\alpha}$, and $\rho_{\mathrm{Newt},c}$ |
| `krawczyk_sensitivity` | $C_0$, $w$, $\Lambda_H$, $\Lambda_J^{\mathrm{tube}}$, $L_{\mathrm{Kraw},u}^{\alpha}$, and $\rho_{\mathrm{Kraw},u}$ |
| `tail_radius` | $\rho_{\mathrm{tail}}$ and limiting predicate |
| `persistence_status` | `coefficient-box`, `tail-certificate-pointwise-only`, or first failed sensitivity row |

---

## 8. Current $M=3$ Reading

No tail margin-sensitivity run has been emitted for the current $\rho=0.8$ exact-antipodal $M=3$ row. The current mathematical status remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

This packet states the exact calculation that turns a successful pointwise tail subdivision into a coefficient-box certificate. Without it, even a clean pointwise tail run cannot feed the post-tail Krawczyk budget or the master retention theorem.
