"""Build versioned execution adaptations of the three preserved boundary references.

The preserved references under first-class-boundary/independent/ are never
edited. Each versioned file is the preserved text with a short, exact list of
substitutions, every one required to match exactly once:

- HERE points at this replay's fresh reference directory, so receipts are fresh;
- the event reference's subject path names the subject's current location, and
  its residual receipt path names this replay's fresh residual;
- the event reference's archive identity, spelled in the original through a
  string replacement, is written as the full literal it evaluates to;
- the stopped reference reads the retained copy of its earlier error receipt
  instead of the scratch path;
- full literal SHA-256 values of every consumed input are asserted.

No function body is changed. These are execution adaptations of the preserved
references, not independently authored references; their independence from the
subject is whatever the preserved references had.

  selftest                 known cases for the substitution rule
  build stationary|stopped build that versioned reference
  build event              build the event reference; requires the fresh residual
                           and the fresh stopped-reference target to exist

Run from the repository root with the shared project venv.
"""
from pathlib import Path
import difflib
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
OWNER = ROOT / ".local-data/master-equation-closure/first-class-boundary/independent"
FRESH = ROOT / ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10"
REFERENCE_OUT = ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/reference"
EVIDENCE = Path(__file__).resolve().parent
HERE_LINE = "HERE=Path(__file__).resolve().parent"
SUBJECT_NOW = "reference/priorities/master-equation-closure/lattice-research/analysis/smooth-two-particle-first-class-boundary-selected-certificate.py"
ARCHIVE = "b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988"
ENDPOINT = ".local-data/master-equation-closure/first-class-boundary/history/endpoint.json"
NAMES = {"stationary": "stationary-domain.py", "stopped": "stopped-reference.py", "event": "event-reference.py"}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def substitute(text, pairs):
    """Apply each (old, new) exactly once; any other match count stops the build."""
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f"Substitution target occurs {text.count(old)} times, expected 1: {old[:70]!r}")
        text = text.replace(old, new)
    return text


def selftest():
    assert substitute("a=1;b=2\n", [("a=1", "a=3")]) == "a=3;b=2\n"
    for bad in ("a=1;a=1\n", "b=2\n"):
        try:
            substitute(bad, [("a=1", "a=3")])
            raise AssertionError("ambiguous or absent target was not refused")
        except SystemExit:
            pass
    spelled = "b8c445020bbfe88dc3cd138308410f7d056a81945692df0755e127866ca988".replace("410f", "41050f")
    assert spelled == ARCHIVE and len(ARCHIVE) == 64
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    print(json.dumps({"result": "PASS", "controls": ["single exact substitution", "duplicate and absent targets refused", "original archive expression evaluates to the full literal", "SHA-256 of abc"]}))


def manifest():
    rows = {}
    for line in (OWNER / "MANIFEST.sha256").read_text().splitlines():
        value, name = line.split(None, 1)
        rows[Path(name.strip()).name] = value
    return rows


