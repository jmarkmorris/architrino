import {
  LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS,
  createLatticeLabCaseGallery,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  createNearestNeighborEdges,
  defaultViewHalfHeightForDisplayRadius,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";

const DETERMINISTIC_DISPLAY_RADIUS = 3;
const BASELINE_DISPLAY_RADIUS = 3.25;
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

export function verifyLatticeLabDisplayCrop() {
  const cases = createLatticeLabCaseGallery().map((caseRecord) => {
    const random = caseRecord.calculationScope === "finite-nonperiodic";
    const expectedRadius = random
      ? LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS
      : DETERMINISTIC_DISPLAY_RADIUS;
    if (caseRecord.displayRadius !== expectedRadius) {
      throw new Error(
        `${caseRecord.id} uses radius ${caseRecord.displayRadius}, expected ${expectedRadius}.`,
      );
    }
    const beforeSites = caseRecord.idealSites.filter((site) =>
      Math.hypot(...site.position) <= BASELINE_DISPLAY_RADIUS + EPSILON
    );
    const afterSites = caseRecord.sites;
    const afterIds = new Set(afterSites.map(({ id }) => id));
    const beforeEdges = edgeInventories(caseRecord, beforeSites);
    const afterEdges = edgeInventories(caseRecord, afterSites);
    const beforeEdgeIds = new Set(beforeEdges);
    const afterEdgeIds = new Set(afterEdges);
    const removedSites = beforeSites
      .filter(({ id }) => !afterIds.has(id))
      .map(siteInventory);
    const removedEdges = beforeEdges.filter((id) => !afterEdgeIds.has(id));
    const addedEdges = afterEdges.filter((id) => !beforeEdgeIds.has(id));
    if (addedEdges.length > 0) {
      throw new Error(`${caseRecord.id} added relationships while tightening the crop.`);
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
      BASELINE_DISPLAY_RADIUS / BASELINE_VIEW_HALF_HEIGHT;
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
      removedSites: Object.freeze(removedSites),
      beforeRelationships: Object.freeze(beforeEdges),
      afterRelationships: Object.freeze(afterEdges),
      removedRelationships: Object.freeze(removedEdges),
    });
  });
  const random = cases.find(({ calculationScope }) =>
    calculationScope === "finite-nonperiodic"
  );
  if (
    !random || random.radius !== BASELINE_DISPLAY_RADIUS ||
    random.removedSites.length !== 0 ||
    random.removedRelationships.length !== 0
  ) {
    throw new Error("Random 50/50 changed under the deterministic crop trial.");
  }
  return Object.freeze({
    ok: true,
    baselineRadius: BASELINE_DISPLAY_RADIUS,
    deterministicRadius: DETERMINISTIC_DISPLAY_RADIUS,
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
        removedSites: caseRecord.removedSites.length,
        beforeRelationships: caseRecord.beforeRelationships.length,
        afterRelationships: caseRecord.afterRelationships.length,
        removedRelationships: caseRecord.removedRelationships.length,
      })),
    }
    : result;
  console.log(JSON.stringify(summary, null, 2));
}
