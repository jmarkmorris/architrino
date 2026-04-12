#!/usr/bin/env python3
"""PDG ingest composition root.

The implementation is split into focused helper modules under ``scripts/pdg``.
This file keeps the direct script surface thin and re-exports the public
library entrypoints used by tests and the root delegating ``pdgfeed.py``.
"""

from __future__ import annotations

import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.pdg.pdgfeed_live import (  # noqa: E402
    LIVE_CHANNEL_SPEC_BY_ID,
    LIVE_CHANNEL_SPECS,
    canonicalize_api_particle_name,
    connect_pdg,
    extract_live_decay_products,
    find_live_decay,
    iter_candidate_branching_fractions,
    load_live_case,
    normalize_channel_description,
)
from scripts.pdg.pdgfeed_model import (  # noqa: E402
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
    LiveChannelSpec,
    NormalizedParticipant,
    ParticleMapping,
    PdgCase,
    Proposal,
    RequestOccurrenceTemplate,
    TestCaseParticle,
)
from scripts.pdg.pdgfeed_registry import (  # noqa: E402
    PDG_CANONICAL_NAME_BY_ALIAS,
    PDG_MAPPING_BY_CANONICAL_NAME,
    PDG_PARTICLE_MAPPINGS,
    REQUEST_ASSEMBLY_COUNTS,
    REQUEST_ASSEMBLY_IDS,
    REQUEST_ASSEMBLY_MAPPINGS,
    canonicalize_pdg_name,
    lookup_particle_mapping,
)
from scripts.pdg.pdgfeed_runtime import (  # noqa: E402
    build_cases_by_source,
    build_live_manifest_payload,
    build_live_supported_reaction_csv_rows,
    build_pdgsolve_request,
    build_pdgsolve_request_source,
    build_proposal,
    build_proposal_source,
    build_supported_reaction_csv_row,
    build_supported_reaction_csv_rows,
    extract_unsupported_particle_names,
    format_output_path,
    format_proposal_side_aaa,
    get_pdgsolve_occurrence_primitive_totals,
    is_type_match,
    load_json,
    load_pdgsolve_request_schema,
    load_test_case_index,
    main,
    normalize_particle,
    parse_args,
    print_json,
    proposal_output_path,
    request_output_path,
    resolve_case_by_source,
    slugify,
    validate_against_schema,
    validate_pdgsolve_request_shape,
    write_json,
    write_proposal_artifact,
    write_request_artifacts,
    write_supported_reaction_csv,
)


__all__ = [
    "DEFAULT_OUTPUT_DIR",
    "DEFAULT_PDGSOLVE_REQUEST_POLICY",
    "DEFAULT_SUPPORTED_REACTION_CSV",
    "DEFAULT_TEST_CASE_INDEX",
    "LIVE_CHANNEL_SPEC_BY_ID",
    "LIVE_CHANNEL_SPECS",
    "LiveChannelSpec",
    "NormalizedParticipant",
    "PDGSOLVE_REQUEST_SCHEMA",
    "PDGSOLVE_REQUEST_SCHEMA_PATH",
    "PDG_CANONICAL_NAME_BY_ALIAS",
    "PDG_LIVE_MANIFEST_SCHEMA",
    "PDG_MAPPING_BY_CANONICAL_NAME",
    "PDG_PARTICLE_MAPPINGS",
    "PDG_PROPOSAL_SCHEMA",
    "PDG_SOURCE_CONTRACT",
    "PDG_TEST_CASE_CORPUS_SCHEMA",
    "PDG_TEST_CASE_SOURCE_SCHEMA",
    "ParticleMapping",
    "PdgCase",
    "Proposal",
    "REQUEST_ASSEMBLY_COUNTS",
    "REQUEST_ASSEMBLY_IDS",
    "REQUEST_ASSEMBLY_MAPPINGS",
    "RequestOccurrenceTemplate",
    "TestCaseParticle",
    "build_cases_by_source",
    "build_live_manifest_payload",
    "build_live_supported_reaction_csv_rows",
    "build_pdgsolve_request",
    "build_pdgsolve_request_source",
    "build_proposal",
    "build_proposal_source",
    "build_supported_reaction_csv_row",
    "build_supported_reaction_csv_rows",
    "canonicalize_api_particle_name",
    "canonicalize_pdg_name",
    "connect_pdg",
    "extract_live_decay_products",
    "extract_unsupported_particle_names",
    "find_live_decay",
    "format_output_path",
    "format_proposal_side_aaa",
    "get_pdgsolve_occurrence_primitive_totals",
    "is_type_match",
    "iter_candidate_branching_fractions",
    "load_json",
    "load_live_case",
    "load_pdgsolve_request_schema",
    "load_test_case_index",
    "lookup_particle_mapping",
    "main",
    "normalize_channel_description",
    "normalize_particle",
    "parse_args",
    "print_json",
    "proposal_output_path",
    "request_output_path",
    "resolve_case_by_source",
    "slugify",
    "validate_against_schema",
    "validate_pdgsolve_request_shape",
    "write_json",
    "write_proposal_artifact",
    "write_request_artifacts",
    "write_supported_reaction_csv",
]


if __name__ == "__main__":
    raise SystemExit(main())

