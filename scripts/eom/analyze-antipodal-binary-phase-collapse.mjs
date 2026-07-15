import fs from 'node:fs';

function option(name, fallback = '') {
  const prefix = `--${name}=`;
  const argument = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : fallback;
}

const seeds = option(
  'seeds',
  'circular,log-spiral-in,log-spiral-out,perturbed',
).split(',').map((seed) => seed.trim()).filter(Boolean);
if (seeds.length < 2 || new Set(seeds).size !== seeds.length) {
  throw new Error('--seeds must name at least two distinct seed ids');
}

function readSamples(path) {
  const lines = fs.readFileSync(path, 'utf8').trim().split(/\r?\n/);
  const header = lines.shift().split(',');
  const index = Object.fromEntries(header.map((name, column) => [name, column]));
  for (const required of ['time', 'radius', 's']) {
    if (!(required in index)) throw new Error(`${path} lacks ${required}`);
  }
  return lines.map((line) => {
    const columns = line.split(',');
    return {
      time: Number(columns[index.time]),
      radius: Number(columns[index.radius]),
      s: Number(columns[index.s]),
    };
  });
}

function interpolate(samples, key, value, outputKey) {
  const upper = samples.findIndex((sample) => sample[key] >= value);
  if (upper < 0) throw new Error(`${key}=${value} lies after the sampled range`);
  if (upper === 0) return samples[0][outputKey];
  const left = samples[upper - 1];
  const right = samples[upper];
  const fraction = (value - left[key]) / (right[key] - left[key]);
  return left[outputKey] + fraction * (right[outputKey] - left[outputKey]);
}

const inputPrefix = option('input-prefix');
const inputSuffix = option('input-suffix', 't8');
const historyDepth = Number(option('history-depth', '4'));
const temporalOutput = option('temporal-output');
const phaseOutput = option('phase-output');
if (!inputPrefix || !temporalOutput || !phaseOutput || !(historyDepth > 0)) {
  throw new Error(
    'usage: --input-prefix=PATH --history-depth=H [--seeds=ID,ID,...] ' +
    '--temporal-output=PATH --phase-output=PATH',
  );
}

const histories = Object.fromEntries(seeds.map((seed) => [
  seed,
  readSamples(`${inputPrefix}-${seed}-${inputSuffix}.csv`),
]));
const endTime = Math.min(...seeds.map((seed) => histories[seed].at(-1).time));

const temporalRows = [];
for (let time = 0; time <= endTime + 1e-12; time += historyDepth / 4) {
  const points = Object.fromEntries(seeds.map((seed) => [seed, {
    radius: interpolate(histories[seed], 'time', time, 'radius'),
    s: interpolate(histories[seed], 'time', time, 's'),
  }]));
  const radii = seeds.map((seed) => points[seed].radius);
  const speeds = seeds.map((seed) => points[seed].s);
  const maximumSpeed = Math.max(...speeds);
  const speedSpread = maximumSpeed - Math.min(...speeds);
  temporalRows.push({
    time,
    t_over_h: time / historyDepth,
    radius_spread: Math.max(...radii) - Math.min(...radii),
    s_spread: speedSpread,
    relative_s_spread: speedSpread / maximumSpeed,
    points,
  });
}

const phaseBranchStart = {};
const postMemory = Object.fromEntries(seeds.map((seed) => {
  const samples = histories[seed].filter(
    (sample) => sample.time >= historyDepth - 1e-12,
  );
  let minimumIndex = 0;
  for (let index = 1; index < samples.length; index += 1) {
    if (samples[index].radius <= samples[minimumIndex].radius) {
      minimumIndex = index;
    }
  }
  phaseBranchStart[seed] = samples[minimumIndex].time;
  return [seed, samples.slice(minimumIndex)];
}));
for (const seed of seeds) {
  for (let index = 1; index < postMemory[seed].length; index += 1) {
    if (postMemory[seed][index].radius < postMemory[seed][index - 1].radius) {
      throw new Error(`${seed} radius is not monotone after one memory depth`);
    }
  }
}

const commonRadiusStart = Math.max(
  ...seeds.map((seed) => postMemory[seed][0].radius),
);
const commonRadiusEnd = Math.min(
  ...seeds.map((seed) => postMemory[seed].at(-1).radius),
);
const phaseRows = [];
for (let index = 0; index <= 100; index += 1) {
  const radius = commonRadiusStart +
    (commonRadiusEnd - commonRadiusStart) * index / 100;
  const values = Object.fromEntries(seeds.map((seed) => [
    seed,
    interpolate(postMemory[seed], 'radius', radius, 's'),
  ]));
  const speeds = Object.values(values);
  phaseRows.push({
    radius,
    s_spread: Math.max(...speeds) - Math.min(...speeds),
    values,
  });
}

const temporalHeader = [
  'time', 't_over_h', 'radius_spread', 's_spread', 'relative_s_spread',
  ...seeds.flatMap((seed) => [`${seed}_radius`, `${seed}_s`]),
];
const temporalCsv = [
  temporalHeader.join(','),
  ...temporalRows.map((row) => [
    row.time, row.t_over_h, row.radius_spread, row.s_spread,
    row.relative_s_spread,
    ...seeds.flatMap((seed) => [row.points[seed].radius, row.points[seed].s]),
  ].join(',')),
].join('\n');
fs.writeFileSync(temporalOutput, `${temporalCsv}\n`);

const phaseHeader = ['radius', 's_spread', ...seeds.map((seed) => `${seed}_s`)];
const phaseCsv = [
  phaseHeader.join(','),
  ...phaseRows.map((row) => [
    row.radius, row.s_spread, ...seeds.map((seed) => row.values[seed]),
  ].join(',')),
].join('\n');
fs.writeFileSync(phaseOutput, `${phaseCsv}\n`);

const rmsPhaseSpread = Math.sqrt(
  phaseRows.reduce((sum, row) => sum + row.s_spread ** 2, 0) /
    phaseRows.length,
);
console.log(JSON.stringify({
  schema: 'antipodal_binary_phase_collapse_summary.v1',
  history_depth: historyDepth,
  end_time: endTime,
  common_radius: [commonRadiusStart, commonRadiusEnd],
  phase_branch_start_time: phaseBranchStart,
  phase_spread_start: phaseRows[0].s_spread,
  phase_spread_mid: phaseRows[50].s_spread,
  phase_spread_end: phaseRows.at(-1).s_spread,
  phase_spread_maximum: Math.max(...phaseRows.map((row) => row.s_spread)),
  phase_spread_rms: rmsPhaseSpread,
  final_temporal_spread: temporalRows.at(-1),
}, null, 2));
