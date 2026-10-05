"""Refined independent DOP853 history built by integrating its velocity polynomial.

Preserves earlier frozen reference unchanged. The refinement responds to its
OWN dense second-derivative defects, not to parity with the numerical subject.
One eighth-degree position polynomial yields source X, V and A. Derivative
Bernstein convex-hull bounds use exact rational transforms of stored floats.
"""
import argparse
from decimal import Decimal, localcontext, ROUND_CEILING
from fractions import Fraction
import importlib.util
import json
import math
from pathlib import Path
import numpy as np

path=Path(__file__).with_name('maxwell-shaped-overnight-independent-evolution.py')
spec=importlib.util.spec_from_file_location('independent_evolution',path)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class IntegratedPositionPolynomial:
    def __init__(self,dense):
        self.t0,self.t1=dense.t_old,dense.t
        self.h=self.t1-self.t0
        self.dense=dense
        coefficients=np.zeros((1,3))
        for i,f in enumerate(reversed(dense.F)):
            coefficients[0]+=f[3:6]
            extended=np.zeros((len(coefficients)+1,3))
            if i%2==0:
                extended[1:]=coefficients
            else:
                extended[:-1]=coefficients
                extended[1:]-=coefficients
            coefficients=extended
        coefficients[0]+=dense.y_old[3:6]
        self.coefficients=np.zeros((len(coefficients)+1,3))
        self.coefficients[0]=dense.y_old[:3]
        self.coefficients[1:]=self.h*coefficients/np.arange(1,len(coefficients)+1)[:,None]
        self.first=np.arange(1,len(self.coefficients))[:,None]*self.coefficients[1:]/self.h
        self.second=np.arange(1,len(self.first))[:,None]*self.first[1:]/self.h
        self.speed_upper=self.bernstein_norm_bound(self.first)
        self.acceleration_upper=self.bernstein_norm_bound(self.second)

    @staticmethod
    def bernstein_norm_bound(coefficients):
        degree=len(coefficients)-1
        controls=[]
        for i in range(degree+1):
            vector=[]
            for axis in range(3):
                vector.append(sum((Fraction.from_float(float(coefficients[k,axis]))
                                  *Fraction(math.comb(i,k),math.comb(degree,k))
                                  for k in range(i+1)),Fraction(0)))
            controls.append(sum((z*z for z in vector),Fraction(0)))
        square=max(controls)
        with localcontext() as ctx:
            ctx.prec=60
            ctx.rounding=ROUND_CEILING
            upper=(Decimal(square.numerator)/Decimal(square.denominator)).sqrt().next_plus()
        return float(np.nextafter(float(upper),math.inf))

    def at(self,t):
        z=(t-self.t0)/self.h
        return tuple(np.array([np.polynomial.polynomial.polyval(z,c[:,k]) for k in range(3)])
                     for c in [self.coefficients,self.first,self.second])


OriginalHistory=module.History
class IntegratedHistory(OriginalHistory):
    def __init__(self,past):
        super().__init__(past)
        self.max_position_seam=0.
        self.max_solver_position_defect=0.

    def append(self,dense):
        # Explicitly connect the retained history constant to its previous endpoint.
        prior=self.segments[-1].at(dense.t_old) if self.segments else self.past(0.)
        dense.y_old=dense.y_old.copy()
        dense.y_old[:3]=prior[0]
        segment=super().append(dense)
        self.max_position_seam=max(self.max_position_seam,
                                  float(np.linalg.norm(segment.at(segment.t0)[0]-prior[0])))
        self.max_solver_position_defect=max(self.max_solver_position_defect,
            float(np.linalg.norm(segment.at(segment.t1)[0]-dense(segment.t1)[:3])))
        return segment


module.PositionPolynomial=IntegratedPositionPolynomial
module.History=IntegratedHistory


def bernstein_known_control():
    # v(z)=(1+z,0,0), exact maximum 2; enclosure must include it tightly.
    bound=IntegratedPositionPolynomial.bernstein_norm_bound(np.array([[1.,0,0],[1.,0,0]]))
    assert 2<=bound<2+1e-14,bound
    # v(z)=(1,-2z,0), exact maximum sqrt5; tests vector norm convex hull.
    bound2=IntegratedPositionPolynomial.bernstein_norm_bound(np.array([[1.,0,0],[0,-2.,0]]))
    assert math.sqrt(5)<=bound2<math.sqrt(5)+1e-14,bound2
    return dict(passed=True,affine_speed_upper=bound,vector_speed_upper=bound2,
                arithmetic='exact Fraction Bernstein transform; upward decimal square root and nextafter')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--controls-only',action='store_true')
    parser.add_argument('--law',choices=['E','full'],default='E')
    parser.add_argument('--beta',type=float,default=.3)
    parser.add_argument('--horizon',type=float,default=35.)
    parser.add_argument('--max-step',type=float,default=.05)
    parser.add_argument('--rtol',type=float,default=1e-10)
    parser.add_argument('--atol',type=float,default=1e-12)
    parser.add_argument('--guard',type=float,default=.98)
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result=dict(bernstein_control=bernstein_known_control(),history_controls=module.history_controls())
    if not args.controls_only:
        captured=[]
        original_init=IntegratedHistory.__init__
        def capture_init(self,past):
            original_init(self,past)
            captured.append(self)
        IntegratedHistory.__init__=capture_init
        target=module.evolve(args.beta,args.law,args.horizon,args.max_step,args.rtol,args.atol,args.guard)
        target['max_position_seam']=captured[-1].max_position_seam
        target['max_solver_position_defect']=captured[-1].max_solver_position_defect
        target['numerical_contract']['history']='integrated velocity: eighth-degree X; V=dX/dt; A=d2X/dt2'
        target['numerical_contract']['speed_bound']='exact-rational Bernstein transform of stored derivative coefficients'
        result['target']=target
    path=Path(args.output)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(module.response.jsonable(result),indent=2)+'\n')
    summary=dict(passed=True)
    if 'target' in result:
        target=result['target']
        summary.update({k:target[k] for k in ['stop','t','steps','wall_seconds',
                       'max_equation_defect_sampled','max_acceleration_seam',
                       'max_position_seam','max_solver_position_defect']})
        summary['last']=target['records'][-1]
    print(json.dumps(module.response.jsonable(summary)))
