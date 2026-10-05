"""Separate provenance checker; preserves frozen curve comparison source.
Header known parse and SHA-256 abc controls precede target use.
"""
import argparse,json,hashlib
from pathlib import Path

def header(text):
    start=text.index('"specification"');start=text.index(':',start)+1
    return json.JSONDecoder().raw_decode(text[start:].lstrip())[0]

def digest(path):
    h=hashlib.sha256()
    with Path(path).open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):h.update(chunk)
    return h.hexdigest()

def known():
    assert header('{"specification": {"cf":1,"law":"E"},"segments":[')==dict(cf=1,law='E')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    return dict(passed=True,cases=['incomplete body complete header parsed','SHA256 abc known digest'])

def analyze(reference,subject,law):
    specs=[]
    for path in [reference,subject]:
        with Path(path).open() as f:s=header(f.read(8192))
        for key,value in dict(K=1,cf=1,members=2,polarities=[1,-1],beta=.05,r=100,omega=.0005).items():assert s[key]==value
        selected=s.get('law') or ('full' if 'E+M' in s['equation'] else 'E');assert selected==law
        specs.append(dict(path=path,sha256=digest(path),specification=s))
    a,b=[s['specification'] for s in specs]
    return dict(inputs=specs,width_difference=a['delta']-b['delta'],launch_correction_difference=[x-y for x,y in zip(a['da'],b['da'])],scope='same analytical case identifiers, distinct literal preparation rounding retained; no numerical proof')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--reference');p.add_argument('--subject');p.add_argument('--law',choices=['E','full'],default='E');p.add_argument('--output',required=True);a=p.parse_args();r=dict(known=known());print(json.dumps(r),flush=True)
    if a.reference:r['target']=analyze(a.reference,a.subject,a.law)
    Path(a.output).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
