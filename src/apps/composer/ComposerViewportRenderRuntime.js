export function createComposerViewportRenderRuntime(options = {}) {
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

  function resizeComposerCanvas() {
    const composerRenderer = getRenderer();
    const composerCanvas = getCanvas();
    const composerCamera = getCamera();
    if (!composerRenderer || !composerCanvas || !composerCamera) {
      return;
    }
    const rect = composerCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    composerRenderer.setSize(width, height, false);
    composerCamera.aspect = width / height;
    composerCamera.updateProjectionMatrix();
    setNeedsResize(false);
  }

  function updateComposerFrame() {
    const composerFrameGroup = getFrameGroup();
    const composerFrameState = getFrameState();
    if (!composerFrameGroup) {
      return;
    }
    composerFrameGroup.rotation.copy(composerFrameState.rotation);
    composerFrameGroup.scale.setScalar(getEffectiveFrameScale());
  }

  function applyComposerFrameScaleInput() {
    const composerFrameState = getFrameState();
    const scaleExp = readNumberInput(dom.frameScaleInput, 0);
    composerFrameState.scale = Math.pow(10, scaleExp);
    if (dom.frameScaleLabel) {
      dom.frameScaleLabel.textContent = formatScaleLabel(composerFrameState.scale);
    }
    updateComposerFrame();
  }

  function updateComposerCamera() {
    const composerCamera = getCamera();
    const composerCameraFlightState = getCameraFlightState();
    const composerCameraOrbitState = getCameraOrbitState();
    const composerCameraState = getCameraState();
    if (!composerCamera) {
      return;
    }
    if (composerCameraFlightState.preview) {
      return;
    }
    const target = getOrbitTargetWorld();
    const radius = clampFn(
      composerCameraOrbitState.radius,
      composerCameraOrbitState.minDistance,
      composerCameraOrbitState.maxDistance
    );
    const phi = clampFn(composerCameraOrbitState.phi, 0.05, Math.PI - 0.05);
    const theta = composerCameraOrbitState.theta;
    const sinPhi = Math.sin(phi);
    const offset = new THREE.Vector3(
      radius * sinPhi * Math.sin(theta),
      radius * Math.cos(phi),
      radius * sinPhi * Math.cos(theta)
    );
    composerCamera.position.copy(target).add(offset);
    composerCamera.lookAt(target);
    composerCameraState.position.copy(composerCamera.position);
  }

  function applyComposerCameraSpeedInput() {
    const composerCameraState = getCameraState();
    const speedExp = readNumberInput(dom.cameraSpeedInput, 0);
    composerCameraState.speed = Math.pow(10, speedExp);
    if (dom.cameraSpeedLabel) {
      dom.cameraSpeedLabel.textContent = formatScaleLabel(composerCameraState.speed);
    }
  }

  function renderComposerCanvas() {
    const composerRenderer = getRenderer();
    const composerScene = getScene();
    const composerCamera = getCamera();
    const composerOverlay = getOverlay();
    const composerCurrentDocument = getCurrentDocument();
    if (!composerRenderer || !composerScene || !composerCamera || !composerOverlay) {
      return;
    }
    if (!composerOverlay.classList.contains("is-open")) {
      hidePathPointInfoPill();
      return;
    }
    if (getNeedsResize()) {
      resizeComposerCanvas();
    }
    const now = performance.now();
    const playheadSeconds = updatePlaybackState(now);
    updateAnimatedViewport(playheadSeconds);
    updatePathMarkerScales();
    updatePathPointInfoPill();
    updateTimelinePlayhead(playheadSeconds, composerCurrentDocument);
    composerRenderer.render(composerScene, composerCamera);
  }

  return {
    resizeComposerCanvas,
    updateComposerFrame,
    applyComposerFrameScaleInput,
    updateComposerCamera,
    applyComposerCameraSpeedInput,
    renderComposerCanvas,
  };
}
