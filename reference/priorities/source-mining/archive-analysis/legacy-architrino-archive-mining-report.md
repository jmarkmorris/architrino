# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update durable completion status, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in platform temporary artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-06-28 |
| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |
| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |
| Posts retrieved | `379` |
| Idea cards | `1030` |
| Idea clusters | `841` |
| Local post JSONL | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-posts.jsonl` |
| Local idea-card JSONL | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-idea-cards.jsonl` |
| Local cluster JSON | `${TMPDIR:-/tmp}/architrino-archive-mining/legacy-architrino-clusters.json` |
| Local clean-text directory | `${TMPDIR:-/tmp}/architrino-archive-mining/clean-text` |

## Method

The pass retrieves public WordPress records, strips HTML into local text artifacts, segments posts into idea cards, applies a deterministic topic taxonomy, groups similar cards by keyword-set overlap, flags legacy terminology and high-risk language, and compares cluster terms against `content/markdown/aaa` plus `reference/priorities`. Coverage labels are triage hints only.

## Inventory

| Metric | Count |
| --- | ---: |
| Posts | 379 |
| Complete in durable table | 304 |
| Open in durable table | 75 |
| Unknown table status | 0 |
| Posts with visible legacy `MINED` marker in API HTML or metadata, non-authoritative | 0 |
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
| likely captured | 579 |
| partially captured | 257 |
| needs review | 5 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 2, partial 75, likely 152 | 58 | npqg, aether, planck, euclidean, physicists, speed | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-01-20 [Kirsten Hacker : The Walrus and the Carpenter](https://architrino.wordpress.com/2020/01/20/kirsten-hacker-the-walrus-and-the-carpenter/) (open)<br>2020-05-15 [Introduction to NPQG](https://architrino.wordpress.com/2020/05/15/introduction-to-npqg/) (complete)<br>2020-12-14 [Dr. Brian Keating : Dr. Leonard Susskind](https://architrino.wordpress.com/2020/12/14/dr-brian-keating-dr-leonard-susskind/) (open) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 0, partial 40, likely 93 | 37 | npqg, bang, planck, galaxy, galaxies, expansion | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2020-05-23 [Lawrence Krauss : 5 Minute Physics : Episode 26](https://architrino.wordpress.com/2020/05/23/lawrence-krauss-5-minute-physics-episode-26/) (open)<br>2020-07-18 [Lawrence Krauss : 5 Minute Physics : Episodes 24 thru 25](https://architrino.wordpress.com/2020/07/18/lawrence-krauss-5-minute-physics-vs-npqg-episodes-24-thru-25/) (open)<br>2020-07-19 [Lawrence Krauss : 5 Minute Physics : Episodes 8 thru 11](https://architrino.wordpress.com/2020/07/19/lawrence-krauss-5-minute-physics-vs-npqg-episodes-8-thru-11/) (open) |
| 3 | Standard Model assembly and particle mappings | needs review 0, partial 43, likely 95 | 15 | mass, binaries, aether, npqg, noether, physicists | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2020-12-24 [December 24, 2020 : Morning Edition](https://architrino.wordpress.com/2020/12/24/npqg-december-24-2020-morning-edition/) (open)<br>2020-12-18 [NPQG : December 18, 2020](https://architrino.wordpress.com/2020/12/18/npqg-december-18-2020/) (open)<br>2020-12-24 [December 24, 2020 : Evening Edition](https://architrino.wordpress.com/2020/12/24/npqg-december-24-2020-evening-edition/) (open) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 1, partial 23, likely 91 | 21 | binaries, core, noether, binary, planck, potential | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-11-24 [Debate : Alan Guth vs. Roger Penrose](https://architrino.wordpress.com/2021/11/24/debate-alan-guth-vs-roger-penrose/) (complete)<br>2026-06-27 [Unfinished Notes on Bonded Vortices](https://architrino.wordpress.com/2026/06/27/unfinished-notes-on-bonded-vortices/) (open)<br>2020-02-04 [Garrett Lisi and Eric Weinstein on The Portal #015](https://architrino.wordpress.com/2020/02/04/garrett-lisi-and-eric-weinstein-on-the-portal-015/) (open) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 16, likely 39 | 23 | planck, black, hole, core, galaxy, npqg | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2020-04-30 [Kirsten Hacker : Black Hole Sun](https://architrino.wordpress.com/2020/04/30/kirsten-hacker-black-hole-sun/) (open)<br>2019-10-14 [Kirsten Hacker : Blue Skies](https://architrino.wordpress.com/2019/10/14/kirsten-hacker-blue-skies/) (open)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/) (open) |
| 6 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 19, likely 27 | 4 | wave, bohm, npqg, structure, physicists, mechanics | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/) (open)<br>2020-01-05 [Bohmian Mechanics and NPQG II](https://architrino.wordpress.com/2020/01/05/bohmian-mechanics-and-npqg-ii/) (complete)<br>2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (complete) |
| 7 | Master equation, causal wakes, and potential/action | needs review 0, partial 8, likely 38 | 3 | potential, speed, path, sphere, velocity, potentials | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/) (open)<br>2020-06-06 [Dr. Sabine Hossenfelder : Physics in Crisis](https://architrino.wordpress.com/2020/06/06/dr-sabine-hossenfelder-physics-in-crisis/) (open)<br>2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/) (open) |
| 8 | Thermodynamics, radiation, entropy, and spectra | needs review 0, partial 6, likely 12 | 7 | planck, kinetic, npqg, prize, back, fundamental | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2020-11-28 [PBS Space Time : “How The Penrose Singularity Theorem Predicts The End of Space Time”](https://architrino.wordpress.com/2020/11/28/pbs-space-time-how-the-penrose-singularity-theorem-predicts-the-end-of-space-time/) (open)<br>2020-08-08 [Revisiting Nobel Prize Research](https://architrino.wordpress.com/2020/08/08/revisiting-nobel-prize-research/) (complete)<br>2020-05-22 [Radiation and Radioactivity](https://architrino.wordpress.com/2020/05/22/radiation-and-radioactivity/) (complete) |
| 9 | AI, simulation, technology, and operational planning | needs review 2, partial 13, likely 6 | 6 | npqg, physicists, knowledge, injustice, government, work | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/) (open)<br>2020-08-09 [Career Advice](https://architrino.wordpress.com/2020/08/09/career-advice/) (open)<br>2019-06-26 [Physics Outreach Books](https://architrino.wordpress.com/2019/06/26/recommended-physics-books/) (open) |
| 10 | Philosophy, history of science, and method | needs review 0, partial 12, likely 20 | 6 | physicists, method, npqg, science, knowledge, priors | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-09 [NPQG in Wonderland](https://architrino.wordpress.com/2020/07/09/npqg-in-wonderland/) (open)<br>2022-03-24 [J Mark Morris : Is it Me?](https://architrino.wordpress.com/2022/03/24/j-mark-morris-aita/) (complete)<br>2020-02-13 [NPQG: Resistance is Futile](https://architrino.wordpress.com/2020/02/13/npqg-resistance-is-futile/) (open) |
| 11 | External theory mapping and source leads | needs review 0, partial 2, likely 6 | 0 | path, euclidean, first, bohm, order, unhappy | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (complete)<br>2020-07-01 [Mapping to String Theory](https://architrino.wordpress.com/2020/07/01/does-npqg-inform-string-theory/) (complete)<br>2022-01-14 [Dear MIT : Physics Needs an Intervention](https://architrino.wordpress.com/2022/01/14/dear-mit-physics-needs-a-compassionate-intervention/) (complete) |

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
3. Use the platform temporary JSONL artifacts as the retrieval cache, but keep durable queue and status accounting in `reference/priorities/source-mining/`.
