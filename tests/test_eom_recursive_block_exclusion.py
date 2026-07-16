from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class RecursiveBlockExclusionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-recursive-block-")
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
        cls.binary = cls.build / "eom_recursive_block_benchmark_cli"

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    @classmethod
    def run_case(
        cls,
        route: str,
        kind: str,
        population: int,
        threads: int = 1,
        maximum_exact_pairs: int = 1_000_000,
    ) -> dict[str, object]:
        completed = subprocess.run(
            [
                str(cls.binary),
                route,
                kind,
                str(population),
                str(threads),
                str(maximum_exact_pairs),
            ],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_sparse_constant_histories_have_complete_mixed_accounting(self) -> None:
        first = self.run_case("traversal", "sparse", 128)
        second = self.run_case("traversal", "sparse", 128)
        for row in (first, second):
            self.assertEqual(row["status"], "certified_complete")
            self.assertEqual(row["logical_pairs"], 128 * 128)
            self.assertGreater(row["excluded_pairs"], row["exact_fallback_pairs"])
            self.assertGreater(row["exact_fallback_pairs"], 0)
            self.assertEqual(row["enclosed_pairs"], 0)
            self.assertEqual(row["unresolved_pairs"], 0)
            self.assertEqual(
                row["excluded_pairs"]
                + row["exact_fallback_pairs"]
                + row["enclosed_pairs"]
                + row["unresolved_pairs"],
                row["logical_pairs"],
            )
            self.assertGreater(row["visited_blocks"], 1)
        deterministic_fields = (
            "logical_pairs",
            "visited_blocks",
            "excluded_pairs",
            "exact_fallback_pairs",
            "enclosed_pairs",
            "unresolved_pairs",
            "membership_fingerprint",
        )
        self.assertEqual(
            {field: first[field] for field in deterministic_fields},
            {field: second[field] for field in deterministic_fields},
        )

    def test_dense_population_falls_back_or_fails_preflight(self) -> None:
        bounded = self.run_case("traversal", "dense", 128)
        self.assertEqual(bounded["status"], "certified_complete")
        self.assertEqual(bounded["excluded_pairs"], 0)
        self.assertEqual(
            bounded["exact_fallback_pairs"], bounded["logical_pairs"]
        )
        self.assertEqual(bounded["unresolved_pairs"], 0)

        rejected = self.run_case(
            "traversal", "dense", 2048, maximum_exact_pairs=1_000_000
        )
        self.assertEqual(rejected["status"], "uncertified")
        self.assertEqual(rejected["failure_code"], "resource_envelope_exceeded")
        self.assertEqual(rejected["unresolved_pairs"], rejected["logical_pairs"])
        self.assertEqual(rejected["exact_fallback_pairs"], 0)

    def test_sparse_recursive_path_matches_exhaustive_exact_control(self) -> None:
        recursive = self.run_case("traversal", "sparse", 128)
        complete = self.run_case("recursive", "sparse", 128)
        exhaustive = self.run_case("exhaustive", "sparse", 128, threads=4)
        self.assertEqual(recursive["status"], "certified_complete")
        self.assertEqual(complete["status"], "certified_complete")
        self.assertEqual(exhaustive["status"], "certified_complete")
        self.assertEqual(recursive["logical_pairs"], exhaustive["logical_pairs"])
        self.assertEqual(complete["logical_pairs"], exhaustive["logical_pairs"])
        self.assertEqual(
            complete["exact_fallback_pairs"], recursive["exact_fallback_pairs"]
        )
        self.assertEqual(complete["unresolved_pairs"], 0)
        self.assertEqual(exhaustive["unresolved_pairs"], 0)
        self.assertEqual(exhaustive["exact_fallback_pairs"], 128 * 128)

    def test_moving_sparse_histories_have_complete_deterministic_accounting(self) -> None:
        first = self.run_case("traversal", "moving_sparse", 128)
        second = self.run_case("traversal", "moving_sparse", 128, threads=4)
        for row in (first, second):
            self.assertEqual(row["status"], "certified_complete")
            self.assertEqual(row["logical_pairs"], 128 * 128)
            self.assertGreater(row["excluded_pairs"], row["exact_fallback_pairs"])
            self.assertGreater(row["exact_fallback_pairs"], 0)
            self.assertEqual(row["enclosed_pairs"], 0)
            self.assertEqual(row["unresolved_pairs"], 0)
            self.assertEqual(
                row["excluded_pairs"]
                + row["exact_fallback_pairs"]
                + row["enclosed_pairs"]
                + row["unresolved_pairs"],
                row["logical_pairs"],
            )
        deterministic_fields = (
            "logical_pairs",
            "visited_blocks",
            "excluded_pairs",
            "exact_fallback_pairs",
            "enclosed_pairs",
            "unresolved_pairs",
            "membership_fingerprint",
        )
        self.assertEqual(
            {field: first[field] for field in deterministic_fields},
            {field: second[field] for field in deterministic_fields},
        )

    def test_moving_dense_population_falls_back_or_fails_preflight(self) -> None:
        bounded = self.run_case("traversal", "moving_dense", 128)
        self.assertEqual(bounded["status"], "certified_complete")
        self.assertEqual(bounded["excluded_pairs"], 0)
        self.assertEqual(
            bounded["exact_fallback_pairs"], bounded["logical_pairs"]
        )
        self.assertEqual(bounded["unresolved_pairs"], 0)

        rejected = self.run_case(
            "traversal", "moving_dense", 2048, maximum_exact_pairs=1_000_000
        )
        self.assertEqual(rejected["status"], "uncertified")
        self.assertEqual(rejected["failure_code"], "resource_envelope_exceeded")
        self.assertEqual(rejected["unresolved_pairs"], rejected["logical_pairs"])
        self.assertEqual(rejected["exact_fallback_pairs"], 0)

    def test_moving_recursive_path_matches_exhaustive_exact_control(self) -> None:
        traversal = self.run_case("traversal", "moving_sparse", 128)
        recursive = self.run_case("recursive", "moving_sparse", 128)
        exhaustive = self.run_case("exhaustive", "moving_sparse", 128)
        self.assertEqual(traversal["status"], "certified_complete")
        self.assertEqual(recursive["status"], "certified_complete")
        self.assertEqual(exhaustive["status"], "certified_complete")
        self.assertEqual(traversal["logical_pairs"], exhaustive["logical_pairs"])
        self.assertEqual(recursive["logical_pairs"], exhaustive["logical_pairs"])
        self.assertEqual(
            recursive["exact_fallback_pairs"], traversal["exact_fallback_pairs"]
        )
        self.assertEqual(recursive["unresolved_pairs"], 0)
        self.assertEqual(exhaustive["unresolved_pairs"], 0)
        self.assertEqual(exhaustive["exact_fallback_pairs"], 128 * 128)


if __name__ == "__main__":
    unittest.main()
