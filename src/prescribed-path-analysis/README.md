# Prescribed-Path Analysis

This library calculates causal-wake and acceleration-response measures from exact prescribed paths. It does not evolve those paths and does not call the EOM solver.

The owning `prescribed-assembly-spec.v2` geometry contract, including regular, seeded-random, and template-only lattice declarations, is documented in [Prescribed Geometry](../prescribed-geometry/README.md). Lattice metadata reaches this library only through the explicit constituent worldlines materialized by that contract.

Plainly: the analysis layer evaluates declared paths. It does not invent unmaterialized lattice sites or treat a lattice template as a physical source population.

The canonical braid-analysis entry point is:

```js
import { evaluatePrescribedRecordAnalysis } from "./index.mjs";

const packet = evaluatePrescribedRecordAnalysis({
  sourceRecord,
  protocol,
});
```

`sourceRecord` must satisfy `prescribed-path-analysis/exact-source-record.v1`. `protocol` must be a complete `prescribed-path-analysis/analysis-protocol.v1` object. The evaluator does not fill omitted protocol fields with hidden defaults.

The older observer-field and path-display APIs remain labeled `display-only-visualization`. `evaluatePrescribedSourceWake` remains as a compatibility interface for a single event. New analytical braid work should use `evaluatePrescribedRecordAnalysis` because it binds every result to the exact source and complete protocol hashes.

The V1/V2 protocol field `failClosedGates` and policy identifiers ending in `/fail-closed.v1` are retained compatibility strings whose hashes bind existing protocols, database rows, and fixtures. In current prose their policy is `Verification required for advancement`; an affected candidate is `Not advanced`, with the specific result classified as `Verification failed` or `Verification incomplete`.

## Current Root Domain

The active policy is `all-retained-roots/event-specific-isolation-certified.v2`. It partitions each transmitter/event retained interval and uses residual and derivative bounds to certify every partition as root-free or monotonic. Every sign-changing monotonic partition is bisected, so a super-field-speed path may contribute multiple roots and may include transverse branches with either derivative sign. Total path speed is diagnostic under this policy, not an acceptance gate.

The event does not advance when the subdivision depth or candidate-interval bound is exhausted with a possible root or fold unresolved. The thrown `CausalRootEnumerationError` carries `code: "causal_root_enumeration_incomplete"` plus transmitter, event, retained interval, and unresolved-partition details. The legacy `all-retained-simple-roots/sub-field-speed-certified.v1` policy remains supported for provenance-bound fixtures and retains its strict sub-field-speed precondition.

## Complete Protocol Schema

`prescribed-path-analysis/analysis-protocol.v1` requires these fields:

| Field | Meaning |
| --- | --- |
| `protocolId` | Stable protocol identity. |
| `fieldSpeed`, `coupling` | Wake propagation speed and acceleration-response coupling. |
| `history` | Retained start, retained end, and minimum causal delay. |
| `returnWindow` | Start and prescribed return period used for closure and separation measures. |
| `rootPolicy` | Policy id, primary root tolerance, and iteration limit. |
| `tolerances` | Cancellation floor, root-transversality floor, minimum-separation floor, and convergence acceptance tolerance. |
| `geometry` | Primary sample count for the declared periodic minimum-separation grid. |
| `convergence` | Tighter root tolerance, iteration limit, and denser separation grid. |
| `probes` | Persistent probe ids, absolute-coordinate positions, observation times, and probe polarities. |

Only stationary coordinate probes are admitted in V1. A probe is a comparison instrument and is not inserted into the source record.

## Result-Packet Schema

The returned `prescribed-path-analysis/result-packet.v1` object contains:

| Field | Contents |
| --- | --- |
| `evaluator` | Evaluator id/version and explicit `pathEvolutionInvoked: false`, `eomSolverInvoked: false` declarations. |
| `source` | Exact source-record SHA-256 hash, upstream source-file hash when supplied, taxonomy, provenance, and parameter vector. |
| `protocolHash`, `protocol`, `tolerances`, `probeDefinitions` | The complete normalized analysis contract. |
| `rawLedgers.causalRoots` | Every retained root identity, emission time, residual, bracket, transmitter-side factor $D_t$, transversality margin, wake contributions, and both declared probe-polarity acceleration contributions. No-root transmitters remain explicit. |
| `rawLedgers.prescribedPeriodClosure` | Per-transmitter position, velocity, and wrapped-phase closure residuals. |
| `rawLedgers.minimumSeparation` | Per-pair minima on the declared primary periodic grid. |
| `rawLedgers.refinedMinimumSeparation` | The same ledger on the denser convergence grid. |
| `rawLedgers.numericalConvergence` | Event-by-event changes under the tighter root tolerance. |
| `reducedMeasures.events` | Root counts, $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, $\chi_{\mathcal W}$, both probe responses, minimum $|D_t|$, and maximum root residual at each event. |
| `reducedMeasures.prescribedPeriodClosure` | Maximum position, velocity, and phase closure residuals. |
| `reducedMeasures.minimumSeparation` | Cohort minimum, pair identity, sample time, and grid declaration. |
| `reducedMeasures.rootTransversalityMargin` | Minimum $|D_t|$ over every retained fixture root. |
| `reducedMeasures.numericalConvergence` | Root-identity agreement and maximum reported change under tighter numerical settings. |
| `resultHash` | SHA-256 of the canonical packet before `resultHash` is attached. |

Object keys are sorted recursively before hashing; array order remains part of the contract. `source.sourceHash` hashes the normalized exact source record, not the sampled Borg display record. `protocolHash` hashes the normalized complete protocol.

The result claim grade is `derived`: it is conditional on the prescribed source record and protocol. The packet explicitly excludes stability, energy, retention, and physical-realization claims.

## A1.1 Continuous Ratio–Phase Root Inventory

`evaluateA11ContinuousRootInventory({ protocol })` owns the diagnostic-only A1.1 continuous ratio–phase inventory. Its V1 protocol is locked to the operator-approved middle-pinned ratio box, $\chi_n=9/4$, symmetric phase baseline, all $36$ ordered endpoint channels, and the nine-rule fail-closed root/fold policy.

This instrument uses prescribed exact circles and its own outward-rounded interval implementation. It does not call the EOM solver, use EOM interval machinery, or evolve paths. Every root-free cell, simple-root-sheet cell, boundary stratum, and unresolved partition is preserved in the full topology ledger. If a possible root or fold remains after a declared depth or cell limit, the result is `drawn-not-evaluated` with `score: null`.

The secondary `recomputeA11SquaredCausalResidual(...)` path evaluates $\lVert\mathbf x_r-\mathbf x_t\rVert^2-\delta^2$ from direct coordinates. It does not participate in interval certification decisions. Because both implementations entered in the same change, their agreement is a diagnostic implementation-parity control rather than independent mathematical acceptance.

Plainly: the A1.1 instrument can certify or reject pieces of the frozen drawing-level parameter family and can expose its own incomplete reach. It cannot establish an EOM-retained braid, stability, energy, or physical realization.

## Pointwise Summed-Acceleration Screen

The complete-cycle moving-endpoint reducer reports `pointwiseSummedAccelerationNecessaryCondition`. At each common observation time it sums the evaluated canonical-kernel acceleration over every declared receiver worldline, the independently prescribed path accelerations, and their equation residual. It reuses the retained causal-root event packets; it does not sample frozen phases or invoke a second root solver.

The zero-sum screen is evaluated only when the packet certifies every retained root from the declared isolated architrino-worldline inventory and strict sub-field speed excludes a positive-delay same-worldline root. It also requires the prescribed accelerations to sum to zero within the declared tolerance. Otherwise the row is explicitly inapplicable. Noether-sea response and undeclared external worldlines remain outside the certified scope.

A nonzero summed evaluated acceleration beyond the declared tolerance and numerical-convergence allowance falsifies only the exact isolated prescribed history. A zero result is recorded as `not-falsified-by-this-screen`; it does not establish a branch, taxonomy member, stability, retention, or physical realization.

## Pointwise Member-Residual Search Screen

