import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtempSync,writeFileSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {parseCurrentCircularRungArgs,runCurrentCircularRung} from '../../../../../scripts/eom/run-current-subfield-circular-root-rung.mjs';
const out='.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/review-control';
const args=['--profile','profile.json','--profile-sha256','a'.repeat(64),'--out',out];
test('current rung accepts only complete explicit bounded output selection',()=>{
 assert.equal(parseCurrentCircularRungArgs(args)['--out'],out);
 for(const bad of [[],args.slice(0,-1),[...args,'--out',out],[...args,'--unknown','x'],args.map(x=>x===out?'../escape':x),args.map(x=>x==='a'.repeat(64)?'x':x)])assert.throws(()=>parseCurrentCircularRungArgs(bad));
});
test('changed profile digest and cap or source-census substitutions close before workload',async()=>{
 const root=realpathSync(mkdtempSync(path.join(tmpdir(),'current-rung-review-')));
 try{for(const [profile,digestWrong,pattern] of [[{schema:'circular-current-rung-launch-profile.v1',limitMs:3600000,h3EvidenceEligible:false},false,/authority\/limit/],[{schema:'circular-current-rung-launch-profile.v1',limitMs:1800000,h3EvidenceEligible:false,sources:{}},false,/source-role census/],[{},true,/digest differs/]]){
 const bytes=Buffer.from(JSON.stringify(profile));writeFileSync(path.join(root,'profile.json'),bytes);let closes=0;
 const guard={check(){},async close(){closes++;},workloadStarted:false};
 await assert.rejects(runCurrentCircularRung({root,options:{'--profile':'profile.json','--profile-sha256':digestWrong?'a'.repeat(64):createHash('sha256').update(bytes).digest('hex'),'--out':out},began:performance.now(),deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n),guard}),pattern);
 assert.equal(closes,1);assert.equal(guard.workloadStarted,false);
 }}finally{rmSync(root,{recursive:true,force:true});}
});
