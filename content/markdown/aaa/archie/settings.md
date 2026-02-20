# Settings

## Current User Controls

This app currently exposes lightweight, in-UI controls rather than a centralized settings panel.

## Reading Layout

- In markdown views, use the layout icon to toggle:
  - `1-column` (focused reading)
  - `2-column` (scan/compare reading)

Scene defaults can set the initial mode, but you can override it while reading.

## Navigation and View Controls

- `Back`: move up one step
- `Home`: return to root
- `Archie`: open/toggle meta space
- Search (`Cmd/Ctrl + K`): jump to known scenes quickly

## Session Behavior

- Current scene is persisted in the URL hash.
- Refresh should reopen that same scene.
- Parent navigation context may also be restored when available.

## Content/Authoring Controls (Project-Level)

For maintainers:

- Scene JSON can set markdown column defaults (`markdownColumns` / markdown policy render columns).
- Auto-markdown directories can be scanned to generate spheres from files.
- After markdown filename changes, update `content/markdown/markdown_index.json`.

## Planned Expansion

Potential future settings:

- Default text scale
- Motion/transition intensity
- Theme/contrast presets
- Persistent per-user preferences
