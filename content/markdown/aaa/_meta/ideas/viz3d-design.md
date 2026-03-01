# architrino Design Notes

## Goals
- Multi-scale 3D visualization from cosmic structures down to assembly architecture.
- Drill-down navigation with log-scale zoom and focus on selected parts.
- Analytic path specification for orbits and assemblies.
- Cross-platform rendering with MP4 export (desktop/mobile).
- Glyph sizing independent of camera distance; zoom scaling is allowed with clamps.
- Preserve relative scale fidelity across classical and quantum domains; keep scale transitions educational and legible.
- Convey architrino assembly architecture clearly without distorting scale relationships.

## Scope and technology
- Separate app from sim2; no history-field shading.
- Default rendering: orthographic camera.
- Primary stack: WebGL (three.js) for web-first delivery, fast prototyping, and direct gesture/UI integration. (also considered Godot)
- Rationale includes higher SWE proficiency in three.js for development, debugging, and iteration speed.

## Scale model and navigation
- Use a log-scale parameter `s` to drive zoom, with total exponent range `-60..60`.
- Continuous zoom across macro scales; non-selected regions drift toward edges as focus shifts.
- Scale indicator is embedded in each sphere label (use range or single value when space allows).
- Per-node size encoding uses author-specified exponent ranges mapped to a compressed screen-scale curve (sqrt or smoothstep).

## Zoom mechanics (discussion)
- Define transition timing model: S-curve timing (slow start, fast middle, slow end), Star Trek-like warp feel.
- Allow per-transition overrides for duration, easing, and optional pauses.
- Specify blending rules for glyphs and labels during handoff between scales.
- Decide whether zoom in/out symmetry is required or can be asymmetric.

## Input gestures
- Zoom in via double tap or pinch out.
- Zoom out via pinch out.
- Pan via touch/click-hold and drag (Google Maps metaphor).

## Scene composition (discussion)
- Define rules for single focus object vs multiple objects at the same scale.
- For each sphere, choose which other spheres appear in the same scene (e.g., solar system shows star, planets, moons).
- Specify layout strategies for multiple objects inside a parent volume (radial, clustered, grid).
- Clarify label anchoring: pinned to glyphs vs screen-space offsets.

## Scale ladder (scenes and objects)
| Scale band (log10 meters) | Scene/anchor | Representative objects and structure |
| --- | --- | --- |
| 26 to 27 | Universe context | Observable universe context and background |
| 24 to 26 | Cosmic web / superclusters | Filaments, voids, superclusters; intergalactic medium |
| 22 to 24 | Galaxy clusters | Cluster dynamics; intracluster medium; cluster mergers |
| 20 to 22 | Galaxies | Spiral, elliptical, irregular; AGN/quasars as optional focal points |
| 17 to 19 | Galactic substructures | Arms, halos, bulge, star clouds; globular/open clusters; nebulae; molecular clouds; supernova remnants |
| 13 to 15 | Solar systems | Planetary systems; asteroid belts, Kuiper belt, Oort cloud; protoplanetary disks |
| 10 to 12 | Supermassive black holes | Event horizon scale; accretion disks; jets |
| 8 to 9 | Stars | Main sequence, giants, supergiants, binaries, variable stars |
| 6 to 7 | Planets and dwarf planets | Terrestrial and gas/ice giants; major moons as subfocus |
| 5 to 6 | Moons | Major natural satellites; ring systems context |
| 4 to 7 | Compact remnants | White dwarfs, neutron stars, pulsars, magnetars, stellar-mass black holes |
| 2 to 5 | Small bodies | Asteroids, comets, cometary nuclei, Kuiper belt objects |
| -9 to -6 | Molecules | Molecular assemblies |
| -10 to -9 | Atoms | Atomic structures |
| -15 to -14 | Atomic nuclei and nucleons | Nuclei, protons, neutrons |
| -18 to -17 | Weak bosons | W/Z; weak interaction range ~1e-18 m |
| -18 to -17 | Higgs boson | Effective electroweak scale ~1e-18 m |
| -18 and smaller | Photons and gluons | Massless; render as spherical or wavelength-dependent |
| -19 and smaller | Quarks | Experimental upper bound on size ~1e-19 m; spherical in rendering |
| -19 and smaller | Charged leptons | Electron/muon/tau; upper bound ~1e-19 m; spherical in rendering |
| -19 and smaller | Neutrinos | Spherical in rendering; use same upper bound |
| -20? to ? | assembly architecture | personality charge layer |
| -20? to -36? | assembly architecture | outer Noether core binary |
| circa Planck -36 | assembly architecture | middle Noether core binary |
| scale of max curvature | assembly architecture | inner Noether core binary |
| Note | assembly scales | Vague/relative until constraints are known; keep flexible |

