# Option B current-source admission

## Scope and authority

Option B owns the current repository source-binding role of the root-cover pilot, cached root-cover pilot and cached root-cover full entry/launcher pairs. A source binding identifies the exact bytes a caller is permitted to use. Their [root-cover source manifest](option-b-root-cover-sources.jsonld), [cached pilot source manifest](option-b-cached-root-cover-sources.jsonld) and [cached full source manifest](option-b-cached-root-cover-full-sources.jsonld) supply these bindings outside executable source. The launcher requires the caller to supply its exact digest as `--source-map-sha256`, alongside the existing plan, entry and launcher digests. Successful source admission permits the existing operational checks to proceed; it does not authorize a scientific run, accept numerical results, or approve publication.

The operator's September 12 instructions to establish the baseline and implement the first profile authorize this bounded transfer. The initial baseline is the existing A source generation at commit `7c957f86c1ca8c7ff8d4cf8341f2b3e2748b4b09` in `https://github.com/jmarkmorris/architrino.git`. The [baseline descriptor](option-b-root-cover-baseline.json) enumerates all 18 original bindings. Fifteen repository bindings transfer with identical digest values; three retained numerical-evidence bindings remain in the entry. This baseline selection inherits the previous profile's source selections and scientific limits. It does not infer acceptance of the separate mathematical dependency maps from a merge event.

The trust boundary is the existing operator-selected launch invocation and its captured executable bytes. The invoking owner supplies the manifest digest from the examined candidate. The candidate must not compute its own current digest and present that computation as operator acceptance. Once the invocation is selected, changing a manifest byte, source byte, reader implementation, dependency or role cannot retain that invocation's authority. A manifest contains no self-digest, and no migrated executable contains the manifest digest. The existing publication receipt binds the full candidate, including these records and checks.

The operator also directed migration of the cached root-cover pilot. Its [baseline descriptor](option-b-cached-root-cover-baseline.json) uses the same retained Git commit and enumerates 25 original bindings: 22 repository identities transfer unchanged and three numerical-evidence identities remain in its entry. Its profile-specific map cannot authorize the other pilot, or vice versa, even when the caller supplies the other map’s correct digest.

The initial policy and implementation are established through these explicitly requested local migrations. Future launches use the examined entry, launcher and manifest identities. Changes to this policy or its verifier require examination under the preceding policy and the existing publication procedure. Separate signing infrastructure is not required: the [approval-route review](../analysis/option-b-approval-and-pilot-review.md) already permits explicit operator acceptance under the established Git workflow. No new signing identity, remote approval or published baseline is claimed here.

## Record and execution contract

The manifest uses `current-source-manifest/v1` and the vocabulary `https://architrino.com/knowledge/current-source/`. Each source has a stable ID derived from its repository path, a revision, an explicit role, and an exact whole-file selector. Roles distinguish operational source, independent reference, scientific control, scientific contract, resource plan, admission entry, launcher and manifest reader. Each relationship identifies its endpoints and their revisions. `dependsOn` records a declared dependency; `checks` records the admission entry's source coverage. Whole-file selectors retain the previous A byte boundary, including editorial changes.

The [reader](../../../../scripts/equation-mapping/current-source-manifest.mjs) rejects duplicate JSON member names, unsupported contexts or fields, ambiguous paths and IDs, unsupported selectors, missing or stale endpoints, duplicate relationships and missing admission coverage. The [impact query](../../../../scripts/equation-mapping/current-source-impact.mjs) uses the installed JSON-LD, N3 and Comunica libraries for old/new dependency traversal. Their stores are disposable views. No remote context, database or command supplied by graph data participates in execution.

The captured entry verifies the manifest against the externally supplied digest, captures the uniquely declared reader against its manifest digest, and executes that captured reader. The reader validates the graph and verifies every declared source. The entry rechecks the captured manifest, reader and sources before publishing the loaded binding state. Failure clears the prior state. Canonical paths and regular-file capture reject source substitutions through symbolic links.

