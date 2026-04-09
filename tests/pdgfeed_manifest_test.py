from pathlib import Path
import sys
import unittest

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
    def __init__(self, pdgid, description, products, *, mode_number=0, display_value_text=""):
        self.pdgid = pdgid
        self.description = description
        self.decay_products = products
        self.mode_number = mode_number
        self.display_value_text = display_value_text


class FakeParticle:
    def __init__(self, name, pdgid, decays):
        self.name = name
        self.pdgid = pdgid
        self._decays = list(decays)

    def exclusive_branching_fractions(self, **_kwargs):
        return list(self._decays)


class FakeParticleList(list):
    def __init__(self, pdgid, description, particles):
        super().__init__(particles)
        self.pdgid = pdgid
        self.description = description


class FakeApi:
    def __init__(self, groups):
        self._groups = groups
        self.edition = "2025"

    def get_particles(self):
        return list(self._groups)

    def get_canonical_name(self, name):
        aliases = {"nubar_e": "anti-nu_e"}
        return aliases.get(name, name)

    def info(self, _key):
        return "PDG Python API live read"


class BuildLiveManifestPayloadTests(unittest.TestCase):
    def test_build_proposal_marks_the_pdg_to_solver_boundary_explicitly(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="fixture",
            source={
                "edition": "2025",
                "channelDescription": "n -> p e- anti-nu_e",
                "citation": "Local PDG fixture seed",
                "branchingDisplay": "dominant neutron decay channel",
            },
            reactants=(pdgfeed.FixtureParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.FixtureParticle(name="p", pdg_id="p"),
                pdgfeed.FixtureParticle(name="e-", pdg_id="e-"),
                pdgfeed.FixtureParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)

        self.assertEqual(
            proposal.source["contract"],
            {
                "upstreamSchema": "pdg-proposal/v1",
                "downstreamSchema": "solver-request/v1",
                "handoffMode": "upstream-only",
                "reactionAcceptanceRequired": True,
                "reactionAcceptanceBoundary": "reaction-review",
                "acceptedReactionHandoff": "reaction-owned",
                "pdgviewHandoff": "accepted-reaction-only",
            },
        )
        self.assertEqual(proposal.source["fixtureId"], "free_neutron_beta_decay")
        self.assertEqual(proposal.exportable, True)

    def test_solver_request_origin_points_back_to_the_pdg_proposal_surface(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="fixture",
            source={"edition": "2025"},
            reactants=(pdgfeed.FixtureParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.FixtureParticle(name="p", pdg_id="p"),
                pdgfeed.FixtureParticle(name="e-", pdg_id="e-"),
                pdgfeed.FixtureParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)
        solver_request = pdgfeed.build_solver_request(proposal)

        self.assertIsNotNone(solver_request)
        self.assertEqual(
            solver_request["origin"],
            {
                "sourceKind": "pdg-ingest",
                "sourceDocumentId": "pdg-proposal:free_neutron_beta_decay",
                "title": "Free neutron beta decay",
            },
        )

    def test_manifest_assigns_incrementing_batch_ids_to_exportable_discoveries(self):
        neutron_particle = FakeParticle(
            "n",
            "S017/2025",
            [
                FakeDecay(
                    "S017.1/2025",
                    "n --> p e- nubar_e",
                    [
                        FakeDecayProduct("p"),
                        FakeDecayProduct("e-"),
                        FakeDecayProduct("nubar_e"),
                    ],
                    mode_number=1,
                    display_value_text="(100)",
                )
            ],
        )
        pion_particle = FakeParticle(
            "pi+",
            "S008/2025",
            [
                FakeDecay(
                    "S008.1/2025",
                    "pi+ -> mu+ nu_mu",
                    [
                        FakeDecayProduct("mu+"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=1,
                    display_value_text="(99.9)",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S017/2025", "neutron", [neutron_particle]),
                FakeParticleList("S008/2025", "charged pion", [pion_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["schema"], "pdg-live-manifest/v1")
        self.assertEqual(manifest["edition"], "2025")
        self.assertEqual(manifest["exportableCount"], 2)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 0)
        self.assertEqual(len(manifest["entries"]), 2)
        self.assertEqual(manifest["entries"][0]["batchId"], 1)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S008.1/2025")
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "pi+")
        self.assertEqual(
            manifest["entries"][0]["solverRequest"]["origin"]["sourceDocumentId"],
            "pdg-proposal:s008_1_2025.live-pdg",
        )
        self.assertEqual(manifest["entries"][0]["solverRequest"]["schema"], "solver-request/v1")
        self.assertEqual(manifest["entries"][1]["batchId"], 2)
        self.assertEqual(manifest["entries"][1]["pdgIdentifier"], "S017.1/2025")
        self.assertEqual(manifest["entries"][1]["lookupParticleName"], "n")
        self.assertEqual(
            manifest["entries"][1]["solverRequest"]["origin"]["sourceDocumentId"],
            "pdg-proposal:s017_1_2025.live-pdg",
        )
        self.assertEqual(manifest["topUnsupportedParticles"], [])

    def test_manifest_expands_exportable_particle_multipliers_for_neutral_pion_decay(self):
        neutral_pion_particle = FakeParticle(
            "pi0",
            "S009/2025",
            [
                FakeDecay(
                    "S009.1/2025",
                    "pi0 -> 2gamma",
                    [
                        FakeDecayProduct("gamma", multiplier=2),
                    ],
                    mode_number=1,
                    display_value_text="(98.8)",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S009/2025", "neutral pion", [neutral_pion_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 0)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S009.1/2025")
        self.assertEqual(
            manifest["entries"][0]["solverRequest"]["participants"][0]["templateId"],
            "upi0",
        )
        self.assertEqual(
            [
                participant["templateId"]
                for participant in manifest["entries"][0]["solverRequest"]["participants"][1:]
            ],
            ["photon", "photon"],
        )

    def test_manifest_exports_charged_kaon_decay_through_solver_request_v1(self):
        charged_kaon_particle = FakeParticle(
            "K+",
            "S010/2025",
            [
                FakeDecay(
                    "S010.1/2025",
                    "K+ -> mu+ nu_mu",
                    [
                        FakeDecayProduct("mu+"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=1,
                    display_value_text="(63.5)",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S010/2025", "charged kaon", [charged_kaon_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 0)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S010.1/2025")
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "K+")
        self.assertEqual(
            manifest["entries"][0]["solverRequest"]["participants"][0]["templateId"],
            "k_plus",
        )
        self.assertEqual(
            [participant["templateId"] for participant in manifest["entries"][0]["solverRequest"]["participants"][1:]],
            ["electron", "neutrino"],
        )

    def test_manifest_exports_charged_b_decay_through_solver_request_v1(self):
        charged_b_particle = FakeParticle(
            "B+",
            "S041/2025",
            [
                FakeDecay(
                    "S041.183/2025",
                    "B+ -> mu+ nu_mu",
                    [
                        FakeDecayProduct("mu+"),
                        FakeDecayProduct("nu_mu"),
                    ],
                    mode_number=183,
                    display_value_text="(0.000006)",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S041/2025", "charged b meson", [charged_b_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 0)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S041.183/2025")
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "B+")
        self.assertEqual(
            manifest["entries"][0]["solverRequest"]["participants"][0]["templateId"],
            "b_plus",
        )
        self.assertEqual(
            [participant["templateId"] for participant in manifest["entries"][0]["solverRequest"]["participants"][1:]],
            ["electron", "neutrino"],
        )

    def test_manifest_uses_anti_baryon_reactant_from_live_decay_description(self):
        proton_particle = FakeParticle(
            "p",
            "S016/2025",
            [
                FakeDecay(
                    "S016.82/2025",
                    "pbar -> e- pi0",
                    [
                        FakeDecayProduct("e-"),
                        FakeDecayProduct("pi0"),
                    ],
                    mode_number=82,
                    display_value_text=">4E5",
                )
            ],
        )
        api = FakeApi(
            [
                FakeParticleList("S016/2025", "proton", [proton_particle]),
            ]
        )

        manifest = pdgfeed.build_live_manifest_payload(api=api)

        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "anti-p")
        self.assertEqual(manifest["entries"][0]["title"], "pbar -> e- pi0")
        reactant = manifest["entries"][0]["proposal"]["reactants"][0]
        self.assertEqual(reactant["templateId"], "proton")
        self.assertEqual(reactant["polarity"], "anti")
        self.assertEqual(reactant["pdgName"], "anti-p")

    def test_extract_unsupported_particle_names_ignores_non_particle_text_tokens(self):
        notes = [
            "unsupported:product:pi+:no-v1-mapping",
            "unsupported:product:-->:generic-or-textual-item",
            "unsupported:product:gamma ray:generic-or-textual-item",
        ]

        self.assertEqual(pdgfeed.extract_unsupported_particle_names(notes), ["pi+"])


if __name__ == "__main__":
    unittest.main()
