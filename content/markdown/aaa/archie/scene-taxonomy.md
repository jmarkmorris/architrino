# Scene Taxonomy Specification

## Scene Taxonomy

The scene taxonomy is defined here for guidance to future development of the webapp. Ai code agents should be directed to study this specification prior to coding.

The specification should not mix together provenance, media type, layout behavior, and runtime implementation details. It should make clear:

- what a scene is,
- what kinds of scenes exist,
- how hierarchy works,
- how cross-scene references work,
- where generated behavior is allowed,
- and which parts of the model are intentionally deferred.

This note defines that taxonomy.

---

## Core decisions

### 1. No directory walking

The runtime should not discover scene structure by walking content directories.

Scene structure should be declared explicitly.

That means:

- scene relationships come from authored scene definitions,
- provenance is visible in scene data,
- filesystem layout is not part of the ontology,
- and runtime discovery does not create hidden hierarchy.

### 2. Markdown is not the taxonomy

Markdown is one media type, not the organizing principle of the taxonomy.

A scene may present markdown, diagrams, animation, or future media types. Those are presentation capabilities, not the top-level structure of the scene model.

So the taxonomy should emphasize scene role and scene type rather than implementation language or content storage format.

### 3. There is one scene-of-scenes type: Scene-Index

A scene whose main job is to organize other scenes is a `Scene-Index`.

A `Scene-Index` may contain only structural child scenes, and each structural child scene must be one of:

- another `Scene-Index`, or
- a presentation scene.

This gives the hierarchy a clean recursive structure.

Links, hotspots, and other cross-scene references may still connect any scene to any other scene. Presentation scenes may also declare scene-owned drill-down targets through `children`, but those targets are not structural child membership.

### 4. There are many presentation-scene types

Presentation scenes are scenes whose primary job is to present or interact with content rather than structurally organize child scenes.

A presentation scene may still link to other scenes through hotspots, links, controls, or embedded navigation. What makes it a presentation scene is its primary role, not whether it has outgoing connections.

The taxonomy should support multiple presentation-scene types, and more can be added as the webapp develops.

### 5. Hotspots remain part of the ontology, but are deferred in implementation

The taxonomy distinguishes:

- `children` for scene-owned child-scene references,
- `links` for cross-scene references,
- `hotspots` for in-scene interaction anchors.

`hotspots` remain part of the specification, but generic hotspot support is intentionally deferred.

Reason:

- the taxonomy does not require a general hotspot model in order to remain coherent,
- hotspot behavior already exists in some domain-specific UI paths,
- and a generic hotspot schema should wait until a concrete authored use case needs it.

So hotspots stay in the specification, but they are not treated as a completed general feature.

---

## New ontology

### Scene-Index

`Scene-Index` is the canonical scene-of-scenes type.

Responsibilities:

- present a set of child scenes,
- support scene navigation,
- define explicit parent-child scene structure,
- support recursive composition through nested `Scene-Index` nodes.

Constraints:

- children must be either presentation scenes or other `Scene-Index` scenes,
- it is not a generic document view,
- it does not infer children from filesystem structure,
- it does not derive hierarchy from runtime discovery.

Display model:

- `Scene-Index` displays one or more rings of spheres,
- placement and sizing are automatic by default,
- individual child references may still declare placement hints such as `center`, `ring1-3`, `ring2-4`, and similar layout locations.

This means the layout computes placement automatically, while authored hints can still influence node role within that layout.

### Scene-Markdown-View

`Scene-Markdown-View` displays a markdown file directly.

Responsibilities:

- render one markdown document,
- support view configuration such as one-column and two-column modes,
- provide a stable document-reading scene.

Notes:

- this is a presentation scene,
- the name is specific because this scene directly presents markdown as a medium,
- the taxonomy remains media-aware at the presentation-scene level without making markdown the whole taxonomy.

### Scene-Markdown-Split

`Scene-Markdown-Split` takes a markdown document and converts its sections into individual presentation-scene nodes on the fly.

Responsibilities:

- parse a source markdown document,
- split the document into section-based nodes,
- present those nodes as a ring-based scene,
- allow section-level navigation without requiring a separately authored scene file for each section.

Display model:

- `Scene-Markdown-Split` displays one or more rings of spheres,
- placement and sizing are fully automatic by default,
- individual nodes may still declare placement hints such as `center`, `ring1-3`, `ring2-4`, and similar layout locations.

This is distinct from `Scene-Index`:

- `Scene-Index` organizes scenes,
- `Scene-Markdown-Split` organizes sections derived from one source document.

### Scene-Diagram

`Scene-Diagram` is a presentation scene for active diagrams.

Responsibilities:

- present an interactive or reactive diagram,
- optionally expose links to other scenes,
- support diagram-native interaction rather than document reading.

This type should be used when the diagram is the primary content object, not just an illustration embedded inside another scene.

### Scene-Animation

`Scene-Animation` is a presentation scene for animation content.

Responsibilities:

- present animation authored directly in the app or through a video-like asset,
- support time-based presentation as the core content mode,
- permit links to related scenes where useful.

This type should be used when motion is the primary content object.

---

## Structural principles

### Separate scene role from media details

The ontology should answer these questions in order:

1. Is this a `Scene-Index` or a presentation scene?
2. If it is a presentation scene, what type of presentation scene is it?
3. What layout or controls does it use?

This keeps the top-level taxonomy stable as more media types appear.

### Explicit provenance

Every scene should be explicitly declared.

That means:

- no hidden scene creation from directory traversal,
- no ambiguity about whether a scene is authored or generated,
- no filesystem structure acting as an invisible part of ontology,
- explicit distinction between structural child relationships, scene-owned drill-down targets, and ordinary links.

A runtime may still transform declared data, but it should not invent scene structure by discovering files on its own.

### Layout-driven presentation

Layout is a layout concern, not a taxonomy concern.

For this ontology:

- `Scene-Index` and `Scene-Markdown-Split` both use ring-based display layouts,
- those layouts should compute placement and sizing automatically,
- authored hints may adjust layout slots,
- the layout should not require authored radius values as a core design assumption.

Layout terminology should distinguish clearly between rendered node scale and layout placement scale.

### Common scene controls

There will likely be controls shared across multiple scene types.

Examples may include:

- navigation controls,
- layout controls,
- one-column or two-column viewing controls,
- media-specific display controls,
- graph or backlink controls.

These common controls should be layered onto scene types without confusing the ontology itself.

### Stable ownership of scene identity

Scene identity should come from explicit authored scene declarations.

That means:

- top-level scene IDs are authored and reviewed,
- child references point to those explicit scene IDs,
- generated section-node IDs are derived deterministically from declared source data,
- runtime layout resolution does not create new identity classes.

The model should have one clear answer to the question: where does this scene or node get its identity?

### Bounded generation

Runtime generation is allowed only as behavior already declared by a scene type.

Examples:

- allowed: `Scene-Markdown-Split` generating section nodes from one declared markdown source,
- not allowed: runtime inventing new scenes by walking a directory or reconstructing scene families from ID prefixes.

This keeps generation local, inspectable, and bounded.

### Explicit provenance of authored versus generated structure

The model should make it obvious which structures are authored and which are generated at runtime from declared inputs.

That distinction should be visible in both schema design and implementation:

- authored scenes are first-class declarations,
- generated section nodes are runtime products of one declared scene,
- generated nodes do not silently become structural children in the global scene hierarchy.

---

## Design position

The best practice here is to optimize for explicit ontology rather than short-term convenience.

Directory walking hides structure and blurs the distinction between:

- scene hierarchy,
- media source,
- layout behavior,
- runtime generation.

For this system, the better long-term practice is:

- explicit scene declaration,
- stable scene types,
- layout-based presentation,
- media-aware presentation scenes,
- no hidden provenance.

That makes the model easier to teach, debug, and extend as the webapp gains more scene types.

---

## Scope boundaries

This specification excludes the following from the core scene ontology:

- generated scene IDs as part of authored ontology,
- runtime directory walking,
- generic markdown-specific fields in the base scene schema,
- required per-node `radius` and `color` in generic scene data,
- writing resolved layout placement back into authored scene data,
- obsolete taxonomy labels that do not describe scene role, structure, or presentation behavior.

---

## Schema sketch

