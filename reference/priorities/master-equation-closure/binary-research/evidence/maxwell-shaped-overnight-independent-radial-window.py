"""Frozen actual full original prefix corollary on [20,35], not evolved fate.
Already accepted closed tube rows supply whole-bin errors. Gaussian rational
position polynomials and independent bilinear norm bounds supply vR/vT.
"""
import argparse,json,hashlib,time
from pathlib import Path
from fractions import Fraction as Q
import importlib.util
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('frozen',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b);iv=b.iv
def quantities(q,u,ex,ev):
    r=b.k.norm(q);v=b.k.norm(u);eta=r*b.IQ(ev)+v*b.IQ(ex)+b.IQ(ex)*b.IQ(ev)
    radius=r+iv.mpf([-b.IQ(ex).b,b.IQ(ex).b]);assert radius.a>0
    dot=b.k.dot(q,u);det=q[0]*u[1]-q[1]*u[0]
    pad=iv.mpf([-eta.b,eta.b]);return dict(radius=radius,radial=(dot+pad)/radius,tangential=(det+pad)/radius,rate=(det+pad)/(radius**2))
def known():
    a=b.known();q=list(map(b.IQ,[3,4,0]));u=list(map(b.IQ,[-4,3,0]));z=quantities(q,u,0,0)
    assert b.k.contains(z['radius'],5) and b.k.contains(z['radial'],0) and b.k.contains(z['tangential'],5)
    u=list(map(b.IQ,[-3,-4,0]));z=quantities(q,u,Q('1/10'),Q('1/5'));assert z['radial'].b<0
    assert b.k.contains(z['radial'],-5)
    # Frozen final restriction retains the parent's entire error bound.
    assert min(Q('21/1'),Q('35/1'))==21 and max(Q('19/1'),Q('20/1'))==20
    return dict(passed=True,predecessor=a,cases=['signed3-4-5 radial/tangential mapping','nonzero norm-ball bilinear uncertainty','exact clipping to frozen window'])
def analyze(path):
    d=json.loads(Path(path).read_text());tp=Path(d['tube']);tb=tp.read_bytes();tube=json.loads(tb);rb=Path(str(tp)+'.jsonl').read_bytes();hb=Path(tube['input']).read_bytes()
    for raw,key in [(tb,'tubeSHA'),(rb,'rowsSHA'),(hb,'inputSHA')]:assert hashlib.sha256(raw).hexdigest()==d[key]
    assert tube['firstFailure'] is None and tube['law']=='full' and Q(tube['horizon'])==35
    curve=b.Curve(json.loads(hb)['knots'],[0,0]);rows=[json.loads(z) for z in rb.decode().splitlines() if z];assert len(rows)==tube['bins'];old=Q(0);left=Q(20);end=Q(35);parts=[];started=time.monotonic();maximum=None;minimum=None;rhoMin=None;vtMin=None
    for row in rows:
        right=Q(row['t']);assert right>old;l=max(old,left);r=min(right,end)
        if l<r:
            q,u=[curve.box(l,r,n) for n in [0,1]];z=quantities(q,u,Q(row['x']),Q(row['v']));rr=z['radial'];maximum=rr.b if maximum is None else max(maximum,rr.b);minimum=rr.a if minimum is None else min(minimum,rr.a)
            rhoMin=z['radius'].a if rhoMin is None else min(rhoMin,z['radius'].a);vtMin=z['tangential'].a if vtMin is None else min(vtMin,z['tangential'].a)
            parts.append(dict(left=str(l),right=str(r),radial=b.k.encode(rr),radius=b.k.encode(z['radius']),tangential=b.k.encode(z['tangential'])))
        old=right
    assert old==end and parts and Q(parts[0]['left'])==left and Q(parts[-1]['right'])==end
    assert sum(Q(p['right'])-Q(p['left']) for p in parts)==end-left
    for x,y in zip(parts,parts[1:]):assert x['right']==y['left']
    assert maximum<0 and vtMin>0
    return dict(accepted=True,law='full',start='20',end='35',cells=len(parts),tubeSHA=d['tubeSHA'],rowsSHA=d['rowsSHA'],inputSHA=d['inputSHA'],radial=b.k.encode(iv.mpf([minimum,maximum])),radiusLower=b.k.encode(rhoMin),tangentialLower=b.k.encode(vtMin),wall_seconds=time.monotonic()-started,scope='actual original full radius strictly decreases throughout[20,35], positive tangential velocity; no capture/stability/later fate',parts=parts)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({**out,'target':{k:v for k,v in out.get('target',{}).items() if k!='parts'}}),flush=True)
