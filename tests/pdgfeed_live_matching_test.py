from pathlib import Path
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pdgfeed


class FakeItem:
    def __init__(self, name, *, has_particle=True):
        self.name = name
        self.particle = object() if has_particle else None


class FakeDecayProduct:
    def __init__(self, name, *, multiplier=1, has_particle=True):
        self.multiplier = multiplier
        self.item = FakeItem(name, has_particle=has_particle)


class FakeDecay:
    def __init__(self, description, products, *, mode_number=0, subdecays=None):
        self.description = description
        self.decay_products = products
        self.mode_number = mode_number
        self._subdecays = list(subdecays or [])

    def subdecays(self):
        return list(self._subdecays)


class FakeParticle:
    def __init__(self, decays):
        self._decays = list(decays)

    def exclusive_branching_fractions(self):
        return list(self._decays)


class FakeApi:
    def __init__(self, decays):
        self._particle = FakeParticle(decays)

    def get_particle_by_name(self, name):
        self.last_particle_name = name
        return self._particle

    def get_canonical_name(self, name):
        return name


class FindLiveDecayTests(unittest.TestCase):
    def test_matches_by_product_signature_when_description_order_differs(self):
        api = FakeApi(
            [
                FakeDecay(
                    "n --> p anti-nu_e e-",
                    [
                        FakeDecayProduct("p"),
                        FakeDecayProduct("nubar_e"),
                        FakeDecayProduct("e-"),
                    ],
                    mode_number=2,
                )
            ]
        )
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["free_neutron_beta_decay"]

        decay, products, notes = pdgfeed.find_live_decay(api, spec)

        self.assertEqual(decay.description, "n --> p anti-nu_e e-")
        self.assertEqual([product.name for product in products], ["p", "nubar_e", "e-"])
        self.assertEqual(notes, [])

    def test_prefers_exact_description_when_multiple_product_matches_exist(self):
        api = FakeApi(
            [
                FakeDecay(
                    "mu- --> nu_mu e- anti-nu_e",
                    [
                        FakeDecayProduct("nu_mu"),
                        FakeDecayProduct("e-"),
                        FakeDecayProduct("anti-nu_e"),
                    ],
                    mode_number=2,
                ),
                FakeDecay(
                    "mu- -> e- anti-nu_e nu_mu",
                    [
                        FakeDecayProduct("e-"),
                        FakeDecayProduct("anti-nu_e"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=3,
                ),
            ]
        )
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["muon_decay"]

        decay, _, _ = pdgfeed.find_live_decay(api, spec)

        self.assertEqual(decay.description, "mu- -> e- anti-nu_e nu_mu")

    def test_live_charged_pion_case_stays_proposal_only_until_pdgsolve_request_v1_expands(self):
        api = FakeApi(
            [
                FakeDecay(
                    "pi+ -> mu+ nu_mu",
                    [
                        FakeDecayProduct("mu+"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=1,
                )
            ]
        )
        api.edition = "2025"
        api.info = lambda key: "PDG Python API database read"
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["charged_pion_to_muon_neutrino"]

        with patch.object(pdgfeed, "connect_pdg", return_value=api):
            live_case = pdgfeed.load_live_case(spec)

        proposal = pdgfeed.build_proposal(live_case)

        self.assertEqual(live_case.source_kind, "pdg-live")
        self.assertEqual(live_case.case_id, "charged_pion_to_muon_neutrino")
        self.assertEqual(proposal.exportable, False)
        self.assertEqual(
            proposal.notes,
            (
                "unsupported:reactant:pi+:no-pdgsolve-request-v1-mapping",
                "unsupported:product:mu+:no-pdgsolve-request-v1-mapping",
                "unsupported:product:nu_mu:no-pdgsolve-request-v1-mapping",
            ),
        )
        pdgsolve_request = pdgfeed.build_pdgsolve_request(proposal)
        self.assertIsNone(pdgsolve_request)

    def test_live_registry_includes_supported_radiative_and_pair_extension_cases(self):
        expected_case_ids = {
            "free_neutron_beta_decay",
            "radiative_free_neutron_beta_decay",
            "muon_decay",
            "radiative_muon_decay",
            "muon_decay_with_electron_positron_pair",
            "muon_to_electron_photon",
            "charged_pion_to_muon_neutrino",
        }

        self.assertTrue(expected_case_ids.issubset(set(pdgfeed.LIVE_CHANNEL_SPEC_BY_ID)))


if __name__ == "__main__":
    unittest.main()
