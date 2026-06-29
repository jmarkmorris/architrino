# Life Origins Image Replacement

Date mined: June 28, 2026

## Scope

This pass replaced the poor `content/assets/images/life-origins/phylogenetic-tree-of-life-commons.png` image with a stronger source-backed tree-of-life image while keeping the local path and manifest id stable.

## Replacement

| Asset id | Local path | Source and license | Disposition |
| --- | --- | --- | --- |
| `phylogenetic-tree-of-life-commons` | `content/assets/images/life-origins/phylogenetic-tree-of-life-commons.png` | [Wikimedia Commons: A Novel Representation Of The Tree Of Life](https://commons.wikimedia.org/wiki/File:A_Novel_Representation_Of_The_Tree_Of_Life.png), Laura A. Hug et al., CC BY 4.0 | Replaced the earlier Crion circular tree image because its oversized labels and crop made it poor as a reusable image-library asset. |

## Candidate Review

| Candidate | Disposition |
| --- | --- |
| [Wikimedia Commons: Phylogenetic Tree of Life](https://commons.wikimedia.org/wiki/File:Phylogenetic_Tree_of_Life.png) | Removed from the local asset because the rendered image is visually poor for the image library despite usable source metadata. |
| [Wikimedia Commons: Phylogenetic tree of life LUCA](https://commons.wikimedia.org/wiki/File:Phylogenetic_tree_of_life_LUCA.svg) | Deferred. It is readable and source-backed, but it is a simpler three-domain SVG rather than a richer published tree-of-life figure. |
| [Wikimedia Commons: Tree of life SVG](https://commons.wikimedia.org/wiki/File:Tree_of_life_SVG.svg) | Deferred. It is visually attractive and public domain, but older genome-sampling scope makes it a secondary comparison image rather than the preferred replacement. |

## Provenance Notes

- The replacement asset has a local SHA-256 checksum, byte count, media type, dimensions, source page, source file URL, creator list, license label, license URL, credit line, and selection note in `content/assets/images/images.json`.
- The replacement is a standard phylogenomic comparison image. It does not promote a native life-origins derivation or validation claim by itself.
