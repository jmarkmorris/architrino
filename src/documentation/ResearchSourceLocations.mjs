// Frozen records retain their logical identifiers and original byte bindings.
// This map changes physical lookup and document navigation only.
import locations from "./research-source-locations.json" with { type: "json" };

const RELOCATIONS = locations.directoryMoves;
const ANALYSIS_RELOCATIONS = new Map(Object.entries(locations.fileMoves));
const FROZEN_ORIGINS = locations.frozenOrigins;
const SECTION_RELOCATIONS = locations.sectionMoves;

function relocatedPath(logicalPath) {
  if (ANALYSIS_RELOCATIONS.has(logicalPath)) return ANALYSIS_RELOCATIONS.get(logicalPath);
  for (const [original, current] of RELOCATIONS) {
    if (logicalPath.startsWith(original)) return current + logicalPath.slice(original.length);
  }
  return logicalPath;
}

function resolveLocation(logicalPath, fragment) {
  let current = { path: logicalPath, fragment };
  const visited = new Set();
  // Each relocation may be followed by a later filing or section extraction.
  // The bound also rejects a malformed prefix rule that grows its own input.
  const limit = ANALYSIS_RELOCATIONS.size + RELOCATIONS.length + SECTION_RELOCATIONS.length + 1;
  for (let step = 0; step < limit; step += 1) {
    const key = JSON.stringify([current.path, current.fragment]);
    if (visited.has(key)) throw new Error(`Cyclic research source relocation: ${logicalPath}`);
    visited.add(key);
    const section = SECTION_RELOCATIONS.find(([source, anchor, destination, target]) =>
      source === current.path && anchor === current.fragment &&
      (destination !== source || target !== anchor));
    const next = section
      ? { path: section[2], fragment: section[3] }
      : { path: relocatedPath(current.path), fragment: current.fragment };
    if (next.path === current.path && next.fragment === current.fragment) return current;
    current = next;
  }
  throw new Error(`Nonterminating research source relocation: ${logicalPath}`);
}

export function researchSourceLocation(logicalPath) {
  const hash = logicalPath.indexOf('#');
  const location = resolveLocation(hash < 0 ? logicalPath : logicalPath.slice(0, hash),
    hash < 0 ? '' : logicalPath.slice(hash + 1));
  return location.path + (hash >= 0 || location.fragment ? `#${location.fragment}` : '');
}

export function frozenResearchSourceOrigin(currentPath) {
  const destination = researchSourceLocation(currentPath);
  return FROZEN_ORIGINS.find((source) => researchSourceLocation(source) === destination) ?? currentPath;
}

export function resolveResearchDocumentLink(documentPath, href) {
  if (!href || /^[a-z][\w+.-]*:/iu.test(href) || href.startsWith('/')) return null;
  const hash = href.indexOf('#');
  const rawPath = hash < 0 ? href : href.slice(0, hash);
  const fragment = hash < 0 ? '' : href.slice(hash + 1);
  const origin = frozenResearchSourceOrigin(documentPath);
  const segments = rawPath ? origin.split('/').slice(0, -1) : origin.split('/');
  if (rawPath) for (const part of decodeURI(rawPath).split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') segments.pop();
    else segments.push(part);
  }
  const logicalPath = segments.join('/');
  return resolveLocation(logicalPath, fragment);
}
