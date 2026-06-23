# Support-Complete $M=3$ Tail Interval Enclosures

Promotion status: `priority-only`. This packet supplies the interval enclosures needed by [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md). It gives concrete formulas for $D_q$, $J_q$, endpoint signs, and Lipschitz constants on a tail slab in the exact-antipodal arclength-inverse Fourier chart. The arclength-cell lift of these nodewise enclosures is stated in [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md).

The packet is local to one coefficient enclosure, one equal-period arclength chart, one source-pair policy, one tail slab cover, and one residual norm. It does not retain a branch.

---

## 1. Slab Geometry In Arclength Coordinates

Fix a receiver node $\lambda_n$ and an ordered source pair $(i,j)$. For a tail slab

$$
Q_q=[a_q,b_q],
\qquad
4.5\le a_q<b_q\le5.5211575250+m_\eta,
$$

the delayed source arclength interval is

$$
\Lambda_{j,q}
=
\lambda_n-Q_q
=
[\lambda_n-b_q,\lambda_n-a_q]
\pmod{L_*}.
$$

If $\Lambda_{j,q}$ crosses the period cut, split it into finitely many non-wrapping intervals

$$
\Lambda_{j,q}
=
\bigcup_s\Lambda_{j,q}^{(s)}.
$$

All interval tests below are run on each non-wrapping piece and then unioned. A slab is certified only if every piece is certified.

The receiver point is fixed:

$$
\mathbf{y}_{i,n}
=
\mathbf{Y}_i(\lambda_n;\alpha).
$$

The source interval enclosures are

$$
\mathbf{Y}_{j,q}
\supset
\left\{
\mathbf{Y}_j(\lambda;\alpha):
\lambda\in\Lambda_{j,q}
\right\},
$$

$$
\mathbf{T}_{j,q}
\supset
\left\{
\mathbf{T}_j(\lambda;\alpha):
\lambda\in\Lambda_{j,q}
\right\},
$$

and, when derivative bounds are needed,

$$
\mathbf{K}_{j,q}
\supset
\left\{
\mathbf{K}_j(\lambda;\alpha):
\lambda\in\Lambda_{j,q}
\right\}.
$$

If coefficients are enclosed in a box $X_\alpha$, every interval above must contain the union over $\alpha\in X_\alpha$, not only the midpoint coefficient vector.

---

## 2. Fourier Interval Evaluation

Let the construction curve be

$$
\mathbf{Z}_j(\theta)
=
\mathbf{c}_{j,0}
+
\sum_{m=1}^{M}
\left(
\mathbf{a}_{j,m}\cos m\theta
+
\mathbf{b}_{j,m}\sin m\theta
\right).
$$

The arclength curve is

$$
\mathbf{Y}_j(\lambda)
=
\mathbf{Z}_j(\theta_j(\lambda)).
$$

On a source arclength interval $\Lambda$, first enclose the inverse phase:

$$
\Theta_j(\Lambda)
\supset
\{\theta_j(\lambda):\lambda\in\Lambda\}.
$$

The inverse phase is monotone while

$$
S_j(\theta)=\|\partial_\theta\mathbf{Z}_j(\theta)\|\ge s_0>0.
$$

For a non-wrapping interval $\Lambda=[\lambda_-,\lambda_+]$, a certified enclosure can be obtained by bracketing the endpoint phases $\theta_\pm$ from

$$
\lambda_\pm
=
\int_0^{\theta_\pm}S_j(\zeta)d\zeta,
$$

and setting

$$
\Theta_j(\Lambda)=[\theta_-,\theta_+],
$$

with interval residual margins for both endpoint solves. If the endpoint inverse solve is itself interval-valued, use the interval hull of the endpoint brackets.

For each Fourier mode, compute interval trigonometric enclosures

$$
C_m(\Theta)\supset\{\cos m\theta:\theta\in\Theta\},
\qquad
S_m(\Theta)\supset\{\sin m\theta:\theta\in\Theta\}.
$$

These intervals should be exact hulls on the slab, not endpoint-only estimates. Split $\Theta$ whenever $m\Theta$ crosses a multiple of $\pi/2$ for sine or cosine, or whenever the interval spans a full $2\pi$ period.

Then

$$
\mathbf{Y}_{j,q}
\subseteq
\mathbf{c}_{j,0}
+
\sum_{m=1}^{M}
\left(
\mathbf{a}_{j,m}C_m(\Theta_j)
+
\mathbf{b}_{j,m}S_m(\Theta_j)
\right),
$$

with outward rounding and coefficient intervals if $X_\alpha$ is a box. The same evaluation gives

$$
\partial_\theta\mathbf{Z}_j(\Theta)
\subseteq
\sum_{m=1}^{M}
m\left(
-\mathbf{a}_{j,m}S_m(\Theta)
+
\mathbf{b}_{j,m}C_m(\Theta)
\right),
$$

and

$$
\partial_{\theta\theta}\mathbf{Z}_j(\Theta)
\subseteq
-
\sum_{m=1}^{M}
m^2\left(
\mathbf{a}_{j,m}C_m(\Theta)
+
\mathbf{b}_{j,m}S_m(\Theta)
\right).
$$

