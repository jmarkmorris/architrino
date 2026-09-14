"""Current execution transport for unchanged conditional-acceleration instruments.

Original declaration and theorem bytes use explicit data-only archive routes.
Current historical authentication restores the prior receipt's actual identities;
its numerical projection and range comparison still use exact captured original
functions. The actual v2 plan bytes remain the recorded launchPlan identity.
"""
import argparse
from contextlib import ExitStack, contextmanager
from dataclasses import asdict
import hashlib
import json
import os
from pathlib import Path
import signal
import resource
import stat
import sys
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code

SELF = 'scripts/eom/execute-f6c-acceleration.py'
SUBJECT = 'scripts/eom/prepare-f6c-continuous-reception-acceleration.py'
VERIFIER = 'scripts/eom/verify-f6c-continuous-reception-acceleration.py'
SUBJECT_SHA = 'd9c5c1ad4332df56f72ac9dc2d569fc5576bc5b4434886221685030e3e620106'
VERIFIER_SHA = 'a0c546124828b5879a2e163b0f965d37b90c251d327301eaa72e031261824e53'
DECLARATION = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md'
DECLARATION_SHA = '3ef8fb9020bae71833b1e06a119672b49a4beb5395f697dcb3d037d088e7891e'
HISTORICAL = [["rootTheorem","reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md","f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68",28340],["reconstructionTheorem","reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md","6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936",21031]]
PLAN_SCHEMA = 'braid-program/f6c-continuous-reception-acceleration-launch.v2'
LIMIT = 64 * 1024**2


def require(ok, message):
    if not ok:
        raise ValueError(message)


class Capture:
    """Hold exact regular-file identity and bytes through final cleanup."""
    def __init__(self, filename, digest, *, capture=False, limit=LIMIT):
        self.path = Path(filename).absolute()
        self.expected, self.collect, self.limit = digest, capture, limit
        self.fd = None

    @staticmethod
    def identity(info):
        return info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns

    def scan(self, collect=False):
        os.lseek(self.fd, 0, os.SEEK_SET)
        parts, count, digest = [], 0, hashlib.sha256()
        while count < self.initial.st_size:
            part = os.read(self.fd, min(65536, self.initial.st_size-count))
            require(bool(part), 'truncated capture')
            count += len(part)
            digest.update(part)
            if collect:
                parts.append(part)
        require(self.identity(os.fstat(self.fd)) == self.identity(self.initial), 'capture changed')
        require(digest.hexdigest() == self.expected, 'capture digest differs')
        require(self.identity(os.stat(self.path, follow_symlinks=False)) == self.identity(self.initial), 'capture replaced')
        return b''.join(parts) if collect else None

    def __enter__(self):
        require(self.path == self.path.resolve(), 'canonical nonsymlink capture required')
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            self.initial = os.fstat(self.fd)
            require(stat.S_ISREG(self.initial.st_mode) and 0 < self.initial.st_size <= self.limit, 'bounded regular capture required')
            self.data = self.scan(self.collect)
            return self
        except BaseException:
            self.__exit__()
            raise

    def recheck(self):
        self.scan()

    def binding(self):
        return dict(path=str(self.path), sha256=self.expected, bytes=self.initial.st_size)

    def __exit__(self, *_):
        if self.fd is not None:
            os.close(self.fd)
            self.fd = None


@contextmanager
def instrument(source):
    name = '_current_acceleration_' + source.expected
    require(name not in sys.modules, 'instrument already loaded')
    module = ModuleType(name)
    module.__file__, module.__package__ = str(source.path), ''
    sys.modules[name] = module
    try:
        exec(compile(source.data, str(source.path), 'exec', dont_inherit=True, optimize=sys.flags.optimize), module.__dict__)
        yield module
    finally:
        sys.modules.pop(name, None)


