#!/usr/bin/env python3
"""Minimal pdgsolve contract implementation.

This file currently provides only the request/result/accept/publish boundaries.
The solver itself does not ship any pre-known exact reactions. Requests that are
not solved by future search logic receive a deterministic ``no_exact_closure``
result so the JSON boundary remains explicit.
"""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import sys
from collections import OrderedDict
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


PDGSOLVE_REQUEST_SCHEMA = "pdgsolve-request/v1"
PDGSOLVE_RESULT_SCHEMA = "pdgsolve-result/v1"
PDGSOLVE_ACCEPTANCE_SCHEMA = "pdgsolve-acceptance/v1"
PDGSOLVE_PUBLICATION_GRAPH_SCHEMA = "pdgsolve-publication-graph/v1"
PDGSOLVE_PDGEDIT_PACKAGE_SCHEMA = "pdgsolve-pdgedit-package/v1"
PDGEDIT_SCHEMA = "pdgedit/v1"

DEFAULT_TMP_DIR = REPO_ROOT / ".tmp" / "pdgsolve"
DEFAULT_RESULT_CORPUS_OUTPUT_DIR = DEFAULT_TMP_DIR / "results"
DEFAULT_RESULT_CORPUS_INDEX_PATH = DEFAULT_TMP_DIR / "result-corpus.v1.json"
DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR = DEFAULT_TMP_DIR / "pdgedit" / "documents"
DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH = DEFAULT_TMP_DIR / "pdgedit" / "manifest.v1.json"
UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID = "unbound_architrinos_residue"

ASSEMBLY_DISPLAY = {
    "pro_noether_core_I": {
        "title": "Pro Noether Core",
        "pdgeditType": "pro-noether-core-assembly",
        "tiles": [
            "pro-noether-core",
            "binary-bare-br-none",
            "binary-bare-br-none",
            "binary-bare-br-none",
        ],
        "electrinoCount": 3,
        "positrinoCount": 3,
    },
    "anti_noether_core_I": {
        "title": "Anti Noether Core",
        "pdgeditType": "anti-noether-core-assembly",
        "tiles": [
            "anti-noether-core",
            "binary-bare-rb-none",
            "binary-bare-rb-none",
            "binary-bare-rb-none",
        ],
        "electrinoCount": 3,
        "positrinoCount": 3,
    },
    "pro_noether_core_II": {
        "title": "Pro Bi-Binary",
        "pdgeditType": "pro-bi-binary-assembly",
        "tiles": [
            "pro-bi-binary",
            "binary-bare-br-none",
            "binary-bare-br-none",
            "binary-empty-none-none",
        ],
        "electrinoCount": 2,
        "positrinoCount": 2,
    },
    "anti_noether_core_II": {
        "title": "Anti Bi-Binary",
        "pdgeditType": "anti-bi-binary-assembly",
        "tiles": [
            "anti-bi-binary",
            "binary-bare-rb-none",
            "binary-bare-rb-none",
            "binary-empty-none-none",
        ],
        "electrinoCount": 2,
        "positrinoCount": 2,
    },
    "pro_noether_core_III": {
        "title": "Pro Uni-Binary",
        "pdgeditType": "pro-uni-binary-assembly",
        "tiles": [
            "pro-uni-binary",
            "binary-bare-br-none",
            "binary-empty-none-none",
            "binary-empty-none-none",
        ],
        "electrinoCount": 1,
        "positrinoCount": 1,
    },
    "anti_noether_core_III": {
        "title": "Anti Uni-Binary",
        "pdgeditType": "anti-uni-binary-assembly",
        "tiles": [
            "anti-uni-binary",
            "binary-bare-rb-none",
            "binary-empty-none-none",
            "binary-empty-none-none",
        ],
        "electrinoCount": 1,
        "positrinoCount": 1,
    },
    "pro_down_quark_I": {
        "title": "Pro Down Quark",
        "pdgeditType": "pro-down-quark-assembly",
        "tiles": [
            "pro-down-quark",
            "binary-full-br-br",
            "binary-full-br-bb",
            "binary-full-br-br",
        ],
        "electrinoCount": 7,
        "positrinoCount": 5,
    },
    "pro_up_quark_I": {
        "title": "Pro Up Quark",
        "pdgeditType": "pro-up-quark-assembly",
        "tiles": [
            "pro-up-quark",
            "binary-full-br-rr",
            "binary-full-br-br",
            "binary-full-br-rr",
        ],
        "electrinoCount": 4,
        "positrinoCount": 8,
    },
    "pro_electron_I": {
        "title": "Pro Electron",
        "pdgeditType": "pro-electron-assembly",
        "tiles": [
            "pro-electron",
            "binary-full-br-bb",
            "binary-full-br-bb",
            "binary-full-br-bb",
        ],
        "electrinoCount": 9,
        "positrinoCount": 3,
    },
    "anti_electron_I": {
        "title": "Anti Electron",
        "pdgeditType": "anti-electron-assembly",
        "tiles": [
            "anti-electron",
            "binary-full-rb-rr",
            "binary-full-rb-rr",
            "binary-full-rb-rr",
        ],
        "electrinoCount": 3,
        "positrinoCount": 9,
    },
    "pro_electron_neutrino_I": {
        "title": "Pro Electron Neutrino",
        "pdgeditType": "pro-electron-neutrino-assembly",
        "tiles": [
            "pro-electron-neutrino",
            "binary-full-br-br",
            "binary-full-br-br",
            "binary-full-br-br",
        ],
        "electrinoCount": 6,
        "positrinoCount": 6,
    },
    "anti_electron_neutrino_I": {
        "title": "Anti Electron Neutrino",
        "pdgeditType": "anti-electron-neutrino-assembly",
        "tiles": [
            "anti-electron-neutrino",
            "binary-full-rb-rb",
            "binary-full-rb-rb",
            "binary-full-rb-rb",
        ],
        "electrinoCount": 6,
        "positrinoCount": 6,
    },
    "pro_muon_II": {
        "title": "Pro Muon",
        "pdgeditType": "pro-muon-assembly",
        "tiles": [
            "pro-muon",
            "binary-full-br-bb",
            "binary-full-br-bb",
            "binary-polar-none-bb",
        ],
        "electrinoCount": 8,
        "positrinoCount": 2,
    },
    "anti_muon_II": {
        "title": "Anti Muon",
        "pdgeditType": "anti-muon-assembly",
        "tiles": [
            "anti-muon",
            "binary-full-rb-rr",
            "binary-full-rb-rr",
            "binary-polar-none-rr",
        ],
        "electrinoCount": 2,
        "positrinoCount": 8,
    },
    "pro_muon_neutrino_II": {
        "title": "Pro Muon Neutrino",
        "pdgeditType": "pro-muon-neutrino-assembly",
        "tiles": [
            "pro-muon-neutrino",
            "binary-full-br-br",
            "binary-full-br-br",
            "binary-polar-none-br",
        ],
        "electrinoCount": 5,
        "positrinoCount": 5,
    },
    "anti_muon_neutrino_II": {
        "title": "Anti Muon Neutrino",
        "pdgeditType": "anti-muon-neutrino-assembly",
        "tiles": [
            "anti-muon-neutrino",
            "binary-full-rb-rb",
            "binary-full-rb-rb",
            "binary-polar-none-rb",
        ],
        "electrinoCount": 5,
        "positrinoCount": 5,
    },
    UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID: {
        "title": "Unbound Architrinos",
        "pdgeditType": "unbound-architrinos-assembly",
        "tiles": [
            "unbound",
            "unbound-electrinos",
            "unbound-positrinos",
            "architrinos",
        ],
        "electrinoCount": 0,
        "positrinoCount": 0,
    },
}

