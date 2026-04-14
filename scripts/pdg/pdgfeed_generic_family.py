from __future__ import annotations

from dataclasses import dataclass
from itertools import product
from typing import Sequence

from scripts.pdg.pdgfeed_model import CaseParticle
from scripts.pdg.pdgfeed_registry import particle_charge_thirds


GENERIC_FAMILY_CANDIDATES: dict[str, tuple[str, ...]] = {
    "pi": ("pi+", "pi0", "pi-"),
    "N": ("p", "n"),
    "Nbar": ("anti-p", "anti-n"),
}


@dataclass(frozen=True)
class GenericFamilyResolution:
    products: tuple[CaseParticle, ...]
    notes: tuple[str, ...] = ()


def canonicalize_generic_family_name(name: str) -> str:
    stripped = str(name).strip()
    if stripped in GENERIC_FAMILY_CANDIDATES:
        return stripped
    lowered = stripped.lower()
    if lowered == "pi":
        return "pi"
    if lowered == "nbar":
        return "Nbar"
    return stripped


def is_supported_generic_family(name: str) -> bool:
    return canonicalize_generic_family_name(name) in GENERIC_FAMILY_CANDIDATES


def build_generic_family_note(
    status: str,
    generic_names: Sequence[str],
    detail: str,
) -> str:
    generic_summary = ".".join(str(name) for name in generic_names)
    return f"generic-family-charge-{status}:{generic_summary}:{detail}"


def build_charge_balanced_assignments(
    generic_names: Sequence[str],
    target_charge_thirds: int,
) -> list[tuple[str, ...]]:
    candidate_lists = [GENERIC_FAMILY_CANDIDATES[name] for name in generic_names]
    seen_assignments: set[tuple[str, ...]] = set()
    valid_assignments: list[tuple[str, ...]] = []

    for concrete_names in product(*candidate_lists):
        total_charge = 0
        for concrete_name in concrete_names:
            charge = particle_charge_thirds(concrete_name)
            if charge is None:
                total_charge = target_charge_thirds + 1
                break
            total_charge += charge
        if total_charge != target_charge_thirds:
            continue
        assignment = tuple(sorted(concrete_names))
        if assignment in seen_assignments:
            continue
        seen_assignments.add(assignment)
        valid_assignments.append(assignment)
    return valid_assignments


def assign_resolved_generic_products(
    products: Sequence[CaseParticle],
    assignment: Sequence[str],
) -> tuple[CaseParticle, ...]:
    remaining = {name: assignment.count(name) for name in assignment}
    resolved_products: list[CaseParticle] = []

    for product_particle in products:
        generic_name = canonicalize_generic_family_name(product_particle.name)
        if generic_name not in GENERIC_FAMILY_CANDIDATES:
            resolved_products.append(product_particle)
            continue
        resolved_name = next(
            candidate
            for candidate in GENERIC_FAMILY_CANDIDATES[generic_name]
            if remaining.get(candidate, 0) > 0
        )
        remaining[resolved_name] = remaining.get(resolved_name, 0) - 1
        resolved_products.append(CaseParticle(name=resolved_name, pdg_id=resolved_name))

    return tuple(resolved_products)


def resolve_generic_family_products(
    reactant_name: str,
    products: Sequence[CaseParticle],
) -> GenericFamilyResolution:
    generic_names = [
        canonicalize_generic_family_name(product_particle.name)
        for product_particle in products
        if is_supported_generic_family(product_particle.name)
    ]
    if not generic_names:
        return GenericFamilyResolution(products=tuple(products))

    reactant_charge = particle_charge_thirds(str(reactant_name).strip())
    if reactant_charge is None:
        return GenericFamilyResolution(
            products=tuple(products),
            notes=(
                build_generic_family_note(
                    "rejected",
                    generic_names,
                    "reactant-charge-unavailable",
                ),
            ),
        )

    concrete_charge = 0
    for product_particle in products:
        if is_supported_generic_family(product_particle.name):
            continue
        charge = particle_charge_thirds(str(product_particle.name).strip())
        if charge is None:
            return GenericFamilyResolution(
                products=tuple(products),
                notes=(
                    build_generic_family_note(
                        "rejected",
                        generic_names,
                        f"concrete-charge-unavailable:{product_particle.name}",
                    ),
                ),
            )
        concrete_charge += charge

    target_charge = reactant_charge - concrete_charge
    assignments = build_charge_balanced_assignments(generic_names, target_charge)
    if not assignments:
        return GenericFamilyResolution(
            products=tuple(products),
            notes=(
                build_generic_family_note(
                    "rejected",
                    generic_names,
                    f"no-charge-balanced-assignment:{target_charge}",
                ),
            ),
        )
    if len(assignments) != 1:
        return GenericFamilyResolution(
            products=tuple(products),
            notes=(
                build_generic_family_note(
                    "ambiguous",
                    generic_names,
                    f"{len(assignments)}-assignments",
                ),
            ),
        )

    resolved_products = assign_resolved_generic_products(products, assignments[0])
    resolved_names = [product_particle.name for product_particle in resolved_products]
    return GenericFamilyResolution(
        products=resolved_products,
        notes=(
            build_generic_family_note(
                "resolved",
                generic_names,
                ".".join(resolved_names),
            ),
        ),
    )