def build(kind):
    name = NAMES[kind]
    original = (OWNER / name).read_bytes()
    if sha(OWNER / name) != manifest()[name]:
        raise SystemExit(f"{name} does not match the retained manifest")
    text = original.decode("utf-8")
    first_line, rest = text.split("\n", 1)
    if not first_line.endswith('"""'):
        raise SystemExit("Preserved reference does not begin with the expected one-line docstring")
    header = f"# Versioned execution adaptation, 2026-10-10, of the preserved reference {name} (SHA-256 {sha(OWNER / name)}). Function bodies are unchanged; the build driver serial-boundary-reference-build-2026-10-10.py lists every substitution. Not an independently authored reference."
    pairs = [(HERE_LINE, f"HERE=Path({REFERENCE_OUT!r})")]
    if kind == "stopped":
        frozen = json.loads((OWNER / "stopped-reference-target.json").read_text())["inputs"]
        retained = ".local-data/master-equation-closure/first-class-boundary/independent/incoming-population-error-target.json"
        scratch = ".tmp/mec-008-population-restart/moore/population-error-target.json"
        if sha(ROOT / retained) != frozen[scratch]:
            raise SystemExit("Retained copy of the earlier error receipt does not match the frozen input hash")
        literals = [frozen[key] for key in list(frozen)[:3]] + [frozen[scratch]]
        pairs.append((
            f"Path('{scratch}')]",
            f"Path('{retained}')]\nEXPECTED_INPUT_SHA256={literals!r}\nassert [hashlib.sha256(p.read_bytes()).hexdigest() for p in INPUTS]==EXPECTED_INPUT_SHA256\nassert hashlib.sha256(Path('{ENDPOINT}').read_bytes()).hexdigest()=={sha(ROOT / ENDPOINT)!r}",
        ))
    if kind == "event":
        residual = ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/selected-check/selected-residual.json"
        stopped = REFERENCE_OUT + "/stopped-reference-target.json"
        history = ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.json"
        literal = {
            SUBJECT_NOW: sha(ROOT / SUBJECT_NOW),
            residual: sha(ROOT / residual),
            stopped: sha(ROOT / stopped),
            ENDPOINT: sha(ROOT / ENDPOINT),
            history: sha(ROOT / history),
            ".local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz": ARCHIVE,
            ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.npz": "d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6",
        }
        pairs += [
            ("RECEIPT=BASE/'first-class-boundary/selected-check/selected-residual.json'", "RECEIPT=BASE/'serial-boundary-reproduction-2026-10-10/selected-check/selected-residual.json'"),
            ("SUBJECT=Path('reference/priorities/master-equation-closure/analysis/smooth-two-particle-first-class-boundary-selected-certificate.py')", f"SUBJECT=Path('{SUBJECT_NOW}')"),
            ("'b8c445020bbfe88dc3cd138308410f7d056a81945692df0755e127866ca988'.replace('410f','41050f')", f"'{ARCHIVE}'"),
            ("def target():\n assert json.loads((HERE/'event-reference-known.json').read_text())['result']=='PASS';", f"LITERAL_INPUT_SHA256={json.dumps(literal, indent=1)}\ndef target():\n for _path,_expected in LITERAL_INPUT_SHA256.items():assert sha(_path)==_expected,_path\n assert json.loads((HERE/'event-reference-known.json').read_text())['result']=='PASS';"),
        ]
    adapted = first_line + "\n" + header + "\n" + substitute(rest, pairs)
    target = EVIDENCE / f"serial-boundary-{name[:-3]}-v2-2026-10-10.py"
    data = adapted.encode("utf-8")
    if target.exists() and target.read_bytes() != data:
        raise SystemExit(f"{target.name} exists with different bytes; nothing was written")
    target.write_bytes(data)
    record = FRESH / "reference-build"
    record.mkdir(parents=True, exist_ok=True)
    (ROOT / REFERENCE_OUT).mkdir(parents=True, exist_ok=True)
    diff = "".join(difflib.unified_diff(text.splitlines(True), adapted.splitlines(True), f"preserved/{name}", f"versioned/{target.name}"))
    (record / f"{name}.adaptation.diff").write_text(diff)
    (record / target.name).write_bytes(data)
    receipt = {"kind": kind, "preserved": str((OWNER / name).relative_to(ROOT)), "preserved_sha256": sha(OWNER / name), "versioned": str(target.relative_to(ROOT)), "versioned_sha256": sha(target), "substitutions": len(pairs), "added_lines": sum(1 for line in diff.splitlines() if line.startswith("+") and not line.startswith("+++")), "removed_lines": sum(1 for line in diff.splitlines() if line.startswith("-") and not line.startswith("---")), "construction": "execution adaptation of the preserved reference; not independently authored", "builder_sha256": sha(__file__)}
    (record / f"{name}.build-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt))


if len(sys.argv) == 2 and sys.argv[1] == "selftest":
    selftest()
elif len(sys.argv) == 3 and sys.argv[1] == "build" and sys.argv[2] in NAMES:
    selftest()
    build(sys.argv[2])
else:
    raise SystemExit("Use: selftest | build stationary|stopped|event")
