# Complete 19-Candidate Nonpublishing Rebuild

> Historical taxonomy note (2026-07-23): this measured rebuild is provenance-bound to the former Family-C identities C1, C2, C1.1, and C2.1. The current taxonomy renumbers those constrained representatives C3, C4, C5, and C6 and changes the former C1/C2 source centers to be coaxial. The rows below must not be relabeled or combined with current source identities; a current conclusion requires a fresh $c_f=1$ rebuild.

## Scope and authority

This report records the revised complete prescribed-path analytical rebuild run on 2026-07-23. Every source path remained prescribed. The campaign did not invoke the EOM solver or evolve a path.

Claim grade: **measured** for the candidate verdicts, metric rows, database checks, and wall times below; **inferred** for the C1 blocker diagnosis where explicitly stated.

The result is analytical and nonpublishing. It does not establish stability, energy, retention, photon identity, or physical realization.

Machine-readable artifacts:

- `.local-data/braid-analysis/complete-19-candidate-nonpublishing-rebuild-profile.v1.json`
- `.local-data/braid-analysis/complete-19-candidate-analysis.v1.json`
- `.local-data/braid-analysis/.rebuild-XoUIa2/analytical-campaigns.sqlite3`

The staging generation hash is `5cbb5765d9b5e327240227d09b722c1d23e22a3c3c03435878025bbcfb78f084`; its deterministic fingerprint is `68a90e6ee4277aed1dcb752d76c79337139de596c331e2cd1e677a31b9373506`. The rebuild and a separate CLI verification both reported `integrity: ok`. The rebuild reported `published: false` and `databasePath: null`.

## Acceptance result

Eight of nineteen candidates passed every declared gate:

| Family member | Candidate |
| --- | --- |
| A1.1 | `family-a-a1-1-equal-frequency-v1` |
| A1.2 | `family-a-a1-2-equal-frequency-equal-radius-v1` |
| A2 | `family-a-a2-fully-symmetric-v1` |
| A3.1 | `family-a-a3-1-equal-frequency-v1` |
| B1.1 | `illustrative-spindle-chart-hypothesis-v0` |
| B1.2 | `illustrative-extreme-cap-tilt-spindle-variant-v0` |
| B1.3 | `illustrative-planar-tri-binary-spindle-boundary-v0` |
| B1.4 | `illustrative-full-cap-axial-spindle-boundary-v0` |

Passing means that surface quadrature, fixed internal receivers at both resolutions, moving receivers at both resolutions, branch continuity, and source sensitivity all passed the declared analytical protocol. It does not mean that a candidate is stable or physically realized.

Eleven candidates remained diagnostic-only:

| Member | Why it was rejected |
| --- | --- |
| A1 | Frequency-band coverage was $0.1710$ against the $0.02$ limit; all four sensitivity perturbations therefore inherited a rejected surface packet. |
| A1.3 | Radial-exponent change was $0.1873$ against $0.05$, and frequency-band coverage was $0.05394$ against $0.02$; all four perturbations were rejected. |
| A1.4 | Frequency-band coverage was $0.04450$ against $0.02$; all four perturbations were rejected. |
| A3 | Frequency-band coverage was $0.1424$ against $0.02$; all four perturbations were rejected. |
| A3.2 | The surface packet passed, but fixed and moving internal receivers failed the continuous minimum-separation certificate. Moving receivers also failed numerical convergence. Source sensitivity therefore was not advanced. |
| A3.3 | Radial-exponent change was $0.1416$ against $0.05$, and frequency-band coverage was $0.04874$ against $0.02$; all four perturbations were rejected. |
| A3.4 | Frequency-band coverage was $0.03986$ against $0.02$; all four perturbations were rejected. |
| C1 | At the adopted grid, exposure, anisotropy, retained spectral power, radial exponent, and frequency-resolved wake flux all failed. The sensitivity stencil settled, but all four perturbed surface packets remained rejected. |
| C1.1 | Only the base radial-exponent comparison failed: $0.07393$ against $0.05$. The sensitivity stencil settled, but the four perturbations inherited the surface rejection. |
| C2 | Exposure, retained spectral power, radial exponent, and frequency-resolved wake flux failed. The sensitivity stencil settled, but all four perturbed surface packets remained rejected. |
| C2.1 | Only the base radial-exponent comparison failed: $0.06117$ against $0.05$. The sensitivity stencil settled, but the four perturbations inherited the surface rejection. |

