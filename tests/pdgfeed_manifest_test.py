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
    def __init__(self, name, decays, *, mcid=None):
        self.name = name
        self._decays = list(decays)
        self.mcid = mcid

    def exclusive_branching_fractions(self, *args, **kwargs):
        return list(self._decays)


class FakeApi:
    def __init__(self, particles, *, edition="2025"):
        self._particles = {particle.name: particle for particle in particles}
        self._particle_lists = [[particle] for particle in particles]
        self.edition = edition

    def get_particle_by_name(self, name):
        return self._particles[name]

    def get_particles(self):
        return list(self._particle_lists)

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

    def test_known_muon_decay_is_exportable_and_emits_generation_suffixed_request_ids(self):
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
        self.assertTrue(proposal.exportable)
        self.assertEqual(proposal.products[1].pdg_name, "anti-nu_e")
        self.assertIsNotNone(request)
        self.assertEqual(
            [entry["assemblyId"] for entry in request["products"]],
            ["pro_electron_I", "anti_electron_neutrino_I", "pro_muon_neutrino_II"],
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
                )
            ]
        )

        rows = pdgfeed.build_supported_reaction_csv_rows(pdgfeed.load_live_cases(api=api))

        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0]["known_status"], "k")
        self.assertEqual(rows[0]["reaction_id"], "mu_minus_s004_1")
        self.assertEqual(rows[0]["mcid"], 13)
        self.assertEqual(rows[0]["pdg_identifier"], "S004.1/2025")
        self.assertEqual(rows[1]["reaction_id"], "mu_minus_s004_7")

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
        self.assertEqual(manifest["exportableCount"], 2)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(
            [(entry["knownStatus"], entry["caseId"]) for entry in manifest["entries"]],
            [("k", "mu_minus_s004_1"), ("u", "mu_plus_s004_1")],
        )
        self.assertEqual(
            [(entry["knownStatus"], entry["caseId"]) for entry in manifest["unsupportedEntries"]],
            [("k", "mu_minus_s004_2")],
        )
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S004.1/2025")
        self.assertEqual(manifest["entries"][0]["mcid"], 13)


if __name__ == "__main__":
    unittest.main()
