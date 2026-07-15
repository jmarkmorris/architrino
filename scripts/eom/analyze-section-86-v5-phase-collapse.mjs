import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const SCHEMA = 'section_86_v5_phase_collapse_summary.v1';
export const PATH_IDS = ['I+', 'I-', 'M+', 'M-', 'O+', 'O-'];

function option(name, fallback = '') {
  const prefix = `--${name}=`;
  const argument = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : fallback;
}

function parseCsv(text, source = 'CSV') {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) throw new Error(`${source} has no data rows`);
  const header = lines.shift().split(',');
  return lines.map((line) => Object.fromEntries(
    line.split(',').map((value, index) => [header[index], value]),
  ));
}

export function parseClearanceLog(text, source = 'log') {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('perturbed step=') || !line.includes(' status=accepted')) continue;
    const field = (name) => {
      const match = line.match(new RegExp(`(?:^| )${name}=([^ ]*)`));
      return match?.[1] ?? '';
    };
    const lower = Number(field('history_window_active_lower'));
    const time = Number(field('accepted_time'));
    const uncertified = Number(field('uncertified_root_rows'));
    if (!Number.isFinite(lower) || !Number.isFinite(time) || !Number.isFinite(uncertified)) {
      throw new Error(`${source} has an incomplete accepted-step root row`);
    }
    rows.push({ time, active_search_lower: lower, uncertified_root_rows: uncertified });
  }
  if (rows.length === 0) throw new Error(`${source} has no accepted-step root rows`);
  let clearanceIndex = -1;
  for (let index = 0; index < rows.length; index += 1) {
    const suffix = rows.slice(index);
    if (suffix.every((row) => (
      row.uncertified_root_rows === 0 && row.active_search_lower >= 0
    ))) {
      clearanceIndex = index;
      break;
    }
  }
  return {
    rows,
    certified: clearanceIndex >= 0,
    clearance_time: clearanceIndex >= 0 ? rows[clearanceIndex].time : null,
    minimum_post_clearance_lower: clearanceIndex >= 0
      ? Math.min(...rows.slice(clearanceIndex).map((row) => row.active_search_lower))
      : null,
  };
}

export function readStateCsv(text, source = 'state CSV') {
  const rows = parseCsv(text, source);
  const grouped = new Map();
  for (const row of rows) {
    const time = Number(row.time);
    if (!Number.isFinite(time) || !PATH_IDS.includes(row.path_id)) {
      throw new Error(`${source} has an invalid time or path id`);
    }
    if (!grouped.has(time)) grouped.set(time, new Map());
    const state = {};
    for (const key of [
      'x', 'y', 'z', 'vx', 'vy', 'vz',
      'x_radius', 'y_radius', 'z_radius',
      'vx_radius', 'vy_radius', 'vz_radius',
    ]) {
      state[key] = Number(row[key]);
      if (!Number.isFinite(state[key])) throw new Error(`${source} has invalid ${key}`);
    }
    grouped.get(time).set(row.path_id, state);
  }
  const samples = [...grouped.entries()].sort(([left], [right]) => left - right)
    .map(([time, states]) => {
      if (states.size !== PATH_IDS.length || PATH_IDS.some((id) => !states.has(id))) {
        throw new Error(`${source} time ${time} lacks the six V5 paths`);
      }
      return { time, states };
    });
  if (samples.length < 2) throw new Error(`${source} needs at least two complete steps`);
  return samples;
}

function unwrapPhase(samples) {
  let prior = null;
  let phase = 0;
  return samples.map((sample) => {
    const plus = sample.states.get('M+');
    const minus = sample.states.get('M-');
    const raw = Math.atan2(plus.y - minus.y, plus.x - minus.x);
    if (prior === null) {
      phase = raw;
    } else {
      let delta = raw - prior;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      while (delta < -Math.PI) delta += 2 * Math.PI;
      phase += delta;
    }
    prior = raw;
    return { ...sample, phase };
  });
}

function monotonePhaseBranch(samples, clearanceTime, source) {
  const cleared = unwrapPhase(samples.filter((sample) => sample.time >= clearanceTime - 1e-12));
  if (cleared.length < 2) throw new Error(`${source} has fewer than two post-clearance states`);
  const direction = Math.sign(cleared.at(-1).phase - cleared[0].phase);
  if (direction === 0) throw new Error(`${source} has no post-clearance phase span`);
  for (let index = 1; index < cleared.length; index += 1) {
    if (direction * (cleared[index].phase - cleared[index - 1].phase) <= 0) {
      throw new Error(`${source} middle-layer phase is not monotone after clearance`);
    }
  }
  return direction > 0 ? cleared : [...cleared].reverse();
}

