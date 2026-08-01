Closure goal: Launch all five self-contained Luna scouts over every Markdown file in the main AAA textbook corpus, collect one report artifact from each, and collate every execution-ready action card into a complete corpus action backlog.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Corpus Dragnet Coordinator

Use this prompt only as the coordinator for the five Luna scouts below. It creates one run-specific output directory, launches the scouts, waits for their reports, preserves their evidence boundaries, and collates their execution-ready cards. It does not perform a sixth corpus scan, replace a scout's method, or produce a bulk inventory.

## Fixed delegation contract

No launcher-supplied research fields are required. At the start of an actual coordinator run, create its own unique directory `.tmp/luna-corpus-dragnet/<run>/` with no user input; do not ask the launcher for a path or fill-in. Supply only that coordinator-created directory to each scout as its optional output destination. The scouts have one complete scan boundary:

1. every Markdown file (`*.md`) under `content/markdown/aaa/`, the main AAA textbook corpus.

Launch all five scouts unchanged, with their prompt text and exhaustive scan methods unchanged. Before each scan, each scout must read and follow [`luna-scout-common.md`](luna-scout-common.md) in full. Do not add a narrower owner, queue row, workstream, topic family, subdirectory, fallback, or second root. Do not inspect priority or work-queue material or any other file outside the corpus:

- [Claim-Boundary Scout](luna-claim-boundary-scout.md);
- [Repository Hygiene Scout](luna-repository-hygiene-scout.md);
- [Validation-Coverage Scout](luna-validation-coverage-scout.md);
- [TODO and Blocker Scout](luna-todo-blocker-scout.md);
- [Source and Corpus Evidence Scout](luna-source-corpus-evidence-scout.md).

Apply the repository startup policy already supplied to this prompt. The coordinator consumes the five scout reports and does not independently inspect the corpus, source code, tests, validators, data, fixtures, images, or any other non-Markdown file. Do not browse or acquire external sources. The run directory is the sole write exception.

Launch the scouts in parallel when supported, then wait for all five. Each scout must write exactly one Markdown report in the run directory using its stable filename, post the same report in its task, and return it to this coordinator. If a scout cannot launch, does not return, or omits its required artifact or action-card format, record one coordination exception naming the exact missing report path, immediate rerun or bounded decision, collision risk, and concrete close check; do not convert that exception into a corpus action card. Do not substitute a coordinator-authored scan or ask the launcher for scope.

The coordinator writes exactly one Markdown collation as `collation.md` in the same run directory and keeps the five scout reports there. It writes no other file. These six files are ephemeral output artifacts only, not durable repository records.

## Exhaustive collation contract

Scout output is evidence input, not authority or a final decision. Collate every concrete corpus task that a scout reports as a bounded Markdown action. Do not cap the list, call it short, silently discard a concrete candidate, or discard a card because ownership is not separately identified, exact final wording is uncertain, or a close condition is not yet known. Every retained card must contain:

1. one precise, bounded issue;
2. exact corpus Markdown evidence;
3. exact target Markdown file(s), all under `content/markdown/aaa/`;
4. a bounded proposed edit or Markdown check, or the next executable wording investigation/edit when exact final wording is uncertain;
5. `For: Architrino corpus team`;
6. one concrete acceptance check, or the bounded check that will establish it;
7. why it matters or collision risk; and
8. a status label and fact-versus-inference boundary. Preserve `needs-wording` and `needs-review` labels and their next executable Markdown investigation/edit. A decision is allowed only when two valid alternatives are written exactly.

Exclude only non-concrete speculation, exact duplicate copies of the same source occurrence, items requiring non-Markdown inspection, and items requiring external research. A keyword match alone is not a card unless it is converted into a bounded Markdown investigation with a named corpus target and acceptance check. Missing separate ownership never suppresses a concrete finding.

Preserve every scout card's original finding label, status, severity, claim grade, provenance, exact corpus Markdown evidence, fact-versus-inference boundary, independence limit, falsifier, limitations, and uninspected endpoint labels. Do not turn diagnostic, provider, prescribed, display-only, seed-grade, replay, local, historical, or Markdown-only evidence into physical realization, retained-branch evidence, conservation, acceptance, release readiness, score movement, or closure. Do not decide theory, proof, claim grade, promotion, prioritization, status, acceptance, disposition, implementation, or corpus organization.

Preserve the scout status meanings: `candidate` is not fully checked, `verified` is only the bounded local fact directly supported by eligible Markdown, and `stronger reviewer required` marks a judgment outside the scout. Agreement among scouts is not independent evidence unless the underlying sources are independent and that independence is named.

## Collation contract

Produce one complete packet organized by `Action/decision` and then source scout. Preserve every admitted scout card; do not eliminate one because another card overlaps it. For an overlap, show one shared action group but enumerate every source scout, original finding label, and source occurrence explicitly rather than inventing redundant rows or silently merging evidence. Preserve each card's exact corpus target files, proposed edit/check, `For: Architrino corpus team`, evidence, acceptance check, why/collision, decision, status, and close condition.

The generated collation must link the five temporary reports with same-directory relative Markdown links. Use these labels and filenames at runtime: `Claim-Boundary report` -> `luna-claim-boundary.md`; `Repository Hygiene report` -> `luna-repository-hygiene.md`; `Validation-Coverage report` -> `luna-validation-coverage.md`; `TODO and Blocker report` -> `luna-todo-blocker.md`; `Source and Corpus Evidence report` -> `luna-source-corpus-evidence.md`.

If every scout returns the exact no-action result after an exhaustive corpus scan and no coordination exception exists, the collation body must contain exactly one concise zero-task result with the scan scope, followed by the five report links. Do not output a bulk inventory, counts, routine blocker restatement, generic theory/closure target, or coordinator-authored scan.

## Output artifacts (.tmp) and final response

`report-only` remains the repository-state default. On an actual coordinator run, the only permitted writes are one newly created unique run directory under `.tmp/luna-corpus-dragnet/`, exactly five scout Markdown reports, and exactly one coordinator Markdown collation. Do not overwrite another run directory. Do not write ledgers or any other repository file. Do not stage, commit, push, stash, reset, run generators, change status or priority, or make external changes. A direct standalone scout run with no supplied directory writes no artifact.

Post the complete collation in the coordinator's final response and return the same packet to the parent coordinator when one exists. Name the exact final collation path `.tmp/luna-corpus-dragnet/<run>/collation.md`, link the five temporary reports, state `Output artifacts only: five scout reports and one collation; no durable records written.`, and explicitly state that no theory, promotion, prioritization, status, acceptance, disposition, implementation, or reorganization decision was made.

End with `Not advanced: output-artifact-only report; no durable repository state changed.` Then state the next bounded closure goal, or `Closure goal: none required` when no continuation is needed.
