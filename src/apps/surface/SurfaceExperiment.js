import {decimalProduct,decimalRatio,decimalSum,decimalScale,sameDecimal,validateSurfaceGeometry} from './SurfaceGeometry.js';
export const PHASES = Object.freeze(['0','1.0471975511965977461542144610931676','2.0943951023931954923084289221863353','3.1415926535897932384626433832795029','4.1887902047863909846168578443726705','5.2359877559829887307710723054658381']);
export const SURFACE_PRESETS=Object.freeze({
  sphere:{name:'Sphere · equatorial ring',shape:'sphere',latitude:'equator',radius:'0.1',speed:'0.01',coupling:'0.000001',duration:'0.25',step:'0.01',population:6,speedDomain:'unrestricted'},
  oblate:{name:'Oblate spheroid · northern ring',shape:'oblate',latitude:'north',flattening:'0.6',radius:'0.1',speed:'0.006',coupling:'0.000001',duration:'0.15',step:'0.01',population:6,speedDomain:'unrestricted'},
  'torus-outer':{name:'Ring torus · outer northern ring',shape:'ring-torus',latitude:'north',radius:'0.05',majorRadius:'0.1',speed:'0.013',coupling:'0.000001',duration:'0.15',step:'0.01',population:6,speedDomain:'unrestricted'},
  'torus-inner':{name:'Ring torus · inner northern ring',shape:'ring-torus',latitude:'inner',radius:'0.05',majorRadius:'0.1',speed:'0.007',coupling:'0.000001',duration:'0.15',step:'0.01',population:6,speedDomain:'unrestricted'},
  'sphere-latitude':{name:'Sphere · matched northern ring',shape:'sphere',latitude:'north',radius:'0.1',speed:'0.006',coupling:'0.000001',duration:'0.15',step:'0.01',population:6,speedDomain:'unrestricted'},
  // Watchable motion: the fastest initial speed whose 0→0.25 run completes under the current surface tolerances. No checked reference exists.
  'sphere-watch':{name:'Sphere · watchable speed',shape:'sphere',latitude:'equator',radius:'0.1',speed:'0.05',coupling:'0.000001',duration:'0.25',step:'0.01',population:6,speedDomain:'unrestricted',unchecked:true}
});
export function createSurfaceExperiment({ radius='0.1', speed='0.01', coupling='0.000001', duration='0.25', step='0.01', population=6, speedDomain='unrestricted',shape='sphere',latitude='equator',flattening='0.6',majorRadius='0.2' } = {}) {
  if (!Number.isInteger(population) || population < 2 || population > 12 || population % 2) throw new Error('Choose an even population from 2 to 12.');
  for (const [name, token] of Object.entries({radius,speed,coupling,duration,step})) if (!Number.isFinite(Number(token)) || Number(token)<=0) throw new Error(`${name} must be positive and finite.`);
  if (Number(speed)>=1 || Number(duration)>0.25 || Number(step)>0.01) throw new Error('This viewer starts with subwake preparation, duration at most 0.25 and step at most 0.01.');
  if (!['unrestricted','inclusive','strict'].includes(speedDomain)) throw new Error('Unknown speed domain.');
  if(!['sphere','oblate','ring-torus'].includes(shape)||!['equator','north',...(shape==='ring-torus'?['inner','inner-equator']:[])].includes(latitude)) throw new Error('Choose a supported shape and preparation latitude.');
  if(shape==='oblate' && (!(Number(flattening)>0)||Number(flattening)>1)) throw new Error('Polar/equatorial ratio must be greater than zero and at most one.');
  const geometry=shape==='oblate'?{kind:shape,radius,flattening}:shape==='ring-torus'?{kind:shape,radius,majorRadius}:{kind:shape,radius};
  const {rho,height}=preparationCircle(geometry,latitude);
  validateSurfaceGeometry(geometry);
  return {schema:'eom_evolution_request/v2',runId:`surface-${crypto.randomUUID()}`,model:{compositionId:'canonical-surface/v1',constraint:'surface',speedDomain,boundaryPolicy:speedDomain==='unrestricted'?'none':'halt',fieldSpeed:'1',coupling,geometry},interval:{start:'0',end:duration},paths:Array.from({length:population},(_,i)=>({pathId:`p${i}`,charge:i%2?'-1':'1',history:{kind:'uniform-circular',start:'-0.5',end:'0',maximumSegmentStep:'0.02',radius:rho,height,angularSpeed:decimalRatio(speed,rho),speed,phase:population===6?PHASES[i]:String(i*2*Math.PI/population)}})),numerics:{initialStep:step,maximumStep:step,minimumStep:String(Number(step)/8),rootTolerance:'1e-5',accelerationTolerance:'1e-4',positionTolerance:'1e-4',velocityTolerance:'1e-4',correctionTolerance:'1e-4',surfacePositionTolerance:'1e-4',surfaceTangentVelocityTolerance:'1e-4',maxStepAttempts:80,maxRejectedSteps:20},resources:{memoryBytes:2147483648}};
}
export function qualifiedPreparationId(request) {
  const m=request?.model,paths=request?.paths;
  if(m?.compositionId!=='canonical-surface/v1'||m.constraint!=='surface'||m.speedDomain!=='unrestricted'||m.boundaryPolicy!=='none'||!sameDecimal(m.fieldSpeed,'1')||m.coupling!=='0.000001'||!m.geometry||m.geometry.center||m.geometry.orientation||!sameDecimal(request.interval?.start,'0')||paths?.length!==6) return null;
  for(const [id,preset] of Object.entries(SURFACE_PRESETS)){
    if(preset.unchecked) continue;
    const g=m.geometry;
    if(g.kind!==preset.shape||g.radius!==preset.radius||g.kind==='oblate'&&g.flattening!==preset.flattening||g.kind==='ring-torus'&&g.majorRadius!==preset.majorRadius) continue;
    if(!(Number(request.interval.end)>0)||Number(request.interval.end)>Number(preset.duration)) continue;
    const {rho,height}=preparationCircle(g,preset.latitude);
    if(paths.every((p,i)=>p.pathId===`p${i}`&&p.charge===(i%2?'-1':'1')&&p.history?.kind==='uniform-circular'&&p.history.start==='-0.5'&&p.history.end==='0'&&p.history.radius===rho&&p.history.height===height&&p.history.speed===preset.speed&&p.history.angularSpeed==='0.1'&&p.history.phase===PHASES[i]&&!p.history.tiltX&&!p.history.tiltY)) return id;
  }
  return null;
}
export function isQualifiedPreparation(request) {return qualifiedPreparationId(request)!==null;}

