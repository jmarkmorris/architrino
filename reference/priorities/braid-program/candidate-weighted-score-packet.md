# Braid Candidate Weighted Score Packet

Status: CURRENT SCORE SNAPSHOT v3, 2026-08-26. This packet applies the approved [Weighted Score Process](candidate-registry.md#weighted-score-process) to every active admitted, active exploratory, and scoped-negative braid row in the registry. It does not score accessory-bearing associated assemblies, aliases, or the deprecated `B1.4` control because they are not braid options under this metric contract. Version 3 preserves every v2 raw metric and percentage while separating the active revised F5 phase-varying realization from the demoted common-cadence circular record. The revised realization's first guard campaign was predeclared as score-ineligible and therefore changes only the hard-gate overlay.

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

### Common Ruler, Clock, And Exact-Action Boundary

For a frozen seed event $t_0$ with $N$ persistent, equally weighted members, the accepted future ruler and clock are

$$
\mathbf C_0=\frac1N\sum_i\mathbf X_i(t_0),
\qquad
L_0^2=\frac1N\sum_i\lVert\mathbf X_i(t_0)-\mathbf C_0\rVert^2,
\qquad
T_0=\frac{L_0}{c_f}.
$$

Position, rate, and acceleration use units $L_0$, $c_f$, and $c_f^2/L_0$. The future `M07` target is the common dimensionless value $\tau_{\mathrm{target}}=1$. Future `M08` packets must publish the horizon supremum of the full position-and-rate distance to the exact predeclared invariant surface. Future `M10` through `M12` packets must use one eligible event, one frozen proper-rotation/translation/member-permutation/lift action, one fixed translation over the history comparison, and a bijective root-ownership map. Future `M13` packets must compare full state histories after certified seed-influence clearance.

Plainly: each candidate gets the same kind of ruler and clock, computed from its labeled release geometry before evolution. The residual rows must measure the complete fields they name and must all refer to the same return event.

For `M05` and `M06`, let

$$
\mathbf r_i(t)=\frac{L_0}{c_f^2}\left(\ddot{\mathbf X}_i^{\mathrm{history}}(t)-\mathbf A_i^{\mathrm{ME}}\!\left(\mathbf X_{\mathrm{history}}\right)(t)\right).
$$

On a predeclared interval $I$ of dimensionless length $\Delta\widehat t$, use

$$
R_{\mathrm{RMS}}^2=\frac1{N\Delta\widehat t}\sum_i\int_I\lVert\mathbf r_i\rVert^2\,d\widehat t,
\qquad
R_{\mathrm{peak}}=\sup_{i,t\in I}\lVert\mathbf r_i(t)\rVert.
$$

For `M08`, define the full-state distance

$$
d_*^2(z,z')=\frac1N\sum_i\left(\frac{\lVert\Delta\mathbf X_i\rVert^2}{L_0^2}+\frac{\lVert\Delta\mathbf V_i\rVert^2}{c_f^2}\right),
\qquad
R_{\mathrm{leak}}=\sup_{t\in I}\inf_{m\in\mathcal M_b(t)}d_*(z(t),m),
$$

where $\mathcal M_b(t)$ is the exact predeclared labeled position-and-rate surface, including its allowed center variables and frozen symmetry quotient.

Plainly: equation mismatch compares the history's member acceleration with the complete Master Equation acceleration in one fixed unit. Leakage measures the greatest full position-and-rate distance from the exact candidate surface anywhere in the certified interval.

For one eligible event $t_e$ and one frozen action $g=(Q,\mathbf a,\pi,\widetilde g)$, set $\mathbf a=\mathbf C(t_e)-Q\mathbf C(t_0)$ for the entire comparison and

$$
\Delta\mathbf X_i(s)=\mathbf X_i(t_e+s)-Q\mathbf X_{\pi(i)}(t_0+s)-\mathbf a,
\qquad
\Delta\mathbf V_i(s)=\mathbf V_i(t_e+s)-Q\mathbf V_{\pi(i)}(t_0+s).
$$

Then `M10` and `M11` use

$$
R_X=\left(\frac1N\sum_i\frac{\lVert\Delta\mathbf X_i(0)\rVert^2}{L_0^2}\right)^{1/2},
\qquad
R_V=\left(\frac1N\sum_i\frac{\lVert\Delta\mathbf V_i(0)\rVert^2}{c_f^2}\right)^{1/2}.
$$

For `M12`, predeclare a dimensionless retained-history depth $\Lambda$ and put $u=s/T_0\in[-\Lambda,0]$. Remove the endpoint position and rate already scored by `M10/M11`:

$$
\mathbf E_i(u)=\frac{\Delta\mathbf X_i(T_0u)-\Delta\mathbf X_i(0)}{L_0}-u\frac{\Delta\mathbf V_i(0)}{c_f},
\qquad
\mathbf E'_i(u)=\frac{\Delta\mathbf V_i(T_0u)-\Delta\mathbf V_i(0)}{c_f}.
$$

For each compared receiver lag $s$, let $\theta_r^{\mathrm{out}}(s)$ and $\theta_{\widetilde g r}^{\mathrm{in}}(s)$ be the matched outgoing and incoming causal-root emission offsets under the frozen root-row bijection. Define

$$
R_H=\max\left\{
\sup_u\left(\frac1N\sum_i\lVert\mathbf E_i(u)\rVert^2\right)^{1/2},
\sup_u\left(\frac1N\sum_i\lVert\mathbf E'_i(u)\rVert^2\right)^{1/2},
\sup_{s,r}\frac{\lvert\theta_r^{\mathrm{out}}(s)-\theta_{\widetilde g r}^{\mathrm{in}}(s)\rvert}{T_0}
\right\}.
$$

Missing roots, an unproved permutation, or no certified finite $\Lambda$ make `M12` unavailable. For `M13`, after seed-influence clearance and with one predeclared fixed alignment for each materially different prehistory pair $(\alpha,\beta)$, define

$$
R_P=\max_{\alpha<\beta}\sup_{t\in I_P}\max\{R_X^{\alpha\beta}(t),R_V^{\alpha\beta}(t),R_H^{\alpha\beta}(t)\}.
$$

Plainly: position, rate, earlier-history shape, and causal-root timing are now reproducible separate ingredients. Preparation collapse applies the same complete comparison to every declared pair of genuinely different prehistories after their seed records can no longer influence the window.

The ruler is invariant under translation and proper rotation. Under the declared uniform scaling map $\mathbf X\mapsto\lambda\mathbf X$ and $t-t_0\mapsto\lambda(t-t_0)$ with fixed $c_f$, the normalized quantities are unchanged. This is a reporting covariance, not a claim that the EOM has a dilation symmetry.

No common nonbinary `M09` fraction is accepted. An exact lifted action is discrete, and reparameterizing a representative partial path preserves its endpoints and action while changing an assigned fractional parameter. `M09` therefore remains unavailable until a candidate-native continuous lift coordinate or independently justified canonical reference path is derived and frozen before evolution. A scalar crossing, isolated turn, elapsed time, winding marker, or shape-only near match is ineligible.

Plainly: a full action can be certified, but the current charts do not supply a fair universal percentage for an incomplete action. That missing mathematical coordinate remains the `M09` blocker.

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

- The $T=0.15$ three-pair horizons and the refined F6c $T=0.13$ horizon are real bounded times. Static reconstruction under the new ruler gives diagnostic dimensionless horizons `0.43133911780222495` for both the A3 slice and SD3 and `0.24436033713885164` for F6c, but those campaigns did not predeclare this target or one common stopping contract. `M07` therefore remains unavailable rather than receiving retrospective credit.
- The A3 and SD3 fixed-tangent residuals are useful slice diagnostics, but their packet does not publish the full position-and-rate horizon-supremum distance and enclosure now required by `M08`.
- The F6c harmonic-cycle values $2.816$ RMS and $10.518$ peak mix coordinate-acceleration components without the dimensionless member-acceleration normalization required by `M05` and `M06`. The [same-generation F6c predeclaration](evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md) now freezes an admissible future measurement route on the refined dual-turn row, but it has not been executed and makes no value available.
- F6c exact-action screens publish combined coordinate-state residuals, not the canonical member-position, member-rate, and retained-history split required by `M10` through `M12`. No current campaign supplies the candidate-native continuous lift coordinate required for a nonbinary `M09` fraction.
- No candidate has a refined multi-prehistory collapse record or a positive-width retained-neighborhood certificate, so `M13` and `M14` remain unavailable for every row.
- The revised F5 phase-varying realization has a continuous prescribed-history clearance certificate and conservative speed bound, but its selecting campaign explicitly excluded score availability. It therefore receives no retrospective `M01` or `M03` row. The `F5` common-cadence circular `M01=0` record remains attached only to that demoted realization.

Plainly: these omissions are not lost work. They identify the exact reporting and mathematical gaps that the next campaign must close before those measurements can earn score credit.

## All-Candidate Campaign Disposition Overlay

The 2026-08-26 campaign assigns `STASIS` to every active scored row except the F5 common-cadence circular realization, which remains `DEMOTED` at `H2 F[D]`. The revised phase-varying F5 creative geometry is a distinct active exploratory row. The already-demoted F6b circular realization remains `DEMOTED` at `H4 F[M]`. Accessory-bearing continuations are unscored and remain in stasis behind their base-braid `H5` dependency. The complete candidate-by-candidate blocker ledger is in the [campaign closeout](evidence/2026-08-26-all-candidate-evaluation-campaign-closeout.md).

The later [complete-registry campaign](campaigns/2026-08-complete-braid-registry-closure.md) advances the revised F5 realization to `H1/H2 P[D/M]` without changing a metric. Its separate [enclosed-root restart](evidence/2026-08-27-f5-enclosed-root-closure.md) adds only scoped `H3 P[M]` on the declared `8/32/128` reception ladder, not ordinary evolution or a score. The active revised row remains `0.00% / —`; the demoted circular row retains `0.00% / 0.00%`. No evidence generation is combined.

No score changed. An independent arithmetic audit reproduced every approved, equal-metric, Early, and Late percentage from the raw values and applicability sets. The all-metric ordering among rows with available evidence is unchanged under the sensitivity schemes, while the available-metric ordering among the A3 slice, SD3, and F6c remains weight-sensitive. Hard-gate ordering remains controlling.

Plainly: the campaign finished the disposition audit, not a leaderboard. It found exact reasons to stop or demote each realization and verified that the existing arithmetic is correct.

## Score Calculation And Hard-Gate Overlay

For `A3`, `SD3`, `F6b`, and `F6c`, `M01` is predeclared `N/A`, so the all-metric denominator is $100-8=92$. Every other braid option retains the full denominator of 100. The earned weighted credits and available denominators are:

The later [parallel A/B/C H1/H2 census](evidence/2026-08-26-parallel-abc-h1-h2-census.md) updates only the hard-gate overlay below. Its prescribed-history search was score-ineligible, so every earned credit, denominator, percentage, `STASIS` disposition, and availability boundary remains unchanged. The separate [complete-root ladder audit](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-complete-ladders) adds scoped prescribed `H3 P[M]` for `A1.1`, `A1.2`, `A1.4`, `A2`, `A3.1`, `A3.2`, `A3.4`, `B1.1`, `B1.2`, `B1.3`, `C1`, `C2`, `C3`, `C4`, `C5`, and `C6` only. It changes no metric, credit, availability, percentage, or historical disposition and supplies no ordinary-evolution result.

Plainly: closing a geometry admission gate tells us which test may run next. It does not award evidence points for dynamics that were not tested.

| Candidate | Earned weighted credit | All-metric denominator | Available-metric denominator | All metrics | Available metrics | Hard-gate overlay |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `A1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; `H3`--`H5 U`; H3 admission blocked by $v_{\max}\ge1$ |
| `A1.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A1.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A1.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; `H3`--`H5 U`; H3 admission blocked by $v_{\max}\ge1$ |
| `A1.4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A3`, measured five-coordinate slice | $13.0339127952$ | $92$ | $17$ | **14.17%** | **76.67%** | `H1 P[D]`; `H2`--`H4 P[M]` on this slice; `H5 U` |
| `A3.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2 P[D/M]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A3.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2 P[D/M]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `A3.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; `H3`--`H5 U`; H3 admission blocked by $v_{\max}\ge1$ |
| `A3.4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `B1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `B1.1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `B1.2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `B1.3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C5` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `C6` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1/H2 P[D]`; scoped prescribed `H3 P[M]`; `H4/H5 U` |
| `SD3` | $13.2042876444$ | $92$ | $17$ | **14.35%** | **77.67%** | `H1 P[D]`; `H2`--`H4 P[M]`; `H5 U` |
| `F6c` | $16.9949793165$ | $92$ | $22$ | **18.47%** | **77.25%** | `H1 P[D]`; `H2`--`H4 P[M]`; `H5 U` |
| `F1` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F2` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F3` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F4` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1`--`H5 U` |
| `F5`, revised phase-varying campaign realization | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D/M]`; `H2 P[D/M]`; scoped prescribed `H3 P[M]`; `H4/H5 U`; score-ineligible |
| `F5`, common-cadence circular realization | $0$ | $100$ | $8$ | **0.00%** | **0.00%** | `H1 P[D]`; **`H2 F[D]`**; `H3`--`H5 U` |
| `F6` | $0$ | $100$ | $0$ | **0.00%** | **—** | `H1 P[D]`; `H2`--`H5 U` |
| `F6b`, demoted realization | $14.3641715877$ | $92$ | $37$ | **15.61%** | **38.82%** | `H1`--`H3 P`; **`H4 F[M]`**; `H5 U` |

Plainly: F6b's 15.61% all-metric score does not place it ahead of any active option because its `H4` failure is noncompensable. The many 0.00%/em-dash rows are simply unmeasured under this factual metric set; only F5's available zero is a scored failure.

## Sensitivity Check

The two alternative group-weight schemes preserve the original within-group proportions. `Early` assigns group totals $(30,25,15,15,5,10)$ to geometric/causal, equation, ordinary evolution, return, preparation, and retention evidence. `Late` assigns $(20,15,15,30,5,15)$. Equal weighting assigns one unit to every metric. These alternatives do not alter metric availability or hard-gate status.

| Candidate with available evidence | Approved all / available | Equal-metric all / available | Early all / available | Late all / available |
| --- | ---: | ---: | ---: | ---: |
| `A3`, measured slice | 14.17% / 76.67% | 15.60% / 67.61% | 17.30% / 76.67% | 11.14% / 76.67% |
| `SD3` | 14.35% / 77.67% | 15.92% / 68.99% | 17.53% / 77.67% | 11.29% / 77.67% |
| `F5`, common-cadence circular realization | 0.00% / 0.00% | 0.00% / 0.00% | 0.00% / 0.00% | 0.00% / 0.00% |
| `F6b`, demoted realization | 15.61% / 38.82% | 18.53% / 48.19% | 19.07% / 37.97% | 12.28% / 40.17% |
| `F6c` | 18.47% / 77.25% | 21.76% / 70.73% | 21.45% / 76.35% | 15.59% / 78.47% |

The all-metric evidence ordering among these five rows is unchanged by the three alternatives, but the available-metric ordering of F6c versus SD3 and the A3 slice changes. Any decision based on small differences among their available percentages is therefore weight-sensitive. Hard-gate ordering is unchanged: the F5 common-cadence circular realization and the declared F6b realization remain excluded unless materially repaired, and no candidate passes `H5`.

Plainly: the broad evidence total is not an artifact of the initial weights in this small snapshot, but the apparent quality ordering among the favorable early packets is. The next allocation should therefore target missing discriminating metrics, not defend a one-point difference in an early score.

## Update Rule

Update this packet and the registry columns together whenever a raw metric becomes newly available, a current value is superseded, a hard-gate disposition changes, or the approved weights or normalization policy changes. A new value must name its exact history, instrument or derivation, refinement status, falsifier, and evidence pointer. Do not backfill old records under the new ruler and clock. New `M07`, `M08`, and `M10` through `M13` packets must predeclare the accepted contract above; nonbinary `M09` remains unavailable until its continuous-lift-coordinate proof obligation closes.

Closure goal: maintain one auditable allocation snapshot in which every percentage can be reconstructed from current factual evidence without converting missing measurements, prescribed geometry, or inferred capability into braid credit.
