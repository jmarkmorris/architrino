import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  BRAND_TOKEN_ROLES,
  SYMMETRIC_BLEND_LEVELS_PER_SIDE,
  buildSymmetricBlendSet,
  classifyContrast,
  contrastRatio,
  relativeLuminance,
} from "../src/documentation/brand-visual-identity/BrandVisualIdentityRuntime.js";

const repoFile = (path) => new URL(`../${path}`, import.meta.url);

async function readText(path) {
  return readFile(repoFile(path), "utf8");
}

async function readJson(path) {
  return JSON.parse(await readText(path));
}

test("Archie project exposes the canonical Branding & Marketing guide", async () => {
  const project = await readJson("content/scenes/archie/project.json");
  const child = project.scene.children.find(
    (entry) => entry.nodeId === "branding_and_marketing"
  );
  const node = project.objects.find(
    (entry) => entry.id === "branding_and_marketing"
  );

  assert.deepEqual(child, {
    nodeId: "branding_and_marketing",
    scenePath: "content/scenes/archie/branding_and_marketing.json",
  });
  assert.equal(node.title, "Branding & Marketing");
  assert.equal(node.color, "#6A0DAD");
  assert.equal(node.labelBadge, "doc");
});

test("Branding & Marketing scene is a two-entry visual and editorial hub", async () => {
  const scene = await readJson("content/scenes/archie/branding_and_marketing.json");

  assert.equal(scene.scene.id, "archie__branding_and_marketing");
  assert.equal(scene.scene.type, "Scene-Index");
  assert.deepEqual(scene.scene.children, [
    {
      nodeId: "brand_visual_identity",
      scenePath: "content/scenes/archie/brand_visual_identity.json",
    },
    {
      nodeId: "branding_and_marketing_overview",
      scenePath: "content/scenes/archie/branding_and_marketing_overview.json",
    },
  ]);
  assert.deepEqual(scene.objects.map(({ id, labelBadge }) => ({ id, labelBadge })), [
    { id: "brand_visual_identity", labelBadge: "diagram" },
    { id: "branding_and_marketing_overview", labelBadge: "doc" },
  ]);
});

test("the overview scene opens the canonical authored guide", async () => {
  const scene = await readJson("content/scenes/archie/branding_and_marketing_overview.json");

  assert.equal(scene.scene.id, "archie__branding_and_marketing_overview");
  assert.equal(scene.scene.type, "Scene-Markdown-View");
  assert.equal(
    scene.scene.source.path,
    "content/markdown/aaa/archie/branding-and-marketing.md"
  );
  assert.equal(scene.scene.view.autoOpen, true);
});

