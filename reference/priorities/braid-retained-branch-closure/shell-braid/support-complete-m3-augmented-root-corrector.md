# Support-Complete $M=3$ Augmented Root Corrector

Promotion status: `priority-only`. This packet rewrites the support-complete exact-antipodal $M=3$ corrector with the retained delayed roots as explicit variables. It is equivalent to the implicit root-sensitive derivative formulas when the Jacobian floors stay positive, but it gives a cleaner certificate surface for Krawczyk, tail assimilation, and root-sheet continuation.

The packet is local to one support-complete root ledger, one source-pair policy, one equal-period/gauge convention, and one residual norm. It does not retain a branch.

---

## 1. Unknowns

Fix a support-complete ledger

$$
\mathcal{A}_{\eta}
=
\{r=(i,j,n,\mu)\}.
$$

Instead of eliminating root delays by an inner root solver, introduce a delay variable for every retained root:

$$
\eta
=
\{\eta_r:r\in\mathcal{A}_{\eta}\}.
$$

The augmented unknown is

$$
z=(u,\gamma,\eta),
$$

where $u$ is the reduced exact-antipodal $M=3$ coefficient vector and $\gamma$ is the curvature-from-force scale. The exact-antipodal chart remains

$$
\mathbf{Y}_{a,-}(\lambda;u)
=
-
\mathbf{Y}_{a,+}(\lambda;u).
$$

The support-complete root labels are fixed during one corrector run. If a delay variable leaves its isolating bracket or a tail slab changes status, the augmented chart fails and the root ledger must be rebuilt.

---

## 2. Augmented Residual

For each root label $r=(i,j,n,\mu)$, define

$$
\mathbf{R}_r(u,\eta_r)
=
\mathbf{Y}_i(\lambda_n;u)
-
\mathbf{Y}_j(\lambda_n-\eta_r;u),
$$

and

$$
G_r(u,\eta_r)
=
\|\mathbf{R}_r(u,\eta_r)\|-\eta_r.
$$

The root block is

$$
G_{\mathrm{root}}(u,\eta)
=
\{G_r(u,\eta_r)\}_{r\in\mathcal{A}_{\eta}}.
$$

The force term is computed from the explicit delays:

$$
\widehat{\mathbf{R}}_r
=
\frac{\mathbf{R}_r}{\eta_r},
\qquad
J_r
=
1-\mathbf{T}_j(\lambda_n-\eta_r)\cdot\widehat{\mathbf{R}}_r,
$$

and

$$
\mathbf{f}_r
=
\frac{\sigma_i\sigma_j}{\eta_r^2|J_r|}
\widehat{\mathbf{R}}_r.
$$

Then

$$
\widetilde{\mathbf{F}}_{i,n}
=
\sum_{r\in\mathcal{A}_{i,n}}\mathbf{f}_r,
\qquad
A_{i,n}=P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}.
$$

The augmented residual is

$$
\mathcal{H}_{M3}(u,\gamma,\eta)
=
\begin{bmatrix}
G_{\mathrm{root}}\\
R_T\\
R_K\\
R_\gamma
\end{bmatrix},
$$

where

$$
R_{T,i,n}
=
\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n},
$$

$$
R_{K,i,n}
=
\mathbf{K}_{i,n}-\gamma A_{i,n},
$$

and

$$
R_\gamma
=
\gamma-\Gamma_B(u).
$$

The curl and scalar-inertia rows may be appended when their derivatives are certified, or retained as interval audits as in [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md).

---

## 3. Root Block Derivatives

For a coefficient direction $\xi=\delta\mathbf{Y}$,

$$
D_uG_r[\xi]
=
\widehat{\mathbf{R}}_r\cdot(\xi_i-\xi_j^-),
$$

where $\xi_j^-=\xi_j(\lambda_n-\eta_r)$. The delay derivative is

$$
\partial_{\eta_r}G_r
=
-J_r.
$$

Thus the root block derivative is block diagonal in the delay variables:

$$
D_\eta G_{\mathrm{root}}
=
-\operatorname{diag}(J_r).
$$

The root block is regular exactly when

$$
|J_r|\ge J_0>0
$$

for every retained label.

Solving the linearized root block gives

$$
\delta\eta_r[\xi]
=
\frac{
\widehat{\mathbf{R}}_r\cdot(\xi_i-\xi_j^-)
}{J_r},
$$

which recovers the implicit root-sensitivity formula by Schur complement.

---

## 4. Force Derivatives With Explicit Delays

In the augmented system, coefficient and delay derivatives are separated. At fixed $\eta_r$,

$$
\delta_u\mathbf{R}_r
=
\xi_i-\xi_j^-,
$$

while at fixed $u$,

$$
\partial_{\eta_r}\mathbf{R}_r
=
\mathbf{T}_j^-.
$$

The direction derivatives are

