function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

export function buildReactionLibraryExportOverrides(document = {}) {
  const reactionId = normalizeText(document?.reactionId);
  const title = normalizeText(document?.title);
  const sourceDocumentIds = buildTagList(document?.provenance?.sourceDocumentIds);
  const semanticTags = buildTagList(document?.hints?.semanticTags);
  const suggestedSceneId = normalizeText(document?.hints?.suggestedSceneId);
  return Object.fromEntries(
    Object.entries({
      reactionId,
      title,
      sourceDocumentIds,
      semanticTags,
      suggestedSceneId,
    }).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "";
    })
  );
}
