# Three-Binary-Interior And Two-Component Circular Monte Carlo-to-Basin Diagnostic

Status: closed dated V1 diagnostic prescribed-path campaign, 2026-07-25. This packet records a bounded reconnaissance run over declared coordinates. It does not establish current V2 exact-configuration identity coverage, exhaustive configuration coverage, a global optimum, a dynamical basin, stability, retention, binding, energy closure, particle identity, independent acceptance, or physical realization.

## Configuration and predeclaration

The campaign used the axial-transverse three-binary interior, high-axial three-binary interior, planar three-binary common-center reference, coincident-center two-component circular co-rotating, coincident-center two-component circular counter-rotating, coaxial-separated two-component circular co-rotating, coaxial-separated two-component circular counter-rotating, coaxial-separated two-planar-braid co-rotating, and coaxial-separated two-planar-braid counter-rotating configurations. It drew 64 cases per source configuration, 576 total, from the historical sampler `constraint-preserving-full-taxonomy/sha256-counter-v1` with seed `braid-bc-monte-carlo-basin-20260725-v1`. Every numerical evaluation used $c_f=1$. The finite coordinate measure, exact historical inventory, six-process cap, disposition rules, and descent protocol were recorded before the run in `.local-data/braid-analysis/monte-carlo-basin/bc-initial-20260725-v1/predeclared-protocol.json`; its SHA-256 is `f24bb346816ec644faae0c6881bfe5888f35d1b499ac8d207efefbec7c108a4f`.

The sampler, seed, and `bc-initial` path strings are immutable execution provenance. They are not current taxonomy aliases, current source identifiers, or evidence that these rows bind the V2 `assemblyId` and `modelRevisionSha256` pairs.

Plainly: this was a reproducible sample of nine declared bounded charts, not a claim to have searched every possible braid geometry.

The handoff rule selected every applicable row whose refined full-cycle maximum pointwise source-configuration residual was at most `6` and whose primary-to-refined maximum relative-or-absolute change was at most `0.05`. A selected row then had to replay with 12/24 time samples, complete declared isolated acceleration inventory, and an independently recomputed causal-root residual at most `1e-12`. Only an admitted row could enter the separately invoked directed prescribed-coordinate optimizer: at most 24 iterations, step shrink factor `0.5`, minimum step scale `0.03125`, dense 48/96-sample adjudication, and three held-out cases in each of the scale, phase-shape, and coupled strata.

Plainly: the compact score could nominate a starting point, but it could not admit itself. Admission required retained raw evidence and a separately recomputed root check. Here “basin” means only the declared local coordinate neighborhood.

Root-certification, event-convergence, or resource failure was predeclared `unknown`; a score unavailable for the source-configuration-residual screen was `inapplicable`. Neither disposition counts as candidate failure. Ordinary rows retain their exact sampled specification, coordinates, seed, source and case hashes, scores, gates, and disposition in the compact SQLite control plane. Selected handoffs and every evaluated descent point would additionally retain content-addressed primary/refined raw packets and verification receipts. No prior artifact was overwritten.

## Instrument and claim grade

The compact coverage instrument was `scripts/eom/run-compact-monte-carlo.mjs`. Handoff admission and local descent were coordinated by `scripts/eom/run-monte-carlo-basin-descent.mjs`, with external raw retention implemented by `src/prescribed-path-analysis/ExternalRawEvidenceStore.mjs`. The common coverage protocol hash was `8a683bfb3534983aba8787323afbb1cd2d67ea72ac9f9b088c094e5727f59011`; the coverage implementation hash was `223f2b2e89329193344f96751302ccb12b8972534e8d4dad3f52d6baa11dd39d`. These instruments evaluate prescribed paths. They did not evolve a path or invoke the EOM solver.

Claim grade: **measured diagnostic** for sampled scores, dispositions, costs, and database integrity; **derived from the predeclared rule** for the zero handoff and zero-descent conclusion. The same implementation family produced the compact scores and would produce the admission residuals, so this workflow is not independent acceptance.

Plainly: the run measured what the declared prescribed-path instruments report. It neither tested evolved persistence nor supplied an independent physical verdict.

## Result

| Source configuration | Drawn | Evaluated | Unknown | Applicable score | Inapplicable | Best refined peak |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Axial-transverse three-binary interior | 64 | 64 | 0 | 37 | 27 | 59.29861867019956 |
| High-axial three-binary interior | 64 | 64 | 0 | 30 | 34 | 70.68266334317416 |
| Planar three-binary common-center reference | 64 | 62 | 2 | 18 | 44 | 73.55304061569109 |
| Coincident-center two-component circular co-rotating | 64 | 64 | 0 | 9 | 55 | 146.61867905696843 |
| Coincident-center two-component circular counter-rotating | 64 | 64 | 0 | 8 | 56 | 222.76562778391127 |
| Coaxial-separated two-component circular co-rotating | 64 | 64 | 0 | 21 | 43 | 87.70871361681154 |
| Coaxial-separated two-component circular counter-rotating | 64 | 64 | 0 | 23 | 41 | 95.29633940606153 |
| Coaxial-separated two-planar-braid co-rotating | 64 | 64 | 0 | 8 | 56 | 105.86461367233295 |
| Coaxial-separated two-planar-braid counter-rotating | 64 | 63 | 1 | 5 | 58 | 125.70643176846515 |
| **Total** | **576** | **573** | **3** | **159** | **414** | **59.29861867019956** |

