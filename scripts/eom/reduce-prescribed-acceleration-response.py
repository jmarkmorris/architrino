"""Data-only F5 response consumer; never a root search or EOM invocation.

The compute CLI writes ONLY a private, non-admissible candidate. A separately
reviewed watcher must authenticate its fresh completion and whole compute-group
closure, measure resources, call assemble_response, and durably publish under
the SAME inclusive deadline. Its own final successful closure remains required.
No execution/RSS/exit facts are predicted by this running compute process.
The final record's embedded execution snapshot describes the already CLOSED
compute stage, including its private-candidate publication. The separate outer
receipt must explicitly name that scope and observe the whole attempt through
later assembly, final publication, cleanup and successful process closure.
"""
from __future__ import annotations

import argparse
import ast
from contextlib import ExitStack, contextmanager
from datetime import datetime, timezone
from decimal import Decimal
from fractions import Fraction
import hashlib
import json
import math
import os
from pathlib import Path
import re
import signal
import stat
import sys
import tempfile
import time
import types

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/reduce-prescribed-acceleration-response.py'
TESTS = 'tests/test_prescribed_acceleration_response_consumer.py'
REFERENCE = 'scripts/eom/oracle/prescribed_acceleration_response.py'
REFERENCE_TESTS = 'tests/test_prescribed_acceleration_response.py'
PREDECLARATION = 'reference/priorities/braid-program/evidence/2026-08-27-prescribed-acceleration-response-predeclaration.md'
REFERENCE_SHA = 'e630c2f4c48c9fcfc56866166e8b5977d70ab83c6ca3f2b08ad9ea4f3f5e910c'
REFERENCE_TESTS_SHA = '4b0e66feb308544aa6294b126a05f6a3c9fbb403580e8193d3140a7b52c370f1'
PREDECLARATION_SHA = 'c08d7f53616fc2843b3a192f7e3c10229f9a9fe7abc1a8670ddb1706d95756ef'
RESTART = '.local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/'
PREPARED = RESTART+'prepared-20260827-v1/'
LADDER = RESTART+'root-ladder-20260827-v2/'
SCIENCE = (
    ('rootPacket', LADDER+'rung-8.json', 'a430d035d41ad32c89224f1a068c0a2a7947b9e44849f76280e1aa43a86b9052'),
    ('rootLedger', LADDER+'ledger-reduction.json', '37b934854075b500239a733df1b5e70a7ff355f0e56bbdc382adad952288a3a5'),
    ('historyManifest', PREPARED+'history-manifest.json', '5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725'),
    ('nominalConformance', PREPARED+'nominal-history-conformance.json', 'f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0'),
    ('apiConformance', PREPARED+'api-domain-conformance.json', '440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746'),
    ('reviewedBuild', LADDER+'reviewed-build.json', '5c8a9c36804b8bfed45b7f98834c0c104e758465ca0d19402bf0c328d81f9710'),
    ('approvedSource', 'reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json', 'e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb'),
    ('scientificFixture', 'reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json', 'bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344'),
)
IMPORTS = (
    ('scripts/eom/oracle/decimal_interval.py', 'fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'),
    ('scripts/eom/oracle/certified_history.py', 'ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'),
    ('scripts/eom/oracle/continuous_reception_roots.py', 'f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c'),
)
FORMULAS = (
    ('scripts/eom/oracle/reference_kernel.py', 'a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6'),
    ('scripts/eom/oracle/certified_acceleration.py', '62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83'),
)
CAMPAIGN, RUN = 'f5-enclosed-root-restart-20260826-v1', 'prepared-20260827-v1'
POSITION, VELOCITY = '1.528724905003159e-10', '2.866983034112353e-7'
INTERVAL = ['-1', '19.63359163663986']
IDS = tuple(f'f5-axis-{a}-ring-{r}-{p}-worldline' for p in ('positive', 'negative') for a in (1, 2, 3) for r in (1, 2))
FALSE_CLAIMS = ('physicalStrengthChosen', 'eomExecuted', 'evolutionAuthorized', 'braidMetricsComputed',
                'scoreAuthorized', 'retentionEstablished', 'h3EvidenceEligible', 'premiseTruthAuthenticated',
                'analyticTrajectoryIdentityEstablished')
SUBJECT = dict(scope='f5-release', campaignId=CAMPAIGN, runId=RUN, receptionTime='0',
               quantity='G_i', fieldSpeed='1', symbolicStrength='K=kappa*q0^2')
JSON_LIMIT, TOTAL_LIMIT, OUTPUT_LIMIT, LOG_LIMIT = 64*1024**2, 256*1024**2, 8*1024**2, 16*1024**2
HASH = re.compile(r'[0-9a-f]{64}\Z')
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z')
MEMBER_KEYS = ('index', 'constituentId', 'worldlineId', 'polarity', 'historyId', 'historyFingerprint')
SEGMENT_KEYS = ('index', 'tStart', 'tEnd', 'coefficients', 'positionErrors', 'velocityErrors')
ROOT_KEYS = ('lower', 'upper', 'transmitter_factor_lower', 'transmitter_factor_upper',
             'receiver_factor_lower', 'receiver_factor_upper', 'transmitter_factor_sign',
             'transmitter_segment_indices', 'precision_route', 'precision_bits')
REFERENCE_FIELDS = ('schema', 'accepted', 'authority', 'scope', 'campaignId', 'runId', 'receptionTime',
    'searchedInterval', 'sourceHashes', 'interpretations', 'decimalPrecision', 'nativePrecisionBits',
    'arithmeticComplete', 'hypotheses', 'census', 'members', 'contributions', 'selfExclusions',
    'responses', 'claims', 'newRootSearches', 'failures')
CONTRIBUTION_FIELDS = ('packetRowIndex', 'rowId', 'receiverIndex', 'transmitterIndex', 'rootIndex',
    'polarityProduct', 'emissionEndpoints', 'emissionInterval', 'nativeTransmitterFactorEndpoints',
    'nativeReceiverFactorEndpoints', 'nativeSegmentIndices', 'receiverPieces', 'transmitterPieces',
    'transmitterPosition', 'transmitterVelocity', 'displacement', 'distanceEvaluated', 'causalDelay',
    'distance', 'transmitterFactorEvaluated', 'receiverFactorEvaluated', 'transmitterFactor',
    'receiverFactor', 'response')
