// Metadata-only driver controls. No Python process or evidence package created.
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import * as D from '../scripts/eom/run-f6c-evidence-packaging.mjs';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';

const root='/private/tmp/synthetic-package-driver';
const b=p=>({path:p,sha256:'a'.repeat(64),bytes:1});
function plan(){
  const configuration=Object.fromEntries(Object.entries(D.PINS).map(([k,[p,h]])=>[k,{path:path.join(root,p),sha256:h,bytes:1}]));
  configuration.python=b('/private/tmp/python');configuration.pythonCommand=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python');configuration.pythonVenvConfig=b(path.resolve(path.dirname(configuration.pythonCommand),'../pyvenv.cfg'));configuration.pythonRuntimeBindings=[configuration.python,configuration.pythonVenvConfig];configuration.outputPath=root+'/.local-data/braid-analysis/package/data/evidence.f6cp';
  const hookModule=b(path.join(root,D.SELF)),hookControls=b(path.join(root,D.CONTROL));
  return {root,configuration,hookModule,hookControls,outputDirectories:[path.dirname(configuration.outputPath)],publicationAliases:[{publicPath:configuration.outputPath,privateDirectory:path.dirname(configuration.outputPath),privatePrefix:'evidence.f6cp.partial.'}],
    sources:[...Object.keys(D.PINS).map(k=>configuration[k]),configuration.python,configuration.pythonVenvConfig],stages:['producer','independent-reader'].map(id=>({id,entry:hookModule,sources:[],runtimeBindings:[configuration.python]}))};
}

test('driver pins remain independently frozen, separate from its own subject',()=>{
  assert.equal(D.PINS.packageModule[1],'9d888682514f23652b39bfaa53fdfb3ceab66e6ba88cf34222c156d226764ad6');
  assert.equal(D.PINS.independentDecoder[1],'328120d4f0c0716d78d38362cfb2f1c27b5a33382c6a3870fb10ca501f9d0273');
  assert.equal(D.PINS.inventory[1],'79a91daedff0fdb712b5b76ff0a4d8c345711eb2c4b69c0731a509da701e48fc');
  D.validateConfiguration(plan(),C);
});

test('foreign pins, partial runtimes, alternate paths, stages and aliases reject',()=>{
  for(const change of [p=>p.configuration.extra=true,p=>p.configuration.inventory.sha256='b'.repeat(64),p=>p.configuration.packageModule.path='/private/tmp/foreign.py',p=>p.configuration.pythonRuntimeBindings=[],p=>p.configuration.outputPath='/private/tmp/outside',p=>p.stages.reverse(),p=>p.stages[0].entry=b('/private/tmp/alternate'),p=>p.publicationAliases=[],p=>p.sources.shift()]){
    const p=plan();change(p);assert.throws(()=>D.validateConfiguration(p,C));
  }
});

test('configuration binding comparison ignores JSON object key order only',()=>{
  const p=plan();p.sources=p.sources.map(x=>({bytes:x.bytes,sha256:x.sha256,path:x.path}));D.validateConfiguration(p,C);
});

test('completion is one bounded metadata-only record',()=>{
  assert.equal(D.parseCompletion(Buffer.from('{"completed":true,"numericalCalls":0}\n')).completed,true);
  for(const raw of ['', '{}\n', '{"completed":true,"numericalCalls":1}\n','{"completed":true,"numericalCalls":0}\n\n','{"completed":true,"numericalCalls":0}'])assert.throws(()=>D.parseCompletion(Buffer.from(raw)));
  assert.throws(()=>D.parseCompletion(Buffer.alloc(1048577)));
});

test('runtime inventory command disables bytecode writes and captures cached reads',()=>{
  const subject=plan().configuration.packageModule,command=D.runtimeInventoryCommand('/private/tmp/python',subject);
  assert.equal(command.command,'/private/tmp/python');assert.deepEqual(command.args.slice(0,3),['-I','-B','-c']);assert.equal(command.args[4],'inventory');
  assert.deepEqual(JSON.parse(command.args[5]),{packageModule:subject});assert.ok(D.PYTHON.includes("if mode=='inventory':"));
  assert.ok(D.PYTHON.includes("for attr in ('__file__','__cached__'):"));assert.ok(!D.PYTHON.includes('source_from_cache'));
});

test('source baseline includes mandatory hooks outside explicit source lists',()=>{
  const p=plan(),sources=D.declaredSources(p,C);assert.ok(sources.some(b=>b.path===p.hookControls.path));assert.ok(sources.some(b=>b.path===p.hookModule.path));
  p.sources.push(p.hookControls);assert.equal(D.declaredSources(p,C).length,sources.length);
});

