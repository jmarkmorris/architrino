#!/usr/bin/env python3

import itertools
import json
import sys
from copy import deepcopy
from collections import Counter


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
    if normalized_template_id in {
        "electron",
        "neutrino",
        "up_quark",
        "down_quark",
        "noether_core",
    }:
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


def match_generic_proton_channel(product_counter):
    baryon_count = count_signatures(product_counter, template_id="proton") + count_signatures(
        product_counter, template_id="neutron"
    )
    if baryon_count > 1:
        return None
    if count_signatures(product_counter, template_id="neutrino") > 0 and count_signatures(
        product_counter, template_id="neutron"
    ) == 0:
        return None

    charged_lepton_count = count_signatures(product_counter, template_id="electron")
    photon_count = count_signatures(product_counter, template_id="photon")
    anti_lepton_count = count_signatures(product_counter, template_id="electron", polarity="anti")
    pro_lepton_count = count_signatures(product_counter, template_id="electron", polarity="pro")
    proton_product_count = count_signatures(product_counter, template_id="proton")
    neutron_product_count = count_signatures(product_counter, template_id="neutron")
    neutrino_pro_count = count_signatures(product_counter, template_id="neutrino", polarity="pro")
    neutrino_anti_count = count_signatures(product_counter, template_id="neutrino", polarity="anti")

    if proton_product_count == 0 and neutron_product_count == 0:
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
    if source_counter == Counter({("proton", "", ""): 1}):
        return match_generic_proton_channel(product_counter)
    if source_counter == Counter({("neutron", "", ""): 1}):
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
        side="center",
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
        side="center",
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


def product_requires_lepton_core(participant=None):
    template_id = get_effective_template_id(get_participant_root_or_self(participant))
    return template_id in {"electron", "neutrino"}


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
            source_step_id=ledger_step_id,
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
            source_step_id=ledger_step_id,
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
            "producedParticipantIds": generated_core_ids
            + [free_pool_id]
            + generated_noether_pair_ids
            + generated_noether_quad_ids,
            "resolvedTargetIds": [],
            "mappingIds": [],
            "operatorIds": [],
            "diagnosticLabels": ["shared-free-architrino-pool"]
            + (["noether-pair-supplement"] if generated_noether_pair_ids else [])
            + (["noether-quad-supplement"] if generated_noether_quad_ids else []),
        },
    ]
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
                from_role="reactant",
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
                from_role="reactant",
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
                        "role": "reactant",
                    },
                    {
                        "participantId": free_pool_id,
                        "anchorId": free_pool_root_id,
                        "role": "reactant",
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


def solve_generic_weak_channel(request, source_participants, product_participants, family):
    source_participant = source_participants[0]
    source_root = get_root_node(source_participant)
    if source_root is None:
        return None
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
        if meson_result is not None:
            return meson_result
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
                "diagnosticLabels": [
                    "implicit-weak-center",
                    "noether-core-provenance",
                    "generic-weak-channel",
                ],
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
    source_template_id = canonical_template_id(source_participant.get("templateId"))
    product_template_id = canonical_template_id(product.get("templateId"))
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
        if normalize_text(from_endpoint.get("role")) != "reactant":
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


def build_result(
    request,
    generated_steps,
    generated_mappings,
    generated_operators,
    operator_placements,
    auto_dissociated_participant_ids,
    generated_participants=None,
):
    request_id = normalize_text(request.get("requestId")) or "solver_request"
    participants = [
        serialize_result_participant(participant)
        for participant in list(request.get("participants", [])) + list(generated_participants or [])
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
    all_result_mappings = manual_mappings + generated_mappings
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
        "mappings": all_result_mappings,
        "operators": manual_operators + generated_operators,
        "dissociation": {
            "openedParticipantIds": list(
                dict.fromkeys(manually_opened_participant_ids + list(auto_dissociated_participant_ids))
            ),
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
        if result is not None:
            return result
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
