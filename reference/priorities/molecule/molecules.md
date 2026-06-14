# Molecules

## Workstream Metadata

- Kind: `priority`
- Rank: `unranked`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `draft`

## Purpose

The molecule visualization app is a 3D chemistry viewer for molecule presets and user-provided molecule input.

The app should let a user:

- choose a curated molecule preset;
- enter a molecular formula, structure identifier, SMILES, InChI, or molecule file when supported;
- view the molecule as an interactive 3D model;
- rotate, zoom, and inspect the model directly;
- click an individual atom;
- and route that atom click to the corresponding atom visualization available through the periodic table apps.

## Existing Scene Replacement

- Replace the current placeholder molecule scene at [molecule.json](../../../content/scenes/chemistry/molecule.json) with the molecule app entry behavior.
- Preserve the existing application hub child path from [applications.json](../../../content/scenes/archie/applications.json): node id `molecule`, scene path `content/scenes/chemistry/molecule.json`, and focus value `molecule`.
- Preserve the scene id `molecule` so existing links such as `index.html#scene=content%2Fscenes%2Fchemistry%2Fmolecule.json&parent=content%2Fscenes%2Farchie%2Fapplications.json&focus=molecule` continue to work.
- Add the molecule scene to the standalone app launch resolver in [StandaloneAppLaunchRuntime.js](../../../src/apps/navigator/StandaloneAppLaunchRuntime.js), mapping scene id `molecule` to `molecule.html`.
- The current placeholder scene objects `dna`, `protein`, and `water` are not the first prototype surface; replace them with the preset-driven molecule app.

## Current Requirements

### Viewer

- Render molecules in a browser-based 3D view.
- Use the existing vendored Three.js for the first offline prototype renderer.
- Support mouse and touch rotation, pan, and zoom.
- Start with ball-and-stick and space-filling styles; allow additional styles only when they clarify the molecule rather than clutter the first implementation.
- Keep atom pick events exposed as structured data, at minimum `element`, `atomIndex`, and source molecule identifier.
- If the app displays selected-atom feedback, keep it nonblocking so atom clicks can route immediately.

### Presets

- Ship a small curated preset set with known-good 3D coordinates.
- Good initial presets: water, carbon dioxide, methane, ammonia, ethanol, benzene, caffeine, glucose, sodium chloride, and a short peptide or DNA fragment if the chosen viewer handles macromolecules cleanly.
- Store preset records with a stable app id, display name, formula, molecule data format, source note, and route-safe atom symbols.
- Store molecule presets as molecule app data.

### User Input

- First implementation accepts presets only.
- After presets work, consider a compact composition input such as `C2.H10.O7`.
- Treat plain formulas as composition queries, not as complete structure definitions.
- Treat compact composition input the same way: it tells the app atom counts, but it does not by itself identify bonds, isomers, charge state, conformation, or 3D coordinates.
- If a formula maps to multiple plausible structures, show candidate molecules before rendering.
- Prefer exact structure inputs when available: SMILES, InChI, MOL, SDF, XYZ, PDB, CIF, or mmCIF depending on the selected viewer.
- Validate element symbols against the periodic-table data already used by the periodic table apps.
- Keep unsupported or ambiguous inputs user-facing and explicit rather than fabricating coordinates silently.

### Atom Routing

- Atom clicks must resolve the selected atom's element symbol and route through the existing periodic-table scene route path.
- Atom clicks should immediately navigate to the matching element scene; do not require a molecule-side route button in the first implementation.
- The implementation should reuse the manifest-backed element resolution contract already exposed by `SceneGraphManifestService.resolvePeriodicElementScenePath(symbol)`.
- If the manifest route is missing, fall back only to the same canonical element-scene pattern used by the current element navigation runtime.
- Molecule-specific atom metadata should stay in the molecule app; element-scene ownership stays with the periodic table apps.

### Data And Conversion

- Curated presets should carry coordinates directly so the first app can work offline.
- Formula lookup can be added as a second phase through the curated local catalog of molecule presets.
- Do not depend on a remote chemistry service unless a backend conversion path is explicitly accepted later.
- Structure generation from SMILES/InChI should be treated as a chemistry-tooling integration, not as a responsibility of the 3D viewer itself.
- Any backend conversion path must make license and deployment cost visible before implementation.

## Proposed First Pass

Use a small app-owned molecule runtime with:

- the existing vendored Three.js as the first renderer;
- curated SDF/MOL2/XYZ-style presets checked into app-owned data;
- atom click routing through the existing periodic-table manifest service.

This first pass keeps the viewer integration small while leaving room to compare or replace the renderer with 3Dmol.js later, and to add compact composition input, RDKit.js, Kekule.js, Open Babel, or a lookup service later for richer structure input.

## Open Source Molecule Visualization Technologies

