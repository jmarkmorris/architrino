#!/usr/bin/env python3

import itertools
import json
import sys
from copy import deepcopy
from collections import Counter
from pathlib import Path


def normalize_text(value=""):
    return str(value or "").strip()


def to_int(value, fallback=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


def load_reaction_object_registry():
    registry_path = (
        Path(__file__).resolve().parents[1]
        / "src"
        / "apps"
        / "reaction"
        / "reaction-object-registry.v1.json"
    )
    with registry_path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


REACTION_OBJECT_REGISTRY = load_reaction_object_registry()


def build_reaction_object_alias_map(registry=None):
    alias_map = {}
    for template_id, spec in ((registry or {}).get("templates") or {}).items():
        normalized_template_id = normalize_text(template_id).lower()
        if not normalized_template_id:
            continue
        alias_map[normalized_template_id] = normalized_template_id
        for alias in spec.get("aliases") or []:
            normalized_alias = normalize_text(alias).lower()
            if normalized_alias:
                alias_map[normalized_alias] = normalized_template_id
    return alias_map


REACTION_OBJECT_ALIAS_MAP = build_reaction_object_alias_map(REACTION_OBJECT_REGISTRY)


def get_reaction_connection_policy():
    return REACTION_OBJECT_REGISTRY.get("connectionPolicy") or {}


def get_reaction_placement_lane_numbers(placement_class=""):
    placement_spec = (
        (REACTION_OBJECT_REGISTRY.get("placementClasses") or {}).get(
            normalize_text(placement_class).lower()
        )
        or {}
    )
    return [
        max(0, to_int(lane_number))
        for lane_number in (placement_spec.get("laneNumbers") or [])
        if isinstance(lane_number, int) or str(lane_number).strip()
    ]


def build_reaction_allowed_connection_set(policy=None):
    allowed_connections = set()
    for entry in ((policy or {}).get("allowedConnections") or []):
        source_placement_class = normalize_text(entry.get("sourcePlacementClass")).lower()
        source_role = normalize_text(entry.get("sourceRole")).lower()
        target_placement_class = normalize_text(entry.get("targetPlacementClass")).lower()
        target_role = normalize_text(entry.get("targetRole")).lower()
        source_lanes = [
            max(0, to_int(lane_number))
            for lane_number in (entry.get("sourceLaneNumbers") or [])
            if isinstance(lane_number, int) or str(lane_number).strip()
        ]
        target_lanes = [
            max(0, to_int(lane_number))
            for lane_number in (entry.get("targetLaneNumbers") or [])
            if isinstance(lane_number, int) or str(lane_number).strip()
        ]
        if not (source_placement_class and source_role and target_placement_class and target_role):
            continue
        for source_lane in source_lanes:
            for target_lane in target_lanes:
                allowed_connections.add(
                    (
                        source_placement_class,
                        source_role,
                        source_lane,
                        target_placement_class,
                        target_role,
                        target_lane,
                    )
                )
    return allowed_connections


REACTION_CONNECTION_POLICY = get_reaction_connection_policy()
REACTION_ALLOWED_CONNECTION_SET = build_reaction_allowed_connection_set(REACTION_CONNECTION_POLICY)


def get_reaction_operator_lane_number(operator_lane_index=0):
    operator_lane_numbers = get_reaction_placement_lane_numbers("operator")
    normalized_operator_lane_index = max(0, to_int(operator_lane_index))
    if 0 <= normalized_operator_lane_index < len(operator_lane_numbers):
        return operator_lane_numbers[normalized_operator_lane_index]
    if operator_lane_numbers:
        return operator_lane_numbers[-1]
    return normalized_operator_lane_index


def is_reaction_connection_allowed(
    source_placement_class="",
    source_role="",
    source_lane=None,
    target_placement_class="",
    target_role="",
    target_lane=None,
):
    return (
        normalize_text(source_placement_class).lower(),
        normalize_text(source_role).lower(),
        max(0, to_int(source_lane)),
        normalize_text(target_placement_class).lower(),
        normalize_text(target_role).lower(),
        max(0, to_int(target_lane)),
    ) in REACTION_ALLOWED_CONNECTION_SET


def normalize_registry_template_id(template_id=""):
    normalized_template_id = normalize_text(template_id).lower()
    return REACTION_OBJECT_ALIAS_MAP.get(normalized_template_id, normalized_template_id)


def get_reaction_object_spec(template_id=""):
    return ((REACTION_OBJECT_REGISTRY.get("templates") or {}).get(normalize_registry_template_id(template_id))) or None


def reaction_object_supports_polarity(template_id=""):
    return bool((get_reaction_object_spec(template_id) or {}).get("supportsPolarity"))


def get_reaction_object_allowed_placement_classes(template_id=""):
    spec = get_reaction_object_spec(template_id) or {}
    return [normalize_text(value).lower() for value in (spec.get("allowedPlacementClasses") or []) if normalize_text(value)]


def is_reaction_object_placement_allowed(template_id="", placement_class=""):
    return normalize_text(placement_class).lower() in get_reaction_object_allowed_placement_classes(template_id)


def get_reaction_object_connector_policy(template_id="", placement_class=""):
    normalized_placement_class = normalize_text(placement_class).lower()
    if not is_reaction_object_placement_allowed(template_id, normalized_placement_class):
        return None
    return ((REACTION_OBJECT_REGISTRY.get("placementClasses") or {}).get(normalized_placement_class)) or None


def get_reaction_result_participant_placement_class(participant=None):
    participant = participant or {}
    side = normalize_text(participant.get("side")).lower()
    if side == "center":
        return "center"
    if side == "product":
        return "product"
    return "reactant"


def normalize_anchor_instance_index(value=None):
    if value is None or value == "":
        return None
    return max(0, to_int(value))


def build_registry_validation_diagnostics(participants=None, operators=None):
    diagnostics = []
    for participant in participants or []:
        template_id = normalize_text(participant.get("templateId"))
        placement_class = get_reaction_result_participant_placement_class(participant)
        if template_id and not is_reaction_object_placement_allowed(template_id, placement_class):
            diagnostics.append(
                {
                    "code": "registry-placement-invalid",
                    "severity": "error",
                    "message": (
                        f"Result participant {normalize_text(participant.get('id')) or '(missing id)'} "
                        f"uses placement {placement_class} for {template_id}, which is not allowed by the canonical registry."
                    ),
                    "path": "participants",
                }
            )
    for operator in operators or []:
        template_id = normalize_text(operator.get("type"))
        if template_id and not is_reaction_object_placement_allowed(template_id, "operator"):
            diagnostics.append(
                {
                    "code": "registry-operator-placement-invalid",
                    "severity": "error",
                    "message": (
                        f"Result operator {normalize_text(operator.get('id')) or '(missing id)'} "
                        f"uses type {template_id}, which is not allowed in operator placement by the canonical registry."
                    ),
                    "path": "operators",
                }
            )
    return diagnostics


def build_connection_policy_validation_diagnostics(
    mappings=None,
    participant_placements=None,
    operator_placements=None,
):
    diagnostics = []
    policy_id = normalize_text(REACTION_CONNECTION_POLICY.get("policyId")) or "reaction-forward-lane-policy/v1"
    participant_placement_by_id = {}
    participant_lane_by_id = {}
    for placement in participant_placements or []:
        participant_id = normalize_text(placement.get("participantId"))
        placement_class = normalize_text(placement.get("placementClass")).lower()
        lane_numbers = get_reaction_placement_lane_numbers(placement_class)
        lane_number = lane_numbers[0] if lane_numbers else 0
        if participant_id and placement_class:
            participant_placement_by_id[participant_id] = placement_class
            participant_lane_by_id[participant_id] = lane_number

    operator_lane_by_id = {}
    for placement in operator_placements or []:
        operator_id = normalize_text(placement.get("operatorId"))
        if operator_id:
            operator_lane_by_id[operator_id] = get_reaction_operator_lane_number(placement.get("lane"))

    def classify_endpoint(endpoint=None):
        endpoint = endpoint or {}
        participant_id = normalize_text(endpoint.get("participantId"))
        role = normalize_text(endpoint.get("role")).lower()
        if participant_id in operator_lane_by_id:
            return {
                "placementClass": "operator",
                "role": role,
                "lane": operator_lane_by_id[participant_id],
            }
        placement_class = participant_placement_by_id.get(participant_id)
        if not placement_class:
            if role == "product":
                placement_class = "product"
            elif role == "center":
                placement_class = "center"
            else:
                placement_class = "reactant"
        lane_number = participant_lane_by_id.get(participant_id)
        if lane_number is None:
            lane_numbers = get_reaction_placement_lane_numbers(placement_class)
            lane_number = lane_numbers[0] if lane_numbers else 0
        return {
            "placementClass": placement_class,
            "role": role,
            "lane": lane_number,
        }

    for mapping in mappings or []:
        source_endpoint = classify_endpoint(mapping.get("from"))
        target_endpoint = classify_endpoint(mapping.get("to"))
        if is_reaction_connection_allowed(
            source_endpoint["placementClass"],
            source_endpoint["role"],
            source_endpoint["lane"],
            target_endpoint["placementClass"],
            target_endpoint["role"],
            target_endpoint["lane"],
        ):
            continue
        diagnostics.append(
            {
                "code": "registry-connection-policy-invalid",
                "severity": "error",
                "message": (
                    f"Result mapping {normalize_text(mapping.get('id')) or '(missing id)'} routes "
                    f"{source_endpoint['placementClass']}/{source_endpoint['role']}/{source_endpoint['lane']} -> "
                    f"{target_endpoint['placementClass']}/{target_endpoint['role']}/{target_endpoint['lane']}, "
                    f"which violates {policy_id}."
                ),
                "path": "mappings",
            }
        )
    return diagnostics


def build_connector_completeness_validation_diagnostics(
    participants=None,
    operators=None,
    mappings=None,
    participant_placements=None,
):
    diagnostics = []
    participant_placement_by_id = {}
    for placement in participant_placements or []:
        participant_id = normalize_text(placement.get("participantId"))
        placement_class = normalize_text(placement.get("placementClass")).lower()
        if participant_id and placement_class:
            participant_placement_by_id[participant_id] = placement_class

    def infer_participant_placement_class(participant=None):
        participant = participant or {}
        participant_id = normalize_text(participant.get("id"))
        explicit_placement_class = participant_placement_by_id.get(participant_id)
        if explicit_placement_class:
            return explicit_placement_class
        side = normalize_text(participant.get("side")).lower()
        if side == "center":
            return "center"
        if side == "product":
            return "product"
        return "reactant"

    def count_endpoint_connections(participant_id="", role="", endpoint_key="from"):
        normalized_participant_id = normalize_text(participant_id)
        normalized_role = normalize_text(role).lower()
        if not (normalized_participant_id and normalized_role):
            return 0
        total = 0
        for mapping in mappings or []:
            endpoint = (mapping or {}).get(endpoint_key) or {}
            if (
                normalize_text(endpoint.get("participantId")) == normalized_participant_id
                and normalize_text(endpoint.get("role")).lower() == normalized_role
            ):
                total += 1
        return total

    for participant in participants or []:
        participant_id = normalize_text(participant.get("id"))
        template_id = normalize_text(participant.get("templateId"))
        placement_class = infer_participant_placement_class(participant)
        connector_policy = get_reaction_object_connector_policy(template_id, placement_class) or {}
        if not participant_id or not connector_policy:
            continue
        input_role = normalize_text(connector_policy.get("inputRole")).lower()
        output_role = normalize_text(connector_policy.get("outputRole")).lower()
        if input_role and count_endpoint_connections(participant_id, input_role, "to") < 1:
            diagnostics.append(
                {
                    "code": "connector-required-open",
                    "severity": "error",
                    "message": (
                        f"Result participant {participant_id} leaves required {input_role} input open "
                        f"in {placement_class} placement."
                    ),
                    "path": "participants",
                }
            )
        if output_role and count_endpoint_connections(participant_id, output_role, "from") < 1:
            diagnostics.append(
                {
                    "code": "connector-required-open",
                    "severity": "error",
                    "message": (
                        f"Result participant {participant_id} leaves required {output_role} output open "
                        f"in {placement_class} placement."
                    ),
                    "path": "participants",
                }
            )

    for operator in operators or []:
        operator_id = normalize_text(operator.get("id"))
        if not operator_id:
            continue
        if count_endpoint_connections(operator_id, "operator-input", "to") < 1:
            diagnostics.append(
                {
                    "code": "connector-required-open",
                    "severity": "error",
                    "message": f"Result operator {operator_id} leaves required operator-input open.",
                    "path": "operators",
                }
            )
        if count_endpoint_connections(operator_id, "operator-output", "from") < 1:
            diagnostics.append(
                {
                    "code": "connector-required-open",
                    "severity": "error",
                    "message": f"Result operator {operator_id} leaves required operator-output open.",
                    "path": "operators",
                }
            )
    return diagnostics


def result_has_structural_validation_errors(result=None):
    return any(
        normalize_text((diagnostic or {}).get("severity")).lower() == "error"
        for diagnostic in (result or {}).get("diagnostics", [])
    )


def normalize_inventory(inventory=None):
    inventory = inventory or {}
    return {
        "electrinoCount": max(
            0, to_int(inventory.get("electrinoCount", inventory.get("electrino", 0)))
        ),
        "positrinoCount": max(
            0, to_int(inventory.get("positrinoCount", inventory.get("positrino", 0)))
        ),
    }


def inventories_equal(left=None, right=None):
    left_counts = normalize_inventory(left)
    right_counts = normalize_inventory(right)
    return left_counts == right_counts


def add_inventory(left=None, right=None):
    left_counts = normalize_inventory(left)
    right_counts = normalize_inventory(right)
    return {
        "electrinoCount": left_counts["electrinoCount"] + right_counts["electrinoCount"],
        "positrinoCount": left_counts["positrinoCount"] + right_counts["positrinoCount"],
    }


def get_inventory_flags(entity=None):
    inventory = (entity or {}).get("inventory") or {}
    flags = inventory.get("flags") or []
    return [normalize_text(flag) for flag in flags if normalize_text(flag)]


def get_pdg_flag_value(entity=None, prefix=""):
    normalized_prefix = normalize_text(prefix)
    if not normalized_prefix:
        return ""
    for flag in get_inventory_flags(entity):
        if flag.startswith(normalized_prefix):
            return normalize_text(flag[len(normalized_prefix) :])
    return ""


def get_effective_pdg_name(entity=None):
    pdg_name = get_pdg_flag_value(entity, "pdg-name:")
    if pdg_name:
        return pdg_name
    return get_pdg_flag_value(entity, "pdg-id:")


def get_participant_root_or_self(participant=None):
    return get_root_node(participant) or (participant or {})


def canonical_template_id(template_id=""):
    normalized_template_id = normalize_text(template_id).lower()
    if normalized_template_id in {"upi0", "dpi0"}:
        return "pi0"
    return normalized_template_id


def get_effective_template_id(entity=None):
    return canonical_template_id((entity or {}).get("templateId"))


def get_generation_flag_value(entity=None):
    return get_pdg_flag_value(entity, "generation:")


def get_effective_polarity(entity=None, template_id=""):
    normalized_template_id = canonical_template_id(template_id)
    normalized_polarity = normalize_text((entity or {}).get("polarity")).lower()
    if reaction_object_supports_polarity(normalized_template_id):
        return normalized_polarity
    return ""


def build_participant_signature_counter(participants=None):
    counter = Counter()
    for participant in participants or []:
        root_entity = get_root_node(participant) or {}
        entity = root_entity or (participant or {})
        template_id = get_effective_template_id(entity) or get_effective_template_id(participant)
        signature = (
            template_id,
            get_effective_polarity(entity if root_entity else participant, template_id)
            or get_effective_polarity(participant, template_id),
            get_generation_flag_value(entity) or get_generation_flag_value(participant),
        )
        if signature[0]:
            counter[signature] += 1
    return counter


def count_signatures(counter=None, template_id=None, polarity=None, generation=None):
    counter = counter or Counter()
    normalized_template_id = canonical_template_id(template_id) if template_id is not None else None
    total = 0
    for (entry_template_id, entry_polarity, entry_generation), count in counter.items():
        if normalized_template_id is not None and entry_template_id != normalized_template_id:
            continue
        if polarity is not None and entry_polarity != polarity:
            continue
        if generation is not None and entry_generation != generation:
            continue
        total += count
    return total


STANDALONE_PRIMITIVE_ASSOCIATE_REQUIREMENTS = {
    ("electron", "pro"): {
        "corePolarity": "pro",
        "freeInventory": {"electrinoCount": 6, "positrinoCount": 0},
    },
    ("electron", "anti"): {
        "corePolarity": "anti",
        "freeInventory": {"electrinoCount": 0, "positrinoCount": 6},
    },
    ("neutrino", "pro"): {
        "corePolarity": "pro",
        "freeInventory": {"electrinoCount": 3, "positrinoCount": 3},
    },
    ("neutrino", "anti"): {
        "corePolarity": "anti",
        "freeInventory": {"electrinoCount": 3, "positrinoCount": 3},
    },
    ("down_quark", "pro"): {
        "corePolarity": "pro",
        "freeInventory": {"electrinoCount": 4, "positrinoCount": 2},
    },
    ("down_quark", "anti"): {
        "corePolarity": "anti",
        "freeInventory": {"electrinoCount": 2, "positrinoCount": 4},
    },
    ("up_quark", "pro"): {
        "corePolarity": "pro",
        "freeInventory": {"electrinoCount": 1, "positrinoCount": 5},
    },
    ("up_quark", "anti"): {
        "corePolarity": "anti",
        "freeInventory": {"electrinoCount": 5, "positrinoCount": 1},
    },
}


GENERIC_WEAK_CHANNEL_PROFILES = (
    {
        "key": "weak-baryon-beta-decay",
        "sourceSignatures": Counter({("neutron", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "", ""): 1,
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-baryon-beta-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-baryon-beta-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-lepton-decay",
        "sourceSignatures": Counter({("electron", "pro", "2"): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-lepton-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-lepton-decay-radiative",
            },
            {
                "key": "pair",
                "productSignatures": Counter(
                    {
                        ("electron", "pro", "1"): 1,
                        ("electron", "anti", "1"): 1,
                    }
                ),
                "ruleFamily": "weak-lepton-decay-pair",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-lepton-radiative-conversion",
        "sourceSignatures": Counter({("electron", "pro", "2"): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "1"): 1,
                ("photon", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-lepton-radiative-conversion",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-lepton-flavor-conversion",
        "sourceSignatures": Counter({("electron", "pro", "2"): 1}),
        "requiredProductSignatures": Counter({("electron", "pro", "1"): 1}),
        "optionalProductVariants": (
            {
                "key": "flavor-swap",
                "productSignatures": Counter(
                    {
                        ("neutrino", "pro", "1"): 1,
                        ("neutrino", "anti", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-lepton-flavor-swap",
            },
            {
                "key": "trilepton",
                "productSignatures": Counter(
                    {
                        ("electron", "pro", "1"): 1,
                        ("electron", "anti", "1"): 1,
                    }
                ),
                "ruleFamily": "weak-lepton-trilepton-conversion",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-pion-decay",
        "sourceSignatures": Counter({("pi_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-pion-electron-decay",
        "sourceSignatures": Counter({("pi_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-pion-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-pion-decay-conjugate",
        "sourceSignatures": Counter({("pi_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "2"): 1,
                ("neutrino", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-pion-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-pion-electron-decay-conjugate",
        "sourceSignatures": Counter({("pi_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-pion-electron-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-decay-radiative",
            },
            {
                "key": "electron-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "1"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-kaon-decay-electron-pair",
            },
            {
                "key": "muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-kaon-decay-muon-pair",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-electron-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay-radiative",
            },
            {
                "key": "electron-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "1"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay-electron-pair",
            },
            {
                "key": "muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay-muon-pair",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-muon-electron-neutrino-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-muon-electron-neutrino-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-muon-anti-electron-neutrino-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-muon-anti-electron-neutrino-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-decay-conjugate",
        "sourceSignatures": Counter({("k_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "2"): 1,
                ("neutrino", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-electron-decay-conjugate",
        "sourceSignatures": Counter({("k_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-electron-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-muon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-muon-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-muon-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-electron-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-electron-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-electron-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-electron-antineutrino-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-electron-antineutrino-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-muon-decay-conjugate",
        "sourceSignatures": Counter({("k_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "pro", "2"): 1,
                ("neutrino", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-muon-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-muon-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-electron-decay-conjugate",
        "sourceSignatures": Counter({("k_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-electron-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-electron-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-pion-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-three-pion-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-three-pion-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-three-pion-radiative-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-pair-electron-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-pair-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-double-positive-pion-electron-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-double-positive-pion-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-pair-muon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-pair-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-double-positive-pion-muon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("electron", "pro", "2"): 1,
                ("neutrino", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-double-positive-pion-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-neutral-pion-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-neutral-pion-pair-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-pion-neutral-pion-pair-radiative-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-photon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("photon", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "one-photon",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-photon-decay",
            },
            {
                "key": "two-photon",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-pion-two-photon-decay",
            },
            {
                "key": "three-photon",
                "productSignatures": Counter({("photon", "", ""): 2}),
                "ruleFamily": "weak-meson-charged-kaon-pion-three-photon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-electron-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-electron-pair-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-pion-electron-pair-decay-radiative",
            },
            {
                "key": "double-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "1"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-kaon-pion-double-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-opposite-sign-mixed-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "pro", "2"): 1,
                ("electron", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-opposite-sign-mixed-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-opposite-sign-mixed-pair-decay-conjugate",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-opposite-sign-mixed-pair-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-muon-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-same-sign-electron-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "1"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-same-sign-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-same-sign-mixed-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-same-sign-mixed-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-same-sign-muon-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-same-sign-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-neutral-pion-electron-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-neutral-pion-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-neutral-pion-electron-muon-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-neutral-pion-electron-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-neutral-pion-muon-electron-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-neutral-pion-muon-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-pion-same-sign-electron-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "1"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-pion-same-sign-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-pion-same-sign-mixed-pair-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-pion-same-sign-mixed-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-pair-electron-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 2,
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-pair-electron-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-pair-electron-radiative-decay",
            },
            {
                "key": "triple-neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-triple-neutral-pion-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-neutral-pion-pair-muon-decay",
        "sourceSignatures": Counter({("k_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 2,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-neutral-pion-pair-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-kaon-pion-decay-conjugate",
        "sourceSignatures": Counter({("k_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-kaon-pion-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-kaon-pion-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-electron-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-electron-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-electron-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-muon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-muon-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-muon-decay-radiative",
            },
            {
                "key": "muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-b-muon-decay-muon-pair",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-electron-decay-conjugate",
        "sourceSignatures": Counter({("b_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "1"): 1,
                ("neutrino", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-electron-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-electron-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-muon-decay-conjugate",
        "sourceSignatures": Counter({("b_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "pro", "2"): 1,
                ("neutrino", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-muon-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-muon-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-three-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-three-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-neutral-pion-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi0", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-neutral-pion-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-double-positive-pion-neutral-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("pi_minus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-double-positive-pion-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-triple-positive-pion-double-negative-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 3,
                ("pi_minus", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-triple-positive-pion-double-negative-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-triple-positive-pion-double-negative-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-pion-electron-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-pion-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-electron-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-electron-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-muon-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "pro", "1"): 1,
                ("electron", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-muon-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-pion-muon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-pion-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-baryon-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("proton", "anti", ""): 1,
                ("pi_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-baryon-pion-decay",
            },
            {
                "key": "triple-pion",
                "productSignatures": Counter(
                    {
                        ("pi_plus", "", ""): 1,
                        ("pi_minus", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-b-baryon-triple-pion-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-baryon-pion-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-baryon-kaon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("proton", "anti", ""): 1,
                ("k_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-baryon-kaon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-baryon-electron-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("proton", "anti", ""): 1,
                ("electron", "anti", "1"): 1,
                ("neutrino", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-baryon-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-baryon-muon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("proton", "anti", ""): 1,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-baryon-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-baryon-anti-neutron-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("neutron", "anti", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-baryon-anti-neutron-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-three-body-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-three-body-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-kaon-three-body-decay-radiative",
            },
            {
                "key": "muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-b-kaon-three-body-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-conjugate-three-body-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_minus", "", ""): 1,
                ("pi_plus", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-conjugate-three-body-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pion-neutral-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("pi0", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pion-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pair-positive-kaon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 2,
                ("k_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pair-positive-kaon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pair-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("k_minus", "", ""): 1,
                ("pi_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pair-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pair-conjugate-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 2,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pair-conjugate-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-strange-neutral-kaon-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("sk0", "", ""): 1,
                ("k_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-strange-neutral-kaon-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-strange-neutral-kaon-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-kaon-kaon-pair-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("k_plus", "", ""): 1,
                ("k_minus", "", ""): 1,
                ("pi_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-kaon-pair-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-kaon-kaon-conjugate-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("k_plus", "", ""): 2,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-kaon-conjugate-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-same-sign-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "1"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-same-sign-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-same-sign-mixed-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-same-sign-mixed-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-same-sign-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-same-sign-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-electron-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-electron-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-muon-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("electron", "pro", "1"): 1,
                ("electron", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-muon-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-same-sign-electron-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_minus", "", ""): 1,
                ("electron", "anti", "1"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-same-sign-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-same-sign-mixed-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_minus", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-same-sign-mixed-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-same-sign-muon-pair-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_minus", "", ""): 1,
                ("electron", "anti", "2"): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-same-sign-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-kaon-pion-decay",
        "sourceSignatures": Counter({("b_plus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("pi_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-pion-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-pion-neutral-pion-decay",
            },
            {
                "key": "neutral-pion-radiative",
                "productSignatures": Counter(
                    {
                        ("pi0", "", ""): 1,
                        ("photon", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-pion-neutral-pion-radiative-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-electron-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-baryon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("proton", "anti", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-neutral-pion-decay",
            },
            {
                "key": "charged-pion-pair",
                "productSignatures": Counter(
                    {
                        ("pi_plus", "", ""): 1,
                        ("pi_minus", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-charged-pion-pair-decay",
            },
            {
                "key": "neutral-kaon",
                "productSignatures": Counter({("dk0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-neutral-kaon-decay",
            },
            {
                "key": "charged-kaon-pion",
                "productSignatures": Counter(
                    {
                        ("k_plus", "", ""): 1,
                        ("pi_minus", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-charged-kaon-pion-decay",
            },
            {
                "key": "charged-kaon-pair",
                "productSignatures": Counter(
                    {
                        ("k_plus", "", ""): 1,
                        ("k_minus", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-baryon-pair-charged-kaon-pair-decay",
            },
            {
                "key": "double-baryon-pair",
                "productSignatures": Counter(
                    {
                        ("proton", "pro", ""): 1,
                        ("proton", "anti", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-double-baryon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-baryon-electron-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-baryon-electron-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-baryon-muon-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "pro", ""): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-baryon-muon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-pair-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-pion-pair-neutral-pion-decay",
            },
            {
                "key": "muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-pion-pair-muon-pair-decay",
            },
            {
                "key": "double-pair",
                "productSignatures": Counter(
                    {
                        ("pi_plus", "", ""): 1,
                        ("pi_minus", "", ""): 1,
                        ("pi_plus", "", ""): 1,
                        ("pi_minus", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-double-pion-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-double-positive-double-negative-neutral-pion-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 2,
                ("pi_minus", "", ""): 2,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-double-positive-double-negative-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-triple-pion-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 3,
                ("pi_minus", "", ""): 3,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-triple-pion-pair-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-triple-pion-pair-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-two-photon-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter({("photon", "", ""): 2}),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-two-photon-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-pion-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter({("pi0", "", ""): 2}),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-pion-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-electron-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-electron-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-muon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-neutral-pion-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-kaon-conjugate-pion-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("k_minus", "", ""): 1,
                ("pi_plus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-kaon-conjugate-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-kaon-pion-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-kaon-pion-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-kaon-pion-neutral-pion-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-kaon-pion-radiative-decay",
            },
            {
                "key": "neutral-pion-radiative",
                "productSignatures": Counter(
                    {
                        ("pi0", "", ""): 1,
                        ("photon", "", ""): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-kaon-pion-neutral-pion-radiative-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-kaon-pion-three-body-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-kaon-pion-three-body-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-kaon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_plus", "", ""): 1,
                ("k_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-kaon-pair-decay",
            },
            {
                "key": "neutral-pion",
                "productSignatures": Counter({("pi0", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-kaon-pair-neutral-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-pair-neutral-pion-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
                ("pi0", "", ""): 2,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-pair-neutral-pion-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("sk0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-three-body-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("pi_plus", "", ""): 1,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-three-body-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-three-body-radiative-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-neutral-kaon-kaon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("dk0", "", ""): 1,
                ("k_plus", "", ""): 1,
                ("k_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-neutral-kaon-kaon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-semileptonic-pion-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("neutrino", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-semileptonic-pion-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-muon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-electron-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-electron-pair-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-electron-pair-decay-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-muon-pair-decay",
        "sourceSignatures": Counter({("db0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-muon-pair-decay",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-muon-pair-decay-radiative",
            },
            {
                "key": "double-muon-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "2"): 1,
                    }
                ),
                "ruleFamily": "weak-meson-neutral-b-double-muon-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-electron-pair-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-electron-pair-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-pion-muon-pair-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi0", "", ""): 1,
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-pion-muon-pair-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-electron-pair-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "1"): 1,
                ("electron", "pro", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-electron-pair-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-electron-pair-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-baryon-electron-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "anti", ""): 1,
                ("electron", "anti", "1"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-baryon-electron-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-baryon-muon-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("proton", "anti", ""): 1,
                ("electron", "anti", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-baryon-muon-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-neutral-b-muon-pair-decay-conjugate",
        "sourceSignatures": Counter({("bb0", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("electron", "anti", "2"): 1,
                ("electron", "pro", "2"): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-neutral-b-muon-pair-decay-conjugate",
            },
            {
                "key": "radiative",
                "productSignatures": Counter({("photon", "", ""): 1}),
                "ruleFamily": "weak-meson-neutral-b-muon-pair-decay-conjugate-radiative",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-pion-decay-conjugate",
        "sourceSignatures": Counter({("b_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("pi_minus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-pion-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-kaon-pion-decay-conjugate",
        "sourceSignatures": Counter({("b_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("k_minus", "", ""): 1,
                ("pi0", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-kaon-pion-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "weak-meson-charged-b-neutral-kaon-pion-decay-conjugate",
        "sourceSignatures": Counter({("b_minus", "", ""): 1}),
        "requiredProductSignatures": Counter(
            {
                ("sk0", "", ""): 1,
                ("pi_minus", "", ""): 1,
            }
        ),
        "optionalProductVariants": (
            {
                "key": "base",
                "productSignatures": Counter(),
                "ruleFamily": "weak-meson-charged-b-neutral-kaon-pion-decay-conjugate",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
    {
        "key": "meson-neutral-pion-decay",
        "sourceSignatures": Counter({("pi0", "", ""): 1}),
        "requiredProductSignatures": Counter(),
        "optionalProductVariants": (
            {
                "key": "two-photon",
                "productSignatures": Counter({("photon", "", ""): 2}),
                "ruleFamily": "meson-neutral-pion-two-photon-decay",
            },
            {
                "key": "dalitz",
                "productSignatures": Counter(
                    {
                        ("photon", "", ""): 1,
                        ("electron", "anti", "1"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-dalitz-decay",
            },
            {
                "key": "double-dalitz",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "1"): 2,
                        ("electron", "pro", "1"): 2,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-double-dalitz-decay",
            },
            {
                "key": "electron-pair",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "1"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-electron-pair-decay",
            },
            {
                "key": "electron-neutrino-pair",
                "productSignatures": Counter(
                    {
                        ("neutrino", "pro", "1"): 1,
                        ("neutrino", "anti", "1"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-neutrino-pair-decay",
            },
            {
                "key": "muon-neutrino-pair",
                "productSignatures": Counter(
                    {
                        ("neutrino", "pro", "2"): 1,
                        ("neutrino", "anti", "2"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-neutrino-pair-decay",
            },
            {
                "key": "mu-plus-electron-minus",
                "productSignatures": Counter(
                    {
                        ("electron", "anti", "2"): 1,
                        ("electron", "pro", "1"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-flavor-violating-pair-decay",
            },
            {
                "key": "mu-minus-electron-plus",
                "productSignatures": Counter(
                    {
                        ("electron", "pro", "2"): 1,
                        ("electron", "anti", "1"): 1,
                    }
                ),
                "ruleFamily": "meson-neutral-pion-flavor-violating-pair-decay",
            },
        ),
        "implicitCenterPolarity": "pro",
    },
)


def counter_includes(left=None, right=None):
    left = left or Counter()
    right = right or Counter()
    for key, count in right.items():
        if left.get(key, 0) < count:
            return False
    return True


def counter_difference(left=None, right=None):
    left = left or Counter()
    right = right or Counter()
    difference = Counter(left)
    for key, count in right.items():
        remaining = difference.get(key, 0) - count
        if remaining > 0:
            difference[key] = remaining
        elif key in difference:
            del difference[key]
    return difference


def match_generic_proton_channel(source_counter, product_counter):
    baryon_count = count_signatures(product_counter, template_id="proton") + count_signatures(
        product_counter, template_id="neutron"
    )
    if baryon_count > 1:
        return None

    charged_lepton_count = count_signatures(product_counter, template_id="electron")
    photon_count = count_signatures(product_counter, template_id="photon")
    anti_lepton_count = count_signatures(product_counter, template_id="electron", polarity="anti")
    pro_lepton_count = count_signatures(product_counter, template_id="electron", polarity="pro")
    proton_product_count = count_signatures(product_counter, template_id="proton")
    neutron_product_count = count_signatures(product_counter, template_id="neutron")
    neutrino_pro_count = count_signatures(product_counter, template_id="neutrino", polarity="pro")
    neutrino_anti_count = count_signatures(product_counter, template_id="neutrino", polarity="anti")
    source_polarity = (
        "anti" if count_signatures(source_counter, template_id="proton", polarity="anti") == 1 else "pro"
    )
    product_count = sum(product_counter.values())

    if proton_product_count == 0 and neutron_product_count == 0:
        if charged_lepton_count == 1 and photon_count == 0 and product_count == 2:
            if (
                source_polarity == "pro"
                and anti_lepton_count == 1
                and pro_lepton_count == 0
                and count_signatures(product_counter, template_id="pi0") == 1
            ):
                return {
                    "key": "weak-proton-neutral-pion-antilepton",
                    "ruleFamily": "weak-baryon-neutral-pion-antilepton-decay",
                    "variantKey": "neutral-pion-antilepton",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "anti"
                and pro_lepton_count == 1
                and anti_lepton_count == 0
                and count_signatures(product_counter, template_id="pi0") == 1
            ):
                return {
                    "key": "weak-antiproton-neutral-pion-lepton",
                    "ruleFamily": "weak-baryon-neutral-pion-lepton-decay-conjugate",
                    "variantKey": "neutral-pion-lepton-conjugate",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "pro"
                and anti_lepton_count == 1
                and pro_lepton_count == 0
                and count_signatures(product_counter, template_id="dk0") == 1
            ):
                return {
                    "key": "weak-proton-neutral-kaon-antilepton",
                    "ruleFamily": "weak-baryon-neutral-kaon-antilepton-decay",
                    "variantKey": "neutral-kaon-antilepton",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "anti"
                and pro_lepton_count == 1
                and anti_lepton_count == 0
                and count_signatures(product_counter, template_id="sk0") == 1
            ):
                return {
                    "key": "weak-antiproton-neutral-kaon-lepton",
                    "ruleFamily": "weak-baryon-neutral-kaon-lepton-decay-conjugate",
                    "variantKey": "neutral-kaon-lepton-conjugate",
                    "implicitCenterPolarity": "pro",
                }
            return None
        if (
            charged_lepton_count == 0
            and photon_count == 0
            and neutrino_pro_count + neutrino_anti_count == 1
            and product_count == 2
        ):
            if (
                source_polarity == "pro"
                and neutrino_anti_count == 1
                and neutrino_pro_count == 0
                and count_signatures(product_counter, template_id="pi_plus") == 1
            ):
                return {
                    "key": "weak-proton-charged-pion-antineutrino",
                    "ruleFamily": "weak-baryon-charged-pion-antineutrino-decay",
                    "variantKey": "charged-pion-antineutrino",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "anti"
                and neutrino_pro_count == 1
                and neutrino_anti_count == 0
                and count_signatures(product_counter, template_id="pi_minus") == 1
            ):
                return {
                    "key": "weak-antiproton-charged-pion-neutrino",
                    "ruleFamily": "weak-baryon-charged-pion-neutrino-decay-conjugate",
                    "variantKey": "charged-pion-neutrino-conjugate",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "pro"
                and neutrino_anti_count == 1
                and neutrino_pro_count == 0
                and count_signatures(product_counter, template_id="k_plus") == 1
            ):
                return {
                    "key": "weak-proton-charged-kaon-antineutrino",
                    "ruleFamily": "weak-baryon-charged-kaon-antineutrino-decay",
                    "variantKey": "charged-kaon-antineutrino",
                    "implicitCenterPolarity": "pro",
                }
            if (
                source_polarity == "anti"
                and neutrino_pro_count == 1
                and neutrino_anti_count == 0
                and count_signatures(product_counter, template_id="k_minus") == 1
            ):
                return {
                    "key": "weak-antiproton-charged-kaon-neutrino",
                    "ruleFamily": "weak-baryon-charged-kaon-neutrino-decay-conjugate",
                    "variantKey": "charged-kaon-neutrino-conjugate",
                    "implicitCenterPolarity": "pro",
                }
            return None
        if charged_lepton_count == 3 and anti_lepton_count == 2 and pro_lepton_count == 1 and photon_count == 0:
            return {
                "key": "weak-proton-trilepton",
                "ruleFamily": "weak-baryon-trilepton-conversion",
                "variantKey": "trilepton",
                "implicitCenterPolarity": "pro",
            }
        if charged_lepton_count == 1 and photon_count in (1, 2):
            return {
                "key": "weak-proton-radiative",
                "ruleFamily": (
                    "weak-baryon-radiative-conversion"
                    if photon_count == 1
                    else "weak-baryon-radiative-double-conversion"
                ),
                "variantKey": "radiative" if photon_count == 1 else "radiative-double",
                "implicitCenterPolarity": "pro",
            }
        return None

    if proton_product_count == 1 and neutron_product_count == 0:
        if charged_lepton_count == 2 and anti_lepton_count == 2 and pro_lepton_count == 0 and photon_count == 0:
            return {
                "key": "weak-proton-carry",
                "ruleFamily": "weak-baryon-carry-conversion",
                "variantKey": "carry",
                "implicitCenterPolarity": "pro",
            }
        return None

    if neutron_product_count == 1 and proton_product_count == 0:
        if (
            charged_lepton_count == 0
            and photon_count == 0
            and neutrino_pro_count == 1
            and neutrino_anti_count == 1
        ):
            return {
                "key": "weak-proton-neutron-conversion",
                "ruleFamily": "weak-baryon-neutrino-pair-conversion",
                "variantKey": "neutrino-pair",
                "implicitCenterPolarity": "pro",
            }
        return None

    return None


def match_generic_neutron_channel(product_counter):
    proton_product_count = count_signatures(product_counter, template_id="proton")
    neutron_product_count = count_signatures(product_counter, template_id="neutron")
    photon_count = count_signatures(product_counter, template_id="photon")
    charged_lepton_count = count_signatures(product_counter, template_id="electron")
    neutrino_pro_count = count_signatures(product_counter, template_id="neutrino", polarity="pro")
    neutrino_anti_count = count_signatures(product_counter, template_id="neutrino", polarity="anti")

    if proton_product_count != 1 or neutron_product_count != 0:
        return None
    if charged_lepton_count == 1 and neutrino_anti_count == 1 and neutrino_pro_count == 0 and photon_count in (0, 1):
        return {
            "key": "weak-baryon-beta-decay",
            "ruleFamily": "weak-baryon-beta-decay" if photon_count == 0 else "weak-baryon-beta-decay-radiative",
            "variantKey": "base" if photon_count == 0 else "radiative",
            "implicitCenterPolarity": "pro",
        }
    if charged_lepton_count == 0 and neutrino_pro_count == 1 and neutrino_anti_count == 1 and photon_count == 0:
        return {
            "key": "weak-baryon-neutrino-pair",
            "ruleFamily": "weak-baryon-neutrino-pair",
            "variantKey": "neutrino-pair",
            "implicitCenterPolarity": "pro",
        }
    return None


def match_generic_weak_channel(source_participants=None, product_participants=None):
    source_counter = build_participant_signature_counter(source_participants)
    product_counter = build_participant_signature_counter(product_participants)
    for profile in GENERIC_WEAK_CHANNEL_PROFILES:
        if source_counter != profile["sourceSignatures"]:
            continue
        if not counter_includes(product_counter, profile["requiredProductSignatures"]):
            continue
        remainder = counter_difference(product_counter, profile["requiredProductSignatures"])
        for variant in profile["optionalProductVariants"]:
            if remainder == variant["productSignatures"]:
                return {
                    "key": profile["key"],
                    "ruleFamily": variant["ruleFamily"],
                    "variantKey": variant["key"],
                    "implicitCenterPolarity": profile["implicitCenterPolarity"],
                }
    if count_signatures(source_counter, template_id="proton") == 1 and sum(source_counter.values()) == 1:
        return match_generic_proton_channel(source_counter, product_counter)
    if count_signatures(source_counter, template_id="neutron") == 1 and sum(source_counter.values()) == 1:
        return match_generic_neutron_channel(product_counter)
    return None


def build_generated_weak_center(step_id, source_participant, polarity="pro"):
    source_participant_id = normalize_text((source_participant or {}).get("id"))
    center_id = f"weak_center:{step_id}"
    center_root_id = f"{center_id}/root"
    return {
        "id": center_id,
        "origin": "solve-generated-intermediate",
        "side": "center",
        "templateId": "noether_core",
        "label": "Pro Noether core" if polarity != "anti" else "Anti Noether core",
        "family": "noether-core",
        "polarity": "anti" if polarity == "anti" else "pro",
        "isComposite": False,
        "inventory": {
            "electrinoCount": 3,
            "positrinoCount": 3,
        },
        "rootNodeId": center_root_id,
        "sourceParticipantId": source_participant_id,
        "sourceStepId": step_id,
        "tags": ["solve-generated", "implicit-weak-center", "noether-core-provenance"],
        "nodes": [
            {
                "id": center_root_id,
                "templateId": "noether_core",
                "label": "Pro Noether core" if polarity != "anti" else "Anti Noether core",
                "family": "noether-core",
                "polarity": "anti" if polarity == "anti" else "pro",
                "isComposite": False,
                "inventory": {
                    "electrinoCount": 3,
                    "positrinoCount": 3,
                },
            }
        ],
    }


def build_generated_participant(
    participant_id,
    template_id,
    label,
    family,
    inventory,
    *,
    side="center",
    polarity="",
    is_composite=False,
    origin="solve-generated-intermediate",
    source_participant_id="",
    source_step_id="",
    root_node_id="",
    child_nodes=None,
    tags=None,
):
    normalized_participant_id = normalize_text(participant_id)
    normalized_root_node_id = normalize_text(root_node_id) or f"{normalized_participant_id}/root"
    root_node = {
        "id": normalized_root_node_id,
        "templateId": normalize_text(template_id),
        "label": normalize_text(label) or normalize_text(template_id),
        "family": normalize_text(family),
        "isComposite": bool(is_composite),
        "inventory": normalize_inventory(inventory),
    }
    if normalize_text(polarity):
        root_node["polarity"] = normalize_text(polarity)
    participant = {
        "id": normalized_participant_id,
        "origin": normalize_text(origin) or "solve-generated-intermediate",
        "side": normalize_text(side) or "center",
        "templateId": normalize_text(template_id),
        "label": normalize_text(label) or normalize_text(template_id),
        "family": normalize_text(family),
        "isComposite": bool(is_composite),
        "inventory": normalize_inventory(inventory),
        "rootNodeId": normalized_root_node_id,
        "nodes": [root_node],
    }
    if normalize_text(polarity):
        participant["polarity"] = normalize_text(polarity)
    if normalize_text(source_participant_id):
        participant["sourceParticipantId"] = normalize_text(source_participant_id)
    if normalize_text(source_step_id):
        participant["sourceStepId"] = normalize_text(source_step_id)
    normalized_tags = [normalize_text(tag) for tag in (tags or []) if normalize_text(tag)]
    if normalized_tags:
        participant["tags"] = normalized_tags
        participant["nodes"][0]["tags"] = list(normalized_tags)
    for node in child_nodes or []:
        participant["nodes"].append(deepcopy(node))
    return participant


def build_generated_noether_core_participant(participant_id, polarity, *, source_participant_id="", source_step_id=""):
    normalized_polarity = "anti" if normalize_text(polarity).lower() == "anti" else "pro"
    return build_generated_participant(
        participant_id=participant_id,
        template_id="noether_core",
        label="Anti Noether core" if normalized_polarity == "anti" else "Pro Noether core",
        family="noether-core",
        polarity=normalized_polarity,
        inventory={"electrinoCount": 3, "positrinoCount": 3},
        side="center",
        is_composite=False,
        source_participant_id=source_participant_id,
        source_step_id=source_step_id,
        tags=["solve-generated", "noether-core-provenance"],
    )


def build_generated_free_architrino_pool(
    participant_id, product_count, *, source_participant_id="", source_step_id=""
):
    pool_inventory = {
        "electrinoCount": max(12, 6 * max(1, to_int(product_count, 1))),
        "positrinoCount": max(12, 6 * max(1, to_int(product_count, 1))),
    }
    return build_generated_participant(
        participant_id=participant_id,
        template_id="free_architrinos",
        label="Free Architrinos",
        family="boson",
        inventory=pool_inventory,
        side="center",
        is_composite=True,
        source_participant_id=source_participant_id,
        source_step_id=source_step_id,
        tags=["solve-generated", "shared-free-architrino-pool"],
    )


def build_generated_noether_quad(
    participant_id, *, source_participant_id="", source_step_id=""
):
    root_id = f"{normalize_text(participant_id)}/root"
    child_nodes = []
    for suffix, polarity in (
        ("core_pro_1", "pro"),
        ("core_anti_1", "anti"),
        ("core_pro_2", "pro"),
        ("core_anti_2", "anti"),
    ):
        child_nodes.append(
            {
                "id": f"{root_id}/{suffix}",
                "parentId": root_id,
                "templateId": "noether_core",
                "label": "Anti Noether core" if polarity == "anti" else "Pro Noether core",
                "family": "noether-core",
                "polarity": polarity,
                "isComposite": False,
                "inventory": {
                    "electrinoCount": 3,
                    "positrinoCount": 3,
                },
            }
        )
    return build_generated_participant(
        participant_id=participant_id,
        template_id="noether_quad",
        label="Noether Quad",
        family="boson",
        inventory={"electrinoCount": 12, "positrinoCount": 12},
        side="reactant",
        is_composite=True,
        source_participant_id=source_participant_id,
        source_step_id=source_step_id,
        root_node_id=root_id,
        child_nodes=child_nodes,
        tags=["solve-generated", "noether-quad-supplement"],
    )


def build_generated_noether_pair(
    participant_id, *, source_participant_id="", source_step_id=""
):
    root_id = f"{normalize_text(participant_id)}/root"
    child_nodes = []
    for suffix, polarity in (("core_pro_1", "pro"), ("core_anti_1", "anti")):
        child_nodes.append(
            {
                "id": f"{root_id}/{suffix}",
                "parentId": root_id,
                "templateId": "noether_core",
                "label": "Anti Noether core" if polarity == "anti" else "Pro Noether core",
                "family": "noether-core",
                "polarity": polarity,
                "isComposite": False,
                "inventory": {
                    "electrinoCount": 3,
                    "positrinoCount": 3,
                },
            }
        )
    return build_generated_participant(
        participant_id=participant_id,
        template_id="noether_pair",
        label="Noether Pair",
        family="boson",
        inventory={"electrinoCount": 6, "positrinoCount": 6},
        side="reactant",
        is_composite=True,
        source_participant_id=source_participant_id,
        source_step_id=source_step_id,
        root_node_id=root_id,
        child_nodes=child_nodes,
        tags=["solve-generated", "noether-pair-supplement"],
    )


def build_generated_quark_participant(
    participant_id,
    template_id,
    polarity,
    *,
    label="",
    inventory=None,
    tags=None,
    source_participant_id="",
    source_step_id="",
):
    normalized_template_id = canonical_template_id(template_id)
    normalized_polarity = "anti" if normalize_text(polarity).lower() == "anti" else "pro"
    base_label = "Up Quark" if normalized_template_id == "up_quark" else "Down Quark"
    resolved_label = normalize_text(label) or (
        f"Anti {base_label}" if normalized_polarity == "anti" else base_label
    )
    return build_generated_participant(
        participant_id=participant_id,
        template_id=normalized_template_id,
        label=resolved_label,
        family="quark",
        polarity=normalized_polarity,
        inventory=inventory or {"electrinoCount": 2, "positrinoCount": 2},
        side="center",
        is_composite=True,
        source_participant_id=source_participant_id,
        source_step_id=source_step_id,
        tags=["solve-generated", "meson-constituent"] + list(tags or []),
    )


def get_meson_quark_constituents(source_participant=None):
    source_participant = source_participant or {}
    raw_template_id = normalize_text(source_participant.get("templateId")).lower()
    normalized_template_id = canonical_template_id(raw_template_id)
    if raw_template_id == "pi_plus":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti"},
        )
    if raw_template_id == "pi_minus":
        return (
            {"templateId": "down_quark", "polarity": "pro"},
            {"templateId": "up_quark", "polarity": "anti"},
        )
    if raw_template_id == "dpi0":
        return (
            {"templateId": "down_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti"},
        )
    if raw_template_id == "upi0" or normalized_template_id == "pi0":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "up_quark", "polarity": "anti"},
        )
    if raw_template_id == "k_plus":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti", "label": "Strange Quark"},
        )
    if raw_template_id == "k_minus":
        return (
            {"templateId": "down_quark", "polarity": "pro", "label": "Strange Quark"},
            {"templateId": "up_quark", "polarity": "anti"},
        )
    if raw_template_id == "dk0":
        return (
            {"templateId": "down_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti", "label": "Strange Quark"},
        )
    if raw_template_id == "sk0":
        return (
            {"templateId": "down_quark", "polarity": "pro", "label": "Strange Quark"},
            {"templateId": "down_quark", "polarity": "anti"},
        )
    if raw_template_id == "b_plus":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti", "label": "Bottom Quark"},
        )
    if raw_template_id == "b_minus":
        return (
            {"templateId": "down_quark", "polarity": "pro", "label": "Bottom Quark"},
            {"templateId": "up_quark", "polarity": "anti"},
        )
    if raw_template_id == "db0":
        return (
            {"templateId": "down_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "anti", "label": "Bottom Quark"},
        )
    if raw_template_id == "bb0":
        return (
            {"templateId": "down_quark", "polarity": "pro", "label": "Bottom Quark"},
            {"templateId": "down_quark", "polarity": "anti"},
        )
    return ()


def get_meson_constituent_specs(source_participant=None):
    child_nodes = [node for node in get_child_nodes(source_participant) if get_effective_template_id(node) in {"up_quark", "down_quark"}]
    if child_nodes:
        return tuple(
            {
                "templateId": get_effective_template_id(node),
                "polarity": get_effective_polarity(node, get_effective_template_id(node)),
                "label": normalize_text(node.get("label")),
                "inventory": node.get("inventory"),
                "tags": list(node.get("tags") or []),
            }
            for node in child_nodes
        )
    return get_meson_quark_constituents(source_participant)


def get_baryon_constituent_specs(source_participant=None):
    child_nodes = [
        node for node in get_child_nodes(source_participant) if get_effective_template_id(node) in {"up_quark", "down_quark"}
    ]
    if child_nodes:
        return tuple(
            {
                "templateId": get_effective_template_id(node),
                "polarity": get_effective_polarity(node, get_effective_template_id(node)) or "pro",
                "label": normalize_text(node.get("label")),
                "inventory": node.get("inventory"),
                "tags": list(node.get("tags") or []),
            }
            for node in child_nodes
        )
    source_template_id = get_effective_template_id(get_participant_root_or_self(source_participant))
    if source_template_id == "neutron":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "pro"},
        )
    if source_template_id == "proton":
        return (
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "up_quark", "polarity": "pro"},
            {"templateId": "down_quark", "polarity": "pro"},
        )
    return ()


def product_requires_lepton_core(participant=None):
    template_id = get_effective_template_id(get_participant_root_or_self(participant))
    return template_id in {"electron", "neutrino"}


def product_supported_by_lepton_constituent_channel(participant=None):
    template_id = get_effective_template_id(get_participant_root_or_self(participant))
    return template_id in {"electron", "neutrino", "photon"}


def get_core_source_diagnostic_labels(source_kind="", default_label=""):
    normalized_source_kind = normalize_text(source_kind)
    if normalized_source_kind == "source-core":
        return [normalize_text(default_label)] if normalize_text(default_label) else []
    if normalized_source_kind == "meson-core":
        return ["meson-core-provenance"]
    if normalized_source_kind == "noether-pair":
        return ["noether-pair-supplement"]
    if normalized_source_kind == "noether-quad":
        return ["noether-quad-supplement"]
    return []


def get_standalone_constituent_requirements(source_participant=None):
    source_root = get_root_node(source_participant) or (source_participant or {})
    template_id = get_effective_template_id(source_root)
    polarity = get_effective_polarity(source_root, template_id)
    if not template_id or not polarity:
        return None
    requirements = STANDALONE_PRIMITIVE_ASSOCIATE_REQUIREMENTS.get((template_id, polarity))
    if requirements is None:
        return None
    return {
        "templateId": template_id,
        "polarity": polarity,
        "corePolarity": normalize_text(requirements.get("corePolarity")).lower() or polarity,
        "freeInventory": normalize_inventory(requirements.get("freeInventory")),
    }


def build_lepton_constituent_provenance_diagnostic(
    subject_participant=None,
    context_label="Exact lepton closure",
):
    subject_participant = subject_participant or {}
    subject_root = get_root_node(subject_participant) or subject_participant
    subject_label = normalize_text(subject_root.get("label")) or normalize_text(subject_root.get("templateId"))
    requirements = get_standalone_constituent_requirements(subject_participant)
    if not subject_label or requirements is None:
        return None
    core_label = (
        "Anti Noether core"
        if normalize_text(requirements.get("corePolarity")).lower() == "anti"
        else "Pro Noether core"
    )
    return {
        "code": "lepton-constituent-provenance",
        "severity": "info",
        "message": (
            f"{context_label} preserves lepton constituent provenance for {subject_label}: "
            f"{core_label} + Free Architrinos."
        ),
        "path": "steps[0]",
    }


def build_baryon_constituent_provenance_diagnostic(
    subject_participant=None,
    context_label="Exact baryon weak closure",
):
    subject_participant = subject_participant or {}
    subject_root = get_root_node(subject_participant) or subject_participant
    subject_label = normalize_text(subject_root.get("label")) or normalize_text(subject_root.get("templateId"))
    if not subject_label:
        return None
    return {
        "code": "baryon-constituent-provenance",
        "severity": "info",
        "message": (
            f"{context_label} preserves baryon constituent provenance for {subject_label}: "
            "spectator quarks carry into the product baryon while the transforming down quark closes the weak lepton channel."
        ),
        "path": "steps[0]",
    }


def solve_lepton_constituent_provenance_channel(request, source_participants, product_participants, family):
    source_participant = source_participants[0]
    source_id = normalize_text(source_participant.get("id"))
    source_requirements = get_standalone_constituent_requirements(source_participant)
    if source_requirements is None:
        return None

    variant_prefix = f"{family['key']}_{family['variantKey']}"
    ledger_step_id = f"step_{variant_prefix}_lepton_core_pool"
    recruit_step_id = f"step_{variant_prefix}_spacetime_recruit"
    generated_participants = []

    source_core = build_generated_noether_core_participant(
        participant_id=f"center_{variant_prefix}_source_core",
        polarity=source_requirements["corePolarity"],
        source_participant_id=source_id,
        source_step_id=ledger_step_id,
    )
    generated_participants.append(source_core)
    generated_core_ids = [normalize_text(source_core.get("id"))]
    source_core_refs = {"pro": [], "anti": []}
    source_core_refs[source_requirements["corePolarity"]].append(
        {
            "participantId": normalize_text(source_core.get("id")),
            "anchorId": normalize_text(source_core.get("rootNodeId")),
            "sourceKind": "source-core",
        }
    )

    free_pool = build_generated_free_architrino_pool(
        participant_id=f"center_{variant_prefix}_free_architrinos",
        product_count=len(product_participants),
        source_participant_id=source_id,
        source_step_id=ledger_step_id,
    )
    generated_participants.append(free_pool)
    free_pool_id = normalize_text(free_pool.get("id"))
    free_pool_root_id = normalize_text(free_pool.get("rootNodeId"))

    needed_core_counts = {"pro": 0, "anti": 0}
    product_requirements = []
    for product in product_participants:
        product_root = get_root_node(product)
        template_id = get_effective_template_id(product_root or product)
        product_polarity = get_effective_polarity(product_root or product, template_id)
        if not product_root:
            return None
        if template_id in {"electron", "neutrino"} and product_polarity in {"pro", "anti"}:
            needed_core_counts[product_polarity] += 1
            product_requirements.append(
                {
                    "kind": "lepton",
                    "participant": product,
                    "root": product_root,
                    "polarity": product_polarity,
                }
            )
            continue
        if template_id == "photon":
            needed_core_counts["pro"] += 1
            needed_core_counts["anti"] += 1
            product_requirements.append(
                {
                    "kind": "photon",
                    "participant": product,
                    "root": product_root,
                }
            )
            continue
        return None

    deficit_pro = max(0, needed_core_counts["pro"] - len(source_core_refs["pro"]))
    deficit_anti = max(0, needed_core_counts["anti"] - len(source_core_refs["anti"]))
    noether_pair_count = min(deficit_pro, deficit_anti)
    deficit_pro = max(0, deficit_pro - noether_pair_count)
    deficit_anti = max(0, deficit_anti - noether_pair_count)
    noether_pair_core_refs = {"pro": [], "anti": []}
    generated_noether_pair_ids = []
    for pair_index in range(1, noether_pair_count + 1):
        noether_pair = build_generated_noether_pair(
            participant_id=f"center_{variant_prefix}_noether_pair_{pair_index}",
            source_participant_id=source_id,
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_pair)
        noether_pair_id = normalize_text(noether_pair.get("id"))
        generated_noether_pair_ids.append(noether_pair_id)
        for node in get_child_nodes(noether_pair):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity not in {"pro", "anti"}:
                continue
            core_participant = build_generated_noether_core_participant(
                participant_id=f"{noether_pair_id}_{node_polarity}_core",
                polarity=node_polarity,
                source_participant_id=noether_pair_id,
                source_step_id=f"step_{variant_prefix}_noether_pair_{pair_index}",
            )
            generated_participants.append(core_participant)
            noether_pair_core_refs[node_polarity].append(
                {
                    "participantId": normalize_text(core_participant.get("id")),
                    "anchorId": normalize_text(core_participant.get("rootNodeId")),
                    "sourceKind": "noether-pair",
                }
            )

    noether_quad_count = max((deficit_pro + 1) // 2, (deficit_anti + 1) // 2)
    noether_quad_core_refs = {"pro": [], "anti": []}
    generated_noether_quad_ids = []
    for cluster_index in range(1, noether_quad_count + 1):
        noether_quad = build_generated_noether_quad(
            participant_id=f"center_{variant_prefix}_noether_quad_{cluster_index}",
            source_participant_id=source_id,
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_quad)
        noether_quad_id = normalize_text(noether_quad.get("id"))
        generated_noether_quad_ids.append(noether_quad_id)
        for node in get_child_nodes(noether_quad):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity not in {"pro", "anti"}:
                continue
            core_participant = build_generated_noether_core_participant(
                participant_id=f"{noether_quad_id}_{node_polarity}_core_{len(noether_quad_core_refs[node_polarity]) + 1}",
                polarity=node_polarity,
                source_participant_id=noether_quad_id,
                source_step_id=f"step_{variant_prefix}_noether_quad_{cluster_index}",
            )
            generated_participants.append(core_participant)
            noether_quad_core_refs[node_polarity].append(
                {
                    "participantId": normalize_text(core_participant.get("id")),
                    "anchorId": normalize_text(core_participant.get("rootNodeId")),
                    "sourceKind": "noether-quad",
                }
            )

    steps = [
        {
            "stepId": ledger_step_id,
            "kind": "dissociate",
            "ruleFamily": "dissociate-lepton-core-pool",
            "consumedParticipantIds": [source_id],
            "producedParticipantIds": generated_core_ids
            + [free_pool_id],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["lepton-constituent-provenance", "shared-free-architrino-pool"]
            + (["noether-pair-supplement"] if generated_noether_pair_ids else [])
            + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
        }
    ]
    if generated_noether_pair_ids or generated_noether_quad_ids:
        steps.append(
            {
                "stepId": recruit_step_id,
                "kind": "recruit",
                "ruleFamily": "recruit-spacetime-supplement",
                "consumedParticipantIds": [],
                "producedParticipantIds": generated_noether_pair_ids + generated_noether_quad_ids,
                "resolvedTargetIds": [],
                "mappingIds": [],
                "operatorIds": [],
                "diagnosticLabels": (["noether-pair-supplement"] if generated_noether_pair_ids else [])
                + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
            }
        )
    mappings = []
    operators = []
    operator_placements = []
    available_core_refs = {
        "pro": list(source_core_refs["pro"]),
        "anti": list(source_core_refs["anti"]),
    }
    available_noether_pair_refs = {
        "pro": list(noether_pair_core_refs["pro"]),
        "anti": list(noether_pair_core_refs["anti"]),
    }
    available_noether_quad_refs = {
        "pro": list(noether_quad_core_refs["pro"]),
        "anti": list(noether_quad_core_refs["anti"]),
    }

    participant_records = {
        normalize_text(participant.get("id")): participant for participant in generated_participants
    }
    participant_records[source_id] = source_participant

    def resolve_endpoint_role(participant_id):
        participant = participant_records.get(normalize_text(participant_id)) or {}
        if normalize_text(participant.get("side")) == "product":
            return "product"
        if normalize_text(participant.get("side")) == "center":
            return "center"
        return "reactant"

    def emit_dissociate_step(step, operator_id, input_endpoint, output_endpoints, *, lane, row, slot):
        mapping_ids = []
        input_role = resolve_endpoint_role(input_endpoint["participantId"])
        input_mapping_id = f"map_{operator_id.replace(':', '_')}_input"
        mappings.append(
            build_mapping(
                mapping_id=input_mapping_id,
                kind="operator-path",
                from_participant_id=input_endpoint["participantId"],
                from_anchor_id=input_endpoint["anchorId"],
                from_role=input_role,
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=input_endpoint["inventory"],
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(input_mapping_id)
        operator_outputs = []
        for output_index, endpoint in enumerate(output_endpoints, start=1):
            output_role = resolve_endpoint_role(endpoint["participantId"])
            output_mapping_id = f"map_{operator_id.replace(':', '_')}_output_{output_index}"
            mappings.append(
                build_mapping(
                    mapping_id=output_mapping_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=endpoint["participantId"],
                    to_anchor_id=endpoint["anchorId"],
                    to_role=output_role,
                    conserved_ledger=endpoint["inventory"],
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(output_mapping_id)
            operator_outputs.append(
                {
                    "participantId": endpoint["participantId"],
                    "anchorId": endpoint["anchorId"],
                    "role": output_role,
                }
            )
        operators.append(
            {
                "id": operator_id,
                "type": "dissociate",
                "origin": "solve-generated",
                "label": "Dissociate",
                "inputs": [
                    {
                        "participantId": input_endpoint["participantId"],
                        "anchorId": input_endpoint["anchorId"],
                        "role": input_role,
                    }
                ],
                "outputs": operator_outputs,
            }
        )
        operator_placements.append({"operatorId": operator_id, "lane": lane, "row": row, "slot": slot})
        step["mappingIds"] = mapping_ids
        step["operatorIds"] = [operator_id]

    participant_records = {
        normalize_text(participant.get("id")): participant for participant in generated_participants
    }
    participant_records[source_id] = source_participant

    def resolve_endpoint_role(participant_id):
        participant = participant_records.get(normalize_text(participant_id)) or {}
        if normalize_text(participant.get("side")) == "product":
            return "product"
        if normalize_text(participant.get("side")) == "center":
            return "center"
        return "reactant"

    def emit_dissociate_step(
        *,
        step,
        operator_id,
        lane,
        row,
        slot,
        input_endpoint,
        output_endpoints,
    ):
        mapping_ids = []
        operator_inputs = []
        operator_outputs = []
        input_role = resolve_endpoint_role(input_endpoint["participantId"])
        input_mapping_id = f"map_{operator_id.replace(':', '_')}_input"
        mappings.append(
            build_mapping(
                mapping_id=input_mapping_id,
                kind="operator-path",
                from_participant_id=input_endpoint["participantId"],
                from_anchor_id=input_endpoint["anchorId"],
                from_role=input_role,
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=input_endpoint["inventory"],
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(input_mapping_id)
        operator_inputs.append(
            {
                "participantId": input_endpoint["participantId"],
                "anchorId": input_endpoint["anchorId"],
                "role": input_role,
            }
        )
        for output_index, endpoint in enumerate(output_endpoints, start=1):
            output_role = resolve_endpoint_role(endpoint["participantId"])
            output_mapping_id = f"map_{operator_id.replace(':', '_')}_output_{output_index}"
            mappings.append(
                build_mapping(
                    mapping_id=output_mapping_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=endpoint["participantId"],
                    to_anchor_id=endpoint["anchorId"],
                    to_role=output_role,
                    conserved_ledger=endpoint["inventory"],
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(output_mapping_id)
            operator_outputs.append(
                {
                    "participantId": endpoint["participantId"],
                    "anchorId": endpoint["anchorId"],
                    "role": output_role,
                }
            )
        operators.append(
            {
                "id": operator_id,
                "type": "dissociate",
                "origin": "solve-generated",
                "label": "Dissociate",
                "inputs": operator_inputs,
                "outputs": operator_outputs,
            }
        )
        operator_placements.append(
            {
                "operatorId": operator_id,
                "lane": lane,
                "row": row,
                "slot": slot,
            }
        )
        step["mappingIds"] = mapping_ids
        step["operatorIds"] = [operator_id]

    source_root = get_root_node(source_participant) or source_participant
    emit_dissociate_step(
        step=steps[0],
        operator_id=f"dissociate:{variant_prefix}:source",
        lane=0,
        row=1,
        slot=1,
        input_endpoint={
            "participantId": source_id,
            "anchorId": normalize_text(source_root.get("id")) or "root",
            "inventory": source_root.get("inventory"),
        },
        output_endpoints=[
            {
                "participantId": normalize_text(source_core.get("id")),
                "anchorId": normalize_text(source_core.get("rootNodeId")),
                "inventory": source_core.get("inventory"),
            },
            {
                "participantId": free_pool_id,
                "anchorId": free_pool_root_id,
                "inventory": free_pool.get("inventory"),
            },
        ],
    )

    for pair_index, pair_id in enumerate(generated_noether_pair_ids, start=1):
        pair_step = {
            "stepId": f"step_{variant_prefix}_noether_pair_{pair_index}",
            "kind": "dissociate",
            "ruleFamily": "dissociate-noether-pair-cores",
            "consumedParticipantIds": [pair_id],
            "producedParticipantIds": [
                ref["participantId"]
                for polarity in ("pro", "anti")
                for ref in noether_pair_core_refs[polarity]
                if normalize_text((participant_records.get(ref["participantId"]) or {}).get("sourceParticipantId")) == pair_id
            ],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["noether-pair-supplement", "noether-core-provenance"],
        }
        pair_core_endpoints = []
        for polarity in ("pro", "anti"):
            for ref in noether_pair_core_refs[polarity]:
                ref_participant = participant_records.get(ref["participantId"]) or {}
                if normalize_text(ref_participant.get("sourceParticipantId")) != pair_id:
                    continue
                pair_core_endpoints.append(
                    {
                        "participantId": ref["participantId"],
                        "anchorId": ref["anchorId"],
                        "inventory": ref_participant.get("inventory"),
                    }
                )
        emit_dissociate_step(
            step=pair_step,
            operator_id=f"dissociate:{variant_prefix}:noether_pair:{pair_index}",
            lane=1,
            row=pair_index * 2 + 1,
            slot=pair_index * 2 + 1,
            input_endpoint={
                "participantId": pair_id,
                "anchorId": normalize_text((participant_records.get(pair_id) or {}).get("rootNodeId")) or "root",
                "inventory": (participant_records.get(pair_id) or {}).get("inventory"),
            },
            output_endpoints=pair_core_endpoints,
        )
        steps.append(pair_step)

    for cluster_index, quad_id in enumerate(generated_noether_quad_ids, start=1):
        quad_step = {
            "stepId": f"step_{variant_prefix}_noether_quad_{cluster_index}",
            "kind": "dissociate",
            "ruleFamily": "dissociate-noether-quad-cores",
            "consumedParticipantIds": [quad_id],
            "producedParticipantIds": [
                ref["participantId"]
                for polarity in ("pro", "anti")
                for ref in noether_quad_core_refs[polarity]
                if normalize_text((participant_records.get(ref["participantId"]) or {}).get("sourceParticipantId")) == quad_id
            ],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["noether-quad-supplement", "noether-core-provenance"],
        }
        quad_core_endpoints = []
        for polarity in ("pro", "anti"):
            for ref in noether_quad_core_refs[polarity]:
                ref_participant = participant_records.get(ref["participantId"]) or {}
                if normalize_text(ref_participant.get("sourceParticipantId")) != quad_id:
                    continue
                quad_core_endpoints.append(
                    {
                        "participantId": ref["participantId"],
                        "anchorId": ref["anchorId"],
                        "inventory": ref_participant.get("inventory"),
                    }
                )
        emit_dissociate_step(
            step=quad_step,
            operator_id=f"dissociate:{variant_prefix}:noether_quad:{cluster_index}",
            lane=1,
            row=(noether_pair_count + cluster_index) * 2 + 1,
            slot=(noether_pair_count + cluster_index) * 2 + 1,
            input_endpoint={
                "participantId": quad_id,
                "anchorId": normalize_text((participant_records.get(quad_id) or {}).get("rootNodeId")) or "root",
                "inventory": (participant_records.get(quad_id) or {}).get("inventory"),
            },
            output_endpoints=quad_core_endpoints,
        )
        steps.append(quad_step)

    def claim_core_ref(polarity):
        normalized_polarity = "anti" if normalize_text(polarity).lower() == "anti" else "pro"
        if available_core_refs[normalized_polarity]:
            return available_core_refs[normalized_polarity].pop(0)
        if available_noether_pair_refs[normalized_polarity]:
            return available_noether_pair_refs[normalized_polarity].pop(0)
        if available_noether_quad_refs[normalized_polarity]:
            return available_noether_quad_refs[normalized_polarity].pop(0)
        return None

    core_dissociation_refs = [
        {
            "participantId": normalize_text(source_core.get("id")),
            "anchorId": normalize_text(source_core.get("rootNodeId")),
            "sourceKind": "source-core",
        }
    ] + [
        ref
        for polarity in ("pro", "anti")
        for ref in noether_pair_core_refs[polarity] + noether_quad_core_refs[polarity]
    ]

    for core_index, core_ref in enumerate(core_dissociation_refs, start=1):
        core_participant_id = core_ref["participantId"]
        core_participant = participant_records.get(core_participant_id) or {}
        core_step = {
            "stepId": f"step_{variant_prefix}_core_pool_{core_index}",
            "kind": "dissociate",
            "ruleFamily": "dissociate-noether-core-architrino-pool",
            "consumedParticipantIds": [core_participant_id],
            "producedParticipantIds": [free_pool_id],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": list(
                dict.fromkeys(
                    ["shared-free-architrino-pool", "noether-core-provenance"]
                    + get_core_source_diagnostic_labels(core_ref["sourceKind"], "lepton-core-provenance")
                )
            ),
        }
        emit_dissociate_step(
            step=core_step,
            operator_id=f"dissociate:{variant_prefix}:core:{core_index}",
            lane=0,
            row=core_index * 2 + 1,
            slot=core_index * 2 + 1,
            input_endpoint={
                "participantId": core_participant_id,
                "anchorId": core_ref["anchorId"],
                "inventory": core_participant.get("inventory"),
            },
            output_endpoints=[
                {
                    "participantId": free_pool_id,
                    "anchorId": free_pool_root_id,
                    "inventory": free_pool.get("inventory"),
                }
            ],
        )
        steps.append(core_step)

    for index, requirement in enumerate(product_requirements, start=1):
        product = requirement["participant"]
        product_root = requirement["root"]
        product_id = normalize_text(product.get("id"))
        operator_id = f"associate:{variant_prefix}:{index}"
        mapping_ids = []
        operator_inputs = []
        diagnostic_labels = []
        consumed_participant_ids = []

        if requirement["kind"] == "lepton":
            product_polarity = requirement["polarity"]
            core_ref = claim_core_ref(product_polarity)
            if core_ref is None:
                return None
            core_mapping_id = f"map_{variant_prefix}_{product_id}_core"
            mappings.append(
                build_mapping(
                    mapping_id=core_mapping_id,
                    kind="operator-path",
                    from_participant_id=core_ref["participantId"],
                    from_anchor_id=core_ref["anchorId"],
                    from_role=resolve_endpoint_role(core_ref["participantId"]),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger={"electrinoCount": 3, "positrinoCount": 3},
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(core_mapping_id)
            operator_inputs.append(
                {
                    "participantId": core_ref["participantId"],
                    "anchorId": core_ref["anchorId"],
                    "role": resolve_endpoint_role(core_ref["participantId"]),
                }
            )
            consumed_participant_ids.append(core_ref["participantId"])
            pool_mapping_id = f"map_{variant_prefix}_{product_id}_free"
            mappings.append(
                build_mapping(
                    mapping_id=pool_mapping_id,
                    kind="operator-path",
                    from_participant_id=free_pool_id,
                    from_anchor_id=free_pool_root_id,
                    from_role=resolve_endpoint_role(free_pool_id),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger=free_pool.get("inventory"),
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(pool_mapping_id)
            operator_inputs.append(
                {
                    "participantId": free_pool_id,
                    "anchorId": free_pool_root_id,
                    "role": resolve_endpoint_role(free_pool_id),
                }
            )
            consumed_participant_ids.append(free_pool_id)
            diagnostic_labels.extend(["shared-free-architrino-pool", "associate-lepton-from-core-pool"])
            diagnostic_labels.extend(
                get_core_source_diagnostic_labels(core_ref["sourceKind"], "lepton-core-provenance")
            )
        else:
            pro_core_ref = claim_core_ref("pro")
            anti_core_ref = claim_core_ref("anti")
            if pro_core_ref is None or anti_core_ref is None:
                return None
            for polarity, core_ref in (("pro", pro_core_ref), ("anti", anti_core_ref)):
                core_mapping_id = f"map_{variant_prefix}_{product_id}_core_{polarity}"
                mappings.append(
                    build_mapping(
                        mapping_id=core_mapping_id,
                        kind="operator-path",
                        from_participant_id=core_ref["participantId"],
                        from_anchor_id=core_ref["anchorId"],
                        from_role=resolve_endpoint_role(core_ref["participantId"]),
                        to_participant_id=operator_id,
                        to_anchor_id="root",
                        to_role="operator-input",
                        conserved_ledger={"electrinoCount": 3, "positrinoCount": 3},
                        provenance_mode="operator-mediated",
                        via_operator_id=operator_id,
                    )
                )
                mapping_ids.append(core_mapping_id)
                operator_inputs.append(
                    {
                        "participantId": core_ref["participantId"],
                        "anchorId": core_ref["anchorId"],
                        "role": resolve_endpoint_role(core_ref["participantId"]),
                    }
                )
                consumed_participant_ids.append(core_ref["participantId"])
                diagnostic_labels.extend(
                    get_core_source_diagnostic_labels(core_ref["sourceKind"], "lepton-core-provenance")
                )
            diagnostic_labels.append("associate-photon-from-core-pair")

        output_mapping_id = f"map_{variant_prefix}_{product_id}_out"
        mappings.append(
            build_mapping(
                mapping_id=output_mapping_id,
                kind="operator-path",
                from_participant_id=operator_id,
                from_anchor_id="root",
                from_role="operator-output",
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")) or "root",
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(output_mapping_id)
        operators.append(
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Associate",
                "inputs": operator_inputs,
                "outputs": [
                    {
                        "participantId": product_id,
                        "anchorId": normalize_text(product_root.get("id")) or "root",
                        "role": "product",
                    }
                ],
            }
        )
        operator_placements.append(
            {
                "operatorId": operator_id,
                "lane": 1,
                "row": index * 2 + 1,
                "slot": index * 2 + 1,
            }
        )
        steps.append(
            {
                "stepId": f"step_{variant_prefix}_associate_{index}",
                "kind": "associate",
                "ruleFamily": family["ruleFamily"],
                "consumedParticipantIds": list(dict.fromkeys(consumed_participant_ids)),
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": mapping_ids,
                "operatorIds": [operator_id],
                "diagnosticLabels": list(dict.fromkeys(diagnostic_labels)),
            }
        )

    diagnostics = []
    source_lepton_diagnostic = build_lepton_constituent_provenance_diagnostic(source_participant)
    if source_lepton_diagnostic is not None:
        diagnostics.append(source_lepton_diagnostic)

    return build_result(
        request=request,
        generated_steps=steps,
        generated_mappings=mappings,
        generated_operators=operators,
        operator_placements=operator_placements,
        auto_dissociated_participant_ids=generated_noether_pair_ids
        + generated_noether_quad_ids
        + [normalize_text(source_core.get("id"))]
        + [ref["participantId"] for polarity in ("pro", "anti") for ref in noether_pair_core_refs[polarity]]
        + [ref["participantId"] for polarity in ("pro", "anti") for ref in noether_quad_core_refs[polarity]],
        generated_participants=generated_participants,
        diagnostics=diagnostics,
    )


def solve_meson_lepton_provenance_channel(request, source_participants, product_participants, family):
    source_participant = source_participants[0]
    source_id = normalize_text(source_participant.get("id"))
    source_root = get_root_node(source_participant)
    quark_constituents = get_meson_constituent_specs(source_participant)
    if source_root is None or not quark_constituents:
        return None

    variant_prefix = f"{family['key']}_{family['variantKey']}"
    quark_step_id = f"step_{variant_prefix}_meson_quarks"
    ledger_step_id = f"step_{variant_prefix}_core_pool"
    recruit_step_id = f"step_{variant_prefix}_spacetime_recruit"
    generated_participants = []

    quark_participants = []
    for index, constituent in enumerate(quark_constituents, start=1):
        quark_participants.append(
            build_generated_quark_participant(
                participant_id=f"center_{variant_prefix}_quark_{index}",
                template_id=constituent["templateId"],
                polarity=constituent["polarity"],
                label=constituent.get("label", ""),
                inventory=constituent.get("inventory"),
                tags=constituent.get("tags"),
                source_participant_id=source_id,
                source_step_id=quark_step_id,
            )
        )
    generated_participants.extend(quark_participants)

    source_core_refs = {"pro": [], "anti": []}
    generated_core_ids = []
    for index, constituent in enumerate(quark_constituents, start=1):
        core_participant = build_generated_noether_core_participant(
            participant_id=f"center_{variant_prefix}_core_{index}",
            polarity=constituent["polarity"],
            source_participant_id=normalize_text(quark_participants[index - 1].get("id")),
            source_step_id=ledger_step_id,
        )
        generated_participants.append(core_participant)
        generated_core_ids.append(normalize_text(core_participant.get("id")))
        source_core_refs[normalize_text(constituent["polarity"]).lower()].append(
            {
                "participantId": normalize_text(core_participant.get("id")),
                "anchorId": normalize_text(core_participant.get("rootNodeId")),
                "sourceKind": "meson-core",
            }
        )

    free_pool = build_generated_free_architrino_pool(
        participant_id=f"center_{variant_prefix}_free_architrinos",
        product_count=len(product_participants),
        source_participant_id=source_id,
        source_step_id=ledger_step_id,
    )
    generated_participants.append(free_pool)
    free_pool_id = normalize_text(free_pool.get("id"))
    free_pool_root_id = normalize_text(free_pool.get("rootNodeId"))

    needed_core_counts = {"pro": 0, "anti": 0}
    product_requirements = []
    for product in product_participants:
        product_root = get_root_node(product)
        template_id = get_effective_template_id(product_root or product)
        product_polarity = get_effective_polarity(product_root or product, template_id)
        if not product_root or template_id not in {"electron", "neutrino"} or product_polarity not in {
            "pro",
            "anti",
        }:
            return None
        needed_core_counts[product_polarity] += 1
        product_requirements.append(
            {
                "participant": product,
                "root": product_root,
                "polarity": product_polarity,
            }
        )

    deficit_pro = max(0, needed_core_counts["pro"] - len(source_core_refs["pro"]))
    deficit_anti = max(0, needed_core_counts["anti"] - len(source_core_refs["anti"]))
    noether_pair_count = min(deficit_pro, deficit_anti)
    deficit_pro = max(0, deficit_pro - noether_pair_count)
    deficit_anti = max(0, deficit_anti - noether_pair_count)
    noether_pair_core_refs = {"pro": [], "anti": []}
    generated_noether_pair_ids = []
    for pair_index in range(1, noether_pair_count + 1):
        noether_pair = build_generated_noether_pair(
            participant_id=f"center_{variant_prefix}_noether_pair_{pair_index}",
            source_participant_id=source_id,
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_pair)
        generated_noether_pair_ids.append(normalize_text(noether_pair.get("id")))
        for node in get_child_nodes(noether_pair):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity in {"pro", "anti"}:
                noether_pair_core_refs[node_polarity].append(
                    {
                        "participantId": normalize_text(noether_pair.get("id")),
                        "anchorId": normalize_text(node.get("id")),
                        "sourceKind": "noether-pair",
                    }
                )

    noether_quad_count = max((deficit_pro + 1) // 2, (deficit_anti + 1) // 2)
    noether_quad_core_refs = {"pro": [], "anti": []}
    generated_noether_quad_ids = []
    for cluster_index in range(1, noether_quad_count + 1):
        noether_quad = build_generated_noether_quad(
            participant_id=f"center_{variant_prefix}_noether_quad_{cluster_index}",
            source_participant_id=source_id,
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_quad)
        generated_noether_quad_ids.append(normalize_text(noether_quad.get("id")))
        for node in get_child_nodes(noether_quad):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity in {"pro", "anti"}:
                noether_quad_core_refs[node_polarity].append(
                    {
                        "participantId": normalize_text(noether_quad.get("id")),
                        "anchorId": normalize_text(node.get("id")),
                        "sourceKind": "noether-quad",
                    }
                )

    steps = [
        {
            "stepId": quark_step_id,
            "kind": "dissociate",
            "ruleFamily": "dissociate-meson-constituents",
            "consumedParticipantIds": [source_id],
            "producedParticipantIds": [
                normalize_text(participant.get("id")) for participant in quark_participants
            ],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["meson-constituent-provenance"],
        },
        {
            "stepId": ledger_step_id,
            "kind": "dissociate",
            "ruleFamily": "dissociate-quark-core-pool",
            "consumedParticipantIds": [
                normalize_text(participant.get("id")) for participant in quark_participants
            ],
            "producedParticipantIds": generated_core_ids + [free_pool_id],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["shared-free-architrino-pool"]
            + (["noether-pair-supplement"] if generated_noether_pair_ids else [])
            + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
        },
    ]
    if generated_noether_pair_ids or generated_noether_quad_ids:
        steps.append(
            {
                "stepId": recruit_step_id,
                "kind": "recruit",
                "ruleFamily": "recruit-spacetime-supplement",
                "consumedParticipantIds": [],
                "producedParticipantIds": generated_noether_pair_ids + generated_noether_quad_ids,
                "resolvedTargetIds": [],
                "mappingIds": [],
                "operatorIds": [],
                "diagnosticLabels": (["noether-pair-supplement"] if generated_noether_pair_ids else [])
                + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
            }
        )
    mappings = []
    operators = []
    operator_placements = []
    available_core_refs = {
        "pro": list(source_core_refs["pro"]),
        "anti": list(source_core_refs["anti"]),
    }
    available_noether_pair_refs = {
        "pro": list(noether_pair_core_refs["pro"]),
        "anti": list(noether_pair_core_refs["anti"]),
    }
    available_noether_quad_refs = {
        "pro": list(noether_quad_core_refs["pro"]),
        "anti": list(noether_quad_core_refs["anti"]),
    }

    participant_records = {
        normalize_text(participant.get("id")): participant for participant in generated_participants
    }
    participant_records[source_id] = source_participant

    def resolve_endpoint_role(participant_id):
        participant = participant_records.get(normalize_text(participant_id)) or {}
        if normalize_text(participant.get("side")) == "product":
            return "product"
        if normalize_text(participant.get("side")) == "center":
            return "center"
        return "reactant"

    def emit_dissociate_step(step, operator_id, input_endpoint, output_endpoints, *, lane, row, slot):
        mapping_ids = []
        input_role = resolve_endpoint_role(input_endpoint["participantId"])
        input_mapping_id = f"map_{operator_id.replace(':', '_')}_input"
        mappings.append(
            build_mapping(
                mapping_id=input_mapping_id,
                kind="operator-path",
                from_participant_id=input_endpoint["participantId"],
                from_anchor_id=input_endpoint["anchorId"],
                from_role=input_role,
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=input_endpoint["inventory"],
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(input_mapping_id)
        output_records = []
        for output_index, endpoint in enumerate(output_endpoints, start=1):
            output_role = resolve_endpoint_role(endpoint["participantId"])
            output_mapping_id = f"map_{operator_id.replace(':', '_')}_output_{output_index}"
            mappings.append(
                build_mapping(
                    mapping_id=output_mapping_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=endpoint["participantId"],
                    to_anchor_id=endpoint["anchorId"],
                    to_role=output_role,
                    conserved_ledger=endpoint["inventory"],
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(output_mapping_id)
            output_records.append(
                {
                    "participantId": endpoint["participantId"],
                    "anchorId": endpoint["anchorId"],
                    "role": output_role,
                }
            )
        operators.append(
            {
                "id": operator_id,
                "type": "dissociate",
                "origin": "solve-generated",
                "label": "Dissociate",
                "inputs": [
                    {
                        "participantId": input_endpoint["participantId"],
                        "anchorId": input_endpoint["anchorId"],
                        "role": input_role,
                    }
                ],
                "outputs": output_records,
            }
        )
        operator_placements.append({"operatorId": operator_id, "lane": lane, "row": row, "slot": slot})
        step["mappingIds"] = mapping_ids
        step["operatorIds"] = [operator_id]

    emit_dissociate_step(
        steps[0],
        f"dissociate:{variant_prefix}:source",
        {
            "participantId": source_id,
            "anchorId": normalize_text(source_root.get("id")) or "root",
            "inventory": source_root.get("inventory"),
        },
        [
            {
                "participantId": normalize_text(participant.get("id")),
                "anchorId": normalize_text(participant.get("rootNodeId")),
                "inventory": participant.get("inventory"),
            }
            for participant in quark_participants
        ],
        lane=0,
        row=1,
        slot=1,
    )
    emit_dissociate_step(
        steps[1],
        f"dissociate:{variant_prefix}:quark_pool",
        {
            "participantId": normalize_text(quark_participants[0].get("id")),
            "anchorId": normalize_text(quark_participants[0].get("rootNodeId")),
            "inventory": quark_participants[0].get("inventory"),
        },
        [
            {
                "participantId": participant_id,
                "anchorId": normalize_text((participant_records.get(participant_id) or {}).get("rootNodeId")) or "root",
                "inventory": (participant_records.get(participant_id) or {}).get("inventory"),
            }
            for participant_id in generated_core_ids + [free_pool_id]
        ],
        lane=0,
        row=3,
        slot=3,
    )
    quark_pool_operator_id = f"dissociate:{variant_prefix}:quark_pool"
    quark_pool_operator = next(
        (operator for operator in operators if normalize_text(operator.get("id")) == quark_pool_operator_id),
        None,
    )
    for extra_index, quark in enumerate(quark_participants[1:], start=2):
        quark_root = get_root_node(quark) or quark
        mapping_id = f"map_{quark_pool_operator_id.replace(':', '_')}_input_{extra_index}"
        mappings.append(
            build_mapping(
                mapping_id=mapping_id,
                kind="operator-path",
                from_participant_id=normalize_text(quark.get("id")),
                from_anchor_id=normalize_text(quark_root.get("id")) or "root",
                from_role=resolve_endpoint_role(normalize_text(quark.get("id"))),
                to_participant_id=quark_pool_operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=quark_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=quark_pool_operator_id,
            )
        )
        steps[1]["mappingIds"].append(mapping_id)
        if quark_pool_operator is not None:
            quark_pool_operator.setdefault("inputs", []).append(
                {
                    "participantId": normalize_text(quark.get("id")),
                    "anchorId": normalize_text(quark_root.get("id")) or "root",
                    "role": resolve_endpoint_role(normalize_text(quark.get("id"))),
                }
            )

    for index, requirement in enumerate(product_requirements, start=1):
        product = requirement["participant"]
        product_root = requirement["root"]
        product_id = normalize_text(product.get("id"))
        product_polarity = requirement["polarity"]
        core_ref = None
        if available_core_refs[product_polarity]:
            core_ref = available_core_refs[product_polarity].pop(0)
        elif available_noether_pair_refs[product_polarity]:
            core_ref = available_noether_pair_refs[product_polarity].pop(0)
        elif available_noether_quad_refs[product_polarity]:
            core_ref = available_noether_quad_refs[product_polarity].pop(0)
        if core_ref is None:
            return None

        operator_id = f"associate:{variant_prefix}:{index}"
        mapping_ids = []
        core_mapping_id = f"map_{variant_prefix}_{product_id}_core"
        mappings.append(
            build_mapping(
                mapping_id=core_mapping_id,
                kind="operator-path",
                from_participant_id=core_ref["participantId"],
                from_anchor_id=core_ref["anchorId"],
                from_role=resolve_endpoint_role(core_ref["participantId"]),
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger={"electrinoCount": 3, "positrinoCount": 3},
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(core_mapping_id)
        pool_mapping_id = f"map_{variant_prefix}_{product_id}_free"
        mappings.append(
            build_mapping(
                mapping_id=pool_mapping_id,
                kind="operator-path",
                from_participant_id=free_pool_id,
                from_anchor_id=free_pool_root_id,
                from_role=resolve_endpoint_role(free_pool_id),
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=free_pool.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(pool_mapping_id)
        output_mapping_id = f"map_{variant_prefix}_{product_id}_out"
        mappings.append(
            build_mapping(
                mapping_id=output_mapping_id,
                kind="operator-path",
                from_participant_id=operator_id,
                from_anchor_id="root",
                from_role="operator-output",
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")) or "root",
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(output_mapping_id)
        operators.append(
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Associate",
                "inputs": [
                    {
                        "participantId": core_ref["participantId"],
                        "anchorId": core_ref["anchorId"],
                        "role": resolve_endpoint_role(core_ref["participantId"]),
                    },
                    {
                        "participantId": free_pool_id,
                        "anchorId": free_pool_root_id,
                        "role": resolve_endpoint_role(free_pool_id),
                    },
                ],
                "outputs": [
                    {
                        "participantId": product_id,
                        "anchorId": normalize_text(product_root.get("id")) or "root",
                        "role": "product",
                    }
                ],
            }
        )
        operator_placements.append(
            {
                "operatorId": operator_id,
                "lane": 1,
                "row": index * 2 + 1,
                "slot": index * 2 + 1,
            }
        )
        steps.append(
            {
                "stepId": f"step_{variant_prefix}_associate_{index}",
                "kind": "associate",
                "ruleFamily": family["ruleFamily"],
                "consumedParticipantIds": [core_ref["participantId"], free_pool_id],
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": mapping_ids,
                "operatorIds": [operator_id],
                "diagnosticLabels": ["shared-free-architrino-pool", "associate-lepton-from-core-pool"]
                + (
                    ["noether-pair-supplement"]
                    if core_ref["sourceKind"] == "noether-pair"
                    else ["noether-quad-supplement"]
                    if core_ref["sourceKind"] == "noether-quad"
                    else ["meson-core-provenance"]
                ),
            }
        )

    return build_result(
        request=request,
        generated_steps=steps,
        generated_mappings=mappings,
        generated_operators=operators,
        operator_placements=operator_placements,
        auto_dissociated_participant_ids=[source_id],
        generated_participants=generated_participants,
    )


def solve_baryon_constituent_provenance_channel(request, source_participants, product_participants, family):
    source_participant = source_participants[0]
    source_id = normalize_text(source_participant.get("id"))
    source_root = get_root_node(source_participant)
    source_template_id = get_effective_template_id(source_root or source_participant)
    if source_root is None or source_template_id != "neutron":
        return None

    baryon_products = [
        product for product in product_participants if get_effective_template_id(get_root_node(product) or product) == "proton"
    ]
    electron_products = [
        product
        for product in product_participants
        if get_effective_template_id(get_root_node(product) or product) == "electron"
        and get_effective_polarity(get_root_node(product) or product, "electron") == "pro"
    ]
    antineutrino_products = [
        product
        for product in product_participants
        if get_effective_template_id(get_root_node(product) or product) == "neutrino"
        and get_effective_polarity(get_root_node(product) or product, "neutrino") == "anti"
    ]
    photon_products = [
        product for product in product_participants if get_effective_template_id(get_root_node(product) or product) == "photon"
    ]
    if len(baryon_products) != 1 or len(electron_products) != 1 or len(antineutrino_products) != 1 or len(photon_products) > 1:
        return None
    if len(product_participants) != 3 + len(photon_products):
        return None

    quark_constituents = list(get_baryon_constituent_specs(source_participant))
    if len(quark_constituents) != 3:
        return None
    transforming_index = next(
        (index for index, constituent in enumerate(quark_constituents) if constituent["templateId"] == "down_quark"),
        -1,
    )
    if transforming_index < 0:
        return None

    variant_prefix = f"{family['key']}_{family['variantKey']}"
    quark_step_id = f"step_{variant_prefix}_baryon_quarks"
    ledger_step_id = f"step_{variant_prefix}_weak_quark_transform"
    recruit_step_id = f"step_{variant_prefix}_spacetime_recruit"
    generated_participants = []

    quark_participants = []
    for index, constituent in enumerate(quark_constituents, start=1):
        participant = build_generated_quark_participant(
            participant_id=f"center_{variant_prefix}_quark_{index}",
            template_id=constituent["templateId"],
            polarity=constituent["polarity"],
            label=constituent.get("label", ""),
            inventory=constituent.get("inventory"),
            tags=["baryon-constituent"] + list(constituent.get("tags") or []),
            source_participant_id=source_id,
            source_step_id=quark_step_id,
        )
        quark_participants.append(participant)
    generated_participants.extend(quark_participants)

    transforming_quark = quark_participants[transforming_index]
    spectator_quarks = [participant for index, participant in enumerate(quark_participants) if index != transforming_index]

    transformed_up_quark = build_generated_quark_participant(
        participant_id=f"center_{variant_prefix}_transformed_up_quark",
        template_id="up_quark",
        polarity="pro",
        label="Up Quark",
        tags=["baryon-constituent", "weak-transform-product"],
        source_participant_id=normalize_text(transforming_quark.get("id")),
        source_step_id=ledger_step_id,
    )
    generated_participants.append(transformed_up_quark)

    source_core = build_generated_noether_core_participant(
        participant_id=f"center_{variant_prefix}_source_core",
        polarity="pro",
        source_participant_id=normalize_text(transforming_quark.get("id")),
        source_step_id=ledger_step_id,
    )
    generated_participants.append(source_core)
    generated_core_ids = [normalize_text(source_core.get("id"))]
    source_core_refs = {
        "pro": [
            {
                "participantId": normalize_text(source_core.get("id")),
                "anchorId": normalize_text(source_core.get("rootNodeId")),
                "sourceKind": "source-core",
            }
        ],
        "anti": [],
    }

    free_pool = build_generated_free_architrino_pool(
        participant_id=f"center_{variant_prefix}_free_architrinos",
        product_count=max(2, len(product_participants)),
        source_participant_id=normalize_text(transforming_quark.get("id")),
        source_step_id=ledger_step_id,
    )
    generated_participants.append(free_pool)
    free_pool_id = normalize_text(free_pool.get("id"))
    free_pool_root_id = normalize_text(free_pool.get("rootNodeId"))

    needed_core_counts = {"pro": len(electron_products) + len(photon_products), "anti": len(antineutrino_products) + len(photon_products)}
    deficit_pro = max(0, needed_core_counts["pro"] - len(source_core_refs["pro"]))
    deficit_anti = max(0, needed_core_counts["anti"] - len(source_core_refs["anti"]))
    noether_pair_count = min(deficit_pro, deficit_anti)
    deficit_pro = max(0, deficit_pro - noether_pair_count)
    deficit_anti = max(0, deficit_anti - noether_pair_count)
    noether_pair_core_refs = {"pro": [], "anti": []}
    generated_noether_pair_ids = []
    for pair_index in range(1, noether_pair_count + 1):
        noether_pair = build_generated_noether_pair(
            participant_id=f"center_{variant_prefix}_noether_pair_{pair_index}",
            source_participant_id=normalize_text(transforming_quark.get("id")),
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_pair)
        generated_noether_pair_ids.append(normalize_text(noether_pair.get("id")))
        for node in get_child_nodes(noether_pair):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity in {"pro", "anti"}:
                noether_pair_core_refs[node_polarity].append(
                    {
                        "participantId": normalize_text(noether_pair.get("id")),
                        "anchorId": normalize_text(node.get("id")),
                        "sourceKind": "noether-pair",
                    }
                )

    noether_quad_count = max((deficit_pro + 1) // 2, (deficit_anti + 1) // 2)
    noether_quad_core_refs = {"pro": [], "anti": []}
    generated_noether_quad_ids = []
    for cluster_index in range(1, noether_quad_count + 1):
        noether_quad = build_generated_noether_quad(
            participant_id=f"center_{variant_prefix}_noether_quad_{cluster_index}",
            source_participant_id=normalize_text(transforming_quark.get("id")),
            source_step_id=recruit_step_id,
        )
        generated_participants.append(noether_quad)
        generated_noether_quad_ids.append(normalize_text(noether_quad.get("id")))
        for node in get_child_nodes(noether_quad):
            node_polarity = normalize_text(node.get("polarity")).lower()
            if node_polarity in {"pro", "anti"}:
                noether_quad_core_refs[node_polarity].append(
                    {
                        "participantId": normalize_text(noether_quad.get("id")),
                        "anchorId": normalize_text(node.get("id")),
                        "sourceKind": "noether-quad",
                    }
                )

    steps = [
        {
            "stepId": quark_step_id,
            "kind": "dissociate",
            "ruleFamily": "dissociate-baryon-constituents",
            "consumedParticipantIds": [source_id],
            "producedParticipantIds": [normalize_text(participant.get("id")) for participant in quark_participants],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["baryon-constituent-provenance", "baryon-spectator-quark-carry"],
        },
        {
            "stepId": ledger_step_id,
            "kind": "dissociate",
            "ruleFamily": "dissociate-baryon-weak-core-pool",
            "consumedParticipantIds": [normalize_text(transforming_quark.get("id"))],
            "producedParticipantIds": generated_core_ids
            + [free_pool_id, normalize_text(transformed_up_quark.get("id"))],
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["baryon-constituent-provenance", "shared-free-architrino-pool", "weak-baryon-quark-transform"]
            + (["noether-pair-supplement"] if generated_noether_pair_ids else [])
            + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
        },
    ]
    if generated_noether_pair_ids or generated_noether_quad_ids:
        steps.append(
            {
                "stepId": recruit_step_id,
                "kind": "recruit",
                "ruleFamily": "recruit-spacetime-supplement",
                "consumedParticipantIds": [],
                "producedParticipantIds": generated_noether_pair_ids + generated_noether_quad_ids,
                "resolvedTargetIds": [],
                "mappingIds": [],
                "operatorIds": [],
                "diagnosticLabels": (["noether-pair-supplement"] if generated_noether_pair_ids else [])
                + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
            }
        )
    mappings = []
    operators = []
    operator_placements = []

    available_core_refs = {"pro": list(source_core_refs["pro"]), "anti": list(source_core_refs["anti"])}
    available_noether_pair_refs = {"pro": list(noether_pair_core_refs["pro"]), "anti": list(noether_pair_core_refs["anti"])}
    available_noether_quad_refs = {"pro": list(noether_quad_core_refs["pro"]), "anti": list(noether_quad_core_refs["anti"])}

    participant_records = {
        normalize_text(participant.get("id")): participant for participant in generated_participants
    }
    participant_records[source_id] = source_participant

    def resolve_endpoint_role(participant_id):
        participant = participant_records.get(normalize_text(participant_id)) or {}
        if normalize_text(participant.get("side")) == "product":
            return "product"
        if normalize_text(participant.get("side")) == "center":
            return "center"
        return "reactant"

    def emit_dissociate_step(step, operator_id, input_endpoint, output_endpoints, *, lane, row, slot):
        mapping_ids = []
        input_role = resolve_endpoint_role(input_endpoint["participantId"])
        input_mapping_id = f"map_{operator_id.replace(':', '_')}_input"
        mappings.append(
            build_mapping(
                mapping_id=input_mapping_id,
                kind="operator-path",
                from_participant_id=input_endpoint["participantId"],
                from_anchor_id=input_endpoint["anchorId"],
                from_role=input_role,
                to_participant_id=operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=input_endpoint["inventory"],
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(input_mapping_id)
        output_records = []
        for output_index, endpoint in enumerate(output_endpoints, start=1):
            output_role = resolve_endpoint_role(endpoint["participantId"])
            output_mapping_id = f"map_{operator_id.replace(':', '_')}_output_{output_index}"
            mappings.append(
                build_mapping(
                    mapping_id=output_mapping_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=endpoint["participantId"],
                    to_anchor_id=endpoint["anchorId"],
                    to_role=output_role,
                    conserved_ledger=endpoint["inventory"],
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(output_mapping_id)
            output_records.append(
                {
                    "participantId": endpoint["participantId"],
                    "anchorId": endpoint["anchorId"],
                    "role": output_role,
                }
            )
        operators.append(
            {
                "id": operator_id,
                "type": "dissociate",
                "origin": "solve-generated",
                "label": "Dissociate",
                "inputs": [
                    {
                        "participantId": input_endpoint["participantId"],
                        "anchorId": input_endpoint["anchorId"],
                        "role": input_role,
                    }
                ],
                "outputs": output_records,
            }
        )
        operator_placements.append({"operatorId": operator_id, "lane": lane, "row": row, "slot": slot})
        step["mappingIds"] = mapping_ids
        step["operatorIds"] = [operator_id]

    def claim_core_ref(polarity):
        normalized_polarity = "anti" if normalize_text(polarity).lower() == "anti" else "pro"
        if available_core_refs[normalized_polarity]:
            return available_core_refs[normalized_polarity].pop(0)
        if available_noether_pair_refs[normalized_polarity]:
            return available_noether_pair_refs[normalized_polarity].pop(0)
        if available_noether_quad_refs[normalized_polarity]:
            return available_noether_quad_refs[normalized_polarity].pop(0)
        return None

    emit_dissociate_step(
        steps[0],
        f"dissociate:{variant_prefix}:source",
        {
            "participantId": source_id,
            "anchorId": normalize_text(source_root.get("id")) or "root",
            "inventory": source_root.get("inventory"),
        },
        [
            {
                "participantId": normalize_text(participant.get("id")),
                "anchorId": normalize_text(participant.get("rootNodeId")),
                "inventory": participant.get("inventory"),
            }
            for participant in quark_participants
        ],
        lane=0,
        row=1,
        slot=1,
    )
    emit_dissociate_step(
        steps[1],
        f"dissociate:{variant_prefix}:weak_transform",
        {
            "participantId": normalize_text(transforming_quark.get("id")),
            "anchorId": normalize_text(transforming_quark.get("rootNodeId")),
            "inventory": transforming_quark.get("inventory"),
        },
        [
            {
                "participantId": participant_id,
                "anchorId": normalize_text((participant_records.get(participant_id) or {}).get("rootNodeId")) or "root",
                "inventory": (participant_records.get(participant_id) or {}).get("inventory"),
            }
            for participant_id in generated_core_ids
            + [free_pool_id, normalize_text(transformed_up_quark.get("id"))]
        ],
        lane=0,
        row=3,
        slot=3,
    )

    proton_product = baryon_products[0]
    proton_root = get_root_node(proton_product)
    proton_id = normalize_text(proton_product.get("id"))
    proton_operator_id = f"associate:{variant_prefix}:proton"
    proton_mapping_ids = []
    proton_inputs = spectator_quarks + [transformed_up_quark]
    for index, quark in enumerate(proton_inputs, start=1):
        mapping_id = f"map_{variant_prefix}_{proton_id}_quark_{index}"
        quark_root = get_root_node(quark) or quark
        mappings.append(
            build_mapping(
                mapping_id=mapping_id,
                kind="operator-path",
                from_participant_id=normalize_text(quark.get("id")),
                from_anchor_id=normalize_text(quark_root.get("id")) or "root",
                from_role=resolve_endpoint_role(normalize_text(quark.get("id"))),
                to_participant_id=proton_operator_id,
                to_anchor_id="root",
                to_role="operator-input",
                conserved_ledger=quark_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=proton_operator_id,
            )
        )
        proton_mapping_ids.append(mapping_id)
    proton_output_mapping_id = f"map_{variant_prefix}_{proton_id}_out"
    mappings.append(
        build_mapping(
            mapping_id=proton_output_mapping_id,
            kind="operator-path",
            from_participant_id=proton_operator_id,
            from_anchor_id="root",
            from_role="operator-output",
            to_participant_id=proton_id,
            to_anchor_id=normalize_text(proton_root.get("id")) or "root",
            to_role="product",
            conserved_ledger=proton_root.get("inventory"),
            provenance_mode="operator-mediated",
            via_operator_id=proton_operator_id,
        )
    )
    proton_mapping_ids.append(proton_output_mapping_id)
    operators.append(
        {
            "id": proton_operator_id,
            "type": "associate",
            "origin": "solve-generated",
            "label": "Associate",
            "inputs": [
                {
                    "participantId": normalize_text(quark.get("id")),
                    "anchorId": normalize_text((get_root_node(quark) or quark).get("id")) or "root",
                    "role": resolve_endpoint_role(normalize_text(quark.get("id"))),
                }
                for quark in proton_inputs
            ],
            "outputs": [
                {
                    "participantId": proton_id,
                    "anchorId": normalize_text(proton_root.get("id")) or "root",
                    "role": "product",
                }
            ],
        }
    )
    operator_placements.append({"operatorId": proton_operator_id, "lane": 1, "row": 1, "slot": 1})
    steps.append(
        {
            "stepId": f"step_{variant_prefix}_associate_proton",
            "kind": "associate",
            "ruleFamily": family["ruleFamily"],
            "consumedParticipantIds": [normalize_text(quark.get("id")) for quark in proton_inputs],
            "producedParticipantIds": [],
            "resolvedTargetIds": [proton_id],
            "mappingIds": proton_mapping_ids,
            "operatorIds": [proton_operator_id],
            "diagnosticLabels": ["baryon-constituent-provenance", "baryon-spectator-quark-carry", "weak-baryon-quark-transform"],
        }
    )

    product_requirements = (
        [{"kind": "lepton", "participant": electron_products[0], "root": get_root_node(electron_products[0]), "polarity": "pro"}]
        + [{"kind": "lepton", "participant": antineutrino_products[0], "root": get_root_node(antineutrino_products[0]), "polarity": "anti"}]
        + [
            {"kind": "photon", "participant": photon_products[0], "root": get_root_node(photon_products[0])}
            for _ in photon_products
        ]
    )

    for index, requirement in enumerate(product_requirements, start=1):
        product = requirement["participant"]
        product_root = requirement["root"]
        product_id = normalize_text(product.get("id"))
        operator_id = f"associate:{variant_prefix}:product_{index}"
        mapping_ids = []
        operator_inputs = []
        consumed_participant_ids = []
        diagnostic_labels = ["baryon-constituent-provenance", "weak-baryon-quark-transform"]

        if requirement["kind"] == "lepton":
            core_ref = claim_core_ref(requirement["polarity"])
            if core_ref is None:
                return None
            core_mapping_id = f"map_{variant_prefix}_{product_id}_core"
            mappings.append(
                build_mapping(
                    mapping_id=core_mapping_id,
                    kind="operator-path",
                    from_participant_id=core_ref["participantId"],
                    from_anchor_id=core_ref["anchorId"],
                    from_role=resolve_endpoint_role(core_ref["participantId"]),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger={"electrinoCount": 3, "positrinoCount": 3},
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(core_mapping_id)
            operator_inputs.append({"participantId": core_ref["participantId"], "anchorId": core_ref["anchorId"], "role": resolve_endpoint_role(core_ref["participantId"])})
            consumed_participant_ids.append(core_ref["participantId"])
            pool_mapping_id = f"map_{variant_prefix}_{product_id}_free"
            mappings.append(
                build_mapping(
                    mapping_id=pool_mapping_id,
                    kind="operator-path",
                    from_participant_id=free_pool_id,
                    from_anchor_id=free_pool_root_id,
                    from_role=resolve_endpoint_role(free_pool_id),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger=free_pool.get("inventory"),
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            mapping_ids.append(pool_mapping_id)
            operator_inputs.append({"participantId": free_pool_id, "anchorId": free_pool_root_id, "role": resolve_endpoint_role(free_pool_id)})
            consumed_participant_ids.append(free_pool_id)
            diagnostic_labels.extend(["shared-free-architrino-pool", "associate-lepton-from-core-pool"])
            diagnostic_labels.extend(get_core_source_diagnostic_labels(core_ref["sourceKind"], "baryon-core-provenance"))
        else:
            pro_core_ref = claim_core_ref("pro")
            anti_core_ref = claim_core_ref("anti")
            if pro_core_ref is None or anti_core_ref is None:
                return None
            for polarity, core_ref in (("pro", pro_core_ref), ("anti", anti_core_ref)):
                core_mapping_id = f"map_{variant_prefix}_{product_id}_core_{polarity}"
                mappings.append(
                    build_mapping(
                        mapping_id=core_mapping_id,
                        kind="operator-path",
                        from_participant_id=core_ref["participantId"],
                        from_anchor_id=core_ref["anchorId"],
                        from_role=resolve_endpoint_role(core_ref["participantId"]),
                        to_participant_id=operator_id,
                        to_anchor_id="root",
                        to_role="operator-input",
                        conserved_ledger={"electrinoCount": 3, "positrinoCount": 3},
                        provenance_mode="operator-mediated",
                        via_operator_id=operator_id,
                    )
                )
                mapping_ids.append(core_mapping_id)
                operator_inputs.append({"participantId": core_ref["participantId"], "anchorId": core_ref["anchorId"], "role": resolve_endpoint_role(core_ref["participantId"])})
                consumed_participant_ids.append(core_ref["participantId"])
            diagnostic_labels.append("associate-photon-from-core-pair")

        output_mapping_id = f"map_{variant_prefix}_{product_id}_out"
        mappings.append(
            build_mapping(
                mapping_id=output_mapping_id,
                kind="operator-path",
                from_participant_id=operator_id,
                from_anchor_id="root",
                from_role="operator-output",
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")) or "root",
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        mapping_ids.append(output_mapping_id)
        operators.append(
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Associate",
                "inputs": operator_inputs,
                "outputs": [{"participantId": product_id, "anchorId": normalize_text(product_root.get("id")) or "root", "role": "product"}],
            }
        )
        operator_placements.append({"operatorId": operator_id, "lane": 1, "row": index * 2 + 1, "slot": index * 2 + 1})
        steps.append(
            {
                "stepId": f"step_{variant_prefix}_associate_{index}",
                "kind": "associate",
                "ruleFamily": family["ruleFamily"],
                "consumedParticipantIds": list(dict.fromkeys(consumed_participant_ids)),
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": mapping_ids,
                "operatorIds": [operator_id],
                "diagnosticLabels": list(dict.fromkeys(diagnostic_labels)),
            }
        )

    baryon_diagnostic = build_baryon_constituent_provenance_diagnostic(source_participant)
    diagnostics = [baryon_diagnostic] if baryon_diagnostic is not None else []

    return build_result(
        request=request,
        generated_steps=steps,
        generated_mappings=mappings,
        generated_operators=operators,
        operator_placements=operator_placements,
        auto_dissociated_participant_ids=[source_id],
        generated_participants=generated_participants,
        diagnostics=diagnostics,
    )


def solve_generic_weak_channel(request, source_participants, product_participants, family):
    source_participant = source_participants[0]
    source_root = get_root_node(source_participant)
    if source_root is None:
        return None
    if (
        get_effective_template_id(source_root or source_participant) in {"electron", "neutrino"}
        and product_participants
        and any(product_requires_lepton_core(product) for product in product_participants)
        and all(
            product_supported_by_lepton_constituent_channel(product)
            for product in product_participants
        )
    ):
        lepton_result = solve_lepton_constituent_provenance_channel(
            request,
            source_participants,
            product_participants,
            family,
        )
        if lepton_result is not None and lepton_result.get("summary", {}).get("exact") is True:
            return lepton_result
    if (
        get_effective_template_id(source_root or source_participant)
        in {"pi_plus", "pi_minus", "pi0", "k_plus", "k_minus", "dk0", "sk0", "b_plus", "b_minus", "db0", "bb0"}
        and product_participants
        and all(product_requires_lepton_core(product) for product in product_participants)
    ):
        meson_result = solve_meson_lepton_provenance_channel(
            request,
            source_participants,
            product_participants,
            family,
        )
        if meson_result is not None and meson_result.get("summary", {}).get("exact") is True:
            return meson_result
    if get_effective_template_id(source_root or source_participant) == "neutron" and product_participants:
        baryon_result = solve_baryon_constituent_provenance_channel(
            request,
            source_participants,
            product_participants,
            family,
        )
        if baryon_result is not None and baryon_result.get("summary", {}).get("exact") is True:
            return baryon_result
    operator_id = f"associate:{family['key']}"
    step_id = f"step_{family['key']}_{family['variantKey']}"
    mappings = [
        build_mapping(
            mapping_id=f"map_{family['key']}_source_in",
            kind="operator-path",
            from_participant_id=normalize_text(source_participant.get("id")),
            from_anchor_id=normalize_text(source_root.get("id")) or "root",
            from_role="reactant",
            to_participant_id=operator_id,
            to_anchor_id="root",
            to_role="operator-input",
            conserved_ledger=source_root.get("inventory"),
            provenance_mode="operator-mediated",
            via_operator_id=operator_id,
        )
    ]
    resolved_target_ids = []
    step_mapping_ids = [f"map_{family['key']}_source_in"]
    operator_outputs = []
    for index, product in enumerate(product_participants, start=1):
        product_id = normalize_text(product.get("id"))
        product_root = get_root_node(product)
        if not product_id or product_root is None:
            return None
        mapping_id = f"map_{family['key']}_out_{index}"
        target_children = get_child_nodes(product)
        mappings.append(
            build_mapping(
                mapping_id=mapping_id,
                kind="operator-path",
                from_participant_id=operator_id,
                from_anchor_id="root",
                from_role="operator-output",
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")) or "root",
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        resolved_target_ids.append(product_id)
        step_mapping_ids.append(mapping_id)
        operator_outputs.append(
            {
                "participantId": product_id,
                "anchorId": normalize_text(product_root.get("id")) or "root",
                "role": "product",
            }
        )
        for child_index, child in enumerate(target_children, start=1):
            child_mapping_id = f"map_{family['key']}_out_{index}_child_{child_index}"
            mappings.append(
                build_mapping(
                    mapping_id=child_mapping_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=product_id,
                    to_anchor_id=normalize_text(child.get("id")) or "root",
                    to_role="product",
                    conserved_ledger=child.get("inventory"),
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            step_mapping_ids.append(child_mapping_id)
    generated_center = build_generated_weak_center(
        step_id,
        source_participant,
        family.get("implicitCenterPolarity", "pro"),
    )
    source_meson_diagnostic = build_meson_constituent_provenance_diagnostic(
        source_participant,
        "Exact meson closure",
    )
    diagnostic_labels = [
        "implicit-weak-center",
        "noether-core-provenance",
        "generic-weak-channel",
    ]
    diagnostics = []
    if source_meson_diagnostic is not None:
        diagnostic_labels.append("meson-constituent-provenance")
        diagnostics.append(source_meson_diagnostic)
    return build_result(
        request=request,
        generated_steps=[
            {
                "stepId": step_id,
                "kind": "associate",
                "ruleFamily": family["ruleFamily"],
                "consumedParticipantIds": [normalize_text(source_participant.get("id"))],
                "producedParticipantIds": [normalize_text(generated_center.get("id"))],
                "resolvedTargetIds": resolved_target_ids,
                "mappingIds": step_mapping_ids,
                "operatorIds": [operator_id],
                "diagnosticLabels": diagnostic_labels,
            }
        ],
        generated_mappings=mappings,
        generated_operators=[
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Weak Channel",
                "inputs": [
                    {
                        "participantId": normalize_text(source_participant.get("id")),
                        "anchorId": normalize_text(source_root.get("id")) or "root",
                        "role": "reactant",
                    }
                ],
                "outputs": operator_outputs,
            }
        ],
        operator_placements=[
            {
                "operatorId": operator_id,
                "lane": 1,
                "row": 1,
                "slot": 1,
            }
        ],
        auto_dissociated_participant_ids=[],
        generated_participants=[generated_center],
        diagnostics=diagnostics,
    )


def participant_origin(participant=None):
    explicit_origin = normalize_text((participant or {}).get("origin"))
    if explicit_origin:
        return explicit_origin
    side = normalize_text((participant or {}).get("side")).lower()
    if side == "product":
        return "authored-product"
    if side == "center":
        return "authored-center"
    return "authored-reactant"


def serialize_result_participant(participant=None):
    participant = participant or {}
    record = {
        "id": normalize_text(participant.get("id")),
        "origin": participant_origin(participant),
        "side": normalize_text(participant.get("side")) or "reactant",
        "templateId": normalize_text(participant.get("templateId")),
        "label": normalize_text(participant.get("label"))
        or normalize_text(participant.get("templateId")),
        "inventory": normalize_inventory(participant.get("inventory")),
        "rootNodeId": normalize_text(participant.get("rootNodeId")),
        "nodes": [],
    }
    if normalize_text(participant.get("sourceParticipantId")):
        record["sourceParticipantId"] = normalize_text(participant.get("sourceParticipantId"))
    if normalize_text(participant.get("sourceStepId")):
        record["sourceStepId"] = normalize_text(participant.get("sourceStepId"))
    if participant.get("family"):
        record["family"] = normalize_text(participant.get("family"))
    if participant.get("polarity"):
        record["polarity"] = normalize_text(participant.get("polarity"))
    if "isComposite" in participant:
        record["isComposite"] = bool(participant.get("isComposite"))
    if participant.get("tags"):
        record["tags"] = list(participant.get("tags"))
    for node in participant.get("nodes", []):
        node_record = {
            "id": normalize_text(node.get("id")),
            "templateId": normalize_text(node.get("templateId")),
            "label": normalize_text(node.get("label")) or normalize_text(node.get("templateId")),
            "inventory": normalize_inventory(node.get("inventory")),
        }
        if node.get("parentId"):
            node_record["parentId"] = normalize_text(node.get("parentId"))
        if node.get("family"):
            node_record["family"] = normalize_text(node.get("family"))
        if node.get("polarity"):
            node_record["polarity"] = normalize_text(node.get("polarity"))
        if "isComposite" in node:
            node_record["isComposite"] = bool(node.get("isComposite"))
        if node.get("tags"):
            node_record["tags"] = list(node.get("tags"))
        record["nodes"].append(node_record)
    return record


def serialize_manual_operator(operator=None):
    operator = operator or {}
    record = {
        "id": normalize_text(operator.get("id")),
        "type": normalize_text(operator.get("type")) or "associate",
        "origin": "manual",
        "inputs": [serialize_endpoint(endpoint) for endpoint in operator.get("inputs", [])],
        "outputs": [serialize_endpoint(endpoint) for endpoint in operator.get("outputs", [])],
    }
    label = normalize_text(operator.get("label"))
    if label:
        record["label"] = label
    return record


def serialize_endpoint(endpoint=None):
    endpoint = endpoint or {}
    record = {
        "participantId": normalize_text(endpoint.get("participantId")),
        "anchorId": normalize_text(endpoint.get("anchorId")) or "root",
        "role": normalize_text(endpoint.get("role")) or "reactant",
    }
    anchor_instance_index = normalize_anchor_instance_index(endpoint.get("anchorInstanceIndex"))
    if anchor_instance_index is not None:
        record["anchorInstanceIndex"] = anchor_instance_index
    return record


def serialize_manual_mapping(mapping=None):
    mapping = mapping or {}
    normalized_kind = normalize_text(mapping.get("kind")) or "direct"
    via_operator_id = normalize_text(mapping.get("viaOperatorId"))
    provenance_mode = "operator-mediated" if via_operator_id or normalized_kind == "operator-path" else "direct-conservative"
    record = {
        "id": normalize_text(mapping.get("id")),
        "kind": normalized_kind,
        "from": serialize_endpoint(mapping.get("from")),
        "to": serialize_endpoint(mapping.get("to")),
        "provenanceMode": provenance_mode,
        "conservedLedger": normalize_inventory(mapping.get("conservedLedger")),
    }
    if via_operator_id:
        record["viaOperatorId"] = via_operator_id
    return record


def build_result_participant_index(participants=None):
    return {
        normalize_text(participant.get("id")): participant
        for participant in (participants or [])
        if normalize_text(participant.get("id"))
    }


def normalize_result_endpoint(
    endpoint=None,
    *,
    endpoint_kind="source",
    participant_index=None,
    center_output_counts=None,
):
    record = serialize_endpoint(endpoint)
    output_counts = center_output_counts if center_output_counts is not None else {}
    existing_anchor_instance_index = normalize_anchor_instance_index(record.get("anchorInstanceIndex"))
    if existing_anchor_instance_index is not None:
        record["anchorInstanceIndex"] = existing_anchor_instance_index
        return record
    role = normalize_text(record.get("role")).lower()
    participant_id = normalize_text(record.get("participantId"))
    if role in ("operator-input", "operator-output"):
        record["anchorInstanceIndex"] = 0
        return record
    if role != "center":
        return record
    if endpoint_kind == "target":
        record["anchorInstanceIndex"] = 0
        return record
    participant = (participant_index or {}).get(participant_id) or {}
    template_id = normalize_registry_template_id(participant.get("templateId"))
    if template_id == "free_architrinos":
        next_index = output_counts.get(participant_id, 0) + 1
        output_counts[participant_id] = next_index
        record["anchorInstanceIndex"] = next_index
        return record
    record["anchorInstanceIndex"] = 1
    return record


def normalize_result_mappings(mappings=None, participant_index=None):
    center_output_counts = {}
    normalized_mappings = []
    for mapping in mappings or []:
        record = deepcopy(mapping)
        record["from"] = normalize_result_endpoint(
            record.get("from"),
            endpoint_kind="source",
            participant_index=participant_index,
            center_output_counts=center_output_counts,
        )
        record["to"] = normalize_result_endpoint(
            record.get("to"),
            endpoint_kind="target",
            participant_index=participant_index,
            center_output_counts=center_output_counts,
        )
        normalized_mappings.append(record)
    return normalized_mappings


def normalize_result_operators(operators=None, participant_index=None):
    center_output_counts = {}
    normalized_operators = []
    for operator in operators or []:
        record = deepcopy(operator)
        record["inputs"] = [
            normalize_result_endpoint(
                endpoint,
                endpoint_kind="source",
                participant_index=participant_index,
                center_output_counts=center_output_counts,
            )
            for endpoint in operator.get("inputs", [])
        ]
        record["outputs"] = [
            normalize_result_endpoint(
                endpoint,
                endpoint_kind="target" if normalize_text((endpoint or {}).get("role")).lower() == "center" else "source",
                participant_index=participant_index,
                center_output_counts=center_output_counts,
            )
            for endpoint in operator.get("outputs", [])
        ]
        normalized_operators.append(record)
    return normalized_operators


def build_result_participant_placements(request=None, generated_participants=None):
    next_row_by_placement_class = {"reactant": 0, "center": 0, "product": 0}
    placements = []
    for participant in list((request or {}).get("participants", [])) + list(generated_participants or []):
        participant_id = normalize_text(participant.get("id"))
        if not participant_id:
            continue
        placement = participant.get("placement") or {}
        placement_class = normalize_text(placement.get("placementClass")).lower()
        if placement_class not in {"reactant", "center", "product"}:
            placement_class = get_reaction_result_participant_placement_class(participant)
        explicit_row = (
            max(0, to_int(placement.get("row")))
            if placement.get("row") is not None and placement.get("row") != ""
            else None
        )
        row = explicit_row if explicit_row is not None else next_row_by_placement_class[placement_class]
        next_row_by_placement_class[placement_class] = max(
            next_row_by_placement_class[placement_class],
            row + 1,
        )
        placements.append(
            {
                "participantId": participant_id,
                "placementClass": placement_class,
                "row": row,
            }
        )
    return placements


def serialize_request_metadata(request=None):
    request = request or {}
    record = {
        "schema": "solver-request/v1",
        "requestId": normalize_text(request.get("requestId")) or "solver_request",
    }
    origin = request.get("origin")
    if isinstance(origin, dict):
        normalized_origin = {}
        source_kind = normalize_text(origin.get("sourceKind"))
        source_document_id = normalize_text(origin.get("sourceDocumentId"))
        title = normalize_text(origin.get("title"))
        if source_kind:
            normalized_origin["sourceKind"] = source_kind
        if source_document_id:
            normalized_origin["sourceDocumentId"] = source_document_id
        if title:
            normalized_origin["title"] = title
        if normalized_origin:
            record["origin"] = normalized_origin
    upstream_context = request.get("upstreamContext")
    if isinstance(upstream_context, dict):
        normalized_upstream_context = {}
        for key in (
            "sourceSchema",
            "proposalId",
            "reviewBoundary",
            "source",
            "contract",
            "ranking",
            "notes",
        ):
            value = upstream_context.get(key)
            if value is None:
                continue
            normalized_upstream_context[key] = deepcopy(value)
        if normalized_upstream_context:
            record["upstreamContext"] = normalized_upstream_context
    return record


def build_auto_dissociated_participant_records(request=None, auto_dissociated_participant_ids=None, result_mappings=None):
    request = request or {}
    auto_dissociated_participant_ids = auto_dissociated_participant_ids or []
    result_mappings = result_mappings or []
    participant_by_id = {
        normalize_text(participant.get("id")): participant
        for participant in request.get("participants", [])
        if normalize_text(participant.get("id"))
    }
    records = []
    for participant_id in auto_dissociated_participant_ids:
        normalized_participant_id = normalize_text(participant_id)
        participant = participant_by_id.get(normalized_participant_id)
        if not participant:
            continue
        root_node = get_root_node(participant)
        root_node_id = normalize_text((root_node or {}).get("id"))
        if not root_node_id:
            continue
        child_nodes = get_child_nodes(participant)
        child_node_ids = [normalize_text(node.get("id")) for node in child_nodes if normalize_text(node.get("id"))]
        consumed_node_ids = sorted(build_matched_source_node_ids(result_mappings, normalized_participant_id))
        if child_node_ids:
            consumed_node_ids = [node_id for node_id in consumed_node_ids if node_id in child_node_ids]
            remaining_node_ids = [node_id for node_id in child_node_ids if node_id not in consumed_node_ids]
        else:
            consumed_node_ids = [node_id for node_id in consumed_node_ids if node_id == root_node_id]
            remaining_node_ids = [] if consumed_node_ids else [root_node_id]
        records.append(
            {
                "participantId": normalized_participant_id,
                "rootNodeId": root_node_id,
                "consumedNodeIds": consumed_node_ids,
                "remainingNodeIds": remaining_node_ids,
            }
        )
    return records


class SourceEntry:
    def __init__(self, participant, node, side, root_source=False, fragment_source=False):
        self.participant = participant
        self.node = node
        self.side = side
        self.root_source = root_source
        self.fragment_source = fragment_source
        self.consumed = False

    @property
    def participant_id(self):
        return normalize_text(self.participant.get("id"))

    @property
    def node_id(self):
        return normalize_text(self.node.get("id"))

    @property
    def template_id(self):
        return normalize_text(self.node.get("templateId")).lower()

    @property
    def polarity(self):
        return normalize_text(self.node.get("polarity")).lower()

    @property
    def inventory(self):
        return normalize_inventory(self.node.get("inventory"))


def source_entry_participant_template_id(source_entry):
    return canonical_template_id((source_entry.participant or {}).get("templateId"))


def source_entry_role(source_entry):
    return "center" if normalize_text((source_entry or {}).side).lower() == "center" else "reactant"


MESON_CONSTITUENT_PROVENANCE_TEMPLATE_IDS = {
    "pi_plus",
    "pi_minus",
    "pi0",
    "k_plus",
    "k_minus",
    "dk0",
    "sk0",
    "b_plus",
    "b_minus",
    "db0",
    "bb0",
}


def get_exact_composite_constituent_labels(source_participant=None):
    source_participant = source_participant or {}
    if canonical_template_id(source_participant.get("templateId")) not in MESON_CONSTITUENT_PROVENANCE_TEMPLATE_IDS:
        return ()
    child_nodes = get_child_nodes(source_participant)
    if not child_nodes:
        return ()
    labels = []
    for node in child_nodes:
        label = normalize_text(node.get("label")) or normalize_text(node.get("templateId"))
        if label:
            labels.append(label)
    return tuple(labels)


def build_meson_constituent_provenance_diagnostic(
    subject_participant=None,
    context_label="Exact meson closure",
):
    subject_participant = subject_participant or {}
    subject_root = get_root_node(subject_participant) or subject_participant
    subject_label = normalize_text(subject_root.get("label")) or normalize_text(subject_root.get("templateId"))
    if not subject_label:
        return None
    constituent_labels = get_exact_composite_constituent_labels(subject_participant)
    if not constituent_labels:
        return None
    constituent_label = " + ".join(constituent_labels)
    return {
        "code": "meson-constituent-provenance",
        "severity": "info",
        "message": (
            f"{context_label} preserves meson constituent provenance for {subject_label}: "
            f"{constituent_label}."
        ),
        "path": "steps[0]",
    }


def build_exact_composite_provenance_diagnostic(source_participant=None, product=None):
    constituent_labels = get_exact_composite_constituent_labels(source_participant)
    if not constituent_labels:
        return None
    return build_meson_constituent_provenance_diagnostic(
        product,
        "Exact carry-through",
    )


def build_source_entries(participant):
    participant = participant or {}
    nodes = participant.get("nodes", [])
    root_node = None
    child_nodes = []
    root_id = normalize_text(participant.get("rootNodeId"))
    for node in nodes:
        if normalize_text(node.get("id")) == root_id:
            root_node = node
        elif normalize_text(node.get("parentId")) == root_id:
            child_nodes.append(node)
    if root_node is None and nodes:
        root_node = nodes[0]
    entries = []
    if root_node:
        entries.append(
            SourceEntry(
                participant=participant,
                node=root_node,
                side=normalize_text(participant.get("side")).lower() or "reactant",
                root_source=True,
                fragment_source=False,
            )
        )
    for node in child_nodes:
        entries.append(
            SourceEntry(
                participant=participant,
                node=node,
                side=normalize_text(participant.get("side")).lower() or "reactant",
                root_source=False,
                fragment_source=True,
            )
        )
    return entries


def build_mapping(
    mapping_id,
    kind,
    from_participant_id,
    from_anchor_id,
    from_role,
    to_participant_id,
    to_anchor_id,
    to_role,
    conserved_ledger,
    provenance_mode,
    via_operator_id=None,
):
    mapping = {
        "id": mapping_id,
        "kind": kind,
        "from": {
            "participantId": from_participant_id,
            "anchorId": from_anchor_id,
            "role": from_role,
        },
        "to": {
            "participantId": to_participant_id,
            "anchorId": to_anchor_id,
            "role": to_role,
        },
        "provenanceMode": provenance_mode,
        "conservedLedger": normalize_inventory(conserved_ledger),
    }
    if via_operator_id:
        mapping["viaOperatorId"] = via_operator_id
    return mapping


def direct_match_score(source_entry, product):
    product_root = get_root_node(product)
    if not product_root:
        return None
    source_participant = source_entry.participant
    source_template_id = canonical_template_id(source_participant.get("templateId"))
    product_template_id = canonical_template_id(product.get("templateId"))
    source_child_constituents = get_child_nodes(source_participant)
    is_carry_through = (
        bool(source_participant.get("isComposite"))
        and bool(product.get("isComposite"))
        and source_template_id == product_template_id
    )
    if source_template_id != product_template_id:
        return None
    if normalize_text(source_participant.get("polarity")).lower() != normalize_text(
        product.get("polarity")
    ).lower():
        return None
    if source_template_id != "pi0" and not inventories_equal(
        source_participant.get("inventory"), product.get("inventory")
    ):
        return None
    if not source_entry.root_source:
        return None
    diagnostic_labels = []
    diagnostics = []
    if source_template_id in MESON_CONSTITUENT_PROVENANCE_TEMPLATE_IDS and source_child_constituents:
        diagnostic_labels.append("exact-carry-through")
        composite_diagnostic = build_exact_composite_provenance_diagnostic(
            source_participant,
            product,
        )
        if composite_diagnostic is not None:
            diagnostic_labels.append("meson-constituent-provenance")
            diagnostics.append(composite_diagnostic)
    return {
        "isCarryThrough": is_carry_through,
        "kind": "carry-through" if is_carry_through else "direct-map",
        "ruleFamily": "exact-identical-participant" if is_carry_through else "direct-root",
        "mappingKind": "direct",
        "provenanceMode": "carry-through" if is_carry_through else "direct-conservative",
        "sourceAnchorId": normalize_text(source_entry.node.get("id")) or "root",
        "targetAnchorId": normalize_text(product_root.get("id")) or "root",
        "mappingLedger": product_root.get("inventory"),
        "diagnosticLabels": diagnostic_labels,
        "diagnostics": diagnostics,
    }


def get_root_node(participant):
    participant = participant or {}
    root_node_id = normalize_text(participant.get("rootNodeId"))
    for node in participant.get("nodes", []):
        if normalize_text(node.get("id")) == root_node_id:
            return node
    nodes = participant.get("nodes", [])
    if nodes:
        return nodes[0]
    if root_node_id:
        root_node = {
            "id": root_node_id,
            "templateId": normalize_text(participant.get("templateId")),
            "label": normalize_text(participant.get("label"))
            or normalize_text(participant.get("templateId")),
            "inventory": normalize_inventory(participant.get("inventory")),
        }
        if participant.get("family"):
            root_node["family"] = normalize_text(participant.get("family"))
        if participant.get("polarity"):
            root_node["polarity"] = normalize_text(participant.get("polarity"))
        if "isComposite" in participant:
            root_node["isComposite"] = bool(participant.get("isComposite"))
        return root_node
    return None


def get_child_nodes(participant):
    participant = participant or {}
    root_id = normalize_text(participant.get("rootNodeId"))
    return [
        node
        for node in participant.get("nodes", [])
        if normalize_text(node.get("parentId")) == root_id
    ]


def build_matched_target_node_ids(mappings, participant_id):
    matched = set()
    normalized_participant_id = normalize_text(participant_id)
    for mapping in mappings:
        to_endpoint = (mapping or {}).get("to") or {}
        if normalize_text(to_endpoint.get("participantId")) != normalized_participant_id:
            continue
        if normalize_text(to_endpoint.get("role")) != "product":
            continue
        anchor_id = normalize_text(to_endpoint.get("anchorId"))
        if anchor_id:
            matched.add(anchor_id)
    return matched


def build_matched_source_node_ids(mappings, participant_id):
    matched = set()
    normalized_participant_id = normalize_text(participant_id)
    for mapping in mappings:
        from_endpoint = (mapping or {}).get("from") or {}
        if normalize_text(from_endpoint.get("participantId")) != normalized_participant_id:
            continue
        if normalize_text(from_endpoint.get("role")) not in {"reactant", "center"}:
            continue
        anchor_id = normalize_text(from_endpoint.get("anchorId"))
        if anchor_id:
            matched.add(anchor_id)
    return matched


def participant_target_resolved(participant, mappings):
    root_node = get_root_node(participant)
    if root_node is None:
        return False
    matched_node_ids = build_matched_target_node_ids(mappings, participant.get("id"))
    top_level_children = get_child_nodes(participant)
    if not top_level_children:
        return normalize_text(root_node.get("id")) in matched_node_ids
    return all(normalize_text(child.get("id")) in matched_node_ids for child in top_level_children)


def participant_source_resolved(participant, mappings):
    root_node = get_root_node(participant)
    if root_node is None:
        return False
    matched_node_ids = build_matched_source_node_ids(mappings, participant.get("id"))
    top_level_children = get_child_nodes(participant)
    if not top_level_children:
        return normalize_text(root_node.get("id")) in matched_node_ids
    return all(normalize_text(child.get("id")) in matched_node_ids for child in top_level_children)


def find_fragment_match(product, source_entries):
    product_root = get_root_node(product)
    if not product_root:
        return None
    product_template_id = canonical_template_id(product_root.get("templateId"))
    for source_entry in source_entries:
        if source_entry.consumed or not source_entry.fragment_source:
            continue
        if source_entry.template_id != product_template_id:
            continue
        if source_entry.polarity != normalize_text(product_root.get("polarity")).lower():
            continue
        if product_template_id != "pi0" and not inventories_equal(
            source_entry.node.get("inventory"), product_root.get("inventory")
        ):
            continue
        return source_entry
    return None


def find_associate_inputs_for_composite(product, source_entries):
    target_children = get_child_nodes(product)
    if not target_children:
        return None
    chosen = []
    used_indexes = set()
    for child in target_children:
        matched_index = None
        for index, source_entry in enumerate(source_entries):
            if index in used_indexes or source_entry.consumed:
                continue
            child_template_id = canonical_template_id(child.get("templateId"))
            if source_entry.template_id != child_template_id:
                continue
            if source_entry.polarity != normalize_text(child.get("polarity")).lower():
                continue
            if child_template_id != "pi0" and not inventories_equal(
                source_entry.node.get("inventory"), child.get("inventory")
            ):
                continue
            matched_index = index
            break
        if matched_index is None:
            return None
        used_indexes.add(matched_index)
        chosen.append((source_entries[matched_index], child))
    return chosen


def find_associate_inputs_for_standalone(product, source_entries):
    primitive_inputs = find_primitive_associate_inputs_for_standalone(product, source_entries)
    if primitive_inputs is not None:
        return primitive_inputs
    target_root = get_root_node(product)
    if not target_root:
        return None
    available_entries = [entry for entry in source_entries if not entry.consumed]
    for group_size in range(2, len(available_entries) + 1):
        for combo in itertools.combinations(available_entries, group_size):
            total_inventory = {"electrinoCount": 0, "positrinoCount": 0}
            for entry in combo:
                total_inventory = add_inventory(total_inventory, entry.inventory)
            if inventories_equal(total_inventory, target_root.get("inventory")):
                return list(combo)
    return None


def get_standalone_primitive_associate_requirement(product=None):
    target_root = get_root_node(product)
    if not target_root:
        return None
    template_id = get_effective_template_id(target_root)
    polarity = get_effective_polarity(target_root, template_id)
    return STANDALONE_PRIMITIVE_ASSOCIATE_REQUIREMENTS.get((template_id, polarity))


def rank_primitive_core_source(source_entry):
    participant_template_id = source_entry_participant_template_id(source_entry)
    participant_rank = {
        "noether_core": 0,
        "noether_pair": 1,
        "noether_quad": 2,
    }.get(participant_template_id, 3)
    return (
        participant_rank,
        0 if source_entry.root_source else 1,
        source_entry.participant_id,
        source_entry.node_id,
    )


def rank_free_architrino_source(source_entry):
    return (
        0 if source_entry.root_source else 1,
        source_entry.participant_id,
        source_entry.node_id,
    )


def find_matching_free_architrino_combo(required_inventory, source_entries):
    available_entries = sorted(
        [
            entry
            for entry in source_entries
            if not entry.consumed and source_entry_participant_template_id(entry) == "free_architrinos"
        ],
        key=rank_free_architrino_source,
    )
    for group_size in range(1, len(available_entries) + 1):
        for combo in itertools.combinations(available_entries, group_size):
            total_inventory = {"electrinoCount": 0, "positrinoCount": 0}
            for entry in combo:
                total_inventory = add_inventory(total_inventory, entry.inventory)
            if inventories_equal(total_inventory, required_inventory):
                return list(combo)
    return None


def find_primitive_associate_inputs_for_standalone(product, source_entries):
    requirement = get_standalone_primitive_associate_requirement(product)
    if requirement is None:
        return None
    candidate_core_entries = sorted(
        [
            entry
            for entry in source_entries
            if not entry.consumed
            and entry.template_id == "noether_core"
            and entry.polarity == requirement["corePolarity"]
        ],
        key=rank_primitive_core_source,
    )
    for core_entry in candidate_core_entries:
        free_combo = find_matching_free_architrino_combo(requirement["freeInventory"], source_entries)
        if free_combo is None:
            continue
        return [core_entry] + free_combo
    return None


def build_result(
    request,
    generated_steps,
    generated_mappings,
    generated_operators,
    operator_placements,
    auto_dissociated_participant_ids,
    generated_participants=None,
    diagnostics=None,
):
    request_id = normalize_text(request.get("requestId")) or "solver_request"
    raw_participants = list(request.get("participants", [])) + list(generated_participants or [])
    participants = [
        serialize_result_participant(participant)
        for participant in raw_participants
    ]
    manually_opened_participant_ids = [
        normalize_text(participant_id)
        for participant_id in ((request.get("dissociation") or {}).get("manuallyOpenedParticipantIds") or [])
        if normalize_text(participant_id)
    ]
    manual_operators = [
        serialize_manual_operator(operator) for operator in request.get("manualOperators", [])
    ]
    manual_operator_placements = []
    for operator in request.get("manualOperators", []):
        placement = operator.get("placement") or {}
        if not normalize_text(operator.get("id")):
            continue
        manual_operator_placements.append(
            {
                "operatorId": normalize_text(operator.get("id")),
                "lane": max(0, to_int(placement.get("lane"))),
                "row": max(0, to_int(placement.get("row"))),
                "slot": max(0, to_int(placement.get("slot"))),
            }
        )
    manual_mappings = [
        serialize_manual_mapping(mapping) for mapping in request.get("manualMappings", [])
    ]
    participant_index = build_result_participant_index(participants)
    normalized_operators = normalize_result_operators(
        manual_operators + generated_operators,
        participant_index=participant_index,
    )
    all_result_mappings = normalize_result_mappings(
        manual_mappings + generated_mappings,
        participant_index=participant_index,
    )
    participant_placements = build_result_participant_placements(
        request=request,
        generated_participants=generated_participants,
    )
    all_operator_placements = manual_operator_placements + operator_placements
    auto_dissociated_participants = build_auto_dissociated_participant_records(
        request=request,
        auto_dissociated_participant_ids=auto_dissociated_participant_ids,
        result_mappings=all_result_mappings,
    )
    unresolved_target_ids = collect_unresolved_target_ids(request, all_result_mappings)
    unused_source_ids = collect_unused_source_ids(
        request,
        all_result_mappings,
        auto_dissociated_participant_ids,
        unresolved_target_ids,
    )
    outcome = "exact"
    if unresolved_target_ids and (manual_mappings or generated_mappings):
        outcome = "partial"
    elif unresolved_target_ids:
        outcome = "no-solution"

    target_inventory = {"electrinoCount": 0, "positrinoCount": 0}
    for participant in request.get("participants", []):
        if normalize_text(participant.get("side")).lower() != "product":
            continue
        if normalize_text(participant.get("id")) not in unresolved_target_ids:
            continue
        target_inventory = add_inventory(target_inventory, participant.get("inventory"))

    registry_diagnostics = build_registry_validation_diagnostics(
        participants=participants,
        operators=normalized_operators,
    )
    connection_policy_diagnostics = build_connection_policy_validation_diagnostics(
        mappings=all_result_mappings,
        participant_placements=participant_placements,
        operator_placements=all_operator_placements,
    )
    connector_completeness_diagnostics = build_connector_completeness_validation_diagnostics(
        participants=participants,
        operators=normalized_operators,
        mappings=all_result_mappings,
        participant_placements=participant_placements,
    )
    structural_validation_errors = (
        list(registry_diagnostics)
        + list(connection_policy_diagnostics)
        + list(connector_completeness_diagnostics)
    )
    if structural_validation_errors:
        outcome = "partial" if (manual_mappings or generated_mappings or manual_operators or generated_operators) else "no-solution"

    return {
        "schema": "solver-result/v1",
        "resultId": f"{request_id}_result",
        "request": serialize_request_metadata(request),
        "summary": {
            "outcome": outcome,
            "exact": len(unresolved_target_ids) == 0 and not structural_validation_errors,
            "selectedPlanId": f"plan_{request_id}",
            "unresolvedTargetCount": len(unresolved_target_ids),
            "ambiguityCount": 0,
            "unsupportedCount": 0,
        },
        "participants": participants,
        "steps": generated_steps,
        "mappings": all_result_mappings,
        "operators": normalized_operators,
        "dissociation": {
            "openedParticipantIds": list(
                dict.fromkeys(manually_opened_participant_ids + list(auto_dissociated_participant_ids))
            ),
            "autoDissociatedParticipantIds": list(auto_dissociated_participant_ids),
            "autoDissociatedParticipants": auto_dissociated_participants,
            "releasedParticipantIds": [],
            "notes": (
                [
                    {
                        "code": "auto-dissociate-composite",
                        "message": "Composite source opened implicitly because internal rows were consumed."
                        if len(generated_steps) > 1
                        else "Composite source opened implicitly because an internal row was consumed.",
                    }
                ]
                if auto_dissociated_participant_ids
                else []
            ),
        },
        "placement": {
            "participantPlacements": participant_placements,
            "operatorPlacements": all_operator_placements,
        },
        "residue": {
            "unresolvedTargetIds": unresolved_target_ids,
            "unusedSourceIds": unused_source_ids,
            "sourceInventory": {
                "electrinoCount": 0,
                "positrinoCount": 0,
            },
            "targetInventory": target_inventory,
            "unsupportedNotes": [],
        },
        "diagnostics": list(diagnostics or []) + structural_validation_errors,
    }


def collect_unresolved_target_ids(request, result_mappings):
    unresolved = []
    for participant in request.get("participants", []):
        if normalize_text(participant.get("side")).lower() != "product":
            continue
        participant_id = normalize_text(participant.get("id"))
        if not participant_target_resolved(participant, result_mappings):
            unresolved.append(participant_id)
    return unresolved


def collect_unused_source_ids(request, result_mappings, auto_dissociated_participant_ids, unresolved_target_ids):
    if not unresolved_target_ids:
        return []
    unused_source_ids = []
    for participant in request.get("participants", []):
        side = normalize_text(participant.get("side")).lower()
        if side not in ("reactant", "center"):
            continue
        participant_id = normalize_text(participant.get("id"))
        if participant_id in auto_dissociated_participant_ids or not participant_source_resolved(
            participant, result_mappings
        ):
            unused_source_ids.append(participant_id)
    return unused_source_ids


def solve_request(request):
    participants = request.get("participants", [])
    reactant_participants = [
        participant
        for participant in participants
        if normalize_text(participant.get("side")).lower() == "reactant"
    ]
    center_participants = [
        participant
        for participant in participants
        if normalize_text(participant.get("side")).lower() == "center"
    ]
    source_participants = reactant_participants + center_participants
    product_participants = [
        participant
        for participant in participants
        if normalize_text(participant.get("side")).lower() == "product"
    ]
    if (
        not request.get("manualOperators")
        and not request.get("manualMappings")
        and not center_participants
    ):
        supported_generic_weak_channel = match_generic_weak_channel(
            reactant_participants,
            product_participants,
        )
    else:
        supported_generic_weak_channel = None
    if supported_generic_weak_channel is not None:
        result = solve_generic_weak_channel(
            request,
            reactant_participants,
            product_participants,
            supported_generic_weak_channel,
        )
        if result is not None and result.get("summary", {}).get("exact") is True:
            return result
    source_entries = []
    for participant in source_participants:
        source_entries.extend(build_source_entries(participant))

    steps = []
    mappings = []
    operators = []
    operator_placements = []
    diagnostics = []
    auto_dissociated_participant_ids = []
    resolved_product_ids = set()
    operator_count = 0

    # Exact direct and carry-through pass.
    for product in product_participants:
        product_id = normalize_text(product.get("id"))
        if product_id in resolved_product_ids:
            continue
        for source_entry in source_entries:
            if source_entry.consumed:
                continue
            direct_match = direct_match_score(source_entry, product)
            if direct_match is None:
                continue
            source_entry.consumed = True
            resolved_product_ids.add(product_id)
            mapping_id = (
                f"map_{product_id.replace('product_', 'direct_')}"
                if direct_match["kind"] == "direct-map"
                else f"map_{len(mappings) + 1}"
            )
            mappings.append(
                build_mapping(
                    mapping_id=mapping_id,
                    kind=direct_match["mappingKind"],
                    from_participant_id=source_entry.participant_id,
                    from_anchor_id=direct_match["sourceAnchorId"],
                    from_role=source_entry_role(source_entry),
                    to_participant_id=product_id,
                    to_anchor_id=direct_match["targetAnchorId"],
                    to_role="product",
                    conserved_ledger=direct_match["mappingLedger"],
                    provenance_mode=direct_match["provenanceMode"],
                )
            )
            diagnostics.extend(direct_match.get("diagnostics") or [])
            step = {
                "stepId": (
                    f"step_direct_{normalize_text(product.get('polarity')).lower()}"
                    if direct_match["kind"] == "direct-map"
                    else f"step_{len(steps) + 1}"
                ),
                "kind": direct_match["kind"],
                "ruleFamily": direct_match["ruleFamily"],
                "consumedParticipantIds": [source_entry.participant_id],
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": [mapping_id],
                "operatorIds": [],
            }
            if direct_match.get("diagnosticLabels"):
                step["diagnosticLabels"] = list(direct_match["diagnosticLabels"])
            steps.append(step)
            break

    # Fragment-to-root pass.
    for product in product_participants:
        product_id = normalize_text(product.get("id"))
        if product_id in resolved_product_ids:
            continue
        product_root = get_root_node(product)
        if product_root is None or get_child_nodes(product):
            continue
        fragment_match = find_fragment_match(product, source_entries)
        if fragment_match is None:
            continue
        fragment_match.consumed = True
        resolved_product_ids.add(product_id)
        if fragment_match.participant_id not in auto_dissociated_participant_ids:
            auto_dissociated_participant_ids.append(fragment_match.participant_id)
        mapping_id = f"map_fragment_{normalize_text(product.get('templateId')).lower()}"
        mappings.append(
            build_mapping(
                mapping_id=mapping_id,
                kind="fragment",
                from_participant_id=fragment_match.participant_id,
                from_anchor_id=fragment_match.node_id,
                from_role=source_entry_role(fragment_match),
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")),
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="direct-conservative",
            )
        )
        steps.append(
            {
                "stepId": f"step_fragment_{normalize_text(product.get('templateId')).lower()}",
                "kind": "direct-map",
                "ruleFamily": "fragment-to-root",
                "consumedParticipantIds": [fragment_match.participant_id],
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": [mapping_id],
                "operatorIds": [],
            }
        )

    # Associate for composite targets.
    for product in product_participants:
        product_id = normalize_text(product.get("id"))
        if product_id in resolved_product_ids:
            continue
        target_children = get_child_nodes(product)
        if not target_children:
            continue
        chosen_inputs = find_associate_inputs_for_composite(product, source_entries)
        if chosen_inputs is None:
            continue
        operator_count += 1
        operator_id = f"associate:{operator_count}"
        operator_mapping_ids = []
        operator_inputs = []
        operator_outputs = []
        for source_entry, child in chosen_inputs:
            source_entry.consumed = True
            if source_entry.fragment_source and source_entry.participant_id not in auto_dissociated_participant_ids:
                auto_dissociated_participant_ids.append(source_entry.participant_id)
            mapping_in_id = f"map_{normalize_text(product.get('id')).replace('product_', '')}_in_{normalize_text(child.get('polarity')).lower() or len(operator_mapping_ids) + 1}"
            mappings.append(
                build_mapping(
                    mapping_id=mapping_in_id,
                    kind="operator-path",
                    from_participant_id=source_entry.participant_id,
                    from_anchor_id=source_entry.node_id,
                    from_role=source_entry_role(source_entry),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger=source_entry.inventory,
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            operator_mapping_ids.append(mapping_in_id)
            operator_inputs.append(
                {
                    "participantId": source_entry.participant_id,
                    "anchorId": source_entry.node_id,
                    "role": source_entry_role(source_entry),
                }
            )
            mapping_out_id = f"map_{normalize_text(product.get('id')).replace('product_', '')}_out_{normalize_text(child.get('polarity')).lower() or len(operator_mapping_ids) + 1}"
            mappings.append(
                build_mapping(
                    mapping_id=mapping_out_id,
                    kind="operator-path",
                    from_participant_id=operator_id,
                    from_anchor_id="root",
                    from_role="operator-output",
                    to_participant_id=product_id,
                    to_anchor_id=normalize_text(child.get("id")),
                    to_role="product",
                    conserved_ledger=child.get("inventory"),
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            operator_mapping_ids.append(mapping_out_id)
            operator_outputs.append(
                {
                    "participantId": product_id,
                    "anchorId": normalize_text(child.get("id")),
                    "role": "product",
                }
            )
        resolved_product_ids.add(product_id)
        operators.append(
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Associate",
                "inputs": operator_inputs,
                "outputs": operator_outputs,
            }
        )
        operator_placements.append(
            {
                "operatorId": operator_id,
                "lane": 1,
                "row": operator_count * 2 - 1,
                "slot": operator_count * 2 - 1,
            }
        )
        steps.append(
            {
                "stepId": f"step_{normalize_text(product.get('id'))}",
                "kind": "associate",
                "ruleFamily": (
                    "associate-photon"
                    if normalize_text(product.get("templateId")).lower() == "photon"
                    else "associate-composite"
                ),
                "consumedParticipantIds": sorted(
                    {source_entry.participant_id for source_entry, _ in chosen_inputs}
                ),
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": operator_mapping_ids,
                "operatorIds": [operator_id],
            }
        )

    # Associate for standalone targets.
    for product in product_participants:
        product_id = normalize_text(product.get("id"))
        if product_id in resolved_product_ids:
            continue
        product_root = get_root_node(product)
        if product_root is None or get_child_nodes(product):
            continue
        chosen_inputs = find_associate_inputs_for_standalone(product, source_entries)
        if chosen_inputs is None:
            continue
        operator_count += 1
        operator_id = f"associate:{operator_count}"
        operator_mapping_ids = []
        operator_inputs = []
        for source_entry in chosen_inputs:
            source_entry.consumed = True
            if source_entry.fragment_source and source_entry.participant_id not in auto_dissociated_participant_ids:
                auto_dissociated_participant_ids.append(source_entry.participant_id)
            mapping_id = f"map_{product_id.replace('product_', '')}_in_{normalize_text(source_entry.participant.get('templateId')).lower()}"
            if normalize_text(source_entry.participant.get("templateId")).lower() == "free_architrinos":
                mapping_id = f"map_{product_id.replace('product_', '')}_in_free"
            elif normalize_text(source_entry.participant.get("templateId")).lower() == "noether_core":
                mapping_id = f"map_{product_id.replace('product_', '')}_in_core"
            mappings.append(
                build_mapping(
                    mapping_id=mapping_id,
                    kind="operator-path",
                    from_participant_id=source_entry.participant_id,
                    from_anchor_id=source_entry.node_id,
                    from_role=source_entry_role(source_entry),
                    to_participant_id=operator_id,
                    to_anchor_id="root",
                    to_role="operator-input",
                    conserved_ledger=source_entry.inventory,
                    provenance_mode="operator-mediated",
                    via_operator_id=operator_id,
                )
            )
            operator_mapping_ids.append(mapping_id)
            operator_inputs.append(
                {
                    "participantId": source_entry.participant_id,
                    "anchorId": source_entry.node_id,
                    "role": source_entry_role(source_entry),
                }
            )
        mapping_out_id = f"map_{product_id.replace('product_', '')}_out"
        mappings.append(
            build_mapping(
                mapping_id=mapping_out_id,
                kind="operator-path",
                from_participant_id=operator_id,
                from_anchor_id="root",
                from_role="operator-output",
                to_participant_id=product_id,
                to_anchor_id=normalize_text(product_root.get("id")),
                to_role="product",
                conserved_ledger=product_root.get("inventory"),
                provenance_mode="operator-mediated",
                via_operator_id=operator_id,
            )
        )
        operator_mapping_ids.append(mapping_out_id)
        operators.append(
            {
                "id": operator_id,
                "type": "associate",
                "origin": "solve-generated",
                "label": "Associate",
                "inputs": operator_inputs,
                "outputs": [
                    {
                        "participantId": product_id,
                        "anchorId": normalize_text(product_root.get("id")),
                        "role": "product",
                    }
                ],
            }
        )
        operator_placements.append(
            {
                "operatorId": operator_id,
                "lane": 1,
                "row": operator_count * 2 - 1,
                "slot": operator_count * 2 - 1,
            }
        )
        resolved_product_ids.add(product_id)
        steps.append(
            {
                "stepId": f"step_{product_id}",
                "kind": "associate",
                "ruleFamily": "associate-standalone",
                "consumedParticipantIds": sorted({entry.participant_id for entry in chosen_inputs}),
                "producedParticipantIds": [],
                "resolvedTargetIds": [product_id],
                "mappingIds": operator_mapping_ids,
                "operatorIds": [operator_id],
            }
        )

    if auto_dissociated_participant_ids:
        steps = [
            {
                "stepId": "step_auto_dissociate",
                "kind": "dissociate",
                "ruleFamily": "auto-dissociate-composite",
                "consumedParticipantIds": list(auto_dissociated_participant_ids),
                "producedParticipantIds": [],
                "resolvedTargetIds": [],
                "mappingIds": [],
                "operatorIds": [],
            }
        ] + steps

    return build_result(
        request=request,
        generated_steps=steps,
        generated_mappings=mappings,
        generated_operators=operators,
        operator_placements=operator_placements,
        auto_dissociated_participant_ids=auto_dissociated_participant_ids,
        diagnostics=diagnostics,
    )


def main():
    request = json.load(sys.stdin)
    result = solve_request(request)
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
