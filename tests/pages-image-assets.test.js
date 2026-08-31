import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { selectPagesImages, IMAGE_LIBRARY, IMAGE_CATALOG } from "../scripts/pages-image-assets.mjs";
import { buildStaticSite } from "../scripts/build-static-site.mjs";
import { runtimeAssetPaths } from "../scripts/prepare-runtime-assets.mjs";

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pages-images-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const rootDir = path.join(directory, "source");
  const paths = [];
  const write = (name, value = "original image") => {
    fs.mkdirSync(path.dirname(path.join(rootDir, name)), { recursive: true });
    fs.writeFileSync(path.join(rootDir, name), value);
    if (!paths.includes(name)) paths.push(name);
    return name;
  };
  const select = () => selectPagesImages({ rootDir, paths });
  return { directory, rootDir, paths, write, select };
}

test("image selection uses website references, not catalogs, tests, or unlinked production documents", (t) => {
  const f = fixture(t);
  const used = f.write(`${IMAGE_LIBRARY}historical/linked.jpg`);
  const unused = f.write(`${IMAGE_LIBRARY}historical/unlinked.jpg`);
  const original = f.write(`${IMAGE_LIBRARY}archie/childrens-books/source/original.png`);
  f.write("content/markdown/aaa/attributions.md", `[Original](../../assets/images/historical/linked.jpg)\n[Catalog](../../assets/images/images.json)\nFuture source: \`${unused}\`\n\`\`\`md\n![Example](../../assets/images/missing-example.png)\n\`\`\``);
  f.write(IMAGE_CATALOG, JSON.stringify({ images: [{ path: used, usage: { usedBy: [] } }, { path: unused, usage: { usedBy: ["index.html"] } }, { path: original }] }));
  f.write("reference/production/README.md", `![Page](../../${original})`);
  f.write("tests/example.js", `const image = '${unused}';`);
  f.write("content/generated/source-index/snapshot.json", JSON.stringify({ images: [unused, original] }));
  assert.deepEqual(f.select().retainedPaths, [used]);
  assert.deepEqual(f.select().excludedPaths.sort(), [unused, original].sort());
});

test("selection resolves HTML, srcset, CSS, JavaScript, scene JSON, Markdown and same-site URLs", (t) => {
  const f = fixture(t);
  const image = (name) => f.write(`${IMAGE_LIBRARY}${name}`);
  const retained = ["html.png", "large.png", "style.png", "script.png", "scene.png", "inline.png", "reference.png", "space name.png", "absolute.png", "unicode-π.png"].map(image);
  const excluded = image("external.png");
  f.write("CNAME", "example.test\n");
  f.write("index.html", `<img src="/${retained[0]}" srcset="${retained[0]} 1x, ${retained[1]} 2x"><img src="https://elsewhere.test/${excluded}">`);
  f.write("src/theme.css", `body { background: url(../${retained[2]}?v=1); }`);
  f.write("src/app.js", `const image = new URL('../${retained[3]}', import.meta.url);`);
  f.write("content/scenes/test.json", JSON.stringify({ galleryImage: retained[4], badge: retained[9] }).replaceAll("/", "\\/"));
  f.write("content/markdown/aaa/test.md", `![Inline](../../assets/images/inline.png#part)\n![Reference][figure]\n[figure]: ../../assets/images/reference.png\n![Space](<../../assets/images/space name.png>)\n![Absolute](https://example.test/${retained[8]})\n[Unicode](../../assets/images/unicode-%CF%80.png)`);
  assert.deepEqual(f.select().retainedPaths, retained.sort());
  assert.deepEqual(f.select().excludedPaths, [excluded]);
});

test("linked documents and SVG image dependencies are retained transitively; unlinked SVGs are not roots", (t) => {
  const f = fixture(t);
  const linked = f.write(`${IMAGE_LIBRARY}linked.png`);
  const child = f.write(`${IMAGE_LIBRARY}nested/child.png`);
  const parent = f.write(`${IMAGE_LIBRARY}nested/parent.svg`, '<svg sodipodi:docname="old-untracked-name.svg"><image href="child.png"/></svg>');
  const unused = f.write(`${IMAGE_LIBRARY}unused.svg`, `<svg><image href="/${linked}"/></svg>`);
  f.write("index.html", '<a href="reference/priorities/public-example.md">Read</a>');
  f.write("reference/priorities/public-example.md", `![Linked](../../${linked})\n![Parent](../../${parent})`);
  assert.deepEqual(f.select().retainedPaths, [linked, child, parent].sort());
  assert.deepEqual(f.select().excludedPaths, [unused]);
});

