"""Independent exact controls; no actual F6c export is evaluated here.

Hand-authored paths are mathematical examples, never production receipts.
The full-size header fixture checks structure only, not scientific acceptance.
Expected Hermite values/controls below are independently specified Fractions.
"""

from decimal import localcontext
from fractions import Fraction as F
import importlib.util
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch


SCRIPT = Path(__file__).resolve().parents[1] / "scripts/eom/verify-f6c-retained-history-compatibility.py"
SPEC = importlib.util.spec_from_file_location("f6c_compatibility_controls", SCRIPT)
checker = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checker)


def segment(start="0", end="1", *, center="0", velocity="0", position="0", radius="0"):
    return {"startTime": start, "endTime": end,
            "coefficients": [[center, velocity, "0", "0"], ["0"] * 4, ["0"] * 4],
            "positionErrors": [position, position, position], "positionError": position,
            "velocityErrors": [radius, radius, radius], "velocityError": radius}


def controls_history(*segments):
    return [{"id": "hand-authored-control-not-F6c", "segments": list(segments)}]


def exact_record(record):
    return F(int(record["numerator"]), int(record["denominator"]))


def identity_fixture():
    """Complete metadata, with non-mathematical segment placeholders."""
    labels = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
    histories = []
    for index, label in enumerate(labels):
        positive = index % 2 == 0
        histories.append({"id": label, "pathKey": index + 1, "polarity": 1 if positive else -1,
                          "stateFlags": 1 if positive else 2,
                          "charge": ("" if positive else "-") + "0.1666666666666666666666666666666667",
                          "declaredPrehistorySegmentCount": 1600, "evolvedSegmentCount": 160,
                          "coverageStart": "-8", "coverageEnd": "0.13", "segments": [None] * 1760})
    return {"schema": "braid-program/f6c-retained-history-export.v1", "status": "exported-data-only",
            "runId": "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1",
            "modelFingerprint": "fnv1a64:6b87d1f138d33e13",
            "generatingSpec": "F6c-nonlinear-return-map-search-v2-return-continuation",
            "fieldSpeed": "1", "coupling": "10.304229970992187",
            "interval": {"start": "0", "end": "0.13"}, "retainedHistories": histories,
            "counts": {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                       "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
                       "acceptedFrameIntervals": 80, "orderedPairs": 64}}


