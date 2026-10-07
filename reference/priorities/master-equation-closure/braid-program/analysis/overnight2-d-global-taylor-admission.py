"""Reuse the bound domain's complete positive-reference acceleration in Taylor geometry.
The frozen core and screened Taylor composition retain every admission gate.
"""
import argparse,hashlib,importlib.util,json,math
from pathlib import Path
from types import SimpleNamespace
from fractions import Fraction as F
import numpy as np
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('screened_taylor',HERE/'overnight2-d-screened-taylor-admission.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
run=base.run;taylor=base.base.taylor
old_positions=taylor.source_positions;old_bind=run.bind;old_controls=run.controls;old_matrix=run.d.matrix_region
context=dict(expected=None,expected_path=None,expected_sha=None,ready=False,active=False,limits=None,end=None)

def check_capture(payload,path,sha):
    rows=[r for r in payload['dependencies']if r['path']==path]
    if len(rows)!=1 or rows[0]['sha256']!=sha:raise RuntimeError('captured domain identity differs from activated global Taylor snapshot')

def guarded_dumps(payload,*args,**kwargs):
    if context['expected']is not None and isinstance(payload,dict)and(payload.get('kind')=='inputs'or all(k in payload for k in ['records','arguments','dependencies','cells'])):
        if not context['active']:raise RuntimeError('global Taylor domain was not activated')
        check_capture(payload,context['expected_path'],context['expected_sha'])
    return json.dumps(payload,*args,**kwargs)

def limits_from_domain(dom):
    values=dom['reference_acceleration_upper'];end=dom['end']
    if dom.get('increment_defined')is not True or not isinstance(values,list)or len(values)!=8:raise ValueError('complete acceleration inventory')
    if any(type(x)not in (int,float)or not math.isfinite(x)or x<0 for x in values):raise ValueError('invalid complete acceleration bound')
    if type(end)not in (int,float)or not math.isfinite(end)or end<=0:raise ValueError('invalid complete acceleration endpoint')
    return tuple(values),end

def bounded_positions(d,data,nodes,H,j,s,limits,end):
    I,P,front=d.PI,d.P,d.ad.fronts;sb=s.bound()
    if not 0<sb.lo<=sb.hi<=end or end!=float(data['T'][-1]):raise ValueError('global Taylor positive source domain')
    center=float((float(sb.lo)+float(sb.hi))/2)
    if not sb.lo<=center<=sb.hi:raise ValueError('global Taylor center')
    x,v,_,_=front.source_boxes(data,front.I(nodes.lo,nodes.hi),H,j,front.I(center))
    M=I(limits[j]);q=s-P(center);radius=d.p.magnitude(q.bound());error=M*radius*radius/2
    out=[]
    for c in range(3):
        z=P(I(x.lo[c],x.hi[c]))+P(I(v.lo[c],v.hi[c]))*q
        out.append(P(z.c,z.e+I(float(error.hi))))
    return out,dict(source_center=center,source_acceleration_upper=float(M.hi),source_taylor_error_upper=float(error.hi),source_acceleration_scope='complete-positive-reference')

def positions(d,data,nodes,H,j,s):
    if context['active']and s.bound().lo>0:
        return bounded_positions(d,data,nodes,H,j,s,context['limits'],context['end'])
    return old_positions(d,data,nodes,H,j,s)

def bind(receipt,alternates=None):
    pending=context['ready']and context['expected']is not None and not context['active']
    if pending and receipt!=context['expected']:raise ValueError('consumed domain differs from global Taylor snapshot')
    limits,end=limits_from_domain(receipt)if pending else(None,None)
    paths=old_bind(receipt,alternates)
    if pending:context.update(active=True,limits=limits,end=end)
    return paths+[Path(__file__).resolve()]

def matrix_region(data,nodes,H,g,sep,P,Z):
    B,C,m=old_matrix(data,nodes,H,g,sep,P,Z)
    if g['geometry_method']=='taylor':m['taylor_source_acceleration_scope']=g.get('source_acceleration_scope','local-source-interval')
    return B,C,m

def controls():
    if context['active']:raise RuntimeError('controls require inactive scientific context')
    context['ready']=False
    old_controls();d=run.d;I,P=d.PI,d.P
    T=np.array([0.,1.,2.]);X=np.zeros((3,8,3));X[:,1,0]=T*T/8;V=np.zeros_like(X);V[:,1,0]=T/4
    data=dict(T=T,X=X,V=V,DX=np.diff(X,axis=0),C=np.zeros((2,4,8,3)))
    H=SimpleNamespace(b=dict(r=np.zeros(8),w=0.,phi=np.zeros(8)),pol=np.ones(8));n=d.check.region.exact_nodes(X[0],data['DX']);nodes=I(n.lo,n.hi)
    s=P(1.)+P.variable()/4;xs,m=bounded_positions(d,data,nodes,H,1,s,[.25]*8,2.)
    if not .0078125<=m['source_taylor_error_upper']<.007812501:raise RuntimeError('known global quadratic remainder')
    for q in [-1.,0.,1.]:
        exact=(F(1)+F.from_float(q)/4)**2/8;box=xs[0].value(q)
        if not F.from_float(float(box.lo))<=exact<=F.from_float(float(box.hi)):raise RuntimeError('known global quadratic position')
    for bad,end in [(P.variable()/4,2.),(P(3.),2.),(s,3.)]:
        try:bounded_positions(d,data,nodes,H,1,bad,[.25]*8,end)
        except ValueError:pass
        else:raise RuntimeError('invalid global source domain accepted')
    for bad in [dict(increment_defined=True,end=2.,reference_acceleration_upper=[.25]*7),dict(increment_defined=True,end=2.,reference_acceleration_upper=[float('nan')]*8)]:
        try:limits_from_domain(bad)
        except ValueError:pass
        else:raise RuntimeError('invalid global acceleration inventory accepted')
    if bind(dict(dependencies=[]))[-1]!=Path(__file__).resolve():raise RuntimeError('global source binding')
    known=dict(dependencies=[dict(path='known-domain',sha256='known-bytes')])
    check_capture(known,'known-domain','known-bytes')
    for bad in [dict(dependencies=[]),dict(dependencies=[dict(path='known-domain',sha256='changed')]),dict(dependencies=known['dependencies']*2)]:
        try:check_capture(bad,'known-domain','known-bytes')
        except RuntimeError:pass
        else:raise RuntimeError('altered domain capture accepted')
    print(json.dumps(dict(control='complete-bound quadratic Taylor remainder across knot, source-domain and bound-inventory rejection, new source binding',status='PASS')),flush=True)
    context['ready']=True

def main(args):
    if args.mode=='target':
        path=run.OUT/(args.domain+'.json');raw=path.read_bytes()
        context.update(expected=json.loads(raw),expected_path=str(path.relative_to(run.ROOT)),expected_sha=hashlib.sha256(raw).hexdigest(),ready=False,active=False,limits=None,end=None)
    try:run.main(args)
    finally:context.update(expected=None,expected_path=None,expected_sha=None,ready=False,active=False,limits=None,end=None)

taylor.source_positions=positions;run.bind=bind;run.controls=controls;run.d.matrix_region=matrix_region
run.json=SimpleNamespace(loads=json.loads,dumps=guarded_dumps)

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='global-taylor-admission-pilot');main(a.parse_args())
