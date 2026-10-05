#!/usr/bin/env node
// Controlled focused checks; no scientific evolution or frozen oracle edits.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runWatched } from './run-f5-ordinary-evolution.mjs';

const args=process.argv.slice(2);
if(args.length!==0 && !(args.length===2&&args[0]==='--out'))throw new Error('usage: [--out FRESH_DIR]');
const out=resolve(args[1]??'.local-data/ring-followup/t04/checks');
mkdirSync(out,{recursive:true});
const limits={wallSeconds:300,heartbeatSeconds:15,aggregateRssBytes:1610612736,
  rssSampleIntervalSeconds:1,maximumRssSampleGapSeconds:2,logBytes:16777216,
  outputBytes:16777216,aggregateOutputBytes:67108864,diskMinimumBytes:5368709120,
  minimumHostMemoryFreePercent:20};
const run=async(name,command,args)=>{
  const record=await runWatched({command,args,output:resolve(out,name),limits,budgetRoot:out});
  if(!record.processSucceeded)throw new Error(`${name} failed`);
  return record;
};
const known=await run('known-process',resolve('.tmp/ring-followup/t04/enclosure-fixture'),['known']);
if(JSON.parse(readFileSync(resolve(out,'known-process/stdout.json'),'utf8')).passed!==true)throw new Error('known analytical controls failed');
writeFileSync(resolve(out,'known.json'),JSON.stringify({passed:true,known})+'\n');
process.stdout.write('Fresh production analytical controls passed before fixture/oracle targets.\n');
const fixture=await run('fixture-process',resolve('.tmp/ring-followup/t04/build/eom_native_acceleration_fixture_cli'),['all']);
const regression=await run('regression-process',resolve('../.venv/bin/python'),[
  resolve('scripts/eom/ring_t04_enclosure_followup_regression.py'),'--packet',resolve(out,'fixture-process/stdout.json')]);
writeFileSync(resolve(out,'target.json'),JSON.stringify({passed:true,fixture,regression,limits})+'\n');
process.stdout.write('Selected unchanged sharp/rail oracle comparison tests passed.\n');
