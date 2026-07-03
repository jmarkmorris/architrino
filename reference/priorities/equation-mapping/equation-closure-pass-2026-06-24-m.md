# Equation Closure Pass 2026-06-24 M

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral coframe extraction certificate contract
- Promotion status: priority-only

## Scope

This pass turns the `coframeExtraction` blocker into an explicit external certificate contract. It does not supply accepted wake-return extraction evidence.

No equation scores change.

## Executable Change

The retained-record attempt row now points to [eq02-04-coframe-extraction-attempt.v1.json](../../../scripts/equation-mapping/eq02-04-coframe-extraction-attempt.v1.json). The certificate contract declares:

- schema `aaa-equation-map-eq02-04-coframe-extraction-certificate/v1`;
- `status=attempt`;
- durable `certificateId`;
- `sourceKind=wake_return_extraction_certificate`;
- matching `commonCarrierId`;
- matching `domainId`;
- retained row set `retainedRowSetId=S_eq`;
- `supportKind=positive_width_invariant_cell`;
- durable `supportId`;
- extraction basis $c_f$, $u$, $\mathcal L_{\mathrm{root}}$, $\mathcal L_{\mathrm{wake}}$, and retained boundary history;
- extracted coframe legs $e^0_u(\partial_t)=1.25$, $e^\parallel_u=0.8$, and $e^\perp_u=1$;
- attempt-level connection, torsion, and phase-holonomy fields;
- extraction, support-binding, and holonomy residual slots.

The retained-record runner can now load an external certificate path and distinguish:

- missing certificate;
- invalid certificate JSON;
- invalid certificate schema;
- certificate present but not accepted;
- missing certificate id;
- non-durable source;
- source-kind mismatch;
- common-carrier mismatch;
- domain mismatch;
- retained-row-set mismatch;
- uncertified support kind;
- missing or mismatched support id;
- missing, unsupported, or forbidden extraction basis;
- missing or mismatched coframe legs;
- missing or nonzero extraction/support/holonomy residuals.

## Current Output

The current run still reports:

- `status=blocked_same_branch_identity`;
- `scoreDecision=no_score_increase`;
- `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`;
- `coframeReciprocity=passed`;
- `coframeExtraction=not_evaluated`;
- `coframeExtraction.reason=coframe_extraction_evidence_not_accepted`.

This is the intended state: the runner now knows what accepted extraction evidence must look like, but the certificate is not accepted evidence.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

The next score-moving artifact is not another contract layer. It is the first source-backed invariant-cell/coframe extraction certificate whose status can honestly become `accepted` without weakening the checker.