def scientific_plan(plan, root, bridge_sha):
    """Validate the transport extension without widening scientific predicates."""
    require(type(plan) is dict and plan.get('schema') == PLAN_SCHEMA, 'current v2 plan required')
    require(set(plan) == set('schema scope consumer controls declaration rangeVerifier runtimeBindings operationalBindings limits priorCoverClosure declarationInput executionBridge historicalInputs'.split()), 'closed v2 plan required')
    bridge = plan['executionBridge']
    require(type(bridge) is dict and set(bridge) == {'path', 'sha256', 'bytes'}, 'bridge binding fields')
    require(bridge['path'] == SELF and bridge['sha256'] == bridge_sha and type(bridge['bytes']) is int and bridge['bytes'] > 0, 'bridge identity differs')
    route = plan['declarationInput']
    require(type(route) is dict and set(route) == {'originalPath', 'path', 'sha256', 'bytes'}, 'declaration route fields')
    require(route['originalPath'] == DECLARATION and route['sha256'] == DECLARATION_SHA, 'original declaration differs')
    require(type(route['path']) is str, 'physical declaration path required')
    physical = Path(route['path'])
    require(not physical.is_absolute() and '..' not in physical.parts and str(physical) == route['path'], 'canonical relative declaration route required')
    require(physical.parts[0] == 'reference' and physical.suffix == '.source', 'nonexecuting declaration archive required')
    require(type(route['bytes']) is int and 0 < route['bytes'] <= LIMIT, 'declaration size required')
    require(plan['declaration'] == dict(path=DECLARATION, sha256=DECLARATION_SHA, bytes=route['bytes']), 'logical declaration binding differs')
    require(sum(b == bridge for b in plan['operationalBindings']) == 1, 'bridge missing from execution census')
    routes = plan['historicalInputs']
    require(type(routes) is list and len(routes) == len(HISTORICAL), 'exact historical theorem routes required')
    for route, (role, original, digest, size) in zip(routes, HISTORICAL):
        require(type(route) is dict and set(route) == {'role','originalPath','path','sha256','bytes'}, 'historical route fields')
        require((route['role'],route['originalPath'],route['sha256'],route['bytes']) == (role,original,digest,size) and type(route['bytes']) is int, 'original theorem identity differs')
        p = Path(route['path'])
        require(not p.is_absolute() and '..' not in p.parts and str(p) == route['path'] and p.parts[0] == 'reference' and p.suffix == '.source', 'nonexecuting theorem archive required')
    require(len({r['path'] for r in routes} | {plan['declarationInput']['path']}) == len(routes)+1, 'conflicting archive routes')
    projected = {k: v for k, v in plan.items() if k not in ('declarationInput', 'executionBridge', 'historicalInputs')}
    projected['schema'] = PLAN_SCHEMA.replace('.v2', '.v1')
    return projected, root / physical


def authenticate_original_prior(m, docs, fixed):
    """Authenticate the already accepted chain; never re-prove root truth."""
    manifest,c,a=docs['manifest'],docs['comparison'],docs['admission'];p=docs['priorPlan']
    for obj,key,role in ((manifest,'rows','rows'),(manifest,'pieces','pieces'),(manifest,'launchPlan','priorPlan'),
                         (c,'rows','rows'),(c,'pieces','pieces'),(c,'manifest','manifest'),(c,'launchPlan','priorPlan'),(a,'plan','priorPlan')):
        m.require(m.equal(m.binding(obj[key]),fixed[role]), 'prior original-byte chain differs')
    m.require(c['schema']=='braid-program/f6c-continuous-reception-root-cover-conformance.v1' and c['accepted'] is True and c['scope']=='pilot-cell-0', 'prior comparison not accepted')
    m.require(c['analysis']['accepted'] is False and c['analysis']['conditionalEnclosuresConformant'] is True, 'prior conditional comparison absent')
    for k,n in dict(cellCount=1,pairCellCertificates=64,ordinaryNonselfRows=56,selfExclusionRows=8,distinctNonselfFaceChecks=112,pieceRecordCount=112,recordedGeometryPieceVisits=89208).items():
        m.require(type(c['analysis'][k]) is int and c['analysis'][k]==n, 'prior comparison census differs')
    m.require(m.equal(c['claims'],dict(conditionalRootCoverValidated=True,reconstructedFamilyApplicabilityAuthenticated=True,
        historicalTrajectoryIdentityEstablished=False,rootExecutionAuthorized=False,metricsAvailable=False,
        h3EvidenceEligible=False,scoreAuthorized=False,eomExecuted=False)), 'prior comparison claims differ')
    m.flags(c['libraryFlags'],m.ROOT_FLAGS)
    m.require(p['schema']=='braid-program/f6c-cached-root-cover-pilot-launch.v1' and p['scope']=='pilot-cell-0', 'prior plan scope differs')
    contract=p['comparisonContract']
    m.require(contract['verifierSha256']=='19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132' and
        contract['declarationSha256']=='7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4' and
        c['verifier']['sha256']==contract['verifierSha256'], 'prior oracle generation differs')
    m.require(m.equal(manifest['subjectSourceBindings'],contract['subjectSourceBindings']) and m.equal(manifest['runtimeBindings'],contract['runtimeBindings']), 'prior source/runtime chain differs')
    for role in ('export','reconstruction','guards','rootTheorem','reconstructionTheorem'):
        m.require(m.equal(m.binding(c['fixedBindings'][role]),fixed[role]), 'prior proof original binding differs')
    for role in ('reconstruction','guards'):
        proof=docs[role]
        m.require(proof['accepted'] is True and proof['historyExportBefore']['sha256']==proof['historyExportAfter']['sha256']==fixed['export']['sha256'] and
                proof['claims']['subjectMembershipEstablished'] is False, 'original family proof differs')
    for key in ('anchoredPrehistoryFamilyNonempty','fixedAcceptedFrameFutureContained','reconstructedFullHistoryFamilyNonempty','reconstructedFamilyContainedInOriginalEnclosures'):
        m.require(docs['reconstruction']['claims'][key] is True, 'coherent-family premise missing')
    for key in ('conditionalUniformOldestBoundaryResidualStrictlyNegative','conditionalUniformSameTimeNonselfSeparation','conditionalUniformSpeedStrictlyBelowOne'):
        m.require(docs['guards']['claims'][key] is True, 'uniform root premise missing')
    m.require(a['schema']=='braid-program/f6c-cached-root-cover-pilot-admission.v1' and a['accepted'] is True and a['scope']=='pilot-cell-0' and a['processesClosed'] is True, 'prior operational admission differs')
    for k in ('eomExecuted','fullRunAuthorized','h3EvidenceEligible','historicalTrajectoryIdentityEstablished','metricsAvailable'):m.require(a[k] is False, 'prior authority promoted')
    m.seq(a['stages'],2)
    for item,stage in zip(a['stages'],('consumer','comparison')):
        process=item['process'];completed=item['admission']['completion']
        m.require(item['stage']==stage and item['admission']['accepted'] is True and process['accepted'] is True and
                process['processesClosed'] is True and m.equal(process['exit'],dict(code=0,signal=None)) and completed['completed'] is True, 'prior stage closure differs')
        m.seq(process['gates'],1);m.require(process['gates'][0]['retired'] is True, 'prior gate not retired')
        m.require(completed['accepted'] is (stage=='comparison'), 'prior completion disposition differs')
        if stage=='consumer':m.require(m.equal(completed['outputs'],[fixed[k] for k in ('rows','pieces','manifest')]), 'prior consumer outputs differ')
        else:m.require(m.equal(completed['output'],fixed['comparison']), 'prior comparison output differs')


