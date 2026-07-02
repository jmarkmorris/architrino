export const EQUATION_MAP_SCHEMA = "equation-map-document.v1";
export const DEFAULT_EQUATION_MAP_DOCUMENT_ID = "poisson-weak-field-source-map";
export const DEFAULT_BACKGROUND_ID = "light";
export const DEFAULT_SECTION_LINE_PLACEMENT = "below";
export const DEFAULT_EQUATION_SCALE = "medium";
export const DEFAULT_COMMENT_DENSITY = "compact";

export const CANVAS_COLORS = Object.freeze([
  { id: "architrinoPurple", label: "Purple", color: "#4b0082" },
  { id: "light", label: "Light", color: "#fdfdfd" },
  { id: "warm", label: "Warm", color: "#f4ecd8" },
  { id: "dark", label: "Dark", color: "#0f172a" },
]);

export const SUBJECT_GROUPS = Object.freeze([
  "Classical mechanics",
  "Relativity and effective metric",
  "Quantum and QFT",
  "Statistical mechanics and thermodynamics",
  "Cosmology and astrophysics",
  "AAA native rows",
]);

export const CLAIM_LEVELS = Object.freeze([
  "candidate-commentary",
  "accepted-source-reference",
  "accepted-aaa-derivation",
]);

const EQUATION_SCALE_VALUES = new Set(["small", "medium", "large"]);
const COMMENT_DENSITY_VALUES = new Set(["compact", "roomy"]);
const SECTION_LINE_PLACEMENTS = new Set(["above", "below"]);

function normalizeText(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeOptionalText(value) {
  return String(value ?? "").trim();
}

function normalizePercent(value, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(100, Math.max(0, number));
}

function normalizeWidthPercent(value, fallback = 24) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(44, Math.max(16, number));
}

export function getCanvasColorById(id) {
  return CANVAS_COLORS.find((entry) => entry.id === id) ?? CANVAS_COLORS[0];
}

export function normalizeBackgroundId(id, fallback = DEFAULT_BACKGROUND_ID) {
  return getCanvasColorById(id ?? fallback).id;
}

export function normalizeSectionLinePlacement(value, fallback = DEFAULT_SECTION_LINE_PLACEMENT) {
  return SECTION_LINE_PLACEMENTS.has(value) ? value : fallback;
}

export function normalizeEquationScale(value, fallback = DEFAULT_EQUATION_SCALE) {
  return EQUATION_SCALE_VALUES.has(value) ? value : fallback;
}

export function normalizeCommentDensity(value, fallback = DEFAULT_COMMENT_DENSITY) {
  return COMMENT_DENSITY_VALUES.has(value) ? value : fallback;
}

function normalizeClaimLevel(value) {
  return CLAIM_LEVELS.includes(value) ? value : CLAIM_LEVELS[0];
}

function normalizeAnchor(anchor = {}, index = 0) {
  const id = normalizeText(anchor.id, `anchor-${index + 1}`);
  return {
    id,
    label: normalizeText(anchor.label, id),
    searchText: normalizeOptionalText(anchor.searchText),
  };
}

function normalizeFormulaPart(part = {}, index = 0) {
  const kind = part.kind === "text" ? "text" : "math";
  const text = kind === "text" ? String(part.text ?? "") : "";
  const tex = kind === "math" ? normalizeText(part.tex, "?") : "";
  return {
    id: normalizeText(part.id, `part-${index + 1}`),
    kind,
    text,
    tex,
    anchorId: normalizeOptionalText(part.anchorId),
  };
}

function normalizeCommentBlock(block = {}, index = 0) {
  const type = block.type === "math" ? "math" : "text";
  return {
    type,
    text: type === "text" ? normalizeText(block.text, "") : "",
    tex: type === "math" ? normalizeText(block.tex, "?") : "",
    displayMode: type === "math" ? Boolean(block.displayMode) : false,
    id: normalizeText(block.id, `block-${index + 1}`),
  };
}

function getContentSearchText(blocks = []) {
  return blocks.map((block) => (block.type === "math" ? block.tex : block.text)).join(" ");
}

function normalizeOverlay(overlay = {}, index = 0, anchorIds = new Set()) {
  const targetAnchorId = normalizeText(overlay.targetAnchorId, "");
  if (!anchorIds.has(targetAnchorId)) {
    throw new Error(`Equation overlay ${overlay.id ?? index + 1} targets missing formula section "${targetAnchorId}".`);
  }
  const content = Array.isArray(overlay.content)
    ? overlay.content.map((block, blockIndex) => normalizeCommentBlock(block, blockIndex))
    : [{ type: "text", text: normalizeText(overlay.text, "") }];
  return {
    id: normalizeText(overlay.id, `overlay-${index + 1}`),
    title: normalizeText(overlay.title, `Comment ${index + 1}`),
    status: normalizeOptionalText(overlay.status),
    targetAnchorId,
    sectionLinePlacement: normalizeSectionLinePlacement(overlay.sectionLinePlacement),
    position: {
      x: normalizePercent(overlay.position?.x, 12),
      y: normalizePercent(overlay.position?.y, 18),
      width: normalizeWidthPercent(overlay.position?.width, 24),
    },
    content,
    searchText: getContentSearchText(content),
  };
}

