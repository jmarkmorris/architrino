function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasPanelMapTarget(nodeData, panelMap) {
  if (!panelMap || typeof panelMap.has !== "function") {
    return false;
  }
  const nodeId = hasText(nodeData?.id) ? nodeData.id.trim() : "";
  return Boolean(nodeId && panelMap.has(nodeId));
}

export function hasActionableSceneSphereTarget(nodeData, options = {}) {
  const source = nodeData?.data && typeof nodeData.data === "object" ? nodeData.data : nodeData;
  if (!source || typeof source !== "object") {
    return false;
  }

  if (hasText(source.childScene)) {
    return true;
  }

  const hasMarkdownTarget = hasText(source.markdownPath);
  if (hasMarkdownTarget && source.markdownDownloadOnly === true) {
    return true;
  }
  if (hasMarkdownTarget && source.markdownOpenEligible === true) {
    return true;
  }

  if (hasText(source.filePath) && source.fileOpenEligible === true) {
    return true;
  }

  if (hasText(source.galleryImage)) {
    return true;
  }

  return hasPanelMapTarget(source, options.panelMap);
}

export function resolveSceneSphereActionKind(nodeData, options = {}) {
  return hasActionableSceneSphereTarget(nodeData, options) ? "actionable" : "static";
}
