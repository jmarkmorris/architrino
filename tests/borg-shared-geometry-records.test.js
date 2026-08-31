import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { BORG_BRAID_RECORD_CATALOG } from '../src/apps/borg/BorgBraidRecordCatalog.js';
import { createEomHistoryDataset } from '../src/apps/shared/EomHistoryDataset.mjs';
import { describeBorgOrbitTrails } from '../src/apps/borg/BorgOrbitTrails.mjs';
import { validatePrescribedAssemblySpec } from '../src/prescribed-geometry/PrescribedAssemblySpec.mjs';
const entries=BORG_BRAID_RECORD_CATALOG.entries.filter(e=>/^(SC-|SS-|PV-)/.test(e.label));
const alias=e=>e.label.split(' —')[0];
const raw=e=>JSON.parse(readFileSync(e.recordUrl));
const source=e=>JSON.parse(readFileSync(raw(e).provenance.generatingSpec));
const distance=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const positions=(d,t)=>d.worldlines.map(w=>{const {x,y,z}=d.evaluateWorldline(w.id,t).position;return [x,y,z];});
const near=(actual,expected,tol=1e-5)=>assert.ok(Math.abs(actual-expected)<tol,`${actual} vs ${expected}`);

test('the nineteen new examples have neutral inventory, finite history, and no inferred braid count',()=>{
 assert.equal(entries.length,19);
 for(const e of entries){const r=raw(e),s=source(e);validatePrescribedAssemblySpec(s);
  assert.equal(r.provenance.prescribedGeometry.physicsInvoked,false);
  assert.equal(r.provenance.evidenceStatus,'display-only');
  assert.equal(s.constituents.reduce((q,c)=>q+c.polarity,0),0);
  assert.equal(s.constraints.speedGuard.normalizedFieldSpeed,1);
  if(!['SC-03','SS-C5','SS-C6'].includes(alias(e)))assert.equal(s.relationships.componentBraids.length,0);
 }
});

test('shared rings follow the analytical regular polygon, including member-owned arc lengths',()=>{
 for(const e of entries.filter(e=>e.label.startsWith('SC-'))){const s=source(e),d=createEomHistoryDataset(raw(e)),n=Number(alias(e).slice(3)),r=s.geometry.sharedCircle.radius,w=s.geometry.sharedCircle.angularRate,P=s.history.returnPeriod;
  assert.equal(d.worldlines.length,2*n);
  const initial=positions(d,0),minimum=2*r*Math.sin(Math.PI/(2*n));
  for(const t of [0,P*.237,P,P*1.731]){
   const p=positions(d,t);p.forEach((v,i)=>{near(v[2],0);near(Math.hypot(...v),r,1e-5*r);
    const [x,y]=initial[i],c=Math.cos(w*t),sn=Math.sin(w*t);
    near(distance(v,[c*x-sn*y,sn*x+c*y,0]),0,1e-5*r);
   });
   const distances=p.flatMap((a,i)=>p.slice(i+1).map(b=>distance(a,b)));
   near(Math.min(...distances),minimum,1e-5*r);
  }
  const trails=[...describeBorgOrbitTrails(d).values()];
  trails.forEach(row=>near(row.duration,P/(2*n),1e-10));
  // Antipodal signs alternate only for odd N; this must not fabricate pairs.
  assert.equal(s.relationships.neutralPairs.length,n%2?n:0);
 }
});

test('two-ring spheres preserve the common radius and opposite circulation distinction',()=>{
 for(const e of entries.filter(e=>e.label.startsWith('SS-'))){const s=source(e),d=createEomHistoryDataset(raw(e));
  assert.equal(d.worldlines.length,12);assert.equal(s.relationships.componentBraids.length,2);
  for(const t of [0,.937,2.37,4,7.213])positions(d,t).forEach(p=>{near(Math.hypot(...p),.5);near(Math.abs(p[2]),.3);near(Math.hypot(p[0],p[1]),.4);});
  const groups=s.relationships.componentBraids.map(g=>s.worldlines.filter(w=>g.members.includes(w.constituentId)));
  const rates=groups.map(g=>g.map(w=>w.operator.angularVelocity));
  assert.ok(rates[0].every(w=>w===Math.PI/2));
  assert.ok(rates[1].every(w=>w===(alias(e)==='SS-C5'?1:-1)*Math.PI/2));
 }
});

