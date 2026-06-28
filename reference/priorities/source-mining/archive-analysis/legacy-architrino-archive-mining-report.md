# Legacy Architrino Archive Mining Report

This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update WordPress tags, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in `/tmp` artifacts.

## Source Map

| Field | Value |
| --- | --- |
| Generated | 2026-06-27 |
| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |
| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |
| Posts retrieved | `379` |
| Idea cards | `1032` |
| Idea clusters | `839` |
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
| Cards carrying legacy terminology flags | 824 |
| Cards carrying speculation markers | 514 |
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
| Spacetime medium, gravity, Lorentz, and clock recovery | 264 |
| Cosmology, redshift, CMB, and large-scale history | 175 |
| Standard Model assembly and particle mappings | 162 |
| Noether core, binary, self-hit, and nested shell braid | 150 |
| Black holes, Planck cores, horizons, and strong fields | 81 |
| Master equation, causal wakes, and potential/action | 68 |
| Photon, quantum, measurement, and wavefunction bridges | 52 |
| Philosophy, history of science, and method | 32 |
| AI, simulation, technology, and operational planning | 22 |
| Thermodynamics, radiation, entropy, and spectra | 18 |
| External theory mapping and source leads | 8 |

## Corpus Coverage Snapshot

| Coverage label | Clusters |
| --- | ---: |
| likely captured | 609 |
| partially captured | 220 |
| needs review | 10 |

## Current-Use Candidate Gaps

These are the strongest archive-level clusters to inspect next. They are not automatically approved recommendations; they are the best candidates for ordinary per-source mining or a focused topic sweep.

