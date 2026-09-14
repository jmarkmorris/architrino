#!/usr/bin/env python3
"""Source-bound independent comparison of one refined F6c acceleration cell.

CLI: --candidate FILE --candidate-sha256 SHA --plan FILE --plan-sha256 SHA
--verifier-sha256 SHA --out NEW --budget-seconds REMAINING [--repo-root ROOT].
Candidate is D/range.json, output D-outer/comparison.json, in the canonical
.local-data/braid-analysis/f6c-refined-acceleration-20260827 lane. This program
does not create a producer, launch a calculation, search roots, choose settings,
or grant physics/metric/execution authority. Conditional comparison acceptance
requires a matching fresh successful completion AND external inclusive deadline
and owned-process closure. An accepted file alone is not admissible evidence.

Plan and candidate field sets are constants below. Future consumer/controls and
operational generations are explicit byte bindings from a separately reviewed
plan, never invented hashes or assertions that those unbuilt tools have run.
The immutable projection declaration is also the source of the externally
observed prior whole-attempt closure. Its observation is a named premise, not
reconstructed from the prior admission's prepublication elapsed field.

Only private captured generations of the cc26 independent comparison and 63db
pure projection core execute. Their source files and controls remain unchanged;
no producer or acceleration subject is imported. cc26.authenticate_prior receives
ONLY its original broad-cover role map. New refined source/operation consistency
is checked separately, without invoking the old common-emission projection.
Raw query bytes/counts are authenticated, not rerun. The new pure core owns the
original mapping and independently derived range-containment comparison.

Transport metadata uses exact signed64 integers for filesystem timestamps and
bounded Decimal timing values, with the same structural/file limits. Only an
operational admission receives the131072-character string class; proof,
comparison and log metadata retain8192. Scientific documents always use the
unchanged frozen core data decoder. There is no retry or filename exception.
"""
from __future__ import annotations

if 'OPTION_B_PRODUCTION_IDENTITIES' not in globals():
    import hashlib as _b_hashlib, json as _b_json, os as _b_os, stat as _b_stat, sys as _b_sys, types as _b_types
    from pathlib import Path as _b_Path
    _b_root = _b_Path(__file__).resolve().parents[2]
    _b_held = {}
    def _b_identity(path):
        value = path.lstat()
        return (value.st_dev, value.st_ino, value.st_size, value.st_mtime_ns, value.st_ctime_ns)
    def _b_capture(relative, expected=None):
        if (type(relative) is not str or not relative or '\\' in relative
                or _b_Path(relative).is_absolute() or any(p in ('', '.', '..') for p in relative.split('/'))):
            raise ValueError('Unsafe selected Python bootstrap path')
        path = _b_root / relative
        if path.resolve() != path or not _b_stat.S_ISREG(path.lstat().st_mode):
            raise ValueError('Canonical regular Python bootstrap source required')
        before = _b_identity(path)
        if relative in _b_held and _b_held[relative] != before:
            raise ValueError('Selected Python bootstrap source replaced')
        fd = _b_os.open(path, _b_os.O_RDONLY | _b_os.O_NONBLOCK | _b_os.O_NOFOLLOW)
        try:
            value = _b_os.fstat(fd)
            if not _b_stat.S_ISREG(value.st_mode) or not 0 < value.st_size <= 16 * 1024**2:
                raise ValueError('Bounded Python bootstrap source required')
            parts = []; size = 0
            while size < value.st_size:
                part = _b_os.read(fd, min(65536, value.st_size-size))
                if not part: raise ValueError('Truncated Python bootstrap source')
                parts.append(part); size += len(part)
            raw = b''.join(parts); value = _b_os.fstat(fd)
            if before != (value.st_dev,value.st_ino,value.st_size,value.st_mtime_ns,value.st_ctime_ns) or before != _b_identity(path):
                raise ValueError('Selected Python bootstrap source changed during capture')
        finally:
            _b_os.close(fd)
        if expected is not None and _b_hashlib.sha256(raw).hexdigest() != expected:
            raise ValueError('Selected Python bootstrap digest differs')
        _b_held[relative] = before
        return raw
    def _b_unique(pairs):
        result = {}
        for key,value in pairs:
            if key in result: raise ValueError('Duplicate selected Python bootstrap key')
            result[key] = value
        return result
    def _b_decode(raw): return _b_json.loads(raw, object_pairs_hook=_b_unique)
    def _b_recheck():
        for relative,identity in _b_held.items():
            if _b_identity(_b_root/relative) != identity:
                raise ValueError('Retained Python bootstrap source replaced')
    _b_selection = _b_decode(_b_capture('reference/priorities/development-process-review/contracts/option-b-production-selection.json'))
    _b_accepted = _b_decode(_b_capture(_b_selection['acceptedBaseline'], _b_selection['acceptedBaselineSha256']))
    _b_profiles = [p for p in _b_accepted['profiles'] if p['name'] == 'production-source-records']
    if len(_b_profiles) != 1: raise ValueError('One selected production bootstrap profile required')
    _b_map = _b_decode(_b_profiles[0]['manifestRaw'])
    _b_path = 'scripts/eom/production_source_records.py'
    _b_rows = [r for r in _b_map['@graph'] if r.get('@type') == 'Source' and r.get('binding',{}).get('path') == _b_path]
    if (len(_b_rows) != 1 or _b_rows[0]['role'] != 'scientific-contract'
            or _b_rows[0]['binding']['selector'] != {'kind':'whole'}
            or _b_rows[0]['binding']['contract'] != 'fixed-byte-selection/v1'):
        raise ValueError('Exact selected Python production bridge required')
    _b_raw = _b_capture(_b_path, _b_rows[0]['binding']['sha256'])
    _b_bridge = _b_types.ModuleType('_admitted_f6c_bridge_' + str(id(_b_held)))
    _b_bridge.__file__ = str(_b_root/_b_path)
    _b_sys.modules[_b_bridge.__name__] = _b_bridge
    _b_recheck()
    exec(compile(_b_raw,_b_bridge.__file__,'exec',dont_inherit=True),_b_bridge.__dict__)
    _b_recheck()
    def _b_call(name, *args, **kwargs):
        _b_recheck()
        result = getattr(_b_bridge,name)(*args,**kwargs)
        _b_recheck()
        return result
    production_identities = lambda *args,**kwargs: _b_call('production_identities',*args,**kwargs)
    production_source_pair = lambda *args,**kwargs: _b_call('production_source_pair',*args,**kwargs)
    production_recheck = lambda: _b_call('production_recheck')
    production_historical_record = lambda *args,**kwargs: _b_call('production_historical_record',*args,**kwargs)
    production_runtime_binding = lambda: _b_call('production_runtime_binding')
    production_original_source_binding = lambda *args, **kwargs: _b_call('production_original_source_binding', *args, **kwargs)
    OPTION_B_PRODUCTION_IDENTITIES = production_identities(__file__)

