"""Repeatable replay of the older lattice boundary certificate into a new, unoccupied owner.

Scenario: unchanged canonical Master Equation; infinite alternating cubic lattice
with the stationary eight-source prescription; the two original smooth supplied
past pulses; g=16; numerical c_f=1; environmental displacement ceiling 1/16 after
t=5; comparison horizon 81/16; incoming accepted histories through 17/4. The
quadratic curves are comparison objects. No trajectory is evolved.

Two different commands:

  new --run <label>   A new reproduction. Creates
                      .local-data/master-equation-closure/serial-boundary-replays/<label>/
                      and refuses if that directory already exists. Everything it
                      writes, including the versioned reference sources, goes
                      inside that directory. It never writes the frozen evidence,
                      the first replay's owner, or any file under evidence/.
  verify <owner>      Read-only. Checks an owner's receipts.sha256, the frozen
                      reference MANIFEST.sha256 and the first replay's versioned
                      reference sources. Writes nothing.

`new` runs known cases first at every stage and stops at the first failure:
this driver's own substitution and comparison rules; the subject's five known
controls; each reference's known controls; the history audit's known controls.

Execution adaptations, all explicit and retained as diffs in the owner:
- output directories point into the new owner;
- analysis modules that moved one directory deeper are served from the moved
  location only after each is proved equal to its pre-move Git blob except for
  its one root-index line (the stage-0 relocation helper, reused unchanged);
- the versioned references use current paths and the retained copy of an earlier
  error receipt, and gain literal SHA-256 guards on every consumed input. The
  mathematical arithmetic of the references is unchanged; path and output routing
  change, and the event reference's target function gains the guard loop;
- the history endpoint audit runs from its retained copy, not from scratch: its
  root, its nested audit, its pulse record and its adjudication document are all
  routed to retained or current locations, each still checked by the instrument's
  own literal hashes.

Declared metadata differences in comparisons are source identities, timers, routed
input paths and hashes of receipts carrying those, and, in the history audit, the
identity the nested audit records for the relocated interval module (its frozen
value is the pre-move hash, its fresh value the moved file's hash; the relocation
helper authenticates the pair). A difference anywhere else is scientific.

Run from the repository root with the shared project venv.
"""
from fractions import Fraction as F
from pathlib import Path
import argparse
import difflib
import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys
import time
import types

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
CLOSURE = ROOT / ".local-data/master-equation-closure"
FROZEN = CLOSURE / "first-class-boundary"
FIRST_RUN = CLOSURE / "serial-boundary-reproduction-2026-10-10"
REPLAYS = CLOSURE / "serial-boundary-replays"
EVIDENCE = Path(__file__).resolve().parent
SUBJECT = "smooth-two-particle-first-class-boundary-selected-certificate.py"
SUBJECT_NOW = "reference/priorities/master-equation-closure/lattice-research/analysis/" + SUBJECT
FROZEN_SUBJECT_SHA256 = "70910da20bf40921f8ef847063ac2652ae36ae765877102edd31dc7f0215f771"
LIVE_SUBJECT_SHA256 = "b255840a827d029b889072d550f51420c2492c4d06f6991746a8e1b0680d1f18"
ARCHIVE = "b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988"
INCOMING = "d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6"
APPROX = ".local-data/master-equation-closure/post-restart/approximant/"
ENDPOINT = ".local-data/master-equation-closure/first-class-boundary/history/endpoint.json"
HERE_LINE = "HERE=Path(__file__).resolve().parent"
REFERENCES = {"stationary": "stationary-domain.py", "stopped": "stopped-reference.py", "event": "event-reference.py"}
FIRST_RUN_REFERENCES = {
    "serial-boundary-stationary-domain-v2-2026-10-10.py": "f3ce8aa0917167bac8f06be881ffbdeb3c49e723907d6b1dfb77e6e61e7b730a",
    "serial-boundary-stopped-reference-v2-2026-10-10.py": "91ada742b0c1a17cf617b5a340a3b16dddb9adb01707f3f786ac41d11b8c90e3",
    "serial-boundary-event-reference-v2-2026-10-10.py": "acd0b5867a657955f48e2f68a9be3a511ff105ab6a85b40e7e1074cd652e882a",
}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def rel(path):
    return str(Path(path).resolve().relative_to(ROOT))


