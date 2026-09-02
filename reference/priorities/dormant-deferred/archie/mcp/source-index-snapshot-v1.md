# Source Index Snapshot V1

## Status

- Kind: `priority-contract`
- Claim level: `priority-only`
- Status: `fixture-regression-and-local-full-corpus-passing`
- Parent tracker: [Architrino MCP](priorities.md)

## Purpose

`archie-source-index-snapshot/v1` is the executable contract for the immutable data bundle consumed by the local MCP adapters.

The six-source fixture remains the small negative and regression surface. The mechanically enumerated local implementation is recorded in [Full-Corpus Local MCP V1](full-corpus-local-v1.md). Neither artifact creates a public MCP endpoint or claims an accepted-`main` publication.

## Implemented Artifacts

| Artifact | Role |
| --- | --- |
| [Archie service schema](../../../../../src/archie-service/contracts/v1/schema.json) | Defines the build-input, snapshot, search-view, graph-view, metadata-view, and negative-suite shapes. |
| [Snapshot implementation](../../../../../src/archie-service/source-index/snapshot-v1.mjs) | Builds canonical views, computes hashes, enforces authority rules, and validates snapshots. |
| [Build input fixture](../../../../../tests/archie-service/fixtures/source-index/source-index-build-input.v1.json) | Declares six representative source records, two explicit graph edges, one equation, one figure, and the live generated-artifact inputs. |
| [Generated snapshot fixture](../../../../../tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json) | Stores the expected normalized snapshot and its hashes. |
| [Negative suite](../../../../../tests/archie-service/fixtures/source-index/source-index-negative-suite.v1.json) | Declares failures for missing paths, duplicate ids, invalid parents, authority inflation, visibility leakage, false metadata provenance, and stale hashes. |
| [Builder and checker](../../../../../scripts/archie-service/build-source-index.mjs) | Writes the review fixture in `--write` mode and performs deterministic, provenance, authority, route, and negative checks in `--check` mode. |
| [Focused tests](../../../../../tests/archie-service-source-index-snapshot.test.js) | Rebuilds the fixture, tests input-order invariance, and confirms tampering and priority-authority inflation are rejected. |
| [Full-corpus enumerator](../../../../../src/archie-service/source-index/full-corpus-v1.mjs) | Discovers declared authored documents and sections, eligible reading copies and scenes, exact metadata, typed structural edges, and local source-state provenance. |
| [Full-corpus builder](../../../../../scripts/archie-service/build-full-corpus-source-index.mjs) | Atomically writes or check-only verifies the complete local snapshot. |
| [Full-corpus snapshot](../../../../../content/generated/source-index/local-full-corpus-snapshot.v1.json) | Supplies the exact-content, search, graph, and metadata views used by the full-corpus launcher. |
| [Full-corpus focused tests](../../../../../tests/archie-service-full-corpus-source-index.test.js) | Independently checks declared-document coverage, extraction, parents, visibility, determinism, Unicode continuation, and tamper rejection. |

## Snapshot Contents

One snapshot contains:

1. snapshot and view schema versions;
2. the declared repository ref;
3. the SHA-256 hashing rule and `canonical-json-v1` normalization rule;
4. live generated-artifact routes and their digests;
5. source-record counts by controlled source class;
6. visibility-policy version, freshness, and rollback parent;
7. per-source file and selected-section hashes;
8. a deterministic exact-content view for snapshot-only reads;
9. a deterministic search view;
10. a typed graph view;
11. an equation-and-figure metadata view;
12. per-view hashes and one enclosing snapshot hash.

Build time is deliberately excluded from the hashed payload. A changing timestamp would make identical inputs produce different fingerprints.

## Hash Boundaries

The contract uses SHA-256 as a change detector.

| Hash | Covers | Failure meaning |
| --- | --- | --- |
| `sourceContentSha256` | Raw bytes of one source file. | The source file changed or the recorded digest is false. |
| `selectionSha256` | The exact selected Markdown section or full source record. | The indexed section changed even if its route did not. |
| Content-view `sha256` | Exact selected content, type, source id, and selection hash for every source. | Readable snapshot content changed or detached from source provenance. |
| `assetSha256` | The exact figure asset bytes. | The figure changed or the metadata points to the wrong asset. |
| Generated-artifact digest | One generated file, or a sorted path-plus-hash manifest for a directory. | A graph, Markdown index, reading copy, or table-of-contents input changed. |
| View `sha256` | The canonical exact-content, search, graph, or metadata view without its own hash field. | That view was altered or normalized differently. |
| `snapshotSha256` | The complete canonical snapshot without its own hash field. | Any protected snapshot field or child view changed. |

