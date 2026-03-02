export function createTransitionEngine(transitionState, deps) {
  function normalizeDisplayedLevelPosition(level) {
    if (!level?.group) {
      return;
    }
    const pos = level.group.position;
    if (pos.x === 0 && pos.y === 0 && pos.z === 0) {
      return;
    }
    // Preserve on-screen placement while normalizing cached level transform.
    deps.worldGroup.position.add(pos);
    level.group.position.set(0, 0, 0);
  }

  function maybeCenterLevelInFrame(level) {
    if (!level) {
      return;
    }
    if (
      typeof deps.shouldCenterLevelInFrame === "function" &&
      !deps.shouldCenterLevelInFrame(level)
    ) {
      return;
    }
    if (typeof deps.centerLevelInFrame === "function") {
      deps.centerLevelInFrame(level);
    }
  }

  function getTransitionFocusNode(level) {
    if (!level) {
      return null;
    }
    const focusNodeId = transitionState.payload?.focusNodeId;
    if (!focusNodeId) {
      return null;
    }
    return level.nodeById.get(focusNodeId) ?? level.nodeByName.get(focusNodeId);
  }

  const handlers = {
    warpIn: {
      update: (now) => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!fromLevel || !toLevel || !payload) {
          return true;
        }
        const elapsed = now - transitionState.startTime;
        const t = Math.min(1, elapsed / transitionState.duration);
        const panProgress = deps.smoothstep(0, 0.35, t);
        const scaleProgress = deps.smoothstep(0.35, 1, t);
        const zoomProgress = scaleProgress;

        const nextZoom =
          payload.zoomStart +
          (payload.zoomTarget - payload.zoomStart) * zoomProgress;
        deps.applyZoom(nextZoom);

        const focusNode = getTransitionFocusNode(fromLevel);
        if (focusNode) {
          const baseScale = focusNode.baseScale ?? focusNode.data?.baseScale ?? 1;
          focusNode.group.scale.setScalar(
            baseScale * (1 + (payload.warpScale - 1) * scaleProgress)
          );
        }
        const toScale = payload.toStartScale + (1 - payload.toStartScale) * scaleProgress;
        toLevel.group.scale.setScalar(toScale);
        deps.worldGroup.position.lerpVectors(payload.panStart, payload.panTarget, panProgress);

        const focusFade = 1 - deps.smoothstep(0.55, 1, scaleProgress);
        const toFade = Math.pow(deps.smoothstep(0.2, 1, scaleProgress), 1.6);
        deps.setLevelOpacityWithFocus(fromLevel, payload.focusNodeId, focusFade, 0);
        deps.setLevelLinkOpacity(fromLevel, 0);
        deps.setLevelOpacityWithLabel(toLevel, toFade, 0);
        deps.setLevelLinkOpacity(toLevel, toFade);
        return t >= 1;
      },
      finalize: () => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!fromLevel || !toLevel || !payload) {
          return;
        }
        const fromFocus = getTransitionFocusNode(fromLevel);
        if (fromFocus) {
          deps.resetNodeScale(fromFocus);
        }
        fromLevel.group.scale.setScalar(1);
        fromLevel.group.position.set(0, 0, 0);
        deps.setLevelOpacity(fromLevel, 0);
        deps.setLevelLinkOpacity(fromLevel, 0);
        deps.worldGroup.remove(fromLevel.group);

        toLevel.group.scale.setScalar(1);
        normalizeDisplayedLevelPosition(toLevel);
        deps.setLevelOpacity(toLevel, 1);
        deps.setLevelLabelOpacity(toLevel, 0);
        deps.setLevelLinkOpacity(toLevel, 1);

        deps.setCurrentLevel(toLevel);
        maybeCenterLevelInFrame(toLevel);
        deps.zoomState.active = false;
        deps.panTween.active = false;
        deps.applyZoom(payload.zoomTarget ?? deps.camera.zoom);
        deps.labelFadeState.active = true;
        deps.labelFadeState.level = deps.getCurrentLevel();
        deps.labelFadeState.startTime = deps.now();
        deps.updateSceneLabel();
        deps.updateSceneMarkdown();
      },
    },
    warpOut: {
      update: (now) => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!fromLevel || !toLevel || !payload) {
          return true;
        }
        const elapsed = now - transitionState.startTime;
        const t = Math.min(1, elapsed / transitionState.duration);
        const scaleProgress = deps.smoothstep(0.35, 1, t);
        const zoomProgress = scaleProgress;

        const nextZoom =
          payload.zoomStart +
          (payload.zoomTarget - payload.zoomStart) * zoomProgress;
        deps.applyZoom(nextZoom);

        const toScale = payload.toStartScale + (1 - payload.toStartScale) * scaleProgress;
        toLevel.group.scale.setScalar(toScale);
        deps.worldGroup.position.copy(payload.panStart);

        const fromScale = Math.max(0.05, 1 - 0.95 * scaleProgress);
        if (payload.fromPivot) {
          payload.fromPivot.scale.setScalar(fromScale);
        } else {
          fromLevel.group.scale.setScalar(fromScale);
        }

        const fromFade = 1 - deps.smoothstep(0.35, 0.95, t);
        const toFade = deps.smoothstep(0.3, 1, t);
        deps.setLevelOpacity(fromLevel, fromFade);
        deps.setLevelLinkOpacity(fromLevel, fromFade);
        deps.setLevelOpacityWithLabel(toLevel, toFade, 0);
        deps.setLevelLinkOpacity(toLevel, toFade);
        return t >= 1;
      },
      finalize: () => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!fromLevel || !toLevel || !payload) {
          return;
        }
        toLevel.group.scale.setScalar(1);
        normalizeDisplayedLevelPosition(toLevel);
        deps.setLevelOpacity(toLevel, 1);
        deps.setLevelLabelOpacity(toLevel, 0);
        deps.setLevelLinkOpacity(toLevel, 1);

        const toFocus = getTransitionFocusNode(toLevel);
        if (toFocus) {
          deps.resetNodeScale(toFocus);
        }
        if (payload.fromPivot) {
          payload.fromPivot.scale.setScalar(1);
          payload.fromPivot.remove(fromLevel.group);
          deps.worldGroup.remove(payload.fromPivot);
          payload.fromPivot = null;
          fromLevel.group.position.set(0, 0, 0);
        } else {
          fromLevel.group.scale.setScalar(1);
          fromLevel.group.position.set(0, 0, 0);
          deps.worldGroup.remove(fromLevel.group);
        }
        deps.setLevelOpacity(fromLevel, 0);
        deps.setLevelLinkOpacity(fromLevel, 0);

        deps.setCurrentLevel(toLevel);
        maybeCenterLevelInFrame(toLevel);
        deps.navigationStack.pop();
        deps.zoomState.active = false;
        deps.panTween.active = false;
        deps.applyZoom(payload.zoomTarget ?? deps.camera.zoom);
        deps.labelFadeState.active = true;
        deps.labelFadeState.level = deps.getCurrentLevel();
        deps.labelFadeState.startTime = deps.now();
        deps.updateSceneLabel();
        deps.updateSceneMarkdown();
      },
    },
    jump: {
      update: (now) => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!toLevel || !payload) {
          return true;
        }
        const elapsed = now - transitionState.startTime;
        const t = Math.min(1, elapsed / transitionState.duration);
        const fade = deps.smoothstep(0, 1, t);
        if (fromLevel) {
          deps.setLevelOpacity(fromLevel, 1 - fade);
          deps.setLevelLinkOpacity(fromLevel, 1 - fade);
        }
        deps.setLevelOpacity(toLevel, fade);
        deps.setLevelLinkOpacity(toLevel, fade);
        const startScale = payload.startScale ?? 1;
        const scale = startScale + (1 - startScale) * fade;
        toLevel.group.scale.setScalar(scale);
        const nextZoom = payload.zoomStart + (payload.zoomTarget - payload.zoomStart) * fade;
        deps.applyZoom(nextZoom);
        if (payload.worldPanStart && payload.worldPanTarget) {
          deps.worldGroup.position.lerpVectors(
            payload.worldPanStart,
            payload.worldPanTarget,
            fade
          );
        }
        return t >= 1;
      },
      finalize: () => {
        const { fromLevel, toLevel, payload } = transitionState;
        if (!toLevel || !payload) {
          return;
        }
        if (fromLevel) {
          fromLevel.group.position.set(0, 0, 0);
          deps.setLevelOpacity(fromLevel, 0);
          deps.setLevelLinkOpacity(fromLevel, 0);
          deps.worldGroup.remove(fromLevel.group);
        }
        toLevel.group.scale.setScalar(1);
        normalizeDisplayedLevelPosition(toLevel);
        deps.setLevelOpacity(toLevel, 1);
        deps.setLevelLabelOpacity(toLevel, 0);
        deps.setLevelLinkOpacity(toLevel, 1);
        if (payload.worldPanTarget) {
          deps.worldGroup.position.copy(payload.worldPanTarget);
        }
        deps.setCurrentLevel(toLevel);
        maybeCenterLevelInFrame(toLevel);
        deps.applyZoom(payload.zoomTarget ?? deps.camera.zoom);
        deps.labelFadeState.active = true;
        deps.labelFadeState.level = deps.getCurrentLevel();
        deps.labelFadeState.startTime = deps.now();
        deps.updateSceneLabel();
        deps.updateSceneMarkdown();
      },
    },
  };

  function finalize() {
    if (!transitionState.active) {
      return;
    }
    const handler = handlers[transitionState.mode];
    if (!handler) {
      transitionState.active = false;
      transitionState.payload = null;
      return;
    }
    handler.finalize();
    transitionState.active = false;
    transitionState.payload = null;
  }

  function update(now) {
    if (!transitionState.active) {
      return;
    }
    const handler = handlers[transitionState.mode];
    if (!handler) {
      finalize();
      return;
    }
    const done = handler.update(now);
    if (done) {
      finalize();
    }
  }

  return { update, finalize };
}
