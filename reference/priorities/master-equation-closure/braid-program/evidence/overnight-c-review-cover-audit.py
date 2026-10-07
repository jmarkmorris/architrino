"""Independent exact saved-evidence audit. Never imports or runs a residual evaluator.

Target mode reads only artifacts explicitly listed in a frozen manifest. It never
opens a source_receipt path merely because an input receipt mentions that path.
"""
import argparse
from collections import Counter
from copy import deepcopy
from fractions import Fraction as Q
import hashlib
import json
from pathlib import Path
import re
import sys

SELF=Path(__file__)
PINS={
 'overnight-c-subfield-interval.py':'c1c0f341a2f60a2cba948138f4ab9575019eb18bc6ad94f4460f1d37d7b73be7',
 'overnight-c-interval-continue.py':'61ac65a9a874316099d88ff97dd93958e475810fef17f7bbb412e519c066645d',
 'overnight-c-tight-interval.py':'71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004',
 'overnight-c-tight-cover.py':'b5f1a6810042533dfe1625417f5c772d702eca426a94c05979cee29a44d7d564',
 'overnight-c-witness-refresh.py':'8d0fee5eede003a59b7dfaf06ae620e005ad2b9083e7b15955380863e28c3500'}
BASE,CONT,TIGHT,COVER,REFRESH=PINS.values()
TIGHT_DEPS={k:PINS[k] for k in ('overnight-c-tight-interval.py','overnight-c-interval-continue.py')}
REFRESH_DEPS={k:PINS[k] for k in ('overnight-c-subfield-interval.py','overnight-c-interval-continue.py')}
DOMAIN=((Q(6,5),Q(7,5)),(Q(8,5),Q(9,5)),(Q(1,10),Q(1,2)),(-Q(22,7),Q(22,7)),(-Q(22,7),Q(22,7)))
INTEGER=re.compile(r'-?(0|[1-9][0-9]*)\Z')
DIGEST=re.compile(r'[0-9a-f]{64}\Z')

def need(value,message):
    if not value:raise ValueError(message)
def sha(raw):return hashlib.sha256(raw).hexdigest()
def pairs(items):
    out={}
    for key,value in items:
        need(key not in out,'duplicate JSON key');out[key]=value
    return out
def loads(raw):return json.loads(raw,object_pairs_hook=pairs)
def file_entry(entry):
    need(isinstance(entry,dict) and isinstance(entry.get('path'),str),'bad manifest artifact')
    need(isinstance(entry.get('sha256'),str) and DIGEST.fullmatch(entry['sha256']),'bad artifact digest')
    raw=Path(entry['path']).read_bytes()
    need(sha(raw)==entry['sha256'],'artifact digest mismatch: '+entry['path'])
    return loads(raw)

def endpoint(encoded):
    need(isinstance(encoded,list) and len(encoded)==4,'endpoint must have four fields')
    need(all(isinstance(x,str) and INTEGER.fullmatch(x) for x in encoded),'endpoint fields must be integer strings')
    s,m,e,b=map(int,encoded)
    need(s in (0,1) and m>=0 and b>=0,'nonfinite or invalid endpoint')
    need(b==m.bit_length(),'wrong endpoint bit count')
    if m==0:need((s,m,e,b)==(0,0,0,0),'noncanonical zero or special endpoint')
    return (-1 if s else 1)*Q(m)*Q(2)**e

def sign_interval(lo,hi):
    need(lo<=hi,'reversed interval')
    need(lo>0 or hi<0,'interval contains zero')
    return 'positive' if lo>0 else 'negative'

def row_audit(row):
    need(isinstance(row,list) and len(row) in (3,5),'bad witness row shape')
    path,k,display=row[:3]
    need(isinstance(path,str) and all(c in '0123456789' for c in path),'bad path')
    need(type(k) is int and 0<=k<6,'bad residual component')
    need(isinstance(display,str) and display.startswith('[') and display.endswith(']'),'bad display interval')
    values=display[1:-1].split(',');need(len(values)==2,'bad display endpoint count')
    printed=sign_interval(*(Q(v.strip()) for v in values))
    if len(row)==3:return {'path':path,'kind':'display','sign':printed,'evaluator':BASE}
    need(isinstance(row[3],list) and len(row[3])==2,'exact interval needs two endpoints')
    exact=sign_interval(*(endpoint(e) for e in row[3]))
    need(printed==exact,'printed and exact signs disagree')
    need(row[4] in (BASE,TIGHT),'unreviewed evaluator identity')
    return {'path':path,'kind':'exact','sign':exact,'evaluator':row[4]}

