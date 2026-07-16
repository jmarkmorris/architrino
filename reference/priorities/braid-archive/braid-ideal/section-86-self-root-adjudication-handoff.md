# Section 86 middle self-root adjudication handoff

Closure goal: Independently adjudicate the Section 86 middle self-root cluster at the first failed endpoint, then either repair and validate the native certificate or record a justified physical or numerical horizon block.

## Pause state

The task is intentionally paused after the expensive native replay and before the corrected independent-oracle rerun.

- No Section 86 solver, oracle, log follower, or campaign shell is running.
- LaunchAgent `com.architrino.section86-self-root-adjudication` is loaded but not running.
- Automation `section-86-self-root-adjudication-monitor` is paused.
- The active branch at capture closeout was `codex/galena` at `68d603a96bfb272fd36928514afe4a50ad44f066`.
- The live worktree and artifacts must be rechecked on resume; do not treat this handoff as proof of current process state.

## Preserved target

The replay reproduced every accepted time through accepted step 30 and captured the first endpoint snapshot with `root_completeness_not_certified` before the failed candidate was discarded.

- Input: `.tmp/section86-self-root-adjudication/candidate.candidate-6.tsv`
- SHA-256: `43fe0415688473b18626badd57e4321c453ad121f8ae036e0b4b5d635bd5f9cb`
- Start time: `0.048800144628489611`
- Failed endpoint: `0.050606313906115752`
- Correction iteration: `0`
- Size at pause: approximately 1.1 MB
- Middle histories: 461 cubic segments each for `M+` and `M-`

Do not rerun the two-hour native replay if this file exists and its hash matches. If the file is missing or the hash differs, fail closed and reconstruct the capture from the campaign record rather than substituting another endpoint.

## What is established

- **Measured:** accepted times through `0.048800144628489611` matched `.tmp/section86-v5-collapse-campaign/circular.log` exactly.
- **Measured:** the target candidate carries `root_completeness_not_certified` at the first post-step-30 endpoint.
- **Measured:** the native replay was stopped only after the candidate TSV was atomically published; solver exit `143` is the intentional post-capture termination.
- **Measured:** nominal segment joins differ by at most about `9.26e-17` in position and `2.17e-15` in velocity for `M+`; the corresponding fractions of stored adjacent join allowances are about `7.68e-8` and `9.60e-10`. `M-` is comparable.
- **Measured:** the first independent-oracle driver attempt failed while constructing a literal zero-error history because removing all error radii exposed those tiny nominal join differences as discontinuities.

The failed driver attempt did not adjudicate the root cluster. Its `FAILED` and `STATUS=failed` markers describe the obsolete zero-error diagnostic, not a physical or native-certificate verdict.

## Corrected analysis waiting to run

`scripts/eom/analyze-section-86-self-root-candidate.py` now constructs a join-floor diagnostic history:

1. Keep every captured cubic coefficient unchanged.
2. At each nominal join, assign each adjacent segment half the position and velocity gap.
3. Verify every assigned join floor remains inside the original stored reconstruction envelope.
4. Run the separately authored Decimal interval oracle on both the original bounded histories and the join-floor histories.

This change was prepared immediately before the pause and still requires its focused test before the oracle rerun. The independent oracle under `scripts/eom/oracle/` must not be changed in the same adjudication.

## Resume sequence

Run from the repository root:

```bash
git status --short
shasum -a 256 .tmp/section86-self-root-adjudication/candidate.candidate-6.tsv
PYTHONPATH=. VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" tests/test_section_86_self_root_candidate_analysis.py
PYTHONPATH=. VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/eom/analyze-section-86-self-root-candidate.py --input=.tmp/section86-self-root-adjudication/candidate.candidate-6.tsv --output=.tmp/section86-self-root-adjudication/independent-oracle-adjudication.json
```

The oracle can take several minutes per path and emits its final record only on completion. If detached, it must be launchd-supervised with an observable heartbeat; do not infer a result from silence.

## Disposition rule

- If both original bounded histories certify: diagnose a native-certificate defect, isolate the native discrepancy against the unchanged oracle, add a captured regression, repair the native path, rebuild, and validate parity.
- If either original bounded history fails but both join-floor histories certify and every join floor is inside the stored envelope: record a stored-history reconstruction-envelope horizon. This means the nominal trajectory remains certifiable while the accepted reconstruction uncertainty is too wide; it is not evidence of a physical singularity.
- If the join-floor histories also fail: record the independent-oracle physical/numerical horizon as unresolved. Do not label it physical without an additional independent argument.

For every disposition, update the Section 86 evidence packet, `reference/priorities/braid-archive/braid-ideal/work-log.md`, and the replacement row in `reference/priorities/app-solver/claims-triage-ledger-2026-07-12.md`, then run the scoped validators before retirement.

## Paste-ready resume prompt

```text
Closure goal: Complete the paused Section 86 middle self-root adjudication from the preserved first failed endpoint, then either repair and validate the native certificate or record the supported horizon block.

Read reference/priorities/braid-archive/braid-ideal/section-86-self-root-adjudication-handoff.md and execute its resume sequence. Treat the live worktree and `.tmp/section86-self-root-adjudication/` as authoritative. Verify the candidate SHA-256 before analysis. Do not rerun the native replay if the preserved candidate matches. Keep the independent Decimal oracle unchanged, grade every claim, and update the evidence packet, work log, and claims-triage ledger only after the independent disposition is complete and validated.
```
