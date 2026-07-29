Purpose: Convene a local, repository-aware Council when several distinct
analytical lenses would materially improve an Architrino task. Use the Council
to obtain focused research, proof, review, or implementation reports without
treating a role persona as theory authority or acceptance authority.

## Operating model

The coordinator receives the user's problem, selects only the role lenses
needed for that problem, launches agents under those role names, gathers their
reports, resolves conflicts, and returns one evidence-bounded synthesis to the
user. The coordinator remains responsible for scope, source authority,
integration, conflict resolution, repository safety, validation, and final
communication.

Council reports are research and work products. Their conclusions become
usable only to the extent that they are independently supported by the live
repository owners, valid derivations, declared evidence, and applicable
acceptance procedures.

## Orient from live sources

1. Read the live repository [`AGENTS.md`](../../AGENTS.md) before dispatching
   any agent.
2. Begin theory orientation from the live `content/markdown/aaa/foundations/`
   material, starting with
   [`ontology.md`](../../content/markdown/aaa/foundations/ontology.md) when
   substrate assumptions matter.
3. Follow links and ownership references from those live sources to the
   current equation, priority, contract, validation, or corpus owner for the
   task.
4. Do not rely on a static system prompt and do not require another system
   prompt. Role files provide lenses; live owners provide the current
   technical and procedural authority.

Plainly: Start from the rules and foundations that are current in the checkout,
then trace the specific question to its owning files. A persona shapes the
questions an agent asks; it does not decide what the theory says.

## Discover role lenses

Discover available roles directly from the two live collections:

- `reference/entourage/roles-geometry-dynamics/`
- `reference/entourage/roles-og-entourage/`

Use the role file's basename before `.md` as the requested agent name. For
example, `bill-thurston.md` becomes `bill-thurston`, `emmy-noether.md` becomes
`emmy-noether`, and `henri-poincare.md` becomes `henri-poincare`.

At the time of this instruction, the role files actually present are:

- Geometry Dynamics: `albert-einstein`, `alex-grothendieck`,
  `andrey-kolmogorov`, `bill-thurston`, `elie-cartan`, `emmy-noether`,
  `hendrik-lorentz`, `henri-poincare`, `james-clerk-maxwell`,
  `ludwig-boltzmann`, and `terence-tao`.
- OG Entourage: `alfa`, `cami`, `christo`, `cos`, `dyna`, `phe`, `red`, `sig`,
  and `sol`.

Re-list the directories before every Council because the roster can change.
Do not treat `system-prompt.md` as a role or invent a role that has no live
file.

## Safe startup

Before dispatching:

1. Check the local Codex task system for active or recently completed work on
   the same question. Read task status before creating work and avoid
   duplicating an active calculation, edit, or review.
2. Choose only the necessary independent lenses. Prefer one agent when one
   expertise is sufficient.
3. Give each selected agent a self-contained assigned question, a precise
   claim boundary, the source and owner files to inspect, the allowed write
   scope, the required validation, and the requested report form.
4. Require direct work in the main checkout unless the user explicitly
   authorizes a worktree.
5. Require preservation of unrelated staged and unstaged changes. Agents must
   not stage, commit, push, reset, stash, or regenerate without explicit
   authority.
6. Permit repository changes only when the coordinator's task grants that
   authority. Keep any edit confined to the named files and normal
   implementation steps.
7. Require scoped validation and a concise return report that names files
   changed, evidence obtained, unresolved blockers, and whether work
   continues.

Plainly: Every agent should know exactly what question it owns, what it may
touch, what would count as evidence, and where it must stop.

## Choose a working style

Use independent parallel reviews when two or more genuinely different lenses
can test the same claim adversarially. Give reviewers the same claim boundary
and source owners, but do not show them one another's conclusions before their
independent reports are complete.

Use one implementation agent only when a concrete edit is authorized. Other
agents may review or derive independently, but they must not make competing
edits to the same files.

Do not infer consensus from silence, shared vocabulary, persona prestige, or
agreement among reports that depend on the same source or calculation. In each
agent report and in the synthesis, separate:

- **Derived results**: established from declared premises by a checkable
  derivation.
- **Plausible inferences**: supported interpretations that still need a proof
  or independent test.
- **Proposed innovations**: new structures or procedures not supplied by the
  current law or owner.
- **Unresolved issues**: open questions, conflicts, missing evidence, or
  blocked calculations.

Plainly: Several agents agreeing can expose a useful pattern, but it does not
replace an independent proof, a live owner, or an acceptance gate.

## Role-agent launch template

```text
Closure goal: [one concrete outcome]

Requested agent name: [basename from a live role file]
Role file to read: [exact live role-file path]

Assigned question:
[self-contained question]

Claim boundary:
[what may and may not be concluded]

Inspect first:
- AGENTS.md
- [foundation source]
- [live technical or procedural owner]
- [other necessary evidence]

Authority:
- Checkout: main checkout; no worktree unless explicitly authorized
- Writes: [read-only, or exact allowed files and change]
- Git/regeneration: no stage, commit, push, reset, stash, or regeneration
  unless explicitly authorized
- Preserve unrelated work

Return:
- Derived results
- Plausible inferences
- Proposed innovations
- Unresolved issues and falsifiers
- Files changed, scoped validation, and whether work continues
```

## Coordinator synthesis template

```text
Closure goal: [the user-facing outcome]

Issue and claim boundary:
[short statement]

Live owners and evidence inspected:
[sources and independent checks]

Derived results:
[supported conclusions]

Plausible inferences:
[clearly bounded interpretations]

Proposed innovations:
[new ideas, not current authority]

Unresolved issues and disagreements:
[conflicts, missing evidence, falsifiers]

Repository disposition and validation:
[edits, unchanged owners, checks, or no-edit result]

Plainly: [concise user-level explanation]
```

The coordinator must make the final synthesis narrower than the weakest
necessary evidence, disclose material disagreements, and never promote a
Council report merely because its assigned historical or project role sounds
authoritative.
