"""Current F5 transport; original producer and numerical reference stay unchanged.

The reference's v1 source-owner predicate is a validation-domain constant only
in the in-memory projection. Actual current provenance is checked separately.
Neither stage grants fresh-process closure or evolution authority.
"""
import argparse
from contextlib import ExitStack, contextmanager
import copy
from hashlib import sha256
import json
import os
from pathlib import Path
import stat
import sys
import time
from types import ModuleType

_EXECUTING_CODE = sys._getframe().f_code
ROOT = Path(__file__).resolve().parents[2]
SELF = 'scripts/eom/execute-f5-prehistory-handoff.py'
SUBJECT = 'scripts/eom/prepare-f5-prehistory-handoff.py'
REFERENCE = 'scripts/eom/verify-f5-prehistory-handoff.py'
INSPECTOR = 'src/eom/native/eom_f5_prehistory_inspector.cpp'
PINS = {SUBJECT: '4c9a5d724cb4d0e24fa35dd3cefed661448d0ff69077171f9d6adc869f8a079c',
        REFERENCE: '6c94b0ca16dfe20bed4841a547adca349f2f36cdd5ec04211341d6b060032a68',
        INSPECTOR: 'b9aeb71f6ca48d77e6b22e2ba06b0adb91884b4569399d4c6fc1acd642298b36'}
CURRENT = {'src/eom/src/History.cpp': 'cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5',
 'src/eom/src/Interval.cpp': '5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5',
 'src/eom/include/architrino/eom/Decimal.hpp': '8126e685d9be5a2d4935d29eaa12d1aa995822781c198d48d809c0f0b6ddad7f',
 'src/eom/include/architrino/eom/History.hpp': '0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3',
 'src/eom/src/CoupledEvolution.cpp': '6fa61e458ec337982932a7882090a875ff045e0da10b405c221bc671a68a4d0d'}
PREFIX = '8d14aa3bc5e0788f06c8b79e788a55df82e8db83736e2413c9800a78af63111b'
RESTRICTION = '5a2e9158bf26c34a7a9755e53ea1337cc006765727d9afe1ef1304c3fcd140b0'
SCHEMA = 'braid-program/f5-current-handoff-plan.v1'
HANDOFF = 'braid-program/f5-prehistory-handoff.v2'
LIMIT = 8*1024**2


def require(ok, why):
    if not ok:
        raise ValueError(why)


def decode(data):
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, 'duplicate JSON key')
            result[key] = value
        return result
    return json.loads(data, object_pairs_hook=pairs, parse_constant=lambda x: (_ for _ in ()).throw(ValueError(x)))


class Bound:
    """Current transport capture: retain descriptors, check path and bytes again."""
    def __init__(self, path, digest, collect=True, limit=LIMIT):
        self.path, self.digest, self.collect, self.limit = Path(path).absolute(), digest, collect, limit

    @staticmethod
    def identity(s):
        return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns

    def __enter__(self):
        require(self.path == self.path.resolve(), 'canonical non-symlink path required')
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            s = os.fstat(self.fd)
            require(stat.S_ISREG(s.st_mode) and 0 < s.st_size <= self.limit, 'bounded regular input required')
            self.initial = self.identity(s)
            self.data = self.scan(self.collect)
            return self
        except BaseException:
            os.close(self.fd)
            raise

    def scan(self, collect=False):
        parts, offset, digest = [], 0, sha256()
        while offset < self.initial[2]:
            chunk = os.pread(self.fd, min(1024*1024, self.initial[2]-offset), offset)
            require(chunk, 'capture truncated')
            offset += len(chunk); digest.update(chunk)
            if collect:
                parts.append(chunk)
        require(digest.hexdigest() == self.digest, 'capture hash differs: '+str(self.path))
        require(self.identity(os.fstat(self.fd)) == self.initial == self.identity(os.lstat(self.path)), 'capture changed or replaced')
        return b''.join(parts) if collect else None

    def binding(self):
        return dict(path=str(self.path), sha256=self.digest, bytes=self.initial[2])

    def __exit__(self, *_):
        os.close(self.fd)


@contextmanager
def tool(bound):
    module = ModuleType('_f5_current_'+bound.digest)
    module.__file__ = str(bound.path)
    sys.modules[module.__name__] = module
    try:
        exec(compile(bound.data, str(bound.path), 'exec', dont_inherit=True), module.__dict__)
        yield module
    finally:
        sys.modules.pop(module.__name__, None)


