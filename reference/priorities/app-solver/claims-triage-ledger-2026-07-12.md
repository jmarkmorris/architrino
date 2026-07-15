# Claims-Triage Ledger — post-solver-audit (2026-07-12)

**Purpose.** After the [central-solver audit](central-solver-independent-audit-2026-07-12.md) found the solver is a delayed-force/root **evaluator over prescribed orbits with no coupled integrator**, every recorded conclusion must be sorted by *what the evaluator could actually compute*. This ledger is that sort, the quarantine register, and the row-by-row recovery plan. T2 rows first face the force-balance precondition; T3 rows first face the prehistory-collapse test. A failed precondition retires the row as void or not well-posed rather than dispatching a more precise version of the same invalid question.

**Tiers.**
- **T1 SURVIVES** — instantaneous delayed-force facts and **force-balance** results (does the net force/torque vanish or not on a given configuration). The kernel is validated (unit tests pass); these stand regardless of any integrator. Force-balance **negatives** ("does not balance / does not bind / does not close") are the safest of all. **[Review R2, 2026-07-15: "unit tests pass" is self-agreement language; the tier's real independent anchors are named in the review section, and per-number EOM-oracle cross-verification is the recommended hardening. Review R1: every T1 negative is scoped to its searched family — do not read a negative as covering unexplored DOF.]**
- **T2 RE-ANCHOR** — linear-stability (pencil / $\mathrm{Re}\,\lambda$) verdicts. Valid only if (a) the pencil is anchored to a hand-checkable case and (b) it linearizes about an actually force-balanced configuration. Confirm each anchor, then confirm with the real integrator that predicted linear growth manifests in a true evolution. **[Review R4, 2026-07-15: precondition (b) has not been documented against the surviving T2 rows (§57, §59, §88, §89, §91, §92/§93); record each row's sector-wise balance residual against a declared gate before spending re-anchor effort.]**
- **T3 RE-DERIVE** — any temporal/dynamical claim (release, dispersal, settling/locking over time, amplitude growth, long-term fate, super-$c_f$ evolution). These used ad-hoc Euler or normal-form extrapolation and require matched multi-seed collapse tests on the validated integrator before any seed-independent claim can lift.

**Method note.** Built from the memory index (the distilled conclusion register). A deeper pass through `reference/priorities/**/brainstorming.md` + work-logs can add finer-grained rows; the tiering rules above apply unchanged. Where a single entry mixes types, the claim is split.

**The T3 remedy is insufficient — 2026-07-14.** This ledger quarantined every temporal claim "pending re-derivation on the validated integrator." That remedy does not work. A [collapse test on the antipodal binary](../braid-ideal/evidence/antipodal-binary-prehistory-collapse-test-2026-07-14.md) — four materially different prehistories seeded to the *identical* $(R_0,s_0)$ — shows the futures **do not collapse**: seed spread in $s$ reaches $40.7\%$ and remains $38.1\%$ at $t=65=6.5h$, against a refinement control of $1.5\times10^{-8}$ (signal-to-noise $2.6\times10^{7}$ at the original plateau). The common-radius phase spread grows to $0.14399$ on the extended interval. This is a delay system; the state is a function on $[-h,0]$ and every history is admissible. **A circular prehistory does not approximate the answer — it selects one.** Every T3 row below is therefore **seed-indexed**, and no row ever justified its seed. Re-running any of them on `src/eom` with a circular prehistory reproduces the original error at higher precision. **Every T3 re-run requires a collapse test — multiple materially different prehistories at matched initial state, evolved past $h$ — or its result is not about the object.** Synchronized spread is diagnostic rather than dispositive: the binary circular/out pair's $s(t)$ gap shrinks while its same-radius phase gap grows. This is a correction to the re-run protocol itself, not to any single row.

**Quarantine enforcement — closed 2026-07-14.** This ledger sorted the *conclusion register*. It never asked which quarantined conclusions were **already promoted into reader-facing `content/markdown/aaa` prose**. Several were — including rows whose stated provenance is a "native retained-history solver" release that the solver audit found never existed. The [current-tree audit](corpus-promotion-audit-2026-07-14.md) and the [git history audit](corpus-promotion-history-audit-2026-07-14.md) registered 46 live rows across 10 files; all are now adjudicated and **the corpus is repaired** (11 files, T3 removed, T2 re-graded to indication, T1 preserved verbatim — see the history audit's adjudication section). The quarantine is now enforced in the corpus, not only in this ledger. The T1 spine and the strategic conclusion are unchanged.

**Scope reassurance.** The geometry + force-balance spine (T1) is the bulk of the corpus and is intact. The strategic frontier conclusion — *no member of the searched bare-braid / isolated-triple / planar-assembly families binds → the constitutive sea is a lever* — rests on **T1 force-balance negatives** and survives at that scope (corrected 2026-07-15, review R1). Named residual freedoms remain open bare-assembly directions alongside the sea program and must not be pruned on this sentence: time-varying internal cadence $\omega(t)$, non-rigid deformation, and the canonical-photon DOF (whose §99 negative was found family-scoped on 2026-07-15). What gets re-adjudicated is the **stability + dynamics superstructure** (roughly the release/flutter/settling arc), selectively by type.

## T3 prehistory-independence protocol

For $N$ worldlines the evolved state is the retained function

$$
H_t(\theta)=\{\mathbf x_i(t+\theta),\mathbf v_i(t+\theta)\}_{i=1}^{N},
\qquad -h\le\theta\le0,
$$

not the endpoint vector alone. Every T3 rerun must therefore apply this order:

1. verify the object, charges, geometry, seed formulas, and equality of every
   endpoint position and velocity after only declared symmetries;
2. use at least three materially different endpoint-matched histories and
   multiple perturbation directions and magnitudes;
3. certify from the active-root ledger that no root still reaches the seeded
   interval $t<0$; $t>h$ by itself is not the clearance certificate;
4. compare symmetry-reduced observables on common phase branches, reporting
   synchronized-time spread separately rather than treating it as collapse;
5. establish the numerical envelope with half-step, half-prehistory-segment,
   deeper inactive history-boundary, and rate-sampling refinements;
6. fit an outcome law only after every declared seed pair reaches and remains
   within that envelope. State the tested basin. A resolved endpoint-matched
   counterexample pair refutes a universal curve; a finite seed family cannot
   prove universality over every admissible history;
7. name the closed form, theorem, or separately authored oracle that checks
   the load-bearing engine corner.

If the phase curves collapse, the common curve can support a basin-specific
seed-independent T3 claim. If a resolved pair remains separated, the result is
seed-indexed and the object-level claim is not well-posed without a preparation
condition. If neither occurs, quarantine remains. The full mathematical form,
binary calibration, and current-tree reproduction are in the
[prehistory-extension adjudication](../braid-ideal/evidence/antipodal-binary-prehistory-extension-adjudication-2026-07-14.md).

---

## Ledger

| Claim (section / memory) | Component | Tier | Quarantine | Reason / re-run note |
|---|---|---|---|---|
| §14 nested neutral inner binary: cross-hit relay cancels ≈97% (surviving net ≈1% of pump, ejective) | period-integrated causal root-sum on the cross-hit channel | **T1** | — | converged root-sum (net $0.214\to0.224$ vs magnitude sum $7.42$ under $N_T=2000\to8000$ → ≈3.0% surviving, matching the recorded ≈97%; exact normalization to be pinned by the rerun); owning record: [fold-crossing-chart-spec §14](../braid-ideal/fold-crossing-chart-spec.md), instrument `cross-hit-causal-absorption.mjs`. **Corrected 2026-07-15 (review R5c):** this row formerly read "neutral braid ~97% cancellation / *instantaneous* force cancellation" — a double provenance mislabel (wrong configuration: single-shell braid instead of the nested inner binary; wrong instrument class: §14 exists *because* the §13 instantaneous integral did not converge). The mislabel propagated into the first cross-verification attempt and produced a spurious FAIL against a different observable. |
| Geometry: octahedral/FCC, $\kappa_{\rm eq}=0.28623$, $R_M\approx3.49$, size anchors | force-balance geometry | **T1** | — | equilibria/anchors are force-balance facts |
| Charge ledgers (net $-1e$, neutral pairs) | explicit charge sums | **T1** | — | arithmetic over explicit sites |
| §82 radiation no-go (both channels bound; self-torque $+0.424$) | energy/force-interval bound at instants | **T1** | — | canonical $W^{\rm rec}$ energy bound; instantaneous seed. **[Review R5b/R3, 2026-07-15: valid as an instantaneous booking on the prescribed circular family; strategic use ("the pump that must be absorbed") presumes rail residence, which the 2026-07-14 pin retirement no longer guarantees.]** |
| §83 native release **disperses** (halt $t\approx4.80$) | temporal evolution | **T3** | **QUARANTINED** | ad-hoc semi-implicit Euler + accel cap over prescribed prehistory (already flagged) |
| §83/§84 torque-null no-go; **no bare braid in the rigid or steady per-layer-cadence families is a free particle** | force/torque balance + closure impossibility | **T1** | — | "no torque-free + supported + closed config" is a balance statement across the searched families (corrected 2026-07-15, review R1; formerly stated "airtight" without scope). Time-varying internal cadence $\omega(t)$ and non-rigid deformation are named residual freedoms in `spindle-braid.md` and are NOT covered by this negative. |
| §85 global-drain sea: $L_z$ export $\approx0$; saturable $\sim5\times$ short; needs $\sim390\times$ sea damping | drain magnitudes + damping estimate | **T2** | **QUARANTINED** | magnitudes from evaluator; dynamical-sea absorption is T3 |
| §86 axis flutter $\mathrm{Re}\,\lambda=0.199$ (genuine circulatory; rigid-fix family closed) | legacy one-number stability claim; replacement V5 phase-collapse campaign | **T2 → NOT WELL-POSED AS STATED** | **LEGACY CLAIM RETIRED; REPLACEMENT COLLAPSE CAMPAIGN OPEN** | The object-level $0.199$ claim declares neither a retained prehistory nor a basin and is no longer a quarantined number awaiting a more precise rerun. The binary $t=65=6.5h$ negative establishes the method but not the V5 outcome. Apply the [superseding collapse design](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md#superseding-design--2026-07-14-multi-seed-collapse): V5 phase collapse can produce a basin-specific common curve; V5 non-collapse leaves seed-indexed conditional curves. The [campaign preflight](../braid-ideal/evidence/section-86-v5-collapse-campaign-preflight-2026-07-14.md) admits endpoint-matched circular, radial-breath, and tilt-modulated histories, but no seed has reached clearance, so the replacement row remains open. The campaign is paused at the preserved first failed endpoint; resume from the [middle self-root adjudication handoff](../braid-ideal/section-86-self-root-adjudication-handoff.md) rather than relaunching the native replay. Synchronized-time shrinkage alone does not pass the gate. |
| §87 wake-Ward / balanced-cell (pump $+0.424$ bound; superluminal caustic) | action/force bookkeeping | **T1/T2** | **QUARANTINED (T2 part)** | already BARRED held-to-proof; caustic is evaluator geometry |
| §88 dressed electron: pump cancels; flutter damps-not-dissolves | pump cancel / stability | **T1** + **T2** | **QUARANTINED (flutter)** | pump-cancel is force-balance (T1); flutter verdict T2 |
| §89 Lagrange-dressed: L-points unstable; enters $G$ but aggravates flutter | L-point balance / stability | **T1** + **T2** | **QUARANTINED (flutter)** | L-point locations are force-balance; instability/aggravation T2 |
| §90 nonlinear saturation ($l_1=+0.041$; grows past 1 rad by $t\approx51$) | temporal amplitude growth | **T3** | **QUARANTINED — DOWNSTREAM OF §86 COLLAPSE** | The Stuart-Landau extrapolation is non-authoritative. A seed-independent saturation claim exists only if the Section 86 prehistories first collapse; otherwise this row is not well-posed as stated. |
| §91 Kapitza: flutter not stiffness-stabilizable (circulatory) | linear-stability character | **T2** | **QUARANTINED** | re-anchor; confirm circulatory character on real integrator |
| §92/§93 contra-pair: **pump closes** ($\Delta z=1.42$) | force-balance (pump cancel) | **T1** | — | first native self-sinking; force-balance fact |
| §92/§93 contra-pair: saddle + $\mathrm{Re}\,\lambda=+5.30$ divergence | linear stability | **T2** | **QUARANTINED** | used as an anchored control in §99 (to 1e-9) → provisional; confirm dynamically. **[Review R5a, 2026-07-15: the §99 reproduction is implementation parity, not an anchor to a hand-checkable case; it does not satisfy T2 rule (a) and should not count as anchor evidence.]** |
| §92/§93 contra-pair: does **not lock** | dynamical settling | **T3** | **QUARANTINED** | "locking" is a temporal outcome |
| §94 no radiative settling | dynamical shedding | **T3** | **QUARANTINED** | radiative settling is a time-evolution claim |
| §95 dressed pair: payload has **no equilibrium** | force-balance (no equilibrium) | **T1** | — | "no force-balanced payload point" is a balance fact |
| §96 moving stacked-rings: Mach verified; **doesn't bind**; pump $+13.4$; flutter | bind/pump (T1) + linear stability about a non-equilibrium | **T1** + **T2 → VOID** | **T2 RETIRED 2026-07-14 — not re-runnable** | The Mach geometry, $\epsilon_{\rm bind}=0.0492298548241>0.03$, pump, and non-bind verdict survive as T1 diagnostics. Because the target fails force balance, its pencil omits a nonzero constant residual and has no stability referent. Evidence: [Section 96 retirement](../braid-ideal/evidence/section-96-flutter-force-balance-retirement-2026-07-14.md). |
| §97/§98 isolated-triple: **no bind, flutter-free** found | non-bind (force-balance) | **T1** | — | the binding negative survives |
| §97/§98 flutter magnitudes (pencil ~3× off validated) | linear stability about a **non-equilibrium** | **T2 → VOID** | **RETIRED 2026-07-14 — not re-runnable, removed from the worklist** | Adjudicated void rather than quarantined. T2 validity requires the pencil to linearize about an actually force-balanced configuration; every §97/§98 point fails that by its own recorded $\epsilon_{\rm bind}$ (the evolved finalist $0.1185$ against the $0.03$ gate; Part 2 point $852$ received a growth rate at $\epsilon_{\rm bind}=0.999999995$). They linearized about a circle the object does not follow, so the linearization carries a dominant constant term and the pencil has no referent — at any anchoring, magnitude, or sign. **Retiring it costs nothing:** the load-bearing §97/§98 result is the T1 non-bind negative, which never used the pencil, and flutter-freeness is moot where nothing binds. The direct-evolution attempt is not wasted — the §97 finalist departed its circle within $0.04$ of a period under the master equation, an independent evolved confirmation of the T1 negative. The `numeric_precision_limit_exhausted` wall it hit is a separate engine question, now the program's critical path: [root-completeness wall diagnostic](eom-root-completeness-wall-diagnostic-dispatch-packet.md). Evidence: [§97/§98 direct-evolution horizon blocker](../braid-ideal/evidence/section-97-98-direct-evolution-horizon-blocker-2026-07-14.md); [adjudication](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md) |
| §99 planar assembly: **doesn't bind** ($\epsilon_{\rm bind}\approx1.0$); pump-cancel; charge; no force-balanced rest-photon candidate in declared coverage | force-balance + charge | **T1** | — | non-bind, pump-cancel, charge, and cross-speed force-balance rows are evaluator-valid; the rest-photon statement is coverage-limited. **2026-07-15 model audit: NON-CANONICAL PHOTON MODEL.** Half the photon rows used $(3,2,3)$ occupancy (charged 8-architrino braids, not the canonical 6-architrino 3+/3− braid); within-braid phasing hard-coded; rigid contra-rotation only; geometry frozen across speeds (no flattening toward planar at $u\to c_f$); 12-of-~1,024 factor sampling. This T1 negative binds the screened family only, **not** the canonical 12-worldline photon. Successor search: [canonical-photon dispatch packet](../braid-ideal/canonical-photon-search-dispatch-packet.md); audit banner in [§99 spec](../braid-ideal/planar-assembled-free-particle-spec.md). |
| §99 flutter/lock (pencil implementation anchored to $10^{-9}$) | linear stability and local locking about non-equilibria | **T2 → VOID** | **RETIRED 2026-07-14 — not re-runnable** | The anchor validates the pencil implementation, not the target. Photon $\epsilon_{\rm bind}=0.9922225625$ and electron-rest $\epsilon_{\rm bind}=0.9999927135$ fail the $0.03$ precondition, so the target spectra and saddle readings have no stability referent. Evidence: [Section 99 retirement](../braid-ideal/evidence/section-99-stability-force-balance-retirement-2026-07-14.md). |
| §49–58 sea family: V3/V5 equilibria; self-equilibrated V5 | force-balance equilibria (balance points only; **pin retired**) | **T1** | — | equilibria survive as balance facts about the balance points (corrected 2026-07-15, review R3). The speed pin's own condition ($\varrho>1$) was measured false on 2026-07-14 by two independent routes (one closed-form, regulator-free): the pin as attractor, "speed pin = size pin," and the rail-residence conditional structure are retired. See `spindle-braid.md`; the corpus-side reconciliation is tracked as [corpus-week-audit H1](corpus-week-audit-2026-07-15.md). |
| §57 stability matrix; §59 tilt-block restoring | linear stability | **T2** | **QUARANTINED** | re-anchor |
| §60 Row7: first bare radial closure (support 1/1/1); $\kappa_{\rm eq}$ gauge-invariant | force-balance closure | **T1** | — | closure/support are balance facts |
| §60 Row7: $+0.227$ rail pump un-absorbed → **coherent expansion** | temporal expansion | **T3** | **QUARANTINED** | "coherent expansion on release" is time-evolution |
| §62 Row8: d0-from-survival rejected (over-absorb 2–24×, **dt-fragile**) | integration-sensitive | **T3** | **QUARANTINED** | "dt-fragile" is an integrator artifact |
| §49–58 Rows 2–6 rejections (tangential dispersal, lag collapse, cap capture, polar credit) | force-balance budgets | **T1** | — | rejection reasons are force/credit-balance; "dispersal" phrasing is diagnostic, not an evolved run |
| Collinear breather obstruction (far-side KE floor, anti-damping trap) | trajectory return | **T3** | **QUARANTINED** | breather return is a temporal evolution |
| Native confirmation run (candidate rejected: shape loss on release) | temporal shape evolution | **T3** | **QUARANTINED** | release/shape-loss is dynamical |
| Native axial-drift: $\xi(u)/\xi(0)=1/\gamma$ ruler; frozen-cage ruled out | kinematic / multipole balance | **T1** | — | kinematic ruler + multipole argument |
| Native axial-drift: reorienting-dipole sub-critical/gain-reachable | linear stability | **T2** | **QUARANTINED** | re-anchor |
| Tangential-sea no-go; S1/S2 nested-hinge closed; iso-frequency refuted | force-balance / representability | **T1** | — | balance + representability facts |
| Collider-anomaly triage (LEP $A_{FB}^b$, etc.) | PDG data fit | **T1 (non-solver)** | — | independent of the solver; not affected |

---

## Re-run object geometry (quarantined items)

Object for each quarantined (re-run) row, for planning. **Five geometry classes** — resolving a class cascades to its members. Geometry *type* is cross-checked; exact per-site counts/charges come from each item's own fixture. ("Dressed" = bare braid + payload; "bare" = no payload. V5 = the 6-architrino self-equilibrated tilted spindle.)

| Item | Braids | Axis | Payload | Group vel. | Sea | Class |
|---|---|---|---|---|---|---|
| §57 / §59 | 1 (V5) | tilted | none | rest | static cage (sea-family rows) | A |
| §60 (Row 7) | 1 (bare V5) | tilted | none | rest → released | — | A |
| §62 (Row 8) | 1 (V5) | tilted | none | rest | $\rho_c$ absorption cell | C |
| §83 | 1 (bare V5) | tilted | none | rest → released force-free | — | A |
| §85 (= §71–76 arc) | 1 (V5) | tilted / oblique | none | moving $u{\approx}0.2$ | co-orbital cage | C |
| §86 | 1 (V5) | tilted | none | rest | — | A |
| §87 | 2 (balanced pro/anti cell) + wake | tilted | none | rest | transport cell | C |
| §88 | 1 dressed (~12) | tilted | 6-electrino spinless column, −1e | rest | — | B |
| §89 | 1 dressed (~12) | tilted | co-rotating Lagrange electrinos, −1e | rest | — | B |
| §90 | 1 (V5) | tilted | none | rest | — | A |
| §91 | 1 (V5) | tilted | none | rest | — | A |
| §92 / §93 | 2 (contra-rotating pair) | planar | none (neutral) | rest | — | D |
| §94 | 1 (V5) | tilted | none | rest | — | A |
| Collinear breather | 2 (head-on) | collinear (1-D) | none | moving (approaching) | — | H |
| Native confirmation run | 1 (bare V5) | tilted | none | rest → released | — | A |
| Native axial-drift (reorienting-dipole) | 1 (V5) | tilted | none | moving (drift $u$) | reorienting co-drift dipole | C |

**Classes.** **A** — bare tilted V5 at rest (flutter/release/stability: §57, §59, §60, §83, §86, §90, §91, §94, native confirmation); **B** — dressed tilted V5 + payload (§88, §89); **C** — braid + sea, moving/oblique (§85, §62, §87, axial-drift); **D** — contra-rotating pair, planar (§92/§93 rest); **H** — collinear head-on (breather). The former Class-E stability rows (§96–§98) and the Section 99 target spectrum are retired as non-equilibrium pencils, so they no longer appear in this quarantined-object table. Class A is the largest and is being tested first by the Section 86 collapse campaign.

### On the unnumbered entries

The tail rows lacking a `§` are not omissions — the ledger spans **three numbering schemes plus named threads**:
- **braid-search arc** §82–§99 (single §, the flutter/pair/assembly work);
- **sea / tangential-screen arc** §68–§76 — "Tangential-sea no-go" is **§70**, "S1/S2 nested-hinge closed" is **§68(a)**, and the "§85 global-drain sea" row is shorthand for the **§71–76** coupled-braid+sea complex;
- **Row scheme** §49–§62 (the V3/V5 support/sea-family rows);
- **named memory threads** with no single § — *collinear breather obstruction*, *native confirmation run*, *native axial-drift envelope*, *collider-anomaly triage*, and the foundational T1 rows (geometry anchors, charge ledgers). Real items; key them by name.

---

## Summary

- **T1 SURVIVES:** the geometry/force-balance spine — cancellations, equilibria, anchors ($\kappa_{\rm eq}$, $R_M$), charge ledgers, and all the **non-bind / no-free-particle / no-equilibrium negatives** (§84, §95, §96, §97/§98, §99). Each negative is scoped to its searched family (review R1): the pivot holds as *no searched family binds*, with $\omega(t)$, non-rigid deformation, and the canonical-photon DOF open. The frontier pivot to the constitutive sea rests here and holds at that scope.
- **T2 RE-ANCHOR (quarantined):** the remaining well-posed flutter/stability rows (§57, §59, §86, §88, §89, §91, §92/§93, reorienting-dipole). Section 86 is pivotal and now uses the collapse method. Sections 96, 97/98, and 99 are retired as void because their pencils linearized about non-equilibria.
- **T3 RE-DERIVE (quarantined):** every temporal claim (§83 dispersal, §90 growth, §92/§93 non-lock, §94 no-settling, §60 coherent expansion, §62 dt-fragility, collinear breather, native confirmation shape-loss).

## Re-run worklist for the validated integrator (in order)

### EOM capability gate for this ledger

The million-path scale profile is a long-term EOM goal, not a prerequisite for
this ledger. The quarantined objects are bounded populations: pairs, triples,
the six-worldline V5, and dressed or payload-bearing objects in the low tens of
worldlines. Their difficulty is long certified evolution through complete self/partner root
families and fold events, not population scale.

The immediate EOM capability gate is closed. The evolved-history root defect was
repaired, native-to-independent-oracle parity is $72/72$, the token-dominance
gate reduced accepted step cost $88.39\times$, and the accepted Section 86 step
grew to $5\times10^{-4}$. Optimization is closed unless a new profile supplies
a measured target. GPU, multi-GPU, distributed history, and the million-path
acceptance profile remain future work; none currently blocks this
bounded-population ledger.

1. **Section 86 multi-seed collapse campaign.** The antipodal-binary prerequisite
   returned: its seed spread remains $38.1\%$ at $t=65=6.5h$, and its common-radius
   phase spread grows. Run the V5 directly as the prehistory-independence test
   under the [superseding design](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md#superseding-design--2026-07-14-multi-seed-collapse).
   The [preflight](../braid-ideal/evidence/section-86-v5-collapse-campaign-preflight-2026-07-14.md)
   now supplies a certified endpoint-matched inner/outer seed basin and its
   refinement rung. The circular seed is paused at the preserved first failed
   endpoint; complete the [middle self-root adjudication handoff](../braid-ideal/section-86-self-root-adjudication-handoff.md)
   before resuming the post-clearance evolution.
   A one-seed rate and synchronized-time shrinkage are not verdicts; phase-curve
   collapse lifts the row, while persistent separation reclassifies it as not
   well-posed.
2. **T3 dynamical set.** Section 83 release, Section 90 saturation,
   Sections 92/93 locking, Section 94 settling, and Section 60 expansion are
   multi-seed collapse tests: matched full-precision initial state, at least
   three materially different prehistories, evolution past $h$, and a numerical
   refinement control. Collapse lifts a seed-independent curve; non-collapse
   reclassifies the row as not well-posed; an unaffordable horizon is reported
   with wall-time arithmetic.

Nothing re-enters "dynamical" or "stable/unstable" status without passing the new integrator's independent oracle (O1–O6).

---

## Independent review of this ledger — 2026-07-15 (operator-requested)

Reviewed against the [solver audit](central-solver-independent-audit-2026-07-12.md), the §96/§99 retirement evidence, the 2026-07-14 antipodal-binary results, and direct corpus reads. Verdict first: **the tier logic is sound, and this document has already caught and corrected its own two largest errors** (the insufficient T3 remedy, corrected by the collapse-test protocol; the §96–§99 pencils, corrected from "quarantined" to "void"). The braid search should **not** restart. Five defects remain; the most serious runs in the opposite direction from over-trusting old results — it rhetorically closes live search directions.

**R1 — T1 negatives are family-scoped; the ledger's strategic language over-generalizes them (defect, verified by example).** Every non-bind/no-torque-null negative is a kernel-valid statement about the *searched family*, not about all bare assemblies. The ledger itself proved this failure mode once: the §99 "doesn't bind" row was found on 2026-07-15 to bind only a non-canonical screened family, and the canonical photon search reopened. The same exposure exists elsewhere: row "§83/§84 … **no bare braid is a free particle** (airtight)" drops the scope the corpus itself carries — §84 is established for *steady per-layer cadences*, with time-varying internal cadence $\omega(t)$ and non-rigid deformation named residual freedoms in `spindle-braid.md`. The Summary's pivot line ("no bare braid … binds → constitutive sea is the lever") should read: *no member of the searched families binds; named residual freedoms and the canonical-photon DOF remain open bare-assembly directions alongside the sea program.* Without this correction, agents will prune live geometry.

**R2 — The T1 foundation is under-cited, in violation of this ledger's own step 7 (grading defect; conclusion survives on better evidence than cited).** "The kernel is validated (unit tests pass)" is self-agreement language; the audit itself says golden fixtures are self-referential. The kernel's *actual* independent anchors, which the ledger should name: hand-set root-geometry test cases; the outward-rounded interval-arithmetic certification of the planar tangential screen; the 2026-07-14 antipodal-binary closed-form spiral law (regulator-free, force formula verified); and the EOM native-to-independent-oracle parity 72/72. Recommended cheap hardening: re-verify the handful of load-bearing T1 numbers ($\kappa_{\rm eq}=0.28623$, $R_M^{\rm eq}=3.4937$, the recorded $\epsilon_{\rm bind}$ values, $+0.424$, $+0.227$, $\Delta z=1.42$) on the EOM engine against its independent oracle, converting T1 from "kernel trusted" to "cross-verified per number."

**R3 — Staleness against 2026-07-14: the speed-pin retirement is not reflected (defect, verified).** Row "§49–58 … self-equilibrated V5 (**speed pin = size pin**)" still stands as T1, but the pin's own condition ($\varrho>1$) was measured false by two independent routes on 2026-07-14 — one of them closed-form. The V5 balance *point* survives as a force-balance fact; the *attractor* (pin) does not, and the "self-equilibrated" conditional structure (restoring size feedback via rail residence) falls with it. Downstream, the §82 $+0.424$ pump remains a valid instantaneous booking on the prescribed circle, but its strategic framing ("the pump that must be absorbed") presumes rail residence the pin no longer guarantees. The corpus carries the mirror contradiction (`spindle-braid.md` retires the pin and still uses it — see the [corpus week audit H1](corpus-week-audit-2026-07-15.md)).

**R4 — The force-balance precondition that voided §96–§99 is not documented against the surviving T2 rows (warning).** §57, §59, §88, §89, §91, and §92/§93 remain "QUARANTINED — re-anchor" with no recorded check that each pencil's configuration passes a stated sector-wise balance gate. V5's tangential ledger carries the open $+0.227$ middle pump; the §86 dispatch packet contains no force-balance precondition discussion (grep-verified). The §86 row is protected anyway — its replacement is a direct-evolution collapse campaign, which needs no equilibrium referent — but the other T2 rows should each record their balance residual against a declared gate *before* re-anchor effort is spent, or some will be re-run only to be voided the way §96–§99 were.

**R5 — Two smaller grading defects (notes).** (a) The §92/§93 saddle row cites "used as an anchored control in §99 (to 1e-9) → provisional": that is implementation parity — reproduction by the same code family — not an anchor to a hand-checkable case, and should not count as anchor evidence under this ledger's own T2 rule (a). (b) T1 rows whose configurations include same-source roots computed on prescribed circular prehistory are facts about the prescribed family; where active roots reach the seeded interval, the row should say so (the protocol's step-3 logic, applied to T1 bookings — affects §82 and hinge bookings).

**Disposition.** No tier assignment reviewed here needs to flip. R1 and R3 need text corrections in this ledger and are blocking for search-direction decisions; R2's cross-verification and R4's per-row gate checks are cheap insurance; R5 is bookkeeping. Claim level: R1/R3 verified by direct read of the cited lines and evidence files; R2/R4 verified for the citation gaps, recommended remedies are judgment; nothing here is a new physics result.

### R2 execution status — 2026-07-15 (fail-closed: NOT-VERIFIABLE, missing measurement path)

The cross-verification pass was dispatched and returned BLOCKED: all eight T1 numbers are `NOT-VERIFIABLE` against the existing unmodified oracle, which checks roots, accelerations, and evolution but emits none of the requested composite observables (fitted coupling, binding residuals, averaged torque, optimized separation/phase, cancellation fractions). Per-number table and reproduction commands: [t1-cross-verification-2026-07-15.md](evidence/t1-cross-verification-2026-07-15.md). Measured baseline from the run: EOM rebuilt after latest source change; native/oracle suites 44/44; independent evolved-history replay 72/72; strict content validation clean.

**What this sharpens.** The T1 numbers are not kernel outputs; they are composite *reductions* (averages, residual norms, optimization fixed points) computed by the braid-ideal scripts on top of the oracle-checked kernel. T1 trust therefore decomposes as: kernel — independently verified; reduction layer — never independently checked. This is an absence of verification, not evidence of error: no numerical disagreement was found, so the review's don't-restart verdict stands with this caveat now explicit.

**Decoupling decision (2026-07-15).** The R1/R3 text corrections were barred by the dispatch's fail-closed rule, which was designed for a numerical FAIL. A NOT-VERIFIABLE outcome does not touch R1/R3's evidentiary basis (R3 rests on the closed-form antipodal routes; R1 is scope logic), and leaving the over-broad language standing for the duration of the reduction-layer build is the live risk R1 names. R1/R3 are therefore applied as of this date; the affected rows carry `(corrected 2026-07-15)` notes.

**New closure target — independent T1 reduction layer.** Author the missing fixture/reduction layer *separately from the braid-ideal scripts* (independent authorship is the point; porting the existing reductions would restore self-agreement), then rerun the fail-closed cross-verification. Risk-ranked order: (1) trivial arithmetic — charge ledgers and the §14 cancellation fraction are hand-checkable or a ~20-line independent script; (2) thin reductions — the $\epsilon_{\rm bind}$ residual norms over kernel outputs on fixed configurations; (3) averaged bookings — $+0.424$, $+0.227$, $\Delta z=1.42$ (cycle/secular averages); (4) optimization fixed points — $\kappa_{\rm eq}$, $R_M^{\rm eq}$ (thickest reduction: fixed-point solve plus gauge argument; highest risk and highest value). Until tier (4) passes, treat $\kappa_{\rm eq}$/$R_M^{\rm eq}$-anchored downstream work (mass-map anchoring) as resting on a single-instrument reduction.

### Tier-1 execution and adjudication — 2026-07-15

**Tier-1 run (blind-authorship layer, `scripts/eom-verification/`):** charge ledgers PASS exactly (neutral binary; six-negative-site payload $-6\epsilon=-1e$; §96 flat control) — **the first genuinely cross-verified T1 rows.** The §14 comparison returned FAIL ($0.4290091236$ vs recorded $0.97$, $108\times$ the declared tolerance) and the protocol correctly stopped the tier sequence. Evidence: [t1-reduction-layer-cross-verification-2026-07-15.md](evidence/t1-reduction-layer-cross-verification-2026-07-15.md).

**Adjudication of the §14 FAIL: DEFINITION MISMATCH, not a numerical disagreement (verified against the owning record).** The recorded $0.97$ belongs to [fold-crossing-chart-spec §14](../braid-ideal/fold-crossing-chart-spec.md): the cross-hit relay from a *nested neutral inner binary* onto the middle receiver, computed as a *period-integrated causal root-sum* with a stated convergence ladder; its arithmetic reproduces as $1-0.224/7.42=0.970$. The independent layer computed a T=0 six-pair internal tangential ratio on the *single-shell* braid — a well-executed measurement of a **different observable in a different configuration**, one where §8 says the cross-hit channel does not exist (single common frequency → zero cross-hit clicks). Chain of custody for the error: this ledger's §14 row carried a double provenance mislabel (now corrected, R5c); the dispatch prompt propagated it and supplied the T=0 formula inline, violating its own owning-record rule; the blind agent faithfully measured what it was told. The independent $0.4290$ (complement $0.5710$) is retained as a *diagnostic of an unrecorded observable* — it carries no claim and contradicts none.

**Disposition:** Tier 1 remains OPEN, not failed: the §14 row must be rerun under the owning §14 definition (nested inner-binary cross-hit causal root-sum, reception-window integration, $N_T$ convergence ladder, ratio = surviving net over magnitude sum), with the definition quoted from the spec section verbatim in the rerun instruction. The blind-authorship requirement continues to hold; the corrected definition comes from the spec, not from `cross-hit-causal-absorption.mjs`. Tiers 2–4 remain barred until Tier 1 closes. Lesson recorded at protocol level: **the owning definition is part of the fixture** — extract it with the same citation discipline as the configuration constants, and never restate it in a dispatch prompt.

- **2026-07-15 — Tier 1 FAIL:** exact charge ledgers passed, but the independent $T=0$ §14 reduction measured the operator-defined cancellation fraction $r=|\sum f|/\sum|f|=42.9009\%$ versus the recorded approximately $97\%$ ($\Delta=0.540991>0.005$); stopped before Tier 2 ([evidence](evidence/t1-reduction-layer-cross-verification-2026-07-15.md)).
- **2026-07-15 — Tier 1 owning §14 rerun NOT-VERIFIABLE; OPEN:** the clean analytic interval certificate owns causal-root isolation and complete-complement certification; the unmodified EOM acceleration interface checks only branch geometry, normal-bound consistency, and acceleration for the externally supplied brackets, not the causal residual or root completeness. On that explicit proof boundary, the full-window nested-inner-binary reduction produced $C=0.9591480\to0.9704224\to0.9468196$ under $N_T=2000\to4000\to8000$ and did not settle: the final certified-interval movement $0.0236027$ exceeds the predeclared $0.00134771$ scale and increases over the preceding $0.0112744$ movement. The fixed $0.005$ target tolerance was not widened; Tiers 2–4 remain barred ([evidence](evidence/t1-reduction-layer-cross-verification-2026-07-15.md)).
- **2026-07-15 — Tier 1 corrected §14 start NOT-VERIFIABLE before first pair; OPEN:** after the first corrected-run hashes were independently confirmed, the $N_T=2000$ rung stopped at reception step zero because outward interval widening had been incorrectly applied to the exact-zero height/tilt metadata check. It produced no pair contribution or ladder value and did not start later rungs. A token-level exact-zero repair plus positive-zero and negative-nonzero self-checks is now predeclared; a new independent hash confirmation is required before execution. The prior three-number ladder remains a non-accepted diagnostic because its root certificate failed the later proof-boundary audit. Tiers 2–4 remain barred ([evidence](evidence/t1-reduction-layer-cross-verification-2026-07-15.md)).
- **2026-07-15 — Tier 1 V2-authorized corrected §14 execution NOT-VERIFIABLE; OPEN:** the repaired exact-zero metadata controls and interface-boundary self-check passed, but the official $N_T=2000$ rung failed closed when the clean complete-root certificate reported `analytic_interval_exhausted`. The raw reporter labeled the failure step 1901, the first step of its active heartbeat chunk; its inclusive pair counter derives the actual location as 1-based sample 1957, pair slot 3 (`r1 <- s0`). It produced no cancellation value or target comparison; the predeclared stop rule barred the $N_T=4000$ and $N_T=8000$ rungs. This is a certificate reach limit, not evidence for or against $C=0.97$. Tiers 2–4 remain barred ([evidence](evidence/t1-reduction-layer-cross-verification-2026-07-15.md)).
- **2026-07-15 — §14 disposition sharpened; wall witness registered; re-sequencing question posed (operator-thread review):** three readings booked together. (1) **The §14 physics verdict is robust to everything observed:** the spec's load-bearing conclusion (cross-hit relay insufficient — needs $33\%$ of the pump, delivers $\approx1$–$6\%$, ejective) survives the entire non-accepted diagnostic ladder range $C\in[0.9468,0.9704]$; no braid-search decision flips on the $0.97$'s third digit. (2) **The legacy $0.97$'s precision claim is now actively in question, not merely unverified:** the certified route's ladder moved *more* under refinement while the legacy fixed-128-subdivision scan reported smooth convergence — consistent with fold-adjacent root misses in the legacy scan (audit P2-1) or over-conservatism in the certified intervals; undecided. The row's grade sharpens to *single-instrument, convergence-in-question, verdict-robust*. (3) **The sample-1957 exhaustion is the program's named critical path in miniature** — registered as a minimal frozen witness in the [root-completeness wall packet](eom-root-completeness-wall-diagnostic-dispatch-packet.md), where it is far cheaper to probe than the evolved-history §86/§97 instances. Operator decision (2026-07-15, ratified): **re-sequenced.** §14 is reclassified BLOCKED-ON-CAPABILITY, owned by the [root-completeness wall packet](eom-root-completeness-wall-diagnostic-dispatch-packet.md) via the registered witness; it rejoins the cross-verification queue when the certificate extension lands. Tiers 2–4 proceed now under the standing blind-authorship protocol with per-tier fail-closed gates. Tier 1 closes for its charge rows (cross-verified); its §14 row stays open under the sharpened grade *single-instrument, convergence-in-question, verdict-robust*.
