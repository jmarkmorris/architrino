import assert from 'node:assert/strict';
import fs from 'node:fs';
const args=Object.fromEntries(process.argv.slice(2).map(s=>s.replace(/^--/,'').split('=')));
let D=.74;for(let i=0;i<12;i++)D-=(D-Math.cos(D))/(1+Math.sin(D));
const K=4*D*(1+Math.sin(D)); // length R*=1, time R*/cf, cf=1
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
function run(radius,nominal,end){
 const started=Date.now(), T=[0],Y=[[radius,0,Math.PI/2]],logs=[];
 let maxR=radius,t=0,y=Y[0],steps=0,minJ=Infinity,minDelay=Infinity,maxSpeedError=0,nextLog=0,nextBeat=5000,last=null;
 function history(s){
  if(s<=0)return {x:[radius*Math.cos(s/radius),radius*Math.sin(s/radius)],v:[-Math.sin(s/radius),Math.cos(s/radius)]};
  if(s>T.at(-1)+1e-12)throw Error('source beyond accepted history');
  let lo=0,hi=T.length-1;while(hi-lo>1){let m=(lo+hi)>>1;if(T[m]<=s)lo=m;else hi=m;}
  if(hi===lo)return {x:Y[lo].slice(0,2),v:[Math.cos(Y[lo][2]),Math.sin(Y[lo][2])]};
  const h=T[hi]-T[lo],u=(s-T[lo])/h,a=Y[lo],b=Y[hi],va=[Math.cos(a[2]),Math.sin(a[2])],vb=[Math.cos(b[2]),Math.sin(b[2])];
  const x=[0,1].map(j=>(2*u**3-3*u*u+1)*a[j]+(u**3-2*u*u+u)*h*va[j]+(-2*u**3+3*u*u)*b[j]+(u**3-u*u)*h*vb[j]);
  const v=[0,1].map(j=>(6*u*u-6*u)*a[j]/h+(3*u*u-4*u+1)*va[j]+(-6*u*u+6*u)*b[j]/h+(3*u*u-2*u)*vb[j]);
  maxSpeedError=Math.max(maxSpeedError,Math.abs(Math.hypot(...v)-1));return {x,v};
 }
 function row(at,z){
  const rr=Math.hypot(z[0],z[1]);
  const gap=s=>{const h=history(s);return Math.hypot(z[0]+h.x[0],z[1]+h.x[1])-(at-s);};
  let lo=at-(rr+maxR+1),hi=Math.min(at,T.at(-1));
  assert.ok(gap(lo)<0,'lower bracket');
  if(gap(hi)<=0)throw Error('root not behind accepted history');
  for(let i=0;i<55;i++){const m=(lo+hi)/2;if(gap(m)>0)hi=m;else lo=m;if(hi-lo<1e-13)break;}
  const s=(lo+hi)/2,h=history(s),r=[z[0]+h.x[0],z[1]+h.x[1]],range=Math.hypot(...r),n=r.map(v=>v/range),J=1+dot(n,h.v),v=[Math.cos(z[2]),Math.sin(z[2])];
  if(!(J>1e-6&&range>1e-6))throw Error('range or transmitter floor');
  const a=n.map(w=>-K*w/(range*range*J)),forward=dot(v,a),omega=-v[1]*a[0]+v[0]*a[1];
  return {f:[...v,omega],forward,omega,range,J,delay:at-s,residual:Math.abs(range-(at-s)),radial:dot(z,v)/rr,radius:rr};
 }
 function finish(reason,extra={}){return {radius,nominal,end,t,steps,reason,...extra,last,minJ,minDelay,maxSpeedError,logs,wallSeconds:(Date.now()-started)/1000};}
 try {
 while(t<end-1e-10&&steps<200000){
  let a=row(t,y);last={t,...a};delete last.f;
  minJ=Math.min(minJ,a.J);minDelay=Math.min(minDelay,a.delay);
  if(a.forward<=0)return finish('active boundary ends');
  if(a.radius<Number(args.floor??.01))return finish('radius resolution guard');
  let dt=Math.min(nominal,Number(args.angle??.01)/(1+Math.abs(a.omega)),a.delay/8,end-t);
  if(dt<1e-8)return finish('time step resolution guard');
  const evaluate=(at,z)=>{const r=row(at,z);if(r.forward<=0)throw {event:true,at,r};return r.f;};
  const b=evaluate(t+dt/2,y.map((v,j)=>v+dt*a.f[j]/2));
  const c=evaluate(t+dt/2,y.map((v,j)=>v+dt*b[j]/2));
  const d=evaluate(t+dt,y.map((v,j)=>v+dt*c[j]));
  const ny=y.map((v,j)=>v+dt*(a.f[j]+2*b[j]+2*c[j]+d[j])/6);
  if(t>=nextLog){logs.push({...last});nextLog+=.5;}
  t+=dt;y=ny;T.push(t);Y.push(y);steps++;maxR=Math.max(maxR,Math.hypot(y[0],y[1]));
  if(Date.now()-started>45000)return finish('45 second deadline');
  if(Date.now()-started>=nextBeat){console.error(JSON.stringify({heartbeat:true,t,steps}));nextBeat+=5000;}
 }
 last={t,...row(t,y)};delete last.f;
 return finish(t>=end-1e-10?'observation horizon':'step budget');
 } catch(e){if(e.event)return finish('active-boundary crossing bracket',{eventBracket:[t,e.at],trialForward:e.r.forward,trialRadius:e.r.radius});throw e;}
}
if(Object.hasOwn(args,"verify")){
 const r=run(1,.002,3);assert.equal(r.reason,'observation horizon');assert.ok(Math.abs(r.last.radius-1)<1e-8);assert.ok(Math.abs(r.last.delay-2*D)<1e-8);assert.ok(Math.abs(r.last.J-(1+Math.sin(D)))<1e-8);assert.ok(Math.abs(r.last.forward-Math.tan(D))<1e-8);
 console.log(JSON.stringify({knownCase:'exact circle geometry and forward row after three time units',passed:true,radius:r.last.radius,delay:r.last.delay,J:r.last.J,forward:r.last.forward,maxSpeedError:r.maxSpeedError}));
} else {
 assert.ok(args.radius&&args.dt,'explicit inputs required');
 const result=run(Number(args.radius),Number(args.dt),Number(args.end??40));
 if(args.output)fs.writeFileSync(args.output,JSON.stringify(result,null,2)+'\n');
 const {logs,...summary}=result;console.log(JSON.stringify(summary));
}
