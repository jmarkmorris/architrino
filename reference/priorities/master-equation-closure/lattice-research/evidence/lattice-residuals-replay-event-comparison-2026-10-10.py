"""Recompute the event-cell field and receiver-Jacobian comparison from the fresh enclosures.

event_comparison.py and its imported HALE sources are loaded whole and
byte-identical, authenticated against retention.json and their retained copies.
Three locations change and nothing else: the subject's HERE (receipts written),
its REFINED table (the fresh prefix-refinement4.npz from this replay instead of
the accepted one) and the --residual argument (the fresh residual-polynomial.json
instead of the accepted one). The fresh directory first receives a byte copy of
the fresh prefix known receipt the subject's known() gates on. Run `known`
first, then `target`, after the residual and prefix replays have completed.
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
FRESH = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10"
OUT = FRESH / "event-comparison"
RESIDUAL = ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/residual/residual-polynomial.json"
CODE = ("event_comparison.py", "jacobian_factored.py", "jacobian.py", "stationary_full.py", "stationary_jacobian.py", "jacobian-factored-pilot.py")


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
RELOCATION = importlib.util.module_from_spec(spec)
spec.loader.exec_module(RELOCATION)
RELOCATION.RECORDED["smooth-two-particle-later-residual.py"] = "19f28d344f2a0cf818b4c64e0dfb82567d40eba777cc7acfb753723fb0d59737"

manifest = json.loads((OWNER / "retention.json").read_text())
recorded = {row["original"]: row for row in manifest["files"]}
authenticated = {}
for name in CODE:
    row = recorded[f".tmp/mec-008-next-event/hale/{name}"]
    if digest(ROOT / row["original"]) != row["sha256"] or (ROOT / row["original"]).read_bytes() != (ROOT / row["retained"]).read_bytes():
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
RELOCATION.install()

for needed in ("prefix/replay-target-receipt.json", "residual/replay-target-receipt.json"):
    if json.loads((FRESH / needed).read_text())["result"] != "completed":
        raise SystemExit(f"Fresh upstream replay is not complete: {needed}")
OUT.mkdir(parents=True, exist_ok=True)
gate = (FRESH / "prefix/prefix-refinement4-known.json").read_bytes()
if (OUT / "prefix-refinement4-known.json").exists() and (OUT / "prefix-refinement4-known.json").read_bytes() != gate:
    raise SystemExit("Fresh directory holds a conflicting prefix known receipt")
(OUT / "prefix-refinement4-known.json").write_bytes(gate)

sys.path.insert(0, str(SCRATCH))
spec = importlib.util.spec_from_file_location("replay_event_comparison", SCRATCH / "event_comparison.py")
M = importlib.util.module_from_spec(spec)
spec.loader.exec_module(M)
if M.HERE != SCRATCH.resolve() or M.REFINED != SCRATCH.resolve() / "prefix-refinement4.npz":
    raise SystemExit("Subject locations are not as recorded")
M.HERE = OUT
M.REFINED = FRESH / "prefix/prefix-refinement4.npz"
receipt = {
    "wrapper_sha256": digest(__file__),
    "authenticated_sources": authenticated,
    "authenticated_immutable_inputs": inputs,
    "relocated_analysis_modules": RELOCATION.LOG,
    "fresh_inputs": {"residual": RESIDUAL, "residual_sha256": digest(ROOT / RESIDUAL), "refined_errors": str(M.REFINED.relative_to(ROOT)), "refined_errors_sha256": digest(M.REFINED)},
    "redirection": {"HERE": str(OUT.relative_to(ROOT)), "REFINED_from": ".tmp/mec-008-next-event/hale/prefix-refinement4.npz", "residual_from": ".local-data/master-equation-closure/next-event/residual/residual-polynomial.json"},
}

start = time.time()
if sys.argv[1] == "known":
    M.known()
    control = json.loads((OUT / "event-comparison-known.json").read_text())
    if control["result"] != "PASS":
        raise RuntimeError("Fresh known control did not return PASS")
    receipt.update(mode="known", result="PASS", known=control["controls"], wall_seconds=time.time() - start)
    (OUT / "replay-known-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
else:
    prior = json.loads((OUT / "replay-known-receipt.json").read_text())
    if prior["result"] != "PASS" or prior["wrapper_sha256"] != receipt["wrapper_sha256"]:
        raise RuntimeError("Run and observe the fresh known controls with this wrapper first")
    M.target(argparse.Namespace(mode="target", residual=RESIDUAL))
    receipt.update(mode="target", result="completed", output_sha256=digest(OUT / "event-comparison.json"), wall_seconds=time.time() - start)
    (OUT / "replay-target-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
print(json.dumps({"mode": receipt["mode"], "result": receipt["result"], "wall_seconds": receipt["wall_seconds"]}), flush=True)
