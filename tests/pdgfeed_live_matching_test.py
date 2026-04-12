import unittest

import pdgfeed


class FakeItem:
    def __init__(self, name, *, item_type="particle", particle=True):
        self.name = name
        self.item_type = item_type
        self.particle = particle


class FakeDecayProduct:
    def __init__(self, name, *, multiplier=1, subdecay=None, particle=True, item_type="particle"):
        self.multiplier = multiplier
        self.subdecay = subdecay
        self.item = FakeItem(name, item_type=item_type, particle=particle)


class FakeDecay:
    def __init__(self, description, products, *, pdgid="fake", mode_number=1, display_value_text=""):
        self.description = description
        self.decay_products = products
        self.pdgid = pdgid
        self.mode_number = mode_number
        self.display_value_text = display_value_text


class FakeParticle:
    def __init__(self, name, decays, *, mcid=None):
        self.name = name
        self._decays = list(decays)
        self.mcid = mcid

    def exclusive_branching_fractions(self, *args, **kwargs):
        return list(self._decays)


class FakeApi:
    def __init__(self, particles):
        self._particles = {particle.name: particle for particle in particles}
        self._particle_lists = [[particle] for particle in particles]
        self.edition = "2025"

    def get_particle_by_name(self, name):
        return self._particles[name]

    def get_particles(self):
        return list(self._particle_lists)

    def get_canonical_name(self, name):
        aliases = {
            "nubar_e": "anti-nu_e",
            "nubar_mu": "anti-nu_mu",
        }
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API database read"


class PdgfeedLiveTests(unittest.TestCase):
    def test_known_status_uses_exact_mcid_and_pdg_identifier_key(self):
        self.assertEqual(
            pdgfeed.known_reaction_status_from_source({"mcid": 13, "pdgIdentifier": "S004.1/2025"}),
            "k",
        )
        self.assertEqual(
            pdgfeed.known_reaction_status_from_source({"mcid": -13, "pdgIdentifier": "S004.1/2025"}),
            "u",
        )
        self.assertEqual(
            pdgfeed.known_reaction_status_from_source({"mcid": 13, "pdgIdentifier": "S004.1/2024"}),
            "u",
        )

    def test_load_live_case_from_decay_uses_particle_identity_for_channel_and_case_id(self):
        api = FakeApi(
            [
                FakeParticle(
                    "B-",
                    [
                        FakeDecay(
                            "B+ --> e+ nu_e",
                            [FakeDecayProduct("e+"), FakeDecayProduct("nu_e")],
                            pdgid="S041.473/2025",
                            mode_number=2,
                        )
                    ],
                    mcid=-521,
                )
            ]
        )
        particle = api.get_particle_by_name("B-")
        decay = particle.exclusive_branching_fractions()[0]

        case = pdgfeed.load_live_case_from_decay(particle, decay, api=api)

        self.assertEqual(case.case_id, "b_minus_s041_473")
        self.assertEqual(case.source["channelDescription"], "B- -> e+ nu_e")
        self.assertEqual(case.source["knownStatus"], "u")

    def test_load_live_cases_orders_known_reactions_first(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu+",
                    [
                        FakeDecay(
                            "mu+ -> e+ nu_e nubar_mu",
                            [FakeDecayProduct("e+"), FakeDecayProduct("nu_e"), FakeDecayProduct("nubar_mu")],
                            pdgid="S004.1/2025",
                            mode_number=1,
                        )
                    ],
                    mcid=-13,
                ),
                FakeParticle(
                    "pi+",
                    [
                        FakeDecay(
                            "pi+ -> mu+ nu_mu",
                            [FakeDecayProduct("mu+"), FakeDecayProduct("nu_mu")],
                            pdgid="S008.1/2025",
                            mode_number=1,
                        )
                    ],
                    mcid=211,
                ),
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "mu- -> e- nubar_e nu_mu",
                            [FakeDecayProduct("e-"), FakeDecayProduct("nubar_e"), FakeDecayProduct("nu_mu")],
                            pdgid="S004.1/2025",
                            mode_number=1,
                        ),
                        FakeDecay(
                            "mu- -> e- nubar_e nu_mu gamma",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("gamma"),
                            ],
                            pdgid="S004.2/2025",
                            mode_number=2,
                        ),
                    ],
                    mcid=13,
                ),
            ]
        )

        cases = pdgfeed.load_live_cases(api=api)

        self.assertEqual(
            [case.case_id for case in cases],
            [
                "mu_minus_s004_1",
                "mu_minus_s004_2",
                "pi_plus_s008_1",
                "mu_plus_s004_1",
            ],
        )
        self.assertEqual([pdgfeed.known_reaction_status(case) for case in cases], ["k", "k", "k", "u"])


if __name__ == "__main__":
    unittest.main()
