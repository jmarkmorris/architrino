# Equation Mapping Registry And Authoring Contract

## Accepted Binding

An equation supported by Equation Mapping has one stable app document ID, one unique semantic page ID, one app-owned normalized document, and one selected canonical corpus occurrence. The canonical occurrence carries an ordinary Markdown link immediately after the display equation. The app registry is the machine-readable join between those records.

The static deployment uses the read-only shared interface exported by [EquationMappingRegistry.js](../../../src/apps/equation-mapping/EquationMappingRegistry.js). This keeps [EquationMappingData.js](../../../src/apps/equation-mapping/EquationMappingData.js) as the equation-document authority rather than maintaining a copied JSON manifest.

On the Equation Mapping page, clients may use:

```js
const pages = window.ArchitrinoEquationMapping.list();
const page = window.ArchitrinoEquationMapping.get("lorentz-clock-rate");
const href = window.ArchitrinoEquationMapping.href("eq-02-lorentz-clock-rate");
```

The interface returns frozen records under schema `equation-mapping-registry.v1`. `list()` returns every supported equation. `get(id)` accepts the stable document ID, semantic page ID, or title slug and returns `null` for an unknown ID. `href(id)` returns the canonical app-page link or `null` for an unknown ID.

## Author-Owned Registration

When an author adds or materially revises a canonical display equation that should be supported by Equation Mapping, the same change should:

1. add or update the app-owned equation document in `src/apps/equation-mapping/EquationMappingData.js`;
2. assign a unique semantic page ID without renaming an existing stable document ID;
3. add or update the source binding in `src/apps/equation-mapping/EquationMappingRegistry.js`;
4. place the standard `Explore this equation in Equation Mapping` link, using the source-relative path to `equation-mapping.html` plus the semantic fragment, immediately after the selected canonical display equation;
5. record any intentionally unlinked duplicate occurrence during review rather than linking lookalike formulas mechanically;
6. provide contextual symbol definitions or shared-definition references when the symbol-definition schema is available; and
7. run `node scripts/validate-equation-mapping-links.mjs` and `node --test tests/equation-mapping-runtime.test.js`.

The source-relative Markdown link is the portable reader contract. The web reader opens the local standalone app page, while the iOS package exporter classifies the same `.html` target as a public `https://architrino.com/equation-mapping.html#...` redirect. Generated reading copies inherit the link from the canonical Markdown source.

## Review Boundary

The source binding states where a reader can inspect an equation; it does not promote the equation's claim level, prove a mapping, or change an equation-mapping score. Review must still confirm that the selected corpus occurrence and app document describe the same equation or declared comparison. A resolving link is necessary for the product contract but is not mathematical evidence.
