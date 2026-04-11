import csv
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

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
    def test_build_proposal_marks_the_pdg_to_pdgsolve_request_boundary_explicitly(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="test_case",
            source={
                "edition": "2025",
                "channelDescription": "n -> p e- anti-nu_e",
                "citation": "Local PDG test-case seed",
                "branchingDisplay": "dominant neutron decay channel",
            },
            reactants=(pdgfeed.TestCaseParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.TestCaseParticle(name="p", pdg_id="p"),
                pdgfeed.TestCaseParticle(name="e-", pdg_id="e-"),
                pdgfeed.TestCaseParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)

        self.assertEqual(
            proposal.source["contract"],
            {
                "upstreamSchema": "pdg-proposal/v1",
                "downstreamSchema": "pdgsolve-request/v1",
                "handoffMode": "upstream-only",
                "reactionAcceptanceRequired": True,
                "reactionAcceptanceBoundary": "reaction-review",
                "acceptedReactionHandoff": "reaction-owned",
                "pdgviewHandoff": "accepted-reaction-only",
            },
        )
        self.assertEqual(proposal.source["testCaseId"], "free_neutron_beta_decay")
        self.assertEqual(proposal.exportable, True)

    def test_pdgsolve_request_source_points_back_to_the_pdg_proposal_surface(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="test_case",
            source={"edition": "2025"},
            reactants=(pdgfeed.TestCaseParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.TestCaseParticle(name="p", pdg_id="p"),
                pdgfeed.TestCaseParticle(name="e-", pdg_id="e-"),
                pdgfeed.TestCaseParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)
        pdgsolve_request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertIsNotNone(pdgsolve_request)
        self.assertEqual(
            pdgsolve_request["source"],
            {
                "kind": "pdgfeed",
                "title": "Free neutron beta decay",
                "sourceDocumentId": "pdg-proposal:free_neutron_beta_decay",
            },
        )

    def test_baryon_proposal_inventory_counts_sum_quark_constituents(self):
        case = pdgfeed.PdgCase(
            case_id="baryon_inventory_probe",
            proposal_id="baryon_inventory_probe",
            title="Baryon inventory probe",
            source_kind="test_case",
            source={"edition": "2025"},
            reactants=(
                pdgfeed.TestCaseParticle(name="n", pdg_id="n"),
                pdgfeed.TestCaseParticle(name="anti-p", pdg_id="anti-p"),
            ),
            products=(
                pdgfeed.TestCaseParticle(name="p", pdg_id="p"),
                pdgfeed.TestCaseParticle(name="anti-n", pdg_id="anti-n"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)

        self.assertEqual(
            [participant.inventory for participant in proposal.reactants],
            [
                {
                    "electrinoCount": 18,
                    "positrinoCount": 18,
                    "flags": [
                        "pdg-id:n",
                        "pdg-name:n",
                    ],
                },
                {
                    "electrinoCount": 21,
                    "positrinoCount": 15,
                    "flags": [
                        "pdg-id:anti-p",
                        "pdg-name:anti-p",
                    ],
                },
            ],
        )
        self.assertEqual(
            [participant.inventory for participant in proposal.products],
            [
                {
                    "electrinoCount": 15,
                    "positrinoCount": 21,
                    "flags": [
                        "pdg-id:p",
                        "pdg-name:p",
                    ],
                },
                {
                    "electrinoCount": 18,
                    "positrinoCount": 18,
                    "flags": [
                        "pdg-id:anti-n",
                        "pdg-name:anti-n",
                    ],
                },
            ],
        )

    def test_pdgfeed_expands_composite_neutron_channel_terms_into_explicit_request_side_assemblies(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="test_case",
            source={"edition": "2025"},
            reactants=(pdgfeed.TestCaseParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.TestCaseParticle(name="p", pdg_id="p"),
                pdgfeed.TestCaseParticle(name="e-", pdg_id="e-"),
                pdgfeed.TestCaseParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        proposal = pdgfeed.build_proposal(case)
        pdgsolve_request = pdgfeed.build_pdgsolve_request(proposal)

        self.assertIsNotNone(pdgsolve_request)
        self.assertEqual(
            [(entry["assemblyId"], entry["title"]) for entry in pdgsolve_request["reactants"]],
            [
                ("pro_down_quark", "Pro Down Quark"),
                ("pro_up_quark", "Pro Up Quark"),
                ("pro_down_quark", "Pro Down Quark"),
            ],
        )
        self.assertEqual(
            [(entry["assemblyId"], entry["title"]) for entry in pdgsolve_request["products"]],
            [
                ("pro_up_quark", "Pro Up Quark"),
                ("pro_down_quark", "Pro Down Quark"),
                ("pro_up_quark", "Pro Up Quark"),
                ("electron", "Electron"),
                ("electron_antineutrino", "Electron Antineutrino"),
            ],
        )

    def test_manifest_assigns_incrementing_batch_ids_to_exportable_pdgsolve_requests(self):
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
        self.assertEqual(manifest["exportableCount"], 1)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(len(manifest["entries"]), 1)
        self.assertEqual(manifest["entries"][0]["batchId"], 1)
        self.assertEqual(manifest["entries"][0]["pdgIdentifier"], "S017.1/2025")
        self.assertEqual(manifest["entries"][0]["lookupParticleName"], "n")
        self.assertEqual(
            manifest["entries"][0]["pdgsolveRequest"]["source"]["sourceDocumentId"],
            "pdg-proposal:s017_1_2025.live-pdg",
        )
        self.assertEqual(manifest["entries"][0]["pdgsolveRequest"]["schema"], "pdgsolve-request/v1")
        self.assertEqual(
            manifest["topUnsupportedParticles"],
            [
                {"particle": "mu+", "count": 1},
                {"particle": "nu_mu", "count": 1},
                {"particle": "pi+", "count": 1},
            ],
        )

    def test_manifest_records_neutral_pion_decay_as_unsupported_when_gamma_lacks_a_pdgsolve_mapping(self):
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

        self.assertEqual(manifest["exportableCount"], 0)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(manifest["entries"], [])
        self.assertEqual(
            manifest["topUnsupportedParticles"],
            [
                {"particle": "gamma", "count": 2},
                {"particle": "pi0", "count": 1},
            ],
        )

    def test_manifest_leaves_charged_kaon_decay_proposal_only_until_pdgsolve_request_v1_expands(self):
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

        self.assertEqual(manifest["exportableCount"], 0)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(manifest["entries"], [])
        self.assertCountEqual(
            [entry["particle"] for entry in manifest["topUnsupportedParticles"]],
            ["K+", "mu+", "nu_mu"],
        )

    def test_manifest_leaves_charged_b_decay_proposal_only_until_pdgsolve_request_v1_expands(self):
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

        self.assertEqual(manifest["exportableCount"], 0)
        self.assertEqual(manifest["unsupportedDiscoveryCount"], 1)
        self.assertEqual(manifest["entries"], [])
        self.assertCountEqual(
            [entry["particle"] for entry in manifest["topUnsupportedParticles"]],
            ["B+", "mu+", "nu_mu"],
        )

    def test_build_live_case_uses_anti_baryon_reactant_from_live_decay_description(self):
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
        api = FakeApi([FakeParticleList("S016/2025", "proton", [proton_particle])])
        decay = proton_particle._decays[0]

        live_case = pdgfeed.build_live_case_from_decay(api, proton_particle, decay)
        proposal = pdgfeed.build_proposal(live_case)

        self.assertEqual(live_case.source["lookupParticleName"], "anti-p")
        self.assertEqual(live_case.title, "pbar -> e- pi0")
        reactant = proposal.reactants[0]
        self.assertEqual(reactant.template_id, "proton")
        self.assertEqual(reactant.polarity, "anti")
        self.assertEqual(reactant.pdg_name, "anti-p")

    def test_extract_unsupported_particle_names_ignores_non_particle_text_tokens(self):
        notes = [
            "unsupported:product:pi+:no-v1-mapping",
            "unsupported:product:-->:generic-or-textual-item",
            "unsupported:product:gamma ray:generic-or-textual-item",
        ]

        self.assertEqual(pdgfeed.extract_unsupported_particle_names(notes), ["pi+"])

    def test_supported_reaction_csv_rows_use_aaa_labels_and_row_counts(self):
        case = pdgfeed.PdgCase(
            case_id="free_neutron_beta_decay",
            proposal_id="free_neutron_beta_decay",
            title="Free neutron beta decay",
            source_kind="test_case",
            source={"edition": "2025"},
            reactants=(pdgfeed.TestCaseParticle(name="n", pdg_id="n"),),
            products=(
                pdgfeed.TestCaseParticle(name="p", pdg_id="p"),
                pdgfeed.TestCaseParticle(name="e-", pdg_id="e-"),
                pdgfeed.TestCaseParticle(name="anti-nu_e", pdg_id="anti-nu_e"),
            ),
        )

        rows = pdgfeed.build_supported_reaction_csv_rows([case])

        self.assertEqual(
            rows,
            [
                {
                    "reactant_names_aaa": "Neutron",
                    "product_names_aaa": "Proton + Pro Electron + Anti Electron Neutrino",
                    "reactant_electrinos": 18,
                    "product_electrinos": 30,
                    "electrino_delta": -12,
                    "reactant_positrinos": 18,
                    "product_positrinos": 30,
                    "positrino_delta": -12,
                }
            ],
        )

    def test_supported_reaction_csv_rows_include_single_row_assemblies(self):
        case = pdgfeed.PdgCase(
            case_id="single_row_probe",
            proposal_id="single_row_probe",
            title="Single row probe",
            source_kind="test_case",
            source={"edition": "2026"},
            reactants=(pdgfeed.TestCaseParticle(name="e-", pdg_id="e-"),),
            products=(pdgfeed.TestCaseParticle(name="anti-nu_e", pdg_id="anti-nu_e"),),
        )

        rows = pdgfeed.build_supported_reaction_csv_rows([case])

        self.assertEqual(
            rows,
            [
                {
                    "reactant_names_aaa": "Pro Electron",
                    "product_names_aaa": "Anti Electron Neutrino",
                    "reactant_electrinos": 9,
                    "product_electrinos": 6,
                    "electrino_delta": 3,
                    "reactant_positrinos": 3,
                    "product_positrinos": 6,
                    "positrino_delta": -3,
                }
            ],
        )

    def test_live_supported_reaction_csv_rows_use_manifest_exportable_denominator(self):
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

        rows = pdgfeed.build_live_supported_reaction_csv_rows(api=api)

        self.assertEqual(
            rows,
            [
                {
                    "reactant_names_aaa": "Neutron",
                    "product_names_aaa": "Proton + Pro Electron + Anti Electron Neutrino",
                    "reactant_electrinos": 18,
                    "product_electrinos": 30,
                    "electrino_delta": -12,
                    "reactant_positrinos": 18,
                    "product_positrinos": 30,
                    "positrino_delta": -12,
                }
            ],
        )

    def test_cli_emits_supported_reaction_csv_file(self):
        repo_root = Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory(dir=repo_root) as temp_dir:
            temp_path = Path(temp_dir)
            csv_path = Path(temp_dir) / "supported_reactions.csv"
            source_path = temp_path / "free_neutron_beta_decay.source.v1.json"
            index_path = temp_path / "index.json"

            source_path.write_text(
                json.dumps(
                    {
                        "schema": pdgfeed.PDG_TEST_CASE_SOURCE_SCHEMA,
                        "testCaseId": "free_neutron_beta_decay",
                        "title": "Free neutron beta decay",
                        "source": {"edition": "2025"},
                        "reactants": [{"name": "n", "pdgId": "n"}],
                        "products": [
                            {"name": "p", "pdgId": "p"},
                            {"name": "e-", "pdgId": "e-"},
                            {"name": "anti-nu_e", "pdgId": "anti-nu_e"},
                        ],
                    }
                ),
                encoding="utf-8",
            )
            index_path.write_text(
                json.dumps(
                    {
                        "schema": pdgfeed.PDG_TEST_CASE_CORPUS_SCHEMA,
                        "cases": [
                            {
                                "id": "free_neutron_beta_decay",
                                "title": "Free neutron beta decay",
                                "sourcePath": str(source_path.relative_to(repo_root)),
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )
            result = subprocess.run(
                [
                    sys.executable,
                    "pdgfeed.py",
                    "--test-case-index",
                    str(index_path),
                    "emit-supported-reaction-csv",
                    str(csv_path),
                ],
                cwd=repo_root,
                check=True,
                capture_output=True,
                text=True,
            )

            self.assertEqual(result.stdout.strip(), str(csv_path.relative_to(repo_root)))
            with csv_path.open(encoding="utf-8", newline="") as handle:
                rows = list(csv.DictReader(handle))

        self.assertEqual(
            rows,
            [
                {
                    "reactant_names_aaa": "Neutron",
                    "product_names_aaa": "Proton + Pro Electron + Anti Electron Neutrino",
                    "reactant_electrinos": "18",
                    "product_electrinos": "30",
                    "electrino_delta": "-12",
                    "reactant_positrinos": "18",
                    "product_positrinos": "30",
                    "positrino_delta": "-12",
                }
            ],
        )


if __name__ == "__main__":
    unittest.main()