test('publication identity retains exact nanoseconds and original private path',()=>{
  const output='/private/tmp/package.bin',p={binding:{bytes:10},private_path:output+'.partial.'+'a'.repeat(32),identity:{device:'1',inode:'2',bytes:'10',mtime_ns:'1787876752643705374',ctime_ns:'1787876752643705375'}};
  assert.equal(D.publicationIdentity(p,output),'1:2:10:1787876752643705374:1787876752643705375');
  assert.throws(()=>D.publicationIdentity({...p,identity:{...p.identity,mtime_ns:1787876752643705374}},output));
  assert.throws(()=>D.publicationIdentity({...p,private_path:'/private/tmp/foreign'},output));
});

test('generic source baseline subtracts exact unique physical objects once',()=>{
  const members=[{physicalPath:'/private/tmp/object-a',original:b('/original/a')},{physicalPath:'/private/tmp/object-b',original:{...b('/original/b'),bytes:2}}];
  const sources=[b('/private/tmp/object-a'),{...b('/private/tmp/object-b'),bytes:2},{...b('/private/tmp/runtime'),bytes:50}];
  assert.deepEqual(D.sourceBaseline(sources,members,C),{sourceFilesAlready:1,sourceBytesAlready:50});
  assert.throws(()=>D.sourceBaseline(sources.slice(1),members,C));
  assert.throws(()=>D.sourceBaseline([...sources,sources[0]],members,C));
  assert.throws(()=>D.sourceBaseline(sources,[...members,members[0]],C));
  assert.throws(()=>D.sourceBaseline(sources,[{...members[0],original:{...members[0].original,sha256:'b'.repeat(64)}}],C));
});

test('generic runtime discovery loads the same captured parser generation',()=>{
  const c=plan().configuration,parser=b('/private/tmp/inventory-parser.py'),command=D.runtimeInventoryCommand('/private/tmp/python',c.packageModule,parser);
  assert.deepEqual(JSON.parse(command.args[5]),{packageModule:c.packageModule,inventoryParser:parser});
  assert.ok(D.PYTHON.includes("inventory_module=types.ModuleType"));
  assert.ok(D.PYTHON.includes("if m is module or m is inventory_module: continue"));
  assert.ok(D.PYTHON.includes("members==want"));
  assert.ok(D.PYTHON.includes("plan_raw,plan_identity=capture"));
  assert.ok(D.PYTHON.includes("deadline=entry_started+float(sys.argv[3])"));
});

test('mixed and unsupported inventory versions never fall back to v1',()=>{
  for(const version of [0,1,3,'2',true,null]){const p=plan();p.configuration.inventoryVersion=version;assert.throws(()=>D.validateConfiguration(p,C));}
  const p=plan();p.configuration.inventoryVersion=2;assert.throws(()=>D.validateConfiguration(p,C));
});

function genericPlan(){
  const p=plan(),c=p.configuration;c.inventoryVersion=2;c.inventory=b(root+'/inventory-v2.json');
  for(const[k,[rel,h]]of Object.entries(D.GENERIC_PINS))c[k]={path:path.join(root,rel),sha256:h,bytes:1};
  c.expectedAuthority=[b(root+'/independent-reviewer')];c.admittedClosures=[{binding:b(root+'/closed-batch'),expectedInstrument:c.expectedAuthority[0]}];
  c.expectedMembers=[{memberName:'parents/2/plan',role:'plan',parentIndex:2,original:b(root+'/plan'),physicalPath:root+'/plan',identity:{device:'1',inode:'2',bytes:'1',mtimeNs:'3',ctimeNs:'4'}}];
  p.sources.push(c.inventory,...Object.keys(D.GENERIC_PINS).map(k=>c[k]),...c.expectedAuthority,...c.admittedClosures.map(x=>x.binding));return p;
}

test('generic configuration has explicit independently bound parser and authority',()=>{
  D.validateConfiguration(genericPlan(),C);
  for(const change of [
    p=>p.configuration.expectedAuthority=[],p=>p.configuration.admittedClosures=[],p=>p.configuration.expectedMembers=[],
    p=>p.configuration.admittedClosures[0].expectedInstrument=b(root+'/foreign-reviewer'),
    p=>p.configuration.admittedClosures.push(p.configuration.admittedClosures[0]),
    p=>p.configuration.admittedClosures[0].raw='self-authorized data',
    p=>p.configuration.genericIndependentReader.sha256='b'.repeat(64),
    p=>p.sources=p.sources.filter(b=>b.path!==p.configuration.inventoryParserControls.path),
    p=>p.configuration.inventoryVersion='2',p=>delete p.configuration.inventoryContract,
  ]){const p=genericPlan();change(p);assert.throws(()=>D.validateConfiguration(p,C));}
});
