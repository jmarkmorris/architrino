// Only the explicitly current diagnostic dependency edges; no history refresh.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {PINS} from '../../../../../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
function replace(text,old,next){assert.equal(text.split(old).length,2,'one current binding');return text.replace(old,next);}
assert.equal(replace('a OLD b','OLD','NEW'),'a NEW b');assert.throws(()=>replace('OLD OLD','OLD','NEW'));
const runner='scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const paths=[PINS.diagnosticControls[0],PINS.streamControls[0],runner];
const before=new Map(paths.map(p=>[p,readFileSync(p,'utf8')]));const after=new Map(before);const edges=[];
function update(file,role){const [dependency,old]=PINS[role];const next=sha(after.get(dependency)??readFileSync(dependency));if(old===next)return;after.set(file,replace(after.get(file),old,next));edges.push({file,dependency,before:old,after:next});}
update(PINS.diagnosticControls[0],'adapter');update(PINS.diagnosticControls[0],'adapterControls');
update(PINS.streamControls[0],'diagnosticControls');
for(const role of ['adapter','adapterControls','diagnosticControls','streamControls'])update(runner,role);
for(const [p,s]of before)assert.equal(readFileSync(p,'utf8'),s,'concurrent source change');
for(const [p,s]of after)if(before.get(p)!==s)writeFileSync(p,s);
writeFileSync(new URL('current-binding-propagation.json',import.meta.url),JSON.stringify({knownCase:'unique replacement and duplicate refusal before target',edges},null,2)+'\n');
console.log(JSON.stringify({files:paths.filter(p=>before.get(p)!==after.get(p)),edges:edges.length}));
