"""Directed delayed-acceleration row gains on the frozen exact four-ring boxes.

Known matrix values precede targets. This is no trajectory or stability proof.
"""
import argparse
import importlib.util
import json
from pathlib import Path
import mpmath as mp

mp.iv.dps = 65
iv = mp.iv
I = lambda a, b=None: iv.mpf([a, a if b is None else b])
export_path = Path(__file__).with_name('maxwell-shaped-overnight-independent-ring-certified-export.py')
spec = importlib.util.spec_from_file_location('outward_export', export_path)
export = importlib.util.module_from_spec(spec)
spec.loader.exec_module(export)


def gain(beta, denominator, distance, full=False):
    square = 2 * denominator - 1 + beta * beta
    assert square.a > 0 and denominator.a > 0 and distance.a > 0
    numerator = square if full else iv.sqrt(square)
    return numerator / (distance * denominator ** 3)


def known():
    # Direct n-frame matrix: transverse row (-3/4,-1), normal row -1.
    # Its singular norm is 5/4; the receiver map gives planar norm 25/16.
    e = gain(I('0.75'), I(1), I(1))
    full = gain(I('0.75'), I(1), I(1), True)
    static = gain(I(0), I(1), I(2))
    assert e.a == I('1.25').a and e.b == I('1.25').b
    assert full.a == I('1.5625').a and full.b == I('1.5625').b
    assert static.a == I('0.5').a and static.b == I('0.5').b
    return {'passed': True, 'cases': ['stationary R2 norm one-half',
                                    'transverse source 3/4 norm 5/4',
                                    'opposite receiver transverse norm 25/16']}


def target():
    certificate_path = Path('.local-data/master-equation-closure/braid-program/'
                            'maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json')
    cert = json.loads(certificate_path.read_text())['certificate']
    beta = I(*cert['beta'])
    rows = []
    for law, threshold in [('E', '0.87'), ('E+M', '0.80')]:
        case = next(row for row in cert['cases'] if row['law'] == law)
        radius = I(*case['radius'])
        hits = [gain(beta, I(*hit['D']), radius * I(*hit['delay_over_radius']), law == 'E+M')
                for hit in cert['hits']]
        total = sum(hits, I(0))
        assert total.b < I(threshold).a < 1
        rows.append({'law': law, 'hit_norms': [export.encode(value) for value in hits],
                     'row_sum': export.encode(total), 'widened_upper': threshold,
                     'grade': 'derived delayed-acceleration max-member row gain below one; no stability verdict'})
    return rows


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    result = {'known': known()}
    if args.target:
        result['certificate'] = target()
    Path(args.output).write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result))
