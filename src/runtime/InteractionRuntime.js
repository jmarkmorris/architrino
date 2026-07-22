export function findPointerLabelNode(nodes, clientX, clientY) {
  if (!Array.isArray(nodes) || !Number.isFinite(clientX) || !Number.isFinite(clientY)) {
    return null;
  }

  let closestNode = null;
  let closestDistanceSquared = Infinity;

  nodes.forEach((node) => {
    const element = node?.labelObject?.element;
    if (!element || typeof element.getBoundingClientRect !== "function") {
      return;
    }
    if (
      element.hidden === true ||
      element.style?.display === "none" ||
      element.style?.visibility === "hidden" ||
      element.style?.opacity === "0"
    ) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (
      !Number.isFinite(rect?.left) ||
      !Number.isFinite(rect?.right) ||
      !Number.isFinite(rect?.top) ||
      !Number.isFinite(rect?.bottom) ||
      rect.right <= rect.left ||
      rect.bottom <= rect.top ||
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return;
    }

    const dx = clientX - (rect.left + rect.right) / 2;
    const dy = clientY - (rect.top + rect.bottom) / 2;
    const distanceSquared = dx * dx + dy * dy;
    if (distanceSquared < closestDistanceSquared) {
      closestNode = node;
      closestDistanceSquared = distanceSquared;
    }
  });

  return closestNode;
}

export function findPointerCircleNode(nodes, clientX, clientY, getScreenCircle) {
  if (
    !Array.isArray(nodes) ||
    !Number.isFinite(clientX) ||
    !Number.isFinite(clientY) ||
    typeof getScreenCircle !== "function"
  ) {
    return null;
  }

  let closestNode = null;
  let closestDistanceSquared = Infinity;

  nodes.forEach((node) => {
    const circle = getScreenCircle(node);
    if (
      !Number.isFinite(circle?.centerX) ||
      !Number.isFinite(circle?.centerY) ||
      !Number.isFinite(circle?.radius) ||
      circle.radius <= 0
    ) {
      return;
    }

    const dx = clientX - circle.centerX;
    const dy = clientY - circle.centerY;
    const distanceSquared = dx * dx + dy * dy;
    if (
      distanceSquared <= circle.radius * circle.radius &&
      distanceSquared < closestDistanceSquared
    ) {
      closestNode = node;
      closestDistanceSquared = distanceSquared;
    }
  });

  return closestNode;
}

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
        if (deps.focusOnPointer(event.clientX, event.clientY)) {
          if (typeof deps.onSuccessfulSphereClick === "function") {
            deps.onSuccessfulSphereClick();
          }
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
