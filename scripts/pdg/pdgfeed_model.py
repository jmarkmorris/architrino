from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_TEST_CASE_INDEX = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "index.json"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "generated"
DEFAULT_SUPPORTED_REACTION_CSV = DEFAULT_OUTPUT_DIR / "supported_reaction_primitive_deltas.v1.csv"
PDGSOLVE_REQUEST_SCHEMA_PATH = REPO_ROOT / "src" / "contracts" / "pdgsolve-request" / "v1" / "schema.json"

PDGSOLVE_REQUEST_SCHEMA = "pdgsolve-request/v1"
PDG_TEST_CASE_CORPUS_SCHEMA = "pdg-test-case-corpus/v1"
PDG_TEST_CASE_SOURCE_SCHEMA = "pdg-test-case-source/v1"
PDG_PROPOSAL_SCHEMA = "pdg-proposal/v1"
PDG_LIVE_MANIFEST_SCHEMA = "pdg-live-manifest/v1"

DEFAULT_PDGSOLVE_REQUEST_POLICY = {
    "exactClosureRequired": True,
    "allowedBoundaryAugmentations": ["none"],
}

PDG_SOURCE_CONTRACT = {
    "upstreamSchema": PDG_PROPOSAL_SCHEMA,
    "downstreamSchema": PDGSOLVE_REQUEST_SCHEMA,
    "handoffMode": "upstream-only",
    "reactionAcceptanceRequired": True,
    "reactionAcceptanceBoundary": "reaction-review",
    "acceptedReactionHandoff": "reaction-owned",
    "pdgviewHandoff": "accepted-reaction-only",
}

SUPPORTED_REACTION_CSV_COLUMNS = (
    "reactant_names_aaa",
    "product_names_aaa",
    "reactant_electrinos",
    "product_electrinos",
    "electrino_delta",
    "reactant_positrinos",
    "product_positrinos",
    "positrino_delta",
)


@dataclass(frozen=True)
class RequestOccurrenceTemplate:
    assembly_id: str
    title: str

    def to_dict(self, occurrence_id: str) -> dict[str, str]:
        return {
            "id": occurrence_id,
            "assemblyId": self.assembly_id,
            "title": self.title,
        }


@dataclass(frozen=True)
class ParticleMapping:
    canonical_name: str
    canonical_id: str
    full_name: str
    aaa_notation: str
    particle_type: str
    family: str
    generation: str
    polarity: str
    electrino_count: int
    positrino_count: int
    template_id: str
    aliases: tuple[str, ...] = ()
    request_translation: str = "none"
    request_occurrences: tuple[RequestOccurrenceTemplate, ...] = ()

    @property
    def is_composite(self) -> bool:
        return self.particle_type == "composite"

    @property
    def exportable_to_request(self) -> bool:
        return bool(self.request_occurrences)


@dataclass(frozen=True)
class TestCaseParticle:
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
    reactants: tuple[TestCaseParticle, ...]
    products: tuple[TestCaseParticle, ...]
    notes: tuple[str, ...] = ()
    source_path: Path | None = None


@dataclass(frozen=True)
class NormalizedParticipant:
    participant_id: str
    side: str
    canonical_name: str
    canonical_id: str
    template_id: str
    label: str
    aaa_notation: str
    family: str
    generation: str
    polarity: str
    is_composite: bool
    inventory: dict[str, Any]
    pdg_name: str
    pdg_id: str | None
    request_translation: str
    request_occurrences: tuple[RequestOccurrenceTemplate, ...] = ()

    def to_request_occurrences(self) -> tuple[dict[str, str], ...]:
        if not self.request_occurrences:
            raise ValueError(f"Participant {self.participant_id} has no pdgsolve-request/v1 translation.")
        if len(self.request_occurrences) == 1:
            return (self.request_occurrences[0].to_dict(self.participant_id),)
        return tuple(
            occurrence.to_dict(f"{self.participant_id}.row.{index}")
            for index, occurrence in enumerate(self.request_occurrences, start=1)
        )

    def to_proposal_participant(self) -> dict[str, Any]:
        return {
            "id": self.participant_id,
            "side": self.side,
            "canonicalId": self.canonical_id,
            "templateId": self.template_id,
            "label": self.label,
            "aaaNotation": self.aaa_notation,
            "family": self.family,
            "generation": self.generation,
            "polarity": self.polarity,
            "isComposite": self.is_composite,
            "inventory": dict(self.inventory),
            "pdgName": self.pdg_name,
            "pdgId": self.pdg_id,
            "requestTranslation": self.request_translation,
        }


@dataclass(frozen=True)
class Proposal:
    proposal_id: str
    title: str
    source: dict[str, Any]
    reactants: tuple[NormalizedParticipant, ...]
    products: tuple[NormalizedParticipant, ...]
    ranking: dict[str, Any]
    notes: tuple[str, ...] = ()

    @property
    def exportable(self) -> bool:
        return not any(str(note).startswith("unsupported:") for note in self.notes)

    def to_dict(self) -> dict[str, Any]:
        return {
            "schema": PDG_PROPOSAL_SCHEMA,
            "proposalId": self.proposal_id,
            "title": self.title,
            "source": dict(self.source),
            "reactants": [participant.to_proposal_participant() for participant in self.reactants],
            "products": [participant.to_proposal_participant() for participant in self.products],
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

