export function wirePdgviewCanvasUiListeners(deps) {
  const {
    pdgviewCanvas,
    onPdgviewPointerDown,
    onPdgviewPointerMove,
    onPdgviewPointerUp,
    onPdgviewWheel,
    onPdgviewContextMenu,
  } = deps;

  pdgviewCanvas.addEventListener("pointerdown", onPdgviewPointerDown);
  pdgviewCanvas.addEventListener("pointermove", onPdgviewPointerMove);
  pdgviewCanvas.addEventListener("pointerup", onPdgviewPointerUp);
  pdgviewCanvas.addEventListener("pointercancel", onPdgviewPointerUp);
  pdgviewCanvas.addEventListener("pointerleave", onPdgviewPointerUp);
  pdgviewCanvas.addEventListener(
    "wheel",
    (event) => {
      onPdgviewWheel(event);
    },
    { passive: false }
  );
  pdgviewCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    onPdgviewContextMenu?.(event);
  });
}
