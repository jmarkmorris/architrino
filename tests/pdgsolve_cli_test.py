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

    def assert_product_side_consumes_partitioned_intermediate_ledger(self, family):
        intermediate_ids = {
            unit["occurrenceKey"]
            for unit in family["canonicalCandidate"]["solveGraph"]["units"]
            if unit["stage"] == "intermediateAssemblies"
        }
        consumed_ids = []
        for choice in family["productSideOperators"]:
            for occurrence_key in choice["inputOccurrenceKeys"]:
                self.assertIn(occurrence_key, intermediate_ids)
                consumed_ids.append(occurrence_key)
        self.assertEqual(sorted(consumed_ids), sorted(intermediate_ids))

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

    def test_solve_request_matches_exact_mu_minus_decay_family_with_core_and_residue_intermediates(self):
        request = {
            "schema": "pdgsolve-request/v1",
            "requestId": "mu_minus_s004_1",
            "source": {
                "kind": "pdgfeed",
                "title": "mu- decay mode 1",
                "sourceDocumentId": "pdg-proposal:mu_minus_s004_1",
            },
            "reactants": [
                {"id": "reactant_muon_1", "assemblyId": "pro_muon_II", "title": "Muon"},
                {"id": "reactant_noether_pair_1.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_1.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_2.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_2.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
            ],
            "products": [
                {"id": "product_electron_1", "assemblyId": "pro_electron_I", "title": "Electron"},
                {"id": "product_anti_electron_neutrino_2", "assemblyId": "anti_electron_neutrino_I", "title": "Anti Electron Neutrino"},
                {"id": "product_muon_neutrino_3", "assemblyId": "pro_muon_neutrino_II", "title": "Muon Neutrino"},
            ],
            "policy": {
                "exactClosureRequired": True,
                "allowedBoundaryAugmentations": ["none"],
            },
        }

        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], "family.mu_minus.decay.exact.v2")
        family = result["optionFamilies"][0]
        self.assertEqual(
            family["intermediateAssemblies"],
            [
                {"assemblyId": "pro_noether_core_II", "count": 1},
                {"assemblyId": "unbound_architrinos_residue", "count": 1},
                {"assemblyId": "pro_noether_core_I", "count": 2},
                {"assemblyId": "anti_noether_core_I", "count": 2},
            ],
        )
        self.assertEqual(family["productSideOperators"][0]["type"], "associate")
        self.assertEqual(
            [choice["type"] for choice in family["reactantSideOperators"]],
            ["dissociate", "pass-thru", "pass-thru", "pass-thru", "pass-thru"],
        )
        self.assert_product_side_consumes_partitioned_intermediate_ledger(family)
        self.assertTrue(
            any(
                unit["recipeId"] == "unbound_architrinos_residue"
                and unit["electrinoCount"] == 6
                and unit["positrinoCount"] == 0
                for unit in family["canonicalCandidate"]["solveGraph"]["units"]
            )
        )

    def test_solve_request_matches_exact_mu_plus_radiative_family_with_core_and_residue_intermediates(self):
        request = {
            "schema": "pdgsolve-request/v1",
            "requestId": "mu_plus_s004_2",
            "source": {
                "kind": "pdgfeed",
                "title": "mu+ decay mode 2",
                "sourceDocumentId": "pdg-proposal:mu_plus_s004_2",
            },
            "reactants": [
                {"id": "reactant_anti_muon_1", "assemblyId": "anti_muon_II", "title": "Anti Muon"},
                {"id": "reactant_noether_pair_1.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_1.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_2.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_2.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_3.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_3.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
            ],
            "products": [
                {"id": "product_positron_1", "assemblyId": "anti_electron_I", "title": "Positron"},
                {"id": "product_electron_neutrino_2", "assemblyId": "pro_electron_neutrino_I", "title": "Electron Neutrino"},
                {"id": "product_anti_muon_neutrino_3", "assemblyId": "anti_muon_neutrino_II", "title": "Anti Muon Neutrino"},
                {"id": "product_photon_4.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "product_photon_4.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
            ],
            "policy": {
                "exactClosureRequired": True,
                "allowedBoundaryAugmentations": ["none"],
            },
        }

        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], "family.mu_plus.radiative.exact.v2")
        family = result["optionFamilies"][0]
        self.assertEqual(
            family["intermediateAssemblies"],
            [
                {"assemblyId": "anti_noether_core_II", "count": 1},
                {"assemblyId": "unbound_architrinos_residue", "count": 1},
                {"assemblyId": "pro_noether_core_I", "count": 3},
                {"assemblyId": "anti_noether_core_I", "count": 3},
            ],
        )
        self.assertEqual(
            [choice["type"] for choice in family["reactantSideOperators"]],
            ["dissociate", "pass-thru", "pass-thru", "pass-thru", "pass-thru", "pass-thru", "pass-thru"],
        )
        self.assertEqual(
            [choice["type"] for choice in family["productSideOperators"]],
            ["associate", "associate", "associate", "pass-thru", "pass-thru"],
        )
        self.assert_product_side_consumes_partitioned_intermediate_ledger(family)
        self.assertEqual(family["canonicalCandidate"]["solveGraph"]["schema"], "pdgsolve-publication-graph/v1")

    def test_solve_request_keeps_mu_minus_pair_family_unsolved(self):
        request = {
            "schema": "pdgsolve-request/v1",
            "requestId": "mu_minus_s004_7",
            "source": {
                "kind": "pdgfeed",
                "title": "mu- decay mode 7",
                "sourceDocumentId": "pdg-proposal:mu_minus_s004_7",
            },
            "reactants": [
                {"id": "reactant_muon_1", "assemblyId": "pro_muon_II", "title": "Muon"},
                {"id": "reactant_noether_pair_1.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_1.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_2.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_2.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_3.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_3.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
                {"id": "reactant_noether_pair_4.row.1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
                {"id": "reactant_noether_pair_4.row.2", "assemblyId": "anti_noether_core_I", "title": "Anti Noether Core"},
            ],
            "products": [
                {"id": "product_electron_1", "assemblyId": "pro_electron_I", "title": "Electron"},
                {"id": "product_anti_electron_neutrino_2", "assemblyId": "anti_electron_neutrino_I", "title": "Anti Electron Neutrino"},
                {"id": "product_muon_neutrino_3", "assemblyId": "pro_muon_neutrino_II", "title": "Muon Neutrino"},
                {"id": "product_positron_4", "assemblyId": "anti_electron_I", "title": "Positron"},
                {"id": "product_electron_5", "assemblyId": "pro_electron_I", "title": "Electron"},
            ],
            "policy": {
                "exactClosureRequired": True,
                "allowedBoundaryAugmentations": ["none"],
            },
        }

        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "no_exact_closure")
        self.assertEqual(result["bestFamilyId"], "family.unsolved.v1")

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
            pdgedit_output_dir = tmp_dir / "pdgedit-documents"
            pdgedit_manifest_path = tmp_dir / "pdgedit-manifest.json"
            manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

            output = self.run_main(
                [
                    "solve-manifest",
                    str(manifest_path),
                    "--output-dir",
                    str(output_dir),
                    "--write-index",
                    str(index_path),
                    "--pdgedit-output-dir",
                    str(pdgedit_output_dir),
                    "--write-pdgedit-manifest",
                    str(pdgedit_manifest_path),
                ]
            )

            self.assertEqual(
                output.splitlines(),
                [str(output_dir), str(index_path), str(pdgedit_manifest_path)],
            )
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
            pdgedit_manifest = self.read_json(pdgedit_manifest_path)
            self.assertEqual(pdgedit_manifest["schema"], "pdgedit-library-manifest/v1")
            self.assertEqual(len(pdgedit_manifest["entries"]), 1)
            published_path = tmp_dir / pdgedit_manifest["entries"][0]["documentPath"]
            self.assertTrue(published_path.exists())

    def test_parse_args_uses_repo_local_tmp_defaults_for_manifest_solves(self):
        args = pdgsolve.parse_args(["solve-manifest", "manifest.json"])

        self.assertEqual(args.output_dir, pdgsolve.DEFAULT_RESULT_CORPUS_OUTPUT_DIR)
        self.assertEqual(args.write_index, pdgsolve.DEFAULT_RESULT_CORPUS_INDEX_PATH)
        self.assertEqual(args.pdgedit_output_dir, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR)
        self.assertEqual(args.write_pdgedit_manifest, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH)

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
