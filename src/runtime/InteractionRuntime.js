export function createInteractionRuntime(deps) {
  const activePointers = new Map();
  const panState = {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    startWorldX: 0,
    startWorldY: 0,
  };

  let pinchStartDistance = 0;
  let pinchStartZoom = 1;

  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;

  function getWorldPerPixel() {
    const worldHeight = (deps.camera.top - deps.camera.bottom) / deps.camera.zoom;
    return worldHeight / deps.canvas.clientHeight;
  }

  function getPinchDistance() {
    const pointers = Array.from(activePointers.values());
    if (pointers.length < 2) {
      return 0;
    }
    const dx = pointers[0].x - pointers[1].x;
    const dy = pointers[0].y - pointers[1].y;
    return Math.hypot(dx, dy);
  }

  function onPointerDown(event) {
    if (deps.isTransitionActive()) {
      return;
    }
    if (
      typeof deps.isPointerWithinInteractiveViewport === "function" &&
      !deps.isPointerWithinInteractiveViewport(event.clientX, event.clientY)
    ) {
      return;
    }
    deps.canvas.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 1) {
      panState.active = true;
      panState.moved = false;
      panState.startX = event.clientX;
      panState.startY = event.clientY;
      panState.startWorldX = deps.worldGroup.position.x;
      panState.startWorldY = deps.worldGroup.position.y;
    }

    if (activePointers.size === 2) {
      panState.active = false;
      deps.zoomState.active = false;
      pinchStartDistance = getPinchDistance();
      pinchStartZoom = deps.camera.zoom;
    }
  }

  function onPointerMove(event) {
    if (deps.isTransitionActive()) {
      return;
    }

    if (activePointers.has(event.pointerId)) {
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (activePointers.size === 1 && panState.active) {
      const dx = event.clientX - panState.startX;
      const dy = event.clientY - panState.startY;
      const worldPerPixel = getWorldPerPixel();
      deps.worldGroup.position.x = panState.startWorldX + dx * worldPerPixel;
      deps.worldGroup.position.y = panState.startWorldY - dy * worldPerPixel;
      if (Math.hypot(dx, dy) > 6) {
        panState.moved = true;
      }
    }

    if (activePointers.size === 2) {
      const distance = getPinchDistance();
      if (pinchStartDistance > 0) {
        const zoom = pinchStartZoom * (distance / pinchStartDistance);
        deps.applyZoom(zoom);
        deps.setLastZoomGestureTime(deps.now());
      }
    }

    if (event.buttons === 0 && activePointers.size === 0 && !panState.active) {
      deps.updateDetailHover(event.clientX, event.clientY);
      deps.updateGenerationTransitionHover(event.clientX, event.clientY);
    }
  }

  function onPointerUp(event) {
    if (activePointers.has(event.pointerId)) {
      activePointers.delete(event.pointerId);
    }

    if (activePointers.size < 2) {
      pinchStartDistance = 0;
    }

    if (activePointers.size === 0) {
      panState.active = false;
      if (!panState.moved && !deps.isTransitionActive()) {
        if (!deps.focusOnPointer(event.clientX, event.clientY)) {
          const now = deps.now();
          const dx = event.clientX - lastTapX;
          const dy = event.clientY - lastTapY;
          const distance = Math.hypot(dx, dy);
          if (now - lastTapTime < 320 && distance < 24) {
            const currentLevel = deps.getCurrentLevel();
            if (currentLevel && currentLevel.id !== deps.rootScenePath) {
              deps.resetToRootScene();
            }
            lastTapTime = 0;
          } else {
            lastTapTime = now;
            lastTapX = event.clientX;
            lastTapY = event.clientY;
          }
        } else {
          if (typeof deps.onSuccessfulSphereClick === "function") {
            deps.onSuccessfulSphereClick();
          }
          lastTapTime = 0;
        }
      }
    }
  }

  function onWheel(event) {
    if (!event.ctrlKey || deps.isTransitionActive()) {
      return;
    }
    if (
      typeof deps.isPointerWithinInteractiveViewport === "function" &&
      !deps.isPointerWithinInteractiveViewport(event.clientX, event.clientY)
    ) {
      return;
    }
    event.preventDefault();
    deps.zoomState.active = false;

    const zoomFactor = Math.exp(-event.deltaY * 0.0025);
    deps.applyZoom(deps.camera.zoom * zoomFactor);
    deps.setLastZoomGestureTime(deps.now());
  }

  function onPointerLeave() {
    if (typeof deps.clearHoverState === "function") {
      deps.clearHoverState();
    }
  }

  return { onPointerDown, onPointerMove, onPointerUp, onPointerLeave, onWheel };
}
