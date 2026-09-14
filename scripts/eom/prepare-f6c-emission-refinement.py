#!/usr/bin/env python3
"""Source-bound subject for the fixed emission-only F6c refinement.

CLI: --repo-root ROOT --plan FILE --plan-sha256 SHA --producer-sha256 SHA
     --out-dir NEW --budget-seconds REMAINING --git-binary ABSOLUTE.
Only the captured old producer helper and its three frozen numerical modules
are executed. Independent comparator sources are bound, NEVER imported.
Every query is durably flushed before progress advances. All outputs are
private/write-once then hardlinked exclusively; failure retracts only owned
public inodes and retains the private attempt. A successful producer is NOT
independent acceptance: the separate checker and whole-attempt closure remain
required. No acceleration, EOM evolution, metric, or physical claim is made.
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
        or len(OPTION_B_PRODUCTION_IDENTITIES) != 31):
    raise RuntimeError('Admitted production host must supply the original identity tuple')

import argparse
from contextlib import contextmanager, ExitStack
from decimal import Decimal, localcontext
from fractions import Fraction
import hashlib
import json
import math
import os
from pathlib import Path
import re
import signal
import stat
import subprocess
import sys
import tempfile
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = "scripts/eom/prepare-f6c-emission-refinement.py"
CONTROLS = "tests/test_f6c_emission_refinement_preparation.py"
VERIFIER = "scripts/eom/verify-f6c-emission-refinement.py"
VERIFIER_CONTROLS = "tests/test_f6c_emission_refinement.py"
DECLARATION = "reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-predeclaration.md"
DECLARATION_SHA = OPTION_B_PRODUCTION_IDENTITIES[0]
COMPARISON = "scripts/eom/oracle/f6c_emission_refinement_conformance.py"
COMPARISON_SHA = OPTION_B_PRODUCTION_IDENTITIES[1]
COMPARISON_CONTROLS = "tests/test_f6c_emission_refinement_conformance.py"
COMPARISON_CONTROLS_SHA = OPTION_B_PRODUCTION_IDENTITIES[2]
HELPER = "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py"
HELPER_SHA = OPTION_B_PRODUCTION_IDENTITIES[3]
BASE = ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/"
FIXED = (
    ('export', '.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json', OPTION_B_PRODUCTION_IDENTITIES[4]),
    ('reconstruction', '.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json', OPTION_B_PRODUCTION_IDENTITIES[5]),
    ('guards', '.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json', OPTION_B_PRODUCTION_IDENTITIES[6]),
    ('manifest', BASE+'subject/cover-manifest.json', OPTION_B_PRODUCTION_IDENTITIES[7]),
    ('comparison', BASE+'comparison.json', OPTION_B_PRODUCTION_IDENTITIES[8]),
    ('admission', BASE+'pilot-admission.json', OPTION_B_PRODUCTION_IDENTITIES[9]),
    ('rows', BASE+'subject/rows.ndjson', OPTION_B_PRODUCTION_IDENTITIES[10]),
    ('pieces', BASE+'subject/pieces.ndjson', OPTION_B_PRODUCTION_IDENTITIES[11]),
    ('priorPlan', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json', OPTION_B_PRODUCTION_IDENTITIES[12]),
    ('priorClosureOwner', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md', OPTION_B_PRODUCTION_IDENTITIES[13]),
    ('reference', 'scripts/eom/oracle/continuous_reception_acceleration.py', OPTION_B_PRODUCTION_IDENTITIES[14]),
    ('referenceControls', 'tests/test_eom_continuous_reception_acceleration.py', OPTION_B_PRODUCTION_IDENTITIES[15]),
    ('referenceProof', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md', OPTION_B_PRODUCTION_IDENTITIES[16]),
    ('memberPredeclaration', 'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md', OPTION_B_PRODUCTION_IDENTITIES[17]),
    ('rootTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md', OPTION_B_PRODUCTION_IDENTITIES[18]),
    ('reconstructionTheorem', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md', OPTION_B_PRODUCTION_IDENTITIES[19]),
)

# Source/control closure is explicit even for bound but unexecuted references.
EXTRA = (
    (HELPER, HELPER_SHA),
    ("tests/test_f6c_cached_continuous_reception_root_cover_preparation.py", OPTION_B_PRODUCTION_IDENTITIES[20]),
    ("scripts/eom/oracle/continuous_reception_roots_cached.py", OPTION_B_PRODUCTION_IDENTITIES[21]),
    ("tests/test_eom_continuous_reception_roots_cached.py", OPTION_B_PRODUCTION_IDENTITIES[22]),
    ("scripts/eom/oracle/certified_history.py", OPTION_B_PRODUCTION_IDENTITIES[23]),
    ("scripts/eom/oracle/decimal_interval.py", OPTION_B_PRODUCTION_IDENTITIES[24]),
    ("tests/test_eom_decimal_interval.py", OPTION_B_PRODUCTION_IDENTITIES[25]),
    ("scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py", OPTION_B_PRODUCTION_IDENTITIES[26]),
    ("tests/test_f6c_cached_continuous_reception_root_cover.py", OPTION_B_PRODUCTION_IDENTITIES[27]),
    ("reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md", OPTION_B_PRODUCTION_IDENTITIES[28]),
    (DECLARATION, DECLARATION_SHA), (COMPARISON, COMPARISON_SHA),
    (COMPARISON_CONTROLS, COMPARISON_CONTROLS_SHA),
)
MODULE_PATHS = {
    "decimal_interval": "scripts/eom/oracle/decimal_interval.py",
    "certified_history": "scripts/eom/oracle/certified_history.py",
    "continuous_reception_roots": "scripts/eom/oracle/continuous_reception_roots_cached.py",
}
SCHEMA = "braid-program/f6c-emission-refinement-cover.v1"
PLAN_SCHEMA = "braid-program/f6c-emission-refinement-launch.v1"
SCOPE = "pilot-cell-0-emission-refinement"
LANE = ".local-data/braid-analysis/f6c-emission-refinement-20260827"
IDS = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
CHARGE = "0.1666666666666666666666666666666667"
MAX_BYTES, MAX_RUNTIME_BYTES, LIMIT, HEARTBEAT = 64*1024**2, 1024**3, 1800, 15
HEX = re.compile(r"[a-f0-9]{64}\Z")
LIMITS = dict(inclusiveSeconds=1800, maximumAggregateRssBytes=2*1024**3,
    maximumRssSampleGapMs=1000, heartbeatSeconds=15, admissionFreeMemoryPercent=40,
    admissionDiskBytes=64*1024**3, stopFreeMemoryBelowPercent=20, stopDiskBelowBytes=16*1024**3,
    hostObservationSeconds=15, hostObservationTimeoutSeconds=2, maximumScientificFileBytes=MAX_BYTES,
    maximumOutputFileBytes=MAX_BYTES, maximumCombinedLogBytes=16*1024**2, serialWorkers=1, eomWorkers=0)
CENSUS = dict(cells=1, members=8, queries=3584, pairRows=64, ordinaryPairs=56, selfZeros=8, pieceRecords=112)
ALGORITHM = dict(lowerQueriesPerPair=32, upperQueriesPerPair=32, order="receiver-major;lower32;reset;upper32")
CLAIMS = {k: False for k in ("historicalTrajectoryIdentityEstablished", "metricsAvailable", "scoreAuthorized",
                            "h3EvidenceEligible", "eomExecuted", "independentComparisonPassed", "executionAuthorized")}
PLAN_KEYS = frozenset(("schema", "scope", "declaration", "producer", "producerControls", "verifier",
    "verifierControls", "comparisonReference", "comparisonReferenceControls", "subjectSourceBindings",
    "runtimeBindings", "operationalBindings", "limits", "priorCoverClosure"))
MANIFEST_KEYS = frozenset(("schema", "scope", "status", "accepted", "launchPlan", "producer", "fixedBindings",
    "subjectSourceBindings", "executionBindings", "priorCoverClosure", "members", "knotSha256",
    "retainedDomain", "receptionDomain", "originalEmissionDomain", "precision", "speedUpper", "clearanceLower",
    "algorithm", "restrictions", "census", "queries", "rows", "pieces", "libraryFlags", "claims"))
OPERATIONS = (
    "scripts/eom/run-f6c-emission-refinement-pilot.mjs",
    "scripts/eom/launch-f6c-emission-refinement-pilot.mjs",
    "tests/f6c-emission-refinement-pilot.test.js",
    "tests/f6c-emission-refinement-pilot-process.test.js",
    "scripts/eom/launch-prescribed-response-pilot.mjs",
    "scripts/eom/launch-subfield-circular-root-pilot.mjs",
    "/bin/ps", "/usr/bin/memory_pressure",
)
OP_PINS = {
    OPERATIONS[4]: OPTION_B_PRODUCTION_IDENTITIES[29],
    OPERATIONS[5]: OPTION_B_PRODUCTION_IDENTITIES[30],
}








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

def require(ok, message):
    if not ok: raise ValueError(message)


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()+b"\n"


def decode(raw, *, document_type="data"):
    # Operational receipts carry captured command/source strings, not numeric
    # lexemes. Callers select that document class; ordinary data stays at 8192.
    require(type(document_type) is str and document_type in ("data", "operational-receipt"), "JSON document type")
    string_limit = 65536 if document_type == "operational-receipt" else 8192
    require(len(raw) <= MAX_BYTES, "JSON byte limit")
    def pairs(items):
        result = {}
        for k, v in items:
            require(k not in result, "duplicate JSON key"); result[k] = v
        return result
    def bad(value): raise ValueError("nonfinite JSON: "+value)
    value = json.loads(raw.decode("utf-8"), object_pairs_hook=pairs, parse_float=Decimal, parse_constant=bad)
    def bounded(v, depth=0):
        require(depth <= 24, "JSON depth limit")
        if isinstance(v, dict):
            require(len(v) <= 10000, "JSON object limit")
            for k, x in v.items(): require(len(k) <= 4096, "key limit"); bounded(x, depth+1)
        elif isinstance(v, list):
            require(len(v) <= 20000, "JSON array limit")
            for x in v: bounded(x, depth+1)
        elif isinstance(v, str): require(len(v) <= string_limit, "JSON token limit")
    bounded(value); return value


class BoundFile:
    """Original byte capture and same-file before/after identity."""
    def __init__(self, path, expected, *, collect=False, limit=MAX_BYTES):
        self.path = Path(path).absolute(); self.expected = expected; self.collect = collect; self.limit = limit
        self.fd = None
    @staticmethod
    def identity(s): return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns
    def __enter__(self):
        require(type(self.expected) is str and HEX.fullmatch(self.expected), "SHA-256 required")
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, "O_NOFOLLOW", 0))
        try:
            self.initial = os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0 < self.initial.st_size <= self.limit, "bounded regular file required")
            self.data, digest = self.scan(self.collect)
            require(digest == self.expected, "source hash mismatch: "+str(self.path)); self.recheck(); return self
        except BaseException:
            os.close(self.fd); self.fd = None; raise
    def scan(self, collect=False):
        os.lseek(self.fd, 0, os.SEEK_SET); chunks = []; digest = hashlib.sha256(); size = 0
        while True:
            block = os.read(self.fd, min(1024**2, self.limit+1-size))
            if not block: break
            size += len(block); require(size <= self.limit, "file grew beyond bound")
            digest.update(block)
            if collect: chunks.append(block)
        require(size == self.initial.st_size and self.identity(os.fstat(self.fd)) == self.identity(self.initial), "file changed during capture")
        return (b"".join(chunks) if collect else None), digest.hexdigest()
    def recheck(self):
        require(self.scan()[1] == self.expected and self.identity(os.lstat(self.path)) == self.identity(self.initial), "bound source changed/replaced")
    def binding(self): return dict(path=str(self.path), sha256=self.expected, bytes=self.initial.st_size)
    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)
        self.fd = None


@contextmanager
def captured_helper(source):
    require(source.expected == HELPER_SHA and sha(source.data) == HELPER_SHA, "frozen helper generation")
    name = "_emission_helper_"+HELPER_SHA[:20]; suffix = 0
    while name in sys.modules: suffix += 1; name = "_emission_helper_"+HELPER_SHA[:20]+"_"+str(suffix)
    module = ModuleType(name); module.__file__ = str(source.path); sys.modules[name] = module
    try:
        _production_exec(source.data, str(source.path), module.__dict__, optimize=sys.flags.optimize)
        yield module
    finally: sys.modules.pop(name, None)


def binding(value):
    require(type(value) is dict and set(value) == {"path", "sha256", "bytes"}, "closed byte binding")
    require(type(value["path"]) is str and 0 < len(value["path"]) < 4096, "bounded path")
    require(type(value["sha256"]) is str and HEX.fullmatch(value["sha256"]), "binding SHA")
    require(type(value["bytes"]) is int and 0 < value["bytes"] <= MAX_RUNTIME_BYTES, "binding bytes")
    p = Path(value["path"])
    require(str(p) == value["path"] and ".." not in p.parts, "canonical binding token")
    return value


def binding_list(values):
    require(type(values) is list and 0 < len(values) <= 512, "bounded binding list")
    for v in values: binding(v)
    require(len({v["path"] for v in values}) == len(values), "duplicate binding paths")


def validate_plan(plan, own_sha):
    require(type(plan) is dict and set(plan) == PLAN_KEYS, "closed launch plan")
    require(plan["schema"] == PLAN_SCHEMA and plan["scope"] == SCOPE and encoded(plan["limits"]) == encoded(LIMITS), "fixed scope/limits")
    named = {"producer": (SELF, own_sha), "producerControls": (CONTROLS, None),
             "verifier": (VERIFIER, None), "verifierControls": (VERIFIER_CONTROLS, None),
             "declaration": (DECLARATION, DECLARATION_SHA), "comparisonReference": (COMPARISON, COMPARISON_SHA),
             "comparisonReferenceControls": (COMPARISON_CONTROLS, COMPARISON_CONTROLS_SHA)}
    for key, (path, digest) in named.items():
        b = binding(plan[key]); require(b["path"] == path and (digest is None or b["sha256"] == digest), "named source differs: "+key)
    for key in ("subjectSourceBindings", "runtimeBindings", "operationalBindings"): binding_list(plan[key])
    expected = {**dict(EXTRA), SELF: own_sha, CONTROLS: plan["producerControls"]["sha256"]}
    require({b["path"]: b["sha256"] for b in plan["subjectSourceBindings"]} == expected, "exact fifteen source/control bindings")
    for key in ("producer", "producerControls", "declaration", "comparisonReference", "comparisonReferenceControls"):
        require(plan[key] in plan["subjectSourceBindings"], "named/subject binding disagreement")
    ops = {b["path"]: b["sha256"] for b in plan["operationalBindings"]}
    require(set(OPERATIONS) < set(ops) and len(ops) == 9, "exact operational files plus resolved Node")
    extra = next(iter(set(ops)-set(OPERATIONS)))
    require(Path(extra).is_absolute() and Path(extra).name == "node", "resolved Node runtime binding")
    for p, h in OP_PINS.items(): require(ops[p] == h, "frozen operational helper differs")
    expected_closure = dict(authority="externally-reviewed-caller-observation",
        ownerSha256=dict((k, h) for k, _, h in FIXED)["priorClosureOwner"],
        admissionSha256=dict((k, h) for k, _, h in FIXED)["admission"],
        matchingFreshCompletionObserved=True, exitCode=0, elapsedSeconds="8.534247625",
        processesClosed=True, independentAuditAccepted=True)
    require(encoded(plan["priorCoverClosure"]) == encoded(expected_closure), "prior external closure premise differs")
    return plan


def canonical_decimal(value, helper):
    text = format(helper.finite_decimal(value), "f")
    if "." in text: text = text.rstrip("0").rstrip(".")
    return "0" if text in ("-0", "") else text


def authenticate_prior(fixed):
    """Check the pinned prior metadata chain; never re-evaluate root evidence."""
    docs = {k: decode(fixed[k].data, document_type="operational-receipt" if k == "admission" else "data")
            for k in ("manifest", "comparison", "admission", "priorPlan")}
    m, c, a, p = (docs[k] for k in ("manifest", "comparison", "admission", "priorPlan"))
    for obj, key, role in ((m, "rows", "rows"), (m, "pieces", "pieces"), (m, "launchPlan", "priorPlan"),
        (c, "rows", "rows"), (c, "pieces", "pieces"), (c, "manifest", "manifest"),
        (c, "launchPlan", "priorPlan"), (a, "plan", "priorPlan")):
        require(binding(obj[key]) == fixed[role].binding(), "prior original-byte link differs")
    require(c["schema"] == "braid-program/f6c-continuous-reception-root-cover-conformance.v1"
        and c["accepted"] is True and c["scope"] == "pilot-cell-0"
        and c["analysis"]["accepted"] is False and c["analysis"]["conditionalEnclosuresConformant"] is True,
        "prior conditional comparison absent")
    require(p["schema"] == "braid-program/f6c-cached-root-cover-pilot-launch.v1" and p["scope"] == "pilot-cell-0",
        "prior plan scope differs")
    require(m["subjectSourceBindings"] == p["comparisonContract"]["subjectSourceBindings"]
        and m["runtimeBindings"] == p["comparisonContract"]["runtimeBindings"], "prior source/runtime chain differs")
    require(a["schema"] == "braid-program/f6c-cached-root-cover-pilot-admission.v1"
        and a["accepted"] is True and a["scope"] == "pilot-cell-0" and a["processesClosed"] is True,
        "prior operational admission absent")
    for key in ("eomExecuted", "fullRunAuthorized", "h3EvidenceEligible", "historicalTrajectoryIdentityEstablished", "metricsAvailable"):
        require(a[key] is False, "prior authority promoted")
    require(len(a["stages"]) == 2, "prior stage census")
    for item, stage in zip(a["stages"], ("consumer", "comparison")):
        process = item["process"]; completion = item["admission"]["completion"]
        require(item["stage"] == stage and item["admission"]["accepted"] is True and process["accepted"] is True
            and process["processesClosed"] is True and process["exit"] == {"code": 0, "signal": None}
            and completion["completed"] is True and completion["accepted"] is (stage == "comparison"), "prior closed stage differs")
        require(len(process["gates"]) == 1 and process["gates"][0]["retired"] is True, "prior gate closure differs")
        expected = [fixed[k].binding() for k in ("rows", "pieces", "manifest")] if stage == "consumer" else fixed["comparison"].binding()
        require(completion["outputs" if stage == "consumer" else "output"] == expected, "prior completed outputs differ")


def propose(histories, modules, helper, write_query, progress):
    """Subject algorithm only; whole-face public calls, no private cache."""
    with localcontext() as context:
        context.prec = 90; context.Emin = -999999; context.Emax = 999999
        return _propose(histories, modules, helper, write_query, progress)


def _propose(histories, modules, helper, write_query, progress):
    require(len(histories) == 8 and tuple(h.history_id for h in histories) == IDS, "eight ordered histories")
    lib = modules["continuous_reception_roots"]; box = modules["decimal_interval"].DecimalInterval
    reception = box.bounds("0", "0.001", 90); restrictions = []; qindex = 0
    for i in range(8):
        for j in range(8):
            if i == j: continue
            retained = {"lower": Fraction(-8), "upper": Fraction(-1, 20)}
            proof = {"lower": None, "upper": None}
            for side in ("lower", "upper"):
                lo, hi = Fraction(-8), Fraction(-1, 20)
                for ordinal in range(32):
                    before = (lo, hi); midpoint = (lo+hi)/2
                    token = canonical_decimal(midpoint, helper)
                    face = box.bounds(token, token, 90)
                    residual = lib.unrestricted_residual(histories[i], histories[j], reception, face)
                    require(residual.precision == 90 and residual.lower.is_finite() and residual.upper.is_finite()
                            and residual.lower <= residual.upper, "finite 90-digit unrestricted residual")
                    proved = residual.upper < 0 if side == "lower" else residual.lower > 0
                    if proved: retained[side] = midpoint; proof[side] = qindex
                    if side == "lower":
                        if proved: lo = midpoint
                        else: hi = midpoint
                        decision = "retain-negative" if proved else "explore-lower-half"
                    else:
                        if proved: hi = midpoint
                        else: lo = midpoint
                        decision = "retain-positive" if proved else "explore-upper-half"
                    record = dict(queryIndex=qindex, receiverIndex=i, transmitterIndex=j, receiverId=IDS[i],
                        transmitterId=IDS[j], side=side, ordinal=ordinal,
                        exploratory=dict(lower=canonical_decimal(before[0], helper), upper=canonical_decimal(before[1], helper), precision=90),
                        midpoint=token, residual=helper.interval_record(residual), decision=decision,
                        retainedFace=canonical_decimal(retained[side], helper))
                    write_query(record)  # Durable caller flush precedes completed-prefix authority.
                    qindex += 1; progress["completedQueries"] = qindex
            require(Fraction(-8) <= retained["lower"] < retained["upper"] <= Fraction(-1, 20), "crossed/equal retained faces unresolved")
            restrictions.append(dict(receiverIndex=i, transmitterIndex=j, receiverId=IDS[i], transmitterId=IDS[j],
                lower=canonical_decimal(retained["lower"], helper), upper=canonical_decimal(retained["upper"], helper),
                lowerQueryIndex=proof["lower"], upperQueryIndex=proof["upper"]))
    require(qindex == 3584 and len(restrictions) == 56, "complete query census")
    return restrictions


def emit_cover(histories, restrictions, modules, helper, write_row, write_piece, progress):
    """One unchanged public final-cover call; source-specific serialization."""
    lib = modules["continuous_reception_roots"]; box = modules["decimal_interval"].DecimalInterval
    reception = box.bounds("0", "0.001", 90)
    digests = tuple((h.history_id, h.digest()) for h in histories)
    require(len(restrictions) == 56, "complete proposals")
    emissions = {}
    for n, (i, j) in enumerate((i, j) for i in range(8) for j in range(8) if i != j):
        r = restrictions[n]
        require((r["receiverIndex"], r["transmitterIndex"], r["receiverId"], r["transmitterId"]) == (i, j, IDS[i], IDS[j]), "proposal order")
        require(Fraction(-8) <= Fraction(r["lower"]) < Fraction(r["upper"]) <= Fraction(-1, 20), "proposal domain")
        emissions[(IDS[i], IDS[j])] = box.bounds(r["lower"], r["upper"], 90)
    premises = lib.ConditionalPremises(digests, box.bounds("-8", "0.13", 90), reception,
        tuple(Decimal("0.85") for _ in IDS),
        tuple(tuple(Decimal(0) if i == j else Decimal("0.27") for j in range(8)) for i in range(8)),
        True, True, "Externally authenticated F_H subset of unchanged original envelopes; not historical trajectory identity.")
    result = lib.enclose_root_cover(histories, premises, (lib.ReceptionCellProposal(reception, emissions),))
    require(result.hypotheses is premises and result.expected_rows == 64 and result.reception_cells == (reception,), "final cover identity")
    flags = helper.flags(result); piece_index = 0; visits = 0
    for index, row in enumerate(result.rows):
        require(index < 64, "extra final row"); i, j = divmod(index, 8)
        require((row.receiver_id, row.transmitter_id, row.reception) == (IDS[i], IDS[j], reception), "final row identity")
        record = dict(rowIndex=index, cellIndex=0, receiverIndex=i, transmitterIndex=j,
            receiverId=IDS[i], transmitterId=IDS[j], reception=helper.interval_record(row.reception),
            emission=helper.interval_record(row.emission), ordinaryRootsPerReception=row.ordinary_roots_per_reception,
            coincidentEndpointExcluded=row.coincident_endpoint_excluded,
            oldestResidual=helper.interval_record(row.oldest_residual), lowerFaceResidual=helper.interval_record(row.lower_face_residual),
            upperFaceResidual=helper.interval_record(row.upper_face_residual),
            displacement=None if row.displacement is None else [helper.interval_record(v) for v in row.displacement],
            distance=helper.interval_record(row.distance), transmitterFactor=helper.interval_record(row.transmitter_factor),
            receiverFactor=helper.interval_record(row.receiver_factor), receiverPieceRecord=None, transmitterPieceRecord=None,
            rootFreeComplementConditional=row.root_free_complement_conditional,
            retainedBoundaryContact=row.retained_boundary_contact, libraryFlags=dict(flags))
        if i == j:
            require(row.ordinary_roots_per_reception == 0 and row.coincident_endpoint_excluded is True
                and not row.receiver_pieces and not row.transmitter_pieces
                and all(getattr(row, k) is None for k in ("emission", "oldest_residual", "lower_face_residual",
                    "upper_face_residual", "displacement", "distance", "transmitter_factor", "receiver_factor")), "self exclusion differs")
        else:
            require(row.ordinary_roots_per_reception == 1 and row.coincident_endpoint_excluded is False
                and row.emission == emissions[(IDS[i], IDS[j])], "final emission differs")
            require(row.oldest_residual.upper < 0 and row.lower_face_residual.upper < 0 < row.upper_face_residual.lower, "strict final/oldest faces unresolved")
            require(row.distance.lower > 0 and row.transmitter_factor.lower >= Decimal("1e-24")
                and row.receiver_factor.lower > 0, "positive distance/factors unresolved")
            for role, mi, parts, requested in (("receiver", i, row.receiver_pieces, row.reception),
                                               ("transmitter", j, row.transmitter_pieces, row.emission)):
                record[role+"PieceRecord"] = piece_index
                write_piece(helper.compact_pieces(parts, record_index=piece_index, row_index=index, role=role,
                    member=IDS[mi], digest=digests[mi][1], requested=requested))
                visits += len(parts); piece_index += 1; progress["completedPieces"] = piece_index
        require(row.root_free_complement_conditional is True and row.retained_boundary_contact is False, "complement/boundary differs")
        write_row(record); progress["completedRows"] = index+1
    require(result.status == "conditional_complete" and result.failure_code == result.failure_detail == ""
        and len(result.rows) == 64 and piece_index == 112, "final cover unresolved/incomplete")
    return visits


class Publication:
    """Private durable attempt; only own linked public inodes are retractable."""
    def __init__(self, output, deadline):
        self.output = Path(output); self.deadline = deadline; self.links = []
        self.output.mkdir(mode=0o700)
        self.private = Path(tempfile.mkdtemp(prefix=".emission-private-", dir=self.output))
    def check(self): require(time.monotonic() < self.deadline, "inclusive publication deadline")
    def sync_directory(self):
        fd = os.open(self.output, os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
        self.check()
    def publish(self, name, helper):
        self.check()
        source = self.private/name; public = self.output/name
        with source.open("rb") as f: raw = f.read(MAX_BYTES+1)
        require(0 < len(raw) <= MAX_BYTES, "bounded completed output")
        digest = sha(raw)
        os.link(source, public); self.links.append((public, os.lstat(source).st_ino, os.lstat(source).st_dev))
        self.sync_directory()
        return dict(path=str(public), sha256=digest, bytes=len(raw))
    def reject(self):
        errors = []
        for path, ino, dev in reversed(self.links):
            try:
                s = os.lstat(path)
                if (s.st_ino, s.st_dev) == (ino, dev): path.unlink()
            except FileNotFoundError: pass
            except OSError as error: errors.append(str(error))
        fd = os.open(self.output, os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
        return errors


def check_output(root, output, git_binary):
    lane = root/LANE
    require(output == output.resolve() and output.parent == lane and lane.is_dir() and lane.resolve() == lane, "canonical direct output child")
    require(not output.exists() and not output.is_symlink(), "fresh absent output directory")
    result = subprocess.run([str(git_binary), "check-ignore", "-q", "--", str(output.relative_to(root))],
        cwd=root, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=2)
    require(result.returncode == 0, "output not confirmed ignored")


def make_manifest(plan, own, plan_file, fixed, execution, mapping, restrictions, bindings, helper):
    box = lambda lo, hi: dict(lower=lo, upper=hi, precision=90)
    result = dict(schema=SCHEMA, scope=SCOPE, status="conditional_complete", accepted=False,
        launchPlan=plan_file.binding(), producer=own.binding(), fixedBindings={k: b.binding() for k, b in fixed.items()},
        subjectSourceBindings=plan["subjectSourceBindings"], executionBindings=execution,
        priorCoverClosure=plan["priorCoverClosure"], members=mapping, knotSha256=helper.KNOT_SHA,
        retainedDomain=box("-8", "0.13"), receptionDomain=box("0", "0.001"), originalEmissionDomain=box("-8", "-0.05"),
        precision=90, speedUpper="0.85", clearanceLower="0.27",
        algorithm=dict(ALGORITHM), restrictions=restrictions, census=dict(CENSUS),
        queries=bindings[0], rows=bindings[1], pieces=bindings[2], libraryFlags=dict(helper.FALSE_FLAGS), claims=dict(CLAIMS))
    require(set(result) == MANIFEST_KEYS, "closed manifest fields")
    return result


def admit_completion(value, deadline):
    require(time.monotonic() < deadline, "final cleanup deadline")
    print(json.dumps(value, allow_nan=False), flush=True)
    require(time.monotonic() < deadline, "completion flush deadline")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for key in ("repo-root", "plan", "plan-sha256", "producer-sha256", "out-dir", "budget-seconds", "git-binary"):
        parser.add_argument("--"+key, required=True)
    args = parser.parse_args(argv)
    began = time.monotonic()
    require(len(args.budget_seconds) < 128, "bounded budget token")
    require(re.fullmatch(r"(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?", args.budget_seconds), "decimal remaining budget")
    decimal_budget = Decimal(args.budget_seconds)
    require(decimal_budget.is_finite() and abs(decimal_budget.as_tuple().exponent) <= 1000, "bounded budget exponent")
    budget = Fraction(decimal_budget); seconds = float(budget); deadline = began+seconds
    require(0 < budget <= LIMIT and math.isfinite(seconds) and 0 < seconds <= LIMIT and deadline > began, "representable positive remaining budget")
    root = Path(args.repo_root).absolute(); output = Path(args.out_dir).absolute()
    require(root == root.resolve() and Path(__file__).absolute() == root/SELF, "canonical executing repository root")
    publication = None; progress = dict(stage="capture", completedQueries=0, completedRows=0, completedPieces=0)
    def heartbeat(*_):
        require(time.monotonic() < deadline, "producer deadline")
        print(json.dumps({**progress, "accepted": False, "elapsedSeconds": time.monotonic()-began}), file=sys.stderr, flush=True)
        signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, max(0.000001, deadline-time.monotonic())))
    previous = signal.signal(signal.SIGALRM, heartbeat)
    signal.setitimer(signal.ITIMER_REAL, min(HEARTBEAT, seconds))
    try:
        with ExitStack() as stack:
            owned = []; by_path = {}
            def capture(path, digest, collect=False, limit=MAX_BYTES):
                path = Path(path).absolute()
                if path in by_path:
                    old = by_path[path]; require(old.expected == digest and (not collect or old.data is not None), "conflicting source capture")
                    return old
                obj = stack.enter_context(_production_capture(BoundFile, path, digest, collect=collect, limit=limit))
                owned.append(obj); by_path[path] = obj; return obj
            own = capture(root/SELF, args.producer_sha256, True)
            require(compile(_production_current_source(own.data), _EXECUTING_CODE.co_filename, "exec", dont_inherit=True, optimize=sys.flags.optimize)
                == _EXECUTING_CODE, "executing producer differs from captured source")
            plan_file = capture(args.plan, args.plan_sha256, True); plan = validate_plan(decode(plan_file.data), args.producer_sha256)
            fixed = {key: capture(root/path, digest, True) for key, path, digest in FIXED}
            authenticate_prior(fixed)
            source_files = {}
            for b in plan["subjectSourceBindings"]:
                source_files[b["path"]] = capture(root/b["path"], b["sha256"], True)
                require(source_files[b["path"]].initial.st_size == b["bytes"], "source byte size")
            for key in ("verifier", "verifierControls"):
                b = plan[key]; obj = capture(root/b["path"], b["sha256"])
                require(obj.initial.st_size == b["bytes"], "named verifier bytes")
            execution = []; runtime = set()
            for key in ("runtimeBindings", "operationalBindings"):
                for b in plan[key]:
                    obj = capture(root/b["path"], b["sha256"], limit=MAX_RUNTIME_BYTES)
                    require(obj.initial.st_size == b["bytes"], "execution byte size")
                    execution.append(obj.binding())
                    if key == "runtimeBindings": runtime.add(obj.path.resolve())
            git_binary = Path(args.git_binary)
            require(git_binary.is_absolute() and git_binary == git_binary.resolve() and git_binary in runtime, "explicit bound resolved Git")
            require(Path(sys.executable).resolve() in runtime and Path(sys.executable).parent.parent/"pyvenv.cfg" in runtime, "shared Python/venv runtime")
            with captured_helper(source_files[HELPER]) as helper:
                captured = {name: (str(source_files[path].path), source_files[path].data, source_files[path].expected)
                            for name, path in MODULE_PATHS.items()}
                with helper.captured_package(captured) as modules:
                    excluded = [own.path, source_files[HELPER].path, *(source_files[p].path for p in MODULE_PATHS.values())]
                    require(helper.imported_runtime_paths(excluded) <= runtime, "runtime outside plan before work")
                    originals, cells = helper.authenticate_premises(decode(fixed["export"].data),
                        decode(fixed["reconstruction"].data), decode(fixed["guards"].data))
                    require(cells[0] == (Fraction(0), Fraction(1, 1000)), "original cell zero differs")
                    require(all(h["charge"] == (CHARGE if i % 2 == 0 else "-"+CHARGE)
                                for i, h in enumerate(originals)), "original charge differs")
                    histories = helper.build_histories(originals, modules)
                    mapping = [dict(id=h["id"], pathKey=h["pathKey"], polarity=h["polarity"], charge=h["charge"],
                        originalHistoryFingerprint=h["historyFingerprint"], historyDigest=history.digest())
                        for h, history in zip(originals, histories)]
                    check_output(root, output, git_binary); publication = Publication(output, deadline)
                    progress["stage"] = "query-proposal"
                    sinks = [helper.JsonlSink(publication.private/name, deadline) for name in ("queries.ndjson", "rows.ndjson", "pieces.ndjson")]
                    with sinks[0] as queries, sinks[1] as rows, sinks[2] as pieces:
                        def query(record): queries.write(record); queries.flush()
                        restrictions = propose(histories, modules, helper, query, progress)
                        progress["stage"] = "final-cover"
                        visits = emit_cover(histories, restrictions, modules, helper, rows.write, pieces.write, progress)
                        for sink in sinks: sink.flush()
                    require([s.count for s in sinks] == [3584, 64, 112], "complete serialized census")
                    progress["stage"] = "publication"
                    for obj in owned: obj.recheck()
                    bindings = [publication.publish(name, helper) for name in ("queries.ndjson", "rows.ndjson", "pieces.ndjson")]
                    manifest = make_manifest(plan, own, plan_file, fixed, execution, mapping, restrictions, bindings, helper)
                    helper.exclusive_json(publication.private/"cover-manifest.json", manifest, deadline)
                    bindings.append(publication.publish("cover-manifest.json", helper))
                    for b in bindings:
                        obj = capture(b["path"], b["sha256"]); require(obj.initial.st_size == b["bytes"], "output byte size")
                    require(helper.imported_runtime_paths(excluded) <= runtime, "late runtime outside plan")
                    for obj in owned: obj.recheck()
                    publication.check()
            progress["stage"] = "input-cleanup"
        publication.check()
        completion = dict(completed=True, accepted=False, scope=SCOPE, conditionalCoverPrepared=True,
            externalWholeAttemptAdmissionRequired=True, producer=own.binding(), launchPlan=plan_file.binding(),
            outputs=bindings, census=dict(CENSUS), recordedGeometryPieceVisits=visits,
            elapsedSeconds=time.monotonic()-began, h3EvidenceEligible=False, eomExecuted=False)
        admit_completion(completion, deadline)
    except BaseException as error:
        signal.setitimer(signal.ITIMER_REAL, 0)  # Failed-attempt cleanup; no successful authority.
        cleanup = publication.reject() if publication is not None else []
        failure = dict(completed=False, accepted=False, scope=SCOPE, conditionalCoverPrepared=False,
            externalWholeAttemptAdmissionRequired=True, **progress, failure=str(error),
            privateAttemptPreserved=str(publication.private) if publication else None, cleanupFailures=cleanup,
            h3EvidenceEligible=False, eomExecuted=False)
        print(json.dumps(failure), file=sys.stderr, flush=True)
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0); signal.signal(signal.SIGALRM, previous)


if __name__ == "__main__":
    main()
