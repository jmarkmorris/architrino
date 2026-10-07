"""Bounded-memory independent saved-evidence audit; no residual evaluator import.

Reuses only the frozen independent endpoint validator. Receipt arrays stream to
two disk tables; tree and ancestry checks use ordered cursors, not in-memory tries.
"""
import argparse
import codecs
from collections import Counter
from copy import deepcopy
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import resource
import sqlite3
import sys
import tempfile

SELF=Path(__file__)
REFERENCE_SHA='601b32127cab24f9c40ca27824f7d908d0af5523c41b5a4f5661524708986df8'
reference=SELF.with_name('overnight-c-review-cover-audit.py')
if hashlib.sha256(reference.read_bytes()).hexdigest()!=REFERENCE_SHA:
    raise ValueError('frozen independent validator changed')
spec=importlib.util.spec_from_file_location('independent_cover_reference',reference)
ref=importlib.util.module_from_spec(spec);spec.loader.exec_module(ref)
need=ref.need
STREAM_REFRESH='6df95c3f85445dcf48deb45dd88ec1130c687bd33ff85f9f17e19fe1fa49c573'
PINS={**ref.PINS,'overnight-c-witness-refresh-stream.py':STREAM_REFRESH}
REFRESHERS=(ref.REFRESH,STREAM_REFRESH)
MAX_LEAVES=150001  # The reviewed driver stops after the crossing split.
MAX_FILE=75_000_000
MAX_VALUE=65536
MAX_META=1_000_000
MAX_DEPTH=40
MEMORY_GUARD=320_000_000

def peak():
    value=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return value if sys.platform=='darwin' else value*1024
def guard():need(peak()<MEMORY_GUARD,'audit memory guard reached')
def sha_file(path):
    h=hashlib.sha256()
    with Path(path).open('rb') as f:
        while chunk:=f.read(65536):h.update(chunk)
    return h.hexdigest()
def small(path):
    with Path(path).open('rb') as f:raw=f.read(MAX_META+1)
    need(len(raw)<=MAX_META,'bounded metadata file too large')
    return ref.loads(raw),hashlib.sha256(raw).hexdigest()
def entry_small(entry):
    need(isinstance(entry,dict) and isinstance(entry.get('path'),str),'bad manifest entry')
    obj,digest=small(entry['path']);need(digest==entry.get('sha256'),'metadata digest mismatch')
    return obj

class Reader:
    def __init__(self,path):
        self.f=Path(path).open('rb');self.buf='';self.pos=0;self.eof=False
        self.codec=codecs.getincrementaldecoder('utf-8')();self.hash=hashlib.sha256();self.bytes=0
        self.decoder=json.JSONDecoder(object_pairs_hook=ref.pairs)
    def fill(self):
        self.buf=self.buf[self.pos:];self.pos=0
        raw=self.f.read(8192);self.bytes+=len(raw)
        need(self.bytes<MAX_FILE,'receipt exceeds reviewed byte limit')
        self.hash.update(raw);self.eof=not raw
        self.buf+=self.codec.decode(raw,final=self.eof)
    def ws(self):
        while True:
            while self.pos<len(self.buf) and self.buf[self.pos] in ' \t\r\n':self.pos+=1
            if self.pos<len(self.buf) or self.eof:return
            self.fill()
    def char(self):
        self.ws();return self.buf[self.pos] if self.pos<len(self.buf) else ''
    def take(self,ch):
        need(self.char()==ch,'unexpected JSON punctuation');self.pos+=1
    def value(self):
        self.ws()
        while True:
            try:
                value,end=self.decoder.raw_decode(self.buf,self.pos)
            except json.JSONDecodeError:
                need(not self.eof,'invalid or truncated JSON value')
                need(len(self.buf)-self.pos<=MAX_VALUE,'JSON value exceeds bounded size')
                self.fill();continue
            # A scalar number may end exactly at a read boundary; await its delimiter.
            if end==len(self.buf) and not self.eof:
                self.fill();continue
            need(end-self.pos<=MAX_VALUE,'JSON value exceeds bounded size')
            if end<len(self.buf) and self.buf[end] not in ':,]} \t\r\n':
                need(not self.eof and len(self.buf)-self.pos<=MAX_VALUE,'invalid JSON value delimiter')
                self.fill();continue
            self.pos=end;return value
    def finish(self):
        need(self.char()=='','trailing JSON data')
        need(self.eof,'reader did not reach EOF')
        return self.hash.hexdigest()
    def close(self):self.f.close()

