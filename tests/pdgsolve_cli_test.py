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
