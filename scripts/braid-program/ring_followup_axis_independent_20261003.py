"""Independent real-axis component exclusion; no subject contour imports."""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-followup/geometry/independent-axis'
ADMISSION = ROOT / '.local-data/ring-exploration/symmetric-adjudication/target.json'
mp.mp.dps = 130
mp.iv.dps = 100

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def interval(a, b=None):
    return mp.iv.mpf([a, a if b is None else b])

def low(x):
    return mp.mpf(x._mpi_[0])

def high(x):
    return mp.mpf(x._mpi_[1])

def sign(x):
    return 1 if low(x) > 0 else -1 if high(x) < 0 else 0

def encode(x):
    if isinstance(x, dict):
        return {k: encode(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [encode(v) for v in x]
    if hasattr(x, '_mpi_'):
        return {'binary': [list(v) for v in x._mpi_],
                'display': [mp.nstr(low(x), 55), mp.nstr(high(x), 55)]}
    if hasattr(x, '_mpf_'):
        return {'binaryPoint': list(x._mpf_), 'display': mp.nstr(x, 55)}
    return x

def save(stage, data):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / (stage + '.json')
    p.write_text(json.dumps(encode(dict(passed=True, instrumentSha256=sha(Path(__file__)),
                                         K=1, c_f=1, **data)), indent=2) + '\n')
    print(json.dumps(dict(stage=stage, passed=True, receiptSha256=sha(p))), flush=True)

def covers(function, upper):
    leaves = []
    def visit(a, b, depth):
        real, imag = function(interval(a, b))
        selected = real if sign(real) else imag if sign(imag) else None
        if selected is not None:
            margin = low(selected) if sign(selected) > 0 else -high(selected)
            leaves.append(dict(lower=a, upper=b, component='real' if selected is real else 'imaginary',
                               real=real, imaginary=imag, margin=margin))
            return
        assert depth < 45, ('axis component unresolved', a, b)
        mid = (a + b) / 2
        visit(a, mid, depth + 1)
        visit(mid, b, depth + 1)
    visit(mp.mpf(0), mp.mpf(upper), 0)
    assert leaves[0]['lower'] == 0 and leaves[-1]['upper'] == upper
    assert all(leaves[i]['upper'] == leaves[i+1]['lower'] for i in range(len(leaves)-1))
    return leaves

def read(data, key):
    return interval(*(mp.mpf(tuple(v)) for v in data['exactIntervalBinaryBounds'][key]))

def known():
    # F(s)=(s+1/2)^2+1: imaginary part at i*w is w, real at zero is 5/4.
    leaves = covers(lambda w: (interval('1.25')-w*w, w), mp.mpf(20))
    # F(s)=s^2+1 has an imaginary-axis zero at i. The predicate must reject it.
    r, i = interval(1)-interval(1)**2, interval(0)
    assert sign(r) == sign(i) == 0
    # Static and negative-D exact rows at separation two.
    for velocity, expected in [(0, 1), (2, -1)]:
        D = interval(1)-interval(velocity)
        weight = 1/(interval(2)**3*abs(D))
        assert low(D) == high(D) == expected
        assert low(weight) == high(weight) == mp.mpf(1)/8
    # Binary endpoint reconstruction is exercised against a known rational interval.
    v = interval(mp.mpf((0, 3, -2, 2)), mp.mpf((0, 5, -2, 3)))
    assert low(v) == mp.mpf('.75') and high(v) == mp.mpf('1.25')
    save('known', dict(stablePolynomialLeaves=leaves, imaginaryRootRejected=True,
                       staticAndNegativeDWeight='1/8', binaryReaderControl=True))

def target():
    k = json.loads((OUT/'known.json').read_text())
    assert k['passed'] and k['instrumentSha256'] == sha(Path(__file__))
    admission = json.loads(ADMISSION.read_text())
    assert admission['passed']
    references = {x['rung']: x['referenceReceiptSha256'] for x in admission['results']}
    results = []
    for rung in (2, 4):
        path = ROOT / f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json'
        assert sha(path) == references[rung]
        data = json.loads(path.read_text())
        assert data['passed'] and data['K'] == data['c_f'] == 1
        R, beta = read(data, '/R'), read(data, '/beta')
        expected = [(m, 1) for m in range(-5, 1)] + [(m, branch) for m in range(1, rung) for branch in (-1, 1)]
        assert [(v['m'], v['branch']) for v in data['rootRows']] == expected
        rows = []
        for index, row in enumerate(data['rootRows']):
            x = read(data, f'/rootRows/{index}/v')
            gap = beta*mp.iv.sin(x)-x-row['m']*mp.iv.pi/6
            assert low(gap) <= 0 <= high(gap)
            delay = 2*R*mp.iv.sin(x)
            D = 1-beta*mp.iv.cos(x)
            assert sign(D)
            w = (-1)**row['m']/(delay**3*abs(D))
            rows.append(dict(m=row['m'], weight=w, delay=delay, D=D))
        W = sum((v['weight'] for v in rows), interval(0))
        A = sum((abs(v['weight']) for v in rows), interval(0))
        limit = mp.ceil(mp.sqrt(high(A-W)))+1
        assert low(interval(limit)**2-(A-W)) > 0
        def values(omega):
            real = -omega*omega-W
            imag = interval(0)
            for v in rows:
                phase = omega*v['delay']
                real += abs(v['weight'])*mp.iv.cos(phase)
                imag -= abs(v['weight'])*mp.iv.sin(phase)
            return real, imag
        leaves = covers(values, limit)
        results.append(dict(rung=rung, referenceSha256=sha(path), rows=rows,
                            signedWeightSum=W, unsignedWeightSum=A, outerFrequency=limit,
                            outerRealMargin=interval(limit)**2-(A-W), leafCount=len(leaves),
                            minimumComponentMargin=min(v['margin'] for v in leaves), leaves=leaves))
    save('target', dict(knownSha256=sha(OUT/'known.json'), admissionSha256=sha(ADMISSION),
                        results=results, scope='Imaginary-axis exclusion only; no RHP count or finite-amplitude residual'))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=('known', 'target'), required=True)
    args = parser.parse_args()
    known() if args.stage == 'known' else target()
