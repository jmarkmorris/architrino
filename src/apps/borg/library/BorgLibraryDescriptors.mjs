import { createEomHistoryDataset } from "../../shared/EomHistoryDataset.mjs";

export const LIBRARY_DESCRIPTOR_VERSION = "borg-record-facets.v1";
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

export function describeLibraryRecord(record, catalogEntry, recordSha256) {
  const dataset = createEomHistoryDataset(record);
  const bounds = describeBounds(recordControlPoints(dataset));
  const prescribed = record.provenance?.prescribedGeometry;
  const coordinates = prescribed?.coordinates;
  const sourceLines = coordinates?.worldlines ?? [];
  const operators = sourceLines.map((line) => line.operator ?? {});
  const completeOperators = sourceLines.length === dataset.worldlines.length && dataset.worldlines.every((line) => sourceLines.some((source) => source.id === line.id));
  const allCircular = completeOperators && operators.every(fixedCircular);
  const sourcePolicy = coordinates?.speedPolicy;
  const speedPolicy = sourcePolicy?.owner && sourcePolicy?.version && sourcePolicy?.quantity && sourcePolicy?.frame && sourcePolicy?.unitConvention &&
    ["uncapped", "capped-cf"].includes(sourcePolicy.mode) ? sourcePolicy.mode : "unavailable";
  const nesting = coordinates?.relationships?.nesting;
  const nested = nesting?.owner && typeof nesting?.nested === "boolean" ? (nesting.nested ? "yes" : "no") : "unavailable";
  const shapes = allCircular ? ["circles"] : ["unavailable"];
  const facets = { count: String(dataset.worldlines.length), breathing: completeOperators ? breathingState(operators) : "unavailable", nested,
    dimension: bounds.dimension, shape: shapes, speedPolicy };
  const label = catalogEntry.label.replace(/^[^—]+—\s*/, "");
  const summary = {
    id: catalogEntry.id, sourceId: record.sourceId, label, alias: catalogEntry.label,
    recordUrl: catalogEntry.recordUrl, recordSha256, facets, bounds,
    descriptorVersion: LIBRARY_DESCRIPTOR_VERSION, window: dataset.window,
    claimGrade: dataset.provenance.claimGrade, evidenceStatus: dataset.provenance.evidenceStatus,
    description: prescribed?.description ?? "Sealed assembly record.",
    source: dataset.provenance.generatingSpec,
    reasons: {
      count: "Number of persistent worldlines in the sealed record.",
      breathing: "Moving-circular operators with fixed centers have fixed radii. Nonzero F6c radial or axial harmonics mark breathing. Other operators remain unclassified.",
      nested: "Requires an explicit source-owned nesting declaration; component count alone is insufficient.",
      dimension: `Affine rank of all retained cubic control points over the complete record window, tolerance ${bounds.tolerance}. This describes recorded paths, not dynamical stability.`,
      shape: "Circular paths require every source worldline to declare moving-circular.v1 with a fixed center. Spherical and spindle envelopes are not yet classified by this descriptor.",
      speedPolicy: "Requires an explicit source policy with owner, version, speed quantity, frame and unit convention. Recorded speed alone does not establish a cap.",
    },
  };
  return { dataset, summary, sourceLines };
}

export function createLibraryPreview(described, sampleCount = 321) {
  const { dataset, summary, sourceLines } = described;
  const { start, end } = dataset.window;
  const frames = dataset.createFrameSamples({ start, end, frameCount: sampleCount });
  return {
    id: summary.id, recordSha256: summary.recordSha256, bounds: summary.bounds, start, end,
    sampleCount, interpolation: "retained-cubic samples; no forward evolution",
    paths: dataset.worldlines.map((line, index) => {
      const op = sourceLines.find((source) => source.id === line.id)?.operator;
      let omega = null;
      if (op?.kind === "moving-circular.v1" && op.angularAcceleration === 0) omega = Math.abs(op.angularVelocity);
      if (op?.kind === "f6c-harmonic-member.v1" && op.phase?.modulationAmplitude === 0) omega = Math.abs(op.phase.rate);
      const linear = op?.kind === "sd3-centered-linear-member.v1";
      return { id: line.id, polarity: line.polarity,
        trailMode: omega > 0 ? "half-turn" : linear ? "record-window" : "unavailable",
        trailDuration: omega > 0 ? Math.PI / omega : linear ? end - start : 0,
        points: frames.map((frame) => { const p = frame.states[index].position; return [p.x, p.y, p.z]; }),
      };
    }),
  };
}