Frequency-band coverage is the fraction of the sampled signal left outside the retained harmonic band. A failure therefore says the declared band is not yet a complete representation at that grid. The radial-exponent gate compares the radius-scaling estimate between primary and refined surface grids. A minimum-separation failure says the continuous lower-bound certificate reaches the exclusion threshold; it is not repaired by relabeling the sampled closest pair.

## Top-five metric tables

Rows marked `D` come from rejected candidates and are diagnostic-only. They remain visible to prevent acceptance filtering from changing the descriptive ranking.

### Exterior net acceleration-response power, lower first

| Rank | Member | State | $L_{\rm ext}$ |
| ---: | --- | --- | ---: |
| 1 | B1.4 | accepted | $0.7294735766$ |
| 2 | B1.2 | accepted | $0.7823492534$ |
| 3 | B1.1 | accepted | $1.8185291520$ |
| 4 | A2 | accepted | $2.0995457298$ |
| 5 | A3.2 | D | $2.5433947478$ |

### Uncancelled exterior reference magnitude, larger first

This is descriptive and is not an optimization objective.

| Rank | Member | State | $L_{\rm raw}$ |
| ---: | --- | --- | ---: |
| 1 | C1 | D | $490.7329163966$ |
| 2 | C2 | D | $490.7270420311$ |
| 3 | C2.1 | D | $489.3694566347$ |
| 4 | C1.1 | D | $489.3547770406$ |
| 5 | A1 | D | $115.5562597459$ |

### Exterior cancellation ratio, lower first

| Rank | Member | State | $\eta_{\rm ext}$ |
| ---: | --- | --- | ---: |
| 1 | B1.4 | accepted | $0.006318088179$ |
| 2 | B1.2 | accepted | $0.006776747167$ |
| 3 | C2 | D | $0.01180433674$ |
| 4 | C1 | D | $0.01384268720$ |
| 5 | B1.1 | accepted | $0.01576476891$ |

### Signed complete-cycle wake flux, closest to zero

| Rank | Member | State | signed integral |
| ---: | --- | --- | ---: |
| 1 | B1.3 | accepted | $-2.5840\times10^{-18}$ |
| 2 | B1.2 | accepted | $-1.0969\times10^{-17}$ |
| 3 | B1.1 | accepted | $1.6498\times10^{-17}$ |
| 4 | A3.1 | accepted | $-1.8142\times10^{-17}$ |
| 5 | A1 | D | $-3.3321\times10^{-17}$ |

### Raw complete-cycle wake flux, closest to the declared reference

The reference is $24$ for these five rows. This is a diagnostic identity, not an optimization objective.

| Rank | Member | State | raw integral | absolute reference residual |
| ---: | --- | --- | ---: | ---: |
| 1 | A2 | accepted | $24.000000000000004$ | $3.5527\times10^{-15}$ |
| 2 | A1.1 | accepted | $23.99999999999998$ | $2.1316\times10^{-14}$ |
| 3 | A1.2 | accepted | $23.999999999999964$ | $3.5527\times10^{-14}$ |
| 4 | B1.3 | accepted | $23.999999999999957$ | $4.2633\times10^{-14}$ |
| 5 | A3.2 | D | $23.999999999999957$ | $4.2633\times10^{-14}$ |

### Residual complete-cycle wake crossing, lower first

This unnormalized measure depends on source count.

| Rank | Member | State | residual integral |
| ---: | --- | --- | ---: |
| 1 | B1.4 | accepted | $1.3359724959$ |
| 2 | B1.2 | accepted | $1.3834661593$ |
| 3 | B1.1 | accepted | $2.2075531731$ |
| 4 | A2 | accepted | $2.3323954238$ |
| 5 | A3.2 | D | $2.4284536837$ |

### Normalized wake-flux cancellation ratio, lower first

| Rank | Member | State | $\eta_{\rm wake}$ |
| ---: | --- | --- | ---: |
| 1 | B1.4 | accepted | $0.05566552066$ |
| 2 | B1.2 | accepted | $0.05764442330$ |
| 3 | C2 | D | $0.07633846695$ |
| 4 | C1 | D | $0.08575792598$ |
| 5 | B1.1 | accepted | $0.09198138221$ |

