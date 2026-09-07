import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildEquationMappingCorpus, extractEquationSymbols, findContextDefinition } from "../scripts/build-equation-mapping-corpus.mjs";
import { loadVendoredCommonJsBundle } from "../scripts/load-vendored-commonjs-bundle.mjs";
import {
  EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA,
  loadEquationMappingCorpusRecords,
  normalizeEquationMappingCorpusPayload,
} from "../src/apps/equation-mapping/EquationMappingCorpusLoader.js";
import {
  createEquationMappingDocuments,
  createEquationMappingRegistryApi,
} from "../src/apps/equation-mapping/EquationMappingRegistry.js";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";

const payload = JSON.parse(
  readFileSync(new URL("../content/generated/equation-mapping/corpus-equations.json", import.meta.url), "utf8")
);
const repoRoot = fileURLToPath(new URL("..", import.meta.url));

function listMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listMarkdownFiles(entryPath)
      : entryPath.endsWith(".md")
        ? [entryPath]
        : [];
  });
}

test("generated equation registry covers every corpus display equation", () => {
  const result = buildEquationMappingCorpus({
    rootDir: new URL("..", import.meta.url).pathname,
    mode: "check",
  });

  assert.equal(result.errors.length, 0);
  assert.equal(result.files, 199);
  assert.equal(result.equations, 4658);
  assert.equal(result.promoted, 23);
  assert.equal(result.symbolDefinitions, 30035);
});

test("every equation registry record is addressable, sourced, and symbol-defined", () => {
  const normalized = normalizeEquationMappingCorpusPayload(payload);
  const semanticIds = new Set(normalized.records.map((record) => record.semanticId));

  assert.equal(normalized.schema, EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA);
  assert.equal(normalized.records.length, 4658);
  assert.equal(semanticIds.size, normalized.records.length);
  assert.equal(normalized.records.filter((record) => record.promoted).length, 23);
  assert.equal(normalized.records.every((record) => record.source.sourcePath && record.source.sourceHeading), true);
  assert.equal(
    normalized.records.every((record) =>
      record.symbols.every((symbol) => symbol.tex && symbol.definition && symbol.scope && symbol.definitionSource)
    ),
    true
  );
});

test("corpus loader and public registry expose basic direct equation pages", async () => {
  const records = await loadEquationMappingCorpusRecords(async () => ({
    ok: true,
    async json() {
      return payload;
    },
  }));
  const api = createEquationMappingRegistryApi({ corpusRecords: records });
  const basicRecord = records.find((record) => !record.promoted);
  const page = api.get(basicRecord.semanticId);

  assert.equal(api.list().length, 4658);
  assert.equal(page.semanticId, basicRecord.semanticId);
  assert.equal(page.promoted, false);
  assert.equal(page.source.sourcePath, basicRecord.source.sourcePath);
  assert.equal(page.symbols.length, basicRecord.symbols.length);
  assert.equal(api.href(basicRecord.semanticId), `equation-mapping.html#${basicRecord.semanticId}`);
});

test("promotion changes carousel membership but not baseline equation access", () => {
  const documents = createEquationMappingDocuments(payload.records);
  const basicDocument = documents.find((document) => !document.promoted);
  const runtime = new EquationMappingRuntime({
    documents,
    initialDocumentId: basicDocument.id,
    document: {},
    window: {},
  });

  assert.equal(documents.length, 4658);
  assert.equal(runtime.getVisibleDocumentList().length, 4658);
  assert.equal(runtime.getCarouselDocumentList().length, 23);
  assert.equal(runtime.activeDocument.id, basicDocument.id);
  assert.equal(runtime.activeDocument.source.sourcePath, basicDocument.source.sourcePath);
  assert.equal(runtime.getDocumentByOffset(1), null);
});

test("hash navigation synchronizes an already-open equation page", () => {
  const documents = createEquationMappingDocuments(payload.records);
  const basicDocument = documents.find((document) => !document.promoted);
  const windowLike = { location: { hash: `#${basicDocument.id}` } };
  const runtime = new EquationMappingRuntime({
    documents,
    initialDocumentId: "causal-wake-per-hit-law",
    document: {},
    window: windowLike,
  });
  runtime.render = () => {};

  assert.equal(runtime.activeDocument.promoted, true);
  assert.equal(runtime.syncActiveDocumentFromLocation(), true);
  assert.equal(runtime.activeDocument.id, basicDocument.id);
  assert.equal(runtime.activeDocument.promoted, false);
});

