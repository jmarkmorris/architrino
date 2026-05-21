# Bounded Speed Factor Root-Sheet Certificate

Promotion status: `priority-only`. This packet is the bounded-speed successor to the fixed-speed root-sheet formulas in [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). It keeps the arclength curves as geometric objects, but moves every active root, tail sheet, derivative envelope, and Krawczyk input onto the causal-time clock defined by the bounded speed factor. Its second-variation layer is supplied by [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md).

The fixed-speed sheet theorem remains valid only as the special case $\nu_i\equiv1$.

---

## 1. Causal-Time Sheet Coordinates

Let the support curves be arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1.
$$

For a bounded speed factor $\nu_i$ define the dimensionless causal-time coordinate

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
0<\nu_-\le\nu_i\le\nu_+.
$$

Write its inverse as

$$
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}=\nu_i(\Lambda_i(u)).
$$

All root sheets must use a common causal-time receiver node $u$, not a shared arclength phase. For a source pair $(i,j)$ the delayed source phase is

$$
\lambda_i=\Lambda_i(u),
\qquad
\lambda_j^-=\Lambda_j(u-\eta).
$$

The bounded-speed root function is

$$
G_{ij}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta.
$$

This is the root equation that replaces the fixed-speed expression

$$
\left\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\right\|-\eta.
$$

---

## 2. Root Jacobian And Sheet Slope

For a retained root sheet $\eta_u(u)$, define

$$
\mathbf{R}_u
=
\mathbf{Y}_i(\lambda_i)-\mathbf{Y}_j(\lambda_j^-),
\qquad
\widehat{\mathbf{R}}_u=\frac{\mathbf{R}_u}{\eta_u},
$$

and

$$
\mathbf{T}_i=\mathbf{Y}_i'(\lambda_i),
\qquad
\mathbf{T}_j^-=\mathbf{Y}_j'(\lambda_j^-),
\qquad
\nu_j^-=\nu_j(\lambda_j^-).
$$

At fixed receiver time $u$,

$$
\partial_\eta\lambda_j^-=-\nu_j^-.
$$

Hence

$$
\partial_\eta G_{ij}
=
\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u-1
=
-J_{ij}^{\nu},
$$

where

$$
J_{ij}^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u.
$$

At fixed delay $\eta$,

$$
\partial_uG_{ij}
=
\widehat{\mathbf{R}}_u\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right).
$$

Therefore a smooth retained sheet satisfies

$$
\frac{d\eta_u}{du}
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{
J_{ij}^{\nu}
}.
$$

If the receiver curve is still sampled by receiver arclength $\lambda_i$ rather than causal time $u$, then $du/d\lambda_i=1/\nu_i$ and the same sheet has slope

$$
\frac{d\eta_u}{d\lambda_i}
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\mathbf{T}_i-\frac{\nu_j^-}{\nu_i}\mathbf{T}_j^-
\right)
}{
J_{ij}^{\nu}
}.
$$

The sheet is admissible only on a fixed Jacobian-sign stratum:

$$
\zeta_uJ_{ij}^{\nu}\ge J_0>0,
\qquad
\zeta_u\in\{+1,-1\}.
$$

If the sign label is missing, the derivative status is

$$
\texttt{bounded-speed-root-sheet-jacobian-sign-open}.
$$

---

## 3. Coefficient Variation At Fixed Causal Time

Let $a$ be the geometric coefficient vector and let $b$ be the speed-factor coefficient vector. A bounded-speed chart direction is

$$
v=(\delta a,\delta b).
$$

Write

$$
\xi_i(\lambda)=D_v\mathbf{Y}_i(\lambda),
\qquad
\rho_i(\lambda)=D_v\nu_i(\lambda).
$$

The variation of the clock at fixed arclength is

$$
\phi_{v,i}(\lambda)
=
D_v\chi_i(\lambda)
=
-\int_0^\lambda
\frac{\rho_i(\xi)}{\nu_i(\xi)^2}
d\xi.
$$

At fixed causal time $u$ the inverse phase variation is

$$
D_v\Lambda_i(u)
=
-\nu_i(\lambda_i)\phi_{v,i}(\lambda_i).
$$

Define the clock-corrected shape variation

$$
\Xi_i(u)
=
\xi_i(\lambda_i)
-
\nu_i(\lambda_i)\mathbf{T}_i(\lambda_i)\phi_{v,i}(\lambda_i).
$$

Similarly,

$$
\Xi_j^-(u,\eta)
=
\xi_j(\lambda_j^-)
-
\nu_j^-\mathbf{T}_j^-\phi_{v,j}(\lambda_j^-).
$$

At fixed receiver time $u$, differentiating the sheet equation gives

$$
D_v\eta_u
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\Xi_i-\Xi_j^-
\right)
}{
J_{ij}^{\nu}
}.
$$

The total delayed source variation on the sheet is

$$
D_v\lambda_j^-
=
-\nu_j^-\phi_{v,j}^-
-\nu_j^-D_v\eta_u,
$$

and therefore

$$
D_v\mathbf{Y}_j^-
=
\xi_j^-
-
\nu_j^-\mathbf{T}_j^-\phi_{v,j}^-
-
\nu_j^-\mathbf{T}_j^-D_v\eta_u.
$$

Consequently,

