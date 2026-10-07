"""Outward interval exclusion for the declared logarithmic three-pair box.

Independent of float proposer code, but same-author subject instrument. A separate
review is required for an independently checked claim. Retains unresolved leaves.
"""
import argparse
from collections import deque
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import resource
import time
from mpmath import iv

iv.dps=30
SELF=Path(__file__)
OUT=Path('.local-data/master-equation-closure/overnight-c')
DOMAIN=[(Q(6,5),Q(7,5)),(Q(8,5),Q(9,5)),(Q(1,10),Q(1,2)),
        (-Q(22,7),Q(22,7)),(-Q(22,7),Q(22,7))]


def point(q):
    q=Q(q)
    return iv.mpf(q.numerator)/q.denominator


def hull(a,b): return iv.mpf([a.a,b.b])
def interval(lo,hi): return hull(point(lo),point(hi))
def intersect(a,b):
    lo=max(a.a,b.a); hi=min(a.b,b.b)
    if lo>hi: raise ArithmeticError('empty enclosure')
    return iv.mpf([lo,hi])


def root_row(a,b,delta,w,sigma):
    vmax=(w*b).b
    assert vmax<1
    static=iv.sqrt((a-b*iv.cos(delta))**2+(b*iv.sin(delta))**2)
    # A radius gap may supply a sharper distance floor than dependency-prone trig.
    radial_gap=max(iv.mpf(0),a.a-b.b,b.a-a.b)
    dlow=max(static.a,radial_gap)
    assert dlow>0
    tau=iv.mpf([(dlow/(1+vmax)).a,(a+b).b])
    global_D=iv.mpf([(1-vmax).a,(1+vmax).b])
    for _ in range(12):
        mid=(tau.a+tau.b)/2
        theta=delta-w*tau
        distance=iv.sqrt((a-b*iv.cos(theta))**2+(b*iv.sin(theta))**2)
        D=(intersect(1+w*a*b*iv.sin(theta)/distance,global_D)
           if distance.a>0 else global_D)
        tm=delta-w*mid
        hm=iv.sqrt((a-b*iv.cos(tm))**2+(b*iv.sin(tm))**2)-mid
        new=intersect(tau,mid+hm/D)
        if float(new.delta) >= .999*float(tau.delta):
            tau=new; break
        tau=new
    theta=delta-w*tau
    D=intersect(1+w*a*b*iv.sin(theta)/tau,global_D)
    return (sigma*(a-b*iv.cos(theta))/(tau**2*D),
            -sigma*b*iv.sin(theta)/(tau**2*D),tau,D)


def residual_box(box):
    z=[interval(*v) for v in box]
    radii=[iv.mpf(1),z[0],z[1]]; phases=[iv.mpf(0),z[3],z[4]]; w=z[2]
    residual=[]
    for a in range(3):
        ar=w*w*radii[a]; at=iv.mpf(0)
        for b in range(3):
            for sign in (1,-1):
                if a==b and sign==1: continue
                delta=(iv.pi if a==b else phases[b]-phases[a]+(iv.pi if sign==-1 else 0))
                rr,rt,_,_=root_row(radii[a],radii[b],delta,w,sign)
                ar+=rr; at+=rt
        residual.extend([ar,at])
        # Early rejection is valid because just one failed necessary equation suffices.
        for k in (len(residual)-2,len(residual)-1):
            if residual[k].a>0 or residual[k].b<0:
                return k,residual[k]
    return None,None


