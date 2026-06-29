# Octahedral Force-Residual Diagnostic

Promotion status: `priority-only`. This packet records the executable sampled force-residual diagnostic for the rigid octahedral carrier from [Octahedral Carrier Worked Example](../shell-braid/octahedral-carrier-worked-example.md). It consumes the certified rigid-octahedral all-pairs root ledger from `scripts/neutral-braid/octahedral-root-ledger.mjs`, but it does not retain a branch.

Run the diagnostic with:

```bash
node scripts/neutral-braid/octahedral-force-residual.mjs --out /tmp/neutral-braid-octahedral-force-residual.json --pretty
node scripts/neutral-braid/octahedral-force-residual.mjs --validate /tmp/neutral-braid-octahedral-force-residual.json --pretty
```

The artifact schema is

$$
\texttt{neutral-braid-octahedral-force-residual/v1}.
$$

The single-node closure witness for the rigid fixed-speed no-go is:

```bash
node scripts/neutral-braid/octahedral-fixed-speed-witness.mjs --out /tmp/neutral-braid-octahedral-fixed-speed-witness.json --pretty
node scripts/neutral-braid/octahedral-fixed-speed-witness.mjs --validate /tmp/neutral-braid-octahedral-fixed-speed-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-braid-octahedral-fixed-speed-witness/v1}.
$$

---

## 1. Input Row

Use the rigid octahedral representative

$$
\mathbf{x}_{a,\sigma}(\theta)
=
\sigma R\mathbf{p}_a(\theta),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\},
$$

with the neutral polarity assignment

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The source-pair policy is the ordered all-pairs neutral braid policy

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')):
(a,\sigma)\ne(b,\sigma')
\},
\qquad
|\Pi_{\mathrm{all}}^{\mathrm{oct}}|=30.
$$

Same-source rows are not consumed by this diagnostic.

---

## 2. Residual Computed

For each sampled receiver phase $\theta$ and receiver site $i$, the diagnostic first solves the sampled positive-delay root equation

$$
G_{ij}(\theta,y)
=
\left\|
\mathbf{x}_i(\theta)
-
\mathbf{x}_j(\theta-y)
\right\|
-y
=0
$$

for every source $j\ne i$. With the common factor $\kappa\epsilon^2/R^2$ removed, it then computes

$$
\widetilde{\mathbf{F}}_i(\theta)
=
\sum_{j\ne i}
\frac{\operatorname{sign}(q_iq_j)W_{ij}^{\mathrm{rec}}(\theta)}
{y_{ij}(\theta)^2}
\widehat{\mathbf{R}}_{ij}(\theta),
$$

where

$$
\widehat{\mathbf{R}}_{ij}(\theta)
=
\frac{
\mathbf{x}_i(\theta)-\mathbf{x}_j(\theta-y_{ij}(\theta))
}
{y_{ij}(\theta)}.
$$

The sampled fixed-speed tangential residual is

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{T}_i(\theta)\cdot
\widetilde{\mathbf{F}}_i(\theta).
$$

The diagnostic is intentionally a fixed-speed slice. It does not solve the normal equation, speed ODE, action row, Noether row, or event ledger.

The companion frozen-ledger speed-ODE screen is [octahedral-speed-ode-diagnostic.md](octahedral-speed-ode-diagnostic.md). It reuses the same scalar row $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i$ as the speed forcing and tests whether it has the closed-period mean required by a periodic speed primitive while the rigid root and force ledger remain frozen.

---

## 3. Current Executable Verdict

With the default $181$ phase samples and default delay root search, the current artifact validates as:

| Row | Current executable result |
| --- | --- |
| Root dependency | `certified-root-ledger-dependency-passed` |
| Force residual diagnostic | `sampled_failed` |
| Rigid carrier status | `rejected_by_sampled_tangential_residual` |
| Retention | `not_retained` |
| Diagnostic first failure | `sampled-tangential-residual-failed` |
| Master first failure | `closed-rejected:rigid-octahedral-fixed-speed-neutral-row` |

The current sampled summary is approximately

$$
\max_{i,\theta}
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
\right|
\approx
2.0637,
\qquad
\operatorname{rms}
\left(
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right)
\approx
1.098.
$$

Thus the rigid zero-offset octahedral carrier is useful as a negative seed. It has a certified all-pairs root ledger, but fails the sampled fixed-speed tangential force row by an order-one margin.

The no-go closure is sharpened in [rigid-octahedral-fixed-speed-no-go.md](rigid-octahedral-fixed-speed-no-go.md). At the single required node $(i,\theta)=((1,+),0)$, the witness artifact gives

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232],
$$

which excludes zero. Therefore the rigid zero-offset fixed-speed neutral row is `closed-rejected` under this source-pair and same-source policy.

---

## 4. Interpretation

This packet rejects only the rigid zero-offset fixed-speed row under the sampled force convention. It does not reject:

1. a deformed support-band carrier;
2. a nonzero phase-lock row;
3. a central-inventory coupling row;
4. a controlled same-source or fold-layer event row;
5. a bounded-speed factor row that changes the force projection.

The frozen-ledger speed-ODE companion adds one more narrow boundary: the rigid fixed-speed force ledger also fails the zero-mean tangent-forcing row, with period integral about $1.15740669293$ for every site. Its mean-split certificate identifies the analytic antipodal-partner positive drift and the certified cross-binary phase anti-periodicity cancellation. Therefore the fixed rigid ledger cannot be promoted merely by integrating a periodic speed factor while leaving the root, Jacobian, and force weights frozen. A genuine bounded-speed route must rebuild the live ledger.

The retained-branch certificate cannot consume this result as closure because force balance, action/Noether, event, stability, and observer-export rows are not closed. The proper retained-branch status remains:

$$
\texttt{not\_retained}.
$$

The next concrete mathematical move is not to retain this rigid fixed-speed row. The surviving closure work is to reuse the root-ledger machinery for bounded-speed factors, deformed support-band carriers, or certified shell/nested shell braid case reductions. This artifact is a proof of non-retention only for the rigid zero-offset fixed-speed hypothesis, not a proof of nonexistence for the neutral braid, shell braid, or nested shell braid cases.
