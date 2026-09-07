# Browser Claim-Grade History Invalidation — 2026-07-24

## Status

This adjudication invalidates only Claim-grade continuation chunks that were computed after the browser HTTP client had removed causal history needed by the next request. It does not invalidate independently produced artifacts, prescribed replay, Display-grade output, or the first accepted Claim-grade extension.

Plainly: the defect damaged a specific continuation route. It did not make every Borg result from the same period wrong.

## Defect Interval And Mechanism

The exposed implementation entered the public history at commit `deac712090f1c83f9c44b7091dbc520862417eb6` on 2026-07-20 at 23:54:50 EDT. It ended at commit `74ef9cec24ab30521b66efbc70d9f6fdf883f9c7` on 2026-07-24 at 12:26:28 EDT, when browser history-prefix release and client-window bounding became Display-grade-only operations.

During the exposed interval, `BorgEomHttpClient` applied Display transport transforms to every response. A Claim-grade first chunk was computed from its complete certified initial history, but the history returned to the browser was shortened before it became the second request's input. The second and later Claim-grade chunks could therefore be evaluated without the declared causal history.

Plainly: chunk zero had the full past while it was computed. The browser then threw away part of that past, so a later Claim chunk could be wrong even though the first one was not.

## Exact Invalidation Predicate

A chunk is invalidated by this defect only when all four conditions hold:

1. its source build contains the exposed implementation in the interval from `deac712090f1c83f9c44b7091dbc520862417eb6` inclusive to `74ef9cec24ab30521b66efbc70d9f6fdf883f9c7` exclusive, or an implementation shown to be equivalent;
2. it was produced through `BorgEomHttpClient`;
3. it used EOM `runGrade: "certified"`, presented in the browser as Claim grade; and
4. it is chunk index 1 or greater, meaning the second or a later continuation request.

Any physics, trajectory, stability, comparison, or Claim-grade conclusion that depends on an invalidated chunk is also invalidated. If an external artifact from this interval lacks enough provenance to determine its transport, grade, and chunk identity, quarantine it pending that determination; absence of provenance is not a reason to invalidate unrelated artifacts.

Plainly: build date alone is not enough. The route, grade, and continuation number must also match.

## Retained And Invalidated Classes

| Artifact or observation | Disposition | Reason |
| --- | --- | --- |
| Claim-grade chunk index 0 accepted extension | Retain for this defect | It was computed from complete certified initial history. Its returned client history must not be reused as proof of a valid continuation. |
| Claim-grade browser chunk index 1 or greater in the exposed interval | Invalidate | Its request could omit required causal history. |
| Conclusions depending on an invalidated chunk | Invalidate | Their computational premise is no longer established. |
| Display-grade browser chunks | Retain at Display authority | The history-prefix and bounding transforms belong to the worker-owned Display cache contract; Display output remains non-promotable. |
| Sealed prescribed-geometry replay | Retain at recorded authority | Replay does not evolve a Claim-grade browser continuation and creates no new evidence. |
| Direct EOM solver CLI, Node process-client, and independently authored oracle artifacts | Retain at their declared authority | They bypassed the faulty browser response transform. |
| Browser UI, failure, timeout, or resource observations | Retain only for the behavior actually observed | They may establish interface or operational behavior, but not physics from an exposed continuation. |

## Repository Inventory

A repository search found no persisted browser Claim-grade chunk packet whose provenance satisfies the invalidation predicate. Therefore this adjudication deletes or quarantines zero checked-in result artifacts. The existing native/process-client endurance evidence, independent-oracle checks, prescribed records, and Display-only browser observations remain at their previously declared authority.

Historical browser Claim observations in the EOM work log remain useful as runtime and failure observations. Any physics interpretation of their post-first-chunk state is withdrawn unless its source provenance proves that it did not pass through the exposed route.

Plainly: no checked-in independent result was sacrificed to make the ruling look broad. The narrow defective class is rejected; everything else keeps exactly the authority it already earned.

## Legacy Release-Budget Boundary

`borg-release-budget-manifest.v1.json` and `borg-preset-calibration-sweep.v1.json` remain unchanged as provenance-bound records of the deleted pre-EOM browser surface. They are reference-only history. The current Borg runtime does not import a disposition wrapper, render legacy-budget diagnostics, or derive current EOM ceilings from either historical file.

Current run-preset ceilings require both a separately authorized current EOM release budget and live EOM measurements. Measurements without that current budget record observations but do not invent release ceilings.

Plainly: old measurements stay available for audit, but no live code consults them and current measurements cannot silently become policy.

## Claim Grade And Falsifier

Claim grade: derived from the browser client call path and commit history, with repository inventory by bounded source search. This adjudication is not a statement that every retained artifact is physically correct; it states only whether this missing-history defect reaches that artifact.

Falsifier: a retained artifact is shown to satisfy all four invalidation conditions, an invalidated continuation is shown to have carried the complete required history independently of the browser response transform, or current `src/apps/borg` code imports or renders a ceiling from either historical release-budget artifact.

Closure goal: no further repository invalidation is required unless an external browser Claim-grade artifact is supplied whose provenance must be classified by the four-part predicate.
