import { createEomV2HttpClient } from '../shared/EomV2HttpClient.js';
import { createStandaloneAppNavigationRuntime } from '../navigator/StandaloneAppNavigationRuntime.js';
import { createLatticeDisturbanceExperiment, validateLatticePatchRecord, compactLatticeResult, latticeRecordEnd, latticeRecordResult, latticeRecordStart, LATTICE_PATCH_RECORD_SCHEMA, LATTICE_PATCH_RECORD_LIMIT } from './LatticeDisturbanceExperiment.js';
import { createLatticeDisturbanceViewer } from './LatticeDisturbanceViewer.js';

export function mountLatticeDisturbance() {
  const $ = id => document.getElementById(`disturbance-${id}`);
  const client = createEomV2HttpClient();
  const navigation = createStandaloneAppNavigationRuntime({ host: $('navigation') }).init();
  let viewer, request, settings, inspection, record, busy=false, dirty=false, controller, playing=false, frame, time=0, playStart=0;
  const saved=[], importedRecords=new WeakSet();
  const message=text=>$('message').textContent=text;
  try { viewer=createLatticeDisturbanceViewer($('viewer')); } catch(error) { $('viewer').textContent='The 3D view needs WebGL. '+error.message; }
  function stopPlayback(){playing=false;cancelAnimationFrame(frame);$('play').textContent='Play accepted motion';}
  function canAdvance(parts){const last=parts.at(-1);return !last || (last.halt?.code==='cancelled_at_accepted_boundary' && last.checkpoint?.durable && !!last.checkpoint.id);}
  function canCalculate(){
    if(!record)return !!inspection;
    if(record.schema!==LATTICE_PATCH_RECORD_SCHEMA || importedRecords.has(record))return false;
    if(latticeRecordEnd(record,true)<Number(request.interval.end))return canAdvance(record.control.parts);
    return latticeRecordEnd(record)<Number(request.interval.end) && canAdvance(record.parts);
  }
  function controls(){
    $('fields').disabled=busy;$('prepare').disabled=busy;$('inspect').disabled=busy||dirty||!request;
    $('calculate').disabled=busy||dirty||!canCalculate();$('calculate').textContent=record?'Continue calculation':'Calculate paired runs';
    $('stop').disabled=!busy||!controller;$('export').disabled=busy||!record||!(record.parts?.length||record.control?.parts.length||record.result);$('import').disabled=busy;$('saved').disabled=busy;
    const motion=record && latticeRecordEnd(record)>0;$('play').disabled=!motion||busy;$('timeline').disabled=!motion||busy;
  }
  function values(){return {side:Number($('side').value),spacing:Number($('spacing').value),amplitude:$('amplitude').value.trim(),axis:$('axis').value,duration:$('duration').value.trim(),preparation:$('preparation').value,quality:$('quality').value};}
  function showRaw(){
    $('raw').replaceChildren();if(!record)return;
    if(importedRecords.has(record)){$('raw').textContent='Imported playback; complete evidence and continuation checkpoints remain on the original solver host.';return;}
    const parts=record.schema===LATTICE_PATCH_RECORD_SCHEMA?[...record.control.parts,...record.parts]:[record.result];
    for(const [index,part] of parts.entries())if(part.record?.artifact?.id){const a=document.createElement('a');a.textContent=`Complete EOM evidence · part ${index+1}`;a.href=`/api/eom/v2/records/${encodeURIComponent(part.record.artifact.id)}/raw`;$('raw').append(a,document.createElement('br'));}
  }
  function preparationText(){
    const spacing=settings.spacing??1, positive=request.paths.filter(p=>p.charge==='1').length;
    $('population').textContent=`${request.paths.length} moving members · ${positive} positrinos, ${request.paths.length-positive} electrinos · spacing ${spacing}`;
    $('past').textContent=settings.preparation==='pulse'?`Prescribed preparation: all sites start at rest. One member moves smoothly from T=${-spacing/4} to 0, then stops. The EOM solver advances all members from release at T=0. Pulse onset is T=${-spacing/4}.`:`Held displacement throughout the supplied past from T=${request.paths[0].history.segments[0].start} to 0; release at T=0. This is not a newly launched pulse.`;
    $('request').textContent=JSON.stringify(request,null,2);
    $('model').textContent='Canonical Master Equation · coupling 16 · wake speed 1 · no surface constraint';
  }
  function displayTime(next){
    time=next;$('timeline').value=String(time);const spacing=settings.spacing??1;
    $('time').textContent=`T = ${time.toFixed(4)} · ${(time/spacing).toFixed(3)} initial-spacing crossing times · ${time<0?'prescribed preparation':'EOM evolution'}`;
    const m=viewer?.setTime(time);
    if(time<0){$('metrics').textContent='Prescribed preparation only. The magnified response-since-release view begins at T=0.';return;}
    if(m)$('metrics').textContent=`Maximum motion since release: ${(m.displacement/spacing).toExponential(3)} spacings. ${m.addedMotion===null?'':`Control-subtracted added motion: ${(m.addedMotion/spacing).toExponential(3)} spacings. `}Maximum speed: ${m.speed.toExponential(3)}. Recorded component error bound: ${m.uncertainty.toExponential(2)}.`;
  }
  function showPreparation(){
    $('magnified-caption').textContent='Response since release. Requires the paired EOM calculation.';
    preparationText();$('raw').replaceChildren();viewer?.setPreparation(request,settings);
    $('coverage').textContent='Preparation only';$('timeline').min=String(settings.preparation==='pulse'?-(settings.spacing??1)/4:0);$('timeline').max=request.interval.end;
    displayTime(Number($('timeline').min));$('metrics').textContent='Future motion will come only from accepted EOM records. The magnified view compares with an undisplaced run.';
  }
  function prepare(){if(busy)return;try{const s=values(),r=createLatticeDisturbanceExperiment(s);stopPlayback();settings=s;request=r;inspection=null;record=null;dirty=false;time=0;$('saved').value='';showPreparation();message('Prepare → inspect → calculate. The undisplaced comparison runs first, then the pulse.');}catch(error){dirty=true;inspection=null;message(error.message);}controls();}
  function updateRecordView(){
    validateLatticePatchRecord(record);stopPlayback();preparationText();viewer?.setRecord(record);
    const end=latticeRecordEnd(record),controlEnd=record.schema===LATTICE_PATCH_RECORD_SCHEMA?latticeRecordEnd(record,true):end;
    $('timeline').min=String(latticeRecordStart(record));$('timeline').max=String(end);
    const result=latticeRecordResult(record)??record.control?.parts.at(-1);
    $('coverage').textContent=record.schema===LATTICE_PATCH_RECORD_SCHEMA?`Run accepted through T=${end}; comparison through T=${controlEnd}; requested T=${request.interval.end}. ${result?.status??'Comparison only'}${result?.halt?.code?' · '+result.halt.code:''}.`:`Accepted coverage: 0 to ${end} of ${request.interval.end}; ${result.status}. No comparison in this older record.`;
    if(result)$('model').textContent=`Canonical Master Equation · coupling 16 · wake speed 1 · model ${result.modelDigest.slice(0,12)}`;
    $('magnified-caption').textContent=record.schema===LATTICE_PATCH_RECORD_SCHEMA?'Added motion since release; undisplaced motion subtracted. Display magnification only.':'Motion since release. No comparison is present in this older record.';
    if(record.schema!==LATTICE_PATCH_RECORD_SCHEMA){$('gain').value='10';$('gain-value').textContent='×10';$('magnified-title').textContent='Magnified motion ×10';}
    viewer?.setGain(Number($('gain').value));showRaw();displayTime(end);controls();
  }
  function remember(next){
    const size=new TextEncoder().encode(JSON.stringify(next)).length;
    if(size>LATTICE_PATCH_RECORD_LIMIT || saved.reduce((n,r)=>n+new TextEncoder().encode(JSON.stringify(r)).length,0)+(saved.includes(next)?0:size)>32*1024*1024)throw new Error('Playback storage limit reached. Complete solver evidence is retained; export saved records before another run.');
    if(!saved.includes(next)){saved.push(next);const option=document.createElement('option');option.value=String(saved.length-1);$('saved').append(option);}
    const index=saved.indexOf(next),option=$('saved').options[index+1];option.textContent=`${next.settings.side}³ · ${next.settings.preparation??'held'} · T=${latticeRecordEnd(next)}`;$('saved').value=String(index);
  }
  function serviceError(error){return (error?.name==='TypeError'||/JSON|404|HTTP|fetch|capabilit/i.test(error.message))?'The local EOM service is unavailable or refused this request. '+error.message:error.message;}
  async function runSeries(control){
    const series=control?record.control.parts:record.parts,r=control?record.control.request:record.request;
    for(let leg=0;leg<4&&!controller.signal.aborted;leg++){
      const before=Number(series.at(-1)?.acceptedCoverage.end??0);if(before>=Number(r.interval.end))return true;
      const options={checkpointMode:'reference',expectedModelDigest:record.control.parts[0]?.modelDigest??inspection?.modelDigest,signal:controller.signal,onProgress:p=>{$('coverage').textContent=`${control?'Undisplaced comparison':'Pulse'}: T=${p.acceptedTime??before} of ${r.interval.end} · accepted steps ${p.acceptedStepCount??0}`;}};
      let response;
      if(series.length){const last=series.at(-1);if(!canAdvance(series))return false;const checkpoint=await client.readCheckpoint(last.checkpoint.id);if(checkpoint.digest!==last.checkpoint.digest||Number(checkpoint.acceptedTime)!==before)throw new Error('Checkpoint identity differs; continuation refused.');response=await client.resumeRecord(r,checkpoint,r.interval.end,options);}
      else response=await client.evolveRecord(r,options);
      series.push(compactLatticeResult(response));
      try { validateLatticePatchRecord(record); remember(record); } catch(error) { series.pop(); error.retainedFailure={recordId:response.record?.artifact?.id}; throw error; }
      updateRecordView();
      const after=Number(response.acceptedCoverage.end);if(after>=Number(r.interval.end))return true;
      if(after<=before || response.halt?.code!=='cancelled_at_accepted_boundary'||!response.checkpoint?.durable||!response.checkpoint.id)return false;
      message(`Retained ${control?'comparison':'pulse'} through T=${after}. Continuing from its durable checkpoint; accepted history is preserved.`);
    }
    return Number(series.at(-1)?.acceptedCoverage.end??0)>=Number(r.interval.end);
  }
  $('prepare').onclick=prepare;
  $('fields').addEventListener('input',()=>{if(!busy){dirty=true;inspection=null;stopPlayback();message('Settings changed. Prepare the new experiment before calculating.');controls();}});
  $('inspect').onclick=async()=>{if(busy||dirty)return;busy=true;controls();message('Inspecting the declared preparation and equation…');try{inspection=await client.inspect(request);message('Inspection returned. All future motion still requires EOM calculation.');}catch(error){message(serviceError(error));}finally{busy=false;controls();}};
  $('calculate').onclick=async()=>{
    if(busy||dirty||!canCalculate())return;
    if(!record){record={schema:LATTICE_PATCH_RECORD_SCHEMA,settings:structuredClone(settings),request:structuredClone(request),parts:[],control:{request:createLatticeDisturbanceExperiment({...settings,amplitude:'0'}),parts:[]}};}
    stopPlayback();busy=true;controller=new AbortController();controls();message('Calculating the undisplaced comparison, then the pulse. Up to four bounded checkpoint continuations per run; Stop preserves the accepted prefix.');
    try{const ready=await runSeries(true);if(ready&&!controller.signal.aborted)await runSeries(false);if(record.parts.length||record.control.parts.length){remember(record);updateRecordView();}message(controller.signal.aborted?'Stopped at an accepted boundary; retained motion can be replayed.':latticeRecordEnd(record)>=Number(request.interval.end)?'Paired EOM calculation completed. Replay shows the prescribed preparation followed by the accepted response. Numerical evidence; independent scientific certification remains open.':'Requested duration was not reached. The accepted prefix and actual halt reason are retained. Continue is available only for resumable time-limit stops.');}
    catch(error){if(record.parts.length||record.control.parts.length){try{remember(record);updateRecordView();}catch{showRaw();}}message(serviceError(error));if(error.retainedFailure?.recordId){const a=document.createElement('a');a.textContent='Retained evidence for the refused playback part';a.href=`/api/eom/v2/records/${encodeURIComponent(error.retainedFailure.recordId)}/raw`;$('raw').append(a);}}
    finally{busy=false;controller=null;controls();}
  };
  $('stop').onclick=()=>{controller?.abort();message('Waiting for an accepted-boundary stop and retained checkpoint.');};
  $('timeline').oninput=()=>{stopPlayback();displayTime(Number($('timeline').value));};
  $('gain').oninput=()=>{$('gain-value').textContent=`×${$('gain').value}`;$('magnified-title').textContent=`Magnified motion ×${$('gain').value}`;viewer?.setGain(Number($('gain').value));if(request)displayTime(time);};
  $('play').onclick=()=>{if(playing){stopPlayback();return;}const end=latticeRecordEnd(record),fullStart=latticeRecordStart(record),start=$('replay-window').value==='response'&&settings.preparation==='pulse'&&end>(settings.spacing??1)*.75?(settings.spacing??1)/2:fullStart;if(!(end>0))return;if(time>=end||time<start)displayTime(start);playing=true;const seconds=Number($('replay-seconds').value);playStart=performance.now()-(time-start)/(end-start)*seconds*1000;$('play').textContent='Pause replay';const tick=now=>{if(!playing)return;const t=Math.min(end,start+(now-playStart)/(seconds*1000)*(end-start));displayTime(t);if(t>=end)stopPlayback();else frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);};
  $('saved').onchange=()=>{const next=saved[Number($('saved').value)];if($('saved').value===''||!next)return;record=next;request=record.request;settings=record.settings;inspection=null;dirty=false;for(const key of ['side','amplitude','axis','duration','spacing','preparation','quality'])if(settings[key]!==undefined)$(key).value=String(settings[key]);if(!settings.preparation){$('preparation').value='held';$('spacing').value='1';$('quality').value='display';}updateRecordView();message(importedRecords.has(record)?'Imported playback; continuation requires its original solver host.':'Saved numerical run loaded.');};
  $('export').onclick=()=>{if(!record)return;const url=URL.createObjectURL(new Blob([JSON.stringify(record)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`${record.request.runId}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  $('import').onchange=async()=>{const file=$('import').files?.[0];if(!file||busy)return;try{if(file.size>LATTICE_PATCH_RECORD_LIMIT)throw new Error('Choose an exported record no larger than 12 MiB.');const next=validateLatticePatchRecord(JSON.parse(await file.text()));importedRecords.add(next);remember(next);$('saved').onchange();}catch(error){message(error.message);}finally{$('import').value='';}};
  $('back').onclick=e=>{if(busy){e.preventDefault();message('Stop the active calculation before switching sections.');}};
  window.addEventListener('beforeunload',e=>{if(busy){e.preventDefault();e.returnValue='';}});
  window.addEventListener('pagehide',()=>{controller?.abort();stopPlayback();viewer?.dispose();navigation.destroy?.();client.dispose().catch(console.error);},{once:true});
  prepare();return {getRequest:()=>request,getRecord:()=>record};
}
