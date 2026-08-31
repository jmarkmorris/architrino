import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { buildStaticSite, isPagesDeploymentExcluded, WEB_KATEX_DIRECTORY, PAGES_MAX_BYTES } from "../scripts/build-static-site.mjs";
import { runtimeAssetPaths, isGeneratedRuntimeAsset, readRuntimeAssetFamilies } from "../scripts/prepare-runtime-assets.mjs";

const root = path.resolve(import.meta.dirname, "..");
const hash = (name) => createHash("sha256").update(fs.readFileSync(name)).digest("hex");

// Explicit, on-demand integration check: exports the source without ignored
// runtime outputs and removes its entire owned temporary tree on completion.
test("source-only checkout reconstructs all runtime outputs and a complete Pages payload", { timeout: 180000 }, (t) => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "architrino-source-only-"));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const sourceRoot = path.join(temporary, "source");
  const families = readRuntimeAssetFamilies();
  const paths = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { cwd: root, encoding: "utf8" })
    .split("\0").filter(Boolean).filter((name) => !isGeneratedRuntimeAsset(name, families));
  for (const name of paths) {
    const target = path.join(sourceRoot, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, name), target, fs.constants.COPYFILE_FICLONE);
  }
  for (const name of runtimeAssetPaths()) assert.equal(fs.existsSync(path.join(sourceRoot, name)), false);
  const sourceHashes = new Map(paths.map((name) => [name, hash(path.join(sourceRoot, name))]));
  console.log("[fresh-runtime] source-only export ready; generating ignored assets");
  execFileSync(process.execPath, ["scripts/prepare-runtime-assets.mjs", "--write"], { cwd: sourceRoot, stdio: "inherit" });
  execFileSync(process.execPath, ["scripts/prepare-runtime-assets.mjs", "--check"], { cwd: sourceRoot, stdio: "inherit" });
  for (const [name, expected] of sourceHashes) assert.equal(hash(path.join(sourceRoot, name)), expected, `source changed: ${name}`);
  const stamps = new Map(runtimeAssetPaths().map((name) => [name, fs.statSync(path.join(sourceRoot, name)).mtimeMs]));
  console.log("[fresh-runtime] sources unchanged; building isolated deployment payload");
  const result = buildStaticSite({ rootDir: sourceRoot, outputDir: path.join(temporary, "site"), trackedPaths: paths });
  assert.equal(result.runtimeAssetCount, runtimeAssetPaths().length);
  for (const [name, stamp] of stamps) {
    assert.equal(fs.statSync(path.join(sourceRoot, name)).mtimeMs, stamp, `unchanged output rewritten: ${name}`);
    assert.equal(hash(path.join(sourceRoot, name)), hash(path.join(result.outputDir, name)));
  }
  assert.ok(fs.existsSync(path.join(result.outputDir, "borg.html")));
  assert.ok(fs.existsSync(path.join(result.outputDir, "equation-mapping.html")));
  assert.equal(fs.existsSync(path.join(result.outputDir, ".git")), false);
  assert.equal(fs.existsSync(path.join(result.outputDir, ".local-data")), false);
  for (const name of paths.filter(isPagesDeploymentExcluded)) assert.equal(fs.existsSync(path.join(result.outputDir, name)), false, `excluded source published: ${name}`);
  const katexPaths = paths.filter((name) => name.startsWith(WEB_KATEX_DIRECTORY));
  assert.ok(katexPaths.some((name) => name.endsWith("katex.min.js")));
  assert.ok(katexPaths.some((name) => name.includes("/fonts/")));
  assert.ok(katexPaths.some((name) => name.endsWith("LICENSE.txt")));
  for (const name of katexPaths) assert.equal(hash(path.join(result.outputDir, name)), sourceHashes.get(name), `shared KaTeX changed: ${name}`);
  const imagePaths = paths.filter((name) => name.startsWith("content/assets/images/") && /\.(png|jpe?g|svg|gif|webp|avif|ico|bmp|tiff?)$/i.test(name));
  const publishedImages = imagePaths.filter((name) => fs.existsSync(path.join(result.outputDir, name)));
  // Independent checks against the actual authored links and gallery fields,
  // without calling the build's selector to decide what should be present.
  const linkedImages = new Set(["content/assets/images/nuclear/hyde-periodic-table-rsvg-friendly.svg"]);
  for (const name of paths.filter((name) => name.startsWith("content/markdown/") && name.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(sourceRoot, name), "utf8");
    for (const match of text.matchAll(/\]\(([^\s)]+)\)/g)) {
      const target = new URL(match[1], `https://build.test/${name}`);
      const image = decodeURIComponent(target.pathname).slice(1);
      if (target.hostname === "build.test" && imagePaths.includes(image)) linkedImages.add(image);
    }
  }
  const gallery = JSON.parse(fs.readFileSync(path.join(sourceRoot, "content/scenes/archie/comics.json"), "utf8"));
  const checkGallery = (value) => {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (["galleryImage", "galleryThumbnail", "labelBadgeImage"].includes(key) && typeof child === "string") linkedImages.add(child);
      else checkGallery(child);
    }
  };
  checkGallery(gallery);
  for (const name of linkedImages) assert.equal(hash(path.join(result.outputDir, name)), sourceHashes.get(name), `linked image missing or changed: ${name}`);
  for (const name of publishedImages) assert.equal(hash(path.join(result.outputDir, name)), sourceHashes.get(name), `published image changed: ${name}`);
  for (const name of imagePaths) assert.equal(hash(path.join(sourceRoot, name)), sourceHashes.get(name), `repository original changed: ${name}`);
  assert.ok(imagePaths.length > publishedImages.length);
  assert.equal(result.images.retained, publishedImages.length);
  assert.equal(result.images.excluded, imagePaths.length - publishedImages.length);
  const catalogPath = "content/assets/images/images.json";
  assert.equal(hash(path.join(sourceRoot, catalogPath)), sourceHashes.get(catalogPath));
  const sourceCatalog = JSON.parse(fs.readFileSync(path.join(sourceRoot, catalogPath), "utf8"));
  const deploymentCatalog = JSON.parse(fs.readFileSync(path.join(result.outputDir, catalogPath), "utf8"));
  assert.deepEqual(deploymentCatalog.images, sourceCatalog.images.filter((entry) => publishedImages.includes(entry.path)));
  assert.ok(result.byteCount <= PAGES_MAX_BYTES);
  console.log(`[fresh-runtime] verified ${result.runtimeAssetCount} outputs, ${result.fileCount} deployment files, ${result.byteCount} bytes, ${katexPaths.length} unchanged KaTeX files, ${linkedImages.size} independently enumerated image links, and all ${imagePaths.length} unchanged repository images; ${result.images.excluded} images (${result.images.excludedBytes} bytes) excluded; scratch copies will be removed`);
});
