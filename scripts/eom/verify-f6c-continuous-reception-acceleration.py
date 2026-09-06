#!/usr/bin/env python3
"""Independent one-cell range-output comparison; no subject/reference imports.

The mathematical route is exact endpoint-corner evaluation of the sharp law
and differentiation of normalized Hermite basis functions. Original export,
frame, row and closed-piece mappings are reconstructed independently. Existing
accepted root evidence supplies root truth; no root or geometry kernel runs.
An accepted comparison is conditional conformance only. Fresh successful CLI
completion and external inclusive deadline/process closure remain mandatory.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack
from decimal import Decimal
from fractions import Fraction as F
import hashlib
from itertools import product
import json
import os
from pathlib import Path
import re
import signal
import stat
import sys
import tempfile
import time

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/verify-f6c-continuous-reception-acceleration.py'
CONTROLS = 'tests/test_f6c_continuous_reception_acceleration.py'
CONSUMER = 'scripts/eom/prepare-f6c-continuous-reception-acceleration.py'
CONSUMER_SHA = '43f2af53e848a2a7c81bd53dffd4aa0ebb73fb361ee55c60bd5d73a8e7fd85fb'
CONSUMER_TEST = 'tests/test_f6c_continuous_reception_acceleration_preparation.py'
CONSUMER_TEST_SHA = 'cf05168f67c09c3349e0bec699411862e47b2c7982ede13cdc25143d45072326'
DECLARATION = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md'
DECLARATION_SHA = '3ef8fb9020bae71833b1e06a119672b49a4beb5395f697dcb3d037d088e7891e'
BASE = '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/'
# Independently transcribed original-byte contract, never imported from subject.
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
    ('priorClosureOwner', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md', 'daeb71bee6260c38a6b7e5e6237110216d9315807fe23602fbd7cfcdddc5866b'),
    ('reference', 'scripts/eom/oracle/continuous_reception_acceleration.py', 'abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'),
    ('referenceControls', 'tests/test_eom_continuous_reception_acceleration.py', '26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'),
    ('referenceProof', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md', 'c1a5358e1d887fab5b4753368dc14ec59ed220294f42d2afa4ac40f962ee537f'),
    ('memberPredeclaration', 'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md', 'c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853'),
    ('rootTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md', 'db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc'),
    ('reconstructionTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md', '6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936'),
)
SCOPE = 'cached-pilot-cell-0-range'
CANDIDATE_SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-candidate.v1'
PLAN_SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-launch.v1'
REPORT_SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-conformance.v1'
RANGE_SCHEMA = 'braid-program/continuous-reception-acceleration-range.v1'
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
CHARGE, COUPLING, RULER = '0.1666666666666666666666666666666667', '10.304229970992187', '0.5320012303229503'
KNOT_SHA = '11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c'
MAX_BYTES, MAX_RUNTIME_BYTES, MAX_LINE, LIMIT, HEARTBEAT = 64*1024**2, 1024**3, 128*1024, 1800, 15
LIMITS = dict(inclusiveSeconds=1800, maximumAggregateRssBytes=2*1024**3,
              maximumRssSampleGapMs=1000, heartbeatSeconds=15, admissionFreeMemoryPercent=40,
              admissionDiskBytes=64*1024**3, stopFreeMemoryBelowPercent=20, stopDiskBelowBytes=16*1024**3,
              hostObservationSeconds=15, hostObservationTimeoutSeconds=2, maximumScientificFileBytes=MAX_BYTES,
              maximumOutputFileBytes=MAX_BYTES, maximumCombinedLogBytes=16*1024**2, serialWorkers=1, eomWorkers=0)
ROOT_FLAGS = tuple('premise_truth_authenticated subject_membership_established execution_authorized metrics_available h3_evidence_eligible'.split())
RANGE_FLAGS = tuple('accepted premise_truth_authenticated source_bytes_authenticated root_coverage_established subject_membership_established historical_trajectory_identity_established execution_authorized metrics_available score_authorized h3_evidence_eligible'.split())
CANDIDATE_FLAGS = tuple('historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted rootsEvaluated independentRangeComparisonPassed executionAuthorized'.split())
CENSUS = dict(cells=1, pairRows=64, ordinaryPairs=56, selfZeros=8, members=8, pieceRecords=112)
ROLES = tuple(zip(('original_export','reconstruction_receipt','guards_receipt','root_cover','root_cover_comparison',
                  'member_acceleration_predeclaration','continuous_reception_enclosure_contract'),
                 ('export','reconstruction','guards','manifest','comparison','memberPredeclaration','rootTheorem')))
ROW_KEYS = 'rowIndex cellIndex receiverIndex transmitterIndex receiverId transmitterId reception emission ordinaryRootsPerReception coincidentEndpointExcluded oldestResidual lowerFaceResidual upperFaceResidual displacement distance transmitterFactor receiverFactor receiverPieceRecord transmitterPieceRecord rootFreeComplementConditional retainedBoundaryContact libraryFlags'.split()
PIECE_KEYS = 'recordIndex rowIndex role memberId historyDigest requestedInterval touchedPieceCount firstIndex lastIndex contiguousIndexRange clippedPiecesSha256'.split()
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
HEX = re.compile(r'[a-f0-9]{64}\Z')


def require(value, message):
    if not value:
        raise ValueError(message)


def equal(a, b):
    if type(a) is not type(b):
        return False
    if type(a) is dict:
        return a.keys() == b.keys() and all(equal(a[k], b[k]) for k in a)
    if type(a) in (list, tuple):
        return len(a) == len(b) and all(equal(x,y) for x,y in zip(a,b))
    return a == b


def keys(obj, names):
    require(type(obj) is dict and set(obj) == set(names), 'closed fields differ')


def seq(value, count):
    require(type(value) is list and len(value) == count, 'exact list census differs')


def integer(value, lo, hi):
    require(type(value) is int and lo <= value <= hi, 'bounded exact integer required')
    return value


def number(value):
    require(type(value) is str and 0 < len(value) <= 1152 and TOKEN.fullmatch(value), 'bounded decimal token required')
    d = Decimal(value)
    require(d.is_finite() and len(d.as_tuple().digits) <= 1024 and abs(d.as_tuple().exponent) <= 1000,
            'decimal exponent/digit bound')
    return F(d)


def interval(value, *, root=False, output=False):
    keys(value, ('lower','upper','precision') if root else ('lower','upper'))
    if root:
        require(type(value['precision']) is int and value['precision'] == 90, 'root precision differs')
    lo, hi = number(value['lower']), number(value['upper'])
    require(lo <= hi, 'reversed interval')
    if output:
        require(all(len(Decimal(value[k]).as_tuple().digits) <= 90 for k in ('lower','upper')), 'output exceeds90 significant digits')
    return lo, hi


def flags(value, names):
    keys(value, names)
    require(all(v is False for v in value.values()), 'authority flag promoted')


def binding(value):
    keys(value, ('path','sha256','bytes'))
    require(type(value['path']) is str and 0 < len(value['path']) <= 2048 and '\0' not in value['path'], 'binding path invalid')
    require(type(value['sha256']) is str and HEX.fullmatch(value['sha256']), 'SHA256 required')
    integer(value['bytes'],1,MAX_RUNTIME_BYTES)
    return value


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), allow_nan=False).encode()+b'\n'


def decode(raw, *, receipt=False):
    require(type(raw) is bytes and 0 < len(raw) <= MAX_BYTES, 'bounded original JSON required')
    def pairs(items):
        result = {}
        for k,v in items:
            require(k not in result, 'duplicate JSON key')
            result[k] = v
        return result
    def reject(value):
        raise ValueError('nonexact/nonfinite JSON number: '+value)
    return json.loads(raw.decode('utf-8', errors='strict'), object_pairs_hook=pairs,
                      parse_float=Decimal if receipt else reject, parse_constant=reject)


def records(raw, count):
    require(type(raw) is bytes and 0 < len(raw) <= MAX_BYTES and raw.endswith(b'\n'), 'terminated bounded original stream required')
    lines = raw.split(b'\n')[:-1]
    require(len(lines) == count and all(0 < len(line) <= MAX_LINE for line in lines), 'raw line/census bound')
    result = [decode(line) for line in lines]
    require(all(type(row) is dict for row in result), 'null/nonobject is not EOF')
    return result


def original_history(history):
    """Serialization/coverage identity only; no polynomial state evaluation."""
    seq(history['segments'],1760)
    tokens, grid, cursor = [history['id']], [], F(-8)
    for n,s in enumerate(history['segments']):
        keys(s, ('startTime','endTime','coefficients','positionErrors','velocityErrors','positionError','velocityError'))
        a,b = number(s['startTime']),number(s['endTime'])
        require(a == cursor < b, 'original segment gap/overlap')
        require(b <= 0 if n < 1600 else a >= 0, 'original prehistory split differs')
        cursor=b; grid.append((a,b)); seq(s['coefficients'],3)
        for c in s['coefficients']: seq(c,4)
        for kind in ('position','velocity'):
            seq(s[kind+'Errors'],3); scalar=number(s[kind+'Error'])
            require(all(0 <= number(t) <= scalar for t in s[kind+'Errors']), 'original axis/scalar allowance differs')
        raw=[s['startTime'],s['endTime'],*(t for c in s['coefficients'] for t in c),s['positionError'],s['velocityError']]
        for t in raw: number(t)
        tokens.extend(str(Decimal(t)) for t in raw); tokens.append('90')
    require(cursor == F(13,100), 'original retained end differs')
    return sha('\n'.join(tokens).encode()),grid


def clipped_coverage(grid, requested):
    """Hash every closed intersection, including both singleton knot pieces."""
    lo,hi=requested; require(F(-8) <= lo <= hi <= F(13,100), 'piece request outside retained domain')
    digest=hashlib.sha256(); indices=[]; cursor=lo
    for n,(left,right) in enumerate(grid):
        if left > hi or right < lo: continue
        a,b=max(left,lo),min(right,hi)
        require(a <= cursor and (not indices or n == indices[-1]+1), 'closed coverage gap')
        digest.update(f'{n}\t{a}\t{b}\n'.encode());indices.append(n);cursor=max(cursor,b)
    require(indices and cursor == hi, 'closed coverage incomplete')
    return dict(touchedPieceCount=len(indices), firstIndex=indices[0], lastIndex=indices[-1],
                contiguousIndexRange=[indices[0],indices[-1]], clippedPiecesSha256=digest.hexdigest())


def reconstruct_projection(export, manifest, rows, pieces, fixed):
    """Rebuild from originals, not the subject's expected-input projection."""
    seq(rows,64);seq(pieces,112)
    require(export['schema']=='braid-program/f6c-retained-history-export.v1' and
            export['fieldSpeed']=='1' and export['coupling']==COUPLING, 'original source constants/schema differ')
    require(manifest['schema']=='braid-program/f6c-continuous-reception-root-cover.v1' and
            manifest['scope']=='pilot-cell-0' and manifest['status']=='conditional_complete' and manifest['accepted'] is False,
            'original cover scope differs')
    flags(manifest['libraryFlags'],ROOT_FLAGS)
    for k,n in dict(precision=90,cellCount=1,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112).items():
        require(type(manifest[k]) is int and manifest[k]==n, 'original cover census differs')
    require(interval(manifest['receptionDomain'],root=True)==(F(0),F(1,1000)) and
            interval(manifest['retainedDomain'],root=True)==(F(-8),F(13,100)), 'original domains differ')
    histories=export['retainedHistories']; frames=export['acceptedFrames']; edges=export['acceptedFrameIntervals']
    seq(histories,8);seq(manifest['members'],8);seq(frames,81);seq(edges,80)
    grids=[];digests=[];expected_members=[];knots=None
    for i,h in enumerate(histories):
        sign=1 if i%2==0 else -1
        require(h['id']==IDS[i] and type(h['pathKey']) is int and h['pathKey']==i+1 and
                type(h['polarity']) is int and h['polarity']==sign and h['charge']==('' if sign>0 else '-')+CHARGE,
                'original member identity/polarity differs')
        require(h['coverageStart']=='-8' and h['coverageEnd']=='0.13', 'original history domain differs')
        digest,grid=original_history(h); grids.append(grid);digests.append(digest)
        future=sorted({v for pair in grid[1600:] for v in pair})
        if knots is None: knots=future
        require(future==knots and len(future)==161, 'original future knot census differs')
        expected=dict(id=IDS[i],pathKey=i+1,polarity=sign,originalHistoryFingerprint=h['historyFingerprint'],historyDigest=digest)
        require(equal(manifest['members'][i],expected), 'original history digest/fingerprint mapping differs')
    require(sha(''.join(str(t)+'\n' for t in knots).encode())==KNOT_SHA, 'original knot hash differs')
    for n,frame in enumerate(frames):
        keys(frame,('frameIndex','time','members'));seq(frame['members'],8)
        require(type(frame['frameIndex']) is int and frame['frameIndex']==n and number(frame['time'])==knots[2*n], 'frame knot mapping differs')
        for i,m in enumerate(frame['members']):
            keys(m,('pathKey','position','velocity','positionErrorBound','stateFlags'))
            require(type(m['pathKey']) is int and m['pathKey']==i+1 and type(m['stateFlags']) is int and
                    m['stateFlags']==(1 if i%2==0 else 2) and number(m['positionErrorBound'])>=0, 'frame member mapping differs')
            for field in ('position','velocity'):
                keys(m[field],('x','y','z'))
                for t in m[field].values(): number(t)
        if n<80:
            require(equal(edges[n],dict(leftFrameIndex=n,rightFrameIndex=n+1,startTime=frame['time'],endTime=frames[n+1]['time'])), 'frame edge lexemes differ')
    for i,h in enumerate(histories):
        item=dict(label=IDS[i],path_id=str(i+1),charge=h['charge'],history_digest=digests[i])
        for side,n in (('left',0),('right',1)):
            for kind in ('position','velocity'):
                item[kind+'_'+side]=[frames[n]['members'][i][kind][k] for k in ('x','y','z')]
        expected_members.append(item)
    def project_box(x):
        if x is None:return None
        interval(x,root=True);return {k:x[k] for k in ('lower','upper')}
    projected=[];index=0;cache={}
    for n,row in enumerate(rows):
        keys(row,ROW_KEYS);flags(row['libraryFlags'],ROOT_FLAGS);i,j=divmod(n,8)
        for k,v in dict(rowIndex=n,cellIndex=0,receiverIndex=i,transmitterIndex=j).items():
            require(type(row[k]) is int and row[k]==v, 'original pair order differs')
        require(row['receiverId']==IDS[i] and row['transmitterId']==IDS[j] and equal(row['reception'],manifest['receptionDomain']), 'row identity/reception differs')
        require(row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False, 'root complement/boundary differs')
        nullable=('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')
        coverage=[]
        if i==j:
            require(type(row['ordinaryRootsPerReception']) is int and row['ordinaryRootsPerReception']==0 and
                    row['coincidentEndpointExcluded'] is True and all(row[k] is None for k in nullable), 'self exclusion differs')
            coverage=[None,None]
        else:
            require(type(row['ordinaryRootsPerReception']) is int and row['ordinaryRootsPerReception']==1 and row['coincidentEndpointExcluded'] is False, 'ordinary root census differs')
            require(interval(row['emission'],root=True)==(F(-8),-F(1,20)), 'emission proposal changed')
            require(interval(row['oldestResidual'],root=True)[1]<0 and interval(row['lowerFaceResidual'],root=True)[1]<0 and
                    interval(row['upperFaceResidual'],root=True)[0]>0, 'unrestricted face signs differ')
            require(equal(row['oldestResidual'],row['lowerFaceResidual']), 'same oldest/lower face differs')
            require(interval(row['distance'],root=True)[0]>0 and interval(row['transmitterFactor'],root=True)[0]>=F(1,10**24) and
                    interval(row['receiverFactor'],root=True)[0]>0, 'positive root denominator/factor differs')
            seq(row['displacement'],3)
            for part in row['displacement']: interval(part,root=True)
            for role,member,request in (('receiver',i,row['reception']),('transmitter',j,row['emission'])):
                require(type(row[role+'PieceRecord']) is int and row[role+'PieceRecord']==index, 'piece pointer differs')
                p=pieces[index];keys(p,PIECE_KEYS)
                cache_key=(member,role)
                if cache_key not in cache:cache[cache_key]=clipped_coverage(grids[member],interval(request,root=True))
                expected=dict(recordIndex=index,rowIndex=n,role=role,memberId=IDS[member],historyDigest=digests[member],
                              requestedInterval=request,**cache[cache_key])
                require(equal(p,expected), 'original closed-piece hash/census mapping differs')
                coverage.append(expected['clippedPiecesSha256']);index+=1
        mapped=dict(receiver_id=IDS[i],transmitter_id=IDS[j],reception=project_box(row['reception']),
                    ordinary_roots_per_reception=row['ordinaryRootsPerReception'],coincident_endpoint_excluded=row['coincidentEndpointExcluded'],
                    root_free_complement_conditional=True,retained_boundary_contact=False,
                    receiver_coverage_sha256=coverage[0],transmitter_coverage_sha256=coverage[1])
        for camel,snake in (('emission','emission'),('oldestResidual','oldest_residual'),('lowerFaceResidual','lower_face_residual'),
                            ('upperFaceResidual','upper_face_residual'),('distance','distance'),('transmitterFactor','transmitter_factor'),('receiverFactor','receiver_factor')):
            mapped[snake]=project_box(row[camel])
        mapped['displacement']=None if row['displacement'] is None else [project_box(x) for x in row['displacement']]
        projected.append(mapped)
    require(index==112, 'piece census incomplete')
    return dict(scope='f6c-reconstruction-family',precision=90,cell_index=0,frame_index=0,
                reception=project_box(manifest['receptionDomain']),frame_domain=dict(lower=frames[0]['time'],upper=frames[1]['time']),
                retained_domain=project_box(manifest['retainedDomain']),field_speed='1',coupling=COUPLING,ruler=RULER,
                cover_status='conditional_complete',bindings=[dict(role=role,**fixed[key]) for role,key in ROLES],
                members=expected_members,rows=projected)


