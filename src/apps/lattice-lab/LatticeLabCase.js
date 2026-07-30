import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicAccelerationRow,
  simpleCubicCheckerboardPolarityAtGrid,
} from "./SimpleCubicStationaryLedger.js";

export const LATTICE_LAB_CASE_ID = "simple-cubic-checkerboard-v1";
export const LATTICE_LAB_DISPLAY_RADIUS = 3.25;
export const LATTICE_LAB_GRID_SPAN = 8;
export const LATTICE_LAB_DEFAULT_SITE_ID = "site-3-3-3";

export const LATTICE_LAB_POLARITY = Object.freeze({
  ELECTRINO: "electrino",
  POSITRINO: "positrino",
});

const LOCAL_SHELLS = Object.freeze([
  Object.freeze({
    id: "nearest",
    label: "Nearest shell",
    distance: "d",
    pairs: Object.freeze([
      Object.freeze({ label: "−X ↔ +X", offsets: Object.freeze([Object.freeze([-1, 0, 0]), Object.freeze([1, 0, 0])]) }),
      Object.freeze({ label: "−Y ↔ +Y", offsets: Object.freeze([Object.freeze([0, -1, 0]), Object.freeze([0, 1, 0])]) }),
      Object.freeze({ label: "−Z ↔ +Z", offsets: Object.freeze([Object.freeze([0, 0, -1]), Object.freeze([0, 0, 1])]) }),
    ]),
  }),
  Object.freeze({
    id: "next-local",
    label: "Next local shell",
    distance: "√2d",
    pairs: Object.freeze([
      Object.freeze({ label: "−X−Y ↔ +X+Y", offsets: Object.freeze([Object.freeze([-1, -1, 0]), Object.freeze([1, 1, 0])]) }),
      Object.freeze({ label: "−X+Y ↔ +X−Y", offsets: Object.freeze([Object.freeze([-1, 1, 0]), Object.freeze([1, -1, 0])]) }),
      Object.freeze({ label: "−X−Z ↔ +X+Z", offsets: Object.freeze([Object.freeze([-1, 0, -1]), Object.freeze([1, 0, 1])]) }),
      Object.freeze({ label: "−X+Z ↔ +X−Z", offsets: Object.freeze([Object.freeze([-1, 0, 1]), Object.freeze([1, 0, -1])]) }),
      Object.freeze({ label: "−Y−Z ↔ +Y+Z", offsets: Object.freeze([Object.freeze([0, -1, -1]), Object.freeze([0, 1, 1])]) }),
      Object.freeze({ label: "−Y+Z ↔ +Y−Z", offsets: Object.freeze([Object.freeze([0, -1, 1]), Object.freeze([0, 1, -1])]) }),
    ]),
  }),
]);

function createSiteId(ix, iy, iz) {
  return `site-${ix}-${iy}-${iz}`;
}

function freezeVector(vector) {
  return Object.freeze(vector.map(Number));
}

export function createSimpleCubicCheckerboardCase() {
  const sites = [];
  const halfSpan = (LATTICE_LAB_GRID_SPAN - 1) / 2;
  for (let ix = 0; ix < LATTICE_LAB_GRID_SPAN; ix += 1) {
    for (let iy = 0; iy < LATTICE_LAB_GRID_SPAN; iy += 1) {
      for (let iz = 0; iz < LATTICE_LAB_GRID_SPAN; iz += 1) {
        const position = [
          ix - halfSpan,
          iy - halfSpan,
          iz - halfSpan,
        ];
        if (Math.hypot(...position) > LATTICE_LAB_DISPLAY_RADIUS) {
          continue;
        }
        sites.push(Object.freeze({
          id: createSiteId(ix, iy, iz),
          grid: Object.freeze([ix, iy, iz]),
          position: Object.freeze(position),
          polarity: (ix + iy + iz) % 2 === 0
            ? LATTICE_LAB_POLARITY.POSITRINO
            : LATTICE_LAB_POLARITY.ELECTRINO,
        }));
      }
    }
  }

  return Object.freeze({
    schema: "lattice-lab-case/v1",
    id: LATTICE_LAB_CASE_ID,
    title: "Simple-cubic checkerboard",
    geometry: "simple cubic",
    polarityRule: "alternating parity at every nearest-neighbor step",
    nearestNeighborDistance: "d",
    coordinationNumber: 6,
    nearestShell: Object.freeze({ count: 6, distance: "d" }),
    nextLocalShell: Object.freeze({ count: 12, distance: "√2d" }),
    selectedLocalTotal: 18,
    geometricSiteDensity: "n = 1/d³",
    boundaryTreatment:
      "finite spherical display crop containing every simple-cubic site center within radius 3.25d; continuation is not shown",
    calculationBoundaryTreatment:
      "ideal stationary infinite repeat with receiver-centered inversion-symmetric exhaustion",
    evidenceStatus:
      "derived stationary-release cancellation under the declared exhaustion",
    accelerationCertificate: SIMPLE_CUBIC_STATIONARY_CONTRACT,
    accelerationStatus:
      "derived exact zero at every site for the stationary reference repeat under receiver-centered inversion-symmetric exhaustion",
    sites: Object.freeze(sites),
  });
}

