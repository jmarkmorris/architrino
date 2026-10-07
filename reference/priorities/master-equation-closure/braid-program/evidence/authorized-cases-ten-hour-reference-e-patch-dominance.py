"""Independent exact preparation minimum-branch assertion."""
import pathlib,importlib.util,hashlib,json
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-seam-audit-v2.py');assert hashlib.sha256(p.read_bytes()).hexdigest()=='6246594bd91333aef876b535c9b39bc0f697c1bc8873f62429679e805e1af305'
s=importlib.util.spec_from_file_location('own',p);v=importlib.util.module_from_spec(s);s.loader.exec_module(v);r,I,iv,mp=v.r,v.I,v.iv,v.mp
# Known exact Euclidean norm and strict minimum selection before target.
a=r.normi([I(3),I(4),I(0)]);assert r.lo(a)<=5<=r.hi(a);assert r.hi(I(1)/2)<r.lo(I(2)/3)
print('Known exact norm and strict minimum branch controls passed before target.',flush=True)
source=pathlib.Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json');assert hashlib.sha256(source.read_bytes()).hexdigest()=='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193'
t=v.Trial(json.loads(source.read_text()));amax=I(max(r.hi(r.normi(d)) for d in t.da));radius=I('2.559210616145');beta=I('.429117161835');dmin=iv.sqrt(2)*radius-2*I('.0001')*radius*iv.sqrt(I('3.18'));other=[(1-beta)/(12*amax),iv.sqrt(dmin/(16*amax))]
assert r.hi(amax)<mp.mpf('.001');assert r.hi(t.delta)<mp.mpf('.34');assert all(r.lo(q)>15 for q in other);assert all(r.hi(t.delta)<r.lo(q) for q in other)
out={'passed':True,'knownFirst':True,'instrumentSha256':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest(),'amaxUpper':r.out(amax),'delta':[r.out(t.delta,False),r.out(t.delta)],'otherClauseLower':[r.out(q,False) for q in other],'dminLower':r.out(dmin,False),'conclusion':'exact authorized minimum is delay minimum divided by eight'};dest=v.L/'e-patch-dominance-v1.json';assert not dest.exists();dest.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
