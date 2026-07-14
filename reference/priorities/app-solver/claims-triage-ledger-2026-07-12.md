# Claims-Triage Ledger — post-solver-audit (2026-07-12)

**Purpose.** After the [central-solver audit](central-solver-independent-audit-2026-07-12.md) found the solver is a delayed-force/root **evaluator over prescribed orbits with no coupled integrator**, every recorded conclusion must be sorted by *what the evaluator could actually compute*. This ledger is that sort, and it doubles as the **quarantine register**: nothing here is deleted; Tier-2/Tier-3 rows are flagged `QUARANTINED — pending re-derivation on the validated integrator`.

**Tiers.**
- **T1 SURVIVES** — instantaneous delayed-force facts and **force-balance** results (does the net force/torque vanish or not on a given configuration). The kernel is validated (unit tests pass); these stand regardless of any integrator. Force-balance **negatives** ("does not balance / does not bind / does not close") are the safest of all.
- **T2 RE-ANCHOR** — linear-stability (pencil / $\mathrm{Re}\,\lambda$) verdicts. Valid only if (a) the pencil is anchored to a hand-checkable case and (b) it linearizes about an actually force-balanced configuration. Confirm each anchor, then confirm with the real integrator that predicted linear growth manifests in a true evolution.
- **T3 RE-DERIVE** — any temporal/dynamical claim (release, dispersal, settling/locking over time, amplitude growth, long-term fate, super-$c_f$ evolution). These used ad-hoc Euler or normal-form extrapolation and must be re-run.

**Method note.** Built from the memory index (the distilled conclusion register). A deeper pass through `reference/priorities/**/brainstorming.md` + work-logs can add finer-grained rows; the tiering rules above apply unchanged. Where a single entry mixes types, the claim is split.

**Scope reassurance.** The geometry + force-balance spine (T1) is the bulk of the corpus and is intact. The strategic frontier conclusion — *no bare braid / isolated triple / planar assembly binds → constitutive sea is the lever* — rests on **T1 force-balance negatives** and survives. What gets re-adjudicated is the **stability + dynamics superstructure** (roughly the release/flutter/settling arc), selectively by type.

---

## Ledger

