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
| Complete in durable table | 126 |
| Open in durable table | 252 |
| Unknown table status | 1 |
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
| likely captured | 654 |
| partially captured | 183 |
| needs review | 3 |
| historical review | 1 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 0, partial 49, likely 180 | 185 | quantum, speed, general, field, fields, fundamental | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-07-18 [Superfluid Vacuum Theory](https://architrino.wordpress.com/2020/07/18/superfluid-vacuum-theory/) (open)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) (open)<br>2021-01-07 [Bubbly Bubbles](https://architrino.wordpress.com/2021/01/07/npqg-january-7-2020-bubbly-bubbles/) (open) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 1, partial 31, likely 101 | 138 | bang, expansion, galaxy, photons, npqg, planck | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2019-07-16 [Cosmic Inflation is Wrong. Long Live Inflation!](https://architrino.wordpress.com/2019/07/16/cosmic-inflation-is-wrong-long-live-inflation/) (open)<br>2020-06-18 [Particle Rain](https://architrino.wordpress.com/2020/06/18/particle-rain/) (open)<br>2020-08-28 [Big Bang vs. Steady State](https://architrino.wordpress.com/2020/08/28/dr-becky-big-bang-vs-steady-state/) (open) |
| 3 | Standard Model assembly and particle mappings | needs review 0, partial 30, likely 109 | 95 | mass, field, noether, higgs, ideas, aether | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2022-08-10 [The Messenger and Dr. Donald C. Chang](https://architrino.wordpress.com/2022/08/10/themessenger-and-dr-donald-c-chang/) (open)<br>2022-03-10 [Mapping to E8](https://architrino.wordpress.com/2022/03/10/e8-is-a-red-herring/) (open)<br>2021-05-29 [Lee Smolin : The Trouble with Physics](https://architrino.wordpress.com/2021/05/29/lee-smolin-the-trouble-with-physics/) (open) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 0, partial 24, likely 91 | 73 | binaries, noether, core, binary, potential, field | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-04-29 [Triton Station : Eerily Quiet](https://architrino.wordpress.com/2021/04/29/npqg-april-29-2021-triton-station-eerily-quiet/) (open)<br>2020-12-28 [December 28, 2020 : Morning Edition](https://architrino.wordpress.com/2020/12/28/npqg-december-28-2020-morning-edition/) (open)<br>2020-08-17 [The Trials and Tribulations of an Independent Ideator](https://architrino.wordpress.com/2020/08/17/the-trials-and-tribulations-of-an-independent-ideator/) (open) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 11, likely 44 | 66 | black, planck, hole, core, holes, jets | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2019-06-27 [Mapping Galaxy Rotation Dynamics](https://architrino.wordpress.com/2019/06/27/can-supermassive-black-holes-explain-galaxy-rotation-curves/) (open)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/) (open)<br>2021-05-06 [Black Holes and Planck Cores](https://architrino.wordpress.com/2021/05/06/black-holes-and-planck-cores/) (open) |
| 6 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 12, likely 34 | 43 | quantum, wave, reality, field, physicists, something | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2020-02-12 [Freeman Dyson: Is a Graviton Detectable?](https://architrino.wordpress.com/2020/02/12/freeman-dyson-is-a-graviton-detectable/) (open)<br>2021-01-01 [Dr. Brian Keating : Dr. Max Tegmark and Dr. Eric Weinstein](https://architrino.wordpress.com/2021/01/01/dr-brian-keating-dr-max-tegmark-and-dr-eric-weinstein/) (open) |
| 7 | Master equation, causal wakes, and potential/action | needs review 0, partial 3, likely 43 | 11 | speed, potential, field, velocity, path, sphere | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/) (open)<br>2023-04-04 [Unfinished Notes on Potential Energy, Kinetic Energy, and the Virial Theorem](https://architrino.wordpress.com/2023/04/04/unfinished-notes-on-potential-energy-kinetic-energy-and-the-virial-theorem/) (complete)<br>2022-04-09 [Assembly Redux](https://architrino.wordpress.com/2022/04/09/assembly-redux/) (complete) |
| 8 | Thermodynamics, radiation, entropy, and spectra | needs review 1, partial 2, likely 15 | 13 | temperature, understand, field, fields, state, certain | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2020-08-08 [Revisiting Nobel Prize Research](https://architrino.wordpress.com/2020/08/08/revisiting-nobel-prize-research/) (complete)<br>2021-11-25 [Steady State Cosmological Models](https://architrino.wordpress.com/2021/11/25/helge-kragh-steady-state-cosmological-models/) (open)<br>2020-08-17 [The Trials and Tribulations of an Independent Ideator](https://architrino.wordpress.com/2020/08/17/the-trials-and-tribulations-of-an-independent-ideator/) (open) |
| 9 | Philosophy, history of science, and method | needs review 0, partial 10, likely 20 | 15 | priors, ideas, even, field, someone, physicists | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-09 [NPQG in Wonderland](https://architrino.wordpress.com/2020/07/09/npqg-in-wonderland/) (open)<br>2020-08-15 [Hostility and Bullying are Endemic in Physics and Cosmology](https://architrino.wordpress.com/2020/08/15/hostility-and-bullying-are-endemic-in-physics-and-cosmology/) (open)<br>2022-09-07 [Innovation Contest](https://architrino.wordpress.com/2022/09/07/innovation-contest/) (open) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 10, likely 10 | 12 | well, scale, research, gell-mann, development, life | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/) (open)<br>2020-03-04 [Paul Dirac’s 1963 Scientific American Article](https://architrino.wordpress.com/2020/03/04/response-to-paul-diracs-1963-scientific-american-article/) (open)<br>2020-08-09 [Career Advice](https://architrino.wordpress.com/2020/08/09/career-advice/) (open) |
| 11 | External theory mapping and source leads | needs review 0, partial 1, likely 7 | 6 | path, reality, order, david, wilkes-barre, called | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2022-02-09 [How to Solve Nature](https://architrino.wordpress.com/2022/02/09/spoiler-alert-solving-nature/) (open)<br>2020-07-01 [Mapping to String Theory](https://architrino.wordpress.com/2020/07/01/does-npqg-inform-string-theory/) (open) |

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
