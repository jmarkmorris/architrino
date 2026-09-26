// Explicit-use research diagnostic; not a production EOM solver or a certificate.
// Sharp ordinary partner row, no self action, cf=R*=1. Historical instrument unchanged.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const args = Object.fromEntries(process.argv.slice(2).map(s => s.replace(/^--/, '').split('=')));
let D = .74;
for (let i = 0; i < 12; i++) D -= (D - Math.cos(D)) / (1 + Math.sin(D));
const K = 4 * D * (1 + Math.sin(D));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
function segmentBounds(a,b,h,e) {
  const va=a.slice(2), vb=b.slice(2);
  const controls=[a.slice(0,2), a.slice(0,2).map((w,j)=>w+h*va[j]/3), b.slice(0,2).map((w,j)=>w-h*vb[j]/3), b.slice(0,2)];
  const middle=[0,1].map(j=>3*(b[j]-a[j])/h-va[j]-vb[j]);
  return { minimum: Math.min(...controls.map(p=>dot(e,p))), maximumSpeed: Math.max(Math.hypot(...va),Math.hypot(...middle),Math.hypot(...vb)) };
}

function run({ radius = 1.001, dt = .002, end = 100, control = 'circle', stopEvents = true, lateDt = dt }) {
  const started = Date.now(), T = [0];
  let y = control === 'rest' ? [radius, 0, 0, 0] : control === 'switch' ? [0, 0, 1, 0] : [radius, 0, 0, 1];
  const Y = [y], events = [], logs = [];
  let t = 0, active = control !== 'rest', maxR = radius, steps = 0, nextLog = 0, nextBeat = 5000;
  let minJ = Infinity, minDelay = Infinity, maxResidual = 0, maxSourceExcess = 0, maxNormalization = 0;
  function history(s) {
    if (s <= 0) return control === 'rest' ? { x: [radius, 0], v: [0, 0] } : {
      x: [radius * Math.cos(s / radius), radius * Math.sin(s / radius)], v: [-Math.sin(s / radius), Math.cos(s / radius)]
    };
    assert.ok(s <= T.at(-1) + 1e-12, 'source beyond accepted history');
    let lo = 0, hi = T.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (T[m] <= s) lo = m; else hi = m; }
    const a = Y[lo], b = Y[hi], h = T[hi] - T[lo], u = (s - T[lo]) / h;
    const x = [0, 1].map(j => (2*u**3-3*u*u+1)*a[j] + (u**3-2*u*u+u)*h*a[j+2] + (-2*u**3+3*u*u)*b[j] + (u**3-u*u)*h*b[j+2]);
    const v = [0, 1].map(j => (6*u*u-6*u)*a[j]/h + (3*u*u-4*u+1)*a[j+2] + (-6*u*u+6*u)*b[j]/h + (3*u*u-2*u)*b[j+2]);
    maxSourceExcess = Math.max(maxSourceExcess, Math.hypot(...v) - 1);
    return { x, v };
  }
  function raw(at, z) {
    if (control === 'switch') return { a: [1-at, 0], J: 1, delay: 10, range: 10, residual: 0, source: at-10 };
    const gap = s => { const h = history(s); return Math.hypot(z[0]+h.x[0], z[1]+h.x[1]) - (at-s); };
    let lo = at - (Math.hypot(z[0], z[1]) + maxR + 1), hi = Math.min(at, T.at(-1));
    assert.ok(gap(lo) < 0 && gap(hi) > 0, 'root not bracketed behind accepted history');
    for (let i = 0; i < 60 && hi-lo > 1e-13; i++) {
      const m = (lo+hi)/2; if (gap(m) > 0) hi = m; else lo = m;
    }
    const source = (lo+hi)/2, h = history(source), r = [z[0]+h.x[0], z[1]+h.x[1]], range = Math.hypot(...r);
    const n = r.map(w => w/range), J = 1+dot(n, h.v);
    assert.ok(J > 1e-6 && range > 1e-6, 'ordinary row floor');
    const residual = Math.abs(range-(at-source));
    minJ = Math.min(minJ, J); minDelay = Math.min(minDelay, at-source); maxResidual = Math.max(maxResidual, residual);
    return { a: n.map(w => -K*w/(range*range*J)), J, delay: at-source, range, residual, source };
  }
  function state(at, z) {
    const r = raw(at, z), v = z.slice(2), speed = Math.hypot(...v), radiusNow = Math.hypot(z[0], z[1]);
    return { t: at, x: z.slice(0,2), v, speed, radius: radiusNow, radial: radiusNow ? dot(z,v)/radiusNow : 1,
      power: dot(v,r.a), forward: speed ? dot(v,r.a)/speed : 0, ...r };
  }
  function derivative(at, z) {
    const { a } = raw(at, z), v = z.slice(2), norm2 = dot(v,v);
    // Smooth boundary extension is used only to locate its first power zero.
    const remove = active ? dot(v,a)/norm2 : 0;
    return [...v, a[0]-remove*v[0], a[1]-remove*v[1]];
  }
  function step(h) {
    const a = derivative(t,y), b = derivative(t+h/2,y.map((w,j)=>w+h*a[j]/2));
    const c = derivative(t+h/2,y.map((w,j)=>w+h*b[j]/2)), d = derivative(t+h,y.map((w,j)=>w+h*c[j]));
    return y.map((w,j)=>w+h*(a[j]+2*b[j]+2*c[j]+d[j])/6);
  }
  function escapeDiagnostic() {
    if (control !== 'circle' || t < 200) return null;
    const speed = Math.hypot(y[2],y[3]), e = y.slice(2).map(w=>w/speed), x0 = dot(e,y);
    const start = T.findIndex(at=>at>=100), sourceTime = T[start];
    let minSourceProjection = Infinity, maxSourceSpeed = 0;
    // Bernstein convex-hull bounds cover each entire stored Hermite segment;
    // floating-point evaluations are not outward-rounded certificates.
    for (let i=start;i<Y.length-1;i++) {
      const bounds=segmentBounds(Y[i],Y[i+1],T[i+1]-T[i],e);
      minSourceProjection=Math.min(minSourceProjection,bounds.minimum);
      maxSourceSpeed=Math.max(maxSourceSpeed,bounds.maximumSpeed);
    }
    const gAtSource=Math.hypot(y[0]+Y[start][0],y[1]+Y[start][1])-(t-sourceTime);
    const b=.7, u=.35, impulseBound=K/((1-b)*u*x0);
    return { e, x0, sourceTime, gAtSource, minSourceProjection, maxSourceSpeed, b, u, impulseBound,
      margin: Math.min(b-speed,speed-u)-impulseBound,
      conditionsNumericallySatisfied: gAtSource<0 && minSourceProjection>0 && maxSourceSpeed<b && x0>0 && impulseBound<Math.min(b-speed,speed-u) };
  }
  const summary = reason => ({ input: { radius, dt, lateDt, end, control, stopEvents }, reason, steps, events, last: state(t,y), escapeDiagnostic: escapeDiagnostic(),
    minJ, minDelay, maxResidual, maxSourceExcess, maxNormalization, logs, wallSeconds: (Date.now()-started)/1000 });
  while (t < end-1e-10 && steps < 500000) {
    const before = state(t,y);
    if (before.radius < .01 && control !== 'switch') return summary('radius resolution guard');
    const h = Math.min(t >= 100 ? lateDt : dt, before.delay/8, .02/(1+Math.hypot(...before.a)), end-t);
    if (h < 1e-9) return summary('step resolution guard');
    let ny = step(h), after = state(t+h,ny), used = h;
    const crossings = [];
    if (active && before.power >= -1e-12 && after.power < 0) crossings.push(['ceiling release', s=>s.power]);
    if (!active && stopEvents) {
      if (before.radial > 0 && after.radial <= 0) crossings.push(['radial maximum', s=>s.radial]);
      if (before.power < 0 && after.power >= 0) crossings.push(['speed minimum', s=>-s.power]);
      if (before.speed < 1 && after.speed >= 1) crossings.push(['ceiling return', s=>1-s.speed]);
    }
    let event = null;
    for (const [name, value] of crossings) {
      let lo = 0, hi = h;
      while (hi-lo > 1e-10) {
        const mid = (lo+hi)/2;
        if (value(state(t+mid,step(mid))) > 0) lo = mid; else hi = mid;
      }
      if (!event || hi < event.h) event = { name, h: hi, bracket: [t+lo,t+hi] };
    }
    if (event) { used = event.h; ny = step(used); }
    if (active) {
      const speed = Math.hypot(ny[2],ny[3]); maxNormalization = Math.max(maxNormalization, Math.abs(speed-1));
      ny[2] /= speed; ny[3] /= speed;
    }
    if (t >= nextLog) { logs.push(before); nextLog += .5; }
    t += used; y = ny; T.push(t); Y.push(y); steps++;
    maxR = Math.max(maxR,Math.hypot(y[0],y[1]));
    if (event) {
      events.push({ name: event.name, bracket: event.bracket, ...state(t,y) });
      if (event.name === 'ceiling release') active = false;
      else return summary(event.name);
    }
    assert.ok(Math.hypot(y[2],y[3]) <= 1+1e-9, 'ceiling exceeded');
    if (Date.now()-started >= nextBeat) { console.error(JSON.stringify({ heartbeat: true, t, steps, active })); nextBeat += 5000; }
    if (Date.now()-started > 45000) return summary('45 second deadline');
  }
  return summary(t >= end-1e-10 ? 'observation horizon' : 'step budget');
}