def substitute(text, pairs):
    """Apply each (old, new) exactly once; any other match count stops."""
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f"Substitution target occurs {text.count(old)} times, expected 1: {old[:70]!r}")
        text = text.replace(old, new)
    return text


def differences(a, b, path=""):
    out = []
    if isinstance(a, dict) and isinstance(b, dict):
        for key in sorted(set(a) | set(b)):
            out += [f"{path}/{key}"] if key not in a or key not in b else differences(a[key], b[key], f"{path}/{key}")
    elif isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        for index, (x, y) in enumerate(zip(a, b)):
            out += differences(x, y, f"{path}/{index}")
    elif a != b:
        out.append(path or "/")
    return out


def split(found, declared):
    metadata = [p for p in found if any(p == d or p.startswith(d + "/") for d in declared)]
    return [p for p in found if p not in metadata], metadata


def write_new(path, data):
    """Create a file that must not already exist."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "xb") as handle:
        handle.write(data if isinstance(data, bytes) else data.encode("utf-8"))


def known_cases():
    assert substitute("a=1;b=2\n", [("a=1", "a=3")]) == "a=3;b=2\n"
    for bad in ("a=1;a=1\n", "b=2\n"):
        try:
            substitute(bad, [("a=1", "a=3")])
            raise AssertionError("ambiguous or absent substitution target was not refused")
        except SystemExit:
            pass
    assert "b8c445020bbfe88dc3cd138308410f7d056a81945692df0755e127866ca988".replace("410f", "41050f") == ARCHIVE
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5}]}) == []
    assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5000000000000004}]}) == ["/a/1/b"]
    assert differences({"a": 1}, {"a": 1, "c": 2}) == ["/c"] and differences([1, 2], [1, 2, 3]) == ["/"]
    assert split(["/seconds", "/inputs/x", "/rows/0"], ["/seconds", "/inputs"]) == (["/rows/0"], ["/seconds", "/inputs/x"])
    assert split(["/inputsize"], ["/inputs"]) == (["/inputsize"], [])
    probe = ROOT / ".tmp" / f"serial-boundary-replay-known-{os.getpid()}"
    probe.parent.mkdir(exist_ok=True)
    write_new(probe, "x")
    try:
        write_new(probe, "y")
        raise AssertionError("an occupied path was overwritten")
    except FileExistsError:
        assert probe.read_text() == "x"
    finally:
        probe.unlink()
    return ["single exact substitution; duplicate and absent targets refused", "archive expression equals the full literal", "SHA-256 of abc", "identical, last-place, missing-key and unequal-length comparisons", "declared-metadata split, including a name that only begins with a declared name", "occupied output path refused and left unchanged"]


def relocation():
    spec = importlib.util.spec_from_file_location("replay_relocation", EVIDENCE / "lattice-residuals-replay-relocation-2026-10-10.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def manifest():
    rows = {}
    for line in (FROZEN / "independent/MANIFEST.sha256").read_text().splitlines():
        value, name = line.split(None, 1)
        rows[Path(name.strip()).name] = value
    return rows


# ---- steps, each run in its own interpreter by `new` -----------------------------

def step_residual(owner, mode):
    out = owner / "selected-check"
    helper = relocation()
    helper.RECORDED[SUBJECT] = FROZEN_SUBJECT_SHA256
    live = helper.relocated(SUBJECT)
    if sha(live) != LIVE_SUBJECT_SHA256 or sha(ROOT / (APPROX + "population-h21-4.npz")) != ARCHIVE or sha(ROOT / (APPROX + "population-h17-4.npz")) != INCOMING:
        raise SystemExit("Subject or archive identity is not as recorded")
    helper.install()
    spec = importlib.util.spec_from_file_location("serial_boundary_subject", live)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    if module.OUT != FROZEN / "selected-check" or module.ROOT != ROOT:
        raise SystemExit("Subject root or accepted output location is not as recorded")
    module.OUT = out
    start = time.time()
    if mode == "known":
        if out.exists():
            raise SystemExit("Residual output directory is already occupied")
        out.mkdir(parents=True)
        module.known()
        control = json.loads((out / "known.json").read_text())
        if control["result"] != "PASS" or control["source_sha256"] != LIVE_SUBJECT_SHA256 or len(control["controls"]) != 5:
            raise SystemExit("Subject known controls did not pass")
    else:
        if (out / "selected-residual.json").exists() or json.loads((out / "known.json").read_text())["result"] != "PASS":
            raise SystemExit("Residual target is occupied or known controls are absent")
        module.residual(argparse.Namespace(mode="residual"))
    inputs = {APPROX + n: sha(ROOT / (APPROX + n)) for n in ("population-h21-4.npz", "population-h17-4.npz", "population-h21-4.json", "population-h17-4.json")}
    bounds = ".local-data/master-equation-closure/post-restart/cubic-population-check/polynomial-bounds.json"
    inputs[bounds] = sha(ROOT / bounds)
    write_new(out / f"replay-{mode}-receipt.json", json.dumps({"driver_sha256": sha(__file__), "mode": mode, "subject": {"path": rel(live), "live_sha256": LIVE_SUBJECT_SHA256, "frozen_receipt_sha256": FROZEN_SUBJECT_SHA256}, "loaded_analysis_modules": helper.LOG, "input_sha256": inputs, "wall_seconds": time.time() - start}, indent=2) + "\n")


def step_build(owner, kind):
    name = REFERENCES[kind]
    preserved = FROZEN / "independent" / name
    if sha(preserved) != manifest()[name]:
        raise SystemExit(f"{name} does not match the retained manifest")
    text = preserved.read_text()
    first_line, rest = text.split("\n", 1)
    if not first_line.endswith('"""'):
        raise SystemExit("Preserved reference does not begin with the expected one-line docstring")
    reference_out = rel(owner / "reference")
    header = f"# Versioned execution adaptation of the preserved reference {name} (SHA-256 {sha(preserved)}), built by serial-boundary-replay-2026-10-10.py for run owner {rel(owner)}. Mathematical arithmetic is unchanged; paths and output routing change and literal input guards are added. Not an independently authored reference."
    pairs = [(HERE_LINE, f"HERE=Path({reference_out!r})")]
    if kind == "stopped":
        frozen = json.loads((FROZEN / "independent/stopped-reference-target.json").read_text())["inputs"]
        retained = ".local-data/master-equation-closure/first-class-boundary/independent/incoming-population-error-target.json"
        scratch = ".tmp/mec-008-population-restart/moore/population-error-target.json"
        if sha(ROOT / retained) != frozen[scratch]:
            raise SystemExit("Retained copy of the earlier error receipt does not match the frozen input hash")
        literals = [frozen[key] for key in list(frozen)[:3]] + [frozen[scratch]]
        pairs.append((f"Path('{scratch}')]", f"Path('{retained}')]\nEXPECTED_INPUT_SHA256={literals!r}\nassert [hashlib.sha256(p.read_bytes()).hexdigest() for p in INPUTS]==EXPECTED_INPUT_SHA256\nassert hashlib.sha256(Path('{ENDPOINT}').read_bytes()).hexdigest()=={sha(ROOT / ENDPOINT)!r}"))
    if kind == "event":
        residual = rel(owner / "selected-check/selected-residual.json")
        stopped = reference_out + "/stopped-reference-target.json"
        history = APPROX + "population-h17-4.json"
        literal = {SUBJECT_NOW: sha(ROOT / SUBJECT_NOW), residual: sha(ROOT / residual), stopped: sha(ROOT / stopped), ENDPOINT: sha(ROOT / ENDPOINT), history: sha(ROOT / history), APPROX + "population-h21-4.npz": ARCHIVE, APPROX + "population-h17-4.npz": INCOMING}
        receipt_path = residual[len(".local-data/master-equation-closure/"):]
        pairs += [
            ("RECEIPT=BASE/'first-class-boundary/selected-check/selected-residual.json'", f"RECEIPT=BASE/'{receipt_path}'"),
            ("SUBJECT=Path('reference/priorities/master-equation-closure/analysis/smooth-two-particle-first-class-boundary-selected-certificate.py')", f"SUBJECT=Path('{SUBJECT_NOW}')"),
            ("'b8c445020bbfe88dc3cd138308410f7d056a81945692df0755e127866ca988'.replace('410f','41050f')", f"'{ARCHIVE}'"),
            ("def target():\n assert json.loads((HERE/'event-reference-known.json').read_text())['result']=='PASS';", f"LITERAL_INPUT_SHA256={json.dumps(literal, indent=1)}\ndef target():\n for _path,_expected in LITERAL_INPUT_SHA256.items():assert sha(_path)==_expected,_path\n assert json.loads((HERE/'event-reference-known.json').read_text())['result']=='PASS';"),
        ]
    adapted = first_line + "\n" + header + "\n" + substitute(rest, pairs)
    target = owner / "versioned-references" / f"{name[:-3]}-v2.py"
    write_new(target, adapted)
    (owner / "reference").mkdir(exist_ok=True)
    diff = "".join(difflib.unified_diff(text.splitlines(True), adapted.splitlines(True), f"preserved/{name}", f"versioned/{target.name}"))
    write_new(owner / "reference-build" / f"{name}.adaptation.diff", diff)
    write_new(owner / "reference-build" / f"{name}.build-receipt.json", json.dumps({"kind": kind, "preserved": rel(preserved), "preserved_sha256": sha(preserved), "versioned": rel(target), "versioned_sha256": sha(target), "substitutions": len(pairs), "construction": "execution adaptation of the preserved reference; arithmetic unchanged; routing changed and literal guards added; not independently authored", "driver_sha256": sha(__file__)}, indent=2) + "\n")


