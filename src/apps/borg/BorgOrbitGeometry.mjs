import { validatePrescribedWorldlineOperator, evaluatePrescribedWorldlineOperator } from "../../prescribed-geometry/PrescribedWorldlineOperators.mjs";

// Source geometry only: independent of polarity ownership and rendering spans.
const EPS = 1e-10;
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const vector = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite);
const same = (a, b) => vector(a) && vector(b) && a.every((x, i) => Math.abs(x - b[i]) <= EPS);
const cross = (u, v) => [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
const at = (center, velocity, dt) => center.map((x, i) => x + velocity[i]*dt);

export function borgCircularOrbit(op, time) {
  if (op?.kind !== "moving-circular.v1" || !Number.isFinite(time)
      || ![op.centerAtEpoch, op.centerVelocity, op.radiusU, op.radiusV].every(vector)
      || ![op.angularVelocity, op.angularAcceleration ?? 0, op.phaseAtEpoch ?? 0, op.epochTime ?? 0].every(Number.isFinite)
      || !(op.angularVelocity || op.angularAcceleration)) return null;
  const r2 = dot(op.radiusU, op.radiusU);
  if (!(r2 > 0) || !Number.isFinite(r2) || Math.abs(dot(op.radiusU, op.radiusV)/r2) > EPS
      || Math.abs(1 - dot(op.radiusV, op.radiusV)/r2) > EPS) return null;
  const center = at(op.centerAtEpoch, op.centerVelocity, time - (op.epochTime ?? 0));
  if (!vector(center)) return null;
  return { center, velocity: op.centerVelocity, r2, normal: cross(op.radiusU, op.radiusV).map((x) => x/r2) };
}

export function sameBorgCircularOrbit(a, b) {
  return Boolean(a && b && same(a.center, b.center) && same(a.velocity, b.velocity)
    && Math.abs(a.r2 - b.r2) <= EPS && Math.abs(Math.abs(dot(a.normal, b.normal)) - 1) <= EPS);
}

function sourceTrack(op, time) {
  const circle = borgCircularOrbit(op, time);
  if (circle) return { ...circle, op, kind: "circle" };
  if (op.kind === "f5-phase-varying-member.v1") {
    const normal = op.bodyAxes[op.axisIndex];
    const offset = op.axialHalfSeparation * op.polarity * (op.ringIndex === 1 ? 1 : -1);
    // A regular F5 triangle has a continuous periodic phase offset from its
    // winding resultant ellipse, so each member traverses its complete circle.
    return { op, kind: "circle", normal, center: at(op.assemblyCenter, normal, offset),
      velocity: [0, 0, 0], r2: op.transverseRadii[op.ringIndex - 1] ** 2 };
  }
  if (op.kind === "f6c-harmonic-member.v1" && op.phase.modulationAmplitude === 0 && op.phase.rate !== 0) {
    return { op, kind: "harmonic", normal: op.axis, velocity: op.assemblyVelocity,
      center: at(op.assemblyCenterAtEpoch, op.assemblyVelocity, time - op.epochTime) };
  }
  return null;
}

function axialSlab(track) {
  const h = track.op.axial;
  return track.kind === "circle" ? [0, 0]
    : [track.op.polarity*h.base - Math.abs(h.amplitude), track.op.polarity*h.base + Math.abs(h.amplitude)];
}

// A point outside another track's all-time axial slab disproves coincidence.
// Absence of a witness never establishes equality or dedication. Remove only
// a COMMON translation; never align or recenter individual member tracks.
function outsideSlab(points, track) {
  const [low, high] = axialSlab(track);
  return points.some((p) => {
    const projection = dot(p.map((x, i) => x - track.center[i]), track.normal);
    if (!Number.isFinite(projection)) throw new TypeError("Nonfinite source projection.");
    return projection < low - EPS || projection > high + EPS;
  });
}

export function describeBorgOrbitSharing(dataset) {
  const unavailable = (reason) => ({ value: "unavailable", groups: [], reason });
  const sources = dataset.provenance?.prescribedGeometry?.coordinates?.worldlines;
  const lines = dataset.worldlines, window = dataset.window;
  if (!Array.isArray(sources) || !Array.isArray(lines) || !lines.length || sources.length !== lines.length
      || ![...sources, ...lines].every((line) => typeof line?.id === "string" && line.id.length > 0)
      || new Set(lines.map((l) => l.id)).size !== lines.length || new Set(sources.map((l) => l.id)).size !== sources.length
      || !lines.every((l) => sources.some((s) => s.id === l.id))) {
    return unavailable("Orbit sharing requires exactly one source path for every recorded architrino.");
  }
  if (!Number.isFinite(window?.start) || !Number.isFinite(window?.end) || window.end <= window.start) {
    return unavailable("Orbit sharing requires a finite nonempty source window.");
  }
  let operators;
  try { operators = lines.map((line) => validatePrescribedWorldlineOperator(sources.find((s) => s.id === line.id).operator)); }
  catch { return unavailable("Orbit sharing requires complete supported source operators."); }
  const linear = new Set(["stationary.v1", "inertial.v1", "sd3-centered-linear-member.v1"]);
  if (operators.every((op) => linear.has(op.kind))) return unavailable("Not applicable: the declared source paths are non-orbital.");
  const tracks = operators.map((op) => sourceTrack(op, window.start));
  if (tracks.some((t) => !t || !vector(t.center) || !vector(t.normal) || !Number.isFinite(t.r2 ?? 0))) {
    return unavailable("A source track is non-orbital or lacks a supported orbit-coincidence comparison.");
  }
  // Relative drift changes the carrier; do not infer whole-track equivalence
  // from one coincident-time slice. Future carrier kinds can extend this check.
  if (!tracks.every((t) => t.velocity.every((v, i) => v === tracks[0].velocity[i]))) {
    return unavailable("Source tracks do not have a supported common translation frame.");
  }
  const samples = new Map();
  const points = (track) => {
    if (!samples.has(track)) samples.set(track, Array.from({ length: 65 }, (_, i) => {
      const time = window.start + (window.end - window.start)*i/64;
      const p = evaluatePrescribedWorldlineOperator(track.op, time).position;
      const centered = p.map((x, k) => x - track.velocity[k]*(time - window.start));
      if (!vector(centered)) throw new TypeError("Nonfinite source position.");
      return centered;
    }));
    return samples.get(track);
  };
  const equal = tracks.map(() => tracks.map(() => false));
  try {
    for (let i = 0; i < tracks.length; i++) {
      equal[i][i] = true;
      for (let j = i + 1; j < tracks.length; j++) {
        const a = tracks[i], b = tracks[j];
        if (a.kind === "circle" && b.kind === "circle") equal[i][j] = equal[j][i] = sameBorgCircularOrbit(a, b);
        else if (!outsideSlab(points(a), b) && !outsideSlab(points(b), a)) {
          return unavailable("Source-track coincidence is unresolved; sampled agreement cannot establish orbit sharing.");
        }
      }
    }
  } catch { return unavailable("Source-track comparison could not evaluate complete finite geometry."); }
  const groups = [], assigned = new Set();
  for (let i = 0; i < tracks.length; i++) {
    if (assigned.has(i)) continue;
    const indices = equal[i].flatMap((match, j) => match ? [j] : []);
    if (indices.some((j) => assigned.has(j) || indices.some((k) => !equal[j][k]))) {
      return unavailable("Orbit-coincidence tolerance is ambiguous across a group; no chained matches are accepted.");
    }
    indices.forEach((j) => assigned.add(j));
    groups.push(indices.map((j) => lines[j].id));
  }
  const shared = groups.filter((group) => group.length > 1).length, dedicated = groups.length - shared;
  const value = shared && dedicated ? "mixed" : shared ? "shared" : "dedicated";
  return { value, groups, reason: `Source geometry identifies ${shared} multiply occupied and ${dedicated} singly occupied tracks (geometric tolerance ${EPS}). Sharing is independent of radius equality, phase, polarity pairing, and trail length; this is a source-geometry browse classification, not physical acceptance.` };
}
