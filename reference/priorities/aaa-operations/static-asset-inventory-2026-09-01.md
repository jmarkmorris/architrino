# Static Asset Inventory — 2026-09-01

## Purpose And Claim Boundary

This record closes OPS-006 with a measured inventory of the active-checkout GitHub Pages payload, the tracked files excluded from that payload, and ignored local output. It classifies asset families as public shipping, build-generated public data, Git-only source material, ignored local output, or candidates for a later deployment-scope decision. No file was deleted, moved, transformed, regenerated as an authored artifact, or removed from publication by this task.

Plainly: this packet identifies which bytes are published and which are only stored locally or in Git. Candidate rows are review targets, not approved deletions.

## Snapshot And Instruments

At `2026-09-02T01:03:30Z`, [`build-static-site.mjs`](../../../scripts/build-static-site.mjs) reconstructed the Pages site in an empty external temporary directory from local HEAD `16e78cc1fc8939e788f0d539735a0b98e7d68377` plus the concurrently active working-tree changes. The build prepared only the ignored runtime families declared by [`generated-runtime-assets.json`](../../../scripts/config/generated-runtime-assets.json), selected linked images through [`pages-image-assets.mjs`](../../../scripts/pages-image-assets.mjs), and copied the resulting payload without changing source assets.

- Uncompressed bytes are the sum of regular-file sizes in the completed build, excluding the zero-byte `.nojekyll` marker.
- Compressed bytes are the sum of Node `zlib.gzipSync(..., { level: 9 })` results for each file independently. This is a reproducible compression proxy, not a measured Pages response body, browser transfer, Actions artifact, or tarball.
- Git-only rows are the regular tracked files reported by `git ls-files -z` that were absent from the completed build, grouped by the builder's ordered exclusion rules.
- Ignored-local rows are regular files reported by `git ls-files --others --ignored --exclude-standard -z`. They have no single compressed representation, so only disk bytes are reported.
- Scene JSON means `content/scenes/**` plus `content/graph/scene_graph.json`. Declared runtime data means the three generated families in `generated-runtime-assets.json`. Review binaries mean the textbook review-copy directory plus the PDG Edit and proof-sheet PDF/PNG outputs named below.

The working tree was shared with other active work. Repeating the build can change the totals whenever tracked sources or generated runtime inputs change, even if HEAD does not.

## Lifecycle Inventory

| Lifecycle | Files | Uncompressed bytes | Per-file gzip bytes | Disposition |
| --- | ---: | ---: | ---: | --- |
| Public Pages payload | 4,248 | 481,498,766 | 207,763,495 | Public shipping under the current builder contract. |
| Declared generated runtime subset | 146 | 179,521,026 | 21,797,317 | Build-generated and public shipping; ignored outputs are reproduced from tracked sources. This row is included in the public total. |
| Tracked Git-only total | 503 | 958,248,972 | 749,182,804 | Preserved in Git and excluded from Pages by existing policy. |
| Ignored local total | 65,681 | 126,858,498,087 | Not applicable | Local analysis, builds, review exports, and generated runtime output; not Git or Pages bytes. |

Plainly: the 481.5 MB site, the 958.2 MB Git-only set, and the 126.9 GB ignored-local set are different storage domains. They must not be added and described as one website size.

### Existing Git-only exclusions

| Existing exclusion | Files | Uncompressed bytes | Per-file gzip bytes | Classification |
| --- | ---: | ---: | ---: | --- |
| Unused `content/assets/images/**` files | 333 | 515,647,205 | 487,144,774 | Git-only; selected out by the image dependency scanner. |
| PowerPoint originals | 15 | 303,530,835 | 202,600,290 | Git-only; reader-facing PDF exports remain public. |
| iOS development files outside shared KaTeX | 79 | 89,841,511 | 10,508,215 | Git-only native-app material. |
| `reference/design/**` production material | 52 | 48,971,893 | 48,842,163 | Git-only design source. |
| Hidden tracked paths | 24 | 257,528 | 87,362 | Git-only repository and agent configuration. |

The excluded-image row includes 14 historical screenshot files totaling 13,660,428 bytes uncompressed and 13,024,149 bytes under the gzip proxy. No filename-matched physics screenshot is in the current Pages payload.

## Public Payload By File Type

These rows are additive and reconcile to the public payload total.

