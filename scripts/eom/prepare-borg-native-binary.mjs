#!/usr/bin/env node
// Development build provenance only; no scientific release is authorized.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {borgConsumerAdmission,BORG_RUNTIME_MAP,BORG_RUNTIME_SELECTION} from '../borg/selected-runtime-admission.mjs';
import {captureSet} from '../equation-mapping/current-source-transition.mjs';
import {decode,sha256} from '../equation-mapping/current-source-manifest.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
export function prepareBorgNativeBinary({buildDirectory=path.join(ROOT,'.tmp/eom-native-dev'),cmakePath}={}) {
  const admission=borgConsumerAdmission(import.meta.url);
  if(!cmakePath){
    const directories=[...String(process.env.PATH??'').split(path.delimiter),'/opt/homebrew/bin','/usr/local/bin'];
    cmakePath=directories.map(p=>path.join(p,'cmake')).find(p=>fs.existsSync(p));
  }
  assert.ok(cmakePath,'cmake executable required');
  cmakePath=fs.realpathSync(cmakePath);
  const toolchain={path:cmakePath,sha256:sha256(fs.readFileSync(cmakePath))};
  const tools=captureSet(path.dirname(cmakePath));tools.capture(path.basename(cmakePath),toolchain.sha256);
  buildDirectory=path.resolve(buildDirectory);
  const invoke=args=>{admission.check();tools.check();const result=spawnSync(cmakePath,args,{cwd:ROOT,encoding:'utf8'});admission.check();tools.check();assert.equal(result.status,0,result.error?.message||result.stderr||result.stdout||'Borg build failed');};
  invoke(['-S',path.join(ROOT,'src/eom'),'-B',buildDirectory,'-DCMAKE_BUILD_TYPE=Release']);
  invoke(['--build',buildDirectory,'--target','eom_borg_shadow_cli','--parallel','8']);
  const binaryPath=path.join(buildDirectory,'eom_borg_shadow_cli');
  const executable={path:binaryPath,sha256:sha256(fs.readFileSync(binaryPath))};
  const binaries=captureSet(buildDirectory);binaries.capture(path.basename(binaryPath),executable.sha256);
  const record={schema:'borg-eom-development-build/v1',buildSucceeded:true,scientificAcceptance:false,executionAuthorized:false,
    sourceSelection:decode(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_SELECTION))),sourceMapSha256:sha256(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_MAP))),executable,toolchain};
  const bytes=Buffer.from(JSON.stringify(record,null,2)+'\n');
  const selector={schema:'borg-eom-build-selection/v1',record:path.basename(binaryPath)+'.option-b-build.json',recordSha256:sha256(bytes)};
  admission.check();tools.check();binaries.check();
  // Publish selection last. A partial write cannot satisfy the selected digest.
  fs.writeFileSync(binaryPath+'.option-b-build.json',bytes,{mode:0o600});
  fs.writeFileSync(binaryPath+'.option-b-selection.json',JSON.stringify(selector,null,2)+'\n',{mode:0o600});
  admission.check();tools.check();binaries.check();
  return binaryPath;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);assert.ok(args.length===0||(args.length===2&&args[0]==='--build-directory'),'usage: --build-directory DIR');
  process.stdout.write(prepareBorgNativeBinary({buildDirectory:args[1]})+'\n');
}
