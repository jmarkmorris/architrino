import fs from "node:fs";
import path from "node:path";

const targetPath = path.resolve(process.cwd(), "src/apps/architrino/ArchitrinoSceneAppRuntime.js");
const source = fs.readFileSync(targetPath, "utf8");
const lines = source.split("\n");

function getLineNumber(offset) {
  let line = 1;
  for (let index = 0; index < offset; index += 1) {
    if (source[index] === "\n") {
      line += 1;
    }
  }
  return line;
}

function addDeclaredNames(map, names, line, kind) {
  names
    .map((name) => String(name ?? "").trim())
    .filter(Boolean)
    .forEach((name) => {
      const previous = map.get(name);
      if (
        previous == null ||
        line < previous.line ||
        (previous.kind === "lexical" && (kind === "import" || kind === "function"))
      ) {
        map.set(name, { line, kind });
      }
    });
}

function parseImportNames(clause) {
  const names = [];
  const trimmed = String(clause ?? "").trim();
  if (!trimmed) {
    return names;
  }
  const namespaceMatch = trimmed.match(/^\*\s+as\s+([A-Za-z_$][\w$]*)$/);
  if (namespaceMatch) {
    names.push(namespaceMatch[1]);
    return names;
  }
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    const body = trimmed.slice(1, -1);
    body
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => {
        const aliasMatch = part.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
        names.push(aliasMatch ? aliasMatch[2] : part);
      });
    return names;
  }
  if (trimmed.includes("{")) {
    const [defaultPart, namedPart] = trimmed.split("{");
    if (defaultPart.trim()) {
      names.push(defaultPart.replace(/,$/, "").trim());
    }
    names.push(...parseImportNames(`{${namedPart}`));
    return names;
  }
  names.push(trimmed);
  return names;
}

function parseObjectBindingNames(bindingSource) {
  const names = [];
  bindingSource
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const cleaned = part.replace(/\s*=.*$/, "").trim();
      if (!cleaned || cleaned.startsWith("...")) {
        return;
      }
      const aliasMatch = cleaned.match(/^([A-Za-z_$][\w$]*)\s*:\s*([A-Za-z_$][\w$]*)$/);
      names.push(aliasMatch ? aliasMatch[2] : cleaned);
    });
  return names;
}

const globalNames = new Set([
  "document",
  "window",
  "globalThis",
  "console",
  "performance",
  "localStorage",
  "location",
]);

const declarations = new Map();

const importRegex = /^import\s+([\s\S]*?)\s+from\s+["'][^"']+["'];/gm;
for (const match of source.matchAll(importRegex)) {
  addDeclaredNames(declarations, parseImportNames(match[1]), getLineNumber(match.index), "import");
}

const functionRegex = /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
for (const match of source.matchAll(functionRegex)) {
  addDeclaredNames(declarations, [match[1]], getLineNumber(match.index), "function");
}

const simpleConstRegex = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm;
for (const match of source.matchAll(simpleConstRegex)) {
  addDeclaredNames(declarations, [match[1]], getLineNumber(match.index), "lexical");
}

const objectBindingRegex = /\b(?:const|let|var)\s+\{([\s\S]*?)\}\s*=/gm;
for (const match of source.matchAll(objectBindingRegex)) {
  addDeclaredNames(
    declarations,
    parseObjectBindingNames(match[1]),
    getLineNumber(match.index),
    "lexical"
  );
}

const runtimeStartRegex = /createPdgview[A-Za-z0-9]+Runtime\(\{/g;
const issues = [];

for (const match of source.matchAll(runtimeStartRegex)) {
  const startOffset = match.index + match[0].length - 1;
  let depth = 1;
  let endOffset = startOffset;
  for (let index = startOffset + 1; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        endOffset = index;
        break;
      }
    }
  }
  const block = source.slice(startOffset + 1, endOffset);
  const blockStartLine = getLineNumber(startOffset);
  const blockLines = block.split("\n");
  blockLines.forEach((lineText, index) => {
    const lineNumber = blockStartLine + index;
    const trimmed = lineText.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed === "{" || trimmed === "}") {
      return;
    }
    const shorthandMatch = trimmed.match(/^([A-Za-z_$][\w$]*)\s*,?$/);
    const keyedMatch = trimmed.match(/^([A-Za-z_$][\w$]*)\s*:\s*([A-Za-z_$][\w$]*)\s*,?$/);
    const arrowWrapperMatch = trimmed.match(
      /^([A-Za-z_$][\w$]*)\s*:\s*\([^)]*\)\s*=>\s*([A-Za-z_$][\w$]*)\(.*\)\s*,?$/
    );
    const referencedName = shorthandMatch
      ? shorthandMatch[1]
      : keyedMatch
        ? keyedMatch[2]
        : arrowWrapperMatch
          ? arrowWrapperMatch[2]
          : null;
    if (!referencedName) {
      return;
    }
    if (globalNames.has(referencedName)) {
      return;
    }
    const declaration = declarations.get(referencedName);
    const isAvailable =
      declaration &&
      (declaration.kind === "import" ||
        declaration.kind === "function" ||
        declaration.line < lineNumber);
    if (arrowWrapperMatch) {
      const wrapperDeclaration = declarations.get(referencedName);
      const wrapperAvailable = !!wrapperDeclaration;
      if (!wrapperAvailable) {
        issues.push({
          line: lineNumber,
          name: referencedName,
          source: trimmed,
        });
        return;
      }
      if (arrowWrapperMatch[1] === arrowWrapperMatch[2]) {
        issues.push({
          line: lineNumber,
          name: referencedName,
          source: trimmed,
        });
      }
      return;
    }
    if (!isAvailable) {
      issues.push({
        line: lineNumber,
        name: referencedName,
        source: trimmed,
      });
    }
  });
}

if (issues.length) {
  console.error("pdgview runtime wiring check failed:");
  issues.forEach((issue) => {
    console.error(
      `- src/apps/architrino/ArchitrinoSceneAppRuntime.js:${issue.line} uses '${issue.name}' before declaration or without import: ${issue.source}`
    );
  });
  process.exit(1);
}

console.log("pdgview runtime wiring check passed.");
