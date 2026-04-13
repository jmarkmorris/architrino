from __future__ import annotations

import argparse
import csv
import json
import math
import re
import sys
from collections import Counter
from functools import lru_cache
from pathlib import Path
from typing import Any, Sequence

from scripts.pdg.pdgfeed_generic_family import canonicalize_generic_family_name, is_supported_generic_family
from scripts.pdg.pdgfeed_live import connect_pdg, known_reaction_status, load_live_case_by_id, load_live_cases
from scripts.pdg.pdgfeed_model import (
    DEFAULT_OUTPUT_DIR,
    DEFAULT_PDGSOLVE_REQUEST_POLICY,
    DEFAULT_SUPPORTED_REACTION_CSV,
    PDGSOLVE_REQUEST_SCHEMA,
    PDGSOLVE_REQUEST_SCHEMA_PATH,
    PDG_LIVE_MANIFEST_SCHEMA,
    PDG_PROPOSAL_SCHEMA,
    PDG_SOURCE_CONTRACT,
    CaseParticle,
    Proposal,
    PdgCase,
    NormalizedParticipant,
    SUPPORTED_REACTION_CSV_COLUMNS,
)
from scripts.pdg.pdgfeed_registry import (
    REQUEST_ASSEMBLY_COUNTS,
    REQUEST_ASSEMBLY_MAPPINGS,
    canonicalize_pdg_name,
    lookup_particle_mapping,
)


PARTICLE_NAME_PATTERN = re.compile(r"^[A-Za-z0-9_+\-]+$")
DEFAULT_STATS_DIR = Path(__file__).resolve().parents[2] / "stats"
DEFAULT_TMP_DIR = DEFAULT_STATS_DIR
REQUEST_ASSEMBLY_AAA_BY_ID = {
    mapping.canonical_id: mapping.aaa_notation
    for mapping in REQUEST_ASSEMBLY_MAPPINGS
}


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def slugify(text: str) -> str:
    compact = "".join(ch.lower() if ch.isalnum() else "_" for ch in text.strip())
    while "__" in compact:
        compact = compact.replace("__", "_")
    return compact.strip("_") or "item"


def build_inventory(mapping: Any, particle: CaseParticle) -> dict[str, Any]:
    flags = [
        f"canonical-id:{mapping.canonical_id}",
        f"request-translation:{mapping.request_translation}",
    ]
    if particle.pdg_id:
        flags.append(f"pdg-id:{particle.pdg_id}")
    flags.append(f"pdg-name:{mapping.canonical_name}")
    return {
        "electrinoCount": mapping.electrino_count,
        "positrinoCount": mapping.positrino_count,
        "flags": flags,
    }


def build_proposal_source(case: PdgCase) -> dict[str, Any]:
    source = dict(case.source)
    if case.source_kind == "pdg-live":
        source["liveCaseId"] = case.case_id
    source["contract"] = dict(PDG_SOURCE_CONTRACT)
    return source


def normalize_particle(particle: CaseParticle, side: str, ordinal: int) -> tuple[NormalizedParticipant | None, str | None]:
    if is_supported_generic_family(particle.name):
        generic_name = canonicalize_generic_family_name(particle.name)
        return None, f"unsupported:{side}:{generic_name}:generic-family-unresolved"
    canonical_name = canonicalize_pdg_name(particle.name)
    mapping = lookup_particle_mapping(canonical_name)
    if mapping is None:
        return None, f"unsupported:{side}:{canonical_name}:no-v1-mapping"

    label = particle.display_label or mapping.full_name
    participant = NormalizedParticipant(
        participant_id=f"{side}_{slugify(label)}_{ordinal}",
        side=side,
        canonical_name=canonical_name,
        canonical_id=mapping.canonical_id,
        template_id=mapping.template_id,
        label=label,
        aaa_notation=mapping.aaa_notation,
        family=mapping.family,
        generation=mapping.generation,
        polarity=mapping.polarity,
        is_composite=mapping.is_composite,
        inventory=build_inventory(mapping, particle),
        pdg_name=canonical_name,
        pdg_id=particle.pdg_id,
        request_translation=mapping.request_translation,
        request_occurrences=mapping.request_occurrences,
    )
    if not mapping.has_request_transform:
        return participant, f"unsupported:{side}:{canonical_name}:no-pdgsolve-request-v1-mapping"
    if canonical_name == "pi0":
        return participant, "transform:canonical-choice:pi0:u.au:alternate:d.ad"
    return participant, None


