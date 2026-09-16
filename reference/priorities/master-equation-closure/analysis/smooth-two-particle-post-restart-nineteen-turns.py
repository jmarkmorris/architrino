"""Continuous target signs through19/4; a separate existence proof is required."""
import argparse
import importlib.util
import json
from fractions import Fraction as F
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
s=importlib.util.spec_from_file_location('frozen_signs',HERE/'smooth-two-particle-population-restart-turns.py')
M=importlib.util.module_from_spec(s);s.loader.exec_module(M)
L=M.L;I=M.I;B=M.B
OUT=ROOT/'.local-data/master-equation-closure/post-restart/nineteen-target-check'
START=F(9,2);END=F(19,4)

def known():
 t=np.arange(5121)/1024
 y=np.zeros((len(t),1,3));v=y.copy();a=y.copy()
 y[:,0,2]=t+t*t/2;v[:,0,2]=1+t;a[:,0,2]=1
 h,w,e=L.sign_enclosures({'target_y':y,'target_v':v,'target_a':a},float(START),float(END),1/16,1/32)
 exact=END+END*END/2
 assert h.lo<=exact-F(1,16) and h.hi>=exact+F(1,16)
 assert w.lo<=1+START-F(1,32) and w.lo>5
 assert e.lo<=1+END-F(1,32) and e.hi>=1+END+F(1,32)
 ratio=B.rise_ratio(I(1),I(2),I(3));assert ratio.lo<=2<=ratio.hi
 OUT.mkdir(parents=True,exist_ok=True)
 (OUT/'signs-known.json').write_text(json.dumps({'result':'PASS','source_sha256':M.digest(__file__),'controls':['exact rising quadratic on9/2..19/4 with nonzero errors','exact shared-trough ratio2']},indent=2)+'\n')
 print('KNOWN continuous signs PASS before target',flush=True)

def target(args):
 control=json.loads((OUT/'signs-known.json').read_text());assert control['result']=='PASS'
 rp=ROOT/'.local-data/master-equation-closure/post-restart/five-check/target-residual.json'
 r=json.loads(rp.read_text());assert r['time']==['9/2','5'] and r['g']==16 and r['c_f']==1
 archive=Path(r['archive']);assert M.digest(archive)==r['archive_sha256']
 budgets=[F(args.position_error),F(args.velocity_error)];assert all(x>0 for x in budgets)
 errors=[float((I(x.numerator)/x.denominator).hi) for x in budgets]
 h,w,e=L.sign_enclosures(np.load(archive),float(START),float(END),*errors)
 ip=ROOT/'.local-data/master-equation-closure/post-restart/later-check/signs.json'
 inherited=json.loads(ip.read_text());assert inherited['horizon']=='9/2' and inherited['actual_velocity_range'][0]>0
 tp=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json'
 old=json.loads(tp.read_text());assert old['four_consecutive_turns']=='PASS'
 trough=I(*old['fourth_turn']['actual_height_range']);peak=I(*old['previous_maximum_height'])
 ratio=B.rise_ratio(trough,peak,h)
 assert w.lo>0 and ratio.lo>1
 record={'grade':'conditional full-law signs; independently accepted existence and errors required','known':control,'archive_sha256':M.digest(archive),'target_residual_receipt_sha256':M.digest(rp),'inherited_sign_receipt_sha256':M.digest(ip),'fourth_turn_receipt_sha256':M.digest(tp),'g':16,'c_f':1,'horizon':str(END),'new_sign_interval':[str(START),str(END)],'position_error':errors[0],'velocity_error':errors[1],'actual_velocity_range':B.T.serialized(w),'endpoint_height':B.T.serialized(h),'endpoint_velocity':B.T.serialized(e),'rise_so_far_to_preceding_fall_ratio':B.T.serialized(ratio),'requested_next_maximum':'not reached'}
 (OUT/'signs.json').write_text(json.dumps(record,indent=2)+'\n')
 print(json.dumps(record,indent=2))

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('mode',choices=['known','target']);p.add_argument('--position-error');p.add_argument('--velocity-error')
 args=p.parse_args();known() if args.mode=='known' else target(args)
