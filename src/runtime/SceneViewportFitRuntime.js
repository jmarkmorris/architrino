export const DEFAULT_SCENE_VIEWPORT_FIT_MARGIN = 0.94;

export function isPointWithinSceneInteractionBounds({
  clientX,
  clientY,
  paddingPx = 0,
  fitMode = "focus",
  canvasRect,
  focusMetrics,
} = {}) {
  const x = Number(clientX);
  const y = Number(clientY);
  const padding = Math.max(0, Number(paddingPx) || 0);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return false;
  }

  if (fitMode === "viewport") {
    const left = Number(canvasRect?.left) + padding;
    const right = Number(canvasRect?.right) - padding;
    const top = Number(canvasRect?.top) + padding;
    const bottom = Number(canvasRect?.bottom) - padding;
    return (
      Number.isFinite(left) &&
      Number.isFinite(right) &&
      Number.isFinite(top) &&
      Number.isFinite(bottom) &&
      x >= left &&
      x <= right &&
      y >= top &&
      y <= bottom
    );
  }

  const centerX = Number(focusMetrics?.centerX);
  const centerY = Number(focusMetrics?.centerY);
  const radius = Math.max(0, Number(focusMetrics?.radius) - padding);
  if (!Number.isFinite(centerX) || !Number.isFinite(centerY) || !Number.isFinite(radius)) {
    return false;
  }
  const dx = x - centerX;
  const dy = y - centerY;
  return dx * dx + dy * dy <= radius * radius;
}

export function resolveSceneViewportFitMargin(value, fallback = DEFAULT_SCENE_VIEWPORT_FIT_MARGIN) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return fallback;
  }
  return Math.min(1, numeric);
}

export function computeCenteredSceneFitZoom({
  safeRadius,
  extentRadius,
  margin = DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
  fallbackZoom = 1,
} = {}) {
  const resolvedSafeRadius = Number(safeRadius);
  const resolvedExtentRadius = Number(extentRadius);
  if (
    !Number.isFinite(resolvedSafeRadius) ||
    !Number.isFinite(resolvedExtentRadius) ||
    resolvedSafeRadius <= 0 ||
    resolvedExtentRadius <= 0
  ) {
    return fallbackZoom;
  }
  return (resolvedSafeRadius * resolveSceneViewportFitMargin(margin)) / resolvedExtentRadius;
}

export function computeBoundsSceneFitZoom({
  safeWidth,
  safeHeight,
  sizeX,
  sizeY,
  margin = DEFAULT_SCENE_VIEWPORT_FIT_MARGIN,
  fallbackZoom = 1,
} = {}) {
  const resolvedSafeWidth = Number(safeWidth);
  const resolvedSafeHeight = Number(safeHeight);
  const resolvedSizeX = Number(sizeX);
  const resolvedSizeY = Number(sizeY);
  if (
    !Number.isFinite(resolvedSafeWidth) ||
    !Number.isFinite(resolvedSafeHeight) ||
    !Number.isFinite(resolvedSizeX) ||
    !Number.isFinite(resolvedSizeY) ||
    resolvedSafeWidth <= 0 ||
    resolvedSafeHeight <= 0 ||
    resolvedSizeX <= 0 ||
    resolvedSizeY <= 0
  ) {
    return fallbackZoom;
  }
  const resolvedMargin = resolveSceneViewportFitMargin(margin);
  const zoomX = (resolvedSafeWidth * resolvedMargin) / Math.max(resolvedSizeX, 0.01);
  const zoomY = (resolvedSafeHeight * resolvedMargin) / Math.max(resolvedSizeY, 0.01);
  return Math.min(zoomX, zoomY);
}
