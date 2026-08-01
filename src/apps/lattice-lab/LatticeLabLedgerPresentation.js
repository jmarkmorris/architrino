const RESIDUAL_EPSILON = 1e-12;

export const LATTICE_LAB_LEDGER_SCOPE = Object.freeze({
  CERTIFIED_PERIODIC: "certified-periodic",
  FINITE_NONPERIODIC: "finite-nonperiodic",
  NOT_ESTABLISHED: "not-established",
});

function isFiniteCalculationScope(scope) {
  return scope === LATTICE_LAB_LEDGER_SCOPE.FINITE_NONPERIODIC;
}

function freezeVector(vector) {
  return Object.freeze(vector.map((value) =>
    Math.abs(value) < RESIDUAL_EPSILON ? 0 : Number(value)
  ));
}

function vectorMagnitude(vector) {
  return Math.hypot(...vector);
}

function sumContributionRows(rows) {
  return freezeVector(rows.reduce(
    (sum, row) => sum.map(
      (value, index) => value + row.accelerationRow.normalizedAcceleration[index],
    ),
    [0, 0, 0],
  ));
}

function includedCalculationRows(ledger) {
  return ledger.rows.filter((row) =>
    row.accelerationRow && row.includedInCalculation !== false
  );
}

function formatNumber(value) {
  if (Math.abs(value) < RESIDUAL_EPSILON) {
    return "0";
  }
  if (Math.abs(value) >= 0.001 && Math.abs(value) < 1000) {
    return Number(value.toPrecision(4)).toString();
  }
  return value.toExponential(3);
}

export function formatLedgerVector(vector) {
  if (!vector) {
    return null;
  }
  return `⟨${vector.map(formatNumber).join(", ")}⟩`;
}

function summarizePolarities(rows) {
  const counts = rows.reduce(
    (result, row) => {
      if (row.polarity === "positrino") {
        result.positrino += 1;
      } else if (row.polarity === "electrino") {
        result.electrino += 1;
      }
      return result;
    },
    { positrino: 0, electrino: 0 },
  );
  return [
    counts.positrino
      ? `${counts.positrino} positrino${counts.positrino === 1 ? "" : "s"}`
      : null,
    counts.electrino
      ? `${counts.electrino} electrino${counts.electrino === 1 ? "" : "s"}`
      : null,
  ].filter(Boolean).join(" · ");
}

function createCalculationRows(
  rows,
  { conciseLabels = false, shellOnlyLabels = false } = {},
) {
  let runningResidual = [0, 0, 0];
  return Object.freeze(rows.map((row, rowIndex) => {
    const contribution = freezeVector(
      row.accelerationRow.normalizedAcceleration,
    );
    runningResidual = freezeVector(runningResidual.map(
      (value, index) => value + contribution[index],
    ));
    return Object.freeze({
      shellId: row.shellId,
      shellLabel: row.shellLabel,
      polarity: row.polarity,
      rowLabel: shellOnlyLabels
        ? displayShellLabel(row)
        : conciseLabels
        ? `Contribution ${rowIndex + 1}`
        : `${row.shellLabel} contribution ${rowIndex + 1}`,
      showPolarityInLabel: !conciseLabels && !shellOnlyLabels,
      contribution,
      runningResidual,
    });
  }));
}

function displayShellLabel(shell) {
  const shellId = shell.id ?? shell.shellId;
  return shellId === "nearest"
    ? "Nearest shell"
    : shellId === "next-local"
      ? "Next shell"
      : shell.label;
}

