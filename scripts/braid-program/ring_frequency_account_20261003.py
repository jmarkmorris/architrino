#!/usr/bin/env python
"""Arithmetic projection of frozen circular-balance evidence; no balance solver.

Run --control first and record its receipt; --target refuses without that receipt.
Outward intervals bound arithmetic and printed-decimal rounding only, not the
unprovided error of each inherited numerical balance relative to an exact zero.
"""
import argparse
import hashlib
import json
from decimal import Decimal, localcontext, ROUND_FLOOR, ROUND_CEILING
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/frequency'
SOURCE = ROOT / '.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-100-point-arbitrary-precision.v1.json'
EXPECTED = 'cd2745bffbe792e7d8030d6382ee7f6b76d3f7670d3292559567c46217c70c6b'
TABLE = ROOT / 'reference/priorities/master-equation-closure/braid-program/analysis/ring-frequency-table-2026-10-03.json'
mp.mp.dps = 70
mp.iv.dps = 65


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def decimal_box(value):
    value = str(value)
    exponent = len(value.split('.')[1]) if '.' in value else 0
    midpoint = mp.iv.mpf(value)
    # One last printed unit, deliberately more than the half-unit roundoff.
    error = mp.iv.mpf(10) ** (-exponent)
    return midpoint + mp.iv.mpf([-1, 1]) * error


def bound(value):
    result = []
    for raw, rounding in zip(value._mpi_, [ROUND_FLOOR, ROUND_CEILING]):
        sign, mantissa, exponent, _ = raw
        with localcontext() as context:
            context.prec = 55
            context.rounding = rounding
            signed = Decimal(-mantissa if sign else mantissa)
            number = signed * Decimal(1 << exponent) if exponent >= 0 else signed / Decimal(1 << -exponent)
            result.append(str(number))
    return result


def projection(beta, radius):
    b, r = mp.mpf(beta), mp.mpf(radius)
    w, j = b / r, b * r
    return dict(beta=mp.nstr(b, 35), radius=mp.nstr(r, 35), omega=mp.nstr(w, 35),
                period=mp.nstr(2 * mp.pi / w, 35), angular_momentum_per_member=mp.nstr(j, 35),
                quadratic_proxy_per_member=mp.nstr(b*b/2, 35),
                quadratic_proxy_cycle_integral_per_member=mp.nstr(mp.pi*j, 35),
                leading_frequency_relative_error=mp.nstr(mp.sqrt(mp.mpf('1.5') / j)-1, 35),
                next_frequency_relative_error=mp.nstr((mp.sqrt(mp.mpf('1.5')*w)+mp.log(2)/mp.pi)/b-1, 35),
                one_hz_K_over_cf_cubed_seconds=mp.nstr(w/(2*mp.pi), 35))


def render_table(rows):
    header = '| Rung | beta | R | Omega | Period | R v | Directed hits | Self hits |\n| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |\n'
    return header + ''.join('| '+ ' | '.join([row['rung']] + [f"{float(row[key]):.10g}" for key in ['beta','radius','omega','period','angular_momentum_per_member']] + [str(row['directed_roots']),str(row['self_roots'])]) + ' |\n' for row in rows)


def control():
    # Closed-form kinematic case: beta=2, R=1/2 -> Omega=4, P=pi/2, J=1.
    row = projection('2', '0.5')
    assert mp.mpf(row['omega']) == 4
    assert mp.mpf(row['angular_momentum_per_member']) == 1
    assert abs(mp.mpf(row['period']) - mp.pi/2) < mp.mpf('1e-34')
    assert mp.mpf(row['quadratic_proxy_per_member']) == 2
    assert abs(mp.mpf(row['quadratic_proxy_cycle_integral_per_member']) - mp.pi) < mp.mpf('1e-34')
    box = decimal_box('0.500')
    assert box._mpi_[0] <= mp.iv.mpf('0.499')._mpi_[0]
    assert box._mpi_[1] >= mp.iv.mpf('0.501')._mpi_[1]
    assert Decimal(bound(box)[0]) <= Decimal('0.499')
    assert Decimal(bound(box)[1]) >= Decimal('0.501')
    synthetic = json.loads('{"rows":[{"ladderIndex":1,"precisionRuns":[{"decimalDigits":100,"beta":"2"},{"decimalDigits":120,"beta":"3"}]}]}')
    assert max(synthetic['rows'][0]['precisionRuns'], key=lambda p:p['decimalDigits'])['beta'] == '3'
    # Symbolic inversion controls exact algebra, independent of target values.
    import sympy as sp
    t, a, b = sp.symbols('t a b', positive=True)
    beta = sp.sqrt(a)/t + b/(2*a)
    r = sp.series(a/beta + b/beta**2, t, 0, 3).removeO()
    assert sp.simplify(r-(sp.sqrt(a)*t+b*t*t/(2*a))) == 0
    assert render_table([dict(rung='control',beta='2',radius='0.5',omega='4',period='1',angular_momentum_per_member='1',directed_roots=0,self_roots=0)]).endswith('| control | 2 | 0.5 | 4 | 1 | 1 | 0 | 0 |\n')
    OUT.mkdir(parents=True, exist_ok=True)
    receipt = dict(status='PASS', analytical_control='beta=2,R=1/2 gives Omega=4,P=pi/2,J=1; printed-decimal outward box; synthetic precision selection; symbolic next-order inversion', script_sha256=digest(Path(__file__)))
    (OUT/'control.json').write_text(json.dumps(receipt, indent=2)+'\n')
    print(json.dumps(receipt))


