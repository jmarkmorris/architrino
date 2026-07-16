# Nested Shell Braid Reduction Row

Promotion status: `priority-only`. This packet formalizes nested shell braid as a stricter case reduction of a neutral braid branch. It refines [Neutral Braid Model](../neutral-braid/neutral-braid-model.md), [Nested Shell Braid Model Card](nested-shell-braid-model-card.md), [Nested Shell Braid Radial Support Functional](nested-shell-braid-radial-support-functional.md), and [Shell Braid Reduction Row](../shell-braid/shell-braid-reduction-row.md).

The reduction target is:

$$
\mathfrak{R}_{\mathrm{neutral}}^\nu(B)
+
\mathcal{R}_{\mathrm{partition}}
+
\mathcal{R}_{\mathrm{nested}}
\quad
\Longrightarrow
\quad
\text{neutral braid branch in the nested shell braid case}.
$$

The implication is a case classification only. It does not retain the branch and does not promote observer exports.

---

## 1. Partition Row

A nested shell braid case requires a declared binary partition

$$
\mathcal{P}=\{P_1,P_2,P_3\},
\qquad
|P_a|=2,
\qquad
\sum_{i\in P_a}\sigma_i=0.
$$

Only after this row is declared may the packet use the shorthand

$$
i=(a,\sigma),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+,-\}.
$$

The partition residual is

$$
\mathcal{R}_{\mathrm{partition}}
=
\left(
\mathcal{R}_{\mathrm{pair\text{-}charge}},
\mathcal{R}_{\mathrm{pair\text{-}root}},
\mathcal{R}_{\mathrm{pair\text{-}speed}},
\mathcal{R}_{\mathrm{pair\text{-}ledger}}
\right).
$$

Exact antipodality is optional. If it is claimed, the branch must add

$$
\mathcal{R}_{\mathrm{anti},a}
=
\max_{\sigma=\pm}
\sup_\lambda
\left\|
\mathbf{Y}_{a,-\sigma}(\lambda+\Delta_a)
+
\mathbf{Y}_{a,\sigma}(\lambda)
-2\mathbf{C}
\right\|.
$$

No nested shell braid conclusion may depend on exact antipodality unless this residual is explicitly statused.

---

## 2. Radial Functional Row

The shell radius $R_a$ is not primitive. A retained nested shell braid packet must declare a radial support functional

$$
R_a=\mathscr{R}_a(\mathbf{Y},\nu,\mathcal{D}_{\mathrm{supp}},\mathcal{P})
$$

and use one convention throughout the branch certificate. Admissible conventions include arclength mean, causal-time mean, support-band midpoint, or interval-center rows, but they cannot be mixed.

The derivative row must emit

$$
D_vR_a,
\qquad
D_v(R_b-R_a),
\qquad
D_v\left(\frac{R_a-\bar R}{\bar R}\right),
$$

for every branch-tangent or Krawczyk direction consumed by continuation, proof-budget, or event-normal-form rows.

If $R_a$ is interval-valued, every nested shell inequality must use interval margins rather than point estimates.

---

## 3. Ordered Support Bands

Let

$$
\bar R=\frac13\sum_{a=1}^3R_a.
$$

For an ordered nested shell braid with adjacent labels $(I,M,O)$ or another declared convention, the radial gap margins are

$$
\mathcal{G}_{IM}^{R}(W)
=
\inf_{u\in W}
\frac{R_M(u)-R_I(u)}{\bar R(u)},
\qquad
\mathcal{G}_{MO}^{R}(W)
=
\inf_{u\in W}
\frac{R_O(u)-R_M(u)}{\bar R(u)}.
$$

The nested shell case row is

$$
\mathcal{G}_{IM}^{R}(W)>\epsilon_R,
\qquad
\mathcal{G}_{MO}^{R}(W)>\epsilon_R.
$$

The spread row from the shell braid reduction may pass or fail independently. A nested shell braid may have separated shells rather than a common shell band, but it still inherits all neutral braid rows and all declared support-work rows.

---

## 4. Label-Use Ledger

The labels `inner`, `middle`, and `outer` are not allowed to carry unstated dynamics. A nested shell braid packet must declare one label-use status:

| Status | Meaning |
| --- | --- |
| `geometric-order` | labels are certified by ordered support radii on $W$ |
| `continuation-history` | labels name the branch case from which the row was continued |
| `weak-stress-role` | labels name a dynamical role with an emitted force, event, or support residual |
| `rejected-label` | the labels do not have a ledger-consistent meaning on the current row |

If a label is used as a weak-stress role, the packet must define the residual that identifies the role. Examples include a near-field-speed hinge, a self-hit-prone binary, or a support-boundary event row. The label cannot be asserted from visual order alone.

---

## 5. Transition Row

The transition case is the region where an ordered nested shell braid approaches a shell braid or loses radial order:

$$
0\le
\mathcal{G}_{ab}^{R}(W)
\le
\epsilon_R
$$

for at least one adjacent pair, or where

$$
\mathcal{R}_{\mathrm{spread}}^{\mathrm{shell}}(W)
\le
\epsilon_{\mathrm{same}}
$$

becomes the better support descriptor. A transition row must emit the first event surface

$$
\mathcal{M}_{ab}^{R}=0
$$

and a transversality or tangency status:

$$
D_\tau \mathcal{M}_{ab}^{R}\ne0
\quad
\text{or}
\quad
D_\tau \mathcal{M}_{ab}^{R}=0
\text{ with higher-order status}.
$$

Without this event row, branch continuation across shell-order change is not certified.

---

## 6. Nested Reduction Residual

The nested shell braid reduction block is

$$
\mathcal{R}_{\mathrm{nested}}
=
\left(
\mathcal{R}_{\mathrm{partition}},
\mathcal{R}_{R\mathrm{def}},
\mathcal{R}_{R\mathrm{gap}},
\mathcal{R}_{R\mathrm{der}},
\mathcal{R}_{\mathrm{label}},
\mathcal{R}_{\mathrm{transition}},
\mathcal{R}_{\mathrm{case\text{-}status}}
\right).
$$

The branch status is:

| Status | Meaning |
| --- | --- |
| `nested-shell-case-passed` | partition, radial functional, gap, derivative, and label-use rows close |
| `nested-shell-transition` | a certified radial transition event is active |
| `shell-case-instead` | common support-band shell row is better supported than ordered radial gaps |
| `partition-case-failed` | no admissible binary partition supports the nested shell row |
| `neutral-branch-only` | the broader neutral braid branch may remain viable, but the nested shell braid reduction is unavailable |

Thus nested shell braid failure rejects only the stricter reduction. It does not discard shell braid or neutral braid candidates unless their required rows fail separately.