def step_history(owner):
    out = owner / "history"
    if out.exists():
        raise SystemExit("History output directory is already occupied")
    instrument = FROZEN / "history/endpoint-instrument.py"
    audit = CLOSURE / "through-five/history/audit-instrument.py"
    pulse = ".local-data/master-equation-closure/through-five/continuation/pulse.json"
    frozen_known = json.loads((FROZEN / "history/known.json").read_text())
    if sha(instrument) != frozen_known["instrument_sha256"] or sha(audit) != frozen_known["frozen_norm_instrument_sha256"]:
        raise SystemExit("Retained history instruments do not have their recorded identities")
    helper = relocation()
    helper.RECORDED["smooth-two-particle-later-residual.py"] = "19f28d344f2a0cf818b4c64e0dfb82567d40eba777cc7acfb753723fb0d59737"
    helper.relocated("smooth-two-particle-later-residual.py")
    helper.install()
    root_line = "ROOT=Path(__file__).resolve().parents[3]"
    audit_text = substitute(audit.read_text(), [(root_line, f"ROOT=Path({str(ROOT)!r})"), ("HERE=ROOT/'reference/priorities/master-equation-closure/analysis'", "HERE=ROOT/'reference/priorities/master-equation-closure/lattice-research/analysis'")])
    audit_module = types.ModuleType("frozen_history_audit")
    audit_module.__file__ = str(audit)
    exec(compile(audit_text, str(audit), "exec"), audit_module.__dict__)
    original = instrument.read_text()
    adapted = substitute(original, [
        (root_line, f"ROOT=Path({str(ROOT)!r})"),
        ("OLD=ROOT/'.tmp/mec-008-through-five/archive/audit.py'", f"OLD=ROOT/'{rel(audit)}'"),
        ("s=importlib.util.spec_from_file_location('frozen_history_audit',OLD);A=importlib.util.module_from_spec(s);s.loader.exec_module(A)", "A=RETAINED_AUDIT_MODULE"),
        ("OUT=ROOT/'.local-data/master-equation-closure/first-class-boundary/history'", f"OUT=ROOT/'{rel(out)}'"),
        ("PULSE=ROOT/'.tmp/mec-008-through-five/hale/pulse.json'", f"PULSE=ROOT/'{pulse}'"),
        ("REVIEW=ROOT/'reference/priorities/master-equation-closure/analysis/smooth-two-particle-through-five-independent-adjudication.md'", "REVIEW=ROOT/'reference/priorities/master-equation-closure/lattice-research/analysis/smooth-two-particle-through-five-independent-adjudication.md'"),
    ])
    namespace = {"__file__": str(instrument), "__name__": "serial_boundary_history_endpoint", "RETAINED_AUDIT_MODULE": audit_module}
    exec(compile(adapted, str(instrument), "exec"), namespace)
    if namespace["OUT"] != out or namespace["ROOT"] != ROOT:
        raise SystemExit("History routing did not take effect")
    namespace["known"]()
    control = json.loads((out / "known.json").read_text())
    if control["result"] != "PASS" or control["instrument_sha256"] != sha(instrument):
        raise SystemExit("History known controls did not pass")
    print(json.dumps({"history_known": "PASS", "controls": len(control["controls"])}), flush=True)
    namespace["target"]()
    for label, before, after in (("endpoint-instrument.py", original, adapted), ("audit-instrument.py", audit.read_text(), audit_text)):
        write_new(owner / "reference-build" / f"{label}.adaptation.diff", "".join(difflib.unified_diff(before.splitlines(True), after.splitlines(True), f"retained/{label}", f"executed/{label}")))
    write_new(out / "replay-receipt.json", json.dumps({"driver_sha256": sha(__file__), "instrument": {"path": rel(instrument), "sha256": sha(instrument)}, "nested_audit": {"path": rel(audit), "sha256": sha(audit)}, "pulse": {"path": pulse, "sha256": sha(ROOT / pulse)}, "loaded_analysis_modules": helper.LOG, "scratch_paths_used": []}, indent=2) + "\n")


