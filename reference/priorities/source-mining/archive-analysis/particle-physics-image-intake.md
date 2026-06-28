# Particle Physics Image Intake

Date mined: June 28, 2026

## Scope

This source-mining pass added canonical particle-physics images to `content/assets/images/physics/`, with active retained provenance registered in `content/assets/images/images.json`.

The selection targeted missing roles in the existing physics image library:

- LHC detector-scale reference.
- Accelerator-chain reference.
- Collision/event-display references.
- Bubble-chamber particle-track and neutrino-detection references.
- Weak, QED, and QCD Feynman-diagram references.
- Proton quark-structure comparison imagery.

## Retained Assets

| Asset id | Local path | Role | Source and license |
| --- | --- | --- | --- |
| `cern-lhc-cms-detector-commons` | `content/assets/images/physics/cern-lhc-cms-detector-commons.jpg` | LHC detector-scale reference, CMS | [Wikimedia Commons: CERN LHC CMS 11](https://commons.wikimedia.org/wiki/File:CERN_LHC_CMS_11.jpg), SimonWaldherr, CC BY-SA 4.0 |
| `atlas-calorimeter-installation-cern-commons` | `content/assets/images/physics/atlas-calorimeter-installation-cern-commons.jpg` | LHC detector-scale reference, ATLAS | [Wikimedia Commons: Installing the ATLAS Calorimeter - edit1](https://commons.wikimedia.org/wiki/File:Installing_the_ATLAS_Calorimeter_-_edit1.jpg), Maximilien Brice/CERN, CC BY 4.0 |
| `cern-accelerator-complex-2022-commons` | `content/assets/images/physics/cern-accelerator-complex-2022-commons.png` | CERN accelerator-chain reference | [Wikimedia Commons: CERN accelerator complex 2022](https://commons.wikimedia.org/wiki/File:CERN_accelerator_complex_2022.png), Fabienne Landua/CERN, CC BY 4.0 |
| `candidate-higgs-events-atlas-cms-commons` | `content/assets/images/physics/candidate-higgs-events-atlas-cms-commons.png` | Event-display reference for Higgs-candidate collision reconstructions | [Wikimedia Commons: Candidate Higgs Events in ATLAS and CMS](https://commons.wikimedia.org/wiki/File:Candidate_Higgs_Events_in_ATLAS_and_CMS.png), CERN for the ATLAS and CMS Collaborations, CC BY-SA 3.0 |
| `gargamelle-neutral-current-bubble-chamber-commons` | `content/assets/images/physics/gargamelle-neutral-current-bubble-chamber-commons.jpg` | Historic neutral-current bubble-chamber event | [Wikimedia Commons: Leptonic event in Gargamelle bubble chamber](https://commons.wikimedia.org/wiki/File:Leptonic_event_in_Gargamelle_bubble_chamber.jpg), CERN, CC BY 4.0 |
| `first-neutrino-event-annotated-commons` | `content/assets/images/physics/first-neutrino-event-annotated-commons.jpg` | Annotated first-neutrino-event bubble-chamber record | [Wikimedia Commons: FirstNeutrinoEventAnnotated](https://commons.wikimedia.org/wiki/File:FirstNeutrinoEventAnnotated.jpg), Argonne National Laboratory, Public domain |
| `beta-negative-decay-feynman-commons` | `content/assets/images/physics/beta-negative-decay-feynman-commons.svg` | Weak-interaction beta-decay Feynman diagram | [Wikimedia Commons: Beta Negative Decay](https://commons.wikimedia.org/wiki/File:Beta_Negative_Decay.svg), Joel Holdsworth, Public domain |
| `electron-positron-muon-pair-feynman-commons` | `content/assets/images/physics/electron-positron-muon-pair-feynman-commons.svg` | QED pair-annihilation Feynman diagram | [Wikimedia Commons: Electron-positron annihilation into muon-antimuon](https://commons.wikimedia.org/wiki/File:Electron-positron_annihilation_into_muon-antimuon.svg), Romainbehar, CC0 |
| `feynman-gluon-radiation-commons` | `content/assets/images/physics/feynman-gluon-radiation-commons.svg` | QCD gluon-radiation Feynman diagram | [Wikimedia Commons: Feynman Diagram Gluon Radiation](https://commons.wikimedia.org/wiki/File:Feynman_Diagram_Gluon_Radiation.svg), Joel Holdsworth after SilverStar, Public domain |
| `proton-quark-structure-commons` | `content/assets/images/physics/proton-quark-structure-commons.svg` | Quark-model proton structure comparison | [Wikimedia Commons: Proton quark structure](https://commons.wikimedia.org/wiki/File:Proton_quark_structure.svg), Jacek rybak, CC BY-SA 4.0 |

## Existing Physics Assets Reused

The pass did not duplicate existing physics references already registered in the image manifest:

- `standard-model-elementary-particles`
- `quantum-fluctuations-leinweber`
- `electromagnetic-spectrum-planck-scale`

## Deferred Candidates

| Candidate | Disposition |
| --- | --- |
| [Wikimedia Commons: Neutron beta decay](https://commons.wikimedia.org/wiki/File:Neutron_beta_decay.svg) | Deferred because the Beta Negative Decay SVG is cleaner for the current weak-interaction diagram role. |
| Additional ATLAS/CMS event displays | Deferred because the imported Higgs-candidate composite already supplies the event-display role for this pass without overfilling the library with experiment-specific variants. |
| Additional bubble-chamber track photographs | Deferred because the retained Gargamelle and first-neutrino records cover the historical track-image role without overfilling the library. |

## Provenance Notes

- Each retained asset has a local SHA-256 checksum, byte count, media type, dimensions, source page, source file URL, creator, license label, license URL, credit line, and selection note in `content/assets/images/images.json`.
- The imported detector photographs, accelerator-complex graphic, bubble-chamber records, and Feynman diagrams are comparison and context imagery. They do not promote any native $\mathbb{A}\mathbb{A}\mathbb{A}$ claim or act as validation artifacts by themselves.