def corner_acceleration(displacement, distance, factor, strength):
    """Exact extrema over eight corners; not the reference's interval pipeline."""
    require(distance[0]>0 and distance[0]<=distance[1] and F(1,10**24)<=factor[0]<=factor[1], 'invalid sharp denominator')
    require(len(displacement)==3, 'three acceleration coordinates required')
    result=[]
    for d in displacement:
        require(d[0]<=d[1], 'reversed displacement')
        values=[strength*x/(r*r*r*f) for x,r,f in product(d,distance,factor)]
        result.append((min(values),max(values)))
    return result


def basis_curvature(frame, reception, p0, v0, p1, v1):
    """Differentiate normalized Hermite basis; affine extrema at cell ends."""
    left,right=frame;h=right-left
    require(h>0 and left<=reception[0]<=reception[1]<=right, 'cell outside exact frame')
    require(all(len(v)==3 for v in (p0,v0,p1,v1)), 'three Hermite coordinates required')
    result=[]
    for x0,w0,x1,w1 in zip(p0,v0,p1,v1):
        ends=[]
        for t in reception:
            z=(t-left)/h
            ends.append((12*z-6)*(x0-x1)/(h*h)+(6*z-4)*w0/h+(6*z-2)*w1/h)
        result.append((min(ends),max(ends)))
    return result


