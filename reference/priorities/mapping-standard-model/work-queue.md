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
12. `non_decoupling_falsifier_siting` — Status: `Queued`.

### SMC — Non-decoupling falsifier siting

- **Status:** Queued
- **Priority object:** `non_decoupling_falsifier_siting`
- **Request / acceptance:** Decoupling makes most precision data unable to discriminate one substrate from any other substrate producing the same effective coefficients, which is a property of the map rather than a weakness of any particular program, and is why the regime-capture treatment in [theory-differentials.md](../../../content/markdown/aaa/philosophy-history/theory-differentials.md) is correct. The channels where decoupling fails are therefore where falsifier effort is worth spending, because there the inverse problem is not many-to-one. Site them explicitly as a group, with [failure-criteria.md](../../../content/markdown/aaa/validation/failure-criteria.md) as the likely destination.
- **Candidate channels, each to be confirmed or rejected individually:** anomaly matching, where the neutral-pion two-photon rate reads off the quark colour count with no suppression; the dimension-5 neutrino operator; the symmetry-breaking pattern and light-species count; confinement, where the identity of the low-energy constituents changes rather than truncates; and the two naturalness failures, scalar mass and vacuum energy.
- **Evidence / blocker:** Partly present already and must not be duplicated. [gauge-symmetries.md](../../../content/markdown/aaa/assemblies/gauge-symmetries.md) already retains pion-to-photon anomaly matching as an observer-level recovery target, and [one-nature-many-theories.md](../../../content/markdown/aaa/philosophy-history/one-nature-many-theories.md) already carries the decoupling account with its sources. The missing element is the grouping and its consequence for where falsifiers are sited, not the individual facts.
- **Claim discipline:** the group is `inferred` as a falsifier-siting judgment. Each channel's physics is an observer-level constraint entering as a recovery target, never as a premise.
- **Completion:** Each candidate channel is either sited with an operator-checkable falsifier or rejected with a reason, and no existing owner's material is restated rather than linked.

## Queued

- **SMC-001 — `quark_mass_predictions`.** Extend quark geometry from catalog closure to first-pass mass predictions without fitting observed masses. **Completion:** one source-bound geometry produces a declared mass row and residual with no per-flavor retune.

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

<a id="smc-012--geometric-phase-and-holonomy-exploration"></a>
The completed SMC-012 introductory exploration is recorded in the [work log](work-log.md#2026-08-28--smc-012-geometric-phase-and-holonomy-exploration); this retained navigation anchor is not a live queue item or gauge-recovery result.
