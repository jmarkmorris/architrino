"""Durable storage for the accepted leaf codec; no computation or authority.

The caller supplies a captured codec and an ORIGINAL Python-clock deadline.
This helper does not authenticate either, inspect source/runtime inventories,
acquire a lock, authorize an output lane, or supervise processes. The external
1800-second/RSS/log limits remain mandatory. It imports no scientific module.

Use write as StreamedLeafSession's synchronous sink. Each None return follows
an exact write, flush and fsync. durable_* counts survive a subsequent guard
failure; they are not the codec's acknowledged_* counts. A failed write may
leave extra partial bytes. There is no retry, truncation or prefix deletion.

After session.finish(), seal verifies the entire bounded stream, including
the codec's explicit EOF. The caller MUST then close its adapter and captured
modules and recheck original source identities/runtime BEFORE publish. A
public link proves neither those actions nor mathematical/metric acceptance.
The caller must verify again after its remaining cleanup and retract on any
later failure, including failed completion flushing. Only owned public inodes
are removed; the private prefix always remains. No restart/resume is offered.
"""

from contextlib import contextmanager
from dataclasses import dataclass
import hashlib
import math
import os
from pathlib import Path
import stat
import tempfile
import time


MAX_BYTES = 64 * 1024 * 1024
NAME = 'leaf-evidence.ndjson'
PRIVATE_PREFIX = '.leaf-stream-private-'
CODEC_SHA256 = '371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f'


class PublicationError(ValueError):
    pass


def _require(ok, message):
    if not ok:
        raise PublicationError(message)


def _identity(s):
    return s.st_dev, s.st_ino, s.st_size, s.st_mtime_ns, s.st_ctime_ns


@dataclass(frozen=True)
class StreamBinding:
    path: str
    sha256: str
    bytes: int
    pairs: int
    records: int
    accepted: bool = False


@dataclass(frozen=True)
class PublicationAccounting:
    status: str
    attempted_records: int
    attempted_bytes: int
    written_bytes: int
    durable_records: int
    durable_bytes: int
    descriptor_closed: bool