def check_contains(record, exact):
    lo,hi=interval(record,output=True)
    require(lo<=exact[0]<=exact[1]<=hi, 'reported range misses independent rational enclosure')


def compare_ranges(result, projection):
    copied={k:v for k,v in projection.items() if k!='cover_status'}
    keys(result, (*copied,'schema','status','pair_ranges','member_ranges','claims'))
    require(result['schema']==RANGE_SCHEMA and result['status']=='conditional_ranges', 'range schema/status differs')
    for k,v in copied.items():require(equal(result[k],v), 'range copied original field differs: '+k)
    flags(result['claims'],RANGE_FLAGS);seq(result['pair_ranges'],64);seq(result['member_ranges'],8)
    totals=[[[F(0),F(0)] for _ in range(3)] for _ in IDS]
    for n,(raw,pair) in enumerate(zip(projection['rows'],result['pair_ranges'])):
        i,j=divmod(n,8);keys(pair,('receiver_id','transmitter_id','disposition','acceleration'))
        require((pair['receiver_id'],pair['transmitter_id'])==(IDS[i],IDS[j]) and pair['disposition']==
                ('self_empty_zero' if i==j else 'ordinary_conditional_range'), 'pair output identity/disposition differs')
        exact=[(F(0),F(0))]*3 if i==j else corner_acceleration(
            [interval(x) for x in raw['displacement']],interval(raw['distance']),interval(raw['transmitter_factor']),
            number(projection['coupling'])*number(projection['members'][i]['charge'])*number(projection['members'][j]['charge']))
        seq(pair['acceleration'],3)
        for axis,(reported,bound) in enumerate(zip(pair['acceleration'],exact)):
            check_contains(reported,bound)
            if i==j:require(interval(reported)==(0,0), 'self output is not exact zero')
            for end in (0,1):totals[i][axis][end]+=bound[end]
    for i,(member,reported) in enumerate(zip(projection['members'],result['member_ranges'])):
        keys(reported,('label','acceleration','required_acceleration','residual','squared_norm'))
        require(reported['label']==IDS[i], 'member result order differs')
        required=basis_curvature(interval(projection['frame_domain']),interval(projection['reception']),
            *([number(t) for t in member[k]] for k in ('position_left','velocity_left','position_right','velocity_right')))
        ruler=number(projection['ruler']);residual=[]
        for h,a in zip(required,totals[i]):residual.append((ruler*(h[0]-a[1]),ruler*(h[1]-a[0])))
        for key,boxes in (('acceleration',totals[i]),('required_acceleration',required),('residual',residual)):
            seq(reported[key],3)
            for record,bound in zip(reported[key],boxes):check_contains(record,bound)
        lows=[];highs=[]
        for lo,hi in residual:
            lows.append(F(0) if lo<=0<=hi else min(lo*lo,hi*hi));highs.append(max(lo*lo,hi*hi))
        check_contains(reported['squared_norm'],(sum(lows),sum(highs)))
        require(interval(reported['squared_norm'])[0]>=0, 'squared norm lower bound negative')
    return dict(**CENSUS, comparedPairComponents=192, comparedMemberIntervals=80)


