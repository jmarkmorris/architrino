"""Complete phase-zero all-root determinants on fixed coefficient boxes."""
import argparse,hashlib,importlib.util,json,math,resource,signal,time
from fractions import Fraction as F
from pathlib import Path
import mpmath
import numpy as np
iv=mpmath.iv;iv.dps=55
ROOT=Path(__file__).resolve().parents[5]
DEP=Path(__file__).with_name('overnight2-b-superwake-harmonic-search.py')
DEP_SHA='8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-harmonic-search/target.json'
INPUT_SHA='539e3603aa6454c9d77379c94d2aae74384e90a4599d1d7af92ec81cba53efa3'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/superwake-determinant'
START=time.monotonic();LEAVES=0
signal.signal(signal.SIGALRM,lambda *_:(_ for _ in ()).throw(TimeoutError('120 second cap')));signal.alarm(120)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def rational(x):
    x=F(x);return iv.mpf(x.numerator)/x.denominator
def bounds(x):
    return tuple(F(-m if s else m)*F(2)**e for s,m,e,_ in x._mpi_)
def interval(a,b=None):
    return iv.mpf([rational(a).a,rational(a if b is None else b).b])
def encode(x):return [str(q) for q in bounds(x)]
def sign(x):
    a,b=bounds(x);return 1 if a>0 else -1 if b<0 else 0
def intersect(a,b):
    x,y=bounds(a);u,v=bounds(b);left,right=max(x,u),min(y,v)
    if left>right:raise ArithmeticError('empty root intersection')
    return interval(left,right)
def waves(phi,x,H):
    a,b,c,d,e,f,B,K,g,h,u,w,n,m=x
    co,si=iv.cos(2*phi),iv.sin(2*phi);co4,si4=iv.cos(4*phi),iv.sin(4*phi)
    rho=1+a*co+b*si+g*co4+h*si4
    rp=-2*a*si+2*b*co-4*g*si4+4*h*co4
    rpp=-4*a*co-4*b*si-16*g*co4-16*h*si4
    p=(c*co+d*si+u*co4+w*si4)/K
    pp=(-2*c*si+2*d*co-4*u*si4+4*w*co4)/K
    ppp=(-4*c*co-4*d*si-16*u*co4-16*w*si4)/K
    z=H*iv.cos(phi)+e*iv.cos(3*phi)+f*iv.sin(3*phi)+n*iv.cos(5*phi)+m*iv.sin(5*phi)
    zp=-H*iv.sin(phi)-3*e*iv.sin(3*phi)+3*f*iv.cos(3*phi)-5*n*iv.sin(5*phi)+5*m*iv.cos(5*phi)
    zpp=-H*iv.cos(phi)-9*e*iv.cos(3*phi)-9*f*iv.sin(3*phi)-25*n*iv.cos(5*phi)-25*m*iv.sin(5*phi)
    return rho,rp,rpp,p,pp,ppp,z,zp,zpp
def geometry(delay,j,x,H):
    B,K=x[6:8];r,_,_,p,_,_,z,_,_=waves(interval(0),x,H)
    rs,rps,_,ps,pps,_,zs,zps,_=waves(-K*delay,x,H)
    angle=j*iv.pi/3-B*delay+ps-p;co,si=iv.cos(angle),iv.sin(angle);sgn=(-1)**j
    q=[r-rs*co,-rs*si,z-sgn*zs]
    velocity=[K*rps*co-rs*(B+K*pps)*si,K*rps*si+rs*(B+K*pps)*co,sgn*K*zps]
    square=sum((t**2 for t in q),interval(0))-delay**2
    derivative=2*sum((a*b for a,b in zip(q,velocity)),interval(0))-2*delay
    return square,derivative,q,velocity
