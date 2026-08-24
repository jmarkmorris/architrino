# Closure Curation Procedure

Operator/agent-facing workflow procedure. This is the milestone companion to the continuous [Theory Closure and Corpus Convergence](../architectural-decisions/theory-closure-and-corpus-convergence.md) objective. Convergence runs continuously; **closure curation** is the concentrated reorganization performed when a major closure milestone lands, to move the corpus from working state (many priority lanes, brainstorming files, scoped negatives, proof targets) toward its canonical published form. It uses the convergence vocabulary (agent, campaign, target, debt, operator, frontier); it does not introduce reader-facing terms.

Curation is refinement and promotion, not rebuild. Much of the corpus is already in good shape; the procedure protects that and adds structure and reach around it. It never rewrites settled canon merely to restate it.

## When it triggers

A closure milestone is any result that converts a load-bearing `target`/`hypothesis` into a `derivation`/`theorem` and unblocks downstream lanes. Examples in the current frontier: the reference attractor $A_0$ closing (first derived mass), Lorentz recovery closing (the boost sector), the effective-metric/GR bridge closing. Each triggers a **scoped** curation pass over the lanes it touches — not a whole-corpus rewrite. A full-corpus curation is reserved for a declared major closure (e.g. the Standard Model sector, or the Lorentz+mass spine together).

## Principles

- **Claim-level integrity first.** Every promoted statement carries an accurate claim level (ontology / derivation / effective-summary / speculation). Closure curation's core act is re-auditing claim levels against the newly closed state and removing hedges that are no longer warranted — and, equally, *not* upgrading a claim the milestone did not actually earn.
- **Forward-only.** Canonical chapters state the current source of truth. History (scoped negatives, abandoned routes, the path a proof took) moves to the places designed for it — priority ledgers, architectural decisions, the roads-not-taken archive, git — not into reader prose.
- **Record vs ledger.** The derivation chain that closed is ontic history and enters the canon; the accounting of attempts is a ledger and is archived, not published.
- **Reader-first sequencing.** The canonical form is organized for a reader learning the theory, not for the order in which results were discovered.
- **Scoped write set.** A curation pass owns only the lanes its milestone touches; it treats the rest of the dirty multi-agent tree as ambient.

## The procedure

### Phase 0 — Pre-closure (safe to run continuously, before any milestone)

These do not depend on closure and should be maintained now, so a milestone triggers promotion rather than archaeology:

1. **Claim-level audit ledger.** Keep every chapter's claim metadata current, so at closure the upgrade set is a diff, not a hunt.
2. **Roads-not-taken archive.** Maintain a single archived ledger of scoped negatives (with the quantified reason each closed) so they are ready to move out of active lanes in one step. The spindle sea-lane's rejection history is the model source.
3. **Volume-boundary plan.** Keep the target canonical architecture (below) current, so promotions have a declared home.
4. **Standing deprecation sweep.** The existing continuous duty: when a decision is ratified or an idea deprecated, remove its vestiges from canonical prose immediately.

### Phase 1 — Canonical freeze

On milestone acceptance, freeze the derivation chain that closed: the definitions, equations, lemmas, and the certificate/simulation evidence, at their exact statements. Record the freeze in the owning architectural decision or proof-program packet. Nothing downstream promotes until the freeze is recorded.

### Phase 2 — Promotion and demotion

