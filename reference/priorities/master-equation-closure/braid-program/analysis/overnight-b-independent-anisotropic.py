"""Independent anisotropic scalar-gap certificate; no subject imports."""
import argparse
import hashlib
import importlib.util
import json
import resource
import signal
import time
from pathlib import Path

import mpmath as mp

ROOT=Path(__file__).resolve().parents[5]
OUT=ROOT/'.local-data/master-equation-closure/overnight-b/independent-anisotropic'
HELPER=Path(__file__).with_name('overnight-b-independent-neighborhood.py')
HELPER_SHA='173c8c8684d4f4ddc32c730f03653ed33fabaa62a9818652a88750605f364cf4'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA='5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


assert sha(HELPER)==HELPER_SHA
spec=importlib.util.spec_from_file_location('independent_interval_helpers',HELPER)
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
I,lo,hi,sign=m.I,m.lower,m.upper,m.sg
START=time.monotonic()


def timeout(*_):
    raise TimeoutError('60 second independent anisotropic bound')


signal.signal(signal.SIGALRM,timeout)
signal.alarm(60)


def upper_point(x):
    return I(hi(x))


def save(name,data):
    OUT.mkdir(parents=True,exist_ok=True)
    path=OUT/(name+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),helperSha256=sha(HELPER),
                 K=1,c_f=1,utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),
                 wallSeconds=time.monotonic()-START,
                 maxRssHostUnits=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,
                 arithmeticDps=mp.iv.dps,**data)
    path.write_text(json.dumps(m.encode(payload),indent=2)+'\n')
    print(json.dumps(dict(name=name,passed=payload['passed'],path=str(path),
                          sha256=sha(path),wallSeconds=payload['wallSeconds'])),flush=True)


def envelopes(dmax,R,omega,e,h):
    beta=R*omega
    qp=2*e+2*R*e*dmax
    vr=e+omega*e+2*(R+e)*e
    vs=vr+2*beta*e*dmax
    fp=4*R*qp+qp**2
    vertical_speed=4*h
    qv=2*R*vs+beta*qp+qp*vs+2*h*vertical_speed
    playback=2*R*(vr+vs)+2*beta*qp+qp*(vr+vs)+4*h*vertical_speed
    return dict(qp=upper_point(qp),vr=upper_point(vr),vs=upper_point(vs),
                fp=upper_point(fp),heightSquared=4*h**2,
                qv=upper_point(qv),playback=upper_point(playback))


def gap(d,j,R,omega,e,h):
    env=envelopes(I(hi(d)),R,omega,e,h)
    error=I(-hi(env['fp']),hi(env['fp']+env['heightSquared']))
    F=m.flat_gap(d,j,R,omega)+error
    derivative=m.flat_derivative(d,j,R,omega)+I(-2*hi(env['qv']),2*hi(env['qv']))
    return F,derivative


def empty_cover(a,b,j,R,omega,e,h,depth=0):
    X=I(a,b)
    F,Fd=gap(X,j,R,omega,e,h)
    if sign(F):
        return [dict(delay=X,gap=F)]
    Fa,Fb=gap(I(a),j,R,omega,e,h)[0],gap(I(b),j,R,omega,e,h)[0]
    if sign(Fd) and sign(Fa)==sign(Fb)!=0:
        return [dict(delay=X,derivative=Fd,endpoints=[Fa,Fb])]
    assert depth<30,('complement unresolved',j,a,b)
    mid=(a+b)/2
    return empty_cover(a,mid,j,R,omega,e,h,depth+1)+empty_cover(mid,b,j,R,omega,e,h,depth+1)


def bracket(d0,j,R,omega,e,h,left,right):
    for power in range(12,2,-1):
        pad=mp.mpf(1)/2**power
        X=I(lo(d0)-pad,hi(d0)+pad)
        if lo(X)<=left or hi(X)>=right:
            continue
        Fa,Fb=gap(I(lo(X)),j,R,omega,e,h)[0],gap(I(hi(X)),j,R,omega,e,h)[0]
        Fd=gap(X,j,R,omega,e,h)[1]
        if sign(Fa)*sign(Fb)==-1 and sign(Fd):
            return dict(box=X,endpoints=[Fa,Fb],derivative=Fd)
    raise AssertionError(('no ordinary root bracket',j,lo(d0),hi(d0)))


def refine(box,d0,j,R,omega,e,h):
    X=box
    for _ in range(24):
        env=envelopes(I(hi(X)),R,omega,e,h)
        error=I(-hi(env['fp']),hi(env['fp']+env['heightSquared']))
        derivative=m.flat_derivative(X,j,R,omega)
        assert sign(derivative)
        # F0(d)-F0(d0)=-error and d0 is an exact inherited root.
        candidate=d0-error/derivative
        a,b=max(lo(X),lo(candidate)),min(hi(X),hi(candidate))
        assert a<=b
        old_width=hi(X)-lo(X)
        X=I(a,b)
        if b-a>=mp.mpf('.999')*old_width:
            break
    return X