def partition(paths):
    need(isinstance(paths,list) and paths,'empty or malformed cover')
    need(all(isinstance(p,str) and all(c in '0123456789' for c in p) for p in paths),'malformed path')
    leaves=set(paths);need(len(leaves)==len(paths),'duplicate leaf')
    children={}
    for path in paths:
        for i,digit in enumerate(path):
            prefix=path[:i];need(prefix not in leaves,'overlapping ancestor leaf')
            children.setdefault(prefix,set()).add(int(digit))
    for codes in children.values():
        need(len(codes)==2,'missing sibling')
        a,b=sorted(codes);need(a%2==0 and b==a+1,'siblings split different coordinates')
    depths=Counter(map(len,paths));mass=sum((n*Q(1,2)**d for d,n in depths.items()),Q(0))
    need(mass==1,'rational volume differs from one')
    return {'leaves':len(paths),'internal_nodes':len(children),'max_depth':max(depths),'normalized_volume':str(mass)}

def receipt_audit(data,require_exact=False):
    need(isinstance(data,dict),'receipt must be object')
    producer=data.get('sha256');need(producer in (BASE,CONT,COVER,REFRESH),'unreviewed cover producer')
    domain=data.get('domain');need(isinstance(domain,list) and len(domain)==5,'bad domain shape')
    need(all(isinstance(p,list) and len(p)==2 and all(isinstance(x,str) for x in p) for p in domain),'bad domain bounds')
    need(tuple(tuple(Q(x) for x in p) for p in domain)==DOMAIN,'domain differs from reviewed box')
    excluded=data.get('excluded');unresolved=data.get('unresolved')
    need(isinstance(excluded,list) and isinstance(unresolved,list),'missing leaves')
    stats=[row_audit(r) for r in excluded]
    tree=partition([r['path'] for r in stats]+unresolved)
    need(type(data.get('complete_exclusion')) is bool and data['complete_exclusion']==(not unresolved),'false completion flag')
    if producer==BASE:
        need(data.get('iv_dps')==30,'wrong base precision')
        need(all(r['kind']=='display' for r in stats),'base output has unexpected exact rows')
    elif producer==CONT:need(data.get('dependency_sha256')==BASE,'wrong continuation dependency')
    elif producer==COVER:
        need(data.get('dependencies')==TIGHT_DEPS,'wrong tight dependencies')
        need(data.get('partition_checked_before_save') is True,'missing save-time partition claim')
    else:
        need(data.get('dependencies')==REFRESH_DEPS,'wrong refresh dependencies')
        need(data.get('partition_checked_before_save') is True,'missing inherited partition claim')
        need(data.get('remaining_display_only')==sum(r['kind']=='display' for r in stats),'wrong display-only count')
        need(type(data.get('refreshed')) is int and data['refreshed']>=0,'bad refresh count')
        need(data.get('iv_dps')==30,'wrong refresh precision')
    if require_exact:need(all(r['kind']=='exact' for r in stats),'final cover retains display-only witnesses')
    return {'producer':producer,'excluded':len(excluded),'unresolved':len(unresolved),
            'complete_exclusion':data['complete_exclusion'],'partition':tree,
            'witness_kinds':dict(Counter(r['kind'] for r in stats)),
            'exact_signs':dict(Counter(r['sign'] for r in stats if r['kind']=='exact')),
            'evaluator_rows':dict(Counter(r['evaluator'] for r in stats))}