PACKET_BINDINGS = (
    ('approved-config', SCIENCE[6][1], SCIENCE[6][2]), ('pilot-fixture', SCIENCE[7][1], SCIENCE[7][2]),
    ('restart-predeclaration', 'reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md', '1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5'),
    ('enclosure-evidence', 'reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md', '931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496'),
    ('accepted-enclosure-report', '.local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json', '2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9'),
)
IMPLEMENTATION = (
    ('adapter-source', 'src/eom/native/eom_f5_enclosed_root_cli.cpp', '9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81'),
    ('adapter-executable', '.tmp/f5-enclosed-root-preparation-20260827-v1/eom_f5_enclosed_root_cli', 'd4579244707376239ee448e051698abfd7045d9f49de912f6a7b92802e272455'),
    ('exact-pair-header', 'src/eom/include/architrino/eom/ExactPairBatch.hpp', 'bc4e09892c01f6b855bd4b1378c90999aefda0a747fdd5a816d86283a0e8d751'),
    ('exact-pair-source', 'src/eom/src/ExactPairBatch.cpp', 'c82b71c8335bd02a98941439d26a17ba3fc452318adb91cb5f42a015933e23c1'),
    ('eom-library', '.tmp/f5-enclosed-root-preparation-20260827-v1/libeom_native.a', '922c131381bb514d48fe0fb2bb704db340b51c64db024edf6cfec3ec77b59bcf'),
    ('reducer-source', 'src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs', 'c41857a81ab0ba4e1f9a4f53e6608f097dea83a99f4a0fa002f5ed9590004fb6'),
    ('compiler', LADDER+'resolved-compiler.json', '29c78ad3a57db9f674130f847022c8fcd03730b667eca8850bf0f174f350634f'),
    ('toolchain', SCIENCE[5][1], SCIENCE[5][2]),
)


class Rejected(ValueError):
    pass


def require(ok, reason):
    if not ok:
        raise Rejected(reason)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify_executing_consumer(data):
    require(compile(data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
                    optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing consumer generation differs')


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False).encode()


def decode(data):
    require(type(data) is bytes and len(data) <= JSON_LIMIT, 'bounded original JSON bytes required')
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, 'duplicate JSON key')
            result[key] = value
        return result
    def floating(value):
        parsed = float(value)
        require(math.isfinite(parsed), 'nonfinite JSON number')
        return parsed
    def invalid(_):
        raise Rejected('nonstandard JSON constant')
    try:
        return json.loads(data.decode('utf-8', errors='strict'), object_pairs_hook=pairs,
                          parse_float=floating, parse_constant=invalid)
    except (UnicodeError, json.JSONDecodeError, RecursionError) as error:
        raise Rejected('invalid original JSON') from error


def keys(value, expected):
    require(type(value) is dict and set(value) == set(expected), 'closed object fields differ')


def array(value, count):
    require(type(value) is list and len(value) == count, 'exact array census differs')


def integer(value, lower=0, upper=10**9):
    require(type(value) is int and lower <= value <= upper, 'bounded integer required')
    return value


def decimal_token(value):
    require(type(value) is str and 0 < len(value) <= 512, 'original decimal string required')
    match = TOKEN.fullmatch(value)
    require(match and (match.group(1) is None or (len(match.group(1)) <= 5 and abs(int(match.group(1))) <= 1000)),
            'invalid or oversized decimal token')
    return Decimal(value)


def file_identity(s):
    return (s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns)


class Capture:
    """Retain exact bytes on one regular, non-symlink descriptor until cleanup."""
    def __init__(self, filename, expected, limit=JSON_LIMIT, progress=None):
        self.path, self.expected, self.limit = Path(filename).absolute(), expected, limit
        self.fd, self.data, self.progress = None, None, progress

    def __enter__(self):
        require(type(self.expected) is str and HASH.fullmatch(self.expected), 'authenticated input SHA required')
        require(self.path.resolve() == self.path, 'symlinked input path refused')
        try:
            self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
            self.before = os.fstat(self.fd)
            require(stat.S_ISREG(self.before.st_mode) and 0 <= self.before.st_size <= self.limit, 'bounded regular input required')
            self.data = self._read()
            self.recheck()
            return self
        except BaseException:
            self.__exit__(); raise

    def _read(self):
        chunks, at = [], 0
        while at < self.before.st_size:
            chunk = os.pread(self.fd, min(65536, self.before.st_size-at), at)
            require(chunk, 'input truncated')
            chunks.append(chunk); at += len(chunk)
            if self.progress: self.progress(len(chunk))
        data = b''.join(chunks)
        require(sha(data) == self.expected, 'original input hash differs')
        return data

    def recheck(self):
        require(self.fd is not None and file_identity(os.fstat(self.fd)) == file_identity(self.before)
                and self.path.resolve() == self.path and file_identity(os.lstat(self.path)) == file_identity(self.before),
                'input descriptor/path generation changed')
        require(sha(self._read()) == self.expected, 'input bytes changed')

    def binding(self, role):
        return dict(role=role, path=str(self.path), sha256=self.expected, bytes=self.before.st_size)

    def __exit__(self, *_):
        if self.fd is not None: os.close(self.fd)
        self.fd = None


@contextmanager
def proof_package(captures):
    """Compile a fresh closed relative-import graph from captured source bytes."""
    paths = [p for p, _ in IMPORTS]+[REFERENCE]
    for filename, expected in (*IMPORTS, (REFERENCE, REFERENCE_SHA)):
        require(sha(captures[filename]) == expected, 'frozen mathematical source differs')
    package = '_prescribed_response_'+sha(b''.join(captures[p] for p in paths))+'_'+os.urandom(6).hex()
    parent = types.ModuleType(package); parent.__path__ = []
    sys.modules[package] = parent
    names = [package]
    try:
        for filename in paths:
            stem = Path(filename).stem
            tree = ast.parse(captures[filename], filename)
            for node in ast.walk(tree):
                if isinstance(node, ast.ImportFrom) and node.level:
                    require(node.level == 1 and node.module in ('decimal_interval', 'certified_history', 'continuous_reception_roots'),
                            'unreviewed relative import')
            name = package+'.'+stem
            module = types.ModuleType(name); module.__file__ = filename; module.__package__ = package
            sys.modules[name] = module; names.append(name)
            exec(compile(captures[filename], filename, 'exec', dont_inherit=True, optimize=sys.flags.optimize), module.__dict__)
        reference = sys.modules[package+'.prescribed_acceleration_response']
        require(reference.INPUT_PINS == tuple((r, h) for r, _, h in SCIENCE)
                and reference.FROZEN_IMPORTS == IMPORTS and reference.FORMULA_OWNERS == FORMULAS
                and reference.PREDECLARATION_SHA == PREDECLARATION_SHA, 'frozen reference contract differs')
        yield reference
    finally:
        for name in reversed(names): sys.modules.pop(name, None)


