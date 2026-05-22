# Octahedral Force-Residual Diagnostic

Promotion status: `priority-only`. This packet records the executable sampled force-residual diagnostic for the rigid octahedral carrier from [../shell-swarm/octahedral-carrier-worked-example.md](../shell-swarm/octahedral-carrier-worked-example.md). It uses the sampled root ledger from `scripts/neutral-swarm/octahedral-root-ledger.mjs` as input evidence, but it does not certify the all-pairs root ledger and does not retain a branch.

Run the diagnostic with:

```bash
node scripts/neutral-swarm/octahedral-force-residual.mjs --out /tmp/neutral-swarm-octahedral-force-residual.json --pretty
node scripts/neutral-swarm/octahedral-force-residual.mjs --validate /tmp/neutral-swarm-octahedral-force-residual.json --pretty
```

The artifact schema is

$$
\texttt{neutral-swarm-octahedral-force-residual/v1}.
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

The source-pair policy is the ordered all-pairs neutral swarm policy

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
\frac{\operatorname{sign}(q_iq_j)}
{y_{ij}(\theta)^2|J_{ij}(\theta)|}
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

---

## 3. Current Executable Verdict

With the default $181$ phase samples and default delay root search, the current artifact validates as:

| Row | Current executable result |
| --- | --- |
| Sampled root dependency | `sampled-root-ledger-diagnostic-passed` |
| Force residual diagnostic | `sampled_failed` |
| Rigid carrier status | `rejected_by_sampled_tangential_residual` |
| Retention | `not_retained` |
| Diagnostic first failure | `sampled-tangential-residual-failed` |
| Master first failure | `support-complete-root-ledger-open` |

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

Thus the rigid zero-offset octahedral carrier is useful as a negative seed. It passes sampled all-pairs root counting, but fails the sampled fixed-speed tangential force row by an order-one margin.

---

## 4. Interpretation

This packet rejects only the rigid zero-offset fixed-speed row under the sampled force convention. It does not reject:

1. a deformed support-band carrier;
2. a nonzero phase-lock row;
3. a central-inventory coupling row;
4. a controlled same-source or fold-layer event row;
5. a bounded-speed factor row that changes the force projection.

The retained-branch certificate cannot consume this result as closure because the root ledger is sampled rather than interval-certified. The proper retained-branch status remains:

$$
\texttt{not\_retained}.
$$

The next concrete mathematical move is to convert either the root dependency or the tangential residual into an interval-certified row. Until then, this artifact is a disciplined rejection screen, not a proof of nonexistence for the neutral swarm, shell swarm, or nested shell swarm cases.