def guards(x,H):
    a,b,c,d,e,f,B,K,g,h,u,w,n,m=x
    ra=abs(a)+abs(b)+abs(g)+abs(h);rlo=1-ra;rhi=1+ra
    angular=2*(abs(c)+abs(d))+4*(abs(u)+abs(w))
    r1=2*(abs(a)+abs(b))+4*(abs(g)+abs(h));r2=4*(abs(a)+abs(b))+16*(abs(g)+abs(h))
    p2=4*(abs(c)+abs(d))+16*(abs(u)+abs(w))
    z0=abs(H)+abs(e)+abs(f)+abs(n)+abs(m)
    z1=abs(H)+3*(abs(e)+abs(f))+5*(abs(n)+abs(m))
    z2=abs(H)+9*(abs(e)+abs(f))+25*(abs(n)+abs(m))
    wmax=B+angular;vmin=rlo*(B-angular)
    acceleration=iv.sqrt((K*K*r2+rhi*wmax*wmax)**2+(2*K*r1*wmax+rhi*K*p2)**2+(K*K*z2)**2)
    speed=iv.sqrt((K*r1)**2+(rhi*wmax)**2+(K*z1)**2)
    recent=F(1,100);self_floor=vmin-acceleration*rational(recent)/2
    partner_gap=rlo-(1+speed)*rational(recent)
    if bounds(self_floor)[0]<=1 or bounds(partner_gap)[0]<=0:raise ArithmeticError('recent guards failed')
    remote=2*iv.sqrt(rhi*rhi+z0*z0);end=bounds(remote)[1]+F(1,100)
    return recent,end,dict(radiusLower=encode(rlo),selfSecantFloor=encode(self_floor),partnerGapLower=encode(partner_gap),remote=encode(remote))
def complement(fun,a,b,depth=0):
    global LEAVES
    if time.monotonic()-START>120 or LEAVES>50000:raise TimeoutError('complement budget')
    if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('resident cap')
    X=interval(a,b);g,d=fun(X)[:2]
    if sign(g):LEAVES+=1;return [dict(delay=[str(a),str(b)],gap=encode(g))]
    ga,gb=fun(interval(a))[0],fun(interval(b))[0]
    if sign(d) and sign(ga)==sign(gb)!=0:
        LEAVES+=1;return [dict(delay=[str(a),str(b)],derivative=encode(d),endpoints=[encode(ga),encode(gb)])]
    if depth>=30:raise ArithmeticError('unresolved complement')
    m=(a+b)/2
    return complement(fun,a,m,depth+1)+complement(fun,m,b,depth+1)
def census(fun,points,recent,end):
    rows=[];inactive=[];cursor=recent
    for guess in sorted(points):
        center=F(str(guess));width=F(1,4096);proof=None
        for _ in range(5):
            a,b=center-width,center+width
            if a<=cursor or b>=end:break
            ga,gb=fun(interval(a))[0],fun(interval(b))[0];derivative=fun(interval(a,b))[1]
            if sign(ga)*sign(gb)==-1 and sign(derivative):
                proof=dict(bracket=[str(a),str(b)],endpoints=[encode(ga),encode(gb)],derivative=encode(derivative));break
            width*=2
        if proof is None:raise ArithmeticError('uniform root bracket failed')
        inactive+=complement(fun,cursor,a);cursor=b;root=interval(a,b)
        for _ in range(24):
            lo,hi=bounds(root);middle=(lo+hi)/2;derivative=fun(root)[1]
            if not sign(derivative):raise ArithmeticError('contracted derivative lost sign')
            newer=intersect(root,rational(middle)-fun(interval(middle))[0]/derivative)
            if bounds(newer)==bounds(root):break
            root=newer
        proof['root']=encode(root);rows.append((root,proof))
    inactive+=complement(fun,cursor,end)
    return rows,inactive
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),K=1,c_f=1,wallSeconds=time.monotonic()-START,maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,complementLeaves=LEAVES,**data)
    text=json.dumps(payload,indent=2);assert len(text)<16*1024**2
    with path.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(path),sha256=sha(path))),flush=True)
def contains(value,exact):
    a,b=bounds(value);assert a<=F(exact)<=b