if ('OPTION_B_PRODUCTION_IDENTITIES' not in globals()
        or type(OPTION_B_PRODUCTION_IDENTITIES) is not tuple
        or len(OPTION_B_PRODUCTION_IDENTITIES) != 18):
    raise RuntimeError('Admitted production host must supply the original identity tuple')

import argparse
from contextlib import ExitStack, contextmanager
from dataclasses import asdict
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
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF='scripts/eom/verify-f6c-refined-acceleration.py'
CONTROLS='tests/test_f6c_refined_acceleration.py'
CONSUMER='scripts/eom/prepare-f6c-refined-acceleration.py'
CONSUMER_CONTROLS='tests/test_f6c_refined_acceleration_preparation.py'
DECLARATION='reference/priorities/braid-program/evidence/2026-08-27-f6c-refined-cover-acceleration-projection.md'
DECLARATION_SHA=OPTION_B_PRODUCTION_IDENTITIES[0]
CORE='scripts/eom/oracle/f6c_refined_acceleration_conformance.py'
CORE_SHA=OPTION_B_PRODUCTION_IDENTITIES[1]
REFERENCE='scripts/eom/verify-f6c-continuous-reception-acceleration.py'
REFERENCE_SHA=OPTION_B_PRODUCTION_IDENTITIES[2]
NAMED={
 'consumer':(CONSUMER,None),'consumerControls':(CONSUMER_CONTROLS,None),
 'verifier':(SELF,None),'verifierControls':(CONTROLS,None),
 'declaration':(DECLARATION,DECLARATION_SHA),
 'comparisonCore':(CORE,CORE_SHA),
 'comparisonCoreControls':('tests/test_f6c_refined_acceleration_conformance.py',OPTION_B_PRODUCTION_IDENTITIES[3]),
 'rangeReference':('scripts/eom/oracle/continuous_reception_acceleration.py',OPTION_B_PRODUCTION_IDENTITIES[4]),
 'rangeReferenceControls':('tests/test_eom_continuous_reception_acceleration.py',OPTION_B_PRODUCTION_IDENTITIES[5]),
 'rangeComparison':(REFERENCE,REFERENCE_SHA),
 'rangeComparisonControls':('tests/test_f6c_continuous_reception_acceleration.py',OPTION_B_PRODUCTION_IDENTITIES[6])}
PRIOR_BASE='.local-data/braid-analysis/f6c-emission-refinement-20260827/pilot-cell-0-v2'
REFINED=(
 ('queries',PRIOR_BASE+'/queries.ndjson',OPTION_B_PRODUCTION_IDENTITIES[7]),
 ('rows',PRIOR_BASE+'/rows.ndjson',OPTION_B_PRODUCTION_IDENTITIES[8]),
 ('pieces',PRIOR_BASE+'/pieces.ndjson',OPTION_B_PRODUCTION_IDENTITIES[9]),
 ('manifest',PRIOR_BASE+'/cover-manifest.json',OPTION_B_PRODUCTION_IDENTITIES[10]),
 ('comparison',PRIOR_BASE+'-outer/comparison.json',OPTION_B_PRODUCTION_IDENTITIES[11]),
 ('admission',PRIOR_BASE+'-outer/pilot-admission.json',OPTION_B_PRODUCTION_IDENTITIES[12]),
 ('plan','reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-launch.v2.json',OPTION_B_PRODUCTION_IDENTITIES[13]))
PRIOR_OPERATIONS=(
 ('launcherLog',PRIOR_BASE+'-outer/launcher-stderr.log',OPTION_B_PRODUCTION_IDENTITIES[14],8671),
 ('resourceLog',PRIOR_BASE+'-outer/resource-observations.ndjson',OPTION_B_PRODUCTION_IDENTITIES[15],471433))
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
SCOPE='refined-pilot-cell-0-range'
PLAN_SCHEMA='braid-program/f6c-refined-acceleration-launch.v1'
CANDIDATE_SCHEMA='braid-program/f6c-refined-acceleration-candidate.v1'
REPORT_SCHEMA='braid-program/f6c-refined-acceleration-conformance.v1'
MAX_BYTES=64*1024**2
MAX_SOURCE_BYTES=1024**3
LIMIT=1800
HEARTBEAT=15
LIMITS=dict(inclusiveSeconds=1800,maximumAggregateRssBytes=2*1024**3,maximumRssSampleGapMs=1000,
 heartbeatSeconds=15,admissionFreeMemoryPercent=40,admissionDiskBytes=64*1024**3,
 stopFreeMemoryBelowPercent=20,stopDiskBelowBytes=16*1024**3,hostObservationSeconds=15,
 hostObservationTimeoutSeconds=2,maximumScientificFileBytes=MAX_BYTES,maximumOutputFileBytes=MAX_BYTES,
 maximumCombinedLogBytes=16*1024**2,serialWorkers=1,eomWorkers=0)
OPERATIONS=('scripts/eom/run-f6c-refined-acceleration-pilot.mjs',
 'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs',
 'tests/f6c-refined-acceleration-pilot.test.js','tests/f6c-refined-acceleration-pilot-process.test.js',
 'scripts/eom/launch-prescribed-response-pilot.mjs','scripts/eom/launch-subfield-circular-root-pilot.mjs',
 '/bin/ps','/usr/bin/memory_pressure')
OP_PINS={'scripts/eom/launch-prescribed-response-pilot.mjs':OPTION_B_PRODUCTION_IDENTITIES[16],
 'scripts/eom/launch-subfield-circular-root-pilot.mjs':OPTION_B_PRODUCTION_IDENTITIES[17],
}
PLAN_KEYS=('schema','scope',*NAMED,'runtimeBindings','operationalBindings','limits','priorRefinementClosure')
CANDIDATE_KEYS=tuple('schema scope status accepted launchPlan consumer declaration verifier sourceBindings ancestryBindings refinementBindings runtimeBindings operationalBindings priorRefinementClosure projection ranges census claims publicationRequires'.split())
CANDIDATE_FLAGS=tuple('historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted rootsEvaluated independentRangeComparisonPassed executionAuthorized'.split())
CENSUS=dict(cells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,pieceRecords=112)
PUBLICATION_REQUIRES='matching fresh successful completion, externally observed inclusive deadline and owned-process closure'
CANDIDATE_PUBLICATION='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes'
HEX=re.compile(r'[a-f0-9]{64}\Z')
METADATA_TOKEN=re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\Z')
SCIENTIFIC_DOCUMENT_ROLES=frozenset(('export','manifest','priorPlan','plan','candidate'))
METADATA_DOCUMENT_ROLES=frozenset(('comparison','reconstruction','guards','completion','launcherLog','resourceLog'))








