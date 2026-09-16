"""Enclose the fourth common-height turn and its completed descent."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/next-minimum/check'
spec=importlib.util.spec_from_file_location('accepted_turn_primitives',HERE/'smooth-two-particle-later-turns.py')
T=importlib.util.module_from_spec(spec);spec.loader.exec_module(T)
I=T.I


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def descent_ratio(B,C,D):
    """The shared maximum C occurs in both excursions."""
    assert C.lo>D.hi and D.lo>B.hi
    lower=(I(C.lo)-I(D.hi))/(I(C.lo)-I(B.lo))
    upper=(I(C.hi)-I(D.lo))/(I(C.hi)-I(B.hi))
    return I(lower.lo,upper.hi)


def known():
    # Exact quadratic with its unique minimum at 1 and height 1/4.
    t=np.arange(9)/4
    y=np.zeros((9,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=(t-1)**2+1/4;v[:,0,2]=2*(t-1);a[:,0,2]=2
    p=T.R.Paths(y,v,a,1/4)
    assert T.endpoint(p,0,.75,1).hi<0<T.endpoint(p,0,1.25,1).lo
    assert T.cell_range(p,0,.75,1.25,2).lo>0
    z=T.cell_range(p,0,.75,1.25,0)
    assert z.lo<=1/4 and z.hi>=5/16
    q=descent_ratio(I(-1),I(3),I(1))
    assert q.lo<=.5<=q.hi
    # Independent corner enumeration checks the correlated extremum formula.
    B=I(-2,-1);C=I(4,5);D=I(1,2)
    q=descent_ratio(B,C,D)
    for b in [-2,-1]:
        for c in [4,5]:
            for d in [1,2]:assert q.lo<=(c-d)/(c-b)<=q.hi
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),
            'controls':['exact quadratic minimum and continuous height range','known one-half descent ratio','independent eight-corner correlated ratio check']}
    (OUT/'turns-known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def target():
    known_record=json.loads((OUT/'turns-known.json').read_text());assert known_record['result']=='PASS'
    receipt_path=OUT/'both-residual.json';receipt=json.loads(receipt_path.read_text())
    assert receipt['sources']['full_residual']<(I(1)/10**10).lo
    assert receipt['target']['full_residual']<(I(1)/10**9).lo
    archive=Path(receipt['archive']);assert digest(archive)==receipt['archive_sha256']
    data=np.load(archive)
    p=T.R.Paths(data['target_y'],data['target_v'],data['target_a'],1/1024)
    eps_p=(I(13)/10**9).hi;eps_v=(I(5)/10**8).hi;eps_a=(I(2)/10**7).hi
    error=[I(-eps_p,eps_p),I(-eps_v,eps_v),I(-eps_a,eps_a)]
    start,end=2274/1024,2277/1024
    vl=T.endpoint(p,0,start,1)+error[1];vr=T.endpoint(p,0,end,1)+error[1]
    acc=T.cell_range(p,0,start,end,2)+error[2]
    height=T.cell_range(p,0,start,end,0)+error[0]
    assert vl.hi<0<vr.lo and acc.lo>0
    gaps=[]
    for left,right,sign in [(259/128,start,-1),(end,9/4,1)]:
        bound=T.cell_range(p,0,left,right,1)+error[1]
        assert bound.hi<0 if sign<0 else bound.lo>0
        gaps.append({'time':[left,right],'actual_velocity_range':T.serialized(bound)})
    old_path=ROOT/'.local-data/master-equation-closure/later-certification/check/turns.json'
    old=json.loads(old_path.read_text());assert old['three_consecutive_turns']=='PASS'
    B=I(*old['turns'][1]['actual_height_range']);C=I(*old['turns'][2]['actual_height_range'])
    down=C-height;up=C-B;ratio=descent_ratio(B,C,height)
    assert down.lo>0 and ratio.hi<1
    result={'grade':'conditional interval fourth-turn certificate; requires independent acceptance of continuation, full-law residuals and propagated errors',
            'known':known_record,'residual_receipt':str(receipt_path),'residual_receipt_sha256':digest(receipt_path),
            'archive_sha256':receipt['archive_sha256'],'inherited_turn_receipt':str(old_path),'inherited_turn_receipt_sha256':digest(old_path),
            'horizon':'9/4','g':16,'c_f':1,'uniform_error_budgets':{'position':float(eps_p),'velocity':float(eps_v),'acceleration':float(eps_a)},
            'fourth_turn':{'time':[start,end],'kind':'minimum','actual_left_velocity':T.serialized(vl),'actual_right_velocity':T.serialized(vr),'actual_acceleration_range':T.serialized(acc),'actual_height_range':T.serialized(height)},
            'intervening_velocity_signs':gaps,'previous_minimum_height':T.serialized(B),'previous_maximum_height':T.serialized(C),
            'new_downward_excursion':T.serialized(down),'preceding_upward_excursion':T.serialized(up),'downward_to_preceding_upward_ratio':T.serialized(ratio),
            'new_minimum_above_previous':T.serialized(height-B),
            'four_consecutive_turns':'PASS','new_descent_smaller_than_preceding_rise':'PASS',
            'endpoint_state':{'height':T.serialized(T.endpoint(p,0,9/4,0)+error[0]),'velocity':T.serialized(T.endpoint(p,0,9/4,1)+error[1])}}
    (OUT/'turns.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','target'])
    args=parser.parse_args()
    known() if args.mode=='known' else target()
