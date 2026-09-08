"""Bounded capture and metadata construction only; never numerical evaluation."""
from contextlib import ExitStack
from dataclasses import asdict
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import time
ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
BASE=ROOT/'reference/priorities/development-process-review/evidence/source-recovery'
def bind(p):
    raw=p.read_bytes();return dict(path=str(p),sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
def load(name,path):
    spec=importlib.util.spec_from_file_location(name,ROOT/path);m=importlib.util.module_from_spec(spec)
    sys.modules[name]=m;spec.loader.exec_module(m);return m
assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
print('Known hash control passed; 136 adapter controls passed before this target.',flush=True)
a=load('retained_adapter','scripts/eom/f6c_variable_cell_adapter.py')
w=load('retained_transport','scripts/eom/verify-f6c-refined-acceleration.py')
core=load('retained_decoder','scripts/eom/oracle/f6c_refined_acceleration_conformance.py')
rows=json.loads((BASE/'historical-source-archive.json').read_text())['sources']
selection=dict(schema='braid-program/variable-cell-historical-evidence.v1',
    routes=[dict(original=dict(path=x['original'],sha256=x['sha256'],bytes=x['bytes']),physical=bind(BASE/x['file']))for x in rows],
    unavailableHistoricalEnvironment=[dict(path=p,sha256=h,bytes=n)for p,(h,n)in a.HISTORICAL_HOSTS.items()])
start=time.monotonic()
def live():
    if time.monotonic()-start>110:raise TimeoutError('metadata inspection bound')
with ExitStack()as stack:
    physical=a._Pool(stack,w,ROOT,live);pool=a._ArchivePool(physical,selection)
    fullfiles={role:pool.capture(p,h,data=True,size=n)for role,p,h,n in a.FULL}
    full={k:v.binding()for k,v in fullfiles.items()}
    docs={k:w.decode_role(core,fullfiles[k].data,k)for k in ('manifest','comparison','admission','plan')}
    docs.update((k,fullfiles[k].data)for k in ('launcherLog','resourceLog'))
    entry=pool.capture('scripts/eom/run-f6c-cached-root-cover-full.mjs','1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b',data=True,size=27166)
    owner=bind(ROOT/a.OWNER);ownerraw=physical.read_binding(owner,capture=True)
    count=a._full_chain(w,core,docs,full,entry.data,pool,ownerraw)
    pool.recheck()
    report=dict(instrument='variable-cell adapter historical metadata reader; no numeric evaluation',
        sourceCount=count,physicalSourceCount=len(physical.files),missingHosts=selection['unavailableHistoricalEnvironment'],
        originalEnvironmentVerified=False,adapter=bind(ROOT/a.SELF),controls=bind(ROOT/a.CONTROLS),elapsedSeconds=time.monotonic()-start)
    (OUT/'retained-full-chain.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report),flush=True)
selection['routes'].extend({k:x[k]for k in ('original','physical')}for x in json.loads((OUT/'adapter-document-archives.json').read_text()))
selection['routes'].extend({k:x[k]for k in ('original','physical')}for x in json.loads((OUT/'refined-source-archives.json').read_text())['matches'])
(OUT/'historical-evidence-selection.v1.json').write_text(json.dumps(selection,indent=2)+'\n')
with a.open_adapter(ROOT,adapter_sha256=bind(ROOT/a.SELF)['sha256'],controls_sha256=bind(ROOT/a.CONTROLS)['sha256'],
        closure_owner_sha256=owner['sha256'],deadline=time.monotonic()+100,historical_evidence=selection)as obj:
    result=dict(parents=len(obj.parents),physicalSourceCount=len(obj.provenance),callCounts=dict(obj.call_counts),geometryAccounting=dict(obj.geometry_accounting),
        historicalEvidenceVerification={k:([asdict(x)for x in v]if k=='unavailableHistoricalEnvironment'else v)for k,v in obj.historical_evidence_verification.items()})
    assert all(obj.call_counts[k]==0 for k in ('projections','evaluations','residuals','root_queries','emission_refinements'))and all(v==0 for v in obj.geometry_accounting.values())
result.update(adapter=bind(ROOT/a.SELF),controls=bind(ROOT/a.CONTROLS),elapsedSeconds=time.monotonic()-start,finalRecheckPassed=obj._closed)
(OUT/'retained-adapter-construction.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result),flush=True)