def database(path):
    need(not Path(path).exists(),'scratch database already exists')
    db=sqlite3.connect(path)
    db.execute('PRAGMA cache_size=-8192');db.execute('PRAGMA temp_store=FILE')
    db.execute('PRAGMA mmap_size=0');db.execute('PRAGMA journal_mode=DELETE')
    return db
def table(db,name):
    need(name in ('a','b'),'invalid internal table name')
    db.execute(f'DROP TABLE IF EXISTS {name}')
    db.execute(f'CREATE TABLE {name}(path TEXT PRIMARY KEY,status TEXT,ordinal INTEGER,payload TEXT,kind INTEGER,evaluator TEXT) WITHOUT ROWID')
    db.execute(f'CREATE INDEX {name}_order ON {name}(status,ordinal)')

def tree(db,name):
    cursor=db.execute(f'SELECT path FROM {name} ORDER BY path');iterator=iter(cursor)
    current=next(iterator,None);leaves=0;internal=0;depth=0;mass=Q(0)
    def visit(prefix):
        nonlocal current,leaves,internal,depth,mass
        need(current is not None,'missing partition child')
        path=current[0]
        if path==prefix:
            leaves+=1;depth=max(depth,len(path));mass+=Q(1,2**len(path))
            current=next(iterator,None);return
        need(len(prefix)<MAX_DEPTH and path.startswith(prefix),'incomplete or overlapping partition')
        code=int(path[len(prefix)]);need(code%2==0,'missing lower sibling')
        internal+=1;visit(prefix+str(code));visit(prefix+str(code+1))
    try:
        visit('');need(current is None,'overlapping or extra partition leaves')
        need(mass==1,'wrong exact partition volume')
        return {'leaves':leaves,'internal_nodes':internal,'max_depth':depth,'normalized_volume':str(mass)}
    finally:cursor.close()

def read_receipt(db,name,entry,require_exact=False):
    table(db,name);reader=Reader(entry['path']);metadata={};keys=set();meta_bytes=0
    counts=Counter();signs=Counter();evaluators=Counter();ordinals={'excluded':0,'unresolved':0}
    try:
        reader.take('{')
        if reader.char()!='}':
            while True:
                key=reader.value();need(isinstance(key,str) and key not in keys,'duplicate or invalid top-level key')
                keys.add(key);need(len(keys)<=256,'too many receipt fields');reader.take(':')
                if key in ordinals:
                    reader.take('[')
                    if reader.char()!=']':
                        while True:
                            value=reader.value();ordinal=ordinals[key];ordinals[key]+=1
                            need(sum(ordinals.values())<=MAX_LEAVES,'receipt exceeds crossing-step leaf limit')
                            if key=='excluded':
                                checked=ref.row_audit(value);path=checked['path']
                                need(not require_exact or checked['kind']=='exact','final display-only witness')
                                counts[checked['kind']]+=1;evaluators[checked['evaluator']]+=1
                                if checked['kind']=='exact':signs[checked['sign']]+=1
                                payload=json.dumps(value,separators=(',',':'),ensure_ascii=True)
                                row=(path,'e',ordinal,payload,len(value),checked['evaluator'])
                            else:
                                path=value;row=(path,'u',ordinal,None,0,None)
                            need(isinstance(path,str) and len(path)<=MAX_DEPTH and all(c in '0123456789' for c in path),'invalid leaf path')
                            try:db.execute(f'INSERT INTO {name} VALUES(?,?,?,?,?,?)',row)
                            except sqlite3.IntegrityError as exc:raise ValueError('duplicate excluded/unresolved path') from exc
                            if sum(ordinals.values())%1000==0:guard()
                            delimiter=reader.char()
                            if delimiter==']':break
                            reader.take(',')
                    reader.take(']')
                else:
                    value=reader.value();meta_bytes+=len(json.dumps(value))+len(key)
                    need(meta_bytes<=MAX_META,'receipt metadata exceeds bounded size');metadata[key]=value
                delimiter=reader.char()
                if delimiter=='}':break
                reader.take(',')
        reader.take('}');digest=reader.finish();need(digest==entry['sha256'],'receipt digest mismatch')
    finally:reader.close()
    need({'excluded','unresolved'}<=keys,'missing receipt arrays');db.commit();guard()
    domain=metadata.get('domain')
    need(isinstance(domain,list) and len(domain)==5 and all(isinstance(p,list) and len(p)==2 and all(isinstance(x,str) for x in p) for p in domain),'bad domain format')
    need(tuple(tuple(Q(x) for x in p) for p in domain)==ref.DOMAIN,'domain mismatch')
    producer=metadata.get('sha256');need(producer in (ref.BASE,ref.CONT,ref.COVER,*REFRESHERS),'unreviewed producer')
    need(type(metadata.get('complete_exclusion')) is bool and metadata['complete_exclusion']==(ordinals['unresolved']==0),'false completion flag')
    if producer==ref.BASE:
        need(metadata.get('iv_dps')==30 and counts['exact']==0,'base precision or witness format')
    elif producer==ref.CONT:need(metadata.get('dependency_sha256')==ref.BASE,'continuation dependency')
    elif producer==ref.COVER:
        need(metadata.get('dependencies')==ref.TIGHT_DEPS and metadata.get('partition_checked_before_save') is True,'tight metadata')
    else:
        need(metadata.get('dependencies')==ref.REFRESH_DEPS and metadata.get('partition_checked_before_save') is True,'refresh metadata')
        need(type(metadata.get('remaining_display_only')) is int and metadata['remaining_display_only']==counts['display'],'display-only count')
        need(type(metadata.get('refreshed')) is int and metadata['refreshed']>=0 and metadata.get('iv_dps')==30,'refresh count/precision')
    stats={'producer':producer,'excluded':ordinals['excluded'],'unresolved':ordinals['unresolved'],'complete_exclusion':metadata['complete_exclusion'],'partition':tree(db,name),'witness_kinds':dict(counts),'exact_signs':dict(signs),'evaluator_rows':dict(evaluators)}
    return metadata,stats

