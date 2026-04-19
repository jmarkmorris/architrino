export function wireAnimatorCanvasUiListeners(deps) {
  const {
    animatorCanvas,
    onAnimatorPointerDown,
    onAnimatorPointerMove,
    onAnimatorPointerUp,
    onAnimatorWheel,
    onAnimatorContextMenu,
  } = deps;

  animatorCanvas.addEventListener("pointerdown", onAnimatorPointerDown);
  animatorCanvas.addEventListener("pointermove", onAnimatorPointerMove);
  animatorCanvas.addEventListener("pointerup", onAnimatorPointerUp);
  animatorCanvas.addEventListener("pointercancel", onAnimatorPointerUp);
  animatorCanvas.addEventListener("pointerleave", onAnimatorPointerUp);
  animatorCanvas.addEventListener(
    "wheel",
    (event) => {
      onAnimatorWheel(event);
    },
    { passive: false }
  );
  animatorCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    onAnimatorContextMenu?.(event);
  });
}
