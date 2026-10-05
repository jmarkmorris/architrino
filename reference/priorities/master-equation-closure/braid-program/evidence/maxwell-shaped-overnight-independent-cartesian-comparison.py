"""Endpoint comparison for separately frozen Cartesian histories; known norm first.
This is a method comparison, not a continuum trajectory certificate.
"""
import argparse,json,math
from pathlib import Path
import numpy as np

def difference(a,b):
    a,b=np.asarray(a,float),np.asarray(b,float)
    assert a.shape==b.shape==(4,3)
    return float(np.max(np.linalg.norm(a-b,axis=1)))

def known():
    a=np.tile([1.,0,0],(4,1));b=np.tile([0.,1,0],(4,1));assert abs(difference(a,b)-math.sqrt(2))<1e-15
    return dict(passed=True,case='four known Euclidean vector differences sqrt2')

def targets():
    own=Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent');subject=Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight');records=[]
    for law in ['E','full']:
        sub=json.loads((subject/f'short-{law}-stride1.json').read_text());state=sub['final']['state'];sx=[p['x'] for p in state];sv=[p['v'] for p in state];sa=[p['a'] for p in state]
        runs=[json.loads((own/f'cartesian-{law}-offset-v2-h{h}.json').read_text())['target'] for h in ['002','001']]
        endpoints=[x['records'][-1] for x in runs]
        records.append(dict(law=law,subject_time=sub['final']['t'],reference_times=[p['t'] for p in endpoints],subject_comparisons=[dict(x=difference(p['x'],sx),v=difference(p['v'],sv),a=difference(p['a'],sa)) for p in endpoints],reference_refinement={key:difference(endpoints[0][key],endpoints[1][key]) for key in ['x','v','a']},reference_defects=[r['max_equation_defect_sampled'] for r in runs],reference_seams=[dict(x=r['max_position_seam'],v=r['max_velocity_seam'],a=r['max_acceleration_seam']) for r in runs],reference_final=dict(separation_min=endpoints[-1]['separation_min'],max_speed=max(endpoints[-1]['speed']),D_min=endpoints[-1]['D_min'],center=np.mean(endpoints[-1]['x'],axis=0).tolist(),max_normal=float(np.max(np.abs(np.array(endpoints[-1]['x'])[:,2])))),input_delta_difference=[r['case']['delta']-sub['specification']['delta'] for r in runs],input_da_max_difference=[difference(r['case']['da'],sub['specification']['da']) for r in runs],grade='measured independent method comparison; no continuous error tube or nonlinear fate'))
    return records

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args();result=dict(known=known())
    if a.target:result['targets']=targets()
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
