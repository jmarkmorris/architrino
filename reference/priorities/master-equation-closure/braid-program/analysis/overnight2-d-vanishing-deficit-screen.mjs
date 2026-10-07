// Floating arithmetic on retained snapshots only; no actual entry certificate.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const source=fileURLToPath(import.meta.url),root=path.resolve(path.dirname(source),'../../../../..');
const old=path.join(root,'.local-data/master-equation-closure/overnight-d');
const out=path.join(root,'.local-data/master-equation-closure/overnight2-d');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>Math.hypot(...a);
function directed(rows,i,j){const hit=rows.filter(x=>x.i===i&&x.j===j);if(hit.length!==1)throw Error('directed row inventory');return hit[0];}
function geometry(row,d,k){
 if(row.row.length!==3||d.length!==3||![...row.row,...d,row.tau,row.Dt,k].every(Number.isFinite)||row.tau<=0||row.Dt<=0||k<0)throw Error('invalid geometry');
 const m=norm(row.row),r=norm(d);if(!(m>0&&r>0))throw Error('zero direction or separation');
 const n=row.row.map(x=>-x/m),eta=dot(n,d)/row.tau;
 const margin=eta-k*r;
 return {r,n,geometric_deficit_value:eta,deficit_over_separation:eta/r,eta_minus_kr:margin,conditional_channel_rate_upper:eta>0&&margin>0?-margin/Math.sqrt(2*eta):null};
}
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const q=geometry({row:[-1,0,0],tau:2,Dt:1},[2,0,0],.25);
assert.equal(q.geometric_deficit_value,1);assert.equal(q.eta_minus_kr,.5);
assert(Math.abs(q.conditional_channel_rate_upper+1/(2*Math.sqrt(2)))<1e-15);
const v=geometry({row:[-.6,-.8,0],tau:2,Dt:1},[1,0,0],.1);
assert(Math.abs(v.geometric_deficit_value-.3)<1e-15);
assert.equal(directed([{i:1,j:0},{i:0,j:1}],0,1).j,1);
assert.throws(()=>directed([],0,1));assert.throws(()=>directed([{i:0,j:1},{i:0,j:1}],0,1));
assert.throws(()=>geometry({row:[0,0,0],tau:2,Dt:1},[2,0,0],1));
console.log(JSON.stringify({control:'SHA abc, stationary/vector geometry and directed inventory/zero rejection',status:'PASS'}));

const literal=path.join(root,'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json');
const polarity=JSON.parse(fs.readFileSync(literal)).balances[0].s;
const dependencies=[source,literal],rows=[],pairs=[];const k=3;
for(const seed of [1,2]){
 const sp=path.join(old,`snapshot-independent/b0-s${seed}.json`),mp=path.join(old,`b0-s${seed}-h2400-original-endpoint.json`);
 const snap=JSON.parse(fs.readFileSync(sp)),meta=JSON.parse(fs.readFileSync(mp));
 if(snap.json_sha256!==hash(fs.readFileSync(mp))||snap.input_sha256!==hash(fs.readFileSync(literal)))throw Error('input binding');
 dependencies.push(sp,mp);const {i,j}=snap.minimum_pair;
 if(i===j||polarity[i]*polarity[j]!==-1)throw Error('attractive pair selection');
 const d=meta.final.X[i].map((x,c)=>x-meta.final.X[j][c]);
 const first=geometry(directed(snap.roots,i,j),d,k),second=geometry(directed(snap.roots,j,i),d.map(x=>-x),k);
 for(const [receiver,emitter,g]of [[i,j,first],[j,i,second]]){
  const row=directed(snap.roots,receiver,emitter);
  rows.push({seed,i:receiver,j:emitter,range:row.tau,source_factor:row.Dt,source_speed:row.source_speed,receiver_speed:norm(meta.final.V[receiver]),recorded_capped:meta.final.capped[receiver],...g});
 }
 const dv=meta.final.V[i].map((x,c)=>x-meta.final.V[j][c]);
 pairs.push({seed,i,j,t:snap.t,r:first.r,nominal_radial_rate:dot(d,dv)/first.r,conditional_rate_upper:first.conditional_channel_rate_upper===null||second.conditional_channel_rate_upper===null?null:first.conditional_channel_rate_upper+second.conditional_channel_rate_upper});
}
const receipt={grade:'floating retained-snapshot geometry only; source feasibility and actual trajectory entry unproved',k,rows,pairs,dependencies:dependencies.map(p=>({path:path.relative(root,p),sha256:hash(fs.readFileSync(p))}))};
fs.writeFileSync(path.join(out,'vanishing-deficit-screen.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(receipt));