The launcher forwards the manifest digest to each captured worker and registered stage. The manifest, reader and all source identities enter `planBindings`, so ordinary preflight, between-stage checks and final completion checks retain their existing byte-verification function. The numerical bootstrap, independent Python comparison, output identities, process-group closure, resource bounds and final completion requirements keep their existing obligations. Importing a source module alone does not initialize B admission.

The [transfer checker](../../../../scripts/equation-mapping/check-current-source-maps.mjs) first verifies a literal two-entry extraction control, then retrieves the retained A entry with `git show` at the fixed commit. It does not execute the historical entry. It compares the descriptor against all original entries, compares each profile’s transferred manifest identities against that independently retained source, verifies the exact new composition paths and checks current source bytes. Its report is source-consistency evidence. Selecting a digest for a real launch remains the caller's existing authority.

The default [Content Integrity gate](../../../../scripts/check-content-integrity.mjs) executes B's schema/admission tests and transfer checker as required checks. All three root-cover profiles have been removed from the old `current-launch-bindings.test.js` loop. That test remains responsible for the unmigrated prescribed-response and acceleration profiles. The two mathematical dependency trials retain their separate report-only role; they do not control this launch boundary.

## First-profile transfer inventory

All paths and exact before/after digests are in the baseline descriptor and source manifest. The following grouping identifies what each record protects; moving a source identity does not change the source or its scientific authority.

| Source group | Count | Role after transfer |
| --- | ---: | --- |
| `launch-subfield-circular-root-pilot.mjs` | 1 | Current operational helper; the duplicate launcher literal is retired |
| `prepare-f6c-continuous-reception-root-cover.py` | 1 | Current preparation source, with its scientific obligations retained |
| `verify-f6c-continuous-reception-root-cover.py`, `verify-f6c-accepted-frame-reconstruction.py`, `verify-f6c-retained-history-guards.py` | 3 | Independently authored comparison/reconstruction source identities |
| `oracle/continuous_reception_roots.py`, `oracle/certified_history.py`, `oracle/decimal_interval.py` | 3 | Reference implementation identities |
| `test_f6c_continuous_reception_root_cover_preparation.py`, `test_f6c_continuous_reception_root_cover.py`, `test_eom_continuous_reception_roots.py` | 3 | Scientific source controls |
| Root-cover pilot resource plan | 1 | Current resource-plan identity |
| Root-cover predeclaration, enclosure contract, accepted-frame reconstruction document | 3 | Scientific contract source identities |
| Entry, launcher, captured manifest reader | 3 additional | Explicit B composition identities; no manifest self-reference |

Measured by the transfer checker, the graph has 18 source records and 35 relationships. The two migrated executable files contained 19 literal SHA-256 values before the transfer and contain three afterwards: 16 current-source literal occurrences were removed, representing 15 distinct transferred bindings and the duplicated outer-helper binding. The three remaining literals identify retained numerical evidence. The baseline descriptor retains the old selections as provenance, while the current manifest owns current admission.

Scientific preparation and comparison files also carry hashes for their own frozen evidence/reference obligations. Those controls are unchanged and remain outside these transfers. So do historical `.source` identities, prescribed-response/acceleration profile pins, external Action and package/runtime identities, and publication receipts. The cached-profile construction tests retrieve the exact pre-B root-cover entry, launcher and test sources from the baseline commit, verify their original digests and apply the unchanged transformations. They do not execute historical source or require the migrated files to remain old.

## Cached-profile transfer inventory

The cached pilot profile uses the same captured reader and explicit-digest launch protocol. The shared checker runs all three profiles; a scope or entry-path mismatch is an error. Its graph has 25 sources and 49 relationships, measured by the transfer checker: the 22 inherited repository sources plus the entry, launcher and manifest reader. The original 25 entry literals and one outer-helper launcher literal become three retained evidence literals. No inherited digest is refreshed.

