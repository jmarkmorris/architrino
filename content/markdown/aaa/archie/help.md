# Help

## Quick Start

1. Click a glowing sphere to descend.
2. Use `Back` to return one level.
3. Use `Home` to return to root.
4. Open notes with the document icon when available.

## Search

- Open/close search: `Cmd/Ctrl + K`
- Execute first result: `Enter`
- Close search: `Escape`

## Markdown Panel

- Toggle layout (1/2 column): layout icon in notes header
- Open full document from section/index: document icon in notes header
- Close notes panel: `Close`

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

`Back` is enabled only when a parent navigation entry exists. If you landed directly on a scene from URL or home, there may be no previous step.

### A markdown page opens in unexpected column layout

Column mode depends on scene/node configuration and can be changed at runtime with the layout toggle.

## Known Limits

- Some scenes are still placeholders.
- Not all nodes currently expose full media/tool integrations.
