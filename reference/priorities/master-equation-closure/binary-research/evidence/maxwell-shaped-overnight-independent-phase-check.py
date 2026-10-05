"""Independent whole-bin phase integration with Gaussian position polynomials.
Fixed accepted tube is a premise; no new trajectory/error proof.
"""
import argparse,importlib.util,json,hashlib,time
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('frozen_curve',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b);iv=b.iv
def integrate(parts):return sum((w*b.IQ(dt) for dt,w in parts),b.IQ(0))
def candidates(integral,principal):
    period=2*iv.pi;out=[]
    # Supplied target widths are tiny compared with the enumerated range;
    # derive a general conservative integer range from interval endpoints.
    ratio=(max(abs(integral.a),abs(integral.b))+iv.pi.b)/period.a
    q=Q(b.k.encode(ratio)['hi']);lim=(q.numerator+q.denominator-1)//q.denominator+1
    assert lim<=100000
    for j in range(-lim,lim+1):
        z=principal+j*period
        if max(z.a,integral.a)<=min(z.b,integral.b):out.append(j)
    return out
def known():
    k=b.known();z=integrate([(Q('1/4'),iv.mpf([1,3])),(Q('3/4'),iv.mpf([-1,1]))]);assert b.k.contains(z,b.IQ('-.5')) and b.k.contains(z,b.IQ('1.5'))
    assert candidates(iv.pi*Q(9,4).numerator/Q(9,4).denominator,iv.pi/4)==[1]
    assert len(candidates(iv.mpf([0,(4*iv.pi).b]),b.IQ(0)))>=3
    a=iv.atan2(b.IQ(1),b.IQ(-1));assert a.a<=(3*iv.pi/4).b and a.b>=(3*iv.pi/4).a
    return dict(passed=True,prior=k,cases=['signed whole-bin integration','unique positive winding','ambiguous winding','independent interval atan2 quadrant'])
def analyze(path):
    d=json.loads(Path(path).read_text());tp=Path(d['tube']);tb=tp.read_bytes();tube=json.loads(tb);rb=Path(str(tp)+'.jsonl').read_bytes();hb=Path(tube['input']).read_bytes()
    assert tube['firstFailure'] is None and not tube.get('completedPrefix')
    for raw,key in [(tb,'tubeSHA'),(rb,'rowsSHA'),(hb,'inputSHA')]:assert hashlib.sha256(raw).hexdigest()==d[key]
    saved=json.loads(hb);curve=b.Curve(saved['knots'],[0,0]);rows=list(map(json.loads,rb.decode().splitlines()));assert len(rows)==tube['bins'];prior=Q(0);parts=[];began=time.monotonic();last=began
    for j,row in enumerate(rows):
        right=Q(row['t']);assert right>prior;errorx,errorv=Q(row['x']),Q(row['v']);q=curve.box(prior,right,0);u=curve.box(prior,right,1)
        q=[x+iv.mpf([-b.IQ(errorx).b,b.IQ(errorx).b]) if k<2 else x for k,x in enumerate(q)];u=[x+iv.mpf([-b.IQ(errorv).b,b.IQ(errorv).b]) if k<2 else x for k,x in enumerate(u)]
        r2=b.k.dot(q,q);assert r2.a>0;rate=(q[0]*u[1]-q[1]*u[0])/r2;parts.append((right-prior,rate));prior=right
        if time.monotonic()-last>30:print(json.dumps(dict(heartbeat='independent phase',bins=j+1)),flush=True);last=time.monotonic()
    assert prior==Q(tube['horizon']);total=integrate(parts);q=curve.box(prior,prior,0);e=Q(rows[-1]['x']);q=[x+iv.mpf([-b.IQ(e).b,b.IQ(e).b]) if k<2 else x for k,x in enumerate(q)];principal=iv.atan2(q[1],q[0]);ws=candidates(total,principal)
    assert len(ws)==1 and d['phaseUnwrapping']['uniqueWinding'] and ws[0]==int(d['phaseUnwrapping']['candidates'][0]['winding'])
    return dict(passed=True,bins=len(rows),integrated=b.k.encode(total),principal=b.k.encode(principal),unique_winding=ws[0],wall_seconds=time.monotonic()-began,scope='derived phase corollary of supplied already accepted whole-launch tube; independent polynomial/quadrant integration, no later trajectory')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
