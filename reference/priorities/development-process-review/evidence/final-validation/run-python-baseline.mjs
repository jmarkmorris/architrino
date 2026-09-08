// Sequential supported-venv test baseline. Each file has its own owned deadline.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=process.cwd(),owner=process.env.CODEX_SESSION_ID;
if(!owner)throw Error('stable task owner required');
const python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python');
const compiled=new Set(['test_eom_borg_native_process.py','test_eom_native_acceleration.py','test_eom_native_coupled_evolution.py','test_eom_native_history_layer.py','test_eom_recursive_block_exclusion.py']);
const inventory=JSON.parse(fs.readFileSync(new URL('python-static-discovery.json',import.meta.url))).records;
const compiledMode=process.argv.includes('--compiled');
const selected=inventory.filter(r=>compiled.has(path.basename(r.path))===compiledMode);
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const output=path.join(root,'.local-data/owned-compute',`python-baseline-${compiledMode?'compiled':'ordinary'}-${stamp}.json`);
const result={python,compiledMode,deadlineSecondsPerFile:compiledMode?900:300,selected: selected.map(r=>r.path),results:[],status:'running'};
const sha=filename=>createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
const save=()=>fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
let current='startup',done=0;
const heartbeat=setInterval(()=>console.log(JSON.stringify({kind:'python-baseline-heartbeat',completed:done,total:selected.length,current,output})),15000);
function run(args){return new Promise((resolve,reject)=>{let stdout='',stderr='';const child=spawn(process.execPath,args,{cwd:root,env:process.env,stdio:['ignore','pipe','pipe']});child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal,stdout,stderr}));});}
try {
 save();
 for(const record of selected){
  current=record.path;const before=sha(current);
  console.log(JSON.stringify({kind:'python-file-start',index:done+1,total:selected.length,path:current}));
  const runResult=await run(['scripts/dev/owned-compute-supervisor.mjs','run','--owner-task',owner,'--deadline-seconds',String(result.deadlineSecondsPerFile),'--',python,'-B','-m','unittest','discover','-s',path.dirname(current),'-p',path.basename(current)]);
  let terminal;try{terminal=JSON.parse(runResult.stdout);}catch{throw Error('no terminal JSON for '+current+': '+runResult.stderr.slice(0,500));}
  const row={path:current,sourceSha256Before:before,sourceSha256After:sha(current),runId:terminal.runId,status:terminal.status,exitCode:terminal.exitCode,processGroupClosed:terminal.processGroupClosed,elapsedWallSeconds:terminal.elapsedWallSeconds,stdoutPath:terminal.stdoutPath,stderrPath:terminal.stderrPath};
  result.results.push(row);done++;save();console.log(JSON.stringify({kind:'python-file-finished',...row}));
  if(row.processGroupClosed!==true)throw Error('unresolved owned process group; stopping further dispatch');
 }
 result.status='completed';save();console.log(JSON.stringify({kind:'python-baseline-finished',output,files:done,passed:result.results.filter(r=>r.status==='completed'&&r.exitCode===0).length,failed:result.results.filter(r=>r.exitCode!==0||r.status!=='completed').length}));
 process.exitCode=result.results.some(r=>r.exitCode!==0||r.status!=='completed')?1:0;
} catch(error){result.status='interrupted';result.error=error.message;save();throw error;}
finally{clearInterval(heartbeat);}
