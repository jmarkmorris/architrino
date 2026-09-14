"""Explicit finite source admission fixture for tests that already replace math.

Virtual files remain explicitly virtual; existing real files retain actual
identities. This fixture grants no selected runtime or scientific authority.
"""
from contextlib import contextmanager, ExitStack
from hashlib import sha256
from pathlib import Path
import os
import stat
from unittest.mock import patch


def _capture(path):
    if path != path.resolve():
        raise ValueError('Synthetic source alias')
    fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK)
    try:
        before=os.fstat(fd)
        if not stat.S_ISREG(before.st_mode) or before.st_size>1024**3:
            raise ValueError('Synthetic source regular byte bound')
        with os.fdopen(fd,'rb',closefd=False) as stream:raw=stream.read()
        identity=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
        initial=identity(before)
        if identity(os.fstat(fd))!=initial or identity(path.stat(follow_symlinks=False))!=initial:
            raise ValueError('Synthetic source changed during first capture')
        return raw,initial
    finally:os.close(fd)


@contextmanager
def synthetic_production(module,root,sources,*,outputs=(),virtual_sources=None):
    root=Path(root).resolve()
    if root==Path(__file__).resolve().parents[1]:
        raise ValueError('Synthetic fixture cannot replace live repository admission')
    paths={Path(p) if Path(p).is_absolute() else root/p for p in sources}
    virtual={Path(p) if Path(p).is_absolute() else root/p:raw for p,raw in (virtual_sources or {}).items()}
    paths.update(virtual)
    output_paths={Path(p) if Path(p).is_absolute() else root/p for p in outputs}
    if len(paths|output_paths)>512 or paths&output_paths or any(p!=p.resolve() or not p.is_relative_to(root) for p in paths|output_paths):
        raise ValueError('Closed canonical synthetic source/output census')
    captured={p:_capture(p) for p in paths if p.exists()}
    if any(p not in captured and p not in virtual for p in paths):
        raise ValueError('Declared synthetic source missing')
    raw={p:captured[p][0] if p in captured else virtual[p] for p in paths}
    if sum(map(len,raw.values()))>1024**3:
        raise ValueError('Synthetic source aggregate byte bound')
    def recheck():
        for p,(original,identity) in captured.items():
            current,observed=_capture(p)
            if current!=original or observed!=identity:
                raise ValueError('Retained synthetic source generation replaced')
    def target_path(given_root,host,target,*,allow_output=False):
        if Path(given_root).resolve()!=root or not Path(host).is_relative_to(root):
            raise ValueError('Synthetic admission host/root differs')
        p=Path(target);p=p if p.is_absolute() else root/p
        if p not in paths and not(allow_output and p in output_paths):
            raise ValueError('Unknown synthetic production path')
        recheck();return p
    def original(given_root,host,target,expectedOriginalSha=None,*,optional=False):
        target_path(given_root,host,target,allow_output=True)
        if not optional:raise ValueError('Synthetic fixture has no historical archive authority')
        return None
    def pair(given_root,host,target,expectedOriginalSha=None):
        p=target_path(given_root,host,target)
        if expectedOriginalSha is not None and sha256(raw[p]).hexdigest()!=expectedOriginalSha:
            raise ValueError('Synthetic original digest differs')
        return raw[p],raw[p],tuple(module.OPTION_B_PRODUCTION_IDENTITIES) if p==Path(module.__file__) else ()
    with ExitStack() as stack:
        for name,value in [('production_original_source_binding',original),('production_source_pair',pair),('production_recheck',recheck)]:
            stack.enter_context(patch.object(module,name,value))
        recheck()
        yield


@contextmanager
def synthetic_capture(module,capture_class,paths):
    """Finite virtual IO authority for tests that already replace capture/math.

    No virtual byte or identity is asserted to be a selected production source.
    The real executing module remains protected by its admitted source checks.
    """
    closed=frozenset(str(Path(p).absolute()) for p in paths)
    if not closed or len(closed)>512:
        raise ValueError('Synthetic capture census')
    @contextmanager
    def capture(cls,filename,digest,**kwargs):
        if cls is not capture_class or str(Path(filename).absolute()) not in closed:
            raise ValueError('Unknown synthetic capture class/path')
        with cls(filename,digest,**kwargs) as held:
            yield held
    module.production_recheck()
    with patch.object(module,'_production_capture',capture):
        yield
    module.production_recheck()
