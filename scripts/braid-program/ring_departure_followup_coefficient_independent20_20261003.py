#!/usr/bin/env python3
"""Independent Cartesian squared-gap coefficient adjudication.

No import of subject jets, tensors or recurrence. Elementary functions use
finite powers of zero-constant polynomials, implicit delays use squared gaps,
and the acceleration uses causal delay directly. Known controls gate targets.
"""
import argparse, hashlib, json, math, time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/departure/coefficient-independent/degree20'
SUB=ROOT/'scripts/braid-program/ring_departure_followup_jets20_20261003.py'
DOC=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-departure-followup-tail-domain-2026-10-03.md'
SK=ROOT/'.local-data/ring-followup/departure/interval-jets20/known.json'
ST=ROOT/'.local-data/ring-followup/departure/interval-jets20/target.json'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
OLD=ROOT/'.local-data/ring-exploration/unstable-series/target.json'
PINS={SUB:'50bafec4a4c4595f4204af46207f8ea046814528f581f4c721fbad871d4e98ac',DOC:'7946cd1c8ca595519db568a56c44c36509cc4b44af067648559e32fb8d94655c',SK:'8441ca1d9762efc73cbf159b99c7d60f5c88901475ab445b66d581a63f0ecfbc',ST:'1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18',CERT:'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'}
mp.mp.dps=180;mp.iv.dps=135
I=mp.iv.mpf;N=20;TOTAL=20

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x.a)
def hi(x):return mp.mpf(x.b)
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def zero(x):return lo(x)<=0<=hi(x)
def overlap(a,b):return lo(a)<=hi(b) and lo(b)<=hi(a)
def inside(a,b):return lo(b)<=lo(a) and hi(a)<=hi(b)
def packet(x):return I([mp.mpf(tuple(v)) for v in x['binary']])
def ref(p,k):return I([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def encode(x):
    if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),80),mp.nstr(hi(x),80)]}
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(tuple,list)):return [encode(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    return mp.nstr(x,85)
def record(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'checkerSha256':sha(Path(__file__)),'bindings':{str(p.relative_to(ROOT)):sha(p) for p in PINS},'K':1,'c_f':1,'order':N,'intervalDigits':135,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'passed':data['passed'],'path':str(p.relative_to(ROOT)),'sha256':sha(p)}),flush=True)

# Plain coefficient arrays. Analytic functions are evaluated by their finite
# Taylor power series about the constant term, not coefficient ODE recurrences.
def const(a):return [I(a)]+[I(0)]*N
def plus(a,b):return [a[k]+b[k] for k in range(N+1)]
def scale(a,c):return [c*x for x in a]
def minus(a,b):return plus(a,scale(b,-1))
def times(a,b):
    out=const(0)
    for k in range(N+1):
        if a[k]._mpi_[0][1]==0 and a[k]._mpi_[1][1]==0:continue
        for j in range(N+1-k):
            if b[j]._mpi_[0][1]==0 and b[j]._mpi_[1][1]==0:continue
            out[k+j]+=a[k]*b[j]
    return out
def power(a,k):
    out=const(1)
    for _ in range(k):out=times(out,a)
    return out
def analytic(a,derivative):
    v=list(a);v[0]=I(0);out=const(0);p=const(1)
    for k in range(N+1):
        out=plus(out,scale(p,derivative(a[0],k)/math.factorial(k)));p=times(p,v)
    return out
def inverse(a):
    assert sign(a[0]);v=scale(a,1/a[0]);v[0]=I(0);out=const(0);p=const(1)
    for k in range(N+1):out=plus(out,scale(p,(-1)**k/a[0]));p=times(p,v)
    return out
def div(a,b):return times(a,inverse(b))
def exponential(a):return analytic(a,lambda c,k:mp.iv.exp(c))
def cosine(a):return analytic(a,lambda c,k:[mp.iv.cos(c),-mp.iv.sin(c),-mp.iv.cos(c),mp.iv.sin(c)][k%4])
def sine(a):return analytic(a,lambda c,k:[mp.iv.sin(c),mp.iv.cos(c),-mp.iv.sin(c),-mp.iv.cos(c)][k%4])
def compose(a,b):
    assert zero(b[0]);out=const(0);p=const(1)
    for k in range(N+1):out=plus(out,scale(p,a[k]));p=times(p,b)
    return out
