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

## Pages Deployment

Keep original images and their complete catalog here for current and future use. Pages publishes only images referenced by the website's reader content, scenes, application code, or supported dependencies. A catalog entry or `usedBy` note alone does not select an image for deployment. Link or embed the actual image path from a web consumer; it will be included automatically at build time. Attribution and direct-download links also count. Dynamically chosen images need literal paths or a complete image-library prefix in their runtime consumer.

The build preserves included image bytes and their catalog attribution; it filters only the deployment copy of the catalog. Unused originals remain unchanged in Git. See the [deployment image selection policy](../../../reference/op/machine-artifact-retention.md#two-stage-pages-cutover) for source coverage and verification.
