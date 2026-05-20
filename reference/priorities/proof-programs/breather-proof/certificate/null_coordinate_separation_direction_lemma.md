# Null-Coordinate Separation Direction Lemma

## Scope

This packet records a constructive mathematical advance for the fresh fold-adapted collocation route after `seed-doubled-four-arc-cosine-template-v0` failed at the parent-complement gate.

It is not a new gate. It turns the rejected cosine packet's residual equality-core diagnosis into a finite perturbation problem for the next candidate history.

Sources:

- `next_candidate_solver_target.md`
- `fresh_fold_collocation_solver_surface.md`
- `fixed_cosine_refinement_rescue_test.md`
- `fold_parent_w_positive_overlap_subdivision_attempt.md`
- `fold_parent_u_positive_overlap_subdivision_attempt.md`
- `fold_parent_regular_boundary_coverage_attempt.md`
- `seed_chart_packet.md`

This packet does not instantiate a solved candidate, does not edit `causal_ledger.json`, and does not authorize branch-chart construction.

## Mathematical Advance

The rejected cosine packet shows that mesh refinement cannot change the intrinsic overlap of the null-coordinate ranges
$$
Y_R^y=y(R),
\qquad
Y_S^y=y(S),
\qquad
y\in\{u,w\}.
$$
The next candidate should therefore change the candidate history so that the residual parent-complement collars acquire strict null-coordinate separation before the branch chart is attempted.

The concrete advance is a finite separation-direction lemma. It converts parent-complement repair into a finite-dimensional inequality on the collocation perturbation, using the same null coordinates as the pre-ledger:
$$
y_{\sigma}(\theta;X,T)
=
c_f T\theta+\sigma X(\theta),
\qquad
\sigma\in\{-1,+1\},
$$
where $\sigma=-1$ gives $u$ and $\sigma=+1$ gives $w$.

## Lemma

Let
$$
\mathcal{C}_{\mathrm{pc}}
=
\{C_1,\ldots,C_m\}
$$
be a finite list of residual parent-complement collars for one frozen itinerary and mesh, where each
$$
C_k=R_k\times S_k
$$
has receiver interval $R_k$, source interval $S_k$, null-coordinate sign $\sigma_k\in\{-1,+1\}$, and chosen separation orientation $o_k\in\{-1,+1\}$. Define the oriented overlap depth of a candidate $(X,T)$ by
$$
d_k(X,T)
=
\sup_{\theta_s\in S_k}o_k y_{\sigma_k}(\theta_s;X,T)
-
\inf_{\theta_r\in R_k}o_k y_{\sigma_k}(\theta_r;X,T).
$$
Thus $d_k<0$ is a strict gap in the chosen orientation, $d_k=0$ is endpoint contact, and $d_k>0$ is positive-width overlap.

Suppose a collocation perturbation direction $(H,\delta T)$ satisfies, for every $k$,
$$
\lambda_k
=
\inf_{\theta_r\in R_k,\theta_s\in S_k}
o_k\left[
c_f\delta T(\theta_r-\theta_s)
+
\sigma_k\bigl(H(\theta_r)-H(\theta_s)\bigr)
\right]
>0.
$$
Let the perturbed candidate be
$$
X_{\varepsilon}=X+\varepsilon H,
\qquad
T_{\varepsilon}=T+\varepsilon\delta T.
$$
If
$$
\varepsilon\lambda_k>d_k(X,T)
$$
for every $k$ with $d_k(X,T)\ge0$, and if the perturbation is small enough to preserve the already strict simple-root, memory-depth, sign, and fold-layer floors, then every listed parent-complement collar becomes strictly null-coordinate separated for the perturbed candidate:
$$
d_k(X_{\varepsilon},T_{\varepsilon})<0
\qquad
\text{for all }k.
$$

For nonlinear interval enclosures, the same conclusion holds with a second-order remainder bound $Q_k\varepsilon^2$ whenever
$$
\varepsilon\lambda_k>d_k(X,T)+Q_k\varepsilon^2.
$$

## Proof Sketch

The null-coordinate map is affine in $(X,T)$:
$$
y_{\sigma}(\theta;X+\varepsilon H,T+\varepsilon\delta T)
=
y_{\sigma}(\theta;X,T)
+\varepsilon\left(c_f\delta T\theta+\sigma H(\theta)\right).
$$
Therefore the oriented receiver-source separation on $C_k$ changes by at least $\varepsilon\lambda_k$ in the desired direction. If that change exceeds the original overlap depth, the oriented source interval lies strictly below the oriented receiver interval, so the two null-coordinate ranges are disjoint. Strict pre-existing floors persist under sufficiently small $C^1$ perturbations because their margins are positive and the relevant interval functions depend continuously on $(X,T)$. For interval-polynomial or fold-coordinate enclosures, the same argument uses the certified quadratic remainder $Q_k\varepsilon^2$.

