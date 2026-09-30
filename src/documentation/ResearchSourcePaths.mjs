import path from "node:path";
import { researchSourceLocation } from "./ResearchSourceLocations.mjs";

// Filesystem adapter for sealed source records; no snapshot or hash fallback.
export function resolveResearchSourcePath(repositoryRoot, logicalPath) {
  const root = path.resolve(repositoryRoot);
  const absolute = path.resolve(root, logicalPath);
  return path.resolve(root, researchSourceLocation(path.relative(root, absolute)));
}
