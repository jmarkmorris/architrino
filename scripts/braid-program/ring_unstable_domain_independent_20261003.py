#!/usr/bin/env python3
"""Separate Cartesian chart and rational-majorant T02 domain adjudication.
No subject code, tensors, nonlinear series, or oracle import. Subject chart
intervals are coverage proposals only. Known analytic controls gate target.
"""
import argparse,hashlib,json,math
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'.local-data/ring-exploration/unstable-domain-independent'
DOC=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-unstable-series-quantitative-domain-2026-10-03.md'
SUB=ROOT/'scripts/braid-program/ring_unstable_quantitative_domain_20261003.py'
TAR=ROOT/'.local-data/ring-exploration/unstable-domain/target.json'
KNOWN=ROOT/'.local-data/ring-exploration/unstable-domain/known.json'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
PREVIOUS=ROOT/'.local-data/ring-exploration/unstable-series-adjudication/target.json'
PINS={DOC:'075ce5f74a06a57a38a365738a464e73ba1f6acf6125b8bf1173e7342ee6c63f',SUB:'6af542e0df962c30b0da29a49d8281b7811514bbf9f49a0ce33a4ae5d9eb2258',TAR:'5d6cb221aa81d24cce7e4e2e2f3926a64a032fd35f193e50e142eb8558721f92',KNOWN:'1ee85688a9c307a55a1e035d85e984c3e6e388f26f18092da6dad00ec6f5f6d9',CERT:'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'}
PINS[PREVIOUS]='0ade2ff8e0613d76cdf06a5c041b6b23530bc044d8818afc1d6b7040ab35e13a'
mp.mp.dps=110;mp.iv.dps=90
I=mp.iv.mpf
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def zero(x):return lo(x)<=0<=hi(x)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def J(a):return [-a[1],a[0]]
def binary(a):return I([mp.mpf(tuple(v)) for v in a['binary']])
def ref(p,k):return I([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def record(stage,payload):
    def enc(x):
        if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'diagnostic':[mp.nstr(lo(x),75),mp.nstr(hi(x),75)]}
        if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
        if isinstance(x,(list,tuple)):return [enc(v) for v in x]
        if x is None or isinstance(x,(str,bool,int)):return x
        return mp.nstr(x,75)
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(enc({'checkerSha256':sha(Path(__file__)),'bindings':{str(p.relative_to(ROOT)):sha(p) for p in PINS},'previousAdjudicationSha256':sha(PREVIOUS),'K':1,'c_f':1,'intervalDigits':90,**payload}),indent=2,sort_keys=True)+'\n');print(json.dumps({'stage':stage,'passed':payload['passed'],'receipt':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)
def exp_series(x,N=24):
    assert lo(x)>=0 and hi(x)<N+2
    partial=sum(x**n/I(math.factorial(n)) for n in range(N+1))
    tail=x**(N+1)/I(math.factorial(N+1))/(1-x/(N+2))
    return partial+I([0,hi(tail)])
def cartgap(R,W,j,d):
    phi=j*mp.iv.pi/3-W*d;y=[R*mp.iv.cos(phi),R*mp.iv.sin(phi)];q=[R-y[0],-y[1]];v=[W*z for z in J(y)]
    return dot(q,q)-d*d,2*dot(q,v)-2*d

def implicit_derivative(x,y,v,a,ui,us,vs):
    q=[x[k]-y[k] for k in range(2)];ell=mp.iv.sqrt(dot(q,q));n=[z/ell for z in q];D=1-dot(n,v);assert sign(D)
    fixed=[ui[k]-us[k] for k in range(2)];dS=-dot(n,fixed)/D;dq=[fixed[k]-v[k]*dS for k in range(2)];de=dot(n,dq);dn=[(dq[k]-n[k]*de)/ell for k in range(2)]
    dv=[vs[k]+a[k]*dS for k in range(2)];dD=-dot(dn,v)-dot(n,dv);w=1/(ell*ell*abs(D))
    return [w*(dn[k]-n[k]*(2*de/ell+dD/D)) for k in range(2)]
def matrix(z,p,R,W):
    A=[[z*z-W*W,-2*W*z],[2*W*z,z*z-W*W]]
    for index,row in enumerate(p['rootEnclosures']):
        d=ref(p,f'/rootEnclosures/{index}/delay');angle=row['m']*mp.iv.pi/3-W*d;c,s=mp.iv.cos(angle),mp.iv.sin(angle);Q=[[c,-s],[s,c]];y=[R*c,R*s];v=[W*k for k in J(y)];a=[-W*W*k for k in y];f=mp.iv.exp(-z*d)
        for col in range(2):
            ui=[I(int(k==col)) for k in range(2)];us=[f*Q[k][col] for k in range(2)];vs=[z*us[k]+W*J(us)[k] for k in range(2)];der=implicit_derivative([R,I(0)],y,v,a,ui,us,vs)
            for k in range(2):A[k][col]-=(-1)**row['m']*der[k]
    return A

def certify_boxes(R,W,j,X,floor):
    stack=[(X,0)];out=[]
    while stack:
        X,depth=stack.pop();h,_=cartgap(R,W,j,X)
        if lo(abs(h))>floor:out.append({'delay':X,'CartesianGapSquare':h,'depth':depth});continue
        assert depth<25,'independent Cartesian chart unresolved'
        mid=(lo(X)+hi(X))/2;stack.extend([(I([lo(X),mid]),depth+1),(I([mid,hi(X)]),depth+1)])
    return out

def known():
    e=exp_series(I('.002'));exact=mp.iv.exp(I('.002'));assert lo(e)<=lo(exact) and hi(e)>=hi(exact)
    # Known constant-distance source chart, root2 and complete complementary signs.
    static=[]
    static_cartesian=[]
    for X in [I(['.1','1.999']),I(['2.001','3'])]:
        H=I(4)-X*X;assert sign(H);static.append(H)
        boxes=certify_boxes(I(1),I(0),3,X,mp.mpf('1e-6'))
        assert len(boxes)==1 and sign(boxes[0]['CartesianGapSquare'])==sign(H)
        assert zero(boxes[0]['CartesianGapSquare']-H)
        static_cartesian.extend(boxes)
    e1=[I(1),I(0)];z=[I(0),I(0)];dr=implicit_derivative([I(2),I(0)],z,z,z,e1,z,z);assert zero(dr[0]+I(1)/4) and zero(dr[1])
    rt=mp.iv.sqrt(2);W=2*rt;negative=implicit_derivative(e1,[I(0),I(-1)],[W,I(0)],[I(0),W*W],e1,z,z);assert zero(negative[0]+5/(4*rt)) and zero(negative[1]+3/(4*rt))
    # n*rho^n <= rho follows from n/2^(n-1)<=1; exercise first20 exactly.
    assert all(I(n).b/I(2**(n-1)).a<=1 for n in range(1,21))
    record('known',{'passed':True,'rationalExponentialEnclosure':e,'analyticExponential':exact,'staticCompleteComplementSigns':static,'staticCartesianComplement':static_cartesian,'staticReceiverDerivative':dr,'negativeDReceiverDerivative':negative,'EulerHalfDiskKnownInequality':True})

def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['checkerSha256']==sha(Path(__file__))
    assert all(sha(p)==h for p,h in PINS.items());subject=json.loads(TAR.read_text());p=json.loads(CERT.read_text());previous=json.loads(PREVIOUS.read_text());assert p['passed'] and previous['passed']
    R,W,Beta=ref(p,'/R'),ref(p,'/Omega'),ref(p,'/betaBracket');Z=binary(previous['lambda'])
    assert lo(R)>.975 and hi(R)<1 and lo(Beta)>mp.mpf('1.826') and hi(Beta)<2 and hi(W)<2 and lo(Z)>10 and hi(Z)<11
    oldB,oldB2=binary(previous['B']),binary(previous['B2']);assert hi(oldB)<mp.mpf('.0036') and hi(oldB2)<mp.mpf('.036')
    A=matrix(Z,p,R,W);leading=[R,-R*A[0][0]/A[0][1]];assert all(hi(abs(v))<1 for v in leading)
    delays=[]
    for index,row in enumerate(p['rootEnclosures']):
        d=ref(p,f'/rootEnclosures/{index}/delay');D=ref(p,f'/rootEnclosures/{index}/D');assert lo(d)>mp.mpf('.3608') and lo(abs(D))>mp.mpf('.1955');delays.append(d)
    assert len(delays)==8
    # Reconstruct every physical squared-gap enclosure from Cartesian points.
    charts=[];proposal_count=0;new_count=0
    for chart in subject['completeChart']:
        j=chart['source'];active=[];pieces=[];inactive=[]
        for item in chart['active']:
            X=binary(item['delay']);L,_=cartgap(R,W,j,I(lo(X)));U,_=cartgap(R,W,j,I(hi(X)));_,der=cartgap(R,W,j,X)
            assert sign(L)*sign(U)==-1 and lo(abs(L))>mp.mpf('1e-6') and lo(abs(U))>mp.mpf('1e-6') and lo(abs(der))>mp.mpf('.05')
            active.append({'delay':X,'leftCartesianGap':L,'rightCartesianGap':U,'CartesianSlope':der});pieces.append(X)
        for item in chart['inactiveComplement']:
            X=binary(item['delay']);pieces.append(X);proposal_count+=1;result=certify_boxes(R,W,j,X,mp.mpf('1e-6'));inactive.extend(result);new_count+=len(result)
        pieces.sort(key=lo);assert lo(pieces[0])<=mp.mpf('.1') and hi(pieces[-1])>=3 and all(hi(a)>=lo(b) for a,b in zip(pieces,pieces[1:]))
        charts.append({'source':j,'active':active,'independentCartesianComplement':inactive,'coveragePassed':True})
    assert proposal_count==188 and sum(len(c['active']) for c in charts)==8
    eta,s,rho,ell,D=map(I,['1e-5','.001','.03','.3608','.1955']);sq=mp.iv.sqrt(2)
    # Separate Taylor/geometric exp majorants, no target analytic numbers read.
    delay_argument=1/exp_series(10*ell-11*s);assert hi(delay_argument)<lo(rho)
    rotation=exp_series(2*s)
    separation=eta+sq*rotation*eta*rho+sq*(rotation-1)
    square_change=2*sq*separation/ell+2*(separation/ell)**2
    invsqrt=1/mp.iv.sqrt(1-square_change);unit_change=separation*invsqrt/ell+invsqrt-1
    velocity_change=2*sq*(rotation-1)+13*sq*rotation*eta*rho
    transmitter_change=2*sq*unit_change+sq*velocity_change+2*unit_change*velocity_change
    delay_lip=transmitter_change/D
    zero_separation=(1+sq*rho)*eta;zero_square=2*sq*zero_separation/ell+2*(zero_separation/ell)**2
    initial=2*(1-mp.iv.sqrt(1-zero_square))/D
    selected_acceleration=8*(ell+separation)/(ell**3*(1-square_change)*mp.iv.sqrt(1-square_change)*(D-transmitter_change))
    assert hi(square_change)<1 and hi(transmitter_change)<lo(D) and hi(delay_lip)<1 and hi(initial+delay_lip*s)<lo(s) and hi(selected_acceleration)<1000
    C=16*I(1000)/eta**2;B,B2,eps=map(I,['.0036','.036','1e-13']);v0=4*B*C*eps**2;v2=4*B2*C*eps**2;lip=4*B*C*eps
    assert hi(lip)<1 and hi(eps+v0)<lo(eta/4)
    P0,P1,P2=eps+v0,eps+v2/2,eps+v2
    physical=[sq*P0,sq*(11*P1+2*P0),sq*(121*P2+44*P1+4*P0)];tube=I('1e-9');assert all(hi(v)<lo(tube) for v in physical)
    perturbH=8*tube+4*tube**2;perturbHp=12*tube+4*tube**2
    selfgap=I('1.826')*(1-(I(2)/10)**2/6)-tube-1;partnergap=I('.975')-2*tube-(3+tube)/10;remote=2*(1+tube)
    assert hi(perturbH)<mp.mpf('1e-6') and hi(perturbHp)<mp.mpf('.05') and lo(selfgap)>0 and lo(partnergap)>0 and hi(remote)<3
    tails=[]
    for ratio in ['.5','.1','.01','.001']:
        theta=I(ratio);tail0=theta**9*v0;tail1=theta**9*v2/9;tail2=theta**9*v2
        tails.append({'theta':theta,'physicalPosition':sq*tail0,'physicalVelocity':sq*(11*tail1+2*tail0),'physicalAcceleration':sq*(121*tail2+44*tail1+4*tail0)})
    record('target',{'passed':True,'inheritedInverseBounds':{'B':oldB,'B2':oldB2},'independentLeadingVector':leading,'physicalCartesianCharts':charts,'subjectComplementProposalCount':proposal_count,'independentComplementCount':new_count,'analyticMajorants':{'argument':delay_argument,'E':separation,'t':square_change,'U':unit_change,'V':velocity_change,'dD':transmitter_change,'kappa':delay_lip,'g0':initial,'image':initial+delay_lip*s,'accelerationMapBound':selected_acceleration},'CauchySecondDerivativeCap':C,'contraction':lip,'nonlinearCoefficientCap':v0,'weightedCoefficientCap':v2,'physicalC2DeviationBounds':physical,'tubeGapVariation':perturbH,'tubeSlopeVariation':perturbHp,'recentSelfMargin':selfgap,'recentPartnerMargin':partnergap,'remoteDelayBound':remote,'exactDegree8Tails':tails,'scope':'local exact coefficient domain; no point-coefficient rounding enclosure or fate'})
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',choices=['known','target'],required=True);arg=ap.parse_args();{'known':known,'target':target}[arg.stage]()
