# Sub-Field Circular-Root Measured Parallel Resource Contract

Status: measured pilot independently accepted; this resource contract requires exact-generation independent acceptance and a bound dispatch plan before execution. It changes no geometry or mathematical acceptance condition.

## Accepted pilot

The serial pilot completed all sixteen fixed geometries at receptions `4` and `6`: 32 complete phases, 2,448 ordered-pair certificates, 2,184 ordinary nonself roots, and 264 excluded self endpoints. All certificates used the initial 53-bit route. The independent audit checked every original row, its live-check and final-ledger hashes, and 2,488 unique file bindings totaling 1,406,739,534 bytes. No scientific failure, retained-boundary contact, or unresolved difficult cell was recorded. All 129 registered subprocess gates exited cleanly; no cleanup signal or rejection artifact was needed.

| Bound artifact | SHA-256 |
| --- | --- |
| `serial-pilot-20260827-v1/outer-admission.json` | `ded3e09eb666007aa0067e7871e5519d4a3dc944cd619555227ccead8726ee84` |
| `serial-pilot-20260827-v1/pilot/pilot-ledger.json` | `8b7beb5e607d63e1ec78806f5e1355bf7dfceb543e482c9ec49efb548bf841d1` |
| Ordered phase-receipt chain | `0ecc6830ec9eb57c830e507a96657a4ec6e21e46dfd451e726ecfa64a4f61190` |
| `recorded-build-20260827-v2/preparation.json` | `be6f2e43cc2c608a568d128c79535eacc628ea80cfc62cfe273af7c434243866` |

These artifact paths are relative to `.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/`. The recorded build retains its original pending-review label; its subsequent independent acceptance is recorded in the [launch-readiness packet](2026-08-27-braid-search-launch-readiness.md). The reviewed pilot runner has SHA-256 `11dee965bfc2a859bd958dad2e349e17751a63d2d238ce1a4cc8027808f682e4`; its external launcher has SHA-256 `5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa`.

Plainly: this is a complete, independently checked two-time pilot on the actual stored histories. It is not the larger reception ladder, ordinary evolution, or a physical result.

## Measured cost and resource return

The externally observed wall time through final publication was `363.281642125` seconds. Candidate CPU time including gate overhead totaled `389.961547` seconds; this is summed CPU consumption, not wall time or a parallel speedup claim. Named candidate outputs totaled `1,206,169,687` bytes, including `954,084,806` raw certificate bytes. Shared preparation took `0.216993042` seconds and shared finalization `4.382235333` seconds. The independent audit reparsed all 129 resource profiles. No measured process swap was reported.

The largest measured candidate individual-process resident high-water was `462,913,536` bytes; shared final validation reached `590,987,264` bytes. The outer launcher reached `145,080,320` bytes. These are individual or process-lifetime high-water measurements, not simultaneous aggregate memory. The measurement host reports 24 GiB RAM and eight physical/logical cores; a contemporaneous memory-pressure query reported 57 percent system-wide free memory, and the volume had approximately 995 GiB available. Those host observations are transient, not reserved capacity.

Plainly: the pilot consumed about six minutes of elapsed time. Its memory figures help size the next run, but they do not prove what several simultaneous jobs will consume.

The unchanged pilot rule estimates each 128-reception rung as `128 * max(two measured complete phase times)`:

| Geometry | Estimated 128-phase seconds | Original 1,800-second rule | Resource contract ceiling per rung |
| --- | ---: | --- | ---: |
| coincident-midpoint common-frequency orthogonal-axis three-binary configuration | 1013.071 | within estimate | 1800 |
| coincident-midpoint equal-radius common-frequency orthogonal-axis three-binary configuration | 999.998 | within estimate | 1800 |
| coincident-midpoint 3:2:1-frequency orthogonal-axis three-binary configuration | 1013.191 | within estimate | 1800 |
| phase-compensated equal-geometry orthogonal-axis three-binary configuration | 1015.974 | within estimate | 1800 |
| axially separated common-frequency orthogonal-axis three-binary configuration | 1020.919 | within estimate | 1800 |
| axially separated equal-radius common-frequency orthogonal-axis three-binary configuration | 1018.104 | within estimate | 1800 |
| axially separated 3:2:1-frequency orthogonal-axis three-binary configuration | 1035.267 | within estimate | 1800 |
| axial-transverse coincident-axis interior configuration | 1021.044 | within estimate | 1800 |
| high-axial coincident-axis interior configuration | 1027.130 | within estimate | 1800 |
| planar common-center three-binary configuration | 1014.821 | within estimate | 1800 |
| coincident-center two-component circular co-rotating configuration | 2130.590 | resource return | 3600 |
| coincident-center two-component circular counter-rotating configuration | 2129.028 | resource return | 3600 |
| coaxial-separated two-component circular co-rotating configuration | 2138.593 | resource return | 3600 |
| coaxial-separated two-component circular counter-rotating configuration | 2141.604 | resource return | 3600 |
| coaxial-separated two-planar-braid co-rotating configuration | 2133.617 | resource return | 3600 |
| coaxial-separated two-planar-braid counter-rotating configuration | 2137.211 | resource return | 3600 |

