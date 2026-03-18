# Composer

## Why this note exists

The webapp already contains an early composer surface. It is no longer just a vague future idea. There is a working UI path for scene preview, JSON export, path editing, frame editing, and camera-path preview. That existing work is enough to justify one clear architecture note before the composer expands into full assembly authoring.

This note is the single reference for:

- what the composer is in the current app,
- how it relates to the existing scene system,
- what the canonical authored output should be,
- what requirements the composed-animation scene type must satisfy,
- and what near-term implementation path makes sense.

The composer is not just a scene-layout utility. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it is the future authoring layer for explicit assembly geometry: nested binaries, Noether-core-like structures, bound personality charges, internal orbital motion, reaction choreography, transport paths, and authored camera motion on one shared timeline. That matters because the theory does not stop at isolated pointlike objects. It claims that larger assemblies and their observable behavior arise from explicit internal organization and delayed dynamics, and the composer is the place where those structures become authorable, inspectable, exportable, and eventually reusable across scenes. It should be strong enough to depict either an imaginative construction or an observation-grounded reconstruction with the same rigorous timeline and graphics language.

---

## Relation to the existing scene system

The composer should not replace the current explicit scene network. It should add a new authored special scene type within it.

The intended runtime pattern is:

- a higher-level collection or index scene can still show selectable spheres or nodes,
- one of those nodes can point to a composed animation scene,
- opening that node should switch into a dedicated composed-animation runtime rather than into a markdown reader scene,
- and the composed animation scene should then render authored assemblies, paths, reactions, and playback controls.

This is closer to the current handling of special interactive scenes such as the periodic table and atom drill-down flow than to the standard sphere-to-markdown pattern.

Important consequences:

- these scenes are authored scene files, not markdown leaves,
- they should not assume that the primary interaction target is `markdownPath`,
- they belong in the explicit scene network and should remain searchable and navigable through the same manifest pipeline,
- and their internal content should be driven by authored animation data rather than by the normal `{ scene, objects[] }` plus markdown drill-down contract alone.

Taxonomically, these scenes sit closest to tool scenes and animation scenes. In runtime terms, they likely need a dedicated scene type such as `Scene-Composed-Animation`.

---

## Product stance

The composer should remain an overlay editor controlling a live 3D viewport.

The current initial UI is a valid starting point and should be preserved as the shell that expands into fuller assembly authoring. The right move is not to invent a different metaphor. It is to formalize and deepen the one that is already emerging.

That means:

- structured side panels remain primary,
- the central viewport remains the live visual truth,
- export/import remains canonical JSON,
- and in-runtime controls likely remain in the corners, but with an abbreviated set relevant to composed animation playback, camera, selection, and inspection.

The viewport should therefore privilege AAA-native reading order:

- first body,
- then path,
- then orbit or shell structure,
- then deeper constituent revelation if needed.

The composer should be treated as a future core capability, not as a side panel.

---

## Unifying simplification principle

The strongest simplification available to the composer is already present in the Architrino Assembly Architecture itself.

At the lowest useful level, the scene is made from:

- red or blue spheres,
- paths that encode position and velocity,
- orbital or shell traces where motion is structured or repeating,
- and a small number of quiet explanatory overlays attached to that geometry.

Everything larger is built from that lower level. A compound assembly is still a structured set of spheres on paths. A shell is still an organized orbit family. A larger object, when viewed from farther away, should be allowed to collapse into a sphere-like proxy carrying the memory of the same underlying structure.

This means the composer should not behave like a generic media tool that happens to render Architrino scenes. It should behave like a unified authoring instrument whose geometry, staging, semantic zoom, and explanatory overlays are all consequences of one core visual grammar.

The practical design rule is:

- at every level, prefer the simplest representation that still preserves the underlying sphere-orbit-path logic.

That is the path toward an elegant design. The tool should feel more like a Gaudi work whose many forms are generated from one coherent structural language than like a bag of unrelated editing features.

### Canonical rendered primitive set

If the tool is to stay elegant, its rendered primitive vocabulary should remain very small.

The canonical rendered primitives should be:

- sphere
  - the basic visible body or scale-collapsed proxy;
- path
  - a directed spatial trace that encodes motion through position and velocity;
- orbit or shell trace
  - a persistent or highlightable trace for repeating or structured motion;
- ellipse or ellipsoid guide
  - the one allowed general explanatory shape family;
- callout leader
  - a restrained pointer line attached to a geometric target;
- text label
  - a quiet explanatory label or caption.

Everything else should preferably be composed from these.

That means:

- a larger assembly should often reduce to a sphere-like proxy at the right scale,
- a fixed or repeating motion should usually be legible as a path or orbital trace,
- and explanatory emphasis should usually be handled by ellipses, ellipsoids, callouts, labels, opacity, and timing rather than by introducing new primitive families.

### Canonical zoom and reveal behavior

The zoom model should follow the same architecture.

The preferred reveal sequence is:

1. sphere-like proxy at coarse scale,
2. reveal path when motion matters,
3. reveal orbit or shell trace when repeated structure matters,
4. reveal constituent spheres and local paths when constitution matters.

This should feel like one continuous disclosure of structure rather than a jump between incompatible modes.

The preferred hide sequence is simply the reverse:

- collapse local constituents into a larger organized object,
- collapse visible orbit or shell structure into a cleaner proxy,
- and preserve just enough path or directional information to keep the large-scale scene intelligible.

### Canonical viewport rendering stack

The viewport should render these primitives in a stable visual order so the scene remains legible as structure becomes denser.

Recommended rendering stack:

1. background field
   - neutral purple field or other scene background layer;
2. path and orbit traces
   - quiet structural traces that establish motion context;
3. sphere bodies and sphere-like proxies
   - the primary visible bodies of the scene;
4. shell and ellipsoid guides
   - transparent guide geometry for emphasis or structural reading;
5. callout leaders
   - restrained explanatory pointers;
6. text labels
   - the highest-priority explanatory layer, used sparingly.

This stack should remain conceptually stable even when implementation details vary. The viewer should feel that the scene always reads from motion context to bodies to explanation.

### Canonical primitive property model

The primitive set is only useful if each primitive has a small, inspectable property surface.

#### Sphere primitive

Canonical inspectable properties:

- position,
- radius or scale,
- color role,
- opacity,
- label,
- parent frame,
- path binding if moving,
- and collapse source if acting as a proxy for deeper structure.

#### Path primitive

Canonical inspectable properties:

- path kind,
- control points or parametric payload,
- frame,
- visible trace mode,
- directionality,
- timing or speed mapping,
- and bound objects using the path.

#### Orbit or shell trace primitive

Canonical inspectable properties:

- center or anchor,
- radii or axes,
- orientation,
- repetition or frequency relation,
- trace visibility mode,
- and whether the trace is structural, instructional, or both.

#### Ellipse or ellipsoid guide primitive

Canonical inspectable properties:

- center or attached target,
- axes or radii,
- orientation,
- stroke and fill styling,
- and timing if introduced as an explanatory guide.

#### Callout leader primitive

Canonical inspectable properties:

- target,
- source position or label offset,
- line style,
- endcap style,
- timing,
- and label binding if present.

#### Text label primitive

Canonical inspectable properties:

- text content,
- text format,
- role,
- placement,
- width or wrapping rule,
- timing,
- and attachment target if anchored to geometry.

The point of this property model is not to expose endless controls. It is to ensure that every visible thing in the viewport can be understood, edited, and validated through a small, native set of properties.

### Canonical reveal and collapse animation policy

Reveal and collapse should be governed by one consistent policy instead of being improvised scene by scene.

Preferred reveal behavior:

- fade in motion context before or alongside the body when path understanding matters,
- introduce the sphere-like body before secondary explanation layers,
- reveal orbit or shell traces when repeated structure becomes the teaching focus,
- and descend into constituent spheres and local paths only when the explanation truly requires internal constitution.

Preferred collapse behavior:

- remove local constituent clutter first,
- preserve the dominant body and its principal path as long as they still carry explanatory value,
- and collapse to a sphere-like proxy when detailed structure no longer helps at the current scale.

Transition guidance:

- reveal should usually feel like clarification, not like surprise,
- collapse should usually feel like abstraction, not like disappearance,
- and the same structure should remain visually recognizable as it moves between proxy, path-emphasized, and constituent-emphasized states.

---

## UI metaphor and design levels

The composer should not be treated as one flat editing surface. It needs a small number of semantic design levels so authors can move between corpus navigation, explanation design, spatial staging, and internal constituent modeling without losing orientation.

The key principle is that these levels are not separate visual worlds. They are transparent semantic layers built from one underlying sphere-orbit-path grammar. Not every zoom is a geometric zoom, but every level should still feel like a different reading of the same scene fabric rather than a switch into a foreign tool.

Some transitions should be continuous spatial zooms, while others should be semantic zooms or mode changes between levels of authoring intent.

The recommended stack is five levels.

### 1. Corpus level

Question this level answers:

- What scene or authored animation am I opening?

This is the current scene-graph world of selectable spheres and branch navigation.

Typical objects and controls:

- scene nodes,
- scene labels and subtitles,
- branch navigation,
- search and selection,
- and entry into a composed-animation scene.

This level is about orientation and selection, not about editing a shot or manipulating geometry.

Even here, the sphere metaphor remains correct: scene nodes are still spheres because they are the coarse-scale public face of deeper structured objects.

### 2. Sequence level

Question this level answers:

- What is the whole explanatory sequence from beginning to end?

This is the director view of one composed-animation scene.

Typical objects and controls:

- the master timeline,
- timeline chapters,
- cue markers,
- pauses,
- global overlays,
- camera strategy,
- and overall playback structure.

This level should make the scene legible as one explanatory sequence rather than as a pile of independent objects.

At this scale, the geometry is not abandoned. It is summarized. Paths, pauses, overlays, and camera attention become the large-scale reading of the same underlying scene.

The sequence view should therefore summarize geometry rather than replace it. If the scene is about one sphere moving on one path with one orbital reveal, the sequence layer should make that legible immediately.

### 3. Shot or beat level

Question this level answers:

- During this interval, what should the viewer be looking at, and why?

This is the level at which standard video-authoring terminology becomes especially valuable.

Typical objects and controls:

- shot clips,
- beat-level markers,
- local overlays,
- emphasis windows,
- camera clips,
- hold segments,
- transitions,
- and short explanatory timing decisions.

This is the right level for terms such as shot, clip, cut, hold, fade, cue, and playback beat.

Shot design should still remain faithful to the sphere-orbit-path logic of the scene rather than imposing arbitrary cinematic flourish.

The best shots in this system should help the viewer answer:

- which body matters,
- which path it follows,
- which shell or orbit is active,
- and whether deeper constitution now needs to be revealed.

### 4. Assembly or staging level

Question this level answers:

- What is arranged where in the scene?

This is the main composer level in the strict sense.

Typical objects and controls:

- assemblies,
- transforms,
- paths,
- anchors,
- reactions,
- transport corridors,
- guide ellipses and ellipsoids,
- and relative staging in 2D or 3D.

This level should be the default workspace for most scene building.

This is where the underlying grammar is most visibly explicit: staged spheres, shell-like envelopes, paths, and orbital traces.