class ExactMathematicalControls(unittest.TestCase):
    def test_known_nonzero_hermite_control_values(self):
        position, velocity = checker.correction_controls(F(2), F(1, 6), F(-1, 3), F(1, 5), F(-2, 5))
        self.assertEqual(position, (F(1, 6), F(3, 10), F(-1, 15), F(-1, 3)))
        self.assertEqual(velocity, (F(1, 5), F(-11, 20), F(-2, 5)))
        # Independent power form: 1/6 + z*2/5 - z^2*3/2 + z^3*3/5.
        for z in (F(0), F(1, 7), F(1, 2), F(1)):
            actual_position = sum(position[k] * (1, 3, 3, 1)[k]
                                  * z**k * (1-z)**(3-k) for k in range(4))
            actual_velocity = sum(velocity[k] * (1, 2, 1)[k]
                                  * z**k * (1-z)**(2-k) for k in range(3))
            self.assertEqual(actual_position, F(1, 6) + F(2, 5)*z - F(3, 2)*z*z + F(3, 5)*z**3)
            self.assertEqual(actual_velocity, F(1, 5) - F(3, 2)*z + F(9, 10)*z*z)

    def test_known_two_piece_corrector_and_exact_allowance_equality(self):
        left = segment(position="0.05", radius="0.15")
        right = segment("1", "2", center="0.1", position="0.05", radius="0.15")
        result = checker.analyze_paths(controls_history(left, right))
        self.assertTrue(result["constructionFitsOriginalEnclosures"])
        self.assertEqual(result["failures"], [])
        self.assertEqual(result["counts"], {"members": 1, "segments": 2, "axes": 6,
                                           "internalJoins": 1, "allowanceComparisons": 84})
        self.assertEqual(exact_record(result["worstControlAllowanceRatios"]["positionAxis"]["ratio"]), 1)
        self.assertEqual(exact_record(result["worstControlAllowanceRatios"]["velocityAxis"]["ratio"]), 1)
        self.assertNotIn("accepted", result)

    def test_position_overlap_does_not_establish_velocity_fit(self):
        left = segment(position="0.05", radius="0.01")
        right = segment("1", "2", center="0.1", position="0.05", radius="0.01")
        result = checker.analyze_paths(controls_history(left, right))
        failures = [item for item in result["failures"] if item["code"] == "midpoint_bernstein_allowance_exceeded"]
        self.assertFalse(result["constructionFitsOriginalEnclosures"])
        self.assertEqual(len(failures), 4)  # center derivative control, both segments, axis + scalar.
        self.assertTrue(all(item["kind"] == "velocity" for item in failures))
        self.assertTrue(all(exact_record(item["signedControl"]) == F(3, 20) for item in failures))

    def test_unequal_allowances_midpoint_failure_is_not_incompatibility(self):
        left = segment(position="0.1", radius="1")
        right = segment("1", "2", center="1", position="0.9", radius="1")
        result = checker.analyze_paths(controls_history(left, right))
        self.assertFalse(result["constructionFitsOriginalEnclosures"])
        # Independently known compatible witness X(T)=1/10 throughout [0,2].
        self.assertLessEqual(abs(F(1, 10) - F(0)), F(1, 10))
        self.assertLessEqual(abs(F(1, 10) - F(1)), F(9, 10))

    def test_zero_allowance_exact_zero_controls_and_outer_endpoints(self):
        first = segment("0", "1", velocity="0.25")
        second = segment("1", "2", center="0.25", velocity="0.25")
        result = checker.analyze_paths(controls_history(first, second))
        self.assertTrue(result["constructionFitsOriginalEnclosures"])
        self.assertTrue(result["velocityBoxesStrictlySubfield"])
        self.assertEqual(exact_record(result["worstVelocityBox"]["squaredUpper"]), F(1, 16))
        for record in result["worstControlAllowanceRatios"].values():
            self.assertEqual(exact_record(record["ratio"]), 0)
            self.assertFalse(record["unboundedRatio"])

    def test_discontinuous_zero_allowance_reports_all_infinite_ratios(self):
        result = checker.analyze_paths(controls_history(segment(), segment("1", "2", center="1")))
        self.assertFalse(result["constructionFitsOriginalEnclosures"])
        failures = [item for item in result["failures"] if item["code"] == "midpoint_bernstein_allowance_exceeded"]
        self.assertEqual(len(failures), 12)
        for record in result["worstControlAllowanceRatios"].values():
            self.assertIsNone(record["ratio"])
            self.assertTrue(record["unboundedRatio"])

    def test_independent_quadratic_velocity_hull_and_axis_inflation(self):
        source = segment(radius="0.1")
        source["coefficients"][0] = ["0", "0.2", "-0.3", "0.2"]
        source["velocityErrors"] = ["0.1", "0", "0"]
        parsed = checker.parse_segment(source)
        # q'=1/5 - 3u/5 + 3u^2/5: Bernstein controls (1/5,-1/10,1/5).
        self.assertEqual(checker.velocity_box_squared(parsed), F(9, 100))

    def test_speed_failure_does_not_erase_valid_c1_construction(self):
        result = checker.analyze_paths(controls_history(segment(velocity="1")))
        self.assertTrue(result["constructionFitsOriginalEnclosures"])
        self.assertFalse(result["velocityBoxesStrictlySubfield"])
        self.assertEqual([item["code"] for item in result["failures"]], ["velocity_box_subfield_bound_unproved"])

    def test_long_decimal_and_cancellation_independent_of_ambient_precision(self):
        row = tuple(F(value) for value in ("1.000000000000000000000000000001", "-1", "0", "0"))
        for precision in (3, 28, 90):
            with self.subTest(precision=precision), localcontext() as context:
                context.prec = precision
                self.assertEqual(checker.exact_state(row, F(1)), (F(1, 10**30), F(-1)))
                self.assertEqual(checker.rational("1.000000000000000000000000000001"), F(10**30+1, 10**30))


