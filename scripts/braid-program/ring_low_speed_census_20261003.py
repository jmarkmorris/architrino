#!/usr/bin/env python3
"""Outward low-speed circle signs for declared finite inventories only.
Static and signed-trigonometric controls precede any target. Every partner
root has certified endpoint signs and D>0. No linearization of these
unbalanced circles and no alteration of the unchanged Master Equation.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/low-speed'
mp.mp.dps=85;mp.iv.dps=65
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),55),mp.nstr(hi(x),55)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,60)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
        'c_f':1,'K':1,'pointDps':mp.mp.dps,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))
def known():
    # Exactly static baseline kernel at distance 2 and its radial derivative.
    row=I(1)/I(2)**2;derivative=-I(2)/I(2)**3
    assert lo(row)==hi(row)==mp.mpf(1)/4
    assert lo(derivative)==hi(derivative)==-mp.mpf(1)/4
    controls=[]
    for M in [2,4,6,8,10,12,24]:
        signed=sum((-1)**j/mp.iv.sin(j*mp.iv.pi/M)**2 for j in range(1,M))
        exact=-I(M*M+2)/6
        assert lo(signed)<=lo(exact)<=hi(exact)<=hi(signed)
        controls.append({'members':M,'signedCscSquareSum':signed,'exact':exact})
    save('known',{'passed':True,'staticAcceleration':row,'staticRadialDerivative':derivative,
                  'signedFiniteSumControls':controls})
ROOT_CACHE={}
def root_box(beta,j,M):
    key=(str(beta),j,M)
    if key in ROOT_CACHE:return ROOT_CACHE[key]
    t=mp.pi*j/M
    if beta==0: x=t
    else:
        a,b=t,mp.pi
        for _ in range(250):
            c=(a+b)/2
            if c-beta*mp.sin(c)-t>0:b=c
            else:a=c
        x=(a+b)/2
    radius=mp.mpf('1e-58');a,b=x-radius,x+radius
    f=lambda xx:I(xx)-I(beta)*mp.iv.sin(I(xx))-j*mp.iv.pi/M
    assert hi(f(a))<0 and lo(f(b))>0
    X=I(a,b);D=1-I(beta)*mp.iv.cos(X);assert lo(D)>0
    ROOT_CACHE[key]=X;return X
def coefficients(a,b,M):
    B=I(a,b);ct=ctp=I(0);rows=[]
    for j in range(1,M):
        xl,xh=root_box(a,j,M),root_box(b,j,M)
        # dx/dbeta=sin(x)/D>0 on 0<=beta<=1.
        X=I(lo(xl),hi(xh));s,c=mp.iv.sin(X),mp.iv.cos(X);D=1-B*c
        assert lo(s)>0 and lo(D)>0
        xp=s/D;Dp=-c+B*s*xp;sig=(-1)**j
        ct+=sig*c/(4*s*s*D)
        ctp+=sig*(-(1+c*c)*xp/(4*s**3*D)-c*Dp/(4*s*s*D*D))
        rows.append({'j':j,'x':X,'D':D})
    return ct,ctp,rows
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    reports=[]
    for M in [2,4,6,8,10,12,24]:
        b0=mp.mpf('0.001')
        _,derivative,initial_roots=coefficients(mp.mpf(0),b0,M)
        assert lo(derivative)>0
        accepted=[];todo=[(b0,mp.mpf(1),0)];visited=0
        while todo:
            a,b,depth=todo.pop();visited+=1
            ct,_,rows=coefficients(a,b,M)
            if lo(ct)>0:
                accepted.append({'beta':I(a,b),'Ct':ct,'depth':depth,
                    'minimumDLower':min(lo(r['D']) for r in rows)})
            else:
                assert depth<25 and visited<100000
                mid=(a+b)/2;todo.extend([(mid,b,depth+1),(a,mid,depth+1)])
        accepted.sort(key=lambda r:lo(r['beta']))
        assert lo(accepted[0]['beta'])==b0 and hi(accepted[-1]['beta'])==1
        assert all(hi(l['beta'])==lo(r['beta']) for l,r in zip(accepted,accepted[1:]))
        endpoint,_,endrows=coefficients(mp.mpf(1),mp.mpf(1),M)
        assert lo(endpoint)>0
        reports.append({'members':M,'passed':True,'smallIntervalBeta':I(0,b0),
            'smallIntervalCtDerivative':derivative,'smallIntervalRoots':initial_roots,
            'positiveCtCover':accepted,'visitedBoxes':visited,'acceptedBoxes':len(accepted),
            'maximumDepth':max(r['depth'] for r in accepted),'wakeSpeedCt':endpoint,
            'wakeSpeedPartnerRoots':endrows,'partnerRootsPerReceiver':M-1,
            'directedRootsAtWakeSpeed':M*(M-1),'positiveSelfRootsAtWakeSpeed':0})
        print(json.dumps({'members':M,'acceptedBoxes':len(accepted),'maximumDepth':reports[-1]['maximumDepth']}),flush=True)
    save('target',{'passed':True,'domain':'0<beta<=1, only M=2,4,6,8,10,12,24',
          'grade':'computer-assisted complete interval cover; static point handled analytically',
          'reports':reports,'allEvenInventories':'not established beyond near-rest and census theorems'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
