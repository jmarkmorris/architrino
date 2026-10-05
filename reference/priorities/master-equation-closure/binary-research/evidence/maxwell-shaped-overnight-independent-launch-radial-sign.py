"""Independent physical circle-hit potential reference for compatible launches.
No prescribed circle future is adopted. Launch sources lie before short patch.
Selected original beta=.3,r=25/9,K=cf=1, both E/full separately compatible.
"""
import argparse,json,importlib.util
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-event-kernel.py');s=importlib.util.spec_from_file_location('potential',p);k=importlib.util.module_from_spec(s);s.loader.exec_module(k);iv=k.iv;iv.dps=80
def IQ(q):q=Q(q);return iv.mpf(q.numerator)/iv.mpf(q.denominator)
def root(beta):
    beta=Q(beta);lo=Q(0);hi=beta
    if beta==0:return IQ(0)
    for _ in range(180):
        m=(lo+hi)/2;f=IQ(m)-IQ(beta)*iv.cos(IQ(m))
        if f.a>0:hi=m
        elif f.b<0:lo=m
        else:break
    # f'=1+beta sin h≥1 on this interval; signed endpoints enclose unique root.
    assert (IQ(lo)-IQ(beta)*iv.cos(IQ(lo))).b<0
    assert (IQ(hi)-IQ(beta)*iv.cos(IQ(hi))).a>0
    return iv.mpf([IQ(lo).a,IQ(hi).b])
def hit(beta,r):
    beta,r=Q(beta),Q(r);h=root(beta);w=IQ(beta/r);rr=IQ(r);bb=IQ(beta)
    co,si=iv.cos(2*h),iv.sin(2*h)
    X=[rr,IQ(0),IQ(0)];U=[IQ(0),bb,IQ(0)]
    source=[-rr*co,rr*si,IQ(0)]
    vs=[-bb*si,-bb*co,IQ(0)];ac=[rr*w*w*co,-rr*w*w*si,IQ(0)]
    F=k.field(X,U,source,vs,ac)
    return dict(h=h,delay=2*rr*iv.cos(h),fields=F,radial_second={law:F[law][0]+bb*bb/rr for law in ['E','full']})
def known():
    a=k.known();f=hit(0,1);assert k.contains(f['fields']['E'][0],IQ('-.25')) and k.contains(f['radial_second']['full'],IQ('-.25'))
    assert k.contains(f['delay'],IQ(2))
    assert root(Q('1/10')).a>IQ('.09').b and root(Q('1/10')).b<IQ('.1').a
    return dict(passed=True,potential=a,cases=['static opposite partner quarter inward','static exact delaytwo','positive circular half-angle unique root in known bracket'])
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.target:
        f=hit(Q('3/10'),Q('25/9'));assert all(z.a>0 for z in f['radial_second'].values())
        out['target']=dict(beta='3/10',r='25/9',omega='27/250',K=1,cf=1,h=k.encode(f['h']),delay=k.encode(f['delay']),D=k.encode(f['fields']['D']),radial_second=k.encode(f['radial_second']),scope='actual separately compatible launch outward second radial derivative; root precedes each short terminal patch; no circle future adopted')
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