## C1 frequency-resolution blocker

The full catalog used the adopted $24\times12\times24$ versus $48\times16\times32$ comparison. At that grid C1 has five failed surface subgates, so it is not a frequency-only rejection in the catalog.

The separate resolution ladder isolates the high-resolution surface result. At $48\times16\times32$ versus $96\times20\times40$, exposure, anisotropy, retained spectral power, aggregate wake flux, and out-of-band coverage pass. The only remaining surface blocker is frequency-resolved wake flux, whose maximum coefficient change is $1.3036914337$ against the $0.05$ gate.

The adopted-grid frequency ledger further localizes the problem:

- $930$ of $5{,}149$ compared coefficient rows exceed $0.05$;
- $860$ failures are transmitter-root coefficients and $70$ are cancellation coefficients;
- $805$ failures occur at enclosing radius $1$, and another $125$ at radius $1.25$; none occur at radii $1.5$ or $2$;
- harmonics $3$ and $4$ account for $724$ failures;
- coefficient identities match, and retained-band coverage passes at $0.0050503$ against $0.02$;
- the radius-$1$ comparison floor is $3.3857\times10^{-6}$. The worst adopted primary/refined magnitudes are about $6.66\times10^{-5}$ and $4.52\times10^{-5}$, so the row is not merely below the declared floor.

Measured conclusion: C1's remaining high-resolution surface blocker is a near-source, higher-harmonic coefficient-convergence failure, not missing coefficient identities or inadequate retained-band coverage.

Inferred mechanism: the moving worst-row identity across the three mixed resolution levels is consistent with an unresolved low-amplitude coefficient field rather than one stable bad mode. The existing ladder changes time and angular resolution together, so it cannot yet distinguish temporal sampling from angular quadrature. This inference is falsified if a separated-axis frequency-only ladder shows one fixed coefficient settling while the other axis is held fixed.

Do not relax the five-percent gate while the maximum discrepancy remains order one. A defensible repair must be either separated-axis convergence or an independently justified coefficient error bound; an arbitrary higher floor would hide the failure.

## Measured performance

The complete check-mode rebuild took $17{,}151.144$ seconds, or $4$ hours $45$ minutes $51$ seconds.

| Phase | Wall seconds | Share |
| --- | ---: | ---: |
| Campaign computation | $8{,}506.956$ | $49.60\%$ |
| Database import | $5{,}661.056$ | $33.01\%$ |
| Staged integrity verification | $1{,}324.939$ | $7.73\%$ |
| Staged completeness verification | $1{,}320.174$ | $7.70\%$ |
| Deterministic export | $337.614$ | $1.97\%$ |

Within campaign computation, source sensitivity consumed $6{,}770.191$ seconds, or $79.6\%$ of candidate computation. Base surface reduction consumed $1{,}709.311$ seconds. Internal fixed, moving-receiver, and branch diagnostics together consumed under $24$ seconds.

The staging database contains $27{,}607$ unique raw artifacts with no duplicate raw hashes. Source-sensitivity surfaces account for $21{,}888$ artifacts, $227.91$ GB uncompressed, and $26.97$ GB stored. Base complete-cycle surfaces account for another $5{,}472$ artifacts and $6.74$ GB stored.

Measured conclusion: both computation and durable storage are major bottlenecks. CSV would not reduce the repeated surface integrations and would discard indexed integrity and provenance. The first optimization experiments should instead test candidate/stencil parallelism and a single-pass verify-and-stage importer, requiring an identical generation fingerprint and independent acceptance result.

## Outstanding obligations

1. Build a separated-axis C1 frequency-only ladder that holds angular quadrature fixed while increasing time samples, then holds time sampling fixed while increasing angular order.
2. Benchmark candidate-level and sensitivity-stencil worker parallelism against the same 19-candidate generation fingerprint.
3. Benchmark a single-pass raw-artifact verify-and-stage design and add heartbeats for SQLite integrity and commit/index phases.
4. Adjudicate the marginal C1.1 and C2.1 radial-exponent rows with an uncertainty-aware positive-measure floor.
5. Keep publication blocked until the operator explicitly authorizes a publication run.

Promotion disposition: **priority-only**.