$$
D_v\mathbf{R}_u
=
\Xi_i-\Xi_j^-
+
\nu_j^-\mathbf{T}_j^-D_v\eta_u,
$$

and

$$
D_v\widehat{\mathbf{R}}_u
=
\frac{
\left(I-\widehat{\mathbf{R}}_u\widehat{\mathbf{R}}_u^T\right)
D_v\mathbf{R}_u
}{
\eta_u
}.
$$

The delayed tangent variation is

$$
D_v\mathbf{T}_j^-
=
(D_v\mathbf{T}_j)^-
+
\mathbf{K}_j^-D_v\lambda_j^-.
$$

The delayed speed-factor variation is

$$
D_v\nu_j^-
=
\upsilon_j^-
+
(\nu_j')^-D_v\lambda_j^-.
$$

Thus the bounded-speed Jacobian variation is

$$
D_vJ_{ij}^{\nu}
=
-
D_v\nu_j^-\,
\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u
-
\nu_j^-D_v\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u
-
\nu_j^-\mathbf{T}_j^-\cdot D_v\widehat{\mathbf{R}}_u.
$$

Setting $\nu_i\equiv1$ and $\rho_i\equiv0$ collapses these formulas to the fixed-speed root-sheet variation theorem.

---

## 4. Bounded-Speed Force Derivative

For a retained root sheet, define the force contribution

$$
\mathbf{f}_u^{\nu}(u)
=
\frac{\sigma_i\sigma_j}
{\eta_u(u)^2|J_{ij}^{\nu}(u)|}
\widehat{\mathbf{R}}_u(u).
$$

On a fixed sign stratum for $J_{ij}^{\nu}$,

$$
D_v\mathbf{f}_u^{\nu}
=
\frac{\sigma_i\sigma_j}
{\eta_u^2|J_{ij}^{\nu}|}
\left[
D_v\widehat{\mathbf{R}}_u
-
\left(
2\frac{D_v\eta_u}{\eta_u}
+
\frac{D_vJ_{ij}^{\nu}}{J_{ij}^{\nu}}
\right)
\widehat{\mathbf{R}}_u
\right].
$$

The support-complete force derivative must include both geometric and speed-factor directions:

$$
D_v\widetilde{\mathbf{F}}_i^{\nu}(u)
=
\sum_{u'\in\mathcal{A}_{i,u}^{\nu,+}}
D_v\mathbf{f}_{u'}^{\nu}(u).
$$

If a derivative envelope was assembled with fixed-speed sheets after $\nu_i$ was promoted to a branch variable, the status is

$$
\texttt{bounded-speed-root-derivative-stale}.
$$

---

## 5. Tail And Krawczyk Consequences

A bounded-speed support-tail certificate must enclose roots of $G_{ij}(u,\eta)$ on causal-time cells

$$
u\in U_n,
\qquad
\eta\in Q_q.
$$

Its persistence radius must include variations of:

$$
\Lambda_i(u),
\quad
\Lambda_j(u-\eta),
\quad
\nu_j^-,
\quad
J_{ij}^{\nu},
\quad
\phi_{v,i},
\quad
\phi_{v,j}^-.
$$

The Krawczyk derivative envelope therefore has the form

$$
L_R^{\nu,+}
=
L_R^{\mathrm{geom}}
+
L_R^{\mathrm{speed}}
+
L_R^{\mathrm{sheet},\nu}
+
L_R^{\mathrm{action},\nu}
+
L_R^{\mathrm{proj},\nu}.
$$

The chart radius is bounded by the old geometric margins and by the new speed margins:

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_d,
\rho_s,
\rho_{\nu_-},
\rho_{\nu_+},
\rho_{\nu'},
\rho_{\mathrm{period}}^{\nu},
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

Here $\rho_{\nu_-}$ and $\rho_{\nu_+}$ keep the speed band open, $\rho_{\nu'}$ controls the tangential acceleration row, and $\rho_{\mathrm{period}}^{\nu}$ preserves the equal physical period

$$
H_i=\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}.
$$

If any one of these new envelopes is missing, a bounded-speed proof budget must return

$$
\texttt{bounded-speed-krawczyk-envelope-open}.
$$

---

## 6. Output Schema

A bounded-speed root-sheet packet must emit:

| Field | Payload |
| --- | --- |
| `clock_map` | $\chi_i$, $\Lambda_i$, period $H_i$, and speed-band margins |
| `root_sheet` | $G_{ij}(u,\eta)$, retained brackets, causal-time cells, and delay floors |
| `jacobian` | $J_{ij}^{\nu}=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$, sign label, and floor |
| `sheet_slope` | $d\eta_u/du$ and mesh-lift bounds |
| `coefficient_variations` | $\phi_{v,i}$, $\Xi_i$, $D_v\eta_u$, $D_vJ_{ij}^{\nu}$, and force derivatives |
| `second_root_variations` | $D^2\eta^\nu$, $D^2J^\nu$, force-weight Hessians, and $L_R^{\mathrm{sheet},\nu}$ from [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md) |
| `tail_persistence` | coefficient-box margins for causal-time tail slabs |
| `krawczyk_envelope` | $L_R^{\nu,+}$ and $\rho_{\mathrm{chart}}^{\nu}$ |
| `status` | `bounded-speed-root-sheet-certified`, fixed-speed special case, or first failed row |

Current status:

$$
\texttt{bounded-speed-root-sheet-open}.
$$
