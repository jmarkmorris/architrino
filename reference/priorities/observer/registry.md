# Reaction Registry

This document is the current code-backed snapshot of the Reaction object registry. It is derived from [`reaction-object-registry.v1.json`](../../../src/apps/reaction/reaction-object-registry.v1.json) and cross-checked against the current Reaction and solver/runtime code in:

- [`ReactionObjectRegistryRuntime.js`](../../../src/apps/reaction/ReactionObjectRegistryRuntime.js)
- [`ReactionCanvasLayoutRuntime.js`](../../../src/apps/reaction/ReactionCanvasLayoutRuntime.js)
- [`ReactionCanvasUiRuntime.js`](../../../src/apps/reaction/ReactionCanvasUiRuntime.js)
- [`ReactionFlowExportRuntime.js`](../../../src/apps/reaction/ReactionFlowExportRuntime.js)
- [`ReactionSolverRequestExportRuntime.js`](../../../src/apps/reaction/ReactionSolverRequestExportRuntime.js)
- [`reaction_solver_core.py`](../../../scripts/reaction_solver_core.py)
- [`StructureAssemblyCatalog.js`](../../../src/domain/structure/StructureAssemblyCatalog.js)

## Current Column Model

Use the five surface columns in this left-to-right order:

| Column | Name | Registry placement class | Connector policy | Current runtime note |
| ---: | --- | --- | --- | --- |
| 1 | `reactants` | `reactant` | no input; output role `reactant` on the right | left authored/source column |
| 2 | `left operators` | `operator` | input role `operator-input` on the left; output role `operator-output` on the right | current lane `0`; current picker exposes `Dissociate` |
| 3 | `intermediates` | `center` | input role `center` on the left; output role `center` on the right | center-assembly lane |
| 4 | `right operators` | `operator` | input role `operator-input` on the left; output role `operator-output` on the right | current lane `1`; current picker exposes `Associate` |
| 5 | `products` | `product` | input role `product` on the left; no output | right authored/target column |

When the registry lists allowed placements, read them through that five-column surface:

- `reactant` means `reactants` only.
- `center` means `intermediates` only.
- `product` means `products` only.
- `operator` means the operator placement class shared by `left operators` and `right operators`.

The important split is that the canonical registry still models both operator lanes as one placement class, but the current Reaction UI narrows them further:

- `left operators` currently hosts `Dissociate` only.
- `right operators` currently hosts `Associate` only.

## Registry Sections

| Registry field | Purpose | Current shape |
| --- | --- | --- |
| `schema` | registry version tag | string |
| `placementClasses` | canonical placement and connector policy | `inputRole`, `outputRole`, `inputSide`, `outputSide`, `laneNumbers` |
| `pickerColumns` | side-column picker groups for reactants/products | column: `id`, `entries`; entry: `id`, `templateId`, `label`, optional `occupiedCount` |
| `centerAssemblyPickerEntries` | add-menu entries for `intermediates` | `templateId`, `label` |
| `operatorEntries` | add-menu entries for operator templates | `templateId`, `label` |
| `templates` | canonical template definitions | `defaultLabel`, `familyTag`, `supportsPolarity`, `preserveLeadingPolarityLabel`, `allowedPlacementClasses`, optional `variants`, optional `aliases`, `structure` |

## Placement Classes As Columns

| Placement class | Allowed column name(s) | Lane number(s) | Input role / side | Output role / side |
| --- | --- | --- | --- | --- |
| `reactant` | `reactants` | `1` | none | `reactant` / right |
| `operator` | `left operators`, `right operators` | `2`, `4` | `operator-input` / left | `operator-output` / right |
| `center` | `intermediates` | `3` | `center` / left | `center` / right |
| `product` | `products` | `5` | `product` / left | none |

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
| intermediate picker | `centerAssemblyPickerEntries` | `noether_core`, `w_minus_boson`, `z_boson`, `w_plus_boson`, `free_architrinos` |
| operator picker | `operatorEntries` | `associate`, `dissociate` |
| lane-restricted operator UI | `REACTION_OPERATOR_LANE_LAYOUT` | lane `0` / `left operators` => `dissociate`; lane `1` / `right operators` => `associate` |

## Code-Backed Observations About Assemblies, Composite Assemblies, And Operators

- The canonical source of truth is the JSON registry, not scattered label heuristics. Both the browser runtime and the Python solver load and validate against the same template set.
- The solver validates every participant placement against the registry. A solved participant in `center` must be allowed there by `allowedPlacementClasses`, and every solved operator type must be allowed in the `operator` placement class.
- The solver result contract separates participant placement from operator placement:
  - participants use `placement.participantPlacements` with `placementClass` in `reactant`, `center`, `product`;
  - operators use `placement.operatorPlacements` with explicit `lane`, `row`, and `slot`.
- `Noether Pair` and `Noether Quad` are now registry-limited to `reactants` and `products`. They are not center/intermediate registry objects.
- `Noether Pair` and `Noether Quad` are still composite solve-visible assemblies. In [`StructureAssemblyCatalog.js`](../../../src/domain/structure/StructureAssemblyCatalog.js), `noether_pair` expands to core polarities `pro, anti`, and `noether_quad` expands to `pro, anti, pro, anti`.
- `Noether Quad` is the only template with explicit reaction composite modes. [`ReactionCompositeModeRuntime.js`](../../../src/apps/reaction/ReactionCompositeModeRuntime.js) gives it `associate` and `dissociate`; the default is `associate` on the reactant side and `dissociate` on the product side.
- `Associate` and `Dissociate` remain the only canonical operator templates in both registry and solver output.
- The current operator-lane UI is stricter than the registry:
  - `Dissociate` is currently placed through `left operators`;
  - `Associate` is currently placed through `right operators`.
