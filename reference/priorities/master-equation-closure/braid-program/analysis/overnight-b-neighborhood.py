"""Outward all-waveform C2 neighborhood certificate, physical time, K=c_f=1."""
import argparse
import hashlib
import json
import time
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[5]
OUT = ROOT / '.local-data/master-equation-closure/overnight-b/neighborhood'
INVERSE = ROOT / '.local-data/master-equation-closure/overnight-b/resolvent/target.json'
INVERSE_SHA = '3585efc5e36fe867de13845d30782e6f27e862a1ee9965f81915a2a32d843f95'
mp.mp.dps = 110
mp.iv.dps = 80


def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a, b=None): return mp.iv.mpf([a, a if b is None else b])
def lo(x): return mp.mpf(x._mpi_[0])
def hi(x): return mp.mpf(x._mpi_[1])
def sign(x): return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def read(x): return I(*(mp.mpf(tuple(v)) for v in x['binary']))
def dot(a,b): return sum((u*v for u,v in zip(a,b)),I(0))


def encode(x):
    if isinstance(x, dict): return {k:encode(v) for k,v in x.items()}
    if isinstance(x, (list,tuple)): return [encode(v) for v in x]
    if hasattr(x,'_mpi_'): return dict(binary=[list(v) for v in x._mpi_],display=[mp.nstr(lo(x),35),mp.nstr(hi(x),35)])
    if hasattr(x,'_mpf_'): return dict(binaryPoint=list(x._mpf_),display=mp.nstr(x,35))
    return x


def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode(dict(passed=True,instrumentSha256=sha(Path(__file__)),K=1,c_f=1,
                                      timeUTC=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),**data)),indent=2)+'\n')
    print(json.dumps(dict(stage=stage,receipt=str(p),sha256=sha(p))),flush=True)


def geometry(d,j,R,omega,e):
    # Independent intervals enclose every allowed receiving/emitting waveform jet.
    E=I(-e,e);r=R+E;rs=R+E
    angle=j*mp.iv.pi/3-(omega+E)*d+I(-2*e,2*e)
    c,s=mp.iv.cos(angle),mp.iv.sin(angle)
    rate=omega+I(-2*e,2*e)
    q=[r-rs*c,-rs*s,I(-2*e,2*e)]
    vs=[E*c-rs*rate*s,E*s+rs*rate*c,E]
    vr=[E,r*rate,E]
    gap=sum((u**2 for u in q),I(0))-d**2
    gd=2*dot(q,vs)-2*d
    return gap,gd,q,vs,vr


def complement(fun,a,b,depth=0):
    X=I(a,b);f,fd=fun(X)[:2]
    if sign(f): return [dict(d=X,gap=f,reason='strict sign')]
    fa,fb=fun(I(a))[0],fun(I(b))[0]
    if sign(fd) and sign(fa)==sign(fb)!=0:
        return [dict(d=X,derivative=fd,endpoints=[fa,fb],reason='monotone endpoints')]
    assert depth<30,('unresolved complement',str(a),str(b))
    mid=(a+b)/2
    return complement(fun,a,mid,depth+1)+complement(fun,mid,b,depth+1)


def admit(fun,X):
    fa,fb=fun(I(lo(X)))[0],fun(I(hi(X)))[0];fd=fun(X)[1]
    assert sign(fa)*sign(fb)==-1 and sign(fd),('unresolved root',X)
    original=X
    for _ in range(16):
        m=(lo(X)+hi(X))/2
        new=I(m)-fun(I(m))[0]/fun(X)[1]
        a,b=max(lo(X),lo(new)),min(hi(X),hi(new))
        assert a<=b
        if b-a>mp.mpf('.999')*(hi(X)-lo(X)): break
        X=I(a,b)
    return dict(box=original,endpoints=[fa,fb],derivative=fd,refined=X)


def guards(R,omega,e):
    rmax=hi(R+I(e));rmin=lo(R-I(e))
    wmax=hi(omega+I(2*e));wmin=lo(omega-I(2*e))
    vmin=I(rmin)*I(wmin)
    vmax=mp.iv.sqrt(I(2*e*e)+(I(rmax)*I(wmax))**2)
    ar=I(e)+I(rmax)*I(wmax)**2
    at=2*I(e)*I(wmax)+I(rmax)*I(e)
    amax=mp.iv.sqrt(ar**2+at**2+I(e)**2)
    recent=min(mp.mpf('.001'),lo((vmin-1)/amax),lo(I(rmin)/(2*(vmax+1))))
    assert recent>0
    self_floor=vmin-amax*I(recent)/2
    partner_floor=I(rmin)-(vmax+1)*I(recent)
    assert lo(self_floor)>1 and lo(partner_floor)>0
    remote=2*mp.iv.sqrt(I(rmax)**2+I(e)**2)
    end=hi(remote)+mp.mpf('.01')
    return dict(recent=recent,selfSecantFloor=self_floor,partnerGapFloor=partner_floor,
                speedUpper=vmax,accelerationUpper=amax,remoteBound=remote,end=end)


