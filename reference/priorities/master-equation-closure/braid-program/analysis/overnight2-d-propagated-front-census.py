"""Numerical census of reception of the reference's first acceleration jumps.
Diagnostic geometry only; no derivative-jump enclosure or evolution admission.
"""
import argparse,hashlib,importlib.util,json,time,resource
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('front',HERE/'overnight2-d-front-aligned-reference.py');front=importlib.util.module_from_spec(sp);sp.loader.exec_module(front)

def crossing(raw,i,s0,source,end):
    f=lambda t:t-s0-np.linalg.norm(raw(i,t)[0]-source)
    if f(end)<0:return None
    return float(front.d.brentq(f,s0,end,xtol=5e-14,rtol=1e-14))

def controls():
    raw=lambda i,t:(np.array([2+.5*t,0,0]),np.array([.5,0,0]),np.zeros(3))
    x=crossing(raw,0,1.,np.array([.5,0,0]),10.)
    assert abs(x-5)<1e-13
    print(json.dumps(dict(control='co-moving analytic reception of source time one at receiver time five',status='PASS')),flush=True)

def main(args):
    controls()
    if not args.target:return
    start=time.monotonic();path=front.OUT/(args.tag+'.npz');meta=front.OUT/(args.tag+'.json');data=np.load(path);m=json.loads(meta.read_text());H=front.d.ref.load(m['tag']);Q=front.IncrementHistory(H)
    for k in ['T','X','V','C','DX']:setattr(Q,k,data[k])
    rows=[]
    for n,event in enumerate(m['events']):
        j=event['i'];s0=event['t'];source=Q.raw(j,s0)[0]
        for i in range(8):
            if i==j:continue
            t=crossing(Q.raw,i,s0,source,float(Q.T[-1]))
            if t is None:rows.append(dict(parent_event=n,i=i,j=j,source_time=s0,reception=None));continue
            k=min(int(np.searchsorted(Q.T,t,side='right')-1),len(Q.T)-2)
            rows.append(dict(parent_event=n,i=i,j=j,source_time=s0,reception=t,cell=k,cell_residual=m['records'][k]['sample_residual']))
    hit={x['cell']for x in rows if x['reception']is not None};worst=sorted(enumerate(m['records']),key=lambda x:x[1]['sample_residual'],reverse=True)[:10]
    out=dict(grade='numerical propagated-front census; no certified derivative jumps or residual attribution',tag=args.tag,rows=rows,worst_cells=[dict(cell=k,contains_propagated_front=k in hit,**r)for k,r in worst],wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(front.d.ref.base.ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),HERE/'overnight2-d-front-aligned-reference.py',path,meta]])
    (front.OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['rows','dependencies']}),flush=True)
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--target',action='store_true');a.add_argument('--tag',default='front-refined-t67');a.add_argument('--output',default='propagated-front-census');main(a.parse_args())
