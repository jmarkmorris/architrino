## Navigation Model

A sphere represents a node in the scene hierarchy.

- Selecting a sphere can open a child scene or content.
- `Back` returns one step in your navigation history.
- `Forward` moves one step forward in history when available.
- `Home` returns to the root scene.
- `Archie` opens or toggles the meta ring space.

## UI: Hierarchy of Universe Structure 

This interface uses a sphere metaphor for selecting a scene in the hierarchy:

- Each sphere is a node in the knowledge graph.
- Clicking a glowing/active sphere descends into that node's child scene.
- `Back` climbs one level up the path you took.
- `Home` returns to the root scene.

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

## Interface Controls

Top HUD controls include:

- `Back` and `Forward` history buttons
- `Home` reset button
- Scene search toggle
- Info reopen button for the detail panel
- `Archie` meta-ring button
- Notes button for scene notes when available

Markdown panel controls include:

- Open full document from section view
- Toggle `1-column` / `2-column` layout
- Close notes panel

## Markdown Behavior

When a sphere maps to markdown, notes open in the markdown panel.

- Use the layout icon in the notes header to switch between `1-column` and `2-column` modes.
- Use the document icon in the notes header to jump to the full document when viewing a section/index.
- Use `Close` to hide the notes panel.

## UI Icons and Controls

Top controls:

- `Back` (`nav-up`): return to parent scene.
- `Notes` document icon (`doc-button`): open notes for the current scene when available.
- `Home` house icon (`home-button`): jump to root.
- `Archie` ring icon (`meta-button`): open the Archie meta scene (and toggle back).
- `Search` magnifier (`scene-search-toggle`): open scene search.

Markdown panel controls:

- Document icon (`markdown-doc-button`): open full document.
- Layout icon (`markdown-layout-toggle`): toggle one/two column rendering.
- `Close` (`markdown-close`): hide notes panel.

Information controls:

- HUD/info bar (`hud`): toggles the info drawer.

## Search and Shortcuts

- `Cmd/Ctrl + K`: open/close scene search.
- `Enter` in search: jump to the first result.
- `Escape`: close search (and close info drawer if focused there).

## Camera and Interaction

- Click or tap a sphere to descend.
- Drag to pan.
- Wheel or pinch to zoom.

## Practical Navigation Pattern

1. Start from `Home`.
2. Descend sphere-by-sphere into your topic.
3. Open notes when you need context.
4. Toggle markdown layout based on reading preference.
5. Use `Back` for local context changes, `Home` for global reset, and `Archie` for meta/tooling space.