def validate_plan(plan, own_sha):
    keys(plan,('schema','scope','consumer','controls','declaration','rangeVerifier','runtimeBindings','operationalBindings','limits','priorCoverClosure'))
    require(plan['schema']==PLAN_SCHEMA and plan['scope']==SCOPE and equal(plan['limits'],LIMITS), 'plan scope/resource limits differ')
    for key,p,h in (('consumer',CONSUMER,CONSUMER_SHA),('controls',CONSUMER_TEST,CONSUMER_TEST_SHA),
                    ('declaration',DECLARATION,DECLARATION_SHA),('rangeVerifier',SELF,own_sha)):
        b=binding(plan[key]);require((b['path'],b['sha256'])==(p,h), 'frozen plan source differs')
    for key in ('runtimeBindings','operationalBindings'):
        entries=plan[key];require(type(entries) is list and 0<len(entries)<=256, 'bounded execution census')
        for b in entries:binding(b)
        require(len({b['path'] for b in entries})==len(entries), 'duplicate execution binding')
    require(sum(b['path']==CONTROLS for b in plan['operationalBindings'])==1, 'independent checker controls absent')
    expected=dict(authority='externally-reviewed-caller-observation',ownerSha256=dict((r,h) for r,_,h in FIXED)['priorClosureOwner'],
                  admissionSha256=dict((r,h) for r,_,h in FIXED)['admission'],matchingFreshCompletionObserved=True,
                  exitCode=0,elapsedSeconds='8.534247625',processesClosed=True,independentAuditAccepted=True)
    require(equal(plan['priorCoverClosure'],expected), 'externally observed prior closure differs')
    return plan