def known():
    r,t,tau,D=root_row(iv.mpf(1),iv.mpf(1),iv.pi,iv.mpf(0),-1)
    assert r.a<=-.5<=r.b and t.a<=0<=t.b and tau.a<=2<=tau.b
    # Exact moving root and source factor: theta=pi/2, tau=sqrt(2), D=5/4.
    rr,tt,tau,D=root_row(iv.mpf(1),iv.mpf(1),iv.pi/2+iv.mpf(1)/2,
                        iv.mpf(1)/(2*iv.sqrt(2)),1)
    expected=iv.mpf(2)/5
    assert rr.a<=expected.a and rr.b>=expected.b
    assert tt.a<=-expected.b and tt.b>=-expected.a
    assert D.a<=iv.mpf(5)/4<=D.b
    # Static six-member sum is exact (-1/2,0) at every endpoint.
    ar=iv.mpf(0);at=iv.mpf(0)
    for j in range(1,6):
        rr,tt,_,_=root_row(iv.mpf(1),iv.mpf(1),iv.pi*j/3,iv.mpf(0),(-1)**j)
        ar+=rr; at+=tt
    assert ar.a<=-.5<=ar.b and at.a<=0<=at.b
    # Branch partition itself tested on interval x in [1,2], always positive.
    test=interval(Q(1),Q(2)); mid=Q(3,2)
    assert interval(Q(1),mid).a==test.a and interval(mid,Q(2)).b==test.b
    # An antipodal pair's relative phase is exactly pi even if its absolute phase
    # spans a complete turn. This checks the dependency-preserving construction.
    wide=interval(-Q(22,7),Q(22,7))
    delta=iv.pi
    rr,tt,tau,D=root_row(interval(Q(6,5),Q(7,5)),interval(Q(6,5),Q(7,5)),delta,iv.mpf(0),-1)
    assert tau.a>0 and D.a==1 and D.b==1
    return {'passed':True,'controls':['static opposite pair','exact moving chord',
                                     'static hexagon','exact rational partition'],
            'static_hexagon':[str(ar),str(at)]}


def run(limit,seconds,depth_limit,initial=None):
    begin=time.monotonic(); last=begin
    receipt=json.loads((OUT/'interval-known.json').read_text())
    assert receipt['passed'] and receipt['sha256']==hashlib.sha256(SELF.read_bytes()).hexdigest()
    domain=DOMAIN if initial is None else initial
    pending=deque([('',domain)]); excluded=[]; unresolved=[]; processed=0
    while pending and processed<limit and time.monotonic()-begin<seconds:
        path,box=pending.popleft(); processed+=1
        k,ivalue=residual_box(box)
        if k is not None:
            excluded.append([path,k,str(ivalue)])
        elif len(path)>=depth_limit:
            unresolved.append(path)
        else:
            # Fixed geometric weights prioritize phase uncertainty; they affect
            # efficiency only, never the enclosure or exhaustive partition.
            weights=[Q(1),Q(1),Q(4),Q(2),Q(2)]
            widths=[(hi-lo)*weights[j] for j,(lo,hi) in enumerate(box)]
            split=max(range(5),key=lambda j:widths[j]); lo,hi=box[split]; mid=(lo+hi)/2
            left=list(box);right=list(box);left[split]=(lo,mid);right[split]=(mid,hi)
            # Each path character encodes both split coordinate and left/right child.
            pending.append((path+str(2*split),left));pending.append((path+str(2*split+1),right))
        now=time.monotonic()
        if now-last>=15:
            print(json.dumps({'processed':processed,'excluded':len(excluded),'pending':len(pending),
                              'unresolved':len(unresolved),'wall_seconds':now-begin}),flush=True);last=now
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>400_000_000:
            break
    unresolved.extend(p for p,_ in pending)
    return {'domain':[[str(x) for x in bounds] for bounds in domain], 'processed':processed,
            'excluded':excluded,'unresolved':unresolved,'complete_exclusion':len(unresolved)==0,
            'wall_seconds':time.monotonic()-begin,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','cover'],required=True)
    p.add_argument('--limit',type=int,default=1000);p.add_argument('--seconds',type=float,default=60)
    p.add_argument('--depth',type=int,default=40);p.add_argument('--output',default=None)
    args=p.parse_args();OUT.mkdir(parents=True,exist_ok=True)
    result=known() if args.stage=='known' else run(args.limit,args.seconds,args.depth)
    result['sha256']=hashlib.sha256(SELF.read_bytes()).hexdigest();result['iv_dps']=iv.dps
    dest=OUT/(args.output or ('interval-'+args.stage+'.json'));dest.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(dest),'passed':result.get('passed'),
                      'processed':result.get('processed'),'complete_exclusion':result.get('complete_exclusion')}))