The tangent and curvature enclosures use

$$
\mathbf{T}_j
=
\frac{\partial_\theta\mathbf{Z}_j}{S_j},
\qquad
\mathbf{K}_j
=
\frac{(I-\mathbf{T}_j\mathbf{T}_j^T)\partial_{\theta\theta}\mathbf{Z}_j}{S_j^2},
$$

with the speed interval $S_j(\Theta)$ bounded away from zero. If interval dependency makes $S_j$ or $\mathbf{T}_j$ too wide, subdivide $\Theta$ and re-evaluate. A tail certificate may not pass with a tangent enclosure that was normalized by an interval containing zero.

For a pure $M=3$ vector Fourier coefficient ball with Euclidean coefficient radius $\rho_i$ for one site, the crude but useful coefficient inflations are

$$
\|\delta\mathbf{Z}_i\|_{C^0}
\le
\sqrt{3}\rho_i,
$$

$$
\|\partial_\theta\delta\mathbf{Z}_i\|_{C^0}
\le
\sqrt{14}\rho_i,
$$

and

$$
\|\partial_{\theta\theta}\delta\mathbf{Z}_i\|_{C^0}
\le
\sqrt{98}\rho_i.
$$

These constants come from the mode weights $1^2+2^2+3^2=14$ and $1^4+2^4+3^4=98$, with separate sine/cosine site coefficients absorbed into the declared coefficient norm. If the solver uses a different normalization, it must emit the corresponding coefficient-to-$C^k$ operator norms explicitly.

---

## 3. Distance Enclosure

Define the interval separation vector

$$
\mathbf{R}_q
=
\mathbf{y}_{i,n}-\mathbf{Y}_{j,q}.
$$

A direct squared-distance enclosure is

$$
S_q
\supset
\left\{
\mathbf{R}\cdot\mathbf{R}:
\mathbf{R}\in\mathbf{R}_q
\right\}.
$$

Then

$$
D_q
=
[D_q^-,D_q^+]
=
\left[
\sqrt{\max\{0,S_q^-\}},
\sqrt{S_q^+}
\right].
$$

A sharper enclosure may be obtained by center-radius form. Let $\mathbf{R}_q=\mathbf{r}_q+\Delta_q$ with component radii $\boldsymbol{\rho}_q$ and total radius

$$
\rho_q=\|\boldsymbol{\rho}_q\|_2.
$$

Then

$$
D_q^-
=
\max\{0,\|\mathbf{r}_q\|-\rho_q\},
\qquad
D_q^+
=
\|\mathbf{r}_q\|+\rho_q.
$$

Distance exclusion passes if

$$
D_q^+<a_q-\epsilon_G
\qquad\text{or}\qquad
D_q^->b_q+\epsilon_G.
$$

---

## 4. Unit-Separation And Jacobian Enclosure

For Jacobian tests, the unit separation must be enclosed independently of the root equation. On a slab, define

$$
\widehat{\mathbf{R}}(\eta)
=
\frac{
\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)
}{
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)\|
}.
$$

If $D_q^-\le d_{\mathrm{hat}}$, where $d_{\mathrm{hat}}>0$ is the normalization floor, subdivide the slab or mark the Jacobian test uncertified. Otherwise enclose

$$
\widehat{\mathbf{R}}_q
\supset
\left\{
\frac{\mathbf{R}}{\|\mathbf{R}\|}:
\mathbf{R}\in\mathbf{R}_q
\right\}.
$$

The conservative center-radius enclosure is

$$
\widehat{\mathbf{R}}_q
\subset
\frac{\mathbf{r}_q}{\|\mathbf{r}_q\|}
+
B\left(
0,
\frac{2\rho_q}{D_q^-}
\right),
$$

valid when $\rho_q<D_q^-$. Tighter component intervals may be computed by interval division using the norm interval $D_q$.

The Jacobian interval is

$$
J_q
=
[J_q^-,J_q^+]
\supset
1-\mathbf{T}_{j,q}\cdot\widehat{\mathbf{R}}_q.
$$

Monotonicity passes if

$$
J_q^->\epsilon_J
\qquad\text{or}\qquad
J_q^+<-\epsilon_J.
$$

Because

$$
\partial_\eta G_{ij,n}=-J_{ij,n},
$$

the same interval supplies a Lipschitz constant

$$
L_q
=
\max\{|J_q^-|,\ |J_q^+|\}.
$$

When $\widehat{\mathbf{R}}_q$ cannot be certified, the fallback bound

$$
L_q=2
$$

is valid because $\|\mathbf{T}_j\|=1$ and $\|\widehat{\mathbf{R}}\|=1$ wherever the separation is nonzero.

---

## 5. Endpoint And Point Values

For endpoint signs, evaluate

$$
G_{ij,n}(a_q)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-a_q)\|-a_q,
$$

and

$$
G_{ij,n}(b_q)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-b_q)\|-b_q,
$$

with point-evaluation error intervals

$$
G(a_q)\in[\underline{G}_a,\overline{G}_a],
\qquad
G(b_q)\in[\underline{G}_b,\overline{G}_b].
$$

