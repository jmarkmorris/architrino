"""Closed consumed-header selector for the exact cached-source entry."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('global_prefix',HERE/'overnight2-d-global-taylor-prefix.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
base.base.ENTRIES={base.base.geo.PREFIX+'overnight2-d-cached-source-admission.py'}
base.base.REQUIRED|={base.base.geo.PREFIX+'overnight2-d-cached-source-admission.py',base.base.geo.PREFIX+'overnight2-d-piece-box-cache.py'}
old_merge=base.base.original_merge
def merge(existing,extra):
    p=Path(__file__).resolve();own=dict(path=str(p.relative_to(base.base.geo.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    return old_merge(existing,[*extra,own])
base.base.original_merge=merge
def controls():
    base.controls()
    if not any(r['path']==str(Path(__file__).resolve().relative_to(base.base.geo.base.ROOT))for r in base.base.merge([],[])):raise RuntimeError('cache prefix identity')
    print(json.dumps(dict(control='exact cached entry, consumed helper bindings and new selector identity',status='PASS')),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':base.base.target(a)
