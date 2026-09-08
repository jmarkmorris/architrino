"""Bounded candidate experiment; no acceptance authority or command dispatch from graph."""
import copy,hashlib,json
from rdflib import Graph,URIRef
NS='https://example.invalid/option-b-corrected/'
CONTEXT={'@vocab':NS,'kind':{'@type':'@id'},'fromObject':{'@type':'@id'},'toObject':{'@type':'@id'}}
KINDS={'dependsOn','verifies','checks','usesInput','generatedBy'}

def sha(raw):return hashlib.sha256(raw).hexdigest()
def pack(x):return (json.dumps(x,indent=2,ensure_ascii=False)+'\n').encode()
def select(files,b):
    raw=files[b['path']];s=b['selector']
    if s['kind']=='whole':return raw
    if s['kind']=='lines':
        lines=raw.splitlines(keepends=True)
        a,z=s['first'],s['last']
        if not 1<=a<=z<=len(lines):raise ValueError('Line bounds')
        return b''.join(lines[a-1:z])
    if s['kind']=='literal':
        needle=s['text'].encode()
        if raw.count(needle)!=1:raise ValueError('Missing or ambiguous literal')
        return needle
    raise ValueError('Unknown selector')
def bind(files,path,selector):
    b={'path':path,'selector':selector,'contract':'fixed-byte-selection/v1'}
    b['sha256']=sha(select(files,b));return b

def validate(files,d):
    if d['@context']!=CONTEXT or d['schemaVersion']!='corrected-candidate/v1':raise ValueError('Unsupported context/schema')
    rows=d['@graph'];ids=[r['@id'] for r in rows]
    if len(ids)!=len(set(ids)):raise ValueError('Duplicate identity')
    objs={r['@id']:r for r in rows if r['@type']!='Relationship'}
    edges=[r for r in rows if r['@type']=='Relationship'];seen=set()
    for o in objs.values():
        for b in o['sourceBindings']:
            if sha(select(files,b))!=b['sha256']:raise ValueError('Stale object '+o['alias'])
    for e in edges:
        k=e['kind'].removeprefix(NS)
        if k not in KINDS:raise ValueError('Unknown relation')
        for side in ['from','to']:
            if e[side+'Object'] not in objs or e[side+'Revision']!=objs[e[side+'Object']]['revisionId']:raise ValueError('Dangling/stale endpoint')
        a,b=objs[e['fromObject']],objs[e['toObject']]
        if k=='checks' and a['@type']!='CheckObligation':raise ValueError('checks source')
        if k=='usesInput' and a['@type']!='CalculationRun':raise ValueError('usesInput source')
        if k=='generatedBy' and (a['@type']!='Result' or b['@type']!='CalculationRun'):raise ValueError('generation types')
        for binding in e['justifications']:
            if sha(select(files,binding))!=binding['sha256']:raise ValueError('Stale justification')
        key=(k,a['@id'],b['@id'])
        if key in seen:raise ValueError('Duplicate edge')
        seen.add(key)
    Graph().parse(data=json.dumps(d),format='json-ld')
    return objs,edges

def affected(d,seeds):
    # A derived impact view, not a proof graph: verification targets also affect their checker.
    g=Graph();aliases={r['@id']:r['alias'] for r in d['@graph'] if r['@type']!='Relationship'}
    for e in d['@graph']:
        if e['@type']=='Relationship' and e['kind']!=NS+'checks':g.add((URIRef(e['fromObject']),URIRef(NS+'impactInput'),URIRef(e['toObject'])))
    result=set(seeds)
    for seed in seeds:
        for r in g.query('SELECT DISTINCT ?x WHERE {?x <'+NS+'impactInput>+ ?s}',initBindings={'s':URIRef(seed)}):result.add(str(r.x))
    return result

