# Central Inventory Inside Hollow Support

Promotion status: `priority-only`. This packet connects the neutral braid hollow support row to charged central-inventory closure. It refines [Neutral Braid Model](neutral-braid-model.md) and [central-inventory-and-event-ledgers.md](../shell-braid/central-inventory-and-event-ledgers.md). It does not retain a branch, promote charged-fermion ontology, or authorize corpus migration.

The target is:

$$
\text{neutral braid hollow support}
+
\text{resolved or regularized central inventory}
+
\text{shared root/action/event ledger}
\quad
\Longrightarrow
\quad
\text{admissible charged-branch bookkeeping candidate}.
$$

The implication is a theorem target only. A neutral braid may provide a support band around central inventory, but it does not by itself explain charge, mass, stability, or observer exports.

---

## 1. Hollow Support Row

Let the six neutral braid sites be

$$
I_S=\{1,\ldots,6\},
\qquad
\sum_{i\in I_S}\sigma_i=0,
$$

with support radii

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|.
$$

The hollow support descriptor is

$$
\mathcal{D}_{\mathrm{hollow}}
=
\left(
\mathbf{C},
R_{\mathrm{in}},
R_{\mathrm{out}},
\mathcal{I}_{\mathrm{cent}},
\mathsf{BoundaryPolicy},
\mathsf{ExchangePolicy}
\right),
$$

with

$$
0<R_{\mathrm{in}}<R_{\mathrm{out}}.
$$

The neutral braid exclusion row is

$$
\mathcal{R}_{\mathrm{hole}}^{S}
=
\max_{i\in I_S}
\sup_\lambda
\left(R_{\mathrm{in}}-r_i(\lambda)\right)_+.
$$

This row says only that the six neutral braid paths do not enter the central hollow. It does not decide what occupies the hollow.

---

## 2. Central Inventory Row

Let $\mathcal{I}_{\mathrm{cent}}$ be a finite labeled set of central-inventory architrinos with polarity map

$$
\sigma_a\in\{+1,-1\},
\qquad
a\in\mathcal{I}_{\mathrm{cent}}.
$$

The central charge is

$$
Q_{\mathrm{cent}}
=
\epsilon
\sum_{a\in\mathcal{I}_{\mathrm{cent}}}\sigma_a,
$$

and the total branch charge is

$$
Q_{\mathrm{tot}}
=
Q_S+Q_{\mathrm{cent}},
\qquad
Q_S=0.
$$

For a twelve-architrino charged branch with a neutral six-site choreography, the central inventory has six labels:

$$
|\mathcal{I}_{\mathrm{cent}}|=6.
$$

An electron-like inventory has

$$
N_{\mathrm{cent},+}=0,
\qquad
N_{\mathrm{cent},-}=6,
\qquad
Q_{\mathrm{cent}}=-e.
$$

This is integer bookkeeping only. It is not permission to place unresolved point charges at $\mathbf{C}$.

---

## 3. Representative Status

Every central-inventory label must have one representative status:

| Status | Meaning |
| --- | --- |
| `resolved-worldline` | the label has a noncolliding path $\mathbf{Z}_a$ inside the hollow |
| `regularized-support` | the label is represented by a finite support or fold-layer regulator |
| `split-source-retained` | the label is distributed across a certified source packet with provenance |
| `absent-by-policy` | the label is excluded from the branch under an explicit inventory policy |
| `reject` | the label has no admissible representative |

If $a$ has a resolved worldline, write

$$
\mathbf{Z}_a:\mathbb{R}/L_a\mathbb{Z}\to\mathbb{R}^3.
$$

The central containment row is

$$
\mathcal{R}_{\mathrm{cent\text{-}in}}
=
\max_{a\in\mathcal{I}_{\mathrm{cent}}}
\sup_\lambda
\left(\|\mathbf{Z}_a(\lambda)-\mathbf{C}\|-R_{\mathrm{in}}\right)_+.
$$

The separation row from neutral braid paths is

$$
d_{S,C}
=
\inf_{\substack{i\in I_S,\,a\in\mathcal{I}_{\mathrm{cent}}\\u,v}}
\|\mathbf{x}_i(u)-\mathbf{z}_a(v)\|.
$$

The branch requires

$$
d_{S,C}\ge d_{\mathrm{cent}}>0
$$

unless a declared event row is active and ledgered.

---

## 4. Shared Root Ledger

Central inventory cannot be handled by a separate hidden force law. The active root ledger must declare whether source pairs are:

| Pair class | Required handling |
| --- | --- |
| $S\to S$ | neutral braid all-pairs root ledger |
| $S\leftrightarrow C$ | cross ledger between neutral braid and central inventory |
| $C\to C$ | central-inventory internal roots or explicit regularization policy |

For resolved paths, roots solve

$$
G_{pq,\alpha}^{\nu}(u,\eta)
=
\|\mathbf{X}_p(u)-\mathbf{X}_q(u-\eta)\|
-\eta
=0,
$$

where $p,q\in I_S\cup\mathcal{I}_{\mathrm{cent}}$ and $p\ne q$. The Jacobian floor row is

$$
|J_{pq,\alpha}^{\nu}|\ge\epsilon_J.
$$

If a central label is regularized rather than resolved, the packet must replace $G_{pq,\alpha}^{\nu}$ with an explicit source-kernel or fold-layer row and must emit the corresponding force, action, and event terms.

---

## 5. Hollow-Boundary Events

The hollow boundary is an event surface, not an invisible wall. Define

$$
B_i^{\mathrm{in}}(u)=R_{\mathrm{in}}-\rho_i(u)
$$

for neutral braid paths and

$$
B_a^{\mathrm{out}}(u)=\rho_a(u)-R_{\mathrm{in}}
$$

for resolved central-inventory paths. A crossing or grazing contact must be classified as one of:

| Event | Required row |
| --- | --- |
| `neutral-hollow-entry` | support-boundary exchange and source provenance |
| `central-hollow-exit` | charged-inventory leakage and event conservation |
| `near-boundary-graze` | transversality or dwell-time row |
| `regularized-boundary-contact` | regulator work and endpoint exchange |

The event ledger must report charge, energy, momentum, angular momentum, and source provenance before the branch can be retained.

---

## 6. Closure Status

The hollow-support central-inventory block is

$$
\mathcal{R}_{\mathrm{cent\text{-}hollow}}
=
\left(
\mathcal{R}_{\mathrm{hole}}^{S},
\mathcal{R}_{\mathrm{cent\text{-}in}},
d_{S,C}^{-1},
\mathcal{R}_{S\leftrightarrow C}^{\mathrm{root}},
\mathcal{R}_{C\to C}^{\mathrm{root/reg}},
\mathcal{R}_{\mathrm{hollow\text{-}event}},
\mathcal{R}_{\mathrm{provenance}}
\right).
$$

The allowed statuses are:

| Status | Meaning |
| --- | --- |
| `central-hollow-compatible` | all central labels are represented and all cross rows close |
| `central-inventory-ledger-open` | inventory is counted but representatives are not closed |
| `cross-root-ledger-open` | neutral braid and central inventory do not yet share one root ledger |
| `hollow-event-open` | boundary crossing or support work lacks conservation provenance |
| `central-inventory-rejected` | at least one central label has no admissible representative |

Until this block closes, a neutral braid may remain a viable neutral branch candidate, but a charged branch using central inventory remains unretained.
