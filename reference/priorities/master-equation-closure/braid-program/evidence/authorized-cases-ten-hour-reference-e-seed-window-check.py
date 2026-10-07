"""Retrospective exact-dyadic domain guard for the accepted circle-only seed."""
import pathlib,importlib.util,hashlib,json
p=pathlib.Path(__file__).with_name('authorized-cases-ten-hour-reference-e-residual-stream-v4.py');assert hashlib.sha256(p.read_bytes()).hexdigest()=='550aae5eee6e21bf8cb9b23f2a3feed3b9fa2aebaf91d778850aef08946fd965'
s=importlib.util.spec_from_file_location('own',p);v=importlib.util.module_from_spec(s);s.loader.exec_module(v);r,I,iv,mp=v.r,v.I,v.iv,v.mp
v.centered_coverage(mp.mpf(0),mp.mpf(1),mp.mpf('.5'),mp.mpf('.5'))
try:v.centered_coverage(mp.mpf(0),mp.mpf(1),mp.mpf('.5'),mp.mpf('.49'))
except AssertionError:pass
else:raise AssertionError('known inward radius not rejected')
print('Known exact coverage and inward negative control passed before target.')
source=pathlib.Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json');assert hashlib.sha256(source.read_bytes()).hexdigest()==v.SOURCE_SHA
d=json.loads(source.read_text());times=[mp.mpf(k['t']) for k in d['members'][0]['knots'][:4]]
for le,ri in zip(times,times[1:]):
    mid=(le+ri)/2;rad=(ri-le)/2;v.centered_coverage(le,ri,mid,rad)
    assert v.rational(mid)==(v.rational(le)+v.rational(ri))/2
    assert v.rational(rad)==(v.rational(ri)-v.rational(le))/2
    assert v.rational(4*rad)==4*v.rational(rad)
# The old independent residual uses root interval + iv([-4rad,4rad]),
# so exact rad and outward interval addition prove coverage for every root.
# The old independent propagation uses interval subtraction/division for rad
# and interval addition for cap reach; it has no point Taylor radius.
out={'passed':True,'knownFirst':True,'cells':3,'receivingCentersAndRadiiExact':True,'residualSourceWindow':'outward interval root addition with exact dyadic 4rad','propagationSourceWindow':'entirely outward interval radius and cap reach','sourcePieces':'direct old circle only, no generic source-difference Taylor call','instrumentSha256':hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()};dest=v.LOCAL/'e-seed-window-check-v1.json';assert not dest.exists();dest.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
