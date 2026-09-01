import { createEomHistoryDataset } from "../../shared/EomHistoryDataset.mjs";
import { describeBraidComposition, recordClassification } from "./BorgLibraryComposition.mjs";
import { describeAssemblyRadii } from "./BorgLibraryRadii.mjs";
import { describeLibraryVariantSet } from "./BorgLibraryVariants.mjs";
import { describeBorgScientificStatus } from "../BorgScientificStatus.mjs";
import { describeBorgOrbitTrails } from "../BorgOrbitTrails.mjs";
import { describeBorgCircleOccupancy } from "../BorgOrbitGeometry.mjs";

export const LIBRARY_DESCRIPTOR_VERSION = "borg-record-facets.v12";
const norm = (v) => Math.hypot(...v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const subtract = (a, b) => a.map((v, i) => v - b[i]);
const fixedCircular = (op) => op.kind === "moving-circular.v1" && Array.isArray(op.centerVelocity) && op.centerVelocity.length === 3 && op.centerVelocity.every((v) => v === 0);

// A cubic lies in the convex hull of its four Bernstein control points.
// This bounds the complete retained polynomial, not just sampled frames.
export function recordControlPoints(dataset) {
  return dataset.worldlines.flatMap((line) => line.segments.flatMap((segment) => {
    const h = segment.endTime - segment.startTime;
    return [0, 1, 2, 3].map((i) => segment.coefficients.map(([a, b, c, d]) =>
      i === 0 ? a : i === 1 ? a + b * h / 3 :
        i === 2 ? a + 2 * b * h / 3 + c * h * h / 3 : a + b * h + c * h * h + d * h ** 3));
  }));
}

export function describeBounds(points) {
  if (!points.length || points.some((p) => p.length !== 3 || !p.every(Number.isFinite))) {
    throw new TypeError("Preview requires complete finite three-dimensional geometry.");
  }
  const low = points.reduce((a, p) => a.map((v, i) => Math.min(v, p[i])), [Infinity, Infinity, Infinity]);
  const high = points.reduce((a, p) => a.map((v, i) => Math.max(v, p[i])), [-Infinity, -Infinity, -Infinity]);
  const center = low.map((v, i) => (v + high[i]) / 2);
  const radius = points.reduce((r, p) => Math.max(r, norm(subtract(p, center))), 0);
  // Rank of all retained-path control points at a declared relative tolerance.
  const basis = [];
  const tolerance = Math.max(radius * 1e-9, Number.EPSILON);
  for (const point of points) {
    let v = subtract(point, points[0]);
    for (const u of basis) { const projection = dot(v, u); v = v.map((x, i) => x - projection * u[i]); }
    const length = norm(v);
    if (length > tolerance) basis.push(v.map((x) => x / length));
    if (basis.length === 3) break;
  }
  return { center, radius, dimension: basis.length === 3 ? "3d" : basis.length === 2 ? "2d" : "boundary", tolerance };
}

function describeBraidDimensionality(composition, coordinates, dataset) {
  if (!composition.braids.length) {
    return { value: "unavailable", reason: "Requires complete, disjoint source-declared component-braid membership." };
  }
  const sourceLines = coordinates?.worldlines ?? [];
  const recordedById = new Map(dataset.worldlines.map((line) => [line.id, line]));
  const dimensions = [];
  for (const braid of composition.braids) {
    const recorded = braid.members.map((constituentId) => {
      const source = sourceLines.find((line) => line.constituentId === constituentId);
      return source ? recordedById.get(source.id) : null;
    });
    if (recorded.some((line) => !line)) {
      return { value: "unavailable", reason: "A declared component braid lacks a complete recorded path for one or more members." };
    }
    const dimension = describeBounds(recorded.flatMap((line) => recordControlPoints({ worldlines: [line] }))).dimension;
    if (dimension !== "2d" && dimension !== "3d") {
      return { value: "unavailable", reason: "A declared component braid is degenerate or lacks a complete planar/spatial rank assignment." };
    }
    dimensions.push(dimension);
  }
  const unique = new Set(dimensions);
  const value = unique.size === 1 ? dimensions[0] : "mixed";
  return {
    value,
    reason: `${composition.braids.length} complete source-declared component braid${composition.braids.length === 1 ? "" : "s"} have affine dimensions ${dimensions.join(", ")} over their complete retained paths. Whole-assembly span is reported separately.`,
  };
}

function breathingState(operators) {
  if (!operators.length) return "unavailable";
  const states = operators.map((op) => {
    if (fixedCircular(op)) return "no";
    if (op.kind === "f6c-harmonic-member.v1") {
      const harmonics = [op.radial, op.axial];
      if (harmonics.some((v) => !Number.isFinite(v?.amplitude) || !Number.isFinite(v?.angularFrequency))) return "unavailable";
      return harmonics.some((v) => v.amplitude !== 0 && v.angularFrequency !== 0) ? "yes" : "no";
    }
    return "unavailable";
  });
  return states.includes("yes") ? "yes" : states.every((s) => s === "no") ? "no" : "unavailable";
}

export function describeLibraryRecord(record, catalogEntry, recordSha256, classifications = null, scientificProjection = null, scientificIntegrity = {}) {
  if (record.assemblyId !== catalogEntry.assemblyId ||
      record.modelRevisionSha256 !== catalogEntry.modelRevisionSha256) {
    throw new TypeError("Library record identity does not match its exact catalog entry.");
  }
  const dataset = createEomHistoryDataset(record);
  const bounds = describeBounds(recordControlPoints(dataset));
  const prescribed = record.provenance?.prescribedGeometry;
  const coordinates = prescribed?.coordinates;
  const composition = describeBraidComposition(coordinates);
  const sourceLines = coordinates?.worldlines ?? [];
  const operators = sourceLines.map((line) => line.operator ?? {});
  const completeOperators = sourceLines.length === dataset.worldlines.length && dataset.worldlines.every((line) => sourceLines.some((source) => source.id === line.id));
  const allCircular = completeOperators && operators.every(fixedCircular);
  const sourcePolicy = coordinates?.speedPolicy;
  const speedPolicy = sourcePolicy?.owner && sourcePolicy?.version && sourcePolicy?.quantity && sourcePolicy?.frame && sourcePolicy?.unitConvention &&
    ["uncapped", "capped-cf"].includes(sourcePolicy.mode) ? sourcePolicy.mode : "unavailable";
  const radii = completeOperators ? describeAssemblyRadii(coordinates, dataset.window)
    : { value: "unavailable", reason: "The source must describe every recorded architrino before comparing assembly-centered radii." };
  const circleOccupancy = describeBorgCircleOccupancy(dataset);
  const braidDimension = describeBraidDimensionality(composition, coordinates, dataset);
  const variantSet = describeLibraryVariantSet(coordinates);
  const scientificStatus = describeBorgScientificStatus(coordinates, catalogEntry, scientificProjection, scientificIntegrity);
  const scientificRelations = [scientificStatus.current, ...scientificStatus.context].filter(Boolean);
  const confirmedSpindle = recordClassification(
    classifications,
    record.assemblyId,
    record.modelRevisionSha256,
    "spindle",
  );
  const shapes = allCircular ? ["circles"] : ["unavailable"];
  if (confirmedSpindle) { if (shapes[0] === "unavailable") shapes.length = 0; shapes.push("spindle"); }
  const facets = { count: String(dataset.worldlines.length), braidCount: composition.braidCount, breathing: completeOperators ? breathingState(operators) : "unavailable", radii: radii.value,
    circleOccupancy: circleOccupancy.value, assemblySpan: bounds.dimension, braidDimension: braidDimension.value, shape: shapes, speedPolicy };
  const label = catalogEntry.label;
  const summary = {
    id: catalogEntry.assemblyId,
    assemblyId: catalogEntry.assemblyId,
    modelRevisionSha256: catalogEntry.modelRevisionSha256,
    label,
    recordUrl: catalogEntry.recordUrl, recordSha256, facets, bounds,
    descriptorVersion: LIBRARY_DESCRIPTOR_VERSION, window: dataset.window,
    classificationRevision: classifications?.revision ?? null, classificationSource: classifications?.source ?? null,
    braids: composition.braids,
    claimGrade: dataset.provenance.claimGrade, evidenceStatus: dataset.provenance.evidenceStatus,
    scientificStatus,
    findingRelations: scientificRelations.map((relation) => ({ findingId: relation.relationId, lifecycle: relation.lifecycle, scope: relation.scope })),
    findingRelationRevision: scientificStatus.projection?.revision ?? null,
    findingRelationSource: scientificStatus.projection?.source ?? null,
    activeFindingConfiguration: scientificStatus.coverage === "current" || scientificStatus.context.length > 0,
    findingsIndexed: scientificStatus.coverage !== "invalid",
    description: prescribed?.description ?? "Sealed assembly record.", variantSet,
    source: dataset.provenance.generatingSpec,
    reasons: {
      count: "Number of persistent worldlines in the sealed record.",
      braidCount: composition.reason,
      breathing: "Moving-circular operators with fixed centers have fixed radii. Nonzero declared radial or axial harmonics mark breathing. Other operators remain unclassified.",
      radii: radii.reason,
      circleOccupancy: circleOccupancy.reason,
      assemblySpan: `Affine rank of all retained cubic control points over the complete record window, tolerance ${bounds.tolerance}. This describes recorded paths, not dynamical stability.`,
      braidDimension: braidDimension.reason,
      shape: `Circular paths require every source worldline to declare moving-circular.v1 with a fixed center. ${confirmedSpindle ? `Spindle envelope is operator-confirmed for this exact record under ${classifications.revision}.` : "No spindle classification is assigned to this record."}`,
      speedPolicy: "Requires an explicit source policy with owner, version, speed quantity, frame and unit convention. Recorded speed alone does not establish a cap.",
    },
  };
  return { dataset, summary, sourceLines };
}

export function createLibraryPreview(described, sampleCount = 321) {
  const { dataset, summary } = described;
  const { start, end } = dataset.window;
  const frames = dataset.createFrameSamples({ start, end, frameCount: sampleCount });
  const trails = describeBorgOrbitTrails(dataset);
  return {
    assemblyId: summary.assemblyId,
    modelRevisionSha256: summary.modelRevisionSha256,
    recordSha256: summary.recordSha256,
    bounds: summary.bounds, start, end,
    sampleCount, interpolation: "retained-cubic samples; no forward evolution",
    paths: dataset.worldlines.map((line, index) => {
      const trail = trails.get(line.id);
      return { id: line.id, polarity: line.polarity,
        trailMode: trail.mode, trailDuration: trail.duration, trailFade: trail.fade, trailReason: trail.reason,
        points: frames.map((frame) => { const p = frame.states[index].position; return [p.x, p.y, p.z]; }),
      };
    }),
  };
}
