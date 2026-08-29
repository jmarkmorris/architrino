import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { assertScientificGeneration, BATCH_ROOT } from '../scripts/eom/f5-batch-admission.mjs';

// Pure operational metadata fixtures. These do not assert operator authority,
// launch a caller, or substitute for the pinned independent declaration review.
const binding=name=>({path:resolve(BATCH_ROOT,`renewal-test/${name}.json`),bytes:20,sha256:'a'.repeat(64)});
function fixture() {
  const original={campaignStart:'2026-08-27T20:56:11-04:00',campaignDeadline:'2026-08-28T08:56:11-04:00',
    sourceBindings:[binding('scientific-source')],limits:{unchanged:true},scientificObligation:{unchanged:true}};
  const authority=binding('authority'), windowBinding=binding('window'), startBinding=binding('start');
  const originalBinding=binding('original'), freeze=binding('freeze');
  const cases=['serial-1','serial-2','parallel-1','parallel-2','isolation-1','isolation-2'];
  const current={...structuredClone(original),campaignStart:'2026-08-28T13:12:36Z',campaignDeadline:'2026-08-29T01:12:36Z',
    sourceBindings:[...structuredClone(original.sourceBindings),authority,windowBinding,startBinding],
    operationalAdmission:{originalDeclaration:originalBinding,scientificCaseFreeze:freeze,campaignRenewal:authority}};
  const renewal={schema:'braid-program/f5-benchmark-campaign-renewal.v1',approved:true,scope:'operational-time-renewal-only',
    originalDeclaration:originalBinding,scientificCaseFreeze:freeze,window:windowBinding,startTool:startBinding,
    originalCampaignStart:original.campaignStart,originalCampaignDeadline:original.campaignDeadline,
    authorizedStart:current.campaignStart,authorizedDeadline:current.campaignDeadline,caseId:'f5-ordinary-evolution-20260827',caseIds:cases,
    scientificChangesAuthorized:false,limitsChangesAuthorized:false,automaticExtensionAuthorized:false};
  const window={schema:'braid-program/benchmark-campaign-window.v1',recordedStart:current.campaignStart,hardStop:current.campaignDeadline,
    cases,authorization:{userMessage:'y'}};
  const start={schema:'braid-program/campaign-start-tool.v1',hardStop:current.campaignDeadline,authorization:{directUserMessage:'y'},
    actualTool:{command:"date -u '+%Y-%m-%dT%H:%M:%SZ'",exit_code:0,output:current.campaignStart+'\n',chunk_id:'test-only',wall_time_seconds:0}};
  const records=new Map([[authority.path,{...authority,value:renewal}],[windowBinding.path,{...windowBinding,value:window}],
    [startBinding.path,{...startBinding,value:start}],[originalBinding.path,{...originalBinding,value:structuredClone(original)}]]);
  const reader=(path,maximumBytes)=>{assert.equal(maximumBytes,1024*1024);if(!records.has(path))throw Error('missing fixture');return records.get(path);};
  return {original,current,renewal,window,start,records,reader,authority,windowBinding,startBinding,originalBinding};
}
test('unchanged historical generation needs no renewal reader',()=>{
  const f=fixture();assert.doesNotThrow(()=>assertScientificGeneration(f.original,structuredClone(f.original)));
});
test('consistent explicit twelve-hour renewal passes metadata predicate',()=>{
  const f=fixture();assert.doesNotThrow(()=>assertScientificGeneration(f.original,f.current,f.reader));
});
test('changed dates without renewal are rejected',()=>{
  const f=fixture();delete f.current.operationalAdmission.campaignRenewal;
  assert.throws(()=>assertScientificGeneration(f.original,f.current),/historical scientific\/deadline field changed/);
});
test('renewal requires the authenticated reader',()=>{
  const f=fixture();assert.throws(()=>assertScientificGeneration(f.original,f.current),/authenticated JSON reader/);
});
const mutations=[
  ['wrong callback hash',f=>{f.records.get(f.authority.path).sha256='b'.repeat(64);},/authenticated renewal input differs/],
  ['missing authority file',f=>f.records.delete(f.authority.path),/missing fixture/],
  ['unlisted renewal',f=>{f.current.sourceBindings=f.current.sourceBindings.filter(b=>b.path!==f.authority.path);},/missing from source inventory/],
  ['unlisted window',f=>{f.current.sourceBindings=f.current.sourceBindings.filter(b=>b.path!==f.windowBinding.path);},/missing from source inventory/],
  ['unlisted start',f=>{f.current.sourceBindings=f.current.sourceBindings.filter(b=>b.path!==f.startBinding.path);},/missing from source inventory/],
  ['duplicate normalized path',f=>f.current.sourceBindings.push({...f.authority,path:f.authority.path.replace('/authority.json','/x/../authority.json')}),/duplicate normalized/],
  ['null renewal descriptor',f=>{f.current.operationalAdmission.campaignRenewal=null;},/invalid renewal binding/],
  ['approval absent',f=>{f.renewal.approved=false;},/explicit time-only renewal/],
  ['wrong original bytes',f=>{f.records.get(f.originalBinding.path).value.limits.unchanged=false;},/original declaration differs/],
  ['altered old deadline',f=>{f.renewal.originalCampaignDeadline=f.current.campaignDeadline;},/historical dates differ/],
  ['altered current deadline',f=>{f.current.campaignDeadline='2026-08-29T01:12:37Z';},/dates differ from renewal/],
  ['shortened consistent window',f=>{f.current.campaignDeadline=f.renewal.authorizedDeadline='2026-08-29T01:12:35Z';},/fixed twelve-hour window/],
  ['new window overlaps old',f=>{f.current.campaignStart=f.renewal.authorizedStart=f.original.campaignStart;f.current.campaignDeadline=f.renewal.authorizedDeadline=f.original.campaignDeadline;},/distinct fixed twelve-hour window/],
  ['changed case order',f=>{f.renewal.caseIds=[...f.renewal.caseIds].reverse();},/case census differs/],
  ['science authority broadened',f=>{f.renewal.scientificChangesAuthorized=true;},/time-only scope/],
  ['limit authority broadened',f=>{f.renewal.limitsChangesAuthorized=true;},/time-only scope/],
  ['automatic extension allowed',f=>{f.renewal.automaticExtensionAuthorized=true;},/time-only scope/],
  ['window authority differs',f=>{f.window.authorization.userMessage='n';},/window authority differs/],
  ['start tool failed',f=>{f.start.actualTool.exit_code=1;},/start tool differs/],
  ['start tool output differs',f=>{f.start.actualTool.output='';},/start tool differs/],
  ['science changed despite renewal',f=>{f.current.scientificObligation.unchanged=false;},/historical scientific\/deadline field changed/],
  ['limits changed despite renewal',f=>{f.current.limits.unchanged=false;},/historical scientific\/deadline field changed/],
  ['scientific source changed',f=>{f.current.sourceBindings[0].sha256='b'.repeat(64);},/nonoperational source changed/],
  ['undeclared field added',f=>{f.current.extraAuthority=true;},/undeclared successor field/],
];
for(const [name,mutate,expected] of mutations)test(name,()=>{
  const f=fixture();mutate(f);assert.throws(()=>assertScientificGeneration(f.original,f.current,f.reader),expected);
});

