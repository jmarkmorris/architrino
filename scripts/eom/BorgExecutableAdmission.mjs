// Build provenance and byte consistency do not confer scientific acceptance.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {captureSet} from '../equation-mapping/current-source-transition.mjs';
import {decode,sha256} from '../equation-mapping/current-source-manifest.mjs';
import {BORG_RUNTIME_MAP,BORG_RUNTIME_SELECTION,borgConsumerAdmission} from '../borg/selected-runtime-admission.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const exact=(o,keys)=>assert.deepEqual(Object.keys(o??{}).sort(),keys.split(' ').sort(),'Closed Borg executable record required');
export function retainBorgExecutable({binaryPath,executableBinding}={}) {
  const admission=borgConsumerAdmission(import.meta.url);
  binaryPath=path.resolve(binaryPath);
  const captures=captureSet(path.dirname(binaryPath));
  const retain=(filename,expected)=>{
    assert.equal(path.dirname(filename),path.dirname(binaryPath),'Executable evidence must share canonical directory');
    return captures.capture(path.basename(filename),expected);
  };
  if(executableBinding){
    // Only the already authenticated declaration owner supplies this value.
    exact(executableBinding,'path sha256');
    assert.equal(path.resolve(executableBinding.path),binaryPath,'Reviewed executable path differs');
    retain(binaryPath,executableBinding.sha256);
  }else{
    const selectorPath=binaryPath+'.option-b-selection.json';
    assert.ok(fs.existsSync(selectorPath),'Borg executable requires admitted build provenance; run node scripts/eom/prepare-borg-native-binary.mjs --build-directory DIR');
    const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].map(String);
    assert.equal(fs.realpathSync(selectorPath),selectorPath,'Canonical executable selection required');
    const fd=fs.openSync(selectorPath,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW|fs.constants.O_NONBLOCK);
    let selectorBytes,initial;
    try{const stat=fs.fstatSync(fd,{bigint:true});assert.ok(stat.isFile(),'Regular executable selection required');initial=identity(stat);selectorBytes=fs.readFileSync(fd);assert.deepEqual(identity(fs.fstatSync(fd,{bigint:true})),initial,'Executable selection changed during first read');}
    finally{fs.closeSync(fd);}
    assert.deepEqual(identity(fs.lstatSync(selectorPath,{bigint:true})),initial,'Executable selection replaced during first read');
    const selector=decode(selectorBytes);
    exact(selector,'schema record recordSha256');assert.equal(selector.schema,'borg-eom-build-selection/v1');
    retain(selectorPath,sha256(selectorBytes));
    assert.deepEqual(identity(fs.lstatSync(selectorPath,{bigint:true})),initial,'Executable selection replaced before retained capture');
    assert.equal(selector.record,path.basename(binaryPath)+'.option-b-build.json','Exact build record path required');
    const record=decode(retain(path.join(path.dirname(binaryPath),selector.record),selector.recordSha256));
    exact(record,'schema buildSucceeded scientificAcceptance executionAuthorized sourceSelection sourceMapSha256 executable toolchain');
    assert.equal(record.schema,'borg-eom-development-build/v1');
    assert.equal(record.buildSucceeded,true);assert.equal(record.scientificAcceptance,false);assert.equal(record.executionAuthorized,false);
    assert.deepEqual(record.sourceSelection,decode(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_SELECTION))),'Build source selection differs');
    assert.equal(record.sourceMapSha256,sha256(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_MAP))),'Build source map differs');
    exact(record.executable,'path sha256');assert.equal(record.executable.path,binaryPath,'Build executable path differs');
    retain(binaryPath,record.executable.sha256);
    exact(record.toolchain,'path sha256');
    const tools=captureSet(path.dirname(record.toolchain.path));tools.capture(path.basename(record.toolchain.path),record.toolchain.sha256);
    return Object.freeze({check(){admission.check();captures.check();tools.check();}});
  }
  return Object.freeze({check(){admission.check();captures.check();}});
}
