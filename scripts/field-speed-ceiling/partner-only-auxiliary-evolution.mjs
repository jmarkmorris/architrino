#!/usr/bin/env node
// Explicit-use FSC diagnostic, not the EOM solver or a sharp-law event rule.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(import.meta.url);
const sourceSha256 = createHash('sha256').update(readFileSync(sourcePath)).digest('hex');
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [key, ...value] = a.replace(/^--/, '').split('=');
  return [key, value.length ? value.join('=') : true];
}));
const output = resolve(args.output ?? '.local-data/field-speed-ceiling/partner-only-auxiliary.json');
const nodes = [-0.8611363115940526, -0.3399810435848563, 0.3399810435848563, 0.8611363115940526];
const weights = [0.3478548451374538, 0.6521451548625461, 0.6521451548625461, 0.3478548451374538];
const gaussian0 = 1 / Math.sqrt(2 * Math.PI);
const clamp = v => Math.max(-1, Math.min(1, v));
const started = performance.now();
const deadlineSeconds = Number(args.deadline ?? 50);
function deadline() {
  if ((performance.now() - started) / 1000 > deadlineSeconds) throw new Error('Bounded diagnostic deadline reached');
}
function save(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

// Fixed-memory source quadrature. There is no self-channel call.
function acceleration(t, x, history, { K, eta, core, horizon, quadSpacing, profile }) {
  if (K === 0) return 0;
  const panels = Math.ceil(horizon / quadSpacing);
  const width = horizon / panels;
  let sum = 0;
  for (let j = 0; j < panels; j++) {
    const mid = t - horizon + (j + 0.5) * width;
    for (let k = 0; k < 4; k++) {
      const s = mid + 0.5 * width * nodes[k];
      const displacement = x + history(s); // partner position is -x(s)
      const gap = Math.abs(displacement) - (t - s);
      const z = gap / eta;
      // Gaussian discarded tails have a reported analytical envelope.
      if (Math.abs(z) > 10) continue;
      const delta = gaussian0 * Math.exp(-0.5 * z * z) / eta * (profile === 'hollow' ? z * z : 1);
      const r2 = displacement * displacement + core * core;
      sum += weights[k] * displacement / (r2 * Math.sqrt(r2)) * delta;
    }
  }
  return -K * 0.5 * width * sum;
}

function step(t, x, v, dt, evaluate) {
  const a0 = evaluate(t, x, null);
  const vp = clamp(v + dt * a0);
  const xp = x + 0.5 * dt * (v + vp);
  const a1 = evaluate(t + dt, xp, { t0: t, x0: x, t1: t + dt, x1: xp });
  const nextV = clamp(v + 0.5 * dt * (a0 + a1));
  return { x: x + 0.5 * dt * (v + nextV), v: nextV, a0, a1 };
}

function verify() {
  const checks = [];
  // Independent exact polynomial quadrature case, before target histories.
  let integral = 0;
  for (let k = 0; k < 4; k++) integral += weights[k] * (nodes[k] ** 6 + 2);
  assert.ok(Math.abs(integral - (2 / 7 + 4)) < 1e-13);
  checks.push({ name: 'Gauss polynomial degree six', actual: integral, expected: 2 / 7 + 4 });

  const p = { K: 1, eta: 0.04, core: 0.05, horizon: 1, quadSpacing: 0.005, profile: 'gaussian' };
  const expected = p.K * gaussian0 / p.eta * (1 / p.core - 1 / Math.sqrt(p.horizon ** 2 + p.core ** 2));
  const actual = acceleration(0, 0, s => s, p);
  assert.ok(Math.abs(actual - expected) / expected < 1e-8);
  checks.push({ name: 'Partner incidence exact antiderivative', actual, expected, relativeError: Math.abs(actual - expected) / expected });
  const hollow = acceleration(0, 0, s => s, { ...p, profile: 'hollow' });
  assert.ok(hollow === 0);
  checks.push({ name: 'Hollow profile exact incidence zero', actual: hollow, expected: 0 });

  // Static source, separated ordinary root: narrow delta must recover softened row.
  const ordinaryP = { ...p, eta: 0.0005, quadSpacing: 0.00025 };
  const ordinary = acceleration(0, 0.4, () => 0, ordinaryP);
  const ordinaryExpected = -0.4 / (0.16 + p.core ** 2) ** 1.5;
  assert.ok(Math.abs(ordinary - ordinaryExpected) < 1e-9);
  checks.push({ name: 'Static separated source exact softened row', actual: ordinary, expected: ordinaryExpected });

  let x = 0, v = 1;
  for (let i = 0; i < 200; i++) ({ x, v } = step(i * 0.01, x, v, 0.01, () => -2));
  assert.ok(Math.abs(v + 1) < 1e-12 && Math.abs(x + 1) < 1e-11);
  checks.push({ name: 'Constant acceleration cap and reversal', actual: { x, v }, expected: { x: -1, v: -1 } });
  let freeX = 0, freeV = 0.7;
  for (let i = 0; i < 100; i++) ({ x: freeX, v: freeV } = step(i * 0.01, freeX, freeV, 0.01, () => 0));
  assert.ok(Math.abs(freeX - 0.7) < 1e-12 && freeV === 0.7);
  checks.push({ name: 'Zero ledger inertial motion', actual: { x: freeX, v: freeV }, expected: { x: 0.7, v: 0.7 } });
  const receipt = { schema: 'fsc-partner-auxiliary-known-cases/v1', createdAt: new Date().toISOString(), sourceSha256, passed: true, checks };
  save(output, receipt);
  console.log(JSON.stringify(receipt));
}

function evolve() {
  assert.ok(args.verification, 'Run --verify and supply its receipt before the target run');
  const known = JSON.parse(readFileSync(resolve(args.verification), 'utf8'));
  assert.ok(known.passed && known.sourceSha256 === sourceSha256, 'Known-case receipt must match this exact instrument');
  const eta = Number(args.eta ?? 0.04), core = Number(args.core ?? eta);
  const K = Number(args.K ?? 1), horizon = Number(args.horizon ?? 1), end = Number(args.end ?? 0.2);
  const dtRequested = Number(args.dt ?? Math.min(eta / 100, Math.sqrt(core ** 3 / K) / 32));
  const quadSpacing = Number(args.quad ?? Math.min(eta, core) / 4);
  const profile = args.profile ?? 'gaussian';
  for (const value of [eta, core, K, horizon, end, dtRequested, quadSpacing]) assert.ok(Number.isFinite(value) && value > 0);
  assert.ok(profile === 'gaussian' || profile === 'hollow');
  assert.ok(end < horizon / 2, 'Bound this diagnostic to end < horizon/2');
  const count = Math.ceil(end / dtRequested), dt = end / count;
  assert.ok(count <= 100000, 'Step-count bound exceeded');
  const X = new Float64Array(count + 1), V = new Float64Array(count + 1);
  V[0] = 1;
  const parameters = { K, eta, core, horizon, quadSpacing, profile };
  const events = [];
  let maxPosition = 0, minPosition = 0, maxRaw = 0, maxSpeed = 1;
  let nextHeartbeat = 5;
  for (let i = 0; i < count; i++) {
    const t = i * dt;
    const evaluate = (at, ax, extension) => {
      const history = s => {
        if (s <= 0) return s; // supplied incoming capped history
        if (s >= t) {
          if (!extension || s <= t) return X[i];
          return extension.x0 + (extension.x1 - extension.x0) * ((s - extension.t0) / dt);
        }
        const j = Math.min(i - 1, Math.floor(s / dt));
        const f = (s - j * dt) / dt;
        return X[j] + f * (X[j + 1] - X[j]);
      };
      return acceleration(at, ax, history, parameters);
    };
    const next = step(t, X[i], V[i], dt, evaluate);
    assert.ok(Number.isFinite(next.x) && Number.isFinite(next.v));
    X[i + 1] = next.x; V[i + 1] = next.v;
    maxPosition = Math.max(maxPosition, next.x); minPosition = Math.min(minPosition, next.x);
    maxSpeed = Math.max(maxSpeed, Math.abs(next.v)); maxRaw = Math.max(maxRaw, Math.abs(next.a0), Math.abs(next.a1));
    if (V[i] * next.v < 0 || (V[i] > 0 && next.v === 0)) {
      const f = Math.abs(V[i]) / (Math.abs(V[i]) + Math.abs(next.v));
      events.push({ type: 'velocity-zero', t: t + dt * f, x: X[i] + (next.x - X[i]) * f });
    }
    if (i > 0 && X[i] * next.x < 0) {
      const f = Math.abs(X[i]) / (Math.abs(X[i]) + Math.abs(next.x));
      events.push({ type: 'position-zero', t: t + dt * f, v: V[i] + (next.v - V[i]) * f });
    }
    if (i % 100 === 0) {
      deadline();
      const elapsed = (performance.now() - started) / 1000;
      if (elapsed >= nextHeartbeat) {
        console.error(JSON.stringify({ heartbeat: true, step: i, totalSteps: count, t, elapsedSeconds: elapsed }));
        nextHeartbeat = elapsed + 5;
      }
    }
  }
  const samples = [];
  for (let j = 0; j <= 200; j++) {
    const i = Math.round(j * count / 200);
    samples.push({ t: i * dt, x: X[i], v: V[i] });
  }
  const receipt = {
    schema: 'fsc-partner-auxiliary-evolution/v1', createdAt: new Date().toISOString(), sourceSha256,
    verificationReceipt: resolve(args.verification), method: 'projected Heun with trapezoidal position; linear stored-history interpolation; composite 4-point Gauss source quadrature',
    interpretation: 'Finite-memory smoothed partner-only diagnostic. Zero self response. Not a canonical sharp-law solution or event rule.',
    initialHistory: 'X_A(s)=s, X_B(s)=-s on [-horizon,0]; X_A(0)=0; V_A(0)=1; B is mirror constrained.',
    parameters: { ...parameters, cf: 1, end, dt, count, gaussianGapCutoff: 10 },
    tailAccelerationEnvelope: K * 0.385 / (core * core) * horizon * gaussian0 / eta * Math.exp(-50) * (profile === 'hollow' ? 100 : 1),
    summary: { finalX: X[count], finalV: V[count], maxPosition, minPosition, maxSpeed, maxRawAcceleration: maxRaw, velocityZeroCount: events.filter(e => e.type === 'velocity-zero').length, positionZeroCount: events.filter(e => e.type === 'position-zero').length },
    events, samples, wallSeconds: (performance.now() - started) / 1000,
  };
  save(output, receipt);
  console.log(JSON.stringify({ output, parameters: receipt.parameters, summary: receipt.summary, firstEvents: events.slice(0, 5), wallSeconds: receipt.wallSeconds }));
}

if (args.verify) verify();
else if (args.run) evolve();
else throw new Error('Use --verify or --run with --verification=<receipt>; optional --eta, --core, --dt, --quad, --profile, --output');
