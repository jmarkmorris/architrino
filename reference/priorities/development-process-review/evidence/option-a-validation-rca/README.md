# Option A RCA: evidence index and coverage

This bundle supports the [independent RCA](../../analysis/option-a-validation-root-cause-analysis.md). It contains new read-only measurements and diagnostic source, not repaired subjects or copies of private conversations. A separate investigator is not itself independent evidence: independent support here comes from Git objects, a retained receipt, exact raw message boundaries and known-answer controls.

## New evidence

| Artifact | Instrument and meaning | Limit |
| --- | --- | --- |
| [Historical comparisons](historical-transitions.json) | [inspect-history.mjs](inspect-history.mjs): `git show`, `git cat-file`, SHA-256 over complete bytes and narrowly asserted literal extraction | Selected paths and revisions, not a general parser or exhaustive pin census; no historical code executed |
| [History controls](history-controls.txt) | Known `abc` digest, unique/absent/duplicate extraction, exact substitution, duplicate refusal, LF/CRLF/BOM and frozen-pair/abbreviation controls | Passed before each target run; proves these diagnostic operations, not source correctness |
| [Enclosure diff](enclosure-transition.diff) | Actual `897fe1aa7` change to source/checker paths | Source-byte transition, not author intent or mathematical acceptance |
| [Import propagation diff](repair-propagation-transition.diff) | Actual `d52665793` changes to four subject tests and refined preparation/runner | Shows omitted propagation at these edges |
| [Expectation repair diff](repair-expectation-transition.diff) | Actual `baa3e7323` changes to historical fullEntry, preparation and runner | Reconstructed intermediate identity does not identify the uncommitted write order |
| [Git environment repair](git-environment-isolation-repair.diff) | Actual `f285eb4f4` hook, runner and test changes | Patch corroborates the unsafe predecessor path; original triggering invocation unavailable |
| [Fixture-author range](hook-window-git-log.txt) | `git log --reverse --format='%H %aI %an <%ae>' e445ecc60^..6591e553f` | 22 inclusive records; author field does not identify the operating agent or prove every hook was bypassed |
| [Dispatch boundaries](dispatch-boundaries.json) | [inspect-dispatch.mjs](inspect-dispatch.mjs): static JSONL/template extraction, historical Git source hashes and full UTF-8 message comparisons | Five complete locally observable dispatches; no provider-internal packet capture |
| [Dispatch controls](dispatch-controls.txt) | Independently known SHA, positive/negative JSONL and template cases, malformed versus intentional abbreviation, UTF-8 byte behavior | Recorded before target use; archived coordinator code is not evaluated |
| [Current dispatch TAP](dispatch-current-tests.tap) | `node --test tests/agent-dispatch.test.mjs`, inspected current code, ten passes | Small local helper regression; neither live transport certification nor historical proof |
| [Document check](document-check.txt) | [check-documents.mjs](check-documents.mjs): diagnostic controls followed by local-link/format and whitespace checks of this delivery | Does not validate scientific claims, remote URLs or heading fragments |

Run the historical controls before the target; do not edit either subject to make agreement:

```bash
node reference/priorities/development-process-review/evidence/option-a-validation-rca/inspect-history.mjs controls
node reference/priorities/development-process-review/evidence/option-a-validation-rca/inspect-history.mjs history
node reference/priorities/development-process-review/evidence/option-a-validation-rca/inspect-dispatch.mjs controls
node reference/priorities/development-process-review/evidence/option-a-validation-rca/inspect-dispatch.mjs dispatch
```

The dispatch command requires the original private local session files referenced inside the instrument. Their absence elsewhere is an unavailable-input result, not a failed byte comparison. Raw messages are deliberately omitted from tracked output. SHA-256 values and byte counts authenticate comparisons but do not reconstruct the omitted private text.

## Documentary coverage

“Read” below means the document body was read across the investigation, sometimes in several calls to recover truncated displays. “Partial” names a selected source range or passage. “Not selected” is explicit noncoverage, not a conclusion from a filename. The initial 94-path collection inventory is preserved in [document-coverage.md](document-coverage.md); it includes the existing analysis/contracts/review Markdown, not every machine record recursively under evidence. Documents added later by this investigator are delivery artifacts, not historical intake.