def euler(a):return [k*a[k] for k in range(N+1)]
def pdot(a,b):return plus(times(a[0],b[0]),times(a[1],b[1]))
def rot(a,v):
    c,s=cosine(a),sine(a)
    return [minus(times(c,v[0]),times(s,v[1])),plus(times(s,v[0]),times(c,v[1]))]
Q=const(0);Q[1]=I(1)
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def quarter(v):return [-v[1],v[0]]
def derivative_cartesian(x,y,v,acc,ui,us,vs):
    sep=[x[k]-y[k] for k in range(2)];ell=mp.iv.sqrt(dot(sep,sep));n=[x/ell for x in sep];D=1-dot(n,v);assert sign(D)
    fixed=[ui[k]-us[k] for k in range(2)];emission=-dot(n,fixed)/D
    dq=[fixed[k]-v[k]*emission for k in range(2)];de=dot(n,dq);dn=[(dq[k]-n[k]*de)/ell for k in range(2)]
    dv=[vs[k]+acc[k]*emission for k in range(2)];dD=-dot(dn,v)-dot(n,dv)
    return [(dn[k]-n[k]*(2*de/ell+dD/D))/(ell*ell*abs(D)) for k in range(2)]
def linear_rows(p,R,W):
    rows=[]
    for idx,row in enumerate(p['rootEnclosures']):
        d=ref(p,f'/rootEnclosures/{idx}/delay');angle=row['m']*mp.iv.pi/3-W*d;c,s=mp.iv.cos(angle),mp.iv.sin(angle)
        y=[R*c,R*s];v=[W*t for t in quarter(y)];acc=[-W*W*t for t in y];x=[R,I(0)];sep=[x[k]-y[k] for k in range(2)]
        D=1-dot(sep,v)/d;assert sign(D);sig=(-1)**row['m'];rotcols=[[c,s],[-s,c]]
        tensors=[[[I(0) for _ in range(2)] for _ in range(2)] for _ in range(3)]
        for j in range(2):
            basis=[I(int(k==j)) for k in range(2)];z=[I(0),I(0)];us=rotcols[j];vs=[W*t for t in quarter(us)]
            cols=[derivative_cartesian(x,y,v,acc,basis,z,z),derivative_cartesian(x,y,v,acc,z,us,vs),derivative_cartesian(x,y,v,acc,z,z,us)]
            for t,col in zip(tensors,cols):
                for k in range(2):t[k][j]=sig*col[k]
        rows.append({'m':row['m'],'d':d,'D':D,'tensors':tensors})
    return rows

def matrix(z,rows,W,derivative=False):
    A=[[2*z,-2*W],[2*W,2*z]] if derivative else [[z*z-W*W,-2*W*z],[2*W*z,z*z-W*W]]
    for row in rows:
        d=row['d'];e=mp.iv.exp(-z*d);C,F,H=row['tensors']
        for k in range(2):
            for j in range(2):A[k][j]+=e*(d*(F[k][j]+z*H[k][j])-H[k][j]) if derivative else -(C[k][j]+e*(F[k][j]+z*H[k][j]))
    return A

def determinant(a):return a[0][0]*a[1][1]-a[0][1]*a[1][0]
def detder(z,rows,W):
    a=matrix(z,rows,W);b=matrix(z,rows,W,True)
    return b[0][0]*a[1][1]+a[0][0]*b[1][1]-b[0][1]*a[1][0]-a[0][1]*b[1][0]
def refine_lambda(Z,rows,W):
    a,b=lo(Z),hi(Z);fa,fb=determinant(matrix(I(a),rows,W)),determinant(matrix(I(b),rows,W));assert sign(fa)*sign(fb)==-1
    derivative=detder(Z,rows,W);assert sign(derivative)
    for _ in range(30):
        m=(a+b)/2;f=determinant(matrix(I(m),rows,W))
        if not sign(f):
            aa,bb=(a+m)/2,(m+b)/2;faa,fbb=determinant(matrix(I(aa),rows,W)),determinant(matrix(I(bb),rows,W))
            if sign(faa)==sign(fa) and sign(fbb)==sign(fb):a,b,fa,fb=aa,bb,faa,fbb;continue
            break
        if sign(f)==sign(fa):a,fa=m,f
        else:b,fb=m,f
    return I([a,b]),{'oldEndpoints':[determinant(matrix(I(lo(Z)),rows,W)),determinant(matrix(I(hi(Z)),rows,W))],'derivativeOnOldBracket':derivative,'newEndpoints':[fa,fb]}