def fnv(segments):
    """Mechanical original-token serialization, not an analytic-history proof."""
    state = 0xcbf29ce484222325
    def add(text):
        nonlocal state
        encoded = text.encode('utf-8')
        for byte in str(len(encoded)).encode('ascii')+b':'+encoded:
            state ^= byte
            state = state*0x100000001b3 & ((1 << 64)-1)
    add('eom_history_segment_chain/v1')
    for s in segments:
        for text in (s['tStart'], s['tEnd'], *(x for row in s['coefficients'] for x in row),
                     *s['positionErrors'], *s['velocityErrors']): add(text)
    return f'fnv1a64-chain-v1:{state:016x}'


def member_projection(member, index, reference):
    keys(member, (*MEMBER_KEYS, 'segments'))
    require(member['index'] == integer(index, 0, 11) and type(member['index']) is int, 'member index differs')
    worldline = IDS[index]
    require(member['worldlineId'] == worldline and member['constituentId'] == worldline.replace('-worldline', '-architrino')
            and member['historyId'] == 'f5-enclosed-root/v1/'+worldline
            and type(member['polarity']) is int and member['polarity'] == (1 if index < 6 else -1), 'original member identity differs')
    array(member['segments'], 1032)
    result, cursor = [], None
    for j, segment in enumerate(member['segments']):
        keys(segment, SEGMENT_KEYS)
        require(type(segment['index']) is int and segment['index'] == j, 'segment index differs')
        a, b = decimal_token(segment['tStart']), decimal_token(segment['tEnd'])
        require(a < b and (cursor is None or a == cursor), 'segment coverage differs')
        array(segment['coefficients'], 3)
        for row in segment['coefficients']:
            array(row, 4)
            for value in row: decimal_token(value)
        require(segment['positionErrors'] == [POSITION]*3 and segment['velocityErrors'] == [VELOCITY]*3, 'original per-axis allowance tokens differ')
        result.append(reference.SegmentTokens(j, segment['tStart'], segment['tEnd'],
                      tuple(tuple(row) for row in segment['coefficients']), tuple(segment['positionErrors']), tuple(segment['velocityErrors'])))
        cursor = b
    require([member['segments'][0]['tStart'], member['segments'][-1]['tEnd']] == INTERVAL, 'original retained domain differs')
    require(fnv(member['segments']) == member['historyFingerprint'], 'original native FNV differs')
    return reference.MemberTokens(index, member['constituentId'], worldline, member['polarity'],
                                  member['historyId'], member['historyFingerprint'], tuple(result))


def expected_bindings(implementation=False):
    table = IMPLEMENTATION if implementation else PACKET_BINDINGS
    return [dict(id=i, path=p, sha256=h, **({'descriptor': 'reviewed F5 '+i} if implementation else {})) for i, p, h in table]