| File type | Files | Uncompressed bytes | Per-file gzip bytes | Public disposition |
| --- | ---: | ---: | ---: | --- |
| JSON | 1,376 | 204,370,678 | 24,435,191 | Shipping; includes scene data and declared runtime data. |
| Images | 217 | 123,227,124 | 114,083,141 | Shipping; 53 files are retained from the dependency-managed image library and other versioned image paths remain in the broad public copy set. |
| PDFs | 20 | 73,758,364 | 43,283,636 | Shipping; dominated by reader-facing textbook review copies and PDG Edit review outputs. |
| Markdown | 1,220 | 38,634,453 | 11,873,353 | Shipping source for reader and repository-document surfaces. |
| JavaScript | 865 | 19,370,388 | 4,797,377 | Shipping application, library, and currently broad-copied tool source. |
| Audio | 239 | 13,158,928 | 6,972,325 | Shipping production Greek audio plus review and audition packets. |
| Other | 257 | 7,995,669 | 1,925,135 | Shipping binary, text, Python, shell, and miscellaneous formats. |
| HTML | 24 | 455,561 | 86,229 | Shipping application and review shells. |
| CSS | 10 | 267,809 | 46,828 | Shipping styles. |
| Fonts | 20 | 259,792 | 260,280 | Shipping shared KaTeX fonts; already compressed font data gains nothing from per-file gzip. |
| WASM | 0 | 0 | 0 | No tracked or public WASM asset exists in this snapshot. |

### Required focused overlays

These rows overlap the file-type table and must not be added to it.

| Focused family | Files | Uncompressed bytes | Per-file gzip bytes | Current disposition |
| --- | ---: | ---: | ---: | --- |
| Declared generated runtime data | 146 | 179,521,026 | 21,797,317 | Public shipping and build-generated. Keep. |
| Scene JSON | 397 | 11,902,808 | 538,135 | Public shipping. Keep for scene and document navigation. |
| Textbook review-copy package | 15 | 53,734,249 | 33,724,511 | Public shipping under the accepted reader-facing PDF-export policy. Keep unless that product policy changes. |
| PDG Edit review exports and proof sheets | 4 | 17,544,326 | 8,316,832 | Public today; candidate for deployment exclusion after consumer verification. |
| Greek audio review and audition packets | 229 | 11,937,521 | 6,279,988 | Public today; candidate for deployment exclusion while preserving Git provenance and the 24-file production set. |
| Active Greek production audio | 24 | 1,326,672 | 733,289 | Public shipping and consumed by the app. Keep. |
| Local capture profile `.tmp/causal-delay-feedback-browser-qa-profile/**` | 279 | 6,881,491 | Not applicable | Ignored local QA output; not published. |

Plainly: review-copy PDFs are currently an intentional public product, while PDG Edit proof sheets and Greek audition packets look like development review material. The latter two need an explicit publication decision before the builder excludes them.

## Largest Public Consumers

| Public family or file | Uncompressed bytes | Share of payload | Observation |
| --- | ---: | ---: | --- |
| Declared generated runtime data | 179,521,026 | 37.28% | Reproducible and highly compressible; it is required by current app consumers. |
| All public images | 123,227,124 | 25.59% | Mostly already-compressed raster data; dependency-filtered library images are only part of this row. |
| All public PDFs | 73,758,364 | 15.32% | The textbook review-copy package contributes 53,734,249 bytes. |
| `content/generated/equation-mapping/corpus-equations.json` | 31,345,179 | 6.51% | Declared runtime output; gzip proxy is 2,064,712 bytes. |
| `content/generated/source-index/local-full-corpus-snapshot.v1.json` | 29,408,487 | 6.11% | Declared runtime output; gzip proxy is 6,292,783 bytes. |
| `content/generated/pdf/textbook/review-copies/architrino-textbook.pdf` | 20,665,288 | 4.29% | Intentional public textbook review copy. |

The public payload's per-file gzip proxy is 207,763,495 bytes, 43.15% of its uncompressed size. That ratio is not a monthly-bandwidth estimate: a visit requests only a route-specific subset, caching changes repeat transfer, and Pages response compression was not measured here.

## Candidate Deployment Exclusions

The following disjoint families total 78,593,285 public bytes and 56,974,065 per-file gzip bytes, or 16.32% of the uncompressed payload. They are candidates for a separate deployment-scope decision, not authorized removals.