Plainly: 159 rows produced the score needed for comparison, but even the best peak was almost ten times the handoff ceiling. The other rows either could not support that score or failed closed during evaluation.

All 159 applicable rows were above the residual handoff threshold. Consequently zero rows crossed both handoff thresholds, zero rows entered raw admission, and zero local descents ran. The handoff coordinator still emitted and imported an empty campaign so the absence of qualifying handoffs is a retained protocol outcome rather than silence.

The three unknown rows were planar three-binary common-center reference samples 11 and 43 and coaxial-separated two-planar-braid counter-rotating sample 36. Samples 11 and 36 failed named event-convergence gates; planar three-binary common-center reference sample 43 failed the compact surface minimum-separation gate. Their exact coordinates, hashes, error messages, and null-score dispositions remain in the ordinary campaign rows. They are unresolved numerical cases, not negative candidate evidence.

The measured sum of the nine source-configuration-process wall times was `10412.046761915` seconds. The run used the predeclared bounded pool, with at most six source-configuration processes active. This number is measured process time and is not a claim about future throughput.

Plainly: no descent result is missing. The protocol required a low-residual starting point, and this sample produced none.

## Durable identity and validation

The local compact database is `.local-data/braid-analysis/compact-campaigns.sqlite3`. Its verification reported `integrity: ok`, zero foreign-key violations, zero prohibited BLOB columns, 10 campaigns, and 576 cases. Nine campaigns are the 64-row source-configuration coverage records; the tenth is the zero-row handoff ledger. At closeout the database SHA-256 was `5edb4d81018f62af77b6f0a0e9ffec0d61ab09d3a7cf46e105fed78a3c1b71e5`.

The execution receipt is `.local-data/braid-analysis/monte-carlo-basin/bc-initial-20260725-v1/descent-v1/execution-receipt.json`; its SHA-256 is `c3be996baf9dbc688524b61cb07b68aa1900bc520cd68f1069f93776c0519a70`. It binds the nine coverage hashes, handoff policy, disposition counts, empty admission campaign hash `a56b7cc2b2efa0ab754a14aa08f90444f894823ac436b9a25acbffe4fb190dda`, raw-evidence receipt count zero, database verification, and excluded claims.

Two repeated exports of the 64-row axial-transverse three-binary interior campaign were byte-identical at SHA-256 `31e16ce70c799431846ad02cd5f177660bfb1878766670faef9a7c5797dc003b`. Two exports of the empty handoff campaign were also byte-identical at SHA-256 `ba7a4d84b46259152fd7d48e68cbf5e7bf2615653a01c37968ec964d687a043d`.

Focused tests passed 16/16:

```bash
node --test \
  tests/compact-monte-carlo-campaign.test.js \
  tests/compact-analytical-campaign-database.test.js \
  tests/endpoint-residual-search-campaign.test.js \
  tests/directed-endpoint-optimizer.test.js \
  tests/monte-carlo-basin-search-campaign.test.js
```

`git diff --check` also passed.

Plainly: the database check establishes storage integrity and exact row retention. The tests establish implementation behavior. Neither is an independent numerical or physical acceptance test.

## Reproduction

The exact historical command for the first of the nine source configurations was:

```bash
node scripts/eom/run-compact-monte-carlo.mjs \
  --seed braid-bc-monte-carlo-basin-20260725-v1 \
  --cases-per-member 64 \
  --sampler full-taxonomy \
  --resolution coverage \
  --members B1.1 \
  --output .local-data/braid-analysis/monte-carlo-basin/reproduction-B1-1.json
```

The command's `--members B1.1`, `--sampler full-taxonomy`, seed, and output-path tokens are immutable V1 execution provenance. They are not supported current selection syntax or source-configuration aliases. The historical run repeated that command with the corresponding retired source tokens and then passed the nine output paths to:

```bash
node scripts/eom/run-monte-carlo-basin-descent.mjs \
  --coverage <nine-comma-separated-coverage-paths> \
  --output-root .local-data/braid-analysis/monte-carlo-basin/reproduction-descent \
  --database .local-data/braid-analysis/reproduction-compact.sqlite3 \
  --seed braid-bc-monte-carlo-basin-descent-20260725-v1 \
  --maximum-peak 6 \
  --maximum-resolution-change 0.05 \
  --iterations 24 \
  --held-out-per-stratum 3 \
  --minimum-step-scale 0.03125
```

Plainly: use new output and database paths because campaign artifacts are write-once and the runner refuses to overwrite them.

The current compact runner selects factual source slugs and derives a fresh exact identity for every sampled payload. Re-running this historical command under the current V2 contract would therefore be a new campaign, not a reproduction or continuation of this receipt.

## Falsifiers

- A rerun with the exact seed, source-configuration selection, source inventory, protocol, and implementation identity that changes any campaign or case hash falsifies deterministic reproducibility.
- A database verification result other than `integrity: ok`, any foreign-key violation, a case count other than 576, or a missing exact sampled specification falsifies the retained control-plane claim.
- Any row in the sealed coverage artifacts with refined peak at most `6` and resolution change at most `0.05` that is absent from the handoff ledger falsifies the every-crossing selection claim.
- Any independent raw replay that finds a lower residual for these exact coordinates overturns the corresponding same-implementation score; it does not by itself establish evolved retention or a physical braid.
- A future declared sample finding a threshold crossing overturns only the bounded zero-handoff observation for this seed and quota. It does not make this write-once result erroneous.

Closure goal: use this retained pattern data to choose a separately predeclared next diagnostic search without weakening the handoff or evidence-independence rules after observing the result.