test("local symbol definitions outrank earlier mentions and resolve numeric powers", () => {
  const context = [
    "| Matching | $G_F$ alone does not reconstruct the resolved weak sector |",
    "Fermi's beta theory is a low-energy example involving $G_F$.",
    "Plainly: $G_F$ is the effective coefficient, $g$ is the coupling, and $M_W$ is the mediator mass. Another sentence.",
  ];
  assert.equal(findContextDefinition("G_F", context), "$G_F$ is the effective coefficient, $g$ is the coupling, and $M_W$ is the mediator mass.");
  assert.equal(findContextDefinition("g^2", context), "$g$ is the coupling, and $M_W$ is the mediator mass.");
  assert.equal(findContextDefinition("M_W^{2}", context), "$M_W$ is the mediator mass.");
  assert.equal(findContextDefinition("M_Z^2", context), "");
  assert.equal(findContextDefinition("g^{eff}", context), "");
  assert.equal(findContextDefinition("g^2", [...context, "$g^2$ is the squared coupling."]), "$g^2$ is the squared coupling.");
  assert.equal(findContextDefinition("g", ["$g$ is not defined in this section."]), "");
});

test("extracted symbol TeX preserves command-separating whitespace", () => {
  const tex = "W_{r\\leftarrow t}^{\\mathrm{acc}}+\\hat{\\mathbf y}+A_\\text{self}+\\operatorname*{arg\\,max}";
  const symbols = extractEquationSymbols(tex);
  assert.deepEqual(symbols, ["W_{r\\leftarrow t}^{\\mathrm{acc}}", "\\hat{\\mathbf y}", "A_\\text{self}", "\\operatorname*{arg\\,max}"]);
  const katex = loadVendoredCommonJsBundle(path.join(repoRoot, "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js"));
  for (const symbol of symbols) assert.doesNotThrow(() => katex.renderToString(symbol, { throwOnError: true }));
});

