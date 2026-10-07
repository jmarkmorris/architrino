"""Independent scalar-envelope and frequency-disc neighborhood certificate.

Only inherited admitted flat-reference intervals are input to the mathematics.
No subject implementation or subject numerical bound is imported.
"""
import argparse
import hashlib
import json
import resource
import signal
import time
from pathlib import Path

import mpmath as mp

ROOT = Path(__file__).resolve().parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight-b/independent'
ADMISSION = ROOT / '.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA = '5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
mp.mp.dps = 120
mp.iv.dps = 85
START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError('45 second bound')))
signal.alarm(45)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def I(a, b=None):
    return mp.iv.mpf([a, a if b is None else b])


def lower(x):
    return mp.mpf(x._mpi_[0])


def upper(x):
    return mp.mpf(x._mpi_[1])


def positive_upper(x):
    return I(upper(x))


def absfloor(x):
    return max(mp.mpf(0), lower(x), -upper(x))


def sg(x):
    return 1 if lower(x) > 0 else -1 if upper(x) < 0 else 0


def encode(x):
    if isinstance(x, dict):
        return {k: encode(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [encode(v) for v in x]
    if hasattr(x, '_mpi_'):
        return {'binary': [list(v) for v in x._mpi_],
                'display': [mp.nstr(lower(x), 40), mp.nstr(upper(x), 40)]}
    if hasattr(x, '_mpf_'):
        return {'binaryPoint': list(x._mpf_), 'display': mp.nstr(x, 40)}
    return x


def save(stage, data):
    OUT.mkdir(parents=True, exist_ok=True)
    payload = dict(passed=True, instrumentSha256=digest(Path(__file__)), K=1, c_f=1,
                   utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                   wallSeconds=time.monotonic()-START,
                   maxRssHostUnits=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                   arithmeticDps=mp.iv.dps, **data)
    path = OUT / (stage + '.json')
    path.write_text(json.dumps(encode(payload), indent=2) + '\n')
    print(json.dumps({'stage': stage, 'passed': True, 'path': str(path),
                      'sha256': digest(path), 'wallSeconds': payload['wallSeconds']}), flush=True)


def exact_interval(data, key):
    return I(*(mp.mpf(tuple(v)) for v in data['exactIntervalBinaryBounds'][key]))


def flat_gap(d, j, R, omega):
    angle = j*mp.iv.pi/3-omega*d
    return 2*R**2*(1-mp.iv.cos(angle))-d**2


def flat_derivative(d, j, R, omega):
    angle = j*mp.iv.pi/3-omega*d
    return -2*R**2*omega*mp.iv.sin(angle)-2*d


def envelopes(dmax, R, omega, eps):
    # |angle-angle0| <= 2 eps d by the physical-time p' bound.
    beta = R*omega
    q = 4*eps+2*R*eps*dmax
    vr = 2*eps+omega*eps+2*(R+eps)*eps
    vs = vr+2*beta*eps*dmax
    f = 4*R*q+q**2
    qv = 2*R*vs+beta*q+q*vs
    playback_numerator = 2*R*(vr+vs)+2*beta*q+q*(vr+vs)
    return dict(q=positive_upper(q), vr=positive_upper(vr), vs=positive_upper(vs),
                f=positive_upper(f), fd=positive_upper(2*qv),
                qv=positive_upper(qv), playback=positive_upper(playback_numerator))


def gap_bounds(d, j, R, omega, eps):
    e = envelopes(I(upper(d)), R, omega, eps)
    return (flat_gap(d, j, R, omega)+I(-upper(e['f']), upper(e['f'])),
            flat_derivative(d, j, R, omega)+I(-upper(e['fd']), upper(e['fd'])))


def root_bracket(box, j, R, omega, eps):
    a, b = lower(box), upper(box)
    ga = gap_bounds(I(a), j, R, omega, eps)[0]
    gb = gap_bounds(I(b), j, R, omega, eps)[0]
    derivative = gap_bounds(box, j, R, omega, eps)[1]
    assert sg(ga)*sg(gb) == -1 and sg(derivative), ('root bracket failed', j, box)
    return dict(box=box, endpoints=[ga, gb], derivative=derivative)


def exclude(a, b, j, R, omega, eps, depth=0):
    box = I(a, b)
    gap, derivative = gap_bounds(box, j, R, omega, eps)
    if sg(gap):
        return [dict(box=box, gap=gap)]
    ga = gap_bounds(I(a), j, R, omega, eps)[0]
    gb = gap_bounds(I(b), j, R, omega, eps)[0]
    if sg(derivative) and sg(ga) == sg(gb) != 0:
        return [dict(box=box, derivative=derivative, endpoints=[ga, gb])]
    assert depth < 30, ('unresolved compact complement', j, a, b)
    mid = (a+b)/2
    return exclude(a, mid, j, R, omega, eps, depth+1)+exclude(mid, b, j, R, omega, eps, depth+1)


def frequency_discs(evaluate, derivative_bound, L, C0, C1):
    leaves = []
    def visit(a, b, depth):
        mid = (a+b)/2
        re, im = evaluate(I(mid))
        norm = mp.iv.sqrt(I(absfloor(re))**2+I(absfloor(im))**2)
        loss = derivative_bound(I(b))*I((b-a)/2)
        margin = I(lower(norm))-loss
        if lower(margin) > 0 and upper(1/margin) <= C0 and upper(I(b)/margin) <= C1:
            leaves.append(dict(frequency=I(a, b), center=I(mid), real=re, imaginary=im,
                               derivativeLoss=loss, modulusFloor=I(lower(margin))))
            return
        assert depth < 30, ('frequency disc unresolved', a, b)
        visit(a, mid, depth+1)
        visit(mid, b, depth+1)
    visit(mp.mpf(0), mp.mpf(L), 0)
    assert lower(leaves[0]['frequency']) == 0 and upper(leaves[-1]['frequency']) == L
    assert all(upper(a['frequency']) == lower(b['frequency']) for a, b in zip(leaves, leaves[1:]))
    return leaves


def known():
    # (s+1)^2 has |H(iw)|=1+w^2, inverse suprema 1 and 1/2.
    discs = frequency_discs(lambda w: (1-w**2, 2*w), lambda b: 2*mp.iv.sqrt(1+b**2),
                             mp.mpf(4), mp.mpf(2), mp.mpf(2))
    # Exact imaginary zero must fail the center-disc test.
    re, im = I(1)-I(1)**2, I(0)
    assert absfloor(re) == absfloor(im) == 0
    # Static diametric source has F=4-d^2 and d=2, all complement covered.
    R, omega, eps = I(1), I(0), I(0)
    bracket = root_bracket(I('1.9', '2.1'), 3, R, omega, eps)
    leaves = exclude(mp.mpf(0), mp.mpf('1.9'), 3, R, omega, eps)
    leaves += exclude(mp.mpf('2.1'), mp.mpf(3), 3, R, omega, eps)
    assert lower(flat_gap(I(2), 3, R, omega)) <= 0 <= upper(flat_gap(I(2), 3, R, omega))
    assert lower(1/(I(2)**3*abs(I(-1)))) == mp.mpf(1)/8
    # Static radius perturbation r=1+e has exact squared-gap change 8e+4e^2.
    e = I(1)/2**24
    bounds = envelopes(I(3), I(1), I(0), e)
    exact_change = 8*e+4*e**2
    assert upper(exact_change) <= lower(bounds['f'])
    # The binary reader must preserve the exact known [3/4,5/4] fixture.
    fixture = {'exactIntervalBinaryBounds': {'/x': [[0, 3, -2, 2], [0, 5, -2, 3]]}}
    x = exact_interval(fixture, '/x')
    assert lower(x) == mp.mpf(3)/4 and upper(x) == mp.mpf(5)/4
    save('known', dict(polynomialExactInverseSuprema=['1', '1/2'], polynomialC0=2,
                       polynomialC1=2, polynomialDiscs=discs, imaginaryZeroRejected=True,
                       staticBracket=bracket, staticComplement=leaves,
                       negativeDivisorWeight='1/8', radiusPerturbationExact=exact_change,
                       radiusPerturbationEnvelope=bounds, binaryReaderPassed=True))


def spectral(rows):
    A = sum((r['a0'] for r in rows), I(0))
    W = sum(((-1)**r['m']*r['a0'] for r in rows), I(0))
    Ad = sum((r['a0']*r['d0'] for r in rows), I(0))
    Q = positive_upper(A+abs(W))
    L = mp.mpf(1)
    while L**2 <= 2*upper(Q):
        L *= 2
    def evaluate(w):
        re, im = -w**2-W, I(0)
        for row in rows:
            re += row['a0']*mp.iv.cos(w*row['d0'])
            im -= row['a0']*mp.iv.sin(w*row['d0'])
        return re, im
    # Conservative fixed bounds; these are independent of subject receipts.
    C0, C1 = mp.mpf(1), mp.mpf(8)
    discs = frequency_discs(evaluate, lambda b: 2*b+Ad, L, C0, C1)
    assert upper(2/I(L)**2) <= C0 and upper(2/I(L)) <= C1
    return dict(C0=I(C0), C1=I(C1), A=A, W=W, outerFrequency=I(L),
                outerQuadraticMargin=I(L)**2-2*Q, discs=discs)


def target():
    kp = OUT/'known.json'
    known_data = json.loads(kp.read_text())
    assert known_data['passed'] and known_data['instrumentSha256'] == digest(Path(__file__))
    assert digest(ADMISSION) == ADMISSION_SHA
    admission = json.loads(ADMISSION.read_text())
    assert admission['passed'] and admission['K'] == admission['c_f'] == 1
    identities = {r['rung']: r['referenceReceiptSha256'] for r in admission['results']}
    eps = I(1)/2**24
    results = []
    for rung in (2, 4):
        path = ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json'
        assert digest(path) == identities[rung]
        data = json.loads(path.read_text())
        assert data['passed'] and data['K'] == data['c_f'] == 1
        R = exact_interval(data, '/R')
        beta = exact_interval(data, '/beta')
        omega = beta/R
        labels = [(m, 1) for m in range(-5, 1)]+[(m, b) for m in range(1, rung) for b in (-1, 1)]
        assert [(r['m'], r['branch']) for r in data['rootRows']] == labels
        rows = []
        for i, r in enumerate(data['rootRows']):
            x = exact_interval(data, f'/rootRows/{i}/v')
            scalar_identity = beta*mp.iv.sin(x)-x-r['m']*mp.iv.pi/6
            assert lower(scalar_identity) <= 0 <= upper(scalar_identity)
            d0 = 2*R*mp.iv.sin(x)
            D0 = 1-beta*mp.iv.cos(x)
            assert sg(D0)
            rows.append(dict(m=r['m'], branch=r['branch'], source=r['m']%6,
                             d0=d0, D0=D0, a0=1/(d0**3*abs(D0))))
        spec = spectral(rows)
        # A fixed dyadic recent interval and a fixed remote endpoint.
        recent, end = mp.mpf(1)/64, mp.mpf(4)
        vmax = 2*eps+(R+eps)*(omega+2*eps)
        vmin = (R-eps)*(omega-2*eps)
        amax = 2*eps+(R+eps)*(omega+2*eps)**2+2*eps*(omega+2*eps)+(R+eps)*eps
        self_floor = vmin-amax*I(recent)/2
        partner_floor = R-eps-(vmax+1)*I(recent)
        remote = 2*mp.iv.sqrt((R+eps)**2+eps**2)
        assert lower(self_floor)>1 and lower(partner_floor)>0 and upper(remote)<end
        E, B = I(0), I(0)
        channels = []
        for j in range(6):
            channel_rows = sorted((r for r in rows if r['source']==j), key=lambda r: lower(r['d0']))
            cursor, roots, complement = recent, [], []
            for row in channel_rows:
                d0, D0 = row['d0'], row['D0']
                pad = mp.mpf(1)/4096
                box = I(lower(d0)-pad, upper(d0)+pad)
                assert lower(box)>cursor
                certificate = root_bracket(box, j, R, omega, eps)
                complement += exclude(cursor, lower(box), j, R, omega, eps)
                cursor = upper(box)
                env = envelopes(I(upper(box)), R, omega, eps)
                flat_floor = absfloor(flat_derivative(box, j, R, omega))
                assert flat_floor>0
                delta = positive_upper(env['f']/I(flat_floor))
                assert upper(delta)<pad
                d = I(lower(d0)-upper(delta), upper(d0)+upper(delta))
                dmin = I(lower(d))
                # Dflat(d)=1+R^2 omega sin(alpha-omega d)/d.
                D_lipschitz = R**2*omega*(omega/dmin+1/dmin**2)
                D_error = positive_upper(env['qv']/dmin+D_lipschitz*delta)
                D = D0+I(-upper(D_error), upper(D_error))
                assert sg(D)==sg(D0)
                a = 1/(d**3*abs(D))
                coefficient_error = positive_upper(abs(a-row['a0']))
                eta = positive_upper(env['playback']/(dmin*I(absfloor(D))))
                assert upper(eta)<1
                E += coefficient_error
                B += (row['a0']+coefficient_error)*delta/mp.iv.sqrt(1-eta)
                roots.append(dict(**row, **certificate, envelope=env, refinedDelay=d,
                                  delta=delta, Derror=D_error, D=D, a=a,
                                  coefficientError=coefficient_error, eta=eta))
            complement += exclude(cursor, end, j, R, omega, eps)
            channels.append(dict(source=j, roots=roots, complement=complement))
        contraction = 2*spec['C0']*E+spec['C1']*B
        assert upper(contraction)<1, ('contraction failed', rung, contraction)
        result = dict(rung=rung, referenceSha256=digest(path), radius=R, beta=beta, omega=omega,
                      epsilon=eps, recent=I(recent), end=I(end), selfSecantFloor=self_floor,
                      partnerGapFloor=partner_floor, remoteBound=remote,
                      spectral=spec, channels=channels, E=E, B=B, contraction=contraction,
                      roots=sum(len(c['roots']) for c in channels), selfRoots=len(channels[0]['roots']))
        results.append(result)
        print(json.dumps({'rung':rung, 'roots':result['roots'], 'selfRoots':result['selfRoots'],
                          'contractionUpper':mp.nstr(upper(contraction), 20),
                          'spectralDiscs':len(spec['discs']),
                          'complementLeaves':sum(len(c['complement']) for c in channels)}), flush=True)
    save('target', dict(knownSha256=digest(kp), admissionSha256=digest(ADMISSION), results=results,
                        boundary='Independent uniform chart and nonlinear axial exclusion in componentwise physical-time C2 box epsilon=2^-24; inherited exact flat references; no nonlinear fate or stability'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=['known', 'target'], required=True)
    args = parser.parse_args()
    known() if args.stage == 'known' else target()
