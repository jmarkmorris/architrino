# SURFACE-005 independent replay review

**Status: ✓ Independent data, mathematical-adapter and panel review complete on the identities recorded below.** Root's actual browser-delivery verification is separate and remains its integration responsibility. This is a display/data review, not a new qualification of the underlying six-pole evolution.

## Independence and reference

The reviewer first read the repository startup owners, the Ramon E. Moore role and the accepted research account, without inspecting a new Surface implementation. The separately derived [reference](../analysis/six-pole-replay-independent-reference-2026-10-29.md) was saved and hashed before any new subject read: SHA256 `d99bf9352c9da953b011f8c0c184591fecd1a372dbfca5150a1a1e8b38d34b9b`. It fixes the six coordinate paths, polarities, 2/2/1 partner classes, $T=10t$ units, signed velocity and $l=-w^2-r$ support account, together with exact release and quarter-turn cases.

The separately authored `.tmp/surface-005-review/known-reference.mjs` imports no Surface subject module. It constructs the path using Rodrigues rotation about an independently constructed great-circle axis and calculates the static five-partner vector sum. `node .tmp/surface-005-review/known-reference.mjs` passed **10 of 10 known and negative controls before target review**, as recorded in `.tmp/surface-005-review/known-reference-results.json`. The controls expose wrong return-direction signs, omitted geometric support, incorrect factors of ten and incorrect partner counts.

## Source scope established before conversion review

**Measured by direct source and JSON-key inspection:** the wave15 and wave16 accepted files retain the release-window end time, coordinate and speed, but do not retain the quadrature's in-memory `nodes` table. Consequently an initial animation from exact rest at zero to the first retained endpoint may be illustrative interpolation, with that limitation visible; it is not a sequence of retained reviewed interval observations. The wave16 control record has a separate comparison at $t=1.21$, not a general sample table. No new scientific trajectory was computed for this review.

**Measured from the frozen steps7 loader and like-reception adjudication4:** the accepted like-reception v4 prefix is `s1a2,s1b2,s2a3,s2b2,s3a,s3b`, steps95–154. Replacing `s2b2` with `s2b` or omitting `s3a` would use a different chain or leave a gap. The accepted prefix includes 204 records through local step154 because the earlier wave16 and wave17 step numbers reset. Source identity plus local step, or a distinct monotone replay index, must be used instead of deduplicating solely by `step`.

**Measured from the current manuscript correction and post-turn synthesis:** the signed cm49 rebuilt R1–R6 chain, steps155–570, supersedes the sign-losing correlated resumes. The cm49 P4–P6 chain continues through688. The replay must preserve their exact source hashes and `signed-v49` format identity. Agreement with a former record is consistency, not permission to use its suspended correlation certificate.

## Findings and corrected-byte verification

1. **✓ Source selection repaired.** The initial converter iterated all11 rows of the wave16 file, including the refused candidate11. The retained source requires only1–10. The corrected source manifest now states `firstStep`/`lastStep` for each history source, and the converter refuses an uncertified row within the selected range. This fixes selection without accepting the candidate. The exact six-file like-reception v4 chain was also confirmed before conversion.
2. **✓ Event provenance made explicit.** The initial pins did not include the owners of the early support-zero and antipodal-reception brackets. The corrected pin list includes antipodal reviews6 and10 in addition to the post-turn recomputation and reviews15–21. No finer early event was inferred from coarse display observations.
3. **✓ Analytical viewer endpoint repaired.** The first `SurfaceViewer.setRecord` implementation selected `record.results.at(-1)` unconditionally, which does not exist in an analytical replay. Its corrected branch uses `sixPoleBounds(record).end` for this schema and the existing result coverage for an EOM record.
4. **✓ Reset repaired.** The original generic reset changed the analytical case's identity to an EOM-style random run ID, after which preparation validation rejected its schema. The corrected branch recreates the exact six-pole preparation. Source inspection confirms start returns immediately for that preparation, inspection is disabled, and an analytical record cannot resume an EOM calculation.
5. **✓ Speed label corrected.** $w$ already expresses speed in normalized wake-speed units. The corrected panel labels magnitude as `|w| (wake-speed units)`, avoiding a second implied normalization.

The reviewer did not edit any subject code. Root supplied the corrections and the reviewer reread the affected paths and reran the relevant checks.

## Independent check results

| Check | Measured result | Scope and independence |
| --- | --- | --- |
| `node .tmp/surface-005-review/known-reference.mjs` | 10/10 pass before subject targets | Independent Rodrigues construction, static five-partner vector sum, exact signs/scaling and negative cases; no subject imports |
| `node .tmp/surface-005-review/source-audit.mjs` | 27 selected files,738 certified steps,9 signed-v49 files; time lower bounds advance by0.01 within the stated numeric check | Own accepted-record/hash controls precede source reads; this identifies the reviewed chain rather than re-proving its stored-rate premises |
| `node .tmp/surface-005-review/adapter-review.mjs` | 6/6 pass | Subject geometry compared to the separately constructed Rodrigues frame for all six members at five signed coordinates; exact rest, partner counts, negative-velocity conversion, illustrative flag and outside-coverage refusal |
| `node .tmp/surface-005-review/data-review.mjs` | 740 observations including release and first-window endpoint; all738 copied step q/w/time/total/class interval strings and37 source hashes match | Own BigInt decimal-time control and negative run before target; does not import the converter helper;666 step endpoints have class data and72 correctly retain missing class data as null |
| `node .tmp/surface-005-review/panel-review.mjs` | 15/15 pass on final corrected bytes | DOM-level panel and import-binding checks; exact partner names for every receiver, signed return direction, sparse-span qualifier, event-time conversion, unchanged export/import identity and changed-endpoint rejection; physical replay-coverage field and accessible progress label |

