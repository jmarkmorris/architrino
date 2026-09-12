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
import subprocess
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
RUNTIME_LIMIT = 256*1024**2
OPERATIONAL_ROLES = {
    "scripts/eom/f5-current-source-admission.mjs": "admission",
    "scripts/equation-mapping/current-source-manifest.mjs": "manifest-reader",
    "scripts/eom/launch-f5-prehistory-handoff-build.mjs": "launcher",
    "scripts/eom/prepare-f5-enclosed-root-build.mjs": "current-source",
    "scripts/eom/prepare-f5-prehistory-handoff-build.mjs": "current-source",
    "scripts/eom/prepare-f5-enclosed-root.mjs": "current-source",
    "scripts/eom/run-f5-enclosed-root.mjs": "current-source",
    "scripts/eom/run-current-f5-enclosed-root.mjs": "current-source",
    "scripts/eom/execute-f5-prehistory-handoff.py": "current-source",
    "scripts/eom/run-f5-current-handoff.mjs": "current-source",
    "scripts/eom/prepare-f5-original-input-tree.mjs": "current-source",
    "scripts/eom/prepare-subfield-circular-root.mjs": "current-source",
    "scripts/eom/launch-subfield-circular-root-pilot.mjs": "current-source",
    "scripts/dev/owned-compute-supervisor.mjs": "current-source",
    "tests/option-b-f5-admission.test.mjs": "current-source"
}


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


def admit_operational_sources(args, stack, captures):
    """Execute only the externally selected Node admission/reader generation."""
    map_path = ROOT/'reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld'
    digest = getattr(args, 'source_map_sha256', None)
    require(type(digest) is str and len(digest) == 64 and all(c in '0123456789abcdef' for c in digest), 'externally selected F5 source-map digest required')
    node = Path(getattr(args, 'node', '')).absolute()
    require(getattr(args, 'node', None) and node == node.resolve() and node.is_file(), 'explicit canonical Node capability required')
    for key in os.environ:
        require(not key.startswith('DYLD_') and key not in ('NODE_OPTIONS','NODE_PATH','LD_PRELOAD','LD_LIBRARY_PATH'), 'injected admission environment')
    node_digest = getattr(args, 'node_sha256', None)
    node_bytes = getattr(args, 'node_bytes', None)
    require(type(node_digest) is str and len(node_digest) == 64 and all(c in '0123456789abcdef' for c in node_digest), 'externally selected Node SHA-256 required')
    require(type(node_bytes) is int and 0 < node_bytes <= RUNTIME_LIMIT, 'externally selected Node byte size required')
    node_capture = stack.enter_context(Bound(node,node_digest,False,RUNTIME_LIMIT))
    require(node_capture.initial[2] == node_bytes, 'selected Node size differs')
    captures['nodeRuntime'] = node_capture
    inherited = decode(getattr(args,'source_identities','{}').encode())
    require(type(inherited) is dict, 'original operational identity table required')
    selected = stack.enter_context(Bound(map_path, digest))
    captures['sourceMap'] = selected
    helper_path = 'scripts/eom/f5-current-source-admission.mjs'
    rows = [r for r in decode(selected.data).get('@graph', []) if r.get('@type') == 'Source']
    require(len(rows) == len(OPERATIONAL_ROLES) and {r.get('binding',{}).get('path') for r in rows} == set(OPERATIONAL_ROLES), 'independent exact F5 operational source census required')
    expected = {str(map_path):selected}
    for row in rows:
        filename = row['binding']['path']
        require(row.get('role') == OPERATIONAL_ROLES[filename], 'independent F5 operational role differs')
        b = stack.enter_context(Bound(ROOT/filename,row['binding']['sha256'],filename == helper_path))
        expected[str(b.path)] = b
        captures['operational:'+str(b.path)] = b
    for b in captures.values():
        if str(b.path) in inherited:
            require(':'.join(map(str,b.initial)) == inherited[str(b.path)], 'inherited F5 original source identity differs')
    require(not inherited or set(inherited) == set(expected) | {str(node)}, 'complete inherited F5 identity census required')
    helper = expected[str(ROOT/helper_path)]
    captures['operationalAdmission'] = helper
    import base64
    source_url = 'data:text/javascript;base64,'+base64.b64encode(helper.data).decode('ascii')
    script = """import fs from 'node:fs';
const input=JSON.parse(fs.readFileSync(0,'utf8'));
const M=await import(input.module);
const a=await M.admitF5Sources(input.root,input.digest,input.identities);
a.recheck();console.log(JSON.stringify({sources:a.sources,identities:a.identities}));"""
    originals = {filename: ':'.join(map(str,b.initial)) for filename,b in expected.items()}
    for b in captures.values(): b.scan()
    result = subprocess.run([str(node),'--input-type=module','-e',script], input=json.dumps(dict(module=source_url,root=str(ROOT),digest=digest,identities=originals)).encode(),
                            stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=15,check=False)
    require(result.returncode == 0 and len(result.stdout) <= LIMIT, 'F5 captured source admission rejected: '+result.stderr[-2000:].decode(errors='replace'))
    admission = decode(result.stdout)
    require(type(admission) is dict and set(admission) == {'sources','identities'} and type(admission['sources']) is list and type(admission['identities']) is dict, 'closed Node admission result required')
    require(len(admission['sources']) == len(expected) and {r.get('path') for r in admission['sources']} == set(expected) and set(admission['identities']) == set(expected), 'Node result omits independent operational census')
    for r in admission['sources']:
        b = expected[r['path']]
        require(b.binding() == r and ':'.join(map(str,b.initial)) == admission['identities'][r['path']], 'F5 operational original identity differs')
    for b in captures.values(): b.scan()