def known():
    x=[interval(0)]*14;x[7]=interval(1);H=interval(0);total=[interval(0)]*3
    for j in range(1,6):
        guess=2*math.sin(j*math.pi/6);rows,gaps=census(lambda d:geometry(d,j,x,H),[guess],F(1,100),F(3))
        assert len(rows)==1;d=rows[0][0];_,_,q,v=geometry(d,j,x,H)
        for i in range(3):total[i]+=(-1)**j*q[i]/d**3
    exact=-rational(F(5,4))+1/iv.sqrt(3);assert bounds(intersect(total[0],exact))[0]<=bounds(exact)[1]
    contains(total[1],0);contains(total[2],0)
    values=[F(v) for v in ['.02','.03','.04','.05','.06','.07','2','2','.01','.015','.02','.025','.03','.035']]
    actual=waves(interval(0),list(map(rational,values)),rational(F(1,5)))
    for a,e in zip(actual,['1.03','.12','-.24','.03','.1','-.24','.29','.385','-1.49']):contains(a,e)
    contains(geometry(interval(2),3,x,H)[0],0);contains(geometry(interval(2),3,x,H)[1],-4)
    save('known',dict(passed=True,controls=['five complete static partner censuses and analytic acceleration','exact diametric gap derivative','independent higher-harmonic derivative values'],staticAcceleration=[encode(a) for a in total]))
def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(DEP)==DEP_SHA and sha(INPUT)==INPUT_SHA
    spec=importlib.util.spec_from_file_location('frozen_float_guesses',DEP);proposal=importlib.util.module_from_spec(spec);spec.loader.exec_module(proposal)
    data=json.loads(INPUT.read_text());selected=data['results'][:1] if stage=='pilot' else data['results'];results=[];failure=None
    for original in selected:
        literals=[str(v) for v in original['parameters']];h=str(original['H']);eps=F(1,2**20)
        x=[interval(F(t)-eps,F(t)+eps) for t in literals];H=interval(F(h)-eps,F(h)+eps)
        try:
            recent,end,guard=guards(x,H);A=[interval(0)]*3;channels=[]
            for j in range(6):
                guesses=[r[0] for r in proposal.roots(0.,j,np.array(original['parameters']),original['H'],2048)]
                rows,inactive=census(lambda d:geometry(d,j,x,H),guesses,recent,end);proofrows=[]
                for d,proof in rows:
                    _,gd,q,v=geometry(d,j,x,H);D=1-sum((a*b for a,b in zip(q,v)),interval(0))/d
                    if not sign(D):raise ArithmeticError('source divisor interval contains zero')
                    term=[(-1)**j*t/(d**3*abs(D)) for t in q]
                    for i in range(3):A[i]+=term[i]
                    proofrows.append(dict(**proof,divisor=encode(D),acceleration=[encode(t) for t in term]))
                channels.append(dict(source=j,roots=proofrows,complement=inactive))
            r,rp,rpp,p,pp,ppp,z,zp,zpp=waves(interval(0),x,H);B,K=x[6:8];w=B+K*pp
            L=[K*K*rpp-r*w*w,2*K*rp*w+r*K*K*ppp,K*K*zpp];det=A[0]*L[2]-A[2]*L[0]
            results.append(dict(heightLiteral=h,coefficientLiterals=literals,halfwidth=str(eps),recent=str(recent),end=str(end),guards=guard,channels=channels,acceleration=[encode(t) for t in A],demand=[encode(t) for t in L],determinant=encode(det),excluded=sign(det)!=0))
        except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc);break
    save(stage,dict(passed=failure is None and len(results)==len(selected) and all(r['excluded'] for r in results),knownSha256=sha(kp),inputSha256=INPUT_SHA,proposalSha256=DEP_SHA,results=results,failure=failure,pendingHeights=[r['H'] for r in selected[len(results):]],claim='Complete single-reception root chart and scale-free continuous-box determinant; no full-period chart or whole-search exclusion'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
