# Borg Assembly Identity-Relation Contract

Status: ACCEPTED REGISTRY CONTRACT. The 45-entry Borg catalog relation, 144 exact configurations, typed identity comparisons, explicit unavailable occurrence/causal-state dispositions, indexed registry, scientific-coverage counts, independent migration verification, and million-entry engineering measurement implement the relations below.

## Purpose

Borg must answer several different identity questions without collapsing them into one overloaded idea of “the same assembly.” This contract fixes the current seed-catalog relation used to list 45 unique braid entries over 144 exact configurations and separately count exact configurations that have source-owned active evidence relations.

Plainly: the number of pictures, the number of exact configurations, and the number of configurations with findings are three different counts.

## Current Objects

| Object | Current identity | Meaning |
| --- | --- | --- |
| Borg braid entry | Versioned result relation described below | One visual discovery entry. It may contain one exact configuration or a source-declared parameter set of exact configurations. It does not assert that the assembly contains exactly one component braid. |
| Exact configuration | `assemblyId + modelRevisionSha256` | One exact identity-bearing assembly specification and motion prescription. |
| Sealed display record | Exact configuration identity plus `recordSha256` | One exact byte representation used for replay. |
| Scientific evidence relation | `relationId` plus the adjudication-projection revision | A source-owned adjudication or finding-context statement linked by exact identity or an explicitly declared broader structured matcher. |
| Component braid | Source-declared component membership within an exact configuration | A physical-composition relation used by the `Braids in assembly` facet. It is not the Borg braid-entry identity. |

Plainly: a Borg card can represent an assembly containing two component braids. The card count and the component-braid count answer different questions.

## Seed `same braid entry` Relation

For exact configurations $x$ and $y$, the seed demonstrator places them in the same Borg braid entry exactly when either their exact configuration identities agree or both carry `equal-radius-planar-three-binary-balance-row.v1` parameters from the same exact source-ledger SHA-256. No label, filename, visual resemblance, architrino count, facet value, or taxonomy name participates in this relation.

Thus the current 144 exact configurations form 45 Borg braid entries: 44 singleton entries and one equal-radius planar three-binary circular-balance entry containing 100 exact configurations. The group retains each member's independent `assemblyId + modelRevisionSha256`, filters members before grouping, and opens the exact configurations on selection.

Plainly: the one 100-member card means “one source-declared braid relation with 100 calculated configurations,” not “one record copied 100 times.”

The canonical [assembly registry](assembly-registry.v1.json) assigns each of the 45 entries one permanent opaque `braidId`. The identifier survives presentation renames and does not encode a mutable label, taxonomy placement, representative model revision, geometry, evidence grade, or component-braid count. Exact members retain independent `assemblyId + modelRevisionSha256` identities beneath that entry.

Plainly: the card identity and each exact configuration identity now answer different questions and remain independently copyable.

## Scientific-Coverage Configuration Count

Let $C_b$ be the exact configurations in braid entry $b$, and let $R_a$ be the active relations in one exact `borg-scientific-status-projection.v1` revision. The displayed count is

$$
N_{\mathrm{active}}(b)=\left|\left\{c\in C_b:\exists r\in R_a\text{ such that }r\text{ matches }c\right\}\right|.
$$

One exact configuration counts once even if several active relations match it. An exact adjudication match is allowed only through the exact `assemblyId + modelRevisionSha256` pair. A broader finding-context match is allowed only through its explicit source-declared structured carrier and remains labeled broader context rather than an exact verdict. A label, prose search, filename pattern, rendered shape, or app-local physics calculation may not create either relation.

Plainly: this is a count of configurations that have at least one indexed finding, not a count of papers, measurements, plots, or claims.

The canonical `braid-candidate-adjudication-projection.2026-09-01.v1` contains 26 Braid Program adjudication rows and five migrated finding-context relations. It links 136 current exact configurations across 37 of the 45 braid entries to at least one active relation. Twenty-three current exact configurations carry exact adjudication bindings; the withdrawn centered-five-coordinate display identity retains its exact scientific binding off-catalog, and no evidence transfers to the replacement stella-octangula record. The remaining current configurations report `No adjudication linked` when no exact row applies, while `No active findings indexed yet` on a card means only that this projection revision has no active relation for the entry.

Plainly: zero indexed findings is not a negative scientific result. A source owner can add an existing or new finding through a reviewed relation-registry revision without changing the configuration identity.

Relation status is lifecycle state, not verdict sign. The projection supports `active`, `superseded`, and `withdrawn`; only `active` contributes to current exact verdicts and counts. A current negative result may remain active, while a once-positive result may be superseded. Exact identity mismatch, stale source revision, missing anchor, unsupported state token, duplicate exact relation, or broken evidence link suppresses the verdict and reports `Projection stale or invalid`.

## Other Required Identity Relations

The registry exposes the following typed relations without substituting one for another:

- exact sealed-record equality compares `recordSha256` under the declared record schema;
- model-specification equality compares canonical identity-bearing model specifications under frozen symmetry and persistent-order rules;
- future-sufficient causal-state equality returns an explicit unavailable result until the complete future-consumed EOM checkpoint and path-history state is defined and proven sufficient for identical discrete decisions;
- occurrence and formation-lineage continuity uses the ratified `occurrenceId` field plus source-carried continuation, merge, split, and supersession events; every current prescribed model record reports that identity unavailable rather than fabricating an occurrence;
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
| One exact configuration linked to two active evidence rows | Its scientific-coverage configuration contribution is one | The card does not report two configurations. |
| One exact configuration with no active exact adjudication relation | `No adjudication linked` | No scientific finding, failure, or lack of study is established. |
| The display-withdrawn centered five-coordinate identity and its stella-octangula replacement | The former retains its exact evidence binding off-catalog | The replacement inherits no `H1`--`H5` state or verdict. |
| One continuing evolved occurrence whose morphology changes | Lineage continuity may hold when source events say so | Morphology equality need not hold. |

## Migration And Falsifiers

The completed migration assigns a permanent opaque braid identity, preserves every exact configuration member, retains relation revision and provenance, and rejects ambiguous or label-derived mappings. Changing a display label or taxonomy membership leaves model and occurrence identity unchanged. Changing identity-bearing inventory, persistent source order, component relations, coordinates, motion prescription, applicable speed policy, units, source-law version, or future-consumed causal state changes the applicable revision identity. The independently authored Python verifier reconstructs source scientific bytes and sealed-record hashes without importing production identity or emission code.

This seed contract is falsified if the current default query does not return exactly 45 braid entries over all 144 exact configurations; if the balance group does not contain exactly 100 independent exact identities; if the scientific-coverage count double-counts a configuration with multiple relations; if a missing relation is presented as scientific absence; if a broader context is presented as an exact verdict; if a label, filename, pixel comparison, or app-local dynamics calculation creates a finding or identity relation; or if a hash-pinned exact selection is silently retargeted.

Plainly: the counts are trustworthy only while every grouping and finding link can be traced back to structured source identity and a named revision.

Closure goal: Preserve the accepted 45-entry/144-configuration migration and fail-closed typed identity boundaries as new models, occurrences, taxonomy relations, and evidence records enter the indexed registry.
