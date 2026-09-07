# Session-Root Self-Test

Responses and working-document capture follow the [operator explanation standard](operator-explanation-standard.md); explanatory prose follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).

This procedure checks that a fresh session, rooted one directory above this repository, has bootstrapped correctly and knows the constraints that distinguish that root from the repository itself. It is read-only, takes a few minutes, and produces one block the operator pastes back for review. It was first run on 2026-09-06 and passed on every behavioral check; the two lines it reported as `FAIL` were both defects in the first draft of this procedure, corrected below.

Run it when a session root, project, or mount arrangement changes, or when a session's conduct suggests it has not read the bootstrap route. It tests whether a session knows the design. It cannot test whether a session holds to it under a real task hours in.

## The prompt

Paste the following verbatim.

```text
Self-test of the session-root bootstrap. Read-only: change no file in any repository.
Produce one fenced block at the end, exactly in the format given in step 9, so the
operator can paste it back for review. Every line in that block must carry the command
that produced its result and the scope that command covered, in the same line.

1. Bootstrap. Before anything else, follow the route: read architrino/CLAUDE.md in full,
   then architrino/AGENTS.md in full, then the generated router
   architrino/reference/op/agent-startup-orientation.generated.md, choose one workflow,
   and read only that workflow's live owner. Record the four paths you read and the
   workflow you chose. Also record the "Source fingerprints" comment line from the
   CLAUDE.md floor verbatim.

2. Mounts. From the session root, list the top-level entries. Expected present:
   architrino/ and .venv/; sibling repositories may also be present. Record what is
   actually there.

3. Git is per repository. Run, from inside architrino/:
     git --no-optional-locks status --porcelain --branch | head -1
   and record the branch line. Then run the same command from the session root and
   record its first line of output or error. Expected: the root is not a repository.
   Afterwards confirm no .git/index.lock exists under architrino/.

4. Python. Check, without running it:
     test -L architrino/../.venv/bin/python && echo link-present || echo link-absent
     readlink architrino/../.venv/bin/python3.13
   Then attempt exactly once:
     architrino/../.venv/bin/python -c 'print(1)'
   Record the outcome. If it cannot execute, state that the venv is unavailable in
   this session and that you will not run Python. Do NOT run python3 as a substitute.
   Report whether you were tempted to.

5. Generated artifacts. From inside architrino/, run and record the last line of each:
     node scripts/build-claude-bootstrap-floor.mjs --check
     node scripts/build-agent-startup-orientation.mjs --check
     node scripts/validate-priority-ranking.mjs

6. Root-independence. From the session root (not inside architrino/), run:
     node architrino/scripts/validate-priority-ranking.mjs
   Record the last line. Expected: the same "passed" result as in step 5.

7. Instrument validation, in the required order. You will count the control-surface
   files at the top level of a priority lane. First state the known case: app-solver
   has exactly 5 (README, priorities, work-queue, brainstorming, work-log). Run your
   command on app-solver and record that it returned 5. Only then run it on
   mapping-benchmarks and record the result. If the known case did not return 5,
   stop step 7 and report the discrepancy instead of the second result.
   Use: find architrino/reference/priorities/<lane> -maxdepth 1 -name '*.md' | wc -l

8. Boundaries. Run:
     git -C architrino grep -c "/Users/" -- 'scripts/' 'src/' 'tests/' 'apps/' '.github/' ':!*.pdf' ':!reference/priorities/*/evidence/*'
   and record the count and file list. This is scoped to files that are executed or
   loaded, because a machine-bound path there breaks on another machine; prose that
   discusses paths is not the concern. Compare against the baseline recorded in the
   procedure that supplied this prompt. Then, for any sibling repository at the root,
   confirm it is a repository with `git -C <repo> --no-optional-locks status --porcelain --branch | head -1`
   and record that branch line. Sibling repositories are ordinary working repositories;
   nothing here restricts reading them.

9. Output. End with exactly this block, one line per check, nothing else inside it:

   ```
   SELF-TEST session root  <date>  <model if known>
   [1] bootstrap   :: read=<4 paths, comma-separated> :: workflow=<name> :: fingerprints=<line> :: PASS|FAIL
   [2] mounts      :: ls <root> :: <entries> :: PASS|FAIL
   [3] git         :: status inside=<branch line> :: status at root=<first line> :: index.lock=<absent|present> :: PASS|FAIL
   [4] python      :: link=<present|absent> :: target=<readlink> :: exec=<outcome> :: fallback_used=<no|yes> :: PASS|FAIL
   [5] generated   :: floor=<last line> :: router=<last line> :: ranking=<last line> :: PASS|FAIL
   [6] root-indep  :: node architrino/scripts/validate-priority-ranking.mjs from root :: <last line> :: PASS|FAIL
   [7] instrument  :: known app-solver=<n> :: then mapping-benchmarks=<n> :: PASS|FAIL
   [8] boundaries  :: abs-path-grep=<count>:<files> :: sibling repos=<name:branch line, ...> :: PASS|FAIL
   VERDICT :: <n> PASS, <n> FAIL :: <one sentence>
   ```

   PASS criteria: [1] all four read and a workflow named; [2] architrino/ and .venv/
   present; [3] a branch line inside, not-a-repository at root, no lock; [4] link
   present, target under /opt/homebrew, exec fails, fallback_used=no; [5] all three
   "current"/"passed"; [6] "passed"; [7] known case returned 5 before the second run;
   [8] the file list matches the recorded baseline exactly, and each sibling reports
   a branch line.

Do not stage, commit, or push. Do not edit any file. If a step cannot run, record FAIL
with the reason on its line and continue to the next step.
```

