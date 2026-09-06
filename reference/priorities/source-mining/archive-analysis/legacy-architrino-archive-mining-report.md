# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in platform temporary artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-07-04 |
| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |
| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |
| Posts retrieved | `379` |
| Idea cards | `1030` |
| Idea clusters | `840` |
| Durable post registry JSONL | `reference/priorities/source-mining/archive-analysis/legacy-architrino-wordpress-posts.jsonl` |
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
| Spacetime medium, gravity, Lorentz, and clock recovery | 274 |
| Cosmology, redshift, CMB, and large-scale history | 173 |
| Standard Model assembly and particle mappings | 165 |
| Noether braid, binary, self-hit, and nested shell braid | 137 |
| Black holes, Planck cores, horizons, and strong fields | 82 |
| Master equation, causal wakes, and potential/action | 68 |
| Photon, quantum, measurement, and wavefunction bridges | 49 |
| Philosophy, history of science, and method | 33 |
| AI, simulation, technology, and operational planning | 23 |
| Thermodynamics, radiation, entropy, and spectra | 18 |
| External theory mapping and source leads | 8 |

## Corpus Coverage Snapshot

| Coverage label | Clusters |
| --- | ---: |
| likely captured | 664 |
| partially captured | 174 |
| needs review | 2 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 0, partial 52, likely 181 | 260 | potential, quantum, core, speed, aether, physicists | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-07-06 [The Maps and the Territory](https://architrino.wordpress.com/2020/07/06/the-maps-and-the-territory/)<br>2020-02-15 [Kirsten Hacker : Weary Light](https://architrino.wordpress.com/2020/02/15/kirsten-hacker-weary-light/)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) |
| 2 | Standard Model assembly and particle mappings | needs review 0, partial 29, likely 112 | 158 | binaries, mass, field, binary, braid, noether | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2022-01-19 [Dear PDG, Let’s Talk!](https://architrino.wordpress.com/2022/01/19/dear-pdg-lets-talk/)<br>2021-11-26 [The Orbiting Point Charge Binary III](https://architrino.wordpress.com/2021/11/26/revolutionizing-physics-orbiting-point-charges/)<br>2022-01-29 [Orbits of Moving Orbs](https://architrino.wordpress.com/2022/01/29/fascinating-ideas/) |
| 3 | Cosmology, redshift, CMB, and large-scale history | needs review 1, partial 26, likely 106 | 162 | galaxy, planck, bang, galaxies, npqg, cosmological | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2020-07-18 [Lawrence Krauss : Freeman’s 90th](https://architrino.wordpress.com/2020/07/18/lawrence-krauss-freemans-90th/)<br>2021-06-18 [Triton Station : Despondency](https://architrino.wordpress.com/2021/06/18/despondency-at-triton-station/)<br>2019-10-14 [Kirsten Hacker : Blue Skies](https://architrino.wordpress.com/2019/10/14/kirsten-hacker-blue-skies/) |
| 4 | Noether braid, binary, self-hit, and nested shell braid | needs review 0, partial 13, likely 92 | 133 | binary, braid, binaries, potential, noether, field | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2022-01-28 [Lost for Words](https://architrino.wordpress.com/2022/01/28/sometimes-i-laugh-sometimes-i-cry-sometimes-i-do-both/)<br>2021-08-22 [The Noether Braid is Self-Tuning](https://architrino.wordpress.com/2021/08/22/the-immutable-point-charge-architecture-is-self-tuning/)<br>2021-12-06 [Bohr and Heisenberg : Plasma-Ten](https://architrino.wordpress.com/2021/12/06/bohr-and-heisenberg-plasma-ten/) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 12, likely 44 | 79 | planck, core, black, galaxy, hole, jets | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2020-04-30 [Kirsten Hacker : Black Hole Sun](https://architrino.wordpress.com/2020/04/30/kirsten-hacker-black-hole-sun/)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/)<br>2021-04-24 [Dr. Brian Keating and Dr. Carlo Rovelli](https://architrino.wordpress.com/2021/04/24/npqg-april-24-2021-dr-brian-keating-and-dr-carlo-rovelli/) |
| 6 | Master equation, causal wakes, and potential/action | needs review 0, partial 5, likely 42 | 61 | potential, potentials, speed, velocity, field, sphere | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-06-06 [Dr. Sabine Hossenfelder : Physics in Crisis](https://architrino.wordpress.com/2020/06/06/dr-sabine-hossenfelder-physics-in-crisis/)<br>2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/)<br>2022-08-21 [Determinism](https://architrino.wordpress.com/2022/08/21/determinism/) |
| 7 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 14, likely 32 | 49 | quantum, wave, photon, structure, physicists, potential | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-01-05 [Bohmian Mechanics and NPQG II](https://architrino.wordpress.com/2020/01/05/bohmian-mechanics-and-npqg-ii/)<br>2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/)<br>2020-07-20 [Mapping Uncertainty and Entanglement](https://architrino.wordpress.com/2020/07/20/epr-1-spooky-action-0/) |
| 8 | Philosophy, history of science, and method | needs review 0, partial 9, likely 23 | 33 | physicists, cosmology, method, philosophy, ideas, field | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2020-07-09 [NPQG in Wonderland](https://architrino.wordpress.com/2020/07/09/npqg-in-wonderland/)<br>2021-11-24 [Debate : Alan Guth vs. Roger Penrose](https://architrino.wordpress.com/2021/11/24/debate-alan-guth-vs-roger-penrose/)<br>2022-12-24 [Organization of Academia](https://architrino.wordpress.com/2022/12/24/organization-of-academia/) |
| 9 | Thermodynamics, radiation, entropy, and spectra | needs review 0, partial 6, likely 12 | 18 | core, radiation, understand, field, fields, context | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2020-05-22 [Radiation and Radioactivity](https://architrino.wordpress.com/2020/05/22/radiation-and-radioactivity/)<br>2020-08-08 [Revisiting Nobel Prize Research](https://architrino.wordpress.com/2020/08/08/revisiting-nobel-prize-research/)<br>2021-11-25 [Steady State Cosmological Models](https://architrino.wordpress.com/2021/11/25/helge-kragh-steady-state-cosmological-models/) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 6, likely 14 | 21 | technology, research, physicists, quantum, idea, planck | `reference/priorities/source-mining`<br>`reference/priorities/aaa-futures` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/)<br>2021-09-13 [Engaging the Particle Physics Reddit](https://architrino.wordpress.com/2021/09/13/engaging-the-particle-physics-reddit/)<br>2021-10-11 [Are We AI?](https://architrino.wordpress.com/2021/10/11/are-we-ai/) |
| 11 | External theory mapping and source leads | needs review 0, partial 2, likely 6 | 8 | might, narratives, imagination, packed, ideas, imagine | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/mapping-benchmarks` | 2022-01-14 [Dear MIT : Physics Needs an Intervention](https://architrino.wordpress.com/2022/01/14/dear-mit-physics-needs-a-compassionate-intervention/)<br>2020-02-13 [Mapping Magnetic Monopoles](https://architrino.wordpress.com/2020/02/13/missing-magnetic-monopoles/)<br>2025-03-01 [What is an Effective Theory by GPT 4.5](https://architrino.wordpress.com/2025/03/01/what-is-an-effective-theory-by-gpt-4-5/) |

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
