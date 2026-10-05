#!/usr/bin/env python3
"""Outward observables of a separately certified complete ancient history.

Known exact circle/static-exponential controls before targets. No polynomial
evaluation outside its consumed analytic and physical domain.
"""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/observables'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
BALL=ROOT/'.local-data/ring-followup/departure/centered-domain/candidate-006.json'
CHART=ROOT/'.local-data/ring-followup/departure/centered-real-chart/target.json'
HASHES={CERT:'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6',JETS:'1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18',BALL:'43e704c435765c124956c21e897aa51602cb6fb9e8613773192df7abf66ad9cc',CHART:'27776e3fb1a2d96216c4655f1e1ea12d03d8f767144252ac317bbd1ef0f742db'}
mp.mp.dps=160;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def packet(v):return mp.iv.mpf([mp.mpf(tuple(t)) for t in v['binary']])
def iv(p,k):return mp.iv.mpf([mp.mpf(tuple(t)) for t in p['exactIntervalBinaryBounds'][k]])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),70),mp.nstr(hi(x),70)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,75)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'sha256':sha(p),'path':str(p.relative_to(ROOT))}))
def poly(c,q,power=0):
    value=I(0)
    for n in range(len(c)-1,-1,-1):value=value*q+c[n]*I(n)**power
    return value
def state(Y,E,lam,w):
    V=[lam*E[0]-w*Y[1],lam*E[1]+w*Y[0]]
    radius=mp.iv.sqrt(Y[0]**2+Y[1]**2);speed=mp.iv.sqrt(V[0]**2+V[1]**2)
    action=Y[0]*V[1]-Y[1]*V[0]
    return {'rotatingPosition':Y,'rotatingVelocity':V,'radius':radius,'speed':speed,
      'radiusTimesSpeed':radius*speed,'orientedAngularBookkeepingPerMember':action,
      'instantaneousAngularRate':action/(radius*radius),'radialVelocity':lam*(Y[0]*E[0]+Y[1]*E[1])/radius}
def known():
    circle=state([I(1),I(0)],[I(0),I(0)],I(1),I(2))
    assert lo(circle['radius'])<=1<=hi(circle['radius']) and lo(circle['speed'])<=2<=hi(circle['speed'])
    assert lo(circle['orientedAngularBookkeepingPerMember'])<=2<=hi(circle['orientedAngularBookkeepingPerMember'])
    exponential=state([I('2.1'),I(0)],[I('.1'),I(0)],I(1),I(0))
    assert lo(exponential['radialVelocity'])<=mp.mpf('.1')<=hi(exponential['radialVelocity'])
    e=I('.1');actual=poly([I(1),I(2),I(1)],e,1);exact=2*e*(1+e)
    assert lo(actual)<=hi(exact) and lo(exact)<=hi(actual)
    save('known',{'passed':True,'exactUnitCircleOmega2':circle,'staticExponentialDisplacement':exponential})
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    for p,h in HASHES.items():assert sha(p)==h
    cert=json.loads(CERT.read_text());jets=json.loads(JETS.read_text());ball=json.loads(BALL.read_text());chart=json.loads(CHART.read_text())
    assert all(p['passed'] for p in [cert,jets,ball,chart])
    R,w=iv(cert,'/R'),iv(cert,'/Omega');lam=packet(jets['lambdaInterval']);eps=packet(ball['epsilon'])
    tail=packet(ball['tailNormCap']);euler=packet(ball['weightedTailCap'])/21
    coefficients=[[I(0),packet(jets['u1'][i])]+[packet(v['coefficient'][i]) for v in jets['coefficients']] for i in range(2)]
    rows=[]
    for sign in [-1,1]:
        q=sign*eps;rbox=I(-hi(tail),hi(tail));ebox=I(-hi(euler),hi(euler))
        Y=[R+poly(coefficients[0],q)+rbox,poly(coefficients[1],q)+rbox]
        E=[poly(coefficients[i],q,1)+ebox for i in range(2)]
        result=state(Y,E,lam,w);rows.append({'q':q,**result})
    # Tail starts at21. Thus v(q)/q <= tail/eps and Ev(q)/q <= euler/eps
    # on the full real interval, including its removable limit at zero.
    q=I(-hi(eps),hi(eps));rdiv=I(-hi(tail/eps),hi(tail/eps));ediv=I(-hi(euler/eps),hi(euler/eps))
    Pdiv=[poly(c[1:],q)+rdiv for c in coefficients]
    Ediv=[poly([I(n)*c[n] for n in range(1,len(c))],q)+ediv for c in coefficients]
    Y=[R+q*Pdiv[0],q*Pdiv[1]]
    radiusDerivativeDividedQ=lam*(Y[0]*Ediv[0]+Y[1]*Ediv[1])/mp.iv.sqrt(Y[0]**2+Y[1]**2)
    assert lo(radiusDerivativeDividedQ)>0
    advance=mp.iv.log(eps/I('1e-13'))/lam
    save('target',{'passed':True,'inputs':{str(p.relative_to(ROOT)):h for p,h in HASHES.items()},
      'endpoints':rows,'radiusVelocityDividedQ':radiusDerivativeDividedQ,
      'timeFromQ1eMinus13ToEndpoint':advance,
      'monotonicity':'negative q strictly inward and positive q strictly outward; no radial return within certified window',
      'scope':'complete history [-.006,.006] only; no physical event or later fate inferred'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
