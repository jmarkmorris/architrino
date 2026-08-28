"""Lossless, inert evidence storage; never scientific or execution authority.

The external caller freezes the complete ExpectedMember tuple independently,
captures this implementation and controls, supervises aggregate RSS/host/logs,
and owns process/lock closure. ``live(event)`` must enforce that supervisor's
unchanged limits; this module enforces its inclusive deadline and byte bounds.
No member is imported, executed, extracted or parsed as scientific JSON.

Use inventory_members on independently hash-bound inventory bytes, then
write_package in a supervised attempt. It retains its private output, including
on failure, and exclusively publishes one public hardlink. A returned receipt
is package publication only, not independent acceptance or process closure.

PackageReader takes an external package Binding and the SAME expected members.
read_binding(binding, capture=True) returns exact original bytes without making
another file; capture=False returns the unchanged original binding. recheck()
and context exit revalidate the complete physical package. physical_binding
is counted once by the caller's complete consumed-source union, not once per
logical member. Reader use does not reopen the historical originals.
"""

from __future__ import annotations

from contextlib import ExitStack
from dataclasses import asdict, dataclass
import hashlib
import json
import math
import os
from pathlib import Path
import re
import stat
import time


MAGIC = b'F6C-EVIDENCE-PACKAGE-v1\n'
FOOTER = b'\nF6C-EVIDENCE-PACKAGE-END-v1\n'
SCHEMA = 'braid-program/f6c-lossless-evidence-package.v1'
MAX_BYTES = 67_108_864
MAX_INDEX_BYTES = 1_048_576
MAX_ENTRIES = 4096
MAX_SOURCE_FILES = 512
MAX_SOURCE_BYTES = 1_073_741_824
MAX_LOG_BYTES = 16_777_216
CHUNK_BYTES = 65_536
ROLES = frozenset(('plan', 'manifest', 'comparison', 'operation', 'launcher_log',
                   'resource_log', 'queries', 'rows', 'pieces', 'producer_stdout',
                   'producer_stderr', 'comparison_stdout', 'comparison_stderr'))
_SHA = re.compile(r'[0-9a-f]{64}\Z')
OWNER_SUFFIX = '/reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'


def _require(condition, message):
    if not condition:
        raise ValueError(message)


def _integer(value, lower, upper, label):
    _require(type(value) is int and lower <= value <= upper, label)
    return value


def _path(value):
    _require(type(value) is str and 0 < len(value) <= 2048
             and '\0' not in value and '\\' not in value, 'invalid physical/logical path')
    _require(value.startswith('/') and not value.startswith('//')
             and os.path.normpath(value) == value, 'noncanonical absolute path')
    return Path(value)


def _check_path(path):
    # Check every component, not merely the final O_NOFOLLOW open. Never resolve
    # a symlink into an alternate source or silently normalize its spelling.
    for part in (*reversed(path.parents), path):
        _require(not stat.S_ISLNK(os.lstat(part).st_mode), 'symlink source/output path')
    _require(str(path.resolve(strict=True)) == str(path), 'physical path alias')


@dataclass(frozen=True)
class Binding:
    path: str
    sha256: str
    bytes: int


@dataclass(frozen=True)
class SourceIdentity:
    device: int
    inode: int
    bytes: int
    mtime_ns: int
    ctime_ns: int

    @classmethod
    def from_stat(cls, value):
        return cls(value.st_dev, value.st_ino, value.st_size,
                   value.st_mtime_ns, value.st_ctime_ns)


@dataclass(frozen=True)
class ExpectedMember:
    name: str
    role: str
    parent_index: int | None
    original: Binding
    source_path: str
    source_identity: SourceIdentity


@dataclass(frozen=True)
class Publication:
    binding: Binding
    identity: SourceIdentity
    private_path: str
    elapsed_seconds: float
    input_files: int
    input_bytes: int
    output_bytes: int
    status: str = 'package-published-not-process-closure'


def _binding(value):
    if type(value) is dict:
        _require(set(value) == {'path', 'sha256', 'bytes'}, 'binding fields')
        value = Binding(**value)
    _require(type(value) is Binding, 'explicit immutable binding required')
    _path(value.path)
    _require(type(value.sha256) is str and _SHA.fullmatch(value.sha256), 'binding SHA-256')
    _integer(value.bytes, 1, MAX_BYTES, 'binding byte limit')
    return value