def authenticate_prior(docs, fixed):
    """Authenticate the already accepted chain; never re-prove root truth."""
    m,c,a=docs['manifest'],docs['comparison'],docs['admission'];p=docs['priorPlan']
    for obj,key,role in ((m,'rows','rows'),(m,'pieces','pieces'),(m,'launchPlan','priorPlan'),
                         (c,'rows','rows'),(c,'pieces','pieces'),(c,'manifest','manifest'),(c,'launchPlan','priorPlan'),(a,'plan','priorPlan')):
        require(equal(binding(obj[key]),fixed[role]), 'prior original-byte chain differs')
    require(c['schema']=='braid-program/f6c-continuous-reception-root-cover-conformance.v1' and c['accepted'] is True and c['scope']=='pilot-cell-0', 'prior comparison not accepted')
    require(c['analysis']['accepted'] is False and c['analysis']['conditionalEnclosuresConformant'] is True, 'prior conditional comparison absent')
    for k,n in dict(cellCount=1,pairCellCertificates=64,ordinaryNonselfRows=56,selfExclusionRows=8,distinctNonselfFaceChecks=112,pieceRecordCount=112,recordedGeometryPieceVisits=89208).items():
        require(type(c['analysis'][k]) is int and c['analysis'][k]==n, 'prior comparison census differs')
    require(equal(c['claims'],dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
        historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,
        h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)), 'prior comparison claims differ')
    flags(c['libraryFlags'],ROOT_FLAGS)
    require(p['schema']=='braid-program/f6c-cached-root-cover-pilot-launch.v1' and p['scope']=='pilot-cell-0', 'prior plan scope differs')
    contract=p['comparisonContract']
    require(contract['verifierSha256']=='e0e063ce268cfd54e8a9ce618fb7da3caca0a9756000d7602ed9ae2abc6b0fd9' and
        contract['declarationSha256']=='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4' and
        c['verifier']['sha256']==contract['verifierSha256'], 'prior oracle generation differs')
    require(equal(m['subjectSourceBindings'],contract['subjectSourceBindings']) and equal(m['runtimeBindings'],contract['runtimeBindings']), 'prior source/runtime chain differs')
    for role in ('export','reconstruction','guards','rootTheorem','reconstructionTheorem'):
        require(equal(binding(c['fixedBindings'][role]),fixed[role]), 'prior proof original binding differs')
    for role in ('reconstruction','guards'):
        proof=docs[role]
        require(proof['accepted'] is True and proof['historyExportBefore']['sha256']==proof['historyExportAfter']['sha256']==fixed['export']['sha256'] and
                proof['claims']['subjectMembershipEstablished'] is False, 'original family proof differs')
    for key in ('anchoredPrehistoryFamilyNonempty','fixedAcceptedFrameFutureContained','reconstructedFullHistoryFamilyNonempty','reconstructedFamilyContainedInOriginalEnclosures'):
        require(docs['reconstruction']['claims'][key] is True, 'coherent-family premise missing')
    for key in ('conditionalUniformOldestBoundaryResidualStrictlyNegative','conditionalUniformSameTimeNonselfSeparation','conditionalUniformSpeedStrictlyBelowOne'):
        require(docs['guards']['claims'][key] is True, 'uniform root premise missing')
    require(a['schema']=='braid-program/f6c-cached-root-cover-pilot-admission.v1' and a['accepted'] is True and a['scope']=='pilot-cell-0' and a['processesClosed'] is True, 'prior operational admission differs')
    for k in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'):require(a[k] is False, 'prior authority promoted')
    seq(a['stages'],2)
    for item,stage in zip(a['stages'],('consumer','comparison')):
        process=item['process'];completed=item['admission']['completion']
        require(item['stage']==stage and item['admission']['accepted'] is True and process['accepted'] is True and
                process['processesClosed'] is True and equal(process['exit'],dict(code=0,signal=None)) and completed['completed'] is True, 'prior stage closure differs')
        seq(process['gates'],1);require(process['gates'][0]['retired'] is True, 'prior gate not retired')
        require(completed['accepted'] is (stage=='comparison'), 'prior completion disposition differs')
        if stage=='consumer':require(equal(completed['outputs'],[fixed[k] for k in ('rows','pieces','manifest')]), 'prior consumer outputs differ')
        else:require(equal(completed['output'],fixed['comparison']), 'prior comparison output differs')


