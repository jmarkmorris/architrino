import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import * as THREE from "../vendor/three/three.module.js";
import { borgPolarityColor, borgTrailSegments, describeBorgOrbitTrails } from "../src/apps/borg/BorgOrbitTrails.mjs";
import { createBorgAssemblyViewScene } from "../src/apps/borg/BorgAssemblyViewScene.js";
import { createBorgPathTrails } from "../src/apps/borg/BorgPathTrails.js";
import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { describeLibraryRecord, createLibraryPreview } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";

// Hand-authored source controls: x=(cos T,sin T,0), -x; c_f=1.
function paired(height=0) {
  return { provenance:{engineId:"prescribed-geometry",prescribedGeometry:{coordinates:{
    relationships:{neutralPairs:[{members:["red","blue"]}]},
    worldlines:[1,-1].map((sign,i)=>({id:String(i),constituentId:sign===1?"red":"blue",operator:{
      kind:"moving-circular.v1",epochTime:0,centerAtEpoch:[0,0,sign*height],centerVelocity:[0,0,0],
      radiusU:[sign,0,0],radiusV:[0,sign,0],angularVelocity:1,angularAcceleration:0,phaseAtEpoch:0,
    }})),
  }}},window:{start:0,end:8},worldlines:[{id:"0",polarity:1},{id:"1",polarity:-1}] };
}

test("a two-occupant antipodal circle has two half-turn tails; separate circles each have a full turn",()=>{
  for(const height of [0,0.5]) {
    const rows=[...describeBorgOrbitTrails(paired(height)).values()];
    assert.deepEqual(rows.map(r=>r.duration),[height?2*Math.PI:Math.PI,height?2*Math.PI:Math.PI]);
    assert.ok(rows.every(r=>r.mode===(height?"full-turn":"half-turn") && r.fade===!height));
  }
  const reverse=paired();
  reverse.provenance.prescribedGeometry.coordinates.worldlines.forEach(row=>row.operator.angularVelocity=-1);
  assert.ok([...describeBorgOrbitTrails(reverse).values()].every(r=>r.duration===Math.PI));
});

test("multiply occupied geometry without confirmed antipodal ownership never invents a binary split",()=>{
  const data=paired();
  data.provenance.prescribedGeometry.coordinates.relationships.neutralPairs=[];
  assert.ok([...describeBorgOrbitTrails(data).values()].every(r=>r.mode==="unavailable"));
  const phased=paired();phased.provenance.prescribedGeometry.coordinates.worldlines[1].operator.phaseAtEpoch=.5;
  assert.ok([...describeBorgOrbitTrails(phased).values()].every(r=>r.mode==="unavailable"));
  const missing=paired(.5);missing.provenance.prescribedGeometry.coordinates.worldlines.pop();
  assert.ok([...describeBorgOrbitTrails(missing).values()].every(r=>r.mode==="unavailable"));
});

test("trail clipping has exact fractional endpoints, fade, rewind and no future wrap",()=>{
  const times=[0,1,2,3,4],points=times.map(t=>[t,0,0]);
  const rows=borgTrailSegments(points,times,3.5,1.25,true);
  assert.equal(rows[0].start,2.25);assert.equal(rows.at(-1).end,3.5);
  assert.deepEqual(rows[0].a,[2.25,0,0]);assert.deepEqual(rows.at(-1).b,[3.5,0,0]);
  assert.equal(rows[0].startAlpha,0);assert.equal(rows.at(-1).endAlpha,1);
  assert.ok(rows.every(r=>r.startAlpha<=r.endAlpha && r.start>=2.25 && r.end<=3.5));
  assert.ok(borgTrailSegments(points,times,3.5,2,false).every(r=>r.startAlpha===1&&r.endAlpha===1));
  assert.equal(borgTrailSegments(points,times,0,2).length,0);
  const young=borgTrailSegments(points,times,.25,2);
  assert.equal(young[0].start,0);assert.equal(young.at(-1).end,.25);
});

test("live retained and compacted paths ignore alternate style colors and reject unknown polarity",()=>{
  assert.equal(borgPolarityColor(1),0xff0000);assert.equal(borgPolarityColor(-1),0x0000ff);
  assert.throws(()=>borgPolarityColor(0),/polarity/);
  const group=new THREE.Group();
  const trails=createBorgPathTrails({group,renderOrder:1,getStyle:()=>({color:0xff0000,pathColor:0xabcdef,velocityColor:0xffffff}),toWorld:(p,v)=>Object.assign(v,p)});
  const row={pathKey:1,frameIndex:0,time:0,position:{x:0,y:0,z:0}};
  trails.appendFrameRows([row,{...row,frameIndex:1,time:1}]);
  trails.setCompactedPathHistory({1:[row,{...row,frameIndex:1,time:1}]});
  assert.ok(group.children.every(line=>line.material.color.getHex()===0xff0000));
  trails.dispose();
});

test("all catalog scenes and library previews share expected per-worldline spans and exact colors",()=>{
  for(const entry of BORG_ASSEMBLY_RECORD_CATALOG.entries) {
    const raw=JSON.parse(readFileSync(entry.recordUrl)),dataset=createEomHistoryDataset(raw);
    const policies=describeBorgOrbitTrails(dataset);
    const root=new THREE.Group(),scene=createBorgAssemblyViewScene({group:root,toWorld:(p,v)=>v.set(p.x,p.y,p.z),render(){}});
    scene.setRecord({dataset});scene.setDisplayMode("chart-pose");scene.updateTime(dataset.window.end);
    const group=root.children.find(g=>g.userData.kind==="prescribed-path-history-strands");
    const preview=createLibraryPreview(describeLibraryRecord(raw,entry,"control"));
    const staticRecord=raw.worldlines.every(line=>line.segments.every(segment=>segment.coefficients.every(axis=>axis.slice(1).every(value=>value===0))));
    assert.ok(group.children.length===dataset.worldlines.length||(staticRecord&&group.children.length===0));
    assert.equal(preview.paths.length,dataset.worldlines.length);
    if(group.children.length===0){ assert.equal(staticRecord,true); scene.dispose(); continue; }
    group.children.forEach((line,i)=>{
      const trail=line.userData.trailPolicy,segments=line.userData.visibleSegments;
      const expected=policies.get(dataset.worldlines[i].id).mode;
      assert.equal(trail.mode,expected,entry.label);assert.equal(preview.paths[i].trailMode,expected,entry.label);
      assert.equal(line.material.color.getHex(),dataset.worldlines[i].polarity===1?0xff0000:0x0000ff);
      assert.equal(line.material.opacity,1);assert.equal(line.material.vertexColors,true);
      if(expected==="unavailable") { assert.equal(segments.length,0,entry.label); return; }
      assert.ok(segments.length>0,entry.label);assert.equal(segments.at(-1).end,dataset.window.end);
      assert.ok(Math.abs(segments[0].start-Math.max(dataset.window.start,dataset.window.end-trail.duration))<1e-10);
      assert.equal(segments.at(-1).endAlpha,1);
      if(!["half-turn","multi-occupant-arc"].includes(expected))assert.ok(segments.every(s=>s.startAlpha===1&&s.endAlpha===1));
    });
    scene.updateTime(dataset.window.start);
    assert.ok(group.children.every(line=>line.geometry.drawRange.count===0));
    scene.dispose();
  }
});
