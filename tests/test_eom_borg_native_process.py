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

    def test_native_process_prints_parser_protocol_magic(self) -> None:
        completed = subprocess.run(
            [str(self.binary), "print-protocol-version"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertEqual(completed.stdout, "EOM_BORG_NATIVE_V5\n")
        self.assertEqual(completed.stderr, "")

    def test_native_process_extends_continuous_history_and_returns_only_published_segments(self) -> None:
        protocol = "\n".join(
            (
                "EOM_BORG_NATIVE_V5",
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
                        "certified",
                        "0",
                        "none",
                        "none",
                        "1",
                        "1",
                        "0.2",
                        "1e-10",
                        "1e-8",
                        "0",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "2",
                        "67108864",
                        "1",
                    )
                ),
                "PATH\tp\t1\t1\t0\t1",
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
        self.assertEqual(response["runGrade"], "certified")
        self.assertNotIn("coreScale", response)
        self.assertEqual(response["claimGrade"], "executable_architecture_evidence")
        self.assertEqual(response["causticWarningCount"], 0)
        self.assertIsNone(response["firstCausticWarningTime"])
        self.assertEqual(response["causticWarningPairs"], [])
        self.assertEqual(response["causticWarnings"], [])
        self.assertEqual(response["acceptedEndTime"], "2.1")
        self.assertEqual(response["acceptedStepCount"], 1)
        self.assertEqual(response["rejectedStepCount"], 0)
        self.assertAlmostEqual(float(response["controllerStepSize"]), 0.1)
        self.assertEqual(response["haltCode"], "")
        self.assertTrue(all(
            "emissionToCurrentSourceRatioMax" not in row
            and "emissionToCurrentSourceRatioMean" not in row
            and "emissionToCurrentSourceRatioSampleCount" not in row
            for row in response["stepFailures"]
        ))
        self.assertEqual(response["publishedExtensions"][0]["pathId"], "p")
        self.assertTrue(all(
            segment["claimGrade"] == "executable_architecture_evidence"
            for segment in response["publishedExtensions"][0]["segments"]
        ))
        self.assertGreater(
            len(response["publishedExtensions"][0]["segments"]), 0
        )

    def test_ordinary_root_failure_is_not_labeled_as_a_caustic_entry(self) -> None:
        def protocol(grade: str) -> str:
            return "\n".join((
                "EOM_BORG_NATIVE_V5",
                "\t".join((
                    "RUN", f"ordinary-root-{grade}", "1", "1.01",
                    "0.01", "0.01", "0.01", "0", grade, "0",
                    "none", "none", "1", "1", "0.2", "0.001", "1e-8",
                    "0", "1e-8", "1e-8", "1e-8", "2", "67108864", "2",
                )),
                "PATH\treceiver\t1\t1\t0\t1",
                "SEG\t0\t1\t0.5\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "PATH\tsource\t1\t1\t0\t1",
                "SEG\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0.001\t0",
                "END",
                "",
            ))

        for grade in ("display", "certified"):
            with self.subTest(grade=grade):
                completed = subprocess.run(
                    [str(self.binary), "borg-shadow-v0"],
                    input=protocol(grade),
                    check=True,
                    cwd=ROOT,
                    capture_output=True,
                    text=True,
                )
                response = json.loads(completed.stdout)
                if grade == "display":
                    self.assertEqual(response["status"], "completed")
                    self.assertEqual(response["haltCode"], "")
                    self.assertEqual(response["claimGrade"], "display-only")
                    self.assertTrue(all(
                        segment["runGrade"] == "display"
                        and segment["evidenceStatus"] == "display-only"
                        and segment["claimGrade"] == "display-only"
                        for extension in response["publishedExtensions"]
                        for segment in extension["segments"]
                    ))
                    self.assertTrue(all(
                        step["rootCertificateCount"] == 0
                        and step["rootAccounting"] == []
                        and step["finiteWidthStateCertificates"] == []
                        and step["regulatorFailures"] == []
                        for step in response["stepFailures"]
                    ))
                else:
                    self.assertEqual(response["status"], "halted")
                    self.assertEqual(
                        response["haltCode"],
                        "root_completeness_not_certified",
                    )
                    terminal = response["stepFailures"][-1]
                    self.assertEqual(
                        terminal["failureCode"],
                        "root_completeness_not_certified",
                    )
                    self.assertEqual(terminal["causticContractRow"], "")
                    self.assertEqual(
                        terminal["causticRegulatorLevel"], "not-applicable"
                    )

    def test_display_evaluates_pairs_beyond_the_removed_far_field_cutoff(self) -> None:
        protocol = "\n".join((
            "EOM_BORG_NATIVE_V5",
            "\t".join((
                "RUN", "display-all-pairs", "0", "0.01",
                "0.01", "0.01", "0.01", "0", "display", "0",
                "none", "none", "1", "0.0005", "0.2", "0.001", "0.1",
                "0.25", "0.01", "0.01", "0.1", "2", "67108864", "2",
            )),
            "PATH\tp1\t1\t1\t0\t1",
            "SEG\t-1\t0\t0.25\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "PATH\tp2\t1\t1\t0\t1",
            "SEG\t-1\t0\t0.75\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "END",
            "",
        ))
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
        self.assertEqual(response["coreScale"], "0.2")
        self.assertGreater(len(response["stepFailures"]), 0)
        for row in response["stepFailures"]:
            self.assertEqual(row["traversalLogicalPairs"], 4)
            self.assertEqual(row["traversalExactPairs"], 4)
            self.assertEqual(row["traversalEnclosedPairs"], 0)
            self.assertGreater(
                row["emissionToCurrentSourceRatioSampleCount"], 0
            )
            self.assertGreaterEqual(
                row["emissionToCurrentSourceRatioMax"], 0
            )
            self.assertGreaterEqual(
                row["emissionToCurrentSourceRatioMean"], 0
            )
        second_coefficients = [
            float(extension["segments"][-1]["coefficients"][0][2])
            for extension in response["publishedExtensions"]
        ]
        self.assertLess(second_coefficients[0], 0)
        self.assertGreater(second_coefficients[1], 0)

    def test_display_core_scale_is_a_live_protocol_control(self) -> None:
        def run(core_scale: str) -> dict:
            protocol = "\n".join((
                "EOM_BORG_NATIVE_V5",
                "\t".join((
                    "RUN", f"display-core-{core_scale}", "0", "0.01",
                    "0.01", "0.01", "0.01", "0", "display", "0",
                    "none", "none", "1", "0.05", core_scale, "1e-8",
                    "0.1", "0", "0.01", "0.01", "0.1", "2",
                    "67108864", "2",
                )),
                "PATH\tp1\t1\t1\t0\t1",
                "SEG\t-1\t0\t0.45\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "PATH\tp2\t-1\t2\t0\t1",
                "SEG\t-1\t0\t0.55\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "END", "",
            ))
            completed = subprocess.run(
                [str(self.binary), "borg-shadow-v0"], input=protocol,
                check=True, cwd=ROOT, capture_output=True, text=True,
            )
            return json.loads(completed.stdout)

        broad = run("0.2")
        narrow = run("0.125")
        self.assertEqual(broad["status"], "completed")
        self.assertEqual(narrow["status"], "completed")
        self.assertEqual(broad["coreScale"], "0.2")
        self.assertEqual(narrow["coreScale"], "0.125")
        broad_acceleration = float(
            broad["publishedExtensions"][0]["segments"][-1]
            ["coefficients"][0][2]
        )
        narrow_acceleration = float(
            narrow["publishedExtensions"][0]["segments"][-1]
            ["coefficients"][0][2]
        )
        self.assertNotEqual(broad_acceleration, narrow_acceleration)

    def test_memory_budget_halts_before_evolution_without_publication(self) -> None:
        protocol = "\n".join((
            "EOM_BORG_NATIVE_V5",
            "\t".join((
                "RUN", "memory-budget", "2", "2.1", "0.1", "0.1",
                "0.1", "0", "display", "0", "none", "none", "1", "1",
                "0.2", "1e-10", "1e-8", "0", "1e-8", "1e-8", "1e-8",
                "1", "1", "1",
            )),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "END", "",
        ))
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"], input=protocol,
            check=True, cwd=ROOT, capture_output=True, text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "halted")
        self.assertEqual(response["haltCode"], "memory_budget_exhausted")
        self.assertEqual(response["acceptedStepCount"], 0)
        self.assertEqual(response["acceptedEndTime"], "2")
        self.assertEqual(response["memoryBudgetBytes"], 1)
        self.assertGreater(response["memoryEstimateBytes"], 1)
        self.assertTrue(all(
            extension["segments"] == []
            for extension in response["publishedExtensions"]
        ))

    def test_display_adaptive_root_isolation_finds_a_tangent_root(self) -> None:
        # At reception T=1, the source x(t)=1-t+(t-0.37)^2 gives the exact
        # residual |x(t)|-(1-t)=(t-0.37)^2. Its double root has no sign
        # change and lies between the former four fixed samples.
        protocol = "\n".join((
            "EOM_BORG_NATIVE_V5",
            "\t".join((
                "RUN", "display-tangent-root", "1", "1.0001", "0.0001",
                "0.0001", "0.0001", "0", "display", "0", "none", "none",
                "1", "0.0005", "0.2", "1e-8", "0.1", "0", "0.1",
                "0.1", "0.1", "2", "67108864", "2",
            )),
            "PATH\treceiver\t1\t1\t0\t1",
            "SEG\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "PATH\tsource\t-1\t2\t0\t1",
            "SEG\t0\t1\t1.1369\t-1.74\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "END", "",
        ))
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"], input=protocol,
            check=True, cwd=ROOT, capture_output=True, text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["haltCode"], "")
        self.assertGreater(max(
            row["emissionToCurrentSourceRatioSampleCount"]
            for row in response["stepFailures"]
        ), 0)

    def test_native_process_rejects_under_length_run_record(self) -> None:
        under_length_run = "\t".join(
            (
                "RUN", "under-length", "2", "2.1", "0.1", "0.1",
                "0.1", "0", "certified", "0", "none", "none", "1", "1", "1e-10",
                "1e-8", "0", "1e-8", "1e-8", "1e-8", "2",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=f"EOM_BORG_NATIVE_V5\n{under_length_run}\n",
            check=False,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn(
            "invalid RUN record: expected exactly 24 tab-separated fields",
            completed.stderr,
        )

    def test_native_process_rejects_v3_protocol_magic(self) -> None:
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input="EOM_BORG_NATIVE_V3\n",
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
                "EOM_BORG_NATIVE_V5",
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
                        "certified",
                        "0",
                        "none",
                        "none",
                        "1",
                        "1",
                        "0.2",
                        "1e-10",
                        "1e-8",
                        "0",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "1",
                        "67108864",
                        "1",
                    )
                ),
                "PATH\tp\t1\t1\t0\t1",
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
                "EOM_BORG_NATIVE_V5",
                "\t".join(
                    (
                        "RUN", "absolute-time-rounding-tail", "300.03", "300.04",
                        "0.01", "0.01", "0.01", "0", "certified", "0", "none", "none", "1", "1", "0.2", "1e-10", "1e-8", "0",
                        "1e-8", "1e-8", "1e-8", "2", "67108864", "1",
                    )
                ),
                "PATH\tp\t1\t1\t0\t1",
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
                    "EOM_BORG_NATIVE_V5",
                    "\t".join(
                        (
                            "RUN", run_id, "2", "2.1", "0.1", "0.1",
                            "0.1", "0", "certified", "0", "none", "none", "1", "1", "0.2", "1e-10", "1e-8", "0", "1e-8", "1e-8",
                            "1e-8", "2", "67108864", "1",
                        )
                    ),
                    "PATH\tp\t1\t1\t0\t1",
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

    def test_native_server_accepts_history_deltas_and_reuses_display_snapshot(self) -> None:
        def run_record(run_id: str, start: str, end: str) -> str:
            return "\t".join((
                "RUN", run_id, start, end, "0.01", "0.01", "0.01", "0",
                "display", "0", "none", "none", "1", "0.0005", "0.2",
                "1e-8", "0.1", "0", "0.1", "0.1", "0.1", "2",
                "67108864", "1",
            ))

        first_request = "\n".join((
            "EOM_BORG_NATIVE_V5", run_record("display-delta-0", "0", "0.01"),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t-1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "END", "",
        ))
        worker = subprocess.Popen(
            [str(self.binary), "borg-shadow-server-v0"],
            stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, cwd=ROOT, text=True,
        )
        assert worker.stdin is not None
        assert worker.stdout is not None
        worker.stdin.write(first_request)
        worker.stdin.flush()
        first = json.loads(worker.stdout.readline())
        cached_count = 1 + len(first["publishedExtensions"][0]["segments"])
        second_request = "\n".join((
            "EOM_BORG_NATIVE_V5",
            run_record("display-delta-1", "0.01", "0.02"),
            f"PATH\tp\t1\t1\t{cached_count}\t0",
            "END", "",
        ))
        worker.stdin.write(second_request)
        worker.stdin.flush()
        second = json.loads(worker.stdout.readline())
        worker.stdin.close()
        worker.wait(timeout=10)
        worker.stdout.close()
        assert worker.stderr is not None
        stderr = worker.stderr.read()
        worker.stderr.close()

        self.assertEqual(first["status"], "completed")
        self.assertEqual(second["status"], "completed")
        self.assertFalse(first["incrementalChunkStartSnapshotReused"])
        self.assertTrue(second["incrementalChunkStartSnapshotReused"])
        self.assertFalse(second["incrementalChunkStartSnapshotRebased"])
        self.assertGreater(
            len(second["publishedExtensions"][0]["segments"]), 0
        )
        self.assertEqual(stderr, "")

    def test_native_server_returns_structured_engine_exception_and_remains_usable(self) -> None:
        def request(run_id: str, thread_count: str) -> str:
            return "\n".join(
                (
                    "EOM_BORG_NATIVE_V5",
                    "\t".join(
                        (
                            "RUN", run_id, "2", "2.1", "0.1", "0.1",
                            "0.1", "0", "certified", "0", "none", "none",
                            "1", "1", "0.2", "1e-10", "1e-8", "0", "1e-8",
                            "1e-8", "1e-8", thread_count, "67108864", "1",
                        )
                    ),
                    "PATH\tp\t1\t1\t0\t1",
                    "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                    "END",
                    "",
                )
            )

        completed = subprocess.run(
            [str(self.binary), "borg-shadow-server-v0"],
            input=request("throws", "0") + request("recovers", "1"),
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        responses = [json.loads(line) for line in completed.stdout.splitlines()]
        self.assertEqual(len(responses), 2)
        failed, recovered = responses
        self.assertEqual(failed["status"], "halted")
        self.assertEqual(failed["haltCode"], "engine_exception")
        self.assertIn("resource limits must be positive", failed["diagnosticDetail"])
        self.assertEqual(failed["publishedExtensions"], [])
        self.assertEqual(failed["diagnostics"][0]["code"], "engine_exception")
        self.assertEqual(recovered["status"], "completed")
        self.assertEqual(recovered["acceptedEndTime"], "2.1")
        self.assertEqual(completed.stderr, "")

    def test_display_warning_suffix_with_short_join_segments_evolves_after_trim(self) -> None:
        def segment(start: str, end: str, x: str, error: str = "0") -> str:
            return "\t".join((
                "SEG", start, end,
                x, "0", "0", "0",
                "0", "0", "0", "0",
                "0", "0", "0", "0",
                error, "0",
            ))

        rows = [
            "EOM_BORG_NATIVE_V5",
            "\t".join((
                "RUN", "display-post-encounter-trim", "1", "1.01",
                "0.01", "0.01", "0.01", "0", "display", "1", "0.5",
                "receiver,source", "1", "0.005", "0.2", "0.001", "0.1", "0",
                "0.01", "0.01", "0.1", "2", "67108864", "2",
            )),
            "PATH\treceiver\t1\t1\t0\t1",
            segment("-1", "1", "1"),
            "PATH\tsource\t-1\t2\t0\t4",
            segment("-1", "-0.0001", "0", "0.0001"),
            segment("-0.0001", "0", "0", "0.0001"),
            segment("0", "0.0001", "0", "0.0001"),
            segment("0.0001", "1", "0", "0.0001"),
            "END",
            "",
        ]
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-server-v0"],
            input="\n".join(rows),
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["runGrade"], "display")
        self.assertEqual(response["causticWarningCount"], 1)
        self.assertEqual(response["claimGrade"], "display-only")
        self.assertEqual(response["acceptedEndTime"], "1.01")
        self.assertEqual(completed.stderr, "")

    def test_native_server_reuses_certified_chunk_boundary_snapshot(self) -> None:
        def protocol(
            run_id: str,
            start: str,
            end: str,
            segments: list[dict],
            step: str = "0.1",
        ) -> str:
            rows = [
                "EOM_BORG_NATIVE_V5",
                "\t".join(
                    (
                        "RUN", run_id, start, end, step, step,
                        step, "0", "certified", "0", "none", "none", "1", "1", "0.2", "1e-10", "1e-8", "0", "1e-8", "1e-8",
                        "1e-8", "2", "67108864", "1",
                    )
                ),
                f"PATH\tp\t1\t1\t0\t{len(segments)}",
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
