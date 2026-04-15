#!/usr/bin/env python3
"""Generate row-style electron occupancy tables by principal energy level.

This script reads element metadata from vendor/periodic-table-json and emits
an additive occupancy-ledger notation:

    E1 1/2 + 1/2
    E2 1/2 + 1/2
    E2 1/6 + 1/6 + 1/6 + 1/6

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


def parse_configuration_terms(config: str) -> list[tuple[int, str, int]]:
    return [(int(level), subshell, int(count)) for level, subshell, count in re.findall(r"(\d)([spdf])(\d+)", config)]


def parse_configuration(config: str) -> dict[int, dict[str, int]]:
    occupancy: dict[int, dict[str, int]] = {}
    for level_num, subshell, count in parse_configuration_terms(config):
        occupancy.setdefault(level_num, {})[subshell] = count
    return occupancy


def abbreviate_standard_configuration(config: str, atomic_number: int) -> str:
    candidates = [z for z in NOBLE_GASES if z < atomic_number]
    if not candidates:
        return config
    noble_z = max(candidates)
    noble = NOBLE_GASES[noble_z]
    prefix = noble["config"]
    if not config.startswith(prefix):
        return config
    remainder = config[len(prefix) :].strip()
    if not remainder:
        return noble["label"]
    return f"{noble['label']} {remainder}"


def compact_number(value: int) -> str:
    if value < 10:
        return str(value)
    return format(value, "x")


def render_additive_term_rows(terms: list[tuple[int, str, int]]) -> list[str]:
    rows: list[str] = []
    for level, subshell, count in terms:
        unit = f"1/{compact_number(SUBSHELL_CAPACITY[subshell])}"
        rows.append(f"E{level} {' + '.join([unit] * count)}")
    return rows


def render_eoc_rows(terms: list[tuple[int, str, int]]) -> list[str]:
    return [
        f"{level}{compact_number(count)}{compact_number(SUBSHELL_CAPACITY[subshell])}"
        for level, subshell, count in terms
    ]


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


def make_abbreviated_standard_lines(config: str, atomic_number: int) -> list[str]:
    terms = config.split()
    candidates = [z for z in NOBLE_GASES if z < atomic_number]
    if not candidates:
        return [f"`{term}`" for term in terms]
    noble_z = max(candidates)
    noble = NOBLE_GASES[noble_z]
    core_terms = noble["config"].split()
    blank_count = max(0, len(core_terms) - 1)
    remainder = terms[len(core_terms) :]
    return ["&nbsp;"] * blank_count + [f"`{noble['label']}`"] + [f"`{term}`" for term in remainder]


def make_abbreviated_standard_lines_exact(config: str, atomic_number: int) -> list[str]:
    terms = config.split()
    previous_candidates = [z for z in NOBLE_GASES if z < atomic_number]
    if not previous_candidates:
        lines = [f"`{term}`" for term in terms]
        lines[-1] = f"`{terms[-1]} = {NOBLE_GASES[atomic_number]['label']}`"
        return lines
    previous_z = max(previous_candidates)
    previous = NOBLE_GASES[previous_z]
    core_terms = previous["config"].split()
    blank_count = max(0, len(core_terms) - 1)
    remainder = terms[len(core_terms) :]
    lines = (
        ["&nbsp;"] * blank_count
        + [f"`{previous['label']}`"]
        + [f"`{term}`" for term in remainder]
    )
    last_term = remainder[-1]
    lines[-1] = f"`{last_term} = {NOBLE_GASES[atomic_number]['label']}`"
    return lines


def make_abbreviated_row_lines(config: str, atomic_number: int) -> list[str]:
    terms = parse_configuration_terms(config)
    term_rows = render_additive_term_rows(terms)
    candidates = [z for z in NOBLE_GASES if z < atomic_number]
    if not candidates:
        return [f"`{row}`" for row in term_rows]
    noble_z = max(candidates)
    noble = NOBLE_GASES[noble_z]
    core_term_count = len(parse_configuration_terms(noble["config"]))
    blank_count = max(0, core_term_count - 1)
    remainder_rows = term_rows[core_term_count:]
    return ["&nbsp;"] * blank_count + [f"`{noble['label']}`"] + [f"`{row}`" for row in remainder_rows]


def make_abbreviated_row_lines_exact(config: str, atomic_number: int) -> list[str]:
    terms = parse_configuration_terms(config)
    term_rows = render_additive_term_rows(terms)
    previous_candidates = [z for z in NOBLE_GASES if z < atomic_number]
    if not previous_candidates:
        lines = [f"`{row}`" for row in term_rows]
        lines[-1] = f"`{term_rows[-1]} = {NOBLE_GASES[atomic_number]['label']}`"
        return lines
    previous_z = max(previous_candidates)
    previous = NOBLE_GASES[previous_z]
    core_term_count = len(parse_configuration_terms(previous["config"]))
    blank_count = max(0, core_term_count - 1)
    remainder_rows = term_rows[core_term_count:]
    lines = (
        ["&nbsp;"] * blank_count
        + [f"`{previous['label']}`"]
        + [f"`{row}`" for row in remainder_rows]
    )
    last_row = remainder_rows[-1]
    lines[-1] = f"`{last_row} = {NOBLE_GASES[atomic_number]['label']}`"
    return lines


def format_table(limit: int, compress: bool) -> str:
    lines = [
        "| Z | Element | Standard configuration | Abbreviated standard | EOC | Abbreviated additive row notation |",
        "|---|---|---|---|---|---|",
    ]
    for element in load_elements():
        atomic_number = element["number"]
        if atomic_number > limit:
            break
        standard_configuration_raw = element["electron_configuration"]
        terms = parse_configuration_terms(standard_configuration_raw)
        standard_lines = [f"`{part}`" for part in standard_configuration_raw.split()]
        full_row_lines = [f"`{row}`" for row in render_additive_term_rows(terms)]
        eoc_rows = render_eoc_rows(terms)
        eoc_lines = [f"`{row}`" for row in eoc_rows]
        if compress and atomic_number in NOBLE_GASES:
            abbreviated_standard_lines = make_abbreviated_standard_lines_exact(
                standard_configuration_raw, atomic_number
            )
            row_lines = make_abbreviated_row_lines_exact(
                standard_configuration_raw, atomic_number
            )
        elif compress:
            abbreviated_standard_lines = make_abbreviated_standard_lines(
                standard_configuration_raw, atomic_number
            )
            row_lines = make_abbreviated_row_lines(
                standard_configuration_raw, atomic_number
            )
        else:
            abbreviated_standard_lines = standard_lines
            row_lines = full_row_lines

        max_lines = max(
            len(standard_lines),
            len(abbreviated_standard_lines),
            len(eoc_lines),
            len(row_lines),
        )

        def pad(lines: list[str]) -> list[str]:
            return lines + ["&nbsp;"] * (max_lines - len(lines))

        standard_configuration = "<br>".join(pad(standard_lines))
        abbreviated_standard = "<br>".join(pad(abbreviated_standard_lines))
        eoc_text = "<br>".join(pad(eoc_lines))
        additive_text = "<br>".join(pad(row_lines))
        lines.append(
            f"| {atomic_number} | {element['name']} | {standard_configuration} | {abbreviated_standard} | {eoc_text} | {additive_text} |"
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
