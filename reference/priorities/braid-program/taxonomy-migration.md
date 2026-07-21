# Braid Taxonomy Migration

Status: IN PROGRESS. The operator selected the hybrid architecture on 2026-07-21. The Family-A and Family-B definition-only batches are complete; Family C and later dynamics and interpretation migrations remain open.

## Accepted Document Architecture

| Document class | Planned file | Ownership |
| --- | --- | --- |
| Taxonomy | `content/markdown/aaa/noether-braid/braid-taxonomy.md` | Canonical coordinates, identifiers, master tables, compact family definitions, and record/Borg routing. |
| Family A | `content/markdown/aaa/noether-braid/braid-family-a.md` | Family-A geometry and response law; A1, its constrained variants, and A2. |
| Family B | `content/markdown/aaa/noether-braid/braid-family-b.md` | Family-B coincident-axis geometry; B1 and its parameter and boundary variants. |
| Family C | `content/markdown/aaa/noether-braid/braid-family-c.md` | Two-braid composition; C1, C2, and later Family-C members. |
| Specialist member | Created only when needed | Mathematics, evidence, or interpretation unique to one member and too substantial for its family document. |
| Shared mathematics | Existing shared chapters | Equations, lemmas, invariants, and proof machinery that apply across more than one family or member. |

The taxonomy remains compact. A family document explains inherited geometry once and gives each member a focused subsection. A member receives its own document only when it has substantial unique mathematical content; the decimal suffix alone does not justify another file.

## Routing Rules

1. Move definitions by concept, not whole sections by filename.
2. Do not duplicate an equation between the taxonomy, a family document, and a specialist document. The taxonomy carries coordinates; the mathematical owner carries derivations.
3. Preserve claim grade. A prescribed geometry does not become a retained branch during migration.
4. Old family names may appear in this migration record as source locators. New reader-facing prose uses the technical identifiers and coordinate descriptions.
5. Do not remove an old chapter until its durable material has an accepted destination, inbound links are migrated, and the replacement is self-contained.
6. Keep particle mappings, observer-level interpretations, and Noether sea selection claims out of member definitions unless the member-specific derivation is supplied.

## Source-to-Destination Map

| Current source | Current material | Proposed destination | Disposition |
| --- | --- | --- | --- |
| `noether-braid.md` | Neutral six-architrino scaffold and scene orientation | Remain in `noether-braid.md` | Retain as the hub; replace the old family ladder with the A/B/C map only after the family documents exist. |
| `braid-families.md` | Neutral-braid base inventory | `noether-braid.md` and `braid-taxonomy.md` | Consolidate the minimum inventory definition; do not repeat its channel analysis in the taxonomy. |
| `braid-families.md` | “Symmetric Shell Braid,” “One-Band Family,” and “Symmetric Member” | `braid-family-a.md`, member A2 | Migrated. The durable equal-geometry, equal-frequency, threefold-symmetry content is in A2 coordinates; the prior definition block was deleted. |
| `braid-families.md` | A2 isolated-release and return-response material | `braid-family-a.md`, A2 retention subsection; shared certificate details remain in `braid-recovery-requirements.md` | Preserve the negative/result scope and separate geometry from retention. |
| `braid-families.md` | A2 sea-embedding material | A2 family subsection or the owning Noether sea chapter | Route only member-specific response claims to Family A; keep population-selection burdens with the Noether sea. |
| `braid-families.md` | Accessory dressing and apparent-energy interpretations | Downstream assembly and mass-map documents | Do not make these properties part of A2's geometric definition. |
| `braid-families.md` | “Nested Shell Braid,” its relation to the symmetric member, and its ordered-radius/frequency descriptions | `braid-family-a.md`, A1 and A1.x subsections | Migrated. The durable three-radius, hinge, frequency-variant, and symmetry-boundary content is in A1 coordinates; the prior definition block was deleted. |
| `braid-families.md` | Integer phase-closure states | A1 family subsection, with member-specific details routed to A1.3 or A1.4 | Preserve the distinction between exact periodicity and dynamical selection. |
| `braid-families.md` | Cadence retuning, scaling curves, reduced closure labels, and dynamics | Specialist member document or proof-program material after an ID audit | Do not merge into the family definition until the applicable member is identified. |
| `braid-families.md` | Geometry and exclusion-envelope material | `braid-envelope-geometry.md` | Keep envelope mathematics shared and reference member IDs from that owner. |
| `braid-families.md` | Generation and fermion-architecture interpretations | Downstream assembly documents | Keep observer-facing mappings separate from the braid taxonomy. |
| `spindle-braid.md` | Definition, exact prescribed geometry, and screw motion | `braid-family-b.md`, B1 | Migrated. The exact common-center path equation, canonical coordinates, speed relation, and axial-translation specialization are in B1; the prior definition and screw-motion blocks were deleted. |
| `spindle-braid.md` | Planar and axial boundary members | `braid-family-b.md`, B1 coordinate-boundary section | Migrated as equatorial and axial coordinate loci. No decimal member IDs were introduced. |
| `spindle-braid.md` | Harmonic-matching hypothesis | `spindle-braid.md`, retitled B1 specialist content | Retained with hypothesis grade; it is not part of the B1 definition. |
| `spindle-braid.md` | B1-specific discrete-symmetry structure | `spindle-braid.md`, retitled B1 specialist content | Retained as derivation-grade kernel covariance and open observer-recovery targets. Shared-mathematics promotion remains a later adjudication. |
| `doubling-frequency-lock.md` | `4:2:1` assumptions, identities, propositions, and diagnostics | Specialist document for A1.3 | Retain as a specialist member document; rename only after its A1.3 role mapping is checked throughout. |
| `noether-braid-configuration-space.md` | Classification axes and frequency families | `braid-taxonomy.md` | Merge only coordinates accepted into the new taxonomy; retire conflicting or redundant classifiers. |
| `noether-braid-configuration-space.md` | General branch state, group velocity, frame conditioning, and unordered-label mathematics | `braid-mathematics.md` or another shared mathematical owner | Keep shared mathematics outside family definitions. |
| `noether-braid-configuration-space.md` | Evidence levels, certification, stability, and Noether sea burdens | `braid-recovery-requirements.md` and the Noether sea owner | Do not mix proof status into the coordinate taxonomy. |
| `braid-mathematics.md` | Shared symmetry and delayed-dynamics mathematics | Remain in `braid-mathematics.md` | Replace old family labels with IDs only after each mapping is accepted. The old drum depiction maps to A2 geometry but remains mathematics, not a family. |
| `braid-envelope-geometry.md` | Envelope definitions and deformation mathematics | Remain in `braid-envelope-geometry.md` | Re-index envelope cases by member ID after Family A and Family B documents exist. |
| `braid-recovery-requirements.md` | Retained-branch certificate and recovery burdens | Remain in `braid-recovery-requirements.md` | Instantiate the shared requirements by member ID without duplicating them in every family document. |
| `noether-braid-topological-charge.md` | Cross-family topological definitions | Remain in `noether-braid-topological-charge.md` | Update consumers to member IDs only where the applicable geometry has been established. |

