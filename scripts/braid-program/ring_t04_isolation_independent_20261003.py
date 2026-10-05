#!/usr/bin/env python3
"""Independent Cartesian fixed-emission derivative and complete T04 chart.

No subject/oracle/AD import. Frozen root boxes, Y and weights are proposals.
All parameter-root continuations, complements and weighted defects rebuilt.
"""
import argparse,hashlib,itertools,json,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SUBJECT=ROOT/'scripts/braid-program/ring_t04_isolation_extension_20261003.py'
DOC=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-t04-isolation-extension-2026-10-03.md'
RECEIPT=ROOT/'.local-data/ring-exploration/t04-isolation-extension/width-1e-5-cover32.json'
CONTROL=ROOT/'.local-data/ring-exploration/t04-isolation-extension/known.json'
PINS={SUBJECT:'6ed9af56f1aac8623589dae39566d266535ed6d202e6f76a613603f1ec8ba7ae',DOC:'81fa0072f54afc6c82c62d38c69f11de6addf0b97b39aac70d02b56e690380ec',RECEIPT:'ec2912f88566495e639d88091bf02b24bb018ecd986dd40a119b4d5bdb3dc016',CONTROL:'77c401553bd2134a21a4c673f1006b76bbd7b30c456e03a06298691790cc1174'}
OUT=ROOT/'.local-data/ring-exploration/t04-isolation-independent'
mp.mp.dps=110;mp.iv.dps=85
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def I(a,b=None):return mp.iv.mpf(a if b is None else [a,b])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def mid(x):return (lo(x)+hi(x))/2
def decode(a):return I(*[mp.mpf(tuple(v)) for v in a['binaryEndpoints']])
def point(a):return I(mid(decode(a)))
def inside(a,b):return lo(b)<lo(a) and hi(a)<hi(b)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def J(a):return [-a[1],a[0]]
def record(name,data):
    def enc(x):
        if hasattr(x,'_mpi_'):return {'binaryEndpoints':[list(v) for v in x._mpi_],'decimalDiagnostics':[mp.nstr(lo(x),75),mp.nstr(hi(x),75)]}
        if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
        if isinstance(x,(list,tuple)):return [enc(v) for v in x]
        if isinstance(x,(str,int,bool)) or x is None:return x
        return mp.nstr(x,75)
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(name+'.json');p.write_text(json.dumps(enc({'instrumentSha256':sha(Path(__file__)),'bindings':{str(p.relative_to(ROOT)):sha(p) for p in PINS},'K':1,'c_f':1,'pointDps':110,'intervalDps':85,**data}),indent=2,sort_keys=True)+'\n');print(json.dumps({'receipt':str(p.relative_to(ROOT)),'passed':data.get('passed'),'sha256':sha(p)}),flush=True)
def require_known():
    a=json.loads((OUT/'known.json').read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))
    assert all(sha(p)==s for p,s in PINS.items())
def geometry(P):
    d2,d3,r2,r3,beta=P;offset=[I(0),mp.iv.pi,2*mp.iv.pi/3,5*mp.iv.pi/3,4*mp.iv.pi/3,7*mp.iv.pi/3]
    phasegrad=[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0]]
    radius=[I(1),I(1),r2,r2,r3,r3];radiusgrad=[[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,1,0]]
    return offset,phasegrad,radius,radiusgrad,beta
def channel(P,i,j):
    off,pg,r,rg,beta=geometry(P);gp=[pg[j][k]-pg[i][k] for k in range(5)]
    gamma=off[j]-off[i]+gp[0]*P[0]+gp[1]*P[1]
    return r[i],r[j],gamma,beta,rg[i],rg[j],gp
def causal(P,i,j,theta):
    ri,rj,gamma,beta,*_=channel(P,i,j)
    if i==j:
        sine=mp.iv.sin(theta/2);ell=2*ri*abs(sine);sg=sign(sine)
        if sg==0:return beta*ell-theta,None
        derivative=beta*ri*sg*mp.iv.cos(theta/2)-1
    else:
        angle=gamma-theta;square=ri**2+rj**2-2*ri*rj*mp.iv.cos(angle)
        ell=mp.iv.sqrt(I(max(mp.mpf(0),lo(square)),hi(square)))
        derivative=None if lo(ell)<=0 else -beta*ri*rj*mp.iv.sin(angle)/ell-1
    return beta*ell-theta,derivative
def root_image(P,i,j,X):
    center=mid(X);value,_=causal(P,i,j,I(center));_,der=causal(P,i,j,X)
    assert der is not None and sign(der)!=0
    image=I(center)-value/der;assert inside(image,X)
    # Uniform endpoint opposition supplies existence for every parameter.
    fl,_=causal(P,i,j,I(lo(X)));fr,_=causal(P,i,j,I(hi(X)))
    assert sign(fl)*sign(fr)==-1
    return image,der
