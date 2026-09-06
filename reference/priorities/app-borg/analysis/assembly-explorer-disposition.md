Closure goal: Retire the redundant Assembly Explorer runtime while preserving direct and scene-based navigation into Borg's canonical source-owned assembly discovery and exact-record replay surfaces.

# Assembly Explorer Disposition

Status: `accepted and verified` on 2026-09-01.

## Decision

Retire the standalone Assembly Explorer runtime and its `assembly-configuration-explorer.dataset.v2` contract. Route the legacy `assembly-explorer` scene token and scene path directly to `borg-library.html`; retain `assembly-explorer.html` only as a non-indexed user-facing redirect for old direct URLs. The redirect preserves the incoming query and fragment so exact-record links are not silently weakened.

## Basis

Borg now preserves the obligations that formerly justified the separate runtime:

- `assembly-view-collection.v1` preserves external source order and exact record identities;
- the replay session preserves every raw record and stable source/worldline identity;
- optional $S_3$ navigation grouping advances only when every grouped record carries a permutation-canonical key and never replaces the selected raw record;
- filters consume only source-carried values;
- synchronized comparison consumes declared time and unit transforms rather than assuming an identity map;
- field speed and kinematic vector rows are source-owned carriers; and
- Borg Library provides scalable source search, exact identity inspection, record-hash lookup, and exact Borg Workbench handoff.

The retired demo runtime also contained app-local fallbacks and derived energy, momentum, angular-momentum, speed, and $S_3$ quantities over illustrative rows. Those calculations were neither sealed-record replay nor source-owned Borg evidence. They are not migrated into Borg.

Plainly: Borg keeps the trustworthy navigation and inspection behavior. The old page's demo calculations are removed rather than being treated as facts about an assembly.

## Verification

The navigator maps both legacy scene identifiers to `borg-library.html`, but the retired Assembly Explorer scene is absent from public scene search. The compatibility URL preserves its query and fragment while redirecting to Borg Library. Focused navigation, manifest, replay-session, and terminology tests pass; live browser QA confirms that requesting `assembly-explorer.html` finishes at Borg Library. No Assembly Explorer runtime, runtime test, or standalone dataset schema remains.

Claim grade: implemented and measured routing and software behavior. This disposition establishes no geometry, acceleration balance, evolution, retention, stability, binding, physical identity, or scientific acceptance. Falsifier: either legacy route opens a separate runtime, any retired demo contract remains an active consumer, Borg loses raw source order or exact identity, optional grouping replaces a raw record, or the compatibility URL does not land in Borg Library.