def _identity(value):
    _require(type(value) is SourceIdentity, 'explicit source identity required')
    for key, item in asdict(value).items():
        _integer(item, 0, (1 << 128) - 1, 'identity ' + key)
    return value


def _canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'),
                      ensure_ascii=True, allow_nan=False).encode('ascii')


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        _require(key not in result, 'duplicate JSON field')
        result[key] = value
    return result


def _no_float(value):
    raise ValueError('floating JSON value forbidden')


def _json(raw):
    return json.loads(raw.decode('ascii'), object_pairs_hook=_unique_object,
                      parse_float=_no_float, parse_constant=_no_float)


def _members(values):
    _require(type(values) is tuple and 0 < len(values) <= MAX_ENTRIES, 'expected inventory bound')
    for member in values:
        _require(type(member) is ExpectedMember, 'immutable expected member required')
        _require(type(member.name) is str and type(member.role) is str, 'inert member name and role')
    names = set()
    bindings = set()
    paths = {}
    entries = []
    offset = 0
    for member in sorted(values, key=lambda m: m.name):
        _require(type(member) is ExpectedMember, 'immutable expected member required')
        _binding(member.original)
        _path(member.source_path)
        _identity(member.source_identity)
        _require(member.source_identity.bytes == member.original.bytes, 'source identity byte count')
        _require(type(member.name) is str and member.name not in names, 'duplicate member name')
        names.add(member.name)
        if member.role == 'acceptanceOwner':
            _require(member.parent_index is None
                     and member.name == 'owners/' + member.original.sha256,
                     'explicit historical owner name')
            _require(member.original.path.endswith(OWNER_SUFFIX), 'canonical historical readiness owner')
            _require(member.source_path != member.original.path, 'current owner cannot be packaged')
        else:
            _integer(member.parent_index, 1, 159, 'original parent index')
            _require(member.role in ROLES
                     and member.name == f'parents/{member.parent_index}/{member.role}',
                     'nonallowlisted evidence member')
            _require(not member.original.path.endswith('braid-search-launch-readiness.md'),
                     'current owner not an evidence role')
        for candidate in (member.original.path, member.source_path):
            _require(not any(p.startswith('pilot-parent-2-v1') for p in Path(candidate).parts),
                     'rejected attempt forbidden')
            _require(not any(p in ('scripts', 'src', 'tests', 'bin', '.venv') for p in Path(candidate).parts)
                     and not candidate.endswith(('.py', '.pyc', '.mjs', '.js', '.so', '.dylib', '.archive')),
                     'executable/runtime/reference payload forbidden')
        original = member.original
        key = (original.path, original.sha256, original.bytes)
        _require(key not in bindings, 'duplicate original binding')
        bindings.add(key)
        if original.path in paths:
            _require(paths[original.path] == member.role == 'acceptanceOwner', 'ambiguous original path')
        paths[original.path] = member.role
        entries.append(dict(name=member.name, role=member.role, parentIndex=member.parent_index,
                            original=asdict(original), offset=offset))
        offset += original.bytes
        _require(offset <= MAX_BYTES, 'aggregate payload byte limit')
    index = dict(schema=SCHEMA, entries=entries, payloadBytes=offset)
    raw = _canonical(index)
    _require(len(raw) + 1 <= MAX_INDEX_BYTES, 'index LF-inclusive byte limit')
    _require(len(MAGIC) + len(raw) + 1 + offset + len(FOOTER) <= MAX_BYTES,
             'package framing-inclusive byte limit')
    return tuple(sorted(values, key=lambda m: m.name)), index, raw


