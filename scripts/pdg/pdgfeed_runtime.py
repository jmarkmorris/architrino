from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from collections import Counter
from functools import lru_cache
from pathlib import Path
from typing import Any, Sequence

from scripts.pdg.pdgfeed_live import LIVE_CHANNEL_SPEC_BY_ID, LIVE_CHANNEL_SPECS, connect_pdg, load_live_case
from scripts.pdg.pdgfeed_model import (
    DEFAULT_OUTPUT_DIR,
    DEFAULT_PDGSOLVE_REQUEST_POLICY,
    DEFAULT_SUPPORTED_REACTION_CSV,
    DEFAULT_TEST_CASE_INDEX,
    PDGSOLVE_REQUEST_SCHEMA,
    PDGSOLVE_REQUEST_SCHEMA_PATH,
    PDG_LIVE_MANIFEST_SCHEMA,
    PDG_PROPOSAL_SCHEMA,
    PDG_SOURCE_CONTRACT,
    PDG_TEST_CASE_CORPUS_SCHEMA,
    PDG_TEST_CASE_SOURCE_SCHEMA,
    Proposal,
    PdgCase,
    NormalizedParticipant,
    SUPPORTED_REACTION_CSV_COLUMNS,
    TestCaseParticle,
)
from scripts.pdg.pdgfeed_registry import REQUEST_ASSEMBLY_COUNTS, canonicalize_pdg_name, lookup_particle_mapping


PARTICLE_NAME_PATTERN = re.compile(r"^[A-Za-z0-9_+\-]+$")


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


def load_test_case_index(index_path: Path) -> list[PdgCase]:
    repo_root = Path(__file__).resolve().parents[2]
    index_payload = load_json(index_path)
    if index_payload.get("schema") != PDG_TEST_CASE_CORPUS_SCHEMA:
        raise ValueError(f"Unexpected test-case index schema in {index_path}")

    test_cases: list[PdgCase] = []
    for case in index_payload.get("cases", []):
        source_path = Path(case["sourcePath"])
        if not source_path.is_absolute():
            source_path = repo_root / source_path
        test_case_payload = load_json(source_path)
        if test_case_payload.get("schema") != PDG_TEST_CASE_SOURCE_SCHEMA:
            raise ValueError(f"Unexpected test-case source schema in {source_path}")

        case_id = str(test_case_payload["testCaseId"])
        test_cases.append(
            PdgCase(
                case_id=case_id,
                proposal_id=case_id,
                title=str(test_case_payload["title"]),
                source_kind="test_case",
                source=dict(test_case_payload["source"]),
                reactants=tuple(
                    TestCaseParticle(
                        name=str(entry["name"]),
                        pdg_id=str(entry["pdgId"]) if entry.get("pdgId") else None,
                        display_label=str(entry["displayLabel"]) if entry.get("displayLabel") else None,
                    )
                    for entry in test_case_payload.get("reactants", [])
                ),
                products=tuple(
                    TestCaseParticle(
                        name=str(entry["name"]),
                        pdg_id=str(entry["pdgId"]) if entry.get("pdgId") else None,
                        display_label=str(entry["displayLabel"]) if entry.get("displayLabel") else None,
                    )
                    for entry in test_case_payload.get("products", [])
                ),
                notes=tuple(str(note) for note in test_case_payload.get("notes", [])),
                source_path=source_path,
            )
        )
    return test_cases


def build_inventory(mapping: Any, particle: TestCaseParticle) -> dict[str, Any]:
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
    if case.source_kind == "test_case":
        source["testCaseId"] = case.case_id
        if case.source_path is not None:
            source["testCasePath"] = str(case.source_path.relative_to(Path(__file__).resolve().parents[2]))
    elif case.source_kind == "pdg-live":
        source["liveCaseId"] = case.case_id
    source["contract"] = dict(PDG_SOURCE_CONTRACT)
    return source


def normalize_particle(particle: TestCaseParticle, side: str, ordinal: int) -> tuple[NormalizedParticipant | None, str | None]:
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
    if not mapping.exportable_to_request:
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