def link_audit(parent,child):
    producer=child['sha256'];pcode=parent['sha256']
    need(parent['domain']==child['domain'],'ancestry domain strings changed')
    old={r[0]:r for r in parent['excluded']};new={r[0]:r for r in child['excluded']}
    if producer==REFRESH:
        need(pcode==COVER,'refresh did not consume tight cover')
        need(parent['unresolved']==child['unresolved'],'refresh changed unresolved leaves')
        need([r[0] for r in parent['excluded']]==[r[0] for r in child['excluded']],'refresh changed excluded paths/order')
        changed=0
        for path,row in old.items():
            replacement=new[path]
            if len(row)==5:need(replacement==row,'refresh changed an existing exact witness')
            elif len(replacement)==3:need(replacement==row,'refresh changed an unrefreshed display witness')
            else:
                need(replacement[4]==BASE,'refresh used wrong evaluator');changed+=1
        need(changed==child['refreshed'],'refresh count differs from changed witnesses')
        return {'kind':'witness_refresh','refreshed_rows':changed}
    need(producer in (CONT,COVER),'unexpected ancestry transition')
    need(pcode in ((BASE,CONT) if producer==CONT else (CONT,COVER)),'unsupported continuation ancestry')
    for path,row in old.items():need(new.get(path)==row,'continuation altered inherited exclusion')
    pending=set(parent['unresolved']);added=0
    for path in list(new)+child['unresolved']:
        if path in old:continue
        ancestors=[path[:i] for i in range(len(path)+1) if path[:i] in pending]
        need(len(ancestors)==1,'new leaf lacks a unique unresolved ancestor')
        if path in new:
            row=new[path]
            if producer==CONT:need(len(row)==3,'old continuation emitted unexpected exact row')
            else:need(len(row)==5 and row[4]==TIGHT,'tight continuation new witness has wrong evaluator')
            added+=1
    return {'kind':'cover_refinement','new_exclusions':added}

def negative(fn):
    try:fn()
    except (ValueError,TypeError,KeyError,IndexError,ZeroDivisionError):return
    raise ValueError('known malformed case was accepted')

def controls():
    need(endpoint(['0','3','-1','2'])==Q(3,2),'endpoint control')
    need(endpoint(['1','5','-2','3'])==-Q(5,4),'signed endpoint control')
    big=2**100+1;need(endpoint(['0',str(big),'-100','101'])==1+Q(1,2**100),'large endpoint control')
    positive=['',0,'[1, 2]',[['0','1','0','1'],['0','1','1','1']],TIGHT]
    negative_row=['',5,'[-2, -1]',[['1','1','1','1'],['1','1','0','1']],BASE]
    need(row_audit(positive)['sign']=='positive' and row_audit(negative_row)['sign']=='negative','sign controls')
    for raw in (['2','1','0','1'],['0','-1','0','1'],['0','1','0','2'],['0','0','-456','-2'],['0','0','1','0'],['0','nan','0','1']):negative(lambda raw=raw:endpoint(raw))
    for exact in ([['0','1','1','1'],['0','1','0','1']],[['0','0','0','0'],['0','1','1','1']],[['1','1','1','1'],['1','1','0','1']]):
        r=deepcopy(positive);r[3]=exact;negative(lambda r=r:row_audit(r))
    for paths in ([],['0'],['0','0','1'],['0','00','1'],['0','3'],['x']):negative(lambda paths=paths:partition(paths))
    need(partition([''])['normalized_volume']=='1','root cover control')
    need(partition(['02','03','1'])['leaves']==3,'mixed-axis cover control')
    negative(lambda:loads('{"a":1,"a":2}'))
    domain=[[str(v) for v in p] for p in DOMAIN]
    base={'sha256':BASE,'domain':domain,'excluded':[],'unresolved':[''],'complete_exclusion':False,'iv_dps':30}
    old={'sha256':CONT,'dependency_sha256':BASE,'domain':domain,'excluded':[['0',0,'[1,2]']],'unresolved':['1'],'complete_exclusion':False}
    tight={'sha256':COVER,'dependencies':TIGHT_DEPS,'domain':domain,'excluded':old['excluded']+[['1']+positive[1:]],'unresolved':[],'complete_exclusion':True,'partition_checked_before_save':True}
    refreshed=deepcopy(tight);refreshed.update(sha256=REFRESH,dependencies=REFRESH_DEPS,refreshed=1,remaining_display_only=0,iv_dps=30)
    refreshed['excluded'][0]=['0',0,'[1,2]',positive[3],BASE]
    for r in (base,old,tight,refreshed):receipt_audit(r,require_exact=r is refreshed)
    for a,b in ((base,old),(old,tight),(tight,refreshed)):link_audit(a,b)
    bad=deepcopy(tight);bad['excluded'][0][1]=1;negative(lambda:link_audit(old,bad))
    bad=deepcopy(refreshed);bad['excluded'][1][1]=1;negative(lambda:link_audit(tight,bad))
    bad=deepcopy(old);bad['complete_exclusion']=True;negative(lambda:receipt_audit(bad))
    negative(lambda:receipt_audit(tight,require_exact=True))
    return {'passed':True,'controls':['exact dyadic values including large mantissa','positive and negative strict signs','invalid/special tuples rejected','reversed/zero-containing/mismatched intervals rejected','complete covers and malformed covers','duplicate JSON keys rejected','synthetic valid source chain','changed inherited witnesses and false completion rejected','display-only final witness rejected'],'boundary':'Synthetic evidence-format controls only; no scientific target receipt read.'}

