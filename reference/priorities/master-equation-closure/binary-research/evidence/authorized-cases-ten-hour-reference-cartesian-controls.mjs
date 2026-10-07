import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';import {resolve} from 'node:path';import {pathToFileURL} from 'node:url';
import {G,Q} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');let count=0;
function contains(a,b){assert(a.lo.cmp(b)<=0&&a.hi.cmp(b)>=0);assert(a.hi.sub(a.lo).cmp('1/1000000000000000')<0);count++;}
contains(new G('1/3'),'1/3');assert.throws(()=>contains(new G(1),2));console.log('Known containment and rejection passed before subject controls.');
const [fixturePath,modulePath,out]=process.argv.slice(2);assert(!fs.existsSync(out));const oracle=JSON.parse(fs.readFileSync(fixturePath));assert(oracle.passed);const subject=await import(pathToFileURL(resolve(modulePath)));const matrix=A=>A.map(r=>r.map(x=>new G(x))),vector=A=>A.flat().map(x=>new G(x));
for(const f of oracle.fixtures){const got=subject.block(matrix(f.Bq),matrix(f.BH),matrix(f.U),new G(f.alpha),vector(f.n),Q.of(f.nu));got.M.forEach((r,i)=>r.forEach((x,j)=>contains(x,f.M[i][j])));subject.exactForcing(got.E,matrix(f.U),vector(f.fq),vector(f.fH),Q.of(f.nu)).forEach((x,i)=>contains(x,f.forcing[i][0]));}
// Independent characteristic polynomial cases: off-diagonal +/-2 block,
// repeated zero eigenvalues, and an interval diagonal with known upper eigenvalue.
for(const [S,bound] of [[[[0,2,0,0],[2,0,0,0],[0,0,-1,0],[0,0,0,0]],2],[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],0]]){const got=subject.lognorm4(matrix(S));assert(got.mu.cmp(bound)>=0&&got.mu.sub(bound).cmp('1/1000000000000')<0);assert(got.minors.length===15);}
const interval=matrix([[0,0,0,0],[0,-2,0,0],[0,0,-3,0],[0,0,0,-4]]);interval[0][0]=new G(-1,1);assert(subject.lognorm4(interval).mu.cmp(1)>=0);
const result={passed:true,oracleSHA:sha(fixturePath),subjectSHA:sha(modulePath),scalarContainments:count-1,cases:['two independently solved noncommuting coordinate transforms and forcings','exact eigenvalue2 block','zero4x4','interval diagonal upper eigenvalue1'],scope:'algebraic matrix/lognorm controls, no physical family target'};fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));
