// Floating snapshot screen only; no actual entry or future trajectory certificate.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../../../..');
const out=path.join(root,'.local-data/master-equation-closure/overnight2-d');
const old=path.join(root,'.local-data/master-equation-closure/overnight-d');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const norm=v=>Math.hypot(...v);
const direction=(row,v)=>{const m=norm(row);if(!(m>0))throw Error('zero mutual row');const n=row.map(x=>-x/m);return {n,z:norm(v.map((x,c)=>x+n[c])),speed:norm(v)};};
const q=direction([-1,0,0],[-.6,.8,0]);
if(Math.abs(q.z-Math.sqrt(.8))>1e-15||q.speed!==1||q.n[0]!==1)throw Error('known chord control');
if(hash('abc')!=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')throw Error('known hash');
console.log('Known chord and SHA-256 controls passed before snapshot inspection');
const k=3,rangeUpper=.003,B=3,h=.001;
const literal=path.join(root,'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json');
const sign=JSON.parse(fs.readFileSync(literal)).balances[0].s;
const dependencies=[literal,fileURLToPath(import.meta.url)];const rows=[];
for(const seed of [1,2]){
 const snapshot=path.join(old,`snapshot-independent/b0-s${seed}.json`),meta=path.join(old,`b0-s${seed}-h2400-original-endpoint.json`);
 const s=JSON.parse(fs.readFileSync(snapshot)),m=JSON.parse(fs.readFileSync(meta));
 if(s.json_sha256!==hash(fs.readFileSync(meta))||s.input_sha256!==hash(fs.readFileSync(literal)))throw Error('snapshot input identity mismatch');
 dependencies.push(snapshot,meta);
 const pair=[s.minimum_pair.i,s.minimum_pair.j];
 if(pair.length!==2||pair[0]===pair[1]||sign[pair[0]]*sign[pair[1]]!==-1)throw Error('wrong attractive pair');
 for(const i of pair){
  const j=pair.find(x=>x!==i),hits=s.roots.filter(x=>x.i===i&&x.j===j);
  if(hits.length!==1)throw Error('mutual row inventory');
  const r=hits[0],d=direction(r.row,m.final.V[i]);
  rows.push({seed,i,j,range:r.tau,source_factor:r.Dt,source_speed:r.source_speed,receiver_speed:d.speed,recorded_capped:m.final.capped[i],direction_chord:d.z,chord_over_range:d.z/r.tau,direction_entry_ratio:d.z/(k*r.tau),range_upper_margin:rangeUpper-r.tau-k*k*rangeUpper*rangeUpper*h/4});
 }
}
const result={grade:'floating retained-snapshot screen only; no actual capped entry, unit-source proof or invariant-region application',parameters:{k,range_upper:rangeUpper,external_bound:B,window:h},direction_boundary_margin:k*(1-k*k*rangeUpper*rangeUpper/4)-(2+2*B*rangeUpper+2*k*rangeUpper),forward_margin:1-k*k*rangeUpper*rangeUpper/2-2*B*rangeUpper*rangeUpper,rows,dependencies:dependencies.map(p=>({path:path.relative(root,p),sha256:hash(fs.readFileSync(p))}))};
fs.writeFileSync(path.join(out,'attractive-ceiling-direction-screen.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(result));