def authenticate_chain(data, root, progress=lambda *_: None):
    """Check relationships of already hash-authenticated originals, not reprove them."""
    packet, ledger, manifest = (data[k] for k in ('rootPacket', 'rootLedger', 'historyManifest'))
    nominal, api, build = (data[k] for k in ('nominalConformance', 'apiConformance', 'reviewedBuild'))
    hashes = {r: h for r, _, h in SCIENCE}
    for obj in (packet, ledger, manifest, nominal, api):
        require(obj['campaignId'] == CAMPAIGN and obj['runId'] == RUN, 'campaign/run identity differs')
    keys(manifest, ('schema', 'campaignId', 'runId', 'normalizedFieldSpeed', 'retainedInterval',
                    'maximumSegmentStep', 'positionWidth', 'velocityWidth', 'members'))
    require(manifest['schema'] == 'braid-program/f5-enclosed-root-history-manifest.v1'
            and manifest['retainedInterval'] == INTERVAL and manifest['normalizedFieldSpeed'] == '1'
            and manifest['maximumSegmentStep'] == '0.02' and manifest['positionWidth'] == POSITION
            and manifest['velocityWidth'] == VELOCITY, 'original manifest controls differ')
    array(manifest['members'], 12)
    require(packet['schema'] == 'braid-program/f5-enclosed-root-rung.v1'
            and packet['bindings'] == expected_bindings() and packet['implementationBindings'] == expected_bindings(True), 'original packet bindings differ')
    require(packet['historyManifestSha256'] == hashes['historyManifest'] and packet['rungSamples'] == 8
            and packet['normalizedFieldSpeed'] == '1' and packet['terminalStatus'] == 'passed'
            and packet['completedRows'] == 1152 and packet['passingRows'] == 1152 and packet['failureCount'] == 0
            and packet['rootTolerance'] == '1e-8' and packet['rootMaxDepth'] == 192 and packet['rootMaxCells'] == 300000
            and packet['workerCount'] == 8 and packet['initialMpfrBits'] == 128 and packet['maximumMpfrBits'] == 512
            and packet['positionWidth'] == POSITION and packet['velocityWidth'] == VELOCITY
            and packet['retainedHistoryDepth'] == '1' and packet['maximumSegmentStep'] == '0.02'
            and packet['analyticInterpolationErrorBounded'] is True and packet['resourceControl']['contact'] is False,
            'original packet controls/status differ')
    require(packet['members'] == [{k: m[k] for k in MEMBER_KEYS} for m in manifest['members']], 'packet/manifest member mapping differs')
    require(ledger['schema'] == 'braid-program/f5-enclosed-root-ledger-reduction.v1' and ledger['accepted'] is True
            and ledger['structurallyAccepted'] is True and ledger['h3EvidenceEligible'] is False
            and ledger['historyManifestSha256'] == hashes['historyManifest'] and ledger['rungOrder'] == [8, 32, 128]
            and ledger['totalRows'] == 24192, 'accepted original ledger differs')
    array(ledger['rungSummaries'], 3)
    summary = ledger['rungSummaries'][0]
    require(summary['rungSamples'] == 8 and summary['rawSha256'] == hashes['rootPacket']
            and summary['rowCount'] == 1152 and summary['ordinaryRootCount'] == 1056
            and summary['maximumPrecisionBits'] == 53, 'ledger does not authenticate original rung')
    for field, role in (('rawHistoryManifest', 'historyManifest'),):
        require(ledger[field] == {'path': str(root/next(p for r, p, _ in SCIENCE if r == role)), 'sha256': hashes[role]}, 'ledger path relationship differs')
    require(ledger['rawRungFiles'][0] == {'path': str(root/SCIENCE[0][1]), 'sha256': hashes['rootPacket']}, 'ledger original packet path differs')
    require(ledger['reducer'] == dict(path=IMPLEMENTATION[5][1], sha256=IMPLEMENTATION[5][2]), 'ledger reducer identity differs')
    for proof, schema, status in ((nominal, 'braid-program/f5-actual-cubic-conformance.v1', 'actual-cubic-conformance-passed'),
                                  (api, 'braid-program/f5-api-domain-conformance.v1', 'api-domain-conformance-passed')):
        require(proof['schema'] == schema and proof['status'] == status and proof['accepted'] is True
                and proof['failure'] is None and proof['resourceContact'] is False and proof['h3EvidenceEligible'] is False
                and proof['historyManifestSha256'] == hashes['historyManifest'] and proof['normalizedFieldSpeed'] == '1'
                and proof['expectedMemberSegments'] == 12384 and proof['processedMemberSegments'] == 12384
                and proof['retainedInterval'] == INTERVAL and proof['positionWidth'] == POSITION
                and proof['velocityWidth'] == VELOCITY and proof['sourceBindings'] == packet['bindings'], 'accepted containment proof differs')
        array(proof['memberResults'], 12)
        for i, (row, member) in enumerate(zip(proof['memberResults'], manifest['members'])):
            require(row['index'] == i and row['worldlineId'] == member['worldlineId']
                    and row['historyFingerprint'] == member['historyFingerprint'], 'containment member mapping differs')
            array(row['segments'], 1032)
            for j, segment in enumerate(row['segments']):
                require(type(segment['index']) is int and segment['index'] == j
                        and segment.get('accepted' if proof is nominal else 'passed') is True, 'incomplete per-segment containment')
            progress('authenticated-containment-members', i+1)
    require(api['constantInterpretations'] == ['source-decimal', 'frozen-binary64']
            and api['nominalCertificateSha256'] == hashes['nominalConformance']
            and api['nominalCertificatePath'] == str(root/SCIENCE[3][1])
            and api['historyManifestPath'] == str(root/SCIENCE[2][1]), 'both-interpretation API/nominal relationship differs')
    require(build['schema'] == 'braid-program/f5-reviewed-build.v1'
            and build['adapterSourceSha256'] == IMPLEMENTATION[0][2]
            and build['runtimePremises'] == ['finite IEEE binary64 nearest rounding', 'gradual underflow'], 'historical build scope differs')
    for field, role in (('nominalConformance', 'nominalConformance'), ('apiConformance', 'apiConformance')):
        require(build[field] == {'path': next(p for r, p, _ in SCIENCE if r == role), 'sha256': hashes[role]}, 'historical build/proof relationship differs')
    require(build['resolvedCompiler'] == dict(path=IMPLEMENTATION[6][1], sha256=IMPLEMENTATION[6][2]), 'resolved compiler receipt differs')
    require(type(build['dependencies']) is list and 0 < len(build['dependencies']) <= 256, 'bounded historical build dependency census required')
    dependencies = {}
    for row in build['dependencies']:
        require(row['path'] not in dependencies or dependencies[row['path']] == row['sha256'], 'conflicting historical dependency binding')
        dependencies[row['path']] = row['sha256']
    for _, filename, digest in IMPLEMENTATION[:6]:
        # The independently accepted reducer is bound directly by the ledger.
        if filename != IMPLEMENTATION[5][1]: require(dependencies.get(filename) == digest, 'historical build dependency relationship differs')
    for row in api['subjectApiBindings']:
        require(dependencies.get(row['path']) == row['sha256'], 'API subject/build relationship differs')
    for proof in (nominal, api):
        require(type(proof['instrumentBindings']) is list and len(proof['instrumentBindings']) == (3 if proof is nominal else 4), 'containment instrument census differs')
        for row in proof['instrumentBindings']:
            require(dependencies.get(row['path']) == row['sha256'], 'containment instrument/build relationship differs')
    # No dependency paths discovered in these documents are opened. Their raw
    # originals are authenticated by the reviewed-build receipt's fixed hash.


