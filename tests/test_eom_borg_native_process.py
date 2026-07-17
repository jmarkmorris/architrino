from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class NativeBorgProcessTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-borg-process-")
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
        cls.binary = cls.build / "eom_borg_shadow_cli"

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    def test_native_process_extends_continuous_history_and_returns_only_published_segments(self) -> None:
        protocol = "\n".join(
            (
                "EOM_BORG_NATIVE_V2",
                "\t".join(
                    (
                        "RUN",
                        "native-process-static",
                        "2",
                        "2.1",
                        "0.1",
                        "0.1",
                        "0.1",
                        "0",
                        "1",
                        "1",
                        "1e-10",
                        "1e-8",
                        "0",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "2",
                        "1",
                    )
                ),
                "PATH\tp\t1\t1\t1",
                "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "END",
                "",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=protocol,
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["schema"], "eom_borg_native_response/v0")
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["evidenceStatus"], "executable_architecture_evidence")
        self.assertEqual(response["acceptedEndTime"], "2.1")
        self.assertEqual(response["acceptedStepCount"], 1)
        self.assertEqual(response["rejectedStepCount"], 0)
        self.assertAlmostEqual(float(response["controllerStepSize"]), 0.1)
        self.assertEqual(response["haltCode"], "")
        self.assertEqual(response["publishedExtensions"][0]["pathId"], "p")
        self.assertGreater(
            len(response["publishedExtensions"][0]["segments"]), 0
        )

    def test_native_process_rejects_under_length_run_record(self) -> None:
        under_length_run = "\t".join(
            (
                "RUN", "under-length", "2", "2.1", "0.1", "0.1",
                "0.1", "0", "1", "1", "1e-10", "1e-8", "1e-8", "1e-8",
                "1e-8", "2", "1",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=f"EOM_BORG_NATIVE_V2\n{under_length_run}\n",
            check=False,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn(
            "invalid RUN record: expected exactly 18 tab-separated fields",
            completed.stderr,
        )

    def test_native_process_rejects_v1_protocol_magic(self) -> None:
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input="EOM_BORG_NATIVE_V1\n",
            check=False,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("unsupported Borg EOM native protocol", completed.stderr)

    def test_protocol_enables_bounded_adaptive_step_recovery(self) -> None:
        protocol = "\n".join(
            (
                "EOM_BORG_NATIVE_V2",
                "\t".join(
                    (
                        "RUN",
                        "native-process-adaptive-growth",
                        "2",
                        "2.4",
                        "0.1",
                        "0.05",
                        "0.4",
                        "1",
                        "1",
                        "1",
                        "1e-10",
                        "1e-8",
                        "0",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "1",
                        "1",
                    )
                ),
                "PATH\tp\t1\t1\t1",
                "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "END",
                "",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=protocol,
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        # Two accepted h=0.1 steps satisfy the unchanged 1/8-budget gate, so
        # the final accepted step grows to h=0.2. Ignoring either new field
        # would require four fixed h=0.1 steps.
        self.assertEqual(response["acceptedStepCount"], 3)
        self.assertEqual(response["rejectedStepCount"], 0)
        self.assertAlmostEqual(float(response["controllerStepSize"]), 0.2)

    def test_absolute_time_rounding_tail_snaps_to_requested_decimal_endpoint(self) -> None:
        protocol = "\n".join(
            (
                "EOM_BORG_NATIVE_V2",
                "\t".join(
                    (
                        "RUN", "absolute-time-rounding-tail", "300.03", "300.04",
                        "0.01", "0.01", "0.01", "0", "1", "1", "1e-10", "1e-8", "0",
                        "1e-8", "1e-8", "1e-8", "2", "1",
                    )
                ),
                "PATH\tp\t1\t1\t1",
                "SEG\t0\t300.03\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "END",
                "",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=protocol,
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["acceptedEndTime"], "300.04")
        self.assertEqual(response["acceptedStepCount"], 1)

    def test_native_server_process_serves_multiple_atomic_requests(self) -> None:
        def request(run_id: str) -> str:
            return "\n".join(
                (
                    "EOM_BORG_NATIVE_V2",
                    "\t".join(
                        (
                            "RUN", run_id, "2", "2.1", "0.1", "0.1",
                            "0.1", "0", "1", "1", "1e-10", "1e-8", "0", "1e-8", "1e-8",
                            "1e-8", "2", "1",
                        )
                    ),
                    "PATH\tp\t1\t1\t1",
                    "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                    "END",
                    "",
                )
            )

        completed = subprocess.run(
            [str(self.binary), "borg-shadow-server-v0"],
            input=request("persistent-0") + request("persistent-1"),
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        responses = [json.loads(line) for line in completed.stdout.splitlines()]
        self.assertEqual(len(responses), 2)
        self.assertTrue(all(response["status"] == "completed" for response in responses))

    def test_native_server_reuses_certified_chunk_boundary_snapshot(self) -> None:
        def protocol(
            run_id: str,
            start: str,
            end: str,
            segments: list[dict],
            step: str = "0.1",
        ) -> str:
            rows = [
                "EOM_BORG_NATIVE_V2",
                "\t".join(
                    (
                        "RUN", run_id, start, end, step, step,
                        step, "0", "1", "1", "1e-10", "1e-8", "0", "1e-8", "1e-8",
                        "1e-8", "2", "1",
                    )
                ),
                f"PATH\tp\t1\t1\t{len(segments)}",
            ]
            for segment in segments:
                rows.append("\t".join((
                    "SEG", segment["startTime"], segment["endTime"],
                    *(coefficient for axis in segment["coefficients"] for coefficient in axis),
                    segment["positionError"], segment["velocityError"],
                )))
            rows.extend(("END", ""))
            return "\n".join(rows)

        initial_prefix = {
            "startTime": "0",
            "endTime": "1",
            "coefficients": [["0", "0", "0", "0"]] * 3,
            "positionError": "0",
            "velocityError": "0",
        }
        initial_suffix = {
            **initial_prefix,
            "startTime": "1",
            "endTime": "2",
        }
        worker = subprocess.Popen(
            [str(self.binary), "borg-shadow-server-v0"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=ROOT,
            text=True,
        )
        assert worker.stdin is not None
        assert worker.stdout is not None
        worker.stdin.write(protocol(
            "incremental-0", "2", "2.1", [initial_prefix, initial_suffix]
        ))
        worker.stdin.flush()
        first = json.loads(worker.stdout.readline())
        continued_segments = [
            initial_suffix,
            *first["publishedExtensions"][0]["segments"],
        ]
        second_protocol = protocol(
            "incremental-1", "2.1", "2.2", continued_segments, "0.05"
        )
        worker.stdin.write(second_protocol)
        worker.stdin.flush()
        second = json.loads(worker.stdout.readline())
        worker.stdin.close()
        worker.wait(timeout=10)
        worker.stdout.close()
        assert worker.stderr is not None
        worker.stderr.close()

        cold = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=second_protocol,
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cold_second = json.loads(cold.stdout)
        self.assertFalse(first["incrementalChunkStartSnapshotReused"])
        self.assertTrue(second["incrementalChunkStartSnapshotReused"])
        self.assertTrue(second["incrementalChunkStartSnapshotRebased"])
        self.assertFalse(cold_second["incrementalChunkStartSnapshotReused"])
        self.assertEqual(second["acceptedEndTime"], cold_second["acceptedEndTime"])
        self.assertEqual(
            second["publishedExtensions"], cold_second["publishedExtensions"]
        )
        self.assertLess(
            second["timing"]["rootReevaluatedCells"],
            cold_second["timing"]["rootReevaluatedCells"],
        )


if __name__ == "__main__":
    unittest.main()
