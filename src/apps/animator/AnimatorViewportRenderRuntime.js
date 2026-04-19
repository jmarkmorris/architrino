export function createAnimatorViewportRenderRuntime(options = {}) {
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

  function resizeAnimatorCanvas() {
    const animatorRenderer = getRenderer();
    const animatorCanvas = getCanvas();
    const animatorCamera = getCamera();
    if (!animatorRenderer || !animatorCanvas || !animatorCamera) {
      return;
    }
    const rect = animatorCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    animatorRenderer.setSize(width, height, false);
    animatorCamera.aspect = width / height;
    animatorCamera.updateProjectionMatrix();
    setNeedsResize(false);
  }

  function updateAnimatorFrame() {
    const animatorFrameGroup = getFrameGroup();
    const animatorFrameState = getFrameState();
    if (!animatorFrameGroup) {
      return;
    }
    animatorFrameGroup.rotation.copy(animatorFrameState.rotation);
    animatorFrameGroup.scale.setScalar(getEffectiveFrameScale());
  }

  function applyAnimatorFrameScaleInput() {
    const animatorFrameState = getFrameState();
    const scaleExp = readNumberInput(dom.frameScaleInput, 0);
    animatorFrameState.scale = Math.pow(10, scaleExp);
    if (dom.frameScaleLabel) {
      dom.frameScaleLabel.textContent = formatScaleLabel(animatorFrameState.scale);
    }
    updateAnimatorFrame();
  }

  function updateAnimatorCamera() {
    const animatorCamera = getCamera();
    const animatorCameraFlightState = getCameraFlightState();
    const animatorCameraOrbitState = getCameraOrbitState();
    const animatorCameraState = getCameraState();
    if (!animatorCamera) {
      return;
    }
    if (animatorCameraFlightState.preview) {
      return;
    }
    const target = getOrbitTargetWorld();
    const radius = clampFn(
      animatorCameraOrbitState.radius,
      animatorCameraOrbitState.minDistance,
      animatorCameraOrbitState.maxDistance
    );
    const phi = clampFn(animatorCameraOrbitState.phi, 0.05, Math.PI - 0.05);
    const theta = animatorCameraOrbitState.theta;
    const sinPhi = Math.sin(phi);
    const offset = new THREE.Vector3(
      radius * sinPhi * Math.sin(theta),
      radius * Math.cos(phi),
      radius * sinPhi * Math.cos(theta)
    );
    animatorCamera.position.copy(target).add(offset);
    animatorCamera.lookAt(target);
    animatorCameraState.position.copy(animatorCamera.position);
  }

  function applyAnimatorCameraSpeedInput() {
    const animatorCameraState = getCameraState();
    const speedExp = readNumberInput(dom.cameraSpeedInput, 0);
    animatorCameraState.speed = Math.pow(10, speedExp);
    if (dom.cameraSpeedLabel) {
      dom.cameraSpeedLabel.textContent = formatScaleLabel(animatorCameraState.speed);
    }
  }

  function renderAnimatorCanvas() {
    const animatorRenderer = getRenderer();
    const animatorScene = getScene();
    const animatorCamera = getCamera();
    const animatorOverlay = getOverlay();
    const animatorCurrentDocument = getCurrentDocument();
    if (!animatorRenderer || !animatorScene || !animatorCamera || !animatorOverlay) {
      return;
    }
    if (!animatorOverlay.classList.contains("is-open")) {
      hidePathPointInfoPill();
      return;
    }
    if (getNeedsResize()) {
      resizeAnimatorCanvas();
    }
    const now = performance.now();
    const playheadSeconds = updatePlaybackState(now);
    updateAnimatedViewport(playheadSeconds);
    updatePathMarkerScales();
    updatePathPointInfoPill();
    updateTimelinePlayhead(playheadSeconds, animatorCurrentDocument);
    animatorRenderer.render(animatorScene, animatorCamera);
  }

  return {
    resizeAnimatorCanvas,
    updateAnimatorFrame,
    applyAnimatorFrameScaleInput,
    updateAnimatorCamera,
    applyAnimatorCameraSpeedInput,
    renderAnimatorCanvas,
  };
}
