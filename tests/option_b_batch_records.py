"""Capture selected, graph-admitted original test identities before controls run."""
import json
from pathlib import Path
import re
import stat
import subprocess

_SELECTION_PATH = "reference/priorities/development-process-review/contracts/option-b-batch-test-selection.json"
_SELECTION = None
_PAIR_IDENTITIES = None


def _file_identity(root, relative):
    """Observe canonical regular files without interpreting their bytes as authority."""
    if (not isinstance(relative, str) or not relative or "\\" in relative
            or Path(relative).is_absolute()
            or any(part in {"", ".", ".."} for part in relative.split("/"))):
        raise ValueError("Unsafe batch source path")
    current = root
    for part in relative.split("/"):
        current = current / part
        observed = current.lstat()
        if stat.S_ISLNK(observed.st_mode):
            raise ValueError("Symlink in batch source path: " + relative)
    if not stat.S_ISREG(observed.st_mode) or current.resolve() != current:
        raise ValueError("Noncanonical regular batch source required: " + relative)
    return (observed.st_dev, observed.st_ino, observed.st_size,
            observed.st_mtime_ns, observed.st_ctime_ns)


def _check_identities(root, identities):
    for relative, initial in identities.items():
        if _file_identity(root, relative) != initial:
            raise ValueError("Retained batch source identity changed: " + relative)


def _inventory_identities(root, selection):
    """Inventory only; the Node admission still authenticates every selected value."""
    identities = {}

    def capture(relative, parse=False):
        identity = _file_identity(root, relative)
        if relative in identities and identities[relative] != identity:
            raise ValueError("Batch source changed during inventory: " + relative)
        identities[relative] = identity
        if parse:
            return json.loads((root / relative).read_text(encoding="utf-8"),
                              object_pairs_hook=_unique_object)

    capture(_SELECTION_PATH)
    accepted = capture(selection["acceptedBaseline"], parse=True)
    capture(selection["transition"])
    capture(accepted["historicalProof"]["path"])
    for profile in accepted["profiles"]:
        manifest = capture(profile["manifestPath"], parse=True)
        for source in manifest["@graph"]:
            if source.get("@type") == "Source":
                capture(source["binding"]["path"])
    _check_identities(root, identities)
    return identities


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("Duplicate batch record key: " + key)
        result[key] = value
    return result


def _request(consumer_file, **fields):
    global _SELECTION, _PAIR_IDENTITIES
    root = Path(__file__).resolve().parents[1]
    consumer = Path(consumer_file).resolve().relative_to(root).as_posix()
    if _SELECTION is None:
        _SELECTION = json.loads((root / _SELECTION_PATH).read_text(encoding="utf-8"),
                               object_pairs_hook=_unique_object)
        if not isinstance(_SELECTION, dict):
            raise ValueError("Batch selection must be an object")
    if "originalSource" in fields and _PAIR_IDENTITIES is None:
        _PAIR_IDENTITIES = _inventory_identities(root, _SELECTION)
    if _PAIR_IDENTITIES is not None:
        _check_identities(root, _PAIR_IDENTITIES)
    result = subprocess.run(
        ["node", str(root / "scripts/equation-mapping/batch-test-records.mjs")],
        input=json.dumps(dict(root=str(root), selection=_SELECTION, consumer=consumer, **fields)),
        text=True, encoding="utf-8", capture_output=True, timeout=30, check=False)
    if result.returncode != 0:
        raise ValueError("Batch record admission rejected: " + result.stderr)
    if _PAIR_IDENTITIES is not None:
        _check_identities(root, _PAIR_IDENTITIES)
    return result.stdout


def batch_identities(consumer_file):
    """Return an immutable capture; source hashes are never recomputed as answers."""
    values = json.loads(_request(consumer_file), object_pairs_hook=_unique_object)
    if (not isinstance(values, list) or not values
            or any(not isinstance(value, str) or re.fullmatch(r"[a-f0-9]{64}", value) is None
                   for value in values)):
        raise ValueError("Malformed batch identity capture")
    return tuple(values)


def batch_test_sources(root, consumer, target):
    """Capture independently admitted current and preserved original UTF-8 sources."""
    root = Path(root).resolve()
    if root != Path(__file__).resolve().parents[1]:
        raise ValueError("Historical test source root differs from selected checkout")
    relative = str(target)
    _file_identity(root, relative)
    record = json.loads(_request(root / consumer, originalSource=relative),
                        object_pairs_hook=_unique_object)
    if (not isinstance(record, dict) or set(record) != {"original", "current"}
            or any(not isinstance(value, str) for value in record.values())):
        raise ValueError("Malformed original/current source capture")
    return record["original"].encode("utf-8"), record["current"].encode("utf-8")


def original_test_source(root, consumer, target):
    """Authenticate current target admission and return its exact original bytes."""
    return batch_test_sources(root, consumer, target)[0]