class _ProductionOriginal:
    """Original logical binding backed by an independently owned archive handle."""
    def __init__(self, physical, logical):
        object.__setattr__(self,'_physical',physical)
        object.__setattr__(self,'path',logical)
    def __getattr__(self,name):return getattr(self._physical,name)
    def __setattr__(self,name,value):setattr(self._physical,name,value)
    def binding(self):
        result=self._physical.binding();result['path']=str(self.path);return result
    def physical_binding(self):return self._physical.binding()
    def recheck(self):
        result=self._physical.recheck()
        if isinstance(result,dict) and 'path' in result:
            result=dict(result);result['path']=str(self.path)
        return result


@contextmanager
def _production_capture(cls, filename, digest, **kwargs):
    from pathlib import Path as _Path
    _root=_Path(__file__).resolve().parents[2];_path=_Path(filename)
    if not _path.is_absolute():_path=_root/_path
    try:_relative=_path.relative_to(_root).as_posix()
    except ValueError:_binding=None
    else:
        if _path!=_path.resolve():raise ValueError('noncanonical original capture')
        _binding=production_original_source_binding(_root,__file__,_relative,optional=True)
        if _binding is not None:
            from hashlib import sha256 as _sha256
            _,_current,_=production_source_pair(_root,__file__,_relative)
            _binding=None if _sha256(_current).hexdigest()==digest else production_original_source_binding(_root,__file__,_relative,digest)
    _physical=_Path(_binding['path']) if _binding is not None else _path
    production_recheck()
    with cls(_physical,digest,**kwargs) as _held:
        if _binding is not None and (_held.binding()['bytes']!=_binding['bytes'] or _held.binding()['sha256']!=_binding['sha256']):raise ValueError('original archive identity differs')
        try:yield _ProductionOriginal(_held,_path) if _binding is not None else _held
        finally:
            if _binding is not None:_held.recheck()
            production_recheck()

def _production_current_source(raw):
    from pathlib import Path as _Path
    _root=_Path(__file__).resolve().parents[2]
    _original,_current,_=production_source_pair(_root,__file__,_Path(__file__).resolve().relative_to(_root).as_posix())
    require(raw==_original or raw==_current,'executing source is not the selected equivalent generation')
    production_recheck()
    return _current

def _production_exec(raw, filename, namespace, *, optimize=-1):
    """Execute the proven current representation or the exact older original."""
    from pathlib import Path as _Path
    from hashlib import sha256 as _sha256
    _root=_Path(__file__).resolve().parents[2];_path=_Path(filename)
    if not _path.is_absolute():_path=_root/_path
    try:_relative=_path.relative_to(_root).as_posix()
    except ValueError:_binding=None
    else:
        if _path!=_path.resolve():raise ValueError('noncanonical captured module')
        _binding=production_original_source_binding(_root,__file__,_relative,optional=True)
    if _binding is not None:
        _original,_current,_identities=production_source_pair(_root,__file__,_relative)
        if raw==_original or raw==_current:
            raw=_current
            namespace['OPTION_B_PRODUCTION_IDENTITIES']=_identities
            for _key in ('production_identities','production_source_pair','production_recheck','production_historical_record','production_runtime_binding','production_original_source_binding'):
                namespace[_key]=globals()[_key]
        else:
            _historical,_,_=production_source_pair(_root,__file__,_relative,_sha256(raw).hexdigest())
            if raw!=_historical:raise ValueError('captured older original differs')
    production_recheck()
    try:exec(compile(raw,str(filename),'exec',dont_inherit=True,optimize=optimize),namespace)
    finally:production_recheck()

def require(ok,message):
    if not ok:raise ValueError(message)


def equal(a,b):
    if type(a) is not type(b):return False
    if type(a) is dict:return a.keys()==b.keys() and all(equal(a[k],b[k])for k in a)
    if type(a) in (list,tuple):return len(a)==len(b) and all(equal(x,y)for x,y in zip(a,b))
    return a==b


def keys(v,names):require(type(v) is dict and set(v)==set(names),'closed fields differ')
def sha(raw):return hashlib.sha256(raw).hexdigest()
def encoded(v):return json.dumps(v,sort_keys=True,separators=(',',':'),allow_nan=False).encode()+b'\n'
def false_flags(v,names):keys(v,names);require(all(x is False for x in v.values()),'authority promoted')