The same certified moving-endpoint packets also report `pointwiseMemberResidualSearchScreen`. This reducer preserves every per-architrino prescribed-path equation residual and summarizes the first declared half-cycle, second declared half-cycle, and full cycle. It catches equal-and-opposite member errors that disappear in the summed-acceleration screen.

On the same sample grid, the full-cycle peak is exactly the worse of the two half-cycle peaks. The full-cycle RMS is the row-count-weighted combination of the two half-cycle RMS values. A coverage search may therefore evaluate one half first and reject early, but it must evaluate the other half before ranking or retaining an apparent near-zero. Compact scores rank the refined full-cycle peak first and refined full-cycle RMS second; half-cycle values and their imbalance remain diagnostics.

The member screen is inapplicable unless the declared isolated acceleration inventory is certified complete. A residual above threshold falsifies only the exact prescribed history. A sampled near-zero is diagnostic search guidance until it survives further time-grid refinement, retained raw-ledger review, and an independently authored causal-root residual check. The reducer neither changes the accepted return-symmetry group nor makes a taxonomy or branch existence claim.

Run the bounded stratified endpoint-only search with:

```bash
node scripts/eom/run-endpoint-residual-search.mjs
```

The runner evaluates one catalog-reference, two local-neighborhood, and three full bounded-taxonomy draws per active member at 12/24 cycle samples. It then reevaluates the eight lowest complete-inventory member residuals plus up to eight summed-cancellation cases at 48/96 samples. Every eligible row must pass the complete-inventory certificate and a separately recomputed geometric causal-root residual check. The default output stays under `.local-data/braid-analysis/endpoint-residual-search/`; it is diagnostic and does not enter the accepted analytical database.

## Local Evaluation

Print an evaluation to standard output without retaining a repository result packet:

```bash
node scripts/eom/evaluate-prescribed-source-wake.mjs \
  --spec path/to/exact-spindle-spec.json \
  --protocol path/to/complete-analysis-protocol.json
```

Use `--write .tmp/prescribed-path-analysis/<name>.result-packet.v1.json` for a disposable local packet. Retained campaign results belong in the analytical database and deterministic exports, not in checked-in result JSON.

Run the solver-free gate-adjudication and targeted resolution ladders with:

```bash
node scripts/eom/adjudicate-analytical-gates.mjs
```

The default report is `.local-data/braid-analysis/gate-adjudication/targeted-resolution-ladders.v1.json`. The harness retains all four declared surface radii for the B1.3, B1.1, and C1 surface ladders, uses an outer-radius sensitivity pilot for A1.2 and A2, and emits progress heartbeats without invoking path evolution or the EOM solver.

## Compact Monte Carlo Coverage

Run a seeded compact campaign with:

```bash
node scripts/eom/run-compact-monte-carlo.mjs \
  --seed compact-coverage-v1 \
  --cases-per-member 64 \
  --sampler full-taxonomy \
  --resolution coverage \
  --output .local-data/braid-analysis/compact-monte-carlo/coverage-v1.json
```

Use `--families A,B,C` or `--members A1.2,B1.3,C5` to select a bounded matrix. The default coverage grid uses 12 primary and 24 refined cycle samples with $8\times16$ and $12\times24$ angular grids. `--resolution full` uses the checked-in complete-cycle protocol. Both lanes require `fieldSpeed: 1`.

The runner validates and hashes each sampled exact source, evaluates one shared source-analysis session, and records the sampled specification, protocol hash, implementation hashes, compact score, measured stage costs, and exact rerun instruction. It does not construct or serialize full result packets, recompute source-invariant period-closure and separation rows for every event batch, evaluate source sensitivity, retain raw event ledgers, invoke the EOM solver, perform independent acceptance, or publish a database generation.

The default `full-taxonomy` sampler varies every permitted coordinate type through a declared bounded measure while constructing each member directly on its constraint manifold. This includes coupled and independent radii and frequencies, axial/transverse decompositions, phases, Family-A flattening, Family-C spacing and order, circulation, polarity, and bounded common translation. Use `--sampler local-reference` only for compatibility with the earlier pipeline-performance fixture.

