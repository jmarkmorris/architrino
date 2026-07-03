# Equation Closure Pass 2026-06-24 N

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: just-in-time invariant-cell coframe-certificate review packet
- Promotion status: priority-only

## Scope

This pass keeps the active target on gamma-free coframe extraction for `EQ-02` through `EQ-04`, but moves the review question from reciprocal arithmetic to the first accepted support object.

No equation scores change.

## Current Finding

The current repository has useful fail-closed patterns for return maps, Krawczyk or interval-style certificates, retained-orbit checks, root ledgers, and coframe-extraction contracts. It does not yet contain an accepted source-backed evidence object for:

$$
\left(
\Sigma_N,
P_N,
B_N,
\mathcal K_{P_N},
\mathcal C_u,
S_{\mathrm{eq}},
\Theta_D,
e^A_u,
\omega^A{}_{B,u},
T^A_u,
\Phi_{T^2}(u),
W_{\mathrm{supp}},
W_{\mathrm{hol}}
\right).
$$

The existing `coframeExtraction` certificate remains `attempt`, and the retained-record runner still blocks at:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

## Review Packet

The self-contained Poincare-style review packet is [Henri Poincare EQ02-04 Invariant-Cell Coframe Certificate 2026-06-24](../../entourage/review-packets/henri-poincare-eq02-04-invariant-cell-coframe-certificate-2026-06-24.md).

The packet asks the reviewer to attack the proposed source-backed invariant-cell/coframe extraction object before any certificate producer is implemented. The central question is whether the minimum accepted evidence should be:

- a positive-width invariant cell $B_N\subset\Sigma_N$ with $\mathcal K_{P_N}(B_N)\subset B_N$;
- an interval-enclosed fixed or periodic point inside such a cell;
- a persistent branch family over section, memory-depth, drift, and phase-permutation refinement;
- or a stricter return-map object that also carries connection and holonomy rows.

## Integrated Constraint

The next implementation should not mark the attempt certificate `accepted` by assertion. It must either:

1. produce a durable source-backed return-map certificate with real $\Sigma_N$, $P_N$, $B_N$, inclusion, refinement, and negative-control fields; or
2. leave the row at `attempt`/`not_evaluated` and sharpen the failure mode.

The same evidence must remain compatible with the existing retained-domain acceptance vector: row bindings, support witness, split witness, hidden-retune witness, overlap-preimage witness, and common-carrier legs must all refer to the same retained support.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

Submit the review packet and integrate the response immediately into one of:

- a corrected invariant-cell theorem target;
- a sharper return-map certificate schema;
- a source-backed certificate producer contract;
- a fail-closed negative control;
- or a priority-only update explaining why accepted coframe extraction is still premature.
