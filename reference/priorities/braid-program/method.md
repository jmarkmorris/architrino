# Braid Program — Method

Status: DRAFT, pending operator ratification (2026-07-15). This document defines how the program produces and grades results. It is reference-class: rewritten forward-only when policy changes.

## The Two Stages

**Stage S — screening (prescribed configurations).** A candidate shape and motion are prescribed; the **master equation** is evaluated on them. Concretely: for each worldline, the prescribed motion fixes an acceleration, the master equation's delayed causal-wake sum fixes what the acceleration would have to be, and the **master-equation residual** is the difference. A nonzero residual proves the prescription is not a solution of the master equation — a scoped negative, the strongest cheap result available. What Stage S cannot establish: that anything persists. A passing residual nominates a candidate; it proves consistency at the evaluated instants only. (Terminology note: the primitive law is an acceleration law — architrinos carry no mass, so this program does not use "force" language at the architrino level; where an aggregate lever-arm or torque-like booking is needed at assembly level, it is defined explicitly in the campaign spec.)

**Stage E — evolution (retained history under the master equation).** The EOM engine evolves the object from declared initial data with a declared prehistory. Only Stage E can rule a candidate in. Every Stage E claim is subject to the delay discipline below.

## Delay Discipline (applies to every Stage E result)

The state of a delay system is a function on the delay horizon, not a point. Therefore:

1. Every run declares its prehistory explicitly. A prehistory is an input, not a neutral default — a convenient prehistory selects an answer.
2. Object-level temporal claims require the **collapse protocol**: at least three materially different prehistories matched at the endpoint state, evolved past the delay horizon, compared on symmetry-reduced observables, with a numerical refinement envelope (step, history segmentation, root-search depth). Collapse across seeds licenses a basin-scoped claim; persistent separation means the question is not well-posed without a preparation condition; neither means the result is seed-indexed and is booked as such.
3. Root-ledger clearance is certified, not assumed: no active causal root may still reach the seeded interval when the claim window opens.

## Instrument Requirements

- Engine capabilities must be **accepted** (independent-oracle checked) before a campaign uses them; the instrument gate spec in `campaigns/` lists what is accepted and what is barred.
- Reduction code (residual norms, averages, fixed-point solves) is authored independently of any legacy implementation, from the definitions in the owning spec, with predeclared tolerances.
- A reference instrument is never modified in the same change as its subject.
- Cost claims are measured, never argued from geometry or cell counts.

## Claim Grades

Every claim in every program document carries one of: **derived** (closed form or theorem, named), **measured** (instrument named, tolerance declared, evidence pointer), **inferred** (stated as inference, with what would confirm it), **idea** (unproven lead — the only grade permitted for mined legacy content). A verified local fact does not license a global claim; scope travels with the grade.

## Acceptance Gates for a Certified Persistent Object

A configuration is booked as a persistent object only when all of the following hold, each with an evidence pointer:

1. Master-equation residuals within the declared gate along the evolved trajectory (not merely at the seed).
2. Collapse protocol passed: multi-prehistory agreement on the persistence observables, basin declared.
3. Refinement envelope established and the result inside it.
4. Independent-oracle cross-check of the engine path used.
5. A named falsifier: the observation that would overturn the booking, and where to look for it.

## Burden Order

The program's obligations close in a fixed order, and evidence for one rung never substitutes for the next (restated fresh from durable method salvaged out of the retired corpus proof map): first **rest retention** (does the object persist in isolation), then **sea embedding** (does it persist inside a populated medium), then **moving export** (what a moving retained object hands to observer-level physics), then **downstream consumers** (particle roles, metric recovery). Consumer success never travels backward: a favorable downstream diagnostic cannot rescue an open retention rung.

## Booking Rules

Results land as write-once files in `evidence/`, named `YYYY-MM-DD-<campaign>-<short-descriptor>.md`, each carrying: configuration, instrument, grade, tolerances, result, falsifier, reproduction command. Campaign specs and the live state carry one-line graded pointers only. Negatives are recorded with their declared ranges in the campaign spec's coverage table, which is the program's map of searched territory.

## Naming Rules

Campaigns are named by date and content: `YYYY-MM-<plain-descriptor>` (for example `2026-07-subfield-binary-evolution`). No bare numbers as identifiers. Legacy run labels appear only inside `mining/` staging notes as source citations.