### 5. Constituent or internal-dynamics level

Question this level answers:

- How does this thing work internally?

This is the deepest theory-facing level.

Typical objects and controls:

- internal architrino motion,
- binary and orbital structure,
- charge placement,
- local modulation,
- deformation rules,
- and constituent-level explanatory overlays.

This level should be a drill-down mode, not the default surface.

At this deepest level, the author is not entering a different metaphor. The author is simply seeing the finer-grained sphere-path constitution out of which higher-scale objects were already built.

### How level transitions should work

The composer should support two kinds of movement between levels.

#### Continuous zoom

Continuous spatial zoom is the right metaphor when the user is moving deeper into geometry that remains the same object under magnification.

Best fits:

- corpus to scene entry,
- scene to assembly,
- and assembly to constituent.

#### Semantic zoom or mode shift

Semantic zoom is the right metaphor when the user is moving between different kinds of authorship rather than merely getting closer to the same geometry.

Best fits:

- sequence to shot,
- shot to assembly,
- assembly back to sequence,
- and constituent back to staging.

At those boundaries, the UI should preserve context while changing tools, visible controls, and the dominant editing question.

### What the user should feel at each level

Each level should answer one simple authoring question.

- Corpus: what do I open?
- Sequence: what is the whole explanation?
- Shot: what is this beat showing?
- Assembly: what is arranged where?
- Constituent: how does it work inside?

If the UI keeps these questions clear, the composer can stay powerful without becoming cognitively noisy.

The same simplification principle should apply across all five levels:

- larger structures may collapse into a sphere-like proxy at distance,
- paths may collapse into a trace or directional hint when detail is unnecessary,
- and drill-down should reveal more of the same underlying architecture rather than replacing it with a new representational system.

### Immediate design implication

The default composed-animation workspace should center on assembly or staging level authoring, with sequence and shot views available through the timeline, and constituent editing available by drill-down. That gives the tool a clear center of gravity while still supporting deep theory visualization.

### Panel and control map by level

The composer should expose a stable workspace shell while changing panel emphasis and default controls by semantic level.

#### Corpus level

Primary panel emphasis:

- scene browser,
- search,
- recent or nearby scenes,
- and scene summary metadata.

Primary interactions:

- select scene,
- enter scene,
- compare candidate scenes,
- and return to branch context.

#### Sequence level

Primary panel emphasis:

- master timeline,
- marker and chapter list,
- pause list,
- global overlay list,
- camera track overview,
- and scene-level playback settings.

Primary interactions:

- set scene duration,
- author chapter markers,
- place pauses,
- arrange major overlay clips,
- and choose the overall camera strategy.

#### Shot or beat level

Primary panel emphasis:

- local timeline clip inspector,
- camera-shot inspector,
- transition controls,
- beat-level overlays,
- and explanatory cue controls.

Primary interactions:

- trim shot timing,
- adjust camera clip behavior,
- place beat-local overlays,
- and refine what the viewer should notice during one explanatory interval.

#### Assembly or staging level

Primary panel emphasis:

- scene graph or assembly tree,
- spatial inspector,
- transform and path controls,
- anchor and reaction controls,
- and overlay placement tools.

Primary interactions:

- select assemblies,
- move or rotate staged objects,
- edit paths,
- place callouts and guide shapes,
- and set the spatial relationship between key scene elements.

Default staging posture:

- if a structure is too detailed for the current scale, it should be shown as a sphere-like proxy rather than as clutter;
- if a motion is central to understanding, its path or orbital trace should be available directly in the viewport;
- and if a path is fixed or repeating, the author should be able to reveal that orbital logic without manually rebuilding it as annotation.

#### Constituent or internal-dynamics level

Primary panel emphasis:

- constituent tree,
- local motion controls,
- orbit or binary controls,
- charge placement controls,
- and local explanatory overlays.

Primary interactions:

- edit internal motion,
- inspect attachment rules,
- tune deformation or modulation,
- and step through the internal behavior of the selected structure.

### Default controls by level

The same input device should not mean the same thing everywhere.

- At sequence and shot level, the mouse wheel or trackpad should primarily scrub or zoom the timeline context unless the user deliberately enters camera navigation mode.
- At assembly and constituent level, the same gesture should primarily navigate the 3D viewport.
- Selection should always preserve a visible breadcrumb of the current level and selected object.
- A persistent level switcher or breadcrumb should make it obvious whether the user is editing sequence, shot, assembly, or constituent structure.

### Workspace regions

The workspace should keep a stable spatial grammar so the user does not need to re-learn the UI at each design level.

Recommended persistent regions:

- left rail
  - structure browser, scene tree, assembly tree, track list, and library access;
- central viewport
  - the live geometric and explanatory truth of the scene;
- right inspector
  - properties for the current selection, current level, and active tool;
- bottom timeline
  - the shared time axis for sequence, shot, camera, overlay, and reaction timing;
- top context bar
  - breadcrumbs, level switcher, scene title, playback state, and current mode status.

The relative emphasis of these regions should change by level, but the regions themselves should remain stable.

### Selection model

Selection behavior should be explicit and predictable.

The composer should support:

- single selection as the default,
- multiselect for bulk timing, styling, or visibility changes,
- hierarchical selection so a parent assembly can be selected without collapsing access to its children,
- direct selection in the viewport,
- structural selection in the scene or assembly tree,
- and selection breadcrumbs so the user can see the ancestry of the current target.

Selection state should support:

- locked items that cannot be accidentally moved or edited,
- hidden items that remain in the authored scene but are temporarily removed from view,
- solo or isolate behavior for focused editing,
- and dimmed context for nearby but currently unselected objects.

The preferred direct-selection targets should reflect the native geometry of the system:

- a sphere body,
- a path,
- an orbital or shell trace,
- an anchor,
- or an explanatory overlay attached to one of those objects.

If the user clicks empty space, the UI should resist inventing arbitrary free-floating objects by default.

### Scene graph and assembly tree interaction model

The left-side structural browser should not be a passive file outline. It is one of the primary authoring surfaces of the composer.

The composer should distinguish clearly between:

- scene graph
  - high-level authored scene objects and their timeline-facing roles;
- assembly tree
  - recursive spatial and constitutive structure inside the current scene;
- track list
  - editorial and overlay ordering on the shared timeline;
- library browser
  - reusable authored motifs and assembly definitions.

The tree model should support:

- expand and collapse,
- reveal in viewport,
- frame selection,
- drag to reorder where ordering is semantically meaningful,
- drag to reparent where hierarchy allows it,
- duplicate branch,
- convert selection to reusable library item,
- instantiate library item into the current scene,
- and inspect references without losing the current editing level.

Reparenting rules should be explicit:

- reparenting should be allowed only when the target hierarchy preserves valid frames and authored semantics,
- when reparenting changes reference frames, the user should be able to choose whether to preserve world transform or local transform,
- and prohibited reparenting cases should be blocked clearly rather than guessed silently.

The tree should also support multiple useful views over the same scene:

- structural view,
- timing or editorial view,
- provenance or transfer view where relevant,
- and library-instance view for reusable motifs.

This matters because the same authored scene may need to be understood as geometry, explanation sequence, and constitutive hierarchy all at once.

The tree should therefore privilege structural truth over arbitrary file-like nesting:

- an assembly should read as a higher-order object made from lower-order sphere-path structures,
- and level changes should reveal or summarize that structure rather than replacing it with unrelated node types.

### Transform and gizmo behavior

The transform system should be deliberately small, consistent, and legible.

At assembly and constituent levels, the composer should support:

- translate,
- rotate,
- scale where scale is semantically valid,
- path-handle editing,
- and anchor editing.

Gizmo guidance:

- translation should use axis-constrained handles,
- rotation should use explicit axis rings or equivalent directional controls,
- scaling should be disabled for semantically fixed objects when scaling would misrepresent the underlying structure,
- and local versus parent-relative transforms should be visually distinguished.

The gizmo should expose the active frame clearly:

- world or absolute frame,
- parent-relative frame,
- local object frame.

This matters because the same assembly may need to be staged in world space while its internal constituents are edited in a local frame.

Gizmos should therefore support the architecture rather than fight it:

- they should make it easy to place sphere-like proxies, path anchors, and shell or orbit references,
- and they should not encourage free-form deformation language that breaks the underlying assembly metaphor.

The preferred manipulation language should be:

- move a sphere,
- reshape or retime a path,
- reveal or hide an orbit trace,
- adjust a shell or ellipsoid guide,
- and drill into or collapse scale.

That is a more natural fit to the theory than a generic 3D modeling vocabulary.

### Presets and teaching patterns

The composer should support reusable authoring patterns, but they should be treated as editable structured motifs rather than opaque canned effects.

Useful first teaching-pattern presets include:

- highlight assembly
  - briefly introduce an ellipse or ellipsoid overlay around a selected target;
- callout and label
  - place a callout leader with a short instructional label;
- pause and explain
  - insert a timeline pause plus one or more explanatory overlays;
- trace path
  - reveal a path or corridor while dimming unrelated motion;
- compare two structures
  - place matched labels or overlays on two selected assemblies;
- reveal internal structure
  - drill from assembly to constituent level while preserving orientation and context;
- shot introduction
  - place an establishing text overlay or chapter marker at the start of a beat.

These patterns should be authored as editable scene objects after insertion. Their value is speed and consistency, not hidden behavior.

The best presets will be the ones that expose the native architecture of the scene:

- show path,
- show orbit,
- show shell,
- compare two sphere-centered structures,
- or collapse or reveal scale.

That is also the standard the product should apply to future features: if a new control does not help the author reveal sphere-body, path, shell, orbit, or scale relations more clearly, it is probably not part of the core system.

### Authoring commands and gesture model

The composer should use a small, stable command vocabulary rather than a sprawling tool palette.

Core authoring commands should include:

- select,
- multiselect,
- pan,
- orbit,
- zoom,
- scrub,
- play or pause,
- insert,
- duplicate,
- delete,
- group or ungroup where grouping is semantically valid,
- isolate,
- lock or unlock,
- hide or show,
- frame selection,
- add marker,
- add pause,
- add overlay,
- add camera shot,
- and apply teaching pattern.

The first serious version should prefer consistency over abundance. A smaller command language that behaves predictably across levels is better than many brittle tool modes.

Gesture guidance:

- click should primarily select,
- double click should enter or drill down where level transitions are appropriate,
- drag in the viewport should either orbit the camera or manipulate the active gizmo depending on the current tool,
- drag in the timeline should move the playhead, trim a clip, or reposition a marker depending on selection,
- and modifier-assisted gestures should extend selection, constrain transforms, or temporarily enable alternate navigation.

Keyboard guidance:

- common commands should have stable shortcuts across levels where possible,
- destructive actions should require explicit intent,
- and transport controls should feel familiar to anyone who has used standard video or animation tools.

### Timeline editing model

The timeline should not behave like a generic spreadsheet of timestamps. It should feel like an authored explanatory sequence built from beats, holds, paths, and camera attention.

The first serious timeline should support these editing operations:

- move playhead,
- set in or out region for focused editing,
- add, move, rename, and delete markers,
- insert, move, resize, and delete pauses,
- trim clip start or end,
- split a clip at the playhead,
- duplicate a clip,
- move a clip along the timeline,
- and snap clips to markers, pause edges, or neighboring clip boundaries.

