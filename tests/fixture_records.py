"""Read authored test expectations; never derive them from their subjects.

These are test data dependencies, not production source admission or scientific
acceptance. Callers capture returned strings/tuples before running controls.
"""
import json
import re
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


def known_sha256(root):
    return 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'


def acceleration_prior(root):
    # Historical artifact declaration and deliberate rejection values used by transport tests.
    return ('19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132', '7c2a8b0bb06f46da158e0dfe2cb313dd72e2edff3c411e87c1588aa6d028f9e4', '3221c44ed626f0902cc1c6e4d439fc87669bc6fa9ec1397d111b2d1fc69bbfc7')
