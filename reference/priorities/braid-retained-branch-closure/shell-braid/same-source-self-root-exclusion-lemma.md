# Same-Source Self-Root Exclusion Lemma

Promotion status: `priority-only`. This packet sharpens the same-source row used by the same-level braid root ledger. It shows that an ordinary same-curve, fixed-speed arclength-parametrized self root cannot be retained as a positive-delay Jacobian-regular delayed root. Therefore any same-source contribution in a retained fixed-speed branch must be either absent by branch policy, represented by a genuinely split source, or supplied by an explicit regularized fold-layer rule with its own action and event ledger. The bounded speed factor exception is stated in [variable-speed-factor-extension.md](variable-speed-factor-extension.md).

This does not retain a branch.

---

## 1. Same-Source Root Equation

Let a site curve be arclength-parametrized:

$$
\|\mathbf{Y}'(\lambda)\|=1.
$$

The ordinary same-source delayed root equation is

$$
G_{\mathrm{self}}(\lambda,\eta)
=
\|\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\eta)\|
-
\eta
=0,
\qquad
\eta>0.
$$

The corresponding root Jacobian is

$$
J_{\mathrm{self}}(\lambda,\eta)
=
1-
\mathbf{T}(\lambda-\eta)\cdot
\widehat{\mathbf{R}}(\lambda,\eta),
$$

where

$$
\mathbf{T}=\mathbf{Y}',
\qquad
\widehat{\mathbf{R}}
=
\frac{
\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\eta)
}{\eta}.
$$

---

## 2. Chord-Arclength Inequality

For $0<\eta<L$, the segment length from $\lambda-\eta$ to $\lambda$ is exactly $\eta$. Therefore

$$
\|\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\eta)\|
\le
\int_{\lambda-\eta}^{\lambda}
\|\mathbf{Y}'(s)\|ds
=
\eta.
$$

Thus

$$
G_{\mathrm{self}}(\lambda,\eta)\le0.
$$

Equality holds only when the curve segment between $\lambda-\eta$ and $\lambda$ is a straight segment with constant tangent aligned with the chord. In that equality case,

$$
\mathbf{T}(\lambda-\eta)=\widehat{\mathbf{R}}(\lambda,\eta),
$$

so

$$
J_{\mathrm{self}}(\lambda,\eta)=0.
$$

For $\eta\ge L$, periodicity only makes the endpoint chord shorter relative to the elapsed arclength. If $\eta=mL+\delta$ with $m\ge1$ and $0\le\delta<L$, then

$$
\|\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\eta)\|
=
\|\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\delta)\|
\le
\delta
<
\eta,
$$

except for $\delta=0$, where the chord is zero. Hence no positive-delay same-source root exists for $\eta\ge L$.

---

## 3. Consequence For Retained Roots

The retained-root gate requires

$$
|J_{\mathrm{self}}|\ge\epsilon_J>0.
$$

The chord-arclength inequality proves:

$$
G_{\mathrm{self}}=0
\quad
\Longrightarrow
\quad
J_{\mathrm{self}}=0
$$

for an ordinary same-curve arclength self row.

Therefore an ordinary same-source self row cannot have status

$$
\texttt{retained-positive-delay}
$$

in the same arclength chart used by the intrinsic dynamics equation. Its only admissible statuses are:

| Status | Meaning after the lemma |
| --- | --- |
| `absent-by-policy` | same-source ordinary roots are excluded from the branch force ledger |
| `regularized-fold-layer` | a declared $\eta>0$ rule supplies a non-ordinary self/fold contribution with action and event ledgers |
| `bounded-speed-self-hit` | a bounded speed-factor row opens an ordinary self-hit with positive Jacobian floor, short duration, overspeed budget, and action/event ledgers |
| `split-source-retained` | the source is not the identical arclength curve, but a distinct resolved representative with its own root equation and Jacobian floor |
| `reject` | a near-zero or tangent same-source row is used without a controlled replacement |

The older label `retained-positive-delay` remains meaningful for non-identical source representatives, but not for the ordinary same-curve self row.