export function createSimpleCubicPolarityRepeatCellSites() {
  const sites = [];
  for (let ix = 0; ix < 2; ix += 1) {
    for (let iy = 0; iy < 2; iy += 1) {
      for (let iz = 0; iz < 2; iz += 1) {
        sites.push(Object.freeze({
          id: `repeat-${ix}-${iy}-${iz}`,
          position: Object.freeze([ix - 0.5, iy - 0.5, iz - 0.5]),
          polarity: (ix + iy + iz) % 2 === 0
            ? LATTICE_LAB_POLARITY.POSITRINO
            : LATTICE_LAB_POLARITY.ELECTRINO,
        }));
      }
    }
  }
  return Object.freeze(sites);
}

export function createReferencePolarityState(caseRecord) {
  return Object.freeze(Object.fromEntries(
    caseRecord.sites.map((site) => [site.id, site.polarity]),
  ));
}

export function countLatticePolarities(polarityBySiteId) {
  return Object.freeze(Object.values(polarityBySiteId).reduce(
    (counts, polarity) => {
      if (polarity === LATTICE_LAB_POLARITY.ELECTRINO) {
        counts.electrino += 1;
      } else if (polarity === LATTICE_LAB_POLARITY.POSITRINO) {
        counts.positrino += 1;
      }
      return counts;
    },
    { electrino: 0, positrino: 0 },
  ));
}

export function isReferenceLatticeConfiguration(caseRecord, polarityBySiteId) {
  return caseRecord.sites.every(
    (site) => polarityBySiteId[site.id] === site.polarity,
  );
}

export function getLatticeSite(caseRecord, siteId) {
  return caseRecord.sites.find((site) => site.id === siteId) ?? null;
}

export function swapOppositeLatticePolarities(
  caseRecord,
  polarityBySiteId,
  firstSiteId,
  secondSiteId,
) {
  const firstSite = getLatticeSite(caseRecord, firstSiteId);
  const secondSite = getLatticeSite(caseRecord, secondSiteId);
  if (!firstSite || !secondSite) {
    throw new RangeError("Both polarity-swap sites must belong to the active case.");
  }
  if (firstSite.id === secondSite.id) {
    throw new RangeError("Choose two different sites for a polarity swap.");
  }
  const firstPolarity = polarityBySiteId[firstSite.id];
  const secondPolarity = polarityBySiteId[secondSite.id];
  if (firstPolarity === secondPolarity) {
    throw new RangeError("Site B must have the opposite polarity from site A.");
  }

  const next = Object.freeze({
    ...polarityBySiteId,
    [firstSite.id]: secondPolarity,
    [secondSite.id]: firstPolarity,
  });
  const counts = countLatticePolarities(next);
  if (counts.electrino !== counts.positrino) {
    throw new Error("The requested swap did not preserve exact 50/50 neutrality.");
  }
  return next;
}

