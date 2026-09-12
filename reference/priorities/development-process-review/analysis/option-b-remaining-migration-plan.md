# Remaining Option B migration plan

## Decision and scope

The operator requested the next two migrations and then the remaining repository-wide inventory and finite plan. The [paired transfer record](option-b-prescribed-response-and-acceleration-cutover.md) completes prescribed-response and acceleration. Together with the three root-cover profiles, **all five profiles in the original current-launch binding loop now use B**; `node scripts/equation-mapping/check-current-source-maps.mjs` and `tests/current-launch-bindings.test.js` establish that exact census. This does not mean all current-source dependencies in the repository have migrated.

The original remaining-work plan contains **five bounded work packages** below. B-REM-1's [F6c operational family transfer](option-b-f6c-family-cutover.md) is complete. The operator's September 12 instruction “do all of the migration packages” selects B-REM-2 through B-REM-5 for implementation and validation, without intermediate package-approval gates. These are implementation-plan units, not measured numbers of individual source migrations, profiles, or days. Each package must close its enumerated owners as a batch, including dependent callers. B-REM-1's preflight below retains the historical independent-acceptance prerequisite; the checker-first and complete-family records document its resolution. Scientific computations, mathematical-map baseline acceptance and Git publication remain separate operator decisions.

## Inventory instrument and limits

At inspection, `git rev-parse HEAD` reported `ab3ed93a59e69a5807397c24cefcfcb3a9642487`; this inventory includes the working edits for the paired transfer. A known fixture containing one quoted 64-hex value and one long decimal constant passed the corrected literal matcher before target use. The earlier unconstrained hex search also matched substrings of scientific decimal constants and was rejected as a hash census.

The following corrected `rg` search measured **157 candidate files: 83 under scripts, 14 under src and 60 under tests**, with no matching file under apps, .github or .githooks for this expression and extension selection:

```bash
rg -l --pcre2 '(?<=[\x22\x27])[a-f0-9]{64}(?=[\x22\x27])' scripts src apps .github .githooks tests -g '*.{mjs,js,py,sh,cpp,h,hpp,ts,tsx,yml,yaml}'
```

The exact candidate paths are retained below. **157 files are not 157 required migrations.** Quoted digests include current source selections, fixed inputs, historical snapshots, output/catalog identities, known hash controls and synthetic fixture values. Five already migrated entries still contain intentionally retained scientific/evidence identities. A file may contain more than one role.

The literal search is not a proof of exhaustive current-source coverage: computed bindings, runtime metadata, JSON/JSON-LD contracts, Markdown declarations, package lockfiles and ignored historical outputs need owner-based tracing. Scoped `rg` inspection of `scripts/check-content-integrity.mjs`, `scripts/pr-validation-receipt.mjs`, `.github/workflows`, `.githooks`, `package.json` and `scripts/config/foundational-impact-contracts.json` separately identified the required admission tests/checker, opt-in legacy binding check, mathematical report job and receipt integration. Package 5 reconciles those nonliteral owners. It does not reinterpret a no-match as no obligation.

## Ordered implementation packages

