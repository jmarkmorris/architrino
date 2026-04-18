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
                            "TEST.MU.1",
                            "mu- -> e- nubar_e nu_mu",
                            [
                                FakeDecayProduct("e-"),
                                FakeDecayProduct("nubar_e"),
                                FakeDecayProduct("nu_mu"),
                            ],
                        ),
                        FakeDecay(
                            "TEST.MU.GAMMA",
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
                            "TEST.PI.PLUS",
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
                            "TEST.PI.ZERO.ONE.GAMMA",
                            "pi0 -> gamma",
                            [
                                FakeDecayProduct("gamma"),
                            ],
                        ),
                        FakeDecay(
                            "fake",
                            "pi0 -> gamma gamma",
                            [
                                FakeDecayProduct("gamma"),
                                FakeDecayProduct("gamma"),
                            ],
                            mode_number=2,
                        )
                    ],
                    mcid=111,
                ),
            ]
        )

    def parse_markdown_table(self, lines):
        headers = [cell.strip() for cell in lines[0].strip("|").split("|")]
        rows = []
        for line in lines[2:]:
            if not line.strip():
                continue
            values = [cell.strip() for cell in line.strip("|").split("|")]
            rows.append(dict(zip(headers, values)))
        return headers, rows

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

    def test_list_writes_ready_statuses(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            output = self.run_main(["list", "--source", "pdg-reactions"], api, tmp_dir)
            expected_path = str(tmp_dir / "pdgfeed.list.pdg_reactions.md")
            self.assertEqual(output, expected_path)

            lines = (tmp_dir / "pdgfeed.list.pdg_reactions.md").read_text(encoding="utf-8").strip().splitlines()
            headers, rows = self.parse_markdown_table(lines)
            self.assertEqual(headers, ["K/U", "MCID", "PDG ID", "Reaction ID", "Title", "Channel", "Category", "Status"])
            self.assertEqual(len(rows), 5)
            self.assertEqual(rows[0]["Reaction ID"], "mu_minus_test_mu_1")
            self.assertEqual(rows[0]["Category"], "supported")
            self.assertEqual(rows[0]["Status"], "ready")
            self.assertEqual(rows[1]["Reaction ID"], "mu_minus_test_mu_gamma")
            self.assertEqual(rows[1]["Category"], "supported")
            self.assertEqual(rows[1]["Status"], "ready")
            self.assertEqual(rows[2]["Reaction ID"], "pi_plus_test_pi_plus")
            self.assertEqual(rows[2]["Category"], "supported")
            self.assertEqual(rows[2]["Status"], "ready")
            self.assertEqual(rows[3]["Reaction ID"], "pi0_test_pi_zero_one_gamma")
            self.assertEqual(rows[3]["Category"], "supported")
            self.assertEqual(rows[3]["Status"], "ready")
            self.assertEqual(rows[4]["Reaction ID"], "pi0_fake")
            self.assertEqual(rows[4]["Category"], "supported")
            self.assertEqual(rows[4]["Status"], "ready")

    def test_proposal_output_does_not_include_exportable_field(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            proposal_json = self.run_main(["proposal", "mu_minus_test_mu_1", "--source", "pdg-reactions"], api, Path(tmp_dir_name))
            proposal = json.loads(proposal_json)

            self.assertEqual(proposal["proposalId"], "mu_minus_test_mu_1")
            self.assertNotIn("exportable", proposal)
            self.assertEqual(proposal["source"]["knownStatus"], "u")

    def test_request_output_uses_transformed_rows_only(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            request_json = self.run_main(["request", "pi_plus_test_pi_plus", "--source", "pdg-reactions"], api, Path(tmp_dir_name))
            request = json.loads(request_json)

            self.assertEqual(
                [entry["assemblyId"] for entry in request["reactants"]],
                ["pro_up_quark_I", "anti_down_quark_I"],
            )
            self.assertEqual(
                [entry["assemblyId"] for entry in request["products"]],
                ["anti_muon_II", "pro_muon_neutrino_II", "unbound_architrinos_residue"],
            )
            self.assertEqual(request["products"][-1]["electrinoCount"], 2)
            self.assertEqual(request["products"][-1]["positrinoCount"], 2)

    def test_request_uses_full_pi_zero_superposition_transform(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            request_json = self.run_main(["request", "pi0_fake", "--source", "pdg-reactions"], api, Path(tmp_dir_name))
            request = json.loads(request_json)

        self.assertEqual(
            [entry["assemblyId"] for entry in request["reactants"]],
            [
                "pro_up_quark_I",
                "anti_up_quark_I",
                "pro_down_quark_I",
                "anti_down_quark_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
            ],
        )
        self.assertEqual(
            [entry["assemblyId"] for entry in request["products"]],
            [
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "pro_noether_core_I",
                "anti_noether_core_I",
                "unbound_architrinos_residue",
            ],
        )
        self.assertEqual(request["products"][-1]["electrinoCount"], 12)
        self.assertEqual(request["products"][-1]["positrinoCount"], 12)

    def test_supported_csv_writes_ready_rows_and_markdown_sidecar(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            csv_path = tmp_dir / "supported.csv"
            output = self.run_main(["supported-csv", str(csv_path), "--source", "pdg-reactions"], api, tmp_dir)
            self.assertEqual(output.splitlines(), [str(csv_path), str(tmp_dir / "pdgfeed.supported.pdg_reactions.md")])

            csv_lines = csv_path.read_text(encoding="utf-8").strip().splitlines()
            self.assertEqual(
                csv_lines[:6],
                [
                    "known_status,reaction_id,mcid,pdg_identifier,title,reactant_names_aaa,product_names_aaa,reactant_electrinos,product_electrinos,electrino_delta,reactant_positrinos,product_positrinos,positrino_delta",
                    "u,mu_minus_test_mu_1,13,TEST.MU.1,mu- decay mode 1,e2,e.av.v2,20,20,0,14,14,0",
                    "u,mu_minus_test_mu_gamma,13,TEST.MU.GAMMA,mu- decay mode 1,e2,e.av.v2.hp,26,26,0,20,20,0",
                    "u,pi0_test_pi_zero_one_gamma,111,TEST.PI.ZERO.ONE.GAMMA,pi0 decay mode 1,u.au.d.ad,hp,36,36,0,36,36,0",
                    "u,pi0_fake,111,fake,pi0 decay mode 2,u.au.d.ad,hp.hp,36,36,0,36,36,0",
                    "u,pi_plus_test_pi_plus,211,TEST.PI.PLUS,pi+ decay mode 1,u.ad,ae2.v2,9,9,0,15,15,0",
                ],
            )

            markdown_lines = (tmp_dir / "pdgfeed.supported.pdg_reactions.md").read_text(encoding="utf-8").strip().splitlines()
            headers, rows = self.parse_markdown_table(markdown_lines)
            self.assertEqual(
                headers,
                [
                    "K/U",
                    "Reaction ID",
                    "PDG ID",
                    "Title",
                    "Category",
                    "Reactant AAA",
                    "Product AAA",
                    "Transformed Reactant AAA",
                    "Transformed Product AAA",
                    "Reactant Ledger",
                    "Product Ledger",
                    "Delta Ledger",
                ],
            )
            self.assertEqual(
                [row["Reaction ID"] for row in rows],
                [
                    "mu_minus_test_mu_1",
                    "mu_minus_test_mu_gamma",
                    "pi0_test_pi_zero_one_gamma",
                    "pi0_fake",
                    "pi_plus_test_pi_plus",
                ],
            )
            row_by_id = {row["Reaction ID"]: row for row in rows}
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Category"], "supported")
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Transformed Reactant AAA"], "e2.h.ah.h.ah")
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Transformed Product AAA"], "e.av.v2")
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Reactant Ledger"], "20.14@")
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Product Ledger"], "20.14@")
            self.assertEqual(row_by_id["mu_minus_test_mu_1"]["Delta Ledger"], "0.0@")
            self.assertEqual(row_by_id["mu_minus_test_mu_gamma"]["Transformed Reactant AAA"], "e2.h.ah.h.ah.h.ah")
            self.assertEqual(row_by_id["mu_minus_test_mu_gamma"]["Transformed Product AAA"], "e.av.v2.h.ah")
            self.assertEqual(row_by_id["mu_minus_test_mu_gamma"]["Delta Ledger"], "0.0@")
            self.assertEqual(row_by_id["pi0_test_pi_zero_one_gamma"]["Reactant AAA"], "u.au.d.ad")
            self.assertEqual(row_by_id["pi0_test_pi_zero_one_gamma"]["Transformed Reactant AAA"], "u.au.d.ad.h.ah.h.ah")
            self.assertEqual(row_by_id["pi0_test_pi_zero_one_gamma"]["Transformed Product AAA"], "h.ah.h.ah.h.ah.h.ah.12:12@")
            self.assertEqual(row_by_id["pi0_test_pi_zero_one_gamma"]["Delta Ledger"], "0.0@")
            self.assertEqual(row_by_id["pi_plus_test_pi_plus"]["Transformed Reactant AAA"], "u.ad")
            self.assertEqual(row_by_id["pi_plus_test_pi_plus"]["Transformed Product AAA"], "ae2.v2.2:2@")
            self.assertEqual(row_by_id["pi_plus_test_pi_plus"]["Delta Ledger"], "0.0@")
            self.assertEqual(row_by_id["pi0_fake"]["Reactant AAA"], "u.au.d.ad")
            self.assertEqual(row_by_id["pi0_fake"]["Transformed Reactant AAA"], "u.au.d.ad.h.ah.h.ah")
            self.assertEqual(row_by_id["pi0_fake"]["Transformed Product AAA"], "h.ah.h.ah.h.ah.h.ah.12:12@")
            self.assertEqual(row_by_id["pi0_fake"]["Delta Ledger"], "0.0@")

    def test_summary_report_writes_counts_markdown(self):
        api = self.build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            with (
                patch.object(pdgfeed_runtime, "connect_pdg", return_value=api),
                patch.object(pdgfeed_live, "connect_pdg", return_value=api),
                patch.object(pdgfeed_runtime, "DEFAULT_TMP_DIR", tmp_dir),
            ):
                output_path = pdgfeed.write_live_reaction_summary_report("pdg-reactions")

            self.assertEqual(output_path, tmp_dir / "pdgfeed.summary.pdg_reactions.md")
            content = output_path.read_text(encoding="utf-8").strip().split("\n\n")
            self.assertEqual(len(content), 2)
            headers, rows = self.parse_markdown_table(content[0].splitlines())
            self.assertEqual(headers, ["Metric", "Count"])
            self.assertEqual(
                rows,
                [
                    {"Metric": "Number of total PDG reactions", "Count": "5"},
                    {"Metric": "Number of incomplete PDG reactions", "Count": "0"},
                    {"Metric": "Number of AAAcomplete reactions", "Count": "0"},
                    {"Metric": "Number of backlog reactions", "Count": "0"},
                    {"Metric": "Number of PDG reactions supported and transformed into AAA", "Count": "5"},
                    {"Metric": "Number of reactions closed by total primitive balance", "Count": "5"},
                    {"Metric": "Number of total-balance closures with product unbound architrinos", "Count": "3"},
                    {"Metric": "Number of total-balance closures without product unbound architrinos", "Count": "2"},
                    {"Metric": "Number of ready reactions lacking total primitive balance", "Count": "0"},
                    {"Metric": "Number of reactions ready", "Count": "5"},
                    {"Metric": "Number of reactions blocked", "Count": "0"},
                ],
            )
            residue_headers, residue_rows = self.parse_markdown_table(content[1].splitlines())
            self.assertEqual(residue_headers, ["Product Unbound Architrino Counts", "Count"])
            self.assertEqual(
                residue_rows,
                [
                    {"Product Unbound Architrino Counts": "0:0", "Count": "2"},
                    {"Product Unbound Architrino Counts": "12:12", "Count": "2"},
                    {"Product Unbound Architrino Counts": "2:2", "Count": "1"},
                ],
            )

    def test_summary_report_omits_backlog_table_when_phi_is_supported(self):
        api = FakeApi(
            [
                FakeParticle(
                    "B+",
                    [
                        FakeDecay(
                            "TEST.B.PHI",
                            "B+ -> K+ phi",
                            [FakeDecayProduct("K+"), FakeDecayProduct("phi")],
                        )
                    ],
                    mcid=521,
                )
            ]
        )
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            with (
                patch.object(pdgfeed_runtime, "connect_pdg", return_value=api),
                patch.object(pdgfeed_live, "connect_pdg", return_value=api),
                patch.object(pdgfeed_runtime, "DEFAULT_TMP_DIR", tmp_dir),
            ):
                output_path = pdgfeed.write_live_reaction_summary_report("pdg-reactions")

            content = output_path.read_text(encoding="utf-8").strip().split("\n\n")
            self.assertEqual(len(content), 2)
            metric_headers, metric_rows = self.parse_markdown_table(content[0].splitlines())
            self.assertEqual(metric_headers, ["Metric", "Count"])
            self.assertEqual(metric_rows[2], {"Metric": "Number of AAAcomplete reactions", "Count": "0"})
            self.assertEqual(metric_rows[3], {"Metric": "Number of backlog reactions", "Count": "0"})
            self.assertEqual(metric_rows[4], {"Metric": "Number of PDG reactions supported and transformed into AAA", "Count": "1"})
            self.assertEqual(metric_rows[5], {"Metric": "Number of reactions closed by total primitive balance", "Count": "1"})
            self.assertEqual(
                metric_rows[6],
                {"Metric": "Number of total-balance closures with product unbound architrinos", "Count": "1"},
            )
            self.assertEqual(
                metric_rows[7],
                {"Metric": "Number of total-balance closures without product unbound architrinos", "Count": "0"},
            )
            self.assertEqual(metric_rows[8], {"Metric": "Number of ready reactions lacking total primitive balance", "Count": "0"})
            self.assertEqual(metric_rows[9], {"Metric": "Number of reactions ready", "Count": "1"})
            self.assertEqual(metric_rows[10], {"Metric": "Number of reactions blocked", "Count": "0"})
            residue_headers, residue_rows = self.parse_markdown_table(content[1].splitlines())
            self.assertEqual(residue_headers, ["Product Unbound Architrino Counts", "Count"])
            self.assertEqual(
                residue_rows,
                [
                    {"Product Unbound Architrino Counts": "1:1", "Count": "1"},
                ],
            )


if __name__ == "__main__":
    unittest.main()
