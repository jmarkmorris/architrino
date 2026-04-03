import { createReactionAppRuntime } from "./ReactionAppRuntime.js";

const reactionAppRuntime = createReactionAppRuntime({
  statusElement: document.getElementById("reaction-status"),
  root: document.getElementById("reaction-canvas"),
  surface: document.getElementById("reaction-canvas-surface"),
  reactantsColumn: document.getElementById("reaction-canvas-reactants"),
  productsColumn: document.getElementById("reaction-canvas-products"),
  mapHint: document.getElementById("reaction-status"),
  emptyState: document.getElementById("reaction-canvas-empty"),
  mapSvg: document.getElementById("reaction-canvas-svg"),
  menu: document.getElementById("reaction-canvas-menu"),
  clearButton: document.getElementById("reaction-clear-button"),
  solveButton: document.getElementById("reaction-solve-button"),
  exitButton: document.getElementById("reaction-exit-button"),
});

reactionAppRuntime.init();
