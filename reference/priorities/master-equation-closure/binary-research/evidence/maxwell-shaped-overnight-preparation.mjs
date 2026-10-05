// Frozen complete compatible family from equation-domain source section 3.
import {add,sub,mul,norm,evaluate} from './maxwell-shaped-overnight-history-instrument.mjs';
export function preparation(beta,law){
  if(![.1,.2,.3].includes(beta)||!['E','full'].includes(law))throw Error('case outside frozen numerical family');
  const r=1/(4*beta*beta),omega=beta/r;
  const circle={speedBound:beta,at:T=>{
    const c=Math.cos(omega*T),s=Math.sin(omega*T);
    return {x:[r*c,r*s],v:[-beta*s,beta*c],a:[-beta*omega*c,-beta*omega*s]};
  }};
  const endpoint=circle.at(0),e=evaluate(circle,endpoint.x,endpoint.v,0,law),da=sub(e.aNow,endpoint.a),an=norm(da),tau=-e.S;
  const delta=an?Math.min(tau/8,(1-beta)/(12*an),Math.sqrt(r/(8*an))):tau/8;
  const speedBound=(1+3*beta)/4;
  const past={speedBound,at:T=>{
    const p=circle.at(T);if(T<=-delta)return p;
    const f=(T*T+3*T**3/delta+3*T**4/delta**2+T**5/delta**3)/2;
    const fp=T+4.5*T*T/delta+6*T**3/delta**2+2.5*T**4/delta**3;
    const fpp=1+9*T/delta+18*T*T/delta**2+10*T**3/delta**3;
    return {x:add(p.x,mul(da,f)),v:add(p.v,mul(da,fp)),a:add(p.a,mul(da,fpp))};
  }};
  const launch={t:0,...past.at(0)};
  const specification={equation:law==='E'?'Sections 7 E':'Sections 8 E+M',K:1,cf:1,polarities:[1,-1],members:2,geometry:'isolated mirror planar',beta,r,omega,
    completePast:'q_circle + da*T^2*(1+T/delta)^3/2 on [-delta,0]; q_circle before -delta; X_minus=-q',delta,da,launch,
    speedBound,pastSeparationFloor:15*r/8,pastDelayFloor:15*r/(8*(1+speedBound)),pastDelayCeiling:17*r/(8*(1-speedBound)),pastDFloor:1-speedBound,
    support:'all ordinary positive-delay partner roots; self roots absent by complete subfield chord proof',regularity:'locally C2,1; generally derivative seams',
    speedLabels:['unrestricted on monitored subfield interval','inclusive-domain ceiling on monitored subfield interval','strict-domain ceiling on monitored subfield interval'],
    boundaryResponse:'none',preparationGrade:'compatible preparation; old tail not a solution',circularTailRoot:e.S};
  return {past,launch,specification};
}
if(process.argv.includes('--specifications'))console.log(JSON.stringify([.1,.2,.3].flatMap(beta=>['E','full'].map(law=>preparation(beta,law).specification)),null,2));
