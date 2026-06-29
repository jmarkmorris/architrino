# Legacy WordPress Image Provenance Sweep

Date: June 28, 2026

## Scope

Swept the live Architrino WordPress posts listed in `reference/priorities/source-mining/legacy-architrino-wordpress-posts.jsonl` for rendered post images and featured-image URLs. Formula renderers, Wikimedia math-render SVGs, and Amazon ad widgets were excluded from the asset import.

## Local Asset Result

- Distinct non-formula image groups scanned: 596 after grouping repeated resized URLs.
- Initial local legacy WordPress assets cataloged in `content/assets/images/images.json`: 569.
- Cleanup after operator request removed 232 images from the local scan set: 158 obvious Architrino-created illustrations, 6 approved Wikimedia/public-domain imports, and 68 imported third-party/public-source images with explicit source provenance.
- Remaining local review set: 337 ambiguous WordPress-upload images, all `needs-review` and `source.sourceKind: wordpress-upload`.

## Project-Owned Illustration Handling

A visual contact-sheet pass identified 158 obvious Architrino-created diagrams, slides, and theory illustrations. After the operator request to delete generated/project-owned images from the review set, those local files and manifest entries were removed.

Ambiguous WordPress uploads remain `needs-review`, especially screenshots, photos, composites, possible public-source science images, book covers, retail images, and generic `image-N` uploads whose origin is not visually clear.

## Repaired Failed Imports

- Repaired stale Quanta CloudFront image URL to `https://www.quantamagazine.org/wp-content/uploads/2020/08/Bouncing-Universe-2880x1620-Lede.jpg`.
- Repaired MIT image URL by percent-encoding spaces in the filename.
- Added the already downloaded Wixmp/DeviantArt CDN image after raising PNG metadata parsing limits for that one manifest entry.
- These repaired/imported third-party images were later removed from the local scan set after the operator requested deletion of images with provenance.

## Remaining Unresolved Inputs

These source images were detected in live posts but are not yet imported as local files. Wikimedia originals were identified, but `upload.wikimedia.org` returned repeated `429 Too Many Requests` responses with retry windows during this run. Other failures are stale, blocked, or non-image hotlinks that need a separate source repair pass.

Targeted web searches for the stale non-Wikimedia filenames and visible source clues did not return high-confidence replacement file URLs during this pass.

| Source URL | First matched post | Failure class |
| --- | --- | --- |
| `https://i0.wp.com/physics.uoregon.edu/~jimbrau/BrauImNew/Chap11/7th/AT_7e_Figure_11_12.jpg` | Black Holes are Not Opaque | source returned HTML instead of image |
| `https://i0.wp.com/www.naturalphilosophy.org/site/rayflemming/wp-content/uploads/sites/40/2015/03/mmexp.jpg` | Missed Opportunities to Discover Nature | stale source URL / not found |
| `https://kbimages1-a.akamaihd.net/0585f992-7347-446e-a11a-e64852484cb6/1200/1200/False/the-structure-of-scientific-revolutions.jpg` | T-3, T-2, T-1, NPQG Liftoff!? | <HTTPError 400: 'Bad Request'> |
| `https://resize.hswstatic.com/w_796/gif/alchemy.jpg` | Let’s Get On With It! | stale source URL / not found |
| `https://upload.wikimedia.org/wikipedia/commons/8/8a/Electromagnetic-Spectrum.png` | Radiation and Radioactivity | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/b/b1/Diagram_of_the_Water_Cycle.jpg` | Particle Rain | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/c/c6/Spiral_mollusc_shell.jpg` | Orbital Dualities | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/f/fa/Boltzmann_equation.JPG` | Kirsten Hacker : Blue Skies | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Houghton_Typ_520.03.736_-_Margarita_philosophica.jpg/462px-Houghton_Typ_520.03.736_-_Margarita_philosophica.jpg` | Orbits of Moving Orbs | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/E8Petrie.svg/2039px-E8Petrie.svg.png` | Triton Station : Eerily Quiet | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/PowerSpectrumExt.svg/2560px-PowerSpectrumExt.svg.png` | What Really Causes the CMB? | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/EarthGravityPREM.svg/2560px-EarthGravityPREM.svg.png` | Gravity and the Energy of Spacetime Æther | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Redshift.svg/200px-Redshift.svg.png` | Mapping Redshift | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/700px-Solvay_conference_1927.jpg` | Missed Opportunities to Discover Nature | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sonnenblume_Helianthus_2.JPG/600px-Sonnenblume_Helianthus_2.JPG` | Orbital Dualities | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Neutron_star_cross_section.svg/1200px-Neutron_star_cross_section.svg.png` | Black Holes are Not Opaque | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Helium_Nucleus.svg/1200px-Helium_Nucleus.svg.png` | Superposition and Survival | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fermat_Snellius.svg/2560px-Fermat_Snellius.svg.png` | A Photon is Both Particles and Waves! | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Hydrogen_Density_Plots.png/1126px-Hydrogen_Density_Plots.png` | Orbital Dualities | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bryce_Canyon_Amphitheater_Hoodoos_Panorama.jpg/800px-Bryce_Canyon_Amphitheater_Hoodoos_Panorama.jpg` | Absolute Distance and the Path of a Photon | Wikimedia file-host rate limit; original URL captured for retry |
| `https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Front_view_of_the_European_Space_Agency_Planck_satellite.jpg/250px-Front_view_of_the_European_Space_Agency_Planck_satellite.jpg` | The Planck Satellite CMB Data | Wikimedia file-host rate limit; original URL captured for retry |
| `https://www.atticusrarebooks.com/pictures/medium/124.1.jpg` | Bohmian Mechanics and NPQG III | stale source URL / not found |
| `https://www.e-education.psu.edu/astro801/sites/www.e-education.psu.edu.astro801/files/image/hubblesite_tuning_fork.jpg` | New Ideas on Galaxy Dynamics | stale source URL / not found |
| `https://www.fsu.edu/.element/ssi/section/4.0/Articles/lead.dirac/DiracYoung.jpg` | Paul Dirac’s 1963 Scientific American Article | stale source URL / not found |
| `https://www.gaslampevent.com/wp-content/uploads/2018/03/bing-crosby.jpg` | Let’s Get On With It! | stale source URL / not found |
| `https://www.researchgate.net/profile/Valerio-Pascucci/publication/233733601/figure/fig1/AS:393543030984714@1470839378588/Down-sampling-the-nested-spheres-Compare-a-original-data-with-down-samplings-at-128-3.png` | Orbits of Moving Orbs | blocked source URL |
| `https://www.universetoday.com/wp-content/uploads/2011/05/WISE.jpg` | New Ideas on Galaxy Dynamics | source returned HTML instead of image |

## Working Artifacts

- `/tmp/architrino_wp_image_scan.json`: live WordPress API image scan.
- `/tmp/architrino_wp_image_groups.json`: grouped image URL inventory.
- `/tmp/architrino_wp_image_import_report.json`: first-pass import report.
- `/tmp/architrino_wikimedia_retry_list.json`: exact Wikimedia originals queued for a later low-rate retry.
- `/tmp/architrino_wp_contact_sheets/`: visual review sheets used to classify project-owned illustrations.

## Next Source-Mining Target

Operator scan the 337 remaining ambiguous WordPress-upload images under `content/assets/images/legacy-wordpress/`. Retry only the 17 Wikimedia originals after the file-host rate limit has cleared if those specific public-source images are still needed later.
