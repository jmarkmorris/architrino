function normalizeDirectory(directory) {
  return String(directory).replace(/\/+$/, "").replace(/^\.?\//, "");
}

export function createMarkdownManifestService(deps = {}) {
  const fetchImpl = deps.fetchImpl;
  const appendCacheBust =
    typeof deps.appendCacheBust === "function" ? deps.appendCacheBust : (path) => path;
  const manifestPath =
    typeof deps.manifestPath === "string" && deps.manifestPath
      ? deps.manifestPath
      : "content/markdown/markdown_index.json";
  const logger = deps.logger ?? console;
  let manifestPromise = null;
  const markdownDirectoryCache = new Map();
  const markdownSubdirCache = new Map();

  async function loadManifest() {
    if (manifestPromise) {
      return manifestPromise;
    }
    manifestPromise = fetchImpl(appendCacheBust(manifestPath))
      .then(async (response) => {
        if (!response.ok) {
          return [];
        }
        const data = await response.json();
        if (!data || !Array.isArray(data.files)) {
          return [];
        }
        return data.files
          .filter((path) => typeof path === "string" && path.toLowerCase().endsWith(".md"))
          .map((path) => path.replace(/^\.?\//, ""));
      })
      .catch((error) => {
        if (typeof logger?.warn === "function") {
          logger.warn("Failed to load markdown manifest", error);
        }
        return [];
      });
    return manifestPromise;
  }

  async function listFilesInDir(directory) {
    if (!directory) {
      return [];
    }
    const normalized = normalizeDirectory(directory);
    if (markdownDirectoryCache.has(normalized)) {
      return markdownDirectoryCache.get(normalized);
    }
    const files = await loadManifest();
    if (!files.length) {
      markdownDirectoryCache.set(normalized, []);
      return [];
    }
    const prefix = `${normalized}/`;
    const manifestFiles = files.filter((path) => {
      if (!path.startsWith(prefix)) {
        return false;
      }
      const remainder = path.slice(prefix.length);
      return remainder.length > 0 && !remainder.includes("/");
    });
    markdownDirectoryCache.set(normalized, manifestFiles);
    return manifestFiles;
  }

  async function listDirectoriesInDir(directory) {
    if (!directory) {
      return [];
    }
    const normalized = normalizeDirectory(directory);
    if (markdownSubdirCache.has(normalized)) {
      return markdownSubdirCache.get(normalized);
    }
    const files = await loadManifest();
    if (!files.length) {
      markdownSubdirCache.set(normalized, []);
      return [];
    }
    const prefix = `${normalized}/`;
    const subdirs = new Set();
    files.forEach((path) => {
      if (!path.startsWith(prefix)) {
        return;
      }
      const remainder = path.slice(prefix.length);
      if (!remainder.includes("/")) {
        return;
      }
      const firstSegment = remainder.split("/")[0];
      if (firstSegment) {
        subdirs.add(`${normalized}/${firstSegment}`);
      }
    });
    const manifestDirectories = Array.from(subdirs);
    markdownSubdirCache.set(normalized, manifestDirectories);
    return manifestDirectories;
  }

  return {
    loadManifest,
    listFilesInDir,
    listDirectoriesInDir,
  };
}