function interpolate(left, right, fraction, key) {
  return left[key] + fraction * (right[key] - left[key]);
}

function stateAtPhase(branch, phase) {
  let upper = 1;
  while (upper < branch.length && branch[upper].phase < phase) upper += 1;
  if (upper >= branch.length) upper = branch.length - 1;
  const left = branch[upper - 1];
  const right = branch[upper];
  const fraction = (phase - left.phase) / (right.phase - left.phase);
  return interpolateState(left, right, fraction, phase);
}

function interpolateState(left, right, fraction, phase) {
  const states = new Map();
  for (const id of PATH_IDS) {
    const state = {};
    for (const key of [
      'x', 'y', 'z', 'vx', 'vy', 'vz',
      'x_radius', 'y_radius', 'z_radius',
      'vx_radius', 'vy_radius', 'vz_radius',
    ]) {
      state[key] = interpolate(left.states.get(id), right.states.get(id), fraction, key);
    }
    states.set(id, state);
  }
  return { time: interpolate(left, right, fraction, 'time'), phase, states };
}

function stateAtTime(samples, time) {
  let upper = 1;
  while (upper < samples.length && samples[upper].time < time) upper += 1;
  if (upper >= samples.length) upper = samples.length - 1;
  const left = samples[upper - 1];
  const right = samples[upper];
  const fraction = (time - left.time) / (right.time - left.time);
  return interpolateState(
    left, right, fraction, interpolate(left, right, fraction, 'phase'),
  );
}

function quotientState(sample) {
  const positionMean = [0, 0, 0];
  const velocityMean = [0, 0, 0];
  for (const state of sample.states.values()) {
    positionMean[0] += state.x / PATH_IDS.length;
    positionMean[1] += state.y / PATH_IDS.length;
    positionMean[2] += state.z / PATH_IDS.length;
    velocityMean[0] += state.vx / PATH_IDS.length;
    velocityMean[1] += state.vy / PATH_IDS.length;
    velocityMean[2] += state.vz / PATH_IDS.length;
  }
  const cosine = Math.cos(sample.phase);
  const sine = Math.sin(sample.phase);
  const rotate = (x, y, z) => [cosine * x + sine * y, -sine * x + cosine * y, z];
  const position = [];
  const velocity = [];
  let maximumPositionRadius = 0;
  let maximumVelocityRadius = 0;
  for (const id of PATH_IDS) {
    const state = sample.states.get(id);
    position.push(...rotate(
      state.x - positionMean[0], state.y - positionMean[1], state.z - positionMean[2],
    ));
    velocity.push(...rotate(
      state.vx - velocityMean[0], state.vy - velocityMean[1], state.vz - velocityMean[2],
    ));
    maximumPositionRadius = Math.max(
      maximumPositionRadius, state.x_radius, state.y_radius, state.z_radius,
    );
    maximumVelocityRadius = Math.max(
      maximumVelocityRadius, state.vx_radius, state.vy_radius, state.vz_radius,
    );
  }
  return { position, velocity, maximumPositionRadius, maximumVelocityRadius };
}

function rmsDistance(left, right) {
  return Math.sqrt(left.reduce(
    (sum, value, index) => sum + (value - right[index]) ** 2, 0,
  ) / PATH_IDS.length);
}

function pairDistances(states, seedIds) {
  const rows = [];
  for (let leftIndex = 0; leftIndex < seedIds.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < seedIds.length; rightIndex += 1) {
      const leftId = seedIds[leftIndex];
      const rightId = seedIds[rightIndex];
      rows.push({
        pair: `${leftId}:${rightId}`,
        position: rmsDistance(states[leftId].position, states[rightId].position),
        velocity: rmsDistance(states[leftId].velocity, states[rightId].velocity),
      });
    }
  }
  return rows;
}

function metrics(values) {
  return {
    start: values[0],
    end: values.at(-1),
    maximum: Math.max(...values),
    rms: Math.sqrt(values.reduce((sum, value) => sum + value ** 2, 0) / values.length),
    end_over_start: values[0] > 0 ? values.at(-1) / values[0] : null,
  };
}

