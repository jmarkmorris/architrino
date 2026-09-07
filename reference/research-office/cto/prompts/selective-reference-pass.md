Examine the reader-facing Architrino corpus for reference opportunities that meet the About Architrino policy, verify qualifying candidates, and deliver precise proposed source notes within 48 elapsed hours or sooner if the bounded pass is complete.

# Selective Reference Discovery Pass

Use the `aaa-corpus-advancement` skill in audit/report mode. This is a deliberately narrow source-selection task, not a theory-development campaign or a mandate to add citations. Work as one agent in the existing checkout. Do not create subagents, another task, or a worktree.

## Authority and Policy

Read [AGENTS.md](../../../../AGENTS.md), the [startup router](../../../op/agent-startup-orientation.generated.md), the [convergence protocol](convergence-campaign.md), and the [source-mining guide](../../../op/source-mining-best-practice.md), including the relevant source-family sections. Read the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution), its [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review), and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md). About owns the selection boundary; this prompt owns the bounded execution method. Re-read these authorities after a substantive policy change.

Edit authority: reports and checkpoint records only. Do not add, remove, or rewrite references in the corpus during this pass. Do not change canon, equations, theory claims, source assets, software, generated files, or priority queues. Do not stage, commit, push, publish, purchase access, contact authors, or change permissions. Preserve unrelated work. If a source exposes a consequential error or missing attribution, report it explicitly without silently repairing the corpus.

Create one uniquely named run directory under `reference/research-office/research-history/exploration-reports/`, using the start timestamp and `selective-references`. Keep `progress.md`, `coverage.tsv`, and `findings.md` there. These files are the durable handoff, not new corpus evidence gates. Record completed source inspections in the existing [source-mining history](../../../priorities/source-mining/analysis/source-mining-history.md) using one scoped run entry linking to the findings. This history entry is also an authorized report write. Distinguish reference verification from full source mining; never claim that an entire work was mined when only relevant passages were read.

## Duration and Continuation

Record the actual start time and an immutable deadline 48 elapsed hours later, both with timezone. The clock includes pauses and unavailable time; do not reset it after a restart. Start work immediately and continue through bounded batches without asking permission between them. Forty-eight hours is a ceiling, not a target to fill.

Use the product’s supported same-task heartbeat automation to resume this task every 30 minutes while unfinished, if available. Discover and inspect any matching existing automation before creating one; reuse it rather than duplicating it. Record its identifier and put the original absolute deadline, checkpoint location, report-only authority, and stop conditions in its prompt. Do not create a standalone task per run or use shell sleep loops. Each wake must read the checkpoint and check the deadline before starting research. Pause only this run’s automation when the pass is complete, the deadline has arrived, or the whole pass requires operator intervention. Never alter unrelated automations. If scheduling is unavailable, record that limitation, continue the active session, and leave an exact resumption point; do not claim that unattended continuation is guaranteed.