def project_pairs(packet, members, reference, progress=lambda *_: None):
    array(packet['rows'], 1152)
    seen, selected = set(), {}
    for original_index, row in enumerate(packet['rows']):
        keys(row, ('phaseIndex', 'receptionTime', 'receiverIndex', 'transmitterIndex', 'receiverConstituentId',
                   'transmitterConstituentId', 'receiverWorldlineId', 'transmitterWorldlineId', 'rowId', 'certificate'))
        phase = integer(row['phaseIndex'], 0, 7)
        rx, tx = integer(row['receiverIndex'], 0, 11), integer(row['transmitterIndex'], 0, 11)
        key = (phase, rx, tx)
        require(key not in seen, 'duplicate original phase/pair')
        seen.add(key)
        for role, member in (('receiver', members[rx]), ('transmitter', members[tx])):
            require(row[role+'WorldlineId'] == member.worldline_id and row[role+'ConstituentId'] == member.constituent_id, 'row member identity differs')
        require(row['rowId'] == f'{members[rx].worldline_id}/{members[tx].worldline_id}/phase-{phase}', 'original row ID differs')
        decimal_token(row['receptionTime'])
        require((row['receptionTime'] == '0') is (phase == 0), 'release selection is ambiguous')
        if phase != 0: continue
        cert = row['certificate']
        require(type(cert) is dict and cert['row_id'] == row['rowId'] and cert['reception_time'] == row['receptionTime'], 'certificate row identity differs')
        for role, member in (('receiver', members[rx]), ('transmitter', members[tx])):
            require(cert[role+'_history_id'] == member.history_id and cert[role+'_history_fingerprint'] == member.history_fingerprint, 'certificate original history differs')
        require(cert['precision_escalated'] is False and cert['mpfr_attempt_count'] == 0
                and cert['mpfr_escalation_attempt_count'] == 0 and cert['diagnostic_detail'] == '', 'unexpected selected precision/debt')
        array(cert['roots'], 0 if rx == tx else 1)
        require(type(cert['root_free_cells']) is list and len(cert['root_free_cells']) <= 300000, 'original root-free cells absent')
        for cell in cert['root_free_cells']:
            keys(cell, ('transmitter_segment_index', 'lower', 'upper', 'residual_lower', 'residual_upper',
                        'receiver_factor_lower', 'receiver_factor_upper', 'lower_value', 'upper_value',
                        'residual_lower_value', 'residual_upper_value', 'numeric_values_valid'))
            integer(cell['transmitter_segment_index'], 0, 1031)
            for field in ('lower', 'upper', 'residual_lower', 'residual_upper', 'receiver_factor_lower', 'receiver_factor_upper'):
                decimal_token(cell[field])
            require(cell['numeric_values_valid'] is True, 'unvalidated native root-free cell')
        roots = []
        for root in cert['roots']:
            keys(root, ROOT_KEYS)
            roots.append(reference.NativeRoot(**{**root, 'transmitter_segment_indices': tuple(root['transmitter_segment_indices'])}))
        kwargs = {field: cert[field] for field in ('receiver_history_id', 'transmitter_history_id',
            'receiver_history_fingerprint', 'transmitter_history_fingerprint', 'reception_time', 'searched_lower', 'searched_upper',
            'field_speed', 'root_tolerance', 'status', 'failure_code', 'root_free_complement', 'memory_boundary_contact',
            'coincident_endpoint_excluded', 'has_difficult_cell', 'difficult_cells', 'achieved_precision_bits')}
        selected[rx, tx] = reference.NativePairSelection(packet_row_index=original_index, row_id=row['rowId'],
            receiver_index=rx, transmitter_index=tx, certificate_schema=cert['schema'], roots=tuple(roots), **kwargs)
        progress('selected-pairs', len(selected))
    require(len(seen) == 1152 and len(selected) == 144, 'complete original and selected census required')
    return tuple(selected[i, j] for i in range(12) for j in range(12))


def build_request(data, root, reference, progress=lambda *_: None):
    authenticate_chain(data, root, progress)
    members = tuple(member_projection(m, i, reference) for i, m in enumerate(data['historyManifest']['members']))
    pairs = project_pairs(data['rootPacket'], members, reference, progress)
    return reference.ResponseInput('f5-release', CAMPAIGN, RUN, '0', '-1', 90,
        tuple((r, h) for r, _, h in SCIENCE), ('source-decimal', 'frozen-binary64'), members, pairs)


class Watch:
    """Local progress/deadline only; external whole-group memory watch required."""
    def __init__(self, budget):
        self.began = time.monotonic()
        value = float(decimal_token(budget))
        require(0 < value <= 1800 and self.began+value > self.began, 'positive advancing remaining deadline required')
        self.deadline = self.began+value
        self.state = dict(stage='capture', verifiedBytes=0, selectedPairs=0, contributions=0)
        self.log_bytes = 0

    def live(self):
        require(time.monotonic() < self.deadline, 'inclusive response deadline')

    def emit(self):
        self.live()
        line = canonical({**self.state, 'elapsedSeconds': time.monotonic()-self.began, 'accepted': False})+b'\n'
        self.log_bytes += len(line)
        require(self.log_bytes <= LOG_LIMIT, 'response log bound')
        sys.stderr.buffer.write(line); sys.stderr.buffer.flush()
        self.live()

    def progress(self, stage, count):
        self.live(); self.state['stage'] = stage
        if stage == 'selected-pairs': self.state['selectedPairs'] = count

    def bytes(self, count):
        self.live(); self.state['verifiedBytes'] += count

    def __enter__(self):
        self.live()
        self.previous = {s: signal.getsignal(s) for s in (signal.SIGALRM, signal.SIGINT, signal.SIGTERM)}
        def alarm(*_):
            self.emit(); signal.setitimer(signal.ITIMER_REAL, min(15, max(0.000001, self.deadline-time.monotonic())))
        def interrupted(*_): raise Rejected('response interrupted')
        signal.signal(signal.SIGALRM, alarm)
        signal.signal(signal.SIGINT, interrupted); signal.signal(signal.SIGTERM, interrupted)
        signal.setitimer(signal.ITIMER_REAL, min(15, max(0.000001, self.deadline-time.monotonic())))
        return self

    def __exit__(self, *_):
        signal.setitimer(signal.ITIMER_REAL, 0)
        for s, previous in self.previous.items(): signal.signal(s, previous)
        self.live()


def publish_once(output, record, live, recheck=lambda: None):
    """Private staging then exclusive publication; late own inode is retracted.

    The caller supplies its observed deadline/cancellation admission. A matching
    successful caller completion and external final hash remain mandatory.
    """
    output = Path(output).absolute()
    require(output.parent.resolve() == output.parent and not output.exists() and not output.is_symlink(), 'fresh regular publication lane required')
    raw = canonical(record)+b'\n'
    require(len(raw) <= OUTPUT_LIMIT, 'response output bound')
    attempt = Path(tempfile.mkdtemp(prefix='.response-private-', dir=output.parent))
    candidate = attempt/'candidate.json'
    linked = False
    try:
        live()
        with open(candidate, 'xb') as handle:
            handle.write(raw); handle.flush(); os.fsync(handle.fileno())
        recheck(); live()
        os.link(candidate, output); linked = True
        directory = os.open(output.parent, os.O_RDONLY)
        try: os.fsync(directory)
        finally: os.close(directory)
        live()
        with Capture(output, sha(raw), OUTPUT_LIMIT) as observed:
            require(observed.data == raw, 'published bytes differ')
        recheck(); live()
        return dict(path=str(output), sha256=sha(raw), bytes=len(raw))
    except BaseException:
        if linked:
            try:
                own, public = os.stat(candidate), os.lstat(output)
                if (own.st_dev, own.st_ino) == (public.st_dev, public.st_ino): os.unlink(output)
            except FileNotFoundError: pass
        # Private original is intentionally retained, never admissible alone.
        raise


