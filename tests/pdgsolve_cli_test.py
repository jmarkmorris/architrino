import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path

import pdgsolve


class PdgsolveCliTests(unittest.TestCase):
    def read_json(self, path):
        return json.loads(Path(path).read_text(encoding="utf-8"))

    def run_main(self, args):
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            exit_code = pdgsolve.main(args)
        self.assertEqual(exit_code, 0)
        return stdout.getvalue().strip()

    def test_solve_known_request_matches_checked_in_example(self):
        request = pdgsolve.get_vertical_slice_request()
        result = pdgsolve.solve_request(request)
        expected = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_RESULT_PATH)

        self.assertEqual(result, expected)
        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], pdgsolve.DEFAULT_VERTICAL_SLICE_FAMILY_ID)

    def test_accept_known_result_matches_checked_in_example(self):
        request = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_REQUEST_PATH)
        result = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_RESULT_PATH)
        acceptance = pdgsolve.build_acceptance(
            request,
            result,
            family_id=pdgsolve.DEFAULT_VERTICAL_SLICE_FAMILY_ID,
        )
        expected = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH)

        self.assertEqual(acceptance, expected)
        self.assertEqual(acceptance["acceptedState"], "accepted")
        self.assertEqual(acceptance["familyId"], pdgsolve.DEFAULT_VERTICAL_SLICE_FAMILY_ID)

    def test_publish_known_acceptance_matches_checked_in_pdgedit_document(self):
        acceptance = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH)
        pdgedit_document = pdgsolve.build_pdgedit_document_from_acceptance(acceptance)
        expected = self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_PDGEDIT_PATH)

        self.assertEqual(pdgedit_document, expected)
        self.assertEqual(pdgedit_document["schema"], "pdgedit/v1")
        self.assertEqual(len(pdgedit_document["assemblies"]), 13)
        self.assertEqual(len(pdgedit_document["operators"]), 8)

    def test_solve_manifest_writes_per_case_results_and_a_batch_index(self):
        unsupported_request = pdgsolve.get_vertical_slice_request()
        unsupported_request["requestId"] = "unsupported_beta_variant"
        unsupported_request["products"] = unsupported_request["products"][:-1]

        manifest = {
            "schema": "pdg-live-manifest/v1",
            "readyCount": 2,
            "blockedCount": 0,
            "topBlockedParticles": [],
            "readyEntries": [
                {
                    "batchId": 1,
                    "caseId": "free_neutron_beta_exact",
                    "proposalId": "free_neutron_beta_decay",
                    "pdgsolveRequest": pdgsolve.get_vertical_slice_request(),
                },
                {
                    "batchId": 2,
                    "caseId": "unsupported_beta_variant",
                    "proposalId": "unsupported_beta_variant",
                    "pdgsolveRequest": unsupported_request,
                },
            ],
            "blockedEntries": [],
        }

        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            manifest_path = tmp_dir / "manifest.json"
            index_path = tmp_dir / "index.json"
            output_dir = tmp_dir / "results"
            manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

            output = self.run_main(
                [
                    "solve-manifest",
                    str(manifest_path),
                    "--output-dir",
                    str(output_dir),
                    "--write-index",
                    str(index_path),
                ]
            )

            self.assertEqual(output.splitlines(), [str(output_dir), str(index_path)])
            index_payload = self.read_json(index_path)
            self.assertEqual(index_payload["schema"], "pdgsolve-result-corpus/v1")
            self.assertEqual(index_payload["solvedCount"], 2)
            self.assertEqual(index_payload["exactAvailableCount"], 1)
            self.assertEqual(index_payload["noExactClosureCount"], 1)
            self.assertEqual(len(index_payload["results"]), 2)
            first_result_path = tmp_dir / index_payload["results"][0]["resultPath"]
            second_result_path = tmp_dir / index_payload["results"][1]["resultPath"]
            self.assertTrue(first_result_path.exists())
            self.assertTrue(second_result_path.exists())
            self.assertEqual(self.read_json(first_result_path)["searchStatus"], "exact_available")
            self.assertEqual(self.read_json(second_result_path)["searchStatus"], "no_exact_closure")

    def test_write_vertical_slice_command_writes_all_upstream_artifacts(self):
        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            request_path = tmp_dir / "request.json"
            result_path = tmp_dir / "result.json"
            acceptance_path = tmp_dir / "acceptance.json"
            pdgedit_path = tmp_dir / "published.json"
            pdgedit_package_path = tmp_dir / "package.json"
            output = self.run_main(
                [
                    "write-vertical-slice",
                    "--request-path",
                    str(request_path),
                    "--result-path",
                    str(result_path),
                    "--acceptance-path",
                    str(acceptance_path),
                    "--pdgedit-path",
                    str(pdgedit_path),
                    "--pdgedit-package-path",
                    str(pdgedit_package_path),
                ]
            )

            self.assertEqual(
                output.splitlines(),
                [
                    str(request_path),
                    str(result_path),
                    str(acceptance_path),
                    str(pdgedit_path),
                    str(pdgedit_package_path),
                ],
            )
            self.assertEqual(self.read_json(request_path), self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_REQUEST_PATH))
            self.assertEqual(self.read_json(result_path), self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_RESULT_PATH))
            self.assertEqual(
                self.read_json(acceptance_path),
                self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_ACCEPTANCE_PATH),
            )
            self.assertEqual(self.read_json(pdgedit_path), self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_PDGEDIT_PATH))
            self.assertEqual(
                self.read_json(pdgedit_package_path),
                self.read_json(pdgsolve.DEFAULT_VERTICAL_SLICE_PDGEDIT_PACKAGE_PATH),
            )


if __name__ == "__main__":
    unittest.main()
