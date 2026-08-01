import {
  LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS,
  createLatticeLabCaseGallery,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  createLatticeLabRandomFiniteAssignment,
} from "../src/apps/lattice-lab/LatticeLabRandomFinite.js";
import {
  createNearestNeighborEdges,
  defaultViewHalfHeightForDisplayRadius,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";

const DISPLAY_RADIUS = 2.75;
const PREVIOUS_DISPLAY_RADIUS = 2.5;
const FRAMING_REFERENCE_RADIUS = 3.25;
const BASELINE_VIEW_HALF_HEIGHT = 4.4;
const EPSILON = 1e-9;

function siteInventory(site) {
  return Object.freeze({
    id: site.id,
    polarity: site.polarity,
    distance: Number(Math.hypot(...site.position).toFixed(12)),
  });
}

function edgeIdentity(edge) {
  return [edge.fromSiteId, edge.toSiteId].sort().join(" ↔ ");
}

function edgeInventories(caseRecord, sites) {
  return createNearestNeighborEdges({ ...caseRecord, sites })
    .map(edgeIdentity)
    .sort();
}

function createPreviousRandomSites(caseRecord) {
  const sites = [];
  for (let ix = 0; ix < 8; ix += 1) {
    for (let iy = 0; iy < 8; iy += 1) {
      for (let iz = 0; iz < 8; iz += 1) {
        const position = [ix - 3.5, iy - 3.5, iz - 3.5];
        if (Math.hypot(...position) <= PREVIOUS_DISPLAY_RADIUS + EPSILON) {
          sites.push({
            id: `site-${ix}-${iy}-${iz}`,
            grid: [ix, iy, iz],
            position,
          });
        }
      }
    }
  }
  const assignment = createLatticeLabRandomFiniteAssignment(
    sites,
    caseRecord.randomization.seed,
  );
  return sites.map((site) => ({
    ...site,
    polarity: assignment.polarityBySiteId[site.id],
  }));
}

export function verifyLatticeLabDisplayCrop() {
  const cases = createLatticeLabCaseGallery().map((caseRecord) => {
    const random = caseRecord.calculationScope === "finite-nonperiodic";
    const expectedRadius = DISPLAY_RADIUS;
    if (caseRecord.displayRadius !== expectedRadius) {
      throw new Error(
        `${caseRecord.id} uses radius ${caseRecord.displayRadius}, expected ${expectedRadius}.`,
      );
    }
    const beforeSites = random
      ? createPreviousRandomSites(caseRecord)
      : caseRecord.idealSites.filter((site) =>
        Math.hypot(...site.position) <= PREVIOUS_DISPLAY_RADIUS + EPSILON
      );
    const afterSites = caseRecord.sites;
    const beforeEdges = edgeInventories(caseRecord, beforeSites);
    const afterEdges = edgeInventories(caseRecord, afterSites);
    const beforeEdgeIds = new Set(beforeEdges);
    const afterEdgeIds = new Set(afterEdges);
    const beforeIds = new Set(beforeSites.map(({ id }) => id));
    const addedSites = afterSites
      .filter(({ id }) => !beforeIds.has(id))
      .map(siteInventory);
    const addedEdges = afterEdges.filter((id) => !beforeEdgeIds.has(id));
    const removedEdges = beforeEdges.filter((id) => !afterEdgeIds.has(id));
    if (removedEdges.length > 0) {
      throw new Error(`${caseRecord.id} removed relationships while expanding the crop.`);
    }
    if (afterSites.some((site) =>
      Math.hypot(...site.position) > expectedRadius + EPSILON
    )) {
      throw new Error(`${caseRecord.id} includes a site outside its declared crop.`);
    }
    const viewHalfHeight = defaultViewHalfHeightForDisplayRadius(
      caseRecord.displayRadius,
    );
    const baselineDiameterRatio =
      FRAMING_REFERENCE_RADIUS / BASELINE_VIEW_HALF_HEIGHT;
    const currentDiameterRatio = caseRecord.displayRadius / viewHalfHeight;
    if (Math.abs(currentDiameterRatio - baselineDiameterRatio) > 1e-12) {
      throw new Error(`${caseRecord.id} changed apparent envelope diameter.`);
    }
    return Object.freeze({
      id: caseRecord.id,
      title: caseRecord.title,
      calculationScope: caseRecord.calculationScope,
      radius: caseRecord.displayRadius,
      viewHalfHeight,
      apparentDiameterRatio: currentDiameterRatio,
      beforeIncludedSites: Object.freeze(beforeSites.map(siteInventory)),
      afterIncludedSites: Object.freeze(afterSites.map(siteInventory)),
      addedSites: Object.freeze(addedSites),
      beforeRelationships: Object.freeze(beforeEdges),
      afterRelationships: Object.freeze(afterEdges),
      addedRelationships: Object.freeze(addedEdges),
    });
  });
  const random = cases.find(({ calculationScope }) =>
    calculationScope === "finite-nonperiodic"
  );
  if (
    !random || random.radius !== DISPLAY_RADIUS ||
    random.beforeIncludedSites.length !== 56 ||
    random.afterIncludedSites.length !== 88
  ) {
    throw new Error("Random 50/50 does not use the shared 2.75d crop contract.");
  }
  return Object.freeze({
    ok: true,
    previousRadius: PREVIOUS_DISPLAY_RADIUS,
    displayRadius: DISPLAY_RADIUS,
    randomRadius: LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS,
    cases: Object.freeze(cases),
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = verifyLatticeLabDisplayCrop();
  const summary = process.argv.includes("--summary")
    ? {
      ...result,
      cases: result.cases.map((caseRecord) => ({
        id: caseRecord.id,
        radius: caseRecord.radius,
        viewHalfHeight: caseRecord.viewHalfHeight,
        beforeSites: caseRecord.beforeIncludedSites.length,
        afterSites: caseRecord.afterIncludedSites.length,
        addedSites: caseRecord.addedSites.length,
        beforeRelationships: caseRecord.beforeRelationships.length,
        afterRelationships: caseRecord.afterRelationships.length,
        addedRelationships: caseRecord.addedRelationships.length,
      })),
    }
    : result;
  console.log(JSON.stringify(summary, null, 2));
}
