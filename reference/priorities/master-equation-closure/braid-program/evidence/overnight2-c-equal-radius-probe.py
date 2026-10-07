"""Bounded floating research probe of equal-radius complete circular rows.

K_log=c_f=a=1. This is not an interval proof or an exact reference finder.
"""
import os
for key in ('OPENBLAS_NUM_THREADS', 'OMP_NUM_THREADS', 'MKL_NUM_THREADS', 'VECLIB_MAXIMUM_THREADS'):
    os.environ[key] = '1'
import argparse
import hashlib
import json
import time
import resource
from pathlib import Path
import numpy as np

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rows(v, beta):
    v, beta = np.broadcast_arrays(v, beta)
    assert np.all((v >= 0) & (v <= 1))
    assert np.all((beta > 0) & (beta < 2 * np.pi))
    lo = beta.copy()
    hi = np.full_like(beta, 2 * np.pi)
    for _ in range(60):
        mid = (lo + hi) / 2
        value = mid - 2 * v * np.sin(mid / 2)
        lo = np.where(value < beta, mid, lo)
        hi = np.where(value >= beta, mid, hi)
    alpha = (lo + hi) / 2
    D = 1 - v * np.cos(alpha / 2)
    radial = 1 / (2 * D)
    tangent = np.cos(alpha / 2) / (2 * np.sin(alpha / 2) * D)
    error = np.max(np.abs(alpha - 2 * v * np.sin(alpha / 2) - beta))
    return radial, tangent, float(error)


def known():
    r, t, e = rows(np.array([0.0, 0.25, 1.0]), np.array([np.pi, np.pi - 0.5, np.pi - 2]))
    assert np.max(np.abs(r - 0.5)) < 1e-13 and np.max(np.abs(t)) < 1e-13
    beta = np.array([np.pi / 3, 2 * np.pi / 3, 3 * np.pi / 2])
    r, t, e2 = rows(0.0, beta)
    assert np.max(np.abs(r - 0.5)) < 1e-13
    assert np.max(np.abs(t - np.cos(beta / 2) / (2 * np.sin(beta / 2)))) < 1e-13
    return {'passed': True, 'controls': ['manufactured alpha=pi at speeds0,1/4,1', 'static chord rows at three distinct angles'],
            'max_root_equation_error': max(e, e2)}


def probe():
    receipt = json.loads((OUT / 'equal-radius-probe-known.json').read_text())
    assert receipt['passed'] and receipt['source_sha256'] == sha(SELF)
    start = time.monotonic()
    reports = []
    indices = [(j, k) for j in range(1, 32) for k in range(1, 32)
               if j != 16 and k != 16 and j != k and abs(j - k) != 16]
    j = np.array([p[0] for p in indices]); k = np.array([p[1] for p in indices])
    positive = np.column_stack((np.zeros(len(j)), j * np.pi / 16, k * np.pi / 16))
    phases = np.concatenate((positive, positive + np.pi), axis=1)
    charge = np.array([1, 1, 1, -1, -1, -1])
    worst_error = 0.0
    for speed_index in range(1, 17):
        assert time.monotonic() - start < 30
        v = speed_index / 16
        F = np.zeros((len(j), 6))
        for i in range(3):
            sources = [b for b in range(6) if b != i]
            beta = (positive[:, i, None] - phases[:, sources]) % (2 * np.pi)
            r, t, err = rows(v, beta)
            worst_error = max(worst_error, err)
            F[:, 2 * i] = v * v + np.sum(r * charge[sources], axis=1)
            F[:, 2 * i + 1] = np.sum(t * charge[sources], axis=1)
        total = np.sum(F[:, [1, 3, 5]], axis=1)
        norm = np.linalg.norm(F, axis=1)
        low, high, best = int(np.argmin(total)), int(np.argmax(total)), int(np.argmin(norm))
        reports.append({'speed_index_over16': speed_index, 'cases': len(j),
                        'minimum_total_tangent': float(total[low]), 'minimum_phase_indices_over16': indices[low],
                        'maximum_total_tangent': float(total[high]), 'maximum_phase_indices_over16': indices[high],
                        'negative_total_count': int(np.sum(total < 0)),
                        'minimum_full_residual_norm': float(norm[best]), 'best_phase_indices_over16': indices[best]})
        assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss < 400_000_000
    result = {'grid': 'v=m/16, m=1..16; phi2=j*pi/16,phi3=k*pi/16; all distinct nonantipodal positive endpoints',
              'reports': reports, 'cases': len(indices) * 16, 'max_root_equation_error': worst_error,
              'wall_seconds': time.monotonic() - start,
              'peak_rss_bytes_macos': resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
              'boundary': 'Floating proposal evidence only; no interval exclusion, all-phase sign theorem, exact reference or independent target replay.'}
    assert len(json.dumps(result).encode()) < 100_000
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'probe'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else probe()
    result['source_sha256'] = sha(SELF)
    dest = OUT / ('equal-radius-probe-known.json' if stage == 'known' else 'equal-radius-probe.json')
    assert not dest.exists(), 'preserve existing receipt'
    dest.write_text(json.dumps(result, indent=2) + '\n')
    if stage == 'probe':
        result = {key: value for key, value in result.items() if key != 'reports'} | {
            'negative_total_count': sum(row['negative_total_count'] for row in result['reports']),
            'min_total_tangent': min(row['minimum_total_tangent'] for row in result['reports'])}
    print(json.dumps(result))
