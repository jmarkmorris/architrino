#!/usr/bin/env python3
"""Source-bound preparation of one plan-selected ORIGINAL parent; no acceptance.

The separately reviewed plan fixes every source and the versioned acceptance
owner before capture. Historical full-cover membership is checked independently
of the new runtime inventory. No cell-zero receipt supplies parent membership.
The frozen pure proposer alone performs the new numerical work; its independent
comparison and original root reference are bound bytes, never imported here.

Queries are acknowledged only after write, flush AND fsync. A failed sink may
have written an unacknowledged record; that pending record is reported separately
from the proposer's acknowledged prefix. Private attempts survive rejection.
Four public files are linked exclusively, manifest last, and retracted only if
still owned when any late source/runtime/publication/cleanup check fails.

This CLI has a supplementary local remaining-duration guard. Only the separately
reviewed outer supervisor can establish whole-attempt resource/process closure.
All fifteen scientific-authority flags remain false, including on failure.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack, contextmanager
from decimal import Decimal
from fractions import Fraction as F
import hashlib
import json
import math
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
from types import MappingProxyType, ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/prepare-f6c-parent-emission-refinement.py'
CONTROLS = 'tests/test_f6c_parent_emission_refinement_preparation.py'
PREFIX = 'reference/priorities/braid-program/evidence/'
LANE = '.local-data/braid-analysis/f6c-parent-emission-refinement-20260827'
OWNER = PREFIX+'2026-08-27-braid-search-launch-readiness.md'
PLAN_SCHEMA = 'braid-program/f6c-parent-emission-refinement-launch.v1'
SCHEMA = 'braid-program/f6c-parent-emission-refinement-cover.v1'
PARENT_SCHEMA = 'braid-program/f6c-original-parent-refinement-input.v1'
MAX_BYTES = 64*1024**2
MAX_SOURCE_BYTES = 1024**3
MAX_LINE = 131072
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
NAMED = {
 'declaration': (PREFIX+'2026-08-27-f6c-parent-emission-refinement-reference.md','652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733'),
 'producer': (SELF,None), 'producerControls': (CONTROLS,None),
 'proposalReference': ('scripts/eom/f6c_parent_emission_refinement.py','1517575f3df783af36d2bf2b758d19427e8ec85247efec892783716c263b7c27'),
 'proposalReferenceControls': ('tests/test_f6c_parent_emission_refinement.py','f1650b5e73a06ecd7ed05bff10ba97949b42aa5330e84fb3514c2f868eff0fc2'),
 'verifier': ('scripts/eom/verify-f6c-parent-emission-refinement.py',None),
 'verifierControls': ('tests/test_f6c_parent_emission_refinement_verification.py',None),
 'comparisonReference': ('scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py','ffe91ad7cbfe4e41bf92203fe73b4195e0ad1437176dace9d12751e68aa2cbec'),
 'comparisonReferenceControls': ('tests/test_f6c_parent_emission_refinement_conformance.py','18c21d6e84d0d6ae7e3b4ea35861a75b38d362d8aad1e0cc14715cea167a5a04'),
}
DEPENDENCIES = {
 'transport': ('scripts/eom/verify-f6c-refined-acceleration.py','3f49831a2e63d2526125c1585c1250330079fa423986ec1b36901bb3cecde6ae'),
 'transportControls': ('tests/test_f6c_refined_acceleration.py','4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a'),
 'scientificDecoder': ('scripts/eom/oracle/f6c_refined_acceleration_conformance.py','63db48f604d0b1abdf61f0efcb3894feac9d30a25af26a4d96f01bda6522e2a2'),
 'scientificDecoderControls': ('tests/test_f6c_refined_acceleration_conformance.py','3fb6eabd03a56b982f2601f11b535c60208f03df519e41ea29d4ba018a0e531e'),
 'productionHelper': ('scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386'),
 'productionHelperControls': ('tests/test_f6c_cached_continuous_reception_root_cover_preparation.py','9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427'),
 'historyReference': ('scripts/eom/oracle/certified_history.py','ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
 'decimalReference': ('scripts/eom/oracle/decimal_interval.py','fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
 'decimalControls': ('tests/test_eom_decimal_interval.py','22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44'),
 'rootLibrary': ('scripts/eom/oracle/continuous_reception_roots_cached.py','daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
 'rootControls': ('tests/test_eom_continuous_reception_roots_cached.py','a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb'),
 'independentRootReference': ('scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132'),
 'independentRootControls': ('tests/test_f6c_cached_continuous_reception_root_cover.py','2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117'),
 'cacheEquivalence': (PREFIX+'2026-08-27-f6c-call-local-state-cache-equivalence.md','798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3'),
}
FULL_BASE = '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/'
FULL = {
 'fullRows': (FULL_BASE+'subject/rows.ndjson','28491edb2f1faec7adf248f535d29a1600b8bd69f5a46706fd26dbb3eb848b5c',22585784),
 'fullPieces': (FULL_BASE+'subject/pieces.ndjson','b3a2ddf2c8cd5b586ef7b374eee94afc395f63496c849ec574e71bf1f487a9ab',7505144),
 'fullManifest': (FULL_BASE+'subject/cover-manifest.json','61b0cdfad85696a0b5ead7df838119c9005a28656e9ac3daa26df139054410e2',42922),
 'fullComparison': (FULL_BASE+'comparison.json','1c423aece2009a2d7d0852e9558c16464c640abbc5bea3743211af3805b6eed2',43377),
 'fullAdmission': (FULL_BASE+'full-admission.json','8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f',332567),
 'fullLauncherLog': (FULL_BASE+'launcher-stderr.log','b976d8deb556d8faba5a3aff73a09b77ec26c6da84e42726167eec4ec7a43314',30969),
 'fullResourceLog': (FULL_BASE+'resource-observations.ndjson','66eb0cfa1811d0a834d18d3bd8e749a941e1964f7276898b80a4e12136d69d03',1710278),
 'fullPlan': (PREFIX+'2026-08-27-f6c-cached-root-cover-full-launch.v1.json','5dd7e27084a2e8e5b2c3ed8daf8cf66248a437108710ce91281977e728197ddc',45282),
}
ORIGINAL = {
 'export': ('.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json','f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1'),
 'reconstruction': ('.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json','7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43'),
 'guards': ('.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json','86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880'),
 'fullEntry': ('scripts/eom/run-f6c-cached-root-cover-full.mjs','1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b'),
 **FULL,
}
PLAN_KEYS = ('schema','scope','parentIndex',*NAMED,'dependencies','originalBindings','acceptanceOwner',
             'priorCoverClosure','runtimeBindings','operationalBindings','limits')
MANIFEST_KEYS = tuple('schema scope status accepted launchPlan producer verifier declaration parent members originalBindings acceptanceOwner priorCoverClosure historicalSourceBindings subjectSourceBindings runtimeBindings operationalBindings algorithm restrictions census helperCalls queries rows pieces libraryFlags claims publicationRequires'.split())
COMPLETION_KEYS = tuple('completed accepted scope parentIndex outputs census helperCalls elapsedSeconds processUserSeconds processSystemSeconds maximumIndividualProcessResidentBytes independentComparisonRequired externalInclusiveDeadlineAndProcessClosureRequired claims'.split())
HISTORY_KEYS = tuple('id pathKey polarity charge historyFingerprint coverageStart coverageEnd segments'.split())
SEGMENT_KEYS = tuple('startTime endTime coefficients positionErrors velocityErrors positionError velocityError'.split())
ROW_KEYS = frozenset('rowIndex cellIndex receiverIndex transmitterIndex receiverId transmitterId reception emission ordinaryRootsPerReception coincidentEndpointExcluded oldestResidual lowerFaceResidual upperFaceResidual displacement distance transmitterFactor receiverFactor receiverPieceRecord transmitterPieceRecord rootFreeComplementConditional retainedBoundaryContact libraryFlags'.split())
PIECE_KEYS = frozenset('recordIndex rowIndex role memberId historyDigest requestedInterval touchedPieceCount firstIndex lastIndex contiguousIndexRange clippedPiecesSha256'.split())
QUERY_KEYS = frozenset('queryIndex receiverIndex transmitterIndex receiverId transmitterId side ordinal exploratory midpoint residual decision retainedFace'.split())
CLAIMS = dict.fromkeys(('accepted','referenceGenerationAuthenticated','originalSourceAuthenticated','original1760PieceCensusAuthenticated','premiseTruthAuthenticated','subjectMembershipEstablished','historicalTrajectoryIdentityEstablished','executionAuthorized','eomExecuted','h3EvidenceEligible','metricsAvailable','scoreAuthorized','equilibriumEstablished','retentionEstablished','physicalRealizationEstablished'),False)
LIBRARY_FLAGS = dict.fromkeys(('premise_truth_authenticated','subject_membership_established','execution_authorized','metrics_available','h3_evidence_eligible'),False)
CENSUS = dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
CALLS = dict(build=1,queries=3584,cover=1)
ALGORITHM = dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,upperSearchRestartsFromOriginal=True,receptionSubdivision=False,automaticRetry=False)
PUBLICATION_REQUIRES = 'fresh successful completion, independent parent refinement comparison, external inclusive deadline and closed owned processes'
HEX = re.compile(r'[a-f0-9]{64}\Z')
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')


def require(condition, message):
    if not condition: raise ValueError(message)


def closed(value, names):
    require(type(value) is dict and set(value) == set(names), 'closed record fields')


def equal(a, b):
    if type(a) is not type(b): return False
    if type(a) is dict: return a.keys() == b.keys() and all(equal(a[k],b[k]) for k in a)
    if type(a) in (tuple,list): return len(a) == len(b) and all(equal(x,y) for x,y in zip(a,b))
    return a == b


def plain(value):
    if type(value) in (dict,MappingProxyType): return {k:plain(v) for k,v in value.items()}
    if type(value) in (list,tuple): return [plain(v) for v in value]
    return value


def sha(raw): return hashlib.sha256(raw).hexdigest()
def encoded(value): return json.dumps(value,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii')+b'\n'
def index(value, expected): require(type(value) is int and value == expected,'exact index/census')


def parent_scope(parent_index):
    require(type(parent_index) is int and 0<=parent_index<160,'bounded original parent index')
    return f'original-parent-{parent_index}-emission-refinement'


def number(token):
    require(type(token) is str and 0<len(token)<=1100 and TOKEN.fullmatch(token),'bounded decimal token')
    value=Decimal(token)
    require(value.is_finite() and len(value.as_tuple().digits)<=1024 and abs(value.as_tuple().exponent)<=1000,'decimal operand limit')
    return F(value)


def interval(raw):
    closed(raw,('lower','upper','precision'));index(raw['precision'],90)
    lo,hi=number(raw['lower']),number(raw['upper']);require(lo<=hi,'reversed interval');return lo,hi


def snapshot(value, *, max_nodes=1000000):
    """Detach exact inert transport trees; no user conversion hooks/callbacks."""
    count=0; size=0
    def visit(v,depth):
        nonlocal count,size
        count+=1;require(count<=max_nodes and depth<=24,'snapshot structure bound')
        t=type(v)
        if t is dict:
            require(len(v)<=10000 and all(type(k) is str and len(k)<=4096 for k in v),'snapshot keys')
            return {k:visit(x,depth+1) for k,x in v.items()}
        if t in (list,tuple):
            require(len(v)<=20000,'snapshot sequence');return [visit(x,depth+1) for x in v]
        require(v is None or t in (str,bool,int),'inert scientific snapshot')
        if t is str: size+=len(v.encode('utf-8'));require(len(v)<=8192 and size<=MAX_BYTES,'snapshot string bound')
        if t is int: require(abs(v)<=2**53-1,'snapshot integer bound')
        return v
    return visit(value,0)


def binding(raw, root=None):
    closed(raw,('path','sha256','bytes'))
    path=raw['path'];require(type(path) is str and 0<len(path)<=2048 and '\0' not in path,'binding path')
    p=Path(path);require(str(p)==path and '..' not in p.parts,'canonical binding spelling')
    require(type(raw['sha256']) is str and HEX.fullmatch(raw['sha256']),'binding digest')
    require(type(raw['bytes']) is int and 0<raw['bytes']<=MAX_SOURCE_BYTES,'binding bytes')
    if root is not None:
        p=root/p;require(p.is_absolute() and p==p.resolve(),'canonical bound path');path=str(p)
    return dict(path=path,sha256=raw['sha256'],bytes=raw['bytes'])


def binding_list(values, root, count=None):
    require(type(values) is list and 0<len(values)<=512 and (count is None or len(values)==count),'binding list census')
    result=[binding(v,root) for v in values]
    require(len({v['path'] for v in result})==len(result),'duplicate canonical binding');return result


def closure_premise():
    return dict(authority='versioned-acceptance-owner-declaration-not-fresh-observation',originalCallerSession='13512',
        finalCompletionChunk='c21aa7',exitCode=0,elapsedSeconds='862.951823625',processesClosed=True,independentAuditAccepted=True)


def validate_plan(plan, own_sha, root, transport):
    closed(plan,PLAN_KEYS);require(plan['schema']==PLAN_SCHEMA and plan['scope']==parent_scope(plan['parentIndex']),'plan scope')
    require(equal(plan['limits'],transport.LIMITS),'unchanged limits');require(equal(plan['priorCoverClosure'],closure_premise()),'full external closure premise')
    closed(plan['dependencies'],DEPENDENCIES);closed(plan['originalBindings'],ORIGINAL)
    for mapping,spec in ((plan,NAMED),(plan['dependencies'],DEPENDENCIES),(plan['originalBindings'],ORIGINAL)):
        for role,(path,digest,*sizes) in spec.items():
            b=binding(mapping[role],root)
            require(b['path']==str(root/path) and (digest is None or b['sha256']==digest),'fixed binding: '+role)
            if sizes: index(b['bytes'],sizes[0])
    require(plan['producer']['sha256']==own_sha,'executing producer generation')
    owner=binding(plan['acceptanceOwner'],root);require(owner['path']==str(root/OWNER),'acceptance-owner path')
    # No automatic acceptance of the current owner's bytes; only the plan SHA.
    subjects=[binding(plan[k],root) for k in NAMED]+[binding(plan['dependencies'][k],root) for k in DEPENDENCIES]
    runtime=binding_list(plan['runtimeBindings'],root);ops=binding_list(plan['operationalBindings'],root)
    new=subjects+runtime+ops
    require(len({b['path'] for b in new})==len(new),'duplicate new execution source')
    originals=[binding(v,root) for v in plan['originalBindings'].values()]+[owner]
    require(len({b['path'] for b in originals})==len(originals),'duplicate original role')
    return subjects,runtime,ops


def canonical_plan(plan,root):
    result=dict(plan)
    for key in NAMED:result[key]=binding(plan[key],root)
    for key in ('dependencies','originalBindings'):result[key]={k:binding(v,root) for k,v in plan[key].items()}
    result['acceptanceOwner']=binding(plan['acceptanceOwner'],root)
    for key in ('runtimeBindings','operationalBindings'):result[key]=binding_list(plan[key],root)
    return result


@contextmanager
def module_from_bytes(raw, path):
    name='_parent_preparation_'+sha(raw)[:20]+'_'+str(id(raw))
    require(name not in sys.modules,'private module collision')
    module=ModuleType(name);module.__file__=str(path);sys.modules[name]=module
    try:
        exec(compile(raw,str(path),'exec',dont_inherit=True,optimize=sys.flags.optimize),module.__dict__)
        yield module
    finally: sys.modules.pop(name,None)


@contextmanager
def bootstrap(path,digest,live):
    """Only bootstrap duplication: bounded same-FD capture before transport."""
    require(path.is_absolute() and path==path.resolve(),'bootstrap canonical path');live()
    fd=os.open(path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
    identity=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
    try:
        original=os.fstat(fd);require(stat.S_ISREG(original.st_mode) and 0<original.st_size<=MAX_BYTES,'bootstrap regular bound')
        def scan():
            os.lseek(fd,0,os.SEEK_SET);parts=[];n=0
            while n<original.st_size:
                live();part=os.read(fd,min(65536,original.st_size-n));require(part,'bootstrap truncation');parts.append(part);n+=len(part)
            require(not os.read(fd,1),'bootstrap growth')
            require(identity(os.fstat(fd))==identity(original) and path==path.resolve() and identity(os.stat(path,follow_symlinks=False))==identity(original),'bootstrap replacement')
            raw=b''.join(parts);require(sha(raw)==digest,'bootstrap hash');return raw
        raw=scan()
        try: yield raw
        finally: scan();live()
    finally: os.close(fd)


class CapturePool:
    def __init__(self,stack,transport,root,live): self.stack,self.w,self.root,self.live=stack,transport,root,live;self.files={}
    def capture(self,raw,*,data=False,limit=MAX_SOURCE_BYTES):
        b=binding(raw,self.root);path=b['path'];require(b['bytes']<=limit,'capture role size')
        if path not in self.files:
            f=self.stack.enter_context(self.w.BoundFile(path,b['sha256'],capture=data,limit=limit,live=self.live));self.files[path]=f
            require(f.initial.st_size==b['bytes'],'captured byte count')
        f=self.files[path];require(f.digest==b['sha256'] and f.initial.st_size==b['bytes'],'conflicting captured generation')
        if data and f.data is None:
            # Same descriptor, same initial length and final EOF; never read to
            # an uncontrolled moving EOF during a metadata-to-data upgrade.
            f.data,digest=f.scan(True);require(digest==f.digest,'upgrade hash');f.check_path()
        return f
    def read_binding(self,b,*,capture=False):
        f=self.capture(b,data=capture,limit=MAX_BYTES if capture else MAX_SOURCE_BYTES)
        return f.data if capture else f.binding()
    def recheck(self):
        for f in self.files.values(): f.recheck()
        self.live()
    def identities(self):
        return [(self.files[path].binding(),self.w.BoundFile.identity(self.files[path].initial)) for path in sorted(self.files)]


def final_recapture(transport, identities, live):
    """Recheck the ORIGINAL source generations after private cleanup.

    Reopening with the expected hash alone would accept a byte-identical path
    replacement. Preserve all five initial identity fields as well. The final
    bounded regular descriptors stay open together through the recheck, then
    close before completion; no source or execution authority is inferred.
    """
    require(type(identities) is list and 0<len(identities)<=512,'final source census')
    require(len({b['path'] for b,_ in identities})==len(identities),'final duplicate source')
    with ExitStack() as stack:
        files=[]
        for original,identity in identities:
            live();b=binding(original)
            f=stack.enter_context(transport.BoundFile(b['path'],b['sha256'],capture=False,limit=b['bytes'],live=live))
            require(transport.BoundFile.identity(f.initial)==identity and f.initial.st_size==b['bytes'],'post-cleanup original source identity changed')
            files.append(f)
        for f in files:f.recheck()
        live()


def entry_pins(raw):
    text=raw.decode('utf-8',errors='strict')
    require(text.count('export const PINS = Object.freeze({')==1,'full entry pins block')
    block=text.split('export const PINS = Object.freeze({',1)[1].split('\n});',1)[0];result={}
    for line in block.splitlines():
        if not line.strip(): continue
        match=re.fullmatch(r'\s*(?:"([^"]+)"|\[([A-Z_]+)\]): "([a-f0-9]{64})",',line)
        require(match is not None,'frozen entry pin syntax');path,name,digest=match.groups()
        if name:
            matches=re.findall(r'export const '+re.escape(name)+r' = "([^"]+)";',text)
            require(len(matches)==1,'entry pin constant');path=matches[0]
        require(path not in result,'duplicate entry pin');result[path]=digest
    require(len(result)==35,'full entry35 pins');return result


def owner_declaration(raw):
    require(type(raw) is bytes and 0<len(raw)<=MAX_BYTES,'owner byte limit')
    text=raw.decode('utf-8',errors='strict');heading='### Independently Accepted Actual Full F6c Conditional Cover\n'
    require(text.count(heading)==1,'unique full owner section');section=text.split(heading,1)[1].split('\n### ',1)[0]
    for token in ('original caller session `13512`','final completion chunk `c21aa7`','exit zero','`862.951823625`',
                  'Independent post-closure review accepts all 160',FULL_BASE):
        require(token in section,'full owner declaration identity')
    for role,(_,digest,size) in FULL.items():
        if role!='fullPlan': require(digest in section and str(size) in section,'full owner output identity')
    return closure_premise()


def authenticate_full_chain(w,docs,files,pool,owner_raw):
    """Metadata-only predecessor verification. Never replay old geometry."""
    owner_declaration(owner_raw)
    p,m,c,a=(docs[k] for k in ('fullPlan','fullManifest','fullComparison','fullAdmission'))
    closed(p,('schema','scope','resourcePlan','comparisonContract','operationalBindings','controlBindings','python','pythonRealPath','git','node'))
    require(p['schema']=='braid-program/f6c-cached-root-cover-full-launch.v1' and p['scope']=='full','original full plan scope')
    contract=p['comparisonContract'];closed(contract,('declarationSha256','verifierSha256','scope','subjectSourceBindings','runtimeBindings'))
    require(contract['scope']=='full' and contract['verifierSha256']==DEPENDENCIES['independentRootReference'][1]
        and contract['declarationSha256']=='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4','original full comparison contract')
    # Obtain original sizes from bound plan/admission only after deriving the
    # independent path/hash set from the captured entry; not receipt labels.
    claimed=binding_list(a['sourceBindings'],pool.root,198);claimed_map={b['path']:b for b in claimed}
    expected=[]
    for path,digest in entry_pins(files['fullEntry'].data).items():
        absolute=str(pool.root/path);require(absolute in claimed_map and claimed_map[absolute]['sha256']==digest,'entry source missing')
        expected.append(pool.capture(claimed_map[absolute]).binding())
    for group,n in ((contract['subjectSourceBindings'],4),(contract['runtimeBindings'],158),(p['operationalBindings'],6),(p['controlBindings'],2)):
        for b in binding_list(group,pool.root,n): expected.append(pool.capture(b).binding())
    expected.extend((pool.capture(p['resourcePlan']).binding(),files['fullPlan'].binding()))
    unique={}
    for b in expected:
        require(b['path'] not in unique or equal(unique[b['path']],b),'conflicting historical source');unique[b['path']]=b
    require(len(unique)==198 and equal(unique,claimed_map),'independently derived full198 source chain')
    require(m['scope']=='full' and m['status']=='conditional_complete' and m['accepted'] is False,'original full manifest')
    require(c['schema']=='braid-program/f6c-continuous-reception-root-cover-conformance.v1' and c['scope']=='full' and c['accepted'] is True,'full comparison disposition')
    require(a['schema']=='braid-program/f6c-cached-root-cover-full-admission.v1' and a['scope']=='full' and a['accepted'] is True and a['processesClosed'] is True,'full admission disposition')
    t=a['elapsedSecondsBeforePublication'];require(type(t) in (int,Decimal) and 0<=F(t)<F('862.951823625'),'prepublication is not final elapsed')
    for name in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'):
        require(a[name] is False,'historical authority promotion')
    require(equal(c['claims'],dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
        historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)),'original comparison claims')
    analysis=c['analysis'];require(analysis['accepted'] is False and analysis['conditionalEnclosuresConformant'] is True,'full conditional comparison')
    for k,n in dict(cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,selfExclusionRows=1280,
        distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800).items(): index(analysis[k],n)
    for obj,key,role in ((m,'rows','fullRows'),(m,'pieces','fullPieces'),(m,'launchPlan','fullPlan'),(c,'rows','fullRows'),
        (c,'pieces','fullPieces'),(c,'manifest','fullManifest'),(c,'launchPlan','fullPlan'),(a,'plan','fullPlan')):
        require(equal(binding(obj[key],pool.root),files[role].binding()),'full file chain differs')
    for key in ('subjectSourceBindings','runtimeBindings'): require(equal(m[key],contract[key]),'full manifest execution bindings')
    require(type(a['stages']) is list and len(a['stages'])==2,'full stages census')
    for item,stage in zip(a['stages'],('consumer','comparison')):
        proc,ad=item['process'],item['admission'];done=ad['completion']
        require(item['stage']==stage and proc['accepted'] is True and proc['processesClosed'] is True
            and equal(proc['exit'],dict(code=0,signal=None)) and ad['accepted'] is True and equal(proc['admission'],ad),'full stage closed')
        require(type(proc['gates']) is list and len(proc['gates'])==1,'full gate census');gate=proc['gates'][0]
        require(gate['retired'] is True and gate['acknowledged'] is True and equal(gate['measurement']['code'],0)
            and gate['measurement']['signal'] is None,'full gate retirement')
        require(done['completed'] is True and done['accepted'] is (stage=='comparison') and done['h3EvidenceEligible'] is False,'full completion disposition')
        require(equal(proc['stdoutLog'],ad['completionLog']),'full completion log binding')
        raw=pool.read_binding(proc['stdoutLog'],capture=True);pool.read_binding(proc['stderrLog'])
        require(raw.endswith(b'\n') and len(raw.splitlines())==1 and equal(w.decode_operational(raw),done),'fresh stage completion line')
        outputs=[files[k].binding() for k in ('fullRows','fullPieces','fullManifest')] if stage=='consumer' else [files['fullComparison'].binding()]
        require(equal(ad['outputs'],outputs) and equal(done['outputs'] if stage=='consumer' else [done['output']],outputs),'full completed outputs')
    def lines(raw):
        require(raw.endswith(b'\n'),'full observation EOF');parts=raw.split(b'\n')[:-1]
        require(0<len(parts)<=10000 and all(0<len(x)<=MAX_LINE for x in parts),'full observation bounds')
        return [w.decode_operational(x) for x in parts]
    hosts=[x for x in lines(files['fullLauncherLog'].data) if x.get('kind')=='host-resource']
    rss=lines(files['fullResourceLog'].data)
    require(len(hosts)==62 and len(rss)==3447,'final full observation census')
    require(equal(hosts[:len(a['hostObservationsBeforePublication'])],a['hostObservationsBeforePublication']),'full host prefix')
    for j,row in enumerate(rss):
        require(row['kind']=='aggregate-rss' and type(row['elapsedSeconds']) in (int,Decimal)
            and 0<=F(row['elapsedSeconds'])<F('862.951823625') and (j==0 or F(rss[j-1]['elapsedSeconds'])<=F(row['elapsedSeconds'])),'full RSS ordering')
        require(type(row['aggregateResidentBytes']) is int and 0<=row['aggregateResidentBytes']<=2*1024**3
            and type(row['sampleGapMs']) in (int,Decimal) and 0<=F(row['sampleGapMs'])<=1000,'full resource limits')
    prefix=a['observationsBeforePublication'];index(prefix['samples'],3444)
    require(max(x['aggregateResidentBytes'] for x in rss[:3444])==prefix['maximumSampledRSSBytes'],'full prepublication prefix')
    return [unique[k] for k in sorted(unique)]


def history_digest(history):
    """Legacy compact serialization identity only, not full generation."""
    tokens=[history['id']]
    for s in history['segments']:
        fields=[s['startTime'],s['endTime'],*[x for axis in s['coefficients'] for x in axis],s['positionError'],s['velocityError']]
        tokens.extend(str(Decimal(t)) for t in fields);tokens.append('90')
    return sha('\n'.join(tokens).encode())


def closed_coverage(history, requested):
    lo,hi=interval(requested);parts=[]
    for k,s in enumerate(history['segments']):
        a,b=number(s['startTime']),number(s['endTime'])
        if a<=hi and lo<=b: parts.append((k,max(a,lo),min(b,hi)))
    require(parts and parts[0][1]==lo and parts[-1][2]==hi,'complete original closed coverage')
    require(all(parts[n][0]==parts[n-1][0]+1 and parts[n-1][2]==parts[n][1] for n in range(1,len(parts))),'coverage hole')
    digest=sha(''.join(f'{k}\t{a}\t{b}\n' for k,a,b in parts).encode('ascii'))
    return len(parts),parts[0][0],parts[-1][0],digest


def project_original_parent(export, full_rows, full_pieces, full_manifest_binding, *, parent_index):
    """Detached metadata projection, conditional on separately authenticated files.

    Checks the COMPLETE original global row/piece identities before extracting
    parent one. Recomputes only original-token digests and closed coverage, never
    polynomial state, face signs, roots or geometry. Returned built-in trees are
    detached; the frozen proposer performs its own immutable input snapshot.
    """
    require(type(export) is dict and export.get('schema')=='braid-program/f6c-retained-history-export.v1'
        and export.get('fieldSpeed')=='1','original export schema')
    parent_scope(parent_index)
    original=export['retainedHistories'];require(type(original) is list and len(original)==8,'eight original histories')
    histories=[];union=None
    for i,h in enumerate(original):
        require(type(h) is dict and set(HISTORY_KEYS)<=set(h),'original history fields')
        require(type(h['segments']) is list and len(h['segments'])==1760,'original segment array')
        require(all(type(s) is dict and set(SEGMENT_KEYS)<=set(s) for s in h['segments']),'original segment fields')
        selected={k:h[k] for k in HISTORY_KEYS};selected['segments']=[{k:s[k] for k in SEGMENT_KEYS} for s in h['segments']]
        history=snapshot(selected);histories.append(history)
        index(history['pathKey'],i+1);index(history['polarity'],1 if i%2==0 else -1)
        require(history['id']==IDS[i] and history['charge']==('' if i%2==0 else '-')+'0.1666666666666666666666666666666667','history identity/charge')
        require(type(history['historyFingerprint']) is str and 0<len(history['historyFingerprint'])<=256,'history fingerprint')
        require(history['coverageStart']=='-8' and history['coverageEnd']=='0.13' and len(history['segments'])==1760,'original1760 domain')
        cursor=F(-8);future=set()
        for k,s in enumerate(history['segments']):
            a,b=number(s['startTime']),number(s['endTime']);require(cursor==a<b<=F('0.13'),'original gap/overlap');cursor=b
            require((b<=0) if k<1600 else (a>=0),'original prehistory/future split')
            if k>=1600: future.update((a,b))
            require(type(s['coefficients']) is list and len(s['coefficients'])==3,'three coefficient axes')
            for axis in s['coefficients']:
                require(type(axis) is list and len(axis)==4,'four coefficient tokens')
                for t in axis: number(t)
            for name in ('position','velocity'):
                values=s[name+'Errors'];radius=number(s[name+'Error'])
                require(type(values) is list and len(values)==3 and all(0<=number(t)<=radius for t in values),'axis/scalar allowance')
        require(cursor==F('0.13'),'complete original suffix')
        grid=sorted(future)
        if union is None: union=grid
        require(union==grid and len(grid)==161,'common original160 cells')
    require(type(export['acceptedFrames']) is list and len(export['acceptedFrames'])==81,'81 original frames')
    require(all(type(f) is dict and 'time' in f for f in export['acceptedFrames']),'original frame records')
    frame_tokens=[f['time'] for f in export['acceptedFrames']]
    require([number(t) for t in frame_tokens]==union[::2],'original accepted frame grid')
    require(type(full_rows) is list and len(full_rows)==10240 and type(full_pieces) is list and len(full_pieces)==17920,'full original global census')
    # Snapshot per bounded record, not an unbounded aggregate object walk.
    rows=[snapshot(r,max_nodes=10000) for r in full_rows];pieces=[snapshot(p,max_nodes=10000) for p in full_pieces]
    emissions=[];reception=None;piece_index=0;digests=[history_digest(h) for h in histories];clips={}
    for n,row in enumerate(rows):
        closed(row,ROW_KEYS);cell,local=divmod(n,64);i,j=divmod(local,8)
        for key,v in (('rowIndex',n),('cellIndex',cell),('receiverIndex',i),('transmitterIndex',j)): index(row[key],v)
        require(row['receiverId']==IDS[i] and row['transmitterId']==IDS[j],'original global member order')
        require(interval(row['reception'])==(union[cell],union[cell+1]),'original global reception')
        require(equal(row['reception'],rows[64*cell]['reception']),'original reception token identity')
        require(equal(row['libraryFlags'],LIBRARY_FLAGS) and row['rootFreeComplementConditional'] is True
            and row['retainedBoundaryContact'] is False,'original root flags')
        if i==j:
            index(row['ordinaryRootsPerReception'],0);require(row['coincidentEndpointExcluded'] is True,'original self exclusion')
            require(all(row[k] is None for k in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance',
                'transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')),'original self fields must be absent')
            continue
        index(row['ordinaryRootsPerReception'],1);require(row['coincidentEndpointExcluded'] is False,'original ordinary root')
        require(interval(row['emission'])==(F(-8),union[cell]-F(1,20)),'original per-pair emission')
        for key in ('oldestResidual','lowerFaceResidual','upperFaceResidual','distance','transmitterFactor','receiverFactor'): interval(row[key])
        require(type(row['displacement']) is list and len(row['displacement'])==3,'original displacement shape')
        for axis in row['displacement']: interval(axis)
        if cell==parent_index:
            require(interval(row['oldestResidual'])[1]<0 and interval(row['lowerFaceResidual'])[1]<0
                and interval(row['upperFaceResidual'])[0]>0 and interval(row['distance'])[0]>0
                and interval(row['transmitterFactor'])[0]>=F('1e-24') and interval(row['receiverFactor'])[0]>0,'parent original certified bounds')
            require(equal(row['oldestResidual'],row['lowerFaceResidual']),'original oldest/lower identity')
            reception=row['reception']
            emissions.append(dict(receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],emission=row['emission']))
        for role,member,requested in (('receiver',i,row['reception']),('transmitter',j,row['emission'])):
            index(row[role+'PieceRecord'],piece_index);piece=pieces[piece_index];closed(piece,PIECE_KEYS)
            index(piece['recordIndex'],piece_index);index(piece['rowIndex'],n)
            require(piece['role']==role and piece['memberId']==IDS[member] and equal(piece['requestedInterval'],requested),'original global piece identity')
            require(piece['historyDigest']==digests[member],'original compact history digest')
            if cell==parent_index:
                key=member,*interval(requested)
                if key not in clips: clips[key]=closed_coverage(histories[member],requested)
                count,first,last,digest=clips[key]
                for field,v in (('touchedPieceCount',count),('firstIndex',first),('lastIndex',last)): index(piece[field],v)
                require(equal(piece['contiguousIndexRange'],[first,last]) and piece['clippedPiecesSha256']==digest,'parent closed-piece membership')
            else:
                require(type(piece['firstIndex']) is int and type(piece['lastIndex']) is int and 0<=piece['firstIndex']<=piece['lastIndex']<1760,'original piece index range')
                index(piece['touchedPieceCount'],piece['lastIndex']-piece['firstIndex']+1)
                require(equal(piece['contiguousIndexRange'],[piece['firstIndex'],piece['lastIndex']]) and type(piece['clippedPiecesSha256']) is str
                    and HEX.fullmatch(piece['clippedPiecesSha256']),'original piece structure')
            piece_index+=1
    require(piece_index==17920 and len(emissions)==56,'complete global EOF and parent census')
    frame_index=parent_index//2
    require(interval(reception)==(union[parent_index],union[parent_index+1]),'selected original reception')
    for history in histories:
        segment=history['segments'][1600+parent_index]
        require(equal(reception,dict(lower=segment['startTime'],upper=segment['endTime'],precision=90)),'selected original reception lexemes')
        require(all(not union[parent_index]<number(s[k])<union[parent_index+1] for s in history['segments'] for k in ('startTime','endTime')),'interior reception knot outside production scope')
    cover=binding(snapshot(full_manifest_binding));require(cover['bytes']<=MAX_BYTES,'scientific cover binding limit')
    generation=sha(json.dumps(histories,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii'))
    parent=dict(schema=PARENT_SCHEMA,parentIndex=parent_index,frameIndex=frame_index,frame=dict(lower=frame_tokens[frame_index],upper=frame_tokens[frame_index+1],precision=90),
        reception=reception,originalEmissions=emissions,oldestTime='-8',historyGenerationSha256=generation,originalCoverBinding=cover)
    return histories,parent


class DurableStream:
    def __init__(self,path,expected_keys,limit,aggregate):
        self.path=path;self.keys=expected_keys;self.limit=limit;self.aggregate=aggregate;self.count=0;self.bytes=0
        self.file=path.open('xb',buffering=0)
    def write(self,record):
        value=plain(record);closed(value,self.keys);raw=encoded(value)
        require(0<len(raw)<=MAX_LINE and self.bytes+len(raw)<=self.limit and self.aggregate[0]+len(raw)<=MAX_BYTES,'output stream quota')
        n=self.file.write(raw);require(n==len(raw),'short stream write');self.file.flush();os.fsync(self.file.fileno())
        self.bytes+=n;self.aggregate[0]+=n;self.count+=1
    def close(self):
        if self.file is not None:
            f=self.file;self.file=None
            try:f.flush();os.fsync(f.fileno())
            finally:f.close()


class Publication:
    """Durable private prefix plus own-inode-only public hardlinks."""
    def __init__(self,output,live):
        self.output=output;self.live=live;self.output.mkdir(mode=0o700)
        self.private=Path(tempfile.mkdtemp(prefix='.parent-emission-private-',dir=output));self.links=[];self.aggregate=[0]
    def stream(self,name,keys): return DurableStream(self.private/name,keys,MAX_BYTES,self.aggregate)
    @staticmethod
    def identity(s): return s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns
    def binding(self,path):
        self.live();fd=os.open(path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
        try:
            before=os.fstat(fd);require(stat.S_ISREG(before.st_mode) and 0<before.st_size<=MAX_BYTES,'output regular bound')
            h=hashlib.sha256();n=0
            while n<before.st_size:
                self.live();part=os.read(fd,min(65536,before.st_size-n));require(part,'output truncation');h.update(part);n+=len(part)
            require(not os.read(fd,1) and self.identity(os.fstat(fd))==self.identity(before),'output changed')
            require(path==path.resolve() and self.identity(os.stat(path,follow_symlinks=False))==self.identity(before),'output path replacement')
            return dict(path=str(path),sha256=h.hexdigest(),bytes=n)
        finally:os.close(fd)
    def publish_private(self,name):
        self.live();source=self.private/name;require(source.parent==self.private and source.is_file() and not source.is_symlink(),'private output identity')
        public=self.output/name;require(not public.exists() and not public.is_symlink(),'fresh public output')
        before=os.stat(source,follow_symlinks=False);os.link(source,public);self.links.append((public,before.st_dev,before.st_ino))
        fd=os.open(self.output,os.O_RDONLY)
        try:os.fsync(fd)
        finally:os.close(fd)
        require(self.identity(os.stat(source,follow_symlinks=False))==self.identity(os.stat(public,follow_symlinks=False)),'published link identity')
        return self.binding(public)
    def write_manifest(self,record):
        raw=encoded(record);require(0<len(raw)<=MAX_BYTES and self.aggregate[0]+len(raw)<=MAX_BYTES,'manifest/aggregate quota')
        path=self.private/'cover-manifest.json';fd=os.open(path,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
        try:require(os.write(fd,raw)==len(raw),'short manifest write');os.fsync(fd)
        finally:os.close(fd)
        self.aggregate[0]+=len(raw);return self.publish_private(path.name)
    def validate_private(self):
        require(self.private==self.private.resolve() and self.private.parent==self.output,'canonical private directory')
        require({p.name for p in self.output.iterdir()}=={self.private.name,'queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'},'output directory census')
        names=sorted(p.name for p in self.private.iterdir());require(names==['cover-manifest.json','pieces.ndjson','queries.ndjson','rows.ndjson'],'private file census')
        total=0
        for p in self.private.iterdir():
            s=os.stat(p,follow_symlinks=False);public=self.output/p.name;t=os.stat(public,follow_symlinks=False)
            owned=next(((dev,ino) for path,dev,ino in self.links if path==public),None)
            require(stat.S_ISREG(s.st_mode) and stat.S_ISREG(t.st_mode) and s.st_nlink==t.st_nlink==2
                and (s.st_dev,s.st_ino,s.st_size)==(t.st_dev,t.st_ino,t.st_size)
                and owned==(t.st_dev,t.st_ino),'private/public owned publication alias');total+=s.st_size
        require(total==self.aggregate[0]<=MAX_BYTES,'private aggregate bytes')
    def verify_outputs(self,bindings):
        self.validate_private()
        actual=[self.binding(self.output/name) for name in ('queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json')]
        require(equal(actual,bindings),'published output rehash')
        for path,dev,ino in self.links:
            current=os.stat(path,follow_symlinks=False);require((current.st_dev,current.st_ino)==(dev,ino),'owned public inode changed')
        self.live()
    def reject(self):
        errors=[]
        for path,dev,ino in reversed(self.links):
            try:
                s=os.stat(path,follow_symlinks=False)
                if (s.st_dev,s.st_ino)==(dev,ino):os.unlink(path)
            except FileNotFoundError:pass
            except OSError as exc:errors.append(str(exc))
        try:
            fd=os.open(self.output,os.O_RDONLY)
            try:os.fsync(fd)
            finally:os.close(fd)
        except OSError as exc:errors.append(str(exc))
        return errors


@contextmanager
def captured_dependencies(pool,plan,proposer_raw):
    helper_file=pool.capture(plan['dependencies']['productionHelper'],data=True,limit=MAX_BYTES)
    captured={alias:(binding(plan['dependencies'][role],pool.root)['path'],pool.capture(plan['dependencies'][role],data=True,limit=MAX_BYTES).data,
        binding(plan['dependencies'][role],pool.root)['sha256']) for alias,role in
        (('decimal_interval','decimalReference'),('certified_history','historyReference'),('continuous_reception_roots','rootLibrary'))}
    with module_from_bytes(helper_file.data,helper_file.path) as helper:
        with helper.captured_package(captured) as modules:
            with module_from_bytes(proposer_raw,plan['proposalReference']['path']) as proposer:
                yield helper,modules,proposer


def make_manifest(plan,plan_binding,own,bindings,history,parent,result,historical,subjects,runtime,ops,owner):
    members=[dict(id=h['id'],pathKey=h['pathKey'],polarity=h['polarity'],charge=h['charge'],historyFingerprint=h['historyFingerprint']) for h in history]
    value=dict(schema=SCHEMA,scope=parent_scope(plan['parentIndex']),status='conditional_complete',accepted=False,
        launchPlan=plan_binding,producer=own,verifier=plan['verifier'],declaration=plan['declaration'],parent=plain(parent),members=members,
        originalBindings=plan['originalBindings'],acceptanceOwner=owner,priorCoverClosure=plan['priorCoverClosure'],historicalSourceBindings=historical,
        subjectSourceBindings=subjects,runtimeBindings=runtime,operationalBindings=ops,algorithm=ALGORITHM,
        restrictions=plain(result.restrictions),census=CENSUS,helperCalls=CALLS,queries=bindings[0],rows=bindings[1],pieces=bindings[2],
        libraryFlags=LIBRARY_FLAGS,claims=CLAIMS,publicationRequires=PUBLICATION_REQUIRES)
    closed(value,MANIFEST_KEYS);return value


def runtime_paths(excluded=()):
    result={Path(sys.executable).resolve()};excluded={Path(p).resolve() for p in excluded}
    for module in tuple(sys.modules.values()):
        for key in ('__file__','__cached__'):
            path=getattr(module,key,None)
            if type(path) is str:
                p=Path(path).resolve()
                if p.is_file() and p not in excluded:result.add(p)
    return result


def check_runtime(runtime,subjects,git_binary):
    planned={Path(b['path']) for b in runtime}
    required=runtime_paths(excluded=[b['path'] for b in subjects])|{git_binary,Path(sys.executable).resolve()}
    config=Path(sys.prefix)/'pyvenv.cfg'
    if config.is_file():required.add(config.resolve())
    require(required<=planned,'late runtime outside plan')


def check_output(root,output,git_binary):
    lane=root/LANE
    require(output==output.resolve() and output.parent==lane and lane.is_dir() and lane==lane.resolve(),'canonical direct output')
    require(not output.exists() and not output.is_symlink(),'fresh absent output')
    result=subprocess.run([str(git_binary),'check-ignore','-q','--',str(output.relative_to(root))],cwd=root,
        stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=2)
    require(result.returncode==0,'output not ignored')


def budget_deadline(token,began):
    require(type(token) is str and 0<len(token)<=1152 and TOKEN.fullmatch(token),'budget token')
    value=Decimal(token);require(value.is_finite() and len(value.as_tuple().digits)<=1024 and abs(value.as_tuple().exponent)<=1000,'budget decimal')
    seconds=float(value);require(0<value<=1800 and math.isfinite(seconds) and 0<seconds<=1800 and began+seconds>began,'bounded remaining budget')
    return began+seconds


@contextmanager
def watching(live,progress,began):
    old=signal.getsignal(signal.SIGALRM);oldtimer=signal.getitimer(signal.ITIMER_REAL)
    def beat(*_):
        live();print(json.dumps(dict(stage=progress['stage'],queries=progress['queries'],rows=progress['rows'],pieces=progress['pieces'],
            accepted=False,elapsedSeconds=time.monotonic()-began),allow_nan=False),file=sys.stderr,flush=True)
    signal.signal(signal.SIGALRM,beat);signal.setitimer(signal.ITIMER_REAL,15,15)
    try:yield
    finally:
        signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,old)
        if oldtimer!=(0.0,0.0):signal.setitimer(signal.ITIMER_REAL,*oldtimer)


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for key in ('plan','plan-sha256','producer-sha256','out-dir','budget-seconds','git-binary'):parser.add_argument('--'+key,required=True)
    parser.add_argument('--repo-root');args=parser.parse_args(argv)
    began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began);usage0=resource.getrusage(resource.RUSAGE_SELF)
    root=Path(__file__).resolve().parents[2];require(args.repo_root is None or Path(args.repo_root)==root,'executing repository root')
    require(type(args.producer_sha256) is str and HEX.fullmatch(args.producer_sha256),'producer SHA');output=Path(args.out_dir).absolute()
    git_binary=Path(args.git_binary);require(git_binary.is_absolute() and git_binary==git_binary.resolve() and git_binary.is_file(),'resolved git binary')
    progress=dict(stage='capture',queries=0,rows=0,pieces=0);publication=None;streams=[];completion=None;selected_parent=None
    def live():require(time.monotonic()<deadline,'inclusive preparation deadline')
    try:
      with watching(live,progress,began):
       transport_path=root/DEPENDENCIES['transport'][0]
       with bootstrap(transport_path,DEPENDENCIES['transport'][1],live) as raw:
        with module_from_bytes(raw,transport_path) as w,ExitStack() as stack:
            pool=CapturePool(stack,w,root,live)
            own=pool.capture(dict(path=SELF,sha256=args.producer_sha256,bytes=(root/SELF).stat().st_size),data=True,limit=MAX_BYTES)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize)==_EXECUTING_CODE,'executing source differs')
            plan_path=Path(args.plan).absolute();require(plan_path==plan_path.resolve(),'canonical plan path')
            plan_raw=stack.enter_context(w.BoundFile(plan_path,args.plan_sha256,capture=True,limit=MAX_BYTES,live=live))
            core_path,core_sha=DEPENDENCIES['scientificDecoder']
            core_file=pool.capture(dict(path=core_path,sha256=core_sha,bytes=(root/core_path).stat().st_size),data=True,limit=MAX_BYTES)
            with module_from_bytes(core_file.data,core_file.path) as core:
                plan=core.decode_document(plan_raw.data)
                subjects,runtime,ops=validate_plan(plan,args.producer_sha256,root,w);plan=canonical_plan(plan,root)
                selected_parent=plan['parentIndex']
                subjects=sorted(subjects,key=lambda b:b['path']);runtime=plan['runtimeBindings'];ops=plan['operationalBindings']
                for group in (subjects,runtime,ops):
                    for b in group:pool.capture(b)
                require(str(git_binary) in {b['path'] for b in runtime},'Git is not runtime-bound')
                check_output(root,output,git_binary);live()
                original_files={role:pool.capture(plan['originalBindings'][role],data=True,limit=MAX_BYTES) for role in ORIGINAL}
                docs={k:w.decode_role(core,original_files[k].data,k) for k in ('export','reconstruction','guards')}
                docs.update((k,w.decode_role(core,original_files[k].data,{'fullPlan':'plan','fullManifest':'manifest','fullComparison':'comparison','fullAdmission':'admission'}[k]))
                    for k in ('fullPlan','fullManifest','fullComparison','fullAdmission'))
                owner=pool.capture(plan['acceptanceOwner'],data=True,limit=MAX_BYTES)
                historical=authenticate_full_chain(w,docs,original_files,pool,owner.data)
                helper_file=pool.capture(plan['dependencies']['productionHelper'],data=True,limit=MAX_BYTES)
                with module_from_bytes(helper_file.data,helper_file.path) as premise_helper:
                    originals,cells=premise_helper.authenticate_premises(docs['export'],docs['reconstruction'],docs['guards'])
                    require(len(cells)==160 and originals is docs['export']['retainedHistories'],'authenticated original premises')
                rows=w.records(core,original_files['fullRows'].data,10240);pieces=w.records(core,original_files['fullPieces'].data,17920)
                histories,parent=project_original_parent(docs['export'],rows,pieces,original_files['fullManifest'].binding(),parent_index=selected_parent)
                require(equal(owner_declaration(owner.data),plan['priorCoverClosure']),'plan/owner closure')
                progress['stage']='proposal';publication=Publication(output,live)
                query=publication.stream('queries.ndjson',QUERY_KEYS);streams.append(query)
                row=publication.stream('rows.ndjson',ROW_KEYS);streams.append(row)
                piece=publication.stream('pieces.ndjson',PIECE_KEYS);streams.append(piece)
                def sink(kind,record):
                    live();target={'query':query,'row':row,'piece':piece}[kind];target.write(record);live()
                def report(q,r,p):
                    require((q,r,p)==(query.count,row.count,piece.count),'durable acknowledgement prefix')
                    progress.update(queries=q,rows=r,pieces=p);live()
                proposer_file=pool.capture(plan['proposalReference'],data=True,limit=MAX_BYTES)
                with captured_dependencies(pool,plan,proposer_file.data) as (helper,modules,proposer):
                    refs=proposer.ProductionReferences(helper,modules['certified_history'],modules['decimal_interval'],modules['continuous_reception_roots'])
                    check_runtime(runtime,subjects,git_binary)
                    result=proposer.propose_parent_refinement(histories,parent,refs,on_record=sink,progress=report)
                    check_runtime(runtime,subjects,git_binary)
                require(result.accepted is False and result.status=='conditional_complete' and equal(dict(result.census),CENSUS)
                    and (result.build_calls,result.query_calls,result.cover_calls)==(1,3584,1) and equal(dict(result.claims),CLAIMS),'pure proposal result disposition')
                require((query.count,row.count,piece.count)==(3584,64,112),'durable final census')
                for stream in streams:stream.close()
                progress['stage']='publication';bindings=[publication.publish_private(n) for n in ('queries.ndjson','rows.ndjson','pieces.ndjson')]
                # Runtime is checked against the actual loaded path set before publication.
                check_runtime(runtime,subjects,git_binary)
                pool.recheck()
                manifest=make_manifest(plan,plan_raw.binding(),own.binding(),bindings,histories,parent,result,historical,subjects,runtime,ops,owner.binding())
                manifest_binding=publication.write_manifest(manifest);bindings.append(manifest_binding);publication.validate_private()
                # Reopen every public output and preserve checked bindings.
                publication.verify_outputs(bindings)
                pool.recheck();plan_raw.recheck();check_runtime(runtime,subjects,git_binary);publication.validate_private();live()
                progress['stage']='complete';elapsed=time.monotonic()-began;usage=resource.getrusage(resource.RUSAGE_SELF)
                rss=usage.ru_maxrss*(1 if sys.platform=='darwin' else 1024)
                completion=dict(completed=True,accepted=False,scope=parent_scope(selected_parent),parentIndex=selected_parent,outputs=bindings,census=CENSUS,helperCalls=CALLS,
                    elapsedSeconds=elapsed,processUserSeconds=usage.ru_utime-usage0.ru_utime,processSystemSeconds=usage.ru_stime-usage0.ru_stime,
                    maximumIndividualProcessResidentBytes=rss,independentComparisonRequired=True,
                    externalInclusiveDeadlineAndProcessClosureRequired=True,claims=CLAIMS)
                closed(completion,COMPLETION_KEYS)
                identities=pool.identities()+[(plan_raw.binding(),w.BoundFile.identity(plan_raw.initial))]
        live();check_runtime(runtime,subjects,git_binary)
      # The watch, all source descriptors and private module registrations are
      # gone before the one completion line. A callback failure here retracts.
      live();final_recapture(w,identities,live)
      publication.verify_outputs(completion['outputs']);check_runtime(runtime,subjects,git_binary)
      completion['elapsedSeconds']=time.monotonic()-began
      usage=resource.getrusage(resource.RUSAGE_SELF)
      completion.update(processUserSeconds=usage.ru_utime-usage0.ru_utime,processSystemSeconds=usage.ru_stime-usage0.ru_stime,
          maximumIndividualProcessResidentBytes=usage.ru_maxrss*(1 if sys.platform=='darwin' else 1024))
      print(json.dumps(completion,allow_nan=False),flush=True);live()
    except BaseException as exc:
        for stream in streams:
            try:stream.close()
            except BaseException:pass
        cleanup=[] if publication is None else publication.reject()
        report=dict(completed=False,accepted=False,scope=parent_scope(selected_parent) if selected_parent is not None else 'unvalidated-original-parent-refinement',parentIndex=selected_parent,failure=str(exc),acknowledgedPrefix={k:progress[k] for k in ('queries','rows','pieces')},
            privateAttemptPreserved=None if publication is None else str(publication.private),cleanupFailures=cleanup,claims=CLAIMS)
        if all(hasattr(exc,k) for k in ('completed_queries','completed_rows','completed_pieces')):
            report['acknowledgedPrefix']=dict(queries=exc.completed_queries,rows=exc.completed_rows,pieces=exc.completed_pieces)
            report['helperCalls']=dict(build=exc.build_calls,queries=exc.query_calls,cover=exc.cover_calls)
            report['pendingRecord']=plain(exc.pending_record)
        else:report.update(helperCalls=None,pendingRecord=None)
        print(json.dumps(report,allow_nan=False),file=sys.stderr,flush=True);raise


if __name__=='__main__':
    try:main()
    except BaseException:sys.exit(1)
