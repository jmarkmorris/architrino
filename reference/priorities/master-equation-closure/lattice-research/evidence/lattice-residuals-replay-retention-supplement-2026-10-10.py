"""Write the supplemental retention record for the 2026-10-10 enclosure replay.

Creates retention/ in the fresh replay directory and, without replacing any
present file that differs:

- copies the before and after preservation listings from task scratch;
- saves the supervisor's own redacted status for each of the five replay runs
  (the raw lease files hold a control token and are not copied);
- saves a current closeout report for the owner task;
- writes retention-supplement.json indexing those files, the recovery copy of
  the prefix gate receipt, and the fresh scientific outputs, with SHA-256.

It only adds files under retention/. Historical manifests, receipts and the
fresh scientific outputs are read, never written. Run the restore script's
selftest first; this script reuses its conflict-refusing copy rule. Run from
the repository root with the shared project venv.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import subprocess

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
FRESH = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10"
SCRATCH = ROOT / ".tmp/lattice-residuals-replay-2026-10-10"
OUT = FRESH / "retention"
OWNER_TASK = "local_3c48e829-9ba7-441f-ac2f-6da330f991a9"
RUNS = {
    "residual target": "1e70a2c5-c802-4430-adae-aba98c752aa8",
    "prefix refinement target": "e5e0db79-057f-412c-97f0-6012e6a1f6b0",
    "event-cell comparison target": "e35ad4a3-6729-4039-a79d-3c0db851e6be",
    "fifteen references": "f4f72644-acc4-439f-be9c-ef752a16e376",
    "subject controls": "d3cd44fb-dda8-4fc4-85df-53fce74d11af",
}
SUPERVISOR = ["node", "scripts/dev/owned-compute-supervisor.mjs"]

spec = importlib.util.spec_from_file_location("replay_restore_gate", Path(__file__).with_name("lattice-residuals-replay-restore-gate-2026-10-10.py"))
# The restore script dispatches on sys.argv at import; load only its functions.
source = Path(spec.origin).read_text()
marker = 'if len(sys.argv) != 2 or sys.argv[1] not in ("selftest", "check", "restore"):'
if source.count(marker) != 1:
    raise SystemExit("Restore script dispatcher is not the expected unique statement")
GATE = {"__file__": spec.origin, "__name__": "replay_restore_gate"}
exec(compile(source[: source.index(marker)], spec.origin, "exec"), GATE)
copy_exact = GATE["copy_exact"]


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def rel(path):
    return str(Path(path).relative_to(ROOT))


def write_new(path, text):
    """Write text, or confirm an identical file; never replace differing bytes."""
    data = text.encode("utf-8")
    if path.exists():
        if path.read_bytes() != data:
            raise SystemExit(f"Conflict: {rel(path)} is present with different bytes; nothing was written")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "xb") as handle:
        handle.write(data)


OUT.mkdir(parents=True, exist_ok=True)

# Preservation listings.
listings = {}
for name in ("preserved-before.sha256", "preserved-after.sha256"):
    copy_exact(SCRATCH / name, OUT / name)
    listings[name] = {"retained": rel(OUT / name), "scratch_original": rel(SCRATCH / name), "sha256": sha(OUT / name), "lines": len((OUT / name).read_text().splitlines()), "equals_scratch_original": (OUT / name).read_bytes() == (SCRATCH / name).read_bytes()}
if listings["preserved-before.sha256"]["sha256"] != listings["preserved-after.sha256"]["sha256"]:
    raise SystemExit("Before and after preservation listings differ")

# Supervisor run statuses, as redacted by the supervisor itself.
runs = {}
for label, run_id in RUNS.items():
    status = subprocess.run(SUPERVISOR + ["status", "--run-id", run_id], cwd=ROOT, check=True, capture_output=True, text=True).stdout
    body = json.loads(status)["lease"]
    if body["runId"] != run_id or body["status"] != "completed" or body["exitCode"] != 0 or body["processGroupClosed"] is not True:
        raise SystemExit(f"Lease does not support the recorded exit and closure: {label}")
    if body.get("control", {}).get("authentication") != "token-redacted" or "token" in body.get("control", {}):
        raise SystemExit(f"Supervisor status is not redacted: {label}")
    target = OUT / "leases" / f"{run_id}.status.json"
    write_new(target, status)
    runs[label] = {
        "run_id": run_id,
        "retained_status": rel(target),
        "retained_status_sha256": sha(target),
        "live_lease": f".local-data/owned-compute/leases/{run_id}.json",
        "live_stdout_log": rel(body["stdoutPath"]),
        "live_stderr_log": rel(body["stderrPath"]),
        "started_utc": body["startedAtUtc"],
        "finished_utc": body["finishedAtUtc"],
        "elapsed_wall_seconds": body["elapsedWallSeconds"],
        "exit_code": body["exitCode"],
        "process_group_closed": body["processGroupClosed"],
        "command": [body["command"], *body["args"]],
    }

closeout = subprocess.run(SUPERVISOR + ["closeout", "--owner-task", OWNER_TASK], cwd=ROOT, check=True, capture_output=True, text=True).stdout
if json.loads(closeout)["status"] != "clear":
    raise SystemExit("Closeout is not clear for the owner task")
closeout_path = OUT / "closeout-rerun.json"
if not closeout_path.exists():
    write_new(closeout_path, closeout)

gate_recovery = FRESH / "prefix/comparison-full-known.json"
gate_original = ROOT / ".tmp/mec-008-next-event/hale/comparison-full-known.json"
if sha(gate_recovery) != GATE["EXPECTED"]:
    raise SystemExit("Recovery copy of the gate receipt does not have the recorded SHA-256")

outputs = {}
for path in ("compare.json", "residual/residual-polynomial.json", "residual/full-stationary-input.json", "residual/replay-known-receipt.json", "residual/replay-target-receipt.json", "prefix/prefix-refinement4.json", "prefix/prefix-refinement4.npz", "prefix/replay-known-receipt.json", "prefix/replay-target-receipt.json", "event-comparison/event-comparison.json", "event-comparison/replay-known-receipt.json", "event-comparison/replay-target-receipt.json", "subject-controls/summary.json", "subject-controls/source-boxes.npz", "subject-controls/early-prefix.npz", "independent/summary.json"):
    outputs[path] = sha(FRESH / path)

record = {
    "grade": "supplemental retention record for the 2026-10-10 enclosure replay; adds to, and does not replace, the historical retention.json and reproduction.json owners",
    "scope": "ignored local storage on this machine; not a separate backup and not part of a fresh Git checkout",
    "owner_task": OWNER_TASK,
    "gate_receipt": {
        "role": "PASS receipt of the superseded full comparison; read only as a gate by prefix_refinement4.known()",
        "recorded_sha256": GATE["EXPECTED"],
        "recovery_copy": rel(gate_recovery),
        "recovery_copy_sha256": sha(gate_recovery),
        "original_location": rel(gate_original),
        "original_present": gate_original.exists(),
        "original_sha256": sha(gate_original) if gate_original.exists() else None,
        "listed_in_historical_retention_json": any("comparison-full-known.json" in row["original"] for row in json.loads((ROOT / ".local-data/master-equation-closure/next-event/continuation/retention.json").read_text())["files"]),
        "restore_command": '"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/lattice-residuals-replay-restore-gate-2026-10-10.py restore',
        "restore_rule": "writes the original location only if it is missing; a present file with different bytes stops the command and is left unchanged",
    },
    "preservation_listings": {
        "scope": "SHA-256 of every file under .tmp/mec-008-next-event/ and .local-data/master-equation-closure/next-event/, excluding __pycache__, taken before the first replay run and after the last",
        "identical": True,
        "files": listings,
    },
    "supervisor_runs": runs,
    "closeout": {
        "retained": rel(closeout_path),
        "sha256": sha(closeout_path),
        "note": "The closeout run at the end of the replay was displayed and not saved. This file is a later rerun for the same owner task; it supports that no lease of this owner remained live at the rerun, not the earlier display itself.",
    },
    "raw_lease_files_not_copied": "they hold a control token; the retained status files are the supervisor's own redacted output",
    "fresh_scientific_outputs_sha256": outputs,
    "codex_review_receipt": {"path": rel(FRESH / "codex-review-receipt.txt"), "sha256": sha(FRESH / "codex-review-receipt.txt"), "author": "Codex; indexed here, not written by this script"},
    "builder_sha256": sha(__file__),
}
write_new(OUT / "retention-supplement.json", json.dumps(record, indent=2) + "\n")
print(json.dumps({"result": "written", "record": rel(OUT / "retention-supplement.json"), "sha256": sha(OUT / "retention-supplement.json"), "runs": {k: [v["elapsed_wall_seconds"], v["exit_code"], v["process_group_closed"]] for k, v in runs.items()}, "listings_identical": True, "gate_original_sha256": record["gate_receipt"]["original_sha256"]}, indent=2))