export function analyzeCampaign({
  cases, baselineIds, refinementId, refinementBaseId = 'radial_out',
  baselineHistoryDepth = 8, phaseRows = 201, temporalRows = 201,
}) {
  if (baselineIds.length < 3) throw new Error('at least three baseline seeds are required');
  const ids = [...baselineIds, refinementId];
  if (!baselineIds.includes(refinementBaseId)) {
    throw new Error(`refinement base ${refinementBaseId} is not a baseline seed`);
  }
  for (const id of ids) {
    if (!cases[id]) throw new Error(`missing case ${id}`);
    if (!cases[id].clearance.certified) throw new Error(`${id} lacks certified seed clearance`);
  }
  const branches = Object.fromEntries(ids.map((id) => [id, monotonePhaseBranch(
    cases[id].samples, cases[id].clearance.clearance_time, id,
  )]));
  const temporalSeries = Object.fromEntries(baselineIds.map((id) => [
    id,
    unwrapPhase(cases[id].samples.filter(
      (sample) => sample.time >= cases[id].clearance.clearance_time - 1e-12,
    )),
  ]));
  const phaseStart = Math.max(...ids.map((id) => branches[id][0].phase));
  const phaseEnd = Math.min(...ids.map((id) => branches[id].at(-1).phase));
  if (!(phaseEnd > phaseStart)) throw new Error('cleared cases have no common phase branch');

  const rows = [];
  for (let index = 0; index < phaseRows; index += 1) {
    const phase = phaseStart + (phaseEnd - phaseStart) * index / (phaseRows - 1);
    const states = Object.fromEntries(ids.map((id) => [
      id, quotientState(stateAtPhase(branches[id], phase)),
    ]));
    const baselinePairs = pairDistances(states, baselineIds);
    const refinement = pairDistances(states, [refinementBaseId, refinementId])[0];
    rows.push({
      phase,
      states,
      baseline_position_diameter: Math.max(...baselinePairs.map((row) => row.position)),
      baseline_velocity_diameter: Math.max(...baselinePairs.map((row) => row.velocity)),
      refinement_position_distance: refinement.position,
      refinement_velocity_distance: refinement.velocity,
      baselinePairs,
    });
  }
  const commonTimeStart = Math.max(
    ...baselineIds.map((id) => temporalSeries[id][0].time),
  );
  const commonTimeEnd = Math.min(
    ...baselineIds.map((id) => temporalSeries[id].at(-1).time),
  );
  if (!(commonTimeEnd > commonTimeStart)) {
    throw new Error('cleared baseline cases have no common synchronized-time interval');
  }
  const synchronizedRows = [];
  for (let index = 0; index < temporalRows; index += 1) {
    const time = commonTimeStart
      + (commonTimeEnd - commonTimeStart) * index / (temporalRows - 1);
    const states = Object.fromEntries(baselineIds.map((id) => [
      id, quotientState(stateAtTime(temporalSeries[id], time)),
    ]));
    const baselinePairs = pairDistances(states, baselineIds);
    synchronizedRows.push({
      time,
      t_over_h: time / baselineHistoryDepth,
      baseline_position_diameter: Math.max(...baselinePairs.map((row) => row.position)),
      baseline_velocity_diameter: Math.max(...baselinePairs.map((row) => row.velocity)),
      baselinePairs,
    });
  }
  const refinementPositionEnvelope = Math.max(...rows.map((row) => row.refinement_position_distance));
  const refinementVelocityEnvelope = Math.max(...rows.map((row) => row.refinement_velocity_distance));
  const result = {
    schema: SCHEMA,
    phase_branch: [phaseStart, phaseEnd],
    phase_rows: rows.length,
    clearance: Object.fromEntries(ids.map((id) => [id, cases[id].clearance])),
    baseline_position_diameter: metrics(rows.map((row) => row.baseline_position_diameter)),
    baseline_velocity_diameter: metrics(rows.map((row) => row.baseline_velocity_diameter)),
    refinement_position_distance: metrics(rows.map((row) => row.refinement_position_distance)),
    refinement_velocity_distance: metrics(rows.map((row) => row.refinement_velocity_distance)),
    refinement_envelope: {
      position: refinementPositionEnvelope,
      velocity: refinementVelocityEnvelope,
    },
    synchronized_time_diagnostic: {
      common_time: [commonTimeStart, commonTimeEnd],
      history_depth: baselineHistoryDepth,
      position_diameter: metrics(
        synchronizedRows.map((row) => row.baseline_position_diameter),
      ),
      velocity_diameter: metrics(
        synchronizedRows.map((row) => row.baseline_velocity_diameter),
      ),
      verdict_role: 'diagnostic_only_not_a_collapse_criterion',
    },
    baseline_within_refinement_envelope_at_all_phase_rows: rows.every((row) => (
      row.baseline_position_diameter <= refinementPositionEnvelope
      && row.baseline_velocity_diameter <= refinementVelocityEnvelope
    )),
    maximum_input_interval_radius: {
      position: Math.max(...rows.flatMap((row) => ids.map(
        (id) => row.states[id].maximumPositionRadius,
      ))),
      velocity: Math.max(...rows.flatMap((row) => ids.map(
        (id) => row.states[id].maximumVelocityRadius,
      ))),
    },
  };
  return { result, rows, synchronizedRows };
}

