"""Closed-run prefix extraction for the two explicitly reviewed geometry entries.
Producer association and mathematical acceptance remain independent obligations.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('admission_prefix',HERE/'overnight2-d-admission-prefix.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
original_source_run=base.source_run;original_merge=base.merge_identities;original_extract=base.extract
PREFIX='reference/priorities/master-equation-closure/braid-program/analysis/'
ENTRIES={PREFIX+'overnight2-d-geometric-admission.py',PREFIX+'overnight2-d-screened-geometric-admission.py'}

def source_run(run,tag):
    args=run.get('args')
    if not isinstance(args,list)or not args or args[0]not in ENTRIES:raise ValueError('unsupported geometric entry')
    # Reuse only the unchanged argument parser after exact entry authentication.
    proxy={**run,'args':[PREFIX+'overnight2-d-delayed-admission.py',*args[1:]]}
    return original_source_run(proxy,tag)

def merge(existing,extra):
    p=Path(__file__).resolve()
    own=dict(path=str(p.relative_to(base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    return original_merge(existing,[*extra,own])

def controls():
    base.controls()
    for entry in sorted(ENTRIES):
        r=dict(status='failed',processGroupClosed=True,args=[entry,'target','--cells','4','--output','known'])
        a=source_run(r,'known')
        if a['cells']!=4 or a['output']!='known':raise RuntimeError('known geometric command')
        for bad in [{**r,'status':'running'},{**r,'args':[PREFIX+'unrecognized.py',*r['args'][1:]]},{**r,'args':[*r['args'],'--cel','5']},{**r,'args':[*r['args'],'--cells','5']}]:
            try:source_run(bad,'known')
            except ValueError:pass
            else:raise RuntimeError('invalid geometric command accepted')
    out=merge([],[])
    if len(out)!=1 or out[0]['path']!=str(Path(__file__).resolve().relative_to(base.ROOT)):raise RuntimeError('extractor source binding')
    print(json.dumps(dict(control='exact geometric entry, closed status, canonical arguments and new extractor binding',status='PASS')),flush=True)

def target(args):
    executed=None
    def recognized(run,tag):
        nonlocal executed
        result=source_run(run,tag);executed=run['args'][0]
        return result
    def checked_extract(raw,count=None):
        if executed is None:raise ValueError('source command not authenticated')
        header,records,selection=original_extract(raw,count)
        paths={r['path']for r in header['dependencies']}
        required={executed,PREFIX+'overnight2-d-geometric-admission.py',PREFIX+'overnight2-d-midpoint-geometry.py',PREFIX+'overnight2-d-delayed-admission.py'}
        if not required<=paths:raise ValueError('executed geometry source missing from bindings')
        return header,records,selection
    base.source_run=recognized;base.extract=checked_extract;base.merge_identities=merge
    base.target(args)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':target(a)
