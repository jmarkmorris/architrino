// Local-only operator navigation surface for the repository's markdown.
//
// Despite the module name, this indexes every surface root declared by
// scripts/build-reference-surface.mjs — currently reference/ and
// content/markdown/aaa/ — presented under a synthetic repository node. The
// "reference" naming is historical and deliberately retained; see the comment in
// reference.html.
//
// This runtime is a development aid. reference.html and this directory are listed
// in the static-site builder's internal developer harness paths, so this surface
// cannot reach a Pages deployment. It reads the generated manifest at
// content/generated/reference/reference-surface.v1.json and fetches markdown
// directly from the working tree served by the local dev server.

import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";

const MANIFEST_PATH = "./content/generated/reference/reference-surface.v1.json";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

function formatCount(value) {
  return Number(value ?? 0).toLocaleString("en-US");
}

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

// markdown-it does not know about math, so math spans are lifted out before
// rendering and restored afterwards. Fenced and inline code are protected first
// so a dollar sign inside a code sample is never treated as a delimiter.
export function renderMarkdownWithMath(
  source,
  markdownRenderer,
  katexRuntime = globalThis.katex,
) {
  const codeStore = [];
  const mathStore = [];
  const mathToken = (index) => `MATHSEGMENTTOKEN${index}X`;

  let working = source.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`/gu, (match) => {
    codeStore.push(match);
    return ` CODE${codeStore.length - 1} `;
  });
  working = working.replace(/\$\$([\s\S]+?)\$\$/gu, (_m, body) => {
    mathStore.push({ body, display: true });
    return `\n\n${mathToken(mathStore.length - 1)}\n\n`;
  });
  working = working.replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/gu, (_m, body) => {
    mathStore.push({ body, display: false });
    return mathToken(mathStore.length - 1);
  });
  working = working.replace(/ CODE(\d+) /gu, (_m, index) => codeStore[Number(index)]);

  let rendered = markdownRenderer.render(working);
  mathStore.forEach((entry, index) => {
    const token = mathToken(index);
    const fence = entry.display ? "$$" : "$";
    let mathHtml = `<code>${fence}${entry.body}${fence}</code>`;
    if (katexRuntime?.renderToString) {
      try {
        mathHtml = katexRuntime.renderToString(entry.body, {
          displayMode: entry.display,
          throwOnError: false,
          output: "html",
        });
      } catch {
        mathHtml = `<code>${entry.body}</code>`;
      }
    }
    if (entry.display) {
      const paragraphPattern = new RegExp(`<p>\\s*${token}\\s*</p>`, "gu");
      rendered = rendered.replace(paragraphPattern, mathHtml);
    }
    rendered = rendered.split(token).join(mathHtml);
  });
  return rendered;
}

export function createReferenceSurfaceRuntime({
  mount,
  navigationHost = null,
  documentLike = globalThis.document,
  windowLike = globalThis,
}) {
  if (!mount) throw new Error("reference surface requires a mount element");

  // Shared top-right app chrome: back, forward, home, table of contents, and
  // global scene search, identical to every other standalone app.
  let navigationRuntime = null;
  if (navigationHost) {
    try {
      navigationRuntime = createStandaloneAppNavigationRuntime({
        host: navigationHost,
        document: documentLike,
        window: windowLike,
        label: "Reference navigation",
      }).init();
    } catch (error) {
      navigationRuntime = null;
      globalThis.console?.warn?.(`reference surface: shared navigation unavailable (${error.message})`);
    }
  }

  const markdownRenderer = globalThis.markdownit
    ? globalThis.markdownit({ html: false, linkify: true, breaks: false })
    : null;

  let manifest = null;
  let dirIndex = new Map();
  let fileIndex = new Map();
  let searchTerm = "";

  const header = el("header", "reference-header");
  const brand = el("div", "reference-brand");
  const homeButton = el("button", "reference-home", "Repository");
  homeButton.type = "button";
  homeButton.addEventListener("click", () => setRoute("#/"));
  const totals = el("span", "reference-totals");
  brand.append(homeButton, totals);

  const search = el("input", "reference-search");
  search.type = "search";
  search.placeholder = "Filter by title or path";
  search.setAttribute("aria-label", "Filter reference documents");
  search.addEventListener("input", () => {
    searchTerm = search.value.trim().toLowerCase();
    render();
  });
  header.append(brand, search);

  const crumbs = el("nav", "reference-crumbs");
  const view = el("main", "reference-view");
  mount.append(header, crumbs, view);

  function setRoute(hash) {
    if (windowLike.location.hash === hash) render();
    else windowLike.location.hash = hash;
  }

  function currentRoute() {
    const raw = decodeURIComponent(windowLike.location.hash || "#/");
    if (raw.startsWith("#/doc/")) return { kind: "doc", path: raw.slice("#/doc/".length) };
    if (raw.startsWith("#/dir/")) return { kind: "dir", path: raw.slice("#/dir/".length) };
    // Home is the synthetic repository node, whose path is the empty string.
    // Its children are the surface roots.
    return { kind: "dir", path: manifest?.tree?.path ?? "" };
  }

  function indexTree(node) {
    dirIndex.set(node.path, node);
    for (const file of node.files) fileIndex.set(file.path, file);
    for (const dir of node.dirs) indexTree(dir);
  }

  function matchesFile(file) {
    if (!searchTerm) return true;
    return file.title.toLowerCase().includes(searchTerm) || file.path.toLowerCase().includes(searchTerm);
  }

  // A directory survives the filter when it or anything beneath it matches, so
  // filtering never hides the route to a matching document.
  function matchesDir(node) {
    if (!searchTerm) return true;
    if (node.path.toLowerCase().includes(searchTerm) || node.name.toLowerCase().includes(searchTerm)) return true;
    return node.files.some(matchesFile) || node.dirs.some(matchesDir);
  }

  function crumbTrail(dirPath) {
    const parts = dirPath.split("/");
    const trail = [];
    for (let index = 0; index < parts.length; index += 1) {
      const partial = parts.slice(0, index + 1).join("/");
      // Segments with no indexed node are skipped, so a surface root such as
      // content/markdown/aaa contributes one crumb carrying its display label
      // rather than three carrying raw path segments.
      if (!dirIndex.has(partial)) continue;
      trail.push({ label: dirIndex.get(partial)?.name ?? parts[index], hash: `#/dir/${encodeURIComponent(partial)}` });
    }
    return trail;
  }

  function renderCrumbs(parts) {
    crumbs.replaceChildren();
    parts.forEach((part, index) => {
      if (index) crumbs.append(el("span", "reference-crumb-sep", "/"));
      if (part.hash && index < parts.length - 1) {
        const link = el("button", "reference-crumb-link", part.label);
        link.type = "button";
        link.addEventListener("click", () => setRoute(part.hash));
        crumbs.append(link);
      } else {
        crumbs.append(el("span", "reference-crumb", part.label));
      }
    });
  }

  function dirCard(node) {
    const card = el("button", "reference-card reference-card-dir");
    card.type = "button";
    card.addEventListener("click", () => setRoute(`#/dir/${encodeURIComponent(node.path)}`));
    card.append(el("h2", "reference-card-title", node.name));
    card.append(el("p", "reference-card-path", node.path));
    const meta = el("div", "reference-card-meta");
    meta.append(el("span", null, `${formatCount(node.fileCount)} files`));
    meta.append(el("span", null, `${formatCount(node.words)} words`));
    if (node.dirs.length) meta.append(el("span", null, `${node.dirs.length} folders`));
    card.append(meta);
    return card;
  }

  function fileCard(file) {
    const card = el("button", "reference-card reference-card-file");
    card.type = "button";
    card.addEventListener("click", () => setRoute(`#/doc/${encodeURIComponent(file.path)}`));
    card.append(el("h3", "reference-card-title", file.title));
    card.append(el("p", "reference-card-path", file.name));
    const meta = el("div", "reference-card-meta");
    meta.append(el("span", null, `${formatCount(file.words)} words`));
    const modified = formatDate(file.modified);
    if (modified) meta.append(el("span", null, modified));
    card.append(meta);
    return card;
  }

  function renderDir(dirPath) {
    const node = dirIndex.get(dirPath) ?? manifest.tree;
    renderCrumbs(crumbTrail(node.path));

    const container = el("div", "reference-dir");
    const dirs = node.dirs.filter(matchesDir);
    const files = node.files.filter(matchesFile);

    if (dirs.length) {
      container.append(el("h2", "reference-group-title", "Folders"));
      const grid = el("div", "reference-grid");
      for (const child of dirs) grid.append(dirCard(child));
      container.append(grid);
    }
    if (files.length) {
      container.append(el("h2", "reference-group-title", "Documents"));
      const grid = el("div", "reference-grid reference-grid-files");
      for (const file of files) grid.append(fileCard(file));
      container.append(grid);
    }
    if (!dirs.length && !files.length) {
      container.append(el("p", "reference-empty", "Nothing here matches that filter."));
    }
    view.replaceChildren(container);
  }

  function rewriteInternalLinks(container, documentPath) {
    const baseSegments = documentPath.split("/").slice(0, -1);
    for (const anchor of container.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href");
      if (!href || /^[a-z]+:/iu.test(href) || href.startsWith("#")) continue;
      const [rawPath, fragment] = href.split("#");
      if (!rawPath.endsWith(".md")) continue;
      const segments = [...baseSegments];
      for (const part of rawPath.split("/")) {
        if (part === "." || part === "") continue;
        if (part === "..") segments.pop();
        else segments.push(part);
      }
      const resolved = segments.join("/");
      if (fileIndex.has(resolved)) {
        anchor.setAttribute("href", `#/doc/${encodeURIComponent(resolved)}`);
        anchor.classList.add("reference-internal-link");
      } else {
        anchor.classList.add("reference-external-link");
        anchor.title = `Outside the reference surface: ${resolved}${fragment ? `#${fragment}` : ""}`;
      }
    }
  }

  async function renderDoc(documentPath) {
    const entry = fileIndex.get(documentPath);
    const parent = documentPath.split("/").slice(0, -1).join("/");
    renderCrumbs([...crumbTrail(parent), { label: entry?.title ?? documentPath }]);

    view.replaceChildren(el("p", "reference-empty", "Loading…"));
    let source = "";
    try {
      const response = await fetch(`./${documentPath}`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      source = await response.text();
    } catch (error) {
      view.replaceChildren(el("p", "reference-empty", `Could not load ${documentPath}: ${error.message}`));
      return;
    }

    const article = el("article", "reference-doc");
    const body = el("div", "reference-doc-body markdown-body");
    body.innerHTML = markdownRenderer
      ? renderMarkdownWithMath(source, markdownRenderer)
      : `<pre>${source.replace(/[&<>]/gu, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])}</pre>`;
    rewriteInternalLinks(body, documentPath);
    article.append(el("p", "reference-doc-path", documentPath), body);
    view.replaceChildren(article);

    if (globalThis.mermaid?.run) {
      const blocks = body.querySelectorAll("pre > code.language-mermaid");
      for (const block of blocks) {
        const holder = el("div", "mermaid");
        holder.textContent = block.textContent;
        block.parentElement.replaceWith(holder);
      }
      if (blocks.length) {
        try {
          await globalThis.mermaid.run({ nodes: body.querySelectorAll(".mermaid") });
        } catch {
          /* a diagram that fails to render leaves its source visible */
        }
      }
    }
    view.scrollTop = 0;
  }

  function render() {
    if (!manifest) return;
    const route = currentRoute();
    if (route.kind === "doc") void renderDoc(route.path);
    else renderDir(route.path);
  }

  async function start() {
    try {
      const response = await fetch(MANIFEST_PATH, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      manifest = await response.json();
    } catch (error) {
      mount.replaceChildren(
        el("p", "reference-empty", `Manifest unavailable. Run: node scripts/build-reference-surface.mjs --write (${error.message})`)
      );
      return;
    }
    dirIndex = new Map();
    fileIndex = new Map();
    indexTree(manifest.tree);
    totals.textContent = `${formatCount(manifest.totals.directories)} folders · ${formatCount(manifest.totals.files)} files · ${formatCount(manifest.totals.words)} words · depth ${manifest.maxDepth}`;
    windowLike.addEventListener("hashchange", render);
    render();
  }

  return { start, render, navigationRuntime };
}
