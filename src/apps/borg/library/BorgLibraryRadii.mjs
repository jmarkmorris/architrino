// Source-formula radius comparison, never a preview-pixel or bounding-box test.
// Compare all constituents about the one declared assembly center at equal times.
const EPS = 1e-12;
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const vector = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite);
const zero = [0, 0, 0];
const sameVector = (a, b) => vector(a) && vector(b) && a.every((x, i) => Math.abs(x - b[i]) <= EPS);
const orthonormal = (axes) => Array.isArray(axes) && axes.length === 3 && axes.every(vector)
  && axes.every((a, i) => axes.every((b, j) => Math.abs(dot(a, b) - (i === j ? 1 : 0)) <= EPS));
const model = () => ({ polynomial: [0, 0, 0], harmonics: new Map() });

// C cos(w t + phase) + S sin(w t + phase), with t relative to window.start.
function addHarmonic(result, frequency, cosine, sine, phase) {
  let c = cosine * Math.cos(phase) + sine * Math.sin(phase);
  let s = -cosine * Math.sin(phase) + sine * Math.cos(phase);
  if (frequency < 0) { frequency = -frequency; s = -s; }
  if (frequency === 0) { result.polynomial[0] += c; return; }
  const previous = result.harmonics.get(frequency) ?? [0, 0];
  result.harmonics.set(frequency, [previous[0] + c, previous[1] + s]);
}

function addSquaredBreathing(result, row, start, epoch) {
  if (!row || ![row.base, row.amplitude, row.angularFrequency, row.phase].every(Number.isFinite)) return false;
  const { base: b, amplitude: a, angularFrequency: w } = row;
  const phase = w * (start - epoch) + row.phase;
  result.polynomial[0] += b * b + a * a / 2;
  addHarmonic(result, w, 0, 2 * b * a, phase);
  addHarmonic(result, 2 * w, -a * a / 2, 0, 2 * phase);
  return true;
}

function radiusModel(op, placement, start) {
  const epoch = op.epochTime ?? 0;
  const placementEpoch = placement.epochTime ?? 0;
  if (![epoch, placementEpoch].every(Number.isFinite)) return null;
  const centerAt = (time) => placement.centerAtEpoch.map((x, i) => x + placement.velocity[i] * (time - placementEpoch));
  const result = model();
  if (["stationary.v1", "inertial.v1", "sd3-centered-linear-member.v1"].includes(op.kind)) {
    const position = op.kind === "stationary.v1" ? op.position : op.positionAtEpoch;
    const velocity = op.kind === "stationary.v1" ? zero : op.velocity;
    if (!vector(position) || !vector(velocity)) return null;
    const d = sub(position.map((x, i) => x + velocity[i] * (start - epoch)), centerAt(start));
    const v = sub(velocity, placement.velocity);
    result.polynomial = [dot(d, d), 2 * dot(d, v), dot(v, v)];
    return result;
  }
  if (op.kind === "moving-circular.v1") {
    const u = op.radiusU, v = op.radiusV;
    if (![op.centerAtEpoch, op.centerVelocity, u, v].every(vector)
        || !op.centerVelocity.every((x, i) => x === placement.velocity[i])
        || Math.abs(dot(u, v)) > EPS || Math.abs(dot(u, u) - dot(v, v)) > EPS) return null;
    const d = sub(op.centerAtEpoch, centerAt(epoch));
    result.polynomial[0] = dot(d, d) + dot(u, u);
    const cosine = 2 * dot(d, u), sine = 2 * dot(d, v);
    if (Math.abs(cosine) + Math.abs(sine) <= EPS) return result;
    if (op.angularAcceleration !== 0 || ![op.angularVelocity, op.phaseAtEpoch].every(Number.isFinite)) return null;
    addHarmonic(result, op.angularVelocity, cosine, sine, op.phaseAtEpoch + op.angularVelocity * (start - epoch));
    return result;
  }
  if (op.kind === "f5-phase-varying-member.v1") {
    if (!sameVector(op.assemblyCenter, placement.centerAtEpoch) || !placement.velocity.every((x) => x === 0)
        || !orthonormal(op.bodyAxes) || ![1, 2].includes(op.ringIndex)
        || !Number.isFinite(op.axialHalfSeparation) || !Array.isArray(op.transverseRadii)
        || op.transverseRadii.length !== 2 || !op.transverseRadii.every(Number.isFinite)) return null;
    // Exact member reconstruction has orthogonal axial and transverse parts;
    // phase changes the transverse direction but not the selected ring radius.
    result.polynomial[0] = op.axialHalfSeparation ** 2 + op.transverseRadii[op.ringIndex - 1] ** 2;
    return result;
  }
  if (op.kind === "f6c-harmonic-member.v1") {
    if (!sameVector(op.assemblyCenterAtEpoch, centerAt(epoch)) || !vector(op.assemblyVelocity)
        || !op.assemblyVelocity.every((x, i) => x === placement.velocity[i])
        || !orthonormal([op.axis, op.transverseU, op.transverseV])) return null;
    return addSquaredBreathing(result, op.axial, start, epoch)
      && addSquaredBreathing(result, op.radial, start, epoch) ? result : null;
  }
  return null;
}

