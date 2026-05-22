# Inventory Bias Does Not Imply Fixed-Speed Force Closure

Promotion status: `priority-only`. Closure status: `closed-rejected:inventory-bias-implies-force-closure`. This packet rejects only the narrow implication that the neutral source-site inventory

$$
N_{\mathrm{attr},i}=3,
\qquad
N_{\mathrm{rep},i}=2
$$

by itself implies fixed-speed force closure. The proof consumes the rigid octahedral fixed-speed witness in [rigid-octahedral-fixed-speed-no-go.md](rigid-octahedral-fixed-speed-no-go.md) and the force convention in [octahedral-force-residual-diagnostic.md](octahedral-force-residual-diagnostic.md). It does not retain a branch and does not authorize migration into `content/markdown/aaa`.

Executable witness:

```bash
node scripts/neutral-swarm/octahedral-inventory-closure-witness.mjs --out /tmp/neutral-swarm-octahedral-inventory-closure-witness.json --pretty
node scripts/neutral-swarm/octahedral-inventory-closure-witness.mjs --validate /tmp/neutral-swarm-octahedral-inventory-closure-witness.json --pretty
```

The artifact schema is

$$
\texttt{neutral-swarm-octahedral-inventory-closure-witness/v1}.
$$

---

## 1. Narrow Hypothesis

The rejected hypothesis is not the neutral swarm program. It is the one-row implication

$$
\left(
N_{\mathrm{attr},i}=3
\ \text{and}\
N_{\mathrm{rep},i}=2
\ \text{for every receiver } i
\right)
\Longrightarrow
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)=0
$$

for the fixed-speed force row, before any further geometry, bounded-speed factor, support-band deformation, self-hit, fold-layer, medium-response, shell swarm, or nested shell swarm row is declared.

The inventory row counts source-site signs only:

$$
N_{\mathrm{attr},i}
=
\#\{j\ne i:\sigma_i\sigma_j=-1\},
\qquad
N_{\mathrm{rep},i}
=
\#\{j\ne i:\sigma_i\sigma_j=+1\}.
$$

It does not specify causal-root locations, Jacobian weights, separation lengths, tangent projections, root multiplicities, or phase-dependent cancellations. Those quantities remain force-ledger data, not inventory data.

---

## 2. Counterexample Ledger

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

and the ordered all-pairs distinct-site source policy

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')):
(a,\sigma)\ne(b,\sigma')
\}.
$$

For every receiver, this ledger has exactly three attractive source sites and two repulsive source sites:

$$
N_{\mathrm{attr},i}=3,
\qquad
N_{\mathrm{rep},i}=2.
$$

Thus the rigid octahedral witness satisfies the full source-site inventory antecedent of the narrow implication.

---

## 3. Failed Fixed-Speed Force Closure

On the same ledger, fixed-speed force closure requires the tangential residual

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{T}_i(\theta)\cdot
\widetilde{\mathbf{F}}_i(\theta)
$$

to vanish for every retained receiver and phase. The force sum is not a count difference; it is the delayed, Jacobian-weighted all-pairs sum

$$
\widetilde{\mathbf{F}}_i(\theta)
=
\sum_{j\ne i}
\frac{\operatorname{sign}(q_iq_j)}
{y_{ij}(\theta)^2|J_{ij}(\theta)|}
\widehat{\mathbf{R}}_{ij}(\theta).
$$

The existing interval witness at

$$
(i,\theta)=((1,+),0)
$$

gives

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232].
$$

Since the interval excludes zero, the fixed-speed tangential force row fails at a required node even though the receiver has the neutral source-site inventory

$$
N_{\mathrm{attr},(1,+)}=3,
\qquad
N_{\mathrm{rep},(1,+)}=2.
$$

Therefore the implication "neutral $3$ attractive / $2$ repulsive source-site inventory by itself implies fixed-speed force closure" is false.

---

## 4. Certificate Result

The proof has the form of a direct counterexample:

| Row | Counterexample value |
| --- | --- |
| Neutral source-site inventory | passed: $N_{\mathrm{attr},i}=3$, $N_{\mathrm{rep},i}=2$ for every receiver |
| Consumed ledger | rigid octahedral fixed-speed all-pairs distinct-site ledger |
| Witness node | $(i,\theta)=((1,+),0)$ |
| Tangential residual interval | $[0.07393815228,0.07393815232]$ |
| Fixed-speed force closure | failed at the witness node |

The closure status is

$$
\texttt{closed-rejected:inventory-bias-implies-force-closure}.
$$

This status means only that source-site inventory bias is not a sufficient proof of fixed-speed force closure. It does not say that the inventory row is false or useless. The inventory row remains a necessary bookkeeping row for neutral swarm candidates; it simply cannot replace the delayed all-pairs force calculation.

---

## 5. Rejection Boundary

This packet preserves the following boundaries. It makes no claim against:

1. bounded-speed factor rows, where tangential projection can enter the speed equation rather than a fixed-speed zero row;
2. deformed support-band carriers, where the site geometry and root sheets change;
3. controlled self-hit rows with declared endpoint, action, and event accounting;
4. fold-layer rows with their own regularized event ledger;
5. medium-response rows with declared exchange terms;
6. shell swarm case reductions;
7. nested shell swarm case reductions;
8. general neutral swarm branch searches outside this rigid fixed-speed counterexample.

The retained-branch status for the rejected implication is

$$
\texttt{not\_retained}.
$$
