# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `content_integrity_runner_report_and_continue` — [OPS-021](#ops-021--content-integrity-runner-report-and-continue). Status: `In progress`.
2. `pr_gate_test_sweep_duration_split` — [OPS-022](#ops-022--pr-gate-test-sweep-by-duration-split). Status: `In progress`; installed as reporting.
3. `release_gate_profile_coverage` — [OPS-020](#ops-020--release-gate-profile-coverage). Status: `Queued`, all three questions decided.
4. `agent_guidance_surface_consolidation` — [OPS-014](#ops-014--agent-guidance-surface-consolidation). Status: `Queued`.
5. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: `Queued`.
6. `archie_mcp_tool_contract_fixture_drift` — [OPS-023](#ops-023--archie-mcp-tool-contract-fixture-drift). Status: `Queued`.

## Queued task records

### OPS-018 — Layout-pass digest-pin attribution

- **Status:** Closed 2026-09-06. Removed from the ranked list; the record below is retained because the attribution history is referenced by OPS-019, OPS-020, and the braid-program queue. Verdict: no Node or Python digest failure originates in the layout pass beyond the two pins repaired on 2026-09-05. The one Python pin the layout pass re-hashed had already been broken by `897fe1aa7`; its refresh is routed to braid-program (see [the closure subsection](#attribution-rule-and-closure-2026-09-06)).
- **Priority object:** `layout_pass_digest_pin_attribution`
- **Request / acceptance:** Determine, for every currently failing content-digest assertion, whether the workstream directory layout pass caused it or whether it was already failing. Acceptance requires a per-failure verdict of `caused-by-layout-pass` or `pre-existing`, each supported by a run rather than by inference, and a complete failure list from the full Node and Python suites rather than a partial sweep.
- **Origin:** The layout pass rewrote 4,478 links, which changed the bytes of 361 files in commit `51ee4b84f` and 81 more in `965c1a3b4`. Several evidence and methodology documents are bound elsewhere by a pinned SHA-256, and a content hash cannot distinguish a link rewrite from a substantive edit. Recorded in [the AAA work threads log](../aaa-work-threads/work-log.md) under 2026-09-05.

Plainly: filing the documents changed their bytes, and other files record those bytes as a fingerprint, so the fingerprints now disagree. The question is which disagreements this campaign caused.

A partial sweep on 2026-09-05 covered 120 of 318 Node test files and found fourteen failures: three belong to [OPS-017](#ops-017--feedback-app-resource-closure-adjudication), two fail only because that session's sandbox lacked the shared venv at `$AAA_VENV`, one fails on a sandbox `EPERM` under `.local-data/`, and eight are content-digest pins. The remaining 198 files are unswept.

Three pins were traced individually. Two were attributed to this campaign and repaired under [OPS-019](#ops-019--layout-pass-digest-pin-repair). One, the analytical methodology coverage contract in [`analytical-measure-coverage.v2.json`](../../../src/prescribed-path-analysis/analytical-measure-coverage.v2.json), pins `content/markdown/aaa/noether-braid/braid-analysis-methodology.md`, which was last changed by `c973402b9` and is therefore pre-existing.

The decisive method is direct: run the affected suites at the parent of `51ee4b84f` on a machine with the shared venv, then at `HEAD`, and compare. Do not attribute by reasoning about which files a commit touched; a pin can be bound to a document that a later commit also edited, and the traced sample of three already produced one mistaken attribution before it was checked against history.

Note for whoever runs this: the commit message of `51ee4b84f` reads "Converge corpus documents to canonical academic style", but that commit carries 237 renames and is the layout pass. Its message does not describe its content.

#### Scope narrowed and blocker corrected, 2026-09-06

Three things changed after this row was written, and two of them shrink it.

**The stated blocker was a method choice, not an environment limit.** This row specified running the suites at two commits, which needs a checkout and the shared venv. Attribution does not require either: `git show <commit>:<path>` reconstructs a document's historical bytes, and comparing those hashes against a pin answers "when did this last match" directly. That method was used for all three traced pins and works in a sandbox without the venv. What the venv genuinely blocks is only running the Python suites and the `owned-compute-stop-hook` test, which fails on a sandbox `EPERM` under `.local-data/` rather than on any digest.

**Most of the failure population is already explained and routed elsewhere.** OPS-020's per-file timing of all 322 test files found fourteen tracked files failing unseen on `main`: thirteen at module resolution because they import `scripts/eom/launch-abc-enclosed-root-pilot.mjs` or a sibling renamed on 2026-09-01, and one from a 2026-07-16 document deletion. Both causes pre-date the layout pass, both are routed to the [braid-program](../braid-program/work-queue.md) and app-solver queues, and neither is a digest pin. They are out of scope here and must not be re-attributed.

**A proper instrument now exists.** Use [`scripts/run-test-sweep.mjs`](../../../scripts/run-test-sweep.mjs) with its slow-list rather than an ad-hoc chunked loop.

What remains is therefore narrower than the row above describes: the digest-related failures that are neither OPS-017, nor the fourteen routed files, nor the two environment cases. A partial re-sweep of the first 80 test files on 2026-09-06 observed ten failures, of which one (`borg-library`) is not digest-related and two (`all-candidate-analytical-rebuild`, `analytical-campaign-database`) share the single already-traced methodology-coverage pin, itself pre-existing from `c973402b9`. The unattributed remainder is small, and the files beyond the first 80 are still unswept.

One caution earned on 2026-09-06: an attempt to enumerate pins by scanning JSON for a path field beside a 64-hex field produced 393 false positives, because `assembly-registry.v1.json` pairs a path with `modelRevisionSha256`, which hashes a model revision rather than the file at that path. Do not enumerate pins by shape. Enumerate them from assertions that actually fail, which is the only ground truth available.

#### Full sweep run and classified, 2026-09-06

`node scripts/run-test-sweep.mjs` completed in a sandbox: 2,267 assertions, 2,091 passing, 168 failing across **55 distinct test files**. Classifying every failure block by its error text gives:

| Cause | Files |
| --- | ---: |
| Other, including the routed module-resolution failures | 37 |
| Digest mismatch | 9 |
| Missing shared venv or Python module | 5 |
| Analytical methodology coverage gate | 4 |

The four methodology-gate files all fail on the **same** pin, `methodology hash 611b89ce…`, which is the already-traced pre-existing failure from `c973402b9`. They are one defect, not four.

So the true remaining scope of this row is **nine digest files**: `archie-service-contracts`, `archie-service-source-index-snapshot`, `borg-eom-migration`, `f5-enclosed-root-prefix`, `f5-independent-interpolation-enclosure`, `f5-phase-varying-campaign-spec`, `f6c-parent-emission-refinement-pilot`, `prescribed-response-pilot-entry`, and `subfield-circular-root-rung`. Every one is a braid, EOM, or Archie-service test; none is in a lane the layout pass filed.

That last observation is the reason to expect this row to close small. Two of the nine name their pinned inputs as quoted paths, and both were last modified by `f6954f91d` and `897fe1aa7`, neither of which is a layout-pass commit. Grade: `inferred`, on a sample of two. The remaining seven construct their inputs and need the `git show` walk per pin.

Method note, twice earned on 2026-09-06. A TAP extraction keyed on `not ok … - tests/…` found only 19 files, because most failures are reported as subtests whose file appears in a `location:` field; and a parser that stopped at `location:` classified all 55 as "other", because `error:` follows `location:` in the YAML block. Validate any such extractor against a failure whose text you already know before trusting its totals.

#### Verdicts, 2026-09-06

Each of the nine digest files was traced to what it pins, and the pinned input's last-modifying commit was compared against the four commits this campaign produced (`513eea319`, `51ee4b84f`, `293b3d987`, `965c1a3b4`).

| Test file | What it pins | Last modified | Verdict |
| --- | --- | --- | --- |
| `prescribed-response-pilot-entry` | — | — | **Misclassified.** Fails on `ENOENT …/.venv`; an environment case, not a digest. |
| `archie-service-source-index-snapshot` | `sceneGraph`, `readingCopies`, `textbookToc` hashes | `293b3d987` | **This session, not the layout pass.** Those three were regenerated under operator approval on 2026-09-05 to add the missing feedback scene and the missing equation link. The pin is stale for a good reason; refresh it as a generated-artifact pin, after confirming the regenerations were the only change. |
| `archie-service-contracts` | `scripts/archie-service/build-source-index.mjs`, `validate-contracts.mjs` | `f6954f91d`, `404736864` | Pre-existing. |
| `borg-eom-migration` | `reference/priorities/app-solver/contracts/master-eom-binding-v1.md` | `00710092e` | Pre-existing. |
| `f5-independent-interpolation-enclosure` | `scripts/eom/derive-f5-independent-interpolation-enclosure.mjs` | `897fe1aa7` | Pre-existing. |
| `f5-phase-varying-campaign-spec` | `braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json` | `897fe1aa7` | Pre-existing. |
| `f6c-parent-emission-refinement-pilot` | `scripts/eom/f6c-bounded-operation.mjs`, `run-f6c-parent-emission-refinement-pilot.mjs` | `4c1860f86` | Pre-existing. |
| `f5-enclosed-root-prefix` | `src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs` via `REDUCER_PATH` | `897fe1aa7` | Pre-existing. |
| `subfield-circular-root-rung` | eight frozen runtime files under `SUBFIELD_CIRCULAR_RUNTIME_PATHS` | `897fe1aa7`, `00710092e` | Pre-existing. |

Reading the table: **of the nine, none is attributable to the layout pass's link rewriting.** One is an environment case, one is this session's approved content regeneration, and seven have pinned inputs untouched since before any campaign commit. Two later corrections: `archie-service-contracts` is not a digest pin at all but a pre-existing MCP tool-contract semantics mismatch across eight fixture responses, flagged only because its output mentions `sha256`, and belongs to the Archie service owner; and the `archie-service-source-index-snapshot` fixture was already stale before this session, because two of its indexed corpus sources changed in `c973402b9` and `d53d2b388` after the fixture was last written on 2026-09-03. That fixture pins freshness, not evidence, and was rebuilt from the current sources on 2026-09-06; the test passes 3 of 3 and no longer appears in the sweep. The original worry that the pass had broken an unknown number of pins across the tree is not supported. The two pins traced and repaired on 2026-09-05 remain the only confirmed layout-pass casualties.

The 37 files classified as "other" are not this row's concern but were bucketed so the next reader need not redo it: 25 are `f5`, `f6c`, and `prescribed` braid-pilot tests, which include the thirteen module-resolution failures already routed to braid-program; one is a floating-point last-digit mismatch in `borg-configuration-geometry-records`; one, `subfield-circular-root-preparation`, reports `reviewed source drift: src/eom/CMakeLists.txt`; and `pr-branch-process-conformance` appeared in one sweep's failure set, passed 6 of 6 in isolation, and did not appear in a second full sweep run minutes later with its pinned files unchanged, so the first appearance was a transient during a concurrent edit rather than an order dependence. One more of the 37 was explained on 2026-09-06 by the vibe-project self-test rather than by the sweep: `tests/iron-group-binding-cusp-toy-sweep.test.js` line 1571 asserts `resolvedPath` against the literal string `/Users/markmorris/vibe/architrino/scripts/spacetime/noether-sea-density-compression-provider.v1.json`, so it fails on any machine or mount other than the operator's, including CI. That is a portability defect in the test, not in the provider; the expected value should be derived from the repository root at runtime. The same self-test found `tests/fixtures/f6c-lossless-packaging-expectations.v1.json` carrying 34 absolute `/Users/markmorris/vibe/...` paths, including `.local-data/` locations; no current failure was traced to it, but it is the same class of machine-bound expectation and should be reviewed by whoever next touches `f6c-streamed-leaf-diagnostic`. Grade: `measured` for the iron-group cause, by running the test and reading its `+ actual - expected` block; `inferred` that the fixture is a latent instance of the same defect.

#### Python suite on the operator's machine, 2026-09-06

The interpreter gate printed `sys.executable = /Users/markmorris/vibe/.venv/bin/python` after importing `sys`, `mpmath`, and `sympy`. The known-case command `"$PY" -m unittest discover -s tests -p 'test_mec007_stationary_mirror_incoming_oracle.py'` ran 3 tests and ended with `OK` before the suite sweep. The operator-specified loop then completed all 74 `tests/test_*.py` files individually with `"$PY" -m unittest discover -s tests -p "$b"`: **13 failing of 74**, measured by the completed loop and the 13 lines in `/tmp/pyfails.txt`; the shell glob independently enumerated 74 files. Each failing file was rerun with the same discover form to retain its full error text in `/tmp/ops018-<filename>.log` for manual reading. No classifier was written.

The complete failing list from `/tmp/pyfails.txt`, verbatim:

```text
test_eom_continuous_reception_roots.py :: FAIL: test_frozen_mathematical_dependencies_remain_identical (test_eom_continuous_reception_roots.NoSamplingPr
test_f5_api_domain_conformance.py :: ImportError: Failed to import test module: test_f5_api_domain_conformance
test_f5_history_manifest_conformance.py ::     cls.config, cls.report, _ = load_frozen_sources(ROOT)
test_f6c_accepted_frame_reconstruction.py ::     self.assertIn("export SHA-256 mismatch", packet["failures"][0]["detail"])
test_f6c_cached_continuous_reception_root_cover.py :: AssertionError: 'db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc' != 'f20e4bdaaff8b6f0012fdc6
test_f6c_cached_continuous_reception_root_cover_preparation.py :: ImportError: Failed to import test module: test_f6c_cached_continuous_reception_root_cover_preparation
test_f6c_parent_emission_refinement.py :: AssertionError
test_f6c_parent_emission_refinement_conformance.py :: ImportError: Failed to import test module: test_f6c_parent_emission_refinement_conformance
test_f6c_parent_emission_refinement_verification.py :: ImportError: Failed to import test module: test_f6c_parent_emission_refinement_verification
test_f6c_retained_history_guards.py :: FAIL: test_cli_wrong_frozen_input_publishes_explicit_rejection_only (test_f6c_retained_history_guards.CaptureC
test_f6c_streamed_leaf_session.py ::     f = load('streamed_leaf_frozen_driver_controls', 'tests/test_f6c_single_leaf_diagnostic.py',
test_orthogonal_plane_weave_fold_limit_certificate.py ::     raise ValueError(f"frozen input changed: {path}")
test_prescribed_acceleration_response_publication.py ::     raise ValueError(message)
```

Manual classification of the full failure text gives 0 `native-build`, 10 `frozen-hash`, and 3 `other`. The literal `frozen` match includes failing test names and traceback identifiers: `parent_prefrozen_closedforms` and `streamed_leaf_frozen_driver_controls` appear in the verification and streamed-session tracebacks respectively. A digest assertion without any of the specified text markers remains `other`; its pinned input is still recorded below. The first error lines for those three `other` files are `AssertionError: 'db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc' != 'f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68'` for cached root cover, `AssertionError` for parent-emission refinement, and `ImportError: Failed to import test module: test_f6c_parent_emission_refinement_conformance` for its conformance test, whose traceback ends in `AssertionError` at the `PROOF_SHA` comparison.

| file | class | pinned input | last commit | verdict |
| --- | --- | --- | --- | --- |
| `test_eom_continuous_reception_roots.py` | frozen-hash | `reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md` | `51ee4b84f 2026-09-05` (last); pin last matched at `0fb575921`, first broken by `897fe1aa7` | pre-existing (hash walk below) |
| `test_f5_api_domain_conformance.py` | frozen-hash | `scripts/eom/oracle/f5_history_manifest_conformance.py`, pinned by `scripts/eom/oracle/f5_api_domain_conformance.py` | Prior trace: `0fb575921` or `897fe1aa7` | pre-existing |
| `test_f5_history_manifest_conformance.py` | frozen-hash | `reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json` (`approved-config` in the imported oracle) | Prior trace: `0fb575921` or `897fe1aa7` | pre-existing |
| `test_f6c_accepted_frame_reconstruction.py` | frozen-hash | `reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md` | Prior trace: `0fb575921` or `897fe1aa7` | pre-existing |
| `test_f6c_cached_continuous_reception_root_cover.py` | other | `reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md` (`rootTheorem` in `scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py`) | `51ee4b84f 2026-09-05` (last); pin last matched at `0fb575921`, first broken by `897fe1aa7` | pre-existing (hash walk below; was `layout pass` under the last-commit rule) |
| `test_f6c_cached_continuous_reception_root_cover_preparation.py` | frozen-hash | `reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md` | Prior trace: `0fb575921` or `897fe1aa7` | pre-existing |
| `test_f6c_parent_emission_refinement.py` | other | `reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md` (`proof` in `PINS`) | `897fe1aa7 2026-09-01` | pre-existing |
| `test_f6c_parent_emission_refinement_conformance.py` | other | `reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md` (`PROOF`) | `897fe1aa7 2026-09-01` | pre-existing |
| `test_f6c_parent_emission_refinement_verification.py` | frozen-hash | `reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md`, through the imported conformance controls | `897fe1aa7 2026-09-01` | pre-existing |
| `test_f6c_retained_history_guards.py` | frozen-hash | `reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md` (`THEOREM_PATH` in `scripts/eom/verify-f6c-retained-history-guards.py`) | `51ee4b84f 2026-09-05` (last); pin last matched at `0fb575921`, first broken by `897fe1aa7` | pre-existing (hash walk below; was `layout pass` under the last-commit rule) |
| `test_f6c_streamed_leaf_session.py` | frozen-hash | `tests/test_f6c_single_leaf_diagnostic.py` | `baa3e7323 2026-09-06` | pre-existing |
| `test_orthogonal_plane_weave_fold_limit_certificate.py` | frozen-hash | `content/markdown/aaa/dynamics/master-equation.md`, through `scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_fold_limit_certificate.py` and its protocol's `masterEquationPath` | `c973402b9 2026-09-05` | pre-existing |
| `test_prescribed_acceleration_response_publication.py` | frozen-hash | `scripts/eom/reduce-prescribed-acceleration-response.py` (`CONSUMER` in `scripts/eom/publish-prescribed-acceleration-response.py`) | `897fe1aa7 2026-09-01` | pre-existing |

The five operator-designated prior verdicts are carried forward without re-tracing their history; the supplied prior record gives the two-commit set, not a per-file assignment. All other last-commit entries are measured with `git log --format='%h %ad' --date=short -1 -- <pinned path>`, and their verdicts follow the operator's exact four-commit membership rule (`513eea319`, `51ee4b84f`, `293b3d987`, `965c1a3b4`). Here `pre-existing` is that rule's label, including the later `baa3e7323` commit; it is not an independent claim that every mismatch began before the layout pass. For the bare parent-refinement assertion, `shasum -a 256` on all nine explicitly named `PINS` inputs matched eight declared hashes and isolated the `proof` mismatch. The failure paths were read from the tests first and then their actual imported checker or oracle; the orthogonal-plane oracle lives under `scripts/prescribed-path-analysis/oracle/`, not `scripts/eom/oracle/`.

Under the requested last-commit rule, Python digest failures in cached root cover and retained-history guards trace to the layout pass because their shared pinned enclosure contract was last modified by `51ee4b84f`.

That live attribution for the two additional files conflicts with the carried-forward `pre-existing` verdict for `test_eom_continuous_reception_roots.py`, which checks the same contract and expected digest; the five protected prior verdicts have not been rewritten. This section supersedes the older blanket statement below that no Python digest failure traces to the layout pass and the older assertion that the Python tail remains unrun. The conditional closure is not authorized by this result: the status and ranked entries remain unchanged, and the conditional ranking validator was not run. No digest was refreshed and no repair was made. Falsifier for the new attribution: the named pinned path's `git log -1` result falling outside the four specified commits under the same checkout state.

#### Attribution rule and closure, 2026-09-06

An independent re-derivation of the Python table found its three enclosure-contract rows contradicting one another: the same pinned file carried `pre-existing` in one row and `layout pass` in two, because the last-commit rule labels whichever commit touched the file most recently, and the layout pass touches almost everything. The question the row actually asks is which commit first made the pin disagree, so the pinned file was hashed at every commit in its history (`git log --follow` on the path lists exactly three: `0fb575921`, `897fe1aa7`, `51ee4b84f`) with `git show <commit>:<path> | sha256sum`:

| Commit | SHA-256 of the enclosure contract | Matches pin `f20e4bda…` |
| --- | --- | --- |
| `0fb575921` (2026-08-27) | `f20e4bda…a117f68` | yes |
| `897fe1aa7` (2026-09-01) | `838f1a33…62e15ac` | no |
| `51ee4b84f~1` | `838f1a33…62e15ac` | no |
| `51ee4b84f` (layout pass) | `db38185a…4e23ef2bc` | no |
| `HEAD` `a7609931e` and worktree | `db38185a…4e23ef2bc` | no |

`897fe1aa7` broke the pin: `git show --name-status 897fe1aa7` lists the file as `M`, and `git diff 0fb575921 897fe1aa7` on it shows the ABC-to-subfield-circular rename rewriting "F6c" to "asymmetric counter-breathing representative" in the title, status line, and prose, 16 lines. The layout pass changed the bytes again, which is why the current worktree hash `db38185a…` is the one the Python assertions report, but it found the pin already broken. Grade: `measured`, by the commands named, on the one pinned file. Falsifier: a commit between `0fb575921` and `897fe1aa7` touching the path, which the `--follow` log excludes.

**Operator ruling, 2026-09-06:** for this row, attribution follows first mismatch, not last commit. Under that rule the three enclosure-contract rows in the table above read `pre-existing`, the two `layout pass` cells were corrected in place with their prior label noted, and every Python digest failure has a pinned input that last matched before any campaign commit. Together with the Node verdicts, the acceptance condition is met: no digest failure beyond the two 2026-09-05 pins originates in the layout pass. The row is closed. Its acceptance clause asked for a run at two commits; the scope-narrowing subsection above replaced that with the `git show` hash walk, which answers the same question without the venv, and that is the method every verdict here rests on.

The enclosure-contract pin itself still needs refreshing, and 22 files hold it (`git grep -n 'f20e4bdaaff8b6f0' -- scripts tests src`: the `continuous_reception_roots*` oracles, nine `prepare-`/`verify-f6c-*` Python scripts, seven `run-f6c-*` launchers, `verify-f6c-retained-history-guards.py`, one Node test, one Python test). Because the breaking commit is the rename already under repair in braid-program, the refresh is routed there under [Routed test breakage from OPS-020](../braid-program/work-queue.md#routed-test-breakage-from-ops-020), not to OPS-019, whose scope is layout-pass casualties only. `node scripts/validate-priority-ranking.mjs` passed after the ranked list was renumbered.

- **Evidence / blocker:** Every entry in the table is `measured` by `git log -1` on the named path. The claim that no Node digest failure traces to the layout pass is `measured` for all nine. The Python suites do not need the shared venv; the operator questioned that claim on 2026-09-06 and it did not survive checking. Two later corrections the same day: the shared venv is a macOS build and cannot execute in a Linux sandbox at all, so the Python residual belongs to the operator's machine by construction; and the first two attempts to run it there failed on a top-level `tests` package that `speechrecognition-3.14.3` had installed into the venv, shadowing the repository's `tests/` namespace package. That distribution was uninstalled on 2026-09-06 after `pip show` reported nothing depending on it, so the ordinary `tests.test_x` invocation works again on the operator's machine; the `discover -s tests` form remains correct either way. `mpmath`, `sympy`, and `numpy` are present; only `flint` (two files) and `scipy` are absent, and the suite is slow rather than blocked, because the oracle tests exceed a sandbox's per-command limit. Running 74 files individually with system Python produced fifteen failures before the budget ran out: five need `cmake` for native EOM builds, two timed out at 40 s, two are unclassified `AssertionError`s in `test_f6c_parent_emission_refinement_*`, and six are frozen-hash mismatches. All five of those six that could be traced pin inputs last modified in `0fb575921` or `897fe1aa7`, the latter being the ABC-to-subfield-circular rename already under repair in braid-program. **No Python digest failure traces to the layout pass either.** What remains unrun is the slow tail of the Python suite, and the two `cmake` and two timeout cases need the operator's machine. Falsifier: a Python digest assertion whose pinned input last matched at a campaign commit.
- **Completion:** Every failing digest assertion in the full suites carries a verdict supported by a run at both commits, and the list is recorded here or in the AAA work threads log.

### OPS-019 — Layout-pass digest-pin repair

- **Status:** Closed 2026-09-06 as a no-op. [OPS-018](#ops-018--layout-pass-digest-pin-attribution) attributed every Node digest failure and found none caused by the layout pass beyond the two pins already verified and refreshed on 2026-09-05. The repair set this row was to work through is empty. Retained for the record; the verify-then-refresh rule it states remains the standing procedure for any future digest pin.
- **Priority object:** `layout_pass_digest_pin_repair`
- **Request / acceptance:** Repair each pin that OPS-018 attributes to the layout pass, by verifying the bound document's substance and only then refreshing its digest. Acceptance requires, per pin, a recorded statement of what was checked and what the check found, before any digest is written.
- **Origin:** Follows OPS-018. Two pins were already repaired this way on 2026-09-05 and stand as the worked pattern.

The order matters and is not negotiable: verify, then refresh. A pin exists to force a human to re-read the bound document when it changes. Refreshing first and reasoning afterwards converts that gate into a formality and would leave a genuine content regression indistinguishable from a link rewrite.

The two completed repairs show the shape. For the Borg scientific-status projection, all 28 adjudication relations were confirmed present in the current owner text before the digest was updated. For the Borg Platonic relationship assignments, the owner document was diffed and found to differ by exactly one link path, with no substantive change, before the digest was updated.

Two exclusions. The analytical methodology coverage contract is out of scope here: its gate demands an explicit analytical coverage impact review, which is a scientific judgment about whether the methodology change affects measure coverage, not a digest refresh. Route it to its owning theory lane. Any pin that OPS-018 marks `pre-existing` is also out of scope; it belongs to whichever change actually broke it.

- **Evidence / blocker:** The two completed repairs and their verification steps are `measured` on 2026-09-05. The size of the remaining set is unknown until OPS-018 completes. Blocker: OPS-018. Resolved 2026-09-06: OPS-018 closed with an empty repair set for this row; the one Python pin it examined was broken by `897fe1aa7` and is routed to braid-program.
- **Completion:** Every pin attributed to the layout pass is repaired with its verification recorded, the excluded items are routed to named owners, and the full Node and Python suites pass apart from separately tracked items.

### OPS-017 — Feedback app resource closure adjudication

- **Status:** Verified, closed 2026-09-06. Removed from the ranked list; the record below is retained because its adjudication and capture history are referenced by OPS-018, OPS-020, and the operations tracker.
- **Priority object:** `feedback_app_resource_closure_adjudication`
- **Request / acceptance:** Re-accept the public feedback page's release profile and performance budget against its decided dependency set, by re-capturing both evidence receipts rather than editing recorded measurements. Acceptance requires `node scripts/check-webapp-release-gate.mjs` and `node scripts/check-browser-performance-budget.mjs` to pass against receipts measured on the current sources.
- **Origin:** Both checks failed during a full content-integrity run on 2026-09-05. They had been masked by an earlier failure in the same gate, so the run that surfaced them is the first to reach them.

The accepted `public-feedback` release profile declares four local resources: `feedback.html`, `src/apps/feedback/FeedbackManifestRuntime.js`, `src/apps/feedback/feedback.css`, and `src/apps/feedback/main.js`. The measured closure is fifteen. The eleven additions are `src/apps/navigator/StandaloneAppHomeRuntime.js`, `StandaloneAppLaunchRuntime.js`, `StandaloneAppNavigationRuntime.js`, `StandaloneAppSceneSearchRuntime.js`, `src/runtime/SceneSearchRuntime.js`, `SceneSearchUiRuntime.js`, `TopDynamicControlBarRuntime.js`, `top-dynamic-control-bar.css`, `src/services/SceneIndexService.js`, `SceneSearchCoordinatorService.js`, and `ui-tokens.css`. Separately, `check-browser-performance-budget.mjs` reports that the `public-feedback-interaction` profile's source byte count changed.

Plainly: a page that once loaded four files now loads fifteen, because it picked up the navigator, the scene-search stack, and the shared control bar.

The question to answer first is whether that growth was intended. A feedback page that now pulls the navigation and search runtimes may have acquired them deliberately, when the shared top control bar was adopted, or incidentally through an import that was convenient at the time. The profile exists to force that question, and re-accepting it without answering would discard the only signal that raised it. Do not regenerate either artifact to make the gate green: [AGENTS.md](../../../AGENTS.md) bars changing product design or accepted evidence merely to pass a check, and both of these are accepted evidence.

#### Root cause, investigated 2026-09-05

The feedback application's own code is 19,622 bytes across the four accepted files, and it imports nothing beyond itself: [`FeedbackManifestRuntime.js`](../../../src/apps/feedback/FeedbackManifestRuntime.js) has no imports at all. The entire excess enters through six lines of [`main.js`](../../../src/apps/feedback/main.js), which imports `createStandaloneAppNavigationRuntime` from the navigator in order to render one "Go to home page" button in the page header.

Two properties of that runtime turn one button into eleven files.

**Capabilities are opt-out, not opt-in.** In [`StandaloneAppNavigationRuntime.js`](../../../src/apps/navigator/StandaloneAppNavigationRuntime.js), `toc`, `back`, `forward`, `home`, and `search` each default to `{}` in the parameter list, and `normalizeCapability` returns `null` only when a value is literally `false`. An omitted capability is therefore enabled with its default label. The feedback page passes only `host`, `label`, and `home`, so it also builds Table of Contents, Back, Forward, and Search actions, and because `searchCapability` is truthy it constructs and initializes the scene-search runtime. The page presents five navigation controls where its author asked for one.

**Configuration alone cannot remove the code.** `StandaloneAppNavigationRuntime.js` imports `StandaloneAppSceneSearchRuntime.js` statically at module scope, which in turn statically imports `SceneSearchRuntime`, `SceneSearchUiRuntime`, `SceneIndexService`, `SceneSearchCoordinatorService`, and `StandaloneAppLaunchRuntime`. Passing `search: false` would stop the runtime being constructed and remove the button, but every one of those modules would still load, because an ES module's static imports resolve regardless of use. Reducing the closure requires a code change, not a configuration change.

Measured on 2026-09-05:

| Quantity | Value |
| --- | ---: |
| Accepted closure | 4 files, 19,622 bytes |
| Actual closure | 15 files, 68,455 bytes |
| Profile size budget | 32,768 bytes |
| Overage | 35,687 bytes, or 2.09× the budget |
| The eleven additions | 48,833 bytes, 2.5× the whole accepted application |
| Largest single addition | `TopDynamicControlBarRuntime.js`, 14,183 bytes |

`TopDynamicControlBarRuntime.js` alone is larger than the feedback application's own runtime. The `public-feedback-interaction` budget separately caps `resourceCount` at 8; the load-time closure is 15. No eager network cost was found: `StandaloneAppSceneSearchRuntime.init()` only closes the panel and wires listeners, and the scene index is fetched lazily when search is first expanded.

All 14 applications that use `createStandaloneAppNavigationRuntime` currently pass no capability as `false`, so every standalone page carries the full control bar. For the large applications that is plausibly intended; for a static form that vectors users to GitHub it is not.

#### Operator decision, 2026-09-05

The standard icon control strip belongs at the top right of the feedback page, search included, because a person may need to look something up before vectoring to GitHub. The dependency set is therefore intended and the eleven additional modules stay. This is stale bookkeeping, not a regression: the profile and budget were accepted before the control strip reached this page and have not been refreshed since.

That closes the adjudication and leaves re-acceptance. The remaining work is not a JSON edit.

#### What re-acceptance actually requires

Neither failing check compares source against a declared list alone. Both compare it against a captured evidence receipt, and both receipts are now stale.

`check-webapp-release-gate.mjs` requires [`feedback-webapp-release-gate-2026-09-01.json`](evidence/feedback-webapp-release-gate-2026-09-01.json) to carry a `sourceFiles` entry for every member of the closure with matching byte count and SHA-256, and to record seven passed categories: content, graph, size, visual, browser, accessibility, preview. Within those it requires visual inspection at 1440×900 and 390×844 with zero horizontal overflow and `visuallyInspected: true`, a browser console with zero messages, the four required interactions passed, measured accessibility counts, and an isolated clean-checkout preview build returning HTTP 200 on the route. Updating `resourceClosure` and raising `maxUncompressedBytes` above the measured 68,455 bytes is necessary but not sufficient; without a re-captured receipt the check fails on evidence mismatch instead of closure mismatch.

`check-browser-performance-budget.mjs` pins a source-closure fingerprint over seven paths, four of them the feedback sources and three of them shared content indexes: `content/scenes/scenes_index.json`, `content/markdown/markdown_index.json`, and `content/graph/scene_graph.json`. It requires the current file count, total byte count, and SHA-256 to equal the recorded 7 files and 824,432 bytes, and it validates measured cold and warm load timings, interaction-to-next-paint, frame timing, heap, and origin storage against the budgets. Two of those three shared indexes were regenerated on 2026-09-05, so this fingerprint would require a fresh capture even if the feedback page had not changed at all. No script in the repository produces this baseline; only the checker and [`tests/browser-performance-budget.test.js`](../../../tests/browser-performance-budget.test.js) read it. It is a manual browser capture.

Do not reconcile either receipt by editing its recorded bytes, hashes, or timings to match the current tree. A timing measured against a four-file page is not evidence about a fifteen-file page, and rewriting the fingerprint while keeping the old measurements would manufacture evidence rather than record it. The `resourceCount` budget of 8 in the performance profile also needs a decided value against a load-time closure of 15.

#### Progress, 2026-09-05

The contract half is done and the evidence half is not, because the two are separable and only one of them can be produced without a browser.

`webapp-release-gate.v1.json` now lists the decided fifteen-resource closure for `public-feedback` and raises `maxUncompressedBytes` from 32,768 to 81,920, recording the reason inline: the measured closure is 68,455 bytes, the new ceiling leaves roughly 16% headroom, and 48,833 of those bytes belong to the shared control strip rather than to the feedback application. `check-webapp-release-gate.mjs` now passes its local-resource-closure and size gates and fails only at `evidence source closure mismatch`, which confirms the remaining blocker is the receipt rather than the contract.

`browser-performance-budget.v1.json` is unchanged. Its `resourceCount` budget of 8 needs a decided value, but the correct one is a measured load-time resource count, not a number derivable from the source closure, so it is left for the capture that will produce it.

Neither evidence receipt was touched. Both require a browser session against a local preview build: visual inspection at two viewports, console state, interaction verification, accessibility measurement, and the preview build for the release gate; cold and warm load timings, interaction-to-next-paint, frame timing, heap, and origin storage for the performance baseline. A session whose browser cannot reach a local server cannot produce either, and no part of them should be reconstructed from the previous capture.

#### Status confirmed and blocker lifted, 2026-09-06

Both checks still fail, at the points the 2026-09-05 progress note predicted. `check-webapp-release-gate.mjs` fails at `public-feedback: evidence source closure mismatch`, reporting the receipt's four sources against the contract's decided fifteen. `check-browser-performance-budget.mjs` fails earlier still, at `public-feedback-interaction: source byte count changed`, before it reaches any timing comparison. Grade: measured, by running both scripts on 2026-09-06.

The decided fifteen-file closure was re-derived independently rather than read from the contract, by walking the relative `import` graph from `src/apps/feedback/main.js`. It reaches eleven JavaScript modules; with `feedback.html`, `feedback.css`, `top-dynamic-control-bar.css`, and `ui-tokens.css` that is exactly the fifteen the profile lists, and the eleven match the profile's named additions one for one. The contract half of this task therefore needs no revision. Grade: measured, by a static import walk on 2026-09-06.

The recorded blocker — that a session whose browser cannot reach a local server cannot produce either receipt — no longer holds in every session. A Cowork session's in-app browser can reach the operator's local dev server at `http://localhost:5173`, and both viewports this receipt requires, 1440x900 and 390x844, can be emulated and measured there. Two cautions for whoever takes this up. That pane reports `document.hidden = true`, so `requestAnimationFrame` never fires in it and any layout or animation pass gated on a frame callback must be invoked directly; a frame-timing or `medianFps` capture taken there would be measuring the harness, not the page. And the release gate additionally requires an isolated clean-checkout preview build returning HTTP 200, which is a separate step from pointing a browser at the working tree's dev server. The release-gate receipt looks capturable this way; the performance baseline's frame and timing budgets do not.

#### Release-gate receipt captured, 2026-09-06

The release-gate half is done. [`feedback-webapp-release-gate-2026-09-06.json`](evidence/feedback-webapp-release-gate-2026-09-06.json) was captured against the current sources and the profile's `evidencePath` now points at it; the 2026-09-01 receipt stays in place as history. `node scripts/check-webapp-release-gate.mjs` passes, and `check-content-integrity.mjs` now passes its first seven steps and halts at the eighth, the browser performance budget, which is this row's other half.

What was measured, all on 2026-09-06 at head `2bbc6a5b2`: fifteen closure files totaling 69,882 bytes, each with its byte count and SHA-256 recorded from disk; strict content validation with 0 errors and 0 warnings; the scene graph check with 0 errors; both viewports with 0 CSS px horizontal overflow and screenshots inspected; a clean console on load; the manifest schema, the sanitized `/molecule.html` path, three available public manifests, and the issue link's attributes; 0 unnamed controls, 0 duplicate ids, one `h1`, one `main`; and an isolated clean-checkout build of 4,424 files that served `/feedback.html` and the three manifests with HTTP 200 over loopback. The isolation was a shared-object clone in sandbox scratch at head plus the one modified source below. The 69,882-byte figure supersedes the 68,455 measured on 2026-09-05; `StandaloneAppNavigationRuntime.js` gained its design note, `feedback.css` the summary fix, and `FeedbackManifestRuntime.js` the clipboard fallback in between.

Two things the capture found that the previous receipt could not have:

- **Control-height floor.** The shared strip's five icon buttons are 32 CSS px tall at both viewports, and the diagnostics `summary` added on 2026-09-05 measured 24 px on desktop; the profile floor was 42. The floor had been accepted for a page whose only controls were its own 42 px actions. The operator decided on 2026-09-06 to lower the profile floor to 32, because the strip is 32 px by design under the UI guidelines' hit-target row and is not resized for one page, and to fix the summary. `feedback.css` now gives the summary a 42 px minimum height, so every page-owned control is at least 42 px and the recorded minimum of 32 is the strip alone. The contract carries the rationale inline.
- **Copy interaction.** The in-app browser pane reports `document.hidden === true` and Chrome denies clipboard writes there with `NotAllowedError`, even on a real click, so the pane cannot exercise the copy step. Claude in Chrome was not connected. The operator verified the copy action in their own browser and the receipt names them as the instrument for that interaction. The attempt also showed that `FeedbackManifestRuntime.js` handled an absent `clipboard.writeText` but not a rejected one: a browser that denied the permission left the status line unchanged and logged an unhandled rejection. Fixed the same day at operator direction: a rejected `writeText` now takes the same select-for-manual-copy fallback as an absent one, measured in the pane with no unhandled rejection and the full textarea selected. The receipt was re-captured after that change.

`tests/webapp-release-gate.test.js` now pins the new receipt path, 15 files, and 69,882 bytes; the two focused test files pass 9 of 9. Nothing frame-timed was captured, and the receipt's observations say why the pane cannot supply one.

#### For the performance baseline: the byte drift has two sources, not one

Handed over from the workstream-layout thread on 2026-09-06, because the remaining `public-feedback-interaction` failure is not attributable to the feedback application alone.

`check-browser-performance-budget.mjs` fingerprints seven paths, and only four of them belong to the feedback page. The other three are shared content indexes:

| Path | Current bytes |
| --- | ---: |
| `content/graph/scene_graph.json` | 735,053 |
| `content/scenes/scenes_index.json` | 58,181 |
| `content/markdown/markdown_index.json` | 13,839 |
| the four feedback sources | 19,686 |

The receipt pins 7 files and 824,432 bytes; the current total is 826,759, a delta of 2,327 bytes. `scene_graph.json` and `scenes_index.json` were last committed in `293b3d987`, where they were regenerated under operator approval to add the missing `content/scenes/archie/feedback.json` entry to the scene index. That regeneration is unrelated to the feedback page's dependency growth.

Two consequences for whoever re-captures this baseline. First, do not read the byte delta as a measure of how much the feedback application grew; most of it is scene-index regeneration. Second, the re-capture is required regardless of the OPS-017 decision, because a cold and warm load timing measured against the previous scene indexes is not evidence about the current ones, and this fingerprint would have gone stale even if the feedback page had never changed.

#### Performance-baseline handoff, 2026-09-06

The performance half was started and is handed to a fresh session. State to pick up from:

- **The probe was stale, now fixed (uncommitted).** `scripts/dev/BrowserPerformanceProbe.js` waited for the status text `manifest ready`; the page has said `Diagnostic details ready` since 2026-09-05, so the probe timed out after ten seconds. It now accepts either wording. This changes the instrument hash, so the new baseline must record the current `instrumentSources`, and the receipt should say the instrument was updated to the page's wording, not the reverse.
- **The photon profile is also stale.** `photon-4k-visual`'s source fingerprint no longer matches the 2026-09-01 baseline (38 files, 4,559,352 → 4,560,527 bytes, measured 2026-09-06), and the baseline file covers both profiles under one instrument hash. A passing checker therefore needs both profiles re-captured: the feedback profile at 1440×900, and photon at 3840×2160 with 300 frames plus two `ps` RSS samples of the browser's GPU process per the contract's `gpu.processMethod`. Carrying the 2026-09-02 photon numbers forward is barred by the contract's own `failureBehavior`.
- **First manual feedback run, 2026-09-06 15:11 UTC, operator's Chrome 151 on `localhost:5173`.** Not recordable — viewport was 1200×1999 and the origin was warm — but indicative: cold load 20.1 ms, warm 25.3 ms, cold transfer 882,355 bytes, warm 812,473, 240 frames at 59.88 median FPS with p95 17.4 ms and 0 over 33.34 ms, refresh-to-next-paint 33.1 ms, warm heap 4,768,771 bytes, frame-window growth 50,532, origin storage 0. Every budget passes except `resourceCount`: measured 17 (fourteen code files plus three manifests; the HTML is the navigation) against 8.
- **Decision pending:** the `resourceCount` budget. Proposed 20, the same headroom logic as the byte ceiling; the operator has not yet confirmed.
- **Capture requirements the checker enforces:** viewport exactly 1440×900 at DPR 1; `originWasFresh: true` on the cold load, which means a dev server on a port not previously used in that browser (`PORT=<fresh> node scripts/dev/start-local-dev.mjs`); `sameOriginReload: true` on warm; the evidence file's `sourceClosures.public-feedback-interaction.paths` must begin with `feedback.html` and should now list all fifteen release-gate closure files plus the three manifests, since that is what the page loads.
- **Session note.** Claude in Chrome could not be reached from the capturing session despite the extension being signed in, the desktop toggle on, and restarts of both applications; the in-app pane cannot render frames. A new session is expected to pair.

#### Second attempt set aside, 2026-09-06 — routed to Codex

A fresh Cowork session also failed to pair: `tabs_context_mcp` returned "not connected" and `list_connected_browsers` returned an empty list on four tries, before and after the operator reopened the signed-in side panel. Grade: measured, by those calls. No capture was made and no evidence, contract, or test file was changed by this session. The operator set the capture aside after roughly two hours across both sessions and asked that Codex attempt it next; the state below is what Codex needs.

- **Decided:** the feedback profile's `resourceCount` budget is **20**, confirmed by the operator on 2026-09-06 against the indicative measured 17, on the same headroom logic as the byte ceiling. Write it into the contract with the reason inline when the capture is recorded; it is not yet written.
- **Evidence shape,** read from `validateProfile` in `check-browser-performance-budget.mjs` rather than from the old baseline: per profile, `status: "passed"`, `route`, `viewport` exactly matching the contract, `launch.cold` with `originWasFresh: true`, `loadEventEndMs`, `transferBytes`, `resourceCount`; `launch.warm` with `sameOriginReload: true` and the same three; `frameTiming.samples`, `p95Ms`, `medianFps`, `intervalsOver33_34Ms`; `heap.supported: true`, `warmAfterFramesUsedBytes`, `frameWindowGrowthBytes`; `storage.supported: true`, `originUsageBytes`; for feedback, `interaction.id === "refresh-public-manifest"`, `status: "passed"`, `nextPaintMs`; for photon, `gpuSurfaceProxy.method` equal to the contract's `surfaceProxyMethod` and `minimumSurfaceBytes`. At file level: `schema`, `status: "passed_pre_release"`, `productionMutation: false`, `instrumentSources` with the current bytes and SHA-256 of both instrument files, `gpuProcess` with `method` equal to `gpu.processMethod`, `sharedProcessBoundaryAcknowledged: true`, `samples ≥ 2`, `peakResidentBytes`, `peakGrowthBytes`, and `sourceClosures.<profile>` with `files`, `bytes`, `sha256`, and `paths` beginning with the entrypoint, fingerprinted by `fingerprintSourceClosure` over the sorted unique paths. The probe emits `heap.warmAfterFrames.usedBytes` and `heap.frameWindowGrowthBytes`; the receipt's `heap.warmAfterFramesUsedBytes` is a rename, not a new measurement.
- **Feedback closure paths:** the fifteen release-gate closure files as listed in `feedback-webapp-release-gate-2026-09-06.json`, with `feedback.html` first, plus the three manifests the runtime fetches: `content/scenes/scenes_index.json`, `content/markdown/markdown_index.json`, `content/graph/scene_graph.json`. Eighteen paths.
- **Instrument note for the receipt:** `BrowserPerformanceProbe.js` was changed on 2026-09-06 (uncommitted) to accept the page's current "Diagnostic details ready" wording alongside "Manifest ready"; the instrument followed the page, not the reverse. Record the current `instrumentSources` hashes from disk.
- **Also to change with the capture:** `tests/browser-performance-budget.test.js` line 11 pins `EVIDENCE_PATH` to the 2026-09-01 file and must move to the new one; the contract's `evidencePath` likewise.
- **Manual fallback that was prepared but not run:** two dev servers on fresh ports (`PORT=<fresh> EOM_BORG_SHADOW=0 node scripts/dev/start-local-dev.mjs`), DevTools responsive mode at exactly 1440×900 and 3840×2160 with DPR 1, the probe URL per profile, `copy(document.querySelector('#probe-result').textContent)` from the console once the tab title reads `COMPLETE`, and `ps -axo pid,rss,command | grep -E "Helper \(GPU\)|type=gpu-process"` before and during the photon run for the GPU envelope (`rss` is in KiB on macOS).

- **Evidence / blocker:** The byte counts, file counts, import chain, and capability defaults are `measured` by direct reading of the named source files and by `wc -c` on 2026-09-05. The receipt requirements are `measured` by reading the two checker scripts. That the expanded closure is intended is `measured` by operator statement on 2026-09-05, superseding the earlier inference that it was a regression. That the raised size ceiling is appropriate is `guessed`: 81,920 is a round value above the current measurement, not a figure derived from a transfer or latency requirement. Every figure in the 2026-09-06 receipt is `measured` by the instrument the receipt names beside it; the copy interaction is `measured` by operator statement. Every figure in the 2026-09-06 performance baseline is `measured` by the probe in the operator's Chrome or by `ps`, as the receipt records beside each value. No blocker remains. Falsifier: either checker failing at the current head, or a recorded measurement that cannot be traced to the two probe outputs and two `ps` lines kept at capture time.
- **Completion:** Met on 2026-09-06. `resourceClosure` lists the decided fifteen resources; `maxUncompressedBytes` (81,920) and `resourceCount` (20) carry decided values above the measured closure; both evidence receipts are re-captured against the current sources with their own dates; and both checks pass without any recorded measurement having been hand-edited.

#### Performance baseline captured and row closed, 2026-09-06

The performance half is done and the row is closed. [`browser-performance-baseline-2026-09-06.json`](evidence/browser-performance-baseline-2026-09-06.json) was built from two probe runs in the operator's Chrome 152 and two `ps` samples, the contract's `evidencePath` points at it, and the 2026-09-01 baseline stays in place as history. `node scripts/check-browser-performance-budget.mjs` passes for both profiles; `node --test tests/browser-performance-budget.test.js` passes 4 of 4 with its evidence pin moved to the new file; and `node scripts/check-content-integrity.mjs` now passes its first ten steps, including step seven, the browser performance budget, and halts at step eleven, the owned-compute stop-hook test, on a sandbox `EPERM: unlink` under `.local-data/` that OPS-018's sweep note already records as an artifact of the Linux sandbox rather than of the repository. What lies beyond step eleven in this sandbox is not established; a run on the operator's Mac is the way to see it.

How the capture was made, because the route matters for the next one. Claude in Chrome would not pair from a Cowork session, and the Codex in-app browser can set viewport width and height but not device pixel ratio, so on a Retina display it reports DPR 2 and the checker rejects the run. The working surface was the operator's own Chrome with the DevTools device toolbar in Responsive mode, device type set to Desktop (the default, Mobile, swaps in an Android user agent), and the device pixel ratio control added and set to 1. Each profile ran on a loopback port that Chrome had never opened, and three earlier runs were discarded for exactly the reasons the checker exists: one at DPR 2, one on a reused port whose "cold" resources were all 304 validations, and one whose toolbar had lost its dimensions and measured the whole 3653×1965 window.

Measured, feedback at 1440×900: cold load 61.1 ms, warm 60.6 ms; cold transfer 882,355 bytes, warm 812,473; 17 resources both ways; 240 frames, p95 17.1 ms, 59.88 median FPS, 0 over 33.34 ms; refresh-to-next-paint 32.0 ms; warm heap 12,166,799 bytes, frame-window growth 82,320; origin storage 0. Photon at 3840×2160 with 300 frames: cold 430.2 ms, warm 388.4; cold transfer 4,571,927, warm 10,800; 37 resources; p95 17.3 ms, 59.88 FPS, 1 interval over 33.34 ms against a budget of 3; warm heap 40,220,575 with a frame-window change of −14,133,770 (a collection during the window); canvas-surface lower bound 28,888,248 over three canvases; storage 0. GPU process (Chrome's, pid 44833): 144,654,336 bytes before, 155,877,376 during, growth 11,223,040. Two cross-checks tie the browser to the fingerprint: the eighteen feedback closure files on disk sum to 876,955 bytes and the probe's cold `encodedBytes` is 876,955; photon's 38 files sum to 4,560,527 and its cold `encodedBytes` is 4,560,527.

Two contract changes beyond `evidencePath`. `resourceCount` for the feedback profile is 20, the operator's decision, with the rationale inline. `gpu.processMethod` was reworded from "the identified Codex GPU process" to "the measuring browser's identified GPU process", with a note, because the checker requires the receipt's method string to equal the contract's verbatim and the process measured today was Chrome's; the budgets are unchanged. The receipt's `measurementBoundary` states that the instrument was updated to the page's ready wording and not the reverse, and that the active GPU sample was taken on a second foreground load of `/photon.html` on the same origin, viewport, and DPR immediately after the recorded run, because the run completed before the sample could be taken.

#### Capability default, settled 2026-09-05

The operator confirmed that the default-on capabilities are wanted: every standalone page should present the same control strip, and a page asking for one button receiving the full strip is the intended behavior rather than a defect. The opt-out design in `normalizeCapability` stays as it is.

To stop this being rediscovered and re-raised, [`StandaloneAppNavigationRuntime.js`](../../../src/apps/navigator/StandaloneAppNavigationRuntime.js) now documents the choice at the definition: the strip is deliberately opt-out so navigation is uniform across pages, a page suppresses a capability by passing `false` and should justify doing so, and the resulting load-time closure is an expected consequence rather than accidental growth. That note also records the correct response when a release profile disagrees with the measured closure, which is to re-accept the profile rather than strip the navigation. No behavior changed.

### OPS-020 — Release gate profile coverage

- **Status:** Queued
- **Priority object:** `release_gate_profile_coverage`
- **Request / acceptance:** Decide which standalone pages warrant an accepted release profile, and record the reason for every page that does not get one. Acceptance requires a per-page verdict with its reason, not a blanket rule, and any page selected for a profile to receive one with a captured receipt rather than a declared closure alone.
- **Origin:** Raised 2026-09-06 while investigating why the content-integrity suite halts, and separated from [OPS-017](#ops-017--feedback-app-resource-closure-adjudication) because that task is about one page's stale receipt while this is about which pages are watched at all.

Fourteen applications call `createStandaloneAppNavigationRuntime` and therefore carry the shared control strip and the scene-search stack in their load-time closure: borg, borg library, braid search, causal delay feedback, equation mapping, feedback, greek letter match, ideal braid, lattice lab, molecule, pdgedit, photon, reference, and topo. `webapp-release-gate.v1.json` declares one profile, `public-feedback`. `browser-performance-budget.v1.json` declares two, `public-feedback-interaction` and `photon-4k-visual`. Grade: measured, on 2026-09-06, by searching `src` for the constructor and by reading both contracts.

Two readings of that ratio are available and they point opposite ways, which is why this is a decision rather than a defect.

The first is that coverage is thin. The condition that made `public-feedback` fail — a page adopting the shared strip, its closure growing by the eleven modules that arrive with it, and its accepted evidence not being refreshed — is a property of adopting the strip, not a property of the feedback page. Thirteen other pages did the same thing and no gate would notice if any of them regressed, because none has a profile to disagree with.

The second is that a gate covering one page in fourteen is already expensive. When its receipt ages, `check-content-integrity.mjs` halts at step six of roughly thirty, so every later check stops running for every agent in the checkout. Multiplying that by fourteen multiplies the halt surface, and each profile needs a manual browser capture to stay current. A profile per page may cost more attention than it protects.

The decision is therefore not how many profiles to add but which pages have a release risk worth a manual capture. A public form that vectors users to GitHub and a 4K visual surface are plausibly different from an internal analysis tool. Recording why a page is unwatched is as much a part of the answer as recording why one is watched, because an unexplained absence is indistinguishable from an oversight and will be rediscovered.

Worth settling alongside it: whether a failing profile should halt the whole integrity suite or report and continue. The present behaviour means one stale receipt hides the result of every check after it, which is how the corpus-count drift went unreported until a run reached past this gate.

A third question, added at operator direction on 2026-09-06 and belonging with the other two because all three are about what the gate covers: whether the PR gate should sweep the full test suite. Today it does not. `pr-validation-receipt.mjs` runs four commands, and the content-integrity aggregate among them invokes eight named test files — the owned-compute stop hook, machine-artifact retention, runtime-asset build, the MCP tunnel deployment, pre-push gate policy, PR branch conformance, PR validation receipt, and the publication boundary. Every other file under `tests/`, roughly 310 of them, runs only when someone invokes `node --test` by hand. A regression in any application runtime test, any corpus contract test, or any of the equation-mapping coverage added this week therefore reaches `main` unchallenged. Grade: measured on 2026-09-06 by reading `.githooks/pre-commit`, `.githooks/pre-push`, `scripts/pr-validation-receipt.mjs`, and the step list in `scripts/check-content-integrity.mjs`. The cost of the alternative is real and should be measured before deciding: a full sweep on every commit and push, in a checkout where the operator runs many agents concurrently, may be slow enough to be bypassed. The middle options — a full sweep on push but not commit, or a changed-files-to-tests routing — are worth pricing against the two extremes.

#### Proposal, 2026-09-06 — awaiting operator decision

This section is a recommendation put to the operator. Nothing in it is accepted, and no contract, checker, or runner was changed in producing it.

**Position re-measured.** The fourteen callers, one release profile, and two performance profiles stand as recorded above. Grade: measured on 2026-09-06 by `grep -rl createStandaloneAppNavigationRuntime src` (fifteen files, one of which is the runtime's own definition) and by reading both contract files. Both checkers still fail at the points OPS-017 records, `evidence source closure mismatch` and `source byte count changed`, by running each script. The feedback closure re-walked by a static import walker is fifteen files and 69,535 bytes, 1,080 bytes above the 68,455 recorded on 2026-09-05; the walker was validated by reproducing the profile's fifteen-file closure exactly, and the difference is inferred to be the capability-default note added to `StandaloneAppNavigationRuntime.js` after that measurement. The size gate still passes against 81,920. This is noted for the OPS-017 capture and needs no action here.

**The property that decides the coverage question.** A release profile binds the byte count and SHA-256 of every member of a page's closure, and under the opt-out strip every one of the fourteen closures contains the same eleven shared modules. A profile per page therefore does not buy fourteen independent watches; it buys fourteen receipts that all expire at once whenever any shared module changes, each needing its own manual browser capture. Those modules changed in five commits on four distinct days in the thirty days to 2026-09-06 (`git log --since=2026-08-06` over the eight shared paths). Under fourteen profiles that month would have demanded roughly fifty-six captures. Grade: measured for the commit count and the binding rule (read from `check-webapp-release-gate.mjs` and OPS-017); the capture arithmetic is inferred from it.

The same property answers the "thirteen pages could drift the same way" worry. Drift of the shared strip is a single event, and the existing `public-feedback` profile already binds all eleven strip modules, so any strip change fails that one profile and is thereby noticed for every page that carries it. What one profile cannot see is a page-specific closure change on another page, and that is the risk the per-page verdicts below weigh.

**Question 1 — halt or continue.** Recommendation: run every check, print a failure summary, and exit non-zero at the end if any check failed, with one exception: step one, `prepare-runtime-assets.mjs --write`, is a precondition the later checks consume, and a failure there should still halt because everything after it would report cascade noise rather than findings. Reasoning. Four consumers call the runner — `pr-validation-receipt.mjs` (behind both git hooks), `content-integrity.yml`, `pages.yml` before the static build, and `manage-secure-mcp-tunnel.mjs` — and each reads only the exit status (grade: measured by `grep -rn check-content-integrity` and reading the four call sites). A non-zero final exit therefore gates exactly as a halt does at every one of them; the halt-argument that "a release gate is meant to stop a release" is fully preserved, because stopping is a property of the exit code, not of when the process dies. What halting adds is only shorter wall time on a failing run, and what it costs is documented: two real defects were invisible behind one stale receipt. The counter-risk of continuing is that an early failure can cause later checks to fail for derived reasons; the summary should list failures in run order so the first is read as the probable root. Implementation note for whoever is authorized: eight tests pin the runner's text by regular expression (`webapp-release-gate`, `browser-performance-budget`, `deployment-budget`, both `potential-*-contract`, `pr-branch-process-conformance`, `runtime-asset-build`, `owned-compute-launch-policy`), all on check names and script paths rather than on control flow, and the startup router fingerprints the file at 175 lines, so the edit produces expected router drift for the PR process.

**Question 2 — which pages get a profile.** Recommendation: keep exactly the present three profiles and add none. Every page's verdict and reason follows; a page is "public" if the static build includes it and "listed" if `content/scenes/archie/applications.json` links it. Closure sizes come from the same validated import walker, are `measured`, and count load-time source bytes only.

| Page | Public | Listed | Closure | Verdict | Reason |
| --- | --- | --- | ---: | --- | --- |
| feedback | yes | via Archie → User Interface | 15 files, 69,535 B | Watched: release + performance (existing) | The only public form and the only page under a privacy policy contract (`feedback-intake-policy.v1`); it vectors readers to GitHub and its accessibility floors are contractual. A regression here is a policy breach, not a UX defect. Its receipt also binds all eleven strip modules and so serves as the strip-drift canary for the other thirteen. |
| photon | yes | yes | 36 files, 4,517,815 B | Watched: performance only (existing `photon-4k-visual`) | Decision 3 in the operations tracker sets 4K UHD as the visual target, and the frame, heap, transfer, and GPU-surface budgets are the instrument that protects it. The release gate's categories — form interactions, accessibility floors, isolated preview — address a risk class this page does not carry; adding one would add a second receipt that expires with every strip edit for no new coverage. |
| reference | no | no | 18 files, 4,046,192 B | Unwatched | Deployment-excluded by `INTERNAL_DEVELOPER_HARNESS_PATHS` in `build-static-site.mjs`; it is never released, so a release gate has no referent. Revisit only if the exclusion is lifted. |
| pdgedit | yes | no | 26 files, 241,380 B | Unwatched | Its workstream is `deferred` (`reference/priorities/dormant-deferred/pdg/priorities.md`), no scene, index, or corpus document links the route (zero hits outside tests and its own priority records), and its contracts are covered by `tests/pdgedit-contracts.test.js`. Trigger to revisit: reactivation of the PDG lane. |
| borg-library | yes | no | 25 files, 1,455,079 B | Unwatched | Reached only through Borg selection navigation (`BorgSelectionNavigation.mjs`) and documented for the local development server; an evidence and record catalogue for operators, not a reader entry point. Its correctness is owned by the app-borg contract tests. Trigger: listing in the applications scene. |
| braid-search | yes | no | 19 files, 212,307 B | Unwatched | Same route class as borg-library: reached from Borg, not from the applications scene; a search tool over campaign records owned by the braid-program lane. Trigger: listing in the applications scene. |
| borg | yes | yes | 77 files, 2,515,026 B | Unwatched | The largest public app, but a source-SHA receipt is the wrong instrument for a 77-file surface under active development: every Borg change would expire it. Its release risks are already gated elsewhere — the deployment budget measured its 4K first-screen profile (OPS-001), its registry byte identities are verified at step two of the integrity suite, and its runtime is covered by foundational-impact contracts. Trigger: a public regression on Pages that those instruments missed. |
| ideal-braid | yes | yes | 35 files, 5,597,149 B | Unwatched | The largest closure of the fourteen, but an interactive visual analysis tool with no form, no intake, and no privacy surface; a failure is visible in the tool itself and is owned by `tests/ideal-braid-runtime.test.js` under the foundational-impact contracts. Strip drift is caught by the feedback canary. Trigger: a decided 4K visual target for this page, which would call for a performance profile, not a release profile. |
| lattice-lab | yes | yes | 26 files, 1,876,163 B | Unwatched | Same class as ideal-braid: interactive analysis, no intake, page-level tests own its behaviour. Same trigger. |
| molecule | yes | yes | 20 files, 1,455,754 B | Unwatched | Same class; additionally serves as the feedback profile's `expectedSanitizedPath` fixture, so its route is exercised by the feedback receipt. Same trigger. |
| topo | yes | yes | 26 files, 683,081 B | Unwatched | Same class; interaction contract runtime with its own tests. Same trigger. |
| causal-delay-feedback | yes | yes | 34 files, 776,176 B | Unwatched | Same class; a teaching simulation, reviewed in code on 2026-07-24 with its own fix list. Same trigger. |
| greek-letter-match | yes | yes | 15 files, 115,430 B | Unwatched | A small game; cheapest page to watch but with no distinct risk to justify a receipt that would expire with every strip edit. Same trigger. |
| equation-mapping | yes | yes | 23 files, 554,423 B | Unwatched, with a note | The page with by far the most inbound corpus links (153 files reference `equation-mapping.html`, by `grep -rl` over `content/` and `src/apps/navigator`), so a broken viewer would degrade many reader pages at once. That risk is already gated at step fourteen of the integrity suite by `build-equation-mapping-corpus.mjs --check` and by `validate-equation-mapping-links.mjs`, which is why no release profile is recommended. If the operator ever wants a second release profile, this is the one page with a real argument. |

The blanket rule the table replaces would have read "watch public pages"; the reason it is wrong is that public exposure is not the release risk here. The risks a release profile actually detects are unreviewed closure growth, a broken required interaction, an accessibility floor breached, and a route missing from the isolated build. Only the feedback page carries obligations of that shape. The other pages' risk is that an analysis or visualization is wrong or slow, which their own tests, the deployment budget, and the performance profiles address, and for which a source-SHA receipt would fire on every ordinary edit.

Falsifiers. The coverage recommendation is overturned if a strip change ever reaches Pages without failing the `public-feedback` profile — that would mean the canary does not bind what this section says it binds, and the checker should be re-read. The halt recommendation is overturned if any of the four consumers is found to read the runner's output rather than its exit status, since then report-and-continue would weaken a gate. The per-page reasons are overturned individually by their named triggers.

Optional follow-up, out of scope for this decision: binding the eleven shared strip modules once, in a shared evidence receipt referenced by profiles, would remove the "every strip edit expires every receipt" cost and change the economics of the coverage question. It is a checker design change and belongs in its own queue item if the operator wants it.

#### Operator decisions, 2026-09-06

Question 1 is accepted as recommended: the integrity runner is to run every check, summarize failures in run order, and exit non-zero at the end, halting early only when step one fails. The runner change is now accepted executable work under [OPS-021](#ops-021--content-integrity-runner-report-and-continue). Question 2 is accepted as recommended: no new release profile; the per-page verdicts and reasons in the table above are the record. Question 3 remains open and is priced below.

#### Question 3 — should the PR gate sweep the full test suite

**What the gate reaches today.** `pr-validation-receipt.mjs` runs four commands. Within them, the content-integrity aggregate names eight test files unconditionally, and `check-foundational-impact.mjs --run` routes changed paths through eleven contracts in `scripts/config/foundational-impact-contracts.json` that name nineteen further test files, with no overlap between the two sets. The most a PR gate can reach is therefore 27 of 322 test files (318 `.test.js` and 4 `.test.mjs` under `tests/`, by `find`), and only eight of those run on every validation. The eight take 1.07 s in total; the nineteen take 9.8 s. Grade: measured on 2026-09-06 by reading the receipt script, the aggregate's step list, and the contract manifest, and by timing each file.

**The gap is not hypothetical.** Thirteen tracked, unmodified test files — the `f5-*`, `f6c-*`, and `prescribed-response-pilot-*` families — import `scripts/eom/launch-abc-enclosed-root-pilot.mjs` or `prepare-abc-enclosed-root.mjs`, which commit `897fe1aa7` renamed to `launch-subfield-circular-root-pilot.mjs` and `prepare-subfield-circular-root.mjs` on 2026-09-01. Those thirteen files have failed at module resolution on `main` for five days without any gate noticing, because none of them is among the 27. Grade: measured, by `grep -l` over `tests/*.js`, `git show --name-status 897fe1aa7`, and `git ls-files`. One more of the same class: `solver-gpu-harness-static.test.js` reads `reference/priorities/app-solver/gpu-feasibility-harness.md`, last touched by `4ea188081` and no longer present. These are routed, not fixed, here; they belong to the lanes that own the tests.

**The cost of a full sweep, measured.** Every one of the 322 files was run individually on 2026-09-06 in a four-core Linux sandbox without the shared Python venv, each under a 100 s cap, and its wall time recorded. The operator's machine is faster and has the venv, so treat every figure as an upper bound on that machine and a lower bound on nothing.

| Quantity | Value |
| --- | ---: |
| Files | 322 |
| Sum of per-file wall times | 668 s |
| Median per file | 68 ms |
| Files under 1 s | 284 |
| Files over 5 s | 19, together 580 s |
| Ten slowest files | 506 s, 75.7% of the total |
| Estimated wall at 3 workers (`node --test` default on 4 cores), longest-processing-time packing | 223 s |
| Same, excluding the ten slowest | 54 s over 312 files |
| Same, excluding the twenty slowest | 28 s over 302 files |
| Files red in this sandbox | 58 of 322 |

The ten slowest are two `eq21-*` transfer residuals that hit the 100 s cap, `coincident-axis-three-binary-streaming-reductions` at 84 s, `runtime-asset-fresh-checkout` at 73 s, `prescribed-braid-record` at 43 s, `archie-service-full-corpus-source-index` at 33 s, `eq21-shear-rsd-transfer-child-residual` at 26 s, `subfield-circular-root-launcher` at 19 s, `topo-sampled-field-contours` at 16 s, and one `coincident-midpoint` ledger at 12 s. Of the 58 red files, at least seven fail only for the missing venv, thirteen for the rename above, and four on digest pins already tracked by OPS-018; the sandbox count is not the Mac count, which OPS-018 will establish. Grade: measured for every figure in the table; the worker-packing estimates are computed from the measured per-file times and are `inferred`, not observed.

**Pricing the four options.**

*Status quo.* 1 s of tests per validation, and a demonstrated five-day blind spot over 295 files.

*Full sweep at commit and push.* About 223 s per validated state on this sandbox, less on the Mac; the receipt already makes a commit followed by a push at the same state cost one run, so "at commit and push" and "at push only" differ only for commits that are never pushed. The real obstacle is not time but colour: a gate that is red on the day it is installed is bypassed, and the suite is red today. A full-sweep gate can only be switched on after OPS-018 and OPS-019 and the rename repair above have produced a green baseline on the Mac.

*Full sweep on push but not commit.* As above, minus commit-only runs. Small saving, same precondition.

*Changed-files-to-tests routing.* This already exists for eleven foundational contracts and costs 9.8 s when fully triggered. Generalizing it to all of `tests/` needs a path-to-test map that does not exist and would be an unvalidated instrument on the day it is written. It also cannot catch the class of failure just measured: the rename in `897fe1aa7` touched `scripts/eom/`, which no contract trigger names, and a map would have had to know in advance that thirteen braid-program tests import from there. Routing is precise about what it knows and blind about what it does not, and the failures a gate exists to catch are the ones nobody mapped.

**Recommendation: split by measured duration, not by guessed relevance.** Add one step to the aggregate that runs every test file except a declared slow list, and run the slow list in `content-integrity.yml` on GitHub where wall time is free to the operator. With the ten slowest files on that list the added step covers 312 files for roughly 54 s per validated state on this sandbox, likely well under a minute on the Mac; with twenty it is 302 files for about 28 s. A file enters the slow list only by a recorded measurement above a declared threshold, so the list cannot become a place to hide a failing test. The gate remains a single exit status, so Question 1's report-and-continue behaviour applies to it unchanged. Precondition, non-negotiable: the swept set must be green on the Mac before the step is made blocking, otherwise it is installed as a reporting step and promoted to blocking when it first passes clean. Falsifiers: if the Mac sweep of the non-slow set exceeds about two minutes, the threshold should move and the split re-priced; if a slow-listed file is the one that catches a regression in CI, the split cost a day of latency, which is the trade accepted here.

**Question 3 decided, 2026-09-06.** The operator accepted the duration split: one aggregate step sweeping every test file outside a declared slow list, the slow list running in `content-integrity.yml`, the step installed as reporting and promoted to blocking on its first clean Mac pass. Implementation is queued as [OPS-022](#ops-022--pr-gate-test-sweep-by-duration-split). The fourteen broken test files identified above were routed the same day to the [braid-program queue](../braid-program/work-queue.md#routed-test-breakage-from-ops-020) (thirteen renamed-import files) and the [app-solver queue](../app-solver/work-queue.md#eom-014--gpu-harness-static-test-reads-a-removed-document) (the GPU harness test).

- **Evidence / blocker:** The fourteen-application count, the one release profile, and the two performance profiles are `measured` on 2026-09-06. That a stale profile halts the suite is `measured`, by observing `check-content-integrity.mjs` stop at its sixth step. The page-by-page assessment is made above and its earlier equivalent-risk guess is withdrawn. The test-sweep costs are `measured` per file in a sandbox and `inferred` for parallel wall time; the Mac figures are not yet measured. All three questions are decided; what remains is the two implementation rows and the receipt capture owned by OPS-017.
- **Completion:** Every standalone page carries a recorded verdict, watched or unwatched, with its reason; any page selected for a profile has one with a captured receipt; the halt-versus-continue behaviour of a failing profile is decided and recorded; and the PR gate's test-suite scope is decided and recorded, with the cost of any widening measured rather than assumed.

### OPS-021 — Content-integrity runner report-and-continue

- **Status:** Queued
- **Priority object:** `content_integrity_runner_report_and_continue`
- **Request / acceptance:** Change `scripts/check-content-integrity.mjs` so that a failing check no longer stops the run: every check executes, failures are summarized in run order at the end, and the process exits non-zero if any failed. Step one, `prepare-runtime-assets.mjs --write`, keeps its early halt because later checks consume its output. Acceptance requires the eight tests that pin the runner's text to still pass unchanged, the four consumers (`pr-validation-receipt.mjs`, `content-integrity.yml`, `pages.yml`, `manage-secure-mcp-tunnel.mjs`) to gate on the exit status exactly as before, and a run with two deliberately failing checks to report both.
- **Origin:** Question 1 of [OPS-020](#ops-020--release-gate-profile-coverage), accepted by the operator on 2026-09-06. The analysis, consumer list, and pinned-test inventory are recorded there and are not restated here.
- **Implemented, 2026-09-06.** `check-content-integrity.mjs` now numbers each check, collects failures, prints them in run order after the loop with the note that the first is the likeliest root, and exits 1 if any gating check failed. Step one carries `halts: true` and still stops the run on failure with its own exit status. A `reporting: true` flag prints a failure under a separate "does not affect exit status" heading and leaves the exit code alone; OPS-022 uses it. Demonstrated on a copy of the runner with a five-check list: two gating failures both listed and exit 1; a halting prerequisite failure stopping at step one with exit 7; a reporting-only failure listed with exit 0. The eight pinning tests were run: 42 of 43 assertions pass, and the one failure (`pr-branch-process-conformance`, children's-book ignore line) is caused by an uncommitted `.gitignore` edit by another agent, not by this change — `HEAD:.gitignore` carries the line and the working tree does not. Grade: measured, by running the demos and the tests on 2026-09-06.
- **Aggregate stepped through, 2026-09-06.** The sandbox cannot hold the whole aggregate in one call, so its 32 gating steps were run one at a time by a driver that reads the runner's own `CHECKS` list, each with the runner's arguments and working directory. Thirty-one passed; step 11, the owned-compute stop-hook test, failed on a sandbox `EPERM` unlinking under `.local-data/owned-compute/`, the same environmental failure OPS-018 recorded. Steps 6 and 7, the release profile and performance budget that opened OPS-020, now pass against the receipts OPS-017 captured. Slowest steps: runtime-asset preparation 30.1 s, machine-artifact retention 18.3 s, content validation 6.7 s, equation-mapping registry 3.3 s; every other step is under a second, so the gating aggregate is about 62 s of work here before the reporting sweep. Grade: measured, per step, on 2026-09-06; the driver runs the same commands the runner does but is not the runner, so the summary block itself is verified only by the five-check demos above. The runner and its consumers were committed on the branch by the concurrent PR runner as `6591e553f` and `f285eb4f4`, the second adding hook-environment isolation to the child spawn.
- **Committed aggregate run end to end, 2026-09-06.** The committed runner (`f285eb4f4`) completed in the sandbox in 133 s: 33 steps, the reporting sweep at 1 m 12.4 s, and the closing summary listing one gating failure — step 11, the sandbox `EPERM` — under "1 of 33 checks failed, in run order", with the sweep's failure listed separately under the reporting-only heading and the process exiting 1. That is the summary block verified on the real list rather than on a demo. Grade: measured on 2026-09-06; the exit and the two headings were read from the captured output. What the sandbox cannot show is a fully green run, which needs the operator's machine.
- **Evidence / blocker:** Nothing blocks acceptance; a green run on the operator's machine would close the row. The router fingerprints the runner, so expected startup-router drift accompanies the edit into the branch/PR process.
- **Completion:** The runner behaves as accepted, the pinned tests pass, and a deliberate two-failure run demonstrates both failures reported and a non-zero exit.

### OPS-022 — PR gate test sweep by duration split

- **Status:** Queued
- **Priority object:** `pr_gate_test_sweep_duration_split`
- **Request / acceptance:** Add one step to `scripts/check-content-integrity.mjs` that runs every `tests/**/*.test.{js,mjs}` file except those on a declared slow list, and add the slow list as its own job or step in `.github/workflows/content-integrity.yml`. The slow list lives in a small config file under `scripts/config/`; a file may be added to it only with a recorded measured duration above a declared threshold, and the threshold is recorded in the same file. The new aggregate step is installed as reporting only, and is promoted to blocking after its first clean pass on the operator's machine. Acceptance requires the step to run the expected file count, the slow list to carry a measurement per entry, the aggregate exit status to be unchanged while the step is reporting, and a recorded Mac wall time for the swept set.
- **Origin:** Question 3 of [OPS-020](#ops-020--release-gate-profile-coverage), decided 2026-09-06. The measured per-file timings, the option pricing, and the fourteen-file breakage that motivated the decision are recorded there. Starting slow list from the sandbox measurement: the two `eq21-*` transfer residuals that hit the cap, `coincident-axis-three-binary-streaming-reductions`, `runtime-asset-fresh-checkout`, `prescribed-braid-record`, `archie-service-full-corpus-source-index`, `eq21-shear-rsd-transfer-child-residual`, `subfield-circular-root-launcher`, `topo-sampled-field-contours`, and `coincident-midpoint-common-frequency-prescribed-structural-root-ledger`; re-measure on the Mac before declaring the list.
- **Implemented as reporting, 2026-09-06.** `scripts/run-test-sweep.mjs` selects every `tests/**/*.test.{js,mjs}` file (312 today) outside the slow list and runs them under one `node --test`; `--slow` selects the slow list (10 files) and `--list` prints a selection without running it. It exits with the `node --test` status, so the caller decides whether it gates. `scripts/config/test-sweep-slow-list.json` carries the threshold (10,000 ms), the gate status (`reporting`, since 2026-09-06, with its promotion condition), the instrument note, and one measured entry per file; the script refuses a slow list whose entry lacks a measurement above the threshold, a date, or an existing file, and refuses a repeated path. The aggregate's final step runs the sweep with `reporting: true`; `content-integrity.yml` runs `--slow` after the gate with `continue-on-error: true`. Promotion means flipping `gateStatus.mode`, removing `reporting: true`, and removing `continue-on-error`, in one change, recorded in the config. Grade: measured, by `--list` in both modes and by the reporting-flag demo under OPS-021.
- **Swept set timed, 2026-09-06.** The 312 files outside the slow list were run in four `node --test` batches of 80 in the sandbox (a single call cannot hold the whole sweep): 7 s, 44 s, 14 s, and 8 s, 73 s in total, against the 54 s packing estimate; batching adds process start-up and loses cross-batch overlap, so the single-run figure lies between the two. Across the batches 2,083 assertions passed and 176 failed, the failures being the sandbox-environmental and routed classes recorded under OPS-020 question 3. Grade: measured on 2026-09-06 in a four-core Linux sandbox without the venv; it bounds the Mac figure from above.
- **Evidence / blocker:** The Mac wall time is still the number to record. Promotion to blocking waits on a green Mac sweep, which depends on OPS-018, OPS-019, and the two routed breakage rows — and the braid-program row has widened: see its update.
- **Completion:** The step runs in the aggregate and the slow list runs in CI; the slow-list config carries per-entry measurements; a Mac wall time is recorded; and the step's blocking or reporting status is recorded with the date it changed.

### OPS-023 — Archie MCP tool-contract fixture drift

- **Status:** Queued
- **Priority object:** `archie_mcp_tool_contract_fixture_drift`
- **Request / acceptance:** Restore agreement between the Archie fixture MCP server's responses and the `mcp-tool-contract/v1` semantics that `tests/archie-service-contracts.test.js` checks. Acceptance requires that test to pass 14 of 14 with the disagreement explained, not with the contract loosened to match whatever the fixtures now emit.
- **Origin:** Routed 2026-09-06 from [OPS-018](#ops-018--layout-pass-digest-pin-attribution), where it had been misclassified as a digest pin because its output mentions `sha256`. It is not one.

Eight fixture requests fail the same way: `request-search-public-001`, `request-read-public-001`, `request-read-missing-001`, `request-topics-public-001`, `request-neighbors-public-001`, `request-read-priority-public-001`, `request-read-priority-operator-001`, and `request-walk-public-001` each report *"response does not match mcp-tool-contract/v1 semantics."* A second assertion in the same file, the local stdio protocol smoke, also fails.

The scripts the test pins are old and unchanged: `scripts/archie-service/build-source-index.mjs` last moved in `f6954f91d` (2026-07-25) and `validate-contracts.mjs` in `404736864` (2026-07-02). The fixtures themselves were last touched in `38ffb1296` (2026-09-03, the private secure-tunnel path, #257). The failure was already present in the 2026-09-05 sweep, before this session changed anything under Archie, so it is pre-existing and most plausibly a semantic drift introduced with or after #257. The Archie lane is under `dormant-deferred/`, which is why this sits here rather than with a lane owner.

Plainly: the pretend MCP server used for testing now answers in a shape the contract checker no longer accepts, for every request it is asked. Someone who knows the contract needs to say which side moved.

- **Evidence / blocker:** The eight request identifiers, the pinned-script commits, the fixture commit, and the prior-failure date are `measured` on 2026-09-06. That #257 introduced the drift is `inferred` from timing alone. Falsifier: the test passing at `38ffb1296`'s parent would place the drift earlier.
- **Completion:** `tests/archie-service-contracts.test.js` passes 14 of 14, and this row records which of the fixture responses or the contract semantics changed and why.

### OPS-014 — Agent guidance surface consolidation

- **Status:** Queued
- **Priority object:** `agent_guidance_surface_consolidation`
- **Request / acceptance:** Inventory every surface on which agent guidance can be placed for both Claude and Codex, identify duplication and conflict across them, and adopt a maintenance approach that keeps them consistent without repeated manual synchronization. Acceptance requires the inventory below to be verified against current client documentation, every conflict resolved by a named precedence rule, and at least one drift class converted from manual upkeep to an executable check.
- **Origin:** Operator observation, 2026-09-03, that explanation density varies between responses without a stated reason. Root cause identified during that session: two live authorities give opposite length instructions, and neither states which wins.

Plainly: guidance about how agents should write and behave is currently scattered across the repository and across two different client applications, some of it duplicated and at least one pair of rules in direct contradiction. This item is about finding all of it, deciding what governs, and making the copies keep themselves in step.

#### Identified conflict

The [operator explanation standard](../../op/operator-explanation-standard.md) states that total response length is not a constraint and that completeness of inline explanation outranks brevity. A client-level brevity setting active in the same sessions instructs the opposite: be as concise as possible and limit explanation. **Resolved.** The standard's Length and precedence section now names that setting and declares that the standard outranks it for work in this checkout, on the grounds that client-side settings are invisible to other agents in the same checkout and carry no repository authority.

A second, subtler defect: one density setting was applied to output registers with genuinely different needs — adjudication packet, explainer of an already-settled result, correction, and short status or closeout. **Resolved.** The standard now carries a four-register table, each register with its own density rule, and states that choosing the register is part of writing the response.

Both defects are now closed in the standard itself. What remains open in this item is the surface inventory and the generated `CLAUDE.md` floor, not the explanation rules.

#### Inventory A — Claude surfaces outside the repository

| Surface | Where it is set | Scope | Current content | Last verified |
| --- | --- | --- | --- | --- |
| Instructions for Claude | Initials, lower left → Settings → Instructions for Claude | Account-wide, every conversation | Architrino project block: layer discipline, no-mass/no-force, causal-delay terms, claim grading, $c_f=1$, no git, `Plainly:`, `Closure goal:`, question format | 2026-09-03 |
| Response style | Style selector in the chat composer; built-in Normal, Concise, Explanatory, Formal, plus custom styles | Per conversation or as a default | `Concise` — the source of the brevity instruction in the conflict above | 2026-09-03 |
| Cowork Global instructions | Settings → Cowork → Global instructions | Every Cowork session | Cleared by the operator on 2026-09-03; previously the pointer `see AGENTS.md` | 2026-09-03 |
| Project instructions | The project itself | Chats inside that project only | Repo description and webapp/Pages context | 2026-09-03 |
| User skills | Settings → Skills | On demand or by trigger | Not currently used for Architrino style | 2026-09-03 |
| Session memory | Written by the agent, persists across conversations | Cowork sessions | Session index plus per-fact files; behavioral guidance appears here incidentally rather than by design | 2026-09-03 |
| Organization instructions | Admin settings, Team and Enterprise plans only | Every member of the organization | Not applicable to this account as far as this session can establish | Unverified |

Claim grade: `measured` by direct reading of the settings surfaces named in the [Claude personalization documentation](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features), except the organization row, which is `inferred` from plan type and must be confirmed by the operator.

#### Inventory B — Codex surfaces

| Surface | Location | Scope | Status in this repo | Last verified |
| --- | --- | --- | --- | --- |
| Global agent instructions | Codex home directory, outside this checkout | Every Codex session for this user | Present or absent unverified by this session | Unverified |
| Repository root `AGENTS.md` | [`AGENTS.md`](../../../AGENTS.md) | Whole checkout | Present and governing | 2026-09-03 |
| Nested `AGENTS.md` | Any subdirectory | Nearest ancestor wins for files under it | None present; the repository deliberately keeps a single root policy | 2026-09-03 |
| Client configuration | Codex home directory | Model, approval mode, sandboxing | Outside repository control | Unverified |
| Repository hooks | [`.codex/hooks.json`](../../../.codex/hooks.json) | Codex lifecycle events in this checkout | Present | 2026-09-03 |
| Saved prompts | Codex home directory | Reusable prompt library | Unverified | Unverified |

Claim grade: `inferred` for every row marked unverified. Confirming this table against current Codex documentation and the operator's actual home-directory contents is an explicit deliverable of this item, not a precondition for opening it.

Plainly: Claude and Codex each read guidance from several places, and only some of those places are files in this repository. Anything set inside a client application is invisible to every other agent working in the same checkout, which is how two agents on the same task end up following different rules.

#### Inventory C — In-repository surfaces

| Surface | Path | Role | Last verified |
| --- | --- | --- | --- |
| Governing policy | [`AGENTS.md`](../../../AGENTS.md) | Sole authored authority | 2026-09-03 |
| Session bootstrap | [`CLAUDE.md`](../../../CLAUDE.md) | Routes to `AGENTS.md`; carries the Claude-only write-permission rule and a generated, fingerprint-gated projection of the pre-read policy floor | 2026-09-03 |
| Generated router | [`agent-startup-orientation.generated.md`](../../op/agent-startup-orientation.generated.md) | Workflow cards, standing rules, prompt index; regenerated and `--check` gated, with source fingerprints | 2026-09-03 |
| Explanation standard | [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) | Sole authority for operator-facing output; audience, plain-by-default explanation, repetition, structure, expected tools, analogy, registers, length precedence, `Open items:`, response mechanics, self-check | 2026-09-03 |
| Operator feedback backlog | [`README-op.md`](../../op/README-op.md) | One-line workflow behaviors under Method, Efficiency, Clarity, Multi-Agent Use, Technical Closure | 2026-09-03 |
| Procedure index | [`brainstorming.md`](../../op/brainstorming.md) | Index for the rest of `reference/op/` | 2026-09-03 |
| Prompt template | [`codex-goal-seeking-prompt-template.md`](../../op/codex-goal-seeking-prompt-template.md) | Communication and reporting procedure | 2026-09-03 |
| Corpus style authorities | `content/markdown/aaa/archie/`: `academic-style-guide.md`, `mathematics-style-guide.md`, `mathematics-terminology.md`, `terminology-usage.md`, `comparative-glossary.md` | Reader-facing corpus prose and notation | 2026-09-03 |
| End-user language | `content/markdown/aaa/archie/`: `ui-guidelines.md`, `navigation-and-controls.md` | App-facing wording | 2026-09-03 |
| Role prompts | `reference/research-office/cto/prompts/` — 14 prompts plus `README.md` | Per-role behavior for research, review, convergence, promotion, adjudication | 2026-09-03 |
| Repository skills | `.agents/skills/` — `aaa-corpus-advancement`, `corpus-review-workflow`, `math-preview`, `research-exploration` | Discovery routers into the live procedures; three carry an `agents/openai.yaml` | 2026-09-03 |

There is exactly one authored `AGENTS.md` and exactly one `CLAUDE.md` in the repository, both at the root. Other copies found under `.tmp/` belong to unrelated vendored checkouts and are not project policy.

Claim grade: `measured` by filesystem enumeration on 2026-09-03. Falsified by a second authored `AGENTS.md` or `CLAUDE.md` outside `.tmp/`.

Plainly: inside the repository the policy story is now one governing file, one bootstrap file with a generated safety projection, and a set of specialised guides beneath them. The remaining seam is outside the repository, where client applications can hold rules that other agents cannot see.

The current response and capture decisions are maintained in [the operations tracker](priorities.md#operator-response-and-discussion-capture). The dated inventory and calibration records below preserve their historical findings; the live operator standard owns current length precedence and response mechanics.

#### Recommended approach

1. **Make the mirror generated rather than hand-maintained.** The floor section of `CLAUDE.md` restates `AGENTS.md` by hand and can drift silently. The repository already solves this exact problem for the startup router with a generator, a `--check` gate, and source fingerprints. Applying the same pattern converts a recurring manual synchronization chore into a failing check. This is the single largest reduction in maintainer burden available here.
2. **Keep client-side settings free of behavior.** Anything behavioral placed in Instructions for Claude, a response style, or Global instructions is invisible to Codex and to every other agent in the checkout. Client settings should carry at most a pointer. The operator's clearing of Global instructions on 2026-09-03 is consistent with this and should be extended to the remaining behavioral content once the repository can carry it.
3. **Name the output registers.** Extend `operator-explanation-standard.md` with a register table — adjudication, explainer, erratum, status — each with its own cadence and length rule, replacing the current single setting.
4. **State precedence explicitly.** `operator-explanation-standard.md` should declare that it governs response length and explanation density for work in this repository and outranks any client-level brevity or verbosity setting, naming that setting so the conflict is discoverable rather than latent.
5. **Calibrate by blind comparison rather than assertion.** Fix a set of source passages, render each under two candidate register profiles, present them unlabelled, and record the operator's choice and stated reason. Labelled comparison biases the choice toward the profile the operator believes they ought to prefer.
6. **Keep one inventory with verification dates.** Inventories A, B, and C above become a single maintained document with an owner and a last-verified date per row, so a future session checks one place rather than rediscovering the surface list.

Plainly: stop copying policy by hand and let a generator do it; keep behavior rules in the repository where every agent can see them; give short updates and long proofs different rules instead of one; write down which rule wins when two disagree; pick the settings by blind test rather than by argument; and keep one list of where everything lives.

- **Progress, 2026-09-03:** Recommendations 1, 3, and 4 are complete, and recommendation 6 has its durable per-row verification-date structure. [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) was rewritten to replace the AP-STEM audience model with an expert-in-theory, non-specialist-in-imported-framework model; to retire the inline `Plainly:` tag in favor of plain-by-default interleaved explanation; to require mechanism as well as significance; to treat repetition as a cost worth paying only when it buys clarity; to add structure and expected-tool rules; to add the four-register table; and to declare precedence over client-level brevity settings by name. The `CLAUDE.md` pre-read floor is now generated by `scripts/build-claude-bootstrap-floor.mjs`, fingerprinted against `AGENTS.md`, the explanation standard, and the academic style guide, and checked by the full content-integrity runner. Its authored bootstrap route now carries the same readable-checkout and unavailable-checkout branches as `AGENTS.md`. Recommendation 2 is partly complete: the operator cleared Cowork Global instructions on 2026-09-03, and the account-level `Concise` response style is now explicitly overridden by the standard rather than silently conflicting with it. Duplicated style guidance was reduced to pointers in `AGENTS.md`, `CLAUDE.md`, `codex-goal-seeking-prompt-template.md`, `adjudication.md`, and the `start-research.md` report template.
- **Calibration rounds, 2026-09-03.** Recommendation 5 was run as two labelled rounds rather than the blind protocol it specifies, because the operator was refining the standard rather than being tested against it and needed to comment on the varied dimension directly. Round 1 held one technical unit fixed — the $D_{t,ij}$ against $D_{r,ij}$ asymmetry in `dynamics/master-equation.md` — and varied analogy-carried against map-abstraction-carried explanation. Both were rejected: the extended analogy lost the reader partway, and the abstraction-carried version was judged less explanatory. Round 2 varied continuous prose against a verdict-first case split over the same unit. Continuous prose won, described as readable straight through. Three preferences were stated and are now written into the standard: define terms more, accepting redundancy from section to section; carry mechanism in configuration and symbol rather than in analogy; and deliver visualization, logic, definitions, and words before the equation. Claim grade: `measured` by direct operator response, on one technical unit across two rounds. Falsified by a third round on different source material reversing any of the three preferences. The result is not blind and is not evidence about which profile the operator would choose without knowing the axis.
- **Evidence / blocker:** Inventory C and the repository-visible rows of Inventory B were verified directly on 2026-09-03. Inventory A retains its earlier direct-reading dates, with organization instructions unverified. The remaining completion blocker is the Codex client and home-directory portion of Inventory B; its rows are now explicitly marked `Unverified` rather than inheriting a date from nearby measurements. The generator check detects a changed source fingerprint or an edited projection, but regeneration still requires review of whether the compact floor accurately reflects the changed authorities; the fingerprint is a drift alarm, not a semantic proof.
- **Completion:** The surface inventory is verified for both clients and carries per-row verification dates; the length-and-density conflict is resolved by a stated precedence rule in `operator-explanation-standard.md`; the output registers are named with distinct density rules; the `CLAUDE.md` floor is generated and `--check` gated against `AGENTS.md`; and at least one calibration round has been run with its outcome recorded, with any round that was not blind labelled as such.

### OPS-015 — Moved to the corpus rewrite lane

- **Status:** Moved, 2026-09-03
- **Priority object:** `plainly_convention_document_migration`, retired here and reformulated as `retired_tag_retirement`
- **Now owned by:** [CRW-004 — Retired plain-language tag retirement](../aaa-corpus-rewrite/work-queue.md#crw-004--retired-plain-language-tag-retirement)

This item held the migration away from the retired inline `Plainly:` tag while that looked like a standalone cleanup with its own operator gate. It stopped being one. Edition 1.0 of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) forbids the tag, and done criterion 12 of the corpus rewrite lane states that rule in executable form, so the bulk of the removal is now a by-product of conversions that lane is already running rather than work anyone schedules separately.

Both of this item's blockers are discharged, and the record of that lives in CRW-004 rather than being restated here: the operator opened the corpus-wide rewrite, which was the readiness gate, and edition 1.0 settled the canon question of whether the reader-facing style authority should say anything about the tag.

The measured census, the finding that the tag leaked into reader-facing prose without any reader-facing authority ever prescribing it, the tiering by reader visibility, and the discharged search-index dependency all moved with the item. Nothing was dropped in the move. The residual pass over the startup-path files in `reference/op`, `reference/research-office/cto/prompts`, and `.agents/skills` went there too, even though those are operations surfaces rather than corpus, because splitting one retirement across two queues would leave neither queue able to say when it is finished.

### OPS-016 — Reference equation-mapping surface

- **Status:** Queued
- **Priority object:** `reference_equation_mapping_surface`
- **Request / acceptance:** Give operator-facing documents under `reference/` the same symbol-definition viewer the corpus already has, so a document carrying display equations can be read with every symbol resolvable on demand rather than only from the prose around it. Acceptance requires a second registry that builds and validates alongside the corpus registry, with any source changes governed by a declared write mode and explicit target set, and without creating links from `content/markdown/aaa` into `reference/`.
- **Origin:** Operator request, 2026-09-03, during calibration of the [operator explanation standard](../../op/operator-explanation-standard.md): the corpus has a view-equation mode showing every symbol's definition, and operator-facing documents do not.

#### Source-write policy, 2026-09-03

The reference builder follows the write authority of the executing queue item. An authorized item may update explicitly scoped reference sources; other runs remain check-only. Corpus behavior is unchanged: `[View →]` chips continue to be injected into `content/markdown/aaa`. Policy and procedure files under `reference/` are read as plain markdown in a terminal at least as often as in a browser, so any injected reference-surface markers must be explicitly accepted and validated rather than added as an incidental generator side effect.

#### Current implementation, read 2026-09-03

[`scripts/build-equation-mapping-corpus.mjs`](../../../scripts/build-equation-mapping-corpus.mjs) is 763 lines. It scans one root, `CORPUS_ROOT = "content/markdown/aaa"` at line 14, extracts every symbol from each TeX block, searches surrounding lines for a definition using a cue pattern, and falls back to a shared dictionary of standard symbols. It emits `content/generated/equation-mapping/corpus-equations.json` under schema `equation-mapping-corpus-registry.v1`, declared in [`scripts/config/generated-runtime-assets.json`](../../../scripts/config/generated-runtime-assets.json) as id `equation-corpus` and therefore a reproducible ignored output. The viewer page is `equation-mapping.html`. At line 708 the builder writes back into source markdown, which is how the chips are injected. [`scripts/check-content-integrity.mjs`](../../../scripts/check-content-integrity.mjs) line 65 runs it with `--check`, and [`scripts/validate-equation-mapping-links.mjs`](../../../scripts/validate-equation-mapping-links.mjs), 74 lines, verifies registered links resolve.

#### Work items

1. Parameterize the scan root into a set of roots, each with its own registry path, viewer route, and write policy. Not a one-line change: the root constant is also used at line 515 to derive a document's area from the path segment following it.
2. Add a second registry output for `reference/`, with its own `generated-runtime-assets.json` entry so it builds and stays untracked.
3. Supply a navigation fallback. Reference documents have no entry in `content/graph/scene_graph.json` or `content/graph/textbook_toc.json`, which the builder joins against for back-links.
4. Parameterize the line-708 write path by target policy so an authorized reference action can update only its explicitly scoped sources while ordinary reference builds remain check-only.
5. Keep the two registries separate rather than merged. A merged surface would place reference targets inside corpus pages and can manufacture the `content/markdown/aaa` → `reference/priorities` links AGENTS.md forbids.
6. Teach the integrity gate and the link validator about the second surface.

- **Evidence / blocker:** The implementation facts above are `measured` by direct reading of the named files and line numbers. Not established: whether the viewer can resolve symbols for a document that carries no injected chips, or whether the line-708 write path can be constrained to an explicit reference target set; work item 4 must establish both modes in `src/apps/equation-mapping/`. No blocker beyond that.
- **Completion:** A reference registry builds, validates, and is `--check` gated; reference documents render with resolvable symbols; any reference-source update requires declared write mode, an explicit target set, and validation; and no link from `content/markdown/aaa` into `reference/` is created.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
