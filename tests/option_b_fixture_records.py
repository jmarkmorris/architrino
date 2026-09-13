"""Read authored test expectations; never derive them from their subjects.

These are test data dependencies, not production source admission or scientific
acceptance. Callers capture returned strings/tuples before running controls.
"""
import json
import re


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate fixture key: {key}")
        result[key] = value
    return result


def _read(path, schema):
    record = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=_unique_object)
    if not isinstance(record, dict) or record.get("schema") != schema:
        raise ValueError("Wrong fixture schema")
    if record.get("algorithm") != "SHA-256":
        raise ValueError("Wrong fixture algorithm")
    return record


def _digest(value):
    if not isinstance(value, str) or re.fullmatch(r"[a-f0-9]{64}", value) is None:
        raise ValueError("Malformed fixture digest")
    return value


def known_sha256(root):
    record = _read(root / "scripts/equation-mapping/fixtures/known-hash-answers.json", "known-hash-answers/v1")
    if (record.get("role") != "independent-known-answer-control"
            or record.get("inputEncoding") != "UTF-8"
            or record.get("outputEncoding") != "lowercase hexadecimal"):
        raise ValueError("Wrong known-answer role or encoding")
    if not isinstance(record.get("sha256"), dict) or set(record["sha256"]) != {"abc"}:
        raise ValueError("Wrong known-answer census")
    return _digest(record["sha256"]["abc"])


def acceleration_prior(root):
    record = _read(root / "tests/fixtures/option-b-python-transport-identities.json", "option-b-python-transport-identities/v1")
    if (record.get("encoding") != "lowercase hexadecimal"
            or record.get("role") != "fixed-historical-prior-and-rejection-control"):
        raise ValueError("Wrong prior fixture role or encoding")
    names = ("originalVerifier", "originalDeclaration", "rejectedCurrentVerifier")
    hashes = record.get("hashes")
    if not isinstance(hashes, dict) or set(hashes) != set(names):
        raise ValueError("Wrong prior fixture census")
    return tuple(_digest(hashes[name]) for name in names)