def recheck_operational_originals(originals):
    for binding, identity in originals:
        with Bound(binding['path'],binding['sha256'],False,RUNTIME_LIMIT) as b:
            require(b.binding() == binding and b.initial == identity, 'F5 operational original identity changed before completion')


def validate_plan(plan):
    require(type(plan) is dict and set(plan) == {'schema','prefix','restriction','buildReceipt','buildReview','buildAdmission','executable','sourceOwners','runtimeBindings'}, 'closed current plan required')
    require(plan['schema'] == SCHEMA and plan['sourceOwners'] == CURRENT, 'reviewed current source owners differ')
    rows = [plan[role] for role in ('prefix','restriction','buildReceipt','buildReview','buildAdmission','executable')]
    for r in rows:
        require(type(r) is dict and set(r) == {'path','sha256','bytes'}, 'closed authored/input record required')
        require(type(r['path']) is str and Path(r['path']).is_absolute() and type(r['bytes']) is int and r['bytes'] > 0,
                'absolute bounded authored/input identity required')
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


def runtime_inventory(args):
    quotient = (10**20000+1)//(10**15000+3)
    with ExitStack() as stack:
        captures = {}
        admit_operational_sources(args,stack,captures)
        for filename in (SUBJECT,REFERENCE):
            b = stack.enter_context(Bound(ROOT/filename,PINS[filename]))
            stack.enter_context(tool(b))
        files = sorted(runtime_paths() | {captures['nodeRuntime'].path})
        for b in captures.values(): b.scan()
        originals = [(b.binding(),b.initial) for b in captures.values()]
    recheck_operational_originals(originals)
    return {'_operationalOriginals':originals,'schema':'braid-program/f5-current-python-runtime.v1','scientificDataLoaded':False,
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
        admit_operational_sources(args,stack,captures)
        operational_originals = [(b.binding(),b.initial) for b in captures.values()]
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
        def check_runtime():
            deadline_check(started)
        check_runtime()
        for p,digest in CURRENT.items():
            require(any(Path(r.get('realPath',r['path'])).absolute() == ROOT/p and r['sha256'] == digest for r in build['sourcesAfter']), 'current owner absent from build')
        for r in build['runtimeDependencies']:
            require(r['status'] == 'runtime-capability' and Path(r['requested']).is_absolute(),
                    'unknown runtime capability boundary')
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
                    'privateUntilExternalAdmission':True,
                    'requiresFreshExternalCompletion':True,'h3EvidenceEligible':False,'evolutionAuthorized':False,
                    'plan':plan_file.binding(),'bindings':{role:b.binding() for role,b in captures.items()},**result}
                private_record = producer.write_new(output/'.pending-stage.json',producer.json_bytes(packet))
                for b in captures.values(): b.scan()
                watch.check(); check_runtime()
        check_runtime()
    check_runtime()
    recheck_operational_originals(operational_originals)
    publish_stage(output/'.pending-stage.json',output/'stage.json',started)
    recheck_operational_originals(operational_originals)
    record = {**private_record,'path':str(output/'stage.json')}
    return {'completed':True,'accepted':False,'stage':args.stage,'receipt':record,'h3EvidenceEligible':False,'_operationalOriginals':operational_originals}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime-inventory',action='store_true')
    parser.add_argument('--source-map-sha256',required=True)
    parser.add_argument('--node',required=True)
    parser.add_argument('--node-sha256',required=True)
    parser.add_argument('--node-bytes',required=True,type=int)
    parser.add_argument('--source-identities',default='{}')
    for flag in ('stage','plan','plan-sha256','bridge-sha256','out-dir'):
        parser.add_argument('--'+flag,required='--runtime-inventory' not in sys.argv,**({'choices':['produce','verify']} if flag=='stage' else {}))
    for flag in ('handoff','handoff-sha256'): parser.add_argument('--'+flag)
    args=parser.parse_args()
    if args.runtime_inventory:
        result = runtime_inventory(args)
        originals = result.pop('_operationalOriginals')
        recheck_operational_originals(originals)
        print(json.dumps(result),flush=True)
        recheck_operational_originals(originals)
        return 0
    try:
        started = time.monotonic()
        result = execute(args,started)
        originals=result.pop('_operationalOriginals')
        recheck_operational_originals(originals)
        deadline_check(started)
        print(json.dumps(result),flush=True)
        recheck_operational_originals(originals)
        deadline_check(started)
    except BaseException as error:
        retract_stage(Path(args.out_dir).absolute())
        print(json.dumps({'completed':False,'accepted':False,'failure':str(error)}),file=sys.stderr,flush=True)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
