# Nuclear Atomic Image Intake

Date: June 28, 2026

## Scope

Source-mining image-library pass for `content/assets/images/nuclear`, focused on periodic tables, electron-orbital references, and hydrogen atom representations. The pass used Wikipedia article images, Wikimedia Commons search, and Commons image metadata/API records to select reusable source-backed assets.

## Result

- New local nuclear/atomic image assets imported and registered: 7.
- Existing local nuclear image asset preserved and reused: `nucleosynthesis-periodic-table-commons`.
- Selected assets cover three visual classes: standard and Hyde periodic tables, electron orbital visualizations, and hydrogen atom representations.
- The image manifest entries are the provenance records: each imported image stores source page, original file URL, dimensions, SHA-256 hash, license label, creator/credit line, import date, and intended use.

## Imported Assets

| Asset id | Path | Dimensions | License | Source |
| --- | --- | ---: | --- | --- |
| `periodic-table-large-commons` | `content/assets/images/nuclear/periodic-table-large-commons.svg` | 1090 x 644 | CC BY 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Periodic_table_large.svg |
| `hyde-periodic-table-relationships-commons` | `content/assets/images/nuclear/hyde-periodic-table-relationships-commons.svg` | 3240 x 2430 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:The_chemical_elements_and_their_periodic_relationships.svg |
| `electron-orbitals-commons` | `content/assets/images/nuclear/electron-orbitals-commons.svg` | 857 x 556 | Public domain | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Electron_orbitals.svg |
| `hatom-orbitals-commons` | `content/assets/images/nuclear/hatom-orbitals-commons.png` | 316 x 316 | CC BY-SA 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:HAtomOrbitals.png |
| `atomic-orbitals-spdf-m-eigenstates-commons` | `content/assets/images/nuclear/atomic-orbitals-spdf-m-eigenstates-commons.png` | 2800 x 1600 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Atomic_orbitals_spdf_m-eigenstates.png |
| `hydrogen-atom-commons` | `content/assets/images/nuclear/hydrogen-atom-commons.svg` | 270 x 246 | Public domain | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Hydrogen_atom.svg |
| `bohr-model-hydrogen-commons` | `content/assets/images/nuclear/bohr-model-hydrogen-commons.svg` | 900 x 650 | CC BY 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Bohr_model_Hydrogen.svg |

## Reused Existing Asset

| Asset id | Path | Reason |
| --- | --- | --- |
| `nucleosynthesis-periodic-table-commons` | `content/assets/images/nuclear/nucleosynthesis-periodic-table-commons.svg` | Already present as a source-backed nucleosynthesis periodic table; this pass adds complementary standard and Hyde periodic-table references rather than replacing it. |

## Skipped Or Deferred

| Candidate | Reason | Source |
| --- | --- | --- |
| `Atom Diagram.svg` | Deferred because the Commons description explicitly frames it as a scientifically inaccurate idealized lithium/nuclear-age icon; the hydrogen diagrams imported here are cleaner atomic references for the current batch. | https://commons.wikimedia.org/wiki/File:Atom_Diagram.svg |
| `Blausen 0342 ElectronEnergyLevels.png` | Deferred because the batch already includes a conventional periodic table, orbital charts, and hydrogen atom diagrams; energy-level diagrams can be added later if a spectra-specific figure is needed. | https://commons.wikimedia.org/wiki/File:Blausen_0342_ElectronEnergyLevels.png |

## Notes

- All selected files are local copies under `content/assets/images/nuclear`, not hotlinked external images.
- The Commons `sha1` values were used only as remote metadata checks; the manifest records local SHA-256 hashes computed after download.
- The Bohr-model asset is registered as a historical or introductory representation, not as a modern orbital ontology claim.

## Next Source-Mining Target

No follow-up is required for the requested canonical image batch. A later spectra-specific pass could add line-series diagrams or energy-level figures if a chapter or scene starts using them directly.
