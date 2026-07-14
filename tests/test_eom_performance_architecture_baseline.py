from __future__ import annotations

import unittest

from scripts.eom.performance.architecture_baseline import (
    dense_resource_projection,
    exhaustive_stationary_active_pairs,
    logical_ordered_pairs,
    stationary_block_counts,
)


class PerformanceArchitectureBaselineTests(unittest.TestCase):
    def test_logical_pair_count_includes_every_self_pair(self) -> None:
        self.assertEqual(logical_ordered_pairs(1), 1)
        self.assertEqual(logical_ordered_pairs(10), 100)
        with self.assertRaises(ValueError):
            logical_ordered_pairs(0)

    def test_stationary_block_exclusion_has_complete_disjoint_coverage(self) -> None:
        positions = tuple(index * 2.0 for index in range(128))
        counts = stationary_block_counts(positions, leaf_size=8)
        self.assertEqual(counts.logical_pairs, logical_ordered_pairs(len(positions)))
        self.assertGreater(counts.excluded_pairs, counts.exact_fallback_pairs)
        self.assertEqual(counts.active_root_pairs, 0)

    def test_active_pairs_match_exhaustive_nested_control(self) -> None:
        positions = tuple(index * 0.25 for index in range(64))
        counts = stationary_block_counts(positions, leaf_size=4)
        self.assertEqual(counts.logical_pairs, logical_ordered_pairs(len(positions)))
        self.assertEqual(
            counts.active_root_pairs,
            exhaustive_stationary_active_pairs(positions),
        )
        self.assertLessEqual(counts.active_root_pairs, counts.exact_fallback_pairs)

    def test_dense_million_path_projection_fails_closed(self) -> None:
        projection = dense_resource_projection(
            1_000_000,
            measured_bulk_rows_per_second=1_000_000_000.0,
            memory_budget_bytes=24 * 1024**3,
            wall_budget_seconds=3600.0,
        )
        self.assertEqual(projection["logical_ordered_pairs"], 1_000_000_000_000)
        self.assertEqual(projection["decision"], "resource_envelope_exceeded")
        self.assertIn(
            "dense_pair_rows_exceed_memory_budget",
            projection["reasons"],
        )

    def test_projection_can_be_within_a_declared_small_envelope(self) -> None:
        projection = dense_resource_projection(
            100,
            measured_bulk_rows_per_second=1_000_000.0,
            memory_budget_bytes=1_000_000,
            wall_budget_seconds=1.0,
        )
        self.assertEqual(projection["decision"], "within_projection_only")
        self.assertEqual(projection["reasons"], [])


if __name__ == "__main__":
    unittest.main()
