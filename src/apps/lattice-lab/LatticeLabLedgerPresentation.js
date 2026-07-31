const RESIDUAL_EPSILON = 1e-12;

export const LATTICE_LAB_LEDGER_SCOPE = Object.freeze({
  CERTIFIED_PERIODIC: "certified-periodic",
  FINITE_NONPERIODIC: "finite-nonperiodic",
  NOT_ESTABLISHED: "not-established",
});

function freezeVector(vector) {
  return Object.freeze(vector.map((value) =>
    Math.abs(value) < RESIDUAL_EPSILON ? 0 : Number(value)
  ));
}

function vectorMagnitude(vector) {
  return Math.hypot(...vector);
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

function createCalculationRows(ledger) {
  let runningResidual = [0, 0, 0];
  return Object.freeze(ledger.rows.map((row) => {
    if (!row.accelerationRow) {
      return Object.freeze({
        shellId: row.shellId,
        shellLabel: row.shellLabel,
        polarity: row.polarity,
        direction: row.geometryDirection,
        contribution: null,
        runningResidual: null,
        availability: row.availability,
      });
    }
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
      direction: row.geometryDirection,
      contribution,
      runningResidual,
      availability: row.availability,
    });
  }));
}

function createShellSummaries(ledger, accelerationAvailable) {
  return Object.freeze(ledger.shells.map((shell) => {
    const pairCount = shell.pairs.filter(
      (pair) => pair.accelerationCancelsExactly,
    ).length;
    const vector = accelerationAvailable
      ? shell.normalizedAccelerationResidual
      : null;
    return Object.freeze({
      id: shell.id,
      label: shell.label,
      count: shell.expectedCount,
      distance: shell.distance,
      polarities: summarizePolarities(shell.rows),
      pairCount,
      vector,
      totalLabel: vector
        ? `${shell.expectedCount} contributions → ${pairCount} matching ` +
          `pair${pairCount === 1 ? "" : "s"} → ${formatLedgerVector(vector)}`
        : `${shell.expectedCount} sites at ${shell.distance}`,
      meaning: vector
        ? "Local shell sum"
        : null,
    });
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
  const finiteResidualAvailable = Boolean(
    finiteNonperiodic &&
    ledger.accelerationRowsAvailable &&
    ledger.normalizedAccelerationResidual,
  );
  const residualVector = certifiedPeriodic
    ? Object.freeze([0, 0, 0])
    : finiteResidualAvailable
      ? freezeVector(ledger.normalizedAccelerationResidual)
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
  const receiverLabel = siteSelectionExplicit
    ? `Selected ${receiverPolarity}`
    : certifiedPeriodic
      ? "All sites in this case"
      : `Reference ${receiverPolarity} site`;
  const outcome = scope === LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED
    ? "not-established"
    : zeroResidual
      ? "zero"
      : "nonzero";

  const outcomeCopy = outcome === "zero"
    ? {
      icon: "✓",
      label: certifiedPeriodic
        ? "Zero residual — certified"
        : "Zero residual in displayed finite scope",
      scopeLabel: certifiedPeriodic
        ? "Certified repeating pattern"
        : "Displayed finite configuration",
    }
    : outcome === "nonzero"
      ? {
        icon: "!",
        label: "Nonzero residual in displayed finite scope",
        scopeLabel: "Displayed finite configuration",
      }
      : {
        icon: null,
        label: null,
        scopeLabel: "Geometry reference",
      };

  const statement = certifiedPeriodic
    ? "In this ideal repeating pattern, matching pulls cancel at every site at release."
    : finiteResidualAvailable
      ? zeroResidual
        ? "The calculated contributions cancel in this displayed finite configuration only."
        : "The calculated contributions leave a nonzero initial acceleration residual in this displayed finite configuration."
      : "Acceleration has not been calculated for this geometry.";
  const residualMeaning = certifiedPeriodic
    ? "Zero means the declared repeating-pattern contributions cancel exactly."
    : finiteResidualAvailable
      ? "This dimensionless value is the magnitude of the calculated residual for the displayed finite configuration."
      : null;

  return Object.freeze({
    outcome,
    scope,
    icon: outcomeCopy.icon,
    outcomeLabel: outcomeCopy.label,
    scopeLabel: outcomeCopy.scopeLabel,
    receiverLabel,
    statement,
    residualMagnitude,
    residualMagnitudeLabel: residualMagnitude === null
      ? null
      : formatNumber(residualMagnitude),
    residualVector,
    residualVectorLabel: formatLedgerVector(residualVector),
    residualMeaning,
    shellSummaries: createShellSummaries(ledger, accelerationAvailable),
    calculationAvailable: accelerationAvailable,
    calculationRows: accelerationAvailable
      ? createCalculationRows(ledger)
      : Object.freeze([]),
    shellScopeNote: certifiedPeriodic
      ? "These two shell totals are local examples. The separate certificate covers the full declared repeating pattern."
      : finiteResidualAvailable
        ? "These totals cover the displayed finite configuration only."
        : "Shell counts describe geometry only; they are not acceleration totals.",
    caseTitle: caseRecord.title,
  });
}
