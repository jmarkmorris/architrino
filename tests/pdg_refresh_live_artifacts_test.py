import json
import tempfile
import unittest
from pathlib import Path

from scripts.pdg.pdg_refresh_live_artifacts import refresh_live_pdg_artifacts
from pdgfeed_test_fakes import FakeApi, FakeDecay, FakeDecayProduct, FakeParticle


def build_api():
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
                        value=0.95,
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
                        value=0.85,
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
                        value=0.75,
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
                        value=0.65,
                    ),
                    FakeDecay(
                        "fake",
                        "pi0 -> gamma gamma",
                        [
                            FakeDecayProduct("gamma"),
                            FakeDecayProduct("gamma"),
                        ],
                        mode_number=2,
                        value=0.05,
                    ),
                ],
                mcid=111,
            ),
        ]
    )


class PdgRefreshLiveArtifactsTests(unittest.TestCase):
    def test_refresh_rebuilds_reports_and_live_pdgedit_outputs_from_clean_slate(self):
        api = build_api()
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            pdgsolve_tmp_dir = tmp_dir / ".tmp" / "pdgsolve"
            stats_dir = tmp_dir / "stats"
            supported_csv_path = tmp_dir / "content" / "contracts" / "examples" / "pdg" / "v1" / "generated" / "supported.csv"
            list_report_path = stats_dir / "pdgfeed.list.pdg_reactions.md"
            supported_report_path = stats_dir / "pdgfeed.supported.pdg_reactions.md"
            summary_report_path = stats_dir / "pdgfeed.summary.pdg_reactions.md"
            live_manifest_path = pdgsolve_tmp_dir / "manifest.v1.json"
            result_corpus_index_path = pdgsolve_tmp_dir / "result-corpus.v1.json"
            pdgedit_manifest_path = pdgsolve_tmp_dir / "pdgedit" / "manifest.v1.json"

            stale_document_path = pdgsolve_tmp_dir / "pdgedit" / "documents" / "stale.pdgedit.v1.json"
            stale_document_path.parent.mkdir(parents=True, exist_ok=True)
            stale_document_path.write_text("stale", encoding="utf-8")
            list_report_path.parent.mkdir(parents=True, exist_ok=True)
            list_report_path.write_text("stale list", encoding="utf-8")
            supported_report_path.write_text("stale supported", encoding="utf-8")
            summary_report_path.write_text("stale summary", encoding="utf-8")
            supported_csv_path.parent.mkdir(parents=True, exist_ok=True)
            supported_csv_path.write_text("stale csv", encoding="utf-8")

            output_paths = refresh_live_pdg_artifacts(
                api=api,
                pdgsolve_tmp_dir=pdgsolve_tmp_dir,
                live_manifest_path=live_manifest_path,
                result_corpus_index_path=result_corpus_index_path,
                pdgedit_manifest_path=pdgedit_manifest_path,
                supported_csv_path=supported_csv_path,
                list_report_path=list_report_path,
                supported_report_path=supported_report_path,
                summary_report_path=summary_report_path,
            )

            self.assertFalse(stale_document_path.exists())
            self.assertEqual(output_paths["listReportPath"], list_report_path)
            self.assertEqual(output_paths["supportedCsvPath"], supported_csv_path)
            self.assertEqual(output_paths["summaryReportPath"], summary_report_path)
            self.assertTrue(list_report_path.exists())
            self.assertTrue(supported_report_path.exists())
            self.assertTrue(summary_report_path.exists())
            self.assertTrue(live_manifest_path.exists())
            self.assertTrue(result_corpus_index_path.exists())
            self.assertTrue(pdgedit_manifest_path.exists())

            self.assertIn("mu_minus_test_mu_1", list_report_path.read_text(encoding="utf-8"))
            self.assertIn("Transformed Product AAA", supported_report_path.read_text(encoding="utf-8"))
            self.assertIn("Number of total PDG reactions", summary_report_path.read_text(encoding="utf-8"))

            manifest_payload = json.loads(live_manifest_path.read_text(encoding="utf-8"))
            result_corpus_payload = json.loads(result_corpus_index_path.read_text(encoding="utf-8"))
            pdgedit_manifest_payload = json.loads(pdgedit_manifest_path.read_text(encoding="utf-8"))

            self.assertEqual(manifest_payload["readyCount"], 5)
            self.assertEqual(result_corpus_payload["schema"], "pdgsolve-result-corpus/v1")
            self.assertEqual(pdgedit_manifest_payload["schema"], "pdgedit-library-manifest/v1")
            self.assertTrue(pdgedit_manifest_payload["entries"])


if __name__ == "__main__":
    unittest.main()
