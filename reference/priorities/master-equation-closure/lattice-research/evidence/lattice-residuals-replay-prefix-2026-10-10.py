"""Replay the frozen incoming source-prefix refinement into a fresh output directory.

prefix_refinement4.py and its five imported HALE sources are loaded whole and
byte-identical from their recorded scratch paths, each authenticated against
retention.json and its retained byte copy. Every immutable input recorded by
retention.json is hash-checked. The subject reads and writes through one name,
HERE, so the fresh directory first receives byte-exact, hash-verified copies of
the three files the subject reads there; then only prefix_refinement4's own
HERE is redirected. Imported modules keep their original HERE. Run `known`
first, then `target`, from the repository root with the shared project venv.
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

OWNER = ROOT / ".local-data/master-equation-closure/next-event/continuation"
SCRATCH = ROOT / ".tmp/mec-008-next-event/hale"
OUT = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/prefix"
CODE = ("prefix_refinement4.py", "jacobian_factored.py", "jacobian.py", "stationary_full.py", "stationary_jacobian.py", "jacobian-factored-pilot.py")
READ_HERE = ("early-prefix.npz", "early-prefix.json")
# Not in retention.json: PASS receipt of a superseded comparison, read only as a gate by known().
UNRETAINED_GATE = {"comparison-full-known.json": "c381393fa6a4a73d9d92eec0813514c253f6c7772e107899832d4940f3cc539c"}


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()



def _relocation():
    spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


RELOCATION = _relocation()

manifest = json.loads((OWNER / "retention.json").read_text())
recorded = {row["original"]: row for row in manifest["files"]}
authenticated = {}
for name in CODE + READ_HERE:
    row = recorded[f".tmp/mec-008-next-event/hale/{name}"]
    live = ROOT / row["original"]
    kept = ROOT / row["retained"]
    if digest(live) != row["sha256"] or live.read_bytes() != kept.read_bytes():
        raise SystemExit(f"{name} differs from its accepted byte-exact snapshot")
    authenticated[row["original"]] = row["sha256"]
inputs = {}
for path, sha in manifest["inputs"].items():
    if (ROOT / path).parent == RELOCATION.OLD:
        RELOCATION.RECORDED[Path(path).name] = sha
        RELOCATION.relocated(Path(path).name)
    elif digest(ROOT / path) != sha:
        raise SystemExit(f"Immutable input changed: {path}")
    inputs[path] = sha
# Recorded by the earlier through-five retention owner for the interval module jacobian.py loads.
RELOCATION.RECORDED.setdefault("smooth-two-particle-later-residual.py", "19f28d344f2a0cf818b4c64e0dfb82567d40eba777cc7acfb753723fb0d59737")
RELOCATION.install()
for name, sha in UNRETAINED_GATE.items():
    if digest(SCRATCH / name) != sha:
        raise SystemExit(f"Gate receipt changed: {name}")

OUT.mkdir(parents=True, exist_ok=True)
for name in READ_HERE + tuple(UNRETAINED_GATE):
    target_copy = OUT / name
    source_bytes = (SCRATCH / name).read_bytes()
    if target_copy.exists():
        if target_copy.read_bytes() != source_bytes:
            raise SystemExit(f"Fresh directory holds a conflicting {name}")
    else:
        target_copy.write_bytes(source_bytes)

sys.path.insert(0, str(SCRATCH))
spec = importlib.util.spec_from_file_location("replay_prefix_refinement4", SCRATCH / "prefix_refinement4.py")
M = importlib.util.module_from_spec(spec)
spec.loader.exec_module(M)
if M.HERE != SCRATCH.resolve() or M.PILOT.HERE != SCRATCH.resolve():
    raise SystemExit("Subject location is not as recorded")
M.HERE = OUT
receipt = {
    "wrapper_sha256": digest(__file__),
    "authenticated_sources_and_here_inputs": authenticated,
    "authenticated_immutable_inputs": inputs,
    "unretained_gate_receipt": UNRETAINED_GATE,
    "owner_manifest_sha256": digest(OWNER / "retention.json"),
    "redirection": {"attribute": "prefix_refinement4.HERE", "from": str(SCRATCH.relative_to(ROOT)), "to": str(OUT.relative_to(ROOT)), "copied_read_inputs": list(READ_HERE + tuple(UNRETAINED_GATE))},
}

receipt["relocated_analysis_modules"] = RELOCATION.LOG
start = time.time()
if sys.argv[1] == "known":
    M.known()
    control = json.loads((OUT / "prefix-refinement4-known.json").read_text())
    if control["result"] != "PASS" or control["source_sha256"] != recorded[".tmp/mec-008-next-event/hale/prefix_refinement4.py"]["sha256"]:
        raise RuntimeError("Fresh known control did not return PASS for the authenticated subject")
    receipt.update(mode="known", result="PASS", known=control["controls"], wall_seconds=time.time() - start)
    (OUT / "replay-known-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
else:
    prior = json.loads((OUT / "replay-known-receipt.json").read_text())
    if prior["result"] != "PASS" or prior["wrapper_sha256"] != receipt["wrapper_sha256"]:
        raise RuntimeError("Run and observe the fresh known controls with this wrapper first")
    M.target(argparse.Namespace(mode="target"))
    receipt.update(mode="target", result="completed", output_sha256={n: digest(OUT / n) for n in ("prefix-refinement4.json", "prefix-refinement4.npz")}, wall_seconds=time.time() - start)
    (OUT / "replay-target-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
print(json.dumps({"mode": receipt["mode"], "result": receipt["result"], "wall_seconds": receipt["wall_seconds"]}), flush=True)