def ancestry(db,parent_table,parent,child_table,child):
    cursors=[]
    try:return ancestry_impl(db,parent_table,parent,child_table,child,cursors)
    finally:
        for cursor in cursors:cursor.close()

def ancestry_impl(db,parent_table,parent,child_table,child,cursors):
    def query(*args):
        cursor=db.execute(*args);cursors.append(cursor);return cursor
    need(parent['domain']==child['domain'],'ancestry domain strings changed')
    producer=child['sha256'];pcode=parent['sha256']
    if producer in REFRESHERS:
        need(pcode==ref.COVER,'refresh parent is not tight cover')
        changed=0
        for status in ('e','u'):
            p=iter(query(f'SELECT path,payload,kind,evaluator FROM {parent_table} WHERE status=? ORDER BY ordinal',(status,)))
            c=iter(query(f'SELECT path,payload,kind,evaluator FROM {child_table} WHERE status=? ORDER BY ordinal',(status,)))
            while True:
                a=next(p,None);b=next(c,None)
                need((a is None)==(b is None),'refresh row-count change')
                if a is None:break
                need(a[0]==b[0],'refresh path/order change')
                if status=='u':continue
                if a[2]==5 or b[2]==3:need(a[1]==b[1],'refresh altered retained witness')
                else:need(b[2]==5 and b[3]==ref.BASE,'refresh evaluator mismatch');changed+=1
        need(changed==child['refreshed'],'refresh count mismatch')
        return {'kind':'witness_refresh','refreshed_rows':changed}
    need(producer in (ref.CONT,ref.COVER),'invalid ancestry transition')
    need(pcode in ((ref.BASE,ref.CONT) if producer==ref.CONT else (ref.CONT,ref.COVER)),'unsupported source producer')
    pc=query(f'SELECT path,status,payload,kind,evaluator FROM {parent_table} ORDER BY path')
    cc=iter(query(f'SELECT path,status,payload,kind,evaluator FROM {child_table} ORDER BY path'));b=next(cc,None);added=0
    for a in pc:
        need(b is not None,'missing child coverage')
        if a[1]=='e':
            need(b[0]==a[0] and b[1]=='e' and b[2]==a[2],'inherited exclusion changed')
            b=next(cc,None);continue
        found=False
        while b is not None and b[0].startswith(a[0]):
            found=True
            if b[1]=='e':
                need(b[3]==3 if producer==ref.CONT else b[3]==5 and b[4]==ref.TIGHT,'new witness producer/format mismatch')
                added+=1
            b=next(cc,None)
        need(found,'unresolved ancestor lost')
    need(b is None,'new leaf lacks unresolved ancestor')
    return {'kind':'cover_refinement','new_exclusions':added}

def negative(fn):
    try:fn()
    except (ValueError,TypeError,KeyError,IndexError,json.JSONDecodeError):return
    raise ValueError('malformed synthetic case accepted')
