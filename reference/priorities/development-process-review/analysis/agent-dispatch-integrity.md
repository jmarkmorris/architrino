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

Publication and generator writes are outside this repair's scope; the startup router's informational fingerprint for the edited procedure is left for the authorized regeneration process.
