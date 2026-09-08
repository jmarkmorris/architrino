"""Bounded exploratory Option B pilot; operates on explicit in-memory copies."""
import copy
import hashlib
import json
import re
from rdflib import Graph, URIRef

NS='https://example.invalid/option-b-real-chain/'
CONTEXT={'@vocab':NS, 'kind':{'@type':'@id'}, 'fromObject':{'@type':'@id'}, 'toObject':{'@type':'@id'}}
TYPES={'Assumption','EquationOccurrence','Derivation','CalculationSpecification','Result','CheckObligation'}

def sha(raw): return hashlib.sha256(raw).hexdigest()

def pack(value): return (json.dumps(value,indent=2,ensure_ascii=False)+'\n').encode()

def strict_json(raw):
    def pairs(items):
        result={}
        for key,value in items:
            if key in result: raise ValueError('Duplicate JSON key: '+key)
            result[key]=value
        return result
    return json.loads(raw,object_pairs_hook=pairs)

def selected(files,binding):
    raw=files[binding['path']]
    kind=binding['selector']['kind']
    if kind=='whole-file': return raw
    if kind=='between':
        start=binding['selector']['start'].encode();end=binding['selector']['end'].encode()
        if raw.count(start)!=1 or raw.count(end)!=1: raise ValueError('Ambiguous/missing selector')
        a=raw.index(start);z=raw.index(end)
        if z<=a: raise ValueError('Reversed selector')
        return raw[a:z]
    if kind=='equation-occurrence':
        occurrence=binding['selector']['id'].encode()
        pattern=rb'(?m)^\$\$\n((?:(?!^\$\$).)*?)\n\$\$\n\n\[View [^\n]*#([^\)\n]+)\)'
        found=[m.group(1) for m in re.finditer(pattern,raw,re.S) if m.group(2)==occurrence]
        if len(found)!=1:raise ValueError('Ambiguous/missing equation occurrence')
        return found[0]
    raise ValueError('Unsupported selector')

def binding(files,path,selector):
    b={'path':path,'selector':selector,'selectorContract':'pilot-byte-selectors/v1'}
    b['selectedBytesSha256']=sha(selected(files,b));return b

def validate(files,doc):
    if set(doc)!= {'@context','schemaVersion','scopeId','@graph'} or doc['@context']!=CONTEXT or doc['schemaVersion']!='real-chain-pilot/v1' or doc['scopeId']!='moving-single-root':
        raise ValueError('Unsupported package/context')
    rows=doc['@graph'];ids=[r['@id'] for r in rows]
    if len(ids)!=len(set(ids)):raise ValueError('Duplicate identity')
    objects={r['@id']:r for r in rows if r['@type']!='Relationship'}
    relations=[r for r in rows if r['@type']=='Relationship']
    for obj in objects.values():
        if set(obj)!= {'@id','@type','revisionId','sourceBinding'} or obj['@type'] not in TYPES:raise ValueError('Object schema')
        b=obj['sourceBinding']
        if set(b)!= {'path','selector','selectorContract','selectedBytesSha256'} or b['selectorContract']!='pilot-byte-selectors/v1':raise ValueError('Binding schema')
        if sha(selected(files,b))!=b['selectedBytesSha256']:raise ValueError('Stale source binding: '+obj['@id'])
        if not isinstance(obj['revisionId'],str) or not obj['revisionId']:raise ValueError('Missing revision')
    keys=[]
    for rel in relations:
        if set(rel)!= {'@id','@type','revisionId','kind','fromObject','fromRevision','toObject','toRevision','justification'}:raise ValueError('Relationship schema')
        if rel['kind'] not in [NS+'dependsOn',NS+'checks']:raise ValueError('Unknown relationship kind')
        for prefix in ['from','to']:
            if rel[prefix+'Object'] not in objects or rel[prefix+'Revision']!=objects[rel[prefix+'Object']]['revisionId']:raise ValueError('Stale/dangling endpoint')
        if rel['kind']==NS+'checks' and objects[rel['fromObject']]['@type']!='CheckObligation':raise ValueError('checks source is not check')
        if rel['kind']==NS+'dependsOn' and objects[rel['fromObject']]['@type']=='CheckObligation':raise ValueError('Check coverage needs checks relation')
        if sha(selected(files,rel['justification']))!=rel['justification']['selectedBytesSha256']:raise ValueError('Stale justification')
        keys.append((rel['kind'],rel['fromObject'],rel['toObject']))
    if len(keys)!=len(set(keys)):raise ValueError('Duplicate relationship')
    Graph().parse(data=json.dumps(doc),format='json-ld')
    return objects,relations

def graph(doc):
    parsed=Graph().parse(data=json.dumps(doc),format='json-ld');g=Graph()
    query='SELECT ?a ?b WHERE { ?edge <'+NS+'kind> <'+NS+'dependsOn>; <'+NS+'fromObject> ?a; <'+NS+'toObject> ?b . }'
    for row in parsed.query(query):g.add((row.a,URIRef(NS+'dependsOn'),row.b))
    return g

