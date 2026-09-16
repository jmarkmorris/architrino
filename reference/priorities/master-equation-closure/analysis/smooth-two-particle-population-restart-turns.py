"""Continuous common-height signs after a complete-population restart.

This instrument consumes full-law residual receipts and supplied, independently
derived error allowances. It does not itself prove existence or error growth.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
from pathlib import Path

import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
OUT=ROOT/'.local-data/master-equation-closure/population-restart/check'
SPEC=importlib.util.spec_from_file_location('frozen_later_signs',HERE/'smooth-two-particle-next-maximum-later-certificate.py')
L=importlib.util.module_from_spec(SPEC);SPEC.loader.exec_module(L)
B=L.B;I=B.I


def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def known():
    t=np.arange(3841)/1024
    y=np.zeros((len(t),1,3));v=y.copy();a=y.copy()
    y[:,0,2]=t+t*t/2;v[:,0,2]=1+t;a[:,0,2]=1
    height,velocity,endpoint=L.sign_enclosures({'target_y':y,'target_v':v,'target_a':a},13/4,15/4,1/16,1/32)
    exact=F(15,4)+F(15,4)**2/2
    assert height.lo<=exact-F(1,16) and height.hi>=exact+F(1,16)
    assert velocity.lo<=F(17,4)-F(1,32) and velocity.lo>4
    assert endpoint.lo<=F(19,4)-F(1,32) and endpoint.hi>=F(19,4)+F(1,32)
    ratio=B.rise_ratio(I(1),I(2),I(3));assert ratio.lo<=2<=ratio.hi
    OUT.mkdir(parents=True,exist_ok=True)
    record={'result':'PASS','source_sha256':digest(__file__),'controls':['exact rising quadratic on the requested restart interval through the entire frozen helper','nonzero position and velocity errors','exact shared-trough ratio two']}
    (OUT/'signs-known.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record),flush=True)


def signs(args):
    checked=json.loads((OUT/'signs-known.json').read_text());assert checked['result']=='PASS'
    path=OUT/'target-residual.json';receipt=json.loads(path.read_text())
    assert receipt['time']==['13/4','15/4'] and receipt['g']==16 and receipt['c_f']==1
    archive=Path(receipt['target_archive']);assert digest(archive)==receipt['target_archive_sha256']
    population_path=OUT/'population-residual.json'
    assert digest(population_path)==receipt['population_receipt_sha256']
    budgets=[F(args.position_error),F(args.velocity_error)];assert all(x>0 for x in budgets)
    errors=[float((I(x.numerator)/x.denominator).hi) for x in budgets]
    height,velocity,endpoint=L.sign_enclosures(np.load(archive),13/4,15/4,*errors)
    inherited_path=ROOT/'.local-data/master-equation-closure/next-maximum/later-check/signs.json'
    inherited=json.loads(inherited_path.read_text());assert inherited['horizon']=='13/4' and inherited['actual_velocity_range'][0]>0
    old_path=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json'
    old=json.loads(old_path.read_text());assert old['four_consecutive_turns']=='PASS'
    trough=I(*old['fourth_turn']['actual_height_range']);peak=I(*old['previous_maximum_height'])
    ratio=B.rise_ratio(trough,peak,height)
    assert velocity.lo>0 and (height-peak).lo>0 and ratio.lo>1
    record={'grade':'conditional full-law rising continuation; requires independently accepted existence and error propagation',
            'known':checked,'target_residual_receipt_sha256':digest(path),'population_receipt_sha256':digest(population_path),
            'archive_sha256':digest(archive),'inherited_sign_receipt_sha256':digest(inherited_path),'fourth_turn_receipt_sha256':digest(old_path),
            'g':16,'c_f':1,'horizon':'15/4','new_sign_interval':['13/4','15/4'],
            'position_error':errors[0],'velocity_error':errors[1],'actual_velocity_range':B.T.serialized(velocity),
            'endpoint_height':B.T.serialized(height),'endpoint_velocity':B.T.serialized(endpoint),
            'rise_so_far':B.T.serialized(height-trough),'rise_so_far_to_preceding_fall_ratio':B.T.serialized(ratio),
            'additional_turn':'excluded through15/4 using inherited and new continuous signs','requested_next_maximum':'not yet reached'}
    (OUT/'signs.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode',choices=['known','signs'])
    parser.add_argument('--output-dir',default=str(OUT))
    parser.add_argument('--position-error')
    parser.add_argument('--velocity-error')
    args=parser.parse_args();OUT=Path(args.output_dir)
    known() if args.mode=='known' else signs(args)