Plainly: the six larger geometries passed the same mathematical checks but are projected to need about 35.5 minutes for the largest rung. They are returned for a larger time allowance, not rejected as geometries.

This document is the separately reviewed resource-return contract required by the [pilot declaration](2026-08-27-subfield-circular-h3-pilot-predeclaration.md). For the six twelve-member two-component configurations, its accepted generation replaces the original 1,800-second per-rung ceiling with 3,600 seconds. That ceiling gives approximately 1.68 times the largest measured serial projection; it is a bounded operational allowance, not a runtime guarantee. The ten six-member configurations retain 1,800 seconds. The underlying numerical and scientific controls remain unchanged. A larger allowance than this contract, or a changed concurrency budget, requires another resource declaration before execution.

## Dispatch contract

The bound machine-readable plan fixes at most four simultaneous candidate-rung processes and four total EOM workers, exactly one EOM worker per candidate. It preserves the full sixteen-geometry order and the fixed `8/32/128` reception ladder. Each candidate must finish and accept its earlier rung before beginning the next. No other EOM campaign is launched into this resource budget. Helper processes and isolated checking threads remain subject to their owning rung's external supervisor; they do not create nested EOM worker pools.

The planning allowance is 2 GiB per active candidate plus 1 GiB shared supervision, leaving 15 GiB of the 24 GiB host outside that allowance. This is an inferred allocation, not a measured aggregate bound or an operating-system reservation. Four concurrent jobs are a bounded initial dispatch choice: candidate CPU including gates divided by complete candidate wall time is `389.961547 / 357.922856084`, approximately 1.09 CPU cores of work per stream. This suggests usable average CPU headroom on eight cores, but does not establish peak consumption or concurrent throughput. Initial eight-reception rungs must retain actual resource profiles and progress observations. An estimated complete-ladder output of `101,318,253,708` bytes follows from scaling the measured two-phase bytes by `168/2`; 160 GiB is the planning allowance, not a claim of exact output size.

The dispatcher checks resource conditions before initial launch, before each new rung, and every fifteen seconds while active. It invokes the bound `/usr/bin/memory_pressure` without load-generating options, with a two-second timeout and bounded output, and requires exactly one finite integer `System-wide memory free percentage` in `[0,100]`. A value below `20` is a resource stop. This utility's percentage is the declared host indicator, not a conversion to exact available physical bytes. A missing, malformed, failed, or timed-out observation is also a resource stop. Available filesystem bytes are obtained from `statfs` as `bavail * bsize`: require at least 160 GiB before initial launch and at least 16 GiB during the run. A failed filesystem observation or a lower value is a resource stop. On any such contact, stop new dispatch and cancel only the owned active jobs through their reviewed supervisors; preserve evidence and report a resource interruption, never a geometry negative. Restart requires a newly reviewed resource plan. These checks do not pretend to enforce a per-process memory reservation or measure unique aggregate resident memory.

The machine-readable cohort ceiling overrides the top-level 1,800-second default only for a cohort whose increased ceiling has an independently accepted, hash-bound resource-return contract. Thus the six twelve-member two-component configurations use 3,600 seconds only under this accepted contract, while the ten six-member configurations remain at 1,800 seconds. An ambiguous cohort partition or override rejects the plan before any job starts.

Plainly: four jobs can begin under a conservative declared allowance, with actual costs still observed. More workers, a larger time limit, or unexpectedly heavy memory use cannot be silently absorbed into the same approval.

Each rung's wall clock starts before its preparation and ends after final output admission. The `128` rung includes the complete candidate-ladder summary. Retain fifteen-second progress records and the reviewed detached-job registration/cancellation controls. Output directories and files are create-exclusive. Repeated receptions must preserve exact carrier identity and overlapping root brackets; an incremental scheduling check grants no independent partial-ladder authority. The unchanged final independent ledger owns the complete candidate-ladder comparison.

A candidate-local certificate or resource failure stops that candidate's later rungs and preserves every unvisited row as not run. Shared source, reference, or build drift stops the entire dispatch, including already active owned jobs. No geometry, source order, polarity, root tolerance, interpolation radius, precision ladder, root census, or reference instrument is changed by this resource contract. The new runner and dispatcher require separate source review and are pinned in the machine-readable plan before execution.

Plainly: resource management may stop work, but cannot weaken the mathematics or erase an inconvenient result.

## Claim boundary and falsifiers

The pilot census and resource profiles are measured results of the named frozen instruments. Their falsifiers are a changed bound byte, incomplete raw census, mismatched phase chain, incorrect resource-profile reduction, or unclosed owned process. The extrapolated times, output allowance, and four-job resource allocation are inferences; actual rung profiles or host pressure can overturn them. A complete accepted `8/32/128` ladder can establish only the existing source-bound prescribed-root H3 obligation. No result here establishes ordinary evolution, equilibrium, binding, return, retention, stability, a score increase, particle identity, display approval, or physical realization.

Closure goal: accept the measured resource return and exact dispatch plan, then run the unchanged sixteen-geometry reception ladders under the declared four-worker budget.
