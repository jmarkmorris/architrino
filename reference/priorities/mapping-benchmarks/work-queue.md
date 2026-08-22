# Mapping Benchmarks Work Queue

This is the canonical execution ledger for accepted benchmark mappings. Each row maps inherited equations or observations as recovery targets, never as architrino-level premises.

## Ranked Next Objects

1. `redshift_clock_transport` — Status: `Queued`.
2. `lorentz_preferred_frame` — Status: `Deferred / blocked`.
3. `rotating_moving_media` — Status: `Deferred / blocked`.
4. `weak_field_metric_ppn` — Status: `Deferred / blocked`.
5. `radiation_gravity_waves` — Status: `Deferred / blocked`.
6. `thermal_statistical_radiative_qed` — Status: `Deferred / blocked`.
7. `quantum_phase_measure` — Status: `Deferred / blocked`.
8. `spin_bell_measurement` — Status: `Deferred / blocked`.
9. `topological_transport_statistical_emergence` — Status: `Deferred / blocked`.
10. `collider_reconstruction_provenance` — Status: `Deferred / blocked`.

## Queued

- **XTM-001 — `redshift_clock_transport`.** Map redshift observations into explicit clock-rate, transport, and Noether sea evolution gates. **Native carrier requirement:** a declared clock-rate comparison, source/path/receiver transfer record, and Noether sea evolution record on one benchmark support. **Completion:** one benchmark packet names source data, native carrier, acceptance residual, and failure predicate.

## Deferred / blocked

- **XTM-002 — `lorentz_preferred_frame`.** Test preferred-frame leakage and two-way synchronization on one accepted moving branch. **Native carrier requirement:** a retained moving branch, clock/ruler export, and independently specified drift/leakage instrument.
- **XTM-003 — `rotating_moving_media`.** Separate rotation, moving-media response, effective drag language, and Noether sea transport in Sagnac/Fizeau cases. **Native carrier requirement:** a retained rotating or moving-medium record plus path-history phase and transport projections. It shares observer-speed and leakage conventions with XTM-002 but does not wait for XTM-002's benchmark result.
- **XTM-004 — `weak_field_metric_ppn`.** Require one effective-metric response object across weak-field benchmarks. **Native carrier requirement:** one accepted Noether sea constitutive record and effective-metric projection shared across clock, path, lensing, and orbital rows. XTM-001 may consume the same carrier but is not its proof prerequisite.
- **XTM-005 — `radiation_gravity_waves`.** Use compact-binary radiation and wave propagation as event-ledger/effective-metric stress tests. **Native carrier requirement:** one source/remnant event ledger, radiation carrier, effective-metric tensor channel, and detector-strain projection. It may share the XTM-004 metric carrier without depending on completion of the weak-field benchmark family.
- **XTM-006 — `thermal_statistical_radiative_qed`.** Discipline statistical emergence, radiation Gate C, and regularization with thermal/radiative benchmarks. **Native carrier requirement:** a finite-window statistical carrier, photon/radiation event ledger, regularized wake/material boundary, and Noether sea thermal record. It has no XTM-005 scheduling dependency.
- **XTM-007 — `quantum_phase_measure`.** Test path-history phase and basin-measure maps with interference, gauge-phase, and oscillation cases. **Native carrier requirement:** a retained path-history phase operator, channel-specific transport record, basin measure, and detector-response kernel. It has no XTM-006 scheduling dependency.
- **XTM-008 — `spin_bell_measurement`.** Apply Malus, Stern-Gerlach, and Bell hard gates only after derived kernels and pair provenance exist. **Native carrier requirement:** a retained ordered-frame or spin-response kernel, pair-provenance record, and detector basin measure. It may consume an accepted XTM-007 phase or measure carrier only where the same record is explicit.
- **XTM-009 — `topological_transport_statistical_emergence`.** Test robust invariants and micro-to-macro transport with quantum Hall and Brownian cases. **Native carrier requirement:** a retained topological-sector or transport carrier plus a finite-window statistical measure. It has no general XTM-007 dependency.
- **XTM-010 — `collider_reconstruction_provenance`.** Keep reconstructed objects and limits at observer/provenance level across collider benchmarks. **Native carrier requirement:** a source event ledger, detector reconstruction/provenance record, and the sector-specific native carriers used by the selected benchmark. It has no general XTM-007 or XTM-008 scheduling dependency.

For XTM-002 through XTM-010, completion requires one versioned benchmark packet with source, carrier, residual, and falsifier; narrative similarity is insufficient.

Queue order is an attention order, not a proof chain. A benchmark row may
depend on another row only when it consumes a named accepted carrier produced
there; sharing a convention, equation family, or nearby subject does not create
such a dependency.

## Awaiting verification

No rows.

## Verified

No rows.