function bound(result, duration) {
  return result.polynomial.reduce((sum, x, i) => sum + Math.abs(x) * duration ** i, 0)
    + [...result.harmonics.values()].reduce((sum, pair) => sum + Math.abs(pair[0]) + Math.abs(pair[1]), 0);
}
function difference(a, b) {
  const result = model();
  result.polynomial = a.polynomial.map((x, i) => x - b.polynomial[i]);
  for (const frequency of new Set([...a.harmonics.keys(), ...b.harmonics.keys()])) {
    const x = a.harmonics.get(frequency) ?? [0, 0], y = b.harmonics.get(frequency) ?? [0, 0];
    result.harmonics.set(frequency, [x[0] - y[0], x[1] - y[1]]);
  }
  return result;
}
function evaluate(result, time) {
  return result.polynomial.reduce((sum, x, i) => sum + x * time ** i, 0)
    + [...result.harmonics].reduce((sum, [w, [c, s]]) => sum + c * Math.cos(w * time) + s * Math.sin(w * time), 0);
}

export function describeAssemblyRadii(coordinates, window) {
  const unavailable = { value: "unavailable", reason: "Requires complete supported source paths, a declared assembly center, and a conclusive equal-time radius comparison." };
  const placement = coordinates?.geometry?.assemblyPlacement;
  const lines = coordinates?.worldlines;
  if (!placement || !vector(placement.centerAtEpoch) || !vector(placement.velocity)
      || !Array.isArray(lines) || !lines.length || !Number.isFinite(window?.start)
      || !Number.isFinite(window?.end) || window.end <= window.start) return unavailable;
  const models = lines.map((line) => radiusModel(line?.operator ?? {}, placement, window.start));
  if (models.some((m) => !m)) return unavailable;
  const duration = window.end - window.start;
  const scales = models.map((m) => bound(m, duration));
  if (!scales.every(Number.isFinite)) return unavailable;
  const tolerance = EPS * Math.max(1, ...scales);
  // A complete coefficient bound proves agreement throughout the record window.
  if (models.every((m, i) => models.slice(i + 1).every((other) => bound(difference(m, other), duration) <= tolerance))) {
    return { value: "iso", tolerance, reason: `All architrinos have equal distances from the declared assembly center at each time throughout the record window. Source-formula squared-radius difference bound is at most ${tolerance}. Equal radii may breathe together.` };
  }
  // A single unequal-time slice disproves iso-radii. Failure to find a witness
  // never proves equality: unresolved models remain unavailable.
  for (let i = 0; i <= 16; i++) {
    const time = duration * i / 16;
    const squared = models.map((m) => evaluate(m, time));
    if (!squared.every(Number.isFinite)) return unavailable;
    if (Math.min(...squared) >= -tolerance && Math.max(...squared) - Math.min(...squared) > tolerance) {
      const radii = squared.map((r) => Math.sqrt(Math.max(0, r)));
      return { value: "hetero", tolerance, witness: { time: window.start + time, min: Math.min(...radii), max: Math.max(...radii) },
        reason: `Source paths have different distances from the declared assembly center at T=${window.start + time}: ${Math.min(...radii)} to ${Math.max(...radii)}. This compares all architrinos, not orbit centers or corresponding modules; squared-radius tolerance ${tolerance}.` };
    }
  }
  return unavailable;
}
