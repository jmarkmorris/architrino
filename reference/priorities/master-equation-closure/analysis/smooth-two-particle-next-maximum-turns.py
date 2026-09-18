"""Continuous fifth-turn and completed-rise enclosures with supplied error budgets."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import itertools
import json
from pathlib import Path

import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/next-maximum/check'
spec=importlib.util.spec_from_file_location('accepted_turn_primitives',HERE/'smooth-two-particle-later-turns.py')
T=importlib.util.module_from_spec(spec);spec.loader.exec_module(T)
I=T.I


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def rise_ratio(B,C,E):
    """Shared trough B, previous peak C, new peak E; no amplitude order assumed.

    Each coordinate separately is linear fractional with positive denominator.
    Its extrema on the box therefore occur among the eight corners.
    """
    assert C.lo>B.hi and E.lo>B.hi
    ratios=[(I(e)-I(b))/(I(c)-I(b)) for b,c,e in itertools.product([B.lo,B.hi],[C.lo,C.hi],[E.lo,E.hi])]
    return I(min(q.lo for q in ratios),max(q.hi for q in ratios))


def known():
    t=np.arange(9)/4
    y=np.zeros((9,1,3));v=y.copy();a=y.copy()
    y[:,0,2]=2-(t-1)**2;v[:,0,2]=-2*(t-1);a[:,0,2]=-2
    p=T.R.Paths(y,v,a,1/4)
    assert T.endpoint(p,0,.75,1).lo>0>T.endpoint(p,0,1.25,1).hi
    assert T.cell_range(p,0,.75,1.25,2).hi<0
    z=T.cell_range(p,0,.75,1.25,0);assert z.lo<=31/16 and z.hi>=2
    for b,c,e,answer in [(1,3,2,F(1,2)),(1,2,3,F(2))]:
        r=rise_ratio(I(b),I(c),I(e));assert F.from_float(float(r.lo))<=answer<=F.from_float(float(r.hi))
    # Exact broad range covering both amplitude-order branches.
    r=rise_ratio(I(0,1),I(3,4),I(2,5))
    assert r.lo<=F(1,3) and r.hi>=F(2)
    # A strictly increasing bridge: z=t+t^2/2, z'=1+t.
    y[:,0,2]=t+t*t/2;v[:,0,2]=1+t;a[:,0,2]=1
    bridge_path=T.R.Paths(y,v,a,1/4)
    assert T.cell_range(bridge_path,0,0,2,1).lo>0
    assert (T.endpoint(bridge_path,0,2,0)-I(1)).lo>0
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),'controls':['exact quadratic maximum','half-size and double-size shared-trough ratios','ratio interval crossing both amplitude orders','strictly increasing quadratic bridge above known height']}
    (OUT/'turns-known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def target(args):
    checked=json.loads((OUT/'turns-known.json').read_text());assert checked['result']=='PASS'
    path=OUT/'both-residual.json';receipt=json.loads(path.read_text())
    archive=Path(receipt['archive']);assert digest(archive)==receipt['archive_sha256']
    data=np.load(archive);H=F(receipt['horizon'])
    p=T.R.Paths(data['target_y'],data['target_v'],data['target_a'],1/1024)
    budgets=[F(args.position_error),F(args.velocity_error),F(args.acceleration_error)]
    assert all(e>0 for e in budgets)
    eps=[(I(e.numerator)/e.denominator).hi for e in budgets];error=[I(-e,e) for e in eps]
    start,end=F(args.left),F(args.right)
    assert F(9,4)<start<end<H and start*1024==int(start*1024) and end*1024==int(end*1024)
    vl=T.endpoint(p,0,float(start),1)+error[1];vr=T.endpoint(p,0,float(end),1)+error[1]
    acc=T.cell_range(p,0,float(start),float(end),2)+error[2]
    height=T.cell_range(p,0,float(start),float(end),0)+error[0]
    assert vl.lo>0>vr.hi and acc.hi<0
    gaps=[]
    for left,right,sign in [(F(9,4),start,1),(end,H,-1)]:
        bound=T.cell_range(p,0,float(left),float(right),1)+error[1]
        assert bound.lo>0 if sign>0 else bound.hi<0
        gaps.append({'time':[str(left),str(right)],'actual_velocity_range':T.serialized(bound)})
    old_path=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json'
    old=json.loads(old_path.read_text());assert old['four_consecutive_turns']=='PASS'
    assert old['archive_sha256']==json.loads((ROOT/'.local-data/master-equation-closure/next-minimum/check/both-residual.json').read_text())['archive_sha256']
    B=I(*old['fourth_turn']['actual_height_range']);C=I(*old['previous_maximum_height'])
    up=height-B;down=C-B;ratio=rise_ratio(B,C,height);difference=height-C
    verdict='larger' if difference.lo>0 else 'smaller' if difference.hi<0 else 'undecided'
    result={'grade':'conditional fifth-turn certificate; requires accepted full-law continuation, residuals and error propagation',
            'known':checked,'residual_receipt':str(path),'residual_receipt_sha256':digest(path),'archive_sha256':receipt['archive_sha256'],
            'inherited_turn_receipt':str(old_path),'inherited_turn_receipt_sha256':digest(old_path),'horizon':str(H),'g':16,'c_f':1,
            'uniform_error_budgets':dict(zip(['position','velocity','acceleration'],map(float,eps))),
            'fifth_turn':{'time':[str(start),str(end)],'kind':'maximum','actual_left_velocity':T.serialized(vl),'actual_right_velocity':T.serialized(vr),'actual_acceleration_range':T.serialized(acc),'actual_height_range':T.serialized(height)},
            'intervening_velocity_signs':gaps,'previous_minimum_height':T.serialized(B),'previous_maximum_height':T.serialized(C),
            'new_upward_excursion':T.serialized(up),'preceding_downward_excursion':T.serialized(down),'upward_to_preceding_downward_ratio':T.serialized(ratio),
            'new_maximum_minus_previous':T.serialized(difference),'new_excursion':verdict,'five_consecutive_turns':'PASS',
            'endpoint_state':{'height':T.serialized(T.endpoint(p,0,float(H),0)+error[0]),'velocity':T.serialized(T.endpoint(p,0,float(H),1)+error[1])}}
    (OUT/'turns.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


def bridge(args):
    checked=json.loads((OUT/'turns-known.json').read_text());assert checked['result']=='PASS'
    receipt_path=Path(args.receipt);receipt=json.loads(receipt_path.read_text())
    archive=Path(receipt['archive']);assert digest(archive)==receipt['archive_sha256']
    data=np.load(archive);H=F(receipt['horizon'])
    p=T.R.Paths(data['target_y'],data['target_v'],data['target_a'],1/1024)
    budgets=[F(args.position_error),F(args.velocity_error)]
    eps=[(I(e.numerator)/e.denominator).hi for e in budgets]
    height=T.endpoint(p,0,float(H),0)+I(-eps[0],eps[0])
    velocity=T.cell_range(p,0,9/4,float(H),1)+I(-eps[1],eps[1])
    assert velocity.lo>0
    previous_path=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json'
    previous=json.loads(previous_path.read_text())
    B=I(*previous['fourth_turn']['actual_height_range']);C=I(*previous['previous_maximum_height'])
    difference=height-C;ratio=rise_ratio(B,C,height)
    assert difference.lo>0 and ratio.lo>1
    result={'grade':'conditional actual rising bridge; requires accepted continuation and error allowances',
            'known':checked,'residual_receipt':str(receipt_path),'residual_receipt_sha256':digest(receipt_path),
            'archive_sha256':receipt['archive_sha256'],'inherited_turn_receipt_sha256':digest(previous_path),
            'horizon':str(H),'g':16,'c_f':1,'position_error':float(eps[0]),'velocity_error':float(eps[1]),
            'actual_velocity_range':T.serialized(velocity),'endpoint_height':T.serialized(height),
            'endpoint_height_minus_previous_maximum':T.serialized(difference),
            'rise_so_far':T.serialized(height-B),'rise_so_far_to_preceding_fall_ratio':T.serialized(ratio),
            'additional_turn':'excluded through this horizon','requested_next_maximum':'not yet reached'}
    (OUT/'bridge-signs.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','target','bridge'])
    for option in ['left','right','position-error','velocity-error','acceleration-error']:parser.add_argument('--'+option)
    parser.add_argument('--receipt')
    parser.add_argument('--output-dir',default=str(OUT))
    args=parser.parse_args()
    OUT=Path(args.output_dir)
    known() if args.mode=='known' else bridge(args) if args.mode=='bridge' else target(args)
