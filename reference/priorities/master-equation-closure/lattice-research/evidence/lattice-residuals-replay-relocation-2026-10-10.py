"""Authenticate analysis modules that moved one directory deeper after the accepted runs.

The frozen instruments load analysis modules from
reference/priorities/master-equation-closure/analysis/. Commit 308002c7b moved
those modules to lattice-research/analysis/ and deepened each module's own
repository-root index by one (`parents[k]` became `parents[k+1]`), so the live
bytes differ from the recorded ones on that line. This helper proves, for each
module actually loaded, that the live file equals the pre-move Git blob on every
other line and that each differing line is exactly that index increment. Where a
receipt recorded a SHA-256 for the pre-move path, the pre-move blob must match
it. Loads of the old location are then served from the live moved file. Nothing
is written; Git is only read.
"""
from pathlib import Path
import hashlib
import importlib.util
import re
import subprocess

ROOT = Path(__file__).resolve().parents[5]
OLD = ROOT / "reference/priorities/master-equation-closure/analysis"
NEW = ROOT / "reference/priorities/master-equation-closure/lattice-research/analysis"
MOVE_COMMIT = "308002c7b"
RECORDED = {}
LOG = {}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def relocated(name):
    """Return the live moved path once it is proved equal to the pre-move blob up to the root index."""
    if name in LOG:
        return NEW / name
    blob = subprocess.run(
        ["git", "--no-optional-locks", "show", f"{MOVE_COMMIT}^:{(OLD / name).relative_to(ROOT)}"],
        cwd=ROOT, check=True, capture_output=True,
    ).stdout
    live = (NEW / name).read_bytes()
    before, after = blob.split(b"\n"), live.split(b"\n")
    if len(before) != len(after):
        raise SystemExit(f"{name}: moved file has a different line count from the pre-move blob")
    changed = []
    for number, (a, b) in enumerate(zip(before, after), 1):
        if a != b:
            if re.sub(rb"parents\[(\d)\]", lambda m: b"parents[%d]" % (int(m[1]) + 1), a) != b:
                raise SystemExit(f"{name}: line {number} differs by more than the root-index increment")
            changed.append(number)
    recorded = RECORDED.get(name)
    if recorded is not None and sha(blob) != recorded:
        raise SystemExit(f"{name}: pre-move blob does not match the recorded SHA-256")
    LOG[name] = {"pre_move_sha256": sha(blob), "recorded_sha256": recorded, "live_sha256": sha(live), "root_index_lines": changed}
    return NEW / name


_original = importlib.util.spec_from_file_location


def install():
    def patched(name, location=None, *args, **kwargs):
        if location is not None:
            path = Path(location)
            path = path if path.is_absolute() else Path.cwd() / path
            if path.parent in (OLD, NEW):
                if path.parent == OLD and path.exists():
                    raise SystemExit(f"{path.name}: unexpected live file at the pre-move location")
                location = relocated(path.name)
        return _original(name, location, *args, **kwargs)

    importlib.util.spec_from_file_location = patched