## Finite Collocation Form

If the fresh candidate uses basis functions
$$
H(\theta)=\sum_i b_i\psi_i(\theta),
$$
then the separation direction is found by a finite set of linear inequalities:
$$
\inf_{\theta_r\in R_k,\theta_s\in S_k}
o_k\left[
c_f b_T(\theta_r-\theta_s)
+
\sigma_k\sum_i b_i\bigl(\psi_i(\theta_r)-\psi_i(\theta_s)\bigr)
\right]
\ge
d_k(X,T)+\gamma_k,
$$
with chosen strict target margins
$$
\gamma_k>0.
$$
On monotone interval pieces the extrema are endpoint-controlled; for interval bases they are bounded by the same outward-rounded interval arithmetic used by the pre-ledger. This supplies a concrete search primitive for $H_{\mathrm{pc}}$: solve the finite separation inequalities first, then ask whether the dual-mollified residual and returned-sample rows can be made small on the same packet identity.

## Constraint-Preserving Gap-Opening Criterion

The separation direction must also stay on the structural collocation manifold. Let
$$
C(\mathbf a)=0
$$
collect the section, symmetry, separator, $C^1$ matching, fold-nondegeneracy, origin-placement, and neutral-coordinate fixing equations for a provisional fresh candidate. For each unresolved parent complement
$$
C_m=R_m\times S_m,
$$
choose a signed strict-gap functional
$$
\delta_m(\mathbf a)
=
\inf_{\theta_s\in S_m} y_m(\theta_s;\mathbf a)
-
\sup_{\theta_r\in R_m} y_m(\theta_r;\mathbf a),
$$
or the opposite ordering, so that
$$
\delta_m>0
$$
means strict null-coordinate range separation.

If a provisional collocation point $\mathbf a_0$ has regular constraint rank and positive existing margins except for parent-complement collars, and if there exists a tangent direction $\xi$ satisfying
$$
DC(\mathbf a_0)\xi=0,
\qquad
D\delta_m(\mathbf a_0)\xi\ge \kappa_m>0
\quad
\text{for every unresolved }m,
$$
then the implicit-function theorem gives a corrected curve
$$
\mathbf a(\lambda)=\mathbf a_0+\lambda\xi+O(\lambda^2),
\qquad
C(\mathbf a(\lambda))=0,
$$
and for sufficiently small $\lambda>0$,
$$
\delta_m(\mathbf a(\lambda))\ge\frac{\lambda\kappa_m}{2}>0.
$$
The already strict margins persist whenever
$$
0<\lambda<
\min_j\frac{\gamma_j}{2L_j},
$$
where $\gamma_j$ are the existing strict margins and $L_j$ are local Lipschitz bounds for their variation.

This converts $H_{\mathrm{pc}}$ from a passive penalty into a finite tangent-space feasibility problem:
$$
B\xi=0,
\qquad
A\xi\ge \kappa\mathbf{1},
$$
where $B=DC(\mathbf a_0)$ plus neutral-coordinate fixing rows and $A_{mn}=D\delta_m(\mathbf a_0)b_n$ for the chosen collocation basis directions $b_n$.

## Endpoint-Shear Basis

A concrete basis for this feasibility problem is a localized $C^1$ endpoint-shear family on fold-adjacent regular arcs. Choose basis functions $b_n(\theta)$ with
$$
b_n=b_n'=0
$$
at separator-layer and regular-interface endpoints, then mirror them by half-period antisymmetry. Since
$$
u(\theta)=c_fT_{\mathrm{cyc}}\theta-X(\theta),
\qquad
w(\theta)=c_fT_{\mathrm{cyc}}\theta+X(\theta),
$$
a shear $\delta X=b_n$ changes the two ledgers oppositely:
$$
\delta u=-b_n+c_f\theta\,\delta T,
\qquad
\delta w=b_n+c_f\theta\,\delta T.
$$
Thus a small local shear can open a $u$ collar while closing or weakening a nearby $w$ collar, or conversely. The finite feasibility problem is valuable exactly because it tests whether all residual collars can be opened simultaneously while remaining tangent to the structural constraints.

## Half-Period Fold-Shear Corollary

