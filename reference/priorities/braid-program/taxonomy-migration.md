# Braid Taxonomy Migration

Status: COMPLETE. The operator selected the hybrid architecture on 2026-07-21. The Family-A, Family-B, and Family-C definition batches, specialist-document splits, shared-chapter re-indexing, and legacy-source removal are complete. The current stack contains fifteen sources listed below for document-by-document review; this is no longer a legacy migration batch.

## Accepted Document Architecture

| Document class | Planned file | Ownership |
| --- | --- | --- |
| Taxonomy | `content/markdown/aaa/noether-braid/braid-taxonomy.md` | Canonical coordinates, identifiers, master tables, compact family definitions, and record/Borg routing. |
| Family A | `content/markdown/aaa/noether-braid/braid-family-a.md` | Family-A geometry and response law; A1, its constrained variants, and A2. |
| Family B | `content/markdown/aaa/noether-braid/braid-family-b.md` | Family-B coincident-axis geometry; B1 and its parameter and boundary variants. |
| Family C | `content/markdown/aaa/noether-braid/braid-family-c.md` | Two-braid composition; C1, C2, and later Family-C members. |
| A2 specialist | `content/markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md` | A2 invariant channels, exact fixture geometry and moments, momentum screw, and return-response analysis. |
| Analysis methodology | `content/markdown/aaa/noether-braid/braid-analysis-methodology.md` | Family-general causal-wake evaluation, probe measures, energy-ledger interface, sampling, and candidate grading. |
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
| `braid-families.md` | Neutral-braid base inventory | `noether-braid.md` and `braid-taxonomy.md` | Migrated. The base inventory and generic closed-path chart are in the hub; the old source was removed. |
| `braid-families.md` | “Symmetric Shell Braid,” “One-Band Family,” and “Symmetric Member” | `braid-family-a.md`, member A2 | Migrated. The durable equal-geometry, equal-frequency, threefold-symmetry content is in A2 coordinates; the prior definition block was deleted. |
| `braid-families.md` | A2 isolated-release and return-response material | `braid-a2-symmetry-and-return-response.md`; shared certificate details remain in `braid-recovery-requirements.md` | Migrated with the equivariance theorem, recovery residual, conditional no-return certificate, and open evolution scope preserved. |
| `braid-families.md` | A2 sea-embedding material | `braid-a2-symmetry-and-return-response.md` | Migrated as an open member-specific environmental return-response route; population-selection burdens remain with the Noether sea. |
| `braid-families.md` | Legacy accessory and apparent-energy interpretations | `braid-mathematics.md`, downstream assembly documents, and priority-only material | Migrated or triaged. Accessory Configuration is now a declared six-architrino record; the incompatible four-site/two-site quark shortcut is priority-only pending a six-site moment ledger. |
| `braid-families.md` | “Nested Shell Braid,” its relation to the symmetric member, and its ordered-radius/frequency descriptions | `braid-family-a.md`, A1 and A1.x subsections | Migrated. The durable three-radius, hinge, frequency-variant, and symmetry-boundary content is in A1 coordinates; the prior definition block was deleted. |
| `braid-families.md` | Integer phase-closure states | `braid-a1-dynamics.md`, with A1.3 specialization in `braid-a1-3-doubling-frequency-lock.md` | Migrated with exact periodicity kept separate from dynamical selection. |
| `braid-families.md` | Cadence retuning, scaling curves, reduced closure labels, and dynamics | `braid-a1-dynamics.md` | Migrated into an A1 specialist chapter; no retained EOM-solver branch is asserted. |
| `braid-families.md` | Geometry and exclusion-envelope material | `braid-envelope-geometry.md` | Migrated and re-indexed by A1/B1 member ID. |
| `braid-families.md` | Generation and fermion-architecture interpretations | `braid-a1-dynamics.md` as a compact hypothesis interface plus downstream assembly documents | Migrated without making the mapping part of the A1 definition. |
| `spindle-braid.md` | Definition, exact prescribed geometry, and screw motion | `braid-family-b.md`, B1 | Migrated. The exact common-center path equation, canonical coordinates, speed relation, and axial-translation specialization are in B1; the prior definition and screw-motion blocks were deleted. |
| `spindle-braid.md` | Planar and axial boundary members | `braid-family-b.md`, B1 coordinate-boundary section | Migrated as equatorial and axial coordinate loci. No decimal member IDs were introduced. |
| `spindle-braid.md` | Harmonic-matching hypothesis | `braid-b1-symmetry.md` | Migrated with hypothesis grade; it is not part of the B1 definition. |
| `spindle-braid.md` | B1-specific discrete-symmetry structure | `braid-b1-symmetry.md` | Migrated as derivation-grade kernel covariance and open observer-recovery targets. |
| `doubling-frequency-lock.md` | $4{:}2{:}1$ assumptions, identities, propositions, and diagnostics | `braid-a1-3-doubling-frequency-lock.md` | Migrated and explicitly scoped to A1.3. |
| `noether-braid-configuration-space.md` | Classification axes and frequency families | `braid-taxonomy.md` | Completed. Accepted coordinates are in the taxonomy; polarity-placement and old support classifiers were removed, while noncanonical frame and speed diagnostics remain explicitly supplementary. |
| `noether-braid-configuration-space.md` | General branch state, group velocity, frame conditioning, and unordered-label mathematics | `braid-mathematics.md` or another shared mathematical owner | Keep shared mathematics outside family definitions. |
| `noether-braid-configuration-space.md` | Evidence levels, certification, stability, and Noether sea burdens | `braid-recovery-requirements.md` and the Noether sea owner | Do not mix proof status into the coordinate taxonomy. |
| `braid-mathematics.md` | Shared delayed-dynamics mathematics | Remain in `braid-mathematics.md` | Re-indexed. A2-specific symmetry, two-ring, dipole, and momentum-screw material moved to the A2 specialist; the generalized transverse internal-motion speed-budget lemma remains shared. |
| `braid-envelope-geometry.md` | Envelope definitions and deformation mathematics | Remain in `braid-envelope-geometry.md` | Re-indexed by A1/B1 and corrected to the accepted near-spherical-to-oblate Family-A response. |
| `braid-recovery-requirements.md` | Retained-branch certificate and recovery burdens | Remain in `braid-recovery-requirements.md` | Re-indexed by neutral base and A/B/C member without duplicating requirements in family documents. |
| `noether-braid-topological-charge.md` | Cross-family topological definitions | Remain in `noether-braid-topological-charge.md` | Re-indexed; the old `NSH-421` comparison label is now A1.3. |