let result;
if (Object.hasOwn(args,'verify')) {
  const linearBounds=segmentBounds([1,0,.5,0],[2,0,.5,0],2,[1,0]);
  assert.deepEqual(linearBounds,{minimum:1,maximumSpeed:.5});
  const circle = run({ radius: 1, dt: .002, end: 3 });
  assert.equal(circle.reason,'observation horizon');
  assert.ok(Math.abs(circle.last.radius-1)<1e-8 && Math.abs(circle.last.delay-2*D)<1e-8 && Math.abs(circle.last.forward-Math.tan(D))<1e-8);
  // Exact sharp partner dynamics while the source still lies on the stationary past:
  // u=2r cos²(eta), t=sqrt((2r)^3/(2K)) (eta+sin eta cos eta), v=-sqrt(2K/(2r)) tan eta.
  const rest = run({ radius: 2, dt: .002, end: .2, control: 'rest', stopEvents: false });
  let lo = 0, hi = .2;
  for (let i=0;i<60;i++) { const e=(lo+hi)/2; if (Math.sqrt(64/(2*K))*(e+Math.sin(e)*Math.cos(e))<.2) lo=e; else hi=e; }
  const eta=(lo+hi)/2, x=4*Math.cos(eta)**2-2, v=-Math.sqrt(K/2)*Math.tan(eta);
  assert.ok(rest.last.source<0 && Math.abs(rest.last.x[0]-x)<1e-10 && Math.abs(rest.last.v[0]-v)<1e-10);
  // Algorithm-only supplied-acceleration control, never evidence for two-body dynamics.
  const change = run({ dt: .007, end: 1.5, control: 'switch', stopEvents: false });
  assert.ok(Math.abs(change.events[0].t-1)<1e-9 && Math.abs(change.last.speed-.875)<1e-9 && Math.abs(change.last.x[0]-(1.5-.125/6))<1e-9);
  result = { knownCasesPassed: true, linearBounds, circle: circle.last, rest: { actual: rest.last, expected: { x, v } }, switchControl: { event: change.events[0], last: change.last }, K, D };
} else {
  assert.ok(args.dt, 'explicit --dt required');
  result = run({ radius: Number(args.radius??1.001), dt: Number(args.dt), lateDt: Number(args['late-dt']??args.dt), end: Number(args.end??100) });
}
if (args.output) fs.writeFileSync(args.output,JSON.stringify(result,null,2)+'\n');
const { logs, ...brief } = result;
console.log(JSON.stringify(brief));
