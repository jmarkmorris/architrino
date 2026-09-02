# Photon Configuration-Search Deep Comparison

## Scope

PHO-006 adds a second execution mode to the existing Photon configuration search. `Search configurations` remains the short interactive sample. `Deep compare` evaluates the full constructed candidate pool, computes both co-moving and absolute-history summaries for every evaluated candidate, and yields to the browser event loop between candidates. Both modes reuse the same candidate builder, prescribed-path analysis calls, scoring rules, and result serializer; no parallel scientific implementation is introduced.

Plainly: Deep comparison does more of the existing search work without inventing a second calculator, and the app gets a chance to redraw and accept input between candidates.

## Filters

The deep path applies two explicit filters:

| Filter | Values | Applied boundary |
| --- | --- | --- |
| Local-$c$ mode | `any`, `direct`, `lorentz_factor` | Before evaluation, against the normalized candidate state. |
| Phase family | `any`, `stable`, `candidate`, `singular`, `none` | After evaluation, against the emitted helical-family counts from the candidate summary or its absolute-history comparison. |

`none` means that every available inspected mode reports zero helical phase families. A stable, candidate, or singular selection retains a row when at least one inspected mode reports a member of that class.

Plainly: The local-$c$ filter avoids work on unwanted candidates. The phase-family filter must wait for the root analysis because the family label is a measured output, not a setting.

## Export Contract

Every retained deep-comparison row carries a `photon-configuration-deep-comparison.v1` record with the producing path, analysis identity, normalized-state-snapshot flag, UI-independence flag, scientific-oracle-independence flag, evaluated history modes, and normalized filters. The normal JSON serializer and importer preserve that record together with the existing diagnostics and comparison summaries.

The state snapshot is independent of UI mutations after dispatch: moving a control while the task runs cannot alter the already-cloned input. The numerical summaries are not independent scientific evidence because both modes use the same prescribed-path analysis implementation. `scientificOracleIndependent` is therefore `false`.

Plainly: An exported row says exactly which search path and filters produced it. It is reproducible session evidence, not outside confirmation that the underlying equations are correct.

## Claim Grade And Falsifiers

The implementation claim is measured by the focused Photon runtime tests. Those tests establish that the path filters normalized candidates, yields between candidates, reports progress, evaluates both history modes, and preserves provenance through JSON export and import. They do not establish a physical photon branch, phase-lock retention, stability, Malus-law recovery, helicity recovery, or an independent validation of the prescribed-path analysis.

The implementation is falsified if any of these operator-checkable observations occurs:

- a retained row violates its selected local-$c$ or phase-family filter;
- a multi-candidate run does not yield between candidates or stops updating progress;
- a deep row lacks an `ok` co-moving versus absolute-history comparison without an explicit failure status;
- changing the live UI after dispatch changes the cloned state being evaluated;
- or export/import removes or changes the `deepComparison` record, diagnostics, comparison authority, or filter values.

Plainly: These checks can prove the workflow and its bookkeeping. They cannot turn a search result into a theory result.
