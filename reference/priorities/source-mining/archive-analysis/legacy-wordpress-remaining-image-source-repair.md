# Legacy WordPress Remaining Image Source Repair

Date: June 28, 2026

## Scope

Follow-up pass over the operator-pruned remainder in `content/assets/images/legacy-wordpress/`. The pass searched filenames, visible credit lines, WordPress clean-text context, Wikimedia Commons, Wikipedia file redirects, ESO, NASA Image and Video Library, and direct source-site clues. Exact matches were imported only when the source and reuse status were defensible; otherwise the table records source-identification or a reasonable facsimile.

## Result

- Remaining legacy image files before this pass: 43.
- Replacement/source/facsimile assets retained in the active image library after image-ledger cleanup: 12.
- Legacy WordPress manifest entries removed from `content/assets/images/images.json`: 337.
- Files deleted from `content/assets/images/legacy-wordpress/`: 44 including `.DS_Store` when present.
- The legacy archive directory is now empty; source-mining history remains event history, not permanent post state.

## Imported Assets

| Asset id | Path | Source |
| --- | --- | --- |
| `albert-einstein-head-cleaned` | `content/assets/images/historical/albert-einstein-head-cleaned.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Albert_Einstein_Head_cleaned.jpg |
| `cmb-timeline-no-wmap` | `content/assets/images/black-holes/cmb-timeline-no-wmap.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:CMB_Timeline300_no_WMAP.jpg |
| `universe-evolution-wmap` | `content/assets/images/black-holes/universe-evolution-wmap.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:UniverseEvolution_WMAP_Id.jpg |
| `fermi-bubble-graphic-nasa` | `content/assets/images/black-holes/fermi-bubble-graphic-nasa.jpg` | NASA Image and Video Library - https://images.nasa.gov/details/GSFC_20171208_Archive_e001990 |
| `ernst-mach-1900` | `content/assets/images/historical/ernst-mach-1900.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Ernst-Mach-1900.jpg |
| `eso1122a-most-distant-quasar` | `content/assets/images/black-holes/eso1122a-most-distant-quasar.jpg` | European Southern Observatory - https://www.eso.org/public/images/eso1122a/ |
| `georges-lemaitre-1930` | `content/assets/images/historical/georges-lemaitre-1930.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:GLemaitre30.jpg |
| `holmdel-horn-antenna-restoration` | `content/assets/images/historical/holmdel-horn-antenna-restoration.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Horn_Antenna-in_Holmdel,_New_Jersey_-_restoration1.jpg |
| `active-galactic-nucleus-accretion-disk-torus` | `content/assets/images/black-holes/active-galactic-nucleus-accretion-disk-torus.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Illustration_of_Active_Galactic_Nucleus_(2007-agns_-_accretiondisk_torus).jpg |
| `murray-gell-mann-1965` | `content/assets/images/historical/murray-gell-mann-1965.png` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Murray_Gell-Mann_1965.png |
| `max-planck-hugo-erfurth-1938` | `content/assets/images/historical/max-planck-hugo-erfurth-1938.jpg` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Max_Planck_by_Hugo_Erfurth_1938cr_-_restoration1.jpg |
| `quantum-fluctuations-leinweber` | `content/assets/images/physics/quantum-fluctuations-leinweber.gif` | Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Quantum_Fluctuations.gif |

## Per-Image Disposition

| # | Deleted legacy file | Visual identification | Search result | Replacement / note | Archive action |
| --- | --- | --- | --- | --- | --- |
| 01 | legacy-wordpress-0fdc3656-be8b-4411-a139-ecd2a0503d75-19756-000015552e483d19-file-e82a046d78.jpg | conic/spherical conceptual diagram | no reusable source found | likely custom/generated conceptual art; no import | deleted |
| 02 | legacy-wordpress-19c6f3fc-63ba-41f8-a489-080b252a1a3c-10160-00000be382c3e41b-file-c3757ddf94.jpg | Einstein-Podolsky-Rosen portrait collage | partial facsimile retained | albert-einstein-head-cleaned; EPR illustration facsimile pruned from active ledger | deleted |
| 03 | legacy-wordpress-3e0808ec-f0e0-40f0-9aef-ac9a8e8e4192-25904-00001a3555ba5092-file-84d6ff393f.jpg | eROSITA/Fermi bubble composite with Peter Predehel credit | source identified, facsimile imported | fermi-bubble-graphic-nasa | deleted |
| 04 | legacy-wordpress-49ee0248-2d7e-41bc-8d88e35fa7d92c5a-source-8922b186ea.webp | particle-collision event display | no reusable source found | not imported; likely experiment outreach image but exact source not confirmed | deleted |
| 05 | legacy-wordpress-4bd41f88-df56-4f1c-b8d9-66a53cd98907-73527858e8.jpg | unidentified physicist portrait | no reusable source found | not imported | deleted |
| 06 | legacy-wordpress-eed0920e-71ab-4eac-a527-c10cd086d0e5-25904-00001a337ff864dd-file-526338d999.jpg | Fermi/eROSITA bubble explanatory graphic | facsimile imported | fermi-bubble-graphic-nasa | deleted |
| 07 | legacy-wordpress-ernst-mach-2-87cf88ff52.jpg | Ernst Mach portrait | source imported | ernst-mach-1900 | deleted |
| 08 | legacy-wordpress-eso1122a-a9ce8855f3.jpg | ESO eso1122a most distant quasar artwork | source imported | eso1122a-most-distant-quasar | deleted |
| 09 | legacy-wordpress-fb8d054b-2862-4b13-8b00-ee9d695a354e-1912-00000234e676e2ef-file-d2c2a86b8e.jpg | Planck-law / ultraviolet-catastrophe graph | no reusable source found | not imported; generic graph can be regenerated if needed | deleted |
| 10 | legacy-wordpress-georges-lemaitre-1930s-ae323c65ec.jpg | Georges Lemaitre portrait | source imported | georges-lemaitre-1930 | deleted |
| 11 | legacy-wordpress-history-of-the-universe-2015-c18ae04235.jpg | PDG/LBNL 2015 History of the Universe graphic | source identified, not imported | PDG/LBNL copyright statement visible; WMAP facsimiles imported instead | deleted |
| 12 | legacy-wordpress-image-1-b2923a2d46.png | NSF universe timeline graphic | source identified, not imported | NSF watermark visible; WMAP facsimiles imported instead | deleted |
| 13 | legacy-wordpress-image-1-b7fc190f94.png | Feynman diagram of gluon radiation | facsimile/source imported, then pruned | no active replacement currently retained | deleted |
| 14 | legacy-wordpress-image-1-c49bc9019e.png | particle-track / bubble-chamber image | facsimile imported, then pruned | no active replacement currently retained | deleted |
| 15 | legacy-wordpress-image-139cf82283.png | gravity-well comparison graphic | no reusable source found | not imported | deleted |
| 16 | legacy-wordpress-image-18-04ff1c49b0.png | magnetic-field / moving-charge diagram | facsimile imported, then pruned | no active replacement currently retained | deleted |
| 17 | legacy-wordpress-image-18-0c46f29693.png | force-unification / early-universe timeline | facsimile imported | cmb-timeline-no-wmap; universe-evolution-wmap | deleted |
| 18 | legacy-wordpress-image-2-0d62855965.png | Drake-equation / astrobiology poster | no reusable source found | not imported; likely poster/composite with unclear rights | deleted |
| 19 | legacy-wordpress-image-2-2a9f61d14f.png | Solvay Conference screenshot | existing source already available | existing asset solvay-conference-1927-restored covers subject | deleted |
| 20 | legacy-wordpress-image-2-69e4f408ff.png | recycling supermassive-black-hole artwork | facsimile imported | active-galactic-nucleus-accretion-disk-torus | deleted |
| 21 | legacy-wordpress-image-3-644abbea7a.png | black-hole infographic | facsimile imported | active-galactic-nucleus-accretion-disk-torus | deleted |
| 22 | legacy-wordpress-image-3-87ede6f0a1.png | Ptolemaic-system diagram | source candidate identified, not imported | Wikimedia Commons `Ptolemaic_system_2_(PSF).png` was rate-limited; logged only | deleted |
| 23 | legacy-wordpress-image-3-e23de7173b.png | Standard Model particle chart | existing source already available | existing asset standard-model-elementary-particles covers subject | deleted |
| 24 | legacy-wordpress-image-30-fcc6a18b1e.png | plot stack / waveform screenshot | no reusable source found | not imported | deleted |
| 25 | legacy-wordpress-image-33-de5e6f4298.png | John Wheeler quote card | source avoided | not imported; quote-card provenance/rights unclear | deleted |
| 26 | legacy-wordpress-image-3332d9a3e2.jpg | Penzias/Wilson horn-antenna photo | facsimile imported | holmdel-horn-antenna-restoration | deleted |
| 27 | legacy-wordpress-image-36ab23176c.png | FCC vs HCP crystal-packing diagram | no reusable source found | not imported; better to regenerate if needed | deleted |
| 28 | legacy-wordpress-image-5-2a3e2b1b4b.png | fundamental-forces timeline graphic | facsimile imported | cmb-timeline-no-wmap; universe-evolution-wmap | deleted |
| 29 | legacy-wordpress-image-5-d457a5fb40.png | AGN/blazar jet diagram | facsimile imported | active-galactic-nucleus-accretion-disk-torus | deleted |
| 30 | legacy-wordpress-image-5-e5d9ef08ab.png | stellar-fusion/onion-shell diagram | no reusable source found | not imported | deleted |
| 31 | legacy-wordpress-image-6-59b5f56049.png | vertical universe timeline | facsimile imported | cmb-timeline-no-wmap; universe-evolution-wmap | deleted |
| 32 | legacy-wordpress-image-6def264d78.png | electrodynamics textbook path-history diagram | facsimile imported, then pruned | no active replacement currently retained | deleted |
| 33 | legacy-wordpress-image-8-b914eeabe9.png | fundamental-forces timeline graphic | facsimile imported | cmb-timeline-no-wmap; universe-evolution-wmap | deleted |
| 34 | legacy-wordpress-image-9-05d44b83d6.png | hand-drawn expansion/constraint sketch | no reusable source found | likely custom/source-note sketch; no import | deleted |
| 35 | legacy-wordpress-image-9-09eb0531af.png | quark/gluon proton-spin style diagram | no reusable source found | not imported | deleted |
| 36 | legacy-wordpress-img-0136-ee28a39485.jpg | Murray Gell-Mann SFI photo | source identified, not imported | SFI/Minesh Bacrania credit visible; no reusable license confirmed | deleted |
| 37 | legacy-wordpress-img-0534-43d8b20b48.png | electromagnetic wave diagram | source candidate identified, not imported | Wikimedia Commons `Electromagnetic_wave_EN.svg` was rate-limited; logged only | deleted |
| 38 | legacy-wordpress-murray1-74f0688cfc.jpg | Murray Gell-Mann portrait | source candidates identified, not imported | AIP/Commons and Lection facsimiles found but rate-limited during download | deleted |
| 39 | legacy-wordpress-murray2-5e17e4468a.jpg | Murray Gell-Mann blackboard photo | source imported | murray-gell-mann-1965 | deleted |
| 40 | legacy-wordpress-murray4-42bff8c27b.jpg | Murray Gell-Mann seated portrait | source candidates identified, not imported | AIP/Commons facsimile found but rate-limited during download | deleted |
| 41 | legacy-wordpress-murray5-b523a89c50.jpg | Murray Gell-Mann portrait | source candidates identified, not imported | AIP/Commons facsimile found but rate-limited during download | deleted |
| 42 | legacy-wordpress-planckwiki-f8dfadac68.png | Max Planck Wikipedia screenshot | facsimile imported | max-planck-hugo-erfurth-1938 | deleted |
| 43 | legacy-wordpress-quantum-fluctuations-f5fb96edad.gif | Quantum fluctuations visualization | source imported | quantum-fluctuations-leinweber | deleted |

## Notes

- Images with visible PDG/LBNL, NSF, SFI, quote-card, textbook, or generic web-composite provenance were not treated as reusable assets unless an explicit free/public source was identified.
- Existing registry entries already cover the Solvay Conference and Standard Model particle chart subjects, so the matching legacy screenshots were deleted without duplicate imports.
- Several likely custom/generated conceptual sketches were deleted without internet replacements because no authoritative base image was found and the visual content is better regenerated as project-owned diagrams if needed.
- Wikimedia returned `429 Too Many Requests` for several later original-file downloads. Those source candidates are logged in the table rather than registered as local assets.

## Next Source-Mining Target

No legacy WordPress blog-image archive files remain in `content/assets/images/legacy-wordpress/`. Future source-mining should use the approved image-library entries in `content/assets/images/images.json` or regenerate project-owned diagrams rather than restoring pruned WordPress uploads.