test("shared UI tokens implement the complete visual identity palette", async () => {
  const tokens = await readText("ui-tokens.css");
  const style = await readText("style.css");
  const guide = await readText(
    "content/markdown/aaa/archie/branding-and-marketing.md"
  );

  for (const [token, value] of [
    ["--ui-brand-purple", "#6a0dad"],
    ["--ui-brand-purple-deep", "#0d0a17"],
    ["--ui-brand-purple-accent", "#8873dd"],
    ["--ui-brand-purple-soft", "#bdaeff"],
    ["--ui-brand-purple-halo", "#d8c6ff"],
    ["--ui-brand-purple-electric", "#8f00ff"],
    ["--ui-brand-red", "#dc2626"],
    ["--ui-brand-blue", "#2563eb"],
    ["--ui-neutral-050", "#f5f5f5"],
    ["--ui-neutral-500", "#a3a3a3"],
  ]) {
    assert.match(tokens, new RegExp(`${token}: ${value};`, "u"));
    assert.match(guide.toLowerCase(), new RegExp(value, "u"));
  }

  assert.match(
    style,
    /--scene-background-base: var\(--ui-brand-purple\);/u
  );
  assert.match(style, /--scene-background: var\(--ui-brand-purple\);/u);
  assert.doesNotMatch(tokens, /--ui-brand-(?:cyan|light):/u);
  assert.doesNotMatch(guide, /Signal cyan|Primary light|#67E8F9|#F8F5FF/iu);
  for (const [token, value] of [
    ["--ui-brand-opacity-strong", "0.72"],
    ["--ui-brand-opacity-medium", "0.4"],
    ["--ui-brand-opacity-soft", "0.16"],
    ["--ui-brand-action-ring-opacity", "0.3"],
    ["--ui-brand-glow-opacity", "0.22"],
  ]) {
    assert.match(tokens, new RegExp(`${token}: ${value};`, "u"));
  }
});

test("visual identity reference uses approved assets and live token-driven examples", async () => {
  const html = await readText("brand-visual-identity.html");
  const css = await readText("src/documentation/brand-visual-identity/brand-visual-identity.css");
  const guide = await readText("content/markdown/aaa/archie/branding-and-marketing.md");
  const scene = await readJson("content/scenes/archie/brand_visual_identity.json");

  assert.equal(scene.scene.id, "archie__brand_visual_identity");
  assert.equal(scene.scene.type, "Scene-Diagram");

  for (const id of ["palette", "fades", "contrast", "marks", "examples"]) {
    assert.match(html, new RegExp(`id="${id}"`, "u"));
  }
  for (const { token } of BRAND_TOKEN_ROLES) {
    assert.match(html, new RegExp(`data-brand-token="${token}"`, "u"));
  }
  for (const asset of [
    "noether-braid-ribbon-source.svg",
    "noether-braid-all-platforms-avatar-master-1024x1024.png",
    "noether-braid-crossing-wake-github-social-preview-1280x640.png",
    "architrino-logo-qr-landscape.png",
    "qr.png",
  ]) {
    assert.match(html, new RegExp(asset.replaceAll(".", "\\."), "u"));
  }
  assert.match(html, /<title>Architrino — Brand Visual Reference<\/title>/u);
  assert.match(html, /supporting visual reference for the canonical Architrino Branding and Marketing guide/iu);
  assert.match(html, /aria-label="Return to Branding and Marketing in Archie"/u);
  assert.match(html, />Return to Branding &amp; Marketing<\/a>/u);
  assert.match(guide, /\[Brand Visual Identity Reference\]\(\.\.\/\.\.\/\.\.\/\.\.\/brand-visual-identity\.html\)/u);
  assert.match(html, /BrandVisualIdentityRuntime\.js/u);
  assert.match(html, /src\/documentation\/brand-visual-identity/u);
  assert.doesNotMatch(html, /src\/apps\/brand-visual-identity/u);
  assert.match(css, /@import url\("\.\.\/\.\.\/\.\.\/ui-tokens\.css"\);/u);
  assert.match(css, /var\(--ui-brand-red\)/u);
  assert.match(css, /var\(--ui-brand-blue\)/u);
  assert.match(css, /var\(--ui-brand-purple\)/u);
  assert.match(css, /\.site-header \{[\s\S]*?flex-wrap: wrap;/u);
  assert.match(css, /\.site-header nav \{[\s\S]*?width: 100%;/u);
  assert.doesNotMatch(css, /\.site-header nav a:nth-child\([^)]*\)[\s\S]*?display: none;/u);
  assert.match(html, /data-symmetric-blends/u);
  assert.doesNotMatch(html, /data-purple-spectrum|one-degree|360°|240°|pure-color/iu);
});

test("contrast helpers measure and grade live palette pairings", () => {
  assert.equal(relativeLuminance("#000"), 0);
  assert.equal(relativeLuminance("not-a-color"), null);
  assert.equal(contrastRatio("#000000", "#ffffff"), 21);
  assert.equal(classifyContrast(21), "AAA text");
  assert.equal(classifyContrast(5), "AA text");
  assert.equal(classifyContrast(3.2), "Large text only");
  assert.equal(classifyContrast(2.5), "Decorative only");
  assert.equal(classifyContrast(null), "Not measured");
  assert.ok(contrastRatio("#f5f5f5", "#0d0a17") > 15);
});

test("preferred hue set is centered and invariant under red-blue exchange", () => {
  const pairs = buildSymmetricBlendSet();

  assert.equal(SYMMETRIC_BLEND_LEVELS_PER_SIDE, 3);
  assert.deepEqual(pairs, [
    { level: 1, fraction: 1 / 3, redSide: "#901580", blueSide: "#532ac2" },
    { level: 2, fraction: 2 / 3, redSide: "#b61e53", blueSide: "#3c46d6" },
    { level: 3, fraction: 1, redSide: "#dc2626", blueSide: "#2563eb" },
  ]);

  const reversed = buildSymmetricBlendSet({ red: "#2563eb", blue: "#dc2626" });
  assert.deepEqual(
    reversed.map(({ redSide, blueSide }) => ({ redSide, blueSide })),
    pairs.map(({ redSide, blueSide }) => ({ redSide: blueSide, blueSide: redSide }))
  );
});
