# Collider Detector Provenance And Event Reconstruction

Status: mined-source packet; priority-only; no corpus promotion.

Date mined: June 30, 2026.

Scope: CERN, ATLAS, and CMS detector, trigger, event-reconstruction, jet, missing-transverse-momentum, and uncertainty material. This packet strengthens the detector-provenance row in [Standard Model Closure](../mapping-standard-model/priorities.md) without turning reconstructed objects into $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate products.

## Mining Result

The high-value signal is the full collider inference chain:

$$
\mathrm{beam}
\to
\mathrm{collision}
\to
\mathrm{detector\ response}
\to
\mathrm{trigger}
\to
\mathrm{reconstruction}
\to
\mathrm{calibration}
\to
\mathrm{object,\ missing\ momentum,\ and\ uncertainty\ rows}.
$$

The existing detector-provenance carrier should be kept as observer evidence:

$$
\mathcal{D}_{\mathrm{LHC}}
=
\left(
B_{\mathrm{beam}},
\mathcal{P}_{\mathrm{pileup}},
\mathcal{T}_{\mathrm{trig}},
\mathcal{O}_{\mathrm{reco}},
\mathbf{p}_T^{\mathrm{miss}},
\mathcal{V}_{\mathrm{prim/sec}},
\mathcal{C}_{\mathrm{cal}},
\mathcal{U}_{\mathrm{syst}}
\right).
$$

Here $\mathcal{T}_{\mathrm{trig}}$ records online trigger paths, thresholds, rates, and event-retention conditions. It is a provenance row, not a new physical sector. Without that row, an event ledger can silently treat the stored data sample as if it were the raw collision population.

## Primary Source Map

