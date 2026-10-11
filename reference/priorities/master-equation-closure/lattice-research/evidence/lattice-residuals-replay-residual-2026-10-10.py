"""Replay the frozen 32-cell residual-polynomial instrument into a fresh output directory.

The three ROOT residual sources are loaded whole and byte-identical from their
recorded scratch paths; nothing is sliced or edited. Each is authenticated
against its SHA-256 in the residual owner's reproduction.json and against the
retained byte copy. Every recorded dependency is hash-checked before loading.
The only change is the module attribute OUT of the base residual module, which
every write in the three sources resolves at call time. Run `known` first,
then `target`, from the repository root with the shared project venv.
"""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import json
import sys
import time

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
if len(sys.argv) != 2 or sys.argv[1] not in ("known", "target"):
    raise SystemExit("Use known or target; known must precede target")

OWNER = ROOT / ".local-data/master-equation-closure/next-event/residual"
SCRATCH = ROOT / ".tmp/mec-008-next-event/root"
OUT = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/residual"
CHAIN = ("residual.py", "residual_factored.py", "residual_polynomial.py")


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def _relocation():
    spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


RELOCATION = _relocation()

manifest = json.loads((OWNER / "reproduction.json").read_text())
recorded = {Path(row["original"]).name: row for row in manifest["scripts"]}
authenticated = {}
for name in CHAIN:
    row = recorded[name]
    live = ROOT / row["original"]
    kept = ROOT / row["retained"]
    if live != SCRATCH / name:
        raise SystemExit(f"Unexpected recorded location for {name}")
    if digest(live) != row["sha256"] or live.read_bytes() != kept.read_bytes():
        raise SystemExit(f"{name} differs from its accepted byte-exact snapshot")
    authenticated[row["original"]] = row["sha256"]
dependencies = {}
for row in manifest["dependencies"]:
    if (ROOT / row["path"]).parent == RELOCATION.OLD:
        RELOCATION.RECORDED[Path(row["path"]).name] = row["sha256"]
        RELOCATION.relocated(Path(row["path"]).name)
    elif digest(ROOT / row["path"]) != row["sha256"]:
        raise SystemExit(f"Dependency changed: {row['path']}")
    dependencies[row["path"]] = row["sha256"]
RELOCATION.install()

spec = importlib.util.spec_from_file_location("replay_residual_polynomial", SCRATCH / "residual_polynomial.py")
M = importlib.util.module_from_spec(spec)
spec.loader.exec_module(M)
C = M.C
if M.F.C is not C or C.OUT != OWNER:
    raise SystemExit("Base residual module or its accepted output location is not as recorded")
OUT.mkdir(parents=True, exist_ok=True)
C.OUT = OUT
KNOWN = ("known.json", "factored-known.json", "polynomial-known.json")
receipt = {
    "wrapper_sha256": digest(__file__),
    "authenticated_sources": authenticated,
    "authenticated_dependencies": dependencies,
    "owner_manifest_sha256": digest(OWNER / "reproduction.json"),
    "redirection": {"attribute": "residual.OUT", "from": str(OWNER.relative_to(ROOT)), "to": str(OUT.relative_to(ROOT))},
}


def fresh_known():
    controls = {name: json.loads((OUT / name).read_text()) for name in KNOWN}
    if any(value["result"] != "PASS" for value in controls.values()):
        raise RuntimeError("A fresh known control did not return PASS")
    return controls


receipt["relocated_analysis_modules"] = RELOCATION.LOG
start = time.time()
if sys.argv[1] == "known":
    M.known()
    receipt.update(mode="known", result="PASS", known={k: v["controls"] for k, v in fresh_known().items()}, wall_seconds=time.time() - start)
    (OUT / "replay-known-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
else:
    prior = json.loads((OUT / "replay-known-receipt.json").read_text())
    if prior["result"] != "PASS" or prior["wrapper_sha256"] != receipt["wrapper_sha256"]:
        raise RuntimeError("Run and observe the fresh known controls with this wrapper first")
    fresh_known()
    args = argparse.Namespace(mode="residual", archive="cross-reference/reference", cells_per_unit=64, limit=0, name="residual-polynomial")
    M.run(args)
    receipt.update(mode="target", result="completed", arguments=vars(args), output_sha256=digest(OUT / "residual-polynomial.json"), wall_seconds=time.time() - start)
    (OUT / "replay-target-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
print(json.dumps({"mode": receipt["mode"], "result": receipt["result"], "wall_seconds": receipt["wall_seconds"]}), flush=True)
