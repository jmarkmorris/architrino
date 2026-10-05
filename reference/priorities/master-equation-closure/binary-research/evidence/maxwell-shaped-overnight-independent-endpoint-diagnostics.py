"""Independent interval bilinear endpoint/source corollary of accepted tube."""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('curve_reference',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b);iv=b.iv

def polar(q,u,p,v):
    R=b.k.norm(q);V=b.k.norm(u);p,v=b.IQ(p),b.IQ(v);radius=R+iv.mpf([-p.b,p.b]);speed=V+iv.mpf([-v.b,v.b]);assert radius.a>0
    eta=R.b*v+V.b*p+p*v;dot=b.k.dot(q,u)+iv.mpf([-eta.b,eta.b]);det=q[0]*u[1]-q[1]*u[0]+iv.mpf([-eta.b,eta.b]);return dict(radius=radius,speed=speed,radial=dot/radius,tangent=det/radius,rate=det/(radius*radius))
def known():
    z=list(map(b.IQ,[3,4,0]));v=list(map(b.IQ,['-.8','.6',0]));r=polar(z,v,0,0);assert b.k.contains(r['radius'],5) and b.k.contains(r['radial'],0) and b.k.contains(r['tangent'],1)
    r=polar(z,v,'.01','.01');assert r['radius'].a<5<r['radius'].b and r['tangent'].a<1<r['tangent'].b
    return dict(passed=True,cases=['independent signed 3-4-5 polar','nonzero norm-ball bilinear bound'])
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.receipt:
        d=json.loads(Path(a.receipt).read_text());tb=Path(d['tube']).read_bytes();tube=json.loads(tb);rb=Path(d['tube']+'.jsonl').read_bytes();hb=Path(tube['input']).read_bytes()
        for raw,key in [(tb,'tubeSHA'),(rb,'rowsSHA'),(hb,'inputSHA')]:assert hashlib.sha256(raw).hexdigest()==d[key]
        assert tube['firstFailure'] is None;rows=list(map(json.loads,rb.decode().splitlines()));r=rows[-1];T=Q(tube['horizon']);saved=json.loads(hb);curve=b.Curve(saved['knots'],[0,0]);q,u=[curve.box(T,T,n) for n in [0,1]];pol=polar(q,u,Q(r['x']),Q(r['v']))
        S=r['S'];lo,hi=Q(S['lo']),Q(S['hi']);assert 0<lo<=hi<T and lo==Q(d['actualFinalBin']['S']['lo']) and hi==Q(d['actualFinalBin']['S']['hi'])
        ae=max(Q(tube['final']['prefixA']),Q(tube['pastMismatch'][2]));assert ae==Q(d['actualEndpoint']['sourceAccelerationError']);A=b.k.norm(curve.box(lo,hi,2));AI=A+iv.mpf([-b.IQ(ae).b,b.IQ(ae).b])
        assert pol['radius'].b<b.IQ(saved['specification']['r']).a and pol['radial'].b<0 and pol['tangent'].a>0 and AI.a>0
        out['target']={'passed':True,'receipt':a.receipt,'sha256':hashlib.sha256(Path(a.receipt).read_bytes()).hexdigest(),'polar':b.k.encode(pol),'sourceAccelerationNorm':b.k.encode(AI),'scope':'derived independent coarse finite actual endpoint corollary of accepted original prefix; no fate/binding'}
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'known':out['known'],'target':bool(a.receipt)}),flush=True)
