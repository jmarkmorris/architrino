# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update WordPress tags, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in `/tmp` artifacts.

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
| Complete in durable table | 118 |
| Open in durable table | 259 |
| Skip-mined in durable table | 2 |
| Unknown table status | 0 |
| Posts with visible `MINED` marker in API HTML/tags | 114 |
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
| likely captured | 626 |
| partially captured | 211 |
| needs review | 4 |

## Archive-Level Topic Routes

These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.

| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Spacetime medium, gravity, Lorentz, and clock recovery | needs review 2, partial 60, likely 167 | 188 | aether, noether, field, fields, planck, quantum | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-07-18 [Superfluid Vacuum Theory](https://architrino.wordpress.com/2020/07/18/superfluid-vacuum-theory/) (open)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) (open)<br>2020-05-15 [Introduction to NPQG](https://architrino.wordpress.com/2020/05/15/introduction-to-npqg/) (complete) |
| 2 | Cosmology, redshift, CMB, and large-scale history | needs review 0, partial 35, likely 98 | 138 | galaxies, galaxy, planck, local, inflation, bang | `content/markdown/aaa/cosmology`<br>`content/markdown/aaa/spacetime` | 2019-07-16 [Cosmic Inflation is Wrong. Long Live Inflation!](https://architrino.wordpress.com/2019/07/16/cosmic-inflation-is-wrong-long-live-inflation/) (open)<br>2020-06-18 [Particle Rain](https://architrino.wordpress.com/2020/06/18/particle-rain/) (open)<br>2020-08-28 [Big Bang vs. Steady State](https://architrino.wordpress.com/2020/08/28/dr-becky-big-bang-vs-steady-state/) (open) |
| 3 | Standard Model assembly and particle mappings | needs review 1, partial 42, likely 96 | 101 | noether, field, binary, aether, binaries, personality | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/noether-braid` | 2022-01-19 [Dear PDG, Let’s Talk!](https://architrino.wordpress.com/2022/01/19/dear-pdg-lets-talk/) (open)<br>2021-11-11 [Physics Guardians in Social Media](https://architrino.wordpress.com/2021/11/11/guardians-of-physics-are-an-embarassment/) (open)<br>2023-03-14 [Maya Benowitz : On the Origins of the Universe and the Nature of the Cosmological Singularity](https://architrino.wordpress.com/2023/03/14/maya-benowitz-on-the-origins-of-the-universe-and-the-nature-of-the-cosmological-singularity/) (open) |
| 4 | Noether core, binary, self-hit, and nested shell braid | needs review 0, partial 20, likely 95 | 77 | binary, noether, core, binaries, planck, potential | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2022-01-28 [Lost for Words](https://architrino.wordpress.com/2022/01/28/sometimes-i-laugh-sometimes-i-cry-sometimes-i-do-both/) (open)<br>2021-09-16 [Creating Matter from Pure Light](https://architrino.wordpress.com/2021/09/16/creating-matter-from-pure-light/) (open)<br>2021-12-06 [Bohr and Heisenberg : Plasma-Ten](https://architrino.wordpress.com/2021/12/06/bohr-and-heisenberg-plasma-ten/) (open) |
| 5 | Black holes, Planck cores, horizons, and strong fields | needs review 0, partial 10, likely 45 | 67 | planck, black, core, galaxy, hole, smbh | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/cosmology` | 2019-06-27 [Mapping Galaxy Rotation Dynamics](https://architrino.wordpress.com/2019/06/27/can-supermassive-black-holes-explain-galaxy-rotation-curves/) (open)<br>2020-05-13 [Dr. Becky : An Astrophysicist’s Top 10 Unsolved Mysteries](https://architrino.wordpress.com/2020/05/13/dr-becky-an-astrophysicists-top-10-unsolved-mysteries/) (open)<br>2021-05-06 [Black Holes and Planck Cores](https://architrino.wordpress.com/2021/05/06/black-holes-and-planck-cores/) (open) |
| 6 | Photon, quantum, measurement, and wavefunction bridges | needs review 0, partial 16, likely 30 | 43 | quantum, reality, wave, field, physicists, function | `content/markdown/aaa/quantum`<br>`content/markdown/aaa/dynamics` | 2020-01-04 [Bohmian Mechanics and NPQG I](https://architrino.wordpress.com/2020/01/04/bohmian-mechanics-and-npqg-i/) (open)<br>2020-01-05 [Bohmian Mechanics and NPQG II](https://architrino.wordpress.com/2020/01/05/bohmian-mechanics-and-npqg-ii/) (open)<br>2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open) |
| 7 | Master equation, causal wakes, and potential/action | needs review 0, partial 3, likely 43 | 15 | field, potential, velocity, dirac, path, potentials | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2022-03-07 [Point Potential Action and Self Action](https://architrino.wordpress.com/2022/03/07/point-charge-action-and-self-action/) (complete)<br>2022-04-08 [Jefimenko Liénard Wiechert](https://architrino.wordpress.com/2022/04/08/jefimenko-lienard-wiechert/) (complete)<br>2022-04-09 [Assembly Redux](https://architrino.wordpress.com/2022/04/09/assembly-redux/) (complete) |
| 8 | Thermodynamics, radiation, entropy, and spectra | needs review 0, partial 4, likely 14 | 14 | radiation, temperature, planck, black, fields, field | `content/markdown/aaa/dynamics`<br>`content/markdown/aaa/cosmology` | 2022-05-30 [Reactions : Disassembly and Reassembly](https://architrino.wordpress.com/2022/05/30/fusion/) (open)<br>2020-08-17 [The Trials and Tribulations of an Independent Ideator](https://architrino.wordpress.com/2020/08/17/the-trials-and-tribulations-of-an-independent-ideator/) (open)<br>2020-08-08 [Revisiting Nobel Prize Research](https://architrino.wordpress.com/2020/08/08/revisiting-nobel-prize-research/) (complete) |
| 9 | Philosophy, history of science, and method | needs review 0, partial 8, likely 23 | 16 | physicists, method, field, even, someone, science | `content/markdown/aaa/philosophy-history`<br>`content/markdown/aaa/philosophy-history/perspectives.md` | 2021-11-24 [Debate : Alan Guth vs. Roger Penrose](https://architrino.wordpress.com/2021/11/24/debate-alan-guth-vs-roger-penrose/) (open)<br>2022-03-24 [J Mark Morris : AITA?](https://architrino.wordpress.com/2022/03/24/j-mark-morris-aita/) (open)<br>2021-06-02 [Bickering with a Guardian of Physics](https://architrino.wordpress.com/2021/06/02/bickering-with-a-guardian-of-physics/) (open) |
| 10 | AI, simulation, technology, and operational planning | needs review 1, partial 10, likely 10 | 12 | scale, research, gell-mann, ideas, physicists, beings | `reference/priorities/source-mining`<br>`reference/priorities/future-physics-cosmology` | 2020-08-03 [Insights on Injustice via Gell-Mann](https://architrino.wordpress.com/2020/08/03/insights-on-injustice-via-gell-mann/) (open)<br>2021-09-13 [Engaging the Particle Physics Reddit](https://architrino.wordpress.com/2021/09/13/engaging-the-particle-physics-reddit/) (open)<br>2023-01-06 [Barry Barish](https://architrino.wordpress.com/2023/01/06/barry-barish/) (open) |
| 11 | External theory mapping and source leads | needs review 0, partial 3, likely 5 | 6 | qcd, mapping, term, touring, since, never-ending | `content/markdown/aaa/philosophy-history/theory-mapping.md`<br>`reference/priorities/cross-theory-mapping` | 2020-07-01 [Mapping to String Theory](https://architrino.wordpress.com/2020/07/01/does-npqg-inform-string-theory/) (open)<br>2020-07-08 [Bohmian Mechanics and NPQG III](https://architrino.wordpress.com/2020/07/08/bohmian-mechanics-and-npqg-iii/) (open)<br>2022-01-14 [Dear MIT : Physics Needs an Intervention](https://architrino.wordpress.com/2022/01/14/dear-mit-physics-needs-a-compassionate-intervention/) (complete) |

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