def validate_plan(plan):
    require(type(plan) is dict and set(plan) == {'schema','prefix','restriction','buildReceipt','buildReview','buildAdmission','executable','sourceOwners','runtimeBindings'}, 'closed current plan required')
    require(plan['schema'] == SCHEMA and plan['sourceOwners'] == CURRENT, 'reviewed current source owners differ')
    require(type(plan['runtimeBindings']) is list and plan['runtimeBindings'], 'runtime census required')
    rows = [plan[role] for role in ('prefix','restriction','buildReceipt','buildReview','buildAdmission','executable')] + plan['runtimeBindings']
    require(len({r['path'] for r in plan['runtimeBindings']}) == len(plan['runtimeBindings']), 'duplicate runtime path')
    for r in rows:
        require(type(r) is dict and set(r) == {'path','sha256','bytes'}, 'closed file record required')
        require(type(r['path']) is str and Path(r['path']).is_absolute() and type(r['bytes']) is int and r['bytes'] > 0,
                'absolute bounded file identity required')
        require(type(r['sha256']) is str and len(r['sha256']) == 64 and all(c in '0123456789abcdef' for c in r['sha256']), 'SHA-256 required')
    require(plan['prefix']['sha256'] == PREFIX and plan['restriction']['sha256'] == RESTRICTION, 'original prerequisite bytes required')


def same_file(a, b):
    return a['sha256'] == b['sha256'] and a['bytes'] == b['bytes'] and Path(a['path']).absolute() == Path(b['path']).absolute()


def validate_build(plan, build, review, admission):
    require(build['schema'] == 'braid-program/f5-prehistory-handoff-build.v1' and
            build['status'] == 'build-recorded-pending-independent-review' and build['accepted'] is False and
            build['sourceOwners'] == CURRENT, 'current build contract differs')
    require(all(build[k] is False for k in ('dataLoaded','eomExecuted','evolutionAuthorized','h3EvidenceEligible')) and build['rootCalls'] == 0, 'build grants data/evolution authority')
    require(same_file(build['built']['executable'], plan['executable']), 'build executable differs')
    for role, path in (('wrapper', SUBJECT), ('inspector', INSPECTOR)):
        require(build['producerSources'][role]['sha256'] == PINS[path] and Path(build['producerSources'][role]['path']).absolute() == ROOT/path, 'producer source identity differs')
    require(review['authority']['concreteBuildReviewed'] is True and same_file(review['preparation'], plan['buildReceipt']) and
            same_file(review['executable'], plan['executable']), 'independent build review differs')
    require(same_file(review['outerAdmission'], plan['buildAdmission']), 'review/admission identity differs')
    require(admission['accepted'] is True and admission['processesClosed'] is True and admission['admission']['accepted'] is True and
            same_file(admission['admission']['buildReceipt'], plan['buildReceipt']), 'closed build admission required')
    rows = build['sourcesAfter']
    require({r['path'] for r in rows} == source_census(), 'incomplete build source census')
    require(len({r['path'] for r in rows}) == len(rows), 'duplicate build source')
    require(review['sourceChecks'] == [dict(path=r['path'], expected=r['sha256'], current=r['sha256']) for r in rows], 'build source census differs from independent review')
    for key in ('sources','tools','headerDependencies','externalLibraries'):
        require(build[key+'Before'] == build[key+'After'], 'build changed: '+key)
    require(build['stages'] and all(s['code'] == 0 and s['signal'] is None and s['processGroupClosed'] is True and
            s['timedOut'] is False and s['interrupted'] is False and s['descendantsAfterClose'] is False for s in build['stages']), 'build stage closure differs')


def source_census():
    files = {SUBJECT, REFERENCE, INSPECTOR, 'scripts/eom/prepare-f5-prehistory-handoff-build.mjs',
             'tests/test_f5_prehistory_handoff_producer.py', 'tests/test_f5_prehistory_handoff.py',
             'scripts/eom/prepare-subfield-circular-root.mjs', 'scripts/eom/prepare-f5-enclosed-root.mjs',
             'src/eom/CMakeLists.txt'}
    for folder in ('src/eom/src','src/eom/include'):
        for p in (ROOT/folder).rglob('*'):
            require(not p.is_symlink(), 'symlinked source census')
            if p.is_file(): files.add(p.relative_to(ROOT).as_posix())
            else: require(p.is_dir(), 'nonregular source census')
    return files