def inventory_members(raw, *, expected_sha256, root):
    """Decode only an externally pinned expectations inventory, never a package.

    This initial inventory format requires all thirteen roles for parents1/2
    and their two distinct owner generations. SourcePins and historical source
    mappings are deliberately NOT payload members. Their external capture is
    still the supervising caller's responsibility.
    """
    _require(type(raw) is bytes and 0 < len(raw) <= MAX_INDEX_BYTES, 'inventory byte bound')
    _require(type(expected_sha256) is str and _SHA.fullmatch(expected_sha256)
             and hashlib.sha256(raw).hexdigest() == expected_sha256, 'external inventory hash differs')
    root = _path(str(root))
    inventory = _json(raw)
    _require(inventory['schema'] == 'braid-program/f6c-lossless-packaging-expectations.v1', 'inventory schema')
    _require([p['parentIndex'] for p in inventory['parents']] == [1, 2], 'initial parent inventory')
    members = []
    for parent in inventory['parents']:
        _require(parent['attempt'] == f"pilot-parent-{parent['parentIndex']}-v{parent['parentIndex']}",
                 'accepted attempt generation')
        _require(len(parent['entries']) == 13 and {e['role'] for e in parent['entries']} == ROLES,
                 'complete thirteen-role inventory')
        for entry in (*parent['entries'], parent['archivedOwner']):
            b = _binding(entry['logicalBinding'])
            _require((entry['sha256'], entry['bytes']) == (b.sha256, b.bytes), 'inventory physical binding differs')
            tokens = entry['identity']
            _require(set(tokens) == {'device', 'inode', 'bytes', 'mtimeNs', 'ctimeNs'}
                     and all(type(v) is str and re.fullmatch(r'0|[1-9][0-9]{0,38}', v)
                             for v in tokens.values()), 'inventory source identity')
            identity = SourceIdentity(*(int(tokens[k]) for k in ('device', 'inode', 'bytes', 'mtimeNs', 'ctimeNs')))
            physical = entry['physicalPath']
            _require(type(physical) is str and not physical.startswith('/')
                     and physical == os.path.normpath(physical) and '..' not in Path(physical).parts,
                     'explicit relative inventory source path')
            role = entry['role']
            members.append(ExpectedMember(entry['memberName'], role,
                                          None if role == 'acceptanceOwner' else parent['parentIndex'],
                                          b, str(root / physical), identity))
    _require(len(members) == inventory['observedEligiblePhysicalCount'] == 28
             and sum(m.original.bytes for m in members) == inventory['observedEligibleBytes'], 'inventory census')
    return _members(tuple(members))[0]


class _Control:
    def __init__(self, deadline, live):
        self.start = time.monotonic()
        _require(type(deadline) in (int, float) and math.isfinite(deadline)
                 and self.start < deadline <= self.start + 1800, 'inclusive deadline (maximum 1800 seconds)')
        _require(callable(live), 'external live supervisor required')
        self.deadline, self.live = deadline, live

    def check(self, phase, **fields):
        _require(time.monotonic() < self.deadline, 'inclusive package deadline exceeded')
        self.live(dict(phase=phase, **fields))
        _require(time.monotonic() < self.deadline, 'inclusive package deadline exceeded')


class _Captured:
    def __init__(self, binding, control, expected_identity=None):
        self.binding = _binding(binding)
        self.path = _path(binding.path)
        self.control = control
        self.fd = None
        control.check('capture', path=binding.path)
        _check_path(self.path)
        fd = os.open(self.path, os.O_RDONLY | os.O_NONBLOCK | os.O_NOFOLLOW)
        try:
            before = os.fstat(fd)
            _require(stat.S_ISREG(before.st_mode), 'regular evidence file required')
            self.initial = SourceIdentity.from_stat(before)
            if expected_identity is not None:
                _require(self.initial == _identity(expected_identity), 'frozen source identity differs')
            _require(before.st_size == binding.bytes, 'captured byte count differs')
            self.fd = fd
            self.recheck()
        except BaseException:
            os.close(fd)
            self.fd = None
            raise

    def unchanged(self):
        _require(self.fd is not None, 'closed evidence handle')
        _check_path(self.path)
        _require(SourceIdentity.from_stat(os.fstat(self.fd)) == self.initial
                 and SourceIdentity.from_stat(os.stat(self.path, follow_symlinks=False)) == self.initial,
                 'evidence replaced, renamed or mutated')

    def chunks(self, offset=0, size=None):
        size = self.binding.bytes if size is None else size
        _integer(offset, 0, self.binding.bytes, 'read offset')
        _integer(size, 0, self.binding.bytes - offset, 'read range')
        self.unchanged()
        end = offset + size
        while offset < end:
            self.control.check('read', path=self.binding.path, offset=offset)
            raw = os.pread(self.fd, min(CHUNK_BYTES, end - offset), offset)
            _require(raw, 'early evidence EOF')
            offset += len(raw)
            yield raw
        self.unchanged()

    def recheck(self):
        digest = hashlib.sha256()
        for raw in self.chunks():
            digest.update(raw)
        _require(digest.hexdigest() == self.binding.sha256, 'external source SHA-256 differs')
        self.control.check('source-checked', path=self.binding.path)
        self.unchanged()

    def close(self):
        if self.fd is not None:
            try:
                self.recheck()
            finally:
                os.close(self.fd)
                self.fd = None

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()


