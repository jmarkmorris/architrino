# OPS-031 and OPS-032 approved repairs — October 14, 2026

## Authority and disposition

The operator selected action 1, approving the bounded Photon diagnostic-classifier repair and Bremsstrahlung wording correction proposed by the [October 13 Photon review](ops-032-photon-substantive-review-2026-10-13.md) and [supporting-corpus review](ops-031-bremsstrahlung-synchrotron-review-2026-10-13.md). This implements OPS032-PHO13-01, OPS032-PHO13-02 and BRS13-01. Implementation, self-checks and separate verification are complete. All three finding IDs are resolved. CRW-005 remains closed. No coverage cursor, due date, scientific research task, publication or generator-write authority changes.

## Repairs and independent reference

The Photon reference is the unchanged [PHO-004 admission contract](../../app-photon/contracts/absolute-source-history-self-hit-admission.md). A regular diagnostic root requires a finite transmitter derivative above the declared floor and successful causal-factor certification. The classifier formerly defaulted absent/nonfinite status to zero and coerced explicit null derivative evidence to measured zero. It now accepts finite numeric evidence only: absent/null/nonfinite or coerced string/Boolean status cannot certify success; explicit null/nonfinite/non-numeric factor evidence remains uncertified. The existing Jacobian derivative alias is retained only when `transmitterFactor` is absent/undefined. A measured zero remains singular, and a measured below-floor derivative retains its classification even when certification status is unavailable. The separately read built-in producer emits numeric factor and status fields; no producer, oracle or facade was changed to agree with the repair.

The Photon regression fixture extends the existing admission boundary scope using public diagnostic calls. Explicit successful and failed controls precede malformed inputs. It checks missing/null/nonfinite status, non-numeric coercions, invalid factors, absent-factor alias, actual zero, exact singular/floor boundaries, negative regular factors, retained candidates and per-record count closure. Its expected dispositions come from PHO-004, rather than prior runtime output. The repair narrows malformed adapter acceptance; string-valued numeric evidence is intentionally uncertified. It does not establish a retained photon, physical self-interaction, production EOM behavior, current deployment behavior or an observer-field bypass.

Bremsstrahlung changes only the causal-delay adjective in the sentence ending: “The power per unit emission time $t_{\mathrm{eff}}$, evaluated at the delayed source event, is”. The governing reference is the [terminology authority](../../../../content/markdown/aaa/archie/terminology-usage.md) and AGENTS.md. No equation, citation, assumption or scientific interpretation is altered.

## Preservation and checks

Pre-edit runtime and test copies are in `.tmp/ops-031-032-repairs-oct14/`; the Bremsstrahlung baseline is in its `brems-before/` subdirectory. Binding inventory used native `rg` over source/tests and script contracts plus the historical review hashes; the built-in producer, shared facade, facade fixture and historical scientific receipts remain unchanged. Current hashes below preserve the new versions without rewriting the October 13 observations.

Measured by `node --test tests/photon-runtime.test.js tests/prescribed-absolute-history-facade.test.js`, all 63 tests passed, zero failures, in the runner's reported 388.068417 ms; preparation and review time were not measured. Output is `.tmp/ops-031-032-repairs-oct14/node-tests.out`. The unchanged original `.tmp/ops-032-photon-oct13/check-admission.mjs` passed its explicit success/failure controls first; its repaired-path output rejects all twelve candidates in each missing/null/nonfinite-status case and reports null-factor evidence as uncertified with null derivative/margin. Output is `original-probe-after.out` in the repair scratch directory. Replaying that probe demonstrates the reported software cases; it is not an independent physical reference.

The implementing corpus worker completed the full 562-line source read. Its exact whole-string comparison established the sole adjective replacement; unchanged display extraction preserved all 26 display equations/viewer identities. The existing known-case-first strict syntax/local-path checker passed 255 math spans and 45 local target occurrences. These are source syntax and preservation checks, not visual inspection of a deployed page or rederivation of the radiation formulas. Scoped `git diff --check` passed for the changed runtime, fixture, chapter and Photon owner files.

Separate verification passed against the unchanged PHO-004 contract and separately authored public-path assertions: explicit success/failure controls preceded 11 malformed-input cases and six signed threshold/alias cases; per-record and aggregate counts close. A byte-checker passed its known controls before establishing the sole Bremsstrahlung adjective replacement. The independent reviewer also ran the two focused suites with 63 passes and no failures. Outputs are `independent-verification.mjs`, `independent-verification.out` and `independent-node-tests.out` in the repair scratch directory. No actionable residual issue was found within this scope.

Separate verification assignment: `ops-032-photon-repair-verification` (stable agent `/root/photon_repair_verify`) checks the unchanged PHO-004 reference and public path, plus exact Bremsstrahlung preservation. The corpus implementation assignment is `ops-031-brems-repair` (stable agent `/root/brems_repair`). Immutable tool names are retained beside their prefixed assignment labels.

## Source identities

| Path | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| `src/apps/photon/PhotonFormulaRuntime.js` | `26faaf0836eeaf0885c56748cc4db4c78b254eebd0d7aa381c2909665afe8d04` | `fa246684d18d6c1f66e0c19afe2a111006c20f299872a2ff45cc00c98fb151bf` |
| `tests/photon-runtime.test.js` | `f00862d509bb783891c761d197faee458673f42d8685253846072f9b6524fd7f` | `128ef0a7d46c3c03e1fff93a991f6eaf1bd53b868087e1c5e40b7bb31b5c98e9` |
| `content/markdown/aaa/reactions/bremsstrahlung.md` | `e5a4496f006c900a0769d3c3176bccdba11a32604d3a7e4532224a69419fb869` | `492568179d76bd3080fa338d3689ce0ca3dd0c350d78e8c079681cf6505c7544` |

Unchanged SHA-256 identities measured by `shasum -a 256`: shared facade `a4731234188d64c555b75dba02b14af8af75f2fafe266ef53371b9fe735ad076`; built-in root producer `cbf381e623b58cbd151a418c2a45d545f03f0bfe6d46d5a3ac8b4b0dcb765510`; facade fixture `a36dc65479f6d008b88e5c04d22206b8b47aff45822c5a112119b4f7d71c78f9`.

Falsifiers are a certified above-floor numeric row rejected, a malformed status admitted, explicit null evidence reported as measured zero, a changed singular/floor precedence or count mismatch, or any Bremsstrahlung byte change beyond the approved adjective. The focused fixture, independent public-path probe and frozen chapter comparison are the places to check those observations. Wider app lifecycle and physical claims remain outside this closure.
