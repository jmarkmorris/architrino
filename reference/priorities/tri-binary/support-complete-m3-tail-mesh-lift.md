# Support-Complete $M=3$ Tail Mesh Lift

Promotion status: `priority-only`. This packet upgrades nodewise exact-antipodal $M=3$ tail certificates to arclength-cell certificates. It complements [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md) and [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md). If tail root sheets are assimilated, their coefficient derivatives are supplied by [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md). A retained curve-level branch cannot rely only on tail root absence at collocation nodes; it must also exclude or assimilate roots between nodes.

The packet is local to one support-tail interval, one collocation mesh, one source-pair policy, and one exact-antipodal arclength-inverse chart. It does not retain a branch.

---

## 1. Tail Rectangles

Let the common arclength period be $L_*$ and let the collocation grid be

$$
\lambda_n=\frac{nL_*}{K},
\qquad
h_K=\frac{L_*}{K}.
$$

Define the arclength cell around node $n$ by

$$
I_n
=
\left[
\lambda_n-\frac{h_K}{2},
\lambda_n+\frac{h_K}{2}
\right]
\pmod{L_*}.
$$

For each required ordered source pair $(i,j)$ and tail slab

$$
Q_q=[a_q,b_q]\subset T_{\mathrm{tail}},
$$

the two-variable root function is

$$
G_{ij}(\lambda,\eta)
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|
-
\eta.
$$

The support-tail rectangle is

$$
\mathcal{Q}_{nq}
=
I_n\times Q_q.
$$

The delayed source arclength interval is

$$
I_n-Q_q
=
\{\lambda-\eta:\lambda\in I_n,\eta\in Q_q\}
\pmod{L_*}.
$$

As in the nodewise enclosure packet, all intervals that cross the period cut must be split before interval evaluation.

---

## 2. Rectangle Distance Exclusion

Compute interval enclosures

$$
\mathbf{Y}_{i,n}
\supset
\{\mathbf{Y}_i(\lambda):\lambda\in I_n\},
$$

and

$$
\mathbf{Y}_{j,nq}^{-}
\supset
\{\mathbf{Y}_j(\lambda-\eta):(\lambda,\eta)\in I_n\times Q_q\}.
$$

The rectangle separation interval is

$$
\mathbf{R}_{nq}
=
\mathbf{Y}_{i,n}-\mathbf{Y}_{j,nq}^{-}.
$$

Let

$$
D_{nq}=[D_{nq}^-,D_{nq}^+]
\supset
\{\|\mathbf{R}\|:\mathbf{R}\in\mathbf{R}_{nq}\}.
$$

Then the whole arclength cell and tail slab is root-free if

$$
D_{nq}^+<a_q-\epsilon_G
\qquad\text{or}\qquad
D_{nq}^->b_q+\epsilon_G.
$$

This is stronger than a nodewise test. It proves no tail root exists anywhere in $I_n\times Q_q$.

---

## 3. Mesh-Lift From Nodewise Gaps

If a rectangle distance bound is too wide, a nodewise certificate may still lift to the cell using an arclength derivative bound. At fixed $\eta$,

$$
\partial_\lambda G_{ij}(\lambda,\eta)
=
\widehat{\mathbf{R}}_{ij}(\lambda,\eta)
\cdot
\left[
\mathbf{T}_i(\lambda)
-
\mathbf{T}_j(\lambda-\eta)
\right].
$$

Hence the universal bound

$$
|\partial_\lambda G_{ij}|\le2
$$

is valid wherever the separation is nonzero. A sharper cell bound is

$$
|\partial_\lambda G_{ij}|\le L_{\lambda,nq}.
$$

Suppose the nodewise slab certificate gives a strict gap

$$
g_{nq}
=
\inf_{\eta\in Q_q}
|G_{ij}(\lambda_n,\eta)|
>
0.
$$

Then the whole cell is root-free if

$$
g_{nq}
>
\frac12L_{\lambda,nq}h_K
+
\epsilon_G.
$$

This converts a nodewise tail-exclusion proof into an arclength-cell proof. If this inequality fails, the slab must be certified by rectangle interval arithmetic, subdivided in $\lambda$, or treated as uncertified.

---

## 4. Tail Root Sheets

If a tail root is bracketed at a node and persists across a cell, it should be assimilated as a root sheet, not only as isolated node hits. A root sheet is a function

$$
\eta_u:I_n\to Q_q
$$

satisfying

$$
G_{ij}(\lambda,\eta_u(\lambda))=0.
$$

Assume the rectangle has a Jacobian floor

