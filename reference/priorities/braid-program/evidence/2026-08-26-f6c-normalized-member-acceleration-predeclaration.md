# F6c Normalized Member-Acceleration Predeclaration

Status: v2 — SUBJECT PROVENANCE, NAMED REFERENCE REPAIRS, AND DATA EXPORT INDEPENDENTLY VERIFIED; ACCELERATION MEASUREMENT NOT EXECUTED, 2026-08-27.

## Binding Outcome

This packet binds the admitted `F6c` candidate to one exact unblocking artifact for `M05` and `M06`: an independently evaluated, dimensionless, member-level Master Equation acceleration-residual measurement on the same refined dual-turn evidence generation that currently supplies the F6c `M02`--`M04` and `M08` rows. It does not authorize an EOM run, make either metric available, change a score, close `H5`, or establish retention.

Plainly: the next F6c equation-consistency test now has one named history, one ruler, one interval, and one independent comparison rule. Merely writing this packet earns no evidence.

## Version 2 Subject-Provenance Correction

The subject is the durably preserved [refined Stage B summary](2026-08-27-f6c-refined-stage-b-summary.json) and [refined Stage B row manifest](2026-08-27-f6c-refined-stage-b-manifest.json), not the Stage A release state. The summary's `search.continuationCenterProvenance` names Stage A row `12`; its sole analyzed row is Stage B row `0`, with the same run ID and fifteen selected history parameters. Stage B refines the integration step from `0.004` to `0.002`, history-segment step from `0.01` to `0.005`, and root tolerance from `0.00001` to `0.000005`, and records the trajectory through `0.13`. The Stage A and Stage B protocol fingerprints remain distinct: `fnv1a64:f748eaa24603b62f` and `fnv1a64:6b87d1f138d33e13`. No assertion of byte-identical trajectories or interchangeable release rates is made.

The durable summary has SHA-256 `9e053c214e2d09544a488957dde7d59de40ee15937b8c056ef7d56d24eb40d3d`. It preserves every byte of the original local summary, SHA-256 `659dca66f8064ddf36faca8887ddabbd8c82c775be11e4dc14961f82e0ac99f9`, followed only by one final newline; the original remains unchanged. The durable row manifest is byte-identical to its local source, SHA-256 `cbd4fa5392298c3fb72a86c247daa0081f33aa6b39f2982ef5348ca0cd50830b`. Both copies were checked against their declared source hashes before preservation. The original sources remain at `.tmp/f6c-dual-turn-stage-b-row12-refined-v2/search-summary.json` and its `row-000/run-manifest.json`.

Plainly: the selected geometry is unchanged, but the refined calculation has its own exact record. This version names and preserves that record without borrowing the earlier calculation's slightly different rate numbers.

