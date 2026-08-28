#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createEquationMappingRegistryApi } from "../src/apps/equation-mapping/EquationMappingRegistry.js";

export const CORPUS_EQUATION_REGISTRY_SCHEMA = "equation-mapping-corpus-registry.v1";
export const EQUATION_LINK_LABEL = "Explore this equation in Equation Mapping";
export const GENERATED_REGISTRY_PATH = "content/generated/equation-mapping/corpus-equations.json";

const CORPUS_ROOT = "content/markdown/aaa";
const EQUATION_MAPPING_PAGE_PATH = "equation-mapping.html";
const SCENE_GRAPH_PATH = "content/graph/scene_graph.json";
const DEFINITION_CUES = /\b(?:is|are|denotes?|means?|represents?|records?|labels?|indexes?|controls?|carries?|gives?|measures?|sets?|tracks?|counts?|with|where|here)\b|:/iu;
const NEGATED_DEFINITION_CUES = /\b(?:not\s+(?:a\s+)?definition|does\s+not\s+define|do\s+not\s+define|is\s+not\s+defined|remains?\s+undefined)\b/iu;
const VARIABLE_COMMANDS = new Set([
  "alpha", "beta", "gamma", "delta", "epsilon", "varepsilon", "zeta", "eta", "theta", "vartheta",
  "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "varpi", "rho", "varrho",
  "sigma", "varsigma", "tau", "upsilon", "phi", "varphi", "chi", "psi", "omega",
  "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi", "Sigma", "Upsilon", "Phi", "Psi", "Omega",
  "ell", "hbar", "infty", "partial", "nabla", "sum", "prod", "int", "iint", "iiint", "oint", "lim",
]);
const DECORATOR_COMMANDS = new Set([
  "mathbf", "mathcal", "mathbb", "mathrm", "mathsf", "mathtt", "boldsymbol", "hat", "widehat", "vec",
  "bar", "overline", "tilde", "widetilde", "dot", "ddot",
]);
const SKIP_GROUP_COMMANDS = new Set([
  "begin", "end", "text", "textrm", "textit", "textbf", "label", "tag", "href", "color", "class",
]);
const OPERATORNAME_COMMANDS = new Set(["operatorname", "operatornamewithlimits"]);
const SHARED_SYMBOL_DEFINITIONS = Object.freeze({
  A: "an acceleration, amplitude, area, or indexed coefficient fixed by the local source context",
  a: "a local scale, acceleration, coefficient, or indexed quantity",
  B: "a boundary, magnetic-comparison, or bookkeeping quantity",
  b: "an impact parameter, branch label, or local coefficient",
  c: "a propagation or calibration speed",
  D: "a causal-root derivative, delay factor, or differential quantity",
  d: "a differential marker or local distance quantity",
  E: "an energy or energy-ledger quantity",
  e: "an energy density, exponential base, or local coefficient",
  F: "an effective force-like, field, or tensor quantity",
  f: "a frequency, distribution, or local function",
  G: "a causal-root function, geometric tensor, or effective coupling",
  g: "a metric, causal-root function, or local response quantity",
  H: "a rate, history functional, or Hamiltonian-like effective quantity",
  h: "an action scale, metric component, or local step size",
  I: "an identity, inertia-response, intensity, or indexed integral",
  i: "an index, component label, or imaginary unit as fixed by context",
  J: "a current, flux, or Jacobian quantity",
  j: "an index or transmitter label",
  K: "a kinetic, kernel, curvature, or local response function",
  k: "a wave number, curvature label, coupling, or index",
  L: "an angular-momentum, Lagrangian, length, or ledger quantity",
  l: "a length or index",
  M: "an assembly-scale, response, mass-ledger, or matrix quantity",
  m: "an index, mode number, or effective mass-ledger quantity",
  N: "a count, lapse, normalization, or Noether-related quantity",
  n: "an index, count, normal, or mode number",
  P: "a pressure, probability, momentum, or projection quantity",
  p: "a momentum, probability, or local parameter",
  Q: "a conserved charge, quality factor, or indexed quantity",
  q: "an architrino polarity or charge-comparison label",
  R: "a radius, residual, response, or curvature quantity",
  r: "a separation, radius, residual, or receiver label",
  S: "an action, source, entropy, or state quantity",
  s: "a speed argument, path parameter, source, or state label",
  T: "absolute substrate time or an explicitly labeled time record",
  t: "a time coordinate, transmitter label, or integration parameter",
  U: "an interaction-energy or effective potential quantity",
  u: "a velocity, displacement, energy share, or local response variable",
  V: "a velocity, volume, potential, or control region",
  v: "a velocity or local state variable",
  W: "a causal-wake weight, window, or work quantity",
  w: "a velocity, frequency-like variable, or local weight",
  X: "a Euclidean position or state-space quantity",
  x: "a coordinate or local state variable",
  Y: "an output, coordinate, or response quantity",
  y: "a coordinate or local variable",
  Z: "a normalization, partition, or indexed quantity",
  z: "a redshift, coordinate, or local variable",
  alpha: "a coupling, response, or local dimensionless coefficient",
  beta: "a response, inverse-temperature, or local dimensionless coefficient",
  gamma: "a Lorentz-like, geometric, damping, or response factor",
  delta: "a variation, difference, distribution, or small parameter",
  epsilon: "an error, energy increment, tolerance, or small parameter",
  eta: "a regularization, efficiency, or local parameter",
  theta: "an angle, phase, or state parameter",
  kappa: "a coupling, curvature, or response coefficient",
  lambda: "a wavelength, multiplier, eigenvalue, or local parameter",
  mu: "a measure, multiplier, response coefficient, or effective bookkeeping factor",
  nu: "a frequency or mode label",
  xi: "a coordinate, deformation, or dimensionless response ratio",
  pi: "the circle constant or an indexed momentum-like quantity",
  rho: "a density or radial state quantity",
  sigma: "a polarity sign, stress, spread, or response coefficient",
  tau: "a clock/proper-time readout, duration, or torque quantity",
  phi: "a phase, potential, flux, or angular coordinate",
  chi: "a state, susceptibility, fraction, or coordinate variable",
  psi: "a wavefunction-comparison, state, or phase quantity",
  omega: "an angular frequency, cadence, or local rate",
  partial: "the partial-derivative operator shown with its local differentiation variable",
  nabla: "the spatial gradient or divergence operator in the declared coordinate layer",
  sum: "a sum over the index or causal-root set shown beneath the symbol",
  prod: "a product over the index set shown beneath the symbol",
  int: "an integral over the displayed variable or domain",
  iint: "a double integral over the displayed variables or domain",
  iiint: "a triple integral over the displayed variables or domain",
  oint: "a closed-contour or closed-surface integral",
  lim: "a limit taken in the direction displayed beneath the symbol",
  infty: "the unbounded-limit symbol",
  hbar: "the reduced action quantum in an observer-level or comparison relation",
});

function listMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(entryPath);
    return entryPath.endsWith(".md") ? [entryPath] : [];
  });
}

function normalizePath(value) {
  return String(value ?? "").split(path.sep).join("/");
}

function normalizeTeX(value) {
  return String(value ?? "").replace(/%[^\n]*/gu, " ").replace(/\s+/gu, " ").trim();
}

function stripInlineCode(line) {
  return String(line ?? "").replace(/`+[^`]*`+/gu, "");
}

function stripContainerPrefix(line, prefix) {
  if (prefix && line.startsWith(prefix)) return line.slice(prefix.length);
  return line.replace(/^\s*>\s?/u, "");
}

function cleanHeading(value) {
  return String(value ?? "")
    .replace(/^\s*#{1,6}\s+/u, "")
    .replace(/\[(.*?)\]\([^)]*\)/gu, "$1")
    .replace(/[*_`]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function cleanContextLine(value) {
  return String(value ?? "")
    .replace(/^\s*>\s?/u, "")
    .replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/u, "")
    .replace(/\[(.*?)\]\([^)]*\)/gu, "$1")
    .replace(/<[^>]+>/gu, " ")
    .replace(/\*\*|__/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function readBalancedGroup(source, startIndex) {
  if (source[startIndex] !== "{") return null;
  let depth = 0;
  for (let index = startIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    else if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return { end: index + 1, text: source.slice(startIndex, index + 1) };
    }
  }
  return null;
}

