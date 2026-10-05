"""Extend the admitted common axial contour method to declared higher rungs."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
METHOD=ROOT/'scripts/braid-program/ring_common_axial_count_20261003.py'
METHOD_SHA='0e4fb74fba6ff5a7f74140070ee6b1e7cf9dc5652f822961516c37f80116acf3'
ADMISSION=ROOT/'.local-data/ring-exploration/symmetric-adjudication/target.json'
OUT=ROOT/'.local-data/ring-exploration/common-axial-higher'
spec=importlib.util.spec_from_file_location('frozen_common_axial_method',METHOD);method=importlib.util.module_from_spec(spec);spec.loader.exec_module(method)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    payload={'instrumentSha256':sha(Path(__file__)),'methodSha256':sha(METHOD),'K':1,'c_f':1,**data}
    (OUT/(stage+'.json')).write_text(json.dumps(method.encode(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'passed':data['passed'],'panels':len(data.get('panels',[])),'count':data.get('rightHalfPlaneZeroCount')}),flush=True)
def known():
    assert sha(METHOD)==METHOD_SHA
    a=method.winding_cover(lambda z:z+1,mp.mpf('.1'),mp.mpf(20));assert a['rightHalfPlaneZeroCount']==0
    b=method.winding_cover(lambda z:((z-mp.iv.mpf('.5'))**2+1)/(z+3),mp.mpf('.1'),mp.mpf(20));assert b['rightHalfPlaneZeroCount']==2
    zero=e1(mp.iv.mpc(0));assert method.lo(zero.real)==method.hi(zero.real)==1 and method.lo(zero.imag)==method.hi(zero.imag)==0
    value=e1(mp.iv.mpc(0,mp.iv.mpf('.2')));closed=(1-mp.iv.exp(mp.iv.mpc(0,-mp.iv.mpf('.2'))))/mp.iv.mpc(0,mp.iv.mpf('.2'))
    assert method.lo(value.real)<=method.hi(closed.real) and method.lo(closed.real)<=method.hi(value.real)
    assert method.lo(value.imag)<=method.hi(closed.imag) and method.lo(closed.imag)<=method.hi(value.imag)
    save('known',{'passed':True,'controls':['closed stable rootcount0','closed conjugate rootcount2'],'admissionSha256':sha(ADMISSION)})
def e1(q):
    if method.lo(abs(q))>0:
        return (1-mp.iv.exp(-q))/q
    upper=method.hi(abs(q))
    if upper>mp.mpf('.25'):return mp.iv.mpc([-mp.inf,mp.inf],[-mp.inf,mp.inf])
    term=mp.iv.mpc(1);total=term
    for k in range(1,25):term*=(-q)/(k+1);total+=term
    remainder=mp.iv.exp(mp.iv.mpf(upper))*mp.iv.mpf(upper)**25/mp.factorial(26)
    tail=method.hi(remainder)
    return total+mp.iv.mpc([-tail,tail],[-tail,tail])
def target(rungs,gamma_token):
    c=json.loads((OUT/'known.json').read_text());assert c['passed'] and c['instrumentSha256']==sha(Path(__file__)) and c['methodSha256']==METHOD_SHA and c['admissionSha256']==sha(ADMISSION)
    admission=json.loads(ADMISSION.read_text());assert admission['passed']
    accepted={r['rung']:r['referenceReceiptSha256'] for r in admission['results']}
    for t in rungs:
        path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json';assert sha(path)==accepted[t]
        p=json.loads(path.read_text());B=method.base.interval(p,'/beta');R=method.base.interval(p,'/R');rows=[]
        assert len(p['rootRows'])==2*t+4
        for j,row in enumerate(p['rootRows']):
            X=method.base.interval(p,f'/rootRows/{j}/v');D=1-B*mp.iv.cos(X);assert method.sign(D)
            delay=2*R*mp.iv.sin(X);assert method.lo(delay)>0
            rows.append(((-1)**row['m']/(delay**3*abs(D)),delay))
        gamma=mp.mpf(0) if gamma_token=='0' else mp.mpf('.05')+mp.mpf('1e-20')
        C=sum((abs(w)*(1+mp.iv.exp(mp.iv.mpf(gamma)*d)) for w,d in rows),mp.iv.mpf(0))
        radius=mp.ceil(mp.sqrt(method.hi(C))+gamma)+1;assert (radius-gamma)**2>method.hi(C)
        def G(z):return z-sum((w*d*e1(z*d) for w,d in rows),mp.iv.mpc(0))
        result=method.winding_cover(G,gamma,radius)
        suffix='zero-target' if gamma_token=='0' else 'target'
        save(f'T{t:02d}-{suffix}',{'passed':True,'topology':t,'referenceSha256':sha(path),'gamma':gamma,'outerRadius':radius,'outerCap':C,**result})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);p.add_argument('--rungs',nargs='+',type=int,default=[8,10,20,50,100,200]);p.add_argument('--gamma',choices=['0','.05'],default='0');a=p.parse_args()
    known() if a.stage=='known' else target(a.rungs,a.gamma)