def controls():
    ref.controls()
    domain=[[str(x) for x in p] for p in ref.DOMAIN]
    exact=[['0','1','0','1'],['0','1','1','1']]
    base={'sha256':ref.BASE,'iv_dps':30,'domain':domain,'excluded':[],'unresolved':[''],'complete_exclusion':False}
    old={'sha256':ref.CONT,'dependency_sha256':ref.BASE,'domain':domain,'excluded':[['0',0,'[1,2]']],'unresolved':['1'],'complete_exclusion':False}
    tight={'sha256':ref.COVER,'dependencies':ref.TIGHT_DEPS,'partition_checked_before_save':True,'domain':domain,'excluded':old['excluded']+[['1',0,'[1,2]',exact,ref.TIGHT]],'unresolved':[],'complete_exclusion':True}
    refreshed=deepcopy(tight);refreshed.update(sha256=ref.REFRESH,dependencies=ref.REFRESH_DEPS,refreshed=1,remaining_display_only=0,iv_dps=30)
    refreshed['excluded'][0]=['0',0,'[1,2]',exact,ref.BASE]
    with tempfile.TemporaryDirectory(prefix='overnight-c-review-cover-controls-',dir=SELF.parent) as folder:
        root=Path(folder);db=database(root/'audit.sqlite')
        def load(obj,name='a',strict=False,raw=None):
            payload=(json.dumps(obj,separators=(',',':')) if raw is None else raw).encode();path=root/(name+'.json');path.write_bytes(payload)
            return read_receipt(db,name,{'path':str(path),'sha256':hashlib.sha256(payload).hexdigest()},strict)
        for p,c in ((base,old),(old,tight),(tight,refreshed)):
            pm,ps=load(p,'a');cm,cs=load(c,'b',c is refreshed);ancestry(db,'a',pm,'b',cm)
        streamed=deepcopy(refreshed);streamed['sha256']=STREAM_REFRESH
        pm,_=load(tight,'a');cm,_=load(streamed,'b',True);ancestry(db,'a',pm,'b',cm)
        for paths in (['0'],['0','0','1'],['0','00','1'],['0','3']):
            bad=deepcopy(base);bad['unresolved']=paths;negative(lambda bad=bad:load(bad))
        bad=deepcopy(refreshed);bad['excluded'][0][3][0]=['0','0','0','0'];negative(lambda:load(bad,strict=True))
        negative(lambda:load(tight,strict=True))
        bad=deepcopy(old);bad['complete_exclusion']=True;negative(lambda:load(bad))
        negative(lambda:load(base,raw='{"excluded":[],"excluded":[]}'))
        negative(lambda:load(base,raw=json.dumps(base)+' trailing'))
        pm,_=load(old,'a');bad=deepcopy(tight);bad['excluded'][0][1]=1;cm,_=load(bad,'b');negative(lambda:ancestry(db,'a',pm,'b',cm))
        pm,_=load(tight,'a');bad=deepcopy(refreshed);bad['excluded'][1][1]=1;cm,_=load(bad,'b');negative(lambda:ancestry(db,'a',pm,'b',cm))
        # This fixture crosses several reader chunks, but remains tiny and synthetic.
        wide=deepcopy(base);wide['unresolved']=[format(i,'010b') for i in range(1024)]
        _,stats=load(wide);need(stats['partition']['leaves']==1024,'chunked tree control')
        beginning='{"pad":"';ending='","wall":'
        raw=beginning+'x'*(8190-len(beginning)-len(ending))+ending+'1e+20,'+json.dumps(base)[1:]
        meta,_=load(base,raw=raw);need(meta['wall']==1e20,'split exponent at reader boundary')
        db.close()
    return {'passed':True,'controls':['original independent exact endpoint/sign controls','streamed valid synthetic ancestry chain for both refresh producers','missing/duplicate/overlapping/mismatched tree leaves rejected','zero-containing exact sign rejected','display-only final and false completion rejected','duplicate keys and trailing JSON rejected','changed inherited and exact refresh witnesses rejected','1024-leaf complete tree across reader chunks','numeric exponent spanning reader chunks'],'peak_rss_bytes':peak(),'boundary':'Synthetic only; no real cover receipt inspected.'}

