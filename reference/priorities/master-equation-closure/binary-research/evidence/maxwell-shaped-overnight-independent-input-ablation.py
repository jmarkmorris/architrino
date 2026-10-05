"""Identical-history row ablation, distinct from selected-law coupled futures.
Potential-derived E/G/curl reference and all-source roots remain unchanged.
"""
import argparse,bisect,importlib.util,json
from pathlib import Path
import numpy as np
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-first-event.py');s=importlib.util.spec_from_file_location('first_event',p);ev=importlib.util.module_from_spec(s);s.loader.exec_module(ev);module=ev.module

def rows(x,u,g):
    d=module.response.response_at_root(x,u,g)
    return dict(canonical=-g['n']/(g['R']**2*g['D']),amplitude_gradient=-d['G'],E=-d['E'],full=-d['full'])

def known():
    g=dict(R=2.,n=np.array([1.,0,0]),v=np.zeros(3),a=np.zeros(3),D=1.)
    r=rows(np.array([2.,0,0]),np.array([.2,.3,0]),g)
    for value in r.values():assert np.linalg.norm(value-np.array([-.25,0,0]))<1e-14
    g['a']=np.array([0.,.06,0.]);u=np.array([.2,.3,0]);r=rows(np.array([2.,0,0]),u,g)
    assert np.linalg.norm(r['E']-[-.25,.03,0])<1e-14
    assert abs(np.dot(u,r['E']-r['full']))<1e-14
    assert np.linalg.norm(r['full']-r['E'])>0
    q=dict(t0=0.,t1=1.,coefficients=[[1.,0,0],[0,2.,0],[.5,0,0]])
    x,v,a=ev.jets(q,.5);assert np.linalg.norm(x-[1.125,1,0])<1e-14 and np.linalg.norm(v-[.5,2,0])<1e-14 and np.linalg.norm(a-[1,0,0])<1e-14
    return dict(passed=True,cases=['stationary allfourrows agree inverse-square','transverse accelerated E=(-.25,.03,0), distinct M with identical speed derivative','quadratic retained history X/V/A jets'])

def analyze(path,times):
    h=json.loads(Path(path).read_text());segments=h['segments'];ends=[s['t1'] for s in segments];past,case=module.prepare(h['specification']['beta'],h['specification']['law'])
    class History:
        def at(self,t):
            if t<=0:return past(t)
            k=bisect.bisect_left(ends,t);assert k<len(segments);return ev.jets(segments[k],t)
    history=History();out=[]
    for t in times:
        x,u,a=history.at(t);g=module.coupled_hit(history,x,u,t,.9999,1e-10);r=rows(x,u,g);n=x/np.linalg.norm(x);tangent=np.array([-n[1],n[0],0])
        out.append(dict(t=t,complete_history_law=case['law'],radius=float(np.linalg.norm(x)),receiver_velocity=u,emission=g['S'],source_acceleration=g['a'],D=g['D'],partner_roots=1,self_roots=0,rows={name:dict(acceleration=val,speed_squared_derivative=2*np.dot(u,val),radial=np.dot(n,val),tangential=np.dot(tangent,val)) for name,val in r.items()},identical_input_E_full_rate_gap=2*np.dot(u,r['E']-r['full'])))
    return dict(complete_specification=case,inputs=out,scope='same retained complete history, receiver state and all roots for eachfourrow comparison; no canonical/amplitude-gradient coupled future or proof-domain transfer')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--history');p.add_argument('--times',default='0,35');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known())
    if a.history:r['target']=analyze(a.history,list(map(float,a.times.split(','))))
    Path(a.output).write_text(json.dumps(module.response.jsonable(r),indent=2)+'\n');print(json.dumps(module.response.jsonable(r)))