def validate_reference_result(value):
    keys(value, REFERENCE_FIELDS)
    for field in ('decimalPrecision', 'nativePrecisionBits', 'newRootSearches'): integer(value[field])
    keys(value['census'], ('members', 'segments', 'orderedPairs', 'ordinaryRoots', 'selfExclusions'))
    for field in value['census']: integer(value['census'][field])
    require(type(value) is dict and value.get('schema') == 'braid-program/prescribed-acceleration-response-reference.v1'
            and value.get('accepted') is False and value.get('arithmeticComplete') is True
            and value.get('scope') == 'f5-release' and value.get('campaignId') == CAMPAIGN and value.get('runId') == RUN
            and value.get('receptionTime') == '0' and value.get('searchedInterval') == ['-1', '0']
            and value.get('sourceHashes') == [dict(role=r, sha256=h) for r, _, h in SCIENCE]
            and value.get('interpretations') == ['source-decimal', 'frozen-binary64']
            and value.get('claims') == {k: False for k in FALSE_CLAIMS}
            and value.get('newRootSearches') == 0 and value.get('failures') == []
            and value.get('decimalPrecision') == 90 and value.get('nativePrecisionBits') == 53
            and value.get('census') == dict(members=12, segments=12384, orderedPairs=144, ordinaryRoots=132, selfExclusions=12),
            'complete unchanged conditional reference record required')
    for field, count in (('members', 12), ('contributions', 132), ('selfExclusions', 12), ('responses', 12)):
        array(value[field], count)
    require(value['authority'] == 'conditional-response-enclosure; original-byte and premise authentication required'
            and value['hypotheses'] == [
                'native complete-root selections authenticated against original packet and accepted ledger',
                'each declared analytic interpretation is one smooth path inside the original nominal and API enclosures',
                'reviewed native build and finite IEEE nearest-rounding/gradual-underflow premises apply'], 'conditional authority/hypotheses differ')
    def box(v):
        keys(v, ('lower', 'upper', 'widthNumerator', 'widthDenominator'))
        a, b = decimal_token(v['lower']), decimal_token(v['upper'])
        require(a <= b, 'inverted response interval')
        n, d = v['widthNumerator'], v['widthDenominator']
        require(type(n) is str and re.fullmatch(r'0|[1-9][0-9]{0,4095}', n)
                and type(d) is str and re.fullmatch(r'[1-9][0-9]{0,4095}', d), 'exact nonnegative width required')
        width = Fraction(b)-Fraction(a)
        require(str(width.numerator) == n and str(width.denominator) == d, 'response width differs')
    def vector(v):
        array(v, 3)
        for x in v: box(x)
    def endpoints(v):
        array(v, 2)
        for end in v:
            keys(end, ('originalToken', 'bits', 'numerator', 'denominator'))
            decimal_token(end['originalToken'])
            require(type(end['bits']) is str and re.fullmatch(r'[0-9a-f]{16}', end['bits'])
                    and type(end['numerator']) is str and re.fullmatch(r'-?(?:0|[1-9][0-9]{0,4095})', end['numerator'])
                    and type(end['denominator']) is str and re.fullmatch(r'[1-9][0-9]{0,4095}', end['denominator']), 'native endpoint record differs')
    for i, member in enumerate(value['members']):
        keys(member, ('index', 'constituentId', 'worldlineId', 'polarity', 'originalHistoryId',
                      'originalHistoryFingerprint', 'mappedDecimalHistorySha256', 'segmentCount', 'receptionPosition', 'receptionVelocity'))
        require(type(member['index']) is int and member['index'] == i and member['worldlineId'] == IDS[i]
                and member['constituentId'] == IDS[i].replace('-worldline', '-architrino')
                and member['originalHistoryId'] == 'f5-enclosed-root/v1/'+IDS[i]
                and type(member['polarity']) is int and member['polarity'] == (1 if i < 6 else -1)
                and type(member['segmentCount']) is int and member['segmentCount'] == 1032
                and re.fullmatch(r'fnv1a64-chain-v1:[0-9a-f]{16}', member['originalHistoryFingerprint'])
                and HASH.fullmatch(member['mappedDecimalHistorySha256']), 'reference member mapping differs')
        vector(member['receptionPosition']); vector(member['receptionVelocity'])
    seen_indices = set()
    def pair_identity(row, rx, tx):
        require(type(row['receiverIndex']) is int and row['receiverIndex'] == rx
                and type(row['transmitterIndex']) is int and row['transmitterIndex'] == tx
                and row['rowId'] == f'{IDS[rx]}/{IDS[tx]}/phase-0', 'response pair mapping differs')
        index = integer(row['packetRowIndex'], 0, 1151)
        require(index not in seen_indices, 'duplicate original response row')
        seen_indices.add(index)
    for row, (rx, tx) in zip(value['contributions'], ((i, j) for i in range(12) for j in range(12) if i != j)):
        keys(row, CONTRIBUTION_FIELDS); pair_identity(row, rx, tx)
        require(type(row['rootIndex']) is int and row['rootIndex'] == 0
                and type(row['polarityProduct']) is int and row['polarityProduct'] == (1 if (rx < 6) == (tx < 6) else -1), 'contribution root/polarity differs')
        for field in ('emissionEndpoints', 'nativeTransmitterFactorEndpoints', 'nativeReceiverFactorEndpoints'): endpoints(row[field])
        for field in ('transmitterPosition', 'transmitterVelocity', 'displacement', 'response'): vector(row[field])
        for field in ('emissionInterval', 'distanceEvaluated', 'causalDelay', 'distance', 'transmitterFactorEvaluated',
                      'receiverFactorEvaluated', 'transmitterFactor', 'receiverFactor'): box(row[field])
        for field in ('receiverPieces', 'transmitterPieces'):
            require(type(row[field]) is list and 0 < len(row[field]) <= 1032, 'bounded complete piece list required')
            prior = -1
            for piece in row[field]:
                keys(piece, ('index', 'domain')); index = integer(piece['index'], 0, 1031)
                require(index > prior, 'piece index order differs'); prior = index; box(piece['domain'])
        require(type(row['nativeSegmentIndices']) is list and 0 < len(row['nativeSegmentIndices']) <= 1032
                and all(type(j) is int and 0 <= j < 1032 for j in row['nativeSegmentIndices'])
                and row['nativeSegmentIndices'] == sorted(set(row['nativeSegmentIndices'])), 'native segment census differs')
    for i, row in enumerate(value['selfExclusions']):
        keys(row, ('packetRowIndex', 'rowId', 'receiverIndex', 'transmitterIndex', 'coincidentEndpointExcluded', 'ordinaryRootCount'))
        pair_identity(row, i, i)
        require(row['coincidentEndpointExcluded'] is True and type(row['ordinaryRootCount']) is int
                and row['ordinaryRootCount'] == 0, 'ordinary self root invented')
    for i, row in enumerate(value['responses']):
        keys(row, ('memberIndex', 'worldlineId', 'components'))
        require(type(row['memberIndex']) is int and row['memberIndex'] == i and row['worldlineId'] == IDS[i], 'response member order differs')
        vector(row['components'])


