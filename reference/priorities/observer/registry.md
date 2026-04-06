# Reaction Registry

This document is the current code-backed snapshot of the Reaction object registry.

The canonical data lives in:

- [`reaction-object-registry.v1.json`](../../../src/apps/reaction/reaction-object-registry.v1.json)
- [`ReactionObjectRegistryData.js`](../../../src/apps/reaction/ReactionObjectRegistryData.js)

The current runtime/helper surface that consumes that registry includes:

- [`ReactionObjectRegistryRuntime.js`](../../../src/apps/reaction/ReactionObjectRegistryRuntime.js)
- [`ReactionCanvasUiRuntime.js`](../../../src/apps/reaction/ReactionCanvasUiRuntime.js)
- [`ReactionFlowExportRuntime.js`](../../../src/apps/reaction/ReactionFlowExportRuntime.js)
- [`ReactionBuiltInLibraryRuntime.js`](../../../src/apps/reaction/ReactionBuiltInLibraryRuntime.js)
- [`ReactionSolverRequestExportRuntime.js`](../../../src/apps/reaction/ReactionSolverRequestExportRuntime.js)
- [`reaction_solver_core.py`](../../../scripts/reaction_solver_core.py)
- [`StructureAssemblyCatalog.js`](../../../src/domain/structure/StructureAssemblyCatalog.js)
- [`ReactionCompositeModeRuntime.js`](../../../src/apps/reaction/ReactionCompositeModeRuntime.js)
- [`reaction-object-registry.test.js`](../../../tests/reaction-object-registry.test.js)

## Current Surface Model

Use the five surface columns in this left-to-right order:

| Column | Name | Placement class | Input connector | Output connector | Current UI note |
| ---: | --- | --- | --- | --- | --- |
| 1 | `reactants` | `reactant` | none | `reactant` on the right | left authored/source column |
| 2 | `left operators` | `operator` | `operator-input` on the left | `operator-output` on the right | current lane `0`; current picker exposes `Dissociate` |
| 3 | `intermediates` | `center` | `center` on the left | `center` on the right | center-assembly lane |
| 4 | `right operators` | `operator` | `operator-input` on the left | `operator-output` on the right | current lane `1`; current picker exposes `Associate` |
| 5 | `products` | `product` | `product` on the left | none | right authored/target column |

The registry still models both operator lanes as one `operator` placement class. The current Reaction UI narrows them further through `REACTION_OPERATOR_LANE_LAYOUT`:

- lane `0` / `left operators` currently hosts `Dissociate` only
- lane `1` / `right operators` currently hosts `Associate` only

## Top-Level Registry Sections

| Registry field | Purpose | Current shape |
| --- | --- | --- |
| `schema` | registry version tag | string |
| `placementClasses` | canonical placement and connector policy by placement class | `inputRole`, `outputRole`, `inputSide`, `outputSide`, `laneNumbers` |
| `connectionPolicy` | forward-lane routing law shared by Reaction and solver validation | `policyId`, `requireForwardLaneProgress`, `requireInputTerminus`, `allowedConnections[]` |
| `pickerColumns` | side-column picker groups for reactants/products | column: `id`, `entries`; entry: `id`, `templateId`, `label`, optional `occupiedCount` |
| `centerAssemblyPickerEntries` | center-lane add-menu entries | `templateId`, `label` |
| `operatorEntries` | canonical operator picker entries | `templateId`, `label` |
| `templates` | canonical template definitions | `defaultLabel`, `familyTag`, `supportsPolarity`, `preserveLeadingPolarityLabel`, `allowedPlacementClasses`, optional `variants`, optional `aliases`, `structure` |

## Placement Classes

| Placement class | Allowed columns | Lane number(s) | Input role / side | Output role / side |
| --- | --- | --- | --- | --- |
| `reactant` | `reactants` | `1` | none | `reactant` / right |
| `operator` | `left operators`, `right operators` | `2`, `4` | `operator-input` / left | `operator-output` / right |
| `center` | `intermediates` | `3` | `center` / left | `center` / right |
| `product` | `products` | `5` | `product` / left | none |

