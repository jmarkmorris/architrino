export const XYZZY_SCHEMA = "xyzzy/v1";
export const XYZZY_STRIP_COLUMN_COUNT = 20;
export const XYZZY_ASSEMBLY_WIDTH = 4;
export const XYZZY_ASSEMBLY_HEIGHT = 1;
export const XYZZY_OPERATOR_WIDTH = 1;
export const XYZZY_OPERATOR_HEIGHT = 1;
export const XYZZY_RESERVED_COLUMNS = Object.freeze([1, 20]);
export const XYZZY_OPERATOR_COLUMNS = Object.freeze([7, 14]);
export const XYZZY_COMPOSITE_LABEL_COLUMNS = Object.freeze([1, 20]);
export const XYZZY_ASSEMBLY_ROLES = Object.freeze(["reactant", "intermediate", "product"]);
export const XYZZY_TILE_KINDS = Object.freeze([
  "title",
  "binary",
  "free-electrino",
  "free-positrino",
  "ledger",
]);

export const XYZZY_OBJECT_BANDS = Object.freeze([
  Object.freeze({
    id: "reactant",
    objectKind: "assembly",
    role: "reactant",
    bandIndex: 0,
    columnStart: 2,
    columnEnd: 5,
  }),
  Object.freeze({
    id: "operator_left",
    objectKind: "operator",
    bandIndex: 1,
    columnStart: 7,
    columnEnd: 7,
  }),
  Object.freeze({
    id: "intermediate",
    objectKind: "assembly",
    role: "intermediate",
    bandIndex: 2,
    columnStart: 9,
    columnEnd: 12,
  }),
  Object.freeze({
    id: "operator_right",
    objectKind: "operator",
    bandIndex: 3,
    columnStart: 14,
    columnEnd: 14,
  }),
  Object.freeze({
    id: "product",
    objectKind: "assembly",
    role: "product",
    bandIndex: 4,
    columnStart: 16,
    columnEnd: 19,
  }),
]);

export const XYZZY_ROUTING_COLUMNS = Object.freeze([
  Object.freeze({
    leftBandId: "reactant",
    rightBandId: "operator_left",
    routingColumn: 6,
  }),
  Object.freeze({
    leftBandId: "operator_left",
    rightBandId: "intermediate",
    routingColumn: 8,
  }),
  Object.freeze({
    leftBandId: "intermediate",
    rightBandId: "operator_right",
    routingColumn: 13,
  }),
  Object.freeze({
    leftBandId: "operator_right",
    rightBandId: "product",
    routingColumn: 15,
  }),
]);

export function getXyzzyObjectBandById(bandId = "") {
  const normalizedBandId = String(bandId ?? "").trim();
  return XYZZY_OBJECT_BANDS.find((band) => band.id === normalizedBandId) ?? null;
}

export function getXyzzyRoutingBand(leftBandId = "", rightBandId = "") {
  const normalizedLeftBandId = String(leftBandId ?? "").trim();
  const normalizedRightBandId = String(rightBandId ?? "").trim();
  return (
    XYZZY_ROUTING_COLUMNS.find(
      (entry) => entry.leftBandId === normalizedLeftBandId && entry.rightBandId === normalizedRightBandId
    ) ?? null
  );
}