def decode_operational(raw,*,document_class='data'):
    """Bounded transport JSON only; this is not a scientific-value decoder.

    Signed64 timestamp tokens and fractional timing are retained exactly. The
    caller selects admission mode by semantic role, never after a parse failure.
    Lexical bounds precede potentially expensive integer/Decimal conversion.
    """
    require(type(document_class)is str and document_class in ('data','operational-receipt'),'unknown document class')
    require(type(raw)is bytes and 0<len(raw)<=MAX_BYTES,'bounded original metadata bytes')
    string_limit=131072 if document_class=='operational-receipt'else 8192
    def integer(token):
        digits=token[1:]if token.startswith('-')else token
        require(0<len(digits)<=19,'signed64 integer lexical bound')
        value=int(token);require(-(2**63)<=value<=2**63-1,'signed64 integer bound');return value
    def decimal(token):
        require(0<len(token)<=1152 and METADATA_TOKEN.fullmatch(token),'metadata decimal lexical bound')
        mantissa,*exponent=re.split('[eE]',token)
        exp_token=exponent[0]if exponent else '0'
        # A valid final Decimal exponent can differ from the written exponent
        # by at most the bounded fractional digit count; four digits suffice.
        require(len(exp_token.lstrip('+-0'))<=4,'metadata exponent lexical bound')
        exp=int(exp_token);fractional=len(mantissa.split('.',1)[1])if '.'in mantissa else 0
        digits=mantissa.lstrip('-').replace('.','').lstrip('0')or'0'
        require(len(digits)<=1024 and abs(exp-fractional)<=1000,'metadata decimal precision/exponent bound')
        value=Decimal(token);require(value.is_finite() and len(value.as_tuple().digits)<=1024 and abs(value.as_tuple().exponent)<=1000,'metadata decimal bound');return value
    def pairs(items):
        require(len(items)<=10000,'metadata object bound');result={}
        for key,value in items:
            require(type(key)is str and len(key)<=4096,'metadata key bound')
            require(key not in result,'duplicate JSON key');result[key]=value
        return result
    def reject(_):raise ValueError('nonfinite metadata number')
    try:value=json.loads(raw.decode('utf-8',errors='strict'),object_pairs_hook=pairs,parse_int=integer,parse_float=decimal,parse_constant=reject)
    except RecursionError as exc:raise ValueError('metadata nesting bound')from exc
    count=0;size=0
    def visit(v,depth):
        nonlocal count,size
        count+=1;size+=2;require(depth<=24 and count<=1000000 and size<=MAX_BYTES,'metadata structure/byte bound')
        t=type(v)
        if t is str:
            require(len(v)<=string_limit,'metadata string bound');size+=len(v.encode('utf-8',errors='strict'));require(size<=MAX_BYTES,'metadata byte bound')
        elif t is dict:
            require(len(v)<=10000,'metadata object bound')
            for k,x in v.items():visit(k,depth+1);visit(x,depth+1)
        elif t is list:
            require(len(v)<=20000,'metadata array bound')
            for x in v:visit(x,depth+1)
        else:require(v is None or t in (bool,int,Decimal),'metadata exact builtin leaf')
    visit(value,0);return value


def decode_role(core,raw,role):
    """Closed semantic routing; only admissions permit long provenance strings."""
    require(type(role)is str,'document role type')
    if role in SCIENTIFIC_DOCUMENT_ROLES:return core.decode_document(raw)
    if role in METADATA_DOCUMENT_ROLES:return decode_operational(raw)
    if role=='admission':return decode_operational(raw,document_class='operational-receipt')
    raise ValueError('unknown document role')


def binding(v):
    keys(v,('path','sha256','bytes'))
    require(type(v['path']) is str and 0<len(v['path'])<=2048 and '\0' not in v['path'],'binding path')
    p=Path(v['path']);require(str(p)==v['path'] and '..' not in p.parts,'canonical binding token')
    require(type(v['sha256']) is str and HEX.fullmatch(v['sha256']),'binding hash')
    require(type(v['bytes']) is int and 0<v['bytes']<=MAX_SOURCE_BYTES,'binding byte count')
    return v


def normalized(v,root):return {**binding(v),'path':str(root/v['path'])}
def binding_list(v,count=None):
    require(type(v) is list and 0<len(v)<=512 and (count is None or len(v)==count),'binding census')
    for b in v:binding(b)
    require(len({b['path']for b in v})==len(v),'duplicate binding path')


def closure_premise():
    return dict(authority='externally-reviewed-caller-observation',ownerSha256=DECLARATION_SHA,
      admissionSha256=dict((k,h)for k,_,h in REFINED)['admission'],matchingFreshCompletionObserved=True,
      exitCode=0,elapsedSeconds='238.116677375',processesClosed=True,independentAuditAccepted=True)


def validate_plan(plan,own_sha):
    keys(plan,PLAN_KEYS);require(plan['schema']==PLAN_SCHEMA and plan['scope']==SCOPE and equal(plan['limits'],LIMITS),'plan scope/limits')
    for key,(p,h)in NAMED.items():
        b=binding(plan[key]);require(b['path']==p and (h is None or b['sha256']==h),'named source generation: '+key)
    require(plan['verifier']['sha256']==own_sha,'verifier generation')
    for k in ('runtimeBindings','operationalBindings'):binding_list(plan[k])
    ops={b['path']:b['sha256']for b in plan['operationalBindings']}
    require(set(OPERATIONS)<set(ops) and len(ops)==9,'complete operational closure plus Node')
    node=next(iter(set(ops)-set(OPERATIONS)))
    require(Path(node).is_absolute() and Path(node).name=='node','resolved Node binding')
    for p,h in OP_PINS.items():require(ops[p]==h,'frozen operational helper differs')
    require(equal(plan['priorRefinementClosure'],closure_premise()),'external final closure premise')
    seen={}
    for b in [*[plan[k]for k in NAMED],*plan['runtimeBindings'],*plan['operationalBindings']]:
        require(b['path'] not in seen or equal(seen[b['path']],b),'conflicting source binding');seen[b['path']]=b
    return plan


