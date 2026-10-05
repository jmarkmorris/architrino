#!/usr/bin/env node
// Research comparison only. Full triangular reception, both mirror channels.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const p = a.replace(/^--/, '').split('='); return [p[0], p[1] ?? true];
}));
const mode = args.mode ?? 'controls';
const scriptHash = crypto.createHash('sha256').update(fs.readFileSync(new URL(import.meta.url))).digest('hex');
const started = new Date().toISOString();
const wall0 = performance.now(), cpu0 = process.cpuUsage();
let quadratureCalls = 0, kernelCalls = 0;

function quad(f, a, b, tol = 1e-10, depth = 22) {
  if (!(b > a)) return 0;
  const fa = f(a), fb = f(b), m = (a + b) / 2, fm = f(m);
  const S = (b - a) * (fa + 4 * fm + fb) / 6;
  function rec(a, b, fa, fm, fb, S, tol, depth) {
    quadratureCalls++;
    const m = (a + b) / 2, l = (a + m) / 2, r = (m + b) / 2;
    const fl = f(l), fr = f(r);
    const left = (m - a) * (fa + 4 * fl + fm) / 6;
    const right = (b - m) * (fm + 4 * fr + fb) / 6;
    const err = left + right - S;
    if (Math.abs(err) <= 15 * tol) return left + right + err / 15;
    if (depth <= 0) throw new Error(`quadrature depth exhausted on [${a},${b}], error ${err}`);
    return rec(a, m, fa, fl, fm, left, tol / 2, depth - 1)
      + rec(m, b, fm, fr, fb, right, tol / 2, depth - 1);
  }
  return rec(a, b, fa, fm, fb, S, tol, depth);
}
const spatial = (r, rho) => r / (r * r + rho * rho) ** 1.5;
const window = (g, h) => Math.max(0, 1 - Math.abs(g) / h) / h;
function windowCDF(g, h) {
  if (g <= -h) return 0;
  if (g >= h) return 1;
  if (g < 0) return (g + h) ** 2 / (2 * h * h);
  return 1 - (h - g) ** 2 / (2 * h * h);
}
function realQuadratic(a, b, c) {
  if (Math.abs(a) < 1e-30) return Math.abs(b) < 1e-30 ? [] : [-c / b];
  const d = b * b - 4 * a * c;
  if (d < 0) return [];
  if (d === 0) return [-b / (2 * a)];
  const q = -0.5 * (b + Math.sign(b || 1) * Math.sqrt(d));
  return [q / a, c / q];
}

