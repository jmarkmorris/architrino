export function createPdgviewViewportRenderRuntime(options = {}) {
  const THREE = options.THREE ?? globalThis.THREE;
  const clampFn =
    typeof options.clampFn === "function"
      ? options.clampFn
      : (value, min, max) => Math.min(max, Math.max(min, value));
  const readNumberInput =
    typeof options.readNumberInput === "function" ? options.readNumberInput : () => 0;
  const formatScaleLabel =
    typeof options.formatScaleLabel === "function" ? options.formatScaleLabel : (value) => `${value}`;
  const getEffectiveFrameScale =
    typeof options.getEffectiveFrameScale === "function" ? options.getEffectiveFrameScale : () => 1;
  const getOrbitTargetWorld =
    typeof options.getOrbitTargetWorld === "function" ? options.getOrbitTargetWorld : () => new THREE.Vector3();
  const updatePathMarkerScales =
    typeof options.updatePathMarkerScales === "function" ? options.updatePathMarkerScales : () => {};
  const updatePathPointInfoPill =
    typeof options.updatePathPointInfoPill === "function" ? options.updatePathPointInfoPill : () => {};
  const hidePathPointInfoPill =
    typeof options.hidePathPointInfoPill === "function" ? options.hidePathPointInfoPill : () => {};
  const updateTimelinePlayhead =
    typeof options.updateTimelinePlayhead === "function" ? options.updateTimelinePlayhead : () => {};
  const updateAnimatedViewport =
    typeof options.updateAnimatedViewport === "function" ? options.updateAnimatedViewport : () => {};
  const updatePlaybackState =
    typeof options.updatePlaybackState === "function" ? options.updatePlaybackState : () => 0;
  const getRenderer = typeof options.getRenderer === "function" ? options.getRenderer : () => null;
  const getScene = typeof options.getScene === "function" ? options.getScene : () => null;
  const getCanvas = typeof options.getCanvas === "function" ? options.getCanvas : () => null;
  const getCamera = typeof options.getCamera === "function" ? options.getCamera : () => null;
  const getOverlay = typeof options.getOverlay === "function" ? options.getOverlay : () => null;
  const getFrameGroup = typeof options.getFrameGroup === "function" ? options.getFrameGroup : () => null;
  const getFrameState =
    typeof options.getFrameState === "function"
      ? options.getFrameState
      : () => ({ rotation: new THREE.Euler(), scale: 1 });
  const getCameraState =
    typeof options.getCameraState === "function"
      ? options.getCameraState
      : () => ({ position: new THREE.Vector3(), speed: 1 });
  const getCameraOrbitState =
    typeof options.getCameraOrbitState === "function"
      ? options.getCameraOrbitState
      : () => ({ radius: 1, minDistance: 0.3, maxDistance: 1000, theta: 0, phi: Math.PI / 2 });
  const getCameraFlightState =
    typeof options.getCameraFlightState === "function"
      ? options.getCameraFlightState
      : () => ({ preview: false });
  const getCurrentDocument =
    typeof options.getCurrentDocument === "function" ? options.getCurrentDocument : () => null;
  const getNeedsResize =
    typeof options.getNeedsResize === "function" ? options.getNeedsResize : () => false;
  const setNeedsResize =
    typeof options.setNeedsResize === "function" ? options.setNeedsResize : () => {};
  const dom = options.dom ?? {};

  function resizePdgviewCanvas() {
    const pdgviewRenderer = getRenderer();
    const pdgviewCanvas = getCanvas();
    const pdgviewCamera = getCamera();
    if (!pdgviewRenderer || !pdgviewCanvas || !pdgviewCamera) {
      return;
    }
    const rect = pdgviewCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    pdgviewRenderer.setSize(width, height, false);
    pdgviewCamera.aspect = width / height;
    pdgviewCamera.updateProjectionMatrix();
    setNeedsResize(false);
  }

  function updatePdgviewFrame() {
    const pdgviewFrameGroup = getFrameGroup();
    const pdgviewFrameState = getFrameState();
    if (!pdgviewFrameGroup) {
      return;
    }
    pdgviewFrameGroup.rotation.copy(pdgviewFrameState.rotation);
    pdgviewFrameGroup.scale.setScalar(getEffectiveFrameScale());
  }

  function applyPdgviewFrameScaleInput() {
    const pdgviewFrameState = getFrameState();
    const scaleExp = readNumberInput(dom.frameScaleInput, 0);
    pdgviewFrameState.scale = Math.pow(10, scaleExp);
    if (dom.frameScaleLabel) {
      dom.frameScaleLabel.textContent = formatScaleLabel(pdgviewFrameState.scale);
    }
    updatePdgviewFrame();
  }

  function updatePdgviewCamera() {
    const pdgviewCamera = getCamera();
    const pdgviewCameraFlightState = getCameraFlightState();
    const pdgviewCameraOrbitState = getCameraOrbitState();
    const pdgviewCameraState = getCameraState();
    if (!pdgviewCamera) {
      return;
    }
    if (pdgviewCameraFlightState.preview) {
      return;
    }
    const target = getOrbitTargetWorld();
    const radius = clampFn(
      pdgviewCameraOrbitState.radius,
      pdgviewCameraOrbitState.minDistance,
      pdgviewCameraOrbitState.maxDistance
    );
    const phi = clampFn(pdgviewCameraOrbitState.phi, 0.05, Math.PI - 0.05);
    const theta = pdgviewCameraOrbitState.theta;
    const sinPhi = Math.sin(phi);
    const offset = new THREE.Vector3(
      radius * sinPhi * Math.sin(theta),
      radius * Math.cos(phi),
      radius * sinPhi * Math.cos(theta)
    );
    pdgviewCamera.position.copy(target).add(offset);
    pdgviewCamera.lookAt(target);
    pdgviewCameraState.position.copy(pdgviewCamera.position);
  }

  function applyPdgviewCameraSpeedInput() {
    const pdgviewCameraState = getCameraState();
    const speedExp = readNumberInput(dom.cameraSpeedInput, 0);
    pdgviewCameraState.speed = Math.pow(10, speedExp);
    if (dom.cameraSpeedLabel) {
      dom.cameraSpeedLabel.textContent = formatScaleLabel(pdgviewCameraState.speed);
    }
  }

  function renderPdgviewCanvas() {
    const pdgviewRenderer = getRenderer();
    const pdgviewScene = getScene();
    const pdgviewCamera = getCamera();
    const pdgviewOverlay = getOverlay();
    const pdgviewCurrentDocument = getCurrentDocument();
    if (!pdgviewRenderer || !pdgviewScene || !pdgviewCamera || !pdgviewOverlay) {
      return;
    }
    if (!pdgviewOverlay.classList.contains("is-open")) {
      hidePathPointInfoPill();
      return;
    }
    if (getNeedsResize()) {
      resizePdgviewCanvas();
    }
    const now = performance.now();
    const playheadSeconds = updatePlaybackState(now);
    updateAnimatedViewport(playheadSeconds);
    updatePathMarkerScales();
    updatePathPointInfoPill();
    updateTimelinePlayhead(playheadSeconds, pdgviewCurrentDocument);
    pdgviewRenderer.render(pdgviewScene, pdgviewCamera);
  }

  return {
    resizePdgviewCanvas,
    updatePdgviewFrame,
    applyPdgviewFrameScaleInput,
    updatePdgviewCamera,
    applyPdgviewCameraSpeedInput,
    renderPdgviewCanvas,
  };
}
