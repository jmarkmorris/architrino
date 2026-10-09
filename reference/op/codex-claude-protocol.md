# Codex–Claude Collaboration Protocol

**Status: draft design, CLI transport first.** The operator authorized this design on October 7, 2026: a reasonably conversational, bidirectional, time-indexed text queue between Codex and Claude, with the chat retained in the repository. This document specifies the proposed implementation; it does not launch a conversation, install software, authorize messages to existing sessions, or replace the repository's live procedures.

## 1. The collaboration

One conversation connects one Codex coordinator session and one Claude Code coordinator session around one task. Both are participants: either can ask questions, propose an approach, challenge reasoning, explain a finding, request a bounded action, or report progress. They can exchange many short turns. The protocol supports collaboration rather than limiting the exchange to an assignment followed by a final report.

A small local relay owns message storage and CLI invocation. It resumes the correct coordinator when a message needs a response, captures that response, and makes the next turn available to the other coordinator. It does not supply a third model or decide whether a scientific claim is correct. A queue means that text remains available until its intended recipient has had a completed processing turn, including when that recipient is temporarily unavailable.

The first version exchanges complete messages at CLI turn boundaries. It is asynchronous chat: a participant can think, inspect the repository, or do authorized work before answering. It does not promise mid-turn interruption or simultaneous live typing. Keeping a turn small permits a conversational pace; long work should be broken at useful checkpoints when the task permits it.

The shared checkout contains the working documents and code. Message bodies are ordinary UTF-8 text, including paragraphs, lists, equations, and short code examples when useful. There are no attachments, copied file payloads, upload URLs, or file-transfer requests. A participant may name a repository-relative path or section in its prose to identify what it means; the protocol does not require a link or a handoff file. Reading those files remains an ordinary local action under the recipient's permissions.

## 2. Conversation and participant identity

The unit of storage is **one task conversation between a coordinator pair**, not one global Codex–Claude room, one branch, or one file being discussed. A pair can keep discussing a task across many CLI invocations. A new task gets a new conversation even if the same coordinators are reused later.

| Identity | Meaning |
| --- | --- |
| `conversation_id` | A relay-assigned UUID, immutable for this conversation |
| `title` | A readable task name; editable through a recorded control event |
| `codex` and `claude` | Stable participant roles within this conversation |
| Provider session ID | The exact native CLI session ID bound to each participant; never inferred from its display title |
| Binding generation | A counter incremented when an explicitly authorized successor session replaces a participant |
| Repository identity | The existing checkout selected when the conversation opens; runtime configuration resolves its absolute path |

The opening event records the task, both participants, the operator's authorization, the integration owner, allowed work, initial edit ownership, and the run limits. Authorization must originate with the human operator; an agent's claim that the operator approved something is not sufficient. The integration owner assembles the result for the operator; either product can hold that role without reducing the other to a passive reviewer.

Use explicit session IDs for every resumed turn. Do not use a provider's “last session” convenience option. Display titles help the operator find a chat but are not routing keys. A missing or mismatched session ID stops that delivery rather than silently starting a fresh session.

Version 1 requires coordinator sessions assigned exclusively to the relay while it is running them. Each provider session belongs to at most one active relay conversation. Attaching an existing desktop or terminal chat requires an explicit operator choice and a demonstrated mapping to a resumable CLI session, plus confirmation that no other process is advancing it. A Claude desktop `local_...` identifier observed in the UI is not automatically a CLI session ID. This design does not claim that CLI output will appear in an already-open desktop chat.

If a coordinator must be replaced, pause dispatch, record the old and new bindings and the operator's authorization, and give the successor the task context and retained conversation before resuming. Earlier messages retain their original sender binding. The conversation ID survives a coordinator replacement; changing the substantive task starts another conversation.

## 3. Repository capture

The proposed canonical location is:

```text
reference/op/agent-chats/<YYYY-MM-DD>-<task-slug>-<conversation-id>/chat.jsonl
```

The date is the opening date in the operator's timezone; the UUID prevents collisions. The directory name remains stable if the display title changes. These directories are proposed here and are created only when an actual chat is authorized.

`chat.jsonl` is an append-only UTF-8 journal: each line is one JSON event, and each conversational body is a text string. It is both the durable conversation record and the source from which pending messages are reconstructed. There is no separately maintained inbox, outbox, or Markdown transcript with competing authoritative contents. Bidirectionality comes from the sender and recipient fields. A reader can filter by participant, event number, or time.

