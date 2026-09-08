"""Current transport for the unchanged emission producer and independent comparator.

The v2 plan records actual execution bindings and explicit original-data routes.
No numerical function or original scientific record is rewritten by this bridge.
"""
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
SUPPORT_SHA = 'c67359fbf8ffeee9bb6d6fc2887c4a35dc7bf4b6af7da4d7577ef017e42ce789'
PRODUCER = 'scripts/eom/prepare-f6c-emission-refinement.py'
PRODUCER_SHA = 'ec254ad004fb38612d3e895f5c150d8e5bec8fe53142739a50b15e073bd9783d'
VERIFIER = 'scripts/eom/verify-f6c-emission-refinement.py'
VERIFIER_SHA = 'a2fc4b009e4cc3289134b933b258eb223d9281c35945fa8e83cba280ab47a025'
SCHEMA = 'braid-program/f6c-emission-refinement-launch.v2'


def require(ok, message):
    if not ok:
        raise ValueError(message)


@contextmanager
def support(root):
    # This existing transport owns the common capture and original-prior
    # authentication implementation. Load exactly its pinned source bytes.
    filename = root / SUPPORT
    require(filename == filename.resolve() and 0 < filename.stat().st_size <= 64 * 1024**2, 'bounded canonical support source required')
    raw = filename.read_bytes()
    require(hashlib.sha256(raw).hexdigest() == SUPPORT_SHA, 'support source differs')
    module = ModuleType('_emission_current_support')
    module.__file__ = str(filename)
    exec(compile(raw, str(filename), 'exec', dont_inherit=True), module.__dict__)
    with module.Capture(filename, SUPPORT_SHA, capture=True) as held:
        require(held.data == raw, 'support capture differs')
        yield module
        held.recheck()


def current_plan(raw, verifier, root, bridge_sha, infrastructure):
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
             '/bin/ps', '/usr/bin/memory_pressure'}
    require(known < set(ops) and len(ops) == len(known) + 1, 'closed current operational census')
    node = Path(next(iter(set(ops) - known)))
    require(node.is_absolute() and node.name == 'node', 'resolved Node binding required')
    require(ops[SELF] == bridge and ops[SUPPORT]['sha256'] == SUPPORT_SHA, 'bridge/support execution census differs')
    expected = {'scripts/eom/launch-prescribed-response-pilot.mjs': '9af9a6a33b3b1c5889550953496be13d0698e5d24e9033dbdd5ffcb82deeafe2',
                'scripts/eom/launch-subfield-circular-root-pilot.mjs': '58f5fa058727e212cc98a32f04eb3d94c64c6a8185f9cc8a8114d9a034343b8c',
                '/usr/bin/memory_pressure': 'ba1ce108f7f91e55bdcb7f5dd267c39484eb51bc6b8135814678c0f8c045a6da'}
    require(all(ops[p]['sha256'] == h for p, h in expected.items()), 'current operational generation differs')
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
    for key in ('stage', 'bridge-sha256', 'plan', 'plan-sha256', 'budget-seconds'):
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
                    c = stack.enter_context(common.Capture(p, h, capture=collect, limit=64*1024**2 if collect else 1024**3))
                    owned.append(c)
                    return c
                bridge = capture(root / SELF, args.bridge_sha256, True)
                require(compile(bridge.data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
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
                    plan = current_plan(raw_plan, m, root, args.bridge_sha256, common)
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
                        require(m.runtime_paths() <= runtime | {o.path for o in owned}, 'loaded runtime outside plan')
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
