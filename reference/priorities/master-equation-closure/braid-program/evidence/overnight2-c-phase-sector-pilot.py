"""Exact rational phase-sector test on the unchanged frozen 32-leaf subset.

At the maximal positive-endpoint phase, every partner tangential row is
positive if W + 2 omega r_max < pi. We use the sufficient rational test
W + 2 omega_hi r_max_hi < 3 < pi. No causal residual is recomputed.
"""
import argparse
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import resource
import time

SELF = Path(__file__)
OUT = Path('.local-data/master-equation-closure/overnight2-c')
SUBSET = SELF.with_name('overnight2-c-frozen-subset.json')
BASELINE = OUT / 'joint-pilot.json'
PINS = {
    "reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-frozen-subset.json": "4d234ee78f55bb13a1ad2c1cd41f5e21f9271fe87574078f083a8091f26041e6",
    ".local-data/master-equation-closure/overnight2-c/joint-pilot.json": "7791b54741e20386f525eac7ceecf02e267348bad7262157d78d3ad9b0d14215",
    "reference/priorities/master-equation-closure/braid-program/analysis/overnight2-c-explicit-global-separation.md": "7efea6ce8074cde8732a6f724759258f16855b3ce9e6f1709eaab75c1fab4367"
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def decode(path, domain):
    box = list(domain)
    for digit in path:
        code = int(digit)
        assert 0 <= code < 10
        axis, side = divmod(code, 2)
        lo, hi = box[axis]
        mid = (lo + hi) / 2
        box[axis] = (mid, hi) if side else (lo, mid)
    return box


def test(box):
    width = max(Q(0), box[3][1], box[4][1]) - min(Q(0), box[3][0], box[4][0])
    upper = width + 2 * box[2][1] * box[1][1]
    return upper < 3, width, upper


def known():
    assert decode('67', [(Q(0), Q(4))] * 5)[3] == (Q(1), Q(2))
    box = [(Q(6, 5), Q(7, 5)), (Q(8, 5), Q(9, 5)), (Q(1, 10), Q(1, 2)),
           (Q(-1, 10), Q(1, 10)), (Q(1, 5), Q(3, 10))]
    passed, width, upper = test(box)
    assert passed and width == Q(2, 5) and upper == Q(11, 5)
    box[3] = box[4] = (Q(-1), Q(1))
    assert test(box) == (False, Q(2), Q(19, 5))
    box[1] = (Q(2), Q(2))
    box[3] = box[4] = (Q(0), Q(1))
    assert test(box) == (False, Q(1), Q(3))
    return {'passed': True, 'controls': ['two-step exact dyadic decoding', 'positive sector', 'negative sector', 'strict threshold retained']}


def pilot():
    known_record = json.loads((OUT / 'phase-sector-known.json').read_text())
    assert known_record['passed'] and known_record['source_sha256'] == digest(SELF)
    for name, pin in PINS.items():
        assert digest(Path(name)) == pin
    subset = json.loads(SUBSET.read_text())
    assert len(subset['paths']) == 32
    baseline = json.loads(BASELINE.read_text())
    assert baseline['subset_sha256'] == digest(SUBSET)
    baseline_rows = {row['path']: row for row in baseline['rows']}
    domain = [tuple(map(Q, pair)) for pair in subset['domain']]
    start = time.monotonic()
    rows = []
    for path in subset['paths']:
        assert time.monotonic() - start < 5
        box = decode(path, domain)
        excluded, width, upper = test(box)
        natural = baseline_rows[path]['baseline_component'] is not None
        rows.append({'path': path, 'phase_width_upper': str(width), 'angle_upper': str(upper),
                     'sector_excluded': excluded, 'saved_natural_excluded': natural,
                     'additional_to_saved_natural': excluded and not natural})
    peak = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    assert peak < 100_000_000
    result = {'rows': rows, 'sector_excluded': sum(row['sector_excluded'] for row in rows),
              'additional_to_saved_natural': sum(row['additional_to_saved_natural'] for row in rows),
              'saved_natural_excluded': sum(row['saved_natural_excluded'] for row in rows),
              'wall_seconds': time.monotonic() - start, 'maxrss_bytes_macos': peak,
              'inputs': PINS,
              'boundary': 'Exact phase criterion only; saved natural outcomes are compared without residual replay, and no subdivision is performed.'}
    assert len(json.dumps(result).encode()) < 64_000
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'pilot'], required=True)
    stage = parser.parse_args().stage
    result = known() if stage == 'known' else pilot()
    result['source_sha256'] = digest(SELF)
    destination = OUT / ('phase-sector-known.json' if stage == 'known' else 'phase-sector-pilot.json')
    assert not destination.exists(), 'preserve completed receipts'
    destination.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps({key: value for key, value in result.items() if key != 'rows'}))
