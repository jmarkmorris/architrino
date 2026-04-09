import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import {
  createPdgeditReviewExportUrl,
  getStaticFileContentType,
  parsePdgeditReviewExportArgs,
} from "../scripts/pdgedit/ReviewPageExportRuntime.mjs";

test("parsePdgeditReviewExportArgs defaults to both PNG and PDF outputs", () => {
  const parsed = parsePdgeditReviewExportArgs([], {
    cwd: "/repo",
    outputDirPath: "/tmp/pdgedit-review-export-test",
  });

  assert.equal(parsed.pagePath, "pdgedit-review.html");
  assert.equal(parsed.pngOutputPath, "/tmp/pdgedit-review-export-test/pdgedit-review.png");
  assert.equal(parsed.pdfOutputPath, "/tmp/pdgedit-review-export-test/pdgedit-review.pdf");
});

test("parsePdgeditReviewExportArgs resolves explicit output selection and relative paths", () => {
  const parsed = parsePdgeditReviewExportArgs(
    ["--png", "artifacts/page.png", "--pdf", "--width", "2000", "--height", "12000"],
    {
      cwd: "/repo",
      outputDirPath: "/tmp/pdgedit-review-export-test",
    }
  );

  assert.equal(parsed.pngOutputPath, path.resolve("/repo", "artifacts/page.png"));
  assert.equal(parsed.pdfOutputPath, "/tmp/pdgedit-review-export-test/pdgedit-review.pdf");
  assert.equal(parsed.width, 2000);
  assert.equal(parsed.height, 12000);
});

test("createPdgeditReviewExportUrl attaches the requested page path and query", () => {
  const pageUrl = createPdgeditReviewExportUrl({
    origin: "http://127.0.0.1:9999",
    pagePath: "pdgedit-review.html",
    query: "v=cache-bust",
  });

  assert.equal(pageUrl, "http://127.0.0.1:9999/pdgedit-review.html?v=cache-bust");
});

test("getStaticFileContentType covers the review page assets", () => {
  assert.equal(getStaticFileContentType("pdgedit-review.html"), "text/html; charset=utf-8");
  assert.equal(getStaticFileContentType("main.js"), "text/javascript; charset=utf-8");
  assert.equal(getStaticFileContentType("pdgedit-tiles.json"), "application/json; charset=utf-8");
  assert.equal(getStaticFileContentType("tile.svg"), "image/svg+xml");
});
