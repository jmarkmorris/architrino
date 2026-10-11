"""Reproduce the selected boundary residual from the current source into a fresh owner.

Scenario: unchanged canonical Master Equation, infinite alternating cubic lattice
with the stationary eight-source prescription, the original two smooth supplied
past pulses, g=16 and numerical c_f=1. The subject evaluates the continuous
full-law defect of two auxiliary quadratic comparison curves on [5, 81/16] with
incoming accepted histories through 17/4. The curves are comparison objects, not
a physical trajectory.

The live subject and every analysis module it loads are authenticated first: each
must equal its pre-move Git blob except for the one root-index line changed when
the files moved one directory deeper, and the subject's pre-move blob must have
the SHA-256 the frozen receipt names. The subject is then loaded whole. The only
execution adaptation is its module attribute OUT, pointed at the fresh owner; the
frozen selected-check directory is never written. Run `known`, then `target`,
from the repository root with the shared project venv.
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

SUBJECT = "smooth-two-particle-first-class-boundary-selected-certificate.py"
FROZEN_SUBJECT_SHA256 = "70910da20bf40921f8ef847063ac2652ae36ae765877102edd31dc7f0215f771"
LIVE_SUBJECT_SHA256 = "b255840a827d029b889072d550f51420c2492c4d06f6991746a8e1b0680d1f18"
FROZEN_OUT = ROOT / ".local-data/master-equation-closure/first-class-boundary/selected-check"
OUT = ROOT / ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/selected-check"
# Inputs the subject reads, with the full SHA-256 each must have before it is loaded.
INPUTS = {
    ".local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz": "b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988",
    ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.npz": "d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6",
}
RECORDED_ONLY = (
    ".local-data/master-equation-closure/post-restart/approximant/population-h21-4.json",
    ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.json",
    ".local-data/master-equation-closure/post-restart/cubic-population-check/polynomial-bounds.json",
)


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
RELOCATION = importlib.util.module_from_spec(spec)
spec.loader.exec_module(RELOCATION)
RELOCATION.RECORDED[SUBJECT] = FROZEN_SUBJECT_SHA256
live_subject = RELOCATION.relocated(SUBJECT)
if digest(live_subject) != LIVE_SUBJECT_SHA256:
    raise SystemExit("Live subject does not have the expected current SHA-256")
for path, expected in INPUTS.items():
    if digest(ROOT / path) != expected:
        raise SystemExit(f"Input changed: {path}")
RELOCATION.install()

spec = importlib.util.spec_from_file_location("serial_boundary_subject", live_subject)
M = importlib.util.module_from_spec(spec)
spec.loader.exec_module(M)
if M.OUT != FROZEN_OUT or M.ROOT != ROOT:
    raise SystemExit("Subject root or accepted output location is not as recorded")
M.OUT = OUT
OUT.mkdir(parents=True, exist_ok=True)
receipt = {
    "wrapper_sha256": digest(__file__),
    "scenario": {"equation": "unchanged canonical Master Equation", "g": 16, "c_f": 1, "interval": ["5", "81/16"], "incoming_end": "17/4", "comparison_radius": "3/40", "environmental_ceiling": "1/16"},
    "subject": {"path": str(live_subject.relative_to(ROOT)), "live_sha256": LIVE_SUBJECT_SHA256, "frozen_receipt_sha256": FROZEN_SUBJECT_SHA256},
    "loaded_analysis_modules": RELOCATION.LOG,
    "input_sha256": {**INPUTS, **{path: digest(ROOT / path) for path in RECORDED_ONLY}},
    "execution_adaptations": ["subject OUT redirected from first-class-boundary/selected-check to this owner", "analysis modules served from their moved location after one-line root-index authentication"],
    "command": [sys.executable, *sys.argv],
}

start = time.time()
if sys.argv[1] == "known":
    M.known()
    control = json.loads((OUT / "known.json").read_text())
    if control["result"] != "PASS" or control["source_sha256"] != LIVE_SUBJECT_SHA256 or len(control["controls"]) != 5:
        raise RuntimeError("Fresh known controls did not return PASS for the live subject")
    receipt.update(mode="known", result="PASS", controls=control["controls"], wall_seconds=time.time() - start)
    (OUT / "reproduction-known-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
else:
    prior = json.loads((OUT / "reproduction-known-receipt.json").read_text())
    if prior["result"] != "PASS" or prior["wrapper_sha256"] != receipt["wrapper_sha256"]:
        raise RuntimeError("Run and observe the fresh known controls with this wrapper first")
    M.residual(argparse.Namespace(mode="residual"))
    receipt.update(mode="target", result="completed", output_sha256=digest(OUT / "selected-residual.json"), wall_seconds=time.time() - start)
    (OUT / "reproduction-target-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
print(json.dumps({"mode": receipt["mode"], "result": receipt["result"], "wall_seconds": receipt["wall_seconds"]}), flush=True)