Independent read-only review accepted this v2 provenance correction at document SHA-256 `54860069fc4e5aa2b49929a62b7be42acba6a11c7111e805bd3bed30e85eb546`, before this review-status update. It verified both durable copies, their original sources, all fifteen selected parameters, the exact release quotation, refinement controls, labels, source hashes, and the unchanged ruler. The separately discovered uncertainty-radius, derivative-coefficient, join-admission, exact and merged root-width, and stored-center error-propagation defects are repaired and independently reviewed, with the final 74 affected checks passing; exact source/test generations are tracked in the [launch-readiness packet](2026-08-27-braid-search-launch-readiness.md#bp-010-reference-blocker). The separately reviewed offline data export is also complete. These bounded results do not certify every reference behavior or authorize a run; continuous-reception interval bounds and the independent acceleration measurement remain outstanding.

## Why This Obligation Is Not A New Gate

`M05` and `M06` already require the RMS and peak mismatch between a history's required member acceleration and the complete Master Equation acceleration on that same history. The all-candidate campaign named an independent normalized member-acceleration packet as an exact F6c blocker. This packet replaces that vague blocker with an executable specification and has the existing [weighted score packet](../candidate-weighted-score-packet.md#frozen-metric-normalization) as its direct consumer. It adds no metric, hard gate, or candidate status.

Plainly: this is the missing measurement recipe for two existing score rows, not another hurdle added to the program.

## Frozen Candidate And Record Identity

| Field | Frozen value |
| --- | --- |
| candidate | `F6c` |
| measurement scope | refined dual-turn row from the 2026-08-24 bounded campaign |
| evidence packet | [F6c dual-turn return search](../../mapping-electromagnetism/f6c-dual-turn-return-search-2026-08-24.json) |
| evidence-packet SHA-256 | `342e8fc12f61f677a869e6af357691937415c0bf646746f565f1578215676b86` |
| refined summary | [Durable Stage B summary](2026-08-27-f6c-refined-stage-b-summary.json), SHA-256 `9e053c214e2d09544a488957dde7d59de40ee15937b8c056ef7d56d24eb40d3d` |
| refined row manifest | [Durable Stage B manifest](2026-08-27-f6c-refined-stage-b-manifest.json), SHA-256 `cbd4fa5392298c3fb72a86c247daa0081f33aa6b39f2982ef5348ca0cd50830b` |
| run ID | `f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1` |
| refined model fingerprint | `fnv1a64:6b87d1f138d33e13` |
| generating specification | `F6c-nonlinear-return-map-search-v2-return-continuation` |
| search-runner SHA-256 | `5ecf2d80fa301b65d0460948269e698e903fbc2acc68d06bef4165b7d728f001` for `scripts/mapping-electromagnetism/f6c-nonlinear-return-map-search.mjs` |
| EOM harness SHA-256 | `5100c4d555646e3d8a64a9282c22537ea0f4a72934b88f7be9b892c9328bc87a` for `scripts/eom/attractor-ensemble-harness.cpp` |
| member labels in path-key order | `(0+,0-,1+,1-,2+,2-,3+,3-)` for path keys `(1,2,3,4,5,6,7,8)` |
| numerical wake speed | $c_f=1$ |
| certified interval | $I=[0,0.13]$ |
| existing refined subject | step `0.002`; history-segment step `0.005`; root tolerance `0.000005`; 80 accepted and 0 rejected steps |

The checked-in evidence packet's `stageA.qualifiedRow` owns the candidate selection, not the refined release rates. The authoritative reduced release audit is the durable summary's `rows[0].result.completeStateRecords.release`, quoted literally here:

```json
{
  "positive": {"h": 0.3229024917117783, "rho": 0.34604987619024485, "theta": 1.7390083487928554, "hDot": 0.05793332034872768, "rhoDot": 0.0034138698807418544, "thetaDot": 0.5882775003577766},
  "negative": {"h": 0.4084610265005255, "rho": 0.41856143156703257, "theta": -1.1184456250827515, "hDot": 0.07840243440862339, "rhoDot": -0.049304356437627005, "thetaDot": 1.4509280527337247}
}
```

Plainly: these are the refined record's two sector coordinates and rates. They are an audit target, not a replacement for all eight Cartesian histories or their numerical error bounds.

Reconstruction must bind the durable row manifest's exact `f6cCoordinate`, `seeds`, `coupling`, retained-history controls, and integration controls, and the summary's exact fifteen `parameters` literals. In particular, the manifest's recorded coupling is the string `10.304229970992187`; it is not replaced with another candidate's normalization. The manifest's input-coordinate literals and the summary's reconstructed release-coordinate literals have distinct roles and must not be silently substituted for each other. Every refined-rung export must preserve all eight member identities and the complete accepted retained history; a release snapshot alone is insufficient.

The operator-selected [small asymmetric counter-breathing display representative](../configurations/f6c-polarity-resolved-harmonic.v2.json) is explicitly excluded. It is a prescribed visualization from a different evidence generation. The radial-frequency continuation is also excluded because it changes the history and its declared coordinate is already exhausted below its material-improvement gate.

Plainly: the test stays attached to the F6c trajectory that already owns the score-bearing root, speed, and leakage values. It cannot borrow acceleration numbers from the newer display animation or the separate radial-frequency sweep.

## Common Ruler, Clock, And Interval

At release, with eight equally weighted persistent members and zero internal centroid,

$$
L_0^2
=
\frac12\left(h_+^2+\rho_+^2+h_-^2+\rho_-^2\right),
\qquad
L_0=0.5320012303229503.
$$

With $c_f=1$,

$$
T_0=L_0=0.5320012303229503,
\qquad
\Delta\widehat t=\frac{0.13}{T_0}=0.24436033713885164.
$$

The physical-time interval $I=[0,0.13]$ corresponds to the dimensionless interval $\widehat I=[0,0.24436033713885164]$.

Plainly: $L_0$ is the release radius of gyration of the eight labeled members, and $T_0$ is one wake-crossing time across that radius. The complete measured interval is about 0.244 of that clock.

## Frozen `M05` And `M06` Measurement

For each persistent member $i$, the dimensionless Cartesian residual is

$$
\mathbf r_i(t)
=
\frac{L_0}{c_f^2}
\left(
\ddot{\mathbf X}_i^{\mathrm{history}}(t)
-
\mathbf A_i^{\mathrm{ME}}\!\left(\mathbf X_{\mathrm{history}}\right)(t)
\right).
$$

The required raw values are

$$
R_{\mathrm{RMS}}^2
=
\frac1{8\Delta\widehat t}
\sum_{i=1}^{8}
\int_{\widehat I}\lVert\mathbf r_i(T_0\widehat t)\rVert^2\,d\widehat t,
\qquad
R_{\mathrm{peak}}
=
\sup_{i,\widehat t\in\widehat I}\lVert\mathbf r_i(T_0\widehat t)\rVert.
$$

`M05` uses $q_{05}=\operatorname{clip}(1-R_{\mathrm{RMS}},0,1)$ and `M06` uses $q_{06}=\operatorname{clip}(1-R_{\mathrm{peak}},0,1)$. No coordinate-level residual, summed-member cancellation, scalar tangent residual, or post-selected rescaling may substitute for these member-level Cartesian quantities.

Plainly: every member's actual path curvature is compared with the complete delayed-history acceleration that the Master Equation assigns to that same member. The average cannot hide one bad member because the peak is reported separately.

## Independence Contract

The subject is the EOM solver trajectory. Its acceleration field is not its own oracle. The measurement must use these independent sides:

1. **History-required side:** a separately authored reducer reconstructs $\ddot{\mathbf X}_i^{\mathrm{history}}$ from the exported accepted position-and-rate history. On every adjacent accepted-frame interval it uses the unique Cartesian cubic Hermite interpolant fixed by the two endpoint positions and rates. It differentiates that interpolant analytically; it does not read an EOM acceleration output.
2. **Master Equation side:** the existing 90-decimal-digit Python reference in `scripts/eom/oracle/certified_acceleration.py` and `scripts/eom/oracle/reference_kernel.py` evaluates the complete acceleration from an exported retained-history snapshot at each requested time. Their frozen SHA-256 values are `62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83` and `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6`.
3. **Data bridge:** a report-only exporter must materialize the complete retained path segments, labels, polarities, receiver/transmitter ownership, and numerical enclosures needed by the reference side. The exporter may not recompute roots or accelerations. Its output receives a SHA-256 digest and is retained with the measurement packet.

The EOM solver, its acceleration kernel, and the two frozen reference files may not be modified in the implementation or execution change that produces this packet. If the current reference cannot consume the exported history without modification, execution stops and `M05/M06` remain unavailable until a separately reviewed adapter is accepted.

Plainly: one calculation reads the trajectory geometry; a separately written calculation reevaluates the law. Reusing the solver's own acceleration output would show only that the solver agrees with itself and would earn no metric.

## Numerical Enclosure And Refinement Contract

The execution must reproduce the frozen subject and then run the same input at this complete refinement ladder:

| rung | EOM step | history-segment step | root tolerance |
| --- | ---: | ---: | ---: |
| 0 | `0.002` | `0.005` | `0.000005` |
| 1 | `0.001` | `0.0025` | `0.0000025` |
| 2 | `0.0005` | `0.00125` | `0.00000125` |

Every rung must reach $T=0.13$ with the same eight identities, complete required root ownership at every evaluation node, strictly positive pair clearance, and maximum member speed below $c_f=1$. Accepted and rejected step counts are reported as numerical provenance; a rejected adaptive attempt is not itself a scientific failure when the accepted trajectory and all evidence gates remain complete. A missing root, unresolved multiplicity, identity change, incomplete retained-history export, or failed interval invalidates the rung.

The integral uses deterministic interval Gauss--Kronrod subdivision on every accepted-frame interval until the total enclosure width for $R_{\mathrm{RMS}}$ is at most $10^{-6}$. The peak uses interval branch-and-bound until its upper-minus-lower enclosure is at most $10^{-6}$. Either process stops after 20 subdivisions per accepted-frame interval and fails closed if the required enclosure is not reached.

The finest-rung value becomes available only when both adjacent-rung changes obey

$$
|R^{(1)}-R^{(2)}|
\le
\max\left(10^{-6},0.01R^{(2)}\right)
$$

separately for RMS and peak residual. The packet publishes all three raw values, all numerical enclosures, wall time, peak member/time, root counts and margins, clearance, speed, hashes, and failure codes; it never publishes only rounded score credit.

Plainly: the measurement must settle when the EOM step, stored-history spacing, and root tolerance are each halved twice. If the answer still moves by more than one percent or cannot be enclosed tightly, the metric stays unknown rather than receiving a convenient number.

## Disposition Rules

- If every admission and refinement condition passes, `M05` and `M06` become measured values for this exact F6c evidence generation and the score packet is recomputed without changing weights or anchors.
- If the independent acceleration residual excludes the subject trajectory beyond its declared numerical envelope, the refined dual-turn record loses equation-consistency authority and its same-generation score rows require readjudication. This does not reject the exact F6c geometry family.
- If the instrument cannot reach the full interval or certify the comparison, the result is `unavailable`; absence of a value is not a favorable residual.
- No outcome changes `H5` by itself. A complete labeled-history return and retained-history certificate remain separate obligations.

Plainly: a clean result can add two factual measurements. A bad result can invalidate this one evolved record. Neither outcome proves or disproves every possible F6c history.

## Claim Grades And Falsifiers

- **Derived:** the centered-RMS ruler, wake-crossing clock, exact member residual, and normalization values. They are falsified by a direct reconstruction of the frozen release state that changes $L_0$ or by a faithful symmetry transformation that changes the normalized residual.
- **Inferred policy:** the three-rung refinement and $10^{-6}$/one-percent enclosure rule. It is rejected before execution if independent review shows it cannot distinguish trajectory error from evaluator error at the required scale.
- **Measured only after execution:** the raw `M05` and `M06` values. They are overturned by a faithful independent rerun whose enclosures do not overlap or by a provenance audit showing incomplete root ownership, altered identity, or a changed evidence generation.

Excluded claims: retained braid, stability, equilibrium, binding, physical realization, energy or angular closure, return, particle identity, electromagnetic recovery, candidate-family ranking, and validation of the EOM solver beyond this exact record and interval.

## Required Output

Execution must produce one machine-readable packet under `reference/priorities/braid-program/evidence/` containing the frozen identity, source and instrument hashes, per-rung raw residuals and enclosures, complete admission ledger, peak witness, wall-time measurements, disposition, claim grades, falsifiers, and excluded claims. Until that packet exists and passes independent review, F6c remains `STASIS`, `M05/M06` remain unavailable, and no EOM execution is authorized by this predeclaration.

The [launch-readiness packet](2026-08-27-braid-search-launch-readiness.md#bp-010-reference-blocker) records the independently reviewed offline adapter and actual data-only export. All 14,080 original segment records and 648 accepted-frame rows preserve their exact tokens. This closes the data bridge only; continuous-reception interval bounds and the independent acceleration measurement remain outstanding.

Closure goal: preserve the verified Stage B data bridge and repaired references while closing the continuous-reception measurement interface before any three-rung execution.
