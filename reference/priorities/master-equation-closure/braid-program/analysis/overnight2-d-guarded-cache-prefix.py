"""Closed consumed-header selector for the guarded cache entry."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('cached_prefix',HERE/'overnight2-d-cached-source-prefix.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
root=base.base.base
root.ENTRIES={root.geo.PREFIX+'overnight2-d-guarded-cache-admission.py'}
root.REQUIRED|={root.geo.PREFIX+'overnight2-d-guarded-cache-admission.py'}
old_merge=root.original_merge
def merge(existing,extra):
    p=Path(__file__).resolve();own=dict(path=str(p.relative_to(root.geo.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    return old_merge(existing,[*extra,own])
root.original_merge=merge
def controls():
    base.controls()
    if not any(r['path']==str(Path(__file__).resolve().relative_to(root.geo.base.ROOT))for r in root.merge([],[])):raise RuntimeError('guarded cache prefix identity')
    print(json.dumps(dict(control='exact guarded cache entry, inherited required bindings and selector identity',status='PASS')),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':root.target(a)
