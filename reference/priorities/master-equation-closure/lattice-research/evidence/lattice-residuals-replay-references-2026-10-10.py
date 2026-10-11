"""Re-run the separately authored MOORE references into one fresh directory.

Each reference is authenticated against the independent owner's MANIFEST.sha256
and its retained byte copy. Its text is executed with exactly one statement
replaced: the unique `HERE=Path(__file__).resolve().parent` becomes the fresh
directory, so every receipt it reads or writes through HERE is fresh. The
references are run in dependency order, known before target, each mode in its
own interpreter. Explicit paths to subjects and frozen inputs are unchanged, so
references that read a subject output read the preserved historical one.

`all` runs the sequence and writes summary.json comparing each fresh target
receipt with the retained original, field by field. `one <name> <mode>` runs a
single reference mode. Run from the repository root with the shared venv.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import subprocess
import sys
import time

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[5]
if Path.cwd().resolve() != ROOT:
    raise SystemExit("Run from the Architrino repository root")
OWNER = ROOT / ".local-data/master-equation-closure/next-event/independent"
SCRATCH = ROOT / ".tmp/mec-008-next-event/moore"
OUT = ROOT / ".local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/independent"
HERE_LINE = "HERE=Path(__file__).resolve().parent"
# (script, receipt stem) in dependency order.
SEQUENCE = [
    ("stationary-coefficients.py", "stationary-coefficients"),
    ("cubic-shell-reference.py", "cubic-shell"),
    ("stationary-error.py", "stationary-error"),
    ("stationary-error-cubic256.py", "stationary-error-cubic256"),
    ("stationary-full-coefficients.py", "stationary-full-coefficients"),
    ("stationary-full-tail.py", "stationary-full-tail"),
    ("jacobian-reference.py", "jacobian-reference"),
    ("residual-row-reference.py", "residual-row"),
    ("residual-constants-reference.py", "residual-constants"),
    ("regularity-reference.py", "regularity"),
    ("coverage-reference.py", "coverage"),
    ("early-profile-reference.py", "early-profile"),
    ("prefix-residual-coverage.py", "prefix-residual"),
    ("prefix-residual-early.py", "prefix-residual-early"),
    ("prefix-arithmetic4-reference.py", "prefix-arithmetic4"),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def manifest():
    rows = {}
    for line in (OWNER / "MANIFEST.sha256").read_text().splitlines():
        digest, name = line.split(None, 1)
        rows[name.strip()] = digest
    return rows


def differences(a, b, path=""):
    """Return paths at which two JSON values differ."""
    if isinstance(a, dict) and isinstance(b, dict):
        out = []
        for key in sorted(set(a) | set(b)):
            if key not in a or key not in b:
                out.append(f"{path}/{key}")
            else:
                out += differences(a[key], b[key], f"{path}/{key}")
        return out
    if isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        out = []
        for index, (x, y) in enumerate(zip(a, b)):
            out += differences(x, y, f"{path}/{index}")
        return out
    return [] if a == b else [path or "/"]


def one(script, mode):
    raw = (SCRATCH / script).read_bytes()
    if sha(raw) != manifest()[script] or raw != (OWNER / script).read_bytes():
        raise SystemExit(f"{script} differs from its accepted byte-exact snapshot")
    text = raw.decode("utf-8")
    if text.count(HERE_LINE) != 1:
        raise SystemExit(f"{script}: HERE assignment is not the expected unique statement")
    spec = importlib.util.spec_from_file_location("replay_relocation", Path(__file__).with_name("lattice-residuals-replay-relocation-2026-10-10.py"))
    relocation = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(relocation)
    relocation.install()
    OUT.mkdir(parents=True, exist_ok=True)
    sys.argv = [str(SCRATCH / script), mode]
    namespace = {"__file__": str(SCRATCH / script), "__name__": "replay_reference"}
    exec(compile(text.replace(HERE_LINE, f"HERE=Path({str(OUT)!r})"), str(SCRATCH / script), "exec"), namespace)
    if namespace["HERE"] != OUT:
        raise SystemExit("Redirection did not take effect")
    (OUT / f"{script}.{mode}.relocation.json").write_text(json.dumps(relocation.LOG, indent=2) + "\n")


def everything():
    # Known cases for the in-session comparison instrument, before any target use.
    assert differences({"a": [1, {"b": 2}]}, {"a": [1, {"b": 2}]}) == []
    assert differences({"a": [1, {"b": 2}], "t": 1}, {"a": [1, {"b": 3}], "t": 1}) == ["/a/1/b"]
    assert differences({"a": 1}, {"a": 1, "c": 0}) == ["/c"]
    rows = []
    for script, stem in SEQUENCE:
        row = {"script": script, "sha256": manifest()[script]}
        for mode in ("known", "target"):
            start = time.time()
            done = subprocess.run([sys.executable, __file__, "one", script, mode], cwd=ROOT, capture_output=True, text=True)
            row[mode] = {"exit": done.returncode, "wall_seconds": round(time.time() - start, 3), "stderr_tail": done.stderr[-600:]}
            receipt = OUT / f"{stem}-{mode}.json"
            if done.returncode == 0 and receipt.exists():
                fresh = json.loads(receipt.read_text())
                original = json.loads((OWNER / receipt.name).read_text())
                row[mode]["result"] = fresh.get("result")
                row[mode]["differs_from_retained_original_at"] = differences(fresh, original)[:40]
                row[mode]["fresh_sha256"] = sha(receipt.read_bytes())
                row[mode]["retained_sha256"] = sha((OWNER / receipt.name).read_bytes())
            if mode == "known" and (done.returncode != 0 or row[mode].get("result") != "PASS"):
                row["target"] = {"skipped": "known control did not pass"}
                break
        rows.append(row)
        (OUT / "summary.json").write_text(json.dumps({"wrapper_sha256": sha(Path(__file__).read_bytes()), "rows": rows}, indent=2) + "\n")
        print(json.dumps({"script": script, "known": row["known"].get("result"), "target_exit": row["target"].get("exit"), "seconds": row["target"].get("wall_seconds")}), flush=True)


if len(sys.argv) == 2 and sys.argv[1] == "all":
    everything()
elif len(sys.argv) == 4 and sys.argv[1] == "one" and sys.argv[3] in ("known", "target"):
    one(sys.argv[2], sys.argv[3])
else:
    raise SystemExit("Use: all | one <script> <known|target>")
