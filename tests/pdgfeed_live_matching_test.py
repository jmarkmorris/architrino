import unittest

import pdgfeed
from pdgfeed_test_fakes import FakeApi, FakeDecay, FakeDecayProduct, FakeParticle


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
                            "S041.473/2025",
                            "B+ --> e+ nu_e",
                            [FakeDecayProduct("e+"), FakeDecayProduct("nu_e")],
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
                            "S004.1/2025",
                            "mu+ -> e+ nu_e nubar_mu",
                            [FakeDecayProduct("e+"), FakeDecayProduct("nu_e"), FakeDecayProduct("nubar_mu")],
                            mode_number=1,
                        )
                    ],
                    mcid=-13,
                ),
                FakeParticle(
                    "pi+",
                    [
                        FakeDecay(
                            "S008.1/2025",
                            "pi+ -> mu+ nu_mu",
                            [FakeDecayProduct("mu+"), FakeDecayProduct("nu_mu")],
                            mode_number=1,
                        )
                    ],
                    mcid=211,
                ),
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "S004.1/2025",
                            "mu- -> e- nubar_e nu_mu",
                            [FakeDecayProduct("e-"), FakeDecayProduct("nubar_e"), FakeDecayProduct("nu_mu")],
                            mode_number=1,
                        ),
                        FakeDecay(
                            "S004.2/2025",
                            "mu- -> e- nubar_e nu_mu gamma",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("gamma"),
                            ],
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
