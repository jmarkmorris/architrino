/** Compare named recovery candidates as data; never execute a candidate. */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
const sha=b=>createHash('sha256').update(b).digest('hex');
const matches=(raw,expected)=>raw.length===expected.bytes&&sha(raw)===expected.sha256;
const known={sha256:'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',bytes:3};
assert.equal(matches(Buffer.from('abc'),known),true);
assert.equal(matches(Buffer.from('abd'),known),false);
assert.equal(matches(Buffer.from('abc'),{...known,bytes:4}),false);
console.log('Known exact digest, substituted bytes and wrong size controls passed.');
const required=[
 {path:'/bin/ps',sha256:'472992c470606d28f577590decfecd7f4a20f832fd92c671bebc6d44790b5d02',bytes:170816},
 {path:'/usr/bin/git',sha256:'179301dcb41ea78accc3fa0048a7e6f6710d891945a751a34addd622020c1818',bytes:118928},
 {path:'/usr/bin/memory_pressure',sha256:'a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56',bytes:135248}
];
const candidates=[...required.map(r=>r.path),'/Library/Developer/CommandLineTools/usr/bin/git','/Applications/Xcode.app/Contents/Developer/usr/bin/git'];
const rows=candidates.map(path=>{try{const raw=readFileSync(path);return {path,bytes:raw.length,sha256:sha(raw),matchesRequired:required.filter(r=>matches(raw,r)).map(r=>r.path)};}catch(e){return {path,error:e.code};}});
const result={knownControlsPassed:true,scope:'Five named installed system and developer-tool candidates; reads only, no candidate executed',required,rows};
writeFileSync(new URL('host-binary-candidates.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
