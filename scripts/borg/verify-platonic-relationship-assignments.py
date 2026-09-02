#!/usr/bin/env python3
"""Independent BP-015 to Borg Platonic-assignment verifier.

This checker reads source JSON and the committed registry directly. It does not
import the production JavaScript validator, descriptor, query path, or registry
builder, so agreement checks the assignment boundary rather than replaying it.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
ASSIGNMENTS = ROOT / "reference/priorities/braid-program/borg-platonic-relationship-assignments.v1.json"
REGISTRY = ROOT / "reference/priorities/app-borg/assembly-registry.v1.json"
CONTROLLED_RELATIONSHIPS = {
    "exact-vertex-set",
    "platonic-component",
    "platonic-compound",
    "platonic-cell-complex",
}
CONTROLLED_SOLIDS = {"tetrahedron", "cube", "octahedron", "dodecahedron", "icosahedron"}


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    projection = load(ASSIGNMENTS)
    registry = load(REGISTRY)
    assert projection["schema"] == "borg-platonic-relationship-assignments.v1"
    source_path = ROOT / projection["source"]
    assert hashlib.sha256(source_path.read_bytes()).hexdigest() == projection["sourceSha256"]

    registry_rows = {
        (row["assemblyId"], row["modelRevisionSha256"]): row for row in registry["entries"]
    }
    assert len(registry_rows) == 145
    assignments = projection["assignments"]
    assert len(assignments) == 6
    assert len({row["assignmentId"] for row in assignments}) == len(assignments)
    assert len({(row["assemblyId"], row["modelRevisionSha256"]) for row in assignments}) == len(assignments)

    assigned = set()
    solids = set()
    for row in assignments:
        key = (row["assemblyId"], row["modelRevisionSha256"])
        assert key in registry_rows
        assert set(row["relationships"]) <= CONTROLLED_RELATIONSHIPS
        assert row["relationships"] == ["exact-vertex-set"]
        assert set(row["solids"]) <= CONTROLLED_SOLIDS
        assert row["braidQualified"] is False
        source = load(ROOT / row["sourceSpec"])
        assert (source["identity"]["assemblyId"], source["identity"]["modelRevisionSha256"]) == key
        solid = source["geometry"]["platonicVertices"]["solid"]
        assert row["solids"] == [solid]
        assert row["reason"] == f"The exact source specification declares geometry.platonicVertices.solid as {solid}."
        assigned.add(key)
        solids.add(solid)

    assert solids == CONTROLLED_SOLIDS
    stella = next(row for row in registry["entries"] if "stella-octangula" in row["sourceSpec"])
    assert (stella["assemblyId"], stella["modelRevisionSha256"]) not in assigned

    dispositions = {
        key: "assigned" if key in assigned else "unassigned" for key in registry_rows
    }
    assert len(dispositions) == 145
    assert sum(value == "assigned" for value in dispositions.values()) == 6
    assert sum(value == "unassigned" for value in dispositions.values()) == 139
    assert projection["unassignedReason"]
    print("Platonic assignments verified: 145 exact registry rows; 6 source-assigned; 139 fail-closed unassigned.")


if __name__ == "__main__":
    main()
