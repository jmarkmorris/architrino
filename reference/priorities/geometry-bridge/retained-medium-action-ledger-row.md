# Retained Medium Action Ledger Row

Promotion status: `priority-only`.

This packet consumes [retained-branch-medium-response-candidate](retained-branch-medium-response-candidate.md) and computes the local action/virtual-work row for the completed-square trace-free medium block. The purpose is not to add a new validation gate. It is to decide whether the retained susceptibility candidate

$$
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab}
=
-r_{ZM}\delta\mathcal Z_{\mathrm{tf}}^{ab}
$$

can be represented by an exact local response density on the retained tensor variables.

## Retained Tensor Variables

Let

$$
M^{ab}
=
\Pi_{\mathrm{tf}}\delta\mathcal M_{\mathrm{sea}}^{ab},
\qquad
Z^{ab}
=
\delta\mathcal Z_{\mathrm{tf}}^{ab},
\qquad
M,Z\in\mathrm{Sym}^{2}_{0}(h).
$$

Use the trace-free inner product

$$
\langle X,Y\rangle_h=X_{ab}Y^{ab}.
$$

On a fixed projection convention with constant $r_{ZM}$ over the local branch chart, define the completed-square mismatch tensor

$$
U^{ab}
=
M^{ab}+r_{ZM}Z^{ab}.
$$

The retained trace-free storage density is

$$
\boxed{
\mathcal F_{\mathrm{sea,tf}}^{\square}
=
\frac{\alpha_M}{2}
\langle U,U\rangle_h,
\qquad
\alpha_M>0.
}
$$

This is the smallest conservative quadratic block whose stationary $M$-row gives the required susceptibility.

## First Variation

For variations of both retained tensors,

$$
\delta U^{ab}
=
\delta M^{ab}+r_{ZM}\delta Z^{ab}
$$

when $r_{ZM}$ is held fixed. Therefore

$$
\delta\mathcal F_{\mathrm{sea,tf}}^{\square}
=
\alpha_M
\langle U,\delta M+r_{ZM}\delta Z\rangle_h.
$$

The medium-tensor conjugate and exposure-tensor conjugate are

$$
\boxed{
\Pi_M^{ab}
=
\frac{\partial\mathcal F_{\mathrm{sea,tf}}^{\square}}{\partial M_{ab}}
=
\alpha_M U^{ab},
}
$$

and

$$
\boxed{
\Pi_Z^{ab}
=
\frac{\partial\mathcal F_{\mathrm{sea,tf}}^{\square}}{\partial Z_{ab}}
=
\alpha_M r_{ZM}U^{ab}
=
r_{ZM}\Pi_M^{ab}.
}
$$

Stationarity with respect to the retained medium tensor is

$$
\Pi_M^{ab}=0
\quad\Longleftrightarrow\quad
M^{ab}=-r_{ZM}Z^{ab}.
$$

Thus the action row reproduces the susceptibility required by the axial ADM/Cartan residual:

$$
\kappa_Z=-r_{ZM}.
$$

At the stationary point,

$$
\Pi_Z^{ab}=0
$$

for this local block. That does not mean the exposure tensor has no source provenance. It means that the completed-square block itself contributes no additional exposure-conjugate work once the medium tensor has relaxed to the candidate response. The provenance of $Z$ still belongs to the root-ledger exposure calculation.

## Branch Virtual-Work One-Form

Let $a^p$ be retained non-gauge branch coordinates on a root-regular chart. The trace-free storage block contributes the finite-mode one-form

$$
\omega_{\mathrm{sea,tf}}^{\square}
=
\sum_p
W^{\square}_p(a)\,da^p,
$$

with

$$
\boxed{
W^{\square}_p(a)
=
\int_0^{L_B}
\left[
\langle\Pi_M,\partial_pM\rangle_h
+
\langle\Pi_Z,\partial_pZ\rangle_h
\right]
d\lambda.
}
$$

Equivalently,

$$
W^{\square}_p(a)
=
\partial_p
\int_0^{L_B}
\mathcal F_{\mathrm{sea,tf}}^{\square}(a,\lambda)
d\lambda
$$

when the event interval, active root ledger, and endpoint convention are included in the retained chart. If the sign convention places storage in the action as $-\mathcal F_{\mathrm{sea,tf}}^\square$, the one-form is multiplied by $-1$; the curl result below is unchanged.

## Curl Result

On a root-regular chart with fixed active root ledger and smooth endpoint convention,

$$
\mathcal C_{pq}^{\square}
=
\partial_pW^{\square}_q
-
\partial_qW^{\square}_p
=
0.
$$

The proof is exactness:

$$
\omega_{\mathrm{sea,tf}}^{\square}
=
d
\left(
\int_0^{L_B}
\mathcal F_{\mathrm{sea,tf}}^{\square}d\lambda
\right),
$$

so mixed partials commute on the retained chart. Therefore the completed-square trace-free medium block does not create a new local curl obstruction by itself.

