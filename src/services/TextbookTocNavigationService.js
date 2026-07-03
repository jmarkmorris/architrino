const DEFAULT_TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const RUNTIME_MARKDOWN_DOC_PREFIX = "runtime:markdown:doc:";
const RUNTIME_MARKDOWN_READER_PREFIX = "runtime:markdown:reader:";

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

function defaultNormalizeKey(text) {
  return String(text ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sectionLookupKey(markdownPath, sectionText, normalizePath, normalizeKey) {
  const path = normalizePath(markdownPath);
  const section = normalizeKey(sectionText);
  return path && section ? `${path}::${section}` : null;
}

function sectionTargetPath(markdownPath, markdownSection) {
  return `${RUNTIME_MARKDOWN_READER_PREFIX}${markdownPath}::${encodeURIComponent(markdownSection)}`;
}

function parseRuntimeMarkdownReaderTarget(target) {
  if (typeof target !== "string" || !target.startsWith(RUNTIME_MARKDOWN_READER_PREFIX)) {
    return null;
  }
  const raw = target.slice(RUNTIME_MARKDOWN_READER_PREFIX.length);
  if (!raw) {
    return null;
  }
  const sectionSep = raw.indexOf("::");
  const markdownPath = sectionSep === -1 ? raw : raw.slice(0, sectionSep);
  const encodedSection = sectionSep === -1 ? null : raw.slice(sectionSep + 2);
  const markdownSection = encodedSection ? decodeURIComponent(encodedSection) : null;
  return markdownPath ? { markdownPath, markdownSection } : null;
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

function createSectionEntry(section, index) {
  const markdownPath = cleanText(section?.markdownPath);
  const markdownSection =
    cleanText(section?.markdownSection) ??
    cleanText(section?.title) ??
    cleanText(section?.sectionKey);
  if (!markdownPath || !markdownSection) {
    return null;
  }
  const title = cleanText(section?.title) ?? markdownSection;
  return {
    index,
    id: null,
    title,
    kind: cleanText(section?.kind) ?? "markdown-section",
    markdownPath,
    markdownSection,
    sectionKey: cleanText(section?.sectionKey),
    targetPath: sectionTargetPath(markdownPath, markdownSection),
  };
}

function resolveLookupEntry(sequence, source, normalizePath, normalizeKey) {
  if (!sequence || !source || typeof source !== "object") {
    return null;
  }
  const runtimeReader = parseRuntimeMarkdownReaderTarget(source.id);
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

  const markdownPath = cleanText(source.markdownPath) ?? runtimeReader?.markdownPath;
  if (!markdownPath) {
    return null;
  }
  const markdownSection =
    cleanText(source.markdownSection) ??
    cleanText(source.sectionKey) ??
    runtimeReader?.markdownSection;
  if (markdownSection) {
    const sectionEntry = sequence.byMarkdownSection.get(
      sectionLookupKey(markdownPath, markdownSection, normalizePath, normalizeKey)
    );
    if (sectionEntry) {
      return sectionEntry;
    }
  }
  return sequence.byMarkdownPath.get(normalizePath(markdownPath)) ?? null;
}

function buildTextbookTocPageSequence(tocRoot, helpers = {}) {
  const normalizePath = helpers.normalizeMarkdownPath ?? defaultNormalizePath;
  const normalizeKey = helpers.normalizeMarkdownKey ?? defaultNormalizeKey;
  const pages = [];
  const byMarkdownPath = new Map();
  const byMarkdownSection = new Map();
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

  function addSectionPage(section) {
    const entry = createSectionEntry(section, pages.length);
    if (!entry) {
      return;
    }
    const sectionKey = sectionLookupKey(
      entry.markdownPath,
      entry.markdownSection,
      normalizePath,
      normalizeKey
    );
    if (!sectionKey || byMarkdownSection.has(sectionKey)) {
      return;
    }
    pages.push(entry);
    byMarkdownSection.set(sectionKey, entry);
    [entry.sectionKey, entry.title]
      .filter((value) => typeof value === "string" && value.trim().length > 0)
      .forEach((sectionText) => {
        const alias = sectionLookupKey(entry.markdownPath, sectionText, normalizePath, normalizeKey);
        if (alias && !byMarkdownSection.has(alias)) {
          byMarkdownSection.set(alias, entry);
        }
      });
    if (Array.isArray(section.children)) {
      section.children.forEach(addSectionPage);
    }
  }

  function walk(node) {
    if (!node || typeof node !== "object") {
      return;
    }
    addNodePage(node);
    if (Array.isArray(node.sections)) {
      node.sections.forEach(addSectionPage);
    }
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
    byMarkdownSection,
    byScenePath,
    byId,
  };
}

function resolveTextbookPageNavigation(sequence, source, helpers = {}) {
  const normalizePath = helpers.normalizeMarkdownPath ?? defaultNormalizePath;
  const normalizeKey = helpers.normalizeMarkdownKey ?? defaultNormalizeKey;
  const current = resolveLookupEntry(sequence, source, normalizePath, normalizeKey);
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
  const normalizeMarkdownKey = deps.normalizeMarkdownKey ?? defaultNormalizeKey;
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
            normalizeMarkdownKey,
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
      normalizeMarkdownKey,
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
  RUNTIME_MARKDOWN_READER_PREFIX,
};
