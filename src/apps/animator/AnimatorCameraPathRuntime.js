export function createAnimatorCameraPathRuntime(options = {}) {
  const THREE = options.THREE;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const formatScaleLabel =
    typeof options.formatScaleLabel === "function" ? options.formatScaleLabel : (value) => `${value}`;
  const vectorFromTriplet =
    typeof options.vectorFromTriplet === "function"
      ? options.vectorFromTriplet
      : (value) =>
          value instanceof THREE.Vector3
            ? value.clone()
            : new THREE.Vector3(value?.[0] ?? 0, value?.[1] ?? 0, value?.[2] ?? 0);
  const createDefaultPathPoints =
    typeof options.createDefaultPathPoints === "function"
      ? options.createDefaultPathPoints
      : () => [];
  const getSelectedAssembly =
    typeof options.getSelectedAssembly === "function" ? options.getSelectedAssembly : () => null;
  const getSelectedAssemblyLetter =
    typeof options.getSelectedAssemblyLetter === "function"
      ? options.getSelectedAssemblyLetter
      : () => "A";
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
  const mutatePathStateState =
    typeof options.mutatePathStateState === "function"
      ? options.mutatePathStateState
      : () => {};
  const persistPathStateToSelectedAssembly =
    typeof options.persistPathStateToSelectedAssembly === "function"
      ? options.persistPathStateToSelectedAssembly
      : () => {};
  const rebuildControlPoints =
    typeof options.rebuildControlPoints === "function"
      ? options.rebuildControlPoints
      : () => {};
  const updatePathGeometry =
    typeof options.updatePathGeometry === "function" ? options.updatePathGeometry : () => {};
  const getCameraFlightState =
    typeof options.getCameraFlightState === "function"
      ? options.getCameraFlightState
      : () => ({ waypoints: [], poiMode: "origin", preview: false });
  const getCameraWaypointMeshes =
    typeof options.getCameraWaypointMeshes === "function"
      ? options.getCameraWaypointMeshes
      : () => [];
  const getCamera =
    typeof options.getCamera === "function" ? options.getCamera : () => null;
  const getCanvas =
    typeof options.getCanvas === "function" ? options.getCanvas : () => null;
  const getBackgroundPathMarkers =
    typeof options.getBackgroundPathMarkers === "function"
      ? options.getBackgroundPathMarkers
      : () => [];
  const getPointMeshes =
    typeof options.getPointMeshes === "function" ? options.getPointMeshes : () => [];
  const getPointMaterial =
    typeof options.getPointMaterial === "function" ? options.getPointMaterial : () => null;
  const getPointMaterialActive =
    typeof options.getPointMaterialActive === "function"
      ? options.getPointMaterialActive
      : () => null;
  const updatePointLabelSprite =
    typeof options.updatePointLabelSprite === "function"
      ? options.updatePointLabelSprite
      : () => {};
  const updateCameraWaypointLabelSprite =
    typeof options.updateCameraWaypointLabelSprite === "function"
      ? options.updateCameraWaypointLabelSprite
      : () => {};
  const getCameraOrbitState =
    typeof options.getCameraOrbitState === "function"
      ? options.getCameraOrbitState
      : () => ({ minDistance: 0.3, radius: 1 });
  const getCameraState =
    typeof options.getCameraState === "function"
      ? options.getCameraState
      : () => ({ position: new THREE.Vector3(), speed: 1 });
  const updateCamera = typeof options.updateCamera === "function" ? options.updateCamera : () => {};
  const getFrameGroup =
    typeof options.getFrameGroup === "function" ? options.getFrameGroup : () => null;
  const getSelectedCameraWaypointIndex =
    typeof options.getSelectedCameraWaypointIndex === "function"
      ? options.getSelectedCameraWaypointIndex
      : () => null;
  const setSelectedCameraWaypointIndex =
    typeof options.setSelectedCameraWaypointIndex === "function"
      ? options.setSelectedCameraWaypointIndex
      : () => {};
  const updateCameraFlightDisplay =
    typeof options.updateCameraFlightDisplay === "function"
      ? options.updateCameraFlightDisplay
      : () => {};
  const renderJsonPreview =
    typeof options.renderJsonPreview === "function" ? options.renderJsonPreview : () => {};
  const getFrameState =
    typeof options.getFrameState === "function" ? options.getFrameState : () => null;
  const dom = options.dom ?? {};

  function readNumberInput(input, fallback = 0) {
    if (!input) {
      return fallback;
    }
    const value = Number(input.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function setAnimatorFrameDefaults() {
    const frameState = getFrameState();
    if (dom.frameScaleInput) {
      dom.frameScaleInput.value = "0";
    }
    frameState?.rotation?.set?.(0, 0, 0);
    if (frameState) {
      frameState.scale = 1;
    }
    if (dom.frameScaleLabel) {
      dom.frameScaleLabel.textContent = formatScaleLabel(1);
    }
  }

  function getAnimatorOrbitTargetWorld() {
    const frameGroup = getFrameGroup();
    if (!frameGroup) {
      return new THREE.Vector3(0, 0, 0);
    }
    return frameGroup.localToWorld(new THREE.Vector3(0, 0, 0));
  }

  function updateAnimatorOrbitFromPosition(position) {
    const orbitState = getCameraOrbitState();
    const target = getAnimatorOrbitTargetWorld();
    const offset = position.clone().sub(target);
    const radius = Math.max(orbitState.minDistance, offset.length());
    const theta = Math.atan2(offset.x, offset.z);
    const phi = Math.acos(clampFn(offset.y / radius, -1, 1));
    orbitState.radius = radius;
    orbitState.theta = theta;
    orbitState.phi = phi;
  }

  function syncAnimatorCameraRadiusInput() {
    if (!dom.cameraRadiusInput) {
      return;
    }
    const orbitState = getCameraOrbitState();
    const radius = Math.max(orbitState.minDistance, orbitState.radius);
    const exp = Math.log10(radius);
    dom.cameraRadiusInput.value = exp.toFixed(2);
    if (dom.cameraRadiusLabel) {
      dom.cameraRadiusLabel.textContent = formatScaleLabel(radius);
    }
  }

  function setAnimatorCameraDefaults() {
    const cameraState = getCameraState();
    if (cameraState?.position) {
      cameraState.position.set(0, 2.6, 6.5);
    }
    if (cameraState) {
      cameraState.speed = 1;
    }
    if (dom.cameraSpeedInput) {
      dom.cameraSpeedInput.value = "0";
    }
    if (dom.cameraSpeedLabel) {
      dom.cameraSpeedLabel.textContent = formatScaleLabel(1);
    }
    updateAnimatorOrbitFromPosition(cameraState?.position ?? getCameraState().position);
    syncAnimatorCameraRadiusInput();
  }

  function updateAnimatorWaypointCount() {
    const cameraFlightState = getCameraFlightState();
    if (dom.cameraWaypointCount) {
      dom.cameraWaypointCount.textContent = `Observer points: ${cameraFlightState.waypoints.length}`;
    }
    if (dom.cameraFlightToggle) {
      dom.cameraFlightToggle.disabled = cameraFlightState.waypoints.length < 2;
    }
  }

  function updateAnimatorCameraWaypointMaterials(activeIndex = null) {
    getCameraWaypointMeshes().forEach((mesh, index) => {
      if (!mesh?.material) {
        return;
      }
      const isActive = index === activeIndex;
      mesh.material.opacity = isActive ? 1 : 0.95;
      mesh.material.color.setHex(isActive ? 0xcfffe8 : 0x7fe7cb);
      const labelSprite = mesh.userData?.labelSprite;
      if (labelSprite) {
        updateCameraWaypointLabelSprite(labelSprite, "🎥", isActive);
      }
    });
  }

  function updateAnimatorCameraPoiStatus() {
    if (!dom.cameraPoiStatus) {
      return;
    }
    const pathState = getPathState();
    const cameraFlightState = getCameraFlightState();
    const selectedPointIndex = getSelectedPointIndexState();
    const selectedPoint = selectedPointIndex != null ? pathState.points[selectedPointIndex] : null;
    if (cameraFlightState.poiMode === "selected") {
      if (selectedPoint) {
        dom.cameraPoiStatus.textContent = `Selected point: ${selectedPointIndex + 1} (${selectedPoint.x.toFixed(2)}, ${selectedPoint.y.toFixed(2)}, ${selectedPoint.z.toFixed(2)})`;
        dom.cameraPoiStatus.classList.remove("is-warning");
      } else {
        dom.cameraPoiStatus.textContent = "Selected point: none. Click a path point in the canvas to target it.";
        dom.cameraPoiStatus.classList.add("is-warning");
      }
      return;
    }
    if (selectedPoint) {
      dom.cameraPoiStatus.textContent = `Observer target: local origin. Selected point ${selectedPointIndex + 1} is available if you switch modes.`;
    } else {
      dom.cameraPoiStatus.textContent = "Observer target: local origin.";
    }
    dom.cameraPoiStatus.classList.remove("is-warning");
  }

  function applyAnimatorCameraRadiusInput() {
    if (!dom.cameraRadiusInput) {
      return;
    }
    const orbitState = getCameraOrbitState();
    const exp = readNumberInput(dom.cameraRadiusInput, Math.log10(orbitState.radius || 1));
    orbitState.radius = Math.pow(10, exp);
    if (dom.cameraRadiusLabel) {
      dom.cameraRadiusLabel.textContent = formatScaleLabel(orbitState.radius);
    }
    updateCamera();
  }

  function getAnimatorPoiLocal() {
    const pathState = getPathState();
    const cameraFlightState = getCameraFlightState();
    const selectedPointIndex = getSelectedPointIndexState();
    if (
      cameraFlightState.poiMode === "selected" &&
      selectedPointIndex != null &&
      pathState.points[selectedPointIndex]
    ) {
      return pathState.points[selectedPointIndex].clone();
    }
    return new THREE.Vector3(0, 0, 0);
  }

  function addAnimatorCameraWaypoint(position = null) {
    const frameGroup = getFrameGroup();
    const camera = getCamera();
    const cameraFlightState = getCameraFlightState();
    if (!frameGroup) {
      return;
    }
    const localPos = Array.isArray(position)
      ? vectorFromTriplet(position)
      : position instanceof THREE.Vector3
        ? position.clone()
        : camera
          ? frameGroup.worldToLocal(camera.position.clone())
          : new THREE.Vector3();
    const localLookAt = getAnimatorPoiLocal();
    cameraFlightState.waypoints.push({
      position: localPos,
      lookAt: localLookAt,
    });
    setSelectedCameraWaypointIndex(cameraFlightState.waypoints.length - 1);
    updateCameraFlightDisplay();
    updateAnimatorWaypointCount();
    renderJsonPreview();
  }

  function clearAnimatorCameraWaypoints() {
    const cameraFlightState = getCameraFlightState();
    cameraFlightState.waypoints = [];
    setSelectedCameraWaypointIndex(null);
    updateCameraFlightDisplay();
    updateAnimatorWaypointCount();
    stopAnimatorCameraFlightPreview();
    renderJsonPreview();
  }

  function resetAnimatorPathPoints() {
    const selectedAssembly = getSelectedAssembly();
    if (!selectedAssembly) {
      mutatePathStateState((pathState) => {
        pathState.points = [];
        pathState.ownerAssemblyId = null;
      });
      setSelectedPointIndexState(null);
      rebuildControlPoints();
      updatePathGeometry();
      return;
    }
    const anchor = Array.isArray(selectedAssembly?.position) ? selectedAssembly.position : [0, 0, 0];
    mutatePathStateState((pathState) => {
      pathState.points = createDefaultPathPoints(anchor).map((point) => vectorFromTriplet(point));
      pathState.interpolate = dom.pathModeSelect?.value || "spline";
      pathState.closed = false;
    });
    setSelectedPointIndexState(null);
    updateAnimatorCameraPoiStatus();
    persistPathStateToSelectedAssembly();
    rebuildControlPoints();
    updatePathGeometry();
  }

  function addAnimatorPathPoint(position = null, options = {}) {
    const selectedAssembly = getSelectedAssembly();
    const pathState = getPathState();
    if (!selectedAssembly) {
      return;
    }
    const nextPoint = Array.isArray(position)
      ? vectorFromTriplet(position)
      : position instanceof THREE.Vector3
        ? position.clone()
        : new THREE.Vector3();
    const insertAfterIndex = Number.isInteger(options.insertAfterIndex) ? options.insertAfterIndex : null;
    mutatePathStateState((currentPathState) => {
      if (!currentPathState.points.length) {
        currentPathState.points = [nextPoint];
        return;
      }
      if (
        insertAfterIndex == null ||
        insertAfterIndex < 0 ||
        insertAfterIndex >= currentPathState.points.length
      ) {
        currentPathState.points.push(nextPoint);
      } else {
        currentPathState.points.splice(insertAfterIndex + 1, 0, nextPoint);
      }
    });
    setSelectedPointIndexState(
      insertAfterIndex == null || insertAfterIndex < 0 || insertAfterIndex >= pathState.points.length - 1
        ? pathState.points.length - 1
        : insertAfterIndex + 1
    );
    persistPathStateToSelectedAssembly();
    rebuildControlPoints();
    updatePathGeometry();
  }

  function updateAnimatorPointMaterials(activeIndex = null) {
    const pathLabelPrefix = getSelectedAssemblyLetter();
    const selectedPointIndex = getSelectedPointIndexState();
    const pointMaterial = getPointMaterial();
    const pointMaterialActive = getPointMaterialActive();
    getPointMeshes().forEach((mesh, index) => {
      const isActive = index === activeIndex || index === selectedPointIndex;
      mesh.material = isActive ? pointMaterialActive : pointMaterial;
      const labelSprite = mesh.userData.pointLabelSprite;
      if (labelSprite) {
        updatePointLabelSprite(labelSprite, pathLabelPrefix, isActive);
      }
    });
    updateAnimatorCameraPoiStatus();
  }

  function updateAnimatorPathMarkerScales() {
    const camera = getCamera();
    const canvas = getCanvas();
    if (!camera || !canvas) {
      return;
    }
    const viewportHeight = Math.max(1, canvas.clientHeight || canvas.height || 1);
    const fovRadians = THREE.MathUtils.degToRad(Number(camera.fov ?? 50) || 50);
    const pointRadius = 0.085;
    const targetPixelRadius = 12;
    const markers = [...getBackgroundPathMarkers(), ...getPointMeshes()];
    markers.forEach((marker) => {
      if (!marker?.parent) {
        return;
      }
      const worldPosition = marker.getWorldPosition(new THREE.Vector3());
      const distance = Math.max(0.001, camera.position.distanceTo(worldPosition));
      const worldUnitsPerPixel = (2 * Math.tan(fovRadians * 0.5) * distance) / viewportHeight;
      const scale = Math.max(0.25, (targetPixelRadius * worldUnitsPerPixel) / pointRadius);
      marker.scale.setScalar(scale);
    });
  }

  function sampleAnimatorCameraWaypointState(waypoints, normalizedT) {
    const source = Array.isArray(waypoints) ? waypoints : [];
    if (!source.length) {
      return {
        position: new THREE.Vector3(),
        lookAt: new THREE.Vector3(),
      };
    }
    if (source.length === 1) {
      return {
        position: vectorFromTriplet(source[0]?.position),
        lookAt: vectorFromTriplet(source[0]?.lookAt),
      };
    }
    const positions = source.map((waypoint) => vectorFromTriplet(waypoint?.position));
    const lookAts = source.map((waypoint) => vectorFromTriplet(waypoint?.lookAt));
    const curve = new THREE.CatmullRomCurve3(positions, false, "catmullrom", 0.5);
    const lookCurve = new THREE.CatmullRomCurve3(lookAts, false, "catmullrom", 0.5);
    const t = clampFn(normalizedT, 0, 1);
    return {
      position: curve.getPointAt(t),
      lookAt: lookCurve.getPointAt(t),
    };
  }

  function getAnimatorCameraWaypointDisplayPosition(waypoint) {
    const position = vectorFromTriplet(waypoint?.position);
    const lookAt = vectorFromTriplet(waypoint?.lookAt);
    const towardTarget = lookAt.clone().sub(position);
    const distance = towardTarget.length();
    if (distance <= 0.001) {
      return position;
    }
    const shiftDistance = Math.min(0.6, distance * 0.18);
    return position.clone().add(towardTarget.normalize().multiplyScalar(shiftDistance));
  }

  function startAnimatorCameraFlightPreview() {
    const cameraFlightState = getCameraFlightState();
    if (cameraFlightState.preview) {
      return;
    }
    if (cameraFlightState.waypoints.length < 2) {
      return;
    }
    cameraFlightState.preview = true;
    const camera = getCamera();
    if (camera) {
      cameraFlightState.savedPosition.copy(camera.position);
    }
    if (dom.cameraFlightToggle) {
      dom.cameraFlightToggle.textContent = "Stop Observer Path";
      dom.cameraFlightToggle.classList.add("is-active");
    }
  }

  function stopAnimatorCameraFlightPreview() {
    const cameraFlightState = getCameraFlightState();
    if (!cameraFlightState.preview) {
      return;
    }
    cameraFlightState.preview = false;
    const camera = getCamera();
    if (camera) {
      camera.position.copy(cameraFlightState.savedPosition);
      updateAnimatorOrbitFromPosition(camera.position);
      syncAnimatorCameraRadiusInput();
      updateCamera();
    }
    if (dom.cameraFlightToggle) {
      dom.cameraFlightToggle.textContent = "Preview Observer Path";
      dom.cameraFlightToggle.classList.remove("is-active");
    }
  }

  return {
    setAnimatorFrameDefaults,
    setAnimatorCameraDefaults,
    updateAnimatorWaypointCount,
    updateAnimatorCameraWaypointMaterials,
    updateAnimatorCameraPoiStatus,
    getAnimatorOrbitTargetWorld,
    updateAnimatorOrbitFromPosition,
    syncAnimatorCameraRadiusInput,
    applyAnimatorCameraRadiusInput,
    getAnimatorPoiLocal,
    addAnimatorCameraWaypoint,
    clearAnimatorCameraWaypoints,
    resetAnimatorPathPoints,
    addAnimatorPathPoint,
    updateAnimatorPointMaterials,
    updateAnimatorPathMarkerScales,
    sampleAnimatorCameraWaypointState,
    getAnimatorCameraWaypointDisplayPosition,
    startAnimatorCameraFlightPreview,
    stopAnimatorCameraFlightPreview,
  };
}
