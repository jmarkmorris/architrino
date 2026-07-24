export function createCausalHistoryLedger(state) {
  const selectedRootId = state.selectedRootId;
  const rootByEmissionTime = new Map(
    state.roots.map((root) => [root.emissionTime.toFixed(8), root]),
  );
  const rows = (state.retainedHistory?.[state.sourceId] ?? []).map((point, index) => {
    const exactRoot = rootByEmissionTime.get(Number(point.t).toFixed(8));
    const nearestRoot = state.roots.reduce((nearest, root) => {
      const distance = Math.abs(Number(root.emissionTime) - Number(point.t));
      return !nearest || distance < nearest.distance ? { root, distance } : nearest;
    }, null);
    const root = exactRoot ?? (nearestRoot?.distance <= 0.03 ? nearestRoot.root : null);
    const selected = root?.id === selectedRootId;
    return {
      id: `history:${state.sourceId}:${point.depth ?? index + 1}`,
      depth: point.depth ?? index + 1,
      emissionTime: Number(point.t),
      point,
      rootId: root?.id ?? null,
      state: selected
        ? "selected root history"
        : root?.accepted
          ? "currently causal history"
          : root
            ? `rejected history: ${root.reason}`
            : "inactive history",
      selected,
      reason: root?.reason ?? "no causal root at this row",
    };
  });
  const selectedRoot = state.roots.find((root) => root.id === selectedRootId);
  if (selectedRoot && !rows.some((row) => row.rootId === selectedRoot.id)) {
    rows.push({
      id: `history:${state.sourceId}:root`,
      depth: "root",
      emissionTime: selectedRoot.emissionTime,
      point: selectedRoot.emission,
      rootId: selectedRoot.id,
      state: selectedRoot.accepted ? "selected root history" : `rejected history: ${selectedRoot.reason}`,
      selected: true,
      reason: selectedRoot.reason,
    });
  }
  return rows.sort((left, right) => left.emissionTime - right.emissionTime);
}

