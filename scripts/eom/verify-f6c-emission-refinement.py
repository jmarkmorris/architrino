#!/usr/bin/env python3
"""Source-bound independent replay/comparison of the emission-only cover.

Only the captured accepted pure comparator and the older independent rational
Bernstein helper are executed. The producer is bound data, never an oracle.
Acceptance is conditional mathematical conformance; matching fresh completion
and external inclusive resource/process closure remain mandatory. No range,
EOM evolution, score, or historical-trajectory authority is supplied.
"""
from __future__ import annotations
import argparse
from contextlib import ExitStack, contextmanager
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import json
import os
from pathlib import Path
import re
import signal
import stat
import sys
import tempfile
import time
from types import ModuleType

_EXECUTING_CODE=sys._getframe().f_code
SELF='scripts/eom/verify-f6c-emission-refinement.py'
CONTROLS='tests/test_f6c_emission_refinement.py'
PRODUCER='scripts/eom/prepare-f6c-emission-refinement.py'
PRODUCER_CONTROLS='tests/test_f6c_emission_refinement_preparation.py'
DECLARATION='reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-predeclaration.md'
DECLARATION_SHA='53f3398ba083218948c9efd93f10db09cbf5d617bc0270988f5adea24c48f037'
PURE='scripts/eom/oracle/f6c_emission_refinement_conformance.py'
PURE_SHA='ec0eaaeae3da4ffb597ac92ff3ac1a5700a8cf88916144a7d994912270c4157a'
PURE_CONTROLS='tests/test_f6c_emission_refinement_conformance.py'
PURE_CONTROLS_SHA='bac7357186fb05c5b7ea35154c5564e7527075a9a94177a8b600f9a02119adb5'
HELPER='scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py'
HELPER_SHA='19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132'
HELPER_CONTROLS='tests/test_f6c_cached_continuous_reception_root_cover.py'
HELPER_CONTROLS_SHA='2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117'
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
    ('rootTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md', 'f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68'),
    ('reconstructionTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md', '6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936'),
)

SCOPE='pilot-cell-0-emission-refinement'
PLAN_SCHEMA='braid-program/f6c-emission-refinement-launch.v1'
MANIFEST_SCHEMA='braid-program/f6c-emission-refinement-cover.v1'
REPORT_SCHEMA='braid-program/f6c-emission-refinement-conformance.v1'
LANE='.local-data/braid-analysis/f6c-emission-refinement-20260827'
IDS=('0+','0-','1+','1-','2+','2-','3+','3-')
CHARGE='0.1666666666666666666666666666666667'
COUPLING='10.304229970992187'
KNOT_SHA='11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c'
MAX_BYTES,MAX_RUNTIME_BYTES,MAX_LINE,LIMIT,HEARTBEAT=64*1024**2,1024**3,128*1024,1800,15
LIMITS=dict(inclusiveSeconds=1800,maximumAggregateRssBytes=2*1024**3,maximumRssSampleGapMs=1000,
    heartbeatSeconds=15,admissionFreeMemoryPercent=40,admissionDiskBytes=64*1024**3,
    stopFreeMemoryBelowPercent=20,stopDiskBelowBytes=16*1024**3,hostObservationSeconds=15,
    hostObservationTimeoutSeconds=2,maximumScientificFileBytes=MAX_BYTES,maximumOutputFileBytes=MAX_BYTES,
    maximumCombinedLogBytes=16*1024**2,serialWorkers=1,eomWorkers=0)