def known():
    R,omega,e,h=I(1),I(0),I(0),I(0)
    d0=I(2)
    root=bracket(d0,3,R,omega,e,h,mp.mpf(0),mp.mpf(4))
    refined=refine(root['box'],d0,3,R,omega,e,h)
    assert lo(refined)<=2<=hi(refined)
    F,Fd=gap(I(2),3,R,omega,e,h)
    assert lo(F)<=0<=hi(F) and lo(Fd)==hi(Fd)==-4
    leaves=empty_cover(mp.mpf(0),lo(root['box']),3,R,omega,e,h)
    leaves+=empty_cover(hi(root['box']),mp.mpf(4),3,R,omega,e,h)
    # Static opposite heights +/-h: the exact delay is sqrt(4+4h^2).
    h=I(1)/16
    elevated=bracket(d0,3,R,omega,e,h,mp.mpf(0),mp.mpf(4))
    enclosure=refine(elevated['box'],d0,3,R,omega,e,h)
    exact=mp.iv.sqrt(4+4*h**2)
    assert lo(enclosure)<=lo(exact) and hi(enclosure)>=hi(exact)
    env=envelopes(I(3),R,omega,e,h)
    assert lo(env['fp'])==hi(env['fp'])==0
    assert lo(env['qv'])==hi(env['qv'])==8*hi(h)**2
    assert lo(env['playback'])==hi(env['playback'])==16*hi(h)**2
    discs=m.frequency_discs(lambda w:(1-w**2,2*w),lambda b:2*mp.iv.sqrt(1+b**2),
                            mp.mpf(4),mp.mpf(2),mp.mpf(2))
    assert m.absfloor(I(1)-I(1)**2)==m.absfloor(I(0))==0
    save('known',dict(passed=True,staticRoot=root,staticRefinement=refined,
                      staticComplement=leaves,staticDerivative='-4',
                      elevatedStaticRoot=elevated,elevatedRefinement=enclosure,
                      exactElevatedRoot=exact,verticalDotBound=env['qv'],
                      verticalPlaybackBound=env['playback'],polynomialDiscs=discs,
                      polynomialExactSuprema=['1','1/2'],imaginaryZeroRejected=True))


def spectral(rows,rung):
    A=sum((v['a0'] for v in rows),I(0))
    W=sum(((-1)**v['m']*v['a0'] for v in rows),I(0))
    Ad=sum((v['a0']*v['d0'] for v in rows),I(0))
    Q=upper_point(A+abs(W))
    L=mp.mpf(1)
    while L**2<=2*hi(Q):
        L*=2
    C0box,C1box=(I(1)/4,I(4)/5) if rung==2 else (I(1)/40,I(3)/10)
    # Accept discs against lower endpoints; evaluate the final criterion with
    # outward intervals containing the exact rational constants.
    C0,C1=lo(C0box),lo(C1box)
    def value(w):
        real,imag=-w**2-W,I(0)
        for row in rows:
            real+=row['a0']*mp.iv.cos(w*row['d0'])
            imag-=row['a0']*mp.iv.sin(w*row['d0'])
        return real,imag
    discs=m.frequency_discs(value,lambda b:2*b+Ad,L,C0,C1)
    # Use the sharp quadratic tail ratios, decreasing for w>sqrt(Q).
    tail0=1/(I(L)**2-Q)
    tail1=I(L)/(I(L)**2-Q)
    assert hi(tail0)<=C0 and hi(tail1)<=C1
    return dict(C0=C0box,C1=C1box,outerFrequency=I(L),tailC0=tail0,tailC1=tail1,
                unsignedSum=A,signedSum=W,discs=discs)


