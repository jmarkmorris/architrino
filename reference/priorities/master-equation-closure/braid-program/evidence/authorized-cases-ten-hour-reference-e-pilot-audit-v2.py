"""Independent norm-clock interval jets and Hermite basis; no subject imports."""
import json,math,pathlib,hashlib,argparse,signal
from fractions import Fraction as Q
from decimal import Decimal,localcontext,ROUND_CEILING,ROUND_FLOOR
from mpmath import iv,mp
iv.dps=60;mp.dps=90
def I(x):
    if hasattr(x,'_mpi_'):return x
    if isinstance(x,float):return iv.mpf(x.as_integer_ratio()[0])/x.as_integer_ratio()[1]
    if isinstance(x,Q):return iv.mpf(x.numerator)/x.denominator
    return iv.mpf(x)
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def ab(x):return max(abs(lo(x)),abs(hi(x)))
def out(x,up=True):
    sg,m,e,_=x._mpi_[int(up)];p=(-1 if sg else 1)*m;q=1
    if e>=0:p*=2**e
    else:q=2**(-e)
    with localcontext() as c:
        c.prec=55;c.rounding=ROUND_CEILING if up else ROUND_FLOOR
        return str(Decimal(int(p))/Decimal(int(q)))
class S:
    def __init__(self,c):self.c=list(map(I,c));self.n=len(c)-1
    def co(self,x):return x if isinstance(x,S) else S([I(x)]+[0]*self.n)
    def __add__(self,x):
        x=self.co(x);return S([a+b for a,b in zip(self.c,x.c)])
    __radd__=__add__
    def __neg__(self):return S([-x for x in self.c])
    def __sub__(self,x):return self+-self.co(x)
    def __rsub__(self,x):return self.co(x)+-self
    def __mul__(self,x):
        x=self.co(x);return S([sum((self.c[k]*x.c[i-k] for k in range(i+1)),I(0)) for i in range(self.n+1)])
    __rmul__=__mul__
    def power(self,p):
        c=self.c[0];z=S([0]+[x/c for x in self.c[1:]]);r=self.co(1);q=self.co(1);b=Q(1)
        for k in range(1,self.n+1):q=q*z;b=b*(p-k+1)/k;r=r+q*I(b)
        return r*(iv.sqrt(c) if p==Q(1,2) else c**int(p))
    def __truediv__(self,x):return self*self.co(x).power(Q(-1))
    def __rtruediv__(self,x):return self.co(x)/self
    def __pow__(self,n):
        if n<0:return self.power(Q(n))
        z=self.co(1)
        for _ in range(n):z=z*self
        return z
    def trig(self):
        z=S([0]+self.c[1:]);q=self.co(1);a=self.co(0);b=self.co(0)
        for k in range(self.n+1):
            if k%2:a=a+q*I(Q((-1)**((k-1)//2),math.factorial(k)))
            else:b=b+q*I(Q((-1)**(k//2),math.factorial(k)))
            q=q*z
        return b*iv.sin(self.c[0])+a*iv.cos(self.c[0]),b*iv.cos(self.c[0])-a*iv.sin(self.c[0])
def dot(a,b):return sum((x*y for x,y in zip(a,b)),0)
def norm(a):
    q=dot(a,a);q.c[0]=sum((x.c[0]**2 for x in a),I(0));return q.power(Q(1,2))
def normi(a):return iv.sqrt(sum((x**2 for x in a),I(0)))
def circle(k,t):
    r=I('2.559210616145');be=I('.429117161835');om=be/r;s,c=(t*om+iv.pi*k/2).trig()
    off=[I('.0001')*r*v for v in [1,I('.7'),I('1.3')]] if k==0 else [I(0)]*3
    return ([c*r+off[0],s*r+off[1],t.co(off[2])],[-s*be,c*be,t.co(0)],[-c*be*om,-s*be*om,t.co(0)])
def hit(x,u,t,src,rt):
    n=t.n;s=S([rt]+[0]*n);sx,sv,sa=src(s);q=[a-b for a,b in zip(x,sx)];rr=norm(q);nn=[v/rr for v in q];den=1-dot(nn,sv)
    assert lo(den.c[0])>0
    for k in range(1,n+1):
        sx,_,_=src(s);g=s+norm([a-b for a,b in zip(x,sx)])-t;s.c[k]=-g.c[k]/den.c[0]
    sx,sv,sa=src(s);q=[a-b for a,b in zip(x,sx)];rr=norm(q);nn=[v/rr for v in q];D=1-dot(nn,sv)
    assert lo(rr.c[0])>0 and lo(D.c[0])>0
    na=dot(nn,sa);vv=dot(sv,sv)
    E=[((1-vv)*(nn[k]-sv[k])+rr*((nn[k]-sv[k])*na-D*sa[k]))/(rr**2*D**3) for k in range(3)]
    return [E[k]+nn[k]*dot(u,E)-E[k]*dot(u,nn) for k in range(3)],s
def root(x,t,k):
    def g(z):
        sx=circle(k,S([z]))[0];return normi([a-b.c[0] for a,b in zip(x,sx)])+I(z)-I(t)
    a=mp.mpf(t)-8;b=mp.mpf(t);assert hi(g(a))<0 and lo(g(b))>0
    for _ in range(120):
        c=(a+b)/2;y=g(c)
        if hi(y)<0:a=c
        elif lo(y)>0:b=c
        else:break
    assert hi(g(a))<0 and lo(g(b))>0
    return iv.mpf([a,b])
def receive(l,r,t):
    h=I(r['t'])-I(l['t']);z=(t-I(l['t']))/h
    q=S([0,1,0,0,0,0,0])
    bases=[1-10*q**3+15*q**4-6*q**5,q-6*q**3+8*q**4-3*q**5,(q**2-3*q**3+3*q**4-q**5)/2,10*q**3-15*q**4+6*q**5,-4*q**3+7*q**4-3*q**5,(q**3-2*q**4+q**5)/2]
    xx=[]
    for k in range(3):
        vals=[I(l['x'][k]),h*I(l['v'][k]),h*h*I(l['a'][k]),I(r['x'][k]),h*I(r['v'][k]),h*h*I(r['a'][k])]
        coefficient=sum((a*b for a,b in zip(bases,vals)),q.co(0)).c
        value=t.co(0)
        for c in reversed(coefficient):value=value*z+c
        xx.append(value)
    return [[S([x.c[j+d]*(math.factorial(j+d)//math.factorial(j)) for j in range(5)]) for x in xx] for d in range(3)]
def known():
    t=S([0,1,0,0,0,0,0]);s,c=t.trig();assert lo(s.c[3])<=-mp.mpf(1)/6<=hi(s.c[3])
    for k in range(7):
        q=1/(2+t);v=mp.mpf((-1)**k)/2**(k+1);assert lo(q.c[k])<=v<=hi(q.c[k])
    l={'t':0,'x':[1,0,0],'v':[0,1,0],'a':[0,0,2]};r={'t':1,'x':[2,1,1],'v':[5,1,2],'a':[20,0,2]}
    x,v,a=receive(l,r,S([I(1)/2,1,0,0,0,0,0]));assert lo(x[0].c[0])<=mp.mpf(33)/32<=hi(x[0].c[0]);assert lo(a[0].c[0])<=mp.mpf(5)/2<=hi(a[0].c[0])
    constant={'t':0,'x':[2,3,4],'v':[0,0,0],'a':[0,0,0]};end=dict(constant,t=1)
    wide=receive(constant,end,S([iv.mpf([0,1]),1,0,0,0,0,0]))
    assert all(lo(x.c[0])==hi(x.c[0])==k for x,k in zip(wide[0],[2,3,4]))
    t=S([0,1,0,0,0]);ac=I(1)/20;tau=t-2
    src=lambda z:([z.co(0),z*z*ac/2,z.co(0)],[z.co(0),z*ac,z.co(0)],[z.co(0),z.co(ac),z.co(0)])
    ff,ss=hit([t.co(2),tau*tau*ac/2,t.co(0)],[t.co(0),tau*ac,t.co(0)],t,src,I(-2))
    expected=[(1-tau*tau*(ac*ac))**2/4-tau*(ac*ac)/2,-tau*ac*(1-tau*tau*(ac*ac))/4-ac/2,t.co(0)]
    for got,want in zip(ff,expected):
        for a,b in zip(got.c,want.c):assert lo(a)<=hi(b) and lo(b)<=hi(a)
    return {'passed':True,'cases':['reciprocal geometric series','sine composition','independent Hermite basis exact quintic','norm-clock accelerated full quartic']}
def target(inp,subject):
    data=json.loads(pathlib.Path(inp).read_text());cert=json.loads(pathlib.Path(subject).read_text());ks=[x['knots'][:4] for x in data['members']];delays=[]
    for i in range(4):
        xx,vv,aa=circle(i,S([0]));tot=[I(0)]*3
        for k in range(4):
            if k==i:continue
            rt=root([v.c[0] for v in xx],0,k);delays.append(-rt);ff,_=hit(xx,vv,S([0]),lambda z,k=k:circle(k,z),rt)
            tot=[a+(-1)**(i+k)*b.c[0] for a,b in zip(tot,ff)]
        ks[i][0]={'t':0,'x':[v.c[0] for v in xx],'v':[v.c[0] for v in vv],'a':tot}
    delta=iv.mpf([min(lo(v) for v in delays),min(hi(v) for v in delays)])/8;assert hi(delta)<mp.mpf('.35')
    rows=[]
    for cell in range(3):
        left=mp.mpf(ks[0][cell]['t']);right=mp.mpf(ks[0][cell+1]['t']);mid=(left+right)/2;rad=(right-left)/2;bounds=[];checks=0
        for i in range(4):
            vals=[];xx,vv,aa=receive(ks[i][cell],ks[i][cell+1],S([mid,1,0,0,0,0,0]));roots={}
            for k in range(4):
                if k==i:continue
                rt=root([v.c[0] for v in xx],mid,k);roots[k]=rt;old=cert['rows'][cell]['rootMid'][i][str(k)]
                assert mp.mpf(old[0])<=lo(rt) and hi(rt)<=mp.mpf(old[1]);checks+=1;assert hi(rt)+4*rad < -hi(delta)
            for wide in [False,True]:
                tb=iv.mpf([left,right]) if wide else I(mid);x,v,a=receive(ks[i][cell],ks[i][cell+1],S([tb,1,0,0,0,0,0]));total=[S([0]*5) for _ in range(3)]
                for k,rt in roots.items():
                    sb=rt+iv.mpf([-4*rad,4*rad]) if wide else rt;ff,_=hit(x,v,S([tb,1,0,0,0]),lambda z,k=k:circle(k,z),sb);total=[z+(-1)**(i+k)*f for z,f in zip(total,ff)]
                vals.append([z-f for z,f in zip(a,total)])
            comps=[sum((I(ab(vals[0][z].c[k]))*I(rad)**k for k in range(4)),I(0))+I(ab(vals[1][z].c[4]))*I(rad)**4 for z in range(3)]
            bounds.append(hi(normi(comps)))
        rows.append({'cell':cell,'rootContainments':checks,'rho':out(I(max(bounds))),'memberRho':[out(I(x)) for x in bounds]});print(json.dumps({'cell':cell,'rho':rows[-1]['rho']}),flush=True)
    return {'passed':True,'scope':'independent norm-clock/Hermite pilot residual bounds and root containment','delta':[out(delta,False),out(delta)],'rows':rows,'maxRho':out(I(max(mp.mpf(x['rho']) for x in rows)))}
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--known',action='store_true');ap.add_argument('--input');ap.add_argument('--subject');ap.add_argument('--out',required=True);ap.add_argument('--known-receipt');ar=ap.parse_args();assert not pathlib.Path(ar.out).exists();sha=hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
    if ar.known:report=known()
    else:
        old=json.loads(pathlib.Path(ar.known_receipt).read_text());assert old['passed'] and old['instrument']==sha
        signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError('60 second audit budget')));signal.alarm(60);report=target(ar.input,ar.subject)
    report['instrument']=sha;pathlib.Path(ar.out).write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
if __name__=='__main__':main()
