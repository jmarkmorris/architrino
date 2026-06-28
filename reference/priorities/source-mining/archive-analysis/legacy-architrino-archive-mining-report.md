# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update durable completion status, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in `/tmp` artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-06-28 |
| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |
| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |
| Posts retrieved | `379` |
| Idea cards | `1030` |
| Idea clusters | `841` |
| Local post JSONL | `/tmp/architrino-archive-mining/legacy-architrino-posts.jsonl` |
| Local idea-card JSONL | `/tmp/architrino-archive-mining/legacy-architrino-idea-cards.jsonl` |
| Local cluster JSON | `/tmp/architrino-archive-mining/legacy-architrino-clusters.json` |
| Local clean-text directory | `/tmp/architrino-archive-mining/clean-text` |

## Method

The pass retrieves public WordPress records, strips HTML into local text artifacts, segments posts into idea cards, applies a deterministic topic taxonomy, groups similar cards by keyword-set overlap, flags legacy terminology and high-risk language, and compares cluster terms against `content/markdown/aaa` plus `reference/priorities`. Coverage labels are triage hints only.

## Inventory

| Metric | Count |
| --- | ---: |
| Posts | 379 |
| Complete in durable table | 121 |
| Open in durable table | 258 |
| Unknown table status | 0 |
| Posts with visible legacy `MINED` marker in API HTML or metadata, non-authoritative | 114 |
| Cards carrying legacy terminology flags | 823 |
| Cards carrying speculation markers | 516 |
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
| Standard Model assembly and particle mappings | 161 |
| Noether core, binary, self-hit, and nested shell braid | 152 |
| Black holes, Planck cores, horizons, and strong fields | 81 |
| Master equation, causal wakes, and potential/action | 66 |
| Photon, quantum, measurement, and wavefunction bridges | 49 |
| Philosophy, history of science, and method | 32 |
| AI, simulation, technology, and operational planning | 23 |
| Thermodynamics, radiation, entropy, and spectra | 18 |
| External theory mapping and source leads | 8 |

## Corpus Coverage Snapshot