function createShellSummaries(ledger, scope, caseRecord) {
  return Object.freeze(ledger.shells.slice(0, 2).flatMap((shell) => {
    const includedRows = includedCalculationRows({ rows: shell.rows });
    const pairCount = shell.pairs.filter(
      (pair) => pair.accelerationCancelsExactly,
    ).length;
    const label = displayShellLabel(shell);
    if (
      isFiniteCalculationScope(scope) &&
      includedRows.length === 0
    ) {
      return [];
    }
    const vector = scope === LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC
      ? Object.freeze([0, 0, 0])
      : isFiniteCalculationScope(scope)
        ? sumContributionRows(includedRows)
        : null;
    const count = isFiniteCalculationScope(scope)
      ? includedRows.length
      : shell.expectedCount;
    const inversionPairs = [
      "simple-cubic-checkerboard-v1",
      "simple-cubic-alternating-planes-v1",
    ].includes(caseRecord.id);
    const totalLabel = scope === LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC
      ? inversionPairs
        ? `${label}: ${count} contributions → ${pairCount} matching ` +
          `pair${pairCount === 1 ? "" : "s"} → zero`
        : `${label}: ${count} contributions → symmetry-orbit sum → zero`
      : isFiniteCalculationScope(scope)
        ? `${label}: ${count} calculated contribution` +
          `${count === 1 ? "" : "s"} → ${formatLedgerVector(vector)}`
        : `${label}: ${count} sites at ${shell.distance}`;
    return [Object.freeze({
      id: shell.id,
      label,
      count,
      distance: shell.distance,
      polarities: summarizePolarities(shell.rows),
      pairCount,
      vector,
      totalLabel,
    })];
  }));
}

export function createLatticeLabLedgerViewModel({
  caseRecord,
  ledger,
  certificatePassed = false,
  finiteNonperiodic = false,
  siteSelectionExplicit = false,
}) {
  const receiverPolarity = ledger.receiverPolarity === "positrino"
    ? "positrino"
    : "electrino";
  const certifiedPeriodic = Boolean(
    certificatePassed &&
    ledger.certificateApplies &&
    ledger.certifiedExactZero,
  );
  const includedRows = includedCalculationRows(ledger);
  const finiteCalculationRequested = finiteNonperiodic;
  const finiteResidualAvailable = Boolean(
    finiteCalculationRequested &&
    ledger.accelerationRowsAvailable &&
    includedRows.length > 0,
  );
  const residualVector = certifiedPeriodic
    ? Object.freeze([0, 0, 0])
    : finiteResidualAvailable
      ? sumContributionRows(includedRows)
      : null;
  const residualMagnitude = residualVector
    ? vectorMagnitude(residualVector)
    : null;
  const zeroResidual = residualMagnitude !== null &&
    residualMagnitude < RESIDUAL_EPSILON;
  const scope = certifiedPeriodic
    ? LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC
    : finiteResidualAvailable
      ? LATTICE_LAB_LEDGER_SCOPE.FINITE_NONPERIODIC
      : LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED;
  const accelerationAvailable = certifiedPeriodic || finiteResidualAvailable;
  const receiverLabel = finiteCalculationRequested
    ? `Calculation target · Selected ${receiverPolarity}`
    : siteSelectionExplicit
      ? `Selected ${receiverPolarity}`
      : null;
  const outcome = scope === LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED
    ? "not-established"
    : zeroResidual
      ? "zero"
      : "nonzero";

  const outcomeCopy = outcome === "zero"
    ? {
      icon: "✓",
      label: certifiedPeriodic
        ? "Net acceleration is zero at every architrino."
        : "Net acceleration is zero in this finite configuration.",
    }
    : outcome === "nonzero"
      ? {
        icon: "!",
        label: "Non-zero acceleration in this configuration.",
      }
      : {
        icon: null,
        label: null,
      };

  const statement = certifiedPeriodic
    ? caseRecord.id === "simple-cubic-checkerboard-v1"
      ? "In this ideal repeating pattern, matching pulls cancel at every site at release."
      : caseRecord.id === "hcp-abab-layers-v1"
        ? "At the undeformed baseline of this ideal repeating pattern, complete symmetry orbits cancel at every site at release."
        : "In this ideal repeating pattern, complete symmetry orbits cancel at every site at release."
    : finiteResidualAvailable
      ? zeroResidual
        ? "The calculated contributions cancel in this displayed finite configuration only."
        : "The calculated contributions leave a nonzero initial acceleration residual in this displayed finite configuration."
      : ledger.certificateValidation && !ledger.certificateValidation.passed
        ? "Periodic acceleration is not established for this deformation: " +
          `${ledger.certificateValidation.reason}.`
        : "Acceleration has not been calculated for this geometry.";
  return Object.freeze({
    outcome,
    scope,
    icon: outcomeCopy.icon,
    outcomeLabel: outcomeCopy.label,
    receiverLabel,
    statement,
    residualMagnitude,
    residualMagnitudeLabel: residualMagnitude === null
      ? null
      : formatNumber(residualMagnitude),
    residualVector,
    residualVectorLabel: formatLedgerVector(residualVector),
    residualLineLabel: residualVector
      ? `Magnitude ${formatNumber(residualMagnitude)} · Vector ${formatLedgerVector(residualVector)}`
      : null,
    shellSummaries: createShellSummaries(ledger, scope, caseRecord),
    calculationAvailable: accelerationAvailable,
    calculationRows: accelerationAvailable
      ? createCalculationRows(includedRows, {
        conciseLabels: Boolean(caseRecord.randomization),
        shellOnlyLabels: caseRecord.id === "hcp-abab-layers-v1",
      })
      : Object.freeze([]),
    shellScopeNote: certifiedPeriodic
      ? "These two shell totals are local examples. The separate certificate covers the full declared repeating pattern."
      : finiteResidualAvailable
        ? "These are local-shell summaries. The disclosed calculation includes every other site in the displayed finite configuration."
        : "Shell counts describe geometry only; they are not acceleration totals.",
    caseTitle: caseRecord.title,
  });
}

