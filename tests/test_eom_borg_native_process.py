from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROTOCOL_MAGIC = "EOM_BORG_NATIVE_V10"


def run_record(
    run_id: str,
    start: str,
    end: str,
    *,
    initial_step: str = "0.1",
    minimum_step: str = "0.1",
    maximum_step: str = "0.1",
    adaptive_growth: str = "0",
    field_speed: str = "1",
    coupling: str = "1",
    core_scale: str = "0.2",
    root_tolerance: str = "1e-10",
    acceleration_tolerance: str = "1e-8",
    far_field_fraction: str = "0",
    position_tolerance: str = "1e-8",
    velocity_tolerance: str = "1e-8",
    correction_tolerance: str = "1e-8",
    thread_count: str = "2",
    memory_budget: str = "67108864",
    run_grade: str = "certified",
    path_count: str = "1",
    causal_retention_policy: str = "none",
    causal_retention_center: tuple[str, str, str] = ("0", "0", "0"),
    causal_retention_radius: str = "0",
) -> str:
    return "\t".join((
        "RUN", run_id, start, end, initial_step, minimum_step,
        maximum_step, adaptive_growth, field_speed, coupling, core_scale,
        root_tolerance, acceleration_tolerance, far_field_fraction,
        position_tolerance, velocity_tolerance, correction_tolerance,
        thread_count, memory_budget,
        "borg_certified_budget/v1", "test-certified-budget-v1", "0" * 64,
        "{}", "1", "1", "1e-30", "0.2", "1e-7", "1e-7", "0",
        "0.35", "0.15", "0.15", "0.15", "0.20", "0.5", "3",
        "128", "512", "256", "500000", "32", "200000", "24",
        "200000", "12", "1000", "100", "sharp_with_finite_width_fallback",
        "fixed-pairwise", "outward", "equal-routed-pair-weight/v1",
        acceleration_tolerance, run_grade, path_count,
        causal_retention_policy, *causal_retention_center,
        causal_retention_radius,
    ))


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
        self.assertEqual(completed.stdout, f"{PROTOCOL_MAGIC}\n")
        self.assertEqual(completed.stderr, "")

    def test_native_process_extends_continuous_history_and_returns_only_published_segments(self) -> None:
        protocol = "\n".join(
            (
                PROTOCOL_MAGIC,
                run_record("native-process-static", "2", "2.1"),
                "PATH\tp\t1\t1\t0\t1",
                "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
        self.assertEqual(response["schema"], "eom_borg_native_response/v1")
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["evidenceStatus"], "executable_architecture_evidence")
        self.assertEqual(response["coreScale"], "0.2")
        self.assertEqual(response["claimGrade"], "executable_architecture_evidence")
        self.assertEqual(
            response["budgetProvenance"]["presetId"],
            "test-certified-budget-v1",
        )
        self.assertEqual(response["acceptedEndTime"], "2.1")
        self.assertEqual(response["acceptedStepCount"], 1)
        self.assertEqual(response["rejectedStepCount"], 0)
        self.assertFalse(response["jointStateFallbackApplied"])
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
        history_phase_fields = (
            "endpointPositionLookupWallSeconds",
            "endpointVelocityLookupWallSeconds",
            "segmentConstructionWallSeconds",
            "tailBlockCopyWallSeconds",
            "fingerprintMetadataUpdateWallSeconds",
            "historyInflationWallSeconds",
        )
        self.assertTrue(all(
            response["timing"][field] >= 0
            for field in history_phase_fields
        ))
        self.assertAlmostEqual(
            response["timing"]["historyCopyHashWallSeconds"],
            sum(response["timing"][field] for field in history_phase_fields),
            delta=1e-7,
        )

    def test_display_grade_preserves_numerical_path_but_marks_every_output_display_only(self) -> None:
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "native-process-display", "2", "2.1",
                run_grade="display", path_count="2",
            ),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "PATH\tq\t-1\t2\t0\t1",
            "SEG\t0\t2\t0.5\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
        self.assertEqual(response["runGrade"], "display")
        self.assertEqual(response["evidenceStatus"], "display-only")
        self.assertEqual(response["claimGrade"], "display-only")
        self.assertEqual(len(response["publishedExtensions"]), 2)
        segments = [
            extension["segments"][0]
            for extension in response["publishedExtensions"]
        ]
        self.assertTrue(any(
            float(segment["coefficients"][0][2]) != 0.0
            for segment in segments
        ))
        self.assertTrue(all(
            segment["evidenceStatus"] == "display-only" and
            segment["claimGrade"] == "display-only"
            for segment in segments
        ))

    def test_display_causal_retention_releases_only_a_wavefront_cleared_prefix(self) -> None:
        zero_segment = "\t".join((
            "SEG", "-2", "-1", *(["0"] * 18),
        ))
        next_zero_segment = "\t".join((
            "SEG", "-1", "0", *(["0"] * 18),
        ))
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "display-causal-retention", "0", "0.1",
                run_grade="display", path_count="1",
                causal_retention_policy="fixed-spherical-receiver-envelope",
                causal_retention_center=("0", "0", "0"),
                causal_retention_radius="0.5",
            ),
            "PATH\tp\t1\t1\t0\t2",
            zero_segment,
            next_zero_segment,
            "END",
            "",
        ))
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"], input=protocol,
            check=True, cwd=ROOT, capture_output=True, text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        certificate = response["causalHistoryRetention"]
        self.assertEqual(certificate["receiverDomainStatus"], "enclosed")
        self.assertEqual(certificate["totalRetiredSegmentCount"], 1)
        self.assertEqual(certificate["paths"], [{
            "pathId": "p",
            "retiredPrefixCount": 1,
            "retainedSegmentCount": 2,
            "retainedCoverageStart": "-1",
            "clearedThroughTime": "-1",
        }])

    def test_display_causal_retention_rejects_an_envelope_crossing_before_publication(self) -> None:
        moving_segment = "\t".join((
            "SEG", "-0.1", "0",
            "0.47", "0.2", "0", "0",
            "0", "0", "0", "0",
            "0", "0", "0", "0",
            *(["0"] * 6),
        ))
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "display-causal-boundary", "0", "0.1",
                run_grade="display", path_count="1",
                causal_retention_policy="fixed-spherical-receiver-envelope",
                causal_retention_center=("0", "0", "0"),
                causal_retention_radius="0.5",
            ),
            "PATH\tp\t1\t1\t0\t1",
            moving_segment,
            "END",
            "",
        ))
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"], input=protocol,
            check=True, cwd=ROOT, capture_output=True, text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["acceptedEndTime"], "0.1")
        self.assertEqual(response["haltCode"], "")
        self.assertIsNone(response["causalHistoryRetention"])
        self.assertEqual(
            len(response["publishedExtensions"][0]["segments"]), 1,
        )

    def test_native_server_keeps_stationary_display_history_bounded_across_many_chunks(self) -> None:
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
        retained_count = 2
        maximum_retained_count = retained_count
        total_retired = 0
        try:
            for chunk in range(40):
                start = f"{chunk * 0.2:.1f}"
                end = f"{(chunk + 1) * 0.2:.1f}"
                rows = [
                    PROTOCOL_MAGIC,
                    run_record(
                        "bounded-display", start, end,
                        initial_step="0.1", minimum_step="0.1",
                        maximum_step="0.1", run_grade="display",
                        path_count="1",
                        causal_retention_policy=
                            "fixed-spherical-receiver-envelope",
                        causal_retention_center=("0", "0", "0"),
                        causal_retention_radius="0.5",
                    ),
                ]
                if chunk == 0:
                    rows.extend((
                        "PATH\tp\t1\t1\t0\t2",
                        "\t".join(("SEG", "-2", "-1", *(["0"] * 18))),
                        "\t".join(("SEG", "-1", "0", *(["0"] * 18))),
                    ))
                else:
                    rows.append(
                        f"PATH\tp\t1\t1\t{retained_count}\t0"
                    )
                rows.extend(("END", ""))
                worker.stdin.write("\n".join(rows))
                worker.stdin.flush()
                response = json.loads(worker.stdout.readline())
                self.assertEqual(response["status"], "completed")
                certificate = response["causalHistoryRetention"]
                retained_count = certificate["paths"][0][
                    "retainedSegmentCount"
                ]
                maximum_retained_count = max(
                    maximum_retained_count, retained_count
                )
                total_retired += certificate["totalRetiredSegmentCount"]
        finally:
            worker.stdin.close()
            worker.wait(timeout=10)
            worker.stdout.close()
            assert worker.stderr is not None
            worker.stderr.close()
        self.assertEqual(end, "8.0")
        self.assertGreater(total_retired, 70)
        self.assertLessEqual(maximum_retained_count, 9)

    def test_shadow_affine_diagnostic_is_bit_identical_and_sidecar_only(self) -> None:
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record("shadow-affine-identity", "2", "2.1"),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "END", "",
        ))
        disabled = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=protocol, check=True, cwd=ROOT,
            capture_output=True, text=True,
        )
        with tempfile.TemporaryDirectory(prefix="eom-shadow-affine-") as folder:
            sidecar = Path(folder) / "diagnostic.ndjson"
            enabled = subprocess.run(
                [
                    str(self.binary), "borg-shadow-v0",
                    f"--shadow-affine-diagnostic={sidecar}",
                ],
                input=protocol, check=True, cwd=ROOT,
                capture_output=True, text=True,
            )
            enabled_response = json.loads(enabled.stdout)
            disabled_response = json.loads(disabled.stdout)
            bit_identity_fields = (
                "status", "evidenceStatus", "claimGrade", "acceptedEndTime",
                "acceptedStepCount", "rejectedStepCount", "allStepsAtomic",
                "controllerStepSize", "haltCode", "budgetProvenance",
                "stepFailures", "publishedExtensions",
            )
            enabled_identity = {
                field: enabled_response[field] for field in bit_identity_fields
            }
            disabled_identity = {
                field: disabled_response[field] for field in bit_identity_fields
            }
            self.assertEqual(
                json.dumps(enabled_identity, sort_keys=True, separators=(",", ":")),
                json.dumps(disabled_identity, sort_keys=True, separators=(",", ":")),
            )
            self.assertTrue(sidecar.is_file())
            records = [json.loads(line) for line in sidecar.read_text().splitlines()]
            self.assertEqual(records[0]["record"], "observer_start")
            self.assertTrue(any(row["record"] == "step" for row in records))
            self.assertEqual(records[-1]["record"], "run_end")

    def test_ordinary_root_failure_is_not_labeled_as_a_caustic_entry(self) -> None:
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "ordinary-root", "1", "1.01",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", root_tolerance="0.001",
                path_count="2",
            ),
            "PATH\treceiver\t1\t1\t0\t1",
            "SEG\t0\t1\t0.5\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
            "PATH\tsource\t1\t1\t0\t1",
            "SEG\t0\t1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0.001\t0.001\t0.001\t0\t0\t0",
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
        self.assertEqual(response["status"], "halted")
        self.assertEqual(response["haltCode"], "root_completeness_not_certified")
        terminal = response["stepFailures"][-1]
        self.assertEqual(terminal["failureCode"], "root_completeness_not_certified")
        self.assertEqual(terminal["causticContractRow"], "")
        self.assertEqual(terminal["causticRegulatorLevel"], "not-applicable")

    def test_memory_budget_halts_before_evolution_without_publication(self) -> None:
        protocol = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "memory-budget", "2", "2.1",
                thread_count="1", memory_budget="1",
            ),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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

    def test_native_process_rejects_under_length_run_record(self) -> None:
        under_length_run = "\t".join(
            (
                "RUN", "under-length", "2", "2.1", "0.1", "0.1",
                "0.1", "0", "1", "1", "0.2", "1e-10",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=f"{PROTOCOL_MAGIC}\n{under_length_run}\n",
            check=False,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn(
            "invalid RUN record: expected exactly 60 tab-separated fields",
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
                PROTOCOL_MAGIC,
                run_record(
                    "native-process-adaptive-growth", "2", "2.4",
                    minimum_step="0.05", maximum_step="0.4",
                    adaptive_growth="1", thread_count="1",
                ),
                "PATH\tp\t1\t1\t0\t1",
                "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
                PROTOCOL_MAGIC,
                run_record(
                    "absolute-time-rounding-tail", "300.03", "300.04",
                    initial_step="0.01", minimum_step="0.01",
                    maximum_step="0.01",
                ),
                "PATH\tp\t1\t1\t0\t1",
                "SEG\t0\t300.03\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
                    PROTOCOL_MAGIC,
                    run_record(run_id, "2", "2.1"),
                    "PATH\tp\t1\t1\t0\t1",
                    "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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

    def test_native_server_accepts_history_deltas_and_reuses_certified_snapshot(self) -> None:
        first_request = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "certified-delta", "0", "0.01",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", coupling="0.0005",
                root_tolerance="1e-8", acceleration_tolerance="0.1",
                position_tolerance="0.1", velocity_tolerance="0.1",
                correction_tolerance="0.1",
            ),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t-1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
            PROTOCOL_MAGIC,
            run_record(
                "certified-delta", "0.01", "0.02",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", coupling="0.0005",
                root_tolerance="1e-8", acceleration_tolerance="0.1",
                position_tolerance="0.1", velocity_tolerance="0.1",
                correction_tolerance="0.1",
            ),
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

    def test_native_server_accepts_display_history_prefix_without_retransmission(self) -> None:
        first_request = "\n".join((
            PROTOCOL_MAGIC,
            run_record(
                "display-delta", "0", "0.01",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", coupling="0.0005",
                root_tolerance="1e-8", acceleration_tolerance="0.1",
                run_grade="display",
            ),
            "PATH\tp\t1\t1\t0\t1",
            "SEG\t-1\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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
            PROTOCOL_MAGIC,
            run_record(
                "display-delta", "0.01", "0.02",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", coupling="0.0005",
                root_tolerance="1e-8", acceleration_tolerance="0.1",
                run_grade="display",
            ),
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

        retained_segments = [{
            "startTime": "-1",
            "endTime": "0",
            "coefficients": [["0", "0", "0", "0"]] * 3,
            "positionErrors": ["0", "0", "0"],
            "velocityErrors": ["0", "0", "0"],
        }, *first["publishedExtensions"][0]["segments"]]
        cold_rows = [
            PROTOCOL_MAGIC,
            run_record(
                "display-cold-1", "0.01", "0.02",
                initial_step="0.01", minimum_step="0.01",
                maximum_step="0.01", coupling="0.0005",
                root_tolerance="1e-8", acceleration_tolerance="0.1",
                run_grade="display",
            ),
            f"PATH\tp\t1\t1\t0\t{len(retained_segments)}",
        ]
        for segment in retained_segments:
            cold_rows.append("\t".join((
                "SEG", segment["startTime"], segment["endTime"],
                *(coefficient for axis in segment["coefficients"]
                  for coefficient in axis),
                *segment["positionErrors"], *segment["velocityErrors"],
            )))
        cold_rows.extend(("END", ""))
        cold_completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input="\n".join(cold_rows), check=True, cwd=ROOT,
            capture_output=True, text=True,
        )
        cold = json.loads(cold_completed.stdout)

        self.assertEqual(first["status"], "completed")
        self.assertEqual(second["status"], "completed")
        self.assertEqual(second["acceptedEndTime"], "0.02")
        self.assertGreater(
            len(second["publishedExtensions"][0]["segments"]), 0
        )
        self.assertEqual(
            second["publishedExtensions"], cold["publishedExtensions"]
        )
        self.assertEqual(stderr, "")

    def test_native_server_returns_structured_engine_exception_and_remains_usable(self) -> None:
        def request(run_id: str, thread_count: str) -> str:
            return "\n".join(
                (
                    PROTOCOL_MAGIC,
                    run_record(run_id, "2", "2.1", thread_count=thread_count),
                    "PATH\tp\t1\t1\t0\t1",
                    "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
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

    def test_native_server_reuses_certified_chunk_boundary_snapshot(self) -> None:
        def protocol(
            run_id: str,
            start: str,
            end: str,
            segments: list[dict],
            step: str = "0.1",
        ) -> str:
            rows = [
                PROTOCOL_MAGIC,
                run_record(
                    run_id, start, end, initial_step=step,
                    minimum_step=step, maximum_step=step,
                ),
                f"PATH\tp\t1\t1\t0\t{len(segments)}",
            ]
            for segment in segments:
                rows.append("\t".join((
                    "SEG", segment["startTime"], segment["endTime"],
                    *(coefficient for axis in segment["coefficients"] for coefficient in axis),
                    *segment["positionErrors"], *segment["velocityErrors"],
                )))
            rows.extend(("END", ""))
            return "\n".join(rows)

        initial_prefix = {
            "startTime": "0",
            "endTime": "1",
            "coefficients": [["0", "0", "0", "0"]] * 3,
            "positionErrors": ["0", "0", "0"],
            "velocityErrors": ["0", "0", "0"],
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
            "incremental", "2", "2.1", [initial_prefix, initial_suffix]
        ))
        worker.stdin.flush()
        first = json.loads(worker.stdout.readline())
        continued_segments = [
            initial_suffix,
            *first["publishedExtensions"][0]["segments"],
        ]
        second_protocol = protocol(
            "incremental", "2.1", "2.2", continued_segments, "0.05"
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

    def test_display_exact_history_pages_to_disk_and_cleans_run_storage(self) -> None:
        with tempfile.TemporaryDirectory(
            prefix="borg-exact-history-test-"
        ) as storage_name:
            storage = Path(storage_name)
            stale = storage / "stale.aehb"
            stale.write_text("stale", encoding="utf-8")
            segments = [
                "\t".join((
                    "SEG", str(index - 130), str(index - 129),
                    *(["0"] * 18),
                ))
                for index in range(130)
            ]
            first_request = "\n".join((
                PROTOCOL_MAGIC,
                run_record(
                    "disk-paged-display", "0", "0.1",
                    run_grade="display", path_count="1",
                ),
                "PATH\tp\t1\t1\t0\t130",
                *segments,
                "END", "",
            ))
            in_memory = subprocess.run(
                [str(self.binary), "borg-shadow-v0"],
                input=first_request, check=True, cwd=ROOT,
                capture_output=True, text=True,
            )
            worker = subprocess.Popen(
                [
                    str(self.binary), "borg-shadow-server-v0",
                    f"--history-temp-root={storage}",
                    "--history-disk-limit-bytes=1099511627776",
                    "--history-cache-blocks-per-thread=2",
                ],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, cwd=ROOT, text=True,
            )
            assert worker.stdin is not None
            assert worker.stdout is not None
            worker.stdin.write(first_request)
            worker.stdin.flush()
            paged = json.loads(worker.stdout.readline())
            self.assertEqual(paged["status"], "completed")
            self.assertEqual(
                paged["publishedExtensions"],
                json.loads(in_memory.stdout)["publishedExtensions"],
            )
            history_storage = paged["historyStorage"]
            self.assertEqual(
                history_storage["schema"],
                "eom_exact_history_disk_store/v1",
            )
            self.assertEqual(
                history_storage["mode"], "disk-backed-exact-blocks",
            )
            self.assertEqual(
                history_storage["maximumDiskBytes"], 1099511627776,
            )
            self.assertGreaterEqual(history_storage["blockFileCount"], 2)
            self.assertGreater(history_storage["diskBytes"], 0)
            self.assertFalse(stale.exists())
            self.assertGreaterEqual(len(list(storage.rglob("*.aehb"))), 2)
            phase_disk_loads = sum(
                paged["timing"][field]
                for field in (
                    "endpointPositionLookupDiskBlockLoads",
                    "endpointVelocityLookupDiskBlockLoads",
                    "segmentConstructionDiskBlockLoads",
                    "tailBlockCopyDiskBlockLoads",
                    "fingerprintMetadataUpdateDiskBlockLoads",
                    "historyInflationDiskBlockLoads",
                )
            )
            phase_cache_misses = sum(
                paged["timing"][field]
                for field in (
                    "endpointPositionLookupDiskCacheMisses",
                    "endpointVelocityLookupDiskCacheMisses",
                    "segmentConstructionDiskCacheMisses",
                    "tailBlockCopyDiskCacheMisses",
                    "fingerprintMetadataUpdateDiskCacheMisses",
                    "historyInflationDiskCacheMisses",
                )
            )
            self.assertEqual(phase_disk_loads, phase_cache_misses)

            replacement_request = "\n".join((
                PROTOCOL_MAGIC,
                run_record(
                    "replacement-display-run", "2", "2.1",
                    run_grade="display", path_count="1",
                ),
                "PATH\tp\t1\t1\t0\t1",
                "\t".join(("SEG", "0", "2", *(["0"] * 18))),
                "END", "",
            ))
            worker.stdin.write(replacement_request)
            worker.stdin.flush()
            replacement = json.loads(worker.stdout.readline())
            self.assertEqual(replacement["status"], "completed")
            self.assertEqual(
                replacement["historyStorage"]["blockFileCount"], 0,
            )
            self.assertEqual(list(storage.rglob("*.aehb")), [])
            worker.stdin.close()
            worker.wait(timeout=10)
            worker.stdout.close()
            assert worker.stderr is not None
            self.assertEqual(worker.stderr.read(), "")
            worker.stderr.close()
            self.assertEqual(list(storage.rglob("*.aehb")), [])

    def test_invalid_exact_history_block_fails_closed_and_worker_recovers(self) -> None:
        with tempfile.TemporaryDirectory(
            prefix="borg-exact-history-corruption-test-"
        ) as storage_name:
            storage = Path(storage_name)
            first_path_segments = [
                "\t".join((
                    "SEG", str(index - 130), str(index - 129),
                    *(["0"] * 18),
                ))
                for index in range(130)
            ]
            second_path_segments = [
                "\t".join((
                    "SEG", str(index - 130), str(index - 129),
                    "1", *(["0"] * 17),
                ))
                for index in range(130)
            ]
            first_request = "\n".join((
                PROTOCOL_MAGIC,
                run_record(
                    "disk-corruption-display", "0", "0.1",
                    run_grade="display", path_count="2",
                ),
                "PATH\tp\t1\t1\t0\t130",
                *first_path_segments,
                "PATH\tq\t-1\t1\t0\t130",
                *second_path_segments,
                "END", "",
            ))
            worker = subprocess.Popen(
                [
                    str(self.binary), "borg-shadow-server-v0",
                    f"--history-temp-root={storage}",
                    "--history-disk-limit-bytes=1099511627776",
                    "--history-cache-blocks-per-thread=2",
                ],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, cwd=ROOT, text=True,
            )
            assert worker.stdin is not None
            assert worker.stdout is not None
            worker.stdin.write(first_request)
            worker.stdin.flush()
            first = json.loads(worker.stdout.readline())
            self.assertEqual(first["status"], "completed")
            cached_counts = [
                130 + len(extension["segments"])
                for extension in first["publishedExtensions"]
            ]
            disk_blocks = list(storage.rglob("*.aehb"))
            self.assertGreaterEqual(len(disk_blocks), 2)
            for block in disk_blocks:
                block.unlink()

            cached_request = "\n".join((
                PROTOCOL_MAGIC,
                run_record(
                    "disk-corruption-display", "0.1", "0.2",
                    run_grade="display", path_count="2",
                ),
                f"PATH\tp\t1\t1\t{cached_counts[0]}\t0",
                f"PATH\tq\t-1\t1\t{cached_counts[1]}\t0",
                "END", "",
            ))
            worker.stdin.write(cached_request)
            worker.stdin.flush()
            failed = json.loads(worker.stdout.readline())
            self.assertEqual(failed["status"], "halted")
            self.assertEqual(
                failed["haltCode"],
                "checkpoint_or_storage_failure",
            )
            self.assertIn(
                "exact history disk block",
                failed["diagnosticDetail"],
            )
            self.assertIsNone(worker.poll())
            self.assertEqual(list(storage.rglob("*.aehb")), [])

            worker.stdin.write(first_request)
            worker.stdin.flush()
            recovered = json.loads(worker.stdout.readline())
            self.assertEqual(recovered["status"], "completed")
            self.assertEqual(recovered["acceptedEndTime"], "0.1")
            worker.stdin.close()
            worker.wait(timeout=10)
            worker.stdout.close()
            assert worker.stderr is not None
            self.assertEqual(worker.stderr.read(), "")
            worker.stderr.close()

    def test_display_exact_history_disk_limit_fails_before_partial_publish(self) -> None:
        with tempfile.TemporaryDirectory(
            prefix="borg-exact-history-cap-test-"
        ) as storage_name:
            storage = Path(storage_name)
            segments = [
                "\t".join((
                    "SEG", str(index - 64), str(index - 63),
                    *(["0"] * 18),
                ))
                for index in range(64)
            ]
            protocol = "\n".join((
                PROTOCOL_MAGIC,
                run_record(
                    "disk-limit-display", "0", "0.1",
                    run_grade="display", path_count="1",
                ),
                "PATH\tp\t1\t1\t0\t64",
                *segments,
                "END", "",
            ))
            completed = subprocess.run(
                [
                    str(self.binary), "borg-shadow-server-v0",
                    f"--history-temp-root={storage}",
                    "--history-disk-limit-bytes=1",
                ],
                input=protocol, check=True, cwd=ROOT,
                capture_output=True, text=True,
            )
            response = json.loads(completed.stdout)
            self.assertEqual(response["status"], "halted")
            self.assertEqual(
                response["haltCode"],
                "checkpoint_or_storage_failure",
            )
            self.assertEqual(
                response["diagnosticDetail"],
                "exact_history_disk_limit_exhausted",
            )
            self.assertEqual(response["publishedExtensions"], [])
            self.assertEqual(list(storage.rglob("*.aehb")), [])


if __name__ == "__main__":
    unittest.main()
