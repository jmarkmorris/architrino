"""Independent exact coordinate-change oracle; no subject module imported."""
import json, sys
from pathlib import Path
import sympy as s

R=s.Rational
def enc(x):
    if isinstance(x,s.MatrixBase): return [[str(x[i,j]) for j in range(x.cols)] for i in range(x.rows)]
    return str(x)

# Known transformation: z=du for q=0, giving xi'=z, z'=BH xi.
I=s.eye(2); Z=s.zeros(2); BH=s.diag(R(1,4),-R(1,8)); nu=R(1,2)
base=Z.row_join(nu*I).col_join((BH/nu).row_join(Z))
assert sorted((base+base.T).eigenvals().keys())==[-1,-R(1,4),R(1,4),1]
assert s.diag(0,0,1,1).is_positive_semidefinite
assert not s.Matrix([[0,1],[1,0]]).is_positive_semidefinite
print('Known stationary coordinate transform and exact PSD controls passed.',file=sys.stderr)

fixtures=[]
for n,alpha,nu,Bq,BH,U in [
    (s.Matrix([R(3,5),R(4,5)]),R(3,2),R(2,3),s.Matrix([[2,-1],[3,4]]),s.Matrix([[-2,5],[7,-3]]),s.Matrix([[1,2],[-3,4]])),
    (s.Matrix([1,0]),-R(2,5),R(7,3),s.Matrix([[0,2],[-1,0]]),s.Matrix([[3,4],[-2,1]]),s.Matrix([[2,-1],[1,3]])),
]:
    t=s.Matrix([-n[1],n[0]]); A=alpha*t*n.T
    assert A*A==Z
    # Solve the original linear relation, rather than reuse block products.
    xi=s.Matrix(s.symbols('x0:2')); z=s.Matrix(s.symbols('z0:2')); fq=s.Matrix([R(2,3),-R(4,5)]); fH=s.Matrix([R(7,4),R(3,2)])
    du=(I+A).inv()*(z-Bq*xi-fq)
    zdot=BH*xi+U*du+fH
    rhs=du.col_join(zdot); vars=xi.col_join(z); M=rhs.jacobian(vars); forcing=rhs.subs(dict.fromkeys(vars,0)); metric=s.diag(nu,nu,1,1)
    weighted=metric*M*metric.inv(); weightedforcing=metric*forcing
    fixtures.append(dict(n=enc(n),alpha=str(alpha),nu=str(nu),Bq=enc(Bq),BH=enc(BH),U=enc(U),M=enc(weighted),forcing=enc(weightedforcing),fq=enc(fq),fH=enc(fH)))
out=Path(sys.argv[1]); assert not out.exists()
out.write_text(json.dumps(dict(passed=True,independentConstruction='SymPy exact inverse of z=(I+A)du+Bq xi+fq followed by Jacobian in xi,z; stationary control first',fixtures=fixtures),indent=2)+'\n')
