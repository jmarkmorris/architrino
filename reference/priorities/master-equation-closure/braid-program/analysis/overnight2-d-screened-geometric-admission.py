"""Avoid evaluating an alternative when the valid polynomial shift is small.
Both selected enclosure contracts and the frozen comparison remain unchanged.
"""
import argparse,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('geometric_composition',HERE/'overnight2-d-geometric-admission.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
original_bind=base.run.bind;original_controls=base.run.controls

def screen(polynomial,L,left,right):
    I=base.run.d.PI
    if polynomial is None:return False
    threshold=(I(L)*(I(right)-I(left))/(1-I(L))).lo
    return polynomial['delta'].hi<=max(0.,float(threshold))

def geometry(data,nodes,H,Hist,k,i,j,L):
    try:polynomial=base.original_geometry(data,nodes,H,Hist,k,i,j,L)
    except (ValueError,AssertionError):polynomial=None
    left,right=map(float,data['T'][k:k+2])
    if screen(polynomial,L,left,right):return dict(polynomial,geometry_method='polynomial')
    midpoint=base.mid.geometry(base.run.d,data,nodes,H,Hist,k,i,j,L)
    return base.choose(polynomial,midpoint)

def bind(receipt,alternates=None):
    return original_bind(receipt,alternates)+[Path(__file__).resolve()]

def controls():
    original_controls();I=base.run.d.PI
    # Exact threshold for L=1/2 and width1 is1; test away from rounding edges.
    if not screen(dict(delta=I(.5)),.5,0.,1.)or screen(dict(delta=I(2.)),.5,0.,1.)or screen(None,.5,0.,1.):raise RuntimeError('known geometry screen')
    print(json.dumps(dict(control='known conservative screen; inherited geometry, comparison and binding controls',status='PASS')),flush=True)

base.run.d.geometry=geometry;base.run.bind=bind;base.run.controls=controls

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='screened-geometric-admission-pilot');base.run.main(a.parse_args())