- `Dissociate` can auto-generate center/intermediate participants in the current Reaction runtime. The auto-generated targets are created as center-column participants and connected from operator output to their input side.
- Center/intermediate participants already have contract/export semantics even where manual authoring is still being tightened:
  - reaction-flow export requires the center input connector on anchor instance `0`;
  - most center outputs use anchor instance `1`;
  - `Free Architrinos` is special: its center output anchor instance must be `>= 1`.
- The solver uses composite structure explicitly:
  - composite products are closed through `Associate` against child nodes;
  - fragment use of a composite source can mark that source auto-dissociated;
  - solved outputs preserve dissociation state in `dissociation.autoDissociatedParticipantIds` and related notes.

## Full Registry Table: Operators And Assemblies

This is the current complete table of operator templates plus assembly/composite-assembly templates and assembly-like composite participants that the registry exposes.

| Template id | Default label | Category | `familyTag` | `structure.kind` | Allowed columns | Registry detail | Current UI / solver note | Aliases |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `associate` | Associate | operator | `operator` | `operator` | `left operators`, `right operators` | no variants; no polarity | canonical operator template; current UI exposes it in `right operators`; solver emits `type: "associate"` | none |
| `dissociate` | Dissociate | operator | `operator` | `operator` | `left operators`, `right operators` | no variants; no polarity | canonical operator template; current UI exposes it in `left operators`; solver emits `type: "dissociate"` | none |
| `noether_core` | Pro Noether Core | center-capable assembly | `noether-core` | `noether_core` | `reactants`, `intermediates`, `products` | `defaultOccupiedCount=3`; variants: `1 -> Pro Uni Binary [h1]`, `2 -> Pro Bi Binary [h1+h2]`, `3 -> Pro Noether Core [h1+h2+h3]` | appears in side picker and intermediate picker; solver also generates center-side Noether cores | none |
| `w_minus_boson` | Negative W Boson | intermediate assembly | `boson` | `w_boson` | `intermediates` | `family=charged_lepton`; `defaultOccupiedCount=3` | center/intermediate-only participant | none |
| `z_boson` | Neutral Z Boson | intermediate assembly | `boson` | `z_boson` | `intermediates` | `family=neutrino`; `defaultOccupiedCount=3` | center/intermediate-only participant | none |
| `w_plus_boson` | Positive W Boson | intermediate assembly | `boson` | `w_boson` | `intermediates` | `family=charged_lepton`; `defaultOccupiedCount=3` | center/intermediate-only participant | none |
| `free_architrinos` | Free Architrinos | intermediate assembly | `free-architrinos` | `free_architrinos` | `intermediates` | `defaultOccupiedCount=3` | center/intermediate-only participant; export treats its output anchor indexing specially | none |
| `noether_pair` | Noether Pair | composite assembly | `boson` | `assembly` | `reactants`, `products` | `assemblyTemplateId=noether_pair`; structure catalog core polarities `pro, anti` | side-column composite entry; solver can recruit/generate it as composite source material and dissociate it into cores | none |
| `noether_quad` | Noether Quad | composite assembly | `boson` | `assembly` | `reactants`, `products` | `assemblyTemplateId=noether_quad`; structure catalog core polarities `pro, anti, pro, anti` | side-column composite entry; only template with explicit reaction composite modes `associate` / `dissociate` | none |
| `proton` | Pro Proton | composite participant | `baryon` | `baryon` | `reactants`, `products` | constituents: `pro up_quark(3) + pro down_quark(3) + pro up_quark(3)` | side-column composite entry; solver can dissociate baryons and re-associate product-side composites | none |
| `neutron` | Pro Neutron | composite participant | `baryon` | `baryon` | `reactants`, `products` | constituents: `pro down_quark(3) + pro up_quark(3) + pro down_quark(3)` | side-column composite entry; solver has baryon dissociation / weak-core-pool paths | none |
| `pi_plus` | Positive Pion | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro up_quark(3) + anti down_quark(3)` | side-column meson entry; composite target/source in solver | none |
| `pi_minus` | Negative Pion | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(3) + anti up_quark(3)` | side-column meson entry; composite target/source in solver | none |
| `upi0` | Neutral Pion (u anti-u) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro up_quark(3) + anti up_quark(3)` | side-column meson entry; canonicalized with alias support | `pi0` |
| `dpi0` | Neutral Pion (d anti-d) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(3) + anti down_quark(3)` | side-column meson entry | none |
| `k_plus` | Positive Kaon | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro up_quark(3) + anti down_quark(2)` | side-column meson entry | none |
| `k_minus` | Negative Kaon | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(2) + anti up_quark(3)` | side-column meson entry | none |
| `dk0` | Neutral Kaon (d anti-s) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(3) + anti down_quark(2)` | side-column meson entry | none |
| `sk0` | Neutral Kaon (s anti-d) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(2) + anti down_quark(3)` | side-column meson entry | none |
| `b_plus` | Positive B Meson | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro up_quark(3) + anti down_quark(1)` | side-column meson entry | none |
| `b_minus` | Negative B Meson | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(1) + anti up_quark(3)` | side-column meson entry | none |
| `db0` | Neutral B Meson (d anti-b) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(3) + anti down_quark(1)` | side-column meson entry; canonicalized with alias support | `dB0` |
| `bb0` | Neutral B Meson (b anti-d) | composite participant | `meson` | `meson` | `reactants`, `products` | constituents: `pro down_quark(1) + anti down_quark(3)` | side-column meson entry; canonicalized with alias support | `bB0` |