def complement(P,i,j,roots):
    ri,rj,gamma,beta,*_=channel(P,i,j);end=hi(beta*(ri+rj));cursor=mp.mpf(0);gaps=[]
    for X in roots:gaps.append((cursor,lo(X)));cursor=hi(X)
    gaps.append((cursor,end));count=0;depthmax=0
    origin=None
    if i==j:
        origin=beta*ri*(1-I(1)/24)-1;assert lo(origin)>0
        gaps[0]=(mp.mpf(1),gaps[0][1])
    stack=[(a,b,0) for a,b in gaps if a<b]
    while stack:
        a,b,d=stack.pop();count+=1;depthmax=max(depthmax,d);X=I(a,b);value,der=causal(P,i,j,X)
        if sign(value)!=0:continue
        if der is not None and sign(der)!=0:
            fa,_=causal(P,i,j,I(a));fb,_=causal(P,i,j,I(b))
            if sign(fa)!=0 and sign(fa)==sign(fb):continue
        assert d<70 and b-a>mp.mpf('1e-24'),'independent complement unresolved'
        c=(a+b)/2;stack.extend([(a,c,d+1),(c,b,d+1)])
    tail=I(end);tailvalue,_=causal(P,i,j,tail);assert hi(tailvalue)<0
    return {'receiver':i,'source':j,'complementBoxes':count,'maximumDepth':depthmax,'outwardDomainEnd':end,'terminalResidual':tailvalue,'selfOriginFloor':origin}
def row_derivative(beta,ri,rj,gamma,theta,dri,drj,dgamma,dbeta):
    angle=gamma-theta;e=[mp.iv.cos(angle),mp.iv.sin(angle)];y=[rj*z for z in e];jy=J(y)
    displacement=[ri-y[0],-y[1]];ell=mp.iv.sqrt(dot(displacement,displacement));assert lo(ell)>0
    n=[z/ell for z in displacement];v=[beta*z for z in jy];D=1-dot(n,v);assert sign(D)!=0
    dx=[I(dri),I(0)];dy=[drj*e[k]+dgamma*jy[k] for k in range(2)];fixed=[dx[k]-dy[k] for k in range(2)]
    theta_p=(ell*dbeta+beta*dot(n,fixed))/D
    du=[fixed[k]+jy[k]*theta_p for k in range(2)];ell_p=dot(n,du);dn=[(du[k]-n[k]*ell_p)/ell for k in range(2)]
    jdy=J(dy);dv=[dbeta*jy[k]+beta*jdy[k]+beta*y[k]*theta_p for k in range(2)]
    D_p=-dot(dn,v)-dot(n,dv);weight=1/(ell**2*abs(D));A=[weight*z for z in n]
    derivative=[weight*(dn[k]-n[k]*(2*ell_p/ell+D_p/D)) for k in range(2)]
    return A,derivative,D,ell,theta_p
def jacobian(P,proposals):
    acceleration=[[I(0),I(0)] for _ in range(6)];grad=[[[I(0) for _ in range(5)] for _ in range(2)] for _ in range(6)];images=[];marginD=mp.inf;separation=mp.inf
    for item in proposals:
        i,j=item['receiver'],item['source'];X=decode(item['thetaBox']);theta,der=root_image(P,i,j,X)
        ri,rj,gamma,beta,dri,drj,dgamma=channel(P,i,j);polarity=(-1)**(i+j)
        for k in range(5):
            A,dA,D,ell,theta_p=row_derivative(beta,ri,rj,gamma,theta,dri[k],drj[k],dgamma[k],int(k==4))
            for component in range(2):grad[i][component][k]+=polarity*dA[component]
            if k==0:
                for component in range(2):acceleration[i][component]+=polarity*A[component]
                marginD=min(marginD,lo(abs(D)));separation=min(separation,lo(ell))
        images.append({'receiver':i,'source':j,'ordinal':item['ordinal'],'image':theta,'Gtheta':der})
    _,_,r,rg,_=geometry(P);scale=[acceleration[i][0]/r[i] for i in range(6)]
    scalegrad=[[grad[i][0][k]/r[i]-acceleration[i][0]*rg[i][k]/r[i]**2 for k in range(5)] for i in range(6)]
    f=[acceleration[i][1] for i in [0,2,4]]+[scale[i]-scale[0] for i in [2,4]]
    jac=[grad[i][1] for i in [0,2,4]]+[[scalegrad[i][k]-scalegrad[0][k] for k in range(5)] for i in [2,4]]
    return f,jac,images,{'minimumAbsD':marginD,'minimumSeparation':separation}
