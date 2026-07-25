Closure goal:
Attack the proposed source-backed invariant-cell and coframe-extraction certificate for EQ-02 through EQ-04, and decide the narrowest return-map evidence object that could honestly replace attempt-level reciprocal coframe legs with accepted wake-return coframe legs.

# Self-Contained Review Packet: Invariant-Cell Coframe Extraction

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 10-12 substantive comments total. Prioritize return maps, invariant cells, section choice, hidden retuning, branch-label persistence, and the minimum certificate that can make the current coframe extraction row accepted without weakening the checker.

## Reviewer Lens

Use a Henri Poincare-style nonlinear dynamics lens. Treat the central object as a sectioned return map in a delayed finite-memory system. The question is not whether the current reciprocal arithmetic looks Lorentz-like; it is whether there is a stable retained branch on which the clock, envelope, energy, momentum, phase, and Noether sea rows are all projections of one branch.

## One Active Target

The current target is only gamma-free coframe extraction for `EQ-02` through `EQ-04`:

- `EQ-02`: moving-clock behavior;
- `EQ-03`: moving envelope ratio;
- `EQ-04`: energy-momentum and mass shell.

Downstream charged-lepton mass-root or Koide questions are out of scope except where they reveal a hidden fit in the mass or coframe rows.

## Current State

The current arithmetic diagnostic uses a common translating-binary carrier at drift $u$:

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathfrak B_u,
\mathcal N_0,
\mathcal L_{\mathrm{root}}(u),
\mathcal L_{\mathrm{wake}}(u),
\mathcal L_{E\mathbf p\mathbf J}(u)
\right).
$$

The intended moving coframe object is

$$
\left(
e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),W_{\mathrm{supp}},W_{\mathrm{hol}}
\right),
$$

where $e^A_u$ is the moving coframe, $\omega^A{}_{B,u}$ is the connection over drift, $T^A_u$ is the wake-tail/self-hit asymmetry or torsion diagnostic, $\Phi_{T^2}(u)$ is the phase-holonomy row, $W_{\mathrm{supp}}$ proves common retained support, and $W_{\mathrm{hol}}$ proves no hidden row-by-row retuning.

At the illustrative operating point $\beta_f=0.6$, the declared attempt row reports

$$
e^0_u(\partial_t)=1.25,
\qquad
\frac{e^\parallel_u}{e^\perp_u}=0.8,
\qquad
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

The value $\gamma_f=1.25$ is reported only afterward as a comparison output. The coframe construction is not allowed to use $\gamma_f$, Lorentz target coefficients, mass-shell target residuals, or fitted clock/envelope rows.

The current checker deliberately separates two statements:

- `coframeReciprocity=passed`: the declared legs satisfy $e^0_u(\partial_t)e^\parallel_u/e^\perp_u=1$.
- `coframeExtraction=not_evaluated`: those legs have not been replaced by accepted wake-return extraction evidence.

The current extracted-coframe certificate is only attempt-level. It declares the right field shape but is not accepted evidence.

## Current First Blocker

The retained-domain reducer still blocks first at

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

This means the current retained row set has no accepted source-backed branch-domain object. In particular:

- all row bindings are still `attempt`;
- the support witness is not accepted;
- the split witness is not accepted;
- the hidden-retune witness is not accepted;
- the overlap-preimage witness is not accepted;
- the coframe certificate is still `attempt`;
- no score movement is allowed.

The current structural carrier match is not enough. A fiber product over a common carrier is only the set-level shadow of the claim. No-retune requires connection or holonomy evidence over the same retained branch.

## Proposed Score-Moving Evidence Object

The proposed evidence object is a source-backed invariant-cell certificate:

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

The intended meanings are:

- $\Sigma_N$: a transverse section in truncated finite-memory history space;
- $P_N:\Sigma_N\to\Sigma_N$: the first-return map after quotienting declared gauge directions;
- $B_N\subset\Sigma_N$: a positive-width box with positive transverse measure;
- $\mathcal K_{P_N}(B_N)\subset B_N$: a Krawczyk or interval-Newton inclusion proving a retained return object inside the box;
- $\mathcal C_u$: the common carrier used by clock, envelope, two-way signal, energy, momentum, phase, and Noether sea rows;
- $S_{\mathrm{eq}}$: the equal-frequency retained row set;
- $\Theta_D$: the row bundle over the accepted retained domain;
- $e^A_u$: the coframe extracted from causal-root and wake-return data on the same support;
- $\omega^A{}_{B,u}$: the drift connection used to transport row sections;
- $T^A_u$: torsion or wake-tail/self-hit asymmetry diagnostic;
- $\Phi_{T^2}(u)$: phase holonomy for the retained binary phase torus;
- $W_{\mathrm{supp}}=0$: support witness proving the rows live on the same retained domain;
- $W_{\mathrm{hol}}=0$: holonomy witness proving no row-by-row retune.

The certificate must also report refinement persistence under:

