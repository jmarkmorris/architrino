import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import { loadVendoredCommonJsBundle } from "../scripts/load-vendored-commonjs-bundle.mjs";

const READER_ASSET_DIR = path.resolve(
  "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets",
);

test("vendored CommonJS bundles load under the root ESM package scope", () => {
  const MarkdownIt = loadVendoredCommonJsBundle(
    path.join(READER_ASSET_DIR, "markdown-it.min.js"),
  );
  const katex = loadVendoredCommonJsBundle(
    path.join(READER_ASSET_DIR, "katex/katex.min.js"),
  );

  assert.equal(typeof MarkdownIt, "function");
  assert.equal(typeof katex.renderToString, "function");
});