- **Promote** the frozen derivation into its canonical `content/markdown/aaa` chapter, restated at reader-facing claim level with assumptions and any remaining obligations named.
- **Dissolve** the priority lanes the milestone closes: their durable content promotes to the canonical home; their trackers, work-logs, and brainstorming demote to history.
- **Archive** the scoped negatives into the roads-not-taken ledger; remove them from active prose.
- **Retire** superseded formulations corpus-wide (the deprecation sweep, run to completion for this milestone's terms).

### Phase 3 — Claim-level re-audit

Sweep every chapter the milestone touches: statements that were `target`/`hypothesis` and are now earned become `derivation`/`theorem`; default hedges ("if accepted", "might", "the question is whether") are removed where the local statement is now settled, per forward-only policy; anything the milestone did *not* earn keeps its claim level. This is where the "written from the era in which the theory is accepted" voice is applied to the newly-closed material.

### Phase 4 — Structural re-sequencing (and, at major closure, the volume split)

Re-sequence the affected chapters for a learning reader. At a major closure, execute the volume split (below): partition the single textbook into volumes, each self-contained with respect to its prerequisites, with the proof/validation apparatus factored into an appendix volume.

### Phase 5 — Regeneration and validation

When the accepted curation brief explicitly includes regeneration, rebuild the affected generated artifacts (scene graph, reading-copy markdown, PDFs, orientation) with their generator `--write` commands, then rerun the `--check` gates and the content-integrity gate. Otherwise, report the exact `--write` commands needed; a curation pass by itself does not authorize generated writes.

## Target canonical architecture — the volume split

The current single textbook (`content/markdown/aaa`, top-level: foundations, dynamics, spacetime, cosmology, noether-braid, assemblies, quantum, nuclear-atomic, reactions, philosophy-history, validation) is proposed to partition, at major closure, into volumes. This is a **proposed** structure to ratify with the operator before execution, not an imposed reorg:

- **Volume I — Substrate and Dynamics.** The ontology (architrinos, void, absolute time), the wake, the master equation, path history, conservation/information. (from `foundations`, `dynamics`)
- **Volume II — Spacetime and Gravitation.** Lorentz recovery, the effective metric, the GR bridge, cosmology, black holes. (from `spacetime`, `cosmology`)
- **Volume III — Assemblies and the Particle Spectrum.** The Noether braid, the mass map, the Standard Model sector, quantum numbers, generations. (from `noether-braid`, `assemblies`)
- **Volume IV — Quantum Behaviour.** Statistics, measurement, the Born rule, entanglement, photons. (from `quantum`)
- **Volume V — Nuclear, Atomic, and Chemical.** Nuclei, atoms, reactions, and — enabled by closure — a first-principles chemistry. (from `nuclear-atomic`, `reactions`, plus new material)
- **Volume VI — Applications and Technology (forward volume).** The consequences and engineering reach; explicitly the most forward-looking volume, claim-limited accordingly.
- **Volume VII — History, Philosophy, and Method (capstone volume).** History and philosophy are kept **together**, not split: the history — missed opportunities, near-misses, and why nature has been so hard to solve — is the motivation for the philosophy, and the philosophy — the concept-import discipline, the record-versus-instant reading of law, ontology-versus-effective placement, and what counts as an explanation — is the method that the history argues for. Splitting them would separate the argument from its motivation, and the corpus already groups them in one `philosophy-history` cluster. This is a reflective capstone, read after the physics volumes, and it carries the theory's own account of why the layered inherited physics looks the way it does.
- **Apparatus (appendix volume).** Proof programs, certificates, validation, and the roads-not-taken archive — the ledger side, kept out of the reading volumes.

Volumes are a **reader-facing** organization; the convergence lanes and priority ledgers stay in `reference/` and are not volume-partitioned. Note that the `philosophy-history` source directory is not one-to-one with Volume VII: its *physics bridges* (for example the Lorentz and special-relativity bridge chapters) re-home to their physics volumes, while only the genuinely reflective and historical material forms the capstone. The split is warranted only when the corpus has grown enough that one spine no longer serves a reader — which closure, by enabling large new chemistry, technology, and history/philosophy material, is expected to force.

## What is safe to start now vs premature

- **Safe now (Phase 0, plus confirmed-result sharpening):** the claim-level audit ledger, the roads-not-taken archive, the volume-boundary plan, the deprecation sweep — and sharpening the specific results that are *already confirmed at seed/derivation grade*, at their correct claim level. As of the 2026-07-10 Lorentz drive that includes: the three-pillars-from-one-leg-ledger unification (sum → contraction+dilation, difference → simultaneity), the native small-drift confirmation of $\xi\to1/\gamma$ and of the $\mathcal S_{\text{asm}}$ offset, the seven-not-ten → effective-boost-sector framing, and the $\xi\to0$ triple-limit cross-link (light-speed / boson / Planck). These may be promoted or cross-linked now *with their small-drift / seed-grade caveats intact*.
- **Premature (defer to the owning milestone):** derived mass numbers, the particle spectrum stated as derived, the chemistry and technology volumes, and any full-band Lorentz or horizon claim — all downstream of closures that have not happened. Writing them now would promote unearned claim levels.

## Ownership

Claim-level integrity, promotion decisions, and canonical placement are the CSO sphere. Regeneration mechanics, validation gates, and the build of the volume partition are the CTO sphere. The volume architecture and any major re-sequencing are ratified with the operator (CEO) before execution.
