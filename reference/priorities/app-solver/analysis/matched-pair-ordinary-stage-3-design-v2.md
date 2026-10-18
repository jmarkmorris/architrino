# Ordinary Integration, Stage O3 Design: Version 2 Dispositions

This applies the reviewer's four choices on the [O3 design preparation](matched-pair-ordinary-stage-3-design.md), recorded in the [preliminary O2 review addendum](matched-pair-review-ordinary-stage-2-preliminary-2026-10-14.md). The first version is preserved unchanged and still governs everything not changed here. This is design only; O3 runtime stays held for the reviewed O2 predecessor. Every instance uses $c_f=1$.

1. **Declared limit.** A v3 request requires an explicit, positive per-invocation `execution.maximumAcceptedSteps`. There is no wire default and no ceiling increase. Zero, absent or nonpositive values are refused as `invalid_request`. A request whose bound exceeds `resources.memoryBytes`, which is at most 2 GiB, is refused as `request_budget_exhausted`, reporting the bound, the budget and the limit.
2. **Replay resource bound.** This is now part of O2 itself, in the [O2 version 3 candidate](../evidence/matched-pair-ordinary-stage-2-v3-scratch-receipt-2026-10-14.md), not O3. It is built from the record's enforced per-leg limits, counts one clipped final step per leg, includes the whole retained history and copies, and charges the admitted worker override. A v3 resume reports the bound it admitted.
3. **Projection.** `EomResponseRecord.mjs` refuses an unknown successful-evolution schema with `record_projection_unsupported`, instead of returning it unprojected. It projects v2 and v3 evolution responses explicitly. Error and other explicitly supported non-evolution schemas (`eom_error/v2`, the inspection and capabilities documents) pass through as now. The raw artifact is retained in every case, and Surface behaviour is unchanged: the Surface flow produces v2 evolution responses, which keep their exact existing projection.
4. **Attempt log.** The complete attempt log stays in the raw artifact. The view samples it by stride, never interpolated, keeping the last row and recording the original count, under the 12 MiB view limit.

**Added qualification rows:**

- an unknown evolution schema refused by the projection;
- `eom_error/v2` passed through;
- the Surface v2 projection byte-identical to the current one;
- a v3 request without `maximumAcceptedSteps` refused;
- a v3 request whose bound exceeds 2 GiB refused, with the reported bound;
- a resume whose record legs exceed the budget refused before any replay.
