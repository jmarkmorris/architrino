#!/usr/bin/env node
// Freeze the exact files reviewed for one B1.3 launch. This does not authorize
// execution; a separate reviewer receipt must bind this manifest hash.
import { createHash } from 'node:crypto';
import { constants, closeSync, fstatSync, openSync, readFileSync, readSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const check=(ok,message)=>{if(!ok)throw new Error(message);};
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function capture(path,limit=512*1024*1024){
  path=resolve(path); const fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW);
  try{const before=fstatSync(fd);check(before.isFile()&&before.size<=limit,'bounded regular file required');const bytes=Buffer.alloc(before.size);let n=0;
    while(n<bytes.length){const got=readSync(fd,bytes,n,bytes.length-n,n);check(got>0,'short read');n+=got;}const after=fstatSync(fd);
    check(before.size===after.size&&before.mtimeMs===after.mtimeMs&&before.ctimeMs===after.ctimeMs,'file changed during capture');return {path,bytes:bytes.length,sha256:hash(bytes),data:bytes};
  }finally{closeSync(fd);}}
function sourceFiles(path){const out=[];for(const entry of readdirSync(path,{withFileTypes:true})){const child=resolve(path,entry.name);if(entry.isDirectory())out.push(...sourceFiles(child));else if(entry.isFile())out.push(child);else throw new Error('nonregular EOM source entry');}return out;}
function binding(path,role){const {data,...b}=capture(path);return {role,...b};}
function main(args=process.argv.slice(2)){
  check(args.length===6&&args[0]==='--prepared'&&args[2]==='--binary'&&args[4]==='--out','usage: --prepared DIR --binary FILE --out FRESH_FILE');
  const prepared=resolve(args[1]),binary=resolve(args[3]),out=resolve(args[5]);
  const bindings=[binding(resolve(prepared,'handoff.json'),'past-only-handoff'),binding(binary,'eom-executable')];
  const requests=[];
  for(const rung of ['coarse','medium','fine']){const path=resolve(prepared,`${rung}-request.json`),captured=capture(path),raw=JSON.parse(captured.data);
    check(raw.transportRequest?.runId===`b1-3-circular-${rung}-v1`&&typeof raw.wire?.utf8==='string','wrong prepared request');
    const wire=Buffer.from(raw.wire.utf8);check(hash(wire)===raw.wire.sha256&&wire.length===raw.wire.bytes,'prepared wire identity inconsistent');
    requests.push({rung,path,bytes:captured.bytes,sha256:captured.sha256,wireBytes:wire.length,wireSha256:hash(wire)});}
  const scientificSources=[resolve(ROOT,'scripts/eom/prepare-b1-3-circular-release.mjs'),resolve(ROOT,'scripts/eom/freeze-b1-3-circular-release-bindings.mjs'),resolve(ROOT,'scripts/eom/run-b1-3-circular-release.mjs'),resolve(ROOT,'scripts/eom/check-b1-3-circular-release.py'),resolve(ROOT,'scripts/eom/prepare-ordinary-evolution-request.mjs'),resolve(ROOT,'scripts/eom/BorgNativeEomProcessClient.mjs'),resolve(ROOT,'src/apps/borg/BorgCertifiedBudgets.js'),...sourceFiles(resolve(ROOT,'src/eom')).sort()];
  bindings.push(...scientificSources.map(path=>binding(path,'scientific-source')));
  const manifest={schema:'braid-program/b1-3-circular-release-binding-manifest.v1',executionAuthorized:false,reviewStatus:'pending',candidateId:'b1-3-circular-balanced-locus',bindings,requests,
    requiredReview:'one independent acceptance receipt binding the exact manifest SHA-256',questions4And5Started:false};
  const bytes=Buffer.from(JSON.stringify(manifest,null,2)+'\n');writeFileSync(out,bytes,{flag:'wx',mode:0o600});
  process.stdout.write(JSON.stringify({path:out,bytes:bytes.length,sha256:hash(bytes),bindings:bindings.length,requests:requests.length})+'\n');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{main();}catch(e){process.stderr.write(e.stack+'\n');process.exitCode=1;}}