## Current Connection Policy

The registry now includes a first-class connection policy:

- `policyId = reaction-forward-lane-policy/v1`
- `requireForwardLaneProgress = true`
- `requireInputTerminus = true`

Allowed routed edge shapes are currently:

| Source | Allowed targets |
| --- | --- |
| `reactant` lane `1`, role `reactant` | `operator-input` lane `2` or `4`; `center` lane `3`; `product` lane `5` |
| `operator-output` lane `2` | `center` lane `3`; `operator-input` lane `4`; `product` lane `5` |
| `operator-output` lane `4` | `product` lane `5` |
| `center` lane `3`, role `center` | `operator-input` lane `4`; `product` lane `5` |

Important current consequences:

- `3 -> 2` is invalid
- `4 -> 3` is invalid
- center-lane outputs are forward-only
- operator outputs may only connect to input-side roles

## Current Picker Surfaces

| Surface | Registry source | Current entries |
| --- | --- | --- |
| reactant/product side picker | `pickerColumns.binary_count` | `uni_binary`, `bi_binary`, `tri_binary` -> `noether_core` |
| reactant/product side picker | `pickerColumns.neutrinos` | `tau_neutrino`, `muon_neutrino`, `neutrino` |
| reactant/product side picker | `pickerColumns.charged_leptons` | `tau`, `muon`, `electron` |
| reactant/product side picker | `pickerColumns.down_family` | `bottom`, `strange`, `down` |
| reactant/product side picker | `pickerColumns.up_family` | `top`, `charm`, `up` |
| reactant/product side picker | `pickerColumns.boson_bridge` | `photon`, `pi_minus`, `pi_plus`, `dpi0`, `upi0` |
| reactant/product side picker | `pickerColumns.kaon_bridge` | `k_minus`, `k_plus`, `sk0`, `dk0` |
| reactant/product side picker | `pickerColumns.b_meson_bridge` | `b_minus`, `b_plus`, `bB0`, `dB0` |
| reactant/product side picker | `pickerColumns.composite_bridge` | `noether_pair`, `noether_quad`, `proton`, `neutron` |
| center-lane picker | `centerAssemblyPickerEntries` | `noether_core`, `w_minus_boson`, `z_boson`, `w_plus_boson`, `free_architrinos` |
| operator picker | `operatorEntries` | `associate`, `dissociate` |
| lane-restricted operator UI | `REACTION_OPERATOR_LANE_LAYOUT` | lane `0` => `dissociate`; lane `1` => `associate` |

## Runtime Helper Surface Backed By The Registry

The current registry runtime exports these code-backed helper categories:

| Helper surface | Current role |
| --- | --- |
| `getReactionObjectSpec`, `normalizeReactionObjectTemplateId` | canonical template lookup and alias normalization |
| `getReactionObjectVariant`, `getReactionObjectVariants` | occupied-count variant lookup |
| `getReactionObjectOccupiedSlots`, `getReactionObjectGeneration`, `getReactionObjectHBasis` | structure/generation/h-basis facts |
| `supportsReactionObjectPolarity`, `normalizeReactionObjectPolarity` | polarity authority for polarized families |
| `getReactionCanonicalBaseLabel`, `getReactionCanonicalLabel`, `formatReactionCanonicalLabel` | registry-owned label generation |
| `getReactionObjectAllowedPlacementClasses`, `isReactionObjectPlacementAllowed` | placement validation |
| `getReactionObjectConnectorPolicy`, `getReactionParticipantPlacementClass` | placement-aware connector validation |
| `getReactionConnectionPolicy`, `isReactionConnectionAllowed`, `getReactionPlacementClassLaneNumbers` | connection-policy validation |
| `getReactionAnchorAttachmentSide`, `getReactionAnchorAriaLabel` | rendered anchor-side and accessibility semantics |
| `inferReactionOccupiedCountFromLabel`, `inferReactionGenerationFromLabel`, `inferReactionTemplateIdFromStructure` | registry-backed inference helpers used by structure and import/export paths |

