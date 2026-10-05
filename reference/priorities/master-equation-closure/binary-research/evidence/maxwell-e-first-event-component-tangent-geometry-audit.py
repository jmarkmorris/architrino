"""Separate whole-cell nominal tangential projection audit, no subject imports.
Exact Bernstein comparison geometry and monotone unit-direction corners.
Independently frozen source geometry retains its own mathematical authority.
"""
import argparse,importlib.util,json,hashlib,time
from pathlib import Path
from fractions import Fraction as Q
from math import isqrt
p=Path(__file__).with_name('maxwell-e-first-event-independent-source-geometry.py');s=importlib.util.spec_from_file_location('independent_geometry_frozen',p);sg=importlib.util.module_from_spec(s);s.loader.exec_module(sg)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def sqrt_box(q):
    q=Q(q);assert q>0;sc=10**40;n=q.numerator*sc*sc;d=q.denominator;k=isqrt(n//d);return Q(k,sc),Q(k+(k*k*d<n),sc)
def ratio(x,y):
    x,y=Q(x),Q(y)
    if x==0:return Q(0),Q(0)
    if y==0:return (Q(1),Q(1)) if x>0 else (Q(-1),Q(-1))
    lo,hi=sqrt_box(x*x+y*y);return (x/hi,x/lo) if x>0 else (x/lo,x/hi)
def direction(X):
    out=[]
    for k,a in enumerate(X):
        b=X[1-k];blo=Q(0) if b[0]<=0<=b[1] else min(abs(z) for z in b);bhi=max(abs(z) for z in b)
        lo=ratio(a[0],bhi if a[0]>=0 else blo)[0];hi=ratio(a[1],blo if a[1]>=0 else bhi)[1]
        out.append((max(Q(-1),lo),min(Q(1),hi)))
    return out

def tangent(X,V):
    n=direction(X);a=sg.subtract(sg.mul(n[0],V[1]),sg.mul(n[1],V[0]));return max(abs(z) for z in a)
def known():
    assert ratio(3,4)==(Q(3,5),Q(3,5));assert direction([(-3,-3),(4,4)])==[(Q(-3,5),Q(-3,5)),(Q(4,5),Q(4,5))]
    assert tangent([(3,3),(0,0)],[(100,100),(3,3)])==3
    assert direction([(-1,1),(2,2)])[0][0]<0<direction([(-1,1),(2,2)])[0][1]
    def knot(t):t=Q(t);return dict(t=t,x=[3,t*t],v=[0,2*t],a=[0,2])
    c=sg.SourceCurve([knot(t) for t in [0,Q(1,3),1]],dict(r=3,omega=0,delta=Q(1,4)));assert tangent(c.box(0,Q(1,2),0),c.box(0,Q(1,2),1))==1
    return dict(passed=True,prior=sg.known(),cases=['exact3-4-5positive/negative direction','radial velocity100 leaves static tangential3','crossingzero direction signs','whole closed nongrid quadratic tangent1'])
def analyze(path):
    z=json.loads(Path(path).read_text());assert z['knownFirst']['passed'] and sha(z['input'])==z['inputSHA'];data=json.loads(Path(z['input']).read_text());c=sg.SourceCurve(data['knots'],data['specification']);rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(rows)==z['bins'];left=Q(0);checked=0;started=time.monotonic();last=started
    for row in rows:
        right=Q(row['t']);assert right>left
        if 'componentAngular' in row:
            X,V=c.box(left,right,0),c.box(left,right,1);assert sg.radius_lower(X)>0;bound=tangent(X,V);stored=Q(row['componentAngular']['tangentBound']);assert stored>=bound,dict(left=str(left),right=str(right),stored=str(stored),independent=str(bound));checked+=1
        left=right
        if time.monotonic()-last>=30:print(json.dumps(dict(event='independent-component-tangent-heartbeat',checked=checked,t=float(right))),flush=True);last=time.monotonic()
    assert checked==len(rows)-json.loads(Path(z['prefix']).read_text())['bins'];return dict(passed=True,subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),cells=len(rows),checked=checked,end=str(left),wallSeconds=time.monotonic()-started,scope='independent exact whole closed nominal Bernstein X/V, monotone normalized-direction corners, tangential velocity projection; conditional physical recurrence/domain separately required')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