$$
|J_{ij}(\lambda,\eta)|
\ge
J_{nq}>0
$$

on the root tube, where

$$
J_{ij}=1-\mathbf{T}_j(\lambda-\eta)\cdot\widehat{\mathbf{R}}_{ij}.
$$

Then the root sheet derivative is

$$
\eta_u'(\lambda)
=
\frac{
\widehat{\mathbf{R}}_{ij}(\lambda,\eta_u)
\cdot
\left[
\mathbf{T}_i(\lambda)
-
\mathbf{T}_j(\lambda-\eta_u)
\right]
}{J_{ij}(\lambda,\eta_u)}.
$$

Thus

$$
|\eta_u'(\lambda)|
\le
\frac{L_{\lambda,nq}}{J_{nq}}.
$$

If a node bracket has half-width $w_u$ and center margin $\Delta_u$ inside its isolating interval, the same label remains inside the tube throughout the cell when

$$
\frac12
\frac{L_{\lambda,nq}}{J_{nq}}
h_K
<
\Delta_u.
$$

The bracket tube must also remain separated from every old active bracket, every other tail bracket, and the tail slab boundary.

---

## 5. Continuous Tail Ledger

For each source pair and cell, define the excluded region after including active and tail root tubes:

$$
E_{ij,n}^{\mathrm{tail}}
=
I_n\times T_{\mathrm{tail}}
\setminus
\bigcup_a\mathcal{T}_a
\setminus
\bigcup_u\mathcal{T}_u^{\mathrm{tail}},
$$

where $\mathcal{T}_a$ are old active-root tubes intersecting the tail boundary and $\mathcal{T}_u^{\mathrm{tail}}$ are assimilated tail-root tubes.

The continuous tail ledger passes if

$$
\inf_{(\lambda,\eta)\in E_{ij,n}^{\mathrm{tail}}}
|G_{ij}(\lambda,\eta)|
>
\epsilon_G
$$

for every required $(i,j,n)$ and if all root tubes have positive Jacobian floors, positive separations, and exact-antipodal pair matching.

The extended support-complete force is then a function on the whole cell:

$$
\widetilde{\mathbf{F}}_i^+(\lambda)
=
\widetilde{\mathbf{F}}_i^{\mathrm{act}}(\lambda)
+
\sum_{u\in\mathcal{U}_i^{\mathrm{tail}}(\lambda)}
\frac{\sigma_i\sigma_{j(u)}}{\eta_u(\lambda)^2|J_u(\lambda)|}
\widehat{\mathbf{R}}_u(\lambda).
$$

This is the force row that must feed the off-grid residual, action, Krawczyk, and stability audits.

When any $\mathcal{T}_u^{\mathrm{tail}}$ is retained, the next certificate is the root-sheet variation row. The support-complete force above is not differentiable data for Newton, curl, or Krawczyk purposes until the solver also emits $\eta_u'(\lambda)$, $D_v\eta_u(\lambda)$, $D_v\mathbf{f}_u(\lambda)$, and the corresponding derivative envelopes.

---

## 6. Mesh-Lift Theorem

**Theorem target: support-tail mesh lift.** Fix an exact-antipodal $M=3$ coefficient vector, a source-pair policy, a support-tail interval, and a collocation mesh. Suppose every tail rectangle $I_n\times Q_q$ is either rectangle-excluded, nodewise-excluded with a passing arclength derivative margin, or covered by isolated root tubes with positive Jacobian floor, positive tube separation, and exact-antipodal closure. Then the nodewise tail certificate lifts to a continuous arclength-cell support-tail certificate on the declared mesh.

The proof is the mean-value theorem for empty slabs and the implicit function theorem for root sheets. The exact-antipodal closure is inherited because the root tubes are paired under the antipodal involution with matching delay intervals and source-pair labels.

---

## 7. Status Codes

Use:

$$
\texttt{tail-mesh-lift-passed}
$$

when every cell is rectangle-excluded, derivative-lifted, or root-sheet assimilated.

Use:

$$
\texttt{tail-nodewise-only}
$$

when node certificates exist but no arclength-cell margin has been emitted.

Use:

$$
\texttt{tail-root-sheet-assimilated}
$$

when continuous tail-root tubes have been added to the force ledger.

Use:

$$
\texttt{tail-mesh-lift-failed}
$$

when any cell has an uncertified rectangle, a failed derivative margin, a root tube without a Jacobian floor, or an unpaired antipodal tail tube.

The current $\rho=0.8$ exact-antipodal $M=3$ row has not emitted this mesh lift. Its support-tail status therefore remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-nodewise-only-open}.
$$
