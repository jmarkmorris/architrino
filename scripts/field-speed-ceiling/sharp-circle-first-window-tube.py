#!/usr/bin/env python
"""Explicit-use [0,1] error-tube arithmetic; proof lives in the companion analysis.

Consumes the unchanged first-window defect evaluator's retained binary intervals.
This is not a production integrator or a long-time escape certificate.
"""
import argparse
from fractions import Fraction
import hashlib
import json
from pathlib import Path

from mpmath import iv, mp

mp.prec = iv.prec = 180
ROOT = Path(__file__).resolve().parents[2]
DEFECT_SCRIPT = ROOT / 'scripts/field-speed-ceiling/sharp-circle-first-window-defect.py'
DEFECT_HASH = '43a19e9c6aebb5fb510c762409b775ed217ad33831ddfc467ec9b754cd728e09'
INPUT = ROOT / 'reference/priorities/master-equation-closure/braid-program/evidence/sharp-circle-first-window-defect-receipt.json'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def lower(x):
    return mp.make_mpf(x._mpi_[0])


def upper(x):
    return mp.make_mpf(x._mpi_[1])


def decode(pair):
    return iv.mpf([mp.make_mpf(tuple(pair[0])), mp.make_mpf(tuple(pair[1]))])


def encoded(x):
    return [list(x._mpi_[0]), list(x._mpi_[1])]


def rational(x):
    sign, mantissa, exponent, _ = x._mpf_
    return (-1 if sign else 1) * Fraction(mantissa) * Fraction(2) ** exponent


def decimal_bound(x, direction, digits=18):
    """Convert a binary endpoint to a directed decimal, using integers only."""
    scaled = rational(x) * 10 ** digits
    n = scaled.numerator // scaled.denominator
    if direction == 'up' and scaled.denominator != 1:
        n += 1
    assert direction in ('up', 'down')
    sign = '-' if n < 0 else ''
    whole, part = divmod(abs(n), 10 ** digits)
    return f'{sign}{whole}.{part:0{digits}d}'


def enclosure(x):
    return {'lower': decimal_bound(lower(x), 'down'),
            'upper': decimal_bound(upper(x), 'up'), 'binary': encoded(x)}


def errors(lipschitz, defect, time):
    """Exact solution of p'=q, q'=L p+delta, p(0)=q(0)=0."""
    if lower(lipschitz) == upper(lipschitz) == 0:
        return defect * time ** 2 / 2, defect * time
    assert lower(lipschitz) > 0
    root = iv.sqrt(lipschitz)
    exp_plus, exp_minus = iv.exp(root * time), iv.exp(-root * time)
    return (defect * ((exp_plus + exp_minus) / 2 - 1) / lipschitz,
            defect * (exp_plus - exp_minus) / (2 * root))


def known_cases():
    # Independent closed forms, evaluated before reading any target evidence.
    p, q = errors(iv.mpf(0), iv.mpf(3), iv.mpf(2))
    assert lower(p) == upper(p) == 6
    assert lower(q) == upper(q) == 6
    p, q = errors(iv.mpf(1), iv.mpf(1), iv.ln(iv.mpf(2)))
    assert lower(p) <= mp.mpf('0.25') <= upper(p)
    assert lower(q) <= mp.mpf('0.75') <= upper(q)
    x = iv.mpf(['-0.125', '0.5'])
    assert encoded(decode(encoded(x))) == encoded(x)
    assert decimal_bound(mp.mpf('-0.125'), 'down', 2) == '-0.13'
    assert decimal_bound(mp.mpf('-0.125'), 'up', 2) == '-0.12'
    assert decimal_bound(mp.mpf('0.125'), 'down', 2) == '0.12'
    assert decimal_bound(mp.mpf('0.125'), 'up', 2) == '0.13'
    return {'knownCasesPassed': True,
            'references': ['L=0, delta=3, t=2 gives p=q=6',
                           'L=delta=1, t=log(2) gives p=1/4, q=3/4',
                           'Exact signed dyadic round trip and directed decimal rounding'],
            'nonzeroLControl': {'position': enclosure(p), 'velocity': enclosure(q)}}