class LeafStreamPublication:
    """One exclusive private stream and, after seal, one owned public link."""

    def __init__(self, output, codec, *, deadline, byte_limit=MAX_BYTES, live=None):
        self._file = None
        self._phase = 'new'
        self._busy = False
        self._entered = False
        self._owned = None
        self._cleanup_errors = ()
        self._attempted = self._attempted_bytes = self._written = 0
        self._durable = self._durable_bytes = 0
        self._hash = hashlib.sha256()
        self._sealed = self._sealed_identity = None
        _require(type(deadline) in (int, float) and math.isfinite(deadline), 'finite original deadline')
        _require(type(byte_limit) is int and 0 < byte_limit <= MAX_BYTES, 'nonexpanding byte limit')
        _require(live is None or callable(live), 'optional live callback')
        _require(callable(getattr(codec, 'StreamDecoder', None)), 'injected codec decoder')
        _require(type(output) in (str, type(Path())), 'plain output path')
        path = Path(output)
        _require(path.is_absolute() and str(path) == str(output) and path == path.resolve(), 'canonical absolute output')
        _require(path.parent != path and path.name not in ('', '.', '..'), 'bounded output target')
        parent = path.parent.stat()
        _require(stat.S_ISDIR(parent.st_mode), 'existing output parent')
        self._output, self._parent_identity = path, (parent.st_dev, parent.st_ino)
        self._codec, self._deadline, self._limit = codec, deadline, byte_limit
        self._live = live if live is not None else lambda: None
        self._busy = True
        try:
            self._tick()
            path.mkdir(mode=0o700)  # Never adopt a pre-existing attempt.
            s = path.stat()
            self._output_identity = (s.st_dev, s.st_ino)
            self._private = Path(tempfile.mkdtemp(prefix=PRIVATE_PREFIX, dir=path))
            s = self._private.stat()
            self._private_identity = (s.st_dev, s.st_ino)
            self._path = self._private / NAME
            fd = os.open(self._path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
            try: self._file = os.fdopen(fd, 'wb', buffering=0)
            except BaseException:
                os.close(fd)
                raise
            s = os.fstat(self._file.fileno())
            self._inode = (s.st_dev, s.st_ino)
            self._sync_dir(self._private)
            self._sync_dir(path)
            self._sync_dir(path.parent)
            self._tick()
            self._layout(False)
            self._phase = 'writing'
        except BaseException:
            self._phase = 'failed'
            self._release()
            raise
        finally:
            self._busy = False

    @property
    def output(self): return self._output

    @property
    def private_path(self): return self._path

    @property
    def public_path(self): return self._output / NAME

    @property
    def status(self): return self._phase

    @property
    def cleanup_errors(self): return self._cleanup_errors

    @property
    def accounting(self):
        return PublicationAccounting(self._phase, self._attempted, self._attempted_bytes,
                                     self._written, self._durable, self._durable_bytes,
                                     self._file is None)

    def _tick(self):
        _require(self._phase != 'failed' and time.monotonic() < self._deadline, 'failed or expired publication')
        self._live()
        _require(self._phase != 'failed' and time.monotonic() < self._deadline, 'failed or expired publication')

    @contextmanager
    def _operation(self, phases):
        if self._busy or self._phase not in phases:
            self._phase = 'failed'
            if not self._busy:
                self._cleanup_errors += self._retract()
                self._release()
            raise PublicationError('invalid or reentrant publication operation')
        self._busy = True
        try:
            self._tick()
            yield
        except BaseException:
            self._phase = 'failed'
            self._cleanup_errors += self._retract()
            self._release()
            raise
        finally:
            self._busy = False

    @staticmethod
    def _sync_dir(path):
        fd = os.open(path, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0))
        try: os.fsync(fd)
        finally: os.close(fd)

    def _directories(self):
        for path, expected in ((self._output.parent, self._parent_identity),
                               (self._output, self._output_identity),
                               (self._private, self._private_identity)):
            s = path.lstat()
            _require(path == path.resolve() and stat.S_ISDIR(s.st_mode)
                     and (s.st_dev, s.st_ino) == expected, 'directory identity changed')

    def _layout(self, published):
        self._directories()
        _require({p.name for p in self._private.iterdir()} == {NAME}, 'private file census')
        expected = {self._private.name, NAME} if published else {self._private.name}
        _require({p.name for p in self._output.iterdir()} == expected, 'output file census')
        private = self._path.lstat()
        _require(stat.S_ISREG(private.st_mode) and (private.st_dev, private.st_ino) == self._inode
                 and private.st_nlink == (2 if published else 1)
                 and private.st_size <= self._limit, 'owned private inode or quota changed')
        if published:
            public = self.public_path.lstat()
            _require(stat.S_ISREG(public.st_mode) and public.st_nlink == 2
                     and _identity(private) == _identity(public)
                     and (public.st_dev, public.st_ino) == self._owned, 'public/private owned alias differs')

    def write(self, line):
        """Durable exact-byte sink; no parsing, re-encoding or hidden retry."""
        with self._operation(('writing',)):
            _require(type(line) is bytes and 0 < len(line) <= self._limit
                     and line.endswith(b'\n') and line.count(b'\n') == 1, 'one exact LF-ended record')
            self._layout(False)
            s = os.fstat(self._file.fileno())
            _require(_identity(s) == _identity(self._path.lstat()) and s.st_size == self._written
                     and self._written + len(line) <= self._limit, 'stream size or aggregate quota')
            self._attempted += 1
            self._attempted_bytes += len(line)
            n = self._file.write(line)
            if type(n) is int and n > 0:
                self._written += n
            _require(type(n) is int and n == len(line), 'short stream write')
            self._file.flush()
            os.fsync(self._file.fileno())
            self._durable += 1
            self._durable_bytes += n
            self._hash.update(line)
            written_identity = _identity(os.fstat(self._file.fileno()))
            # Durable bytes exist even if this post-fsync guard withholds ACK.
            self._tick()
            self._layout(False)
            _require(written_identity[2] == self._written
                     and _identity(os.fstat(self._file.fileno())) == written_identity,
                     'postwrite identity changed')
        return None

    def _scan(self, path, expected_identity, *, decode=False):
        self._tick()
        fd = os.open(path, os.O_RDONLY | os.O_NONBLOCK | getattr(os, 'O_NOFOLLOW', 0))
        try:
            before = os.fstat(fd)
            _require(stat.S_ISREG(before.st_mode) and 0 < before.st_size <= self._limit
                     and _identity(before) == expected_identity, 'original stream identity changed')
            digest = hashlib.sha256()
            decoder = self._codec.StreamDecoder(byte_limit=self._limit, live=self._tick) if decode else None
            count = total = 0
            with os.fdopen(fd, 'rb', closefd=False) as reader:
                while total < before.st_size:
                    self._tick()
                    line = reader.readline(before.st_size - total + 1)
                    _require(line and len(line) <= before.st_size - total, 'stream growth or truncation')
                    total += len(line)
                    count += 1
                    digest.update(line)
                    if decoder is not None: decoder.feed(line)
                _require(not reader.read(1), 'stream trailing bytes')
            result = decoder.finish() if decoder is not None else None
            self._tick()
            _require(_identity(os.fstat(fd)) == expected_identity and path == path.resolve()
                     and _identity(path.lstat()) == expected_identity, 'stream changed during validation')
            _require(total == self._durable_bytes and digest.hexdigest() == self._hash.hexdigest()
                     and count == self._durable, 'durable prefix differs')
            if result is not None:
                _require(result['complete'] is True and result['accepted'] is False
                         and type(result['pairs']) is int and count == 2 * result['pairs'] + 2
                         and result['bytes'] == total and result['sha256'] == digest.hexdigest(), 'codec EOF receipt differs')
            pairs = result['pairs'] if result is not None else self._sealed.pairs
            return StreamBinding(str(path), digest.hexdigest(), total, pairs, count)
        finally:
            os.close(fd)

    def seal(self):
        with self._operation(('writing',)):
            self._layout(False)
            self._file.flush()
            os.fsync(self._file.fileno())
            self._release(raise_error=True)
            self._tick()
            identity = _identity(self._path.lstat())
            result = self._scan(self._path, identity, decode=True)
            self._layout(False)
            self._sealed, self._sealed_identity = result, identity
            self._phase = 'sealed'
            self._tick()
            self._layout(False)
            _require(_identity(self._path.lstat()) == identity, 'postseal identity changed')
            return result

    def publish(self):
        """Caller-owned source/runtime/adapter cleanup MUST precede this call."""
        with self._operation(('sealed',)):
            self._layout(False)
            self._scan(self._path, self._sealed_identity)
            self._tick()
            os.link(self._path, self.public_path, follow_symlinks=False)
            self._owned = self._inode
            self._sync_dir(self._output)
            self._layout(True)
            identity = _identity(self._path.lstat())
            # Our hardlink legitimately changes ctime, never the other fields.
            _require(identity[:4] == self._sealed_identity[:4], 'stream changed during linking')
            result = self._scan(self.public_path, identity)
            self._sealed_identity = identity
            self._phase = 'published'
            self._tick()
            self._layout(True)
            _require(_identity(self._path.lstat()) == identity, 'postpublication identity changed')
            return result

    def verify(self):
        with self._operation(('published',)):
            self._layout(True)
            result = self._scan(self.public_path, self._sealed_identity)
            self._layout(True)
            return result

    def _release(self, *, raise_error=False):
        if self._file is not None:
            file, self._file = self._file, None
            try: file.close()
            except BaseException as exc:
                self._cleanup_errors += ('descriptor close: ' + str(exc),)
                if raise_error: raise

    def _retract(self):
        errors = []
        if self._owned is not None:
            try:
                self._directories()
                s = self.public_path.lstat()
                if stat.S_ISREG(s.st_mode) and (s.st_dev, s.st_ino) == self._owned:
                    self.public_path.unlink()
                    self._sync_dir(self._output)
                else:
                    errors.append('foreign public replacement preserved')
            except FileNotFoundError:
                pass
            except BaseException as exc:
                errors.append('public retraction: ' + str(exc))
        return tuple(errors)

    def reject(self):
        """Best-effort bounded cleanup without callbacks or deadline renewal."""
        if self._busy:
            self._phase = 'failed'
            raise PublicationError('reentrant cleanup')
        self._phase = 'failed'
        self._release()
        self._cleanup_errors += self._retract()
        return self._cleanup_errors

    def close(self):
        if self._busy:
            self._phase = 'failed'
            raise PublicationError('reentrant close')
        try: self._release(raise_error=True)
        except BaseException:
            self._phase = 'failed'
            self._cleanup_errors += self._retract()
            raise
        if self._phase in ('new', 'writing'): self._phase = 'closed'

    def __enter__(self):
        with self._operation(('writing',)):
            _require(not self._entered, 'fresh context required')
            self._entered = True
            return self

    def __exit__(self, kind, error, traceback):
        if kind is not None or self._phase != 'published': self.reject()
        self.close()
        return False
