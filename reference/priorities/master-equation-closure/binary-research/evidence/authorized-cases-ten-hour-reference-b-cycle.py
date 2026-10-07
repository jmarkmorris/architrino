"""Independent finite fixed-receiver coefficients; no subject imports."""
import sympy as S, json, sys, signal
signal.alarm(45)
r,p,t,u=S.symbols('r p t u',real=True,positive=False)
r=S.Symbol('r',positive=True)

def scalarD(f):
    return S.diff(f,r)*p+S.diff(f,p)*(t*t/r-1/r**2)+S.diff(f,t)*(-p*t/r)
def vectorD(v):
    return S.Matrix([S.factor(scalarD(v[0])-t*v[1]/r),S.factor(scalarD(v[1])+t*v[0]/r)])
def coeff(n,jets):
    q=[2*r, S.Integer(0)]
    for j,v in enumerate(jets,1):
        for k in range(2): q[k]+=(-u)**j*v[k]/S.factorial(j)
    norm=S.expand(q[0]**2+q[1]**2)
    z=S.Poly(S.expand((norm-4*r*r)/(4*r*r)),u)
    zz={k[0]:v for k,v in z.terms() if 0<k[0]<=n}
    powz={0:S.Integer(1)}; f={}
    for j in range(n+1):
        for k,v in powz.items(): f[k]=f.get(k,0)+S.binomial(S.Rational(n-3,2),j)*v
        new={}
        for a,x in powz.items():
            for b,y in zz.items():
                if a+b<=n:new[a+b]=new.get(a+b,0)+x*y
        powz=new
    ans=[]
    for qk in q:
        poly=S.Poly(qk,u); v=sum(c*f.get(n-k[0],0) for k,c in poly.terms() if k[0]<=n)
        ans.append(S.factor(4*(n-1)*(2*r)**(n-3)*v))
    return S.Matrix(ans)

def known():
    cjets=[S.Matrix(v) for v in [(0,1),(-1,0),(0,-1),(1,0),(0,1)]]
    expected={2:S.Matrix([-S.Rational(1,2),0]),3:S.Matrix([0,S.Rational(4,3)]),4:S.Matrix([S.Rational(21,8),0]),5:S.Matrix([0,-S.Rational(68,15)])}
    for n,e in expected.items():
        got=coeff(n,cjets).subs(r,1);assert all(S.simplify(x)==0 for x in got-e),(n,got)
    assert vectorD(S.Matrix([-1/r**2,0]))==S.Matrix([2*p/r**3,-t/r**3])
    return {'passed':True,'controls':['fixed-receiver circular C2 -1/2','circular C3 4/3','circular C4 21/8','circular C5 -68/15','central jerk exact rotating derivative']}
if sys.argv[1]=='known':print(json.dumps(known(),indent=2));sys.exit()
a=S.Matrix([-1/r**2,0]);jets=[S.Matrix([p,t]),a]
for j in range(3):jets.append(vectorD(jets[-1]))
F2=S.Matrix([-t*t/(2*r*r),-p*t/r**2]);F3=S.Matrix([-8*p/(3*r**3),4*t/(3*r**3)])
C4=coeff(4,jets);C5=coeff(5,jets)
F4=S.simplify(C4+S.Matrix([0,F2[1]/r]));F5=S.simplify(C5+S.Matrix([0,F3[1]/r])-S.Rational(4,3)*vectorD(F2))
print(json.dumps({'C4':list(map(str,C4)),'C5':list(map(str,C5)),'F4':list(map(str,F4)),'F5':list(map(str,F5))},indent=2))
