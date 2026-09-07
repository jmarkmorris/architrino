// Inspect the recovered JavaScript as text. Never evaluate or import it.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const sha=b=>createHash('sha256').update(b).digest('hex');
function pins(text){
 const constants=new Map([...text.matchAll(/^export const ([A-Z_]+) = ("[^"\n]+");$/gm)].map(m=>[m[1],JSON.parse(m[2])]));
 const match=/^export const PINS = Object.freeze\(\{\n([\s\S]*?)^\}\);/m.exec(text);assert.ok(match,'literal pin block');
 const out=new Map();
 for(const line of match[1].trim().split('\n')){
  const row=/^\s*(?:\[([A-Z_]+)\]|("[^"\n]+")):\s*"([a-f0-9]{64})",?\s*$/.exec(line);assert.ok(row,'closed literal pin row');
  const key=row[1]?constants.get(row[1]):JSON.parse(row[2]);assert.ok(key,'known literal constant');assert.ok(!out.has(key),'unique path');out.set(key,row[3]);
 }
 return out;
}
const H='a'.repeat(64),sample=`export const OUTER = "known.js";\nexport const PINS = Object.freeze({\n [OUTER]: "${H}",\n "known.py": "${H}"\n});`;
assert.deepEqual([...pins(sample)],[['known.js',H],['known.py',H]]);
assert.throws(()=>pins(sample.replace('known.py','known.js')));
assert.throws(()=>pins(sample.replace('[OUTER]','[UNKNOWN]')));
console.log('Known cases passed before archive: literal paths, constant path, duplicate refusal, unknown constant refusal.');
const bytes=readFileSync(new URL('original-full-entry.mjs.source',import.meta.url));
assert.equal(sha(bytes),'1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b');
const original=readFileSync('.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json');
assert.equal(sha(original),'8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f');
const recorded=new Map(JSON.parse(original).sourceBindings.map(b=>[b.path,b.sha256]));
const extracted=pins(bytes.toString());assert.equal(extracted.size,35);
for(const [p,h] of extracted)assert.equal(recorded.get(path.resolve(p)),h,p);
const report={knownCases:'passed before target',method:'closed literal-text extraction, no evaluation/import of archived code',entrySha256:sha(bytes),receiptSha256:sha(original),pinCount:extracted.size,allPinsMatchReceipt:true,claim:'Recovered entry and receipt agree on these 35 source identities. This does not establish old process closure, current source availability, or mathematical correctness.'};
writeFileSync(new URL('recovered-entry-validation.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(report);
