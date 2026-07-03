# Braid Taxonomy Migration Plan

Claim level. Priority-only migration control packet. This plan records the proposed Noether braid taxonomy reorganization before authored corpus files, scenes, generated artifacts, or validation surfaces are changed.

## Closure Goal

Gather Noether-braid-specific chapters into the Noether braid markdown directory and scene, rename tri-binary-facing reader surfaces to Noether-braid-facing names, and preserve the technical three-binary substructure only where it remains mathematically necessary for branch records, equations, or proof targets.

## Current Decision Record

- Move the first source batch into `content/markdown/aaa/noether-braid/` rather than leaving Noether-braid branch-architecture chapters under `content/markdown/aaa/dynamics/`.
- Replace reader-facing `tri-binary` wording broadly with Noether-braid wording.
- Include priority workstream prose in the first broad `tri-binary` replacement pass, not only authored `content/markdown/aaa` prose and active links.
- Prefer whole-repo terminology consistency unless a local artifact has a good reason to retain historical or technical wording, such as generated output, script identifiers, archived source summaries, or large proof-packet corpora where hundreds of packets make a separate focused pass more appropriate.
- Preserve technical three-binary notation temporarily when formulas, retained branch rows, or active proof packets still need it.
- Treat `axis-neutral` and `axis-polarized` as final taxonomy terms for the polarity-support axis.
- Rename migrated scene ids immediately to the Noether-braid scene-id family rather than preserving old Dynamics ids for an intermediate checkpoint.
- Treat `Binary Dynamics`, `Master Equation`, `Energy`, `Effective Lagrangian`, and `Causal Action Functional` as general dynamics chapters that remain under `content/markdown/aaa/dynamics/`.
- Leave unrelated dirty equation-mapping work untouched during this migration.

## Phase 1: Priority Setup

- Create `reference/priorities/braid-taxonomy/`.
- Use this file as the migration control surface.
- Keep this packet priority-only until the taxonomy is promoted into authored Noether braid prose.
- Do not manually edit generated artifacts unless a generator is missing, stale, or broken.

## Phase 2: First Source Moves

Status: implemented 2026-07-03 for source markdown moves, title updates, and authored relative-link repair. Scene migration and generated artifact refresh remain in later phases.

Moved the first Noether-braid-specific source batch:

| Previous path | Target path | Target title |
| --- | --- | --- |
| `content/markdown/aaa/dynamics/tri-binary-configuration-space.md` | `content/markdown/aaa/noether-braid/noether-braid-configuration-space.md` | Noether Braid Configuration Space |
| `content/markdown/aaa/dynamics/dyadic-resonance-lock.md` | `content/markdown/aaa/noether-braid/noether-braid-dyadic-resonance-lock.md` | Noether Braid Dyadic Resonance Lock |
| `content/markdown/aaa/dynamics/assembly-topological-charge.md` | `content/markdown/aaa/noether-braid/noether-braid-topological-charge.md` | Noether Braid Topological Charge |

After each move, update all authored relative links that point to the moved path. Preserve anchors where the moved document keeps the same section title. If a section title is renamed, update incoming anchor links in the same batch.

## Phase 3: Scene Migration

Status: implemented 2026-07-03 for the three existing markdown scene views, source paths, scene ids, and parent scene membership. The `Noether Braid Taxonomy` scene-order slot remains deferred until Phase 4 creates `content/markdown/aaa/noether-braid/noether-braid-taxonomy.md` and `content/scenes/noether-braid/noether_braid_taxonomy.json`.

Moved the matching scene markdown views into `content/scenes/noether-braid/`:

| Current scene | Target scene | Target scene id |
| --- | --- | --- |
| `content/scenes/dynamics/tri_binary_configuration_space.json` | `content/scenes/noether-braid/noether_braid_configuration_space.json` | `noether_braid__configuration_space` |
| `content/scenes/dynamics/dyadic_resonance_lock.json` | `content/scenes/noether-braid/noether_braid_dyadic_resonance_lock.json` | `noether_braid__dyadic_resonance_lock` |
| `content/scenes/dynamics/assembly_topological_charge.json` | `content/scenes/noether-braid/noether_braid_topological_charge.json` | `noether_braid__topological_charge` |

When Phase 4 creates the taxonomy scene, update `content/scenes/noether-braid/noether_braid.json` so the Noether braid scene order becomes:

1. Noether Braid
2. Noether Braid Taxonomy
3. Noether Braid Configuration Space
4. Noether Braid Dyadic Resonance Lock
5. Noether Braid Topological Charge
6. Nested Shell Braid Dynamics
7. Nested Shell Braid Geometry