def build_proposal(case: PdgCase) -> Proposal:
    notes = list(case.notes)
    reactants: list[NormalizedParticipant] = []
    products: list[NormalizedParticipant] = []

    for ordinal, particle in enumerate(case.reactants, start=1):
        normalized, note = normalize_particle(particle, "reactant", ordinal)
        if normalized is not None:
            reactants.append(normalized)
        if note is not None:
            notes.append(note)

    for ordinal, particle in enumerate(case.products, start=1):
        normalized, note = normalize_particle(particle, "product", ordinal)
        if normalized is not None:
            products.append(normalized)
        if note is not None:
            notes.append(note)

    unsupported_count = sum(1 for note in notes if str(note).startswith("unsupported:"))
    ranking = {
        "rank": 1,
        "score": max(0, 100 - unsupported_count * 20),
        "reasons": [
            f"{case.source_kind}-source",
            "fully-mappable" if unsupported_count == 0 else "contains-unsupported-structure",
        ],
    }
    return Proposal(
        proposal_id=case.proposal_id,
        title=case.title,
        source=build_proposal_source(case),
        reactants=tuple(reactants),
        products=tuple(products),
        ranking=ranking,
        notes=tuple(notes),
    )


def build_pdgsolve_request_source(proposal: Proposal) -> dict[str, str]:
    return {
        "kind": "pdgfeed",
        "title": proposal.title,
        "sourceDocumentId": f"pdg-proposal:{proposal.proposal_id}",
    }


def has_unsupported_transform_notes(notes: tuple[str, ...] | list[str]) -> bool:
    return any(str(note).startswith("unsupported:") for note in notes)


def transform_participants_for_pdgsolve(
    participants: Sequence[NormalizedParticipant],
) -> list[dict[str, str]] | None:
    transformed_rows: list[dict[str, str]] = []
    for participant in participants:
        if not participant.request_occurrences:
            return None
        occurrences = list(participant.to_request_occurrences())
        if any(str(occurrence.get("assemblyId", "")) not in REQUEST_ASSEMBLY_COUNTS for occurrence in occurrences):
            return None
        transformed_rows.extend(occurrences)
    return transformed_rows


