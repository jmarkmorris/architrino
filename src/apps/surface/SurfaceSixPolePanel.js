import {SIX_POLE_CASE,sixPoleBounds,nearestSixPoleSample,sixPolePartners,SIX_POLE_MEMBERS} from './SurfaceSixPoleReplay.js';
import {decimalProduct} from './SurfaceGeometry.js';
import {architrinoLabels} from './SurfaceRecord.js';
const mid=p=>(Number(p[0])+Number(p[1]))/2;
const approx=p=>p?`≈ [${Number(p[0]).toPrecision(5)}, ${Number(p[1]).toPrecision(5)}]`:'Not retained';
const physicalTime=p=>p.map(x=>Number(decimalProduct(x,'10')).toFixed(6)).join(' … ');
export function createSixPolePanel({$,jump}){
  const pair=(label,value)=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;$('diagnostics').append(dt,dd);};
  function preparation(request){
    $('preset').value=SIX_POLE_CASE;$('duration-label').textContent='Replay coverage (physical T)';$('latitude').querySelector('option[value="custom"]').textContent='Six coordinate poles';$('resume-end').disabled=true;
    $('radius').value='10';$('speed').value='0';$('coupling').value='1';$('population').value='6';$('shape').value='sphere';$('latitude').value='custom';$('duration').value='0';$('speed-domain').value='strict';$('step').value='0.01';
    $('flattening-label').hidden=true;$('major-radius-label').hidden=true;$('radius-label').textContent='Sphere radius';
    $('reference-case').value=SIX_POLE_CASE;$('analytical-note').hidden=false;$('analytical-events').hidden=true;$('class-account').hidden=true;
    $('request-detail').textContent=JSON.stringify(request,null,2);
    $('shape-brief').textContent='Six coordinate poles: positrinos at +X,+Y,+Z; electrinos at −X,−Y,−Z. Radius stays fixed by artificial normal support.';
    $('preparation-summary').textContent='Release from rest at T = 0 after a complete stationary past. All six follow their symmetric great-circle paths; this is not rigid rotation. These exact settings are read-only. Select a ring preset to prepare an EOM experiment.';
    $('stage-description').textContent='Six poles · radius 10 · stationary past · release from rest.';
    $('evidence').textContent='Analytical research preparation. Load its reviewed history below. This is not an admitted EOM request, a live solver run or a solver restart.';
    $('timeline-note').textContent='The exact release is shown. Load reviewed history to replay the recorded observations.';
    $('path-legend').textContent='━ Illustrative analytical replay';
  }
  function record(record){
    const bounds=sixPoleBounds(record);$('duration').value=String(bounds.end);$('progress').setAttribute('aria-label','Reviewed observation coverage');$('analytical-events').hidden=false;$('analytical-event-buttons').replaceChildren();
    for(const e of record.events){const b=document.createElement('button');b.type='button';b.textContent=e.label;b.onclick=()=>jump(mid(e.t)*10);$('analytical-event-buttons').append(b);}
    $('evidence').textContent='Reviewed analytical-history replay · repaired signed reconstruction. No EOM calculation is performed. The sphere is an artificial constraint, not demonstrated physical confinement.';
    $('precision').textContent='Animation interpolates interval midpoints; it is not a newly certified continuous trajectory. The initial sparse span has only release and first-window endpoint bounds. Original uncertain times and state bounds remain in the exported replay. Late return-path review retains a missing negative-source-speed known-control limitation.';
    $('timeline-note').textContent='Illustrative midpoint interpolation within the retained observation range. Diagnostic numbers and arrows refer to the nearest recorded sample, not the interpolated playback instant.';
    $('manifest').textContent=JSON.stringify({caseId:record.caseId,provenance:record.provenance,sources:record.sources},null,2);
    $('raw-records').replaceChildren();const p=document.createElement('p');p.textContent=`Source-bound display export: ${record.samples.length} observations. Physical coverage 0 to ${bounds.end.toFixed(6)}; detailed scientific records remain in the research archive.`;$('raw-records').append(p);
  }
  function time(record,T,pathId){
    const sample=nearestSixPoleSample(record,T),d=sample.diagnostics;$('diagnostics').replaceChildren();$('class-account').hidden=true;
    $('time-label').textContent=`Physical time T ≈ ${T.toFixed(5)}`;
    pair('Recorded path coordinate q',approx(sample.q));pair('Recorded signed velocity w',approx(sample.w));
    const [lo,hi]=sample.w.map(Number),speed=[lo<=0&&hi>=0?'0':String(Math.min(Math.abs(lo),Math.abs(hi))),String(Math.max(Math.abs(lo),Math.abs(hi)))];pair('Recorded speed |w| (wake-speed units)',approx(speed));
    pair('Direction',lo>0?'Forward':hi<0?'Returning':'Zero or sign undecided');
    if(d){pair('Total tangent acceleration',approx(d.tangent));pair('Canonical radial acceleration',approx(d.radial));pair('Additional normal support',approx(d.support));pair('Support direction',!d.support?'Not retained':Number(d.support[1])<0?'Inward':Number(d.support[0])>0?'Outward':'Zero or sign undecided');}
    const sparse=T>0&&T<Number(record.samples[1].t[0])*10;
    $('sample-time').textContent=`Nearest observation at uncertain physical T = [${physicalTime(sample.t)}]. Acceleration and support above use cf²/R units (divide by 10 for physical values). Values are rounded display summaries; exact retained intervals are exported. ${sparse?'This initial span is illustrative interpolation, not a retained per-time history table. ':''}${d?.releaseDerivation?'Release totals are analytically derived; individual class boxes were not stored. ':''}${!d?.classes?'Partner-class diagnostics were not retained at this observation.':''}`;
    if(d?.classes){
      $('class-account').hidden=false;const body=$('class-account-body');body.replaceChildren();
      const receiver=SIX_POLE_MEMBERS.find(p=>p.pathId===pathId),partners=sixPolePartners(receiver),names=architrinoLabels(record.preparation.paths);
      for(const [name,label] of [['like','Same polarity'],['unlike','Other opposite polarity'],['antipode','Opposite antipode']]){const c=d.classes[name],tr=document.createElement('tr');for(const text of [`${label} · ${c.multiplicity}: ${partners[name].map(p=>names.get(p)).join(', ')}`,approx(c.tangent),approx(c.radial)]){const td=document.createElement('td');td.textContent=text;tr.append(td);}body.append(tr);}
    }
  }
  return {preparation,record,time};
}
