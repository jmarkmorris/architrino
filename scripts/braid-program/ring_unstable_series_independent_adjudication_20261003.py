#!/usr/bin/env python3
"""Independent Cartesian nonresonance/bounds review for the fast T02 series.

No subject Taylor algebra or characteristic matrices imported. Geometry and
direct causal-chain derivatives reconstruct A(z). Controls before target.
"""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/unstable-series-adjudication'
CERT=ROOT/'.local-data/bp-011-t02-characteristic/certificate.json'
SUBJECT=ROOT/'.local-data/ring-exploration/unstable-series/target.json'
mp.mp.dps=130;mp.iv.dps=110
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def sign(x):return 1 if lo(x)>0 else -1 if hi(x)<0 else 0
def field(p,key):return I(*[mp.mpf(tuple(x)) for x in p['exactIntervalBinaryBounds'][key]])
def dot(a,b):return sum((x*y for x,y in zip(a,b)),I(0))
def determinant(a):return a[0][0]*a[1][1]-a[1][0]*a[0][1]
def abs_norm(a):return I(max(hi(sum((abs(v) for v in row),I(0))) for row in a))
def encode(x):
    if isinstance(x,dict):return {k:encode(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [encode(v) for v in x]
    if hasattr(x,'_mpi_'):return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(lo(x),45),mp.nstr(hi(x),45)]}
    return x
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'stage':stage,'checkerSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}),indent=2)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))

def chain(n,ell,V,As,D,pol,dq,dv):
    dt=-dot(n,dq)/D
    dr=[dq[i]-V[i]*dt for i in range(2)];dl=dot(n,dr)
    dn=[(dr[i]-n[i]*dl)/ell for i in range(2)]
    dV=[dv[i]+As[i]*dt for i in range(2)]
    dD=-dot(dn,V)-dot(n,dV)
    return [pol/(ell**2*abs(D))*(dn[i]-n[i]*(2*dl/ell+dD/D)) for i in range(2)]

def geometry(packet):
    beta=field(packet,'/betaBracket');R=field(packet,'/R');omega=beta/R;rows=[]
    for k,r in enumerate(packet['rootEnclosures']):
        x=field(packet,f'/rootEnclosures/{k}/v');co=mp.iv.cos(-2*x);si=mp.iv.sin(-2*x)
        xs=[R*co,R*si];ell=2*R*mp.iv.sin(x);n=[(R-xs[0])/ell,-xs[1]/ell]
        V=[-omega*xs[1],omega*xs[0]];As=[-omega**2*v for v in xs];D=1-dot(n,V);assert sign(D)
        rows.append({'m':r['m'],'ell':ell,'n':n,'V':V,'As':As,'D':D,'rotation':[[co,-si],[si,co]]})
    assert len(rows)==8 and sum(v['m']%6==0 for v in rows)==1
    return R,omega,rows

def matrix(z,omega,rows):
    A=[[z*z-omega*omega,-2*omega*z],[2*omega*z,z*z-omega*omega]]
    for row in rows:
        B=row['rotation'];e=mp.iv.exp(-z*row['ell'])
        for j in range(2):
            U=[I(int(i==j)) for i in range(2)];bu=[B[i][j] for i in range(2)]
            bju=[-B[i][0]*U[1]+B[i][1]*U[0] for i in range(2)]
            dq=[U[i]-e*bu[i] for i in range(2)]
            dv=[e*(z*bu[i]+omega*bju[i]) for i in range(2)]
            da=chain(row['n'],row['ell'],row['V'],row['As'],row['D'],(-1)**row['m'],dq,dv)
            for i in range(2):A[i][j]-=da[i]
    return A

def confinement(omega,rows):
    b1=2*abs(omega);b0=omega**2;Csum=[[I(0) for _ in range(2)] for _ in range(2)]
    for row in rows:
        B=row['rotation'];C=[[I(0) for _ in range(2)] for _ in range(2)];F=[[I(0) for _ in range(2)] for _ in range(2)];H=[[I(0) for _ in range(2)] for _ in range(2)]
        for j in range(2):
            U=[I(int(i==j)) for i in range(2)];bu=[B[i][j] for i in range(2)];bju=[-B[i][0]*U[1]+B[i][1]*U[0] for i in range(2)]
            args=(row['n'],row['ell'],row['V'],row['As'],row['D'],(-1)**row['m'])
            cc=chain(*args,U,[I(0),I(0)]);ff=chain(*args,[-v for v in bu],[omega*v for v in bju]);hh=chain(*args,[I(0),I(0)],bu)
            for i in range(2):C[i][j]=cc[i];F[i][j]=ff[i];H[i][j]=hh[i]
        b1+=abs_norm(H);b0+=abs_norm(F)
        for i in range(2):
            for j in range(2):Csum[i][j]+=C[i][j]
    return b1,b0+abs_norm(Csum)