def certify(rung,power,admission):
    path=ROOT/f'.local-data/ring-exploration/stability/T{rung:02d}-certificate.json'
    admitted=next(row['referenceReceiptSha256'] for row in admission['results'] if row['rung']==rung)
    assert sha(path)==admitted
    data=json.loads(path.read_text())
    assert data['passed'] and data['K']==data['c_f']==1
    R,beta=m.exact_interval(data,'/R'),m.exact_interval(data,'/beta')
    omega=beta/R
    expected=[(n,1) for n in range(-5,1)]+[(n,b) for n in range(1,rung) for b in (-1,1)]
    assert [(v['m'],v['branch']) for v in data['rootRows']]==expected
    rows=[]
    for i,row in enumerate(data['rootRows']):
        x=m.exact_interval(data,f'/rootRows/{i}/v')
        residual=beta*mp.iv.sin(x)-x-row['m']*mp.iv.pi/6
        assert lo(residual)<=0<=hi(residual)
        d0=2*R*mp.iv.sin(x)
        D0=1-beta*mp.iv.cos(x)
        assert sign(D0)
        rows.append(dict(m=row['m'],source=row['m']%6,d0=d0,D0=D0,a0=1/(d0**3*abs(D0))))
    spec=spectral(rows,rung)
    e,h=I(1)/2**20,I(1)/2**power
    v,a=4*h,16*h
    recent,end=mp.mpf(1)/64,mp.mpf(4)
    vmax=e+(R+e)*(omega+2*e)+v
    vmin=(R-e)*(omega-2*e)
    amax=e+(R+e)*(omega+2*e)**2+2*e*(omega+2*e)+(R+e)*e+a
    self_floor=vmin-amax*I(recent)/2
    partner_floor=R-e-(vmax+1)*I(recent)
    remote=2*mp.iv.sqrt((R+e)**2+h**2)
    assert lo(self_floor)>1 and lo(partner_floor)>0 and hi(remote)<end
    channels=[]
    E,B=I(0),I(0)
    for j in range(6):
        grouped=sorted((row for row in rows if row['source']==j),key=lambda r:lo(r['d0']))
        roots,complement=[],[]
        cursor=recent
        for index,row in enumerate(grouped):
            next_bound=lo(grouped[index+1]['d0']) if index+1<len(grouped) else end
            proof=bracket(row['d0'],j,R,omega,e,h,cursor,next_bound)
            complement+=empty_cover(cursor,lo(proof['box']),j,R,omega,e,h)
            cursor=hi(proof['box'])
            d=refine(proof['box'],row['d0'],j,R,omega,e,h)
            env=envelopes(I(hi(d)),R,omega,e,h)
            Dflat=1+R**2*omega*mp.iv.sin(j*mp.iv.pi/3-omega*d)/d
            Derr=upper_point(env['qv']/I(lo(d)))
            D=Dflat+I(-hi(Derr),hi(Derr))
            assert sign(D)==sign(row['D0'])
            coefficient=1/(d**3*abs(D))
            coefficient_error=upper_point(abs(coefficient-row['a0']))
            delta=upper_point(abs(d-row['d0']))
            eta=upper_point(env['playback']/(I(lo(d))*I(m.absfloor(D))))
            assert hi(eta)<1,('playback sufficient estimate failed',rung,j,eta)
            E+=coefficient_error
            B+=(row['a0']+coefficient_error)*delta/mp.iv.sqrt(1-eta)
            roots.append(dict(**row,**proof,refinedDelay=d,envelope=env,Dflat=Dflat,Derror=Derr,
                              D=D,coefficient=coefficient,coefficientError=coefficient_error,
                              delta=delta,eta=eta))
        complement+=empty_cover(cursor,end,j,R,omega,e,h)
        pieces=sorted([r['box'] for r in roots]+[c['delay'] for c in complement],key=lo)
        assert lo(pieces[0])==recent and hi(pieces[-1])==end
        assert all(hi(a)==lo(b) for a,b in zip(pieces,pieces[1:]))
        channels.append(dict(source=j,roots=roots,complement=complement))
    criterion=2*spec['C0']*E+spec['C1']*B
    return dict(rung=rung,heightPower=power,passed=hi(criterion)<1,
                referenceSha256=sha(path),radius=R,beta=beta,omega=omega,
                planarEpsilon=e,height=h,verticalSpeed=v,verticalAcceleration=a,
                selfSecantFloor=self_floor,partnerGapFloor=partner_floor,remoteBound=remote,
                recent=I(recent),end=I(end),spectral=spec,channels=channels,E=E,B=B,criterion=criterion,
                rootCount=sum(len(c['roots']) for c in channels),selfCount=len(channels[0]['roots']))


def target(shift):
    kp=OUT/'known.json'
    known=json.loads(kp.read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert known['helperSha256']==sha(HELPER)
    assert sha(ADMISSION)==ADMISSION_SHA
    admission=json.loads(ADMISSION.read_text())
    assert admission['passed'] and admission['K']==admission['c_f']==1
    results=[]
    for rung,power in [(2,5+shift),(4,7+shift)]:
        try:
            result=certify(rung,power,admission)
            print(json.dumps(dict(rung=rung,heightPower=power,passed=result['passed'],
                                  criterionUpper=mp.nstr(hi(result['criterion']),25),
                                  roots=result['rootCount'],selfRoots=result['selfCount'],
                                  frequencyDiscs=len(result['spectral']['discs']))),flush=True)
        except AssertionError as exc:
            result=dict(rung=rung,heightPower=power,passed=False,failedEstimate=str(exc))
            print(json.dumps(result),flush=True)
        results.append(result)
    save('selected' if shift==0 else f'narrower-{shift}',
         dict(passed=all(r['passed'] for r in results),knownSha256=sha(kp),
              admissionSha256=sha(ADMISSION),results=results,
              claim='Independent anisotropic complete-root chart and sufficient nonlinear axial exclusion; no phase amplitude bound; inherited exact reference premises; no stability or fate'))


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','target'],required=True)
    parser.add_argument('--height-shift',type=int,default=0)
    args=parser.parse_args()
    assert args.height_shift>=0
    known() if args.stage=='known' else target(args.height_shift)
