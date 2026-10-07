"""Research admission composition selecting a valid Taylor source enclosure.
The frozen screened construction remains the fallback; all core gates persist.
"""
import argparse,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
screened=load('screened_composition','overnight2-d-screened-geometric-admission.py')
taylor=load('taylor_geometry','overnight2-d-taylor-geometry.py');run=screened.base.run
old_geometry=run.d.geometry;old_matrix=run.d.matrix_region;old_bind=run.bind;old_controls=run.controls

def eligible(g,left,right):
    I=run.d.PI
    return g is not None and g['delta'].hi<=((I(right)-I(left))/100).lo

def geometry(data,nodes,H,Hist,k,i,j,L):
    try:g=taylor.geometry(run.d,data,nodes,H,Hist,k,i,j,L)
    except (ValueError,AssertionError,ArithmeticError):g=None
    left,right=map(float,data['T'][k:k+2])
    if eligible(g,left,right):return dict(g,geometry_method='taylor')
    return old_geometry(data,nodes,H,Hist,k,i,j,L)

def matrix_region(data,nodes,H,g,sep,P,Z):
    B,C,m=old_matrix(data,nodes,H,g,sep,P,Z)
    if g['geometry_method']=='taylor':
        for key in ['source_center','source_acceleration_upper','source_taylor_error_upper']:m['taylor_'+key]=g[key]
        m['taylor_candidate_source_interval']=g['s'].record()
    return B,C,m

def bind(receipt,alternates=None):
    return old_bind(receipt,alternates)+[Path(__file__).resolve(),HERE/'overnight2-d-taylor-geometry.py']

def controls():
    old_controls();taylor.controls(run.d);I=run.d.PI
    if not eligible(dict(delta=I(.005)),0.,1.)or eligible(dict(delta=I(.02)),0.,1.)or eligible(None,0.,1.):raise RuntimeError('known Taylor selection')
    if bind(dict(dependencies=[]))[-2:]!=[Path(__file__).resolve(),HERE/'overnight2-d-taylor-geometry.py']:raise RuntimeError('Taylor source binding')
    print(json.dumps(dict(control='known Taylor selection and binding, inherited composed controls',status='PASS')),flush=True)

run.d.geometry=geometry;run.d.matrix_region=matrix_region;run.bind=bind;run.controls=controls

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='taylor-admission-pilot');run.main(a.parse_args())