function consumeScripts(source, startIndex) {
  let cursor = startIndex;
  while (cursor < source.length) {
    while (/\s/u.test(source[cursor] ?? "")) cursor += 1;
    if (source[cursor] !== "_" && source[cursor] !== "^") break;
    cursor += 1;
    while (/\s/u.test(source[cursor] ?? "")) cursor += 1;
    if (source[cursor] === "{") {
      const group = readBalancedGroup(source, cursor);
      if (!group) break;
      cursor = group.end;
    } else if (source[cursor] === "\\") {
      const command = source.slice(cursor).match(/^\\[A-Za-z]+/u)?.[0];
      cursor += command?.length ?? 1;
      if (SKIP_GROUP_COMMANDS.has(command?.slice(1)) || DECORATOR_COMMANDS.has(command?.slice(1))) {
        while (/\s/u.test(source[cursor] ?? "")) cursor += 1;
        const group = readBalancedGroup(source, cursor);
        if (group) cursor = group.end;
      }
    } else if (cursor < source.length) {
      cursor += 1;
    }
  }
  return cursor;
}

function symbolBase(tex) {
  const command = tex.match(/^\\([A-Za-z]+)/u)?.[1];
  if (command && VARIABLE_COMMANDS.has(command)) return command;
  if (command && DECORATOR_COMMANDS.has(command)) {
    const group = tex.match(/^\\[A-Za-z]+\s*\{\\?([A-Za-z]+)/u)?.[1];
    return group ?? command;
  }
  return tex.match(/[A-Za-z]/u)?.[0] ?? command ?? tex;
}

export function extractEquationSymbols(tex) {
  const source = String(tex ?? "");
  const symbols = [];
  const seen = new Set();
  let cursor = 0;
  const addSymbol = (start, end) => {
    const token = normalizeTeX(source.slice(start, end));
    const identity = token.replace(/\s+/gu, "");
    if (!token || seen.has(identity)) return;
    // Spaces can terminate TeX commands (e.g. \\leftarrow t); they are not
    // disposable in the formula shown by chips and fallback definitions.
    seen.add(identity);
    symbols.push(token);
  };

  while (cursor < source.length) {
    const character = source[cursor];
    if (character === "\\") {
      const commandMatch = source.slice(cursor).match(/^\\([A-Za-z]+)/u);
      if (!commandMatch) {
        cursor += 2;
        continue;
      }
      const command = commandMatch[1];
      const commandEnd = cursor + commandMatch[0].length;
      if (SKIP_GROUP_COMMANDS.has(command)) {
        let next = commandEnd;
        while (/\s/u.test(source[next] ?? "")) next += 1;
        const group = readBalancedGroup(source, next);
        cursor = group?.end ?? commandEnd;
        continue;
      }
      if (OPERATORNAME_COMMANDS.has(command)) {
        let next = commandEnd;
        if (source[next] === "*") next += 1;
        while (/\s/u.test(source[next] ?? "")) next += 1;
        const group = readBalancedGroup(source, next);
        const end = consumeScripts(source, group?.end ?? commandEnd);
        addSymbol(cursor, end);
        cursor = end;
        continue;
      }
      if (DECORATOR_COMMANDS.has(command)) {
        let next = commandEnd;
        while (/\s/u.test(source[next] ?? "")) next += 1;
        const group = readBalancedGroup(source, next);
        if (group) {
          const end = consumeScripts(source, group.end);
          addSymbol(cursor, end);
          cursor = end;
          continue;
        }
      }
      if (VARIABLE_COMMANDS.has(command)) {
        const end = consumeScripts(source, commandEnd);
        addSymbol(cursor, end);
        cursor = end;
        continue;
      }
      cursor = commandEnd;
      continue;
    }
    if (/[A-Za-z]/u.test(character)) {
      const end = consumeScripts(source, cursor + 1);
      addSymbol(cursor, end);
      cursor = end;
      continue;
    }
    cursor += 1;
  }
  return symbols;
}

export function findContextDefinition(symbolTex, contextLines) {
  const target = normalizeTeX(symbolTex);
  // A numeric power keeps its base symbol's local meaning. Do not strip
  // subscripts or named superscripts: they can identify different quantities.
  const baseTarget = target.replace(/\^(?:\{\d+\}|\d)/gu, "");
  for (const definitionTarget of new Set([target, baseTarget])) {
    for (const rawLine of contextLines) {
      if (NEGATED_DEFINITION_CUES.test(rawLine)) continue;
      for (const match of String(rawLine).matchAll(/\$([^$\n]+)\$/gu)) {
        if (normalizeTeX(match[1]) !== definitionTarget) continue;
        const following = rawLine.slice(match.index + match[0].length);
        if (!/^\s+(?:is|are|denotes?|means?|represents?)\b/iu.test(following)) continue;
        // Keep the defining sentence rather than unrelated later sentences.
        const sentenceEnd = /[.!?](?=\s|$)/u.exec(following);
        const end = sentenceEnd
          ? match.index + match[0].length + sentenceEnd.index + 1
          : rawLine.length;
        const definition = cleanContextLine(rawLine.slice(match.index, end));
        if (definition && definition.length <= 520) return definition;
      }
    }
  }
  for (const rawLine of contextLines) {
    const inlineMath = [...String(rawLine).matchAll(/\$([^$\n]+)\$/gu)];
    const containsTarget = inlineMath.some((match) =>
      normalizeTeX(match[1]) === target || extractEquationSymbols(match[1]).includes(symbolTex)
    );
    const hasDefinitionShape = DEFINITION_CUES.test(rawLine) || /^\s*(?:[-*+]\s+|\|)/u.test(rawLine);
    if (!containsTarget || !hasDefinitionShape || NEGATED_DEFINITION_CUES.test(rawLine)) continue;
    const cleaned = cleanContextLine(rawLine);
    if (cleaned && cleaned.length <= 520) return cleaned;
  }
  return "";
}

function createSymbolDefinition(symbolTex, contextLines, heading) {
  const contextual = findContextDefinition(symbolTex, contextLines);
  if (contextual) return { definition: contextual, source: "source-context" };
  const base = symbolBase(symbolTex);
  const shared = SHARED_SYMBOL_DEFINITIONS[base] ?? "a context-specific mathematical quantity or operator";
  return {
    definition: `$${symbolTex}$ is used here as ${shared}. This role is inferred from shared corpus notation because no narrower definition was detected in the local source section “${heading}”; consult the source excerpt for its exact use.`,
    source: "shared-context",
  };
}

function parseLinkTarget(linkText) {
  const match = String(linkText ?? "").match(/\[Explore this equation in Equation Mapping\]\(([^)#]+)#([^)]+)\)/u);
  if (!match) return null;
  return { href: match[1], semanticId: decodeURIComponent(match[2]) };
}

function createDerivedSemanticId(sourcePath, normalizedFormula, duplicateIndex = 0) {
  const digest = crypto
    .createHash("sha256")
    .update(`${sourcePath}\0${normalizedFormula}`)
    .digest("hex")
    .slice(0, 16);
  return `corpus-equation-${digest}${duplicateIndex > 0 ? `-${duplicateIndex + 1}` : ""}`;
}

function findImmediateEquationLink(source, closeEnd) {
  const linkPattern = /\[Explore this equation in Equation Mapping\]\([^)]+\)/gu;
  linkPattern.lastIndex = closeEnd;
  const match = linkPattern.exec(source);
  if (!match) return null;
  const gap = source.slice(closeEnd, match.index);
  if (gap.replace(/[\s>]/gu, "") !== "") return null;
  const target = parseLinkTarget(match[0]);
  return target ? { ...target, start: match.index, end: match.index + match[0].length, text: match[0] } : null;
}

export function parseCorpusDisplayEquations(sourcePath, source) {
  const lines = source.split(/\r?\n/u);
  const lineStarts = [];
  let sourceOffset = 0;
  for (const line of lines) {
    lineStarts.push(sourceOffset);
    sourceOffset += line.length + 1;
  }
  const blocks = [];
  let fence = null;
  let openBlock = null;
  let currentHeading = path.basename(sourcePath, ".md").replaceAll("-", " ");

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const rawLine = lines[lineIndex];
    const headingMatch = rawLine.match(/^\s*#{1,6}\s+(.+)$/u);
    if (!openBlock && headingMatch) currentHeading = cleanHeading(headingMatch[1]);
    const fenceMatch = rawLine.match(/^\s*(`{3,}|~{3,})/u);
    if (!openBlock && fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = null;
      continue;
    }
    if (fence) continue;

    if (openBlock) {
      const closeIndex = rawLine.indexOf("$$");
      if (closeIndex < 0) {
        openBlock.body.push(stripContainerPrefix(rawLine, openBlock.containerPrefix));
        continue;
      }
      openBlock.body.push(stripContainerPrefix(rawLine.slice(0, closeIndex), openBlock.containerPrefix));
      const closeEnd = lineStarts[lineIndex] + closeIndex + 2;
      const tex = openBlock.body.join("\n").trim();
      if (tex) {
        blocks.push({
          sourcePath,
          heading: openBlock.heading,
          startLine: openBlock.startLine,
          endLine: lineIndex + 1,
          openStart: openBlock.openStart,
          closeEnd,
          containerPrefix: openBlock.containerPrefix,
          tex,
          normalizedFormula: normalizeTeX(tex),
          existingLink: findImmediateEquationLink(source, closeEnd),
        });
      }
      openBlock = null;
      continue;
    }

    const displayLine = stripInlineCode(rawLine);
    let cursor = 0;
    while (cursor < displayLine.length) {
      const openIndex = displayLine.indexOf("$$", cursor);
      if (openIndex < 0) break;
      const contentStart = openIndex + 2;
      const closeIndex = displayLine.indexOf("$$", contentStart);
      const containerPrefix = displayLine.slice(0, openIndex).match(/^\s*(?:>\s*)?/u)?.[0] ?? "";
      if (closeIndex >= 0) {
        const tex = displayLine.slice(contentStart, closeIndex).trim();
        const closeEnd = lineStarts[lineIndex] + closeIndex + 2;
        if (tex) {
          blocks.push({
            sourcePath,
            heading: currentHeading,
            startLine: lineIndex + 1,
            endLine: lineIndex + 1,
            openStart: lineStarts[lineIndex] + openIndex,
            closeEnd,
            containerPrefix,
            tex,
            normalizedFormula: normalizeTeX(tex),
            existingLink: findImmediateEquationLink(source, closeEnd),
          });
        }
        cursor = closeIndex + 2;
      } else {
        openBlock = {
          heading: currentHeading,
          startLine: lineIndex + 1,
          openStart: lineStarts[lineIndex] + openIndex,
          containerPrefix,
          body: [displayLine.slice(contentStart)],
        };
        break;
      }
    }
  }
  return blocks;
}

function sourceContextForBlock(lines, block, allBlocks) {
  const contextLines = [];
  let sectionLower = 0;
  for (let index = block.startLine - 2; index >= 0; index -= 1) {
    if (/^\s*#{1,6}\s+/u.test(lines[index])) {
      sectionLower = index;
      break;
    }
  }
  let sectionUpper = lines.length;
  for (let index = block.endLine; index < lines.length; index += 1) {
    if (/^\s*#{1,6}\s+/u.test(lines[index])) {
      sectionUpper = index;
      break;
    }
  }
  const definitionLower = Math.max(sectionLower, block.startLine - 80);
  const definitionUpper = Math.min(sectionUpper, block.endLine + 80);
  const isDisplayEquationLine = (lineIndex) => allBlocks.some(
    (candidate) => lineIndex + 1 >= candidate.startLine && lineIndex + 1 <= candidate.endLine
  );
  for (let index = definitionLower; index < definitionUpper; index += 1) {
    if (isDisplayEquationLine(index)) continue;
    const line = lines[index];
    if (!line.trim() || line.includes(EQUATION_LINK_LABEL) || line.includes("$$")) continue;
    contextLines.push(line);
  }
  const lower = Math.max(sectionLower, block.startLine - 25);
  const upper = Math.min(sectionUpper, block.endLine + 25);
  const before = [];
  for (let index = block.startLine - 2; index >= lower && before.length < 4; index -= 1) {
    if (isDisplayEquationLine(index)) continue;
    const cleaned = cleanContextLine(lines[index]);
    if (cleaned && !cleaned.startsWith("#") && !cleaned.includes(EQUATION_LINK_LABEL)) before.unshift(cleaned);
  }
  const after = [];
  for (let index = block.endLine; index < upper && after.length < 8; index += 1) {
    if (isDisplayEquationLine(index)) continue;
    const cleaned = cleanContextLine(lines[index]);
    if (cleaned && !cleaned.startsWith("#") && !cleaned.includes(EQUATION_LINK_LABEL)) after.push(cleaned);
  }
  return {
    contextLines,
    before: before.join(" ").slice(0, 900),
    after: after.join(" ").slice(0, 1500),
  };
}

function createSceneHrefMap(rootDir) {
  const graphPath = path.join(rootDir, SCENE_GRAPH_PATH);
  if (!fs.existsSync(graphPath)) return new Map();
  const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
  const map = new Map();
  for (const edge of graph.edges ?? []) {
    if (edge.edgeType !== "markdown_doc" || !String(edge.to).startsWith("markdown_doc:")) continue;
    const markdownPath = String(edge.to).slice("markdown_doc:".length);
    const scenePath = String(edge.from ?? "").replace(/^scene:/u, "");
    if (markdownPath && scenePath && !map.has(markdownPath)) {
      map.set(markdownPath, `index.html#scene=${encodeURIComponent(scenePath)}`);
    }
  }
  return map;
}

function subjectForPath(sourcePath) {
  const area = sourcePath.slice(`${CORPUS_ROOT}/`.length).split("/")[0];
  const labels = {
    archie: "Archie references",
    assemblies: "Assemblies",
    cosmology: "Cosmology and astrophysics",
    dynamics: "Dynamics",
    foundations: "$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ foundations",
    "noether-braid": "Noether braid",
    "nuclear-atomic": "Nuclear and atomic assemblies",
    "philosophy-history": "Theory bridges and history",
    quantum: "Quantum and QFT",
    reactions: "Reactions",
    spacetime: "Relativity and effective metric",
    validation: "Validation",
  };
  return labels[area] ?? area.replaceAll("-", " ");
}

function createEquationTitle(heading, ordinal, countInHeading) {
  return countInHeading > 1 ? `${heading} — Equation ${ordinal}` : heading;
}

function assignSemanticIds(blocks) {
  const duplicateCounts = new Map();
  const usedIds = new Set();
  for (const block of blocks) {
    const duplicateKey = `${block.sourcePath}\0${block.normalizedFormula}`;
    const duplicateIndex = duplicateCounts.get(duplicateKey) ?? 0;
    duplicateCounts.set(duplicateKey, duplicateIndex + 1);
    block.semanticId = block.existingLink?.semanticId ?? createDerivedSemanticId(
      block.sourcePath,
      block.normalizedFormula,
      duplicateIndex
    );
    if (usedIds.has(block.semanticId)) {
      throw new Error(`Duplicate corpus equation semantic ID "${block.semanticId}".`);
    }
    usedIds.add(block.semanticId);
  }
}

function equationLinkForBlock(block) {
  const sourceDirectory = path.posix.dirname(block.sourcePath);
  const relativePagePath = path.posix.relative(sourceDirectory, EQUATION_MAPPING_PAGE_PATH);
  return `[${EQUATION_LINK_LABEL}](${relativePagePath}#${encodeURIComponent(block.semanticId)})`;
}

function addMissingLinks(source, blocks) {
  const modifications = [];
  for (const block of blocks) {
    if (block.existingLink) continue;
    const link = equationLinkForBlock(block);
    const lineEnd = source.indexOf("\n", block.closeEnd);
    const effectiveLineEnd = lineEnd < 0 ? source.length : lineEnd;
    const trailing = source.slice(block.closeEnd, effectiveLineEnd);
    if (!trailing.trim()) {
      modifications.push({ index: effectiveLineEnd, text: `\n\n${block.containerPrefix}${link}` });
    } else {
      modifications.push({ index: block.closeEnd, text: ` ${link}` });
    }
  }
  let result = source;
  modifications.sort((left, right) => right.index - left.index).forEach((modification) => {
    result = `${result.slice(0, modification.index)}${modification.text}${result.slice(modification.index)}`;
  });
  return { source: result, linksAdded: modifications.length };
}

export function createTextbookChapterIndex(tocRoot) {
  const chapters = new Map();
  function visit(node) {
    if (!node) return;
    if (node.markdownPath && !chapters.has(node.markdownPath)) {
      chapters.set(node.markdownPath, { sourceTitle: node.title, sourceOrder: chapters.size });
    }
    (node.children ?? []).forEach(visit);
  }
  visit(tocRoot);
  return chapters;
}

function createCorpusRecords(rootDir, files, promotedIds, sceneHrefBySource) {
  const tocPath = path.join(rootDir, "content/graph/textbook_toc.json");
  const chapters = createTextbookChapterIndex(
    fs.existsSync(tocPath) ? JSON.parse(fs.readFileSync(tocPath, "utf8")).tocRoot : null
  );
  const records = [];
  for (const sourcePath of files) {
    const absolutePath = path.join(rootDir, sourcePath);
    const source = fs.readFileSync(absolutePath, "utf8");
    const lines = source.split(/\r?\n/u);
    const chapter = chapters.get(sourcePath);
    const sourceTitle = chapter?.sourceTitle || cleanHeading(lines.find(line => /^#\s+/u.test(line))) || path.basename(sourcePath, ".md").replaceAll("-", " ");
    const blocks = parseCorpusDisplayEquations(sourcePath, source);
    assignSemanticIds(blocks);
    const countsByHeading = new Map();
    for (const block of blocks) countsByHeading.set(block.heading, (countsByHeading.get(block.heading) ?? 0) + 1);
    const ordinalsByHeading = new Map();
    for (const block of blocks) {
      const ordinal = (ordinalsByHeading.get(block.heading) ?? 0) + 1;
      ordinalsByHeading.set(block.heading, ordinal);
      const context = sourceContextForBlock(lines, block, blocks);
      const symbols = extractEquationSymbols(block.tex).map((symbolTex, index) => {
        const resolved = createSymbolDefinition(symbolTex, context.contextLines, block.heading);
        return {
          id: `symbol-${index + 1}`,
          tex: symbolTex,
          definition: resolved.definition,
          scope: block.heading,
          definitionSource: resolved.source,
        };
      });
      records.push({
        schema: CORPUS_EQUATION_REGISTRY_SCHEMA,
        id: block.semanticId,
        semanticId: block.semanticId,
        promoted: promotedIds.has(block.semanticId),
        title: createEquationTitle(block.heading, ordinal, countsByHeading.get(block.heading)),
        subject: subjectForPath(sourcePath),
        formulaTeX: block.tex,
        source: {
          status: "linked",
          sourcePath,
          sourceTitle,
          sourceOrder: chapter?.sourceOrder ?? null,
          sourceHeading: block.heading,
          startLine: block.startLine,
          endLine: block.endLine,
          sourceHref: sceneHrefBySource.get(sourcePath) ?? sourcePath,
          contextBefore: context.before,
          contextAfter: context.after,
        },
        symbols,
        searchText: [block.heading, context.before, context.after, sourcePath].filter(Boolean).join(" "),
      });
    }
  }
  return records;
}

function validateRecords(records, promotedIds) {
  const errors = [];
  const ids = new Set();
  for (const record of records) {
    if (ids.has(record.semanticId)) errors.push(`duplicate semantic ID: ${record.semanticId}`);
    ids.add(record.semanticId);
    if (!record.formulaTeX.trim()) errors.push(`${record.semanticId}: missing formula TeX`);
    if (!record.source?.sourcePath || !record.source?.sourceHeading) errors.push(`${record.semanticId}: missing source context`);
    for (const symbol of record.symbols) {
      if (!symbol.tex || !symbol.definition || !symbol.scope) {
        errors.push(`${record.semanticId}: incomplete symbol record ${symbol.id}`);
      }
    }
  }
  for (const promotedId of promotedIds) {
    if (!ids.has(promotedId)) errors.push(`promoted equation missing from corpus inventory: ${promotedId}`);
  }
  return errors;
}

function registryPayload(records) {
  const promotedCount = records.filter((record) => record.promoted).length;
  const symbolCount = records.reduce((sum, record) => sum + record.symbols.length, 0);
  return {
    schema: CORPUS_EQUATION_REGISTRY_SCHEMA,
    generatedFrom: CORPUS_ROOT,
    equationCount: records.length,
    promotedCount,
    symbolDefinitionCount: symbolCount,
    records,
  };
}

function readGeneratedRegistry(rootDir) {
  const generatedPath = path.join(rootDir, GENERATED_REGISTRY_PATH);
  return fs.existsSync(generatedPath) ? fs.readFileSync(generatedPath, "utf8") : "";
}

export function buildEquationMappingCorpus({ rootDir = process.cwd(), mode = "check" } = {}) {
  const corpusDirectory = path.join(rootDir, CORPUS_ROOT);
  const files = listMarkdownFiles(corpusDirectory).map((file) => normalizePath(path.relative(rootDir, file))).sort();
  const promotedPages = createEquationMappingRegistryApi().list();
  const promotedIds = new Set(promotedPages.map((page) => page.semanticId));
  let linksAdded = 0;

  if (mode === "write") {
    for (const sourcePath of files) {
      const absolutePath = path.join(rootDir, sourcePath);
      const source = fs.readFileSync(absolutePath, "utf8");
      const blocks = parseCorpusDisplayEquations(sourcePath, source);
      assignSemanticIds(blocks);
      const updated = addMissingLinks(source, blocks);
      if (updated.source !== source) fs.writeFileSync(absolutePath, updated.source);
      linksAdded += updated.linksAdded;
    }
  }

  const sceneHrefBySource = createSceneHrefMap(rootDir);
  const records = createCorpusRecords(rootDir, files, promotedIds, sceneHrefBySource);
  const errors = validateRecords(records, promotedIds);
  for (const record of records) {
    if (!record.source.status || !record.semanticId) continue;
    const source = fs.readFileSync(path.join(rootDir, record.source.sourcePath), "utf8");
    const expectedLink = `[${EQUATION_LINK_LABEL}](${path.posix.relative(path.posix.dirname(record.source.sourcePath), EQUATION_MAPPING_PAGE_PATH)}#${encodeURIComponent(record.semanticId)})`;
    if (!source.includes(expectedLink)) errors.push(`${record.semanticId}: missing canonical source link`);
  }
  const payload = registryPayload(records);
  const serialized = `${JSON.stringify(payload, null, 2)}\n`;
  const generatedPath = path.join(rootDir, GENERATED_REGISTRY_PATH);
  if (mode === "write" && errors.length === 0) {
    fs.mkdirSync(path.dirname(generatedPath), { recursive: true });
    fs.writeFileSync(generatedPath, serialized);
  } else if (mode === "check" && readGeneratedRegistry(rootDir) !== serialized) {
    errors.push(`generated registry is stale: ${GENERATED_REGISTRY_PATH}`);
  }
  return Object.freeze({
    schema: CORPUS_EQUATION_REGISTRY_SCHEMA,
    files: files.length,
    equations: records.length,
    promoted: payload.promotedCount,
    symbolDefinitions: payload.symbolDefinitionCount,
    linksAdded,
    errors: Object.freeze(errors),
  });
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) {
  const mode = process.argv.includes("--write") ? "write" : "check";
  const result = buildEquationMappingCorpus({ mode });
  console.log(`build-equation-mapping-corpus mode: ${mode}`);
  console.log(`- Markdown files: ${result.files}`);
  console.log(`- Display equations: ${result.equations}`);
  console.log(`- Promoted equations: ${result.promoted}`);
  console.log(`- Symbol definitions: ${result.symbolDefinitions}`);
  if (mode === "write") console.log(`- Links added: ${result.linksAdded}`);
  if (result.errors.length) {
    result.errors.slice(0, 100).forEach((error) => console.error(`- ${error}`));
    if (result.errors.length > 100) console.error(`- ... ${result.errors.length - 100} more error(s)`);
    process.exitCode = 1;
  } else {
    console.log("summary: 0 error(s)");
  }
}
