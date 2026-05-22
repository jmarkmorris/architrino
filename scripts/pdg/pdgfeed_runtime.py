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
from scripts.pdg.pdgfeed_live import (
    connect_pdg,
    iter_candidate_branching_fractions,
    iter_live_particles,
    known_reaction_status,
    load_live_case_by_id,
    load_live_cases,
    normalize_branching_probability_from_display,
)
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
REQUEST_ASSEMBLY_TITLE_BY_ID = {
    mapping.canonical_id: mapping.full_name
    for mapping in REQUEST_ASSEMBLY_MAPPINGS
}
UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID = "unbound_architrinos_residue"
UNBOUND_ARCHITRINOS_RESIDUE_TITLE = "Unbound Architrinos"
PDGEDIT_APP_MIN_BRANCHING_PROBABILITY = 0.20
NOETHER_SWARM_GENERATIONS = ("I", "II", "III")
NOETHER_PAIR_PRIMITIVE_TOTALS_BY_GENERATION = {
    generation: {
        "electrinoCount": REQUEST_ASSEMBLY_COUNTS[f"pro_noether_swarm_{generation}"]["electrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS[f"anti_noether_swarm_{generation}"]["electrinoCount"],
        "positrinoCount": REQUEST_ASSEMBLY_COUNTS[f"pro_noether_swarm_{generation}"]["positrinoCount"]
        + REQUEST_ASSEMBLY_COUNTS[f"anti_noether_swarm_{generation}"]["positrinoCount"],
    }
    for generation in NOETHER_SWARM_GENERATIONS
}
NOETHER_PAIR_PRIMITIVE_TOTALS = NOETHER_PAIR_PRIMITIVE_TOTALS_BY_GENERATION["I"]
NOETHER_SWARM_ASSEMBLY_IDS = tuple(
    assembly_id
    for generation in NOETHER_SWARM_GENERATIONS
    for assembly_id in (f"pro_noether_swarm_{generation}", f"anti_noether_swarm_{generation}")
)
NOETHER_SWARM_SUCCESSOR = {
    "pro_noether_swarm_I": "pro_noether_swarm_II",
    "anti_noether_swarm_I": "anti_noether_swarm_II",
    "pro_noether_swarm_II": "pro_noether_swarm_III",
    "anti_noether_swarm_II": "anti_noether_swarm_III",
    "pro_noether_swarm_III": None,
    "anti_noether_swarm_III": None,
}
INCOMPLETE_NOTE_MARKERS = (
    "generic-or-textual-item",
    "generic-family-charge-",
    ":generic-family-unresolved",
    ":missing-name",
)
BRANCHING_PROBABILITY_DECILE_LABELS = tuple(
    f"{lower}-{upper}"
    for lower, upper in (
        (90, 100),
        (80, 90),
        (70, 80),
        (60, 70),
        (50, 60),
        (40, 50),
        (30, 40),
        (20, 30),
        (10, 20),
        (0, 10),
    )
)
NO_NUMERIC_BRANCHING_PROBABILITY_LABEL = "No numeric value"


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


def build_reaction_summary_participant(text: Any) -> dict[str, str] | None:
    normalized_text = str(text or "").strip()
    if not normalized_text:
        return None
    return {"text": normalized_text}


def is_noether_swarm_request_occurrence(occurrence: dict[str, Any]) -> bool:
    assembly_id = str(occurrence.get("assemblyId", "")).strip()
    return assembly_id.startswith("pro_noether_swarm_") or assembly_id.startswith("anti_noether_swarm_")


def build_pdg_provenance_reaction_summary_participants(
    participants: Sequence[NormalizedParticipant],
 ) -> tuple[list[dict[str, str]], set[str]]:
    direct_occurrence_ids: set[str] = set()
    pdg_entries: list[dict[str, str]] = []
    for participant in participants:
        if not participant.request_occurrences:
            continue
        participant_occurrences = list(participant.to_request_occurrences())
        for occurrence in participant_occurrences:
            occurrence_id = str(occurrence.get("id", "")).strip()
            if occurrence_id:
                direct_occurrence_ids.add(occurrence_id)
        titles = [
            str(occurrence.get("title", "")).strip()
            for occurrence in participant_occurrences
            if str(occurrence.get("title", "")).strip()
        ]
        if not titles:
            continue
        if len(titles) == 1:
            entry = build_reaction_summary_participant(titles[0])
            if entry is not None:
                pdg_entries.append(entry)
            continue
        if all(is_noether_swarm_request_occurrence(occurrence) for occurrence in participant_occurrences):
            label = str(participant.label or participant.pdg_name or "").strip()
            if label:
                entry = build_reaction_summary_participant(f"{label} [{' + '.join(titles)}]")
                if entry is not None:
                    pdg_entries.append(entry)
                continue
        for title in titles:
            entry = build_reaction_summary_participant(title)
            if entry is not None:
                pdg_entries.append(entry)
    return pdg_entries, direct_occurrence_ids


def build_aaa_added_reaction_summary_participants(
    transformed_occurrences: Sequence[dict[str, Any]],
    direct_occurrence_ids: set[str],
) -> list[dict[str, str]]:
    aaa_entries: list[dict[str, str]] = []
    for occurrence in transformed_occurrences:
        occurrence_id = str(occurrence.get("id", "")).strip()
        if occurrence_id and occurrence_id in direct_occurrence_ids:
            continue
        entry = build_reaction_summary_participant(occurrence.get("title"))
        if entry is not None:
            aaa_entries.append(entry)
    return aaa_entries


def build_pdgsolve_request_reaction_summary(
    proposal: Proposal,
    transformed: dict[str, list[dict[str, Any]]],
) -> dict[str, Any]:
    pdg_reactants, reactant_occurrence_ids = build_pdg_provenance_reaction_summary_participants(
        proposal.reactants,
    )
    pdg_products, product_occurrence_ids = build_pdg_provenance_reaction_summary_participants(
        proposal.products,
    )
    aaa_reactants = build_aaa_added_reaction_summary_participants(
        transformed["reactants"],
        reactant_occurrence_ids,
    )
    aaa_products = build_aaa_added_reaction_summary_participants(
        transformed["products"],
        product_occurrence_ids,
    )
    summary: dict[str, Any] = {
        "title": proposal.title,
        "pdgReactants": pdg_reactants,
        "aaaReactants": aaa_reactants,
        "pdgProducts": pdg_products,
        "aaaProducts": aaa_products,
    }
    pdg_identifier = str(proposal.source.get("pdgIdentifier", "")).strip()
    if pdg_identifier:
        summary["pdgIdentifier"] = pdg_identifier
    return summary


def has_unsupported_transform_notes(notes: tuple[str, ...] | list[str]) -> bool:
    return any(str(note).startswith("unsupported:") for note in notes)


def notes_indicate_incomplete_pdg_record(notes: tuple[str, ...] | list[str]) -> bool:
    for note in notes:
        text = str(note)
        if any(marker in text for marker in INCOMPLETE_NOTE_MARKERS):
            return True
    return False


def classify_notes_with_ready_state(notes: tuple[str, ...] | list[str], ready: bool) -> str:
    incomplete = notes_indicate_incomplete_pdg_record(notes)
    if ready and incomplete:
        return "AAAcomplete"
    if ready:
        return "supported"
    if incomplete:
        return "incomplete"
    return "backlog"


def classify_proposal_status(proposal: Proposal) -> str:
    return classify_notes_with_ready_state(proposal.notes, proposal_is_ready_for_pdgsolve(proposal))


def classify_proposal_payload(proposal_payload: dict[str, Any]) -> str:
    nested_proposal = proposal_payload.get("proposal", {})
    note_container = nested_proposal if isinstance(nested_proposal, dict) else proposal_payload
    notes = note_container.get("notes", [])
    return classify_notes_with_ready_state(
        notes if isinstance(notes, list) else [],
        isinstance(proposal_payload.get("pdgsolveRequest"), dict),
    )


def transform_participants_for_pdgsolve(
    participants: Sequence[NormalizedParticipant],
) -> list[dict[str, Any]] | None:
    transformed_rows: list[dict[str, Any]] = []
    for participant in participants:
        if not participant.request_occurrences:
            return None
        occurrences = list(participant.to_request_occurrences())
        if any(str(occurrence.get("assemblyId", "")) not in REQUEST_ASSEMBLY_COUNTS for occurrence in occurrences):
            return None
        transformed_rows.extend(occurrences)
    return transformed_rows


def build_noether_pair_occurrences(
    side: str,
    pair_count: int,
    *,
    generation: str = "I",
    id_prefix: str = "noether_pair",
) -> list[dict[str, Any]]:
    pair_id_prefix = id_prefix if generation == "I" and id_prefix == "noether_pair" else f"{id_prefix}_{generation.lower()}"
    pro_assembly_id = f"pro_noether_swarm_{generation}"
    anti_assembly_id = f"anti_noether_swarm_{generation}"
    occurrences: list[dict[str, Any]] = []
    for index in range(1, pair_count + 1):
        occurrences.append(
            {
                "id": f"{side}_{pair_id_prefix}_{index}.row.1",
                "assemblyId": pro_assembly_id,
                "title": REQUEST_ASSEMBLY_TITLE_BY_ID[pro_assembly_id],
            }
        )
        occurrences.append(
            {
                "id": f"{side}_{pair_id_prefix}_{index}.row.2",
                "assemblyId": anti_assembly_id,
                "title": REQUEST_ASSEMBLY_TITLE_BY_ID[anti_assembly_id],
            }
        )
    return occurrences


def build_unbound_architrinos_residue_product(
    electrino_count: int,
    positrino_count: int,
) -> dict[str, Any]:
    return {
        "id": "product_unbound_architrinos_residue_1",
        "assemblyId": UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID,
        "title": UNBOUND_ARCHITRINOS_RESIDUE_TITLE,
        "electrinoCount": electrino_count,
        "positrinoCount": positrino_count,
    }


def merge_unbound_architrinos_residue_product(
    products: list[dict[str, Any]],
    electrino_count: int,
    positrino_count: int,
) -> list[dict[str, Any]] | None:
    if electrino_count == 0 and positrino_count == 0:
        return products

    residue_index: int | None = None
    updated_products: list[dict[str, Any]] = []
    for index, occurrence in enumerate(products):
        assembly_id = str(occurrence.get("assemblyId", "")).strip()
        if assembly_id != UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            updated_products.append(occurrence)
            continue
        if residue_index is not None:
            return None
        counts = get_pdgsolve_occurrence_primitive_counts(occurrence)
        if counts is None:
            return None
        updated_products.append(
            {
                **occurrence,
                "electrinoCount": counts["electrinoCount"] + electrino_count,
                "positrinoCount": counts["positrinoCount"] + positrino_count,
            }
        )
        residue_index = index

    if residue_index is not None:
        return updated_products
    return [
        *updated_products,
        build_unbound_architrinos_residue_product(electrino_count, positrino_count),
    ]


def compute_minimum_reactant_noether_pair_count_for_balance(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> int | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(reactants)
    product_totals = get_pdgsolve_occurrence_primitive_totals(products)
    if reactant_totals is None or product_totals is None:
        return None

    electrino_deficit = max(0, product_totals["electrinoCount"] - reactant_totals["electrinoCount"])
    positrino_deficit = max(0, product_totals["positrinoCount"] - reactant_totals["positrinoCount"])
    pair_count = max(
        math.ceil(electrino_deficit / NOETHER_PAIR_PRIMITIVE_TOTALS["electrinoCount"])
        if electrino_deficit
        else 0,
        math.ceil(positrino_deficit / NOETHER_PAIR_PRIMITIVE_TOTALS["positrinoCount"])
        if positrino_deficit
        else 0,
    )
    return pair_count


def add_reactant_noether_pairs_for_balance(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> list[dict[str, Any]] | None:
    minimum_pair_count = compute_minimum_reactant_noether_pair_count_for_balance(reactants, products)
    if minimum_pair_count is None:
        return None

    provisional_reactants = [
        *reactants,
        *build_noether_pair_occurrences("reactant", minimum_pair_count),
    ]
    additional_pair_count = compute_required_full_noether_pair_count(provisional_reactants, products)
    pair_count = minimum_pair_count + additional_pair_count
    if pair_count == 0:
        return reactants
    return [*reactants, *build_noether_pair_occurrences("reactant", pair_count)]


def get_noether_swarm_assembly_id_for_occurrence(occurrence: dict[str, Any]) -> str | None:
    assembly_id = str(occurrence.get("assemblyId", "")).strip()
    if not assembly_id or assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        return None
    if assembly_id in NOETHER_SWARM_ASSEMBLY_IDS:
        return assembly_id
    generation = assembly_id.rsplit("_", 1)[-1] if "_" in assembly_id else ""
    if not generation:
        return None
    if assembly_id.startswith("pro_"):
        core_assembly_id = f"pro_noether_swarm_{generation}"
    elif assembly_id.startswith("anti_"):
        core_assembly_id = f"anti_noether_swarm_{generation}"
    else:
        return None
    return core_assembly_id if core_assembly_id in REQUEST_ASSEMBLY_COUNTS else None


def count_noether_swarm_support_occurrences(occurrences: list[dict[str, Any]]) -> dict[str, int]:
    counts = {assembly_id: 0 for assembly_id in NOETHER_SWARM_ASSEMBLY_IDS}
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            continue
        core_assembly_id = get_noether_swarm_assembly_id_for_occurrence(occurrence)
        if core_assembly_id is None:
            continue
        counts[core_assembly_id] += 1
    return counts


def count_direct_noether_swarm_occurrences(occurrences: list[dict[str, Any]]) -> dict[str, int]:
    counts = {assembly_id: 0 for assembly_id in NOETHER_SWARM_ASSEMBLY_IDS}
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            continue
        assembly_id = str(occurrence.get("assemblyId", "")).strip()
        if assembly_id in counts:
            counts[assembly_id] += 1
    return counts


def count_noether_swarm_middle_supply_occurrences(occurrences: list[dict[str, Any]]) -> dict[str, int]:
    counts = {assembly_id: 0 for assembly_id in NOETHER_SWARM_ASSEMBLY_IDS}
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            continue
        assembly_id = str(occurrence.get("assemblyId", "")).strip()
        if assembly_id in counts:
            continue
        core_assembly_id = get_noether_swarm_assembly_id_for_occurrence(occurrence)
        if core_assembly_id is None:
            continue
        counts[core_assembly_id] += 1
    return counts


def get_reachable_noether_swarm_assembly_ids(core_assembly_id: str) -> tuple[str, ...]:
    reachable_core_ids: list[str] = []
    current_core_assembly_id = str(core_assembly_id or "").strip()
    while current_core_assembly_id:
        reachable_core_ids.append(current_core_assembly_id)
        current_core_assembly_id = str(NOETHER_SWARM_SUCCESSOR.get(current_core_assembly_id) or "").strip()
    return tuple(reachable_core_ids)


def plan_noether_swarm_middle_supply_occurrences(
    occurrences: list[dict[str, Any]],
    required_counts: dict[str, int],
) -> dict[str, int]:
    counts = {assembly_id: 0 for assembly_id in NOETHER_SWARM_ASSEMBLY_IDS}
    remaining_required = {
        assembly_id: int(required_counts.get(assembly_id, 0) or 0)
        for assembly_id in NOETHER_SWARM_ASSEMBLY_IDS
    }
    for occurrence in occurrences:
        if not isinstance(occurrence, dict):
            continue
        assembly_id = str(occurrence.get("assemblyId", "")).strip()
        if assembly_id in counts:
            continue
        core_assembly_id = get_noether_swarm_assembly_id_for_occurrence(occurrence)
        if core_assembly_id is None:
            continue
        target_core_assembly_id = next(
            (
                candidate_id
                for candidate_id in reversed(get_reachable_noether_swarm_assembly_ids(core_assembly_id))
                if remaining_required[candidate_id] > 0
            ),
            None,
        )
        if target_core_assembly_id is None:
            continue
        counts[target_core_assembly_id] += 1
        remaining_required[target_core_assembly_id] -= 1
    return counts


def compute_required_full_noether_pair_count(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> int:
    direct_counts = count_direct_noether_swarm_occurrences(reactants)
    required_counts = count_noether_swarm_support_occurrences(products)
    middle_supply_counts = plan_noether_swarm_middle_supply_occurrences(reactants, required_counts)
    required_pair_count_by_charge = {"pro": 0, "anti": 0}

    for charge in ("pro", "anti"):
        remaining_required = {
            generation: required_counts[f"{charge}_noether_swarm_{generation}"]
            for generation in NOETHER_SWARM_GENERATIONS
        }
        available_direct = {
            generation: direct_counts[f"{charge}_noether_swarm_{generation}"]
            for generation in NOETHER_SWARM_GENERATIONS
        }
        available_middle = {
            generation: middle_supply_counts[f"{charge}_noether_swarm_{generation}"]
            for generation in NOETHER_SWARM_GENERATIONS
        }

        for generation, direct_sources in (
            ("III", ("III", "II", "I")),
            ("II", ("II", "I")),
            ("I", ("I",)),
        ):
            used_middle = min(remaining_required[generation], available_middle[generation])
            remaining_required[generation] -= used_middle
            available_middle[generation] -= used_middle
            for direct_generation in direct_sources:
                used_direct = min(remaining_required[generation], available_direct[direct_generation])
                remaining_required[generation] -= used_direct
                available_direct[direct_generation] -= used_direct
                if remaining_required[generation] == 0:
                    break

        required_pair_count_by_charge[charge] = sum(remaining_required.values())

    return max(required_pair_count_by_charge.values())


def add_maximum_noether_pair_products_from_surplus(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> list[dict[str, Any]] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(reactants)
    product_totals = get_pdgsolve_occurrence_primitive_totals(products)
    if reactant_totals is None or product_totals is None:
        return None

    electrino_surplus = max(0, reactant_totals["electrinoCount"] - product_totals["electrinoCount"])
    positrino_surplus = max(0, reactant_totals["positrinoCount"] - product_totals["positrinoCount"])
    pair_count = min(
        electrino_surplus // NOETHER_PAIR_PRIMITIVE_TOTALS["electrinoCount"],
        positrino_surplus // NOETHER_PAIR_PRIMITIVE_TOTALS["positrinoCount"],
    )
    if pair_count == 0:
        return products

    return [*products, *build_noether_pair_occurrences("product", pair_count)]


def add_unbound_architrino_residue_product_from_surplus(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> list[dict[str, Any]] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(reactants)
    product_totals = get_pdgsolve_occurrence_primitive_totals(products)
    if reactant_totals is None or product_totals is None:
        return None

    electrino_surplus = reactant_totals["electrinoCount"] - product_totals["electrinoCount"]
    positrino_surplus = reactant_totals["positrinoCount"] - product_totals["positrinoCount"]
    if electrino_surplus < 0 or positrino_surplus < 0:
        return None
    if electrino_surplus == 0 and positrino_surplus == 0:
        return products
    return merge_unbound_architrinos_residue_product(products, electrino_surplus, positrino_surplus)


def transform_proposal_for_pdgsolve(proposal: Proposal) -> dict[str, list[dict[str, Any]]] | None:
    if has_unsupported_transform_notes(proposal.notes):
        return None
    if not proposal.products:
        return None
    reactants = transform_participants_for_pdgsolve(proposal.reactants)
    products = transform_participants_for_pdgsolve(proposal.products)
    if reactants is None or products is None:
        return None
    reactants = add_reactant_noether_pairs_for_balance(reactants, products)
    if reactants is None:
        return None
    products = add_unbound_architrino_residue_product_from_surplus(reactants, products)
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
        "reactionSummary": build_pdgsolve_request_reaction_summary(proposal, transformed),
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
    if not errors:
        errors.extend(validate_pdgsolve_request_occurrence_semantics(request))
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
        tokens.append(aaa_notation)
    return ".".join(tokens)


def get_pdgsolve_occurrence_primitive_counts(occurrence: Any) -> dict[str, int] | None:
    if not isinstance(occurrence, dict):
        return None
    assembly_id = str(occurrence.get("assemblyId", ""))
    if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        electrino_count = occurrence.get("electrinoCount")
        positrino_count = occurrence.get("positrinoCount")
        if not isinstance(electrino_count, int) or isinstance(electrino_count, bool):
            return None
        if not isinstance(positrino_count, int) or isinstance(positrino_count, bool):
            return None
        if electrino_count < 0 or positrino_count < 0:
            return None
        return {
            "electrinoCount": electrino_count,
            "positrinoCount": positrino_count,
        }
    return REQUEST_ASSEMBLY_COUNTS.get(assembly_id)


def validate_pdgsolve_request_occurrence_semantics(request: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    for side in ("reactants", "products"):
        occurrences = request.get(side, [])
        if not isinstance(occurrences, list):
            continue
        for index, occurrence in enumerate(occurrences):
            path = f"$.{side}[{index}]"
            if not isinstance(occurrence, dict):
                continue
            assembly_id = str(occurrence.get("assemblyId", ""))
            has_explicit_counts = "electrinoCount" in occurrence or "positrinoCount" in occurrence
            if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
                if side != "products":
                    errors.append(f"{path}: unbound architrino residue is only admitted on the product side")
                counts = get_pdgsolve_occurrence_primitive_counts(occurrence)
                if counts is None:
                    errors.append(f"{path}: residue occurrence must carry non-negative integer electrinoCount and positrinoCount")
                    continue
                if counts["electrinoCount"] == 0 and counts["positrinoCount"] == 0:
                    errors.append(f"{path}: residue occurrence must carry a non-zero primitive count")
                continue
            if has_explicit_counts:
                errors.append(f"{path}: explicit primitive counts are only admitted on Unbound Architrinos residue products")
    return errors


def get_pdgsolve_occurrence_primitive_totals(occurrences: Any) -> dict[str, int] | None:
    if not isinstance(occurrences, list):
        return None
    totals = {"electrinoCount": 0, "positrinoCount": 0}
    for occurrence in occurrences:
        counts = get_pdgsolve_occurrence_primitive_counts(occurrence)
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
        assembly_id = str(occurrence.get("assemblyId", ""))
        if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            counts = get_pdgsolve_occurrence_primitive_counts(occurrence)
            if counts is None:
                return ""
            aaa_notation = f"{counts['electrinoCount']}:{counts['positrinoCount']}@"
        else:
            aaa_notation = REQUEST_ASSEMBLY_AAA_BY_ID.get(assembly_id, "")
        if not aaa_notation:
            return ""
        tokens.append(aaa_notation)
    return ".".join(tokens)


def get_request_residue_counts(pdgsolve_request: Any) -> tuple[int, int] | None:
    if not isinstance(pdgsolve_request, dict):
        return None
    products = pdgsolve_request.get("products", [])
    if not isinstance(products, list):
        return None
    residue_occurrences = [
        occurrence
        for occurrence in products
        if isinstance(occurrence, dict)
        and str(occurrence.get("assemblyId", "")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
    ]
    if not residue_occurrences:
        return (0, 0)
    if len(residue_occurrences) != 1:
        return None
    counts = get_pdgsolve_occurrence_primitive_counts(residue_occurrences[0])
    if counts is None:
        return None
    return counts["electrinoCount"], counts["positrinoCount"]


def format_residue_counts(counts: tuple[int, int]) -> str:
    return f"{counts[0]}:{counts[1]}"


def request_has_total_primitive_balance(pdgsolve_request: Any) -> bool:
    if not isinstance(pdgsolve_request, dict):
        return False
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("reactants", []))
    product_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("products", []))
    if reactant_totals is None or product_totals is None:
        return False
    return reactant_totals == product_totals


def request_has_unbound_architrino_residue_product(pdgsolve_request: Any) -> bool:
    if not isinstance(pdgsolve_request, dict):
        return False
    products = pdgsolve_request.get("products", [])
    if not isinstance(products, list):
        return False
    return any(
        isinstance(occurrence, dict)
        and str(occurrence.get("assemblyId", "")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
        for occurrence in products
    )


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
        "category": classify_notes_with_ready_state(
            tuple(str(note) for note in proposal_payload.get("notes", []) if isinstance(note, str)),
            True,
        ),
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


def normalize_branching_probability(value: Any) -> float | None:
    try:
        probability = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(probability):
        return None
    if -1e-12 <= probability <= 1.0 + 1e-12:
        return min(1.0, max(0.0, probability))
    return None


def branching_probability_decile_label(probability: float) -> str:
    percent = probability * 100.0
    if percent >= 100.0:
        return "90-100"
    lower = int(percent // 10) * 10
    upper = lower + 10
    return f"{lower}-{upper}"


def build_live_branching_probability_deciles(
    database_url: str | None = None,
    *,
    api: Any | None = None,
    source: str = "pdg-reactions",
) -> list[tuple[str, int]]:
    if source != "pdg-reactions":
        raise ValueError(f"Unsupported source: {source}")
    api = api or connect_pdg(database_url, pedantic=False)
    counts: Counter[str] = Counter()
    for particle in iter_live_particles(api):
        for decay in iter_candidate_branching_fractions(particle):
            probability = normalize_branching_probability(getattr(decay, "value", None))
            if probability is None:
                probability = normalize_branching_probability_from_display(getattr(decay, "display_value_text", ""))
            if probability is None:
                counts[NO_NUMERIC_BRANCHING_PROBABILITY_LABEL] += 1
                continue
            counts[branching_probability_decile_label(probability)] += 1
    return [
        *((label, counts.get(label, 0)) for label in BRANCHING_PROBABILITY_DECILE_LABELS),
        (NO_NUMERIC_BRANCHING_PROBABILITY_LABEL, counts.get(NO_NUMERIC_BRANCHING_PROBABILITY_LABEL, 0)),
    ]


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
        branching_probability = normalize_branching_probability(live_case.source.get("branchingProbability"))
        if branching_probability is not None:
            entry["branchingProbability"] = branching_probability
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


def entry_is_incomplete_for_aaa_funnel(entry: dict[str, Any]) -> bool:
    category = classify_proposal_payload(entry)
    if category in ("incomplete", "AAAcomplete"):
        return True
    probability = normalize_branching_probability(entry.get("branchingProbability"))
    return probability is None


def build_aaa_funnel_entries(
    manifest: dict[str, Any],
) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
    all_entries = [
        entry
        for entry in [*manifest.get("readyEntries", []), *manifest.get("blockedEntries", [])]
        if isinstance(entry, dict)
    ]
    incomplete_entries = [entry for entry in all_entries if entry_is_incomplete_for_aaa_funnel(entry)]
    low_probability_entries = [
        entry
        for entry in all_entries
        if entry not in incomplete_entries
        and (normalize_branching_probability(entry.get("branchingProbability")) or 0.0) + 1e-12
        < PDGEDIT_APP_MIN_BRANCHING_PROBABILITY
    ]
    eligible_entries = [
        entry
        for entry in all_entries
        if entry not in incomplete_entries and entry not in low_probability_entries
    ]
    return incomplete_entries, low_probability_entries, eligible_entries


def build_live_reaction_summary_rows(
    database_url: str | None = None,
    *,
    source: str = "pdg-reactions",
    api: Any | None = None,
    manifest: dict[str, Any] | None = None,
    supported_rows: list[dict[str, str | int]] | None = None,
    probability_deciles: list[tuple[str, int]] | None = None,
) -> tuple[
    list[tuple[str, int]],
    list[tuple[str, int]],
    list[tuple[str, str, int, str]],
    list[tuple[str, int]],
]:
    if source != "pdg-reactions":
        raise ValueError(f"Unsupported source: {source}")
    api = api or connect_pdg(database_url, pedantic=False)
    if manifest is None:
        manifest = build_live_manifest_payload(database_url, api=api)
    total_reaction_count = int(manifest.get("readyCount", 0) or 0) + int(manifest.get("blockedCount", 0) or 0)
    incomplete_entries, low_probability_entries, eligible_entries = build_aaa_funnel_entries(manifest)
    eligible_ready_entries = [
        entry
        for entry in eligible_entries
        if isinstance(entry.get("pdgsolveRequest"), dict)
    ]
    eligible_blocked_entries = [
        entry
        for entry in eligible_entries
        if not isinstance(entry.get("pdgsolveRequest"), dict)
    ]
    total_balance_closure_count = 0
    total_balance_with_residue_count = 0
    ready_without_total_balance_count = 0
    for entry in eligible_ready_entries:
        if not isinstance(entry, dict):
            continue
        pdgsolve_request = entry.get("pdgsolveRequest", {})
        if not request_has_total_primitive_balance(pdgsolve_request):
            ready_without_total_balance_count += 1
            continue
        total_balance_closure_count += 1
        if request_has_unbound_architrino_residue_product(pdgsolve_request):
            total_balance_with_residue_count += 1
    total_balance_without_residue_count = total_balance_closure_count - total_balance_with_residue_count
    backlog_particle_counts: Counter[str] = Counter()
    for entry in eligible_blocked_entries:
        category = classify_proposal_payload(entry)
        if category != "backlog":
            continue
        for particle_name in entry.get("blockedParticles", []):
            if isinstance(particle_name, str) and particle_name:
                backlog_particle_counts[particle_name] += 1

    rows: list[tuple[str, int]] = [
        ("Number of total PDG reactions", total_reaction_count),
        (
            "Number of reactions excluded as incomplete or without numeric branching probability",
            len(incomplete_entries),
        ),
        (
            f"Number of reactions excluded below {PDGEDIT_APP_MIN_BRANCHING_PROBABILITY * 100:.1f}% branching probability",
            len(low_probability_entries),
        ),
        ("Number of reactions remaining to solve with AAA", len(eligible_entries)),
    ]
    breakdown_rows: list[tuple[str, int]] = [
        ("Number of remaining reactions ready and transformed into AAA", len(eligible_ready_entries)),
        ("Number of remaining reactions blocked by AAA backlog", len(eligible_blocked_entries)),
        ("Number of remaining ready reactions closed by total primitive balance", total_balance_closure_count),
        ("Number of remaining closures with product unbound architrinos", total_balance_with_residue_count),
        ("Number of remaining closures without product unbound architrinos", total_balance_without_residue_count),
        ("Number of remaining ready reactions lacking total primitive balance", ready_without_total_balance_count),
    ]
    residue_counts = build_live_residue_count_rows(
        eligible_ready_entries,
        set_label="AAA-eligible ready total-balance closures",
    )
    backlog_particles = [
        (particle_name, count)
        for particle_name, count in sorted(
            backlog_particle_counts.items(),
            key=lambda item: (-item[1], item[0]),
        )[:10]
    ]
    return rows, breakdown_rows, residue_counts, backlog_particles


def build_live_residue_count_rows(
    entries: Sequence[Any],
    *,
    set_label: str,
    minimum_branching_probability: float | None = None,
) -> list[tuple[str, str, int, str]]:
    residue_count_buckets: Counter[tuple[int, int]] = Counter()
    residue_count_examples: dict[tuple[int, int], str] = {}
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        probability = normalize_branching_probability(entry.get("branchingProbability"))
        if minimum_branching_probability is not None:
            if probability is None:
                continue
            if probability + 1e-12 < minimum_branching_probability:
                continue
        pdgsolve_request = entry.get("pdgsolveRequest", {})
        if not request_has_total_primitive_balance(pdgsolve_request):
            continue
        residue_counts = get_request_residue_counts(pdgsolve_request)
        if residue_counts is None:
            continue
        residue_count_buckets[residue_counts] += 1
        if residue_counts not in residue_count_examples:
            residue_count_examples[residue_counts] = (
                str(entry.get("title", "")).strip()
                or str(entry.get("caseId", "")).strip()
                or str(entry.get("proposalId", "")).strip()
                or str(pdgsolve_request.get("requestId", "")).strip()
            )
    return [
        (
            set_label,
            format_residue_counts(residue_count),
            count,
            residue_count_examples.get(residue_count, ""),
        )
        for residue_count, count in sorted(
            residue_count_buckets.items(),
            key=lambda item: (-item[1], item[0][0], item[0][1]),
        )
    ]


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
    *,
    api: Any | None = None,
) -> list[PdgCase]:
    if source != "pdg-reactions":
        raise SystemExit(f"Unsupported source: {source}")
    api = api or connect_pdg(database_url, pedantic=False)
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


def build_list_row_cells(case: PdgCase) -> tuple[str, str, str, str, str, str, str, str]:
    proposal = build_proposal(case)
    status = "ready" if proposal_is_ready_for_pdgsolve(proposal) else "blocked"
    category = classify_proposal_status(proposal)
    return (
        known_reaction_status(case),
        sanitize_tsv_field(int(case.source.get("mcid", 0) or 0)),
        sanitize_tsv_field(case.source.get("pdgIdentifier", "")),
        sanitize_tsv_field(case.case_id),
        sanitize_tsv_field(case.title),
        sanitize_tsv_field(format_list_channel_description(case)),
        category,
        status,
    )


def write_live_reaction_list_report(
    source: str,
    database_url: str | None = None,
    *,
    api: Any | None = None,
    cases: list[PdgCase] | None = None,
    output_path: Path | None = None,
) -> Path:
    cases = cases if cases is not None else build_cases_by_source(source, database_url, api=api)
    path = output_path or list_markdown_output_path(source)
    write_markdown_table(
        path,
        ("K/U", "MCID", "PDG ID", "Reaction ID", "Title", "Channel", "Category", "Status"),
        [build_list_row_cells(case) for case in cases],
    )
    return path


def write_supported_reaction_markdown(path: Path, rows: Sequence[dict[str, str | int]]) -> None:
    write_markdown_table(
        path,
        (
            "K/U",
            "Reaction ID",
            "PDG ID",
            "Title",
            "Category",
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
                row.get("category", ""),
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


def write_live_reaction_summary_markdown(
    path: Path,
    rows: Sequence[tuple[str, int]],
    *,
    breakdown_rows: Sequence[tuple[str, int]] = (),
    residue_counts: Sequence[tuple[str, str, int, str]] = (),
    backlog_particles: Sequence[tuple[str, int]] = (),
) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    metrics = list(rows)
    body = [
        "| Metric | Count |",
        "| --- | --- |",
        *[
            "| " + " | ".join(escape_markdown_table_cell(cell) for cell in row) + " |"
            for row in metrics
        ],
    ]
    if breakdown_rows:
        body.extend(
            [
                "",
                "| Metric | Count |",
                "| --- | --- |",
                *[
                    "| " + " | ".join(escape_markdown_table_cell(cell) for cell in row) + " |"
                    for row in breakdown_rows
                ],
            ]
        )
    if residue_counts:
        body.extend(
            [
                "",
                "| Reaction Set | Product Unbound Architrino Counts | Count | Example Mode |",
                "| --- | --- | --- | --- |",
                *[
                    "| " + " | ".join(escape_markdown_table_cell(cell) for cell in row) + " |"
                    for row in residue_counts
                ],
            ]
        )
    if backlog_particles:
        body.extend(
            [
                "",
                "| Backlog Particle | Count |",
                "| --- | --- |",
                *[
                    "| " + " | ".join(escape_markdown_table_cell(cell) for cell in row) + " |"
                    for row in backlog_particles
                ],
            ]
        )
    path.write_text("\n".join(body) + "\n", encoding="utf-8")


def write_live_reaction_summary_report(
    source: str,
    database_url: str | None = None,
    *,
    api: Any | None = None,
    manifest: dict[str, Any] | None = None,
    supported_rows: list[dict[str, str | int]] | None = None,
    probability_deciles: list[tuple[str, int]] | None = None,
    output_path: Path | None = None,
) -> Path:
    metrics, breakdown_rows, residue_counts, backlog_particles = build_live_reaction_summary_rows(
        database_url,
        source=source,
        api=api,
        manifest=manifest,
        supported_rows=supported_rows,
        probability_deciles=probability_deciles,
    )
    path = output_path or summary_markdown_output_path(source)
    write_live_reaction_summary_markdown(
        path,
        metrics,
        breakdown_rows=breakdown_rows,
        residue_counts=residue_counts,
        backlog_particles=backlog_particles,
    )
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
        output_path = write_live_reaction_list_report(args.source, args.database_url)
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
