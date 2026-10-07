#!/usr/bin/env python
"""Exact structural audit, separately authored from the interval producer."""
import argparse
import copy
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path

EXPECTED_SOURCE = '94511692ff0fcafa56db6e743a75e6f4a11da5cc4fc78c1355d316a62673b09e'


def interval(value):
    assert isinstance(value, list) and len(value) == 2
    low, high = map(F, value)
    assert low <= high
    return low, high


def audit(data, count):
    assert data['stage'] == 'full'
    assert data['source_sha256'] == EXPECTED_SOURCE
    assert data['partition_denominator'] == count
    assert data['cell_count'] == count
    assert data['indices'] == list(range(count))
    assert len(data['cells']) == count
    assert data['all_certified'] is True and data['unresolved_cells'] == []
    minimum_q, minimum_d = None, None
    previous_high = F(0)
    for index, cell in enumerate(data['cells']):
        assert cell['index'] == index
        low, high = F(cell['v_low']), F(cell['v_high'])
        assert low == F(index, count) and high == F(index + 1, count)
        assert low == previous_high and high > low
        previous_high = high
        assert len(cell['channels']) == 2
        assert [c['beta_pi_multiplier'] for c in cell['channels']] == ['1/2', '3/2']
        for channel in cell['channels']:
            lo_root = interval(channel['alpha_at_v_low'])
            hi_root = interval(channel['alpha_at_v_high'])
            root_hull = interval(channel['alpha_cell'])
            assert 0 < lo_root[0] <= hi_root[1]
            assert root_hull[0] <= lo_root[0] and root_hull[1] >= hi_root[1]
            factor = interval(channel['D'])
            assert factor[0] > 0
            interval(channel['B'])
            minimum_d = factor[0] if minimum_d is None else min(minimum_d, factor[0])
        q = interval(cell['Q'])
        margin = interval(cell['Q_minus_21_over_20'])
        assert q[0] > F(21, 20) and margin[0] > 0
        assert cell['certified'] is True
        minimum_q = q[0] if minimum_q is None else min(minimum_q, q[0])
    assert previous_high == 1
    assert F(data['minimum_Q_lower']) == minimum_q
    assert F(data['minimum_D_lower']) == minimum_d
    return {'pass': True, 'cell_count': count, 'closed_start': '0', 'closed_end': '1',
            'exact_contiguous_coverage': True, 'angle_channels_per_cell': 2,
            'unresolved_cells': 0, 'minimum_Q_lower': data['minimum_Q_lower'],
            'minimum_D_lower': data['minimum_D_lower'],
            'minimum_margin_exact': str(minimum_q - F(21, 20))}


def manufactured():
    count = 3
    channels = []
    for angle in ['1/2', '3/2']:
        channels.append({'beta_pi_multiplier': angle, 'alpha_at_v_low': ['1', '1'],
                         'alpha_at_v_high': ['2', '2'], 'alpha_cell': ['1', '2'],
                         'D': ['1', '1'], 'B': ['0', '2']})
    cells = [{'index': i, 'v_low': str(F(i, count)), 'v_high': str(F(i+1, count)),
              'channels': copy.deepcopy(channels), 'Q': ['2', '2'],
              'Q_minus_21_over_20': ['19/20', '19/20'], 'certified': True}
             for i in range(count)]
    return {'stage': 'full', 'source_sha256': EXPECTED_SOURCE, 'partition_denominator': count,
            'cell_count': count, 'indices': list(range(count)), 'cells': cells,
            'all_certified': True, 'unresolved_cells': [], 'minimum_Q_lower': '2', 'minimum_D_lower': '1'}


def known():
    fixture = manufactured()
    assert audit(fixture, 3)['pass']
    records = [{'control': 'manufactured contiguous closed coverage', 'pass': True}]
    missing = copy.deepcopy(fixture)
    del missing['cells'][1]
    gap = copy.deepcopy(fixture)
    gap['cells'][1]['v_low'] = '1/2'
    wrong = copy.deepcopy(fixture)
    wrong['cells'][1]['channels'][1]['beta_pi_multiplier'] = '5/2'
    bad_factor = copy.deepcopy(fixture)
    bad_factor['cells'][2]['channels'][0]['D'] = ['0', '1']
    threshold = copy.deepcopy(fixture)
    threshold['cells'][0]['Q'] = ['21/20', '2']
    for name, item in [('missing index', missing), ('rational endpoint gap', gap),
                       ('wrong angle channel', wrong), ('nonpositive factor', bad_factor),
                       ('nonstrict Q threshold', threshold)]:
        try:
            audit(item, 3)
        except AssertionError:
            records.append({'control': name, 'rejected_as_expected': True})
        else:
            raise AssertionError('known defect was accepted: ' + name)
    return {'stage': 'known', 'all_pass': True, 'controls': records}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    parser.add_argument('--receipt')
    args = parser.parse_args()
    if args.stage == 'known':
        result = known()
    else:
        assert args.receipt
        content = Path(args.receipt).read_bytes()
        result = audit(json.loads(content), 512)
        result.update({'stage': 'target', 'receipt_sha256': hashlib.sha256(content).hexdigest()})
    result['auditor_sha256'] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    print(json.dumps(result, separators=(',', ':')))


if __name__ == '__main__':
    main()
