#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  EQUATION_MAPPING_PAGE_PATH,
  createEquationMappingRegistryApi,
} from "../src/apps/equation-mapping/EquationMappingRegistry.js";
import { EQUATION_LINK_LABEL } from "./build-equation-mapping-corpus.mjs";

function countOccurrences(text, target) {
  let count = 0;
  let cursor = 0;
  while (target && (cursor = text.indexOf(target, cursor)) >= 0) {
    count += 1;
    cursor += target.length;
  }
  return count;
}

export function createEquationMappingSourceHref(sourcePath, semanticId) {
  const relativePagePath = path.posix.relative(path.posix.dirname(sourcePath), EQUATION_MAPPING_PAGE_PATH);
  return `${relativePagePath}#${encodeURIComponent(semanticId)}`;
}

export function validateEquationMappingLinks({ rootDir = process.cwd() } = {}) {
  const api = createEquationMappingRegistryApi();
  const pages = api.list();
  const errors = [];

  pages.forEach((page) => {
    const source = page.source;
    if (source.status !== "linked") {
      errors.push(`${page.id}: unsupported source binding status "${source.status}".`);
      return;
    }
    const absoluteSourcePath = path.join(rootDir, source.sourcePath);
    if (!fs.existsSync(absoluteSourcePath)) {
      errors.push(`${page.id}: source file does not exist: ${source.sourcePath}`);
      return;
    }
    const sourceText = fs.readFileSync(absoluteSourcePath, "utf8");
    const sourceHref = createEquationMappingSourceHref(source.sourcePath, page.semanticId);
    const markdownLink = `[${EQUATION_LINK_LABEL}](${sourceHref})`;
    const occurrenceCount = countOccurrences(sourceText, markdownLink);
    if (occurrenceCount !== 1) {
      errors.push(`${page.id}: expected exactly one source link, found ${occurrenceCount}: ${markdownLink}`);
      return;
    }
    const linkIndex = sourceText.indexOf(markdownLink);
    if (!sourceText.slice(0, linkIndex).trimEnd().endsWith("$$")) {
      errors.push(`${page.id}: source link must immediately follow a display equation in ${source.sourcePath}.`);
    }
  });

  return Object.freeze({
    schema: api.schema,
    checkedPages: pages.length,
    errors: Object.freeze(errors),
  });
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun) {
  const result = validateEquationMappingLinks();
  if (result.errors.length) {
    result.errors.forEach((error) => console.error(`[equation-mapping-links] ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`[equation-mapping-links] passed: ${result.checkedPages} registered equation links resolve from canonical corpus sources`);
  }
}
