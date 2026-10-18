import * as THREE from '../../../vendor/three/three.module.js';
import {surfacePoint,surfaceExtent} from './SurfaceGeometry.js';
import {retainedHistories,evaluateSurfacePath,nearestSurfaceDiagnostic} from './SurfaceRecord.js';
// Geometry/camera and retained-history display only. Borg's live controller is
// coupled to its assembly simulation; Surface reuses the shared cubic evaluator.
export function createSurfaceViewer(host) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.append(renderer.domElement);
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,1,0.001,100);camera.up.set(0,0,1);
  let radius=.1,request,record,histories=[],time=0,selected='p0',yaw=.5,pitch=.45,zoom=3.7;
  const group=new THREE.Group();scene.add(group);
  const labels=[];const objects=[];let sphere,arrows=[];
  const colors=[0xf16d78,0x6e9fff];
  function line(points,color,opacity=1,dashed=false){const geometry=new THREE.BufferGeometry().setFromPoints(points);const material=dashed?new THREE.LineDashedMaterial({color,transparent:true,opacity,dashSize:radius*.045,gapSize:radius*.03}):new THREE.LineBasicMaterial({color,transparent:true,opacity});const l=new THREE.Line(geometry,material);if(dashed)l.computeLineDistances();group.add(l);return l;}
  function clear(){for(const a of arrows)a.dispose();for(const child of [...group.children]){group.remove(child);child.geometry?.dispose();if(Array.isArray(child.material))child.material.forEach(m=>m.dispose());else child.material?.dispose();}labels.splice(0).forEach(e=>e.remove());objects.length=0;arrows=[];}
  function setExperiment(next){if(request?.model.geometry.kind!==next.model.geometry.kind)pitch=next.model.geometry.kind==='ring-torus'?.85:.45;request=next;record=null;histories=[];selected=next.paths[0].pathId;time=Number(next.interval.start);radius=surfaceExtent(next.model.geometry);clear();
    const g=next.model.geometry,r=Number(g.radius),q=g.kind==='oblate'?Number(g.flattening):1,torus=g.kind==='ring-torus';
    sphere=new THREE.Mesh(torus?new THREE.TorusGeometry(Number(g.majorRadius),r,32,96):new THREE.SphereGeometry(r,48,32),new THREE.MeshBasicMaterial({color:0x987cc9,transparent:true,opacity:.09,depthWrite:false,side:THREE.DoubleSide}));if(!torus)sphere.scale.z=q;group.add(sphere);
    const point=(longitude,latitude)=>new THREE.Vector3(...surfacePoint(g,longitude,latitude));
    const latitudes=torus?[-180,-120,-60,0,60,120]:[-60,-30,0,30,60];
    for(const lat of latitudes)line(Array.from({length:129},(_,i)=>point(i*Math.PI/64,lat*Math.PI/180)),0x88719f,.35);
    for(let k=0;k<(torus?8:6);k++){const longitude=k*Math.PI/(torus?4:6);line(Array.from({length:129},(_,i)=>point(longitude,i*Math.PI/64)),0x88719f,.35);}
    renderer.domElement.setAttribute('aria-label',`${torus?'Ring torus':q===1?'Sphere':'Oblate spheroid'} and architrino paths. Axis Z. Drag to rotate; scroll to zoom. Arrow keys rotate.`);
    for(const p of request.paths){const color=colors[Number(p.charge)>0?0:1];const h=p.history;
      const point=t=>new THREE.Vector3(Number(h.radius)*Math.cos(Number(h.phase)+Number(h.angularSpeed)*t),Number(h.radius)*Math.sin(Number(h.phase)+Number(h.angularSpeed)*t),Number(h.height));
      line(Array.from({length:81},(_,i)=>point(Number(h.start)+(Number(h.end)-Number(h.start))*i/80)),color,.35,true);
      const marker=new THREE.Mesh(new THREE.SphereGeometry(radius*.034,16,12),new THREE.MeshBasicMaterial({color}));marker.position.copy(point(Number(h.end)));group.add(marker);
      const label=document.createElement('span');label.className='member-label';label.textContent=p.pathId;host.append(label);labels.push(label);objects.push({pathId:p.pathId,marker,label,color,trail:null});
    }
  }
  function setRecord(next){setExperiment(next.request);record=next;histories=retainedHistories(record);
    for(const o of objects){const h=histories.find(p=>p.pathId===o.pathId);if(!h.segments.length)continue;
      const points=[],times=[];for(const s of h.segments){for(let i=0;i<4;i++){const t=Number(s.startTime)+(Number(s.endTime)-Number(s.startTime))*i/4;const p=evaluateSurfacePath(h,t).position;points.push(new THREE.Vector3(p.x,p.y,p.z));times.push(t);}}const p=evaluateSurfacePath(h,h.coverage.end).position;points.push(new THREE.Vector3(p.x,p.y,p.z));times.push(h.coverage.end);
      o.trail=line(points,o.color);o.times=times;
    }setTime(Number(record.results.at(-1).acceptedCoverage.end));
  }
  function setTime(next){time=next;
    for(const o of objects){const h=histories.find(p=>p.pathId===o.pathId);if(!h?.segments.length)continue;const p=evaluateSurfacePath(h,time).position;o.marker.position.set(p.x,p.y,p.z);const i=o.times.findIndex(t=>t>time);o.trail.geometry.setDrawRange(0,i<0?o.times.length:i);}
    for(const a of arrows){group.remove(a);a.dispose();}arrows=[];
    if(record){const row=nearestSurfaceDiagnostic(record,selected,time),o=objects.find(p=>p.pathId===selected);
      for(const [key,color] of [['discardedNormal',0xc09af4],['support',0xffffff]]){if(!row||!o)continue;const mid=row[key].map(v=>(Number(v[0])+Number(v[1]))/2),v=new THREE.Vector3(...mid);if(v.length()>0){const sampleTime=Math.max(histories[0].coverage.start,Math.min(histories[0].coverage.end,(Number(row.reception[0])+Number(row.reception[1]))/2));const sample=evaluateSurfacePath(histories.find(h=>h.pathId===selected),sampleTime).position;const arrow=new THREE.ArrowHelper(v.normalize(),new THREE.Vector3(sample.x,sample.y,sample.z),radius*(key==='support'?.28:.18),color,radius*.05,radius*.035);group.add(arrow);arrows.push(arrow);}}
    }
  }
  let dragging=false,last;renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;last=[e.clientX,e.clientY];renderer.domElement.setPointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointermove',e=>{if(!dragging)return;yaw-=(e.clientX-last[0])*.006;pitch=Math.max(-1.35,Math.min(1.35,pitch+(e.clientY-last[1])*.006));last=[e.clientX,e.clientY];});renderer.domElement.addEventListener('pointerup',()=>dragging=false);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(2.4,Math.min(8,zoom+e.deltaY*.002));},{passive:false});renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Sphere and architrino paths. Drag to rotate; scroll to zoom. Arrow keys rotate.');renderer.domElement.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();yaw+=e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0;pitch=Math.max(-1.35,Math.min(1.35,pitch+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)));});
  let frame;function draw(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.near=radius*.001;camera.far=radius*100;camera.position.set(radius*zoom*Math.cos(pitch)*Math.sin(yaw),radius*zoom*Math.cos(pitch)*Math.cos(yaw),radius*zoom*Math.sin(pitch));camera.lookAt(0,0,0);camera.updateProjectionMatrix();renderer.render(scene,camera);for(const o of objects){const p=o.marker.position.clone().project(camera);o.label.style.transform=`translate(${(p.x+1)*w/2+9}px,${(1-p.y)*h/2-9}px)`;}frame=requestAnimationFrame(draw);}draw();
  return {setExperiment,setRecord,setTime,select(id){selected=id;setTime(time);},resetCamera(){yaw=.5;pitch=request?.model.geometry.kind==='ring-torus'?.85:.45;zoom=3.7;},dispose(){cancelAnimationFrame(frame);clear();renderer.dispose();renderer.domElement.remove();}};
}