def refresh(files,d):
    d=copy.deepcopy(d);objs={r['@id']:r for r in d['@graph'] if r['@type']!='Relationship'}
    for o in objs.values():
        old=pack(o)
        for b in o['sourceBindings']:b['sha256']=sha(select(files,b))
        if pack(o)!=old:o['revisionId']='candidate-'+sha(pack(o))[:20]
    for e in d['@graph']:
        if e['@type']!='Relationship':continue
        old=pack(e)
        for side in ['from','to']:e[side+'Revision']=objs[e[side+'Object']]['revisionId']
        for b in e['justifications']:b['sha256']=sha(select(files,b))
        if pack(e)!=old:e['revisionId']='candidate-'+sha(pack(e))[:20]
    return d

def compare(base_files,base,files,d):
    old,oe=validate(base_files,base);new,ne=validate(files,d)
    oldrows={r['@id']:r for r in base['@graph']}
    for r in d['@graph']:
        if r['@id'] in oldrows and r!=oldrows[r['@id']] and r['revisionId']==oldrows[r['@id']]['revisionId']:raise ValueError('Version reuse')
    changed={k for k in old.keys()|new.keys() if old.get(k)!=new.get(k)}
    ob={e['@id']:e for e in oe};nb={e['@id']:e for e in ne}
    ed={k for k in ob.keys()|nb.keys() if ob.get(k)!=nb.get(k)}
    seeds=set(changed)
    for k in ed:
        for e in [ob.get(k),nb.get(k)]:
            if e:seeds.add(e['toObject'] if e['kind']==NS+'checks' else e['fromObject'])
    impact=affected(base,seeds)|affected(d,seeds)
    selected={e['fromObject'] for e in oe+ne if e['kind']==NS+'checks' and e['toObject'] in impact}
    changed_files=sorted(p for p in base_files.keys()|files.keys() if base_files.get(p)!=files.get(p))
    if changed_files:selected|={e['fromObject'] for e in oe if e['kind']==NS+'checks'} # explicit conservative scope policy
    aliases={k:o['alias'] for k,o in (old|new).items()}
    return {'consistency':'pass','review':'required' if changed_files or base!=d else 'unchanged-exploratory','approval':'not-granted',
      'changedFiles':changed_files,'changedObjects':sorted(aliases[k] for k in changed),'affected':sorted(aliases[k] for k in impact),
      'selectedChecks':sorted(aliases[k] for k in selected),'removedEdges':sorted(ob.keys()-nb.keys()),'addedEdges':sorted(nb.keys()-ob.keys())}

def preflight():
    assert sha(b'abc')=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    f={'a':b'one\r\ntwo\nthree\n'}
    assert select(f,{'path':'a','selector':{'kind':'lines','first':2,'last':2}})==b'two\n'
    assert select(f,{'path':'a','selector':{'kind':'literal','text':'one\r\n'}})==b'one\r\n'
    d={'@context':CONTEXT,'schemaVersion':'corrected-candidate/v1','@graph':[]}
    for name in ['a','b','c','test']:
        d['@graph'].append({'@id':NS+name,'alias':name,'@type':'CheckObligation' if name=='test' else 'Assumption','revisionId':'1','sourceBindings':[bind(f,'a',{'kind':'whole'})]})
    for k,a,b in [('dependsOn','b','a'),('dependsOn','c','b'),('checks','test','c')]:
        d['@graph'].append({'@id':NS+k+a+b,'@type':'Relationship','revisionId':'1','kind':NS+k,'fromObject':NS+a,'fromRevision':'1','toObject':NS+b,'toRevision':'1','justifications':[bind(f,'a',{'kind':'whole'})]})
    validate(f,d);assert affected(d,{NS+'a'})=={NS+'a',NS+'b',NS+'c'}
    removed=copy.deepcopy(d);removed['@graph']=[r for r in removed['@graph'] if r['@id']!=NS+'dependsOnba']
    out=compare(f,d,f,removed);assert out['affected']==['b','c'] and out['selectedChecks']==['test'] and out['review']=='required'
    coverage=copy.deepcopy(d);coverage['@graph']=coverage['@graph'][:-1]
    assert compare(f,d,f,coverage)['selectedChecks']==['test']
    stale={'a':b'changed'}
    try:validate(stale,d)
    except ValueError:pass
    else:raise AssertionError('stale accepted')
    return 'PASS SHA abc, CRLF/line selectors, literal selector, known graph closure, deleted dependency/coverage, stale rejection'