PDGEDIT_X_BY_STAGE = {
    "reactantAssemblies": 2,
    "reactantSideOperators": 7,
    "intermediateAssemblies": 9,
    "productSideOperators": 14,
    "productAssemblies": 16,
}


def normalize_text(value: Any) -> str:
    return str(value or "").strip()


def slugify(value: Any) -> str:
    text = normalize_text(value).lower()
    pieces = []
    current = []
    for character in text:
        if character.isalnum():
            current.append(character)
            continue
        if current:
            pieces.append("".join(current))
            current = []
    if current:
        pieces.append("".join(current))
    return "_".join(piece for piece in pieces if piece)


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def dump_json(payload: Any) -> str:
    return json.dumps(payload, indent=2, ensure_ascii=True) + "\n"


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dump_json(payload), encoding="utf-8")


def print_json(payload: Any) -> None:
    sys.stdout.write(dump_json(payload))


def digest_json(payload: Any) -> str:
    canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"), ensure_ascii=True)
    return f"sha256:{hashlib.sha256(canonical.encode('utf-8')).hexdigest()}"


def clone_json(payload: Any) -> Any:
    return json.loads(json.dumps(payload))


def count_assemblies(occurrences: list[dict[str, Any]]) -> list[dict[str, Any]]:
    counts: OrderedDict[str, int] = OrderedDict()
    for occurrence in occurrences:
        assembly_id = normalize_text(occurrence.get("assemblyId"))
        if not assembly_id:
            continue
        counts[assembly_id] = counts.get(assembly_id, 0) + 1
    return [
        {
            "assemblyId": assembly_id,
            "count": count,
        }
        for assembly_id, count in counts.items()
    ]


def build_primitive_counts(
    electrino_count: Any,
    positrino_count: Any,
) -> dict[str, int]:
    return {
        "electrinoCount": int(electrino_count or 0),
        "positrinoCount": int(positrino_count or 0),
    }


def get_occurrence_primitive_counts(occurrence: dict[str, Any]) -> dict[str, int] | None:
    assembly_id = normalize_text(occurrence.get("assemblyId"))
    if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        if "electrinoCount" not in occurrence or "positrinoCount" not in occurrence:
            return None
        return build_primitive_counts(occurrence.get("electrinoCount"), occurrence.get("positrinoCount"))
    metadata = ASSEMBLY_DISPLAY.get(assembly_id)
    if metadata is None:
        return None
    return build_primitive_counts(metadata["electrinoCount"], metadata["positrinoCount"])


def sum_primitive_counts(occurrences: list[dict[str, Any]]) -> dict[str, int] | None:
    totals = build_primitive_counts(0, 0)
    for occurrence in occurrences:
        counts = get_occurrence_primitive_counts(occurrence)
        if counts is None:
            return None
        totals["electrinoCount"] += counts["electrinoCount"]
        totals["positrinoCount"] += counts["positrinoCount"]
    return totals


def primitive_counts_equal(left: dict[str, int], right: dict[str, int]) -> bool:
    return (
        int(left.get("electrinoCount", 0)) == int(right.get("electrinoCount", 0))
        and int(left.get("positrinoCount", 0)) == int(right.get("positrinoCount", 0))
    )