def geometric(u,d,row,L,R,W):
    arrival=times(Q,exponential(scale(d,-L)))
    source=[plus(compose(u[0],arrival),const(R)),compose(u[1],arrival)]
    angle=minus(const(row['m']*mp.iv.pi/3),scale(d,W))
    position=rot(angle,source);sep=[minus(plus(u[0],const(R)),position[0]),minus(u[1],position[1])]
    velocity=rot(angle,[minus(scale(compose(euler(u[0]),arrival),L),scale(source[1],W)),plus(scale(compose(euler(u[1]),arrival),L),scale(source[0],W))])
    return sep,velocity

def residual(u,rows,L,R,W):
    acc=[const(0),const(0)];delays=[]
    for row in rows:
        d=const(row['d'])
        for n in range(1,N+1):
            sep,_=geometric(u,d,row,L,R,W);gap=minus(pdot(sep,sep),times(d,d))
            # Squared causal gap derivative is -2*d0*D0.
            d[n]=gap[n]/(2*row['d']*row['D'])
        sep,vel=geometric(u,d,row,L,R,W)
        # On the positive causal branch ell=d. This denominator is
        # d^2*sign(D0)*(d-sep dot velocity), not a square-root jet.
        denominator=scale(times(times(d,d),minus(d,pdot(sep,vel))),sign(row['D']))
        for k in range(2):acc[k]=plus(acc[k],scale(div(sep[k],denominator),(-1)**row['m']))
        delays.append(d)
    left=[minus(minus(scale(euler(euler(u[0])),L*L),scale(euler(u[1]),2*W*L)),scale(plus(u[0],const(R)),W*W)),minus(plus(scale(euler(euler(u[1])),L*L),scale(euler(u[0]),2*W*L)),scale(u[1],W*W))]
    return [minus(left[k],acc[k]) for k in range(2)],delays

def known():
    # Static source: X=2+q, no source motion. Squared-gap implicit solve
    # returns delay 2+q; acceleration uses causal delay directly.
    d=const(2);sep=plus(const(2),Q)
    for n in range(1,N+1):d[n]=minus(times(sep,sep),times(d,d))[n]/4
    expected=[I(2),I(1)]+[I(0)]*(N-1);assert all(zero(d[k]-expected[k]) for k in range(N+1))
    acc=div(sep,times(times(d,d),d));exact=[I((-1)**n*(n+1))/2**(n+2) for n in range(N+1)]
    assert all(zero(acc[k]-exact[k]) for k in range(N+1))
    exp=exponential(scale(Q,I('0.7')));assert all(zero(exp[k]-I('0.7')**k/math.factorial(k)) for k in range(N+1))
    s,c=sine(Q),cosine(Q);identity=plus(times(s,s),times(c,c));assert all(zero(identity[k]-int(k==0)) for k in range(N+1))
    rational=div(Q,plus(const(1),Q));comp=compose(plus(const(1),Q),rational);assert all(zero(comp[k]-(plus(const(1),rational))[k]) for k in range(N+1))
    z=[I(0),I(0)];e=[I(1),I(0)]
    static=derivative_cartesian([I(2),I(0)],z,z,z,e,z,z);assert zero(static[0]+I(1)/4) and zero(static[1])
    rt=mp.iv.sqrt(2);neg=derivative_cartesian(e,[I(0),I(-1)],[2*rt,I(0)],[I(0),I(8)],e,z,z)
    assert zero(neg[0]+5/(4*rt)) and zero(neg[1]+3/(4*rt))
    record('known',{'passed':True,'staticSquaredGapDelay':d,'staticCausalAcceleration':acc,'analyticalStaticCoefficients':exact,'staticCartesianDerivative':static,'negativeDAnalyticalDerivative':neg,'expTrigComposition':True,'timeUTC':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())})