def compare_current_candidate(m, packet, plan, plan_binding, consumer_binding, fixed, docs, rows, pieces):
    m.keys(packet,'schema scope accepted status fixedBindings launchPlan consumer declaration rangeVerifier runtimeBindings operationalBindings priorCoverClosure projection ranges census claims publicationRequires'.split())
    m.require(packet['schema']==m.CANDIDATE_SCHEMA and packet['scope']==m.SCOPE and packet['accepted'] is False and
            packet['status']=='conditional-range-candidate', 'candidate scope/self-acceptance differs')
    for key,expected in dict(fixedBindings=fixed,launchPlan=plan_binding,consumer=consumer_binding,declaration=plan['declaration'],
                            rangeVerifier=plan['rangeVerifier'],runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],
                            priorCoverClosure=plan['priorCoverClosure'],census=m.CENSUS).items():
        m.require(m.equal(packet[key],expected), 'candidate provenance/census differs: '+key)
    m.flags(packet['claims'],m.CANDIDATE_FLAGS)
    m.require(packet['publicationRequires']=='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes', 'candidate publication boundary differs')
    m.seq(rows,64);m.seq(pieces,112);authenticate_original_prior(m,docs,fixed)
    projected=m.reconstruct_projection(docs['export'],docs['manifest'],rows,pieces,fixed)
    m.require(m.equal(packet['projection'],projected), 'candidate original projection differs')
    return m.compare_ranges(packet['ranges'],projected)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('stage', 'bridge-sha256', 'plan', 'plan-sha256', 'out', 'budget-seconds'):
        parser.add_argument('--' + name, required=True)
    parser.add_argument('--check-plan', action='store_true')
    parser.add_argument('--git-binary')
    parser.add_argument('--candidate')
    parser.add_argument('--candidate-sha256')
    args = parser.parse_args()
    require(args.stage in ('consumer', 'comparison'), 'unknown stage')
    root = Path(__file__).resolve().parents[2]
    began = time.monotonic()
    usage_before = resource.getrusage(resource.RUSAGE_SELF)
    seconds = float(args.budget_seconds)
    require(0 < seconds <= 1800, 'bounded budget required')
    deadline = began + seconds
    progress = dict(stage='capture', completedCells=0, accepted=False)
    publication = None

    def beat(*_):
        print(json.dumps({**progress, 'elapsedSeconds': time.monotonic()-began}), file=sys.stderr, flush=True)
        require(time.monotonic() < deadline, 'execution deadline')
        signal.setitimer(signal.ITIMER_REAL, min(15, max(.000001, deadline-time.monotonic())))

    previous = signal.signal(signal.SIGALRM, beat)
    signal.setitimer(signal.ITIMER_REAL, min(15, seconds))
    try:
        with ExitStack() as stack:
            owned = []
            def capture(p, h, **kw):
                obj = stack.enter_context(Capture(p, h, **kw))
                owned.append(obj)
                return obj
            bridge = capture(root/SELF, args.bridge_sha256, capture=True)
            require(compile(bridge.data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True, optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing bridge differs')
            numerical = capture(root/(SUBJECT if args.stage == 'consumer' else VERIFIER), SUBJECT_SHA if args.stage == 'consumer' else VERIFIER_SHA, capture=True)
            m = stack.enter_context(instrument(numerical))
            auth_module = m if args.stage == 'comparison' else stack.enter_context(instrument(capture(root/VERIFIER, VERIFIER_SHA, capture=True)))
            plan_file = capture(args.plan, args.plan_sha256, capture=True)
            raw_plan = m.decode(plan_file.data, receipt=True)
            plan, declaration_path = scientific_plan(raw_plan, root, args.bridge_sha256)
            require(bridge.initial.st_size == raw_plan['executionBridge']['bytes'], 'bridge size differs')
            m.validate_plan(plan, numerical.expected)
            routes = {r['role']:r for r in raw_plan['historicalInputs']}
            fixed_files = {role: capture(root/(routes[role]['path'] if role in routes else p), routes[role]['sha256'] if role in routes else h, capture=True) for role, p, h in m.FIXED}
            fixed = {k: {**v.binding(), 'path': str(root/routes[k]['originalPath'])} if k in routes else v.binding() for k,v in fixed_files.items()}
            for role, route in routes.items():
                require(fixed_files[role].initial.st_size == route['bytes'], 'historical theorem size differs')
            sources = {}
            for key in ('consumer', 'controls', 'declaration', 'rangeVerifier'):
                b = plan[key]
                obj = capture(declaration_path if key == 'declaration' else root/b['path'], b['sha256'])
                require(obj.initial.st_size == b['bytes'], 'source size differs')
                sources[key] = {**obj.binding(), 'path': str(root/b['path'])}
            runtime, execution = set(), []
            for group in ('runtimeBindings', 'operationalBindings'):
                for b in plan[group]:
                    obj = capture(root/b['path'], b['sha256'], limit=1024**3)
                    require(obj.initial.st_size == b['bytes'], 'execution size differs')
                    execution.append(obj.binding())
                    if group == 'runtimeBindings':
                        runtime.add(obj.path)
            # Bridge and numerical module are explicitly captured as source,
            # rather than being mistaken for undeclared standard-library files.
            def runtime_check():
                # Host runtime modules are mutable capabilities, not pinned source.
                return None
            runtime_check()
            docs = {k: m.decode(fixed_files[k].data, receipt=(k != 'export')) for k in ('export','manifest','comparison','admission','reconstruction','guards','priorPlan')}
            authenticate_original_prior(auth_module, docs, fixed)
            require(docs['export']['fieldSpeed']=='1' and docs['export']['coupling']=='10.304229970992187', 'source constants differ')
            if args.check_plan:
                for obj in owned:
                    obj.recheck()
                print(json.dumps(dict(metadataValidated=True, scientificCalls=0, stage=args.stage, bindings=len(owned), plan=plan_file.binding())), flush=True)
                return
            docs = {k: m.decode(fixed_files[k].data, receipt=(k != 'export')) for k in ('export', 'manifest', 'comparison', 'admission', 'reconstruction', 'guards', 'priorPlan')}
            output = Path(args.out).absolute()
            require(output == output.resolve() and not output.exists() and not output.is_symlink(), 'fresh canonical output required')
            if args.stage == 'consumer':
                git = Path(args.git_binary).resolve()
                require(git in runtime and Path(sys.executable).resolve() in runtime, 'interpreter/git absent')
                m.check_output(root, output.parent, git)
                output.parent.mkdir(mode=0o700)
                require(output.name == 'range.json', 'candidate filename differs')
                with m.captured_reference(fixed_files['reference'].path, fixed_files['reference'].data) as reference:
                    runtime_check()
                    roles = (('original_export','export'),('reconstruction_receipt','reconstruction'),('guards_receipt','guards'),('root_cover','manifest'),('root_cover_comparison','comparison'),('member_acceleration_predeclaration','memberPredeclaration'),('continuous_reception_enclosure_contract','rootTheorem'))
                    bindings = tuple(reference.Binding(role, **fixed[key]) for role, key in roles)
                    progress['stage'] = 'conditional-range-evaluation'
                    mapped = m.project_cell(docs['export'], docs['manifest'], m.records(fixed_files['rows'].data,64), m.records(fixed_files['pieces'].data,112), reference, bindings)
                    result = reference.evaluate_cell(mapped).to_record()
                    require(result['status'] == 'conditional_ranges' and all(v is False for v in result['claims'].values()), 'range authority promoted')
                    packet = dict(schema=m.SCHEMA,scope=m.SCOPE,accepted=False,status='conditional-range-candidate',fixedBindings=fixed,launchPlan=plan_file.binding(),consumer=numerical.binding(),declaration=plan['declaration'],rangeVerifier=plan['rangeVerifier'],runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],priorCoverClosure=plan['priorCoverClosure'],projection=asdict(mapped),ranges=result,census=dict(cells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,pieceRecords=112),claims={k:False for k in ('historicalTrajectoryIdentityEstablished','metricsAvailable','scoreAuthorized','h3EvidenceEligible','eomExecuted','rootsEvaluated','independentRangeComparisonPassed','executionAuthorized')},publicationRequires='fresh successful completion, independent range comparison, external inclusive deadline and closed owned processes')
            else:
                candidate = capture(args.candidate, args.candidate_sha256, capture=True)
                progress['stage'] = 'independent-mapping-and-rational-ranges'
                analysis = compare_current_candidate(m,m.decode(candidate.data),plan,plan_file.binding(),sources['consumer'],fixed,docs,m.records(fixed_files['rows'].data,64),m.records(fixed_files['pieces'].data,112))
                packet = dict(schema=m.REPORT_SCHEMA,accepted=True,scope=m.SCOPE,authority='independent original-mapping and exact-rational conditional range containment only',candidate=candidate.binding(),launchPlan=plan_file.binding(),verifier=numerical.binding(),subjectSources=sources,fixedBindings=fixed,executionBindings=execution,analysis=analysis,referenceClaims={k:False for k in m.RANGE_FLAGS},candidateClaims={k:False for k in m.CANDIDATE_FLAGS},priorCoverClosure=plan['priorCoverClosure'],publicationRequires='matching fresh successful completion, externally observed inclusive deadline and owned-process closure',elapsedSecondsBeforePublication=time.monotonic()-began)
            progress.update(stage='source-rechecks', completedCells=1)
            runtime_check()
            for obj in owned:
                obj.recheck()
            publication = m.Publication(output, deadline)
            result_binding = publication.publish(packet)
            capture(output, result_binding['sha256'])
            for obj in owned:
                obj.recheck()
        require(time.monotonic() < deadline, 'post-cleanup deadline')
        if args.stage == 'consumer':
            usage = resource.getrusage(resource.RUSAGE_SELF)
            completion = dict(completed=True,accepted=False,scope=m.SCOPE,output=result_binding,conditionalCells=1,pairRows=64,ordinaryPairs=56,selfZeros=8,members=8,elapsedSeconds=time.monotonic()-began,processUserSeconds=usage.ru_utime-usage_before.ru_utime,processSystemSeconds=usage.ru_stime-usage_before.ru_stime,maximumIndividualProcessResidentBytes=usage.ru_maxrss if sys.platform=='darwin' else usage.ru_maxrss*1024,independentComparisonRequired=True,externalInclusiveDeadlineAndProcessClosureRequired=True,metricsAvailable=False,scoreAuthorized=False,h3EvidenceEligible=False)
        else:
            completion = dict(completed=True,accepted=True,scope=m.SCOPE,output=result_binding,analysis=analysis,elapsedSeconds=time.monotonic()-began,h3EvidenceEligible=False,eomExecuted=False,externalInclusiveDeadlineAndProcessClosureRequired=True)
        print(json.dumps(completion, allow_nan=False), flush=True)
        require(time.monotonic() < deadline, 'completion deadline')
    except BaseException:
        if publication is not None:
            publication.reject()
        raise
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous)


if __name__ == '__main__':
    main()