This is not a final schema. It is a design sketch meant to make the ontology concrete enough for review.

### 1. Base scene

Every scene should have a small common base.

Suggested base fields:

- `id`: stable scene identifier
- `type`: canonical scene-type discriminator such as `Scene-Index`, `Scene-Markdown-View`, `Scene-Markdown-Split`, `Scene-Diagram`, `Scene-Animation`
- `title`: primary display title
- `subtitle`: optional secondary label
- `summary`: optional short description
- `controls`: optional common scene controls
- `links`: optional cross-scene references

Base-scene principles:

- the base should not contain markdown-specific fields,
- the base should not contain layout-specific fields,
- the base should not assume structural children,
- `controls` remain available without introducing a new scene-type restriction,
- `links` may exist on any scene type,
- the base should not require visual node radius or color.

### 2. Structural hierarchy fields

Scene-owned child-scene references should be explicit and separate from ordinary links.

Child references should use child-reference objects, not bare strings. That is the better design because it gives both hierarchy and drill-down navigation room for slot hints, label overrides, badges, future state, and eventual spatial metadata without changing the core shape.

Even though the present UI is effectively 2D and everything is displayed as a sphere, the child-reference shape should remain compatible with a future 3D scene model.

Suggested child-reference fields for scenes that need scene-owned child-scene targets:

- `children`: ordered list of scene-owned child-scene references
- `defaultChild`: optional default scene to enter from an index scene

A child reference may eventually need fields such as:

- `sceneId`: target child scene
- `slot`: optional layout slot hint such as `center`, `ring1-3`, `ring2-4`
- `label`: optional navigation label override
- `badge`: optional visual badge override

Important distinction:

- `children` defines either scene hierarchy or scene-owned drill-down targets depending on scene type,
- `links` defines cross-scene connectivity,
- a scene may have links without having children,
- a presentation scene may link to many scenes without becoming a `Scene-Index`,
- a presentation scene may also use `children` for node-bound drill-down without becoming a `Scene-Index`.

### 3. Scene-Index

`Scene-Index` should extend the base scene with hierarchy and layout configuration.

Suggested fields:

- `type: Scene-Index`
- `children`: required structural child scene references
- `layout`: required layout configuration
- `entryBehavior`: optional initial navigation behavior

Suggested constraints:

- every structural child must resolve to either another `Scene-Index` or a presentation scene,
- `children` is required on `Scene-Index`,
- `Scene-Index` view behavior should derive from layout by default rather than from authored `view` state,
- `Scene-Index` should not require direct media-source configuration,
- `Scene-Index` should not derive children from a filesystem path.

### 4. Presentation-scene base

Presentation scenes should share a small common layer beyond the generic scene base.

Suggested fields:

- `type`: one of the presentation-scene types
- `source`: optional media source configuration
- `view`: optional presentation/view configuration
- `hotspots`: optional interactive in-scene targets, available only on presentation scenes
- `layout`: optional display layout when the scene type uses one

Presentation-scene principles:

- presentation scenes are defined by primary role, not by lack of links,
- a presentation scene may still link to or launch other scenes,
- `source.type` should explicitly classify the media source when a source is present,
- scene-specific media configuration should live inside the presentation-scene type rather than the global base schema.

Hotspot note:

- `hotspots` remain part of the scene specification,
- generic hotspot support is intentionally deferred until there is a concrete authored use case that requires it.

### 5. Scene-Markdown-View

Suggested fields:

- `type: Scene-Markdown-View`
- `source.type: markdown`
- `source.path`: markdown file path
- `view.columns`: one-column or two-column mode
- `view.autoOpen`: optional initial document-open behavior
- `view.section`: optional section anchor if needed

Design direction:

- this scene type presents one markdown document,
- it may open directly to a section anchor,
- it should not generate hierarchy from headings,
- it may still expose links or hotspots,
- markdown-specific settings belong here rather than in the base scene schema.

`Scene-Markdown-View` and `Scene-Markdown-Split` should remain separate scene types. They may share the same source medium, but they differ in primary behavior: document presentation versus generated section navigation.

### 6. Scene-Markdown-Split

Suggested fields:

- `type: Scene-Markdown-Split`
- `source.type: markdown`
- `source.path`: markdown file path
- `source.split`: split configuration
- `layout`: required ring layout

Suggested split configuration:

- `mode`: heading-based splitting mode
- `headingLevel`: primary heading level to split on
- `sectionDepth`: optional descendant depth
- `includeIntro`: optional handling for pre-heading content
- `sectionPresentationType`: optional scene type used for generated section nodes

Design direction:

- this scene type parses one declared markdown source,
- it may generate section nodes from that declared source,
- it should not discover new files by walking directories,
- section generation is a scene behavior, not a taxonomy root.

Generated section nodes should use deterministic derived IDs that remain stable across rebuilds as long as the source path and section heading key remain unchanged.

The initial implementation should treat generated section nodes as lightweight generated nodes rather than full standalone scenes, while still giving them stable derived IDs.

### 7. Scene-Diagram

Suggested fields:

- `type: Scene-Diagram`
- `source.type: diagram`
- `source`: diagram source or diagram program definition
- `view`: diagram-specific viewing configuration
- `children`: optional scene-owned drill-down targets keyed by `nodeId`
- `hotspots`: optional diagram hotspots linking to scenes
- `controls`: optional interactive diagram controls

Design direction:

- this scene type is for diagrams as primary content,
- links may exist, and node-bound drill-down should live on `scene.children` rather than on the node object,
- diagram-specific configuration should not spill into unrelated scene types.

### 8. Scene-Animation

Suggested fields:

- `type: Scene-Animation`
- `source.type: animation`
- `source`: animation source, asset reference, or app-defined animation program
- `view`: playback and display configuration
- `controls`: animation controls
- `hotspots`: optional timed or spatial links

Design direction:

- this scene type is for motion-first content,
- playback settings belong here rather than in a generic scene base.

### 9. Ring layout

The ring layout should be defined once and reused by scene types that need it.

The layout should not assume a permanently 2D ontology. It may resolve positions into a 2D plane at first, but its data model should allow later extension to 3D placement without requiring a redesign of child references or relationship structure.

Suggested layout fields:

- `layout.type`: layout identifier such as `rings`
- `layout.ringCount`: optional maximum or desired ring count
- `layout.sizing`: automatic sizing configuration
- `layout.placement`: automatic placement configuration
- `layout.slotPolicy`: rules for slot hints and collision handling
- `layout.style`: optional shared visual styling

Suggested sizing fields:

- `mode`: automatic by default
- `minNodeScale`: optional lower bound
- `maxNodeScale`: optional upper bound
- `densityTarget`: optional packing target

Suggested placement fields:

- `mode`: automatic by default
- `startAngle`: optional layout phase
- `centerPolicy`: optional rule for center occupancy
- `ringBalance`: optional balancing policy across rings

Suggested slot-hint behavior:

- a node may request a slot such as `center`, `ring1-3`, `ring2-4`,
- the layout may honor the hint exactly or best-effort,
- the schema should distinguish requested slot from resolved slot.

This is the place to use cleaner terms than a single overloaded `radius` concept.

Authored scene data should store requested slot intent only. Resolved slot placement should remain runtime-only and should not be written back into authored scene data unless a future editing workflow actually requires layout freezing or inspection.

### 10. Links and hotspots

Links and hotspots should be first-class relationship mechanisms, separate from hierarchy.

Hotspots are a separate top-level field. They are not just a specialized link kind.

Suggested link fields:

- `targetSceneId`: target scene
- `kind`: link kind
- `label`: optional display label
- `activation`: optional activation mode

Suggested hotspot fields:

- `id`: hotspot identifier
- `targetSceneId`: target scene
- `geometry`: hotspot region or anchor description
- `label`: optional UI label
- `behavior`: optional interaction behavior

Design direction:

- `links` are scene-to-scene references,
- `hotspots` are interaction anchors within a presentation scene,
- neither should be confused with structural child membership,
- generic hotspot support remains intentionally deferred until a concrete authored use case requires it.

### 11. Overrides versus defaults

The new schema should make overrides explicit.

Suggested rule:

- scene type defines capabilities,
- layout defines layout defaults,
- node or child references may override specific layout behavior,
- overrides should be optional and sparse.

