# Agent 2 — Hash-Pin Repair Campaign Incident Report

Retrospective report prepared from one conversation ("Agent 2") for an independent review of the Architrino development and validation process. Written 2026-09-06. This report was produced without editing any other repository file, running tests, refreshing pins, or performing Git or GitHub mutations. Everything below is drawn from the conversation's own history and the tool outputs returned in it; where a statement rests on a summary or a remembered claim rather than on retained tool output, it is labelled as such.

## 1. Scope and coverage

**Identifying topic.** Verification of a Codex run on OPS-018 (layout-pass digest-pin attribution, Python residual), which expanded into a repository-wide frozen-hash ("pin") repair and triage campaign. Operator: Marko (J Mark Morris). Repository: `/Users/markmorris/vibe/architrino`, branch `codex/sapphire`.

**Dates.** All work occurred on 2026-09-06 (host clock; commit timestamps observed from 16:14 to 18:05 −0400 and later).

**Original objective (operator's first message).** Independently verify, using Git and the repository only (no Python), a Codex run that was to append a "Python suite on the operator's machine, 2026-09-06" section to the OPS-018 row, re-derive every verdict in its table with `git log --format='%h %ad' --date=short -1 -- <pinned input>` against the campaign commit set `513eea319 51ee4b84f 293b3d987 965c1a3b4`, check two misclassification modes, check closure mechanics, and end with one of three fixed verdict lines.

**How the work expanded**, in order of operator instruction: (a) hash-walk the one disputed pin; (b) rule attribution by first mismatch, close OPS-018, route the pin refresh to braid-program; (c) execute the enclosure-contract pin refresh; (d) refresh eight sibling evidence pins; (e) refresh two blob-verified pins and one test pin, which exposed three more; (f) read the "f5test" session transcript and take over its open items (a test-contract change and the H3 dispatcher pin); (g) refresh the dispatcher pin and four Python-side pins, run the content-integrity check in the sandbox, add a README-op line; (h) read the "FSC" session transcript and import its open items (a style-ledger correction, a queued reproducibility row); (i) inventory "all the corruption" and repair what was mechanical; (j) write a prompt for a branch/PR run; (k) a post-mortem; (l) this report.

**What can be inspected.** The full conversation from the first operator message to this request is present in context, including every tool call and its returned output. No compaction or truncation notice was received. Limitations: many tool outputs were deliberately shortened by the agent's own `head`, `tail`, `cut`, and `grep` filters before they reached the conversation, so the retained excerpts are partial views of larger outputs; full outputs of the content-integrity run and test runs were written to `/tmp/ops/*.txt` inside the Linux sandbox, which is ephemeral and not part of the repository. The Codex run itself is known only from the operator's pasted summary and from the section Codex wrote into `work-queue.md`; the Codex transcript was not available. Two other sessions ("f5test", "FSC") were read through the session-transcript tool; only the last 60 and 40 messages respectively were requested, and the tool rendered earlier tool calls as one-line stubs without their outputs.

**Environments.** Two, and the distinction matters throughout. (1) The agent's Linux sandbox, in which the checkout is mounted at `/sessions/eloquent-busy-noether/mnt/vibe/architrino`; Node `v22.23.2` was observed in an error trace; the shared macOS venv at `../.venv` is present as a directory but its interpreter cannot execute there (every Python-dependent test reports `ENOENT` on `/sessions/eloquent-busy-noether/mnt/vibe/.venv/bin/python`); Git inspection works; some `unlink` operations under `.local-data/` fail with `EPERM`. (2) The operator's Mac (`Darwin 25.6.0` per the session environment block), Homebrew Python 3.13.2 under `/opt/homebrew/Cellar/python@3.13/3.13.2`, venv at `/Users/markmorris/vibe/.venv`, where the operator ran Python tests and pasted results. Branch `codex/sapphire`; HEAD moved from `a7609931e` at the start to `36d34a262` at the end, every intermediate commit being made by a concurrent PR-runner agent, not by this conversation.

## 2. Failure inventory

Identifiers are local to this report. "Observed" means the excerpt is copied from tool output or an operator paste in this conversation; "proposed cause" is the agent's inference.

### F01 — Codex left OPS-018 open with a self-contradicting verdict table

- **Effect.** The row could not be closed; verification was required.
- **Operation.** Codex's run (not observed directly). Its written section `#### Python suite on the operator's machine, 2026-09-06` was read from `reference/priorities/aaa-operations/work-queue.md` lines 87–131.
- **Evidence (observed, from the file).** Row `test_eom_continuous_reception_roots.py` … `Prior trace: 0fb575921 or 897fe1aa7 (see note) | pre-existing`; rows for `test_f6c_cached_continuous_reception_root_cover.py` and `test_f6c_retained_history_guards.py` on the same pinned file … `51ee4b84f 2026-09-05 | layout pass`. Line 131: "That live attribution … conflicts with the carried-forward `pre-existing` verdict".
- **Evidence (operator paste, summary).** "Recorded 13 failing of 74 … OPS-018 remains open. Two failures pin an enclosure contract whose `git log -1` returns `51ee4b84f`."
- **Environment.** Operator's Mac under the venv (per Codex's own section: `sys.executable = /Users/markmorris/vibe/.venv/bin/python`). Not independently observed.
- **Proposed cause.** The operator's last-commit rule labels the most recent commit that touched the file; the layout pass touched almost every file. Codex applied the rule literally to two rows and carried forward a prior verdict for the third.
- **Response.** Re-derived all 13 rows (see F02); hash-walked the disputed file (§3, pin P1); operator ruled attribution follows first mismatch.
- **Outcome.** Resolved by ruling and record; the table rows were corrected in place with their prior labels noted.

### F02 — Re-derivation disagreed with one Codex verdict and found four unmeasured commit cells

- **Operation (observed).** `git log --format='%h %ad' --date=short -1 -- <path>` at HEAD `a7609931e` for nine pinned paths plus `scripts/eom/oracle/f5_api_domain_conformance.py`.
- **Excerpt (observed).** `reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md => 51ee4b84f 2026-09-05`; four other paths `=> 897fe1aa7 2026-09-01`; `tests/test_f6c_single_leaf_diagnostic.py => baa3e7323 2026-09-06`; `content/markdown/aaa/dynamics/master-equation.md => c973402b9 2026-09-05`.
- **Result.** 8 of 13 confirmed exactly; 4 confirmed on verdict only (Codex wrote a disjunction, not a measurement); 1 disagreement (`test_eom_continuous_reception_roots.py`: Codex pre-existing, re-derivation layout pass under the literal rule). Verdict line issued: `DISPUTED … 1 verdict(s) disagree`.
- **Outcome.** Superseded by the first-mismatch hash walk (P1), under which all three enclosure-contract rows read pre-existing.

### F03 — Operator's first Python invocation failed on working directory

- **Operation (operator paste, observed).** `python -m unittest discover -s tests -p test_eom_continuous_reception_roots.py` from `~/vibe`.
- **Excerpt.** `ImportError: Start directory is not importable: 'tests'`; traceback paths under `/opt/homebrew/Cellar/python@3.13/3.13.2/...`.
- **Proposed cause.** `tests/` lives under `architrino/`, not `~/vibe`; the interpreter path in the trace is the Homebrew interpreter that the venv links to, which is consistent with the venv being active (later confirmed: `VIRTUAL_ENV=/Users/markmorris/vibe/.venv`, `which python` → the venv path).
- **Response.** Re-issued the command from `~/vibe/architrino`.
- **Outcome.** Resolved; subsequent runs executed.

### F04 — After the first refresh, Node pilot tests still failed on a different evidence pin

- **Operation (observed).** `node --test tests/f6c-cached-root-cover-pilot-launcher.test.js` in the sandbox after the enclosure-contract cascade.
- **Excerpt (observed).** `not ok 2 - all frozen hashes and comparison schema match disk …`; `+ '1a6327933b0060905aec97022e87c243b54f353af8c7aec83712967b285b010d'` / `- '36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4'`.
- **Follow-up scan (observed).** A regex over `reference/priorities/…` path-plus-hash pairs in the 46 changed files listed ten stale evidence-document pins.
- **Proposed cause.** The same `897fe1aa7` rename rewrote "F6c" and "F5" tokens in every sibling evidence document; refreshing one pin could not make any test green.
- **Response.** Verified eight as rename-only (§3, P2) and refreshed them on operator instruction; two lacked a committed baseline (F05).
- **Outcome.** Test 2 of that file passed after P2 and P3.

### F05 — Two pins matched no commit in the pinned file's history; first object-store scan crashed

- **Operation (observed).** Per-commit `git show <c>:<path> | sha256sum` over `--follow` history for `2026-08-27-f6c-root-cover-full-resource-plan.md` (pin `46a827d1…`) and `2026-08-26-f6c-normalized-member-acceleration-predeclaration.md` (pin `c67de8cc…`): `matched at NONE`.
- **Failed attempt (observed).** A Node one-liner calling `spawnSync("git",["cat-file","--batch"],{maxBuffer:1<<31})` exited 1: `RangeError [ERR_OUT_OF_RANGE]: The value of "options.maxBuffer" is out of range … Received -2147483648`. Cause: integer overflow in the literal. A streaming rewrite (`/tmp/ops/scan.mjs`) succeeded: `blobs scanned 56935 found 2`, blobs `2166adcfc0b4…` and `b3b8889e946f…`; `git log --all --find-object` on each printed nothing.
- **Proposed cause.** Pins taken from working-tree bytes inside PR #240 that were edited again before the squash (`git log -S` places both literals in `0fb575921`).
- **Response.** Word-diffed each recovered blob against the current document (§3, P3) and, on operator instruction, refreshed.
- **Outcome.** Resolved; the recovered-blob route is recorded in the braid-program queue.

### F06 — Test-file-pins-test-file chain stale since `0fb575921`

- **Operation (observed).** Same pilot-launcher test: `not ok 28 - all32 original entry/launcher/process control obligations survive exact retargeting`, `expected: '3855c2d1…' actual: 'a4122c03…'`; after that refresh, `expected: 'e210e690…' actual: 'cc0cac9e…'`; in `f6c-cached-root-cover-full.test.js` `not ok 33 … expected: 'ad50f3dc…'` and a further pin `f0055410…`.
- **Evidence (observed).** Per-commit hash lists: `tests/f6c-root-cover-pilot.test.js` `730940e16 a4122c03 … 0fb575921` match at `0fb575921`; `f6c-cached-root-cover-pilot-launcher.test.js` `0fb575921 ad50f3dc`; `f6c-cached-root-cover-pilot-process.test.js` `d52665793 72a68ac0 / 0fb575921 f0055410`.
- **Proposed cause.** The rename repair commit `d52665793` repointed one import line in each test without refreshing the tests that pin them.
- **Response.** Verified each diff as the one import line plus pin literals (§3, P4) and refreshed.
- **Outcome.** After P4, no frozen-hash assertion failed in the three files; every remaining failure carried `ENOENT` (observed by grepping each failing subtest's block).

### F07 — Sandbox cannot execute the shared venv (environmental, pervasive)

- **Excerpt (observed, many places).** `ENOENT: no such file or directory, stat '/sessions/eloquent-busy-noether/mnt/vibe/.venv/bin/python'`; `spawnSync /sessions/eloquent-busy-noether/mnt/vibe/.venv/bin/python ENOENT`; in `bp011-bp014-asymptotic-checkers`: `shared Python environment missing at …/.venv/bin/python`.
- **Counts (observed from the sweep's first error lines).** 44 `ENOENT`, 4 `spawnSync`, plus 14 `host memory/disk resource stop` and 8 `EPERM` in the same class; the agent's own tally of the 181 sweep failures gave "env 71" in one pass and 70 in another; the two tallies used different grep patterns and were not reconciled.
- **Effect on decisions.** Every Python-dependent verification was handed to the operator; all Node tests reporting only these errors were classed environmental without host confirmation.
- **Outcome.** Unresolved by design; policy in `AGENTS.md` line 37 states the venv is a macOS build.

### F08 — Operator's 45-file Python run: five failures

- **Operation (operator paste, observed).** Loop over `tests/test_f5_*.py tests/test_f6c_*.py` plus two named files, `python -m unittest discover -s tests -p "$b" 2>&1 | tail -3`, from `~/vibe/architrino` with the venv active.
- **Result.** 40 `OK`; failing: `test_f5_api_domain_conformance.py` (`errors=1`), `test_f5_history_manifest_conformance.py` (`Ran 0 tests`, `errors=1`), `test_f6c_streamed_leaf_session.py` (`failures=1`), `test_orthogonal_plane_weave_fold_limit_certificate.py` (`failures=1, errors=1`), `test_prescribed_acceleration_response_publication.py` (`failures=1, errors=1`).
- **Proposed cause.** All five were rows in Codex's table whose pinned input lies outside the f6c evidence family; three pinned inputs changed by `897fe1aa7`, one by `baa3e7323`, one by `c973402b9`.
- **Response.** Three refreshed (P5); the configuration and master-equation cases escalated (F12).

### F09 — `f5-prehistory-handoff-build-startup` test 3, inherited from the "f5test" session

- **Operation (observed).** `node --test tests/f5-prehistory-handoff-build-startup.test.js`: `not ok 3 - interruption at bootstrap inspection prevents target ACK and permits validated owned cleanup`, `+ 'runner birth was never authenticated' / - undefined` (from `receipt.cleanupFailure`).
- **Sequence.** After the agent changed the `cleanupFailure` expectation for the bootstrap case, the same test failed one assertion later: `error: 'synthetic bootstrap identity must be retained'`. After a second change (see §3, C2) it passed 4/4, twice.
- **Evidence for attribution (observed).** `git log -S'runner birth was never authenticated'` → `4c1860f86 2026-08-29 … (#241)`; the guard line is absent at `4c1860f86~1` (count 0) and present at `4c1860f86` (count 1). The f5test session had attributed it to `#246`; that was wrong.
- **Proposed cause.** The launcher sets `receipt.runner` only after root-guard authentication (launcher lines 661–669) and refuses to signal an unauthenticated PID (line 564); the test predates both.
- **Outcome.** Passing; the contract reading is recorded as the test author's to overturn. The "f5test" session had asked the operator twice for a decision; this conversation acted under "take over those issues" without an explicit yes on the expectation change.

### F10 — `f5-enclosed-root-prefix` tests 1, 8, 9, then only 9

- **Excerpt (observed).** Test 1 `expected: 'c41857a8…' actual: '1b505192…'`; tests 8, 9 `actual: 'F5 prefix rejected: frozen reducer or fixed export appendix changed'`. After the reducer pin refresh (P6): `not ok 9 … actual: 'F5 enclosed-root ledger rejected: approved config and pilot fixture differ at constituents.'`
- **Proposed cause.** Reducer pin stale since `0fb575921` (one-line path change); underneath, the configuration/fixture identifier mismatch (F12).
- **Outcome.** 11 of 12 pass; test 9 is a decision item.

### F11 — Content-integrity aggregate in the sandbox: one gating failure, reporting sweep red

- **Operation (observed).** `timeout 560 node scripts/check-content-integrity.mjs`; wall time `2m10.793s`; `exit=1`.
- **Excerpt (observed).** `[content-integrity] 11/33 Test owned-compute task-closeout hook` … `Error: EPERM: operation not permitted, unlink '/sessions/…/.local-data/owned-compute/plans/894bc1c9-….json'` … `failed: … (exit 1, 0.12s)`; closing lines `1 of 33 checks failed … 11/33 …` and `reported (does not affect exit status): Sweep test files outside the declared slow list … (exit 1, 1m 9.9s)`. Sweep totals: `# tests 2446 # pass 2248 # fail 181`, `[test-sweep] 312 test file(s) outside the slow list`, 48 distinct failing files by `location:` fields.
- **Outcome.** Step 11 classed environmental (matches the OPS-018 and OPS-021 records of the same `EPERM`); sweep failures triaged in OPS-024 (§2 F18–F21, §4).

### F12 — Operator rerun of the five after the refreshes: three remain

- **Excerpt (operator paste, observed).** `test_f5_api_domain_conformance.py` and `test_f5_history_manifest_conformance.py`: `ValueError: frozen source hash mismatch: approved-config` at `scripts/eom/oracle/f5_history_manifest_conformance.py`, line 183, `load_frozen_sources`. `test_orthogonal_plane_weave_fold_limit_certificate.py`: `AssertionError: '0e8219c7…' != 'dbb88e07…'` at line 54 on `provenance["frozenInputs"][f"{key}Sha256"]`. `test_f6c_streamed_leaf_session.py` `Ran 25 tests` and `test_prescribed_acceleration_response_publication.py` `Ran 15 tests` with no `FAILED` line (the grep filter excluded `OK`, so passing is inferred from the absence of `FAILED`).
- **Proposed causes.** Configuration v2→v3 (decision D1 in §4); `master-equation.md` rewritten by `c973402b9` (D3).
- **Outcome.** Unresolved; decision rows.

### F13 — Agent-caused hang: `python3 -` waiting on stdin

- **Operation (observed).** A bash command beginning `python3 - 2>/dev/null || node -e '…'` intended to edit the style ledger; result `Command timed out after 120000ms`.
- **Cause.** The agent's own construction: `python3 -` blocks on stdin. Also a policy slip: the command would have invoked system Python, which `AGENTS.md` forbids; it did not execute anything because it never received input.
- **Response.** Verified the ledger was unchanged (`grep` showed the old counts), then applied the edit with the file Edit tool.
- **Outcome.** Resolved; no repository effect.

### F14 — Wrong tool name

- **Excerpt (observed).** `Error: No such tool available: mcp__workspace` — the agent called a non-existent tool once; re-issued as `mcp__workspace__bash`. No effect.

### F15 — Scratchpad write refused

- **Excerpt (observed).** Write to `/private/tmp/claude-501/…/scratchpad/pin-cascade.mjs`: "is outside this session's connected folders". Response: the instrument was written to `/tmp/ops/` inside the sandbox via a heredoc. Consequence for review: the instruments (`pin-cascade.mjs`, `scan.mjs`, `pin-audit.mjs`) exist only in the ephemeral sandbox and are reproduced in this conversation's tool calls, not in the repository.

### F16 — First cascade instrument mis-reported rounds and could leave intermediate hashes

- **Observed.** Its dry-run output printed `rounds=3` while listing `r4` lines, revealing that a file edited in a later round would leave earlier-round hashes stale in its binders. The instrument was rewritten to iterate to a fixed point and to audit that no earlier hash of any changed file survives (`stale-intermediate-hashes=0` on every subsequent run). The first version was never used with `--write`.

### F17 — Agent's own check grabbed the wrong literal

- **Observed.** A shell `chk` reported `STALE src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs pin=e630c2f4` because it took the first 64-hex string in the reduce script (`REFERENCE_SHA`), not the reducer's pin. Noted in-conversation as invalid; no action taken on it.

### F18 — Sweep failures from the `#245` configuration change (decision D1)

- **Excerpt (observed).** 16 × `'F5 enclosed-root ledger rejected: approved config and pilot fixture differ at constituents.'` (`f5-enclosed-root-ledger-reducer`, `f5-enclosed-root-prefix`); 2 × `'frozen reference drift: reference/priorities/braid-program/configurations/phase-varying-prescribed-display-hi…'` (`f5-enclosed-root-preparation`); `f5-phase-varying-campaign-spec` `exp='bda39fe6…' act='93b295b9…'`; `f5-independent-interpolation-enclosure` `exp='c59190e9…' act='f07ee01d…'` and `exp=0 act=1`.
- **Comparison (observed, Node over both JSON files).** Numbers identical in sequence: `constituents 36 -> 36`, `worldlines 276 -> 276`, `relationships 2 -> 2`, `constraints 8 -> 8`; `history`, `display`, `interpolation` byte-equal; identifiers `f5-axis-1-ring-1-positive-architrino` → `member-1`; `schema` `prescribed-assembly-spec.v2` → `.v3`; validator `f5-phase-varying.v1` → `phase-varying-history-consistency.v2`; `compatibility` block absent in v3. `git show --name-status 897fe1aa7`: `D` v2 / `A` v3. The pilot fixture `pilot==v2 true`, `pilot==v3 false` on `constituents`, `worldlines`, `relationships`, `constraints`.
- **Outcome.** Not repaired; escalated.

### F19 — Sweep failures from the methodology-coverage gate, schema v3, Archie, Borg, and others

- **Observed first error lines.** 16 × `'methodology hash 611b89ce… requires an explicit analytical coverage impact review.'` across `all-candidate-analytical-rebuild`, `analytical-campaign-database`, `endpoint-residual-search-campaign`, the 4-2-1 coverage calibration; 8 × `'prescribed assembly specification requires schema prescribed-assembly-spec.v3.'` (`prescribed-lattice-spec`, `prescribed-sea-model`); `f6b-prescribed-kernel-diagnostic`: `TypeError: sourceRecord.assemblyId must be a nonempty string.` at `ExactPrescribedSourceWake.mjs:53`; `f6c-relative-equilibrium-search`: `assert.ok(report.bestRows.length > 0)` false; Archie: `- mcp-stdio-search-call-001: stdio response drift` (six calls) and `archie-service-contracts` `exp=0 act=1`; `borg-library`: `0 !== 145` and `exp=100 act=0`; `borg-configuration-geometry-records`: `'0.8164965809423974 vs 0.816496580927726'` and `exp=30 act=6`; `analytical-campaign-database`: `'database.enableDefensive is not a function'`; `f6c-parent-emission-refinement-pilot`: `exp='5428e4b8…' act='f695eadd…'`; `f5-prehistory-handoff-build`: `'reviewed source drift: src/eom/src/CoupledEvolution.cpp'`; `subfield-circular-root-preparation`: `'reviewed source drift: src/eom/CMakeLists.txt'`; `borg-eom-migration`: `exp='dbb88e07…' act='ccff8f70…'`; `pdgedit-generator-drift`: missing `pdgedit-*-noether-braid*.svg` names plus venv `ENOENT`.
- **Outcome.** All classified in OPS-024 as decisions or unknowns; none repaired in this conversation. The 72 "multi-line assertion diff" failures were only partially classified (the per-failure listing was produced, but a handful of `(diff) exp= act=` rows with empty excerpts remain unexplained in the retained output).

### F20 — `markdown-runtime-layout` test 11 (repaired)

- **Excerpt (observed).** `+ 'reference/priorities/mapping-benchmarks/malus-law.md'` / `- 'reference/priorities/mapping-benchmarks/analysis/malus-law.md'`; `ls` shows only the `analysis/` file exists; `git show 51ee4b84f -- tests/markdown-runtime-layout.test.js` changed the expectation line (`-…/mapping-benchmarks/malus-law.md` / `+…/mapping-benchmarks/benchmarks/malus-law.md`), and `git blame` puts the fixture lines 671 and 710 at `eff3e3e7c0 2026-08-23`, untouched.
- **Outcome.** Repaired (§3, C3); 18 of 18 pass.

### F21 — Pin-audit instrument: 61 stale or missing pairs (upper bound)

- **Observed.** `pairs checked: 689; stale/missing distinct: 61`, including two `MISSING` targets (`…/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json`, `…/evidence/unused.md`) and many files pinning the same path at two different hashes (for example `scripts/eom/prepare-f6c-parent-emission-refinement.py 492882b6` and `ff488499`, both `now fd9ca0a8`).
- **Interpretation.** Many are ancestry pins recording predecessors (the runner's commit `590ddc942 Refresh F6c evidence ancestry and provenance pins` names that class). The audit was not used as ground truth; the sweep was. Not reconciled pair by pair.

### F22 — Transcript reads of other sessions returned stubs

- **Observed.** `read_transcript` rendered earlier steps as `(called mcp__workspace__bash)` without outputs. The "f5test" and "FSC" findings below therefore rest on those sessions' final assistant messages (summaries), not on their tool outputs.

## 3. Changes and verification

Every file write in this conversation was made with the file Edit/Write tools or by the sandbox instrument `pin-cascade.mjs` writing hash literals. No `git add`, `commit`, or `push` was issued by this conversation. Commits appeared on `codex/sapphire` during the work and were observed with `git log`; they are attributed here to the concurrent PR runner by the operator's statements in this and the "f5test" session and by their timing, which is an inference.

### 3a. Pins refreshed (current-source expectations and evidence bindings)

For each, the old and new SHA-256 prefixes, the justification actually performed, and the cascade size. "Cascade" means second-order pins (files that pin the edited holders) were replaced to a fixed point by the instrument; every changed line was checked to contain a 64-hex literal (`git diff | grep -vE '[0-9a-f]{64}'` over changed lines returned 0 for the pin-only runs).

| Id | Pinned target | Old → new | Justification performed (observed) | Cascade |
| --- | --- | --- | --- | --- |
| P1 | `evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md` (evidence binding, asserted by 19 scripts/tests) | `f20e4bda…` → `db38185a…` | Hash at each `--follow` commit: matched only at `0fb575921`; `git diff --word-diff=porcelain 0fb575921 HEAD` changed 7+1 `F6c`→`asymmetric counter-breathing representative` tokens and one link target gaining `analysis/`. Operator confirmed these as the correct changes. | 7 rounds, 46 files, 198 replacements |
| P2 | Eight sibling evidence documents (`accepted-frame-history-reconstruction`, `continuous-reception-root-cover-predeclaration`, `call-local-state-cache-equivalence`, `root-cover-pilot-resource-plan`, `cached-root-cover-full-resource-plan`, `continuous-reception-acceleration-reference`, `cached-root-cover-predeclaration`, `parent-emission-refinement-reference`) | e.g. `6abbbbac`→`710279f5`, `765e6663`→`3b20e5d7`, `798858e8`→`a5d9ee0b`, `36b72681`→`1a632793`, `daeb71be`→`8263f700`, `c1a5358e`→`8d2c7819`, `7c2a8b0b`→`520bd9fd`, `652d7724`→`c9f0924c` | Each matched at `0fb575921`; word-diff tokens only `F6c`/`F5` renames. | 6 rounds, 46 files, 265 replacements |
| P3 | `root-cover-full-resource-plan.md` (`46a827d1`→`2883081c`), `normalized-member-acceleration-predeclaration.md` (`c67de8cc`→`7d4c202c`) | Baselines recovered as unreachable blobs; word-diff of blob vs current: rename tokens, two `.local-data` links turned inline, two link targets moved, one link retargeted to the v3 configuration file that `#245` created (`D`/`A` pair). Operator asked for the explanation, then instructed the refresh. | with P4a: 5 rounds, 45 files, 274 replacements |
| P4 | Test-file pins: `f6c-root-cover-pilot.test.js` `3855c2d1`→`a4122c03`; `f6c-root-cover-pilot-process.test.js` `e210e690`→`cc0cac9e`; `f6c-cached-root-cover-pilot-process.test.js` `f0055410`→`72a68ac0`; `f6c-cached-root-cover-pilot-launcher.test.js` `ad50f3dc`→`256391c6`→`0518387a` (intermediate then final) | Each diff since `0fb575921`: one import line (`launch-abc-enclosed-root-pilot.mjs` → `launch-subfield-circular-root-pilot.mjs`) plus pin literals. | 2 rounds, 2 files |
| P5 | `scripts/eom/launch-subfield-circular-root-pilot.mjs` in the H3 dispatcher and rung (`df1b7e1d`→`cd5b8924`, then `→dcd4bb58` because the launcher's own `RUNNER_SHA` changed in the same cascade); `oracle/f5_history_manifest_conformance.py` `7441fa70`→`c34cd3f3`; `reduce-prescribed-acceleration-response.py` `af788457`→`59a6d76c`; `tests/test_f6c_single_leaf_diagnostic.py` `7a665b6c`→`be527cbe` (then further in-cascade) | Launcher: `git diff --stat 897fe1aa7 HEAD` = 159 insertions/25 deletions, the `#246` root-guard sidecar; operator ruled the dispatcher follows it. Oracle and reduce script: one configuration-path line each. Single-leaf test: two pin literals. | 5 rounds, 40 files, 95 replacements |
| P6 | `src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs` `c41857a8`→`1b505192` | One configuration-path line since `0fb575921`. | 5 rounds, 41 files, 92 replacements |
| P7 | `scripts/eom/derive-f5-independent-interpolation-enclosure.mjs` `c59190e9`→`f07ee01d` | Two configuration-path lines since `0fb575921`. | 1 round, 1 file |

Two docstring mentions of the P1 hash in `scripts/eom/oracle/continuous_reception_roots.py` and `continuous_reception_roots_cached.py` were deliberately left unchanged (they are prose, and re-hashing a frozen oracle would break 12 evidence records and ~20 scripts that pin it). Evidence records under `reference/priorities/**/evidence/` were never edited.

**Independence of the verification.** The justification for each refresh is a diff against the pinned bytes showing only renames, path moves, or pin literals. That establishes that the *documents* did not change substantively; it does not re-run any oracle or certificate against an independent reference. The only executed checks after refreshing were: Node tests in the sandbox (frozen-hash subtests pass; other subtests `ENOENT`), and on the operator's Mac the three Python tests `test_eom_continuous_reception_roots` (35 OK), `test_f6c_cached_continuous_reception_root_cover` (42 OK), `test_f6c_retained_history_guards` (28 OK), plus the later 45-file run (40 OK). Those tests exercise the oracles' own consistency checks; they are not independent of the code they check.

**Instrument validation.** Before every `--write`, `pin-cascade.mjs` was run on a known case: seeded with the current hash of `scripts/eom/verify-f6c-retained-history-guards.py`, it must report exactly the eight in-scope binders that `git grep` had listed. It did so each time (`b8480f36->00000000 x8 in 8 files`). `scan.mjs` was validated only by finding the two blobs it was built to find.

### 3b. Code and test changes (not pins)

| Id | File | Change | Verification | Was the expectation changed? |
| --- | --- | --- | --- | --- |
| C1 | `tests/f5-prehistory-handoff-build-startup.test.js` | Bootstrap-interruption case now expects `cleanupFailure === "runner birth was never authenticated"` and `receipt.runner === undefined`; first-target-gate case unchanged; comment added. | `node --test`: 4/4, run twice. | **Yes**: the test's expectation was changed to the launcher's current behaviour. Supporting evidence is a reading of the launcher (lines 564, 661–669) and the `git log -S` attribution to `#241`; no operator sign-off on the contract reading was recorded before the change. |
| C2 | `tests/markdown-runtime-layout.test.js` | Two fixture links `../mapping-benchmarks/malus-law.md` → `…/analysis/malus-law.md`. | 18/18 pass. Blame and `git show 51ee4b84f` establish the layout pass changed the expectation but not the fixture. | Fixture changed, expectation unchanged. |
| C3 | `reference/priorities/operator-document-style-conversion-ledger.md` | Row for the two-lobe packet: `historical evidence requiring byte preservation` → `deferred for owner or authority reason`; counts 227→226 and 141→142; explanatory paragraph. | Counts re-measured from the table (`uniq -c`: 226, 142). File content verified: line 344 lists the incorporated findings; `grep -c '^Plainly:'` = 11. | n/a |
| C4 | `reference/op/README-op.md` | One workflow item authorizing routine runs of the content-integrity check. | Operator instruction in this conversation. | n/a |
| C5 | Priority records: `aaa-operations/work-queue.md` (OPS-018 closure subsection, table cells, OPS-019 blocker note, OPS-021 sandbox-run note, new OPS-024 row and ranked entry), `aaa-operations/work-log.md` (one entry), `braid-program/work-queue.md` (routed-item bullets), `field-speed-ceiling/work-queue.md` (new "Routed Reproducibility Gap" section). | `node scripts/validate-priority-ranking.mjs` printed `passed` after each edit; `git diff --check` clean. | n/a |

### 3c. Status of changes

- **Proposed only (not applied):** compare-modulo-identifiers change to the f5 oracle and reducer; v3 migration of test fixtures; all other §4 decision items; the `README-op` rule about taking pins from committed bytes.
- **Applied:** everything in 3a and 3b.
- **Committed:** not by this conversation. Observed commits containing this work (subjects from `git log`): `730940e16 Record self-test run and close OPS-018 attribution`, `295a24ce2 Refresh F6c evidence pins and record remaining drift`, `590ddc942 Refresh F6c evidence ancestry and provenance pins`, `582efe4bf Refresh EOM launcher and evidence integrity pins`, `959247191 Refresh pinned EOM pilot dependencies`, `bb9d82d94 Record pin refresh findings and configuration mismatch blocker`, `36d34a262 Record post-campaign binding corruption triage`. Attribution of each file to each commit was not verified by name-status; the working diff shrank after each appeared, which is the only observation. Commit `590ddc942` is not this conversation's work and its content was not inspected.
- **Pushed:** `git --no-optional-locks status --porcelain --branch` printed `## codex/sapphire...origin/codex/sapphire` with no ahead/behind marker at the final check; that is consistent with the branch being pushed but was not verified with a fetch.
- **Verified repairs:** P1–P4 (sandbox Node frozen-hash subtests; operator's Mac for the three Python files); P5 partially (Node: `subfield-circular-root-launcher` 15/15, `prescribed-response-pilot-launch` 16/16; operator's Mac: `test_f6c_streamed_leaf_session` and `test_prescribed_acceleration_response_publication` pass); P6 (`f5-enclosed-root-prefix` 11/12, remaining failure is D1); P7 (no test turns green until D1); C1, C2 (tests pass).

## 4. Decisions to accept or defer failures

| Id | Decision | Rationale and evidence | Authorization | Remaining risk | Owner / follow-up |
| --- | --- | --- | --- | --- | --- |
| D0 | Attribution follows first mismatch, not last commit; OPS-018 closed with an empty layout-pass repair set. | Hash walk P1 (matched only at `0fb575921`; broken by `897fe1aa7`). | Operator: "do 1 2 and 3". | The row's original acceptance asked for runs at two commits; the hash walk answers the same question without running anything. | Recorded in OPS-018. |
| D1 | Phase-varying configuration v2→v3 versus pilot fixture: not repaired. | F18 comparison. A hash refresh would move the failure to `approved scientific row changed at constituents`. | Operator asked for an explanation; no decision recorded. | 24 sweep failures plus two Python files stay red; the check guards against silent replacement of an approved row. | Braid-program owner; recorded in braid queue and OPS-024. |
| D2 | Methodology-coverage impact review: deferred. | Pre-existing (`c973402b9`); routed before this conversation. | Prior routing. | 16 failures. | Braid-program. |
| D3 | `master-equation.md` dependency of the fold-limit certificate: pin not moved. | `git diff --stat bfbb3ea3e HEAD` = 512/178; 123 math-bearing changed lines; 62 inline-math tokens differ; display-`$$` line counts equal (772). | None sought; escalated. | One Python test and `borg-eom-migration` red. | Certificate owner; Borg record owner. |
| D4 | EOM native "reviewed source" pins (`CoupledEvolution.cpp` 275 lines by `#246`): not moved. | Observed diff stat. | None. | Two sweep failures. | App-solver. |
| D5 | `f6c-bounded-operation.mjs` pin (blob `96ae77dd…`, current differs by real code): not moved. | Word-diff shows added `try`/`catch` blocks, not only literals. | None. | One sweep failure. | Braid-program. |
| D6 | `prescribed-assembly-spec.v3` / `assemblyId` mismatches: not repaired. | F19 excerpts. | None. | ~10 failures. | Schema owner. |
| D7 | Archie MCP drift, Borg provider, `enableDefensive`, pdgedit SVGs: not investigated beyond first error lines. | F19. | None. | Unknown. | OPS-023 (Archie); Borg owner; renderer owner. |
| D8 | All `ENOENT`/`EPERM`/resource-stop failures classed environmental. | F07; each classed by grepping its subtest block for those strings. | Standing policy (`AGENTS.md` line 37). | A real defect could hide behind an environmental first line; not excluded for the process-supervision tests (`exp=1 act=0`). | Operator's Mac run of the aggregate (requested, not yet pasted). |
| D9 | C1 test-expectation change made without a recorded operator yes on the contract reading. | Operator: "take over those issues"; two prior asks in "f5test" unanswered. | Ambiguous. | The interrupted-startup contract may be intended to retain the runner PID. | Recorded as "the test author's to overturn". |
| D10 | Two oracle docstrings left citing the superseded hash. | Avoids re-hashing a frozen oracle. | Agent judgment, recorded. | Stale prose in two files. | None assigned. |
| D11 | Timeouts of 120–200 s wrapped around individual Node tests in the sandbox. | Sandbox per-command limit. | Agent judgment. | A slow test could have been mis-read as failed; no such case was observed (all recorded failures carried explicit errors). | None. |

Unavailable prerequisites versus executed-and-failed: D8 covers prerequisites (venv, disk floor, `.local-data` unlink). D1–D7 are tests that executed and failed on their own assertions.

## 5. Git and GitHub access

- **Local Git (sandbox).** Read-only inspection only: `git log`, `git show`, `git diff`, `git grep`, `git ls-files`, `git blame`, `git cat-file --batch-all-objects`, `git hash-object`, `git --no-optional-locks status`. All succeeded. No `git add`, `commit`, `push`, `checkout`, `stash`, `reset`, or `rebase` was issued by this conversation. `git status` without `--no-optional-locks` was never used; no `.git/index.lock` was observed.
- **Remote fetch/push.** Not attempted by this conversation. The branch-tracking line was read from `status --porcelain --branch` only.
- **GitHub CLI.** Not used.
- **GitHub connector.** A set of GitHub MCP tools became available (deferred) at the time of the post-mortem request; none was loaded or called. No authentication or authorization state for it is known.
- **Session-transcript connector.** `list_sessions` and `read_transcript` were called successfully for sessions `local_1f208237…` ("f5test") and `local_87a00831…` ("FSC"); read access only.
- **File tools.** Read/Write/Edit succeeded for paths under `/Users/markmorris/vibe/architrino`; a Write to the session scratchpad path was refused (F15).
- No credentials, tokens, or headers appeared in any retained output.

## 6. Process problems and corrections

1. **Contradicted diagnosis, corrected.** Codex's table labelled one pinned file three ways (F01). The hash walk showed the pin was broken by `897fe1aa7`, not the layout pass; the operator's rule was changed to first-mismatch and the cells corrected with their prior labels preserved.
2. **Unsupported attribution, corrected.** The "f5test" session attributed the cleanup guard to `#246`; `git log -S` places it in `#241` (`4c1860f86`). Recorded in the braid queue.
3. **Agent's own number errors, corrected in place.** "22 holders" (grep lines) versus 21 files; "one-line change" for C1 that became a contract change; the `chk` mis-read (F17). Each was stated as a correction when found.
4. **Scope expansion.** Objective went from verifying one row to a repository-wide triage. Each expansion followed an explicit operator instruction; the agent flagged once that the FSC lane work was a different track and captured it as a queue row rather than executing it.
5. **Agent-caused faults with no repository effect.** F13 (stdin hang, and a would-have-been policy violation), F14, F15, F16.
6. **Environmental assumptions.** The sandbox cannot run the venv; every Python verification depended on the operator pasting output. The agent twice asserted that tests "should pass now" before the operator's run showed the true state (two of five passed). Recovery: asked for the exact error output before acting.
7. **Concurrent commits by another agent.** The working diff changed size between commands because the PR runner committed the conversation's files (`git diff --stat` dropped from 50 to 46 files at one point). No collision occurred, but the conversation never controlled which files were committed together or their commit messages; several subjects describe intent rather than content.
8. **Evidence-record modification by the campaigns.** `#245` modified evidence documents and a pilot fixture JSON (`bda39fe6…`→`93b295b9…`), which the repository's own rules treat as append-only or byte-preserved. This conversation did not modify evidence records; it did refresh pins that point at them.
9. **Instrument discipline held.** Each in-session instrument was run on a known case before its target, per `AGENTS.md`; the one instrument with a design flaw (F16) was caught in dry run.
10. **Reporting-only sweep as ground truth.** The content-integrity sweep does not affect the aggregate's exit status; its 181 failures were the basis of OPS-024. The 72 multi-line-diff failures were only partly attributed (§2 F19).

## 7. Unresolved handoff

**Confirmed unresolved defects** (executed and failed, cause established):
1. D1 — phase-varying configuration v2→v3 versus pilot fixture identifiers; 24 sweep failures + 2 Python files.
2. D2 — methodology-coverage `impactReview` stale after `c973402b9`; 16 failures.
3. D6 — `prescribed-assembly-spec.v3` / `assemblyId` refusing v2-shaped test fixtures and the f6b diagnostic input; ~10 failures.
4. D3 — `master-equation.md` rewritten under a certificate dependency pin; 1 Python file, `borg-eom-migration`.
5. D4 — EOM native reviewed-source pins after `#246`; 2 failures.
6. D5 — `f6c-bounded-operation.mjs` pin at bytes no commit holds, with real code changes since; 1 failure.

**Suspected defects needing verification:**
7. Archie MCP fixture/stdio drift (five files) — OPS-023 family.
8. Borg seed provider returning 0 of 145 records; Borg geometry edge count 30 vs 6; float last-digit mismatch.
9. `analytical-campaign-database`: `database.enableDefensive is not a function` (possibly sandbox sqlite version).
10. `f6c-relative-equilibrium-search` empty `bestRows` (possibly D6).
11. Two missing pin targets from the audit (`2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json`, `evidence/unused.md`).
12. The "f5test" thread's `f5-prehistory-handoff-build-startup` test 3 contract reading (C1/D9).

**Checks blocked by missing prerequisites (sandbox):**
13. Content-integrity step 11 (`EPERM` under `.local-data/`); every venv-dependent test (44 `ENOENT`, 4 `spawnSync`); launchers' host-resource floor (14). Needs the operator's Mac run of `node scripts/check-content-integrity.mjs`, requested and not yet pasted.
14. `pdgedit-generator-drift` regeneration (venv).

**Decisions still requiring review:**
15. D1 rule (modulo identifiers versus restore v2 ids).
16. D9 — whether an interrupted-at-bootstrap launch should retain the unauthenticated runner PID in the receipt.
17. Whether P5's dispatcher pin move is acceptable against the 2026-08-27 launch-readiness evidence (operator ruled yes in chat; the evidence record was not annotated).
18. FSC "Routed Reproducibility Gap" row: rebuild the complete-lobe instrument; FSC-014 rerank.

**Claims of repair lacking adequate verification:**
19. All pin refreshes P1–P7 are verified only by document diffs and by the pinned tests' own consistency checks; no oracle was re-run against an independent reference, and the Mac runs cover only the Python files the operator chose.
20. P5's 40-file cascade and P6's 41-file cascade were verified in the sandbox by four Node tests and by the operator's later Python run of two files; the other affected scripts were not executed.
21. C1 (test expectation changed to match current behaviour) has no evidence beyond the launcher reading.
22. Commit contents were never inspected by name-status; attribution of files to the runner's commits is inferred from the shrinking working diff.

**Missing transcript sections or logs for independent review:**
23. The Codex session transcript for the OPS-018 Python run (only its written section and the operator's summary exist); its `/tmp/pyfails.txt` and `/tmp/ops018-*.log` on the operator's Mac.
24. Full outputs of `check-content-integrity.mjs` and each `node --test` run (`/tmp/ops/ci.txt`, `/tmp/ops/sweep.txt`, `/tmp/ops/t.txt`), and the instruments `/tmp/ops/pin-cascade.mjs`, `scan.mjs`, `pin-audit.mjs`, all in the ephemeral sandbox.
25. The "f5test" and "FSC" sessions' tool outputs (only their final messages were readable).
26. The operator's full Python outputs (only `tail -3` / grep-filtered lines were pasted).
27. `git show --name-status` for each of the seven runner commits listed in §3c.

Coverage of this report is limited to the single conversation described in §1; it does not certify repository health.