Timeline behavior should respect the logic of the scene:

- pauses should extend playback time without corrupting authored geometry,
- marker edits should not silently retime scene content,
- trimming a shot should preserve its target and editorial role,
- and moving a clip should keep stable references intact unless the author explicitly rebinds them.

The timeline should also support a small set of retiming modes:

- direct move
  - reposition only the selected item;
- ripple move
  - move the selected item and downstream editorial timing together;
- hold insertion
  - add a pause window while preserving underlying motion semantics.

The point is not to imitate a full nonlinear editor. It is to give explanatory scenes enough timing discipline to remain teachable and easy to revise.

The timeline should help the author reveal the structure already present in the architecture:

- when something moves on a path, the timeline should help show that path clearly;
- when something is orbiting, the timeline should help expose the orbital rhythm;
- and when a larger object is really a scaled summary of a lower-level structure, the timing model should make that reveal natural.

### Shot construction rules

Shots should be treated as explanatory units, not merely as camera intervals.

Each shot should ideally answer one clear teaching question:

- what structure is being introduced,
- what motion is being emphasized,
- what comparison is being made,
- or what internal mechanism is being revealed.

Default shot guidance:

- an establishing shot should orient the viewer before detail work begins,
- a detail shot should isolate one target or one relation,
- a comparison shot should keep the compared objects visually legible at the same time,
- a follow shot should privilege continuity of motion,
- and an orbit shot should reveal geometry that is better understood through rotation around the target.

The shot system should leverage the natural visual language of the theory:

- spheres,
- shells,
- ellipses,
- ellipsoids,
- orbits,
- and paths.

That means the camera should usually help the viewer read:

- what object is central,
- what path it follows,
- what shell or orbit frame it inhabits,
- and what neighboring structure it relates to.

The camera should also respect scale collapse:

- when a detailed object is functioning as a sphere-like proxy at the current scale, the shot should not over-insist on hidden detail;
- when the purpose of the shot is to reveal deeper constitution, the transition into that detail should feel like a natural descent through the same geometric language.

Continuity guidance:

- avoid disorienting cuts when a continuous move would better preserve spatial understanding,
- preserve directional continuity when tracking along a path or orbit,
- and use dissolves sparingly, mainly for soft comparison or passage rather than as a default transition.

Good shot design in this tool should feel like guided spatial reasoning, not like decorative cinematography.

### Library packaging and reuse

Reusable authored structures should be treated as first-class portable assets, not as copy-pasted fragments.

The composer should support:

- scene-local reusable presets,
- shared library entries for assemblies, overlays, camera motifs, and teaching patterns,
- versioned library items,
- per-instance overrides that do not mutate the library source,
- and a clear distinction between a library definition and an instance placed in one scene.

Packaging guidance:

- a library item should preserve stable ids for the definition layer,
- instances should carry their own instance ids,
- overrides should be explicit and local,
- and package export should preserve enough metadata to round-trip library-backed scenes cleanly.

Reusable motifs worth supporting in the library layer include:

- assembly templates,
- camera shot templates,
- overlay styles,
- teaching-pattern templates,
- and reaction or transfer templates where those become stable enough to reuse.

### Asset support boundaries

The composer should define a conservative first asset boundary so the tool stays academically coherent and technically manageable.

The first serious version should clearly distinguish:

- authored geometric and explanatory primitives,
- imported reference assets,
- and rendered output.

Recommended first-version asset support:

- imported still images for reference or limited panel use,
- imported SVG for simple vector reference diagrams where needed,
- and no dependency on external video compositing assets for the core authoring loop.

Recommended first-version exclusions:

- arbitrary decorative 3D mesh libraries,
- unrestricted shape libraries beyond the ellipse or ellipsoid house primitive,
- timeline-native video compositing as a core requirement,
- and broad asset pipelines that would turn the composer into a general media editor.

The priority should remain authored explanatory geometry. Imported assets may support that work, but they should not dominate the ontology or the UI.

---

## What exists today

The current webapp runtime already exposes a composer overlay with multiple panels and export flow.

Observed composer capabilities in the runtime:

- scene id and scene name inputs,
- node count and node label inputs,
- path mode selection and path reset,
- frame edit toggle, frame reset, and frame scale control,
- camera POI mode,
- camera waypoint add and clear,
- camera-path preview toggle,
- camera speed and camera radius controls,
- preview panel,
- docs panel,
- JSON export.

The current composer surface already suggests an intended authoring loop:

1. define a scene draft,
2. adjust path and frame geometry,
3. define camera behavior,
4. preview the scene live,
5. export canonical JSON.

The composer is already more than a scene-form generator. It is the start of an authoring environment for explanatory motion design.

---

## Canonical output

The composer should primarily output canonical JSON, not a saved program.

The intended architecture is:

1. composer/editor state,
2. normalizer and validator,
3. canonical JSON scene spec,
4. general composed-animation runtime/player.

This is the cleanest contract because the authored artifact should be:

- inspectable,
- diffable,
- schema-validatable,
- round-trippable through save, load, edit, and re-export,
- renderer-agnostic at the authored-data level,
- and deterministic enough for replay and debugging.

Programmatic builders or helpers may still exist, but they should compile down to the same canonical JSON before save/export.

The runtime should be general enough to read any valid composed-animation JSON scene and render it, rather than requiring a custom program per scene.

Important separation:

- canonical scene export should contain authored scene semantics,
- while workspace-only state such as current selection, open panels, temporary gizmo mode, or viewport camera during editing should remain editor state unless explicitly promoted into authored scene data.

### Editor and runtime responsibility split

The composer architecture should keep a hard boundary between:

- the editor
  - where scenes are authored, revised, inspected, and validated;
- and the runtime player
  - where valid composed-animation scenes are rendered and played back.

Editor responsibilities:

- draft editing,
- panel layout and workspace state,
- selection state,
- gizmo and manipulation tools,
- library browsing,
- timeline editing operations,
- lint and validation presentation,
- checkpoint management,
- and canonical export.

Runtime player responsibilities:

- load canonical scene data,
- resolve references,
- render assemblies, paths, overlays, and camera behavior,
- play the master timeline,
- honor pauses, shots, transitions, and tracks,
- and expose reader-facing playback controls appropriate to the published scene.

The runtime should not need to know:

- which panels were open during authoring,
- which object was selected last,
- what temporary gizmo mode the editor used,
- or other editor-only affordances.

The editor may preview through the runtime, but canonical scene playback should remain possible without the authoring shell.

### Revision and collaboration workflow

The composer should assume that serious scenes will be revised repeatedly and may eventually be developed collaboratively, even if the first implementation is single-author.

The workflow model should distinguish:

- draft scene state
  - the current editable workspace state;
- canonical authored scene
  - the validated semantic scene export;
- revision checkpoints
  - named or timestamped snapshots worth returning to;
- published or presentation-ready scene state
  - a scene revision suitable for reader-facing use or rendered export.

Useful first workflow features:

- save draft,
- restore last draft,
- save named checkpoint,
- compare current draft to canonical export,
- compare one checkpoint to another,
- and publish one selected revision to the scene graph or render pipeline.

Near-term collaboration assumptions:

- the first system may still be effectively single-user,
- but the scene format should not prevent later review, annotation, or handoff,
- and revision metadata should be clear enough that another author can understand what changed and why.

Collaboration-ready design guidance:

- canonical scene files should remain diffable,
- reusable library items should remain inspectable as ordinary structured data,
- and review should be able to comment on stable scene objects, not only on pixel output.

---

## Export classes

The composer should distinguish between authored scene export and rendered media export. Those are related, but they are not the same product surface.

The immediate source of truth should remain canonical JSON scene export.

The model should also leave room for two later export classes:

- portable scene package export
  - a bundle containing canonical scene JSON plus any referenced assets, preview metadata, and house-style bindings needed to move a scene between environments;
- rendered media export
  - outputs such as still frames, image sequences, or encoded video generated from a valid composed-animation scene.

The document does not need to lock final rendered media formats yet. It is enough to reserve the architectural distinction now so the composer does not assume that canonical JSON is the only meaningful export surface forever.

---

## Consolidated requirements

This section merges the remaining useful requirements into one set.

### 1. Scene-system requirements

- The format must work as the authored payload of a dedicated composed-animation scene type inside the existing scene graph.
- Higher-level collection scenes must be able to link to these scenes without forcing a markdown-target interaction model.
- The authored output should be an authored scene file that participates in the existing scene graph as a special scene type.
- Migration should preserve compatibility with the existing scene network so higher-level collection scenes can still link to these authored animation scenes using the current navigation model.

### 2. General design requirements

- One canonical authored model should cover both static diagrams and time-based animated assembly scenes.
- The same authored model should support both imaginative construction and observation-grounded reconstruction, so a scene can be used either to express a theory picture or to explain a measured or inferred phenomenon.
- Declarative authored data should be the default. Imperative or solver-backed behavior should be optional and explicitly marked.
- Deterministic defaults are required, but every meaningful default should be overrideable.
- Stable ids are required for all authored entities, assemblies, charges, paths, reactions, annotations, and anchors.
- The entire tool should exploit one native visual grammar built from spheres, paths, orbit or shell traces, and scale collapse, rather than introducing unrelated representational systems at different levels.
- The rendered primitive vocabulary should remain intentionally narrow so most scenes can be expressed as compositions of spheres, paths, orbit or shell traces, ellipses or ellipsoids, callouts, and labels.
- Every composed-animation scene should have an explicit master timeline in seconds so frequencies in Hz and timed reaction events are unambiguous.
- The master timeline should be understandable in standard motion-design terms, with clips, markers, overlays, pauses, and camera moves all reading as authored events on one shared time axis.
- The terminology throughout the composer should follow standard video-authoring language wherever that improves clarity for authors, including timeline, clip, track, overlay, fade in, hold, fade out, cue, playback, and scrub.
- The authored model should support one or more non-overlapping pauses on the master timeline, with each pause carrying its own pause duration.
- Pauses should behave like authored timeline holds rather than hidden playback hacks, so preview, export, and runtime playback all agree about when and how long motion is paused.
- The UI architecture should explicitly support multiple semantic design levels rather than treating all editing as one flat mode.
- Level transitions should distinguish between continuous spatial zoom and semantic zoom or mode shift, depending on whether the user is moving into deeper geometry or into a different kind of authoring task.
- The authored model should support a small, explicit interpolation vocabulary for motion, opacity, overlay timing, and camera behavior, including at minimum linear, ease in, ease out, ease in/out, and stepped or hold behavior.
- The authoring model should support keyframeable property channels where continuous change over time is required, even if the first UI exposes those channels through simplified controls rather than a full graph editor.
- The tool should use a compact, stable authoring-command vocabulary rather than a sprawling set of ad hoc modes.
- Timeline editing should support a small but explicit set of operations such as trim, split, move, duplicate, snap, and pause insertion.
- The scene model should support revision checkpoints and publication-ready scene states without confusing editor-only draft state with canonical authored output.

### 3. Scene and assembly requirements

