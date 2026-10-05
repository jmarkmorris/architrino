"""Independent conditional incoming polar/first-speed guard corollary."""
import argparse,importlib.util,json,hashlib,time
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('frozen_curve',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b);iv=b.iv
def polar(q,u):
    r=b.k.norm(q);assert r.a>0;dr=b.k.dot(q,u)/r;cross=q[0]*u[1]-q[1]*u[0]
    return dict(radius=r,radial=dr,tangent=cross/r,rate=cross/(r*r))
def known():
    z=polar([b.IQ(3),b.IQ(4),b.IQ(0)],[b.IQ('-.8'),b.IQ('.6'),b.IQ(0)])
    assert b.k.contains(z['radius'],5) and b.k.contains(z['radial'],0) and b.k.contains(z['tangent'],1) and b.k.contains(z['rate'],b.IQ('.2'))
    assert (b.IQ('.9')+b.IQ('.05')).b<1 and not (b.IQ('.95')+b.IQ('.05')).b<1
    return dict(passed=True,prior=b.known(),cases=['signed 3-4-5 polar quantities','strict versus equality speed guard'])
def analyze(path):
    guard=json.loads(Path(path).read_text());raw=Path(guard['input']).read_bytes();assert hashlib.sha256(raw).hexdigest()==guard['SHA256'];ad=json.loads(raw);c=ad['case'];hb=Path(c['input']).read_bytes();assert hashlib.sha256(hb).hexdigest()==guard['historySHA256']==c['SHA256']
    curve=b.Curve(json.loads(hb)['knots'],c['jetSelection']['midpoint']);left=Q('38.3');face=left;stopped=False;ranges={};started=time.monotonic()
    for row in ad['rows']:
        right=left+Q(row['exactCoefficients']['dt']);q=curve.box(left,right,0);u=curve.box(left,right,1);ex,ev=Q(row['exactErrors']['x']),Q(row['exactErrors']['v']);speed=b.k.norm(u)+b.IQ(ev)
        if not stopped:
            if speed.b<1:face=right
            else:stopped=True
        q=[z+iv.mpf([-b.IQ(ex).b,b.IQ(ex).b]) if k<2 else z for k,z in enumerate(q)];u=[z+iv.mpf([-b.IQ(ev).b,b.IQ(ev).b]) if k<2 else z for k,z in enumerate(u)]
        pol=polar(q,u)
        for name,z in pol.items():ranges[name]=iv.mpf([min(ranges[name].a,z.a),max(ranges[name].b,z.b)]) if name in ranges else z
        left=right
    assert left==Q('38.4') and len(ad['rows'])==1006 and stopped
    assert ranges['radial'].b<0 and ranges['tangent'].a>0 and face>=Q(guard['eventTimeLower'])
    duration=face-Q('38.3');phaseLower=ranges['rate'].a*b.IQ(duration);phaseUpper=ranges['rate'].b*b.IQ('.1');decrease=-ranges['radial'].b*b.IQ(duration)
    return dict(passed=True,cells=1006,own_guard=str(face),ranges=b.k.encode(ranges),phase_increment_lower=b.k.encode(phaseLower),phase_increment_upper=b.k.encode(phaseUpper),radius_decrease_lower=b.k.encode(decrease),wall_seconds=time.monotonic()-started,scope='conditional original incoming window only; actual prefix/error admission external, failed speed enclosure is not crossing')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