function loadCase(campaignDir, id) {
  const logPath = path.join(campaignDir, `${id}.log`);
  const statePath = path.join(campaignDir, `${id}-states.csv`);
  return {
    clearance: parseClearanceLog(fs.readFileSync(logPath, 'utf8'), logPath),
    samples: readStateCsv(fs.readFileSync(statePath, 'utf8'), statePath),
  };
}

function writeRows(output, rows) {
  const pairNames = rows[0].baselinePairs.map((row) => row.pair);
  const header = [
    'phase', 'baseline_position_diameter', 'baseline_velocity_diameter',
    'refinement_position_distance', 'refinement_velocity_distance',
    ...pairNames.flatMap((name) => [`${name}_position`, `${name}_velocity`]),
  ];
  const lines = [header.join(',')];
  for (const row of rows) {
    const pairs = Object.fromEntries(row.baselinePairs.map((pair) => [pair.pair, pair]));
    lines.push([
      row.phase, row.baseline_position_diameter, row.baseline_velocity_diameter,
      row.refinement_position_distance, row.refinement_velocity_distance,
      ...pairNames.flatMap((name) => [pairs[name].position, pairs[name].velocity]),
    ].join(','));
  }
  fs.writeFileSync(output, `${lines.join('\n')}\n`);
}

function writeSynchronizedRows(output, rows) {
  const pairNames = rows[0].baselinePairs.map((row) => row.pair);
  const header = [
    'time', 't_over_h', 'baseline_position_diameter',
    'baseline_velocity_diameter',
    ...pairNames.flatMap((name) => [`${name}_position`, `${name}_velocity`]),
  ];
  const lines = [header.join(',')];
  for (const row of rows) {
    const pairs = Object.fromEntries(row.baselinePairs.map((pair) => [pair.pair, pair]));
    lines.push([
      row.time, row.t_over_h, row.baseline_position_diameter,
      row.baseline_velocity_diameter,
      ...pairNames.flatMap((name) => [pairs[name].position, pairs[name].velocity]),
    ].join(','));
  }
  fs.writeFileSync(output, `${lines.join('\n')}\n`);
}

export function main() {
  const campaignDir = option('campaign-dir');
  const output = option('output');
  const phaseOutput = option('phase-output');
  const temporalOutput = option('temporal-output');
  const baselineIds = option(
    'baseline-seeds', 'circular,radial_out,tilt_io,radial_in_small',
  ).split(',').map((value) => value.trim()).filter(Boolean);
  const refinementId = option('refinement-seed', 'radial_out_refined');
  const refinementBaseId = option('refinement-base', 'radial_out');
  const baselineHistoryDepth = Number(option('baseline-history-depth', '8'));
  if (!campaignDir || !output || !phaseOutput || !temporalOutput) {
    throw new Error(
      'usage: --campaign-dir=PATH --output=SUMMARY.json '
      + '--phase-output=ROWS.csv --temporal-output=ROWS.csv',
    );
  }
  const cases = Object.fromEntries(
    [...baselineIds, refinementId].map((id) => [id, loadCase(campaignDir, id)]),
  );
  const { result, rows, synchronizedRows } = analyzeCampaign({
    cases, baselineIds, refinementId, refinementBaseId, baselineHistoryDepth,
  });
  fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
  writeRows(phaseOutput, rows);
  writeSynchronizedRows(temporalOutput, synchronizedRows);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