def make_diagnostic(
    diagnostic_id: str,
    phase: str,
    message: str,
    *,
    blocking: bool,
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return {
        "id": diagnostic_id,
        "phase": phase,
        "message": message,
        "blocking": blocking,
        "payload": payload or {},
    }


def get_request_assembly_ids(request: dict[str, Any], side: str) -> list[str]:
    return [normalize_text(record.get("assemblyId")) for record in request.get(side, [])]


def get_request_occurrence_map(request: dict[str, Any], side: str) -> dict[str, dict[str, Any]]:
    return {
        normalize_text(record.get("id")): record
        for record in request.get(side, [])
        if normalize_text(record.get("id"))
    }


def all_recipe_ids_are_publishable(recipe_ids: list[str]) -> bool:
    return all(recipe_id in ASSEMBLY_DISPLAY for recipe_id in recipe_ids)


def build_publication_graph_from_linear_plan(
    request: dict[str, Any],
    *,
    prefix: str,
    primary_reactant_id: str,
    core_product_ids: list[str],
    passthru_pairs: list[tuple[str, str]],
) -> dict[str, Any]:
    reactant_by_id = get_request_occurrence_map(request, "reactants")
    product_by_id = get_request_occurrence_map(request, "products")
    units: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []

    reactant_rows: list[tuple[str, str, str]] = []
    primary_reactant = reactant_by_id[primary_reactant_id]
    reactant_rows.append(
        (
            f"unit_lane1_{slugify(primary_reactant['assemblyId'])}_1.row.1",
            primary_reactant_id,
            normalize_text(primary_reactant["assemblyId"]),
        )
    )
    for index, (reactant_occurrence_id, _product_occurrence_id) in enumerate(passthru_pairs, start=2):
        reactant = reactant_by_id[reactant_occurrence_id]
        reactant_rows.append(
            (
                f"unit_lane1_{slugify(reactant['assemblyId'])}_{index - 1}.row.{index}",
                reactant_occurrence_id,
                normalize_text(reactant["assemblyId"]),
            )
        )

    for row_index, (unit_id, occurrence_key, recipe_id) in enumerate(reactant_rows):
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "reactantAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    core_intermediate_ids = [f"intermediate_{prefix}.row.{index}" for index, _ in enumerate(core_product_ids, start=1)]
    core_intermediate_rows = []
    for row_index, (occurrence_key, product_occurrence_id) in enumerate(zip(core_intermediate_ids, core_product_ids)):
        product = product_by_id[product_occurrence_id]
        recipe_id = normalize_text(product["assemblyId"])
        unit_id = f"unit_lane3_{slugify(recipe_id)}_{row_index + 1}.row.{row_index + 1}"
        core_intermediate_rows.append((unit_id, occurrence_key, recipe_id, product_occurrence_id))
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "intermediateAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    passthru_row_start = len(core_intermediate_rows)
    passthru_intermediate_rows = []
    for offset, (reactant_occurrence_id, product_occurrence_id) in enumerate(passthru_pairs):
        product = product_by_id[product_occurrence_id]
        recipe_id = normalize_text(product["assemblyId"])
        row_index = passthru_row_start + offset
        occurrence_key = f"intermediate_{prefix}.support.{offset + 1}"
        unit_id = f"unit_lane3_{slugify(recipe_id)}_support_{offset + 1}.row.{row_index + 1}"
        passthru_intermediate_rows.append((unit_id, occurrence_key, recipe_id, reactant_occurrence_id, product_occurrence_id))
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "intermediateAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    reactant_operator_rows = [
        (
            f"unit_lane2_{prefix}_dissociate_1",
            f"reactant_operator.{prefix}.dissociate.1",
            "dissociate",
            0,
        )
    ]
    for offset, (_reactant_occurrence_id, _product_occurrence_id) in enumerate(passthru_pairs, start=1):
        reactant_operator_rows.append(
            (
                f"unit_lane2_{prefix}_pass_thru_{offset}",
                f"reactant_operator.{prefix}.pass_thru.{offset}",
                "pass-thru",
                offset,
            )
        )
    for unit_id, occurrence_key, recipe_id, row_index in reactant_operator_rows:
        units.append(
            {
                "id": unit_id,
                "kind": "operator",
                "stage": "reactantSideOperators",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": "Dissociate" if recipe_id == "dissociate" else "Pass Thru",
                "anchorRow": row_index,
            }
        )

    product_operator_rows = []
    combined_intermediate_rows = core_intermediate_rows + [
        (unit_id, occurrence_key, recipe_id, product_occurrence_id)
        for unit_id, occurrence_key, recipe_id, _reactant_occurrence_id, product_occurrence_id in passthru_intermediate_rows
    ]
    for row_index, (_intermediate_unit_id, _occurrence_key, _recipe_id, product_occurrence_id) in enumerate(combined_intermediate_rows):
        product_operator_rows.append(
            (
                f"unit_lane4_{prefix}_pass_thru_{row_index + 1}",
                f"product_operator.{prefix}.pass_thru.{row_index + 1}",
                "pass-thru",
                row_index,
                product_occurrence_id,
            )
        )
    for unit_id, occurrence_key, recipe_id, row_index, _product_occurrence_id in product_operator_rows:
        units.append(
            {
                "id": unit_id,
                "kind": "operator",
                "stage": "productSideOperators",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": "Pass Thru",
                "anchorRow": row_index,
            }
        )

    product_rows = []
    for row_index, product_occurrence_id in enumerate(core_product_ids + [pair[1] for pair in passthru_pairs]):
        product = product_by_id[product_occurrence_id]
        recipe_id = normalize_text(product["assemblyId"])
        product_rows.append(
            (
                f"unit_lane5_{slugify(recipe_id)}_{row_index + 1}.row.{row_index + 1}",
                product_occurrence_id,
                recipe_id,
            )
        )
    for row_index, (unit_id, occurrence_key, recipe_id) in enumerate(product_rows):
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "productAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    edges.append(
        {
            "id": f"{prefix}_reactant_to_dissociate",
            "fromUnitId": reactant_rows[0][0],
            "fromPortId": "output",
            "toUnitId": reactant_operator_rows[0][0],
            "toPortId": "input",
        }
    )
    for index, (intermediate_unit_id, _occurrence_key, _recipe_id, _product_occurrence_id) in enumerate(core_intermediate_rows, start=1):
        edges.append(
            {
                "id": f"{prefix}_dissociate_to_intermediate_{index}",
                "fromUnitId": reactant_operator_rows[0][0],
                "fromPortId": f"output_{index}",
                "toUnitId": intermediate_unit_id,
                "toPortId": "input",
            }
        )

    for offset, ((reactant_unit_id, _reactant_occurrence_key, _recipe_id), operator_row, intermediate_row) in enumerate(
        zip(reactant_rows[1:], reactant_operator_rows[1:], passthru_intermediate_rows),
        start=1,
    ):
        intermediate_unit_id = intermediate_row[0]
        edges.append(
            {
                "id": f"{prefix}_support_reactant_{offset}",
                "fromUnitId": reactant_unit_id,
                "fromPortId": "output",
                "toUnitId": operator_row[0],
                "toPortId": "input",
            }
        )
        edges.append(
            {
                "id": f"{prefix}_support_intermediate_{offset}",
                "fromUnitId": operator_row[0],
                "fromPortId": "output",
                "toUnitId": intermediate_unit_id,
                "toPortId": "input",
            }
        )

    for row_index, ((intermediate_unit_id, _occurrence_key, _recipe_id, _product_occurrence_id), product_operator_row, product_row) in enumerate(
        zip(combined_intermediate_rows, product_operator_rows, product_rows),
        start=1,
    ):
        edges.append(
            {
                "id": f"{prefix}_intermediate_to_product_operator_{row_index}",
                "fromUnitId": intermediate_unit_id,
                "fromPortId": "output",
                "toUnitId": product_operator_row[0],
                "toPortId": "input",
            }
        )
        edges.append(
            {
                "id": f"{prefix}_product_operator_to_product_{row_index}",
                "fromUnitId": product_operator_row[0],
                "fromPortId": "output",
                "toUnitId": product_row[0],
                "toPortId": "input",
            }
        )

    return {
        "schema": PDGSOLVE_PUBLICATION_GRAPH_SCHEMA,
        "units": units,
        "edges": edges,
    }


def build_residue_occurrence(
    occurrence_key: str,
    *,
    electrino_count: int,
    positrino_count: int,
) -> dict[str, Any]:
    return {
        "id": occurrence_key,
        "assemblyId": UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID,
        "title": f"Unbound Architrinos {electrino_count}E/{positrino_count}P",
        "electrinoCount": electrino_count,
        "positrinoCount": positrino_count,
    }


def build_occurrence_counts_map(
    occurrences: list[dict[str, Any]],
) -> dict[str, dict[str, int]]:
    occurrence_counts: dict[str, dict[str, int]] = {}
    for occurrence in occurrences:
        occurrence_key = normalize_text(occurrence.get("id"))
        if not occurrence_key:
            continue
        counts = get_occurrence_primitive_counts(occurrence)
        if counts is None:
            continue
        occurrence_counts[occurrence_key] = counts
    return occurrence_counts


def sum_counts_for_occurrence_keys(
    occurrence_keys: list[str],
    occurrence_counts: dict[str, dict[str, int]],
) -> dict[str, int] | None:
    totals = build_primitive_counts(0, 0)
    for occurrence_key in occurrence_keys:
        counts = occurrence_counts.get(normalize_text(occurrence_key))
        if counts is None:
            return None
        totals["electrinoCount"] += counts["electrinoCount"]
        totals["positrinoCount"] += counts["positrinoCount"]
    return totals