That keeps authored scene data compact while still allowing exceptions where they matter.

### 12. What should disappear from the base schema

The base schema should exclude these assumptions:

- generic markdown-specific fields in every scene object,
- required per-node `radius`,
- required per-node `color`,
- generated-scene taxonomy encoded in scene IDs,
- mixed hierarchy and link semantics in one generic relationship field.

That removal is part of the ontology cleanup.

---

## Minimal JSON examples

These are illustrative examples for ontology review. They are not final implementation schemas.

### 1. Scene-Index example

```json
{
  "id": "assemblies",
  "type": "Scene-Index",
  "title": "Assemblies",
  "summary": "Structural index for assembly-related scenes.",
  "layout": {
    "type": "rings",
    "sizing": {
      "mode": "auto",
      "minNodeScale": 1.2,
      "maxNodeScale": 2.8
    },
    "placement": {
      "mode": "auto",
      "centerPolicy": "allow",
      "ringBalance": "compact"
    },
    "slotPolicy": {
      "mode": "best-fit"
    }
  },
  "children": [
    {
      "sceneId": "fermions",
      "slot": "center"
    },
    {
      "sceneId": "bosons",
      "slot": "ring1-1"
    },
    {
      "sceneId": "hadrons",
      "slot": "ring1-2"
    }
  ],
  "links": [
    {
      "targetSceneId": "validation",
      "kind": "related"
    }
  ]
}
```

### 2. Scene-Markdown-View example

```json
{
  "id": "weak_mixing_angle",
  "type": "Scene-Markdown-View",
  "title": "Weak Mixing Angle",
  "source": {
    "type": "markdown",
    "path": "content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md"
  },
  "view": {
    "columns": 1,
    "autoOpen": true
  },
  "links": [
    {
      "targetSceneId": "fermions",
      "kind": "parent-index",
      "label": "Back to Fermions"
    }
  ]
}
```

### 3. Scene-Markdown-Split example

```json
{
  "id": "fermion_overview_sections",
  "type": "Scene-Markdown-Split",
  "title": "Fermion Overview",
  "source": {
    "type": "markdown",
    "path": "content/markdown/aaa/assemblies/fermions/overview.md",
    "split": {
      "mode": "headings",
      "headingLevel": 2,
      "sectionDepth": 1,
      "includeIntro": true,
      "sectionPresentationType": "Scene-Markdown-View"
    }
  },
  "layout": {
    "type": "rings",
    "sizing": {
      "mode": "auto"
    },
    "placement": {
      "mode": "auto",
      "centerPolicy": "allow"
    },
    "slotPolicy": {
      "mode": "best-fit"
    }
  }
}
```

### 4. Presentation-scene example with hotspots and links

```json
{
  "id": "hydrogen_atom_diagram",
  "type": "Scene-Diagram",
  "title": "Hydrogen Atom",
  "source": {
    "type": "diagram",
    "diagramId": "hydrogen-atom-v1"
  },
  "view": {
    "camera": "default",
    "labels": true
  },
  "hotspots": [
    {
      "id": "electron-shell",
      "targetSceneId": "electron",
      "geometry": {
        "type": "sphere",
        "center": [0, 0, 0],
        "radius": 2.4
      },
      "label": "Electron"
    },
    {
      "id": "proton-core",
      "targetSceneId": "proton",
      "geometry": {
        "type": "sphere",
        "center": [0, 0, 0],
        "radius": 0.8
      },
      "label": "Proton"
    }
  ],
  "links": [
    {
      "targetSceneId": "assemblies",
      "kind": "parent-index"
    },
    {
      "targetSceneId": "hydrogen",
      "kind": "related"
    }
  ]
}
```

## Example-level takeaways

These examples make several intended rules concrete:

- hierarchy and node-bound drill-down are declared through `children` child-reference objects,
- cross-scene connectivity is declared through `links` and `hotspots`,
- ring-layout behavior is configured through `layout`,
- markdown-specific configuration lives only inside markdown scene types,
- presentation scenes may link outward freely without becoming `Scene-Index` scenes.

They also show that explicit scene declaration remains compatible with rich navigation. The ontology does not restrict connectivity. It only separates structural hierarchy from ordinary cross-scene references.