// Only the selected field changes. Imported phases, past extent, numerical
// tolerances and per-member latitude/speed remain intact on unrelated edits.
export function updateSurfaceExperiment(original,field,value) {
  const r=structuredClone(original),g=r.model.geometry;
  r.runId=`surface-${crypto.randomUUID()}`;
  const positive=()=>{decimalRatio(value,'1');if(!(Number(value)>0)||!Number.isFinite(Number(value)))throw new Error('Use a positive finite decimal value.');};
  const speedOf=h=>h.speed ?? decimalProduct(h.radius,h.angularSpeed.replace(/^[-+]/,''));
  const mapGeometry=next=>{
    validateSurfaceGeometry(next);
    if(g.kind==='ring-torus'){
      if(next.kind!=='ring-torus')throw new Error('Use a preset to switch between a torus and a sphere or spheroid.');
      for(const p of r.paths){const h=p.history,speed=speedOf(h),negative=Number(h.angularSpeed)<0;
        const offset=decimalSum(h.radius,decimalProduct(g.majorRadius,'-1'));
        h.radius=decimalSum(next.majorRadius,decimalScale(offset,next.radius,g.radius));
        h.height=decimalScale(h.height,next.radius,g.radius);
        h.angularSpeed=decimalRatio(speed,h.radius);if(negative)h.angularSpeed='-'+h.angularSpeed;
      }
      r.model.geometry=next;return;
    }
    const oldPolar=decimalProduct(g.radius,g.kind==='oblate'?g.flattening:'1'),newPolar=decimalProduct(next.radius,next.kind==='oblate'?next.flattening:'1');
    for(const p of r.paths){const h=p.history,speed=speedOf(h),negative=Number(h.angularSpeed)<0;
      h.radius=decimalScale(h.radius,next.radius,g.radius);
      h.height=decimalScale(h.height,newPolar,oldPolar);
      h.angularSpeed=decimalRatio(speed,h.radius);if(negative)h.angularSpeed='-'+h.angularSpeed;
    }
    r.model.geometry=next;
  };
  if(field==='radius'){positive();mapGeometry({...g,radius:value});}
  else if(field==='major-radius'){positive();if(g.kind!=='ring-torus')throw new Error('Major radius applies to a ring torus.');mapGeometry({...g,majorRadius:value});}
  else if(field==='shape'){if(value===g.kind)return r;if(g.kind==='ring-torus'||value==='ring-torus')throw new Error('Use a preset to switch between a torus and a sphere or spheroid.');if(!['sphere','oblate'].includes(value))throw new Error('Unknown shape.');mapGeometry(value==='oblate'?{...g,kind:value,flattening:g.flattening??'0.6'}:{kind:value,radius:g.radius,...(g.center?{center:g.center}:{}),...(g.orientation?{orientation:g.orientation}:{})});}
  else if(field==='flattening')mapGeometry({...g,flattening:value});
  else if(field==='latitude'){
    if(!['equator','north',...(g.kind==='ring-torus'?['inner','inner-equator']:[])].includes(value))throw new Error('Use a supported preparation circle or a preset.');
    const {rho,height}=preparationCircle(g,value);
    for(const p of r.paths){const h=p.history,speed=speedOf(h),negative=Number(h.angularSpeed)<0;h.radius=rho;h.height=height;h.angularSpeed=decimalRatio(speed,rho);if(negative)h.angularSpeed='-'+h.angularSpeed;}
  }
  else if(field==='speed'){positive();if(Number(value)>=1)throw new Error('Preparation speed must be below wake speed in this viewer.');for(const p of r.paths){const negative=Number(p.history.angularSpeed)<0;p.history.speed=value;p.history.angularSpeed=decimalRatio(value,p.history.radius);if(negative)p.history.angularSpeed='-'+p.history.angularSpeed;}}
  else if(field==='coupling'){positive();r.model.coupling=value;}
  else if(field==='duration'){positive();if(Number(value)>.25)throw new Error('Initial future duration must be at most 0.25.');r.interval.end=decimalSum(r.interval.start,value);}
  else if(field==='step'){positive();if(Number(value)>.01)throw new Error('Maximum step must be at most 0.01.');r.numerics.maximumStep=value;if(Number(r.numerics.initialStep)>Number(value))r.numerics.initialStep=value;if(Number(r.numerics.minimumStep)>Number(value))r.numerics.minimumStep=value;}
  else if(field==='speed-domain'){if(!['unrestricted','inclusive','strict'].includes(value))throw new Error('Unknown speed domain.');r.model.speedDomain=value;r.model.boundaryPolicy=value==='unrestricted'?'none':'halt';}
  else if(field==='population'){
    const count=Number(value);if(!Number.isInteger(count)||count<2||count>12||count%2)throw new Error('Choose an even population from 2 to 12.');
    const h=structuredClone(r.paths[0].history);r.paths=Array.from({length:count},(_,i)=>({pathId:`p${i}`,charge:i%2?'-1':'1',history:{...structuredClone(h),phase:count===6?PHASES[i]:String(i*2*Math.PI/count)}}));
  }
  else throw new Error('Unknown preparation control.');
  return r;
}

export function preparationCircle(g,latitude) {
  const northern=['north','inner'].includes(latitude);
  if(g.kind==='ring-torus'){
    const offset=decimalProduct(g.radius,northern?'0.6':'1');
    return {rho:decimalSum(g.majorRadius,decimalProduct(offset,latitude.startsWith('inner')?'-1':'1')),height:northern?decimalProduct(g.radius,'0.8'):'0'};
  }
  return {rho:northern?decimalProduct(g.radius,'0.6'):g.radius,height:northern?decimalProduct(decimalProduct(g.radius,g.kind==='oblate'?g.flattening:'1'),'0.8'):'0'};
}
