"""Guard approach and serialization for the separately validated integrated history."""
import argparse
import importlib.util
import json
from pathlib import Path

path=Path(__file__).with_name('maxwell-shaped-overnight-independent-integrated-history.py')
spec=importlib.util.spec_from_file_location('integrated_history',path)
integrated=importlib.util.module_from_spec(spec)
spec.loader.exec_module(integrated)
module=integrated.module


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--law',choices=['E','full'],required=True)
    parser.add_argument('--beta',type=float,default=.3)
    parser.add_argument('--horizon',type=float,default=65.)
    parser.add_argument('--max-step',type=float,default=.025)
    parser.add_argument('--rtol',type=float,default=1e-11)
    parser.add_argument('--atol',type=float,default=1e-13)
    parser.add_argument('--guard',type=float,default=.999)
    parser.add_argument('--root-tolerance',type=float,default=1e-12)
    parser.add_argument('--output',required=True)
    parser.add_argument('--history-output',required=True)
    args=parser.parse_args()
    # Retain the exact known-case receipt before this target invocation.
    controls=dict(bernstein=integrated.bernstein_known_control(),history=module.history_controls())
    captured=[]
    original_init=integrated.IntegratedHistory.__init__
    def capture(self,past):
        original_init(self,past)
        captured.append(self)
    integrated.IntegratedHistory.__init__=capture
    target=module.evolve(args.beta,args.law,args.horizon,args.max_step,args.rtol,args.atol,
                         args.guard,args.root_tolerance,sample_every=.25)
    history=captured[-1]
    target.update(max_position_seam=history.max_position_seam,
                  max_solver_position_defect=history.max_solver_position_defect)
    target['numerical_contract']['history']='eighth-degree integrated position, both source derivatives from X'
    target['numerical_contract']['speed_bound']='exact-rational Bernstein bound of retained derivative coefficients'
    retained=dict(specification=target['specification'],segments=[dict(t0=s.t0,t1=s.t1,
        coefficients=s.coefficients,speed_upper=s.speed_upper,acceleration_upper=s.acceleration_upper)
        for s in history.segments],scope='retained numerical position history; finite seam and defect measurements apply')
    for p,value in [(args.output,dict(known_controls=controls,target=target)),(args.history_output,retained)]:
        path=Path(p)
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text(json.dumps(module.response.jsonable(value),indent=2)+'\n')
    print(json.dumps(module.response.jsonable(dict(
        stop=target['stop'],t=target['t'],steps=target['steps'],wall_seconds=target['wall_seconds'],
        max_defect=target['max_equation_defect_sampled'],max_a_seam=target['max_acceleration_seam'],
        last=target['records'][-1]))))