class PackageReader:
    """Bound complete package plus explicit original-member routing.

    The reader verifies all payload hashes on admission, including unrequested
    members. It returns only inert exact bytes, and counts no numerical calls.
    It must remain open until the adapter's final source/context recheck.
    """
    def __init__(self, binding, members, *, deadline, live, expected_identity=None):
        binding = _binding(binding)
        self._control = _Control(deadline, live)
        self._members, self._index, raw_index = _members(members)
        self._file = _Captured(_binding(binding), self._control, expected_identity)
        try:
            fd = self._file.fd
            _require(os.pread(fd, len(MAGIC), 0) == MAGIC, 'package magic')
            header = os.pread(fd, min(MAX_INDEX_BYTES + 1, binding.bytes), len(MAGIC))
            line, separator, _ = header.partition(b'\n')
            _require(separator and len(line) + 1 <= MAX_INDEX_BYTES, 'index line bound/termination')
            decoded = _json(line)
            _require(_canonical(decoded) == line, 'noncanonical index encoding')
            # Compare canonical bytes as well as objects: Python equality alone
            # would accept booleans in place of integers (True == 1).
            _require(line == raw_index, 'index differs from external complete inventory')
            self._payload_offset = len(MAGIC) + len(line) + 1
            end = self._payload_offset + self._index['payloadBytes']
            _require(end + len(FOOTER) == binding.bytes
                     and os.pread(fd, len(FOOTER) + 1, end) == FOOTER, 'footer or final EOF differs')
            self._entries = {e['name']: e for e in self._index['entries']}
            self._routes = {(m.original.path, m.original.sha256, m.original.bytes): m.name for m in self._members}
            for member in self._members:
                self._read(member.name, retain=False)
            self._file.recheck()
        except BaseException:
            self._file.close()
            raise

    @property
    def physical_binding(self):
        return self._file.binding

    @property
    def physical_identity(self):
        return self._file.initial

    def _read(self, name, *, retain):
        _require(type(name) is str and name in self._entries, 'unknown evidence member')
        entry = self._entries[name]
        digest = hashlib.sha256()
        chunks = []
        for raw in self._file.chunks(self._payload_offset + entry['offset'], entry['original']['bytes']):
            digest.update(raw)
            if retain:
                chunks.append(raw)
        _require(digest.hexdigest() == entry['original']['sha256'], 'member external SHA-256 differs')
        return b''.join(chunks) if retain else dict(entry['original'])

    def read_binding(self, binding, *, capture=False):
        binding = _binding(binding)
        key = (binding.path, binding.sha256, binding.bytes)
        _require(key in self._routes, 'no explicit package route for historical binding')
        _require(type(capture) is bool, 'capture flag')
        return self._read(self._routes[key], retain=capture)

    def read_member(self, name):
        return self._read(name, retain=True)

    def recheck(self):
        self._file.recheck()

    def close(self):
        self._file.close()

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()


