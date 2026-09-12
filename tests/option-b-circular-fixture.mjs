// External source selection for synthetic operational controls, not evidence.
import {createHash} from 'node:crypto';
import {copyFileSync,mkdirSync,mkdtempSync,readFileSync,realpathSync,rmSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {CIRCULAR_SOURCE_MAP} from '../scripts/eom/run-current-subfield-circular-root-pilot.mjs';
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=raw=>createHash('sha256').update(raw).digest('hex');
export async function circularFixture(t) {
  const root=realpathSync(mkdtempSync(path.join(tmpdir(),'circular-admitted-control-')));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  const map=JSON.parse(readFileSync(path.join(repo,CIRCULAR_SOURCE_MAP)));
  for(const row of map['@graph'].filter(row=>row['@type']==='Source')) {
    const filename=path.join(root,row.binding.path);mkdirSync(path.dirname(filename),{recursive:true});
    copyFileSync(path.join(repo,row.binding.path),filename);row.binding.sha256=sha(readFileSync(filename));
  }
  const raw=Buffer.from(JSON.stringify(map)+'\n'),filename=path.join(root,CIRCULAR_SOURCE_MAP);
  mkdirSync(path.dirname(filename),{recursive:true});writeFileSync(filename,raw);
  const digest=sha(raw),entry=readFileSync(path.join(root,'scripts/eom/run-current-subfield-circular-root-pilot.mjs'));
  const module=await import('data:text/javascript;base64,'+entry.toString('base64'));
  const admission=await module.loadCircularSourceMap(root,digest);
  return {root,digest,admission,mapPath:filename};
}