def defect(Y,jac):return [[I(int(i==j))-sum(Y[i][k]*jac[k][j] for k in range(5)) for j in range(5)] for i in range(5)]
def norm(E,w):return [sum(abs(E[i][j])*w[j]/w[i] for j in range(5)) for i in range(5)]
def known():
    # Static row: varying only receiver x at distance2 gives (-1/4,0).
    A,dA,D,ell,tp=row_derivative(I(0),I(2),I(0),I(0),I(0),1,0,0,0)
    assert lo(dA[0])<=mp.mpf('-.25')<=hi(dA[0]) and sign(dA[1])==0
    # Exact negative-D circular hit: theta4,beta2sqrt2, gamma=4-pi/2.
    neg=row_derivative(2*mp.iv.sqrt(2),I(1),I(1),I(4)-mp.iv.pi/2,I(4),1,0,0,0)
    expected=[-5/(4*mp.iv.sqrt(2)),-3/(4*mp.iv.sqrt(2))]
    assert sign(neg[2])==-1 and all(sign(x-y)==0 for x,y in zip(neg[1],expected))
    M=mp.matrix([[4,1,0,0,1],[1,5,1,0,0],[0,1,6,1,0],[0,0,1,7,1],[1,0,0,1,8]]);inv=M**-1
    E=defect([[I(inv[i,j]) for j in range(5)] for i in range(5)],[[I(M[i,j]) for j in range(5)] for i in range(5)]);rows=norm(E,[I(1)]*5);assert max(hi(x) for x in rows)<mp.mpf('1e-80')
    off,_,_,_,_=geometry([I(0),I(0),I(1),I(1),I(0)]);hexagon=[]
    analytical=-I(5)/4+1/mp.iv.sqrt(3)
    for i in range(6):
        total=[I(0),I(0)]
        for j in range(6):
            if i==j:continue
            value,*_=row_derivative(I(0),I(1),I(1),off[j]-off[i],I(0),0,0,0,0)
            for k in range(2):total[k]+=(-1)**(i+j)*value[k]
        assert sign(total[0]-analytical)==0 and lo(total[1])<=0<=hi(total[1]) and hi(abs(total[1]))<mp.mpf('1e-80')
        hexagon.append(total)
    record('known',{'passed':True,'staticAcceleration':A,'staticReceiverDerivative':dA,'negativeDCircularDerivative':neg[1],'negativeDExpected':expected,'negativeD':neg[2],'integerLinearDefectNorm':max(hi(x) for x in rows),'staticHexAnalyticalRadial':analytical,'staticHexCartesianProjections':hexagon})
def target():
    require_known();start=time.monotonic();subject=json.loads(RECEIPT.read_text());control=json.loads(CONTROL.read_text());assert subject['accepted'] and len(subject['jacobianCover'])==32
    P=[decode(v) for v in subject['box']];proposals=subject['roots'];assert len(proposals)==72
    owners={}
    for x in proposals:owners.setdefault((x['receiver'],x['source']),[]).append(decode(x['thetaBox']))
    assert len(owners)==36
    for xs in owners.values():
        xs.sort(key=lo);assert all(hi(a)<lo(b) for a,b in zip(xs,xs[1:]))
    globalroots=[]
    for item in proposals:
        image,der=root_image(P,item['receiver'],item['source'],decode(item['thetaBox']))
        globalroots.append({'receiver':item['receiver'],'source':item['source'],'ordinal':item['ordinal'],'image':image,'Gtheta':der})
    guards=[complement(P,i,j,sorted(xs,key=lo)) for (i,j),xs in owners.items()]
    Y=[[point(x) for x in row] for row in control['acceptedExactT04FullReference']['fixedPreconditioner']]
    w=[point(x) for x in subject['krawczyk']['weights']];assert all(lo(x)>0 for x in w)
    center=[I(mid(x)) for x in P];fcenter,Jcenter,_,_=jacobian(center,proposals);centerdef=defect(Y,Jcenter);centerrows=norm(centerdef,w)
    # Point-center root boxes are refined repeatedly to make Y nonsingularity
    # independently decidable without asserting the printed center is a zero.
    assert max(hi(x) for x in centerrows)<1
    pieces=[];defs=[]
    for ordinal,halves in enumerate(itertools.product([0,1],repeat=5)):
        piece=[I(lo(x),mid(x)) if h==0 else I(mid(x),hi(x)) for x,h in zip(P,halves)]
        f,jac,images,margins=jacobian(piece,proposals);E=defect(Y,jac);defs.append(E)
        pieces.append({'ordinal':ordinal,'halves':halves,'box':piece,'jacobian':jac,'rootImages':images,'margins':margins})
        print(json.dumps({'progress':'independentCartesianCover','completed':ordinal+1,'total':32}),flush=True)
    hull=[[I(min(lo(E[i][j]) for E in defs),max(hi(E[i][j]) for E in defs)) for j in range(5)] for i in range(5)];rows=norm(hull,w);q=max(hi(x) for x in rows)
    record('target',{'passed':q<1,'uniformHalfWidth':'1e-5','box':P,'directedRoots':72,'globalRootCertificates':globalroots,'sourceRootCountMatrix':[[len(owners[(i,j)]) for j in range(6)] for i in range(6)],'completeComplementGuards':guards,'fixedY':Y,'ONEFixedWeightVector':w,'centerDefectRows':centerrows,'cover32':pieces,'globalDefectHull':hull,'weightedRows':rows,'qUpper':q,'strictKrawczykInclusionUsed':False,'exactZeroPremise':'inherited scalar T04 zero and rotation/polarity covariance; not the printed center','scope':'uniqueness in the five-coordinate rigid antipodal common-rate chart; no breathing/precession/stability verdict','wallSeconds':time.monotonic()-start})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',required=True,choices=['known','target']);a=p.parse_args()
    if a.stage=='known':known()
    else:target()
