// Compare independently frozen symbolic fixtures with each separate subject.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {G} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
let count=0;
function compare(actual,expected){
 if(Array.isArray(expected)){assert(Array.isArray(actual)&&actual.length===expected.length);for(let i=0;i<expected.length;i++)compare(actual[i],expected[i]);return;}
 assert(actual.lo.cmp(expected)<=0&&actual.hi.cmp(expected)>=0,'exact symbolic value outside subject enclosure');
 assert(actual.hi.sub(actual.lo).cmp('1/1000000000000000000')<0,'point enclosure unexpectedly wide');count++;
}
compare(new G('1/3'),'1/3');assert.throws(()=>compare(new G('1/2'),'1/3'));
console.log('Known exact containment and known mismatch controls passed before subject fixture evaluation.');
const [fixturePath,modulePath,out]=process.argv.slice(2);assert(fixturePath&&modulePath&&out&&!fs.existsSync(out));
const fixture=JSON.parse(fs.readFileSync(fixturePath));assert(fixture.passed&&fixture.delayedAccelerationCancelsExactly);
const subject=await import(pathToFileURL(resolve(modulePath)));const known=subject.known();assert(known.passed);
for(const f of fixture.fixtures){const [R,vn,vt,un,ut,an,at]=f.tuple,got=subject.frame([R,0],[vn,vt],[an,at],[un,ut]);for(const [field,terms] of Object.entries(f.fields))for(const [key,value] of Object.entries(terms))compare(got[field][key],value);}
const result={passed:true,fixtureSHA:sha(fixturePath),subjectSHA:sha(modulePath),independentSource:fixture.independentConstruction,subjectKnown:known,fixtures:fixture.fixtures.map(x=>x.label),scalarContainments:count-1,scope:'synthetic exact point controls for every field and derivative; no target root family, interval-domain completeness, transfer or trajectory admitted'};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));
