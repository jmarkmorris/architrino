#!/usr/bin/env python3
"""Build local PDG-derived proposal artifacts and solver-request candidates.

The first implementation is fixture-first so work can proceed without requiring
the external `pdg` package during every development cycle. Live PDG access is
still represented through `connect_pdg()` and can be expanded later.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parent
DEFAULT_FIXTURE_INDEX = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "index.json"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "content" / "contracts" / "examples" / "pdg" / "v1" / "generated"

SOLVER_REQUEST_SCHEMA = "solver-request/v1"
PDG_FIXTURE_CORPUS_SCHEMA = "pdg-fixture-corpus/v1"
PDG_FIXTURE_SOURCE_SCHEMA = "pdg-fixture-source/v1"
PDG_PROPOSAL_SCHEMA = "pdg-proposal/v1"

DEFAULT_POLICY = {
    "recruitmentMode": "forbid",
    "lateBosonCollapseMode": "allow-exact",
    "weakChannelMode": "v1-core-provenance-only",
    "carryThroughMode": "exact-first",
}


@dataclass(frozen=True)
class ParticleTemplate:
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


PARTICLE_TEMPLATES: tuple[ParticleTemplate, ...] = (
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
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
    ParticleTemplate(
        aliases=("anti-nu_e", "anti-electron-neutrino"),
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
    ParticleTemplate(
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
    ParticleTemplate(
        aliases=("anti-nu_mu", "anti-muon-neutrino"),
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
    ParticleTemplate(
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
)

PARTICLE_TEMPLATE_BY_ALIAS = {
    alias.lower(): template
    for template in PARTICLE_TEMPLATES
    for alias in template.aliases
}


@dataclass(frozen=True)
class FixtureParticle:
    name: str
    pdg_id: str | None = None
    display_label: str | None = None


@dataclass(frozen=True)
class FixtureCase:
    fixture_id: str
    title: str
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


def connect_pdg(database_url: str | None = None) -> Any:
    """Connect to the official local PDG database through the `pdg` package."""
    try:
        import pdg as pdg_package
    except ImportError as exc:  # pragma: no cover - environment-dependent
        raise RuntimeError(
            "The `pdg` package is not installed. Install it before using live PDG access."
        ) from exc
    return pdg_package.connect(database_url) if database_url else pdg_package.connect()


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def load_fixture_index(index_path: Path) -> list[FixtureCase]:
    index_payload = load_json(index_path)
    if index_payload.get("schema") != PDG_FIXTURE_CORPUS_SCHEMA:
        raise ValueError(f"Unexpected fixture index schema in {index_path}")
    fixtures: list[FixtureCase] = []
    for case in index_payload.get("cases", []):
        source_path = REPO_ROOT / case["sourcePath"]
        fixture_payload = load_json(source_path)
        if fixture_payload.get("schema") != PDG_FIXTURE_SOURCE_SCHEMA:
            raise ValueError(f"Unexpected fixture source schema in {source_path}")
        fixtures.append(
            FixtureCase(
                fixture_id=str(fixture_payload["fixtureId"]),
                title=str(fixture_payload["title"]),
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


def build_inventory(template: ParticleTemplate, particle: FixtureParticle) -> dict[str, Any]:
    flags = [*template.inventory_flags]
    if particle.pdg_id:
        flags.append(f"pdg-id:{particle.pdg_id}")
    flags.append(f"pdg-name:{particle.name}")
    inventory = {
        "electrinoCount": template.electrino_count,
        "positrinoCount": template.positrino_count,
    }
    if flags:
        inventory["flags"] = flags
    return inventory


def normalize_particle(particle: FixtureParticle, side: str, ordinal: int) -> tuple[NormalizedParticipant | None, str | None]:
    template = PARTICLE_TEMPLATE_BY_ALIAS.get(particle.name.strip().lower())
    if template is None:
        return None, f"unsupported:{side}:{particle.name}"
    slug = slugify(particle.display_label or particle.name)
    participant_id = f"{side}_{slug}_{ordinal}"
    label = particle.display_label or template.label
    tags = [*template.tags]
    if particle.pdg_id:
        tags.append(f"pdg-id:{particle.pdg_id}")
    participant = NormalizedParticipant(
        participant_id=participant_id,
        side=side,
        template_id=template.template_id,
        label=label,
        family=template.family,
        polarity=template.polarity,
        is_composite=template.is_composite,
        inventory=build_inventory(template, particle),
        tags=tuple(tags),
        pdg_name=particle.name,
        pdg_id=particle.pdg_id,
    )
    return participant, None


def build_proposal(case: FixtureCase) -> Proposal:
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
    ranking_reasons = ["fixture-source"]
    if unsupported_count == 0:
        ranking_reasons.append("all-participants-supported")
    else:
        ranking_reasons.append("contains-unsupported-participants")

    source = {
        **case.source,
        "fixtureId": case.fixture_id,
        "fixturePath": str(case.source_path.relative_to(REPO_ROOT)) if case.source_path else "",
    }
    ranking = {
        "rank": 1,
        "score": max(0, 100 - unsupported_count * 25 - len(notes) * 5),
        "reasons": ranking_reasons,
    }
    return Proposal(
        proposal_id=case.fixture_id,
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
            "sourceDocumentId": proposal.source.get("fixtureId") or proposal.proposal_id,
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


def validate_solver_request_shape(request: dict[str, Any]) -> None:
    required_top_level = {
        "schema",
        "requestId",
        "participants",
        "manualOperators",
        "manualMappings",
        "dissociation",
        "policy",
    }
    missing = sorted(required_top_level.difference(request))
    if missing:
        raise ValueError(f"solver-request missing required keys: {', '.join(missing)}")
    if request["schema"] != SOLVER_REQUEST_SCHEMA:
        raise ValueError(f"unexpected solver-request schema: {request['schema']}")
    for participant in request["participants"]:
        for key in ("id", "side", "templateId", "label", "inventory", "rootNodeId", "nodes"):
            if key not in participant:
                raise ValueError(f"participant missing required key {key}: {participant}")
        if participant["side"] not in {"reactant", "product", "center"}:
            raise ValueError(f"unexpected participant side: {participant['side']}")
        for node in participant["nodes"]:
            for key in ("id", "templateId", "label", "inventory"):
                if key not in node:
                    raise ValueError(f"node missing required key {key}: {node}")
    policy = request["policy"]
    if policy != DEFAULT_POLICY:
        raise ValueError(f"unexpected policy payload: {policy}")


def emit_fixture(case: FixtureCase, output_dir: Path) -> list[Path]:
    proposal = build_proposal(case)
    written_paths: list[Path] = []
    proposal_path = output_dir / f"{case.fixture_id}.proposal.v1.json"
    write_json(proposal_path, proposal.to_dict())
    written_paths.append(proposal_path)

    solver_request = build_solver_request(proposal)
    if solver_request is not None:
        request_path = output_dir / f"{case.fixture_id}.solver-request.v1.json"
        write_json(request_path, solver_request)
        written_paths.append(request_path)
    return written_paths


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
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list-fixtures", help="List available local PDG fixtures.")

    emit_fixture_parser = subparsers.add_parser("emit-fixture", help="Emit proposal and solver-request artifacts for one fixture.")
    emit_fixture_parser.add_argument("fixture_id", help="Fixture id from the local PDG corpus.")

    subparsers.add_parser("emit-all-fixtures", help="Emit proposal and solver-request artifacts for all fixtures.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    fixtures = load_fixture_index(args.fixture_index)
    fixtures_by_id = {fixture.fixture_id: fixture for fixture in fixtures}

    if args.command == "list-fixtures":
        for fixture in fixtures:
            print(f"{fixture.fixture_id}\t{fixture.title}")
        return 0

    if args.command == "emit-fixture":
        fixture = fixtures_by_id.get(args.fixture_id)
        if fixture is None:
            available = ", ".join(sorted(fixtures_by_id))
            raise SystemExit(f"Unknown fixture id {args.fixture_id!r}. Available: {available}")
        for path in emit_fixture(fixture, args.output_dir):
            print(path.relative_to(REPO_ROOT))
        return 0

    if args.command == "emit-all-fixtures":
        for fixture in fixtures:
            for path in emit_fixture(fixture, args.output_dir):
                print(path.relative_to(REPO_ROOT))
        return 0

    raise SystemExit(f"Unsupported command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
