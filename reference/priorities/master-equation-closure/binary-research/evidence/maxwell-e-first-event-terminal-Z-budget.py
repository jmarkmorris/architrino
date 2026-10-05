"""Independent exact nominal Hermite derivative and fixed positive-Z budget audit.
No source/root/actual-solution claim. Terminal theorem assessed separately.
"""
import argparse,bisect,hashlib,json
from fractions import Fraction as Q
from math import isqrt
from pathlib import Path

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def derivative(a,b,t):
    l,r=Q(a['t']),Q(b['t']);h=r-l;t=Q(t);assert l<=t<=r and h>0;s=(t-l)/h;out=[]
    for j in range(len(a['x'])):
        x0,x1,v0,v1,a0,a1=map(Q,[a['x'][j],b['x'][j],a['v'][j],b['v'][j],a['a'][j],b['a'][j]])
        c0,c1,c2=x0,h*v0,h*h*a0/2;D=x1-c0-c1-c2;V=h*v1-c1-2*c2;A=h*h*a1-2*c2;c3=10*D-4*V+A/2;c4=-15*D+7*V-A;c5=6*D-3*V+A/2
        out.append((c1+2*c2*s+3*c3*s*s+4*c4*s**3+5*c5*s**4)/h)
    return out

def norm_upper(v):
    q=sum(x*x for x in v);scale=10**30;k=isqrt(q.numerator*scale*scale//q.denominator)
    if k*k*q.denominator<q.numerator*scale*scale:k+=1
    return Q(k,scale)

def prefix_monotone(spec,rows):
    z,nu=Q(spec['initialZ']),Q(spec['initialNu']);t=Q(0)
    for a in rows:
        n=Q(a['nu']);end=Q(a['t']);assert end>t and n>0;metric=z*max(Q(1),n/nu);assert Q(a['previousZ'])==metric and Q(a['Z'])>=metric and Q(a['u'])>=Q(a['Z'])
        assert Q(a['mu'])>=0 and Q(a['coefficients']['Ch'])>=0 and Q(a['coefficients']['Lh'])>=0 and Q(a['Fr']['forcing'])>=0 and Q(a['Ft']['forcing'])>=0
        z,nu,t=Q(a['Z']),n,end
    return z,t

def known():
    a=dict(t=0,x=[1,0],v=[1,0],a=[2,0]);b=dict(t=1,x=[3,0],v=[3,0],a=[2,0]);assert derivative(a,b,Q('1/4'))==[Q('3/2'),Q(0)] and derivative(a,b,1)==[Q(3),Q(0)]
    assert norm_upper(list(map(Q,[3,4])))==5 and norm_upper([Q(0),Q(0)])==0
    sp=dict(initialZ=1,initialNu=1);row=dict(t=1,nu=2,previousZ=2,Z=2,u=2,mu=0,coefficients=dict(Ch=0,Lh=0),Fr=dict(forcing=0),Ft=dict(forcing=0));assert prefix_monotone(sp,[row])==(Q(2),Q(1))
    try:prefix_monotone(sp,[dict(row,Z=1)])
    except AssertionError:pass
    else:raise AssertionError('metric-lowered Z accepted')
    return dict(passed=True,cases=['independent exact physical quadratic Hermite derivative at interior/endpoint','exact3-4-5 norm andzero','rational positiveZ metric prefix and loweredstate rejection'])

def analyze(specpath,tf):
    spec=json.loads(Path(specpath).read_text());assert spec['law']=='E' and spec['K']==spec['cf']==1 and spec['oldCapsPolicy']=='none; original complete comparison from release';assert sha(spec['input'])==spec['inputSHA']
    data=json.loads(Path(spec['input']).read_text());knots=data['knots'];times=[Q(a['t']) for a in knots];tf=Q(tf);j=bisect.bisect_left(times,tf);assert 0<j<len(knots);v=derivative(knots[j-1],knots[j],tf);upper=norm_upper(v);required=upper-1
    rowpath=specpath.removesuffix('.specification.json')+'.jsonl';raw=Path(rowpath).read_bytes();assert raw.endswith(b'\n');rows=list(map(json.loads,raw.splitlines()));z,t=prefix_monotone(spec,rows)
    first=next((dict(cell=i+1,time=a['t'],Z=a['Z']) for i,a in enumerate(rows) if Q(a['Z'])>=required),None)
    return dict(methodTerminalCriterionExcluded=first is not None,terminal=str(tf),nominalVelocity=list(map(str,v)),nominalSpeedUpper=str(upper),requiredZLessThan=str(required),firstCrossing=first,rows=len(rows),lastCompleted=str(t),lastZ=str(z),specificationSHA=sha(specpath),readRowsSHA=hashlib.sha256(raw).hexdigest(),scope='fixed positive-Z recurrence cannot later certify speed-minus-full-error>1 at declared terminal after crossing; no actual error lower bound or physical fate',falsifier='changed recurrence/test/state reset; invalid nominal interpolation or positivity obligations; complete recurrence/domain audits remain separate')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--spec');p.add_argument('--terminal',default='59.57');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.spec:r['target']=analyze(a.spec,a.terminal)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
