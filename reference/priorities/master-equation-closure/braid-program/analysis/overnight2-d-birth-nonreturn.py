"""Exact-rational endpoint margins consuming an independently accepted prefix.
No evolution is run; later existence, ordinary factors and uniqueness stay open.
"""
import argparse, hashlib, json, math, sys
from fractions import Fraction as F
from pathlib import Path
import numpy as np

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def fraction(x):
    x=float(x)
    if not math.isfinite(x):raise ValueError('nonfinite input')
    return F.from_float(x)

def lower(x):
    y=float(x)
    if not math.isfinite(y):raise ValueError('nonfinite lower proposal')
    if F.from_float(y)>x:y=float(np.nextafter(y,-np.inf))
    if F.from_float(y)>x:raise ValueError('lower conversion failed')
    return y

def sqrt_upper(x):
    if x<0:raise ValueError('negative squared distance')
    y=math.sqrt(float(x))
    if not math.isfinite(y):raise ValueError('nonfinite root proposal')
    for _ in range(16):
        if F.from_float(y)**2>=x:return F.from_float(y)
        y=float(np.nextafter(y,np.inf))
    raise ValueError('root proposal not verified')

def margin(t,delta,receiver_error,source_error):
    if min(receiver_error,source_error)<0:raise ValueError('negative position allowance')
    distance=sqrt_upper(sum((x*x for x in delta),F(0)))
    return t-distance-receiver_error-source_error

def positive_floor(rows):
    if not rows or min(rows)<=0:raise ValueError('positive birth margin not established')
    value=min(rows)
    result=lower(value),lower(value/2)
    if min(result)<=0:raise ValueError('positive representable floor not established')
    return result

def controls():
    if sys.flags.optimize:raise RuntimeError('ordinary Python required')
    m=margin(F(6),list(map(F,[3,4,0])),F(1,4),F(1,8))
    if m!=F(5,8) or positive_floor([m])!=(.625,.3125):raise RuntimeError('exact 3-4-5 margin')
    if sum(map(fraction,[.5,.25]),F(0))!=F(3,4):raise RuntimeError('exact increment control')
    for x in [F(2),F(25)+F(1,2**50)]:
        u=sqrt_upper(x)
        if u*u<x or u*u-x>F(1,10**12):raise RuntimeError('verified square-root proposal')
    for x in [F(1,3),F(-1,7)]:
        if F.from_float(lower(x))>x:raise RuntimeError('lower rounding control')
    for action in [lambda:margin(F(1),[F(0)]*3,F(-1),F(0)),lambda:positive_floor([F(0)])]:
        try:action()
        except ValueError:pass
        else:raise RuntimeError('invalid margin accepted')
    # Exact sharp unit-speed source: t-s=1+s at t=2 gives s=1/2.
    s=(F(2)-1)/2
    if s!=F(1,2) or F(2)-s!=1+s:raise RuntimeError('sharp source-time control')
    print(json.dumps(dict(control='exact endpoint margin, rational root and lower rounding, invalid allowance and nonpositive rejection, sharp source-time floor',status='PASS')),flush=True)

def target(args):
    certpath=OUT/(args.admission+'.json');cert=json.loads(certpath.read_text())
    subject_hash=hashlib.sha256(Path(__file__).read_bytes()).hexdigest();cert_hash=hashlib.sha256(certpath.read_bytes()).hexdigest()
    if cert['tag']!='mesh-reference-t67' or cert['arguments']['tag']!=cert['tag']:raise ValueError('unexpected reference')
    deps=[]
    for r in cert['dependencies']:
        p=ROOT/r['path']
        if hashlib.sha256(p.read_bytes()).hexdigest()!=r['sha256']:raise ValueError('admission dependency mismatch '+r['path'])
        deps.append(p)
    refpath=OUT/(cert['tag']+'.npz');inipath=OUT/'initialization-rational.json'
    if refpath not in deps or inipath not in deps:raise ValueError('missing reference or initialization binding')
    data=dict(np.load(refpath));ini=json.loads(inipath.read_text());k=cert['cells'];alpha=F(cert['arguments']['alpha'])
    if type(k)is not int or not 0<k<len(data['T']) or alpha<=0:raise ValueError('invalid endpoint or weight')
    if cert['end']!=float(data['T'][k]) or len(cert['records'])!=k:raise ValueError('endpoint mismatch')
    members=cert['records'][-1]['members']
    if len(members)!=8 or [m['i']for m in members]!=list(range(8)) or cert['records'][-1]['t']!=cert['end']:raise ValueError('member endpoint inventory')
    initial=sorted(ini['rows'],key=lambda r:r['j'])
    if len(initial)!=8 or [r['j']for r in initial]!=list(range(8)):raise ValueError('initial source inventory')
    literal=ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json'
    oldmeta=ROOT/'.local-data/master-equation-closure/overnight-d/b1-s1-h4800-refinement-endpoint.json'
    if literal not in deps or oldmeta not in deps:raise ValueError('missing original preparation binding')
    old=json.loads(oldmeta.read_text())
    if old['balance']!=1 or old['seed']!=1 or old['input_sha256']!=hashlib.sha256(literal.read_bytes()).hexdigest():raise ValueError('original preparation mismatch')
    ex=[fraction(m['error_upper'])/alpha for m in members];e0=[fraction(r['position_error_upper'])for r in initial]
    starts=[[fraction(x)for x in data['X'][0,j]]for j in range(8)]
    ends=[[starts[j][c]+sum((fraction(x)for x in data['DX'][:k,j,c]),F(0))for c in range(3)]for j in range(8)]
    t=fraction(cert['end']);rows=[];margins=[]
    for i in range(8):
        for j in range(8):
            if i==j:continue
            m=margin(t,[ends[i][c]-starts[j][c]for c in range(3)],ex[i],e0[j]);margins.append(m)
            rows.append(dict(i=i,j=j,margin_lower=lower(m),source_time_lower=lower(m/2)))
    gamma,source=positive_floor(margins)
    identities=[dict(path=str(Path(__file__).relative_to(ROOT)),sha256=subject_hash),dict(path=str(certpath.relative_to(ROOT)),sha256=cert_hash),*cert['dependencies']]
    for row in identities:
        if hashlib.sha256((ROOT/row['path']).read_bytes()).hexdigest()!=row['sha256']:raise ValueError('dependency changed during endpoint evaluation')
    output=OUT/(args.output+'.json')
    if output.exists():raise ValueError('output exists')
    out=dict(grade='endpoint birth-margin application awaiting independent review; later continuation remains conditional',admission=args.admission,end=cert['end'],rows=rows,margin_lower=gamma,source_time_lower=source,dependencies=identities)
    output.write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps({k:v for k,v in out.items()if k not in ['rows','dependencies']}),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--admission',default='delayed-admission-mesh-first400');p.add_argument('--output',default='birth-nonreturn-mesh-first400');a=p.parse_args();controls()
    if a.mode=='target':target(a)