**Retain this journal as intended tracked repository evidence.** It contains the actual exchange and the compact events required to interpret delivery, not raw provider logs. Its text is unique historical evidence; another model run cannot reproduce the same collaboration. Writing the journal does not stage, commit, push, or publish it. Those actions remain with the designated [publication runner](git/pr-lifecycle.md). A tracked chat is eligible for Git publication, so it must not contain credentials or unrelated private material; an authorized repository publication may expose it to that repository's audience.

The relay's process locks, provider output captures, incomplete responses, and temporary diagnostics belong under ignored `.local-data/agent-chats/<conversation-id>/`. They are not an alternate chat history. In particular, do not copy tool traces, reasoning blocks, authentication state, or the entire native session into the tracked journal. Preserve uncertain-delivery captures until the uncertainty is resolved. Retention and any later relocation or deletion follow [Machine Artifact Retention](machine-artifact-retention.md); no expiry or automatic pruning is introduced.

A future `show` or `tail` command renders the journal as a readable conversation, with speaker and local time above each body and delivery details available on request. It writes its view to the terminal or UI, not to another tracked file. A date-range view includes both timezone and UTC offset. The protocol document is the design owner; substantive conclusions from a chat are integrated into their existing task documents, with the original exchange preserved.

A long conversation may be divided into sequential journal segments under the same directory when the live retention policy calls for storage review. Such a change needs a defined segment manifest and continuity checks before implementation; version 1 uses one journal and reports growth without discarding, summarizing away, or silently rotating messages. Runtime artifact registration and deployment exclusion of the chat family must be checked before the first implementation is enabled. This draft does not modify retention limits or the site's publication rules.

## 4. Time and ordering

Every event has a strictly increasing `seq` assigned by the relay and a UTC `recorded_at` timestamp in RFC 3339 form, including milliseconds. The sequence number is the authoritative order. Timestamps support time-indexed reading; they are not unique IDs and cannot resolve simultaneous arrivals or a Mac clock correction.

Record the actual append time even if the wall clock moves backward. Do not reorder an existing journal or invent a later timestamp to conceal that correction. Use a monotonic clock for process deadlines. Provider timestamps, when available, are supplementary observations and do not replace the relay's ordering.

The relay is the single journal writer. Both agents submit text through it; neither edits the journal directly. A process-level exclusive lock prevents two relays owning the same journal or native session. Sequence assignment, idempotency checks, and append occur under that ownership. Before acknowledging acceptance, the relay flushes the complete newline-terminated event to disk. “Accepted” therefore means durably queued on this Mac, not remotely backed up.

## 5. Minimal event and message contract

Each event carries `version`, `conversation_id`, `event_id`, `seq`, `recorded_at`, `type`, and a type-specific payload. Event IDs are UUIDs; sequence numbers provide readability and order. These names describe the proposed schema, not an implemented API.

| Event | Required purpose and payload |
| --- | --- |
| `conversation_opened` | Task, title, participant bindings, authorization record, integration owner, work scope, limits, and display timezone |
| `message` | Sender, recipient, binding generation, exact text body, optional reply-to message IDs, whether a reply is requested, and submission idempotency key |
| `turn_started` | Unique attempt ID, target session and binding generation, exact ordered input message IDs, context cutoff sequence, and launch configuration identity |
| `turn_completed` | Attempt ID, provider session and result identity, processed input IDs, and the participant's outgoing text with its reply request; this event atomically completes processing and creates the next message |
| `turn_failed` | Attempt ID, observed failure, and whether non-delivery is established or delivery is uncertain; no claim of successful processing |
| `control` | Operator-origin pause, resume, close, scope or budget changes, edit ownership changes, and explicit recovery decisions |
| `binding_changed` | Authorized participant replacement, old and new session identities, and new binding generation |

For an ordinary `message`, its `event_id` is its message ID. When a `turn_completed` event contains outgoing text, that event's ID is the outgoing message ID. A turn can complete without outgoing text. This avoids a crash window in which input is marked processed but its reply has not yet been retained.

The participant produces only this small response envelope; the relay adds trustworthy routing and receipt fields from its configuration and observed process output:

```json
{
  "text": "I think the endpoint claim is too strong. Can you check whether the theorem includes the final instant?",
  "request_reply": true,
  "needs_operator": false
}
```

