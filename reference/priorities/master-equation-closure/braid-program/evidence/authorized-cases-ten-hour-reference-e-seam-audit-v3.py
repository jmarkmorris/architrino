"""Independent norm-clock seam extension audit; no subject imports."""
import pathlib,importlib.util,json,hashlib,bisect,math,sys,signal
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-propagation-audit.py');assert hashlib.sha256(p.read_bytes()).hexdigest()=='3a21fe4738c5e30160d60ac8f35497be6153fdc14d64c0d7aa70f65bd8289be9'
s=importlib.util.spec_from_file_location('own',p);a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
r=a.r;I,S,iv,mp=r.I,r.S,r.iv,r.mp
L=a.LOCAL

def poly(c,z):
    v=z.co(0)
    for q in reversed(c):v=v*z+q
    return v
class Trial:
    def __init__(self,data):
        self.ks=[m['knots'] for m in data['members']];self.times=[mp.mpf(q['t']) for q in self.ks[0]];self.cache={};self.da=[];delays=[]
        for i in range(4):
            x,v,acc=r.circle(i,S([0]));total=[I(0)]*3
            for j in range(4):
                if i!=j:
                    rt=r.root([q.c[0] for q in x],0,j);delays.append(-rt);ff,_=r.hit(x,v,S([0]),lambda z,j=j:r.circle(j,z),rt);total=a.add(total,[(-1)**(i+j)*q.c[0] for q in ff])
            self.da.append([f-q.c[0] for f,q in zip(total,acc)]);self.ks[i][0]={'t':0,'x':[q.c[0] for q in x],'v':[q.c[0] for q in v],'a':total}
        self.delta=iv.mpf([min(r.lo(q) for q in delays),min(r.hi(q) for q in delays)])/8
    def region(self,s):
        mid=(r.lo(s)+r.hi(s))/2
        return ('circle',0) if mid<-r.hi(self.delta) else ('patch',0) if mid<0 else ('poly',max(0,bisect.bisect_right(self.times,mid)-1))
    def state(self,i,t,reg):
        kind,k=reg
        if kind!='poly':
            x,v,aa=r.circle(i,t)
            if kind=='patch':
                u=t/self.delta;f=t*t*(1+u)**3/2;fp=t+t*t*(I(9)/2)/self.delta+6*t**3/self.delta**2+t**4*(I(5)/2)/self.delta**3;fpp=1+9*u+18*u*u+10*u**3
                return [[q+z*d for q,d in zip(vv,self.da[i])] for vv,z in zip((x,v,aa),(f,fp,fpp))]
            return x,v,aa
        key=(i,k)
        if key not in self.cache:
            le,ri=self.ks[i][k:k+2];t0=I(le['t']);h=I(ri['t'])-t0;x,v,ac=r.receive(le,ri,S([t0,1,0,0,0,0,0]));cs=[q.c+[z.c[3]/20] for q,z in zip(x,ac)];self.cache[key]=(t0,cs)
        t0,cs=self.cache[key];z=t-t0
        return [[poly([c[j+d]*I(math.factorial(j+d)//math.factorial(j)) for j in range(6-d)],z) for c in cs] for d in range(3)]
    def root(self,i,j,t,reg=None,bracket=None):
        x=self.state(i,S([I(t)]),self.region(I(t)))[0]
        def gap(z):
            q=self.state(j,S([I(z)]),reg or self.region(I(z)))[0]
            return r.normi([u.c[0]-v.c[0] for u,v in zip(x,q)])+I(z)-I(t)
        lo=mp.mpf(t)-8 if bracket is None else r.lo(bracket)-mp.mpf('1e-18');hi=mp.mpf(t) if bracket is None else r.hi(bracket)+mp.mpf('1e-18');assert r.hi(gap(lo))<0 and r.lo(gap(hi))>0
        for _ in range(125):
            m=(lo+hi)/2;v=gap(m)
            if r.hi(v)<0:lo=m
            elif r.lo(v)>0:hi=m
            else:break
        assert r.hi(gap(lo))<0 and r.lo(gap(hi))>0
        return iv.mpf([lo,hi])
    def windows(self,w):
        lo,hi=r.lo(w),r.hi(w);cuts=sorted(set([lo,hi]+[q for q in [-r.hi(self.delta),-r.lo(self.delta),mp.mpf(0)]+self.times if lo<q<hi]));out=[]
        for u,v in zip(cuts,cuts[1:]):
            reg=self.region(I((u+v)/2));out.append((iv.mpf([u,v]),reg))
            if u>=-r.hi(self.delta) and v<=-r.lo(self.delta):out.append((iv.mpf([u,v]),('circle',0)));out.append((iv.mpf([u,v]),('patch',0)))
        return out

def difference(tr,i,ra,rb,w):
    if ra==rb:return [I(0)]*3
    mid=(r.lo(w)+r.hi(w))/2;rad=(r.hi(w)-r.lo(w))/2;ta=tr.state(i,S([I(mid),1,0,0,0,0]),ra)[0];tb=tr.state(i,S([I(mid),1,0,0,0,0]),rb)[0];out=[]
    for d in range(3):
        cc=[]
        for ax in range(3):
            coeff=[(ta[ax].c[k+d]-tb[ax].c[k+d])*I(math.factorial(k+d)//math.factorial(k)) for k in range(6-d)];v=poly(coeff,S([iv.mpf([-rad,rad])])).c[0];e=I(r.ab(v))
            if (ra[0]=='poly')!=(rb[0]=='poly'):e+=I('2.559210616145')*(I('.429117161835')/I('2.559210616145'))**6*I(rad)**(6-d)/math.factorial(6-d)
            cc.append(e)
        out.append(r.normi(cc))
    return out

def dual_partials(R,n,v,aa,u):
    out=[]
    for group,count in [(0,1),(1,3),(2,3),(3,3)]:
        M=[[I(0) for _ in range(count)] for _ in range(3)]
        for k in range(count):
            f=a.field(S([R,int(group==0)]),[S([q,int(group==1 and l==k)]) for l,q in enumerate(n)],[S([q,int(group==2 and l==k)]) for l,q in enumerate(v)],[S([q,int(group==3 and l==k)]) for l,q in enumerate(aa)],[S([q,0]) for q in u])
            for l in range(3):M[l][k]=f[l].c[1]
        out.append(r.normi([q[0] for q in M]) if count==1 else a.norm(M))
    return out

def partials(R,n,v,aa,u):
    D=1-r.dot(n,v);h=1-r.dot(v,v);na=r.dot(n,aa);c=(h/R**2+na/R)/D**3;b=-1/(R*D**2);p=[x-y for x,y in zip(n,v)];E=[c*x+b*y for x,y in zip(p,aa)]
    Lu=[[(1-r.dot(u,n))*int(i==j)+n[i]*u[j] for j in range(3)] for i in range(3)]
    def apply(M):return [[sum((Lu[i][k]*M[k][j] for k in range(3)),I(0)) for j in range(3)] for i in range(3)]
    er=[(-2*h/R**3-na/R**2)*x/D**3+y/(R**2*D**2) for x,y in zip(p,aa)]
    fr=[sum((Lu[i][k]*er[k] for k in range(3)),I(0)) for i in range(3)]
    en=[[c*int(i==j)+p[i]*(aa[j]/(R*D**3)+3*c*v[j]/D)-2*aa[i]*v[j]/(R*D**3) for j in range(3)] for i in range(3)]
    ev=[[-c*int(i==j)+p[i]*(-2*v[j]/(R**2*D**3)+3*c*n[j]/D)-2*aa[i]*n[j]/(R*D**3) for j in range(3)] for i in range(3)]
    ea=[[b*int(i==j)+p[i]*n[j]/(R*D**3) for j in range(3)] for i in range(3)]
    fn=apply(en);fn=[[fn[i][j]+r.dot(u,E)*int(i==j)-E[i]*u[j] for j in range(3)] for i in range(3)]
    return [r.normi(fr),a.norm(fn),a.norm(apply(ev)),a.norm(apply(ea))]

def known():
    tr=Trial.__new__(Trial);tr.delta=I(1);tr.da=[[I(1),I(0),I(0)]]*4
    t=S([I(-1)/2,1,0,0,0]);base=r.circle(0,t);pat=tr.state(0,t,('patch',0))
    for d,q in enumerate([I(1)/64,I(1)/32,I(-1)/4]):
        value=pat[d][0].c[0]-base[d][0].c[0];assert r.lo(value)<=r.hi(q) and r.hi(value)>=r.lo(q)
    class Cubic:
        def state(self,i,t,reg):return [[t**3/6,t.co(0),t.co(0)],[t*t/2,t.co(0),t.co(0)],[t,t.co(0),t.co(0)]] if reg[1] else [[t.co(0)]*3]*3
    ds=difference(Cubic(),0,('poly',0),('poly',1),iv.mpf([0,I(1)/10]));expected=[I(1)/6000,I(1)/200,I(1)/10]
    assert all(r.hi(g)>=r.lo(e) and r.hi(g)<2*r.hi(e) for g,e in zip(ds,expected))
    z=[I(0)]*3;pr=partials(I(2),[I(1),I(0),I(0)],z,z,z)
    for got,q in zip(pr,[I(1)/4,I(1)/4,I(1)/2,I(1)/2]):assert r.hi(got)>=r.lo(q)
    out={'passed':True,'sha':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),'controls':['exact C2 cubic source XVA difference','static response independent input partial norms']};p=L/'e-seam-audit-known-v3.json';assert not p.exists();p.write_text(json.dumps(out));print(json.dumps(out))
def target():
    kk=json.loads((L/'e-seam-audit-known-v3.json').read_text());assert kk['passed'] and kk['sha']==hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
    base=pathlib.Path('.local-data/master-equation-closure/braid-program');tr=Trial(json.loads((base/'maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json').read_text()));sp=base/'authorized-cases-ten-hour/e-residual-seam-pilot-v4.json';assert hashlib.sha256(sp.read_bytes()).hexdigest()=='1303983ab04c0dddd451575f6d39a90023b96e4d8bdee30e39d04d85261ede0e';sub=json.loads(sp.read_text());result=[]
    for k,row in zip(sub['selectedSegments'],sub['rows']):
        le,ri=tr.times[k:k+2];mid=(le+ri)/2;rad=(ri-le)/2;T=iv.mpf([le,ri]);receiving=[]
        for i in range(4):
            roots={};regs={};windows={};correction=I(0);xx,uu,_=tr.state(i,S([T]),('poly',k))
            for j in range(4):
                if i==j:continue
                rt=tr.root(i,j,mid);assert r.lo(I(row['rootMid'][i][str(j)]))<=r.lo(rt) and r.hi(rt)<=r.hi(I(row['rootMid'][i][str(j)]));reg=tr.region(rt);er=tr.root(i,j,mid,reg,rt);w=iv.mpf([min(r.lo(rt),r.lo(er))-4*rad,max(r.hi(rt),r.hi(er))+4*rad]);roots[j]=er;regs[j]=reg;windows[j]=w
                ext=tr.state(j,S([w,1]),reg);assert r.hi(r.normi([q.c[0] for q in ext[1]]))<mp.mpf('.6');eps=[I(0)]*3;vals=[]
                for win,rr in tr.windows(w):
                    vals.append(tr.state(j,S([win]),rr));diff=difference(tr,j,reg,rr,win);eps=[I(max(r.hi(x),r.hi(y))) for x,y in zip(eps,diff)]
                if any(r.hi(q)>0 for q in eps):
                    union=[[iv.mpf([min([r.lo(v[d][ax].c[0]) for v in vals]+[r.lo(ext[d][ax].c[0])]),max([r.hi(v[d][ax].c[0]) for v in vals]+[r.hi(ext[d][ax].c[0])])]) for ax in range(3)] for d in range(3)];R=T-w;n=[(q.c[0]-v)/R for q,v in zip(xx,union[0])];assert r.lo(R)>0 and r.lo(1-r.dot(n,union[1]))>0
                    pr=partials(R,n,union[1],union[2],[q.c[0] for q in uu]);A=r.normi([q.c[0] for q in ext[2]]);J=r.normi([q.c[1] for q in ext[2]]);px=(pr[0]+2*pr[1]/I(r.lo(R))+pr[2]*A+pr[3]*J)/I('.4');correction+=px*eps[0]+pr[2]*eps[1]+pr[3]*eps[2]
            errors=[]
            for t,rr in [(S([I(mid),1,0,0,0]),roots),(S([T,1,0,0,0]),windows)]:
                x,u,ac=tr.state(i,t,('poly',k));f=[t.co(0)]*3
                for j in roots:
                    ff,_=r.hit(x,u,t,lambda s,j=j:tr.state(j,s,regs[j]),rr[j]);f=[v+(-1)**(i+j)*q for v,q in zip(f,ff)]
                errors.append([v-q for v,q in zip(ac,f)])
            comp=[sum((I(r.ab(errors[0][ax].c[q]))*I(rad)**q for q in range(4)),I(0))+I(r.ab(errors[1][ax].c[4]))*I(rad)**4 for ax in range(3)];rho=r.normi(comp)+correction
            receiving.append({'rho':r.out(rho),'correction':r.out(correction),'belowProducer':r.hi(rho)<=mp.mpf(row['memberRho'][i])})
        result.append({'segment':k,'members':receiving});print(json.dumps(result[-1]),flush=True)
    out={'passed':True,'knownFirst':True,'independentNormClock':True,'rows':result};p=L/'e-seam-audit-v3.json';assert not p.exists();p.write_text(json.dumps(out,indent=2))
if __name__=='__main__':
    signal.signal(signal.SIGALRM,lambda *_:sys.exit('reference120s cutoff'));signal.alarm(120)
    known() if sys.argv[1]=='known' else target()
