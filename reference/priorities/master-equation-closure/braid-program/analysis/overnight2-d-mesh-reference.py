"""Reference refinement with suggested breakpoints from a frozen front census.
Breakpoints are numerical mesh proposals, never exact events or a changed law.
The original reference producer evaluates every residual against original history.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('front',HERE/'overnight2-d-front-aligned-reference.py');front=importlib.util.module_from_spec(sp);sp.loader.exec_module(front)
OriginalDOP853=front.d.DOP853

def bounded_factory(mesh):
    mesh=np.asarray(mesh,dtype=float)
    if mesh.ndim!=1 or np.any(~np.isfinite(mesh)) or np.any(np.diff(mesh)<=0):raise ValueError('mesh must be strictly increasing and finite')
    def factory(fun,t0,y0,t_bound,**kwargs):
        k=int(np.searchsorted(mesh,t0,side='right'))
        end=min(t_bound,float(mesh[k]))if k<len(mesh)else t_bound
        if 'first_step'in kwargs:kwargs['first_step']=min(kwargs['first_step'],end-t0)
        return OriginalDOP853(fun,t0,y0,end,**kwargs)
    return factory

def controls():
    factory=bounded_factory([1.,2.]);t=0.;y=np.array([0.])
    for expected in [1.,2.]:
        s=factory(lambda t,y:np.ones(1),t,y,3.,first_step=2.,max_step=2.,rtol=1e-10,atol=1e-12)
        if s.t_bound!=expected:raise RuntimeError('mesh bound control failed')
        while s.status=='running':s.step()
        if abs(s.y[0]-expected)>1e-13:raise RuntimeError('constant derivative control failed')
        t,y=s.t,s.y
    print(json.dumps(dict(control='actual bounded DOP853 constructor and exact constant derivative across proposed mesh',status='PASS')),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    census=front.OUT/(args.mesh+'.json');c=json.loads(census.read_text());base=front.OUT/(c['tag']+'.json');b=json.loads(base.read_text())
    if not any(x['path'].endswith(c['tag']+'.json')and x['sha256']==hashlib.sha256(base.read_bytes()).hexdigest()for x in c['dependencies']):raise ValueError('census source identity mismatch')
    # Avoid numerical near-duplicates of the separately aligned primary fronts.
    primary=np.array([e['t']for e in b['events']]);mesh=sorted({r['reception']for r in c['rows']if r['reception']is not None and 0<r['reception']<args.end and np.min(abs(primary-r['reception']))>1e-7})
    front.d.DOP853=bounded_factory(mesh)
    front.main(args)
    outpath=front.OUT/(args.output+'.json');out=json.loads(outpath.read_text())
    out['suggested_mesh']=dict(census=args.mesh,points=len(mesh),exclusion_radius=1e-7,meaning='fixed numerical breakpoints from earlier reference, not exact current fronts')
    out['dependencies'].extend(dict(path=str(f.relative_to(front.d.ref.base.ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),census,base])
    outpath.write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps(dict(suggested_mesh_points=len(mesh),output=args.output)),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--mesh',default='propagated-front-census');p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--end',type=float,default=67.);p.add_argument('--rtol',type=float,default=3e-14);p.add_argument('--atol',type=float,default=3e-16);p.add_argument('--max-step',type=float,default=.1);p.add_argument('--wall',type=float,default=900.);p.add_argument('--output',default='mesh-reference-t67');main(p.parse_args())
