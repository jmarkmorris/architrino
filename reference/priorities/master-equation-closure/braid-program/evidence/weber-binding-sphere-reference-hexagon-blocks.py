import sympy as sp
x = sp.symbols('x', positive=True)
I = sp.I
def blk(k):
    Mk = sp.eye(2)
    for m, sig in [(1,-1),(2,1),(3,-1)]:
        th2 = m*sp.pi/6; d = 2*x*sp.sin(th2); alpha = sig/d
        weight = sp.Rational(1,2) if m == 3 else 1
        ph = sp.cos(m*k*sp.pi/3) + I*sp.sin(m*k*sp.pi/3)
        p = sp.sin(th2)*(1+ph); q = sp.cos(th2)*(ph-1)
        vec = sp.Matrix([p, q]); H = vec*vec.H
        Mk = Mk - alpha*weight*H
    return sp.simplify(sp.expand_complex(Mk))
for k in [0,1,2,3]:
    Mk = blk(k)
    det = sp.factor(sp.simplify(Mk.det()))
    tr = sp.simplify(Mk.trace())
    print(f"k={k}: M_k =", Mk.tolist())
    print(f"   det = {det}   trace = {tr}")
    print("   eigen:", [sp.simplify(sp.radsimp(e)) for e in Mk.eigenvals().keys()])
    print("   det roots:", sp.solve(sp.Eq(sp.numer(sp.together(det)),0), x))
