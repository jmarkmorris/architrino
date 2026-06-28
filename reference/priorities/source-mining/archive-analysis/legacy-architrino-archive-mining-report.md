# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update durable completion status, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in `/tmp` artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-06-27 |
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
| Complete in durable table | 119 |
| Open in durable table | 260 |
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
| likely captured | 625 |
| partially captured | 211 |
| needs review | 4 |
| historical review | 1 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 2, partial 62, likely 165 | 189 | gravity, physicists, field, einstein, aether, imagine | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2021-06-01 [Draw Freely Upon Your Imagination](https://architrino.wordpress.com/2021/06/01/draw-freely-upon-your-imagination/) (open)<br>2020-07-18 [Superfluid Vacuum Theory](https://architrino.wordpress.com/2020/07/18/superfluid-vacuum-theory/) (open)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) (open) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 0, partial 30, likely 103 | 138 | galaxy, expansion, cosmology, bang, galaxies, planck | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2019-07-16 [Cosmic Inflation is Wrong. Long Live Inflation!](https://architrino.wordpress.com/2019/07/16/cosmic-inflation-is-wrong-long-live-inflation/) (open)<br>2020-06-18 [Particle Rain](https://architrino.wordpress.com/2020/06/18/particle-rain/) (open)<br>2020-08-28 [Big Bang vs. Steady State](https://architrino.wordpress.com/2020/08/28/dr-becky-big-bang-vs-steady-state/) (open) |
| 3 | Standard Model assembly and particle mappings | needs review 0, partial 31, likely 108 | 102 | mass, field, noether, binaries, binary, physicists | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2022-06-07 [Radioactivity and the Drake Equation](https://architrino.wordpress.com/2022/06/07/radioactivity-and-the-drake-equation/) (open)<br>2021-05-29 [Lee Smolin : The Trouble with Physics](https://architrino.wordpress.com/2021/05/29/lee-smolin-the-trouble-with-physics/) (open)<br>2021-12-06 [Bohr and Heisenberg : Plasma-Ten](https://architrino.wordpress.com/2021/12/06/bohr-and-heisenberg-plasma-ten/) (open) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 0, partial 22, likely 93 | 78 | binary, noether, binaries, core, potential, three | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2022-08-10 [The Messenger and Dr. Donald C. Chang](https://architrino.wordpress.com/2022/08/10/themessenger-and-dr-donald-c-chang/) (open)<br>2021-04-21 [Triton Station : Hostile Readers](https://architrino.wordpress.com/2021/04/21/npqg-april-21-2021/) (open)<br>2022-01-18 [Imagine a Photon](https://architrino.wordpress.com/2022/01/18/is-the-patchwork-quilt-of-physics-and-cosmology-isomorphic-to-the-point-charge-universe/) (open) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 17, likely 38 | 67 | black, planck, hole, holes, core, galaxy | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2019-06-27 [Mapping Galaxy Rotation Dynamics](https://architrino.wordpress.com/2019/06/27/can-supermassive-black-holes-explain-galaxy-rotation-curves/) (open)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/) (open)<br>2021-05-06 [Black Holes and Planck Cores](https://architrino.wordpress.com/2021/05/06/black-holes-and-planck-cores/) (open) |
| 6 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 10, likely 36 | 43 | mechanics, physicists, reality, photon, were, field | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2022-09-24 [Quantum Theory](https://architrino.wordpress.com/2022/09/24/quantum-theory/) (open)<br>2022-01-18 [Imagine a Photon](https://architrino.wordpress.com/2022/01/18/is-the-patchwork-quilt-of-physics-and-cosmology-isomorphic-to-the-point-charge-universe/) (open) |
| 7 | Thermodynamics, radiation, entropy, and spectra | needs review 1, partial 8, likely 9 | 13 | temperature, field, form, nobel, kinetic, services | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2020-08-08 [Revisiting Nobel Prize Research](https://architrino.wordpress.com/2020/08/08/revisiting-nobel-prize-research/) (complete)<br>2020-08-19 [A Pleasant Conversation with a Physicist](https://architrino.wordpress.com/2020/08/19/a-pleasant-conversation-with-a-physicist/) (open)<br>2021-11-25 [Steady State Cosmological Models](https://architrino.wordpress.com/2021/11/25/helge-kragh-steady-state-cosmological-models/) (open) |
| 8 | Master equation, causal wakes, and potential/action | needs review 0, partial 3, likely 43 | 11 | potential, field, velocity, dirac, potentials, path | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/) (open)<br>2022-03-07 [Point Potential Action and Self Action](https://architrino.wordpress.com/2022/03/07/point-charge-action-and-self-action/) (complete)<br>2022-02-26 [The Orbiting Point Charge Binary IV](https://architrino.wordpress.com/2022/02/26/orbiting-point-charge-action/) (complete) |
| 9 | Philosophy, history of science, and method | needs review 0, partial 15, likely 15 | 16 | physicists, cosmology, field, well, were, science | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-09 [NPQG in Wonderland](https://architrino.wordpress.com/2020/07/09/npqg-in-wonderland/) (open)<br>2022-09-07 [Innovation Contest](https://architrino.wordpress.com/2022/09/07/innovation-contest/) (open)<br>2020-08-15 [Hostility and Bullying are Endemic in Physics and Cosmology](https://architrino.wordpress.com/2020/08/15/hostility-and-bullying-are-endemic-in-physics-and-cosmology/) (open) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 10, likely 10 | 12 | physicists, well, energetic, government, science, system | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/) (open)<br>2019-06-26 [Physics Outreach Books](https://architrino.wordpress.com/2019/06/26/recommended-physics-books/) (open)<br>2020-12-17 [December 17, 2020](https://architrino.wordpress.com/2020/12/17/npqg-december-17-2020/) (open) |
| 11 | External theory mapping and source leads | needs review 0, partial 3, likely 5 | 6 | qcd, father, wilkes-barre, reality, were, deeper | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2022-08-05 [Mapping from Lattice QCD](https://architrino.wordpress.com/2022/08/05/lattice-qcd/) (open)<br>2022-01-14 [Dear MIT : Physics Needs an Intervention](https://architrino.wordpress.com/2022/01/14/dear-mit-physics-needs-a-compassionate-intervention/) (complete) |

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