## Analytic path primitives
- `orbit`: `center`, `radius`, `plane` (theta/phi or normal+up), `phase`, `speed`.
- `precession` (optional for orbit): `axis`, `rate`, `show_axis`.
- `fixed`: constant position with optional jitter.
- `spiral`: optional extension.

## Assembly templates
- `binary`: one positrino + one electrino with opposite phase offsets.
- `fermion`: 12 architrinos arranged as multiple binaries in specified planes.
- `photon`: 12 architrinos arranged as multiple binaries with phase offsets.

## JSON schema sketch
- `scene`: name, units, time step, scale bands.
- `camera`: type, position, target, up, zoom.
- `assemblies`: list of template instances with parameters.
- `architrinos`: explicit list for overrides or manual scenes.
- `render`: fps, duration, resolution, aspect, output.

## Config and sequencing (discussion)
- Define global defaults plus per-scene object lists and references.
- Describe navigation sequences explicitly (from/to, direction, duration, easing).
- Reserve optional slots for audio or narration cues aligned to the sequence.

## Tooling and run modes (discussion)
- JSON flags for config path, quality preset, output location, preview toggle.
- Provide a fast "simple mode" for quick validation vs full fidelity renders.

## Asset pipeline (discussion)
- Per-scene asset directories with naming conventions for imagery or textures.
- Supported formats and a fallback strategy when assets are missing.

## Architecture (discussion)
- Base scene class with per-scale subclasses and a scene/zoom manager.
- Separate config loading, asset loading, and scene layout from rendering.
- Define a cache/cleanup strategy for large or repeated assets.

## Execution flow (discussion)
- Load config, initialize scene registry, and execute navigation sequence.
- Update scale indicator and overlays continuously during transitions.
- Clean up or recycle resources between segments to control memory.

## Visual defaults (configurable)
- Base output: desktop and mobile format, with per-export overrides in JSON.
- Background: neutral dark tone or subtle gradient; keep high contrast for labels.
- Glyph styling: spherical glyphs with configurable stroke width and optional fill.
- Typography: Helvetica Neue font with consistent sizing for labels and indicators.

## Overlays (discussion)
- Optional metadata overlays (timestamp, scale readout, object counts).
- Toggleable debug overlays for layout bounds and scale bands.

## Glyphs, labels, and overlays
- Architrino glyphs scale with zoom; clamp to min/max pixels.
- Labels are toggleable and decluttered; screen-space sizing.
- Label text includes the scale indicator inside each sphere.
- Labels are rendered inside spheres; reduce font size if needed.
- Swipe-driven info panels show counts and metadata.
- Mobile gesture screens are deferred; web/desktop first.

## Future enhancements (discussion)
- Branching zoom paths and user-directed exploration.
- Integration of external data sources for scale-specific content.
- Richer materials, particles, and effects once core navigation is stable.

## Narrative export
- Scripted navigation paths (sequence of zoom and focus actions) for smooth MP4 output.
- Export presets for desktop (16:9) and mobile (9:16).
- Defer formal narrative/export spec until core interaction flow is stable.

## Scenes

Each short name is the label for the object shown as a sphere and is also the name of the associated json file.

