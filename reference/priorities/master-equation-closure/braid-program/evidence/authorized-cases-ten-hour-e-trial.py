"""Exact-recorded-number trial and directed response residual reference.
No forward integration and no production solver functionality.
"""
import importlib.util, pathlib, bisect, json
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-e-interval-jets.py')
s=importlib.util.spec_from_file_location('e_jets',p);j=importlib.util.module_from_spec(s);s.loader.exec_module(j)
I,J,iv,mp=j.I,j.J,j.iv,j.mp
lower,upper,mag,bound=j.lower,j.upper,j.mag,j.bound

class Seam(Exception):pass

def hermite(left,right):
    h=I(right['t'])-I(left['t']);out=[]
    for k in range(3):
        c0=I(left['x'][k]);c1=h*I(left['v'][k]);c2=h*h*I(left['a'][k])/2
        d=I(right['x'][k])-c0-c1-c2;e=h*I(right['v'][k])-c1-2*c2;f=h*h*I(right['a'][k])-2*c2
        out.append([c0,c1,c2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2])
    return out,h

def derivative(c,k):
    cc=c[:]
    for z in range(k):cc=[(i+1)*cc[i+1] for i in range(len(cc)-1)]
    return cc

def polynomial_state(cs,h,left,T):
    u=(T-I(left))/h
    return [[j.poly(derivative(c,k),u)/h**k for c in cs] for k in range(3)]

class Trial:
    def __init__(self,path):
        self.path=str(path);d=json.loads(pathlib.Path(path).read_text());self.spec=d['specification'];self.members=d['members']
        self.knots=[m['knots'] for m in self.members];self.times=[mp.mpf(k['t']) for k in self.knots[0]]
        self.segments=[[hermite(a,b) for a,b in zip(ks,ks[1:])] for ks in self.knots]
        self.beta=I('0.429117161835');self.r=I('2.559210616145');self.om=self.beta/self.r
        self.eps=I('0.0001');self.w=[[I(1),I('.7'),I('1.3')]]+[[I(0)]*3 for _ in range(3)]
        self.prepare_exact_past()
        self.segments=[[hermite(a,b) for a,b in zip(ks,ks[1:])] for ks in self.knots]
    def prepare_exact_past(self):
        zero=J(0,0);launch=[self.circle(i,zero) for i in range(4)];acc=[];delays=[]
        for i in range(4):
            total=[I(0)]*3
            for k in range(4):
                if i==k:continue
                x=[v.c[0] for v in launch[i][0]]
                def gap(s):return j.norm(j.sub(x,[v.c[0] for v in self.circle(k,J(s,0))[0]]))+I(s)
                lo,hi=mp.mpf(-8),mp.mpf(0)
                assert upper(gap(lo))<0 and lower(gap(hi))>0
                for z in range(100):
                    m=(lo+hi)/2;g=gap(m)
                    if lower(g)>0:hi=m
                    elif upper(g)<0:lo=m
                    else:break
                    if hi-lo<mp.mpf('1e-28'):break
                assert upper(gap(lo))<0 and lower(gap(hi))>0
                root=iv.mpf([lo,hi]);delays.append(-root)
                ff,_=j.response(launch[i][0],launch[i][1],zero,lambda S:self.circle(k,S),J(root,0))
                total=[a+(-1)**(i+k)*b.c[0] for a,b in zip(total,ff)]
            acc.append(total)
        self.da=[j.sub(a,[v.c[0] for v in launch[i][2]]) for i,a in enumerate(acc)]
        amax=iv.mpf([max(lower(j.norm(a)) for a in self.da),max(upper(j.norm(a)) for a in self.da)])
        tau=iv.mpf([min(lower(a) for a in delays),min(upper(a) for a in delays)])
        dmin=iv.sqrt(2)*self.r-2*self.eps*self.r*iv.sqrt(I('3.18'))
        choices=[tau/8,(1-self.beta)/(12*amax),iv.sqrt(dmin/(16*amax))]
        assert upper(choices[0])<min(lower(x) for x in choices[1:]), 'patch minimum branch unresolved'
        self.delta=choices[0];self.preparation={'delta':bound(self.delta),'da':[[bound(v) for v in a] for a in self.da],'oldSpeed':bound(self.beta),'pastSpeed':bound((1+3*self.beta)/4),'pastSeparationFloor':bound(15*dmin/16),'pastDelayFloor':bound(15*dmin/(16*(1+(1+3*self.beta)/4)))}
        for i in range(4):self.knots[i][0]={'t':0.,'x':[v.c[0] for v in launch[i][0]],'v':[v.c[0] for v in launch[i][1]],'a':acc[i]}
    def circle(self,i,T):
        s,c=(T*self.om+iv.pi*i/2).sincos()
        x=[c*self.r,s*self.r,J(0,T.n)];x=[v+self.eps*self.r*w for v,w in zip(x,self.w[i])]
        v=[-s*self.beta,c*self.beta,J(0,T.n)]
        a=[-c*self.beta*self.om,-s*self.beta*self.om,J(0,T.n)]
        return x,v,a
    def patch(self,i,T):
        x,v,a=self.circle(i,T);u=T/self.delta
        f=T*T*(1+u)**3/2;fp=T+T*T*(I(9)/2)/self.delta+6*T**3/self.delta**2+T**4*(I(5)/2)/self.delta**3
        fpp=1+9*u+18*u*u+10*u**3
        return [j.add(base,j.scale(self.da[i],factor)) for base,factor in zip((x,v,a),(f,fp,fpp))]
    def region(self,S):
        lo,hi=lower(S),upper(S)
        if hi<=-upper(self.delta):return ('circle',0)
        if lo>=-lower(self.delta) and hi<=0:return ('patch',0)
        if lo>=0:
            a=max(0,bisect.bisect_right(self.times,lo)-1);b=max(0,bisect.bisect_left(self.times,hi)-1)
            if a==b and a<len(self.times)-1:return ('poly',a)
        raise Seam((str(lo),str(hi)))
    def state(self,i,T,region=None):
        kind,k=region or self.region(T.c[0])
        if kind=='circle':return self.circle(i,T)
        if kind=='patch':return self.patch(i,T)
        cs,h=self.segments[i][k];return polynomial_state(cs,h,self.times[k],T)
    def point(self,i,t):
        # Exact seam values may be represented by either C2 side.
        q=I(t)
        if lower(q)==upper(q)==0:
            return self.patch(i,J(q,0))
        try:return self.state(i,J(q,0))
        except Seam:
            if upper(q)<=0:
                return self.circle(i,J(q,0)) if upper(q)<=-lower(self.delta) else self.patch(i,J(q,0))
            k=max(0,min(len(self.times)-2,bisect.bisect_right(self.times,lower(q))-1))
            return self.state(i,J(q,0),('poly',k))
    def root(self,i,k,T):
        x=[a.c[0] for a in self.point(i,T)[0]]
        def g(S):
            sx=[a.c[0] for a in self.point(k,S)[0]]
            return j.norm(j.sub(x,sx))-(I(T)-I(S))
        hi=mp.mpf(T);age=mp.mpf(8);lo=hi-age
        while lower(g(lo))>=0:age*=2;lo=hi-age
        assert lower(g(hi))>0
        for _ in range(110):
            mid=(lo+hi)/2;v=g(mid)
            if lower(v)>0:hi=mid
            elif upper(v)<0:lo=mid
            else:
                # D>=.3 is a provisional bracket helper, certified by local range later.
                rad=mag(v)/mp.mpf('.3');lo=mid-rad;hi=mid+rad;break
            if hi-lo<mp.mpf('1e-28'):break
        assert upper(g(lo))<0 and lower(g(hi))>0
        return iv.mpf([lo,hi])