def target():
    assert digest(DEFECT_SCRIPT) == DEFECT_HASH, 'defect evaluator changed'
    manifest = json.loads(INPUT.read_text())
    assert manifest['sourceSha256'] == DEFECT_HASH
    record = manifest['records'][-1]
    raw_path = ROOT / record['localPath']
    assert digest(raw_path) == record['rawSha256'], 'raw defect evidence changed'
    raw = json.loads(raw_path.read_text())
    assert raw['sourceSha256'] == DEFECT_HASH
    data = raw['target']
    assert data['radius'] == '1.001' and data['interval'] == [0, 1]
    assert data['arcs'] == 128 and data['subdivisions'] == 4
    assert len(data['boxes']) == 512
    assert {k: v for k, v in data.items() if k != 'boxes'} == record['result']['target']
    # Conservative exact decimal inputs; validate against every binary box.
    tokens = {'range0': '1.4780', 'J0': '1.6706', 'power0': '0.8995',
              'sourceUpper0': '-0.4798', 'kUpper': '4.947768',
              'radius': '1.001', 'rho': '0.01', 'sigma': '0.01', 'eta': '0.02',
              'delta': '0.000053736821978284'}
    c = {key: iv.mpf(value) for key, value in tokens.items()}
    for index, box in enumerate(data['boxes']):
        assert box['arc'] == index // 4 and box['subcell'] == index % 4
        for field, floor in [('range', 'range0'), ('J', 'J0'), ('power', 'power0')]:
            assert rational(lower(decode(box[field]))) > Fraction(tokens[floor])
        assert rational(upper(decode(box['source']))) < Fraction(tokens['sourceUpper0'])
        residual = decode(box['defect'])
        assert max(abs(rational(lower(residual))), abs(rational(upper(residual)))) <= Fraction(tokens['delta'])
    assert rational(upper(decode(raw['k']))) < Fraction(tokens['kUpper'])

    # Bounds derived in sharp-circle-first-window-tube.md, sections 2 and 3.
    distance_change = c['rho'] + c['eta']
    ell = c['range0'] - distance_change
    j = c['J0'] - 2 * distance_change / c['range0'] - c['eta'] / c['radius']
    root_sign_margin = j * c['eta'] - c['rho']
    source_upper = c['sourceUpper0'] + c['eta']
    assert lower(ell) > 0 and lower(j) > 0
    assert lower(root_sign_margin) > 0 and upper(source_upper) < 0
    cr = 1 + 1 / j
    cj = cr / ell + 1 / (c['radius'] * j)
    acceleration = c['kUpper'] / (ell ** 2 * j)
    lipschitz = acceleration * (3 * cr / ell + cj / j)
    acceleration0 = c['kUpper'] / (c['range0'] ** 2 * c['J0'])
    active_margin = c['power0'] - acceleration0 * c['sigma'] - lipschitz * c['rho']
    assert lower(active_margin) > 0
    # Use an upward decimal bound as a single exact Gronwall coefficient.
    l_token = decimal_bound(upper(lipschitz), 'up')
    p, q = errors(iv.mpf(l_token), c['delta'], iv.mpf(1))
    assert upper(p) < lower(c['rho']) and upper(q) < lower(c['sigma'])
    actual_power = c['power0'] - acceleration0 * q - iv.mpf(l_token) * p
    assert lower(actual_power) > 0
    px = iv.mpf([-upper(p), upper(p)])
    qv = iv.mpf([-upper(q), upper(q)])
    phase = decode(data['endPhase'])
    endpoint = {'position': [enclosure(decode(x) + px) for x in data['endPosition']],
                'velocity': [enclosure(-iv.sin(phase) + qv), enclosure(iv.cos(phase) + qv)]}
    return {'inputs': tokens, 'defectInputManifestSha256': digest(INPUT),
            'defectInputRawPath': record['localPath'], 'defectInputRawSha256': record['rawSha256'],
            'defectEvaluatorSha256': DEFECT_HASH, 'checkedTimeBoxes': 512,
            'bounds': {name: enclosure(value) for name, value in {
                'rangeFloor': ell, 'JFloor': j, 'rootSignMargin': root_sign_margin,
                'sourceTimeUpper': source_upper, 'accelerationUpper': acceleration,
                'positionLipschitzUpper': lipschitz, 'activeMarginOnBootstrapTube': active_margin,
                'positionErrorAt1': p, 'velocityErrorAt1': q,
                'actualForwardAccelerationLower': actual_power}.items()},
            'comparisonLipschitzConstant': l_token, 'endpointEnclosure': endpoint,
            'tubeClosed': True,
            'scope': 'Sharp capped solution for supplied circular past on [0,1]; conditional on companion proof and interval backend; no long-time escape claim'}


def main():
    parser = argparse.ArgumentParser()
    choice = parser.add_mutually_exclusive_group(required=True)
    choice.add_argument('--known', action='store_true')
    choice.add_argument('--target', action='store_true')
    parser.add_argument('--known-receipt')
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    source_hash = digest(Path(__file__))
    if args.known:
        result = known_cases()
    else:
        assert args.known_receipt, 'run known controls first'
        known = json.loads(Path(args.known_receipt).read_text())
        assert known['knownCasesPassed'] and known['sourceSha256'] == source_hash
        result = target()
        result['knownReceiptSha256'] = digest(Path(args.known_receipt))
    result.update(sourceSha256=source_hash, backend='mpmath.iv 1.3.0, 180-bit interval arithmetic')
    Path(args.output).write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps({key: value for key, value in result.items()
                      if key in ('knownCasesPassed', 'tubeClosed', 'scope', 'sourceSha256')}))
    for key, value in result.get('bounds', {}).items():
        print(key, value['lower'], value['upper'])


if __name__ == '__main__':
    main()