The endpoint signs agree with margin if either

$$
\underline{G}_a>\epsilon_G
\quad\text{and}\quad
\underline{G}_b>\epsilon_G,
$$

or

$$
\overline{G}_a<-\epsilon_G
\quad\text{and}\quad
\overline{G}_b<-\epsilon_G.
$$

For a Lipschitz point test, choose $c_q\in Q_q$ and compute

$$
G(c_q)\in[\underline{G}_c,\overline{G}_c].
$$

The point gap is

$$
g_c
=
\min\{|\underline{G}_c|,\ |\overline{G}_c|\}
$$

if $0\notin[\underline{G}_c,\overline{G}_c]$, and $g_c=0$ otherwise. With

$$
\Delta_q=\max\{c_q-a_q,\ b_q-c_q\},
$$

the slab is root-free if

$$
g_c>L_q\Delta_q+\epsilon_G.
$$

---

## 6. One-Root Brackets

If endpoint intervals have opposite strict sign and $0\notin J_q$, the slab contains exactly one root:

$$
\overline{G}_a<-\epsilon_G
\quad\text{and}\quad
\underline{G}_b>\epsilon_G,
$$

or the same condition with $a_q$ and $b_q$ reversed. The monotone-Jacobian row supplies uniqueness.

The isolating bracket $I_u=(\eta_u^-,\eta_u^+)$ must be refined until

$$
\eta_u^+-\eta_u^-<\epsilon_\eta,
\qquad
\inf_{\eta\in I_u}|J(\eta)|>J_{\mathrm{tail}},
$$

and the complement of all old and new brackets has a positive gap margin:

$$
\inf_{\eta\in E_{ij,n}^{+}}|G_{ij,n}(\eta)|>\epsilon_G.
$$

The exact-antipodal tail ledger then matches each bracket against its antipodal image as required by [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md).

---

## 7. Coefficient-Box Extension

For Krawczyk or continuation use, the slab certificate must persist on a coefficient ball

$$
X_\alpha=\{\alpha_0+\delta:\|\delta\|\le\rho\}.
$$

Let $V_p(\lambda)=\partial_{\alpha^p}\mathbf{Y}(\lambda;\alpha_0)$ and suppose

$$
\left\|
\sum_p\delta_pV_p
\right\|_{C^0(\Lambda)}
\le
E_Y(\rho),
$$

with analogous bounds $E_T(\rho)$ and $E_K(\rho)$ for tangent and curvature. Then inflate the midpoint intervals by

$$
\mathbf{Y}_{j,q}(X_\alpha)
\subset
\mathbf{Y}_{j,q}(\alpha_0)+B(0,E_Y(\rho)),
$$

$$
\mathbf{T}_{j,q}(X_\alpha)
\subset
\mathbf{T}_{j,q}(\alpha_0)+B(0,E_T(\rho)),
$$

and similarly for curvature if the derivative bound is used. These envelopes must include the arclength-inverse phase derivative terms from [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md). A fixed-construction-phase inflation is not a valid arclength-inverse tail certificate.

The trust-radius row passes only if every slab keeps the same status under this inflated interval evaluation. Otherwise the tail certificate is pointwise only and cannot support a Krawczyk ball.

---

## 8. Output Schema

A support-tail interval run should emit:

| Field | Payload |
| --- | --- |
| `tail_interval` | $(4.5,5.5211575250+m_\eta]$ or the declared support-bound interval |
| `slab_cover` | list of $Q_q=[a_q,b_q]$ by source pair and node |
| `phase_intervals` | $\Lambda_{j,q}$ and $\Theta_{j,q}$ after period splitting |
| `speed_floor` | lower bound for $S_j$ on every source interval |
| `distance_bounds` | $D_q^-,D_q^+$ and exclusion status |
| `jacobian_bounds` | $J_q^-,J_q^+$ and monotonicity status |
| `endpoint_signs` | interval values for $G(a_q)$ and $G(b_q)$ |
| `lipschitz_point_tests` | $c_q$, $G(c_q)$, $L_q$, and $\Delta_q$ when used |
| `root_brackets` | isolating intervals, $J$ floors, and excluded-gap margins |
| `antipodal_pairing` | matched bracket pairs and tolerance |
| `coefficient_box` | pointwise or ball-persistent certificate radius |
| `tail_status` | `tail-exclusion-restored`, nodewise `tail-roots-assimilated`, or `tail-certificate-failure`; nodewise assimilation must still pass the mesh lift before it becomes `tail-root-sheet-assimilated` |

---

## 9. Current $M=3$ Reading

The current $\rho=0.8$ exact-antipodal $M=3$ row has the numerical support interval that makes this packet necessary:

$$
\eta_{\mathrm{act}}\approx4.4058154936,
\qquad
\eta_{\mathrm{mem}}=4.5,
\qquad
2r_{\max}\approx5.5211575250.
$$

The branch remains

$$
\texttt{active-window-only}
$$

until the interval formulas above certify the tail empty or assimilate every tail root on the same source-pair policy. A pointwise plot or a root search without interval distance, Jacobian, endpoint, and antipodal-pairing margins is not a support-complete proof.
