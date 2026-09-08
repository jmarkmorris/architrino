import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {prepareF5OriginalInputTree,readF5RegularBytes} from '../../../../../scripts/eom/prepare-f5-original-input-tree.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known digest control passed before original source recovery.');
const originals=[
 ['src/eom/native/eom_f5_enclosed_root_cli.cpp','eom_f5_enclosed_root_cli.cpp.9f7661f40001.source','9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81'],
 ['src/eom/CMakeLists.txt','CMakeLists.txt.e4b3a8bdfc91.source','e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd'],
];
if(process.argv.length!==3)throw new Error('usage: prepare-api-reference-root.mjs NEW-ROOT');
const dir=path.dirname(new URL(import.meta.url).pathname),root=process.cwd();
const inputs=originals.map(([logicalPath,name,expected])=>{const physicalPath=path.join(dir,name),bytes=readF5RegularBytes(physicalPath);assert.equal(sha(bytes),expected);return {logicalPath,physicalPath,bytes,sha256:expected};});
const base=prepareF5OriginalInputTree(process.argv[2]);
fs.renameSync(path.join(base.executionRoot,'f5-original-input-tree.json'),path.join(base.executionRoot,'materialization-before-reference-overlay.json'));
for(const row of inputs)fs.writeFileSync(path.join(base.executionRoot,row.logicalPath),row.bytes);
const files=base.files.map(row=>{const original=inputs.find(r=>r.logicalPath===row.logicalPath);return original?{logicalPath:row.logicalPath,physicalPath:original.physicalPath,sha256:original.sha256,bytes:original.bytes.length}:row;});
for(const row of files){const bytes=readF5RegularBytes(path.join(base.executionRoot,row.logicalPath));assert.equal(sha(bytes),row.sha256);assert.equal(bytes.length,row.bytes);const origin=readF5RegularBytes(path.resolve(root,row.physicalPath));assert.equal(sha(origin),row.sha256);}
const record={schema:'braid-program/f5-api-reference-root.v1',referenceOnly:true,subjectExecuted:false,accepted:false,executionRoot:base.executionRoot,originRoot:root,files,originalSourceRecovery:{gitRef:'0fb575921783188ce528a45c671090e9ecc00464',paths:originals.map(row=>row[0])},boundary:'Original subject source objects are data solely for the unchanged API proof source-authentication predicate. No compiler, root adapter or other subject executable may execute from this reference-only tree. Applicability to the current separately captured build requires the independent path-only source transition review.'};
fs.writeFileSync(path.join(base.executionRoot,'f5-api-reference-root.json'),JSON.stringify(record,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({executionRoot:base.executionRoot,referenceOnly:true,files:files.length,accepted:false}));
