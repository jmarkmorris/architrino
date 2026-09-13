# Parallel Codex Thread Procedure

Responses and working-document capture follow the [operator explanation standard](operator-explanation-standard.md); explanatory prose follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).

Use this file when a task should be split across multiple Codex threads. The default meta-optimization wrapper lives in [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md); this file inherits that procedure and adds the Architrino-specific rules for safe parallel work.

## When To Split

Prefer multiple Codex threads only when parallel work is likely to improve quality, speed, or independent verification. Good splits have:

- disjoint write ownership;
- low expected file overlap;
- separate mathematical, code, source-mining, or validation questions;
- a clear main-thread integration owner;
- enough context to brief workers without making each worker reread the whole repo.

Keep the work single-threaded when the target is tightly coupled, the same file owns most of the answer, or one unified technical judgment matters more than parallel exploration.

## Current Default Bias

During the current core geometrical theory push, prefer splits that attack disjoint mathematical closure targets before app, presentation, or broad cleanup work. High-value split targets include:

- master-equation closure or delayed-action law work;
- potential/action proof programs and branch certificates;
- simulation continuation, convergence diagnostics, or falsifiable variable targets;
- mass-map, exposure, or medium-response derivation;
- nested shell braid causal closure, Lorentz recovery, or effective-metric recovery;
- photon, angular-momentum, spin, or Noether sea constitutive response work.

Use app/UI, PDG, animator, architecture, or presentation splits only when they directly unblock the selected theory target or the operator/developer explicitly selects that work.

## Pre-Split Checklist

Before launching worker threads:

