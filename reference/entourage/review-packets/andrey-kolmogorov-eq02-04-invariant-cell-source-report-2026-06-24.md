Closure goal:
Attack the proposed invariant-cell/coframe source report for EQ-02 through EQ-04, and determine whether its producer checks are strong enough to prevent a fabricated positive-width return-map certificate from becoming accepted evidence.

# Self-Contained Review Packet: Invariant-Cell Source Report For Coframe Extraction

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 10-12 substantive comments total. Prioritize mathematical falsifiability, return-map certification, numerical-analysis failure modes, refinement requirements, negative controls, and the minimum source report that can honestly feed a producer with verification required for advancement.

## Reviewer Lens

Use an Andrey Kolmogorov-style probability, dynamics, and numerical-certification lens. Treat the central danger as a source report that looks structured but still represents a sampled crossing, fitted row bundle, or post-hoc Lorentz-like coframe rather than a retained invariant branch.

## One Active Target

The target is gamma-free coframe extraction for `EQ-02` through `EQ-04`:

- `EQ-02`: moving-clock behavior;
- `EQ-03`: moving envelope ratio;
- `EQ-04`: energy-momentum and mass shell.

Downstream charged-lepton mass-root or Koide questions are out of scope except where they reveal a hidden fit in the coframe, mass, or support rows.

## Current Mathematical Target

The intended retained branch is represented by a finite-memory return-map certificate. Let $\mathcal H_N$ be a truncated delay-history space, let $\Sigma_N\subset\mathcal H_N$ be a transverse section, and let

$$
P_N:\Sigma_N\dashrightarrow\Sigma_N
$$

be the first-return map after declared gauge or quotient directions are handled. The proposed minimum support is a positive-width box

$$
B_N\subset\Sigma_N,
\qquad
\mu_{\perp}(B_N)>0,
$$

with a certified return inclusion, written schematically as

$$
\mathcal K_{P_N}(B_N)\subset B_N,
$$

where $\mathcal K_{P_N}$ is an interval Newton, Krawczyk, or comparable validated-numerics operator.

On the same retained support, the coframe extractor should output

$$
e^A_u
=
\left(e^0_u,e^\parallel_u,e^\perp_u\right),
$$

using only $c_f$, $u$, causal-root data, wake-return data, and retained boundary history. It must not use $\gamma_f$, Lorentz target coefficients, fitted clock/envelope rows, or the mass-shell target as inputs.

The desired reciprocal relation is

$$
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

At the current illustrative operating point $\beta_f=0.6$, the declared attempt legs are

$$
e^0_u(\partial_t)=1.25,
\qquad
e^\parallel_u=0.8,
\qquad
e^\perp_u=1.
$$

Those numbers currently pass reciprocal arithmetic only. They are not accepted extracted evidence.

## Current Producer Contract

A producer with verification required for advancement now consumes an invariant-cell/coframe source report and emits a coframe extraction certificate. The output certificate may be marked `accepted` only if every producer check passes. Otherwise it is `blocked`.

The producer checks:

1. source report has the expected source schema;
2. source report status is accepted;
3. source path is durable;
4. source is not already a coframe extraction certificate;
5. source kind is invariant-cell or wake-return extraction evidence;
6. common carrier, domain, retained row set, and support ids are concrete and match the retained row;
7. retained row bindings are accepted;
8. support kind is `positive_width_invariant_cell`;
9. support status is accepted;
10. `B_N`, `Sigma_N`, `P_N`, and `K_P_N` are certified source objects with substantive fields;
11. `positiveTransverseWidth` is positive finite;
12. `returnInclusion` is certified;
13. memory depth `N` is positive;
14. truncation error is finite and nonnegative;
15. refinement persistence is accepted;
16. extraction basis contains only allowed gamma-free inputs;
17. extracted legs are present and match the retained row within tolerance;
18. connection status and connection one-form status are accepted;
19. torsion is bounded;
20. phase holonomy on the retained phase torus is bounded;
21. support-transport and holonomy-transport residuals are present and bounded;
22. extraction, support-binding, and holonomy residuals are present and within tolerance;
23. required negative controls are accepted and name the expected failure they caught.

The output certificate is still score-neutral unless the retained-domain row bindings are also accepted on the same support.

## Current Attempt Source Report Shape

The current attempt-level source report is not accepted evidence. Its purpose is to make the next source object concrete enough to attack.

