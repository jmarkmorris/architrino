#!/usr/bin/env python3
"""One-cell subject: authenticated cached cover -> frozen conditional ranges.

No roots, EOM, quadrature, peak or metric. A reviewed external launch plan and
later independent range-output comparison are required. This program only
publishes accepted:false candidates. project_cell is a pure, non-evaluating
mapper for synthetic tests; it does not authenticate files or grant authority.
The CLI captures exact fixed inputs and a private frozen reference generation.
External supervision owns inclusive wall/RSS/host/log bounds and process closure.
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
SELF = 'scripts/eom/prepare-f6c-continuous-reception-acceleration.py'
CONTROLS = 'tests/test_f6c_continuous_reception_acceleration_preparation.py'
DECLARATION = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md'
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
SCOPE = 'cached-pilot-cell-0-range'
SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-candidate.v1'
PLAN_SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-launch.v1'
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


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), allow_nan=False).encode()+b'\n'


def decode(raw, *, receipt=False):
    require(type(raw) is bytes and 0 < len(raw) <= MAX_BYTES, 'bounded JSON bytes required')
    def pairs(items):
        result = {}
        for key,value in items:
            require(key not in result, 'duplicate JSON key')
            result[key] = value
        return result
    def reject(value):
        raise ValueError('non-exact or nonfinite JSON number: '+value)
    return json.loads(raw.decode('utf-8'), object_pairs_hook=pairs,
                      parse_float=str if receipt else reject, parse_constant=reject)


def records(raw, count):
    require(type(raw) is bytes and 0 < len(raw) <= MAX_BYTES, 'bounded NDJSON bytes required')
    lines = raw.splitlines()
    require(len(lines) == count and all(0 < len(line) <= MAX_LINE for line in lines), 'exact NDJSON census/line bound required')
    result = tuple(decode(line) for line in lines)
    require(all(type(row) is dict for row in result), 'null or nonobject NDJSON record')
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
    require(type(record['path']) is str and 0 < len(record['path']) <= 2048, 'bounded binding path')
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
    require(manifest['schema'] == 'braid-program/f6c-continuous-reception-root-cover.v1'
            and manifest['scope'] == 'pilot-cell-0' and manifest['status'] == 'conditional_complete'
            and manifest['accepted'] is False, 'complete unpromoted pilot manifest required')
    false_flags(manifest['libraryFlags'])
    for field,count in (('precision',90),('cellCount',1),('rowCount',64),('ordinaryNonselfRows',56),
                        ('selfExclusionRows',8),('pieceRecordCount',112)):
        require(integer(manifest[field],0,1000) == count, 'manifest census differs: '+field)
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
            and token(frames[1]['time']) >= Fraction(1,1000), 'cell zero outside exact first frame')
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
        keys(m,('id','pathKey','polarity','originalHistoryFingerprint','historyDigest'))
        require(h['id'] == m['id'] == label and integer(h['pathKey'],1,8) == integer(m['pathKey'],1,8) == i+1,
                'member/path mapping differs')
        sign=1 if i%2 == 0 else -1
        require(type(h['polarity']) is int and type(m['polarity']) is int and h['polarity'] == m['polarity'] == sign,
                'member polarity mapping differs')
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
            require(interval(row['emission']) == (Fraction(-8),Fraction(-1,20)), 'fixed broad emission differs')
            require(interval(row['oldestResidual'])[1] < 0 and interval(row['lowerFaceResidual'])[1] < 0
                    and interval(row['upperFaceResidual'])[0] > 0, 'strict faces failed')
            require(row['oldestResidual'] == row['lowerFaceResidual'], 'same oldest/lower faces differ')
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
        self.fd=os.open(self.path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
        try:
            self.initial=os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0<self.initial.st_size<=self.limit,'bounded nonempty regular source required')
            self.data,digest=self.scan(self.capture)
            require(digest==self.expected,'source hash differs: '+str(self.path)); return self
        except BaseException:
            os.close(self.fd); self.fd=None; raise

    def scan(self,capture=False):
        os.lseek(self.fd,0,os.SEEK_SET); chunks=[]; digest=hashlib.sha256(); size=0
        while True:
            chunk=os.read(self.fd,min(1024**2,self.limit+1-size))
            if not chunk: break
            size+=len(chunk); require(size<=self.limit,'source byte limit')
            digest.update(chunk)
            if capture: chunks.append(chunk)
        require(size==self.initial.st_size and self.identity(os.fstat(self.fd))==self.identity(self.initial),'source changed during capture')
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


def validate_plan(plan,own_sha):
    keys(plan,('schema','scope','consumer','controls','declaration','rangeVerifier','runtimeBindings','operationalBindings','limits','priorCoverClosure'))
    require(plan['schema']==PLAN_SCHEMA and plan['scope']==SCOPE,'exact one-cell range plan required')
    require(type(plan['limits']) is dict and encoded(plan['limits'])==encoded(LIMITS),'fixed limits changed')
    for key,path in (('consumer',SELF),('controls',CONTROLS),('declaration',DECLARATION)):
        b=binding(plan[key]); require(b['path']==path,'plan-owned path differs')
    require(plan['consumer']['sha256']==own_sha,'consumer identity differs')
    # This separate instrument must exist and be independently reviewed before a plan.
    verifier=binding(plan['rangeVerifier'])
    require(verifier['path']=='scripts/eom/verify-f6c-continuous-reception-acceleration.py','separate range verifier path required')
    for field in ('runtimeBindings','operationalBindings'):
        items=plan[field]; require(type(items) is list and 0<len(items)<=256,'bounded execution bindings required')
        for item in items: binding(item)
        require(len({b['path'] for b in items})==len(items),'duplicate execution binding')
    premise=plan['priorCoverClosure']
    keys(premise,('authority','ownerSha256','admissionSha256','matchingFreshCompletionObserved','exitCode',
                 'elapsedSeconds','processesClosed','independentAuditAccepted'))
    require(premise['authority']=='externally-reviewed-caller-observation'
            and premise['ownerSha256']==dict((r,h) for r,_,h in FIXED)['priorClosureOwner']
            and premise['admissionSha256']==dict((r,h) for r,_,h in FIXED)['admission']
            and premise['matchingFreshCompletionObserved'] is True and premise['processesClosed'] is True
            and premise['independentAuditAccepted'] is True
            and type(premise['exitCode']) is int and premise['exitCode']==0
            and premise['elapsedSeconds']=='8.534247625','prior external closure premise absent/different')
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
    lane=root/'.local-data/braid-analysis/f6c-continuous-reception-acceleration-20260827'
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
        with tempfile.NamedTemporaryFile(dir=self.output.parent,prefix='.range-private-',delete=False) as stream:
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
    for flag in ('plan','plan-sha256','consumer-sha256','out-dir','budget-seconds','git-binary'):
        parser.add_argument('--'+flag,required=True)
    args=parser.parse_args(argv); began=time.monotonic(); deadline=budget_deadline(args.budget_seconds,began)
    root=Path(__file__).resolve().parents[2]; output=Path(args.out_dir).absolute()
    progress={'stage':'capture','completedCells':0,'expectedCells':1,'accepted':False}
    usage_before=resource.getrusage(resource.RUSAGE_SELF); publication=None
    def beat(*_):
        print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True)
        require(time.monotonic()<deadline,'consumer deadline')
        signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,max(.000001,deadline-time.monotonic())))
    previous=signal.signal(signal.SIGALRM,beat); signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,deadline-began))
    try:
        with ExitStack() as stack:
            owned=[]
            def capture(path,digest,**kwargs):
                obj=stack.enter_context(PinnedInput(path,digest,**kwargs)); owned.append(obj); return obj
            own=capture(root/SELF,args.consumer_sha256,capture=True)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize)==_EXECUTING_CODE,'executing consumer source differs')
            plan_file=capture(args.plan,args.plan_sha256,capture=True)
            plan=validate_plan(decode(plan_file.data,receipt=True),args.consumer_sha256)
            fixed={role:capture(root/path,digest,capture=True) for role,path,digest in FIXED}
            for key in ('consumer','controls','declaration','rangeVerifier'):
                b=plan[key]; obj=capture(root/b['path'],b['sha256'])
                require(obj.initial.st_size==b['bytes'],'reviewed plan file size differs')
            runtime={}
            for b in plan['runtimeBindings']+plan['operationalBindings']:
                obj=capture(root/b['path'],b['sha256'],limit=MAX_RUNTIME_BYTES)
                require(obj.initial.st_size==b['bytes'],'runtime/operation size differs')
                if b in plan['runtimeBindings']: runtime[obj.path.resolve()]=obj
            git=Path(args.git_binary).resolve()
            require(git in runtime and Path(sys.executable).resolve() in runtime,'reviewed interpreter/git absent')
            project_paths=(own.path,fixed['reference'].path)
            require(runtime_paths(project_paths)<=set(runtime),'runtime closure incomplete')
            documents={k:decode(fixed[k].data,receipt=(k!='export')) for k in
                       ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
            bindings={k:v.binding() for k,v in fixed.items()}
            authenticate_receipts(documents['export'], documents['manifest'], documents['comparison'],
                                  documents['admission'], documents['reconstruction'], documents['guards'],
                                  prior_plan=documents['priorPlan'], bindings=bindings)
            # Exact caller-observed closure owner is separately pinned, not parsed
            # as if prose or the admission predicted a future successful exit.
            check_output(root,output,git); output.mkdir(mode=0o700)
            publication=Publication(output/'range.json',deadline)
            with captured_reference(fixed['reference'].path,fixed['reference'].data) as reference:
                require(runtime_paths(project_paths)<=set(runtime),'reference import runtime closure incomplete')
                roles=(('original_export','export'),('reconstruction_receipt','reconstruction'),('guards_receipt','guards'),
                       ('root_cover','manifest'),('root_cover_comparison','comparison'),
                       ('member_acceleration_predeclaration','memberPredeclaration'),('continuous_reception_enclosure_contract','rootTheorem'))
                mapped_bindings=tuple(reference.Binding(role,**bindings[key]) for role,key in roles)
                progress['stage']='exact-cell-projection'
                mapped=project_cell(documents['export'],documents['manifest'],records(fixed['rows'].data,64),
                                    records(fixed['pieces'].data,112),reference,mapped_bindings)
                progress['stage']='conditional-range-evaluation'
                result=reference.evaluate_cell(mapped).to_record()
                require(result['status']=='conditional_ranges' and all(value is False for value in result['claims'].values()),'range reference promoted authority')
                progress.update(stage='source-rechecks',completedCells=1)
                for obj in owned: obj.recheck()
                require(runtime_paths(project_paths)<=set(runtime),'late runtime outside plan')
                packet={'schema':SCHEMA,'scope':SCOPE,'accepted':False,'status':'conditional-range-candidate',
                        'fixedBindings':bindings,'launchPlan':plan_file.binding(),'consumer':own.binding(),
                        'declaration':plan['declaration'],'rangeVerifier':plan['rangeVerifier'],
                        'runtimeBindings':plan['runtimeBindings'],'operationalBindings':plan['operationalBindings'],
                        'priorCoverClosure':plan['priorCoverClosure'],'projection':asdict(mapped),'ranges':result,
                        'census':{'cells':1,'pairRows':64,'ordinaryPairs':56,'selfZeros':8,'members':8,'pieceRecords':112},
                        'claims':{'historicalTrajectoryIdentityEstablished':False,'metricsAvailable':False,'scoreAuthorized':False,
                                  'h3EvidenceEligible':False,'eomExecuted':False,'rootsEvaluated':False,
                                  'independentRangeComparisonPassed':False,'executionAuthorized':False},
                        'publicationRequires':'fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes'}
                progress['stage']='private-publication'; output_binding=publication.publish(packet)
                check=capture(output_binding['path'],output_binding['sha256'])
                require(check.initial.st_size==output_binding['bytes'],'published range size differs')
                for obj in owned: obj.recheck()
            progress['stage']='input-cleanup'
        require(time.monotonic()<deadline,'post-cleanup deadline')
        signal.setitimer(signal.ITIMER_REAL,0); signal.signal(signal.SIGALRM,previous)
        usage=resource.getrusage(resource.RUSAGE_SELF)
        completion({'completed':True,'accepted':False,'scope':SCOPE,'output':output_binding,'conditionalCells':1,
                    'pairRows':64,'ordinaryPairs':56,'selfZeros':8,'members':8,'elapsedSeconds':time.monotonic()-began,
                    'processUserSeconds':usage.ru_utime-usage_before.ru_utime,
                    'processSystemSeconds':usage.ru_stime-usage_before.ru_stime,
                    'maximumIndividualProcessResidentBytes':usage.ru_maxrss if sys.platform=='darwin' else usage.ru_maxrss*1024,
                    'independentComparisonRequired':True,'externalInclusiveDeadlineAndProcessClosureRequired':True,
                    'metricsAvailable':False,'scoreAuthorized':False,'h3EvidenceEligible':False},deadline)
    except BaseException as error:
        if publication is not None: publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(error)[:4096],
                          'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL,0); signal.signal(signal.SIGALRM,previous)


if __name__=='__main__':
    try: main()
    except BaseException as exc:
        if isinstance(exc,SystemExit): raise
        sys.exit(1)
