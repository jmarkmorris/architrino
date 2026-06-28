export const RING_LAYOUT_DEFAULTS = Object.freeze({
  haloScale: 1.18,
  guardBandMin: 0.15,
  guardBandRatio: 0.08,
  startAngle: Math.PI / 2,
  direction: "counterclockwise",
  order: "objects",
});

export function getRingGuardBand(size) {
  const numericSize = Number.isFinite(size) && size > 0 ? size : 0;
  return Math.max(
    RING_LAYOUT_DEFAULTS.guardBandMin,
    numericSize * RING_LAYOUT_DEFAULTS.guardBandRatio
  );
}

export function normalizeRingDirection(value, fallback = RING_LAYOUT_DEFAULTS.direction) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (normalized === "clockwise" || normalized === "counterclockwise") {
    return normalized;
  }
  return fallback === "clockwise" ? "clockwise" : RING_LAYOUT_DEFAULTS.direction;
}

export function getRingDirectionSign(direction) {
  return normalizeRingDirection(direction) === "clockwise" ? -1 : 1;
}

export function normalizeRingOrder(value, fallback = RING_LAYOUT_DEFAULTS.order) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (normalized === "objects") {
    return normalized;
  }
  return fallback === "objects" ? "objects" : RING_LAYOUT_DEFAULTS.order;
}

export function normalizeRingCenterNode(value) {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length ? normalized : null;
}

export function normalizeRingLayoutOptions(layoutConfig = null, fallback = {}) {
  const config =
    layoutConfig && typeof layoutConfig === "object" && !Array.isArray(layoutConfig)
      ? layoutConfig
      : {};
  const explicitCenterMode =
    config.centerMode === "none" || config.centerMode === "node" || config.centerMode === "auto"
      ? config.centerMode
      : null;
  const hasCenterNode = Object.prototype.hasOwnProperty.call(config, "centerNode");
  const centerOn = hasCenterNode
    ? normalizeRingCenterNode(config.centerNode)
    : normalizeRingCenterNode(config.centerOn ?? fallback.centerOn);
  const centerMode =
    explicitCenterMode ??
    (hasCenterNode && config.centerNode === null ? "none" : centerOn ? "node" : "auto");
  return {
    centerMode,
    centerOn: centerMode === "none" ? null : centerOn,
    direction: normalizeRingDirection(config.direction, fallback.direction),
    order: normalizeRingOrder(config.order, fallback.order),
    allowInnerRings:
      typeof config.allowInnerRings === "boolean"
        ? config.allowInnerRings
        : typeof fallback.allowInnerRings === "boolean"
          ? fallback.allowInnerRings
          : true,
  };
}