The cached source set includes its preparation, comparison, cached reference and scientific controls, as well as the uncached reference/comparison, cache-equivalence document and earlier full resource plan required by its independent verifier. The scientific comparison’s 20 fixed bindings remain covered by actual preflight. Their source files and fixed numerical claims are unchanged; the [cached migration record](../analysis/option-b-cached-root-cover-cutover.md) records the exact transfer and validation.

Historical construction checks compare the original root-cover and cached generations from retained Git against their original digests and transformations. The full-profile construction control retrieves both original process tests from that same baseline and verifies their original digests. This preserves historical obligations without demanding that active B source remain byte-identical to A. The existing prescribed-response and acceleration admission paths retain A.

## Full-profile transfer inventory

The operator separately directed the cached root-cover full transfer. Its [baseline descriptor](option-b-cached-root-cover-full-baseline.json) records all 34 original bindings from the same retained Git generation. The transfer checker verifies 23 unchanged current-source identities and 11 retained evidence identities. The [full manifest](option-b-cached-root-cover-full-sources.jsonld) has 26 sources and 51 relationships, including the entry, launcher and captured reader. Each profile rejects both other profiles' maps, even when supplied with their correct digests.

Evidence role is not determined by directory alone. Ten full-profile evidence inputs live under ignored local storage; the eleventh is the saved [pilot launch plan](../../braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json), a historical input required by the full comparison. The checker explicitly classifies that repository path as retained historical evidence and rejects descriptor reclassification. Its original digest remains in the full entry and combined plan bindings, outside the current-source graph.

The full profile retains its exact 160-cell coverage, sequential consumer/comparison, inclusive 1800-second deadline, 2 GiB aggregate RSS ceiling, at-most-one-second observation gap and original host/byte limits. No scientific source or historical plan is refreshed. The [full migration record](../analysis/option-b-cached-root-cover-full-cutover.md) gives the resource boundary, downstream historical routes and validation evidence.

## Verification and maintenance

Run the required focused checks with:

```bash
node --test --test-concurrency=1 tests/current-source-manifest.test.mjs tests/option-b-root-cover-admission.test.mjs tests/f6c-root-cover-pilot.test.js tests/f6c-cached-root-cover-pilot-launcher.test.js tests/f6c-cached-root-cover-full.test.js tests/current-launch-bindings.test.js tests/content-integrity-reporting.test.js tests/pr-validation-receipt.test.js
node scripts/equation-mapping/check-current-source-maps.mjs
node --test --test-concurrency=1 tests/f6c-root-cover-pilot-process.test.js tests/f6c-cached-root-cover-pilot-process.test.js tests/f6c-cached-root-cover-full-process.test.js
```

The process tests need permission to observe host processes. They use synthetic stages and do not execute the scientific pilot. Python-backed unit controls use the shared project venv. The [migration record](../analysis/option-b-current-source-cutover-inventory.md) records actual results and the separate mathematical-map selector repair.

An edit to a current dependency makes its manifest binding stale. Review that edit and its declared dependents before preparing new external metadata. The initial transfer checker deliberately rejects changing any inherited source identity in any migrated profile: it proves an identity-preserving migration. A later scientific-source update must establish a successor baseline and disposition the independent Python controls that still bind that source. Merely rewriting the old transfer descriptor cannot satisfy its retained-Git comparison. Changes confined to the migrated entry or launcher update their manifest records without requiring another executable to embed their hashes. A new selected invocation names the resulting manifest digest.

Claim grade: measured for byte identity, tested rejection behavior and the enumerated transfer, using the commands above; inferred for the claim that this is an appropriate bounded replacement of A. A changed source admitted under the preceding manifest digest, a missing original binding, a bypassed scientific/process control, or a historical test reading unverified substitute bytes would overturn that conclusion. Mathematical completeness, total repository hash removal, production scientific execution and broader Option B adoption are outside this result.