def compare_candidate(packet, plan, plan_binding, consumer_binding, fixed, docs, rows, pieces):
    keys(packet,'schema scope accepted status fixedBindings launchPlan consumer declaration rangeVerifier runtimeBindings operationalBindings priorCoverClosure projection ranges census claims publicationRequires'.split())
    require(packet['schema']==CANDIDATE_SCHEMA and packet['scope']==SCOPE and packet['accepted'] is False and
            packet['status']=='conditional-range-candidate', 'candidate scope/self-acceptance differs')
    for key,expected in dict(fixedBindings=fixed,launchPlan=plan_binding,consumer=consumer_binding,declaration=plan['declaration'],
                            rangeVerifier=plan['rangeVerifier'],runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],
                            priorCoverClosure=plan['priorCoverClosure'],census=CENSUS).items():
        require(equal(packet[key],expected), 'candidate provenance/census differs: '+key)
    flags(packet['claims'],CANDIDATE_FLAGS)
    require(packet['publicationRequires']=='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes', 'candidate publication boundary differs')
    seq(rows,64);seq(pieces,112);authenticate_prior(docs,fixed)
    projected=reconstruct_projection(docs['export'],docs['manifest'],rows,pieces,fixed)
    require(equal(packet['projection'],projected), 'candidate original projection differs')
    return compare_ranges(packet['ranges'],projected)


