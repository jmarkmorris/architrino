import contextlib
import io
import json
import tempfile
import unittest
from collections import Counter
from pathlib import Path

import pdgsolve
from scripts.pdg import pdgfeed_registry


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
            {"id": "reactant_core_1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
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
            {"id": "reactant_noether_pair_1.row.1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_noether_pair_1.row.2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            {"id": "reactant_noether_pair_2.row.1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_noether_pair_2.row.2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
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


def make_b_plus_decay_mode_41_request(request_id="b_plus_s041_184"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "B+ decay mode 41",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_positive_b_meson_1.row.1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
            {
                "id": "reactant_positive_b_meson_1.row.2",
                "assemblyId": "anti_bottom_quark_III",
                "title": "Anti Bottom Quark",
            },
        ],
        "products": [
            {"id": "product_anti_tau_1", "assemblyId": "anti_tau_III", "title": "Anti Tau"},
            {
                "id": "product_tau_neutrino_2",
                "assemblyId": "pro_tau_neutrino_III",
                "title": "Tau Neutrino",
            },
            {
                "id": "product_unbound_architrinos_residue_1",
                "assemblyId": "unbound_architrinos_residue",
                "title": "Unbound Architrinos",
                "electrinoCount": 2,
                "positrinoCount": 2,
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_dual_charge_direct_core_request(request_id="dual_charge_direct_core"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Dual-charge direct-core support request",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_core_1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_core_2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            {"id": "reactant_core_3", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_core_4", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
        ],
        "products": [
            {"id": "product_anti_tau_1", "assemblyId": "anti_tau_III", "title": "Anti Tau"},
            {
                "id": "product_tau_neutrino_2",
                "assemblyId": "pro_tau_neutrino_III",
                "title": "Tau Neutrino",
            },
            {
                "id": "product_residue_3",
                "assemblyId": "unbound_architrinos_residue",
                "title": "Unbound Architrinos",
                "electrinoCount": 7,
                "positrinoCount": 1,
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_double_uni_binary_direct_core_request(request_id="double_uni_binary_direct_core"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Double uni-binary direct-core support request",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_core_1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_core_2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            {"id": "reactant_core_3", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_core_4", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            {"id": "reactant_core_5", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_core_6", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
        ],
        "products": [
            {"id": "product_anti_tau_1", "assemblyId": "anti_tau_III", "title": "Anti Tau"},
            {
                "id": "product_anti_tau_neutrino_2",
                "assemblyId": "anti_tau_neutrino_III",
                "title": "Anti Tau Neutrino",
            },
            {
                "id": "product_residue_3",
                "assemblyId": "unbound_architrinos_residue",
                "title": "Unbound Architrinos",
                "electrinoCount": 13,
                "positrinoCount": 7,
            },
        ],
        "policy": {
            "exactClosureRequired": True,
            "allowedBoundaryAugmentations": ["none"],
        },
    }


def make_middle_supply_priority_request(request_id="middle_supply_priority"):
    return {
        "schema": "pdgsolve-request/v1",
        "requestId": request_id,
        "source": {
            "kind": "developer",
            "title": "Middle-supply priority request",
            "sourceDocumentId": f"developer:{request_id}",
        },
        "reactants": [
            {"id": "reactant_charm_1", "assemblyId": "pro_charm_quark_II", "title": "Charm Quark"},
            {"id": "reactant_anti_down_2", "assemblyId": "anti_down_quark_I", "title": "Anti Down Quark"},
            {"id": "reactant_support_1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_support_2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            {"id": "reactant_support_3", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
            {"id": "reactant_support_4", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
        ],
        "products": [
            {"id": "product_up_1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
            {"id": "product_down_2", "assemblyId": "pro_down_quark_I", "title": "Down Quark"},
            {"id": "product_strange_3", "assemblyId": "pro_strange_quark_II", "title": "Strange Quark"},
            {"id": "product_positron_4", "assemblyId": "anti_electron_I", "title": "Anti Electron"},
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
                        "schema": "pdgsolve-publication-graph/v2",
                        "units": [
                            {
                                "id": "graph_reactantassemblies_pro_up_quark_i_1",
                                "kind": "assembly",
                                "stage": "reactantAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": reactant_id,
                                "title": "Up Quark",
                                "electrinoCount": 4,
                                "positrinoCount": 8,
                            },
                            {
                                "id": "graph_reactantsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "kind": "operator",
                                "stage": "reactantSideOperators",
                                "recipeId": "pass-thru",
                                "occurrenceKey": "reactant_operator.pass_thru.1",
                                "title": "Pass Thru",
                                "lawId": None,
                            },
                            {
                                "id": "graph_intermediateassemblies_pro_up_quark_i_1",
                                "kind": "assembly",
                                "stage": "intermediateAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": "intermediate_up_quark_1",
                                "title": "Up Quark",
                                "electrinoCount": 4,
                                "positrinoCount": 8,
                            },
                            {
                                "id": "graph_productsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "kind": "operator",
                                "stage": "productSideOperators",
                                "recipeId": "pass-thru",
                                "occurrenceKey": "product_operator.pass_thru.1",
                                "title": "Pass Thru",
                                "lawId": None,
                            },
                            {
                                "id": "graph_productassemblies_pro_up_quark_i_1",
                                "kind": "assembly",
                                "stage": "productAssemblies",
                                "recipeId": "pro_up_quark_I",
                                "occurrenceKey": product_id,
                                "title": "Up Quark",
                                "electrinoCount": 4,
                                "positrinoCount": 8,
                            },
                        ],
                        "edges": [
                            {
                                "id": "edge_reactant_to_operator",
                                "fromUnitId": "graph_reactantassemblies_pro_up_quark_i_1",
                                "fromPortId": "output",
                                "toUnitId": "graph_reactantsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_operator_to_intermediate",
                                "fromUnitId": "graph_reactantsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "fromPortId": "output",
                                "toUnitId": "graph_intermediateassemblies_pro_up_quark_i_1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_intermediate_to_operator",
                                "fromUnitId": "graph_intermediateassemblies_pro_up_quark_i_1",
                                "fromPortId": "output",
                                "toUnitId": "graph_productsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "toPortId": "input",
                            },
                            {
                                "id": "edge_operator_to_product",
                                "fromUnitId": "graph_productsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                                "fromPortId": "output",
                                "toUnitId": "graph_productassemblies_pro_up_quark_i_1",
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
        self.assertEqual(family["canonicalCandidate"]["solveGraph"]["schema"], "pdgsolve-publication-graph/v2")
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
            ["dissociate.pro_noether_braid_I.to_residue"],
        )
        self.assertTrue(family["publicationReady"])

    def test_solve_request_can_target_uni_binary_from_up_quark_dissociation(self):
        request = make_b_plus_decay_mode_41_request()
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], "family.exact.1")
        family = result["optionFamilies"][0]
        self.assertTrue(family["publicationReady"])
        self.assertIn(
            "dissociate.pro_up_quark_I.to.pro_noether_braid_III",
            [choice["lawId"] for choice in family["reactantSideOperators"]],
        )

    def test_solve_request_supports_direct_uni_binary_dissociation_for_both_core_charges(self):
        request = make_dual_charge_direct_core_request()
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        family = result["optionFamilies"][0]
        self.assertTrue(family["publicationReady"])
        law_ids = [choice["lawId"] for choice in family["reactantSideOperators"]]
        self.assertIn("dissociate.pro_noether_braid_I.to.pro_noether_braid_III", law_ids)
        self.assertIn("dissociate.anti_noether_braid_I.to.anti_noether_braid_III", law_ids)

    def test_solve_request_can_emit_multiple_direct_uni_binary_dissociations_from_generation_i_support(self):
        request = make_double_uni_binary_direct_core_request()
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        family = result["optionFamilies"][0]
        self.assertTrue(family["publicationReady"])
        law_counts = Counter(choice["lawId"] for choice in family["reactantSideOperators"])
        self.assertEqual(law_counts["dissociate.anti_noether_braid_I.to.anti_noether_braid_III"], 2)

    def test_solve_request_prioritizes_non_core_middle_supply_before_spending_support_core_i(self):
        request = make_middle_supply_priority_request()
        result = pdgsolve.solve_request(request)

        self.assertEqual(result["searchStatus"], "exact_available")
        family = result["optionFamilies"][0]
        self.assertTrue(family["publicationReady"])
        law_ids = [choice["lawId"] for choice in family["reactantSideOperators"]]
        self.assertIn("dissociate.pro_charm_quark_II", law_ids)
        self.assertNotIn("dissociate.pro_noether_braid_I.to.pro_noether_braid_II", law_ids)

    def test_publication_graph_is_layout_neutral_for_pass_thru(self):
        request = make_pass_thru_request("pass_thru_graph")
        result = pdgsolve.solve_request(request)
        acceptance = pdgsolve.build_acceptance(request, result, family_id=result["bestFamilyId"])
        solve_graph = acceptance["lockedSolveGraph"]
        self.assertEqual(solve_graph["schema"], "pdgsolve-publication-graph/v2")
        for unit in solve_graph["units"]:
            self.assertNotIn("anchorRow", unit)
            self.assertNotIn("x", unit)
            self.assertNotIn("column", unit)
            if unit["kind"] == "assembly":
                self.assertIn("electrinoCount", unit)
                self.assertIn("positrinoCount", unit)

    def test_pdgedit_document_derives_counts_and_coordinates_from_locked_solve_graph(self):
        request = make_unsolved_request("synthetic_pass_thru")
        result = make_exact_result(request)
        acceptance = pdgsolve.build_acceptance(
            request,
            result,
            family_id="family.synthetic.pass_thru.v1",
        )
        acceptance["lockedReactantSideOperators"] = []
        acceptance["lockedProductSideOperators"] = []

        published = pdgsolve.build_pdgedit_document_from_acceptance(acceptance)

        self.assertEqual(
            [
                (assembly["id"], assembly["x"], assembly["y"])
                for assembly in published["assemblies"]
            ],
            [
                ("graph_reactantassemblies_pro_up_quark_i_1", pdgsolve.PDGEDIT_X_BY_STAGE["reactantAssemblies"], 0),
                ("graph_intermediateassemblies_pro_up_quark_i_1", pdgsolve.PDGEDIT_X_BY_STAGE["intermediateAssemblies"], 0),
                ("graph_productassemblies_pro_up_quark_i_1", pdgsolve.PDGEDIT_X_BY_STAGE["productAssemblies"], 0),
            ],
        )
        self.assertEqual(
            [
                (operator["id"], operator["x"], operator["y"], operator["positrinoCount"], operator["electrinoCount"])
                for operator in published["operators"]
            ],
            [
                (
                    "graph_reactantsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                    pdgsolve.PDGEDIT_X_BY_STAGE["reactantSideOperators"],
                    0,
                    8,
                    4,
                ),
                (
                    "graph_productsideoperators_family_synthetic_pass_thru_v1_pass_thru_1",
                    pdgsolve.PDGEDIT_X_BY_STAGE["productSideOperators"],
                    0,
                    8,
                    4,
                ),
            ],
        )

    def test_pdgedit_document_recovers_residue_counts_from_feeding_product_operator(self):
        publication_graph = {
            "schema": "pdgsolve-publication-graph/v2",
            "units": [
                {
                    "id": "graph_intermediate_feed",
                    "kind": "assembly",
                    "stage": "intermediateAssemblies",
                    "recipeId": "pro_electron_I",
                    "occurrenceKey": "intermediate_feed",
                    "title": "Feed",
                    "electrinoCount": 5,
                    "positrinoCount": 5,
                },
                {
                    "id": "graph_product_operator_residue",
                    "kind": "operator",
                    "stage": "productSideOperators",
                    "recipeId": "pass-thru",
                    "occurrenceKey": "graph_product_operator_residue",
                    "title": "Pass Thru",
                },
                {
                    "id": "graph_product_residue",
                    "kind": "assembly",
                    "stage": "productAssemblies",
                    "recipeId": "unbound_architrinos_residue",
                    "occurrenceKey": "product_residue",
                    "title": "Unbound Architrinos",
                },
            ],
            "edges": [
                {
                    "id": "residue_input",
                    "fromUnitId": "graph_intermediate_feed",
                    "fromPortId": "output",
                    "toUnitId": "graph_product_operator_residue",
                    "toPortId": "input_1",
                },
                {
                    "id": "residue_output",
                    "fromUnitId": "graph_product_operator_residue",
                    "fromPortId": "output_1",
                    "toUnitId": "graph_product_residue",
                    "toPortId": "input",
                },
            ],
        }

        published = pdgsolve.build_pdgedit_document_from_publication_graph(publication_graph)

        self.assertEqual(
            next(
                assembly["sampleCounts"]
                for assembly in published["assemblies"]
                if assembly["id"] == "graph_product_residue"
            ),
            {
                "topCount": "5",
                "bottomCount": "5",
            },
        )
        self.assertEqual(
            next(
                (operator["positrinoCount"], operator["electrinoCount"])
                for operator in published["operators"]
                if operator["id"] == "graph_product_operator_residue"
            ),
            (5, 5),
        )

    def test_pdgedit_request_review_document_keeps_pdg_rows_above_augments_and_closure(self):
        request = {
            "schema": "pdgsolve-request/v1",
            "requestId": "review_order_groups",
            "source": {
                "kind": "developer",
                "title": "Review order groups",
                "sourceDocumentId": "developer:review_order_groups",
            },
            "reactants": [
                {"id": "reactant_noether_pair_1.row.1", "assemblyId": "pro_noether_braid_I", "title": "Pro Noether Braid"},
                {"id": "reactant_particle_1", "assemblyId": "pro_up_quark_I", "title": "Up Quark"},
                {"id": "reactant_noether_pair_1.row.2", "assemblyId": "anti_noether_braid_I", "title": "Anti Noether Braid"},
            ],
            "products": [
                {
                    "id": "product_unbound_architrinos_residue_1",
                    "assemblyId": "unbound_architrinos_residue",
                    "title": "Unbound Architrinos",
                    "electrinoCount": 6,
                    "positrinoCount": 6,
                },
                {"id": "product_particle_1", "assemblyId": "pro_electron_I", "title": "Electron"},
            ],
            "policy": {
                "exactClosureRequired": True,
                "allowedBoundaryAugmentations": ["none"],
            },
        }

        published = pdgsolve.build_pdgedit_document_from_request_review(request)

        self.assertEqual(
            [
                (assembly["id"], assembly["y"], assembly.get("orderGroup"))
                for assembly in published["assemblies"]
                if assembly["role"] == "reactant"
            ],
            [
                ("review_reactant_1", 0, "pdg"),
                ("review_reactant_2", 1, "aaa"),
                ("review_reactant_3", 2, "aaa"),
            ],
        )
        self.assertEqual(
            [
                (assembly["id"], assembly["y"], assembly.get("orderGroup"))
                for assembly in published["assemblies"]
                if assembly["role"] == "product"
            ],
            [
                ("review_product_1", 0, "pdg"),
                ("review_product_2", 1, "closure"),
            ],
        )

    def test_pdgedit_publication_graph_document_keeps_pdg_rows_above_augments_and_closure(self):
        publication_graph = {
            "schema": "pdgsolve-publication-graph/v2",
            "units": [
                {
                    "id": "graph_reactant_aaa_1",
                    "kind": "assembly",
                    "stage": "reactantAssemblies",
                    "recipeId": "pro_noether_braid_I",
                    "occurrenceKey": "reactant_noether_pair_1.row.1",
                    "title": "Pro Noether Braid",
                    "electrinoCount": 3,
                    "positrinoCount": 3,
                },
                {
                    "id": "graph_reactant_pdg_1",
                    "kind": "assembly",
                    "stage": "reactantAssemblies",
                    "recipeId": "pro_up_quark_I",
                    "occurrenceKey": "reactant_particle_1",
                    "title": "Up Quark",
                    "electrinoCount": 4,
                    "positrinoCount": 8,
                },
                {
                    "id": "graph_product_closure_1",
                    "kind": "assembly",
                    "stage": "productAssemblies",
                    "recipeId": "unbound_architrinos_residue",
                    "occurrenceKey": "product_unbound_architrinos_residue_1",
                    "title": "Unbound Architrinos",
                    "electrinoCount": 6,
                    "positrinoCount": 6,
                },
                {
                    "id": "graph_product_pdg_1",
                    "kind": "assembly",
                    "stage": "productAssemblies",
                    "recipeId": "pro_electron_I",
                    "occurrenceKey": "product_particle_1",
                    "title": "Electron",
                    "electrinoCount": 9,
                    "positrinoCount": 3,
                },
            ],
            "edges": [],
        }

        published = pdgsolve.build_pdgedit_document_from_publication_graph(publication_graph)

        self.assertEqual(
            [
                (assembly["id"], assembly["title"], assembly["y"], assembly.get("orderGroup"))
                for assembly in published["assemblies"]
                if assembly["role"] == "reactant"
            ],
            [
                ("graph_reactant_pdg_1", "Up Quark", 0, "pdg"),
                ("graph_reactant_aaa_1", "Pro Noether Braid", 1, "aaa"),
            ],
        )
        self.assertEqual(
            [
                (assembly["id"], assembly["title"], assembly["y"], assembly.get("orderGroup"))
                for assembly in published["assemblies"]
                if assembly["role"] == "product"
            ],
            [
                ("graph_product_pdg_1", "Electron", 0, "pdg"),
                ("graph_product_closure_1", "Unbound Architrinos", 1, "closure"),
            ],
        )

    def test_muon_decay_mode_1_returns_exact_available_under_core_first_rules(self):
        request = make_muon_decay_mode_1_request()
        result = pdgsolve.solve_request(request)
        self.assertEqual(result["searchStatus"], "exact_available")
        self.assertEqual(result["bestFamilyId"], "family.exact.1")
        self.assertTrue(result["optionFamilies"][0]["publicationReady"])

    def test_solver_admitted_assembly_ids_stay_in_sync_with_registry_request_rows(self):
        registry_ids = set(pdgfeed_registry.REQUEST_ASSEMBLY_IDS)
        self.assertEqual(set(pdgsolve.REQUEST_REACTANT_ASSEMBLY_IDS), registry_ids)
        self.assertEqual(
            set(pdgsolve.REQUEST_PRODUCT_ASSEMBLY_IDS),
            registry_ids | {pdgsolve.UNBOUND_ARCHITRINOS_RESIDUE_ASSEMBLY_ID},
        )
        mapping_by_id = {
            mapping.canonical_id: mapping
            for mapping in pdgfeed_registry.REQUEST_ASSEMBLY_MAPPINGS
        }
        for assembly_id, mapping in mapping_by_id.items():
            self.assertIn(assembly_id, pdgsolve.ASSEMBLY_DISPLAY)
            self.assertEqual(
                pdgsolve.ASSEMBLY_DISPLAY[assembly_id]["electrinoCount"],
                mapping.electrino_count,
            )
            self.assertEqual(
                pdgsolve.ASSEMBLY_DISPLAY[assembly_id]["positrinoCount"],
                mapping.positrino_count,
            )

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

    def test_solve_manifest_writes_review_pdgedit_documents_for_unsolved_results(self):
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
                    "branchingProbability": 0.81,
                    "pdgsolveRequest": make_unsolved_request("reference_unsolved_a"),
                },
                {
                    "batchId": 2,
                    "caseId": "reference_unsolved_b",
                    "proposalId": "reference_unsolved_b",
                    "branchingProbability": 0.35,
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
                self.assertIn("pdgeditDocumentPath", record)
                pdgedit_document = self.read_json(tmp_dir / record["pdgeditDocumentPath"])
                self.assertEqual(pdgedit_document["schema"], "pdgedit/v1")
                self.assertEqual(pdgedit_document["operators"], [])
                self.assertEqual(pdgedit_document["links"], [])
            pdgedit_manifest = self.read_json(pdgedit_manifest_path)
            self.assertEqual(pdgedit_manifest["schema"], "pdgedit-library-manifest/v1")
            self.assertEqual(len(pdgedit_manifest["entries"]), 2)
            self.assertEqual(pdgedit_manifest["entries"][0]["sourceKind"], "unsolved")
            self.assertEqual(pdgedit_manifest["entries"][0]["branchingProbability"], 0.81)
            self.assertEqual(
                pdgedit_manifest["entries"][0]["productUnboundArchitrinoCounts"],
                {"electrinoCount": 0, "positrinoCount": 0},
            )
            self.assertEqual(pdgedit_manifest["defaultEntryId"], pdgedit_manifest["entries"][0]["id"])

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
                    "branchingProbability": 0.98765,
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
            self.assertEqual(pdgedit_manifest["entries"][0]["branchingProbability"], 0.98765)
            self.assertEqual(
                pdgedit_manifest["entries"][0]["productUnboundArchitrinoCounts"],
                {"electrinoCount": 0, "positrinoCount": 0},
            )

    def test_solve_manifest_keeps_all_exact_pdgedit_entries_beyond_previous_scroll_picker_cap(self):
        ready_entries = [
            {
                "batchId": index + 1,
                "caseId": f"reference_exact_{index + 1}",
                "proposalId": f"reference_exact_{index + 1}",
                "pdgsolveRequest": make_pass_thru_request(f"reference_exact_{index + 1}"),
            }
            for index in range(70)
        ]
        manifest = {
            "schema": "pdg-live-manifest/v1",
            "readyCount": len(ready_entries),
            "blockedCount": 0,
            "topBlockedParticles": [],
            "readyEntries": ready_entries,
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
            self.assertEqual(index_payload["exactAvailableCount"], 70)
            self.assertEqual(index_payload["noExactClosureCount"], 0)
            pdgedit_manifest = self.read_json(pdgedit_manifest_path)
            self.assertEqual(len(pdgedit_manifest["entries"]), 70)
            self.assertEqual(Counter(entry["sourceKind"] for entry in pdgedit_manifest["entries"]), Counter({"exact": 70}))

    def test_parse_args_uses_repo_local_tmp_defaults_for_manifest_solves(self):
        args = pdgsolve.parse_args(["solve-manifest", "manifest.json"])

        self.assertEqual(args.output_dir, pdgsolve.DEFAULT_RESULT_CORPUS_OUTPUT_DIR)
        self.assertEqual(args.write_index, pdgsolve.DEFAULT_RESULT_CORPUS_INDEX_PATH)
        self.assertEqual(args.pdgedit_output_dir, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_OUTPUT_DIR)
        self.assertEqual(args.write_pdgedit_manifest, pdgsolve.DEFAULT_PDGEDIT_PUBLISHED_MANIFEST_PATH)


if __name__ == "__main__":
    unittest.main()
