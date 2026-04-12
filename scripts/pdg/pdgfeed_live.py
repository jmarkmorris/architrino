from __future__ import annotations

from collections import Counter
from typing import Any

from scripts.pdg.pdgfeed_model import LiveChannelSpec, PdgCase, TestCaseParticle
from scripts.pdg.pdgfeed_registry import canonicalize_pdg_name, lookup_particle_mapping


TEST_REACTIONS: tuple[LiveChannelSpec, ...] = (
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

TEST_REACTION_BY_ID = {spec.case_id: spec for spec in TEST_REACTIONS}


def connect_pdg(database_url: str | None = None, *, pedantic: bool = False) -> Any:
    try:
        import pdg as pdg_package
    except ImportError as exc:  # pragma: no cover - environment-dependent
        raise RuntimeError(
            "The `pdg` package is not installed. Install it before using PDG database access."
        ) from exc
    return pdg_package.connect(database_url, pedantic=pedantic) if database_url else pdg_package.connect(
        pedantic=pedantic
    )


def normalize_channel_description(text: str) -> str:
    return " ".join(str(text).replace("-->", "->").split())


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
        canonical = stripped
    return canonicalize_pdg_name(str(canonical))


def safe_decay_item_particle(item: Any) -> Any | None:
    try:
        return item.particle
    except Exception:  # pragma: no cover - external API dependent
        return None


def extract_live_decay_products(decay: Any) -> tuple[list[TestCaseParticle], list[str]]:
    particles: list[TestCaseParticle] = []
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
            particles.append(TestCaseParticle(name=str(item_name), pdg_id=str(item_name)))
    return particles, notes


def build_live_product_signature(api: Any, particles: list[TestCaseParticle]) -> Counter[str]:
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


def infer_reactant_name_from_description(api: Any, particle: Any, description: str) -> str:
    normalized_description = normalize_channel_description(description)
    left_side = normalized_description.partition("->")[0].strip()
    if left_side and " " not in left_side:
        canonical_left = canonicalize_api_particle_name(api, left_side)
        if lookup_particle_mapping(canonical_left) is not None:
            return canonical_left
    return canonicalize_api_particle_name(api, str(getattr(particle, "name", "") or ""))


def find_live_decay(api: Any, spec: LiveChannelSpec) -> tuple[Any, list[TestCaseParticle], list[str]]:
    particle = api.get_particle_by_name(spec.reactant_name)
    expected_description = normalize_channel_description(spec.channel_description)
    expected_signature = Counter(spec.product_names)
    matches: list[tuple[Any, list[TestCaseParticle], list[str], bool]] = []
    for decay in iter_candidate_branching_fractions(particle):
        description = normalize_channel_description(getattr(decay, "description", ""))
        products, notes = extract_live_decay_products(decay)
        actual_signature = build_live_product_signature(api, products)
        if actual_signature == expected_signature:
            matches.append((decay, products, notes, description == expected_description))

    if not matches:
        raise LookupError(f"Could not locate PDG database decay matching {spec.channel_description!r}")

    matches.sort(key=lambda entry: (not entry[3], len(entry[2]), getattr(entry[0], "mode_number", 0)))
    decay, products, notes, _ = matches[0]
    return decay, products, notes


def load_live_case(
    spec: LiveChannelSpec,
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> PdgCase:
    api = api or connect_pdg(database_url, pedantic=False)
    decay, products, notes = find_live_decay(api, spec)

    subdecay_count = sum(
        1 for product in getattr(decay, "decay_products", ()) or () if getattr(product, "subdecay", None)
    )
    if subdecay_count:
        notes.append(f"unsupported:channel-subdecays:{subdecay_count}")

    reactant_name = infer_reactant_name_from_description(api, api.get_particle_by_name(spec.reactant_name), spec.channel_description)
    source: dict[str, Any] = {
        "edition": str(getattr(api, "edition", "")),
        "channelDescription": normalize_channel_description(getattr(decay, "description", spec.channel_description)),
        "citation": safe_api_info(api, "citation") or "PDG Python API database read",
        "branchingDisplay": str(getattr(decay, "display_value_text", "") or ""),
        "sourceMode": "pdg.connect",
        "lookupParticleName": reactant_name,
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
        reactants=(TestCaseParticle(name=reactant_name, pdg_id=reactant_name),),
        products=tuple(products),
        notes=tuple(notes),
    )
