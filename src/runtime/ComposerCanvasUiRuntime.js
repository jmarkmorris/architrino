export function wireComposerCanvasUiListeners(deps) {
  const {
    composerCanvas,
    onComposerPointerDown,
    onComposerPointerMove,
    onComposerPointerUp,
    onComposerWheel,
  } = deps;

  composerCanvas.addEventListener("pointerdown", onComposerPointerDown);
  composerCanvas.addEventListener("pointermove", onComposerPointerMove);
  composerCanvas.addEventListener("pointerup", onComposerPointerUp);
  composerCanvas.addEventListener("pointercancel", onComposerPointerUp);
  composerCanvas.addEventListener("pointerleave", onComposerPointerUp);
  composerCanvas.addEventListener(
    "wheel",
    (event) => {
      onComposerWheel(event);
    },
    { passive: false }
  );
  composerCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}