| Candidate family | Files | Uncompressed bytes | Per-file gzip bytes | Evidence and required decision |
| --- | ---: | ---: | ---: | --- |
| `reference/learning-office/comics/assets/*-prototype.png` | 16 | 40,901,651 | 40,518,592 | No web consumer reference was found outside source tracking; 11 files are byte-identical to images already under `content/assets/images/comics/`. Confirm the production originals need not remain publicly downloadable, then exclude the directory from Pages while preserving Git. |
| PDG Edit review exports and proof sheets | 4 | 17,544,326 | 8,316,832 | `scripts/glyphs/pdgedit-review.{pdf,png}` and `stats/proof-sheet.{pdf,png}` are referenced by export tooling and tests, not by an identified public runtime consumer. Confirm no direct-download contract, then make them Git-only. |
| Greek review and audition packets | 229 | 11,937,521 | 6,279,988 | The runtime consumes the 24 root-level WAVs; the nested packets preserve generation and human-review provenance. Decide whether that provenance must be public on Pages or can remain Git-only. |
| `tests/**` | 399 | 5,236,773 | 1,284,709 | Test source is copied by the broad versioned-path rule and has no browser-runtime obligation identified here. Confirm public source browsing does not require Pages duplication, then exclude it. |
| `attractor-ensemble-out/**` | 6 | 2,973,014 | 573,944 | The harness writes this tracked result family, and no public runtime consumer was found. Confirm it has no direct-download contract, then make it Git-only or move future machine output under the established retention policy. |

The remaining `scripts/**` files excluding the two PDG Edit review exports contribute another 11,734,403 bytes across 912 files. They are a deployment-allowlist audit target, not a blanket exclusion candidate: scripts can be linked as reproducibility or download surfaces, so each public consumer obligation must be resolved before narrowing that path.

## Ignored Local Output

| Ignored family | Files | Disk bytes | Classification |
| --- | ---: | ---: | --- |
| `.local-data/braid-analysis/**` | 44,280 | 107,883,188,005 | Ignored local analytical output; not Git or Pages. |
| All `.tmp/**` | 19,969 | 17,893,943,410 | Ignored local builds, simulation runs, captures, and review renders; not Git or Pages. |
| `.local-data/childrens-books/**` | 722 | 648,443,828 | Ignored local production and review output; not the public site. |
| `.local-data/braid-program/**` | 401 | 248,602,647 | Ignored local analytical output; not Git or Pages. |
| Ignored `content/**` runtime output | 162 | 179,670,594 | Reproducible ignored build data; the builder publishes the declared 146-file subset. |

Ignored local storage is the dominant disk consumer, but it does not consume Pages or Git storage. Retention, backup, and deletion decisions for that material belong to the owning analytical lanes and the machine-artifact retention policy, not to a website-size cleanup.

## Current Disposition

1. The recent deployment reductions remain effective: 515,647,205 unused image bytes and 442,601,767 bytes of other tracked exclusions stay out of Pages while their sources remain in Git.
2. No Pages-limit response is needed. The active-checkout payload remains below half of the builder's 1,000,000,000-byte ceiling, consistent with the dated [limits baseline](github-pages-and-actions-limits-2026-09-01.md).
3. The next safe size opportunity is a deployment-scope decision over the 78,593,285-byte candidate set, led by duplicated comic prototypes and development review packets. No candidate was excluded in OPS-006.
4. Public JSON is large uncompressed but compresses well; public images are the largest transfer-resistant class. OPS-004 must measure representative cold and warm route loads before converting these aggregate bytes into a bandwidth or browser-performance claim.
5. Actions artifact retention remains separate. OPS-007 should use the public and ignored review families here to set workflow artifact size and retention limits without treating local disk output as Actions storage.

## Reproduction And Falsifiers

- Rebuild the public snapshot with `node scripts/build-static-site.mjs --out <empty-external-directory>`. A different working tree, runtime input, or image dependency graph can overturn every public count and byte total.
- Recompute the per-file gzip proxy with Node `zlib.gzipSync` at level 9. Pages response headers or a captured browser network trace can overturn its usefulness as a transfer approximation.
- Compare `git ls-files -z` with the completed build. A builder-rule change or new public allowlist can overturn the Git-only classification.
- Recompute ignored-local sizes with `git ls-files --others --ignored --exclude-standard -z`. Local runs can change these values immediately, and absence from that list would overturn the ignored classification.
- Search actual route and application consumers before approving any candidate exclusion. A public link, fetch, import, direct-download promise, or attribution dependency overturns the corresponding no-consumer observation.
