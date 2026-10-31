import { mountLatticeLab } from "./LatticeLabRuntime.js";

function reportLatticeLabBootstrapError(
  error,
  documentLike = globalThis.document,
  windowLike = globalThis.window,
) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_LATTICE_LAB_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("lattice-lab-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.className = "lattice-lab-boot-error";
  banner.textContent = `Lattice Lab failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  const disturbance = new URL(window.location.href).searchParams.get('section') === 'disturbances';
  document.getElementById('lattice-lab-app').hidden = disturbance;
  document.getElementById('lattice-disturbance-app').hidden = !disturbance;
  try {
    if (disturbance) {
      import('./LatticeDisturbanceRuntime.js').then(({ mountLatticeDisturbance }) => {
        window.__ARCHITRINO_LATTICE_DISTURBANCE__ = mountLatticeDisturbance();
      }).catch(error => {
        document.getElementById('disturbance-message').textContent = 'Disturbance section could not initialize: ' + error.message;
        console.error(error);
      });
    } else window.__ARCHITRINO_LATTICE_LAB_RUNTIME__ = mountLatticeLab();
  } catch (error) {
    reportLatticeLabBootstrapError(error, document, window);
  }
}
