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
    subprocess.run([
        "node", "scripts/dev/materialize-source-replay.mjs", "--manifest",
        manifest,
        "--out", str(root),
    ], cwd=_ROOT, check=True, capture_output=True, text=True, timeout=30)
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
