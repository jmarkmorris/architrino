import unittest

import pdgfeed
from pdgfeed_test_fakes import FakeApi, FakeDecay, FakeDecayProduct, FakeParticle


class PdgfeedContractTests(unittest.TestCase):
    def test_parse_args_exposes_the_five_subcommands(self):
        list_args = pdgfeed.parse_args(["list"])
        proposal_args = pdgfeed.parse_args(["proposal", "mu_minus_s004_1"])
        request_args = pdgfeed.parse_args(["request", "mu_minus_s004_7"])
        manifest_args = pdgfeed.parse_args(["manifest"])
        supported_csv_args = pdgfeed.parse_args(["supported-csv"])

        self.assertEqual(list_args.command, "list")
        self.assertEqual(list_args.source, "pdg-reactions")
        self.assertEqual(proposal_args.command, "proposal")
        self.assertEqual(proposal_args.reaction_id, "mu_minus_s004_1")
        self.assertEqual(request_args.command, "request")
        self.assertEqual(request_args.reaction_id, "mu_minus_s004_7")
        self.assertEqual(manifest_args.command, "manifest")
        self.assertEqual(supported_csv_args.command, "supported-csv")
        self.assertEqual(supported_csv_args.source, "pdg-reactions")

    def test_known_muon_decay_is_ready_for_pdgsolve_and_emits_generation_suffixed_request_ids(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "S004.1/2025",
                            "mu- -> e- nubar_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                            display_value_text="~100",
                        )
                    ],
                    mcid=13,
                )
            ]
        )
        particle = api.get_particle_by_name("mu-")
        case = pdgfeed.load_live_case_from_decay(particle, particle.exclusive_branching_fractions()[0], api=api)

        proposal = pdgfeed.build_proposal(case)
        request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertEqual(case.case_id, "mu_minus_s004_1")
        self.assertEqual(case.source["knownStatus"], "k")
        self.assertTrue(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))
        self.assertEqual(proposal.products[1].pdg_name, "anti-nu_e")
        self.assertIsNotNone(request)
        self.assertEqual(
            [entry["assemblyId"] for entry in request["products"]],
            ["pro_electron_I", "anti_electron_neutrino_I", "pro_muon_neutrino_II"],
        )

    def test_neutral_pion_uses_canonical_u_anti_u_transform_for_pdgsolve(self):
        case = pdgfeed.PdgCase(
            case_id="pi_zero_case",
            proposal_id="pi_zero_case",
            title="pi0",
            source_kind="pdg-live",
            source={"mcid": 111, "pdgIdentifier": "fake"},
            reactants=(pdgfeed.CaseParticle(name="pi0", pdg_id="pi0"),),
            products=(pdgfeed.CaseParticle(name="gamma", pdg_id="gamma"),),
        )

        proposal = pdgfeed.build_proposal(case)
        request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertTrue(pdgfeed.proposal_is_ready_for_pdgsolve(proposal))
        self.assertIn("transform:canonical-choice:pi0:u.au:alternate:d.ad", proposal.notes)
        self.assertIsNotNone(request)
        self.assertEqual(
            [entry["assemblyId"] for entry in request["reactants"]],
            ["pro_up_quark_I", "anti_up_quark_I"],
        )

    def test_supported_csv_rows_include_known_status_and_exact_ids(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "S004.1/2025",
                            "mu- -> e- anti-nu_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                        ),
                        FakeDecay(
                            "S004.7/2025",
                            "mu- -> e- anti-nu_e nu_mu e+ e-",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("e+"),
                                FakeDecayProduct("e-"),
                            ],
                        ),
                    ],
                    mcid=13,
                ),
                FakeParticle(
                    "pi+",
                    [
                        FakeDecay(
                            "S008.1/2025",
                            "pi+ -> mu+ nu_mu",
                            [
                                FakeDecayProduct("mu+"),
                                FakeDecayProduct("nu_mu"),
                            ],
                        )
                    ],
                    mcid=211,
                ),
            ]
        )

        rows = pdgfeed.build_supported_reaction_csv_rows(pdgfeed.load_live_cases(api=api))

        self.assertEqual(len(rows), 3)
        self.assertEqual(rows[0]["known_status"], "k")
        self.assertEqual(rows[0]["reaction_id"], "mu_minus_s004_1")
        self.assertEqual(rows[0]["mcid"], 13)
        self.assertEqual(rows[0]["pdg_identifier"], "S004.1/2025")
        self.assertEqual(rows[1]["reaction_id"], "mu_minus_s004_7")
        self.assertEqual(rows[2]["reaction_id"], "pi_plus_s008_1")
        self.assertEqual(rows[2]["reactant_names_aaa"], "u.ad")
        self.assertEqual(rows[2]["product_names_aaa"], "ae2.v2")

    def test_gamma_and_pi_plus_expand_into_request_occurrences(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "S004.2/2025",
                            "mu- -> e- anti-nu_e nu_mu gamma",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("gamma"),
                            ],
                        )
                    ],
                    mcid=13,
                ),
                FakeParticle(
                    "pi+",
                    [
                        FakeDecay(
                            "S008.1/2025",
                            "pi+ -> mu+ nu_mu",
                            [
                                FakeDecayProduct("mu+"),
                                FakeDecayProduct("nu_mu"),
                            ],
                        )
                    ],
                    mcid=211,
                ),
            ]
        )

        muon_case = pdgfeed.load_live_case_by_id("mu_minus_s004_2", api=api)
        muon_request = pdgfeed.build_pdgsolve_request(pdgfeed.build_proposal(muon_case))
        pion_case = pdgfeed.load_live_case_by_id("pi_plus_s008_1", api=api)
        pion_request = pdgfeed.build_pdgsolve_request(pdgfeed.build_proposal(pion_case))

        self.assertIsNotNone(muon_request)
        self.assertIsNotNone(pion_request)
        self.assertEqual(
            [entry["assemblyId"] for entry in muon_request["products"]],
            [
                "pro_electron_I",
                "anti_electron_neutrino_I",
                "pro_muon_neutrino_II",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
        )
        self.assertEqual(
            [entry["assemblyId"] for entry in pion_request["reactants"]],
            ["pro_up_quark_I", "anti_down_quark_I"],
        )

    def test_neutral_pion_transform_uses_u_anti_u_rows(self):
        case = pdgfeed.PdgCase(
            case_id="pi_zero_case",
            proposal_id="pi_zero_case",
            title="pi0",
            source_kind="pdg-live",
            source={"mcid": 111, "pdgIdentifier": "fake"},
            reactants=(pdgfeed.CaseParticle(name="pi0", pdg_id="pi0"),),
            products=(pdgfeed.CaseParticle(name="gamma", pdg_id="gamma"),),
        )
        proposal = pdgfeed.build_proposal(case)
        transformed = pdgfeed.transform_proposal_for_pdgsolve(proposal)

        self.assertIsNotNone(transformed)
        self.assertEqual(
            [entry["assemblyId"] for entry in transformed["reactants"]],
            ["pro_up_quark_I", "anti_up_quark_I"],
        )

    def test_kaons_and_b_mesons_expand_into_assembly_rows(self):
        expected = {
            "K+": ["pro_up_quark_I", "anti_strange_quark_II"],
            "K0": ["pro_down_quark_I", "anti_strange_quark_II"],
            "K-": ["anti_up_quark_I", "pro_strange_quark_II"],
            "anti-K0": ["anti_down_quark_I", "pro_strange_quark_II"],
            "B+": ["pro_up_quark_I", "anti_bottom_quark_III"],
            "B0": ["pro_down_quark_I", "anti_bottom_quark_III"],
            "B-": ["anti_up_quark_I", "pro_bottom_quark_III"],
            "anti-B0": ["anti_down_quark_I", "pro_bottom_quark_III"],
        }

        for particle_name, assembly_ids in expected.items():
            with self.subTest(particle_name=particle_name):
                case = pdgfeed.PdgCase(
                    case_id=f"{particle_name}-case",
                    proposal_id=f"{particle_name}-case",
                    title=particle_name,
                    source_kind="pdg-live",
                    source={"mcid": 0, "pdgIdentifier": "fake"},
                    reactants=(pdgfeed.CaseParticle(name=particle_name, pdg_id=particle_name),),
                    products=(pdgfeed.CaseParticle(name="mu+", pdg_id="mu+"),),
                )
                proposal = pdgfeed.build_proposal(case)
                transformed = pdgfeed.transform_proposal_for_pdgsolve(proposal)

                self.assertIsNotNone(transformed)
                self.assertEqual(
                    [entry["assemblyId"] for entry in transformed["reactants"]],
                    assembly_ids,
                )

    def test_live_manifest_marks_known_reactions_and_orders_them_first(self):
        api = FakeApi(
            [
                FakeParticle(
                    "mu+",
                    [
                        FakeDecay(
                            "S004.1/2025",
                            "mu+ -> e+ nu_e nubar_mu",
                            [
                                FakeDecayProduct("e+"),
                                FakeDecayProduct("nu_e"),
                                FakeDecayProduct("nubar_mu"),
                            ],
                        )
                    ],
                    mcid=-13,
                ),
                FakeParticle(
                    "mu-",
                    [
                        FakeDecay(
                            "S004.1/2025",
                            "mu- -> e- anti-nu_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                            display_value_text="(100)",
                        ),
                        FakeDecay(
                            "S004.2/2025",
                            "mu- -> e- anti-nu_e nu_mu gamma",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("anti-nu_e"),
                                FakeDecayProduct("nu_mu"),
                                FakeDecayProduct("gamma"),
                            ],
                            display_value_text="(rad)",
                        ),
                    ],
                    mcid=13,
                ),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["schema"], "pdg-live-manifest/v1")
        self.assertEqual(manifest["readyCount"], 3)
        self.assertEqual(manifest["blockedCount"], 0)
        self.assertEqual(
            [(entry["knownStatus"], entry["caseId"]) for entry in manifest["readyEntries"]],
            [("k", "mu_minus_s004_1"), ("k", "mu_minus_s004_2"), ("u", "mu_plus_s004_1")],
        )
        self.assertEqual(manifest["blockedEntries"], [])
        self.assertEqual(manifest["readyEntries"][0]["pdgIdentifier"], "S004.1/2025")
        self.assertEqual(manifest["readyEntries"][0]["mcid"], 13)


if __name__ == "__main__":
    unittest.main()
