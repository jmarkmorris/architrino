# Navigation & Controls

This note explains how a reader actually moves through the scene-driven interface once the webapp is open. It is the practical companion to the broader architectural guides: less about why the system is organized this way, more about what the controls do and how to use them without losing context.

If the interface feels unfamiliar, remember one rule first: spheres are the main doors. The buttons around them help with history, search, detail, and notes; the spheres carry the reader through the knowledge graph.

The sections below move from the basic navigation model to specific interaction patterns in scenes, markdown panels, search, and reader workflow.

## Purpose

This note explains how to move through the webapp, how sphere-based hierarchy works, and how document reading controls behave at runtime.

## Navigation Model

A sphere represents a node in the scene hierarchy and acts as a portal into the next layer of structure.

- Selecting a sphere can open a child scene or content.
- `Back` returns one step in your navigation history.
- `Forward` moves one step forward when that history exists.
- `Home` returns to the root scene.
- `Archie` is a top-level sphere on the root scene.

## Hierarchy Structure

This interface uses a sphere metaphor for selecting a scene in the hierarchy:

- Each sphere is a node in the knowledge graph.
- Clicking a glowing or active sphere descends into that node's child scene.

Each scene can be treated as a chapter-scale frame, while each sphere acts as a section or portal within that frame.

## What a Sphere Can Open

A sphere can resolve to different content types, not only text:

- Markdown document
- Another sphere scene
- Web application experience such as animator
- Image or visual asset
- Video or media embed
- Hybrid combinations of the above

The sphere system is therefore a navigation shell over mixed media, not a markdown-only interface.

## Reading Modes

When a sphere maps to markdown, notes open in the markdown panel.

- A node can open a section view or a full document view.
- Section views provide local context inside a larger document.
- Full document views support longer-form reading across the whole text.
- Split scenes derive peer spheres from one heading level in a document.
- Tree scenes derive a bounded local heading hierarchy from one document.

Sphere labels may also use more than one text row when the scene author provides auxiliary label data. A common pattern is a title on the first row and a short subtitle, such as a date, on the second row.

## Quick Start

1. Click a glowing sphere to descend.
2. Use `Back` / `Forward` to move through scene history.
3. Use `Home` to return to root.
4. Open notes with the document icon when available.
5. Select the `Archie` sphere for app help, project references, downloads, support, comics, and future guided question modes.

## Camera and Interaction

- Click or tap a sphere to descend.
- Drag to pan.
- Wheel or pinch to zoom.

## Interface Controls

- `Back`: step backward in history
- `Forward`: step forward in history
- `Home`: jump to root scene
- `Search` (magnifier): open scene search
- `Info` (circle-i): reopen element detail panel when supported
- `Notes` (document): open scene notes for current scene

## Markdown Panel

- Toggle layout (1/2 column): layout icon in notes header
- Open full document from section/index: document icon in notes header
- Close notes panel: `Close`

When a split or tree source is section-based, opening the full document is often the fastest way to regain the surrounding overview before returning to the local node.

## Search and Keyboard

- Open or close search: `Cmd/Ctrl + K`
- Execute first result: `Enter`
- Close search: `Escape`

## Practical Navigation Pattern

1. Start from `Home`.
2. Descend sphere-by-sphere into your topic.
3. Open notes when you need context.
4. Shift between section reading and full-document reading as needed.
5. Use history for local path changes and the top-level `Archie` sphere for app help, project references, and public-facing support entries.

## Element Scene Controls

When you are inside `content/scenes/elements/*.json` scenes:

- Element navigation overlay appears automatically.
- Use the on-screen arrow icons (`Up/Down/Left/Right`) to move between elements.
- Use keyboard arrows for the same directional navigation.
- Click the mini periodic map to jump to the nearest element cell.
- Current element and directional neighbors are highlighted in the mini map.
- Directional moves wrap within row/column ordering (no dead-end edges).

## Periodic Table Scene

In the `periodic_table` scene:

- Click an element cell to open its element scene.
- Hover/click cells to inspect element detail fields in the detail panel.
- Category legend is shown in the periodic overlay.

## Element Legend Shortcuts

In element scenes, the legend pills (`P`, `N`, `e`) are interactive:

- Clicking a pill jumps to the linked legend target scene.
- These routes are provided by runtime manifest targets.

## Common Issues

### A sphere does not open anything

Possible reasons:

- The node is informational only (no child scene/doc target). This is indicated by the absence of a glow halo.

### Back is disabled

`Back` is enabled only when there is prior history. If you landed directly on a scene from URL or home, there may be no previous step.

### Forward is disabled

`Forward` is enabled only after a `Back` traversal or when forward history exists.

### A markdown page opens in unexpected column layout

Column mode depends on scene/node configuration and can be changed at runtime with the layout toggle.

### Element arrow keys do nothing

Possible reasons:

- You are not in an element scene.
- Search input (or another text input) is focused.
- A transition is currently active.

## Known Limits

- Some scenes are still placeholders.
- Not all nodes currently expose full media/tool integrations.
