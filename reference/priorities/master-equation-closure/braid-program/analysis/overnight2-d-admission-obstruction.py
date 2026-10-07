"""Bounded diagnosis of an existing admission source-order enclosure failure.
No evolution or actual-trajectory acceptance is performed.
"""
import argparse, hashlib, importlib.util, json, time
from pathlib import Path
from types import SimpleNamespace
import numpy as np

HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('admission',HERE/'overnight2-d-delayed-admission.py')
run=importlib.util.module_from_spec(sp);sp.loader.exec_module(run)
d,I,PI=run.d,run.I,run.PI;ROOT,OUT=run.ROOT,run.OUT

def controls():
    run.controls()
    g=dict(s=PI(1.,2.),delta=PI(.125),L=PI(.5))
    s=d.source_interval(g,.25)
    if not .374999999<s.lo<=.375 or not 2.625<=s.hi<2.625000001:raise RuntimeError('known source expansion')
    positions=np.zeros((8,3));positions[:,0]=-2*np.arange(8)
    data=dict(T=np.array([0.,10.,10.1]),X=np.tile(positions,(3,1,1)),V=np.zeros((3,8,3)),DX=np.zeros((2,8,3)),C=np.zeros((2,4,8,3)))
    hist=SimpleNamespace(T=data['T'],pol=np.ones(8),raw=lambda j,t:(positions[j],np.zeros(3),np.zeros(3)))
    h=SimpleNamespace(b=dict(r=np.zeros(8),w=0.,phi=np.zeros(8)))
    nodes=d.ad.check.region.exact_nodes(data['X'][0],data['DX'])
    g=d.geometry(data,PI(nodes.lo,nodes.hi),h,hist,1,0,1,0.)
    s=d.source_interval(g,0.)
    if not g['tb'].lo<=2<=g['tb'].hi or not s.lo<=8<8.1<=s.hi or g['delta'].hi>1e-9 or not s.hi<10:raise RuntimeError('static complete geometry control')
    print(json.dumps(dict(control='exact source expansion and static complete geometry with delay2 and source interval8..8.1',status='PASS')),flush=True)

def target(args):
    start=time.monotonic();cp=OUT/'delayed-admission-mesh-fourth-closed-prefix.json';cert=json.loads(cp.read_text());deps=run.bind(cert)
    k=cert['cells'];data=dict(np.load(OUT/(cert['tag']+'.npz')));meta=json.loads((OUT/(cert['tag']+'.json')).read_text());dom=json.loads((OUT/'mesh-region-t67.json').read_text())
    if cert['end']!=float(data['T'][k]) or k!=423:raise ValueError('unexpected failing cell input')
    H=d.ad.check.front.d.ref.load(meta['tag']);Hist=d.ad.check.front.IncrementHistory(H)
    for name in ['T','X','V','DX','C']:setattr(Hist,name,data[name])
    n=d.ad.check.region.exact_nodes(data['X'][0],data['DX']);nodes=PI(n.lo,n.hi)
    ini=json.loads((OUT/'initialization-rational.json').read_text());alpha=I.decimal(cert['arguments']['alpha']);ex,_=run.initial_bounds(ini['rows'],alpha)
    incoming=[m['error_upper']for m in cert['records'][-1]['members']];trials=[max(float((I(e)*4).hi),cert['arguments']['minimum_trial'])for e in incoming]
    paths=list(dict.fromkeys([Path(__file__),cp,*deps]));ids=[dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())for p in paths]
    left,right=map(float,data['T'][k:k+2]);rows=[]
    for i in range(8):
        for j in range(8):
            if i==j:continue
            if time.monotonic()-start>args.wall:raise TimeoutError('diagnostic wall cap')
            g=d.geometry(data,nodes,H,Hist,k,i,j,dom['reference_speed_upper'])
            prior=I(max(ex[j],float((I(trials[j])/alpha).hi)));p0=I(trials[i])/alpha+prior;s=d.source_interval(g,float(p0.hi))
            floor=(PI(dom['reference_separation_lower'])-PI(float(p0.hi)))/(1+g['L'])
            rows.append(dict(i=i,j=j,candidate_delay=g['tb'].record(),candidate_source=g['s'].record(),reference_root_shift=g['delta'].record(),position_radius=float(p0.hi),source_interval=s.record(),strictly_past=bool(s.hi<left),separation_delay_floor=floor.record(),separation_source_upper=float((PI(right)-floor).hi)))
    for r in ids:
        if hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()!=r['sha256']:raise ValueError('dependency changed')
    result=dict(grade='dependent diagnosis of frozen enclosure; no actual trajectory or repaired comparison claim',cell=k,interval=[left,right],rows=rows,wall=time.monotonic()-start,dependencies=ids)
    with (OUT/'admission-cell423-obstruction.json').open('x')as f:json.dump(result,f,indent=2);f.write('\n')
    print(json.dumps(dict(cell=k,interval=[left,right],failed=[r for r in rows if not r['strictly_past']],wall=result['wall'])),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--wall',type=float,default=180.);args=p.parse_args();controls()
    if args.mode=='target':target(args)