class StructureControls(unittest.TestCase):
    def test_invalid_decimal_and_json_tokens_rejected(self):
        for value in (None, 1, 1.0, True, "NaN", "Infinity", "+1", "01", " 1", "1/3", "1e999999", "1"*257):
            with self.subTest(value=value), self.assertRaises(checker.CompatibilityError):
                checker.rational(value)
        for raw in (b'{"x":1,"x":2}', b'[NaN]', b'[Infinity]', b'[0.1]', b'"\xff"', b'{'):
            with self.subTest(raw=raw), self.assertRaises(checker.CompatibilityError):
                checker.parse_export(raw)

    def test_segment_width_shape_and_error_failures(self):
        mutations = (lambda s: s.update(endTime="0"), lambda s: s.update(endTime="-1"),
                     lambda s: s["coefficients"].pop(), lambda s: s["coefficients"][0].pop(),
                     lambda s: s["velocityErrors"].__setitem__(0, "-1"),
                     lambda s: s["positionErrors"].__setitem__(0, "0.00000000000000000001"),
                     lambda s: s.update(extra="0"))
        for mutation in mutations:
            source = segment()
            mutation(source)
            with self.subTest(source=source), self.assertRaises(checker.CompatibilityError):
                checker.parse_segment(source)
        with self.assertRaises(checker.CompatibilityError):
            checker.correction_controls(F(0), F(0), F(0), F(0), F(0))
        with self.assertRaises(checker.CompatibilityError):
            checker.correction_controls(1.0, F(0), F(0), F(0), F(0))

    def test_exact_partition_domain_split_gap_and_overlap(self):
        left = checker.parse_segment(segment("-8", "0"))
        right = checker.parse_segment(segment("0e0", "0.13"))
        checker.check_partition([left, right], domain=(F(-8), F(13, 100)), split=(1, F(0)))
        for domain, split in (((F(-7), F(13, 100)), (1, F(0))),
                              ((F(-8), F(14, 100)), (1, F(0))),
                              ((F(-8), F(13, 100)), (1, F(1))),
                              ((F(-8), F(13, 100)), (2, F(0)))):
            with self.subTest(domain=domain, split=split), self.assertRaises(checker.CompatibilityError):
                checker.check_partition([left, right], domain=domain, split=split)
        for start in ("0.000000000000000000000001", "-0.000000000000000000000001"):
            with self.subTest(start=start), self.assertRaises(checker.CompatibilityError):
                checker.analyze_paths(controls_history(segment("-1", "0"), segment(start, "1")))

    def test_complete_header_census_is_structural_not_actual_evidence(self):
        document = identity_fixture()
        histories = checker.validate_identity(document)
        self.assertEqual(sum(len(item["segments"]) for item in histories), 14080)
        with self.assertRaises(checker.CompatibilityError):
            checker.analyze_paths(histories, production=True)  # placeholders cannot become evidence.

    def test_missing_member_segment_identity_polarity_and_numeric_type(self):
        mutations = (lambda d: d["retainedHistories"].pop(),
                     lambda d: d["retainedHistories"][0]["segments"].pop(),
                     lambda d: d["retainedHistories"][0].update(id="0-"),
                     lambda d: d["retainedHistories"][0].update(pathKey=True),
                     lambda d: d["retainedHistories"][0].update(polarity=-1),
                     lambda d: d["retainedHistories"][0].update(charge="1/6"),
                     lambda d: d["retainedHistories"][0].update(declaredPrehistorySegmentCount=1599),
                     lambda d: d["retainedHistories"][0].update(coverageStart="-7"),
                     lambda d: d["counts"].update(segments=14079),
                     lambda d: d.update(fieldSpeed="2"),
                     lambda d: d.update(runId="other"))
        for index, mutation in enumerate(mutations):
            document = identity_fixture()
            mutation(document)
            with self.subTest(index=index), self.assertRaises(checker.CompatibilityError):
                checker.validate_identity(document)


