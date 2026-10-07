"""Research composition of frozen admission with two proved geometry enclosures.
This is a new instrument; original producers and prior records remain unchanged.
"""
import argparse,importlib.util,json
from pathlib import Path

HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
run=load('frozen_admission','overnight2-d-delayed-admission.py')
mid=load('midpoint_geometry','overnight2-d-midpoint-geometry.py')
original_geometry=run.d.geometry;original_matrix=run.d.matrix_region;original_bind=run.bind;original_controls=run.controls

def choose(polynomial,midpoint):
    if polynomial is not None and polynomial['delta'].hi<=midpoint['delta'].hi:
        return dict(polynomial,geometry_method='polynomial')
    return dict(midpoint,geometry_method='midpoint')

def geometry(data,nodes,H,Hist,k,i,j,L):
    midpoint=mid.geometry(run.d,data,nodes,H,Hist,k,i,j,L)
    try:polynomial=original_geometry(data,nodes,H,Hist,k,i,j,L)
    except (ValueError,AssertionError):polynomial=None
    return choose(polynomial,midpoint)

def matrix_region(data,nodes,H,g,sep,P,Z):
    B,C,record=original_matrix(data,nodes,H,g,sep,P,Z)
    record.update(geometry_method=g['geometry_method'],reference_geometry_shift_upper=float(g['delta'].hi))
    return B,C,record

def bind(receipt,alternates=None):
    return original_bind(receipt,alternates)+[Path(__file__).resolve(),HERE/'overnight2-d-midpoint-geometry.py']

def controls():
    original_controls();mid.controls(run.d)
    I=run.d.PI
    for p,m,want in [(1.,2.,'polynomial'),(3.,2.,'midpoint'),(2.,2.,'polynomial')]:
        if choose(dict(delta=I(p)),dict(delta=I(m)))['geometry_method']!=want:raise RuntimeError('geometry selector')
    if choose(None,dict(delta=I(2.)))['geometry_method']!='midpoint':raise RuntimeError('unavailable polynomial selector')
    if bind(dict(dependencies=[]))!=[Path(__file__).resolve(),HERE/'overnight2-d-midpoint-geometry.py']:raise RuntimeError('composition binding')
    print(json.dumps(dict(control='known selection of valid geometry and binding of both new composition sources',status='PASS')),flush=True)

run.d.geometry=geometry;run.d.matrix_region=matrix_region;run.bind=bind;run.controls=controls

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='geometric-admission-pilot');run.main(a.parse_args())
