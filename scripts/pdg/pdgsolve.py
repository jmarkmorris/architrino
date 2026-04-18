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
PDGSOLVE_PROBLEM_SCHEMA = "pdgsolve-problem/v1"
PDGSOLVE_RESULT_SCHEMA = "pdgsolve-result/v1"
PDGSOLVE_ACCEPTANCE_SCHEMA = "pdgsolve-acceptance/v1"
PDGSOLVE_PUBLICATION_GRAPH_SCHEMA = "pdgsolve-publication-graph/v2"
PDGSOLVE_PDGEDIT_PACKAGE_SCHEMA = "pdgsolve-pdgedit-package/v1"
PDGEDIT_SCHEMA = "pdgedit/v1"
ASSEMBLY_ALPHABET_ID = "pdgsolve-assemblies/v1-standard-model"
PRIMITIVE_BASIS_ID = "pdgsolve-primitives/electrino-positrino/v1"
LAW_TABLE_ID = "pdgsolve-laws/v1-standard-model"

DEFAULT_TMP_DIR = REPO_ROOT / ".tmp" / "pdgsolve"
DEFAULT_RESULT_CORPUS_OUTPUT_DIR = DEFAULT_TMP_DIR / "results"
DEFAULT_RESULT_CORPUS_INDEX_PATH = DEFAULT_TMP_DIR / "result-corpus.v1.json"
DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR = DEFAULT_TMP_DIR / "pdgedit" / "documents"
DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH = DEFAULT_TMP_DIR / "pdgedit" / "manifest.v1.json"
LIVE_PDGEDIT_EXACT_ENTRY_LIMIT = 64
LIVE_PDGEDIT_REVIEW_ENTRY_LIMIT = 64
UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID = "unbound_architrinos_residue"

PDGEDIT_COMPOSITE_LABEL_SEQUENCE_SPECS = (
    {
        "type": "noether-quad-composite",
        "text": "Noether Quad",
        "recipeSequence": ("pro_noether_core", "anti_noether_core", "pro_noether_core", "anti_noether_core"),
    },
    {
        "type": "pro-proton-composite",
        "text": "Proton",
        "recipeSequence": ("pro_up_quark", "pro_up_quark", "pro_down_quark"),
    },
    {
        "type": "anti-proton-composite",
        "text": "Anti Proton",
        "recipeSequence": ("anti_up_quark", "anti_up_quark", "anti_down_quark"),
    },
    {
        "type": "pro-neutron-composite",
        "text": "Neutron",
        "recipeSequence": ("pro_down_quark", "pro_up_quark", "pro_down_quark"),
    },
    {
        "type": "anti-neutron-composite",
        "text": "Anti Neutron",
        "recipeSequence": ("anti_down_quark", "anti_up_quark", "anti_down_quark"),
    },
    {
        "type": "positive-pion-composite",
        "text": "Positive Pion",
        "recipeSequence": ("pro_up_quark", "anti_down_quark"),
    },
    {
        "type": "negative-pion-composite",
        "text": "Negative Pion",
        "recipeSequence": ("pro_down_quark", "anti_up_quark"),
    },
    {
        "type": "neutral-pion-u-composite",
        "text": "Neutral Pion",
        "recipeSequence": ("pro_up_quark", "anti_up_quark"),
    },
    {
        "type": "neutral-pion-d-composite",
        "text": "Neutral Pion",
        "recipeSequence": ("pro_down_quark", "anti_down_quark"),
    },
    {
        "type": "positive-kaon-composite",
        "text": "Positive Kaon",
        "recipeSequence": ("pro_up_quark", "anti_strange_quark"),
    },
    {
        "type": "negative-kaon-composite",
        "text": "Negative Kaon",
        "recipeSequence": ("pro_strange_quark", "anti_up_quark"),
    },
    {
        "type": "neutral-kaon-d-composite",
        "text": "Neutral Kaon",
        "recipeSequence": ("pro_down_quark", "anti_strange_quark"),
    },
    {
        "type": "neutral-kaon-s-composite",
        "text": "Neutral Kaon",
        "recipeSequence": ("pro_strange_quark", "anti_down_quark"),
    },
    {
        "type": "positive-b-meson-composite",
        "text": "Positive B Meson",
        "recipeSequence": ("pro_up_quark", "anti_bottom_quark"),
    },
    {
        "type": "negative-b-meson-composite",
        "text": "Negative B Meson",
        "recipeSequence": ("pro_bottom_quark", "anti_up_quark"),
    },
    {
        "type": "neutral-b-meson-d-composite",
        "text": "Neutral B Meson",
        "recipeSequence": ("pro_down_quark", "anti_bottom_quark"),
    },
    {
        "type": "neutral-b-meson-b-composite",
        "text": "Neutral B Meson",
        "recipeSequence": ("pro_bottom_quark", "anti_down_quark"),
    },
)

PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_SPECS = (
    {
        "canonicalId": "photon",
        "type": "photon-composite",
        "text": "Photon",
        "recipeSequence": ("pro_noether_core", "anti_noether_core"),
    },
    {
        "canonicalId": "noether_pair",
        "type": "noether-pair-composite",
        "text": "Noether Pair",
        "recipeSequence": ("pro_noether_core", "anti_noether_core"),
    },
    {
        "canonicalId": "proton",
        "type": "pro-proton-composite",
        "text": "Proton",
        "recipeSequence": ("pro_up_quark", "pro_up_quark", "pro_down_quark"),
    },
    {
        "canonicalId": "anti_proton",
        "type": "anti-proton-composite",
        "text": "Anti Proton",
        "recipeSequence": ("anti_up_quark", "anti_up_quark", "anti_down_quark"),
    },
    {
        "canonicalId": "neutron",
        "type": "pro-neutron-composite",
        "text": "Neutron",
        "recipeSequence": ("pro_down_quark", "pro_up_quark", "pro_down_quark"),
    },
    {
        "canonicalId": "anti_neutron",
        "type": "anti-neutron-composite",
        "text": "Anti Neutron",
        "recipeSequence": ("anti_down_quark", "anti_up_quark", "anti_down_quark"),
    },
    {
        "canonicalId": "positive_pion",
        "type": "positive-pion-composite",
        "text": "Positive Pion",
        "recipeSequence": ("pro_up_quark", "anti_down_quark"),
    },
    {
        "canonicalId": "negative_pion",
        "type": "negative-pion-composite",
        "text": "Negative Pion",
        "recipeSequence": ("pro_down_quark", "anti_up_quark"),
    },
    {
        "canonicalId": "positive_kaon",
        "type": "positive-kaon-composite",
        "text": "Positive Kaon",
        "recipeSequence": ("pro_up_quark", "anti_strange_quark"),
    },
    {
        "canonicalId": "negative_kaon",
        "type": "negative-kaon-composite",
        "text": "Negative Kaon",
        "recipeSequence": ("pro_strange_quark", "anti_up_quark"),
    },
    {
        "canonicalId": "neutral_kaon",
        "type": "neutral-kaon-d-composite",
        "text": "Neutral Kaon",
        "recipeSequence": ("pro_down_quark", "anti_strange_quark"),
    },
    {
        "canonicalId": "anti_neutral_kaon",
        "type": "neutral-kaon-s-composite",
        "text": "Neutral Kaon",
        "recipeSequence": ("pro_strange_quark", "anti_down_quark"),
    },
    {
        "canonicalId": "positive_b_meson",
        "type": "positive-b-meson-composite",
        "text": "Positive B Meson",
        "recipeSequence": ("pro_up_quark", "anti_bottom_quark"),
    },
    {
        "canonicalId": "negative_b_meson",
        "type": "negative-b-meson-composite",
        "text": "Negative B Meson",
        "recipeSequence": ("pro_bottom_quark", "anti_up_quark"),
    },
    {
        "canonicalId": "neutral_b_meson",
        "type": "neutral-b-meson-d-composite",
        "text": "Neutral B Meson",
        "recipeSequence": ("pro_down_quark", "anti_bottom_quark"),
    },
    {
        "canonicalId": "anti_neutral_b_meson",
        "type": "neutral-b-meson-b-composite",
        "text": "Neutral B Meson",
        "recipeSequence": ("pro_bottom_quark", "anti_down_quark"),
    },
)

PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_SPEC_BY_CANONICAL_ID = {
    spec["canonicalId"]: spec for spec in PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_SPECS
}

PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_ROLE_BY_SIDE = {
    "left": "reactant",
    "right": "product",
}

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
    "anti_down_quark_I": {
        "title": "Anti Down Quark",
        "pdgeditType": "anti-down-quark-assembly",
        "tiles": [
            "anti-down-quark",
            "binary-full-rb-rb",
            "binary-full-rb-rr",
            "binary-full-rb-rb",
        ],
        "electrinoCount": 5,
        "positrinoCount": 7,
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
    "anti_up_quark_I": {
        "title": "Anti Up Quark",
        "pdgeditType": "anti-up-quark-assembly",
        "tiles": [
            "anti-up-quark",
            "binary-full-rb-bb",
            "binary-full-rb-rb",
            "binary-full-rb-bb",
        ],
        "electrinoCount": 8,
        "positrinoCount": 4,
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
    "pro_charm_quark_II": {
        "title": "Pro Charm Quark",
        "pdgeditType": "pro-charm-quark-assembly",
        "tiles": [
            "pro-charm-quark",
            "binary-full-br-rr",
            "binary-full-br-br",
            "binary-polar-none-rr",
        ],
        "electrinoCount": 3,
        "positrinoCount": 7,
    },
    "anti_charm_quark_II": {
        "title": "Anti Charm Quark",
        "pdgeditType": "anti-charm-quark-assembly",
        "tiles": [
            "anti-charm-quark",
            "binary-full-rb-bb",
            "binary-full-rb-rb",
            "binary-polar-none-bb",
        ],
        "electrinoCount": 7,
        "positrinoCount": 3,
    },
    "pro_strange_quark_II": {
        "title": "Pro Strange Quark",
        "pdgeditType": "pro-strange-quark-assembly",
        "tiles": [
            "pro-strange-quark",
            "binary-full-br-br",
            "binary-full-br-bb",
            "binary-polar-none-br",
        ],
        "electrinoCount": 6,
        "positrinoCount": 4,
    },
    "anti_strange_quark_II": {
        "title": "Anti Strange Quark",
        "pdgeditType": "anti-strange-quark-assembly",
        "tiles": [
            "anti-strange-quark",
            "binary-full-rb-rb",
            "binary-full-rb-rr",
            "binary-polar-none-rb",
        ],
        "electrinoCount": 4,
        "positrinoCount": 6,
    },
    "pro_tau_III": {
        "title": "Pro Tau",
        "pdgeditType": "pro-tau-assembly",
        "tiles": [
            "pro-tau",
            "binary-full-br-bb",
            "binary-polar-none-bb",
            "binary-polar-none-bb",
        ],
        "electrinoCount": 7,
        "positrinoCount": 1,
    },
    "anti_tau_III": {
        "title": "Anti Tau",
        "pdgeditType": "anti-tau-assembly",
        "tiles": [
            "anti-tau",
            "binary-full-rb-rr",
            "binary-polar-none-rr",
            "binary-polar-none-rr",
        ],
        "electrinoCount": 1,
        "positrinoCount": 7,
    },
    "pro_tau_neutrino_III": {
        "title": "Pro Tau Neutrino",
        "pdgeditType": "pro-tau-neutrino-assembly",
        "tiles": [
            "pro-tau-neutrino",
            "binary-full-br-br",
            "binary-polar-none-br",
            "binary-polar-none-br",
        ],
        "electrinoCount": 4,
        "positrinoCount": 4,
    },
    "anti_tau_neutrino_III": {
        "title": "Anti Tau Neutrino",
        "pdgeditType": "anti-tau-neutrino-assembly",
        "tiles": [
            "anti-tau-neutrino",
            "binary-full-rb-rb",
            "binary-polar-none-rb",
            "binary-polar-none-rb",
        ],
        "electrinoCount": 4,
        "positrinoCount": 4,
    },
    "pro_top_quark_III": {
        "title": "Pro Top Quark",
        "pdgeditType": "pro-top-quark-assembly",
        "tiles": [
            "pro-top-quark",
            "binary-full-br-rr",
            "binary-polar-none-br",
            "binary-polar-none-rr",
        ],
        "electrinoCount": 2,
        "positrinoCount": 6,
    },
    "anti_top_quark_III": {
        "title": "Anti Top Quark",
        "pdgeditType": "anti-top-quark-assembly",
        "tiles": [
            "anti-top-quark",
            "binary-full-rb-bb",
            "binary-polar-none-rb",
            "binary-polar-none-bb",
        ],
        "electrinoCount": 6,
        "positrinoCount": 2,
    },
    "pro_bottom_quark_III": {
        "title": "Pro Bottom Quark",
        "pdgeditType": "pro-bottom-quark-assembly",
        "tiles": [
            "pro-bottom-quark",
            "binary-full-br-br",
            "binary-polar-none-bb",
            "binary-polar-none-br",
        ],
        "electrinoCount": 5,
        "positrinoCount": 3,
    },
    "anti_bottom_quark_III": {
        "title": "Anti Bottom Quark",
        "pdgeditType": "anti-bottom-quark-assembly",
        "tiles": [
            "anti-bottom-quark",
            "binary-full-rb-rb",
            "binary-polar-none-rr",
            "binary-polar-none-rb",
        ],
        "electrinoCount": 3,
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

REQUEST_REACTANT_ASSEMBLY_IDS = tuple(
    assembly_id
    for assembly_id in ASSEMBLY_DISPLAY
    if assembly_id != UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
)
REQUEST_PRODUCT_ASSEMBLY_IDS = tuple(ASSEMBLY_DISPLAY)
SUPPORTED_BOUNDARY_AUGMENTATIONS = ("none", "hp", "hq")
PDGEDIT_X_BY_STAGE = {
    "reactantAssemblies": 2,
    "reactantSideOperators": 7,
    "intermediateAssemblies": 9,
    "productSideOperators": 14,
    "productAssemblies": 16,
}

PDGEDIT_ROLE_BY_PUBLICATION_STAGE = {
    "reactantAssemblies": "reactant",
    "intermediateAssemblies": "intermediate",
    "productAssemblies": "product",
}

FERMION_RESIDUE_COUNTS = {
    "pro_electron_I": {"electrinoCount": 6, "positrinoCount": 0},
    "anti_electron_I": {"electrinoCount": 0, "positrinoCount": 6},
    "pro_muon_II": {"electrinoCount": 6, "positrinoCount": 0},
    "anti_muon_II": {"electrinoCount": 0, "positrinoCount": 6},
    "pro_tau_III": {"electrinoCount": 6, "positrinoCount": 0},
    "anti_tau_III": {"electrinoCount": 0, "positrinoCount": 6},
    "pro_electron_neutrino_I": {"electrinoCount": 3, "positrinoCount": 3},
    "anti_electron_neutrino_I": {"electrinoCount": 3, "positrinoCount": 3},
    "pro_muon_neutrino_II": {"electrinoCount": 3, "positrinoCount": 3},
    "anti_muon_neutrino_II": {"electrinoCount": 3, "positrinoCount": 3},
    "pro_tau_neutrino_III": {"electrinoCount": 3, "positrinoCount": 3},
    "anti_tau_neutrino_III": {"electrinoCount": 3, "positrinoCount": 3},
    "pro_down_quark_I": {"electrinoCount": 4, "positrinoCount": 2},
    "anti_down_quark_I": {"electrinoCount": 2, "positrinoCount": 4},
    "pro_strange_quark_II": {"electrinoCount": 4, "positrinoCount": 2},
    "anti_strange_quark_II": {"electrinoCount": 2, "positrinoCount": 4},
    "pro_bottom_quark_III": {"electrinoCount": 4, "positrinoCount": 2},
    "anti_bottom_quark_III": {"electrinoCount": 2, "positrinoCount": 4},
    "pro_up_quark_I": {"electrinoCount": 1, "positrinoCount": 5},
    "anti_up_quark_I": {"electrinoCount": 5, "positrinoCount": 1},
    "pro_charm_quark_II": {"electrinoCount": 1, "positrinoCount": 5},
    "anti_charm_quark_II": {"electrinoCount": 5, "positrinoCount": 1},
    "pro_top_quark_III": {"electrinoCount": 1, "positrinoCount": 5},
    "anti_top_quark_III": {"electrinoCount": 5, "positrinoCount": 1},
}

NOETHER_CORE_SUCCESSOR = {
    "pro_noether_core_I": "pro_noether_core_II",
    "anti_noether_core_I": "anti_noether_core_II",
    "pro_noether_core_II": "pro_noether_core_III",
    "anti_noether_core_II": "anti_noether_core_III",
    "pro_noether_core_III": None,
    "anti_noether_core_III": None,
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


def normalize_reaction_summary_participants(participants: Any) -> list[dict[str, str]]:
    normalized_participants: list[dict[str, str]] = []
    if not isinstance(participants, list):
        return normalized_participants
    for participant in participants:
        if not isinstance(participant, dict):
            continue
        text = normalize_text(participant.get("text"))
        if not text:
            continue
        normalized_participants.append({"text": text})
    return normalized_participants


def clone_reaction_summary(summary: Any) -> dict[str, Any] | None:
    if not isinstance(summary, dict):
        return None
    title = normalize_text(summary.get("title"))
    if not title:
        return None
    normalized_summary: dict[str, Any] = {
        "title": title,
        "pdgReactants": normalize_reaction_summary_participants(summary.get("pdgReactants")),
        "aaaReactants": normalize_reaction_summary_participants(summary.get("aaaReactants")),
        "pdgProducts": normalize_reaction_summary_participants(summary.get("pdgProducts")),
        "aaaProducts": normalize_reaction_summary_participants(summary.get("aaaProducts")),
    }
    pdg_identifier = normalize_text(summary.get("pdgIdentifier"))
    if pdg_identifier:
        normalized_summary["pdgIdentifier"] = pdg_identifier
    return normalized_summary


def clone_balance_summary(summary: Any) -> dict[str, Any] | None:
    if not isinstance(summary, dict):
        return None
    reactant_totals = summary.get("reactantTotals")
    product_totals = summary.get("productTotals")
    if not isinstance(reactant_totals, dict) or not isinstance(product_totals, dict):
        return None
    normalized_summary = {
        "reactantTotals": {
            "epsilonMinusCount": int(reactant_totals.get("epsilonMinusCount", 0) or 0),
            "epsilonPlusCount": int(reactant_totals.get("epsilonPlusCount", 0) or 0),
        },
        "productTotals": {
            "epsilonMinusCount": int(product_totals.get("epsilonMinusCount", 0) or 0),
            "epsilonPlusCount": int(product_totals.get("epsilonPlusCount", 0) or 0),
        },
    }
    normalized_summary["isBalanced"] = (
        normalized_summary["reactantTotals"] == normalized_summary["productTotals"]
    )
    return normalized_summary


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


def primitive_counts_difference(
    left: dict[str, int],
    right: dict[str, int],
) -> dict[str, int]:
    return {
        "electrinoCount": int(left.get("electrinoCount", 0)) - int(right.get("electrinoCount", 0)),
        "positrinoCount": int(left.get("positrinoCount", 0)) - int(right.get("positrinoCount", 0)),
    }


def build_pdgedit_balance_summary(
    reactant_totals: dict[str, int] | None,
    product_totals: dict[str, int] | None,
) -> dict[str, Any] | None:
    if reactant_totals is None or product_totals is None:
        return None
    normalized_reactant_totals = build_primitive_counts(
        reactant_totals.get("electrinoCount"),
        reactant_totals.get("positrinoCount"),
    )
    normalized_product_totals = build_primitive_counts(
        product_totals.get("electrinoCount"),
        product_totals.get("positrinoCount"),
    )
    return {
        "reactantTotals": {
            "epsilonMinusCount": normalized_reactant_totals["electrinoCount"],
            "epsilonPlusCount": normalized_reactant_totals["positrinoCount"],
        },
        "productTotals": {
            "epsilonMinusCount": normalized_product_totals["electrinoCount"],
            "epsilonPlusCount": normalized_product_totals["positrinoCount"],
        },
        "isBalanced": primitive_counts_equal(normalized_reactant_totals, normalized_product_totals),
    }


def primitive_counts_magnitude(counts: dict[str, int]) -> int:
    return abs(int(counts.get("electrinoCount", 0))) + abs(int(counts.get("positrinoCount", 0)))


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


def normalize_boundary_augmentation_modes(policy: dict[str, Any]) -> tuple[list[str], list[dict[str, Any]]]:
    requested_modes = policy.get("allowedBoundaryAugmentations")
    diagnostics: list[dict[str, Any]] = []
    if not isinstance(requested_modes, list) or not requested_modes:
        return ["none"], diagnostics

    normalized_modes: list[str] = []
    for mode in requested_modes:
        normalized_mode = normalize_text(mode)
        if normalized_mode not in SUPPORTED_BOUNDARY_AUGMENTATIONS:
            diagnostics.append(
                make_diagnostic(
                    "pdgsolve.request.unsupported_boundary_augmentation",
                    "request",
                    "The request policy contains an unsupported boundary augmentation mode.",
                    blocking=True,
                    payload={
                        "requestedMode": normalized_mode,
                        "allowedModes": list(SUPPORTED_BOUNDARY_AUGMENTATIONS),
                    },
                )
            )
            continue
        if normalized_mode not in normalized_modes:
            normalized_modes.append(normalized_mode)

    return normalized_modes or ["none"], diagnostics


def normalize_request_occurrences(
    request: dict[str, Any],
    side: str,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    side_records = request.get(side)
    diagnostics: list[dict[str, Any]] = []
    if not isinstance(side_records, list):
        return [], diagnostics

    supported_assembly_ids = (
        REQUEST_REACTANT_ASSEMBLY_IDS if side == "reactants" else REQUEST_PRODUCT_ASSEMBLY_IDS
    )
    normalized_occurrences: list[dict[str, Any]] = []
    seen_occurrence_ids: set[str] = set()
    for index, record in enumerate(side_records, start=1):
        if not isinstance(record, dict):
            continue
        occurrence_id = normalize_text(record.get("id")) or f"{side}_{index}"
        assembly_id = normalize_text(record.get("assemblyId"))
        title = normalize_text(record.get("title")) or assembly_id
        if occurrence_id in seen_occurrence_ids:
            diagnostics.append(
                make_diagnostic(
                    "pdgsolve.request.duplicate_occurrence_id",
                    "request",
                    "The request contains a duplicate occurrence id.",
                    blocking=True,
                    payload={
                        "side": side,
                        "occurrenceId": occurrence_id,
                    },
                )
            )
        else:
            seen_occurrence_ids.add(occurrence_id)
        if assembly_id not in supported_assembly_ids:
            diagnostics.append(
                make_diagnostic(
                    "pdgsolve.request.unsupported_assembly",
                    "request",
                    "The request contains an assembly id outside the admitted v1 assembly alphabet.",
                    blocking=True,
                    payload={
                        "side": side,
                        "occurrenceId": occurrence_id,
                        "assemblyId": assembly_id,
                    },
                )
            )
        occurrence = {
            "id": occurrence_id,
            "assemblyId": assembly_id,
            "title": title,
        }
        if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            occurrence["electrinoCount"] = int(record.get("electrinoCount", 0) or 0)
            occurrence["positrinoCount"] = int(record.get("positrinoCount", 0) or 0)
        normalized_occurrences.append(occurrence)

    return normalized_occurrences, diagnostics


def build_augmentation_mode_records(modes: list[str]) -> list[dict[str, Any]]:
    return [
        {
            "reactantSide": mode,
            "productSide": "none",
        }
        for mode in modes
    ]


def normalize_request_to_problem(request: dict[str, Any]) -> dict[str, Any]:
    diagnostics: list[dict[str, Any]] = []
    reactants, reactant_diagnostics = normalize_request_occurrences(request, "reactants")
    products, product_diagnostics = normalize_request_occurrences(request, "products")
    diagnostics.extend(reactant_diagnostics)
    diagnostics.extend(product_diagnostics)

    policy = clone_json(request.get("policy", {})) if isinstance(request.get("policy"), dict) else {}
    boundary_augmentation_modes, augmentation_diagnostics = normalize_boundary_augmentation_modes(policy)
    diagnostics.extend(augmentation_diagnostics)

    reactant_totals = sum_primitive_counts(reactants) or build_primitive_counts(0, 0)
    product_totals = sum_primitive_counts(products) or build_primitive_counts(0, 0)
    primitive_imbalance = primitive_counts_difference(reactant_totals, product_totals)

    return {
        "schema": PDGSOLVE_PROBLEM_SCHEMA,
        "problemId": build_problem_id(request),
        "requestId": normalize_text(request.get("requestId")),
        "source": clone_json(request.get("source", {})),
        "assemblyAlphabetId": ASSEMBLY_ALPHABET_ID,
        "primitiveBasisId": PRIMITIVE_BASIS_ID,
        "lawTableId": LAW_TABLE_ID,
        "reactants": {
            "orderedOccurrences": reactants,
            "multiset": count_assemblies(reactants),
            "primitiveTotals": reactant_totals,
        },
        "products": {
            "orderedOccurrences": products,
            "multiset": count_assemblies(products),
            "primitiveTotals": product_totals,
        },
        "boundaryAugmentationModes": build_augmentation_mode_records(boundary_augmentation_modes),
        "policy": policy,
        "normalization": {
            "diagnostics": diagnostics,
            "primitiveImbalance": primitive_imbalance,
            "notes": [
                "Requests are normalized into explicit admitted assembly occurrences only.",
                "Occurrence order is preserved for deterministic branch indexing.",
                "Primitive ledger totals are frozen before search begins.",
            ],
        },
    }


def get_problem_occurrences(problem: dict[str, Any], side: str) -> list[dict[str, Any]]:
    return list(problem.get(side, {}).get("orderedOccurrences", []))


def get_generation_suffix(assembly_id: str) -> str:
    return assembly_id.rsplit("_", 1)[-1] if "_" in assembly_id else ""


def get_noether_core_for_assembly(assembly_id: str) -> str | None:
    generation = get_generation_suffix(assembly_id)
    if assembly_id.startswith("pro_"):
        return f"pro_noether_core_{generation}"
    if assembly_id.startswith("anti_"):
        return f"anti_noether_core_{generation}"
    return None


def get_reachable_noether_core_ids_for_assembly(assembly_id: str) -> tuple[str, ...]:
    direct_core_assembly_id = get_noether_core_for_assembly(assembly_id)
    if not direct_core_assembly_id:
        return ()
    reachable_core_ids: list[str] = []
    current_core_assembly_id = direct_core_assembly_id
    while current_core_assembly_id:
        reachable_core_ids.append(current_core_assembly_id)
        current_core_assembly_id = normalize_text(NOETHER_CORE_SUCCESSOR.get(current_core_assembly_id))
    return tuple(reachable_core_ids)


def build_targeted_dissociation_residue_counts(
    assembly_id: str,
    target_core_assembly_id: str,
) -> dict[str, int] | None:
    if target_core_assembly_id not in get_reachable_noether_core_ids_for_assembly(assembly_id):
        return None
    assembly_metadata = ASSEMBLY_DISPLAY.get(assembly_id)
    target_core_metadata = ASSEMBLY_DISPLAY.get(target_core_assembly_id)
    if assembly_metadata is None or target_core_metadata is None:
        return None
    residue_counts = primitive_counts_difference(
        build_primitive_counts(assembly_metadata["electrinoCount"], assembly_metadata["positrinoCount"]),
        build_primitive_counts(target_core_metadata["electrinoCount"], target_core_metadata["positrinoCount"]),
    )
    if residue_counts["electrinoCount"] < 0 or residue_counts["positrinoCount"] < 0:
        return None
    return residue_counts


def select_dissociation_target_core_assembly(
    assembly_id: str,
    remaining_core_demand: dict[str, int],
) -> str | None:
    reachable_core_ids = get_reachable_noether_core_ids_for_assembly(assembly_id)
    for target_core_assembly_id in reversed(reachable_core_ids):
        if int(remaining_core_demand.get(target_core_assembly_id, 0) or 0) > 0:
            return target_core_assembly_id
    return None


def plan_middle_supply_counts(
    non_core_reactants: list[dict[str, Any]],
    reactant_core_counts: dict[str, int],
    product_core_counts: dict[str, int],
) -> dict[str, int]:
    middle_supply_counts = {assembly_id: 0 for assembly_id in NOETHER_CORE_SUCCESSOR}
    remaining_core_demand = {
        assembly_id: max(0, product_core_counts[assembly_id] - reactant_core_counts[assembly_id])
        for assembly_id in NOETHER_CORE_SUCCESSOR
    }
    for reactant in non_core_reactants:
        target_core_assembly_id = select_dissociation_target_core_assembly(
            normalize_text(reactant.get("assemblyId")),
            remaining_core_demand,
        )
        if target_core_assembly_id is None:
            continue
        middle_supply_counts[target_core_assembly_id] += 1
        remaining_core_demand[target_core_assembly_id] -= 1
    return middle_supply_counts


def build_standard_model_law_inventory() -> dict[str, Any]:
    pass_thru = {
        assembly_id: {
            "lawId": f"pass_thru.{assembly_id}",
        }
        for assembly_id in REQUEST_PRODUCT_ASSEMBLY_IDS
    }
    dissociation: dict[str, dict[str, Any]] = {}
    association: dict[str, dict[str, Any]] = {}

    for assembly_id, residue_counts in FERMION_RESIDUE_COUNTS.items():
        core_assembly_id = get_noether_core_for_assembly(assembly_id)
        if core_assembly_id is None:
            continue
        dissociation[assembly_id] = {
            "lawId": f"dissociate.{assembly_id}",
            "outputAssemblyIds": [core_assembly_id],
            "residueCounts": build_primitive_counts(
                residue_counts["electrinoCount"],
                residue_counts["positrinoCount"],
            ),
        }
        association[assembly_id] = {
            "lawId": f"associate.{assembly_id}",
            "requiredAssemblyIds": [core_assembly_id],
            "requiredResidueCounts": build_primitive_counts(
                residue_counts["electrinoCount"],
                residue_counts["positrinoCount"],
            ),
        }

    for assembly_id, successor_assembly_id in NOETHER_CORE_SUCCESSOR.items():
        output_assembly_ids = [successor_assembly_id] if successor_assembly_id is not None else []
        dissociation[assembly_id] = {
            "lawId": f"dissociate.{assembly_id}",
            "outputAssemblyIds": output_assembly_ids,
            "residueCounts": build_primitive_counts(1, 1),
        }

    return {
        "lawTableId": LAW_TABLE_ID,
        "passThru": pass_thru,
        "dissociation": dissociation,
        "association": association,
    }


STANDARD_MODEL_LAW_INVENTORY = build_standard_model_law_inventory()


def get_pass_thru_law(assembly_id: str) -> dict[str, Any] | None:
    return STANDARD_MODEL_LAW_INVENTORY["passThru"].get(assembly_id)


def get_dissociation_law(assembly_id: str) -> dict[str, Any] | None:
    return STANDARD_MODEL_LAW_INVENTORY["dissociation"].get(assembly_id)


def get_association_law(assembly_id: str) -> dict[str, Any] | None:
    return STANDARD_MODEL_LAW_INVENTORY["association"].get(assembly_id)


def build_residue_totals(records: list[dict[str, Any]]) -> dict[str, int]:
    totals = build_primitive_counts(0, 0)
    for record in records:
        if normalize_text(record.get("assemblyId")) != UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            continue
        totals["electrinoCount"] += int(record.get("electrinoCount", 0) or 0)
        totals["positrinoCount"] += int(record.get("positrinoCount", 0) or 0)
    return totals


def canonical_counted_assemblies_from_records(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    counted = count_assemblies(records)
    return sorted(counted, key=lambda item: (item["assemblyId"], item["count"]))


def emitted_operator_choice(choice: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": normalize_text(choice.get("id")),
        "type": normalize_text(choice.get("type")),
        "lawId": choice.get("lawId"),
        "inputOccurrenceKeys": [normalize_text(value) for value in choice.get("inputOccurrenceKeys", [])],
        "outputOccurrenceKeys": [normalize_text(value) for value in choice.get("outputOccurrenceKeys", [])],
        "requiredSupportRows": clone_json(choice.get("requiredSupportRows", [])),
    }


def build_provenance_summary(
    product_occurrences: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
) -> dict[str, Any]:
    operator_by_output = {
        normalize_text(choice.get("outputOccurrenceKeys", [None])[0]): choice
        for choice in product_operator_choices
        if choice.get("outputOccurrenceKeys")
    }
    outputs: list[dict[str, Any]] = []
    for occurrence in product_occurrences:
        occurrence_id = normalize_text(occurrence.get("id"))
        choice = operator_by_output.get(occurrence_id, {})
        outputs.append(
            {
                "occurrenceKey": occurrence_id,
                "provenanceClass": (
                    "pass_thru" if normalize_text(choice.get("type")) == "pass-thru" else "active_rewrite"
                ),
                "supportSourceRows": clone_json(choice.get("requiredSupportRows", [])),
                "ambiguous": False,
            }
        )
    return {
        "summaryText": "The emitted products are accounted for by the deterministic core-first mapper.",
        "outputs": outputs,
    }


def family_score_sort_key(score: dict[str, Any]) -> tuple[Any, ...]:
    return (
        int(score.get("exactness", 999) or 999),
        int(score.get("primitiveMismatch", 999999) or 999999),
        int(score.get("middleMismatch", 999999) or 999999),
        int(score.get("auxiliaryBurden", 999999) or 999999),
        int(score.get("nonIdentityOperatorCount", 999999) or 999999),
        int(score.get("dissociationCount", 999999) or 999999),
        int(score.get("ambiguityPenalty", 999999) or 999999),
        normalize_text(score.get("tieBreakKey")),
    )


def is_noether_core_assembly(assembly_id: str) -> bool:
    return normalize_text(assembly_id) in NOETHER_CORE_SUCCESSOR


def build_core_support_occurrence(charge: str, generation: str, index: int) -> dict[str, Any]:
    assembly_id = f"{charge}_noether_core_{generation}"
    return {
        "id": f"support.{charge}_noether_core_{generation}.{index}",
        "assemblyId": assembly_id,
        "title": ASSEMBLY_DISPLAY[assembly_id]["title"],
    }


def build_intermediate_clone(occurrence: dict[str, Any], suffix: str) -> dict[str, Any]:
    assembly_id = normalize_text(occurrence.get("assemblyId"))
    cloned = {
        "id": f"intermediate.{slugify(normalize_text(occurrence.get('id')))}.{suffix}",
        "assemblyId": assembly_id,
        "title": normalize_text(occurrence.get("title")) or ASSEMBLY_DISPLAY[assembly_id]["title"],
    }
    if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        cloned["electrinoCount"] = int(occurrence.get("electrinoCount", 0) or 0)
        cloned["positrinoCount"] = int(occurrence.get("positrinoCount", 0) or 0)
    return cloned


def ensure_residue_accumulator(intermediate_occurrences: list[dict[str, Any]]) -> dict[str, Any]:
    for occurrence in intermediate_occurrences:
        if normalize_text(occurrence.get("assemblyId")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            return occurrence
    accumulator = build_residue_occurrence(
        "intermediate.unbound_architrinos.accumulator",
        electrino_count=0,
        positrino_count=0,
    )
    intermediate_occurrences.append(accumulator)
    return accumulator


def build_operator_choice(
    operator_id: str,
    operator_type: str,
    *,
    law_id: str | None,
    input_occurrence_keys: list[str],
    output_occurrence_keys: list[str],
    required_support_rows: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    return {
        "id": operator_id,
        "type": operator_type,
        "lawId": law_id,
        "inputOccurrenceKeys": input_occurrence_keys,
        "outputOccurrenceKeys": output_occurrence_keys,
        "requiredSupportRows": clone_json(required_support_rows or []),
    }


def pair_catalyst_occurrences(
    reactants: list[dict[str, Any]],
    products: list[dict[str, Any]],
) -> tuple[list[tuple[dict[str, Any], dict[str, Any]]], list[dict[str, Any]], list[dict[str, Any]]]:
    available_product_indices: dict[str, list[int]] = {}
    for index, product in enumerate(products):
        available_product_indices.setdefault(normalize_text(product.get("assemblyId")), []).append(index)
    used_product_indices: set[int] = set()
    catalyst_pairs: list[tuple[dict[str, Any], dict[str, Any]]] = []
    remaining_reactants: list[dict[str, Any]] = []
    for reactant in reactants:
        assembly_id = normalize_text(reactant.get("assemblyId"))
        matching_indices = available_product_indices.get(assembly_id, [])
        selected_index = next((index for index in matching_indices if index not in used_product_indices), None)
        if selected_index is None:
            remaining_reactants.append(clone_json(reactant))
            continue
        used_product_indices.add(selected_index)
        catalyst_pairs.append((clone_json(reactant), clone_json(products[selected_index])))
    remaining_products = [
        clone_json(product)
        for index, product in enumerate(products)
        if index not in used_product_indices
    ]
    return catalyst_pairs, remaining_reactants, remaining_products


def count_core_occurrences(occurrences: list[dict[str, Any]]) -> dict[str, int]:
    counts = {assembly_id: 0 for assembly_id in NOETHER_CORE_SUCCESSOR}
    for occurrence in occurrences:
        assembly_id = normalize_text(occurrence.get("assemblyId"))
        if assembly_id in counts:
            counts[assembly_id] += 1
    return counts


def compute_added_tri_binary_support_pair_count(
    reactant_core_counts: dict[str, int],
    middle_supply_counts: dict[str, int],
    product_core_counts: dict[str, int],
) -> int:
    required_pair_count_by_charge = {"pro": 0, "anti": 0}

    for charge in ("pro", "anti"):
        remaining_required = {
            generation: int(product_core_counts[f"{charge}_noether_core_{generation}"] or 0)
            for generation in ("I", "II", "III")
        }
        available_direct = {
            generation: int(reactant_core_counts[f"{charge}_noether_core_{generation}"] or 0)
            for generation in ("I", "II", "III")
        }
        available_middle = {
            generation: int(middle_supply_counts[f"{charge}_noether_core_{generation}"] or 0)
            for generation in ("I", "II", "III")
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


def build_product_task(product: dict[str, Any]) -> dict[str, Any] | None:
    assembly_id = normalize_text(product.get("assemblyId"))
    if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        return {
            "product": clone_json(product),
            "coreAssemblyId": None,
            "residueCounts": build_primitive_counts(product.get("electrinoCount"), product.get("positrinoCount")),
            "operatorType": "pass-thru",
            "lawId": get_pass_thru_law(assembly_id)["lawId"],
        }
    if is_noether_core_assembly(assembly_id):
        return {
            "product": clone_json(product),
            "coreAssemblyId": assembly_id,
            "residueCounts": build_primitive_counts(0, 0),
            "operatorType": "associate",
            "lawId": f"associate.{assembly_id}",
        }
    core_assembly_id = get_noether_core_for_assembly(assembly_id)
    if core_assembly_id is None:
        return None
    association_law = get_association_law(assembly_id)
    return {
        "product": clone_json(product),
        "coreAssemblyId": core_assembly_id,
        "residueCounts": clone_json(association_law["requiredResidueCounts"]) if association_law is not None else build_primitive_counts(0, 0),
        "operatorType": "associate",
        "lawId": association_law["lawId"] if association_law is not None else f"associate.{assembly_id}",
    }


def add_pass_thru_mapping(
    source_occurrence: dict[str, Any],
    product_occurrence: dict[str, Any],
    *,
    reactant_operator_choices: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
    intermediate_occurrences: list[dict[str, Any]],
    suffix: str,
) -> dict[str, Any]:
    intermediate = build_intermediate_clone(source_occurrence, suffix)
    intermediate_occurrences.append(clone_json(intermediate))
    reactant_operator_choices.append(
        build_operator_choice(
            f"reactant_operator.{suffix}.pass_thru",
            "pass-thru",
            law_id=get_pass_thru_law(normalize_text(source_occurrence.get("assemblyId")))["lawId"],
            input_occurrence_keys=[normalize_text(source_occurrence.get("id"))],
            output_occurrence_keys=[normalize_text(intermediate.get("id"))],
        )
    )
    product_operator_choices.append(
        build_operator_choice(
            f"product_operator.{suffix}.pass_thru",
            "pass-thru",
            law_id=get_pass_thru_law(normalize_text(product_occurrence.get("assemblyId")))["lawId"],
            input_occurrence_keys=[normalize_text(intermediate.get("id"))],
            output_occurrence_keys=[normalize_text(product_occurrence.get("id"))],
        )
    )
    return intermediate


def add_full_core_dissociation(
    source_occurrence: dict[str, Any],
    *,
    reactant_operator_choices: list[dict[str, Any]],
    intermediate_occurrences: list[dict[str, Any]],
    suffix: str,
) -> None:
    counts = get_occurrence_primitive_counts(source_occurrence) or build_primitive_counts(0, 0)
    residue = ensure_residue_accumulator(intermediate_occurrences)
    residue["electrinoCount"] += counts["electrinoCount"]
    residue["positrinoCount"] += counts["positrinoCount"]
    reactant_operator_choices.append(
        build_operator_choice(
            f"reactant_operator.{suffix}.dissociate",
            "dissociate",
            law_id=f"dissociate.{normalize_text(source_occurrence.get('assemblyId'))}.to_residue",
            input_occurrence_keys=[normalize_text(source_occurrence.get("id"))],
            output_occurrence_keys=[normalize_text(residue.get("id"))],
        )
    )


def add_single_dissociation(
    source_occurrence: dict[str, Any],
    *,
    reactant_operator_choices: list[dict[str, Any]],
    intermediate_occurrences: list[dict[str, Any]],
    suffix: str,
    target_core_assembly_id: str | None = None,
) -> dict[str, Any] | None:
    assembly_id = normalize_text(source_occurrence.get("assemblyId"))
    core_assembly_id = normalize_text(target_core_assembly_id) or get_noether_core_for_assembly(assembly_id)
    if core_assembly_id is None:
        return None
    residue_counts = build_targeted_dissociation_residue_counts(assembly_id, core_assembly_id)
    if residue_counts is None:
        return None
    core_occurrence = {
        "id": f"intermediate.{slugify(normalize_text(source_occurrence.get('id')))}.{suffix}.core",
        "assemblyId": core_assembly_id,
        "title": ASSEMBLY_DISPLAY[core_assembly_id]["title"],
    }
    residue = ensure_residue_accumulator(intermediate_occurrences)
    residue["electrinoCount"] += residue_counts["electrinoCount"]
    residue["positrinoCount"] += residue_counts["positrinoCount"]
    intermediate_occurrences.append(clone_json(core_occurrence))
    reactant_operator_choices.append(
        build_operator_choice(
            f"reactant_operator.{suffix}.dissociate",
            "dissociate",
            law_id=(
                get_dissociation_law(assembly_id)["lawId"]
                if core_assembly_id == get_noether_core_for_assembly(assembly_id) and get_dissociation_law(assembly_id) is not None
                else f"dissociate.{assembly_id}.to.{core_assembly_id}"
            ),
            input_occurrence_keys=[normalize_text(source_occurrence.get("id"))],
            output_occurrence_keys=[normalize_text(core_occurrence.get("id")), normalize_text(residue.get("id"))],
        )
    )
    return core_occurrence


def build_deterministic_score(
    reactant_operator_choices: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
    added_support_occurrences: list[dict[str, Any]],
) -> dict[str, Any]:
    non_identity_operator_count = sum(
        1
        for choice in [*reactant_operator_choices, *product_operator_choices]
        if normalize_text(choice.get("type")) != "pass-thru"
    )
    dissociation_count = sum(
        1 for choice in reactant_operator_choices if normalize_text(choice.get("type")) == "dissociate"
    )
    return {
        "exactness": 0,
        "primitiveMismatch": 0,
        "middleMismatch": 0,
        "auxiliaryBurden": len(added_support_occurrences),
        "nonIdentityOperatorCount": non_identity_operator_count,
        "dissociationCount": dissociation_count,
        "ambiguityPenalty": 0,
        "tieBreakKey": "deterministic_core_first",
    }


def build_exact_family(problem: dict[str, Any]) -> dict[str, Any] | None:
    reactants = [clone_json(record) for record in get_problem_occurrences(problem, "reactants")]
    products = [clone_json(record) for record in get_problem_occurrences(problem, "products")]
    catalyst_pairs, remaining_reactants, remaining_products = pair_catalyst_occurrences(reactants, products)

    reactant_occurrences = [clone_json(record) for record in reactants]
    intermediate_occurrences: list[dict[str, Any]] = []
    reactant_operator_choices: list[dict[str, Any]] = []
    product_operator_choices: list[dict[str, Any]] = []
    added_support_occurrences: list[dict[str, Any]] = []

    for pair_index, (reactant, product) in enumerate(catalyst_pairs, start=1):
        add_pass_thru_mapping(
            reactant,
            product,
            reactant_operator_choices=reactant_operator_choices,
            product_operator_choices=product_operator_choices,
            intermediate_occurrences=intermediate_occurrences,
            suffix=f"catalyst.{pair_index}",
        )

    product_tasks: list[dict[str, Any]] = []
    for product in remaining_products:
        task = build_product_task(product)
        if task is None:
            return None
        product_tasks.append(task)

    remaining_reactant_cores = [
        clone_json(occurrence)
        for occurrence in remaining_reactants
        if is_noether_core_assembly(normalize_text(occurrence.get("assemblyId")))
    ]
    remaining_non_core_reactants = [
        clone_json(occurrence)
        for occurrence in remaining_reactants
        if not is_noether_core_assembly(normalize_text(occurrence.get("assemblyId")))
    ]
    core_product_tasks = [
        clone_json(task)
        for task in product_tasks
        if normalize_text(task.get("coreAssemblyId"))
    ]
    residue_product_tasks = [
        clone_json(task)
        for task in product_tasks
        if normalize_text(task["product"].get("assemblyId")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
    ]

    reactant_core_counts = count_core_occurrences(remaining_reactant_cores)
    product_core_counts = {
        assembly_id: 0 for assembly_id in NOETHER_CORE_SUCCESSOR
    }
    for task in core_product_tasks:
        product_core_counts[normalize_text(task["coreAssemblyId"])] += 1
    middle_supply_counts = plan_middle_supply_counts(
        remaining_non_core_reactants,
        reactant_core_counts,
        product_core_counts,
    )

    support_pair_count = compute_added_tri_binary_support_pair_count(
        reactant_core_counts,
        middle_supply_counts,
        product_core_counts,
    )
    for index in range(1, support_pair_count + 1):
        pro_support = build_core_support_occurrence("pro", "I", index)
        anti_support = build_core_support_occurrence("anti", "I", index)
        reactant_occurrences.extend([clone_json(pro_support), clone_json(anti_support)])
        added_support_occurrences.extend([clone_json(pro_support), clone_json(anti_support)])
        remaining_reactant_cores.extend([clone_json(pro_support), clone_json(anti_support)])
        reactant_core_counts["pro_noether_core_I"] += 1
        reactant_core_counts["anti_noether_core_I"] += 1

    ladder_conversion_counts = {
        assembly_id: 0 for assembly_id in NOETHER_CORE_SUCCESSOR
    }
    for charge in ("pro", "anti"):
        source_id = f"{charge}_noether_core_I"
        target_id = f"{charge}_noether_core_II"
        source_surplus = max(0, reactant_core_counts[source_id] - product_core_counts[source_id])
        unmet_target = max(
            0,
            product_core_counts[target_id] - reactant_core_counts[target_id] - middle_supply_counts[target_id],
        )
        convert_count = min(source_surplus, unmet_target)
        if convert_count > 0:
            ladder_conversion_counts[source_id] = convert_count
            reactant_core_counts[source_id] -= convert_count
            middle_supply_counts[target_id] += convert_count
    for charge in ("pro", "anti"):
        source_id = f"{charge}_noether_core_II"
        target_id = f"{charge}_noether_core_III"
        source_surplus = max(0, reactant_core_counts[source_id] - product_core_counts[source_id])
        unmet_target = max(
            0,
            product_core_counts[target_id] - reactant_core_counts[target_id] - middle_supply_counts[target_id],
        )
        convert_count = min(source_surplus, unmet_target)
        if convert_count > 0:
            ladder_conversion_counts[source_id] = convert_count
            reactant_core_counts[source_id] -= convert_count
            middle_supply_counts[target_id] += convert_count

    cores_by_type: dict[str, list[dict[str, Any]]] = {assembly_id: [] for assembly_id in NOETHER_CORE_SUCCESSOR}
    for core_occurrence in remaining_reactant_cores:
        cores_by_type[normalize_text(core_occurrence.get("assemblyId"))].append(clone_json(core_occurrence))

    ladder_core_pool: dict[str, list[dict[str, Any]]] = {assembly_id: [] for assembly_id in NOETHER_CORE_SUCCESSOR}
    for source_id, convert_count in ladder_conversion_counts.items():
        if convert_count <= 0:
            continue
        successor_id = normalize_text(NOETHER_CORE_SUCCESSOR.get(source_id))
        if not successor_id:
            continue
        converted_occurrences = cores_by_type[source_id][:convert_count]
        cores_by_type[source_id] = cores_by_type[source_id][convert_count:]
        for index, occurrence in enumerate(converted_occurrences, start=1):
            accumulator = ensure_residue_accumulator(intermediate_occurrences)
            accumulator["electrinoCount"] += 1
            accumulator["positrinoCount"] += 1
            intermediate = {
                "id": f"intermediate.{slugify(normalize_text(occurrence.get('id')))}.ladder.{index}",
                "assemblyId": successor_id,
                "title": ASSEMBLY_DISPLAY[successor_id]["title"],
            }
            intermediate_occurrences.append(clone_json(intermediate))
            reactant_operator_choices.append(
                build_operator_choice(
                    f"reactant_operator.{slugify(normalize_text(occurrence.get('id')))}.ladder.{index}.dissociate",
                    "dissociate",
                    law_id=get_dissociation_law(source_id)["lawId"],
                    input_occurrence_keys=[normalize_text(occurrence.get("id"))],
                    output_occurrence_keys=[
                        normalize_text(intermediate.get("id")),
                        normalize_text(accumulator.get("id")),
                    ],
                )
            )
            ladder_core_pool[successor_id].append(clone_json(intermediate))

    direct_core_pool: dict[str, list[dict[str, Any]]] = {assembly_id: [] for assembly_id in NOETHER_CORE_SUCCESSOR}
    direct_task_quota = {
        assembly_id: min(len(core_occurrences), product_core_counts[assembly_id])
        for assembly_id, core_occurrences in cores_by_type.items()
    }
    for assembly_id, core_occurrences in cores_by_type.items():
        needed_count = direct_task_quota[assembly_id]
        necessary = core_occurrences[:needed_count]
        extras = core_occurrences[needed_count:]
        for index, occurrence in enumerate(necessary, start=1):
            intermediate = build_intermediate_clone(occurrence, f"bare_core.{index}")
            intermediate_occurrences.append(clone_json(intermediate))
            reactant_operator_choices.append(
                build_operator_choice(
                    f"reactant_operator.{slugify(normalize_text(occurrence.get('id')))}.pass_thru",
                    "pass-thru",
                    law_id=get_pass_thru_law(assembly_id)["lawId"],
                    input_occurrence_keys=[normalize_text(occurrence.get("id"))],
                    output_occurrence_keys=[normalize_text(intermediate.get("id"))],
                )
            )
            direct_core_pool[assembly_id].append(clone_json(intermediate))
        for index, occurrence in enumerate(extras, start=1):
            add_full_core_dissociation(
                occurrence,
                reactant_operator_choices=reactant_operator_choices,
                intermediate_occurrences=intermediate_occurrences,
                suffix=f"extra_core.{slugify(normalize_text(occurrence.get('id')))}.{index}",
            )

    middle_core_pool: dict[str, list[dict[str, Any]]] = {
        assembly_id: [clone_json(occurrence) for occurrence in ladder_core_pool[assembly_id]]
        for assembly_id in NOETHER_CORE_SUCCESSOR
    }
    remaining_middle_demand = {
        assembly_id: max(
            0,
            product_core_counts[assembly_id]
            - direct_task_quota[assembly_id]
            - len(middle_core_pool[assembly_id]),
        )
        for assembly_id in NOETHER_CORE_SUCCESSOR
    }
    for reactant_index, reactant in enumerate(remaining_non_core_reactants, start=1):
        target_core_assembly_id = select_dissociation_target_core_assembly(
            normalize_text(reactant.get("assemblyId")),
            remaining_middle_demand,
        )
        if target_core_assembly_id is not None:
            core_occurrence = add_single_dissociation(
                reactant,
                reactant_operator_choices=reactant_operator_choices,
                intermediate_occurrences=intermediate_occurrences,
                suffix=f"reactant.{reactant_index}",
                target_core_assembly_id=target_core_assembly_id,
            )
            if core_occurrence is not None:
                remaining_middle_demand[target_core_assembly_id] -= 1
                middle_core_pool[normalize_text(core_occurrence.get("assemblyId"))].append(clone_json(core_occurrence))
                continue
        add_full_core_dissociation(
            reactant,
            reactant_operator_choices=reactant_operator_choices,
            intermediate_occurrences=intermediate_occurrences,
            suffix=f"reactant.{reactant_index}.to_residue",
        )

    residue_accumulator = ensure_residue_accumulator(intermediate_occurrences)
    available_residue_counts = build_primitive_counts(
        residue_accumulator.get("electrinoCount"),
        residue_accumulator.get("positrinoCount"),
    )

    for task_index, task in enumerate(core_product_tasks, start=1):
        core_assembly_id = normalize_text(task["coreAssemblyId"])
        if direct_task_quota[core_assembly_id] > 0:
            if not direct_core_pool[core_assembly_id]:
                return None
            direct_task_quota[core_assembly_id] -= 1
            core_input = direct_core_pool[core_assembly_id].pop(0)
        else:
            if not middle_core_pool[core_assembly_id]:
                return None
            core_input = middle_core_pool[core_assembly_id].pop(0)
        residue_counts = clone_json(task["residueCounts"])
        residue_input_ids: list[str] = []
        if residue_counts["electrinoCount"] or residue_counts["positrinoCount"]:
            if (
                available_residue_counts["electrinoCount"] < residue_counts["electrinoCount"]
                or available_residue_counts["positrinoCount"] < residue_counts["positrinoCount"]
            ):
                return None
            available_residue_counts["electrinoCount"] -= residue_counts["electrinoCount"]
            available_residue_counts["positrinoCount"] -= residue_counts["positrinoCount"]
            residue_input_ids = [normalize_text(residue_accumulator.get("id"))]
        product_operator_choices.append(
            build_operator_choice(
                f"product_operator.product.{task_index}.associate",
                "associate",
                law_id=normalize_text(task["lawId"]),
                input_occurrence_keys=[normalize_text(core_input.get("id")), *residue_input_ids],
                output_occurrence_keys=[normalize_text(task["product"].get("id"))],
                required_support_rows=[
                    {"rowAssemblyId": core_assembly_id, "count": 1},
                    *(
                        [{"rowAssemblyId": UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID, "count": 1}]
                        if residue_input_ids
                        else []
                    ),
                ],
            )
        )

    for task_index, task in enumerate(residue_product_tasks, start=1):
        residue_counts = clone_json(task["residueCounts"])
        if (
            available_residue_counts["electrinoCount"] < residue_counts["electrinoCount"]
            or available_residue_counts["positrinoCount"] < residue_counts["positrinoCount"]
        ):
            return None
        available_residue_counts["electrinoCount"] -= residue_counts["electrinoCount"]
        available_residue_counts["positrinoCount"] -= residue_counts["positrinoCount"]
        product_operator_choices.append(
            build_operator_choice(
                f"product_operator.residue.{task_index}.pass_thru",
                "pass-thru",
                law_id=normalize_text(task["lawId"]),
                input_occurrence_keys=[normalize_text(residue_accumulator.get("id"))],
                output_occurrence_keys=[normalize_text(task["product"].get("id"))],
                required_support_rows=[{"rowAssemblyId": UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID, "count": 1}],
            )
        )

    if primitive_counts_magnitude(available_residue_counts) != 0:
        return None

    occurrence_counts = build_occurrence_counts_map(
        [
            *clone_json(reactant_occurrences),
            *clone_json(intermediate_occurrences),
            *clone_json(products),
        ]
    )
    solve_graph = build_publication_graph(
        reactant_occurrences=reactant_occurrences,
        intermediate_occurrences=intermediate_occurrences,
        product_occurrences=products,
        reactant_operator_choices=reactant_operator_choices,
        product_operator_choices=product_operator_choices,
        occurrence_counts=occurrence_counts,
        prefix="family_exact_1",
    )
    score = build_deterministic_score(
        reactant_operator_choices,
        product_operator_choices,
        added_support_occurrences,
    )
    provenance_summary = build_provenance_summary(products, product_operator_choices)
    serialized_reactant_operators = [emitted_operator_choice(choice) for choice in reactant_operator_choices]
    serialized_product_operators = [emitted_operator_choice(choice) for choice in product_operator_choices]
    family = {
        "familyId": "family.exact.1",
        "kind": "exact",
        "score": score,
        "augmentation": {"reactantSide": "none", "productSide": "none"},
        "reactantAssemblies": canonical_counted_assemblies_from_records(reactant_occurrences),
        "reactantSideOperators": serialized_reactant_operators,
        "intermediateAssemblies": canonical_counted_assemblies_from_records(intermediate_occurrences),
        "productSideOperators": serialized_product_operators,
        "productAssemblies": canonical_counted_assemblies_from_records(products),
        "provenanceSummary": provenance_summary,
        "diagnostics": [],
        "rawBranchCount": 1,
        "publicationReady": True,
        "addedSupportOccurrences": clone_json(added_support_occurrences),
        "canonicalCandidate": {
            "candidateId": "candidate.exact.1",
            "exact": True,
            "reactantAssemblies": canonical_counted_assemblies_from_records(reactant_occurrences),
            "reactantSideOperators": serialized_reactant_operators,
            "intermediateAssemblies": canonical_counted_assemblies_from_records(intermediate_occurrences),
            "productSideOperators": serialized_product_operators,
            "productAssemblies": canonical_counted_assemblies_from_records(products),
            "provenanceSummary": clone_json(provenance_summary),
            "solveGraph": solve_graph,
        },
    }
    return family


def build_publication_unit_id(stage: str, recipe_id: str, unit_index: int) -> str:
    return f"graph_{slugify(stage)}_{slugify(recipe_id)}_{unit_index}"


def build_publication_graph_assembly_unit(
    *,
    unit_id: str,
    stage: str,
    occurrence_key: str,
    recipe_id: str,
    title: str,
    counts: dict[str, int] | None,
    source_occurrence_keys: list[str] | None = None,
) -> dict[str, Any]:
    normalized_counts = counts or build_primitive_counts(
        ASSEMBLY_DISPLAY[recipe_id]["electrinoCount"],
        ASSEMBLY_DISPLAY[recipe_id]["positrinoCount"],
    )
    unit = {
        "id": unit_id,
        "kind": "assembly",
        "stage": stage,
        "recipeId": recipe_id,
        "occurrenceKey": occurrence_key,
        "title": title,
        "electrinoCount": normalized_counts["electrinoCount"],
        "positrinoCount": normalized_counts["positrinoCount"],
    }
    if source_occurrence_keys:
        unit["sourceOccurrenceKeys"] = source_occurrence_keys
    return unit


def build_publication_graph_operator_unit(
    *,
    unit_id: str,
    stage: str,
    choice: dict[str, Any],
) -> dict[str, Any]:
    return {
        "id": unit_id,
        "kind": "operator",
        "stage": stage,
        "recipeId": normalize_text(choice.get("type")),
        "occurrenceKey": normalize_text(choice.get("id")),
        "title": normalize_text(choice.get("type")).replace("-", " ").title(),
        "lawId": choice.get("lawId"),
    }


def build_publication_graph_intermediate_units(
    intermediate_occurrences: list[dict[str, Any]],
    occurrence_counts: dict[str, dict[str, int]],
) -> tuple[list[dict[str, Any]], dict[str, str]]:
    units: list[dict[str, Any]] = []
    unit_by_source_occurrence: dict[str, str] = {}
    unit_index = 0
    residue_occurrences = [
        occurrence
        for occurrence in intermediate_occurrences
        if normalize_text(occurrence.get("assemblyId")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
    ]
    for occurrence in intermediate_occurrences:
        occurrence_key = normalize_text(occurrence.get("id"))
        recipe_id = normalize_text(occurrence.get("assemblyId"))
        if not occurrence_key or not recipe_id or recipe_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
            continue
        unit_index += 1
        unit_id = build_publication_unit_id("intermediateAssemblies", recipe_id, unit_index)
        units.append(
            build_publication_graph_assembly_unit(
                unit_id=unit_id,
                stage="intermediateAssemblies",
                occurrence_key=occurrence_key,
                recipe_id=recipe_id,
                title=normalize_text(occurrence.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
                counts=occurrence_counts.get(occurrence_key),
            )
        )
        unit_by_source_occurrence[occurrence_key] = unit_id

    if residue_occurrences:
        residue_counts = build_residue_totals(residue_occurrences)
        residue_sources = [
            normalize_text(occurrence.get("id"))
            for occurrence in residue_occurrences
            if normalize_text(occurrence.get("id"))
        ]
        unit_index += 1
        unit_id = build_publication_unit_id(
            "intermediateAssemblies",
            UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID,
            unit_index,
        )
        units.append(
            build_publication_graph_assembly_unit(
                unit_id=unit_id,
                stage="intermediateAssemblies",
                occurrence_key="graph_intermediate.unbound_architrinos_accumulator",
                recipe_id=UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID,
                title=ASSEMBLY_DISPLAY[UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID]["title"],
                counts=residue_counts,
                source_occurrence_keys=residue_sources,
            )
        )
        for residue_source in residue_sources:
            unit_by_source_occurrence[residue_source] = unit_id

    return units, unit_by_source_occurrence


def build_publication_graph(
    *,
    reactant_occurrences: list[dict[str, Any]],
    intermediate_occurrences: list[dict[str, Any]],
    product_occurrences: list[dict[str, Any]],
    reactant_operator_choices: list[dict[str, Any]],
    product_operator_choices: list[dict[str, Any]],
    occurrence_counts: dict[str, dict[str, int]],
    prefix: str,
) -> dict[str, Any]:
    units: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []
    reactant_units_by_occurrence: dict[str, str] = {}
    for unit_index, reactant in enumerate(reactant_occurrences, start=1):
        occurrence_key = normalize_text(reactant.get("id"))
        recipe_id = normalize_text(reactant.get("assemblyId"))
        unit_id = build_publication_unit_id("reactantAssemblies", recipe_id, unit_index)
        reactant_units_by_occurrence[occurrence_key] = unit_id
        units.append(
            build_publication_graph_assembly_unit(
                unit_id=unit_id,
                stage="reactantAssemblies",
                occurrence_key=occurrence_key,
                recipe_id=recipe_id,
                title=normalize_text(reactant.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
                counts=occurrence_counts.get(occurrence_key),
            )
        )

    reactant_operator_units_by_occurrence: dict[str, str] = {}
    for unit_index, choice in enumerate(reactant_operator_choices, start=1):
        operator_id = normalize_text(choice.get("id"))
        unit_id = build_publication_unit_id(
            "reactantSideOperators",
            f"{prefix}_{normalize_text(choice.get('type'))}",
            unit_index,
        )
        reactant_operator_units_by_occurrence[operator_id] = unit_id
        units.append(
            build_publication_graph_operator_unit(
                unit_id=unit_id,
                stage="reactantSideOperators",
                choice=choice,
            )
        )

    intermediate_units, intermediate_unit_by_source_occurrence = build_publication_graph_intermediate_units(
        intermediate_occurrences,
        occurrence_counts,
    )
    units.extend(intermediate_units)

    product_operator_units_by_occurrence: dict[str, str] = {}
    for unit_index, choice in enumerate(product_operator_choices, start=1):
        output_occurrence_key = normalize_text(choice.get("outputOccurrenceKeys", [None])[0])
        unit_id = build_publication_unit_id(
            "productSideOperators",
            f"{prefix}_{normalize_text(choice.get('type'))}",
            unit_index,
        )
        product_operator_units_by_occurrence[output_occurrence_key] = unit_id
        units.append(
            build_publication_graph_operator_unit(
                unit_id=unit_id,
                stage="productSideOperators",
                choice=choice,
            )
        )

    product_units_by_occurrence: dict[str, str] = {}
    for unit_index, product in enumerate(product_occurrences, start=1):
        occurrence_key = normalize_text(product.get("id"))
        recipe_id = normalize_text(product.get("assemblyId"))
        unit_id = build_publication_unit_id("productAssemblies", recipe_id, unit_index)
        product_units_by_occurrence[occurrence_key] = unit_id
        units.append(
            build_publication_graph_assembly_unit(
                unit_id=unit_id,
                stage="productAssemblies",
                occurrence_key=occurrence_key,
                recipe_id=recipe_id,
                title=normalize_text(product.get("title")) or ASSEMBLY_DISPLAY[recipe_id]["title"],
                counts=occurrence_counts.get(occurrence_key),
            )
        )

    for choice in reactant_operator_choices:
        operator_unit_id = reactant_operator_units_by_occurrence[normalize_text(choice.get("id"))]
        for input_index, occurrence_key in enumerate(choice.get("inputOccurrenceKeys", []), start=1):
            edge_counts = build_publication_graph_input_edge_counts(
                choice,
                occurrence_key=normalize_text(occurrence_key),
                input_index=input_index,
                occurrence_counts=occurrence_counts,
            )
            edges.append(
                {
                    "id": f"{prefix}_{slugify(normalize_text(choice.get('id')))}_input_{input_index}",
                    "fromUnitId": reactant_units_by_occurrence[normalize_text(occurrence_key)],
                    "fromPortId": "output",
                    "toUnitId": operator_unit_id,
                    "toPortId": f"input_{input_index}",
                    **({"primitiveCounts": clone_json(edge_counts)} if edge_counts is not None else {}),
                }
            )
        for output_index, occurrence_key in enumerate(choice.get("outputOccurrenceKeys", []), start=1):
            edge_counts = build_publication_graph_output_edge_counts(
                choice,
                occurrence_key=normalize_text(occurrence_key),
                output_index=output_index,
                occurrence_counts=occurrence_counts,
            )
            edges.append(
                {
                    "id": f"{prefix}_{slugify(normalize_text(choice.get('id')))}_output_{output_index}",
                    "fromUnitId": operator_unit_id,
                    "fromPortId": f"output_{output_index}",
                    "toUnitId": intermediate_unit_by_source_occurrence[normalize_text(occurrence_key)],
                    "toPortId": "input",
                    **({"primitiveCounts": clone_json(edge_counts)} if edge_counts is not None else {}),
                }
            )

    for choice in product_operator_choices:
        output_occurrence_key = normalize_text(choice.get("outputOccurrenceKeys", [None])[0])
        operator_unit_id = product_operator_units_by_occurrence[output_occurrence_key]
        for input_index, occurrence_key in enumerate(choice.get("inputOccurrenceKeys", []), start=1):
            edge_counts = build_publication_graph_input_edge_counts(
                choice,
                occurrence_key=normalize_text(occurrence_key),
                input_index=input_index,
                occurrence_counts=occurrence_counts,
            )
            edges.append(
                {
                    "id": f"{prefix}_{slugify(normalize_text(choice.get('id')))}_input_{input_index}",
                    "fromUnitId": intermediate_unit_by_source_occurrence[normalize_text(occurrence_key)],
                    "fromPortId": "output",
                    "toUnitId": operator_unit_id,
                    "toPortId": f"input_{input_index}",
                    **({"primitiveCounts": clone_json(edge_counts)} if edge_counts is not None else {}),
                }
            )
        output_edge_counts = build_publication_graph_output_edge_counts(
            choice,
            occurrence_key=output_occurrence_key,
            output_index=1,
            occurrence_counts=occurrence_counts,
        )
        edges.append(
            {
                "id": f"{prefix}_{slugify(normalize_text(choice.get('id')))}_output_1",
                "fromUnitId": operator_unit_id,
                "fromPortId": "output_1",
                "toUnitId": product_units_by_occurrence[output_occurrence_key],
                "toPortId": "input",
                **(
                    {"primitiveCounts": clone_json(output_edge_counts)}
                    if output_edge_counts is not None
                    else {}
                ),
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


def clone_primitive_counts(counts: dict[str, int] | None) -> dict[str, int] | None:
    if counts is None:
        return None
    return build_primitive_counts(
        counts.get("electrinoCount"),
        counts.get("positrinoCount"),
    )


def primitive_counts_are_nonnegative(counts: dict[str, int] | None) -> bool:
    return bool(
        counts is not None
        and int(counts.get("electrinoCount", 0)) >= 0
        and int(counts.get("positrinoCount", 0)) >= 0
    )


def subtract_primitive_counts_nonnegative(
    left: dict[str, int] | None,
    right: dict[str, int] | None,
) -> dict[str, int] | None:
    if left is None:
        return None
    difference = primitive_counts_difference(
        left,
        right or build_primitive_counts(0, 0),
    )
    return difference if primitive_counts_are_nonnegative(difference) else None


def is_residue_accumulator_occurrence_key(occurrence_key: str) -> bool:
    return normalize_text(occurrence_key) == "intermediate.unbound_architrinos.accumulator"


def build_publication_graph_input_edge_counts(
    choice: dict[str, Any],
    *,
    occurrence_key: str,
    input_index: int,
    occurrence_counts: dict[str, dict[str, int]],
) -> dict[str, int] | None:
    normalized_occurrence_key = normalize_text(occurrence_key)
    direct_counts = clone_primitive_counts(occurrence_counts.get(normalized_occurrence_key))
    if not is_residue_accumulator_occurrence_key(normalized_occurrence_key):
        return direct_counts
    output_totals = sum_counts_for_occurrence_keys(choice.get("outputOccurrenceKeys", []), occurrence_counts)
    if output_totals is None:
        return direct_counts
    other_input_keys = [
        normalize_text(value)
        for index, value in enumerate(choice.get("inputOccurrenceKeys", []), start=1)
        if index != input_index and normalize_text(value)
    ]
    other_input_totals = sum_counts_for_occurrence_keys(other_input_keys, occurrence_counts)
    if other_input_keys and other_input_totals is None:
        return direct_counts
    return subtract_primitive_counts_nonnegative(output_totals, other_input_totals) or direct_counts


def build_publication_graph_output_edge_counts(
    choice: dict[str, Any],
    *,
    occurrence_key: str,
    output_index: int,
    occurrence_counts: dict[str, dict[str, int]],
) -> dict[str, int] | None:
    normalized_occurrence_key = normalize_text(occurrence_key)
    direct_counts = clone_primitive_counts(occurrence_counts.get(normalized_occurrence_key))
    if not is_residue_accumulator_occurrence_key(normalized_occurrence_key):
        return direct_counts
    input_totals = sum_counts_for_occurrence_keys(choice.get("inputOccurrenceKeys", []), occurrence_counts)
    if input_totals is None:
        return direct_counts
    other_output_keys = [
        normalize_text(value)
        for index, value in enumerate(choice.get("outputOccurrenceKeys", []), start=1)
        if index != output_index and normalize_text(value)
    ]
    other_output_totals = sum_counts_for_occurrence_keys(other_output_keys, occurrence_counts)
    if other_output_keys and other_output_totals is None:
        return direct_counts
    return subtract_primitive_counts_nonnegative(input_totals, other_output_totals) or direct_counts


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

def build_unsupported_family(
    problem: dict[str, Any],
    *,
    diagnostics: list[dict[str, Any]] | None = None,
    tie_break_key: str = "unsupported_request",
    summary_text: str | None = None,
) -> dict[str, Any]:
    product_occurrences = get_problem_occurrences(problem, "products")
    provenance_outputs = [
        {
            "occurrenceKey": normalize_text(product.get("id")) or f"product_{index + 1}",
            "provenanceClass": "mixed",
            "supportSourceRows": [],
            "ambiguous": True,
        }
        for index, product in enumerate(product_occurrences)
    ]
    resolved_diagnostics = clone_json(diagnostics or [])
    resolved_summary_text = summary_text or (
        "No exact solver law is available for this request, so "
        "pdgsolve emitted a deterministic no-exact-closure family."
    )
    primitive_imbalance = clone_json(problem.get("normalization", {}).get("primitiveImbalance", {}))
    return {
        "familyId": "family.unsolved.v1",
        "kind": "no_exact_closure",
        "score": {
            "exactness": 1,
            "primitiveMismatch": max(1, primitive_counts_magnitude(primitive_imbalance)),
            "middleMismatch": max(1, len(product_occurrences)),
            "auxiliaryBurden": 0,
            "nonIdentityOperatorCount": 0,
            "dissociationCount": 0,
            "ambiguityPenalty": max(1, len(product_occurrences)),
            "tieBreakKey": tie_break_key,
        },
        "augmentation": {
            "reactantSide": "none",
            "productSide": "none",
        },
        "reactantAssemblies": clone_json(problem.get("reactants", {}).get("multiset", [])),
        "reactantSideOperators": [],
        "intermediateAssemblies": [],
        "productSideOperators": [],
        "productAssemblies": clone_json(problem.get("products", {}).get("multiset", [])),
        "provenanceSummary": {
            "summaryText": resolved_summary_text,
            "outputs": provenance_outputs,
        },
        "diagnostics": resolved_diagnostics,
        "rawBranchCount": 0,
        "publicationReady": False,
        "canonicalCandidate": {
            "candidateId": "candidate.unsupported.v1",
            "exact": False,
            "reactantAssemblies": clone_json(problem.get("reactants", {}).get("multiset", [])),
            "reactantSideOperators": [],
            "intermediateAssemblies": [],
            "productSideOperators": [],
            "productAssemblies": clone_json(problem.get("products", {}).get("multiset", [])),
            "provenanceSummary": {
                "summaryText": resolved_summary_text,
                "outputs": provenance_outputs,
            },
            "solveGraph": None,
        },
    }


def build_problem_id(request: dict[str, Any]) -> str:
    request_id = normalize_text(request.get("requestId")) or "request"
    return f"pdgsolve_problem_{slugify(request_id)}"


def solve_request(request: dict[str, Any]) -> dict[str, Any]:
    problem = normalize_request_to_problem(request)
    normalization_diagnostics = clone_json(problem.get("normalization", {}).get("diagnostics", []))
    blocking_normalization = [diagnostic for diagnostic in normalization_diagnostics if diagnostic.get("blocking")]
    if blocking_normalization:
        family = build_unsupported_family(
            problem,
            diagnostics=blocking_normalization,
            tie_break_key="request_normalization_blocked",
            summary_text=(
                "The request could not enter solver search because normalization found blocking "
                "request diagnostics."
            ),
        )
        return {
            "schema": PDGSOLVE_RESULT_SCHEMA,
            "problemId": normalize_text(problem.get("problemId")),
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

    primitive_imbalance = clone_json(problem.get("normalization", {}).get("primitiveImbalance", {}))
    exact_closure_required = bool(problem.get("policy", {}).get("exactClosureRequired"))
    if exact_closure_required and primitive_counts_magnitude(primitive_imbalance) != 0:
        diagnostics = [
            make_diagnostic(
                "pdgsolve.search.primitive_imbalance",
                "search",
                "Exact closure is impossible because the request boundary primitive ledgers do not balance.",
                blocking=True,
                payload={
                    "requestId": normalize_text(problem.get("requestId")),
                    "reactantTotals": clone_json(problem.get("reactants", {}).get("primitiveTotals", {})),
                    "productTotals": clone_json(problem.get("products", {}).get("primitiveTotals", {})),
                    "primitiveImbalance": primitive_imbalance,
                },
            )
        ]
        family = build_unsupported_family(
            problem,
            diagnostics=diagnostics,
            tie_break_key="primitive_imbalance",
            summary_text=(
                "The boundary primitive ledgers do not balance, so no exact family can exist under "
                "the current law table."
            ),
        )
        return {
            "schema": PDGSOLVE_RESULT_SCHEMA,
            "problemId": normalize_text(problem.get("problemId")),
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

    exact_family = build_exact_family(problem)
    if exact_family is not None:
        return {
            "schema": PDGSOLVE_RESULT_SCHEMA,
            "problemId": normalize_text(problem.get("problemId")),
            "searchStatus": "exact_available",
            "bestFamilyId": exact_family["familyId"],
            "acceptedFamilyId": None,
            "diagnostics": [],
            "optionFamilies": [exact_family],
            "review": {
                "schema": "pdgsolve-review-state/v1",
                "state": "review_ready",
                "selectedFamilyId": exact_family["familyId"],
                "acceptedFamilyId": None,
                "acceptedRecord": None,
                "blockingDiagnostics": [],
            },
            "publication": None,
        }

    family = build_unsupported_family(
        problem,
        diagnostics=[
            make_diagnostic(
                "pdgsolve.search.unsupported_request",
                "search",
                "No exact solve rule is available for this normalized solver problem.",
                blocking=True,
                payload={
                    "requestId": normalize_text(problem.get("requestId")),
                    "lawTableId": normalize_text(problem.get("lawTableId")),
                },
            )
        ],
    )
    return {
        "schema": PDGSOLVE_RESULT_SCHEMA,
        "problemId": normalize_text(problem.get("problemId")),
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


def get_primary_family(result: dict[str, Any]) -> dict[str, Any] | None:
    option_families = result.get("optionFamilies", [])
    if not isinstance(option_families, list) or not option_families:
        return None
    first_family = option_families[0]
    return first_family if isinstance(first_family, dict) else None


def get_first_publication_ready_exact_family(result: dict[str, Any]) -> dict[str, Any] | None:
    for family in result.get("optionFamilies", []):
        if normalize_text(family.get("kind")) != "exact":
            continue
        if family.get("publicationReady") is True:
            return family
    return None


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
    reaction_summary = clone_reaction_summary(request.get("reactionSummary"))
    return {
        "schema": PDGSOLVE_ACCEPTANCE_SCHEMA,
        "problemId": normalize_text(result.get("problemId")),
        "familyId": normalize_text(family.get("familyId")),
        "resultDigest": digest_json(result),
        "acceptedScore": clone_json(family["score"]),
        "acceptedDiagnostics": clone_json(family.get("diagnostics", [])),
        "acceptedState": "accepted",
        "lockedNormalizationSummary": {
            "addedSupportOccurrences": clone_json(family.get("addedSupportOccurrences", [])),
            "diagnostics": [],
        },
        "lockedPolicySummary": clone_json(request.get("policy", {})),
        "lockedReactantAssemblies": clone_json(family["reactantAssemblies"]),
        "lockedReactantSideOperators": clone_json(family["reactantSideOperators"]),
        "lockedIntermediateAssemblies": clone_json(family["intermediateAssemblies"]),
        "lockedProductSideOperators": clone_json(family["productSideOperators"]),
        "lockedProductAssemblies": clone_json(family["productAssemblies"]),
        "lockedProvenanceSummary": clone_json(family["provenanceSummary"]),
        **(
            {
                "lockedReactionSummary": reaction_summary,
            }
            if reaction_summary is not None
            else {}
        ),
        "lockedSolveGraph": clone_json(solve_graph),
    }


def build_publication_graph_unit_map(
    publication_graph: dict[str, Any],
) -> dict[str, dict[str, Any]]:
    return {
        normalize_text(unit.get("id")): unit
        for unit in publication_graph.get("units", [])
        if normalize_text(unit.get("id"))
    }


def build_publication_graph_adjacency_maps(
    publication_graph: dict[str, Any],
) -> tuple[dict[str, list[str]], dict[str, list[str]]]:
    incoming_by_unit_id: dict[str, list[str]] = {}
    outgoing_by_unit_id: dict[str, list[str]] = {}

    def append_unit_id(mapping: dict[str, list[str]], key: str, value: str) -> None:
        if key not in mapping:
            mapping[key] = []
        mapping[key].append(value)

    for edge in publication_graph.get("edges", []):
        from_unit_id = normalize_text(edge.get("fromUnitId"))
        to_unit_id = normalize_text(edge.get("toUnitId"))
        if not from_unit_id or not to_unit_id:
            continue
        append_unit_id(outgoing_by_unit_id, from_unit_id, to_unit_id)
        append_unit_id(incoming_by_unit_id, to_unit_id, from_unit_id)

    return incoming_by_unit_id, outgoing_by_unit_id


def build_publication_graph_stage_primitive_totals(
    publication_graph: dict[str, Any],
    stage: str,
) -> dict[str, int] | None:
    totals = build_primitive_counts(0, 0)
    found_any = False
    for unit in publication_graph.get("units", []):
        if normalize_text(unit.get("kind")) != "assembly":
            continue
        if normalize_text(unit.get("stage")) != stage:
            continue
        counts = build_assembly_counts_from_publication_unit(unit)
        if counts is None:
            return None
        totals["electrinoCount"] += counts["electrinoCount"]
        totals["positrinoCount"] += counts["positrinoCount"]
        found_any = True
    return totals if found_any else build_primitive_counts(0, 0)


def build_assembly_counts_from_publication_unit(unit: dict[str, Any]) -> dict[str, int] | None:
    if normalize_text(unit.get("kind")) != "assembly":
        return None
    recipe_id = normalize_text(unit.get("recipeId"))
    if not recipe_id:
        return None
    if "electrinoCount" in unit or "positrinoCount" in unit:
        return build_primitive_counts(unit.get("electrinoCount"), unit.get("positrinoCount"))
    metadata = ASSEMBLY_DISPLAY.get(recipe_id)
    if metadata is None:
        return None
    return build_primitive_counts(metadata["electrinoCount"], metadata["positrinoCount"])


def sum_assembly_counts_for_publication_units(units: list[dict[str, Any]]) -> dict[str, int] | None:
    totals = build_primitive_counts(0, 0)
    found_any = False
    for unit in units:
        counts = build_assembly_counts_from_publication_unit(unit)
        if counts is None:
            continue
        found_any = True
        totals["electrinoCount"] += counts["electrinoCount"]
        totals["positrinoCount"] += counts["positrinoCount"]
    return totals if found_any else None


def primitive_counts_have_signal(counts: dict[str, int] | None) -> bool:
    return bool(
        counts
        and (
            int(counts.get("electrinoCount", 0)) != 0
            or int(counts.get("positrinoCount", 0)) != 0
        )
    )


def operator_counts_from_publication_graph(
    operator_unit: dict[str, Any],
    *,
    units_by_id: dict[str, dict[str, Any]],
    incoming_by_unit_id: dict[str, list[str]],
    outgoing_by_unit_id: dict[str, list[str]],
) -> tuple[int, int]:
    operator_unit_id = normalize_text(operator_unit.get("id"))
    incoming_units = [
        units_by_id[unit_id]
        for unit_id in incoming_by_unit_id.get(operator_unit_id, [])
        if unit_id in units_by_id
    ]
    outgoing_units = [
        units_by_id[unit_id]
        for unit_id in outgoing_by_unit_id.get(operator_unit_id, [])
        if unit_id in units_by_id
    ]
    incoming_totals = sum_assembly_counts_for_publication_units(incoming_units)
    outgoing_totals = sum_assembly_counts_for_publication_units(outgoing_units)
    stage = normalize_text(operator_unit.get("stage"))
    preferred_totals = (
        outgoing_totals
        if stage == "productSideOperators" and primitive_counts_have_signal(outgoing_totals)
        else incoming_totals
        if stage == "productSideOperators"
        else incoming_totals
        if primitive_counts_have_signal(incoming_totals)
        else outgoing_totals
    )
    if preferred_totals is None:
        preferred_totals = outgoing_totals
    if preferred_totals is None:
        return 0, 0
    return preferred_totals["positrinoCount"], preferred_totals["electrinoCount"]


def residue_counts_from_publication_graph_unit(
    unit: dict[str, Any],
    *,
    units_by_id: dict[str, dict[str, Any]],
    incoming_by_unit_id: dict[str, list[str]],
    outgoing_by_unit_id: dict[str, list[str]],
) -> dict[str, int]:
    explicit_counts = build_assembly_counts_from_publication_unit(unit)
    if primitive_counts_have_signal(explicit_counts):
        return explicit_counts
    unit_id = normalize_text(unit.get("id"))
    incoming_operator_units = [
        units_by_id[incoming_unit_id]
        for incoming_unit_id in incoming_by_unit_id.get(unit_id, [])
        if incoming_unit_id in units_by_id and normalize_text(units_by_id[incoming_unit_id].get("kind")) == "operator"
    ]
    incoming_totals = build_primitive_counts(0, 0)
    found_any = False
    for operator_unit in incoming_operator_units:
        positrino_count, electrino_count = operator_counts_from_publication_graph(
            operator_unit,
            units_by_id=units_by_id,
            incoming_by_unit_id=incoming_by_unit_id,
            outgoing_by_unit_id=outgoing_by_unit_id,
        )
        incoming_totals["electrinoCount"] += electrino_count
        incoming_totals["positrinoCount"] += positrino_count
        found_any = True
    if found_any and primitive_counts_have_signal(incoming_totals):
        return incoming_totals
    return explicit_counts or build_primitive_counts(0, 0)


def normalize_pdgedit_composite_recipe_id(recipe_id: str) -> str:
    normalized_recipe_id = normalize_text(recipe_id)
    for suffix in ("_III", "_II", "_I"):
        if normalized_recipe_id.endswith(suffix):
            return normalized_recipe_id[: -len(suffix)]
    return normalized_recipe_id


def normalize_pdgedit_composite_row_record(row_record: dict[str, Any]) -> dict[str, str]:
    return {
        "recipeId": normalize_pdgedit_composite_recipe_id(row_record.get("recipeId", "")),
        "occurrenceKey": normalize_text(row_record.get("occurrenceKey")),
    }


def parse_pdgedit_composite_occurrence_key(occurrence_key: str) -> dict[str, Any] | None:
    normalized_occurrence_key = normalize_text(occurrence_key)
    if ".row." not in normalized_occurrence_key:
        return None
    base_key, _, row_text = normalized_occurrence_key.partition(".row.")
    if not base_key or not row_text:
        return None
    base_parts = base_key.split("_")
    if len(base_parts) < 3 or base_parts[0] not in {"reactant", "product"}:
        return None
    try:
        occurrence_index = int(base_parts[-1])
        row_number = int(row_text)
    except ValueError:
        return None
    canonical_id = "_".join(base_parts[1:-1])
    if not canonical_id:
        return None
    return {
        "role": base_parts[0],
        "canonicalId": canonical_id,
        "occurrenceIndex": occurrence_index,
        "rowNumber": row_number,
        "baseKey": base_key,
    }


def match_pdgedit_composite_occurrence_label(
    row_records: list[dict[str, Any]],
    *,
    start_index: int,
    side: str,
) -> dict[str, Any] | None:
    first_row = row_records[start_index] if start_index < len(row_records) else None
    if first_row is None:
        return None
    first_occurrence = parse_pdgedit_composite_occurrence_key(first_row.get("occurrenceKey", ""))
    if first_occurrence is None:
        return None
    expected_role = PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_ROLE_BY_SIDE.get(normalize_text(side), "")
    if expected_role and first_occurrence["role"] != expected_role:
        return None
    occurrence_spec = PDGEDIT_COMPOSITE_LABEL_OCCURRENCE_SPEC_BY_CANONICAL_ID.get(first_occurrence["canonicalId"])
    if occurrence_spec is None:
        return None
    recipe_sequence = occurrence_spec["recipeSequence"]
    for offset, expected_recipe_id in enumerate(recipe_sequence):
        row_record = row_records[start_index + offset] if start_index + offset < len(row_records) else None
        if row_record is None:
            return None
        occurrence = parse_pdgedit_composite_occurrence_key(row_record.get("occurrenceKey", ""))
        if (
            occurrence is None
            or occurrence["baseKey"] != first_occurrence["baseKey"]
            or occurrence["rowNumber"] != offset + 1
            or normalize_pdgedit_composite_recipe_id(row_record.get("recipeId", "")) != expected_recipe_id
        ):
            return None
    next_index = start_index + len(recipe_sequence)
    next_occurrence = (
        parse_pdgedit_composite_occurrence_key(row_records[next_index].get("occurrenceKey", ""))
        if next_index < len(row_records)
        else None
    )
    if next_occurrence is not None and next_occurrence["baseKey"] == first_occurrence["baseKey"]:
        return None
    return {
        "id": (
            f"label.{normalize_text(side)}."
            f"{occurrence_spec['type'].removesuffix('-composite')}."
            f"{first_occurrence['baseKey']}"
        ),
        "type": occurrence_spec["type"],
        "text": occurrence_spec["text"],
        "rowEnd": start_index + len(recipe_sequence) - 1,
    }


def build_pdgedit_composite_labels(
    reactant_rows: list[dict[str, Any]],
    product_rows: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    def build_side_labels(row_records: list[dict[str, Any]], side: str) -> list[dict[str, Any]]:
        normalized_rows = [normalize_pdgedit_composite_row_record(row_record) for row_record in row_records]
        normalized_recipe_ids = [row_record["recipeId"] for row_record in normalized_rows]
        composite_labels: list[dict[str, Any]] = []
        row_index = 0
        while row_index < len(normalized_recipe_ids):
            occurrence_match = match_pdgedit_composite_occurrence_label(
                normalized_rows,
                start_index=row_index,
                side=side,
            )
            if occurrence_match is not None:
                composite_labels.append(
                    {
                        "id": occurrence_match["id"],
                        "type": occurrence_match["type"],
                        "side": side,
                        "text": occurrence_match["text"],
                        "rowStart": row_index,
                        "rowEnd": occurrence_match["rowEnd"],
                    }
                )
                row_index = occurrence_match["rowEnd"] + 1
                continue
            match = next(
                (
                    spec
                    for spec in PDGEDIT_COMPOSITE_LABEL_SEQUENCE_SPECS
                    if all(
                        row_index + offset < len(normalized_recipe_ids)
                        and normalized_recipe_ids[row_index + offset] == recipe_id
                        for offset, recipe_id in enumerate(spec["recipeSequence"])
                    )
                ),
                None,
            )
            if match is None:
                row_index += 1
                continue
            composite_labels.append(
                {
                    "id": f"label.{side}.{match['type'].removesuffix('-composite')}.{row_index + 1}",
                    "type": match["type"],
                    "side": side,
                    "text": match["text"],
                    "rowStart": row_index,
                    "rowEnd": row_index + len(match["recipeSequence"]) - 1,
                }
            )
            row_index += len(match["recipeSequence"])
        return composite_labels

    return [*build_side_labels(reactant_rows, "left"), *build_side_labels(product_rows, "right")]


def build_pdgedit_assembly_entry(
    occurrence: dict[str, Any],
    *,
    object_id: str,
    role: str,
    x: int,
    y: int,
) -> dict[str, Any]:
    assembly_id = normalize_text(occurrence.get("assemblyId"))
    metadata = ASSEMBLY_DISPLAY[assembly_id]
    primitive_counts = get_occurrence_primitive_counts(occurrence)
    entry = {
        "id": object_id,
        "type": metadata["pdgeditType"],
        "x": x,
        "y": y,
        "title": metadata["title"],
        "role": role,
        "tiles": clone_json(metadata["tiles"]),
        **(
            {
                "primitiveCounts": {
                    "electrinoCount": primitive_counts["electrinoCount"],
                    "positrinoCount": primitive_counts["positrinoCount"],
                }
            }
            if primitive_counts is not None
            else {}
        ),
    }
    if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID:
        entry["sampleCounts"] = {
            "topCount": str(int(occurrence.get("electrinoCount", 0) or 0)),
            "bottomCount": str(int(occurrence.get("positrinoCount", 0) or 0)),
        }
    return entry


def build_pdgedit_document_from_publication_graph(
    publication_graph: dict[str, Any],
    *,
    document_id: str | None = None,
    document_title: str | None = None,
    reaction_summary: dict[str, Any] | None = None,
) -> dict[str, Any]:
    units_by_id = build_publication_graph_unit_map(publication_graph)
    incoming_by_unit_id, outgoing_by_unit_id = build_publication_graph_adjacency_maps(publication_graph)
    assemblies = []
    operators = []
    next_row_by_stage: dict[str, int] = {}
    for unit in publication_graph.get("units", []):
        stage = normalize_text(unit.get("stage"))
        if stage not in PDGEDIT_X_BY_STAGE:
            continue
        x = PDGEDIT_X_BY_STAGE[stage]
        y = next_row_by_stage.get(stage, 0)
        next_row_by_stage[stage] = y + 1
        if normalize_text(unit.get("kind")) == "assembly":
            assembly_id = normalize_text(unit.get("recipeId"))
            metadata = ASSEMBLY_DISPLAY[assembly_id]
            residue_counts = (
                residue_counts_from_publication_graph_unit(
                    unit,
                    units_by_id=units_by_id,
                    incoming_by_unit_id=incoming_by_unit_id,
                    outgoing_by_unit_id=outgoing_by_unit_id,
                )
                if assembly_id == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
                else None
            )
            primitive_counts = residue_counts or build_assembly_counts_from_publication_unit(unit)
            assemblies.append(
                {
                    "id": normalize_text(unit.get("id")),
                    "type": metadata["pdgeditType"],
                    "x": x,
                    "y": y,
                    "title": normalize_text(unit.get("title")) or metadata["title"],
                    "role": PDGEDIT_ROLE_BY_PUBLICATION_STAGE[stage],
                    "tiles": clone_json(metadata["tiles"]),
                    **(
                        {
                            "primitiveCounts": {
                                "electrinoCount": primitive_counts["electrinoCount"],
                                "positrinoCount": primitive_counts["positrinoCount"],
                            }
                        }
                        if primitive_counts is not None
                        else {}
                    ),
                    **(
                        {
                            "sampleCounts": {
                                "topCount": str(int((residue_counts or {}).get("electrinoCount", 0))),
                                "bottomCount": str(int((residue_counts or {}).get("positrinoCount", 0))),
                            }
                        }
                        if normalize_text(unit.get("recipeId")) == UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID
                        else {}
                    ),
                }
            )
            continue
        if normalize_text(unit.get("kind")) == "operator":
            positrino_count, electrino_count = operator_counts_from_publication_graph(
                unit,
                units_by_id=units_by_id,
                incoming_by_unit_id=incoming_by_unit_id,
                outgoing_by_unit_id=outgoing_by_unit_id,
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
            **(
                {
                    "primitiveCounts": {
                        "electrinoCount": int(edge.get("primitiveCounts", {}).get("electrinoCount", 0)),
                        "positrinoCount": int(edge.get("primitiveCounts", {}).get("positrinoCount", 0)),
                    }
                }
                if isinstance(edge.get("primitiveCounts"), dict)
                else {}
            ),
        }
        for edge in publication_graph.get("edges", [])
    ]
    reactant_composite_rows = [
        {
            "recipeId": normalize_text(unit.get("recipeId")),
            "occurrenceKey": normalize_text(unit.get("occurrenceKey")),
        }
        for unit in publication_graph.get("units", [])
        if normalize_text(unit.get("stage")) == "reactantAssemblies"
    ]
    product_composite_rows = [
        {
            "recipeId": normalize_text(unit.get("recipeId")),
            "occurrenceKey": normalize_text(unit.get("occurrenceKey")),
        }
        for unit in publication_graph.get("units", [])
        if normalize_text(unit.get("stage")) == "productAssemblies"
    ]
    _ = document_id, document_title
    normalized_reaction_summary = clone_reaction_summary(reaction_summary)
    normalized_balance_summary = clone_balance_summary(
        build_pdgedit_balance_summary(
            build_publication_graph_stage_primitive_totals(publication_graph, "reactantAssemblies"),
            build_publication_graph_stage_primitive_totals(publication_graph, "productAssemblies"),
        )
    )
    metadata: dict[str, Any] = {}
    if normalized_reaction_summary is not None:
        metadata["reactionSummary"] = normalized_reaction_summary
    if normalized_balance_summary is not None:
        metadata["balanceSummary"] = normalized_balance_summary
    return {
        "schema": PDGEDIT_SCHEMA,
        **({"metadata": metadata} if metadata else {}),
        "assemblies": assemblies,
        "operators": operators,
        "links": links,
        "compositeLabels": build_pdgedit_composite_labels(reactant_composite_rows, product_composite_rows),
    }


def build_pdgedit_document_from_acceptance(
    acceptance: dict[str, Any],
    *,
    document_id: str | None = None,
    document_title: str | None = None,
) -> dict[str, Any]:
    return build_pdgedit_document_from_publication_graph(
        acceptance["lockedSolveGraph"],
        document_id=document_id,
        document_title=document_title,
        reaction_summary=acceptance.get("lockedReactionSummary"),
    )

def build_pdgedit_document_from_request_review(
    request: dict[str, Any],
    *,
    document_id: str | None = None,
    document_title: str | None = None,
) -> dict[str, Any]:
    reactants = list(request.get("reactants", []))
    products = list(request.get("products", []))
    assemblies = []
    for row_index, reactant in enumerate(reactants):
        assemblies.append(
            build_pdgedit_assembly_entry(
                reactant,
                object_id=f"review_reactant_{row_index + 1}",
                role="reactant",
                x=PDGEDIT_X_BY_STAGE["reactantAssemblies"],
                y=row_index,
            )
        )
    for row_index, product in enumerate(products):
        assemblies.append(
            build_pdgedit_assembly_entry(
                product,
                object_id=f"review_product_{row_index + 1}",
                role="product",
                x=PDGEDIT_X_BY_STAGE["productAssemblies"],
                y=row_index,
            )
        )
    _ = document_id, document_title
    normalized_reaction_summary = clone_reaction_summary(request.get("reactionSummary"))
    normalized_balance_summary = clone_balance_summary(
        build_pdgedit_balance_summary(
            sum_primitive_counts(reactants),
            sum_primitive_counts(products),
        )
    )
    metadata: dict[str, Any] = {}
    if normalized_reaction_summary is not None:
        metadata["reactionSummary"] = normalized_reaction_summary
    if normalized_balance_summary is not None:
        metadata["balanceSummary"] = normalized_balance_summary
    return {
        "schema": PDGEDIT_SCHEMA,
        **({"metadata": metadata} if metadata else {}),
        "assemblies": assemblies,
        "operators": [],
        "links": [],
        "compositeLabels": build_pdgedit_composite_labels(
            [
                {
                    "recipeId": normalize_text(record.get("assemblyId")),
                    "occurrenceKey": normalize_text(record.get("id")),
                }
                for record in reactants
            ],
            [
                {
                    "recipeId": normalize_text(record.get("assemblyId")),
                    "occurrenceKey": normalize_text(record.get("id")),
                }
                for record in products
            ],
        ),
    }


def request_is_pdgedit_review_renderable(request: dict[str, Any]) -> bool:
    for side in ("reactants", "products"):
        records = request.get(side, [])
        if not isinstance(records, list):
            return False
        for record in records:
            if normalize_text(record.get("assemblyId")) not in ASSEMBLY_DISPLAY:
                return False
    return True


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


def build_review_publication_sort_key(
    result: dict[str, Any],
    *,
    batch_id: int,
    case_id: str,
) -> tuple[Any, ...]:
    family = get_primary_family(result) or {}
    diagnostics = family.get("diagnostics", [])
    request_blocked = 1 if any(
        isinstance(diagnostic, dict)
        and normalize_text(diagnostic.get("phase")) == "request"
        and diagnostic.get("blocking") is True
        for diagnostic in diagnostics
    ) else 0
    return (
        request_blocked,
        *family_score_sort_key(family.get("score", {})),
        batch_id,
        case_id,
    )


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
    publication_candidates: list[dict[str, Any]] = []
    normalized_output_dir = output_dir.resolve() if output_dir is not None else None
    normalized_pdgedit_output_dir = pdgedit_output_dir.resolve() if pdgedit_output_dir is not None else None
    normalized_pdgedit_manifest_path = (
        pdgedit_manifest_path.resolve() if pdgedit_manifest_path is not None else None
    )
    if normalized_output_dir is not None:
        normalized_output_dir.mkdir(parents=True, exist_ok=True)
    if normalized_pdgedit_output_dir is not None:
        normalized_pdgedit_output_dir.mkdir(parents=True, exist_ok=True)
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
        record = {
            "batchId": batch_id,
            "caseId": case_id,
            "proposalId": normalize_text(entry.get("proposalId")),
            "requestId": request_id,
            "problemId": normalize_text(result.get("problemId")),
            "searchStatus": normalize_text(result.get("searchStatus")),
            "bestFamilyId": normalize_text(result.get("bestFamilyId")),
            "resultPath": serialized_result_path,
        }
        result_records.append(record)
        publication_candidates.append(
            {
                "batchId": batch_id,
                "caseId": case_id,
                "request": clone_json(request),
                "result": clone_json(result),
                "record": record,
            }
        )

    pdgedit_manifest_entries: list[dict[str, Any]] = []
    exact_candidates = []
    review_candidates = []
    for candidate in publication_candidates:
        result = candidate["result"]
        publication_family = (
            get_first_publication_ready_exact_family(result)
            if normalize_text(result.get("searchStatus")) == "exact_available"
            else None
        )
        if publication_family is not None:
            exact_candidates.append(candidate)
            continue
        if request_is_pdgedit_review_renderable(candidate["request"]):
            review_candidates.append(candidate)

    exact_candidates.sort(key=lambda candidate: (candidate["batchId"], candidate["caseId"]))
    review_candidates.sort(
        key=lambda candidate: build_review_publication_sort_key(
            candidate["result"],
            batch_id=candidate["batchId"],
            case_id=candidate["caseId"],
        )
    )

    selected_candidates = [
        *[
            ("exact", candidate)
            for candidate in exact_candidates[:LIVE_PDGEDIT_EXACT_ENTRY_LIMIT]
        ],
        *[
            ("review", candidate)
            for candidate in review_candidates[:LIVE_PDGEDIT_REVIEW_ENTRY_LIMIT]
        ],
    ]

    for publication_kind, candidate in selected_candidates:
        if normalized_pdgedit_output_dir is None:
            break
        batch_id = candidate["batchId"]
        case_id = candidate["caseId"]
        request = candidate["request"]
        result = candidate["result"]
        record = candidate["record"]
        source_title = normalize_text(request.get("source", {}).get("title"))
        base_title = source_title or normalize_text(request.get("requestId")) or case_id
        pdgedit_filename = f"{batch_id:04d}_{slugify(case_id)}.pdgedit.v1.json"
        pdgedit_document_path = normalized_pdgedit_output_dir / pdgedit_filename
        if publication_kind == "exact":
            publication_family = get_first_publication_ready_exact_family(result)
            if publication_family is None:
                continue
            acceptance = build_acceptance(
                request,
                result,
                family_id=normalize_text(publication_family.get("familyId")),
            )
            pdgedit_document = build_pdgedit_document_from_acceptance(
                acceptance,
                document_id=case_id,
                document_title=base_title,
            )
            manifest_entry = build_pdgedit_manifest_entry(
                document_id=case_id,
                document_title=base_title,
                document_path="",
                source_kind="exact",
                is_default=not pdgedit_manifest_entries,
            )
        else:
            pdgedit_document = build_pdgedit_document_from_request_review(
                request,
                document_id=f"review_{case_id}",
                document_title=f"Review: {base_title}",
            )
            manifest_entry = build_pdgedit_manifest_entry(
                document_id=f"review_{case_id}",
                document_title=f"Review: {base_title}",
                document_path="",
                source_kind="unsolved",
                is_default=not pdgedit_manifest_entries,
            )
        write_json(pdgedit_document_path, pdgedit_document)
        try:
            serialized_pdgedit_document_path = str(pdgedit_document_path.relative_to(REPO_ROOT))
        except ValueError:
            serialized_pdgedit_document_path = str(pdgedit_document_path)
        manifest_entry["documentPath"] = serialized_pdgedit_document_path
        pdgedit_manifest_entries.append(manifest_entry)
        record["pdgeditDocumentPath"] = serialized_pdgedit_document_path

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
    "build_pdgedit_document_from_publication_graph",
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
