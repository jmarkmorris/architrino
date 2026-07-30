# Field-Speed Ceiling Investigation

## Current

- Status: `discussion-scoped investigation`
- Claim level: proposed foundational alternative; no change to the canonical
  Master Equation, ontology, EOM solver contract, or reader-facing corpus.
- Operator proposal under examination: each architrino has an admissible speed
  domain $\|\mathbf V\|\le c_f$, may reach the field-speed boundary, and has
  no admissible super-field-speed continuation.

## Objective

Determine the exact consequences of treating the field speed as a primitive
architrino speed ceiling rather than only causal-wake propagation speed. Keep
the inquiry separate from MEC-007: it may use MEC-007's threshold result, but
it neither supplies nor assumes a continuation, an account, conservation, or
a physical realization.

## Scope

The investigation must distinguish three questions:

1. the admissible velocity domain;
2. exact field-speed root admission and bookkeeping, including whether the
   excluded diagonal remains excluded or has a separately declared boundary
   status; and
3. the evolution semantics at the boundary when a canonical regular partner
   acceleration has a speed-increasing component.

It must map corpus, solver, Braid, and MEC consequences before any foundational
adoption. It may not silently clamp, delete, reweight, or book a causal root;
each such behavior would be a separately stated postulate.

## Work Queue

The bounded investigation and its decision boundary are in
[work-queue.md](work-queue.md). Provisional variants and rejected shortcuts
belong in [brainstorming.md](brainstorming.md); chronological findings belong
in [work-log.md](work-log.md).

The provisional coordinate-free framework is in
[mathematics-geometry-dynamical-system.md](mathematics-geometry-dynamical-system.md).

## Dependencies and Boundaries

- [MEC-007](../master-equation-closure/mirror-close-approach-causal-root-boundary.md)
  supplies the first-field-speed event and the unchanged sharp-law
  post-threshold obstruction; it does not select a ceiling rule.
- [MEC-002](../master-equation-closure/causal-wake-update-law.md),
  [MEC-003](../master-equation-closure/finite-coincident-same-transmitter-transition.md),
  [MEC-004](../master-equation-closure/same-update-conserved-accounts.md), and
  [MEC-005](../master-equation-closure/pairwise-causal-root-ledger-closure.md)
  retain their existing ownership and are not advanced by this investigation.
- The EOM solver's current above-field-speed support and Braid prescribed-path
  diagnostics are existing scope, not evidence for or against this proposal.

Plainly: this is a dedicated place to ask whether a speed ceiling should become
a foundational rule, and what else would have to change if it did. Nothing has
been adopted.
