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
    def __init__(self, pdgid, description, products, *, mode_number=1, display_value_text=""):
        self.pdgid = pdgid
        self.description = description
        self.decay_products = products
        self.mode_number = mode_number
        self.display_value_text = display_value_text


class FakeParticle:
    def __init__(self, name, decays):
        self.name = name
        self._decays = list(decays)

    def exclusive_branching_fractions(self, *args, **kwargs):
        return list(self._decays)


class FakeApi:
    def __init__(self, particles, *, edition="2025"):
        self._particles = {particle.name: particle for particle in particles}
        self.edition = edition

    def get_particle_by_name(self, name):
        return self._particles[name]

    def get_canonical_name(self, name):
        aliases = {
            "nubar_e": "anti-nu_e",
            "nubar_mu": "anti-nu_mu",
            "nubar_tau": "anti-nu_tau",
        }
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API database read"


class PdgfeedContractTests(unittest.TestCase):
    def test_parse_args_exposes_the_five_subcommands(self):
        list_args = pdgfeed.parse_args(["list", "--source", "pdg-test-reactions"])
        proposal_args = pdgfeed.parse_args(["proposal", "muon_decay"])
        request_args = pdgfeed.parse_args(["request", "muon_decay_with_electron_positron_pair"])
        manifest_args = pdgfeed.parse_args(["manifest"])
        supported_csv_args = pdgfeed.parse_args(["supported-csv"])

        self.assertEqual(list_args.command, "list")
        self.assertEqual(list_args.source, "pdg-test-reactions")
        self.assertEqual(proposal_args.command, "proposal")
        self.assertEqual(proposal_args.reaction_id, "muon_decay")
        self.assertEqual(request_args.command, "request")
        self.assertEqual(request_args.reaction_id, "muon_decay_with_electron_positron_pair")
        self.assertEqual(manifest_args.command, "manifest")
        self.assertEqual(supported_csv_args.command, "supported-csv")

    def test_test_case_corpus_matches_the_documented_five_case_set(self):
        cases = pdgfeed.load_test_case_index(pdgfeed.DEFAULT_TEST_CASE_INDEX)

        self.assertEqual(
            [case.case_id for case in cases],
            [
                "muon_decay",
                "radiative_muon_decay",
                "muon_decay_with_electron_positron_pair",
                "muon_to_electron_photon",
                "charged_pion_to_muon_neutrino",
            ],
        )

    def test_muon_decay_is_exportable_and_emits_generation_suffixed_request_ids(self):
        case = next(
            case
            for case in pdgfeed.load_test_case_index(pdgfeed.DEFAULT_TEST_CASE_INDEX)
            if case.case_id == "muon_decay"
        )

        proposal = pdgfeed.build_proposal(case)
        request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertTrue(proposal.exportable)
        self.assertEqual(proposal.notes, ())
        self.assertEqual(proposal.reactants[0].canonical_id, "pro_muon_II")
        self.assertEqual([participant.canonical_id for participant in proposal.products], [
            "pro_electron_I",
            "anti_electron_neutrino_I",
            "pro_muon_neutrino_II",
        ])
        self.assertIsNotNone(request)
        pdgfeed.validate_pdgsolve_request_shape(request)
        self.assertEqual(
            [entry["assemblyId"] for entry in request["reactants"]],
            ["pro_muon_II"],
        )
        self.assertEqual(
            [entry["assemblyId"] for entry in request["products"]],
            ["pro_electron_I", "anti_electron_neutrino_I", "pro_muon_neutrino_II"],
        )

    def test_pair_production_case_keeps_repeated_products_explicit(self):
        case = next(
            case
            for case in pdgfeed.load_test_case_index(pdgfeed.DEFAULT_TEST_CASE_INDEX)
            if case.case_id == "muon_decay_with_electron_positron_pair"
        )

        proposal = pdgfeed.build_proposal(case)
        request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertTrue(proposal.exportable)
        self.assertIsNotNone(request)
        self.assertEqual(
            [(entry["assemblyId"], entry["title"]) for entry in request["products"]],
            [
                ("pro_electron_I", "Electron"),
                ("anti_electron_neutrino_I", "Anti Electron Neutrino"),
                ("pro_muon_neutrino_II", "Muon Neutrino"),
                ("anti_electron_I", "Positron"),
                ("pro_electron_I", "Electron"),
            ],
        )

    def test_radiative_and_pion_cases_stay_proposal_only(self):
        cases = {
            case.case_id: case
            for case in pdgfeed.load_test_case_index(pdgfeed.DEFAULT_TEST_CASE_INDEX)
        }

        radiative = pdgfeed.build_proposal(cases["radiative_muon_decay"])
        pion = pdgfeed.build_proposal(cases["charged_pion_to_muon_neutrino"])

        self.assertFalse(radiative.exportable)
        self.assertEqual(
            radiative.notes,
            ("unsupported:product:gamma:no-pdgsolve-request-v1-mapping",),
        )
        self.assertIsNone(pdgfeed.build_pdgsolve_request(radiative))

        self.assertFalse(pion.exportable)
        self.assertEqual(
            pion.notes,
            ("unsupported:reactant:pi+:no-pdgsolve-request-v1-mapping",),
        )
        self.assertIsNone(pdgfeed.build_pdgsolve_request(pion))

    def test_supported_csv_rows_use_aaa_side_notation_for_exportable_cases(self):
        rows = pdgfeed.build_supported_reaction_csv_rows(
            pdgfeed.load_test_case_index(pdgfeed.DEFAULT_TEST_CASE_INDEX)
        )

        self.assertEqual(
            rows,
            [
                {
                    "reactant_names_aaa": "e2",
                    "product_names_aaa": "e.av.v2",
                    "reactant_electrinos": 8,
                    "product_electrinos": 20,
                    "electrino_delta": -12,
                    "reactant_positrinos": 2,
                    "product_positrinos": 14,
                    "positrino_delta": -12,
                },
                {
                    "reactant_names_aaa": "e2",
                    "product_names_aaa": "e.av.v2.ae.e",
                    "reactant_electrinos": 8,
                    "product_electrinos": 32,
                    "electrino_delta": -24,
                    "reactant_positrinos": 2,
                    "product_positrinos": 26,
                    "positrino_delta": -24,
                },
            ],
        )

    def test_curated_live_manifest_separates_exportable_and_unsupported_channels(self):
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
                            display_value_text="(pair)",
                        ),
                        FakeDecay(
                            "S004.4/2025",
                            "mu- -> e- gamma",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("gamma"),
                            ],
                            display_value_text="(photonic)",
                        ),
                    ],
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
                            display_value_text="(dominant)",
                        )
                    ],
                ),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["schema"], "pdg-live-manifest/v1")
        self.assertEqual(manifest["exportableCount"], 2)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 3)
        self.assertEqual([entry["caseId"] for entry in manifest["entries"]], [
            "muon_decay",
            "muon_decay_with_electron_positron_pair",
        ])
        self.assertEqual([entry["caseId"] for entry in manifest["unsupportedEntries"]], [
            "radiative_muon_decay",
            "muon_to_electron_photon",
            "charged_pion_to_muon_neutrino",
        ])
        self.assertEqual(
            manifest["topUnsupportedParticles"],
            [
                {"particle": "gamma", "count": 2},
                {"particle": "pi+", "count": 1},
            ],
        )
        self.assertEqual(manifest["entries"][0]["pdgsolveRequest"]["schema"], "pdgsolve-request/v1")


if __name__ == "__main__":
    unittest.main()

