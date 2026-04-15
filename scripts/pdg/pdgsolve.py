#!/usr/bin/env python3
"""Minimal pdgsolve vertical-slice implementation.

This file keeps the first implementation intentionally small:

- consume explicit ``pdgsolve-request/v1`` JSON;
- emit deterministic ``pdgsolve-result/v1`` JSON;
- lock one accepted exact family into ``pdgsolve-acceptance/v1``;
- and publish one final ``pdgedit/v1`` document from that acceptance.

The only exact solve law implemented in this vertical slice is the canonical
free-neutron beta channel:

    d + u + d -> u + d + u + e + anti-nu_e

All other requests still receive a deterministic ``no_exact_closure`` result so
the JSON boundary remains explicit.
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

DEFAULT_VERTICAL_SLICE_TITLE = "Free neutron beta exact"
DEFAULT_VERTICAL_SLICE_REQUEST_ID = "free_neutron_beta_decay"
DEFAULT_VERTICAL_SLICE_PROBLEM_ID = "pdgsolve_problem_free_neutron_beta_exact"
DEFAULT_VERTICAL_SLICE_FAMILY_ID = "family.beta.exact.v1"
DEFAULT_VERTICAL_SLICE_DOCUMENT_ID = (
    f"{DEFAULT_VERTICAL_SLICE_PROBLEM_ID}--{DEFAULT_VERTICAL_SLICE_FAMILY_ID}"
)
DEFAULT_VERTICAL_SLICE_REQUEST_PATH = (
    REPO_ROOT
    / "content"
    / "contracts"
    / "examples"
    / "pdgsolve-request"
    / "v1"
    / "free_neutron_beta_decay.v1.json"
)
DEFAULT_VERTICAL_SLICE_RESULT_PATH = (
    REPO_ROOT
    / "content"
    / "contracts"
    / "examples"
    / "pdgsolve-result"
    / "v1"
    / "free_neutron_beta_exact.v1.json"
)
DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH = (
    REPO_ROOT
    / "content"
    / "contracts"
    / "examples"
    / "pdgsolve-acceptance"
    / "v1"
    / "free_neutron_beta_exact.v1.json"
)
DEFAULT_VERTICAL_SLICE_PDGEDIT_PATH = (
    REPO_ROOT
    / "content"
    / "contracts"
    / "examples"
    / "pdgedit"
    / "pdgsolve_free_neutron_beta_exact.v1.json"
)
DEFAULT_VERTICAL_SLICE_PDGEDIT_PACKAGE_PATH = (
    REPO_ROOT
    / "content"
    / "contracts"
    / "examples"
    / "pdgsolve-pdgedit-package"
    / "v1"
    / "free_neutron_beta_exact.v1.json"
)
DEFAULT_TMP_DIR = REPO_ROOT / ".tmp" / "pdgsolve"
DEFAULT_RESULT_CORPUS_OUTPUT_DIR = DEFAULT_TMP_DIR / "results"
DEFAULT_RESULT_CORPUS_INDEX_PATH = DEFAULT_TMP_DIR / "result-corpus.v1.json"

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


def get_vertical_slice_request() -> dict[str, Any]:
    return {
        "schema": PDGSOLVE_REQUEST_SCHEMA,
        "requestId": DEFAULT_VERTICAL_SLICE_REQUEST_ID,
        "source": {
            "kind": "pdgfeed",
            "title": "Free neutron beta decay",
            "sourceDocumentId": "pdg-proposal:free_neutron_beta_decay",
        },
        "reactants": [
            {
                "id": "reactant_neutron_1.row.1",
                "assemblyId": "pro_down_quark_I",
                "title": "Down Quark",
            },
            {
                "id": "reactant_neutron_1.row.2",
                "assemblyId": "pro_up_quark_I",
                "title": "Up Quark",
            },
            {
                "id": "reactant_neutron_1.row.3",
                "assemblyId": "pro_down_quark_I",
                "title": "Down Quark",
            },
        ],
        "products": [
            {
                "id": "product_proton_1.row.1",
                "assemblyId": "pro_up_quark_I",
                "title": "Up Quark",
            },
            {
                "id": "product_proton_1.row.2",
                "assemblyId": "pro_down_quark_I",
                "title": "Down Quark",
            },
            {
                "id": "product_proton_1.row.3",
                "assemblyId": "pro_up_quark_I",
                "title": "Up Quark",
            },
            {
                "id": "product_pro_electron_2",
                "assemblyId": "pro_electron_I",
                "title": "Electron",
            },
            {
                "id": "product_anti_electron_neutrino_3",
                "assemblyId": "anti_electron_neutrino_I",
                "title": "Anti Electron Neutrino",
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def request_is_vertical_slice_beta(request: dict[str, Any]) -> bool:
    reactant_ids = [normalize_text(record.get("assemblyId")) for record in request.get("reactants", [])]
    product_ids = [normalize_text(record.get("assemblyId")) for record in request.get("products", [])]
    policy = request.get("policy", {})
    return (
        normalize_text(request.get("schema")) == PDGSOLVE_REQUEST_SCHEMA
        and reactant_ids == [
            "pro_down_quark_I",
            "pro_up_quark_I",
            "pro_down_quark_I",
        ]
        and product_ids
        == [
            "pro_up_quark_I",
            "pro_down_quark_I",
            "pro_up_quark_I",
            "pro_electron_I",
            "anti_electron_neutrino_I",
        ]
        and policy.get("exactClosureRequired") is True
        and list(policy.get("allowedBoundaryAugmentations", [])) == ["none"]
    )


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


def build_exact_muon_family(
    request: dict[str, Any],
    *,
    prefix: str,
    family_id: str,
    primary_reactant_assembly_id: str,
    core_product_recipe_ids: list[str],
    support_pair_count: int,
    visible_support_pair_count: int = 0,
) -> dict[str, Any]:
    reactants = list(request["reactants"])
    products = list(request["products"])
    primary_reactant_id = normalize_text(reactants[0]["id"])
    product_ids = [normalize_text(record["id"]) for record in products]
    core_product_ids = product_ids[: len(core_product_recipe_ids)]
    visible_product_ids = product_ids[len(core_product_recipe_ids) :]
    support_rows = [
        {"rowAssemblyId": "pro_noether_core_I", "count": support_pair_count},
        {"rowAssemblyId": "anti_noether_core_I", "count": support_pair_count},
    ]
    visible_passthru_pairs: list[tuple[str, str]] = []
    if visible_support_pair_count:
        support_reactants = reactants[-(2 * visible_support_pair_count) :]
        for index in range(visible_support_pair_count):
            visible_passthru_pairs.append(
                (
                    normalize_text(support_reactants[2 * index]["id"]),
                    visible_product_ids[2 * index],
                )
            )
            visible_passthru_pairs.append(
                (
                    normalize_text(support_reactants[2 * index + 1]["id"]),
                    visible_product_ids[2 * index + 1],
                )
            )

    reactant_operator_choices = [
        {
            "id": f"reactant_operator.{prefix}.dissociate.1",
            "type": "dissociate",
            "lawId": f"law.{prefix}.v1",
            "requiredSupportRows": support_rows,
            "inputOccurrenceKeys": [primary_reactant_id],
            "outputOccurrenceKeys": [
                f"intermediate_{prefix}.row.{index}"
                for index, _ in enumerate(core_product_ids, start=1)
            ],
        }
    ]
    for offset, (reactant_occurrence_id, _product_occurrence_id) in enumerate(visible_passthru_pairs, start=1):
        reactant_operator_choices.append(
            {
                "id": f"reactant_operator.{prefix}.pass_thru.{offset}",
                "type": "pass-thru",
                "lawId": None,
                "inputOccurrenceKeys": [reactant_occurrence_id],
                "outputOccurrenceKeys": [f"intermediate_{prefix}.support.{offset}"],
            }
        )

    product_operator_choices = []
    for index, product_occurrence_id in enumerate(core_product_ids + visible_product_ids, start=1):
        intermediate_occurrence_key = (
            f"intermediate_{prefix}.row.{index}"
            if index <= len(core_product_ids)
            else f"intermediate_{prefix}.support.{index - len(core_product_ids)}"
        )
        product_operator_choices.append(
            {
                "id": f"product_operator.{prefix}.pass_thru.{index}",
                "type": "pass-thru",
                "lawId": None,
                "inputOccurrenceKeys": [intermediate_occurrence_key],
                "outputOccurrenceKeys": [product_occurrence_id],
            }
        )

    provenance_outputs = []
    for product_occurrence_id in core_product_ids:
        provenance_outputs.append(
            {
                "occurrenceKey": product_occurrence_id,
                "provenanceClass": "active_rewrite",
                "supportSourceRows": clone_json(support_rows),
                "ambiguous": False,
            }
        )
    for product_occurrence_id in visible_product_ids:
        provenance_outputs.append(
            {
                "occurrenceKey": product_occurrence_id,
                "provenanceClass": "pass_thru",
                "supportSourceRows": [],
                "ambiguous": False,
            }
        )

    intermediate_occurrences = [
        *core_product_ids,
        *[product_occurrence_id for _reactant_occurrence_id, product_occurrence_id in visible_passthru_pairs],
    ]
    intermediate_by_occurrence = {
        normalize_text(product["id"]): normalize_text(product["assemblyId"])
        for product in products
    }
    intermediate_counts = count_assemblies(
        [
            {
                "assemblyId": intermediate_by_occurrence[occurrence_id],
            }
            for occurrence_id in intermediate_occurrences
        ]
    )

    publication_recipe_ids = [primary_reactant_assembly_id, *[normalize_text(product["assemblyId"]) for product in products]]
    publication_ready = all_recipe_ids_are_publishable(publication_recipe_ids)
    solve_graph = build_publication_graph_from_linear_plan(
        request,
        prefix=prefix,
        primary_reactant_id=primary_reactant_id,
        core_product_ids=core_product_ids,
        passthru_pairs=visible_passthru_pairs,
    )

    return {
        "familyId": family_id,
        "kind": "exact",
        "score": {
            "exactness": 0,
            "primitiveMismatch": 0,
            "middleMismatch": 0,
            "auxiliaryBurden": support_pair_count,
            "nonIdentityOperatorCount": 1,
            "dissociationCount": 1,
            "ambiguityPenalty": 0,
            "tieBreakKey": prefix,
        },
        "augmentation": {
            "reactantSide": "none",
            "productSide": "none",
        },
        "reactantAssemblies": count_assemblies(reactants),
        "reactantSideOperators": reactant_operator_choices,
        "intermediateAssemblies": intermediate_counts,
        "productSideOperators": product_operator_choices,
        "productAssemblies": count_assemblies(products),
        "provenanceSummary": {
            "summaryText": (
                f"{ASSEMBLY_DISPLAY[primary_reactant_assembly_id]['title']} dissociates into the visible leptonic "
                "products while explicit Noether support rows provide the boundary-completion burden."
            ),
            "outputs": provenance_outputs,
        },
        "diagnostics": [],
        "rawBranchCount": 1,
        "publicationReady": publication_ready,
        "canonicalCandidate": {
            "candidateId": f"candidate.{prefix}.primary",
            "exact": True,
            "reactantAssemblies": count_assemblies(reactants),
            "reactantSideOperators": reactant_operator_choices,
            "intermediateAssemblies": intermediate_counts,
            "productSideOperators": product_operator_choices,
            "productAssemblies": count_assemblies(products),
            "provenanceSummary": {
                "summaryText": (
                    f"{ASSEMBLY_DISPLAY[primary_reactant_assembly_id]['title']} dissociates into the visible leptonic "
                    "products while explicit Noether support rows provide the boundary-completion burden."
                ),
                "outputs": provenance_outputs,
            },
            "solveGraph": solve_graph if publication_ready else None,
        },
    }


def build_exact_family_for_request(request: dict[str, Any]) -> dict[str, Any] | None:
    if request_is_vertical_slice_beta(request):
        return build_exact_beta_family(request)

    reactant_ids = get_request_assembly_ids(request, "reactants")
    product_ids = get_request_assembly_ids(request, "products")
    exact_patterns = [
        {
            "reactants": [
                "pro_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
            ],
            "prefix": "mu_minus_decay",
            "familyId": "family.mu_minus.decay.exact.v1",
            "primaryReactantAssemblyId": "pro_muon_II",
            "coreProductRecipeIds": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
            ],
            "supportPairCount": 2,
            "visibleSupportPairCount": 0,
        },
        {
            "reactants": [
                "pro_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "prefix": "mu_minus_radiative",
            "familyId": "family.mu_minus.radiative.exact.v1",
            "primaryReactantAssemblyId": "pro_muon_II",
            "coreProductRecipeIds": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
            ],
            "supportPairCount": 2,
            "visibleSupportPairCount": 1,
        },
        {
            "reactants": [
                "pro_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
                "anti_electron_I",
                "pro_electron_I",
            ],
            "prefix": "mu_minus_pair",
            "familyId": "family.mu_minus.pair.exact.v1",
            "primaryReactantAssemblyId": "pro_muon_II",
            "coreProductRecipeIds": [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
                "anti_electron_I",
                "pro_electron_I",
            ],
            "supportPairCount": 4,
            "visibleSupportPairCount": 0,
        },
        {
            "reactants": [
                "anti_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
            ],
            "prefix": "mu_plus_decay",
            "familyId": "family.mu_plus.decay.exact.v1",
            "primaryReactantAssemblyId": "anti_muon_II",
            "coreProductRecipeIds": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
            ],
            "supportPairCount": 2,
            "visibleSupportPairCount": 0,
        },
        {
            "reactants": [
                "anti_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "prefix": "mu_plus_radiative",
            "familyId": "family.mu_plus.radiative.exact.v1",
            "primaryReactantAssemblyId": "anti_muon_II",
            "coreProductRecipeIds": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
            ],
            "supportPairCount": 2,
            "visibleSupportPairCount": 1,
        },
        {
            "reactants": [
                "anti_muon_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
            "products": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
                "pro_electron_I",
                "anti_electron_I",
            ],
            "prefix": "mu_plus_pair",
            "familyId": "family.mu_plus.pair.exact.v1",
            "primaryReactantAssemblyId": "anti_muon_II",
            "coreProductRecipeIds": [
                "anti_electron_I",
                "pro_electron_neutrino_I",
                "anti_muon_neutrino_II",
                "pro_electron_I",
                "anti_electron_I",
            ],
            "supportPairCount": 4,
            "visibleSupportPairCount": 0,
        },
    ]
    for pattern in exact_patterns:
        if reactant_ids == pattern["reactants"] and product_ids == pattern["products"]:
            return build_exact_muon_family(
                request,
                prefix=pattern["prefix"],
                family_id=pattern["familyId"],
                primary_reactant_assembly_id=pattern["primaryReactantAssemblyId"],
                core_product_recipe_ids=pattern["coreProductRecipeIds"],
                support_pair_count=pattern["supportPairCount"],
                visible_support_pair_count=pattern["visibleSupportPairCount"],
            )
    return None


def build_exact_beta_publication_graph(request: dict[str, Any]) -> dict[str, Any]:
    reactants = request["reactants"]
    products = request["products"]
    intermediate_occurrences = [
        {
            "occurrenceKey": "intermediate_beta_exact.row.1",
            "assemblyId": "pro_up_quark_I",
            "title": "Pro Up Quark",
            "anchorRow": 0,
            "unitId": "unit_lane3_pro_up_quark_1.row.1",
        },
        {
            "occurrenceKey": "intermediate_beta_exact.row.2",
            "assemblyId": "pro_up_quark_I",
            "title": "Pro Up Quark",
            "anchorRow": 1,
            "unitId": "unit_lane3_pro_up_quark_2.row.2",
        },
        {
            "occurrenceKey": "intermediate_beta_exact.row.3",
            "assemblyId": "pro_down_quark_I",
            "title": "Pro Down Quark",
            "anchorRow": 2,
            "unitId": "unit_lane3_pro_down_quark_1.row.3",
        },
        {
            "occurrenceKey": "intermediate_beta_exact.row.4",
            "assemblyId": "pro_electron_I",
            "title": "Pro Electron",
            "anchorRow": 3,
            "unitId": "unit_lane3_pro_electron_1.row.4",
        },
        {
            "occurrenceKey": "intermediate_beta_exact.row.5",
            "assemblyId": "anti_electron_neutrino_I",
            "title": "Anti Electron Neutrino",
            "anchorRow": 4,
            "unitId": "unit_lane3_anti_electron_neutrino_1.row.5",
        },
    ]
    units = [
        {
            "id": "unit_lane1_pro_down_quark_1.row.1",
            "kind": "assembly",
            "stage": "reactantAssemblies",
            "recipeId": "pro_down_quark_I",
            "occurrenceKey": reactants[0]["id"],
            "title": "Pro Down Quark",
            "anchorRow": 0,
        },
        {
            "id": "unit_lane1_pro_up_quark_1.row.2",
            "kind": "assembly",
            "stage": "reactantAssemblies",
            "recipeId": "pro_up_quark_I",
            "occurrenceKey": reactants[1]["id"],
            "title": "Pro Up Quark",
            "anchorRow": 1,
        },
        {
            "id": "unit_lane1_pro_down_quark_2.row.3",
            "kind": "assembly",
            "stage": "reactantAssemblies",
            "recipeId": "pro_down_quark_I",
            "occurrenceKey": reactants[2]["id"],
            "title": "Pro Down Quark",
            "anchorRow": 2,
        },
        {
            "id": "unit_lane2_dissociate_1",
            "kind": "operator",
            "stage": "reactantSideOperators",
            "recipeId": "dissociate",
            "occurrenceKey": "reactant_operator.beta.dissociate.1",
            "title": "Dissociate",
            "anchorRow": 0,
        },
        {
            "id": "unit_lane2_pass_thru_1",
            "kind": "operator",
            "stage": "reactantSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "reactant_operator.beta.pass_thru.1",
            "title": "Pass Thru",
            "anchorRow": 1,
        },
        {
            "id": "unit_lane2_pass_thru_2",
            "kind": "operator",
            "stage": "reactantSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "reactant_operator.beta.pass_thru.2",
            "title": "Pass Thru",
            "anchorRow": 2,
        },
        *[
            {
                "id": record["unitId"],
                "kind": "assembly",
                "stage": "intermediateAssemblies",
                "recipeId": record["assemblyId"],
                "occurrenceKey": record["occurrenceKey"],
                "title": record["title"],
                "anchorRow": record["anchorRow"],
            }
            for record in intermediate_occurrences
        ],
        {
            "id": "unit_lane4_pass_thru_1",
            "kind": "operator",
            "stage": "productSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "product_operator.beta.pass_thru.1",
            "title": "Pass Thru",
            "anchorRow": 0,
        },
        {
            "id": "unit_lane4_pass_thru_2",
            "kind": "operator",
            "stage": "productSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "product_operator.beta.pass_thru.2",
            "title": "Pass Thru",
            "anchorRow": 1,
        },
        {
            "id": "unit_lane4_pass_thru_3",
            "kind": "operator",
            "stage": "productSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "product_operator.beta.pass_thru.3",
            "title": "Pass Thru",
            "anchorRow": 2,
        },
        {
            "id": "unit_lane4_pass_thru_4",
            "kind": "operator",
            "stage": "productSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "product_operator.beta.pass_thru.4",
            "title": "Pass Thru",
            "anchorRow": 3,
        },
        {
            "id": "unit_lane4_pass_thru_5",
            "kind": "operator",
            "stage": "productSideOperators",
            "recipeId": "pass-thru",
            "occurrenceKey": "product_operator.beta.pass_thru.5",
            "title": "Pass Thru",
            "anchorRow": 4,
        },
        {
            "id": "unit_lane5_pro_up_quark_1.row.1",
            "kind": "assembly",
            "stage": "productAssemblies",
            "recipeId": products[0]["assemblyId"],
            "occurrenceKey": products[0]["id"],
            "title": "Pro Up Quark",
            "anchorRow": 0,
        },
        {
            "id": "unit_lane5_pro_down_quark_1.row.2",
            "kind": "assembly",
            "stage": "productAssemblies",
            "recipeId": products[1]["assemblyId"],
            "occurrenceKey": products[1]["id"],
            "title": "Pro Down Quark",
            "anchorRow": 1,
        },
        {
            "id": "unit_lane5_pro_up_quark_2.row.3",
            "kind": "assembly",
            "stage": "productAssemblies",
            "recipeId": products[2]["assemblyId"],
            "occurrenceKey": products[2]["id"],
            "title": "Pro Up Quark",
            "anchorRow": 2,
        },
        {
            "id": "unit_lane5_pro_electron_1.row.4",
            "kind": "assembly",
            "stage": "productAssemblies",
            "recipeId": products[3]["assemblyId"],
            "occurrenceKey": products[3]["id"],
            "title": "Pro Electron",
            "anchorRow": 3,
        },
        {
            "id": "unit_lane5_anti_electron_neutrino_1.row.5",
            "kind": "assembly",
            "stage": "productAssemblies",
            "recipeId": products[4]["assemblyId"],
            "occurrenceKey": products[4]["id"],
            "title": "Anti Electron Neutrino",
            "anchorRow": 4,
        },
    ]
    edges = [
        {
            "id": "reactant_1_to_operator_1",
            "fromUnitId": "unit_lane1_pro_down_quark_1.row.1",
            "fromPortId": "output",
            "toUnitId": "unit_lane2_dissociate_1",
            "toPortId": "input",
        },
        {
            "id": "reactant_2_to_operator_2",
            "fromUnitId": "unit_lane1_pro_up_quark_1.row.2",
            "fromPortId": "output",
            "toUnitId": "unit_lane2_pass_thru_1",
            "toPortId": "input",
        },
        {
            "id": "reactant_3_to_operator_3",
            "fromUnitId": "unit_lane1_pro_down_quark_2.row.3",
            "fromPortId": "output",
            "toUnitId": "unit_lane2_pass_thru_2",
            "toPortId": "input",
        },
        {
            "id": "operator_1_to_intermediate_1",
            "fromUnitId": "unit_lane2_dissociate_1",
            "fromPortId": "output_a",
            "toUnitId": "unit_lane3_pro_up_quark_1.row.1",
            "toPortId": "input",
        },
        {
            "id": "operator_1_to_intermediate_4",
            "fromUnitId": "unit_lane2_dissociate_1",
            "fromPortId": "output_b",
            "toUnitId": "unit_lane3_pro_electron_1.row.4",
            "toPortId": "input",
        },
        {
            "id": "operator_1_to_intermediate_5",
            "fromUnitId": "unit_lane2_dissociate_1",
            "fromPortId": "output_c",
            "toUnitId": "unit_lane3_anti_electron_neutrino_1.row.5",
            "toPortId": "input",
        },
        {
            "id": "operator_2_to_intermediate_2",
            "fromUnitId": "unit_lane2_pass_thru_1",
            "fromPortId": "output",
            "toUnitId": "unit_lane3_pro_up_quark_2.row.2",
            "toPortId": "input",
        },
        {
            "id": "operator_3_to_intermediate_3",
            "fromUnitId": "unit_lane2_pass_thru_2",
            "fromPortId": "output",
            "toUnitId": "unit_lane3_pro_down_quark_1.row.3",
            "toPortId": "input",
        },
        {
            "id": "intermediate_1_to_product_operator_1",
            "fromUnitId": "unit_lane3_pro_up_quark_1.row.1",
            "fromPortId": "output",
            "toUnitId": "unit_lane4_pass_thru_1",
            "toPortId": "input",
        },
        {
            "id": "intermediate_2_to_product_operator_2",
            "fromUnitId": "unit_lane3_pro_up_quark_2.row.2",
            "fromPortId": "output",
            "toUnitId": "unit_lane4_pass_thru_2",
            "toPortId": "input",
        },
        {
            "id": "intermediate_3_to_product_operator_3",
            "fromUnitId": "unit_lane3_pro_down_quark_1.row.3",
            "fromPortId": "output",
            "toUnitId": "unit_lane4_pass_thru_3",
            "toPortId": "input",
        },
        {
            "id": "intermediate_4_to_product_operator_4",
            "fromUnitId": "unit_lane3_pro_electron_1.row.4",
            "fromPortId": "output",
            "toUnitId": "unit_lane4_pass_thru_4",
            "toPortId": "input",
        },
        {
            "id": "intermediate_5_to_product_operator_5",
            "fromUnitId": "unit_lane3_anti_electron_neutrino_1.row.5",
            "fromPortId": "output",
            "toUnitId": "unit_lane4_pass_thru_5",
            "toPortId": "input",
        },
        {
            "id": "product_operator_1_to_product_1",
            "fromUnitId": "unit_lane4_pass_thru_1",
            "fromPortId": "output",
            "toUnitId": "unit_lane5_pro_up_quark_1.row.1",
            "toPortId": "input",
        },
        {
            "id": "product_operator_2_to_product_2",
            "fromUnitId": "unit_lane4_pass_thru_2",
            "fromPortId": "output",
            "toUnitId": "unit_lane5_pro_down_quark_1.row.2",
            "toPortId": "input",
        },
        {
            "id": "product_operator_3_to_product_3",
            "fromUnitId": "unit_lane4_pass_thru_3",
            "fromPortId": "output",
            "toUnitId": "unit_lane5_pro_up_quark_2.row.3",
            "toPortId": "input",
        },
        {
            "id": "product_operator_4_to_product_4",
            "fromUnitId": "unit_lane4_pass_thru_4",
            "fromPortId": "output",
            "toUnitId": "unit_lane5_pro_electron_1.row.4",
            "toPortId": "input",
        },
        {
            "id": "product_operator_5_to_product_5",
            "fromUnitId": "unit_lane4_pass_thru_5",
            "fromPortId": "output",
            "toUnitId": "unit_lane5_anti_electron_neutrino_1.row.5",
            "toPortId": "input",
        },
    ]
    return {
        "schema": PDGSOLVE_PUBLICATION_GRAPH_SCHEMA,
        "units": units,
        "edges": edges,
    }


def build_exact_beta_family(request: dict[str, Any]) -> dict[str, Any]:
    reactants = request["reactants"]
    products = request["products"]
    reactant_operator_choices = [
        {
            "id": "reactant_operator.beta.dissociate.1",
            "type": "dissociate",
            "lawId": "law.down_quark.beta_decay.v1",
            "inputOccurrenceKeys": [reactants[0]["id"]],
            "outputOccurrenceKeys": [
                "intermediate_beta_exact.row.1",
                "intermediate_beta_exact.row.4",
                "intermediate_beta_exact.row.5",
            ],
        },
        {
            "id": "reactant_operator.beta.pass_thru.1",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": [reactants[1]["id"]],
            "outputOccurrenceKeys": ["intermediate_beta_exact.row.2"],
        },
        {
            "id": "reactant_operator.beta.pass_thru.2",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": [reactants[2]["id"]],
            "outputOccurrenceKeys": ["intermediate_beta_exact.row.3"],
        },
    ]
    product_operator_choices = [
        {
            "id": "product_operator.beta.pass_thru.1",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": ["intermediate_beta_exact.row.1"],
            "outputOccurrenceKeys": [products[0]["id"]],
        },
        {
            "id": "product_operator.beta.pass_thru.2",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": ["intermediate_beta_exact.row.2"],
            "outputOccurrenceKeys": [products[1]["id"]],
        },
        {
            "id": "product_operator.beta.pass_thru.3",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": ["intermediate_beta_exact.row.3"],
            "outputOccurrenceKeys": [products[2]["id"]],
        },
        {
            "id": "product_operator.beta.pass_thru.4",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": ["intermediate_beta_exact.row.4"],
            "outputOccurrenceKeys": [products[3]["id"]],
        },
        {
            "id": "product_operator.beta.pass_thru.5",
            "type": "pass-thru",
            "lawId": None,
            "inputOccurrenceKeys": ["intermediate_beta_exact.row.5"],
            "outputOccurrenceKeys": [products[4]["id"]],
        },
    ]
    provenance_summary = {
        "summaryText": (
            "One down-quark occurrence rewrites into an up quark, electron, and "
            "anti electron neutrino while the remaining quark rows pass through."
        ),
        "outputs": [
            {
                "occurrenceKey": products[0]["id"],
                "provenanceClass": "active_rewrite",
                "supportSourceRows": [],
                "ambiguous": False,
            },
            {
                "occurrenceKey": products[1]["id"],
                "provenanceClass": "pass_thru",
                "supportSourceRows": [],
                "ambiguous": False,
            },
            {
                "occurrenceKey": products[2]["id"],
                "provenanceClass": "pass_thru",
                "supportSourceRows": [],
                "ambiguous": False,
            },
            {
                "occurrenceKey": products[3]["id"],
                "provenanceClass": "active_rewrite",
                "supportSourceRows": [],
                "ambiguous": False,
            },
            {
                "occurrenceKey": products[4]["id"],
                "provenanceClass": "active_rewrite",
                "supportSourceRows": [],
                "ambiguous": False,
            },
        ],
    }
    solve_graph = build_exact_beta_publication_graph(request)
    return {
        "familyId": DEFAULT_VERTICAL_SLICE_FAMILY_ID,
        "kind": "exact",
        "score": {
            "exactness": 0,
            "primitiveMismatch": 0,
            "middleMismatch": 0,
            "auxiliaryBurden": 0,
            "nonIdentityOperatorCount": 1,
            "dissociationCount": 1,
            "ambiguityPenalty": 0,
            "tieBreakKey": "beta_exact_primary",
        },
        "augmentation": {
            "reactantSide": "none",
            "productSide": "none",
        },
        "reactantAssemblies": count_assemblies(reactants),
        "reactantSideOperators": reactant_operator_choices,
        "intermediateAssemblies": [
            {"assemblyId": "pro_up_quark_I", "count": 2},
            {"assemblyId": "pro_down_quark_I", "count": 1},
            {"assemblyId": "pro_electron_I", "count": 1},
            {"assemblyId": "anti_electron_neutrino_I", "count": 1},
        ],
        "productSideOperators": product_operator_choices,
        "productAssemblies": count_assemblies(products),
        "provenanceSummary": provenance_summary,
        "diagnostics": [],
        "rawBranchCount": 2,
        "publicationReady": True,
        "canonicalCandidate": {
            "candidateId": "candidate.beta.exact.primary",
            "exact": True,
            "reactantAssemblies": count_assemblies(reactants),
            "reactantSideOperators": reactant_operator_choices,
            "intermediateAssemblies": [
                {"assemblyId": "pro_up_quark_I", "count": 2},
                {"assemblyId": "pro_down_quark_I", "count": 1},
                {"assemblyId": "pro_electron_I", "count": 1},
                {"assemblyId": "anti_electron_neutrino_I", "count": 1},
            ],
            "productSideOperators": product_operator_choices,
            "productAssemblies": count_assemblies(products),
            "provenanceSummary": provenance_summary,
            "solveGraph": solve_graph,
        },
    }


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
                "No vertical-slice solver law is available for this request, so "
                "pdgsolve emitted a deterministic no-exact-closure family."
            ),
            "outputs": provenance_outputs,
        },
        "diagnostics": [
            make_diagnostic(
                "pdgsolve.search.unsupported_request",
                "search",
                "No exact vertical-slice solve rule is available for this request.",
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
                    "No vertical-slice solver law is available for this request, so "
                    "pdgsolve emitted a deterministic no-exact-closure family."
                ),
                "outputs": provenance_outputs,
            },
            "solveGraph": None,
        },
    }


def build_problem_id(request: dict[str, Any]) -> str:
    if request_is_vertical_slice_beta(request):
        return DEFAULT_VERTICAL_SLICE_PROBLEM_ID
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


def build_occurrence_to_assembly_map(acceptance: dict[str, Any]) -> dict[str, str]:
    occurrence_to_assembly: dict[str, str] = {}
    for unit in acceptance.get("lockedSolveGraph", {}).get("units", []):
        if normalize_text(unit.get("kind")) != "assembly":
            continue
        occurrence_to_assembly[normalize_text(unit.get("occurrenceKey"))] = normalize_text(
            unit.get("recipeId")
        )
    return occurrence_to_assembly


def build_operator_choice_map(acceptance: dict[str, Any]) -> dict[str, dict[str, Any]]:
    choice_map: dict[str, dict[str, Any]] = {}
    for choice in acceptance.get("lockedReactantSideOperators", []):
        choice_map[normalize_text(choice.get("id"))] = choice
    for choice in acceptance.get("lockedProductSideOperators", []):
        choice_map[normalize_text(choice.get("id"))] = choice
    return choice_map


def operator_counts_from_choice(
    choice: dict[str, Any],
    occurrence_to_assembly: dict[str, str],
) -> tuple[int, int]:
    input_keys = [normalize_text(item) for item in choice.get("inputOccurrenceKeys", [])]
    for occurrence_key in input_keys:
        assembly_id = occurrence_to_assembly.get(occurrence_key)
        if assembly_id in ASSEMBLY_DISPLAY:
            metadata = ASSEMBLY_DISPLAY[assembly_id]
            return metadata["positrinoCount"], metadata["electrinoCount"]
    return 0, 0


def build_pdgedit_document_from_acceptance(
    acceptance: dict[str, Any],
    *,
    document_id: str = DEFAULT_VERTICAL_SLICE_DOCUMENT_ID,
    document_title: str = DEFAULT_VERTICAL_SLICE_TITLE,
) -> dict[str, Any]:
    solve_graph = acceptance["lockedSolveGraph"]
    occurrence_to_assembly = build_occurrence_to_assembly_map(acceptance)
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
                }
            )
            continue
        if normalize_text(unit.get("kind")) == "operator":
            choice = operator_choice_map[normalize_text(unit.get("occurrenceKey"))]
            positrino_count, electrino_count = operator_counts_from_choice(
                choice,
                occurrence_to_assembly,
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
    document_id: str = DEFAULT_VERTICAL_SLICE_DOCUMENT_ID,
    document_title: str = DEFAULT_VERTICAL_SLICE_TITLE,
    publication_mode: str = "durable",
    document_path: str = "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
) -> dict[str, Any]:
    return {
        "schema": PDGSOLVE_PDGEDIT_PACKAGE_SCHEMA,
        "sourceAcceptanceDigest": digest_json(acceptance),
        "publicationMode": publication_mode,
        "documentId": document_id,
        "documentTitle": document_title,
        "pdgeditDocument": clone_json(pdgedit_document),
        "manifestEntry": {
            "id": document_id,
            "title": document_title,
            "displayTitle": document_title,
            "documentPath": document_path,
        },
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
) -> dict[str, Any]:
    result_records: list[dict[str, Any]] = []
    normalized_output_dir = output_dir.resolve() if output_dir is not None else None
    if normalized_output_dir is not None:
        normalized_output_dir.mkdir(parents=True, exist_ok=True)

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
            }
        )

    return build_result_corpus_index(manifest, result_records)


def get_vertical_slice_artifacts() -> dict[str, Any]:
    request = get_vertical_slice_request()
    result = solve_request(request)
    acceptance = build_acceptance(request, result, family_id=DEFAULT_VERTICAL_SLICE_FAMILY_ID)
    pdgedit_document = build_pdgedit_document_from_acceptance(acceptance)
    pdgedit_package = build_pdgedit_package(acceptance, pdgedit_document)
    return {
        "request": request,
        "result": result,
        "acceptance": acceptance,
        "pdgeditDocument": pdgedit_document,
        "pdgeditPackage": pdgedit_package,
    }


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Minimal pdgsolve vertical-slice tool.")
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

    publish_parser = subparsers.add_parser(
        "publish", help="Publish one pdgedit document from one acceptance record."
    )
    publish_parser.add_argument("acceptance_path", type=Path)
    publish_parser.add_argument("--write", type=Path, default=None)

    examples_parser = subparsers.add_parser(
        "write-vertical-slice", help="Write the checked-in vertical-slice example artifacts."
    )
    examples_parser.add_argument("--request-path", type=Path, default=DEFAULT_VERTICAL_SLICE_REQUEST_PATH)
    examples_parser.add_argument("--result-path", type=Path, default=DEFAULT_VERTICAL_SLICE_RESULT_PATH)
    examples_parser.add_argument(
        "--acceptance-path",
        type=Path,
        default=DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH,
    )
    examples_parser.add_argument(
        "--pdgedit-path",
        type=Path,
        default=DEFAULT_VERTICAL_SLICE_PDGEDIT_PATH,
    )
    examples_parser.add_argument(
        "--pdgedit-package-path",
        type=Path,
        default=DEFAULT_VERTICAL_SLICE_PDGEDIT_PACKAGE_PATH,
    )

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
        index_payload = solve_manifest_payload(manifest, output_dir=args.output_dir)
        if args.write_index is not None:
            write_json(args.write_index, index_payload)
            print(args.output_dir)
            print(args.write_index)
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

    if args.command == "write-vertical-slice":
        artifacts = get_vertical_slice_artifacts()
        write_json(args.request_path, artifacts["request"])
        write_json(args.result_path, artifacts["result"])
        write_json(args.acceptance_path, artifacts["acceptance"])
        write_json(args.pdgedit_path, artifacts["pdgeditDocument"])
        write_json(args.pdgedit_package_path, artifacts["pdgeditPackage"])
        print(args.request_path)
        print(args.result_path)
        print(args.acceptance_path)
        print(args.pdgedit_path)
        print(args.pdgedit_package_path)
        return 0

    raise AssertionError(f"Unsupported command: {args.command}")


__all__ = [
    "DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH",
    "DEFAULT_VERTICAL_SLICE_DOCUMENT_ID",
    "DEFAULT_VERTICAL_SLICE_FAMILY_ID",
    "DEFAULT_VERTICAL_SLICE_PDGEDIT_PACKAGE_PATH",
    "DEFAULT_VERTICAL_SLICE_PDGEDIT_PATH",
    "DEFAULT_VERTICAL_SLICE_PROBLEM_ID",
    "DEFAULT_VERTICAL_SLICE_REQUEST_PATH",
    "DEFAULT_VERTICAL_SLICE_RESULT_PATH",
    "build_acceptance",
    "build_pdgedit_document_from_acceptance",
    "build_pdgedit_package",
    "build_result_corpus_index",
    "count_assemblies",
    "digest_json",
    "dump_json",
    "get_vertical_slice_artifacts",
    "get_vertical_slice_request",
    "load_json",
    "main",
    "parse_args",
    "print_json",
    "request_is_vertical_slice_beta",
    "solve_manifest_payload",
    "solve_request",
    "write_json",
]


if __name__ == "__main__":
    raise SystemExit(main())