| Source | Mined signal | $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping use |
| --- | --- | --- |
| ATLAS, [Detector & Technology](https://atlas.cern/Discover/Detector) | ATLAS is a layered detector recording trajectory, momentum, and energy, with only a small selected fraction of collisions retained for study. | Use detector response and event retention as provenance before any particle-label mapping. |
| ATLAS, [Trigger and Data Acquisition System](https://atlas.cern/Discover/Detector/Trigger-DAQ) | ATLAS uses a two-stage trigger: fast hardware selection on reduced detector information, then software analysis before offline storage. | Add $\mathcal{T}_{\mathrm{trig}}$ to $\mathcal{D}_{\mathrm{LHC}}$ so stored events carry trigger provenance. |
| CMS, [Detector](https://cms.cern/detector) | CMS reconstructs collision "images" from stable-particle signals across tracker, calorimeter, and muon systems. | Keep detector signals, stable-particle reconstruction, and event interpretation separate from substrate ontology. |
| CMS, [Triggering and Data Acquisition](https://cms.cern/detector/triggering-and-data-acquisition) | CMS reduces a very high interaction rate through Level-1 and higher-level trigger decisions before permanent storage. | Treat trigger acceptance as a sample-selection row in collider event ledgers. |
| CERN Open Data, [CMS Physics Objects 2015](https://opendata.cern.ch/docs/cms-physics-objects-2015) | Reconstructed physics objects are interpretations of CMS sub-detector signals and carry efficiencies, misidentification rates, and object-collection conventions. | Prevent $\mathcal{O}_{\mathrm{reco}}$ from being read as a list of ontic final products. |
| CMS Collaboration, [Particle-flow reconstruction and global event description with the CMS detector](https://arxiv.org/abs/1706.04965) | CMS particle-flow reconstruction combines detector subsystems into a global event description supporting jets, tau reconstruction, missing transverse momentum, lepton identification, and pileup mitigation. | Bind visible-object rows, pileup rows, and missing-momentum rows to one reconstruction convention. |
| ATLAS Collaboration, [The performance of missing transverse momentum reconstruction and its significance with the ATLAS detector](https://arxiv.org/abs/2402.05858) | ATLAS missing transverse momentum combines calibrated hard objects with soft activity, uses ambiguity resolution, defines working points, and evaluates pileup and soft-term uncertainties. | Treat $\mathbf{p}_T^{\mathrm{miss}}$ as a calibrated transverse-balance residual, not as a free invisible-sector sink. |
| ATLAS Collaboration, [Jet energy scale and resolution measured in proton-proton collisions at $\sqrt{s}=13$ TeV with the ATLAS detector](https://arxiv.org/abs/2007.02645) | ATLAS jets use declared inputs, anti-$k_t$ definitions, simulation-based calibrations, in-situ corrections, and jet energy scale/resolution uncertainties. | Treat $j$ and $T_{b/c}(j)$ as reconstructed and calibrated analysis objects, not direct quark or substrate observations. |

## Event-Ledger Mapping

The detector packet should be attached to $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ only as provenance. It supports these ledger rows:

| Ledger row | Detector-provenance content | Mapping rule |
| --- | --- | --- |
| Visible outgoing row | Electrons, muons, photons, hadronic taus, charged hadrons, neutral hadrons, jets, and tagged jets after reconstruction. | Map visible products through $\mathcal{O}_{\mathrm{reco}}$ and $\mathcal{C}_{\mathrm{cal}}$ before comparing to a native reaction ledger. |
| Hidden outgoing row | Neutrino, invisible-Higgs, or dark-sector hypotheses inferred from imbalance and visible recoil. | Require $\mathbf{p}_T^{\mathrm{miss}}$, $\mathcal{P}_{\mathrm{pileup}}$, $\mathcal{T}_{\mathrm{trig}}$, and $\mathcal{U}_{\mathrm{syst}}$ before assigning an invisible branch. |
| Recoil row | Photon, lepton, jet, VBF-jet, or hadronic recoil objects that make the hidden branch measurable. | Keep recoil objects as reconstructed detector rows with trigger and calibration provenance. |
| Remnant row | Underlying event, beam remnants, pileup, and soft tracks not assigned to hard reconstructed objects. | Do not absorb the soft term into native missing energy; keep it as a detector and event-environment row. |
| Detector row | Trigger paths, object definitions, calibration constants, vertex association, ambiguity resolution, and nuisance parameters. | Treat the detector row as the boundary between physical event hypotheses and observer-level data products. |

## Mapping Corrections

- Reconstructed objects are data products. An $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction map may compare against them, but must not identify them with primitive products.
- Jets are clustered and calibrated summaries of hadronic activity. A jet is not direct quark observation, and a heavy-flavor tag is not direct observation of a $b$ or $c$ quark.
- Missing transverse momentum is a transverse balance equation over calibrated objects and a soft term. It can support hidden-row hypotheses only after visible recoil, pileup, ambiguity-resolution, and uncertainty rows are present.
- Trigger selection is part of event provenance. A benchmark using collider events must record how the event survived online selection and offline analysis cuts.
- Systematic uncertainties are structural rows in the mapping, not prose caveats. Jet energy scale, jet energy resolution, soft-term scale/resolution, object efficiencies, misidentification rates, pileup, luminosity, and modeling uncertainties should enter $\mathcal{U}_{\mathrm{syst}}$.

## Direct Geometry Layer Use

This packet does not advance a retained geometry by itself. Its value is a detector boundary requiring verification before advancement for later equation-mapping work:

| Comparison term | Required retained row before acceptance |
| --- | --- |
| Reconstructed electron, muon, photon, or hadron | Same-event visible outgoing row plus reconstruction and efficiency provenance. |
| Reconstructed jet | Same-event hadronic/recoil row plus jet definition, input type, calibration, and uncertainty provenance. |
| Heavy-flavor tag | Same-event vertex/track/lifetime row plus tag calibration and misidentification provenance. |
| $\mathbf{p}_T^{\mathrm{miss}}$ or $E_T^{\mathrm{miss}}$ | Same-event visible-object sum, soft term, pileup convention, ambiguity resolution, and systematic uncertainty rows. |
| Invisible-channel residual | Visible recoil, trigger path, missing-transverse-momentum convention, statistical limit, and detector uncertainty rows. |

## Immediate Reuse

Use this packet when mapping collider channels such as $Z(\ell\ell)+j$, $\gamma+j$, VBF plus $\mathbf{p}_T^{\mathrm{miss}}$, Higgs visible decays, invisible-Higgs searches, top events, or heavy-flavor final states. The first channel-specific consumer is [VBF Photon Missing-Transverse-Momentum Event Ledger](../mapping-standard-model/vbf-photon-missing-transverse-momentum-event-ledger.md), which binds visible, hidden, recoil, remnant, and detector rows to the same event record.

No score movement, canon promotion, or Standard Model closure acceptance follows from this mining pass alone.