Scheduled local work requires the computer and app to remain available; the [official scheduled-task guidance](https://learn.chatgpt.com/docs/automations?surface=app) explains this dependency. Do not change device sleep settings. Persist progress after each batch and before yielding. During active work, follow the current environment's progress-update cadence. Scheduled wakes update the checkpoint; notify the operator on meaningful progress, completion, failure, or required action, while remaining quiet when the state is unchanged or non-actionable unless periodic status was explicitly requested.

## Coverage

Inventory every Markdown file under `content/markdown/aaa` at the start. Use textbook/scene order where available, appending unlisted files in lexical order. Record the ordered inventory and each file’s content hash in `coverage.tsv`; do not infer full coverage from keyword searches or the presence or absence of existing references. Generated exports, priorities, software, and assets are not search targets, though existing source records may be consulted to avoid repeating work.

Read each file in context, initially in batches of eight. Look for the policy’s qualifying historical, conceptual, methodological, empirical, comparative, and explanatory opportunities. Check existing citations and nearby owner pages before proposing another. Record a disposition for every inventoried path: reviewed with candidates, reviewed with none, deferred with reason, or unread. A page without additions is a normal successful outcome.

On resumption, continue from the recorded position. If a reviewed page changes, mark affected findings stale and recheck them within the remaining time. At closeout, reconcile the current path inventory and hashes, identifying additions, removals, and changed pages. Do not silently count an earlier version as reviewed-current or extend the deadline to chase a moving corpus.

## Selection and Verification

For each opportunity, identify the exact passage and explain what a source would contribute before searching. Apply the About policy, including its exclusion of ornamental citations and broad reading-list expansion. A famous name, historical date, or familiar principle is a search clue, not an automatic qualification. Do not use agreement with Architrino as the selection test.

Search the web and available source records for the best source for that specific use. Inspect the relevant original material, not only a search snippet, abstract, bibliography entry, or AI summary. Check enough surrounding definitions, assumptions, and conclusions to establish relevance. Prefer direct sources for original results, appropriate scholarly history for historical interpretation, authoritative data products for measurements, and reliable reviews or textbooks for mature syntheses. Check editions, versions, and corrections or withdrawal notices when available. Follow citation trails only far enough to resolve the local purpose; stop once sufficient support is established.

Use a first-pass limit of 20 minutes of source research per opportunity. If unresolved, defer it with the precise access or interpretation problem and move on. Revisit consequential deferred items only after the first coverage pass and within the original deadline. This limit controls research effort, not source quality: never lower the verification standard to meet it. Do not bypass access restrictions or assume that lack of access means a work is unreliable.

For each candidate, record:

- Corpus path, heading, precise passage, and inspected file hash.
- Qualifying purpose and the benefit beyond existing explanation or references.
- Author, title, year, edition/version, DOI or other stable identifier where available, and access URL.
- Source passages actually inspected: pages, sections, equations, figures, or dataset records; include the inspection date and a short paraphrase of the support and its limits.
- Whether the relationship is direct support, historical context, comparison, explanatory background, or contrary evidence. Preserve the distinction between external physics and Architrino premises.
- Disposition: recommend, omit, or defer, with a reason. Recommend only after checking relevance; access or support uncertainty belongs under defer. Avoid repeating a source unless it serves a distinct local purpose.
- A proposed brief, reader-facing source note, its exact placement, and whether a local citation is necessary. Keep the passage understandable without opening the source. Preserve required attribution separately.

Do not paste full copyrighted works or long excerpts into reports. Preserve TeX and established terminology in proposed notes. If a source does not support the corpus statement, flag the mismatch rather than making the citation appear to support it or rewriting the theory to fit it. Source inspection verifies the stated reference use, not the truth of the entire source or Architrino theory, and does not imply that the publisher personally read it.

## Completion and Deliverables

Finish early only when every accessible current path in the reconciled inventory has been read, removed or inaccessible paths are explicitly accounted for, every identified opportunity has a reasoned disposition, and no feasible in-scope verification work remains. Unread or stale accessible pages prevent an early completion claim. Deferred and inaccessible items must remain visible; do not describe them as verified. If the deadline arrives first, stop research and close out as time-limited with the exact unread, stale, and deferred remainder. If one source is blocked, continue elsewhere; stop for operator intervention only when safe progress across the pass is impossible.

The durable coverage record and findings preserve:

- Start, deadline, stop time, and why the pass stopped.
- Total paths, reviewed-current paths, no-opportunity paths, unread/stale paths, and recommendations, omissions, and deferrals.
- The strongest qualifying opportunities, grouped by purpose and proposed corpus destination; give missing essential support or attribution priority over optional background.
- Ready-to-apply source notes and any consequential source/claim mismatches requiring a separate decision.
- Checks performed on report links, identifiers, placements, coverage counts, and whitespace; label retrieval limits rather than claiming exhaustive verification.
- Whether the same-task automation was paused, or why automation cleanup could not be confirmed.

No corpus edit, publication, or generated-artifact refresh is authorized by completion of this pass. Report the scope and evidence under the operator explanation standard, identifying any separately authorized integration action or stating that no qualifying additions were found.