- Assemblies should be recursive. A scene may contain nested assemblies, and an assembly may contain sub-assemblies with their own local frames, transforms, and motion.
- The same composition model should work for simple scene nodes, Noether cores, bound charges, and larger particle-like assemblies.
- Larger-scale authored objects should be allowed to collapse to sphere-like proxies when detail is not useful at the current scale, provided the deeper structure remains recoverable by drill-down or reveal.
- Assemblies should support metadata, links, drill-down targets, and inspectable annotations.
- Presets are useful, but every preset instance must remain editable as explicit structured data.
- Assemblies should be saveable to a reusable library so authored structures can be inserted, versioned, and reused across scenes.
- Library assemblies should support instance-level scaling so the same authored assembly can be reused at different sizes without redefining its internal structure.
- Library-backed authored motifs should support explicit per-instance overrides without mutating the reusable source definition.
- Any assembly should be able to be surrounded by a large population of additional spacetime assemblies that are instanced at small but still visible scale so the main assembly remains readable while its surrounding context is shown.
- Any detailed assembly should be able to collapse to a simpler proxy representation when zoomed out, such as a colored sphere or labeled sphere, so scenes remain legible and performant at multiple viewing scales.
- Assemblies and their constituents should support clear frame-aware selection so authors can edit parent staging and internal structure without losing orientation.

### 4. Noether core requirements

- The composer should support explicit authoring of a Noether core as a first-class assembly component.
- A Noether core should support shell geometry, orbital bands or layers, internal architrino organization, and optional multi-core composition.
- Core state should distinguish rest geometry from runtime deformation and motion state.
- A moving Noether core should be able to oblate along the axis of travel according to the Lorentz contraction law as velocity approaches \(c_f\).
- The deformation model should make the direction of travel explicit so the contracted axis is not ambiguous.
- The composer should allow both static inspection of a core and time-based playback of the core while it moves and deforms.

### 5. Internal dynamics requirements

- Internal architrinos should be authorable as explicit orbiting constituents of the Noether core rather than as hidden renderer effects.
- The composer should support circular and elliptical orbit families at minimum, with room for more general path-based internal motion later.
- Internal orbital motion should continue coherently while the containing assembly is translating, rotating, or deforming.
- Local orbital motion should compose cleanly with parent assembly transforms and parent path motion.
- Phase, angular speed, tilt, band attachment, and modulation should be explicit authored parameters.

### 6. Personality charge requirements

- Personality charges should be first-class typed entities such as `electrino` and `positrino`, with room for future extensions.
- Charges should support both independent scene-level placement and bound-to-core attachment derived from core configuration.
- Charge placement, count, sizing, orientation, and attachment policy should be declarative.
- The composer should support secondary small-scale charge motion such as jiggle, wobble, or bounded local perturbation without hiding that behavior in renderer-only code.
- Charge motion should be able to ride on top of larger assembly translation, rotation, and reaction choreography.

### 7. Motion, transform, and path requirements

- Every assembly should be able to translate and/or rotate independently of its internal motion.
- Motion must be frame-aware. Local motion, parent-relative motion, and absolute motion should be distinct and composable.
- The authored model should support fixed placement, straight-line motion, circular orbit, elliptical orbit, arbitrary paths, spin, and deforming motion.
- Arbitrary paths should support explicit points, spline-smoothed points, and primitive parameterizations where useful.
- Path, orbit, spin, translation, deformation, and jiggle should be composable rather than mutually exclusive.
- Time mapping, repeat behavior, phase offsets, and playback rate should be explicit.
- Transform editing should distinguish world, parent-relative, and local frames explicitly in both data and UI.

### 8. Path authoring requirements

- Path authoring must be 3D-native even when early editing flows are visually simple.
- The composer should support straight-line paths, circles, ellipses, splines, polylines, and arbitrary smoothed point sets at minimum.
- A path should declare its reference frame, time domain, repeat behavior, geometric payload, and preview style.
- Parent motion and local path motion should combine predictably so that nested transport is authorable without ad hoc exceptions.
- Camera paths and assembly motion paths should both be explicit structured objects, not implicit editor state.
- Time-varying transform and path behavior should support keyframe or channel-based interpolation rather than relying only on one-shot path presets.

### 9. Reaction requirements

- The composer should support reactions as first-class authored objects, not just as animation presets.
- A reaction should be able to involve multiple assemblies and multiple timed stages.
- Reaction authoring should support disassembly of reactants into constituent parts, transfer or handoff of those parts, and reassembly into products.
- Participants, timelines, triggers, branches, emissions, products, and handoff paths should be explicit.
- Reaction playback should support both structural changes and geometric choreography through space and time.
- Provenance should be preserved through reaction steps so authored outputs can show where components came from and where they went.

### 10. View and workflow requirements

- The composer should keep the current pattern of structured side panels plus live viewport preview.
- The primary authoring surface should include a timeline view or timeline inspector that makes clips, pauses, overlays, cue markers, and camera moves legible on one shared time axis.
- Preview should update from authored draft state with minimal guesswork.
- Preview should support play, pause, scrub, loop, and step controls in standard video-authoring terms.
- The viewport should support camera framing, camera paths, and scene playback without entangling view state with assembly semantics.
- Direct viewport interaction should preferentially target spheres, paths, orbit or shell traces, anchors, and overlays attached to them rather than encouraging free-floating scene semantics.
- In any authored scene, camera path and camera orientation may also evolve over the same scene timeline as the assembly animation.
- Camera paths should be first-class authored objects that can be saved, edited, reused, and attached to scene playback.
- The system should support authored automatic camera-follow modes analogous to photo-drone follow shots, but adapted to moving assemblies so the camera can orbit, trail, lead, flank, or otherwise observe a moving particle from changing orientations over time.
- Camera shots should be authored as explanatory units with explicit editorial purpose, not only as raw path intervals.
- Guided and advanced editing modes are desirable so the same tool can serve both preset-first authoring and direct schema-level editing.
- Runtime controls should fit the app's existing corner-control language, but allow an abbreviated animation-specific control set.
- The composer should support first-class overlays for explanation, including callout lines, text overlays, and shape overlays.
- Overlays should be authored on the same timeline as scene motion and camera motion, not added as post hoc editor-only decorations.
- Every overlay should support explicit fade-in duration, on-screen display duration, and fade-out duration.
- Overlays should preferentially attach to native geometric features such as spheres, paths, shells, orbit traces, and anchors rather than floating free without geometric meaning.
- The overlay and playback UI should prioritize the needs of explanatory academic video rather than trying to match the full complexity of Camtasia, OBS, or Resolve.
- Useful explanatory controls to consider include cue markers, chapter markers, scrubbing, frame-step or small time-step stepping, temporary focus or spotlight states, authored captions or labels, and presenter-safe composition guides.
- The explanatory toolset should also consider comparison-friendly controls such as ghosted previous or next positions, optional trajectory traces, and quick isolate or dim-others actions for the currently discussed assembly.
- The UI should present different tools and panel emphasis at sequence, shot, assembly, and constituent levels while keeping one stable sense of scene context.
- The default workspace should favor assembly or staging authoring, with sequence and shot work reachable through the timeline and constituent editing reachable by drill-down.
- The composer should support a simple but explicit layer or track ordering model for overlays, camera clips, and other timeline objects whose visual or editorial precedence matters.
- The author should be able to select, multiselect, hide, show, lock, unlock, and isolate authored objects without changing their canonical semantics.
- Snapping should be available for useful authoring targets such as timeline markers, pause boundaries, anchors, path points, and nearby guide geometry.
- The tool should support basic shot-transition semantics, including hard cut, dissolve, and continuous move, without requiring a full nonlinear editor feature set.
- Zoom and drill-down behavior should follow a consistent reveal model in which sphere-like proxies expand into paths, orbit or shell traces, and constituent structure as explanatory need increases.
- The workspace should preserve a stable left-browser, central viewport, right-inspector, and bottom-timeline grammar even as panel emphasis changes by level.
- The composer should support reusable teaching-pattern presets that insert editable authored objects rather than opaque effects.
- Pointer, keyboard, and transport behavior should be intentionally standardized so the tool feels closer to a disciplined motion-design workspace than to an ad hoc scene debugger.

### 11. Validation and migration requirements

- Structural validation should be provided by schema, with semantic lint on ids, references, motion targets, path references, palette names, and unsupported enums.
- Semantic lint should also check timeline consistency, shot continuity constraints, invalid overlap classes, unsupported asset kinds, and violations of the house graphics rules.
- Authored data should separate canonical saved values from preview-only helpers or temporary editing state.
- The migration path from the current `{ scene, objects[] }` runtime model to a fuller canonical assembly model should be explicit and incremental.
- The minimum useful subset should be implementable before the full reaction and provenance system is complete.
- Export architecture should distinguish canonical scene export, portable package export, and rendered media export even if only the first class is implemented initially.
- Imported assets should be validated against a deliberately narrow support boundary so reference media do not silently become a second uncontrolled scene language.
- Revision checkpoints and publication metadata should remain explicit enough that scenes can be reviewed, handed off, and restored predictably.

### 12. Additional requirements worth carrying now

- Units, time base, and angle conventions should be explicit in authored data.
- Palette and visual assignment policy should be explicit and deterministic.
- The model should support both 2D-facing presentation scenes and true 3D assembly scenes without forcing the same layout semantics onto both.
- Performance and preview quality controls should be explicit so dense assemblies and reactions can remain inspectable during authoring.
- The schema should leave room for future solver-backed motion without making the initial authoring model depend on a full physics solver.

---

## Brand graphics standard

The composer should follow one house visual language across the webapp so authored scenes feel like one academic instrument rather than a set of unrelated demos.

Core palette commitments:

- architrino red is the standard red-channel assembly color,
- architrino blue is the standard blue-channel assembly color,
- the standard purple neutral is the default neutral field or neutral-potential background color,
- and when scalar potential is depicted pointwise, the standard spectrum should run blue to purple to red.

Interpretive meaning:

- purple should be documented as the neutral-potential color rather than as an arbitrary accent,
- blue-to-purple-to-red should be used when a scene needs to depict signed potential scalars across a region,
- and the neutral purple background should remain visually compatible with academic diagrams, readable overlays, and subdued viewport chrome.

Allowed overlay and guide graphics should be intentionally narrow.

- The only general-purpose geometric shape primitive should be an ellipse in 2D or an ellipsoid in 3D.
- Axis lengths and axis orientation angles should be explicit authored parameters.
- Circles and spheres should be treated as special cases of those same ellipse or ellipsoid primitives.
- These shapes should render as transparent guide or emphasis graphics, in the same spirit as the central UI metaphor but without latitude or longitude linework.
- The default overlay style should remain quiet, translucent, and academically legible rather than decorative.

Typography and line treatment should also be standardized.

- Overlay text should read like lecture notation or figure annotation, not like advertising copy.
- Mathematical labels should preserve KaTeX-safe notation when formulas are shown in the viewport.
- Callout leaders and emphasis strokes should be restrained, with consistency preferred over flourish.
- The default visual hierarchy should let the assembly geometry remain primary, the overlay remain secondary, and the UI chrome remain tertiary.