def build_pdgsolve_request(proposal: Proposal) -> dict[str, Any] | None:
    if not proposal.exportable:
        return None
    request = {
        "schema": PDGSOLVE_REQUEST_SCHEMA,
        "requestId": proposal.proposal_id,
        "source": build_pdgsolve_request_source(proposal),
        "reactants": [
            occurrence
            for participant in proposal.reactants
            for occurrence in participant.to_request_occurrences()
        ],
        "products": [
            occurrence
            for participant in proposal.products
            for occurrence in participant.to_request_occurrences()
        ],
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
    tokens = [
        str(participant.get("aaaNotation", "")).strip()
        for participant in participants
        if isinstance(participant, dict) and str(participant.get("aaaNotation", "")).strip()
    ]
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


def build_supported_reaction_csv_row(
    proposal_payload: dict[str, Any],
    pdgsolve_request: dict[str, Any],
) -> dict[str, str | int] | None:
    reactant_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("reactants", []))
    product_totals = get_pdgsolve_occurrence_primitive_totals(pdgsolve_request.get("products", []))
    if reactant_totals is None or product_totals is None:
        return None

    reactant_names = format_proposal_side_aaa(proposal_payload.get("reactants", []))
    product_names = format_proposal_side_aaa(proposal_payload.get("products", []))
    if not reactant_names or not product_names:
        return None

    return {
        "reactant_names_aaa": reactant_names,
        "product_names_aaa": product_names,
        "reactant_electrinos": reactant_totals["electrinoCount"],
        "product_electrinos": product_totals["electrinoCount"],
        "electrino_delta": reactant_totals["electrinoCount"] - product_totals["electrinoCount"],
        "reactant_positrinos": reactant_totals["positrinoCount"],
        "product_positrinos": product_totals["positrinoCount"],
        "positrino_delta": reactant_totals["positrinoCount"] - product_totals["positrinoCount"],
    }


