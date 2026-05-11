# $A_0$ Energy and Shielding Extraction Packet

## Purpose

This packet defines the Tier 2 handoff after a reduced $A_0$ branch certificate passes closure and stability. It ties the branch output to the energy ledger and shielding definitions owned by [Energy](../../../content/markdown/aaa/dynamics/energy.md).

Tier 2 must not run before Tier 1 produces a stable $\eta>0$ branch with residuals below tolerance and $\Delta_{\mathbf{k}}>0$.

## Inputs

Required inputs from [$A_0$ Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md):

- full branch label $\Lambda$;
- finite causal-root ledger $\mathcal{G}_{A_0}$;
- state vector and history segment over $T_{\mathbf{k}}$;
- residual vector $\mathcal{R}_{A_0}$;
- stability gap $\Delta_{\mathbf{k}}$;
- averaging, locking, and leakage classification;
- refinement schedule for $\Delta t$, history depth, angular sampling, and $\eta$.

## Energy Ledger

The energy packet must report sign-resolved layer and interaction content:

| Quantity | Required data |
| --- | --- |
| Layer kinetic content | $E_{k,I}$, $E_{k,M}$, $E_{k,O}$ by constituent and by cycle average |
| Pair interaction content | partner, self, and inter-layer interaction terms, with active root labels |
| Wake/history content | regularized history term and convergence behavior under $\eta$ and history refinement |
| Total internal ledger | $E_I$, $E_M$, $E_O$, and $E_{\text{internal}}(A_0)$ |
| Cycle action | action per closed cycle, with branch label $\Lambda$ and period $T_{\mathbf{k}}$ |

The packet must state whether the interaction content is represented through $E_{\text{wake}}$ alone or through a pairwise decomposition plus an explicitly non-overlapping wake term. Mixing both without a non-overlap rule is a double-counting failure.

## Shielding Extraction

Shielding is extracted only from the accepted branch, not fitted to a particle benchmark. The far-field calculation must report:

$$
\mathcal{L}(\hat{\mathbf{R}})
=
\left\langle
\sum_{a\in A_0}
q_a W_a(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}},
$$

with angular grid, far-field radii, selected wake channel, and refinement status.

The scalar coefficient is accepted only as the leading isotropic projection:

$$
\zeta(A_0)
=
\frac{\|\Pi_0\mathcal{L}\|}
{\|\mathcal{L}_{\text{naive}}\|}.
$$

The anisotropic residue is retained as

$$
\mathcal{L}_{\text{aniso}}
=
(1-\Pi_0)\mathcal{L}.
$$

## Acceptance Gates

Tier 2 passes only if:

1. $E_{\text{internal}}(A_0)$ converges under $\Delta t$, history, and $\eta$ refinement;
2. the far-field leading channel is stable under extraction radius and angular resolution;
3. $\zeta(A_0)$ is computed from the accepted branch without observed particle masses, electron radius, charged-lepton ratios, or measured $\alpha$ as inputs;
4. $\mathcal{L}_{\text{aniso}}$ is reported rather than hidden;
5. the output preserves enough state to rerun the extraction from the branch packet.

## Failure Codes

| Failure code | Meaning |
| --- | --- |
| `energy-double-count` | pairwise interaction and wake/history terms overlap without a non-overlap rule |
| `energy-nonconvergent` | internal energy ledger changes under refinement |
| `shielding-radius-drift` | far-field coefficient changes with extraction radius |
| `shielding-angular-drift` | far-field coefficient changes with angular resolution |
| `leakage-unreported` | anisotropic leakage exists but is not emitted |
| `benchmark-contaminated` | observed mass or hierarchy data entered before extraction |

## Promotion Rule

Only a Tier 2 packet passing these gates may promote `derive_first_attractor_family` toward `derive_zeta`. A failed Tier 2 packet remains a branch-analysis result, not a mass-map result.