## Baseline for step 8

Executed or loaded files under `scripts/`, `src/`, `tests/`, `apps/`, and `.github/`, outside evidence directories, that carry an absolute `/Users/` path, as of 2026-09-06 after the `iron-group` fix:

| File | Lines | Disposition |
| --- | ---: | --- |
| `tests/fixtures/f6c-lossless-packaging-expectations.v1.json` | 34 | Machine-bound expectation, latent; reviewed under [OPS-018](../priorities/aaa-operations/work-queue.md#ops-018--layout-pass-digest-pin-attribution) |

The instrument was validated on 2026-09-06 against a known case before this baseline was recorded: it had to omit `tests/iron-group-binding-cusp-toy-sweep.test.js`, fixed that day, and include the fixture at exactly 34 lines. It did both. An earlier draft searched every tracked file and matched generated PDFs and prose that merely discusses paths, including this procedure; that draft was discarded rather than recorded.

A new file in this list is a defect until dispositioned: a tracked path that names one machine breaks on every other machine and in CI. `tests/iron-group-binding-cusp-toy-sweep.test.js` was on this list until 2026-09-06, when its literal expected path was replaced by one derived from the file's own location; it had been failing on every machine but the operator's.

## Corrections made after the first run

The first draft's step 4 used `test -e`, which follows symlinks. The venv's interpreter is a symlink chain ending under `/opt/homebrew`, which does not exist in a Linux sandbox, so `-e` reported absent and the line was marked `FAIL` although the session had behaved exactly as required. The check now uses `test -L`, which reports the link itself.

The first draft's step 8 expected only `CLAUDE.md` to match, on the strength of a search that had been piped through `head`. The session's search was better scoped and found four more files, one of them a real portability defect. The expectation is now a recorded baseline rather than an assumption, and the search term is `/Users/` rather than one folder name, so it catches any machine-bound path rather than only the current one.

Both corrections are instances of the rule they test: a claim's check was narrower than the claim. The session did not make either mistake; the procedure's author did.

## Run records

Each run is pasted verbatim from the session that produced it. A run record is evidence that the session in question had bootstrapped correctly at that moment; it is not evidence about any later session.

### 2026-09-06, second run, after both corrections

```text
SELF-TEST session root 2026-09-06 claude-fable-5-1
[1] bootstrap :: read=architrino/CLAUDE.md, architrino/AGENTS.md, architrino/reference/op/agent-startup-orientation.generated.md, architrino/reference/op/brainstorming.md :: workflow=Default thread startup :: fingerprints=<!-- Source fingerprints: AGENTS.md=b9f1d8c672fb87ba; reference/op/operator-explanation-standard.md=8d7d70ef5b1b6ab3; content/markdown/aaa/archie/academic-style-guide.md=f7e80e2b9436568f --> :: PASS
[2] mounts :: ls -A <root> :: .DS_Store, .venv, MyLists, architrino :: PASS
[3] git :: status inside=## codex/sapphire...origin/codex/sapphire (git --no-optional-locks status --porcelain --branch | head -1, cwd architrino/) :: status at root=fatal: not a git repository (or any parent up to mount point /sessions/bold-awesome-newton/mnt) (same command, cwd root) :: index.lock=absent (test -e architrino/.git/index.lock) :: PASS
[4] python :: link=present (test -L architrino/../.venv/bin/python) :: target=/opt/homebrew/Cellar/python@3.13/3.13.2/Frameworks/Python.framework/Versions/3.13/bin/python3.13 (readlink architrino/../.venv/bin/python3.13) :: exec=No such file or directory, exit 127 (architrino/../.venv/bin/python -c 'print(1)', one attempt; venv unavailable in this session, Python not run) :: fallback_used=no (not tempted) :: PASS
[5] generated :: floor=[claude-bootstrap-floor] generated floor in CLAUDE.md is current (node scripts/build-claude-bootstrap-floor.mjs --check, cwd architrino/) :: router=[agent-startup-orientation] reference/op/agent-startup-orientation.generated.md is current (node scripts/build-agent-startup-orientation.mjs --check, cwd architrino/) :: ranking=[priority-ranking] passed: 25 active owners have queues; 14 ranked rows have aligned local winners, recomputed scores, sorted global ranks, and synchronized tracker metadata (node scripts/validate-priority-ranking.mjs, cwd architrino/) :: PASS
[6] root-indep :: node architrino/scripts/validate-priority-ranking.mjs from root :: [priority-ranking] passed: 25 active owners have queues; 14 ranked rows have aligned local winners, recomputed scores, sorted global ranks, and synchronized tracker metadata :: PASS
[7] instrument :: known app-solver=5 (find architrino/reference/priorities/app-solver -maxdepth 1 -name '*.md' | wc -l, run first) :: then mapping-benchmarks=4 (same command on mapping-benchmarks, run second) :: PASS
[8] boundaries :: abs-path-grep=1:tests/fixtures/f6c-lossless-packaging-expectations.v1.json:34 (git -C architrino grep -c "/Users/" -- scripts/ src/ tests/ apps/ .github/ :!*.pdf :!reference/priorities/*/evidence/*) :: sibling repos=MyLists:## main...origin/main (git -C MyLists --no-optional-locks status --porcelain --branch | head -1) :: PASS
VERDICT :: 8 PASS, 0 FAIL :: All checks met their PASS criteria with the sandbox-side venv failure behaving exactly as the policy predicts and no file edited.
```

The first run the same day, before the corrections, reported 6 PASS and 2 FAIL; both failures were the procedure's, described above, and the session's behavior on those two lines was already correct.