class BoundFile:
    def __init__(self,path,expected,*,capture=False,limit=MAX_BYTES):
        self.path=Path(path).absolute();self.expected=expected;self.capture=capture;self.limit=limit;self.fd=None

    @staticmethod
    def identity(info):
        return info.st_dev,info.st_ino,info.st_size,info.st_mtime_ns,info.st_ctime_ns

    def __enter__(self):
        require(type(self.expected) is str and HEX.fullmatch(self.expected), 'external original-byte hash required')
        self.fd=os.open(self.path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
        try:
            self.initial=os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0<self.initial.st_size<=self.limit, 'bounded regular file required')
            self.data,digest=self.scan(self.capture)
            require(digest==self.expected, 'source hash differs')
            self.check_path();return self
        except BaseException:
            os.close(self.fd);self.fd=None;raise

    def scan(self,capture=False):
        os.lseek(self.fd,0,os.SEEK_SET);parts=[];h=hashlib.sha256();count=0
        while count<self.initial.st_size:
            part=os.read(self.fd,min(65536,self.initial.st_size-count));require(part,'truncated source')
            count+=len(part);h.update(part)
            if capture:parts.append(part)
        require(self.identity(os.fstat(self.fd))==self.identity(self.initial), 'source changed during read')
        return (b''.join(parts) if capture else None),h.hexdigest()

    def check_path(self):
        require(self.identity(os.stat(self.path,follow_symlinks=False))==self.identity(self.initial), 'bound path replaced')

    def recheck(self):
        require(self.scan()[1]==self.expected, 'source hash changed');self.check_path()

    def binding(self):
        return dict(path=str(self.path),sha256=self.expected,bytes=self.initial.st_size)

    def __exit__(self,*_):
        if self.fd is not None:os.close(self.fd)
        self.fd=None


def executing_source(raw):
    require(compile(raw,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize)==_EXECUTING_CODE,
            'executing verifier generation differs')


def runtime_paths():
    paths={Path(sys.executable).resolve()};own=Path(__file__).resolve()
    for module in tuple(sys.modules.values()):
        for key in ('__file__','__cached__'):
            p=getattr(module,key,None)
            if type(p) is str:
                p=Path(p).resolve()
                if p.is_file() and p!=own:paths.add(p)
    return paths


def budget_deadline(token,began):
    exact=number(token);rounded=float(exact)
    require(0<exact<=LIMIT and 0<rounded<=LIMIT and began+rounded>began, 'unrepresentable positive remaining deadline')
    return began+rounded


class Publication:
    """Retain private bytes; retract only this attempt's own public inode."""
    def __init__(self,path,deadline):
        self.path=Path(path);self.deadline=deadline;self.private=None;self.identity=None

    def check(self):
        require(time.monotonic()<self.deadline, 'publication deadline')

    def publish(self,record):
        self.check();raw=encoded(record);require(len(raw)<=MAX_BYTES, 'comparison output byte limit')
        with tempfile.NamedTemporaryFile(dir=self.path.parent,prefix='.range-comparison-private-',delete=False) as out:
            self.private=Path(out.name);self.identity=os.fstat(out.fileno())
            require(out.write(raw)==len(raw), 'short publication write');out.flush();os.fsync(out.fileno())
        self.check();os.link(self.private,self.path)
        fd=os.open(self.path.parent,os.O_RDONLY)
        try:os.fsync(fd)
        finally:os.close(fd)
        self.check();return dict(path=str(self.path),sha256=sha(raw),bytes=len(raw))

    def reject(self):
        if self.identity is None:return
        try:
            info=os.stat(self.path,follow_symlinks=False)
            if (info.st_dev,info.st_ino)==(self.identity.st_dev,self.identity.st_ino):os.unlink(self.path)
        except FileNotFoundError:pass