test('Platonic records have the independently known edge graph and retain every pair distance',()=>{
 // Elementary regular-solid edge counts/degrees; no expected coordinates are
 // imported from the subject's construction or the enumeration instrument.
 const graphs={'PV-04':[4,6,3],'PV-06':[6,12,4],'PV-08':[8,12,3],'PV-12':[12,30,5],'PV-20':[20,30,3]};
 for(const e of entries.filter(e=>e.label.startsWith('PV-'))){const d=createEomHistoryDataset(raw(e)),[count,edges,degree]=graphs[alias(e)],p0=positions(d,0);
  assert.equal(p0.length,count);const pairs=[];
  for(let i=0;i<count;i++)for(let j=i+1;j<count;j++)pairs.push([i,j,distance(p0[i],p0[j])]);
  const edge=Math.min(...pairs.map(p=>p[2])),adj=pairs.filter(p=>Math.abs(p[2]-edge)<1e-12);
  assert.equal(adj.length,edges);for(let i=0;i<count;i++)assert.equal(adj.filter(p=>p[0]===i||p[1]===i).length,degree);
  for(const t of [.317,1.237,3.731,6.113]){const p=positions(d,t);p.forEach(v=>near(Math.hypot(...v),.5));pairs.forEach(([i,j,length])=>near(distance(p[i],p[j]),length));}
 }
});

test('report-only speed metadata checks the actual bound without inventing a migration or a ceiling',()=>{
 const s=source(entries.find(e=>alias(e)==='SC-03'));
 assert.ok(s.constraints.speedGuard.observedBound>1);
 assert.equal(s.constraints.speedGuard.migrationBoundary,undefined);
 validatePrescribedAssemblySpec(s);
 const wrong=structuredClone(s);wrong.constraints.speedGuard.observedBound=.1;
 assert.throws(()=>validatePrescribedAssemblySpec(wrong),/observedBound/);
 const capped=structuredClone(s);capped.constraints.speedGuard.policy='reject';
 assert.throws(()=>validatePrescribedAssemblySpec(capped),/speed guard failed/);
});

test('shared arcs use each preceding phase gap and fail closed for counter-rotation or coincidence',()=>{
 const e=entries.find(e=>alias(e)==='SC-02'),data=raw(e),sources=data.provenance.prescribedGeometry.coordinates.worldlines;
 // Unequal gaps in quarters of a turn: 1/8, 1/4, 1/4, 3/8.
 const phases=[0,Math.PI/4,3*Math.PI/4,5*Math.PI/4],expected=[3*Math.PI/4,Math.PI/4,Math.PI/2,Math.PI/2];
 sources.forEach((row,i)=>{row.operator.phaseAtEpoch=phases[i];row.operator.angularVelocity=1;});
 [...describeBorgOrbitTrails(data).values()].forEach((r,i)=>near(r.duration,expected[i],1e-12));
 sources.forEach(row=>row.operator.angularVelocity=-1);
 [...describeBorgOrbitTrails(data).values()].forEach((r,i)=>near(r.duration,expected[(i+1)%4],1e-12));
 sources[0].operator.angularVelocity=1;
 assert.ok([...describeBorgOrbitTrails(data).values()].every(r=>r.mode==='unavailable'));
 sources.forEach(row=>row.operator.angularVelocity=1);sources[1].operator.phaseAtEpoch=0;
 assert.ok([...describeBorgOrbitTrails(data).values()].every(r=>r.mode==='unavailable'));
});
