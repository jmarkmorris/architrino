# Strong-Field Closure work queue

## Ranked Next Objects

1. `observer_predictions` — [SF-002](#sf-002--observer-level-strong-field-predictions). Status: `In progress`.
2. `horizon_entropy_packet` — [SF-003](#sf-003--horizon-entropy-packet). Status: `In progress`.
3. `release_channel_selection` — [SF-004](#sf-004--release-channel-selection). Status: `Queued`.
4. `discriminating_observable` — [SF-005](#sf-005--discriminating-strong-field-observable). Status: `Queued`.
5. `high_energy_source_sink_taxonomy` — [SF-006](#sf-006--high-energy-sourcesink-taxonomy). Status: `Queued`.
6. `gw_public_waveform_packet` — [SF-007](#sf-007--public-gravitational-wave-benchmark-packet). Status: `Queued`.

## Queued

### SF-002 — Observer-level strong-field predictions

Derive an observer-level prediction set from the embedded boundary-condition formulation.

**Status note:** The [observer-level projection contract](observer-level-strong-field-projection-contract.md) now defines admission, observer records, horizon/scale/exterior/image/waveform outputs, component residuals, no-hidden-retune intersection, prediction states, and consumer gates. It is complete at priority-contract grade. The item remains open scientifically because the current state is `structural_only`; no accepted source-bound horizon-interface carrier produces a numerical observer row.

**First blocker:** `missing_accepted_black_hole_horizon_interface_carrier`.

**Depends on:** SF-001.

### SF-003 — Horizon entropy packet

Define the horizon-interface label ensemble and local block-entropy density from admissible $\Lambda_{\text{NS}}$ states; state entropy-area and Page-curve recovery targets, including tests of proposed horizon identifications.

**Status note:** The [terminal-enumerator contract](horizon-interface-label-entropy-enumerator-contract.md) defines the admitted quotient ensemble, extendable local block family, exact area-coefficient reduction, small-block independence requirement, Page comparison, and horizon-identification falsifiers. The derived contract is complete, but no accepted horizon-interface carrier supplies finite $\Lambda_{\mathrm{NS}}^H$ labels for terminal enumeration; the item remains open with verdict `blocked_missing_accepted_black_hole_horizon_interface_carrier`.

**Depends on:** SF-002.

### SF-004 — Release-channel selection

Separate jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes using one release ledger.

**Depends on:** SF-002, SF-003.

### SF-005 — Discriminating strong-field observable

Extract at least one observer-level observable that can differ from GR-like strong-field behavior.

**Depends on:** SF-004.

### SF-006 — High-energy source/sink taxonomy

Use the [High-Energy Astrophysics routing packet](high-energy-astrophysics/priorities.md) to classify horizon release, jets, mergers, diffuse release, catastrophic candidates, reabsorption, and return channels before using strong-field events as cosmology source terms.

**Depends on:** SF-004.

### SF-007 — Public gravitational-wave benchmark packet

Build the source-side and effective-metric portion of a versioned public gravitational-wave benchmark packet; route GWOSC/LVK detector comparison and equation residuals through Equation Mapping.

**Depends on:** SF-002, SF-004, and a shared event ledger.

## Deferred quantitative obligations

### SF-008 — Packed-core temperature endpoint residual

Keep observer-accessible temperature, stored configuration energy, and packed-core coarse-graining separate before any low-temperature or low-entropy interior claim.

**Depends on:** [temperature](../mapping-benchmarks/temperature.md), SF-001.

### SF-009 — Electromagnetic constitutive ceiling

Test whether finite radius, Noether sea effective permittivity/permeability, and maximum-curvature regularity support a bounded electromagnetic constitutive response.

**Depends on:** SF-001.

### SF-010 — Ingress conserved-ledger deposition

Route infalling conserved ledgers into horizon-interface, packed-core, Noether sea, defect, or release rows before any assimilation or information claim.

**Depends on:** SF-003, SF-004.

### SF-011 — Quasar-wind mechanical benchmark

Use high-power quasar winds as a mechanical-outflow benchmark for release-channel selection and galaxy-scale feedback.

**Depends on:** SF-004, SF-006.

### SF-012 — All-rail terminal-barrel theorem target

Prove and scope the conditional barrel lemma in [terminal-barrel-horizon-release-scope-decision.md](terminal-barrel-horizon-release-scope-decision.md): a common-cadence spindle with every layer on the $c_f$ rail has one cylindrical radius, while dynamical existence and retention remain separate.

**Depends on:** a retained terminal family and characteristic-tail wake/action rows. No new build is authorized.

### SF-013 — Horizon-interface alignment boundary target

Test the terminal-alignment residual on the same carrier as embedded boundary conditions, conserved-ledger deposition, entropy, release, and observer-recovery rows. Keep the horizon distinct from the photon sphere or light ring unless a declared branch derives coincidence.

**Depends on:** SF-001, SF-002, SF-003.

## Watchlist

### SF-015 — 4:2:1 hypothesis

Preserve `4:2:1` only as a hypothesis until an accepted reduced map, retained branch, or closed Planck-alignment calculation independently derives it and supplies a discriminating invariant consequence.

**Depends on:** SF-014. No implementation is authorized.

### SF-016 — Dark-sector photon-like release watch

Preserve dark-sector photon-like release as a release-channel hypothesis gated on a same-event conserved ledger, transport/conversion law, radiation Gate C, and a distinguishing observable.

**Depends on:** SF-004, SF-005, SF-006.

## Verified

No rows. Completed records are retained in [work-log.md](work-log.md) and focused packets.