$$
\delta\widehat{\mathbf{R}}_r
=
\frac{
(I-\widehat{\mathbf{R}}_r\widehat{\mathbf{R}}_r^T)
\delta\mathbf{R}_r
}{\eta_r}
-
\widehat{\mathbf{R}}_r
\frac{\delta\eta_r}{\eta_r},
$$

where the last term is present only for variations with $\delta\eta_r\ne0$.

On a fixed sign stratum for $J_r$,

$$
\delta\mathbf{f}_r
=
\frac{\sigma_i\sigma_j}{\eta_r^2|J_r|}
\left[
\delta\widehat{\mathbf{R}}_r
-
\left(
2\frac{\delta\eta_r}{\eta_r}
+
\frac{\delta J_r}{J_r}
\right)
\widehat{\mathbf{R}}_r
\right].
$$

Here

$$
\delta J_r
=
-
\delta\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r
-
\mathbf{T}_j^-\cdot\delta\widehat{\mathbf{R}}_r,
$$

with

$$
\delta\mathbf{T}_j^-
=
(\delta_u\mathbf{T}_j)^-
-
\mathbf{K}_j^-\delta\eta_r.
$$

Substituting the Schur-complement value of $\delta\eta_r[\xi]$ reduces these equations to the implicit derivative formulas in [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md).

---

## 5. Augmented Krawczyk Row

Let

$$
\widehat{F}(z)
=
\widehat{W}^{1/2}\mathcal{H}_{M3}(z)
$$

be the weighted augmented residual. Its derivative has block form

$$
D\widehat{F}
=
\begin{bmatrix}
D_uG & 0 & D_\eta G\\
D_uR & D_\gamma R & D_\eta R
\end{bmatrix},
$$

where $D_\eta G=-\operatorname{diag}(J_r)$.

The augmented Krawczyk certificate proceeds exactly as in [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md), but with $z=(u,\gamma,\eta)$ and chart radii including root-bracket radii:

$$
\eta_r\in I_r,
\qquad
\operatorname{dist}(\eta_r,\partial I_r)>\Delta_{\eta,r}.
$$

The root-block weights should normalize root equations against the bracket tolerance:

$$
w_{G,r}=\tau_{G,r}^{-1}.
$$

The augmented route is stricter but more transparent: a Krawczyk enclosure directly proves that the coefficient correction and the root delays solve the root equations and dynamics rows together.

---

## 6. Equivalence Lemma

**Lemma target: augmented and implicit corrector equivalence.** On a support-complete root stratum with $|J_r|\ge J_0>0$, the augmented root corrector and the implicit root-sensitive corrector have the same local zeros after projecting away the explicit delay variables. Their derivatives are related by the Schur complement of $D_\eta G_{\mathrm{root}}$.

Proof route:

1. Since $D_\eta G_{\mathrm{root}}=-\operatorname{diag}(J_r)$ is invertible, the implicit function theorem gives unique smooth root functions $\eta_r(u)$.
2. Substituting $\eta=\eta(u)$ into $\mathcal{H}_{M3}$ gives the implicit residual $\mathcal{F}_{M3}(u,\gamma)$.
3. Differentiating the root equations gives the same $\delta\eta_r[\xi]$ used in the implicit derivative formulas.
4. Therefore a zero of the augmented system projects to a zero of the implicit system, and any implicit zero lifts uniquely to the augmented root variables.

The equivalence fails at root folds, root mergers, memory exits, tail-certificate failures, or any point with $J_r=0$.

---

## 7. Tail Assimilation And Mesh Lift

When [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) finds tail root sheets, the augmented variables may include sampled delays for those sheets:

$$
\eta_{u,n}\approx\eta_u(\lambda_n).
$$

The mesh-lift row then supplies the between-node tube bounds. The augmented system does not replace mesh lift; it ensures that the sampled tail roots and active roots solve their root equations consistently at the collocation nodes.

If a tail root enters the ledger, the augmented residual must be rebuilt with the extended root set

$$
\mathcal{A}_{\eta}^{+}
=
\mathcal{A}_{4.5}\cup\mathcal{U}^{\mathrm{tail}}.
$$

Keeping the old augmented system after tail-root discovery has status

$$
\texttt{augmented-root-ledger-stale}.
$$

---

## 8. Status Codes

Use:

$$
\texttt{augmented-root-corrector-ready}
$$

when all root brackets, Jacobian floors, row weights, and support-complete tail statuses are available.

Use:

$$
\texttt{augmented-root-krawczyk-passed}
$$

when the augmented Krawczyk certificate encloses a zero of $\mathcal{H}_{M3}$.

Use:

$$
\texttt{augmented-root-ledger-stale}
$$

when the root set changes during the solve.

Use:

$$
\texttt{augmented-root-block-singular}
$$

when any $|J_r|$ loses its floor.

Use:

$$
\texttt{implicit-augmented-equivalence-open}
$$

when the implicit solver and augmented solver use different root policies, endpoint conventions, or memory ledgers.

The current exact-antipodal $M=3$ row has not emitted augmented root variables. Its status remains

$$
\texttt{augmented-root-corrector-open}.
$$
