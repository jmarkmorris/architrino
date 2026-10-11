"""Check or restore the prefix known-control gate receipt without overwriting anything.

prefix_refinement4.py gates its known controls on comparison-full-known.json in
its scratch directory. The historical retention.json does not list that file.
This replay's prefix driver placed a byte copy in the fresh prefix directory;
this script treats that copy as the recovery copy.

  selftest  exercise the copy rule on known cases in a private scratch directory
  check     report whether the recovery copy and the scratch original have the recorded SHA-256
  restore   write the scratch original from the recovery copy only if it is missing

A present file with different bytes is never replaced: the script stops and
names the conflict. Run from the repository root with the shared project venv.
"""
from pathlib import Path
import hashlib
import json
import shutil
import sys

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
EXPECTED = "c381393fa6a4a73d9d92eec0813514c253f6c7772e107899832d4940f3cc539c"
RECOVERY = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/prefix/comparison-full-known.json"
ORIGINAL = ROOT / ".tmp/mec-008-next-event/hale/comparison-full-known.json"
SELFTEST = ROOT / ".tmp/lattice-residuals-replay-2026-10-10/restore-selftest"


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def copy_exact(source, destination, expected=None):
    """Create destination from source, or confirm it; never replace differing bytes."""
    data = Path(source).read_bytes()
    if expected is not None and hashlib.sha256(data).hexdigest() != expected:
        raise SystemExit(f"Source does not have the recorded SHA-256: {source}")
    destination = Path(destination)
    if destination.exists():
        if destination.read_bytes() != data:
            raise SystemExit(f"Conflict: {destination} is present with different bytes; nothing was written")
        return "present and identical"
    destination.parent.mkdir(parents=True, exist_ok=True)
    with open(destination, "xb") as handle:
        handle.write(data)
    if destination.read_bytes() != data:
        raise SystemExit(f"Verification failed after writing {destination}")
    return "restored"


def selftest():
    if SELFTEST.exists():
        shutil.rmtree(SELFTEST)
    SELFTEST.mkdir(parents=True)
    source = SELFTEST / "source.json"
    source.write_bytes(b'{"result": "PASS"}\n')
    good = hashlib.sha256(source.read_bytes()).hexdigest()
    results = {}
    results["missing destination is created"] = copy_exact(source, SELFTEST / "a/dest.json", good) == "restored" and (SELFTEST / "a/dest.json").read_bytes() == source.read_bytes()
    results["identical destination is left alone"] = copy_exact(source, SELFTEST / "a/dest.json", good) == "present and identical"
    conflict = SELFTEST / "b/dest.json"
    conflict.parent.mkdir()
    conflict.write_bytes(b'{"result": "FAIL"}\n')
    try:
        copy_exact(source, conflict, good)
        results["conflicting destination is refused and unchanged"] = False
    except SystemExit:
        results["conflicting destination is refused and unchanged"] = conflict.read_bytes() == b'{"result": "FAIL"}\n'
    try:
        copy_exact(source, SELFTEST / "c/dest.json", "0" * 64)
        results["wrong source hash is refused and nothing written"] = False
    except SystemExit:
        results["wrong source hash is refused and nothing written"] = not (SELFTEST / "c/dest.json").exists()
    shutil.rmtree(SELFTEST)
    print(json.dumps({"result": "PASS" if all(results.values()) else "FAIL", "controls": results}, indent=2))
    if not all(results.values()):
        raise SystemExit(1)


if len(sys.argv) != 2 or sys.argv[1] not in ("selftest", "check", "restore"):
    raise SystemExit("Use: selftest | check | restore")
if sys.argv[1] == "selftest":
    selftest()
elif sys.argv[1] == "check":
    state = {
        "expected_sha256": EXPECTED,
        "recovery_copy": {"path": str(RECOVERY.relative_to(ROOT)), "sha256": sha(RECOVERY)},
        "scratch_original": {"path": str(ORIGINAL.relative_to(ROOT)), "sha256": sha(ORIGINAL) if ORIGINAL.exists() else None},
    }
    state["recovery_copy_matches"] = state["recovery_copy"]["sha256"] == EXPECTED
    state["scratch_original_matches"] = state["scratch_original"]["sha256"] == EXPECTED if ORIGINAL.exists() else None
    print(json.dumps(state, indent=2))
    if not state["recovery_copy_matches"] or state["scratch_original_matches"] is False:
        raise SystemExit(1)
else:
    print(json.dumps({"action": copy_exact(RECOVERY, ORIGINAL, EXPECTED), "path": str(ORIGINAL.relative_to(ROOT)), "sha256": sha(ORIGINAL)}))
