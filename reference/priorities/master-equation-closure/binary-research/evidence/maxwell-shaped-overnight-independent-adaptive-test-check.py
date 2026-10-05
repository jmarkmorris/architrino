"""Independent ordinary induction and potential-work review of frozen test case.
No actual prefix admission and no outgoing selected-law history.
"""
import argparse,bisect,hashlib,importlib.util,json,time,datetime,resource
from fractions import Fraction as Q
from pathlib import Path
def load(name):
    p=Path(__file__).with_name('maxwell-shaped-overnight-independent-'+name+'.py');s=importlib.util.spec_from_file_location(name.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
k=load('event-kernel');poly=load('exact-hermite-check');iv=k.iv;iv.dps=80
def IQ(x):
    x=Q(x);return iv.mpf(x.numerator)/iv.mpf(x.denominator)
def majorant(x,v,C,f,h):
    x,v,C,f,h=map(IQ,[x,v,C,f,h])
    if C.a==C.b==0:return x+h*v+h*h*f/2,v+h*f
    lam=iv.sqrt(C);e=iv.exp(lam*h);ei=iv.exp(-lam*h);ch=(e+ei)/2;sh=(e-ei)/2
    return ch*x+sh*v/lam+(ch-1)*f/C,lam*sh*x+ch*v+sh*f/lam
def derivative(c,n,h):
    for _ in range(n):c=[(i+1)*c[i+1]/h for i in range(len(c)-1)]
    return c
def horner(c,z):
    a=IQ(0)
    for v in reversed(c):a=a*z+IQ(v)
    return a
class Curve:
    def __init__(self,knots,jerk):self.knots=knots;self.times=[Q(x['t']) for x in knots];self.cache={};self.jerk=list(map(Q,jerk))
    def box(self,a,b,n):
        a,b=Q(a),Q(b);assert 0<=a<=b;pieces=[];last=self.times[-1]
        if a<=last:
            lo=max(0,bisect.bisect_left(self.times,a)-1);hi=min(len(self.times)-2,bisect.bisect_left(self.times,min(b,last)))
            for j in range(lo,hi+1):
                l=max(a,self.times[j]);r=min(b,self.times[j+1])
                if r<l:continue
                if j not in self.cache:self.cache[j]=[poly.polynomial(self.knots[j],self.knots[j+1],d) for d in range(2)]
                out=[]
                for h,c in self.cache[j]:out.append(horner(derivative(c,n,h),iv.mpf([IQ((l-self.times[j])/h).a,IQ((r-self.times[j])/h).b])))
                pieces.append(out)
        if b>=last:
            p=self.knots[-1];s=iv.mpf([IQ(max(a,last)-last).a,IQ(b-last).b]);out=[]
            for d in range(2):
                c=[Q(p['x'][d]),Q(p['v'][d]),Q(p['a'][d])/2,self.jerk[d]/6]
                out.append(horner(derivative(c,n,Q(1)),s))
            pieces.append(out)
        assert pieces
        return [iv.mpf([min(v[d].a for v in pieces),max(v[d].b for v in pieces)]) for d in range(2)]+[IQ(0)]
def known():
    base=k.known();pc=poly.known();x,v=majorant(0,0,1,1,1)
    assert x.a>IQ('.5430806348152437').b and x.b<IQ('.5430806348152440').a
    assert v.a>IQ('1.1752011936438014').b and v.b<IQ('1.1752011936438017').a
    zero=majorant(1,2,0,3,Q('1/2'));assert k.contains(zero[0],IQ('19/8')) and k.contains(zero[1],IQ('7/2'))
    q=lambda t:dict(t=t,x=[Q(t*t,2),Q(0)],v=[Q(t),Q(0)],a=[Q(1),Q(0)])
    curve=Curve([q(1),q(2)],[0,0]);assert k.contains(curve.box(Q('3/2'),Q('3/2'),0)[0],IQ('9/8'))
    assert k.contains(curve.box(2,3,1)[0],3)
    return dict(passed=True,kernel=base,polynomial=pc,cases=['ordinary cosh/sinh nonzero forcing','zero-C polynomial majorant','exact Hermite/cubic extension jet'])
def analyze(path):
    r=json.loads(Path(path).read_text());c=r['case'];assert r['passed'] and r['terminal']=='completed' and c['K']==c['cf']==1
    assert hashlib.sha256(Path(c['input']).read_bytes()).hexdigest()==c['SHA256']
    saved=json.loads(Path(c['input']).read_text());curve=Curve(saved['knots'],c['jetSelection']['midpoint']);left=Q('38.3');end=Q('38.4');ex,ev=Q('.001'),Q('.005');worklo=None;started=time.monotonic();last=started;rows=[]
    for j,row in enumerate(r['rows']):
        co=row['exactCoefficients'];dt=Q(co['dt']);right=left+dt;C,Lv,La,de=map(Q,[co[z] for z in ['Cx','Lv','La','defect']]);f=C*Q('.001')+Lv*Q('.001')+La*Q('.01')+de
        assert Q(row['localExpansion']['x'])==ex+Q('.00002') and Q(row['localExpansion']['v'])==ev+Q('.0002')
        bx,bv=majorant(ex,ev,C,f,dt);nx,nv=Q(row['exactErrors']['x']),Q(row['exactErrors']['v'])
        assert IQ(nx).a>=bx.b and IQ(nv).a>=bv.b
        assert nx<Q(row['localExpansion']['x']) and nv<Q(row['localExpansion']['v']) and nx<Q('.01') and nv<Q('.04')
        assert abs(float(left)-row['left'])<1e-13 and abs(float(right)-row['right'])<1e-13
        S=row['source'];assert Q(S['hi'])<Q('38.3') and Q(S['lo'])>0
        sx,sv,sa=[curve.box(S['lo'],S['hi'],n) for n in range(3)];X=curve.box(left,right,0);U=curve.box(left,right,1)
        rx,rv=Q(row['localExpansion']['x']),Q(row['localExpansion']['v'])
        X=[z+iv.mpf([-IQ(rx).b,IQ(rx).b]) if d<2 else z for d,z in enumerate(X)]
        U=[iv.mpf([max((z-IQ(rv)).a,IQ(-1).a),min((z+IQ(rv)).b,IQ(1).b)]) if d<2 else z for d,z in enumerate(U)]
        source=[-(z+iv.mpf([-IQ('.001').b,IQ('.001').b])) if d<2 else z for d,z in enumerate(sx)]
        V=[-(z+iv.mpf([-IQ('.001').b,IQ('.001').b])) if d<2 else z for d,z in enumerate(sv)]
        A=[-(z+iv.mpf([-IQ('.01').b,IQ('.01').b])) if d<2 else z for d,z in enumerate(sa)]
        field=k.field(X,U,source,V,A);encoded=k.encode(field['work']);w=Q(encoded['lo']);worklo=w if worklo is None else min(worklo,w)
        rows.append(dict(left=str(left),right=str(right),work=encoded));ex,ev,left=nx,nv,right
        if time.monotonic()-last>=30:print(json.dumps(dict(heartbeat=datetime.datetime.now(datetime.timezone.utc).isoformat(),cells=j+1,rss=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)),flush=True);last=time.monotonic()
    assert left==end and len(rows)==r['cells'];w=r['exactWitness'];assert Q(w['errors']['x'])==ex and Q(w['errors']['v'])==ev and Q(w['reached'])==end
    final=curve.box(end,end,1);gap=k.norm(final)-IQ(ev)-1;assert gap.a>0 and worklo>0
    return dict(passed=True,cells=len(rows),independent_work_lower=str(worklo),independent_speed_gap=k.encode(gap),final_errors=dict(x=str(ex),v=str(ev)),rows=rows,wall_seconds=time.monotonic()-started,scope='conditional test-curve induction and unchanged independent potential field; actual original-prefix premises unsupplied')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({**r,'target':{k:v for k,v in r.get('target',{}).items() if k!='rows'}}),flush=True)