Every valid draw produces a row. If analytical evaluation cannot certify a possible root or fold, the row remains in the table with its exact sampled source, null score, `drawn-not-evaluated` status, reason code, and structured failure details. Run `--calibrate` to evaluate identical full-taxonomy draws at the coverage and full numerical resolutions and report false negatives, false positives, inconclusive rows, and per-gate disagreements. These rows remain diagnostic coverage only; selected cases must be rerun through the raw-evidence and independent-acceptance lane before any catalog acceptance claim.

## Independent Checks

`tests/prescribed-source-wake-evaluator.test.js` fixes expected values without replaying evaluator output:

- a static transmitter gives the closed-form root $T_t=T-r/c_f$, wake $q/(4\pi r^2c_f)$, and opposite responses for the two probe polarities;
- coincident opposite-polarity static transmitters provide a symmetry-protected signed-wake and response cancellation case while preserving nonzero unsigned wake;
- separated static transmitters fix zero prescribed-period closure and exact minimum separation; and
- a uniformly translating collinear transmitter fixes $T_t$, $D_t$, wake, and acceleration response by a separately written scalar calculation.

Evaluator correctness is falsified if any independent value differs beyond the declared tolerance, if a retained root is missing, or if identical exact source and protocol inputs produce a different result hash.

## Analytical Campaign Database

The versioned SQLite implementation stores exact campaign artifacts and indexed hot measures without making the database file repository source. The default runtime file is `.local-data/braid-analysis/analytical-campaigns.sqlite3`; the directory is Git-ignored, and startup fails if that ignore rule is absent. The implementation uses the SQLite library embedded in the repository's Node runtime, so it does not require a separate SQLite package for these commands.

The importer preflights a complete manifest, summary, and packet inventory before its first campaign write. It recomputes result and protocol hashes, derives acceptance gates from retained ledger rows and protocol thresholds, stores exact packet bytes as content-addressed gzip artifacts, and publishes campaign acceptance only after every bounded transaction is present. Repeating an import verifies existing rows instead of duplicating them; an interrupted import resumes after its last committed ordinal.

Rebuild every registered analytical campaign into a fresh disposable database and verify it without changing the live database:

```bash
node scripts/eom/analytical-campaign-database.mjs rebuild-all --check
```

When that check passes, publish the same registry contract by atomically replacing the live database:

```bash
node scripts/eom/analytical-campaign-database.mjs rebuild-all --publish
```

The versioned [all-candidate registry](campaigns/all-candidate-analytical-campaign.registry.v1.json) must cover every live Borg catalog entry either as an analytically registered prescribed-record target or as an explicit catalog exclusion with a reason. Registered analytical candidates must match the active prescribed-record target map exactly. It also requires every checked campaign manifest to be either imported or explicitly excluded with a reason. The command evaluates every registered exact prescribed source record under the common [complete-cycle protocol](protocols/all-candidate-complete-cycle-protocol.v1.json), imports all registered checked campaigns, retains complete independently rejected candidate cases outside `accepted_case`, verifies exact source and raw-ledger coverage, regenerates deterministic exports, records one database-generation hash, and only then swaps the fresh SQLite file into place. A missing disposition, undeclared methodology obligation, changed unreviewed methodology hash, undeclared manifest, hash mismatch, incomplete case, export failure, or post-swap verification failure leaves or restores the prior database. `--check` is always nonpublishing.

The versioned [methodology coverage contract](analytical-measure-coverage.v1.json) maps each methodology obligation to its source fields, applicability, producer, result-packet location, SQLite projection, gates, convergence rule, independent evidence, and publication disposition. Every generation binds the contract, the exact methodology-file SHA-256, the common protocol hash, and the reduction versions. The reusable complete-cycle campaign extends the same canonical event evaluator and surface reducer with fixed internal probes, actual moving endpoint receivers with same-source exclusion, separately retained receiver-side playback derivative $D_r$, branch-by-branch spatial and temporal diagnostics, and legal declared source-phase sensitivity stencils. $D_r$ is not an instantaneous-acceleration multiplier.

This is the one-operation development reset path. Do not delete or empty the live database first: the fresh database is built beside it, and the prior generation remains the recoverable live copy until verification and the atomic swap succeed.

Inspect, verify, export, and create a verified off-checkout backup with:

```bash
node scripts/eom/analytical-campaign-database.mjs inspect

node scripts/eom/analytical-campaign-database.mjs verify

node scripts/eom/analytical-campaign-database.mjs export-campaign \
  --manifest-hash 6c8e668460d33ce582ba33438764a24628cf9de05d7fc54ca2c9e26845d61f08 \
  --output-directory /safe/temporary/export-directory

node scripts/eom/analytical-campaign-database.mjs backup \
  --output /separately-administered/backup/analytical-campaigns.sqlite3
```

The exporter writes exact manifest, summary, result-packet, and compressed raw-ledger bytes plus deterministic source-envelope, exact-source, protocol, acceptance-evidence, and hash-inventory files. The generated all-candidate campaign stores and verifies each exact source-record preimage and both the compressed and uncompressed hashes of every streamed raw artifact.

Independent database acceptance is a separately authored verification of the retained analytical record. It is not a fresh numerical evaluation of the prescribed paths and does not establish the evaluator's mathematical correctness. Import, acceptance, query, export, or backup does not call the EOM solver or imply stability, energy, retention, physical realization, or completed braid-family grading.

## Common-Axis Braid Pilot

`CommonAxisBraidTrain.mjs` defines exact six-architrino Family-B extensions, twelve-architrino Family-C records, and optional additional worldlines in one common-axis coordinate system. The source contract retains ordered spacings, train length, ordered index subsets, a fixed-point-free binary-counterpart map, a separate adjacent-pair accessory-association map, and every defining or accessory architrino trajectory coordinate. In a twelve-worldline geometry, six declared additional worldlines form one Accessory Configuration outside the twelve defining Family-C worldlines.

`CommonAxisBraidPilot.mjs` supplies six predeclared references and one seeded neighborhood sample around each. `CommonAxisBraidCampaign.mjs` evaluates complete-cycle source-endpoint residuals in axial, local radial, and local tangential coordinates, retains exterior surface reductions, runs a grouped spacing sensitivity, records diagnostic axial angular-momentum rows without inserting $h$ or $\hbar$, and writes a compatible complete-cycle campaign for independent SQLite acceptance.

Run the bounded campaign with:

```bash
node scripts/eom/run-common-axis-braid-pilot.mjs
```

The default outputs are `.local-data/braid-analysis/common-axis-braid-pilot/` and `.local-data/braid-analysis/common-axis-braid-pilot.sqlite`. Use `--references-only` for the six reference rows, `--no-import` to stop after campaign generation, and `--output`, `--database`, or `--protocol` to select explicit paths.

The pilot is prescribed-path analytics only. It imports no EOM-solver module, evolves no path, creates no handoff packet, and makes no stability, self-stabilization, retention, binding, photon-identity, energy-closure, quantization, physical-realization, or EOM-solver-compatibility claim.

## Smallest B1 Campaign Follow-Up

The complete-cycle assignment is `protocols/b1-complete-cycle-probe-protocol.v1.json`, with schema `prescribed-path-analysis/b1-complete-cycle-probe-protocol.v1`. It fixes one cycle on $[4,8)$, 64 primary time samples, 128 refined time samples, a $5\times5\times5$ fixed Cartesian grid spanning the source-envelope bounding box, six prescribed-source endpoint receivers, and enclosing spheres at radii $0.75$, $1$, $1.5$, and $2$. Every sphere uses a Gauss-Legendre grid in $\cos\theta$ and a uniform azimuth grid: $12\times24$ directions in the primary pass and $18\times36$ in the convergence pass.

The start time leaves a conservative retained-history margin of $1.5$ time units at the outer sphere: $4-(2+0.5)/c_f=1.5$ for $c_f=1$. The source envelope radius is $0.5$. The endpoint $T=8$ is excluded from quadrature because it duplicates $T=4$ on the declared period.

The protocol also predeclares:

- both virtual-probe polarities on every fixed and surface coordinate;
- same-source exclusion for the six moving endpoint receivers;
- cycle-and-surface exposure norms and the raw constituent normalization;
- complete-cycle signed, transmitter-root-tagged raw, and residual normal causal-wake flux, together with $\eta_{\mathcal W,\mathrm{flux}}(R)$ and the reference $T_{\mathrm{ret}}\sum_j|q_j|$;
- real orthonormal spherical harmonics through degree $8$;
- complete-cycle Fourier rows through harmonic $16$;
- transmitter-root-tagged complex normal wake-flux coefficients and coefficient-level $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$ rows through the same angular and temporal band;
- pairwise and global log-radius scaling rows without assuming an expected exponent; and
- cap-angle sensitivities in $\alpha_1,\alpha_2,\alpha_3$ using a central step $\pi/512$, a half-step convergence check, and second-order one-sided stencils at domain boundaries.

`buildB1SurfaceEventAnalysisProtocol` expands any declared radius and resolution into a canonical `analysis-protocol.v1` accepted by `evaluatePrescribedRecordAnalysis`. `evaluateB1StreamingSurfaceReductions` evaluates one stationary surface time batch at a time, independently rechecks the event validity obligations, passes each complete raw result packet to the configured analytical-data-store callback, and retains only reduction accumulators between batches. It emits the external-exposure, complete-cycle normal causal-wake flux, angular-power, anisotropy, complete-cycle spectral, transmitter-root-tagged normal wake-flux spectral, frequency-and-angular-mode cancellation, and radial-scaling entries. The frequency-resolved wake-flux rows retain each transmitter and root ordinal until the raw complex-magnitude sum and net complex sum have both been formed. The wake-flux entries remain causal-wake measures and are explicitly excluded from energy, potential, work, leakage, stability, retention, and physical-realization claims. Moving endpoint receivers and local source-sensitivity stencils are composed by `CompleteCycleAnalyticalCampaign.mjs`; they remain outside the narrower surface-reduction packet.

Validate the declaration and its independent quadrature, symmetry, Fourier, causal-reach, and checks required for advancement with:

```bash
node --test \
  tests/b1-complete-cycle-probe-protocol.test.js \
  tests/b1-streaming-reductions.test.js
```

The primary surface assignment contains `73,728` event locations across the four radii; the refined assignment contains `331,776`. Each event retains both probe-polarity responses in one canonical evaluator packet. These counts exclude the internal fixed and moving-receiver ledgers.

Write the deterministic B1 interior-reference reduction and its gzip-compressed raw event packets with:

```bash
node scripts/eom/run-b1-complete-cycle-streaming-reduction.mjs \
  --write .tmp/prescribed-path-analysis/b1-interior-complete-cycle-reduction.result-packet.v1.json
```

The raw result packets are written under `.tmp/prescribed-path-analysis/b1-interior-complete-cycle-raw/` by default. Every stored packet is bound into the reduction result by its compressed and uncompressed SHA-256 hashes, event result hash, event protocol hash, raw causal-root-ledger hash, entry counts, radius, resolution, and time index. The generated reduction result retains the exact quadrature nodes and weights, the primary-versus-refined convergence comparisons, the raw wake-flux residual against $T_{\mathrm{ret}}\sum_j|q_j|$, and the transmitter-tagged retained-band coverage at every radius and resolution. The frequency rows do not advance when transmitter tags do not reconstruct the sampled normal flux, the retained out-of-band RMS fraction exceeds `0.02`, or primary and refined complex coefficients disagree by more than `0.05`. Cancellation ratios and logarithmic radial fits are admitted only above the larger of the absolute coefficient floor and $10^{-6}$ times the dominant raw coefficient on that surface; below-floor rows remain diagnostic.

Check the result without rewriting it:

```bash
node scripts/eom/run-b1-complete-cycle-streaming-reduction.mjs \
  --check .tmp/prescribed-path-analysis/b1-interior-complete-cycle-reduction.result-packet.v1.json
```

Add `--verify-raw-store` when the local raw store is present and should also be byte-hash checked. The B1-only command still writes the narrower surface result; use `rebuild-all` for the moving endpoint, branch-diagnostic, source-sensitivity, full-registry, and SQLite generation contract.

Use `--replay-raw-store` to recompute the reductions from the preserved packets without repeating the causal-root evaluations. Replay still independently verifies every packet, ledger hash, event gate, and compressed artifact hash before using its samples.
