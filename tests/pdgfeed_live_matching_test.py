import unittest

import pdgfeed


class FakeItem:
    def __init__(self, name):
        self.name = name
        self.item_type = "particle"
        self.particle = True


class FakeDecayProduct:
    def __init__(self, name, *, multiplier=1):
        self.multiplier = multiplier
        self.subdecay = None
        self.item = FakeItem(name)


class FakeDecay:
    def __init__(self, description, products, *, pdgid="fake", mode_number=1):
        self.description = description
        self.decay_products = products
        self.pdgid = pdgid
        self.mode_number = mode_number
        self.display_value_text = ""


class FakeParticle:
    def __init__(self, name, decays):
        self.name = name
        self._decays = list(decays)

    def exclusive_branching_fractions(self, *args, **kwargs):
        return list(self._decays)


class FakeApi:
    def __init__(self, particles):
        self._particles = {particle.name: particle for particle in particles}
        self.edition = "2025"

    def get_particle_by_name(self, name):
        return self._particles[name]

    def get_canonical_name(self, name):
        aliases = {"nubar_e": "anti-nu_e"}
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API database read"


class FindLiveDecayTests(unittest.TestCase):
    def test_matches_by_product_signature_when_description_order_differs(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "mu- --> nu_mu e- nubar_e",
                            [
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                            ],
                            pdgid="S004.1/2025",
                            mode_number=2,
                        )
                    ],
                )
            ]
        )
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["muon_decay"]

        decay, products, notes = pdgfeed.find_live_decay(api, spec)

        self.assertEqual(decay.description, "mu- --> nu_mu e- nubar_e")
        self.assertEqual([product.name for product in products], ["nu_mu", "e-", "nubar_e"])
        self.assertEqual(notes, [])

    def test_prefers_exact_description_when_multiple_product_matches_exist(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "mu- --> nu_mu e- anti-nu_e",
                            [
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                            ],
                            pdgid="alt",
                            mode_number=2,
                        ),
                        FakeDecay(
                            "mu- -> e- anti-nu_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                            pdgid="exact",
                            mode_number=3,
                        ),
                    ],
                )
            ]
        )
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["muon_decay"]

        decay, _, _ = pdgfeed.find_live_decay(api, spec)

        self.assertEqual(decay.pdgid, "exact")

    def test_load_live_case_keeps_curated_case_id_and_canonicalizes_aliases(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "mu- -> e- nubar_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                            pdgid="S004.1/2025",
                        )
                    ],
                )
            ]
        )
        spec = pdgfeed.LIVE_CHANNEL_SPEC_BY_ID["muon_decay"]

        live_case = pdgfeed.load_live_case(spec, api=api)
        proposal = pdgfeed.build_proposal(live_case)
        request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertEqual(live_case.case_id, "muon_decay")
        self.assertEqual(proposal.products[1].pdg_name, "anti-nu_e")
        self.assertIsNotNone(request)
        self.assertEqual(
            [entry["assemblyId"] for entry in request["products"]],
            ["pro_electron_I", "anti_electron_neutrino_I", "pro_muon_neutrino_II"],
        )


if __name__ == "__main__":
    unittest.main()

