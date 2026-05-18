# Image Library

This directory is the central storage point for repo-managed still images that are not animator-specific media imports.

## Intake Rules

- Store image files under a subject folder such as `historical/`, `physics-diagrams/`, or `aaa-diagrams/`.
- Add every publishable image to `images.json` before referencing it from markdown, scenes, or generated outputs.
- Prefer public-domain, Creative Commons, self-created, or explicitly licensed images.
- Mark uncertain blog-import candidates as `needs-review` in the manifest instead of treating them as publishable assets.
- Keep source, creator, license, credit line, and usage notes in the manifest rather than scattering them through prose.

## Reference Pattern

Use the manifest `id` as the durable reference key. Markdown and scene support can later resolve those ids into rendered figures, tray entries, or overlays without changing the image catalog.
