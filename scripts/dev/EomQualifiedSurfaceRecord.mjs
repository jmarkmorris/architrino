import { readFileSync, createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createEomResponseView } from '../eom/EomResponseRecord.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
const BASE_SHA='7a62c923420a04c22926588399c0ae9d8dc1417b51c3e934327f3dc2109294e4';
const REQUEST_SHA='9b97d29915825101d6795d540634d4d05b7da7b9ab670d35c0fb05dd6fca7a20';
export function readQualifiedSurfaceRecord(repoRoot) {
  const root=join(repoRoot,'.local-data/eom/surface-stage-d-2026-10-11');
  const raw=readFileSync(join(root,'base.response.json')), requestBytes=readFileSync(join(root,'base.request.json'));
  if(hash(raw)!==BASE_SHA || hash(requestBytes)!==REQUEST_SHA) throw new Error('Retained qualified sphere identity mismatch.');
  const result=createEomResponseView(JSON.parse(raw),{id:'stage-d-base',bytes:raw.length,sha256:BASE_SHA,rawHref:'/api/eom/v2/qualified-sphere/raw',durable:true});
  return {schema:'surface_playback_record/v1',request:JSON.parse(requestBytes),results:[result],provenance:{kind:'retained-stage-d-reference-case',sourceSha256:BASE_SHA,scope:'independently compared finite spherical 3:3 case through 0.25; declared retained memory, conditional older fixed-sphere exclusion; no settling/stability claim'}};
}
export function streamQualifiedSurfaceRecord(repoRoot) {
  const path=join(repoRoot,'.local-data/eom/surface-stage-d-2026-10-11/base.response.json');
  // Hash and byte validation precede offering the immutable original download.
  readQualifiedSurfaceRecord(repoRoot);
  return createReadStream(path);
}