class History {
  constructor(t, x, v) {
    this.nodes = [{t, x, v}]; this.segments = [];
    this.sectors = {P: [], Q: [], X: []};
    this.tailTime = t; this.tailX = x;
  }
  eval(t) {
    if (t <= this.tailTime) return this.tailX;
    const last = this.nodes.at(-1);
    if (t >= last.t) return last.x;
    let lo = 0, hi = this.segments.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.segments[mid].t1 < t) lo = mid + 1; else hi = mid;
    }
    const p = this.segments[lo], u = (t - p.t0) / p.dt;
    return ((p.a * u + p.b) * u + p.c) * u + p.d;
  }
  clock(t, name) { const x = this.eval(t); return name === 'X' ? x : t + (name === 'P' ? x : -x); }
  append(t, x, v) {
    const n = this.nodes.at(-1), dt = t - n.t;
    assert(dt > 0);
    const p = {t0: n.t, t1: t, dt, a: 2 * (n.x - x) + dt * (n.v + v),
      b: 3 * (x - n.x) - dt * (2 * n.v + v), c: dt * n.v, d: n.x};
    this.segments.push(p); this.nodes.push({t, x, v});
    const at = u => ((p.a * u + p.b) * u + p.c) * u + p.d;
    for (const name of ['P', 'Q', 'X']) {
      const sign = name === 'Q' ? -1 : 1;
      const offset = name === 'X' ? 0 : dt;
      const roots = realQuadratic(3 * sign * p.a, 2 * sign * p.b, sign * p.c + offset)
        .filter(u => u > 0 && u < 1);
      const cuts = [0, ...roots.sort((a, b) => a - b), 1];
      for (let j = 0; j + 1 < cuts.length; j++) {
        const u0 = cuts[j], u1 = cuts[j + 1];
        if (u1 - u0 < 1e-15) continue;
        const ta = n.t + dt * u0, tb = n.t + dt * u1;
        const ca = name === 'X' ? at(u0) : ta + sign * at(u0);
        const cb = name === 'X' ? at(u1) : tb + sign * at(u1);
        const direction = Math.sign(cb - ca);
        const list = this.sectors[name], old = list.at(-1);
        if (old && old.direction === direction && Math.abs(old.b - ta) < 1e-12) {
          old.b = tb; old.fb = cb;
        } else list.push({a: ta, b: tb, fa: ca, fb: cb, direction});
      }
    }
  }
  trial(t, x, v, fn) {
    if (t === this.nodes.at(-1).t) return fn();
    const saved = Object.fromEntries(Object.entries(this.sectors).map(([k, a]) =>
      [k, {length: a.length, last: a.length ? {...a.at(-1)} : null}]));
    this.append(t, x, v);
    try { return fn(); } finally {
      this.nodes.pop(); this.segments.pop();
      for (const [k, s] of Object.entries(saved)) {
        this.sectors[k].length = s.length;
        if (s.length) this.sectors[k][s.length - 1] = s.last;
      }
    }
  }
  inverse(sector, value, name) {
    if (value === sector.fa) return sector.a;
    if (value === sector.fb) return sector.b;
    let a = sector.a, b = sector.b;
    for (let k = 0; k < 52; k++) {
      const m = (a + b) / 2;
      if (m === a || m === b) break;
      if ((this.clock(m, name) < value) === (sector.direction > 0)) a = m; else b = m;
    }
    return (a + b) / 2;
  }
  bands(name, target, width) {
    const intervals = [], centers = [];
    for (const s of this.sectors[name]) {
      const low = Math.min(s.fa, s.fb), high = Math.max(s.fa, s.fb);
      if (high < target - width || low > target + width) continue;
      if (!s.direction) {
        if (Math.abs(s.fa - target) <= width) intervals.push([s.a, s.b]);
        continue;
      }
      const vl = Math.max(low, target - width), vh = Math.min(high, target + width);
      const p = this.inverse(s, vl, name), q = this.inverse(s, vh, name);
      intervals.push([Math.min(p, q), Math.max(p, q)]);
      if (target >= low && target <= high) centers.push(this.inverse(s, target, name));
    }
    return {intervals, centers};
  }
}

function acceleration(history, t, x, h, rho, tol = 1e-8) {
  // Every admissible reception band lies in one of these four clock bands.
  const intervals = [], extra = [];
  for (const clock of ['P', 'Q']) for (const target of [t + x, t - x]) {
    const r = history.bands(clock, target, h);
    intervals.push(...r.intervals); extra.push(...r.centers);
  }
  // Split at every possible absolute-value corner as well.
  for (const value of [x, -x]) extra.push(...history.bands('X', value, 0).centers);
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [a, b] of intervals) {
    if (!(b > a)) continue;
    if (merged.length && a <= merged.at(-1)[1] + 1e-14) merged.at(-1)[1] = Math.max(b, merged.at(-1)[1]);
    else merged.push([a, b]);
  }
  const tailAge = t - history.tailTime;
  let self = spatial(x - history.tailX, rho) * windowCDF(Math.abs(x - history.tailX) - tailAge, h);
  let partner = -spatial(x + history.tailX, rho) * windowCDF(Math.abs(x + history.tailX) - tailAge, h);
  let pieces = 0;
  for (const [a, b] of merged) {
    const cuts = [a, ...extra.filter(s => s > a + 1e-14 && s < b - 1e-14).sort((a, b) => a - b), b];
    for (let j = 0; j + 1 < cuts.length; j++) {
      const l = cuts[j], r = cuts[j + 1];
      if (r - l < 1e-15) continue;
      pieces++;
      const localTol = tol * (r - l) / Math.max(t - history.tailTime, h);
      self += quad(s => { kernelCalls++; const d = x - history.eval(s); return spatial(d, rho) * window(Math.abs(d) - (t - s), h); }, l, r, localTol);
      partner += quad(s => { kernelCalls++; const d = x + history.eval(s); return -spatial(d, rho) * window(Math.abs(d) - (t - s), h); }, l, r, localTol);
    }
  }
  return {a: self + partner, self, partner, pieces, sectors: Object.fromEntries(Object.entries(history.sectors).map(([k, v]) => [k, v.length]))};
}

