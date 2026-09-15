"""Certify common-height turns after the full-law residual budgets pass."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/later-certification/check'
SPEC=importlib.util.spec_from_file_location('residual',HERE/'smooth-two-particle-later-residual.py')
R=importlib.util.module_from_spec(SPEC); SPEC.loader.exec_module(R)
I=R.I


def cell_range(paths,label,start,end,derivative):
    assert start==round(start/paths.h)*paths.h and end==round(end/paths.h)*paths.h
    cells=np.arange(round(start/paths.h),round(end/paths.h))
    labs=np.full(len(cells),label,dtype=int)
    values=paths.cell(cells,labs,I(np.zeros(len(cells)),np.ones(len(cells))),derivative)[derivative]
    return I(np.min(values.lo[:,2]),np.max(values.hi[:,2]))


def endpoint(paths,label,t,derivative):
    return paths.values(I(np.array([t])),np.array([label]),derivative)[derivative][0,2]


def serialized(value):return [float(value.lo),float(value.hi)]


def ratio_bounds(A,B,C):
    assert A.lo>C.hi and C.lo>B.hi
    lower=(I(C.lo)-I(B.hi))/(I(A.hi)-I(B.hi))
    upper=(I(C.hi)-I(B.lo))/(I(A.lo)-I(B.lo))
    return I(lower.lo,upper.hi)


def known():
    # Exact dyadic samples of p(t)=2t-t^2 and its derivatives.
    t=np.arange(9)/4
    y=np.zeros((9,1,3)); v=y.copy(); a=y.copy()
    y[:,0,2]=2*t-t*t; v[:,0,2]=2-2*t; a[:,0,2]=-2
    obj=R.Paths(y,v,a,.25)
    left=endpoint(obj,0,.75,1); right=endpoint(obj,0,1.25,1)
    acceleration=cell_range(obj,0,.75,1.25,2)
    height=cell_range(obj,0,.75,1.25,0)
    assert left.lo>0 and right.hi<0 and acceleration.hi<0
    assert height.lo<=15/16 and height.hi>=1
    ratio=ratio_bounds(I(5),I(-1),I(2))
    assert ratio.lo<=.5<=ratio.hi
    report={'result':'PASS','controls':['known quadratic unique maximum and height range','correlated-trough ratio equals one half'],'source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    (OUT/'turns-known.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report),flush=True)


def target(args):
    report=json.loads((OUT/'turns-known.json').read_text())
    assert report['result']=='PASS'
    residual=json.loads(Path(args.receipt).read_text())
    assert residual['sources']['labels']==list(range(76)) and residual['target']['labels']==[1]
    assert residual['sources']['max_euclidean_residual']<(I(1)/10**10).lo
    assert residual['target']['max_euclidean_residual']<(I(1)/10**9).lo
    path=Path(residual['input'])
    assert hashlib.sha256(path.read_bytes()).hexdigest()==residual['input_sha256']
    data=np.load(path)
    paths=R.Paths(data['receiver_y'],data['receiver_v'],data['receiver_a'],1/residual['grid'])
    eps_p=I(6)/10**8; eps_v=I(12)/10**8; eps_a=I(2)/10**7
    windows=[(1545/1024,1547/1024,-1),(1878/1024,1881/1024,1),(2019/1024,2024/1024,-1)]
    intervals=[]; extrema=[]
    for start,end,accel_sign in windows:
        vl=endpoint(paths,1,start,1); vr=endpoint(paths,1,end,1)
        ac=cell_range(paths,1,start,end,2)
        zr=cell_range(paths,1,start,end,0)
        true_vl=vl+I(-eps_v.hi,eps_v.hi); true_vr=vr+I(-eps_v.hi,eps_v.hi)
        true_ac=ac+I(-eps_a.hi,eps_a.hi)
        true_z=zr+I(-eps_p.hi,eps_p.hi)
        if accel_sign<0:
            assert true_vl.lo>0 and true_vr.hi<0 and true_ac.hi<0
        else:
            assert true_vl.hi<0 and true_vr.lo>0 and true_ac.lo>0
        extrema.append(true_z)
        intervals.append({'time':[start,end],'kind':'maximum' if accel_sign<0 else 'minimum','actual_left_velocity':serialized(true_vl),'actual_right_velocity':serialized(true_vr),'actual_acceleration_range':serialized(true_ac),'actual_height_range':serialized(true_z)})
    gaps=[(1.25,windows[0][0],1),(windows[0][1],windows[1][0],-1),(windows[1][1],windows[2][0],1),(windows[2][1],2.,-1)]
    signs=[]
    for start,end,sign in gaps:
        bound=cell_range(paths,1,start,end,1)+I(-eps_v.hi,eps_v.hi)
        assert bound.lo>0 if sign>0 else bound.hi<0
        signs.append({'time':[start,end],'actual_velocity_range':serialized(bound)})
    A,B,C=extrema
    down=A-B; up=C-B
    ratio=ratio_bounds(A,B,C)
    assert down.lo>0 and up.lo>0 and ratio.hi<(I(1)/3).lo
    result={'grade':'conditional interval turn certificate, requiring independent acceptance of the full-law residual checker and propagation theorem','known':report,'residual_receipt':str(args.receipt),'residual_receipt_sha256':hashlib.sha256(Path(args.receipt).read_bytes()).hexdigest(),'archive_sha256':residual['input_sha256'],'covered_time':[1.25,2.],'position_error':float(eps_p.hi),'velocity_error':float(eps_v.hi),'acceleration_error':float(eps_a.hi),'turns':intervals,'intervening_velocity_signs':signs,'downward_excursion':serialized(down),'upward_excursion':serialized(up),'upward_to_downward_ratio':serialized(ratio),'three_consecutive_turns':'PASS','following_excursion_less_than_one_third':'PASS'}
    (OUT/'turns.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('mode',choices=['known','target'])
    p.add_argument('--receipt',default=str(OUT/'certified-full-s8.json'))
    args=p.parse_args()
    known() if args.mode=='known' else target(args)
