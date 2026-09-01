# Borg Assembly Identity-Relation Contract

Status: CURRENT SEED CONTRACT. The 45-entry Borg demonstrator and active-finding counts implement the relations below. Permanent opaque braid identity, evolved-occurrence identity, causal-state equality, lineage lifecycle, and the indexed million-entry registry remain BORG-014 work.

## Purpose

Borg must answer several different identity questions without collapsing them into one overloaded idea of “the same assembly.” This contract fixes the current seed-catalog relation used to list 45 unique braid entries over 144 exact configurations and separately count exact configurations that have source-owned active findings.

Plainly: the number of pictures, the number of exact configurations, and the number of configurations with findings are three different counts.

## Current Objects

| Object | Current identity | Meaning |
| --- | --- | --- |
| Borg braid entry | Versioned result relation described below | One visual discovery entry. It may contain one exact configuration or a source-declared parameter set of exact configurations. It does not assert that the assembly contains exactly one component braid. |
| Exact configuration | `assemblyId + modelRevisionSha256` | One exact identity-bearing assembly specification and motion prescription. |
| Sealed display record | Exact configuration identity plus `recordSha256` | One exact byte representation used for replay. |
| Active finding relation | `findingId` plus the relation-registry revision | A source-owned evidence statement linked to an exact configuration by an allowed structured matcher. |
| Component braid | Source-declared component membership within an exact configuration | A physical-composition relation used by the `Braids in assembly` facet. It is not the Borg braid-entry identity. |

Plainly: a Borg card can represent an assembly containing two component braids. The card count and the component-braid count answer different questions.

## Seed `same braid entry` Relation

For exact configurations $x$ and $y$, the seed demonstrator places them in the same Borg braid entry exactly when either their exact configuration identities agree or both carry `equal-radius-planar-three-binary-balance-row.v1` parameters from the same exact source-ledger SHA-256. No label, filename, visual resemblance, architrino count, facet value, or taxonomy name participates in this relation.

Thus the current 144 exact configurations form 45 Borg braid entries: 44 singleton entries and one equal-radius planar three-binary circular-balance entry containing 100 exact configurations. The group retains each member's independent `assemblyId + modelRevisionSha256`, filters members before grouping, and opens the exact configurations on selection.

Plainly: the one 100-member card means “one source-declared braid relation with 100 calculated configurations,” not “one record copied 100 times.”

The demonstrator's current group-result identifier is query identity, not yet the permanent opaque `braidId` required by the full registry. The permanent id must survive presentation renames and model revisions and therefore cannot be inferred from a mutable label or borrowed from one representative configuration.

Plainly: the 45-card relation is usable now, but BORG-014 still owes stable long-lived braid ids before a million-entry migration.

## Active-Finding Configuration Count

Let $C_b$ be the exact configurations in braid entry $b$, and let $R_a$ be the active relations in one exact `borg-library-finding-relations` revision. The displayed count is

$$
N_{\mathrm{active}}(b)=\left|\left\{c\in C_b:\exists r\in R_a\text{ such that }r\text{ matches }c\right\}\right|.
$$

One exact configuration counts once even if several active findings match it. A finding match is allowed only through a source-declared structured carrier or the exact `assemblyId + modelRevisionSha256` pair. A label, prose search, filename pattern, rendered shape, or app-local physics calculation may not create the relation.

Plainly: this is a count of configurations that have at least one indexed finding, not a count of papers, measurements, plots, or claims.

The initial `borg-library-finding-relations.2026-09-01.v1` index contains five active relations: the regular alternating circular-balance landscape, the exact planar three-binary balance ladder, the orthogonal-plane weave no-balance result, the phase-varying enclosed-root result, and the asymmetric counter-breathing conditional-cover result. They link 114 exact configurations across 15 of the 45 braid entries. The remaining 30 entries report `No active findings indexed yet`; that phrase means only that this registry revision has no active relation for the entry.

Plainly: zero indexed findings is not a negative scientific result. A source owner can add an existing or new finding through a reviewed relation-registry revision without changing the configuration identity.

Finding status is lifecycle state, not verdict sign. A later relation schema must allow at least `active`, `superseded`, and `withdrawn`; only `active` contributes to the count. A current negative result may remain active, while a once-positive result may be superseded. The v1 file contains active relations only and fails closed on other statuses until that lifecycle migration is implemented.

## Other Required Identity Relations

The seed grouping does not replace the remaining typed relations required by BORG-014:

- exact sealed-record equality compares `recordSha256` under the declared record schema;
- model-specification equality compares canonical identity-bearing model specifications under frozen symmetry and persistent-order rules;
- future-sufficient causal-state equality remains unavailable until the complete future-consumed EOM checkpoint and path-history state is defined and proven sufficient for identical discrete decisions;
- occurrence and formation-lineage continuity requires a separate opaque occurrence identity and source-carried continuation, merge, split, and supersession events;
- morphology similarity requires a named metric, tolerance, alignment rule, and comparison time or interval; and
- taxonomy co-membership requires a named taxonomy revision and membership relation.

Plainly: matching previews or matching taxonomy tags cannot prove that two records have the same history, future, or formation lineage.

## Examples And Counterexamples

| Pair or case | Relation that holds | Relation that does not follow |
| --- | --- | --- |
| Two byte-identical replays of one exact record | Exact configuration and sealed-record equality | A new occurrence or lineage is not created merely by replaying bytes. |
| Two equal-radius planar three-binary balance rows with different speeds and radii from the same exact balance ledger | Same Borg braid entry | Exact configuration equality and sealed-record equality do not hold. |
| A presentation rename with unchanged identity-bearing specification | Exact configuration identity remains addressable | Taxonomy label equality is not required. |
| Two circular-looking previews with different structured sources | Morphological resemblance may be proposed under a future metric | Same braid entry, model equality, causal-state equality, and lineage continuity do not follow. |
| One exact configuration linked to two active finding rows | Its active-finding configuration contribution is one | The card does not report two configurations. |
| One exact configuration with no v1 finding relation | Zero indexed active findings | No scientific finding, failure, or lack of study is not established. |
| One continuing evolved occurrence whose morphology changes | Lineage continuity may hold when source events say so | Morphology equality need not hold. |

## Migration And Falsifiers

The full registry migration must assign a permanent opaque braid identity, preserve every exact configuration member, retain relation revision and provenance, and reject ambiguous or label-derived mappings. Changing a display label or taxonomy membership must leave model and occurrence identity unchanged. Changing identity-bearing inventory, persistent source order, component relations, coordinates, motion prescription, applicable speed policy, units, source-law version, or future-consumed causal state must change the applicable revision identity.

This seed contract is falsified if the current default query does not return exactly 45 braid entries over all 144 exact configurations; if the balance group does not contain exactly 100 independent exact identities; if the active-finding count double-counts a configuration with multiple findings; if a missing relation is presented as scientific absence; if a label, filename, pixel comparison, or app-local dynamics calculation creates a finding or identity relation; or if a hash-pinned exact selection is silently retargeted.

Plainly: the counts are trustworthy only while every grouping and finding link can be traced back to structured source identity and a named revision.

Closure goal: Preserve 45 distinct visual braid entries, 144 exact configuration identities, and source-owned per-braid active-finding counts while replacing the seed result relation with permanent opaque braid, occurrence, causal-state, lineage, morphology, record, and taxonomy identities suitable for the million-entry registry.