The first live local matrix uses three actual $C^1$ first-half arc bumps
$$
\psi_j(\theta)
=
\sin^2\!\left(\pi\frac{\theta-L_j}{R_j-L_j}\right),
\qquad
A_j=[L_j,R_j],
$$
on
$$
A_0=[0,\sigma_1],
\qquad
A_1=[\sigma_1,\sigma_2],
\qquad
A_2=[\sigma_2,1/2],
$$
extended by half-period antisymmetry,
$$
H(\theta+1/2)=-H(\theta).
$$
With fixed period tangent $\delta T=0$,
$$
\delta w=H,
\qquad
\delta u=-H.
$$
Therefore each second-half `u` residual collar is the half-period mirror of a
first-half `w` derivative calculation. The residual-collar matrix is no longer
one independent actuator per collar: it tests whether one symmetry-preserving
first-half shear opens all listed first- and second-half collars together.

For the rejected cosine residuals, the source-above-receiver signed matrix built
from these three live bumps has the strict witness
$$
(b_T,h_{A0},h_{A1},h_{A2})
=
(0,\ 0.433491813815,\ -0.556350501775,\ -1),
$$
with observed finite margin
$$
\min_m\left((A\xi)_m-\kappa_m\right)=0.0920789718365,
$$
after subtracting the recorded residual overlap depths $\kappa_m$.
This is not a pre-ledger pass. It is a constructive seed direction for the next
fresh fold-collocation candidate.

## Executable Feasibility Scanner

The finite criterion now has a fail-closed executable proof aid:
[`null-coordinate-gap-opening-scanner.mjs`](../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs).
Given a declared matrix for
$$
B\xi=0,
\qquad
A\xi\ge\kappa\mathbf{1},
$$
the scanner works in the computed nullspace of $B$ and reports `feasible` only
when it emits an explicit witness with
$$
\|\xi\|_\infty\le1,
\qquad
\max_j |(B\xi)_j|\le\varepsilon_{\mathrm{tol}},
\qquad
\min_m\left((A\xi)_m-\kappa_m\right)>0.
$$
If it cannot find such a witness, the result is `inconclusive`, not a proof of
infeasibility.

The first diagnostic run uses
`gap_opening_feasibility_input.seed_cosine_diagnostic_demo.v0.json` and records
`gap_opening_feasibility_result.seed_cosine_diagnostic_demo.v0.json`. This run
is intentionally not a live candidate packet: it uses independent endpoint-shear
columns to verify the success-marker shape, leaves `branch_chart_authorized=false`,
and does not update the live pre-ledger. Its value is that the next fresh
fold-collocation candidate can now be tested by replacing the diagnostic matrix
with the true structural Jacobian $B=DC(\mathbf a_0)$ and signed gap derivative
matrix $A$.

## Why This Is Not Another Gate

The current gate says a parent complement fails when the null-coordinate ranges still overlap. This lemma supplies a construction mechanism: a candidate-history direction that opens those ranges. It changes the search problem from "name the missing certificate fields" to "find a finite collocation direction $(H,\delta T)$ whose null-coordinate separation matrix has positive margin on the residual collars."

The failed cosine packet provides the starting data:

- the residual collars are finite;
- their ledgers are known (`u` or `w`);
- their receiver/source intervals are known;
- mesh-only refinement cannot change the overlap depth;
- the next candidate can change $X$ and $T$.

The fresh-candidate solver target should therefore treat parent-complement closure as a finite separation-control problem before spending work on branch-chart rows.

## Immediate Use In The Next Candidate Packet

For a new fold-adapted collocation packet:

1. list the residual collar family $\mathcal{C}_{\mathrm{pc}}$ inherited as diagnostic pressure from the rejected cosine packet or recomputed on the new mesh;
2. choose orientations $o_k$ corresponding to the desired strict range gap;
3. assemble the interval matrix entries
   $$
   M_{k,i}
   =
   \inf_{\theta_r\in R_k,\theta_s\in S_k}
   o_k\sigma_k\bigl(\psi_i(\theta_r)-\psi_i(\theta_s)\bigr),
   $$
   and the period column
   $$
   p_k
   =
   \inf_{\theta_r\in R_k,\theta_s\in S_k}
   o_k c_f(\theta_r-\theta_s);
   $$
4. solve
   $$
   p_k b_T+\sum_i M_{k,i}b_i
   \ge
   d_k+\gamma_k
   $$
   for all residual collars, with side constraints preserving section, half-period antisymmetry, separator ordering, and fold nondegeneracy;
5. use the resulting candidate as the input to the ordinary null-coordinate pre-ledger.

This is a theory advance because it gives the next solver a constructive direction: the residual parent-complement problem is finite-dimensional and can be attacked before full returned-sample residual closure.

## Promotion Decision

Promoted in narrow form into `content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md`. The reader-facing prose states the gap-opening tangent-direction criterion as a conditional construction test for the fresh collocation packet.

The full interval-matrix implementation remains priority-only here. The safe AAA implication is narrow: the fresh fold-adapted collocation target should change the null-coordinate geometry itself, not merely reduce residuals on the rejected cosine mesh.
