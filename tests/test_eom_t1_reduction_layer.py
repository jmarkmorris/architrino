from __future__ import annotations

import importlib.util
import sys
import unittest
from dataclasses import replace
from decimal import Decimal
from pathlib import Path

from scripts.eom.oracle.decimal_interval import DecimalInterval


ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts/eom-verification/t1_reduction_layer.py"
SPEC = importlib.util.spec_from_file_location("t1_reduction_layer", MODULE_PATH)
assert SPEC is not None and SPEC.loader is not None
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class T1ReductionLayerTests(unittest.TestCase):
    def test_all_explicit_charge_ledgers_are_exact(self) -> None:
        results = MODULE.charge_ledgers(MODULE.load_tier_one())
        self.assertTrue(all(row["status"] == "PASS" for row in results.values()))
        self.assertEqual(results["three_neutral_binary_rings"]["new"], 0)
        self.assertEqual(results["section_99_screened_pair"]["new_values"], [0, 0, 0, 0])
        self.assertEqual(results["section_99_electron_payload_units"]["new"], -6)
        self.assertEqual(results["section_99_electron_payload_e"]["new"], "-1")
        self.assertEqual(results["section_96_flat_control"]["new"], 0)

    def test_common_positive_coupling_cancels_from_fraction(self) -> None:
        base = (
            DecimalInterval.point("2", MODULE.PRECISION),
            DecimalInterval.point("-1", MODULE.PRECISION),
            DecimalInterval.point("-0.5", MODULE.PRECISION),
        )
        scaled = tuple(
            value * DecimalInterval.point("7.25", MODULE.PRECISION)
            for value in base
        )
        base_reduction = MODULE.reduce_projected_contributions(base)
        scaled_reduction = MODULE.reduce_projected_contributions(scaled)
        self.assertLess(
            abs(
                base_reduction["surviving_fraction_S"].midpoint
                - Decimal(1) / Decimal(7)
            ),
            Decimal("1e-27"),
        )
        self.assertLess(
            abs(
                base_reduction["surviving_fraction_S"].midpoint
                - scaled_reduction["surviving_fraction_S"].midpoint
            ),
            Decimal("1e-89"),
        )
        configuration = MODULE.section_14_owner_configuration(
            MODULE.load_tier_one()
        )
        self.assertEqual(
            MODULE.derive_common_scale_cancellation(configuration)["status"],
            "DERIVED",
        )
        bad_source = replace(configuration.sources[0], charge=2)
        bad_configuration = replace(
            configuration,
            sources=(bad_source, configuration.sources[1]),
        )
        self.assertEqual(
            MODULE.derive_common_scale_cancellation(bad_configuration)["status"],
            "NOT-VERIFIABLE",
        )

    def test_surviving_and_cancellation_fraction_names_are_not_swapped(self) -> None:
        reduction = MODULE.reduce_projected_contributions(
            (
                DecimalInterval.point("2", MODULE.PRECISION),
                DecimalInterval.point("-1", MODULE.PRECISION),
                DecimalInterval.point("-0.5", MODULE.PRECISION),
            )
        )
        self.assertLess(
            abs(
                reduction["surviving_fraction_S"].midpoint
                - Decimal(1) / Decimal(7)
            ),
            Decimal("1e-27"),
        )
        self.assertLess(
            abs(
                reduction["cancellation_fraction_C"].midpoint
                - Decimal(6) / Decimal(7)
            ),
            Decimal("1e-27"),
        )

    def test_owner_configuration_is_selected_from_fixture(self) -> None:
        configuration = MODULE.section_14_owner_configuration(
            MODULE.load_tier_one()
        )
        self.assertEqual(len(configuration.receivers), 3)
        self.assertEqual(len(configuration.sources), 2)
        self.assertEqual(configuration.history_window, Decimal("1.74"))
        self.assertEqual([path.charge for path in configuration.sources], [1, -1])
        self.assertEqual(configuration.receivers[0].angular_rate, Decimal("0.98"))
        self.assertEqual(configuration.sources[0].angular_rate, Decimal("2.450"))
        self.assertTrue(
            all("middle-receiver" in path.path_id for path in configuration.receivers)
        )

    def test_full_window_ladder_is_half_open_and_uniform(self) -> None:
        configuration = MODULE.section_14_owner_configuration(
            MODULE.load_tier_one()
        )
        for sample_count in (8, 16, 32):
            times = MODULE.reception_times(configuration, sample_count)
            self.assertEqual(len(times), sample_count)
            self.assertEqual(times[0], configuration.reception_start)
            self.assertLess(times[-1], configuration.reception_stop)
            step = times[1] - times[0]
            self.assertTrue(
                all(times[index + 1] - times[index] == step for index in range(sample_count - 1))
            )

    def test_fast_small_grid_reduction_aggregates_branch_rows(self) -> None:
        configuration = MODULE.section_14_owner_configuration(
            MODULE.load_tier_one()
        )
        times = MODULE.reception_times(configuration, 8)
        contributions = tuple(
            DecimalInterval.point("1", MODULE.PRECISION)
            if index % 2 == 0
            else DecimalInterval.point("-0.75", MODULE.PRECISION)
            for index, _ in enumerate(times)
        )
        reduction = MODULE.reduce_projected_contributions(contributions)
        self.assertEqual(reduction["net"].midpoint, Decimal("1.00"))
        self.assertEqual(reduction["magnitude_sum"].midpoint, Decimal("7.00"))
        self.assertLess(
            abs(
                reduction["cancellation_fraction_C"].midpoint
                - Decimal(6) / Decimal(7)
            ),
            Decimal("1e-27"),
        )


if __name__ == "__main__":
    unittest.main()
