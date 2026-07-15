import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PATH_IDS,
  analyzeCampaign,
  parseClearanceLog,
  readStateCsv,
} from '../scripts/eom/analyze-section-86-v5-phase-collapse.mjs';

function clearance() {
  return parseClearanceLog([
    'perturbed step=1 status=accepted accepted_time=1 uncertified_root_rows=0 history_window_active_lower=-0.2',
    'perturbed step=2 status=accepted accepted_time=2 uncertified_root_rows=0 history_window_active_lower=0',
    'perturbed step=3 status=accepted accepted_time=3 uncertified_root_rows=0 history_window_active_lower=0.4',
  ].join('\n'));
}

function stateCsv({ radialOffset = 0, timeWarp = 1 }) {
  const header = 'accepted_step,time,path_id,x,y,z,vx,vy,vz,x_radius,y_radius,z_radius,vx_radius,vy_radius,vz_radius';
  const lines = [header];
  for (let step = 1; step <= 6; step += 1) {
    const time = step / timeWarp;
    const phase = 0.35 * step;
    for (let index = 0; index < PATH_IDS.length; index += 1) {
      const sign = index % 2 === 0 ? 1 : -1;
      const layer = Math.floor(index / 2);
      const radius = 1 + 0.2 * layer + radialOffset + 0.02 * phase;
      const x = sign * radius * Math.cos(phase);
      const y = sign * radius * Math.sin(phase);
      const z = sign * 0.1 * layer;
      const vx = -sign * radius * Math.sin(phase) * 0.35;
      const vy = sign * radius * Math.cos(phase) * 0.35;
      lines.push([
        step, time, PATH_IDS[index], x, y, z, vx, vy, 0,
        1e-12, 1e-12, 1e-12, 1e-12, 1e-12, 1e-12,
      ].join(','));
    }
  }
  return `${lines.join('\n')}\n`;
}

test('clearance requires a root-free certified suffix, not only t greater than h', () => {
  const result = clearance();
  assert.equal(result.certified, true);
  assert.equal(result.clearance_time, 2);
  assert.equal(result.minimum_post_clearance_lower, 0);
});

test('common-phase quotient removes timing warp but retains a physical radius gap', () => {
  const sharedClearance = clearance();
  const base = readStateCsv(stateCsv({}));
  const warped = readStateCsv(stateCsv({ timeWarp: 1.15 }));
  const shifted = readStateCsv(stateCsv({ radialOffset: 0.03 }));
  const refined = readStateCsv(stateCsv({ radialOffset: 1e-5 }));
  const cases = {
    circular: { clearance: sharedClearance, samples: base },
    radial_out: { clearance: sharedClearance, samples: base },
    tilt_io: { clearance: sharedClearance, samples: warped },
    radial_in_small: { clearance: sharedClearance, samples: shifted },
    radial_out_refined: { clearance: sharedClearance, samples: refined },
  };
  const { result, rows, synchronizedRows } = analyzeCampaign({
    cases,
    baselineIds: ['circular', 'radial_out', 'tilt_io', 'radial_in_small'],
    refinementId: 'radial_out_refined',
    phaseRows: 51,
  });
  assert.ok(result.baseline_position_diameter.start > 0.02);
  assert.ok(result.refinement_position_distance.maximum < 2e-5);
  assert.equal(result.baseline_within_refinement_envelope_at_all_phase_rows, false);
  const timingWarpPair = rows.flatMap((row) => row.baselinePairs)
    .filter((row) => row.pair === 'circular:tilt_io');
  assert.ok(Math.max(...timingWarpPair.map((row) => row.position)) < 1e-12);
  assert.ok(Math.max(...timingWarpPair.map((row) => row.velocity)) < 1e-12);
  const synchronizedTimingWarpPair = synchronizedRows
    .flatMap((row) => row.baselinePairs)
    .filter((row) => row.pair === 'circular:tilt_io');
  assert.ok(Math.max(
    ...synchronizedTimingWarpPair.map((row) => row.position),
  ) > 1e-4);
  assert.equal(
    result.synchronized_time_diagnostic.verdict_role,
    'diagnostic_only_not_a_collapse_criterion',
  );
});
