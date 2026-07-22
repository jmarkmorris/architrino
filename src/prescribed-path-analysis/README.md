# Prescribed-Path Analysis

This library calculates causal-wake and acceleration-response measures from exact prescribed paths. It does not evolve those paths and does not call the EOM solver.

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

## Current Root Domain

The V1 root policy is `all-retained-simple-roots/sub-field-speed-certified.v1`. For every transmitter and probe event, the evaluator computes a path-speed upper bound over the retained interval. When that bound is below the declared field speed, the causal residual is strictly increasing. The interval therefore contains at most one root, and an endpoint sign check plus bisection certifies whether that root exists. The packet records the retained root or the exact no-root reason.

This is an all-root certificate for the current four B1 prescribed records because their path speeds remain below the fixture field speed. The evaluator fails closed when the speed bound reaches the field speed. It does not yet claim complete multiple-root or fold enumeration for a super-field-speed source.

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

## B1 Interior Small Fixture

The checked fixture uses the `B1 interior-coordinate reference` source, one stationary probe at $(1,0.25,0.1)$, absolute time $T=4$, and probe polarities $+1$ and $-1$:

- protocol: `fixtures/b1-interior-small-fixture.analysis-protocol.v1.json`;
- result: `fixtures/b1-interior-small-fixture.result-packet.v1.json`;
- exact source hash: `addada18d7f3e9abe61fc4ea1660cd1cb849473110d46dae6fa2bf16f458671f`;
- protocol hash: `0fb7ee5c9f36fdac8186ac0155ed53fcc0b3363e44a144b160c1491404da1d50`;
- result hash: `5ff8052ba89ed2c491fe7ae283798a1d931e342b1be7ca837a3e603f8c8803a5`.

Check the deterministic result without writing:

```bash
node scripts/eom/evaluate-prescribed-source-wake.mjs \
  --check src/prescribed-path-analysis/fixtures/b1-interior-small-fixture.result-packet.v1.json
```

Print a custom evaluation to standard output:

```bash
node scripts/eom/evaluate-prescribed-source-wake.mjs \
  --spec path/to/exact-spindle-spec.json \
  --protocol path/to/complete-analysis-protocol.json
```

Regenerate a deliberately accepted fixture change with `--write <result-path>`, then rerun `--check`.

## Independent Checks

`tests/prescribed-source-wake-evaluator.test.js` fixes expected values without replaying evaluator output:

- a static transmitter gives the closed-form root $T_t=T-r/c_f$, wake $q/(4\pi r^2c_f)$, and opposite responses for the two probe polarities;
- coincident opposite-polarity static transmitters provide a symmetry-protected signed-wake and response cancellation case while preserving nonzero unsigned wake;
- separated static transmitters fix zero prescribed-period closure and exact minimum separation; and
- a uniformly translating collinear transmitter fixes $T_t$, $D_t$, wake, and acceleration response by a separately written scalar calculation.

Evaluator correctness is falsified if any independent value differs beyond the declared tolerance, if a retained root is missing, or if identical exact source and protocol inputs produce a different result hash.

## Seeded B1 Cap-Angle Smoke Campaign

The first reproducible configuration-space smoke campaign is declared by `campaigns/b1-cap-angle-smoke/b1-cap-angle-smoke-campaign.manifest.v1.json`. It holds the B1 center, frame, radii, common frequency, phases, circulation sense, polarity assignments, and record interval fixed. It samples the three independent cap angles $\alpha_a\in[0,\pi/2]$ with a four-point seeded Latin hypercube, then sets $h_a=R_a\sin\alpha_a$ and $\rho_a=R_a\cos\alpha_a$. The four catalog B1 records are included as anchors in addition to the four sampled coordinates.

The runner builds each `prescribed-path-analysis/exact-source-record.v1` through the prescribed-braid source emitter and passes it directly to `evaluatePrescribedRecordAnalysis`. It does not generate an assembly-view display record, evolve a path, or call the EOM solver.

Reproduce the checked packets and compact summary without writing:

```bash
node scripts/eom/run-b1-prescribed-analysis-campaign.mjs --check
```

Write an explicitly accepted campaign update:

```bash
node scripts/eom/run-b1-prescribed-analysis-campaign.mjs --write
```

The manifest schema `prescribed-path-analysis/b1-cap-angle-campaign-manifest.v1` binds:

| Field | Contents |
| --- | --- |
| `seed`, `sampleCount`, `stratification` | PRNG algorithm and integer seed, number of sampled coordinates, and Latin-hypercube rule. |
| `samplingMeasure` | Uniform measure in each of the three cap angles and the exact $h_a,\rho_a$ transforms. |
| `fixedCoordinates` | Coordinates held common across all anchors and samples. |
| `baseSpec`, `commonProtocol`, `anchors` | Repository paths plus byte hashes for every external campaign input, and the normalized common protocol hash. |
| `implementedMeasures` | Measures the analytical evaluator currently emits. |
| `outputs` | Deterministic packet directory and summary filename. |

The summary schema `prescribed-path-analysis/b1-cap-angle-campaign-summary.v1` contains the manifest and protocol hashes, sampling declaration, fixed coordinates, per-case packet paths and hashes, sampled coordinates, gate results, implemented measures, cohort ranges, and one summary hash. Full raw ledgers remain in the eight per-case `prescribed-path-analysis/result-packet.v1` files.

For seed `20260722`, the checked campaign contains four anchors and four sampled coordinates. All eight cases pass the declared source-speed/root-completeness, root-transversality, minimum-separation, and numerical-convergence gates. Its summary hash is `81a1fb902cff61ad55db95b2c9cb88f798710e853e35d324ce2059aea7020368`.

This is a smoke campaign, not a configuration-space characterization. The result grade is `derived`, conditional on the prescribed records and common protocol. It does not establish stability, energy, retention, or physical realization. Reproducibility is falsified if the bound inputs and seed do not regenerate every packet and summary hash; an individual case is rejected if any fail-closed validity gate does not pass.

## Smallest B1 Campaign Follow-Up

The next step is to promote the smoke manifest into a declared B1 configuration-space campaign by choosing the required sample count and acceptance/reporting policy before increasing it. The existing sampler, exact-record construction, common protocol, anchor inclusion, packet inventory, and fail-closed gates can remain unchanged.
