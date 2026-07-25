export function createCausalHistoryLedger(state) {
  const selectedRootId = state.selectedRootId;
  const rows = (state.retainedHistory?.[state.sourceId] ?? []).map((point, index) => {
    const root = state.roots.find(
      (candidate) => Math.abs(Number(candidate.emissionTime) - Number(point.t)) <= 1e-8,
    ) ?? null;
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
            ? "rejected history"
            : "inactive history",
      selected,
      reason: root?.reason ?? "no causal root at this row",
    };
  });
  state.roots.forEach((root) => {
    if (rows.some((row) => row.rootId === root.id)) {
      return;
    }
    const selected = root.id === selectedRootId;
    rows.push({
      id: `history:${state.sourceId}:${root.id}`,
      depth: "root",
      emissionTime: root.emissionTime,
      point: root.emission,
      rootId: root.id,
      state: selected
        ? "selected root history"
        : root.accepted
          ? "currently causal history"
          : "rejected history",
      selected,
      reason: root.reason,
    });
  });
  return rows.sort((left, right) => left.emissionTime - right.emissionTime);
}
