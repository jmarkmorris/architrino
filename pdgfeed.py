#!/usr/bin/env python3
"""Build PDG-derived proposal artifacts and solver-request candidates.

The normal regression path is fixture-first so development stays stable offline.
When the external `pdg` package is installed locally, selected live channels can
be read through `pdg.connect(...)` and normalized through the same export path.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parent
DEFAULT_FIXTURE_INDEX = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "index.json"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "generated"
SOLVER_REQUEST_SCHEMA_PATH = REPO_ROOT / "src" / "contracts" / "solver-request" / "v1" / "schema.json"

SOLVER_REQUEST_SCHEMA = "solver-request/v1"
PDG_FIXTURE_CORPUS_SCHEMA = "pdg-fixture-corpus/v1"
PDG_FIXTURE_SOURCE_SCHEMA = "pdg-fixture-source/v1"
PDG_PROPOSAL_SCHEMA = "pdg-proposal/v1"
PDG_LIVE_MANIFEST_SCHEMA = "pdg-live-manifest/v1"
PARTICLE_NAME_PATTERN = re.compile(r"^[A-Za-z0-9_+\-]+$")

DEFAULT_POLICY = {
    "recruitmentMode": "forbid",
    "lateBosonCollapseMode": "allow-exact",
    "weakChannelMode": "v1-core-provenance-only",
    "carryThroughMode": "exact-first",
}


@dataclass(frozen=True)
class PdgV1ParticleMapping:
    canonical_name: str
    aliases: tuple[str, ...]
    template_id: str
    label: str
    family: str
    polarity: str
    is_composite: bool
    electrino_count: int
    positrino_count: int
    tags: tuple[str, ...] = ()
    inventory_flags: tuple[str, ...] = ()
    export_policy: str = "supported"
    policy_reason: str = ""

    @property
    def exportable(self) -> bool:
        return self.export_policy == "supported"


PDG_V1_PARTICLE_MAPPINGS: tuple[PdgV1ParticleMapping, ...] = (
    PdgV1ParticleMapping(
        canonical_name="n",
        aliases=("n", "neutron"),
        template_id="neutron",
        label="Neutron",
        family="baryon",
        polarity="pro",
        is_composite=True,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:neutron",),
    ),
    PdgV1ParticleMapping(
        canonical_name="p",
        aliases=("p", "proton"),
        template_id="proton",
        label="Proton",
        family="baryon",
        polarity="pro",
        is_composite=True,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:proton",),
    ),
    PdgV1ParticleMapping(
        canonical_name="e-",
        aliases=("e-", "electron"),
        template_id="electron",
        label="Pro Electron",
        family="lepton",
        polarity="pro",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:electron", "pdg:generation:1"),
        inventory_flags=("generation:1", "charged-lepton"),
    ),
    PdgV1ParticleMapping(
        canonical_name="e+",
        aliases=("e+", "positron", "anti-electron"),
        template_id="electron",
        label="Anti Electron",
        family="lepton",
        polarity="anti",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:positron", "pdg:generation:1"),
        inventory_flags=("generation:1", "charged-lepton"),
    ),
    PdgV1ParticleMapping(
        canonical_name="mu-",
        aliases=("mu-", "muon"),
        template_id="electron",
        label="Pro Muon",
        family="lepton",
        polarity="pro",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:muon", "pdg:generation:2"),
        inventory_flags=("generation:2", "charged-lepton"),
    ),
    PdgV1ParticleMapping(
        canonical_name="mu+",
        aliases=("mu+", "anti-muon"),
        template_id="electron",
        label="Anti Muon",
        family="lepton",
        polarity="anti",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:anti-muon", "pdg:generation:2"),
        inventory_flags=("generation:2", "charged-lepton"),
    ),
    PdgV1ParticleMapping(
        canonical_name="nu_e",
        aliases=("nu_e", "electron-neutrino"),
        template_id="neutrino",
        label="Pro Electron Neutrino",
        family="lepton",
        polarity="pro",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:electron-neutrino", "pdg:generation:1"),
        inventory_flags=("generation:1", "neutrino"),
    ),
    PdgV1ParticleMapping(
        canonical_name="anti-nu_e",
        aliases=("anti-nu_e", "nubar_e", "anti-electron-neutrino"),
        template_id="neutrino",
        label="Anti Electron Neutrino",
        family="lepton",
        polarity="anti",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:anti-electron-neutrino", "pdg:generation:1"),
        inventory_flags=("generation:1", "neutrino"),
    ),
    PdgV1ParticleMapping(
        canonical_name="nu_mu",
        aliases=("nu_mu", "muon-neutrino"),
        template_id="neutrino",
        label="Pro Muon Neutrino",
        family="lepton",
        polarity="pro",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:muon-neutrino", "pdg:generation:2"),
        inventory_flags=("generation:2", "neutrino"),
    ),
    PdgV1ParticleMapping(
        canonical_name="anti-nu_mu",
        aliases=("anti-nu_mu", "nubar_mu", "anti-muon-neutrino"),
        template_id="neutrino",
        label="Anti Muon Neutrino",
        family="lepton",
        polarity="anti",
        is_composite=False,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:anti-muon-neutrino", "pdg:generation:2"),
        inventory_flags=("generation:2", "neutrino"),
    ),
    PdgV1ParticleMapping(
        canonical_name="gamma",
        aliases=("gamma", "photon"),
        template_id="photon",
        label="Photon",
        family="boson",
        polarity="",
        is_composite=True,
        electrino_count=6,
        positrino_count=6,
        tags=("pdg:species:photon",),
    ),
    PdgV1ParticleMapping(
        canonical_name="pi+",
        aliases=("pi+",),
        template_id="pi_plus",
        label="Positive Pion",
        family="meson",
        polarity="",
        is_composite=True,
        electrino_count=11,
        positrino_count=13,
        tags=("pdg:species:pi-plus",),
    ),
    PdgV1ParticleMapping(
        canonical_name="pi-",
        aliases=("pi-",),
        template_id="pi_minus",
        label="Negative Pion",
        family="meson",
        polarity="",
        is_composite=True,
        electrino_count=13,
        positrino_count=11,
        tags=("pdg:species:pi-minus",),
    ),
    PdgV1ParticleMapping(
        canonical_name="pi0",
        aliases=("pi0",),
        template_id="upi0",
        label="Neutral Pion",
        family="meson",
        polarity="",
        is_composite=True,
        electrino_count=8,
        positrino_count=16,
        tags=("pdg:species:pi0",),
    ),
)

PDG_V1_MAPPING_BY_NAME = {mapping.canonical_name: mapping for mapping in PDG_V1_PARTICLE_MAPPINGS}
PDG_V1_CANONICAL_NAME_BY_ALIAS = {
    alias.lower(): mapping.canonical_name
    for mapping in PDG_V1_PARTICLE_MAPPINGS
    for alias in mapping.aliases
}


@dataclass(frozen=True)
class FixtureParticle:
    name: str
    pdg_id: str | None = None
    display_label: str | None = None


@dataclass(frozen=True)
class PdgCase:
    case_id: str
    proposal_id: str
    title: str
    source_kind: str
    source: dict[str, Any]
    reactants: tuple[FixtureParticle, ...]
    products: tuple[FixtureParticle, ...]
    notes: tuple[str, ...] = ()
    source_path: Path | None = None


@dataclass(frozen=True)
class NormalizedParticipant:
    participant_id: str
    side: str
    template_id: str
    label: str
    family: str
    polarity: str
    is_composite: bool
    inventory: dict[str, Any]
    tags: tuple[str, ...] = ()
    pdg_name: str = ""
    pdg_id: str | None = None

    def to_solver_participant(self) -> dict[str, Any]:
        root_node_id = f"{self.participant_id}/root"
        node = {
            "id": root_node_id,
            "templateId": self.template_id,
            "label": self.label,
            "family": self.family,
            "isComposite": self.is_composite,
            "inventory": dict(self.inventory),
            "tags": ["root", *self.tags],
        }
        if self.polarity:
            node["polarity"] = self.polarity
        participant = {
            "id": self.participant_id,
            "side": self.side,
            "templateId": self.template_id,
            "label": self.label,
            "family": self.family,
            "isComposite": self.is_composite,
            "inventory": dict(self.inventory),
            "rootNodeId": root_node_id,
            "nodes": [node],
            "tags": list(self.tags),
        }
        if self.polarity:
            participant["polarity"] = self.polarity
        return participant

    def to_proposal_participant(self) -> dict[str, Any]:
        return {
            "id": self.participant_id,
            "side": self.side,
            "templateId": self.template_id,
            "label": self.label,
            "family": self.family,
            "polarity": self.polarity,
            "isComposite": self.is_composite,
            "inventory": dict(self.inventory),
            "pdgName": self.pdg_name,
            "pdgId": self.pdg_id,
            "tags": list(self.tags),
        }


@dataclass(frozen=True)
class Proposal:
    proposal_id: str
    title: str
    source: dict[str, Any]
    reactants: tuple[NormalizedParticipant, ...]
    products: tuple[NormalizedParticipant, ...]
    centers: tuple[NormalizedParticipant, ...]
    ranking: dict[str, Any]
    notes: tuple[str, ...] = ()

    @property
    def exportable(self) -> bool:
        return not any(note.startswith("unsupported:") for note in self.notes)

    def to_dict(self) -> dict[str, Any]:
        return {
            "schema": PDG_PROPOSAL_SCHEMA,
            "proposalId": self.proposal_id,
            "title": self.title,
            "source": dict(self.source),
            "reactants": [participant.to_proposal_participant() for participant in self.reactants],
            "products": [participant.to_proposal_participant() for participant in self.products],
            "centers": [participant.to_proposal_participant() for participant in self.centers],
            "ranking": dict(self.ranking),
            "notes": list(self.notes),
            "exportable": self.exportable,
        }


@dataclass(frozen=True)
class LiveChannelSpec:
    case_id: str
    title: str
    reactant_name: str
    product_names: tuple[str, ...]
    channel_description: str


LIVE_CHANNEL_SPECS: tuple[LiveChannelSpec, ...] = (
    LiveChannelSpec(
        case_id="free_neutron_beta_decay",
        title="Free neutron beta decay",
        reactant_name="n",
        product_names=("p", "e-", "anti-nu_e"),
        channel_description="n -> p e- anti-nu_e",
    ),
    LiveChannelSpec(
        case_id="radiative_free_neutron_beta_decay",
        title="Radiative free neutron beta decay",
        reactant_name="n",
        product_names=("p", "e-", "anti-nu_e", "gamma"),
        channel_description="n -> p e- anti-nu_e gamma",
    ),
    LiveChannelSpec(
        case_id="muon_decay",
        title="Muon decay",
        reactant_name="mu-",
        product_names=("e-", "anti-nu_e", "nu_mu"),
        channel_description="mu- -> e- anti-nu_e nu_mu",
    ),
    LiveChannelSpec(
        case_id="radiative_muon_decay",
        title="Radiative muon decay",
        reactant_name="mu-",
        product_names=("e-", "anti-nu_e", "nu_mu", "gamma"),
        channel_description="mu- -> e- anti-nu_e nu_mu gamma",
    ),
    LiveChannelSpec(
        case_id="muon_decay_with_electron_positron_pair",
        title="Muon decay with electron-positron pair",
        reactant_name="mu-",
        product_names=("e-", "anti-nu_e", "nu_mu", "e+", "e-"),
        channel_description="mu- -> e- anti-nu_e nu_mu e+ e-",
    ),
    LiveChannelSpec(
        case_id="muon_to_electron_photon",
        title="Muon to electron photon",
        reactant_name="mu-",
        product_names=("e-", "gamma"),
        channel_description="mu- -> e- gamma",
    ),
    LiveChannelSpec(
        case_id="charged_pion_to_muon_neutrino",
        title="Charged pion to muon neutrino",
        reactant_name="pi+",
        product_names=("mu+", "nu_mu"),
        channel_description="pi+ -> mu+ nu_mu",
    ),
)

LIVE_CHANNEL_SPEC_BY_ID = {spec.case_id: spec for spec in LIVE_CHANNEL_SPECS}


def connect_pdg(database_url: str | None = None, *, pedantic: bool = False) -> Any:
    """Connect to the official local PDG database through the `pdg` package."""
    try:
        import pdg as pdg_package
    except ImportError as exc:  # pragma: no cover - environment-dependent
        raise RuntimeError(
            "The `pdg` package is not installed. Install it before using live PDG access."
        ) from exc
    return pdg_package.connect(database_url, pedantic=pedantic) if database_url else pdg_package.connect(
        pedantic=pedantic
    )


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def load_fixture_index(index_path: Path) -> list[PdgCase]:
    index_payload = load_json(index_path)
    if index_payload.get("schema") != PDG_FIXTURE_CORPUS_SCHEMA:
        raise ValueError(f"Unexpected fixture index schema in {index_path}")
    fixtures: list[PdgCase] = []
    for case in index_payload.get("cases", []):
        source_path = REPO_ROOT / case["sourcePath"]
        fixture_payload = load_json(source_path)
        if fixture_payload.get("schema") != PDG_FIXTURE_SOURCE_SCHEMA:
            raise ValueError(f"Unexpected fixture source schema in {source_path}")
        case_id = str(fixture_payload["fixtureId"])
        fixtures.append(
            PdgCase(
                case_id=case_id,
                proposal_id=case_id,
                title=str(fixture_payload["title"]),
                source_kind="fixture",
                source=dict(fixture_payload["source"]),
                reactants=tuple(
                    FixtureParticle(
                        name=str(entry["name"]),
                        pdg_id=str(entry["pdgId"]) if entry.get("pdgId") else None,
                        display_label=str(entry["displayLabel"]) if entry.get("displayLabel") else None,
                    )
                    for entry in fixture_payload.get("reactants", [])
                ),
                products=tuple(
                    FixtureParticle(
                        name=str(entry["name"]),
                        pdg_id=str(entry["pdgId"]) if entry.get("pdgId") else None,
                        display_label=str(entry["displayLabel"]) if entry.get("displayLabel") else None,
                    )
                    for entry in fixture_payload.get("products", [])
                ),
                notes=tuple(str(note) for note in fixture_payload.get("notes", [])),
                source_path=source_path,
            )
        )
    return fixtures


def slugify(text: str) -> str:
    compact = "".join(ch.lower() if ch.isalnum() else "_" for ch in text.strip())
    while "__" in compact:
        compact = compact.replace("__", "_")
    return compact.strip("_") or "item"


def canonicalize_pdg_name(name: str) -> str:
    stripped = name.strip()
    return PDG_V1_CANONICAL_NAME_BY_ALIAS.get(stripped.lower(), stripped)


def build_inventory(mapping: PdgV1ParticleMapping, particle: FixtureParticle) -> dict[str, Any]:
    flags = [*mapping.inventory_flags]
    if particle.pdg_id:
        flags.append(f"pdg-id:{particle.pdg_id}")
    flags.append(f"pdg-name:{particle.name}")
    inventory = {
        "electrinoCount": mapping.electrino_count,
        "positrinoCount": mapping.positrino_count,
    }
    if flags:
        inventory["flags"] = flags
    return inventory


def normalize_particle(particle: FixtureParticle, side: str, ordinal: int) -> tuple[NormalizedParticipant | None, str | None]:
    canonical_name = canonicalize_pdg_name(particle.name)
    mapping = PDG_V1_MAPPING_BY_NAME.get(canonical_name)
    if mapping is None:
        return None, f"unsupported:{side}:{canonical_name}:no-v1-mapping"
    if not mapping.exportable:
        reason = mapping.policy_reason or "proposal-only"
        return None, f"unsupported:{side}:{canonical_name}:{reason}"
    slug = slugify(particle.display_label or mapping.label)
    participant_id = f"{side}_{slug}_{ordinal}"
    label = particle.display_label or mapping.label
    tags = [*mapping.tags]
    if particle.pdg_id:
        tags.append(f"pdg-id:{particle.pdg_id}")
    participant = NormalizedParticipant(
        participant_id=participant_id,
        side=side,
        template_id=mapping.template_id,
        label=label,
        family=mapping.family,
        polarity=mapping.polarity,
        is_composite=mapping.is_composite,
        inventory=build_inventory(mapping, FixtureParticle(name=canonical_name, pdg_id=particle.pdg_id)),
        tags=tuple(tags),
        pdg_name=canonical_name,
        pdg_id=particle.pdg_id,
    )
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

    unsupported_count = sum(1 for note in notes if note.startswith("unsupported:"))
    ranking_reasons = [f"{case.source_kind}-source"]
    if unsupported_count == 0:
        ranking_reasons.append("all-participants-supported")
    else:
        ranking_reasons.append("contains-unsupported-participants")

    source = dict(case.source)
    if case.source_kind == "fixture":
        source["fixtureId"] = case.case_id
        if case.source_path is not None:
            source["fixturePath"] = str(case.source_path.relative_to(REPO_ROOT))
    elif case.source_kind == "pdg-live":
        source["liveCaseId"] = case.case_id

    ranking = {
        "rank": 1,
        "score": max(0, 100 - unsupported_count * 25 - len(notes) * 5),
        "reasons": ranking_reasons,
    }
    return Proposal(
        proposal_id=case.proposal_id,
        title=case.title,
        source=source,
        reactants=tuple(reactants),
        products=tuple(products),
        centers=(),
        ranking=ranking,
        notes=tuple(notes),
    )


def build_solver_request(proposal: Proposal) -> dict[str, Any] | None:
    if not proposal.exportable:
        return None
    request = {
        "schema": SOLVER_REQUEST_SCHEMA,
        "requestId": proposal.proposal_id,
        "origin": {
            "sourceKind": "pdg-ingest",
            "sourceDocumentId": (
                proposal.source.get("fixtureId")
                or proposal.source.get("liveCaseId")
                or proposal.source.get("pdgIdentifier")
                or proposal.proposal_id
            ),
            "title": proposal.title,
        },
        "participants": [
            participant.to_solver_participant()
            for participant in (*proposal.reactants, *proposal.products, *proposal.centers)
        ],
        "manualOperators": [],
        "manualMappings": [],
        "dissociation": {
            "manuallyOpenedParticipantIds": [],
            "manuallyOpenedNodeIds": [],
            "preserveManualState": True,
        },
        "policy": dict(DEFAULT_POLICY),
    }
    validate_solver_request_shape(request)
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


def validate_against_schema(value: Any, schema: dict[str, Any], path: str = "$", errors: list[str] | None = None) -> list[str]:
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

    if isinstance(value, (int, float)) and not isinstance(value, bool) and isinstance(schema.get("minimum"), (int, float)):
        if value < schema["minimum"]:
            errors.append(f"{path}: expected number >= {schema['minimum']}")

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
def load_solver_request_schema() -> dict[str, Any]:
    return load_json(SOLVER_REQUEST_SCHEMA_PATH)


def validate_solver_request_shape(request: dict[str, Any]) -> None:
    errors = validate_against_schema(request, load_solver_request_schema())
    if errors:
        raise ValueError("solver-request/v1 validation failed:\n" + "\n".join(errors))


def normalize_channel_description(text: str) -> str:
    return " ".join(str(text).replace("-->", "->").split())


def extract_unsupported_particle_names(notes: list[str] | tuple[str, ...]) -> list[str]:
    names: list[str] = []
    for note in notes:
        parts = str(note).split(":")
        if len(parts) < 4 or parts[0] != "unsupported":
            continue
        side = parts[1]
        particle_name = parts[2]
        if side not in ("reactant", "product") or particle_name in ("", "unknown"):
            continue
        if not PARTICLE_NAME_PATTERN.match(particle_name):
            continue
        names.append(particle_name)
    return names


def safe_api_info(api: Any, key: str) -> str | None:
    try:
        value = api.info(key)
    except Exception:  # pragma: no cover - external API dependent
        return None
    if value in (None, ""):
        return None
    return str(value)


def canonicalize_api_particle_name(api: Any, name: str) -> str:
    stripped = str(name).strip()
    if not stripped:
        return stripped
    try:
        canonical = api.get_canonical_name(stripped)
    except Exception:  # pragma: no cover - external API dependent
        return canonicalize_pdg_name(stripped)
    return canonicalize_pdg_name(str(canonical))


def safe_decay_item_particle(item: Any) -> Any | None:
    try:
        return item.particle
    except Exception:  # pragma: no cover - external API dependent
        return None


def extract_live_decay_products(decay: Any) -> tuple[list[FixtureParticle], list[str]]:
    particles: list[FixtureParticle] = []
    notes: list[str] = []
    for decay_product in getattr(decay, "decay_products", ()) or ():
        multiplier = int(getattr(decay_product, "multiplier", 1) or 1)
        item = getattr(decay_product, "item", None)
        item_name = getattr(item, "name", None)
        item_particle = safe_decay_item_particle(item) if item is not None else None
        item_type = getattr(item, "item_type", None) if item is not None else None
        if not item_name:
            notes.append("unsupported:product:unknown:missing-name")
            continue
        if item_particle is None:
            suffix = f"generic-or-textual-item:{item_type}" if item_type else "generic-or-textual-item"
            notes.append(f"unsupported:product:{item_name}:{suffix}")
            continue
        if multiplier <= 0:
            notes.append(f"unsupported:product:{item_name}:multiplier-{multiplier}")
            continue
        for _ in range(multiplier):
            particles.append(FixtureParticle(name=str(item_name), pdg_id=str(item_name)))
    return particles, notes


def build_live_product_signature(api: Any, particles: list[FixtureParticle]) -> Counter[str]:
    return Counter(canonicalize_api_particle_name(api, particle.name) for particle in particles)


def iter_candidate_branching_fractions(particle: Any) -> list[Any]:
    decays: list[Any] = []
    seen_ids: set[str] = set()

    def extend(entries: Any) -> None:
        for decay in entries:
            decay_id = str(getattr(decay, "pdgid", id(decay)))
            if decay_id in seen_ids:
                continue
            seen_ids.add(decay_id)
            decays.append(decay)

    try:
        extend(particle.exclusive_branching_fractions(include_subdecays=True, require_summary_data=False))
    except TypeError:
        try:
            extend(particle.exclusive_branching_fractions())
        except TypeError:
            pass

    if hasattr(particle, "branching_fractions"):
        try:
            extend(particle.branching_fractions("BF%", require_summary_data=False))
        except TypeError:
            try:
                extend(particle.branching_fractions())
            except TypeError:
                pass

    return decays


def iter_live_particles(api: Any) -> list[Any]:
    particles: list[Any] = []
    for particle_group in api.get_particles():
        try:
            group_particles = list(particle_group)
        except Exception:  # pragma: no cover - external API dependent
            continue
        for particle in group_particles:
            if hasattr(particle, "exclusive_branching_fractions"):
                particles.append(particle)
    return particles


def build_live_decay_discovery_key(particle: Any, decay: Any) -> str:
    decay_pdgid = getattr(decay, "pdgid", None)
    if decay_pdgid:
        return f"pdgid:{decay_pdgid}"
    return "|".join(
        [
            normalize_text(getattr(particle, "name", "")),
            normalize_channel_description(getattr(decay, "description", "")),
            str(getattr(decay, "mode_number", "") or ""),
        ]
    )


def build_live_case_from_decay(api: Any, particle: Any, decay: Any) -> PdgCase:
    description = normalize_channel_description(getattr(decay, "description", ""))
    products, notes = extract_live_decay_products(decay)
    subdecay_count = sum(
        1 for product in getattr(decay, "decay_products", ()) or () if getattr(product, "subdecay", None)
    )
    if subdecay_count:
        notes.append(f"unsupported:channel-subdecays:{subdecay_count}")

    particle_name = str(getattr(particle, "name", "") or "")
    decay_pdgid = getattr(decay, "pdgid", None)
    case_token = str(decay_pdgid or description or particle_name or "pdg_decay")
    case_id = slugify(case_token)
    source: dict[str, Any] = {
        "edition": str(getattr(api, "edition", "")),
        "channelDescription": description or f"{particle_name} decay",
        "citation": safe_api_info(api, "citation") or "PDG Python API live read",
        "branchingDisplay": str(getattr(decay, "display_value_text", "") or ""),
        "sourceMode": "pdg.connect",
        "lookupParticleName": particle_name,
    }
    if decay_pdgid:
        source["pdgIdentifier"] = str(decay_pdgid)

    return PdgCase(
        case_id=case_id,
        proposal_id=f"{case_id}.live-pdg",
        title=description or f"{particle_name} decay",
        source_kind="pdg-live",
        source=source,
        reactants=(FixtureParticle(name=particle_name, pdg_id=particle_name),),
        products=tuple(products),
        notes=tuple(notes),
    )


def build_live_manifest_payload(database_url: str | None = None, *, api: Any | None = None) -> dict[str, Any]:
    api = api or connect_pdg(database_url, pedantic=False)
    seen_keys: set[str] = set()
    exportable_entries: list[dict[str, Any]] = []
    unsupported_particle_counts: Counter[str] = Counter()
    unsupported_entries: list[dict[str, Any]] = []

    for particle in iter_live_particles(api):
        for decay in iter_candidate_branching_fractions(particle):
            discovery_key = build_live_decay_discovery_key(particle, decay)
            if discovery_key in seen_keys:
                continue
            seen_keys.add(discovery_key)
            live_case = build_live_case_from_decay(api, particle, decay)
            proposal = build_proposal(live_case)
            solver_request = build_solver_request(proposal)
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
            if solver_request is None:
                unsupported_entries.append(entry)
                continue
            entry["solverRequest"] = solver_request
            exportable_entries.append(entry)

    exportable_entries.sort(
        key=lambda entry: (
            str(entry.get("pdgIdentifier", "")),
            str(entry.get("lookupParticleName", "")),
            str(entry.get("channelDescription", "")),
            str(entry.get("proposalId", "")),
        )
    )
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
    }


def find_live_decay(api: Any, spec: LiveChannelSpec) -> tuple[Any, list[FixtureParticle], list[str]]:
    particle = api.get_particle_by_name(spec.reactant_name)
    expected_description = normalize_channel_description(spec.channel_description)
    expected_signature = Counter(spec.product_names)
    product_matches: list[tuple[Any, list[FixtureParticle], list[str], bool]] = []
    for decay in iter_candidate_branching_fractions(particle):
        description = normalize_channel_description(getattr(decay, "description", ""))
        products, notes = extract_live_decay_products(decay)
        subdecay_count = sum(1 for product in getattr(decay, "decay_products", ()) or () if getattr(product, "subdecay", None))
        if subdecay_count:
            notes.append(f"unsupported:channel-subdecays:{subdecay_count}")
        actual_signature = build_live_product_signature(api, products)
        if actual_signature == expected_signature:
            product_matches.append((decay, products, notes, description == expected_description))
            continue

    if product_matches:
        product_matches.sort(key=lambda entry: (not entry[3], len(entry[2]), getattr(entry[0], "mode_number", 0)))
        decay, products, notes, _ = product_matches[0]
        return decay, products, notes
    raise LookupError(f"Could not locate live PDG decay matching {spec.channel_description!r}")


def load_live_case(spec: LiveChannelSpec, database_url: str | None = None) -> PdgCase:
    api = connect_pdg(database_url, pedantic=False)
    decay, products, notes = find_live_decay(api, spec)

    source: dict[str, Any] = {
        "edition": str(getattr(api, "edition", "")),
        "channelDescription": normalize_channel_description(getattr(decay, "description", spec.channel_description)),
        "citation": safe_api_info(api, "citation") or "PDG Python API live read",
        "branchingDisplay": str(getattr(decay, "display_value_text", "") or ""),
        "sourceMode": "pdg.connect",
        "lookupParticleName": spec.reactant_name,
    }
    decay_pdgid = getattr(decay, "pdgid", None)
    if decay_pdgid:
        source["pdgIdentifier"] = str(decay_pdgid)

    return PdgCase(
        case_id=spec.case_id,
        proposal_id=f"{spec.case_id}.live-pdg",
        title=spec.title,
        source_kind="pdg-live",
        source=source,
        reactants=(FixtureParticle(name=spec.reactant_name, pdg_id=spec.reactant_name),),
        products=tuple(products),
        notes=tuple(notes),
    )


def emit_case(case: PdgCase, output_dir: Path) -> list[Path]:
    proposal = build_proposal(case)
    written_paths: list[Path] = []
    proposal_path = output_dir / f"{proposal.proposal_id}.proposal.v1.json"
    write_json(proposal_path, proposal.to_dict())
    written_paths.append(proposal_path)

    solver_request = build_solver_request(proposal)
    if solver_request is not None:
        request_path = output_dir / f"{proposal.proposal_id}.solver-request.v1.json"
        write_json(request_path, solver_request)
        written_paths.append(request_path)
    return written_paths


def build_fixture_proposal_object(fixtures_by_id: dict[str, PdgCase], fixture_id: str) -> Proposal:
    fixture = fixtures_by_id.get(fixture_id)
    if fixture is None:
        available = ", ".join(sorted(fixtures_by_id))
        raise SystemExit(f"Unknown fixture id {fixture_id!r}. Available: {available}")
    return build_proposal(fixture)


def build_fixture_proposal(fixtures_by_id: dict[str, PdgCase], fixture_id: str) -> dict[str, Any]:
    return build_fixture_proposal_object(fixtures_by_id, fixture_id).to_dict()


def build_fixture_solver_request(fixtures_by_id: dict[str, PdgCase], fixture_id: str) -> dict[str, Any]:
    solver_request = build_solver_request(build_fixture_proposal_object(fixtures_by_id, fixture_id))
    if solver_request is None:
        raise SystemExit(f"Fixture {fixture_id!r} does not currently emit solver-request/v1.")
    return solver_request


def build_live_case_proposal_object(case_id: str, database_url: str | None = None) -> Proposal:
    spec = LIVE_CHANNEL_SPEC_BY_ID.get(case_id)
    if spec is None:
        available = ", ".join(sorted(LIVE_CHANNEL_SPEC_BY_ID))
        raise SystemExit(f"Unknown live case id {case_id!r}. Available: {available}")
    try:
        live_case = load_live_case(spec, database_url)
    except (LookupError, RuntimeError) as exc:
        raise SystemExit(str(exc)) from exc
    return build_proposal(live_case)


def build_live_case_proposal(case_id: str, database_url: str | None = None) -> dict[str, Any]:
    return build_live_case_proposal_object(case_id, database_url).to_dict()


def build_live_case_solver_request(case_id: str, database_url: str | None = None) -> dict[str, Any]:
    solver_request = build_solver_request(build_live_case_proposal_object(case_id, database_url))
    if solver_request is None:
        raise SystemExit(f"Live case {case_id!r} does not currently emit solver-request/v1.")
    return solver_request


def print_json(payload: dict[str, Any]) -> None:
    json.dump(payload, sys.stdout, indent=2)
    sys.stdout.write("\n")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build local PDG proposal fixtures and solver-request candidates.")
    parser.add_argument(
        "--fixture-index",
        type=Path,
        default=DEFAULT_FIXTURE_INDEX,
        help="Path to the local PDG fixture corpus index.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Directory where generated JSON artifacts are written.",
    )
    parser.add_argument(
        "--database-url",
        help="Optional database URL passed through to pdg.connect(...) for live reads.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list-fixtures", help="List available local PDG fixtures.")
    subparsers.add_parser("list-live-cases", help="List the first live PDG channels supported by this script.")
    subparsers.add_parser(
        "build-live-manifest",
        help="Discover exportable live PDG decays and print a frozen batch manifest JSON payload.",
    )

    emit_fixture_parser = subparsers.add_parser("emit-fixture", help="Emit proposal and solver-request artifacts for one fixture.")
    emit_fixture_parser.add_argument("fixture_id", help="Fixture id from the local PDG corpus.")

    print_fixture_proposal_parser = subparsers.add_parser(
        "print-fixture-proposal",
        help="Print one fixture pdg-proposal/v1 JSON payload to stdout.",
    )
    print_fixture_proposal_parser.add_argument("fixture_id", help="Fixture id from the local PDG corpus.")

    print_fixture_request_parser = subparsers.add_parser(
        "print-fixture-solver-request",
        help="Print one fixture solver-request/v1 JSON payload to stdout for piping.",
    )
    print_fixture_request_parser.add_argument("fixture_id", help="Fixture id from the local PDG corpus.")

    subparsers.add_parser("emit-all-fixtures", help="Emit proposal and solver-request artifacts for all fixtures.")

    emit_live_parser = subparsers.add_parser("emit-live-case", help="Emit proposal and solver-request artifacts for one live PDG channel.")
    emit_live_parser.add_argument("case_id", help="Live case id from the built-in live PDG registry.")

    print_live_proposal_parser = subparsers.add_parser(
        "print-live-proposal",
        help="Print one live-case pdg-proposal/v1 JSON payload to stdout.",
    )
    print_live_proposal_parser.add_argument("case_id", help="Live case id from the built-in live PDG registry.")

    print_live_request_parser = subparsers.add_parser(
        "print-live-solver-request",
        help="Print one live-case solver-request/v1 JSON payload to stdout for piping.",
    )
    print_live_request_parser.add_argument("case_id", help="Live case id from the built-in live PDG registry.")

    subparsers.add_parser("emit-all-live-cases", help="Emit proposal and solver-request artifacts for all built-in live PDG channels.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    fixtures = load_fixture_index(args.fixture_index)
    fixtures_by_id = {fixture.case_id: fixture for fixture in fixtures}

    if args.command == "list-fixtures":
        for fixture in fixtures:
            print(f"{fixture.case_id}\t{fixture.title}")
        return 0

    if args.command == "list-live-cases":
        for spec in LIVE_CHANNEL_SPECS:
            print(f"{spec.case_id}\t{spec.title}")
        return 0

    if args.command == "build-live-manifest":
        print_json(build_live_manifest_payload(args.database_url))
        return 0

    if args.command == "emit-fixture":
        fixture = fixtures_by_id.get(args.fixture_id)
        if fixture is None:
            available = ", ".join(sorted(fixtures_by_id))
            raise SystemExit(f"Unknown fixture id {args.fixture_id!r}. Available: {available}")
        for path in emit_case(fixture, args.output_dir):
            print(path.relative_to(REPO_ROOT))
        return 0

    if args.command == "print-fixture-proposal":
        print_json(build_fixture_proposal(fixtures_by_id, args.fixture_id))
        return 0

    if args.command == "print-fixture-solver-request":
        print_json(build_fixture_solver_request(fixtures_by_id, args.fixture_id))
        return 0

    if args.command == "emit-all-fixtures":
        for fixture in fixtures:
            for path in emit_case(fixture, args.output_dir):
                print(path.relative_to(REPO_ROOT))
        return 0

    if args.command == "emit-live-case":
        spec = LIVE_CHANNEL_SPEC_BY_ID.get(args.case_id)
        if spec is None:
            available = ", ".join(sorted(LIVE_CHANNEL_SPEC_BY_ID))
            raise SystemExit(f"Unknown live case id {args.case_id!r}. Available: {available}")
        try:
            live_case = load_live_case(spec, args.database_url)
        except (LookupError, RuntimeError) as exc:
            raise SystemExit(str(exc)) from exc
        for path in emit_case(live_case, args.output_dir):
            print(path.relative_to(REPO_ROOT))
        return 0

    if args.command == "print-live-proposal":
        print_json(build_live_case_proposal(args.case_id, args.database_url))
        return 0

    if args.command == "print-live-solver-request":
        print_json(build_live_case_solver_request(args.case_id, args.database_url))
        return 0

    if args.command == "emit-all-live-cases":
        try:
            live_cases = [load_live_case(spec, args.database_url) for spec in LIVE_CHANNEL_SPECS]
        except (LookupError, RuntimeError) as exc:
            raise SystemExit(str(exc)) from exc
        for live_case in live_cases:
            for path in emit_case(live_case, args.output_dir):
                print(path.relative_to(REPO_ROOT))
        return 0

    raise SystemExit(f"Unsupported command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
