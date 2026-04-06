import { XYZZY_STRIP_COLUMN_COUNT } from "./XyzzyConstants.js";
import { buildXyzzySplinePathData } from "./XyzzySurfaceLayoutRuntime.js";

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function classifyColumn(columnNumber = 0) {
  if (columnNumber === 1 || columnNumber === 20) {
    return "is-reserved";
  }
  if (columnNumber === 6 || columnNumber === 8 || columnNumber === 13 || columnNumber === 15) {
    return "is-routing";
  }
  if (columnNumber === 7 || columnNumber === 14) {
    return "is-operator-band";
  }
  if (columnNumber >= 2 && columnNumber <= 5) {
    return "is-reactant-band";
  }
  if (columnNumber >= 9 && columnNumber <= 12) {
    return "is-intermediate-band";
  }
  if (columnNumber >= 16 && columnNumber <= 19) {
    return "is-product-band";
  }
  return "";
}

function createTileLabel(text = "", className = "") {
  const label = document.createElement("div");
  label.className = className;
  label.textContent = String(text ?? "");
  return label;
}

function createCircleRail(className = "", circleCount = 0) {
  const rail = document.createElement("div");
  rail.className = className;
  for (let index = 0; index < circleCount; index += 1) {
    const circle = document.createElement("span");
    circle.className = "xyzzy-surface-tile-circle";
    rail.appendChild(circle);
  }
  return rail;
}

function createAssemblyTileElement(tile = {}) {
  const tileElement = document.createElement("div");
  tileElement.className = `xyzzy-surface-tile is-${String(tile?.kind ?? "binary").trim() || "binary"}`;
  const tileKind = String(tile?.kind ?? "").trim();

  if (tileKind === "title") {
    tileElement.appendChild(createTileLabel(tile?.text, "xyzzy-surface-tile-title"));
    return tileElement;
  }

  if (tileKind === "binary") {
    const label = String(tile?.text ?? "").trim();
    tileElement.appendChild(createTileLabel(label || " ", "xyzzy-surface-tile-binary"));
    return tileElement;
  }

  if (tileKind === "free-electrino" || tileKind === "free-positrino") {
    tileElement.appendChild(
      createCircleRail(
        `xyzzy-surface-tile-circle-rail ${tileKind === "free-electrino" ? "is-electrino" : "is-positrino"}`,
        Number(tile?.circleCount) || 0
      )
    );
    return tileElement;
  }

  if (tileKind === "ledger") {
    tileElement.appendChild(
      createTileLabel(`P ${Number(tile?.positrinoCount) || 0}`, "xyzzy-surface-tile-ledger-count")
    );
    tileElement.appendChild(
      createTileLabel(`E ${Number(tile?.electrinoCount) || 0}`, "xyzzy-surface-tile-ledger-count")
    );
    return tileElement;
  }

  tileElement.appendChild(createTileLabel(tile?.text, "xyzzy-surface-tile-binary"));
  return tileElement;
}

function createAssemblyElement(object = {}, tileWidth = 0, tileHeight = 0, pendingLinkEndpointId = "", onObjectClick = null) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "xyzzy-surface-object xyzzy-surface-assembly";
  if (pendingLinkEndpointId && pendingLinkEndpointId === object.id) {
    element.classList.add("is-link-pending");
  }
  element.dataset.xyzzyObjectId = object.id;
  element.setAttribute("aria-label", `Assembly ${String(object.title ?? "").trim()}`);
  element.style.left = `${object.leftColumnIndex * tileWidth}px`;
  element.style.top = `${object.topRowIndex * tileHeight}px`;
  element.style.width = `${object.rect.w * tileWidth}px`;
  element.style.height = `${object.rect.h * tileHeight}px`;
  element.style.gridTemplateColumns = `repeat(${object.rect.w}, ${tileWidth}px)`;
  element.addEventListener("click", (event) => {
    onObjectClick?.(object.id, event);
  });

  (Array.isArray(object.tiles) ? object.tiles : []).forEach((tile) => {
    element.appendChild(createAssemblyTileElement(tile));
  });

  return element;
}

function createOperatorElement(object = {}, tileWidth = 0, tileHeight = 0, pendingLinkEndpointId = "", onObjectClick = null) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "xyzzy-surface-object xyzzy-surface-operator";
  if (pendingLinkEndpointId && pendingLinkEndpointId === object.id) {
    element.classList.add("is-link-pending");
  }
  element.dataset.xyzzyObjectId = object.id;
  element.setAttribute("aria-label", `Operator ${String(object.title ?? "").trim()}`);
  element.style.left = `${object.leftColumnIndex * tileWidth}px`;
  element.style.top = `${object.topRowIndex * tileHeight}px`;
  element.style.width = `${object.rect.w * tileWidth}px`;
  element.style.height = `${object.rect.h * tileHeight}px`;
  element.addEventListener("click", (event) => {
    onObjectClick?.(object.id, event);
  });

  element.appendChild(createTileLabel(String(object.positrinoCount ?? "0"), "xyzzy-surface-operator-count is-top"));
  element.appendChild(createTileLabel(object.title, "xyzzy-surface-operator-title"));
  element.appendChild(createTileLabel(String(object.electrinoCount ?? "0"), "xyzzy-surface-operator-count is-bottom"));
  return element;
}

