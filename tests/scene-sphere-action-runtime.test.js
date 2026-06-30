import test from "node:test";
import assert from "node:assert/strict";

import {
  hasActionableSceneSphereTarget,
  resolveSceneSphereActionKind,
} from "../src/runtime/SceneSphereActionRuntime.js";

test("scene sphere action policy recognizes navigation targets", () => {
  assert.equal(
    hasActionableSceneSphereTarget({
      childScene: "content/scenes/validation/validation_protocols.json",
    }),
    true
  );
});

test("scene sphere action policy recognizes markdown and file targets", () => {
  assert.equal(
    hasActionableSceneSphereTarget({
      markdownPath: "content/markdown/aaa/validation/validation-protocols.md",
      markdownOpenEligible: true,
    }),
    true
  );
  assert.equal(
    hasActionableSceneSphereTarget({
      markdownPath: "content/generated/markdown/textbook/reading-copies/foundations.md",
      markdownDownloadOnly: true,
      markdownOpenEligible: false,
    }),
    true
  );
  assert.equal(
    hasActionableSceneSphereTarget({
      filePath: "content/generated/pdf/textbook/review-copies/foundations.pdf",
      fileOpenEligible: true,
    }),
    true
  );
});

test("scene sphere action policy recognizes image gallery and animator panel targets", () => {
  const panelMap = new Map([["animator_preview", "preview"]]);

  assert.equal(
    hasActionableSceneSphereTarget({
      galleryImage: "content/assets/images/comics/show-the-residuals.png",
    }),
    true
  );
  assert.equal(
    hasActionableSceneSphereTarget({ id: "animator_preview" }, { panelMap }),
    true
  );
});

test("scene sphere action policy classifies static context and ineligible docs", () => {
  assert.equal(
    resolveSceneSphereActionKind({
      title: "System Card",
      chapterLabel: "Ch 10",
      countLabel: "7 sections",
    }),
    "static"
  );
  assert.equal(
    hasActionableSceneSphereTarget({
      markdownPath: "content/markdown/aaa/short-note.md",
      markdownOpenEligible: false,
      markdownDownloadOnly: false,
    }),
    false
  );
});
