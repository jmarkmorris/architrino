"""Exact-rational Cartesian comparison-curve differences, no solution premise.

Uses an unchanged independently authored Hermite reference. Both curves are
restricted to each exact common closed cell before subtraction. No field,
root, actual-history or event criterion is evaluated here.
"""
import argparse,bisect,hashlib,importlib.util,json
from fractions import Fraction as Q
from math import comb,isqrt
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-exact-hermite-check.py')
s=importlib.util.spec_from_file_location('frozen_hermite',p);poly=importlib.util.module_from_spec(s);s.loader.exec_module(poly)

def diff(c,n,h):
    for _ in range(n):c=[Q(j+1)*c[j+1]/h for j in range(len(c)-1)]
    return c

def restrict(c,a,w):
    return [w**j*sum((c[k]*comb(k,j)*a**(k-j) for k in range(j,len(c))),Q(0)) for j in range(len(c))]

def bernstein(c):
    n=len(c)-1
    return [sum((c[j]*Q(comb(k,j),comb(n,j)) for j in range(k+1)),Q(0)) for k in range(n+1)]

def upper_norm(box):
    v=sum(max(abs(a),abs(b))**2 for a,b in box);scale=10**40
    n=isqrt(v.numerator*scale*scale//v.denominator)
    return Q(n if Q(n*n,scale*scale)==v else n+1,scale)

class Curve:
    def __init__(self,knots):
        self.knots=knots;self.times=[Q(z['t']) for z in knots];assert self.times[0]==0 and all(a<b for a,b in zip(self.times,self.times[1:]));self.cache={}
    def segment(self,t):
        t=Q(t);assert self.times[0]<=t<=self.times[-1]
        j=min(len(self.knots)-2,max(0,bisect.bisect_right(self.times,t)-1))
        if j not in self.cache:self.cache[j]=[poly.polynomial(self.knots[j],self.knots[j+1],k) for k in range(2)]
        return self.times[j],self.cache[j]
    def restricted(self,left,right,n):
        origin,parts=self.segment((left+right)/2);assert origin<=left and right<=self.times[min(len(self.times)-1,bisect.bisect_right(self.times,(left+right)/2))]
        return [restrict(diff(c,n,h),(left-origin)/h,(right-left)/h) for h,c in parts]

def difference(a,b,left,right,n):
    A=a.restricted(left,right,n);B=b.restricted(left,right,n);out=[]
    for x,y in zip(A,B):
        assert len(x)==len(y)
        values=bernstein([u-v for u,v in zip(x,y)]);out.append((min(values),max(values)))
    return out

def evaluate(a,b,guard,checkpoint):
    lo,hi=map(Q,guard);tc=Q(checkpoint);assert 0<=lo<=hi<=tc<=min(a.times[-1],b.times[-1])
    faces=sorted(set([lo,hi]+[t for t in a.times+b.times if lo<t<hi]));rows=[];maxima=[Q(0)]*3
    cells=list(zip(faces,faces[1:])) if lo<hi else [(lo,hi)]
    for left,right in cells:
        boxes=[difference(a,b,left,right,n) for n in range(3)];norms=list(map(upper_norm,boxes));maxima=[max(x,y) for x,y in zip(maxima,norms)]
        rows.append(dict(left=str(left),right=str(right),componentBoxes=[[[str(x),str(y)] for x,y in box] for box in boxes],normUpper=list(map(str,norms))))
    point=[difference(a,b,tc,tc,n) for n in range(3)]
    return dict(guard=list(map(str,[lo,hi])),checkpoint=str(tc),guardXVAupper=list(map(str,maxima)),checkpointXVAupper=list(map(str,map(upper_norm,point))),checkpointComponentBoxes=[[[str(x),str(y)] for x,y in box] for box in point],closedCells=rows)

def known():
    prior=poly.known()
    def knot(t,shift=Q(0)):
        t=Q(t);return dict(t=str(t),x=[t**5+shift*t*t,-2*t**3],v=[5*t**4+2*shift*t,-6*t*t],a=[20*t**3+2*shift,-12*t])
    a=Curve([knot(t) for t in [0,Q('1/3'),1,2]])
    b=Curve([knot(t) for t in [0,Q('1/5'),Q('7/6'),2]])
    zero=evaluate(a,b,('1/3','7/6'),'3/2');assert zero['guardXVAupper']==zero['checkpointXVAupper']==['0']*3
    c=Curve([knot(t,Q(-3)) for t in [0,Q('1/7'),1,2]])
    out=evaluate(a,c,(Q('1/3'),Q('4/3')),Q('3/2'))
    for actual,expected in zip(map(Q,out['guardXVAupper']),[Q('16/3'),Q(8),Q(6)]):assert expected<=actual<=expected+Q(1,10**39)
    for actual,expected in zip(map(Q,out['checkpointXVAupper']),[Q('27/4'),Q(9),Q(6)]):assert expected<=actual<=expected+Q(1,10**39)
    assert upper_norm([(Q(3),Q(3)),(Q(-4),Q(-4))])==5
    assert bernstein([Q(1),Q(-2),Q(1)])==[Q(1),Q(0),Q(0)]
    assert restrict([Q(0),Q(0),Q(1)],Q('1/3'),Q('2/3'))==list(map(Q,['1/9','4/9','4/9']))
    return dict(passed=True,prior=prior,cases=['identical rational quintic with different non-grid clocks gives exact zero all X/V/A','signed quadratic difference guard16/3,8,6 and point27/4,9,6','exact affine power restriction','known quadratic Bernstein basis','both closed seam endpoint coverage'])

def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def analyze(a_path,b_path):
    a=json.loads(Path(a_path).read_text());b=json.loads(Path(b_path).read_text())
    for z in [a,b]:assert z['specification']['K']==z['specification']['cf']==1 and z['specification']['beta']==.3 and 'E+M' not in z['specification']['equation']
    for key in ['r','omega','delta','beta','K','cf','speedBound','da','launch']:assert a['specification'][key]==b['specification'][key]
    return dict(inputA=a_path,inputASHA=sha(a_path),inputB=b_path,inputBSHA=sha(b_path),**evaluate(Curve(a['knots']),Curve(b['knots']),('58.95','59.35'),'59.5'),grade='derived exact-rational continuum difference bounds between retained analytical comparison curves; no physical-solution or event claim',scope='shared Cartesian launch frame; complete selected closed guard and exact checkpoint; same literal complete numerical analytical past')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--a');p.add_argument('--b');p.add_argument('--output',required=True);args=p.parse_args();out=dict(knownFirst=known())
    if args.a:assert args.b;out['target']=analyze(args.a,args.b)
    with Path(args.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps({**out,'target':{k:v for k,v in out.get('target',{}).items() if k!='closedCells'}}))