def validate_output_bindings(bindings):
    expected_roles = [r for r, _, _ in SCIENCE]+['predeclaration', 'reference', 'referenceTests', 'consumer', 'consumerTests', 'pythonExecutable']+[p for p, _ in (*IMPORTS, *FORMULAS)]
    array(bindings, len(expected_roles))
    pinned = {r: h for r, _, h in SCIENCE}
    pinned.update(predeclaration=PREDECLARATION_SHA, reference=REFERENCE_SHA, referenceTests=REFERENCE_TESTS_SHA)
    pinned.update(dict((*IMPORTS, *FORMULAS)))
    for row, role in zip(bindings, expected_roles):
        keys(row, ('role', 'path', 'sha256', 'bytes'))
        require(row['role'] == role and type(row['path']) is str and Path(row['path']).is_absolute()
                and type(row['sha256']) is str and HASH.fullmatch(row['sha256']), 'ordered exact original binding required')
        integer(row['bytes'], 0, JSON_LIMIT)
        require(role not in pinned or row['sha256'] == pinned[role], 'frozen output binding changed')
    require(len({row['path'] for row in bindings}) == len(bindings), 'aliased binding paths')
    consumer_path = Path(next(row['path'] for row in bindings if row['role'] == 'consumer'))
    root = consumer_path.parents[2]
    paths = {r: p for r, p, _ in SCIENCE}
    paths.update(predeclaration=PREDECLARATION, reference=REFERENCE, referenceTests=REFERENCE_TESTS,
                 consumer=SELF, consumerTests=TESTS)
    paths.update({p: p for p, _ in (*IMPORTS, *FORMULAS)})
    for row in bindings:
        if row['role'] in paths:
            require(row['path'] == str(root/paths[row['role']]), 'original fixed binding path differs')


def assemble_response(candidate_bytes, candidate_sha256, completion, execution, expected_bindings, expected_watcher_sha256):
    """Pure watcher-side schema assembly, NOT authentication of caller assertions.

    Watcher MUST independently bind candidate/completion/execution provenance,
    current helper generation, and its final process closure. Embedded elapsed,
    RSS, logs, exit and processesClosed describe the completed COMPUTE stage;
    publicationComplete means its private candidate was durably published.
    outputBytes is the DERIVED final payload length, checked against actual
    published bytes afterward. A separate outer receipt explicitly names this
    embedded scope and measures the entire attempt through final publication
    and all process closure within the original limits. This function neither
    generates those measurements nor turns caller assertions into authority.
    """
    require(type(candidate_bytes) is bytes and len(candidate_bytes) <= OUTPUT_LIMIT
            and HASH.fullmatch(candidate_sha256) and sha(candidate_bytes) == candidate_sha256, 'private candidate identity differs')
    candidate = decode(candidate_bytes)
    validate_output_bindings(expected_bindings)
    keys(candidate, ('schema', 'accepted', 'admissible', 'subject', 'bindings', 'referenceResult', 'referenceResultSha256', 'watcherSha256'))
    require(candidate['schema'] == 'braid-program/prescribed-acceleration-response-private.v1'
            and candidate['accepted'] is False and candidate['admissible'] is False and candidate['subject'] == SUBJECT
            and candidate['bindings'] == expected_bindings and candidate['watcherSha256'] == expected_watcher_sha256,
            'private candidate generation/scope differs')
    validate_reference_result(candidate['referenceResult'])
    require(sha(canonical(candidate['referenceResult'])) == candidate['referenceResultSha256'], 'conditional reference bytes differ')
    keys(completion, ('completed', 'accepted', 'candidate', 'referenceResultSha256', 'elapsedSeconds'))
    keys(completion['candidate'], ('path', 'sha256', 'bytes'))
    require(type(completion['candidate']['path']) is str and Path(completion['candidate']['path']).is_absolute(), 'original private candidate path required')
    require(completion['completed'] is True and completion['accepted'] is False
            and completion['candidate']['sha256'] == candidate_sha256 and completion['candidate']['bytes'] == len(candidate_bytes)
            and completion['referenceResultSha256'] == candidate['referenceResultSha256'], 'fresh compute completion differs')
    keys(execution, ('startedAt', 'elapsedSeconds', 'exitCode', 'processesClosed', 'heartbeatSeconds',
                     'maximumSampledGroupRssBytes', 'rssSampleIntervalSeconds', 'outputBytes', 'logBytes', 'watcherSha256', 'publicationComplete'))
    for field in ('elapsedSeconds', 'heartbeatSeconds', 'rssSampleIntervalSeconds'):
        require(type(execution[field]) in (int, float) and math.isfinite(execution[field]) and execution[field] >= 0, 'missing/nonfinite execution measurement')
    for field in ('maximumSampledGroupRssBytes', 'outputBytes', 'logBytes'): integer(execution[field], 0, 2**53-1)
    require(type(execution['startedAt']) is str and re.fullmatch(r'\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z', execution['startedAt'])
            and type(execution['exitCode']) is int and execution['exitCode'] == 0 and execution['processesClosed'] is True
            and execution['publicationComplete'] is True and execution['watcherSha256'] == expected_watcher_sha256
            and HASH.fullmatch(expected_watcher_sha256) and execution['elapsedSeconds'] <= 1800
            and execution['heartbeatSeconds'] == 15 and 0 < execution['rssSampleIntervalSeconds'] <= 1
            and 0 < execution['maximumSampledGroupRssBytes'] < 2*1024**3
            and execution['outputBytes'] <= OUTPUT_LIMIT and execution['logBytes'] <= LOG_LIMIT,
            'external execution lacks accepted closure/resources')
    require(type(completion['elapsedSeconds']) in (int, float) and math.isfinite(completion['elapsedSeconds'])
            and 0 <= completion['elapsedSeconds'] <= execution['elapsedSeconds'], 'compute completion/external compute-stage time differs')
    result = dict(schema='braid-program/prescribed-acceleration-response.v1', accepted=True,
                status='accepted-prescribed-response-enclosure', subject=candidate['subject'], bindings=candidate['bindings'],
                referenceResult=candidate['referenceResult'], execution=dict(execution), claims={k: False for k in FALSE_CLAIMS},
                newRootSearches=0, failures=[])
    require(execution['outputBytes'] == len(canonical(result))+1, 'exact final response byte census differs')
    return result


