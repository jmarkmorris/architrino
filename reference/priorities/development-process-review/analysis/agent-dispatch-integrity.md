# Agent dispatch integrity — September 12, 2026

## Finding and scope

The CRW-005 priority-59 dispatch contained a 63-character SHA-256 literal although the immediately preceding `shasum -a 256` output contained the correct 64-character value. Inspection of the coordinator's recorded JavaScript locates the omission in its authored `assignments` array, before prompt interpolation and before `spawn_agent`. The worker received the exact shortened literal, detected the discrepancy by hashing the chapter, and confirmed the original bytes against commit `72847589ba73d0bf81d07ca5b27d98072659cee9`. The malformed value was missing the final `d`.

Measured by JSONL parsing and exact string comparison, the complete constructed priority-59 prompt, outgoing tool prompt and incoming worker message were identical: 2,601 UTF-8 bytes. The four sibling dispatches also matched their incoming messages exactly and retained their correct 64-character source hashes. These observations locate this incident in coordinator preparation; they do not demonstrate a transport defect. The model-level reason for the omitted character is unknown. A raw outgoing argument containing the complete hash and a corresponding incoming argument missing it would overturn the transport disposition for that handoff.

This was an ad hoc corpus-review coordination path. Its recorded code did not invoke the Option A dependency checks or Option B admission machinery. The [knowledge architecture](../../../op/git/git-backed-knowledge-architecture.md) owns those obligations. A dispatch identity does not accept a source for scientific computation, assign edit ownership, or supersede B records. The worker receipt's phrase “operator-supplied string” describes the received assignment role imprecisely: the coordinator authored this literal. The historical receipt and other workers' files are preserved without modification by this repair.

## Original evidence locators

Session logs are under the operator's local `.codex/sessions/2026/09/12/` directory. They are local evidence, not repository deliverables or external attachments.

- Coordinator: `rollout-2026-09-12T08-22-35-01a09591-cbca-75c3-883b-5f8bd1f9efeb.jsonl`, line 3687: full hash in command output at `2026-09-13T00:24:23.622Z`; line 3688 also retains it in the model-visible tool output. Line 3692: shortened literal in the submitted JavaScript. Line 3695: outgoing priority-59 prompt.
- Worker: `rollout-2026-09-12T20-24-45-01a09826-f603-7410-9302-d674b501170f.jsonl`, line 73: incoming priority-59 prompt; line 107: worker's full baseline hash; line 255: pre-edit full baseline hash.
- Durable original account: [Cosmology Ontology receipt](../../aaa-corpus-rewrite/evidence/crw-005-cosmology-ontology-review-2026-09-12.md).

The following values were measured by `Buffer.byteLength(prompt, 'utf8')` against the coordinator's five recorded `CollabAgentToolCall` messages and exact comparison with each receiver's `response_item` user-message text. The JSONL extractor first passed a synthetic known case for line numbering and hash-field extraction. Each prompt happens to be ASCII, so its JavaScript string length equals its UTF-8 byte count; that equality must not be assumed for future Unicode prompts.

| Priority | UTF-8 bytes sent and received | Hash characters received | Receiver task ID | Entire message equal |
| --- | ---: | ---: | --- | --- |
| 58 | 2706 | 64 | `01a09826-f593-79e3-84d7-78582ff9ba4e` | Yes |
| 59 | 2601 | 63 | `01a09826-f603-7410-9302-d674b501170f` | Yes |
| 60 | 2632 | 64 | `01a09826-fb01-7130-9a5e-f9e44316ebcd` | Yes |
| 61 | 2607 | 64 | `01a09826-f81e-7250-9ebe-3ee23ee38718` | Yes |
| 62 | 2587 | 64 | `01a09826-f701-7670-b244-f17f8258e3db` | Yes |

## Implemented local protection

