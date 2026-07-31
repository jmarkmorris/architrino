import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicAccelerationRow,
  transformSimpleCubicOffset,
} from "./SimpleCubicStationaryLedger.js";

export const LATTICE_LAB_CASE_ID = "simple-cubic-checkerboard-v1";
export const LATTICE_LAB_DISPLAY_RADIUS = 3.25;
export const LATTICE_LAB_GRID_SPAN = 8;
export const LATTICE_LAB_DEFAULT_SITE_ID = "site-3-3-3";

export const LATTICE_LAB_CASE_IDS = Object.freeze([
  LATTICE_LAB_CASE_ID,
  "bcc-two-sublattice-v1",
  "fcc-alternating-planes-v1",
  "hcp-abab-layers-v1",
  "simple-cubic-alternating-planes-v1",
  "diamond-cubic-two-sublattice-v1",
]);

export const LATTICE_LAB_POLARITY = Object.freeze({
  ELECTRINO: "electrino",
  POSITRINO: "positrino",
});

const EPSILON = 1e-7;
const PERIODIC_CELL_RANGE = 8;

function freezeVector(vector) {
  return Object.freeze(vector.map(Number));
}

function freezeResidualVector(vector) {
  return freezeVector(vector.map((value) =>
    Math.abs(value) < EPSILON ? 0 : value
  ));
}

function addVectors(...vectors) {
  return vectors.reduce(
    (sum, vector) => sum.map((value, index) => value + vector[index]),
    [0, 0, 0],
  );
}

