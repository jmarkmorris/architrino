// Explicit-use controls for the operator-selected support plots. No recurring
// suite enrollment, solver execution or scientific target qualification.
import assert from 'node:assert/strict';
import {buildSurfaceSupportData,surfaceSupportSummary,projectSurfaceSupport,absoluteSupportInterval,longestSupportSpan} from '../../src/apps/surface/SurfaceSupportData.js';
import {createSixPolePreparation} from '../../src/apps/surface/SurfaceSixPoleReplay.js';
const encloses=(p,x)=>assert.ok(p&&p[0]<=x&&p[1]>=x,`${JSON.stringify(p)} must enclose ${x}`);
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} vs ${b}`);
const midpoint=p=>(p[0]+p[1])/2;
const sphere={kind:'sphere',radius:'1'};
for(const value of [-2,0,2])encloses(projectSurfaceSupport(sphere,[[1,1],[0,0],[0,0]],[[value,value],[0,0],[0,0]]),value);
assert.deepEqual(absoluteSupportInterval([-2,3]),[0,3]);
assert.deepEqual(absoluteSupportInterval([-3,-2]),[2,3]);
// At the oblate 3/5, 4/5 latitude with q=1/2, gradient direction is (3,0,8)/sqrt(73).
encloses(projectSurfaceSupport({kind:'oblate',radius:'1',flattening:'0.5'},[[.6,.6],[0,0],[.4,.4]],[[3,3],[0,0],[8,8]]),Math.sqrt(73));
// Inner-wall outward is toward the central hole, opposite the global radial direction.
encloses(projectSurfaceSupport({kind:'ring-torus',radius:'1',majorRadius:'2'},[[1,1],[0,0],[0,0]],[[-2,-2],[0,0],[0,0]]),2);
encloses(projectSurfaceSupport({kind:'ring-torus',radius:'1',majorRadius:'2'},[[3,3],[0,0],[0,0]],[[2,2],[0,0],[0,0]]),2);
assert.equal(projectSurfaceSupport(sphere,[[-1,1],[-1,1],[-1,1]],[[1,1],[0,0],[0,0]]),null);
function record(support2){
  const paths=[{pathId:'p',charge:'1'},{pathId:'e',charge:'-1'}];
  return {request:{model:{geometry:sphere},interval:{start:'0'},paths},results:[{acceptedCoverage:{end:'1'},publishedExtensions:paths.map((p,i)=>({pathId:p.pathId,segments:[{start:'0',end:'1',coefficients:[[i?'-1':'1','0','0','0'],['0','0','0','0'],['0','0','0','0']],positionErrors:['0','0','0']}]})),surfaceDiagnostics:paths.map((p,i)=>({pathId:p.pathId,reception:['0','1'],support:[[String(i?support2:2),String(i?support2:2)],['0','0'],['0','0']]}))}]};
}
// Opposite signed scalars do not cancel the population's magnitude sum.
let data=buildSurfaceSupportData(record(2));
encloses(data.members[0].rows[0].value,2);encloses(data.members[1].rows[0].value,-2);encloses(data.total[0].value,4);
encloses(surfaceSupportSummary(data,0,1).mean,4);encloses(surfaceSupportSummary(data,0,1).perMember,2);
// Equal outward scalars on antipodes have zero vector sum but total support 4.
data=buildSurfaceSupportData(record(-2));encloses(data.members[1].rows[0].value,2);encloses(data.total[0].value,4);
const missing=record(-2);missing.results[0].surfaceDiagnostics.pop();
data=buildSurfaceSupportData(missing);assert.equal(surfaceSupportSummary(data,0,1).available,false);assert.equal(longestSupportSpan(data),null);
for(const count of [2,4,8,12]){
  const base=record(-2),paths=Array.from({length:count},(_,i)=>({pathId:`m${i}`,charge:i%2?'-1':'1'}));
  const template=base.results[0].publishedExtensions[0];base.request.paths=paths;
  base.results[0].publishedExtensions=paths.map(p=>({...structuredClone(template),pathId:p.pathId}));
  base.results[0].surfaceDiagnostics=paths.map(p=>({pathId:p.pathId,reception:['0','1'],support:[['2','2'],['0','0'],['0','0']]}));
  const full=buildSurfaceSupportData(base),summary=surfaceSupportSummary(full,0,1);encloses(summary.mean,2*count);encloses(summary.perMember,2);
}
const sample=(t,support)=>({t:[String(t),String(t)],diagnostics:support===null?null:{support:[String(support),String(support)]}});
const replay={schema:'surface_analytical_replay/v1',preparation:createSixPolePreparation(),samples:[sample(0,0),sample(.1,20),sample(.4,0)]};
data=buildSurfaceSupportData(replay);
assert.equal(data.members.length,6);close(data.members[0].rows[1].clock,1);encloses(data.members[0].rows[1].value,2);encloses(data.total[1].value,12);
// Independently specified triangular sampled S: (0,0), (1,12), (4,0): area 24, mean 6 (row mean would be 4).
let summary=surfaceSupportSummary(data,0,4);assert.equal(summary.available,true);assert.equal(summary.estimated,true);close(midpoint(summary.mean),6);close(midpoint(summary.perMember),1);
replay.samples[1]=sample(.1,null);data=buildSurfaceSupportData(replay);assert.equal(surfaceSupportSummary(data,0,4).available,false);
// Frozen independent reference: scaled release support .025 at R=10 gives physical 1/400; six members total 3/200.
replay.samples=[sample(0,.025),sample(.1,.025),sample(.2,.025)];data=buildSurfaceSupportData(replay);encloses(data.members[0].rows[0].value,1/400);encloses(data.total[0].value,3/200);
// A missing intermediate observation splits the allowed estimation span.
replay.samples=[sample(0,1),sample(.1,null),sample(.2,1),sample(.4,1)];data=buildSurfaceSupportData(replay);assert.deepEqual(longestSupportSpan(data),[2,4]);assert.equal(surfaceSupportSummary(data,0,4).available,false);assert.equal(surfaceSupportSummary(data,2,4).available,true);
assert.equal(surfaceSupportSummary(data,2,2).available,false);
console.log('PASS: signed/zero support, oblate normal, inner/outer torus orientation, uncertain normal refusal, magnitude-before-sum, antipodal cancellation, missing members, supported population sizes, six-member multiplicity, uneven-time weighting, gap splitting, radius-ten conversion, independent release 1/400. No trajectory evolved.');