[The maintained helper](../../../../scripts/agent-dispatch.mjs) computes source identities directly from file bytes and formats the source block itself. Optional expected hashes are strictly validated before comparison; malformed or mismatching records prevent sending. The verifier recomputes source identities and checks source sizes, complete message, UTF-8 byte count and message digest. The local sender callback runs only after verification. The CLI prepares exclusive local packets, verifies before emission, and compares retained messages with raw received bytes. The [parallel-agent procedure](../../../op/codex-multiprompt.md#machine-bound-source-baselines) requires this path for source-bound dispatches and forbids model transcription of message output.

The helper reports the first differing byte and both identities for diagnosis. It does not claim provider instrumentation, automatic interception of every host tool call, protection against an agent ignoring the procedure, or a filesystem lock that prevents changes after dispatch. Workers must verify the retained baseline before editing. A provider bug report requires actual evidence of divergence across its boundary, with correlation IDs and exact payloads; this incident currently supplies evidence of a preparation bug. No external report was filed.

## Validation

The [regression suite](../../../../tests/agent-dispatch.test.mjs) starts with the independent published SHA-256 `abc` vector from the existing known-answer data owner, not an expected digest derived by the subject. Tests exercise malformed and wrong expected values at preparation and at the pre-send callback boundary; invalid inputs must invoke the sender zero times. Cases include empty, 63-character, 65-character, oversized, nonhexadecimal, uppercase, wrong type, terminal newline and syntactically valid but incorrect hashes. Additional controls cover altered source bytes, missing sources, modified packets, byte-count disagreement, duplicate/path-invalid sources, Unicode preservation, the exact local 1 MiB boundary, payload differences, and CLI non-overwrite/error behavior.

The original formatter replay accepted invalid hash lengths while preserving the text; that established its missing validation, not transport capacity. The replacement suite distinguishes hash syntax, source identity, local message capacity and received-message equality. Its Node and CLI controls do not test live provider size limits or certify all provider transports.

Measured on September 12 with `node --test tests/agent-dispatch.test.mjs`: all 10 tests passed, with zero failures or skips. The source-path negative control uses an existing outside-root file, so rejection is specifically containment rather than a missing-file error. A multiple-source control confirms a later source mismatch prevents the entire dispatch. The UTF-8 size control includes a multibyte character crossing the ceiling. `git diff --check` passed for the owned tracked edits. `node scripts/build-agent-startup-orientation.mjs --check` reported routing current; its source fingerprints are informational. These are scoped checks, not a full repository-health result.

## Integration and controlled handoff — September 13 UTC

The [session recorder](../../../../scripts/agent-dispatch-session.mjs) binds retained requests, prepared payloads, outgoing arguments where available, receiver observations and host metadata to a generated dispatch ID. It automatically retains discrepancy reports, byte counts, digests, first differing byte and raw evidence. Malformed expectations and source mismatches preserve the rejected input and observed identities. Missing, ambiguous, opaque or invalid log records cannot establish delivery; finalized timeouts prevent late file admission. The [desktop adapter](../../../../scripts/agent-dispatch-codex.cjs) passes the same verified immutable argument object to the app messaging tool. It is covered by injected host controls; a successful live ordinary-task app transport was not measured in this investigation.

The controlled live native-subagent attempt returned `isError: true` with `direct app-server input is not allowed for multi-agent v2 sub-agents`. Native collaboration records retained encrypted message content rather than usable plaintext at both boundaries. The receiver independently inspected its canonical record: `response_item` / `agent_message`, ID `amsg_01a098b3-9c3c-7462-81fd-f103302f3601`, timestamp `2026-09-13T02:58:22.908Z`, with an `encrypted_content` field. These observations establish an instrumentation limitation, not transport corruption. No attempt was made to bypass the host restriction.

The native route instead hands the receiver a retained packet location; the receiver reads and validates machine-computed source identities directly, before returning the assignment. On the final live run, `receive-file` and `collect-file` measured identical prepared and independently received payloads of **636 UTF-8 bytes**, SHA-256 `2a72149d9ab6e8686aa82722167f27b463bb525ddc024769921078b5bab32d61`. The receiver also independently ran `shasum -a 256` against the source fixture. This establishes file-payload agreement and source identity at admission; it does not establish native message-transport equality. The report therefore says `payload-verified-transport-unverified`, `payloadVerified: true`, `verified: false`, and exits nonzero. A differing receiver payload or source digest would overturn the successful file-admission result.

Retained local evidence is under `.local-data/agent-dispatch/controlled-live-27y4CG/`:

| Bundle | Dispatch ID | Measured result |
| --- | --- | --- |
| `bundle/` | `f231feed-b32b-4acc-9eda-8d5cadd251c4` | App host rejected the native target; 743 prepared/outgoing bytes, no verified incoming record |
| `native-bundle/` | `5f9c0941-24d3-4d88-b78f-b2f4e043eb0d` | Initial live retained-file handoff: 743 matching payload bytes; transport unverified |
| `final-bundle/` | `a5f5b371-eacc-44d8-9a72-41c0e41e6c7f` | Final hardened receiver: 636 matching payload bytes; transport unverified |

The final report at `final-bundle/report.json` was measured with `wc` and `shasum -a 256`: 2,376 bytes, 63 lines, SHA-256 `e39d4529619dbdaf524aa38788c95e9913139fa6c96c99c94c9bb968dab0c1a0`, recorded at `2026-09-13T03:08:45.097Z`. Its observed receiver packet is 1,462 bytes, SHA-256 `d2a052ccf61cc5f87ab6bb5d845118366f16e11da2e80107bd07db3c0a320b36`. The source is `scripts/equation-mapping/fixtures/known-hash-answers.json`, 1,304 bytes, SHA-256 `c95f34944cf5ee2cac3c3e747241e4cc39a10099259b8f2f34c1415b1eec3a94`. These digests describe retained evidence; they are not executable fixed expectations.

Sender session ID: `01a09847-3746-7073-826f-f1081eef056f`; receiver session ID: `01a098aa-46bd-7940-876e-2a28fd5341b4`. The corresponding September 12 local session files start `rollout-2026-09-12T20-59-59-` and `rollout-2026-09-12T22-48-11-`, respectively. Session metadata reports Codex Desktop version `0.154.0-alpha.6.2`. Full native plaintext verification requires host-supported sender/receiver byte receipts or accessible canonical plaintext records tied to a dispatch ID. This is a prepared instrumentation request; no external report was submitted and no provider corruption is alleged.

## Expanded regression and gate evidence

Measured with `node --test --test-concurrency=1 tests/agent-dispatch.test.mjs tests/agent-dispatch-session.test.mjs tests/content-integrity-reporting.test.js`: **37 tests passed, zero failures or skips**. The [session suite](../../../../tests/agent-dispatch-session.test.mjs) adds truncation, insertion, substitution, Unicode byte changes, missing/duplicate messages, incomplete JSONL, invalid UTF-8, mixed opaque content, host rejection, wrong receiver, log replacement and same-inode rewrite, late admission, source mismatch detail retention, and resumed command output. Parser controls run on known records, and `Aé🧪` has an independently hand-counted seven-byte UTF-8 expectation. Injected host controls establish adapter behavior, not live provider reliability. Independent receiver review identified opaque-content and log-continuity weaknesses that were corrected before the final test run.

The required `Test agent dispatch validation and handoff evidence` row in [Content Integrity](../../../../scripts/check-content-integrity.mjs) runs both dispatch suites for local and GitHub profiles. Executing that selected row through `selectedChecks` and `runChecks` ran **27 passing tests**, with one required gate passed and zero failed, skipped or unreached gates. The reporting suite confirms an injected failure makes this required row fail the gate. This is a selected-gate result, not a full Content Integrity run. Local commit/push receipt validation and the pull-request Content Integrity workflow reach this row; exact-state receipt reuse follows the existing publication rules. Gate execution tests implementation and does not certify any individual delivery.

`node scripts/validate-content.mjs --check --strict` reported zero errors and zero warnings; `git diff --check` passed. Publication and generator writes are outside this repair's scope; the startup router's informational fingerprints are left for the authorized regeneration process.
