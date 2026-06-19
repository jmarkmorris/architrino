import assert from "node:assert/strict";
import test from "node:test";

import { createFileSourceRuntime } from "../src/runtime/FileSourceRuntime.js";

function createFakeDocument() {
  const clickedLinks = [];
  return {
    clickedLinks,
    body: {
      appendChild() {},
    },
    createElement(tagName) {
      const attributes = new Map();
      return {
        tagName,
        attributes,
        href: "",
        target: "",
        download: "",
        rel: "",
        setAttribute(key, value) {
          attributes.set(key, String(value));
        },
        click() {
          clickedLinks.push({
            href: this.href,
            target: this.target,
            download: this.download,
            rel: this.rel,
            attributes: new Map(attributes),
          });
        },
        remove() {
          this.removed = true;
        },
      };
    },
  };
}

test("PDF file sources open in a new tab by default", () => {
  const fakeDocument = createFakeDocument();
  const runtime = createFileSourceRuntime({
    appendCacheBust: (path) => `${path}?v=test`,
    documentLike: fakeDocument,
  });

  assert.equal(
    runtime.openFileSource({
      filePath: "content/generated/pdf/textbook/review-copies/foundations.pdf",
    }),
    true
  );

  assert.equal(fakeDocument.clickedLinks.length, 1);
  assert.equal(
    fakeDocument.clickedLinks[0].href,
    "content/generated/pdf/textbook/review-copies/foundations.pdf?v=test"
  );
  assert.equal(fakeDocument.clickedLinks[0].target, "_blank");
  assert.equal(fakeDocument.clickedLinks[0].rel, "noopener");
  assert.equal(fakeDocument.clickedLinks[0].download, "");
});

test("file sources can request direct download mode", () => {
  const fakeDocument = createFakeDocument();
  const runtime = createFileSourceRuntime({
    appendCacheBust: (path) => path,
    documentLike: fakeDocument,
  });

  assert.equal(
    runtime.openFileSource({
      filePath: "content/generated/pdf/textbook/review-copies/dynamics.pdf",
      fileOpenMode: "download",
      fileDownloadName: "dynamics-review.pdf",
    }),
    true
  );

  assert.equal(fakeDocument.clickedLinks.length, 1);
  assert.equal(fakeDocument.clickedLinks[0].target, "");
  assert.equal(fakeDocument.clickedLinks[0].download, "dynamics-review.pdf");
  assert.equal(
    fakeDocument.clickedLinks[0].attributes.get("download"),
    "dynamics-review.pdf"
  );
});
