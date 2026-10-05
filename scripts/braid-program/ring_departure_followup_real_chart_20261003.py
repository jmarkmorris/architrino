#!/usr/bin/env python3
"""Complete physical root chart for a certified ancient-history tube.

Known static gap cover before target. Consumes frozen outward analytic caps.
No root omission, nonlinear integration, or equation modification.
"""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/real-chart'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
CERT_SHA='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
BALL=ROOT/'.local-data/ring-followup/departure/tail-domain/candidate-001.json'
BALL_SHA='6943ba0aefe09dc01a74a0583c0937c7a770e10e60a8eddc47ac81486ef87de5'
mp.mp.dps=160;mp.iv.dps=100
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def cap(x):return I(hi(x))
def iv(p,k):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def packet(x):return mp.iv.mpf([mp.mpf(tuple(v)) for v in x['binary']])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)
def cover(a,b,func,floor):
    initial_a,initial_b=a,b;pending=[(a,b,0)];out=[];visited=0
    while pending:
        a,b,depth=pending.pop();visited+=1;val=func(I(a,b))
        if lo(val)>floor or hi(val)<-floor:out.append({'delay':I(a,b),'gapSquare':val,'depth':depth})
        else:
            assert depth<45 and visited<400000
            c=(a+b)/2;pending.extend([(c,b,depth+1),(a,c,depth+1)])
    out.sort(key=lambda v:lo(v['delay']))
    assert lo(out[0]['delay'])<=initial_a and hi(out[-1]['delay'])>=initial_b
    assert all(hi(a['delay'])>=lo(b['delay']) for a,b in zip(out,out[1:]))
    return out
def known():
    pieces=cover(mp.mpf('.1'),mp.mpf('1.9'),lambda d:4-d*d,mp.mpf('.3'))+cover(mp.mpf('2.1'),mp.mpf(3),lambda d:4-d*d,mp.mpf('.3'))
    assert len(pieces)==2 and lo(pieces[0]['gapSquare'])>0 and hi(pieces[1]['gapSquare'])<0
    # Independently exact static receiver movement +/-b: |Q|^2 variation.
    b=I('.001');bound=4*b+b*b
    direct=(2+b)**2-4
    assert lo(bound)>0 and lo(direct)<=hi(bound) and lo(bound)<=hi(direct)
    save('known',{'passed':True,'staticRootComplement':pieces,'staticGapChangeCap':bound,'staticRoot':2,'D':1})
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(CERT)==CERT_SHA and sha(BALL)==BALL_SHA
    p=json.loads(CERT.read_text());ball=json.loads(BALL.read_text());assert p['passed'] and ball['passed']
    R,W,Beta=iv(p,'/R'),iv(p,'/Omega'),iv(p,'/betaBracket')
    b0=packet(ball['physicalPositionCap']);b1=packet(ball['physicalVelocityCap'])
    Hchange=cap(8*b0+4*b0*b0);Hpchange=cap(4*cap(Beta)*b0+4*cap(R)*b1+4*b0*b1)
    active=[[] for _ in range(6)]
    for n,row in enumerate(p['rootEnclosures']):
        d=iv(p,f'/rootEnclosures/{n}/delay')
        active[row['m']%6].append((lo(d)-mp.mpf('.04'),hi(d)+mp.mpf('.04'),n))
    charts=[];Dlower=[]
    for j in range(6):
        alpha=j*mp.iv.pi/3
        H=lambda d:2*R*R*(1-mp.iv.cos(alpha-W*d))-d*d
        Hp=lambda d:-2*R*R*W*mp.iv.sin(alpha-W*d)-2*d
        brackets=sorted(active[j]);boxes=[];outside=[];start=mp.mpf('.1')
        for a,b,n in brackets:
            assert start<a<b<3
            outside.extend(cover(start,a,H,hi(Hchange)));start=b
            left,right,slope=H(I(a)),H(I(b)),Hp(I(a,b))
            assert (lo(left)>hi(Hchange) and hi(right)<-hi(Hchange)) or (hi(left)<-hi(Hchange) and lo(right)>hi(Hchange))
            assert lo(slope)>hi(Hpchange) or hi(slope)<-hi(Hpchange)
            floor=I(lo(abs(slope)))-Hpchange;Dfloor=floor/(2*I(b))
            assert lo(Dfloor)>0;Dlower.append(Dfloor)
            boxes.append({'row':n,'delay':I(a,b),'leftGapSquare':left,'rightGapSquare':right,
               'derivative':slope,'perturbedDerivativeAbsoluteLower':floor,'perturbedDAbsoluteLower':Dfloor})
        outside.extend(cover(start,mp.mpf(3),H,hi(Hchange)))
        charts.append({'source':j,'active':boxes,'inactiveComplement':outside})
    # Recent self hits are excluded using the component along the old tangent.
    # secant >= beta*(1-(Omega*d)^2/6)-velocity tube; d <= .1.
    recentSelf=Beta*(1-(cap(W)*I('.1'))**2/6)-b1-1
    recentPartner=R-2*b0-(cap(Beta)+b1+1)*I('.1')
    remote=2*(cap(R)+b0)
    assert lo(recentSelf)>0 and lo(recentPartner)>0 and hi(remote)<3
    speedLower=I(lo(Beta))-b1
    collisionLower=I(lo(R))-2*b0
    assert lo(speedLower)>1 and lo(collisionLower)>0
    save('target',{'passed':True,'certificateSha256':sha(CERT),'analyticBallSha256':sha(BALL),
      'certifiedQRadius':packet(ball['epsilon']),'completeChart':charts,'physicalPositionCap':b0,'physicalVelocityCap':b1,
      'gapSquareChangeCap':Hchange,'gapSquareDerivativeChangeCap':Hpchange,
      'recentSelfMargin':recentSelf,'recentPartnerMargin':recentPartner,'remoteDelayUpper':remote,
      'minimumTransmitterAbsoluteLower':I(min(lo(v) for v in Dlower)),
      'memberSpeedLower':speedLower,'simultaneousPartnerSeparationLower':collisionLower,
      'rootsPerReceiver':8,'directedRoots':48,'positiveDelaySelfRootsPerReceiver':1,
      'scope':'all real q in [-.001,.001], entire past q(T-d)=q(T)e^-lambda*d; no later event claim'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else target()