function scaleVector(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function fractionalToCartesian(fractional, vectors) {
  return addVectors(
    scaleVector(vectors[0], fractional[0]),
    scaleVector(vectors[1], fractional[1]),
    scaleVector(vectors[2], fractional[2]),
  );
}

function determinant3(left, middle, right) {
  return left[0] * (middle[1] * right[2] - middle[2] * right[1]) -
    middle[0] * (left[1] * right[2] - left[2] * right[1]) +
    right[0] * (left[1] * middle[2] - left[2] * middle[1]);
}

function cartesianToFractional(position, vectors) {
  const determinant = determinant3(...vectors);
  if (Math.abs(determinant) < EPSILON) {
    throw new Error("Repeat-cell translation vectors must span a volume.");
  }
  return [
    determinant3(position, vectors[1], vectors[2]) / determinant,
    determinant3(vectors[0], position, vectors[2]) / determinant,
    determinant3(vectors[0], vectors[1], position) / determinant,
  ];
}

function createShell(id, label, distance, distanceLabel, expectedCount) {
  return Object.freeze({
    id,
    label,
    distance,
    distanceLabel,
    expectedCount,
  });
}

function createRepeatCell(
  vectors,
  sites,
  label,
  {
    kind = "cell",
    minimal = true,
    originFractional = [0, 0, 0],
  } = {},
) {
  const frozenVectors = Object.freeze(vectors.map(freezeVector));
  const origin = fractionalToCartesian(originFractional, frozenVectors);
  const ownedSites = sites.map((site, index) => {
    const fractionalPosition = cartesianToFractional(
      site.position.map((value, coordinate) => value - origin[coordinate]),
      frozenVectors,
    ).map((value) => Math.abs(value) < EPSILON ? 0 : value);
    if (fractionalPosition.some((value) =>
      value < 0 || value >= 1 - EPSILON
    )) {
      throw new Error(
        `${label} site ${index} is outside the half-open ownership domain.`,
      );
    }
    return { ...site, fractionalPosition };
  });
  const center = addVectors(
    origin,
    scaleVector(addVectors(...vectors), 0.5),
  );
  return Object.freeze({
    label,
    kind,
    minimal,
    ownership: "half-open-fundamental-domain",
    originFractional: freezeVector(originFractional),
    vectors: frozenVectors,
    sites: Object.freeze(ownedSites.map((site, index) => Object.freeze({
      id: `repeat-${index}`,
      position: freezeVector(site.position.map(
        (value, coordinate) => value - center[coordinate],
      )),
      fractionalPosition: freezeVector(site.fractionalPosition),
      polarity: site.polarity,
    }))),
  });
}

function createPeriodicCase(specification) {
  const idealSites = [];
  const displaySites = [];
  for (let ix = -PERIODIC_CELL_RANGE; ix <= PERIODIC_CELL_RANGE; ix += 1) {
    for (let iy = -PERIODIC_CELL_RANGE; iy <= PERIODIC_CELL_RANGE; iy += 1) {
      for (let iz = -PERIODIC_CELL_RANGE; iz <= PERIODIC_CELL_RANGE; iz += 1) {
        const cellOffset = fractionalToCartesian(
          [ix, iy, iz],
          specification.vectors,
        );
        specification.basis.forEach((basisSite, basisIndex) => {
          const absolutePosition = addVectors(
            cellOffset,
            fractionalToCartesian(
              basisSite.fractional,
              specification.vectors,
            ),
          );
          const position = absolutePosition.map(
            (value, coordinate) => value - specification.cropCenter[coordinate],
          );
          const polarity = specification.polarityAt({
            ix,
            iy,
            iz,
            basisIndex,
            basisSite,
          });
          const site = Object.freeze({
            id: `${specification.id}|${ix}|${iy}|${iz}|${basisIndex}`,
            grid: Object.freeze([ix, iy, iz, basisIndex]),
            label: `${basisSite.label} · cell ${ix}, ${iy}, ${iz}`,
            basisLabel: basisSite.label,
            position: freezeVector(position),
            polarity,
          });
          idealSites.push(site);
          if (
            Math.hypot(...position) <=
              specification.displayRadius + EPSILON
          ) {
            displaySites.push(site);
          }
        });
      }
    }
  }

  const counts = countLatticePolarities(Object.fromEntries(
    displaySites.map((site) => [site.id, site.polarity]),
  ));
  if (counts.electrino !== counts.positrino) {
    throw new Error(
      `${specification.title} display crop is not exactly neutral: ` +
      `${counts.positrino} positrinos / ${counts.electrino} electrinos.`,
    );
  }

  const defaultSite = specification.defaultSiteSelector(displaySites);
  if (!defaultSite) {
    throw new Error(`${specification.title} has no default selected site.`);
  }

  return Object.freeze({
    schema: "lattice-lab-case/v2",
    ...specification.metadata,
    id: specification.id,
    title: specification.title,
    displayRadius: specification.displayRadius,
    nearestNeighborDistanceValue: 1,
    shells: specification.shells,
    sites: Object.freeze(displaySites),
    idealSites: Object.freeze(idealSites),
    defaultSiteId: defaultSite.id,
    repeatCell: specification.repeatCell,
  });
}

function nearestElectrinoToCenter(sites) {
  return sites
    .filter((site) => site.polarity === LATTICE_LAB_POLARITY.ELECTRINO)
    .sort((left, right) =>
      Math.hypot(...left.position) - Math.hypot(...right.position) ||
      left.id.localeCompare(right.id)
    )[0] ?? null;
}

function createSimpleCubicCase({
  id,
  title,
  polarityAtGrid,
  polarityRule,
  primerTitle,
  primerParagraphs,
  evidenceStatus,
  calculationBoundaryTreatment,
  accelerationStatus,
  accelerationCertificate = null,
  repeatSpecification,
}) {
  const sites = [];
  const idealSites = [];
  const halfSpan = (LATTICE_LAB_GRID_SPAN - 1) / 2;
  for (let ix = -2; ix <= LATTICE_LAB_GRID_SPAN + 1; ix += 1) {
    for (let iy = -2; iy <= LATTICE_LAB_GRID_SPAN + 1; iy += 1) {
      for (let iz = -2; iz <= LATTICE_LAB_GRID_SPAN + 1; iz += 1) {
        const position = [
          ix - halfSpan,
          iy - halfSpan,
          iz - halfSpan,
        ];
        const site = Object.freeze({
          id: `site-${ix}-${iy}-${iz}`,
          grid: Object.freeze([ix, iy, iz]),
          label: `site ${ix}, ${iy}, ${iz}`,
          basisLabel: "site",
          position: Object.freeze(position),
          polarity: polarityAtGrid([ix, iy, iz]),
        });
        idealSites.push(site);
        if (
          ix >= 0 && iy >= 0 && iz >= 0 &&
          ix < LATTICE_LAB_GRID_SPAN &&
          iy < LATTICE_LAB_GRID_SPAN &&
          iz < LATTICE_LAB_GRID_SPAN &&
          Math.hypot(...position) <= LATTICE_LAB_DISPLAY_RADIUS
        ) {
          sites.push(site);
        }
      }
    }
  }
  const defaultSite = sites.find(
    (site) => site.id === LATTICE_LAB_DEFAULT_SITE_ID,
  );
  return Object.freeze({
    schema: "lattice-lab-case/v2",
    id,
    title,
    geometry: "simple cubic",
    geometryLabel: "Simple cubic",
    polarityRule,
    nearestNeighborDistance: "d",
    nearestNeighborDistanceValue: 1,
    coordinationNumber: 6,
    nearestShell: Object.freeze({ count: 6, distance: "d" }),
    nextLocalShell: Object.freeze({ count: 12, distance: "√2d" }),
    selectedLocalTotal: 18,
    geometricSiteDensity: "n = 1/d³",
    boundaryTreatment:
      "finite spherical display crop containing every simple-cubic site center within radius 3.25d; continuation is not shown",
    calculationBoundaryTreatment,
    evidenceStatus,
    accelerationCertificate,
    accelerationStatus,
    displayRadius: LATTICE_LAB_DISPLAY_RADIUS,
    shells: Object.freeze([
      createShell("nearest", "Nearest shell", 1, "d", 6),
      createShell("next-local", "Next local shell", Math.SQRT2, "√2d", 12),
    ]),
    sites: Object.freeze(sites),
    idealSites: Object.freeze(idealSites),
    defaultSiteId: defaultSite.id,
    repeatCell: createRepeatCell(
      repeatSpecification.vectors,
      repeatSpecification.sites.map((site) => ({
        position: site.position,
        polarity: polarityAtGrid(site.grid),
      })),
      repeatSpecification.label,
      {
        kind: "cell",
        minimal: true,
        originFractional: repeatSpecification.originFractional,
      },
    ),
    primerTitle,
    primerParagraphs: Object.freeze(primerParagraphs),
    teachingNote: null,
  });
}

export function createSimpleCubicCheckerboardCase() {
  return createSimpleCubicCase({
    id: LATTICE_LAB_CASE_ID,
    title: "Simple-cubic checkerboard",
    polarityAtGrid: ([ix, iy, iz]) =>
      (ix + iy + iz) % 2 === 0
        ? LATTICE_LAB_POLARITY.POSITRINO
        : LATTICE_LAB_POLARITY.ELECTRINO,
    polarityRule: "alternating parity at every nearest-neighbor step",
    primerTitle: "Simple cubic · checkerboard",
    primerParagraphs: [
      "Equal rows of sites meet at right angles. Each interior site has six nearest neighbors: left, right, up, down, forward, and back.",
      "The checkerboard rule changes red to blue at every one-step move. Its minimal polarity-preserving translation cell has one red site, one blue site, and three skew repeat directions.",
      "The geometric density n = 1/d³ counts sites per volume for spacing d. It is not mass density and does not establish a physical medium.",
    ],
    evidenceStatus:
      "derived stationary-release cancellation under the declared exhaustion",
    calculationBoundaryTreatment:
      "ideal stationary infinite repeat with receiver-centered inversion-symmetric exhaustion",
    accelerationCertificate: SIMPLE_CUBIC_STATIONARY_CONTRACT,
    accelerationStatus:
      "derived exact zero at every site for the stationary reference repeat under receiver-centered inversion-symmetric exhaustion",
    repeatSpecification: {
      vectors: [[1, 1, 0], [1, 0, 1], [0, 1, 1]],
      sites: [
        { position: [0, 0, 0], grid: [0, 0, 0] },
        { position: [1, 0, 0], grid: [1, 0, 0] },
      ],
      label: "minimal 2-site checkerboard translation cell",
      originFractional: [-0.25, -0.25, -0.75],
    },
  });
}

export function createSimpleCubicAlternatingPlanesCase() {
  return createSimpleCubicCase({
    id: "simple-cubic-alternating-planes-v1",
    title: "Simple-cubic alternating planes",
    polarityAtGrid: ([, , iz]) =>
      Math.abs(iz % 2) === 0
        ? LATTICE_LAB_POLARITY.POSITRINO
        : LATTICE_LAB_POLARITY.ELECTRINO,
    polarityRule: "uniform square planes alternate red and blue along Z",
    primerTitle: "Simple cubic · alternating planes",
    primerParagraphs: [
      "The occupied sites are the same simple-cubic rows as the checkerboard case, with six nearest neighbors at d.",
      "Here each XY plane has one polarity and the next plane has the other. Four nearest neighbors stay in the same-color plane; two lie in opposite-color planes.",
      "This is a static geometry/reference case. Its visible symmetry is not an acceleration certificate or a stability result.",
    ],
    evidenceStatus: "static geometry/reference case; no acceleration certificate",
    calculationBoundaryTreatment:
      "no infinite acceleration exhaustion supplied; finite geometry display only",
    accelerationStatus:
      "acceleration rows are unavailable because this named polarity repeat has no independent acceleration certificate",
    repeatSpecification: {
      vectors: [[1, 0, 0], [0, 1, 0], [0, 0, 2]],
      sites: [
        { position: [0, 0, 0], grid: [0, 0, 0] },
        { position: [0, 0, 1], grid: [0, 0, 1] },
      ],
      label: "minimal 2-site alternating-plane translation cell",
    },
  });
}

function createBccCase() {
  const a = 2 / Math.sqrt(3);
  const vectors = [[a, 0, 0], [0, a, 0], [0, 0, a]];
  const basis = [
    { label: "corner sublattice A", fractional: [0, 0, 0] },
    { label: "body-center sublattice B", fractional: [0.5, 0.5, 0.5] },
  ];
  return createPeriodicCase({
    id: "bcc-two-sublattice-v1",
    title: "BCC two-sublattice",
    vectors,
    basis,
    cropCenter: [a / 4, a / 4, a / 4],
    displayRadius: LATTICE_LAB_DISPLAY_RADIUS,
    polarityAt: ({ basisIndex }) =>
      basisIndex === 0
        ? LATTICE_LAB_POLARITY.POSITRINO
        : LATTICE_LAB_POLARITY.ELECTRINO,
    defaultSiteSelector: nearestElectrinoToCenter,
    shells: Object.freeze([
      createShell("nearest", "Nearest shell", 1, "d", 8),
      createShell("next-local", "Next local shell", a, "2d/√3", 6),
    ]),
    repeatCell: createRepeatCell(
      vectors,
      basis.map((site, basisIndex) => ({
        position: fractionalToCartesian(site.fractional, vectors),
        polarity: basisIndex === 0
          ? LATTICE_LAB_POLARITY.POSITRINO
          : LATTICE_LAB_POLARITY.ELECTRINO,
      })),
      "minimal 2-site corner/body translation cell",
      { kind: "cell", minimal: true },
    ),
    metadata: {
      geometry: "body-centered cubic",
      geometryLabel: "Body-centered cubic (BCC)",
      polarityRule: "red corner sublattice and blue body-center sublattice",
      nearestNeighborDistance: "d",
      coordinationNumber: 8,
      nearestShell: Object.freeze({ count: 8, distance: "d" }),
      nextLocalShell: Object.freeze({ count: 6, distance: "2d/√3" }),
      selectedLocalTotal: 14,
      geometricSiteDensity: "n = 3√3/(4d³)",
      boundaryTreatment:
        "finite spherical display crop containing every BCC site center within radius 3.25d; continuation is not shown",
      calculationBoundaryTreatment:
        "no infinite acceleration exhaustion supplied; finite geometry display only",
      evidenceStatus: "static geometry/reference case; no acceleration certificate",
      accelerationCertificate: null,
      accelerationStatus:
        "acceleration rows are unavailable because this named case has no independent acceleration certificate",
      primerTitle: "BCC · two sublattices",
      primerParagraphs: Object.freeze([
        "A conventional cubic cell has corner sites plus one body-center site. Each site has eight nearest neighbors along body-diagonal directions.",
        "The red and blue populations occupy the two interpenetrating simple-cubic sublattices. CsCl is the familiar teaching analogy for this two-sublattice ordering; no material identity is implied.",
        "With nearest spacing d, the geometric site density is n = 3√3/(4d³). This is site counting, not mass density.",
      ]),
      teachingNote: "CsCl-type ordering is a geometry teaching analogy only.",
    },
  });
}

function createFccCase() {
  const a = Math.SQRT2;
  const vectors = [[a, 0, 0], [0, a, 0], [0, 0, a]];
  const polarityRepeatVectors = [
    [a / 2, a / 2, 0],
    [a / 2, -a / 2, 0],
    [0, 0, a],
  ];
  const basis = [
    { label: "face lattice 0", fractional: [0, 0, 0], planeParity: 0 },
    { label: "face lattice 1", fractional: [0, 0.5, 0.5], planeParity: 1 },
    { label: "face lattice 2", fractional: [0.5, 0, 0.5], planeParity: 1 },
    { label: "face lattice 3", fractional: [0.5, 0.5, 0], planeParity: 0 },
  ];
  const polarityForBasis = (basisIndex) =>
    basis[basisIndex].planeParity === 0
      ? LATTICE_LAB_POLARITY.POSITRINO
      : LATTICE_LAB_POLARITY.ELECTRINO;
  return createPeriodicCase({
    id: "fcc-alternating-planes-v1",
    title: "FCC alternating planes",
    vectors,
    basis,
    cropCenter: [a / 4, 0, a / 4],
    displayRadius: LATTICE_LAB_DISPLAY_RADIUS,
    polarityAt: ({ basisIndex }) => polarityForBasis(basisIndex),
    defaultSiteSelector: nearestElectrinoToCenter,
    shells: Object.freeze([
      createShell("nearest", "Nearest shell", 1, "d", 12),
      createShell("next-local", "Next local shell", a, "√2d", 6),
    ]),
    repeatCell: createRepeatCell(
      polarityRepeatVectors,
      [
        {
          position: [0, 0, 0],
          polarity: LATTICE_LAB_POLARITY.POSITRINO,
        },
        {
          position: [a / 2, 0, a / 2],
          polarity: LATTICE_LAB_POLARITY.ELECTRINO,
        },
      ],
      "minimal 2-site FCC alternating-plane translation cell",
      { kind: "cell", minimal: true },
    ),
    metadata: {
      geometry: "face-centered cubic",
      geometryLabel: "Face-centered cubic (FCC)",
      polarityRule: "alternating red and blue (001) close-packed site planes",
      nearestNeighborDistance: "d",
      coordinationNumber: 12,
      nearestShell: Object.freeze({ count: 12, distance: "d" }),
      nextLocalShell: Object.freeze({ count: 6, distance: "√2d" }),
      selectedLocalTotal: 18,
      geometricSiteDensity: "n = √2/d³",
      boundaryTreatment:
        "finite spherical display crop containing every FCC site center within radius 3.25d; continuation is not shown",
      calculationBoundaryTreatment:
        "no infinite acceleration exhaustion supplied; finite geometry display only",
      evidenceStatus: "static geometry/reference case; no acceleration certificate",
      accelerationCertificate: null,
      accelerationStatus:
        "acceleration rows are unavailable because this named case has no independent acceleration certificate",
      primerTitle: "FCC · alternating planes",
      primerParagraphs: Object.freeze([
        "FCC places sites at cube corners and face centers. Each site has twelve nearest neighbors, and its close-packed layers follow an ABCABC stacking sequence.",
        "This canned polarity variant alternates color between successive (001) site planes. Triangular nearest-neighbor loops prevent every nearest pair from being opposite polarity.",
        "With nearest spacing d, the geometric site density is n = √2/d³. The shell table is geometric; it does not prove acceleration cancellation.",
      ]),
      teachingNote: "ABCABC describes the close-packed geometry; the colors use (001) planes.",
    },
  });
}

function createHcpCase() {
  const c = Math.sqrt(8 / 3);
  const vectors = [
    [1, 0, 0],
    [0.5, Math.sqrt(3) / 2, 0],
    [0, 0, c],
  ];
  const basis = [
    { label: "A layer", fractional: [0, 0, 0] },
    { label: "B layer", fractional: [1 / 3, 1 / 3, 0.5] },
  ];
  const basisB = fractionalToCartesian(basis[1].fractional, vectors);
  return createPeriodicCase({
    id: "hcp-abab-layers-v1",
    title: "HCP ABAB layers",
    vectors,
    basis,
    cropCenter: scaleVector(basisB, 0.5),
    displayRadius: LATTICE_LAB_DISPLAY_RADIUS,
    polarityAt: ({ basisIndex }) =>
      basisIndex === 0
        ? LATTICE_LAB_POLARITY.POSITRINO
        : LATTICE_LAB_POLARITY.ELECTRINO,
    defaultSiteSelector: nearestElectrinoToCenter,
    shells: Object.freeze([
      createShell("nearest", "Nearest shell", 1, "d", 12),
      createShell("next-local", "Next local shell", Math.SQRT2, "√2d", 6),
    ]),
    repeatCell: createRepeatCell(
      vectors,
      basis.map((site, basisIndex) => ({
        position: fractionalToCartesian(site.fractional, vectors),
        polarity: basisIndex === 0
          ? LATTICE_LAB_POLARITY.POSITRINO
          : LATTICE_LAB_POLARITY.ELECTRINO,
      })),
      "minimal 2-site ideal-HCP translation cell",
      { kind: "cell", minimal: true },
    ),
    metadata: {
      geometry: "hexagonal close-packed",
      geometryLabel: "Hexagonal close-packed (HCP)",
      polarityRule: "red A layers and blue B layers in ABAB stacking",
      nearestNeighborDistance: "d",
      coordinationNumber: 12,
      nearestShell: Object.freeze({ count: 12, distance: "d" }),
      nextLocalShell: Object.freeze({ count: 6, distance: "√2d" }),
      selectedLocalTotal: 18,
      geometricSiteDensity: "n = √2/d³",
      boundaryTreatment:
        "finite spherical display crop containing every ideal-HCP site center within radius 3.25d; continuation is not shown",
      calculationBoundaryTreatment:
        "no infinite acceleration exhaustion supplied; finite geometry display only",
      evidenceStatus: "static geometry/reference case; no acceleration certificate",
      accelerationCertificate: null,
      accelerationStatus:
        "acceleration rows are unavailable because this named case has no independent acceleration certificate",
      primerTitle: "HCP · ABAB stacking",
      primerParagraphs: Object.freeze([
        "Ideal HCP stacks triangular layers in an ABAB sequence. A site has six nearest neighbors in its own layer, three above, and three below.",
        "This two-site primitive repeat colors A layers red and B layers blue. The miniature extends nearest-neighbor relationships across the periodic repeat without drawing a physical cell boundary.",
        "At the ideal height ratio, n = √2/d³. The displayed local shells do not establish all-shell cancellation, stability, or later evolution.",
      ]),
      teachingNote: "ABAB is the ideal close-packed stacking shown here.",
    },
  });
}

function createDiamondCase() {
  const a = 4 / Math.sqrt(3);
  const vectors = [[a, 0, 0], [0, a, 0], [0, 0, a]];
  const primitiveVectors = [
    [0, a / 2, a / 2],
    [a / 2, 0, a / 2],
    [a / 2, a / 2, 0],
  ];
  const fccBasis = [
    [0, 0, 0],
    [0, 0.5, 0.5],
    [0.5, 0, 0.5],
    [0.5, 0.5, 0],
  ];
  const basis = [
    ...fccBasis.map((fractional, index) => ({
      label: `FCC sublattice A${index + 1}`,
      fractional,
      sublattice: "A",
    })),
    ...fccBasis.map((fractional, index) => ({
      label: `FCC sublattice B${index + 1}`,
      fractional: fractional.map((value) => value + 0.25),
      sublattice: "B",
    })),
  ];
  const polarityForBasis = (basisIndex) =>
    basis[basisIndex].sublattice === "A"
      ? LATTICE_LAB_POLARITY.POSITRINO
      : LATTICE_LAB_POLARITY.ELECTRINO;
  return createPeriodicCase({
    id: "diamond-cubic-two-sublattice-v1",
    title: "Diamond-cubic two-sublattice",
    vectors,
    basis,
    cropCenter: [a / 8, a / 8, a / 8],
    displayRadius: LATTICE_LAB_DISPLAY_RADIUS,
    polarityAt: ({ basisIndex }) => polarityForBasis(basisIndex),
    defaultSiteSelector: nearestElectrinoToCenter,
    shells: Object.freeze([
      createShell("nearest", "Nearest shell", 1, "d", 4),
      createShell(
        "next-local",
        "Next local shell",
        4 / Math.sqrt(6),
        "4d/√6",
        12,
      ),
    ]),
    repeatCell: createRepeatCell(
      primitiveVectors,
      [
        {
          position: [0, 0, 0],
          polarity: LATTICE_LAB_POLARITY.POSITRINO,
        },
        {
          position: [a / 4, a / 4, a / 4],
          polarity: LATTICE_LAB_POLARITY.ELECTRINO,
        },
      ],
      "minimal 2-site diamond translation cell",
      { kind: "cell", minimal: true },
    ),
    metadata: {
      geometry: "diamond cubic",
      geometryLabel: "Diamond cubic",
      polarityRule: "red and blue interpenetrating FCC sublattices",
      nearestNeighborDistance: "d",
      coordinationNumber: 4,
      nearestShell: Object.freeze({ count: 4, distance: "d" }),
      nextLocalShell: Object.freeze({ count: 12, distance: "4d/√6" }),
      selectedLocalTotal: 16,
      geometricSiteDensity: "n = 3√3/(8d³)",
      boundaryTreatment:
        "finite spherical display crop containing every diamond-cubic site center within radius 3.25d; continuation is not shown",
      calculationBoundaryTreatment:
        "no infinite acceleration exhaustion supplied; finite geometry display only",
      evidenceStatus: "static geometry/reference case; no acceleration certificate",
      accelerationCertificate: null,
      accelerationStatus:
        "acceleration rows are unavailable because this named case has no independent acceleration certificate",
      primerTitle: "Diamond cubic · two sublattices",
      primerParagraphs: Object.freeze([
        "Diamond cubic combines two interpenetrating FCC sublattices offset along a body diagonal. Each site has four nearest neighbors in a tetrahedral arrangement.",
        "The two sublattices carry the red/blue polarity labels. Zincblende is the familiar two-sublattice teaching analogy; no material identity is implied.",
        "With nearest spacing d, n = 3√3/(8d³). This static geometry case has no acceleration or stability certificate.",
      ]),
      teachingNote: "Zincblende-type ordering is a geometry teaching analogy only.",
    },
  });
}

export function createLatticeLabCaseGallery() {
  const cases = [
    createSimpleCubicCheckerboardCase(),
    createBccCase(),
    createFccCase(),
    createHcpCase(),
    createSimpleCubicAlternatingPlanesCase(),
    createDiamondCase(),
  ];
  return Object.freeze(cases);
}

export function getLatticeLabCase(caseId) {
  return createLatticeLabCaseGallery().find((caseRecord) =>
    caseRecord.id === caseId
  ) ?? null;
}

export function createSimpleCubicPolarityRepeatCellSites() {
  return createSimpleCubicCheckerboardCase().repeatCell.sites;
}

export function createRepeatCellNearestNeighborNetwork(caseRecord) {
  const { repeatCell } = caseRecord;
  const relationships = [];
  repeatCell.sites.forEach((fromSite) => {
    repeatCell.sites.forEach((toSite) => {
      for (let ix = -1; ix <= 1; ix += 1) {
        for (let iy = -1; iy <= 1; iy += 1) {
          for (let iz = -1; iz <= 1; iz += 1) {
            if (
              fromSite.id === toSite.id &&
              ix === 0 && iy === 0 && iz === 0
            ) {
              continue;
            }
            const translation = fractionalToCartesian(
              [ix, iy, iz],
              repeatCell.vectors,
            );
            const toPosition = addVectors(toSite.position, translation);
            const distance = Math.hypot(...toPosition.map(
              (value, index) => value - fromSite.position[index],
            ));
            if (
              Math.abs(distance - caseRecord.nearestNeighborDistanceValue) >
                EPSILON
            ) {
              continue;
            }
            relationships.push(Object.freeze({
              fromSiteId: fromSite.id,
              fromPosition: fromSite.position,
              toSiteId: toSite.id,
              toPosition: freezeVector(toPosition),
              toPolarity: toSite.polarity,
              translation: Object.freeze([ix, iy, iz]),
              periodicContinuation: ix !== 0 || iy !== 0 || iz !== 0,
            }));
          }
        }
      }
    });
  });

  const expectedRelationshipCount =
    repeatCell.sites.length * caseRecord.coordinationNumber;
  if (relationships.length !== expectedRelationshipCount) {
    throw new Error(
      `${caseRecord.title} repeat network resolved ${relationships.length} ` +
      `nearest-neighbor relationships; expected ${expectedRelationshipCount}.`,
    );
  }

  const continuationKeys = new Set();
  const centralPositionKeys = new Set(repeatCell.sites.map((site) =>
    site.position.map((value) => Number(value.toFixed(9))).join(",")
  ));
  const continuationSites = relationships
    .flatMap((relationship) => [{
      id: relationship.toSiteId,
      position: relationship.toPosition,
      polarity: relationship.toPolarity,
    }])
    .flatMap((site) => {
    const key = site.position
      .map((value) => Number(value.toFixed(9))).join(",");
    if (centralPositionKeys.has(key) || continuationKeys.has(key)) {
      return [];
    }
    continuationKeys.add(key);
    return [Object.freeze({
      id: `${site.id}@${key}`,
      position: site.position,
      polarity: site.polarity,
    })];
  });

  const displaySites = Object.freeze([
    ...repeatCell.sites.map((site) => Object.freeze({
      id: site.id,
      position: site.position,
      polarity: site.polarity,
      continuation: false,
    })),
    ...continuationSites.map((site) => Object.freeze({
      ...site,
      continuation: true,
    })),
  ]);
  const edges = [];
  displaySites.forEach((fromSite, fromIndex) => {
    displaySites.slice(fromIndex + 1).forEach((toSite) => {
      const distance = Math.hypot(...toSite.position.map(
        (value, index) => value - fromSite.position[index],
      ));
      if (
        Math.abs(distance - caseRecord.nearestNeighborDistanceValue) >
          EPSILON
      ) {
        return;
      }
      edges.push(Object.freeze({
        fromSiteId: fromSite.id,
        toSiteId: toSite.id,
        start: fromSite.position,
        end: toSite.position,
        startContinuation: fromSite.continuation,
        endContinuation: toSite.continuation,
        periodicContinuation:
          fromSite.continuation || toSite.continuation,
      }));
    });
  });

  return Object.freeze({
    relationshipCount: relationships.length,
    expectedRelationshipCount,
    relationships: Object.freeze(relationships),
    edges: Object.freeze(edges),
    displaySites,
    continuationSites: Object.freeze(continuationSites),
  });
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

function findShellRows(
  caseRecord,
  polarityBySiteId,
  receiver,
  shell,
  compression,
) {
  const referenceConfiguration = isReferenceLatticeConfiguration(
    caseRecord,
    polarityBySiteId,
  );
  return caseRecord.idealSites
    .filter((site) => site.id !== receiver.id)
    .map((site) => {
      const offset = site.position.map(
        (value, index) => value - receiver.position[index],
      );
      return { site, offset, distance: Math.hypot(...offset) };
    })
    .filter(({ distance }) => Math.abs(distance - shell.distance) < EPSILON)
    .sort((left, right) =>
      left.offset[2] - right.offset[2] ||
      left.offset[1] - right.offset[1] ||
      left.offset[0] - right.offset[0]
    )
    .map(({ site, offset, distance }) => {
      const displayedSite = getLatticeSite(caseRecord, site.id);
      const polarity = displayedSite
        ? polarityBySiteId[site.id]
        : referenceConfiguration
          ? site.polarity
          : null;
      const displayOffset = caseRecord.id === LATTICE_LAB_CASE_ID
        ? transformSimpleCubicOffset(
          offset,
          compression.axis,
          compression.factor,
        )
        : offset;
      const displayDistance = Math.hypot(...displayOffset);
      const unitDirection = displayOffset.map(
        (value) => value / displayDistance,
      );
      const accelerationRow =
        caseRecord.id === LATTICE_LAB_CASE_ID && polarity
          ? createStationarySimpleCubicAccelerationRow({
            receiverGrid: receiver.grid,
            transmitterGrid: site.grid,
            receiverPolarity: polarityBySiteId[receiver.id],
            transmitterPolarity: polarity,
            compressionAxis: compression.axis,
            compressionFactor: compression.factor,
          })
          : null;
      return Object.freeze({
        neighborId: displayedSite?.id ?? null,
        neighborGrid: site.grid,
        neighborLabel: site.label,
        polarity,
        latticeOffset: freezeVector(offset),
        offset: freezeVector(displayOffset),
        separationInD: displayDistance,
        unitDirection: polarity ? freezeVector(unitDirection) : null,
        accelerationRow,
        availability: displayedSite
          ? "displayed-neighbor"
          : polarity
            ? "ideal-continuation-not-displayed"
            : "continuation-not-shown",
      });
    });
}

function pairAntipodalRows(rows, distanceLabel) {
  const remaining = [...rows];
  const pairs = [];
  while (remaining.length > 0) {
    const first = remaining.shift();
    const oppositeIndex = remaining.findIndex((candidate) =>
      candidate.offset.every(
        (value, index) => Math.abs(value + first.offset[index]) < EPSILON,
      )
    );
    if (oppositeIndex < 0) {
      pairs.push(Object.freeze({
        label: `direction ${formatDirection(first.offset)}`,
        distance: distanceLabel,
        positions: Object.freeze([first]),
        availability: "unpaired-geometry-row",
        equalPolarity: false,
        geometryResidual: first.unitDirection,
        accelerationNumeratorResidual: null,
        normalizedAccelerationResidual: null,
        accelerationCancelsExactly: false,
      }));
      continue;
    }
    const second = remaining.splice(oppositeIndex, 1)[0];
    const pairComplete = Boolean(
      first.accelerationRow && second.accelerationRow,
    );
    const geometryResidual =
      first.unitDirection && second.unitDirection
        ? first.unitDirection.map(
          (value, index) => value + second.unitDirection[index],
        )
        : null;
    const accelerationNumeratorResidual = pairComplete
      ? first.accelerationRow.accelerationNumerator.map(
        (value, index) =>
          value + second.accelerationRow.accelerationNumerator[index],
      )
      : null;
    const normalizedAccelerationResidual = pairComplete
      ? first.accelerationRow.normalizedAcceleration.map(
        (value, index) =>
          value + second.accelerationRow.normalizedAcceleration[index],
      )
      : null;
    pairs.push(Object.freeze({
      label:
        `${formatDirection(first.offset)} ↔ ${formatDirection(second.offset)}`,
      distance: distanceLabel,
      positions: Object.freeze([first, second]),
      availability: pairComplete
        ? "resolved-antipodal-pair"
        : "continuation-not-shown",
      equalPolarity: pairComplete && first.polarity === second.polarity,
      geometryResidual: geometryResidual
        ? freezeVector(geometryResidual)
        : null,
      accelerationNumeratorResidual: accelerationNumeratorResidual
        ? freezeVector(accelerationNumeratorResidual)
        : null,
      normalizedAccelerationResidual: normalizedAccelerationResidual
        ? freezeVector(normalizedAccelerationResidual)
        : null,
      accelerationCancelsExactly: Boolean(
        pairComplete &&
        first.accelerationRow.separationSquared ===
          second.accelerationRow.separationSquared &&
        accelerationNumeratorResidual.every((value) => value === 0),
      ),
    }));
  }
  return Object.freeze(pairs);
}

function formatDirection(vector) {
  return `⟨${vector.map((value) =>
    Math.abs(value) < EPSILON ? "0" : value.toFixed(3).replace(/\.?0+$/u, "")
  ).join(", ")}⟩`;
}

export function createSelectedSiteLedger(
  caseRecord,
  polarityBySiteId,
  selectedSiteId,
  options = {},
) {
  const receiver = getLatticeSite(caseRecord, selectedSiteId);
  if (!receiver) {
    throw new RangeError(`Unknown selected lattice site: ${String(selectedSiteId)}.`);
  }
  const referenceConfiguration = isReferenceLatticeConfiguration(
    caseRecord,
    polarityBySiteId,
  );
  const compression = Object.freeze({
    axis: options.compressionAxis ?? "x",
    factor: options.compressionFactor ?? 1,
  });
  const shells = caseRecord.shells.map((shellDefinition) => {
    const rows = findShellRows(
      caseRecord,
      polarityBySiteId,
      receiver,
      shellDefinition,
      compression,
    );
    const resolvedRows = rows.filter((row) => row.polarity);
    const visibleCount = rows.filter((row) => row.neighborId).length;
    const complete = resolvedRows.length === shellDefinition.expectedCount;
    const geometryResidual = complete
      ? resolvedRows.reduce(
        (sum, row) => sum.map(
          (value, index) => value + row.unitDirection[index],
        ),
        [0, 0, 0],
      )
      : null;
    const normalizedAccelerationResidual =
      complete && rows.every((row) => row.accelerationRow)
        ? rows.reduce(
          (sum, row) => sum.map(
            (value, index) =>
              value + row.accelerationRow.normalizedAcceleration[index],
          ),
          [0, 0, 0],
        )
        : null;
    const pairs = pairAntipodalRows(rows, shellDefinition.distanceLabel);
    const displayedDistances = [...new Set(rows.map((row) =>
      Number(row.separationInD.toFixed(9))
    ))].sort((left, right) => left - right);
    const distance = displayedDistances.length === 1 &&
      Math.abs(displayedDistances[0] - shellDefinition.distance) < EPSILON
      ? shellDefinition.distanceLabel
      : displayedDistances.map((value) =>
        `${Number(value.toFixed(3))}d`
      ).join(" / ");
    return Object.freeze({
      id: shellDefinition.id,
      label: shellDefinition.label,
      distance,
      expectedCount: shellDefinition.expectedCount,
      visibleCount,
      resolvedCount: resolvedRows.length,
      coverage:
        `${resolvedRows.length} of ${shellDefinition.expectedCount} positions resolved; ${visibleCount} displayed`,
      rows: Object.freeze(rows),
      pairs,
      equalPolarityAntipodalPairs: pairs.filter(
        (pair) => pair.availability === "resolved-antipodal-pair" &&
          pair.equalPolarity,
      ).length,
      cancellingAccelerationPairs: pairs.filter(
        (pair) => pair.accelerationCancelsExactly,
      ).length,
      geometryResidual: geometryResidual
        ? freezeResidualVector(geometryResidual)
        : null,
      normalizedAccelerationResidual: normalizedAccelerationResidual
        ? freezeResidualVector(normalizedAccelerationResidual)
        : null,
    });
  });
  const rows = shells.flatMap((shell) => shell.rows.map((row) => Object.freeze({
    shellId: shell.id,
    shellLabel: shell.label,
    distance: shell.distance,
    neighborId: row.neighborId,
    neighborGrid: row.neighborGrid,
    neighborLabel: row.neighborLabel,
    polarity: row.polarity,
    geometryDirection: row.unitDirection,
    accelerationRow: row.accelerationRow,
    availability: row.availability,
  })));
  const resolvedLocalCount = shells.reduce(
    (count, shell) => count + shell.resolvedCount,
    0,
  );
  const expectedLocalCount = shells.reduce(
    (count, shell) => count + shell.expectedCount,
    0,
  );
  const completeLocalLedger = resolvedLocalCount === expectedLocalCount;
  const geometryResidual = completeLocalLedger
    ? shells.reduce(
      (sum, shell) => sum.map(
        (value, index) => value + shell.geometryResidual[index],
      ),
      [0, 0, 0],
    )
    : null;
  const normalizedAccelerationResidual =
    completeLocalLedger &&
    shells.every((shell) => shell.normalizedAccelerationResidual)
      ? shells.reduce(
        (sum, shell) => sum.map(
          (value, index) =>
            value + shell.normalizedAccelerationResidual[index],
        ),
        [0, 0, 0],
      )
      : null;
  const expectedAntipodalPairs = shells.reduce(
    (count, shell) => count + shell.pairs.length,
    0,
  );
  const equalPolarityAntipodalPairs = shells.reduce(
    (count, shell) => count + shell.equalPolarityAntipodalPairs,
    0,
  );
  const cancellingAccelerationPairs = shells.reduce(
    (count, shell) => count + shell.cancellingAccelerationPairs,
    0,
  );
  const accelerationRowsAvailable = Boolean(
    normalizedAccelerationResidual,
  );
  const certificateApplies = Boolean(
    referenceConfiguration && caseRecord.accelerationCertificate,
  );

  return Object.freeze({
    receiverId: receiver.id,
    receiverPolarity: polarityBySiteId[receiver.id],
    shells: Object.freeze(shells),
    coverage:
      `${resolvedLocalCount} of ${expectedLocalCount} declared local-shell positions resolved`,
    rows: Object.freeze(rows),
    geometryResidual: geometryResidual
      ? freezeResidualVector(geometryResidual)
      : null,
    normalizedAccelerationResidual: normalizedAccelerationResidual
      ? freezeResidualVector(normalizedAccelerationResidual)
      : null,
    equalPolarityAntipodalPairs,
    expectedAntipodalPairs,
    cancellingAccelerationPairs,
    displayedCancellationPattern:
      accelerationRowsAvailable &&
      cancellingAccelerationPairs === expectedAntipodalPairs,
    referenceConfiguration,
    certificateApplies,
    certifiedExactZero: certificateApplies &&
      caseRecord.accelerationCertificate?.result?.acceleration?.includes(
        "exactly zero",
      ),
    accelerationRowsAvailable,
    accelerationNote: certificateApplies
      ? caseRecord.accelerationStatus
      : caseRecord.accelerationCertificate
        ? "the reference certificate does not apply to a modified polarity configuration"
        : caseRecord.accelerationStatus,
    compression,
  });
}

export function createClippedNeighborSegment(
  start,
  end,
  startEndpointRadius,
  endEndpointRadius = startEndpointRadius,
) {
  const startVector = start.map(Number);
  const endVector = end.map(Number);
  const startRadius = Number(startEndpointRadius);
  const endRadius = Number(endEndpointRadius);
  if (
    startVector.length !== 3 ||
    endVector.length !== 3 ||
    ![...startVector, ...endVector, startRadius, endRadius].every(Number.isFinite) ||
    startRadius < 0 ||
    endRadius < 0
  ) {
    throw new TypeError("A clipped neighbor segment requires finite 3D endpoints and nonnegative radii.");
  }
  const delta = endVector.map((value, index) => value - startVector[index]);
  const distance = Math.hypot(...delta);
  if (!(distance > startRadius + endRadius)) {
    throw new RangeError("A clipped neighbor segment must be longer than the combined endpoint radii.");
  }
  const direction = delta.map((value) => value / distance);
  return Object.freeze({
    start: freezeVector(startVector.map(
      (value, index) => value + direction[index] * startRadius,
    )),
    end: freezeVector(endVector.map(
      (value, index) => value - direction[index] * endRadius,
    )),
  });
}
