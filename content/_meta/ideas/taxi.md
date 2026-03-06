# Scene Taxonomy Notes

## Why this note exists

The current scene taxonomy keeps causing repeated confusion, especially around the relationship between:

- authored scene JSON,
- ring layout,
- markdown-derived runtime scenes,
- directory walking,
- scene navigation vs markdown navigation.

The specific recurring confusion is that names like **markdown directory scene** sound like a generic scene container or a "scene of scenes," when in implementation they mean something much narrower: a runtime-generated scene whose source is a markdown directory.

This note captures the issue so it can be addressed deliberately on a new branch.

---

## What the code does today

### 1. Authored ring scenes

Files like:

- `content/scenes/assemblies/fermions.json`
- `content/scenes/spacetime/spacetime.json`
- `content/scenes/quantum/quantum.json`

are authored scene configs.

In these scenes:

- each object has an explicit `radius`,
- ring layout uses those node radii for packing and spacing,
- ring layout computes the ring radius used to place node centers,
- node size itself is still an authored input.

So for authored ring scenes, node size is not being discovered from the markdown structure. It is part of the scene JSON.

### 2. Markdown-derived ring scenes

There is a different path for runtime-generated scenes built from markdown sources.

These include scenes generated from:

- a markdown document,
- a markdown section,
- a markdown directory.

In those scenes:

- nodes are generated dynamically,
- node radius may be computed or defaulted by the markdown builder,
- ring radius may also be computed,
- the result is a scene that behaves visually like other ring scenes but is conceptually different from authored scene JSON.

This is where the mixed mental model comes from.

### 3. Markdown directory scene

A **markdown directory scene** is not just an arbitrary scene of scenes.

It is a runtime-generated navigation scene whose source is a markdown directory. It exists because the system walks a directory of markdown files and turns that directory into a scene.

So the current term is technically grounded, but it is still easy to misread.

---

## The core confusion

There are several overlapping axes that the current terminology does not separate cleanly.

### Axis A: how the scene was created

- authored manually in JSON
- derived dynamically from markdown

### Axis B: what the scene is for

- navigation/index scene
- content scene
- particle/assembly scene
- meta scene

### Axis C: what drives layout

- explicit positions
- ring layout
- auto-generated node set

### Axis D: where the content source comes from

- scene JSON objects
- markdown file
- markdown directory
- markdown headings/sections

The current labels often mix these dimensions together.

Example:

- **markdown directory scene** mixes source and purpose
- **ring scene** describes layout, not provenance
- **scene of scenes** describes behavior in the UI, not generation mechanism

Because these dimensions are not clearly separated, it becomes easy to ask the same question repeatedly:

- Is this a real scene?
- Is this a generated scene?
- Is this just a markdown index?
- Is node size authored or computed?
- Is the directory itself the content, or just a way to generate nodes?

---

## Why directory walking is a double-edged sword

Directory walking is useful because it gives automatic structure and reduces authoring overhead.

Advantages:

- fast expansion of navigation structure
- automatic scene generation from markdown organization
- fewer hand-maintained scene files
- easy discovery of nearby documents

Costs:

- taxonomy becomes opaque
- authors lose track of which scenes are authored vs generated
- naming drifts toward implementation jargon
- runtime behavior becomes harder to reason about
- debugging gets harder because the source of a node may be indirect
- it encourages invisible structure that is convenient for the system but confusing for the author

This is the core tradeoff: automation reduces manual work, but it hides provenance.

---

## Best-practice direction

A better taxonomy would separate three things explicitly.

### 1. Provenance

How did this scene come into existence?

- authored scene
- markdown-derived scene
- restored/generated runtime scene

### 2. Role

What is this scene for?

- navigation/index scene
- document scene
- domain scene
- meta scene

### 3. Layout

How are nodes arranged?

- manual
- rings
- grid
- other future modes

That means terms like these would be easier to reason about:

- **authored navigation scene**
- **markdown-derived directory index scene**
- **markdown-derived document section scene**
- **authored domain scene with ring layout**

This is more verbose, but it is much clearer.

---

## What seems safest to change first

The safest first pass is a terminology pass, not a mechanics pass.

Low-risk changes:

- rename comments and helper names for clarity
- improve documentation around authored vs markdown-derived scenes
- adopt clearer internal language such as:
  - authored scene
  - markdown-derived scene
  - navigation scene
  - directory index scene
- document that ring layout computes placement radius, while node radius may still be authored

Higher-risk changes:

- changing persisted scene IDs
- changing runtime-generated scene ID conventions
- changing schema field names
- changing restoration logic for markdown-derived scenes
- changing graph/search assumptions tied to existing scene taxonomy

---

## Practical recommendation

Do this work on a new branch.

Reason:

- the taxonomy touches runtime services, validation, scene graph generation, and restoration logic
- some names are implementation categories, not just labels
- a terminology cleanup can turn into a behavior change very quickly if not isolated

Recommended branch plan:

1. Start with a terminology-only pass.
2. Do not change persisted IDs or schema fields yet.
3. Clarify provenance in comments, docs, and helper naming.
4. Re-run strict checks after each step.
5. Only then consider whether the data model itself should change.

Commands to keep running during that branch work:

```bash
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
```

---

## Immediate takeaway

The repeated confusion is not user error. The current taxonomy really does blur together:

- provenance,
- purpose,
- layout,
- content source.

That confusion is amplified by directory walking, because directory walking is both powerful and obscuring.

In plain language:

- ring layout is not the same as auto-generated sizing,
- authored scenes are not the same as markdown-derived scenes,
- markdown directory scenes are not generic containers,
- the current names do not make those distinctions obvious enough.

That is the problem to solve.