This narrow graphics vocabulary is a feature, not a limitation. It keeps scenes visually consistent, protects the mathematical content from presentation clutter, and aligns the composer with the kind of explanatory graphics used in strong classroom or lecture videos.

---

## Data-model direction

The composer should use explicit structured data rather than inferred state.

The data model should distinguish at least these layers:

- scene identity and runtime type,
- timeline and playback state,
- spatial layout,
- view/camera state,
- path definitions,
- assembly definitions,
- overlays and explanatory graphics,
- reactions and transfers,
- provenance records.

Important distinction:

- `type`: what runtime scene type this is,
- `timeline`: how clips, pauses, markers, overlays, and playback windows are organized,
- `layout`: where things are arranged in space,
- `view`: how the camera or observer sees them,
- `time`: how animation evolves,
- `structure`: what is contained by what.

None of these should be collapsed into one overloaded field.

Paths should remain first-class objects. Overlays should remain first-class objects. Reactions should remain first-class objects. Provenance should remain explicit data, not just a rendered effect.

---

## Draft schema direction

A first practical composer schema stack could look like this:

- `SceneSpec`
- `UnitsSpec`
- `FrameSpec`
- `TransformSpec`
- `AnchorSpec`
- `RepeatSpec`
- `PauseSpec`
- `MarkerSpec`
- `ClipTimingSpec`
- `KeyframeSpec`
- `ChannelSpec`
- `AssetSpec`
- `LayoutSpec`
- `ViewSpec`
- `PathSpec`
- `AssemblySpec`
- `AssemblyLibrarySpec`
- `AssemblyInstanceSpec`
- `LodSpec`
- `CoreSpec`
- `ChargeSpec`
- `ReactionSpec`
- `TransferSpec`
- `ProvenanceSpec`
- `CameraPathSpec`
- `CameraShotSpec`
- `CameraTransitionSpec`
- `OverlaySpec`
- `TrackSpec`
- `TeachingPatternSpec`
- `LibraryPackageSpec`
- `RevisionCheckpointSpec`
- `PublicationSpec`
- `BrandGraphicsSpec`

### Primitive spec vocabulary

Before the larger scene and assembly objects are defined, the composer should lock a small set of reusable primitive spec types. These are the pieces that make path-relative authoring, nested assembly motion, and canonical export possible without hidden renderer state.

### UnitsSpec

Purpose:

- make length, angle, and time conventions explicit in authored data,
- keep canonical JSON deterministic,
- avoid silent interpretation drift between preview, export, and playback.

Draft shape:

```js
UnitsSpec {
  length: "scene" | "meters" | "arbitrary",
  angle: "degrees" | "radians",
  time: "seconds"
}
```

### FrameSpec

Purpose:

- define the reference frame in which a path, camera path, or local assembly motion lives,
- distinguish absolute motion from parent-relative motion,
- keep repeat behavior attached to the local frame rather than to world space.

Draft shape:

```js
FrameSpec {
  space: "absolute" | "relative",
  relativeTo?: Ref,
  repeat?: RepeatSpec
}
```

### TransformSpec

Purpose:

- provide explicit placement, orientation, and scale,
- separate local transform from path motion and other time-dependent motion,
- keep static geometry readable in canonical JSON.

Draft shape:

```js
TransformSpec {
  position?: [number, number, number],
  rotation?: [number, number, number],
  scale?: number | [number, number, number]
}
```

### AnchorSpec

Purpose:

- define reusable local or derived reference points,
- support point, axis, or center-of-momentum style references,
- avoid hiding important attachment logic inside renderer code.

Draft shape:

```js
AnchorSpec {
  id: string,
  kind: "point" | "axis" | "com",
  target: Ref,
  offset?: [number, number, number],
  axis?: [number, number, number]
}
```

### RepeatSpec

Purpose:

- define looping behavior explicitly,
- keep local periodic motion distinct from the world trajectory of the parent frame,
- make phase offsets and time scaling explicit.

Draft shape:

```js
RepeatSpec {
  mode: "loop" | "pingpong" | "clamp",
  period: number,
  phase?: number,
  timeScale?: number
}
```

### PauseSpec

Purpose:

- define authored holds on the master timeline,
- ensure pauses are explicit timeline objects rather than preview-only controls,
- keep educational timing aligned across authoring, export, and playback.

Draft shape:

```js
PauseSpec {
  id: string,
  start: number,
  duration: number,
  label?: string
}
```

Requirements:

- pauses must not overlap,
- pause timing should be validated against the master timeline,
- and pause duration should extend playback time without mutating the underlying scene geometry.

### MarkerSpec

Purpose:

- define cue markers, chapter markers, and other authored timeline reference points,
- support classroom-style explanation and navigation,
- keep preview, playback, and export aligned around the same timeline landmarks.

Draft shape:

```js
MarkerSpec {
  id: string,
  t: number,
  kind: "cue" | "chapter" | "beat" | "note",
  label?: string
}
```

### ClipTimingSpec

Purpose:

- define standard clip-style timing language for overlays and similar authored timeline objects,
- keep timing semantics legible to authors coming from ordinary video tools,
- avoid one-off timing fields drifting across object types.

Draft shape:

```js
ClipTimingSpec {
  start: number,
  fadeIn?: number,
  hold?: number,
  fadeOut?: number
}
```

Derived timing semantics:

- the clip begins at `start`,
- visible strength ramps in over `fadeIn`,
- remains fully visible for `hold`,
- and exits over `fadeOut`.

If all four quantities are present, the total clip span is:

```js
end = start + fadeIn + hold + fadeOut
```

This is the terminology the composer should use in the UI as well.

### KeyframeSpec

Purpose:

- define authored value changes at specific times,
- support camera, transform, opacity, and other time-varying properties,
- keep interpolation explicit rather than hidden in renderer behavior.

Draft shape:

```js
KeyframeSpec {
  t: number,
  value: unknown,
  interpolation?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "hold"
}
```

### ChannelSpec

Purpose:

- group keyframes by animated property,
- give the composer a lightweight property-track model without requiring a full graph-editor design,
- and keep animation semantics portable across preview, export, and runtime playback.

Draft shape:

```js
ChannelSpec {
  id: string,
  target: Ref,
  property: string,
  keyframes: KeyframeSpec[]
}
```

### RevisionCheckpointSpec

Purpose:

- record named restore points during authoring,
- support handoff and recovery,
- and distinguish editor workflow history from the canonical authored scene state.

Draft shape:

```js
RevisionCheckpointSpec {
  id: string,
  label?: string,
  createdAt?: string,
  note?: string
}
```

### PublicationSpec

Purpose:

- mark which revision or scene state is intended for reader-facing or render-facing use,
- support publish versus draft distinction,
- and keep publication metadata explicit.

Draft shape:

```js
PublicationSpec {
  status: "draft" | "review" | "published",
  checkpointId?: string,
  publishedAt?: string,
  note?: string
}
```

### AssetSpec

Purpose:

- register imported reference assets explicitly,
- keep imported media subordinate to authored scene semantics,
- and make supported asset boundaries reviewable and validatable.

Draft shape:

```js
AssetSpec {
  id: string,
  kind: "image" | "svg" | "reference",
  src: string,
  usage?: "panel" | "overlay-reference" | "backplate-reference",
  metadata?: Record<string, unknown>
}
```

Guidance:

- assets should be explicit references rather than hidden editor attachments,
- supported kinds should remain intentionally narrow in the first serious version,
- and the runtime should remain functional even when a scene uses no imported assets at all.

### Path-source taxonomy

Paths should remain first-class authored objects, and their source should be explicit rather than inferred from editor state.

The minimum useful source taxonomy is:

- `function`
  - parametric primitives such as line, circle, ellipse, helix, spline, or other explicit curve definitions;
- `points`
  - explicit 3D samples or control points, with either polyline or spline interpolation;
- `group`
  - a center, centroid, anchor, or other group-level transport path tied to a parent assembly;
- `simulated`
  - imported or solver-produced sampled motion, when later solver-backed motion is introduced.

This is useful because it lets the same runtime handle:

- hand-authored paths,
- library-based reusable orbit primitives,
- assembly transport,
- and later data- or solver-backed motion

without changing the canonical scene contract.

### SceneSpec

Purpose:

- identify the root authored object,
- declare the runtime scene type,
- hold nested assemblies or child authored structures,
- define time and units,
- connect layout, view, playback, and structure.

Draft root shape:

```js
SceneSpec {
  scene: {
    id: string,
    type: "Scene-Composed-Animation",
    kind: "composed_animation",
    name: string,
    mode?: "2d" | "2.5d" | "3d",
    layout?: LayoutSpec,
    view?: ViewSpec,
    time?: TimeSpec,
    palette?: PaletteBinding,
    controls?: ControlSpec,
    pauses?: PauseSpec[],
    markers?: MarkerSpec[],
    brandGraphics?: BrandGraphicsSpec,
    publication?: PublicationSpec
  },
  assets?: AssetSpec[],
  assemblies: AssemblySpec[],
  libraryRefs?: Array<{
    entryId: string,
    transform?: TransformSpec
  }>,
  assemblyInstances?: AssemblyInstanceSpec[],
  paths?: PathSpec[],
  cameraPaths?: CameraPathSpec[],
  cameraShots?: CameraShotSpec[],
  cameraTransitions?: CameraTransitionSpec[],
  tracks?: TrackSpec[],
  channels?: ChannelSpec[],
  overlays?: OverlaySpec[],
  teachingPatterns?: TeachingPatternSpec[],
  reactions?: ReactionSpec[],
  transfers?: TransferSpec[],
  provenance?: ProvenanceSpec[],
  checkpoints?: RevisionCheckpointSpec[],
  metadata?: Record<string, unknown>
}
```

### TrackSpec

Purpose:

- define editorial or visual ordering for authored timeline objects,
- keep overlay and shot organization legible,
- and provide a small layer model without committing to a heavyweight NLE architecture.

Draft shape:

```js
TrackSpec {
  id: string,
  role: "overlay" | "camera" | "annotation" | "editorial",
  order: number,
  items: Ref[],
  locked?: boolean,
  hidden?: boolean
}
```

### TeachingPatternSpec

Purpose:

- capture reusable explanatory motifs as explicit authored structures,
- speed up scene construction without hiding what was inserted,
- and keep the instructional vocabulary of the composer portable across scenes.

Draft shape:

```js
TeachingPatternSpec {
  id: string,
  kind:
    | "highlight-assembly"
    | "callout-and-label"
    | "pause-and-explain"
    | "trace-path"
    | "compare-two-structures"
    | "reveal-internal-structure"
    | "shot-introduction"
    | "custom",
  targets?: Ref[],
  generatedItems?: Ref[],
  params?: Record<string, unknown>
}
```

Guidance:

- a teaching pattern should insert ordinary authored objects such as overlays, pauses, markers, or camera shots,
- `generatedItems` should point to those ordinary objects after insertion,
- and authors should be free to edit the inserted objects directly without breaking the scene model.

### LibraryPackageSpec

Purpose:

- describe a portable bundle of reusable authored definitions,
- support versioned reuse across scenes and workspaces,
- and keep library-backed authoring explicit rather than hidden in editor memory.

Draft shape:

