"""Select a valid Taylor enclosure using the reviewed speed-width screen.
The original narrow Taylor pilot and every bound source stay unchanged.
"""
import argparse,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('taylor_composition',HERE/'overnight2-d-taylor-admission.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
run=base.run;old_bind=run.bind;old_controls=run.controls

def geometry(data,nodes,H,Hist,k,i,j,L):
    try:g=base.taylor.geometry(run.d,data,nodes,H,Hist,k,i,j,L)
    except (ValueError,AssertionError,ArithmeticError):g=None
    left,right=map(float,data['T'][k:k+2])
    if base.screened.screen(g,L,left,right):return dict(g,geometry_method='taylor')
    return base.old_geometry(data,nodes,H,Hist,k,i,j,L)

def bind(receipt,alternates=None):
    return old_bind(receipt,alternates)+[Path(__file__).resolve()]

def controls():
    old_controls();I=run.d.PI
    if not base.screened.screen(dict(delta=I(.5)),.5,0.,1.)or base.screened.screen(dict(delta=I(2.)),.5,0.,1.):raise RuntimeError('Taylor speed-width selector')
    if bind(dict(dependencies=[]))[-1]!=Path(__file__).resolve():raise RuntimeError('new selector binding')
    print(json.dumps(dict(control='reviewed speed-width screen applied to complete Taylor geometry and bound selector source',status='PASS')),flush=True)

run.d.geometry=geometry;run.bind=bind;run.controls=controls

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='screened-taylor-admission-pilot');run.main(a.parse_args())
