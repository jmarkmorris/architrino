// Copy the already selected closure for isolated admission controls; no science runs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const owner='reference/priorities/development-process-review/contracts/';
const hash=raw=>createHash('sha256').update(raw).digest('hex');
export function productionFixturePaths(root){
 const selectionPath=owner+'option-b-production-selection.json',selection=JSON.parse(fs.readFileSync(path.join(root,selectionPath)));
 const accepted=JSON.parse(fs.readFileSync(path.join(root,selection.acceptedBaseline)));
 const manifestPath=owner+'option-b-production-sources.jsonld',manifest=JSON.parse(fs.readFileSync(path.join(root,manifestPath)));
 return [...new Set([selectionPath,selection.acceptedBaseline,selection.transition,accepted.historicalProof.path,manifestPath,...manifest['@graph'].filter(r=>r['@type']==='Source').map(r=>r.binding.path)])];
}
export function copyProductionFixture(root,dir){
 for(const relative of productionFixturePaths(root)){
  assert.ok(relative&&!path.isAbsolute(relative)&&!relative.split('/').includes('..'));
  const destination=path.join(dir,relative);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(path.join(root,relative),destination);
 }
}
export function expectedPhysicalPaths(root,operationalMap){
 const document=JSON.parse(fs.readFileSync(path.join(root,operationalMap)));
 return [...new Set([operationalMap,...document['@graph'].filter(r=>r['@type']==='Source').map(r=>r.binding.path),...productionFixturePaths(root)])].map(p=>path.join(root,p)).sort();
}
export function actualBinding(filename){const raw=fs.readFileSync(filename);return{path:filename,sha256:hash(raw),bytes:raw.length};}

export function rebindProductionFixture(dir, changedPaths){
 // Explicit authority for disposable synthetic controls, never live acceptance.
 assert.notEqual(fs.realpathSync(dir),fs.realpathSync(process.cwd()),'Fixture authoring cannot select the live repository');
 assert.ok(Array.isArray(changedPaths)&&changedPaths.length&&new Set(changedPaths).size===changedPaths.length);
 const read=relative=>JSON.parse(fs.readFileSync(path.join(dir,relative)));
 const write=(relative,value)=>{const raw=Buffer.from(JSON.stringify(value)+'\n');fs.writeFileSync(path.join(dir,relative),raw);return raw;};
 const selectionPath=owner+'option-b-production-selection.json',selection=read(selectionPath),accepted=read(selection.acceptedBaseline),transition=read(selection.transition);
 const profile=transition.profiles.find(p=>p.name==='production-source-records'),manifest=read(profile.manifestPath);
 for(const relative of changedPaths){
  assert.ok(relative&&!path.isAbsolute(relative)&&!relative.split('/').includes('..'));
  assert.ok(relative.startsWith('scripts/')||relative.startsWith('tests/'),'Only explicit synthetic executable/test substitutions');
  const matches=manifest['@graph'].filter(r=>r['@type']==='Source'&&r.binding.path===relative);assert.equal(matches.length,1,'Exactly one selected fixture target');
  matches[0].binding.sha256=hash(fs.readFileSync(path.join(dir,relative)));
 }
 const manifestRaw=write(profile.manifestPath,manifest);
 accepted.profiles.find(p=>p.name==='production-source-records').manifestRaw=manifestRaw.toString();
 const acceptedRaw=write(selection.acceptedBaseline,accepted);
 transition.predecessorSha256=hash(acceptedRaw);profile.sha256=hash(manifestRaw);profile.changes=[];
 const transitionRaw=write(selection.transition,transition);
 selection.acceptedBaselineSha256=hash(acceptedRaw);selection.transitionSha256=hash(transitionRaw);write(selectionPath,selection);
}
