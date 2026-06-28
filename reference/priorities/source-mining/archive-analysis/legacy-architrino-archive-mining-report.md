# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in platform temporary artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-06-28 |
| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |
| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |
| Posts retrieved | `379` |
| Idea cards | `1030` |
| Idea clusters | `840` |
| Durable post registry JSONL | `reference/priorities/source-mining/legacy-architrino-wordpress-posts.jsonl` |
| Local post cache JSONL | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-posts.jsonl` |
| Local idea-card JSONL | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-idea-cards.jsonl` |
| Local cluster JSON | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-clusters.json` |
| Local clean-text directory | `${TMPDIR:-/tmp}/architrino-archive-mining/clean-text` |

## Method

The pass retrieves public WordPress records, strips HTML into local text artifacts, segments posts into idea cards, applies a deterministic topic taxonomy, groups similar cards by keyword-set overlap, flags legacy terminology and high-risk language, and compares cluster terms against `content/markdown/aaa` plus `reference/priorities`. Coverage labels are triage hints only.

## Inventory

| Metric | Count |
| --- | ---: |
| Posts | 379 |
| Posts with visible legacy `MINED` marker in API HTML or metadata, non-authoritative | 0 |
| Cards carrying legacy terminology flags | 823 |
| Cards carrying speculation markers | 515 |
| Cards carrying polemic markers | 114 |
| Cards carrying abandoned/corrected markers | 22 |

## Year Counts

| Year | Posts |
| --- | ---: |
| 2026 | 4 |
| 2025 | 2 |
| 2024 | 24 |
| 2023 | 20 |
| 2022 | 104 |
| 2021 | 70 |
| 2020 | 104 |
| 2019 | 48 |
| 2018 | 3 |

## Topic Counts

| Topic | Cards |
| --- | ---: |
| Spacetime medium, gravity, Lorentz, and clock recovery | 267 |
| Cosmology, redshift, CMB, and large-scale history | 173 |
| Standard Model assembly and particle mappings | 160 |
| Noether core, binary, self-hit, and nested shell braid | 152 |
| Black holes, Planck cores, horizons, and strong fields | 81 |
| Master equation, causal wakes, and potential/action | 66 |
| Photon, quantum, measurement, and wavefunction bridges | 49 |
| Philosophy, history of science, and method | 33 |
| AI, simulation, technology, and operational planning | 23 |
| Thermodynamics, radiation, entropy, and spectra | 18 |
| External theory mapping and source leads | 8 |

## Corpus Coverage Snapshot

| Coverage label | Clusters |
| --- | ---: |
| likely captured | 594 |
| partially captured | 242 |
| needs review | 4 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 2, partial 67, likely 160 | 255 | npqg, gravity, euclidean, photon, physicists, potentials | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-05-15 [Introduction to NPQG](https://architrino.wordpress.com/2020/05/15/introduction-to-npqg/)<br>2020-01-20 [Kirsten Hacker : The Walrus and the Carpenter](https://architrino.wordpress.com/2020/01/20/kirsten-hacker-the-walrus-and-the-carpenter/)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 1, partial 42, likely 90 | 162 | galaxy, npqg, bang, smbh, planck, galaxies | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2020-07-18 [Lawrence Krauss : Freeman’s 90th](https://architrino.wordpress.com/2020/07/18/lawrence-krauss-freemans-90th/)<br>2020-12-08 [Dr. Brian Keating : Dr. Janna Levin](https://architrino.wordpress.com/2020/12/08/dr-brian-keating-dr-janna-levin/)<br>2021-06-18 [Triton Station : Despondency](https://architrino.wordpress.com/2021/06/18/despondency-at-triton-station/) |
| 3 | Standard Model assembly and particle mappings | needs review 0, partial 39, likely 99 | 152 | noether, force, mass, higgs, physicists, cores | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2021-09-11 [Dear Particle Data Group](https://architrino.wordpress.com/2021/09/11/dear-particle-data-group/)<br>2022-03-18 [Dynamical Eight Ball](https://architrino.wordpress.com/2022/03/18/dynamical-eight-ball/)<br>2022-03-10 [Mapping to E8](https://architrino.wordpress.com/2022/03/10/e8-is-a-red-herring/) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 0, partial 26, likely 88 | 145 | core, noether, binary, binaries, potential, radius | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2024-10-27 [Spacetime Assembly Emission](https://architrino.wordpress.com/2024/10/27/spacetime-assembly-emission/)<br>2021-01-31 [Triton Station : Ivory Tower](https://architrino.wordpress.com/2021/01/31/npqg-february-1-2021-dr-stacy-mcgaugh-triton-station/)<br>2022-03-22 [Sara Walker : Life : Lex Fridman](https://architrino.wordpress.com/2022/03/22/sara-walker-life-lex-fridman/) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 16, likely 39 | 78 | core, black, planck, hole, smbh, holes | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2020-04-30 [Kirsten Hacker : Black Hole Sun](https://architrino.wordpress.com/2020/04/30/kirsten-hacker-black-hole-sun/)<br>2019-06-15 [Does a Black Hole Shrink While Jetting Planck Plasma?](https://architrino.wordpress.com/2019/06/15/does-a-black-hole-shrink-while-jetting-planck-plasma/)<br>2021-05-06 [Black Holes and Planck Cores](https://architrino.wordpress.com/2021/05/06/black-holes-and-planck-cores/) |
| 6 | Master equation, causal wakes, and potential/action | needs review 0, partial 5, likely 41 | 59 | potential, potentials, sphere, path, speed, action | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-06-06 [Dr. Sabine Hossenfelder : Physics in Crisis](https://architrino.wordpress.com/2020/06/06/dr-sabine-hossenfelder-physics-in-crisis/)<br>2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/)<br>2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/) |
| 7 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 17, likely 29 | 49 | photon, physicists, wave, npqg, mechanics, solution | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-01-05 [Bohmian Mechanics and NPQG II](https://architrino.wordpress.com/2020/01/05/bohmian-mechanics-and-npqg-ii/)<br>2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/)<br>2020-02-12 [Freeman Dyson: Is a Graviton Detectable?](https://architrino.wordpress.com/2020/02/12/freeman-dyson-is-a-graviton-detectable/) |
| 8 | Philosophy, history of science, and method | needs review 0, partial 11, likely 21 | 33 | physicists, scientific, npqg, priors, individuals, solution | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/)<br>2020-08-15 [Hostility and Bullying are Endemic in Physics and Cosmology](https://architrino.wordpress.com/2020/08/15/hostility-and-bullying-are-endemic-in-physics-and-cosmology/)<br>2022-09-07 [Innovation Contest](https://architrino.wordpress.com/2022/09/07/innovation-contest/) |
| 9 | Thermodynamics, radiation, entropy, and spectra | needs review 0, partial 7, likely 11 | 18 | understand, form, context, back, core, waves | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2022-01-20 [Conjecture on Planck’s Law and Wien’s Peaks](https://architrino.wordpress.com/2022/01/20/conjecture-on-plancks-law-wiens-peaks-and-orbiting-point-charge-dipoles/)<br>2020-08-17 [The Trials and Tribulations of an Independent Ideator](https://architrino.wordpress.com/2020/08/17/the-trials-and-tribulations-of-an-independent-ideator/)<br>2020-11-28 [PBS Space Time : “How The Penrose Singularity Theorem Predicts The End of Space Time”](https://architrino.wordpress.com/2020/11/28/pbs-space-time-how-the-penrose-singularity-theorem-predicts-the-end-of-space-time/) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 10, likely 10 | 21 | physicists, intelligent, npqg, gell-mann, cell, work | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/)<br>2020-03-04 [Paul Dirac’s 1963 Scientific American Article](https://architrino.wordpress.com/2020/03/04/response-to-paul-diracs-1963-scientific-american-article/)<br>2020-08-09 [Career Advice](https://architrino.wordpress.com/2020/08/09/career-advice/) |
| 11 | External theory mapping and source leads | needs review 0, partial 2, likely 6 | 8 | euclidean, effective, lattice, qcd, felt, world | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/)<br>2022-02-09 [How to Solve Nature](https://architrino.wordpress.com/2022/02/09/spoiler-alert-solving-nature/)<br>2020-07-01 [Mapping to String Theory](https://architrino.wordpress.com/2020/07/01/does-npqg-inform-string-theory/) |

## Term Normalization Map

| Legacy signal | Current review target |
| --- | --- |
| NPQG | legacy NPQG source framing; translate only durable content into current Architrino Assembly Architecture language |
| point charge | architrino, point transceiver, polarity unit, or point potential depending on context |
| spacetime aether | Noether sea or spacetime medium, with Euclidean void kept distinct from medium contents |
| field | causal wake at substrate level; effective field only in continuum or comparison language |
| legacy source-time potential | causal-delay potential or path-history contribution |
| time dimension | absolute time plus derived clock observables; do not import fundamental spacetime-time ontology |
| personality charge | axial architrino, axial layer, axial pattern, or polarity bookkeeping where current canon supports it |
| dipole | binary when the source means an electrino:positrino base assembly; keep dipole for comparison only |
| wave shell | causal isochron, wake front, or causal wake surface |

## Filtered Historical/High-Risk Material

The archive contains useful history but also legacy ontology, polemic, and abandoned framing. This pass does not import those claims. It keeps them as traceability flags so later ordinary mining can rewrite only durable content in current terminology.

| Risk flag | Idea cards |
| --- | ---: |
| legacy-terminology | 823 |
| speculation-marker | 515 |
| polemic-marker | 114 |
| abandoned-or-corrected-language | 22 |

## Next Operating Modes

1. Use a candidate-gap route for an ordinary post-by-post mining batch, starting with the representative posts.
2. Use topic-sweep mode when the operator asks what the legacy archive says about one concept across many posts.
3. Use the durable registry as the archive inventory, and use source-mining history for pass-specific completion and incorporation events.
