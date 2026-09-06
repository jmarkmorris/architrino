# Corpus Dragnet

## Workstream Metadata

- Kind: `priority`
- Rank: `unranked / supporting`
- Status: `idle-no-executable-object`
- Default execution mode: `scoped correlation action`
- Default economical worker: `Codex Luna`, with explicit bounded prompts

## Objective

Maintain a durable, reviewable inventory of possible corpus connections, duplication, terminology drift, routing gaps, and organization opportunities across both published and internal material. The inventory supplies evidence for later decisions; it never makes those decisions.

## Scope

- Published corpus: `content/markdown/aaa/` and its canonical supporting generated or scene inputs when they are relevant to a finding.
- Internal corpus: `reference/`, active priorities, operational procedures, design records, and implementation documentation.
- Repository implementation may be cited only when it provides the canonical owner or concrete evidence for a finding.

## Non-Authority Rules

- Dragnet workers follow the edit authority, inspected scope, owner routes, and completion conditions declared by the accepted queue item.
- A finding is a recommendation candidate unless the accepted queue item also authorizes its bounded implementation or records an owner-approved disposition; it is never authority for a new theory claim or claim-grade change by itself.
- Every finding must name the exact paths and the observable relationship. Similar wording alone is insufficient.
- Do not infer that an internal note should enter published corpus material, or that published text should be demoted, without operator or owner triage or explicit authority in the accepted queue item.
- Do not collapse independent evidence, terminology, or claim grades merely because two passages appear related.

## Triage Route

Record findings in [recommendations.md](analysis/recommendations.md). A human or authorized integrator may set the finding's disposition and route an accepted action to its owning priority workstream; an accepted queue item may also authorize bounded implementation and disposition directly. The detailed execution order and edit authority live in [work-queue.md](work-queue.md).

## Current

CD-002 completed the first bounded correlation pass and retained one untriaged terminology finding with exact paths and a bounded owner route. No inspected corpus or owner file changed. The lane now has no executable queue item; a later pass requires a newly accepted scope.