- memory depth $N\to N+1$;
- section relocation;
- box subdivision or mesh refinement;
- drift perturbation around the tested $u$;
- transverse displacement;
- phase permutation or binary-label permutation;
- negative controls that keep reciprocity arithmetic but break support binding or holonomy.

## Required Row Bindings

The accepted retained-domain object must bind these rows to the same retained domain, same common carrier, and same retained row set:

- raw generator labels preserved on retained history before role assignment;
- six-body polarity-neutral inventory;
- role map or quotient policy;
- path-history rows;
- causal-root ledger rows;
- wake-tail rows;
- energy/action rows;
- momentum and angular-momentum rows;
- phase rows;
- retained plane-orientation rows;
- response-center and group-velocity rows;
- local Noether sea row;
- binary-to-binary phase row-set identity;
- zero split witness;
- zero hidden-retune witness;
- consistent overlap-preimage witness.

A single sampled event is not enough unless it is enclosed as a fixed or periodic point inside a certified positive-width cell. A current proxy report is not enough. A reciprocal coframe without source, support, and holonomy evidence is not enough.

## Proposed Certificate Fields

The current attempt-level certificate shell contains these field families:

```json
{
  "status": "attempt",
  "certificateId": "coframe_extraction_attempt_0001",
  "sourceKind": "wake_return_extraction_certificate",
  "commonCarrierId": "C_02-04_bin_u_attempt_0001",
  "domainId": "D_02-04_bin_u_attempt_0001",
  "retainedRowSetId": "S_eq",
  "supportKind": "positive_width_invariant_cell",
  "supportId": "S_eq_retained_domain_attempt_0001",
  "support": {
    "B_N": "B_N_attempt",
    "Sigma_N": "Sigma_N_attempt",
    "P_N": "P_N_attempt",
    "K_P_N": "K_P_N_attempt",
    "positiveTransverseWidth": null,
    "returnInclusion": "attempt"
  },
  "extractionBasis": [
    "c_f",
    "u",
    "L_root",
    "L_wake",
    "retained_boundary_history"
  ],
  "extractedLegs": {
    "e0_dt": 1.25,
    "e_parallel": 0.8,
    "e_perp": 1
  },
  "connection": {
    "omegaStatus": "attempt",
    "torsionMaxAbs": 0,
    "phaseHolonomyT2": [0, 0]
  },
  "residuals": {
    "extractionResidual": 0,
    "supportBindingResidual": 0,
    "holonomyResidual": 0
  }
}
```

This is not accepted evidence. It is a schema target and contract with verification required for advancement.

## Specific Questions

1. Is a positive-width invariant cell the right minimum support for accepting the coframe extraction, or may a fixed/periodic point enclosed by an interval proof be accepted first?
2. What is the narrowest return-map object that should count: $P_N(B_N)\subset B_N$, a unique fixed point in $B_N$, a periodic point with a Floquet gap, or a family persistent over drift?
3. What variables must belong to the section coordinate before $P_N$ is meaningful for this target: raw labels, active causal roots, wake-tail rows, phase rows, energy/action rows, Noether sea state, coframe legs, or all of them?
4. How should the raw-label preservation row be formulated dynamically? Is it a local trivialization over $B_N$, a branch-symbol itinerary, a section coordinate, or a transport rule from $u=0$ to $u\neq0$?
5. What is the minimum branch-label persistence test across $N\to N+1$, section relocation, and phase permutation?
6. How should $W_{\mathrm{supp}}=0$ be distinguished from $W_{\mathrm{hol}}=0$ in return-map terms?
7. Does $W_{\mathrm{hol}}=0$ require a flat connection around a drift loop, a zero phase holonomy on the retained torus, or a vanishing mismatch between row transports?
8. What would be the most dangerous hidden-retune failure that could survive the current checks?
9. What negative control should be added for an invariant-cell certificate: a nearby reciprocal-but-split cell, a frozen-root replay, a section-relocated mismatch, a phase-permuted false positive, or something else?
10. Can extracted coframe legs be output as row projections from $P_N$ and $B_N$, or must they be computed from a separate wake-return operator defined over the cell?
11. What residuals should be raw and what residuals should be normalized so that a later reviewer cannot hide scale in the tolerance?
12. Please state the smallest theorem, lemma, or certificate target that would make this lane mathematically serious and implementable as the next solver artifact.

## Expected Output

- Overall insights, corrections, and advancements.
- A verdict on whether positive-width invariant-cell support is necessary before acceptance.
- The minimum return-map certificate that should underwrite accepted coframe extraction.
- The correct dynamic interpretation of raw-label preservation, $W_{\mathrm{supp}}$, and $W_{\mathrm{hol}}$.
- The highest-risk hidden-retune or hidden-fit route.
- One concrete negative control to add before implementation.
- One compact theorem, lemma, or certificate target for the next solver artifact.

Closure goal:
Obtain a Poincare-style attack on the invariant-cell coframe-extraction certificate before implementing a certificate producer, so the next solver artifact tests a retained return-map object rather than encoding another Lorentz-looking proxy.
