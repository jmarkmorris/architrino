# Support-Complete $M=3$ Tail Newton Certificate

Promotion status: `priority-only`. This packet adds interval Newton and scalar Krawczyk tests to the exact-antipodal $M=3$ support-tail certificate stack. It strengthens [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), feeds [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md), supplies sharper root-tube data for [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), and relies on [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md) for coefficient-box persistence radii.

It does not retain a branch. Its purpose is to make the support-tail interval

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta]
$$

more tractable by turning ambiguous slabs into either Newton-excluded cells or certified one-root tubes.

---

## 1. Nodewise Scalar Newton Test

Fix a receiver node $\lambda_n$, a required ordered source pair $(i,j)$, and a tail slab

$$
Q=[a,b]\subset T_{\mathrm{tail}}.
$$

The nodewise root equation is

$$
G_n(\eta)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)\|
-\eta.
$$

Its derivative is

$$
G_n'(\eta)=-J_n(\eta),
$$

where

$$
J_n(\eta)
=
1-\mathbf{T}_j(\lambda_n-\eta)\cdot\widehat{\mathbf{R}}_{ij,n}(\eta).
$$

Let

$$
J_Q=[J_Q^-,J_Q^+]
\supset
\{J_n(\eta):\eta\in Q\}.
$$

The Newton row is available only when

$$
0\notin J_Q.
$$

Choose a center $c\in Q$ and compute an interval value

$$
G_n(c)\in[\underline{G}_c,\overline{G}_c].
$$

Since $G_n'=-J_n$, the interval Newton image is

$$
N_Q(c)
=
c+\frac{G_n(c)}{J_Q}.
$$

The signs and division are interval operations with outward rounding. The Newton-exclusion status is

$$
\texttt{tail-slab-empty-newton}
$$

when

$$
N_Q(c)\cap Q=\varnothing.
$$

The proof is the ordinary interval Newton exclusion theorem: if a zero existed in $Q$, it would lie in the interval Newton image.

---

## 2. Nodewise One-Root Refinement

If endpoint signs bracket a zero and the Jacobian interval excludes zero,

$$
\overline{G}_a<-\epsilon_G
\quad\text{and}\quad
\underline{G}_b>\epsilon_G,
$$

or the same condition with signs reversed, then $Q$ contains exactly one root. The monotone-Jacobian row gives uniqueness; the intermediate value theorem gives existence.

The interval Newton row then refines the isolating bracket:

$$
Q^{(k+1)}
=
Q^{(k)}\cap N_{Q^{(k)}}(c_k),
\qquad
c_k\in Q^{(k)}.
$$

The refinement passes when the final interval $I_u=[\eta_u^-,\eta_u^+]$ satisfies

$$
\eta_u^+-\eta_u^-<\epsilon_\eta,
$$

and

$$
\inf_{\eta\in I_u}|J_n(\eta)|>J_{\mathrm{tail}}.
$$

The nodewise Newton root status is

$$
\texttt{tail-root-bracketed-newton}.
$$

This is still not a curve-level root sheet. It must pass the parametric cell test below or the mesh-lift theorem.

---

## 3. Parametric Cell Krawczyk Test

For an arclength cell $I_n$ and slab $Q$, define

$$
G(\lambda,\eta)
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|
-\eta.
$$

This is one scalar equation in two displayed variables. The valid support-tail object is not an isolated point in $(\lambda,\eta)$. It is a parameterized delay certificate: for each $\lambda$ in the receiver cell, and for each $\alpha$ in the coefficient box when persistence is claimed, there is either no delay root in the tested delay interval or exactly one delay root $\eta_u(\lambda;\alpha)$ in a retained tube.

The partial derivatives are

$$
G_\lambda
=
\widehat{\mathbf{R}}\cdot
\left(
\mathbf{T}_i-\mathbf{T}_j^-
\right),
\qquad
G_\eta=-J.
$$

Let a candidate root tube be represented as a predictor plus a local correction:

$$
\eta=\eta_p(\lambda)+z,
\qquad
z\in Z=[-w,w].
$$

The natural first predictor from a node root $\eta_n$ is

$$
\eta_p(\lambda)
=
\eta_n+s_n(\lambda-\lambda_n),
$$

where

$$
s_n
=
\frac{
\widehat{\mathbf{R}}_{ij}(\lambda_n,\eta_n)\cdot
\left[
\mathbf{T}_i(\lambda_n)
-
\mathbf{T}_j(\lambda_n-\eta_n)
\right]
}{
J_{ij}(\lambda_n,\eta_n)
}.
$$

Define the predicted-tube residual

$$
H(\lambda,z)
=
G(\lambda,\eta_p(\lambda)+z).
$$

Its $z$ derivative is

$$
\partial_zH(\lambda,z)
=
-J(\lambda,\eta_p(\lambda)+z).
$$

Let

$$
H_0(I_n)=H(I_n,0),
\qquad
J_{I,Z}
\supset
\{J(\lambda,\eta_p(\lambda)+z):\lambda\in I_n,\ z\in Z\}.
$$