def target(manifest_path,controls_path):
    cr=loads(controls_path.read_bytes());need(cr.get('passed') is True and cr.get('mode')=='controls' and cr.get('checker_sha256')==sha(SELF.read_bytes()),'missing matching controls')
    manifest_raw=manifest_path.read_bytes();m=loads(manifest_raw)
    need(m.get('frozen') is True,'manifest must explicitly identify frozen artifacts')
    need(type(m.get('require_complete')) is bool,'require_complete must be explicit')
    code=m.get('code_files',{})
    for name,digest in PINS.items():need(sha(Path(code.get(name,str(SELF.with_name(name)))).read_bytes())==digest,'code pin mismatch: '+name)
    controls_seen=set()
    for entry in m['subject_controls']:
        r=file_entry(entry);producer=r.get('sha256');need(r.get('passed') is True and producer in PINS.values(),'invalid subject controls')
        if producer in (CONT,TIGHT):need(r.get('dependency_sha256')==BASE,'control dependency mismatch')
        if producer==COVER:need(r.get('dependencies')==TIGHT_DEPS,'tight cover control dependencies')
        if producer==REFRESH:need(r.get('dependencies')==REFRESH_DEPS,'refresh control dependencies')
        need(producer not in controls_seen,'duplicate subject control');controls_seen.add(producer)
    need(controls_seen==set(PINS.values()),'missing reviewed producer/evaluator controls')
    records={};entries={}
    for entry in m['receipts']:
        digest=entry['sha256'];need(digest not in records,'duplicate receipt digest')
        records[digest]=file_entry(entry);entries[digest]=entry['path']
    digest=m['target_sha256'];need(digest in records,'target absent from frozen receipt list')
    chain=[];seen=set()
    while True:
        need(digest not in seen,'ancestry cycle');seen.add(digest)
        r=records[digest];stats=receipt_audit(r,require_exact=not chain)
        chain.append({'sha256':digest,'path':entries[digest],'summary':stats})
        if r['sha256']==BASE:break
        parent_hash=r.get('source_receipt_sha256');need(parent_hash in records,'frozen source ancestor missing')
        parent=records[parent_hash]
        chain[-1]['transition']=link_audit(parent,r)
        digest=parent_hash
    final=records[m['target_sha256']]
    need(final['sha256']==REFRESH,'final target must be the refreshed exact-witness receipt')
    need(final.get('remaining_display_only')==0,'refresh incomplete')
    if m['require_complete']:need(not final['unresolved'],'requested full exclusion still has unresolved leaves')
    runtime=file_entry(m['runtime_identity'])
    need(final['python']==runtime['python'] and final['python_version']==runtime['version'] and final['mpmath_version']==runtime['mpmath_version'],'refresh/runtime identity mismatch')
    root=Path(runtime['mpmath_directory']);inventory={}
    for item in runtime['mpmath_python_sources']:
        rel=item['relative_path'];p=Path(rel)
        need(not p.is_absolute() and '..' not in p.parts and rel not in inventory,'bad runtime source path')
        need(sha((root/p).read_bytes())==item['sha256'],'runtime source mismatch: '+rel);inventory[rel]=item['sha256']
    need(set(inventory)=={str(p.relative_to(root)) for p in root.rglob('*.py')},'runtime source inventory differs')
    return {'passed':True,'manifest_sha256':sha(manifest_raw),'target_sha256':m['target_sha256'],
            'complete_exclusion':not final['unresolved'],'all_final_witnesses_exact':True,'chain_newest_first':chain,
            'code_pins':PINS,'subject_control_receipts_checked':len(controls_seen),
            'runtime_identity_sha256':m['runtime_identity']['sha256'],'runtime_python_sources_verified':len(inventory),
            'runtime_boundary':runtime.get('boundary','No launch-time attestation supplied.'),
            'boundary':'Independent exact saved-sign, partition, domain, dependency, and ancestry audit. No independent target residual replay or formal library verification.'}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--manifest');p.add_argument('--controls');a=p.parse_args()
    if a.mode=='controls':out=controls()
    else:
        need(a.manifest and a.controls,'target requires explicit frozen manifest and controls paths')
        out=target(Path(a.manifest),Path(a.controls))
    out.update(mode=a.mode,checker_sha256=sha(SELF.read_bytes()),python=sys.executable)
    print(json.dumps(out,indent=2))
