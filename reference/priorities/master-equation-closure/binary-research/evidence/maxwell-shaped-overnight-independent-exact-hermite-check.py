"""Independent literal-history Bernstein review. Solve endpoint system by Gaussian
elimination rather than subject's explicit quintic coefficients; Fraction exact.
Known quadratic passes before target retained knot files. Not trajectory tube.
"""
import argparse,json,math
from fractions import Fraction as F
from pathlib import Path

def solve(A,b):
    A=[list(map(F,row))+[F(rhs)] for row,rhs in zip(A,b)]
    for j in range(len(A)):
        k=next(k for k in range(j,len(A)) if A[k][j]);A[j],A[k]=A[k],A[j]
        pivot=A[j][j];A[j]=[x/pivot for x in A[j]]
        for k in range(len(A)):
            if k!=j:
                q=A[k][j];A[k]=[x-q*y for x,y in zip(A[k],A[j])]
    return [row[-1] for row in A]

matrix=[[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,2,0,0,0],[1,1,1,1,1,1],[0,1,2,3,4,5],[0,0,2,6,12,20]]
inv=[solve(matrix,[int(i==j) for i in range(6)]) for j in range(6)]

def polynomial(left,right,k):
    h=F(right['t'])-F(left['t']);b=[F(left['x'][k]),h*F(left['v'][k]),h*h*F(left['a'][k]),F(right['x'][k]),h*F(right['v'][k]),h*h*F(right['a'][k])]
    c=[sum(inv[j][i]*b[j] for j in range(6)) for i in range(6)]
    return h,c

def bernstein_velocity(h,c):
    c=[F(i)*c[i]/h for i in range(1,6)]
    return [sum(c[k]*F(math.comb(j,k),math.comb(4,k)) for k in range(j+1)) for j in range(5)]

def known():
    q=lambda t:dict(t=t,x=[F(t*t,2),F(0)],v=[F(t),F(0)],a=[F(1),F(0)])
    h,c=polynomial(q(1),q(2),0);b=bernstein_velocity(h,c)
    assert c==[F(1,2),F(1),F(1,2),F(0),F(0),F(0)]
    assert b==[F(1),F(5,4),F(3,2),F(7,4),F(2)]
    return dict(passed=True,case='exact quadratic endpoint system and known degree-four Bernstein velocity')

def target(law):
    path=Path(f'.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/b03-{law}-checked-event999-h0.00125.history.json')
    saved=json.loads(path.read_text());knots=saved['knots'];maxnorm2=F(0);minslack=None;rho=F(15,100) if law=='E' else F(23,100)
    for left,right in zip(knots,knots[1:]):
        polys=[polynomial(left,right,k) for k in range(2)];h=polys[0][0]
        controls=[bernstein_velocity(h,c) for h,c in polys]
        norm2=max(sum(c[j]**2 for c in controls) for j in range(5));maxnorm2=max(norm2,maxnorm2)
        slack=sum(F(x)**2 for x in left['x'])-(rho+h)**2
        minslack=slack if minslack is None else min(slack,minslack)
        assert norm2<F(9999,10000)**2 and slack>0
    return dict(law=law,segments=len(knots)-1,max_speed_squared=float(maxnorm2),min_clearance_slack=float(minslack),passed=True,grade='exact literal Hermite whole-segment bounds; no exacttrajectory identification')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args()
    result=dict(known=known())
    if args.target:result['targets']=[target(law) for law in ['E','full']]
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