def dependents(doc,identity):
    q='SELECT DISTINCT ?item WHERE {?item <'+NS+'dependsOn>+ ?target} ORDER BY ?item'
    return [str(r.item) for r in graph(doc).query(q,initBindings={'target':URIRef(identity)})]

def refresh(files,doc):
    """Adversarial metadata refresh; never grants approval."""
    d=copy.deepcopy(doc);objs={r['@id']:r for r in d['@graph'] if r['@type']!='Relationship'}
    for obj in objs.values():
        b=obj['sourceBinding'];new=sha(selected(files,b))
        if new!=b['selectedBytesSha256']:
            b['selectedBytesSha256']=new;obj['revisionId']='edited-'+new[:20]
    for r in d['@graph']:
        if r['@type']!='Relationship':continue
        before=pack(r)
        for prefix in ['from','to']:r[prefix+'Revision']=objs[r[prefix+'Object']]['revisionId']
        b=r['justification'];b['selectedBytesSha256']=sha(selected(files,b))
        if pack(r)!=before:r['revisionId']='edited-'+sha(pack(r))[:20]
    return d

def compare(base_files,base_doc,files,doc):
    old,old_edges=validate(base_files,base_doc);new,new_edges=validate(files,doc)
    # Same version IDs cannot be reused for edited content, even if hashes match.
    before={r['@id']:r for r in base_doc['@graph']}
    for r in doc['@graph']:
        if r['@id'] in before and r['revisionId']==before[r['@id']]['revisionId'] and r!=before[r['@id']]:raise ValueError('Reused version for edited record')
    changed_files=sorted(p for p in base_files.keys()|files.keys() if base_files.get(p)!=files.get(p))
    metadata_changed=pack(base_doc)!=pack(doc)
    changed=set(old.keys()^new.keys())|{k for k in old.keys()&new.keys() if old[k]!=new[k]}
    edge=lambda r:(r['kind'].removeprefix(NS),r['fromObject'],r['toObject'])
    old_set={edge(r) for r in old_edges};new_set={edge(r) for r in new_edges}
    removed=sorted(old_set-new_set);added=sorted(new_set-old_set)
    edge_changed=set()
    old_by={r['@id']:r for r in old_edges};new_by={r['@id']:r for r in new_edges}
    for k in old_by.keys()|new_by.keys():
        if old_by.get(k)!=new_by.get(k):
            for r in [old_by.get(k),new_by.get(k)]:
                if r:edge_changed.add(r['toObject'] if r['kind']==NS+'checks' else r['fromObject'])
    seeds=changed|edge_changed
    affected=set(seeds)
    for key in seeds:
        affected.update(dependents(base_doc,key));affected.update(dependents(doc,key))
    checks=sorted({r['fromObject'] for r in old_edges+new_edges if r['kind']==NS+'checks' and r['toObject'] in affected})
    if changed_files and not checks:
        checks=sorted({r['fromObject'] for r in old_edges if r['kind']==NS+'checks'})
    changes=[]
    for key in sorted(changed & old.keys() & new.keys()):
        a=selected(base_files,old[key]['sourceBinding']);b=selected(files,new[key]['sourceBinding'])
        if a!=b:changes.append({'object':key,'before':a.decode(),'after':b.decode()})
    return {'consistency':'pass','baselineAcceptance':'exploratory-not-established',
            'reviewStatus':'review-required' if changed_files or metadata_changed else 'unchanged-relative-to-exploratory-baseline',
            'approval':'not-granted','changedFiles':changed_files,'metadataChanged':metadata_changed,
            'relationshipsRemoved':removed,'relationshipsAdded':added,
            'changedObjects':sorted(changed),'affectedDeclaredObjects':sorted(affected),'selectedChecks':checks,
            'sourceChanges':changes}

def preflight():
    assert sha(b'abc')=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    files={'known.md':b'begin KNOWN end\n$$\ny=2x\n$$\n\n[View ->](./equation.html#known-id)\n'}
    assert selected(files,{'path':'known.md','selector':{'kind':'between','start':'begin ','end':' end'}})==b'begin KNOWN'
    assert selected(files,{'path':'known.md','selector':{'kind':'equation-occurrence','id':'known-id'}})==b'y=2x'
    try:strict_json(b'{"x":1,"x":2}')
    except ValueError:pass
    else:raise AssertionError('Duplicate JSON accepted')
    d={'@context':CONTEXT,'@graph':[
        {'@id':NS+'r1','@type':'Relationship','kind':NS+'dependsOn','fromObject':NS+'b','toObject':NS+'a'},
        {'@id':NS+'r2','@type':'Relationship','kind':NS+'dependsOn','fromObject':NS+'c','toObject':NS+'b'}]}
    assert dependents(d,NS+'a')==[NS+'b',NS+'c']
    assert dependents(d,NS+'c')==[]
    return 'PASS: SHA-256 abc, literal selectors, duplicate JSON rejection, hand-enumerated transitive graph'

if __name__=='__main__':print(preflight())
