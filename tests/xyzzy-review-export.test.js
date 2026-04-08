import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import {
  createXyzzyReviewExportUrl,
  getStaticFileContentType,
  parseXyzzyReviewExportArgs,
} from "../scripts/xyzzy/ReviewPageExportRuntime.mjs";

test("parseXyzzyReviewExportArgs defaults to both PNG and PDF outputs", () => {
  const parsed = parseXyzzyReviewExportArgs([], {
    cwd: "/repo",
    outputDirPath: "/tmp/xyzzy-review-export-test",
  });

  assert.equal(parsed.pagePath, "xyzzy-review.html");
  assert.equal(parsed.pngOutputPath, "/tmp/xyzzy-review-export-test/xyzzy-review.png");
  assert.equal(parsed.pdfOutputPath, "/tmp/xyzzy-review-export-test/xyzzy-review.pdf");
});

test("parseXyzzyReviewExportArgs resolves explicit output selection and relative paths", () => {
  const parsed = parseXyzzyReviewExportArgs(
    ["--png", "artifacts/page.png", "--pdf", "--width", "2000", "--height", "12000"],
    {
      cwd: "/repo",
      outputDirPath: "/tmp/xyzzy-review-export-test",
    }
  );

  assert.equal(parsed.pngOutputPath, path.resolve("/repo", "artifacts/page.png"));
  assert.equal(parsed.pdfOutputPath, "/tmp/xyzzy-review-export-test/xyzzy-review.pdf");
  assert.equal(parsed.width, 2000);
  assert.equal(parsed.height, 12000);
});

test("createXyzzyReviewExportUrl attaches the requested page path and query", () => {
  const pageUrl = createXyzzyReviewExportUrl({
    origin: "http://127.0.0.1:9999",
    pagePath: "xyzzy-review.html",
    query: "v=cache-bust",
  });

  assert.equal(pageUrl, "http://127.0.0.1:9999/xyzzy-review.html?v=cache-bust");
});

test("getStaticFileContentType covers the review page assets", () => {
  assert.equal(getStaticFileContentType("xyzzy-review.html"), "text/html; charset=utf-8");
  assert.equal(getStaticFileContentType("main.js"), "text/javascript; charset=utf-8");
  assert.equal(getStaticFileContentType("xyzzy-tiles.json"), "application/json; charset=utf-8");
  assert.equal(getStaticFileContentType("tile.svg"), "image/svg+xml");
});