| Coverage label | Clusters |
| --- | ---: |
| likely captured | 596 |
| partially captured | 240 |
| needs review | 4 |
| historical review | 1 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 2, partial 62, likely 165 | 189 | aether, relativity, general, core, mechanics, noether | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-07-18 [Superfluid Vacuum Theory](https://architrino.wordpress.com/2020/07/18/superfluid-vacuum-theory/) (open)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) (open)<br>2020-05-15 [Introduction to NPQG](https://architrino.wordpress.com/2020/05/15/introduction-to-npqg/) (complete) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 1, partial 39, likely 93 | 138 | bang, cosmology, npqg, galaxy, planck, photons | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2020-05-24 [Lawrence Krauss : 5 Minute Physics : Episodes 1 thru 3](https://architrino.wordpress.com/2020/05/24/lawrence-krauss-5-minute-physics-vs-npqg-episodes-1-and-2/) (open)<br>2020-07-19 [Lawrence Krauss : 5 Minute Physics : Episodes 8 thru 11](https://architrino.wordpress.com/2020/07/19/lawrence-krauss-5-minute-physics-vs-npqg-episodes-8-thru-11/) (open)<br>2019-07-16 [Cosmic Inflation is Wrong. Long Live Inflation!](https://architrino.wordpress.com/2019/07/16/cosmic-inflation-is-wrong-long-live-inflation/) (open) |
| 3 | Standard Model assembly and particle mappings | needs review 0, partial 43, likely 96 | 97 | aether, noether, core, cores, structure, force | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2019-06-16 [Mapping Anti-Matter](https://architrino.wordpress.com/2019/06/16/anti-matter-mystery-solved/) (open)<br>2021-11-11 [Physics Guardians in Social Media](https://architrino.wordpress.com/2021/11/11/guardians-of-physics-are-an-embarassment/) (open)<br>2022-09-24 [Dialog with a Fanboi](https://architrino.wordpress.com/2022/09/24/pbs-space-time-convo/) (open) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 0, partial 23, likely 92 | 76 | core, noether, binary, binaries, potential, cores | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2026-06-27 [Unfinished Notes on Bonded Vortices](https://architrino.wordpress.com/2026/06/27/unfinished-notes-on-bonded-vortices/) (open)<br>2021-11-24 [Debate : Alan Guth vs. Roger Penrose](https://architrino.wordpress.com/2021/11/24/debate-alan-guth-vs-roger-penrose/) (open)<br>2020-01-05 [Evidence for Classical Photons](https://architrino.wordpress.com/2020/01/05/evidence-for-classic-photons/) (open) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 10, likely 45 | 67 | core, planck, black, holes, hole, jets | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2019-06-27 [Mapping Galaxy Rotation Dynamics](https://architrino.wordpress.com/2019/06/27/can-supermassive-black-holes-explain-galaxy-rotation-curves/) (open)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/) (open)<br>2021-05-06 [Black Holes and Planck Cores](https://architrino.wordpress.com/2021/05/06/black-holes-and-planck-cores/) (open) |
| 6 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 22, likely 24 | 43 | mechanics, structure, bohm, wave, quantum, polarization | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/) (open)<br>2020-01-05 [Bohmian Mechanics and NPQG II](https://architrino.wordpress.com/2020/01/05/bohmian-mechanics-and-npqg-ii/) (open)<br>2022-01-18 [Imagine a Photon](https://architrino.wordpress.com/2022/01/18/is-the-patchwork-quilt-of-physics-and-cosmology-isomorphic-to-the-point-charge-universe/) (open) |
| 7 | Master equation, causal wakes, and potential/action | needs review 0, partial 9, likely 37 | 11 | potential, velocity, sphere, potentials, path, speed | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/) (open)<br>2020-06-06 [Dr. Sabine Hossenfelder : Physics in Crisis](https://architrino.wordpress.com/2020/06/06/dr-sabine-hossenfelder-physics-in-crisis/) (open)<br>2023-04-04 [Unfinished Notes on Potential Energy, Kinetic Energy, and the Virial Theorem](https://architrino.wordpress.com/2023/04/04/unfinished-notes-on-potential-energy-kinetic-energy-and-the-virial-theorem/) (complete) |
| 8 | Thermodynamics, radiation, entropy, and spectra | needs review 0, partial 8, likely 10 | 13 | temperature, moving, zero, aether, waves, riemannian | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2022-05-30 [Reactions : Disassembly and Reassembly](https://architrino.wordpress.com/2022/05/30/fusion/) (open)<br>2020-08-19 [A Pleasant Conversation with a Physicist](https://architrino.wordpress.com/2020/08/19/a-pleasant-conversation-with-a-physicist/) (open)<br>2021-06-18 [Triton Station : Despondency](https://architrino.wordpress.com/2021/06/18/despondency-at-triton-station/) (open) |
| 9 | Philosophy, history of science, and method | needs review 0, partial 13, likely 17 | 16 | method, cosmology, scientific, even, narratives, given | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-09 [NPQG in Wonderland](https://architrino.wordpress.com/2020/07/09/npqg-in-wonderland/) (open)<br>2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2020-07-01 [Social Media Struggle](https://architrino.wordpress.com/2020/07/01/social-media-struggle/) (open) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 11, likely 9 | 12 | intelligent, npqg, great, institute, level, cell | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/) (open)<br>2021-09-13 [Engaging the Particle Physics Reddit](https://architrino.wordpress.com/2021/09/13/engaging-the-particle-physics-reddit/) (open)<br>2020-03-04 [Paul Dirac’s 1963 Scientific American Article](https://architrino.wordpress.com/2020/03/04/response-to-paul-diracs-1963-scientific-american-article/) (open) |
| 11 | External theory mapping and source leads | needs review 0, partial 0, likely 8 | 6 | qcd, lattice, structures, order, david, deeper | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2022-08-05 [Mapping from Lattice QCD](https://architrino.wordpress.com/2022/08/05/lattice-qcd/) (open)<br>2022-02-09 [How to Solve Nature](https://architrino.wordpress.com/2022/02/09/spoiler-alert-solving-nature/) (open) |

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
| speculation-marker | 516 |
| polemic-marker | 114 |
| abandoned-or-corrected-language | 22 |

## Next Operating Modes

1. Use a candidate-gap route for an ordinary post-by-post mining batch, starting with the representative open posts.
2. Use topic-sweep mode when the operator asks what the legacy archive says about one concept across many posts.
3. Use the `/tmp` JSONL artifacts as the retrieval cache, but keep durable queue and status accounting in `reference/priorities/source-mining/`.
