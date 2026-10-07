"""Additional known-first whole extension-path check; no target loading."""
from pathlib import Path
import importlib.util,hashlib,json
p=Path(__file__).with_name('authorized-cases-ten-hour-e-residual-v3.py')
assert hashlib.sha256(p.read_bytes()).hexdigest()=='1aea647e4f61c9cc9636e54119c581f6a013352930c1569e6d905ae5661cbee0'
s=importlib.util.spec_from_file_location('e_extension_known',p);r=importlib.util.module_from_spec(s);s.loader.exec_module(r)
I,J,iv,mp=r.I,r.J,r.iv,r.mp;j=r.j
class Square:
    times=[mp.mpf(0),mp.mpf(1)];delta=I(1)
    points=[[I(1),I(0),I(0)],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
    def region(self,S):return ('circle',0)
    def state(self,i,T,region=None):return ([J(x,T.n) for x in self.points[i]],[J(0,T.n)]*3,[J(0,T.n)]*3)
    def point(self,i,t):return self.state(i,J(I(t),0))
    def root(self,i,k,T):return I(T)-j.norm(j.sub(self.points[i],self.points[k]))
res=r.ExtensionResidual(Square());res.cell(0,mp.mpf('.25'),mp.mpf('.251'))
exact=1/iv.sqrt(2)-I(1)/4
assert res.maxrho>=j.lower(exact) and res.maxrho<mp.mpf('.458')
assert all(mp.mpf(x)==0 for x in res.rows[0]['extensionCorrection'])
print(json.dumps({'passed':True,'case':'all12 static-square hits through extension root and full residual path','exactResidual':j.bound(exact),'enclosedUpper':j.upstr(res.maxrho),'extensionCorrections':res.rows[0]['extensionCorrection']},indent=2))