The DOM instrument is a bounded programmatic panel check, not a browser or WebGL observation. It imports the live panel but uses the separately frozen expected geometry, counts and scaling. The complete signed source/export identity check is a faithful-consumption result; it does not independently validate the original numerical history.

## Reviewed identities

The exact raw-file identities and selected ranges are in `.tmp/surface-005-review/source-audit-results.json`; the converted-data comparison is in `.tmp/surface-005-review/data-review-results.json`. The panel receipt `.tmp/surface-005-review/panel-review-results.json` records the app module and page identities at corrected-byte recheck.

| Subject | SHA256 |
| --- | --- |
| Independent frozen reference | `d99bf9352c9da953b011f8c0c184591fecd1a372dbfca5150a1a1e8b38d34b9b` |
| `src/apps/surface/SurfaceSixPoleReplay.js` | `8a593fd63191b38b792fe72f3366c98d02a5e6e802553bbc7f4824380ccbc8db` |
| `src/apps/surface/SurfaceSixPolePanel.js` | `16f5ecf241aed045cd2439d8dc2ac578f3e5fe51d79f1ffde159b459b3da3a91` |
| `src/apps/surface/SurfaceRecord.js` | `5d710a4e742509a182fc7327a1fd68c5b06be42ec4e7ea4695e88fce4722cf10` |
| `src/apps/surface/SurfaceViewer.js` | `11958bf2e65084123cfc3e90efff8c697ccf51f4b767aa10f43ea84a77c96450` |
| `src/apps/surface/main.js` | `c306fdfea7a7ecd72dd94e49db3157e63e7961be2614bd81cf780e206aa4ab59` |
| `surface.html` | `e966b57c047cfc5ebfe3b88727f65c927ff86a98ec5993bb02f44e3a9fbc4814` |
| `scripts/surface/build-six-pole-replay.mjs` | `e320e4a583bc657c25d93fba115e3e04f2d8f8a7015b3f4e68f83625e7de5d65` |
| `scripts/surface/six-pole-replay-sources.json` | `7c55e9040bb1bcf83089a88adf651623463082953550b8bc14ffa2e532df98d2` |
| `src/apps/surface/data/six-pole-rest-r10.json` | `1b6cadf8bd18832b908912d113d73f220db8e55759b394afde8cc1bb53339192` |
| `src/apps/surface/data/SixPoleReplayBinding.js` | `f8fe670088f6fef6e23ba4beee9bc1a2e2a6d8b6db35d2f8b1311a36e3c3a2ab` |

## Disposition and limits

**Accepted within this review's scope:** exact radius10 preparation with three members of each polarity, separately identified analytical replay, correct six-path geometry and signed velocity, per-receiver2/2/1 partner membership, unchanged retained class sums and support intervals, preserved source identities, corrected source selection and import identity checks. There is no remaining mathematical/data correctness finding in the reviewed scope.

The first sparse time span is labelled illustrative interpolation. Later animation also interpolates midpoints; the diagnostics and normal arrows refer to the nearest retained uncertain-time observation. Exact retained interval strings are exported. Missing early diagnostics remain missing. Rounded UI intervals are summaries, not additional scientific certificates. The existing late-return negative-source-speed review limitation remains visible. Root must retain the actual browser outcome and integration record; this review does not claim deployment, a fresh EOM run, a scientific extension, recurrence or physical confinement.

**Final corrected-byte follow-up.** Root added a fixed six-pole preset selection, a physical replay-coverage field, the `Six coordinate poles` latitude label, a disabled resume-end field and a progress label that describes reviewed observations. On returning to a circular EOM case, the composition root restores its ordinary labels and re-enables the resume-end control. The page's history and footer copy now distinguish circular EOM preparation/ledgers from the complete stationary-past analytical replay and research archive. The reviewer reread those branches and reran the independent adapter and source/export checks without a mismatch. The panel instrument's first rerun stopped because its own minimal DOM stub lacked `querySelector`; after a known stub lookup/attribute control and stub extension, the final15 assertions passed. This was an instrument-coverage update, not a product defect. Data remained SHA256 `1b6cadf8bd18832b908912d113d73f220db8e55759b394afde8cc1bb53339192`, with37 source identities and740 observations.

A mismatch against an exact known case, a changed or unaccepted input, a dropped uncertainty interval, a multiply-counted class, a new scientific event inferred from animation or an EOM-qualification claim made from analytical replay rejects the affected display claim.
