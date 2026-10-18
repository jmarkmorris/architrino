import { readFileSync, createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createEomResponseView } from '../eom/EomResponseRecord.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
const OBLATE_SOURCE='73fca86f9e0a2ec032ba015d83aed447e0f99a40aee8d7f7b22d6e4acaa88fcb';
const OBLATE_BINARY='d0ba308fcf04240444bbed16d8dc2c5ecae16f127225feabc7bc17ba17c6b63c';
const OBLATE_REPORT='9aace25c9b5360d1330f6104de247392b59b231e43b9a2f138a6aa1f7cdf8148';
const TORUS_SOURCE='40816eb93c7d42e30e3a028d1f3cd80292980704a50717e9208baf3355ec4771';
const TORUS_BINARY='f417c26738cf0e6b5528ffe0e4ab5e9bdfa7c3c68d7900d6e8bc83b4296adf6a';
const TORUS_REPORT='d6bd404abea214d32337b21278b0055faacb2612f5cec85b67e7e2e0afaaf013';
const cases=Object.freeze({
  'torus-outer':{directory:'surface-torus-2026-10-14',variant:'base',id:'torus-qualified-outer',responseSha:'fa486ce0e2d5699442b53f468e6f21fc4814b981a9c5885eba3d809dd2a0396b',requestSha:'4e9a8d6129e3024204863a620f7c26c55aac4b25e6d7e0c54b0bbf63431ea04f',scope:'independently compared finite outer-shoulder ring-torus 3:3 case through 0.15; artificial support, declared memory and conditional older ambient-radius exclusion; production inclusion is the coherent-solution premise; no settling/stability claim'},
  'torus-inner':{directory:'surface-torus-2026-10-14',variant:'inner',id:'torus-qualified-inner',responseSha:'cbb6ffd88832a1099a106fb7ff8641e67e363ddcdf2d5f402fcbbb881b7fb178',requestSha:'708dc0be1c762cc7b9439fbc5bc5169fce2be5616e1d822365435f423c332c92',scope:'independently compared finite inner-shoulder ring-torus 3:3 case through 0.15; artificial support, declared memory and conditional older ambient-radius exclusion; production inclusion is the coherent-solution premise; no settling/stability claim'},
  sphere:{directory:'surface-stage-d-2026-10-11',variant:'base',id:'stage-d-base',responseSha:'7a62c923420a04c22926588399c0ae9d8dc1417b51c3e934327f3dc2109294e4',requestSha:'9b97d29915825101d6795d540634d4d05b7da7b9ab670d35c0fb05dd6fca7a20',scope:'independently compared finite equatorial spherical 3:3 case through 0.25; declared retained memory, conditional older fixed-sphere exclusion; no settling/stability claim'},
  oblate:{directory:'surface-oblate-2026-10-12',variant:'base',id:'oblate-qualified-base',responseSha:'540e8121343999ea1a5e40df11b9035a5fc7c44eefe0f3960002cb291b7f301d',requestSha:'27e799b7641f8429320eb3696a658b6021dbaea78ad16c6a9523df4408e2abc6',scope:'independently compared finite off-equator oblate 3:3 case through 0.15; artificial fixed support, declared memory and conditional older fixed-shape exclusion; no settling/stability claim'},
  'sphere-latitude':{directory:'surface-oblate-2026-10-12',variant:'sphere',id:'oblate-qualified-sphere-control',responseSha:'47ca339188430fa2eaecfb672e0f0fd524ed1c09240edb367c578352fc2a0dcd',requestSha:'0ca732ff1e383e95263754632c7c37f15c5f93e9858e7c0b0147c8d2abfcface',scope:'independently compared finite northern spherical 3:3 control through 0.15; matched reduced latitude with the oblate case, artificial fixed support, declared memory and conditional older fixed-shape exclusion; no settling/stability claim'}
});
function selectedCase(repoRoot,selection){const c=cases[selection];if(!c)throw new Error('Unknown checked Surface case.');return {...c,root:join(repoRoot,'.local-data/eom',c.directory)};}
export function readQualifiedSurfaceRecord(repoRoot,selection='sphere') {
  const c=selectedCase(repoRoot,selection);
  const raw=readFileSync(join(c.root,c.variant+'.response.json')), requestBytes=readFileSync(join(c.root,c.variant+'.request.json'));
  if(hash(raw)!==c.responseSha || hash(requestBytes)!==c.requestSha) throw new Error('Retained checked Surface request/output identity mismatch.');
  const payload=JSON.parse(raw);
  const binding=selection.startsWith('torus-')?{source:TORUS_SOURCE,binary:TORUS_BINARY,report:TORUS_REPORT}:selection!=='sphere'?{source:OBLATE_SOURCE,binary:OBLATE_BINARY,report:OBLATE_REPORT}:null;
  if(binding && (payload.resolvedModel?.build?.sourceDigest!==binding.source || hash(readFileSync(join(c.root,'engine/eom_borg_shadow_cli')))!==binding.binary || hash(readFileSync(join(c.root,'independent-report.json')))!==binding.report)) throw new Error('Retained checked Surface build/reference identity mismatch.');
  const result=createEomResponseView(payload,{id:c.id,bytes:raw.length,sha256:c.responseSha,rawHref:`/api/eom/v2/qualified-${selection}/raw`,durable:true});
  return {schema:'surface_playback_record/v1',request:JSON.parse(requestBytes),results:[result],provenance:{kind:'retained-surface-reference-case',caseId:selection,sourceSha256:c.responseSha,requestSha256:c.requestSha,buildSourceDigest:payload.resolvedModel?.build?.sourceDigest,...(binding?{binarySha256:binding.binary,independentReportSha256:binding.report}:{}),scope:c.scope}};
}
export function streamQualifiedSurfaceRecord(repoRoot,selection='sphere') {
  const c=selectedCase(repoRoot,selection);
  // Verify pinned original request/output/build identities before download.
  readQualifiedSurfaceRecord(repoRoot,selection);
  return createReadStream(join(c.root,c.variant+'.response.json'));
}
