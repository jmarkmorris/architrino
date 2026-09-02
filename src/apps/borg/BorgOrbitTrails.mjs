import { borgCircularOrbit, sameBorgCircularOrbit, describeBorgSourceTrackGroups } from "./BorgOrbitGeometry.mjs";

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

const same = (a, b) => a.every((x, i) => Math.abs(x - b[i]) <= EPS);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);

const unavailable = () => ({ mode: "unavailable", duration: 0, fade: false, reason: "No supported source orbit/phase carrier, or multi-occupant track ownership is unresolved." });

function circle(op, time) {
  const geometry = borgCircularOrbit(op, time);
  if (!geometry || op.angularAcceleration !== 0 || !op.angularVelocity) return null;
  const dt = time-(op.epochTime ?? 0), phase = op.phaseAtEpoch + op.angularVelocity*dt;
  const c = Math.cos(phase), s = Math.sin(phase), direction = Math.sign(op.angularVelocity);
  const u = op.radiusU, v = op.radiusV;
  return { ...geometry, omega: Math.abs(op.angularVelocity), travelNormal: geometry.normal.map(x => direction*x),
    a: u.map((x,i) => x*c+v[i]*s), b: u.map((x,i) => direction*(-x*s+v[i]*c)) };
}

function multiOccupantArc(path, peers) {
  // Equal signed angular rates keep these phase gaps fixed for the entire
  // source history. A snapshot with counter-rotation cannot own a fixed arc.
  if (!peers.every(peer => Math.abs(path.omega-peer.omega) <= EPS
      && same(path.travelNormal, peer.travelNormal))) return unavailable();
  const lags = peers.map(peer => {
    const angle = Math.atan2(dot(peer.a, path.b), dot(peer.a, path.a));
    return (2*Math.PI-angle) % (2*Math.PI);
  });
  if (lags.some(lag => lag <= EPS || 2*Math.PI-lag <= EPS)) return unavailable();
  const ordered = [...lags].sort((a,b) => a-b);
  if (ordered.some((lag,i) => i>0 && lag-ordered[i-1] <= EPS)) return unavailable();
  return { mode: "multi-occupant-arc", duration: Math.min(...lags)/path.omega, fade: true,
    reason: "Co-rotating members occupy this source circle: each trail ends at the preceding member's phase." };
}

export function describeBorgOrbitTrails(dataset) {
  const coordinates = dataset.provenance?.prescribedGeometry?.coordinates;
  const sources = coordinates?.worldlines ?? [];
  const rows = dataset.worldlines.map((line) => ({ line, source: sources.find((s) => s.id===line.id) }));
  const singlyOccupied = new Set(describeBorgSourceTrackGroups(dataset).groups.filter((group) => group.length === 1).flat());
  const circles = rows.map(({source}) => circle(source?.operator, dataset.window.start));
  return new Map(rows.map(({line,source}, index) => {
    const op = source?.operator, path = circles[index];
    let policy = unavailable();
    if (path) {
      const peers = circles.flatMap((other,j) => j!==index && sameBorgCircularOrbit(path,other) ? [j] : []);
      if (!peers.length && sources.length===rows.length && circles.every(Boolean)) {
        policy = { mode: "full-turn", duration: 2*Math.PI/path.omega, fade: false, reason: "Single-occupant source circle: one complete preceding turn in its owner's color." };
      } else if (peers.length===1) {
        const j = peers[0], peer = circles[j];
        const paired = coordinates?.relationships?.neutralPairs?.some((pair) => pair.members?.length===2
          && pair.members.includes(source.constituentId) && pair.members.includes(rows[j].source.constituentId));
        if (paired && rows[j].line.polarity===-line.polarity && Math.abs(path.omega-peer.omega)<=EPS
            && same(path.a,peer.a.map(x=>-x)) && same(path.b,peer.b.map(x=>-x))) {
          policy = { mode: "half-turn", duration: Math.PI/path.omega, fade: true, reason: "Opposite-polarity antipodal partners occupy this source circle: each owns the preceding half-turn." };
        }
      } else if (peers.length > 1 && sources.length===rows.length && circles.every(Boolean)) {
        policy = multiOccupantArc(path, peers.map(j => circles[j]));
      }
    } else if (op?.kind === "f6c-harmonic-member.v1" && op.phase?.modulationAmplitude===0 && Number.isFinite(op.phase.rate) && Math.abs(op.phase.rate)>0 && singlyOccupied.has(line.id)) {
      policy = { mode: "full-turn", duration: 2*Math.PI/Math.abs(op.phase.rate), fade: false, reason: "Single-occupant polarity-sector path: one complete source phase turn, including recorded breathing." };
    } else if (op?.kind === "f5-phase-varying-member.v1" && Number.isFinite(op.resultantAngularFrequency) && op.resultantAngularFrequency>0 && singlyOccupied.has(line.id)) {
      policy = { mode: "full-cycle", duration: 2*Math.PI/op.resultantAngularFrequency, fade: false, reason: "Single-occupant phase-varying path: one complete source reconstruction cycle, not an inferred constant angular speed." };
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