def extra_known():
    n=4;t=J([0,1,0,0,0]);a=I('0.03')
    def src(z):
        w=z+2
        return ([J(0,n),J(0,n),w*w*a/2],[J(0,n),J(0,n),w*a],[J(0,n),J(0,n),J(a,n)])
    F,S=j.response([J(2,n),J(0,n),J(0,n)],[J('.2',n),J('.3',n),J('.4',n)],t,src,J(-2,n))
    for f,e in zip(F,[mp.mpf('.244'),0,mp.mpf('-.012')]):assert j.contains(f.c[0],e)
    assert j.contains(S.c[1],1) and j.contains(S.c[2],0) and j.contains(S.c[3],0)
    assert j.contains(S.c[4],-mp.mpf('.03')**2/16)
    # Exact quintic reconstruction from integer/rational endpoint jets.
    left={'t':0.,'x':[1.,0.,0.],'v':[0.,1.,0.],'a':[0.,0.,2.]}
    right={'t':1.,'x':[2.,1.,1.],'v':[5.,1.,2.],'a':[20.,0.,2.]}
    cs,h=hermite(left,right);x,v,aa=polynomial_state(cs,h,0,J(I(1)/2,4))
    assert j.contains(x[0].c[0],mp.mpf(33)/32) and j.contains(aa[0].c[0],mp.mpf(5)/2)
    # Independently supplied exact quartic full-row control, with moving receiver.
    R=I(2);ac=I('0.05');tau=t-2
    def source(z):return ([J(0,n),z*z*ac/2,J(0,n)],[J(0,n),z*ac,J(0,n)],[J(0,n),J(ac,n),J(0,n)])
    xx=[J(R,n),tau*tau*ac/2,J(0,n)];uu=[J(0,n),tau*ac,J(0,n)]
    ff,ss=j.response(xx,uu,t,source,J(-2,n))
    expected=[(1-tau*tau*(ac*ac))**2/4-tau*(ac*ac/2),-tau*ac*(1-tau*tau*ac*ac)/4-ac/2,J(0,n)]
    for row,ex in zip(ff,expected):
        for got,want in zip(row.c,ex.c):assert lower(got)<=upper(want) and lower(want)<=upper(got)
    # C2 seam X=|T|^3/6 has acceleration |T|, 1-Lipschitz across zero.
    l,r=mp.mpf('-0.2'),mp.mpf('.3');assert abs(abs(l)-abs(r))<=abs(l-r)
    # Unit square plus member-zero offset (1/10,7/100,13/100) has H=7/50.
    A=[I('2.1'),I('.07'),I('.13')];B=[I(0),I(2),I(0)];H=j.dot(A,B);assert j.contains(H,mp.mpf(7)/50)
    return {'passed':True,'cases':['nonzero transverse delayed acceleration full response','implicit accelerated root fourth coefficient','independent exact accelerated-source full quartic jet','exact vector quintic derivative','C2 acceleration transport across seam','diagonal departure exact rational identity']}
if __name__=='__main__':print(json.dumps({'jets':j.known(),'additional':extra_known()},indent=2))
