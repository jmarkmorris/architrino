const DEFAULT_TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";

function defaultNormalizePath(path) {
  return String(path ?? "")
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase();
}

function defaultNormalizeKey(text) {
  return String(text ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function labelFromNumberPath(numberPath) {
  return `Ch ${numberPath.join(".")}`;
}

function sectionLookupKey(markdownPath, sectionText, normalizeMarkdownPath, normalizeMarkdownKey) {
  const path = normalizeMarkdownPath(markdownPath);
  const section = normalizeMarkdownKey(sectionText);
  return path && section ? `${path}::${section}` : null;
}

function addFirst(map, key, value) {
  if (!key || !value || map.has(key)) {
    return;
  }
  map.set(key, value);
}

function buildTextbookTocNumbering(tocRoot, helpers) {
  const normalizeMarkdownPath = helpers.normalizeMarkdownPath;
  const normalizeMarkdownKey = helpers.normalizeMarkdownKey;
  const byScenePath = new Map();
  const byMarkdownPath = new Map();
  const byMarkdownSection = new Map();

  function addSection(section, numberPath) {
    if (!section || typeof section !== "object") {
      return;
    }
    const label = labelFromNumberPath(numberPath);
    if (section.markdownPath) {
      [section.sectionKey, section.markdownSection, section.title]
        .filter((value) => typeof value === "string" && value.trim().length > 0)
        .forEach((sectionText) => {
          addFirst(
            byMarkdownSection,
            sectionLookupKey(
              section.markdownPath,
              sectionText,
              normalizeMarkdownPath,
              normalizeMarkdownKey
            ),
            label
          );
        });
    }
    if (Array.isArray(section.children)) {
      section.children.forEach((child, index) => addSection(child, [...numberPath, index + 1]));
    }
  }

  function addNode(node, numberPath) {
    if (!node || typeof node !== "object") {
      return;
    }
    const label = labelFromNumberPath(numberPath);
    const markdownPath = node.markdownPath ? normalizeMarkdownPath(node.markdownPath) : null;
    addFirst(byScenePath, node.scenePath ? normalizeMarkdownPath(node.scenePath) : null, label);
    addFirst(
      byMarkdownPath,
      markdownPath,
      label
    );
    if (node.markdownPath && node.markdownSection) {
      addFirst(
        byMarkdownSection,
        sectionLookupKey(
          node.markdownPath,
          node.markdownSection,
          normalizeMarkdownPath,
          normalizeMarkdownKey
        ),
        label
      );
    }
    if (Array.isArray(node.sections)) {
      node.sections.forEach((section, index) => addSection(section, [...numberPath, index + 1]));
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((child, index) => addNode(child, [...numberPath, index + 1]));
    }
  }

  const rootChildren = Array.isArray(tocRoot?.children) ? tocRoot.children : [];
  rootChildren.forEach((node, index) => addNode(node, [index + 1]));

  return {
    byScenePath,
    byMarkdownPath,
    byMarkdownSection,
  };
}

export function createTextbookTocNumberingService(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust = typeof deps.appendCacheBust === "function" ? deps.appendCacheBust : (path) => path;
  const normalizeMarkdownPath = deps.normalizeMarkdownPath ?? defaultNormalizePath;
  const normalizeMarkdownKey = deps.normalizeMarkdownKey ?? defaultNormalizeKey;
  const tocPath = deps.tocPath ?? DEFAULT_TEXTBOOK_TOC_PATH;
  const logger = deps.logger ?? console;
  let numberingPromise = null;

  async function loadNumbering() {
    if (!numberingPromise) {
      numberingPromise = Promise.resolve()
        .then(async () => {
          if (typeof fetchImpl !== "function") {
            return null;
          }
          const response = await fetchImpl(appendCacheBust(tocPath));
          if (!response?.ok) {
            throw new Error(`Failed to load textbook TOC ${tocPath}`);
          }
          const data = await response.json();
          return buildTextbookTocNumbering(data?.tocRoot, {
            normalizeMarkdownPath,
            normalizeMarkdownKey,
          });
        })
        .catch((error) => {
          logger?.warn?.("Failed to resolve textbook chapter labels", error);
          return null;
        });
    }
    return numberingPromise;
  }

  async function resolveNodeChapterLabel(node) {
    const numbering = await loadNumbering();
    if (!numbering || !node || typeof node !== "object") {
      return null;
    }
    const scenePath =
      typeof node.childScene === "string" && node.childScene.trim().length > 0
        ? normalizeMarkdownPath(node.childScene)
        : typeof node.scenePath === "string" && node.scenePath.trim().length > 0
          ? normalizeMarkdownPath(node.scenePath)
          : null;
    if (scenePath && numbering.byScenePath.has(scenePath)) {
      return numbering.byScenePath.get(scenePath);
    }

    const markdownPath =
      typeof node.markdownPath === "string" && node.markdownPath.trim().length > 0
        ? normalizeMarkdownPath(node.markdownPath)
        : null;
    const markdownSection =
      typeof node.markdownSection === "string" && node.markdownSection.trim().length > 0
        ? node.markdownSection
        : typeof node.sectionKey === "string" && node.sectionKey.trim().length > 0
          ? node.sectionKey
          : null;
    if (markdownPath && markdownSection) {
      const label = numbering.byMarkdownSection.get(
        sectionLookupKey(markdownPath, markdownSection, normalizeMarkdownPath, normalizeMarkdownKey)
      );
      if (label) {
        return label;
      }
    }
    if (markdownPath && numbering.byMarkdownPath.has(markdownPath)) {
      return numbering.byMarkdownPath.get(markdownPath);
    }

    return null;
  }

  return {
    resolveNodeChapterLabel,
  };
}

export { buildTextbookTocNumbering };
