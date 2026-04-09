export function createPdgviewCanvasBootstrapRuntime(options = {}) {
  const THREE = options.THREE;
  const windowLike = options.windowLike ?? globalThis.window;
  const wireCanvasUiListeners =
    typeof options.wireCanvasUiListeners === "function" ? options.wireCanvasUiListeners : () => {};
  const dom = options.dom ?? {};
  const getRenderer = typeof options.getRenderer === "function" ? options.getRenderer : () => null;
  const setRenderer = typeof options.setRenderer === "function" ? options.setRenderer : () => {};
  const setScene = typeof options.setScene === "function" ? options.setScene : () => {};
  const setCamera = typeof options.setCamera === "function" ? options.setCamera : () => {};
  const setFrameGroup = typeof options.setFrameGroup === "function" ? options.setFrameGroup : () => {};
  const setViewportGroup =
    typeof options.setViewportGroup === "function" ? options.setViewportGroup : () => {};
  const setPathGeometry =
    typeof options.setPathGeometry === "function" ? options.setPathGeometry : () => {};
  const setPathLine = typeof options.setPathLine === "function" ? options.setPathLine : () => {};
  const setPointGeometry =
    typeof options.setPointGeometry === "function" ? options.setPointGeometry : () => {};
  const setPointMaterial =
    typeof options.setPointMaterial === "function" ? options.setPointMaterial : () => {};
  const setPointMaterialActive =
    typeof options.setPointMaterialActive === "function"
      ? options.setPointMaterialActive
      : () => {};
  const setRaycaster = typeof options.setRaycaster === "function" ? options.setRaycaster : () => {};
  const getCameraFlightState =
    typeof options.getCameraFlightState === "function"
      ? options.getCameraFlightState
      : () => ({ poiMode: "origin" });
  const getAssemblyDraftsState =
    typeof options.getAssemblyDraftsState === "function"
      ? options.getAssemblyDraftsState
      : () => [];
  const operations = options.operations ?? {};

  function initPdgviewCanvas() {
    if (!dom.pdgviewCanvas || getRenderer()) {
      return;
    }
    const renderer = new THREE.WebGLRenderer({
      canvas: dom.pdgviewCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(windowLike?.devicePixelRatio ?? 1, 2));
    renderer.setClearColor(0x000000, 0);
    setRenderer(renderer);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 10000);
    camera.rotation.order = "YXZ";
    setScene(scene);
    setCamera(camera);

    const frameGroup = new THREE.Group();
    scene.add(frameGroup);
    setFrameGroup(frameGroup);

    const axisLength = 2.4;
    const axisColor = 0xd6dbe6;
    const axisMaterial = new THREE.LineBasicMaterial({
      color: axisColor,
      transparent: true,
      opacity: 0.75,
    });
    const makeAxisLine = (from, to) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
      return new THREE.Line(geometry, axisMaterial);
    };
    frameGroup.add(
      makeAxisLine(new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0))
    );
    frameGroup.add(
      makeAxisLine(new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0))
    );
    frameGroup.add(
      makeAxisLine(new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength))
    );

    const viewportGroup = new THREE.Group();
    frameGroup.add(viewportGroup);
    setViewportGroup(viewportGroup);

    const pathGeometry = new THREE.BufferGeometry();
    const pathLine = new THREE.Line(
      pathGeometry,
      new THREE.LineBasicMaterial({
        color: 0x8bdcff,
        transparent: true,
        opacity: 0.9,
      })
    );
    frameGroup.add(pathLine);
    setPathGeometry(pathGeometry);
    setPathLine(pathLine);

    const pointGeometry = new THREE.SphereGeometry(0.085, 20, 20);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc26a,
      transparent: true,
      opacity: 0.98,
      depthTest: false,
      depthWrite: false,
    });
    const pointMaterialActive = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
    });
    setPointGeometry(pointGeometry);
    setPointMaterial(pointMaterial);
    setPointMaterialActive(pointMaterialActive);
    setRaycaster(new THREE.Raycaster());

    operations.setFrameDefaults?.();
    operations.setCameraDefaults?.();
    operations.setTransportButtonIcon?.(dom.playToggleButton, "play");
    operations.setTransportButtonIcon?.(dom.playResetButton, "restart");
    if (dom.sceneButton && !dom.sceneButton.dataset.bound) {
      dom.sceneButton.addEventListener("click", (event) => {
        event.preventDefault();
        const anchor = operations.getMenuAnchorClientPosition?.(dom.sceneButton) ?? { x: 0, y: 0 };
        operations.openSceneMenuAt?.(anchor.x, anchor.y);
      });
      dom.sceneButton.dataset.bound = "true";
    }
    if (dom.saveButton && !dom.saveButton.dataset.bound) {
      dom.saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        const anchor = operations.getMenuAnchorClientPosition?.(dom.saveButton) ?? { x: 0, y: 0 };
        operations.openLibraryMenuAt?.(anchor.x, anchor.y);
      });
      dom.saveButton.dataset.bound = "true";
    }
    if (dom.cameraPoiSelect) {
      dom.cameraPoiSelect.value = getCameraFlightState().poiMode;
    }
    operations.updateCameraPoiStatus?.();
    operations.syncCameraRadiusInput?.();
    if (dom.assemblyAddButton && !dom.assemblyAddButton.dataset.bound) {
      dom.assemblyAddButton.addEventListener("click", () => {
        operations.ensureAssemblyDrafts?.();
        operations.appendAssemblyDraftState?.(
          operations.createDefaultAssemblyDraft?.(getAssemblyDraftsState().length)
        );
        operations.renderAssemblyEditor?.();
        operations.renderJsonPreview?.();
      });
      dom.assemblyAddButton.dataset.bound = "true";
    }
    (Array.isArray(dom.hudViewportToggleBindings) ? dom.hudViewportToggleBindings : []).forEach(
      ({ button, key }) => {
        if (!button || button.dataset.bound) {
          return;
        }
        button.addEventListener("click", () => {
          if (button.disabled) {
            return;
          }
          operations.toggleViewportDisplayFlag?.(key);
          operations.applyViewportDisplayState?.();
          operations.renderJsonPreview?.();
        });
        button.dataset.bound = "true";
      }
    );
    operations.renderAssemblyEditor?.();

    wireCanvasUiListeners({
      pdgviewCanvas: dom.pdgviewCanvas,
      onPdgviewPointerDown: operations.onPointerDown,
      onPdgviewPointerMove: operations.onPointerMove,
      onPdgviewPointerUp: operations.onPointerUp,
      onPdgviewWheel: operations.onWheel,
      onPdgviewContextMenu: operations.onContextMenu,
    });

    if (dom.timelineTrack && !dom.timelineTrack.dataset.contextWired) {
      dom.timelineTrack.dataset.contextWired = "true";
      dom.timelineTrack.addEventListener("contextmenu", operations.onTimelineContextMenu);
    }
    if (dom.timelineTrack && !dom.timelineTrack.dataset.clickWired) {
      dom.timelineTrack.dataset.clickWired = "true";
      dom.timelineTrack.addEventListener("click", operations.onTimelineClick);
    }

    if (dom.timelineSummary && !dom.timelineSummary.dataset.contextWired) {
      dom.timelineSummary.dataset.contextWired = "true";
      dom.timelineSummary.addEventListener("contextmenu", operations.onTimelineSummaryContextMenu);
    }
    if (dom.timelineSummary && !dom.timelineSummary.dataset.clickWired) {
      dom.timelineSummary.dataset.clickWired = "true";
      dom.timelineSummary.addEventListener("click", (event) => {
        event.preventDefault();
        operations.closeAssemblyMenu?.();
        const anchor =
          event.clientX || event.clientY
            ? { x: event.clientX, y: event.clientY }
            : operations.getMenuAnchorClientPosition?.(dom.timelineSummary) ?? { x: 0, y: 0 };
        operations.openTimelineSummaryMenuAt?.(anchor.x, anchor.y);
      });
    }

    if (dom.assemblyMenu && !dom.assemblyMenu.dataset.wired) {
      dom.assemblyMenu.dataset.wired = "true";
      dom.assemblyMenu.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-template]");
        if (!button) {
          return;
        }
        const position = JSON.parse(dom.assemblyMenu.dataset.position || "[0,0,0]");
        operations.addBuiltInAssembly?.(button.dataset.template, position);
        operations.closeAssemblyMenu?.();
      });
    }

    if (dom.overlay && !dom.overlay.dataset.assemblyMenuWired) {
      dom.overlay.dataset.assemblyMenuWired = "true";
      dom.overlay.addEventListener(
        "pointerdown",
        (event) => {
          if (!dom.assemblyMenu?.classList.contains("is-open")) {
            return;
          }
          if (dom.assemblyMenu.contains(event.target)) {
            return;
          }
          if (event.target === dom.pdgviewCanvas && event.button === 2) {
            return;
          }
          operations.closeAssemblyMenu?.();
        },
        { passive: true }
      );
    }

    operations.loadPathStateFromSelectedAssembly?.();
    operations.refreshLibraryUi?.(dom.sceneIdInput?.value ?? null);
    operations.renderJsonPreview?.();
    operations.updateCameraFlightDisplay?.();
    operations.updateWaypointCount?.();
    operations.updateFrame?.();
    operations.updateCamera?.();
    operations.resizeCanvas?.();
  }

  return {
    initPdgviewCanvas,
  };
}
