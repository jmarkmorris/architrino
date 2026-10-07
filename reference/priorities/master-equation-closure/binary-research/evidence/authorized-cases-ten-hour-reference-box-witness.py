"""Independent rational interval audit of the fixed relaxed-box witness."""
import json, hashlib, sys
from fractions import Fraction as F
from pathlib import Path

def iv(x):
    if isinstance(x, dict): return (F(x['lo']), F(x['hi']))
    z=F(x); return z,z

def add(a,b): return a[0]+b[0],a[1]+b[1]
def neg(a): return -a[1],-a[0]
def mul(a,b):
    v=[x*y for x in a for y in b]; return min(v),max(v)
def mm(a,b):
    return [[add(mul(a[i][0],b[0][j]),mul(a[i][1],b[1][j])) for j in range(2)] for i in range(2)]
def conj(n,a):
    x,y=map(iv,n); R=[[x,neg(y)],[y,x]]; T=[[R[j][i] for j in range(2)] for i in range(2)]
    return mm(mm(R,[[iv(v) for v in row] for row in a]),T)
def enc(a): return [[[str(v) for v in z] for z in row] for row in a]
def known():
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    assert mul(iv({'lo':'-2','hi':'3'}),iv({'lo':'-4','hi':'5'}))==(-12,15)
    expected=[[4,-3],[-2,1]]
    got=conj([0,1],[[1,2],[3,4]])
    assert got==[[iv(x) for x in r] for r in expected]
    assert conj([1,0],[[1,2],[3,4]])==[[iv(x) for x in r] for r in [[1,2],[3,4]]]
    assert F('3/7')*F('1/5')==F('3/35')
    return {'passed':True,'controls':['SHA abc','signed interval product','quarter-turn exact conjugation','identity conjugation','free displacement 3/35']}

if sys.argv[1]=='known':
    print(json.dumps(known(),indent=2));sys.exit()
base=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour')
subject=base/'a/directional-box-witness-target-v1.json'
accepted=base/'a/cartesian-receiving-target-v1.json'
assert hashlib.sha256(subject.read_bytes()).hexdigest()=='772a8775c134b41a21329bb4cdea0d98464782f4728c6aeb60c2941243304202'
assert hashlib.sha256(accepted.read_bytes()).hexdigest()=='922b492c636df85a7ad24d0cd7ab1cc79e656abb06716e15341c9c7d73cdd672'
s=json.loads(subject.read_text());r=json.loads(accepted.read_text());clock=r['originalE']['physical']['clock']
assert s['rayMatrix']==clock['AX'] and s['n']==clock['n']
a=conj(clock['n'],clock['AX'])
for i in range(2):
    for j in range(2):
        z=iv(s['cartesianMatrix'][i][j]); assert z[0]<=a[i][j][0]<=a[i][j][1]<=z[1]
assert all(x[0]<=0<=x[1] for row in a for x in row)
t=r['receiving'];h=F(t['h']);v=F(t['V0']);X=F(t['trialX']);V=F(t['trialV']);w=s['witness']
assert h>0 and v>0 and F(t['X0'])>=0
assert w['matrix']==[[0,0],[0,0]] and w['forcing']==[0,0] and w['initialPosition']==[0,0]
assert list(map(F,w['initialVelocity']))==[v,F(0)]
assert F(w['wholePosition'])==h*v and F(w['wholeVelocity'])==v
assert F(w['positionSlack'])==X-h*v>0 and F(w['velocitySlack'])==V-v>0
assert s['T']==t['T'] and s['sourceP']==r['originalE']['P'] and s['sourceA']==r['originalE']['sourceA']
assert s['originalResidual']==r['transformed']['originalResidual'] and F(s['originalResidual'])>=0
assert s['zeroIncluded'] and s['admitted']
for key in ['subject','audit','provenance']:
    b=s['bindings'][key]; assert hashlib.sha256(Path(b['path']).read_bytes()).hexdigest()==b['sha']
print(json.dumps({'passed':True,'subjectSHA':hashlib.sha256(subject.read_bytes()).hexdigest(),'exactUnroundedConjugation':enc(a),'positionSlack':str(X-h*v),'velocitySlack':str(V-v),'scope':'independent-entry relaxation only; not physical Jacobian attainability'},indent=2))