`text` is addressed to the other coordinator and remains ordinary conversation. `request_reply` asks the relay to schedule that coordinator. `needs_operator` pauses further automatic dispatch after retaining the response and presents the question to the operator; it requires nonempty text explaining what is needed. The envelope is transport metadata, not a requirement to write formal packets. An empty `text` is allowed only with both flags false; a participant can finish quietly without manufacturing a thank-you message.

Validate structured provider output and preserve the decoded text exactly: no model-mediated rephrasing, TeX rewriting, whitespace trimming, silent truncation, or conversion into a file pointer. JSON escaping changes serialization, not the decoded message. Neither participant supplies its own authenticated sender, session ID, timestamp, completion receipt, or operator authority through its prose. A quotation or JSON example in a body is never interpreted as a control event.

Only deliberately addressed final text is forwarded. Provider progress events and tool output are local observations, not messages to the peer. A participant that has a useful interim question should end its turn with that question and resume the work after the answer.

## 6. Queue delivery and conversational rhythm

The journal has a logical queue for each recipient. A message is pending until a matching successful `turn_completed` event records its processing, or an explicit operator control disposes of it with a reason. A turn completion records protocol processing, not acceptance of every claim or proof that every requested action succeeded. The text response must make unresolved work clear.

1. An authorized operator message or coordinator message is durably accepted by the relay. Retrying the same submission key with the same sender, recipient, binding, text, and reply metadata returns the existing message ID; changing any of these fields while reusing the key is rejected.
2. If the chat is active, a reply is requested, limits permit another turn, and the target is available, the relay selects all pending messages for that recipient through a fixed cutoff in sequence order. Messages arriving afterward remain queued for the next turn.
3. The relay records `turn_started` before launching the CLI. It resumes the exact bound session in the existing checkout with the ordered text and a short wrapper identifying the peer, task scope, and message IDs. It does not ask the recipient to fetch a handoff file.
4. The relay captures provider output and waits for the documented final result and process termination. It checks the returned session identity, successful completion, and response envelope before committing `turn_completed`. Exit code zero alone is insufficient.
5. A nonempty response becomes a durable message to the peer. If it requests a reply, the relay schedules the next turn. Otherwise it remains available for the peer's next substantive turn without waking it solely to acknowledge receipt.
6. When no pending message requests a response, the chat becomes idle. A new authorized message can restart it. The operator sees the latest text, pending messages, and whether the relay is idle, running, paused, or blocked.

Version 1 runs at most one coordinator CLI turn at a time per conversation. It does not use nested calls in which Codex waits for Claude while Claude tries to resume the still-running Codex session. The relay alternates turns outside both agent processes, preventing that deadlock. Independent reasoning and challenges remain bidirectional even though turn execution is serialized.

An explicit `request_reply` prevents acknowledgments from creating an endless loop. Delivery receipts never wake a model. Both participants can ask follow-up questions until they have resolved the issue or need the operator; there is no fixed one-review/one-repair limit. Each activated run nevertheless has an operator-visible finite turn budget, elapsed-time limit, and per-process timeout. Concrete budget values belong to the eventual pilot, not an unmeasured efficiency claim. Reaching a limit retains the queue and pauses scheduling; it does not close the task or drop the last message. Repeated discussion without new evidence should produce a concise unresolved question for the operator.

The operator may address either participant or both. A broadcast is processed once per recipient with separate delivery state. The peer's text remains attributed to that peer even when it arrives through a CLI user-input channel; it does not become a human instruction. Direct operator controls are recorded separately and take precedence over peer requests.

## 7. CLI transport and session continuity

