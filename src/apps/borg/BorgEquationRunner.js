import {unconstrainedEquationSelection} from '../shared/UnconstrainedEquationSelection.js';
import {createEomV2HttpClient} from '../shared/EomV2HttpClient.js';
import {evaluateEomCubicHistoryAtTime} from '../shared/EomCubicHistoryEvaluation.mjs';
import {createBorgEomShadowRunConfig,createBorgContinuousRetainedHistories,validateBorgInitialRetainedHistories} from './BorgEomShadowRunner.js';

// Adapts validated provider paths to Borg display rows. The shared client owns
// admission, streamed population/identity/join checks and terminal reconciliation.
export function createBorgEquationRunner(manifest,options={}){
  const config=Object.freeze({...createBorgEomShadowRunConfig(manifest,options),memoryBudgetBytes:1024*1024*1024});
  const seeds=options.initialRetainedHistories?validateBorgInitialRetainedHistories(options.initialRetainedHistories,config):createBorgContinuousRetainedHistories(options.initialFrameRows,manifest,{historyStartTime:config.historyStartTime,historyEndTime:config.startTime,expectedPathCount:config.pathCount});
  const selection=unconstrainedEquationSelection(options),{compositionId,speedDomain}=selection,checking=config.runGrade==='display'?'none':'strict';
  const client=createEomV2HttpClient(),controller=new AbortController();
  let target=config.targetDuration,next=config.startTime,index=0,started=false,finished=false,failure=null,checkpoint=null,request=null,task=null,wake;
  const queue=[];
  const notify=()=>{wake?.();wake=null;};
  function chunk(event){
    const start=Number(event.acceptedCoverage.start),end=Number(event.acceptedCoverage.end),frames=[],sample=config.sampleInterval;
    const times=[];for(let n=Math.ceil(start/sample);n*sample<end;n++)if(n*sample>=start)times.push(n*sample);times.push(end);
    for(const t of times)for(const path of event.publishedExtensions){const seed=seeds.find(h=>h.pathId===path.pathId);const h={coverage:{start,end},segments:path.segments.map(s=>({...s,startTime:s.start,endTime:s.end}))};const p=evaluateEomCubicHistoryAtTime(h,t);frames.push({pathKey:seed.pathKey,frameIndex:Math.round(t/sample),time:t,position:p.position,velocity:p.velocity,errorBound:p.errorBound,stateFlags:seed.stateFlags,dynamicChunkIndex:index,runSource:'computed-eom-provider-paths',valueAuthority:checking==='none'?'display-only':'numerically-accepted-eom-output'});}
    return {source:'computed-eom-provider-paths',statusCode:'ok',chunkIndex:index++,startTime:start,endTime:end,frames,runGrade:config.runGrade,activeRunGrade:config.runGrade,sampleInterval:sample,coreScale:config.coreScale,memoryBudgetBytes:config.memoryBudgetBytes,retainedHistoryStart:config.historyStartTime,retainedHistoryEnd:end,retainedHistoryPolicy:'provider-checkpoint-and-contiguous-path-feed',claimGrade:checking==='none'?'display-only':'numerical',evidenceStatus:checking==='none'?'display-only':'numerical',evolutionClaimLevel:'eom-evolution-conditioned-on-input-history',promotionEligible:false,bufferByteLength:0};
  }
  async function calculate(){
    try{
      const end=Number.isFinite(target)?target:next+60;
      if(!request)request={schema:'eom_evolution_request/v2',runId:`borg-${crypto.randomUUID()}`,model:{...selection,fieldSpeed:'1',coupling:config.coupling},interval:{start:String(config.startTime),end:String(end)},paths:seeds.map(h=>({pathId:h.pathId,charge:h.charge,history:{kind:'cubic',segments:h.segments.map(({startTime,endTime,...s})=>({...s,start:String(startTime),end:String(endTime)}))}})),numerics:{errorBoundChecking:checking,initialStep:config.initialStep,maximumStep:config.maximumStep,minimumStep:config.minimumStep,rootTolerance:config.rootTolerance,accelerationTolerance:config.accelerationTolerance,positionTolerance:config.positionTolerance,velocityTolerance:config.velocityTolerance,correctionTolerance:config.correctionTolerance,maxStepAttempts:compositionId==='logarithmic/v1'&&checking==='strict'?16:10000,maxRejectedSteps:100,adaptiveGrowth:true},resources:{memoryBytes:config.memoryBudgetBytes}};
      const opts={signal:controller.signal,checkpointMode:'reference',onPaths:event=>{queue.push(chunk(event));next=Number(event.acceptedCoverage.end);notify();}};
      const result=checkpoint?await client.resumeStreamRecord(request,await client.readCheckpoint(checkpoint.id),String(end),opts):await client.evolveStreamRecord(request,opts);
      checkpoint=result.checkpoint;next=Number(result.acceptedCoverage.end);
      finished=result.status!=='completed'||next>=target||controller.signal.aborted;
      if(result.halt?.code)queue.push({...chunk({acceptedCoverage:{start:String(next),end:String(next)},publishedExtensions:[]}),terminalHalt:result.halt});
    }catch(error){failure=error;finished=true;}finally{task=null;notify();options.onCalculationStatus?.();}
  }
  return {config,streaming:true,get calculating(){return !!task&&!finished;},get targetDuration(){return target;},get chunkDuration(){return config.chunkDuration;},get runGrade(){return config.runGrade;},get phase(){return 'live';},get nextStartTime(){return next;},canComputeNextChunk(){return queue.length>0||!finished;},setRunLimits({targetDuration}={}){if(targetDuration!==undefined)target=targetDuration;},stop(){finished=true;controller.abort();options.onCalculationStatus?.();},async computeNextChunk(){
    if(!started){started=true;task=calculate();}
    while(!queue.length){if(failure)throw failure;if(finished)return {...chunk({acceptedCoverage:{start:String(next),end:String(next)},publishedExtensions:[]}),statusCode:'complete'};if(!task)task=calculate();await new Promise(resolve=>{wake=resolve;});}
    return queue.shift();
  },async dispose(){finished=true;controller.abort();await task;await client.dispose();}};
}