| Claim (section / memory) | Component | Tier | Quarantine | Reason / re-run note |
|---|---|---|---|---|
| §14 neutral braid ~97% cancellation | instantaneous force cancellation | **T1** | — | evaluator computes instantaneous force correctly |
| Geometry: octahedral/FCC, $\kappa_{\rm eq}=0.28623$, $R_M\approx3.49$, size anchors | force-balance geometry | **T1** | — | equilibria/anchors are force-balance facts |
| Charge ledgers (net $-1e$, neutral pairs) | explicit charge sums | **T1** | — | arithmetic over explicit sites |
| §82 radiation no-go (both channels bound; self-torque $+0.424$) | energy/force-interval bound at instants | **T1** | — | canonical $W^{\rm rec}$ energy bound; instantaneous seed |
| §83 native release **disperses** (halt $t\approx4.80$) | temporal evolution | **T3** | **QUARANTINED** | ad-hoc semi-implicit Euler + accel cap over prescribed prehistory (already flagged) |
| §83/§84 torque-null no-go; **no bare braid is a free particle** (airtight) | force/torque balance + closure impossibility | **T1** | — | "no torque-free + supported + closed config" is a balance statement |
| §85 global-drain sea: $L_z$ export $\approx0$; saturable $\sim5\times$ short; needs $\sim390\times$ sea damping | drain magnitudes + damping estimate | **T2** | **QUARANTINED** | magnitudes from evaluator; dynamical-sea absorption is T3 |
| §86 axis flutter $\mathrm{Re}\,\lambda=0.199$ (genuine circulatory; rigid-fix family closed) | linear stability (reference pencil) | **T2** | **QUARANTINED — DIRECT-EVOLUTION CAMPAIGN AT A FEASIBILITY WALL** | direction-neutral theorem gate, exact $v=c_f$ circular start, and first fold-crossing atomic publication pass at normal tolerances; adjudicated 2026-07-14 — the $6.25\times10^{-6}$-cycle horizon is linear in $t$ to $1.3\times10^{-3}$, so its $0.60113$ slope is the seed transient and carries no eigenvalue; separating $\lambda$ needs $t\gtrsim1/\lambda\approx5$ ($\gtrsim0.83$ cycles), i.e. $\sim10^{6}$ steps/cycle at the pinned-fold step size. Blocked on a cheap certified treatment of the self-fold at the $v=c_f$ speed pin; frequency continuation is barred (crosses a self-hit topology change). $0.199$ non-authoritative |
| §87 wake-Ward / balanced-cell (pump $+0.424$ bound; superluminal caustic) | action/force bookkeeping | **T1/T2** | **QUARANTINED (T2 part)** | already BARRED held-to-proof; caustic is evaluator geometry |
| §88 dressed electron: pump cancels; flutter damps-not-dissolves | pump cancel / stability | **T1** + **T2** | **QUARANTINED (flutter)** | pump-cancel is force-balance (T1); flutter verdict T2 |
| §89 Lagrange-dressed: L-points unstable; enters $G$ but aggravates flutter | L-point balance / stability | **T1** + **T2** | **QUARANTINED (flutter)** | L-point locations are force-balance; instability/aggravation T2 |
| §90 nonlinear saturation ($l_1=+0.041$; grows past 1 rad by $t\approx51$) | temporal amplitude growth | **T3** | **QUARANTINED — DOWNSTREAM OF §86 EVOLUTION** | Stuart-Landau normal-form extrapolation remains non-authoritative; exact V5 direct evolution now publishes its first fold-crossing steps, but the multi-cycle saturation ladder has not run and is blocked by the same pinned-fold feasibility wall. Saturation is claimed at $t\approx51$, i.e. $\approx8.5$ braid cycles — a longer horizon than §86 needs, so §90 cannot resolve before §86 |
| §91 Kapitza: flutter not stiffness-stabilizable (circulatory) | linear-stability character | **T2** | **QUARANTINED** | re-anchor; confirm circulatory character on real integrator |
| §92/§93 contra-pair: **pump closes** ($\Delta z=1.42$) | force-balance (pump cancel) | **T1** | — | first native self-sinking; force-balance fact |
| §92/§93 contra-pair: saddle + $\mathrm{Re}\,\lambda=+5.30$ divergence | linear stability | **T2** | **QUARANTINED** | used as an anchored control in §99 (to 1e-9) → provisional; confirm dynamically |
| §92/§93 contra-pair: does **not lock** | dynamical settling | **T3** | **QUARANTINED** | "locking" is a temporal outcome |
| §94 no radiative settling | dynamical shedding | **T3** | **QUARANTINED** | radiative settling is a time-evolution claim |
| §95 dressed pair: payload has **no equilibrium** | force-balance (no equilibrium) | **T1** | — | "no force-balanced payload point" is a balance fact |
| §96 moving stacked-rings: Mach verified; **doesn't bind**; pump $+13.4$; flutter | bind/pump (T1) + flutter (T2) | **T1** + **T2** | **QUARANTINED (flutter)** | non-bind + pump are force-balance; flutter T2 |
| §97/§98 isolated-triple: **no bind, flutter-free** found | non-bind (force-balance) | **T1** | — | the binding negative survives |
| §97/§98 flutter magnitudes (pencil ~3× off validated) | linear stability, **unanchored** | **T2** | **QUARANTINED (high priority) — DIRECT-EVOLUTION SIGN CAMPAIGN DISPATCHED** | explicitly unanchored (self-labeled non-corner-comparable; generalized $0.630731$ vs specialized $0.198857$ on the same spindle geometry). No pencil anchor exists — both sides are quarantined — so re-anchoring is superseded by direct evolution. Magnitudes are retired, not recovered: the load-bearing claim (no flutter-free triple across 1,105 points) is a **sign** claim. Scoped sub-$c_f$, where no self-fold opens and the §86 wall does not apply; supra-$c_f$ rows deferred behind the pinned-fold work. See the [dispatch packet](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md) |
| §99 planar assembly: **doesn't bind** ($\epsilon_{\rm bind}\approx1.0$); pump-cancel; charge; no rest photon | force-balance + charge | **T1** | — | non-bind, pump-cancel, charge, cross-speed force balance all evaluator-valid |
| §99 flutter/lock (pencil anchored to 1e-9) | linear stability, anchored | **T2** | **QUARANTINED (provisional-OK)** | anchor passed; still confirm growth manifests in a true evolution |
| §49–58 sea family: V3/V5 equilibria; self-equilibrated V5 (speed pin = size pin) | force-balance equilibria | **T1** | — | equilibria are balance facts |
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
| §96 | 1 (stacked rings) | flat / planar ($\alpha=0$) | none | moving (Mach drift $u$) | — | E |
| §97 / §98 | 1 (isolated triple, 3) | tilt continuum (flat↔tilted) | none | sub / field / **supra**-$c_f$ | — | E |
| §99 | 2 (contra-rotating pair) | planar ($\alpha=0$, no caps) | photon: none · electron: 6-electrino −1e | rest + boosted | labeled proxy ring | D |
| Collinear breather | 2 (head-on) | collinear (1-D) | none | moving (approaching) | — | H |
| Native confirmation run | 1 (bare V5) | tilted | none | rest → released | — | A |
| Native axial-drift (reorienting-dipole) | 1 (V5) | tilted | none | moving (drift $u$) | reorienting co-drift dipole | C |

