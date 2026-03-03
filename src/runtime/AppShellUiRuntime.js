export function createAppShellUiRuntime(deps) {
  const {
    windowRef = window,
    canvas,
    interactionRuntime,
    onResize,
    hideHoverTooltip,
    navUpButton,
    navForwardButton,
    detailInfoButton,
    homeButton,
    periodicOverlayRuntime,
    appDirector,
  } = deps;

  function wireListeners() {
    windowRef.addEventListener("resize", onResize);
    canvas.addEventListener("pointerdown", interactionRuntime.onPointerDown);
    canvas.addEventListener("pointermove", interactionRuntime.onPointerMove);
    canvas.addEventListener("pointerup", interactionRuntime.onPointerUp);
    canvas.addEventListener("pointercancel", interactionRuntime.onPointerUp);
    canvas.addEventListener("pointerleave", () => {
      hideHoverTooltip();
    });
    canvas.addEventListener("wheel", interactionRuntime.onWheel, { passive: false });

    if (navUpButton) {
      navUpButton.addEventListener("click", async () => {
        periodicOverlayRuntime.hidePeriodicOverlayImmediately();
        await appDirector?.goBack();
      });
    }

    if (navForwardButton) {
      navForwardButton.addEventListener("click", async () => {
        periodicOverlayRuntime.hidePeriodicOverlayImmediately();
        await appDirector?.goForward();
      });
    }

    if (detailInfoButton) {
      detailInfoButton.addEventListener("click", async () => {
        if (appDirector?.isTransitionActive?.()) {
          return;
        }
        await periodicOverlayRuntime.updateElementInfoPanel();
      });
    }

    if (homeButton) {
      homeButton.addEventListener("click", async () => {
        periodicOverlayRuntime.hidePeriodicOverlayImmediately();
        await appDirector?.resetHome();
      });
    }

    periodicOverlayRuntime.wireElementLegend();
    periodicOverlayRuntime.updateElementInfoPanel();
  }

  return {
    wireListeners,
  };
}