class BoundFile:
    def __init__(self,path,digest,*,capture=False,limit=MAX_BYTES,live=lambda:None):
        self.path=Path(path).absolute();self.digest=digest;self.capture=capture;self.limit=limit;self.live=live;self.fd=None;self.data=None
    @staticmethod
    def identity(s):return s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns
    def __enter__(self):
        self.live();require(type(self.digest)is str and HEX.fullmatch(self.digest),'expected input hash')
        require(self.path==self.path.resolve(),'symlink/alias input')
        self.fd=os.open(self.path,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
        try:
            self.initial=os.fstat(self.fd);require(stat.S_ISREG(self.initial.st_mode) and 0<self.initial.st_size<=self.limit,'bounded regular input')
            self.data,digest=self.scan(self.capture);require(digest==self.digest,'input hash differs');self.check_path();return self
        except BaseException:self.__exit__();raise
    def scan(self,capture=False):
        os.lseek(self.fd,0,os.SEEK_SET);h=hashlib.sha256();parts=[];count=0
        while count<self.initial.st_size:
            self.live();part=os.read(self.fd,min(65536,self.initial.st_size-count));require(part,'truncated input');h.update(part);count+=len(part)
            if capture:parts.append(part)
        require(not os.read(self.fd,1),'input grew');require(self.identity(os.fstat(self.fd))==self.identity(self.initial),'input changed during capture')
        return (b''.join(parts)if capture else None),h.hexdigest()
    def check_path(self):
        require(self.path==self.path.resolve() and self.identity(os.stat(self.path,follow_symlinks=False))==self.identity(self.initial),'bound path replaced')
    def recheck(self):require(self.scan()[1]==self.digest,'source hash changed');self.check_path();self.live()
    def binding(self):return dict(path=str(self.path),sha256=self.digest,bytes=self.initial.st_size)
    def __exit__(self,*_):
        if self.fd is not None:os.close(self.fd)
        self.fd=None


def executing_source(raw):
    require(compile(_production_current_source(raw),_EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize)==_EXECUTING_CODE,'executing source differs')


@contextmanager
def captured_references(core_bytes,reference_bytes):
    require(sha(core_bytes)==CORE_SHA and sha(reference_bytes)==REFERENCE_SHA,'captured mathematical generation differs')
    modules=[]
    try:
        for kind,raw,filename in (('comparison',reference_bytes,REFERENCE),('core',core_bytes,CORE)):
            name='_f6c_refined_'+kind+'_'+str(id(raw));require(name not in sys.modules,'private module collision')
            module=ModuleType(name);module.__file__=str(Path(__file__).resolve().parents[2]/filename);sys.modules[name]=module;modules.append(module)
            _production_exec(raw, module.__file__, module.__dict__)
        yield modules[1],modules[0]
    finally:
        for module in reversed(modules):sys.modules.pop(module.__name__,None)


def runtime_paths(excluded=()):
    paths={Path(sys.executable).resolve()};excluded={Path(p).resolve()for p in excluded}
    for module in tuple(sys.modules.values()):
        for key in ('__file__','__cached__'):
            p=getattr(module,key,None)
            if type(p)is str:
                p=Path(p).resolve()
                if p.is_file() and p not in excluded:paths.add(p)
    return paths


def records(core,raw,count):
    require(type(raw)is bytes and 0<len(raw)<=MAX_BYTES and raw.endswith(b'\n'),'terminated bounded stream')
    lines=raw.split(b'\n')[:-1];require(len(lines)==count and all(0<len(x)<=131072 for x in lines),'raw line/census bound')
    result=[core.decode_document(x)for x in lines];require(all(type(x)is dict for x in result),'null/nonobject is not EOF')
    return result


def source_map(bindings,root):
    result={}
    for b in bindings:
        b=normalized(b,root);old=result.get(b['path']);require(old is None or equal(old,b),'conflicting source generation');result[b['path']]=b
    return result


def authenticate_refinement(docs,refined,ancestry,root,decode,read_binding):
    """Original-byte/receipt consistency only; no query or geometric replay.

    read_binding checks each referenced regular file's original hash and bytes.
    The external final closure lives in the separately pinned declaration.
    """
    m,c,a,p=(docs[k]for k in ('manifest','comparison','admission','plan'))
    require(p['schema']=='braid-program/f6c-emission-refinement-launch.v1' and p['scope']=='pilot-cell-0-emission-refinement','prior plan schema/scope')
    keys(p,('schema','scope',*PRIOR_NAMED,'subjectSourceBindings','runtimeBindings','operationalBindings','limits','priorCoverClosure'))
    require(equal(p['limits'],LIMITS),'prior fixed limits')
    prior_closure=dict(authority='externally-reviewed-caller-observation',ownerSha256=ancestry['priorClosureOwner']['sha256'],
        admissionSha256=ancestry['admission']['sha256'],matchingFreshCompletionObserved=True,exitCode=0,
        elapsedSeconds='8.534247625',processesClosed=True,independentAuditAccepted=True)
    require(equal(p['priorCoverClosure'],prior_closure),'original broad-cover closure differs')
    binding_list(p['subjectSourceBindings'],15);binding_list(p['runtimeBindings'],159);binding_list(p['operationalBindings'],9)
    require({b['path']for b in p['subjectSourceBindings']}==set(PRIOR_SUBJECT_PATHS),'complete fifteen subject paths')
    expected=source_map([*ancestry.values(),*[p[k]for k in PRIOR_NAMED],*p['subjectSourceBindings'],*p['runtimeBindings'],*p['operationalBindings'],refined['plan']],root)
    binding_list(a['sourceBindings'],202);require(equal(source_map(a['sourceBindings'],root),expected),'complete202-source chain differs')
    for b in expected.values():read_binding(b)
    require(m['schema']=='braid-program/f6c-emission-refinement-cover.v1' and m['scope']=='pilot-cell-0-emission-refinement' and m['status']=='conditional_complete' and m['accepted'] is False,'refined manifest disposition')
    require(c['schema']=='braid-program/f6c-emission-refinement-conformance.v1' and c['scope']==m['scope'] and c['status']=='conditional-comparison-complete' and c['accepted'] is True,'refined comparison disposition')
    require(a['schema']=='braid-program/f6c-emission-refinement-pilot-admission.v1' and a['scope']==m['scope'] and a['accepted'] is True and a['processesClosed'] is True,'refined admission disposition')
    elapsed=a['elapsedSecondsBeforePublication']
    require(type(elapsed)in(int,Decimal) and Fraction(0)<=Fraction(elapsed)<Fraction('238.116677375'),'prior prepublication time outside fresh closure')
    for obj,key,role in ((m,'launchPlan','plan'),(c,'launchPlan','plan'),(a,'plan','plan'),(c,'manifest','manifest')):require(equal(binding(obj[key]),refined[role]),'prior bound record mismatch')
    for role in ('queries','rows','pieces'):
        require(equal(binding(m[role]),refined[role]) and equal(binding(c[role]),refined[role]),'refined stream identity')
    require(equal(m['producer'],normalized(p['producer'],root)) and equal(c['verifier'],normalized(p['verifier'],root)),'prior producer/checker identity')
    for k in ('subjectSourceBindings','fixedBindings','executionBindings','priorCoverClosure'):require(equal(m[k],c[k]),'manifest/comparison source split')
    require(equal(m['subjectSourceBindings'],p['subjectSourceBindings']) and equal(m['fixedBindings'],ancestry) and equal(m['executionBindings'],[normalized(b,root)for b in p['runtimeBindings']+p['operationalBindings']]) and equal(m['priorCoverClosure'],p['priorCoverClosure']),'refined original source relationships')
    require(equal(c['sourceBindings'],{k:normalized(p[k],root)for k in PRIOR_NAMED}),'refined named source closure')
    require(equal(m['claims'],c['candidateClaims']),'copied false claims differ')
    false_flags(m['claims'],'historicalTrajectoryIdentityEstablished metricsAvailable scoreAuthorized h3EvidenceEligible eomExecuted independentComparisonPassed executionAuthorized'.split())
    for k in ('accelerationEvaluated','eomExecuted','h3EvidenceEligible','metricsAvailable','scoreAuthorized','historicalTrajectoryIdentityEstablished','fullRunAuthorized'):require(a[k] is False,'prior physics authority promoted')
    analysis=c['analysis'];require(analysis['accepted'] is False and analysis['conditionalQueryReplayConformant'] is True and analysis['conditionalFinalCoverConformant'] is True,'prior conditional comparison absent')
    for k,n in dict(queryCount=3584,pairCount=56,rowCount=64,ordinaryNonselfRows=56,selfExclusionRows=8,pieceRecordCount=112,finalStrictFaceChecks=112,oldestBoundaryChecks=56,recordedGeometryPieceVisits=244).items():require(type(analysis[k])is int and analysis[k]==n,'prior analysis census')
    false_flags(analysis['claims'],'accepted referenceGenerationAuthenticated originalSourceAuthenticated original1760PieceCensusAuthenticated premiseTruthAuthenticated subjectMembershipEstablished historicalTrajectoryIdentityEstablished executionAuthorized eomExecuted h3EvidenceEligible metricsAvailable scoreAuthorized equilibriumEstablished retentionEstablished physicalRealizationEstablished'.split())
    require(equal(m['restrictions'],analysis['restrictions']),'admitted pair restrictions differ')
    census=dict(cells=1,members=8,queries=3584,pairRows=64,ordinaryPairs=56,selfZeros=8,pieceRecords=112)
    require(equal(m['census'],census) and equal(a['census'],census),'prior complete census')
    require(type(a['stages'])is list and len(a['stages'])==2,'prior stage census')
    for item,stage in zip(a['stages'],('producer','comparison')):
        proc,ad=item['process'],item['admission'];done=ad['completion']
        require(item['stage']==stage and proc['accepted'] is True and proc['processesClosed'] is True and equal(proc['exit'],dict(code=0,signal=None)) and ad['accepted'] is True and equal(proc['admission'],ad),'closed stage disposition')
        require(type(proc['gates'])is list and len(proc['gates'])==1 and proc['gates'][0]['retired'] is True and proc['gates'][0]['acknowledged'] is True and proc['gates'][0]['measurement']['code']==0 and proc['gates'][0]['measurement']['signal'] is None,'retired successful gate required')
        require(done['completed'] is True and done['accepted'] is (stage=='comparison') and done['scope']==m['scope'] and done['h3EvidenceEligible'] is False and done['eomExecuted'] is False,'fresh stage completion disposition')
        require(equal(proc['stdoutLog'],ad['completionLog']),'completion log identity')
        stdout=read_binding(proc['stdoutLog'],capture=True);read_binding(proc['stderrLog'])
        require(stdout.endswith(b'\n') and len(stdout.splitlines())==1 and equal(decode(stdout),done),'original fresh completion log differs')
        if stage=='producer':
            require(equal(done['outputs'],[refined[k]for k in ('queries','rows','pieces','manifest')]) and equal(ad['outputs'],done['outputs']) and equal(done['census'],census) and done['conditionalCoverPrepared'] is True and done['externalWholeAttemptAdmissionRequired'] is True,'four-output producer completion')
        else:require(equal(done['output'],refined['comparison']) and equal(ad['outputs'],[refined['comparison']]) and equal(done['analysis'],analysis),'comparison completion binding')
    # The root kernel is not rerun. Strict EOF/census is independently checked.
    return analysis


def mathematical_bindings(ancestry,refined):
    return [dict(role=role,**record)for role,record in (
        ('original_export',ancestry['export']),('reconstruction_receipt',ancestry['reconstruction']),
        ('guards_receipt',ancestry['guards']),('root_cover',refined['manifest']),
        ('root_cover_comparison',refined['comparison']),('member_acceleration_predeclaration',ancestry['memberPredeclaration']),
        ('continuous_reception_enclosure_contract',ancestry['rootTheorem']))]


def authenticate_observations(admission,logs,decode):
    """Read-only consistency of pinned prior logs, not a fresh cost measurement.

    The final logs include observations after the immutable admission was
    serialized. Neither log contains the coordinator's final stdout/exit;
    that remains the distinct externally observed declaration premise.
    """
    def stream(raw,count):
        require(type(raw)is bytes and 0<len(raw)<=MAX_BYTES and raw.endswith(b'\n'),'prior operational stream termination')
        lines=raw.split(b'\n')[:-1];require(len(lines)==count and all(0<len(x)<=131072 for x in lines),'prior operational stream census')
        result=[decode(line)for line in lines]
        require(all(type(x)is dict for x in result),'prior operational null/nonobject')
        return result
    def number(value):
        require(type(value)in(int,Decimal),'finite prior resource number')
        if type(value)is Decimal:require(value.is_finite(),'finite prior resource number')
        return Fraction(value)
    launcher=stream(logs['launcherLog'],49);rss=stream(logs['resourceLog'],955)
    host=[x for x in launcher if x.get('kind')=='host-resource']
    pilots=[x for x in launcher if x.get('kind')=='f6c-emission-refinement-pilot-heartbeat']
    gates=[x for x in launcher if x.get('schema')=='braid-program/subfield-circular-pilot-outer-heartbeat.v1']
    require((len(host),len(pilots),len(gates))==(20,15,14),'prior operational observation kinds')
    require(equal(host[:-1],admission['hostObservationsBeforePublication']),'prior host prefix differs')
    whole=Fraction(closure_premise()['elapsedSeconds']);prepub=number(admission['elapsedSecondsBeforePublication'])
    require(prepub<=number(host[-1]['elapsedSeconds'])<whole and host[-1]['stage']=='final-admission','final host observation scope')
    for index,x in enumerate(host):
        require(0<=number(x['elapsedSeconds'])<whole and (index==0 or number(host[index-1]['elapsedSeconds'])<=number(x['elapsedSeconds'])),'host observation time order')
        require(type(x['freePercent'])is int and 20<=x['freePercent']<=100 and type(x['availableDiskBytes'])is str and re.fullmatch(r'[0-9]{1,20}',x['availableDiskBytes']) and int(x['availableDiskBytes'])>=LIMITS['stopDiskBelowBytes'],'recorded host stop limit')
    require(host[0]['atLaunch'] is True and host[0]['freePercent']>=40 and int(host[0]['availableDiskBytes'])>=LIMITS['admissionDiskBytes'],'recorded host launch limit')
    for x in pilots:require(x['accepted'] is False,'heartbeat not scientific acceptance')
    for x in gates:require(x['h3EvidenceEligible'] is False and x['stopping'] is False,'prior gate heartbeat failed')
    for index,x in enumerate(rss):
        require(x['kind']=='aggregate-rss' and 0<=number(x['elapsedSeconds'])<whole and (index==0 or number(rss[index-1]['elapsedSeconds'])<=number(x['elapsedSeconds'])),'RSS observation identity/order')
        require(type(x['aggregateResidentBytes'])is int and 0<=x['aggregateResidentBytes']<=LIMITS['maximumAggregateRssBytes'] and 0<=number(x['sampleGapMs'])<=1000,'recorded RSS/gap limit')
        require(type(x['processes'])is list and 0<len(x['processes'])<=64,'recorded process census')
        for proc in x['processes']:
            require(type(proc['pid'])is int and proc['pid']>0 and type(proc['pgid'])is int and proc['pgid']>0 and type(proc['rssBytes'])is int and proc['rssBytes']>=0,'recorded process identity/RSS')
        require(sum(xp['rssBytes']for xp in x['processes'])==x['aggregateResidentBytes'],'aggregate RSS sum differs')
    summary=admission['observationsBeforePublication']
    require(type(summary['samples'])is int and summary['samples']==954 and max(x['aggregateResidentBytes']for x in rss[:-1])==summary['maximumSampledRSSBytes'] and max(number(x['sampleGapMs'])for x in rss[:-1])==number(summary['maximumSampleGapMs']),'prepublication RSS prefix differs')
    require(prepub<=number(rss[-1]['elapsedSeconds'])<whole and rss[-1]['stage']=='final-admission','final RSS scope')
    final_bytes=sum(len(raw)for raw in logs.values())+sum(binding(stage['process'][key])['bytes']for stage in admission['stages']for key in ('stdoutLog','stderrLog'))
    require(type(admission['loggingBytesBeforePublication'])is int and 0<=admission['loggingBytesBeforePublication']<=final_bytes<=LIMITS['maximumCombinedLogBytes'],'prepublication/final log byte limits')
    return dict(prepublicationHostObservations=19,finalHostObservations=20,prepublicationRssSamples=954,finalRssSamples=955,finalLogBytes=final_bytes,wholeCompletionSource='external declaration observation, not these logs')


def compare_candidate(core,reference,packet,plan,plan_binding,sources,ancestry,refined,export,manifest,rows,pieces,progress=None):
    keys(packet,CANDIDATE_KEYS)
    require(packet['schema']==CANDIDATE_SCHEMA and packet['scope']==SCOPE and packet['status']=='conditional-range-candidate' and packet['accepted'] is False,'candidate disposition')
    expected=dict(launchPlan=plan_binding,consumer=sources['consumer'],declaration=sources['declaration'],verifier=sources['verifier'],sourceBindings=sources,ancestryBindings=ancestry,refinementBindings=refined,runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],priorRefinementClosure=plan['priorRefinementClosure'],census=CENSUS,publicationRequires=CANDIDATE_PUBLICATION)
    for k,v in expected.items():require(equal(packet[k],v),'candidate source/census field differs: '+k)
    false_flags(packet['claims'],CANDIDATE_FLAGS)
    result=core.compare_refined_ranges(reference,export,manifest,rows,pieces,mathematical_bindings(ancestry,refined),packet['projection'],packet['ranges'],reference_sha256=REFERENCE_SHA,progress=progress)
    analysis=asdict(result);require(analysis['conditional_projection_conformant'] is True and analysis['conditional_ranges_conformant'] is True,'conditional pure comparison failed')
    for k,v in analysis.items():
        if type(v)is bool and not k.startswith('conditional_'):require(v is False,'pure authority promoted')
    return analysis


