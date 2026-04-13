from __future__ import annotations

from typing import Any

from scripts.pdg.pdgfeed_generic_family import is_supported_generic_family, resolve_generic_family_products
from scripts.pdg.pdgfeed_model import CaseParticle, PdgCase
from scripts.pdg.pdgfeed_registry import canonicalize_pdg_name, conjugate_canonical_name, particle_charge_thirds


KNOWN_REACTION_KEYS: tuple[tuple[int, str], ...] = (
    (13, "S004.1/2025"),
    (13, "S004.2/2025"),
    (13, "S004.7/2025"),
    (13, "S004.4/2025"),
    (211, "S008.1/2025"),
)
KNOWN_REACTION_ORDER = {key: index for index, key in enumerate(KNOWN_REACTION_KEYS)}


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


def identifier_token(text: str) -> str:
    token_parts: list[str] = []
    for ch in str(text).strip().lower():
        if ch.isalnum():
            token_parts.append(ch)
        elif ch == "+":
            token_parts.append("_plus_")
        elif ch == "-":
            token_parts.append("_minus_")
        else:
            token_parts.append("_")
    token = "".join(token_parts)
    while "__" in token:
        token = token.replace("__", "_")
    return token.strip("_") or "item"


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


def extract_live_decay_products(
    decay: Any,
    *,
    reactant_name: str | None = None,
) -> tuple[list[CaseParticle], list[str]]:
    particles: list[CaseParticle] = []
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
        if multiplier <= 0:
            notes.append(f"unsupported:product:{item_name}:multiplier-{multiplier}")
            continue
        if item_particle in (None, False):
            if is_supported_generic_family(str(item_name)):
                generic_name = str(item_name).strip()
                for _ in range(multiplier):
                    particles.append(CaseParticle(name=generic_name, pdg_id=generic_name))
                continue
            suffix = f"generic-or-textual-item:{item_type}" if item_type else "generic-or-textual-item"
            notes.append(f"unsupported:product:{item_name}:{suffix}")
            continue
        for _ in range(multiplier):
            particles.append(CaseParticle(name=str(item_name), pdg_id=str(item_name)))
    if reactant_name:
        resolution = resolve_generic_family_products(reactant_name, particles)
        particles = list(resolution.products)
        notes.extend(resolution.notes)
    return particles, notes


def total_charge_thirds(names: list[str]) -> int | None:
    total = 0
    for name in names:
        charge = particle_charge_thirds(name)
        if charge is None:
            return None
        total += charge
    return total


def maybe_charge_conjugate_products(
    reactant_name: str,
    products: list[CaseParticle],
    notes: list[str],
    *,
    api: Any,
) -> tuple[list[CaseParticle], list[str]]:
    reactant_canonical = canonicalize_api_particle_name(api, reactant_name)
    reactant_charge = particle_charge_thirds(reactant_canonical)
    if reactant_charge is None:
        return products, notes

    canonical_product_names = [canonicalize_api_particle_name(api, product.name) for product in products]
    product_charge = total_charge_thirds(canonical_product_names)
    if product_charge is None:
        return products, notes
    if reactant_charge == product_charge:
        return products, notes

    conjugated_product_names: list[str] = []
    for product_name in canonical_product_names:
        conjugated_name = conjugate_canonical_name(product_name)
        if conjugated_name is None:
            return products, notes
        conjugated_product_names.append(conjugated_name)

    conjugated_charge = total_charge_thirds(conjugated_product_names)
    if conjugated_charge == reactant_charge:
        notes.append(f"transform:charge-conjugated-products:{reactant_canonical}")
        return [
            CaseParticle(name=conjugated_name, pdg_id=conjugated_name)
            for conjugated_name in conjugated_product_names
        ], notes

    notes.append(f"unsupported:charge-mismatch:{reactant_canonical}:{reactant_charge}:{product_charge}")
    return products, notes


def iter_candidate_branching_fractions(particle: Any) -> list[Any]:
    decays: list[Any] = []
    seen_ids: set[tuple[str, int | None]] = set()

    def extend(entries: Any) -> None:
        for decay in entries:
            identity = (str(getattr(decay, "pdgid", id(decay))), getattr(decay, "mode_number", None))
            if identity in seen_ids:
                continue
            seen_ids.add(identity)
            decays.append(decay)

    try:
        # PDG subdecay rows are decay-table hierarchy under one parent record,
        # not a general cross-record production network.
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


def build_live_case_id(particle: Any, decay: Any) -> str:
    particle_token = identifier_token(str(getattr(particle, "name", "") or getattr(particle, "description", "") or "particle"))
    raw_decay_identifier = str(
        getattr(decay, "baseid", "") or getattr(decay, "pdgid", "") or getattr(decay, "mode_number", "") or "mode"
    )
    decay_token = identifier_token(raw_decay_identifier.partition("/")[0])
    return f"{particle_token}_{decay_token}"


