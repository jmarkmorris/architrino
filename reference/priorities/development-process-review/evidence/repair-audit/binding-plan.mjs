import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
function resolveBindings(files){
 const byHash=new Map([...files].map(([p,f])=>[sha(f.before),p]));
 const result=new Map(),active=new Set();
 const historicalConsumers=new Set(['scripts/eom/f6c_variable_cell_adapter.py','scripts/eom/prepare-f6c-parent-emission-refinement.py','scripts/eom/verify-f6c-parent-emission-refinement.py','scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs']);
 const resolve=p=>{
  if(result.has(p))return result.get(p);
  assert.ok(!active.has(p),'binding cycle: '+p);active.add(p);
  const f=files.get(p),edges=[];
  const after=f.current.replace(/\b[a-f0-9]{64}\b/g,h=>{
   const dependency=byHash.get(h);if(!dependency)return h;
   if(dependency==='scripts/eom/run-f6c-cached-root-cover-full.mjs'&&historicalConsumers.has(p))return h;
   const replacement=sha(resolve(dependency).after);
   if(h!==replacement)edges.push({dependency,before:h,after:replacement});
   return replacement;
  });
  active.delete(p);const record={...f,after,edges};result.set(p,record);return record;
 };
 for(const p of files.keys())resolve(p);return result;
}
const a='a',b='pin '+sha(a),c='pin '+sha(b);
const known=resolveBindings(new Map([['a',{before:a,current:'changed'}],['b',{before:b,current:b}],['c',{before:c,current:c}]]));
assert.equal(known.get('b').after,'pin '+sha('changed'));
assert.equal(known.get('c').after,'pin '+sha('pin '+sha('changed')));
assert.equal(resolveBindings(new Map([['a',{before:a,current:a}]])).get('a').after,a);
console.log('Known cases passed: two-level dependency closure and unchanged source.');
const git=args=>execFileSync('git',args,{encoding:'utf8',maxBuffer:32*1024*1024});
const paths=git(['ls-files','scripts','tests']).trim().split('\n').filter(p=>/\.(?:mjs|js|py|json)$/.test(p));
const files=new Map(paths.map(p=>[p,{before:git(['show','HEAD:'+p]),current:readFileSync(p,'utf8')}]));
const result=resolveBindings(files),changes=[];
for(const [p,f]of result)if(f.current!==f.after)changes.push({path:p,before:sha(f.current),after:sha(f.after),bindings:f.edges,lines:f.current.split('\n').flatMap((line,i)=>f.edges.some(e=>line.includes(e.before))?[{line:i+1,text:line}]:[])});
writeFileSync('/private/tmp/dpr-binding-plan.json',JSON.stringify(changes,null,2)+'\n');
console.log(JSON.stringify({files:changes.length,paths:changes.map(x=>x.path)},null,2));
if(process.argv.includes('--apply')){
 for(const item of changes)assert.equal(sha(readFileSync(item.path)),item.before,'concurrent edit: '+item.path);
 for(const item of changes)writeFileSync(item.path,result.get(item.path).after);
 console.log('Applied only the reviewed dependency closure.');
}
