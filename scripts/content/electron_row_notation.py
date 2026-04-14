#!/usr/bin/env python3
"""Generate row-style electron occupancy tables by principal energy level.

This script reads element metadata from vendor/periodic-table-json and emits
the occupancy-ledger notation:

    E1 s:2/2
    E2 s:2/2 p:4/6

Optionally, once a noble-gas core is fully locked in, the script compresses
those closed-shell rows into a bracket label such as [Ne].
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
PERIODIC_TABLE_JSON = ROOT / "vendor/periodic-table-json/periodic-table.json"
SUBSHELL_CAPACITY = {"s": 2, "p": 6, "d": 10, "f": 14}
NOBLE_GASES = {
    2: {"label": "[He]", "config": "1s2"},
    10: {"label": "[Ne]", "config": "1s2 2s2 2p6"},
    18: {"label": "[Ar]", "config": "1s2 2s2 2p6 3s2 3p6"},
    36: {"label": "[Kr]", "config": "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6"},
    54: {"label": "[Xe]", "config": "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6"},
    86: {
        "label": "[Rn]",
        "config": "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6",
    },
}


def load_elements() -> list[dict]:
    data = json.loads(PERIODIC_TABLE_JSON.read_text())
    return data["elements"]


def parse_configuration(config: str) -> dict[int, dict[str, int]]:
    occupancy: dict[int, dict[str, int]] = {}
    for level, subshell, count in re.findall(r"(\d)([spdf])(\d+)", config):
        level_num = int(level)
        occupancy.setdefault(level_num, {})[subshell] = int(count)
    return occupancy


def compact_number(value: int) -> str:
    if value < 10:
        return str(value)
    return format(value, "x")


def render_rows(occupancy: dict[int, dict[str, int]], include_labels: bool = True) -> list[str]:
    rows: list[str] = []
    for level in sorted(occupancy):
        parts = []
        for subshell in ("s", "p", "d", "f"):
            count = occupancy[level].get(subshell, 0)
            if count:
                if include_labels:
                    parts.append(f"{subshell}:{count}/{SUBSHELL_CAPACITY[subshell]}")
                else:
                    parts.append(
                        f"{compact_number(count)}/{compact_number(SUBSHELL_CAPACITY[subshell])}"
                    )
        if parts:
            rows.append(f"E{level} " + " ".join(parts))
    return rows


def subtract_occupancy(
    occupancy: dict[int, dict[str, int]], core: dict[int, dict[str, int]]
) -> dict[int, dict[str, int]]:
    remainder: dict[int, dict[str, int]] = {}
    for level, subshells in occupancy.items():
        for subshell, count in subshells.items():
            remaining = count - core.get(level, {}).get(subshell, 0)
            if remaining > 0:
                remainder.setdefault(level, {})[subshell] = remaining
    return remainder


def compress_noble_core(
    occupancy: dict[int, dict[str, int]], atomic_number: int
) -> list[str]:
    candidates = [z for z in NOBLE_GASES if z <= atomic_number]
    if not candidates:
        return render_rows(occupancy, include_labels=False)
    noble_z = max(candidates)
    noble = NOBLE_GASES[noble_z]
    if atomic_number == noble_z:
        previous_candidates = [z for z in NOBLE_GASES if z < atomic_number]
        if not previous_candidates:
            return render_rows(occupancy, include_labels=False) + [f"= {noble['label']}"]
        previous_z = max(previous_candidates)
        previous = NOBLE_GASES[previous_z]
        previous_core = parse_configuration(previous["config"])
        remainder = subtract_occupancy(occupancy, previous_core)
        return [previous["label"]] + render_rows(remainder, include_labels=False) + [f"= {noble['label']}"]
    core_occupancy = parse_configuration(noble["config"])
    remainder = subtract_occupancy(occupancy, core_occupancy)
    return [noble["label"]] + render_rows(remainder, include_labels=False)


def format_table(limit: int, compress: bool) -> str:
    lines = [
        "| Z | Element | Standard configuration | Full row notation | Abbreviated row notation |",
        "|---|---|---|---|---|",
    ]
    for element in load_elements():
        atomic_number = element["number"]
        if atomic_number > limit:
            break
        occupancy = parse_configuration(element["electron_configuration"])
        full_rows = render_rows(occupancy, include_labels=False)
        abbreviated_rows = (
            compress_noble_core(occupancy, atomic_number) if compress else full_rows
        )
        standard_configuration = "<br>".join(
            f"`{part}`" for part in element["electron_configuration"].split()
        )
        full_text = "<br>".join(f"`{row}`" for row in full_rows)
        abbreviated_text = "<br>".join(f"`{row}`" for row in abbreviated_rows)
        lines.append(
            f"| {atomic_number} | {element['name']} | {standard_configuration} | {full_text} | {abbreviated_text} |"
        )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--no-noble-core", action="store_true")
    args = parser.parse_args()
    print(format_table(args.limit, compress=not args.no_noble_core))


if __name__ == "__main__":
    main()