ROOT_FLAGS=tuple('premise_truth_authenticated subject_membership_established execution_authorized metrics_available h3_evidence_eligible'.split())
CLAIMS=tuple('historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split())
CENSUS=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
ALGORITHM=dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,order='receiver-major;lower32;reset;upper32')
PLAN_KEYS='schema scope declaration producer producerControls verifier verifierControls comparisonReference comparisonReferenceControls subjectSourceBindings runtimeBindings operationalBindings limits priorCoverClosure'.split()
MANIFEST_KEYS='schema scope status accepted launchPlan producer fixedBindings subjectSourceBindings executionBindings priorCoverClosure members knotSha256 retainedDomain receptionDomain originalEmissionDomain precision speedUpper clearanceLower algorithm restrictions census queries rows pieces libraryFlags claims'.split()
PUBLICATION_REQUIRES='matching fresh successful completion, externally observed inclusive deadline and owned-process closure'
TOKEN=re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
HEX=re.compile(r'[a-f0-9]{64}\Z')
# The first two plan-pinned subject entries are the independently reviewed
# producer/control generation. The other thirteen are frozen dependencies.
FROZEN_SUBJECT=(
 (DECLARATION,DECLARATION_SHA),
 ('scripts/eom/oracle/continuous_reception_roots_cached.py','daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
 ('tests/test_eom_continuous_reception_roots_cached.py','a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb'),
 ('scripts/eom/oracle/certified_history.py','ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
 ('scripts/eom/oracle/decimal_interval.py','fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
 ('tests/test_eom_decimal_interval.py','22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44'),
 (HELPER,HELPER_SHA),(HELPER_CONTROLS,HELPER_CONTROLS_SHA),(PURE,PURE_SHA),(PURE_CONTROLS,PURE_CONTROLS_SHA),
 ('reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md','798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3'),
 ('scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386'),
 ('tests/test_f6c_cached_continuous_reception_root_cover_preparation.py','9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427'))
SOURCE_PLAN_KEYS=('declaration','producer','producerControls','verifier','verifierControls','comparisonReference','comparisonReferenceControls')

def prior_closure():
    hashes={role:h for role,_,h in FIXED}
    return dict(authority='externally-reviewed-caller-observation',ownerSha256=hashes['priorClosureOwner'],
        admissionSha256=hashes['admission'],matchingFreshCompletionObserved=True,exitCode=0,
        elapsedSeconds='8.534247625',processesClosed=True,independentAuditAccepted=True)

def validate_plan(plan,own_sha):
    keys(plan,PLAN_KEYS)
    require(plan['schema']==PLAN_SCHEMA and plan['scope']==SCOPE and equal(plan['limits'],LIMITS),'plan scope/limits differ')
    prescribed=dict(declaration=(DECLARATION,DECLARATION_SHA),producer=(PRODUCER,None),
        producerControls=(PRODUCER_CONTROLS,None),verifier=(SELF,own_sha),verifierControls=(CONTROLS,None),
        comparisonReference=(PURE,PURE_SHA),comparisonReferenceControls=(PURE_CONTROLS,PURE_CONTROLS_SHA))
    for key,(path,digest) in prescribed.items():
        b=binding(plan[key]);require(b['path']==path and (digest is None or b['sha256']==digest),'plan source generation differs: '+key)
    for group in ('subjectSourceBindings','runtimeBindings','operationalBindings'):
        entries=plan[group];require(type(entries) is list and 0<len(entries)<=256,'bounded binding census required')
        for b in entries:binding(b)
        require(len({b['path'] for b in entries})==len(entries),'duplicate binding path')
    subjects=plan['subjectSourceBindings'];seq(subjects,15)
    expected={p:h for p,h in FROZEN_SUBJECT}|{plan[k]['path']:plan[k]['sha256'] for k in ('producer','producerControls')}
    require({b['path']:b['sha256'] for b in subjects}==expected,'exact subject dependency closure differs')
    for k in ('producer','producerControls','declaration','comparisonReference','comparisonReferenceControls'):
        require(any(equal(b,plan[k]) for b in subjects),'named source/subject generation differs')
    require(equal(plan['priorCoverClosure'],prior_closure()),'caller-observed prior closure differs')
    # One path cannot denote different generations in different plan roles.
    all_bindings=[plan[k] for k in SOURCE_PLAN_KEYS]+sum((plan[g] for g in ('subjectSourceBindings','runtimeBindings','operationalBindings')),[])
    seen={}
    for b in all_bindings:
        if b['path'] in seen:require(equal(seen[b['path']],b),'contradictory duplicate source binding')
        seen[b['path']]=b
    return plan

def validate_layout(root,manifest,output):
    lane=root/LANE
    require(lane==lane.resolve(),'canonical unchanged output lane required')
    manifest=Path(manifest).absolute();output=Path(output).absolute()
    require(manifest==manifest.resolve() and manifest.name=='cover-manifest.json' and
            manifest.parent.parent==lane and manifest.parent.name not in ('','.','..'),'canonical direct-child manifest required')
    require(output==output.resolve() and output.name=='comparison.json' and
            output.parent==lane/(manifest.parent.name+'-outer') and output.parent.is_dir() and
            not output.exists() and not output.is_symlink(),'fresh sibling comparison output required')
    return manifest,output

@contextmanager
def captured_comparators(root,pure_bytes,helper_bytes):
    """Execute only the two exact captured generations, never cached modules."""
    require(sha(pure_bytes)==PURE_SHA and sha(helper_bytes)==HELPER_SHA,'captured comparator generation differs')
    package=ModuleType('_f6c_refinement_'+PURE_SHA+'_'+str(id(pure_bytes)));package.__path__=[]
    names={package.__name__:package};require(package.__name__ not in sys.modules,'private package collision')
    sys.modules.update(names)
    try:
        loaded=[]
        for suffix,path,raw in (('helper',HELPER,helper_bytes),('pure',PURE,pure_bytes)):
            name=package.__name__+'.'+suffix;module=ModuleType(name)
            module.__file__=str(root/path);module.__package__=package.__name__
            names[name]=module;sys.modules[name]=module
            exec(compile(raw,module.__file__,'exec',dont_inherit=True,optimize=sys.flags.optimize),module.__dict__)
            loaded.append(module)
        yield loaded[1],loaded[0]
    finally:
        for name,module in names.items():
            if sys.modules.get(name) is module:del sys.modules[name]

def original_mapping(helper,docs):
    """Original export and accepted premises, not producer-supplied projection."""
    export=docs['export']
    require(export['schema']=='braid-program/f6c-retained-history-export.v1' and export['fieldSpeed']=='1' and
            export['coupling']==COUPLING,'original export normalization differs')
    histories,cells,mapping=helper.validate_premises(export,docs['reconstruction'],docs['guards'])
    seq(histories,8);require(cells[0]==(F(0),F(1,1000)),'original reception cell differs')
    members=[]
    for i,h in enumerate(histories):
        integer(h['pathKey'],i+1,i+1);integer(h['polarity'],1 if i%2==0 else -1,1 if i%2==0 else -1)
        require(h['id']==IDS[i] and h['charge']==('' if i%2==0 else '-')+CHARGE,'original signed identity differs')
        digest,grid=original_history(h)
        require(digest==mapping[i]['historyDigest'],'independent original serialization differs')
        members.append(dict(mapping[i],charge=h['charge']))
    return histories,members

def restriction_records(pure_result):
    return [dict(receiverIndex=p.receiver_index,transmitterIndex=p.transmitter_index,
        receiverId=IDS[p.receiver_index],transmitterId=IDS[p.transmitter_index],
        lower=finite_time(p.lower),upper=finite_time(p.upper),lowerQueryIndex=p.lower_query_index,
        upperQueryIndex=p.upper_query_index) for p in pure_result.restrictions]

def finite_time(value):
    # Exact wrapper serialization only; comparison already owns midpoint proof.
    require(type(value) is F,'exact restriction Fraction required')
    n,d=abs(value.numerator),value.denominator;whole,left=divmod(n,d);digits=[]
    while left:
        digit,left=divmod(left*10,d);digits.append(str(digit))
        require(len(digits)<=34,'nonfinite restriction token')
    return ('-' if value<0 else '')+str(whole)+('.'+''.join(digits) if digits else '')

def compare_manifest(packet,plan,plan_binding,producer_binding,fixed,execution,docs,raw,pure,helper,progress=None):
    keys(packet,MANIFEST_KEYS)
    require(packet['schema']==MANIFEST_SCHEMA and packet['scope']==SCOPE and packet['status']=='conditional_complete' and
            packet['accepted'] is False,'manifest scope/status differs')
    expected=dict(launchPlan=plan_binding,producer=producer_binding,fixedBindings=fixed,
        subjectSourceBindings=plan['subjectSourceBindings'],executionBindings=execution,priorCoverClosure=plan['priorCoverClosure'],
        knotSha256=KNOT_SHA,precision=90,speedUpper='0.85',clearanceLower='0.27',algorithm=ALGORITHM,census=CENSUS)
    for key,value in expected.items():require(equal(packet[key],value),'manifest metadata differs: '+key)
    for key,endpoints in (('retainedDomain',(F(-8),F(13,100))),('receptionDomain',(F(0),F(1,1000))),
                          ('originalEmissionDomain',(F(-8),F(-1,20)))):
        require(interval(packet[key],root=True)==endpoints,'manifest domain differs')
    flags(packet['libraryFlags'],ROOT_FLAGS);flags(packet['claims'],CLAIMS)
    for role in ('queries','rows','pieces'):require(equal(binding(packet[role]),raw[role][0]),'original stream binding differs')
    authenticate_prior(docs,fixed)
    histories,members=original_mapping(helper,docs)
    require(equal(packet['members'],members),'original member mapping differs')
    queries=records(raw['queries'][1],3584);rows=records(raw['rows'][1],64);pieces=records(raw['pieces'][1],112)
    result=pure.compare_refinement(helper,histories,queries,rows,pieces,progress=progress)
    restrictions=restriction_records(result)
    require(equal(packet['restrictions'],restrictions),'manifest restrictions differ from independent replay')
    require(result.accepted is False and result.conditional_query_replay_conformant is True and
            result.conditional_final_cover_conformant is True,'complete conditional comparison required')
    return dict(accepted=False,conditionalQueryReplayConformant=True,conditionalFinalCoverConformant=True,
        queryCount=result.query_count,pairCount=result.pair_count,rowCount=result.row_count,
        ordinaryNonselfRows=result.ordinary_nonself_rows,selfExclusionRows=result.self_exclusion_rows,
        pieceRecordCount=result.piece_record_count,finalStrictFaceChecks=result.final_strict_face_checks,
        oldestBoundaryChecks=result.oldest_boundary_checks,recordedGeometryPieceVisits=result.geometry_piece_visits,
        restrictions=restrictions,claims=dict(result.claims))

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
    require(contract['verifierSha256']=='19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132' and
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
        with tempfile.NamedTemporaryFile(dir=self.path.parent,prefix='.emission-comparison-private-',delete=False) as out:
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
    for flag in ('manifest','manifest-sha256','plan','plan-sha256','verifier-sha256','out','budget-seconds'):
        parser.add_argument('--'+flag,required=True)
    parser.add_argument('--repo-root',default=str(Path(__file__).resolve().parents[2]))
    args=parser.parse_args(argv);began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began)
    root=Path(args.repo_root).resolve();manifest_path,output=validate_layout(root,args.manifest,args.out)
    publication=None;progress=dict(stage='capture',completedQueries=0,completedRows=0,accepted=False)
    def beat(*_):
        print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True)
        require(time.monotonic()<deadline,'comparison deadline')
        signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,max(.000001,deadline-time.monotonic())))
    def numerical_progress(queries,rows):
        progress.update(completedQueries=queries,completedRows=rows)
        require(time.monotonic()<deadline,'comparison deadline')
    previous=signal.signal(signal.SIGALRM,beat)
    signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,deadline-began))
    try:
        with ExitStack() as stack:
            owned=[];by_path={}
            def capture(path,digest,*,capture=False,limit=MAX_BYTES):
                path=Path(path).absolute()
                if path in by_path:
                    obj=by_path[path]
                    require(obj.expected==digest and (not capture or obj.data is not None),'conflicting capture generation')
                    return obj
                obj=stack.enter_context(BoundFile(path,digest,capture=capture,limit=limit))
                owned.append(obj);by_path[path]=obj;return obj
            own=capture(root/SELF,args.verifier_sha256,capture=True);executing_source(own.data)
            plan_file=capture(args.plan,args.plan_sha256,capture=True)
            plan=validate_plan(decode(plan_file.data),args.verifier_sha256)
            fixed_files={role:capture(root/path,h,capture=True) for role,path,h in FIXED}
            fixed={role:obj.binding() for role,obj in fixed_files.items()}
            # Capture execution references before any imports; no disk loader.
            pure_file=capture(root/PURE,PURE_SHA,capture=True)
            helper_file=capture(root/HELPER,HELPER_SHA,capture=True)
            source_bindings={}
            for key in SOURCE_PLAN_KEYS:
                b=plan[key];obj=capture(root/b['path'],b['sha256'])
                require(obj.initial.st_size==b['bytes'],'named source bytes differ')
                source_bindings[key]=obj.binding()
            for b in plan['subjectSourceBindings']:
                obj=capture(root/b['path'],b['sha256']);require(obj.initial.st_size==b['bytes'],'subject source bytes differ')
            runtime=set();execution=[]
            for group in ('runtimeBindings','operationalBindings'):
                for b in plan[group]:
                    obj=capture(root/b['path'],b['sha256'],limit=MAX_RUNTIME_BYTES)
                    require(obj.initial.st_size==b['bytes'],'execution binding bytes differ')
                    execution.append(obj.binding())
                    if group=='runtimeBindings':runtime.add(obj.path.resolve())
            project={obj.path.resolve() for obj in owned}
            with captured_comparators(root,pure_file.data,helper_file.data) as (pure,helper):
                require(runtime_paths()<=runtime|project,'loaded comparison runtime not declared')
                # A load can execute only captured bytes. Recheck disk as well,
                # rather than presenting that observation as executed identity.
                for obj in owned:obj.recheck()
                manifest=capture(manifest_path,args.manifest_sha256,capture=True);packet=decode(manifest.data)
                keys(packet,MANIFEST_KEYS);raw={}
                for role,count in (('queries',3584),('rows',64),('pieces',112)):
                    b=binding(packet[role]);path=manifest_path.parent/(role+'.ndjson')
                    require(b['path']==str(path),'raw file must be fixed manifest sibling')
                    obj=capture(path,b['sha256'],capture=True)
                    require(obj.initial.st_size==b['bytes'],'raw stream bytes differ')
                    raw[role]=(obj.binding(),obj.data)
                docs={k:decode(fixed_files[k].data,receipt=(k!='export')) for k in
                    ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
                progress['stage']='independent-original-mapping-query-replay-and-final-cover'
                analysis=compare_manifest(packet,plan,plan_file.binding(),source_bindings['producer'],fixed,execution,
                    docs,raw,pure,helper,progress=numerical_progress)
                require((progress['completedQueries'],progress['completedRows'])==(3584,64),'completion progress census differs')
                progress['stage']='final-source-rechecks'
                require(runtime_paths()<=runtime|project,'late comparison runtime not declared')
                for obj in owned:obj.recheck()
            report=dict(schema=REPORT_SCHEMA,scope=SCOPE,status='conditional-comparison-complete',accepted=True,
                authority='independent original-byte query replay and conditional final-cover containment only',
                manifest=manifest.binding(),queries=raw['queries'][0],rows=raw['rows'][0],pieces=raw['pieces'][0],
                launchPlan=plan_file.binding(),verifier=own.binding(),sourceBindings=source_bindings,
                fixedBindings=fixed,executionBindings=execution,subjectSourceBindings=plan['subjectSourceBindings'],
                priorCoverClosure=plan['priorCoverClosure'],analysis=analysis,candidateClaims={k:False for k in CLAIMS},
                publicationRequires=PUBLICATION_REQUIRES,elapsedSecondsBeforePublication=time.monotonic()-began)
            publication=Publication(output,deadline);result=publication.publish(report)
            emitted=capture(result['path'],result['sha256'])
            require(emitted.initial.st_size==result['bytes'],'published comparison bytes differ')
            for obj in owned:obj.recheck()
            require(runtime_paths()<=runtime|project,'publication runtime not declared')
            progress['stage']='input-cleanup'
        require(time.monotonic()<deadline,'post-input-cleanup deadline')
        # Keep the alarm live through the blocking stdout flush. A successful
        # fresh outer completion remains the independent whole-process witness.
        complete(dict(completed=True,accepted=True,scope=SCOPE,output=result,analysis=analysis,
            elapsedSeconds=time.monotonic()-began,h3EvidenceEligible=False,eomExecuted=False,
            externalInclusiveDeadlineAndProcessClosureRequired=True),deadline)
    except BaseException as exc:
        if publication is not None:publication.reject()
        progress.update(completedQueries=getattr(exc,'completed_queries',progress['completedQueries']),
                        completedRows=getattr(exc,'completed_rows',progress['completedRows']))
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(exc)[:4096],
            'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
    if time.monotonic()>=deadline:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':'post-watch-cleanup deadline',
            'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise ValueError('post-watch-cleanup deadline')

if __name__=='__main__':
    try:main()
    except BaseException as exc:
        if isinstance(exc,SystemExit):raise
        sys.exit(1)