@contextmanager
def contribution_progress(reference, watch):
    """Observe returns of the frozen kernel without replacing any math function."""
    require(sys.getprofile() is None, 'unreviewed existing Python profile hook')
    kernel_code = reference._root_response.__code__
    def observed(frame, event, result):
        if event == 'return' and frame.f_code is kernel_code and result is not None:
            watch.state['contributions'] += 1
            watch.live()
    sys.setprofile(observed)
    try:
        yield
    finally:
        sys.setprofile(None)


def compute(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ('repo-root', 'consumer-sha256', 'consumer-tests-sha256', 'python-sha256', 'watcher-sha256', 'budget-seconds', 'out-dir'):
        parser.add_argument('--'+flag, required=True)
    args = parser.parse_args(argv)
    root, output = Path(args.repo_root).absolute(), Path(args.out_dir).absolute()
    require(root.resolve() == root and output.parent.resolve() == output.parent and not output.exists(), 'fresh non-symlink attempt required')
    require(output.is_relative_to(root/'.local-data/braid-analysis') and output.name.startswith('prescribed-response-'), 'scoped response output required')
    for value in (args.consumer_sha256, args.consumer_tests_sha256, args.python_sha256, args.watcher_sha256):
        require(HASH.fullmatch(value), 'reviewed source/runtime/watcher hashes required')
    watch = Watch(args.budget_seconds)
    output.mkdir()
    candidate_binding = None
    try:
        with watch, ExitStack() as stack:
            specifications = list(SCIENCE)+[
                ('predeclaration', PREDECLARATION, PREDECLARATION_SHA), ('reference', REFERENCE, REFERENCE_SHA),
                ('referenceTests', REFERENCE_TESTS, REFERENCE_TESTS_SHA), ('consumer', SELF, args.consumer_sha256),
                ('consumerTests', TESTS, args.consumer_tests_sha256), ('pythonExecutable', str(Path(sys.executable).resolve()), args.python_sha256),
                *((p, p, h) for p, h in (*IMPORTS, *FORMULAS))]
            captured, bindings = {}, []
            total = 0
            for role, filename, digest in specifications:
                capture = stack.enter_context(Capture(root/filename, digest, progress=watch.bytes))
                captured[role] = capture
                bindings.append(capture.binding(role))
                if role in {r for r, _, _ in SCIENCE}:
                    total += len(capture.data); require(total <= TOTAL_LIMIT, 'total original scientific input bound')
            verify_executing_consumer(captured['consumer'].data)
            data = {role: decode(captured[role].data) for role, _, _ in SCIENCE}
            sources = {p: captured[p].data for p, _ in IMPORTS}
            sources[REFERENCE] = captured['reference'].data
            with proof_package(sources) as reference:
                request = build_request(data, root, reference, watch.progress)
                for capture in captured.values(): capture.recheck()
                watch.state['stage'] = 'conditional-response-reference'
                with contribution_progress(reference, watch):
                    result = reference.evaluate_response(request).to_record()
                watch.state['contributions'] = len(result['contributions'])
                validate_reference_result(result)
                candidate = dict(schema='braid-program/prescribed-acceleration-response-private.v1', accepted=False,
                    admissible=False, subject=SUBJECT, bindings=bindings, referenceResult=result,
                    referenceResultSha256=sha(canonical(result)), watcherSha256=args.watcher_sha256)
                watch.state['stage'] = 'private-publication'
                candidate_binding = publish_once(output/'private-candidate.json', candidate, watch.live,
                    lambda: [c.recheck() for c in captured.values()])
                for capture in captured.values(): capture.recheck()
            watch.state['stage'] = 'capture-cleanup'
        watch.live()
        completion = dict(completed=True, accepted=False, candidate=candidate_binding,
                          referenceResultSha256=candidate['referenceResultSha256'], elapsedSeconds=time.monotonic()-watch.began)
        print(json.dumps(completion, allow_nan=False), flush=True)
        watch.live()
        return completion
    except BaseException as error:
        rejection = dict(accepted=False, admissible=False, status='rejected',
                         failures=[dict(code=type(error).__name__, detail=str(error)[:2048])],
                         claims={k: False for k in FALSE_CLAIMS}, newRootSearches=0)
        # A rejected attempt never overwrites a previous result. This diagnostic
        # is bounded; an external watcher must also retain abnormal-exit details.
        try:
            with open(output/'rejection.json', 'xb') as handle:
                handle.write(canonical(rejection)+b'\n'); handle.flush(); os.fsync(handle.fileno())
        except OSError: pass
        raise


if __name__ == '__main__':
    try:
        compute()
    except Exception as error:
        print(json.dumps(dict(completed=False, accepted=False, failure=str(error)[:2048])), file=sys.stderr, flush=True)
        raise SystemExit(1)
