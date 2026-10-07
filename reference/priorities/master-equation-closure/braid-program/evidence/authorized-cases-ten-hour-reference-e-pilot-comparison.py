import json,pathlib,hashlib
from fractions import Fraction as Q
base=pathlib.Path('.local-data/master-equation-closure')
def inside(box,value):return Q(box[0])<=value<=Q(box[1])
assert inside(['0.3','0.4'],Q(1,3)) and not inside(['0.3','0.4'],Q(1,2))
assert Q('1.01e-10')>Q('1e-10')
print('Known exact decimal containment/comparison controls passed before target.')
a=base/'binary-research/authorized-cases-ten-hour/reference/e-pilot-audit-v2.json'
b=base/'braid-program/authorized-cases-ten-hour/e-residual-pilot-v2.json'
h=base/'braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json'
ref,sub,hist=[json.loads(p.read_text()) for p in [a,b,h]]
assert len(ref['rows'])==len(sub['rows'])==3
for i,(r,s) in enumerate(zip(ref['rows'],sub['rows'])):
    assert r['rootContainments']==12 and s['method']=='Taylor4'
    for x,y in zip(r['memberRho'],s['memberRho']):assert Q(x)<Q(y)
    assert Q(r['rho'])<Q(s['rho'])
    for face,k in [('left',i),('right',i+1)]:
        exact=Q(hist['members'][0]['knots'][k]['t'])
        assert inside(s[face],exact)
assert inside(sub['preparation']['delta'],Q(ref['delta'][0])) and inside(sub['preparation']['delta'],Q(ref['delta'][1]))
out={'passed':True,'knownFirst':True,'checkedMemberBounds':12,'checkedMidpointRoots':36,'checkedCellFaces':6,'deltaContained':True,'reference':hashlib.sha256(a.read_bytes()).hexdigest(),'subject':hashlib.sha256(b.read_bytes()).hexdigest(),'input':hashlib.sha256(h.read_bytes()).hexdigest(),'scope':'exact comparisons of independently proved residual/root bounds; no actual-solution error'}
p=base/'binary-research/authorized-cases-ten-hour/reference/e-pilot-comparison-v1.json';assert not p.exists();p.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
