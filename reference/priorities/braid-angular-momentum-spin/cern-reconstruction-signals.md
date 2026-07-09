# CERN Reconstruction Signals for Spin and Vector Labels

Extracted from `braid-angular-momentum-spin/priorities.md` during the braid priority sort (Phase 3, OP-3, 2026-07-08). Priority-only reference surface: observer-level detector benchmarks for the angular-momentum ledger, not local proofs of the internal spinor or photon transverse ledger. Claim levels unchanged.

The CERN detector and LHC Run-2 source family adds a practical warning for this workstream: spin, helicity, vector-boson, and boosted-object labels enter experiments through reconstructed tracks, calorimeter deposits, muon records, jets, missing transverse momentum, invariant masses, angular separations, and fit categories. These are observer-level variables. They can become benchmark surfaces for the angular-momentum ledger, but they are not local proofs of the internal Noether braid spinor or photon transverse ledger.

The cleanest mined equation is the boosted-decay angular scale used in LHC reconstruction:

$$
\Delta R
=
\sqrt{(\Delta\eta)^2+(\Delta\phi)^2}
\approx
\frac{2m}{p_T}.
$$

For a high-$p_T$ $W$, $Z$, $H$, or top branch, ordinary separated hadronic daughters can merge into a single large-radius jet, so jet mass, grooming, and substructure become the practical observer record. The angular-momentum workstream should treat this as a detector-kernel benchmark: a successful vector or scalar branch must predict not only total energy and momentum, but also the collimation and substructure variables through which the branch is reconstructed.

| Detector signal | Angular-momentum use | Failure condition |
| --- | --- | --- |
| Track curvature and impact-parameter records in magnetic detector volumes | Observer measurement of charge sign, transverse momentum, displaced vertices, and tag provenance. | Track observables are treated as direct substrate angular-momentum variables. |
| Photon, lepton, and jet angular separations $(\eta,\phi,\Delta R)$ | Benchmark for decay geometry, analyzer response, and boosted-object merging. | Spin/helicity claims ignore the angular variables used to separate or merge final states. |
| Jet substructure for boosted $W/Z/H/t$ branches | Downstream test for vector/scalar branch geometry and hadronic daughter collimation. | A vector or scalar channel is accepted by mass alone while failing its reconstruction topology. |
| Missing transverse momentum and recoil objects | Angular and momentum balance row for neutrino, invisible, or weak channels. | Missing momentum is used without recoil and detector-response terms in $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$. |
| Flavor tags from displaced vertices and semileptonic signatures | Hadron-level consumer of spin, lifetime, weak reaction, and flavor provenance. | A heavy-flavor branch is used as spin/flavor evidence without tag-calibration provenance. |

The immediate theorem-target addition is a reconstruction-to-ledger projection:

$$
\Pi_{\mathbf J}^{\mathrm{det}}
\left(
\mathcal{D}_{\mathrm{LHC}}
\right)
=
\left(
\Delta R,
\Delta\phi,
m_{\mathrm{jet}},
\mathbf{p}_T^{\mathrm{miss}},
\mathcal{V}_{\mathrm{sec}},
T_{b/c},
\mathcal{C}_{\mathrm{fit}}
\right)
\longrightarrow
\Delta_{\mathbf J}
\left(
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right).
$$

This projection does not derive spin. It states the detector variables that any later spin, helicity, polarization, vector-mode, or weak-handedness proof must be able to consume without changing its native angular-momentum ledger.
