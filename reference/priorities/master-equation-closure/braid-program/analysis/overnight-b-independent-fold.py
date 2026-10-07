"""Independent scalar root-count certificate for a finite waveform box.

No subject or proposal evaluator is imported. The sole target input is the
authenticated literal parameter record; all root brackets are found anew.
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
OUT = ROOT/'.local-data/master-equation-closure/overnight-b/independent-fold'
TRIAL = ROOT/'.local-data/master-equation-closure/overnight-b/finite-search/search-H0.2-start0.json'
TRIAL_SHA = '84bbc04c3f65beee68864e7609951fbf31a647b0f20901fb74bc577662f213de'
mp.mp.dps = 120
mp.iv.dps = 85
START = time.monotonic()


def timeout(*_):
    raise TimeoutError('60 second independent-fold bound')


signal.signal(signal.SIGALRM, timeout)
signal.alarm(60)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def I(a, b=None):
    return mp.iv.mpf([a, a if b is None else b])


def low(x):
    return mp.mpf(x._mpi_[0])


def high(x):
    return mp.mpf(x._mpi_[1])


def sign(x):
    return 1 if low(x)>0 else -1 if high(x)<0 else 0


def encode(x):
    if isinstance(x, dict):
        return {k:encode(v) for k,v in x.items()}
    if isinstance(x, (list, tuple)):
        return [encode(v) for v in x]
    if hasattr(x, '_mpi_'):
        return {'binary':[list(v) for v in x._mpi_],
                'display':[mp.nstr(low(x), 40), mp.nstr(high(x), 40)]}
    if hasattr(x, '_mpf_'):
        return {'binaryPoint':list(x._mpf_), 'display':mp.nstr(x, 40)}
    return x


def save(stage, payload):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT/(stage+'.json')
    payload = dict(passed=True, instrumentSha256=sha(Path(__file__)), K=1, c_f=1,
                   utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                   wallSeconds=time.monotonic()-START,
                   maxRssHostUnits=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                   arithmeticDps=mp.iv.dps, **payload)
    path.write_text(json.dumps(encode(payload), indent=2)+'\n')
    print(json.dumps({'stage':stage, 'passed':True, 'path':str(path),
                      'sha256':sha(path), 'wallSeconds':payload['wallSeconds']}), flush=True)


def profile(u, q):
    a,b,c,d,e,f,beta,kappa,H = q
    r = 1+a*mp.iv.cos(2*u)+b*mp.iv.sin(2*u)
    ru = -2*a*mp.iv.sin(2*u)+2*b*mp.iv.cos(2*u)
    p = c*mp.iv.cos(2*u)+d*mp.iv.sin(2*u)
    pu = -2*c*mp.iv.sin(2*u)+2*d*mp.iv.cos(2*u)
    z = H*mp.iv.cos(u)+e*mp.iv.cos(3*u)+f*mp.iv.sin(3*u)
    zu = -H*mp.iv.sin(u)-3*e*mp.iv.sin(3*u)+3*f*mp.iv.cos(3*u)
    return r,ru,p,pu,z,zu


def scalar(delta, phase, alpha, q):
    beta,kappa = q[6:8]
    r,_,p,_,z,_ = profile(phase, q)
    s,su,ps,psu,zs,zsu = profile(phase-kappa*delta, q)
    angle = alpha-beta*delta+ps-p
    cosine,sine = mp.iv.cos(angle),mp.iv.sin(angle)
    F = r**2+s**2-2*r*s*cosine+(z-zs)**2-delta**2
    # Differentiate the scalar expression directly, holding reception phase fixed.
    Fd = -2*kappa*(s-r*cosine)*su
    Fd -= 2*r*s*(beta+kappa*psu)*sine
    Fd += 2*kappa*(z-zs)*zsu-2*delta
    return F,Fd


def empty_cover(evaluate, a, b, depth=0):
    X = I(a,b)
    F,Fd = evaluate(X)
    if sign(F):
        return [dict(delay=X, gap=F)]
    Fa,Fb = evaluate(I(a))[0],evaluate(I(b))[0]
    if sign(Fd) and sign(Fa)==sign(Fb)!=0:
        return [dict(delay=X, derivative=Fd, endpoints=[Fa,Fb])]
    assert depth<30, ('unresolved empty interval', a,b)
    mid = (a+b)/2
    return empty_cover(evaluate,a,mid,depth+1)+empty_cover(evaluate,mid,b,depth+1)


def certified_count(evaluate, brackets, end):
    cursor,roots,complement = mp.mpf(0),[],[]
    for a,b in brackets:
        assert cursor<a<b<end
        X = I(a,b)
        Fa,Fb = evaluate(I(a))[0],evaluate(I(b))[0]
        Fd = evaluate(X)[1]
        assert sign(Fa)*sign(Fb)==-1 and sign(Fd), ('uncertified root bracket', a,b)
        complement += empty_cover(evaluate,cursor,a)
        roots.append(dict(delay=X,endpoints=[Fa,Fb],derivative=Fd))
        cursor=b
    complement += empty_cover(evaluate,cursor,end)
    # Retain a complete, gap-free partition of the searched interval.
    all_intervals = sorted([v['delay'] for v in roots+complement],key=low)
    assert low(all_intervals[0])==0 and high(all_intervals[-1])==end
    assert all(high(a)==low(b) for a,b in zip(all_intervals,all_intervals[1:]))
    return dict(count=len(roots),roots=roots,complement=complement)


def discover(nominal, end):
    # Nominal sign changes propose brackets only. Completeness comes exclusively
    # from the subsequent uniform interval root and complement certificates.
    n=256
    nodes=[mp.mpf(i)*end/n for i in range(n+1)]
    values=[sign(nominal(I(x))[0]) for x in nodes]
    assert all(values), 'nominal root on a grid boundary; use another grid'
    return [(nodes[i],nodes[i+1]) for i in range(n) if values[i]*values[i+1]<0]


def contains(x, expected):
    assert low(x)<=high(expected) and low(expected)<=high(x)


def known():
    q=[I(0) for _ in range(9)]
    static=lambda d:scalar(d,I(0),mp.iv.pi,q)
    census=certified_count(static,[(mp.mpf('1.75'),mp.mpf('2.25'))],mp.mpf(4))
    assert census['count']==1
    contains(static(I(2))[0],I(0))
    contains(static(I(2))[1],I(-4))
    # Rotation-only: F=2-2cos(alpha-beta*delta)-delta^2.
    # At alpha=pi/2, beta=2, delta=0, its derivative is exactly -4.
    rotating=q.copy();rotating[6]=I(2)
    contains(scalar(I(0),I(0),mp.iv.pi/2,rotating)[1],I(-4))
    # Radius-only: r=1+(1/8)sin(2phi), kappa=1, alpha=pi.
    # At phi=delta=0, direct derivative is -8*(1/8)=-1.
    radial=q.copy();radial[1]=I(1)/8;radial[7]=I(1)
    contains(scalar(I(0),I(0),mp.iv.pi,radial)[1],I(-1))
    # Height-only: z=cos(phi), phi=0, kappa=1, delta=pi/2.
    # Height contribution derivative is 2; delay term contributes -pi.
    axial=q.copy();axial[7]=I(1);axial[8]=I(1)
    contains(scalar(mp.iv.pi/2,I(0),mp.iv.pi,axial)[1],2-mp.iv.pi)
    # Nominal bracket discovery has a known non-grid root sqrt(2).
    nominal=lambda d:(2-d**2,-2*d)
    proposals=discover(nominal,mp.mpf(4))
    assert len(proposals)==1
    discovered=certified_count(nominal,proposals,mp.mpf(4))
    assert discovered['count']==1
    save('known',dict(staticCompleteCensus=census,staticDerivative='-4',
                      rotationDerivative='-4',radialDerivative='-1',axialDerivative='2-pi',
                      independentDiscoveryControl=discovered))


def target():
    known_path=OUT/'known.json'
    k=json.loads(known_path.read_text())
    assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    assert sha(TRIAL)==TRIAL_SHA
    trial=json.loads(TRIAL.read_text(),parse_float=str)
    assert trial['K']==trial['c_f']==1
    literals=trial['parameters']+[trial['height']]
    nominal=[I(v) for v in literals]
    width=I(1)/2**20
    uncertain=[v+I(-high(width),high(width)) for v in nominal]
    a,b,c,d,e,f,beta,kappa,H=uncertain
    rmin=1-abs(a)-abs(b)
    rmax=1+abs(a)+abs(b)
    zmax=abs(H)+abs(e)+abs(f)
    assert low(rmin)>0 and low(kappa)>0
    present_squared_floor=3*rmin**2
    remote=2*mp.iv.sqrt(rmax**2+zmax**2)
    end=mp.mpf(4)
    assert high(remote)<end
    results=[]
    for numerator in (0,1):
        phase=numerator*mp.iv.pi/4
        approximate=lambda delta:scalar(delta,phase,2*mp.iv.pi/3,nominal)
        uniform=lambda delta:scalar(delta,phase,2*mp.iv.pi/3,uncertain)
        brackets=discover(approximate,end)
        result=certified_count(uniform,brackets,end)
        result['phasePiOver4']=numerator
        results.append(result)
        print(json.dumps({'phasePiOver4':numerator,'roots':result['count'],
                          'complementLeaves':len(result['complement'])}),flush=True)
    assert [r['count'] for r in results]==[3,1]
    save('target',dict(knownSha256=sha(known_path),trialSha256=sha(TRIAL),
                       parameterOrder=['a','b','c','d','e','f','beta','kappa','H'],
                       exactDecimalLiterals=literals,halfwidth=width,
                       parameterBox=uncertain,radiusLower=rmin,
                       positivePresentSquaredGap=present_squared_floor,
                       remoteDelayBound=remote,chartEnd=I(end),results=results,
                       scope='Uniform endpoint census in source j=2 only; paired with compact root-continuation theorem gives nonordinary root for every coefficient vector and every R>0; no generic fold, balance, stability or fate claim'))


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','target'],required=True)
    args=parser.parse_args()
    known() if args.stage=='known' else target()
