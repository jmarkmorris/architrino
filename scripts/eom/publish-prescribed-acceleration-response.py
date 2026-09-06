"""Pure publication bridge for a separately supervised, closed response worker.

This program never calls response arithmetic, a history evaluator or a root API.
The watcher supplies authenticated CLOSED-COMPUTE observations and a bound job.
It must separately observe this publisher's successful closure, rehash the final
file, and admit the WHOLE attempt under its original inclusive resource limits.
An accepted flag in a private or not-yet-admitted payload is not evidence.
"""
from __future__ import annotations

import argparse
from contextlib import ExitStack, contextmanager
import hashlib
import json
import math
import os
from pathlib import Path
import re
import stat
import sys
import time
import types

_EXECUTING_CODE = sys._getframe().f_code
SELF = 'scripts/eom/publish-prescribed-acceleration-response.py'
CONSUMER = 'scripts/eom/reduce-prescribed-acceleration-response.py'
CONSUMER_SHA = '2485f14b44ccd8a5a6294f6e8290f819a7eab35ce82991b0cbb95fd6cc04fe71'
JOB_SCHEMA = 'braid-program/prescribed-response-publication-job.v1'
EXECUTION_SCOPE = 'completed-compute-stage-through-private-candidate-publication-and-process-closure'
HASH = re.compile(r'[0-9a-f]{64}\Z')
MAX_BYTES = 16*1024**2


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def identity(value):
    return value.st_dev, value.st_ino, value.st_size, value.st_mtime_ns, value.st_ctime_ns


class BoundSource:
    """Small bootstrap inputs, held on one canonical regular-file descriptor."""
    def __init__(self, path, expected, live):
        self.path, self.expected, self.live = Path(path).absolute(), expected, live
        self.fd = None

    def __enter__(self):
        require(type(self.expected) is str and HASH.fullmatch(self.expected), 'externally bound hash required')
        require(self.path.resolve() == self.path, 'canonical source path required')
        self.fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            self.before = os.fstat(self.fd)
            require(stat.S_ISREG(self.before.st_mode) and 0 < self.before.st_size <= MAX_BYTES, 'bounded regular bootstrap source required')
            self.data = self.read()
            self.recheck()
            return self
        except BaseException:
            self.__exit__()
            raise

    def read(self):
        parts, position = [], 0
        while position < self.before.st_size:
            self.live()
            part = os.pread(self.fd, min(65536, self.before.st_size-position), position)
            require(part, 'bootstrap source truncated')
            parts.append(part)
            position += len(part)
        raw = b''.join(parts)
        require(sha(raw) == self.expected, 'bootstrap source hash differs')
        return raw

    def recheck(self):
        self.live()
        require(self.path.resolve() == self.path and identity(os.fstat(self.fd)) == identity(self.before)
                and identity(os.lstat(self.path)) == identity(self.before), 'bootstrap source generation changed')
        self.read()
        self.live()

    def __exit__(self, *_):
        if self.fd is not None:
            os.close(self.fd)
        self.fd = None


@contextmanager
def captured_consumer(raw, filename):
    require(sha(raw) == CONSUMER_SHA, 'reviewed consumer differs')
    name = '_response_publication_'+os.urandom(12).hex()
    module = types.ModuleType(name)
    module.__file__ = str(filename)
    sys.modules[name] = module
    try:
        exec(compile(raw, str(filename), 'exec', dont_inherit=True, optimize=sys.flags.optimize), module.__dict__)
        module.verify_executing_consumer(raw)
        yield module
    finally:
        sys.modules.pop(name, None)


def check_job(job, consumer, root, watcher_sha):
    consumer.keys(job, ('schema', 'embeddedExecutionScope', 'candidate', 'completion', 'execution',
                        'expectedBindings', 'watcherSha256', 'output'))
    require(job['schema'] == JOB_SCHEMA and job['embeddedExecutionScope'] == EXECUTION_SCOPE,
            'completed-compute scope must be explicit')
    require(job['watcherSha256'] == watcher_sha and HASH.fullmatch(watcher_sha), 'watcher identity differs')
    consumer.keys(job['candidate'], ('path', 'sha256', 'bytes'))
    candidate = job['candidate']
    require(type(candidate['path']) is str and Path(candidate['path']).is_absolute()
            and type(candidate['sha256']) is str and HASH.fullmatch(candidate['sha256'])
            and type(candidate['bytes']) is int and 0 < candidate['bytes'] <= consumer.OUTPUT_LIMIT,
            'bound private candidate required')
    require(type(job['output']) is str and Path(job['output']).is_absolute(), 'absolute final path required')
    output, source = Path(job['output']), Path(candidate['path'])
    require(output.parent.resolve() == output.parent and source == output.parent/'private-candidate.json'
            and output.name == 'response.json' and output.parent.name.startswith('prescribed-response-')
            and output.parent.is_relative_to(root/'.local-data/braid-analysis'), 'exclusive response publication lane differs')
    require(not output.exists() and not output.is_symlink(), 'existing response cannot be overwritten')
    require(job['completion']['candidate'] == candidate, 'completed private candidate identity differs')
    consumer.validate_output_bindings(job['expectedBindings'])
    bindings = {row['role']: row for row in job['expectedBindings']}
    require(bindings['consumer']['path'] == str(root/CONSUMER)
            and bindings['consumer']['sha256'] == CONSUMER_SHA, 'expected reviewed consumer generation differs')
    require(bindings['pythonExecutable']['path'] == str(Path(sys.executable).resolve()), 'publisher interpreter differs from compute interpreter')
    require(job['execution']['watcherSha256'] == watcher_sha and job['execution']['outputBytes'] == 0,
            'publication job must leave derived final byte length unset')
    return output


