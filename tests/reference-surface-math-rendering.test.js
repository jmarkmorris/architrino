import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { loadVendoredCommonJsBundle } from "../scripts/load-vendored-commonjs-bundle.mjs";
import { renderMarkdownWithMath } from "../src/apps/reference/ReferenceSurfaceRuntime.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const markdownIt = loadVendoredCommonJsBundle(
  path.join(repoRoot, "vendor/markdown-it/markdown-it.min.js"),
);
const katex = loadVendoredCommonJsBundle(
  path.join(
    repoRoot,
    "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js",
  ),
);

test("reference surface restores math tokens in tables and standalone blocks", () => {
  const markdownRenderer = markdownIt({ html: false, linkify: true, breaks: false });
  const source = String.raw`| Floor | Meaning |
| --- | --- |
| $\kappa_{\mathrm{hit}}>0$ | causal-root chart |

$$
S(T)=\bar S(T)
$$

Inline $T$ stays inline.`;

  const html = renderMarkdownWithMath(source, markdownRenderer, katex);

  assert.doesNotMatch(html, /MATH(?:SEGMENTTOKEN)?\d+/u);
  assert.match(html, /<td><span class="katex">/u);
  assert.match(html, /<span class="katex-display">/u);
  assert.doesNotMatch(html, /<p>\s*<span class="katex-display">/u);
  assert.match(html, /Inline <span class="katex">/u);
});
