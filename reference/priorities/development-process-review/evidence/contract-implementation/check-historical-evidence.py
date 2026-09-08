"""Read-only metadata validation; no historical module executes or numerical replay."""
from contextlib import ExitStack
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import time

ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
BASE=ROOT/'reference/priorities/development-process-review/evidence/source-recovery'

def load(name,file):
    spec=importlib.util.spec_from_file_location(name,ROOT/file)
    module=importlib.util.module_from_spec(spec);sys.modules[name]=module;spec.loader.exec_module(module);return module

def bind(file):
    raw=file.read_bytes();return dict(path=str(file),sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))

# Known hash control precedes real target reads. Functional contract controls
# and the independently constructed 198-source chain ran before this target.
assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
v=load('historical_readonly_verifier','scripts/eom/verify-f6c-parent-emission-refinement.py')
w=load('historical_readonly_transport',v.DEPENDENCIES['transport'][0])
d=load('historical_readonly_decoder',v.DEPENDENCIES['scientificDecoder'][0])
r=load('historical_readonly_reference',v.DEPENDENCIES['independentRootReference'][0])
rows=json.loads((BASE/'historical-source-archive.json').read_text())['sources']
routes=[dict(original=dict(path=x['original'],sha256=x['sha256'],bytes=x['bytes']),physical=bind(BASE/x['file'])) for x in rows]
entry=bind(BASE/'original-full-entry.mjs.source')
assert sum(x['original']['path']==str(ROOT/v.ORIGINAL['fullEntry'][0]) for x in routes)==1
missing=[dict(path=p,sha256=h,bytes=n) for p,(h,n) in v.HISTORICAL_HOSTS.items()]
began=time.monotonic()
def live():
    if time.monotonic()-began>90:raise TimeoutError('bounded metadata inspection')
with ExitStack() as stack:
    pool=v.Pool(stack,w,ROOT,live);pool.routes=v.historical_routes(routes,ROOT,w);pool.unavailable=v.validate_environment(missing,ROOT,w)
    originals={}
    for role,(p,h,*size) in v.ORIGINAL.items():
        n=size[0] if size else (entry['bytes'] if role=='fullEntry' else (ROOT/p).stat().st_size)
        originals[role]=dict(path=str(ROOT/p),sha256=h,bytes=n)
    files={k:pool.historical_file(b,data=True) for k,b in originals.items()}
    docs={k:v.decode_role(w,d,files[k].data,k) for k in ('export','reconstruction','guards','fullPlan','fullManifest','fullComparison','fullAdmission')}
    for k in ('fullLauncherLog','fullResourceLog'):docs[k]=files[k].data
    owner=bind(ROOT/v.OWNER);owner_raw=pool.read_binding(owner,data=True)
    result=v.authenticate_full(w,r,docs,originals,files['fullEntry'].data,owner_raw,pool)
    pool.recheck()
    report=dict(instrument='current independent parent historical reader; metadata only',knownCases='archive contract controls and synthetic full-chain controls passed before target',
        historicalSourceCount=len(result),physicalSourceCount=len(pool.files),historicalEvidenceVerification=v.historical_evidence(missing),
        archiveRoutes=routes,sourceBindings=pool.bindings(),reader=bind(ROOT/v.SELF),owner=owner,elapsedSeconds=time.monotonic()-began)
    (OUT/'historical-evidence-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ('historicalSourceCount','physicalSourceCount','historicalEvidenceVerification','elapsedSeconds')},indent=2))
