export function createAppShellUiRuntime(deps) {
  const {
    windowRef = window,
    canvas,
    interactionRuntime,
    onResize,
    hideHoverTooltip,
    sceneLabel,
    navUpButton,
    navForwardButton,
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
      interactionRuntime.onPointerLeave?.();
    });
    windowRef.addEventListener("pointermove", (event) => {
      if (event.target !== canvas) {
        interactionRuntime.onPointerLeave?.();
      }
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

    if (sceneLabel) {
      sceneLabel.addEventListener("click", async () => {
        if (
          appDirector?.isTransitionActive?.() ||
          !sceneLabel.classList.contains("is-info-trigger")
        ) {
          return;
        }
        await periodicOverlayRuntime.updateElementInfoPanel();
      });
      sceneLabel.addEventListener("keydown", async (event) => {
        if (
          event.defaultPrevented ||
          (event.key !== "Enter" && event.key !== " ")
        ) {
          return;
        }
        if (
          appDirector?.isTransitionActive?.() ||
          !sceneLabel.classList.contains("is-info-trigger")
        ) {
          return;
        }
        event.preventDefault();
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