```json
{
  "schema": "aaa-equation-map-eq02-04-invariant-cell-coframe-source/v1",
  "claimLevel": "attempt-level invariant-cell/coframe source report shape; score-neutral and not accepted evidence",
  "status": "attempt",
  "sourceKind": "invariant_cell_certificate",
  "commonCarrierId": "C_02-04_bin_u_attempt_0001",
  "domainId": "D_02-04_bin_u_attempt_0001",
  "retainedRowSetId": "S_eq",
  "supportKind": "positive_width_invariant_cell",
  "supportId": "S_eq_retained_domain_attempt_0001",
  "tolerance": 1e-12,
  "drift": {
    "u": 0.6,
    "c_f": 1,
    "beta_f": 0.6
  },
  "support": {
    "kind": "positive_width_invariant_cell",
    "status": "attempt",
    "N": null,
    "truncationError": null,
    "B_N": {
      "status": "attempt",
      "id": "B_N_attempt",
      "coordinates": null,
      "radius": null
    },
    "Sigma_N": {
      "status": "attempt",
      "id": "Sigma_N_attempt",
      "sectionRule": null,
      "transversalityMargin": null
    },
    "P_N": {
      "status": "attempt",
      "id": "P_N_attempt",
      "returnTime": null,
      "mapNormBound": null
    },
    "K_P_N": {
      "status": "attempt",
      "id": "K_P_N_attempt",
      "inclusionResidual": null
    },
    "positiveTransverseWidth": null,
    "returnInclusion": "attempt",
    "refinementPersistence": {
      "status": "attempt",
      "memoryDepth": null,
      "sectionRelocation": null,
      "boxSubdivision": null,
      "driftPerturbation": null,
      "transverseDisplacement": null,
      "phasePermutation": null
    }
  },
  "rowBindings": {
    "raw_labeled_rows_preserved_on_retained_history": "attempt",
    "causal_root_ledger_rows_bound_to_S_eq": "attempt",
    "wake_tail_rows_bound_to_S_eq": "attempt",
    "energy_action_rows_bound_to_S_eq": "attempt",
    "momentum_and_angular_momentum_rows_bound_to_S_eq": "attempt",
    "phase_rows_bound_to_S_eq": "attempt",
    "Noether_sea_record_bound_to_S_eq": "attempt"
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
    "status": "attempt",
    "omegaStatus": "attempt",
    "torsionMaxAbs": 0,
    "phaseHolonomyT2": [0, 0],
    "supportTransportResidual": null,
    "holonomyTransportResidual": null
  },
  "residuals": {
    "extractionResidual": 0,
    "supportBindingResidual": 0,
    "holonomyResidual": 0
  },
  "negativeControls": {
    "section_relocation": {
      "status": "attempt",
      "expectedFailure": "support_not_persistent_under_section_relocation"
    },
    "transverse_displacement": {
      "status": "attempt",
      "expectedFailure": "sampled_crossing_escapes_invariant_cell"
    },
    "phase_permutation": {
      "status": "attempt",
      "expectedFailure": "binary_label_or_phase_permutation_breaks_row_identity"
    },
    "reciprocal_unextracted_coframe": {
      "status": "attempt",
      "expectedFailure": "reciprocal_legs_without_return_map_source"
    },
    "holonomy_retune": {
      "status": "attempt",
      "expectedFailure": "row_sections_reciprocal_but_not_parallel_transported"
    }
  }
}
```

Running the producer on this attempt source report yields a blocked certificate. The first blocker is `source_status`, followed by concrete-id, support-status, support-object, width, inclusion, memory-depth, truncation-error, refinement-persistence, and connection-status blockers.

## Specific Questions

1. Is this source report the right atomic object, or should the atomic object be a separate retained-domain certificate plus a separate coframe-extraction certificate?
2. Does the producer check list prevent the main fake-positive modes, or does it still allow a fabricated positive-width cell to pass?
3. What must `B_N` contain beyond coordinates and radius: interval hull, norm, measure convention, raw-label chart, gauge quotient, or row-bundle fiber coordinates?
4. What must `Sigma_N` report so that section relocation is a real falsifier rather than a cosmetic reparameterization?
5. What must `P_N` report: return time interval, Lipschitz bound, derivative enclosure, compactness/smoothing bound, domain-of-definition proof, or all of these?
6. What must `K_P_N` report to make $\mathcal K_{P_N}(B_N)\subset B_N$ independently checkable?
7. Is positive transverse width by itself meaningful without a declared measure $\mu_{\perp}$ and quotient convention?
8. Should `refinementPersistence` be a single accepted status, or should it be split into separate required margins for $N\to N+1$, section relocation, box subdivision, drift perturbation, transverse displacement, and phase permutation?
9. What numerical inequality should separate accepted residuals from negative controls? Is a scale hierarchy like $\epsilon_{\mathrm{reg}}\le\epsilon_{\mathrm{arith}}\le\tau_{\mathrm{accept}}\ll\Delta_{\mathrm{neg}}$ sufficient?
10. Which negative control is most decisive for distinguishing a retained branch from a sampled crossing: transverse displacement, section relocation, drift perturbation, phase permutation, or holonomy retune?
11. Should the coframe legs be outputs of the return-map certificate, or should the return-map certificate only establish support while a separate wake-return extraction computes the coframe over that support?
12. What is the strongest minimal condition that would let this source report become accepted without overclaiming full theorem closure?

## Requested Output

Please return:

- the highest-risk mathematical flaw in the source-report shape;
- the minimum fields that should be added, removed, or split before accepted evidence is allowed;
- the most important negative control;
- the first source-report acceptance theorem or lemma we should try to prove;
- any producer check that is too weak, too strong, or misplaced.

Closure goal:
Use the review to refine the source-report schema before attempting an accepted invariant-cell/coframe source report, so the next implementation step tests a genuine return-map support claim rather than a structured JSON shell.