The fixture proves order invariance by reversing the declared source, graph-edge, and metadata arrays and requiring the same final snapshot hash.

## Provenance Contract

Each searchable source record carries:

- stable source id;
- title and route;
- physical source path and optional section anchor through `sourceInputs`;
- source class;
- authority status;
- visibility;
- canonical parent where required;
- strongest allowed claim label;
- source-file and selection hashes.

Equation metadata is admitted only when the exact TeX occurs in its selected source. Figure metadata is admitted only when the selected Markdown source actually references the declared asset. Extraction does not validate the mathematics or turn the figure into proof.

Graph edges and metadata records inherit retrieval visibility from their `evidenceSourceId` or `sourceId`. A future MCP tool must apply that source-record visibility before returning either record; the relationship or metadata payload cannot make itself public independently.

## Visibility And Authority Matrix

| Source class | Allowed authority | Allowed visibility | Parent rule |
| --- | --- | --- | --- |
| `published_corpus` | `primary` | `public` | No parent required. |
| `generated_reading_copy` | `routing_only` | `public` | Must name a `published_corpus` parent. |
| `scene_route` | `routing_only` | `public` | Must name a `published_corpus` parent. |
| `app_guide` | `diagnostic` | `public` | No parent required for app behavior. |
| `archie_reference` | `primary` or `diagnostic` | `public` | No parent required under the current source policy. |
| `priority_material` | `priority_only` or `excluded` | `development_status`, `operator_developer`, or `excluded` | It cannot become ordinary public corpus authority. |
| `external_prior_physics` | `comparison_only` or `excluded` | `external_curated` or `excluded` | It cannot become native theory authority. |

The matrix is enforced while building and while reading the completed snapshot. Generated routing layers therefore cannot elevate themselves by copying authoritative prose.

## Verification Fixtures Required for Advancement

The negative suite must reject:

1. a source path that does not exist;
2. duplicate source ids;
3. a missing canonical parent;
4. a scene route parent that is not published corpus;
5. priority material marked `primary`;
6. priority material marked `public`;
7. equation TeX absent from its source section;
8. a figure asset not referenced by its source section;
9. an old source hash attached to current source bytes;
10. an altered search-view hash.

These are test fixtures for the stated contract. They do not independently prove every future full-corpus ingestion path; production expansion must preserve the same gates while adding source families and record volume.

## Upstream Freshness Gate

The snapshot builder hashes the generated artifacts it receives; it does not replace their owning generators or prove that they are current relative to canonical sources. The ordered pipeline must run `node scripts/check-content-integrity.mjs` before building or publishing a source-index snapshot.

If that upstream check reports generated drift, the snapshot is not publishable even when its own hashes are internally consistent. After the owning generator is explicitly run and its check passes, the source-index snapshot will correctly report digest drift until its expected artifact is regenerated and rechecked.

## Commands

Check without writing:

```bash
node scripts/archie-service/build-source-index.mjs --check
node --test tests/archie-service-source-index-snapshot.test.js
node scripts/check-content-integrity.mjs
```

Regenerate the expected fixture after an explicitly accepted source or contract change:

```bash
node scripts/archie-service/build-source-index.mjs --write
node scripts/archie-service/build-source-index.mjs --check
```

## Acceptance Falsifiers

The V1 contract is not accepted if any of these observations occurs:

- identical declared inputs produce different snapshot hashes;
- reordering input records changes the snapshot hash;
- a source or asset changes while its recorded hash still passes;
- priority material enters the public set or gains primary authority;
- a generated route lacks a published canonical parent but still builds;
- an equation or figure is indexed without source evidence;
- `--check` modifies any file;
- schema validation or the focused negative suite fails.

## Remaining Boundary

The local full-corpus snapshot now supplies [MCP Tool Contract V1](mcp-tool-contract-v1.md). Publication from accepted `main`, atomic remote artifact storage, rollback history, and deployment freshness remain outside this local contract.