def step_compare(owner):
    pairs = [
        ("selected residual", "selected-check/selected-residual.json", "selected-check/selected-residual.json", ["/source_sha256", "/known/source_sha256", "/seconds"]),
        ("selected known controls", "selected-check/known.json", "selected-check/known.json", ["/source_sha256"]),
        ("stationary-domain known", "independent/stationary-domain-known.json", "reference/stationary-domain-known.json", []),
        ("stationary-domain target", "independent/stationary-domain-target.json", "reference/stationary-domain-target.json", []),
        ("stopped-reference known", "independent/stopped-reference-known.json", "reference/stopped-reference-known.json", []),
        ("stopped-reference target", "independent/stopped-reference-target.json", "reference/stopped-reference-target.json", ["/inputs", "/instrument_sha256"]),
        ("event-reference known", "independent/event-reference-known.json", "reference/event-reference-known.json", []),
        ("event-reference target", "independent/event-reference-target.json", "reference/event-reference-target.json", ["/residual_sha256", "/subject_sha256", "/stopped_reference_sha256", "/instrument_sha256"]),
        ("history endpoint", "history/endpoint.json", "history/endpoint.json", ["/seconds", "/known/inherited/frozen_interval_sha256"]),
    ]
    report = {"driver_sha256": sha(__file__), "against_frozen": {}, "against_first_replay": {}}
    total = 0
    for label, frozen_rel, fresh_rel, declared in pairs:
        frozen, fresh = json.loads((FROZEN / frozen_rel).read_text()), json.loads((owner / fresh_rel).read_text())
        scientific, metadata = split(differences(fresh, frozen), declared)
        total += len(scientific)
        report["against_frozen"][label] = {"frozen_sha256": sha(FROZEN / frozen_rel), "fresh_sha256": sha(owner / fresh_rel), "declared_metadata": declared, "metadata_differences": metadata[:20], "scientific_differences": scientific[:40], "scientific_difference_count": len(scientific)}
        first = FIRST_RUN / fresh_rel
        if first.exists():
            s2, m2 = split(differences(fresh, json.loads(first.read_text())), declared)
            total += len(s2)
            report["against_first_replay"][label] = {"first_sha256": sha(first), "metadata_differences": m2[:20], "scientific_difference_count": len(s2)}
    residual = json.loads((owner / "selected-check/selected-residual.json").read_text())
    event = json.loads((owner / "reference/event-reference-target.json").read_text())
    left = F(5)
    for row in residual["residual_bins"]:
        assert F(row["from"]) == left and F(row["through"]) - left == F(1, 512)
        left = F(row["through"])
    report["headline"] = {"residual_cells": len(residual["residual_bins"]), "cells_cover": ["5", str(left)], "per_receiver_residual": residual["per_receiver_residual"], "generated_edges": len(residual["generated_edges"]), "source_points": len(residual["source_points"]), "max_emission": residual["max_emission"], "event_interval": event["event_interval"], "bracket_is_original": event["event_interval"] == ["5121/1024", "10339/2048"], "all_environmental_position_upper_at_5121_1024": event["all_environmental_position_upper_at_5121_1024"], "receiver_margins": [{k: r[k] for k in ("point", "vertical_position_lower_at_H", "continuous_vertical_velocity_lower", "continuous_vertical_acceleration_lower", "crossing_contradiction_by")} for r in event["receiver_results"]], "total_scientific_differences": total}
    write_new(owner / "compare.json", json.dumps(report, indent=2) + "\n")
    if total or not report["headline"]["bracket_is_original"] or len(residual["residual_bins"]) != 32:
        raise SystemExit("Comparison found a scientific difference or a different bracket")


