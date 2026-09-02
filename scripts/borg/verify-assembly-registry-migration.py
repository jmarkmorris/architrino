#!/usr/bin/env python3
"""Independent BORG-014 seed-migration verifier.

This program deliberately does not import the production JavaScript canonicalizer,
registry builder, worldline operators, record emitter, expected hashes, or facets.
It reconstructs the normative scientific projection directly from each source v3
specification, serializes it with ECMAScript-compatible JSON number spelling, and
checks the registry plus sealed record bytes.
"""
from __future__ import annotations

import hashlib
import json
import math
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
REGISTRY = ROOT / "reference/priorities/app-borg/assembly-registry.v1.json"

PRESENTATION = {
    "alias", "aliases", "candidateId", "canonSource", "date", "description",
    "display", "displayLabel", "familyId", "familyLabel", "geometryOwner",
    "label", "memberId", "memberLabel", "owner", "presentationNote",
    "provenanceDescription", "recordUrl", "status", "taxonomy", "title",
}
RELATION_COLLECTIONS = (
    "neutralPairs", "pairings", "componentBraids", "polaritySectors",
    "symmetryOrbits", "accessorySets", "equivalences", "permutations",
)


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def collect_geometry_ids(value, identifiers: dict[str, str], prefix: str) -> None:
    if isinstance(value, list):
        for index, entry in enumerate(value):
            collect_geometry_ids(entry, identifiers, f"{prefix}-{index}")
    elif isinstance(value, dict):
        for key, entry in value.items():
            if isinstance(entry, str) and (key == "id" or key.endswith("Id")) and entry not in identifiers:
                identifiers[entry] = f"{prefix}-{key}"
            collect_geometry_ids(entry, identifiers, f"{prefix}-{key}")


def normalize(value, identifiers: dict[str, str]):
    if isinstance(value, list):
        return [normalize(entry, identifiers) for entry in value]
    if not isinstance(value, dict):
        return identifiers.get(value, value) if isinstance(value, str) else value
    result = {}
    for key, entry in value.items():
        if key in PRESENTATION or key == "compatibility" or entry is None:
            continue
        result[identifiers.get(key, key)] = normalize(entry, identifiers)
    return {key: result[key] for key in sorted(result)}


def scientific_projection(spec: dict) -> dict:
    source_order = spec["relationships"]["sourceOrder"]
    constituents = {row["id"]: row for row in spec["constituents"]}
    worldlines = {row["id"]: row for row in spec["worldlines"]}
    identifiers = {member_id: f"member-{index}" for index, member_id in enumerate(source_order)}
    for index, member_id in enumerate(source_order):
        identifiers[constituents[member_id]["worldlineId"]] = f"worldline-{index}"
    for collection in RELATION_COLLECTIONS:
        for index, row in enumerate(spec["relationships"].get(collection, [])):
            if isinstance(row.get("id"), str):
                identifiers[row["id"]] = f"{collection}-{index}"
    collect_geometry_ids(spec.get("geometry"), identifiers, "geometry")
    relationships = {
        collection: normalize(spec["relationships"][collection], identifiers)
        for collection in RELATION_COLLECTIONS if collection in spec["relationships"]
    }
    members = []
    for member_id in source_order:
        constituent = constituents[member_id]
        members.append({
            "polarity": constituent["polarity"],
            "role": constituent["role"],
            "constituent": normalize(constituent, identifiers),
            "worldline": normalize(worldlines[constituent["worldlineId"]], identifiers),
        })
    result = {
        "schema": "assembly-scientific-identity.v1",
        "sourceLawVersion": "prescribed-assembly-evaluator.v2",
        "normalizedFieldSpeed": 1,
        "members": members,
        "relationships": relationships,
        "geometry": normalize(spec.get("geometry"), identifiers),
        "history": normalize(spec.get("history"), identifiers),
        "motionPolicy": normalize({
            "policy": spec.get("constraints", {}).get("speedGuard", {}).get("policy"),
            "maxAllowedSpeed": spec.get("constraints", {}).get("speedGuard", {}).get("maxAllowedSpeed"),
        }, identifiers),
    }
    return {key: result[key] for key in sorted(result)}


