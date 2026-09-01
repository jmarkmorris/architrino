# Braid Program

Status: RATIFIED by the operator (2026-07-24; opened 2026-07-15).

This is a fresh start on the braid search. It supersedes the eight legacy `braid-*` workstreams, which remain frozen in place until they are archived (planned after the current instrument cross-verification campaign completes). Nothing in this directory is moved from the legacy directories; everything here is authored new.

## Goal

Find and certify architrino braid configurations that are genuine solutions of the master equation — zero master-equation residual and dynamically persistent — using the EOM engine and independently verified instruments, and then map certified objects to the assembly ontology (photon carrier, charged leptons, neutrinos) at graded claim levels.

## Ground Rules

1. **Nothing is inherited.** No proof, calculation, number, or verdict from the legacy `braid-*` directories is relied on in this program. Insights and ideas may be mined into `mining/` as unproven leads; any claim a lead suggests is re-established on the current instrument stack before it is used.
2. **Screening can rule out; only evolution can rule in.** A prescribed configuration whose master-equation residual is nonzero is proven not to be a solution (within the declared ranges). A prescribed configuration whose residual passes is a candidate and nothing more. Persistence, settling, binding, and fate are decided only by evolution under the master equation with the collapse protocol.
3. **Fresh terminology.** Plain descriptive names throughout. Legacy run labels — version tags, section numbers, row numbers, era nicknames — do not appear in this directory outside `mining/` staging notes, where they may occur only as source citations. Theory vocabulary comes from corpus canon (architrino, polarity, Noether braid, Noether sea, causal wake, field speed $c_f$, master equation) and nowhere else.
4. **Every number carries its instrument, its claim grade, and an evidence pointer.** A number without all three is a defect.
5. **Negatives are scoped.** Every ruled-out statement names its declared configuration ranges and motion class. No negative covers what was not searched.
6. **Evidence independence** (per AGENTS.md): agreement is evidence only between independently authored instruments; a reference instrument is never modified in the same change as its subject; reproduction by the same code family is parity, not verification.
7. **Delay discipline.** The state of any object is its retained history over the delay horizon, not an endpoint. Any temporal claim requires the collapse protocol: multiple materially different endpoint-matched prehistories, evolved past the horizon, with a numerical refinement envelope. A single-prehistory result is seed-indexed and says nothing about the object.

## Directory Layout and Document Classes

The main directory stays small. Five document classes have different lifecycles:

| Class | Files | Rule |
| --- | --- | --- |
| Live state | [priorities.md](priorities.md) | One page. Rewritten forward-only. The only file an agent must read to join the program. |
| Reference | this charter, [candidate-registry.md](candidate-registry.md), [shared-circle-assembly-registry.md](shared-circle-assembly-registry.md), [method.md](method.md), [configuration-chart.md](configuration-chart.md), [braid-assembly-taxonomy-migration.md](braid-assembly-taxonomy-migration.md) | Current policy and definitions. The candidate registry is the master name/status/next-action index for admitted braid candidates; the circular-assembly registry separately routes evaluated circular assemblies that do not automatically satisfy a braid inventory. The active migration plan owns the coordinated move away from ambiguous `shared` and Family A/B/C terminology toward factual characteristics and component-braid 2D/3D organization, with exact-configuration identities, current-only indexes, and no compatibility layer. Detailed geometry and evidence remain with their owners. Rewritten forward-only when policy changes. |
| Editable synthesis | [brainstorming.md](brainstorming.md) | Rewritten forward-only as a coherent academic synthesis. Developed technical material routes to focused owners; the final section records only unresolved ideas. |
| Append-only log | [work-log.md](work-log.md) | Dated entries, newest last, never rewritten. |
| Artifacts | `campaigns/`, `evidence/`, `mining/` | Subdirectories only. Campaign specs define one search each; evidence files are write-once results; mining holds staged legacy leads. |

The one-sentence hygiene rule: **results land in `evidence/`; the synthesis may explain their meaning and boundaries but does not duplicate their complete receipts or change their grades.**

## Relationship to Other Lanes

- `app-solver` owns the engine and the independent oracle. This program consumes accepted engine capabilities only, and is blocked wherever a needed capability is not yet accepted — it never substitutes an unvalidated path.
- Corpus braid chapters (`content/markdown/aaa/noether-braid/`) are downstream: this program stages results; promotion follows the standard corpus rules, and legacy-era corpus claims are reconciled by their own lanes, not from here.
- The legacy `braid-*` directories are read-only source material for `mining/` and are otherwise not consulted.
