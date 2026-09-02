import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PDGEDIT_REVIEW_SURFACE_METADATA,
  createPdgeditReviewExportUrl,
  getStaticFileContentType,
  parsePdgeditReviewExportArgs,
  startPdgeditReviewStaticServer,
} from "../scripts/pdgedit/ReviewPageExportRuntime.mjs";

const repoRootPath = fileURLToPath(new URL("../", import.meta.url));

function readRepoFile(relativePath) {
  return fs.readFileSync(path.join(repoRootPath, relativePath), "utf8");
}

test("parsePdgeditReviewExportArgs defaults to both PNG and PDF outputs", () => {
  const parsed = parsePdgeditReviewExportArgs([], {
    cwd: "/repo",
  });

  assert.equal(parsed.pagePath, "pdgedit-review.html");
  assert.equal(parsed.pngOutputPath, "/repo/stats/proof-sheet.png");
  assert.equal(parsed.pdfOutputPath, "/repo/stats/proof-sheet.pdf");
});

test("parsePdgeditReviewExportArgs resolves explicit output selection and relative paths", () => {
  const parsed = parsePdgeditReviewExportArgs(
    ["--png", "artifacts/page.png", "--pdf", "--width", "2000", "--height", "12000"],
    {
      cwd: "/repo",
      outputDirPath: "/repo/stats",
    }
  );

  assert.equal(parsed.pngOutputPath, path.resolve("/repo", "artifacts/page.png"));
  assert.equal(parsed.pdfOutputPath, "/repo/stats/proof-sheet.pdf");
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

test("PDG Edit Review metadata classifies the route outside the product-app inventory", () => {
  assert.deepEqual(PDGEDIT_REVIEW_SURFACE_METADATA, {
    id: "pdgedit-review",
    title: "PDG Edit Review",
    surfaceClass: "review-artifact",
    workflowOwner: "pdgedit-editing-workflow",
    productApplication: false,
    pagePath: "pdgedit-review.html",
  });

  const reviewPage = readRepoFile(PDGEDIT_REVIEW_SURFACE_METADATA.pagePath);
  assert.match(reviewPage, /<meta name="robots" content="noindex, nofollow, noarchive" \/>/u);
  assert.match(reviewPage, /<meta name="architrino-surface-class" content="review-artifact" \/>/u);
  assert.match(reviewPage, /<meta name="architrino-workflow-owner" content="pdgedit-editing-workflow" \/>/u);
  assert.match(reviewPage, /<meta name="architrino-product-application" content="false" \/>/u);

  const applicationsScene = JSON.parse(readRepoFile("content/scenes/archie/applications.json"));
  const applicationCategoryScenes = applicationsScene.scene.children.map((child) =>
    readRepoFile(child.scenePath)
  );
  assert.equal(applicationCategoryScenes.some((source) => /pdgedit-review|PDG Edit Review/iu.test(source)), false);
  assert.doesNotMatch(readRepoFile("src/apps/navigator/StandaloneAppLaunchRuntime.js"), /pdgedit-review/iu);
  assert.doesNotMatch(readRepoFile("src/apps/pdgedit/review/main.js"), /animator/iu);
});

test("the controlled PDG Edit Review route remains directly accessible with its rendering inputs", async () => {
  const staticServer = await startPdgeditReviewStaticServer({ rootDir: repoRootPath });

  try {
    const pageUrl = createPdgeditReviewExportUrl({
      origin: staticServer.origin,
      pagePath: PDGEDIT_REVIEW_SURFACE_METADATA.pagePath,
      query: "v=direct-route-test",
    });
    const [pageResponse, runtimeResponse, tileCatalogResponse, groupCatalogResponse] = await Promise.all([
      fetch(pageUrl),
      fetch(new URL("src/apps/pdgedit/review/main.js", `${staticServer.origin}/`)),
      fetch(new URL("src/apps/pdgedit/pdgedit-tiles.json", `${staticServer.origin}/`)),
      fetch(new URL("src/apps/pdgedit/pdgedit-review-groups.json", `${staticServer.origin}/`)),
    ]);

    assert.equal(pageResponse.status, 200);
    assert.equal(pageResponse.headers.get("content-type"), "text/html; charset=utf-8");
    assert.match(await pageResponse.text(), /<h1>PDG Edit Review<\/h1>/u);
    assert.equal(runtimeResponse.status, 200);
    assert.equal(tileCatalogResponse.status, 200);
    assert.equal(groupCatalogResponse.status, 200);
  } finally {
    await staticServer.close();
  }
});