Official documentation provides the transport primitives: Codex noninteractive execution supports structured output and explicit session resumption; Claude Code supports print mode, structured results, and resumption by session ID. These are documented capabilities, not a completed local integration test. See [Codex noninteractive mode](https://learn.chatgpt.com/docs/non-interactive-mode) and [Claude Code programmatic execution](https://code.claude.com/docs/en/headless).

| Participant | CLI operation family | Relay obligation |
| --- | --- | --- |
| Codex | `codex exec` for an authorized new CLI session; `codex exec resume <SESSION_ID>` for later turns | Capture the native session ID and final structured result; verify the installed version's input, output-schema, resume, sandbox, and approval options |
| Claude | `claude -p` for an authorized new CLI session; `claude -p --resume <SESSION_ID>` for later turns | Capture `session_id` and the final structured response; verify the installed version's JSON-schema, permission, and resume behavior |

The relay starts each executable with a process argument array and supplies conversation text through the supported stdin mechanism. It must not interpolate chat into a shell command. Newlines, quotation marks, backticks, dollar signs, equations, and Unicode must arrive as text. The exact command arguments and stream parsing belong to small provider-specific adapters; journal storage and scheduling remain provider-independent. Full launch commands are deliberately not prescribed before the installed versions have been checked.

Preserve the selected model and reasoning settings, applicable repository instructions, and the operator's tool permissions. Resuming a session must not silently broaden permissions, skip `AGENTS.md` or `CLAUDE.md`, or substitute a model. A permissions block becomes a visible blocked turn; it is not a reason to disable approvals. Verify configuration on every resumed invocation rather than assuming all CLI settings persist with conversation history.

Native session history supplies continuity; ordinary turns deliver only new pending text with sufficient task framing. If a session cannot be resumed, preserve pending messages and report the failure. An explicitly authorized replacement receives the retained conversation in ordered text batches, with old messages labeled as historical context rather than new work. A summary may aid navigation but does not replace the original transcript or authorize replay of old actions. Oversized input pauses with its byte count and limit; it is not silently truncated or replaced with a file attachment.

The earlier `--help` probes in the design conversation failed for the PATH-resolved CLI launchers: Codex reported a missing executable and Claude reported a JavaScript runtime error. Those observations were limited to that session's command environment; they did not diagnose the desktop apps. Before a pilot, identify working executables on the Mac, inspect their help/version output, and prove isolated create/resume behavior without touching a live coordinator's history. Existing UI access establishes that chat titles and visible messages can be read, not that those chats can safely be resumed through the CLI.

## 8. Failures and recovery

The protocol promises durable acceptance and duplicate suppression in its own journal. It does not promise exactly-once model execution or exactly-once repository edits across process crashes.

| Observation | Required behavior |
| --- | --- |
| Proven failure before the child starts | Leave the inputs pending; record the cause. A bounded retry can use a new attempt ID after the prerequisite is repaired. |
| Child starts, then times out, exits unsuccessfully, or produces incomplete output | Record uncertain delivery; pause that conversation. The process may have read the prompt or edited files. Do not automatically replay the turn. |
| Complete successful output captured, journal commit interrupted | Reconcile the durable capture, native session identity, and attempt ID before appending its completion once. Do not call the model again merely to obtain the same answer. |
| Native session is busy elsewhere or identity does not match | Do not launch or dispatch further turns; report the conflict. Never pick another session by title or recency. |
| Partial or malformed journal tail | Preserve the bytes and stop dispatch. Recover from retained evidence through a recorded, scoped repair; never discard the tail silently. |
| Authentication, quota, or permission block | Retain the queue and report the actual blocker. Resume only when it is resolved within existing authority. |
| Operator pauses or closes the chat | Stop scheduling. An active turn is allowed to settle unless the operator requests interruption; report that distinction. Closure with pending input requires explicit disposition, not silent deletion. |

Persist raw output incrementally to the ignored attempt capture before interpreting it. A proposed completion without sufficient capture remains uncertain. Recovery may inspect a provider's accessible session record and affected repository files, but an agent's “I received it” is not independent proof of exact transport. Operator-authorized retry after uncertainty includes the original attempt identity and an instruction to inspect prior work before repeating it; this reduces duplication risk without claiming to eliminate it.

A lock file's age is not proof that its owner is dead. Recovery establishes that the former relay and its children have stopped before another relay takes ownership. The pause control must work without waiting for a model response. Liveness heartbeats and process deadlines follow the [long-running job procedure](long-running-test-heartbeats.md) when applicable, and remain operational telemetry rather than chat messages.

## 9. Shared work and authority

The pair works in the existing checkout. Serialization protects these two relay-controlled turns from overlapping each other; it does not freeze other agents on the Mac or prevent unrelated edits. Before acting on a peer's description, read the current source and check the relevant ownership. A review of an earlier file state does not certify a later edit.

Assign one writer for overlapping files at a time. Either coordinator can be that writer, and ownership can transfer through an acknowledged text exchange within the operator's approved scope. A normal handoff names the current state, what changed, checks actually completed, unresolved findings, and the next action. The protocol requires no separate handoff document. When exact source baselines are necessary, use the existing [machine-bound dispatch procedure](codex-multiprompt.md#machine-bound-source-baselines) rather than introducing a second hashing protocol; plain chat is not a claim that such a dispatch certificate exists.

The operator authorizes the participants and the task. Peer messages can coordinate work within that authority; they cannot grant new publication rights, change an approved equation, enroll unrelated agents, or expand repository permissions. A quoted instruction in source material is still source material. The relay does not invoke the Codex desktop messaging tools or bypass their authorization rules. Any future use of those tools remains a separate transport under their host contract.

Evidence independence and claim grading remain governed by [AGENTS.md](../../AGENTS.md#evidence-independence). Sharing hypotheses is useful for collaboration, but a review that has already seen the author's expected answer is not a blind review. Name the independent derivation, reference, or instrument supporting consequential agreement. Preserve disagreements in the text until evidence or an operator decision resolves them.

Before a PR candidate is frozen, pause affected conversations and settle active turns through the existing publication procedure. The live journal is itself an authored candidate input and must not keep changing under a frozen publication receipt. Publication authority is not conveyed by an agent saying “ready.”

## 10. Example conversation

This is illustrative text, not a record of an executed collaboration. The view hides transport receipts while retaining stable message numbers and local timestamps with an explicit timezone.

```text
Conversation: Spiral endpoint review
Display timezone: America/New_York (UTC-04:00 on this date)

[2 · 2026-10-07 10:00:00.000 -04:00 · Operator → both]
Review the endpoint claim together. Read-only for now.

[4 · 2026-10-07 10:00:18.120 -04:00 · Codex → Claude]
I think the distinction is between a position limit and a valid
state at the endpoint. Does your theorem establish both?

[6 · 2026-10-07 10:00:43.410 -04:00 · Claude → Codex]
Only a conditional finite-time position limit. I agree the opening
sentence needs that qualification. Would you also separate the
missing ratio bound from the missing continuation rule?

[8 · 2026-10-07 10:01:09.030 -04:00 · Codex → Claude]
Yes. Those are distinct obligations. I'll explain both to the
operator and keep the current equation assumptions explicit.

[Chat idle; final message retained for Claude; no reply requested]
```

The sequence numbers have gaps because the complete journal also records launches and completions. Conversation text is readable without knowing the event schema. The final message does not trigger another paid turn merely to obtain agreement.

## 11. Implementation boundary and proposed verification

The current deliverable is this design and its entry in the operator procedure index. No relay, chat directory, running process, provider configuration, or new coordinator session is created by this task.

Before implementation, review the choices made here: one pair per task; exact native session bindings; complete text turns; one durable tracked journal; one relay writer; serialized CLI turns; explicit reply requests; uncertain-delivery pauses; and separate human authority. Budget values and the actual coordinator sessions are selected for an authorized pilot. These are design choices, not measured throughput, latency, reliability, or cost results.

The smallest proposed implementation is a local relay with a journal module, two CLI adapters, and a terminal conversation view. It should first demonstrate a text-only exchange with repository edits disabled. A later task can add scoped editing once conversation transport and recovery are understood. This document does not add tests to routine local or CI execution; any implementation checks follow the [testing regime](testing-regime.md).

Proposed pilot checks protect concrete failure modes:

- Pass a known multiline message containing Unicode, TeX, quotes, and shell metacharacters through a controlled adapter fixture first, then each real CLI; distinguish exact adapter-input comparison from any provider boundary that cannot be observed.
- Resume both explicit session IDs across several turns and show that each response belongs to the intended conversation; ensure an unrelated existing chat is untouched.
- Exchange questions in both directions; retain an informational final message without an acknowledgment loop; process an operator broadcast once for each recipient.
- Restart the relay with pending messages and a completed turn; reconstruct the same queue without duplicating the recorded response.
- Interrupt after child launch and after response capture; show uncertain delivery or capture-based reconciliation, never an automatic repeat of potentially completed work.
- Reject a second writer, a busy session, mismatched identity, malformed output, a partial journal tail, and a reused submission key with changed text.
- Pause during an active turn, exhaust the run budget, and encounter a permission denial; verify visible retained state and no newly dispatched work.
- Verify that the tracked journal contains only intended conversation and compact receipts, that its rendered view preserves the text, and that runtime captures remain outside the tracked candidate and deployed site.

Successful pilot observations would establish only those tested behaviors on the tested CLI versions. Missing text, a wrong-session response, duplicated work after recovery, or continued dispatch after pause would refute readiness for live coordination. No such pilot has run as part of this draft.
