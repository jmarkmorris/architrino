# Corpus Dragnet

## Workstream Metadata

- Kind: `priority`
- Rank: `unranked / supporting`
- Status: `queued`
- Default execution mode: `read-only correlation pass`
- Default economical worker: `Codex Luna`, with explicit bounded prompts

## Objective

Maintain a durable, reviewable inventory of possible corpus connections,
duplication, terminology drift, routing gaps, and organization opportunities
across both published and internal material. The inventory supplies evidence
for later decisions; it never makes those decisions.

## Scope

- Published corpus: `content/markdown/aaa/` and its canonical supporting
  generated or scene inputs when they are relevant to a finding.
- Internal corpus: `reference/`, active priorities, operational procedures,
  design records, and implementation documentation.
- Repository implementation may be cited only when it provides the canonical
  owner or concrete evidence for a finding.

## Non-Authority Rules

- Dragnet workers are read-only outside this directory.
- A finding is a recommendation candidate, not an accepted correction,
  priority, theory claim, promotion, or reorganization decision.
- Every finding must name the exact paths and the observable relationship.
  Similar wording alone is insufficient.
- Do not infer that an internal note should enter published corpus material, or
  that published text should be demoted, without operator or owner triage.
- Do not collapse independent evidence, terminology, or claim grades merely
  because two passages appear related.

## Triage Route

Record findings in [recommendations.md](recommendations.md). A human or
authorized integrator may set the finding's disposition and route an accepted
action to its owning priority lane. The detailed execution order lives in
[work-queue.md](work-queue.md).