def build_live_case_title(particle: Any, decay: Any) -> str:
    mode_number = getattr(decay, "mode_number", None)
    particle_name = str(getattr(particle, "name", "") or getattr(particle, "description", "") or "particle")
    if isinstance(mode_number, int) and mode_number > 0:
        return f"{particle_name} decay mode {mode_number}"
    description = normalize_channel_description(getattr(decay, "description", ""))
    if description:
        return description
    return f"{particle_name} decay"


def build_live_channel_description(reactant_name: str, products: list[CaseParticle], fallback_description: str) -> str:
    product_names = [
        str(product.display_label or product.name).strip()
        for product in products
        if str(product.display_label or product.name).strip()
    ]
    if reactant_name and product_names:
        return f"{reactant_name} -> {' '.join(product_names)}"
    fallback = normalize_channel_description(fallback_description)
    left, separator, right = fallback.partition("->")
    if reactant_name and separator and right.strip():
        return f"{reactant_name} -> {right.strip()}"
    return fallback


def iter_live_particles(api: Any) -> Any:
    for particle_list in api.get_particles():
        for particle in particle_list:
            yield particle


def reaction_source_key(source: dict[str, Any]) -> tuple[int, str] | None:
    mcid = source.get("mcid")
    pdg_identifier = str(source.get("pdgIdentifier", "")).strip()
    if not isinstance(mcid, int) or not pdg_identifier:
        return None
    return (mcid, pdg_identifier)


def known_reaction_status_from_source(source: dict[str, Any]) -> str:
    return "k" if reaction_source_key(source) in KNOWN_REACTION_ORDER else "u"


def known_reaction_status(case: PdgCase) -> str:
    return known_reaction_status_from_source(case.source)


def known_reaction_sort_key(case: PdgCase) -> tuple[int, int, str, int, str, str]:
    source_key = reaction_source_key(case.source)
    known_index = KNOWN_REACTION_ORDER.get(source_key)
    return (
        0 if known_index is not None else 1,
        known_index if known_index is not None else len(KNOWN_REACTION_ORDER),
        str(case.source.get("lookupParticleName", "")),
        int(case.source.get("modeNumber", 0) or 0),
        str(case.source.get("pdgIdentifier", "")),
        case.case_id,
    )


def load_live_case_from_decay(
    particle: Any,
    decay: Any,
    *,
    api: Any,
) -> PdgCase:
    reactant_name = canonicalize_api_particle_name(api, str(getattr(particle, "name", "") or ""))
    products, notes = extract_live_decay_products(decay, reactant_name=reactant_name)
    subdecay_count = sum(
        1 for product in getattr(decay, "decay_products", ()) or () if getattr(product, "subdecay", None)
    )
    if subdecay_count:
        notes.append(f"unsupported:channel-subdecays:{subdecay_count}")

    fallback_description = str(getattr(decay, "description", "") or "")
    products, notes = maybe_charge_conjugate_products(reactant_name, products, notes, api=api)
    channel_description = build_live_channel_description(reactant_name, products, fallback_description)
    source: dict[str, Any] = {
        "edition": str(getattr(api, "edition", "")),
        "channelDescription": channel_description,
        "citation": safe_api_info(api, "citation") or "PDG Python API database read",
        "branchingDisplay": str(getattr(decay, "display_value_text", "") or ""),
        "sourceMode": "pdg.connect",
        "lookupParticleName": reactant_name,
        "particleName": str(getattr(particle, "name", "") or ""),
        "modeNumber": int(getattr(decay, "mode_number", 0) or 0),
        "isSubdecay": bool(getattr(decay, "is_subdecay", False)),
        "subdecayLevel": int(getattr(decay, "subdecay_level", 0) or 0),
    }
    particle_mcid = getattr(particle, "mcid", None)
    if particle_mcid is not None:
        source["mcid"] = int(particle_mcid)
    decay_pdgid = getattr(decay, "pdgid", None)
    if decay_pdgid:
        source["pdgIdentifier"] = str(decay_pdgid)
    source["knownStatus"] = known_reaction_status_from_source(source)

    case_id = build_live_case_id(particle, decay)
    return PdgCase(
        case_id=case_id,
        proposal_id=case_id,
        title=build_live_case_title(particle, decay),
        source_kind="pdg-live",
        source=source,
        reactants=(CaseParticle(name=reactant_name, pdg_id=reactant_name),),
        products=tuple(products),
        notes=tuple(notes),
    )


def load_live_cases(
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> list[PdgCase]:
    api = api or connect_pdg(database_url, pedantic=False)
    cases = [
        load_live_case_from_decay(particle, decay, api=api)
        for particle in iter_live_particles(api)
        for decay in iter_candidate_branching_fractions(particle)
    ]
    return sorted(cases, key=known_reaction_sort_key)


def load_live_case_by_id(
    reaction_id: str,
    database_url: str | None = None,
    *,
    api: Any | None = None,
) -> PdgCase:
    api = api or connect_pdg(database_url, pedantic=False)
    for case in load_live_cases(database_url, api=api):
        if case.case_id == reaction_id:
            return case
    raise LookupError(f"Unknown PDG reaction id {reaction_id!r}.")