This does not close the total branch action. The total root-sensitive curl remains

$$
\mathcal C_{pq}^{B,\mathrm{total}}
=
\mathcal C_{pq}^{B,\mathrm{delayed}}
+
\mathcal C_{pq}^{B,\nu}
+
\mathcal C_{pq}^{B,\mathrm{supp}}
+
\mathcal C_{pq}^{B,\mathrm{evt}}
+
\mathcal C_{pq}^{B,\mathrm{sea,other}}
+
\mathcal C_{pq}^{\square}.
$$

The result here is

$$
\boxed{
\mathcal C_{pq}^{\square}=0.
}
$$

Thus any remaining curl obstruction must come from the delayed-force row, the retained speed/support/event rows, another Noether sea row, endpoint motion, or a failure to retain the variables that the storage density actually varies.

## Energy And Passivity Row

The natural storage variable for the candidate block is

$$
\mathcal E_{\mathrm{sea,tf}}^{\square}
=
\int_0^{L_B}
\mathcal F_{\mathrm{sea,tf}}^{\square}d\lambda
\ge0.
$$

For fixed $\alpha_M$ and $r_{ZM}$,

$$
\frac{d}{d\lambda}
\mathcal F_{\mathrm{sea,tf}}^{\square}
=
\alpha_M
\langle
U,\dot M+r_{ZM}\dot Z
\rangle_h.
$$

Therefore the local power exchange carried by this storage block is

$$
\boxed{
\mathcal P_{\mathrm{sea,tf}}^{\square}
=
\alpha_M
\langle
U,\dot M+r_{ZM}\dot Z
\rangle_h.
}
$$

At the stationary response $U=0$,

$$
\mathcal F_{\mathrm{sea,tf}}^{\square}=0,
\qquad
\mathcal P_{\mathrm{sea,tf}}^{\square}=0.
$$

This is the passivity advantage over the uncoupled cross density

$$
\frac{\alpha_M}{2}\langle M,M\rangle_h
+
\beta_{MZ}\langle M,Z\rangle_h,
$$

whose eliminated value is negative when $Z$ is treated as an unledgered source. The completed-square block stores mismatch energy rather than extracting unaccounted exposure energy.

If $\alpha_M$ or $r_{ZM}$ varies across the event interval, the exact storage derivative must retain the extra terms

$$
\frac{\dot\alpha_M}{2}\langle U,U\rangle_h
+
\alpha_M\dot r_{ZM}\langle U,Z\rangle_h.
$$

Dropping those terms is a truncation of the energy ledger.

## Conservation And Isotropy Consequence

Because $\mathcal F_{\mathrm{sea,tf}}^{\square}$ is built only from contractions with $h_{ab}$, it introduces no independent spatial vector or tensor direction. The only direction in the response is the direction already present in $Z^{ab}$. Therefore the storage block has zero preferred-orientation residual at the level of its local quadratic form:

$$
\mathcal R_{\mathrm{sea,iso}}^{\square}=0
$$

provided $M$ and $Z$ are both transformed as trace-free tensors under the same branch chart rotation.

Momentum and angular-momentum accounting are not automatic for the full branch, because $Z$ is a root-ledger exposure tensor. The storage block supplies the conjugate $\Pi_Z$ that must be paired with the root-ledger variation of $Z$. At the stationary response $\Pi_Z=0$ for this block, but away from stationarity the exposure-conjugate row is

$$
\Pi_Z^{ab}\partial_pZ_{ab}
=
\alpha_Mr_{ZM}
\left(M^{ab}+r_{ZM}Z^{ab}\right)
\partial_pZ_{ab}.
$$

This is the row that prevents the response from becoming a hidden fit term when the medium tensor is not exactly relaxed.

## Decision

The completed-square trace-free block yields a real closure advance:

$$
\boxed{
\text{candidate susceptibility } \kappa_Z=-r_{ZM}
\text{ is locally action-exact on retained }(M,Z)\text{ variables.}
}
$$

It is not yet a retained branch proof. The remaining obstruction is narrower:

1. a branch-local response object must emit $M$ and $Z$ as retained variables over the same event interval;
2. the root-ledger variation of $Z$ must be paired with the exposure-conjugate row above when the medium tensor is off stationarity;
3. the rest of the delayed-force, speed, support, event, and Noether sea rows must pass the total curl and conservation tests.

Thus the previous status

$$
\texttt{metric-closure-not-emitted}
$$

is sharpened to

$$
\texttt{candidate-action-exact-medium-block}.
$$

The metric-cancellation route is no longer blocked by tensor symmetry or by a local curl obstruction in the retained trace-free storage block. It remains blocked only until the branch emits the medium response object and its shared ledger.

## Promotion Decision

This packet remains `priority-only`. It is a theorem target for the geometry bridge, not reader-facing corpus prose, because the rigid octahedral branch is still a diagnostic row and the response object has not been derived from the full Noether sea dynamics.
