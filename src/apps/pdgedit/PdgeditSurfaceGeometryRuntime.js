export const PDGEDIT_TILE_SIZE_PX = 80;
export const PDGEDIT_GRID_STRIP_COLUMN_COUNT = 20;
export const PDGEDIT_GRID_STRIP_WIDTH_PX = PDGEDIT_GRID_STRIP_COLUMN_COUNT * PDGEDIT_TILE_SIZE_PX;
export const PDGEDIT_RESERVED_TOP_ROW_COUNT = 1;
export const PDGEDIT_HEADER_BAND_HEIGHT_PX = 80;
export const PDGEDIT_LINK_SLOT_OFFSETS_PX = Object.freeze([0, -6, 6, -12, 12]);

const ASSEMBLY_BAND_X_BY_ROLE = Object.freeze({
  reactant: 2,
  intermediate: 9,
  product: 16,
});

const ROLE_BY_ASSEMBLY_X = Object.freeze({
  2: "reactant",
  9: "intermediate",
  16: "product",
});

const ROUTING_COLUMN_BY_ADJACENT_OBJECT_X = Object.freeze({
  "2:7": 6,
  "7:9": 8,
  "9:14": 13,
  "14:16": 15,
});

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getColumnLeft(column) {
  return (column - 1) * PDGEDIT_TILE_SIZE_PX;
}

function getVisualRowTop(row) {
  return (normalizeInteger(row) + PDGEDIT_RESERVED_TOP_ROW_COUNT) * PDGEDIT_TILE_SIZE_PX;
}

export function getPdgeditAssemblyBandXForRole(role = "") {
  return ASSEMBLY_BAND_X_BY_ROLE[normalizeText(role)] ?? null;
}

export function getPdgeditRoleForAssemblyX(x = 0) {
  return ROLE_BY_ASSEMBLY_X[normalizeInteger(x)] ?? null;
}

export function getPdgeditObjectWidthTiles(object = {}) {
  return normalizeText(object?.kind) === "operator" ? 1 : 4;
}

export function getPdgeditObjectHeightTiles() {
  return 1;
}

export function getPdgeditObjectRect(object = {}) {
  const x = normalizeInteger(object?.x);
  const y = normalizeInteger(object?.y);
  const widthTiles = getPdgeditObjectWidthTiles(object);
  const heightTiles = getPdgeditObjectHeightTiles(object);
  return {
    left: getColumnLeft(x),
    top: getVisualRowTop(y),
    width: widthTiles * PDGEDIT_TILE_SIZE_PX,
    height: heightTiles * PDGEDIT_TILE_SIZE_PX,
    right: getColumnLeft(x) + widthTiles * PDGEDIT_TILE_SIZE_PX,
    bottom: getVisualRowTop(y) + heightTiles * PDGEDIT_TILE_SIZE_PX,
  };
}

export function getPdgeditObjectAnchor(object = {}, side = "left") {
  const rect = getPdgeditObjectRect(object);
  const normalizedSide = normalizeText(side);
  return {
    x: normalizedSide === "right" ? rect.right : rect.left,
    y: rect.top + rect.height / 2,
  };
}

export function getPdgeditRoutingColumnForObjectPair(leftObject = {}, rightObject = {}) {
  const key = `${normalizeInteger(leftObject?.x)}:${normalizeInteger(rightObject?.x)}`;
  return ROUTING_COLUMN_BY_ADJACENT_OBJECT_X[key] ?? null;
}

export function getPdgeditRoutingColumnCenterlineX(column = 0) {
  return getColumnLeft(normalizeInteger(column)) + PDGEDIT_TILE_SIZE_PX / 2;
}

export function getPdgeditLinkSlotOffset(slotIndex = 0) {
  const normalizedIndex = Math.max(0, normalizeInteger(slotIndex));
  return PDGEDIT_LINK_SLOT_OFFSETS_PX[normalizedIndex % PDGEDIT_LINK_SLOT_OFFSETS_PX.length];
}

export function buildPdgeditSplinePath({
  leftObject = {},
  rightObject = {},
  slotOffsetPx = 0,
} = {}) {
  const routingColumn = getPdgeditRoutingColumnForObjectPair(leftObject, rightObject);
  if (!routingColumn) {
    return null;
  }
  const start = getPdgeditObjectAnchor(leftObject, "right");
  const end = getPdgeditObjectAnchor(rightObject, "left");
  const routingSlotY = (start.y + end.y) / 2 + Number(slotOffsetPx || 0);
  const controlPointOneX = start.x + 16;
  const controlPointTwoX = end.x - 16;
  const path = [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${controlPointOneX.toFixed(2)} ${routingSlotY.toFixed(2)},`,
    `${controlPointTwoX.toFixed(2)} ${routingSlotY.toFixed(2)},`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
  return {
    routingColumn,
    path,
    start,
    end,
    routingSlotY,
    routingCenterlineX: getPdgeditRoutingColumnCenterlineX(routingColumn),
  };
}

export function getPdgeditGridCellFromLocalPoint(localX = 0, localY = 0) {
  const column = Math.floor(Number(localX || 0) / PDGEDIT_TILE_SIZE_PX) + 1;
  const visualRow = Math.floor(Number(localY || 0) / PDGEDIT_TILE_SIZE_PX);
  return {
    column,
    visualRow,
    row: visualRow - PDGEDIT_RESERVED_TOP_ROW_COUNT,
  };
}