def known():
    # Exact static channel at separation two, including all complement intervals.
    fun=lambda d:(I(4)-d**2,-2*d)
    root=admit(fun,I('1.9','2.1'))
    assert lo(root['refined'])<=2<=hi(root['refined'])
    leaves=complement(fun,mp.mpf(0),mp.mpf('1.9'))+complement(fun,mp.mpf('2.1'),mp.mpf(3))
    # Full static hexagon: all five partner roots and zero self; Cartesian closed form.
    acc=[I(0),I(0),I(0)];counts=[]
    for j in range(1,6):
        d=2*mp.iv.sin(j*mp.iv.pi/6)
        _,_,q,vs,vr=geometry(d,j,I(1),I(0),mp.mpf(0))
        D=1-dot(q,vs)/d
        assert lo(D)==hi(D)==1 and lo(dot(q,[a-b for a,b in zip(vr,vs)]))==0
        for k in range(3): acc[k]+=(-1)**j*q[k]/(d**3*abs(D))
        counts.append(1)
    expected=-I(5)/4+1/mp.iv.sqrt(I(3))
    assert lo(acc[0]-expected)<=0<=hi(acc[0]-expected)
    assert all(lo(v)<=0<=hi(v) for v in acc[1:])
    # Self at rest has gap -d^2<0 for every d>0 analytically.
    assert hi(geometry(I('.1','.2'),0,I(1),I(0),mp.mpf(0))[0])<0
    save('known',dict(staticRoot=root,complement=leaves,staticHexagonAcceleration=acc,
                       staticHexagonExpected=expected,partnerCounts=counts,selfAtRestNoPositiveRoot=True))


def target(e):
    kp=OUT/'known.json';k=json.loads(kp.read_text())
    assert k['passed'] and k['instrumentSha256']==sha(Path(__file__))
    assert sha(INVERSE)==INVERSE_SHA
    source=json.loads(INVERSE.read_text());results=[]
    for ref in source['results']:
        R,beta=read(ref['radius']),read(ref['beta']);omega=beta/R
        g=guards(R,omega,e);channels=[];E=I(0);B=I(0)
        # Accepted half-chord label m maps to physical source j=m mod 6.
        rung=ref['rung'];labels=[m for m in range(-5,1)]+[m for m in range(1,rung) for _ in (-1,1)]
        for j in range(6):
            rows=[(m,row) for m,row in zip(labels,ref['rows']) if m%6==j]
            rows.sort(key=lambda mr:lo(read(mr[1]['delay'])))
            fun=lambda d:geometry(d,j,R,omega,e)
            left=g['recent'];excluded=[];certified=[]
            for m,row in rows:
                d0=read(row['delay']);a0=read(row['a'])
                box=I(lo(d0)-mp.mpf('.0001'),hi(d0)+mp.mpf('.0001'))
                assert lo(box)>left
                root=admit(fun,box)
                excluded+=complement(fun,left,lo(box));left=hi(box)
                d=root['refined'];_,gd,q,vs,vr=fun(d)
                D=1-dot(q,vs)/d
                assert sign(D) and sign(D)==-sign(gd)
                a=1/(d**3*abs(D))
                dp=dot(q,[u-v for u,v in zip(vr,vs)])/(d*D)
                eps=hi(abs(a-a0));delta=hi(abs(d-d0));eta=hi(abs(dp))
                assert eta<1
                E+=I(eps)
                B+=(a0+I(eps))*I(delta)/mp.iv.sqrt(1-I(eta))
                certified.append(dict(m=m,**root,D=D,a=a,delayDerivative=dp,
                                      coefficientDifference=eps,delayDifference=delta,eta=eta))
            excluded+=complement(fun,left,g['end'])
            channels.append(dict(source=j,roots=certified,complement=excluded))
        C0=I(ref['C0']['display']);C1=I(ref['C1']['display'])
        criterion=2*C0*E+C1*B
        assert hi(criterion)<1,('contraction unresolved',criterion)
        result=dict(rung=rung,epsilon=e,guards=g,channels=channels,E=E,B=B,C0=C0,C1=C1,criterion=criterion,
                    rootCount=sum(len(c['roots']) for c in channels),selfCount=len(channels[0]['roots']))
        results.append(result)
        print(json.dumps(dict(rung=rung,epsilon=str(e),criterionUpper=mp.nstr(hi(criterion),20),
                              roots=result['rootCount'],complementLeaves=sum(len(c['complement']) for c in channels))),flush=True)
    save('target',dict(knownSha256=sha(kp),inverseReceiptSha256=sha(INVERSE),results=results,
                       claim='Uniform complete root chart and sufficient axial exclusion for the declared absolute-time C2 waveform box'))


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    p.add_argument('--epsilon',default='0.0000001');args=p.parse_args()
    known() if args.stage=='known' else target(mp.mpf(args.epsilon))
