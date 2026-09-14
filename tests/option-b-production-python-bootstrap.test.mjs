import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {CONTEXT,NS,sha256,validate} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {PRODUCTION_PROFILE,PRODUCTION_MANIFEST,PRODUCTION_SELECTION,PRODUCTION_IDENTITIES,PRODUCTION_ORIGINALS} from '../scripts/equation-mapping/production-source-records.mjs';
const ROOT=fs.realpathSync(new URL('../',import.meta.url));
const PYTHON=path.resolve(process.env.AAA_VENV??path.join(ROOT,'../.venv'),'bin/python');
const READER='scripts/equation-mapping/production-source-records.mjs';
const BRIDGE='scripts/eom/production_source_records.py';
const consumer='fixture/host.py';
function fixture(t){
 const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'production python # λ-')));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const put=(p,value)=>{const filename=path.join(root,p);fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value));};
 const identities={schema:'option-b-production-identities/v1',algorithm:'SHA-256',role:'original-identities-preserve-individual-applicability',byConsumer:{[consumer]:['a'.repeat(64)],'fixture/restricted.py':['b'.repeat(64)]}};
 put(consumer,'current host');put('fixture/restricted.py','restricted host');put('fixture/original.source','original host');put(PRODUCTION_IDENTITIES,identities);
 put(PRODUCTION_ORIGINALS,{schema:'option-b-production-original-sources/v1',role:'historical-source-generations-not-current-acceptance',sources:{[consumer]:{path:'fixture/original.source',sha256:sha256('original host')},'fixture/unselected.py':{path:'fixture/original.source',sha256:sha256('original host')}}});
 const roles=new Map([[READER,'admission'],['scripts/equation-mapping/current-source-manifest.mjs','manifest-reader'],['scripts/equation-mapping/current-source-transition.mjs','manifest-reader'],[BRIDGE,'scientific-control'],[consumer,'current-source'],['fixture/restricted.py','current-source'],['fixture/original.source','scientific-control'],[PRODUCTION_IDENTITIES,'scientific-control'],[PRODUCTION_ORIGINALS,'scientific-control']]);
 for(const p of [READER,BRIDGE,...[...roles.keys()].filter(p=>p.includes('current-source-'))])put(p,fs.readFileSync(path.join(ROOT,p)));
 const rows=[...roles].map(([p,role],i)=>({'@id':NS+'bootstrap/'+i,'@type':'Source',revisionId:'known-bootstrap',role,binding:{path:p,selector:{kind:'whole'},contract:'fixed-byte-selection/v1',sha256:sha256(fs.readFileSync(path.join(root,p)))}}));
 const edges=[];const edge=(from,to,kind)=>edges.push({'@id':NS+'bootstrap/edge/'+edges.length,'@type':'Relationship',revisionId:'known-bootstrap',kind,from:from['@id'],fromRevision:from.revisionId,to:to['@id'],toRevision:to.revisionId,role:'known-bootstrap-input'});
 for(const row of rows.slice(1))edge(rows[0],row,'checks');
 const host=rows.find(r=>r.binding.path===consumer);for(const row of rows.filter(r=>r!==host))edge(host,row,'dependsOn');
 edge(rows.find(r=>r.binding.path==='fixture/restricted.py'),rows.find(r=>r.binding.path===PRODUCTION_IDENTITIES),'dependsOn');
 const graph={'@context':CONTEXT,schemaVersion:'current-source-manifest/v1',scope:PRODUCTION_PROFILE,repository:'https://github.com/jmarkmorris/architrino.git',baseline:{commit:'1'.repeat(40),entry:READER,authority:'operator-directed-existing-A-transfer'},revisionId:'known-bootstrap','@graph':[...rows,...edges]};
 validate(graph);put(PRODUCTION_MANIFEST,graph);put('fixture/proof.json',{known:true});
 const accepted='fixture/accepted.json',transition='fixture/transition.json';
 put(accepted,{schema:'accepted-current-source-baseline/v1',historicalProof:{path:'fixture/proof.json',sha256:sha256(fs.readFileSync(path.join(root,'fixture/proof.json')))},profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,manifestRaw:fs.readFileSync(path.join(root,PRODUCTION_MANIFEST),'utf8'),historicalEvidenceBindings:[],operationalRefreshEligibility:[]}]});
 put(transition,{schema:'reviewed-current-source-transition/v1',predecessorSha256:sha256(fs.readFileSync(path.join(root,accepted))),reviewReference:'known bootstrap fixture',profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,sha256:sha256(fs.readFileSync(path.join(root,PRODUCTION_MANIFEST))),changes:[]}]});
 put(PRODUCTION_SELECTION,{acceptedBaseline:accepted,acceptedBaselineSha256:sha256(fs.readFileSync(path.join(root,accepted))),transition,transitionSha256:sha256(fs.readFileSync(path.join(root,transition)))});
 return{root,put,run(body,env={}){const code=`import sys\nfrom pathlib import Path\nroot=Path(${JSON.stringify(root)})\nsys.path.insert(0,str(root/'scripts/eom'))\nimport production_source_records as m\nconsumer=root/${JSON.stringify(consumer)}\n`+body;return spawnSync(PYTHON,['-B','-c',code],{cwd:root,env:{...process.env,...env},encoding:'utf8',timeout:15000});}};
}
const passes=(result)=>assert.equal(result.status,0,result.stderr||result.stdout);
test('FIRST actual Python bootstrap supplies the known immutable tuple through captured B engine modules',t=>{
 const f=fixture(t);const result=f.run(`values=m.production_identities(consumer)\nassert values==('a'*64,) and isinstance(values,tuple)\npure={'OPTION_B_PRODUCTION_IDENTITIES':values}\nexec(compile('ANSWER=OPTION_B_PRODUCTION_IDENTITIES[0]','pure','exec'),pure)\nassert pure['ANSWER']=='a'*64\npair=m.production_source_pair(root,${JSON.stringify(consumer)},${JSON.stringify(consumer)})\nassert pair==(b'original host',b'current host',values)\nbinding=m.production_original_source_binding(root,consumer,consumer.relative_to(root).as_posix())\nassert binding['bytes']==len(b'original host') and m.Path(binding['path']).read_bytes()==b'original host'\nassert m.production_source_pair(root,consumer,consumer.relative_to(root).as_posix(),m.hashlib.sha256(b'original host').hexdigest())==pair\ntry:\n    m.production_source_pair(root,consumer,consumer.relative_to(root).as_posix(),'0'*64)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('wrong original generation accepted')\nm.production_recheck()\nprint('KNOWN_BOOTSTRAP_PASSED')\n`);passes(result);assert.match(result.stdout,/KNOWN_BOOTSTRAP_PASSED/);
});
test('Python rejects reader replacement before first invocation without executing fabricated output',t=>{
 const f=fixture(t);const marker=path.join(f.root,'fabricated-reader-ran');f.put(READER,`import fs from 'node:fs';fs.writeFileSync(${JSON.stringify(marker)},'bad');process.stdout.write(JSON.stringify(['${'b'.repeat(64)}']));`);
 const result=f.run("m.production_identities(consumer)\n");assert.notEqual(result.status,0);assert.match(result.stderr,/bootstrap digest differs/);assert.equal(fs.existsSync(marker),false);
});
test('Python retains code identity after bootstrap capture and across later calls',t=>{
 for(const mode of ['changed-after-capture','replaced-after-capture','replaced-after-first-call']){
  const f=fixture(t);const mutation=`p=root/${JSON.stringify(READER)}\n`+(mode==='changed-after-capture'?"p.write_text(p.read_text()+' ')":"new=p.with_suffix('.replacement')\nnew.write_bytes(p.read_bytes())\nnew.replace(p)");
  const body=mode==='replaced-after-first-call'?"assert m.production_identities(consumer)==('a'*64,)\n"+mutation+"\nm.production_identities(consumer)\n":"original=m._bootstrap_capture\ndef replace_after_capture(root,selection):\n    value=original(root,selection)\n"+mutation.split('\n').map(line=>'    '+line).join('\n')+"\n    return value\nm._bootstrap_capture=replace_after_capture\nm.production_identities(consumer)\n";
  const result=f.run(body);assert.notEqual(result.status,0,mode);assert.match(result.stderr,/Retained production source identity changed/);
 }
});
test('Python rejects post-execution mutation before releasing the captured result',t=>{
 const f=fixture(t);const result=f.run(`original=m.subprocess.run\ndef change_after_child(*args,**kwargs):\n    result=original(*args,**kwargs)\n    p=root/${JSON.stringify(READER)}\n    p.write_text(p.read_text()+' ')\n    return result\nm.subprocess.run=change_after_child\nm.production_identities(consumer)\n`);assert.notEqual(result.status,0);assert.match(result.stderr,/Retained production source identity changed/);
});
test('Python ignores a PATH-shadowed Node and NODE_OPTIONS module injection',t=>{
 const f=fixture(t),marker=path.join(f.root,'fake-node-ran');f.put('bin/node',`#!/bin/sh\ntouch '${marker}'\nprintf '[]'\n`);fs.chmodSync(path.join(f.root,'bin/node'),0o700);
 const result=f.run("assert m.production_identities(consumer)==('a'*64,)\nprint('INSTALLED_NODE_USED')\n",{PATH:path.join(f.root,'bin'),NODE_OPTIONS:`--import=data:text/javascript,import%20fs%20from%20'node:fs';fs.writeFileSync(${encodeURIComponent(JSON.stringify(marker))},'bad')`});passes(result);assert.match(result.stdout,/INSTALLED_NODE_USED/);assert.equal(fs.existsSync(marker),false);
});
test('Python bootstrap denies missing stale and duplicate external selected checkpoint data',t=>{
 for(const mode of ['missing','stale','duplicate']){
  const f=fixture(t);if(mode==='missing')fs.unlinkSync(path.join(f.root,PRODUCTION_SELECTION));else if(mode==='stale')fs.appendFileSync(path.join(f.root,'fixture/accepted.json'),' ');else f.put(PRODUCTION_SELECTION,'{"acceptedBaseline":"a","acceptedBaseline":"b"}');
  const result=f.run('m.production_identities(consumer)\n');assert.notEqual(result.status,0,mode);assert.match(result.stderr,/No such file|bootstrap digest differs|Duplicate production record key/);
 }
});


