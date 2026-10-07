"""Additional independent closed-form controls for the geometry wrapper."""
from pathlib import Path
import importlib.util,hashlib,json
from datetime import datetime,timezone
P=Path(__file__).with_name('authorized-cases-ten-hour-e-propagation-geometry.py')
assert hashlib.sha256(P.read_bytes()).hexdigest()=='bd12fbb0a60d7b6ca2d264f46570be9b8ce7cd7912c0e8f8bc194e5f05155c5c'
s=importlib.util.spec_from_file_location('geometry_control',P);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
I,J,iv,mp=g.I,g.J,g.iv,g.mp
class StaticSquare:
    times=[mp.mpf(0),mp.mpf(4)];delta=I(1)
    points=[[I(1),I(0),I(0)],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
    def region(self,S):return ('poly',0) if g.lower(S)>=0 else ('circle',0)
    def state(self,i,T,region):return [[J(x,T.n) for x in self.points[i]],[J(0,T.n)]*3,[J(0,T.n)]*3]
trial=StaticSquare();T=iv.mpf(['3','3.001']);mid=I('3.0005')
roots=[{str(j):g.bound(mid-g.norm(g.p.vs(trial.points[i],g.p.neg(trial.points[j])))) for j in range(4) if j!=i} for i in range(4)]
error={'position':I(0),'velocity':I(0),'acceleration':I('1e-6')}
records=[{'left':mp.mpf(0),'right':mp.mpf(3),'errors':[error.copy() for i in range(4)]}]
rows,margins=g.geometry(trial,0,T,roots,I('1e-4'),I('1e-4'),records,mp.mpf(3))
# The exact acceleration-only source coefficient sum is
# 2/sqrt(2)+1/2 for a static unit square at zero current velocity.
expected=(iv.sqrt(2)+I(1)/2)*I('1e-6')
for row in rows:
    assert g.upper(row['sourceForcing'])>=g.lower(expected)
    assert g.upper(row['sourceForcing'])<mp.mpf('3e-6')
    assert len(row['sources'])==3
# The exact static signed position Jacobian for receiver (1,0,0).
a=I(1)/(2*iv.sqrt(2));expected_diag=[a-I(1)/4,a+I(1)/8,I(1)/8-I(1)/iv.sqrt(2)]
for i in range(3):
    for j in range(3):
        want=expected_diag[i] if i==j else I(0);got=rows[0]['Jx'][i][j]
        assert g.lower(got)<=g.lower(want) and g.upper(got)>=g.upper(want)
report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'geometrySha256':hashlib.sha256(P.read_bytes()).hexdigest(),
        'cases':['all12 generated-source static-square tubes','independent exact source-acceleration coefficient sum','exact signed current-position matrix with separate source discrepancy domain'],
        'scope':'known analytical geometry controls; no retained target evaluated'}
out=P.with_name('authorized-cases-ten-hour-e-propagation-geometry-controls.json');out.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