class ByteAndAuthorityControls(unittest.TestCase):
    @staticmethod
    def publication_packet():
        # Positive boolean is synthetic publication plumbing, not a history
        # receipt or an invented successful scientific analysis.
        return {"schema": "test-only-publication-plumbing", "testOnly": True,
                "accepted": True, "claims": {"subjectMembershipEstablished": False},
                "failures": []}

    def assert_publication_rejected(self, output, exception_name):
        packet = json.loads(output.read_text())
        self.assertFalse(packet["accepted"])
        self.assertTrue(packet["testOnly"])
        self.assertEqual(packet["publication"]["status"], "rejected")
        self.assertTrue(all(value is False for value in packet["claims"].values()))
        self.assertEqual(packet["failures"][-1]["code"], "publication_rejected")
        self.assertEqual(packet["failures"][-1]["exceptionType"], exception_name)
        directory = Path(packet["publication"]["attemptDirectory"])
        self.assertTrue((directory / "rejection.json").is_file())
        return packet

    def test_slow_final_candidate_write_rejects_after_fsync(self):
        clock = [0]
        original_writer = checker.write_exclusive
        with tempfile.TemporaryDirectory() as directory, patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]):
            output = Path(directory) / "receipt.json"
            with self.assertRaisesRegex(checker.CompatibilityError, "deadline"):
                with checker.ProofWatch() as watch:
                    clock[0] = 1799
                    def slow_write(path, packet):
                        digest = original_writer(path, packet)
                        if Path(path).name == "candidate.json":
                            clock[0] = 1801
                        return digest
                    with patch.object(checker, "write_exclusive", side_effect=slow_write):
                        checker.ReceiptPublication(output, self.publication_packet(), watch).publish()
            packet = self.assert_publication_rejected(output, "CompatibilityError")
            self.assertEqual(packet["failures"][-1]["elapsedSeconds"], 1801)

    def test_slow_final_link_retracts_only_owned_public_hardlink(self):
        clock = [0]
        original_link = checker.os.link
        with tempfile.TemporaryDirectory() as directory, patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]):
            output = Path(directory) / "receipt.json"
            with self.assertRaisesRegex(checker.CompatibilityError, "deadline"):
                with checker.ProofWatch() as watch:
                    clock[0] = 1799
                    def slow_link(source, destination, *args, **kwargs):
                        result = original_link(source, destination, *args, **kwargs)
                        if Path(source).name == "candidate.json":
                            clock[0] = 1801
                        return result
                    with patch.object(checker.os, "link", side_effect=slow_link):
                        checker.ReceiptPublication(output, self.publication_packet(), watch).publish()
            packet = self.assert_publication_rejected(output, "CompatibilityError")
            candidate = Path(packet["publication"]["attemptDirectory"]) / "candidate.json"
            self.assertNotEqual(candidate.stat().st_ino, output.stat().st_ino)
            self.assertFalse(json.loads(candidate.read_text())["publication"]["privateCandidateHasAuthority"])

    def test_interrupted_candidate_fsync_preserves_rejection(self):
        original_fsync = checker.os.fsync
        first = [True]
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "receipt.json"
            def interrupted_fsync(fd):
                if first[0]:
                    first[0] = False
                    raise KeyboardInterrupt("synthetic interrupted final flush")
                return original_fsync(fd)
            with self.assertRaises(KeyboardInterrupt):
                with checker.ProofWatch() as watch:
                    with patch.object(checker.os, "fsync", side_effect=interrupted_fsync):
                        checker.ReceiptPublication(output, self.publication_packet(), watch).publish()
            self.assert_publication_rejected(output, "KeyboardInterrupt")

    def test_final_watch_exit_deadline_rejects_after_publication(self):
        clock = [0]
        with tempfile.TemporaryDirectory() as directory, patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]):
            output = Path(directory) / "receipt.json"
            with self.assertRaisesRegex(checker.CompatibilityError, "deadline"):
                with checker.ProofWatch() as watch:
                    clock[0] = 1799
                    checker.ReceiptPublication(output, self.publication_packet(), watch).publish()
                    clock[0] = 1801
            self.assert_publication_rejected(output, "CompatibilityError")
            self.assertEqual(signal.getitimer(signal.ITIMER_REAL), (0.0, 0.0))

    def test_interruption_after_publication_rejects_before_watch_closes(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "receipt.json"
            with self.assertRaises(KeyboardInterrupt):
                with checker.ProofWatch() as watch:
                    checker.ReceiptPublication(output, self.publication_packet(), watch).publish()
                    raise KeyboardInterrupt("synthetic interruption after publication")
            self.assert_publication_rejected(output, "KeyboardInterrupt")

    def test_watchdog_has_fixed_cadence_and_restores_after_exception(self):
        old_handler = signal.getsignal(signal.SIGALRM)
        self.assertEqual(signal.getitimer(signal.ITIMER_REAL), (0.0, 0.0))
        with self.assertRaisesRegex(RuntimeError, "control interruption"):
            with checker.ProofWatch() as watch:
                remaining, cadence = signal.getitimer(signal.ITIMER_REAL)
                self.assertGreater(remaining, 0)
                self.assertLessEqual(remaining, 15)
                self.assertEqual(cadence, 15)
                watch.progress(2)
                self.assertEqual(watch.completed, 2)
                raise RuntimeError("control interruption")
        self.assertEqual(signal.getitimer(signal.ITIMER_REAL), (0.0, 0.0))
        self.assertEqual(signal.getsignal(signal.SIGALRM), old_handler)

    def test_deadline_rejects_without_waiting(self):
        watch = checker.ProofWatch()
        watch.started = 0
        with patch.object(checker.time, "monotonic", return_value=1801):
            with self.assertRaisesRegex(checker.CompatibilityError, "deadline"):
                watch.progress(1)

    def test_same_descriptor_unchanged_binding_and_modified_bytes(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source"
            source.write_bytes(b"abcd")
            with checker.BoundFile(source, 8) as bound:
                self.assertEqual(bound.binding(), bound.recheck())
                source.write_bytes(b"abce")
                with self.assertRaises(checker.CompatibilityError):
                    bound.recheck()

    def test_path_replaced_with_identical_bytes_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            source, replacement = Path(directory) / "source", Path(directory) / "replacement"
            source.write_bytes(b"same")
            replacement.write_bytes(b"same")
            with checker.BoundFile(source, 8) as bound:
                os.replace(replacement, source)
                with self.assertRaises(checker.CompatibilityError):
                    bound.recheck()

    def test_nonregular_empty_oversized_and_symlink_inputs_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            empty, large, link, fifo = (root / name for name in ("empty", "large", "link", "fifo"))
            empty.write_bytes(b"")
            large.write_bytes(b"12345")
            link.symlink_to(large)
            os.mkfifo(fifo)
            for source, limit in ((root, 1024), (empty, 8), (large, 4), (link, 8), (fifo, 8)):
                with self.subTest(source=source), self.assertRaises((checker.CompatibilityError, OSError)):
                    with checker.BoundFile(source, limit):
                        self.fail("invalid input entered")

    def test_executing_source_snapshot_and_altered_code(self):
        original = SCRIPT.read_bytes()
        checker.verify_executing_source(original)
        altered = original.replace(b"MAX_TOKEN_LENGTH = 256", b"MAX_TOKEN_LENGTH = 255")
        self.assertNotEqual(original, altered)
        with self.assertRaises(checker.CompatibilityError):
            checker.verify_executing_source(altered)

    def test_exclusive_output_never_overwrites(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "receipt.json"
            checker.write_exclusive(output, {"testOnly": True, "accepted": False})
            original = output.read_bytes()
            with self.assertRaises(FileExistsError):
                checker.write_exclusive(output, {"accepted": True})
            self.assertEqual(output.read_bytes(), original)

    def test_cli_changed_source_rejected_without_scientific_claim_or_hash_override(self):
        with tempfile.TemporaryDirectory() as directory:
            source, output = Path(directory) / "not-f6c.json", Path(directory) / "receipt.json"
            source.write_text(json.dumps(identity_fixture()))
            command = [sys.executable, str(SCRIPT), "--history-export", str(source), "--out", str(output)]
            result = subprocess.run(command, capture_output=True, text=True, timeout=10)
            self.assertEqual(result.returncode, 1, result.stderr)
            packet = json.loads(output.read_text())
            self.assertFalse(packet["accepted"])
            self.assertFalse(packet["h3EvidenceEligible"])
            self.assertFalse(packet["subjectMembershipEstablished"])
            self.assertTrue(all(value is False for value in packet["claims"].values()))
            self.assertNotIn("analysis", packet)
            self.assertIn("SHA-256 mismatch", packet["failures"][0]["detail"])
            self.assertEqual(packet["historyExportBefore"], packet["historyExportAfter"])
            self.assertEqual(packet["instrumentBefore"], packet["instrumentAfter"])
            self.assertIn("proofElapsedSeconds", packet)
            self.assertNotIn("elapsedSeconds", packet)
            completion = json.loads(result.stdout)
            self.assertGreaterEqual(completion["publicationElapsedSeconds"], packet["proofElapsedSeconds"])
            self.assertLessEqual(completion["publicationElapsedSeconds"], 1800)
            self.assertFalse(packet["publication"]["privateCandidateHasAuthority"])
            original = output.read_bytes()
            repeated = subprocess.run(command, capture_output=True, text=True, timeout=10)
            self.assertEqual(repeated.returncode, 2)
            self.assertEqual(output.read_bytes(), original)
            override = subprocess.run(command + ["--expected-sha256", "0"*64], capture_output=True, text=True, timeout=10)
            self.assertEqual(override.returncode, 2)


if __name__ == "__main__":
    unittest.main()
