"""Residual application using complete ordinary source-piece enclosures.
Source-zero intervals remain fail-closed and need separate event treatment.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
from types import SimpleNamespace
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('pieces',HERE/'overnight2-d-source-piece-enclosure.py');pieces=importlib.util.module_from_spec(sp);sp.loader.exec_module(pieces)
check=pieces.check;original_source=check.source_polys

def source(data,nodes,H,j,s):
    if s.bound().hi<0:return original_source(data,nodes,H,j,s)
    return pieces.enclose(data,nodes,H,j,s)

def main(args):
    pieces.controls()
    data=dict(T=np.array([0.,1.]),X=np.zeros((2,8,3)),DX=np.zeros((1,8,3)),V=np.zeros((2,8,3)),C=np.zeros((1,4,8,3)))
    data['X'][1,0,0]=1.;data['DX'][0,0,0]=1.;data['V'][:,0,0]=1.
    H=SimpleNamespace(b=dict(r=[1.]*8,w=0.,phi=[0.]*8,z=[0.]*8))
    for s,position,velocity in [(check.P(-1.),0.,0.),(check.P(.5),.5,1.)]:
        x,v=source(data,check.I(data['X']),H,0,s);xb,vb=x[0].bound(),v[0].bound()
        if not xb.lo<=position<=xb.hi or not vb.lo<=velocity<=vb.hi:raise RuntimeError('actual source dispatch control')
    print(json.dumps(dict(control='actual negative analytic and positive piece source dispatch',status='PASS')),flush=True)
    if args.mode=='controls':return
    check.source_polys=source
    check.main(args)
    path=check.OUT/(args.output+'.json');out=json.loads(path.read_text())
    out['source_piece_method']='one polynomial extension plus uniform exact differences over every intersected ordinary source piece; negative branch unchanged; source-zero bridge rejected'
    out['dependencies'].extend(dict(path=str(f.relative_to(check.ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in [Path(__file__),HERE/'overnight2-d-source-piece-enclosure.py',HERE/'overnight2-d-source-piece-enclosure.md',HERE/'overnight2-d-piece-and-step-independent-review.md'])
    path.write_text(json.dumps(out,indent=2)+'\n')
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='front-refined-t67');a.add_argument('--domain',default='front-refined-region-t67');a.add_argument('--first-cell',type=int,default=200);a.add_argument('--cells',type=int,default=1);a.add_argument('--receivers',type=int,nargs='+',default=[0]);a.add_argument('--degree',type=int,default=5);a.add_argument('--wall',type=float,default=120.);a.add_argument('--output',default='piecewise-residual-pilot');main(a.parse_args())