One important current render rule from the runtime helpers:

- `getReactionAnchorAttachmentSide("center", "source")` returns `right`
- `getReactionAnchorAttachmentSide("center", "target")` returns `left`

That is the current first-class rule for center-lane connector side semantics.

## Canonical Template Families

The registry currently contains `29` canonical templates.

### Operators And Center-Lane-Only Participants

| Template id | Default label | `familyTag` | `structure.kind` | Allowed placements | Current note |
| --- | --- | --- | --- | --- | --- |
| `associate` | Associate | `operator` | `operator` | `operator` | current UI exposes it in right operator lane only |
| `dissociate` | Dissociate | `operator` | `operator` | `operator` | current UI exposes it in left operator lane only |
| `w_minus_boson` | Negative W Boson | `boson` | `w_boson` | `center` | `family=charged_lepton`, `defaultOccupiedCount=3` |
| `z_boson` | Neutral Z Boson | `boson` | `z_boson` | `center` | `family=neutrino`, `defaultOccupiedCount=3` |
| `w_plus_boson` | Positive W Boson | `boson` | `w_boson` | `center` | `family=charged_lepton`, `defaultOccupiedCount=3` |
| `free_architrinos` | Free Architrinos | `free-architrinos` | `free_architrinos` | `center` | center-only participant; export/import treats its output anchor indexing specially |

### Variant-Driven Polarized Families

| Template id | Default label | `familyTag` | Allowed placements | Variant ladder | `structure.kind` |
| --- | --- | --- | --- | --- | --- |
| `noether_core` | Pro Noether Core | `noether-core` | `reactant`, `product`, `center` | `1 -> Pro Uni Binary`, `2 -> Pro Bi Binary`, `3 -> Pro Noether Core` | `noether_core` |
| `electron` | Pro Electron | `lepton` | `reactant`, `product` | `1 -> Pro Tau`, `2 -> Pro Muon`, `3 -> Pro Electron` | `family_particle` |
| `neutrino` | Pro Electron Neutrino | `lepton` | `reactant`, `product` | `1 -> Pro Tau Neutrino`, `2 -> Pro Muon Neutrino`, `3 -> Pro Electron Neutrino` | `family_particle` |
| `down_quark` | Pro Down Quark | `quark` | `reactant`, `product`, `center` | `1 -> Pro Bottom Quark`, `2 -> Pro Strange Quark`, `3 -> Pro Down Quark` | `family_particle` |
| `up_quark` | Pro Up Quark | `quark` | `reactant`, `product`, `center` | `1 -> Pro Top Quark`, `2 -> Pro Charm Quark`, `3 -> Pro Up Quark` | `family_particle` |
| `fermion_gen1` | Gen I Fermion | `fermion` | `reactant`, `product` | no explicit variants | `generic_particle` |

Current code-backed notes:

- `electron`, `neutrino`, `down_quark`, and `up_quark` infer occupied slots from the variant ladder
- `inferReactionGenerationFromLabel("electron", "Pro Muon")` currently resolves to generation `"2"`
- `supportsReactionObjectPolarity(...)` is true for these families and for polarized composites such as `proton` and `neutron`

### Side-Lane Assemblies And Composite Participants

