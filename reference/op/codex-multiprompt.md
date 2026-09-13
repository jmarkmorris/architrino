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

Prepare a request with `root` (absolute repository path), `body` (the worker instructions, without a separately authored hash block), and `sources` (a nonempty array of objects containing repository-relative `path`). An optional `expectedSha256` must come directly from the applicable machine-readable record and is checked strictly; do not copy it through model-authored text. Keep request and packet files in the existing ignored `.local-data/agent-dispatch/` directory, creating that directory as needed. Packets retain full prompts and should be treated as local diagnostic evidence, not published automatically.

```bash
node scripts/agent-dispatch.mjs prepare .local-data/agent-dispatch/request.json .local-data/agent-dispatch/packet.json
node scripts/agent-dispatch.mjs verify .local-data/agent-dispatch/packet.json
```

Preparation refuses to overwrite an existing packet. Verification recomputes the sources and rejects malformed hashes, changed files, altered messages and inconsistent byte counts. An empty, short, long or nonhexadecimal expected hash is rejected; a syntactically valid hash that differs from the file is also rejected. The local outgoing-message ceiling is 1 MiB of UTF-8, not a claim about provider capacity. The output is one JSON object; parse it programmatically and pass its `message` property directly to the host's authorized agent tool. Never reconstruct, summarize, trim or retype that property. Reject a failed command, truncated tool output or JSON parse error before sending. The worker must check the retained source identities before its first edit; a concurrent edit after dispatch remains possible.

In a Node-capable host adapter, use `sendDispatch(packet, message => hostSend({ message }))` from the helper. It revalidates immediately before invoking the sender and gives the callback the verified immutable string. Where host tools and filesystem access occupy separate runtimes, run the CLI `verify` immediately before sending and parse its complete stdout in the orchestration runtime; do not copy the returned message through a model response. A host that cannot transfer the result programmatically must stop that dispatch rather than fall back to hand transcription. This procedure does not authorize an agent launch that the task or host otherwise forbids.

The packet records exact message and source byte counts, message SHA-256, source SHA-256 values and the complete message. Retain the sender tool-call ID and receiver task ID alongside the packet when the host returns them. A successful send is not proof of receipt equality. For an observed discrepancy, extract the actual incoming message field from the receiver's raw session log to a UTF-8 file without adding a newline, retaining log path, line and timestamp. Compare it with:

```bash
node scripts/agent-dispatch.mjs compare .local-data/agent-dispatch/packet.json .local-data/agent-dispatch/received.txt
```

Comparison reports both byte counts and digests, equality, and the zero-based first differing byte and values; it exits nonzero on mismatch. It uses the retained payload rather than current source files so historical investigation remains possible. Retain the prepared packet, actual sender arguments, receiver message, command outcomes, host/tool versions when available, and correlation IDs for a bug report. A difference between packet and sender localizes a preparation/adapter defect; equal sender and receiver messages do not support transport corruption. Missing receiver evidence leaves transport unverified. Packet digests detect inconsistency, not malicious replacement of both payload and digest or proof of delivery. Do not attach private prompts or source content to an external report without operator authorization.

The maintained regression command is `node --test tests/agent-dispatch.test.mjs`. Its callback tests cover the local send boundary; its CLI tests cover file/stdout handling. Neither claims live provider boundary coverage. See the [September 12 incident and validation record](../priorities/development-process-review/analysis/agent-dispatch-integrity.md) for the motivating evidence.

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