- Star (star.json)
- Universe (universe.json)
- Galaxy Cluster (galaxy\_cluster.json)
- Galaxy (galaxy.json)
- Solar System (solar\_system.json)
- Planet (planet.json)
- Moon (moon.json)
- Molecule (molecule.json)
- Atom (atom.json)
- Proton (proton.json)
- Neutron (neutron.json)
- Up Quark (up\_quark.json)
- Down Quark (down\_quark.json)
- Electron (electron.json)
- Neutrino (neutrino.json)

## Operationalizing New Scenes (Current Code Reality)

Based on the current implementation, scene-to-scene navigation is already **explicitly authored** in scene JSON files (via object `subScenes`), while search/graph manifests are generated from that authored content.

### 1) New scene node that opens a markdown file (with label and 📚 icon)

Current behavior:
- Sphere label comes from object `label` (fallback is object `id`).
- Click behavior priority is:
1. If node has `childScene`, zoom to that scene.
2. Else if node has `markdownPath`, create/open a markdown reader/index scene.
- The 📚 icon is automatic for markdown-backed nodes when markdown file size crosses the doc-icon threshold (currently 1024 bytes).

Practical recipe:
1. Add/identify the target markdown file in `content/markdown/...`.
2. In the parent scene JSON, add an object with:
- `id`, `label`, `radius`, `color`, `position`
- `markdownPath: "content/markdown/.../your-file.md"`
- optionally `markdownSection`, `markdownColumns`
3. If this should also zoom to a child scene, add `subScenes`, but note current runtime chooses only the first entry for click navigation.
4. Run:
- `node scripts/validate-content.mjs --write`
- `node scripts/build-scene-graph.mjs --write`

Important multi-link note:
- You can declare multiple `subScenes` entries, and they appear in graph validation/manifest edges.
- Runtime click navigation currently uses only `subScenes[0]` as the active `childScene`.
- If one sphere truly needs multiple destinations, we need a UX/router change (chooser, modifier, radial menu, or explicit intermediate scene).

### 2) New "scene-of-scenes" sphere (drill-down to another level)

This is the primary existing pattern.

Practical recipe:
1. Create a child scene JSON with its own `scene` + `objects`.
2. Add that child file to `content/scenes/...` (it will be indexed by validation).
3. In the parent scene, add/update object `subScenes: ["content/scenes/.../child.json"]`.
4. Clicking the parent object zooms into that child scene.

For deeper nesting:
- A child scene can itself contain objects with `subScenes`, producing unlimited levels.
- A child scene can mix:
- objects that open markdown (`markdownPath`)
- objects that drill deeper (`subScenes`)
- animated objects (via `motion`, `binaryBands`, etc.)

### 3) Do we still need exclusion capability?

Short answer: only if we keep auto-generated markdown node layouts.

Current exclusion knobs (`markdown.exclude` / `autoMarkdownExcludePaths`) are used by auto-markdown expansion (`autoSphereRing` + markdown source file/directory). They do not affect explicitly-authored object lists.

So:
- If we move fully to explicit scene objects: exclusion is mostly unnecessary.
- If we keep auto-markdown generation for convenience: exclusion remains useful to prune noise without hand-authoring every node.

### 4) Other scene-network definition capabilities today (and whether to keep)

Capabilities in use:
- Explicit navigation edges: `objects[].subScenes` (core).
- Direct markdown targets: `objects[].markdownPath` (+ section/columns).
- Scene-level markdown policy:
- `markdown.source` (file/directory)
- `markdown.layout` (includeExisting, ring radius, palette, etc.)
- `markdown.render` (doc vs index defaults, heading depth)
- `markdown.overrides` and `markdown.exclude`
- Visual semantic edges: scene `links[]` (rendered arrows; not click navigation).
- Runtime-generated routes: periodic table and element legend routes (from manifest/runtime config).

Recommendation:
1. Keep explicit `subScenes` as the canonical navigation model.
2. Keep direct `markdownPath` on objects.
3. Treat markdown auto-generation as optional acceleration, not the core IA model.
4. Decide if multi-destination nodes are a real requirement; if yes, design it explicitly (current runtime is single-destination on click).
5. Keep runtime route config for special systems (periodic grid/legend), since those are intentionally non-generic.

