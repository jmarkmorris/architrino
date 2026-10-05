#!/usr/bin/env python3
"""Complete physical root chart for a certified ancient-history tube.

Known static gap cover before target. Consumes frozen outward analytic caps.
No root omission, nonlinear integration, or equation modification.
"""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/centered-real-chart'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
CERT_SHA='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
BALL=ROOT/'.local-data/ring-followup/departure/centered-domain/candidate-006.json'
BALL_SHA='43e704c435765c124956c21e897aa51602cb6fb9e8613773192df7abf66ad9cc'
JETS=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
JETS_SHA='1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18'
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
    q=I('.001');binomial=polynomial([I(1),I(2),I(1)],q);euler=polynomial([I(1),I(2),I(1)],q,1)
    exact=(1+q)**2;exactEuler=2*q*(1+q)
    assert lo(binomial)<=hi(exact) and lo(exact)<=hi(binomial)
    assert lo(euler)<=hi(exactEuler) and lo(exactEuler)<=hi(euler)
    save('known',{'passed':True,'staticRootComplement':pieces,'staticGapChangeCap':bound,'staticRoot':2,'D':1,'binomialHorner':binomial,'binomialEuler':euler})
def polynomial(c,q,power=0):
    out=I(0)
    for n in range(len(c)-1,-1,-1):out=out*q+c[n]*I(n)**power
    return out
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(CERT)==CERT_SHA and sha(BALL)==BALL_SHA and sha(JETS)==JETS_SHA
    p=json.loads(CERT.read_text());ball=json.loads(BALL.read_text());jets=json.loads(JETS.read_text());assert p['passed'] and ball['passed']
    R,W,Beta=iv(p,'/R'),iv(p,'/Omega'),iv(p,'/betaBracket')
    b0=packet(ball['physicalPositionCap']);b1=packet(ball['physicalVelocityCap'])
    lam=packet(jets['lambdaInterval']);tail=packet(ball['tailNormCap']);weighted=packet(ball['weightedTailCap']);N=20
    rr=I(-hi(tail),hi(tail));er=I(-hi(weighted/I(N+1)),hi(weighted/I(N+1)))
    coefs=[[I(0),packet(jets['u1'][i])]+[packet(v['coefficient'][i]) for v in jets['coefficients']] for i in range(2)]
    delays=[[packet(v) for v in c] for c in jets['delayCoefficients']]
    epsilon=hi(packet(ball['epsilon']));charts=[];Dlower=[];panels=96
    for k in range(panels):
        qa=-epsilon+2*epsilon*k/panels;qb=-epsilon+2*epsilon*(k+1)/panels;q=I(qa,qb)
        recv=[R+polynomial(coefs[0],q)+rr,polynomial(coefs[1],q)+rr]
        for j in range(6):
            alpha=j*mp.iv.pi/3
            def evaluate(d):
                qp=q*mp.iv.exp(-lam*d)
                src=[R+polynomial(coefs[0],qp)+rr,polynomial(coefs[1],qp)+rr]
                ep=[polynomial(coefs[i],qp,1)+er for i in range(2)]
                angle=alpha-W*d;cc=mp.iv.cos(angle);ss=mp.iv.sin(angle)
                pos=[cc*src[0]-ss*src[1],ss*src[0]+cc*src[1]]
                V=[lam*ep[0]-W*src[1],lam*ep[1]+W*src[0]]
                vel=[cc*V[0]-ss*V[1],ss*V[0]+cc*V[1]]
                Q=[recv[i]-pos[i] for i in range(2)]
                return Q[0]**2+Q[1]**2-d*d,2*(Q[0]*vel[0]+Q[1]*vel[1])-2*d
            active=[]
            for n,row in enumerate(p['rootEnclosures']):
                if row['m']%6!=j:continue
                dp=polynomial(delays[n],q)
                padding=mp.mpf('.003')
                active.append((lo(dp)-padding,hi(dp)+padding,n))
            brackets=sorted(active);boxes=[];outside=[];start=mp.mpf('.1')
            for a,b,n in brackets:
                assert start<a<b<3
                outside.extend(cover(start,a,lambda d:evaluate(d)[0],mp.mpf(0)));start=b
                left,right,slope=evaluate(I(a))[0],evaluate(I(b))[0],evaluate(I(a,b))[1]
                assert (lo(left)>0 and hi(right)<0) or (hi(left)<0 and lo(right)>0)
                assert lo(slope)>0 or hi(slope)<0
                Dfloor=I(lo(abs(slope)))/(2*I(b));assert lo(Dfloor)>0;Dlower.append(Dfloor)
                boxes.append({'row':n,'delay':I(a,b),'leftGapSquare':left,'rightGapSquare':right,
                  'derivative':slope,'transmitterAbsoluteLower':Dfloor})
            outside.extend(cover(start,mp.mpf(3),lambda d:evaluate(d)[0],mp.mpf(0)))
            charts.append({'q':q,'source':j,'active':boxes,'inactiveComplement':outside})
        print(json.dumps({'progress':'complete q panel','panel':k+1,'panels':panels}),flush=True)
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
      'qPanels':panels,'polynomialRemainderCap':tail,'firstEulerRemainderCap':weighted/I(N+1),
      'recentSelfMargin':recentSelf,'recentPartnerMargin':recentPartner,'remoteDelayUpper':remote,
      'minimumTransmitterAbsoluteLower':I(min(lo(v) for v in Dlower)),
      'memberSpeedLower':speedLower,'simultaneousPartnerSeparationLower':collisionLower,
      'rootsPerReceiver':8,'directedRoots':48,'positiveDelaySelfRootsPerReceiver':1,
      'scope':'all real q in [-.006,.006], entire past q(T-d)=q(T)e^-lambda*d; no later event claim'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    a=p.parse_args();known() if a.stage=='known' else target()