test('Python successful request cache is exact, immutable and admits optional absence per consumer',t=>{
 const f=fixture(t);passes(f.run(`calls=0
run=m.subprocess.run
def counted(*args,**kwargs):
    global calls
    calls+=1
    return run(*args,**kwargs)
m.subprocess.run=counted
assert m.production_identities(consumer)==('a'*64,)
assert calls==1
assert m.production_identities(consumer)==('a'*64,) and calls==1
pair=m.production_source_pair(root,consumer,consumer.relative_to(root).as_posix())
assert calls==2 and pair[:2]==(b'original host',b'current host')
assert m.production_source_pair(root,consumer,consumer.relative_to(root).as_posix())==pair and calls==2
rows=m.production_captured_sources(consumer)
rows[0]['path']='caller mutation'
assert m.production_captured_sources(consumer)[0]['path']!='caller mutation'
assert m.production_original_source_binding(root,consumer,'fixture/absent.py',optional=True) is None
before=calls
assert m.production_original_source_binding(root,consumer,'fixture/another-absent.py',optional=True) is None and calls==before
for target in ['../outside','/absolute','a//b','a/./b','a/../b','a\\\\b','a'+chr(0)+'b']:
    try: m.production_original_source_binding(root,consumer,target,optional=True)
    except ValueError: pass
    else: raise AssertionError('unsafe optional target accepted: '+repr(target))
assert calls==before
for kwargs in [dict(consumer_file=consumer,target=consumer.relative_to(root).as_posix(),expectedOriginalSha='0'*64,optional=True),dict(consumer_file=consumer,target='fixture/absent.py',optional=False),dict(consumer_file=root/'fixture/restricted.py',target='fixture/absent.py',optional=True),dict(consumer_file=consumer,target='fixture/unselected.py',optional=True)]:
    for repeat in range(2):
        before=calls
        try: m.production_original_source_binding(root,**kwargs)
        except ValueError: pass
        else: raise AssertionError('invalid role/version/required target accepted')
        assert calls==before+1, 'failure was cached or role was bypassed'
assert 'urllib.parse' not in sys.modules
`));
});
test('Python cache rejects source content changes and same-byte replacement on every reuse',t=>{
 for(const mode of ['mutation','replacement']){
  const f=fixture(t);passes(f.run(`m.production_identities(consumer)
p=consumer
`+(mode==='mutation'?"p.write_text(p.read_text()+' ')":"q=p.with_suffix('.replacement')\nq.write_bytes(p.read_bytes())\nq.replace(p)")+`
try: m.production_identities(consumer)
except ValueError as e: assert 'identity changed' in str(e)
else: raise AssertionError('retained source change accepted')
try: m.production_identities(consumer)
except ValueError: pass
else: raise AssertionError('identity was renewed')
`));
 }
});
test('Python retained runtime rejects modification and same-byte replacement without recapture',t=>{
 for(const mode of ['mutation','replacement']){
  const f=fixture(t);passes(f.run(`m.production_identities(consumer)
p=root/'runtime-fixture';p.write_bytes(b'known runtime bytes')
raw,identity=m._captured_bytes(root,p.name)
m._NODE_RUNTIME=(p,identity,m.hashlib.sha256(raw).hexdigest())
assert m._node_runtime()==p
`+(mode==='mutation'?"p.write_bytes(b'changed runtime bytes')":"q=p.with_suffix('.replacement')\nq.write_bytes(p.read_bytes())\nq.replace(p)")+`
try: m.production_identities(consumer)
except ValueError as e: assert 'runtime identity changed' in str(e)
else: raise AssertionError('retained runtime change accepted')
`));
 }
});