| Rank | Cluster | Topic | Coverage | Sources | Likely destinations | Representative posts |
| ---: | --- | --- | --- | ---: | --- | --- |
| 1 | eric, lisi, kirsten, post | Master equation, causal wakes, and potential/action | needs review | 1 | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-02-06 [Kirsten Hacker : Jocularity, Jocks, Jokes, and Jackson’s E&M](https://architrino.wordpress.com/2020/02/06/in-response-to-kirsten-hackers-jocularity-jocks-jokes-and-jacksons-em/) (open) |
| 2 | cool, aether, trailing, toll | Noether core, binary, self-hit, and nested shell braid | needs review | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2022-01-29 [Orbits of Moving Orbs](https://architrino.wordpress.com/2022/01/29/fascinating-ideas/) (complete) |
| 3 | eric, invested, hours, watching | Spacetime medium, gravity, Lorentz, and clock recovery | needs review | 1 | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2021-01-01 [Dr. Brian Keating : Dr. Max Tegmark and Dr. Eric Weinstein](https://architrino.wordpress.com/2021/01/01/dr-brian-keating-dr-max-tegmark-and-dr-eric-weinstein/) (open) |
| 4 | triton, post, kind, stacy | Spacetime medium, gravity, Lorentz, and clock recovery | needs review | 1 | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2021-01-31 [Triton Station : Ivory Tower](https://architrino.wordpress.com/2021/01/31/npqg-february-1-2021-dr-stacy-mcgaugh-triton-station/) (open) |
| 5 | videos, star, book, trying | Master equation, causal wakes, and potential/action | partially captured | 1 | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2020-06-06 [Dr. Sabine Hossenfelder : Physics in Crisis](https://architrino.wordpress.com/2020/06/06/dr-sabine-hossenfelder-physics-in-crisis/) (open) |
| 6 | demonstrate, online, wish, thought | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-05-07 [Dialog with a Dreamer](https://architrino.wordpress.com/2021/05/07/pbs-space-time-dialog-with-a-dreamer/) (open) |
| 7 | density, ideator, proceeds, tribulations | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2020-08-17 [The Trials and Tribulations of an Independent Ideator](https://architrino.wordpress.com/2020/08/17/the-trials-and-tribulations-of-an-independent-ideator/) (open) |
| 8 | eric, electron, moving, probably | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-01-01 [Dr. Brian Keating : Dr. Max Tegmark and Dr. Eric Weinstein](https://architrino.wordpress.com/2021/01/01/dr-brian-keating-dr-max-tegmark-and-dr-eric-weinstein/) (open) |
| 9 | eric, lisi, portal, develop | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2020-02-04 [Garrett Lisi and Eric Weinstein on The Portal #015](https://architrino.wordpress.com/2020/02/04/garrett-lisi-and-eric-weinstein-on-the-portal-015/) (open) |
| 10 | knew, solution, obvious, orbiting | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-04-29 [Triton Station : Eerily Quiet](https://architrino.wordpress.com/2021/04/29/npqg-april-29-2021-triton-station-eerily-quiet/) (open) |
| 11 | points, published, debate, august | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-11-24 [Debate : Alan Guth vs. Roger Penrose](https://architrino.wordpress.com/2021/11/24/debate-alan-guth-vs-roger-penrose/) (open) |
| 12 | look, idea, take, npqg | Spacetime medium, gravity, Lorentz, and clock recovery | partially captured | 2 | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-07-18 [Superfluid Vacuum Theory](https://architrino.wordpress.com/2020/07/18/superfluid-vacuum-theory/) (open)<br>2021-12-28 [Mapping Mach’s Principle](https://architrino.wordpress.com/2021/12/28/fixing-machs-principle-and-self-energy/) (open) |
| 13 | modernization, bean, recipe, enjoy | Spacetime medium, gravity, Lorentz, and clock recovery | needs review | 1 | `content/markdown/aaa/spacetime`<br>`content/markdown/aaa/dynamics` | 2020-05-15 [Introduction to NPQG](https://architrino.wordpress.com/2020/05/15/introduction-to-npqg/) (complete) |
| 14 | albert, mileva, self-action, potential | Master equation, causal wakes, and potential/action | partially captured | 1 | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2022-03-07 [Point Potential Action and Self Action](https://architrino.wordpress.com/2022/03/07/point-charge-action-and-self-action/) (complete) |
| 15 | post, solution, mark, field | Master equation, causal wakes, and potential/action | partially captured | 1 | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2021-05-07 [Matthew von Hippel : Beyond Lost](https://architrino.wordpress.com/2021/05/07/matthew-von-hippel-lost-and-clueless/) (open) |
| 16 | prior, examining, gradient, half | Master equation, causal wakes, and potential/action | partially captured | 1 | `content/markdown/aaa/foundations`<br>`content/markdown/aaa/dynamics` | 2022-02-26 [The Orbiting Point Charge Binary IV](https://architrino.wordpress.com/2022/02/26/orbiting-point-charge-action/) (complete) |
| 17 | aether, first, orbiting, pair | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2021-05-05 [Are Orbiting Point Charges the Perfect Blackbody?](https://architrino.wordpress.com/2021/05/05/are-orbiting-electrino-positrino-point-charges-the-perfect-blackbody/) (complete) |
| 18 | aether, nonsense, noether, cores | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2022-04-16 [Nonsense Pop Woo Physics](https://architrino.wordpress.com/2022/04/16/nonsense-pop-woo-physics/) (open) |
| 19 | convince, want, nonsense, thought | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2020-07-01 [Social Media Struggle](https://architrino.wordpress.com/2020/07/01/social-media-struggle/) (open) |
| 20 | depending, correctness, walled, witnessed | Noether core, binary, self-hit, and nested shell braid | partially captured | 1 | `content/markdown/aaa/noether-braid`<br>`content/markdown/aaa/dynamics` | 2020-05-23 [The Quandary in Physics and Cosmology](https://architrino.wordpress.com/2020/05/23/the-quandary-in-physics-and-cosmology/) (complete) |

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
| legacy-terminology | 824 |
| speculation-marker | 514 |
| polemic-marker | 114 |
| abandoned-or-corrected-language | 22 |

## Next Operating Modes

1. Use a candidate-gap cluster for an ordinary post-by-post mining batch, starting with the representative open posts.
2. Use topic-sweep mode when the operator asks what the legacy archive says about one concept across many posts.
3. Use the `/tmp` JSONL artifacts as the retrieval cache, but keep durable queue and status accounting in `reference/priorities/source-mining/`.
