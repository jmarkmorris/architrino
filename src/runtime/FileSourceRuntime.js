export function createFileSourceRuntime(deps = {}) {
  const {
    appendCacheBust,
    documentLike = typeof document !== "undefined" ? document : null,
  } = deps;

  function filenameFromPath(filePath) {
    const leaf = String(filePath ?? "").split("/").filter(Boolean).pop();
    return leaf || "download";
  }

  function resolveFileTarget(level) {
    const filePath =
      typeof level?.filePath === "string" && level.filePath.trim().length > 0
        ? level.filePath.trim()
        : null;
    if (!filePath) {
      return null;
    }
    const downloadName =
      typeof level?.fileDownloadName === "string" && level.fileDownloadName.trim().length > 0
        ? level.fileDownloadName.trim()
        : filenameFromPath(filePath);
    const openMode =
      typeof level?.fileOpenMode === "string" && level.fileOpenMode.trim().length > 0
        ? level.fileOpenMode.trim()
        : "new-tab";
    return {
      filePath,
      downloadName,
      openMode,
      shouldDownload: level?.fileDownload === true || openMode === "download",
    };
  }

  function openFileSource(level) {
    const target = resolveFileTarget(level);
    const doc =
      documentLike && typeof documentLike.createElement === "function"
        ? documentLike
        : null;
    if (!target || !doc) {
      return false;
    }
    const link = doc.createElement("a");
    link.href =
      typeof appendCacheBust === "function"
        ? appendCacheBust(target.filePath)
        : target.filePath;
    if (target.shouldDownload) {
      link.download = target.downloadName;
      if (typeof link.setAttribute === "function") {
        link.setAttribute("download", target.downloadName);
      }
    } else {
      link.target = "_blank";
    }
    if ("rel" in link) {
      link.rel = "noopener";
    }
    const parent = doc.body ?? doc.documentElement ?? null;
    if (parent && typeof parent.appendChild === "function") {
      parent.appendChild(link);
    }
    if (typeof link.click !== "function") {
      link.remove?.();
      return false;
    }
    link.click();
    link.remove?.();
    return true;
  }

  return {
    openFileSource,
    resolveFileTarget,
  };
}