class Publication:
    def __init__(self,path,live):self.path=Path(path);self.live=live;self.private=None;self.identity=None
    def publish(self,record):
        self.live();raw=encoded(record);require(len(raw)<=MAX_BYTES,'comparison byte limit')
        with tempfile.NamedTemporaryFile(dir=self.path.parent,prefix='.refined-range-comparison-private-',delete=False)as f:
            self.private=Path(f.name);self.identity=os.fstat(f.fileno());require(f.write(raw)==len(raw),'short output write');f.flush();os.fsync(f.fileno())
        self.live();os.link(self.private,self.path);fd=os.open(self.path.parent,os.O_RDONLY)
        try:os.fsync(fd)
        finally:os.close(fd)
        self.live();return dict(path=str(self.path),sha256=sha(raw),bytes=len(raw))
    def reject(self):
        if self.identity is None:return
        try:
            current=os.stat(self.path,follow_symlinks=False)
            if(current.st_dev,current.st_ino)==(self.identity.st_dev,self.identity.st_ino):os.unlink(self.path)
        except FileNotFoundError:pass


def budget_deadline(token,began):
    require(type(token)is str and 0<len(token)<=1152 and re.fullmatch(r'(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?',token),'bounded budget token')
    decimal=Decimal(token);require(decimal.is_finite() and len(decimal.as_tuple().digits)<=1024 and abs(decimal.as_tuple().exponent)<=1000,'budget decimal bound')
    value=Fraction(decimal);seconds=float(value)
    require(0<value<=LIMIT and 0<seconds<=LIMIT and began+seconds>began,'representable positive remaining budget')
    return began+seconds