def target():
    receipt = json.loads((OUT/'control.json').read_text())
    assert receipt['status'] == 'PASS' and receipt['script_sha256'] == digest(Path(__file__))
    assert digest(SOURCE) == EXPECTED
    data = json.loads(SOURCE.read_text())
    assert len(data['rows']) == 100
    result, boxes = [], []
    for n, row in enumerate(data['rows'], 1):
        assert row['ladderIndex'] == n and row['topologyIntervalId'] == f'T{2*n:02d}'
        src = max(row['precisionRuns'], key=lambda p:p['decimalDigits'])
        rec = projection(src['beta'], src['radius'])
        b, r = decimal_box(src['beta']), decimal_box(src['radius'])
        w, j = b/r, b*r
        rec.update(rung=row['topologyIntervalId'], ladder_index=n,
                   source_precision_digits=src['decimalDigits'], directed_roots=src['directedRootCount'],
                   self_roots=sum(v['phaseRootCounts'][v['receiverIndex']] for v in src['receiverRows']),
                   inherited_C=src['C'], arithmetic_bounds=dict(omega=bound(w), period=bound(2*mp.iv.pi/w), angular_momentum_per_member=bound(j)))
        assert rec['directed_roots'] == 24*(n+1)
        assert rec['self_roots'] == 6*(1+2*((2*n-1)//6))
        assert abs(mp.mpf(src['C'])-mp.mpf(rec['angular_momentum_per_member'])) < mp.mpf('1e-33')
        if result:
            prev = result[-1]
            rec['jump_from_previous'] = {key:mp.nstr(mp.mpf(rec[key])-mp.mpf(prev[key]),35) for key in ['beta','radius','omega','angular_momentum_per_member']}
            rec['jump_arithmetic_bounds'] = dict(beta=bound(b-boxes[-1][0]), radius=bound(r-boxes[-1][1]), omega=bound(w-boxes[-1][2]), angular_momentum_per_member=bound(j-boxes[-1][3]))
            # These are signs of printed-source projections, not new physics certificates.
            assert (b-boxes[-1][0])._mpi_[0][0] == 0
            assert (w-boxes[-1][2])._mpi_[0][0] == 0
            assert (r-boxes[-1][1])._mpi_[1][0] == 1
            assert (j-boxes[-1][3])._mpi_[1][0] == 1
        result.append(rec)
        boxes.append((b,r,w,j))
    braid = ROOT/'reference/priorities/master-equation-closure/braid-program'
    scopes = json.loads((braid/'evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json').read_text())['balancedCandidateScopes']
    others = [dict(members=2, source='circular-configuration-registry.md binary row', directed_roots=8, self_roots=2, **projection('3.070356625390253','0.08694167347390959'))]
    for scope in scopes:
        others.append(dict(members=2*scope['n'], source='N:N frozen measured receipt', directed_roots=scope['rootCount'], self_roots=2*scope['n'], **projection(str(scope['beta']), str(scope['compatibleScale']))))
    others.append(dict(members=24, source='12:12 frozen measured evidence', directed_roots=624, self_roots=24, **projection('1.290840841384326','13.982496760466805')))
    for other in others:
        # The six-member high-rung asymptotic is not an N-dependent law.
        del other['leading_frequency_relative_error']
        del other['next_frequency_relative_error']
    payload = dict(schema='ring-frequency-arithmetic-projection.v1', baseline='unchanged Master Equation; all positive-delay self roots; K=c_f=1', source_sha256=EXPECTED,
                   claim_grade='measured arithmetic projection of inherited balance measurements; no balance recomputation', arithmetic_bound_scope='one last printed decimal unit plus outward-rounded arithmetic; not exact-balance enclosures', rows=result, other_recorded_sizes=others)
    TABLE.write_text(json.dumps(payload,indent=2)+'\n')
    scratch = ROOT/'.tmp/ring-frequency'
    scratch.mkdir(parents=True,exist_ok=True)
    (scratch/'ladder-table.md').write_text(render_table(result))
    summary = dict(status='PASS', rows=len(result), first=result[0], last=result[-1], first_jump=result[1]['jump_from_previous'], last_jump=result[-1]['jump_from_previous'],
                   angular_momentum_relative_fall=mp.nstr(1-mp.mpf(result[-1]['angular_momentum_per_member'])/mp.mpf(result[0]['angular_momentum_per_member']),25),
                   table_sha256=digest(TABLE), control_sha256=digest(OUT/'control.json'))
    (OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
    print(json.dumps({key:summary[key] for key in ['status','rows','first_jump','last_jump','angular_momentum_relative_fall','table_sha256']}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--control', action='store_true')
    parser.add_argument('--target', action='store_true')
    args = parser.parse_args()
    if args.control == args.target:
        parser.error('choose exactly one of --control or --target')
    control() if args.control else target()
