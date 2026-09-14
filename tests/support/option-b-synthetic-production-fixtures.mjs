// Explicit synthetic test selections in disposable roots; no live/scientific authority.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const hash=raw=>createHash('sha256').update(raw).digest('hex');
const base='reference/priorities/development-process-review/';
export function selectSyntheticProductionFixture(dir,{changedPaths=[],originalTargets=[],identities={}}={}){
 assert.notEqual(fs.realpathSync(dir),fs.realpathSync(process.cwd()),'Synthetic fixture cannot be the live repository');
 const read=p=>JSON.parse(fs.readFileSync(path.join(dir,p)));
 const write=(p,value)=>{const raw=Buffer.from(JSON.stringify(value)+'\n');fs.mkdirSync(path.dirname(path.join(dir,p)),{recursive:true});fs.writeFileSync(path.join(dir,p),raw);return raw;};
 const selectionPath=base+'contracts/option-b-production-selection.json',selection=read(selectionPath),accepted=read(selection.acceptedBaseline),transition=read(selection.transition);
 const profile=transition.profiles.find(p=>p.name==='production-source-records'),manifest=read(profile.manifestPath),rows=manifest['@graph'].filter(r=>r['@type']==='Source'),byPath=new Map(rows.map(r=>[r.binding.path,r]));
 const identityPath='scripts/equation-mapping/fixtures/production-source-identities.json',indexPath=base+'evidence/option-b-production-original-sources.json',payload=read(identityPath),index=read(indexPath);
 const safe=p=>assert.ok(typeof p==='string'&&!path.isAbsolute(p)&&!p.split('/').includes('..')&&/^(scripts|src|tests)\//u.test(p),'Explicit synthetic source path required');
 const edge=(from,to,kind='dependsOn')=>{const entry={...manifest['@graph'].find(r=>r['@type']==='Relationship'&&r.kind==='dependsOn')};entry['@id']=to['@id']+'/fixture-'+kind;entry.kind=kind;entry.from=from['@id'];entry.fromRevision=from.revisionId;entry.to=to['@id'];entry.toRevision=to.revisionId;entry.role='explicit synthetic fixture predecessor';manifest['@graph'].push(entry);};
 for(const target of new Set(originalTargets)){safe(target);assert.ok(byPath.has(target),'Synthetic original target must already be selected');const raw=fs.readFileSync(path.join(dir,target)),sha256=hash(raw),archive=base+'evidence/synthetic-fixture-originals/'+encodeURIComponent(target)+'.source';fs.mkdirSync(path.dirname(path.join(dir,archive)),{recursive:true});fs.writeFileSync(path.join(dir,archive),raw);const old=byPath.get(archive),row=old??{...structuredClone(byPath.get(indexPath)),'@id':byPath.get(indexPath)['@id']+'/synthetic/'+encodeURIComponent(target),binding:{path:archive,selector:{kind:'whole'},contract:'fixed-byte-selection/v1',sha256}};row.binding.sha256=sha256;if(!old){manifest['@graph'].push(row);byPath.set(archive,row);edge(byPath.get(indexPath),row);edge(rows.find(r=>r.role==='admission'),row,'checks');}index.sources[target]={path:archive,sha256,versions:{}};}
 for(const[target,values]of Object.entries(identities)){safe(target);assert.ok(byPath.has(target)&&Array.isArray(values)&&values.length&&values.every(x=>/^[a-f0-9]{64}$/u.test(x)));payload.byConsumer[target]=[...values];}
 write(indexPath,index);write(identityPath,payload);
 for(const target of new Set([...changedPaths,...originalTargets,identityPath,indexPath])){if(target!==identityPath&&target!==indexPath)safe(target);const row=byPath.get(target);if(!row){assert.ok(target.startsWith('tests/'),'Unknown fixture execution target');continue;}row.binding.sha256=hash(fs.readFileSync(path.join(dir,target)));}
 const raw=write(profile.manifestPath,manifest);accepted.profiles.find(p=>p.name===profile.name).manifestRaw=raw.toString();const baseline=write(selection.acceptedBaseline,accepted);transition.predecessorSha256=hash(baseline);profile.sha256=hash(raw);profile.changes=[];const tr=write(selection.transition,transition);selection.acceptedBaselineSha256=hash(baseline);selection.transitionSha256=hash(tr);write(selectionPath,selection);
}
