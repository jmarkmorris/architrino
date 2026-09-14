"""Current transport for the unchanged emission producer and independent comparator.

The v2 plan records actual execution bindings and explicit original-data routes.
No numerical function or original scientific record is rewritten by this bridge.
"""

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
        or len(OPTION_B_PRODUCTION_IDENTITIES) != 3):
    raise RuntimeError('Admitted production host must supply the original identity tuple')
import argparse
from contextlib import ExitStack, contextmanager
import hashlib
import json
from pathlib import Path
import signal
import sys
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/execute-f6c-emission-refinement.py'
SUPPORT = 'scripts/eom/execute-f6c-acceleration.py'
SUPPORT_SHA = OPTION_B_PRODUCTION_IDENTITIES[0]
PRODUCER = 'scripts/eom/prepare-f6c-emission-refinement.py'
PRODUCER_SHA = OPTION_B_PRODUCTION_IDENTITIES[1]
VERIFIER = 'scripts/eom/verify-f6c-emission-refinement.py'
VERIFIER_SHA = OPTION_B_PRODUCTION_IDENTITIES[2]
SCHEMA = 'braid-program/f6c-emission-refinement-launch.v2'
OPERATIONAL_SELECTION = {
    'helpers': 'scripts/eom/launch-prescribed-response-pilot.mjs',
    'outer': 'scripts/eom/launch-subfield-circular-root-pilot.mjs',
    'source-map': 'reference/priorities/development-process-review/contracts/option-b-f6c-emission-operational-sources.jsonld',
    'source-reader': 'scripts/equation-mapping/current-source-manifest.mjs',
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
    if not ok:
        raise ValueError(message)


@contextmanager
def support(root):
    # This existing transport owns the common capture and original-prior
    # authentication implementation. Load exactly its pinned source bytes.
    filename = root / SUPPORT
    require(filename == filename.resolve() and 0 < filename.stat().st_size <= 64 * 1024**2, 'bounded canonical support source required')
    original, raw, identities = production_source_pair(root, __file__, SUPPORT)
    require(hashlib.sha256(original).hexdigest() == SUPPORT_SHA, 'original support source differs')
    current_sha = hashlib.sha256(raw).hexdigest()
    module = ModuleType('_emission_current_support')
    module.__file__ = str(filename)
    module.OPTION_B_PRODUCTION_IDENTITIES = identities
    _production_exec(raw, str(filename), module.__dict__)
    production_recheck()
    with module.Capture(filename, current_sha, capture=True) as held:
        require(held.data == raw, 'support capture differs')
        yield module
        held.recheck()
        production_recheck()


def current_plan(raw, verifier, root, bridge_sha, infrastructure, operational_selection):
    extras = {'executionBridge', 'declarationInput', 'historicalInputs'}
    verifier.keys(raw, set(verifier.PLAN_KEYS) | extras)
    require(raw['schema'] == SCHEMA, 'current v2 plan required')
    bridge = verifier.binding(raw['executionBridge'])
    require(bridge['path'] == SELF and bridge['sha256'] == bridge_sha, 'execution bridge differs')
    route = raw['declarationInput']
    verifier.keys(route, {'originalPath', 'path', 'sha256', 'bytes'})
    require(route['originalPath'] == verifier.DECLARATION and route['sha256'] == verifier.DECLARATION_SHA,
            'original declaration identity differs')
    require(raw['declaration'] == dict(path=route['originalPath'], sha256=route['sha256'], bytes=route['bytes']),
            'logical declaration differs')
    routes = raw['historicalInputs']
    require(type(routes) is list and len(routes) == len(infrastructure.HISTORICAL), 'exact theorem routes required')
    for r, (role, original, digest, size) in zip(routes, infrastructure.HISTORICAL):
        verifier.keys(r, {'role', 'originalPath', 'path', 'sha256', 'bytes'})
        require((r['role'], r['originalPath'], r['sha256'], r['bytes']) == (role, original, digest, size),
                'original theorem identity differs')
    for r in [route, *routes]:
        p = Path(r['path'])
        require(type(r['bytes']) is int and 0 < r['bytes'] <= verifier.MAX_BYTES, 'bounded archive size')
        require(not p.is_absolute() and str(p) == r['path'] and '..' not in p.parts and
                p.parts[0] == 'reference' and p.suffix == '.source', 'canonical data-only archive required')
    require(len({r['path'] for r in [route, *routes]}) == len(routes) + 1, 'conflicting archive routes')
    plan = {k: v for k, v in raw.items() if k not in extras}
    plan['schema'] = verifier.PLAN_SCHEMA
    # The unchanged verifier owns scientific scope, limits and subject census.
    # Actual operational bindings are retained; no historical operation is fabricated.
    verifier.validate_plan(plan, VERIFIER_SHA)
    require(plan['producer']['sha256'] == PRODUCER_SHA, 'unchanged producer required')
    ops = {b['path']: b for b in plan['operationalBindings']}
    known = {SELF, SUPPORT, 'tests/test_f6c_emission_current_execution.py',
             'scripts/eom/run-f6c-emission-refinement-pilot.mjs',
             'scripts/eom/launch-f6c-emission-refinement-pilot.mjs',
             'tests/f6c-emission-refinement-pilot.test.js', 'tests/f6c-emission-refinement-pilot-process.test.js',
             'scripts/eom/launch-prescribed-response-pilot.mjs', 'scripts/eom/launch-subfield-circular-root-pilot.mjs',
             '/bin/ps', '/usr/bin/memory_pressure',
             OPERATIONAL_SELECTION['source-map'], OPERATIONAL_SELECTION['source-reader']}
    require(known < set(ops) and len(ops) == len(known) + 1, 'closed current operational census')
    node = Path(next(iter(set(ops) - known)))
    require(node.is_absolute() and node.name == 'node', 'resolved Node binding required')
    require(ops[SELF] == bridge and ops[SUPPORT]['sha256'] == SUPPORT_SHA, 'bridge/support execution census differs')
    # Node supplies these from its captured B graph. Direct CLI use supplies
    # the same external byte selections; plan identity alone does not claim
    # Node graph admission or confer scientific acceptance.
    require(type(operational_selection) is dict and set(operational_selection) == set(OPERATIONAL_SELECTION),
            'complete external operational selection required')
    require(all(type(h) is str and len(h) == 64 and all(c in '0123456789abcdef' for c in h)
                for h in operational_selection.values()), 'external operational digest required')
    require(all(ops[p]['sha256'] == operational_selection[role] for role, p in OPERATIONAL_SELECTION.items()),
            'current operational generation differs')
    return plan


class LogicalInput:
    """Physical capture with the original logical identity in scientific records."""
    def __init__(self, captured, logical):
        self.captured, self.logical = captured, logical
        self.data = captured.data

    def binding(self):
        return {**self.captured.binding(), 'path': str(self.logical)}


def compare_current(m, packet, plan, plan_binding, producer, fixed, execution, docs, raw, pure, helper, auth, progress):
    # Metadata envelope follows the preserved verifier. All original mapping,
    # exact query replay and final-cover predicates execute its unchanged functions.
    m.keys(packet, m.MANIFEST_KEYS)
    m.require(packet['schema'] == m.MANIFEST_SCHEMA and packet['scope'] == m.SCOPE and
              packet['status'] == 'conditional_complete' and packet['accepted'] is False, 'manifest scope/status differs')
    expected = dict(launchPlan=plan_binding, producer=producer, fixedBindings=fixed,
                    subjectSourceBindings=plan['subjectSourceBindings'], executionBindings=execution,
                    priorCoverClosure=plan['priorCoverClosure'], knotSha256=m.KNOT_SHA, precision=90,
                    speedUpper='0.85', clearanceLower='0.27', algorithm=m.ALGORITHM, census=m.CENSUS)
    for key, value in expected.items():
        m.require(m.equal(packet[key], value), 'manifest metadata differs: ' + key)
    for key, endpoints in (('retainedDomain', (m.F(-8), m.F(13, 100))),
                           ('receptionDomain', (m.F(0), m.F(1, 1000))),
                           ('originalEmissionDomain', (m.F(-8), m.F(-1, 20)))):
        m.require(m.interval(packet[key], root=True) == endpoints, 'manifest domain differs')
    m.flags(packet['libraryFlags'], m.ROOT_FLAGS)
    m.flags(packet['claims'], m.CLAIMS)
    for role in ('queries', 'rows', 'pieces'):
        m.require(m.equal(m.binding(packet[role]), raw[role][0]), 'original stream binding differs')
    auth(m, docs, fixed)
    histories, members = m.original_mapping(helper, docs)
    m.require(m.equal(packet['members'], members), 'original member mapping differs')
    result = pure.compare_refinement(helper, histories, m.records(raw['queries'][1], 3584),
                                    m.records(raw['rows'][1], 64), m.records(raw['pieces'][1], 112), progress=progress)
    restrictions = m.restriction_records(result)
    m.require(m.equal(packet['restrictions'], restrictions), 'independent replay restrictions differ')
    m.require(result.accepted is False and result.conditional_query_replay_conformant is True and
              result.conditional_final_cover_conformant is True, 'complete conditional comparison required')
    return dict(accepted=False, conditionalQueryReplayConformant=True, conditionalFinalCoverConformant=True,
                queryCount=result.query_count, pairCount=result.pair_count, rowCount=result.row_count,
                ordinaryNonselfRows=result.ordinary_nonself_rows, selfExclusionRows=result.self_exclusion_rows,
                pieceRecordCount=result.piece_record_count, finalStrictFaceChecks=result.final_strict_face_checks,
                oldestBoundaryChecks=result.oldest_boundary_checks, recordedGeometryPieceVisits=result.geometry_piece_visits,
                restrictions=restrictions, claims=dict(result.claims))


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for key in ('stage', 'bridge-sha256', 'plan', 'plan-sha256', 'budget-seconds',
                'helpers-sha256', 'outer-sha256', 'source-map-sha256', 'source-reader-sha256'):
        parser.add_argument('--' + key, required=True)
    for key in ('out-dir', 'out', 'git-binary', 'manifest', 'manifest-sha256'):
        parser.add_argument('--' + key)
    parser.add_argument('--check-plan', action='store_true')
    args = parser.parse_args(argv)
    require(args.stage in ('producer', 'comparison'), 'unknown stage')
    root = Path(__file__).resolve().parents[2]
    began = time.monotonic()
    publication = None
    progress = dict(stage='capture', completedQueries=0, completedRows=0, completedPieces=0, accepted=False)
    previous = None
    try:
        with support(root) as common:
            with ExitStack() as stack:
                owned = []
                def capture(p, h, collect=False):
                    c = stack.enter_context(_production_capture(common.Capture, p, h, capture=collect, limit=64*1024**2 if collect else 1024**3))
                    owned.append(c)
                    return c
                bridge = capture(root / SELF, args.bridge_sha256, True)
                require(compile(_production_current_source(bridge.data), _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
                                optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing bridge differs')
                checker_file = capture(root / VERIFIER, VERIFIER_SHA, True)
                m = stack.enter_context(common.instrument(checker_file))
                producer_file = capture(root / PRODUCER, PRODUCER_SHA, True)
                producer = stack.enter_context(common.instrument(producer_file))
                deadline = m.budget_deadline(args.budget_seconds, began)
                def beat(*_):
                    print(json.dumps({**progress, 'elapsedSeconds': time.monotonic() - began}), file=sys.stderr, flush=True)
                    require(time.monotonic() < deadline, 'current execution deadline')
                    signal.setitimer(signal.ITIMER_REAL, min(15, max(.000001, deadline - time.monotonic())))
                previous = signal.signal(signal.SIGALRM, beat)
                signal.setitimer(signal.ITIMER_REAL, max(.000001, min(15, deadline-time.monotonic())))
                try:
                    plan_file = capture(args.plan, args.plan_sha256, True)
                    raw_plan = m.decode(plan_file.data)
                    plan = current_plan(raw_plan, m, root, args.bridge_sha256, common,
                                        {role: getattr(args, role.replace('-', '_') + '_sha256') for role in OPERATIONAL_SELECTION})
                    routes = {r['originalPath']: r for r in [raw_plan['declarationInput'], *raw_plan['historicalInputs']]}
                    def logical(p, h, collect=False):
                        route = routes.get(p)
                        obj = capture(root / (route['path'] if route else p), route['sha256'] if route else h, collect)
                        if route:
                            require(obj.initial.st_size == route['bytes'], 'archive size differs')
                        return obj
                    fixed_files = {role: logical(p, h, True) for role, p, h in m.FIXED}
                    fixed = {role: LogicalInput(fixed_files[role], root/p).binding() for role, p, _ in m.FIXED}
                    fixed_objects = {role: LogicalInput(fixed_files[role], root/p) for role, p, _ in m.FIXED}
                    source_files, source_bindings = {}, {}
                    for b in plan['subjectSourceBindings']:
                        obj = logical(b['path'], b['sha256'], True)
                        require(obj.initial.st_size == b['bytes'], 'subject size differs')
                        source_files[b['path']] = obj
                    for key in m.SOURCE_PLAN_KEYS:
                        b = plan[key]; obj = logical(b['path'], b['sha256'])
                        require(obj.initial.st_size == b['bytes'], 'named source size differs')
                        source_bindings[key] = {**obj.binding(), 'path': str(root/b['path'])}
                    runtime, execution = set(), []
                    for group in ('runtimeBindings', 'operationalBindings'):
                        for b in plan[group]:
                            obj = capture(root/b['path'], b['sha256'])
                            require(obj.initial.st_size == b['bytes'], 'execution size differs')
                            execution.append(obj.binding())
                            if group == 'runtimeBindings': runtime.add(obj.path)
                    def recheck():
                        require(time.monotonic() < deadline, 'execution deadline')
                        for obj in owned: obj.recheck()
                    docs = {k: m.decode(fixed_files[k].data, receipt=k != 'export') for k in
                            ('export', 'manifest', 'comparison', 'admission', 'reconstruction', 'guards', 'priorPlan')}
                    common.authenticate_original_prior(m, docs, fixed)
                    recheck()
                    if args.check_plan:
                        completion = dict(metadataValidated=True, scientificCalls=0, stage=args.stage, bindings=len(owned))
                    elif args.stage == 'producer':
                        output = Path(args.out_dir).absolute()
                        git = Path(args.git_binary).resolve()
                        require(git in runtime and Path(sys.executable).resolve() in runtime, 'bound interpreter/Git required')
                        with producer.captured_helper(source_files[producer.HELPER]) as helper:
                            captured = {name: (str(source_files[p].path), source_files[p].data, source_files[p].expected)
                                        for name, p in producer.MODULE_PATHS.items()}
                            with helper.captured_package(captured) as modules:
                                originals, cells = helper.authenticate_premises(docs['export'], docs['reconstruction'], docs['guards'])
                                require(cells[0] == (m.F(0), m.F(1, 1000)), 'original cell differs')
                                require(all(h['charge'] == (producer.CHARGE if i % 2 == 0 else '-'+producer.CHARGE)
                                            for i, h in enumerate(originals)), 'original charges differ')
                                histories = helper.build_histories(originals, modules)
                                mapping = [dict(id=h['id'], pathKey=h['pathKey'], polarity=h['polarity'], charge=h['charge'],
                                                originalHistoryFingerprint=h['historyFingerprint'], historyDigest=history.digest())
                                           for h, history in zip(originals, histories)]
                                producer.check_output(root, output, git)
                                publication = producer.Publication(output, deadline)
                                sinks = [helper.JsonlSink(publication.private/name, deadline) for name in
                                         ('queries.ndjson', 'rows.ndjson', 'pieces.ndjson')]
                                with sinks[0] as queries, sinks[1] as rows, sinks[2] as pieces:
                                    def query(record): queries.write(record); queries.flush()
                                    progress['stage'] = 'query-proposal'
                                    restrictions = producer.propose(histories, modules, helper, query, progress)
                                    progress['stage'] = 'final-cover'
                                    visits = producer.emit_cover(histories, restrictions, modules, helper, rows.write, pieces.write, progress)
                                    for sink in sinks: sink.flush()
                                require([s.count for s in sinks] == [3584, 64, 112], 'complete serialized census')
                                recheck()
                                bindings = [publication.publish(name, helper) for name in ('queries.ndjson', 'rows.ndjson', 'pieces.ndjson')]
                                packet = producer.make_manifest(plan, producer_file, plan_file, fixed_objects, execution,
                                                                mapping, restrictions, bindings, helper)
                                helper.exclusive_json(publication.private/'cover-manifest.json', packet, deadline)
                                bindings.append(publication.publish('cover-manifest.json', helper))
                                for b in bindings: capture(b['path'], b['sha256'])
                                recheck(); publication.check()
                        completion = dict(completed=True, accepted=False, scope=producer.SCOPE, conditionalCoverPrepared=True,
                                          externalWholeAttemptAdmissionRequired=True, producer=producer_file.binding(),
                                          launchPlan=plan_file.binding(), outputs=bindings, census=dict(producer.CENSUS),
                                          recordedGeometryPieceVisits=visits, elapsedSeconds=time.monotonic()-began,
                                          h3EvidenceEligible=False, eomExecuted=False)
                    else:
                        manifest_path, output = m.validate_layout(root, args.manifest, args.out)
                        manifest = capture(manifest_path, args.manifest_sha256, True)
                        packet = m.decode(manifest.data); m.keys(packet, m.MANIFEST_KEYS)
                        raw = {}
                        for role in ('queries', 'rows', 'pieces'):
                            b = m.binding(packet[role]); p = manifest_path.parent/(role+'.ndjson')
                            require(b['path'] == str(p), 'fixed manifest sibling required')
                            obj = capture(p, b['sha256'], True)
                            require(obj.initial.st_size == b['bytes'], 'raw stream size differs')
                            raw[role] = (obj.binding(), obj.data)
                        with m.captured_comparators(root, source_files[m.PURE].data, source_files[m.HELPER].data) as (pure, helper):
                            def report_progress(queries, rows):
                                progress.update(completedQueries=queries, completedRows=rows)
                                require(time.monotonic() < deadline, 'comparison deadline')
                            analysis = compare_current(m, packet, plan, plan_file.binding(), producer_file.binding(), fixed,
                                                       execution, docs, raw, pure, helper, common.authenticate_original_prior, report_progress)
                            require((progress['completedQueries'], progress['completedRows']) == (3584, 64), 'comparison progress census differs')
                            recheck()
                        report = dict(schema=m.REPORT_SCHEMA, scope=m.SCOPE, status='conditional-comparison-complete', accepted=True,
                                      authority='independent original-byte query replay and conditional final-cover containment only',
                                      manifest=manifest.binding(), **{k: raw[k][0] for k in raw}, launchPlan=plan_file.binding(),
                                      verifier=checker_file.binding(), sourceBindings=source_bindings, fixedBindings=fixed,
                                      executionBindings=execution, subjectSourceBindings=plan['subjectSourceBindings'],
                                      priorCoverClosure=plan['priorCoverClosure'], analysis=analysis,
                                      candidateClaims={k: False for k in m.CLAIMS}, publicationRequires=m.PUBLICATION_REQUIRES,
                                      elapsedSecondsBeforePublication=time.monotonic()-began)
                        publication = m.Publication(output, deadline)
                        result = publication.publish(report); capture(result['path'], result['sha256']); recheck()
                        completion = dict(completed=True, accepted=True, scope=m.SCOPE, output=result, analysis=analysis,
                                          elapsedSeconds=time.monotonic()-began, h3EvidenceEligible=False, eomExecuted=False,
                                          externalInclusiveDeadlineAndProcessClosureRequired=True)
                    recheck()
                except BaseException:
                    if publication is not None: publication.reject()
                    raise
        # Input and module cleanup are part of the same deadline.
        try:
            require(time.monotonic() < deadline, 'post-cleanup deadline')
            print(json.dumps(completion, allow_nan=False), flush=True)
            require(time.monotonic() < deadline, 'stdout deadline')
        except BaseException:
            if publication is not None: publication.reject()
            raise
    except BaseException:
        if publication is not None: publication.reject()
        raise
    finally:
        if previous is not None:
            signal.setitimer(signal.ITIMER_REAL, 0)
            signal.signal(signal.SIGALRM, previous)


if __name__ == '__main__':
    main()