export function createSelectedSiteLedger(
  caseRecord,
  polarityBySiteId,
  selectedSiteId,
) {
  const receiver = getLatticeSite(caseRecord, selectedSiteId);
  if (!receiver) {
    throw new RangeError(`Unknown selected lattice site: ${String(selectedSiteId)}.`);
  }
  const siteByGridKey = new Map(
    caseRecord.sites.map((site) => [site.grid.join(","), site]),
  );
  const referenceConfiguration = isReferenceLatticeConfiguration(
    caseRecord,
    polarityBySiteId,
  );
  const combinedResidual = [0, 0, 0];
  const combinedAccelerationResidual = [0, 0, 0];
  const shells = LOCAL_SHELLS.map((shell) => {
    const shellResidual = [0, 0, 0];
    const shellAccelerationResidual = [0, 0, 0];
    let visibleCount = 0;
    let resolvedCount = 0;
    const pairs = shell.pairs.map((pair) => {
      const positions = pair.offsets.map((offset) => {
        const neighborGrid = receiver.grid.map(
          (coordinate, index) => coordinate + offset[index],
        );
        const neighbor = siteByGridKey.get(neighborGrid.join(",")) ?? null;
        const continuationPolarity = referenceConfiguration
          ? simpleCubicCheckerboardPolarityAtGrid(neighborGrid)
          : null;
        const neighborPolarity = neighbor
          ? polarityBySiteId[neighbor.id]
          : continuationPolarity;
        const distance = Math.hypot(...offset);
        const unitDirection = offset.map((value) => value / distance);
        if (neighbor) {
          visibleCount += 1;
        }
        if (neighborPolarity) {
          resolvedCount += 1;
          unitDirection.forEach((value, index) => {
            shellResidual[index] += value;
            combinedResidual[index] += value;
          });
        }
        const accelerationRow = neighborPolarity
          ? createStationarySimpleCubicAccelerationRow({
            receiverGrid: receiver.grid,
            transmitterGrid: neighborGrid,
            receiverPolarity: polarityBySiteId[receiver.id],
            transmitterPolarity: neighborPolarity,
          })
          : null;
        accelerationRow?.normalizedAcceleration.forEach((value, index) => {
          shellAccelerationResidual[index] += value;
          combinedAccelerationResidual[index] += value;
        });
        return Object.freeze({
          neighborId: neighbor?.id ?? null,
          neighborGrid: freezeVector(neighborGrid),
          polarity: neighborPolarity,
          offset: freezeVector(offset),
          unitDirection: neighborPolarity ? freezeVector(unitDirection) : null,
          accelerationRow,
          availability: neighbor
            ? "displayed-neighbor"
            : neighborPolarity
              ? "ideal-continuation-not-displayed"
              : "continuation-not-shown",
        });
      });
      const pairComplete = positions.every(
        (position) => position.accelerationRow,
      );
      const pairResidual = pairComplete
        ? positions.reduce(
          (residual, position) => residual.map(
            (value, index) => value + position.unitDirection[index],
          ),
          [0, 0, 0],
        )
        : null;
      const accelerationNumeratorResidual = pairComplete
        ? positions[0].accelerationRow.accelerationNumerator.map(
          (value, index) =>
            value + positions[1].accelerationRow.accelerationNumerator[index],
        )
        : null;
      const accelerationResidual = pairComplete
        ? positions[0].accelerationRow.normalizedAcceleration.map(
          (value, index) =>
            value + positions[1].accelerationRow.normalizedAcceleration[index],
        )
        : null;
      const sameAccelerationDenominator = pairComplete &&
        positions[0].accelerationRow.separationSquared ===
          positions[1].accelerationRow.separationSquared;
      return Object.freeze({
        label: pair.label,
        distance: shell.distance,
        positions: Object.freeze(positions),
        availability: pairComplete
          ? "resolved-antipodal-pair"
          : "continuation-not-shown",
        equalPolarity: pairComplete &&
          positions[0].polarity === positions[1].polarity,
        geometryResidual: pairResidual ? freezeVector(pairResidual) : null,
        accelerationNumeratorResidual: accelerationNumeratorResidual
          ? freezeVector(accelerationNumeratorResidual)
          : null,
        normalizedAccelerationResidual: accelerationResidual
          ? freezeVector(accelerationResidual)
          : null,
        accelerationCancelsExactly: Boolean(
          sameAccelerationDenominator &&
          accelerationNumeratorResidual.every((value) => value === 0),
        ),
      });
    });
    const expectedCount = shell.pairs.length * 2;
    const complete = resolvedCount === expectedCount;
    return Object.freeze({
      id: shell.id,
      label: shell.label,
      distance: shell.distance,
      expectedCount,
      visibleCount,
      resolvedCount,
      coverage:
        `${resolvedCount} of ${expectedCount} rows resolved; ${visibleCount} displayed`,
      pairs: Object.freeze(pairs),
      equalPolarityAntipodalPairs: pairs.filter(
        (pair) => pair.availability === "resolved-antipodal-pair" &&
          pair.equalPolarity,
      ).length,
      cancellingAccelerationPairs: pairs.filter(
        (pair) => pair.accelerationCancelsExactly,
      ).length,
      geometryResidual: complete ? freezeVector(shellResidual) : null,
      normalizedAccelerationResidual: complete
        ? freezeVector(shellAccelerationResidual)
        : null,
    });
  });
  const rows = shells.flatMap((shell) => shell.pairs.flatMap(
    (pair) => pair.positions.map((position) => Object.freeze({
      shellId: shell.id,
      shellLabel: shell.label,
      distance: shell.distance,
      pairLabel: pair.label,
      neighborId: position.neighborId,
      neighborGrid: position.neighborGrid,
      polarity: position.polarity,
      geometryDirection: position.unitDirection,
      accelerationRow: position.accelerationRow,
      availability: position.availability,
    })),
  ));
  const resolvedLocalCount = shells.reduce(
    (count, shell) => count + shell.resolvedCount,
    0,
  );
  const expectedLocalCount = shells.reduce(
    (count, shell) => count + shell.expectedCount,
    0,
  );
  const completeLocalLedger = resolvedLocalCount === expectedLocalCount;
  const equalPolarityAntipodalPairs = shells.reduce(
    (count, shell) => count + shell.equalPolarityAntipodalPairs,
    0,
  );
  const expectedAntipodalPairs = shells.reduce(
    (count, shell) => count + shell.pairs.length,
    0,
  );
  const cancellingAccelerationPairs = shells.reduce(
    (count, shell) => count + shell.cancellingAccelerationPairs,
    0,
  );

  return Object.freeze({
    receiverId: receiver.id,
    receiverPolarity: polarityBySiteId[receiver.id],
    shells: Object.freeze(shells),
    coverage:
      `${resolvedLocalCount} of ${expectedLocalCount} local-shell acceleration rows resolved`,
    rows: Object.freeze(rows),
    geometryResidual: completeLocalLedger
      ? freezeVector(combinedResidual)
      : null,
    normalizedAccelerationResidual: completeLocalLedger
      ? freezeVector(combinedAccelerationResidual)
      : null,
    equalPolarityAntipodalPairs,
    expectedAntipodalPairs,
    cancellingAccelerationPairs,
    displayedCancellationPattern:
      completeLocalLedger &&
      cancellingAccelerationPairs === expectedAntipodalPairs,
    referenceConfiguration,
    certificateApplies: referenceConfiguration,
    certifiedExactZero: referenceConfiguration &&
      caseRecord.accelerationCertificate?.result?.acceleration?.includes(
        "exactly zero",
      ),
    accelerationRowsAvailable: completeLocalLedger,
    accelerationNote: referenceConfiguration
      ? caseRecord.accelerationStatus
      : "the reference certificate does not apply to a modified polarity configuration",
  });
}

export function createClippedNeighborSegment(start, end, endpointRadius) {
  const startVector = start.map(Number);
  const endVector = end.map(Number);
  const radius = Number(endpointRadius);
  if (
    startVector.length !== 3 ||
    endVector.length !== 3 ||
    ![...startVector, ...endVector, radius].every(Number.isFinite) ||
    radius < 0
  ) {
    throw new TypeError("A clipped neighbor segment requires finite 3D endpoints and a nonnegative radius.");
  }
  const delta = endVector.map((value, index) => value - startVector[index]);
  const distance = Math.hypot(...delta);
  if (!(distance > 2 * radius)) {
    throw new RangeError("A clipped neighbor segment must be longer than both endpoint radii.");
  }
  const direction = delta.map((value) => value / distance);
  return Object.freeze({
    start: freezeVector(startVector.map(
      (value, index) => value + direction[index] * radius,
    )),
    end: freezeVector(endVector.map(
      (value, index) => value - direction[index] * radius,
    )),
  });
}
