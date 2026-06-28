# Nuclear Atomic Image Intake

Date: June 28, 2026

## Scope

Source-mining image-library pass for `content/assets/images/nuclear`, focused on periodic tables, electron-orbital references, and hydrogen atom representations. The pass used Wikipedia article images, Wikimedia Commons search, and Commons image metadata/API records to select reusable source-backed assets.

## Result

- Current local nuclear/atomic image assets imported and registered: 10.
- The June 28 quality-correction pass removed the weak 316 x 316 `hatom-orbitals-commons` PNG and replaced it with stronger hydrogen, orbital, atom-representation, and electron-shell-table references.
- Selected assets cover four visual classes: periodic tables, electron-shell periodic tables, electron-orbital visualizations, and atom representations.
- The image manifest entries are the provenance records: each imported image stores source page, original file URL, dimensions, SHA-256 hash, license label, creator/credit line, import date, and intended use.

## Imported Assets

| Asset id | Path | Dimensions | License | Source |
| --- | --- | ---: | --- | --- |
| `periodic-table-large-commons` | `content/assets/images/nuclear/periodic-table-large-commons.svg` | 1090 x 644 | CC BY 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Periodic_table_large.svg |
| `hyde-periodic-table-relationships-commons` | `content/assets/images/nuclear/hyde-periodic-table-relationships-commons.svg` | 3240 x 2430 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:The_chemical_elements_and_their_periodic_relationships.svg |
| `periodic-table-electron-shells-commons` | `content/assets/images/nuclear/periodic-table-electron-shells-commons.svg` | 4213 x 2980 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Periodic_Table_of_Elements_showing_Electron_Shells(Repaired).svg |
| `electron-orbitals-commons` | `content/assets/images/nuclear/electron-orbitals-commons.svg` | 857 x 556 | Public domain | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Electron_orbitals.svg |
| `atomic-orbitals-spdf-m-eigenstates-commons` | `content/assets/images/nuclear/atomic-orbitals-spdf-m-eigenstates-commons.png` | 2800 x 1600 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Atomic_orbitals_spdf_m-eigenstates.png |
| `atomic-orbitals-spdf-superpositions-commons` | `content/assets/images/nuclear/atomic-orbitals-spdf-superpositions-commons.png` | 2800 x 1600 | CC BY-SA 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Atomic_orbitals_spdf_m-eigenstates_and_superpositions.png |
| `hydrogen-density-plots-commons` | `content/assets/images/nuclear/hydrogen-density-plots-commons.png` | 2200 x 2000 | Public domain | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Hydrogen_Density_Plots.png |
| `openstax-d-orbitals-commons` | `content/assets/images/nuclear/openstax-d-orbitals-commons.png` | 1300 x 361 | CC BY 4.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:CNX_Chem_19_03_Pattern_img.png |
| `helium-atom-qm-commons` | `content/assets/images/nuclear/helium-atom-qm-commons.svg` | 665 x 667 | CC BY-SA 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Helium_atom_QM.svg |
| `bohr-model-hydrogen-commons` | `content/assets/images/nuclear/bohr-model-hydrogen-commons.svg` | 900 x 650 | CC BY 3.0 | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Bohr_model_Hydrogen.svg |

## Skipped Or Deferred

| Candidate | Reason | Source |
| --- | --- | --- |
| `hatom-orbitals-commons` | Removed and superseded because the local import was only 316 x 316 and visually weak beside the higher-resolution hydrogen density plot. | https://commons.wikimedia.org/wiki/File:HAtomOrbitals.png |
| `Atom Diagram.svg` | Deferred because the Commons description explicitly frames it as a scientifically inaccurate idealized lithium/nuclear-age icon; the Bohr-model hydrogen diagram retained here is a cleaner atomic reference for the current batch. | https://commons.wikimedia.org/wiki/File:Atom_Diagram.svg |
| `Blausen 0342 ElectronEnergyLevels.png` | Deferred because the batch already includes a conventional periodic table, orbital charts, and hydrogen atom diagrams; energy-level diagrams can be added later if a spectra-specific figure is needed. | https://commons.wikimedia.org/wiki/File:Blausen_0342_ElectronEnergyLevels.png |
| `CNX Chem 19 03 Dorbital.png` | Deferred in favor of the OpenStax `Pattern img` export because the selected file has clearer x, y, and z axes and labels. | https://commons.wikimedia.org/wiki/File:CNX_Chem_19_03_Dorbital.png |

## Notes

- All selected files are local copies under `content/assets/images/nuclear`, not hotlinked external images.
- The Commons `sha1` values were used only as remote metadata checks; the manifest records local SHA-256 hashes computed after download.
- The Bohr-model asset is registered as a historical or introductory representation, not as a modern orbital ontology claim.
- The OpenStax d-orbital figure is included as a chemistry-textbook reference; the hydrogen density plot and Geek3 orbital grids remain standard quantum-mechanical visualization references rather than native assembly derivations.

## Next Source-Mining Target

No follow-up is required for the requested canonical image batch. A later spectra-specific pass could add line-series diagrams or energy-level figures if a chapter or scene starts using them directly.