## Proposed Migration Order

1. Complete: create `braid-family-a.md` with the shared Family-A response law and compact A1/A2 member sections.
2. Complete: migrate only definition-grade A1 and A2 material from `braid-families.md`; delete the migrated source blocks while leaving dynamics, particle mappings, and proof claims in place for separate adjudication.
3. Complete for routing: define the A1.2/A2 boundary and link `doubling-frequency-lock.md` to A1.3. A full specialist-document terminology migration remains open.
4. Complete: create `braid-family-b.md`; migrate B1 geometry, its common-midpoint relation, its coordinate boundaries, and axial-translation specialization from `spindle-braid.md`; delete the migrated source blocks.
5. Create `braid-family-c.md`; audit photon and other dual-braid sources before importing any physical mapping.
6. In progress: update shared mathematics, envelope, recovery, hub, and downstream consumer documents to consume the accepted IDs. Family-A and Family-B definition links are migrated; the controlled Archie canon and the full spin-bridge terminology sweep remain separate batches.
7. Remove or replace superseded old family documents only after link, scene, generated-index, and textbook checks pass.

## First Review Batch

The smallest useful first merge is Family A definition material only:

- shared Family-A translation and flattening response from `braid-taxonomy.md`;
- A1 general coordinates and A1.1–A1.4 distinctions;
- A2 no-hinge symmetry definition;
- durable symmetry statements from the old symmetric-member section;
- no retention, Noether sea selection, particle-generation, or mass-map claims.

This batch produced one self-contained `braid-family-a.md`. After the destination and inbound links were established, the migrated definition blocks were deleted from `braid-families.md`; its retained A1/A2 dynamics and interpretation material remains for separate adjudication.

## Second Review Batch

The Family-B definition-only batch produced one self-contained `braid-family-b.md` containing:

- the B1 common midpoint, common axis, common frequency, and common circulation relations;
- exact endpoint paths in the canonical $(R_a,h_a,\rho_a,f,\phi_a)$ coordinates;
- the internal-speed relation $s_a=2\pi f\rho_a$;
- equatorial, axial, and mixed coordinate loci without new decimal IDs;
- axial translation as an exact screw-path specialization;
- the coordinate boundary shared with Family A.

The migrated definition, boundary, and screw-motion blocks were deleted from `spindle-braid.md`. Its harmonic-matching hypothesis, discrete-symmetry derivations, and retention burden remain in place under a B1 specialist title.

Controlled terminology references in `content/markdown/aaa/archie` and the extended B1 spin-bridge discussion are intentionally deferred. They require a dedicated terminology/canon batch rather than silent expansion of this definition-only migration.