Remove the migrated nodes from `content/scenes/dynamics/dynamics.json`. Keep `Binary Dynamics` in the Dynamics scene as the general two-body precursor.

## Phase 4: Taxonomy Chapter

Status: implemented 2026-07-03 for the reader-facing taxonomy chapter, taxonomy scene, and Noether braid scene-order insertion.

Created the taxonomy front door after the first source moves were stable:

| New path | New scene |
| --- | --- |
| `content/markdown/aaa/noether-braid/noether-braid-taxonomy.md` | `content/scenes/noether-braid/noether_braid_taxonomy.json` |

The taxonomy chapter should define the Noether braid architecture by independent classification axes:

| Axis | Reader-facing purpose | Example values |
| --- | --- | --- |
| Base inventory | Six-body polarity-neutral branch structure | neutral braid |
| Support geometry | How the six paths occupy branch support | shell braid, nested shell braid, oblate envelope |
| Three-binary branch record | Whether three angular-momentum rows are retained | Noether braid three-binary chart, planar lower-rank chart |
| Polarity support | How `+++` and `---` populate opposite axial pairs | axis-neutral, axis-polarized |
| Angular-momentum handedness | Orientation of the ordered three-binary frame | positive-handed, negative-handed |
| Speed hierarchy | Relation of layer speeds to $c_f$ | sub-field, hinge, self-hit, nested `I:M:O` |
| Frequency family | Return or winding-frequency relation | dyadic `4:2:1`, equal-frequency, offset-hinge |
| Certificate status | Evidential status of a branch claim | toy diagnostic, candidate, retained branch, eigen-braid candidate |

The taxonomy chapter must not claim that all listed configurations are retained branches. It should separate explored support classes, candidate branch families, and accepted certificate statuses.

## Phase 5: Terminology Migration

Status: implemented 2026-07-03 for authored corpus markdown, source scene labels, and inspected priority workstream prose. The pass preserved the canonical `planar tri-binary Noether braid reduced chart` term, script/schema identifiers, generated indexes, archived source-mining summaries, dormant legacy notes, the braid migration archive, and the large `braid-retained-branch-closure/shell-braid/` proof-packet corpus for separate focused handling if needed.

Use these replacement directions for reader-facing prose and priority workstream prose in the first broad pass:

| Current wording | Preferred direction |
| --- | --- |
| `Tri-Binary Configuration Space` | `Noether Braid Configuration Space` |
| `tri-binary configuration space` | `Noether braid configuration space` |
| `tri-binary branch` | `Noether braid three-binary branch` |
| `tri-binary chart` | `Noether braid three-binary chart` |
| `tri-binary lock` | `Noether braid three-binary lock` |
| `tri-binary candidate` | `Noether braid three-binary candidate` |
| `tri-binary minimality` | `Noether braid three-binary minimality` |

Do not replace these mechanically inside formulas, script identifiers, generated artifacts, archived legacy source summaries, or large proof-packet corpora where a separate focused pass is more appropriate. Inspect each hit in context. The default should be whole-repo terminology consistency unless a specific artifact has a reason to preserve the old wording.

## Phase 6: Link And Generated Artifact Handling

- Update authored relative links in `content/markdown/aaa/` and priority links in `reference/priorities/`.
- Update source scene JSON and scene index membership through the source files first.
- Regenerate `content/markdown/markdown_index.json` and `content/scenes/scenes_index.json` with `node scripts/validate-content.mjs --write`.
- Regenerate `content/graph/scene_graph.json`, `content/graph/textbook_toc.json`, and `content/generated/markdown/textbook/toc.md` with `node scripts/build-scene-graph.mjs --write --strict`.
- Regenerate textbook reading-copy outputs with `node scripts/build-textbook-md-pdf.mjs --write` only after the source links and scene graph are coherent.
- Do not edit generated iOS package files directly in this migration unless the branch/PR process explicitly requires package regeneration.

## Validation Plan

After source moves and terminology edits, run:

```bash
git diff --check
node scripts/validate-content.mjs --write
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-textbook-md-pdf.mjs --check
```

Then audit remaining references:

```bash
rg -n "tri-binary|Tri-Binary|tri_binary|dyadic-resonance-lock|assembly-topological-charge" content/markdown/aaa content/scenes reference/priorities
```

Each remaining hit should be classified as:

- intentional technical three-binary notation,
- historical or archived priority language,
- source/script identifier outside the current rename scope,
- or a stale reader-facing reference to fix.

## Open Refinement Questions

1. Whether `Noether Braid Topological Charge` should remain the title of the moved assembly-topological-charge chapter or whether the title should stay `Assembly Topological Charge` while only the path and scene move.
