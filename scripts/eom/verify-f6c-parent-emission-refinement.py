#!/usr/bin/env python3
"""Independent source-bound comparison of one plan-selected original F6c parent.

Only privately captured transport, scientific decoder, ffe91 comparison and
19c rational reference execute. Production sources are authenticated inputs,
never imported mathematical or mapping oracles. The original198-source closure
is derived from the frozen full entry and plan, not the receipt's source list.
Parent membership, all1760 original segments/member and complete history-token
generation are reconstructed here before comparing the new3584 queries.

An accepted report is conditional comparison only. Matching fresh completion,
the externally enforced inclusive deadline and closed owned processes remain
necessary; a historical versioned owner is not a fresh process observation.
No root search, EOM, acceleration, metric or physical authority is provided.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack, contextmanager
from dataclasses import fields, is_dataclass
from decimal import Decimal
from fractions import Fraction
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
from types import MappingProxyType, ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/verify-f6c-parent-emission-refinement.py'
CONTROLS = 'tests/test_f6c_parent_emission_refinement_verification.py'
PREFIX = 'reference/priorities/braid-program/evidence/'
OWNER = PREFIX+'2026-08-27-braid-search-launch-readiness.md'
LANE = '.local-data/braid-analysis/f6c-parent-emission-refinement-20260827'
PLAN_SCHEMA = 'braid-program/f6c-parent-emission-refinement-launch.v2'
MANIFEST_SCHEMA = 'braid-program/f6c-parent-emission-refinement-cover.v1'
REPORT_SCHEMA = 'braid-program/f6c-parent-emission-refinement-conformance.v1'
MAX_BYTES = 64*1024**2
MAX_SOURCE_BYTES = 1024**3
MAX_LINE = 131072
IDS = ('0+', '0-', '1+', '1-', '2+', '2-', '3+', '3-')
NAMED = {
 'declaration': (PREFIX+'2026-08-27-f6c-parent-emission-refinement-reference.md','c9f0924cd24745bd10e2b51ee5b60a09c0c0576b5dec3bc14f647c9c7ee6fc47'),
 'producer': ('scripts/eom/prepare-f6c-parent-emission-refinement.py',None),
 'producerControls': ('tests/test_f6c_parent_emission_refinement_preparation.py',None),
 'proposalReference': ('scripts/eom/f6c_parent_emission_refinement.py','d2653fd0dc74c7515ee7eccdd59c0f487903a481c6294cabce43e58b633c1406'),
 'proposalReferenceControls': ('tests/test_f6c_parent_emission_refinement.py','f1650b5e73a06ecd7ed05bff10ba97949b42aa5330e84fb3514c2f868eff0fc2'),
 'verifier': (SELF,None), 'verifierControls': (CONTROLS,None),
 'comparisonReference': ('scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py','9bca879b94386d033597bb9d1e3a4ceeb9943925615c916299feb91e482391ad'),
 'comparisonReferenceControls': ('tests/test_f6c_parent_emission_refinement_conformance.py','2eafcd7551a6d64c5f6c7bc6923507da8d27084af74bc5742583d63eb708aebb'),
}
DEPENDENCIES = {
 'transport': ('scripts/eom/verify-f6c-refined-acceleration.py','7a985c836f9f68d16e37b056192c6be69505f3ed3de62c6d6401beea1e4bacfc'),
 'transportControls': ('tests/test_f6c_refined_acceleration.py','4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a'),
 'scientificDecoder': ('scripts/eom/oracle/f6c_refined_acceleration_conformance.py','7574dc0fa7bec6e598e83ac7d8ad7670acaca6c10a41958b01487ac0af3ae85e'),
 'scientificDecoderControls': ('tests/test_f6c_refined_acceleration_conformance.py','147800b0ddfc9b3bf4f5889058e6df9073b70cf90798b2ad9c536289bf9a9921'),
 'productionHelper': ('scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','7b81efbf67b67c78c759fcb1c49e757ffb7f513f75ca8489178bfda71f4f31c5'),
 'productionHelperControls': ('tests/test_f6c_cached_continuous_reception_root_cover_preparation.py','3bee7599b03f2500ede6eeeea31c46e1aac82410f456e967102c13e820b93221'),
 'historyReference': ('scripts/eom/oracle/certified_history.py','ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
 'decimalReference': ('scripts/eom/oracle/decimal_interval.py','fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
 'decimalControls': ('tests/test_eom_decimal_interval.py','22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44'),
 'rootLibrary': ('scripts/eom/oracle/continuous_reception_roots_cached.py','daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf'),
 'rootControls': ('tests/test_eom_continuous_reception_roots_cached.py','a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb'),
 'independentRootReference': ('scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7'),
 'independentRootControls': ('tests/test_f6c_cached_continuous_reception_root_cover.py','09b5c51b2e43727b98adfffde6a080e8e9c92f1ffa7280d8f819d830c8f7e2a3'),
 'cacheEquivalence': (PREFIX+'2026-08-27-f6c-call-local-state-cache-equivalence.md','a5d9ee0b77f436f5d8cf3b3f1895e94438d220543ee87c117996a704994dc34d'),
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
 'fullEntry': ('scripts/eom/run-f6c-cached-root-cover-full.mjs','d46ca542216c3554b2cbf4475a18149ac78f6d0c9ccd35897e1280b7632d7ea0'),
 **FULL,
}
PLAN_KEYS = ('schema','scope','parentIndex',*NAMED,'dependencies','originalBindings','acceptanceOwner','priorCoverClosure','runtimeBindings','operationalBindings','historicalDocumentRoutes','limits')
MANIFEST_KEYS = tuple('schema scope status accepted launchPlan producer verifier declaration parent members originalBindings acceptanceOwner priorCoverClosure historicalSourceBindings subjectSourceBindings runtimeBindings operationalBindings algorithm restrictions census helperCalls queries rows pieces libraryFlags claims publicationRequires'.split())
REPORT_KEYS = tuple('schema scope accepted authority manifest queries rows pieces launchPlan verifier sourceBindings historicalSourceBindings originalBindings acceptanceOwner priorCoverClosure parent analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split())
COMPLETION_KEYS = tuple('completed accepted scope output publicationRecord elapsedSecondsBeforeCompletion publicationRequires'.split())
HISTORY_KEYS = tuple('id pathKey polarity charge historyFingerprint coverageStart coverageEnd segments'.split())
SEGMENT_KEYS = tuple('startTime endTime coefficients positionErrors velocityErrors positionError velocityError'.split())
CLAIMS = dict.fromkeys(('accepted','referenceGenerationAuthenticated','originalSourceAuthenticated','original1760PieceCensusAuthenticated','premiseTruthAuthenticated','subjectMembershipEstablished','historicalTrajectoryIdentityEstablished','executionAuthorized','eomExecuted','h3EvidenceEligible','metricsAvailable','scoreAuthorized','equilibriumEstablished','retentionEstablished','physicalRealizationEstablished'),False)
LIBRARY_FLAGS = dict.fromkeys(('premise_truth_authenticated','subject_membership_established','execution_authorized','metrics_available','h3_evidence_eligible'),False)
CENSUS = dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
CALLS = dict(build=1,queries=3584,cover=1)
ALGORITHM = dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,upperSearchRestartsFromOriginal=True,receptionSubdivision=False,automaticRetry=False)
PUBLICATION_REQUIRES = 'fresh successful completion, independent parent refinement comparison, external inclusive deadline and closed owned processes'
HEX = re.compile(r'[a-f0-9]{64}\Z')


def require(value, message):
    if not value: raise ValueError(message)


def keys(value, expected): require(type(value) is dict and set(value)==set(expected), 'closed fields differ')
def sha(raw): return hashlib.sha256(raw).hexdigest()
def integer(value, expected): require(type(value) is int and value==expected, 'exact integer/census differs')


def plain(value):
    if is_dataclass(value): return {f.name:plain(getattr(value,f.name)) for f in fields(value)}
    if type(value) in (dict,MappingProxyType): return {k:plain(v) for k,v in value.items()}
    if type(value) in (list,tuple): return [plain(v) for v in value]
    if type(value) is Fraction: return str(value)
    return value


def closure_premise():
    return dict(authority='versioned-acceptance-owner-declaration-not-fresh-observation',originalCallerSession='13512',
        finalCompletionChunk='c21aa7',exitCode=0,elapsedSeconds='862.951823625',processesClosed=True,independentAuditAccepted=True)


def validate_plan(w, plan, own_sha, root):
    keys(plan,PLAN_KEYS)
    require(plan['schema']==PLAN_SCHEMA and plan['scope']==parent_scope(plan['parentIndex']) and w.equal(plan['limits'],w.LIMITS),'plan scope/limits')
    keys(plan['dependencies'],DEPENDENCIES);keys(plan['originalBindings'],ORIGINAL)
    for group,expected in (({k:plan[k] for k in NAMED},NAMED),(plan['dependencies'],DEPENDENCIES),(plan['originalBindings'],ORIGINAL)):
        for role,pin in expected.items():
            b=w.binding(group[role]);require(b['path']==pin[0] and (pin[1] is None or b['sha256']==pin[1]),'fixed role generation: '+role)
            if len(pin)==3: integer(b['bytes'],pin[2])
    b=w.binding(plan['acceptanceOwner']);require(b['path']==OWNER,'reviewed plan-selected owner path')
    require(plan['verifier']['sha256']==own_sha and w.equal(plan['priorCoverClosure'],closure_premise()),'verifier/closure premise')
    for role in ('runtimeBindings','operationalBindings'): w.binding_list(plan[role])
    require(all(Path(b['path']).is_absolute() for b in plan['runtimeBindings']),'absolute runtime paths required')
    # The exact separately reviewed plan binds operational layout and census.
    # This wrapper neither invents a future launcher nor admits one from its name.
    subject=[*[plan[k] for k in NAMED],*plan['dependencies'].values()]
    require(len(w.source_map(subject,root))==23,'unique23 subject sources')
    for role in ('runtimeBindings','operationalBindings'):
        require(len(w.source_map(plan[role],root))==len(plan[role]),'normalized duplicate '+role)
    new_sources=[*subject,*plan['runtimeBindings'],*plan['operationalBindings']]
    require(len(w.source_map(new_sources,root))==len(new_sources),'new subject/runtime/operation duplicate')
    all_bindings=[*subject,*plan['originalBindings'].values(),plan['acceptanceOwner'],*plan['runtimeBindings'],*plan['operationalBindings']]
    w.source_map(all_bindings,root)
    historical_routes(plan['historicalDocumentRoutes'],root,w)
    return plan


def historical_routes(rows,root,w):
    require(type(rows) is list and len(rows)<=2,'bounded consumed archive routes')
    allowed={'7d4c202ce935256168ccef52e3588ffa72eb4d6509db432e814eba65ed5568bc':16985,
             '2883081c639b1dc1a833a5c7a2f76ec79fbb3c7756718110a2e8db593b827a40':13021}
    result={}
    for row in rows:
        keys(row,('original','physical'));old=w.normalized(row['original'],root);physical=w.normalized(row['physical'],root)
        require(old['sha256'] in allowed and old['bytes']==allowed[old['sha256']] and old['path'].startswith(str(root/'reference/priorities/braid-program/evidence')+'/')
            and old['path'].endswith(('.md','.json')),'exact original historical document')
        require(physical['path']!=old['path'] and (physical['sha256'],physical['bytes'])==(old['sha256'],old['bytes']),'unchanged archive bytes')
        require(old['path'] not in result and old['sha256'] not in {r['original']['sha256'] for r in result.values()},'duplicate archive route')
        result[old['path']]=dict(original=old,physical=physical)
    return result


@contextmanager
def bootstrap(path, digest, live):
    """Same-FD bounded capture of transport before any captured helper executes."""
    path=Path(path);require(path.is_absolute() and path==path.resolve(),'bootstrap canonical path')
    require(type(digest) is str and HEX.fullmatch(digest),'bootstrap expected SHA')
    live();fd=os.open(path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
    def identity(s): return s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns
    try:
        initial=os.fstat(fd);require(stat.S_ISREG(initial.st_mode) and 0<initial.st_size<=MAX_BYTES,'bootstrap bound')
        def read():
            os.lseek(fd,0,os.SEEK_SET);parts=[];count=0
            while count<initial.st_size:
                live();part=os.read(fd,min(65536,initial.st_size-count));require(part,'bootstrap truncated');parts.append(part);count+=len(part)
            require(not os.read(fd,1),'bootstrap grew')
            require(identity(os.fstat(fd))==identity(initial) and path==path.resolve() and identity(os.stat(path,follow_symlinks=False))==identity(initial),'bootstrap changed')
            raw=b''.join(parts);require(sha(raw)==digest,'bootstrap hash');live();return raw
        raw=read()
        try: yield raw
        finally: read()
    finally: os.close(fd)


@contextmanager
def captured_module(raw, filename, digest):
    require(sha(raw)==digest,'private captured source hash')
    name='_parent1_'+digest[:12]+'_'+str(id(raw));require(name not in sys.modules,'private name collision')
    module=ModuleType(name);module.__file__=str(filename);sys.modules[name]=module
    try:
        exec(compile(raw,str(filename),'exec',dont_inherit=True),module.__dict__)
        yield module
    finally: sys.modules.pop(name,None)


class Pool:
    def __init__(self, stack, transport, root, live):
        self.stack=stack;self.w=transport;self.root=root;self.live=live;self.files={};self.inodes={};self.total=0;self.routes={};self.used_routes=set();self.allowed=None;self.outputs=set()
    def capture(self,path,digest,*,data=False,limit=MAX_SOURCE_BYTES):
        path=self.root/path;key=str(path)
        if self.allowed is not None:
            require(key in self.outputs or (key in self.allowed and self.allowed[key]['sha256']==digest),'source absent from original global union')
        require(path.is_absolute() and path==path.resolve(),'canonical bound path')
        obj=self.files.get(key)
        if obj is not None:
            require(obj.digest==digest and obj.initial.st_size<=limit,'conflicting generation/late cap')
            if data and obj.data is None:
                raw,h=obj.scan(True);obj.check_path();require(h==digest,'late capture hash');obj.data=raw
            return obj
        require(len(self.files)<512,'source file census bound')
        obj=self.stack.enter_context(self.w.BoundFile(path,digest,capture=data,limit=limit,live=self.live))
        identity=(obj.initial.st_dev,obj.initial.st_ino)
        require(identity not in self.inodes,'hardlink source alias')
        self.total+=obj.initial.st_size;require(self.total<=MAX_SOURCE_BYTES,'aggregate bound source bytes')
        self.inodes[identity]=key;self.files[key]=obj;return obj
    def read_binding(self,b,*,data=False,limit=None):
        b=self.w.normalized(b,self.root)
        obj=self.capture(b['path'],b['sha256'],data=data,limit=(MAX_BYTES if data else MAX_SOURCE_BYTES) if limit is None else limit)
        integer(obj.initial.st_size,b['bytes']);return obj.data if data else obj.binding()
    def recheck(self):
        for obj in tuple(self.files.values()): obj.recheck()
    def bindings(self): return [self.files[k].binding() for k in sorted(self.files)]
    def identities(self):
        return [(self.files[k].binding(),self.w.BoundFile.identity(self.files[k].initial)) for k in sorted(self.files)]
    def historical(self,b):
        old=self.w.normalized(b,self.root);route=self.routes.get(old['path'])
        if route is None:return self.read_binding(old)
        require(self.w.equal(route['original'],old),'archive original identity differs');self.read_binding(route['physical']);self.used_routes.add(old['path']);return old
    def admit_operation(self,filename,digest):
        file=self.capture(filename,digest,data=True,limit=MAX_BYTES);doc=json.loads(file.data)
        require(doc.get('schema')=='braid-program/f6c-bounded-operation-plan.v1','generic operation source union')
        rows=[*doc['sources'],doc['hookModule'],doc['hookControls'],file.binding()]
        for stage in doc['stages']:rows.extend((stage['entry'],*stage['sources'],*stage['runtimeBindings']))
        allowed={}
        for row in rows:
            b=self.w.normalized(row,self.root);require(b['path'] not in allowed or self.w.equal(allowed[b['path']],b),'conflicting global source');allowed[b['path']]=b
        require(len(allowed)<=512 and sum(b['bytes'] for b in allowed.values())<=MAX_SOURCE_BYTES,'global source union bound')
        for b in allowed.values():self.read_binding(b)
        require(set(self.files)<=set(allowed),'bootstrap source outside union');self.allowed=allowed


def final_recapture(w, identities, live):
    """After private cleanup, retain the ORIGINAL identity, not merely its hash.

    A closed source descriptor is not authority to accept the current path's
    generation. Reopen bounded regular files and compare all five identity
    fields with the captured originals, including byte-identical replacements.
    These final descriptors remain open together through the final rechecks.
    """
    require(type(identities) is list and 0<len(identities)<=512,'final captured file census')
    require(len({b['path'] for b,_ in identities})==len(identities),'final duplicate path')
    with ExitStack() as stack:
        reopened=[]
        for b,identity in identities:
            live();w.binding(b)
            f=stack.enter_context(w.BoundFile(b['path'],b['sha256'],capture=False,limit=b['bytes'],live=live))
            require(w.BoundFile.identity(f.initial)==identity and f.initial.st_size==b['bytes'],'post-cleanup original identity changed')
            reopened.append(f)
        for f in reopened:f.recheck()
        live()


def decode_role(w, decoder, raw, role):
    if role in ('export','fullPlan','fullManifest','plan','manifest','row','piece','query'): return decoder.decode_document(raw)
    if role=='fullAdmission': return w.decode_operational(raw,document_class='operational-receipt')
    if role in ('reconstruction','guards','fullComparison','completion','launcher','resource'): return w.decode_operational(raw)
    raise ValueError('unknown semantic document role')


def records(raw, decode, count, *, live=lambda:None):
    require(type(raw) is bytes and 0<len(raw)<=MAX_BYTES and raw.endswith(b'\n'),'terminated bounded NDJSON')
    start=0;result=[]
    for _ in range(count):
        live();end=raw.find(b'\n',start);require(start<end and end-start<=MAX_LINE,'bounded nonempty record')
        item=decode(raw[start:end]);require(type(item) is dict,'nonobject/null is not EOF');result.append(item);start=end+1
    require(start==len(raw),'complete exact stream EOF');return result


def entry_pins(raw):
    text=raw.decode('utf-8',errors='strict');marker='export const PINS = Object.freeze({'
    require(text.count(marker)==1,'unique frozen PINS block');block=text.split(marker,1)[1].split('\n});',1)[0];pins={}
    for line in block.splitlines():
        if not line.strip(): continue
        match=re.fullmatch(r'\s*(?:"([^"]+)"|\[([A-Z_]+)\]): "([a-f0-9]{64})",',line)
        require(match is not None,'frozen PINS syntax');path,name,digest=match.groups()
        if name:
            values=re.findall(r'export const '+re.escape(name)+r' = "([^"]+)";',text);require(len(values)==1,'frozen PINS constant');path=values[0]
        require(path not in pins,'duplicate entry PIN');pins[path]=digest
    require(len(pins)==35,'full entry35 PINS');return pins


def authenticate_owner(raw):
    text=raw.decode('utf-8',errors='strict');heading='### Independently Accepted Actual Full F6c Conditional Cover\n'
    require(text.count(heading)==1,'unique full closure-owner section');section=text.split(heading,1)[1].split('\n### ',1)[0]
    for token in ('original caller session `13512`','final completion chunk `c21aa7`','exit zero','`862.951823625`','Independent post-closure review accepts all 160',FULL_BASE.rstrip('/')):
        require(token in section,'historical owner attribution differs')
    for role,(_,digest,size) in FULL.items():
        if role!='fullPlan': require(digest in section and str(size) in section,'owner artifact attribution differs')


def authenticate_full(w, ref, docs, originals, entry_raw, owner_raw, pool):
    """Authenticate completed original lineage without recomputing old geometry."""
    authenticate_owner(owner_raw)
    p,m,c,a=(docs[k] for k in ('fullPlan','fullManifest','fullComparison','fullAdmission'))
    keys(p,('schema','scope','resourcePlan','comparisonContract','operationalBindings','controlBindings','python','pythonRealPath','git','node'))
    require(p['schema']=='braid-program/f6c-cached-root-cover-full-launch.v1' and p['scope']=='full','original full plan')
    contract=p['comparisonContract'];keys(contract,('declarationSha256','verifierSha256','scope','subjectSourceBindings','runtimeBindings'))
    require(contract['scope']=='full' and contract['verifierSha256']==DEPENDENCIES['independentRootReference'][1] and contract['declarationSha256']==ref.DECLARATION_SHA,'original comparison contract')
    claimed=w.source_map(a['sourceBindings'],pool.root)
    expected=[]
    for path,digest in entry_pins(entry_raw).items():
        absolute=str(pool.root/path);require(absolute in claimed and claimed[absolute]['sha256']==digest,'original entry pin')
        expected.append(pool.historical(claimed[absolute]))
    for group,n in ((contract['subjectSourceBindings'],4),(contract['runtimeBindings'],158),(p['operationalBindings'],6),(p['controlBindings'],2)):
        w.binding_list(group,n);expected.extend(pool.historical(b) for b in group)
    expected.extend((pool.historical(p['resourcePlan']),originals['fullPlan']))
    require(pool.used_routes==set(pool.routes),'unused archive route')
    expected=w.source_map(expected,pool.root);require(len(expected)==198,'original198 derived source closure')
    w.binding_list(a['sourceBindings'],198);require(w.equal(w.source_map(a['sourceBindings'],pool.root),expected),'original receipt cannot invent membership')
    require(c['schema']==ref.REPORT_SCHEMA and c['scope']=='full' and c['accepted'] is True,'original comparison disposition')
    require(a['schema']=='braid-program/f6c-cached-root-cover-full-admission.v1' and a['scope']=='full' and a['accepted'] is True and a['processesClosed'] is True,'original admission disposition')
    require(type(a['elapsedSecondsBeforePublication']) in (int,Decimal) and 0<=Fraction(a['elapsedSecondsBeforePublication'])<Fraction('862.951823625'),'historical prepublication timing')
    for key in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'): require(a[key] is False,'original authority promoted')
    require(w.equal(c['claims'],dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)),'original comparison claims')
    analysis=c['analysis'];require(analysis['accepted'] is False and analysis['conditionalEnclosuresConformant'] is True,'original conditional conformance')
    for key,n in dict(cellCount=160,pairCellCertificates=10240,ordinaryNonselfRows=8960,selfExclusionRows=1280,distinctNonselfFaceChecks=17920,pieceRecordCount=17920,recordedGeometryPieceVisits=14639800).items(): integer(analysis[key],n)
    for obj,key,role in ((m,'rows','fullRows'),(m,'pieces','fullPieces'),(m,'launchPlan','fullPlan'),(c,'rows','fullRows'),(c,'pieces','fullPieces'),(c,'manifest','fullManifest'),(c,'launchPlan','fullPlan'),(a,'plan','fullPlan')):
        require(w.equal(w.binding(obj[key]),originals[role]),'original output chain')
    require(type(a['stages']) is list and len(a['stages'])==2,'original two stages')
    for item,stage in zip(a['stages'],('consumer','comparison')):
        proc,ad=item['process'],item['admission'];done=ad['completion']
        require(item['stage']==stage and proc['accepted'] is True and proc['processesClosed'] is True and w.equal(proc['exit'],dict(code=0,signal=None)) and ad['accepted'] is True and w.equal(proc['admission'],ad),'closed original registered stage')
        require(type(proc['gates']) is list and len(proc['gates'])==1,'original single gate');gate=proc['gates'][0]
        require(gate['retired'] is True and gate['acknowledged'] is True and gate['measurement']['code']==0 and gate['measurement']['signal'] is None,'original gate closure')
        require(done['completed'] is True and done['accepted'] is (stage=='comparison') and done['h3EvidenceEligible'] is False,'original stage completion')
        require(w.equal(proc['stdoutLog'],ad['completionLog']),'original completion binding')
        raw=pool.read_binding(proc['stdoutLog'],data=True);pool.read_binding(proc['stderrLog'])
        require(raw.endswith(b'\n') and len(raw.splitlines())==1 and w.equal(w.decode_operational(raw),done),'original fresh completion record')
        outputs=[originals[k] for k in ('fullRows','fullPieces','fullManifest')] if stage=='consumer' else [originals['fullComparison']]
        require(w.equal(ad['outputs'],outputs) and w.equal(done['outputs'] if stage=='consumer' else [done['output']],outputs),'original completed outputs')
    launcher_count=docs['fullLauncherLog'].count(b'\n');require(0<launcher_count<=10000,'bounded original launcher lines')
    launcher=records(docs['fullLauncherLog'],w.decode_operational,launcher_count,live=pool.live)
    # Exactly62 host records; other diagnostics are not process-closure proof.
    hosts=[x for x in launcher if x.get('kind')=='host-resource'];require(len(hosts)==62,'original host census')
    require(w.equal(hosts[:len(a['hostObservationsBeforePublication'])],a['hostObservationsBeforePublication']),'original host prefix')
    rss=records(docs['fullResourceLog'],w.decode_operational,3447,live=pool.live)
    for n,x in enumerate(rss):
        require(x['kind']=='aggregate-rss' and 0<=Fraction(x['elapsedSeconds'])<Fraction('862.951823625') and (n==0 or Fraction(rss[n-1]['elapsedSeconds'])<=Fraction(x['elapsedSeconds'])),'original RSS order')
        require(type(x['aggregateResidentBytes']) is int and 0<=x['aggregateResidentBytes']<=2*1024**3 and 0<=Fraction(x['sampleGapMs'])<=1000,'original RSS bound')
    prefix=a['observationsBeforePublication'];integer(prefix['samples'],3444)
    require(max(x['aggregateResidentBytes'] for x in rss[:3444])==prefix['maximumSampledRSSBytes'],'original RSS prefix')
    histories,cells,mapping=ref.validate_premises(docs['export'],docs['reconstruction'],docs['guards'])
    ref.validate_manifest(m,contract,originals['fullPlan'],mapping,cells)
    return [expected[k] for k in sorted(expected)]


def parent_scope(parent_index):
    require(type(parent_index) is int and 0<=parent_index<160,'bounded original parent index')
    return f'original-parent-{parent_index}-emission-refinement'


def original_projection(ref, export, rows, pieces, cover_binding, *, parent_index, live=lambda:None):
    """Independent original-token projection; no state_box or root evaluation."""
    parent_scope(parent_index)
    require(export['schema']=='braid-program/f6c-retained-history-export.v1' and export['fieldSpeed']=='1','normalized original export')
    require(type(export['retainedHistories']) is list and len(export['retainedHistories'])==8,'original eight histories')
    histories=[];knots=None;digests=[];bounds=[]
    for i,old in enumerate(export['retainedHistories']):
        live();require(type(old) is dict and set(HISTORY_KEYS)<=set(old),'original history fields')
        require(old['id']==IDS[i] and old['coverageStart']=='-8' and old['coverageEnd']=='0.13','original identity/domain')
        integer(old['pathKey'],i+1);integer(old['polarity'],1 if i%2==0 else -1)
        require(old['charge']==('' if i%2==0 else '-')+'0.1666666666666666666666666666666667','original charge')
        require(type(old['historyFingerprint']) is str and 0<len(old['historyFingerprint'])<=256,'original fingerprint')
        require(type(old['segments']) is list and len(old['segments'])==1760,'actual1760 segments')
        h={k:old[k] for k in HISTORY_KEYS if k!='segments'};h['segments']=[];end=Fraction(-8);member_bounds=[];future=[]
        for index,s in enumerate(old['segments']):
            require(type(s) is dict and set(SEGMENT_KEYS)<=set(s),'original segment fields')
            a,b=(ref.number(s[k]) for k in ('startTime','endTime'));require(end==a<b<=Fraction('0.13'),'original segment coverage');end=b
            require((b<=0) if index<1600 else (a>=0),'original1600/160 split')
            require(type(s['coefficients']) is list and len(s['coefficients'])==3 and all(type(x) is list and len(x)==4 for x in s['coefficients']),'original cubic shape')
            for axis in s['coefficients']:
                for token in axis: ref.number(token)
            for axis,scalar in (('positionErrors','positionError'),('velocityErrors','velocityError')):
                require(type(s[axis]) is list and len(s[axis])==3,'original axis allowance');radius=ref.number(s[scalar]);require(all(0<=ref.number(t)<=radius for t in s[axis]),'original scalar allowance')
            h['segments'].append({k:([list(a) for a in s[k]] if k=='coefficients' else list(s[k]) if k.endswith('Errors') else s[k]) for k in SEGMENT_KEYS})
            member_bounds.append((a,b))
            if index>=1600: future.append((s['startTime'],s['endTime']))
        require(end==Fraction('0.13'),'original final endpoint')
        if knots is None: knots=future
        else: require(future==knots,'original member knot lexemes differ')
        histories.append(h);digests.append(ref.original_history_digest(h));bounds.append(member_bounds)
    frames=export['acceptedFrames'];require(type(frames) is list and len(frames)==81,'original81 frames')
    times=[x['time'] for x in frames]
    require(times==[knots[0][0]]+[knots[j][1] for j in range(1,160,2)],'original frame lexemes/ownership')
    require(type(rows) is list and len(rows)==10240 and type(pieces) is list and len(pieces)==17920,'complete original streams')
    cache={};piece_index=0;emissions=[]
    def clips(member,interval):
        lo,hi=ref.interval(interval);key=(member,lo,hi)
        if key not in cache:
            live();touched=[(n,max(lo,a),min(hi,b)) for n,(a,b) in enumerate(bounds[member]) if a<=hi and b>=lo]
            require(touched and touched[0][1]==lo and touched[-1][2]==hi,'original closed coverage')
            cache[key]=dict(touchedPieceCount=len(touched),firstIndex=touched[0][0],lastIndex=touched[-1][0],contiguousIndexRange=[touched[0][0],touched[-1][0]],clippedPiecesSha256=sha(''.join(f'{n}\t{a}\t{b}\n' for n,a,b in touched).encode('ascii')))
        return cache[key]
    for index,row in enumerate(rows):
        live();keys(row,ref.ROW_KEYS);cell,local=divmod(index,64);i,j=divmod(local,8)
        for k,v in (('rowIndex',index),('cellIndex',cell),('receiverIndex',i),('transmitterIndex',j),('ordinaryRootsPerReception',0 if i==j else 1)): integer(row[k],v)
        require(row['receiverId']==IDS[i] and row['transmitterId']==IDS[j] and row['coincidentEndpointExcluded'] is (i==j) and row['rootFreeComplementConditional'] is True and row['retainedBoundaryContact'] is False,'original row identity/flags')
        ref.false_flags(row['libraryFlags']);expected_i=dict(lower=knots[cell][0],upper=knots[cell][1],precision=90)
        require(row['reception']==expected_i and type(row['reception']['precision']) is int,'original reception lexical identity')
        if i==j:
            require(all(row[k] is None for k in ('emission','oldestResidual','lowerFaceResidual','upperFaceResidual','displacement','distance','transmitterFactor','receiverFactor','receiverPieceRecord','transmitterPieceRecord')),'original self geometry absent');continue
        e=ref.interval(row['emission']);require(e[0]==-8 and e[1]==ref.number(knots[cell][0])-Fraction('0.05'),'original emission membership')
        for role,member,interval in (('receiver',i,row['reception']),('transmitter',j,row['emission'])):
            integer(row[role+'PieceRecord'],piece_index);piece=pieces[piece_index]
            ref.check_piece(piece,piece_index,index,role,histories[member],digests[member],ref.interval(interval),clips(member,interval))
            require(piece['requestedInterval']==interval,'original requested lexemes');piece_index+=1
        if cell==parent_index: emissions.append(dict(receiverIndex=i,transmitterIndex=j,receiverId=IDS[i],transmitterId=IDS[j],emission=dict(row['emission'])))
    integer(piece_index,17920)
    generation=sha(json.dumps(histories,sort_keys=True,separators=(',',':'),ensure_ascii=True,allow_nan=False).encode('ascii'))
    frame_index=parent_index//2
    parent=dict(schema='braid-program/f6c-original-parent-refinement-input.v1',parentIndex=parent_index,frameIndex=frame_index,
        frame=dict(lower=times[frame_index],upper=times[frame_index+1],precision=90),reception=dict(lower=knots[parent_index][0],upper=knots[parent_index][1],precision=90),
        originalEmissions=emissions,oldestTime='-8',historyGenerationSha256=generation,originalCoverBinding=dict(cover_binding))
    return histories,parent


def compare_manifest(w, core, ref, packet, plan, launch, originals, historical, parent, histories, streams, *, progress=None):
    keys(packet,MANIFEST_KEYS)
    require(packet['schema']==MANIFEST_SCHEMA and packet['scope']==parent_scope(plan['parentIndex']) and packet['status']=='conditional_complete' and packet['accepted'] is False,'candidate disposition')
    integer(parent['parentIndex'],plan['parentIndex'])
    for key,value in (('launchPlan',launch),('producer',streams['producer']),('verifier',streams['verifier']),('declaration',streams['declaration']),
        ('parent',parent),('originalBindings',originals),('acceptanceOwner',streams['acceptanceOwner']),('priorCoverClosure',plan['priorCoverClosure']),
        ('historicalSourceBindings',historical),('subjectSourceBindings',streams['subjectSourceBindings']),('runtimeBindings',streams['runtimeBindings']),('operationalBindings',streams['operationalBindings']),
        ('algorithm',ALGORITHM),('census',CENSUS),('helperCalls',CALLS),('libraryFlags',LIBRARY_FLAGS),('claims',CLAIMS),('publicationRequires',PUBLICATION_REQUIRES)):
        require(w.equal(packet[key],value),'candidate field differs: '+key)
    members=[{k:h[k] for k in ('id','pathKey','polarity','charge','historyFingerprint')} for h in histories]
    require(w.equal(packet['members'],members),'candidate original members')
    for key in ('queries','rows','pieces'): require(w.equal(packet[key],streams[key]),'candidate stream binding')
    answer=core.compare_parent_refinement(ref,histories,parent,streams['queryRecords'],streams['rowRecords'],streams['pieceRecords'],progress=progress)
    restrictions=[dict(receiverIndex=r.receiver_index,transmitterIndex=r.transmitter_index,receiverId=IDS[r.receiver_index],transmitterId=IDS[r.transmitter_index],
        lower=core.exact_time_token(r.lower),upper=core.exact_time_token(r.upper),lowerQueryIndex=r.lower_query_index,upperQueryIndex=r.upper_query_index) for r in answer.restrictions]
    require(w.equal(packet['restrictions'],restrictions),'candidate restrictions differ from independent replay')
    analysis=plain(answer);require(analysis['accepted'] is False and dict(answer.claims)==CLAIMS,'pure authority boundary')
    return analysis


def candidate_layout(path, packet, pool, *, manifest_binding):
    """Four public files plus one exact retained hardlink generation; one quota."""
    expected={'queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'}
    entries={p.name:p for p in path.parent.iterdir()};private_names=set(entries)-expected
    require(expected<=set(entries) and len(private_names)==4,'closed eight-path publication layout')
    for name in expected:
        names=[n for n in private_names if n.startswith(name+'.partial.') and re.fullmatch('[a-f0-9]{32}',n[len(name+'.partial.'):])]
        require(len(names)==1,'exact predeclared 32-hex private alias');public=entries[name];hidden=entries[names[0]]
        require(public==public.resolve() and hidden==hidden.resolve() and not public.is_symlink() and not hidden.is_symlink(),'publication symlink')
        a,b=os.stat(public,follow_symlinks=False),os.stat(hidden,follow_symlinks=False)
        require(stat.S_ISREG(a.st_mode) and stat.S_ISREG(b.st_mode) and a.st_nlink==b.st_nlink==2 and (a.st_dev,a.st_ino)==(b.st_dev,b.st_ino),'private/public owned hardlink identity')
    result={};total=manifest_binding['bytes']
    for key in ('queries','rows','pieces'):
        b=pool.w.binding(packet[key]);require(b['path']==str(path.parent/(key+'.ndjson')),'candidate stream path/alias')
        obj=pool.capture(b['path'],b['sha256'],data=True,limit=MAX_BYTES);integer(obj.initial.st_size,b['bytes']);result[key]=obj
        total+=b['bytes'];require(total<=MAX_BYTES,'aggregate candidate64MiB quota')
    # Publication ordering is witnessed by a separately supervised producer;
    # timestamps are not used to infer a process event or source identity.
    return result


class Publication:
    def __init__(self,path,live,scientific_bytes_already=0,maximum_stage_output_bytes=MAX_BYTES):
        require(type(scientific_bytes_already) is int and 0<=scientific_bytes_already<MAX_BYTES,'global scientific baseline')
        require(type(maximum_stage_output_bytes) is int and 0<maximum_stage_output_bytes<=MAX_BYTES-scientific_bytes_already,'stage allocation within global ceiling')
        self.path=Path(path);self.live=live;self.private=None;self.identity=None;self.baseline=scientific_bytes_already
        self.maximum=maximum_stage_output_bytes;self.guard_fd=None;self.directory_fd=None
    def publish(self,record):
        self.live();raw=json.dumps(record,sort_keys=True,separators=(',',':'),allow_nan=False).encode()+b'\n';require(len(raw)<=self.maximum and len(raw)+self.baseline<=MAX_BYTES,'global comparison byte bound and stage allocation')
        self.private=self.path.parent/(self.path.name+'.partial.'+os.urandom(16).hex())
        directory=os.stat(self.path.parent,follow_symlinks=False);self.directory_identity=(directory.st_dev,directory.st_ino)
        self.directory_fd=os.open(self.path.parent,os.O_RDONLY|getattr(os,'O_NOFOLLOW',0))
        d=os.fstat(self.directory_fd);require(stat.S_ISDIR(d.st_mode) and (d.st_dev,d.st_ino)==self.directory_identity,'original directory FD')
        with self.private.open('xb',buffering=0) as f:
            self.private=Path(f.name);self.identity=os.fstat(f.fileno());require(f.write(raw)==len(raw),'short comparison write');f.flush();os.fsync(f.fileno())
            self.guard_fd=os.dup(f.fileno())
        before=os.stat(self.private,follow_symlinks=False)
        require((before.st_dev,before.st_ino)==(self.identity.st_dev,self.identity.st_ino),'original private comparison')
        self.live();os.link(self.private,self.path);fd=os.open(self.path.parent,os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
        self.published=self.wire_identity(os.stat(self.path,follow_symlinks=False))
        self.live();self.check();return dict(path=str(self.path),sha256=sha(raw),bytes=len(raw))
    @staticmethod
    def wire_identity(s):return [str(v) for v in (s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)]
    def check(self):
        a=os.stat(self.private,follow_symlinks=False);b=os.stat(self.path,follow_symlinks=False);d=os.stat(self.path.parent,follow_symlinks=False)
        require(self.directory_identity==(d.st_dev,d.st_ino) and (a.st_dev,a.st_ino)==(b.st_dev,b.st_ino)==(self.identity.st_dev,self.identity.st_ino)
            and a.st_nlink==b.st_nlink==2 and stat.S_ISREG(a.st_mode) and stat.S_ISREG(b.st_mode)
            and self.wire_identity(a)==self.wire_identity(b)==self.published,'original private/public comparison and directory')
        if self.guard_fd is not None:require(self.wire_identity(os.fstat(self.guard_fd))==self.published,'retained original comparison FD')
        if self.directory_fd is not None:
            original=os.fstat(self.directory_fd);require((original.st_dev,original.st_ino)==self.directory_identity,'retained original directory FD')
    def reject(self):
        self.close_guards()  # Preserve all failed bytes; no deletion.
    def close_guards(self):
        errors=[]
        for name in ('guard_fd','directory_fd'):
            fd=getattr(self,name);setattr(self,name,None)
            if fd is not None:
                try:os.close(fd)
                except OSError as exc:errors.append(str(exc))
        require(not errors,'publication descriptor closure')


def budget_deadline(token,began):
    require(type(token) is str and 0<len(token)<=1152 and re.fullmatch(r'(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?',token),'bounded remaining duration')
    value=Decimal(token);require(value.is_finite() and len(value.as_tuple().digits)<=1024 and abs(value.as_tuple().exponent)<=1000,'budget precision/exponent')
    exact=Fraction(value);seconds=float(exact);require(0<exact<=1800 and 0<seconds<=1800 and began+seconds>began,'remaining duration range')
    return began+seconds


def complete(record,live):
    keys(record,COMPLETION_KEYS);live();print(json.dumps(record,allow_nan=False),flush=True);live()


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('manifest','manifest-sha256','plan','plan-sha256','verifier-sha256','out','budget-seconds','operation-plan','operation-plan-sha256','scientific-bytes-already','maximum-stage-output-bytes'):parser.add_argument('--'+name,required=True)
    parser.add_argument('--repo-root');args=parser.parse_args(argv)
    require(re.fullmatch(r'(?:0|[1-9][0-9]*)',args.scientific_bytes_already) and re.fullmatch(r'[1-9][0-9]*',args.maximum_stage_output_bytes),'canonical original stage byte allocation')
    require(0<=int(args.scientific_bytes_already)<MAX_BYTES and 0<int(args.maximum_stage_output_bytes)<=MAX_BYTES-int(args.scientific_bytes_already),'stage allocation before scientific comparison')
    began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began);root=Path(__file__).resolve().parents[2]
    require(args.repo_root is None or Path(args.repo_root)==root,'executing repository root')
    path=Path(args.manifest).absolute();output=Path(args.out).absolute();lane=root/LANE
    require(path==path.resolve() and path.name=='cover-manifest.json' and path.parent.parent==lane and lane==lane.resolve(),'canonical direct-child manifest')
    require(output==output.resolve() and output.name=='comparison.json' and output.parent==Path(str(path.parent)+'-outer') and output.parent.is_dir() and not output.exists() and not output.is_symlink(),'fresh canonical outer comparison')
    publication=None;progress=dict(stage='capture',completedQueries=0,completedRows=0,accepted=False)
    def live():require(time.monotonic()<deadline,'inclusive comparison deadline')
    def beat(*_):
        live();print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True);live()
        signal.setitimer(signal.ITIMER_REAL,min(15,max(.000001,deadline-time.monotonic())))
    previous=signal.signal(signal.SIGALRM,beat);signal.setitimer(signal.ITIMER_REAL,min(15,deadline-began))
    try:
        transport_path,transport_sha=DEPENDENCIES['transport']
        with bootstrap(root/transport_path,transport_sha,live) as raw, captured_module(raw,root/transport_path,transport_sha) as w, ExitStack() as stack:
            pool=Pool(stack,w,root,live);own=pool.capture(SELF,args.verifier_sha256,data=True,limit=MAX_BYTES)
            require(compile(own.data,_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize)==_EXECUTING_CODE,'executing verifier source differs')
            loaded={}
            for role in ('scientificDecoder','comparisonReference','independentRootReference'):
                p,h=(NAMED if role in NAMED else DEPENDENCIES)[role];f=pool.capture(p,h,data=True,limit=MAX_BYTES);loaded[role]=stack.enter_context(captured_module(f.data,root/p,h))
            decoder,core,ref=(loaded[k] for k in ('scientificDecoder','comparisonReference','independentRootReference'))
            launch=pool.capture(args.plan,args.plan_sha256,data=True,limit=MAX_BYTES);plan=validate_plan(w,decode_role(w,decoder,launch.data,'plan'),args.verifier_sha256,root)
            pool.admit_operation(args.operation_plan,args.operation_plan_sha256)
            pool.routes=historical_routes(plan['historicalDocumentRoutes'],root,w)
            pool.outputs={str(Path(args.manifest).parent/n) for n in ('queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json')}|{str(output)}
            subject=[pool.read_binding(plan[k]) for k in NAMED]+[pool.read_binding(plan['dependencies'][k]) for k in DEPENDENCIES]
            subject=sorted(subject,key=lambda b:b['path']);originals={k:pool.read_binding(plan['originalBindings'][k]) for k in ORIGINAL}
            owner=pool.read_binding(plan['acceptanceOwner']);owner_raw=pool.read_binding(plan['acceptanceOwner'],data=True)
            runtime=set()
            for group in ('runtimeBindings','operationalBindings'):
                for b in plan[group]:
                    actual=pool.read_binding(b)
                    if group=='runtimeBindings':runtime.add(Path(actual['path']))
            excluded=[root/SELF,root/transport_path,*[root/(NAMED if k in NAMED else DEPENDENCIES)[k][0] for k in loaded]]
            def check_runtime():
                require(Path(sys.executable).resolve() in runtime and Path(sys.executable).absolute().parent.parent/'pyvenv.cfg' in runtime,'shared interpreter/config absent')
                require(w.runtime_paths(excluded)<=runtime,'loaded runtime outside plan');live()
            check_runtime()
            docs={k:decode_role(w,decoder,pool.read_binding(plan['originalBindings'][k],data=True),k) for k in ('export','reconstruction','guards','fullPlan','fullManifest','fullComparison','fullAdmission')}
            for k in ('fullLauncherLog','fullResourceLog'):docs[k]=pool.read_binding(plan['originalBindings'][k],data=True)
            historical=authenticate_full(w,ref,docs,originals,pool.read_binding(plan['originalBindings']['fullEntry'],data=True),owner_raw,pool)
            original_rows=records(pool.read_binding(plan['originalBindings']['fullRows'],data=True),decoder.decode_document,10240,live=live)
            original_pieces=records(pool.read_binding(plan['originalBindings']['fullPieces'],data=True),decoder.decode_document,17920,live=live)
            progress['stage']='original-parent-membership'
            histories,parent=original_projection(ref,docs['export'],original_rows,original_pieces,originals['fullManifest'],parent_index=plan['parentIndex'],live=live)
            check_runtime()
            manifest=pool.capture(path,args.manifest_sha256,data=True,limit=MAX_BYTES);packet=decode_role(w,decoder,manifest.data,'manifest');keys(packet,MANIFEST_KEYS)
            files=candidate_layout(path,packet,pool,manifest_binding=manifest.binding())
            streams={k:v.binding() for k,v in files.items()}
            for key,record_key,n in (('queries','queryRecords',3584),('rows','rowRecords',64),('pieces','pieceRecords',112)):
                streams[record_key]=records(files[key].data,decoder.decode_document,n,live=live)
            streams.update(producer=pool.read_binding(plan['producer']),verifier=own.binding(),declaration=pool.read_binding(plan['declaration']),acceptanceOwner=owner,subjectSourceBindings=subject,
                runtimeBindings=[w.normalized(b,root) for b in plan['runtimeBindings']],operationalBindings=[w.normalized(b,root) for b in plan['operationalBindings']])
            progress['stage']='independent-query-and-final-cover'
            def advance(q,r):live();progress.update(completedQueries=q,completedRows=r)
            analysis=compare_manifest(w,core,ref,packet,plan,launch.binding(),originals,historical,parent,histories,streams,progress=advance)
            progress['stage']='source-rechecks';check_runtime();pool.recheck();candidate_layout(path,packet,pool,manifest_binding=manifest.binding())
            report=dict(schema=REPORT_SCHEMA,scope=parent_scope(plan['parentIndex']),accepted=True,authority='source-bound independent original-parent query replay and conditional final cover only',
                manifest=manifest.binding(),queries=streams['queries'],rows=streams['rows'],pieces=streams['pieces'],launchPlan=launch.binding(),verifier=own.binding(),
                sourceBindings=pool.bindings(),historicalSourceBindings=historical,originalBindings=originals,acceptanceOwner=owner,priorCoverClosure=plan['priorCoverClosure'],parent=parent,
                analysis=analysis,candidateClaims=dict(CLAIMS),publicationRequires=PUBLICATION_REQUIRES,elapsedSecondsBeforePublication=time.monotonic()-began)
            require(re.fullmatch(r'(?:0|[1-9][0-9]*)',args.scientific_bytes_already) and re.fullmatch(r'[1-9][0-9]*',args.maximum_stage_output_bytes),'canonical global byte baseline and stage allocation')
            keys(report,REPORT_KEYS);publication=Publication(output,live,int(args.scientific_bytes_already),int(args.maximum_stage_output_bytes));result=publication.publish(report)
            emitted=pool.capture(output,result['sha256'],limit=MAX_BYTES);integer(emitted.initial.st_size,result['bytes'])
            pool.recheck();check_runtime();candidate_layout(path,packet,pool,manifest_binding=manifest.binding())
            identities=pool.identities();progress['stage']='cleanup'
        # Private modules and original descriptors are now closed. Silent
        # cleanup mutation/import is failure, not a new accepted generation.
        progress['stage']='post-cleanup-rechecks';live();check_runtime()
        final_recapture(w,identities,live)
        candidate_layout(path,packet,pool,manifest_binding=manifest.binding());check_runtime();live()
        publication.check()
        publication.close_guards();publication.check()
        complete(dict(completed=True,accepted=True,scope=parent_scope(plan['parentIndex']),output=result,
            publicationRecord=dict(binding=result,privatePath=str(publication.private),identity=publication.published),
            elapsedSecondsBeforeCompletion=time.monotonic()-began,publicationRequires=PUBLICATION_REQUIRES),live);publication.check();live()
    except BaseException as exc:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(exc)[:4096],'privateAttemptPreserved':str(publication.private) if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        try:signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
        except BaseException:
            if publication is not None:publication.reject()
            raise
    if time.monotonic()>=deadline:
        if publication is not None:publication.reject()
        raise ValueError('post-watch-cleanup deadline')


if __name__=='__main__':
    try:main()
    except BaseException as exc:
        if isinstance(exc,SystemExit):raise
        sys.exit(1)
