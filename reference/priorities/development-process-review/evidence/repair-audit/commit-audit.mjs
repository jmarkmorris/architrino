import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const normalize=text=>text.replace(/\b[a-f0-9]{64}\b/g,'SHA256');
const classify=(before,after)=>normalize(before)===normalize(after)?'hash-only':'other-change';
assert.equal(classify('pin="'+'a'.repeat(64)+'"; x=1','pin="'+'b'.repeat(64)+'"; x=1'),'hash-only');
assert.equal(classify('pin="'+'a'.repeat(64)+'"; x=1','pin="'+'b'.repeat(64)+'"; x=2'),'other-change');
assert.equal(classify('assert(gone(pid))','assert(receipt.closed)'),'other-change');
console.log('Known cases passed: hash substitution, code change, assertion removal.');
const git=args=>execFileSync('git',args,{encoding:'utf8',maxBuffer:16*1024*1024});
const revisions=['730940e16','295a24ce2','590ddc942','582efe4bf','959247191','bb9d82d94','36d34a262'];
const records=[];
for(const rev of revisions){
 const revision=git(['rev-parse',rev]).trim();
 const files=git(['diff-tree','--no-commit-id','--name-only','-r',revision]).trim().split('\n');
 const entries=files.map(file=>{
  const before=git(['show',revision+'^:'+file]),after=git(['show',revision+':'+file]);
  return {file,classification:classify(before,after)};
 });
 records.push({revision,files:entries});
 writeFileSync('/private/tmp/dpr-'+rev+'.diff',git(['show','--format=fuller',revision]));
}
const destination='reference/priorities/development-process-review/evidence/repair-audit/commit-change-inventory.json';
writeFileSync(destination,JSON.stringify({knownCases:'passed before target reads',scope:'seven named commits; whole-file equality after replacing lowercase 64-digit hexadecimal tokens; hash-only is syntactic, not semantic approval',records},null,2)+'\n');
for(const record of records)console.log(JSON.stringify({revision:record.revision,total:record.files.length,hashOnly:record.files.filter(x=>x.classification==='hash-only').length,other:record.files.filter(x=>x.classification!=='hash-only').map(x=>x.file)}));
