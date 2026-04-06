import { buildReactionSnapshotFromSolverResult } from "./ReactionSolverResultAdapterRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

export function inferNextCanvasSequenceValue(values = [], prefix = "") {
  return (
    values.reduce((maxValue, value) => {
      const match = String(value ?? "").match(new RegExp(`^${prefix}(\\d+)$`));
      if (!match) {
        return maxValue;
      }
      return Math.max(maxValue, Number(match[1]) || 0);
    }, 0) + 1
  );
}

export function createReactionCanvasDocumentRuntime(options = {}) {
  const state = options?.state ?? {};
  const cloneSerializableValue =
    typeof options?.cloneSerializableValue === "function"
      ? options.cloneSerializableValue
      : (value) => value;
  const clearDragState =
    typeof options?.clearDragState === "function" ? options.clearDragState : () => {};
  const clearAllRecentRouteState =
    typeof options?.clearAllRecentRouteState === "function"
      ? options.clearAllRecentRouteState
      : () => {};
  const closeMenu = typeof options?.closeMenu === "function" ? options.closeMenu : () => {};
  const render = typeof options?.render === "function" ? options.render : () => {};
  const notifySnapshotChange =
    typeof options?.notifySnapshotChange === "function"
      ? options.notifySnapshotChange
      : () => buildSerializableSnapshot();
  const setStatus = typeof options?.setStatus === "function" ? options.setStatus : () => {};
  const syncHeaderActionButtons =
    typeof options?.syncHeaderActionButtons === "function"
      ? options.syncHeaderActionButtons
      : () => {};
  const solveSnapshot =
    typeof options?.solveSnapshot === "function" ? options.solveSnapshot : null;
  const buildNodeKey =
    typeof options?.buildNodeKey === "function" ? options.buildNodeKey : () => "";
  const resolveBinaryChoiceInventory =
    typeof options?.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : () => null;

  function buildSerializableSnapshot() {
    return {
      participants: cloneSerializableValue(state.participants),
      mappings: cloneSerializableValue(state.mappings),
    };
  }

  function replaceSnapshot(snapshot = {}, replaceOptions = {}) {
    const nextParticipants = cloneSerializableValue(
      Array.isArray(snapshot?.participants) ? snapshot.participants : []
    );
    const nextMappings = cloneSerializableValue(
      Array.isArray(snapshot?.mappings) ? snapshot.mappings : []
    );
    clearDragState();
    state.participants = nextParticipants;
    state.mappings = nextMappings;
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.pendingSourceAnchorInstanceIndex = null;
    state.hoveredMappingIds = [];
    state.isSolving = false;
    clearAllRecentRouteState();
    state.nextParticipantId = inferNextCanvasSequenceValue(
      nextParticipants.map((participant) => participant?.id),
      "canvas_participant_"
    );
    state.nextMappingId = inferNextCanvasSequenceValue(
      nextMappings.map((mapping) => mapping?.id),
      "canvas_mapping_"
    );
    closeMenu();
    render();
    notifySnapshotChange();
    if (replaceOptions?.announce) {
      setStatus(
        normalizeText(replaceOptions?.statusMessage) ||
          "Reaction review candidate loaded into the canvas."
      );
    }
    return buildSerializableSnapshot();
  }

  async function solveReactionCanvas() {
    if (!state.active) {
      setStatus("Open the reaction app before running solve.");
      return false;
    }
    if (typeof solveSnapshot !== "function") {
      setStatus("Reaction solve bridge is unavailable in this runtime.");
      return false;
    }
    if (state.isSolving) {
      setStatus("Reaction solve is already running.");
      return false;
    }

    state.isSolving = true;
    syncHeaderActionButtons();
    setStatus("Sending authored Reaction request to solver...");

    try {
      const solution = await Promise.resolve(
        solveSnapshot(buildSerializableSnapshot(), {
          requestId: "reaction_canvas",
          origin: {
            sourceKind: "reaction",
            sourceDocumentId: "reaction_canvas",
            title: "Reaction Canvas",
          },
          buildNodeKey,
          resolveBinaryChoiceInventory,
        })
      );
      const result = solution?.result ?? null;
      const solvedSnapshot = buildReactionSnapshotFromSolverResult(result);
      replaceSnapshot(solvedSnapshot, {
        announce: false,
      });

      const unresolvedProductCount = Number(solution?.unresolvedTargetCount ?? 0);
      const unresolvedReactantCount = Number(solution?.unresolvedReactantCount ?? 0);
      setStatus(
        `Solver returned ${normalizeText(solution?.planDescription) || normalizeText(result?.summary?.outcome) || "a result"}. ${unresolvedProductCount} product${
          unresolvedProductCount === 1 ? "" : "s"
        } and ${unresolvedReactantCount} reactant${
          unresolvedReactantCount === 1 ? "" : "s"
        } remain unresolved.`
      );
      return true;
    } catch (error) {
      setStatus(normalizeText(error?.message) || "Reaction solve failed.");
      return false;
    } finally {
      state.isSolving = false;
      syncHeaderActionButtons();
    }
  }

  return {
    buildSerializableSnapshot,
    replaceSnapshot,
    solveReactionCanvas,
  };
}