def complete(record,live):
    live();print(json.dumps(record,allow_nan=False),flush=True);live()


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for key in ('candidate','candidate-sha256','plan','plan-sha256','verifier-sha256','out','budget-seconds'):parser.add_argument('--'+key,required=True)
    parser.add_argument('--repo-root');args=parser.parse_args(argv)
    began=time.monotonic();deadline=budget_deadline(args.budget_seconds,began)
    root=Path(__file__).resolve().parents[2];require(args.repo_root is None or Path(args.repo_root)==root,'executing repository root differs')
    candidate_path=Path(args.candidate).absolute();output=Path(args.out).absolute();lane=root/LANE
    require(candidate_path==candidate_path.resolve() and candidate_path.name=='range.json' and candidate_path.parent.parent==lane and lane==lane.resolve(),'canonical direct-child candidate')
    require(output==output.resolve() and output.name=='comparison.json' and output.parent==Path(str(candidate_path.parent)+'-outer') and output.parent.is_dir() and not output.exists() and not output.is_symlink(),'fresh canonical outer comparison')
    publication=None;progress=dict(stage='capture',completedCells=0,accepted=False)
    def live():require(time.monotonic()<deadline,'inclusive comparison deadline')
    def beat(*_):
        live();print(json.dumps({**progress,'elapsedSeconds':time.monotonic()-began}),file=sys.stderr,flush=True);live()
        signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,max(.000001,deadline-time.monotonic())))
    previous=signal.signal(signal.SIGALRM,beat);signal.setitimer(signal.ITIMER_REAL,min(HEARTBEAT,deadline-began))
    try:
        with ExitStack()as stack:
            owned={}
            def capture(path,digest,*,data=False,limit=MAX_BYTES):
                key=str(Path(path).absolute());obj=owned.get(key)
                if obj is None:obj=stack.enter_context(_production_capture(BoundFile, key,digest,capture=data,limit=limit,live=live));owned[key]=obj
                else:
                    require(obj.digest==digest and obj.initial.st_size<=limit,'conflicting captured generation')
                    if data and obj.data is None:obj.data,h=obj.scan(True);require(h==digest,'changed later capture')
                return obj
            own=capture(root/SELF,args.verifier_sha256,data=True);executing_source(own.data)
            core_file=capture(root/CORE,CORE_SHA,data=True);ref_file=capture(root/REFERENCE,REFERENCE_SHA,data=True)
            with captured_references(core_file.data,ref_file.data)as(core,reference):
                plan_file=capture(args.plan,args.plan_sha256,data=True);plan=validate_plan(decode_role(core,plan_file.data,'plan'),args.verifier_sha256)
                def read_binding(b,*,capture=False):
                    b=normalized(b,root);obj=capture_file(b['path'],b['sha256'],data=capture,limit=MAX_BYTES if capture else MAX_SOURCE_BYTES)
                    require(obj.initial.st_size==b['bytes'],'bound byte count differs');return obj.data if capture else obj.binding()
                capture_file=capture
                sources={k:read_binding(plan[k])for k in NAMED}
                ancestry_files={role:capture(root/p,h,data=role in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan'))for role,p,h in reference.FIXED}
                ancestry={k:v.binding()for k,v in ancestry_files.items()}
                olddocs={k:decode_role(core,ancestry_files[k].data,k)for k in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
                reference.authenticate_prior(olddocs,ancestry)
                # Bind every source in the original admitted broad-cover chain too.
                for b in olddocs['admission']['sourceBindings']:read_binding(b)
                refined_files={role:capture(root/p,h,data=True)for role,p,h in REFINED};refined={k:v.binding()for k,v in refined_files.items()}
                docs={k:decode_role(core,refined_files[k].data,k)for k in ('manifest','comparison','admission','plan')}
                authenticate_refinement(docs,refined,ancestry,root,decode_operational,read_binding)
                prior_operation_files={role:capture(root/p,h,data=True)for role,p,h,_ in PRIOR_OPERATIONS}
                for role,_,_,size in PRIOR_OPERATIONS:require(prior_operation_files[role].initial.st_size==size,'prior operation byte count')
                prior_operations={k:v.binding()for k,v in prior_operation_files.items()}
                prior_observations=authenticate_observations(docs['admission'],{k:v.data for k,v in prior_operation_files.items()},decode_operational)
                # The query transcript is authenticated/count-checked only, never evaluated.
                records(core,refined_files['queries'].data,3584)
                rows=records(core,refined_files['rows'].data,64);pieces=records(core,refined_files['pieces'].data,112)
                runtime=set();execution=[]
                for group in ('runtimeBindings','operationalBindings'):
                    for b in plan[group]:
                        actual=read_binding(b);execution.append(actual)
                        if group=='runtimeBindings':runtime.add(Path(actual['path']))
                excluded=(root/SELF,root/CORE,root/REFERENCE)
                require(Path(sys.executable).resolve() in runtime and Path(sys.executable).absolute().parent.parent/'pyvenv.cfg' in runtime,'shared interpreter/config absent')
                candidate=capture(candidate_path,args.candidate_sha256,data=True);packet=decode_role(core,candidate.data,'candidate')
                progress['stage']='independent-refined-projection-and-ranges'
                analysis=compare_candidate(core,reference,packet,plan,plan_file.binding(),sources,ancestry,refined,olddocs['export'],docs['manifest'],rows,pieces,lambda n:progress.update(completedRows=n))
                progress.update(stage='final-source-rechecks',completedCells=1)
                for obj in owned.values():obj.recheck()
                report=dict(schema=REPORT_SCHEMA,scope=SCOPE,accepted=True,authority='source-bound independent refined projection and conditional rational range containment only',candidate=candidate.binding(),launchPlan=plan_file.binding(),verifier=own.binding(),sourceBindings=sources,ancestryBindings=ancestry,refinementBindings=refined,priorOperationalBindings=prior_operations,priorOperationalObservations=prior_observations,executionBindings=execution,priorRefinementClosure=plan['priorRefinementClosure'],analysis=analysis,referenceClaims={k:False for k in reference.RANGE_FLAGS},candidateClaims={k:False for k in CANDIDATE_FLAGS},publicationRequires=PUBLICATION_REQUIRES,elapsedSecondsBeforePublication=time.monotonic()-began)
                publication=Publication(output,live);result=publication.publish(report);emitted=capture(output,result['sha256']);require(emitted.initial.st_size==result['bytes'],'published byte count')
                for obj in owned.values():obj.recheck()
                progress['stage']='input-cleanup'
        live();complete(dict(completed=True,accepted=True,scope=SCOPE,output=result,analysis=analysis,elapsedSeconds=time.monotonic()-began,h3EvidenceEligible=False,eomExecuted=False,externalInclusiveDeadlineAndProcessClosureRequired=True),live)
        live()
    except BaseException as exc:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':str(exc)[:4096],'privateAttemptPreserved':str(publication.private)if publication else None}),file=sys.stderr,flush=True)
        raise
    finally:
        try:
            signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,previous)
        except BaseException:
            if publication is not None:publication.reject()
            raise
    # Watch teardown is part of this attempt too. A printed completion without
    # successful timely process completion never authorizes a leftover file.
    if time.monotonic()>=deadline:
        if publication is not None:publication.reject()
        print(json.dumps({**progress,'completed':False,'accepted':False,'failure':'post-watch-cleanup deadline','privateAttemptPreserved':str(publication.private)if publication else None}),file=sys.stderr,flush=True)
        raise ValueError('post-watch-cleanup deadline')


if __name__=='__main__':
    try:main()
    except BaseException as exc:
        if isinstance(exc,SystemExit):raise
        sys.exit(1)