function replaceChildren(element, children) {
  element.replaceChildren?.(...children);
  if (!element.replaceChildren) {
    element.textContent = "";
    children.forEach((child) => element.append(child));
  }
}

export function renderLatticeLabLedgerViewModel({
  documentLike,
  dom,
  viewModel,
}) {
  const calculationExists = viewModel.calculationAvailable;
  dom.root.dataset.scope = viewModel.scope;
  dom.root.dataset.outcome = viewModel.outcome;
  dom.receiver.textContent = viewModel.receiverLabel ?? "";
  dom.receiver.hidden = !viewModel.receiverLabel;
  dom.result.hidden = !calculationExists;
  dom.icon.textContent = viewModel.icon ?? "";
  dom.outcome.textContent = viewModel.outcomeLabel ?? "";
  dom.residual.textContent = viewModel.residualLineLabel ?? "";
  dom.statement.textContent = viewModel.statement;

  const shellElements = viewModel.shellSummaries.map((shell) => {
    const row = documentLike.createElement("p");
    row.className = "lattice-lab-ledger-shell";
    row.textContent = shell.totalLabel;
    return row;
  });
  replaceChildren(dom.shells, shellElements);
  dom.shells.hidden = shellElements.length === 0;
  dom.shellScope.textContent = calculationExists
    ? viewModel.shellScopeNote
    : "";
  dom.shellScope.hidden = !calculationExists;

  dom.calculation.hidden = !calculationExists;
  if (!calculationExists) {
    dom.calculation.open = false;
  }
  const calculationRows = viewModel.calculationRows.map((row) => {
    const rowElement = documentLike.createElement("div");
    rowElement.className = "lattice-lab-ledger-calculation-row";

    const label = documentLike.createElement("span");
    label.className = "lattice-lab-ledger-calculation-label";
    label.textContent = row.showPolarityInLabel
      ? `${row.rowLabel} · ${row.polarity}`
      : row.rowLabel;

    const values = documentLike.createElement("span");
    values.className = "lattice-lab-ledger-calculation-values";
    values.textContent = `${formatLedgerVector(row.contribution)} → ${formatLedgerVector(row.runningResidual)}`;
    rowElement.append(label, values);
    return rowElement;
  });
  replaceChildren(dom.calculationRows, calculationRows);
}
