"""Positive delayed-error comparison screen on reconstructed reference.
Sampled coefficients/forcing only; no interval enclosure or event remainder proof.
"""
import argparse,hashlib,importlib.util,json,resource,time
from pathlib import Path
import numpy as np
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('ref',HERE/'overnight2-d-quintic-reference.py')
ref=importlib.util.module_from_spec(spec);spec.loader.exec_module(ref)
geo=ref.signed.geo;OUT=ref.OUT

def advance(E,mu,f,dt):
    x=mu*dt;phi=np.ones_like(x);nz=abs(x)>1e-12
    phi[nz]=np.expm1(x[nz])/x[nz]
    phi[~nz]=1+x[~nz]/2+x[~nz]*x[~nz]/6
    return np.exp(x)*E+dt*phi*f

def dense_history(H,data):
    ds=importlib.util.spec_from_file_location('front',HERE/'overnight2-d-front-aligned-reference.py');front=importlib.util.module_from_spec(ds);ds.loader.exec_module(front)
    Q=front.IncrementHistory(H) if 'DX'in data else front.d.DenseHistory(H)
    Q.T=data['T'];Q.C=data['C'];Q.X=data['X'];Q.V=data['V']
    if 'DX'in data:Q.DX=data['DX']
    Q.row=lambda t,x,i,j:front.d.row(Q.raw,t,x,i,j,Q.pol,float(Q.T[-1]))
    return Q

def controls():
    geo.controls()
    for mu in [-2.,0.,2.]:
        got=advance(np.array([3.]),np.array([mu]),np.array([5.]),.7)[0]
        exact=3+3.5 if mu==0 else np.exp(.7*mu)*3+5*np.expm1(.7*mu)/mu
        assert abs(got-exact)<1e-13
    print(json.dumps(dict(control='exact supplied scalar comparison with negative, zero and positive growth',status='PASS')),flush=True)
    from types import SimpleNamespace
    h=2.**-20;X=np.full((2,8,3),2.**30);V=np.full((2,8,3),.1);DX=np.full((1,8,3),h*.1)
    H=SimpleNamespace(T=np.array([0.]),X=X[:1],V=V[:1],pol=np.ones(8))
    Q=dense_history(H,dict(T=np.array([0.,h]),X=X,V=V,C=np.zeros((1,4,8,3)),DX=DX))
    _,v,a=Q.raw(0,h/2)
    assert np.max(abs(v-.1))<1e-15 and np.max(abs(a))<1e-9
    print(json.dumps(dict(control='actual increment loader preserves tiny constant-velocity displacement',status='PASS')),flush=True)

def main(args):
    controls()
    if args.mode=='controls':return
    p=OUT/(args.tag+'.npz');m=OUT/(args.tag+'.json');data=np.load(p);meta=json.loads(m.read_text());H=ref.load(meta['tag'])
    if args.reference_kind=='quintic':
        grid=data['grid'];Q=ref.Quintic(H,grid,data['da0'],data['da1']);assert meta['integral_covers_all_cells']
        residuals=[r['new_max']for r in meta['records']]
    else:
        grid=data['T'];Q=dense_history(H,data)
        residuals=[r['sample_residual']for r in meta['records']]
    assert len(meta['records'])==len(grid)-1
    alphas=np.array(args.alpha);assert np.all(alphas>0)
    E=np.full((len(alphas),8),2e-12);saved=[E.copy()];records=[];first=[None]*len(alphas);start=time.monotonic();last=start
    for k,(left,right) in enumerate(zip(grid[:-1],grid[1:])):
        t=(left+right)/2;dt=right-left;Bs=np.zeros((8,3,3));forcing=np.zeros_like(E);mu=np.zeros_like(E)
        for i in range(8):
            x,v,a=Q.raw(i,t);ref.speed_guard(np.linalg.norm(v))
            for j in range(8):
                if i==j:continue
                _,z=Q.row(t,x,i,j);xs,vs,acc=Q.raw(j,z['s']);n=(x-xs)/z['tau']
                B,C=geo.matrices(z['tau'],n,vs,vs,acc,Q.pol[i]*Q.pol[j]);Bs[i]+=B
                if z['s']<=0:
                    forcing[:,i]+=np.linalg.norm(B,2)*4e-12
                else:
                    assert z['s']<left
                    n0=np.searchsorted(grid[:k+1],z['s'],side='right')-1
                    u=(z['s']-grid[n0])/(grid[n0+1]-grid[n0]);past=(1-u)*saved[n0][:,j]+u*saved[n0+1][:,j]
                    for nalpha,alpha in enumerate(alphas):forcing[nalpha,i]+=np.linalg.norm(np.column_stack((-B/alpha,C)),2)*past[nalpha]
            for nalpha,alpha in enumerate(alphas):
                M=np.block([[np.zeros((3,3)),alpha*np.eye(3)],[Bs[i]/alpha,np.zeros((3,3))]])
                mu[nalpha,i]=np.linalg.eigvalsh((M+M.T)/2)[-1]
        # Common maximum over receivers and 3 Gauss points, still only sampled.
        forcing+=residuals[k]
        E=advance(E,mu,forcing,dt);saved.append(E.copy())
        rec=dict(t=float(right),max_E=np.max(E,axis=1).tolist(),max_position=(np.max(E,axis=1)/alphas).tolist(),max_mu=np.max(mu,axis=1).tolist(),sample_residual=residuals[k])
        records.append(rec)
        for n in range(len(alphas)):
            if first[n] is None and max(E[n])>.001:first[n]=float(right)
        if time.monotonic()-last>15:
            print(json.dumps(dict(progress=k+1,total=len(grid)-1,wall=time.monotonic()-start,last=rec)),flush=True);last=time.monotonic()
        if time.monotonic()-start>args.wall:raise TimeoutError('wall cap')
        if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>512*1024**2:raise MemoryError('512 MiB RSS cap')
        if np.min(np.max(E,axis=1))>args.stop:break
    deps=[Path(__file__),HERE/'overnight2-d-quintic-reference.py',HERE/'overnight-d-finite-geometry-screen.py',p,m]
    if args.reference_kind=='dense':deps.extend([HERE/'overnight2-d-dense-reference.py',HERE/'overnight2-d-front-aligned-reference.py'])
    out=dict(grade='sampled delayed norm comparison; no validated error; source-kick mismatch omitted',reference_kind=args.reference_kind,alpha=alphas.tolist(),first_velocity_threshold=first,final=records[-1],records=records,wall=time.monotonic()-start,peak_rss_bytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,dependencies=[dict(path=str(f.relative_to(ref.base.ROOT)),sha256=hashlib.sha256(f.read_bytes()).hexdigest())for f in deps])
    (OUT/(args.output+'.json')).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['records','dependencies']}),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='quintic-repaired-t67');p.add_argument('--reference-kind',choices=['quintic','dense'],default='quintic');p.add_argument('--alpha',type=float,nargs='+',default=[.1,.2,.3]);p.add_argument('--wall',type=float,default=400.);p.add_argument('--stop',type=float,default=.1);p.add_argument('--output',default='quintic-positive-comparison');main(p.parse_args())
