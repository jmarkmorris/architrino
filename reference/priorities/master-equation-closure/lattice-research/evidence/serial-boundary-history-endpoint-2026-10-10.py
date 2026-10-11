"""Replay the history endpoint audit that supplies the accepted endpoint errors.

The preserved instrument at .tmp/mec-008-first-class-boundary/archive/endpoint.py
is authenticated against its retained copy and the SHA-256 its own known receipt
records. Its text is executed with exactly two statements replaced, each
required to occur once, and one directory attribute of the nested frozen audit
repointed after authentication (see the comment where it is set): the output directory, pointed at this replay's fresh
owner, and the path of the independent adjudication document it hash-checks,
which has moved one directory deeper. The literal SHA-256 the instrument asserts
for that document is unchanged, so the moved document must have the same bytes.
Its known controls run first; the fresh endpoint receipt is then compared with
the frozen one, a timer being the only declared difference. Run from the
repository root with the shared project venv.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import signal
import sys

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
SOURCE = ROOT / ".tmp/mec-008-first-class-boundary/archive/endpoint.py"
RETAINED = ROOT / ".local-data/master-equation-closure/first-class-boundary/history/endpoint-instrument.py"
FROZEN = ROOT / ".local-data/master-equation-closure/first-class-boundary/history"
OUT = ROOT / ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/history"
EXPECTED = "509ce04bf0805afe45b74327f4a42171e6f1db3abb6e4dbcb875d54561b49f65"
OUT_LINE = "OUT=ROOT/'.local-data/master-equation-closure/first-class-boundary/history'"
REVIEW_LINE = "REVIEW=ROOT/'reference/priorities/master-equation-closure/analysis/smooth-two-particle-through-five-independent-adjudication.md'"
REVIEW_NOW = "REVIEW=ROOT/'reference/priorities/master-equation-closure/lattice-research/analysis/smooth-two-particle-through-five-independent-adjudication.md'"


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


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


# Known cases for the comparison, before any target use.
assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5}]}) == []
assert differences({"a": [1, {"b": 2.5}]}, {"a": [1, {"b": 2.5000000000000004}]}) == ["/a/1/b"]
assert differences({"a": 1}, {"a": 1, "c": 2}) == ["/c"]

raw = SOURCE.read_bytes()
if digest(SOURCE) != EXPECTED or raw != RETAINED.read_bytes() or json.loads((FROZEN / "known.json").read_text())["instrument_sha256"] != EXPECTED:
    raise SystemExit("History endpoint instrument differs from its retained copy or recorded identity")
text = raw.decode("utf-8")
for old in (OUT_LINE, REVIEW_LINE):
    if text.count(old) != 1:
        raise SystemExit(f"Substitution target does not occur exactly once: {old[:60]}")
adapted = text.replace(OUT_LINE, f"OUT=Path({str(OUT)!r})").replace(REVIEW_LINE, REVIEW_NOW)

spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
RELOCATION = importlib.util.module_from_spec(spec)
spec.loader.exec_module(RELOCATION)
RELOCATION.install()


def timeout(signum, frame):
    raise TimeoutError("History endpoint replay exceeded 180 seconds")


signal.signal(signal.SIGALRM, timeout)
signal.alarm(180)
try:
    namespace = {"__file__": str(SOURCE), "__name__": "serial_boundary_history_endpoint"}
    exec(compile(adapted, str(SOURCE), "exec"), namespace)
    if namespace["OUT"] != OUT:
        raise SystemExit("Output redirection did not take effect")
    # The frozen through-five audit records the hash of the interval module by its
    # pre-move directory. Authenticate the moved module, then point that one
    # directory attribute at the moved location. Its recorded hash in the nested
    # known receipt therefore names the moved file's bytes.
    audit = namespace["A"]
    if audit.HERE != RELOCATION.OLD:
        raise SystemExit("Frozen audit analysis directory is not as recorded")
    RELOCATION.RECORDED.setdefault("smooth-two-particle-later-residual.py", "19f28d344f2a0cf818b4c64e0dfb82567d40eba777cc7acfb753723fb0d59737")
    RELOCATION.relocated("smooth-two-particle-later-residual.py")
    audit.HERE = RELOCATION.NEW
    OUT.mkdir(parents=True, exist_ok=True)
    namespace["known"]()
    control = json.loads((OUT / "known.json").read_text())
    if control["result"] != "PASS" or control["instrument_sha256"] != EXPECTED:
        raise RuntimeError("Fresh known controls did not return PASS for the authenticated instrument")
    print(json.dumps({"known": "PASS", "controls": len(control["controls"])}), flush=True)
    namespace["target"]()
finally:
    signal.alarm(0)

fresh = json.loads((OUT / "endpoint.json").read_text())
frozen = json.loads((FROZEN / "endpoint.json").read_text())
found = differences(fresh, frozen)
# The second field is the identity the nested audit records for the interval module.
# Its frozen value is the pre-move hash and its fresh value the moved file's hash;
# the relocation helper has already proved those two files differ in one root-index
# line. The first run of this driver had not declared it and counted it as
# scientific; that receipt is retained as retention/history-first-run-receipt.json.
declared = ["/seconds", "/known/inherited/frozen_interval_sha256"]
scientific = [p for p in found if p not in declared]
receipt = {
    "wrapper_sha256": digest(__file__),
    "instrument": {"path": str(SOURCE.relative_to(ROOT)), "sha256": EXPECTED},
    "execution_adaptations": ["OUT redirected to this owner", "frozen through-five audit analysis directory pointed at the moved location after one-line root-index authentication of the interval module", "adjudication document read from its moved location; the instrument's own literal SHA-256 assertion for it is unchanged and passed"],
    "loaded_analysis_modules": RELOCATION.LOG,
    "known": control["controls"],
    "frozen_sha256": digest(FROZEN / "endpoint.json"),
    "fresh_sha256": digest(OUT / "endpoint.json"),
    "declared_metadata": declared,
    "metadata_differences": [p for p in found if p in declared],
    "scientific_differences": scientific[:40],
    "scientific_difference_count": len(scientific),
    "rows": [len(fresh["all_endpoint_rows"]), len(frozen["all_endpoint_rows"])],
}
(OUT / "reproduction-receipt.json").write_text(json.dumps(receipt, indent=2) + "\n")
print(json.dumps({k: receipt[k] for k in ("scientific_difference_count", "metadata_differences", "rows", "fresh_sha256", "frozen_sha256")}), flush=True)
