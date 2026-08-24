import path from "node:path";

export const ARCHITRINO_WEB_BASE_URL = "https://architrino.com";

export function toArchitrinoWebUrl(rawTarget, resolvedPath) {
  const trimmed = String(rawTarget || "").trim();
  const anchorMatch = trimmed.split("#", 2);
  const anchor = anchorMatch.length > 1 ? `#${anchorMatch[1]}` : "";
  const targetPath = String(resolvedPath || "").trim();
  const targetBasename = path.basename(targetPath, path.extname(targetPath));
  const slug = targetBasename ? targetBasename.toLowerCase() : "";
  if (!slug) {
    return null;
  }
  if (slug === "ideal-braid") {
    return `${ARCHITRINO_WEB_BASE_URL}/ideal-braid${anchor}`;
  }
  if (slug === "equation-mapping") {
    return `${ARCHITRINO_WEB_BASE_URL}/equation-mapping.html${anchor}`;
  }
  return `${ARCHITRINO_WEB_BASE_URL}/${slug}${anchor}`;
}
