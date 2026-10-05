"""Diagnose retained polynomial defects; never changes the frozen reference."""
import importlib.util
import json
from pathlib import Path
import sys
import numpy as np
from scipy.integrate import DOP853

path=Path(__file__).with_name('maxwell-shaped-overnight-independent-evolution.py')
spec=importlib.util.spec_from_file_location('independent_evolution',path)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def known_c2_seam():
    def exact(t):
        z=max(t-1.,0.)
        return np.array([1+z**3/6,0.,0.]),np.array([z*z/2,0.,0.]),np.array([z,0.,0.])
    def rhs(t,y):
        return np.concatenate((y[3:],exact(t)[2]))
    history=module.History(exact)
    solver=DOP853(rhs,0.,np.concatenate(exact(0.)[:2]),2.,rtol=1e-11,atol=1e-13,max_step=.05)
    rows=[]
    while solver.status=='running':
        solver.step()
        segment=history.append(solver.dense_output())
        errors=[float(np.linalg.norm(segment.at(segment.t0+z*segment.h)[2]-exact(segment.t0+z*segment.h)[2]))
                for z in [0.,.25,.5,.75,1.]]
        rows.append(dict(t0=segment.t0,t1=segment.t1,h=segment.h,a_error=max(errors),
                         crosses_known_seam=segment.t0<=1<=segment.t1))
    maximum=max(z['a_error'] for z in rows)
    assert maximum<1e-3, maximum
    return dict(passed=True,known_case='x=1+(t-1)_+^3/6, C2 with jerk seam at1',
                maximum_acceleration_error=maximum,worst=sorted(rows,key=lambda z:z['a_error'],reverse=True)[:10])


def target_diagnostics(law):
    rows=[]
    old_append=module.History.append
    def append(self,dense):
        segment=old_append(self,dense)
        values=[]
        for z in [0.,.25,.5,.75,1.]:
            t=segment.t0+z*segment.h
            x,u,a=segment.at(t)
            hit=module.coupled_hit(self,x,u,t,.98,2e-13)
            values.append(dict(t=t,S=hit['S'],defect=float(np.linalg.norm(a+hit[law]))))
        rows.append(dict(t0=segment.t0,t1=segment.t1,h=segment.h,
                         max_defect=max(z['defect'] for z in values),values=values))
        return segment
    module.History.append=append
    # Bypass controls only here; caller first records known_c2_seam separately.
    result=module.evolve(.3,law,35.,.05,1e-10,1e-12)
    return dict(law=law,delta=result['specification']['delta'],
                worst=sorted(rows,key=lambda z:z['max_defect'],reverse=True)[:20],
                smallest_steps=sorted(rows,key=lambda z:z['h'])[:20])


if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser()
    parser.add_argument('--law',choices=['E','full'])
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result={'known_c2_seam':known_c2_seam()}
    if args.law:
        result['target_diagnostics']=target_diagnostics(args.law)
    Path(args.output).write_text(json.dumps(module.response.jsonable(result),indent=2)+'\n')
    print(json.dumps({'passed':True,'target':args.law,'known_max_a_error':result['known_c2_seam']['maximum_acceleration_error']}))
