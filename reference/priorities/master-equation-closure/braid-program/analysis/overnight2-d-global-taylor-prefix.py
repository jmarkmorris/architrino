"""Consumed-header prefix adapter for the complete-bound Taylor entry only."""
import argparse,hashlib,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('taylor_prefix',HERE/'overnight2-d-taylor-prefix.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
base.ENTRIES={base.geo.PREFIX+'overnight2-d-global-taylor-admission.py'}
base.REQUIRED|={base.geo.PREFIX+'overnight2-d-global-taylor-admission.py',base.geo.PREFIX+'overnight2-d-screened-taylor-admission.py'}
old_merge=base.original_merge

def merge(existing,extra):
    p=Path(__file__).resolve();own=dict(path=str(p.relative_to(base.geo.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    return old_merge(existing,[*extra,own])

base.original_merge=merge

def controls():
    base.controls()
    if not any(r['path']==str(Path(__file__).resolve().relative_to(base.geo.base.ROOT))for r in base.merge([],[])):raise RuntimeError('complete-bound prefix identity')
    print(json.dumps(dict(control='exact complete-bound entry and consumed bindings, new extractor identity',status='PASS')),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':base.target(a)
