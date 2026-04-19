export function createAnimatorViewportOverlayPillRuntime(options = {}) {
  const THREE = options.THREE;
  const documentLike = options.documentLike ?? globalThis.document;
  const HTMLInputElementCtor = options.HTMLInputElementCtor ?? globalThis.HTMLInputElement;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const samplePath = typeof options.samplePath === "function" ? options.samplePath : () => [];
  const formatTimeLabel =
    typeof options.formatTimeLabel === "function" ? options.formatTimeLabel : (value) => `${value}`;
  const getPlaybackTimeForMotionProgress =
    typeof options.getPlaybackTimeForMotionProgress === "function"
      ? options.getPlaybackTimeForMotionProgress
      : () => 0;
  const getViewportOverlays =
    typeof options.getViewportOverlays === "function" ? options.getViewportOverlays : () => null;
  const getCanvasWrap =
    typeof options.getCanvasWrap === "function" ? options.getCanvasWrap : () => null;
  const getCamera = typeof options.getCamera === "function" ? options.getCamera : () => null;
  const getFrameGroup =
    typeof options.getFrameGroup === "function" ? options.getFrameGroup : () => null;
  const getOverlay = typeof options.getOverlay === "function" ? options.getOverlay : () => null;
  const getCameraFlightState =
    typeof options.getCameraFlightState === "function"
      ? options.getCameraFlightState
      : () => ({ preview: false });
  const getViewportModeState =
    typeof options.getViewportModeState === "function"
      ? options.getViewportModeState
      : () => ({ cameraSource: "design" });
  const getSelectedPointIndexState =
    typeof options.getSelectedPointIndexState === "function"
      ? options.getSelectedPointIndexState
      : () => null;
  const setSelectedPointIndexState =
    typeof options.setSelectedPointIndexState === "function"
      ? options.setSelectedPointIndexState
      : () => {};
  const getPathState =
    typeof options.getPathState === "function" ? options.getPathState : () => ({ points: [] });
  const getPointMeshes =
    typeof options.getPointMeshes === "function" ? options.getPointMeshes : () => [];
  const updatePointMaterials =
    typeof options.updatePointMaterials === "function" ? options.updatePointMaterials : () => {};
  const updateCameraPoiStatus =
    typeof options.updateCameraPoiStatus === "function"
      ? options.updateCameraPoiStatus
      : () => {};
  const updatePathPointAtState =
    typeof options.updatePathPointAtState === "function"
      ? options.updatePathPointAtState
      : () => {};
  const updatePathGeometry =
    typeof options.updatePathGeometry === "function" ? options.updatePathGeometry : () => {};
  const renderJsonPreview =
    typeof options.renderJsonPreview === "function" ? options.renderJsonPreview : () => {};
  const getCurrentDocument =
    typeof options.getCurrentDocument === "function" ? options.getCurrentDocument : () => null;

  let animatorPathPointInfoPill = null;

  function isVector3(value) {
    if (!value) {
      return false;
    }
    if (THREE?.Vector3 && value instanceof THREE.Vector3) {
      return true;
    }
    return (
      typeof value.x === "number" &&
      typeof value.y === "number" &&
      typeof value.z === "number"
    );
  }

  function formatAnimatorCoordinatePillValue(value) {
    const normalized = Number(value);
    if (!Number.isFinite(normalized)) {
      return "0";
    }
    const fixed = normalized.toFixed(3);
    return fixed.replace(/\.?0+$/, "");
  }

  function syncAnimatorPathPointInfoPillCoordinateInputs(point, { force = false } = {}) {
    if (!animatorPathPointInfoPill?.inputs || !isVector3(point)) {
      return;
    }
    ["x", "y", "z"].forEach((axis) => {
      const input = animatorPathPointInfoPill.inputs[axis];
      if (HTMLInputElementCtor && !(input instanceof HTMLInputElementCtor)) {
        return;
      }
      if (!force && documentLike?.activeElement === input) {
        return;
      }
      input.value = formatAnimatorCoordinatePillValue(point[axis]);
    });
  }

  function commitAnimatorPathPointCoordinateInput(axis, rawValue) {
    if (!["x", "y", "z"].includes(axis)) {
      return;
    }
    const pathState = getPathState();
    const pointIndex = getSelectedPointIndexState();
    if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= pathState.points.length) {
      return;
    }
    const nextValue = Number(rawValue);
    if (!Number.isFinite(nextValue)) {
      return;
    }
    updatePathPointAtState(pointIndex, (point) => {
      point[axis] = nextValue;
    });
    const nextPathState = getPathState();
    const pointMeshes = getPointMeshes();
    if (pointMeshes[pointIndex] && nextPathState.points[pointIndex]) {
      pointMeshes[pointIndex].position.copy(nextPathState.points[pointIndex]);
    }
    updatePathGeometry();
    renderJsonPreview();
    updateAnimatorPathPointInfoPill();
  }

  function clearAnimatorSelectedPoint(options = {}) {
    const { hidePill = true } = options;
    const selectedPointIndex = getSelectedPointIndexState();
    if (selectedPointIndex != null) {
      setSelectedPointIndexState(null);
      updatePointMaterials();
      updateCameraPoiStatus();
    }
    if (hidePill) {
      hideAnimatorPathPointInfoPill();
    }
  }

  function ensureAnimatorPathPointInfoPill() {
    const animatorViewportOverlays = getViewportOverlays();
    if (!animatorViewportOverlays || !documentLike) {
      return null;
    }
    if (animatorPathPointInfoPill?.element?.isConnected) {
      return animatorPathPointInfoPill;
    }
    const element = documentLike.createElement("div");
    element.className = "animator-path-point-pill";
    element.setAttribute("aria-hidden", "true");

    const grid = documentLike.createElement("div");
    grid.className = "animator-path-point-pill-grid";
    element.appendChild(grid);

    const inputs = {};
    let timeValue = null;
    ["t", "x", "y", "z"].forEach((key) => {
      const field = documentLike.createElement("div");
      field.className = "animator-path-point-pill-field";
      const label = documentLike.createElement("div");
      label.className = "animator-path-point-pill-label";
      label.textContent = key.toUpperCase();
      let value = null;
      if (key === "t") {
        value = documentLike.createElement("div");
        value.className = "animator-path-point-pill-value";
        value.textContent = "0";
        timeValue = value;
      } else {
        value = documentLike.createElement("input");
        value.type = "number";
        value.step = "0.001";
        value.inputMode = "decimal";
        value.className = "animator-path-point-pill-input";
        value.setAttribute("aria-label", `${key.toUpperCase()} coordinate`);
        value.value = "0";
        value.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
        });
        value.addEventListener("click", (event) => {
          event.stopPropagation();
        });
        value.addEventListener("keydown", (event) => {
          event.stopPropagation();
          if (event.key === "Enter") {
            value.blur();
          }
        });
        value.addEventListener("input", () => {
          commitAnimatorPathPointCoordinateInput(key, value.value);
        });
        value.addEventListener("blur", () => {
          const pathState = getPathState();
          const pointIndex = getSelectedPointIndexState();
          const point =
            Number.isInteger(pointIndex) && pointIndex >= 0
              ? pathState.points[pointIndex] ?? null
              : null;
          if (!point) {
            value.value = "0";
            return;
          }
          if (!Number.isFinite(Number(value.value))) {
            value.value = formatAnimatorCoordinatePillValue(point[key]);
            return;
          }
          value.value = formatAnimatorCoordinatePillValue(point[key]);
        });
        inputs[key] = value;
      }
      field.append(label, value);
      grid.appendChild(field);
    });

    animatorViewportOverlays.appendChild(element);
    animatorPathPointInfoPill = { element, inputs, timeValue };
    return animatorPathPointInfoPill;
  }

  function hideAnimatorPathPointInfoPill() {
    const pill = animatorPathPointInfoPill?.element;
    if (!pill) {
      return;
    }
    pill.classList.remove("is-visible");
    pill.setAttribute("aria-hidden", "true");
  }

  function projectAnimatorLocalPointToViewport(localPoint) {
    const animatorCanvasWrap = getCanvasWrap();
    const animatorCamera = getCamera();
    const animatorFrameGroup = getFrameGroup();
    if (!animatorCanvasWrap || !animatorCamera || !animatorFrameGroup || !isVector3(localPoint)) {
      return null;
    }
    const worldPoint = animatorFrameGroup.localToWorld(localPoint.clone());
    const projected = worldPoint.project(animatorCamera);
    if (projected.z < -1 || projected.z > 1) {
      return null;
    }
    const rect = animatorCanvasWrap.getBoundingClientRect();
    return {
      x: ((projected.x + 1) * 0.5) * rect.width,
      y: ((1 - projected.y) * 0.5) * rect.height,
    };
  }

  function getAnimatorPathPointNormalizedTime(pointIndex) {
    const pathState = getPathState();
    if (!Number.isInteger(pointIndex) || pointIndex < 0 || pointIndex >= pathState.points.length) {
      return 0;
    }
    if (pathState.points.length <= 1) {
      return 0;
    }
    const target = pathState.points[pointIndex];
    const sampledPoints = samplePath(
      pathState.points,
      pathState.interpolate ?? "spline",
      !!pathState.closed
    );
    if (sampledPoints.length <= 1) {
      return 0;
    }

    let bestIndex = 0;
    let bestDistanceSq = Infinity;
    sampledPoints.forEach((sample, sampleIndex) => {
      const distanceSq = sample.distanceToSquared(target);
      if (distanceSq < bestDistanceSq) {
        bestDistanceSq = distanceSq;
        bestIndex = sampleIndex;
      }
    });

    let totalLength = 0;
    let lengthToBest = 0;
    for (let index = 1; index < sampledPoints.length; index += 1) {
      const segmentLength = sampledPoints[index].distanceTo(sampledPoints[index - 1]);
      totalLength += segmentLength;
      if (index <= bestIndex) {
        lengthToBest += segmentLength;
      }
    }
    if (totalLength <= 0.000001) {
      return 0;
    }
    return clampFn(lengthToBest / totalLength, 0, 1);
  }

  function updateAnimatorPathPointInfoPill() {
    const pill = ensureAnimatorPathPointInfoPill();
    const animatorOverlay = getOverlay();
    const animatorCameraFlightState = getCameraFlightState();
    const animatorViewportModeState = getViewportModeState();
    if (
      !pill ||
      !animatorOverlay?.classList.contains("is-open") ||
      animatorCameraFlightState.preview ||
      animatorViewportModeState.cameraSource === "authored"
    ) {
      hideAnimatorPathPointInfoPill();
      return;
    }
    const pathState = getPathState();
    const pointIndex = getSelectedPointIndexState();
    const point =
      Number.isInteger(pointIndex) && pointIndex >= 0 ? pathState.points[pointIndex] ?? null : null;
    if (!point) {
      hideAnimatorPathPointInfoPill();
      return;
    }
    const projected = projectAnimatorLocalPointToViewport(point);
    if (!projected) {
      hideAnimatorPathPointInfoPill();
      return;
    }
    const normalizedT = getAnimatorPathPointNormalizedTime(pointIndex);
    const animatorCurrentDocument = getCurrentDocument();
    const absoluteTime = animatorCurrentDocument
      ? getPlaybackTimeForMotionProgress(animatorCurrentDocument, normalizedT)
      : 0;

    if (pill.timeValue) {
      pill.timeValue.textContent = formatTimeLabel(absoluteTime);
    }
    syncAnimatorPathPointInfoPillCoordinateInputs(point);
    pill.element.style.left = `${projected.x}px`;
    pill.element.style.top = `${projected.y}px`;
    pill.element.classList.add("is-visible");
    pill.element.setAttribute("aria-hidden", "false");
  }

  return {
    clearAnimatorSelectedPoint,
    hideAnimatorPathPointInfoPill,
    updateAnimatorPathPointInfoPill,
  };
}
