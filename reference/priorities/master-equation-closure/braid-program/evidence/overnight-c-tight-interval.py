"""Sharper circular-geometry interval evaluator; frozen earlier sources untouched."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
from fractions import Fraction as Q
import time
from mpmath import iv

SELF=Path(__file__);DEP=SELF.with_name('overnight-c-subfield-interval.py')
EXPECTED='c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7'
assert hashlib.sha256(DEP.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('tight_base',DEP)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
iv.dps=30
original_row=base.root_row


def root_row(a,b,delta,w,sigma):
    # Contract: in the declared separated-radius box, identical non-point radius
    # intervals occur only for one pair's own antipodal channel. This fast path
    # must not be reused for independently varying equal interval ranges.
    opposite_same_radius=(a._mpi_==b._mpi_ and delta._mpi_==iv.pi._mpi_)
    # The distance derivative is bounded by omega*min(a,b), including away from
    # the root: ab|sin(theta)|/distance <= min(a,b).
    vmax=(w*min(a.b,b.b)).b
    assert vmax<1
    if opposite_same_radius:
        tau=iv.mpf([(2*a/(1+vmax)).a,(2*a).b])
        GD=iv.mpf([1,(1+vmax).b])
        for _ in range(12):
            mid=(tau.a+tau.b)/2
            D=base.intersect(1+w*a*iv.sin(w*tau/2),GD)
            h=2*a*iv.cos(w*mid/2)-mid
            new=base.intersect(tau,mid+h/D)
            if float(new.delta)>=.999*float(tau.delta):tau=new;break
            tau=new
        D=base.intersect(1+w*a*iv.sin(w*tau/2),GD)
        return sigma/(2*a*D),-sigma*iv.tan(w*tau/2)/(2*a*D),tau,D
    static=iv.sqrt((a-b*iv.cos(delta))**2+(b*iv.sin(delta))**2)
    gap=max(iv.mpf(0),a.a-b.b,b.a-a.b);dlow=max(static.a,gap)
    assert dlow>0
    tau=iv.mpf([(dlow/(1+vmax)).a,(a+b).b])
    GD=iv.mpf([(1-vmax).a,(1+vmax).b])
    for _ in range(12):
        mid=(tau.a+tau.b)/2;theta=delta-w*tau
        distance=iv.sqrt((a-b*iv.cos(theta))**2+(b*iv.sin(theta))**2)
        D=base.intersect(1+w*a*b*iv.sin(theta)/distance,GD) if distance.a>0 else GD
        th=delta-w*mid
        hm=iv.sqrt((a-b*iv.cos(th))**2+(b*iv.sin(th))**2)-mid
        new=base.intersect(tau,mid+hm/D)
        if float(new.delta)>=.999*float(tau.delta):tau=new;break
        tau=new
    theta=delta-w*tau;D=base.intersect(1+w*a*b*iv.sin(theta)/tau,GD)
    radial=sigma*(a-b*iv.cos(theta))/(tau**2*D)
    alternate=sigma*(1+(a*a-b*b)/tau**2)/(2*a*D)
    return base.intersect(radial,alternate),-sigma*b*iv.sin(theta)/(tau**2*D),tau,D


base.root_row=root_row
residual_box=base.residual_box


def known():
    base.known()
    # Exact tangent-to-source-circle geometry: a=1,b=2,cos(theta)=1/2.
    # The distance is sqrt(3); ab sin(theta)/distance=1=min(a,b).
    ratio=2*iv.sin(iv.pi/3)/iv.sqrt(3)
    assert ratio.a<=1<=ratio.b
    # Antipodal moving pair with tau=2*cos(x), omega=x/cos(x), x=pi/6.
    x=iv.pi/6;omega=x/iv.cos(x)
    rr,rt,tau,D=root_row(iv.mpf(1),iv.mpf(1),iv.pi,omega,-1)
    exactD=1+omega/2
    assert tau.a<=iv.sqrt(3).a and tau.b>=iv.sqrt(3).b
    er=-1/(2*exactD);et=iv.tan(x)/(2*exactD)
    assert rr.a<=er.a and rr.b>=er.b and rt.a<=et.a and rt.b>=et.b
    return {'passed':True,'controls':['original interval controls','exact min-radius distance derivative',
                                     'exact antipodal moving root and rows']}


def pilot(source):
    receipt=json.loads((base.OUT/'tight-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
    helper=SELF.with_name('overnight-c-interval-continue.py')
    assert hashlib.sha256(helper.read_bytes()).hexdigest()=='61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d'
    sp=importlib.util.spec_from_file_location('cover_helper',helper);cover=importlib.util.module_from_spec(sp);sp.loader.exec_module(cover)
    raw=(base.OUT/source).read_bytes();prior=json.loads(raw);domain=[tuple(Q(s) for s in p) for p in prior['domain']]
    cover.check_partition([e[0] for e in prior['excluded']]+prior['unresolved'])
    paths=prior['unresolved'];indices=sorted(set(int(k*(len(paths)-1)/15) for k in range(16)))
    rows=[];begin=time.monotonic()
    for index in indices:
        path=paths[index];box=cover.decode(path,domain);start=time.monotonic();k,v=residual_box(box)
        rows.append({'path':path,'component':k,'interval':str(v),'seconds':time.monotonic()-start})
    return {'source':source,'source_sha256':hashlib.sha256(raw).hexdigest(),'rows':rows,'wall_seconds':time.monotonic()-begin}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot'],required=True)
    p.add_argument('--source',default='interval-continued.json');args=p.parse_args()
    result=known() if args.stage=='known' else pilot(args.source)
    result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['dependency_sha256']=EXPECTED
    dest=base.OUT/('tight-'+args.stage+'.json');dest.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
