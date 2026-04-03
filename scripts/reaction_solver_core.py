#!/usr/bin/env python3

import itertools
import json
import sys
from copy import deepcopy


def normalize_text(value=""):
    return str(value or "").strip()


def to_int(value, fallback=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


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


def participant_origin(participant=None):
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
    return {
        "participantId": normalize_text(endpoint.get("participantId")),
        "anchorId": normalize_text(endpoint.get("anchorId")) or "root",
        "role": normalize_text(endpoint.get("role")) or "reactant",
    }


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
    is_carry_through = (
        bool(source_participant.get("isComposite"))
        and bool(product.get("isComposite"))
        and normalize_text(source_participant.get("templateId")).lower()
        == normalize_text(product.get("templateId")).lower()
    )
    if (
        normalize_text(source_participant.get("templateId")).lower()
        != normalize_text(product.get("templateId")).lower()
    ):
        return None
    if normalize_text(source_participant.get("polarity")).lower() != normalize_text(
        product.get("polarity")
    ).lower():
        return None
    if not inventories_equal(source_participant.get("inventory"), product.get("inventory")):
        return None
    if not source_entry.root_source:
        return None
    return {
        "isCarryThrough": is_carry_through,
        "kind": "carry-through" if is_carry_through else "direct-map",
        "ruleFamily": "exact-identical-participant" if is_carry_through else "direct-root",
        "mappingKind": "direct",
        "provenanceMode": "carry-through" if is_carry_through else "direct-conservative",
        "sourceAnchorId": normalize_text(source_entry.node.get("id")) or "root",
        "targetAnchorId": normalize_text(product_root.get("id")) or "root",
        "mappingLedger": product_root.get("inventory"),
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


def find_fragment_match(product, source_entries):
    product_root = get_root_node(product)
    if not product_root:
        return None
    for source_entry in source_entries:
        if source_entry.consumed or not source_entry.fragment_source:
            continue
        if source_entry.template_id != normalize_text(product_root.get("templateId")).lower():
            continue
        if source_entry.polarity != normalize_text(product_root.get("polarity")).lower():
            continue
        if not inventories_equal(source_entry.node.get("inventory"), product_root.get("inventory")):
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
            if source_entry.template_id != normalize_text(child.get("templateId")).lower():
                continue
            if source_entry.polarity != normalize_text(child.get("polarity")).lower():
                continue
            if not inventories_equal(source_entry.node.get("inventory"), child.get("inventory")):
                continue
            matched_index = index
            break
        if matched_index is None:
            return None
        used_indexes.add(matched_index)
        chosen.append((source_entries[matched_index], child))
    return chosen


def find_associate_inputs_for_standalone(product, source_entries):
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


def build_result(request, generated_steps, generated_mappings, generated_operators, operator_placements, auto_dissociated_participant_ids):
    request_id = normalize_text(request.get("requestId")) or "solver_request"
    participants = [serialize_result_participant(participant) for participant in request.get("participants", [])]
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
    unresolved_target_ids = collect_unresolved_target_ids(request, generated_steps)
    unused_source_ids = collect_unused_source_ids(request, generated_steps, auto_dissociated_participant_ids)
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

    return {
        "schema": "solver-result/v1",
        "resultId": f"{request_id}_result",
        "request": {
            "schema": "solver-request/v1",
            "requestId": request_id,
        },
        "summary": {
            "outcome": outcome,
            "exact": len(unresolved_target_ids) == 0,
            "selectedPlanId": f"plan_{request_id}",
            "unresolvedTargetCount": len(unresolved_target_ids),
            "ambiguityCount": 0,
            "unsupportedCount": 0,
        },
        "participants": participants,
        "steps": generated_steps,
        "mappings": manual_mappings + generated_mappings,
        "operators": manual_operators + generated_operators,
        "dissociation": {
            "openedParticipantIds": list(auto_dissociated_participant_ids),
            "autoDissociatedParticipantIds": list(auto_dissociated_participant_ids),
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
            "operatorPlacements": manual_operator_placements + operator_placements,
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
        "diagnostics": [],
    }


def collect_unresolved_target_ids(request, generated_steps):
    resolved = set()
    for step in generated_steps:
        for target_id in step.get("resolvedTargetIds", []):
            resolved.add(normalize_text(target_id))
    unresolved = []
    for participant in request.get("participants", []):
        if normalize_text(participant.get("side")).lower() != "product":
            continue
        participant_id = normalize_text(participant.get("id"))
        if participant_id not in resolved:
            unresolved.append(participant_id)
    return unresolved


def collect_unused_source_ids(request, generated_steps, auto_dissociated_participant_ids):
    consumed_source_ids = set()
    for step in generated_steps:
        for participant_id in step.get("consumedParticipantIds", []):
            consumed_source_ids.add(normalize_text(participant_id))
    unresolved_targets = set(collect_unresolved_target_ids(request, generated_steps))
    if not unresolved_targets:
        return []
    unused_source_ids = []
    for participant in request.get("participants", []):
        side = normalize_text(participant.get("side")).lower()
        if side not in ("reactant", "center"):
            continue
        participant_id = normalize_text(participant.get("id"))
        if participant_id in auto_dissociated_participant_ids or participant_id not in consumed_source_ids:
            unused_source_ids.append(participant_id)
    return unused_source_ids


def solve_request(request):
    participants = request.get("participants", [])
    source_participants = [
        participant
        for participant in participants
        if normalize_text(participant.get("side")).lower() in ("reactant", "center")
    ]
    product_participants = [
        participant
        for participant in participants
        if normalize_text(participant.get("side")).lower() == "product"
    ]
    source_entries = []
    for participant in source_participants:
        source_entries.extend(build_source_entries(participant))

    steps = []
    mappings = []
    operators = []
    operator_placements = []
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
                    from_role="reactant",
                    to_participant_id=product_id,
                    to_anchor_id=direct_match["targetAnchorId"],
                    to_role="product",
                    conserved_ledger=direct_match["mappingLedger"],
                    provenance_mode=direct_match["provenanceMode"],
                )
            )
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
            if direct_match["kind"] == "carry-through":
                step["diagnosticLabels"] = ["exact-carry-through"]
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
                from_role="reactant",
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
                    from_role="reactant",
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
                    "role": "reactant",
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
                    from_role="reactant",
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
                    "role": "reactant",
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
    )


def main():
    request = json.load(sys.stdin)
    result = solve_request(request)
    json.dump(result, sys.stdout, indent=2)
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
