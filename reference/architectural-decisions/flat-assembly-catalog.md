# Flat Assembly Catalog

Status: Accepted by the operator, 2026-08-30.

## Decision

An assembly catalog is a flat collection of individually identified records, not a family/member hierarchy. A record requires neither a family identifier nor a parent entry. Human-readable codes such as A1.0, A2.0, A3.0, and F6c are aliases, not structural addresses. Discovery uses explicit properties, search, and exact record identity. Optional query groups collect current matches; they do not create permanent families or assign a representative's properties to every result.

Borg's left-panel Starting geometry menu contains Random architrinos followed by one catalog-ordered list of all prescribed records. The catalog owns only routing identity, current label, and record URL. No family heading, mandatory family field, or prefix-derived parent is part of this contract. Source provenance remains inspectable without presenting its historical family field as a current classification.

Plainly: users choose an assembly or narrow the list by its properties. They do not have to choose a family first, and a new kind of assembly needs no family assignment to appear.

## Mathematical And Evidence Boundary

Removing families from catalog organization does not remove reusable equations or geometric constraints. The A1/A2/A3 definitions and common-axis constraints remain mathematical sets of admitted coordinates. Those sets can overlap and can be used by source validators without becoming parents of catalog entries. Physical component relationships, such as declared braid membership and binary pairings, remain independent data.

Existing prescribed specifications, sealed records, analytical registry declarations, and historical evidence retain their recorded `familyId` fields and stable `family-*` identifiers where current source validators or exact provenance consume them. Analytical inventory checks compare these fields with the source specification, not with the browse catalog. They must not be used to reconstruct navigation families or infer facets from names. Removing such source fields requires a separately versioned source-contract migration with equivalent constraint checks and independently verified recalculation when needed; changing a label or hiding a heading does not authorize rewriting evidence.

Plainly: keep the mathematics and the history, but stop making family membership a requirement for identifying or browsing an assembly.

## Propagation And Verification

- The shared Borg catalog has no `familyId`, `familyLabel`, or parent field; the same flat contract applies to all catalog consumers and future entries.
- The workbench and Assembly Library use the same labels and exact record targets. Saved selections, source bytes, classifications, and scientific scores do not change.
- Canonical example-navigation tables omit family columns. Mathematical exposition may collect related constraints, but those collections are not catalog families.
- Tests must cover catalog entries without family metadata, rejection of embedded parent/family fields, unchanged source geometry checks, one menu choice per record, source order, external-record selection, and exact saved links.
- Generated publication outputs remain governed by the repository's explicit-regeneration rule. On-demand iOS snapshots and historical evidence are not rewritten as presentation cleanup.

Implementation and remaining registry work are tracked in [BORG-014](../priorities/app-borg/work-queue.md#borg-014--assembly-registry-durable-identity-and-taxonomy-browser). This decision does not by itself complete opaque model/occurrence identity, general facet definitions, source-schema migration, independent recalculation, or million-entry indexing.
