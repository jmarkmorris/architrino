# Equation Closure Pass 2026-06-24 Q

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral invariant-cell/coframe source report shape
- Promotion status: priority-only

## Scope

This pass adds the first durable source-report shape for the `EQ-02` through `EQ-04` coframe extraction producer. It also creates the next just-in-time review packet aimed at the new blocker.

No equation scores change.

## Executable Change

The new attempt source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-attempt.v1.json
```

It uses the producer's expected source schema:

```text
aaa-equation-map-eq02-04-invariant-cell-coframe-source/v1
```

The report is explicitly `attempt` status. It is a source-report shape, not evidence. It names the fields that a later accepted report must populate:

- retained row set `S_eq`;
- common carrier, domain, and support ids;
- finite-memory drift data;
- positive-width invariant-cell support;
- `B_N`, `Sigma_N`, `P_N`, and `K_P_N`;
- positive transverse width;
- return inclusion;
- memory depth and truncation error;
- refinement persistence across memory depth, section relocation, box subdivision, drift perturbation, transverse displacement, and phase permutation;
- retained row bindings;
- gamma-free extraction basis;
- extracted coframe legs;
- connection, torsion, and phase-holonomy diagnostics;
- extraction, support-binding, and holonomy residuals;
- negative controls for sampled-crossing, reciprocal-but-unextracted, and holonomy-retune failures.

Running the producer on this source report now blocks at `source_status` rather than `source_schema`. This is useful because the source object has the right outer schema while remaining non-evidence.

## Review Packet

The new review packet is:

```text
reference/entourage/review-packets/andrey-kolmogorov-eq02-04-invariant-cell-source-report-2026-06-24.md
```

It asks for an attack on whether the source report and producer checks are sufficient to prevent fabricated positive-width return-map evidence. The packet is self-contained and asks for:

- the highest-risk mathematical flaw;
- minimum fields to add, remove, or split;
- the most important negative control;
- the first source-report acceptance theorem or lemma;
- producer checks that are too weak, too strong, or misplaced.

## Current Output

The source-report fixture produces a blocked certificate with:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=source_status`;
- failed checks for source/support acceptance, concrete accepted ids, retained row bindings, certified support fields, positive width, return inclusion, memory depth, truncation error, refinement persistence, connection status, connection transport residuals, and required negative controls.

The retained-record attempt remains unchanged:

- `coframeReciprocity=passed`;
- `coframeExtraction=not_evaluated`;
- `coframeExtraction.reason=coframe_extraction_evidence_not_accepted`;
- `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

Integrate the Kolmogorov-style response before attempting an accepted source report. The specific question is whether the source report should keep one combined invariant-cell/coframe object or split into a retained-domain certificate plus a wake-return coframe extraction certificate over that accepted support.
