# VBF Photon Missing-Transverse-Momentum Event Ledger

Status: channel-specific event-ledger template; priority-only; no corpus promotion; no score movement.

Date staged: June 30, 2026.

Source basis: ATLAS Collaboration, [Observation of electroweak production of two jets in association with an isolated photon and missing transverse momentum, and search for a Higgs boson decaying into invisible particles at 13 TeV with the ATLAS detector](https://arxiv.org/abs/2109.00925), plus the detector-provenance packet in [Collider Detector Provenance And Event Reconstruction](../../source-mining/analysis/collider-detector-provenance-event-reconstruction.md).

## Purpose

This template is the first concrete consumer of the detector-provenance carrier $\mathcal{D}_{\mathrm{LHC}}$. It binds one collider channel to one same-event record:

$$
pp
\to
\gamma
+
j_{\mathrm{fwd},1}
+
j_{\mathrm{fwd},2}
+
\mathbf{p}_T^{\mathrm{miss}}
+
X_{\mathrm{soft/rem}}.
$$

The ATLAS source uses this final-state signature for three related observer-level targets:

- electroweak $Z(\nu\nu)\gamma jj$ production;
- VBF Higgs production with invisible decay;
- Higgs decay into a photon plus a dark photon.

Those are benchmark interpretations of the same stored event shape. The $\mathbb{A}\mathbb{A}\mathbb{A}$ use is not to import new hidden-sector ontology. The use is to force visible, hidden, recoil, remnant, and detector rows to share one event ledger before any invisible branch, scalar residual, or neutral-current claim is accepted.

## Same-Event Ledger Template

For an accepted stored event $e$, use the local template

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{\gamma jj+\mathrm{miss}}(e)
=
\left(
B_{\mathrm{beam}},
\mathcal{D}_{\mathrm{LHC}},
Y_{\mathrm{vis}},
Y_{\mathrm{hid}},
Y_{\mathrm{recoil}},
Y_{\mathrm{rem}},
\mathcal{C}_{T},
\mathcal{C}_{E\mathbf{p}\mathbf{J}},
\mathcal{F}_{\mathrm{fit}}
\right).
$$

The rows are:

| Row | Channel content | Mapping rule |
| --- | --- | --- |
| $B_{\mathrm{beam}}$ | Proton-proton collisions at declared $\sqrt{s}$ and integrated luminosity. | This is beam and exposure provenance, not a native branch selector. |
| $\mathcal{D}_{\mathrm{LHC}}$ | Trigger, primary vertex, photon reconstruction, jet reconstruction, $\mathbf{p}_T^{\mathrm{miss}}$, calibration, pileup rejection, object overlap removal, and nuisance parameters. | The detector row must be attached before visible or hidden products are compared to a native reaction ledger. |
| $Y_{\mathrm{vis}}$ | One isolated reconstructed photon $\gamma$ and two forward reconstructed jets $j_{\mathrm{fwd},1},j_{\mathrm{fwd},2}$; control-region leptons only when the event is intentionally moved out of the zero-lepton signal region. | These are reconstructed visible data products. They are not substrate products. |
| $Y_{\mathrm{hid}}$ | Standard benchmark: neutrino pair from $Z(\nu\nu)$. Search benchmarks: invisible Higgs daughters or dark photon contribution. | A hidden row is an inferred branch constrained by transverse imbalance and visible recoil, not a free sink. |
| $Y_{\mathrm{recoil}}$ | The photon and VBF dijet system that make the hidden row measurable through transverse recoil. | Recoil objects must remain detector-calibrated rows with trigger and selection provenance. |
| $Y_{\mathrm{rem}}$ | Underlying event, beam remnants, pileup, third-jet allowance, soft tracks, mismeasurement, and non-collision or misreconstruction contamination. | Remnant and soft rows must not be silently absorbed into $\mathbf{p}_T^{\mathrm{miss}}$. |
| $\mathcal{C}_{T}$ | Transverse balance and topology: high $\mathbf{p}_T^{\mathrm{miss}}$, large dijet pseudorapidity separation, large $m_{jj}$, photon centrality, jet-$\mathbf{p}_T^{\mathrm{miss}}$ angular separation, and lepton veto. | The collider benchmark primarily closes in the transverse plane because the partonic longitudinal initial state is not fully known event-by-event. |
| $\mathcal{C}_{E\mathbf{p}\mathbf{J}}$ | Energy, momentum, angular-momentum, charge, and identity bookkeeping after all visible, hidden, remnant, and detector rows are declared. | Native closure can only be tested after observer-level row identities and detector provenance are fixed. |
| $\mathcal{F}_{\mathrm{fit}}$ | Signal-region bins, control regions, validation regions, background normalizations, profile-likelihood nuisance parameters, and limit or cross-section extraction. | Fit rows are observer inference, not additional event products. |

## Transverse Closure Row

The detector-level missing-transverse-momentum row specializes the shared convention from [Standard Model Closure](../priorities.md):

$$
\mathbf{p}_T^{\mathrm{miss}}
=
-
\left(
\mathbf{p}_{T,\gamma}
+
\mathbf{p}_{T,j_1}
+
\mathbf{p}_{T,j_2}
+
\sum_{o\in\mathcal{O}_{\mathrm{other}}}
\mathbf{p}_{T,o}
+
\mathbf{p}_T^{\mathrm{soft}}
\right).
$$

Equivalently, the same stored event must satisfy the detector-level balance residual

$$
\Delta_T(e)
=
\mathbf{p}_T^{\mathrm{miss}}
+
\mathbf{p}_{T,\gamma}
+
\mathbf{p}_{T,j_1}
+
\mathbf{p}_{T,j_2}
+
\sum_{o\in\mathcal{O}_{\mathrm{other}}}
\mathbf{p}_{T,o}
+
\mathbf{p}_T^{\mathrm{soft}},
$$

with $\|\Delta_T(e)\|$ interpreted through $\mathcal{U}_{\mathrm{syst}}$ rather than forced to vanish exactly. The hidden row may be proposed only after the visible photon, forward jets, soft term, pileup convention, trigger, and uncertainties are present in the same record.

This is the key no-free-sink rule for the channel:

$$
Y_{\mathrm{hid}}
\;\text{is admissible only if}\;
\left(
Y_{\mathrm{vis}},
Y_{\mathrm{recoil}},
Y_{\mathrm{rem}},
\mathcal{D}_{\mathrm{LHC}},
\mathcal{F}_{\mathrm{fit}}
\right)
\;\text{are declared for the same event or analysis bin.}
$$

## Channel Rows

| Channel interpretation | Visible row | Hidden row | Recoil row | Remnant and detector rows | Closure use |
| --- | --- | --- | --- | --- | --- |
| Electroweak $Z(\nu\nu)\gamma jj$ | Isolated photon plus two forward jets. | Neutrino pair. | Photon plus VBF-like dijet system. | Pileup, soft term, third-jet allowance, strong $Z\gamma$ background, $W\gamma$ lost-lepton background, fake photon/electron backgrounds, MET-trigger efficiency, object uncertainties. | Neutral-current and electroweak self-coupling benchmark with measured fiducial cross-section. |
| VBF $H\to\mathrm{inv.}$ with photon | Isolated photon plus two forward jets. | Invisible Higgs-decay products. | VBF dijet system plus photon. | Same detector and background rows, with DNN or category score treated as $\mathcal{F}_{\mathrm{fit}}$. | Scalar-boson residual with invisible branching upper limit; not evidence for primitive Higgs ontology. |
| $H\to\gamma\gamma_d$ | One reconstructed photon, two jets, and $\mathbf{p}_T^{\mathrm{miss}}$. | Dark-photon benchmark contribution. | Photon-$\mathbf{p}_T^{\mathrm{miss}}$ transverse-mass row plus VBF/ggF production categories. | Same detector rows, modified photon-$\mathbf{p}_T^{\mathrm{miss}}$ angular and transverse-mass selections, nuisance parameters. | Semi-visible scalar-channel limit; useful as detector-provenance pressure, not a hidden-sector ontology import. |

## Same-Record Acceptance Conditions

The template is usable only when these conditions are met:

1. The event or analysis bin names the trigger path and offline $\mathbf{p}_T^{\mathrm{miss}}$ convention.
2. The visible photon and jets are defined after object reconstruction, object overlap removal, calibration, and pileup rejection.
3. The forward-jet topology is recorded through $m_{jj}$, $\Delta\eta_{jj}$, jet hemispheres, and centrality or equivalent topology variables.
4. The missing-momentum row includes hard objects, the soft term, and uncertainties propagated from object scales, resolutions, and trigger efficiency.
5. Lost-lepton, fake-photon, fake-electron, $\gamma+$jet, strong $Z\gamma$, and $W\gamma$ backgrounds are either included in $\mathcal{F}_{\mathrm{fit}}$ or explicitly declared outside the comparison.
6. The hidden row is not accepted without the visible recoil row and detector row.
7. The scalar or dark-sector interpretation is kept downstream of the shared event record and statistical limit row.

## Failure Modes Prevented

| Failure mode | How the template blocks it |
| --- | --- |
| Reconstructed photon or jets treated as substrate products. | The visible row is explicitly downstream of $\mathcal{D}_{\mathrm{LHC}}$. |
| Missing transverse momentum treated as an invisible energy sink. | $\Delta_T(e)$ must carry hard-object, soft-term, pileup, and uncertainty provenance. |
| Invisible Higgs or dark-photon branch asserted without recoil. | $Y_{\mathrm{hid}}$ is admissible only with the photon, VBF dijet, and fit rows in the same record. |
| Strong, electroweak, and misidentification backgrounds conflated with signal ontology. | $\mathcal{F}_{\mathrm{fit}}$ keeps control-region and nuisance-parameter inference at observer level. |
| VBF topology treated as direct evidence for native branch geometry. | Forward jets, centrality, and $m_{jj}$ are detector-level topology rows until a native branch simulation reproduces them. |

## Promotion Triage

Claim map:

| Claim | Bucket | Disposition |
| --- | --- | --- |
| Reconstructed photon, jets, and $\mathbf{p}_T^{\mathrm{miss}}$ define a reusable observer-level event shape. | Effective summary | Priority-only template accepted. |
| A native reaction ledger must bind visible, hidden, recoil, remnant, and detector rows before using the channel as closure evidence. | Derivation/closure target | Safe priority advancement; no corpus promotion yet. |
| The $Z(\nu\nu)\gamma jj$ measurement is a neutral-current/electroweak benchmark. | Derivation/closure target | Useful downstream Standard Model recovery target. |
| Invisible-Higgs or dark-photon interpretations identify new substrate content. | Speculation if stated ontologically | Rejected for corpus promotion; keep as observer-level limit pressure only. |

Likely corpus destination after a native channel calculation exists: [Reaction Ledger and Channel Closure](../../../../content/markdown/aaa/validation/reaction-ledger.md), with a smaller scalar-benchmark pointer in [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md). Do not promote this template before a native same-event carrier or simulation supplies at least one accepted row beyond detector provenance.

## Smallest Next Artifact

The next useful artifact is not another detector report. It is a single retained-row candidate for the electroweak $Z(\nu\nu)\gamma jj$ interpretation:

$$
\left(
Y_{\mathrm{vis}}=\{\gamma,j_{\mathrm{fwd},1},j_{\mathrm{fwd},2}\},
Y_{\mathrm{hid}}=\{\nu,\bar\nu\},
Y_{\mathrm{recoil}}=\{\gamma,j_{\mathrm{fwd},1},j_{\mathrm{fwd},2}\},
Y_{\mathrm{rem}},
\mathcal{D}_{\mathrm{LHC}},
\Delta_T,
\mathcal{F}_{\mathrm{fit}}
\right),
$$

with the first blocker stated explicitly: no accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ neutral-current branch row yet maps the hidden neutrino-pair interpretation, visible photon, VBF-like recoil jets, and detector fit row back to one retained event record.
