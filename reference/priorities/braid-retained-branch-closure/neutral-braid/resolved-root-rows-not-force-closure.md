# Resolved Root Rows Do Not Imply Fixed-Speed Force Closure

Promotion status: `priority-only`. Closure status: `closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure`. This packet rejects only the narrow implication that resolved positive-delay source roots with positive Jacobian data imply fixed-speed force closure. It consumes the rigid octahedral fixed-speed witness in [rigid-octahedral-fixed-speed-no-go.md](rigid-octahedral-fixed-speed-no-go.md) and the force convention in [octahedral-force-residual-diagnostic.md](octahedral-force-residual-diagnostic.md). It does not retain a branch and does not authorize migration into `content/markdown/aaa`.

Executable witness path:

```bash
node scripts/neutral-braid/octahedral-root-force-closure-witness.mjs --out /tmp/neutral-braid-octahedral-root-force-closure-witness.json --pretty
node scripts/neutral-braid/octahedral-root-force-closure-witness.mjs --validate /tmp/neutral-braid-octahedral-root-force-closure-witness.json --pretty
```

The artifact schema is

$$
\texttt{neutral-braid-octahedral-root-force-closure-witness/v1}.
$$

---

## 1. Narrow Hypothesis

The rejected hypothesis is the one-row implication

$$
\left(
\text{every ordered distinct-source row at a receiver has one resolved positive-delay root}
\ \text{and positive Jacobian data}
\right)
\Longrightarrow
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)=0
$$

for the fixed-speed force row.

In ledger terms, the antecedent says that, at a declared receiver-phase node, each ordered distinct-source row satisfies

$$
\texttt{root\_count}=1,
\qquad
J_{ij}(\theta)>0
$$

on the consumed positive-delay root. The consequent is the fixed-speed tangential force closure row

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{T}_i(\theta)\cdot
\widetilde{\mathbf{F}}_i(\theta)
=0.
$$

This implication is stronger than root-ledger certification. A resolved positive-delay root row supplies source timing and a source-normal denominator. It does not by itself assert cancellation of the delayed, signed, receiver-normal force sum.

---

## 2. Consumed Counterexample

Use the rigid octahedral fixed-speed carrier

$$
\mathbf{x}_{a,\sigma}(\theta)
=
\sigma R\mathbf{p}_a(\theta),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\},
$$

with neutral opposite-pair polarity

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon,
$$

ordinary same-source excluded, and the ordered all-pairs distinct-source policy

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')):
(a,\sigma)\ne(b,\sigma')
\}.
$$

At the witness node

$$
(i,\theta)=((1,+),0),
$$

the five ordered distinct-source rows are all resolved:

| Source row | Root data at the witness node |
| --- | --- |
| $(1,-)$ | `root_count=1`, positive Jacobian data |
| $(2,+)$ | `root_count=1`, positive Jacobian data |
| $(2,-)$ | `root_count=1`, positive Jacobian data |
| $(3,+)$ | `root_count=1`, positive Jacobian data |
| $(3,-)$ | `root_count=1`, positive Jacobian data |

Thus the rigid octahedral fixed-speed witness satisfies the full antecedent of the narrow implication at the declared receiver-phase node.

---

## 3. Failed Fixed-Speed Force Closure

The fixed-speed force row is not a root-count row. On the consumed ledger it is the delayed, signed, receiver-normal all-pairs sum

$$
\widetilde{\mathbf{F}}_i(\theta)
=
\sum_{j\ne i}
\frac{\operatorname{sign}(q_iq_j)}
{y_{ij}(\theta)^2|J_{ij}(\theta)|}
\widehat{\mathbf{R}}_{ij}(\theta),
$$

with tangential residual

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{T}_i(\theta)\cdot
\widetilde{\mathbf{F}}_i(\theta).
$$

For the same witness node, the interval certificate gives

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232].
$$

Since

$$
0\notin[0.07393815228,0.07393815232],
$$

the fixed-speed tangential force row fails at a node where all five ordered distinct-source rows are resolved with `root_count=1` and positive Jacobian data. Therefore the implication

$$
\text{resolved positive-delay source roots with positive Jacobian data}
\Longrightarrow
\text{fixed-speed force closure}
$$

is false.

---

## 4. Certificate Result

The proof has the form of a direct counterexample:

| Row | Counterexample value |
| --- | --- |
| Rejected implication | resolved positive-delay source roots with positive Jacobian data imply fixed-speed force closure |
| Consumed ledger | rigid octahedral fixed-speed all-pairs distinct-source ledger |
| Witness node | $(i,\theta)=((1,+),0)$ |
| Ordered distinct-source rows | five |
| Root count row | every ordered distinct-source row has `root_count=1` |
| Jacobian row | every ordered distinct-source row has positive Jacobian data |
| Tangential residual interval | $[0.07393815228,0.07393815232]$ |
| Fixed-speed force closure | failed at the witness node |

The closure status is

$$
\texttt{closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure}.
$$

The retained-branch status for the rejected implication is

$$
\texttt{not\_retained}.
$$

---

## 5. Boundary Of The Rejection

This packet preserves the following boundaries. It makes no claim against:

1. certified all-pairs root-ledger usefulness;
2. support-complete root certification;
3. bounded-speed routes, where tangential projection can enter the speed equation rather than a fixed-speed zero row;
4. deformed support-band routes, where the carrier and root sheets change;
5. controlled self-hit rows with declared endpoint, action, and event accounting;
6. fold-layer rows with their own regularized event ledger;
7. medium-response rows with declared exchange terms;
8. shell braid case reductions;
9. nested shell braid case reductions;
10. general neutral braid branch searches outside this narrow fixed-speed implication.

The only closed-rejected statement is that resolved positive-delay source roots with positive Jacobian data are not sufficient, by themselves, to prove fixed-speed force closure.
