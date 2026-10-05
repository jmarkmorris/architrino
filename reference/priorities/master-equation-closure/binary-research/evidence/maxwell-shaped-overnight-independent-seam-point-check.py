"""Literal comparison point-defect reference, independent Gaussian past patch.
Selected potential response reconstructed independently; no trajectory/error
identification. Complete root census uses separately established uniform speed.
"""
import argparse,hashlib,json
from pathlib import Path
from fractions import Fraction as Q
import importlib.util
def load(n):
    p=Path(__file__).with_name('maxwell-shaped-overnight-independent-'+n+'.py');s=importlib.util.spec_from_file_location(n.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
a=load('adaptive-test-check');k=a.k;iv=a.iv
class Past:
    def __init__(self,saved):
        self.s=saved['specification'];self.r=Q(self.s['r']);self.w=Q(self.s['omega']);self.delta=Q(self.s['delta']);self.p=saved['knots'][0]
        dv=[Q(self.p['v'][0]),Q(self.p['v'][1])-self.r*self.w];da=[Q(self.p['a'][0])+self.r*self.w*self.w,Q(self.p['a'][1])]
        l=dict(t=-self.delta,x=[0,0],v=[0,0],a=[0,0]);r=dict(t=0,x=[0,0],v=dv,a=da)
        self.polys=[a.poly.polynomial(l,r,d) for d in range(2)]
    def box(self,l,r,n):
        l,r=Q(l),Q(r);assert l<=r<=0 and n<=2;T=iv.mpf([a.IQ(l).a,a.IQ(r).b]);phase=T*a.IQ(self.w)
        q=[a.IQ(self.r)*iv.cos(phase),a.IQ(self.r)*iv.sin(phase)]
        v=[-a.IQ(self.r*self.w)*iv.sin(phase),a.IQ(self.r*self.w)*iv.cos(phase)]
        ac=[-a.IQ(self.r*self.w*self.w)*iv.cos(phase),-a.IQ(self.r*self.w*self.w)*iv.sin(phase)]
        value=[q,v,ac][n]
        assert l>=-self.delta or r<=-self.delta,'split patch seam before use'
        if l>=-self.delta:
            z=iv.mpf([a.IQ((l+self.delta)/self.delta).a,a.IQ((r+self.delta)/self.delta).b])
            value=[x+a.horner(a.derivative(c,n,h),z) for x,(h,c) in zip(value,self.polys)]
        return value+[a.IQ(0)]
def known():
    base=a.known();p=dict(t=0,x=[2,0],v=[0,'1/10'],a=['-1/4',0]);s=dict(specification=dict(r=2,omega=0,delta='1/4'),knots=[p]);past=Past(s)
    for n,key in enumerate(['x','v','a']):
        for z,y in zip(past.box(0,0,n),p[key]):assert k.contains(z,a.IQ(y))
    assert k.contains(past.box('-1/4','-1/4',0)[0],2)
    # Static source, receiving quadratic at .1 has known nonzero defect.
    t=Q('1/10');X=[a.IQ(1-t*t/8),a.IQ(0),a.IQ(0)];U=[a.IQ(-t/4),a.IQ(0),a.IQ(0)];src=[a.IQ(-1),a.IQ(0),a.IQ(0)];z=[a.IQ(0)]*3
    defect=a.IQ('-1/4')-k.field(X,U,src,z,z)['E'][0];assert k.contains(defect,a.IQ('3199/10227204'))
    return dict(passed=True,predecessor=base,cases=['independently solved C2 old-patch endpoint jets','unpatched left endpoint','exact nonzero quadratic point defect'])
def analyze(path):
    r=json.loads(Path(path).read_text());b=Path(r['input']).read_bytes();assert hashlib.sha256(b).hexdigest()==r['inputSHA'];saved=json.loads(b);past=Past(saved);future=a.Curve(saved['knots'],[0,0]);t=Q(r['t']);S=r['S'];lo,hi=Q(S['lo']),Q(S['hi']);assert -past.delta<lo<hi<0
    X,U,A=[future.box(t,t,n) for n in range(3)];src,vs,As=[[-x for x in past.box(lo,hi,n)] for n in range(3)]
    f=k.field(X,U,src,vs,As);res=[x-y for x,y in zip(A,f['E'] if r['law']=='E' else f['full'])];norm=k.norm(res)
    # Universal endpoint gap signs independently certify the supplied old root.
    gaps=[]
    for s in [lo,hi]:gaps.append(a.IQ(t-s)-k.norm([x+y for x,y in zip(X,past.box(s,s,0))]))
    assert gaps[0].a>0 and gaps[1].b<0
    assert norm.a>0
    return dict(accepted=True,receiptSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(),inputSHA=r['inputSHA'],rootGap=[k.encode(z) for z in gaps],components=k.encode(res),norm=k.encode(norm),D=k.encode(f['D']),scope='nonzero exact literal comparison point defect with independent old-root signs; no actual solution error/refinement floor')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);arg=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if arg.receipt:out['target']=analyze(arg.receipt)
    Path(arg.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