**Classes.** **A** — bare tilted V5 at rest (flutter/release/stability: §57, §59, §60, §83, §86, §90, §91, §94, native confirmation); **B** — dressed tilted V5 + payload (§88, §89); **C** — braid + sea, moving/oblique (§85, §62, §87, axial-drift); **D** — contra-rotating pair, planar (§92/§93 rest; §99 rest+boosted +payload); **E** — moving single braid/triple (§96 flat-stack; §97/§98 triple, into supra-$c_f$); **H** — collinear head-on (breather). Class A is the largest and is being hardened first by the §86 run.

### On the unnumbered entries

The tail rows lacking a `§` are not omissions — the ledger spans **three numbering schemes plus named threads**:
- **braid-search arc** §82–§99 (single §, the flutter/pair/assembly work);
- **sea / tangential-screen arc** §68–§76 — "Tangential-sea no-go" is **§70**, "S1/S2 nested-hinge closed" is **§68(a)**, and the "§85 global-drain sea" row is shorthand for the **§71–76** coupled-braid+sea complex;
- **Row scheme** §49–§62 (the V3/V5 support/sea-family rows);
- **named memory threads** with no single § — *collinear breather obstruction*, *native confirmation run*, *native axial-drift envelope*, *collider-anomaly triage*, and the foundational T1 rows (geometry anchors, charge ledgers). Real items; key them by name.

---

## Summary

- **T1 SURVIVES:** the geometry/force-balance spine — cancellations, equilibria, anchors ($\kappa_{\rm eq}$, $R_M$), charge ledgers, and all the **non-bind / no-free-particle / no-equilibrium negatives** (§84, §95, §96, §97/§98, §99). The frontier pivot to the constitutive sea rests here and holds.
- **T2 RE-ANCHOR (quarantined):** every flutter/stability $\mathrm{Re}\,\lambda$ verdict (§57, §59, §86, §88, §89, §91, §92/§93, §96, §97/§98, §99, reorienting-dipole). Priority order: §97/§98 (known unanchored) worst; §99 (anchored) best; §86 (0.199 reference) pivotal.
- **T3 RE-DERIVE (quarantined):** every temporal claim (§83 dispersal, §90 growth, §92/§93 non-lock, §94 no-settling, §60 coherent expansion, §62 dt-fragility, collinear breather, native confirmation shape-loss).

## Re-run worklist for the validated integrator (in order)
1. **§86 flutter (0.199)** — the reference. The theorem anchor, exact V5 $v=c_f$ circular start, and first evolved middle self-fold atomic-publication certificate pass. Everything T2 hangs off this. **Now blocked at a feasibility wall, not a coverage gap:** the ladder cannot be extended to the required $t\gtrsim5$ at the pinned-fold step size, and the cost is the self-hit at the $v=c_f$ speed pin — which is §86's own content, so it cannot be tuned away by moving off the pin. The next accepted object is a cheap certified pinned-fold treatment (candidate: a local analytic model of the fold onset off the circular hinge $\delta_s=2s\sin(\delta_s/2)$), or a certificate that the step collapse is controller conservatism. See the [dispatch packet adjudication](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md).
2. **§97/§98 flutter magnitudes** — the known-bad one. **Runs now, in parallel with the §86 blocker**, and is no longer a re-anchoring task: no calibrated pencil corner exists, so the campaign is a direct-evolution **sign** test over the sub-$c_f$ region, targeting the smallest converged growth points. Magnitudes stay retired. See the [dispatch packet](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md).
3. **T3 dynamical set** — §83 release, §90 saturation, §92/§93 locking, §94 settling, §60 expansion — re-run as true evolutions.
4. **§99 assembly** — re-confirm the anchored pencil verdict under real evolution (force-balance non-bind already survives).

Nothing re-enters "dynamical" or "stable/unstable" status without passing the new integrator's independent oracle (O1–O6).