function preparation(h, rho, tol) {
  const delta = 1 / 2048;
  const historyFor = A => {
    const hist = new History(-delta, 0.5, 0);
    hist.append(0, 0.5 - A * delta * delta / 6, -A * delta / 2);
    return hist;
  };
  let A = 1, defect = Infinity, iteration = 0;
  for (; iteration < 40; iteration++) {
    const next = -acceleration(historyFor(A), 0, 0.5 - A * delta * delta / 6, h, rho, tol).a;
    defect = Math.abs(next - A);
    A = next;
    if (defect < 1e-12) break;
  }
  assert(defect < 1e-10 && A > 0 && A < 2);
  const history = historyFor(A);
  return {history, A, delta, fixedPointDefect: defect, iteration};
}

function controls() {
  const checks = [];
  function check(name, actual, expected, tol) {
    assert(Math.abs(actual - expected) <= tol, `${name}: ${actual} vs ${expected}`);
    checks.push({name, actual, expected, absError: Math.abs(actual - expected), tolerance: tol});
  }
  check('Simpson exact constant', quad(() => 3, -2, 4), 18, 1e-13);
  check('Simpson nontrivial polynomial', quad(x => x ** 6, 0, 1, 1e-12), 1 / 7, 2e-12);
  check('quadratic roots positive', realQuadratic(1, -3, 2).sort()[0], 1, 1e-14);
  const cubic = new History(-1, 1, 1); // x=t^3-2t on [-1,1]
  cubic.append(1, -1, 1);
  check('Hermite cubic middle', cubic.eval(0.25), 0.25 ** 3 - 0.5, 1e-14);
  assert.equal(cubic.sectors.P.length, 3);
  assert.equal(cubic.sectors.Q.length, 1);
  const roots = cubic.bands('P', 0, 0).centers.sort((a, b) => a - b);
  check('three-root clock first', roots[0], -1, 1e-12);
  check('three-root clock middle', roots[1], 0, 1e-12);
  check('three-root clock last', roots[2], 1, 1e-12);
  const flat = new History(-1, -1, 1); flat.append(0, 0, 1);
  assert.deepEqual(flat.bands('Q', 0, 0.1).intervals, [[-1, 0]]);
  for (const h of [1/16, 1/32]) for (const rho of [1/32, 1/64]) {
    check(`window positive half ${h}`, windowCDF(h / 2, h), 7 / 8, 1e-14);
    check(`window negative half ${h}`, windowCDF(-h / 2, h), 1 / 8, 1e-14);
    for (const r of [h / 2, 1]) {
      const W = r === 1 ? 1 : 7 / 8;
      check(`stationary integrated h${h} rho${rho} r${r}`,
        quad(u => spatial(r, rho) * window(r - u, h), 0, r, 1e-10)
          + quad(u => spatial(r, rho) * window(r - u, h), r, r + h, 1e-10),
        spatial(r, rho) * W, 3e-9);
    }
    for (const b of [-2, -1, -0.3, 0.3, 1, 2]) {
      const q = Math.abs(b);
      let result, expected;
      if (q === 1) {
        result = quad(z => z === 1 ? b / h : spatial(b * z / (1-z), rho) / (h * (1-z) ** 2), 0, 1, 1e-9);
        expected = b / (h * rho);
      } else {
        const bound = h / Math.abs(1-q), z = q * bound / rho;
        result = quad(u => spatial(b*u, rho) * window((q-1)*u, h), 0, bound, 1e-9);
        expected = Math.sign(b) / (h * q * rho) * (1-Math.asinh(z)/z);
      }
      check(`affine self h${h} rho${rho} b${b}`, result, expected, 2e-8);
    }
    // Full-history band assembly on the stationary mirror preparation.
    const still = new History(-0.2, 0.5, 0); still.append(0, 0.5, 0);
    check(`complete stationary band h${h} rho${rho}`, acceleration(still, 0, 0.5, h, rho, 1e-9).a,
      -((1 + rho*rho) ** -1.5), 2e-9);
    // Complete affine recent segment plus stationary tail: exact band assembly,
    // including the characteristic flat clock at unit speed and old tail at b=2.
    for (const b of [0.3, 1, 2]) {
      const affine = new History(-1, -b, b); affine.append(0, 0, b);
      let expected;
      if (b === 1) expected = 2/(h*rho) - 2/(h*Math.sqrt(1+rho*rho)) + spatial(1,rho);
      else {
        const z = b*h/(rho*Math.abs(1-b));
        expected = 2/(h*b*rho)*(1-Math.asinh(z)/z) + (b === 2 ? 2*spatial(2,rho) : 0);
      }
      check(`complete affine bands h${h} rho${rho} b${b}`,
        acceleration(affine,0,0,h,rho,1e-9).a, expected, 3e-8);
    }
  }
  return {status: 'known-controls-pass', checks};
}

