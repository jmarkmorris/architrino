import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import pdgfeed
from scripts.pdg import pdgfeed_live
from scripts.pdg import pdgfeed_runtime

from pdgfeed_test_fakes import FakeApi, FakeDecay, FakeDecayProduct, FakeParticle


class PdgfeedCliTests(unittest.TestCase):
    def build_api(self):
        return FakeApi(
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
                FakeParticle(
                    "pi0",
                    [
                        FakeDecay(
                            "fake",
                            "pi0 -> gamma gamma",
                            [
                                FakeDecayProduct("gamma"),
                                FakeDecayProduct("gamma"),
                            ],
                        )
                    ],
                    mcid=111,
                ),
            ]
        )

    def run_main(self, args, api, tmp_dir):
        stdout = io.StringIO()
        with (
            contextlib.redirect_stdout(stdout),
            patch.object(pdgfeed_runtime, "connect_pdg", return_value=api),
            patch.object(pdgfeed_live, "connect_pdg", return_value=api),
            patch.object(pdgfeed_runtime, "DEFAULT_TMP_DIR", tmp_dir),
        ):
            exit_code = pdgfeed.main(args)
        self.assertEqual(exit_code, 0)
        return stdout.getvalue().strip()

    def test_list_writes_ready_and_blocked_statuses(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            output = self.run_main(["list", "--source", "pdg-reactions"], api, tmp_dir)
            expected_path = str(tmp_dir / "pdgfeed.list.pdg_reactions.md")
            self.assertEqual(output, expected_path)

            lines = (tmp_dir / "pdgfeed.list.pdg_reactions.md").read_text(encoding="utf-8").strip().splitlines()
            self.assertEqual(
                lines[:6],
                [
                    "| K/U | MCID | PDG ID | Reaction ID | Title | Channel | Status |",
                    "| --- | --- | --- | --- | --- | --- | --- |",
                    "| k | 13 | S004.1/2025 | mu_minus_s004_1 | mu- decay mode 1 | mu- -> e- nubar_e nu_mu | ready |",
                    "| k | 13 | S004.2/2025 | mu_minus_s004_2 | mu- decay mode 1 | mu- -> e- nubar_e nu_mu gamma | ready |",
                    "| k | 211 | S008.1/2025 | pi_plus_s008_1 | pi+ decay mode 1 | pi+ -> mu+ nu_mu | ready |",
                    "| u | 111 | fake | pi0_fake | pi0 decay mode 1 | pi0 -> gamma gamma | blocked |",
                ],
            )

    def test_proposal_output_does_not_include_exportable_field(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            proposal_json = self.run_main(["proposal", "mu_minus_s004_1", "--source", "pdg-reactions"], api, Path(tmp_dir_name))
            proposal = json.loads(proposal_json)

            self.assertEqual(proposal["proposalId"], "mu_minus_s004_1")
            self.assertNotIn("exportable", proposal)
            self.assertEqual(proposal["source"]["knownStatus"], "k")

    def test_request_output_uses_transformed_rows_only(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            request_json = self.run_main(["request", "pi_plus_s008_1", "--source", "pdg-reactions"], api, Path(tmp_dir_name))
            request = json.loads(request_json)

            self.assertEqual(
                [entry["assemblyId"] for entry in request["reactants"]],
                ["pro_up_quark_I", "anti_down_quark_I"],
            )
            self.assertEqual(
                [entry["assemblyId"] for entry in request["products"]],
                ["anti_muon_II", "pro_muon_neutrino_II"],
            )

    def test_request_reports_blocked_transform_state(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            with (
                patch.object(pdgfeed_runtime, "connect_pdg", return_value=api),
                patch.object(pdgfeed_live, "connect_pdg", return_value=api),
                patch.object(pdgfeed_runtime, "DEFAULT_TMP_DIR", Path(tmp_dir_name)),
            ):
                with self.assertRaises(SystemExit) as exc:
                    pdgfeed.main(["request", "pi0_fake", "--source", "pdg-reactions"])

        self.assertEqual(
            str(exc.exception),
            "PDG reaction 'pi0_fake' is not ready for pdgsolve because its participants do not yet transform fully into admitted assembly rows.",
        )

    def test_supported_csv_writes_ready_rows_and_markdown_sidecar(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            csv_path = tmp_dir / "supported.csv"
            output = self.run_main(["supported-csv", str(csv_path), "--source", "pdg-reactions"], api, tmp_dir)
            self.assertEqual(output.splitlines(), [str(csv_path), str(tmp_dir / "pdgfeed.supported.pdg_reactions.md")])

            csv_lines = csv_path.read_text(encoding="utf-8").strip().splitlines()
            self.assertEqual(
                csv_lines[:4],
                [
                    "known_status,reaction_id,mcid,pdg_identifier,title,reactant_names_aaa,product_names_aaa,reactant_electrinos,product_electrinos,electrino_delta,reactant_positrinos,product_positrinos,positrino_delta",
                    "k,mu_minus_s004_1,13,S004.1/2025,mu- decay mode 1,e2,e.av.v2,8,20,-12,2,14,-12",
                    "k,mu_minus_s004_2,13,S004.2/2025,mu- decay mode 1,e2,e.av.v2.hp,8,26,-18,2,20,-18",
                    "k,pi_plus_s008_1,211,S008.1/2025,pi+ decay mode 1,u.ad,ae2.v2,9,7,2,15,13,2",
                ],
            )


if __name__ == "__main__":
    unittest.main()
