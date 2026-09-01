import assert from "node:assert/strict";
import {mkdtempSync,readFileSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import test from "node:test";
import {SUBFIELD_CIRCULAR_CLI_PATH,subfieldCircularApiSpeedBox,subfieldCircularExactDecimal,subfieldCircularOriginalJson,assertSubfieldCircularPhaseSequence,
  inspectSubfieldCircularRowForTests,reduceSubfieldCircularPhaseSnapshot,inspectSubfieldCircularRoundingForTests,inspectSubfieldCircularNDJSONForTests,subfieldCircularSha256} from "../src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const PV="0.0000002384185791015625",H="a".repeat(64);
const fractionCompare=(a,b)=>a.n*b.d<b.n*a.d?-1:a.n*b.d>b.n*a.d?1:0;
function segment(velocity=["0","0","0"]) {return {tStart:"2",tEnd:"2.002",coefficients:velocity.map(v=>["0",v,"0","0"]),velocityErrors:[PV,PV,PV]};}

test("exact decimal comparisons preserve distinctions below binary64 precision",()=>{
  const a=subfieldCircularExactDecimal("1.00000000000000000000000000000000000000001"),b=subfieldCircularExactDecimal("1");
  assert.equal(fractionCompare(a,b),1);assert.equal(fractionCompare(subfieldCircularExactDecimal("1e-8"),subfieldCircularExactDecimal("0.00000001")),0);
  for(const token of [NaN,1,"NaN","Infinity","1e9999","bad"])assert.throws(()=>subfieldCircularExactDecimal(token));
});
test("independent API speed enclosure covers a stationary polynomial and positive error radii",()=>{
  const result=subfieldCircularApiSpeedBox(segment());assert.equal(result.strictlySubField,true);
  assert.ok(Number(result.normUpper)>=Math.sqrt(3)*Number(PV));assert.ok(Number(result.normUpper)<1e-6);
  for(const [lo,hi]of result.velocityBoxes){assert.ok(Number(lo)<=-Number(PV));assert.ok(Number(hi)>=Number(PV));}
});
test("constant 3-4-5 tangent control has the independently known half-unit speed",()=>{
  const result=subfieldCircularApiSpeedBox(segment(["0.3","0.4","0"]));assert.equal(result.strictlySubField,true);
  assert.ok(Number(result.normUpper)>0.5);assert.ok(Number(result.normUpper)<0.500002);
});
test("strict unit-speed gate includes the actual positive velocity error boxes",()=>{
  assert.equal(subfieldCircularApiSpeedBox(segment(["1","0","0"])).strictlySubField,false);
  assert.equal(subfieldCircularApiSpeedBox(segment(["2","0","0"])).strictlySubField,false);
});
test("cubic derivative bound uses local time, not global absolute time",()=>{
  const row=segment();row.coefficients[0]=["0","0","1","0"];
  const result=subfieldCircularApiSpeedBox(row);assert.ok(Number(result.normUpper)>0.004);assert.ok(Number(result.normUpper)<0.004002);
});
test("dyadic lifts near zero remain outward enclosures, never silently exact fixed-point points",()=>{
  const row=segment(["1e-300","0","0"]);const result=subfieldCircularApiSpeedBox(row);
  assert.equal(result.strictlySubField,true);assert.ok(Number(result.normUpper)>Number(PV));
});
test("invalid or overflowed carrier inputs fail closed",()=>{
  for(const token of ["Infinity","1e400","1e-400"]){const row=segment([token,"0","0"]);assert.throws(()=>subfieldCircularApiSpeedBox(row));}
  const row=segment();row.velocityErrors[1]="0";assert.throws(()=>subfieldCircularApiSpeedBox(row),/cubic\/error/u);
});
test("outward fixed-point operations enclose actual binary64 cancellation, products and subnormals",()=>{
  function adjacent(value,direction){if(value===0)return direction*Number.MIN_VALUE;const view=new DataView(new ArrayBuffer(8));view.setFloat64(0,value);view.setBigUint64(0,view.getBigUint64(0)+BigInt(value>0?direction:-direction));return view.getFloat64(0);}
  function ratio(value){const view=new DataView(new ArrayBuffer(8));view.setFloat64(0,value);const bits=view.getBigUint64(0),e=Number((bits>>52n)&2047n),m=(bits&((1n<<52n)-1n))+(e?1n<<52n:0n),power=e?e-1075:-1074,sign=bits>>63n?-1n:1n;return power<0?{n:sign*m,d:1n<<BigInt(-power)}:{n:sign*(m<<BigInt(power)),d:1n};}
  for(const [a,b] of [["0.1","0.2"],["-0.1","0.2"],["1","-1"],["1e-300","-1e-300"],["0","0"]])for(const operation of ["add","subtract","multiply"]){
    const result=inspectSubfieldCircularRoundingForTests(a,b,operation),x=Number(a),y=Number(b),z=operation==="add"?x+y:operation==="subtract"?x-y:x*y;
    assert.equal(result.accepted,false);assert.ok(fractionCompare(subfieldCircularExactDecimal(result.interval[0]),ratio(adjacent(z,-1)))<=0);assert.ok(fractionCompare(subfieldCircularExactDecimal(result.interval[1]),ratio(adjacent(z,1)))>=0);
  }
});
test("original JSON rejects duplicate keys, invalid UTF8 and excessive nesting",()=>{
  assert.throws(()=>subfieldCircularOriginalJson(Buffer.from('{"a":1,"a":2}')),/duplicate/u);
  assert.throws(()=>subfieldCircularOriginalJson(Buffer.from([0xff])));
  assert.throws(()=>subfieldCircularOriginalJson(Buffer.from("[".repeat(34)+"0"+"]".repeat(34))),/nesting/u);
});

// Abstract serialized controls exercise the checker, not the EOM adapter.
// The test entrypoint ALWAYS returns accepted:false and has no file authority.
function control(self=false,bits=53){
  const manifestId="subfield-circular-history/v1:coincident-midpoint-common-frequency:T=4",members=[0,1].map(index=>({index,constituentId:`c${index}`,worldlineId:`w${index}`,polarity:index? -1:1,historyId:`${manifestId}/w${index}`,historyFingerprint:`f${index}`,segments:[{tStart:"2",tEnd:"4"}]}));
  const index=self?0:1,receiver=members[0],transmitter=members[index],rowId=`${manifestId}/0/${index}`;
  const request={rowId,receiverHistoryId:receiver.historyId,transmitterHistoryId:transmitter.historyId,receiverHistoryFingerprint:receiver.historyFingerprint,transmitterHistoryFingerprint:transmitter.historyFingerprint,
    receiverPathId:"",sourcePathId:"",receptionTime:"4",searchLower:"2",searchUpper:"4",fieldSpeed:"1",rootTolerance:"1e-8",maxDepth:192,maxCells:300000,initialMpfrBits:128,maximumMpfrBits:512,forcePrecisionEscalation:false,deferPrecisionEscalation:false,warmStart:false,jointHistory:false,workerCount:1};
  const c={schema:"eom_native_exact_pair_certificate/v1",row_id:rowId,receiver_history_id:receiver.historyId,transmitter_history_id:transmitter.historyId,receiver_history_fingerprint:receiver.historyFingerprint,transmitter_history_fingerprint:transmitter.historyFingerprint,
    reception_time:"4",searched_lower:"2",searched_upper:"4",field_speed:"1",root_tolerance:"1e-8",status:"certified_complete",failure_code:"",diagnostic_detail:"",stable_negative_prefix_upper:"2",
    root_free_complement:true,memory_boundary_contact:false,coincident_endpoint_excluded:self,precision_escalated:bits!==53,stable_negative_prefix_certified:false,has_difficult_cell:false,
    achieved_precision_bits:bits,visited_cells:300000,excluded_cells:0,difficult_cells:0,mpfr_attempt_count:bits===53?0:Math.log2(bits/128)+1,mpfr_escalation_attempt_count:bits===53?0:Math.log2(bits/128),warm_excluded_cells:0,reevaluated_cells:0,incremental_prefix_reuse_count:0,difficult_source_segment_index:0,difficult_lower_sign:0,difficult_upper_sign:0,root_free_cells:[],
    roots:self?[]:[{lower:"3",upper:"3.0000000001",transmitter_factor_lower:"0.6",transmitter_factor_upper:"1.4",receiver_factor_lower:"0.6",receiver_factor_upper:"1.4",transmitter_factor_sign:1,transmitter_segment_indices:[0],precision_route:bits===53?"binary64_outward":"mpfr_directed_interval",precision_bits:bits}]};
  for(const field of ["difficult_cell_lower","difficult_cell_upper","difficult_point","difficult_point_residual_lower","difficult_point_residual_upper","difficult_transmitter_factor_lower","difficult_transmitter_factor_upper","difficult_receiver_factor_lower","difficult_receiver_factor_upper"])c[field]="";
  for(const field of ["binary64_worker_wall_seconds","binary64_setup_wall_seconds","binary64_warm_start_wall_seconds","binary64_cell_setup_wall_seconds","binary64_cell_classification_wall_seconds","binary64_finalization_wall_seconds","mpfr_worker_wall_seconds","mpfr_escalation_worker_wall_seconds","warm_residual_drift_upper"])c[field]=0;
  const row={schema:"braid-program/subfield-circular-root-row.v1",candidateId:"coincident-midpoint-common-frequency",rung:2,phase:0,manifestId,historyManifestSha256:H,conformanceSha256:H,sourceBinding:{path:"not-an-actual-source",sha256:H},receiverIndex:0,transmitterIndex:index,
    receiverConstituentId:receiver.constituentId,transmitterConstituentId:transmitter.constituentId,receiverWorldlineId:receiver.worldlineId,transmitterWorldlineId:transmitter.worldlineId,receiverPolarity:receiver.polarity,transmitterPolarity:transmitter.polarity,receiverInflatedSpeedUpper:0,transmitterInflatedSpeedUpper:0,request,h3EvidenceEligible:false,certificate:c,pairWallSeconds:0,adapterFailureCode:"",rowPassed:true};
  const context={manifest:{candidateId:"coincident-midpoint-common-frequency",members,sourceBinding:row.sourceBinding},proof:{manifestSha256:H},sourceRow:{vUpper:"0.5"},speedBounds:members.map(()=>({normUpper:"0.6"})),options:{conformanceSha256:H},rung:2,phase:0,reception:"4",lower:"2",manifestId};
  return {row,context,index};
}
const inspect=fixture=>inspectSubfieldCircularRowForTests(fixture.row,fixture.context,fixture.index);
test("local complete partner control is structural only; empty MPFR cache is legitimate",()=>{
  for(const precision of [53,128,256,512]){const result=inspect(control(false,precision));assert.equal(result.accepted,false);assert.equal(result.testOnly,true);assert.equal(result.roots.length,1);}
});
test("self control needs excluded endpoint and independently bounded actual speed",()=>{
  const fixture=control(true);assert.equal(inspect(fixture).accepted,false);
  fixture.context.speedBounds[0].normUpper="1";assert.throws(()=>inspect(fixture),/independently bounded/u);
  fixture.context.speedBounds[0].normUpper="0.6";fixture.row.certificate.coincident_endpoint_excluded=false;assert.throws(()=>inspect(fixture),/inventory/u);
});
test("root width uses exact decimals and factor overlap is not interval containment",()=>{
  const fixture=control();fixture.row.certificate.roots[0].upper="3.00000001000000000000000000000000000000000001";assert.throws(()=>inspect(fixture),/tolerance/u);
  fixture.row.certificate.roots[0].upper="3.00000001";fixture.row.certificate.roots[0].receiver_factor_lower="0.1";assert.equal(inspect(fixture).accepted,false);
  fixture.row.certificate.roots[0].receiver_factor_upper="0.2";assert.throws(()=>inspect(fixture),/factor/u);
});
test("row schema, complete census order, source identity and fixed requests are enforced",()=>{
  for(const mutate of [f=>{f.row.receiverIndex=1;},f=>{f.row.request.maxCells=299999;},f=>{f.row.request.warmStart=true;},f=>{f.row.historyManifestSha256="b".repeat(64);},f=>{delete f.row.certificate.roots;},f=>{f.row.extra=1;}]){const fixture=control();mutate(fixture);assert.throws(()=>inspect(fixture));}
});
test("resource contact, unresolved diagnostics, failed adapter and wrong ordinary root count reject",()=>{
  for(const mutate of [f=>{f.row.certificate.visited_cells=300001;},f=>{f.row.certificate.memory_boundary_contact=true;},f=>{f.row.certificate.difficult_point="3";},f=>{f.row.rowPassed=false;},f=>{f.row.certificate.roots=[];},f=>{f.row.certificate.mpfr_attempt_count=1;}]){const fixture=control();mutate(fixture);assert.throws(()=>inspect(fixture));}
});
test("nonempty root-free caches must carry ordered, cited residual exclusions",()=>{
  const fixture=control();fixture.row.certificate.root_free_cells=[{transmitter_segment_index:0,lower:"2",upper:"2.5",residual_lower:"-2",residual_upper:"-1",receiver_factor_lower:"-1",receiver_factor_upper:"1",lower_value:2,upper_value:2.5,residual_lower_value:-2,residual_upper_value:-1,numeric_values_valid:true}];
  assert.equal(inspect(fixture).accepted,false);fixture.row.certificate.root_free_cells[0].residual_upper="1";assert.throws(()=>inspect(fixture),/contains zero/u);
});
test("ordinary cached imports cannot produce accepted phase receipts",async()=>{
  await assert.rejects(reduceSubfieldCircularPhaseSnapshot({reducerBytes:Buffer.from("not actual code")}),/captured executing/u);
});

function phaseHeaders(){return [0,1].map(phase=>({candidateId:"coincident-midpoint-common-frequency",rung:2,phase,receptionTime:String(4+2*phase),historyManifest:{sha256:H},members:[],sourceBinding:{path:"control",sha256:H},rows:[]}));}
test("summary scopes reject missing/duplicate phases and do not invent the cohort",()=>{
  assert.equal(assertSubfieldCircularPhaseSequence(phaseHeaders(),"candidate-rung"),undefined);
  assert.throws(()=>assertSubfieldCircularPhaseSequence(phaseHeaders().slice(0,1),"candidate-rung"),/census/u);
  assert.throws(()=>assertSubfieldCircularPhaseSequence(phaseHeaders(),"pilot"),/census/u);
  assert.throws(()=>assertSubfieldCircularPhaseSequence(phaseHeaders(),"candidate-ladder"),/census/u);
});
test("all repeated receptions across a genuine ladder require identical carriers and overlapping roots",()=>{
  const receipts=[8,32,128].flatMap(rung=>Array.from({length:rung},(_,phase)=>({candidateId:"coincident-midpoint-common-frequency",rung,phase,receptionTime:String(4+4*phase/rung),historyManifest:{sha256:H},members:[],sourceBinding:{path:"control",sha256:H},rows:[{receiverIndex:0,transmitterIndex:1,roots:[{lower:"3",upper:"3.000000001"}]}]})));
  assert.equal(assertSubfieldCircularPhaseSequence(receipts,"candidate-ladder"),undefined);
  receipts[40].rows[0].roots[0]={lower:"3.1",upper:"3.2"};assert.throws(()=>assertSubfieldCircularPhaseSequence(receipts,"candidate-ladder"),/disjoint/u);
});
test("CLI requires authenticated receipt hashes and never overwrites existing output",()=>{
  const directory=mkdtempSync(path.join(tmpdir(),"subfieldCircular-ledger-negative-")),output=path.join(directory,"existing.json");writeFileSync(output,"preserve\n");
  const command=[path.join(ROOT,SUBFIELD_CIRCULAR_CLI_PATH),"--repo-root",ROOT,"--history-manifest",path.join(directory,"missing"),"--conformance",path.join(directory,"proof"),"--conformance-sha256",H,"--rows",path.join(directory,"rows"),"--build-receipt",path.join(directory,"build"),"--build-receipt-sha256",H,"--out",output];
  const result=spawnSync(process.execPath,command,{encoding:"utf8",timeout:15000});assert.equal(result.status,1);assert.match(result.stderr,/already exists/u);assert.equal(readFileSync(output,"utf8"),"preserve\n");
  const missing=spawnSync(process.execPath,[path.join(ROOT,SUBFIELD_CIRCULAR_CLI_PATH),"--out",path.join(directory,"new.json")],{encoding:"utf8",timeout:15000});assert.equal(missing.status,1);assert.match(missing.stderr,/needs/u);
});
test("NDJSON byte hash spans chunks without dropping large cell arrays",async()=>{
  const directory=mkdtempSync(path.join(tmpdir(),"subfieldCircular-ledger-stream-")),filename=path.join(directory,"rows.ndjson");
  const bytes=Buffer.from(JSON.stringify({root_free_cells:Array.from({length:20000},(_,index)=>({index,token:"1234567890"}))})+"\n"+JSON.stringify({second:true})+"\n");
  writeFileSync(filename,bytes);const result=await inspectSubfieldCircularNDJSONForTests(filename);assert.equal(result.accepted,false);assert.equal(result.raw.sha256,subfieldCircularSha256(bytes));assert.equal(result.raw.bytes,bytes.length);assert.equal(result.raw.rowCount,2);
});
test("NDJSON partial lines and empty rows cannot count as flushed scientific rows",async()=>{
  const directory=mkdtempSync(path.join(tmpdir(),"subfieldCircular-ledger-partial-"));
  for(const [index,text]of ["{}","{}\n\n"].entries()){const filename=path.join(directory,`${index}.ndjson`);writeFileSync(filename,text);await assert.rejects(inspectSubfieldCircularNDJSONForTests(filename));}
});
