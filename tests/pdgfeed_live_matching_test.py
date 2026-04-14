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
        self.assertEqual(case.source["channelDescription"], "B- -> e- anti-nu_e")
        self.assertEqual(case.source["knownStatus"], "u")
        self.assertEqual([product.name for product in case.products], ["e-", "anti-nu_e"])

    def test_load_live_case_from_decay_marks_unresolved_charge_mismatch_unsupported(self):
        api = FakeApi(
            [
                FakeParticle(
                    "B-",
                    [
                        FakeDecay(
                            "TEST.B.MINUS.BAD",
                            "B+ --> gamma",
                            [FakeDecayProduct("gamma")],
                            mode_number=1,
                        )
                    ],
                    mcid=-521,
                )
            ]
        )
        particle = api.get_particle_by_name("B-")
        decay = particle.exclusive_branching_fractions()[0]

        case = pdgfeed.load_live_case_from_decay(particle, decay, api=api)
        proposal = pdgfeed.build_proposal(case)

        self.assertIn("unsupported:charge-mismatch:B-:-3:0", proposal.notes)
        self.assertFalse(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))

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

    def test_load_live_case_from_decay_resolves_generic_pion_family_by_charge_closure(self):
        api = FakeApi(
            [
                FakeParticle(
                    "K+",
                    [
                        FakeDecay(
                            "TEST.K.PLUS.GENERIC.PI",
                            "K+ -> pi pi",
                            [
                                FakeDecayProduct("pi", particle=None),
                                FakeDecayProduct("pi", particle=None),
                            ],
                            mode_number=1,
                        )
                    ],
                    mcid=321,
                )
            ]
        )
        particle = api.get_particle_by_name("K+")
        decay = particle.exclusive_branching_fractions()[0]

        case = pdgfeed.load_live_case_from_decay(particle, decay, api=api)
        proposal = pdgfeed.build_proposal(case)

        self.assertEqual([product.name for product in case.products], ["pi+", "pi0"])
        self.assertEqual(case.source["channelDescription"], "K+ -> pi+ pi0")
        self.assertIn("generic-family-charge-resolved:pi.pi:pi+.pi0", proposal.notes)
        self.assertTrue(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))

    def test_load_live_case_from_decay_resolves_generic_nucleon_families_by_charge_closure(self):
        scenarios = (
            (
                "K+",
                321,
                "TEST.K.PLUS.GENERIC.N",
                [
                    FakeDecayProduct("N", particle=None),
                    FakeDecayProduct("pi0"),
                ],
                ["p", "pi0"],
                "generic-family-charge-resolved:N:p.pi0",
            ),
            (
                "B+",
                521,
                "TEST.B.PLUS.GENERIC.NBAR",
                [
                    FakeDecayProduct("Nbar", particle=None),
                    FakeDecayProduct("p"),
                ],
                ["anti-n", "p"],
                "generic-family-charge-resolved:Nbar:anti-n.p",
            ),
        )

        for particle_name, mcid, decay_id, products, expected_names, expected_note in scenarios:
            with self.subTest(particle_name=particle_name, decay_id=decay_id):
                api = FakeApi(
                    [
                        FakeParticle(
                            particle_name,
                            [FakeDecay(decay_id, "", products, mode_number=1)],
                            mcid=mcid,
                        )
                    ]
                )
                particle = api.get_particle_by_name(particle_name)
                decay = particle.exclusive_branching_fractions()[0]

                case = pdgfeed.load_live_case_from_decay(particle, decay, api=api)
                proposal = pdgfeed.build_proposal(case)

                self.assertEqual([product.name for product in case.products], expected_names)
                self.assertIn(expected_note, proposal.notes)
                self.assertTrue(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))

    def test_load_live_case_from_decay_keeps_ambiguous_generic_family_channels_blocked(self):
        api = FakeApi(
            [
                FakeParticle(
                    "K+",
                    [
                        FakeDecay(
                            "TEST.K.PLUS.AMBIGUOUS",
                            "K+ -> N pi",
                            [
                                FakeDecayProduct("N", particle=None),
                                FakeDecayProduct("pi", particle=None),
                            ],
                            mode_number=1,
                        )
                    ],
                    mcid=321,
                )
            ]
        )
        particle = api.get_particle_by_name("K+")
        decay = particle.exclusive_branching_fractions()[0]

        case = pdgfeed.load_live_case_from_decay(particle, decay, api=api)
        proposal = pdgfeed.build_proposal(case)

        self.assertEqual([product.name for product in case.products], ["N", "pi"])
        self.assertEqual(case.source["channelDescription"], "K+ -> N pi")
        self.assertIn("generic-family-charge-ambiguous:N.pi:2-assignments", proposal.notes)
        self.assertIn("unsupported:product:N:generic-family-unresolved", proposal.notes)
        self.assertIn("unsupported:product:pi:generic-family-unresolved", proposal.notes)
        self.assertFalse(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))


if __name__ == "__main__":
    unittest.main()
