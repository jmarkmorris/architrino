"""Continuous target signs; actual meaning requires the separate continuation proof."""
import argparse,importlib.util,json
from fractions import Fraction as F
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]
s=importlib.util.spec_from_file_location('frozen_signs',HERE/'smooth-two-particle-population-restart-turns.py');M=importlib.util.module_from_spec(s);s.loader.exec_module(M)
L=M.L;I=M.I;B=M.B;OUT=ROOT/'.local-data/master-equation-closure/post-restart/later-check'
def known():
 t=np.arange(4609)/1024;y=np.zeros((len(t),1,3));v=y.copy();a=y.copy();y[:,0,2]=t+t*t/2;v[:,0,2]=1+t;a[:,0,2]=1
 h,w,e=L.sign_enclosures({'target_y':y,'target_v':v,'target_a':a},33/8,9/2,1/16,1/32)
 exact=F(9,2)+F(9,2)**2/2
 assert h.lo<=exact-F(1,16) and h.hi>=exact+F(1,16)
 assert w.lo<=F(41,8)-F(1,32) and w.lo>4
 assert e.lo<=F(11,2)-F(1,32) and e.hi>=F(11,2)+F(1,32)
 r=B.rise_ratio(I(1),I(2),I(3));assert r.lo<=2<=r.hi
 OUT.mkdir(parents=True,exist_ok=True);(OUT/'signs-known.json').write_text(json.dumps({'result':'PASS','source_sha256':M.digest(__file__),'controls':['exact rising quadratic on33/8..9/2 with nonzero errors','exact shared-trough ratio2']},indent=2)+'\n');print('KNOWN continuous signs PASS before target')
def target(a):
 known=json.loads((OUT/'signs-known.json').read_text());assert known['result']=='PASS'
 rp=OUT/'target-residual.json';r=json.loads(rp.read_text());assert r['time']==['33/8','9/2'] and r['g']==16 and r['c_f']==1
 archive=Path(r['archive']);assert M.digest(archive)==r['archive_sha256']
 budgets=[F(a.position_error),F(a.velocity_error)];assert all(x>0 for x in budgets)
 errors=[float((I(x.numerator)/x.denominator).hi) for x in budgets]
 h,w,e=L.sign_enclosures(np.load(archive),33/8,9/2,*errors)
 ip=ROOT/'.local-data/master-equation-closure/post-restart/check/signs.json';inherited=json.loads(ip.read_text());assert inherited['horizon']=='33/8' and inherited['actual_velocity_range'][0]>0
 tp=ROOT/'.local-data/master-equation-closure/next-minimum/check/turns.json';old=json.loads(tp.read_text());assert old['four_consecutive_turns']=='PASS'
 trough=I(*old['fourth_turn']['actual_height_range']);peak=I(*old['previous_maximum_height']);ratio=B.rise_ratio(trough,peak,h)
 assert w.lo>0 and ratio.lo>1
 record={'grade':'conditional full-law signs; independently accepted existence and errors required','known':known,'archive_sha256':M.digest(archive),'target_residual_receipt_sha256':M.digest(rp),'inherited_sign_receipt_sha256':M.digest(ip),'fourth_turn_receipt_sha256':M.digest(tp),'g':16,'c_f':1,'horizon':'9/2','new_sign_interval':['33/8','9/2'],'position_error':errors[0],'velocity_error':errors[1],'actual_velocity_range':B.T.serialized(w),'endpoint_height':B.T.serialized(h),'endpoint_velocity':B.T.serialized(e),'rise_so_far_to_preceding_fall_ratio':B.T.serialized(ratio),'requested_next_maximum':'not reached'}
 (OUT/'signs.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record,indent=2))
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['known','target']);p.add_argument('--position-error');p.add_argument('--velocity-error');a=p.parse_args();known() if a.mode=='known' else target(a)
