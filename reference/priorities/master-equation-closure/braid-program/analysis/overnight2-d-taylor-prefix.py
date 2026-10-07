"""Consumed-header prefix selection for exactly the two Taylor research entries.
All frozen extraction checks and independent acceptance obligations are retained.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('geometric_prefix',HERE/'overnight2-d-geometric-prefix.py');geo=importlib.util.module_from_spec(sp);sp.loader.exec_module(geo)
ENTRIES={geo.PREFIX+'overnight2-d-taylor-admission.py',geo.PREFIX+'overnight2-d-screened-taylor-admission.py'}
REQUIRED={geo.PREFIX+'overnight2-d-taylor-geometry.py',geo.PREFIX+'overnight2-d-taylor-admission.py',geo.PREFIX+'overnight2-d-screened-geometric-admission.py'}
original_extract=geo.original_extract;original_merge=geo.original_merge

def checked_header(header):
    if not REQUIRED<={r['path']for r in header['dependencies']}:raise ValueError('Taylor executed source missing from consumed bindings')

def extract(raw,count=None):
    header,records,selection=original_extract(raw,count);checked_header(header)
    return header,records,selection

def merge(existing,extra):
    p=Path(__file__).resolve();own=dict(path=str(p.relative_to(geo.base.ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest())
    return original_merge(existing,[*extra,own])

def controls():
    geo.controls();good=dict(dependencies=[dict(path=p)for p in sorted(REQUIRED)])
    checked_header(good)
    for p in REQUIRED:
        try:checked_header(dict(dependencies=[r for r in good['dependencies']if r['path']!=p]))
        except ValueError:pass
        else:raise RuntimeError('missing Taylor source accepted')
    old=geo.ENTRIES;geo.ENTRIES=ENTRIES
    try:
        for entry in ENTRIES:
            r=dict(status='stopped',processGroupClosed=True,args=[entry,'target','--cells','3','--output','known'])
            if geo.source_run(r,'known')['cells']!=3:raise RuntimeError('Taylor entry parser')
    finally:geo.ENTRIES=old
    if merge([],[])[0]['path']!=str(Path(__file__).resolve().relative_to(geo.base.ROOT)):raise RuntimeError('Taylor extractor source binding')
    print(json.dumps(dict(control='exact Taylor entries, required consumed source bindings and extractor identity',status='PASS')),flush=True)

def target(args):
    geo.ENTRIES=ENTRIES;geo.original_extract=extract;geo.original_merge=merge
    geo.target(args)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--source');p.add_argument('--output');p.add_argument('--run');p.add_argument('--cells',type=int);a=p.parse_args();controls()
    if a.mode=='target':target(a)
