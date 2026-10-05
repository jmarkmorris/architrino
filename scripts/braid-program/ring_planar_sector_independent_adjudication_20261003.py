"""Cartesian spatial-sector checker, independent of subject tensor evaluator."""
import argparse, hashlib, importlib.util, json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
HELPER=ROOT/'scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py'
spec=importlib.util.spec_from_file_location('cartesian_chain',HELPER)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
OUT=ROOT/'.local-data/ring-exploration/planar-sector-adjudication'
SOURCE=ROOT/'.local-data/ring-exploration/differential-planar'
mp.mp.dps=110;mp.iv.dps=100

def identity(): return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
def low(x): return mp.mpf(x.a)
def high(x): return mp.mpf(x.b)

def characteristic(beta,radius,roots,z,sector,ctx):
    omega=beta/radius
    A=[[z*z-omega**2,-2*omega*z],[2*omega*z,z*z-omega**2]]
    dA=[[2*z,-2*omega],[2*omega,2*z]]
    for m,x in roots:
        c,s=ctx.cos(-2*x),ctx.sin(-2*x)
        position=[radius*c,radius*s]
        length=2*radius*ctx.sin(x)
        n=[(radius-position[0])/length,-position[1]/length]
        velocity=[-omega*position[1],omega*position[0]]
        acceleration=[-omega**2*v for v in position]
        D=1-base.dot(n,velocity)
        if sector==3: phase=ctx.mpf((-1)**m)
        elif sector==0: phase=ctx.mpf(1)
        else: phase=ctx.exp(ctx.mpc(0,sector*m*ctx.pi/3))
        E=phase*ctx.exp(-z*length)
        for col in range(2):
            u=[ctx.mpf(int(col==i)) for i in range(2)]
            rotated=[c*u[0]-s*u[1],s*u[0]+c*u[1]]
            rotated_j=[-c*u[1]-s*u[0],-s*u[1]+c*u[0]]
            dq=[u[i]-E*rotated[i] for i in range(2)]
            fv=[E*(z*rotated[i]+omega*rotated_j[i]) for i in range(2)]
            ddq=[length*E*v for v in rotated]
            dfv=[E*((1-length*z)*rotated[i]-length*omega*rotated_j[i]) for i in range(2)]
            value=base.chain(n,length,velocity,acceleration,D,(-1)**m,dq,fv)
            deriv=base.chain(n,length,velocity,acceleration,D,(-1)**m,ddq,dfv)
            for i in range(2): A[i][col]-=value[i];dA[i][col]-=deriv[i]
    det=A[0][0]*A[1][1]-A[0][1]*A[1][0]
    derivative=dA[0][0]*A[1][1]+A[0][0]*dA[1][1]-dA[0][1]*A[1][0]-A[0][1]*dA[1][0]
    return det,derivative,A

def inclusion(X,function):
    center=[(low(v)+high(v))/2 for v in X]
    z=mp.iv.mpc(*X);c=mp.iv.mpc(*center)
    fc,_,_=function(c);_,d,_=function(z);_,dc,_=function(c)
    fixed=1/mp.mpc((low(dc.real)+high(dc.real))/2,(low(dc.imag)+high(dc.imag))/2)
    Y=[[mp.iv.mpf(fixed.real),mp.iv.mpf(-fixed.imag)],[mp.iv.mpf(fixed.imag),mp.iv.mpf(fixed.real)]]
    J=[[d.real,-d.imag],[d.imag,d.real]]
    M=[[(1 if i==j else 0)-sum(Y[i][k]*J[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    displacement=[X[i]-center[i] for i in range(2)]
    f=[fc.real,fc.imag]
    image=[mp.iv.mpf(center[i])-sum(Y[i][j]*f[j] for j in range(2))+sum(M[i][j]*displacement[j] for j in range(2)) for i in range(2)]
    norm=max(high(sum(abs(v) for v in row)) for row in M)
    assert norm<1
    assert all(low(X[i])<low(image[i]) and high(image[i])<high(X[i]) for i in range(2))
    return {'box':X,'image':image,'outwardContractionUpper':mp.iv.mpf(norm)}

def save(stage,data):
    def encode(v):
        if hasattr(v,'_mpi_'): return {'binary':[list(x) for x in v._mpi_],'display':[mp.nstr(low(v),35),mp.nstr(high(v),35)]}
        if isinstance(v,dict): return {k:encode(x) for k,x in v.items()}
        if isinstance(v,(tuple,list)): return [encode(x) for x in v]
        return v
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'passed':True,'instrumentSha256':identity(),'cartesianHelperSha256':hashlib.sha256(HELPER.read_bytes()).hexdigest(),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(encode(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True}),flush=True)

def reference(t):
    p=json.loads((base.SOURCE/f'T{t:02d}-certificate.json').read_text())
    b,r=base.interval(p,'/beta'),base.interval(p,'/R')
    roots=[(row['m'],base.interval(p,f'/rootRows/{j}/v')) for j,row in enumerate(p['rootRows'])]
    assert len(roots)==2*t+4
    return b,r,roots

def known():
    value=base.chain([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1,[1,0],[0,0])
    assert value==[mp.mpf('-.25'),0]
    linear=inclusion([mp.iv.mpf(['1.9','2.1']),mp.iv.mpf(['2.9','3.1'])],lambda z:(z-mp.iv.mpc(2,3),mp.iv.mpc(1),None))
    polynomial=inclusion([mp.iv.mpf(['-.01','.01']),mp.iv.mpf(['.99','1.01'])],lambda z:(z*z+1,2*z,None))
    for t in [2,4]:
        b,r,roots=reference(t);omega=b/r
        for k,z,u in [(1,mp.iv.mpc(0,omega),[1,mp.iv.mpc(0,1)]),(5,mp.iv.mpc(0,-omega),[1,mp.iv.mpc(0,-1)])]:
            A=characteristic(b,r,roots,z,k,mp.iv)[2]
            for row in A:
                v=base.dot(row,u)
                assert low(v.real)<=0<=high(v.real) and low(v.imag)<=0<=high(v.imag)
    save('known',{'controls':['static Cartesian derivative -1/4','linear complex root2+3i','quadratic complex rooti','Cartesian translation identities T02/T04'],'linear':linear,'quadratic':polynomial})

def target():
    control=json.loads((OUT/'known.json').read_text());assert control['passed'] and control['instrumentSha256']==identity()
    assert control['cartesianHelperSha256']==hashlib.sha256(HELPER.read_bytes()).hexdigest()
    results=[]
    for t in [2,4]:
        b,r,roots=reference(t);p=json.loads((SOURCE/f'T{t:02d}-target.json').read_text())
        for i,sector in enumerate(p['sectors']):
            boxes=[]
            for j,item in enumerate(sector['certifiedPositiveRealPartRoots']):
                stem=f'/sectors/{i}/certifiedPositiveRealPartRoots/{j}/certificate/box'
                X=[base.interval(p,stem+'/'+str(k)) for k in range(2)]
                assert low(X[0])>0
                for old in boxes: assert any(high(old[k])<low(X[k]) or high(X[k])<low(old[k]) for k in range(2))
                boxes.append(X)
                proof=inclusion(X,lambda z:characteristic(b,r,roots,z,sector['k'],mp.iv))
                results.append({'rung':t,'sector':sector['k'],'proof':proof})
            print(json.dumps({'rung':t,'sector':sector['k'],'certified':len(boxes)}),flush=True)
    save('target',{'results':results,'directWitnesses':len(results),'boundary':'Cartesian spectral inclusion conditional on exact reference certificates; no complete spectrum or nonlinear fate'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    known() if a.stage=='known' else target()
