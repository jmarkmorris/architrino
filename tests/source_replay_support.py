"""Load unchanged proof modules beside their exact historical inputs."""
import atexit
import importlib.util
from pathlib import Path
import subprocess
import sys
import tempfile

_ROOT = Path(__file__).resolve().parents[1]
_REPLAYS = []


def create_source_replay(manifest):
    scratch = _ROOT / ".tmp"
    scratch.mkdir(exist_ok=True)
    temporary = tempfile.TemporaryDirectory(prefix="source-replay-", dir=scratch)
    _REPLAYS.append(temporary)
    atexit.register(temporary.cleanup)
    root = Path(temporary.name) / "root"
    input_root = _ROOT
    if manifest == "reference/priorities/braid-program/evidence/source-replay/f5-source-replay.v1.json":
        import hashlib
        import json
        import option_b_production_records as production_records
        input_root = Path(temporary.name) / "inputs"
        input_root.mkdir()
        document = json.loads((_ROOT / manifest).read_text())
        for row in document["files"]:
            relative = row["source"]
            original = production_records.production_original_source_binding(
                _ROOT, production_records.__file__, relative, row["sha256"], optional=True)
            raw = (Path(original["path"]) if original else _ROOT / relative).read_bytes()
            production_records.production_recheck()
            if hashlib.sha256(raw).hexdigest() != row["sha256"]:
                raise ValueError("Original F5 replay source differs: " + relative)
            target = input_root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(raw)
    subprocess.run([
        "node", str(_ROOT / "scripts/dev/materialize-source-replay.mjs"), "--manifest",
        str(_ROOT / manifest),
        "--out", str(root),
    ], cwd=input_root, check=True, capture_output=True, text=True, timeout=30)
    return root


def load_f5_replay_module(name, relative):
    root = create_source_replay(
        "reference/priorities/braid-program/evidence/source-replay/f5-source-replay.v1.json"
    )
    spec = importlib.util.spec_from_file_location(name, root / relative)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module, root
