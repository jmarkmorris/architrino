import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path

import pdgsolve


def make_unsolved_request(request_id="reference_unsolved"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Reference unsolved request",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
        ],
        "products": [
            {"id": "product_1", "assemblyId": "pro_electron_I", "title": "Electron"},
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_pass_thru_request(request_id="reference_exact"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Reference exact request",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
        ],
        "products": [
            {"id": "product_1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_core_to_residue_request(request_id="core_to_residue"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Core to residue",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_core_1", "assemblyId": "pro_noether_core_I", "title": "Pro Noether Core"},
        ],
        "products": [
            {
                "id": "product_residue_1",
                "assemblyId": "unbound_architrinos_residue",
                "title": "Unbound Architrinos",
                "electrinoCount": 3,
                "positrinoCount": 3,
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_muon_decay_mode_1_request(request_id="mu_minus_s004_1"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "mu- decay mode 1",
            "sourceDocumentId": f"developer:{request_id}",
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
            {
                "id": "product_anti_electron_neutrino_2",
                "assemblyId": "anti_electron_neutrino_I",
                "title": "Anti Electron Neutrino",
            },
            {
                "id": "product_muon_neutrino_3",
                "assemblyId": "pro_muon_neutrino_II",
                "title": "Pro Muon Neutrino",
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_exact_result(request):
    reactant_id = request["reactants"][0]["id"]
    product_id = request["products"][0]["id"]
    return {
        "schema": "pdgsolve-result/v1",
        "problemId": f"pdgsolve_problem_{request['requestId']}",
        "searchStatus": "exact_available",
        "bestFamilyId": "family.synthetic.pass_thru.v1",
        "acceptedFamilyId": None,
        "diagnostics": [],
        "optionFamilies": [
            {
                "familyId": "family.synthetic.pass_thru.v1",
                "kind": "exact",
                "score": {
                    "exactness": 0,
                    "primitiveMismatch": 0,
                    "middleMismatch": 0,
                    "auxiliaryBurden": 0,
                    "nonIdentityOperatorCount": 0,
                    "dissociationCount": 0,
                    "ambiguityPenalty": 0,
                    "tieBreakKey": "synthetic_pass_thru",
                },
                "augmentation": {
                    "reactantSide": "none",
                    "productSide": "none",
                },
                "reactantAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                "reactantSideOperators": [
                    {
                        "id": "reactant_operator.pass_thru.1",
                        "type": "pass-thru",
                        "lawId": None,
                        "inputOccurrenceKeys": [reactant_id],
                        "outputOccurrenceKeys": ["intermediate_up_quark_1"],
                    }
                ],
                "intermediateAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                "productSideOperators": [
                    {
                        "id": "product_operator.pass_thru.1",
                        "type": "pass-thru",
                        "lawId": None,
                        "inputOccurrenceKeys": ["intermediate_up_quark_1"],
                        "outputOccurrenceKeys": [product_id],
                    }
                ],
                "productAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                "provenanceSummary": {
                    "summaryText": "Synthetic pass-thru exact family used for CLI contract tests.",
                    "outputs": [
                        {
                            "occurrenceKey": product_id,
                            "provenanceClass": "pass_thru",
                            "supportSourceRows": [],
                            "ambiguous": False,
                        }
                    ],
                },
                "diagnostics": [],
                "rawBranchCount": 1,
                "publicationReady": True,
                "canonicalCandidate": {
                    "candidateId": "candidate.synthetic.pass_thru.v1",
                    "exact": True,
                    "reactantAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                    "reactantSideOperators": [
                        {
                            "id": "reactant_operator.pass_thru.1",
                            "type": "pass-thru",
                            "lawId": None,
                            "inputOccurrenceKeys": [reactant_id],
                            "outputOccurrenceKeys": ["intermediate_up_quark_1"],
                        }
                    ],
                    "intermediateAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                    "productSideOperators": [
                        {
                            "id": "product_operator.pass_thru.1",
                            "type": "pass-thru",
                            "lawId": None,
                            "inputOccurrenceKeys": ["intermediate_up_quark_1"],
                            "outputOccurrenceKeys": [product_id],
                        }
                    ],
                    "productAssemblies": [{"assemblyId": "pro_up_quark_I", "count": 1}],
                    "provenanceSummary": {
                        "summaryText": "Synthetic pass-thru exact family used for CLI contract tests.",
                        "outputs": [
                            {
                                "occurrenceKey": product_id,
                                "provenanceClass": "pass_thru",
                                "supportSourceRows": [],
                                "ambiguous": False,
                            }
                        ],
                    },
                    "solveGraph": {
                        "schema": "pdgsolve-publication-graph/v1",
                        "units": [
                            {
                                "id": "unit_lane1_up.row.1",
                                "kind": "assembly",
                                "stage": "reactantAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": reactant_id,
                                "title": "Up Quark",
                                "anchorRow": 0,
                                "column": 0,
                                "x": 2,
                            },
                            {
                                "id": "unit_lane2_pass_thru_1",
                                "kind": "operator",
                                "stage": "reactantSideOperators",
                                "recipeId": "pass-thru",
                                "occurrenceKey": "reactant_operator.pass_thru.1",
                                "title": "Pass Thru",
                                "anchorRow": 0,
                                "column": 1,
                                "x": 9,
                            },
                            {
                                "id": "unit_lane3_up.row.1",
                                "kind": "assembly",
                                "stage": "intermediateAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": "intermediate_up_quark_1",
                                "title": "Up Quark",
                                "anchorRow": 0,
                                "column": 2,
                                "x": 16,
                            },
                            {
                                "id": "unit_lane4_pass_thru_1",
                                "kind": "operator",
                                "stage": "productSideOperators",
                                "recipeId": "pass-thru",
                                "occurrenceKey": "product_operator.pass_thru.1",
                                "title": "Pass Thru",
                                "anchorRow": 0,
                                "column": 3,
                                "x": 23,
                            },
                            {
                                "id": "unit_lane5_up.row.1",
                                "kind": "assembly",
                                "stage": "productAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": product_id,
                                "title": "Up Quark",
                                "anchorRow": 0,
                                "column": 4,
                                "x": 30,
                            },
                        ],
                        "edges": [
                            {
                                "id": "edge_reactant_to_operator",
                                "fromUnitId": "unit_lane1_up.row.1",
                                "fromPortId": "output",
                                "toUnitId": "unit_lane2_pass_thru_1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_operator_to_intermediate",
                                "fromUnitId": "unit_lane2_pass_thru_1",
                                "fromPortId": "output",
                                "toUnitId": "unit_lane3_up.row.1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_intermediate_to_operator",
                                "fromUnitId": "unit_lane3_up.row.1",
                                "fromPortId": "output",
                                "toUnitId": "unit_lane4_pass_thru_1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_operator_to_product",
                                "fromUnitId": "unit_lane4_pass_thru_1",
                                "fromPortId": "output",
                                "toUnitId": "unit_lane5_up.row.1",
                                "toPortId": "input",
                            },
                        ],
                    },
                },
            }
        ],
        "review": {
            "schema": "pdgsolve-review-state/v1",
            "state": "review_ready",
            "selectedFamilyId": "family.synthetic.pass_thru.v1",
            "acceptedFamilyId": None,
            "acceptedRecord": None,
            "blockingDiagnostics": [],
        },
        "publication": None,
    }


class PdgsolveCliTests(unittest.TestCase):
    def read_json(self, path):
        return json.loads(Path(path).read_text(encoding="utf-8"))

    def run_main(self, args):
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            exit_code = pdgsolve.main(args)
        self.assertEqual(exit_code, 0)
        return stdout.getvalue().strip()

    def test_solve_request_returns_deterministic_no_exact_closure(self):
        result = pdgsolve.solve_request(make_unsolved_request())

        self.assertEqual(result["searchStatus"], "no_exact_closure")
        self.assertEqual(result["bestFamilyId"], "family.unsolved.v1")
        self.assertEqual(result["problemId"], "pdgsolve_problem_reference_unsolved")

    def test_build_acceptance_rejects_non_exact_families(self):
        request = make_unsolved_request()
        result = pdgsolve.solve_request(request)

        with self.assertRaisesRegex(ValueError, "Only exact families can be accepted"):
            pdgsolve.build_acceptance(request, result, family_id="family.unsolved.v1")

    def test_solve_request_returns_publication_ready_exact_family_for_pass_thru(self):
        request = make_pass_thru_request("pass_thru_exact")
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], "family.exact.1")
        family = result["optionFamilies"][0]
        self.assertTrue(family["publicationReady"])
        self.assertEqual(family["canonicalCandidate"]["solveGraph"]["schema"], "pdgsolve-publication-graph/v1")
        self.assertEqual(family["productSideOperators"][0]["type"], "pass-thru")
        self.assertEqual(family["productSideOperators"][0]["inputOccurrenceKeys"], ["intermediate.reactant_1.catalyst.1"])

    def test_solve_request_maps_extra_core_directly_to_residue(self):
        request = make_core_to_residue_request()
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        family = result["optionFamilies"][0]
        self.assertEqual(family["familyId"], "family.exact.1")
        self.assertEqual(len(family["reactantSideOperators"]), 1)
        self.assertEqual(
            [choice["lawId"] for choice in family["reactantSideOperators"]],
            ["dissociate.pro_noether_core_I.to_residue"],
        )
        self.assertTrue(family["publicationReady"])

    def test_publication_graph_uses_fixed_width_columns_for_pass_thru(self):
        request = make_pass_thru_request("pass_thru_graph")
        result = pdgsolve.solve_request(request)
        acceptance = pdgsolve.build_acceptance(request, result, family_id=result["bestFamilyId"])
        solve_graph = acceptance["lockedSolveGraph"]
        x_by_stage = {
            unit["stage"]: unit["x"]
            for unit in solve_graph["units"]
            if unit["kind"] == "assembly" or unit["kind"] == "operator"
        }
        self.assertEqual(
            x_by_stage,
            {
                "reactantAssemblies": pdgsolve.FIXED_WIDTH_X_BY_STAGE["reactantAssemblies"],
                "reactantSideOperators": pdgsolve.FIXED_WIDTH_X_BY_STAGE["reactantSideOperators"],
                "intermediateAssemblies": pdgsolve.FIXED_WIDTH_X_BY_STAGE["intermediateAssemblies"],
                "productSideOperators": pdgsolve.FIXED_WIDTH_X_BY_STAGE["productSideOperators"],
                "productAssemblies": pdgsolve.FIXED_WIDTH_X_BY_STAGE["productAssemblies"],
            },
        )

    def test_muon_decay_falls_back_to_no_exact_closure_under_simple_core_rules(self):
        request = make_muon_decay_mode_1_request()
        result = pdgsolve.solve_request(request)
        self.assertEqual(result["searchStatus"], "no_exact_closure")
        self.assertEqual(result["bestFamilyId"], "family.unsolved.v1")

    def test_publish_command_writes_pdgedit_document_from_explicit_acceptance(self):
        request = make_unsolved_request("synthetic_pass_thru")
        result = make_exact_result(request)
        acceptance = pdgsolve.build_acceptance(
            request,
            result,
            family_id="family.synthetic.pass_thru.v1",
        )

        with tempfile.TemporaryDirectory() as tmp_dir_name:
            tmp_dir = Path(tmp_dir_name)
            acceptance_path = tmp_dir / "acceptance.json"
            output_path = tmp_dir / "published.json"
            acceptance_path.write_text(json.dumps(acceptance, indent=2), encoding="utf-8")

            output = self.run_main(["publish", str(acceptance_path), "--write", str(output_path)])

            self.assertEqual(output, str(output_path))
            published = self.read_json(output_path)
            self.assertEqual(published["schema"], "pdgedit/v1")
            self.assertEqual(len(published["assemblies"]), 3)
            self.assertEqual(len(published["operators"]), 2)
            self.assertEqual(published["assemblies"][0]["type"], "pro-up-quark-assembly")

    def test_solve_manifest_writes_only_unsolved_results_and_empty_pdgedit_manifest(self):
        manifest = {
            "schema": "pdg-live-manifest/v1",
            "readyCount": 2,
            "blockedCount": 0,
            "topBlockedParticles": [],
            "readyEntries": [
                {
                    "batchId": 1,
                    "caseId": "reference_unsolved_a",
                    "proposalId": "reference_unsolved_a",
                    "pdgsolveRequest": make_unsolved_request("reference_unsolved_a"),
                },
                {
                    "batchId": 2,
                    "caseId": "reference_unsolved_b",
                    "proposalId": "reference_unsolved_b",
                    "pdgsolveRequest": make_unsolved_request("reference_unsolved_b"),
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

            self.assertEqual(output.splitlines(), [str(output_dir), str(index_path), str(pdgedit_manifest_path)])
            index_payload = self.read_json(index_path)
            self.assertEqual(index_payload["schema"], "pdgsolve-result-corpus/v1")
            self.assertEqual(index_payload["solvedCount"], 2)
            self.assertEqual(index_payload["exactAvailableCount"], 0)
            self.assertEqual(index_payload["noExactClosureCount"], 2)
            self.assertEqual(len(index_payload["results"]), 2)
            for record in index_payload["results"]:
                result_path = tmp_dir / record["resultPath"]
                self.assertTrue(result_path.exists())
                self.assertEqual(self.read_json(result_path)["searchStatus"], "no_exact_closure")
                self.assertNotIn("pdgeditDocumentPath", record)
            pdgedit_manifest = self.read_json(pdgedit_manifest_path)
            self.assertEqual(pdgedit_manifest["schema"], "pdgedit-library-manifest/v1")
            self.assertEqual(pdgedit_manifest["entries"], [])
            self.assertEqual(pdgedit_manifest["defaultEntryId"], "")

    def test_solve_manifest_writes_pdgedit_documents_for_exact_results(self):
        manifest = {
            "schema": "pdg-live-manifest/v1",
            "readyCount": 1,
            "blockedCount": 0,
            "topBlockedParticles": [],
            "readyEntries": [
                {
                    "batchId": 1,
                    "caseId": "reference_exact",
                    "proposalId": "reference_exact",
                    "pdgsolveRequest": make_pass_thru_request("reference_exact"),
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

            self.assertEqual(output.splitlines(), [str(output_dir), str(index_path), str(pdgedit_manifest_path)])
            index_payload = self.read_json(index_path)
            self.assertEqual(index_payload["exactAvailableCount"], 1)
            self.assertEqual(index_payload["noExactClosureCount"], 0)
            record = index_payload["results"][0]
            self.assertIn("pdgeditDocumentPath", record)
            pdgedit_document = self.read_json(tmp_dir / record["pdgeditDocumentPath"])
            self.assertEqual(pdgedit_document["schema"], "pdgedit/v1")
            pdgedit_manifest = self.read_json(pdgedit_manifest_path)
            self.assertEqual(len(pdgedit_manifest["entries"]), 1)
            self.assertEqual(pdgedit_manifest["entries"][0]["sourceKind"], "exact")

    def test_parse_args_uses_repo_local_tmp_defaults_for_manifest_solves(self):
        args = pdgsolve.parse_args(["solve-manifest", "manifest.json"])

        self.assertEqual(args.output_dir, pdgsolve.DEFAULT_RESULT_CORPUS_OUTPUT_DIR)
        self.assertEqual(args.write_index, pdgsolve.DEFAULT_RESULT_CORPUS_INDEX_PATH)
        self.assertEqual(args.pdgedit_output_dir, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR)
        self.assertEqual(args.write_pdgedit_manifest, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH)


if __name__ == "__main__":
    unittest.main()
