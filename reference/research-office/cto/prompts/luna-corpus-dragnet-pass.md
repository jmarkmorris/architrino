Closure goal: Launch all five self-contained Luna scouts over the complete Markdown corpora, collect one report artifact from each, and collate only execution-ready action cards into a compact owner-organized packet.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Corpus Dragnet Coordinator

Use this prompt only as the coordinator for the five Luna scouts below. It creates one run-specific output directory, launches the scouts, waits for their reports, preserves their evidence boundaries, and collates their execution-ready cards. It does not perform a sixth corpus scan, replace a scout's method, or produce a bulk inventory.

## Fixed delegation contract

No launcher-supplied research fields are required. At the start of an actual coordinator run, create its own unique directory `.tmp/luna-corpus-dragnet/<run>/` with no user input; do not ask the launcher for a path or fill-in. Supply only that coordinator-created directory to each scout as its optional output destination. The scouts retain their complete scan boundary:

1. every Markdown file (`*.md`) under `content/markdown/aaa/`, the canonical textbook source directory;
2. every Markdown file (`*.md`) under `reference/`, the behind-the-scenes development corpus.

Launch all five scouts unchanged, with their prompt text and scan methods unchanged. Do not add a narrower owner, queue row, workstream, topic family, subdirectory, fallback, or third root:

- [Claim-Boundary Scout](luna-claim-boundary-scout.md);
- [Repository Hygiene Scout](luna-repository-hygiene-scout.md);
- [Validation-Coverage Scout](luna-validation-coverage-scout.md);
- [TODO and Blocker Scout](luna-todo-blocker-scout.md);
- [Source and Corpus Evidence Scout](luna-source-corpus-evidence-scout.md).

After reading `AGENTS.md` for startup policy, the coordinator may read these five prompt files and their returned reports. Do not independently inspect the corpus, source code, tests, validators, data, fixtures, images, or any other non-Markdown file. Do not browse or acquire external sources. The run directory is the sole write exception.

Launch the scouts in parallel when supported, then wait for all five. Each scout must write exactly one Markdown report in the run directory using its stable filename, post the same report in its task, and return it to this coordinator. If a scout cannot launch, does not return, or omits its required artifact or action-card format, retain one coordinator action card only if it names the exact missing report path, coordinator owner, immediate rerun or bounded decision, collision risk, and concrete close check. Do not substitute a coordinator-authored scan or ask the launcher for scope.

The coordinator writes exactly one Markdown collation as `collation.md` in the same run directory and keeps the five scout reports there. It writes no other file. These six files are ephemeral output artifacts only, not durable repository records.

## Actionability gate

Scout output is evidence input, not authority or a final decision. Retain only cards that another agent can execute directly. Every retained card must contain:

1. one precise, bounded issue;
2. exact eligible Markdown evidence;
3. exact target Markdown file(s);
4. a precise proposed edit or narrowly defined Markdown command/check;
5. one owner or implementer lane;
6. one concrete acceptance check;
7. why it matters or collision risk; and
8. a falsifier or close condition. A decision is allowed only when two valid alternatives are written exactly.

Reject vague `review`, `assess`, `reconcile`, `identify`, or `require` actions; generic open research programs; broad scientific proof targets; repeated queue rows; known long-horizon prerequisites; broad validation gaps with no executable edit; mere keyword matches; routine descriptions of already-recorded blockers; and any card missing a target file or acceptance check. Preserve an absence only when choosing an owner, target scope, or next step is immediately required and the card remains directly executable.

Preserve each admitted scout card's original finding label, status, severity, claim grade, provenance, exact Markdown evidence, fact-versus-inference boundary, independence limit, falsifier, limitations, and uninspected endpoint labels. Do not turn diagnostic, provider, prescribed, display-only, seed-grade, replay, local, historical, or Markdown-only evidence into physical realization, retained-branch evidence, conservation, acceptance, release readiness, score movement, or closure. Do not decide theory, proof, claim grade, promotion, priority, queue, status, acceptance, disposition, ownership, implementation, or corpus organization.

Preserve the scout status meanings: `candidate` is not fully checked, `verified` is only the bounded local fact directly supported by eligible Markdown, and `stronger reviewer required` marks a judgment outside the scout. Agreement among scouts is not independent evidence unless the underlying sources are independent and that independence is named.

## Collation contract

Produce one compact packet organized by `Action/decision` and then `Owner`. Preserve every admitted scout card; do not eliminate one because another card overlaps it. For an overlap, show one shared action/owner group and list every source scout and original finding label explicitly rather than inventing redundant rows or silently merging evidence. Preserve each card's exact target files, proposed edit/check, evidence, acceptance check, why/collision, decision, and close condition.

The generated collation must link the five temporary reports with same-directory relative Markdown links. Use these labels and filenames at runtime: `Claim-Boundary report` -> `luna-claim-boundary.md`; `Repository Hygiene report` -> `luna-repository-hygiene.md`; `Validation-Coverage report` -> `luna-validation-coverage.md`; `TODO and Blocker report` -> `luna-todo-blocker.md`; `Source and Corpus Evidence report` -> `luna-source-corpus-evidence.md`.

If every scout returns the exact no-action result and no coordination failure passes admission, the collation body must contain exactly one concise result with the scan scope, followed by the five report links. Do not output a bulk inventory, counts, routine blocker restatement, generic theory/closure target, or coordinator-authored scan.

## Output artifacts (.tmp) and final response

`report-only` remains the repository-state default. On an actual coordinator run, the only permitted writes are one newly created unique run directory under `.tmp/luna-corpus-dragnet/`, exactly five scout Markdown reports, and exactly one coordinator Markdown collation. Do not overwrite another run directory. Do not write ledgers or any other repository file. Do not stage, commit, push, stash, reset, run generators, change status or priority, or make external changes. A direct standalone scout run with no supplied directory writes no artifact.

Post the compact collation in the coordinator's final response and return the same packet to the parent coordinator when one exists. Name the exact final collation path `.tmp/luna-corpus-dragnet/<run>/collation.md`, link the five temporary reports, state `Output artifacts only: five scout reports and one collation; no durable records written.`, and explicitly state that no theory, promotion, queue, status, acceptance, disposition, implementation, or reorganization decision was made.

End with `Not advanced: output-artifact-only report; no durable repository state changed.` Then state the next bounded closure goal, or `Closure goal: none required` when no continuation is needed.