def numerical_projection(reference, prefix, restriction, handoff, bindings, progress=None):
    """Only sourceOwners/schema are projected; neither authenticates provenance here."""
    require(handoff['schema'] == HANDOFF and handoff['sourceOwners'] == CURRENT, 'current handoff provenance differs')
    require(handoff['producerBindings'] == bindings, 'actual producer bindings differ')
    projected = copy.deepcopy(handoff)
    projected['schema'] = reference.HANDOFF_SCHEMA
    projected['sourceOwners'] = reference.SOURCE_OWNERS.copy()
    result = reference.analyze_data(prefix, restriction, projected, bindings, progress)
    require(result['accepted'] is False, 'pure reference must not claim process acceptance')
    return result


def deadline_check(started):
    require(time.monotonic()-started < 1800, 'inclusive handoff deadline exceeded')


def runtime_paths():
    paths = {Path(sys.executable).resolve(), (Path(sys.prefix)/'pyvenv.cfg').resolve()}
    for module in tuple(sys.modules.values()):
        for key in ('__file__','__cached__'):
            p = getattr(module,key,None)
            if type(p) is str and Path(p).is_file(): paths.add(Path(p).resolve())
    return paths


def publish_stage(private, output, started):
    deadline_check(started)
    info = os.stat(private,follow_symlinks=False)
    try:
        os.link(private, output)
        deadline_check(started)
    except BaseException:
        if output.exists() and (os.lstat(output).st_dev,os.lstat(output).st_ino) == (info.st_dev,info.st_ino): output.unlink()
        raise


def retract_stage(output):
    private, public = output/'.pending-stage.json', output/'stage.json'
    if private.exists() and public.exists():
        a, b = os.lstat(private), os.lstat(public)
        if (a.st_dev,a.st_ino) == (b.st_dev,b.st_ino): public.unlink()


def runtime_inventory():
    argparse.ArgumentParser().parse_args([])
    quotient = (10**20000+1)//(10**15000+3)
    with ExitStack() as stack:
        for filename in (SUBJECT,REFERENCE):
            b = stack.enter_context(Bound(ROOT/filename,PINS[filename]))
            stack.enter_context(tool(b))
        files = sorted(runtime_paths())
    return {'schema':'braid-program/f5-current-python-runtime.v1','scientificDataLoaded':False,
            'files':[str(p) for p in files]}