def add_minimum_noether_pair_reactants_for_balance(
    reactants: list[dict[str, str]],
    products: list[dict[str, str]],
) -> list[dict[str, str]] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(reactants)
    product_totals = get_pdgsolve_occurrence_primitive_totals(products)
    noether_pair_totals = {
        "electrinoCount": REQUEST_ASSEMBLY_COUNTS["pro_noether_core_I"]["electrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS["anti_noether_core_I"]["electrinoCount"],
        "positrinoCount": REQUEST_ASSEMBLY_COUNTS["pro_noether_core_I"]["positrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS["anti_noether_core_I"]["positrinoCount"],
    }
    if reactant_totals is None or product_totals is None:
        return None

    electrino_deficit = max(0, product_totals["electrinoCount"] - reactant_totals["electrinoCount"])
    positrino_deficit = max(0, product_totals["positrinoCount"] - reactant_totals["positrinoCount"])
    pair_count = max(
        math.ceil(electrino_deficit / noether_pair_totals["electrinoCount"]) if electrino_deficit else 0,
        math.ceil(positrino_deficit / noether_pair_totals["positrinoCount"]) if positrino_deficit else 0,
    )
    if pair_count == 0:
        return reactants

    augmented_reactants = list(reactants)
    for index in range(1, pair_count + 1):
        augmented_reactants.append(
            {
                "id": f"reactant_noether_pair_{index}.row.1",
                "assemblyId": "pro_noether_core_I",
                "title": "Pro Noether Core",
            }
        )
        augmented_reactants.append(
            {
                "id": f"reactant_noether_pair_{index}.row.2",
                "assemblyId": "anti_noether_core_I",
                "title": "Anti Noether Core",
            }
        )
    return augmented_reactants


def add_maximum_noether_pair_products_from_surplus(
    reactants: list[dict[str, str]],
    products: list[dict[str, str]],
) -> list[dict[str, str]] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(reactants)
    product_totals = get_pdgsolve_occurrence_primitive_totals(products)
    noether_pair_totals = {
        "electrinoCount": REQUEST_ASSEMBLY_COUNTS["pro_noether_core_I"]["electrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS["anti_noether_core_I"]["electrinoCount"],
        "positrinoCount": REQUEST_ASSEMBLY_COUNTS["pro_noether_core_I"]["positrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS["anti_noether_core_I"]["positrinoCount"],
    }
    if reactant_totals is None or product_totals is None:
        return None

    electrino_surplus = max(0, reactant_totals["electrinoCount"] - product_totals["electrinoCount"])
    positrino_surplus = max(0, reactant_totals["positrinoCount"] - product_totals["positrinoCount"])
    pair_count = min(
        electrino_surplus // noether_pair_totals["electrinoCount"],
        positrino_surplus // noether_pair_totals["positrinoCount"],
    )
    if pair_count == 0:
        return products

    augmented_products = list(products)
    for index in range(1, pair_count + 1):
        augmented_products.append(
            {
                "id": f"product_noether_pair_{index}.row.1",
                "assemblyId": "pro_noether_core_I",
                "title": "Pro Noether Core",
            }
        )
        augmented_products.append(
            {
                "id": f"product_noether_pair_{index}.row.2",
                "assemblyId": "anti_noether_core_I",
                "title": "Anti Noether Core",
            }
        )
    return augmented_products


def transform_proposal_for_pdgsolve(proposal: Proposal) -> dict[str, list[dict[str, str]]] | None:
    if has_unsupported_transform_notes(proposal.notes):
        return None
    reactants = transform_participants_for_pdgsolve(proposal.reactants)
    products = transform_participants_for_pdgsolve(proposal.products)
    if reactants is None or products is None:
        return None
    reactants = add_minimum_noether_pair_reactants_for_balance(reactants, products)
    if reactants is None:
        return None
    products = add_maximum_noether_pair_products_from_surplus(reactants, products)
    if products is None:
        return None
    return {
        "reactants": reactants,
        "products": products,
    }


def proposal_is_ready_for_pdgsolve(proposal: Proposal) -> bool:
    return transform_proposal_for_pdgsolve(proposal) is not None


def build_pdgsolve_request(proposal: Proposal) -> dict[str, Any] | None:
    transformed = transform_proposal_for_pdgsolve(proposal)
    if transformed is None:
        return None
    request = {
        "schema": PDGSOLVE_REQUEST_SCHEMA,
        "requestId": proposal.proposal_id,
        "source": build_pdgsolve_request_source(proposal),
        "reactants": transformed["reactants"],
        "products": transformed["products"],
        "policy": {
            "exactClosureRequired": DEFAULT_PDGSOLVE_REQUEST_POLICY["exactClosureRequired"],
            "allowedBoundaryAugmentations": list(DEFAULT_PDGSOLVE_REQUEST_POLICY["allowedBoundaryAugmentations"]),
        },
    }
    validate_pdgsolve_request_shape(request)
    return request


def is_type_match(value: Any, expected_type: str) -> bool:
    if expected_type == "array":
        return isinstance(value, list)
    if expected_type == "object":
        return isinstance(value, dict)
    if expected_type == "integer":
        return isinstance(value, int) and not isinstance(value, bool)
    if expected_type == "number":
        return isinstance(value, (int, float)) and not isinstance(value, bool)
    if expected_type == "string":
        return isinstance(value, str)
    if expected_type == "boolean":
        return isinstance(value, bool)
    return False


def validate_against_schema(
    value: Any,
    schema: dict[str, Any],
    path: str = "$",
    errors: list[str] | None = None,
) -> list[str]:
    if errors is None:
        errors = []
    if not isinstance(schema, dict):
        return errors

    if "const" in schema and value != schema["const"]:
        errors.append(f"{path}: expected constant {schema['const']!r}")
        return errors

    enum = schema.get("enum")
    if isinstance(enum, list) and value not in enum:
        allowed = ", ".join(repr(item) for item in enum)
        errors.append(f"{path}: expected one of {allowed}")

    schema_type = schema.get("type")
    if schema_type is not None:
        allowed_types = schema_type if isinstance(schema_type, list) else [schema_type]
        if not any(is_type_match(value, expected_type) for expected_type in allowed_types):
            errors.append(f"{path}: expected type {' | '.join(str(item) for item in allowed_types)}")
            return errors

    if isinstance(value, str) and isinstance(schema.get("minLength"), int) and len(value) < schema["minLength"]:
        errors.append(f"{path}: expected string length >= {schema['minLength']}")

    if isinstance(value, dict):
        properties = schema.get("properties", {})
        required = schema.get("required", [])
        for key in required:
            if key not in value:
                errors.append(f"{path}: missing required property {key}")
        if schema.get("additionalProperties") is False:
            for key in value:
                if key not in properties:
                    errors.append(f"{path}: unexpected property {key}")
        for key, child_schema in properties.items():
            if key in value:
                validate_against_schema(value[key], child_schema, f"{path}.{key}", errors)

    if isinstance(value, list):
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for index, item in enumerate(value):
                validate_against_schema(item, item_schema, f"{path}[{index}]", errors)

    return errors


@lru_cache(maxsize=1)
def load_pdgsolve_request_schema() -> dict[str, Any]:
    return load_json(PDGSOLVE_REQUEST_SCHEMA_PATH)


def validate_pdgsolve_request_shape(request: dict[str, Any]) -> None:
    errors = validate_against_schema(request, load_pdgsolve_request_schema())
    if errors:
        raise ValueError("pdgsolve-request/v1 validation failed:\n" + "\n".join(errors))


def extract_unsupported_particle_names(notes: list[str] | tuple[str, ...]) -> list[str]:
    names: list[str] = []
    for note in notes:
        parts = str(note).split(":")
        if len(parts) < 4 or parts[0] != "unsupported":
            continue
        if parts[1] not in ("reactant", "product"):
            continue
        particle_name = parts[2]
        if particle_name and PARTICLE_NAME_PATTERN.match(particle_name):
            names.append(particle_name)
    return names


def format_proposal_side_aaa(participants: Any) -> str:
    if not isinstance(participants, list):
        return ""
    tokens: list[str] = []
    for participant in participants:
        if not isinstance(participant, dict):
            continue
        aaa_notation = str(participant.get("aaaNotation", "")).strip()
        if not aaa_notation:
            continue
        if str(participant.get("canonicalId", "")) == "neutral_pion":
            aaa_notation = "u.au"
        tokens.append(aaa_notation)
    return ".".join(tokens)


def get_pdgsolve_occurrence_primitive_totals(occurrences: Any) -> dict[str, int] | None:
    if not isinstance(occurrences, list):
        return None
    totals = {"electrinoCount": 0, "positrinoCount": 0}
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            return None
        counts = REQUEST_ASSEMBLY_COUNTS.get(str(occurrence.get("assemblyId", "")))
        if counts is None:
            return None
        totals["electrinoCount"] += counts["electrinoCount"]
        totals["positrinoCount"] += counts["positrinoCount"]
    return totals


def format_primitive_ledger(electrino_count: Any, positrino_count: Any) -> str:
    return f"{electrino_count}.{positrino_count}@"


def format_delta_ledger(
    reactant_electrinos: Any,
    product_electrinos: Any,
    reactant_positrinos: Any,
    product_positrinos: Any,
) -> str:
    return f"{reactant_electrinos - product_electrinos}.{reactant_positrinos - product_positrinos}@"


def format_request_side_aaa(occurrences: Any) -> str:
    if not isinstance(occurrences, list):
        return ""
    tokens: list[str] = []
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            return ""
        aaa_notation = REQUEST_ASSEMBLY_AAA_BY_ID.get(str(occurrence.get("assemblyId", "")), "")
        if not aaa_notation:
            return ""
        tokens.append(aaa_notation)
    return ".".join(tokens)


def build_supported_reaction_csv_row(
    case: PdgCase,
    proposal_payload: dict[str, Any],
    pdgsolve_request: dict[str, Any],
) -> dict[str, str | int] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("reactants", []))
    product_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("products", []))
    if reactant_totals is None or product_totals is None:
        return None

    reactant_names = format_proposal_side_aaa(proposal_payload.get("reactants", []))
    product_names = format_proposal_side_aaa(proposal_payload.get("products", []))
    transformed_reactant_names = format_request_side_aaa(pdgsolve_request.get("reactants", []))
    transformed_product_names = format_request_side_aaa(pdgsolve_request.get("products", []))
    if not reactant_names or not product_names or not transformed_reactant_names or not transformed_product_names:
        return None

    return {
        "known_status": known_reaction_status(case),
        "reaction_id": case.case_id,
        "mcid": int(case.source.get("mcid", 0) or 0),
        "pdg_identifier": str(case.source.get("pdgIdentifier", "")),
        "title": case.title,
        "reactant_names_aaa": reactant_names,
        "product_names_aaa": product_names,
        "transformed_reactant_names_aaa": transformed_reactant_names,
        "transformed_product_names_aaa": transformed_product_names,
        "reactant_electrinos": reactant_totals["electrinoCount"],
        "product_electrinos": product_totals["electrinoCount"],
        "electrino_delta": reactant_totals["electrinoCount"] - product_totals["electrinoCount"],
        "reactant_positrinos": reactant_totals["positrinoCount"],
        "product_positrinos": product_totals["positrinoCount"],
        "positrino_delta": reactant_totals["positrinoCount"] - product_totals["positrinoCount"],
    }


def supported_reaction_sort_key(row: dict[str, str | int]) -> tuple[int, int, int, int, int, str, str]:
    known_rank = 0 if row.get("known_status", "") == "k" else 1
    electrino_delta = int(row.get("electrino_delta", 0) or 0)
    positrino_delta = int(row.get("positrino_delta", 0) or 0)
    return (
        known_rank,
        electrino_delta + positrino_delta,
        electrino_delta,
        positrino_delta,
        int(row.get("mcid", 0) or 0),
        str(row.get("pdg_identifier", "")),
        str(row.get("reaction_id", "")),
    )


def build_supported_reaction_csv_rows(cases: list[PdgCase]) -> list[dict[str, str | int]]:
    rows: list[dict[str, str | int]] = []
    for case in cases:
        proposal = build_proposal(case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        if pdgsolve_request is None:
            continue
        row = build_supported_reaction_csv_row(case, proposal.to_dict(), pdgsolve_request)
        if row is not None:
            rows.append(row)
    return sorted(rows, key=supported_reaction_sort_key)


def build_live_manifest_payload(
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> dict[str, Any]:
    api = api or connect_pdg(database_url, pedantic=False)
    ready_entries: list[dict[str, Any]] = []
    blocked_entries: list[dict[str, Any]] = []
    blocked_particle_counts: Counter[str] = Counter()

    for live_case in load_live_cases(database_url, api=api):
        proposal = build_proposal(live_case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        blocked_names = extract_unsupported_particle_names(proposal.notes)
        blocked_particle_counts.update(blocked_names)
        entry = {
            "batchId": 0,
            "knownStatus": known_reaction_status(live_case),
            "caseId": live_case.case_id,
            "proposalId": proposal.proposal_id,
            "title": live_case.title,
            "mcid": int(live_case.source.get("mcid", 0) or 0),
            "lookupParticleName": str(live_case.source.get("lookupParticleName", "")),
            "pdgIdentifier": str(live_case.source.get("pdgIdentifier", "")),
            "channelDescription": str(live_case.source.get("channelDescription", "")),
            "branchingDisplay": str(live_case.source.get("branchingDisplay", "")),
            "blockedParticles": blocked_names,
            "proposal": proposal.to_dict(),
        }
        if pdgsolve_request is None:
            blocked_entries.append(entry)
            continue
        entry["pdgsolveRequest"] = pdgsolve_request
        ready_entries.append(entry)

    for index, entry in enumerate(ready_entries, start=1):
        entry["batchId"] = index

    top_blocked_particles = [
        {"particle": particle_name, "count": count}
        for particle_name, count in sorted(
            blocked_particle_counts.items(),
            key=lambda item: (-item[1], item[0]),
        )[:5]
    ]

    return {
        "schema": PDG_LIVE_MANIFEST_SCHEMA,
        "edition": str(getattr(api, "edition", "")),
        "readyCount": len(ready_entries),
        "blockedCount": len(blocked_entries),
        "topBlockedParticles": top_blocked_particles,
        "readyEntries": ready_entries,
        "blockedEntries": blocked_entries,
    }


def build_live_supported_reaction_csv_rows(
    database_url: str | None = None,
    *,
    api: Any | None = None,
    manifest: dict[str, Any] | None = None,
) -> list[dict[str, str | int]]:
    manifest = manifest or build_live_manifest_payload(database_url, api=api)
    rows: list[dict[str, str | int]] = []
    for entry in manifest.get("readyEntries", []):
        if not isinstance(entry, dict):
            continue
        case = PdgCase(
            case_id=str(entry.get("caseId", "")),
            proposal_id=str(entry.get("proposalId", "")),
            title=str(entry.get("title", "")),
            source_kind="pdg-live",
            source={
                "mcid": int(entry.get("mcid", 0) or 0),
                "pdgIdentifier": str(entry.get("pdgIdentifier", "")),
                "knownStatus": str(entry.get("knownStatus", "u")),
            },
            reactants=(),
            products=(),
        )
        row = build_supported_reaction_csv_row(case, entry.get("proposal", {}), entry.get("pdgsolveRequest", {}))
        if row is not None:
            rows.append(row)
    return sorted(rows, key=supported_reaction_sort_key)


def build_live_reaction_summary_rows(
    database_url: str | None = None,
    *,
    source: str = "pdg-reactions",
    api: Any | None = None,
) -> list[tuple[str, int]]:
    if source != "pdg-reactions":
        raise ValueError(f"Unsupported source: {source}")
    api = api or connect_pdg(database_url, pedantic=False)
    manifest = build_live_manifest_payload(database_url, api=api)
    supported_rows = build_live_supported_reaction_csv_rows(database_url, api=api, manifest=manifest)
    total_reaction_count = int(manifest.get("readyCount", 0) or 0) + int(manifest.get("blockedCount", 0) or 0)
    delta_counts: Counter[int] = Counter()
    for row in supported_rows:
        electrino_value = row.get("electrino_delta", -1)
        positrino_value = row.get("positrino_delta", -1)
        electrino_delta = -1 if electrino_value is None else int(electrino_value)
        positrino_delta = -1 if positrino_value is None else int(positrino_value)
        if electrino_delta == positrino_delta and 0 <= electrino_delta <= 5:
            delta_counts[electrino_delta] += 1

    rows: list[tuple[str, int]] = [
        ("Number of total PDG reactions", total_reaction_count),
        ("Number of PDG reactions supported and transformed into AAA", len(supported_rows)),
    ]
    rows.extend(
        (f"Number of reactions leaving {count}/{count} architrinos", delta_counts[count])
        for count in range(0, 6)
    )
    rows.extend(
        [
            ("Number of reactions ready", int(manifest.get("readyCount", 0) or 0)),
            ("Number of reactions blocked", int(manifest.get("blockedCount", 0) or 0)),
        ]
    )
    return rows


def write_supported_reaction_csv(path: Path, rows: list[dict[str, str | int]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=SUPPORTED_REACTION_CSV_COLUMNS)
        writer.writeheader()
        writer.writerows(
            {
                column: row.get(column, "")
                for column in SUPPORTED_REACTION_CSV_COLUMNS
            }
            for row in rows
        )


def format_output_path(path: Path) -> str:
    repo_root = Path(__file__).resolve().parents[2]
    try:
        return str(path.relative_to(repo_root))
    except ValueError:
        return str(path)


def proposal_output_path(proposal_id: str, output_dir: Path) -> Path:
    return output_dir / f"{proposal_id}.proposal.v1.json"


def request_output_path(proposal_id: str, output_dir: Path) -> Path:
    return output_dir / f"{proposal_id}.pdgsolve-request.v1.json"


def write_proposal_artifact(case: PdgCase, output_dir: Path) -> Path:
    proposal = build_proposal(case)
    path = proposal_output_path(proposal.proposal_id, output_dir)
    write_json(path, proposal.to_dict())
    return path


def write_request_artifacts(case: PdgCase, output_dir: Path) -> list[Path]:
    proposal = build_proposal(case)
    pdgsolve_request = build_pdgsolve_request(proposal)
    if pdgsolve_request is None:
        raise ValueError(f"Reaction {case.case_id!r} does not currently emit pdgsolve-request/v1.")

    proposal_path = proposal_output_path(proposal.proposal_id, output_dir)
    request_path = request_output_path(proposal.proposal_id, output_dir)
    write_json(proposal_path, proposal.to_dict())
    write_json(request_path, pdgsolve_request)
    return [proposal_path, request_path]


def build_cases_by_source(
    source: str,
    database_url: str | None = None,
) -> list[PdgCase]:
    if source != "pdg-reactions":
        raise SystemExit(f"Unsupported source: {source}")
    api = connect_pdg(database_url, pedantic=False)
    return load_live_cases(database_url, api=api)


def format_list_channel_description(case: PdgCase) -> str:
    channel_description = str(case.source.get("channelDescription", "")).strip()
    if channel_description:
        return channel_description
    reactants = " + ".join(str(particle.display_label or particle.name).strip() for particle in case.reactants if str(particle.display_label or particle.name).strip())
    products = " + ".join(str(particle.display_label or particle.name).strip() for particle in case.products if str(particle.display_label or particle.name).strip())
    if reactants or products:
        return f"{reactants} -> {products}".strip()
    return ""


def sanitize_tsv_field(value: Any) -> str:
    return str(value).replace("\t", " ").replace("\n", " ").strip()


def list_markdown_output_path(source: str) -> Path:
    return DEFAULT_TMP_DIR / f"pdgfeed.list.{slugify(source)}.md"


def supported_markdown_output_path(source: str) -> Path:
    return DEFAULT_TMP_DIR / f"pdgfeed.supported.{slugify(source)}.md"


def summary_markdown_output_path(source: str) -> Path:
    return DEFAULT_TMP_DIR / f"pdgfeed.summary.{slugify(source)}.md"


def escape_markdown_table_cell(value: Any) -> str:
    return (
        str(value)
        .replace("\\", r"\\")
        .replace("|", r"\|")
        .replace("[", "&#91;")
        .replace("]", "&#93;")
        .replace("\n", " ")
        .strip()
    )


def write_markdown_table(path: Path, headers: Sequence[str], rows: Sequence[Sequence[Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    header_row = "| " + " | ".join(escape_markdown_table_cell(header) for header in headers) + " |"
    divider_row = "| " + " | ".join("---" for _ in headers) + " |"
    body_rows = [
        "| " + " | ".join(escape_markdown_table_cell(cell) for cell in row) + " |"
        for row in rows
    ]
    lines = [header_row, divider_row, *body_rows]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_list_row_cells(case: PdgCase) -> tuple[str, str, str, str, str, str, str]:
    proposal = build_proposal(case)
    status = "ready" if proposal_is_ready_for_pdgsolve(proposal) else "blocked"
    return (
        known_reaction_status(case),
        sanitize_tsv_field(int(case.source.get("mcid", 0) or 0)),
        sanitize_tsv_field(case.source.get("pdgIdentifier", "")),
        sanitize_tsv_field(case.case_id),
        sanitize_tsv_field(case.title),
        sanitize_tsv_field(format_list_channel_description(case)),
        status,
    )


def write_supported_reaction_markdown(path: Path, rows: Sequence[dict[str, str | int]]) -> None:
    write_markdown_table(
        path,
        (
            "K/U",
            "Reaction ID",
            "PDG ID",
            "Title",
            "Reactant AAA",
            "Product AAA",
            "Transformed Reactant AAA",
            "Transformed Product AAA",
            "Reactant Ledger",
            "Product Ledger",
            "Delta Ledger",
        ),
        [
            (
                row.get("known_status", ""),
                row.get("reaction_id", ""),
                row.get("pdg_identifier", ""),
                row.get("title", ""),
                row.get("reactant_names_aaa", ""),
                row.get("product_names_aaa", ""),
                row.get("transformed_reactant_names_aaa", ""),
                row.get("transformed_product_names_aaa", ""),
                format_primitive_ledger(
                    row.get("reactant_electrinos", ""),
                    row.get("reactant_positrinos", ""),
                ),
                format_primitive_ledger(
                    row.get("product_electrinos", ""),
                    row.get("product_positrinos", ""),
                ),
                format_delta_ledger(
                    row.get("reactant_electrinos", ""),
                    row.get("product_electrinos", ""),
                    row.get("reactant_positrinos", ""),
                    row.get("product_positrinos", ""),
                ),
            )
            for row in rows
        ],
    )


def write_live_reaction_summary_markdown(path: Path, rows: Sequence[tuple[str, int]]) -> None:
    write_markdown_table(
        path,
        ("Metric", "Count"),
        rows,
    )


def write_live_reaction_summary_report(
    source: str,
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> Path:
    rows = build_live_reaction_summary_rows(database_url, source=source, api=api)
    path = summary_markdown_output_path(source)
    write_live_reaction_summary_markdown(path, rows)
    return path


def resolve_case_by_source(
    source: str,
    reaction_id: str,
    database_url: str | None = None,
) -> PdgCase:
    if source == "pdg-reactions":
        try:
            return load_live_case_by_id(reaction_id, database_url)
        except LookupError as exc:
            raise SystemExit(str(exc)) from exc

    raise SystemExit(f"Unsupported source: {source}")


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="List PDG reactions, build proposals, emit pdgsolve requests, and prepare live manifests."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Directory where generated JSON artifacts are written.",
    )
    parser.add_argument(
        "--database-url",
        help="Optional database URL passed through to pdg.connect(...) for PDG database reads.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_parser = subparsers.add_parser("list", help="List reaction ids and titles from the selected source.")
    list_parser.add_argument(
        "--source",
        choices=("pdg-reactions",),
        default="pdg-reactions",
        help="Choose the reaction source.",
    )

    proposal_parser = subparsers.add_parser("proposal", help="Emit one pdg-proposal/v1 payload for a reaction.")
    proposal_parser.add_argument("reaction_id", help="Reaction id from the selected source.")
    proposal_parser.add_argument(
        "--source",
        choices=("pdg-reactions",),
        default="pdg-reactions",
        help="Choose the reaction source.",
    )
    proposal_parser.add_argument(
        "--write",
        action="store_true",
        help="Write the proposal artifact to --output-dir instead of printing JSON to stdout.",
    )

    request_parser = subparsers.add_parser(
        "request",
        help="Emit one pdgsolve-request/v1 payload for a reaction when its PDG participants transform fully into admitted assembly rows.",
    )
    request_parser.add_argument("reaction_id", help="Reaction id from the selected source.")
    request_parser.add_argument(
        "--source",
        choices=("pdg-reactions",),
        default="pdg-reactions",
        help="Choose the reaction source.",
    )
    request_parser.add_argument(
        "--write",
        action="store_true",
        help="Write proposal plus request artifacts to --output-dir instead of printing JSON to stdout.",
    )

    subparsers.add_parser("manifest", help="Print one pdg-live-manifest/v1 payload.")

    supported_csv_parser = subparsers.add_parser(
        "supported-csv",
        help="Write a primitive-count CSV summary for reactions ready for pdgsolve after transform.",
    )
    supported_csv_parser.add_argument(
        "csv_path",
        nargs="?",
        type=Path,
        default=DEFAULT_SUPPORTED_REACTION_CSV,
        help="Path where the supported reaction CSV is written.",
    )
    supported_csv_parser.add_argument(
        "--source",
        choices=("pdg-reactions",),
        default="pdg-reactions",
        help="Choose the reaction source.",
    )

    return parser.parse_args(argv)


def print_json(payload: dict[str, Any]) -> None:
    json.dump(payload, sys.stdout, indent=2)
    sys.stdout.write("\n")


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(argv)

    if args.command == "list":
        cases = build_cases_by_source(args.source, args.database_url)
        output_path = list_markdown_output_path(args.source)
        write_markdown_table(
            output_path,
            ("K/U", "MCID", "PDG ID", "Reaction ID", "Title", "Channel", "Status"),
            [build_list_row_cells(case) for case in cases],
        )
        print(format_output_path(output_path))
        return 0

    if args.command == "proposal":
        case = resolve_case_by_source(args.source, args.reaction_id, args.database_url)
        if args.write:
            print(format_output_path(write_proposal_artifact(case, args.output_dir)))
            return 0
        print_json(build_proposal(case).to_dict())
        return 0

    if args.command == "request":
        case = resolve_case_by_source(args.source, args.reaction_id, args.database_url)
        proposal = build_proposal(case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        if pdgsolve_request is None:
            raise SystemExit(
                f"PDG reaction {args.reaction_id!r} is not ready for pdgsolve because its participants do not yet transform fully into admitted assembly rows."
            )
        if args.write:
            for path in write_request_artifacts(case, args.output_dir):
                print(format_output_path(path))
            return 0
        print_json(pdgsolve_request)
        return 0

    if args.command == "manifest":
        print_json(build_live_manifest_payload(args.database_url))
        return 0

    if args.command == "supported-csv":
        rows = build_live_supported_reaction_csv_rows(args.database_url)
        write_supported_reaction_csv(args.csv_path, rows)
        markdown_path = supported_markdown_output_path(args.source)
        write_supported_reaction_markdown(markdown_path, rows)
        print(format_output_path(args.csv_path))
        print(format_output_path(markdown_path))
        return 0

    raise SystemExit(f"Unsupported command: {args.command}")