```js
LibraryPackageSpec {
  id: string,
  version?: string,
  assemblies?: AssemblyLibrarySpec,
  teachingPatterns?: TeachingPatternSpec[],
  cameraShots?: CameraShotSpec[],
  overlays?: OverlaySpec[],
  metadata?: Record<string, unknown>
}
```

Guidance:

- package contents should remain ordinary canonical objects,
- package import should preserve stable definition ids,
- and instance placement inside a scene should still create explicit scene-local references or overrides.

### Validation and lint model

The composer should distinguish three levels of scene checking.

#### 1. Structural validation

These are schema-level failures.

Examples:

- missing ids,
- malformed timing objects,
- invalid enum values,
- missing required references,
- and impossible primitive payload shapes.

#### 2. Semantic lint

These are authored-scene problems that may still parse but should be surfaced clearly to the author.

Examples:

- overlapping pauses,
- clips with negative or zero meaningful duration,
- shot transitions pointing to missing shots,
- overlays with no useful target or placement,
- illegal shape kinds outside ellipse or ellipsoid,
- invalid asset kinds,
- track items that point to incompatible object types,
- and references that cross frames or levels in a way the runtime cannot interpret.

#### 3. Editorial or graphics lint

These are not syntax errors, but they protect the quality bar of the tool.

Examples:

- text overlays that are too long to read comfortably,
- excessive simultaneous overlays,
- camera shots that cut so quickly they defeat explanation,
- abrupt framing jumps that break spatial continuity without an explicit editorial reason,
- callout density that obscures the primary geometry,
- and color assignments that violate the house palette semantics.

Recommended lint families:

- timeline lint
  - overlaps, gaps where forbidden, impossible transitions, invalid pause placement;
- shot lint
  - orphan shots, empty shots, shots with no target or no editorial role, disorienting continuity jumps;
- graphics lint
  - unsupported shapes, off-brand palette use, unreadable text contrast, excessive overlay clutter;
- structural lint
  - broken references, cyclic parentage where forbidden, invalid frame bindings, invalid overrides;
- asset lint
  - unsupported asset kinds, missing asset references, imported assets used where authored primitives should be used instead.

The validator should not merely reject malformed scenes. It should help authors produce scenes that are mathematically legible, visually disciplined, and instructionally effective.

### LayoutSpec

Purpose:

- define spatial arrangement,
- stay independent from camera/view state,
- remain extensible from simple authored layouts to full 3D placement schemes.

For composer work, layout must be 3D-capable even if some early editing flows still feel planar.

### ViewSpec

Purpose:

- define camera framing,
- support orbit, fly, or waypoint-based motion,
- support automatic follow-camera modes for moving assemblies,
- support playback views without rewriting assembly layout.

This is important because the composer already has camera waypoint and camera-path concepts in the runtime.

Draft shape:

```js
ViewSpec {
  activeCameraPath?: string,
  cameraPaths?: CameraPathSpec[],
  defaultCamera?: {
    position?: [number, number, number],
    lookAt?: [number, number, number],
    orientation?: [number, number, number]
  }
}
```

### OverlaySpec

Purpose:

- define explanatory overlays as first-class authored objects,
- align composer terminology with standard video-authoring language,
- support instructional graphics without coupling them to the underlying assembly geometry.

Draft shape:

```js
OverlaySpec {
  id: string,
  kind: "text" | "callout" | "ellipse" | "ellipsoid",
  frame?: FrameSpec,
  anchor?: Ref,
  timing: ClipTimingSpec,
  style?: StyleSpec,
  payload: Record<string, unknown>
}
```

Notes:

- `callout` should cover line-based pointer overlays aimed at a target, label, or anchor,
- `text` should support concise instructional captions and labels,
- `ellipse` and `ellipsoid` should be the only general-purpose highlight-shape primitives,
- and overlay timing should use the standard video phases of fade in, hold, and fade out.

Recommended overlay semantics:

- overlays should read like timeline clips with explicit in and out behavior,
- overlays should support attachment either to world space, a local frame, or a tracked anchor,
- and the default authoring vocabulary should favor explanation primitives over decorative graphics.

Editorial implications:

- overlays should be placeable on explicit overlay tracks,
- overlapping overlays should resolve according to track order and local z-bias,
- and authors should be able to lock or hide overlay tracks during editing.

### Overlay payload vocabulary

The composer should make a small number of overlay types feel excellent rather than exposing a large grab bag of mediocre graphics. The goal is to support the kinds of instructional emphasis that appear in strong classroom, explainer, and lecture videos.

#### Text overlays

Purpose:

- provide short labels, section titles, equation captions, and explanatory notes,
- support mathematical notation without turning the viewport into a word processor,
- keep instructional text consistent with the broader academic voice of the corpus.

Draft payload:

```js
TextOverlayPayload {
  text: string,
  textFormat?: "plain" | "markdown" | "tex",
  role?: "label" | "caption" | "title" | "equation-note",
  position?: [number, number] | [number, number, number],
  align?: "start" | "center" | "end",
  maxWidth?: number,
  panel?: "none" | "quiet-chip" | "quiet-panel"
}
```

Guidance:

- text overlays should be concise and instructional,
- display math should be used only when the expression genuinely needs it,
- sentence case should be the default for labels and captions,
- and text overlays should support KaTeX-safe math rendering when `textFormat` requires it.

#### Callout overlays

Purpose:

- connect an explanatory label to a target assembly, anchor, or local geometric feature,
- support the standard lecture-video pattern of pointing while naming,
- keep emphasis tied to actual scene geometry rather than to arbitrary screen positions.

Draft payload:

```js
CalloutOverlayPayload {
  target: Ref,
  label?: string,
  labelFormat?: "plain" | "markdown" | "tex",
  lineStyle?: "straight" | "elbow" | "curve",
  endcap?: "none" | "dot" | "arrow",
  sourcePosition?: [number, number] | [number, number, number],
  labelOffset?: [number, number],
  attachTo?: "anchor" | "bounds" | "center"
}
```

Guidance:

- callouts should prefer simple straight or elbow leaders over decorative curves,
- the line should read as a pointer, not as a diagram object in its own right,
- and labels should remain short enough that the scene stays primary.

#### Ellipse overlays

Purpose:

- highlight a 2D region or a projected feature with the standard house guide shape,
- support emphasis, grouping, and local comparison without introducing arbitrary polygons.

Draft payload:

```js
EllipseOverlayPayload {
  center?: [number, number] | [number, number, number],
  attachTo?: Ref,
  radii: [number, number],
  rotation?: number,
  strokeAlign?: "center" | "inside" | "outside"
}
```

#### Ellipsoid overlays

Purpose:

- highlight a 3D region, volume, or uncertainty envelope with the standard house guide shape,
- support spheres as a special case without introducing separate primitive families.

Draft payload:

```js
EllipsoidOverlayPayload {
  center?: [number, number, number],
  attachTo?: Ref,
  axes: [number, number, number],
  orientation?: [number, number, number]
}
```

Shared geometry guidance:

- ellipse and ellipsoid overlays should default to transparent fill with restrained stroke,
- they should be usable either as free guide geometry or as target-attached emphasis geometry,
- and they should support quiet animation through the same clip timing model as other overlays.

### Overlay style language

The style system for overlays should stay small, explicit, and biased toward academic clarity.

Recommended style fields:

```js
OverlayStyleSpec {
  stroke?: string,
  strokeWidth?: number,
  strokeOpacity?: number,
  fill?: string,
  fillOpacity?: number,
  textColor?: string,
  lineOpacity?: number,
  zBias?: number
}
```

Style guidance:

- line weights should be restrained and consistent,
- opacity should do more work than ornament,
- text should remain readable against the neutral purple background,
- and the default style presets should look like lecture graphics, not broadcast graphics.

### BrandGraphicsSpec

Purpose:

- document the house graphics language for composed scenes,
- make palette semantics and guide-shape constraints explicit,
- and keep authoring outputs visually consistent across the webapp.

Draft shape:

```js
BrandGraphicsSpec {
  palette: {
    architrinoRed: string,
    architrinoBlue: string,
    neutralPurple: string,
    scalarSpectrum: [string, string, string]
  },
  typography?: {
    overlayTextTone: "academic" | "neutral",
    mathSupport: true
  },
  overlays: {
    allowedShapes: ["ellipse", "ellipsoid"],
    translucentByDefault: true
  }
}
```

### PathSpec

Purpose:

- define how an object moves through its frame,
- allow function paths, point paths, straight-line paths, or group paths,
- preserve repeat and sampling behavior explicitly.

Draft shape:

```js
PathSpec {
  id: string,
  kind: "line" | "function" | "points" | "group",
  frame: FrameSpec,
  time?: TimeMapSpec,
  style?: StyleSpec,
  payload: Record<string, unknown>
}
```

### AssemblySpec

Purpose:

- define reusable assembly-oriented structures,
- support recursive composition,
- carry local attributes such as geometry, transforms, charges, and internal organization.

Draft shape:

```js
AssemblySpec {
  id: string,
  role: "assembly" | "core" | "charge" | "annotation" | string,
  transform?: TransformSpec,
  motion?: MotionSpec | MotionSpec[],
  children?: AssemblySpec[],
  lod?: LodSpec,
  core?: CoreSpec,
  charge?: ChargeSpec,
  annotations?: Record<string, unknown>,
  metadata?: Record<string, unknown>
}
```

### AssemblyLibrarySpec

Purpose:

- store reusable authored assemblies outside one scene,
- support insertable presets without losing explicit authored structure,
- allow versioned reuse across multiple composed-animation scenes,
- allow per-instance transform overrides such as scale when a library entry is inserted into a scene.

Draft shape:

```js
AssemblyLibrarySpec {
  entries: Array<{
    id: string,
    version?: string,
    assembly: AssemblySpec,
    metadata?: Record<string, unknown>
  }>
}
```

### AssemblyInstanceSpec

Purpose:

- place many reusable assemblies into one scene without redefining each assembly body,
- support context populations such as many nearby spacetime assemblies,
- allow per-instance transform overrides, especially small visible scaling.

Draft shape:

```js
AssemblyInstanceSpec {
  id: string,
  source: { assemblyId?: string, libraryEntryId?: string },
  transform?: TransformSpec,
  motion?: MotionSpec | MotionSpec[],
  count?: number,
  distribution?: {
    type: "points" | "ring" | "shell" | "grid" | "path" | "custom",
    params?: Record<string, unknown>
  },
  visibility?: {
    minVisualScale?: number
  }
}
```

### LodSpec

Purpose:

- define zoom-dependent or distance-dependent replacement of a detailed assembly with simpler proxy representations,
- preserve scene readability and performance without losing authored semantic identity.

Draft shape:

```js
LodSpec {
  levels: Array<{
    minScreenSize?: number,
    maxDistance?: number,
    renderAs: "full" | "sphere" | "labeled_sphere" | "custom",
    color?: string,
    label?: string
  }>
}
```

### CoreSpec

Purpose:

- define an explicit Noether core,
- support shell geometry, band structure, internal architrino organization, and deformation.

Draft shape:

```js
CoreSpec {
  coreType: "noether",
  profile?: "spherical" | "flat" | "custom",
  shell?: GeometrySpec,
  bands?: Array<{
    id: string,
    radius: number,
    color?: ColorRef
  }>,
  binaries?: Array<{
    id: string,
    motion: MotionSpec
  }>,
  architrinos?: Array<{
    id: string,
    orbit: MotionSpec
  }>,
  deformation?: {
    type: "none" | "lorentz_oblate" | "pulse" | "custom",
    axisSource?: "velocity" | "path_tangent" | "custom",
    params?: Record<string, number>
  }
}
```

### ChargeSpec

Purpose:

- define typed personality charges,
- support binding mode, placement policy, and local secondary motion.

Draft shape:

```js
ChargeSpec {
  type: "electrino" | "positrino" | string,
  attach: "independent" | "bound_to_core",
  placement?: "band" | "shell" | "custom",
  placementParams?: Record<string, number>,
  motion?: MotionSpec | MotionSpec[]
}
```

### MotionSpec

Purpose:

- define composable motion primitives for transport, internal dynamics, and deformation.

Draft shape:

```js
MotionSpec =
  | { type: "fixed" }
  | { type: "translate", velocity?: [number, number, number], angularVelocity?: [number, number, number] }
  | { type: "orbit.circular", center: Ref, radius: number, frequencyHz: number, phase?: number, direction?: "cw" | "ccw" }
  | { type: "orbit.elliptical", center: Ref, a: number, b: number, frequencyHz: number, phase?: number, tilt?: [number, number, number], direction?: "cw" | "ccw" }
  | { type: "path", pathId: string, speed?: number, phase?: number }
  | { type: "jiggle", amplitude: number, frequency?: number, seed?: number }
  | { type: "deform", profile: "lorentz_oblate" | string, target?: Ref, params?: Record<string, number> }
```

### TimeSpec

Purpose:

- define the master scene timeline in seconds,
- make playback length, rate, and looping explicit,
- provide the base clock for Hz-based motion.

Draft shape:

```js
TimeSpec {
  timeBase: "seconds",
  start: number,
  end: number,
  playbackRate?: number,
  loop?: boolean
}
```

### CameraPathSpec

Purpose:

- define camera position and viewing orientation over the same scene timeline as assembly animation,
- support both explicit authored paths and automatic follow-camera modes.

Draft shape:

```js
CameraPathSpec {
  id: string,
  mode: "waypoints" | "follow",
  frame?: FrameSpec,
  timing?: TimeMapSpec,
  waypoints?: Array<{
    t: number,
    position?: [number, number, number],
    lookAt?: [number, number, number],
    orientation?: [number, number, number]
  }>,
  follow?: {
    target: Ref,
    style: "trail" | "lead" | "flank" | "orbit" | "custom",
    distance?: number,
    height?: number,
    lateralOffset?: number,
    lookAtTarget?: Ref
  }
}
```

### CameraShotSpec

Purpose:

- define shot-level camera intent on the shared timeline,
- separate editorial shot design from lower-level path geometry,
- and support common explanatory shot patterns without requiring a cinema-grade camera system.

Draft shape:

```js
CameraShotSpec {
  id: string,
  timing: ClipTimingSpec,
  cameraPath?: Ref,
  kind?: "establishing" | "detail" | "follow" | "orbit" | "comparison" | "custom",
  target?: Ref,
  framing?: "wide" | "medium" | "close" | "detail",
  notes?: string
}
```

Guidance:

- `CameraPathSpec` defines where the camera can move,
- `CameraShotSpec` defines why that interval exists and how it should read editorially,
- and the shot model should stay small, explicit, and aligned with explanatory video rather than cinematic flourish for its own sake.

### CameraTransitionSpec

Purpose:

- define how the viewer moves from one camera shot to the next,
- keep shot transitions explicit on the same timeline,
- and support a minimal but useful editorial vocabulary.

Draft shape:

```js
CameraTransitionSpec {
  id: string,
  from: Ref,
  to: Ref,
  at: number,
  kind: "cut" | "dissolve" | "continuous-move",
  duration?: number
}
```

Guidance:

- `cut` should be the default editorial transition,
- `dissolve` should be reserved for intentional soft comparison or passage,
- `continuous-move` should be used when the same camera motion remains conceptually continuous across adjacent shots.

### ReactionSpec and TransferSpec

Purpose:

- model exchanges, relocks, handoffs, disassembly, and branch outcomes,
- connect time, participants, and path geometry,
- remain explicit enough for export, validation, and replay.

Draft shape:

```js
ReactionSpec {
  id: string,
  participants: Array<{ assembly: Ref, role: "reactant" | "product" | "catalyst" | "emission" }>,
  timeline?: Array<{
    t: number,
    action: "spawn" | "despawn" | "transform" | "detach" | "attach" | "handoff" | "reassemble",
    target: Ref,
    params?: Record<string, unknown>
  }>,
  outputs?: Array<{ toScene?: string }>
}
```

### ProvenanceSpec

Purpose:

- record causal origin and transfer history,
- survive export/import,
- support both visualization and analysis.

Possible fields include:

- source id,
- destination id,
- transfer time,
- path or corridor id,
- recruited substrate source,
- confidence or validation state.

---

## Near-term implementation stance

The near-term composer should not try to solve the full final problem all at once.

The right near-term stance is:

1. keep the current overlay-based authoring shell,
2. strengthen the exported scene/spec structure,
3. add a dedicated `Scene-Composed-Animation` runtime path,
4. make paths, frame state, timeline markers, pauses, overlays, interpolation channels, and camera state more explicit,
5. add recursive assembly authoring,
6. add explicit Noether core authoring,
7. add bound personality charge authoring,
8. add explicit translation, rotation, and internal orbit motion,
9. add reaction objects,
10. add provenance objects,
11. move progressively toward a truly 3D-first authoring model.

That path respects the current implementation while still aiming at the correct long-term ontology.

### Practical implementation phases

To keep the tool world-class without making the first implementation impossible, the build should proceed in deliberately bounded phases.

#### Phase 1: sequence and staging MVP

Target:

- one composed-animation scene type,
- canonical JSON export,
- master timeline,
- markers,
- pauses,
- basic overlays,
- assembly transforms,
- path authoring,
- and camera-path preview.

This phase should already be able to produce polished instructional scenes with a clear beginning, middle, and end.

#### Phase 2: shot and editorial refinement

Target:

- camera shots,
- camera transitions,
- explicit track ordering,
- snap behavior,
- hide, lock, and isolate controls,
- and stronger timeline editing.

This phase should make the tool feel like a real explanatory motion-design system rather than a geometry editor with playback.

#### Phase 3: constituent and reaction depth

Target:

- constituent drill-down editing,
- stronger internal-dynamics controls,
- reaction choreography,
- transfer and provenance objects,
- and reusable explanatory templates.

This phase should make the composer capable of expressing the deeper assembly logic of $\mathbb{A}\mathbb{A}\mathbb{A}$ rather than only outer staging.

#### Phase 4: portability and rendering outputs

Target:

- portable scene package export,
- rendered-media export classes,
- scene-library reuse,
- and stronger validation or lint around authoring semantics.

This phase should make scenes portable and publication-ready without changing the canonical authored model.

### Implementation modules and ticketing direction

The implementation should be decomposed into a small number of coherent modules so product work does not collapse into one monolithic composer blob.

Recommended module families:

- scene document core
  - canonical scene model, ids, references, normalization, serialization;
- timeline engine
  - markers, pauses, clip timing, tracks, retiming operations, playback clock;
- viewport and staging engine
  - assembly rendering, transforms, anchors, paths, gizmos, selection framing;
- camera and shot engine
  - camera paths, camera shots, transitions, follow modes, shot playback logic;
- overlay and annotation engine
  - text, callouts, ellipse and ellipsoid guides, style presets, timing behavior;
- library and preset engine
  - reusable definitions, instance overrides, teaching patterns, package import/export;
- validation and lint engine
  - structural validation, semantic lint, graphics lint, continuity lint, asset lint;
- authoring shell
  - panels, breadcrumbs, level switching, keyboard shortcuts, command routing;
- runtime player
  - reader-facing playback for canonical scenes outside the full editor shell.

This module split should also guide ticketing.

Good ticket grain:

- one timeline operation,
- one overlay kind,
- one camera-shot behavior,
- one validation family,
- one library action,
- one viewport interaction pattern.

Bad ticket grain:

- “build composer,”
- “finish timeline,”
- or other work items that hide multiple semantic systems inside one vague task.

---

## Coverage of the target scenes

The draft schema above is intended to be able to describe the target scenes discussed so far.

- A translating electron-like assembly is covered by `TimeSpec`, a root `AssemblySpec`, a straight-line `PathSpec`, a `CoreSpec` with internal `architrinos`, and bound `ChargeSpec` entries for the six electrino personality charges.
- A high-velocity Lorentz-oblate flythrough is covered by parent transport motion plus `CoreSpec.deformation` with `type: "lorentz_oblate"` and an axis derived from velocity or path tangent.
- A curved-path assembly with charge jiggle is covered by spline or point-based `PathSpec` plus local `jiggle` motions on the charge specs.
- A reaction with disassembly and reassembly is covered by `ReactionSpec`, `TransferSpec`, and `ProvenanceSpec` on the shared scene timeline.
- A photon-like paired-core assembly is covered by one parent `AssemblySpec` containing two child flat `CoreSpec` objects, a small authored offset in local transforms, and explicit `binaries` whose motions carry `direction: "cw"` or `direction: "ccw"`.
- Camera action across any of these scenes is covered by `ViewSpec` plus `CameraPathSpec`, either as explicit waypoints with `position`, `lookAt`, or `orientation`, or as authored follow modes such as trail, lead, flank, or orbit around a moving target assembly.
- Zoomed-out replacement of a detailed assembly by a simple blue sphere or blue labeled `e` sphere is covered by `LodSpec` on the relevant assembly or library-backed assembly instance.
- Explanation overlays, chapter markers, and pause windows across any of these scenes are covered by `OverlaySpec`, `MarkerSpec`, and `PauseSpec` on the shared master timeline.

---

## MVP canonical scene examples

The best way to keep the architecture honest is to show that the schema can already express a few simple but real scenes.

### Example 1: translating assembly with one pause and one callout

This is not a full production scene. It is a minimum coherent example showing one assembly, one path, one camera path, one pause, one marker, and one explanatory overlay.

