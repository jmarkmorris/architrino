# Dark-Sector Candidate Assemblies

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `32`
- Value: `0.66`
- Cost: `6.1`
- ROI: `0.11`
- Status: `watchlist`

## Task Queue

1. `dark_sector_photon_like_mode` — Preserve and sharpen the dark-sector photon-like mode hypothesis as a candidate release, transport, redshift, and visible-channel re-entry packet. Status: `watchlist`. Depends on: `release_channel_selection`, radiation Gate C, residual-routing event ledger, cosmology transfer-function closure.
2. `candidate_assembly_registry` — Enumerate candidate dark-sector assemblies by internal binary ordering, exposed channel, medium response, and failure mode. Status: `pending`. Depends on: `dark_sector_photon_like_mode`.
3. `wimp_benchmark_vector` — Stage the source-limited Jungman WIMP/neutralino benchmark as comparison language for candidate dark-sector assemblies. Status: `pending`. Depends on: `candidate_assembly_registry`, relic-abundance closure, direct/indirect detection constraints, and null-result bounds.
4. `axion_like_null_benchmark` — Stage axion-like candidates as a null-result and photon-conversion benchmark for neutral, weakly exposed, spin-0 dark-sector comparisons without identifying the Noether sea with axions. Status: `pending`. Depends on: `candidate_assembly_registry`, photon-conversion bounds, stellar-cooling constraints, and relic-abundance comparison.
5. `dark_visible_reentry_gate` — Define the threshold where a dark-sector assembly can react, thermalize, shed ordinary photons, or re-enter a visible channel without violating conservation or cosmology gates. Status: `pending`. Depends on: `candidate_assembly_registry`, radiation Gate C.

## Scope

This workstream preserves speculative dark-sector subjects when they are assembly candidates, release-channel candidates, transport modes, or dark-visible conversion hypotheses. It is a priority lane for disciplined ideation, not a ranked closure workstream yet.

The lane does not replace [strong-field-closure](../strong-field-closure/priorities.md), [cosmology-closure](../cosmology-closure/priorities.md), [Radiation](../../../content/markdown/aaa/reactions/radiation.md), or the shared residual-routing event ledger. It packages candidate assemblies until one of them gains a boundary condition, equation, simulation target, or discriminating observable strong enough for promotion.

WIMP/neutralino language in this lane is comparison language only. It may organize relic abundance, scattering, annihilation, direct detection, indirect detection, and null-result constraints, but it must not identify a native assembly with a supersymmetric neutralino or treat supersymmetry as Noether braid ontology without a separate ledger-preserving transformation theorem.

Axion-like language has the same status. It is useful as a comparison vector because it bundles neutral weak exposure, low mass, scalar or pseudoscalar response, photon conversion, stellar cooling, supernova constraints, relic abundance, and null-result bounds into one experimental pressure surface. It is not a Noether sea ontology. A native dark-sector candidate may be compared against the axion-like benchmark only through declared residuals,

$$
\mathcal{R}_{a\text{-}\mathrm{like}}
=
\left(
R_m,\,
R_{\gamma\leftrightarrow a},\,
R_{\mathrm{cool}},\,
R_{\mathrm{SN}},\,
R_{\Omega},\,
R_{J^{PC}},\,
R_{\mathrm{null}}
\right),
$$

where the rows record the mass window, photon-conversion rate, stellar-cooling pressure, supernova bounds, abundance contribution, spin/parity comparison, and null-result limits. The benchmark fails as a native identification if any row can be matched only by treating the Euclidean void or the Noether sea as a primitive axion field.

## Topological and Analogue-Medium Caveat

The Tier 2 condensed-matter sources add a useful dark-sector guardrail. Analogue horizons, protected edge modes, vortices, and topological defects can create long-lived or weakly exposed transport channels in their native systems, but they do not by themselves define a dark-sector assembly. In this workstream, such language is comparison material until the candidate supplies internal assembly variables, exposed channel, release route, and dark-visible re-entry condition.

A topological or defect comparison may be retained only as a label inside a fuller candidate record,

