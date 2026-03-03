# Help

## Quick Start

1. Click a glowing sphere to descend.
2. Use `Back` / `Forward` to move through scene history.
3. Use `Home` to return to root.
4. Open notes with the document icon when available.
5. Use `Archie` to open/toggle the meta ring.

## Main Controls (HUD)

- `Back`: step backward in history
- `Forward`: step forward in history
- `Home`: jump to root scene
- `Search` (magnifier): open scene search
- `Info` (circle-i): reopen element detail panel when supported
- `Archie` (ring): open/toggle meta ring
- `Notes` (document): open scene notes for current scene

## Search and Keyboard

- Open/close search: `Cmd/Ctrl + K`
- Execute first result: `Enter`
- Close search: `Escape`

## Markdown Panel

- Toggle layout (1/2 column): layout icon in notes header
- Open full document from section/index: document icon in notes header
- Close notes panel: `Close`

## Element Scene Controls

When you are inside `content/scenes/elements/*.json` scenes:

- Element navigation overlay appears automatically.
- Use the on-screen d-pad (`Up/Down/Left/Right`) to move between elements.
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

- The node is informational only (no child scene/doc target).
- The linked file/path is missing or renamed.
- The content index is stale after file renames.

What to do:

- Refresh the app.
- Confirm the target markdown path exists.
- Rebuild `content/markdown/markdown_index.json` after renaming files.

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