function target() {
  if (!args.admitted) throw new Error('Target requires explicit reviewed --admitted flag.');
  const h = Number(args.h), rho = Number(args.rho), dt = Number(args.dt), end = Number(args.end);
  const tol = Number(args.tol ?? 1e-8);
  assert([1/16,1/32].includes(h) && [1/32,1/64].includes(rho));
  assert(dt > 0 && end > 0 && typeof args.out === 'string');
  const prep = preparation(h, rho, tol), hist = prep.history;
  let {x, v} = hist.nodes.at(-1), t = 0;
  const rows = [], events = [];
  let acc = acceleration(hist, t, x, h, rho, tol), nextBeat = 0, contact = false, reason = 'finite-horizon';
  rows.push([t, x, v, acc.a, acc.self, acc.partner]);
  const evalStage = (ts, xs, vs) => hist.trial(ts, xs, vs, () => acceleration(hist, ts, xs, h, rho, tol).a);
  for (let step = 0; t < end; step++) {
    const d = Math.min(dt, end-t), old = {t,x,v};
    const a1 = acc.a;
    const x2 = x+d*v/2, v2 = v+d*a1/2, a2 = evalStage(t+d/2,x2,v2);
    const x3 = x+d*v2/2, v3 = v+d*a2/2, a3 = evalStage(t+d/2,x3,v3);
    const x4 = x+d*v3, v4 = v+d*a3, a4 = evalStage(t+d,x4,v4);
    x += d*(v+2*v2+2*v3+v4)/6;
    v += d*(a1+2*a2+2*a3+a4)/6;
    t += d; hist.append(t,x,v);
    acc = acceleration(hist,t,x,h,rho,tol);
    rows.push([t,x,v,acc.a,acc.self,acc.partner]);
    for (const level of [-1,1]) if ((old.v-level)*(v-level)<0)
      events.push({kind:'unit-speed',level,bracket:[old.t,t],xBracket:[old.x,x],vBracket:[old.v,v]});
    if (old.x > 0 && x <= 0) { contact=true; events.push({kind:'first-contact',bracket:[old.t,t],vBracket:[old.v,v]}); }
    if (contact && old.v < 0 && v >= 0) { events.push({kind:'first-postcontact-turn',bracket:[old.t,t],xBracket:[old.x,x]}); reason='first-postcontact-turn'; break; }
    if (!Number.isFinite(x+v+acc.a)) throw new Error('nonfinite state');
    const wall = (performance.now()-wall0)/1000;
    if (wall >= nextBeat) {
      process.stdout.write(JSON.stringify({kind:'heartbeat',wallSeconds:wall,step,t,x,v,a:acc.a,contact,sectors:acc.sectors,kernelCalls})+'\n');
      nextBeat = wall+15;
    }
  }
  fs.mkdirSync(args.out,{recursive:true});
  const historyPath=path.join(args.out,'history.json.gz');
  fs.writeFileSync(historyPath,zlib.gzipSync(JSON.stringify({columns:['t','x','v','a','self','partner'],rows})));
  return {status:'measured-comparison-only',reason,h,rho,dt,tolerance:tol,end:t,
    completePast:{kind:'compatible-cubic-ramp-stationary-tail',delta:prep.delta,A:prep.A,fixedPointDefect:prep.fixedPointDefect},
    events,last:rows.at(-1),historyPath,sectors:acc.sectors,rows:rows.length};
}

let result;
try {
  result = mode === 'controls' ? controls() : mode === 'target' ? target() : (() => {throw new Error('unknown mode');})();
} catch (e) {
  result = {status:'failed',error:e.stack}; process.exitCode=1;
}
result = {started,finished:new Date().toISOString(),scriptHash,mode,...result,
  wallSeconds:(performance.now()-wall0)/1000,cpu:process.cpuUsage(cpu0),memory:process.memoryUsage(),quadratureCalls,kernelCalls};
if (args.out) { fs.mkdirSync(args.out,{recursive:true}); fs.writeFileSync(path.join(args.out,'receipt.json'),JSON.stringify(result,null,2)+'\n'); }
process.stdout.write(JSON.stringify(result,null,2)+'\n');
