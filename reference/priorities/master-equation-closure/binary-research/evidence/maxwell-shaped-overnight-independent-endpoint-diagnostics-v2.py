"""Successor endpoint reference permitting zero lower source-A norm.
Preserves the frozen v1 positive-source-A target restriction.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-endpoint-diagnostics.py');s=importlib.util.spec_from_file_location('frozen_endpoint',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
def known():
    r=b.known();A=b.iv.mpf([1,2]);e=b.b.IQ(3);lo=max(b.b.IQ(0).a,(A-e).a);assert lo==0
    return {'passed':True,'prior':r,'cases':['source-A triangle lower bound clipped to zero']}
def analyze(path):
    d=json.loads(Path(path).read_text());tb=Path(d['tube']).read_bytes();t=json.loads(tb);rb=Path(d['tube']+'.jsonl').read_bytes();hb=Path(t['input']).read_bytes()
    for raw,key in [(tb,'tubeSHA'),(rb,'rowsSHA'),(hb,'inputSHA')]:assert hashlib.sha256(raw).hexdigest()==d[key]
    assert t['firstFailure'] is None and not t.get('completedPrefix');rows=list(map(json.loads,rb.decode().splitlines()));r=rows[-1];T=Q(t['horizon']);saved=json.loads(hb);curve=b.b.Curve(saved['knots'],[0,0]);pol=b.polar(curve.box(T,T,0),curve.box(T,T,1),Q(r['x']),Q(r['v']))
    lo,hi=Q(r['S']['lo']),Q(r['S']['hi']);assert 0<lo<=hi<T and r['S']==d['actualFinalBin']['S']
    ae=max(Q(t['final']['prefixA']),Q(t['pastMismatch'][2]));assert ae==Q(d['actualEndpoint']['sourceAccelerationError']);A=b.b.k.norm(curve.box(lo,hi,2));AI=A+b.iv.mpf([-b.b.IQ(ae).b,b.b.IQ(ae).b]);AI=b.iv.mpf([max(b.b.IQ(0).a,AI.a),AI.b])
    assert pol['radius'].b<b.b.IQ(saved['specification']['r']).a and pol['radial'].b<0 and pol['tangent'].a>0
    return {'passed':True,'receipt':path,'sha256':hashlib.sha256(Path(path).read_bytes()).hexdigest(),'polar':b.b.k.encode(pol),'sourceAccelerationNorm':b.b.k.encode(AI),'scope':'independent coarse finite actual endpoint corollary of already admitted prefix; no fate'}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
