import fs from "node:fs";
import path from "node:path";

export const IMAGE_LIBRARY = "content/assets/images/";
export const IMAGE_CATALOG = `${IMAGE_LIBRARY}images.json`;
export const isLibraryImage = (name) => name.startsWith(IMAGE_LIBRARY) && /\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp|tiff?)$/i.test(name);
const isText = (name) => /\.(?:html?|css|[cm]?js|json|webmanifest|md|svg)$/i.test(name);

// These are public application/content surfaces, not the repository's source
// inventories, production prompts, tests, or image catalog. Directory membership
// is deliberately conservative: even an unlinked corpus page retains its images.
export const isImageConsumerRoot = (name) => isText(name) && (
  (!name.includes("/") && !name.endsWith(".md")) ||
  /^(?:src\/|content\/(?:markdown|scenes|graph)\/|content\/generated\/markdown\/)/.test(name)
);
// Match the additional Markdown namespace accepted by MarkdownRuntime, and
// allow public data dependencies. Authoring scripts and production documentation
// mentioned by contributor guides are not web-app consumers.
const isFollowedConsumer = (name) => isImageConsumerRoot(name) ||
  (name.startsWith("reference/priorities/") && name.endsWith(".md")) ||
  (name.startsWith("content/assets/") && !name.startsWith(IMAGE_LIBRARY) && isText(name));

