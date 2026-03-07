## Navigation Model

A sphere represents a node in the scene hierarchy and acts as a portal into the next layer of structure.

- Selecting a sphere can open a child scene or content.
- `Back` returns one step in your navigation history.
- `Forward` moves one step forward when that history exists.
- `Home` returns to the root scene.
- `Archie` opens or toggles the meta ring space.

## Hierarchy Structure

This interface uses a sphere metaphor for selecting a scene in the hierarchy:

- Each sphere is a node in the knowledge graph.
- Clicking a glowing/active sphere descends into that node's child scene.

You can treat each scene as a chapter, and each sphere as a section or portal.

## What a Sphere Can Open

A sphere can resolve to different content types, not only text:

- Markdown document
- Another sphere scene (sub-scene)
- Web application experience (for example, Composer)
- Image or visual asset
- Video or media embed
- Hybrid combinations of the above

So the sphere system is a navigation shell over mixed media, not a markdown-only structure.

## Reading Modes

When a sphere maps to markdown, notes open in the markdown panel.

- A node can open a section view or a full document view.
- Section views provide local context inside a larger document.
- Full document views support longer-form reading across the whole text.

## Camera and Interaction

- Click or tap a sphere to descend.
- Drag to pan.
- Wheel or pinch to zoom.

## Practical Navigation Pattern

1. Start from `Home`.
2. Descend sphere-by-sphere into your topic.
3. Open notes when you need context.
4. Shift between section reading and full-document reading as needed.
5. Use history for local path changes and the meta ring for orientation or tooling context.
