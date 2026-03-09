# Navigation & Controls

## Purpose

This note explains how to move through the webapp, how sphere-based hierarchy works, and how document reading controls behave at runtime.

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
- Clicking a glowing or active sphere descends into that node's child scene.

Each scene can be treated as a chapter-scale frame, while each sphere acts as a section or portal within that frame.

## What a Sphere Can Open

A sphere can resolve to different content types, not only text:

- Markdown document
- Another sphere scene
- Web application experience such as Composer
- Image or visual asset
- Video or media embed
- Hybrid combinations of the above

The sphere system is therefore a navigation shell over mixed media, not a markdown-only interface.

## Reading Modes

When a sphere maps to markdown, notes open in the markdown panel.

- A node can open a section view or a full document view.
- Section views provide local context inside a larger document.
- Full document views support longer-form reading across the whole text.

## Quick Start

1. Click a glowing sphere to descend.
2. Use `Back` / `Forward` to move through scene history.
3. Use `Home` to return to root.
4. Open notes with the document icon when available.
5. Use `Archie` to open/toggle the meta ring.

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
- `Archie` (ring): open/toggle meta ring
- `Notes` (document): open scene notes for current scene

## Markdown Panel

- Toggle layout (1/2 column): layout icon in notes header
- Open full document from section/index: document icon in notes header
- Close notes panel: `Close`

## Search and Keyboard

- Open or close search: `Cmd/Ctrl + K`
- Execute first result: `Enter`
- Close search: `Escape`

## Practical Navigation Pattern

1. Start from `Home`.
2. Descend sphere-by-sphere into your topic.
3. Open notes when you need context.
4. Shift between section reading and full-document reading as needed.
5. Use history for local path changes and the meta ring for orientation or tooling context.

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