Choose a scalar preconditioner

$$
C=-\frac{1}{J_*},
\qquad
J_*\in J_{I,Z},
\qquad
|J_*|>0.
$$

The parametric Krawczyk image for the correction interval is

$$
K_Z
=
-C\,H_0(I_n)
+
\left(1+C\,J_{I,Z}\right)Z.
$$

The tube Krawczyk row passes when

$$
K_Z\subset\operatorname{int}Z.
$$

It then gives, for every $\lambda\in I_n$, a unique correction $z(\lambda)\in Z$ and therefore a unique root sheet

$$
\eta_u(\lambda)=\eta_p(\lambda)+z(\lambda)
$$

inside the tube. With coefficient-box intervals, the same statement holds for every $\alpha\in X_\alpha$. The status is

$$
\texttt{tail-root-tube-krawczyk}.
$$

The associated contraction margin is

$$
m_{\mathrm{Kraw}}(u)
=
\operatorname{dist}(K_Z,\partial Z).
$$

This margin may be used as the tube-room term $\Delta_u$ in the execution ledger, provided the tube also remains separated from active brackets, other tail tubes, slab boundaries, and period cuts.

---

## 4. Parametric Empty-Cell Krawczyk Test

A cell without a visible root can also be rejected by a preconditioned Newton image. Choose a delay center $\eta_c\in Q$ and define

$$
N_{I,Q}(\eta_c)
=
\eta_c+\frac{G(I_n,\eta_c)}{J(I_n,Q)}.
$$

If

$$
N_{I,Q}(\eta_c)\cap Q=\varnothing,
$$

then no root sheet crosses $I_n\times Q$. The status is

$$
\texttt{tail-cell-empty-newton}.
$$

Equivalently, in tube coordinates with predictor $p(\lambda)=\eta_c$ and $U=Q-\eta_c$, the exclusion test is

$$
\left(
-\frac{G(I_n,\eta_c)}{G_\eta(I_n,Q)}
\right)
\cap U=\varnothing.
$$

This is the same scalar interval Newton exclusion written around $z=0$.

The corresponding empty margin is

$$
m_{\mathrm{Newt}}(c)
=
\operatorname{dist}\big(N_{I,Q}(\eta_c),Q\big),
$$

where the distance is positive only for disjoint intervals. This margin is a valid candidate for $m_{\emptyset}(c)$ in the execution ledger:

$$
m_{\emptyset}(c)
\leftarrow
\max\{m_{\emptyset}(c),m_{\mathrm{Newt}}(c)\}.
$$

If $0\in J(I_n,Q)$, the Newton row is unavailable. The cell must use distance exclusion, monotone endpoint exclusion after subdivision, Lipschitz exclusion, or direct root-tube assimilation.

---

## 5. Coefficient-Box Persistence

For a Krawczyk or Newton tail row to feed the post-tail proof budget, all intervals must be evaluated over the coefficient box $X_\alpha$:

$$
(\lambda,\eta,\alpha)\in I_n\times Q\times X_\alpha.
$$

The interval objects are then

$$
G(I_n,Q,X_\alpha),
\qquad
J(I_n,Q,X_\alpha),
\qquad
H(I_n,Z,X_\alpha).
$$

The coefficient-box Newton image is

$$
N_{I,Q,X_\alpha}(\eta_c)
=
\eta_c+
\frac{G(I_n,\eta_c,X_\alpha)}
{J(I_n,Q,X_\alpha)}.
$$

The coefficient-box Krawczyk image is

$$
K_Z(X_\alpha)
=
-C\,H_0(I_n,X_\alpha)
+
\left(1+C\,J_{I,Z}(X_\alpha)\right)Z.
$$

The row has coefficient-box persistence only when the same exclusion or tube inclusion inequality remains strict with these inflated intervals:

$$
N_{I,Q,X_\alpha}(\eta_c)\cap Q=\varnothing
$$

for exclusion, or

$$
K_Z(X_\alpha)\subset\operatorname{int}Z
$$

for a tube.

If the inequality passes only at $\alpha_0$, the status is

$$
\texttt{tail-newton-pointwise-only}.
$$

That status is useful for diagnosis but cannot feed the Krawczyk or master-retention rows.

The sensitivity constants that turn these strict point inequalities into a positive coefficient-box radius are supplied by [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md). In particular, the Newton quotient row exports $L_{\mathrm{Newt},c}^{\alpha}$ and the tube row exports $L_{\mathrm{Kraw},u}^{\alpha}$ before this packet may claim `coefficient-box`.

---

## 6. Error And Radius Export

For an empty Newton-certified cell, define

$$
e_{\mathrm{Newt}}(c)
=
\epsilon_{\mathrm{round}}
+\epsilon_{\mathrm{phase}}
+\epsilon_{\mathrm{coeff}}
+\epsilon_{\mathrm{mesh}}
+\epsilon_{\mathrm{div}},
$$

where $\epsilon_{\mathrm{div}}$ is the outward-rounded interval-division error for $G/J$. The normalized Newton empty error is

