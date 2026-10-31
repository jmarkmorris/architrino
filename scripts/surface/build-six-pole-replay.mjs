// Explicit-use display conversion only; no evolution and no recurring enrollment.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {resolveResearchSourcePath} from '../../src/documentation/ResearchSourcePaths.mjs';
import {decimalSum} from '../../src/apps/surface/SurfaceGeometry.js';
import {createSixPolePreparation,validateSixPoleReplay,SIX_POLE_CASE,SIX_POLE_SCHEMA} from '../../src/apps/surface/SurfaceSixPoleReplay.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const target=path.join(root,'src/apps/surface/data/six-pole-rest-r10.json');
const sha=b=>createHash('sha256').update(b).digest('hex');
const copy=p=>{if(!Array.isArray(p)||p.length!==2||p.some(s=>typeof s!=='string'||!Number.isFinite(Number(s)))||Number(p[0])>Number(p[1]))throw Error('Missing or invalid retained interval');return [...p];};
function sample(s,source){if(s.certified!==true)throw Error('Uncertified step refused');return {
  t:[decimalSum(s.t_int[0],'0.01'),s.t_int[1]],q:copy(s.end_q_str),w:copy(s.end_v_str),source,step:s.step,
  diagnostics:{tangent:s.qddot_end?copy(s.qddot_end):null,radial:s.a_rad_end?copy(s.a_rad_end):null,support:s.lambda_hat_end?copy(s.lambda_hat_end):null,
    classes:s.class_contributions_end?Object.fromEntries(['like','unlike','antipode'].map(n=>[n,{multiplicity:s.class_contributions_end[n].multiplicity,tangent:copy(s.class_contributions_end[n].tangent),radial:copy(s.class_contributions_end[n].radial)}])):null,
    supportRate:s.dl_dt_end?copy(s.dl_dt_end):null,
    delays:s.end_classes?Object.fromEntries(Object.entries(s.end_classes).map(([n,c])=>[n,{delay:c.tau?copy(c.tau):null,sourceTime:c.delayed_arg?copy(c.delayed_arg):null,transmitter:c.Dt?copy(c.Dt):null}])):null}
};}
function controls(){
  assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const s={certified:true,t_int:['0.20','0.21000001'],end_q_str:['-1','2'],end_v_str:['-3','-2'],step:7};
  const p=sample(s,2);assert.deepEqual(p.t,['0.21','0.21000001']);assert.deepEqual(p.w,['-3','-2']);assert.equal(p.source,2);assert.equal(p.diagnostics.classes,null);
  assert.throws(()=>sample({...s,certified:false},2),/Uncertified/);assert.throws(()=>sample({...s,end_v_str:['3','-2']},2),/interval/);
  console.log('Known signed-interval/time conversion and negative controls PASS before any target source read.');
}
export function build(){
  controls();
  const pins=JSON.parse(fs.readFileSync(path.join(root,'scripts/surface/six-pole-replay-sources.json')));
  const sources=pins.map(p=>{const bytes=fs.readFileSync(resolveResearchSourcePath(root,p.path));if(sha(bytes)!==p.sha256)throw Error('Source identity mismatch: '+p.path);return p;});
  const files=pins.filter(p=>p.role==='history').map(p=>({p,d:JSON.parse(fs.readFileSync(resolveResearchSourcePath(root,p.path))),source:sources.indexOf(p)}));
  const window=files[0].d;
  const record={schema:SIX_POLE_SCHEMA,caseId:SIX_POLE_CASE,title:'Radius 10 · six poles released from rest',preparation:createSixPolePreparation(),
    provenance:{kind:'reviewed-analytical-history',method:'Retained interval analytical method of steps; signed-v49 reconstruction. Display conversion only.',
      interpretation:'Artificial fixed-sphere support; no physical confinement or recurrence claim. Not an EOM solver run or restart.',
      interpolation:'Linear interpolation of interval midpoints for animation only; not a certified continuous trajectory. Before the first retained endpoint, only release and the window-end bounds are available.',
      limitations:['Shared stored-rate, inclusion and arithmetic premises remain those of the scientific review.','The late return-path review lacks its own negative-source-speed known control; its acceptance there retains that inferred-correctness limitation.','Not all early endpoint records retain partner-class diagnostics; missing values are not reconstructed.'],
      time:'Physical T = 10t. Animation uses each uncertain endpoint’s lower time bound; diagnostics retain the full interval.',units:'w = signed speed in wake-speed units; a, radial and support in cf²/R; physical acceleration/support divide by 10; support rate divides by 100.'},
    sources,samples:[{t:['0','0'],q:['0','0'],w:['0','0'],source:0,step:0,diagnostics:{tangent:['0.1','0.1'],radial:['-0.025','-0.025'],support:['0.025','0.025'],classes:null,releaseDerivation:true}},
      {t:copy(window.T_star),q:copy(window.q_at_T_star),w:copy(window.qdot_at_T_star),source:0,step:0,diagnostics:null}],events:[
      {label:'Support turns inward',t:['1.945684593623649597167969','1.946684709182828044891357']},
      {label:'Antipodal release emission received',t:['1.99009345349','1.99009442692']},
      {label:'Forward speed maximum',t:['4.246684593623649597167959','4.266684709182828044891367']},
      {label:'Canonical radial contribution turns outward',t:['5.686684593623649597167959','5.706684709182828044891367']},
      {label:'First local peak of inward support',t:['5.986684593623649597167959','6.176684709182828044891367']},
      {label:'Later local dip of inward support',t:['7.276684593623649597167959','7.426684709182828044891367']},
      {label:'Path turn: forward to backward',t:['7.426684593623649597167959','7.446684709182828044891367']},
      {label:'Like partners receive reversed motion',t:['8.1167','8.1867']}
    ]};
  let previousLower=window.T_star[0],previousUpper=window.T_star[1];
  for(const {p,d,source} of files){
    if(d.controls_all_pass!==true)throw Error('Source controls not admitted: '+p.path);
    if(p.path.includes('cm49-')&&d.affine_format!=='signed-v49')throw Error('Unsigned reconstruction refused');
    for(const s of d.steps){
      if(s.step<p.firstStep||s.step>p.lastStep)continue; // Explicit admitted prefix; later refused candidates remain in the source.
      if(s.certified!==true)throw Error('Unexpected provisional row in selected source: '+p.path);
      if(Math.abs(Number(s.t_int[0])-Number(previousLower))>1e-20||Math.abs(Number(decimalSum(s.t_int[1],'-0.01'))-Number(previousUpper))>1e-20)throw Error('History gap or overlap before '+p.path+' step '+s.step);
      const v=sample(s,source);record.samples.push(v);[previousLower,previousUpper]=v.t;
    }
  }
  validateSixPoleReplay(record);
  const content=JSON.stringify(record),digest=sha(content);
  fs.writeFileSync(target,content);
  fs.writeFileSync(path.join(root,'src/apps/surface/data/SixPoleReplayBinding.js'),`// Binds the reviewed display export, including source identities and limitations.\nexport const SIX_POLE_REPLAY_SHA256='${digest}';\n`);
  console.log(JSON.stringify({target:path.relative(root,target),sha256:digest,samples:record.samples.length,sources:sources.length,bytes:Buffer.byteLength(content),coverage:record.samples.at(-1).t}));
  return record;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){if(process.argv.includes('--known-only'))controls();else if(process.argv.includes('--write'))build();else throw Error('Use --known-only or explicitly --write for the display export.');}
