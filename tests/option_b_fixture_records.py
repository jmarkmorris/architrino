"""Read authored test expectations; never derive them from their subjects.

These are test data dependencies, not production source admission or scientific
acceptance. Callers capture returned strings/tuples before running controls.
"""
import json
import re
import subprocess
from pathlib import Path


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate fixture key: {key}")
        result[key] = value
    return result


def _read(raw, schema):
    record = json.loads(raw, object_pairs_hook=_unique_object)
    if not isinstance(record, dict) or record.get("schema") != schema:
        raise ValueError("Wrong fixture schema")
    if record.get("algorithm") != "SHA-256":
        raise ValueError("Wrong fixture algorithm")
    return record


def _digest(value):
    if not isinstance(value, str) or re.fullmatch(r"[a-f0-9]{64}", value) is None:
        raise ValueError("Malformed fixture digest")
    return value


def capture_known_sha256(raw):
    record = _read(raw, "known-hash-answers/v1")
    if (record.get("role") != "independent-known-answer-control"
            or record.get("inputEncoding") != "UTF-8"
            or record.get("outputEncoding") != "lowercase hexadecimal"):
        raise ValueError("Wrong known-answer role or encoding")
    if not isinstance(record.get("sha256"), dict) or set(record["sha256"]) != {"abc"}:
        raise ValueError("Wrong known-answer census")
    return _digest(record["sha256"]["abc"])


def capture_acceleration_prior(raw):
    record = _read(raw, "option-b-python-transport-identities/v1")
    if (record.get("encoding") != "lowercase hexadecimal"
            or record.get("role") != "fixed-historical-prior-and-rejection-control"):
        raise ValueError("Wrong prior fixture role or encoding")
    names = ("originalVerifier", "originalDeclaration", "rejectedCurrentVerifier")
    hashes = record.get("hashes")
    if not isinstance(hashes, dict) or set(hashes) != set(names):
        raise ValueError("Wrong prior fixture census")
    return tuple(_digest(hashes[name]) for name in names)


_SELECTION_PATH = "reference/priorities/development-process-review/contracts/option-b-controlled-fixture-selection.json"
_SELECTION = None

def _admitted_bytes(root, consumer, payload):
    global _SELECTION
    if _SELECTION is None:
        _SELECTION = json.loads((Path(__file__).resolve().parents[1] / _SELECTION_PATH).read_text(encoding="utf-8"), object_pairs_hook=_unique_object)
    request = dict(root=str(root.resolve()), selection=_SELECTION, consumer=consumer, payload=payload)
    result = subprocess.run(["node", str(root / "scripts/equation-mapping/controlled-fixture-records.mjs")],
                            input=json.dumps(request), text=True, encoding="utf-8", capture_output=True, timeout=30, check=False)
    if result.returncode != 0:
        raise ValueError("Fixture graph admission rejected: " + result.stderr)
    return result.stdout

def known_sha256(root, consumer):
    return capture_known_sha256(_admitted_bytes(root, consumer, "scripts/equation-mapping/fixtures/known-hash-answers.json"))

def acceleration_prior(root, consumer):
    return capture_acceleration_prior(_admitted_bytes(root, consumer, "tests/fixtures/option-b-python-transport-identities.json"))
