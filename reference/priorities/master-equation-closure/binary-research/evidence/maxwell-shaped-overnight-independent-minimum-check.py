"""Known-first exact common-refinement/minimum provenance checker."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def common(base,patch):
    assert base and patch;prev=None
    for l,r,d in base:
        assert l<r and d>=0 and (prev is None or l==prev);prev=r
    prev=None
    for l,r,d in patch:
        assert base[0][0]<=l<r<=base[-1][1] and d>=0 and (prev is None or prev<=l);prev=r
    faces=sorted(set([x for row in base+patch for x in row[:2]]));out=[];bi=pi=0
    for l,r in zip(faces,faces[1:]):
        while base[bi][1]<=l:bi+=1
        while pi<len(patch) and patch[pi][1]<=l:pi+=1
        b=base[bi];assert b[0]<=l<r<=b[1];p=patch[pi] if pi<len(patch) and patch[pi][0]<=l<r<=patch[pi][1] else None
        out.append((l,r,min(b[2],p[2]) if p else b[2],b,p))
    return out

def known():
    row=lambda a,b,c:tuple(map(Q,[a,b,c]));b=[row(0,'1/2',2),row('1/2',1,3)];p=[row('1/3','2/3',1)];a=common(b,p);assert [x[2] for x in a]==list(map(Q,[2,1,1,3]))
    assert len(common(b,[row('1/4','1/3',1),row('2/3','3/4',1)]))==6
    return {'passed':True,'cases':['known nondyadic exact minimum','gapped patch base retains coverage']}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.receipt:
        r=json.loads(Path(a.receipt).read_text());assert sha(r['input'])==r['inputSHA'];prod=r['producers'];assert len(prod)==2;allrows=[]
        for z in prod:
            assert sha(z['spec'])==z['specSHA'] and sha(z['cells'])==z['cellsSHA'];s=json.loads(Path(z['spec']).read_text());assert s['input']==r['input'] and s['inputSHA']==r['inputSHA'] and s['law']==r['law']
            allrows.append([tuple(Q(x[k]) for k in ['left','right','bound']) for x in map(json.loads,Path(z['cells']).read_text().splitlines())])
        expect=common(*allrows);rows=list(map(json.loads,Path(a.receipt+'.jsonl').read_text().splitlines()));assert len(expect)==len(rows)==r['cells']
        for (l,h,d,b,p),x in zip(expect,rows):
            assert (l,h,d)==tuple(Q(x[k]) for k in ['left','right','bound']);assert b==tuple(Q(x[k]) for k in ['baseLeft','baseRight','baseBound'])
            assert p is None and x['patch'] is None or p==tuple(Q(x['patch'][k]) for k in ['left','right','bound'])
        assert expect[0][0]==Q(r['start']) and expect[-1][1]==Q(r['end']) and max(z[2] for z in expect)==Q(r['maximumDefect'])
        out['target']={'accepted':True,'receipt':a.receipt,'sha256':sha(a.receipt),'rowsSHA':sha(a.receipt+'.jsonl'),'cells':len(rows),'end':r['end'],'scope':'exact common minimum of separately accepted valid same-curve producers; no new trajectory'}
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