## Proposed Migration Order

1. Complete: create `braid-family-a.md` with the shared Family-A response law and compact A1/A2 member sections.
2. Complete: migrate only definition-grade A1 and A2 material from `braid-families.md`; delete the migrated source blocks while leaving dynamics, particle mappings, and proof claims in place for separate adjudication.
3. Complete for routing: define the A1.2/A2 boundary and link `doubling-frequency-lock.md` to A1.3. A full specialist-document terminology migration remains open.
4. Complete: create `braid-family-b.md`; migrate B1 geometry, its common-midpoint relation, its coordinate boundaries, and axial-translation specialization from `spindle-braid.md`; delete the migrated source blocks.
5. Complete: create `braid-family-c.md`; define the exact two-B1 composition chart and audit photon and other dual-braid sources without importing an unestablished physical mapping.
6. Complete: update shared mathematics, envelope, recovery, hub, configuration-space, topological-charge, and live link consumers to use the accepted IDs.
7. Complete: replace the superseded family source with `braid-a1-dynamics.md`, rename the B1 and A1.3 specialists, and remove all live source dependence on the legacy filenames.

## First Review Batch

The smallest useful first merge is Family A definition material only:

- shared Family-A translation and flattening response from `braid-taxonomy.md`;
- A1 general coordinates and A1.1–A1.4 distinctions;
- A2 no-hinge symmetry definition;
- durable symmetry statements from the old symmetric-member section;
- no retention, Noether sea selection, particle-generation, or mass-map claims.

This batch produced one self-contained `braid-family-a.md`. After the destination and inbound links were established, the migrated definition blocks were deleted from `braid-families.md`; its A1 dynamics, legacy accessory material, and other unassigned interpretation material remained for separate adjudication.

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

## Third Review Batch

The Family-C definition-only batch produced one self-contained `braid-family-c.md` containing:

- the exact twelve endpoint paths of two complete B1 components;
- geometric assembly-center and braid-center-displacement definitions;
- the relative frame rotation $Q_{21}$ and reference-time phase offset $\Delta\phi$;
- the reference-meridian convention needed to prevent relative orientation and relative phase from double-counting the same circular-path rotation;
- independently assignable B1 geometry for the two components unless a constrained source record states an equality;
- axis offset derived from center displacement and relative orientation, including the distinction between coaxial axial spacing and transverse axis displacement;
- C1 as the same-circulation member and C2 as the opposite-circulation member;
- an explicit boundary between the generic C2 chart and photon-specific planarization, coaxiality, polarity conjugation, propagation, and closure claims.

The photon, neutrino, and meson sources were audited. No generic Family-C definition block was deleted from them: their two-braid passages carry physical component or channel claims that are not encoded by C1 or C2. The photon chapter now links its nearest generic C2 coordinate chart while retaining all photon-specific geometry and closure obligations. Neutrino and meson mappings remain unassigned because their B1 component membership and relative-configuration rows have not been established.

## Fourth Review Batch

The first post-definition batch moved the A2-specific retention unit into `braid-family-a.md`:

- the near-antipodality residual and contraction target;
- the established invariant-channel scope and open dynamical-fate scope;
- the conditional no-return bound $\ddot R\ge -K/R^2$ with escape margin $\dot R^2>2K/R$;
- the resulting absorber target at the field-speed threshold;
- the open like-assembly Noether sea response route.

