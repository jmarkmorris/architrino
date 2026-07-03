const DEFAULT_TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const RUNTIME_MARKDOWN_DOC_PREFIX = "runtime:markdown:doc:";

function defaultNormalizePath(path) {
  return String(path ?? "")
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

function cleanText(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function createPageEntry(node, index) {
  const markdownPath = cleanText(node?.markdownPath);
  if (!markdownPath) {
    return null;
  }
  const id = cleanText(node?.id);
  const scenePath = cleanText(node?.scenePath);
  const title = cleanText(node?.title) ?? id ?? markdownPath;
  return {
    index,
    id,
    title,
    kind: cleanText(node?.kind),
    markdownPath,
    scenePath,
    targetPath: scenePath ?? `${RUNTIME_MARKDOWN_DOC_PREFIX}${markdownPath}`,
  };
}

function resolveLookupEntry(sequence, source, normalizePath) {
  if (!sequence || !source || typeof source !== "object") {
    return null;
  }
  const sceneCandidates = [source.id, source.scenePath, source.childScene]
    .map((value) => cleanText(value))
    .filter(Boolean);
  for (const scenePath of sceneCandidates) {
    const key = normalizePath(scenePath);
    const entry = sequence.byScenePath.get(key) ?? sequence.byId.get(key);
    if (entry) {
      return entry;
    }
  }

  const markdownPath = cleanText(source.markdownPath);
  if (!markdownPath) {
    return null;
  }
  return sequence.byMarkdownPath.get(normalizePath(markdownPath)) ?? null;
}

function buildTextbookTocPageSequence(tocRoot, helpers = {}) {
  const normalizePath = helpers.normalizeMarkdownPath ?? defaultNormalizePath;
  const pages = [];
  const byMarkdownPath = new Map();
  const byScenePath = new Map();
  const byId = new Map();

  function addNodePage(node) {
    const entry = createPageEntry(node, pages.length);
    if (!entry) {
      return;
    }
    const markdownKey = normalizePath(entry.markdownPath);
    if (!markdownKey || byMarkdownPath.has(markdownKey)) {
      return;
    }
    pages.push(entry);
    byMarkdownPath.set(markdownKey, entry);
    if (entry.id) {
      byId.set(normalizePath(entry.id), entry);
    }
    if (entry.scenePath) {
      byScenePath.set(normalizePath(entry.scenePath), entry);
    }
  }

  function walk(node) {
    if (!node || typeof node !== "object") {
      return;
    }
    addNodePage(node);
    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  }

  if (Array.isArray(tocRoot?.children)) {
    tocRoot.children.forEach(walk);
  }

  return {
    pages,
    byMarkdownPath,
    byScenePath,
    byId,
  };
}

function resolveTextbookPageNavigation(sequence, source, helpers = {}) {
  const normalizePath = helpers.normalizeMarkdownPath ?? defaultNormalizePath;
  const current = resolveLookupEntry(sequence, source, normalizePath);
  if (!current) {
    return null;
  }
  return {
    current,
    previous: sequence.pages[current.index - 1] ?? null,
    next: sequence.pages[current.index + 1] ?? null,
    index: current.index,
    total: sequence.pages.length,
  };
}

export function createTextbookTocNavigationService(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust = typeof deps.appendCacheBust === "function" ? deps.appendCacheBust : (path) => path;
  const normalizeMarkdownPath = deps.normalizeMarkdownPath ?? defaultNormalizePath;
  const tocPath = deps.tocPath ?? DEFAULT_TEXTBOOK_TOC_PATH;
  const logger = deps.logger ?? console;
  let navigationPromise = null;

  async function loadNavigation() {
    if (!navigationPromise) {
      navigationPromise = Promise.resolve()
        .then(async () => {
          if (typeof fetchImpl !== "function") {
            return null;
          }
          const response = await fetchImpl(appendCacheBust(tocPath));
          if (!response?.ok) {
            throw new Error(`Failed to load textbook TOC ${tocPath}`);
          }
          const data = await response.json();
          return buildTextbookTocPageSequence(data?.tocRoot, {
            normalizeMarkdownPath,
          });
        })
        .catch((error) => {
          logger?.warn?.("Failed to resolve textbook page navigation", error);
          return null;
        });
    }
    return navigationPromise;
  }

  async function resolvePageNavigation(source) {
    const navigation = await loadNavigation();
    if (!navigation) {
      return null;
    }
    return resolveTextbookPageNavigation(navigation, source, {
      normalizeMarkdownPath,
    });
  }

  return {
    loadNavigation,
    resolvePageNavigation,
  };
}

export {
  buildTextbookTocPageSequence,
  resolveTextbookPageNavigation,
  RUNTIME_MARKDOWN_DOC_PREFIX,
};