def target(manifest_path,controls_path,scratch):
    cr,_=small(controls_path);need(cr.get('passed') is True and cr.get('mode')=='controls' and cr.get('checker_sha256')==sha_file(SELF),'matching streaming controls required')
    m,manifest_sha=small(manifest_path);need(m.get('frozen') is True and type(m.get('require_complete')) is bool,'explicit frozen/completion contract required')
    code=m.get('code_files',{})
    for name,digest in PINS.items():need(sha_file(code.get(name,SELF.with_name(name)))==digest,'subject code pin mismatch')
    controls_seen=set()
    for entry in m['subject_controls']:
        r=entry_small(entry);producer=r.get('sha256');need(r.get('passed') is True and producer in PINS.values() and producer not in controls_seen,'invalid subject controls')
        if producer in (ref.CONT,ref.TIGHT):need(r.get('dependency_sha256')==ref.BASE,'control dependency')
        if producer==ref.COVER:need(r.get('dependencies')==ref.TIGHT_DEPS,'cover control dependencies')
        if producer in REFRESHERS:need(r.get('dependencies')==ref.REFRESH_DEPS,'refresh control dependencies')
        controls_seen.add(producer)
    core_controls={ref.BASE,ref.CONT,ref.TIGHT,ref.COVER}
    need(controls_seen-set(REFRESHERS)==core_controls and len(controls_seen&set(REFRESHERS))==1,'need four core controls and one selected refresh control')
    entries={}
    for entry in m['receipts']:
        need(isinstance(entry.get('path'),str) and isinstance(entry.get('sha256'),str) and ref.DIGEST.fullmatch(entry['sha256']),'invalid receipt manifest entry')
        need(entry['sha256'] not in entries,'duplicate receipt digest');entries[entry['sha256']]=entry
    need(len(entries)<=32,'ancestry exceeds bounded manifest depth')
    digest=m['target_sha256'];need(digest in entries,'target absent')
    db=database(scratch);chain=[];seen=set();name='a'
    try:
        current,stats=read_receipt(db,name,entries[digest],True);final=dict(current);final_stats=stats
        need(final['sha256'] in REFRESHERS and final.get('remaining_display_only')==0,'final is not completed witness refresh')
        need(final['sha256'] in controls_seen,'final refresh lacks its selected controls')
        if m['require_complete']:need(stats['unresolved']==0,'full exclusion requested for partial cover')
        while True:
            need(digest not in seen,'ancestry cycle');seen.add(digest)
            chain.append({'sha256':digest,'path':entries[digest]['path'],'summary':stats})
            if current['sha256']==ref.BASE:break
            pd=current.get('source_receipt_sha256');need(pd in entries and pd not in seen,'missing/cyclic ancestor')
            other='b' if name=='a' else 'a';parent,pstats=read_receipt(db,other,entries[pd])
            chain[-1]['transition']=ancestry(db,other,parent,name,current)
            db.execute(f'DROP TABLE {name}');db.commit();current,stats,name,digest=parent,pstats,other,pd;guard()
        need(seen==set(entries),'manifest contains unaudited receipts outside ancestry')
        runtime=entry_small(m['runtime_identity'])
        need(final['python']==runtime['python'] and final['python_version']==runtime['version'] and final['mpmath_version']==runtime['mpmath_version'],'runtime metadata mismatch')
        root=Path(runtime['mpmath_directory']);inventory=set()
        for item in runtime['mpmath_python_sources']:
            rel=item['relative_path'];p=Path(rel)
            need(not p.is_absolute() and '..' not in p.parts and rel not in inventory,'bad runtime source path')
            need(sha_file(root/p)==item['sha256'],'runtime source mismatch');inventory.add(rel)
        need(inventory=={str(p.relative_to(root)) for p in root.rglob('*.py')},'runtime inventory differs')
        guard()
        return {'passed':True,'manifest_sha256':manifest_sha,'target_sha256':m['target_sha256'],'complete_exclusion':final_stats['unresolved']==0,'all_final_witnesses_exact':True,'chain_newest_first':chain,'code_pins':PINS,'subject_control_receipts_checked':len(controls_seen),'runtime_identity_sha256':m['runtime_identity']['sha256'],'runtime_python_sources_verified':len(inventory),'runtime_boundary':runtime.get('boundary','No launch-time attestation supplied.'),'peak_rss_bytes':peak(),'memory_contract':{'sqlite_cache_kib':8192,'max_value_characters':MAX_VALUE,'max_metadata_bytes':MAX_META,'max_leaves':MAX_LEAVES,'max_depth':MAX_DEPTH,'memory_guard_bytes':MEMORY_GUARD},'boundary':'Independent exact saved-sign, complete partition, domain, dependency and ancestry audit. No independent residual replay, formal library verification or launch-time runtime attestation.'}
    finally:
        db.close()
        Path(scratch).unlink(missing_ok=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--manifest');p.add_argument('--controls');p.add_argument('--scratch');a=p.parse_args()
    if a.mode=='controls':out=controls()
    else:
        need(a.manifest and a.controls and a.scratch,'target requires manifest, controls and fresh scratch database path')
        out=target(Path(a.manifest),Path(a.controls),Path(a.scratch))
    out.update(mode=a.mode,checker_sha256=sha_file(SELF),reference_checker_sha256=REFERENCE_SHA,python=sys.executable)
    print(json.dumps(out,indent=2))