```js
{
  scene: {
    id: "electron-flythrough-a",
    type: "Scene-Composed-Animation",
    kind: "composed_animation",
    name: "Electron-like Assembly Flythrough",
    mode: "3d",
    time: { timeBase: "seconds", start: 0, end: 12, loop: false },
    pauses: [{ id: "pause-1", start: 5.0, duration: 1.5, label: "Explain shell" }],
    markers: [
      { id: "mk-intro", t: 0.0, kind: "chapter", label: "Overview" },
      { id: "mk-shell", t: 5.0, kind: "cue", label: "Fourth shell callout" }
    ]
  },
  assemblies: [
    {
      id: "electron-1",
      role: "assembly",
      transform: { position: [0, 0, 0] },
      motion: [{ type: "path", pathId: "p-main", speed: 1.0 }],
      core: {
        coreType: "noether",
        profile: "spherical",
        architrinos: [
          { id: "a1", orbit: { type: "orbit.circular", center: "electron-1", radius: 0.4, frequencyHz: 0.8 } }
        ]
      },
      charge: {
        type: "electrino",
        attach: "bound_to_core",
        placement: "shell",
        placementParams: { shell: 4 }
      }
    }
  ],
  paths: [
    {
      id: "p-main",
      kind: "line",
      frame: { space: "absolute" },
      payload: { from: [-6, 0, 0], to: [6, 0, 0] }
    }
  ],
  cameraPaths: [
    {
      id: "cam-main",
      mode: "follow",
      follow: { target: "electron-1", style: "trail", distance: 5, height: 1.5 }
    }
  ],
  overlays: [
    {
      id: "ov-shell-callout",
      kind: "callout",
      anchor: "electron-1",
      timing: { start: 5.0, fadeIn: 0.25, hold: 1.0, fadeOut: 0.25 },
      payload: {
        target: "electron-1",
        label: "Fourth-shell charge structure",
        lineStyle: "straight",
        endcap: "dot",
        attachTo: "center"
      }
    }
  ],
  tracks: [
    { id: "trk-overlay", role: "overlay", order: 10, items: ["ov-shell-callout"] }
  ]
}
```

### Example 2: shot-based explanation with comparison beat

This example shows sequence-level and shot-level structure more explicitly.

```js
{
  scene: {
    id: "paired-comparison-a",
    type: "Scene-Composed-Animation",
    kind: "composed_animation",
    name: "Paired Structure Comparison",
    mode: "3d",
    time: { timeBase: "seconds", start: 0, end: 16, loop: false },
    markers: [
      { id: "mk-establish", t: 0, kind: "chapter", label: "Establishing view" },
      { id: "mk-compare", t: 8, kind: "chapter", label: "Comparison" }
    ]
  },
  assemblies: [
    { id: "assembly-left", role: "assembly", transform: { position: [-2, 0, 0] } },
    { id: "assembly-right", role: "assembly", transform: { position: [2, 0, 0] } }
  ],
  cameraPaths: [
    {
      id: "cam-establish",
      mode: "waypoints",
      waypoints: [
        { t: 0, position: [0, 2, 10], lookAt: [0, 0, 0] },
        { t: 8, position: [0, 2, 8], lookAt: [0, 0, 0] }
      ]
    },
    {
      id: "cam-compare",
      mode: "waypoints",
      waypoints: [
        { t: 8, position: [0, 1, 7], lookAt: [0, 0, 0] },
        { t: 16, position: [0, 1, 7], lookAt: [0, 0, 0] }
      ]
    }
  ],
  cameraShots: [
    {
      id: "shot-establish",
      timing: { start: 0, fadeIn: 0, hold: 8, fadeOut: 0 },
      cameraPath: "cam-establish",
      kind: "establishing",
      framing: "wide"
    },
    {
      id: "shot-compare",
      timing: { start: 8, fadeIn: 0, hold: 8, fadeOut: 0 },
      cameraPath: "cam-compare",
      kind: "comparison",
      framing: "medium"
    }
  ],
  tracks: [
    { id: "trk-camera", role: "camera", order: 0, items: ["shot-establish", "shot-compare"] }
  ]
}
```

These examples are intentionally compact. Their job is to prove that the architecture can already describe the kind of scenes the tool is supposed to author.

---

## Recommended direction

The long-term vision should be:

- a 3D-first authoring environment,
- a dedicated composed-animation scene type inside the existing scene graph,
- canonical JSON export from structured authored data,
- a general runtime that can render any valid composed-animation scene,
- one coherent sphere-path-orbit visual grammar across all authoring scales,
- explicit Noether core, charge, path, and reaction authoring,
- explicit time-aware playback,
- recursive assembly construction,
- explicit provenance and path-history.

The correct next step is to treat this document as the single source of truth for the composer architecture and composed-animation scene model.

---

## Authoring glossary

The composer should use a small, stable vocabulary. The same words should mean the same thing in the UI, the schema, the documentation, and later implementation notes.

Recommended core terms:

- scene
  - one complete composed-animation work with one master timeline;
- sequence
  - the whole explanatory progression of one scene across that timeline;
- shot
  - one editorial interval with a clear explanatory purpose;
- beat
  - a smaller instructional moment inside or alongside a shot;
- track
  - an ordered timeline lane for overlays, camera, annotation, or editorial objects;
- clip
  - one timed authored object on a track or the timeline;
- marker
  - a named time reference point such as a cue or chapter;
- pause
  - an authored hold that extends playback time without changing the underlying scene geometry;
- overlay
  - explanatory text, callout, ellipse, or ellipsoid graphics shown on the timeline;
- assembly
  - a staged or constitutive structure in the scene;
- constituent
  - an internal part of an assembly viewed at the deeper dynamics level;
- anchor
  - a reusable positional or directional reference;
- path
  - an authored spatial trajectory;
- camera path
  - the camera’s geometric motion;
- camera shot
  - the camera’s editorial intent for one interval;
- transition
  - the move from one shot to another, such as a cut, dissolve, or continuous move;
- teaching pattern
  - a reusable explanatory motif that inserts ordinary authored scene objects;
- library item
  - a reusable authored definition stored for insertion across scenes;
- checkpoint
  - a named authoring restore point;
- publication state
  - whether a scene is draft, under review, or published.

Terms to avoid where possible:

- vague synonyms for shot such as “camera thing” or “view move”;
- vague synonyms for overlay such as “label stuff”;
- generic “object” when assembly, constituent, overlay, marker, or track would be more precise;
- and terminology that suggests the composer is a general video editor rather than an authored explanatory geometry system.

This glossary is intentionally narrow. The tool should feel elegant because the concepts are few, stable, and composable.

---

## Example scenes this model should be able to author

These are authored animation targets that the canonical JSON model and runtime should be able to express deterministically on a shared scene timeline in seconds.

In any of these scenes, camera path and camera orientation may also change as the timeline progresses.

### 1. Translating electron-like assembly

- A low apparent energy Noether core.
- Internal orbital planes are approximately orthogonal.
- The nested assembly is configured as an electron-like structure with six electrino personality charges arranged in a fourth shell.
- The full assembly travels through the scene on a straight-line path.
- Internal architrinos continue their authored orbital motion while the assembly translates.
- Bound personality charges remain attached to the assembly while preserving their own placement and optional secondary motion.

### 2. Translating and rotating bound assembly

- A Noether core assembly translates along an authored path while the whole assembly also rotates.
- Internal orbit motion remains coherent in the assembly frame during transport and rotation.
- The runtime composes local orbit motion with parent translation and parent rotation.

### 3. High-velocity Lorentz-oblate flythrough

- A Noether core assembly accelerates into a high-velocity segment.
- The deformation profile becomes Lorentz-oblate along the direction of travel as velocity approaches \(c_f\).
- Internal constituents and bound charges remain visually attached to the deformed assembly through the authored motion.

### 4. Curved-path assembly with charge jiggle

- A bound assembly follows a curved spline path through the scene.
- Personality charges are attached declaratively to the core.
- Charges exhibit small local jiggle motion superposed on the larger assembly transport.

### 5. Reaction with disassembly and reassembly

- Two or more incoming assemblies follow authored approach paths.
- At specified timeline moments, reactants disassemble into explicit constituent parts.
- Selected parts transfer across handoff paths or reaction corridors.
- Product assemblies reassemble from those parts and continue on authored outgoing paths.
- Provenance records preserve where each transferred component came from.

### 6. Photon-like paired-core assembly

- A photon-like assembly is authored as two flat Noether cores inside one parent assembly.
- The second core follows the first at a small authored offset.
- The first core carries three binary internal motions rotating clockwise.
- The second core carries three binary internal motions rotating counterclockwise.
- Both cores remain explicit authored sub-assemblies rather than hidden procedural effects.
- The full paired-core assembly may itself translate, rotate, and follow an authored path while the internal motions continue.

---

## Future scene families this model should support

These are broader authored-animation families worth carrying in the design now so the model does not trap itself in single-particle flythroughs only.

### PDG-style reaction and decay scenes

- Authored decay chains following known PDG reaction families.
- Multi-stage disassembly and reassembly of constituents over the shared timeline.
- Branching authored outcomes with probabilities or confidence metadata.
- Reaction libraries keyed to named channels or reusable reaction templates.

### Atomic reaction scenes

- Ionization, recombination, excitation, and de-excitation scenes.
- Photon emission and absorption sequences tied to authored atomic transitions.
- Electron capture, scattering, and exchange scenes.
- Multi-assembly atomic reactions where incoming particles perturb a bound atomic structure.

### Neutrino scenes

- Neutrino-like assemblies passing through matter with mostly non-interacting authored trajectories.
- Rare authored interaction moments highlighted against a large background of pass-through traffic.
- Mixed scenes where neutrino traffic crosses atomic or reaction environments.

### Photon-field scenes

- Large populations of photon-like paired-core assemblies moving through a scene.
- Distinct authored photon classes by color, energy band, or other visual coding.
- Crossing photon baths, beam scenes, or ambient radiation environments.
- Mixed photon and matter scenes where some photons merely pass through while others participate in authored reaction moments.

### Radiation and traffic environments

- Scenes containing many simultaneous passing assemblies such as photons, neutrinos, electrons, or ions.
- Dense flux environments around a hero assembly.
- Traffic layers that communicate how much is moving through a region without requiring every passing object to be rendered in full detail at all times.

### Detector and observation scenes

- Detector-like scenes where invisible or subtle interaction regions produce visible authored traces or hit events.
- Observer-mode scenes that switch between lab frame, particle-follow frame, reaction-center frame, or detector frame.
- Inspection scenes that pause or slow local time around reaction events.

### Provenance and explanation scenes

- Reaction walkthroughs where outgoing constituents remain color-coded by source ancestry.
- Step-through provenance scenes showing exactly which component moved where and when.
- Comparison scenes showing several possible authored outcomes side by side.

### Camera and storytelling scenes

- Multi-camera authored scenes with cuts between waypoint and follow-camera tracks.
- Cinematic chase, trail, flank, lead, and orbit camera behavior around moving assemblies.
- Slow-motion emphasis windows around key interaction moments.
- Ghosted past and future overlays that show trajectory context around the current time.

---

## Additional design ideas worth keeping

- Reaction template libraries keyed to PDG channels.
- Atomic-reaction template libraries keyed to common ionization, excitation, and emission patterns.
- Particle traffic emitters for authored streams of photons, neutrinos, or other assemblies moving through a region.
- Event-density controls so a scene can move between sparse, moderate, and intense traffic conditions.
- Provenance color modes that keep transferred constituents visibly tied to their source assembly.
- Time-warp controls that allow selected intervals to run in slow motion without changing the authored master timeline semantics.
- Multi-camera storytelling inside one authored scene rather than requiring a separate scene file per camera idea.
- Timeline markers and overlay clips that make a scene teachable as well as renderable.

One especially important modeling distinction is:

- hero assemblies: fully detailed, inspectable, and suitable for drill-down,
- traffic assemblies: library-backed, heavily instanced, small, LOD-driven, and often simplified until selected.

That distinction should make it possible to show photon fields, neutrino traffic, and dense reaction environments without overwhelming readability or runtime performance.
