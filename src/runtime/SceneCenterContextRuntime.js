function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function extractChapterParts(value) {
  const match = normalizeText(value).match(/^Ch\s+(\d+(?:\.\d+)*)\b/i);
  if (!match) {
    return null;
  }
  return match[1].split(".").filter(Boolean);
}

export function resolveCenterContextChapterLabel(nodes = []) {
  const chapterParts = nodes
    .map((node) => extractChapterParts(node?.data?.textbookChapterLabel))
    .filter((parts) => Array.isArray(parts) && parts.length > 0);
  if (chapterParts.length < 2) {
    return "";
  }

  const common = [];
  const maxLength = Math.min(...chapterParts.map((parts) => parts.length));
  for (let index = 0; index < maxLength; index += 1) {
    const candidate = chapterParts[0][index];
    if (chapterParts.every((parts) => parts[index] === candidate)) {
      common.push(candidate);
      continue;
    }
    break;
  }

  return common.length ? `Ch ${common.join(".")}` : "";
}

export function shouldAllowCenterContext(level) {
  const centerMode =
    typeof level?.layoutConfig?.centerMode === "string"
      ? level.layoutConfig.centerMode.trim().toLowerCase()
      : "";
  return centerMode !== "none";
}

export function resolveCenterContextDescriptor(level) {
  if (!level || !Array.isArray(level.nodes)) {
    return null;
  }
  const title = normalizeText(level.name || level.sceneId || level.id);
  if (!title) {
    return null;
  }
  return {
    title,
    chapterLabel: resolveCenterContextChapterLabel(level.nodes),
  };
}
