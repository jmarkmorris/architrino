"""Metadata construction only; no provider, stream advance, or launch."""
import hashlib, json, pathlib, sys, time, types
ROOT=pathlib.Path.cwd()
OUT=ROOT/'reference/priorities/development-process-review/evidence/streamed-leaf-migration'
assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
print('Known SHA-256 abc control passed before source capture',flush=True)
def binding(p):
    data=p.read_bytes()
    return dict(path=str(p),sha256=hashlib.sha256(data).hexdigest(),bytes=len(data))
p=ROOT/'scripts/eom/f6c_variable_cell_adapter.py'
b=binding(p)
assert b['sha256']=='2f0b9ea1ff9ed60a8dacf1b8447ea2a075f482a2d9b505de46e24b1dafb16a25'
module=types.ModuleType('retained_transport_adapter');module.__file__=str(p);sys.modules[module.__name__]=module
exec(compile(p.read_bytes(),str(p),'exec'),module.__dict__)
selection=json.loads((OUT.parent/'variable-cell-migration/historical-evidence-selection.v1.json').read_text())
with module.open_adapter(ROOT,adapter_sha256=b['sha256'],controls_sha256=binding(ROOT/'tests/test_f6c_variable_cell_adapter.py')['sha256'],closure_owner_sha256=binding(ROOT/module.OWNER)['sha256'],deadline=time.monotonic()+90,historical_evidence=selection)as adapter:
    sources=[dict(path=p,sha256=h,bytes=n)for p,h,n in adapter.provenance]
    assert all(adapter.call_counts[k]==0 for k in ('projections','evaluations','residuals','root_queries','emission_refinements'))
    assert all(v==0 for v in adapter.geometry_accounting.values())
    verification=dict(adapter.historical_evidence_verification)
    result=dict(parents=len(adapter.parents),sourceCount=len(sources),numericalCalls=0,adapter=b,fullOriginalEnvironmentVerified=verification['fullOriginalEnvironmentVerified'])
    adapter._pool.recheck()
result['contextClosed']=True
(OUT/'retained-transport-selection.json').write_text(json.dumps(dict(selection=selection,sourceBindings=sources),indent=2)+'\n')
(OUT/'retained-transport-result.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result),flush=True)