def control():
    for pol in (1,-1):
        for j in range(2):
            u=[I(int(i==j)) for i in range(2)]
            result=chain([I(1),I(0)],I(2),[I(0),I(0)],[I(0),I(0)],I(1),pol,u,[I(0),I(0)])
            exact=[-pol*I(1)/4*u[0],pol*I(1)/8*u[1]]
            assert all(lo(v-w)==hi(v-w)==0 for v,w in zip(result,exact))
    mat=[[I(2),I(1)],[I(0),I(4)]];dd=determinant(mat);assert lo(dd)==hi(dd)==8
    inv=[[mat[1][1]/dd,-mat[0][1]/dd],[-mat[1][0]/dd,mat[0][0]/dd]]
    assert lo(abs_norm(inv))==hi(abs_norm(inv))==mp.mpf('0.625')
    save('control',{'passed':True,'controls':['static inverse-square derivative for both polarities','triangular matrix determinant8 and inverse infinity norm5/8']})

def target():
    control=json.loads((OUT/'control.json').read_text());assert control['passed'] and control['checkerSha256']==sha(Path(__file__))
    assert sha(CERT)=='ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
    assert sha(SUBJECT)=='28a64e16445c243f115317435976142595dd68f00ccdffd4e7a804d4450b3f06'
    packet=json.loads(CERT.read_text());subject=json.loads(SUBJECT.read_text());R,omega,rows=geometry(packet)
    endpoints=packet['positiveRealWitnesses'][1]['zBracket'];lam=I(mp.mpf(endpoints[0])-mp.mpf('1e-70'),mp.mpf(endpoints[1])+mp.mpf('1e-70'))
    b1,b0=confinement(omega,rows);assert hi(b1)<34 and hi(b0)<318
    assert lo(5*lam)>43
    finite=[]
    for n in (2,3,4):
        A=matrix(n*lam,omega,rows);dd=determinant(A);assert sign(dd)==1
        inv=[[A[1][1]/dd,-A[0][1]/dd],[-A[1][0]/dd,A[0][0]/dd]]
        norm=abs_norm(inv);finite.append({'n':n,'determinant':dd,'inverseNormUpper':norm})
    # Scalar tail bound uses the worst reviewed confinement constants. Its
    # n^2 multiple decreases with n, so the bound at n5 applies to the tail.
    tail=I(1)/((5*lam)**2-34*(5*lam)-318);assert sign(tail)==1
    B=I(max([hi(v['inverseNormUpper']) for v in finite]+[hi(tail)]))
    B2=I(max([hi(v['n']**2*v['inverseNormUpper']) for v in finite]+[hi(25*tail)]))
    assert hi(B)<mp.mpf('.003583') and hi(B2)<mp.mpf('.035206')
    first=matrix(lam,omega,rows);assert sign(first[0][1])==-1
    leading=[R,-R*first[0][0]/first[0][1]];assert sign(leading[1])==1
    speed_slope=omega*leading[0]+lam*leading[1];assert sign(speed_slope)==1
    save('target',{'passed':True,'lambda':lam,'geometricConfinementB1':b1,'geometricConfinementB0':b0,'finiteHarmonics':finite,
                   'tailInverseBound':tail,'B':B,'B2':B2,'normalizationA12':first[0][1],'leadingVector':leading,'leadingSpeedSlope':speed_slope,
                   'referenceRootsPerReceiver':len(rows),'positiveSelfRootsPerReceiver':1,
                   'scope':'independent signed causal-chain nonresonance, inverse bounds and infinitesimal direction; finite degree8 coefficients retained at author measured grade, not independently recomputed'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['control','target'],required=True);args=p.parse_args()
    control() if args.stage=='control' else target()
