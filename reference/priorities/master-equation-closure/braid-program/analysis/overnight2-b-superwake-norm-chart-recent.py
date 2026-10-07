"""All-reception causal charts from uniform position and velocity norms."""
import argparse,hashlib,importlib.util,json,math,resource,time
from fractions import Fraction as F
from pathlib import Path
P=Path(__file__);DEP=P.with_name('overnight2-b-superwake-determinant.py')
SHA='2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==SHA
spec=importlib.util.spec_from_file_location('frozen_interval_subject',DEP);q=importlib.util.module_from_spec(spec);spec.loader.exec_module(q)
iv=q.iv;I=q.interval;rat=q.rational;bd=q.bounds;enc=q.encode;sgn=q.sign
ROOT=P.resolve().parents[5];OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-norm-chart-recent';START=time.monotonic()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def geometry(d,j,B,h,u,eps,nu):
    angle=j*iv.pi/3-B*d
    error=8*eps+4*eps**2
    product=2*eps*B+2*nu+2*eps*nu+2*h*u
    gap=4*iv.sin(angle/2)**2-d**2+I(-bd(error)[1],bd(error+4*h*h)[1])
    derivative=-2*B*iv.sin(angle)-2*d+I(-bd(2*product)[1],bd(2*product)[1])
    return gap,derivative

def census(fun,guesses,recent,end):
    rows=[];inactive=[];cursor=recent
    for guide in guesses:
        center=F(str(guide));s=sgn(fun(I(center))[1])
        if not s:raise ArithmeticError('guide derivative unresolved')
        left=right=None
        for power in range(12):
            width=F(1,2048)*2**power
            a,b=center-width,center+width
            if left is None and a>cursor and sgn(fun(I(a))[0])==-s:left=a
            if right is None and b<end and sgn(fun(I(b))[0])==s:right=b
            if left is not None and right is not None:break
        if left is None or right is None:raise ArithmeticError('uniform endpoints unresolved')
        X=I(left,right);g,der=fun(X)
        if sgn(der)!=s:raise ArithmeticError('uniform bracket derivative unresolved')
        inactive+=q.complement(fun,cursor,left);cursor=right
        root=X
        for _ in range(24):
            a,b=bd(root);mid=(a+b)/2;d=fun(root)[1]
            if not sgn(d):raise ArithmeticError('Newton divisor lost')
            new=q.intersect(root,rat(mid)-fun(I(mid))[0]/d)
            if bd(new)==bd(root):break
            root=new
        divisor=-fun(root)[1]/(2*root)
        if not sgn(divisor):raise ArithmeticError('ordinary margin unresolved')
        rows.append(dict(bracket=[str(left),str(right)],endpoints=[enc(fun(I(left))[0]),enc(fun(I(right))[0])],derivative=enc(der),root=enc(root),sourceDivisor=enc(divisor)))
    inactive+=q.complement(fun,cursor,end)
    return dict(roots=rows,complement=inactive)

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    record=dict(instrumentSha256=sha(P),dependencySha256=SHA,K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,**data)
    text=json.dumps(record,indent=2);assert len(text)<8*1024**2
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)

def known():
    zero=I(0);channels=[]
    for j in range(1,6):
        row=census(lambda d:geometry(d,j,zero,zero,zero,zero,zero),[2*math.sin(j*math.pi/6)],F(1,100),F(3));assert len(row['roots'])==1;channels.append(row)
    assert q.sign(geometry(I(2),3,zero,zero,zero,zero,zero)[1])==-1
    q.contains(geometry(I(2),3,zero,zero,zero,zero,zero)[0],0)
    q.contains(geometry(I(2),3,zero,zero,zero,zero,zero)[1],-4)
    # Hand-derived perturbation errors: eps=1/100, nu=1/50, h=1/10,u=1/5,B=2.
    eps,nu,h,u,B=map(rat,[F(1,100),F(1,50),F(1,10),F(1,5),F(2)])
    q.contains(8*eps+4*eps**2,F(201,2500));q.contains(2*(2*eps*B+2*nu+2*eps*nu+2*h*u),F(301,1250))
    # Uniform self guard beta=2, nu=0, d<=1/100 from sin x >= x-x^3/6.
    lower=rat(2)*(1-(rat(2)*rat(F(1,100))/2)**2/6)
    assert bd(lower)[0]>F(1999,1000)
    assert bd(rat(2)*(1-(rat(2)*rat(F(1,4))/2)**2/6))[0]>F(197,100)
    save('known',dict(passed=True,controls=['five complete static channels','diametric gap and derivative','exact norm-error arithmetic','sine lower self guard'],channels=channels))

def run(stage):
    kp=OUT/'known.json';k=json.loads(kp.read_text());assert k['passed'] and k['instrumentSha256']==sha(P)
    raw=dict(beta=['1.8264309646546788','1.8264309646546788'],height='0.1',axialSpeed='0.3',planarPositionError='0.0005',planarVelocityError='0.005') if stage=='pilot' else dict(beta=['1.825','1.828'],height='0.125',axialSpeed='0.5',planarPositionError='0.001',planarVelocityError='0.01')
    B=I(*map(F,raw['beta']));h,u,eps,nu=[rat(F(raw[key])) for key in ['height','axialSpeed','planarPositionError','planarVelocityError']]
    recent=F(1,4);end=bd(2*iv.sqrt((1+eps)**2+h*h))[1]+F(1,100)
    selfFloor=B*(1-(B*rat(recent)/2)**2/6)-nu
    speed=iv.sqrt((B+nu)**2+u*u);partnerFloor=1-2*eps-(1+speed)*rat(recent)
    assert bd(selfFloor)[0]>1 and bd(partnerFloor)[0]>0
    guides=[[1.95],[.375,1.48,1.8],[.737],[1.09],[1.43],[1.73]]
    rows=[];failure=None
    for j in range(6):
        try:
            row=census(lambda d:geometry(d,j,B,h,u,eps,nu),guides[j],recent,end);row['source']=j;rows.append(row)
        except (ArithmeticError,TimeoutError,MemoryError) as e:failure=str(e);break
    save(stage,dict(passed=failure is None and len(rows)==6 and [len(r['roots']) for r in rows]==[1,3,1,1,1,1],knownSha256=sha(kp),domain=raw,guards=dict(recent=str(recent),end=str(end),selfSecantFloor=enc(selfFloor),partnerGapFloor=enc(partnerFloor)),channels=rows,failure=failure,pendingSources=list(range(len(rows),6)),claim='Uniform all-reception chart for every complete C1 profile satisfying declared global norms; no exact balance or stability'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
