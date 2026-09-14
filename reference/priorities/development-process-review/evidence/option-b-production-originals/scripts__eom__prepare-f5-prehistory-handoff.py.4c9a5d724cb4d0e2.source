#!/usr/bin/env python3
"""Data-only F5 producer; the frozen independent verifier is NEVER imported.

This wrapper and src/eom/native/eom_f5_prehistory_inspector.cpp jointly form
the producer. An externally reviewed, hash-pinned build receipt must contain:
schema='braid-program/f5-prehistory-handoff-build.v1', producerSources={wrapper,
inspector}, built.executable, sourceOwners. File records are {path,sha256,bytes};
paths are absolute. Other build provenance fields are retained by that receipt.
These mechanical matches do not establish build origin or independent review.

The inspector receives only original past-piece tokens via a retained protocol
file. Its actual History getters supply returned tokens, binary64 bits, FNV,
raw final-piece boxes and endpoint_state_hull. Its exact rational polynomial
values are producer output, not reference evidence. No mathematical acceptance
is performed here, and neither a charge nor a coupling is instantiated.

All outputs remain evidence-only: even an exit-0 producer requires independent
build/execution review and the separately frozen conformance verifier. Admit a
fresh completion only with matching execution-receipt/hash, closed inspector,
unchanged inputs, finite elapsed <=1800 and exit 0. Late/partial files confer
no authority. Actual launch additionally requires an external hard watchdog.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack
from fractions import Fraction
from hashlib import sha256
import json
import os
from pathlib import Path
import re
import signal
import stat
import subprocess
import sys
import time

_EXECUTING_CODE = sys._getframe().f_code
ROOT = Path(__file__).resolve().parents[2]
INSPECTOR = 'src/eom/native/eom_f5_prehistory_inspector.cpp'
PREFIX_SHA = '8d14aa3bc5e0788f06c8b79e788a55df82e8db83736e2413c9800a78af63111b'
RESTRICTION_SHA = '5a2e9158bf26c34a7a9755e53ea1337cc006765727d9afe1ef1304c3fcd140b0'
REFERENCES = {
    'scripts/eom/verify-f5-prehistory-handoff.py': '6c94b0ca16dfe20bed4841a547adca349f2f36cdd5ec04211341d6b060032a68',
    'tests/test_f5_prehistory_handoff.py': '111e828c8ea3c26996ce51c83496ff7850d48b52cf7e874982c67e882ad6cadf',
}
SOURCE_OWNERS = {
    'src/eom/src/History.cpp': 'cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5',
    'src/eom/src/Interval.cpp': '5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5',
    'src/eom/include/architrino/eom/Decimal.hpp': '8126e685d9be5a2d4935d29eaa12d1aa995822781c198d48d809c0f0b6ddad7f',
    'src/eom/include/architrino/eom/History.hpp': '0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3',
    'src/eom/src/CoupledEvolution.cpp': '88935fa4410f626d25200597a2fb5ba1ad4cb7a8c68324cf452affd4643c9194',
}
FALSE_CLAIMS = {name: False for name in (
    'couplingChosen', 'chargeMagnitudeChosen', 'futureSupplied', 'requestValidated',
    'rootsEvaluated', 'eomExecuted', 'evolutionAuthorized', 'metricsComputed',
    'scoreAuthorized', 'h3EvidenceEligible', 'analyticTrajectoryIdentityEstablished')}
RUNTIME_PREMISES = ['IEEE-754 binary64 round-to-nearest ties-to-even',
                    'gradual underflow; finite operations; no contraction or fast-math',
                    'decimal parsing agrees with exact nearest binary64']
SEGMENT_KEYS = {'index', 'tStart', 'tEnd', 'coefficients', 'positionErrors', 'velocityErrors'}
TOKEN = re.compile(r'-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE]([+-]?[0-9]+))?\Z')
HASH = re.compile(r'[0-9a-f]{64}\Z')
BITS = re.compile(r'[0-9a-f]{16}\Z')
LIMIT, HEARTBEAT, MAX_BYTES, MAX_BINARY = 1800, 15, 8*1024*1024, 256*1024*1024


def require(value, message):
    if not value:
        raise ValueError(message)


def closed(value, fields):
    require(type(value) is dict and set(value) == set(fields), 'unexpected fields')


def decode(data):
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, 'duplicate JSON key')
            result[key] = value
        return result
    def reject(value):
        raise ValueError('nonfinite JSON number: '+value)
    return json.loads(data.decode('utf-8'), object_pairs_hook=pairs, parse_constant=reject)


def identity(info):
    return info.st_dev, info.st_ino, info.st_size, info.st_mtime_ns, info.st_ctime_ns


class Capture:
    def __init__(self, filename, expected, limit=MAX_BYTES):
        self.path, self.expected, self.limit = Path(filename).absolute(), expected, limit

    def __enter__(self):
        require(type(self.expected) is str and HASH.fullmatch(self.expected), 'external SHA-256 required')
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            info = os.fstat(self.fd)
            require(stat.S_ISREG(info.st_mode) and 0 < info.st_size <= self.limit, 'bounded regular input required')
            self.before = identity(info)
            self.data = self.read()
            self.recheck()
            return self
        except BaseException:
            os.close(self.fd)
            raise

    def read(self):
        chunks, size = [], 0
        while size < self.before[2]:
            chunk = os.pread(self.fd, min(1024*1024, self.before[2]-size), size)
            require(chunk, 'input truncated')
            chunks.append(chunk); size += len(chunk)
        data = b''.join(chunks)
        require(identity(os.fstat(self.fd)) == self.before and
                identity(os.lstat(self.path)) == self.before, 'input changed or replaced')
        require(sha256(data).hexdigest() == self.expected, 'input hash differs')
        return data

    def recheck(self):
        require(self.read() == self.data, 'input bytes changed')
        return self.binding()

    def binding(self):
        return {'path': str(self.path), 'sha256': self.expected, 'bytes': len(self.data)}

    def __exit__(self, *unused):
        os.close(self.fd)


def worldline(index):
    return f'f5-axis-{index % 6 // 2+1}-ring-{index % 2+1}-' + ('positive' if index < 6 else 'negative') + '-worldline'


def decimal_token(value):
    require(type(value) is str and len(value) <= 512, 'bounded decimal string required')
    match = TOKEN.fullmatch(value)
    require(match is not None, 'invalid decimal token')
    exponent = match.group(1)
    require(exponent is None or (len(exponent) <= 5 and abs(int(exponent)) <= 1024), 'exponent bound')
    return Fraction(value)


def protocol(prefix):
    """Mechanical framing only. No interpolation, rounding, FNV or endpoint oracle."""
    require(prefix['schema'] == 'braid-program/f5-prehistory-restriction.v1' and
            prefix['normalizedFieldSpeed'] == '1' and prefix['retainedInterval'] == ['-1', '0'] and
            prefix['releaseTime'] == '0', 'wrong past-only prefix')
    require(type(prefix['members']) is list and len(prefix['members']) == 12, 'twelve members required')
    lines = ['f5-prehistory-inspector/v1']
    for i, member in enumerate(prefix['members']):
        require(type(member['index']) is int and member['index'] == i and member['worldlineId'] == worldline(i), 'member order')
        require(member['constituentId'] == worldline(i).replace('-worldline', '-architrino') and
                type(member['polarity']) is int and member['polarity'] == (1 if i < 6 else -1), 'member identity')
        require(type(member['segments']) is list and len(member['segments']) == 51, '51 segments required')
        lines.append(member['worldlineId']); cursor = Fraction(-1)
        for j, segment in enumerate(member['segments']):
            closed(segment, SEGMENT_KEYS)
            require(type(segment['index']) is int and segment['index'] == j, 'segment order')
            a, b = decimal_token(segment['tStart']), decimal_token(segment['tEnd'])
            require(a == cursor and a < b <= 0, 'gap, overlap or supplied future'); cursor = b
            c = segment['coefficients']
            require(type(c) is list and len(c) == 3 and all(type(row) is list and len(row) == 4 for row in c), '3x4 coefficients required')
            tokens = [segment['tStart'], segment['tEnd']] + [v for row in c for v in row]
            for field in ('positionErrors', 'velocityErrors'):
                require(type(segment[field]) is list and len(segment[field]) == 3, 'three axis errors required')
                require(all(decimal_token(v) > 0 for v in segment[field]), 'positive original errors required')
                tokens += segment[field]
            for value in tokens:
                decimal_token(value)
            lines += tokens
        require(cursor == 0 and member['segments'][-1]['tEnd'] == '0', 'exact zero release required')
    return ('\n'.join(lines+['end'])+'\n').encode('ascii')


def assemble(prefix, inspection, bindings):
    closed(inspection, ('schema', 'completed', 'runtimeControlsPassed', 'members'))
    require(inspection['schema'] == 'braid-program/f5-prehistory-inspection.v1' and
            inspection['completed'] is True and inspection['runtimeControlsPassed'] is True and
            type(inspection['members']) is list and len(inspection['members']) == 12, 'inspector failed/incomplete')
    members = []
    for i, (source, result) in enumerate(zip(prefix['members'], inspection['members'])):
        closed(result, ('index', 'worldlineId', 'restrictedHistoryId', 'historyFingerprint', 'segments', 'release'))
        require(type(result['index']) is int and result['index'] == i and result['worldlineId'] == source['worldlineId'], 'returned identity differs')
        require(result['restrictedHistoryId'] == 'f5-prehistory/v1/'+source['worldlineId'], 'restricted identity differs')
        require(type(result['segments']) is list and len(result['segments']) == 51, 'returned piece census')
        for original, returned in zip(source['segments'], result['segments']):
            closed(returned, SEGMENT_KEYS | {'parsedBinary64'})
            require(type(returned['index']) is int, 'returned index must be an integer')
            require({key: returned[key] for key in SEGMENT_KEYS} == original, 'inspector changed original tokens')
            parsed = returned['parsedBinary64']; closed(parsed, SEGMENT_KEYS-{'index'})
            require(type(parsed['coefficients']) is list and len(parsed['coefficients']) == 3 and
                    all(type(row) is list and len(row) == 4 for row in parsed['coefficients']), 'parsed coefficient shape')
            require(all(type(parsed[key]) is list and len(parsed[key]) == 3 for key in ('positionErrors', 'velocityErrors')), 'parsed error shape')
            words = [parsed['tStart'], parsed['tEnd']] + [x for row in parsed['coefficients'] for x in row] + parsed['positionErrors'] + parsed['velocityErrors']
            require(all(type(word) is str and BITS.fullmatch(word) for word in words), 'parsed bit-word shape')
        release = result['release']; closed(release, ('nominalPosition', 'nominalDerivative', 'rawFinalPiece', 'endpointState'))
        for field in ('nominalPosition', 'nominalDerivative'):
            require(type(release[field]) is list and len(release[field]) == 3, 'nominal release shape')
            for value in release[field]:
                closed(value, ('numerator', 'denominator'))
                require(all(type(x) is str and re.fullmatch(r'-?[0-9]{1,4096}', x) for x in value.values()), 'rational token shape')
        for field in ('rawFinalPiece', 'endpointState'):
            closed(release[field], ('position', 'velocity'))
            for vector in release[field].values():
                require(type(vector) is list and len(vector) == 3, 'release box-vector shape')
                for box in vector:
                    closed(box, ('lowerBits', 'upperBits'))
                    require(all(type(x) is str and BITS.fullmatch(x) for x in box.values()), 'release bit-word shape')
        require(type(result['historyFingerprint']) is str and re.fullmatch(r'fnv1a64-chain-v1:[0-9a-f]{16}', result['historyFingerprint']), 'fingerprint shape')
        members.append({**{key: source[key] for key in ('index', 'constituentId', 'worldlineId', 'polarity', 'originalHistory')},
                        **{key: result[key] for key in ('restrictedHistoryId', 'historyFingerprint', 'segments', 'release')}})
    return {'schema': 'braid-program/f5-prehistory-handoff.v1', 'status': 'data-only-history-handoff',
            'prefixSha256': PREFIX_SHA, 'restrictionReceiptSha256': RESTRICTION_SHA,
            'sourceOwners': SOURCE_OWNERS.copy(), 'producerBindings': bindings,
            'runtimePremises': list(RUNTIME_PREMISES), 'normalizedFieldSpeed': '1',
            'retainedInterval': ['-1', '0'], 'releaseTime': '0', 'claims': FALSE_CLAIMS.copy(), 'members': members}


def check_build(build, bindings):
    require(build['schema'] == 'braid-program/f5-prehistory-handoff-build.v1', 'wrong build receipt')
    require(build['producerSources'] == {role: bindings[role] for role in ('wrapper', 'inspector')}, 'full producer source closure differs')
    require(build['built']['executable'] == bindings['executable'] and build['sourceOwners'] == SOURCE_OWNERS, 'build/executable/source owners differ')


def write_new(filename, data):
    fd = os.open(filename, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'wb') as output:
        output.write(data); output.flush(); os.fsync(output.fileno())
    require(read_owned(filename) == data, 'published producer bytes differ')
    return {'path': str(Path(filename).absolute()), 'sha256': sha256(data).hexdigest(), 'bytes': len(data)}


def read_owned(filename):
    fd = os.open(filename, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
    try:
        before = identity(os.fstat(fd))
        require(stat.S_ISREG(os.fstat(fd).st_mode) and before[2] <= MAX_BYTES, 'bounded regular output required')
        chunks, size = [], 0
        while size < before[2]:
            chunk = os.read(fd, min(1024*1024, before[2]-size))
            require(chunk, 'output truncated'); chunks.append(chunk); size += len(chunk)
        require(identity(os.fstat(fd)) == before and identity(os.lstat(filename)) == before, 'output changed or replaced')
        return b''.join(chunks)
    finally:
        os.close(fd)


def json_bytes(value):
    return (json.dumps(value, sort_keys=True, separators=(',', ':'), allow_nan=False)+'\n').encode('utf-8')


class Watch:
    def __enter__(self):
        require(signal.getitimer(signal.ITIMER_REAL) == (0., 0.), 'existing alarm')
        self.started, self.previous = time.monotonic(), {}
        for sig in (signal.SIGALRM, signal.SIGINT, signal.SIGTERM):
            self.previous[sig] = signal.signal(sig, self.tick if sig == signal.SIGALRM else self.interrupt)
        signal.setitimer(signal.ITIMER_REAL, HEARTBEAT, HEARTBEAT)
        return self

    def check(self):
        elapsed = time.monotonic()-self.started
        require(0 <= elapsed <= LIMIT, 'producer deadline exceeded')
        return elapsed

    def tick(self, *unused):
        print(json.dumps({'stage': 'f5-prehistory-producer', 'elapsedSeconds': self.check()}), file=sys.stderr, flush=True)

    def interrupt(self, *unused):
        raise InterruptedError('producer interrupted')

    def __exit__(self, kind, error, traceback):
        try:
            if error is None:
                self.check()
        finally:
            signal.setitimer(signal.ITIMER_REAL, 0)
            for sig, previous in self.previous.items():
                signal.signal(sig, previous)
        if error is None:
            self.elapsed = self.check()


def run_inspector(command, input_path, output_path, log_path, watch):
    """One reviewed, childless inspector; synthetic tests may substitute a childless command."""
    with open(input_path, 'rb') as incoming, open(output_path, 'xb') as outgoing, open(log_path, 'xb') as log:
        # Inherit the outer watcher's group: this childless inspector cannot
        # escape a whole-wrapper hard stop. Popen retains ownership of its PID.
        process = subprocess.Popen(command, stdin=incoming, stdout=outgoing, stderr=log)
        try:
            while process.poll() is None:
                watch.check()
                require(os.fstat(outgoing.fileno()).st_size <= MAX_BYTES and os.fstat(log.fileno()).st_size <= MAX_BYTES,
                        'inspector output bound exceeded')
                try:
                    process.wait(timeout=0.1)
                except subprocess.TimeoutExpired:
                    pass
            require(process.returncode == 0, 'inspector exited unsuccessfully')
            require(os.fstat(outgoing.fileno()).st_size <= MAX_BYTES and os.fstat(log.fileno()).st_size <= MAX_BYTES,
                    'inspector final output bound exceeded')
            outgoing.flush(); log.flush(); os.fsync(outgoing.fileno()); os.fsync(log.fileno())
        finally:
            if process.poll() is None:
                previous_mask = signal.pthread_sigmask(signal.SIG_BLOCK, {signal.SIGALRM, signal.SIGINT, signal.SIGTERM})
                try:
                    process.kill()  # This owned child only; no historical process-group lookup.
                    process.wait(timeout=5)
                finally:
                    signal.pthread_sigmask(signal.SIG_SETMASK, previous_mask)
    watch.check()


def produce(args):
    directory = Path(args.out_dir).absolute()
    lane = ROOT/'.local-data/braid-analysis'
    require(directory.parent.resolve() == lane.resolve() and directory.name.startswith('f5-prehistory-handoff-'),
            'fresh f5-prehistory-handoff-* directory in ignored braid-analysis lane required')
    paths = [('prefix', args.prefix, PREFIX_SHA), ('restriction', args.restriction_receipt, RESTRICTION_SHA),
             ('inspector', ROOT/INSPECTOR, args.producer_source_sha256),
             ('wrapper', __file__, args.wrapper_sha256), ('buildReceipt', args.build_receipt, args.build_receipt_sha256),
             ('executable', args.executable, args.executable_sha256)]
    paths += [(p, ROOT/p, digest) for p, digest in {**SOURCE_OWNERS, **REFERENCES}.items()]
    for key in os.environ:
        require(not key.startswith('DYLD_') and key not in ('LD_PRELOAD', 'LD_LIBRARY_PATH'), 'injected dynamic library environment')
    with Watch() as watch:
        directory.mkdir(mode=0o700)  # No overwrite/resume; before any subprocess.
        try:
            with ExitStack() as stack:
                captured = {role: stack.enter_context(Capture(p, digest, MAX_BINARY if role == 'executable' else MAX_BYTES))
                            for role, p, digest in paths}
                require(compile(captured['wrapper'].data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
                                optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executed wrapper differs from captured source')
                bindings = {role: item.binding() for role, item in captured.items()}
                check_build(decode(captured['buildReceipt'].data), bindings)
                restriction = decode(captured['restriction'].data)
                require(restriction['accepted'] is True and restriction['prefix']['sha256'] == PREFIX_SHA, 'unaccepted prefix restriction')
                prefix = decode(captured['prefix'].data)
                framed = write_new(directory/'inspector-input.txt', protocol(prefix))
                for item in captured.values():
                    item.recheck()
                run_inspector([str(captured['executable'].path), '--inspect'], directory/'inspector-input.txt',
                              directory/'inspector-output.json', directory/'inspector-stderr.log', watch)
                raw = read_owned(directory/'inspector-output.json')
                inspection = decode(raw)
                handoff = assemble(prefix, inspection, {'source': bindings['inspector'],
                                   'buildReceipt': bindings['buildReceipt'], 'executable': bindings['executable']})
                after = {role: item.recheck() for role, item in captured.items()}
                handoff_record = write_new(directory/'handoff.json', json_bytes(handoff))
                evidence = [framed, handoff_record]
                for name in ('inspector-output.json', 'inspector-stderr.log'):
                    data = read_owned(directory/name)
                    evidence.append({'path': str(directory/name), 'sha256': sha256(data).hexdigest(), 'bytes': len(data)})
                for item in captured.values():
                    item.recheck()
            execution = {'schema': 'braid-program/f5-prehistory-handoff-production.v1',
                         'status': 'data-written-awaiting-fresh-process-completion', 'accepted': False,
                         'authority': 'producer output only; independent build/execution and conformance review required',
                         'claims': FALSE_CLAIMS.copy(), 'bindingsBefore': bindings, 'bindingsAfter': after,
                         'inspectorClosed': True, 'inspectorExitCode': 0, 'evidence': evidence,
                         'sourceClosure': ['wrapper', 'inspector'], 'elapsedBeforePublication': watch.check(),
                         'admission': 'matching fresh completion hash, elapsed <=1800, exit 0; separate external watchdog required'}
            execution_record = write_new(directory/'execution.json', json_bytes(execution))
            fd = os.open(directory, os.O_RDONLY)
            try:
                os.fsync(fd)
            finally:
                os.close(fd)
            watch.check()
        except BaseException as error:
            try:
                write_new(directory/'failure.json', json_bytes({'completed': False, 'accepted': False,
                          'claims': FALSE_CLAIMS.copy(), 'failure': str(error)}))
            except OSError:
                pass  # Preserve prior files; failure still propagates and prevents exit-0 admission.
            raise
    return {'completed': True, 'accepted': False, 'executionReceipt': execution_record,
            'handoff': handoff_record, 'elapsedSeconds': watch.elapsed, 'claims': FALSE_CLAIMS.copy()}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ('prefix', 'restriction-receipt', 'producer-source-sha256', 'wrapper-sha256',
                 'build-receipt', 'build-receipt-sha256', 'executable', 'executable-sha256', 'out-dir'):
        parser.add_argument('--'+flag, required=True)
    try:
        result = produce(parser.parse_args(argv))
        print(json.dumps(result), flush=True)
        return 0
    except (ValueError, OSError, KeyError, TypeError, subprocess.SubprocessError) as error:
        print(json.dumps({'completed': False, 'accepted': False, 'failure': str(error)}), file=sys.stderr, flush=True)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