def assemble_payload(consumer, candidate_bytes, job):
    """Derive serialization size only; measured counters are never synthesized."""
    candidate = consumer.decode(candidate_bytes)
    execution = dict(job['execution'])
    result = dict(schema='braid-program/prescribed-acceleration-response.v1', accepted=True,
                  status='accepted-prescribed-response-enclosure', subject=candidate['subject'],
                  bindings=candidate['bindings'], referenceResult=candidate['referenceResult'],
                  execution=execution, claims={key: False for key in consumer.FALSE_CLAIMS},
                  newRootSearches=0, failures=[])
    for _ in range(16):
        length = len(consumer.canonical(result))+1
        require(length <= consumer.OUTPUT_LIMIT, 'derived response exceeds output limit')
        if execution['outputBytes'] == length:
            break
        execution['outputBytes'] = length
    else:
        raise ValueError('response serialization size did not converge')
    checked = consumer.assemble_response(candidate_bytes, job['candidate']['sha256'], job['completion'],
                                         execution, job['expectedBindings'], job['watcherSha256'])
    require(consumer.canonical(checked) == consumer.canonical(result), 'assembled closed schema differs')
    return checked


def publish(argv=None):
    began = time.monotonic()
    parser = argparse.ArgumentParser(description=__doc__)
    for flag in ('repo-root', 'publisher-sha256', 'watcher-sha256', 'job', 'job-sha256', 'budget-seconds'):
        parser.add_argument('--'+flag, required=True)
    args = parser.parse_args(argv)
    # Parsing cannot install a disabled or non-advancing timer.
    seconds = float(args.budget_seconds)
    require(math.isfinite(seconds) and 0 < seconds <= 1800 and began+seconds > began,
            'positive advancing remaining publication budget required')
    deadline = began+seconds
    def live():
        require(time.monotonic() < deadline, 'inclusive publisher deadline')
    root = Path(args.repo_root).absolute()
    require(root.resolve() == root, 'canonical repository root required')
    live()
    with ExitStack() as bootstrap:
        own = bootstrap.enter_context(BoundSource(root/SELF, args.publisher_sha256, live))
        require(compile(own.data, _EXECUTING_CODE.co_filename, 'exec', dont_inherit=True,
                        optimize=sys.flags.optimize) == _EXECUTING_CODE, 'executing publisher differs')
        source = bootstrap.enter_context(BoundSource(root/CONSUMER, CONSUMER_SHA, live))
        job_source = bootstrap.enter_context(BoundSource(args.job, args.job_sha256, live))
        with captured_consumer(source.data, source.path) as consumer:
            job = consumer.decode(job_source.data)
            output = check_job(job, consumer, root, args.watcher_sha256)
            remaining = deadline-time.monotonic()
            require(remaining > 0, 'publisher capture exhausted budget')
            with consumer.Watch(str(remaining)), ExitStack() as inputs:
                bound = []
                for row in job['expectedBindings']:
                    item = inputs.enter_context(consumer.Capture(row['path'], row['sha256'], progress=lambda _: live()))
                    require(item.before.st_size == row['bytes'], 'original expected binding size differs')
                    bound.append(item)
                candidate = inputs.enter_context(consumer.Capture(job['candidate']['path'], job['candidate']['sha256'], consumer.OUTPUT_LIMIT))
                require(candidate.before.st_size == job['candidate']['bytes'], 'private candidate size differs')
                bound.append(candidate)
                def recheck():
                    for item in (own, source, job_source, *bound):
                        item.recheck()
                    live()
                recheck()
                result = assemble_payload(consumer, candidate.data, job)
                publication = consumer.publish_once(output, result, live, recheck)
                require(publication['bytes'] == result['execution']['outputBytes'], 'actual published byte count differs')
                recheck()
            live()
        own.recheck()
        source.recheck()
        job_source.recheck()
    live()
    print(json.dumps(dict(completed=True, accepted=False, publicationPrepared=True,
                          output=publication, jobSha256=args.job_sha256,
                          embeddedExecutionScope=EXECUTION_SCOPE,
                          externalWholeAttemptAdmissionRequired=True,
                          elapsedSeconds=time.monotonic()-began), allow_nan=False), flush=True)
    live()


if __name__ == '__main__':
    try:
        publish()
    except Exception as error:
        print(json.dumps(dict(completed=False, accepted=False, failure=str(error)[:2048],
                              externalWholeAttemptAdmissionRequired=True)), file=sys.stderr, flush=True)
        raise SystemExit(1)