test("literal runtime directories and template prefixes preserve dynamically selected images", (t) => {
  const f = fixture(t);
  const retained = ["gallery/a.png", "gallery/b.png", "portraits/person-a.jpg"].map((name) => f.write(`${IMAGE_LIBRARY}${name}`));
  const unused = f.write(`${IMAGE_LIBRARY}portraits/unrelated.jpg`);
  f.write("src/dynamic.js", 'const directory = "content/assets/images/gallery/"; const portrait = `content/assets/images/portraits/person-${id}.jpg`;');
  assert.deepEqual(f.select().retainedPaths, retained.sort());
  assert.deepEqual(f.select().excludedPaths, [unused]);
});

test("adding or removing a website reference changes deployment selection without moving the original", (t) => {
  const f = fixture(t);
  const original = f.write(`${IMAGE_LIBRARY}archie/childrens-books/source/original.png`);
  f.write("content/markdown/aaa/book.md", "# Book\n");
  assert.deepEqual(f.select().excludedPaths, [original]);
  f.write("content/markdown/aaa/book.md", `# Book\n![Cover](../../assets/images/archie/childrens-books/source/original.png)`);
  assert.deepEqual(f.select().retainedPaths, [original]);
  f.write("content/markdown/aaa/book.md", "# Book\n");
  assert.deepEqual(f.select().excludedPaths, [original]);
  assert.equal(fs.readFileSync(path.join(f.rootDir, original), "utf8"), "original image");
});

test("missing referenced images fail closed, as does an undeclared runtime catalog consumer", (t) => {
  const f = fixture(t);
  f.write("index.html", '<img src="content/assets/images/missing.png">');
  assert.throws(f.select, /reference is missing from payload/);
  f.write("index.html", "<h1>Website</h1>");
  f.write("src/gallery.js", `fetch('${IMAGE_CATALOG}');`);
  assert.throws(f.select, /catalog runtime consumer needs explicit image paths/);
});

test("Pages output excludes unused images and trims only the deployment catalog, preserving source bytes and attribution", (t) => {
  const f = fixture(t);
  const used = f.write(`${IMAGE_LIBRARY}used.png`);
  const unused = f.write(`${IMAGE_LIBRARY}unused.png`);
  const entry = { path: used, creators: ["Original artist"], license: { label: "Example license" }, creditLine: "Exact original credit" };
  const catalog = { schemaVersion: "0.1", images: [entry, { path: unused }] };
  f.write(IMAGE_CATALOG, JSON.stringify(catalog));
  f.write("index.html", `<img src="${used}">`);
  f.write("scripts/config/generated-runtime-assets.json", fs.readFileSync(new URL("../scripts/config/generated-runtime-assets.json", import.meta.url), "utf8"));
  const before = new Map(f.paths.map((name) => [name, fs.readFileSync(path.join(f.rootDir, name))]));
  const result = buildStaticSite({ rootDir: f.rootDir, outputDir: path.join(f.directory, "site"), trackedPaths: [...f.paths],
    prepare: () => { for (const name of runtimeAssetPaths(f.rootDir)) f.write(name, "{}"); },
  });
  assert.deepEqual(fs.readFileSync(path.join(result.outputDir, used)), before.get(used));
  assert.equal(fs.existsSync(path.join(result.outputDir, unused)), false);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(result.outputDir, IMAGE_CATALOG))), { ...catalog, images: [entry] });
  for (const [name, expected] of before) assert.deepEqual(fs.readFileSync(path.join(f.rootDir, name)), expected, name);
  assert.equal(result.images.retained, 1);
  assert.equal(result.images.excluded, 1);
  assert.equal(result.images.excludedBytes, before.get(unused).length);
});