In a bounded speed factor row, the causal elapsed distance is no longer the same as arclength. An ordinary self-hit can open only when the speed factor satisfies the overspeed hinge condition from [variable-speed-factor-extension.md](variable-speed-factor-extension.md), and it remains admissible only with short-duration, overspeed-budget, action, and event rows. Without those rows, the fixed-speed exclusion logic still controls the same-source policy.

---

## 4. Fold-Layer Obligation

A regularized fold-layer cannot be introduced as an untracked force patch. It must emit:

1. a regulator $\eta_{\mathrm{fold}}>0$ or smoothing scale;
2. a force contribution $\widetilde{\mathbf{F}}_{\mathrm{fold}}$;
3. a weak-limit or finite-regulator claim;
4. a work one-form contribution to the action row;
5. energy, momentum, angular momentum, charge, and source-provenance ledger entries;
6. a proof that the regulator does not hide collision, Jacobian-floor, or support-band failure.

The force row becomes

$$
\widetilde{\mathbf{F}}_i
=
\widetilde{\mathbf{F}}_{i,\mathrm{partner}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{cross}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{fold}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{other}},
$$

only after the fold-layer action/event row is declared. Until then, the pure-geometry rows must use the partner and cross-binary force ledger without a same-source ordinary force contribution.

---

## 5. Lemma Target

**Lemma target: ordinary same-source self-root exclusion.** For a closed $C^1$ arclength-parametrized curve $\mathbf{Y}$, the ordinary same-source delayed root equation

$$
\|\mathbf{Y}(\lambda)-\mathbf{Y}(\lambda-\eta)\|=\eta
$$

has no positive-delay root with positive Jacobian floor. If equality holds for $0<\eta<L$, the intervening curve segment is straight and $J_{\mathrm{self}}=0$. For $\eta\ge L$, equality is impossible. Consequently an ordinary same-curve self row cannot be a retained positive-delay root in the intrinsic same-level dynamics ledger.

Proof route:

1. apply the chord-length versus arclength inequality;
2. use the equality case of the triangle inequality to identify the tangent with the chord direction;
3. substitute into the root Jacobian;
4. conclude that every ordinary same-source equality has zero Jacobian and fails the retained-root floor.

---

## 6. Current Dynamics Reading

This lemma strengthens the current exact-antipodal interpretation. The $M=3$ rows that omit ordinary same-source roots are not missing an ordinary retained positive-delay force. Such a force is unavailable in the arclength chart with a positive Jacobian floor.

What remains open is different:

$$
\text{does the pure partner/cross-binary ledger close dynamics?}
$$

If not, the next force-channel expansion is not an ordinary self root. It must be either:

1. a regularized fold-layer with action and event ledger; or
2. a distinct resolved source representative that is no longer the identical same arclength curve.

Current status:

$$
\texttt{ordinary-self-root-excluded},
\qquad
\texttt{fold-layer-action-row-open},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

Future branch packets should emit:

| Field | Required payload |
| --- | --- |
| `same_source_policy` | `absent-by-policy`, `regularized-fold-layer`, `bounded-speed-self-hit`, `split-source-retained`, or `reject` |
| `ordinary_self_root_check` | chord-arclength inequality status and any equality/Jacobian-zero events |
| `fold_layer_regulator` | regulator scale and weak-limit convention if used |
| `fold_layer_force` | explicit contribution to $\widetilde{\mathbf{F}}$ |
| `fold_layer_action` | work one-form, curl, and scale/action contribution |
| `fold_layer_event_ledger` | energy, momentum, angular momentum, charge, and source-provenance entries |
| `self_row_decision` | retained status or first failure code |

Failure/status codes:

$$
\texttt{ordinary-self-root-excluded},
\qquad
\texttt{fold-layer-action-row-open},
\qquad
\texttt{same-source-split-source-unproven},
\qquad
\texttt{bounded-speed-self-hit-unproven},
$$

$$
\texttt{near-zero-self-root-unresolved},
\qquad
\texttt{regularization-unset},
\qquad
\texttt{not-retained}.
$$
