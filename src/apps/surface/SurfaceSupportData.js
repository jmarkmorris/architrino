import {architrinoLabels,retainedHistories} from './SurfaceRecord.js';
import {isSixPoleReplay,sixPoleBounds} from './SurfaceSixPoleReplay.js';

// Display arithmetic only. Preserve recorded intervals through projection and
// reduction; this does not certify a trajectory, a new event or an imported run.
const bits=new DataView(new ArrayBuffer(8));
function next(x,d){if(!Number.isFinite(x))return x;if(x===0)return d*Number.MIN_VALUE;bits.setFloat64(0,x);bits.setBigUint64(0,bits.getBigUint64(0)+(x>0?BigInt(d):-BigInt(d)));return bits.getFloat64(0);}
const box=(a,b)=>[next(a,-1),next(b,1)];
const token=x=>Number(x)===0&&!/[1-9]/.test(String(x).split(/e/i)[0])?[0,0]:box(Number(x),Number(x));
const pair=p=>[token(p[0])[0],token(p[1])[1]];
const zero=a=>a[0]===0&&a[1]===0;
const add=(a,b)=>zero(a)?b:zero(b)?a:box(a[0]+b[0],a[1]+b[1]);
const neg=a=>[-a[1],-a[0]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>{if(zero(a)||zero(b))return [0,0];const p=[a[0]*b[0],a[0]*b[1],a[1]*b[0],a[1]*b[1]];return box(Math.min(...p),Math.max(...p));};
const div=(a,b)=>b[0]>0?mul(a,box(1/b[1],1/b[0])):null;
export const absoluteSupportInterval=a=>a[0]<=0&&a[1]>=0?[0,Math.max(-a[0],a[1])]:[Math.min(Math.abs(a[0]),Math.abs(a[1])),Math.max(Math.abs(a[0]),Math.abs(a[1]))];
const square=a=>{if(zero(a))return [0,0];const b=absoluteSupportInterval(a);return [Math.max(0,next(b[0]*b[0],-1)),next(b[1]*b[1],1)];};
const norm=v=>{const s=v.map(square).reduce(add,[0,0]);return [Math.max(0,next(Math.sqrt(Math.max(0,s[0])),-1)),next(Math.sqrt(Math.max(0,s[1])),1)];};
const hull=(a,b)=>[Math.min(a[0],b[0]),Math.max(a[1],b[1])];
const finitePair=p=>p?.length===2&&p.every(Number.isFinite)&&p[0]<=p[1];
export const supportMidpoint=p=>p[0]/2+p[1]/2;

function positionBox(history,time){
  let result=null,covered=time[0];
  for(const s of history.segments){
    const a=Math.max(time[0],Number(s.start)),b=Math.min(time[1],Number(s.end));if(a>b)continue;
    if(a>covered)return null;
    const dt=sub([a,b],token(s.start));
    const p=s.coefficients.map((c,i)=>{
      const v=add(token(c[0]),mul(dt,add(token(c[1]),mul(dt,add(token(c[2]),mul(dt,token(c[3])))))));
      return add(v,[-token(s.positionErrors[i])[1],token(s.positionErrors[i])[1]]);
    });
    result=result?result.map((v,i)=>hull(v,p[i])):p;covered=Math.max(covered,b);
  }
  return covered>=time[1]?result:null;
}

// Outward implicit gradients, evaluated on the same reception domain as C.
// The torus uses its polynomial implicit equation, including the inner wall.
export function surfaceNormalBox(g,p){
  let gradient=p;
  if(g.kind==='oblate')gradient=[p[0],p[1],div(p[2],square(token(g.flattening)))];
  if(g.kind==='ring-torus'){
    const major2=square(token(g.majorRadius));
    const s=sub(add(p.map(square).reduce(add,[0,0]),major2),square(token(g.radius)));
    gradient=p.map((v,i)=>mul(v,i<2?sub(s,mul([2,2],major2)):s));
  }
  if(gradient.some(v=>!v))return null;
  const length=norm(gradient);if(!(length[0]>0))return null;
  return gradient.map(v=>div(v,length));
}
export function projectSurfaceSupport(g,position,support){
  const normal=surfaceNormalBox(g,position);if(!normal)return null;
  const value=normal.map((v,i)=>mul(v,support[i])).reduce(add,[0,0]);
  return finitePair(value)?value:null;
}

export function buildSurfaceSupportData(record){
  if(!record)return null;
  const replay=isSixPoleReplay(record),request=replay?record.preparation:record.request;
  const names=architrinoLabels(request.paths),domain=replay?sixPoleBounds(record):{start:Number(request.interval.start),end:Number(record.results.at(-1).acceptedCoverage.end)};
  const histories=replay?[]:retainedHistories(record);
  const members=request.paths.map(p=>{
    let rows;
    if(replay)rows=record.samples.map((s,index)=>({
      // Convert the retained scaled coordinates exactly once for this readout.
      time:mul(pair(s.t),[10,10]),clock:Number(s.t[0])*10,
      value:s.diagnostics?.support?div(pair(s.diagnostics.support),[10,10]):null,index,kind:'sample'
    }));
    else{
      const history=histories.find(h=>h.pathId===p.pathId);
      rows=record.results.flatMap(r=>(r.surfaceDiagnostics??[]).filter(d=>d.pathId===p.pathId).map(d=>{
        const time=[Math.max(domain.start,Number(d.reception[0])),Math.min(domain.end,Number(d.reception[1]))];
        const position=positionBox(history,time);
        return {time,clock:supportMidpoint(time),value:position?projectSurfaceSupport(request.model.geometry,position,d.support.map(pair)):null,kind:time[1]>time[0]?'slab':'sample'};
      })).sort((a,b)=>a.time[0]-b.time[0]);
    }
    return {pathId:p.pathId,label:names.get(p.pathId),charge:Number(p.charge),rows};
  });
  const kind=replay||request.numerics?.errorBoundChecking==='none'?'sample':'slab';
  const data={members,domain,kind,unchecked:request.numerics?.errorBoundChecking==='none'};
  data.total=kind==='sample'?sampleTotals(members):slabTotals(members,domain);
  return data;
}

function magnitudeSum(rows){return rows.map(r=>absoluteSupportInterval(r.value)).reduce(add,[0,0]).map(x=>Math.max(0,x));}
function sampleTotals(members){
  return members[0].rows.map((r,i)=>{
    const all=members.map(m=>m.rows[i]);
    const available=all.every(s=>s?.value&&s.clock===r.clock&&s.time[0]===r.time[0]&&s.time[1]===r.time[1]);
    return {...r,value:available?magnitudeSum(all):null};
  });
}
function slabTotals(members,domain){
  const edges=[...new Set([domain.start,domain.end,...members.flatMap(m=>m.rows.flatMap(r=>r.time))])].filter(t=>t>=domain.start&&t<=domain.end).sort((a,b)=>a-b);
  const cursors=members.map(()=>0);
  return edges.slice(1).map((b,i)=>{
    const a=edges[i];
    const rows=members.map((m,j)=>{
      while(cursors[j]<m.rows.length&&m.rows[cursors[j]].time[1]<b)cursors[j]++;
      const r=m.rows[cursors[j]];return r&&r.time[0]<=a&&r.time[1]>=b?r:null;
    });
    return {time:[a,b],clock:(a+b)/2,kind:'slab',value:rows.every(r=>r?.value)?magnitudeSum(rows):null};
  });
}

export function supportRowsConnect(a,b){
  if(!a?.value||!b?.value)return false;
  return a.kind==='sample'?b.index===undefined||b.index===a.index+1:b.time[0]<=a.time[1];
}

// Whole-slab bounds enclose the integral. For samples the trapezoid is a
// time-weighted display estimate only; uncertain clocks use their lower endpoint.
export function surfaceSupportSummary(data,start,end){
  if(!data||!(end>start))return {available:false,reason:'Choose a nonzero time window.'};
  let area=[0,0],covered=0,gap=false;
  if(data.kind==='slab'){
    for(const r of data.total){const a=Math.max(start,r.time[0]),b=Math.min(end,r.time[1]);if(!(b>a))continue;
      if(!r.value){gap=true;continue;}area=add(area,mul(r.value,sub([b,b],[a,a])));covered+=b-a;
    }
  }else{
    for(let i=1;i<data.total.length;i++){
      const p=data.total[i-1],q=data.total[i],a=Math.max(start,p.clock),b=Math.min(end,q.clock);if(!(b>a))continue;
      if(!supportRowsConnect(p,q)){gap=true;continue;}
      const value=t=>p.value.map((v,j)=>v+(q.value[j]-v)*(t-p.clock)/(q.clock-p.clock));
      area=add(area,mul(add(value(a),value(b)),[(b-a)/2,(b-a)/2]));covered+=b-a;
    }
  }
  const duration=end-start,complete=!gap&&covered>0&&Math.abs(covered-duration)<=32*Number.EPSILON*Math.max(1,duration);
  if(!complete)return {available:false,covered,duration,reason:'Incomplete support coverage; missing members or gaps are not zero.'};
  const mean=div(area,sub([end,end],[start,start]));
  return {available:true,mean,perMember:div(mean,[data.members.length,data.members.length]),covered,duration,estimated:data.kind==='sample'};
}

export function longestSupportSpan(data){
  let best=null,start=null,previous=null;
  for(const r of data.total){
    if(!r.value){start=null;previous=null;continue;}
    if(!previous||!supportRowsConnect(previous,r))start=r.kind==='sample'?r.clock:r.time[0];
    const end=r.kind==='sample'?r.clock:r.time[1];
    if(end>start&&(!best||end-start>best[1]-best[0]))best=[start,end];previous=r;
  }
  return best;
}
