from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path

from scripts.eom.oracle.certified_acceleration import (
    PairAccelerationRequest,
    certify_acceleration_reconstruction,
    certify_pair_acceleration,
)
from scripts.eom.oracle.certified_history import (
    CubicHistorySegment,
    PiecewisePolynomialHistory,
    certify_causal_roots,
)


ROOT = Path(__file__).resolve().parents[1]
PRECISION = 90


def history(
    history_id: str,
    x: tuple[str, str, str, str],
    *,
    t_end: str = "5",
) -> PiecewisePolynomialHistory:
    segment = CubicHistorySegment.from_decimal_tokens(
        t_start="0",
        t_end=t_end,
        coefficients=(x, ("0", "0", "0", "0"), ("0", "0", "0", "0")),
        precision=PRECISION,
    )
    return PiecewisePolynomialHistory.from_segments((segment,), history_id=history_id)


def roots(
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    reception: str,
):
    return certify_causal_roots(
        receiver=receiver,
        source=source,
        reception_time=reception,
        field_speed="1",
        search_lower="0",
        search_upper=reception,
        root_tolerance="1e-12",
        max_depth=256,
        max_cells=500000,
    )


def request(
    receiver_id: str,
    source_id: str,
    receiver: PiecewisePolynomialHistory,
    source: PiecewisePolynomialHistory,
    receiver_charge: str,
    source_charge: str,
    reception: str,
) -> PairAccelerationRequest:
    return PairAccelerationRequest.from_decimal_tokens(
        receiver_path_id=receiver_id,
        source_path_id=source_id,
        receiver_history=receiver,
        source_history=source,
        root_certificate=roots(receiver, source, reception),
        receiver_charge=receiver_charge,
        source_charge=source_charge,
        coupling="1",
        chart="sharp",
        source_normal_floor="1e-30",
        acceleration_tolerance="1e-9",
    )


def native_interval(record: dict[str, float]) -> tuple[Decimal, Decimal]:
    return Decimal(str(record["lower"])), Decimal(str(record["upper"]))


def assert_overlaps(
    testcase: unittest.TestCase,
    native: dict[str, float],
    oracle,
) -> None:
    lower, upper = native_interval(native)
    testcase.assertLessEqual(lower, oracle.upper)
    testcase.assertGreaterEqual(upper, oracle.lower)


class NativeAccelerationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-native-accel-")
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
        cls.binary = cls.build / "eom_native_acceleration_fixture_cli"
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

    def case(self, row_id: str) -> dict[str, object]:
        return next(row for row in self.packet["cases"] if row["row_id"] == row_id)

    def test_sharp_rows_and_totals_have_independent_oracle_parity(self) -> None:
        origin = history("origin", ("0", "0", "0", "0"))
        cases = {
            "stationary": (
                history("static-two", ("2", "0", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "rail": (
                history("rail-receiver", ("-3", "1", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "super": (
                history("super-receiver", ("-8", "2", "0", "0")),
                origin,
                "1",
                "-1",
                "5",
            ),
            "two-root": (
                origin,
                history("quadratic", ("5", "-4", "1", "0")),
                "1",
                "1",
                "3",
            ),
        }
        for row_id, (receiver, source, q_receiver, q_source, reception) in cases.items():
            with self.subTest(row_id=row_id):
                oracle = certify_pair_acceleration(
                    request(
                        "receiver",
                        "source",
                        receiver,
                        source,
                        q_receiver,
                        q_source,
                        reception,
                    )
                )
                native = self.case(row_id)
                self.assertEqual(native["status"], oracle.status)
                self.assertEqual(len(native["rows"]), len(oracle.rows))
                self.assertTrue(native["reconstruction_matches"])
                for native_component, oracle_component in zip(
                    native["total_acceleration"], oracle.total_acceleration
                ):
                    assert_overlaps(self, native_component, oracle_component)
                for native_row, oracle_row in zip(native["rows"], oracle.rows):
                    self.assertEqual(native_row["polarity"], oracle_row.polarity)
                    self.assertEqual(
                        native_row["acceptance_status"],
                        oracle_row.acceptance_status,
                    )
                    assert_overlaps(
                        self, native_row["source_normal"], oracle_row.source_normal
                    )
                    assert_overlaps(
                        self, native_row["receiver_normal"], oracle_row.receiver_normal
                    )
                    assert_overlaps(
                        self,
                        native_row["receiver_strength"],
                        oracle_row.receiver_strength,
                    )

    def test_rail_and_super_field_speed_cases_are_not_clamped(self) -> None:
        rail = self.case("rail")
        rail_lower, rail_upper = native_interval(rail["total_acceleration"][0])
        self.assertLessEqual(rail_lower, Decimal(0))
        self.assertGreaterEqual(rail_upper, Decimal(0))
        super_case = self.case("super")
        receiver_normal = native_interval(super_case["rows"][0]["receiver_normal"])
        self.assertLess(receiver_normal[1], Decimal(0))
        acceleration = native_interval(super_case["total_acceleration"][0])
        self.assertLess(acceleration[1], Decimal(0))

    def test_static_self_pair_is_accounted_for_as_certified_inactive(self) -> None:
        self_pair = self.case("self")
        self.assertEqual(self_pair["status"], "inactive")
        self.assertEqual(self_pair["rows"], [])
        for component in self_pair["total_acceleration"]:
            self.assertEqual(native_interval(component), (Decimal(0), Decimal(0)))

    def test_acceleration_reconstruction_fails_closed_on_bad_certificates(self) -> None:
        for row_id in (
            "tangent",
            "memory",
            "tampered",
            "provenance",
            "tight-tolerance",
        ):
            with self.subTest(row_id=row_id):
                result = self.case(row_id)
                self.assertEqual(result["status"], "uncertified")
                self.assertIsNone(result["total_acceleration"])
                self.assertFalse(result["reconstruction_matches"])
                self.assertTrue(result["failure_code"])

    def test_complete_binary_matrix_has_oracle_parity_and_includes_self_pairs(self) -> None:
        path_a = history("path-a-history", ("0", "0", "0", "0"), t_end="3")
        path_b = history("path-b-history", ("2", "0", "0", "0"), t_end="3")
        histories = {"a": path_a, "b": path_b}
        charges = {"a": "1", "b": "-1"}
        oracle_requests = [
            request(
                receiver,
                source,
                histories[receiver],
                histories[source],
                charges[receiver],
                charges[source],
                "3",
            )
            for receiver in ("a", "b")
            for source in ("a", "b")
        ]
        oracle = certify_acceleration_reconstruction(
            path_ids=("a", "b"), pair_requests=oracle_requests
        )
        native = self.packet["matrix"]
        self.assertEqual(native["status"], oracle.status)
        self.assertEqual(native["logical_ordered_pairs"], 4)
        self.assertTrue(native["complete_ordered_pair_domain"])
        self.assertEqual(
            native["pair_order"],
            [["a", "a"], ["a", "b"], ["b", "a"], ["b", "b"]],
        )
        oracle_totals = dict(oracle.receiver_totals)
        for native_total in native["receiver_totals"]:
            oracle_total = oracle_totals[native_total["receiver_path_id"]]
            for native_component, oracle_component in zip(
                native_total["acceleration"], oracle_total
            ):
                assert_overlaps(self, native_component, oracle_component)

    def test_receiver_reduction_is_independent_of_thread_schedule(self) -> None:
        self.assertEqual(self.packet["matrix"], self.packet["matrix_single_thread"])
        self.assertEqual(self.packet, self._run_fixture())
        self.assertEqual(
            self.packet["reduction_policy"], "fixed_pairwise_interval_tree_v0"
        )


if __name__ == "__main__":
    unittest.main()
