// Frozen records retain their logical identifiers and original byte bindings.
// This map changes physical lookup and document navigation only.
import locations from "./research-source-locations.json" with { type: "json" };

const RELOCATIONS = locations.directoryMoves;
const ANALYSIS_RELOCATIONS = new Map(Object.entries(locations.fileMoves));
const FROZEN_ORIGINS = locations.frozenOrigins;
const SECTION_RELOCATIONS = locations.sectionMoves;

export function researchSourceLocation(logicalPath) {
  if (ANALYSIS_RELOCATIONS.has(logicalPath)) return ANALYSIS_RELOCATIONS.get(logicalPath);
  for (const [original, current] of RELOCATIONS) {
    if (logicalPath.startsWith(original)) return current + logicalPath.slice(original.length);
  }
  return logicalPath;
}

export function frozenResearchSourceOrigin(currentPath) {
  return FROZEN_ORIGINS.find((source) => researchSourceLocation(source) === currentPath) ?? currentPath;
}

export function resolveResearchDocumentLink(documentPath, href) {
  if (!href || /^[a-z][\w+.-]*:/iu.test(href) || href.startsWith('/')) return null;
  const [rawPath, fragment = ''] = href.split('#');
  const origin = frozenResearchSourceOrigin(documentPath);
  const segments = rawPath ? origin.split('/').slice(0, -1) : origin.split('/');
  if (rawPath) for (const part of decodeURI(rawPath).split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') segments.pop();
    else segments.push(part);
  }
  const logicalPath = segments.join('/');
  const section = SECTION_RELOCATIONS.find(([source, anchor]) => source === logicalPath && anchor === fragment);
  return section ? { path: section[2], fragment: section[3] } : { path: researchSourceLocation(logicalPath), fragment };
}
