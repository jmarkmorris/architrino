function finiteVector(value) {
  if (Array.isArray(value) && value.length >= 2) {
    const x = Number(value[0]);
    const y = Number(value[1]);
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
  }
  if (value && typeof value === "object") {
    const x = Number(value.x);
    const y = Number(value.y);
    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
  }
  return null;
}

function stableBranchColor(id) {
  const hash = [...String(id)].reduce(
    (value, character) => ((value * 33) ^ character.codePointAt(0)) >>> 0,
    5381,
  );
  return `hsl(${hash % 360} 78% 70%)`;
}

export function createBranchLabView(state, {
  historyAgeLimit = state.branchFilters?.historyAgeLimit ?? Number.POSITIVE_INFINITY,
  minimumContribution = state.branchFilters?.minimumContribution ?? 0,
  rootKind = state.branchFilters?.rootKind ?? "all",
  transversalityFloor = state.branchFilters?.transversalityFloor ?? 0,
} = {}) {
  const rows = [...state.acceptedBranchRows, ...state.rejectedBranchRows]
    .map((row, index) => {
      const acceleration = finiteVector(row.acceleration);
      const accelerationAvailable = acceleration !== null;
      const magnitude = accelerationAvailable
        ? Math.hypot(acceleration.x, acceleration.y)
        : Number.NaN;
      const age = Number(state.receiverTime) - Number(row.emissionTime);
      const filterReasons = [
        !accelerationAvailable ? "acceleration unavailable" : null,
        Number.isFinite(age) && age > historyAgeLimit ? "outside history-age filter" : null,
        accelerationAvailable && magnitude < minimumContribution
          ? "below contribution-magnitude filter"
          : null,
        rootKind !== "all" && row.rootKind !== rootKind ? "outside root-kind filter" : null,
        row.accepted &&
          Number.isFinite(Number(row.transversality)) &&
          Math.abs(Number(row.transversality)) < transversalityFloor
          ? "below transversality-floor filter"
          : null,
      ].filter(Boolean);
      return {
        ...row,
        id: row.id ?? `branch:${index + 1}`,
        color: stableBranchColor(row.id ?? `branch:${index + 1}`),
        acceleration,
        accelerationAvailable,
        magnitude,
        age,
        included: filterReasons.length === 0,
        filterReason: filterReasons.join("; "),
      };
    });
  const includedRows = rows.filter((row) => row.included);
  const acceptedRows = includedRows.filter((row) => row.accepted);
  const rejectedRows = includedRows.filter((row) => !row.accepted);
  const vectorSum = acceptedRows.reduce(
    (sum, row) => ({
      x: sum.x + (row.acceleration?.x ?? 0),
      y: sum.y + (row.acceleration?.y ?? 0),
    }),
    { x: 0, y: 0 },
  );
  return {
    rows,
    includedRows,
    acceptedRows,
    rejectedRows,
    filteredRows: rows.filter((row) => !row.included),
    allRejectedRows: rows.filter((row) => !row.accepted),
    vectorSum,
    vectorMagnitude: Math.hypot(vectorSum.x, vectorSum.y),
    sourceRows: acceptedRows.map((row) => row.id),
  };
}
