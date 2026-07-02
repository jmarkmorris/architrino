import {
  CANVAS_COLORS,
  DEFAULT_BACKGROUND_ID,
  DEFAULT_COMMENT_FONT_SIZE,
  DEFAULT_EQUATION_MAP_DOCUMENT_ID,
  DEFAULT_EQUATION_SCALE,
  DEFAULT_SECTION_LINE_PLACEMENT,
  createSeedEquationMapDocuments,
  filterEquationMapDocuments,
  getCanvasColorById,
  groupEquationMapDocumentsBySubject,
  normalizeBackgroundId,
  normalizeCommentFontSize,
  normalizeEquationMapDocument,
  normalizeEquationMapDocuments,
  normalizeEquationScale,
} from "./EquationMappingData.js";
import {
  createEditableEquationMapDocument,
  createEquationAnchor,
  createEquationOverlay,
  getFormulaPartTeXForAnchor,
  getOverlayContentDraft,
  updateEquationAnchor,
  updateEquationOverlay,
} from "./EquationMappingEditor.js";
import { resolveStandaloneAppHomeHref } from "../navigator/StandaloneAppHomeRuntime.js";

const SETTINGS_STORAGE_KEY = "architrino.equationMapping.settings.v7";
const SIZE_CALIBRATION_VERSION = 2;
const DOCUMENTS_STORAGE_KEY = "architrino.equationMapping.documents.v1";
const SVG_NS = "http://www.w3.org/2000/svg";

function createElement(documentLike, tag, className = "", textContent) {
  const element = documentLike.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (textContent != null) {
    element.textContent = textContent;
  }
  return element;
}

