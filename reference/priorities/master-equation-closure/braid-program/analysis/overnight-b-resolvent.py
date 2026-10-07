"""Known-first axial inverse bounds; a research instrument, not evolution."""
import argparse
import hashlib
import importlib.util
import json
import time
from pathlib import Path

import mpmath as mp

ROOT = Path(__file__).resolve().parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight-b/resolvent'
ADMISSION = ROOT / '.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA = '5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
CONTROL = ROOT / 'scripts/braid-program/ring_nonrigid_3d_followup_coupled_proposal_20261003.py'
CONTROL_SHA = 'b1494537bc472e7c68e3b0fc272b45178f4e8e254e681af33bca994e0a746721'
mp.mp.dps = 110
mp.iv.dps = 80


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def iv(a, b=None):
    return mp.iv.mpf([a, a if b is None else b])


def lo(x):
    return mp.mpf(x._mpi_[0])


def hi(x):
    return mp.mpf(x._mpi_[1])


def encode(x):
    if isinstance(x, dict):
        return {k: encode(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [encode(v) for v in x]
    if hasattr(x, '_mpi_'):
        return {'binary': [list(v) for v in x._mpi_], 'display': [mp.nstr(lo(x), 35), mp.nstr(hi(x), 35)]}
    if hasattr(x, '_mpf_'):
        return {'binaryPoint': list(x._mpf_), 'display': mp.nstr(x, 35)}
    return x


def save(stage, data):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / (stage + '.json')
    path.write_text(json.dumps(encode(dict(passed=True, instrumentSha256=sha(Path(__file__)),
                                         K=1, c_f=1, timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), **data)), indent=2) + '\n')
    print(json.dumps({'stage': stage, 'passed': True, 'receipt': str(path), 'sha256': sha(path)}), flush=True)


def cover(values, limit, tail_constant, width=mp.mpf('0.015625')):
    """Interval modulus floors plus analytic |H| >= w^2-tail_constant tail."""
    assert limit * limit > tail_constant
    leaves = []
    def visit(a, b, depth=0):
        w = iv(a, b)
        re, im = values(w)
        modulus_squared = re**2 + im**2
        floor = mp.iv.sqrt(modulus_squared)
        if lo(floor) > 0:
            c0 = hi(1/floor)
            c1 = hi(iv(b)/floor)
            leaves.append(dict(a=a, b=b, real=re, imaginary=im, floor=floor, c0=c0, c1=c1))
            return
        assert depth < 35, ('unresolved frequency cell', a, b)
        mid = (a+b)/2
        visit(a, mid, depth+1)
        visit(mid, b, depth+1)
    n = int(mp.ceil(limit/width))
    for k in range(n):
        visit(limit*k/n, limit*(k+1)/n)
    assert leaves[0]['a'] == 0 and leaves[-1]['b'] == limit
    assert all(a['b'] == b['a'] for a, b in zip(leaves, leaves[1:]))
    tail_floor = iv(limit)**2-iv(tail_constant)
    c0 = max([hi(1/tail_floor)] + [row['c0'] for row in leaves])
    c1 = max([hi(iv(limit)/tail_floor)] + [row['c1'] for row in leaves])
    # Decimal integer ceilings deliberately enlarge the certified bounds.
    return dict(C0=mp.ceil(c0*1000)/1000, C1=mp.ceil(c1*1000)/1000,
                tailConstant=tail_constant, limit=limit, leaves=leaves)


def known():
    # H(iw)=(iw+1)^2: |H|=1+w^2; exact sup inverse=1, derivative inverse=1/2.
    result = cover(lambda w: (1-w*w, 2*w), mp.mpf(4), mp.mpf(1))
    assert 1 <= result['C0'] < mp.mpf('1.04')
    assert mp.mpf('.5') <= result['C1'] < mp.mpf('.54')
    # Squared interval containing zero must not manufacture a positive lower bound.
    assert lo(iv(-1, 1)**2) == 0
    assert lo(mp.iv.sqrt(iv(0)**2+iv(0)**2)) == 0
    # Use frozen static/full-vector controls without writing their frozen receipts.
    assert sha(CONTROL) == CONTROL_SHA
    spec = importlib.util.spec_from_file_location('frozen_b_controls', CONTROL)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    static = module.analytic_control()
    flat = module.reference_seeds()
    save('known', dict(polynomial=result, exactInverseSupremum='1', exactDerivativeInverseSupremum='1/2',
                       intervalZeroControl=True, frozenControlSha256=CONTROL_SHA,
                       staticFullVectorControls=static, admittedFlatControls=flat))


def target():
    known_path = OUT/'known.json'
    known_data = json.loads(known_path.read_text())
    assert known_data['passed'] and known_data['instrumentSha256'] == sha(Path(__file__))
    assert sha(ADMISSION) == ADMISSION_SHA
    admission = json.loads(ADMISSION.read_text())
    assert admission['passed']
    references = {row['rung']: row['referenceReceiptSha256'] for row in admission['results']}
    results = []
    for rung in (2, 4):
        path = ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json'
        assert sha(path) == references[rung]
        data = json.loads(path.read_text())
        assert data['passed'] and data['K'] == data['c_f'] == 1
        def read(key):
            return iv(*(mp.mpf(tuple(v)) for v in data['exactIntervalBinaryBounds'][key]))
        radius, beta = read('/R'), read('/beta')
        expected = [(m, 1) for m in range(-5, 1)] + [(m, branch) for m in range(1, rung) for branch in (-1, 1)]
        assert [(r['m'], r['branch']) for r in data['rootRows']] == expected
        rows = []
        for index, row in enumerate(data['rootRows']):
            x = read(f'/rootRows/{index}/v')
            gap = beta*mp.iv.sin(x)-x-row['m']*mp.iv.pi/6
            assert lo(gap) <= 0 <= hi(gap)
            delay = 2*radius*mp.iv.sin(x)
            divisor = 1-beta*mp.iv.cos(x)
            assert lo(abs(divisor)) > 0
            weight = 1/(delay**3*abs(divisor))
            rows.append(dict(delay=delay, a=weight, sigma=(-1)**row['m'], D=divisor))
        W = sum((row['sigma']*row['a'] for row in rows), iv(0))
        A = sum((row['a'] for row in rows), iv(0))
        tail = hi(abs(W)+A)
        limit = mp.ceil(mp.sqrt(tail))+2
        def values(w):
            real, imag = -w*w-W, iv(0)
            for row in rows:
                real += row['a']*mp.iv.cos(w*row['delay'])
                imag -= row['a']*mp.iv.sin(w*row['delay'])
            return real, imag
        result = cover(values, limit, tail)
        print(json.dumps(dict(rung=rung, C0=str(result['C0']), C1=str(result['C1']), cells=len(result['leaves']))), flush=True)
        results.append(dict(rung=rung, referenceSha256=sha(path), radius=radius, beta=beta, rows=rows, W=W, A=A, **result))
    save('target', dict(knownSha256=sha(known_path), admissionSha256=sha(ADMISSION), results=results,
                       claim='Uniform periodic axial inverse bounds at inherited exact flat references; no nonlinear root chart or stability claim'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=('known', 'target'), required=True)
    args = parser.parse_args()
    known() if args.stage == 'known' else target()