$$
E_{\mathrm{Newt}}(c)
=
\frac{e_{\mathrm{Newt}}(c)}
{m_{\mathrm{Newt}}(c)}.
$$

For a Krawczyk tube, define

$$
e_{\mathrm{Kraw}}(u)
=
\epsilon_{\mathrm{round}}
+\epsilon_{\mathrm{phase}}
+\epsilon_{\mathrm{coeff}}
+\epsilon_{\mathrm{sheet}}
+\epsilon_{\mathrm{div}},
$$

and

$$
m_{\mathrm{root}}^{\mathrm{Kraw}}(u)
=
\min
\left\{
J_u^- - \epsilon_J,\,
m_{\mathrm{Kraw}}(u),\,
g_u^{\mathrm{comp}}-\epsilon_G,\,
m_{\mathrm{anti}}(u)
\right\}.
$$

The normalized tube error is

$$
E_{\mathrm{Kraw}}(u)
=
\frac{e_{\mathrm{Kraw}}(u)}
{m_{\mathrm{root}}^{\mathrm{Kraw}}(u)}.
$$

The tail execution ledger may use these terms in its master export:

$$
E_{\mathrm{tail}}
=
\max
\left\{
E_{\emptyset},
E_{\mathrm{tube}},
E_{\mathrm{Newt}},
E_{\mathrm{Kraw}}
\right\}.
$$

The corresponding Krawczyk chart radius contribution is

$$
\rho_{\mathrm{tail,newt}}
=
\min
\left\{
\frac{m_{\mathrm{Newt}}(c)-e_{\mathrm{Newt}}(c)}
{L_{\mathrm{Newt},c}^{\alpha}},
\frac{m_{\mathrm{root}}^{\mathrm{Kraw}}(u)-e_{\mathrm{Kraw}}(u)}
{L_{\mathrm{Kraw},u}^{\alpha}}
\right\}.
$$

This radius may replace or sharpen the tail radius used in [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md), but only with coefficient-box persistence.

---

## 7. Theorem Target

**Theorem target: interval Newton support-tail certificate.** Fix one exact-antipodal $M=3$ arclength-inverse coefficient box, one source-pair policy, one endpoint convention, one support-tail interval, and one arclength-cell cover. Suppose every atomic cell is either:

1. excluded by distance, monotone endpoint, Lipschitz, or Newton disjointness;
2. covered by a Krawczyk root tube with a fixed $J$ sign stratum, positive tube margin, complement gap, and exact-antipodal mate.

Suppose also that all selected predicates persist on the coefficient box. Then the tail execution ledger is support-complete on the declared tail interval. Empty cells contain no omitted roots; root tubes contain exactly one differentiable sheet over each receiver cell; and the exported $E_{\mathrm{tail}}$ and $\rho_{\mathrm{tail}}$ are valid inputs to the post-tail proof budget.

Proof route:

1. interval Newton disjointness excludes roots in scalar delay slabs;
2. monotone endpoint brackets plus $0\notin J$ give nodewise existence and uniqueness;
3. the parametric Krawczyk inclusion gives a unique correction $z(\lambda)$ for every $\lambda$ in the receiver cell;
4. fixed $J$ sign strata make the source-normal diagnostic derivative through $|J|^{-1}$ valid before receiver-normal factors are attached;
5. coefficient-box persistence turns the point certificate into a Krawczyk/master-eligible chart row;
6. exact-antipodal pairing copies certified margins to paired cells without changing $G$ or $J$.

---

## 8. Output Schema

A tail Newton run must emit:

| Field | Payload |
| --- | --- |
| `newton_cells` | cells tested with $N_{I,Q}$ or $N_Q$ |
| `newton_image` | interval Newton image and disjointness margin |
| `krawczyk_tubes` | predictor $\eta_p$, correction interval $Z$, preconditioner $C$, image $K_Z$, and margin |
| `jacobian_sign_strata` | fixed $\zeta_u=\operatorname{sign}J_u$ for every tube |
| `coefficient_box_status` | pointwise or coefficient-box-persistent inequality |
| `newton_errors` | $e_{\mathrm{Newt}}$, $e_{\mathrm{Kraw}}$, and interval-division error |
| `tail_radius_export` | $\rho_{\mathrm{tail,newt}}$ when coefficient-box persistent |
| `tail_status_update` | `tail-cell-empty-newton`, `tail-root-bracketed-newton`, `tail-root-tube-krawczyk`, `tail-newton-pointwise-only`, or `tail-newton-uncertified` |

---

## 9. Current $M=3$ Reading

No interval Newton or parametric Krawczyk tail run has been emitted for the current $\rho=0.8$ exact-antipodal $M=3$ row. The branch remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

This packet gives the next executable refinement of the first blocker. The preferred order is:

1. apply Newton exclusion to the sampled-empty subtail $(4.5,5.0]$;
2. apply Newton or Krawczyk tube tests to the deeper subtail $(5.0,5.5211575250+m_\eta]$;
3. export coefficient-box-persistent margins into the tail execution ledger;
4. run the post-tail proof budget only after all cells are certified or assimilated.