def build_balance_diagnostic(
    request_id: str,
    operator_id: str,
    *,
    input_totals: dict[str, int] | None = None,
    output_totals: dict[str, int] | None = None,
    message: str,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "requestId": request_id,
        "operatorId": operator_id,
    }
    if input_totals is not None:
        payload["inputTotals"] = clone_json(input_totals)
    if output_totals is not None:
        payload["outputTotals"] = clone_json(output_totals)
    return make_diagnostic(
        "pdgsolve.search.operator_balance_mismatch",
        "search",
        message,
        blocking=True,
        payload=payload,
    )


def build_intermediate_ledger_diagnostic(
    request_id: str,
    *,
    code: str,
    message: str,
    payload: dict[str, Any],
) -> dict[str, Any]:
    return make_diagnostic(
        code,
        "search",
        message,
        blocking=True,
        payload={
            "requestId": request_id,
            **clone_json(payload),
        },
    )


def validate_operator_balances(
    request: dict[str, Any],
    intermediate_occurrences: list[dict[str, Any]],
    operator_choices: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    occurrence_counts = build_occurrence_counts_map(
        [
            *list(request.get("reactants", [])),
            *intermediate_occurrences,
            *list(request.get("products", [])),
        ]
    )
    diagnostics: list[dict[str, Any]] = []
    request_id = normalize_text(request.get("requestId"))
    for choice in operator_choices:
        operator_id = normalize_text(choice.get("id"))
        input_totals = sum_counts_for_occurrence_keys(choice.get("inputOccurrenceKeys", []), occurrence_counts)
        output_totals = sum_counts_for_occurrence_keys(choice.get("outputOccurrenceKeys", []), occurrence_counts)
        if input_totals is None or output_totals is None:
            diagnostics.append(
                build_balance_diagnostic(
                    request_id,
                    operator_id,
                    input_totals=input_totals,
                    output_totals=output_totals,
                    message="Operator balance could not be checked because one or more occurrence counts are unknown.",
                )
            )
            continue
        if not primitive_counts_equal(input_totals, output_totals):
            diagnostics.append(
                build_balance_diagnostic(
                    request_id,
                    operator_id,
                    input_totals=input_totals,
                    output_totals=output_totals,
                    message="Operator input and output primitive ledgers do not balance.",
                )
            )
    return diagnostics


def validate_intermediate_ledger(
    request: dict[str, Any],
    intermediate_occurrences: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    request_id = normalize_text(request.get("requestId"))
    intermediate_ids = {
        normalize_text(occurrence.get("id"))
        for occurrence in intermediate_occurrences
        if normalize_text(occurrence.get("id"))
    }
    diagnostics: list[dict[str, Any]] = []

    for choice in product_operator_choices:
        operator_id = normalize_text(choice.get("id"))
        non_intermediate_inputs = [
            normalize_text(occurrence_key)
            for occurrence_key in choice.get("inputOccurrenceKeys", [])
            if normalize_text(occurrence_key) not in intermediate_ids
        ]
        if non_intermediate_inputs:
            diagnostics.append(
                build_intermediate_ledger_diagnostic(
                    request_id,
                    code="pdgsolve.search.product_operator_non_intermediate_input",
                    message="Product-side operators must consume only intermediate occurrences.",
                    payload={
                        "operatorId": operator_id,
                        "inputOccurrenceKeys": non_intermediate_inputs,
                    },
                )
            )

    consumption_counts = {
        occurrence_id: 0 for occurrence_id in intermediate_ids
    }
    for choice in product_operator_choices:
        for occurrence_key in choice.get("inputOccurrenceKeys", []):
            normalized_occurrence_key = normalize_text(occurrence_key)
            if normalized_occurrence_key in consumption_counts:
                consumption_counts[normalized_occurrence_key] += 1

    bad_consumption = {
        occurrence_id: count
        for occurrence_id, count in consumption_counts.items()
        if count != 1
    }
    if bad_consumption:
        diagnostics.append(
            build_intermediate_ledger_diagnostic(
                request_id,
                code="pdgsolve.search.intermediate_ledger_partition_mismatch",
                message="Each intermediate occurrence must be consumed exactly once by product-side operators.",
                payload={
                    "consumptionCounts": bad_consumption,
                },
            )
        )

    occurrence_counts = build_occurrence_counts_map(
        [
            *intermediate_occurrences,
            *list(request.get("products", [])),
        ]
    )
    intermediate_totals = sum_counts_for_occurrence_keys(list(intermediate_ids), occurrence_counts)
    product_input_keys = [
        normalize_text(occurrence_key)
        for choice in product_operator_choices
        for occurrence_key in choice.get("inputOccurrenceKeys", [])
        if normalize_text(occurrence_key)
    ]
    input_totals = sum_counts_for_occurrence_keys(product_input_keys, occurrence_counts)
    product_output_keys = [
        normalize_text(occurrence_key)
        for choice in product_operator_choices
        for occurrence_key in choice.get("outputOccurrenceKeys", [])
        if normalize_text(occurrence_key)
    ]
    output_totals = sum_counts_for_occurrence_keys(product_output_keys, occurrence_counts)
    if (
        intermediate_totals is None
        or input_totals is None
        or output_totals is None
        or not primitive_counts_equal(intermediate_totals, input_totals)
        or not primitive_counts_equal(input_totals, output_totals)
    ):
        diagnostics.append(
            build_intermediate_ledger_diagnostic(
                request_id,
                code="pdgsolve.search.intermediate_ledger_balance_mismatch",
                message="The product-side ledger does not conserve the intermediate occurrences exactly.",
                payload={
                    "intermediateTotals": intermediate_totals,
                    "inputTotals": input_totals,
                    "outputTotals": output_totals,
                },
            )
        )

    return diagnostics


def build_muon_publication_graph(
    request: dict[str, Any],
    *,
    prefix: str,
    reactant_operator_choices: list[dict[str, Any]],
    intermediate_occurrences: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
) -> dict[str, Any]:
    reactants = list(request["reactants"])
    products = list(request["products"])
    units: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []

    reactant_units_by_occurrence: dict[str, str] = {}
    for row_index, reactant in enumerate(reactants):
        occurrence_key = normalize_text(reactant["id"])
        recipe_id = normalize_text(reactant["assemblyId"])
        unit_id = f"unit_lane1_{slugify(recipe_id)}_{row_index + 1}.row.{row_index + 1}"
        reactant_units_by_occurrence[occurrence_key] = unit_id
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "reactantAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": normalize_text(reactant.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    reactant_operator_units_by_occurrence: dict[str, str] = {}
    for row_index, choice in enumerate(reactant_operator_choices):
        occurrence_key = normalize_text(choice["id"])
        unit_id = f"unit_lane2_{prefix}_{slugify(choice['type'])}_{row_index + 1}"
        reactant_operator_units_by_occurrence[occurrence_key] = unit_id
        units.append(
            {
                "id": unit_id,
                "kind": "operator",
                "stage": "reactantSideOperators",
                "recipeId": normalize_text(choice["type"]),
                "occurrenceKey": occurrence_key,
                "title": normalize_text(choice["type"]).replace("-", " ").title(),
                "anchorRow": row_index,
            }
        )

    intermediate_units_by_occurrence: dict[str, str] = {}
    for row_index, occurrence in enumerate(intermediate_occurrences):
        occurrence_key = normalize_text(occurrence["id"])
        recipe_id = normalize_text(occurrence["assemblyId"])
        unit_id = f"unit_lane3_{slugify(recipe_id)}_{row_index + 1}.row.{row_index + 1}"
        intermediate_units_by_occurrence[occurrence_key] = unit_id
        unit = {
            "id": unit_id,
            "kind": "assembly",
            "stage": "intermediateAssemblies",
            "recipeId": recipe_id,
            "occurrenceKey": occurrence_key,
            "title": normalize_text(occurrence.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
            "anchorRow": row_index,
        }
        if recipe_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            unit["positrinoCount"] = int(occurrence["positrinoCount"])
            unit["electrinoCount"] = int(occurrence["electrinoCount"])
        units.append(unit)

    product_operator_units_by_occurrence: dict[str, str] = {}
    for row_index, choice in enumerate(product_operator_choices):
        output_occurrence_key = normalize_text(choice["outputOccurrenceKeys"][0])
        unit_id = f"unit_lane4_{prefix}_{slugify(choice['type'])}_{row_index + 1}"
        product_operator_units_by_occurrence[output_occurrence_key] = unit_id
        units.append(
            {
                "id": unit_id,
                "kind": "operator",
                "stage": "productSideOperators",
                "recipeId": normalize_text(choice["type"]),
                "occurrenceKey": normalize_text(choice["id"]),
                "title": normalize_text(choice["type"]).replace("-", " ").title(),
                "anchorRow": row_index,
            }
        )

    product_units_by_occurrence: dict[str, str] = {}
    for row_index, product in enumerate(products):
        occurrence_key = normalize_text(product["id"])
        recipe_id = normalize_text(product["assemblyId"])
        unit_id = f"unit_lane5_{slugify(recipe_id)}_{row_index + 1}.row.{row_index + 1}"
        product_units_by_occurrence[occurrence_key] = unit_id
        units.append(
            {
                "id": unit_id,
                "kind": "assembly",
                "stage": "productAssemblies",
                "recipeId": recipe_id,
                "occurrenceKey": occurrence_key,
                "title": normalize_text(product.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
                "anchorRow": row_index,
            }
        )

    unit_id_by_occurrence = {
        **reactant_units_by_occurrence,
        **intermediate_units_by_occurrence,
        **product_units_by_occurrence,
    }

    for choice in reactant_operator_choices:
        operator_unit_id = reactant_operator_units_by_occurrence[normalize_text(choice["id"])]
        for input_index, occurrence_key in enumerate(choice.get("inputOccurrenceKeys", []), start=1):
            edges.append(
                {
                    "id": f"{prefix}_{slugify(choice['id'])}_input_{input_index}",
                    "fromUnitId": unit_id_by_occurrence[normalize_text(occurrence_key)],
                    "fromPortId": "output",
                    "toUnitId": operator_unit_id,
                    "toPortId": f"input_{input_index}",
                }
            )
        for output_index, occurrence_key in enumerate(choice.get("outputOccurrenceKeys", []), start=1):
            edges.append(
                {
                    "id": f"{prefix}_{slugify(choice['id'])}_output_{output_index}",
                    "fromUnitId": operator_unit_id,
                    "fromPortId": f"output_{output_index}",
                    "toUnitId": unit_id_by_occurrence[normalize_text(occurrence_key)],
                    "toPortId": "input",
                }
            )

    for choice in product_operator_choices:
        output_occurrence_key = normalize_text(choice["outputOccurrenceKeys"][0])
        operator_unit_id = product_operator_units_by_occurrence[output_occurrence_key]
        for input_index, occurrence_key in enumerate(choice.get("inputOccurrenceKeys", []), start=1):
            edges.append(
                {
                    "id": f"{prefix}_{slugify(choice['id'])}_input_{input_index}",
                    "fromUnitId": unit_id_by_occurrence[normalize_text(occurrence_key)],
                    "fromPortId": "output",
                    "toUnitId": operator_unit_id,
                    "toPortId": f"input_{input_index}",
                }
            )
        edges.append(
            {
                "id": f"{prefix}_{slugify(choice['id'])}_output",
                "fromUnitId": operator_unit_id,
                "fromPortId": "output",
                "toUnitId": product_units_by_occurrence[output_occurrence_key],
                "toPortId": "input",
            }
        )

    return {
        "schema": PDGSOLVE_PUBLICATION_GRAPH_SCHEMA,
        "units": units,
        "edges": edges,
    }


def build_exact_family_for_request(request: dict[str, Any]) -> dict[str, Any] | None:
    return None


def build_unsupported_family(request: dict[str, Any]) -> dict[str, Any]:
    product_occurrences = list(request.get("products", []))
    provenance_outputs = [
        {
            "occurrenceKey": normalize_text(product.get("id")) or f"product_{index + 1}",
            "provenanceClass": "mixed",
            "supportSourceRows": [],
            "ambiguous": True,
        }
        for index, product in enumerate(product_occurrences)
    ]
    return {
        "familyId": "family.unsolved.v1",
        "kind": "no_exact_closure",
        "score": {
            "exactness": 1,
            "primitiveMismatch": 1,
            "middleMismatch": max(1, len(product_occurrences)),
            "auxiliaryBurden": 0,
            "nonIdentityOperatorCount": 0,
            "dissociationCount": 0,
            "ambiguityPenalty": max(1, len(product_occurrences)),
            "tieBreakKey": "unsupported_request",
        },
        "augmentation": {
            "reactantSide": "none",
            "productSide": "none",
        },
        "reactantAssemblies": count_assemblies(list(request.get("reactants", []))),
        "reactantSideOperators": [],
        "intermediateAssemblies": [],
        "productSideOperators": [],
        "productAssemblies": count_assemblies(product_occurrences),
        "provenanceSummary": {
            "summaryText": (
                "No exact solver law is available for this request, so "
                "pdgsolve emitted a deterministic no-exact-closure family."
            ),
            "outputs": provenance_outputs,
        },
        "diagnostics": [
            make_diagnostic(
                "pdgsolve.search.unsupported_request",
                "search",
                "No exact solve rule is available for this request.",
                blocking=True,
                payload={
                    "requestId": normalize_text(request.get("requestId")),
                },
            )
        ],
        "rawBranchCount": 0,
        "publicationReady": False,
        "canonicalCandidate": {
            "candidateId": "candidate.unsupported.v1",
            "exact": False,
            "reactantAssemblies": count_assemblies(list(request.get("reactants", []))),
            "reactantSideOperators": [],
            "intermediateAssemblies": [],
            "productSideOperators": [],
            "productAssemblies": count_assemblies(product_occurrences),
            "provenanceSummary": {
                "summaryText": (
                    "No exact solver law is available for this request, so "
                    "pdgsolve emitted a deterministic no-exact-closure family."
                ),
                "outputs": provenance_outputs,
            },
            "solveGraph": None,
        },
    }


def build_problem_id(request: dict[str, Any]) -> str:
    request_id = normalize_text(request.get("requestId")) or "request"
    return f"pdgsolve_problem_{slugify(request_id)}"


def solve_request(request: dict[str, Any]) -> dict[str, Any]:
    family = build_exact_family_for_request(request)
    if family is not None:
        return {
            "schema": PDGSOLVE_RESULT_SCHEMA,
            "problemId": build_problem_id(request),
            "searchStatus": "exact_available",
            "bestFamilyId": family["familyId"],
            "acceptedFamilyId": None,
            "diagnostics": [],
            "optionFamilies": [family],
            "review": {
                "schema": "pdgsolve-review-state/v1",
                "state": "review_ready",
                "selectedFamilyId": family["familyId"],
                "acceptedFamilyId": None,
                "acceptedRecord": None,
                "blockingDiagnostics": [],
            },
            "publication": None,
        }

    family = build_unsupported_family(request)
    return {
        "schema": PDGSOLVE_RESULT_SCHEMA,
        "problemId": build_problem_id(request),
        "searchStatus": "no_exact_closure",
        "bestFamilyId": family["familyId"],
        "acceptedFamilyId": None,
        "diagnostics": clone_json(family["diagnostics"]),
        "optionFamilies": [family],
        "review": {
            "schema": "pdgsolve-review-state/v1",
            "state": "stale",
            "selectedFamilyId": family["familyId"],
            "acceptedFamilyId": None,
            "acceptedRecord": None,
            "blockingDiagnostics": clone_json(family["diagnostics"]),
        },
        "publication": None,
    }


def get_result_family(result: dict[str, Any], family_id: str) -> dict[str, Any]:
    for family in result.get("optionFamilies", []):
        if normalize_text(family.get("familyId")) == family_id:
            return family
    raise ValueError(f"Unknown family id: {family_id}")


def build_acceptance(
    request: dict[str, Any],
    result: dict[str, Any],
    *,
    family_id: str,
) -> dict[str, Any]:
    family = get_result_family(result, family_id)
    if normalize_text(family.get("kind")) != "exact":
        raise ValueError("Only exact families can be accepted in the vertical slice.")
    if family.get("publicationReady") is not True:
        raise ValueError("Only publication-ready families can be accepted.")
    solve_graph = family.get("canonicalCandidate", {}).get("solveGraph")
    if not isinstance(solve_graph, dict):
        raise ValueError("Accepted family is missing a solve graph.")
    return {
        "schema": PDGSOLVE_ACCEPTANCE_SCHEMA,
        "problemId": normalize_text(result.get("problemId")),
        "familyId": normalize_text(family.get("familyId")),
        "resultDigest": digest_json(result),
        "acceptedScore": clone_json(family["score"]),
        "acceptedDiagnostics": clone_json(family.get("diagnostics", [])),
        "acceptedState": "accepted",
        "lockedNormalizationSummary": {
            "addedSupportOccurrences": [],
            "diagnostics": [],
        },
        "lockedPolicySummary": clone_json(request.get("policy", {})),
        "lockedReactantAssemblies": clone_json(family["reactantAssemblies"]),
        "lockedReactantSideOperators": clone_json(family["reactantSideOperators"]),
        "lockedIntermediateAssemblies": clone_json(family["intermediateAssemblies"]),
        "lockedProductSideOperators": clone_json(family["productSideOperators"]),
        "lockedProductAssemblies": clone_json(family["productAssemblies"]),
        "lockedProvenanceSummary": clone_json(family["provenanceSummary"]),
        "lockedSolveGraph": clone_json(solve_graph),
    }


def build_occurrence_count_map_from_acceptance(
    acceptance: dict[str, Any],
) -> dict[str, dict[str, int]]:
    occurrence_counts: dict[str, dict[str, int]] = {}
    for unit in acceptance.get("lockedSolveGraph", {}).get("units", []):
        if normalize_text(unit.get("kind")) != "assembly":
            continue
        occurrence_key = normalize_text(unit.get("occurrenceKey"))
        recipe_id = normalize_text(unit.get("recipeId"))
        if not occurrence_key or not recipe_id:
            continue
        if recipe_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            occurrence_counts[occurrence_key] = build_primitive_counts(
                unit.get("electrinoCount"),
                unit.get("positrinoCount"),
            )
            continue
        metadata = ASSEMBLY_DISPLAY.get(recipe_id)
        if metadata is None:
            continue
        occurrence_counts[occurrence_key] = build_primitive_counts(
            metadata["electrinoCount"],
            metadata["positrinoCount"],
        )
    return occurrence_counts


def build_operator_choice_map(acceptance: dict[str, Any]) -> dict[str, dict[str, Any]]:
    choice_map: dict[str, dict[str, Any]] = {}
    for choice in acceptance.get("lockedReactantSideOperators", []):
        choice_map[normalize_text(choice.get("id"))] = choice
    for choice in acceptance.get("lockedProductSideOperators", []):
        choice_map[normalize_text(choice.get("id"))] = choice
    return choice_map


def operator_counts_from_choice(
    choice: dict[str, Any],
    occurrence_counts: dict[str, dict[str, int]],
) -> tuple[int, int]:
    totals = sum_counts_for_occurrence_keys(choice.get("inputOccurrenceKeys", []), occurrence_counts)
    if totals is None:
        return 0, 0
    return totals["positrinoCount"], totals["electrinoCount"]


def build_pdgedit_document_from_acceptance(
    acceptance: dict[str, Any],
    *,
    document_id: str | None = None,
    document_title: str | None = None,
) -> dict[str, Any]:
    solve_graph = acceptance["lockedSolveGraph"]
    occurrence_counts = build_occurrence_count_map_from_acceptance(acceptance)
    operator_choice_map = build_operator_choice_map(acceptance)
    assemblies = []
    operators = []
    for unit in solve_graph.get("units", []):
        stage = normalize_text(unit.get("stage"))
        x = PDGEDIT_X_BY_STAGE[stage]
        y = int(unit.get("anchorRow", 0))
        if normalize_text(unit.get("kind")) == "assembly":
            assembly_id = normalize_text(unit.get("recipeId"))
            metadata = ASSEMBLY_DISPLAY[assembly_id]
            assemblies.append(
                {
                    "id": normalize_text(unit.get("id")),
                    "type": metadata["pdgeditType"],
                    "x": x,
                    "y": y,
                    "title": metadata["title"],
                    "role": {
                        "reactantAssemblies": "reactant",
                        "intermediateAssemblies": "intermediate",
                        "productAssemblies": "product",
                    }[stage],
                    "tiles": clone_json(metadata["tiles"]),
                    **(
                        {
                            "sampleCounts": {
                                "topCount": str(int(unit.get("electrinoCount", 0))),
                                "bottomCount": str(int(unit.get("positrinoCount", 0))),
                            }
                        }
                        if normalize_text(unit.get("recipeId")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
                        else {}
                    ),
                }
            )
            continue
        if normalize_text(unit.get("kind")) == "operator":
            choice = operator_choice_map[normalize_text(unit.get("occurrenceKey"))]
            positrino_count, electrino_count = operator_counts_from_choice(
                choice,
                occurrence_counts,
            )
            operators.append(
                {
                    "id": normalize_text(unit.get("id")),
                    "type": normalize_text(unit.get("recipeId")),
                    "x": x,
                    "y": y,
                    "title": normalize_text(unit.get("title")),
                    "positrinoCount": positrino_count,
                    "electrinoCount": electrino_count,
                }
            )

    links = [
        {
            "id": f"edge_{normalize_text(edge.get('id'))}",
            "endpointA": normalize_text(edge.get("fromUnitId")),
            "endpointB": normalize_text(edge.get("toUnitId")),
        }
        for edge in solve_graph.get("edges", [])
    ]
    reactant_recipe_ids = [
        normalize_text(unit.get("recipeId"))
        for unit in solve_graph.get("units", [])
        if normalize_text(unit.get("stage")) == "reactantAssemblies"
    ]
    product_recipe_ids = [
        normalize_text(unit.get("recipeId"))
        for unit in solve_graph.get("units", [])
        if normalize_text(unit.get("stage")) == "productAssemblies"
    ]
    composite_labels = []
    if reactant_recipe_ids == ["pro_down_quark_I", "pro_up_quark_I", "pro_down_quark_I"]:
        composite_labels.append(
            {
                "id": "label.left.neutron",
                "type": "pro-neutron-composite",
                "side": "left",
                "text": "Neutron",
                "rowStart": 0,
                "rowEnd": 2,
            }
        )
    if product_recipe_ids[:3] == ["pro_up_quark_I", "pro_down_quark_I", "pro_up_quark_I"]:
        composite_labels.append(
            {
                "id": "label.right.proton",
                "type": "pro-proton-composite",
                "side": "right",
                "text": "Proton",
                "rowStart": 0,
                "rowEnd": 2,
            }
        )
    _ = document_id, document_title
    return {
        "schema": PDGEDIT_SCHEMA,
        "assemblies": assemblies,
        "operators": operators,
        "links": links,
        "compositeLabels": composite_labels,
    }


def build_pdgedit_package(
    acceptance: dict[str, Any],
    pdgedit_document: dict[str, Any],
    *,
    document_id: str | None = None,
    document_title: str | None = None,
    publication_mode: str = "durable",
    document_path: str = "",
) -> dict[str, Any]:
    resolved_document_id = normalize_text(document_id) or (
        f"{normalize_text(acceptance.get('problemId'))}--{normalize_text(acceptance.get('familyId'))}"
    )
    resolved_document_title = normalize_text(document_title) or resolved_document_id
    resolved_document_path = normalize_text(document_path) or (
        f"content/contracts/generated/pdgedit/{resolved_document_id}.v1.json"
    )
    return {
        "schema": PDGSOLVE_PDGEDIT_PACKAGE_SCHEMA,
        "sourceAcceptanceDigest": digest_json(acceptance),
        "publicationMode": publication_mode,
        "documentId": resolved_document_id,
        "documentTitle": resolved_document_title,
        "pdgeditDocument": clone_json(pdgedit_document),
        "manifestEntry": {
            "id": resolved_document_id,
            "title": resolved_document_title,
            "displayTitle": resolved_document_title,
            "sourceKind": "exact",
            "documentPath": resolved_document_path,
        },
    }


def build_pdgedit_manifest_entry(
    *,
    document_id: str,
    document_title: str,
    document_path: str,
    source_kind: str = "exact",
    is_default: bool = False,
) -> dict[str, Any]:
    entry = {
        "id": document_id,
        "title": document_title,
        "displayTitle": document_title,
        "sourceKind": source_kind,
        "documentPath": document_path,
    }
    if is_default:
        entry["isDefault"] = True
    return entry


def build_pdgedit_library_manifest(
    entries: list[dict[str, Any]],
    *,
    default_entry_id: str = "",
) -> dict[str, Any]:
    return {
        "schema": "pdgedit-library-manifest/v1",
        "defaultEntryId": default_entry_id,
        "entries": entries,
    }


def build_result_corpus_index(
    manifest: dict[str, Any],
    result_records: list[dict[str, Any]],
) -> dict[str, Any]:
    exact_available_count = sum(
        1 for record in result_records if normalize_text(record.get("searchStatus")) == "exact_available"
    )
    partial_only_count = sum(
        1 for record in result_records if normalize_text(record.get("searchStatus")) == "partial_only"
    )
    no_exact_closure_count = sum(
        1 for record in result_records if normalize_text(record.get("searchStatus")) == "no_exact_closure"
    )
    return {
        "schema": "pdgsolve-result-corpus/v1",
        "sourceSchema": normalize_text(manifest.get("schema")),
        "readyCount": int(manifest.get("readyCount", 0) or 0),
        "solvedCount": len(result_records),
        "exactAvailableCount": exact_available_count,
        "partialOnlyCount": partial_only_count,
        "noExactClosureCount": no_exact_closure_count,
        "results": result_records,
    }


def solve_manifest_payload(
    manifest: dict[str, Any],
    *,
    output_dir: Path | None = None,
    pdgedit_output_dir: Path | None = None,
    pdgedit_manifest_path: Path | None = None,
) -> dict[str, Any]:
    result_records: list[dict[str, Any]] = []
    normalized_output_dir = output_dir.resolve() if output_dir is not None else None
    normalized_pdgedit_output_dir = pdgedit_output_dir.resolve() if pdgedit_output_dir is not None else None
    normalized_pdgedit_manifest_path = (
        pdgedit_manifest_path.resolve() if pdgedit_manifest_path is not None else None
    )
    if normalized_output_dir is not None:
        normalized_output_dir.mkdir(parents=True, exist_ok=True)
    if normalized_pdgedit_output_dir is not None:
        normalized_pdgedit_output_dir.mkdir(parents=True, exist_ok=True)
    pdgedit_manifest_entries: list[dict[str, Any]] = []

    for entry in manifest.get("readyEntries", []):
        if not isinstance(entry, dict):
            continue
        request = entry.get("pdgsolveRequest")
        if not isinstance(request, dict):
            continue
        result = solve_request(request)
        case_id = normalize_text(entry.get("caseId")) or slugify(request.get("requestId")) or "case"
        batch_id = int(entry.get("batchId", 0) or 0)
        request_id = normalize_text(request.get("requestId"))
        filename = f"{batch_id:04d}_{slugify(case_id)}.result.v1.json"
        result_path = normalized_output_dir / filename if normalized_output_dir is not None else None
        if result_path is not None:
            write_json(result_path, result)
            try:
                serialized_result_path = str(result_path.relative_to(REPO_ROOT))
            except ValueError:
                serialized_result_path = str(result_path)
        else:
            serialized_result_path = ""
        serialized_pdgedit_document_path = ""
        if (
            normalized_pdgedit_output_dir is not None
            and normalize_text(result.get("searchStatus")) == "exact_available"
            and normalize_text(result.get("bestFamilyId"))
        ):
            acceptance = build_acceptance(
                request,
                result,
                family_id=normalize_text(result.get("bestFamilyId")),
            )
            document_id = f"{normalize_text(result.get('problemId'))}--{normalize_text(result.get('bestFamilyId'))}"
            source_title = normalize_text(request.get("source", {}).get("title"))
            document_title = source_title or normalize_text(request.get("requestId")) or document_id
            pdgedit_document = build_pdgedit_document_from_acceptance(
                acceptance,
                document_id=document_id,
                document_title=document_title,
            )
            pdgedit_filename = f"{batch_id:04d}_{slugify(case_id)}.pdgedit.v1.json"
            pdgedit_document_path = normalized_pdgedit_output_dir / pdgedit_filename
            write_json(pdgedit_document_path, pdgedit_document)
            try:
                serialized_pdgedit_document_path = str(pdgedit_document_path.relative_to(REPO_ROOT))
            except ValueError:
                serialized_pdgedit_document_path = str(pdgedit_document_path)
            pdgedit_manifest_entries.append(
                build_pdgedit_manifest_entry(
                    document_id=document_id,
                    document_title=document_title,
                    document_path=serialized_pdgedit_document_path,
                    source_kind="exact",
                    is_default=not pdgedit_manifest_entries,
                )
            )
        result_records.append(
            {
                "batchId": batch_id,
                "caseId": case_id,
                "proposalId": normalize_text(entry.get("proposalId")),
                "requestId": request_id,
                "problemId": normalize_text(result.get("problemId")),
                "searchStatus": normalize_text(result.get("searchStatus")),
                "bestFamilyId": normalize_text(result.get("bestFamilyId")),
                "resultPath": serialized_result_path,
                **(
                    {"pdgeditDocumentPath": serialized_pdgedit_document_path}
                    if serialized_pdgedit_document_path
                    else {}
                ),
            }
        )

    if normalized_pdgedit_manifest_path is not None:
        write_json(
            normalized_pdgedit_manifest_path,
            build_pdgedit_library_manifest(
                pdgedit_manifest_entries,
                default_entry_id=pdgedit_manifest_entries[0]["id"] if pdgedit_manifest_entries else "",
            ),
        )

    return build_result_corpus_index(manifest, result_records)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Minimal pdgsolve contract tool.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    solve_parser = subparsers.add_parser("solve", help="Solve one explicit pdgsolve request.")
    solve_parser.add_argument("request_path", type=Path)
    solve_parser.add_argument("--write", type=Path, default=None)

    accept_parser = subparsers.add_parser(
        "accept", help="Accept one exact family from one pdgsolve result."
    )
    accept_parser.add_argument("request_path", type=Path)
    accept_parser.add_argument("result_path", type=Path)
    accept_parser.add_argument("family_id")
    accept_parser.add_argument("--write", type=Path, default=None)

    manifest_parser = subparsers.add_parser(
        "solve-manifest",
        help="Solve every ready pdgsolve request inside one pdg-live-manifest payload.",
    )
    manifest_parser.add_argument("manifest_path", type=Path)
    manifest_parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_RESULT_CORPUS_OUTPUT_DIR,
    )
    manifest_parser.add_argument(
        "--write-index",
        type=Path,
        default=DEFAULT_RESULT_CORPUS_INDEX_PATH,
    )
    manifest_parser.add_argument(
        "--pdgedit-output-dir",
        type=Path,
        default=DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR,
    )
    manifest_parser.add_argument(
        "--write-pdgedit-manifest",
        type=Path,
        default=DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH,
    )

    publish_parser = subparsers.add_parser(
        "publish", help="Publish one pdgedit document from one acceptance record."
    )
    publish_parser.add_argument("acceptance_path", type=Path)
    publish_parser.add_argument("--write", type=Path, default=None)

    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    if args.command == "solve":
        request = load_json(args.request_path)
        result = solve_request(request)
        if args.write is not None:
            write_json(args.write, result)
            print(args.write)
            return 0
        print_json(result)
        return 0

    if args.command == "accept":
        request = load_json(args.request_path)
        result = load_json(args.result_path)
        acceptance = build_acceptance(request, result, family_id=args.family_id)
        if args.write is not None:
            write_json(args.write, acceptance)
            print(args.write)
            return 0
        print_json(acceptance)
        return 0

    if args.command == "solve-manifest":
        manifest = load_json(args.manifest_path)
        index_payload = solve_manifest_payload(
            manifest,
            output_dir=args.output_dir,
            pdgedit_output_dir=args.pdgedit_output_dir,
            pdgedit_manifest_path=args.write_pdgedit_manifest,
        )
        if args.write_index is not None:
            write_json(args.write_index, index_payload)
            print(args.output_dir)
            print(args.write_index)
            print(args.write_pdgedit_manifest)
            return 0
        print_json(index_payload)
        return 0

    if args.command == "publish":
        acceptance = load_json(args.acceptance_path)
        pdgedit_document = build_pdgedit_document_from_acceptance(acceptance)
        if args.write is not None:
            write_json(args.write, pdgedit_document)
            print(args.write)
            return 0
        print_json(pdgedit_document)
        return 0

    raise AssertionError(f"Unsupported command: {args.command}")


__all__ = [
    "build_acceptance",
    "build_pdgedit_document_from_acceptance",
    "build_pdgedit_package",
    "build_result_corpus_index",
    "count_assemblies",
    "digest_json",
    "dump_json",
    "load_json",
    "main",
    "parse_args",
    "print_json",
    "solve_manifest_payload",
    "solve_request",
    "write_json",
]


if __name__ == "__main__":
    raise SystemExit(main())
