export function titleFromSlug(slug) {
  return String(slug || "")
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function stripWalkthroughStepPrefix(title) {
  const cleaned = String(title || "").trim();
  if (!cleaned) {
    return "";
  }
  return cleaned
    .replace(/^Walkthrough\s+Step\s+\d+\s*[\u2014\-:]\s*/i, "")
    .trim();
}

export function compactMarkdownNodeLabel(title, maxChars = 34) {
  let text = normalizeTitleForSphereLabel(title);
  if (!text) {
    return "";
  }
  text = collapseAaaLabel(text);

  const splitters = [" \u2014 ", " \u2013 ", " - ", ": "];
  for (const splitter of splitters) {
    if (!text.includes(splitter)) {
      continue;
    }
    const head = text.split(splitter)[0].trim();
    if (head.length >= 8) {
      text = head;
      break;
    }
  }

  if (text.length <= maxChars) {
    return text;
  }

  const budget = Math.max(10, maxChars - 1);
  const words = text.split(" ");
  let compact = "";
  for (const word of words) {
    const candidate = compact ? `${compact} ${word}` : word;
    if (candidate.length > budget) {
      break;
    }
    compact = candidate;
  }
  if (compact.length >= 12) {
    return `${compact}\u2026`;
  }
  return `${text.slice(0, budget).trimEnd()}\u2026`;
}

const sphereAaaText = "AAA";

function collapseAaaLabel(text) {
  const normalizedText = String(text);
  const architrinoMatch = normalizedText.match(
    /^(.+?)\s+in\s+(?:the\s+)?architrino\b(?:\s+.*)?$/i
  );
  if (architrinoMatch) {
    const subject = architrinoMatch[1].trim();
    if (subject) {
      return `${subject} in ${sphereAaaText}`;
    }
  }

  const match = String(text).match(
    /^(.+?)\s+in\s+(?:the\s+)?(?:AAA|\u{1D538}\u{1D538}\u{1D538})(?:\s+.*)?$/iu
  );
  if (!match) {
    return text;
  }
  const subject = match[1].trim();
  if (!subject) {
    return text;
  }
  return `${subject} in ${sphereAaaText}`;
}

function normalizeTitleForSphereLabel(title) {
  let text = String(title || "").trim();
  if (!text) {
    return "";
  }

  text = text.replace(/\\\$/g, "$");
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_match, expr) => latexToPlainText(expr));
  text = text.replace(/\$([^$]+)\$/g, (_match, expr) => latexToPlainText(expr));
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_match, expr) => latexToPlainText(expr));
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (_match, expr) => latexToPlainText(expr));

  return text.replace(/\s+/g, " ").trim();
}

function latexToPlainText(expr) {
  return String(expr || "")
    .replace(/\\mathbb\{A\}/g, "\u{1D538}")
    .replace(/\\(mathbb|mathrm|text)\{([^}]*)\}/g, "$2")
    .replace(/[_^]\{([^}]*)\}/g, "$1")
    .replace(/[_^]([A-Za-z0-9]+)/g, "$1")
    .replace(/\\[A-Za-z]+\*?/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractMarkdownDocumentTitle(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return null;
  }
  const lines = markdownText.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (!match) {
      continue;
    }
    const heading = match[1].trim();
    if (!heading) {
      continue;
    }
    const stripped = stripWalkthroughStepPrefix(heading);
    return stripped || heading;
  }
  return null;
}

function defaultNormalizeMarkdownPath(path) {
  return String(path)
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .toLowerCase();
}

export function createMarkdownDocumentTitleResolver(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust =
    typeof deps.appendCacheBust === "function"
      ? deps.appendCacheBust
      : (path) => path;
  const normalizeMarkdownPath =
    typeof deps.normalizeMarkdownPath === "function"
      ? deps.normalizeMarkdownPath
      : defaultNormalizeMarkdownPath;
  const titleCache = deps.cache instanceof Map ? deps.cache : new Map();
  const logger = deps.logger ?? console;

  return async function resolveMarkdownDocumentTitle(markdownPath) {
    if (!markdownPath || typeof fetchImpl !== "function") {
      return null;
    }
    const normalizedPath = normalizeMarkdownPath(markdownPath);
    if (titleCache.has(normalizedPath)) {
      return titleCache.get(normalizedPath);
    }
    const promise = fetchImpl(appendCacheBust(markdownPath))
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        const text = await response.text();
        return extractMarkdownDocumentTitle(text);
      })
      .catch((error) => {
        if (typeof logger?.warn === "function") {
          logger.warn("Failed to resolve markdown title", markdownPath, error);
        }
        return null;
      });
    titleCache.set(normalizedPath, promise);
    return promise;
  };
}