| Name | Description | Pros (fit with our requirements) | Cons/Limitations |
| --- | --- | --- | --- |
| [3Dmol.js](https://github.com/3dmol/3Dmol.js) | BSD-licensed WebGL JavaScript molecular graphics library for online molecular visualization. It supports common molecular formats, atom-based selection and styling, labels, surfaces, and clickable interactivity. | Strong later renderer candidate: browser-native, embeddable, lightweight relative to macromolecular suites, supports atom picking, supports formats useful for presets, and maps cleanly to atom-click routing. | It is a renderer, not a formula-to-structure resolver. User-entered formulas still need lookup, candidate selection, or a chemistry toolkit. It also adds a new dependency, while the first prototype can use the existing vendored Three.js. Complex macromolecular workflows are less comprehensive than Mol*. |
| [Mol*](https://github.com/molstar/molstar) | MIT-licensed TypeScript/WebGL molecular visualization and analysis stack originally initiated by PDBe and RCSB PDB, with plugin and UI modules for large structural biology data. | Strong for proteins, nucleic acids, PDB/mmCIF data, annotations, and future advanced biological presets. It has a modern modular architecture and production use in major structure resources. | Heavier than needed for the first small-molecule viewer. React/plugin state integration may add complexity if the initial app only needs simple molecules, presets, and atom click routing. |
| [NGL Viewer](https://github.com/nglviewer/ngl) | MIT-licensed WebGL molecular visualization web application/library for proteins, DNA/RNA, density volumes, trajectories, picking, selections, animation, and image export. | Mature browser viewer with picking, embeddable static build, many molecular formats, and strong macromolecule support. It could fit if the molecule app quickly expands into proteins or trajectories. | Latest tagged release appears old relative to active alternatives, and the project direction is partly superseded by Mol*. It may be more than needed for small-molecule presets. |
| [Jmol/JSmol](https://jmol.sourceforge.net/) | LGPL open-source molecular viewer family. JSmol is the HTML5/browser object form, and Jmol remains a standalone Java application and integration component. | Deep format support, long educational history, browser embedding through JSmol, and robust scriptability for chemistry teaching scenarios. | Older integration style and scripting model may feel less native in the current app architecture. Styling and event integration may require more adaptation than a modern JS/WebGL library. |
| [Kekule.js](https://github.com/partridgejiang/Kekule.js) | MIT-licensed JavaScript cheminformatics toolkit with widgets to read, write, display, edit, compare, and search chemical objects. | Useful support technology for molecule input, editing, formula calculation, file IO, and possible 2D/3D chemistry widgets. It can help bridge user input into structured molecule data. | It is broader than a focused 3D viewer, so adopting it for rendering alone may add UI and dependency surface. Coordinate generation and polished 3D interaction need prototype verification. |
| [RDKit.js](https://github.com/rdkit/rdkit-js) | BSD-3-Clause JavaScript/WASM distribution of RDKit cheminformatics functionality, described by the project as a molecule rendering and cheminformatics toolbelt for JavaScript. | Strong candidate for parsing and validating SMILES/InChI-like structure input, generating 2D depictions, descriptors, and supporting chemistry-aware input workflows. It can complement 3Dmol.js rather than replace it. | Not the primary 3D rotatable viewer. WASM asset loading must be handled carefully. The repository notes a 2026 maintenance transition for npm release ownership, so dependency health needs review before adoption. |
| [Open Babel](https://github.com/openbabel/openbabel) | GPL-licensed chemical toolbox for searching, converting, analyzing, and storing molecular data; supports many file formats and can generate 2D/3D coordinates from SMILES, InChI, and other formats. | Strong conversion and coordinate-generation backend candidate when user input needs to become real 3D coordinates. Useful for a server-side or build-time preset pipeline. | GPL licensing is a major product-integration constraint. Browser integration is not as direct as JS-first libraries, and a backend conversion path adds deployment complexity. |
| [JSME Molecule Editor](https://github.com/jsme-editor/jsme-editor.github.io) | BSD-licensed JavaScript molecule editor for drawing and editing molecules and reactions on desktop and mobile devices. | Useful if the app later needs direct molecule drawing as an input mode. It can produce structure data that can feed a viewer pipeline. | It is an editor, not a 3D rotatable renderer. It should be considered an input companion, not the core molecule visualization technology. |

## Source Notes

- Upstream technology scan performed June 14, 2026.
- 3Dmol.js source notes: [GitHub README](https://github.com/3dmol/3Dmol.js).
- Mol* source notes: [GitHub README](https://github.com/molstar/molstar).
- NGL source notes: [GitHub README](https://github.com/nglviewer/ngl).
- Jmol/JSmol source notes: [project site](https://jmol.sourceforge.net/).
- Kekule.js source notes: [GitHub README](https://github.com/partridgejiang/Kekule.js).
- RDKit.js source notes: [GitHub README](https://github.com/rdkit/rdkit-js).
- Open Babel source notes: [GitHub README](https://github.com/openbabel/openbabel).
- JSME source notes: [GitHub README](https://github.com/jsme-editor/jsme-editor.github.io).
