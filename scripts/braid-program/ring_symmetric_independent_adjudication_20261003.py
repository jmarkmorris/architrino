"""Independent Cartesian causal-chain verification of ring spectral witnesses.

Consumes certified reference enclosures, never subject tensors or matrices.
Controls precede targets. K=c_f=1 throughout.
"""
import argparse, hashlib, json, time
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/symmetric-adjudication'
SOURCE=ROOT/'.local-data/ring-exploration/stability'
mp.mp.dps=110
mp.iv.dps=100

def identity(): return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def low(x): return mp.mpf(x.a)
def high(x): return mp.mpf(x.b)
def sign(x): return 1 if low(x)>0 else -1 if high(x)<0 else 0
def interval(packet,path):
    bounds=packet['exactIntervalBinaryBounds'][path]
    return mp.iv.mpf([mp.make_mpf(tuple(v)) for v in bounds])

def chain(n,length,velocity,acceleration,D,polarity,dq,fixed_velocity):
    # Differentiate the causal time and then the Cartesian row directly.
    emission_change=-dot(n,dq)/D
    separation_change=[dq[i]-velocity[i]*emission_change for i in range(2)]
    length_change=dot(n,separation_change)
    direction_change=[(separation_change[i]-n[i]*length_change)/length for i in range(2)]
    velocity_change=[fixed_velocity[i]+acceleration[i]*emission_change for i in range(2)]
    D_change=-dot(direction_change,velocity)-dot(n,velocity_change)
    return [polarity/(length**2*abs(D))*(direction_change[i]-n[i]*(2*length_change/length+D_change/D)) for i in range(2)]

def row_variation(beta,radius,x,m,z,column,ctx):
    omega=beta/radius
    angle=-2*x
    c,s=ctx.cos(angle),ctx.sin(angle)
    source_position=[radius*c,radius*s]
    separation=[radius-source_position[0],-source_position[1]]
    length=2*radius*ctx.sin(x)
    n=[v/length for v in separation]
    velocity=[-omega*source_position[1],omega*source_position[0]]
    acceleration=[-omega**2*v for v in source_position]
    D=1-dot(n,velocity)
    u=[ctx.mpf(int(column==i)) for i in range(2)]
    rotated=[c*u[0]-s*u[1],s*u[0]+c*u[1]]
    rotated_j=[-c*u[1]-s*u[0],-s*u[1]+c*u[0]]
    E=ctx.exp(-z*length)
    dq=[u[i]-E*rotated[i] for i in range(2)]
    fv=[E*(z*rotated[i]+omega*rotated_j[i]) for i in range(2)]
    d_dq=[length*E*v for v in rotated]
    d_fv=[E*((1-length*z)*rotated[i]-length*omega*rotated_j[i]) for i in range(2)]
    return (chain(n,length,velocity,acceleration,D,(-1)**m,dq,fv),
            chain(n,length,velocity,acceleration,D,(-1)**m,d_dq,d_fv))

def characteristic(beta,radius,roots,z,ctx):
    omega=beta/radius
    A=[[z*z-omega*omega,-2*omega*z],[2*omega*z,z*z-omega*omega]]
    derivative=[[2*z,-2*omega],[2*omega,2*z]]
    for m,x in roots:
        for column in range(2):
            variation,d_variation=row_variation(beta,radius,x,m,z,column,ctx)
            for i in range(2):
                A[i][column]-=variation[i]
                derivative[i][column]-=d_variation[i]
    det=A[0][0]*A[1][1]-A[0][1]*A[1][0]
    dd=derivative[0][0]*A[1][1]+A[0][0]*derivative[1][1]-derivative[0][1]*A[1][0]-A[0][1]*derivative[1][0]
    return radius*det/z,radius*(z*dd-det)/(z*z),[-A[0][1],A[0][0]]

def save(stage,payload):
    def encode(x):
        if hasattr(x,'_mpi_'): return {'binary':[list(v) for v in x._mpi_],'display':[mp.nstr(low(x),40),mp.nstr(high(x),40)]}
        if isinstance(x,dict): return {k:encode(v) for k,v in x.items()}
        if isinstance(x,(tuple,list)): return [encode(v) for v in x]
        return x
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/(stage+'.json')).write_text(json.dumps(encode({'sourceSha256':identity(),'passed':True,'K':1,'c_f':1,**payload}),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':True}),flush=True)

def known():
    for q in [1,-1]:
        for j in range(2):
            u=[mp.mpf(int(i==j)) for i in range(2)]
            value=chain([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),q,u,[0,0])
            expected=[q*mp.mpf('-0.25')*u[0],q*mp.mpf('.125')*u[1]]
            assert value==expected
    # Closed circular geometry identities at a chosen ordinary hit, not an equilibrium.
    b,r,x=map(mp.mpf,['2','.5','.7'])
    c,s=mp.cos(-2*x),mp.sin(-2*x)
    sep=[r*(1-c),-r*s];ell=2*r*mp.sin(x);n=[v/ell for v in sep]
    vel=[-b*s,b*c]
    assert abs(dot(n,n)-1)<mp.mpf('1e-100')
    assert abs(dot(n,vel)-b*mp.cos(x))<mp.mpf('1e-100')
    save('known',{'controls':['static Cartesian derivative diag(-2,1)/8 for both polarities','circle range and transmitter factor identities']})

def target(rungs):
    control=json.loads((OUT/'known.json').read_text())
    assert control['passed'] and control['sourceSha256']==identity()
    results=[]
    for t in rungs:
        path=SOURCE/f'T{t:02d}-certificate.json';packet=json.loads(path.read_text())
        assert packet['passed']
        beta=interval(packet,'/beta');radius=interval(packet,'/R')
        roots=[(row['m'],interval(packet,f'/rootRows/{j}/v')) for j,row in enumerate(packet['rootRows'])]
        expected=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,t) for k in (-1,1)]
        assert [(r['m'],r['branch']) for r in packet['rootRows']]==expected
        assert len(roots)==2*t+4
        for m,x in roots:
            D=1-beta*mp.iv.cos(x)
            assert sign(D)!=0
            assert low(beta*mp.iv.sin(x)-x-m*mp.iv.pi/6)<=0<=high(beta*mp.iv.sin(x)-x-m*mp.iv.pi/6)
        witnesses=[]
        for item in packet['positiveRealWitnesses']:
            a,b=map(mp.mpf,item['zBracket']);Z=mp.iv.mpf([a,b])
            endpoints=[characteristic(beta,radius,roots,mp.iv.mpf(z),mp.iv)[0] for z in [a,b]]
            whole=characteristic(beta,radius,roots,Z,mp.iv)
            assert sign(endpoints[0])*sign(endpoints[1])==-1
            assert sign(whole[1])!=0
            assert any(sign(v)!=0 for v in whole[2])
            witnesses.append({'bracket':item['zBracket'],'endpointG':endpoints,'GPrime':whole[1],'kickNumerator':whole[2]})
        results.append({'rung':t,'referenceReceiptSha256':hashlib.sha256(path.read_bytes()).hexdigest(),'witnesses':witnesses})
        print(json.dumps({'completedRung':t,'witnesses':len(witnesses)}),flush=True)
    save('target',{'boundary':'independent causal-chain characteristic calculation conditional on supplied exact-reference interval certificates; no nonlinear claim or total spectrum count','results':results})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--rungs',nargs='+',type=int,default=[2,4,6,10,20,50,100,200]);a=p.parse_args()
    known() if a.stage=='known' else target(a.rungs)