- refresh the relevant priority markdown files, source files, and current git status from disk;
- name the shared closure objective and definition of done;
- set and verify launch names and task titles under [Agent and task names](operator-explanation-standard.md#agent-and-task-names);
- choose tasks with the lowest expected file overlap;
- assign each worker preferred write files and nearby files to avoid;
- decide which thread owns integration, conflict resolution, and final technical judgment;
- decide whether each worker should implement, review, explore, verify, or report only;
- preserve inherited model and reasoning settings unless an applicable instruction authorizes an override; use only settings supported by the current host.

## Worker Prompt Skeleton

### Machine-bound source baselines

For every worker dispatch that asserts source hashes, use [the dispatch helper](../../scripts/agent-dispatch.mjs). Do not transcribe measured hashes into assignment arrays or prompt prose. The helper reads source bytes, constructs the baseline block, checks optional externally supplied expectations, and measures the complete outgoing UTF-8 message. A source hash is a byte-identity check, not ownership or scientific acceptance. This helper is an agent-coordination consumer, not a competing A/B source-admission authority.

Prepare a request with `root` (absolute repository path), `body` (the worker instructions, without a separately authored hash block), and `sources` (a nonempty array of objects containing repository-relative `path`). An optional `expectedSha256` must come directly from the applicable machine-readable record and is checked strictly; do not copy it through model-authored text. Keep requests and unique capture bundles under ignored `.local-data/agent-dispatch/`, creating that parent directory as needed. Bundles retain private prompts and are not published automatically. Use the receiver's own `session_meta.payload.id`, not its inherited `session_id`; resolve both session logs before dispatch.

The [session recorder](../../scripts/agent-dispatch-session.mjs) binds one generated dispatch ID to source identities, exact UTF-8 payload bytes and host metadata. It preserves the original request even when validation fails. Source reads use one file descriptor and recheck identity; source changes after validation remain possible, so receiver admission is still required. All rejected/missing/opaque evidence is reported explicitly. The 1 MiB payload ceiling and 8 MiB receiver-log-window ceiling are local limits, not provider capacity claims. Do not retry a possibly delivered message automatically or reuse a finalized bundle.

For current native collaboration subagents, use the retained-file route. The app messaging API rejects direct input to these subagents, and their collaboration arguments and incoming agent-message bodies are encrypted in the available logs. Never bypass that host restriction or claim plaintext transport equality from an agent echo. Prepare the payload and start its bounded collector before notifying the receiver:

```bash
node scripts/agent-dispatch-session.mjs begin-native "$BUNDLE" "$REQUEST" "$RECEIVER_ID" "$SENDER_LOG" "$RECEIVER_LOG"
node scripts/agent-dispatch-session.mjs collect-file "$BUNDLE" 60000
```

Keep the collector watched using the host's returned process handle. Through the supported `collaboration.followup_task` channel, send only the bundle location and the instruction to run the following command before acting. Do not transcribe the payload or hash block. The command itself is authorized to write diagnostic receipts inside that bundle; the assignment's remaining write scope is whatever its original body permits.

```bash
node scripts/agent-dispatch-session.mjs receive-file "$BUNDLE" "$RECEIVER_LOG"
```

The receiver reads the retained packet directly, validates current source bytes and receiver identity, retains its observed packet/payload and emits a machine-written receipt plus the assignment. Failure or truncated output means stop before doing the assignment. The collector compares independently read payloads automatically. Its successful file result is `payload-verified-transport-unverified`, with `payloadVerified: true` and `verified: false`; exit status remains nonzero because complete transport verification is unavailable. A timeout is final for that bundle and prevents a late receiver from executing it. This route removes hashes from the model-authored collaboration message; it does not instrument the provider's encrypted plaintext boundary.

For an existing ordinary desktop task that supports app messaging and plaintext receiver logs, the [Codex adapter](../../scripts/agent-dispatch-codex.cjs) transfers the complete machine-produced message without model reconstruction. Load the trusted local adapter in `functions.exec`, then call it with the request, unique bundle, target ID and known sender/receiver logs. This creates no task and grants no permission to message an unrelated task. The minimal loading pattern is:

```javascript
// In functions.exec, with parameters supplied from the authorized assignment:
const source = await tools.exec_command({cmd: "cat scripts/agent-dispatch-codex.cjs", max_output_tokens: 7000});
if (source.exit_code !== 0) throw new Error(source.output);
const module = {exports: {}};
new Function("module", source.output)(module);
const report = await module.exports({tools, requestPath, bundlePath, threadId, senderLog, receiverLog});
text(report);
```

This adapter revalidates and saves the exact outgoing argument object before passing that same immutable object to the app tool, records its outcome, and collects the corresponding raw user-message record from the receiver log. It joins resumed command output and rejects parse/truncation errors before sending. Missing, ambiguous, opaque, rotated or malformed log evidence cannot pass. It records both byte counts and digests, first differing byte, receiver item ID/timestamp, task IDs and available host version. The app adapter has negative-control integration coverage; its live use on a native subagent was rejected and is not certified as working on that target class.

The retained `report.json`, request, packet, actual outgoing arguments (where available), incoming record or bounded failed-capture window, and host metadata form the local diagnostic bundle. Native bundles instead contain machine-measured receiver-file evidence and explicitly mark transport unavailable. Expected and observed source identities are included in source-mismatch errors. Digests detect inconsistency, not malicious replacement of every evidence file. Report native host limitations as an instrumentation request, not a demonstrated transport-corruption bug. External submission of private payloads requires operator authorization.

Run `node --test tests/agent-dispatch.test.mjs tests/agent-dispatch-session.test.mjs tests/content-integrity-reporting.test.js`. Both dispatch suites are required in local and GitHub Content Integrity; they cannot be skipped through the reporting-only sweep. Local commit/push validation reaches this gate through the exact-state PR receipt, while GitHub runs it for pull requests. Gate execution validates code, not delivery of a particular message. See the [incident and validation record](../priorities/development-process-review/analysis/agent-dispatch-integrity.md) for measured coverage, live evidence and the remaining host boundary.

Start each worker prompt with a concrete closure goal:

```text

[One concrete objective this worker can complete or advance independently.]

Context:
- Repository: `$REPO_ROOT`
- Workflow: [implementation / review / exploration / verification / source mining]
- Priority item, issue, or target file: [exact path and item number when applicable]
- Launch name/task title: [name following the operator explanation standard]
- Preferred write ownership: [files or directories this worker may touch]
- Avoid touching: [files, reports, generated outputs, or priority items owned by another thread]
- Reasoning effort: [inherited, or an explicitly authorized supported override]

Method:
1. Inspect the current files before proposing changes.
2. Complete one valuable end-to-end slice inside the stated ownership boundary.
3. Reuse existing project terminology and local patterns.
4. If working from a priority list and the item is completed, remove it from that list and renumber following items.
5. If the work makes a substantive theory advancement, capture it directly in `content/markdown/aaa` when corpus-solid, or stage it in `reference/priorities` with claim level, assumptions, proof burden, and intended corpus destination.
6. Run practical validation checks for the files touched, or explain why validation was not run.

Return:
- Files changed.
- What was completed.
- Validation run and results.
- Remaining risks or blockers.
- Any priority item removed or deferred.
- The next concrete step, with a recommendation and reason.
```

## Reasoning Effort Guidance

Where an override is authorized and supported by the host, these are workload recommendations rather than automatic setting changes:

- `high` or `extra high` for core geometrical theory closure, proof-route design, master-equation reasoning, branch certificates, and Lorentz/effective-metric derivations;
- `medium` for UI legibility, app-shell work, contract-shape edits, and most scoped refactor tasks;
- `high` for solver-core reasoning, provenance rules, search behavior, or other semantics-heavy implementation;
- `high` for large UI refactors only when the task likely requires deeper restructuring of a major coordinator or composition root.

## Integration Rules

The main thread owns integration. It should:

- compare worker findings against the live tree before applying or accepting them;
- resolve conflicts against live owners and independent evidence, preserving the narrowest supported claim while disagreement remains and stating the unresolved proof or validation obligation;
- keep shared files under one writer whenever possible;
- rerun the relevant validation after combining worker outputs;
- make the final capture decision for theory advancements.

## Feedback Loop

When parallel Codex threads create overlap, ambiguity, duplicated work, or idle integration time, add a one-line unchecked task to [README-op.md](README-op.md) under `Multi-Agent Use`.