def build_supported_reaction_csv_rows(cases: list[PdgCase]) -> list[dict[str, str | int]]:
    rows: list[dict[str, str | int]] = []
    for case in cases:
        proposal = build_proposal(case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        if pdgsolve_request is None:
            continue
        row = build_supported_reaction_csv_row(proposal.to_dict(), pdgsolve_request)
        if row is not None:
            rows.append(row)
    return rows


def build_live_manifest_payload(
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> dict[str, Any]:
    api = api or connect_pdg(database_url, pedantic=False)
    exportable_entries: list[dict[str, Any]] = []
    unsupported_entries: list[dict[str, Any]] = []
    unsupported_particle_counts: Counter[str] = Counter()

    for spec in LIVE_CHANNEL_SPECS:
        live_case = load_live_case(spec, database_url, api=api)
        proposal = build_proposal(live_case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        unsupported_names = extract_unsupported_particle_names(proposal.notes)
        unsupported_particle_counts.update(unsupported_names)
        entry = {
            "batchId": 0,
            "caseId": live_case.case_id,
            "proposalId": proposal.proposal_id,
            "title": live_case.title,
            "lookupParticleName": str(live_case.source.get("lookupParticleName", "")),
            "pdgIdentifier": str(live_case.source.get("pdgIdentifier", "")),
            "channelDescription": str(live_case.source.get("channelDescription", "")),
            "branchingDisplay": str(live_case.source.get("branchingDisplay", "")),
            "unsupportedParticles": unsupported_names,
            "proposal": proposal.to_dict(),
        }
        if pdgsolve_request is None:
            unsupported_entries.append(entry)
            continue
        entry["pdgsolveRequest"] = pdgsolve_request
        exportable_entries.append(entry)

    for index, entry in enumerate(exportable_entries, start=1):
        entry["batchId"] = index

    top_unsupported_particles = [
        {"particle": particle_name, "count": count}
        for particle_name, count in sorted(
            unsupported_particle_counts.items(),
            key=lambda item: (-item[1], item[0]),
        )[:5]
    ]

    return {
        "schema": PDG_LIVE_MANIFEST_SCHEMA,
        "edition": str(getattr(api, "edition", "")),
        "exportableCount": len(exportable_entries),
        "unsupportedDiscoveryCount": len(unsupported_entries),
        "topUnsupportedParticles": top_unsupported_particles,
        "entries": exportable_entries,
        "unsupportedEntries": unsupported_entries,
    }


def build_live_supported_reaction_csv_rows(
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> list[dict[str, str | int]]:
    manifest = build_live_manifest_payload(database_url, api=api)
    rows: list[dict[str, str | int]] = []
    for entry in manifest.get("entries", []):
        if not isinstance(entry, dict):
            continue
        row = build_supported_reaction_csv_row(entry.get("proposal", {}), entry.get("pdgsolveRequest", {}))
        if row is not None:
            rows.append(row)
    return rows


def write_supported_reaction_csv(path: Path, rows: list[dict[str, str | int]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=SUPPORTED_REACTION_CSV_COLUMNS)
        writer.writeheader()
        writer.writerows(rows)


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
    test_cases: list[PdgCase],
    database_url: str | None = None,
) -> list[PdgCase]:
    if source == "pdg-test-reactions":
        return list(test_cases)
    if source != "pdg-reactions":
        raise SystemExit(f"Unsupported source: {source}")
    api = connect_pdg(database_url, pedantic=False)
    return [load_live_case(spec, database_url, api=api) for spec in LIVE_CHANNEL_SPECS]


def resolve_case_by_source(
    source: str,
    reaction_id: str,
    test_cases_by_id: dict[str, PdgCase],
    database_url: str | None = None,
) -> PdgCase:
    if source == "pdg-test-reactions":
        test_case = test_cases_by_id.get(reaction_id)
        if test_case is None:
            available = ", ".join(sorted(test_cases_by_id))
            raise SystemExit(f"Unknown PDG test reaction id {reaction_id!r}. Available: {available}")
        return test_case

    if source == "pdg-reactions":
        spec = LIVE_CHANNEL_SPEC_BY_ID.get(reaction_id)
        if spec is None:
            available = ", ".join(sorted(LIVE_CHANNEL_SPEC_BY_ID))
            raise SystemExit(f"Unknown PDG reaction id {reaction_id!r}. Available: {available}")
        return load_live_case(spec, database_url)

    raise SystemExit(f"Unsupported source: {source}")


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="List PDG reactions, build proposals, emit pdgsolve requests, and prepare live manifests."
    )
    parser.add_argument(
        "--test-reaction-index",
        "--test-case-index",
        dest="test_case_index",
        type=Path,
        default=DEFAULT_TEST_CASE_INDEX,
        help="Path to the local PDG test reaction corpus index.",
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
        choices=("pdg-test-reactions", "pdg-reactions"),
        default="pdg-test-reactions",
        help="Choose the reaction source.",
    )

    proposal_parser = subparsers.add_parser("proposal", help="Emit one pdg-proposal/v1 payload for a reaction.")
    proposal_parser.add_argument("reaction_id", help="Reaction id from the selected source.")
    proposal_parser.add_argument(
        "--source",
        choices=("pdg-test-reactions", "pdg-reactions"),
        default="pdg-test-reactions",
        help="Choose the reaction source.",
    )
    proposal_parser.add_argument(
        "--write",
        action="store_true",
        help="Write the proposal artifact to --output-dir instead of printing JSON to stdout.",
    )

    request_parser = subparsers.add_parser(
        "request",
        help="Emit one pdgsolve-request/v1 payload for a reaction when it is fully exportable.",
    )
    request_parser.add_argument("reaction_id", help="Reaction id from the selected source.")
    request_parser.add_argument(
        "--source",
        choices=("pdg-test-reactions", "pdg-reactions"),
        default="pdg-test-reactions",
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
        help="Write a primitive-count CSV summary for exportable reactions.",
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
        choices=("pdg-test-reactions", "pdg-reactions"),
        default="pdg-test-reactions",
        help="Choose the reaction source.",
    )

    return parser.parse_args(argv)


def print_json(payload: dict[str, Any]) -> None:
    json.dump(payload, sys.stdout, indent=2)
    sys.stdout.write("\n")


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(argv)

    test_cases_cache: list[PdgCase] | None = None

    def get_test_cases() -> list[PdgCase]:
        nonlocal test_cases_cache
        if test_cases_cache is None:
            test_cases_cache = load_test_case_index(args.test_case_index)
        return test_cases_cache

    if args.command == "list":
        if args.source == "pdg-test-reactions":
            for test_case in get_test_cases():
                print(f"{test_case.case_id}\t{test_case.title}")
            return 0
        for spec in LIVE_CHANNEL_SPECS:
            print(f"{spec.case_id}\t{spec.title}")
        return 0

    if args.command == "proposal":
        test_cases = get_test_cases()
        case = resolve_case_by_source(args.source, args.reaction_id, {item.case_id: item for item in test_cases}, args.database_url)
        if args.write:
            print(format_output_path(write_proposal_artifact(case, args.output_dir)))
            return 0
        print_json(build_proposal(case).to_dict())
        return 0

    if args.command == "request":
        test_cases = get_test_cases()
        case = resolve_case_by_source(args.source, args.reaction_id, {item.case_id: item for item in test_cases}, args.database_url)
        proposal = build_proposal(case)
        pdgsolve_request = build_pdgsolve_request(proposal)
        if pdgsolve_request is None:
            source_label = "PDG test reaction" if args.source == "pdg-test-reactions" else "PDG reaction"
            raise SystemExit(f"{source_label} {args.reaction_id!r} does not currently emit pdgsolve-request/v1.")
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
        if args.source == "pdg-reactions":
            rows = build_live_supported_reaction_csv_rows(args.database_url)
        else:
            rows = build_supported_reaction_csv_rows(get_test_cases())
        write_supported_reaction_csv(args.csv_path, rows)
        print(format_output_path(args.csv_path))
        return 0

    raise SystemExit(f"Unsupported command: {args.command}")