def target():
    global N,Q
    t0=time.monotonic();known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['checkerSha256']==sha(Path(__file__))
    assert all(sha(p)==h for p,h in PINS.items());sub=json.loads(ST.read_text());sk=json.loads(SK.read_text());p=json.loads(CERT.read_text());assert sub['passed'] and sk['passed'] and sk['instrumentSha256']==sha(SUB)==sub['instrumentSha256'];assert sub['certificateSha256']==sha(CERT)
    R,W=ref(p,'/R'),ref(p,'/Omega');rows=linear_rows(p,R,W);assert len(rows)==8 and sum(r['m']==0 for r in rows)==1
    Z0=packet(sub['lambdaInterval']);L,lambda_receipt=refine_lambda(Z0,rows,W);assert inside(L,Z0)
    A1=matrix(L,rows,W);assert sign(A1[0][1]);u=[const(0),const(0)];u[0][1]=R;u[1][1]=-R*A1[0][0]/A1[0][1]
    coeffs=[{'n':1,'coefficient':[u[0][1],u[1][1]]}];matrices=[]
    for n in range(2,TOTAL+1):
        N=n;Q=const(0);Q[1]=I(1)
        E,_=residual([v[:n+1] for v in u],rows,L,R,W);mat=matrix(n*L,rows,W);dd=determinant(mat);assert sign(dd)
        f=[-E[k][n] for k in range(2)];un=[(mat[1][1]*f[0]-mat[0][1]*f[1])/dd,(-mat[1][0]*f[0]+mat[0][0]*f[1])/dd]
        for k in range(2):u[k][n]=un[k]
        matrices.append({'n':n,'matrix':mat,'determinant':dd});coeffs.append({'n':n,'coefficient':un})
        print(json.dumps({'progress':'independent squared-gap coefficient','n':n}),flush=True)
    N=TOTAL;Q=const(0);Q[1]=I(1)
    E,delays=residual(u,rows,L,R,W);assert all(zero(E[k][n]) for n in range(N+1) for k in range(2))
    old=json.loads(OLD.read_text());oldrows=[old['u1']]+[r['coefficient'] for r in old['coefficients']];subjectrows=[sub['u1']]+[r['coefficient'] for r in sub['coefficients']]
    comparisons=[];errors=[]
    caps=['2.2290e-21','6.9202e-19','1.7904e-16','3.7195e-14','6.9196e-12','1.2167e-9','2.0763e-7','3.4870e-5']
    for n in range(1,N+1):
        subject=[packet(a) for a in subjectrows[n-1]];own=coeffs[n-1]['coefficient'];error=[abs(own[k]-I(oldrows[n-1][k])) for k in range(2)] if n<=8 else []
        comparison={'n':n,'overlap':[overlap(own[k],subject[k]) for k in range(2)],'independentInsideSubject':[inside(own[k],subject[k]) for k in range(2)],'independentWidths':[I(hi(v)-lo(v)) for v in own]}
        assert all(comparison['overlap']);assert all(comparison['independentInsideSubject'])
        if n<=8:
            assert max(hi(v) for v in error)<mp.mpf(caps[n-1])
            for k in range(2):assert hi(packet(sub['pointCoefficientErrors'][n-1]['pointToExactCoefficientError'][k]))<mp.mpf(caps[n-1])
        comparisons.append(comparison)
        if n<=8:errors.append({'n':n,'ownPointError':error,'publishedCap':caps[n-1]})
    tiny=I('1e-13');weighted=[sum(I(caps[n-1])*tiny**n*n**weight for n in range(1,9)) for weight in (0,1,2)]
    record('target',{'passed':True,'knownReceiptSha256':sha(OUT/'known.json'),'lambdaOriginal':Z0,'lambdaNarrowed':L,'lambdaAdmission':lambda_receipt,'rows':rows,'coefficients':coeffs,'nonresonanceMatrices':matrices,'allResidualCoefficients':[[E[k][n] for k in range(2)] for n in range(N+1)],'delayCoefficients':delays,'subjectComparisons':comparisons,'pointErrors':errors,'q1eMinus13PrintedPolynomialEulerErrorCaps':weighted,'oldPointReceiptSha256':sha(OLD),'rootsPerReceiver':8,'directedRootCount':48,'selfRootsPerReceiver':1,'wallSeconds':time.monotonic()-t0,'timeUTC':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'scope':'degree-twenty exact coefficient bounds conditional on admitted ordinary reference and ancient-history theorem; no domain enlargement or fate'})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','target'],required=True);args=parser.parse_args();{'known':known,'target':target}[args.stage]()
