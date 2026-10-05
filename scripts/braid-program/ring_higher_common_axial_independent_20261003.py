#!/usr/bin/env python3
"""Higher common-axial independent Cartesian/full-rectangle extension.
Reuses only Hale's frozen independent contour method, never root subject
functions. Fills the translation quotient at zero independently.
"""
import argparse,hashlib,importlib.util,json,math,time
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
METHOD=ROOT/'scripts/braid-program/ring_common_axial_independent_adjudication_20261003.py'
METHOD_SHA='180e48ebb05024ddc9eacb9544f7b1349473af2ec5b88714a203da95a3bd779c'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
ADMISSION_SHA='5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf'
OUT=ROOT/'.local-data/ring-exploration/higher-common-axial-independent'
spec=importlib.util.spec_from_file_location('frozen_cartesian_contour',METHOD);method=importlib.util.module_from_spec(spec);spec.loader.exec_module(method)
I=method.I;lo=method.low;hi=method.high

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json');p.write_text(json.dumps(method.encode({'instrumentSha256':sha(Path(__file__)),'methodSha256':sha(METHOD),'admissionSha256':sha(ADMISSION),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n');print(json.dumps({'stage':stage,'passed':data['passed'],'sha256':sha(p),'count':data.get('zeroCount'),'panels':len(data.get('panels',[]))}),flush=True)
def disk(error):return mp.iv.mpc(I(-error,error),I(-error,error))
def phi(x,N=30):
    # Entire f(x)=(1-exp(-x))/x; series at/removable origin.
    if lo(abs(x))>0 and hi(abs(x))>mp.mpf('.5'):return (1-mp.iv.exp(-x))/x
    radius=hi(abs(x));assert radius<mp.mpf('.6')
    partial=sum(((-x)**n/I(math.factorial(n+1)) for n in range(N+1)),mp.iv.mpc(0))
    tail=I(radius)**(N+1)/I(math.factorial(N+2))/(1-I(radius)/(N+3))
    return partial+disk(hi(tail))
def phi_prime(x,N=30):
    if lo(abs(x))>0 and hi(abs(x))>mp.mpf('.5'):return (x*mp.iv.exp(-x)-(1-mp.iv.exp(-x)))/(x*x)
    radius=hi(abs(x));assert radius<mp.mpf('.6')
    partial=sum((n*(-1)**n*x**(n-1)/I(math.factorial(n+1)) for n in range(1,N+1)),mp.iv.mpc(0))
    tail=(N+1)*I(radius)**N/I(math.factorial(N+2))/(1-2*I(radius)/(N+3))
    return partial+disk(hi(tail))
def functions(rows):
    def G(z):return z-sum((w*d*phi(z*d) for w,d in rows),mp.iv.mpc(0))
    def derivative(z):
        if lo(abs(z))==0:
            # f'(x)=-integral_0^1 t exp(-t*x)dt; valid on complete box.
            gamma=max(mp.mpf(0),-lo(z.real))
            cap=sum((abs(w)*d*d*mp.iv.exp(I(gamma)*d)/2 for w,d in rows),I(0))
            return mp.iv.mpc(1+I(-hi(cap),hi(cap)),I(-hi(cap),hi(cap)))
        return 1-sum((w*d*d*phi_prime(z*d) for w,d in rows),mp.iv.mpc(0))
    return G,derivative

def known():
    assert sha(METHOD)==METHOD_SHA and sha(ADMISSION)==ADMISSION_SHA
    # Independently known entire origin values and derivative of f.
    a=phi(mp.iv.mpc(0));b=phi_prime(mp.iv.mpc(0));assert lo(a.real)<=1<=hi(a.real) and lo(b.real)<=mp.mpf('-.5')<=hi(b.real)
    control0=method.complete_count(lambda z:z+1,lambda z:mp.iv.mpc(1),mp.mpf(0),mp.mpf(20));assert control0['zeroCount']==0
    def rational(z):return ((z-I('.5'))**2+1)/(z+3)
    def derivative(z):return (2*(z-I('.5'))*(z+3)-((z-I('.5'))**2+1))/(z+3)**2
    control2=method.complete_count(rational,derivative,mp.mpf(0),mp.mpf(20));assert control2['zeroCount']==2
    w,d,D,_=method.axial_weight([I(2),I(0)],[I(0),I(0)],[I(0),I(0)],1);assert lo(w)==hi(w)==mp.mpf(1)/8
    save('known',{'passed':True,'entirePhiAtZero':a,'entirePhiPrimeAtZero':b,'zeroCountControl':control0,'twoCountControl':control2,'staticCartesianWeight':w})

def reconstruct(t):
    a=json.loads(ADMISSION.read_text());assert a['passed'];accepted={r['rung']:r['referenceReceiptSha256'] for r in a['results']}
    path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json';assert sha(path)==accepted[t];p=json.loads(path.read_text());assert p['passed']
    B,R,W=[method.read(p,k) for k in ['/beta','/R','/Omega']];expected=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,t) for k in [-1,1]];assert [(r['m'],r['branch']) for r in p['rootRows']]==expected
    rows=[];acc=[I(0),I(0)];floor=mp.inf
    for n,row in enumerate(p['rootRows']):
        x=method.read(p,f'/rootRows/{n}/v');angle=-2*x;y=[R*mp.iv.cos(angle),R*mp.iv.sin(angle)];v=[-W*y[1],W*y[0]]
        w,d,D,sep=method.axial_weight([R,I(0)],y,v,(-1)**row['m']);assert lo(d)>0 and method.sign(D)
        gap=B*mp.iv.sin(x)-x-row['m']*mp.iv.pi/6;assert lo(gap)<=0<=hi(gap)
        floor=min(floor,lo(abs(D)));rows.append((w,d))
        for k in range(2):acc[k]+=w*sep[k]
    residual=[acc[0]+W*W*R,acc[1]];assert all(lo(v)<=0<=hi(v) for v in residual)
    return rows,{'referenceSha256':sha(path),'rootCountPerReceiver':len(rows),'positiveDelaySelfCountPerReceiver':sum(m%6==0 for m,k in expected),'minimumAbsD':floor,'radialTangentialBalanceResidual':residual}

def target(rungs):
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__)) and known['methodSha256']==METHOD_SHA and known['admissionSha256']==ADMISSION_SHA
    for t in rungs:
        start=time.monotonic();rows,admission=reconstruct(t);G,derivative=functions(rows)
        cap=2*sum((abs(w) for w,d in rows),I(0));L=mp.ceil(mp.sqrt(hi(cap)))+1;assert L*L>hi(cap)
        answer=method.complete_count(G,derivative,mp.mpf(0),L)
        translation=-sum((w*d for w,d in rows),I(0));assert method.sign(translation)!=0
        save(f'T{t:02d}-target',{'passed':True,'rung':t,'literalBoundaryRealPart':0,'weightsDelays':rows,'outerCap':cap,'outerRadius':L,'removedZeroValue':translation,**admission,**answer,'wallSeconds':time.monotonic()-start,'scope':'nonneutral common-axial roots in literal closed right half-plane'})
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',choices=['known','target'],required=True);ap.add_argument('--rungs',type=int,nargs='+',default=[8,10,20,50,100,200]);a=ap.parse_args();known() if a.stage=='known' else target(a.rungs)