Status: B-REM-1 is ✓ Done for the enumerated operational source-binding transfer. The [family record](option-b-f6c-family-cutover.md) and [independent review](../evidence/option-b-f6c-family-review.md) close the original connected family with 327 passing consolidated controls and supervised terminal closure; scientific parent/package success and deferred transport remain untested and unaccepted. B-REM-2 through B-REM-5 are also ✓ Done. The [final integration record](option-b-repository-reconciliation.md#authorized-equation-registry-refresh-and-final-gate) reconciles the preserved 563-test selection, all 77 resumed shared-caller controls, both final-generation F5 builds, 196-row inventory accounting and all 30 required Content Integrity checks after the authorized generated-only equation-registry refresh. The source generation remains unchanged; no source migration or memory-intensive validation was repeated for this freshness repair. These stable IDs are shared with the campaign queue and work log.

| ID | Scope and dependency order | Required completion evidence |
| --- | --- | --- |
| B-REM-1 — ✓ Done, operational transfer | Remaining F6c operational family: `f6c-bounded-operation.mjs`; emission-refinement and refined-acceleration entry/launcher pairs; parent-emission-refinement entry; streamed-leaf diagnostic; evidence-packaging entry. Inspect their execution/preparation bridges as dependencies, with distinct scientific roles carried into B-REM-4. Migrate common helper/coordinator admission before their dependents, and close the whole family together. | Enumerate each original operational binding and actual caller before edits; externally selected manifests and captured readers on every supported execution path; actual preflight, worker, stage and completion checks; rejection of source/graph substitution; unchanged numerical/reference sources; host process controls for shared helpers and all dependent callers. Updating an A helper hash alone does not complete a B transfer. |
| B-REM-2 — ✓ Done, operational transfer | F5 current execution/build family: `launch-f5-prehistory-handoff-build.mjs`, `execute-f5-prehistory-handoff.py`, `run-f5-enclosed-root.mjs`; their enclosed-root/build, original-input-tree, prehistory restriction/handoff and ordinary-evolution preparers/verifiers, plus the C++ CLI and reducer selections they enforce. Retained accepted runs remain evidence, not new runtime defaults. | Prove the supported current build/API and runtime capture still occur; preserve historical handoff/restriction and independent interpolation checks; separate current compiler/toolchain selections from historical output identities; pass selected current-build/handoff and negative source-admission controls. No new scientific run or refreshed accepted result is part of moving metadata. |
| B-REM-3 — ✓ Done, operational transfer | Circular-root operational family: `run-subfield-circular-root-pilot.mjs`, `launch-subfield-circular-root-pilot.mjs`, `run-subfield-circular-root-rung.mjs`, `dispatch-subfield-circular-root-ladder.mjs`, `prepare-current-subfield-circular-prior.mjs`, and their build/preparation, C++ CLI, reducer and history/reference dependencies. The shared supervisor is also used by the five completed profiles; inventory and close those dependents in the same batch if its bytes change. | Current prior selection is explicit; pilot, rung and dispatcher cannot bypass admission; historical review/ledger identities retain their original roles; shared supervisor/process exclusions, source rechecks and resource bounds pass for affected old and new callers. Migration does not implement deferred ladder or transport capabilities. |
| B-REM-4 — ✓ Done, source-role separation | Scientific-source role separation: all still-unclassified scientific preparation, execution, reduction, publication, verification and oracle candidates in the appendix, including F6c retained-history/parent/leaf adapters, prescribed-response scientific layers, F5/circular source obligations and prescribed-path/mathematical certifiers. Use results of B-REM-1–3 to avoid re-migrating their completed operational role. | For every selected binding, record caller, target, meaning, current-versus-historical selection and independent check. Move only justified current-source selection into the existing B schema or an explicitly reviewed extension. Retain scientific contracts and fixed reference/evidence checks with named owners. Do not change a numerical subject and its independent reference together. Any requested scientific change needs its own derivation/review and successor baseline, not a hash refresh. |
| B-REM-5 — ✓ Done, final operational validation | Repository reconciliation and closeout: appendix test/control values and remaining Borg/action-analysis/catalog identities; `package.json`/`package-lock.json`, workflow Action pins, foundational-impact configuration, authored source/dependency contracts, generated/runtime-asset owners, Content Integrity, publication receipts and hooks. Reconcile the exact appendix and owner-based additions from packages 1–4 into one final disposition table. | Every candidate and discovered current-source owner has one explicit migrated/retained-with-reason/out-of-scope-with-owner disposition; no unsupported catch-all remains. Repeat positive/negative admission and old/new dependency coverage, required Content Integrity checks and affected process/scientific controls for one stable candidate. Record checks that did not run. Keep external toolchain/Action pins, output identifiers and historical records under their existing owners unless a specific current-source obligation is being replaced. Publication and mathematical-map acceptance are separately authorized and reported. |

The operational owner filenames in the first three rows are under `scripts/eom/`. The appendix supplies exact paths for the broader scientific and test scope. Work packages 2 and 3 can be prepared independently after package 1's helper boundary is stable; package 4 must use the resulting role inventory, and package 5 closes the combined candidate.

## B-REM-1 preflight and independent-acceptance prerequisite

The operator selected this package on September 12. Live entry, launcher, coordinator, preparation, observation and verification reads establish two execution patterns: emission/refined acceleration use paired launchers; parent refinement, streamed-leaf work and evidence packaging use the common bounded-operation coordinator. The `architrino-resume` procedure requires the package's actual completion condition and its dependent owners to be reconciled before closure. No production source, test, manifest or historical evidence was changed during this preflight.

The blocking dependency is the independent [closure verifier](../../../../scripts/eom/verify-f6c-bounded-operation-closure.mjs), not an absent graph library. It fixes a specific coordinator identity and reconstructs its exact accepted command line. The [parent-batch observer](../../../../scripts/eom/observe-parent-batch.mjs) imports that selection before launching; the [parent-batch preparer](../../../../scripts/eom/prepare-f6c-parent-refinement-batch.mjs) independently fixes the same old coordinator identity. Moving the coordinator to external source-map admission changes both its bytes and launch arguments, so a source-map edit alone cannot discharge this separate acceptance obligation.

| Read-only instrument and scope | Result |
| --- | --- |
| `shasum -a 256 scripts/eom/f6c-bounded-operation.mjs` | Current coordinator identity is `6d544440f81267564f8e05eca4b0c6889bdb20ed079dbac02887b331140e349d`. |
| `rg -n 'COORDINATOR_SHA' scripts/eom/verify-f6c-bounded-operation-closure.mjs` and `rg -n 'COORDINATOR=' scripts/eom/prepare-f6c-parent-refinement-batch.mjs` | Both require `e100a96f0771d82664fa62b66865cbf5924cced1216588c631836ed361d6a252`; the verifier also uses it in the exact invocation-argument check. |
| `node --test tests/f6c-bounded-operation-closure.test.js` | Seven existing controls pass, including the literal positive closure fixture, before the real-identity probe. These controls exercise the checker's declared generation, not current-coordinator admission. |
| Direct call to the existing `verifyClosure` with the current coordinator's measured path/digest/size | Rejects at `canonical coordinator generation`, before later fields are inspected. This is an isolated generation-boundary probe, not a complete operation or scientific run. |
| Six-file baseline command below | 129 tests pass; zero failures, skips or cancellations; 8.992 seconds. This does not override the separate current-identity rejection. |

Baseline command:

```bash
node --test --test-concurrency=1 tests/f6c-emission-refinement-pilot.test.js tests/f6c-refined-acceleration-pilot.test.js tests/f6c-bounded-operation.test.js tests/f6c-parent-emission-refinement-pilot.test.js tests/f6c-evidence-packaging.test.js tests/f6c-parent-refinement-batch-preparation.test.js
node --test tests/f6c-bounded-operation-closure.test.js
```

The independent-verifier rejection is reproducible without creating an operation or executing scientific code:

```bash
node --input-type=module - <<'JS'
import { readFileSync, realpathSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { verifyClosure, COORDINATOR_SHA } from './scripts/eom/verify-f6c-bounded-operation-closure.mjs';
const root = realpathSync(process.cwd());
const filename = path.join(root, 'scripts/eom/f6c-bounded-operation.mjs');
const raw = readFileSync(filename);
const actual = createHash('sha256').update(raw).digest('hex');
try {
  verifyClosure({ invocation: {
    schema: 'braid-program/observed-bounded-invocation.v1', root,
    coordinator: { path: filename, sha256: actual, bytes: raw.length }
  } });
  throw Error('unexpected admission');
} catch (error) {
  if (error.message !== 'canonical coordinator generation') throw error;
  console.log({ expected: COORDINATOR_SHA, actual, rejection: error.message });
}
JS
```

This mismatch is measured before any B-REM-1 implementation edit. Its causal history was not established in this preflight; neither a recent commit subject nor the previous helper change is used as attribution.

**Historical preflight decision, subsequently approved:** authorize a checker-first current-source admission contract and a separate reviewing agent before changing the coordinator. The [Evidence Independence rule](../../../../AGENTS.md#evidence-independence) bars modifying a comparison instrument in the same change as its subject. The proposed first phase keeps the coordinator unchanged, defines independently supplied source-map/entry/argument expectations, preserves original-generation evidence verification and all existing exit, process, lock, source, output and resource predicates, and tests rejection of unselected source or command substitutions. Independent review must accept that contract before coordinator implementation. The observer and preparer then use the reviewed current contract; a blind digest refresh is not the proposed resolution. This is a prerequisite within B-REM-1, not a sixth remaining work package.

The [refined caller owner](remaining-caller-contracts.md#current-continuation-status) separately retains deferred current scientific transport. Inspection of its entry finds scientific/frozen selections and historical ancestry requirements distinct from its launcher's current operational helpers. B migration must preserve those requirements and must not claim to have implemented the deferred transport. No numerical producer, reference, historical source tuple, resource limit or accepted result is a repair target in this preflight.

Claim grade: measured for the named source reads, digest checks, completed tests and isolated rejection; inferred for the checker-first sequencing. A separately accepted current closure interface already used by these exact observer/preparer paths, or a current-identity probe that passes the declared generation check, would overturn the blocker. B-REM-1 remains incomplete until its original dependency-closed migration and validation criteria are met.

## Binding dispositions already established

| Binding class or observed example | Current disposition |
| --- | --- |
| Five migrated launch admission profiles | Completed under the [current-source contract](../contracts/option-b-current-source-admission.md); do not redo them. Their retained evidence/scientific tables are not abandoned operational maps. |
| Bounded-operation coordinator and connected family maps | The [F6c family transfer](option-b-f6c-family-cutover.md) completes the coordinator, emission/refined pairs, parent, packaging, streamed caller and preparation paths at operational scope. F5 and circular current admission remain with B-REM-2 and B-REM-3. Retained scientific/historical selectors stay distinct; necessary helper identity updates alone do not complete a caller's B transfer. |
| Inline current source constants in enclosed-root, circular rung/dispatcher and current-prior preparation | Transferred through the F5 build/evolution and circular operational maps, with direct caller, worker and original-identity controls. The [independent dispositions](../evidence/option-b-remaining-binding-dispositions.md) name retained scientific roles; final build/shared-caller validation is complete in the integration record above. |
| `BorgCertifiedBudgets.js` allocation hashes, `BorgAssemblyRecordCatalog.js` model revisions and action-analysis catalog selections | Inspection identifies output/content identities, not automatically executable-source pins. B-REM-5 verifies their consumers and retains them unless a distinct current-source role is demonstrated. |
| Native C++ known SHA-256 answers and historical scientific fixture selections | Known controls and retained evidence remain; current implementation/input source selections in those same files receive separate B-REM-2–4 dispositions. |
| Scientific reference identities in preparers, comparators and oracles | B-REM-4's [role-by-role review](../evidence/option-b-remaining-binding-dispositions.md) is complete; fixed reference and scientific applicability obligations remain with their named owners. Agreement after changing both sides is not independent evidence. |
| Long decimal constants in `prepare-planar-three-binary-circular-release.mjs` | False positives of the rejected broad hex pattern; not included in the corrected candidate census and not migration targets on that basis. |
| Moving-single-root and finite-ledger mathematical maps | Report-only integration is already implemented. Exact-map acceptance is an independent operator decision in the [campaign](../processes-git-codex-claude.md); these are not two more operational launch migrations. |
| Historical `.source` archives, accepted input/output evidence and publication receipts | Preserve selected provenance. Do not rewrite them to make a current-source check pass. |

## Completion and scope-change rule

The campaign is complete for this inventory when all five packages have their evidence and the final table accounts for every appendix candidate plus every source owner reached through their actual caller/dependency closure. Each untransferred identity must have an explicit retained role and live consumer or an explicit reviewed retirement. A legacy check is removed only after its actual obligation has equivalent required B coverage; scientific verification is not removed by a source-consistency pass.

A newly discovered binding inside an enumerated owner's existing dependency closure belongs to that package. A new application, theory-wide semantic dependency campaign, service, scientific computation, or capability expansion requires an explicit scope amendment; it is not silently appended as another migration. Five work packages are therefore a finite execution structure, not a claim that discovery has already proved a final count of all individual identities.

Claim grade: measured for the candidate census and named inspections; inferred for this dependency order and grouping. A missed operational caller, an incorrectly retained current-source role, a graph that omits a required check, or a supposedly migrated path still admitting changed bytes under an old externally selected digest would falsify the corresponding disposition. The final closure audit must test those conditions.

## Exact candidate-file census

This is the measured discovery set, not a list of files authorized for blanket editing. Tests and retained identifiers are deliberately present so that they receive a disposition rather than disappear from the audit.

- [scripts/eom/check-f5-evolution-dynamics.py](../../../../scripts/eom/check-f5-evolution-dynamics.py)
- [scripts/eom/derive-f5-independent-interpolation-enclosure.mjs](../../../../scripts/eom/derive-f5-independent-interpolation-enclosure.mjs)
- [scripts/eom/derive-subfield-circular-history-budget.mjs](../../../../scripts/eom/derive-subfield-circular-history-budget.mjs)
- [scripts/eom/derive-subfield-circular-root-reference.mjs](../../../../scripts/eom/derive-subfield-circular-root-reference.mjs)
- [scripts/eom/dispatch-subfield-circular-root-ladder.mjs](../../../../scripts/eom/dispatch-subfield-circular-root-ladder.mjs)
- [scripts/eom/execute-f5-prehistory-handoff.py](../../../../scripts/eom/execute-f5-prehistory-handoff.py)
- [scripts/eom/execute-f6c-acceleration.py](../../../../scripts/eom/execute-f6c-acceleration.py)
- [scripts/eom/execute-f6c-emission-refinement.py](../../../../scripts/eom/execute-f6c-emission-refinement.py)
- [scripts/eom/export-f6c-retained-history.py](../../../../scripts/eom/export-f6c-retained-history.py)
- [scripts/eom/f6c-bounded-operation.mjs](../../../../scripts/eom/f6c-bounded-operation.mjs)
- [scripts/eom/f6c_leaf_stream_publication.py](../../../../scripts/eom/f6c_leaf_stream_publication.py)
- [scripts/eom/f6c_parent_emission_refinement.py](../../../../scripts/eom/f6c_parent_emission_refinement.py)
- [scripts/eom/f6c_variable_cell_adapter.py](../../../../scripts/eom/f6c_variable_cell_adapter.py)
- [scripts/eom/launch-f5-prehistory-handoff-build.mjs](../../../../scripts/eom/launch-f5-prehistory-handoff-build.mjs)
- [scripts/eom/launch-f6c-emission-refinement-pilot.mjs](../../../../scripts/eom/launch-f6c-emission-refinement-pilot.mjs)
- [scripts/eom/launch-f6c-refined-acceleration-pilot.mjs](../../../../scripts/eom/launch-f6c-refined-acceleration-pilot.mjs)
- [scripts/eom/launch-subfield-circular-root-pilot.mjs](../../../../scripts/eom/launch-subfield-circular-root-pilot.mjs)
- [scripts/eom/oracle/f5_api_domain_conformance.py](../../../../scripts/eom/oracle/f5_api_domain_conformance.py)
- [scripts/eom/oracle/f5_history_manifest_conformance.py](../../../../scripts/eom/oracle/f5_history_manifest_conformance.py)
- [scripts/eom/oracle/f6c_correlated_residual_enclosure.py](../../../../scripts/eom/oracle/f6c_correlated_residual_enclosure.py)
- [scripts/eom/oracle/f6c_emission_refinement_conformance.py](../../../../scripts/eom/oracle/f6c_emission_refinement_conformance.py)
- [scripts/eom/oracle/f6c_gk13_protocol.py](../../../../scripts/eom/oracle/f6c_gk13_protocol.py)
- [scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py](../../../../scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py)
- [scripts/eom/oracle/f6c_refined_acceleration_conformance.py](../../../../scripts/eom/oracle/f6c_refined_acceleration_conformance.py)
- [scripts/eom/oracle/prescribed_acceleration_response.py](../../../../scripts/eom/oracle/prescribed_acceleration_response.py)
- [scripts/eom/prepare-current-subfield-circular-prior.mjs](../../../../scripts/eom/prepare-current-subfield-circular-prior.mjs)
- [scripts/eom/prepare-f5-enclosed-root-build.mjs](../../../../scripts/eom/prepare-f5-enclosed-root-build.mjs)
- [scripts/eom/prepare-f5-enclosed-root.mjs](../../../../scripts/eom/prepare-f5-enclosed-root.mjs)
- [scripts/eom/prepare-f5-original-input-tree.mjs](../../../../scripts/eom/prepare-f5-original-input-tree.mjs)
- [scripts/eom/prepare-f5-prehistory-handoff-build.mjs](../../../../scripts/eom/prepare-f5-prehistory-handoff-build.mjs)
- [scripts/eom/prepare-f5-prehistory-handoff.py](../../../../scripts/eom/prepare-f5-prehistory-handoff.py)
- [scripts/eom/prepare-f5-prehistory-restriction.mjs](../../../../scripts/eom/prepare-f5-prehistory-restriction.mjs)
- [scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py](../../../../scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py)
- [scripts/eom/prepare-f6c-continuous-reception-acceleration.py](../../../../scripts/eom/prepare-f6c-continuous-reception-acceleration.py)
- [scripts/eom/prepare-f6c-continuous-reception-root-cover.py](../../../../scripts/eom/prepare-f6c-continuous-reception-root-cover.py)
- [scripts/eom/prepare-f6c-emission-refinement.py](../../../../scripts/eom/prepare-f6c-emission-refinement.py)
- [scripts/eom/prepare-f6c-parent-emission-refinement.py](../../../../scripts/eom/prepare-f6c-parent-emission-refinement.py)
- [scripts/eom/prepare-f6c-parent-refinement-batch.mjs](../../../../scripts/eom/prepare-f6c-parent-refinement-batch.mjs)
- [scripts/eom/prepare-f6c-refined-acceleration.py](../../../../scripts/eom/prepare-f6c-refined-acceleration.py)
- [scripts/eom/prepare-ordinary-evolution-request.mjs](../../../../scripts/eom/prepare-ordinary-evolution-request.mjs)
- [scripts/eom/prepare-subfield-circular-root.mjs](../../../../scripts/eom/prepare-subfield-circular-root.mjs)
- [scripts/eom/publish-prescribed-acceleration-response.py](../../../../scripts/eom/publish-prescribed-acceleration-response.py)
- [scripts/eom/reduce-prescribed-acceleration-response.py](../../../../scripts/eom/reduce-prescribed-acceleration-response.py)
- [scripts/eom/run-coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.mjs](../../../../scripts/eom/run-coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.mjs)
- [scripts/eom/run-f5-enclosed-root.mjs](../../../../scripts/eom/run-f5-enclosed-root.mjs)
- [scripts/eom/run-f6c-acceleration-pilot.mjs](../../../../scripts/eom/run-f6c-acceleration-pilot.mjs)
- [scripts/eom/run-f6c-cached-root-cover-full.mjs](../../../../scripts/eom/run-f6c-cached-root-cover-full.mjs)
- [scripts/eom/run-f6c-cached-root-cover-pilot.mjs](../../../../scripts/eom/run-f6c-cached-root-cover-pilot.mjs)
- [scripts/eom/run-f6c-emission-refinement-pilot.mjs](../../../../scripts/eom/run-f6c-emission-refinement-pilot.mjs)
- [scripts/eom/run-f6c-evidence-packaging.mjs](../../../../scripts/eom/run-f6c-evidence-packaging.mjs)
- [scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs](../../../../scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs)
- [scripts/eom/run-f6c-refined-acceleration-pilot.mjs](../../../../scripts/eom/run-f6c-refined-acceleration-pilot.mjs)
- [scripts/eom/run-f6c-root-cover-pilot.mjs](../../../../scripts/eom/run-f6c-root-cover-pilot.mjs)
- [scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs](../../../../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs)
- [scripts/eom/run-prescribed-response-pilot.mjs](../../../../scripts/eom/run-prescribed-response-pilot.mjs)
- [scripts/eom/run-subfield-circular-root-pilot.mjs](../../../../scripts/eom/run-subfield-circular-root-pilot.mjs)
- [scripts/eom/run-subfield-circular-root-rung.mjs](../../../../scripts/eom/run-subfield-circular-root-rung.mjs)
- [scripts/eom/verify-f5-enclosed-root-prefix.mjs](../../../../scripts/eom/verify-f5-enclosed-root-prefix.mjs)
- [scripts/eom/verify-f5-ordinary-evolution.py](../../../../scripts/eom/verify-f5-ordinary-evolution.py)
- [scripts/eom/verify-f5-prehistory-handoff.py](../../../../scripts/eom/verify-f5-prehistory-handoff.py)
- [scripts/eom/verify-f5-prehistory-restriction.py](../../../../scripts/eom/verify-f5-prehistory-restriction.py)
- [scripts/eom/verify-f6c-accepted-frame-reconstruction.py](../../../../scripts/eom/verify-f6c-accepted-frame-reconstruction.py)
- [scripts/eom/verify-f6c-bounded-operation-closure.mjs](../../../../scripts/eom/verify-f6c-bounded-operation-closure.mjs)
- [scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py](../../../../scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py)
- [scripts/eom/verify-f6c-continuous-reception-acceleration.py](../../../../scripts/eom/verify-f6c-continuous-reception-acceleration.py)
- [scripts/eom/verify-f6c-continuous-reception-root-cover.py](../../../../scripts/eom/verify-f6c-continuous-reception-root-cover.py)
- [scripts/eom/verify-f6c-emission-refinement.py](../../../../scripts/eom/verify-f6c-emission-refinement.py)
- [scripts/eom/verify-f6c-parent-emission-refinement.py](../../../../scripts/eom/verify-f6c-parent-emission-refinement.py)
- [scripts/eom/verify-f6c-refined-acceleration.py](../../../../scripts/eom/verify-f6c-refined-acceleration.py)
- [scripts/eom/verify-f6c-retained-history-compatibility.py](../../../../scripts/eom/verify-f6c-retained-history-compatibility.py)
- [scripts/eom/verify-f6c-retained-history-guards.py](../../../../scripts/eom/verify-f6c-retained-history-guards.py)
- [scripts/eom/verify-subfield-circular-history.mjs](../../../../scripts/eom/verify-subfield-circular-history.mjs)
- [scripts/equation-mapping/certify-planar-three-binary-axial-translation-speed-chart.py](../../../../scripts/equation-mapping/certify-planar-three-binary-axial-translation-speed-chart.py)
- [scripts/equation-mapping/certify_planar_three_binary_coupled_box.py](../../../../scripts/equation-mapping/certify_planar_three_binary_coupled_box.py)
- [scripts/equation-mapping/certify_planar_three_binary_equal_radius_ladder.py](../../../../scripts/equation-mapping/certify_planar_three_binary_equal_radius_ladder.py)
- [scripts/equation-mapping/certify_planar_three_binary_phase_box.py](../../../../scripts/equation-mapping/certify_planar_three_binary_phase_box.py)
- [scripts/equation-mapping/certify_planar_three_binary_unequal_radius_box.py](../../../../scripts/equation-mapping/certify_planar_three_binary_unequal_radius_box.py)
- [scripts/equation-mapping/check-current-source-maps.mjs](../../../../scripts/equation-mapping/check-current-source-maps.mjs)
- [scripts/equation-mapping/check-moving-single-root-map.mjs](../../../../scripts/equation-mapping/check-moving-single-root-map.mjs)
- [scripts/equation-mapping/dependency-map-reader.mjs](../../../../scripts/equation-mapping/dependency-map-reader.mjs)
- [scripts/equation-mapping/diagnose_planar_three_binary_unequal_radius_jacobian.py](../../../../scripts/equation-mapping/diagnose_planar_three_binary_unequal_radius_jacobian.py)
- [scripts/prescribed-path-analysis/audit-bp010-historical-routing.mjs](../../../../scripts/prescribed-path-analysis/audit-bp010-historical-routing.mjs)
- [scripts/prescribed-path-analysis/independent-causal-delay-bound-audit.mjs](../../../../scripts/prescribed-path-analysis/independent-causal-delay-bound-audit.mjs)
- [src/action-analysis/CoincidentMidpointCommonFrequencyMinimumDelayedActionProviderDiagnostic.mjs](../../../../src/action-analysis/CoincidentMidpointCommonFrequencyMinimumDelayedActionProviderDiagnostic.mjs)
- [src/apps/borg/BorgAssemblyRecordCatalog.js](../../../../src/apps/borg/BorgAssemblyRecordCatalog.js)
- [src/apps/borg/BorgCertifiedBudgets.js](../../../../src/apps/borg/BorgCertifiedBudgets.js)
- [src/eom/native/eom_f5_enclosed_root_cli.cpp](../../../../src/eom/native/eom_f5_enclosed_root_cli.cpp)
- [src/eom/native/eom_subfield_circular_root_cli.cpp](../../../../src/eom/native/eom_subfield_circular_root_cli.cpp)
- [src/prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs](../../../../src/prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyContinuousRootIntervalCertifier.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyContinuousRootIntervalCertifier.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyHistoryPolicyExtensionIndependentVerifier.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyOuterRadiusBandExpansionDiagnostic.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyOuterRadiusBandExpansionDiagnostic.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicityCertifier.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyReceiverPhaseProjectionMonotonicityCertifier.mjs)
- [src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureCertifier.mjs](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureCertifier.mjs)
- [src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs](../../../../src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs)
- [src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs](../../../../src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs)
- [tests/borg-assembly-view-session.test.js](../../../../tests/borg-assembly-view-session.test.js)
- [tests/coincident-axis-three-binary-streaming-reductions.test.js](../../../../tests/coincident-axis-three-binary-streaming-reductions.test.js)
- [tests/coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.test.js](../../../../tests/coincident-midpoint-4-2-1-frequency-and-coaxial-separated-two-planar-braid-co-rotating-resolution-coverage-calibration.test.js)
- [tests/coincident-midpoint-common-frequency-minimum-delayed-action-provider.test.js](../../../../tests/coincident-midpoint-common-frequency-minimum-delayed-action-provider.test.js)
- [tests/coincident-midpoint-common-frequency-outer-radius-band-expansion.test.js](../../../../tests/coincident-midpoint-common-frequency-outer-radius-band-expansion.test.js)
- [tests/coincident-midpoint-common-frequency-outer-radius-history-policy-extension.test.js](../../../../tests/coincident-midpoint-common-frequency-outer-radius-history-policy-extension.test.js)
- [tests/coincident-midpoint-common-frequency-outer-radius-second-band-expansion.test.js](../../../../tests/coincident-midpoint-common-frequency-outer-radius-second-band-expansion.test.js)
- [tests/coincident-midpoint-common-frequency-prescribed-structural-root-ledger.test.js](../../../../tests/coincident-midpoint-common-frequency-prescribed-structural-root-ledger.test.js)
- [tests/compact-configuration-sweep-analyzer.test.js](../../../../tests/compact-configuration-sweep-analyzer.test.js)
- [tests/current-source-manifest.test.mjs](../../../../tests/current-source-manifest.test.mjs)
- [tests/f5-current-build-admission.test.js](../../../../tests/f5-current-build-admission.test.js)
- [tests/f5-current-handoff.test.js](../../../../tests/f5-current-handoff.test.js)
- [tests/f5-independent-interpolation-enclosure.test.js](../../../../tests/f5-independent-interpolation-enclosure.test.js)
- [tests/f5-original-input-tree.test.js](../../../../tests/f5-original-input-tree.test.js)
- [tests/f5-phase-varying-campaign-spec.test.js](../../../../tests/f5-phase-varying-campaign-spec.test.js)
- [tests/f6c-acceleration-pilot-process.test.js](../../../../tests/f6c-acceleration-pilot-process.test.js)
- [tests/f6c-acceleration-pilot.test.js](../../../../tests/f6c-acceleration-pilot.test.js)
- [tests/f6c-bounded-operation-closure.test.js](../../../../tests/f6c-bounded-operation-closure.test.js)
- [tests/f6c-bounded-operation.test.js](../../../../tests/f6c-bounded-operation.test.js)
- [tests/f6c-cached-root-cover-full.test.js](../../../../tests/f6c-cached-root-cover-full.test.js)
- [tests/f6c-cached-root-cover-pilot-launcher.test.js](../../../../tests/f6c-cached-root-cover-pilot-launcher.test.js)
- [tests/f6c-emission-refinement-pilot.test.js](../../../../tests/f6c-emission-refinement-pilot.test.js)
- [tests/f6c-evidence-packaging.test.js](../../../../tests/f6c-evidence-packaging.test.js)
- [tests/f6c-parent-emission-refinement-pilot.test.js](../../../../tests/f6c-parent-emission-refinement-pilot.test.js)
- [tests/f6c-parent-refinement-batch-preparation.test.js](../../../../tests/f6c-parent-refinement-batch-preparation.test.js)
- [tests/f6c-refined-acceleration-pilot.test.js](../../../../tests/f6c-refined-acceleration-pilot.test.js)
- [tests/f6c-streamed-leaf-diagnostic.test.js](../../../../tests/f6c-streamed-leaf-diagnostic.test.js)
- [tests/mermaid-markdown-runtime.test.js](../../../../tests/mermaid-markdown-runtime.test.js)
- [tests/orthogonal-plane-weave-balance.test.js](../../../../tests/orthogonal-plane-weave-balance.test.js)
- [tests/potential-live-timespace-pipeline-contract.test.js](../../../../tests/potential-live-timespace-pipeline-contract.test.js)
- [tests/prescribed-response-pilot-process.test.js](../../../../tests/prescribed-response-pilot-process.test.js)
- [tests/source-replay.test.js](../../../../tests/source-replay.test.js)
- [tests/subfield-circular-current-context.test.js](../../../../tests/subfield-circular-current-context.test.js)
- [tests/subfield-circular-current-prior.test.js](../../../../tests/subfield-circular-current-prior.test.js)
- [tests/subfield-circular-root-pilot.test.js](../../../../tests/subfield-circular-root-pilot.test.js)
- [tests/support/compact-monte-carlo-fixture.mjs](../../../../tests/support/compact-monte-carlo-fixture.mjs)
- [tests/test_eom_continuous_reception_roots.py](../../../../tests/test_eom_continuous_reception_roots.py)
- [tests/test_eom_continuous_reception_roots_cached.py](../../../../tests/test_eom_continuous_reception_roots_cached.py)
- [tests/test_f5_current_handoff.py](../../../../tests/test_f5_current_handoff.py)
- [tests/test_f6c_acceleration_execution.py](../../../../tests/test_f6c_acceleration_execution.py)
- [tests/test_f6c_cached_continuous_reception_root_cover.py](../../../../tests/test_f6c_cached_continuous_reception_root_cover.py)
- [tests/test_f6c_cached_continuous_reception_root_cover_preparation.py](../../../../tests/test_f6c_cached_continuous_reception_root_cover_preparation.py)
- [tests/test_f6c_continuous_reception_acceleration.py](../../../../tests/test_f6c_continuous_reception_acceleration.py)
- [tests/test_f6c_continuous_reception_acceleration_preparation.py](../../../../tests/test_f6c_continuous_reception_acceleration_preparation.py)
- [tests/test_f6c_emission_current_execution.py](../../../../tests/test_f6c_emission_current_execution.py)
- [tests/test_f6c_emission_refinement.py](../../../../tests/test_f6c_emission_refinement.py)
- [tests/test_f6c_evidence_package.py](../../../../tests/test_f6c_evidence_package.py)
- [tests/test_f6c_leaf_continuation.py](../../../../tests/test_f6c_leaf_continuation.py)
- [tests/test_f6c_leaf_stream_publication.py](../../../../tests/test_f6c_leaf_stream_publication.py)
- [tests/test_f6c_parent_emission_refinement.py](../../../../tests/test_f6c_parent_emission_refinement.py)
- [tests/test_f6c_parent_emission_refinement_conformance.py](../../../../tests/test_f6c_parent_emission_refinement_conformance.py)
- [tests/test_f6c_parent_emission_refinement_preparation.py](../../../../tests/test_f6c_parent_emission_refinement_preparation.py)
- [tests/test_f6c_parent_emission_refinement_verification.py](../../../../tests/test_f6c_parent_emission_refinement_verification.py)
- [tests/test_f6c_parent_evidence_inventory.py](../../../../tests/test_f6c_parent_evidence_inventory.py)
- [tests/test_f6c_refined_acceleration_conformance.py](../../../../tests/test_f6c_refined_acceleration_conformance.py)
- [tests/test_f6c_refined_acceleration_preparation.py](../../../../tests/test_f6c_refined_acceleration_preparation.py)
- [tests/test_f6c_retained_history_export.py](../../../../tests/test_f6c_retained_history_export.py)
- [tests/test_f6c_single_leaf_diagnostic.py](../../../../tests/test_f6c_single_leaf_diagnostic.py)
- [tests/test_f6c_streamed_leaf_session.py](../../../../tests/test_f6c_streamed_leaf_session.py)
- [tests/test_f6c_variable_cell_adapter.py](../../../../tests/test_f6c_variable_cell_adapter.py)
