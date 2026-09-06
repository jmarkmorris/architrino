#!/usr/bin/env python3
"""One-cell refined F6c acceleration candidate, never self-accepted evidence.

This separate producer maps original source records directly to the unchanged
abfc CellRangeInput. It imports neither the independent projection core nor
either range checker. Prior query/cover evidence is authenticated, not evaluated.
Only captured abfc bytes execute for immutable dataclasses and evaluate_cell.
The external registered supervisor owns whole-attempt resources/process closure.
"""
from __future__ import annotations

import argparse
from contextlib import contextmanager, ExitStack
from dataclasses import asdict
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import os
from pathlib import Path
import re
import resource
import signal
import stat
import subprocess
import sys
import tempfile
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/prepare-f6c-refined-acceleration.py'
CONTROLS = 'tests/test_f6c_refined_acceleration_preparation.py'
DECLARATION = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-refined-cover-acceleration-projection.md'
REFERENCE = 'scripts/eom/oracle/continuous_reception_acceleration.py'
REFERENCE_SHA = 'abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'
BASE = '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/'
FIXED = (
    ('export', '.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json', 'f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1'),
    ('reconstruction', '.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json', '7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43'),
    ('guards', '.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json', '86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880'),
    ('manifest', BASE+'subject/cover-manifest.json', '19fae257f7f36d858fa60d9031125b3f29dbb8780e944802699aab5292275f4c'),
    ('comparison', BASE+'comparison.json', '6bf2b50ef4f0b46f43ae77a9881f82a2f9d504d5df757bc0ad215deb8eac36c6'),
    ('admission', BASE+'pilot-admission.json', '1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee'),
    ('rows', BASE+'subject/rows.ndjson', '786785b2597bcdf024e350ba89c129fb32115afed693169a6db3137c6bdca383'),
    ('pieces', BASE+'subject/pieces.ndjson', '2c064a5956e7684868cbda7aa7e312ac609e07760bf67f1cf121c934d6d4c411'),
    ('priorPlan', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json', '5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86'),
    ('priorClosureOwner', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md', '8263f700a35af04b07690c81c17e0d1078eadb1fb32550cc60226b6efa0f6378'),
    ('reference', REFERENCE, REFERENCE_SHA),
    ('referenceControls', 'tests/test_eom_continuous_reception_acceleration.py', '26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'),
    ('referenceProof', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md', '8d2c7819962db6bac0e1ea0939292992145dbe342a28b51928efb81e74478179'),
    ('memberPredeclaration', 'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md', '7d4c202ce935256168ccef52e3588ffa72eb4d6509db432e814eba65ed5568bc'),
    ('rootTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md', 'db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc'),
    ('reconstructionTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md', '710279f5c348a81fd36d58c6ca704730b3fa70da729ca30b9c92ae4e1cc6734b'),
)
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
SCOPE = 'refined-pilot-cell-0-range'
SCHEMA = 'braid-program/f6c-refined-acceleration-candidate.v1'
PLAN_SCHEMA = 'braid-program/f6c-refined-acceleration-launch.v1'
MAX_BYTES, MAX_RUNTIME_BYTES, MAX_LINE = 64*1024**2, 1024**3, 128*1024
LIMIT, HEARTBEAT = 1800, 15
LIMITS = {'inclusiveSeconds':1800, 'maximumAggregateRssBytes':2*1024**3,
          'maximumRssSampleGapMs':1000, 'heartbeatSeconds':15,
          'admissionFreeMemoryPercent':40, 'admissionDiskBytes':64*1024**3,
          'stopFreeMemoryBelowPercent':20, 'stopDiskBelowBytes':16*1024**3,
          'hostObservationSeconds':15, 'hostObservationTimeoutSeconds':2,
          'maximumScientificFileBytes':MAX_BYTES, 'maximumOutputFileBytes':MAX_BYTES,
          'maximumCombinedLogBytes':16*1024**2, 'serialWorkers':1, 'eomWorkers':0}
FALSE_FLAGS = ('premise_truth_authenticated', 'subject_membership_established',
               'execution_authorized', 'metrics_available', 'h3_evidence_eligible')
ROW_KEYS = set(('rowIndex cellIndex receiverIndex transmitterIndex receiverId transmitterId reception emission '
    'ordinaryRootsPerReception coincidentEndpointExcluded oldestResidual lowerFaceResidual upperFaceResidual '
    'displacement distance transmitterFactor receiverFactor receiverPieceRecord transmitterPieceRecord '
    'rootFreeComplementConditional retainedBoundaryContact libraryFlags').split())
PIECE_KEYS = set(('recordIndex rowIndex role memberId historyDigest requestedInterval touchedPieceCount '
                  'firstIndex lastIndex contiguousIndexRange clippedPiecesSha256').split())
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
HEX = re.compile(r'[0-9a-f]{64}\Z')

# Shared protocol literals only; no checker implementation is imported.
DECLARATION_SHA='c491ada9b781d7aedf20a9f49b0a2dca92f4f5985660c1de56b83686976aab9d'
CORE='scripts/eom/oracle/f6c_refined_acceleration_conformance.py'
CORE_SHA='7574dc0fa7bec6e598e83ac7d8ad7670acaca6c10a41958b01487ac0af3ae85e'
NAMED={
 'consumer':(SELF,None),'consumerControls':(CONTROLS,None),
 'verifier':('scripts/eom/verify-f6c-refined-acceleration.py','7a985c836f9f68d16e37b056192c6be69505f3ed3de62c6d6401beea1e4bacfc'),'verifierControls':('tests/test_f6c_refined_acceleration.py','4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a'),
 'declaration':(DECLARATION,DECLARATION_SHA),
 'comparisonCore':(CORE,CORE_SHA),
 'comparisonCoreControls':('tests/test_f6c_refined_acceleration_conformance.py','147800b0ddfc9b3bf4f5889058e6df9073b70cf90798b2ad9c536289bf9a9921'),
 'rangeReference':('scripts/eom/oracle/continuous_reception_acceleration.py','abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'),
 'rangeReferenceControls':('tests/test_eom_continuous_reception_acceleration.py','26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'),
 'rangeComparison':('scripts/eom/verify-f6c-continuous-reception-acceleration.py','23a9d66b829b9397e582bf7b6bbdba7a3fd3f59546a47ccb9d80e17431ddf95d'),
 'rangeComparisonControls':('tests/test_f6c_continuous_reception_acceleration.py','13c425db38d9770f245217edb9ad5053998998fe51b7608e3457fe37c4e0d6ed')}
PRIOR_BASE='.local-data/braid-analysis/f6c-emission-refinement-20260827/pilot-cell-0-v2'
REFINED=(
 ('queries',PRIOR_BASE+'/queries.ndjson','44d59ae62f8d7d9a9e7afd1d684e8ee15b8aeadf4dc92d489a787e5e224029fa'),
 ('rows',PRIOR_BASE+'/rows.ndjson','b6309b3c90f75590ba8270ea6cea1644be46727692a19be6aa364163e108035f'),
 ('pieces',PRIOR_BASE+'/pieces.ndjson','075007966aa14b3d0c9ff896d5cb752d06e410f1002dc2bc39a8e7d8db55340a'),
 ('manifest',PRIOR_BASE+'/cover-manifest.json','d4ec0d60631dd46cf2872ace941677dfd980af6f8cdbe540347b5252d336ebb6'),
 ('comparison',PRIOR_BASE+'-outer/comparison.json','eed41550c3c743df419efab8d0f9ad6094b43fa1efe3f4949365e731c1f7c63e'),
 ('admission',PRIOR_BASE+'-outer/pilot-admission.json','51f0b3774bfb489bbab4fddd7f7612c6d4132f2654a36aa4091e5445eca9b51c'),
 ('plan','reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-launch.v2.json','295d1d8a8366942c4aa3f0c586e028faae08e2ac64517c837f0fe73a6b8b8a88'))
PRIOR_OPERATIONS=(
 ('launcherLog',PRIOR_BASE+'-outer/launcher-stderr.log','7f5b04faec494c248dc2d8f468b29d4dfaf953de063752995c3a3517ed9d2abb',8671),
 ('resourceLog',PRIOR_BASE+'-outer/resource-observations.ndjson','e8af4c71f7cd0278b8df5c831738bd5d3f0f4cfd872ebf887a6cbd3396dc4313',471433))
PRIOR_NAMED=tuple('declaration producer producerControls verifier verifierControls comparisonReference comparisonReferenceControls'.split())
PRIOR_SUBJECT_PATHS=(
 'scripts/eom/prepare-f6c-emission-refinement.py','tests/test_f6c_emission_refinement_preparation.py',
 'reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-predeclaration.md',
 'scripts/eom/oracle/continuous_reception_roots_cached.py','tests/test_eom_continuous_reception_roots_cached.py',
 'scripts/eom/oracle/certified_history.py','scripts/eom/oracle/decimal_interval.py','tests/test_eom_decimal_interval.py',
 'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','tests/test_f6c_cached_continuous_reception_root_cover.py',
 'scripts/eom/oracle/f6c_emission_refinement_conformance.py','tests/test_f6c_emission_refinement_conformance.py',
 'reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md',
 'scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','tests/test_f6c_cached_continuous_reception_root_cover_preparation.py')

LANE='.local-data/braid-analysis/f6c-refined-acceleration-20260827'
OPERATIONS=('scripts/eom/run-f6c-refined-acceleration-pilot.mjs',
 'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs',
 'tests/f6c-refined-acceleration-pilot.test.js','tests/f6c-refined-acceleration-pilot-process.test.js',
 'scripts/eom/launch-prescribed-response-pilot.mjs','scripts/eom/launch-subfield-circular-root-pilot.mjs',
 '/bin/ps','/usr/bin/memory_pressure')
OP_PINS={'scripts/eom/launch-prescribed-response-pilot.mjs':'116eb8eee6a7d9ba9a98641d836d9c4e540449279bab1e55cdce92b12e90a26c',
 'scripts/eom/launch-subfield-circular-root-pilot.mjs':'dcd4bb58b83489fe66093fa61104245aae7dbf914c6e756a2e7e0b5349908289',
 '/usr/bin/memory_pressure':'a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56'}
PLAN_KEYS=('schema','scope',*NAMED,'runtimeBindings','operationalBindings','limits','priorRefinementClosure')
CANDIDATE_KEYS=tuple('schema scope status accepted launchPlan consumer declaration verifier sourceBindings ancestryBindings refinementBindings runtimeBindings operationalBindings priorRefinementClosure projection ranges census claims publicationRequires'.split())
CANDIDATE_FLAGS=tuple('historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted rootsEvaluated independentRangeComparisonPassed executionAuthorized'.split())
CENSUS=dict(cells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,pieceRecords=112)
PUBLICATION_REQUIRES='matching fresh successful completion, externally observed inclusive deadline and owned-process closure'
CANDIDATE_PUBLICATION='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes'

PRIVATE_PREFIX='.refined-range-private-'
MANIFEST_KEYS=set('schema scope status accepted launchPlan producer fixedBindings subjectSourceBindings executionBindings priorCoverClosure members knotSha256 retainedDomain receptionDomain originalEmissionDomain precision speedUpper clearanceLower algorithm restrictions census queries rows pieces libraryFlags claims'.split())
RANGE_FLAGS=('accepted','premise_truth_authenticated','source_bytes_authenticated','root_coverage_established','subject_membership_established','historical_trajectory_identity_established','execution_authorized','metrics_available','score_authorized','h3_evidence_eligible')


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), allow_nan=False).encode()+b'\n'


def _parse_document(raw, *, metadata, string_cap):
    """Private bounded parser shared by two distinct semantic entry points."""
    require(type(raw) is bytes and 0<len(raw)<=MAX_BYTES,'bounded original JSON bytes')
    def number_int(text):
        digits=text.lstrip('-')
        require(len(digits)<=19,'integer lexical bound')
        value=int(text)
        lo,hi=(-(2**63),2**63-1) if metadata else (-(2**53-1),2**53-1)
        require(lo<=value<=hi,'integer range bound')
        return value
    def number_decimal(text):
        require(metadata,'scientific decimal must be a string')
        # Bound lexical exponent before Decimal/Fraction allocation.
        require(len(text)<=1152 and TOKEN.fullmatch(text),'metadata decimal token')
        parts=re.split('[eE]',text);mantissa=parts[0]
        exp=parts[1] if len(parts)==2 else '0'
        require(len(exp.lstrip('+-0'))<=4,'metadata exponent token')
        fractional=len(mantissa.split('.',1)[1]) if '.' in mantissa else 0
        require(abs(int(exp)-fractional)<=1000,'metadata decimal exponent')
        require(len(mantissa.lstrip('-').replace('.','').lstrip('0') or '0')<=1024,'metadata digits')
        value=Decimal(text)
        require(value.is_finite() and len(value.as_tuple().digits)<=1024
                and abs(value.as_tuple().exponent)<=1000,'metadata decimal bound')
        return value
    def pairs(items):
        require(len(items)<=10000,'object size bound')
        value={}
        for key,item in items:
            require(len(key)<=4096 and key not in value,'duplicate or oversized key')
            value[key]=item
        return value
    def nonfinite(_):raise ValueError('nonfinite JSON number')
    try:
        result=json.loads(raw.decode('utf-8',errors='strict'),object_pairs_hook=pairs,
                          parse_int=number_int,parse_float=number_decimal,parse_constant=nonfinite)
    except RecursionError as error:raise ValueError('JSON depth bound') from error
    stack=[(result,0)];nodes=0;total=0
    while stack:
        value,depth=stack.pop();nodes+=1;total+=2
        require(depth<=24 and nodes<=1000000 and total<=MAX_BYTES,'JSON structural bound')
        if type(value) is str:
            require(len(value)<=string_cap,'document string bound')
            total+=len(value.encode('utf-8',errors='strict'))
            require(total<=MAX_BYTES,'decoded byte bound')
        elif type(value) is list:
            require(len(value)<=20000,'array size bound')
            stack.extend((item,depth+1) for item in value)
        elif type(value) is dict:
            require(len(value)<=10000,'object size bound')
            for key,item in value.items():stack.extend(((key,depth+1),(item,depth+1)))
        else:require(value is None or type(value) in (bool,int,Decimal),'exact JSON leaf')
    return result


def _string_cap(document_class):
    require(type(document_class) is str and document_class in
            ('data','operational-receipt'),'unknown document class')
    return 131072 if document_class=='operational-receipt' else 8192


def decode(raw, *, document_class='data'):
    """Scientific JSON: safe exact integers, no unquoted fractional numbers."""
    return _parse_document(raw,metadata=False,string_cap=_string_cap(document_class))


def decode_operational(raw, *, document_class='data'):
    """Metadata only: signed64 integers and exact bounded Decimal timings.

    The closed class selector controls string length, not scientific semantics.
    Only the admission role below selects the longer receipt class.
    """
    return _parse_document(raw,metadata=True,string_cap=_string_cap(document_class))


def decode_role(raw,role):
    require(type(role) is str,'semantic document role')
    if role in ('export','manifest','priorPlan','plan','candidate'):
        return decode(raw)
    if role=='admission':return decode_operational(raw,document_class='operational-receipt')
    if role in ('comparison','reconstruction','guards','completion','launcherLog','resourceLog'):
        return decode_operational(raw)
    raise ValueError('unknown semantic document role')


def records(raw,count,*,role=None):
    require(type(raw) is bytes and 0<len(raw)<=MAX_BYTES and raw.endswith(b'\n'),
            'bounded newline-terminated stream')
    lines=raw.split(b'\n')[:-1]
    require(len(lines)==count and all(0<len(line)<=MAX_LINE for line in lines),
            'exact NDJSON census/line bound')
    result=tuple(decode(line) if role is None else decode_role(line,role) for line in lines)
    require(all(type(row) is dict for row in result),'null/nonobject is not stream EOF')
    return result


def keys(obj, names):
    require(type(obj) is dict and set(obj) == set(names), 'closed record fields differ')


def integer(value, lo, hi):
    require(type(value) is int and lo <= value <= hi, 'bounded exact integer required')
    return value


def token(value):
    require(type(value) is str and 0 < len(value) <= 1152 and TOKEN.fullmatch(value), 'bounded decimal string required')
    value = Decimal(value)
    require(value.is_finite() and len(value.as_tuple().digits) <= 1024
            and abs(value.as_tuple().exponent) <= 1000, 'finite bounded decimal required')
    return Fraction(value)


def hash_token(value):
    require(type(value) is str and HEX.fullmatch(value), 'exact SHA-256 required')


def list_count(value, count):
    require(type(value) in (list,tuple) and len(value) == count, 'exact bounded sequence census required')


def interval(record):
    keys(record, ('lower','upper','precision'))
    require(type(record['precision']) is int and record['precision'] == 90, 'precision must be exactly90')
    lo,hi = token(record['lower']),token(record['upper'])
    require(lo <= hi, 'reversed interval')
    return lo,hi


def false_flags(record):
    keys(record,FALSE_FLAGS)
    require(all(record[key] is False for key in FALSE_FLAGS), 'root-library authority promoted')


def binding(record):
    keys(record, ('path','sha256','bytes'))
    require(type(record['path']) is str and 0 < len(record['path']) <= 2048 and '\0' not in record['path'], 'bounded binding path')
    p=Path(record['path']);require(str(p)==record['path'] and '..' not in p.parts,'canonical binding path')
    hash_token(record['sha256']); integer(record['bytes'],1,MAX_RUNTIME_BYTES)
    return record


def project_cell(export, manifest, rows, pieces, reference, range_bindings):
    """Pure projection only. No IO, numeric evaluation or hash authentication.

    Production invokes this only after exact fixed-byte/receipt authentication.
    Synthetic fixtures may exercise it but can never produce acceptance.
    """
    require(type(range_bindings) is tuple and len(range_bindings) == 7, 'exact seven immutable range bindings required')
    require(export['schema'] == 'braid-program/f6c-retained-history-export.v1', 'export schema differs')
    require(export['fieldSpeed'] == '1' and export['coupling'] == '10.304229970992187', 'source physical literals differ')
    keys(manifest,MANIFEST_KEYS)
    require(manifest['schema'] == 'braid-program/f6c-emission-refinement-cover.v1'
            and manifest['scope'] == 'pilot-cell-0-emission-refinement' and manifest['status'] == 'conditional_complete'
            and manifest['accepted'] is False, 'complete unpromoted pilot manifest required')
    false_flags(manifest['libraryFlags'])
    require(type(manifest['precision']) is int and manifest['precision']==90,'fixed precision')
    require(equal(manifest['census'],dict(cells=1,members=8,queries=3584,pairRows=64,
            ordinaryPairs=56,selfZeros=8,pieceRecords=112)),'complete refined census')
    require(interval(manifest['originalEmissionDomain'])==(Fraction(-8),Fraction(-1,20)),
            'original emission domain differs')
    list_count(manifest['restrictions'],56)
    restrictions={};ri=0
    for i in range(8):
        for j in range(8):
            if i==j:continue
            r=manifest['restrictions'][ri]
            keys(r,('receiverIndex','transmitterIndex','receiverId','transmitterId',
                    'lower','upper','lowerQueryIndex','upperQueryIndex'))
            require(type(r['receiverIndex']) is int and type(r['transmitterIndex']) is int
                    and (r['receiverIndex'],r['transmitterIndex'],r['receiverId'],r['transmitterId'])
                    ==(i,j,IDS[i],IDS[j]),'restriction order/ownership')
            lo,hi=token(r['lower']),token(r['upper'])
            require(-8<=lo<hi<=Fraction(-1,20),'retained pair restriction')
            for key,start in (('lowerQueryIndex',ri*64),('upperQueryIndex',ri*64+32)):
                index=r[key]
                require(index is None or type(index) is int and start<=index<start+32,
                        'restriction query ownership')
            restrictions[(i,j)]=r;ri+=1
    require(interval(manifest['retainedDomain']) == (Fraction(-8),Fraction(13,100))
            and interval(manifest['receptionDomain']) == (Fraction(0),Fraction(1,1000)), 'fixed cell/domain differs')
    originals, mapping = export['retainedHistories'], manifest['members']
    list_count(originals,8); list_count(mapping,8)
    frames, frame_intervals = export['acceptedFrames'], export['acceptedFrameIntervals']
    list_count(frames,81); list_count(frame_intervals,80)
    prior = None
    for n,frame in enumerate(frames):
        keys(frame,('frameIndex','time','members'))
        require(integer(frame['frameIndex'],0,80) == n, 'frame order differs')
        t = token(frame['time']); require(prior is None or prior < t, 'frame times not increasing'); prior=t
        list_count(frame['members'],8)
        if n < 80:
            edge=frame_intervals[n]
            keys(edge,('leftFrameIndex','rightFrameIndex','startTime','endTime'))
            require(type(edge['leftFrameIndex']) is int and type(edge['rightFrameIndex']) is int
                    and (edge['leftFrameIndex'],edge['rightFrameIndex']) == (n,n+1)
                    and edge['startTime'] == frame['time'] and edge['endTime'] == frames[n+1]['time'], 'exact frame edge differs')
    require(frames[0]['time'] == '0' and frames[-1]['time'] == '0.13'
            and frames[1]['time'] == '0.002', 'cell zero outside exact first frame')
    def bounds(record):
        if record is None: return None
        interval(record)
        return reference.Bounds(record['lower'],record['upper'])
    def coordinates(record):
        keys(record,('x','y','z'))
        for axis in ('x','y','z'): token(record[axis])
        return tuple(record[axis] for axis in ('x','y','z'))
    members=[]
    for i,label in enumerate(IDS):
        h,m=originals[i],mapping[i]
        keys(m,('id','pathKey','polarity','charge','originalHistoryFingerprint','historyDigest'))
        require(h['id'] == m['id'] == label and integer(h['pathKey'],1,8) == integer(m['pathKey'],1,8) == i+1,
                'member/path mapping differs')
        sign=1 if i%2 == 0 else -1
        require(type(h['polarity']) is int and type(m['polarity']) is int and h['polarity'] == m['polarity'] == sign,
                'member polarity mapping differs')
        require(m['charge']==h['charge'],'manifest charge literal differs')
        require(h['charge'] == ('' if sign > 0 else '-')+'0.1666666666666666666666666666666667', 'charge literal differs')
        require(type(h['historyFingerprint']) is str and h['historyFingerprint'] == m['originalHistoryFingerprint'], 'original fingerprint differs')
        hash_token(m['historyDigest'])
        require(h['coverageStart'] == '-8' and h['coverageEnd'] == '0.13', 'history domain differs')
        # Complete original histories and scalar/axis allowances were independently
        # checked by the byte-pinned cover comparison; no new history evaluation.
        list_count(h['segments'],1760)
        endpoints=[]
        for frame in frames[:2]:
            row=frame['members'][i]
            keys(row,('pathKey','position','velocity','positionErrorBound','stateFlags'))
            require(integer(row['pathKey'],1,8) == i+1 and integer(row['stateFlags'],1,2) == (1 if sign>0 else 2), 'frame member/polarity differs')
            require(token(row['positionErrorBound']) >= 0, 'negative frame provenance error')
            endpoints.extend((coordinates(row['position']),coordinates(row['velocity'])))
        members.append(reference.Member(label,str(i+1),h['charge'],m['historyDigest'],*endpoints))
    list_count(rows,64); list_count(pieces,112)
    projected=[]; piece_index=0
    for n,row in enumerate(rows):
        keys(row,ROW_KEYS); false_flags(row['libraryFlags'])
        i,j=divmod(n,8)
        require(integer(row['rowIndex'],0,63) == n and integer(row['cellIndex'],0,0) == 0
                and integer(row['receiverIndex'],0,7) == i and integer(row['transmitterIndex'],0,7) == j
                and row['receiverId'] == IDS[i] and row['transmitterId'] == IDS[j], 'root row ownership/order differs')
        require(row['reception'] == manifest['receptionDomain'], 'exact reception tokens differ')
        require(row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False, 'complement/boundary differs')
        geometry_fields=('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement',
                         'distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')
        coverage=[]
        if i == j:
            require(type(row['ordinaryRootsPerReception']) is int and row['ordinaryRootsPerReception'] == 0
                    and row['coincidentEndpointExcluded'] is True and all(row[key] is None for key in geometry_fields), 'self row geometry/coverage fabricated')
            coverage=[None,None]
        else:
            require(type(row['ordinaryRootsPerReception']) is int and row['ordinaryRootsPerReception'] == 1
                    and row['coincidentEndpointExcluded'] is False, 'ordinary root count differs')
            interval(row['emission']);r=restrictions[(i,j)]
            require(row['emission']['lower']==r['lower'] and row['emission']['upper']==r['upper'],
                    'exact pair-specific emission differs')
            require(interval(row['oldestResidual'])[1] < 0 and interval(row['lowerFaceResidual'])[1] < 0
                    and interval(row['upperFaceResidual'])[0] > 0, 'strict faces failed')
            # Oldest A=-8 and refined lower L are copied separately, never equated.
            require(interval(row['distance'])[0] > 0 and interval(row['transmitterFactor'])[0] >= Fraction(1,10**24)
                    and interval(row['receiverFactor'])[0] > 0, 'positive denominators/factors failed')
            for role,index in (('receiver',i),('transmitter',j)):
                require(integer(row[role+'PieceRecord'],0,111) == piece_index, 'piece pointer/order differs')
                piece=pieces[piece_index]; keys(piece,PIECE_KEYS)
                require(integer(piece['recordIndex'],0,111) == piece_index and integer(piece['rowIndex'],0,63) == n
                        and piece['role'] == role and piece['memberId'] == IDS[index]
                        and piece['historyDigest'] == mapping[index]['historyDigest'], 'piece ownership/digest differs')
                require(piece['requestedInterval'] == row['reception' if role=='receiver' else 'emission'], 'piece interval differs')
                first,last=integer(piece['firstIndex'],0,1759),integer(piece['lastIndex'],0,1759)
                require(first <= last and integer(piece['touchedPieceCount'],1,1760) == last-first+1
                        and type(piece['contiguousIndexRange']) is list
                        and len(piece['contiguousIndexRange']) == 2
                        and all(type(x) is int for x in piece['contiguousIndexRange'])
                        and piece['contiguousIndexRange'] == [first,last], 'piece census differs')
                hash_token(piece['clippedPiecesSha256']); coverage.append(piece['clippedPiecesSha256']); piece_index+=1
        displacement=None
        if row['displacement'] is not None:
            list_count(row['displacement'],3); displacement=tuple(bounds(x) for x in row['displacement'])
        projected.append(reference.RootRow(row['receiverId'],row['transmitterId'],bounds(row['reception']),bounds(row['emission']),
            row['ordinaryRootsPerReception'],row['coincidentEndpointExcluded'],bounds(row['oldestResidual']),
            bounds(row['lowerFaceResidual']),bounds(row['upperFaceResidual']),displacement,bounds(row['distance']),
            bounds(row['transmitterFactor']),bounds(row['receiverFactor']),*coverage,
            row['rootFreeComplementConditional'],row['retainedBoundaryContact']))
    require(piece_index == 112, 'incomplete piece census')
    return reference.CellRangeInput('f6c-reconstruction-family',90,0,0,bounds(manifest['receptionDomain']),
        reference.Bounds(frames[0]['time'],frames[1]['time']),bounds(manifest['retainedDomain']),
        export['fieldSpeed'],export['coupling'],'0.5320012303229503','conditional_complete',
        tuple(range_bindings),tuple(members),tuple(projected))


class PinnedInput:
    def __init__(self,path,expected,*,capture=False,limit=MAX_BYTES):
        self.path=Path(path).absolute(); self.expected=expected; self.capture=capture; self.limit=limit; self.fd=None

    @staticmethod
    def identity(s):
        return s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns

    def __enter__(self):
        hash_token(self.expected)
        require(self.path==self.path.resolve(),'noncanonical or symlink input')
        self.fd=os.open(self.path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
        try:
            self.initial=os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0<self.initial.st_size<=self.limit,'bounded nonempty regular source required')
            self.data,digest=self.scan(self.capture)
            require(digest==self.expected,'source hash differs: '+str(self.path))
            require(self.identity(os.stat(self.path,follow_symlinks=False))==self.identity(self.initial),
                    'source replaced during capture')
            return self
        except BaseException:
            os.close(self.fd); self.fd=None; raise

    def scan(self,capture=False):
        os.lseek(self.fd,0,os.SEEK_SET); chunks=[]; digest=hashlib.sha256(); size=0
        expected_size=self.initial.st_size
        require(0<expected_size<=self.limit,'recorded source byte limit')
        while size<expected_size:
            chunk=os.read(self.fd,min(1024**2,expected_size-size))
            require(bool(chunk),'source truncated during capture')
            size+=len(chunk)
            digest.update(chunk)
            if capture: chunks.append(chunk)
        # Read at most one extra byte; never retain a growing file beyond its
        # original recorded size, even after a metadata-only 1GiB admission.
        require(not os.read(self.fd,1),'source grew during capture')
        require(size==expected_size and self.identity(os.fstat(self.fd))==self.identity(self.initial)
                and self.identity(os.stat(self.path,follow_symlinks=False))==self.identity(self.initial),
                'source changed during capture')
        return (b''.join(chunks) if capture else None),digest.hexdigest()

    def recheck(self):
        require(self.scan()[1]==self.expected and self.identity(os.stat(self.path,follow_symlinks=False))==self.identity(self.initial),'bound input changed/replaced')

    def binding(self):
        return {'path':str(self.path),'sha256':self.expected,'bytes':self.initial.st_size}

    def __exit__(self,*_):
        if self.fd is not None: os.close(self.fd)
        self.fd=None


@contextmanager
def captured_reference(filename,raw):
    require(sha(raw)==REFERENCE_SHA,'frozen reference bytes differ')
    name='_f6c_acceleration_'+REFERENCE_SHA; suffix=0
    while name in sys.modules:
        suffix+=1; name='_f6c_acceleration_'+REFERENCE_SHA+'_'+str(suffix)
    module=ModuleType(name); module.__file__=str(filename); module.__package__=''
    sys.modules[name]=module
    try:
        exec(compile(raw,str(filename),'exec',dont_inherit=True,optimize=sys.flags.optimize),module.__dict__)
        yield module
    finally:
        sys.modules.pop(name,None)


def equal(left,right):
    if type(left) is not type(right):return False
    if type(left) is dict:return left.keys()==right.keys() and all(equal(left[k],right[k]) for k in left)
    if type(left) in (list,tuple):return len(left)==len(right) and all(equal(x,y) for x,y in zip(left,right))
    return left==right


def normalize(item,root):
    return {**binding(item),'path':str(root/item['path'])}


def binding_array(items,count=None):
    require(type(items) is list and 0<len(items)<=512 and (count is None or len(items)==count),'binding array census')
    for item in items:binding(item)
    require(len({b['path'] for b in items})==len(items),'duplicate binding path')


def closure_premise():
    return dict(authority='externally-reviewed-caller-observation',ownerSha256=DECLARATION_SHA,
        admissionSha256=dict((k,h) for k,_,h in REFINED)['admission'],
        matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds='238.116677375',
        processesClosed=True,independentAuditAccepted=True)


def validate_plan(plan,own_sha):
    keys(plan,PLAN_KEYS)
    require(plan['schema']==PLAN_SCHEMA and plan['scope']==SCOPE and equal(plan['limits'],LIMITS),'plan schema/scope/limits')
    for role,(path,digest) in NAMED.items():
        item=binding(plan[role])
        require(item['path']==path and (digest is None or item['sha256']==digest),'named source: '+role)
    require(plan['consumer']['sha256']==own_sha,'executing consumer generation')
    for role in ('runtimeBindings','operationalBindings'):binding_array(plan[role])
    ops={b['path']:b['sha256'] for b in plan['operationalBindings']}
    require(len(ops)==9 and set(OPERATIONS)<set(ops),'nine operational bindings')
    node=next(iter(set(ops)-set(OPERATIONS)))
    require(Path(node).is_absolute() and Path(node).name=='node','resolved Node binding')
    for path,digest in OP_PINS.items():require(ops[path]==digest,'frozen operational source differs')
    require(equal(plan['priorRefinementClosure'],closure_premise()),'prior external whole-attempt closure')
    seen={}
    for item in [*[plan[k] for k in NAMED],*plan['runtimeBindings'],*plan['operationalBindings']]:
        old=seen.setdefault(item['path'],item)
        require(equal(old,item),'conflicting source generation')
    return plan


def authenticate_receipts(export,manifest,comparison,admission,reconstruction,guards,prior_plan,bindings):
    """Exact-pinned accepted evidence checks, not a rerun of prior root proofs."""
    def same(item,role):
        require(binding(item)==bindings[role],'original evidence binding differs: '+role)
    same(comparison['manifest'],'manifest'); same(comparison['rows'],'rows'); same(comparison['pieces'],'pieces')
    same(comparison['launchPlan'],'priorPlan'); same(manifest['launchPlan'],'priorPlan'); same(admission['plan'],'priorPlan')
    same(manifest['rows'],'rows'); same(manifest['pieces'],'pieces')
    for role in ('export','reconstruction','guards','rootTheorem','reconstructionTheorem'):
        same(comparison['fixedBindings'][role],role)
    require(comparison['schema']=='braid-program/f6c-continuous-reception-root-cover-conformance.v1'
            and comparison['accepted'] is True and comparison['scope']=='pilot-cell-0','accepted comparison required')
    false_flags(comparison['libraryFlags'])
    require(comparison['analysis']['accepted'] is False and comparison['analysis']['conditionalEnclosuresConformant'] is True,'independent conditional comparison absent')
    for key,count in (('cellCount',1),('pairCellCertificates',64),('ordinaryNonselfRows',56),('selfExclusionRows',8),
                      ('distinctNonselfFaceChecks',112),('pieceRecordCount',112),('recordedGeometryPieceVisits',89208)):
        require(type(comparison['analysis'][key]) is int and comparison['analysis'][key]==count,'comparison census differs')
    for key in ('reconstructedFamilyApplicabilityAuthenticated','conditionalRootCoverValidated'):
        require(comparison['claims'][key] is True,'family/cover comparison claim missing')
    for key in ('historicalTrajectoryIdentityEstablished','rootExecutionAuthorized','metricsAvailable','h3EvidenceEligible','scoreAuthorized','eomExecuted'):
        require(comparison['claims'][key] is False,'prior comparison claim promoted')
    require(prior_plan['schema']=='braid-program/f6c-cached-root-cover-pilot-launch.v1'
            and prior_plan['scope']=='pilot-cell-0','wrong prior plan generation')
    contract=prior_plan['comparisonContract']
    require(contract['verifierSha256']=='3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7'
            and contract['declarationSha256']=='520bd9fd40a9e73a1decb8bdbdd3b262f51478ed5bc61103f86b92f5079de2ba', 'cached prior reference contract differs')
    require(manifest['subjectSourceBindings']==contract['subjectSourceBindings'] and manifest['runtimeBindings']==contract['runtimeBindings'], 'prior execution binding chain differs')
    require(comparison['verifier']['sha256']==contract['verifierSha256'],'wrong actual comparison implementation')
    for proof in (reconstruction,guards):
        require(proof['accepted'] is True and proof['historyExportBefore']['sha256']==proof['historyExportAfter']['sha256']==bindings['export']['sha256'],'accepted original-bound premise missing')
        require(proof['claims']['subjectMembershipEstablished'] is False,'historical membership promoted')
    for key in ('anchoredPrehistoryFamilyNonempty','fixedAcceptedFrameFutureContained','reconstructedFullHistoryFamilyNonempty','reconstructedFamilyContainedInOriginalEnclosures'):
        require(reconstruction['claims'][key] is True,'reconstruction premise missing')
    for key in ('conditionalUniformOldestBoundaryResidualStrictlyNegative','conditionalUniformSameTimeNonselfSeparation','conditionalUniformSpeedStrictlyBelowOne'):
        require(guards['claims'][key] is True,'uniform guard premise missing')
    require(admission['schema']=='braid-program/f6c-cached-root-cover-pilot-admission.v1'
            and admission['accepted'] is True and admission['scope']=='pilot-cell-0'
            and admission['processesClosed'] is True,'prior admission differs')
    for key in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'):
        require(admission[key] is False,'prior operational claim promoted')
    list_count(admission['stages'],2)
    for item,stage in zip(admission['stages'],('consumer','comparison')):
        require(item['stage']==stage and item['admission']['accepted'] is True,'prior stage admission missing')
        process=item['process']
        keys(process['exit'],('code','signal'))
        require(process['accepted'] is True and process['processesClosed'] is True
                and type(process['exit']['code']) is int and process['exit']['code']==0
                and process['exit']['signal'] is None,'prior stage process not cleanly closed')
        list_count(process['gates'],1)
        require(process['gates'][0]['retired'] is True,'prior registered gate not retired')
        completion=item['admission']['completion']
        require(completion['completed'] is True,'prior stage fresh completion missing')
        if stage=='consumer':
            require(completion['accepted'] is False,'prior subject self-admitted')
            require(completion['outputs']==[bindings[r] for r in ('rows','pieces','manifest')],'prior consumer outputs differ')
        else:
            require(completion['accepted'] is True,'prior comparison failed')
            same(completion['output'],'comparison')
    # The immutable admission is prepublication. Whole-attempt final closure is
    # the separately reviewed caller-observed premise in the NEW launch plan.
    require(export['fieldSpeed']=='1' and export['coupling']=='10.304229970992187','source constants differ')


def authenticate_refined(docs,refined,ancestry,root,read_bound):
    """Authenticate pinned historical metadata; never replay root queries."""
    manifest,proof,admission,plan=(docs[k] for k in ('manifest','comparison','admission','plan'))
    keys(plan,('schema','scope',*PRIOR_NAMED,'subjectSourceBindings','runtimeBindings',
               'operationalBindings','limits','priorCoverClosure'))
    scope='pilot-cell-0-emission-refinement'
    require(plan['schema']=='braid-program/f6c-emission-refinement-launch.v1' and plan['scope']==scope
            and equal(plan['limits'],LIMITS),'prior plan protocol')
    old_closure=dict(authority='externally-reviewed-caller-observation',
        ownerSha256=ancestry['priorClosureOwner']['sha256'],admissionSha256=ancestry['admission']['sha256'],
        matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds='8.534247625',
        processesClosed=True,independentAuditAccepted=True)
    require(equal(plan['priorCoverClosure'],old_closure),'prior broad closure')
    for field,count in (('subjectSourceBindings',15),('runtimeBindings',159),('operationalBindings',9)):
        binding_array(plan[field],count)
    require({b['path'] for b in plan['subjectSourceBindings']}==set(PRIOR_SUBJECT_PATHS),'all fifteen historical subjects')
    expected={}
    for item in [*ancestry.values(),*[plan[k] for k in PRIOR_NAMED],*plan['subjectSourceBindings'],
                 *plan['runtimeBindings'],*plan['operationalBindings'],refined['plan']]:
        item=normalize(item,root);old=expected.setdefault(item['path'],item)
        require(equal(old,item),'conflicting prior source')
    binding_array(admission['sourceBindings'],202)
    actual={normalize(b,root)['path']:normalize(b,root) for b in admission['sourceBindings']}
    require(equal(actual,expected) and len(expected)==202,'full historical202-source identity')
    for item in expected.values():read_bound(item)
    require(manifest['schema']=='braid-program/f6c-emission-refinement-cover.v1'
            and manifest['scope']==scope and manifest['status']=='conditional_complete'
            and manifest['accepted'] is False,'prior unpromoted cover')
    require(proof['schema']=='braid-program/f6c-emission-refinement-conformance.v1'
            and proof['scope']==scope and proof['status']=='conditional-comparison-complete'
            and proof['accepted'] is True,'prior independent conditional comparison')
    require(admission['schema']=='braid-program/f6c-emission-refinement-pilot-admission.v1'
            and admission['scope']==scope and admission['accepted'] is True
            and admission['processesClosed'] is True,'closed prior admission')
    elapsed=admission['elapsedSecondsBeforePublication']
    require(type(elapsed) in (int,Decimal) and 0<=Fraction(elapsed)<Fraction('238.116677375'),
            'prior time is prepublication, not whole completion')
    for obj,key,role in ((manifest,'launchPlan','plan'),(proof,'launchPlan','plan'),
                         (proof,'manifest','manifest'),(admission,'plan','plan')):
        require(equal(binding(obj[key]),refined[role]),'prior document identity')
    for role in ('queries','rows','pieces'):
        require(equal(binding(manifest[role]),refined[role]) and equal(binding(proof[role]),refined[role]),
                'prior raw-stream identity')
    require(equal(manifest['producer'],normalize(plan['producer'],root))
            and equal(proof['verifier'],normalize(plan['verifier'],root)),'prior instrument identity')
    require(equal(proof['sourceBindings'],{k:normalize(plan[k],root) for k in PRIOR_NAMED}),'prior named sources')
    required=dict(subjectSourceBindings=plan['subjectSourceBindings'],fixedBindings=ancestry,
                  executionBindings=[normalize(b,root) for b in plan['runtimeBindings']+plan['operationalBindings']],
                  priorCoverClosure=old_closure)
    for key,value in required.items():
        require(equal(manifest[key],value) and equal(proof[key],value),'prior source closure: '+key)
    claims='historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split()
    keys(manifest['claims'],claims)
    require(all(v is False for v in manifest['claims'].values())
            and equal(manifest['claims'],proof['candidateClaims']),'prior copied authority')
    for key in ('accelerationEvaluated','eomExecuted','h3EvidenceEligible','metricsAvailable',
                'scoreAuthorized','historicalTrajectoryIdentityEstablished','fullRunAuthorized'):
        require(admission[key] is False,'prior authority promoted')
    analysis=proof['analysis']
    require(analysis['accepted'] is False and analysis['conditionalQueryReplayConformant'] is True
            and analysis['conditionalFinalCoverConformant'] is True,'conditional prior proof absent')
    counts=dict(queryCount=3584,pairCount=56,rowCount=64,ordinaryNonselfRows=56,
                selfExclusionRows=8,pieceRecordCount=112,finalStrictFaceChecks=112,
                oldestBoundaryChecks=56,recordedGeometryPieceVisits=244)
    for key,value in counts.items():require(type(analysis[key]) is int and analysis[key]==value,'prior proof census')
    pure_flags='accepted referenceGenerationAuthenticated originalSourceAuthenticated original1760PieceCensusAuthenticated premiseTruthAuthenticated subjectMembershipEstablished historicalTrajectoryIdentityEstablished executionAuthorized eomExecuted h3EvidenceEligible metricsAvailable scoreAuthorized equilibriumEstablished retentionEstablished physicalRealizationEstablished'.split()
    keys(analysis['claims'],pure_flags);require(all(v is False for v in analysis['claims'].values()),'pure proof authority')
    require(equal(manifest['restrictions'],analysis['restrictions']),'authenticated restrictions')
    census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
    require(equal(manifest['census'],census) and equal(admission['census'],census),'prior cover census')
    list_count(admission['stages'],2)
    for item,label in zip(admission['stages'],('producer','comparison')):
        process,stage=item['process'],item['admission'];done=stage['completion']
        require(item['stage']==label and process['accepted'] is True and process['processesClosed'] is True
                and equal(process['exit'],dict(code=0,signal=None)) and stage['accepted'] is True
                and equal(process['admission'],stage),'prior stage completion/closure')
        list_count(process['gates'],1);gate=process['gates'][0]
        require(gate['retired'] is True and gate['acknowledged'] is True
                and type(gate['measurement']['code']) is int and gate['measurement']['code']==0
                and gate['measurement']['signal'] is None,'prior registered gate')
        require(done['completed'] is True and done['accepted'] is (label=='comparison')
                and done['scope']==scope and done['h3EvidenceEligible'] is False
                and done['eomExecuted'] is False,'prior fresh completion')
        require(equal(process['stdoutLog'],stage['completionLog']),'prior stdout identity')
        raw=read_bound(process['stdoutLog'],data=True);read_bound(process['stderrLog'])
        require(raw.endswith(b'\n') and len(raw.splitlines())==1
                and equal(decode_role(raw,'completion'),done),'prior actual stdout record')
        if label=='producer':
            outputs=[refined[k] for k in ('queries','rows','pieces','manifest')]
            require(equal(done['outputs'],outputs) and equal(stage['outputs'],outputs)
                    and equal(done['census'],census) and done['conditionalCoverPrepared'] is True
                    and done['externalWholeAttemptAdmissionRequired'] is True,'prior producer outputs')
        else:
            require(equal(done['output'],refined['comparison']) and equal(stage['outputs'],[refined['comparison']])
                    and equal(done['analysis'],analysis),'prior comparison output')
    return analysis


def authenticate_observations(admission,logs):
    """Consistency of already-pinned past observations, not fresh measurement."""
    launcher=records(logs['launcherLog'],49,role='launcherLog')
    samples=records(logs['resourceLog'],955,role='resourceLog')
    hosts=[x for x in launcher if x.get('kind')=='host-resource']
    beats=[x for x in launcher if x.get('kind')=='f6c-emission-refinement-pilot-heartbeat']
    gates=[x for x in launcher if x.get('schema')=='braid-program/subfield-circular-pilot-outer-heartbeat.v1']
    require((len(hosts),len(beats),len(gates))==(20,15,14),'prior log census')
    def number(value):
        require(type(value) in (int,Decimal),'exact metadata number')
        require(type(value) is int or value.is_finite(),'finite metadata number')
        return Fraction(value)
    whole=Fraction('238.116677375');pre=number(admission['elapsedSecondsBeforePublication'])
    require(equal(hosts[:-1],admission['hostObservationsBeforePublication']),'prior host prefix')
    for series in (hosts,samples):
        times=[number(x['elapsedSeconds']) for x in series]
        require(all(0<=t<whole for t in times) and times==sorted(times),'prior observation time order')
        require(pre<=times[-1] and series[-1]['stage']=='final-admission','postpublication observation scope')
    for h in hosts:
        integer(h['freePercent'],20,100)
        require(type(h['availableDiskBytes']) is str and re.fullmatch(r'[0-9]{1,20}',h['availableDiskBytes'])
                and int(h['availableDiskBytes'])>=16*1024**3,'prior disk floor')
    require(hosts[0]['atLaunch'] is True and hosts[0]['freePercent']>=40
            and int(hosts[0]['availableDiskBytes'])>=64*1024**3,'prior host launch floor')
    require(all(x['accepted'] is False for x in beats)
            and all(x['h3EvidenceEligible'] is False and x['stopping'] is False for x in gates),'prior heartbeat flags')
    for row in samples:
        require(row['kind']=='aggregate-rss','prior RSS record')
        integer(row['aggregateResidentBytes'],0,2*1024**3)
        require(0<=number(row['sampleGapMs'])<=1000,'prior sample gap')
        require(type(row['processes']) is list and 0<len(row['processes'])<=64,'prior process census')
        for proc in row['processes']:
            integer(proc['pid'],1,2**31-1);integer(proc['pgid'],1,2**31-1);integer(proc['rssBytes'],0,2*1024**3)
        require(sum(p['rssBytes'] for p in row['processes'])==row['aggregateResidentBytes'],'prior RSS sum')
    summary=admission['observationsBeforePublication']
    require(type(summary['samples']) is int and summary['samples']==954
            and summary['maximumSampledRSSBytes']==max(x['aggregateResidentBytes'] for x in samples[:-1])
            and number(summary['maximumSampleGapMs'])==max(number(x['sampleGapMs']) for x in samples[:-1]),
            'prior RSS prefix')
    size=sum(map(len,logs.values()))+sum(binding(x['process'][k])['bytes']
        for x in admission['stages'] for k in ('stdoutLog','stderrLog'))
    require(type(admission['loggingBytesBeforePublication']) is int
            and 0<=admission['loggingBytesBeforePublication']<=size<=16*1024**2,'prior final log size')
    return dict(finalHostObservations=20,finalRssSamples=955,finalLogBytes=size)


def mathematical_bindings(reference,ancestry,refined):
    selected=(('original_export',ancestry['export']),('reconstruction_receipt',ancestry['reconstruction']),
        ('guards_receipt',ancestry['guards']),('root_cover',refined['manifest']),
        ('root_cover_comparison',refined['comparison']),('member_acceleration_predeclaration',ancestry['memberPredeclaration']),
        ('continuous_reception_enclosure_contract',ancestry['rootTheorem']))
    return tuple(reference.Binding(role,**item) for role,item in selected)


def runtime_paths(project_paths):
    excluded={Path(p).resolve() for p in project_paths}; result={Path(sys.executable).resolve()}
    for module in tuple(sys.modules.values()):
        for key in ('__file__','__cached__'):
            filename=getattr(module,key,None)
            if type(filename) is str:
                path=Path(filename).resolve()
                if path.is_file() and path not in excluded: result.add(path)
    return result


def check_output(root,output,git):
    lane=root/LANE
    require(output==output.resolve() and output.parent==lane and lane.is_dir(),'canonical direct child of existing range lane required')
    require(not output.exists() and not output.is_symlink(),'output already exists')
    checked=subprocess.run([str(git),'check-ignore','-q','--',str(output.relative_to(root))],cwd=root,
        stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=2)
    require(checked.returncode==0,'range output is not ignored')


class Publication:
    """Private durable candidate, exclusive link; never an accepted receipt."""
    def __init__(self,output,deadline):
        self.output=Path(output); self.deadline=deadline; self.private=None; self.identity=None

    def check(self):
        require(time.monotonic()<self.deadline,'range publication deadline')

    def publish(self,packet):
        require(packet['accepted'] is False,'subject cannot publish accepted evidence')
        self.check(); raw=encoded(packet); require(len(raw)<=MAX_BYTES,'range output byte limit')
        with tempfile.NamedTemporaryFile(dir=self.output.parent,prefix=PRIVATE_PREFIX,delete=False) as stream:
            self.private=Path(stream.name); self.identity=os.fstat(stream.fileno())
            require(stream.write(raw)==len(raw),'short range write'); stream.flush(); os.fsync(stream.fileno())
        self.check(); os.link(self.private,self.output)
        directory=os.open(self.output.parent,os.O_RDONLY)
        try: os.fsync(directory)
        finally: os.close(directory)
        self.check()
        return {'path':str(self.output),'sha256':sha(raw),'bytes':len(raw)}

    def reject(self):
        # Keep the private attempt; remove only our own public inode, never a replacement.
        if self.identity is not None:
            try:
                info=os.stat(self.output,follow_symlinks=False)
                if (info.st_dev,info.st_ino)==(self.identity.st_dev,self.identity.st_ino):
                    os.unlink(self.output)
            except FileNotFoundError: pass


def budget_deadline(token_value,began):
    budget=token(token_value); seconds=float(budget)
    require(0<budget<=LIMIT and 0<seconds<=LIMIT,'representable positive remaining budget <=1800 required')
    require(began+seconds>began,'budget cannot advance deadline')
    return began+seconds


def completion(record,deadline):
    require(time.monotonic()<deadline,'final cleanup deadline')
    print(json.dumps(record,allow_nan=False),flush=True)
    require(time.monotonic()<deadline,'final stdout-flush deadline')


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('plan','plan-sha256','consumer-sha256','out-dir','budget-seconds','git-binary'):
        parser.add_argument('--'+name,required=True)
    parser.add_argument('--repo-root')
    args=parser.parse_args(argv)
    began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began)
    root=Path(__file__).resolve().parents[2]
    require(args.repo_root is None or Path(args.repo_root)==root,'executing repository root differs')
    output=Path(args.out_dir).absolute();publication=None
    progress=dict(stage='capture',completedCells=0,expectedCells=1,accepted=False)
    usage_before=resource.getrusage(resource.RUSAGE_SELF)
    def live():require(time.monotonic()<deadline,'inclusive producer deadline')
    def beat(*_):
        live();print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True);live()
        signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,max(.000001,deadline-time.monotonic())))
    previous=signal.signal(signal.SIGALRM,beat)
    signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,deadline-began))
    try:
        with ExitStack() as stack:
            owned={}
            def capture(path,digest,*,data=False,limit=MAX_BYTES):
                live();key=str(Path(path).absolute())
                obj=owned.get(key)
                if obj is None:
                    obj=stack.enter_context(PinnedInput(key,digest,capture=data,limit=limit));owned[key]=obj
                else:
                    require(obj.expected==digest and obj.initial.st_size<=limit,'conflicting capture')
                    if data and obj.data is None:
                        # Capture from the already bound descriptor, never a fresh pathname.
                        obj.recheck();live()
                        captured,actual_digest=obj.scan(True)
                        require(actual_digest==digest,'late capture changed')
                        obj.data=captured
                live();return obj
            def read_bound(item,*,data=False):
                item=normalize(item,root)
                obj=capture(item['path'],item['sha256'],data=data,
                            limit=MAX_BYTES if data else MAX_RUNTIME_BYTES)
                require(obj.initial.st_size==item['bytes'],'bound byte count differs')
                return obj.data if data else obj.binding()
            own=capture(root/SELF,args.consumer_sha256,data=True)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,
                    optimize=sys.flags.optimize)==_EXECUTING_CODE,'executing producer bytes differ')
            plan_file=capture(args.plan,args.plan_sha256,data=True)
            plan=validate_plan(decode_role(plan_file.data,'plan'),args.consumer_sha256)
            sources={k:read_bound(plan[k]) for k in NAMED}
            fixed={k:capture(root/p,h,data=True) for k,p,h in FIXED}
            ancestry={k:v.binding() for k,v in fixed.items()}
            old={k:decode_role(fixed[k].data,k) for k in
                 ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
            authenticate_receipts(old['export'],old['manifest'],old['comparison'],old['admission'],
                                  old['reconstruction'],old['guards'],old['priorPlan'],ancestry)
            binding_array(old['admission']['sourceBindings'])
            for item in old['admission']['sourceBindings']:read_bound(item)
            refined_files={k:capture(root/p,h,data=True) for k,p,h in REFINED}
            refined={k:v.binding() for k,v in refined_files.items()}
            docs={k:decode_role(refined_files[k].data,k) for k in ('manifest','comparison','admission','plan')}
            authenticate_refined(docs,refined,ancestry,root,read_bound)
            log_files={k:capture(root/p,h,data=True) for k,p,h,_ in PRIOR_OPERATIONS}
            for k,_,_,size in PRIOR_OPERATIONS:require(log_files[k].initial.st_size==size,'prior log size')
            authenticate_observations(docs['admission'],{k:v.data for k,v in log_files.items()})
            # Count/hash only. No residual-query evaluation.
            records(refined_files['queries'].data,3584)
            rows=records(refined_files['rows'].data,64);pieces=records(refined_files['pieces'].data,112)
            runtime=set()
            for role in ('runtimeBindings','operationalBindings'):
                for item in plan[role]:
                    actual=read_bound(item)
                    if role=='runtimeBindings':runtime.add(Path(actual['path']))
            git=Path(args.git_binary).resolve()
            require(git in runtime and Path(sys.executable).resolve() in runtime
                    and Path(sys.executable).absolute().parent.parent/'pyvenv.cfg' in runtime,
                    'shared interpreter/config/git missing')
            project_paths=(own.path,fixed['reference'].path)
            require(runtime_paths(project_paths)<=runtime,'loaded runtime outside plan')
            live();check_output(root,output,git);live();output.mkdir(mode=0o700)
            publication=Publication(output/'range.json',deadline)
            with captured_reference(fixed['reference'].path,fixed['reference'].data) as reference:
                require(runtime_paths(project_paths)<=runtime,'reference import runtime outside plan')
                progress['stage']='exact-refined-cell-projection'
                mapped=project_cell(old['export'],docs['manifest'],rows,pieces,reference,
                                    mathematical_bindings(reference,ancestry,refined))
                live();progress['stage']='conditional-range-evaluation'
                result=reference.evaluate_cell(mapped).to_record()
                keys(result['claims'],RANGE_FLAGS)
                require(result['status']=='conditional_ranges' and all(v is False for v in result['claims'].values()),
                        'range reference authority')
                progress.update(stage='source-rechecks',completedCells=1)
                require(runtime_paths(project_paths)<=runtime,'late runtime outside plan')
                for obj in owned.values():live();obj.recheck()
                packet=dict(schema=SCHEMA,scope=SCOPE,status='conditional-range-candidate',accepted=False,
                    launchPlan=plan_file.binding(),consumer=sources['consumer'],declaration=sources['declaration'],
                    verifier=sources['verifier'],sourceBindings=sources,ancestryBindings=ancestry,
                    refinementBindings=refined,runtimeBindings=plan['runtimeBindings'],
                    operationalBindings=plan['operationalBindings'],priorRefinementClosure=plan['priorRefinementClosure'],
                    projection=asdict(mapped),ranges=result,census=CENSUS,
                    claims={k:False for k in CANDIDATE_FLAGS},publicationRequires=CANDIDATE_PUBLICATION)
                keys(packet,CANDIDATE_KEYS)
                progress['stage']='private-publication';published=publication.publish(packet)
                check=capture(published['path'],published['sha256'])
                require(check.initial.st_size==published['bytes'],'published size differs')
                for obj in owned.values():live();obj.recheck()
                require(runtime_paths(project_paths)<=runtime,'publication runtime outside plan')
            progress['stage']='input-cleanup'
        live()
        usage=resource.getrusage(resource.RUSAGE_SELF)
        completion(dict(completed=True,accepted=False,scope=SCOPE,output=published,
            conditionalCells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,
            elapsedSeconds=time.monotonic()-began,
            processUserSeconds=usage.ru_utime-usage_before.ru_utime,
            processSystemSeconds=usage.ru_stime-usage_before.ru_stime,
            maximumIndividualProcessResidentBytes=usage.ru_maxrss if sys.platform=='darwin' else usage.ru_maxrss*1024,
            independentComparisonRequired=True,externalInclusiveDeadlineAndProcessClosureRequired=True,
            metricsAvailable=False,scoreAuthorized=False,h3EvidenceEligible=False,eomExecuted=False,
            rootsEvaluated=False,accelerationEvaluated=True),deadline)
        live()
    except BaseException as error:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(error)[:4096],
              'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        try:
            signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
        except BaseException:
            if publication is not None:publication.reject()
            raise
    if time.monotonic()>=deadline:
        if publication is not None:publication.reject()
        raise ValueError('post-watch-teardown deadline')


if __name__=='__main__':
    try:main()
    except BaseException as error:
        if isinstance(error,SystemExit):raise
        sys.exit(1)