$$
\mathcal{D}_{\mathrm{dark}}
=
\left(
A_{\mathrm{int}},
\mathcal{B}_{\mathrm{dark}},
\mathcal{I}_{\mathrm{top}},
\Delta_{\mathrm{dark}},
\mathcal{R}_{\mathrm{reentry}}
\right),
$$

where $A_{\mathrm{int}}$ is the internal action or assembly record, $\mathcal{B}_{\mathrm{dark}}$ is the candidate branch, $\mathcal{I}_{\mathrm{top}}$ is an effective invariant or defect label if one exists, $\Delta_{\mathrm{dark}}$ is the stability or exposure gap, and $\mathcal{R}_{\mathrm{reentry}}$ is the residual for visible-channel re-entry. If $\mathcal{I}_{\mathrm{top}}$ is present without the other entries, the candidate remains analogy-only and should not be promoted.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [brainstorming.md](brainstorming.md) | Idea and insight parking for loose dark-sector candidate notes that are not ready to become queue items, candidate packets, simulation targets, or corpus destinations. | Existing dark-sector, strong-field, cosmology, radiation, and app targets after a concrete promotion route is selected. |
| [dark-sector-photon-like-mode.md](dark-sector-photon-like-mode.md) | Working packet for black-hole-adjacent dark-sector photon-like modes, redshift-triggered reactions, visible-channel re-entry, CMB speculation, and Little Red Dot convergence tests. | [strong-field-closure](../strong-field-closure/priorities.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md) |
| [wimp-susy-benchmark.md](wimp-susy-benchmark.md) | Source-limited lane-native packet containing the Jungman WIMP benchmark vector and supersymmetry guardrail. | [dark-matter](../../../content/markdown/aaa/cosmology/dark-matter.md) and the candidate assembly registry |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `dark_sector_photon_like_mode` | [dark-sector-photon-like-mode.md](dark-sector-photon-like-mode.md) | [strong-field-closure](../strong-field-closure/priorities.md), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), or [CMB](../../../content/markdown/aaa/cosmology/CMB.md) | The packet states a release-channel boundary condition, an event-ledger route through radiation Gate C, a redshift / reaction / re-entry criterion, and at least one discriminating observable. |
| `candidate_assembly_registry` | This file and [dark-sector-photon-like-mode.md](dark-sector-photon-like-mode.md) | [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [noether-sea-pro-anti-coupling](../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), or [radiation](../../../content/markdown/aaa/reactions/radiation.md) | Candidate assemblies are described by explicit internal variables rather than analogy alone. |
| `wimp_benchmark_vector` | [wimp-susy-benchmark.md](wimp-susy-benchmark.md) | [dark-matter](../../../content/markdown/aaa/cosmology/dark-matter.md) and this workstream | The arXiv source limitation is stated; $\mathcal{B}_{A}^{\mathrm{WIMP}}$ is restricted to relic abundance, scattering, annihilation, direct/indirect detection, and null-result constraints; no supersymmetry ontology is canonized. |
| `axion_like_null_benchmark` | This file | [dark-matter](../../../content/markdown/aaa/cosmology/dark-matter.md) and the candidate assembly registry | Axion-like rows remain comparison residuals for neutral weak exposure, photon conversion, stellar cooling, abundance, spin/parity, and null-result limits; no axion ontology is assigned to the Noether sea. |
| `dark_visible_reentry_gate` | [dark-sector-photon-like-mode.md](dark-sector-photon-like-mode.md) and [radiation](../../../content/markdown/aaa/reactions/radiation.md) | [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md), or [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md) | Dark-visible conversion closes $E$, $\mathbf{p}$, $\mathbf{J}$, medium update, remnant state, and photon-channel exposure without per-observable retuning. |

## Related Priorities

- [strong-field-closure](../strong-field-closure/priorities.md)
- [strong-field brainstorming](../strong-field-closure/brainstorming.md)
- [cosmology-closure](../cosmology-closure/priorities.md)
- braid
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [validation-gates](../validation-gates/priorities.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- [CMB](../../../content/markdown/aaa/cosmology/CMB.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics)
- [noether-sea-pro-anti-coupling](../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md)