def js_number(value: float) -> str:
    if not math.isfinite(value):
        return "null"
    if value == 0:
        return "0"
    if value.is_integer() and abs(value) < 1e21:
        return str(int(value))
    shortest = repr(value).lower()
    if "e" not in shortest:
        return shortest
    mantissa, exponent_text = shortest.split("e")
    exponent = int(exponent_text)
    if -6 <= exponent < 21:
        negative = mantissa.startswith("-")
        digits = mantissa.lstrip("-").replace(".", "")
        decimal_position = 1 + exponent
        if decimal_position <= 0:
            body = "0." + "0" * (-decimal_position) + digits
        elif decimal_position >= len(digits):
            body = digits + "0" * (decimal_position - len(digits))
        else:
            body = digits[:decimal_position] + "." + digits[decimal_position:]
        return ("-" if negative else "") + body
    return f"{mantissa}e{'+' if exponent >= 0 else ''}{exponent}"


def js_json(value) -> str:
    if value is None:
        return "null"
    if value is True:
        return "true"
    if value is False:
        return "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        return js_number(value)
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    if isinstance(value, list):
        return "[" + ",".join(js_json(entry) for entry in value) + "]"
    if isinstance(value, dict):
        return "{" + ",".join(f"{js_json(key)}:{js_json(value[key])}" for key in sorted(value)) + "}"
    raise TypeError(type(value))


def main() -> int:
    registry = json.loads(REGISTRY.read_text())
    errors = []
    exact_keys = set()
    records = set()
    for row in registry["entries"]:
        source_path = ROOT / row["sourceSpec"]
        record_path = ROOT / row["recordUrl"]
        source = json.loads(source_path.read_text())
        record_bytes = record_path.read_bytes()
        record = json.loads(record_bytes)
        canonical = js_json(scientific_projection(source)).encode()
        model_hash = digest(canonical)
        expected_id = f"asm-{model_hash[:32]}"
        key = (row["assemblyId"], row["modelRevisionSha256"])
        if key in exact_keys:
            errors.append(f"duplicate exact model {key}")
        exact_keys.add(key)
        record_hash = digest(record_bytes)
        if record_hash in records:
            errors.append(f"duplicate record bytes {record_hash}")
        records.add(record_hash)
        checks = {
            "assemblyId": (row["assemblyId"], expected_id),
            "modelRevisionSha256": (row["modelRevisionSha256"], model_hash),
            "recordSha256": (row["recordSha256"], record_hash),
            "record assemblyId": (record.get("assemblyId"), expected_id),
            "record modelRevisionSha256": (record.get("modelRevisionSha256"), model_hash),
            "record generatingSpec": (record.get("provenance", {}).get("generatingSpec"), row["sourceSpec"]),
        }
        for label, (actual, expected) in checks.items():
            if actual != expected:
                errors.append(f"{row['recordUrl']}: {label} {actual!r} != {expected!r}")
    member_keys = {(member["assemblyId"], member["modelRevisionSha256"])
                   for braid in registry["braids"] for member in braid["members"]}
    if member_keys != exact_keys:
        errors.append("braid membership does not cover each exact model exactly once")
    coverage = registry["coverage"]
    if coverage["registeredExactModels"] != len(exact_keys) or coverage["braidEntries"] != len(registry["braids"]):
        errors.append("coverage totals disagree with independently counted identities")
    if errors:
        print("assembly registry migration verification failed:", file=sys.stderr)
        for error in errors[:20]:
            print(f"- {error}", file=sys.stderr)
        if len(errors) > 20:
            print(f"- ... {len(errors) - 20} more", file=sys.stderr)
        return 1
    print(json.dumps({
        "instrument": "independent-python-assembly-registry-verifier.v1",
        "exactModels": len(exact_keys),
        "braidEntries": len(registry["braids"]),
        "sealedRecords": len(records),
        "scientificProjection": "independently reconstructed from source specifications",
        "result": "pass",
        "claimBoundary": "identity and byte migration only; no geometry, dynamics, retention, stability, or scientific acceptance",
    }, separators=(",", ":")))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
