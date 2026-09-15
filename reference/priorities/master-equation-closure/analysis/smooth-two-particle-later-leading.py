"""Independent first-amplitude two-leg path sum, valid before third-leg entry."""
import json
import sys
from pathlib import Path
import sympy as S
import mpmath as mp

mp.mp.dps = 45
OUT=Path(__file__).resolve().parents[4]/'.local-data/master-equation-closure/later-motion/leading'
u=S.symbols('u')
p=-(1-8*u)*u**4*(1-4*u)**4
L=S.Rational(1,4)
P=[p]
for j in range(4):
    P.append(S.integrate(P[-1],(u,0,u)))
post=[S.Integer(0)]
for j in range(1,5):
    post.append(S.expand(P[j].subs(u,L)+S.integrate(post[-1],(u,L,u))))
mpP=[S.lambdify(u,f,'mpmath') for f in P]
mpPost=[S.lambdify(u,f,'mpmath') for f in post]

def prim(n,v):
    return mp.mpf(0) if v<=0 else (mpP[n](v) if v<=mp.mpf(1)/4 else mpPost[n](v))

def offsets(radius):
    return [(a,b,c) for a in range(-radius,radius+1) for b in range(-radius,radius+1) for c in range(-radius,radius+1)]

def known():
    OUT.mkdir(parents=True,exist_ok=True)
    assert sum(a*a+b*b+c*c==1 for a,b,c in offsets(1))==6
    assert S.integrate(p,(u,0,L))==0
    assert P[2].subs(u,L)==-S.Rational(1,56770560)
    for n in range(1,5):
        assert S.expand(S.diff(P[n],u)-P[n-1])==0
        assert post[n].subs(u,L)==P[n].subs(u,L)
        assert S.expand(S.diff(post[n],u)-post[n-1])==0
    (OUT/'known.json').write_text(json.dumps({'result':'PASS','controls':['six axial integer offsets','zero pulse area','known second primitive endpoint','primitive derivatives and endpoint continuation']}))
    print((OUT/'known.json').read_text())

def target():
    assert json.loads((OUT/'known.json').read_text())['result']=='PASS'
    i=S.Matrix([1,0,0]); e3=S.Matrix([0,0,1])
    groups={}; labels=set()
    for c in [S.zeros(3,1),i]:
        sign=1 if c==i else -1
        for jtuple in offsets(3):
            j=S.Matrix(jtuple)
            if j==i or j==S.zeros(3,1):continue
            k=j-c; R=i-j; d2=k.dot(k); r2=R.dot(R)
            if d2<2 or r2<1:continue
            d=S.sqrt(d2); r=S.sqrt(r2)
            delay=d+r-S.Rational(11,8)
            if float(delay)>2:continue
            nk=k/d; n=R/r
            A=(3*nk*nk[2]-e3)/d**3; B=nk*nk[2]/d**2
            Jr=(S.eye(3)-3*n*n.T)/r**3; Kr=n/r**2
            co=[sign*(-Jr*A)[2],sign*(-Jr*B+Kr*(n.dot(A)))[2],sign*(Kr*(n.dot(B)))[2]]
            key=S.simplify(delay)
            groups.setdefault(key,[0,[S.Integer(0)]*3])
            groups[key][0]+=1
            groups[key][1]=[S.simplify(a+b) for a,b in zip(groups[key][1],co)]
            labels.add(jtuple)
    numeric=[(mp.mpf(str(S.N(key,48))),[mp.mpf(str(S.N(q,48))) for q in val[1]]) for key,val in groups.items()]
    def val(t,order=0):
        return 256*sum(sum(q*prim(n-order,t-delay) for q,n in zip(co,[4,3,2])) for delay,co in numeric)
    first=S.sqrt(2)-S.Rational(3,8)
    expected=[-S.sqrt(2),-(1+1/(2*S.sqrt(2))),-S.Rational(1,2)]
    assert all(S.simplify(a-b)==0 for a,b in zip(groups[first][1],expected))
    times=[mp.mpf('1.3048385623730950488'),mp.mpf('1.5'),mp.mpf('1.6'),mp.mpf('1.7'),mp.mpf('1.8'),mp.mpf('1.9'),mp.mpf('2')]
    roots=[]; before=mp.mpf('1.31'); vb=val(before,1)
    for it in range(132,201):
        after=mp.mpf(it)/100; va=val(after,1)
        if vb*va<0:
            root=mp.findroot(lambda t:val(t,1),(before,after))
            roots.append({'t':str(root),'height':str(val(root))})
        before,vb=after,va
    report={'grade':'exact first-amplitude path-sum formulas; sampled evaluations, not finite-amplitude certification','g':16,'c_f':1,'distinct_sources':len(labels),'groups':[{'onset':str(k),'channels':v[0],'coefficients_P4_P3_P2':[str(a) for a in v[1]]} for k,v in sorted(groups.items(),key=lambda item:float(item[0]))],'first_return_coefficient_check':'PASS independent reconstruction agrees exactly with accepted formula','samples':[{'t':str(t),'height':str(val(t)),'velocity':str(val(t,1))} for t in times],'height_turns':roots}
    (OUT/'result.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))

if __name__=='__main__':
    {'known':known,'target':target}[sys.argv[1]]()