function createSvgElement(documentLike, tag) {
  return documentLike.createElementNS(SVG_NS, tag);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getRectCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function createPointerLineGeometry(stageRect, targetRect, commentRect, placement = DEFAULT_SECTION_LINE_PLACEMENT) {
  const targetCenter = getRectCenter(targetRect);
  const commentCenter = getRectCenter(commentRect);
  const targetY = placement === "above" ? targetRect.top : targetRect.bottom;
  const targetX = clamp(targetCenter.x, targetRect.left, targetRect.right);
  const sourceX = commentCenter.x <= targetX ? commentRect.right : commentRect.left;
  const sourceY = clamp(targetCenter.y, commentRect.top, commentRect.bottom);
  return {
    x1: sourceX - stageRect.left,
    y1: sourceY - stageRect.top,
    x2: targetX - stageRect.left,
    y2: targetY - stageRect.top,
  };
}

export function createEquationMappingHomeHref(windowLike = globalThis.window) {
  return resolveStandaloneAppHomeHref(windowLike?.location?.href);
}

function renderMath(windowLike, element, tex, { displayMode = false } = {}) {
  const katex = windowLike?.katex;
  if (katex && typeof katex.render === "function") {
    katex.render(tex, element, {
      displayMode,
      throwOnError: false,
    });
    return;
  }
  element.textContent = displayMode ? `$$${tex}$$` : tex;
  element.classList.add("equation-mapping-math-fallback");
}

function readSavedSettings(windowLike) {
  try {
    const value = windowLike?.localStorage?.getItem?.(SETTINGS_STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

function saveSettings(windowLike, settings) {
  try {
    windowLike?.localStorage?.setItem?.(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Browser-local settings are optional for file and test contexts.
  }
}

function createIconSvg(name) {
  switch (name) {
    case "home":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h5v-5h3v5h5v-9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    case "search":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    case "settings":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.2a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4A2 2 0 0 0 4 9.8l.2.1a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.2a2 2 0 0 1 1 1.7v.4a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.2a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.2a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    case "edit":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m13.5 6 4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    case "collapse":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    default:
      return "";
  }
}

function readSavedDocuments(windowLike) {
  try {
    const value = windowLike?.localStorage?.getItem?.(DOCUMENTS_STORAGE_KEY);
    return value ? normalizeEquationMapDocuments(JSON.parse(value)) : null;
  } catch {
    return null;
  }
}

function mergeSeedAndSavedDocuments(seedDocuments, savedDocuments) {
  if (!Array.isArray(savedDocuments) || savedDocuments.length === 0) {
    return seedDocuments;
  }
  const savedById = new Map(savedDocuments.map((document) => [document.id, document]));
  const mergedDocuments = seedDocuments.map((seedDocument) => savedById.get(seedDocument.id) ?? seedDocument);
  const seedIds = new Set(seedDocuments.map((document) => document.id));
  savedDocuments.forEach((document) => {
    if (!seedIds.has(document.id)) {
      mergedDocuments.push(document);
    }
  });
  return mergedDocuments;
}

function saveDocuments(windowLike, documents) {
  try {
    windowLike?.localStorage?.setItem?.(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
  } catch {
    // Browser-local draft documents are optional for file and test contexts.
  }
}

function clearSavedDocuments(windowLike) {
  try {
    windowLike?.localStorage?.removeItem?.(DOCUMENTS_STORAGE_KEY);
  } catch {
    // Browser-local draft documents are optional for file and test contexts.
  }
}

export function mountEquationMappingApp(options = {}) {
  return new EquationMappingRuntime(options).init();
}

export class EquationMappingRuntime {
  constructor(options = {}) {
    this.document = options.document ?? globalThis.document;
    this.window = options.window ?? globalThis.window;
    const seedDocuments = createSeedEquationMapDocuments();
    const savedDocuments = options.documents == null ? readSavedDocuments(this.window) : null;
    this.documents = normalizeEquationMapDocuments(
      options.documents ?? mergeSeedAndSavedDocuments(seedDocuments, savedDocuments)
    );
    const savedSettings = readSavedSettings(this.window);
    this.activeDocumentId =
      options.initialDocumentId ??
      savedSettings.activeDocumentId ??
      this.documents.find((document) => document.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID)?.id ??
      this.documents[0].id;
    this.activeOverlayId = savedSettings.activeOverlayId ?? this.activeDocument.overlays[0]?.id ?? "";
    this.activeAnchorId = savedSettings.activeAnchorId ?? this.activeDocument.anchors[0]?.id ?? "";
    this.backgroundId = normalizeBackgroundId(
      options.backgroundId ?? savedSettings.backgroundId ?? this.activeDocument.backgroundId ?? DEFAULT_BACKGROUND_ID
    );
    const savedSizeSettingsAreCurrent = savedSettings.sizeCalibrationVersion === SIZE_CALIBRATION_VERSION;
    this.equationScale = normalizeEquationScale(
      options.equationScale ??
        (savedSizeSettingsAreCurrent ? savedSettings.equationScale : DEFAULT_EQUATION_SCALE)
    );
    this.commentFontSize = normalizeCommentFontSize(
      options.commentFontSize ??
        (savedSizeSettingsAreCurrent ? savedSettings.commentFontSize : DEFAULT_COMMENT_FONT_SIZE)
    );
    this.indexCollapsed = Boolean(options.indexCollapsed ?? savedSettings.indexCollapsed ?? false);
    this.searchOpen = false;
    this.settingsOpen = false;
    this.editorOpen = false;
    this.searchQuery = "";
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.pointerLines = [];
  }

  get activeDocument() {
    return this.documents.find((document) => document.id === this.activeDocumentId) ?? this.documents[0];
  }

  get activeOverlay() {
    const document = this.activeDocument;
    return document.overlays.find((overlay) => overlay.id === this.activeOverlayId) ?? document.overlays[0] ?? null;
  }

  get activeAnchor() {
    const document = this.activeDocument;
    return document.anchors.find((anchor) => anchor.id === this.activeAnchorId) ?? document.anchors[0] ?? null;
  }

  init() {
    this.root = this.document.getElementById("equation-mapping-app");
    if (!this.root) {
      throw new Error("Missing #equation-mapping-app");
    }
    this.handleResize = () => this.updatePointerLines();
    this.window?.addEventListener?.("resize", this.handleResize);
    this.render();
    return this;
  }

  destroy() {
    this.window?.removeEventListener?.("resize", this.handleResize);
  }

  persistSettings() {
    saveSettings(this.window, {
      activeDocumentId: this.activeDocumentId,
      activeOverlayId: this.activeOverlayId,
      activeAnchorId: this.activeAnchorId,
      backgroundId: this.backgroundId,
      equationScale: this.equationScale,
      commentFontSize: this.commentFontSize,
      sizeCalibrationVersion: SIZE_CALIBRATION_VERSION,
      indexCollapsed: this.indexCollapsed,
    });
  }

  persistDocuments() {
    saveDocuments(this.window, this.documents);
  }

  replaceActiveDocument(nextDocument, nextState = {}) {
    const currentIndex = Math.max(
      this.documents.findIndex((document) => document.id === this.activeDocument.id),
      0
    );
    const normalizedDocument = normalizeEquationMapDocument(nextDocument, currentIndex);
    this.documents = this.documents.map((document, index) => (index === currentIndex ? normalizedDocument : document));
    this.activeDocumentId = normalizedDocument.id;
    this.activeAnchorId =
      nextState.activeAnchorId && normalizedDocument.anchors.some((anchor) => anchor.id === nextState.activeAnchorId)
        ? nextState.activeAnchorId
        : normalizedDocument.anchors.find((anchor) => anchor.id === this.activeAnchorId)?.id ?? normalizedDocument.anchors[0]?.id ?? "";
    this.activeOverlayId =
      nextState.activeOverlayId && normalizedDocument.overlays.some((overlay) => overlay.id === nextState.activeOverlayId)
        ? nextState.activeOverlayId
        : normalizedDocument.overlays.find((overlay) => overlay.id === this.activeOverlayId)?.id ??
          normalizedDocument.overlays[0]?.id ??
          "";
    this.persistDocuments();
    this.persistSettings();
    this.render();
  }

  resetDocumentDrafts() {
    clearSavedDocuments(this.window);
    this.documents = createSeedEquationMapDocuments();
    this.activeDocumentId =
      this.documents.find((document) => document.id === DEFAULT_EQUATION_MAP_DOCUMENT_ID)?.id ?? this.documents[0].id;
    this.activeAnchorId = this.activeDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = this.activeDocument.overlays[0]?.id ?? "";
    this.persistSettings();
    this.render();
  }

  setActiveDocument(documentId) {
    const nextDocument = this.documents.find((document) => document.id === documentId);
    if (!nextDocument) {
      return;
    }
    this.activeDocumentId = nextDocument.id;
    this.activeAnchorId = nextDocument.anchors[0]?.id ?? "";
    this.activeOverlayId = nextDocument.overlays[0]?.id ?? "";
    this.persistSettings();
    this.render();
  }

  setActiveOverlay(overlayId) {
    if (!this.activeDocument.overlays.some((overlay) => overlay.id === overlayId)) {
      return;
    }
    this.activeOverlayId = overlayId;
    this.persistSettings();
    this.render();
  }

  setActiveAnchor(anchorId) {
    if (!this.activeDocument.anchors.some((anchor) => anchor.id === anchorId)) {
      return;
    }
    this.activeAnchorId = anchorId;
    this.persistSettings();
    this.render();
  }

  addAnchor() {
    const nextDocument = createEquationAnchor(this.activeDocument);
    const activeAnchorId = nextDocument.anchors[nextDocument.anchors.length - 1]?.id ?? "";
    this.replaceActiveDocument(nextDocument, { activeAnchorId });
  }

  applyAnchorEdit(sectionElement) {
    const activeAnchor = this.activeAnchor;
    if (!activeAnchor) {
      return;
    }
    const nextDocument = updateEquationAnchor(this.activeDocument, activeAnchor.id, {
      label: sectionElement.querySelector('[name="anchor-label"]')?.value,
      searchText: sectionElement.querySelector('[name="anchor-search-text"]')?.value,
      tex: sectionElement.querySelector('[name="anchor-tex"]')?.value,
    });
    this.replaceActiveDocument(nextDocument, { activeAnchorId: activeAnchor.id });
  }

  addOverlay() {
    const nextDocument = createEquationOverlay(this.activeDocument, {
      targetAnchorId: this.activeAnchor?.id,
    });
    const activeOverlayId = nextDocument.overlays[nextDocument.overlays.length - 1]?.id ?? "";
    this.replaceActiveDocument(nextDocument, { activeOverlayId });
  }

  applyOverlayEdit(sectionElement) {
    const activeOverlay = this.activeOverlay;
    if (!activeOverlay) {
      return;
    }
    const nextDocument = updateEquationOverlay(this.activeDocument, activeOverlay.id, {
      title: sectionElement.querySelector('[name="overlay-title"]')?.value,
      targetAnchorId: sectionElement.querySelector('[name="overlay-target"]')?.value,
      sectionLinePlacement: sectionElement.querySelector('[name="overlay-line"]')?.value,
      text: sectionElement.querySelector('[name="overlay-text"]')?.value,
      mathTex: sectionElement.querySelector('[name="overlay-math"]')?.value,
      position: {
        x: sectionElement.querySelector('[name="overlay-x"]')?.value,
        y: sectionElement.querySelector('[name="overlay-y"]')?.value,
        width: sectionElement.querySelector('[name="overlay-width"]')?.value,
      },
    });
    this.replaceActiveDocument(nextDocument, {
      activeAnchorId: sectionElement.querySelector('[name="overlay-target"]')?.value,
      activeOverlayId: activeOverlay.id,
    });
  }

  render() {
    this.anchorElements = new Map();
    this.overlayElements = new Map();
    this.root.textContent = "";
    this.root.append(this.renderShell());
    this.schedulePointerUpdate();
  }

  renderShell() {
    const shell = createElement(this.document, "div", "equation-mapping-shell");
    shell.dataset.background = this.backgroundId;
    shell.dataset.indexCollapsed = this.indexCollapsed ? "true" : "false";
    shell.dataset.equationScale = this.equationScale;
    shell.dataset.commentFontSize = this.commentFontSize;
    shell.style.setProperty("--equation-mapping-background", getCanvasColorById(this.backgroundId).color);
    shell.append(this.renderSubjectIndex(), this.renderCanvas());
    return shell;
  }

  renderSubjectIndex() {
    const index = createElement(this.document, "aside", "equation-mapping-index");
    index.setAttribute("aria-label", "Equation subjects");
    const header = createElement(this.document, "div", "equation-mapping-index-header");
    const title = createElement(this.document, "strong", "", "Equations");
    const collapse = createElement(this.document, "button", "equation-mapping-icon-button equation-mapping-index-collapse");
    collapse.type = "button";
    collapse.title = this.indexCollapsed ? "Open subjects" : "Collapse subjects";
    collapse.setAttribute("aria-label", collapse.title);
    collapse.innerHTML = createIconSvg("collapse");
    collapse.addEventListener("click", () => {
      this.indexCollapsed = !this.indexCollapsed;
      this.persistSettings();
      this.render();
    });
    header.append(title, collapse);
    const groups = createElement(this.document, "div", "equation-mapping-index-groups");
    groupEquationMapDocumentsBySubject(this.documents).forEach(([subject, entries]) => {
      const group = createElement(this.document, "section", "equation-mapping-index-group");
      group.append(createElement(this.document, "h2", "", subject));
      entries.forEach((entry) => {
        const button = createElement(this.document, "button", "equation-mapping-index-item");
        button.type = "button";
        button.classList.toggle("is-active", entry.id === this.activeDocument.id);
        button.append(createElement(this.document, "span", "", entry.title));
        button.addEventListener("click", () => this.setActiveDocument(entry.id));
        group.append(button);
      });
      groups.append(group);
    });
    index.append(header, groups);
    return index;
  }

  renderCanvas() {
    const canvas = createElement(this.document, "main", "equation-mapping-canvas");
    canvas.append(this.renderControls(), this.renderStage());
    return canvas;
  }

  renderControls() {
    const controls = createElement(this.document, "div", "equation-mapping-controls");
    controls.append(
      this.renderIconButton("home", "Go to home", () => {
        this.window?.location?.assign?.(createEquationMappingHomeHref(this.window));
      }),
      this.renderIconButton("search", "Search equations", () => {
        this.searchOpen = !this.searchOpen;
        this.settingsOpen = false;
        this.editorOpen = false;
        this.render();
      }, this.searchOpen),
      this.renderIconButton("edit", "Edit map", () => {
        this.editorOpen = !this.editorOpen;
        this.searchOpen = false;
        this.settingsOpen = false;
        this.render();
      }, this.editorOpen),
      this.renderIconButton("settings", "Canvas settings", () => {
        this.settingsOpen = !this.settingsOpen;
        this.searchOpen = false;
        this.editorOpen = false;
        this.render();
      }, this.settingsOpen)
    );
    if (this.searchOpen) {
      controls.append(this.renderSearchPanel());
    }
    if (this.editorOpen) {
      controls.append(this.renderEditorPanel());
    }
    if (this.settingsOpen) {
      controls.append(this.renderSettingsPanel());
    }
    return controls;
  }

  renderIconButton(iconName, label, onClick, active = false) {
    const button = createElement(this.document, "button", "equation-mapping-icon-button");
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.classList.toggle("is-active", active);
    button.innerHTML = createIconSvg(iconName);
    button.addEventListener("click", onClick);
    return button;
  }

  renderSearchPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-search-panel");
    panel.setAttribute("aria-label", "Search equations");
    const input = createElement(this.document, "input", "equation-mapping-search-input");
    input.type = "search";
    input.placeholder = "Search equations";
    input.value = this.searchQuery;
    input.addEventListener("input", () => {
      this.searchQuery = input.value;
      this.render();
    });
    const results = createElement(this.document, "div", "equation-mapping-search-results");
    filterEquationMapDocuments(this.documents, this.searchQuery).forEach((entry) => {
      const button = createElement(this.document, "button", "equation-mapping-search-result");
      button.type = "button";
      button.append(
        createElement(this.document, "strong", "", entry.title),
        createElement(this.document, "span", "", entry.subject)
      );
      button.addEventListener("click", () => {
        this.searchOpen = false;
        this.setActiveDocument(entry.id);
      });
      results.append(button);
    });
    if (!results.childElementCount) {
      results.append(createElement(this.document, "p", "equation-mapping-empty", "No equations found."));
    }
    panel.append(input, results);
    setTimeout(() => input.focus?.(), 0);
    return panel;
  }

  renderEditorPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-editor-panel");
    panel.setAttribute("aria-label", "Edit equation map");
    const header = createElement(this.document, "header", "equation-mapping-editor-panel-header");
    header.append(createElement(this.document, "strong", "", "Edit map"));
    const resetButton = this.renderEditorAction("Reset draft", () => this.resetDocumentDrafts(), "secondary");
    header.append(resetButton);
    panel.append(header, this.renderAnchorEditor(), this.renderOverlayEditor());
    return panel;
  }

  renderAnchorEditor() {
    const section = createElement(this.document, "section", "equation-mapping-editor-section");
    const header = createElement(this.document, "header", "equation-mapping-editor-section-header");
    header.append(createElement(this.document, "strong", "", "Formula sections"));
    header.append(this.renderEditorAction("Add section", () => this.addAnchor()));
    const activeAnchor = this.activeAnchor;
    const selector = this.renderEditorSelect(
      "Section",
      "anchor-select",
      activeAnchor?.id ?? "",
      this.activeDocument.anchors.map((anchor) => ({ value: anchor.id, label: anchor.label }))
    );
    selector.querySelector("select")?.addEventListener("change", (event) => this.setActiveAnchor(event.target.value));
    const fields = createElement(this.document, "div", "equation-mapping-editor-grid");
    fields.append(
      this.renderEditorInput("Label", "anchor-label", activeAnchor?.label ?? ""),
      this.renderEditorInput("Formula", "anchor-tex", getFormulaPartTeXForAnchor(this.activeDocument, activeAnchor?.id)),
      this.renderEditorInput("Search text", "anchor-search-text", activeAnchor?.searchText ?? "")
    );
    const actions = createElement(this.document, "div", "equation-mapping-editor-actions");
    actions.append(this.renderEditorAction("Apply section", () => this.applyAnchorEdit(section)));
    section.append(header, selector, fields, actions);
    return section;
  }

  renderOverlayEditor() {
    const section = createElement(this.document, "section", "equation-mapping-editor-section");
    const header = createElement(this.document, "header", "equation-mapping-editor-section-header");
    header.append(createElement(this.document, "strong", "", "Comments"));
    header.append(this.renderEditorAction("Add comment", () => this.addOverlay()));
    const activeOverlay = this.activeOverlay;
    const contentDraft = getOverlayContentDraft(activeOverlay ?? {});
    const selector = this.renderEditorSelect(
      "Comment",
      "overlay-select",
      activeOverlay?.id ?? "",
      this.activeDocument.overlays.map((overlay) => ({ value: overlay.id, label: overlay.title }))
    );
    selector.querySelector("select")?.addEventListener("change", (event) => this.setActiveOverlay(event.target.value));
    const fields = createElement(this.document, "div", "equation-mapping-editor-grid");
    fields.append(
      this.renderEditorInput("Title", "overlay-title", activeOverlay?.title ?? ""),
      this.renderEditorSelect(
        "Target",
        "overlay-target",
        activeOverlay?.targetAnchorId ?? "",
        this.activeDocument.anchors.map((anchor) => ({ value: anchor.id, label: anchor.label }))
      ),
      this.renderEditorSelect("Line", "overlay-line", activeOverlay?.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT, [
        { value: "above", label: "above" },
        { value: "below", label: "below" },
      ]),
      this.renderEditorInput("Left", "overlay-x", activeOverlay?.position?.x ?? 18, "number"),
      this.renderEditorInput("Top", "overlay-y", activeOverlay?.position?.y ?? 32, "number"),
      this.renderEditorInput("Width", "overlay-width", activeOverlay?.position?.width ?? 26, "number"),
      this.renderEditorTextarea("Text", "overlay-text", contentDraft.text),
      this.renderEditorTextarea("Equation", "overlay-math", contentDraft.mathTex)
    );
    const actions = createElement(this.document, "div", "equation-mapping-editor-actions");
    actions.append(this.renderEditorAction("Apply comment", () => this.applyOverlayEdit(section)));
    section.append(header, selector, fields, actions);
    return section;
  }

  renderEditorInput(labelText, name, value, type = "text") {
    const label = createElement(this.document, "label", "equation-mapping-editor-field");
    label.append(createElement(this.document, "span", "", labelText));
    const input = createElement(this.document, "input", "equation-mapping-editor-input");
    input.name = name;
    input.type = type;
    input.value = String(value ?? "");
    if (type === "number") {
      input.step = "1";
    }
    label.append(input);
    return label;
  }

  renderEditorTextarea(labelText, name, value) {
    const label = createElement(this.document, "label", "equation-mapping-editor-field equation-mapping-editor-field-wide");
    label.append(createElement(this.document, "span", "", labelText));
    const textarea = createElement(this.document, "textarea", "equation-mapping-editor-textarea");
    textarea.name = name;
    textarea.rows = 3;
    textarea.value = String(value ?? "");
    label.append(textarea);
    return label;
  }

  renderEditorSelect(labelText, name, value, options) {
    const label = createElement(this.document, "label", "equation-mapping-editor-field");
    label.append(createElement(this.document, "span", "", labelText));
    const select = createElement(this.document, "select", "equation-mapping-editor-select");
    select.name = name;
    options.forEach((option) => {
      const element = createElement(this.document, "option", "", option.label);
      element.value = option.value;
      element.selected = option.value === value;
      select.append(element);
    });
    label.append(select);
    return label;
  }

  renderEditorAction(label, onClick, tone = "primary") {
    const button = createElement(this.document, "button", `equation-mapping-editor-action is-${tone}`, label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  renderSettingsPanel() {
    const panel = createElement(this.document, "section", "equation-mapping-popover equation-mapping-settings-panel");
    panel.setAttribute("aria-label", "Canvas settings");
    const colorRow = createElement(this.document, "div", "equation-mapping-settings-row");
    colorRow.append(createElement(this.document, "span", "equation-mapping-settings-label", "Background"));
    const swatches = createElement(this.document, "div", "equation-mapping-swatches");
    CANVAS_COLORS.forEach((entry) => {
      const button = createElement(this.document, "button", "equation-mapping-swatch");
      button.type = "button";
      button.title = entry.label;
      button.setAttribute("aria-label", entry.label);
      button.dataset.colorId = entry.id;
      button.classList.toggle("is-active", entry.id === this.backgroundId);
      button.style.background = entry.color;
      button.addEventListener("click", () => {
        this.backgroundId = entry.id;
        this.persistSettings();
        this.render();
      });
      swatches.append(button);
    });
    colorRow.append(swatches);
    panel.append(
      colorRow,
      this.renderSegmentedSetting("Equation", ["small", "medium", "large"], this.equationScale, (value) => {
        this.equationScale = normalizeEquationScale(value);
        this.persistSettings();
        this.render();
      }),
      this.renderSegmentedSetting("Comment size", ["small", "medium", "large"], this.commentFontSize, (value) => {
        this.commentFontSize = normalizeCommentFontSize(value);
        this.persistSettings();
        this.render();
      })
    );
    return panel;
  }

  renderSegmentedSetting(label, values, activeValue, onSelect) {
    const row = createElement(this.document, "div", "equation-mapping-settings-row");
    row.append(createElement(this.document, "span", "equation-mapping-settings-label", label));
    const group = createElement(this.document, "div", "equation-mapping-segmented");
    values.forEach((value) => {
      const button = createElement(this.document, "button", "equation-mapping-segment");
      button.type = "button";
      button.textContent = value;
      button.classList.toggle("is-active", value === activeValue);
      button.addEventListener("click", () => onSelect(value));
      group.append(button);
    });
    row.append(group);
    return row;
  }

  renderStage() {
    const stage = createElement(this.document, "section", "equation-mapping-stage");
    stage.setAttribute("aria-label", this.activeDocument.title);
    this.stageElement = stage;
    const pointerSvg = createSvgElement(this.document, "svg");
    pointerSvg.classList.add("equation-mapping-pointer-layer");
    pointerSvg.setAttribute("aria-hidden", "true");
    this.pointerSvg = pointerSvg;
    stage.append(pointerSvg, this.renderEquation(), this.renderOverlayLayer());
    return stage;
  }

  renderEquation() {
    const document = this.activeDocument;
    const equationShell = createElement(this.document, "div", "equation-mapping-equation-shell");
    const title = createElement(this.document, "div", "equation-mapping-equation-title");
    title.append(createElement(this.document, "strong", "", document.title));
    const equation = createElement(this.document, "div", "equation-mapping-equation");
    equation.setAttribute("role", "img");
    equation.setAttribute("aria-label", document.formulaTeX);
    const activeTargetId = this.activeOverlay?.targetAnchorId ?? "";
    const targetPlacementByAnchor = new Map(
      document.overlays.map((overlay) => [
        overlay.targetAnchorId,
        overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT,
      ])
    );
    document.formulaParts.forEach((part) => {
      const partElement = createElement(
        this.document,
        "span",
        part.kind === "text" ? "equation-mapping-formula-text" : "equation-mapping-formula-part"
      );
      if (part.anchorId) {
        partElement.dataset.anchorId = part.anchorId;
        this.anchorElements.set(part.anchorId, partElement);
        if (targetPlacementByAnchor.has(part.anchorId)) {
          partElement.classList.add("is-targeted");
          partElement.dataset.sectionLine = targetPlacementByAnchor.get(part.anchorId);
        }
        if (part.anchorId === activeTargetId) {
          partElement.classList.add("is-active-target");
        }
        if (part.anchorId === this.activeAnchor?.id) {
          partElement.classList.add("is-editor-selected-anchor");
        }
      }
      if (part.kind === "text") {
        partElement.textContent = part.text;
      } else {
        renderMath(this.window, partElement, part.tex);
      }
      equation.append(partElement);
    });
    equationShell.append(title, equation);
    return equationShell;
  }

  renderOverlayLayer() {
    const layer = createElement(this.document, "div", "equation-mapping-overlay-layer");
    this.activeDocument.overlays.forEach((overlay) => {
      const comment = createElement(this.document, "article", "equation-mapping-comment");
      comment.dataset.overlayId = overlay.id;
      comment.classList.toggle("is-active", overlay.id === this.activeOverlay?.id);
      comment.style.setProperty("--overlay-x", String(overlay.position.x));
      comment.style.setProperty("--overlay-y", String(overlay.position.y));
      comment.style.setProperty("--overlay-width", String(overlay.position.width));
      const header = createElement(this.document, "header", "equation-mapping-comment-header");
      header.append(createElement(this.document, "strong", "", overlay.title));
      const body = createElement(this.document, "div", "equation-mapping-comment-body");
      overlay.content.forEach((block) => {
        if (block.type === "math") {
          const mathElement = createElement(this.document, block.displayMode ? "div" : "span", "equation-mapping-comment-math");
          renderMath(this.window, mathElement, block.tex, { displayMode: block.displayMode });
          body.append(mathElement);
        } else {
          body.append(createElement(this.document, "p", "", block.text));
        }
      });
      comment.append(header, body);
      comment.addEventListener("click", () => this.setActiveOverlay(overlay.id));
      this.overlayElements.set(overlay.id, comment);
      layer.append(comment);
    });
    return layer;
  }

  schedulePointerUpdate() {
    const run = () => this.updatePointerLines();
    if (typeof this.window?.requestAnimationFrame === "function") {
      this.window.requestAnimationFrame(run);
      return;
    }
    run();
  }

  updatePointerLines() {
    if (!this.stageElement || !this.pointerSvg) {
      return [];
    }
    const stageRect = this.stageElement.getBoundingClientRect();
    this.pointerSvg.setAttribute("viewBox", `0 0 ${Math.max(stageRect.width, 1)} ${Math.max(stageRect.height, 1)}`);
    this.pointerSvg.textContent = "";
    this.pointerLines = [];
    this.activeDocument.overlays.forEach((overlay) => {
      const anchorElement = this.anchorElements.get(overlay.targetAnchorId);
      const commentElement = this.overlayElements.get(overlay.id);
      if (!anchorElement || !commentElement) {
        return;
      }
      const geometry = createPointerLineGeometry(
        stageRect,
        anchorElement.getBoundingClientRect(),
        commentElement.getBoundingClientRect(),
        overlay.sectionLinePlacement ?? DEFAULT_SECTION_LINE_PLACEMENT
      );
      const line = createSvgElement(this.document, "line");
      line.classList.add("equation-mapping-pointer-line");
      line.classList.toggle("is-active", overlay.id === this.activeOverlay?.id);
      line.setAttribute("x1", String(geometry.x1));
      line.setAttribute("y1", String(geometry.y1));
      line.setAttribute("x2", String(geometry.x2));
      line.setAttribute("y2", String(geometry.y2));
      this.pointerSvg.append(line);
      this.pointerLines.push({ overlayId: overlay.id, targetAnchorId: overlay.targetAnchorId, ...geometry });
    });
    return this.pointerLines;
  }
}
