# Standard Model Closure Work Queue

This is the canonical execution ledger for geometry-first Standard Model recovery work.

## Ranked Next Objects

1. `quark_mass_predictions` — Status: `Queued`.
2. `overlap_integrals` — Status: `Deferred / blocked`.
3. `confinement_energetics` — Status: `Deferred / blocked`.
4. `weak_sector_gauge_closure` — Status: `Deferred / blocked`.
5. `scalar_boson_acceptance` — Status: `Deferred / blocked`.
6. `nuclear_potential_derivation` — Status: `Deferred / blocked`.
7. `hydrogen_fermion_sea_boundary` — Status: `Deferred / blocked`.
8. `supersymmetry_internal_partner_comparison` — Status: `Deferred / blocked`.
9. `lattice_qcd_direct_assembly_comparison` — Status: `Deferred / blocked`.
10. `e8_redundancy_heuristic_audit` — Status: `Deferred / blocked`.
11. `quark_vortex_coupling_simulation` — Status: `Deferred / blocked`.
12. `geometric_phase_and_holonomy_exploration` — [SMC-012](#smc-012--geometric-phase-and-holonomy-exploration). Status: `Queued`.

## Queued

- **SMC-001 — `quark_mass_predictions`.** Extend quark geometry from catalog closure to first-pass mass predictions without fitting observed masses. **Completion:** one source-bound geometry produces a declared mass row and residual with no per-flavor retune.

### SMC-012 — Geometric phase and holonomy exploration

- **Status:** Queued
- **Priority object:** `geometric_phase_and_holonomy_exploration`
- **Request / acceptance:** Give the [geometric-phase exploration](geometric-phase-and-holonomy/brainstorming.md) an introductory session. Compare one pure change of phase convention with one closed transport cycle; identify the invariant comparison and connect it to the existing gauge and Aharonov-Bohm targets.
- **Evidence / blocker:** The learning outline and primary references are available. This operator-selected conceptual session can run independently of the blocked physical recovery tasks; it does not replace SMC-001 as the scientific local winner.
- **Completion:** One independently checked worked example explains the transport rule, geometric versus dynamical phase, permitted convention changes, and observable comparison, then names the missing native carrier without importing an effective field as substrate ontology. Record the result and next selected question; no gauge-recovery or score claim follows.

## Deferred / blocked

- **SMC-002 — `overlap_integrals`.** Derive CKM and PMNS overlap integrals from geometry. **Depends on:** SMC-001.
- **SMC-003 — `confinement_energetics`.** Derive confinement-scale behavior from topology or strain energetics. **Depends on:** SMC-002.
- **SMC-004 — `weak_sector_gauge_closure`.** Join axial-frame exposure, `V-A`, overlap, weak-corridor provenance, and effective gauge covariance. **Depends on:** SMC-002.
- **SMC-005 — `scalar_boson_acceptance`.** Apply the versioned Higgs mass, signal-strength, channel-rate, and exclusion benchmarks as observer-level recovery targets. **Depends on:** SMC-004 and mass-map scalar response.
- **SMC-006 — `nuclear_potential_derivation`.** Derive signs, ranges, and saturation for the reduced nuclear interaction terms from hadronic geometry and Noether sea response. **Depends on:** SMC-003.
- **SMC-007 — `hydrogen_fermion_sea_boundary`.** Derive the four-fermion hydrogen map separating exact assembly membership, exclusion envelope, and Noether sea coarse graining. **Depends on:** SMC-003 and SMC-006.
- **SMC-008 — `supersymmetry_internal_partner_comparison`.** Use supersymmetry only as comparison pressure on internal branch degrees and null results. **Depends on:** accepted gauge/branch rows.
- **SMC-009 — `lattice_qcd_direct_assembly_comparison`.** Compare future finite-assembly nucleon observables with lattice benchmarks without premature replacement claims. **Depends on:** SMC-003, SMC-006, and direct assembly simulation.
- **SMC-010 — `e8_redundancy_heuristic_audit`.** Test the `248=256-8` clue only as a speculative algebra/redundancy heuristic. **Depends on:** accepted branch and gauge records.
- **SMC-011 — `quark_vortex_coupling_simulation`.** Test vortex-like wake coupling for confinement, quark stability, and gluon-comparison observables without bypassing the color-singlet ledger. **Depends on:** SMC-003 and SMC-009.

Completion for SMC-002 through SMC-011 requires the linked focused packet to produce its declared geometry, carrier, residual, and falsifier; inherited equations remain recovery targets rather than premises.

## Awaiting verification

No rows.

## Verified

No rows.