def complete(record,deadline):
    require(time.monotonic()<deadline, 'final cleanup deadline')
    print(json.dumps(record,allow_nan=False),flush=True)
    require(time.monotonic()<deadline, 'final stdout-flush deadline')


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for flag in ('candidate','candidate-sha256','plan','plan-sha256','verifier-sha256','out','budget-seconds'):
        parser.add_argument('--'+flag,required=True)
    args=parser.parse_args(argv);began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began)
    root=Path(__file__).resolve().parents[2];output=Path(args.out).absolute();publication=None
    require(output.parent.is_dir() and output==output.resolve() and not output.exists() and not output.is_symlink(), 'fresh canonical comparison output required')
    progress=dict(stage='capture',completedCells=0,accepted=False)
    def beat(*_):
        print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True)
        require(time.monotonic()<deadline, 'comparison deadline')
        signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,max(.000001,deadline-time.monotonic())))
    previous=signal.signal(signal.SIGALRM,beat)
    signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,deadline-began))
    try:
        with ExitStack() as stack:
            owned=[]
            def capture(path,digest,**kw):
                obj=stack.enter_context(BoundFile(path,digest,**kw));owned.append(obj);return obj
            own=capture(root/SELF,args.verifier_sha256,capture=True);executing_source(own.data)
            plan_file=capture(args.plan,args.plan_sha256,capture=True)
            plan=validate_plan(decode(plan_file.data),args.verifier_sha256)
            fixed_files={role:capture(root/p,h,capture=True) for role,p,h in FIXED}
            fixed={k:v.binding() for k,v in fixed_files.items()}
            source_files={}
            for key in ('consumer','controls','declaration','rangeVerifier'):
                b=plan[key];obj=capture(root/b['path'],b['sha256']);require(obj.initial.st_size==b['bytes'], 'plan source size differs')
                source_files[key]=obj.binding()
            runtime=set();execution=[]
            for group in ('runtimeBindings','operationalBindings'):
                for b in plan[group]:
                    obj=capture(root/b['path'],b['sha256'],limit=MAX_RUNTIME_BYTES)
                    require(obj.initial.st_size==b['bytes'], 'execution binding size differs');execution.append(obj.binding())
                    if group=='runtimeBindings':runtime.add(obj.path.resolve())
            require(runtime_paths()<=runtime, 'loaded verifier runtime not declared')
            candidate=capture(args.candidate,args.candidate_sha256,capture=True);packet=decode(candidate.data)
            docs={k:decode(fixed_files[k].data,receipt=(k!='export')) for k in
                  ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
            progress['stage']='independent-mapping-and-rational-ranges'
            analysis=compare_candidate(packet,plan,plan_file.binding(),source_files['consumer'],fixed,docs,
                records(fixed_files['rows'].data,64),records(fixed_files['pieces'].data,112))
            progress.update(stage='final-source-rechecks',completedCells=1)
            require(runtime_paths()<=runtime, 'late verifier runtime not declared')
            for obj in owned:obj.recheck()
            report=dict(schema=REPORT_SCHEMA,accepted=True,scope=SCOPE,
                authority='independent original-mapping and exact-rational conditional range containment only',
                candidate=candidate.binding(),launchPlan=plan_file.binding(),verifier=own.binding(),
                subjectSources=source_files,fixedBindings=fixed,executionBindings=execution,analysis=analysis,
                referenceClaims={k:False for k in RANGE_FLAGS},candidateClaims={k:False for k in CANDIDATE_FLAGS},
                priorCoverClosure=plan['priorCoverClosure'],
                publicationRequires='matching fresh successful completion, externally observed inclusive deadline and owned-process closure',
                elapsedSecondsBeforePublication=time.monotonic()-began)
            publication=Publication(output,deadline);result=publication.publish(report)
            emitted=capture(result['path'],result['sha256']);require(emitted.initial.st_size==result['bytes'], 'published size differs')
            for obj in owned:obj.recheck()
            progress['stage']='input-cleanup'
        require(time.monotonic()<deadline, 'post-input-cleanup deadline')
        signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
        complete(dict(completed=True,accepted=True,scope=SCOPE,output=result,analysis=analysis,
                      elapsedSeconds=time.monotonic()-began,h3EvidenceEligible=False,eomExecuted=False,
                      externalInclusiveDeadlineAndProcessClosureRequired=True),deadline)
    except BaseException as exc:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(exc)[:4096],
                          'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)


if __name__=='__main__':
    try:main()
    except BaseException as exc:
        if isinstance(exc,SystemExit):raise
        sys.exit(1)