Read completely: the collection README, priorities, queue and work log; operator concerns, recovery plan, initial and cross-report assessments; all five original agent reports and post-report responses; consequential audit, source recovery, first process investigation, process repair validation, shared-helper caller audit, remaining caller contracts, independent necessity review, completion/closeout, final coverage, supervision/omission, owner-failure recovery, archive readiness, semantic closeout and scientific-consumption disposition. These supply family-level disposition; reading a report does not independently verify all its claims.

Read completely for A/B: the architecture owner, process campaign checklist, gradual adoption, approval/pilot, real-chain pilot, dependency-map, corrected-candidate, first-chain baseline, integration-readiness, remaining-migration and repository-reconciliation reviews; current-source admission, current-source transition and F6c current operational closure contracts. This is coverage of the declared architecture and its retained review, not an independent reacceptance of all subsequent operational/scientific migrations.

Read completely for dispatch: agent-dispatch-integrity, helper, ten-test suite and multiprompt procedure. The linked original Cosmology receipt's dispatch/pin provenance was inspected in part; its separate scientific/corpus work is not reviewed. All three accessible hash-task turns were read through the task API (no further page), including user/assistant messages, tool calls and relevant outputs. Decisive raw coordinator and five receiver messages were then independently extracted. No private provider telemetry was available.

Historical source review is deliberately partial and causal: original cached-full binding/admission and test paths; enclosure assertion and document history; parent historical-ancestry authentication and two-document route; refined preparation/runner transitions; September 2 supervisor bootstrap, guard and explicit-exit fixture; September 1 hooks, both workflow selections, content-integrity list, receipt command/state/test isolation paths and foundational manifest commands; September 6 sweep and Git-environment repair. Whole source files were read where small; no claim of complete code audit attaches to the larger files. The August 27 launch-readiness owner was inspected for original root/cache/parent design, independent controls and actual execution evidence, not its entire 1,000-plus-line research history. The Braid work log at introduction and AAA Operations work log were inspected at relevant chronology/OPS-018/021/022/024 and Git-isolation passages.

The earlier repair audit's known-controlled inventory, source-recovery outputs, process controls/receipts and coverage records were inspected as retained evidence. Their evidence remains at its existing owner; this bundle does not restate every original run as newly observed. The full numerical datasets, all scientific source implementations, every later circular/F5 run review and all current B manifest rows were not independently revalidated. Their causal relevance is assessed through the explicit family and recovery records.

## Missing evidence and unrelated work

The original ephemeral `/tmp/ops/` Claude cascade, blob scanner and complete sweep logs were not available through the retained report collection; post-report limitations explicitly identify that loss. The original f5test/FSC tool outputs are only summarized in Agent 2's accessible report. Initial authoring discussions, the exact `baa3e7323` measurement/write sequence and the configuration-changing hook invocation were not recovered in the inspected Git/operations records or scoped September 5–6 local session searches. This is bounded unavailability, not proof that no backup or other task contains them.

Original PR260 check identifiers and cancellation evidence are retained in Agent 1, but this RCA did not make a fresh GitHub API query or download remote logs. Original all-host complete validation, provider transport internals and the separate lost-supervisor terminal/signal event remain unverified. Later current receipts cannot fill those historical boundaries.

The separate wrong-remote incident, credential setup, desktop theme, parent-folder/worktree experiments, public/community guidance, storage-retention surveys and historical voice handoff were not selected for causal re-investigation: no demonstrated edge connects them to the examined earlier source-byte transitions. The reports' access failures remain included as limitations on validation/publication. No new external research, private-log upload or Git mutation was performed.

## Scope and completion

Starting HEAD: `5549583a1fa498a72e90aa1a170f26bec10dbd54`, branch `codex/grail`; prompt SHA-256 `ae1922a91a7aa378ed1b491bc01dee36201db2b9730ea1e68a4d804b6016fb43`, 14,987 bytes. Pre-existing publication-owner/README changes and the assignment prompt were preserved. Other activity staged early evidence during writing; the final working files require their own publication review. This investigator neither staged nor published them.

Completion means the supported causal questions and every original material failure family have a disposition with explicit uncertainty. It does not mean every member's history is reconstructed or every current test passes. Further execution of the original scientific universe would not recover missing authoring or hook events and was not authorized. The ranked recommendations remain proposals in the report.
