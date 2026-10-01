"""Filesystem locations for unchanged logical research-source identities.

The shared JSON table records explicit relocations only. This helper does not
select snapshots, rewrite evidence records, or replace byte/hash validation.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

_TABLE = json.loads((Path(__file__).resolve().parents[1] /
                     "src/documentation/research-source-locations.json").read_text(encoding="utf-8"))


def resolve_research_source_path(repository_root: Path | str, logical_path: Path | str) -> Path:
    root = Path(os.path.abspath(repository_root))
    absolute = Path(os.path.abspath(root / logical_path))
    try:
        relative = absolute.relative_to(root).as_posix()
    except ValueError:
        return absolute
    visited = set()
    limit = len(_TABLE["fileMoves"]) + len(_TABLE["directoryMoves"]) + 1
    for _ in range(limit):
        if relative in visited:
            raise ValueError(f"Cyclic research source relocation: {logical_path}")
        visited.add(relative)
        current = _TABLE["fileMoves"].get(relative)
        if current is None:
            for original, destination in _TABLE["directoryMoves"]:
                if relative.startswith(original):
                    current = destination + relative[len(original):]
                    break
        if current is None or current == relative:
            return root / relative
        relative = current
    raise ValueError(f"Nonterminating research source relocation: {logical_path}")