def write_package(members, output_path, *, deadline, live,
                  scientific_bytes_already=0, log_bytes_already=0,
                  source_files_already=0, source_bytes_already=0):
    """Publish exact bytes once; never replace/delete any public/private file.

    Existing aggregate counters come from the external attempt, not a fresh
    per-package allowance. Callback exceptions (RSS/host/log/cancellation) stop
    work and retain partial output. Every owned descriptor is closed. Exceptions
    carry ``package_private_path`` and ``package_public_path`` when allocated.
    Any public path surviving a failed final check is FAILED evidence, not an
    accepted package. The external caller must record that failure durably.
    """
    control = _Control(deadline, live)
    members, index, raw_index = _members(members)
    total = len(MAGIC) + len(raw_index) + 1 + index['payloadBytes'] + len(FOOTER)
    _integer(scientific_bytes_already, 0, MAX_BYTES - total, 'aggregate scientific/output bytes')
    _integer(log_bytes_already, 0, MAX_LOG_BYTES, 'aggregate log bytes')
    _integer(source_files_already, 0, MAX_SOURCE_FILES - len(members), 'aggregate physical files')
    _integer(source_bytes_already, 0, MAX_SOURCE_BYTES - index['payloadBytes'], 'aggregate physical bytes')
    output = _path(str(output_path))
    _check_path(output.parent)
    parent_identity = SourceIdentity.from_stat(os.stat(output.parent))
    parent_inode = (parent_identity.device, parent_identity.inode)
    _require(not os.path.lexists(output), 'output collision')
    _require(str(output) not in {p for m in members for p in (m.source_path, m.original.path)}, 'output aliases source')
    private = output.with_name(output.name + '.partial.' + os.urandom(16).hex())
    fd = None
    written = 0
    digest = hashlib.sha256()

    def parent_check():
        _check_path(output.parent)
        s = os.stat(output.parent)
        _require((s.st_dev, s.st_ino) == parent_inode, 'output directory replaced')

    def write(raw):
        nonlocal written
        view = memoryview(raw)
        while view:
            control.check('write', output_bytes=written, output_limit=total,
                          private_path=str(private), public_path=str(output))
            n = os.write(fd, view[:CHUNK_BYTES])
            _require(n > 0, 'partial write stalled')
            digest.update(view[:n])
            written += n
            _require(written <= total, 'output overflow')
            view = view[n:]

    try:
        with ExitStack() as stack:
            sources = []
            inodes = set()
            for member in members:
                b = Binding(member.source_path, member.original.sha256, member.original.bytes)
                source = stack.enter_context(_Captured(b, control, member.source_identity))
                key = (source.initial.device, source.initial.inode)
                _require(key not in inodes, 'physical source hardlink alias')
                inodes.add(key)
                sources.append(source)
            parent_check()
            control.check('before-private-create', private_path=str(private), public_path=str(output))
            _require(not os.path.lexists(output), 'output collision')
            fd = os.open(private, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)
            created = os.fstat(fd)
            created_inode = (created.st_dev, created.st_ino)
            write(MAGIC)
            write(raw_index + b'\n')
            for source in sources:
                for chunk in source.chunks():
                    write(chunk)
            write(FOOTER)
            _require(written == total, 'incomplete package write')
            os.fsync(fd)
            os.close(fd)
            fd = None
            private_binding = Binding(str(private), digest.hexdigest(), total)
            with _Captured(private_binding, control) as completed:
                _require((completed.initial.device, completed.initial.inode) == created_inode, 'private output replaced')
                for source in sources:
                    source.recheck()
                parent_check()
                control.check('before-publication', output_bytes=written, private_path=str(private), public_path=str(output))
                completed.recheck()
                os.link(private, output, follow_symlinks=False)
                # The one owned hardlink operation changes ctime legitimately;
                # every other identity component and both path inodes must match.
                linked = SourceIdentity.from_stat(os.fstat(completed.fd))
                _require((linked.device, linked.inode, linked.bytes, linked.mtime_ns)
                         == (completed.initial.device, completed.initial.inode,
                             completed.initial.bytes, completed.initial.mtime_ns), 'publication changed bytes/identity')
                completed.initial = linked
                parent_check()
                directory_fd = os.open(output.parent, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
                try:
                    os.fsync(directory_fd)
                finally:
                    os.close(directory_fd)
                public_binding = Binding(str(output), private_binding.sha256, total)
                with _Captured(public_binding, control, linked) as published:
                    for source in sources:
                        source.recheck()
                    control.check('publication-checked', output_bytes=written, private_path=str(private), public_path=str(output))
                    published.recheck()
                completed.recheck()
            # ExitStack rechecks every retained source before success can return.
        control.check('context-closed', output_bytes=written, private_path=str(private), public_path=str(output))
        parent_check()
        with _Captured(public_binding, control, linked):
            with _Captured(private_binding, control, linked):
                pass
        # No external callbacks occur after these final identity observations.
        # A callback in a late close must not evade earlier source observations.
        for source in sources:
            _check_path(source.path)
            _require(SourceIdentity.from_stat(os.stat(source.path, follow_symlinks=False)) == source.initial,
                     'source changed at context closure')
        for final_path in (private, output):
            _check_path(final_path)
            _require(SourceIdentity.from_stat(os.stat(final_path, follow_symlinks=False)) == linked,
                     'publication changed at context closure')
        _require(time.monotonic() < control.deadline, 'inclusive package deadline exceeded')
        return Publication(public_binding, linked, str(private), time.monotonic() - control.start,
                           len(members), index['payloadBytes'], total)
    except BaseException as exc:
        if fd is not None:
            os.close(fd)
        exc.package_private_path = str(private)
        exc.package_public_path = str(output)
        raise
