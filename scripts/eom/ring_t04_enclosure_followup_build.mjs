#!/usr/bin/env node
// Explicit-use controlled build only; does not run the scientific retry.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runWatched, sha256 } from './run-f5-ordinary-evolution.mjs';

const out=resolve('.local-data/ring-followup/t04/build');
mkdirSync(out,{recursive:true});
const limits={wallSeconds:600,heartbeatSeconds:15,aggregateRssBytes:1610612736,
  rssSampleIntervalSeconds:1,maximumRssSampleGapSeconds:2,logBytes:16777216,
  outputBytes:16777216,aggregateOutputBytes:67108864,diskMinimumBytes:5368709120,
  minimumHostMemoryFreePercent:20};
if(sha256('abc')!=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')throw new Error('known digest failed');
const known=await runWatched({command:'/usr/bin/true',args:[],output:resolve(out,'known-process'),limits,budgetRoot:out});
if(!known.processSucceeded)throw new Error('known successful process control failed');
writeFileSync(resolve(out,'known.json'),JSON.stringify({passed:true,known,sha256AbcPassed:true})+'\n');
process.stdout.write('Known process/digest controls passed before build target.\n');
const target=await runWatched({command:'/opt/homebrew/bin/cmake',args:['--build',resolve('.tmp/ring-followup/t04/build'),
  '--parallel','2','--target','eom_borg_shadow_cli','eom_native_acceleration_fixture_cli'],
  output:resolve(out,'target-process'),limits,budgetRoot:out});
writeFileSync(resolve(out,'target.json'),JSON.stringify({passed:target.processSucceeded,target,limits,compilerWorkers:2})+'\n');
if(!target.processSucceeded)throw new Error('fresh build failed');
process.stdout.write('Fresh controlled followup EOM/acceleration-fixture build passed.\n');
