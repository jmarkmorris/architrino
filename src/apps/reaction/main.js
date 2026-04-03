import { createReactionAppRuntime } from "./ReactionAppRuntime.js";
import { createBrowserReactionSolveSnapshot } from "./ReactionSolverBrowserRuntime.js";

const reactionAppRuntimeDeps = globalThis.__ARCHITRINO_REACTION_APP_DEPS__ ?? {};
const defaultBrowserSolveSnapshot = createBrowserReactionSolveSnapshot({
  windowLike: globalThis.window,
  fetchImpl: typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  endpoint: reactionAppRuntimeDeps.solveEndpoint,
});

const reactionAppRuntime = createReactionAppRuntime({
  reviewStateElement: document.getElementById("reaction-review-state"),
  statusElement: document.getElementById("reaction-status"),
  root: document.getElementById("reaction-canvas"),
  surface: document.getElementById("reaction-canvas-surface"),
  reactantsColumn: document.getElementById("reaction-canvas-reactants"),
  productsColumn: document.getElementById("reaction-canvas-products"),
  mapHint: document.getElementById("reaction-hint"),
  legibilityPanel: document.getElementById("reaction-legibility-panel"),
  emptyState: document.getElementById("reaction-canvas-empty"),
  mapSvg: document.getElementById("reaction-canvas-svg"),
  menu: document.getElementById("reaction-canvas-menu"),
  acceptButton: document.getElementById("reaction-accept-button"),
  exportButton: document.getElementById("reaction-export-button"),
  clearButton: document.getElementById("reaction-clear-button"),
  solveButton: document.getElementById("reaction-solve-button"),
  exitButton: document.getElementById("reaction-exit-button"),
  solveSnapshot:
    typeof reactionAppRuntimeDeps.solveSnapshot === "function"
      ? reactionAppRuntimeDeps.solveSnapshot
      : defaultBrowserSolveSnapshot,
});

reactionAppRuntime.init();
