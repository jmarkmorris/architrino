// Presentation policy only. Positions always come from recorded histories.
export const BORG_ELECTRINO_COLOR = 0x0000ff;
export const BORG_POSITRINO_COLOR = 0xff0000;
export function borgPolarityColor(polarity) {
  if (polarity === 1) return BORG_POSITRINO_COLOR;
  if (polarity === -1) return BORG_ELECTRINO_COLOR;
  throw new TypeError("Borg paths require a known electrino or positrino polarity.");
}
export const borgPolarityCss = (polarity) => `#${borgPolarityColor(polarity).toString(16).padStart(6, "0")}`;
const EPS = 1e-10;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const vector = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite);
const same = (a, b) => a.every((x, i) => Math.abs(x - b[i]) <= EPS);
const cross = (u, v) => [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
const unavailable = () => ({ mode: "unavailable", duration: 0, fade: false, reason: "No supported source orbit/phase carrier, or shared-orbit ownership is unresolved." });

function circle(op, time) {
  if (op?.kind !== "moving-circular.v1" || op.angularAcceleration !== 0
      || ![op.centerAtEpoch, op.centerVelocity, op.radiusU, op.radiusV].every(vector)
      || ![op.angularVelocity, op.phaseAtEpoch, op.epochTime ?? 0].every(Number.isFinite)
      || !op.angularVelocity) return null;
  const u = op.radiusU, v = op.radiusV, r2 = dot(u, u);
  if (!(r2 > 0) || Math.abs(dot(u, v)) > EPS || Math.abs(r2-dot(v, v)) > EPS) return null;
  const dt = time-(op.epochTime ?? 0), phase = op.phaseAtEpoch + op.angularVelocity*dt;
  const c = Math.cos(phase), s = Math.sin(phase), direction = Math.sign(op.angularVelocity);
  const normal = cross(u, v).map((x) => x/r2);
  return { center: op.centerAtEpoch.map((x,i) => x+dt*op.centerVelocity[i]), velocity: op.centerVelocity,
    r2, normal, omega: Math.abs(op.angularVelocity),
    a: u.map((x,i) => x*c+v[i]*s), b: u.map((x,i) => direction*(-x*s+v[i]*c)) };
}
function sameOrbit(a, b) {
  return b && same(a.center,b.center) && same(a.velocity,b.velocity) && Math.abs(a.r2-b.r2)<=EPS
    && Math.abs(Math.abs(dot(a.normal,b.normal))-1)<=EPS;
}

// These source reconstructions have individual tracks. Accept only the cases
// where their planes/radii distinguish every owner, not a name-based exception.
function dedicatedReconstruction(rows, source) {
  const op = source?.operator;
  if (op?.kind === "f6c-harmonic-member.v1") {
    if (!vector(op.axis) || !Number.isFinite(op.axial?.base) || !Number.isFinite(op.axial?.amplitude)
        || !(op.axial.base > Math.abs(op.axial.amplitude))) return false;
    return rows.every(({source: other}) => {
      const b = other?.operator;
      if (b?.kind!==op.kind || !vector(b.axis) || !(b.axial?.base > Math.abs(b.axial?.amplitude))
          || !same(op.assemblyCenterAtEpoch,b.assemblyCenterAtEpoch) || !same(op.assemblyVelocity,b.assemblyVelocity)) return false;
      if (other===source) return true;
      const alignment=dot(op.axis,b.axis);
      return Math.abs(alignment)<1-EPS || alignment*op.polarity*b.polarity<0;
    });
  }
  if (op?.kind === "f5-phase-varying-member.v1") {
    if (!(op.axialHalfSeparation>0) || ![1,2].includes(op.ringIndex)) return false;
    const axis=op.bodyAxes?.[op.axisIndex], radius=op.transverseRadii?.[op.ringIndex-1];
    if (!vector(axis) || !(radius>0)) return false;
    const center=op.assemblyCenter.map((x,i)=>x+axis[i]*op.axialHalfSeparation*op.polarity*(op.ringIndex===1?1:-1));
    return rows.every(({source: other}) => {
      const b=other?.operator, axisB=b?.bodyAxes?.[b.axisIndex];
      if (b?.kind!==op.kind || !vector(axisB) || !(b.axialHalfSeparation>0)) return false;
      if (other===source) return true;
      const centerB=b.assemblyCenter.map((x,i)=>x+axisB[i]*b.axialHalfSeparation*b.polarity*(b.ringIndex===1?1:-1));
      return !same(center,centerB) || Math.abs(dot(axis,axisB))<1-EPS
        || Math.abs(radius-b.transverseRadii[b.ringIndex-1])>EPS;
    });
  }
  return false;
}

export function describeBorgOrbitTrails(dataset) {
  const coordinates = dataset.provenance?.prescribedGeometry?.coordinates;
  const sources = coordinates?.worldlines ?? [];
  const rows = dataset.worldlines.map((line) => ({ line, source: sources.find((s) => s.id===line.id) }));
  const circles = rows.map(({source}) => circle(source?.operator, dataset.window.start));
  return new Map(rows.map(({line,source}, index) => {
    const op = source?.operator, path = circles[index];
    let policy = unavailable();
    if (path) {
      const peers = circles.flatMap((other,j) => j!==index && sameOrbit(path,other) ? [j] : []);
      if (!peers.length && sources.length===rows.length && circles.every(Boolean)) {
        policy = { mode: "full-turn", duration: 2*Math.PI/path.omega, fade: false, reason: "Dedicated source circle: one complete preceding turn in its owner's color." };
      } else if (peers.length===1) {
        const j = peers[0], peer = circles[j];
        const paired = coordinates?.relationships?.neutralPairs?.some((pair) => pair.members?.length===2
          && pair.members.includes(source.constituentId) && pair.members.includes(rows[j].source.constituentId));
        if (paired && rows[j].line.polarity===-line.polarity && Math.abs(path.omega-peer.omega)<=EPS
            && same(path.a,peer.a.map(x=>-x)) && same(path.b,peer.b.map(x=>-x))) {
          policy = { mode: "half-turn", duration: Math.PI/path.omega, fade: true, reason: "Opposite-polarity antipodal partners share this source circle: each owns the preceding half-turn." };
        }
      }
    } else if (op?.kind === "f6c-harmonic-member.v1" && op.phase?.modulationAmplitude===0 && Number.isFinite(op.phase.rate) && Math.abs(op.phase.rate)>0 && dedicatedReconstruction(rows,source)) {
      policy = { mode: "full-turn", duration: 2*Math.PI/Math.abs(op.phase.rate), fade: false, reason: "Dedicated polarity-sector path: one complete source phase turn, including recorded breathing." };
    } else if (op?.kind === "f5-phase-varying-member.v1" && Number.isFinite(op.resultantAngularFrequency) && op.resultantAngularFrequency>0 && dedicatedReconstruction(rows,source)) {
      policy = { mode: "full-cycle", duration: 2*Math.PI/op.resultantAngularFrequency, fade: false, reason: "Dedicated phase-varying path: one complete source reconstruction cycle, not an inferred constant angular speed." };
    } else if (["inertial.v1","stationary.v1","sd3-centered-linear-member.v1"].includes(op?.kind)
        || dataset.provenance?.engineId !== "prescribed-geometry") {
      policy = { mode: "record-window", duration: dataset.window.end-dataset.window.start, fade: false, reason: "Recorded history; no orbital period is inferred." };
    }
    return [line.id, policy];
  }));
}

// Clip both ends, including fractional sample intervals; never wrap into future
// samples to fill a young trail. The caller draws only recorded sample chords.
export function borgTrailSegments(points, times, time, duration, fade = false) {
  if (!(duration>0) || !Number.isFinite(time) || points.length!==times.length) return [];
  const result = [], oldest = time-duration;
  for (let i=1;i<times.length;i++) {
    const a = Math.max(oldest,times[i-1]), b = Math.min(time,times[i]);
    if (!(b>a)) continue;
    const dt = times[i]-times[i-1];
    const at = (t) => points[i-1].map((x,k)=>x+(points[i][k]-x)*(t-times[i-1])/dt);
    const alpha = (t) => fade ? Math.max(0,Math.min(1,1-(time-t)/duration)) : 1;
    result.push({ a:at(a), b:at(b), start:a, end:b, startAlpha:alpha(a), endAlpha:alpha(b) });
  }
  return result;
}
