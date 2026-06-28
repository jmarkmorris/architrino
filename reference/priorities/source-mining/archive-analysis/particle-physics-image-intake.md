# Particle Physics Image Intake

Date mined: June 28, 2026

## Scope

This source-mining pass added canonical particle-physics images to `content/assets/images/physics/`, with active retained provenance registered in `content/assets/images/images.json`.

The selection targeted missing roles in the existing physics image library:

- LHC detector-scale reference.
- Collision/event-display references.
- Proton quark-structure comparison imagery.

## Retained Assets

| Asset id | Local path | Role | Source and license |
| --- | --- | --- | --- |
| `cern-lhc-cms-detector-commons` | `content/assets/images/physics/cern-lhc-cms-detector-commons.jpg` | LHC detector-scale reference, CMS | [Wikimedia Commons: CERN LHC CMS 11](https://commons.wikimedia.org/wiki/File:CERN_LHC_CMS_11.jpg), SimonWaldherr, CC BY-SA 4.0 |
| `candidate-higgs-events-atlas-cms-commons` | `content/assets/images/physics/candidate-higgs-events-atlas-cms-commons.png` | Event-display reference for Higgs-candidate collision reconstructions | [Wikimedia Commons: Candidate Higgs Events in ATLAS and CMS](https://commons.wikimedia.org/wiki/File:Candidate_Higgs_Events_in_ATLAS_and_CMS.png), CERN for the ATLAS and CMS Collaborations, CC BY-SA 3.0 |
| `proton-quark-structure-commons` | `content/assets/images/physics/proton-quark-structure-commons.svg` | Quark-model proton structure comparison | [Wikimedia Commons: Proton quark structure](https://commons.wikimedia.org/wiki/File:Proton_quark_structure.svg), Jacek rybak, CC BY-SA 4.0 |

## Existing Physics Assets Reused

The pass did not duplicate existing physics references already registered in the image manifest:

- `standard-model-elementary-particles`
- `quantum-fluctuations-leinweber`
- `electromagnetic-spectrum-planck-scale`

## Deferred Candidates

| Candidate | Disposition |
| --- | --- |
| [Wikimedia Commons: Neutron beta decay](https://commons.wikimedia.org/wiki/File:Neutron_beta_decay.svg) | Deferred because weak-interaction notation is not currently an active image-library role; add a fresh source-backed diagram only when a scene needs it. |
| Additional ATLAS/CMS event displays | Deferred because the imported Higgs-candidate composite already supplies the event-display role for this pass without overfilling the library with experiment-specific variants. |

## Provenance Notes

- Each retained asset has a local SHA-256 checksum, byte count, media type, dimensions, source page, source file URL, creator, license label, license URL, credit line, and selection note in `content/assets/images/images.json`.
- The imported detector photographs and event-display image are comparison and context imagery. They do not promote any native $\mathbb{A}\mathbb{A}\mathbb{A}$ claim or act as validation artifacts by themselves.
