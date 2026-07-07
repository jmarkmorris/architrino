# Braid Scene Reorganization Plan

Claim level. Priority-only migration control packet, 2026-07-07. This plan records the operator-approved braid-scene reorganization before authored corpus files, scenes, generated artifacts, or validation surfaces are changed. No retained-branch, evidence, or score claim is made or implied by any move in this plan.

## Closure Goal

Reorganize the Noether braid scene into the operator's approved reading order — braid concept, then realization-independent recovery requirements, then the common mathematical theory of braids, then the featured best-candidate realization explored toward closure, then alternative realizations for later falsification or scoping, with the bookkeeping chapters as the reference layer — so that ongoing review always reads the best current version of the textbook.

## Decision Record

- Operator decision 2026-07-07: the **featured realization is the symmetric shell braid** — the `SH-0`-class same-level braid. It carries the exact mathematics (invariant channels, reductions, speed budget) and is the most analytically tractable member of the family.
- The nested shell braid moves to the alternatives section as the symmetry-broken relative. Its status remains open: it awaits falsification or scoping to conditions where it applies. Nothing in this reorganization is evidence against it.
- The recovery-requirements chapter carries the full inventory of GR/QM/QFT/Standard-Model/$\Lambda$CDM-era theory and observational recovery targets — fermion generations, strong-force/color behavior, weak-channel behavior, photon/Maxwell recovery, Lorentz clock/ruler export, mass map, spin-statistics, gravitational/effective-metric recovery, cosmology-era rows, atomic spectra, and the Noether sea selection burdens — stated once, realization-independently.
- "Best candidate" is a reading-order selection, not an evidence claim. The proof map continues to state that no branch is retained at any Proof ID.
- Proof IDs, the proof map, and the taxonomy grammar are preserved untouched.
- Reorganization work is ranked ahead of the braid-ideal Group A queue per the operator's reorganization-first preference.

## Target Reading Order

| Order | Chapter | Disposition |
| --- | --- | --- |
| 1 | Noether Braid (concept, crux framing, consilience principle, role table) | Exists; role table updated to the new order in Phase 5. |
| 2 | Braid Recovery Requirements (new) | New chapter consolidating the realization-independent retention-certificate rows from Neutral Braid, the proof-burden ladder summary from the proof map, and the full recovery-target inventory above. Self-contained; no priority links. |
| 3 | Braid Mathematics (new) | New chapter holding the core-agnostic machinery currently parked in Shell Braid: invariant channels and equivariant reductions, drum geometry, moments and the axial dipole identity, momentum screw and helicity, the exact speed budget, the scoped anti-damping negatives, action clicks at the fold set, and the eigen-braid spectrum framing, plus the Thomson dressing mechanism (mechanism only). |
| 4 | Symmetric Shell Braid (featured realization) | Refit of the current Shell Braid chapter: one-band definition, `SH-0` fixture identity, isolated-release results, the `SH-0-sea` environment route, and the `SH-0`-specific hypotheses including the dressing applications (electron, quark, neutrino readings) at their stated claim levels. |
| 5 | Neutral Braid | Retained as the base-family definition and all-pairs ledger owner; final placement (standalone before the requirements chapter, or absorbed into it) is an execution-phase operator checkpoint. |
| 6 | Alternatives: Nested Shell Braid, Nested Shell Braid Dynamics, Nested Shell Braid Geometry, Doubling-Frequency Resonance Lock, Configuration Space | Moved after the featured realization; open status preserved; the symmetric-channel relation section is the bridge between featured and alternative realizations. |
| 7 | Bookkeeping: Noether Braid Taxonomy, Noether Braid Proof Map | Reference layer; content untouched by this plan beyond link and order repair. |

## Phases

1. **Plan approval.** This packet. Status: operator-approved in-session 2026-07-07; kept here as the control surface.
2. **Braid Recovery Requirements chapter.** Draft the new chapter by consolidation: the retention predicate and first-failure ladder shape from Neutral Braid stated realization-independently; the proof-burden order from the proof map; the recovery-target inventory mined from the proof map's consumer rows, the Noether sea selection residual, the equation-map residual families, and the validation ledgers. No moves yet; additive only.
3. **Braid Mathematics chapter.** Move the core-agnostic sections out of Shell Braid into the new chapter, leaving the `SH-0` fixture-specific material in place; repair links. The accepted Six-Point Symmetry Invariant Lemma is restated here in reader-facing theorem-target form.
4. **Featured-realization refit.** Rename and refit the Shell Braid chapter to the featured symmetric shell braid role; title choice (`Shell Braid` retained versus `Symmetric Shell Braid`) is an operator terminology checkpoint before execution. Dressing applications move here from Nested Shell Braid, resolving the braid-ideal `accessory_dressing_placement_decision` item in the generalized form.
5. **Scene reorder and alternatives move.** Update scene JSON order and the Noether Braid role table to the target order; move nested-family chapters after the featured realization. Source scene files first, then generated artifacts per the standard flow.
6. **Link repair and regeneration.** Authored relative links, scene index membership, then the generator `--write` set in the final branch/PR process only: `validate-content`, `build-scene-graph`, `build-textbook-md-pdf`, with the standard `--check` reruns.

Each phase ends with `node scripts/validate-content.mjs --check --strict` clean and a work-log entry in this lane. Phases 2 and 3 can run in one thread; phases 4 and 5 want a fresh thread each with an operator checkpoint at the title decision.

## Guardrails

- Do not weaken any claim level during a move; text moves with its labels.
- Do not link corpus chapters to priority files; the requirements chapter restates rather than references.
- Do not present the featured selection as evidence; the proof map's dispositions are unchanged.
- Do not delete nested-family content; relocation only, with the formation question (symmetric persistence versus capture-and-ring-down) preserved as the live bridge.
- Treat chapter titles, any `SH-0` reader-facing naming, and the Neutral Braid placement as operator terminology checkpoints, not agent decisions.

## Validation Plan

Same command set as the prior taxonomy migration: `git diff --check`; `node scripts/validate-content.mjs --write` then `--check --strict`; `node scripts/build-scene-graph.mjs --write --strict` then `--check --strict`; `node scripts/build-textbook-md-pdf.mjs --write` then `--check`; hook mirrors on commit and push.
