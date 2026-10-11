"""Replay the cheap HALE subject controls and input tables into a fresh directory.

Covers the receiver-Jacobian and stationary-Jacobian known controls, the
incoming source-box table and the early prefix-error table. Each HALE source is
loaded whole and byte-identical, authenticated against retention.json and its
retained copy. Only output locations change: each loaded module's own HERE, and
source_boxes.OUT, point at the fresh directory. Fresh arrays are then compared
elementwise with the accepted tables. Run from the repository root with the
shared project venv; the script runs known controls before each target itself.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import sys
import time

import numpy as np

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
OWNER = ROOT / ".local-data/master-equation-closure/next-event/continuation"
SCRATCH = ROOT / ".tmp/mec-008-next-event/hale"
OUT = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/subject-controls"
CODE = ("jacobian.py", "jacobian_factored.py", "stationary_jacobian.py", "stationary_full.py", "source_boxes.py", "early_prefix.py", "prefix_refinement2.py", "jacobian-factored-pilot.py")


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
RELOCATION = importlib.util.module_from_spec(spec)
spec.loader.exec_module(RELOCATION)
RELOCATION.RECORDED["smooth-two-particle-later-residual.py"] = "19f28d344f2a0cf818b4c64e0dfb82567d40eba777cc7acfb753723fb0d59737"
RELOCATION.install()

manifest = json.loads((OWNER / "retention.json").read_text())
recorded = {row["original"]: row for row in manifest["files"]}
authenticated = {}
for name in CODE:
    row = recorded[f".tmp/mec-008-next-event/hale/{name}"]
    if digest(ROOT / row["original"]) != row["sha256"] or (ROOT / row["original"]).read_bytes() != (ROOT / row["retained"]).read_bytes():
        raise SystemExit(f"{name} differs from its accepted byte-exact snapshot")
    authenticated[row["original"]] = row["sha256"]
OUT.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(SCRATCH))


def load(name):
    module_spec = importlib.util.spec_from_file_location("replay_" + name.replace(".py", "").replace("-", "_"), SCRATCH / name)
    module = importlib.util.module_from_spec(module_spec)
    module_spec.loader.exec_module(module)
    if module.HERE != SCRATCH.resolve():
        raise SystemExit(f"{name}: subject location is not as recorded")
    module.HERE = OUT
    return module


def same_arrays(fresh_path, accepted_path, keys):
    fresh, accepted = np.load(fresh_path), np.load(accepted_path)
    return {key: bool(fresh[key].shape == accepted[key].shape and np.array_equal(fresh[key], accepted[key])) for key in keys}


# Known cases for the in-session array comparison, before any target use.
probe = OUT / "comparison-known-case.npz"
np.savez(probe, a=np.arange(4.0))
other = OUT / "comparison-known-case-perturbed.npz"
np.savez(other, a=np.array([0.0, 1.0, 2.0, np.nextafter(3.0, 4.0)]))
assert same_arrays(probe, probe, ["a"]) == {"a": True} and same_arrays(probe, other, ["a"]) == {"a": False}

rows = []


def step(label, call, receipt_name):
    start = time.time()
    call()
    body = json.loads((OUT / receipt_name).read_text())
    if body["result"] != "PASS":
        raise RuntimeError(f"{label} did not return PASS")
    row = {"step": label, "result": body["result"], "controls": body.get("controls"), "wall_seconds": round(time.time() - start, 3)}
    rows.append(row)
    print(json.dumps({"step": label, "result": "PASS", "seconds": row["wall_seconds"]}), flush=True)
    return row


jacobian = load("jacobian.py")
step("jacobian known", jacobian.known, "jacobian-known.json")
factored = load("jacobian_factored.py")
step("jacobian_factored known", factored.known_factored, "jacobian-factored-known.json")
stationary = load("stationary_jacobian.py")
step("stationary_jacobian known", stationary.known, "stationary-jacobian-known.json")
full = load("stationary_full.py")
step("stationary_full known", full.known_full, "stationary-full-known.json")

boxes = load("source_boxes.py")
if (ROOT / boxes.OUT).resolve() != OWNER.resolve():
    raise SystemExit("source_boxes output location is not as recorded")
boxes.OUT = OUT
step("source_boxes known", boxes.known, "source-boxes-known.json")
row = step("source_boxes target", boxes.target, "source-boxes.json")
row["arrays_equal_to_accepted"] = same_arrays(OUT / "source-boxes.npz", OWNER / "source-boxes.npz", ["lo", "hi", "points"])
row["fresh_npz_sha256"] = digest(OUT / "source-boxes.npz")
row["accepted_npz_sha256"] = digest(OWNER / "source-boxes.npz")

early = load("early_prefix.py")
step("early_prefix known", early.known, "early-prefix-known.json")
row = step("early_prefix target", early.target, "early-prefix.json")
row["arrays_equal_to_accepted"] = same_arrays(OUT / "early-prefix.npz", OWNER / "early-prefix.npz", ["errors", "full_errors"])
row["fresh_npz_sha256"] = digest(OUT / "early-prefix.npz")
row["accepted_npz_sha256"] = digest(OWNER / "early-prefix.npz")
fresh_json = json.loads((OUT / "early-prefix.json").read_text())
accepted_json = json.loads((OWNER / "early-prefix.json").read_text())
row["receipt_equal_to_accepted"] = fresh_json == accepted_json

(OUT / "summary.json").write_text(json.dumps({"wrapper_sha256": digest(__file__), "authenticated_sources": authenticated, "relocated_analysis_modules": RELOCATION.LOG, "rows": rows}, indent=2) + "\n")
print(json.dumps({"result": "completed", "steps": len(rows)}), flush=True)
