import unittest

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


if __name__ == "__main__":
    unittest.main()
