# Braid Candidate Weighted Score Packet

Status: CURRENT SCORE SNAPSHOT v1, 2026-08-25. This packet applies the approved [Weighted Score Process](candidate-registry.md#weighted-score-process) to every active admitted, active exploratory, and scoped-negative braid row in the registry. It does not score accessory-bearing associated assemblies, aliases, or the deprecated `B1.4` control because they are not braid options under this metric contract.

The percentages are allocation summaries. The [Braid Candidate Requirement Adjudication](../mapping-electromagnetism/braid-candidate-requirement-adjudication.md) remains authoritative for the hard gates, and a failed hard gate cannot be compensated by either percentage. The `A3` values are scoped to the measured five-coordinate pair-conjugate slice, not the full A3 family.

Plainly: these numbers summarize the evidence presently attached to each braid option. They do not certify a retained braid, and a row with no measurements is shown as unevaluated rather than physically bad.

## Frozen Metric Normalization

The metric identifiers below follow the registry order. Binary closure receives either zero or one. Fractions and margins use their natural interval from zero to one. A dimensionless residual uses full-credit anchor zero and zero-credit anchor one. Values outside the anchor interval are clipped. No current raw value was used to choose an anchor.

| ID | Metric | Weight | Frozen credit map for this snapshot |
| --- | --- | ---: | --- |
| `M01` | Coordinate-coincidence limit closure | 8 | $q=1$ for certified closure and $q=0$ for certified failure. `N/A` only when continuous certification excludes coordinate coincidence over the claimed history. |
| `M02` | Required causal-root completeness | 8 | $q=N_{\mathrm{certified}}/N_{\mathrm{required}}$. |
| `M03` | Field-speed margin | 4 | $q=\operatorname{clip}(1-v_{\max}/c_f,0,1)$. |
| `M04` | Root-transversality margin | 5 | $q=\operatorname{clip}(\min\lvert D_t\rvert/c_f,0,1)$. |
| `M05` | Master Equation RMS acceleration residual | 10 | $q=\operatorname{clip}(1-R_{\mathrm{RMS}},0,1)$ for a predeclared dimensionless residual. |
| `M06` | Master Equation peak acceleration residual | 10 | $q=\operatorname{clip}(1-R_{\mathrm{peak}},0,1)$ on the same history and normalization as `M05`. |
| `M07` | Certified evolution horizon | 10 | $q=\operatorname{clip}(\tau_{\mathrm{cert}}/\tau_{\mathrm{target}},0,1)$ only when both times use one predeclared dimensionless braid-scale normalization. |
| `M08` | Invariant-surface leakage | 5 | $q=\operatorname{clip}(1-R_{\mathrm{leak}},0,1)$ for a predeclared dimensionless leakage residual. |
| `M09` | Certified return-cycle traversal | 10 | $q$ is the certified fraction in $[0,1]$ of one predeclared nontrivial lifted return action. |
| `M10` | Position-return residual | 4 | $q=\operatorname{clip}(1-R_X,0,1)$ for the dimensionless member-position residual at one eligible event. |
| `M11` | Rate-return residual | 4 | $q=\operatorname{clip}(1-R_V,0,1)$ at the same event and under the same action as `M10`. |
| `M12` | Retained-history return residual | 7 | $q=\operatorname{clip}(1-R_H,0,1)$ at the same event and under the same action as `M10` and `M11`. |
| `M13` | Prehistory-collapse residual | 5 | $q=\operatorname{clip}(1-R_P,0,1)$ for the predeclared dimensionless multi-prehistory residual. |
| `M14` | Positive-width retained-neighborhood certificate | 10 | $q=1$ for a certified nonempty open retained set and $q=0$ for a proved zero-width set. |

Plainly: the maps reward only physical or mathematical quantities, not completed workflow stages. A current record without the required dimensionless normalization or exact-action split stays unavailable even when it contains a nearby diagnostic number.

## Admissible Raw Records

Only five braid rows currently supply at least one admissible scored metric. The numerical credits below retain more digits than the registry percentages so the calculations can be reproduced.

| Candidate and scope | Metric | Raw factual record | Grade and evidence | Normalized credit $q$ |
| --- | --- | --- | --- | ---: |
| `A3`, measured five-coordinate slice | `M01` | Continuous guarded noncoincidence through $T=0.15$ | Measured; [bounded comparison](../mapping-electromagnetism/three-binary-five-coordinate-bounded-eom-comparison.md) | `N/A` |
| `A3`, same slice | `M02` | $108/108$ accepted required root certificates; zero unresolved rows | Measured; same record | $1$ |
| `A3`, same slice | `M03` | $1-0.8921955512=0.1078044488$ | Measured; same record | $0.1078044488$ |
| `A3`, same slice | `M04` | Minimum certified transmitter-factor lower bound $0.920539$ | Measured; same record | $0.920539$ |
| `SD3` | `M01` | Continuous guarded noncoincidence through $T=0.15$ | Measured; [bounded comparison](../mapping-electromagnetism/three-binary-five-coordinate-bounded-eom-comparison.md) | `N/A` |
| `SD3` | `M02` | $108/108$ accepted required root certificates; zero unresolved rows | Measured; same record | $1$ |
| `SD3` | `M03` | $1-0.8563730889=0.1436269111$ | Measured; same record | $0.1436269111$ |
| `SD3` | `M04` | Minimum certified transmitter-factor lower bound $0.925956$ | Measured; same record | $0.925956$ |
| `F5`, declared ordinary two-ring circular realization | `M01` | The exact joint conditions require coordinate coincidence, but no finite provenance-preserving continuation is declared | Derived; [two-ring no-go](../mapping-electromagnetism/inferring-braid-requirements.md#joint-projection-audit-and-a-two-ring-no-go) | $0$ |
| `F6b`, original hashed circular history | `M01` | Exact continuous noncoincidence over the complete prescribed cycle | Derived; [F6b root and acceleration screen](../mapping-electromagnetism/inferring-braid-requirements.md#f6b-root-ledger-and-member-acceleration-screen) | `N/A` |
| `F6b`, same history | `M02` | $7{,}168/7{,}168$ required partner-root rows | Measured; same record | $1$ |
| `F6b`, same history | `M03` | $1-0.30=0.70$ | Derived; same record | $0.70$ |
| `F6b`, same history | `M04` | Minimum measured $D_t/c_f=0.7062275402$ | Measured; same record | $0.7062275402$ |
| `F6b`, same history | `M05` | $R_{\mathrm{RMS}}=0.2990089834/0.30=0.9966966113$ | Measured residual with derived same-history normalization; same record | $0.0033033887$ |
| `F6b`, same history | `M06` | $R_{\mathrm{peak}}=0.3644475203/0.30=1.2148250677$ | Measured residual with derived same-history normalization; same record | $0$ |
| `F6c`, refined dual-turn row | `M01` | Continuous guarded noncoincidence through refined $T=0.13$ | Measured; [dual-turn packet](../mapping-electromagnetism/f6c-dual-turn-return-search-2026-08-24.json) | `N/A` |
| `F6c`, same row | `M02` | $64/64$ required release-root rows and complete accepted-snapshot root certification | Measured; same record | $1$ |
| `F6c`, same row | `M03` | $1-0.8484514575609374=0.1515485424390626$ | Measured; same record | $0.1515485424$ |
| `F6c`, same row | `M04` | Minimum transmitter-factor magnitude $0.6777570293400862$ | Measured; same record | $0.6777570293$ |
| `F6c`, same row | `M08` | Maximum normalized position/velocity manifold residual $9.2918467714\times10^{-16}$ | Measured; same record | $0.9999999999999991$ |

Plainly: F6b has more evaluated early metrics than the three-pair rows, but two of them are the acceleration-residual failure that caused its demotion. F6c has the broadest favorable early packet, while no row yet contributes an admissible return, preparation-collapse, or retained-neighborhood value.

### Record-Level Falsifiers

- The `A3`-slice or `SD3` metric rows are overturned if a faithful refined rerun loses accepted-root completeness or continuous noncoincidence, crosses $c_f=1$, or moves the reported margin beyond its numerical enclosure.
- The `F5` zero is overturned if the declared ordinary two-ring realization satisfies the stationary-centroid, instantaneous-dipole-null, and distinct-member conditions simultaneously, or if a regulator-independent coordinate-coincidence continuation closes the obstructed branch.
- The `F6b` rows are overturned if a faithful recomputation or an independently authored evaluation changes the root inventory, causal margins, or same-history normalized member residuals beyond their declared tolerances.
- The `F6c` rows are overturned if the refined packet cannot reproduce its root inventory, continuous guards, margins, fixed member identities, or normalized manifold leakage within the declared refinement contract.

Plainly: each score-bearing record says what calculation or derivation would remove its credit or failure. A broader success may supersede a scoped negative without retroactively changing what the older bounded record measured.

### Values Deliberately Left Unavailable

- The $T=0.15$ three-pair horizons and the refined F6c $T=0.13$ horizon are real bounded times, but their campaigns did not predeclare one shared dimensionless braid-scale target. `M07` therefore remains unavailable rather than receiving a retrospective target.
- The A3 and SD3 fixed-tangent residuals are useful slice diagnostics, but their packet does not publish the canonical dimensionless leakage normalization required by `M08`.
- The F6c harmonic-cycle values $2.816$ RMS and $10.518$ peak mix coordinate-acceleration components without the dimensionless member-acceleration normalization required by `M05` and `M06`.
- F6c exact-action screens publish combined coordinate-state residuals, not the canonical member-position, member-rate, and retained-history split required by `M10` through `M12`. No current campaign publishes a certified return-cycle fraction for `M09`.
- No candidate has a refined multi-prehistory collapse record or a positive-width retained-neighborhood certificate, so `M13` and `M14` remain unavailable for every row.

Plainly: these omissions are not lost work. They identify the exact reporting and mathematical gaps that the next campaign must close before those measurements can earn score credit.

## Score Calculation And Hard-Gate Overlay

For `A3`, `SD3`, `F6b`, and `F6c`, `M01` is predeclared `N/A`, so the all-metric denominator is $100-8=92$. Every other braid option retains the full denominator of 100. The earned weighted credits and available denominators are:

| Candidate | Earned weighted credit | All-metric denominator | Available-metric denominator | All metrics | Available metrics | Hard-gate overlay |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `A1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A1.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A1.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A1.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A1.4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A3`, measured five-coordinate slice | $13.0339127952$ | $92$ | $17$ | **14.17%** | **76.67%** | `H1 P[D]`; `H2`--`H4 P[M]` on this slice; `H5 U` |
| `A3.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A3.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A3.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `A3.4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `B1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `B1.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `B1.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `B1.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C5` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `C6` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `SD3` | $13.2042876444$ | $92$ | $17$ | **14.35%** | **77.67%** | `H1 P[D]`; `H2`--`H4 P[M]`; `H5 U` |
| `F6c` | $16.9949793165$ | $92$ | $22$ | **18.47%** | **77.25%** | `H1 P[D]`; `H2`--`H4 P[M]`; `H5 U` |
| `F1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F5` | $0$ | $100$ | $8$ | **0.00%** | **0.00%** | `H1 P[D]`; **`H2 F[D]`**; `H3`--`H5 U` |
| `F6` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `F6b`, demoted realization | $14.3641715877$ | $92$ | $37$ | **15.61%** | **38.82%** | `H1`--`H3 P`; **`H4 F[M]`**; `H5 U` |

Plainly: F6b's 15.61% all-metric score does not place it ahead of any active option because its `H4` failure is noncompensable. The many 0.00%/em-dash rows are simply unmeasured under this factual metric set; only F5's available zero is a scored failure.

## Sensitivity Check

The two alternative group-weight schemes preserve the original within-group proportions. `Early` assigns group totals $(30,25,15,15,5,10)$ to geometric/causal, equation, ordinary evolution, return, preparation, and retention evidence. `Late` assigns $(20,15,15,30,5,15)$. Equal weighting assigns one unit to every metric. These alternatives do not alter metric availability or hard-gate status.

| Candidate with available evidence | Approved all / available | Equal-metric all / available | Early all / available | Late all / available |
| --- | ---: | ---: | ---: | ---: |
| `A3`, measured slice | 14.17% / 76.67% | 15.60% / 67.61% | 17.30% / 76.67% | 11.14% / 76.67% |
| `SD3` | 14.35% / 77.67% | 15.92% / 68.99% | 17.53% / 77.67% | 11.29% / 77.67% |
| `F5` | 0.00% / 0.00% | 0.00% / 0.00% | 0.00% / 0.00% | 0.00% / 0.00% |
| `F6b`, demoted realization | 15.61% / 38.82% | 18.53% / 48.19% | 19.07% / 37.97% | 12.28% / 40.17% |
| `F6c` | 18.47% / 77.25% | 21.76% / 70.73% | 21.45% / 76.35% | 15.59% / 78.47% |

The all-metric evidence ordering among these five rows is unchanged by the three alternatives, but the available-metric ordering of F6c versus SD3 and the A3 slice changes. Any decision based on small differences among their available percentages is therefore weight-sensitive. Hard-gate ordering is unchanged: F5 and the declared F6b realization remain excluded unless materially repaired, and no candidate passes `H5`.

Plainly: the broad evidence total is not an artifact of the initial weights in this small snapshot, but the apparent quality ordering among the favorable early packets is. The next allocation should therefore target missing discriminating metrics, not defend a one-point difference in an early score.

## Update Rule

Update this packet and the registry columns together whenever a raw metric becomes newly available, a current value is superseded, a hard-gate disposition changes, or the approved weights or normalization policy changes. A new value must name its exact history, instrument or derivation, refinement status, falsifier, and evidence pointer. Do not backfill `M07` or `M09` through `M13` until their shared dimensionless and exact-action contracts are frozen.

Closure goal: maintain one auditable allocation snapshot in which every percentage can be reconstructed from current factual evidence without converting missing measurements, prescribed geometry, or inferred capability into braid credit.