# ---- commands --------------------------------------------------------------------

def listing(directory):
    return {rel(p): sha(p) for p in sorted(directory.rglob("*")) if p.is_file()}


def verify_receipts(owner):
    rows = [line.split(None, 1) for line in (owner / "receipts.sha256").read_text().splitlines() if line.strip()]
    bad = [name.strip() for value, name in rows if not (owner / name.strip()).is_file() or sha(owner / name.strip()) != value]
    return len(rows), bad


def verify(owner):
    owner = Path(owner).resolve()
    count, bad = verify_receipts(owner)
    frozen_manifest = manifest()
    bad_manifest = [name for name, value in frozen_manifest.items() if sha(FROZEN / "independent" / name) != value]
    bad_references = [name for name, value in FIRST_RUN_REFERENCES.items() if sha(EVIDENCE / name) != value]
    result = {"owner": rel(owner), "receipt_entries": count, "receipt_failures": bad, "frozen_manifest_entries": len(frozen_manifest), "frozen_manifest_failures": bad_manifest, "first_replay_versioned_reference_failures": bad_references, "result": "PASS" if not (bad or bad_manifest or bad_references) else "FAIL", "writes": "none"}
    print(json.dumps(result, indent=2))
    return result["result"] == "PASS"


def new(label):
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{2,60}", label):
        raise SystemExit("Run label must be lowercase letters, digits and hyphens")
    owner = REPLAYS / label
    controls = known_cases()
    print(json.dumps({"driver_known_cases": "PASS", "controls": len(controls)}), flush=True)
    if owner.exists():
        raise SystemExit(f"Run owner is already occupied; nothing was written: {rel(owner)}")
    frozen_before = listing(FROZEN)
    first_before = verify_receipts(FIRST_RUN)
    REPLAYS.mkdir(exist_ok=True)
    os.mkdir(owner)
    (owner / "logs").mkdir()
    begun = time.time()
    steps = []

    def run(name, command):
        start = time.time()
        done = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
        write_new(owner / "logs" / f"{len(steps):02d}-{name}.log", f"$ {' '.join(command)}\nexit {done.returncode}\n--- stdout\n{done.stdout}\n--- stderr\n{done.stderr}")
        steps.append({"step": name, "exit": done.returncode, "wall_seconds": round(time.time() - start, 3)})
        print(json.dumps({"heartbeat": name, "exit": done.returncode, "elapsed": round(time.time() - begun, 1)}), flush=True)
        if done.returncode:
            write_new(owner / "run.json", json.dumps({"result": "STOPPED", "failed_step": name, "steps": steps}, indent=2) + "\n")
            raise SystemExit(f"Stopped at {name}: {done.stderr[-400:]}")

    me = [sys.executable, __file__, "step", rel(owner)]
    run("residual-known", me + ["residual", "known"])
    run("residual-target", me + ["residual", "target"])
    for kind in ("stationary", "stopped", "event"):
        run(f"build-{kind}", me + ["build", kind])
        script = rel(owner / "versioned-references" / f"{REFERENCES[kind][:-3]}-v2.py")
        run(f"{kind}-known", [sys.executable, script, "known"])
        run(f"{kind}-target", [sys.executable, script, "target"])
    run("history", me + ["history"])
    run("compare", me + ["compare"])
    frozen_after = listing(FROZEN)
    first_after = verify_receipts(FIRST_RUN)
    references_ok = all(sha(EVIDENCE / name) == value for name, value in FIRST_RUN_REFERENCES.items())
    preserved = frozen_before == frozen_after and first_before == first_after and not first_after[1] and references_ok
    headline = json.loads((owner / "compare.json").read_text())["headline"]
    write_new(owner / "run.json", json.dumps({"result": "PASS" if preserved else "FAIL", "label": label, "driver_sha256": sha(__file__), "driver_known_cases": controls, "steps": steps, "wall_seconds": round(time.time() - begun, 3), "frozen_files": len(frozen_after), "frozen_unchanged": frozen_before == frozen_after, "first_replay_receipts": {"entries": first_after[0], "failures": first_after[1]}, "first_replay_versioned_references_unchanged": references_ok, "headline": headline, "command": [sys.executable, *sys.argv]}, indent=2) + "\n")
    lines = "".join(f"{sha(p)}  {p.relative_to(owner)}\n" for p in sorted(owner.rglob("*")) if p.is_file())
    write_new(owner / "receipts.sha256", lines)
    print(json.dumps({"result": "PASS" if preserved else "FAIL", "owner": rel(owner), "files": len(lines.splitlines()), "bracket": headline["event_interval"], "scientific_differences": headline["total_scientific_differences"], "frozen_unchanged": frozen_before == frozen_after, "first_replay_receipt_failures": first_after[1]}), flush=True)
    if not preserved:
        raise SystemExit(1)


args = sys.argv[1:]
if len(args) == 3 and args[:2] == ["new", "--run"]:
    new(args[2])
elif len(args) == 2 and args[0] == "verify":
    sys.exit(0 if verify(args[1]) else 1)
elif len(args) >= 3 and args[0] == "step":
    target_owner = (ROOT / args[1]).resolve()
    if REPLAYS.resolve() not in target_owner.parents:
        raise SystemExit("Steps write only inside a serial-boundary-replays owner")
    if args[2] == "residual" and len(args) == 4 and args[3] in ("known", "target"):
        step_residual(target_owner, args[3])
    elif args[2] == "build" and len(args) == 4 and args[3] in REFERENCES:
        step_build(target_owner, args[3])
    elif args[2] == "history" and len(args) == 3:
        step_history(target_owner)
    elif args[2] == "compare" and len(args) == 3:
        step_compare(target_owner)
    else:
        raise SystemExit("Unknown step")
else:
    raise SystemExit("Use: new --run <label> | verify <owner-directory>")