| Template id | Default label | `familyTag` | `structure.kind` | Allowed placements | Current note | Aliases |
| --- | --- | --- | --- | --- | --- | --- |
| `photon` | Photon | `boson` | `photon` | `reactant`, `product` | simple side-lane boson | none |
| `noether_pair` | Noether Pair | `boson` | `assembly` | `reactant`, `product` | `assemblyTemplateId=noether_pair`; not center-capable | none |
| `noether_quad` | Noether Quad | `boson` | `assembly` | `reactant`, `product` | `assemblyTemplateId=noether_quad`; not center-capable | none |
| `proton` | Pro Proton | `baryon` | `baryon` | `reactant`, `product` | polarized composite baryon | none |
| `neutron` | Pro Neutron | `baryon` | `baryon` | `reactant`, `product` | polarized composite baryon | none |
| `pi_plus` | Positive Pion | `meson` | `meson` | `reactant`, `product` | meson | none |
| `pi_minus` | Negative Pion | `meson` | `meson` | `reactant`, `product` | meson | none |
| `upi0` | Neutral Pion (u anti-u) | `meson` | `meson` | `reactant`, `product` | meson | `pi0` |
| `dpi0` | Neutral Pion (d anti-d) | `meson` | `meson` | `reactant`, `product` | meson | none |
| `k_plus` | Positive Kaon | `meson` | `meson` | `reactant`, `product` | meson | none |
| `k_minus` | Negative Kaon | `meson` | `meson` | `reactant`, `product` | meson | none |
| `dk0` | Neutral Kaon (d anti-s) | `meson` | `meson` | `reactant`, `product` | meson | none |
| `sk0` | Neutral Kaon (s anti-d) | `meson` | `meson` | `reactant`, `product` | meson | none |
| `b_plus` | Positive B Meson | `meson` | `meson` | `reactant`, `product` | meson | none |
| `b_minus` | Negative B Meson | `meson` | `meson` | `reactant`, `product` | meson | none |
| `db0` | Neutral B Meson (d anti-b) | `meson` | `meson` | `reactant`, `product` | meson | `dB0` |
| `bb0` | Neutral B Meson (b anti-d) | `meson` | `meson` | `reactant`, `product` | meson | `bB0` |

## Code-Backed Observations

- The JSON registry and the browser-importable JS registry data are currently kept byte-identical. [`reaction-object-registry.test.js`](../../../tests/reaction-object-registry.test.js) checks that directly.
- Placement validity is registry-owned:
  - `ReactionFlowExportRuntime.js`, `ReactionBuiltInLibraryRuntime.js`, and `ReactionSolverRequestAdapterRuntime.js` all reject participants whose placement class is not allowed by the registry.
- Connection validity is registry-owned:
  - the Python solver reads the same `connectionPolicy`;
  - `isReactionConnectionAllowed(...)` is now the shared forward-lane law in browser tests and solver validation.
- `Noether Pair` and `Noether Quad` are not center-lane objects in the current registry.
- `Free Architrinos` is center-only in the current registry.
- `Associate` and `Dissociate` remain the only canonical operator templates.
- The UI still narrows operator placement more than the registry itself:
  - current add flow offers `Dissociate` only on the left operator lane;
  - current add flow offers `Associate` only on the right operator lane.
- `Noether Quad` is still the only template with explicit reaction composite modes in [`ReactionCompositeModeRuntime.js`](../../../src/apps/reaction/ReactionCompositeModeRuntime.js).
- Center-lane connector orientation is now first-class in runtime code:
  - center targets attach on the left;
  - center sources attach on the right;
  - the old reactant/product fallback semantics are no longer the intended model for center-lane attachments.
- Alias normalization is now part of the canonical registry surface:
  - `pi0 -> upi0`
  - `dB0 -> db0`
  - `bB0 -> bb0`

## Current Practical Interpretation

Read the registry as the source of truth for:

- what a screenable object is;
- how many occupied slots it has for a given variant;
- what generation and `h`-basis label that variant carries;
- whether it supports polarity;
- which placement classes it may occupy;
- which connector roles exist in that placement;
- and which routed edges are legal under the forward-lane connection policy.

Read the current Reaction UI as a stricter consumer of that registry, especially for operator lane assignment and add-menu affordances.