def execute(args, started=None):
    started = time.monotonic() if started is None else started
    output = Path(args.out_dir).absolute()
    lane = (ROOT/'.local-data/braid-analysis').resolve()
    require(output.parent.resolve() == lane and output.name.startswith('f5-current-handoff-') and not output.exists(), 'fresh scoped output required')
    for key in os.environ:
        require(not key.startswith('DYLD_') and key not in ('LD_PRELOAD','LD_LIBRARY_PATH'), 'injected library environment')
    with ExitStack() as stack:
        captures = {}
        def capture(role, path, digest, collect=True, limit=LIMIT):
            captures[role] = stack.enter_context(Bound(path,digest,collect,limit))
            return captures[role]
        own = capture('bridge', ROOT/SELF, args.bridge_sha256)
        require(compile(own.data, _EXECUTING_CODE.co_filename,'exec',dont_inherit=True,optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing transport differs')
        plan_file = capture('plan', args.plan, args.plan_sha256)
        plan = decode(plan_file.data); validate_plan(plan)
        for role in ('prefix','restriction','buildReceipt','buildReview','buildAdmission','executable'):
            r = plan[role]; b = capture(role,r['path'],r['sha256'],role != 'executable',256*1024**2 if role == 'executable' else LIMIT)
            require(b.binding() == r, 'declared file size differs')
        build,review,admission = [decode(captures[r].data) for r in ('buildReceipt','buildReview','buildAdmission')]
        validate_build(plan,build,review,admission)
        for role,p in (('subject',SUBJECT),('reference',REFERENCE),('inspector',INSPECTOR)):
            capture(role,ROOT/p,PINS[p])
        for r in build['sourcesAfter']:
            b = capture('source:'+r['path'],r.get('realPath',r['path']),r['sha256'],False)
            require(b.initial[2] == r['bytes'], 'build source size differs')
        runtime = set()
        for r in plan['runtimeBindings']:
            b = capture('python:'+r['path'],r['path'],r['sha256'],False,256*1024**2)
            require(b.binding() == r, 'runtime size differs')
            runtime.add(b.path)
        def check_runtime():
            require(runtime_paths() <= runtime | {b.path for b in captures.values()}, 'loaded runtime outside census')
            deadline_check(started)
        check_runtime()
        for p,digest in CURRENT.items():
            require(any(Path(r.get('realPath',r['path'])).absolute() == ROOT/p and r['sha256'] == digest for r in build['sourcesAfter']), 'current owner absent from build')
        for index,r in enumerate(build['runtimeDependencies']):
            if r['status'] == 'file-hashed':
                b = capture('runtime:'+str(index),r.get('realPath',r['path']),r['sha256'],False,256*1024**2)
                require(b.initial[2] == r['bytes'], 'linked runtime size differs')
            else:
                require(r['status'] == 'platform-dyld-shared-cache-not-file-hashable' and
                        r['requested'].startswith(('/usr/lib/','/System/Library/')) and
                        r['systemVersion'] == build['systemVersion'] and
                        Path(r['consumer']).absolute() in {Path(build['built']['executable']['path']).absolute()} |
                        {Path(x.get('realPath',x.get('path',''))).absolute() for x in build['runtimeDependencies'] if x['status']=='file-hashed'},
                        'unknown runtime trust boundary')
        with tool(captures['subject']) as producer:
            with producer.Watch() as watch:
                output.mkdir(mode=0o700)
                prefix,restriction = decode(captures['prefix'].data),decode(captures['restriction'].data)
                bindings = {'source':captures['inspector'].binding(),'buildReceipt':captures['buildReceipt'].binding(),'executable':captures['executable'].binding()}
                if args.stage == 'produce':
                    require(restriction['accepted'] is True and restriction['prefix']['sha256'] == PREFIX, 'unaccepted restriction')
                    producer.write_new(output/'inspector-input.txt',producer.protocol(prefix))
                    for b in captures.values(): b.scan()
                    producer.run_inspector([str(captures['executable'].path),'--inspect'],output/'inspector-input.txt',output/'inspector-output.json',output/'inspector-stderr.log',watch)
                    handoff = producer.assemble(prefix,decode(producer.read_owned(output/'inspector-output.json')),bindings)
                    handoff['schema'],handoff['sourceOwners'] = HANDOFF,CURRENT.copy()
                    result = {'handoff':producer.write_new(output/'.pending-handoff.json',producer.json_bytes(handoff)), 'inspectorClosed':True}
                else:
                    require(args.handoff and args.handoff_sha256, 'handoff input required')
                    h = capture('handoff',args.handoff,args.handoff_sha256)
                    with tool(captures['reference']) as reference:
                        numerical = numerical_projection(reference,prefix,reference.parse_json(captures['restriction'].data,metadata=True),
                            reference.parse_json(h.data),bindings,watch.check)
                    result = {'handoff':h.binding(),'numerical':numerical,'dataChecksPassed':numerical['dataChecksPassed'],
                        'projectionBoundary':'v1 schema and original sourceOwners equality are validation-domain constants, not actual provenance checks; current provenance is independently checked by transport'}
                for b in captures.values(): b.scan()
                packet = {'schema':'braid-program/f5-current-handoff-stage.v1','stage':args.stage,'completed':True,'accepted':False,
                    'privateUntilExternalAdmission':True,'runtimeCensus':'interpreter, pyvenv.cfg and loaded Python source/cache/extension module files; macOS shared-cache libraries remain platform trusted',
                    'requiresFreshExternalCompletion':True,'h3EvidenceEligible':False,'evolutionAuthorized':False,
                    'plan':plan_file.binding(),'bindings':{role:b.binding() for role,b in captures.items()},**result}
                private_record = producer.write_new(output/'.pending-stage.json',producer.json_bytes(packet))
                for b in captures.values(): b.scan()
                watch.check(); check_runtime()
        check_runtime()
    check_runtime()
    publish_stage(output/'.pending-stage.json',output/'stage.json',started)
    record = {**private_record,'path':str(output/'stage.json')}
    return {'completed':True,'accepted':False,'stage':args.stage,'receipt':record,'h3EvidenceEligible':False}


def main():
    if sys.argv[1:] == ['--runtime-inventory']:
        print(json.dumps(runtime_inventory()),flush=True)
        return 0
    parser=argparse.ArgumentParser(description=__doc__)
    for flag in ('stage','plan','plan-sha256','bridge-sha256','out-dir'):
        parser.add_argument('--'+flag,required=True,**({'choices':['produce','verify']} if flag=='stage' else {}))
    for flag in ('handoff','handoff-sha256'): parser.add_argument('--'+flag)
    args=parser.parse_args()
    try:
        started = time.monotonic()
        result = execute(args,started)
        deadline_check(started)
        print(json.dumps(result),flush=True)
        deadline_check(started)
    except BaseException as error:
        retract_stage(Path(args.out_dir).absolute())
        print(json.dumps({'completed':False,'accepted':False,'failure':str(error)}),file=sys.stderr,flush=True)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