export function normalizeEquationMapDocument(document = {}, index = 0) {
  const id = normalizeText(document.id, `equation-map-${index + 1}`);
  const anchors = Array.isArray(document.anchors)
    ? document.anchors.map((anchor, anchorIndex) => normalizeAnchor(anchor, anchorIndex))
    : [];
  if (anchors.length === 0) {
    throw new Error(`Equation map ${id} requires at least one formula section anchor.`);
  }
  const anchorIds = new Set(anchors.map((anchor) => anchor.id));
  const formulaParts = Array.isArray(document.formulaParts)
    ? document.formulaParts.map((part, partIndex) => normalizeFormulaPart(part, partIndex))
    : [];
  if (formulaParts.length === 0) {
    throw new Error(`Equation map ${id} requires formulaParts for static section targeting.`);
  }
  formulaParts.forEach((part) => {
    if (part.anchorId && !anchorIds.has(part.anchorId)) {
      throw new Error(`Equation map ${id} formula part "${part.id}" uses missing anchor "${part.anchorId}".`);
    }
  });
  const overlays = Array.isArray(document.overlays)
    ? document.overlays.map((overlay, overlayIndex) => normalizeOverlay(overlay, overlayIndex, anchorIds))
    : [];
  return {
    schema: EQUATION_MAP_SCHEMA,
    id,
    title: normalizeText(document.title, "Equation"),
    subject: normalizeText(document.subject, SUBJECT_GROUPS[0]),
    formulaTeX: normalizeText(document.formulaTeX, formulaParts.map((part) => part.tex || part.text).join("")),
    formulaParts,
    anchors,
    overlays,
    backgroundId: normalizeBackgroundId(document.backgroundId),
    claimLevel: normalizeClaimLevel(document.claimLevel),
  };
}

export function normalizeEquationMapDocuments(documents = []) {
  const normalized = documents.map((document, index) => normalizeEquationMapDocument(document, index));
  if (normalized.length === 0) {
    throw new Error("Equation Mapping requires at least one equation-map document.");
  }
  return normalized;
}

export function createSeedEquationMapDocuments() {
  return normalizeEquationMapDocuments([
    {
      id: DEFAULT_EQUATION_MAP_DOCUMENT_ID,
      title: "Poisson Weak-Field Source Map",
      subject: "Relativity and effective metric",
      backgroundId: DEFAULT_BACKGROUND_ID,
      claimLevel: "candidate-commentary",
      formulaTeX: "\\nabla^2 \\Phi = 4\\pi G\\rho",
      anchors: [
        { id: "laplacian", label: "spatial response", searchText: "laplacian operator" },
        { id: "potential", label: "potential", searchText: "gravitational potential" },
        { id: "coupling", label: "coupling", searchText: "4 pi G" },
        { id: "source", label: "source density", searchText: "rho density source" },
      ],
      formulaParts: [
        { id: "laplacian", kind: "math", tex: "\\nabla^2", anchorId: "laplacian" },
        { id: "space-1", kind: "text", text: " " },
        { id: "potential", kind: "math", tex: "\\Phi", anchorId: "potential" },
        { id: "equals", kind: "text", text: " = " },
        { id: "coupling", kind: "math", tex: "4\\pi G", anchorId: "coupling" },
        { id: "space-2", kind: "text", text: " " },
        { id: "source", kind: "math", tex: "\\rho", anchorId: "source" },
      ],
      overlays: [
        {
          id: "operator-comment",
          title: "Response operator",
          status: "candidate",
          targetAnchorId: "laplacian",
          sectionLinePlacement: "above",
          position: { x: 9, y: 22, width: 26 },
          content: [
            { type: "text", text: "Start by naming what the spatial response operator becomes in the native map." },
            { type: "math", tex: "\\nabla^2 \\Phi", displayMode: false },
          ],
        },
        {
          id: "source-comment",
          title: "Source side",
          status: "candidate",
          targetAnchorId: "source",
          sectionLinePlacement: "below",
          position: { x: 66, y: 58, width: 25 },
          content: [
            { type: "text", text: "Do not treat the source term as accepted until the carrier and evidence row are named." },
            { type: "math", tex: "\\rho \\rightarrow \\text{declared source row}", displayMode: false },
          ],
        },
      ],
    },
  ]);
}

export function getEquationSearchText(document = {}) {
  return [
    document.title,
    document.subject,
    document.formulaTeX,
    document.claimLevel,
    ...(document.anchors ?? []).map((anchor) => `${anchor.label} ${anchor.searchText}`),
    ...(document.overlays ?? []).map((overlay) => `${overlay.title} ${overlay.status} ${overlay.searchText}`),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterEquationMapDocuments(documents = [], query = "") {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();
  if (!normalizedQuery) {
    return documents;
  }
  return documents.filter((document) => getEquationSearchText(document).includes(normalizedQuery));
}

export function groupEquationMapDocumentsBySubject(documents = []) {
  const groups = new Map();
  SUBJECT_GROUPS.forEach((subject) => groups.set(subject, []));
  documents.forEach((document) => {
    if (!groups.has(document.subject)) {
      groups.set(document.subject, []);
    }
    groups.get(document.subject).push(document);
  });
  return [...groups.entries()].filter(([, entries]) => entries.length > 0);
}
