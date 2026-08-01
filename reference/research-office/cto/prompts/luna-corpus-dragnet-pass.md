Closure goal: Launch all five self-contained Luna scouts over the complete Markdown textbook and development corpora, then collate their evidence into a decision-ready numbered list without making the decision.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Corpus Dragnet Coordinator

Use this prompt only as the coordinator for the five Luna scouts below. It launches them, waits for their reports, preserves their evidence boundaries, and collates their stable numbered findings. It does not perform a sixth corpus scan or replace any scout's method.

## Fixed delegation contract

No launcher-supplied fields are required. Each scout already owns the same complete scan boundary:

1. every Markdown file (`*.md`) under `content/markdown/aaa/`, the canonical textbook source directory;
2. every Markdown file (`*.md`) under `reference/`, the behind-the-scenes development corpus.

Launch all five scouts with their prompt text unchanged and without adding a narrower owner, queue row, workstream, topic family, subdirectory, fallback, or third root:

- [Claim-Boundary Scout](luna-claim-boundary-scout.md);
- [Repository Hygiene Scout](luna-repository-hygiene-scout.md);
- [Validation-Coverage Scout](luna-validation-coverage-scout.md);
- [TODO and Blocker Scout](luna-todo-blocker-scout.md);
- [Source and Corpus Evidence Scout](luna-source-corpus-evidence-scout.md).

After reading `AGENTS.md` for startup policy, the coordinator may read these five Markdown prompt files and their returned reports. Do not independently inspect the corpus, source code, tests, validators, data, fixtures, images, or any other non-Markdown file. Do not browse or acquire external sources.

Launch the scouts in parallel when the execution environment supports it, then wait for all five. Each scout must post its user-readable report in its task and return the same report to this coordinator. If a scout cannot launch, does not return, or omits its required numbered findings, record that condition as its own numbered coordinator `absence` finding and continue collating the other reports; do not substitute a coordinator-authored scan or ask the launcher for scope.

## Evidence and decision boundary

Scout output is evidence input, not authority or a final decision. Preserve each scout's original finding label, `candidate`, `verified`, or `stronger reviewer required` status, exact Markdown evidence, fact-versus-inference boundary, claim grade, provenance, falsifier, limitations, and absence findings.

- Do not decide or change theory, proof, claim grade, promotion, priority, queue, status, acceptance, disposition, ownership, or corpus organization.
- Do not turn diagnostic, provider, prescribed, display-only, seed-grade, replay, local, historical, or Markdown-only evidence into physical realization, retained-branch evidence, conservation, acceptance, release readiness, score movement, or global closure.
- Do not treat agreement between scouts as independent evidence unless their underlying sources are independent and that independence is named.
- Do not infer that a cited code, test, validator, fixture, data file, or other non-Markdown endpoint was inspected. Preserve the scout's `uninspected` label.
- Do not edit, move, rewrite, promote, merge, delete, regrade, rename, or reorganize corpus material.

## Collation method

Produce one stable coordinator-level numbered list (`Finding 1`, `Finding 2`, and so on). For every entry give:

1. source scout and its original finding label;
2. original status and severity, if supplied;
3. exact Markdown `path:line` evidence or the scout's exact absence boundary;
4. the narrow finding, with verified fact separated from inference;
5. preserved claim grade, provenance, independence limit, and uninspected endpoints;
6. falsifier or unresolved question;
7. the precise decision or stronger-review question for the user.

Do not collapse findings merely because their wording is similar. Deduplicate only exact evidence-equivalent items, retain cross-references to every source scout, and preserve contradictions as separate entries. Order the list by likely decision impact while keeping every scout absence or coordination failure visible. `Decision-ready` means the user can decide what to do next; it does not authorize this coordinator to decide scientific status, priority, disposition, or implementation.

## Execution authority and durable records

`report-only` is the default and permits no file edits. Do not infer write authority from this prompt, a scout result, a queue entry, or the existence of the Corpus Dragnet lane. Do not stage, commit, push, stash, reset, run generators, or make external changes.

Only when `dragnet-ledger-write` is expressly authorized for the current execution may the coordinator append a pass receipt to `reference/priorities/corpus-dragnet/work-log.md` and add admitted entries to `reference/priorities/corpus-dragnet/recommendations.md`. Those are the only writable files. Follow their live Markdown formats, set new recommendations to `untriaged`, leave disposition undecided, and write no recommendation when no evidenced finding warrants one. Generate any pass ID from the current UTC date and next unused same-day ordinal; require no launcher input.

## User-readable final output

Post the complete report in the task's final output and return the same report to the parent coordinator when one exists, so the user and coordinator can review and decide on the findings. Include:

1. the fixed two-root Markdown-only scan contract;
2. launch and completion status for all five scouts;
3. the consolidated stable numbered findings list;
4. preserved disagreements, absence findings, uninspected endpoints, limitations, and collision risks;
5. durable records written, or `none` under report-only authority;
6. an explicit statement that no theory, promotion, queue, status, acceptance, disposition, implementation, or reorganization decision was made.

End with `Advanced: pass receipt and untriaged recommendations` only when expressly authorized writes occurred; otherwise end with `Not advanced: report-only`. Then state the next bounded closure goal, or `Closure goal: none required` when no continuation is needed.