function referenceTokens(text, name) {
  const tokens = new Set();
  const add = (value) => {
    if (typeof value !== "string") return;
    tokens.add(value);
    // Also find paths within srcset, Markdown destinations, and prose. False
    // positives retain an extra file; catalog/production metadata is not a root.
    for (const match of value.matchAll(/[^\s"'`<>\[\]{},;=]+/g)) {
      tokens.add(match[0].replace(/^\(+|[).;]+$/g, ""));
    }
  };
  if (name.endsWith(".md")) {
    // Contributor prose mentions many repository paths without linking them.
    // Those mentions (and code examples) are not rendered image consumers.
    const body = text.replace(/```[^\n]*\n[\s\S]*?```|~~~[^\n]*\n[\s\S]*?~~~/g, "").replace(/`[^`\n]*`/g, "");
    for (const match of body.matchAll(/!?\[[^\]]*\]\(\s*(?:<([^>]+)>|((?:[^\s()]|\([^()]*\))+))/g)) add(match[1] ?? match[2]);
    for (const match of body.matchAll(/^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm)) add(match[1] ?? match[2]);
    for (const match of body.matchAll(/\b(?:src|srcset|href|poster)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) add(match[1] ?? match[2]);
  } else if (name.endsWith(".svg")) {
    // SVG editors retain original filenames in metadata; those are not fetched.
    for (const match of text.matchAll(/(?:\bxlink:href|\bhref)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) add(match[1] ?? match[2]);
    for (const match of text.matchAll(/url\(\s*([^)]*)\)/gi)) add(match[1].replace(/^["']|["']$/g, ""));
  } else if (/\.(?:json|webmanifest)$/i.test(name)) {
    const walk = (value) => {
      if (typeof value === "string") add(value);
      else if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") Object.values(value).forEach(walk);
    };
    walk(JSON.parse(text));
  } else {
    add(text);
    for (const match of text.matchAll(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|[^`\\])*)`/g)) {
      let value = match[1] ?? match[2] ?? match[3];
      if (match[1] !== undefined) {
        try { value = JSON.parse(match[0]); } catch { /* HTML is not a JSON string. */ }
      }
      add(value.replace(/\\([/ '()])/g, "$1"));
    }
    for (const match of text.matchAll(/url\(\s*([^)]*)\)/gi)) add(match[1].replace(/^["']|["']$/g, ""));
    // Also recognize angle-delimited URL literals.
    for (const match of text.matchAll(/<([^<>]+)>/g)) add(match[1]);
  }
  return tokens;
}

function localPaths(value, source, hosts) {
  let raw = value.trim().replace(/&amp;/g, "&");
  if (!raw || /[\r\n]/.test(raw)) return [];
  raw = raw.replace(/^runtime:markdown:(?:doc:|reader:)?/, "").split("::")[0];
  if (/^(?:https?:)?\/\//i.test(raw)) {
    let url;
    try { url = new URL(raw, "https://pages.invalid/"); } catch { return []; }
    if (!hosts.has(url.hostname)) return [];
    raw = url.pathname;
  } else if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(raw)) return [];
  raw = raw.split(/[?#]/)[0];
  try { raw = decodeURIComponent(raw); } catch { return []; }
  if (!raw || raw.includes("\0") || raw.includes("\\")) return [];
  const rootRelative = raw.replace(/^\.?\//, "");
  // Runtime/scene URLs are relative to the web root; Markdown, CSS, module
  // imports, and SVG dependencies may be relative to their source file.
  return [...new Set([
    path.posix.normalize(rootRelative),
    path.posix.normalize(path.posix.join(path.posix.dirname(source), raw)),
  ])].filter((candidate) => !candidate.startsWith("../") && !candidate.startsWith("/"));
}

export function selectPagesImages({ rootDir, paths }) {
  const available = new Set(paths);
  const images = paths.filter(isLibraryImage).sort();
  const hosts = new Set(["architrino.com", "www.architrino.com"]);
  if (available.has("CNAME")) hosts.add(fs.readFileSync(path.join(rootDir, "CNAME"), "utf8").trim());
  const queue = paths.filter(isImageConsumerRoot);
  const visited = new Set();
  const retained = new Set();
  const references = new Map();
  const retain = (name, source) => {
    retained.add(name);
    if (!references.has(name)) references.set(name, new Set());
    references.get(name).add(source);
    if (name.endsWith(".svg")) queue.push(name);
  };
  for (let i = 0; i < queue.length; i++) {
    const source = queue[i];
    if (visited.has(source)) continue;
    visited.add(source);
    const executable = /\.(?:[cm]?js|json|webmanifest)$/i.test(source);
    for (const token of referenceTokens(fs.readFileSync(path.join(rootDir, source), "utf8"), source)) {
      for (const target of localPaths(token, source, hosts)) {
        // Attribution links to the catalog must not select the entire library.
        // A future runtime catalog-driven gallery needs an explicit policy.
        if (target === IMAGE_CATALOG) {
          if (executable) throw new Error(`Pages image catalog runtime consumer needs explicit image paths: ${source}`);
          continue;
        }
        if (isLibraryImage(target) && !target.includes("${")) {
          if (!available.has(target)) throw new Error(`Pages image reference is missing from payload: ${source} -> ${target}`);
          retain(target, source);
        } else if (executable && target.startsWith(IMAGE_LIBRARY) && (target.endsWith("/") || target.includes("${"))) {
          // Literal directory prefixes and templates retain every possible
          // matching image, rather than silently dropping dynamically chosen art.
          const prefix = target.split("${")[0];
          for (const name of images) if (name.startsWith(prefix)) retain(name, source);
        } else if (available.has(target) && isFollowedConsumer(target)) {
          queue.push(target);
        }
      }
    }
  }
  return {
    retainedPaths: images.filter((name) => retained.has(name)),
    excludedPaths: images.filter((name) => !retained.has(name)),
    references,
  };
}

export function deploymentImageCatalog(rootDir, retainedPaths) {
  const catalog = JSON.parse(fs.readFileSync(path.join(rootDir, IMAGE_CATALOG), "utf8"));
  const retained = new Set(retainedPaths);
  // Only the output copy is filtered. Preserve each retained entry verbatim,
  // including provenance, license, and attribution; never edit the source index.
  return `${JSON.stringify({ ...catalog, images: catalog.images.filter((entry) => retained.has(entry.path)) }, null, 2)}\n`;
}