function createCompositeLabelElement(label = {}, tileWidth = 0, tileHeight = 0) {
  const wrapper = document.createElement("div");
  wrapper.className = "xyzzy-surface-composite-label";
  wrapper.style.left = `${(label.column - 1) * tileWidth}px`;
  wrapper.style.top = `${label.topRowIndex * tileHeight}px`;
  wrapper.style.width = `${tileWidth}px`;
  wrapper.style.height = `${(label.bottomRowIndex - label.topRowIndex + 1) * tileHeight}px`;

  const spanLine = document.createElement("div");
  spanLine.className = "xyzzy-surface-composite-span";
  wrapper.appendChild(spanLine);

  const text = document.createElement("div");
  text.className = "xyzzy-surface-composite-text";
  text.textContent = String(label.text ?? "");
  wrapper.appendChild(text);

  return wrapper;
}

export function renderXyzzySurface(options = {}) {
  const {
    root = null,
    layout = null,
    tileWidth = 112,
    tileHeight = 96,
    pendingLinkEndpointId = "",
    onObjectClick = null,
    onLinkClick = null,
  } = options;

  if (!(root instanceof HTMLElement) || !layout) {
    return;
  }

  root.innerHTML = "";
  root.style.setProperty("--xyzzy-tile-width", `${tileWidth}px`);
  root.style.setProperty("--xyzzy-tile-height", `${tileHeight}px`);

  const board = document.createElement("div");
  board.className = "xyzzy-surface-board";
  board.style.width = `${layout.widthInTiles * tileWidth}px`;

  const columnHeader = document.createElement("div");
  columnHeader.className = "xyzzy-surface-column-header";
  columnHeader.style.gridTemplateColumns = `repeat(${XYZZY_STRIP_COLUMN_COUNT}, ${tileWidth}px)`;
  for (let column = 1; column <= XYZZY_STRIP_COLUMN_COUNT; column += 1) {
    const label = document.createElement("div");
    label.className = `xyzzy-surface-column-label ${classifyColumn(column)}`.trim();
    label.textContent = String(column);
    columnHeader.appendChild(label);
  }
  board.appendChild(columnHeader);

  const stage = document.createElement("div");
  stage.className = "xyzzy-surface-stage";
  stage.style.width = `${layout.widthInTiles * tileWidth}px`;
  stage.style.height = `${layout.heightInTiles * tileHeight}px`;

  const backgroundLayer = document.createElement("div");
  backgroundLayer.className = "xyzzy-surface-background-layer";
  for (let rowIndex = 0; rowIndex < layout.rowCount; rowIndex += 1) {
    for (let column = 1; column <= XYZZY_STRIP_COLUMN_COUNT; column += 1) {
      const cell = document.createElement("div");
      cell.className = `xyzzy-surface-grid-cell ${classifyColumn(column)}`.trim();
      cell.style.left = `${(column - 1) * tileWidth}px`;
      cell.style.top = `${rowIndex * tileHeight}px`;
      cell.style.width = `${tileWidth}px`;
      cell.style.height = `${tileHeight}px`;
      backgroundLayer.appendChild(cell);
    }
  }
  stage.appendChild(backgroundLayer);

  const objectLayer = document.createElement("div");
  objectLayer.className = "xyzzy-surface-object-layer";
  layout.objects.forEach((object) => {
    if (object.objectKind === "assembly") {
      objectLayer.appendChild(
        createAssemblyElement(object, tileWidth, tileHeight, pendingLinkEndpointId, onObjectClick)
      );
      return;
    }
    objectLayer.appendChild(
      createOperatorElement(object, tileWidth, tileHeight, pendingLinkEndpointId, onObjectClick)
    );
  });
  stage.appendChild(objectLayer);

  const splineLayer = createSvgElement("svg");
  splineLayer.classList.add("xyzzy-surface-spline-layer");
  splineLayer.setAttribute("viewBox", `0 0 ${layout.widthInTiles * tileWidth} ${layout.heightInTiles * tileHeight}`);
  splineLayer.setAttribute("width", String(layout.widthInTiles * tileWidth));
  splineLayer.setAttribute("height", String(layout.heightInTiles * tileHeight));
  layout.links.forEach((link) => {
    const path = createSvgElement("path");
    path.classList.add("xyzzy-surface-spline");
    path.setAttribute("d", buildXyzzySplinePathData(link, tileWidth, tileHeight));
    path.dataset.xyzzyLinkId = link.id;
    path.addEventListener("click", (event) => {
      onLinkClick?.(link.id, event);
    });
    splineLayer.appendChild(path);
  });
  stage.appendChild(splineLayer);

  const compositeLayer = document.createElement("div");
  compositeLayer.className = "xyzzy-surface-composite-layer";
  layout.compositeLabels.forEach((label) => {
    compositeLayer.appendChild(createCompositeLabelElement(label, tileWidth, tileHeight));
  });
  stage.appendChild(compositeLayer);

  board.appendChild(stage);
  root.appendChild(board);
}