The migrated block was deleted from `braid-families.md`, and its live incoming links were redirected to the A2 owner. The legacy accessory material was held outside A2 because it is an assembly-interpretation hypothesis rather than an A2 retention result; the final batch completed its separate triage.

## Final Migration Batch

The final batch completed the source split and re-indexing:

- moved the neutral six-architrino base and generic closed-path chart into `noether-braid.md`;
- renamed the remaining A1-specific source to `braid-a1-dynamics.md` and converted its closure label from $\Lambda_{\mathrm{NS}}$ to $\Lambda_{A1}$;
- renamed the A1.3 and B1 specialist chapters and repaired their live incoming links;
- converted shared mathematics, envelope geometry, recovery requirements, configuration-space diagnostics, and topological charge to the accepted member identifiers;
- removed polarity-placement and legacy support-name classifiers from the canonical-facing analysis space;
- defined Accessory Configuration as a six-architrino record while routing the incompatible four-site/two-site quark shortcut to priority-only review;
- removed the superseded `braid-families.md`, `spindle-braid.md`, and `doubling-frequency-lock.md` source paths.

## Current Source Inventory for Review

Migration is complete. The next pass should decide, one current source at a time, whether its role is still needed, whether it overlaps another source, and whether it should remain separate or be consolidated.

| Current source | Current role | Review question |
| --- | --- | --- |
| `noether-braid.md` | Hub and neutral-braid base | Is the hub compact enough, and does it route the stack in the right reading order? |
| `braid-taxonomy.md` | Canonical dimensions and master tables | Are the four tables complete and mutually orthogonal? |
| `braid-family-a.md` | Family A, A1, A2, and constrained A1 members | Does every definition belong here, with no dynamics leakage? |
| `braid-family-b.md` | Family B and B1 coordinates | Are B1 boundaries and parameters stated once and only once? |
| `braid-family-c.md` | C1/C2 two-B1 composition | Is the generic dual-braid chart sufficiently separated from photon-specific claims? |
| `braid-a1-dynamics.md` | A1 closure, retuning, scaling, alignment, and interpretations | Should this remain one specialist chapter or split into dynamics and downstream interpretation? |
| `braid-a2-symmetry-and-return-response.md` | A2 symmetry, exact fixture geometry, and return-response analysis | Are the invariant-channel theorem and open retention routes now self-contained without leaking back into the Family-A definition? |
| `braid-analysis-methodology.md` | Common candidate-analysis method | Do the wake, probe, energy, sampling, and grading interfaces remain family-general as implementations mature? |
| `braid-a1-3-doubling-frequency-lock.md` | A1.3 lock mathematics | Is the 611-line specialist still internally coherent, or should shared mathematics move out? |
| `braid-b1-symmetry.md` | B1 harmonic matching and discrete symmetry | Is this small specialist worth keeping separate from Family B? |
| `braid-mathematics.md` | Shared exact and hypothesis-level machinery | Does every retained result now apply across more than one family or member? |
| `noether-braid-configuration-space.md` | Supplementary branch diagnostics | Does this remain useful after the canonical taxonomy, or should its durable mathematics be distributed? |
| `braid-recovery-requirements.md` | Realization-independent retention contract | Is the neutral-base instantiation still the right example? |
| `braid-envelope-geometry.md` | Dynamic envelope and export interface | Should member-specific envelope projections be split from the shared interface? |
| `noether-braid-topological-charge.md` | Candidate cross-member topological labels | Which definitions are mature enough to retain in reader-facing prose? |

No legacy source remains to migrate. The approved persistent-index batch has also removed inner/middle/outer and preassigned-hinge semantics from the taxonomy stack and its controlled Archie terminology. Downstream reader chapters, chapter titles, runtime identifiers, and generated artifacts remain separate follow-up scopes; they are not hidden remnants of the source migration.

## Wider-Corpus Taxonomy Audit

The first exact-use audit found seven of 143 AAA documents outside `noether-braid` and the controlled Archie terminology that use the family/member taxonomy in its intended braid sense:

- `spacetime/proper-time-and-time-dilation.md`;
- `reactions/mode-taxonomy.md`;
- `foundations/emergence-of-structure.md`;
- `assemblies/bosons/electroweak-bosons.md`;
- `cosmology/dark-matter.md`;
- `cosmology/CMB.md`; and
- `philosophy-history/theory-bridges/angular-momentum-and-spin.md`.

The case-by-case normalization is complete. `mode-taxonomy.md` already used B1 in its intended sense and required no edit. The other six documents now use persistent binary indices, family/member identifiers, and explicitly branch-derived role labels. In particular, the angular-momentum bridge now states its separated-scale assignment as a worked A1 branch rather than as the identity of the three binaries, and its B1 axial-dipole frame is restricted to the subset satisfying transverse dipole cancellation. All seven files are included in the migrated-scope terminology test so these decisions cannot silently drift.