test("the chapter's stable equation links resolve to its current unpunctuated source", () => {
  const sourcePath = "content/markdown/aaa/philosophy-history/one-nature-many-theories.md";
  const source = readFileSync(path.join(repoRoot, sourcePath), "utf8");
  // Independent literal Markdown inventory, not the generator's parser.
  const displays = [...source.matchAll(/\$\$\s*\n([\s\S]*?)\n\$\$\s*\n\s*\[View →\]\([^#]+#([^\s)]+)\)/gu)];
  assert.equal(displays.length, 9);
  for (const [, tex, id] of displays) {
    const record = payload.records.find((entry) => entry.semanticId === id);
    assert.ok(record, id);
    assert.equal(record.source.sourcePath, sourcePath, id);
    assert.equal(record.formulaTeX, tex.trim(), id);
    assert.doesNotMatch(tex.trim(), /[.,;:]$/u, id);
    assert.equal(source.split("\n")[record.source.startLine - 1], "$$", id);
  }
  const fermi = payload.records.find((entry) => entry.semanticId === "corpus-equation-b44957fa1f24bad8");
  assert.equal(fermi.source.sourceHeading, "An Evidence-Backed Bridge Network");
  assert.equal(fermi.formulaTeX, "\\frac{G_F}{\\sqrt{2}}=\\frac{g^2}{8M_W^2}");
  assert.ok(fermi.symbols.every((symbol) => symbol.definitionSource === "source-context"));
  assert.match(fermi.symbols.find((symbol) => symbol.tex === "g^2").definition, /electroweak coupling/u);
  assert.match(fermi.symbols.find((symbol) => symbol.tex === "M_W^2").definition, /boson mass/u);
});

test("period renaming preserves equation links, absolute-time arguments, and path ordering", () => {
  const sourceFormula = (sourcePath, id) => {
    const source = readFileSync(path.join(repoRoot, sourcePath), "utf8");
    // These literal IDs predate the rename; the independent Markdown scan must
    // still associate them with the same equations after their notation changes.
    const displays = [...source.matchAll(/\$\$\s*\n([\s\S]*?)\n\$\$\s*\n\s*\[View →\]\([^#]+#([^\s)]+)\)/gu)];
    const found = displays.find((entry) => entry[2] === id);
    assert.ok(found, id);
    return found[1].trim();
  };
  const clock = sourceFormula("content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md", "corpus-equation-ad47d7d0529c2a26");
  assert.equal(clock, String.raw`P(v)=\gamma_\star(v)P_0`);
  const acceleratedClock = sourceFormula("content/markdown/aaa/dynamics/master-equation.md", "corpus-equation-3a2d23af3d6800e0");
  assert.ok(acceleratedClock.includes("P_q[v(T),a(T)]"));
  assert.ok(acceleratedClock.includes("P_q[v(T),0]"));
  const holonomy = sourceFormula("content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md", "corpus-equation-1bd2519b922c4819");
  assert.ok(holonomy.includes(String.raw`\mathcal P\exp\!\int_0^{P_{\mathrm{cyc}}}`));
  assert.ok(holonomy.includes(String.raw`(T')\,dT'`));
  const katex = loadVendoredCommonJsBundle(path.join(repoRoot, "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js"));
  for (const tex of [clock, acceleratedClock, holonomy]) {
    assert.doesNotThrow(() => katex.renderToString(tex, { throwOnError: true, strict: "error" }));
  }
  for (const [id, symbolTex] of [
    ["corpus-equation-ad47d7d0529c2a26", "P"],
    ["corpus-equation-3a2d23af3d6800e0", "P_q"],
    ["corpus-equation-180eeb923714e4b2", String.raw`P_{\mathrm{rec}}`],
  ]) {
    const symbol = payload.records.find((record) => record.semanticId === id)?.symbols.find((entry) => entry.tex === symbolTex);
    assert.ok(symbol, `${id}: ${symbolTex}`);
    assert.equal(symbol.definitionSource, "source-context", id);
    assert.match(symbol.definition, /cycle[ -]period/u, id);
  }
});

test("weak-mixing suppression uses its defined exponential without changing equation identities", () => {
  const sourcePath = "content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md";
  const source = readFileSync(path.join(repoRoot, sourcePath), "utf8");
  const sourceDisplays = new Map(
    [...source.matchAll(/\$\$\s*\n([\s\S]*?)\n\$\$\s*\n\s*\[View →\]\([^#]+#([^\s)]+)\)/gu)]
      .map((match) => [match[2], match[1].trim()])
  );
  const expected = new Map([
    ["corpus-equation-58898312379d9609", String.raw`s_{12}=e^{-\kappa_{12}},\qquad
s_{23}=e^{-\kappa_{23}},\qquad
s_{13}=e^{-(\kappa_{12}+\kappa_{23}+\sigma)}=e^{-\sigma}\,s_{12}s_{23},
\quad e^{-\sigma}\in(0,1]`],
    ["corpus-equation-ccc19aa7c2baec0f", String.raw`\cos\delta=e^{-\sigma}=\frac{s_{13}}{s_{12}s_{23}}`],
    ["corpus-equation-abbd720bd46fe80f", String.raw`\kappa_{12}=1.492,\quad \kappa_{23}=3.194,\quad \sigma=0.914,\quad e^{-\sigma}=0.401`],
  ]);
  assert.doesNotMatch(source, /\\xi(?![A-Za-z])/u);
  for (const [id, formula] of expected) {
    assert.equal(sourceDisplays.get(id), formula, id);
    const record = payload.records.find((entry) => entry.semanticId === id);
    assert.equal(record?.source.sourcePath, sourcePath, id);
    assert.equal(record.formulaTeX, formula, id);
    const factor = record.symbols.find((entry) => entry.tex === String.raw`e^{-\sigma}`);
    assert.equal(factor?.definitionSource, "source-context", id);
    assert.match(factor.definition, /Direct-Transport Suppression Factor.*bypassing the intermediate generation/u, id);
    assert.doesNotMatch(factor.definition, /\\xi(?![A-Za-z])/u, id);
  }
});

test("every Equation Mapping link shipped in the iOS package has a public app route", () => {
  const packageRoot = path.join(repoRoot, "apps/ios/ArchitrinoReader/GeneratedTextbookPackage");
  const equationIds = new Set();
  listMarkdownFiles(packageRoot).forEach((markdownPath) => {
    const source = readFileSync(markdownPath, "utf8");
    for (const match of source.matchAll(/equation-mapping\.html#([^)\s]+)/gu)) {
      equationIds.add(decodeURIComponent(match[1]));
    }
  });
  const linkBundle = JSON.parse(readFileSync(path.join(packageRoot, "textbook_bundle_links.json"), "utf8"));
  const publicEquationIds = new Set(
    linkBundle.links
      .map((entry) => entry.targetBundlePath)
      .filter((target) => String(target).startsWith("https://architrino.com/equation-mapping.html#"))
      .map((target) => decodeURIComponent(target.split("#")[1]))
  );

  assert.equal(equationIds.size, 4606);
  assert.equal(publicEquationIds.size, equationIds.size);
  assert.deepEqual([...equationIds].filter((id) => !publicEquationIds.has(id)), []);
});
