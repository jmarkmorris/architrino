import { createReactionAppRuntime } from "./ReactionAppRuntime.js";

const reactionAppRuntime = createReactionAppRuntime({
  statusElement: document.getElementById("reaction-status"),
  root: document.getElementById("reaction-solver"),
  surface: document.getElementById("reaction-solver-surface"),
  reactantsColumn: document.getElementById("reaction-solver-reactants"),
  productsColumn: document.getElementById("reaction-solver-products"),
  mapHint: document.getElementById("reaction-status"),
  emptyState: document.getElementById("reaction-solver-empty"),
  mapSvg: document.getElementById("reaction-solver-svg"),
  menu: document.getElementById("reaction-solver-menu"),
  clearButton: document.getElementById("reaction-clear-button"),
  solveButton: document.getElementById("reaction-solve-button"),
  exitButton: document.getElementById("reaction-exit-button"),
});

reactionAppRuntime.init();
