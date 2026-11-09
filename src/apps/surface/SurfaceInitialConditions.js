import {decimalProduct,decimalRatio,validateSurfaceGeometry,surfaceExtent} from './SurfaceGeometry.js';
import {PHASES,preparationCircle} from './SurfaceExperiment.js';
import {errorBoundChecking} from '../shared/ErrorBoundChecking.js';
export const DEFAULT_SURFACE_INITIAL_CONDITIONS=Object.freeze({schema:'surface_initial_conditions/v1',layout:'equator',velocity:'coherent',seed:'1',speed:'0.05',latitude:'equator'});
const dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const scale=(a,s)=>a.map(x=>x*s),add=(a,b)=>a.map((x,i)=>x+b[i]),unit=a=>scale(a,1/Math.hypot(...a));
function random(seed){let n=2166136261;for(const c of seed)n=Math.imul(n^c.charCodeAt(0),16777619);return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
export function surfaceInitialState(path){const h=path.history;if(h.kind==='uniform-circular'){const a=Number(h.phase),r=Number(h.radius),w=Number(h.angularSpeed);return {position:[r*Math.cos(a),r*Math.sin(a),Number(h.height)],velocity:[-r*w*Math.sin(a),r*w*Math.cos(a),0]};}const s=h.segments.at(-1),t=Number(s.end)-Number(s.start);return {position:s.coefficients.map(c=>{const a=c.map(Number);return a[0]+t*(a[1]+t*(a[2]+t*a[3]));}),velocity:s.coefficients.map(c=>{const a=c.map(Number);return a[1]+t*(2*a[2]+3*t*a[3]);})};}
function cubicPast(curve,depth,extent){const count=Math.ceil(depth/.02),segments=[];for(let i=0;i<count;i++){const start=-depth+depth*i/count,end=i===count-1?0:-depth+depth*(i+1)/count,dt=end-start,a=curve(start),b=curve(end);segments.push({start:String(start),end:String(end),coefficients:a.position.map((x,k)=>{const delta=b.position[k]-x,v=a.velocity[k],w=b.velocity[k];return [x,v,3*delta/dt**2-(2*v+w)/dt,-2*delta/dt**3+(v+w)/dt**2].map(String);}),positionErrors:Array(3).fill(String(1e-12*Math.max(1,extent))),velocityErrors:Array(3).fill('1e-12')});}return {kind:'cubic',segments};}
export function prepareSurfaceInitialConditions(original,settings=DEFAULT_SURFACE_INITIAL_CONDITIONS){
 const r=structuredClone(original),c={...DEFAULT_SURFACE_INITIAL_CONDITIONS,...settings},g=validateSurfaceGeometry(r.model.geometry),n=r.paths.length,R=Number(g.radius),rings=g.kind==='parallel-rings';
 if(!['equator','poles'].includes(c.layout)||!['coherent','random','rest'].includes(c.velocity)||typeof c.seed!=='string'||!c.seed.trim()||c.seed.length>80||!(Number(c.speed)>0&&Number(c.speed)<1))throw new Error('Choose a layout, a velocity mode, a nonempty seed and a speed between zero and wake speed 1.');
 if(c.layout==='poles'&&(g.kind!=='sphere'||n!==6))throw new Error('Six coordinate poles require a sphere and six architrinos.');
 if(errorBoundChecking(r)==='strict'&&(rings||c.layout==='poles'||c.velocity!=='coherent'))throw new Error('Polar, random, rest and two-ring preparations currently require checking None. Strict remains available for exact latitude-circle preparations.');
 const depth=Math.max(.5,Math.ceil((2*surfaceExtent(g)+.1)*4)/4),rnd=random(c.seed),extent=surfaceExtent(g);
 if(Math.ceil(depth/.02)>10000)throw new Error('The prepared history exceeds this viewer’s segment budget. Reduce the geometry size.');
 r.runId=`surface-${crypto.randomUUID()}`;
 r.paths=Array.from({length:n},(_,i)=>{
  const phase=Number(n===6?PHASES[i]:i*2*Math.PI/n),charge=i%2?'-1':'1',pathId=`p${i}`;
  if(!rings&&c.layout==='equator'&&c.velocity==='coherent'){try{const circle=preparationCircle(g,c.latitude);return {pathId,charge,history:{kind:'uniform-circular',start:String(-depth),end:'0',maximumSegmentStep:'0.02',radius:circle.rho,height:circle.height,angularSpeed:decimalRatio(c.speed,circle.rho),speed:c.speed,phase:n===6?PHASES[i]:String(phase)}};}catch(error){if(errorBoundChecking(r)==='strict')throw error;}}
  let position,t1,t2,theta=phase,phi=0;
  if(rings){theta=(i%(n/2))*2*Math.PI/(n/2);position=[(i<n/2?-1:1)*Number(g.separation)/2,R*Math.cos(theta),R*Math.sin(theta)];t1=[0,-Math.sin(theta),Math.cos(theta)];t2=t1;}
  else if(g.kind==='ring-torus'){const circle=preparationCircle(g,c.latitude),rho=Number(circle.rho);phi=Math.atan2(Number(circle.height),rho-Number(g.majorRadius));position=[rho*Math.cos(theta),rho*Math.sin(theta),Number(circle.height)];t1=[-Math.sin(theta),Math.cos(theta),0];t2=[-Math.sin(phi)*Math.cos(theta),-Math.sin(phi)*Math.sin(theta),Math.cos(phi)];}
  else {const q=g.kind==='oblate'?Number(g.flattening):1;if(c.layout==='poles'){position=Array(3).fill(0);position[Math.floor(i/2)]=(i%2?-1:1)*R;}else{const circle=preparationCircle(g,c.latitude);position=[Number(circle.rho)*Math.cos(theta),Number(circle.rho)*Math.sin(theta),Number(circle.height)];}const normal=unit([position[0],position[1],position[2]/q**2]);t1=unit(cross(Math.abs(normal[2])<.9?[0,0,1]:[1,0,0],normal));t2=unit(cross(normal,t1));}
  const speed=c.velocity==='rest'?0:Number(c.speed)*(c.velocity==='random'?rnd():1),angle=c.velocity==='random'?rnd()*2*Math.PI:0;
  const velocity=scale(rings?scale(t1,c.velocity==='random'&&(angle>Math.PI)?-1:1):add(scale(t1,Math.cos(angle)),scale(t2,Math.sin(angle))),speed);
  let curve;
  if(rings){const w=dot(velocity,t1)/R,x=position[0];curve=t=>({position:[x,R*Math.cos(theta+w*t),R*Math.sin(theta+w*t)],velocity:[0,-R*w*Math.sin(theta+w*t),R*w*Math.cos(theta+w*t)]});}
  else if(g.kind==='ring-torus'){const a=dot(velocity,t1)/Math.hypot(position[0],position[1]),b=dot(velocity,t2)/R,M=Number(g.majorRadius);curve=t=>{const u=theta+a*t,v=phi+b*t,rho=M+R*Math.cos(v);return {position:[rho*Math.cos(u),rho*Math.sin(u),R*Math.sin(v)],velocity:[-rho*a*Math.sin(u)-R*b*Math.sin(v)*Math.cos(u),rho*a*Math.cos(u)-R*b*Math.sin(v)*Math.sin(u),R*b*Math.cos(v)]};};}
  else {const axes=[R,R,R*(g.kind==='oblate'?Number(g.flattening):1)],u=position.map((x,k)=>x/axes[k]),v=velocity.map((x,k)=>x/axes[k]),w=Math.hypot(...v),vhat=w?scale(v,1/w):[0,0,0];curve=t=>({position:axes.map((a,k)=>a*(u[k]*Math.cos(w*t)+vhat[k]*Math.sin(w*t))),velocity:axes.map((a,k)=>a*w*(-u[k]*Math.sin(w*t)+vhat[k]*Math.cos(w*t)))});}
  return {pathId,charge,history:cubicPast(curve,depth,extent)};
 });return r;
}
export function editSurfaceInitialConditions(original,settings,field,value){
 const c={...DEFAULT_SURFACE_INITIAL_CONDITIONS,...settings},r=structuredClone(original),g=r.model.geometry;
 if(field==='layout')c.layout=value;else if(field==='velocity-mode')c.velocity=value;else if(field==='seed')c.seed=value;else if(field==='speed')c.speed=value;
 else if(field==='shape'){r.model.geometry={kind:value,radius:g.radius,...(value==='oblate'?{flattening:'0.6'}:value==='ring-torus'?{majorRadius:decimalProduct(g.radius,'3')}:value==='parallel-rings'?{separation:'0.02'}:{})};c.latitude='equator';if(value!=='sphere')c.layout='equator';}
 else if(field==='population'){const n=Number(value);if(!Number.isInteger(n)||n<2||n>12||n%2)throw new Error('Choose an even population from 2 to 12.');r.paths=Array.from({length:n},()=>({}));}
 else if(field==='radius')g.radius=value;else if(field==='flattening')g.flattening=value;else if(field==='major-radius')g.majorRadius=value;else if(field==='ring-separation')g.separation=value;else if(field==='latitude')c.latitude=value;else throw new Error('Unknown initial-condition control.');
 return {request:prepareSurfaceInitialConditions(r,c),settings:c};
}
