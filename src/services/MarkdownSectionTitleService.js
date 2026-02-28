export function createMarkdownSectionTitleResolver(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust =
    typeof deps.appendCacheBust === "function" ? deps.appendCacheBust : (path) => path;
  const parseMarkdownHeading = deps.parseMarkdownHeading;
  const normalizeMarkdownKey = deps.normalizeMarkdownKey;
  const logger = deps.logger ?? console;

  return async function resolveMarkdownSectionTitleByKey(markdownPath, normalizedSectionKey) {
    if (
      !markdownPath ||
      !normalizedSectionKey ||
      typeof fetchImpl !== "function" ||
      typeof parseMarkdownHeading !== "function" ||
      typeof normalizeMarkdownKey !== "function"
    ) {
      return null;
    }
    try {
      const response = await fetchImpl(appendCacheBust(markdownPath));
      if (!response.ok) {
        return null;
      }
      const text = await response.text();
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        const heading = parseMarkdownHeading(line);
        if (!heading) {
          continue;
        }
        if (normalizeMarkdownKey(heading.title) === normalizedSectionKey) {
          return heading.title;
        }
      }
    } catch (error) {
      if (typeof logger?.warn === "function") {
        logger.warn("Failed to restore markdown section title", markdownPath, error);
      }
    }
    return null;
  };
}