function promptFixture() {
  const f=fixture(),prompt={...binding('prompt'),path:'renewal-test/successor-prompt.md'},requestReview=binding('request-review');
  const message='execute '+prompt.path,mode='prompt-execution-v1';
  Object.assign(f.renewal,{authorizationMode:mode,prompt,requestReview});
  f.window.authorization={mode,userMessage:message,prompt,requestReview};
  f.start.authorization={mode,directUserMessage:message,prompt,requestReview};
  f.start.actualTool.command='date -u +%Y-%m-%dT%H:%M:%SZ';
  const review={schema:'braid-program/independent-prompt-execution-authority.v1',accepted:true,directUserMessage:message,prompt,
    authorizedStart:f.current.campaignStart,authorizedDeadline:f.current.campaignDeadline,actualStartTool:structuredClone(f.start.actualTool),
    scientificChangesAuthorized:false,limitsChangesAuthorized:false,automaticExtensionAuthorized:false};
  f.current.sourceBindings.push(prompt,requestReview);f.records.set(requestReview.path,{...requestReview,value:review});
  return {...f,prompt,requestReview,review};
}
test('exact reviewed prompt execution preserves actual request and unquoted clock command',()=>{
  const f=promptFixture();assert.doesNotThrow(()=>assertScientificGeneration(f.original,f.current,f.reader));
});
const promptMutations=[
  ['unknown authority mode',f=>{f.renewal.authorizationMode='anything';},/unknown renewal authority mode/],
  ['mixed legacy and prompt modes',f=>{delete f.renewal.authorizationMode;},/mixed renewal authority modes/],
  ['missing prompt mode on start',f=>{delete f.start.authorization.mode;},/authority bindings differ/],
  ['forged literal yes on window',f=>{f.window.authorization.userMessage='y';},/window authority differs/],
  ['forged literal yes on start',f=>{f.start.authorization.directUserMessage='y';},/start tool differs/],
  ['prompt missing from source inventory',f=>{f.current.sourceBindings=f.current.sourceBindings.filter(b=>b!==f.prompt);},/prompt missing from source inventory/],
  ['request review missing from source inventory',f=>{f.current.sourceBindings=f.current.sourceBindings.filter(b=>b!==f.requestReview);},/missing from source inventory/],
  ['changed prompt hash on window',f=>{f.window.authorization.prompt={...f.prompt,sha256:'b'.repeat(64)};},/authority bindings differ/],
  ['changed request review on start',f=>{f.start.authorization.requestReview={...f.requestReview,sha256:'b'.repeat(64)};},/authority bindings differ/],
  ['unaccepted request review',f=>{f.review.accepted=false;},/reviewed prompt execution differs/],
  ['changed reviewed prompt',f=>{f.review.prompt={...f.prompt,path:'renewal-test/another.md'};},/reviewed prompt execution differs/],
  ['changed reviewed actual request',f=>{f.review.directUserMessage='execute something else';},/reviewed prompt execution differs/],
  ['changed reviewed start',f=>{f.review.authorizedStart='2026-08-28T13:12:37Z';},/reviewed prompt execution differs/],
  ['extended reviewed stop',f=>{f.review.authorizedDeadline='2026-08-29T01:12:37Z';},/reviewed prompt execution differs/],
  ['mismatched actual clock return',f=>{f.start.actualTool.output='wrong\n';},/reviewed prompt execution differs/],
  ['unreviewed shell normalization',f=>{f.start.actualTool.command=f.review.actualStartTool.command='date  -u +%Y-%m-%dT%H:%M:%SZ';},/start tool differs/],
  ['review grants scientific changes',f=>{f.review.scientificChangesAuthorized=true;},/reviewed prompt execution differs/],
];
for(const [name,mutate,expected] of promptMutations)test(name,()=>{
  const f=promptFixture();mutate(f);assert.throws(()=>assertScientificGeneration(f.original,f.current,f.reader),expected);
});
