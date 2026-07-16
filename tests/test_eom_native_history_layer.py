from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path

from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)
from scripts.eom.oracle.decimal_interval import DecimalInterval, interval_norm


ROOT = Path(__file__).resolve().parents[1]


def segment(x: tuple[str, str, str, str], *, t_end: str = "5") -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end=t_end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=90,
    )


def history(
    history_id: str,
    x: tuple[str, str, str, str],
    *,
    t_end: str = "5",
) -> PiecewisePolynomialHistory:
    return PiecewisePolynomialHistory.from_segments(
        (segment(x, t_end=t_end),), history_id=history_id
    )


class NativeHistoryLayerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-native-test-")
        cls.build = Path(cls._temporary.name)
        subprocess.run(
            [
                "cmake",
                "-S",
                str(ROOT / "src/eom"),
                "-B",
                str(cls.build),
                "-DCMAKE_BUILD_TYPE=Release",
            ],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        subprocess.run(
            ["cmake", "--build", str(cls.build), "--parallel", "4"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.binary = cls.build / "eom_native_fixture_cli"
        cls.packet = cls._run_fixture()

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    @classmethod
    def _run_fixture(cls) -> dict[str, object]:
        completed = subprocess.run(
            [str(cls.binary), "all"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def pair(self, row_id: str) -> dict[str, object]:
        return next(
            row for row in self.packet["pairs"] if row["row_id"] == row_id
        )

    def test_self_chord_preserves_correlation_across_segment_joins(self) -> None:
        retained = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="0",
                    t_end="1",
                    coefficients=(
                        ("0", "1", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-3",
                    velocity_error="1e-12",
                    precision=90,
                ),
                CubicHistorySegment.from_decimal_tokens(
                    t_start="1",
                    t_end="2",
                    coefficients=(
                        ("1", "1", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-3",
                    velocity_error="1e-12",
                    precision=90,
                ),
            ),
            history_id="cross-segment-correlated-self-chord",
        )
        chord = retained.correlated_self_displacement(
            DecimalInterval.point("1.75", 90),
            DecimalInterval.point("0.25", 90),
        )
        self.assertLessEqual(chord[0].lower, Decimal("1.5"))
        self.assertGreaterEqual(chord[0].upper, Decimal("1.5"))
        self.assertLessEqual(chord[0].width, Decimal("3e-12"))
        for component in chord[1:]:
            self.assertTrue(component.contains_zero)
            self.assertLessEqual(component.width, Decimal("3e-12"))

    def test_moving_history_block_enclosure_matches_decimal_interval_oracle(self) -> None:
        self.assertTrue(self.packet["discontinuous_history_rejected"])
        receivers = (
            segment(("0", "0.2", "0", "0")),
            segment(("1", "0.1", "0", "0")),
        )
        source_groups = (
            (
                segment(("20", "0.3", "0", "0")),
                segment(("22", "-0.2", "0", "0")),
            ),
            (
                segment(("2", "0.1", "0", "0")),
                segment(("3", "-0.1", "0", "0")),
            ),
        )
        reception = DecimalInterval.bounds("4", "4.1", 90)
        emission = DecimalInterval.bounds("0", "2", 90)
        receiver_x = receivers[0].position_interval(reception)[0]
        for receiver in receivers[1:]:
            receiver_x = receiver_x.hull(receiver.position_interval(reception)[0])

        expected_statuses: list[str] = []
        for sources in source_groups:
            source_x = sources[0].position_interval(emission)[0]
            for source in sources[1:]:
                source_x = source_x.hull(source.position_interval(emission)[0])
            displacement = (
                receiver_x - source_x,
                DecimalInterval.point("0", 90),
                DecimalInterval.point("0", 90),
            )
            residual = interval_norm(displacement) - (reception - emission)
            expected_statuses.append(
                "exact_fallback" if residual.contains_zero else "excluded"
            )

        blocks = self.packet["blocks"]
        self.assertEqual([row["status"] for row in blocks], expected_statuses)
        self.assertEqual(
            [row["excluded_pairs"] + row["exact_fallback_pairs"] for row in blocks],
            [4, 4],
        )
        self.assertEqual(
            blocks[0]["receiver_history_ids"],
            ["block-receiver-a", "block-receiver-b"],
        )

    def test_certified_traversal_has_disjoint_full_coverage_and_exact_fallback(self) -> None:
        traversal = self.packet["traversal"]
        self.assertEqual(traversal["status"], "certified_complete")
        self.assertTrue(traversal["coverage_disjoint_complete"])
        self.assertEqual(traversal["logical_ordered_pairs"], 8)
        self.assertEqual(traversal["excluded_pairs"], 4)
        self.assertEqual(traversal["exact_fallback_pairs"], 4)
        self.assertEqual(traversal["enclosed_pairs"], 0)
        self.assertEqual(traversal["unresolved_pairs"], 0)
        self.assertEqual(
            traversal["excluded_pairs"]
            + traversal["exact_fallback_pairs"]
            + traversal["enclosed_pairs"]
            + traversal["unresolved_pairs"],
            traversal["logical_ordered_pairs"],
        )
        node_statuses = {node["status"] for node in traversal["nodes"]}
        self.assertEqual(node_statuses, {"excluded", "subdivide", "exact_tile"})
        self.assertEqual(
            sum(tile["logical_ordered_pairs"] for tile in traversal["membership_tiles"]),
            traversal["logical_ordered_pairs"],
        )
        self.assertEqual(
            {tile["status"] for tile in traversal["membership_tiles"]},
            {"excluded", "exact_tile"},
        )

        exact = self.packet["traversal_exact_batch"]
        self.assertEqual(exact["status"], "certified_complete")
        self.assertTrue(exact["coverage_disjoint_complete"])
        self.assertEqual(exact["exact_pairs_requested"], 4)
        self.assertEqual(exact["exact_pairs_completed"], 4)
        self.assertEqual(exact["unresolved_pairs"], 0)
        self.assertEqual(
            [row["row_id"] for row in exact["rows"]],
            [
                "mixed-moving-history/receiver-a/near-a",
                "mixed-moving-history/receiver-a/near-b",
                "mixed-moving-history/receiver-b/near-a",
                "mixed-moving-history/receiver-b/near-b",
            ],
        )
        self.assertTrue(all(row["status"] == "certified_complete" for row in exact["rows"]))
        self.assertTrue(any(row["root_count"] > 0 for row in exact["rows"]))
        single = self.packet["traversal_exact_batch_single_thread"]
        self.assertEqual(single, exact)

        traversal_failure = self.packet["traversal_resource_failure"]
        self.assertEqual(traversal_failure["status"], "uncertified")
        self.assertTrue(traversal_failure["coverage_disjoint_complete"])
        self.assertEqual(traversal_failure["unresolved_pairs"], 8)
        self.assertEqual(
            {tile["status"] for tile in traversal_failure["membership_tiles"]},
            {"unresolved"},
        )
        self.assertEqual(
            traversal_failure["failure_code"], "resource_envelope_exceeded"
        )
        exact_failure = self.packet["traversal_exact_resource_failure"]
        self.assertEqual(exact_failure["status"], "uncertified")
        self.assertEqual(
            exact_failure["failure_code"], "resource_envelope_exceeded"
        )
        self.assertEqual(exact_failure["exact_pairs_completed"], 0)
        self.assertEqual(exact_failure["unresolved_pairs"], 4)
        self.assertTrue(exact_failure["coverage_disjoint_complete"])

    def test_excluded_recursive_cells_contain_no_independently_detected_root(self) -> None:
        self.assertTrue(self.packet["unaccepted_history_rejected"])
        receivers = (
            history("receiver-a", ("0", "0.2", "0", "0")),
            history("receiver-b", ("1", "0.1", "0", "0")),
        )
        sources = (
            history("far-a", ("20", "0.3", "0", "0")),
            history("far-b", ("22", "-0.2", "0", "0")),
            history("near-a", ("2", "0.1", "0", "0")),
            history("near-b", ("3", "-0.1", "0", "0")),
        )
        excluded_nodes = [
            node
            for node in self.packet["traversal"]["nodes"]
            if node["status"] == "excluded"
        ]
        self.assertTrue(excluded_nodes)
        for node in excluded_nodes:
            lower = max(Decimal("0"), Decimal(str(node["emission_lower"])))
            upper = Decimal(str(node["emission_upper"]))
            for receiver_index in range(node["receiver_begin"], node["receiver_end"]):
                for source_index in range(node["source_begin"], node["source_end"]):
                    oracle = certify_causal_roots(
                        receiver=receivers[receiver_index],
                        source=sources[source_index],
                        reception_time="4",
                        field_speed="1",
                        search_lower=str(lower),
                        search_upper=str(upper),
                        root_tolerance="1e-12",
                        max_depth=128,
                        max_cells=10000,
                    )
                    self.assertEqual(oracle.status, "certified_complete")
                    self.assertEqual(oracle.roots, ())

        exact_pairs = {
            (receiver_index, source_index)
            for tile in self.packet["traversal"]["membership_tiles"]
            if tile["status"] == "exact_tile"
            for receiver_index in range(tile["receiver_begin"], tile["receiver_end"])
            for source_index in range(tile["source_begin"], tile["source_end"])
        }
        independently_active = False
        for receiver_index, source_index in sorted(exact_pairs):
            oracle = certify_causal_roots(
                receiver=receivers[receiver_index],
                source=sources[source_index],
                reception_time="4",
                field_speed="1",
                search_lower="0",
                search_upper="2",
                root_tolerance="1e-12",
                max_depth=128,
                max_cells=10000,
            )
            self.assertEqual(oracle.status, "certified_complete")
            independently_active = independently_active or bool(oracle.roots)
        self.assertTrue(independently_active)

    def test_native_exact_pair_roots_have_oracle_parity(self) -> None:
        receiver = history("receiver-origin", ("0", "0", "0", "0"))
        moving_receiver = history("receiver-moving", ("0", "0.2", "0", "0"))
        cases = {
            "one_root": (
                receiver,
                history("one-root", ("2", "0", "0", "0")),
                "5",
                "0",
                "4.5",
                "1e-12",
            ),
            "two_roots": (
                receiver,
                history("two-roots", ("5", "-4", "1", "0")),
                "3",
                "0",
                "2.5",
                "1e-12",
            ),
            "root_free": (
                receiver,
                history("root-free", ("10", "0", "0", "0")),
                "3",
                "0",
                "2.5",
                "1e-12",
            ),
            "moving_receiver": (
                moving_receiver,
                history("one-root", ("2", "0", "0", "0")),
                "5",
                "0",
                "4.5",
                "1e-12",
            ),
            "moving_source": (
                receiver,
                history("moving-source", ("2", "0.25", "0", "0")),
                "5",
                "0",
                "4.5",
                "1e-12",
            ),
            "difficult_close_roots": (
                receiver,
                history("close-roots", ("4.0001", "-3.0001", "1", "0")),
                "3",
                "0.5",
                "1.5",
                "1e-16",
            ),
        }
        for row_id, (target, source, reception, lower, upper, tolerance) in cases.items():
            with self.subTest(row_id=row_id):
                oracle = certify_causal_roots(
                    receiver=target,
                    source=source,
                    reception_time=reception,
                    field_speed="1",
                    search_lower=lower,
                    search_upper=upper,
                    root_tolerance=tolerance,
                    max_depth=256,
                    max_cells=500000,
                )
                native = self.pair(row_id)
                self.assertEqual(native["status"], oracle.status)
                self.assertTrue(native["root_free_complement"])
                self.assertEqual(len(native["roots"]), len(oracle.roots))
                for native_root, oracle_root in zip(native["roots"], oracle.roots):
                    native_lower = Decimal(native_root["lower"])
                    native_upper = Decimal(native_root["upper"])
                    self.assertLessEqual(native_lower, oracle_root.upper)
                    self.assertGreaterEqual(native_upper, oracle_root.lower)
                    self.assertLessEqual(native_upper - native_lower, Decimal(tolerance))
                    self.assertEqual(
                        native_root["source_normal_sign"],
                        oracle_root.source_normal.strict_sign,
                    )

    def test_difficult_rows_escalate_without_promoting_uncertified_results(self) -> None:
        close = self.pair("difficult_close_roots")
        self.assertEqual(close["status"], "certified_complete")
        self.assertTrue(close["precision_escalated"])
        self.assertGreaterEqual(close["achieved_precision_bits"], 128)
        self.assertEqual(len(close["roots"]), 2)
        tangent = self.pair("tangent")
        self.assertEqual(tangent["status"], "caustic_route_required")
        self.assertFalse(tangent["root_free_complement"])
        self.assertEqual(tangent["roots"], [])

    def test_automatic_mpfr_gate_certifies_a_genuinely_arithmetic_limited_row(
        self,
    ) -> None:
        row = self.pair("automatic_mpfr_precision_gate")
        self.assertEqual(row["status"], "certified_complete")
        self.assertTrue(row["root_free_complement"])
        self.assertTrue(row["precision_escalated"])
        self.assertEqual(row["achieved_precision_bits"], 128)
        self.assertEqual(len(row["roots"]), 2)
        self.assertEqual(
            {root["precision_route"] for root in row["roots"]},
            {"mpfr_directed_interval"},
        )

    def test_mpfr_gate_can_defer_to_cost_feedback_without_promotion(
        self,
    ) -> None:
        row = self.pair("deferred_mpfr_precision_gate")
        self.assertEqual(row["status"], "uncertified")
        self.assertEqual(
            row["failure_code"],
            "numeric_precision_escalation_deferred_for_cost_feedback",
        )
        self.assertFalse(row["root_free_complement"])
        self.assertFalse(row["precision_escalated"])
        self.assertEqual(row["roots"], [])

    def test_warm_complement_reuses_only_sign_stable_root_free_cells(self) -> None:
        row = self.pair("warm_complement_current")
        self.assertEqual(row["status"], "certified_complete")
        self.assertTrue(row["root_free_complement"])
        self.assertEqual(row["roots"], [])
        self.assertGreater(row["warm_excluded_cells"], 0)
        self.assertEqual(row["reevaluated_cells"], 0)
        self.assertGreater(row["root_free_cell_count"], 0)
        self.assertGreater(row["warm_residual_drift_upper"], 0)

    def test_history_error_midpoint_root_uses_tolerance_scaled_bracket(self) -> None:
        row = self.pair("uncertain_midpoint_root")
        receiver = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-0.5",
                    t_end="0.5",
                    coefficients=(
                        ("0.5625", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-9",
                    precision=90,
                ),
            ),
            history_id="uncertain-receiver",
        )
        source = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-0.5",
                    t_end="0.5",
                    coefficients=(
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-9",
                    precision=90,
                ),
            ),
            history_id="uncertain-source",
        )
        oracle = certify_causal_roots(
            receiver=receiver,
            source=source,
            reception_time="0.5",
            field_speed="1",
            search_lower="-0.5",
            search_upper="0.5",
            root_tolerance="1e-5",
            max_depth=256,
            max_cells=500000,
        )
        self.assertEqual(row["status"], "certified_complete")
        self.assertEqual(row["status"], oracle.status)
        self.assertFalse(row["precision_escalated"])
        self.assertEqual(row["achieved_precision_bits"], 53)
        self.assertEqual(len(row["roots"]), 1)
        self.assertEqual(len(row["roots"]), len(oracle.roots))
        root = row["roots"][0]
        lower = Decimal(root["lower"])
        upper = Decimal(root["upper"])
        self.assertLessEqual(lower, Decimal("-0.0625"))
        self.assertGreaterEqual(upper, Decimal("-0.0625"))
        self.assertLessEqual(upper - lower, Decimal("1e-5"))
        self.assertLessEqual(lower, oracle.roots[0].upper)
        self.assertGreaterEqual(upper, oracle.roots[0].lower)
        self.assertEqual(root["source_normal_sign"], 1)

    def test_mpfr_inward_probe_certifies_known_simple_root_at_tolerance_edge(
        self,
    ) -> None:
        receiver = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-0.000000020",
                    t_end="0.000000002",
                    coefficients=(
                        ("0.0000000075", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="0.0000000005",
                    precision=90,
                ),
            ),
            history_id="inward-probe-receiver",
        )
        source = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-0.000000020",
                    t_end="-0.000000010",
                    coefficients=(
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="0.0000000005",
                    precision=90,
                ),
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-0.000000010",
                    t_end="0.000000002",
                    coefficients=(
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="0.0000000005",
                    precision=90,
                ),
            ),
            history_id="inward-probe-source",
        )
        oracle = certify_causal_roots(
            receiver=receiver,
            source=source,
            reception_time="0.000000002",
            field_speed="1",
            search_lower="-0.000000020",
            search_upper="0.000000002",
            root_tolerance="1e-8",
            max_depth=256,
            max_cells=500000,
        )
        native = self.pair("mpfr_inward_tolerance_probe")

        self.assertEqual(oracle.status, "certified_complete")
        self.assertEqual(native["status"], oracle.status)
        self.assertTrue(native["root_free_complement"])
        self.assertTrue(native["precision_escalated"])
        self.assertEqual(len(native["roots"]), 1)
        native_root = native["roots"][0]
        lower = Decimal(native_root["lower"])
        upper = Decimal(native_root["upper"])
        exact_center_root = Decimal("-0.0000000055")
        self.assertLessEqual(lower, exact_center_root)
        self.assertGreaterEqual(upper, exact_center_root)
        self.assertLessEqual(upper - lower, Decimal("1e-8"))
        self.assertLessEqual(lower, oracle.roots[0].upper)
        self.assertGreaterEqual(upper, oracle.roots[0].lower)
        self.assertEqual(native_root["source_normal_sign"], 1)

    def test_mpfr_self_search_does_not_apply_endpoint_proof_to_older_cell(
        self,
    ) -> None:
        row = self.pair("nonendpoint_subfield_self_root")
        retained = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="0",
                    t_end="1",
                    coefficients=(
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-14",
                    velocity_error="1e-14",
                    precision=90,
                ),
                CubicHistorySegment.from_decimal_tokens(
                    t_start="1",
                    t_end="2",
                    coefficients=(
                        ("0", "0", "1.5", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-14",
                    velocity_error="1e-14",
                    precision=90,
                ),
            ),
            history_id="nonendpoint-subfield-self",
        )
        oracle = certify_causal_roots(
            receiver=retained,
            source=retained,
            reception_time="2",
            field_speed="1",
            search_lower="0",
            search_upper="2",
            root_tolerance="1e-12",
            max_depth=256,
            max_cells=500000,
        )
        self.assertEqual(row["status"], "certified_complete")
        self.assertEqual(row["status"], oracle.status)
        self.assertTrue(row["precision_escalated"])
        self.assertEqual(len(row["roots"]), 1)
        self.assertEqual(len(oracle.roots), 1)
        root = row["roots"][0]
        self.assertLessEqual(Decimal(root["lower"]), Decimal("0.5"))
        self.assertGreaterEqual(Decimal(root["upper"]), Decimal("0.5"))
        self.assertEqual(root["source_normal_sign"], 1)

    def test_enclosed_self_root_cluster_routes_to_finite_width(self) -> None:
        row = self.pair("enclosed_self_root_cluster")
        self.assertEqual(row["status"], "caustic_route_required")
        self.assertEqual(
            row["failure_code"],
            "numeric_self_root_cluster_uncertified",
        )
        self.assertFalse(row["root_free_complement"])
        self.assertEqual(row["roots"], [])

    def test_history_error_segment_join_root_uses_continuous_two_segment_bracket(
        self,
    ) -> None:
        row = self.pair("uncertain_segment_join_root")
        receiver = PiecewisePolynomialHistory.from_segments(
            (
                CubicHistorySegment.from_decimal_tokens(
                    t_start="-1",
                    t_end="1",
                    coefficients=(
                        ("1", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    precision=90,
                ),
            ),
            history_id="uncertain-join-receiver",
        )
        source = PiecewisePolynomialHistory.from_segments(
            tuple(
                CubicHistorySegment.from_decimal_tokens(
                    t_start=start,
                    t_end=end,
                    coefficients=(
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                        ("0", "0", "0", "0"),
                    ),
                    position_error="1e-9",
                    precision=90,
                )
                for start, end in (("-1", "0"), ("0", "1"))
            ),
            history_id="uncertain-join-source",
        )
        oracle = certify_causal_roots(
            receiver=receiver,
            source=source,
            reception_time="1",
            field_speed="1",
            search_lower="-1",
            search_upper="0.5",
            root_tolerance="1e-5",
            max_depth=256,
            max_cells=500000,
        )
        self.assertEqual(row["status"], "certified_complete")
        self.assertEqual(row["status"], oracle.status)
        self.assertFalse(row["precision_escalated"])
        self.assertEqual(row["achieved_precision_bits"], 53)
        self.assertEqual(len(row["roots"]), 1)
        self.assertEqual(len(oracle.roots), 1)
        root = row["roots"][0]
        lower = Decimal(root["lower"])
        upper = Decimal(root["upper"])
        self.assertLessEqual(lower, Decimal("0"))
        self.assertGreaterEqual(upper, Decimal("0"))
        self.assertLessEqual(upper - lower, Decimal("1e-5"))
        self.assertEqual(root["source_segment_indices"], [0, 1])
        self.assertEqual(root["source_normal_sign"], 1)

    def test_self_pair_endpoint_rule_handles_subfield_and_rail_histories(self) -> None:
        self.assertTrue(self.packet["inconsistent_circular_speed_rejected"])
        subfield = self.pair("self_subfield")
        self.assertEqual(subfield["status"], "certified_complete")
        self.assertTrue(subfield["coincident_endpoint_excluded"])
        self.assertEqual(subfield["roots"], [])
        rail = self.pair("self_rail")
        self.assertEqual(rail["status"], "caustic_route_required")
        self.assertFalse(rail["coincident_endpoint_excluded"])
        self.assertFalse(rail["root_free_complement"])
        curved_rail = self.pair("self_curved_rail")
        self.assertEqual(curved_rail["status"], "certified_complete")
        self.assertTrue(curved_rail["coincident_endpoint_excluded"])
        self.assertTrue(curved_rail["root_free_complement"])
        self.assertTrue(curved_rail["precision_escalated"])
        self.assertEqual(curved_rail["roots"], [])

    def test_memory_boundary_and_piecewise_root_identity_match_oracle_rules(self) -> None:
        memory = self.pair("memory_boundary")
        self.assertEqual(memory["status"], "memory_boundary_contact")
        self.assertEqual(memory["failure_code"], "insufficient_history_depth")
        self.assertTrue(memory["root_free_complement"])
        self.assertTrue(memory["memory_boundary_contact"])
        piecewise = self.pair("piecewise_boundary")
        self.assertEqual(piecewise["status"], "certified_complete")
        self.assertEqual(len(piecewise["roots"]), 1)
        self.assertEqual(piecewise["roots"][0]["source_segment_indices"], [0, 1])

    def test_multithreaded_batch_output_is_deterministic(self) -> None:
        self.assertEqual(self.packet, self._run_fixture())


if __name__ == "__main__":
    unittest.main()
