import * as THREE from '../../../vendor/three/three.module.js';
import { evaluateEomCubicHistoryAtTime as evaluate } from '../shared/EomCubicHistoryEvaluation.mjs';
import { latticePatchHistories } from './LatticeDisturbanceExperiment.js';

export function createLatticeDisturbanceViewer(host) {
  const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setClearColor(0x0d0a17);renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.append(renderer.domElement);
  const scenes=[new THREE.Scene(),new THREE.Scene()],groups=[new THREE.Group(),new THREE.Group()];scenes.forEach((s,i)=>s.add(groups[i]));
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,100);camera.up.set(0,0,1);
  const sphere=new THREE.SphereGeometry(.075,24,16),canvas=renderer.domElement;
  let members=[],histories=[],baseline=[],span=3,spacing=1,yaw=.6,pitch=.45,zoom=2.8,gain=100,time=0,frame,previous,dragging=false;
  function clear(){for(const group of groups)for(const child of [...group.children]){group.remove(child);child.traverse(node=>{if(node.geometry!==sphere)node.geometry?.dispose();node.material?.dispose();});}members=[];}
  const prepared=paths=>paths.map(p=>({pathId:p.pathId,coverage:{start:Number(p.history.segments[0].start),end:0},segments:p.history.segments.map(s=>({...s,startTime:s.start,endTime:s.end}))}));
  function setPreparation(request,settings={}){
    clear();spacing=settings.spacing??1;span=Math.cbrt(request.paths.length);histories=prepared(request.paths);baseline=[];
    for(const path of request.paths){
      const color=path.charge==='1'?0xff0000:0x0000ff,markers=groups.map(group=>{const marker=new THREE.Mesh(sphere,new THREE.MeshBasicMaterial({color}));group.add(marker);return marker;});
      const base=path.pathId.split('-').slice(1).map(i=>Number(i)-(span-1)/2);
      const vector=new THREE.ArrowHelper(new THREE.Vector3(1,0,0),new THREE.Vector3(...base),0,0xffd36a);
      vector.line.geometry=vector.line.geometry.clone();vector.cone.geometry=vector.cone.geometry.clone();vector.visible=false;groups[1].add(vector);
      members.push({path,markers,base,vector});
    }
    setTime(settings.preparation==='pulse'?-spacing/4:0);
  }
  function setRecord(record){
    setPreparation(record.request,record.settings);histories=latticePatchHistories(record);
    if(record.schema==='lattice_patch_record/v2')baseline=latticePatchHistories(record,true);
    setTime(Number(record.parts?.at(-1)?.acceptedCoverage.end??record.result?.acceptedCoverage.end??0));
  }
  function setTime(next){
    time=next;let displacement=0,speed=0,uncertainty=0,addedMotion=baseline.length&&time>=0?0:null;
    for(const member of members){
      const h=histories.find(h=>h.pathId===member.path.pathId);if(!h||time<h.coverage.start||time>h.coverage.end)continue;
      const sample=evaluate(h,time),p=sample.position,v=sample.velocity,p0=evaluate(h,0).position;
      const position=[p.x,p.y,p.z],start=[p0.x,p0.y,p0.z];member.markers[0].position.set(...position.map(x=>x/spacing));
      const motion=position.map((x,i)=>x-start[i]);displacement=Math.max(displacement,Math.hypot(...motion));speed=Math.max(speed,Math.hypot(v.x,v.y,v.z));uncertainty=Math.max(uncertainty,sample.errorBound);
      let delta=time>=0?motion:[0,0,0];
      const b=baseline.find(h=>h.pathId===member.path.pathId);
      if(b&&time>=0&&time<=b.coverage.end){const q=evaluate(b,time),q0=evaluate(b,0);const qb=[q.position.x,q.position.y,q.position.z],qb0=[q0.position.x,q0.position.y,q0.position.z];delta=motion.map((x,i)=>x-(qb[i]-qb0[i]));addedMotion=Math.max(addedMotion??0,Math.hypot(...delta));uncertainty=Math.max(uncertainty,sample.errorBound+q.errorBound);}
      const magnified=member.base.map((x,i)=>x+gain*delta[i]/spacing);member.markers[1].position.set(...magnified);
      const direction=new THREE.Vector3(...magnified).sub(new THREE.Vector3(...member.base)),length=direction.length();
      member.vector.visible=length>1e-5;if(length>1e-5){member.vector.setDirection(direction.normalize());member.vector.setLength(length,Math.min(.12,length*.25),Math.min(.07,length*.15));}
    }
    return {displacement,speed,uncertainty,addedMotion};
  }
  canvas.tabIndex=0;canvas.setAttribute('aria-label','Synchronized lattice views: true positions on the left; magnified motion on the right. Equal-sized solid red positrinos and blue electrinos. Drag or use arrow keys to rotate both; scroll to zoom.');
  canvas.addEventListener('pointerdown',e=>{dragging=true;previous=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;yaw-=(e.clientX-previous[0])*.006;pitch=Math.max(-1.4,Math.min(1.4,pitch+(e.clientY-previous[1])*.006));previous=[e.clientX,e.clientY];});
  canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
  canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(1.5,Math.min(7,zoom+e.deltaY*.002));},{passive:false});
  canvas.addEventListener('keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();yaw+=e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0;pitch=Math.max(-1.4,Math.min(1.4,pitch+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)));});
  function draw(){
    const width=Math.max(1,host.clientWidth),height=Math.max(1,host.clientHeight),paneWidth=Math.floor(width/2);
    if(canvas.width!==Math.floor(width*renderer.getPixelRatio())||canvas.height!==Math.floor(height*renderer.getPixelRatio()))renderer.setSize(width,height,false);
    renderer.setScissorTest(false);renderer.clear();renderer.setScissorTest(true);
    for(let i=0;i<2;i++){
      const w=i?width-paneWidth:paneWidth,viewHeight=Math.max(1,height-140),aspect=w/viewHeight,half=span*zoom*Math.tan(20*Math.PI/180)/Math.min(1,aspect);
      camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;
      camera.position.set(span*zoom*Math.sin(yaw)*Math.cos(pitch),span*zoom*Math.cos(yaw)*Math.cos(pitch),span*zoom*Math.sin(pitch));camera.lookAt(0,0,0);camera.updateProjectionMatrix();
      for(const member of members)member.markers[i].scale.setScalar(120*half/viewHeight);
      renderer.setViewport(i*paneWidth,0,w,viewHeight);renderer.setScissor(i*paneWidth,0,w,viewHeight);renderer.render(scenes[i],camera);
    }
    frame=requestAnimationFrame(draw);
  }draw();
  return {setPreparation,setRecord,setTime,setGain(value){gain=value;setTime(time);},dispose(){cancelAnimationFrame(frame);clear();sphere.dispose();renderer.dispose();canvas.remove();}};
}
