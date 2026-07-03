# Equation Closure Pass 2026-06-24 P

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral coframe extraction producer contract
- Promotion status: priority-only

## Scope

This pass implements the next concrete artifact after the pass-O support guard: a fail-closed coframe extraction producer for `EQ-02` through `EQ-04`.

No equation scores change.

## Executable Change

The new producer script is:

```text
scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs
```

It consumes a durable invariant-cell/coframe source report with schema:

```text
aaa-equation-map-eq02-04-invariant-cell-coframe-source/v1
```

and emits the existing coframe extraction certificate schema:

```text
aaa-equation-map-eq02-04-coframe-extraction-certificate/v1
```

The producer marks the output certificate `accepted` only when the source report supplies:

- accepted source status and durable source path;
- matching `commonCarrierId`, `domainId`, `retainedRowSetId`, and `supportId`;
- accepted positive-width invariant-cell support;
- certified `B_N`, `Sigma_N`, `P_N`, and `K_P_N` support objects;
- positive `positiveTransverseWidth`;
- certified `returnInclusion`;
- memory depth `N`, truncation error, and refinement persistence;
- gamma-free extraction basis using only `c_f`, `u`, `L_root`, `L_wake`, and optionally retained boundary history;
- extracted coframe legs matching the retained-record row within tolerance;
- accepted connection/holonomy data;
- bounded extraction, support-binding, and holonomy residuals.

The retained-record runner now also requires an accepted producer record on any accepted coframe extraction certificate. This prevents a hand-written certificate shell from bypassing the source report and producer checks.

## Guard Tightening

This pass also closes two accepted-certificate failure modes:

- a certificate source path may not point at another coframe extraction certificate schema;
- accepted support-field objects must carry concrete identity, and any declared source path on those objects must exist.

These checks keep `accepted` as a source-backed state rather than a label applied to a JSON shell.

## Current Output

The current attempt fixture is unchanged in status:

- `coframeReciprocity=passed`;
- `coframeExtraction=not_evaluated`;
- `coframeExtraction.reason=coframe_extraction_evidence_not_accepted`;
- `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

Running the producer on the existing attempt certificate returns a blocked output whose first blocker is `source_schema`, because the attempt certificate is not an invariant-cell/coframe source report.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

The next score-moving artifact is a real source report for the producer, not another certificate shell. That source report must supply the positive-width return-map support and coframe extraction data that the producer can transform into an accepted certificate.
