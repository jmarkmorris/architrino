// Exact F6c sector-current transport in the collective speed frame
// q=(hDot,rhoDot,rho*thetaDot). These identities are prescribed-chart
// geometry; they do not assert retention, particle identity, or an effective
// magnetic-field projection.

export function f6cCurrentCoefficient(sectorName, sector) {
  const positive = sectorName === "positive";
  const angle = sector.theta + (positive ? Math.PI / 6 : Math.PI / 3);
  const sine = Math.sin(angle);
  const cosine = Math.cos(angle);
  const rootSix = Math.sqrt(6);
  const rootThree = Math.sqrt(3);
  return positive
    ? [
      -rootSix * sector.rho * sine,
      rootSix * sector.h * sine,
      rootSix * sector.h * cosine + rootThree * sector.rho,
    ]
    : [
      rootSix * sector.rho * cosine,
      -rootSix * sector.h * cosine,
      rootSix * sector.h * sine - rootThree * sector.rho,
    ];
}

export function f6cCurrentCoefficientDerivative(sectorName, sector) {
  const positive = sectorName === "positive";
  const angle = sector.theta + (positive ? Math.PI / 6 : Math.PI / 3);
  const sine = Math.sin(angle);
  const cosine = Math.cos(angle);
  const rootSix = Math.sqrt(6);
  const rootThree = Math.sqrt(3);
  return positive
    ? [
      -rootSix * (sector.rhoDot * sine
        + sector.rho * cosine * sector.thetaDot),
      rootSix * (sector.hDot * sine
        + sector.h * cosine * sector.thetaDot),
      rootSix * (sector.hDot * cosine
        - sector.h * sine * sector.thetaDot)
        + rootThree * sector.rhoDot,
    ]
    : [
      rootSix * (sector.rhoDot * cosine
        - sector.rho * sine * sector.thetaDot),
      -rootSix * (sector.hDot * cosine
        - sector.h * sine * sector.thetaDot),
      rootSix * (sector.hDot * sine
        + sector.h * cosine * sector.thetaDot)
        - rootThree * sector.rhoDot,
    ];
}

export function f6cSectorCurrentFlow(sectorName, sector, acceleration) {
  const coefficient = f6cCurrentCoefficient(sectorName, sector);
  const coefficientDerivative = f6cCurrentCoefficientDerivative(
    sectorName,
    sector,
  );
  const rateVector = [
    sector.hDot,
    sector.rhoDot,
    sector.rho * sector.thetaDot,
  ];
  const rateVectorDerivative = [
    acceleration.hDDot,
    acceleration.rhoDDot,
    sector.rhoDot * sector.thetaDot
      + sector.rho * acceleration.thetaDDot,
  ];
  const dot = (left, right) => left.reduce(
    (sum, value, component) => sum + value * right[component],
    0,
  );
  const factor = sectorName === "positive" ? -4 / 3 : 4 / 3;
  return {
    coefficient,
    coefficientDerivative,
    rateVector,
    rateVectorDerivative,
    current: factor * dot(coefficient, rateVector),
    currentDerivative: factor * (
      dot(coefficientDerivative, rateVector)
      + dot(coefficient, rateVectorDerivative)
    ),
  };
}

export function f6cAssemblyCurrentDecomposition(sectors) {
  const sectorNames = ["positive", "negative"];
  const factors = { positive: -4 / 3, negative: 4 / 3 };
  const currentRow = sectorNames.flatMap((sectorName) =>
    f6cCurrentCoefficient(sectorName, sectors[sectorName]).map(
      (value) => factors[sectorName] * value,
    ));
  const rateVector = sectorNames.flatMap((sectorName) => {
    const sector = sectors[sectorName];
    return [sector.hDot, sector.rhoDot, sector.rho * sector.thetaDot];
  });
  const dot = (left, right) => left.reduce(
    (sum, value, component) => sum + value * right[component],
    0,
  );
  const current = dot(currentRow, rateVector);
  const currentRowNormSquared = dot(currentRow, currentRow);
  const carrierScale = currentRowNormSquared === 0
    ? 0
    : current / currentRowNormSquared;
  const minimumNormCarrier = currentRow.map((value) => carrierScale * value);
  const currentNeutralResidual = rateVector.map(
    (value, component) => value - minimumNormCarrier[component],
  );
  const rateNormSquared = dot(rateVector, rateVector);
  const carrierNormSquared = dot(minimumNormCarrier, minimumNormCarrier);
  const neutralNormSquared = dot(
    currentNeutralResidual,
    currentNeutralResidual,
  );
  const componentNames = ["axial", "radial", "tangential"];
  const neutralComponentSquared = Object.fromEntries(componentNames.map(
    (component, index) => [
      component,
      currentNeutralResidual[index] ** 2
        + currentNeutralResidual[index + 3] ** 2,
    ],
  ));
  return {
    currentRow,
    rateVector,
    current,
    currentRowNorm: Math.sqrt(currentRowNormSquared),
    minimumRateNormForCurrent: Math.sqrt(carrierNormSquared),
    rateNorm: Math.sqrt(rateNormSquared),
    currentEfficiency: rateNormSquared === 0 || currentRowNormSquared === 0
      ? 0
      : Math.abs(current) / Math.sqrt(
        currentRowNormSquared * rateNormSquared,
      ),
    minimumNormCarrier,
    currentNeutralResidual,
    currentNeutralResidualNorm: Math.sqrt(neutralNormSquared),
    currentNeutralComponentBudget: {
      squared: neutralComponentSquared,
      fractions: Object.fromEntries(Object.entries(neutralComponentSquared)
        .map(([component, value]) => [
          component,
          neutralNormSquared === 0 ? 0 : value / neutralNormSquared,
        ])),
    },
    orthogonalityResidual: dot(currentRow, currentNeutralResidual),
    pythagoreanResidual:
      rateNormSquared - carrierNormSquared - neutralNormSquared,
  };
}
