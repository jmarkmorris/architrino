function cloneBlock(block = {}) {
  return {
    id: block.id,
    type: block.type,
    text: block.text,
    tex: block.tex,
    displayMode: block.displayMode,
  };
}

function cloneFormulaPart(part = {}) {
  return {
    id: part.id,
    kind: part.kind,
    text: part.text,
    tex: part.tex,
    anchorId: part.anchorId,
  };
}

function cloneOverlay(overlay = {}) {
  return {
    id: overlay.id,
    title: overlay.title,
    status: overlay.status,
    targetAnchorId: overlay.targetAnchorId,
    sectionLinePlacement: overlay.sectionLinePlacement,
    position: {
      x: overlay.position?.x,
      y: overlay.position?.y,
      width: overlay.position?.width,
    },
    content: Array.isArray(overlay.content) ? overlay.content.map(cloneBlock) : [],
  };
}

function cloneAnchor(anchor = {}) {
  return {
    id: anchor.id,
    label: anchor.label,
    searchText: anchor.searchText,
  };
}

function normalizePlainText(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function createSlug(value, fallback) {
  const slug = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
  return slug || fallback;
}

function createUniqueId(baseId, existingIds) {
  const base = createSlug(baseId, "section");
  if (!existingIds.has(base)) {
    return base;
  }
  let index = 2;
  while (existingIds.has(`${base}-${index}`)) {
    index += 1;
  }
  return `${base}-${index}`;
}

function getAnchorIds(document = {}) {
  return new Set((document.anchors ?? []).map((anchor) => anchor.id));
}

function getOverlayIds(document = {}) {
  return new Set((document.overlays ?? []).map((overlay) => overlay.id));
}

function normalizePlacement(value, fallback = "below") {
  return value === "above" || value === "below" ? value : fallback;
}

export function createEditableEquationMapDocument(document = {}) {
  return {
    schema: document.schema,
    id: document.id,
    title: document.title,
    subject: document.subject,
    formulaTeX: document.formulaTeX,
    formulaParts: Array.isArray(document.formulaParts) ? document.formulaParts.map(cloneFormulaPart) : [],
    anchors: Array.isArray(document.anchors) ? document.anchors.map(cloneAnchor) : [],
    overlays: Array.isArray(document.overlays) ? document.overlays.map(cloneOverlay) : [],
    backgroundId: document.backgroundId,
    claimLevel: document.claimLevel,
  };
}

export function getFormulaTeXFromParts(formulaParts = []) {
  return formulaParts.map((part) => (part.kind === "math" ? part.tex : part.text)).join("");
}

export function getFormulaPartTeXForAnchor(document = {}, anchorId = "") {
  const part = (document.formulaParts ?? []).find((entry) => entry.anchorId === anchorId && entry.kind === "math");
  return part?.tex ?? "";
}

export function getOverlayContentDraft(overlay = {}) {
  const content = Array.isArray(overlay.content) ? overlay.content : [];
  return {
    text: content.find((block) => block.type === "text")?.text ?? "",
    mathTex: content.find((block) => block.type === "math")?.tex ?? "",
  };
}

export function createEquationAnchor(document = {}, draft = {}) {
  const next = createEditableEquationMapDocument(document);
  const existingIds = getAnchorIds(next);
  const label = normalizePlainText(draft.label, `section ${next.anchors.length + 1}`);
  const id = createUniqueId(draft.id ?? label, existingIds);
  const tex = normalizePlainText(draft.tex, "x");
  next.anchors.push({
    id,
    label,
    searchText: normalizePlainText(draft.searchText, ""),
  });
  if (next.formulaParts.length > 0) {
    next.formulaParts.push({ id: `${id}-space`, kind: "text", text: " " });
  }
  next.formulaParts.push({ id, kind: "math", tex, anchorId: id });
  next.formulaTeX = getFormulaTeXFromParts(next.formulaParts);
  return next;
}

export function updateEquationAnchor(document = {}, anchorId = "", patch = {}) {
  const next = createEditableEquationMapDocument(document);
  const anchor = next.anchors.find((entry) => entry.id === anchorId);
  if (!anchor) {
    return next;
  }
  if (patch.label != null) {
    anchor.label = normalizePlainText(patch.label, anchor.label);
  }
  if (patch.searchText != null) {
    anchor.searchText = normalizePlainText(patch.searchText, "");
  }
  if (patch.tex != null) {
    const tex = normalizePlainText(patch.tex, getFormulaPartTeXForAnchor(next, anchorId) || "x");
    const part = next.formulaParts.find((entry) => entry.anchorId === anchorId && entry.kind === "math");
    if (part) {
      part.tex = tex;
    } else {
      next.formulaParts.push({ id: anchorId, kind: "math", tex, anchorId });
    }
    next.formulaTeX = getFormulaTeXFromParts(next.formulaParts);
  }
  return next;
}

export function createEquationOverlay(document = {}, draft = {}) {
  const next = createEditableEquationMapDocument(document);
  const anchorIds = getAnchorIds(next);
  const targetAnchorId = anchorIds.has(draft.targetAnchorId) ? draft.targetAnchorId : next.anchors[0]?.id;
  const id = createUniqueId(draft.id ?? draft.title ?? `comment ${next.overlays.length + 1}`, getOverlayIds(next));
  const contentText = normalizePlainText(draft.text, `Map ${targetAnchorId ?? "this section"}.`);
  const contentMathTex = normalizePlainText(draft.mathTex, "");
  const content = [{ id: `${id}-text`, type: "text", text: contentText }];
  if (contentMathTex) {
    content.push({ id: `${id}-math`, type: "math", tex: contentMathTex, displayMode: false });
  }
  next.overlays.push({
    id,
    title: normalizePlainText(draft.title, "New comment"),
    status: normalizePlainText(draft.status, "candidate"),
    targetAnchorId,
    sectionLinePlacement: normalizePlacement(draft.sectionLinePlacement, "below"),
    position: {
      x: normalizeNumber(draft.position?.x, 18),
      y: normalizeNumber(draft.position?.y, 32),
      width: normalizeNumber(draft.position?.width, 26),
    },
    content,
  });
  return next;
}

export function updateEquationOverlay(document = {}, overlayId = "", patch = {}) {
  const next = createEditableEquationMapDocument(document);
  const overlay = next.overlays.find((entry) => entry.id === overlayId);
  if (!overlay) {
    return next;
  }
  if (patch.title != null) {
    overlay.title = normalizePlainText(patch.title, overlay.title);
  }
  if (patch.status != null) {
    overlay.status = normalizePlainText(patch.status, "");
  }
  if (patch.targetAnchorId != null && getAnchorIds(next).has(patch.targetAnchorId)) {
    overlay.targetAnchorId = patch.targetAnchorId;
  }
  if (patch.sectionLinePlacement != null) {
    overlay.sectionLinePlacement = normalizePlacement(patch.sectionLinePlacement, overlay.sectionLinePlacement);
  }
  if (patch.position) {
    overlay.position = {
      x: normalizeNumber(patch.position.x, overlay.position?.x ?? 18),
      y: normalizeNumber(patch.position.y, overlay.position?.y ?? 32),
      width: normalizeNumber(patch.position.width, overlay.position?.width ?? 26),
    };
  }
  if (patch.text != null || patch.mathTex != null) {
    const existingContent = getOverlayContentDraft(overlay);
    const text = normalizePlainText(patch.text, existingContent.text);
    const mathTex = normalizePlainText(patch.mathTex, "");
    overlay.content = [{ id: `${overlay.id}-text`, type: "text", text }];
    if (mathTex) {
      overlay.content.push({ id: `${overlay.id}-math`, type: "math", tex: mathTex, displayMode: false });
    }
  }
  return next;
}
