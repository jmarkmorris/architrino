"""Hand-authored exact controls only; never evaluate the retained F6c export.

Polynomial identities and inequalities are independently specified below.
Tests of source capture/publication exercise operations, not scientific evidence.
"""

from copy import deepcopy
from decimal import localcontext
from fractions import Fraction as F
from hashlib import sha256
import importlib.util
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch


SCRIPT = Path(__file__).resolve().parents[1] / "scripts/eom/verify-f6c-retained-history-guards.py"
SPEC = importlib.util.spec_from_file_location("f6c_guard_controls", SCRIPT)
checker = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checker)


def segment(a="-8", b="1", *, center="0", velocity="0", position="0", radius="0"):
    return {"startTime": a, "endTime": b,
            "coefficients": [[center, velocity, "0", "0"], ["0"] * 4, ["0"] * 4],
            "positionErrors": [position] * 3, "positionError": position,
            "velocityErrors": [radius] * 3, "velocityError": radius}


def histories(*paths):
    return [{"id": f"synthetic-{i}", "segments": list(path)} for i, path in enumerate(paths)]


def analyze(paths):
    return checker.analyze_guards(paths, reception=(F(0), F(1)), oldest=F(-8))


def value(record):
    return F(int(record["numerator"]), int(record["denominator"]))


def identity_fixture():
    """Production metadata census, with deliberately non-mathematical placeholders."""
    members = []
    for index, label in enumerate(("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")):
        positive = index % 2 == 0
        members.append({"id": label, "pathKey": index + 1, "polarity": 1 if positive else -1,
                        "stateFlags": 1 if positive else 2,
                        "charge": ("" if positive else "-") + "0.1666666666666666666666666666666667",
                        "declaredPrehistorySegmentCount": 1600, "evolvedSegmentCount": 160,
                        "coverageStart": "-8", "coverageEnd": "0.13", "segments": [None] * 1760})
    return {"schema": "braid-program/f6c-retained-history-export.v1", "status": "exported-data-only",
            "runId": "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1",
            "modelFingerprint": "fnv1a64:6b87d1f138d33e13",
            "generatingSpec": "F6c-nonlinear-return-map-search-v2-return-continuation",
            "fieldSpeed": "1", "coupling": "10.304229970992187",
            "interval": {"start": "0", "end": "0.13"}, "retainedHistories": members,
            "counts": {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                       "evolvedSegmentsPerMember": 160, "acceptedFrames": 81,
                       "acceptedFrameIntervals": 80, "orderedPairs": 64}}


class PolynomialControls(unittest.TestCase):
    def test_power_shift_exact_independent_expansion(self):
        # q(u)=1-2u+3u²-4u³; q(2+z)=-23-38z-21z²-4z³.
        self.assertEqual(checker.power_shift((F(1), F(-2), F(3), F(-4)), F(2)),
                         (F(-23), F(-38), F(-21), F(-4)))
        self.assertEqual(checker.derivative((F(1), F(-2), F(3), F(-4))),
                         (F(-2), F(6), F(-12)))

    def test_bernstein_identity_closed_form(self):
        # On [0,2], q=1+3u-6u²+2u³ has controls 1,3,-3,-1.
        controls = checker.bernstein_controls((F(1), F(3), F(-6), F(2)), F(2))
        self.assertEqual(controls, (F(1), F(3), F(-3), F(-1)))
        # Independently recover power coefficients from the Bernstein basis.
        recovered = (controls[0], 3*(controls[1]-controls[0]),
                     3*(controls[0]-2*controls[1]+controls[2]),
                     -controls[0]+3*controls[1]-3*controls[2]+controls[3])
        self.assertEqual(recovered, (F(1), F(6), F(-24), F(16)))
        self.assertEqual(checker.polynomial_box((F(1), F(3), F(-6), F(2)), F(2), F(1, 10)),
                         (F(-31, 10), F(31, 10)))

    def test_coordinate_norm_squared_exact_cases(self):
        self.assertEqual(checker.norm_squared_bounds([(F(-2), F(3)), (F(4), F(5)), (F(-7), F(-6))]),
                         (F(52), F(83)))
        with self.assertRaises(checker.GuardError):
            checker.norm_squared_bounds([(F(1), F(0))])

    def test_exact_decimal_independent_of_ambient_context(self):
        with localcontext() as context:
            context.prec = 2
            self.assertEqual(checker.rational("0.0000000000072759576141834259033203125"), F(1, 2**37))
            self.assertEqual(checker.rational("-1.25e-3"), F(-1, 800))
        for token in (1, True, "NaN", "Infinity", "+1", "1/3", "1e257", "1e-257", "1" * 257):
            with self.subTest(token=token), self.assertRaises(checker.GuardError):
                checker.rational(token)


class UniformGuardControls(unittest.TestCase):
    def test_two_stationary_members_all_guards_and_census(self):
        result = analyze(histories([segment()], [segment(center="1")]))
        self.assertTrue(result["uniformSpeedStrictlyBelowOne"])
        self.assertTrue(result["uniformSameTimeNonselfSeparation"])
        self.assertTrue(result["uniformOldestBoundaryResidualStrictlyNegative"])
        self.assertEqual(result["failures"], [])
        self.assertNotIn("accepted", result)
        self.assertEqual(result["counts"], {
            "members": 2, "segments": 2, "axes": 6, "internalJoins": 0, "receptionCells": 1,
            "unorderedNonselfPairs": 1, "orderedNonselfPairs": 2,
            "comparisons": {"speed": 4, "clearance": 2, "oldestBoundary": 4},
            "failedComparisons": {"speed": 0, "clearance": 0, "oldestBoundary": 0}})
        pair = result["clearancePairs"][0]
        self.assertEqual(pair["ordered"], [["synthetic-0", "synthetic-1"], ["synthetic-1", "synthetic-0"]])
        self.assertEqual(value(pair["minimumSeparationSquared"]["axis"]["value"]), 1)
        self.assertEqual(value(result["oldestBoundaryPairs"][0]["minimumDelaySquaredMinusDistanceSquared"]["axis"]["value"]), 63)

    def test_interior_collision_not_endpoint_sampling(self):
        curved = segment("0", "1", center="1")
        curved["coefficients"][0] = ["1", "-4", "4", "0"]
        result = analyze(histories([segment("-8", "0", center="1"), curved], [segment()]))
        # Endpoints are both 1 away; exact q(1/2)=0. Whole-cell bound fails.
        self.assertFalse(result["uniformSameTimeNonselfSeparation"])
        self.assertEqual(result["counts"]["failedComparisons"]["clearance"], 2)

    def test_interior_speed_violation_not_endpoint_sampling(self):
        curved = segment("0", "1")
        curved["coefficients"][0] = ["0", "0", "3", "-2"]
        result = analyze(histories([segment("-8", "0"), curved], [segment(center="3")]))
        # v(0)=v(1)=0, but v(1/2)=3/2 > 1.
        self.assertFalse(result["uniformSpeedStrictlyBelowOne"])
        self.assertEqual(result["counts"]["failedComparisons"]["speed"], 2)

    def test_speed_and_oldest_boundary_equality_are_not_strict_passes(self):
        speed = analyze(histories([segment(velocity="1")], [segment(center="1")]))
        self.assertFalse(speed["uniformSpeedStrictlyBelowOne"])
        boundary = analyze(histories([segment()], [segment(center="8")]))
        self.assertFalse(boundary["uniformOldestBoundaryResidualStrictlyNegative"])
        self.assertEqual(boundary["counts"]["failedComparisons"]["oldestBoundary"], 4)
        self.assertEqual(value(boundary["oldestBoundaryPairs"][0]["minimumDelaySquaredMinusDistanceSquared"]["scalar"]["value"]), 0)

    def test_same_time_subtraction_retains_common_motion(self):
        result = analyze(histories([segment(velocity="10")], [segment(center="1", velocity="10")]))
        self.assertTrue(result["uniformSameTimeNonselfSeparation"])
        self.assertEqual(value(result["clearancePairs"][0]["minimumSeparationSquared"]["axis"]["value"]), 1)
        # This deliberately fast synthetic path does not pass the speed guard.
        self.assertFalse(result["uniformSpeedStrictlyBelowOne"])

    def test_axis_and_scalar_original_allowances_are_separately_preserved(self):
        first = segment(velocity="0.8", radius="0.1")
        first["velocityErrors"] = ["0.1", "0", "0"]
        result = analyze(histories([first], [segment(center="1")]))
        maxima = result["members"][0]["maximumSpeedSquared"]
        self.assertEqual(value(maxima["axis"]["value"]), F(81, 100))
        self.assertEqual(value(maxima["scalar"]["value"]), F(83, 100))
        self.assertTrue(result["uniformSpeedStrictlyBelowOne"])

    def test_original_position_errors_can_destroy_strict_clearance(self):
        result = analyze(histories([segment(position="0.5")], [segment(center="1", position="0.5")]))
        self.assertFalse(result["uniformSameTimeNonselfSeparation"])
        self.assertEqual(value(result["clearancePairs"][0]["minimumSeparationSquared"]["axis"]["value"]), 0)

    def test_oldest_boundary_uses_transmitter_original_oldest_position_error(self):
        first = [segment()]
        second = [segment("-8", "0", center="7", position="1"), segment("0", "1", center="1")]
        result = analyze(histories(first, second))
        pair = result["oldestBoundaryPairs"][0]
        self.assertEqual((pair["receiver"], pair["transmitter"]), ("synthetic-0", "synthetic-1"))
        self.assertLessEqual(value(pair["minimumDelaySquaredMinusDistanceSquared"]["axis"]["value"]), 0)
        self.assertFalse(result["uniformOldestBoundaryResidualStrictlyNegative"])

    def test_exact_union_partition_covers_all_shared_endpoints(self):
        paths = histories([segment("-8", "0"), segment("0", "0.25"), segment("0.25", "1")],
                          [segment("-8", "0", center="1"), segment("0", "0.75", center="1"),
                           segment("0.75", "1", center="1")])
        result = analyze(paths)
        cells = result["closedReceptionCells"]
        self.assertEqual([(value(c["start"]), value(c["end"]), c["memberSegmentIndices"]) for c in cells],
                         [(F(0), F(1, 4), [1, 1]), (F(1, 4), F(3, 4), [2, 1]), (F(3, 4), F(1), [2, 2])])
        self.assertEqual(result["counts"]["comparisons"], {"speed": 12, "clearance": 6, "oldestBoundary": 12})

    def test_closed_join_sides_and_final_endpoint_are_not_dropped(self):
        # The left polynomial reaches the other member exactly at the join.
        left = segment("0", "0.5", center="1", velocity="-2")
        paths = histories([segment("-8", "0", center="1"), left, segment("0.5", "1", center="1")],
                          [segment()])
        result = analyze(paths)
        self.assertFalse(result["uniformSameTimeNonselfSeparation"])
        self.assertEqual(result["counts"]["failedComparisons"]["clearance"], 2)
        final = analyze(histories([segment("-8", "0", center="1"), segment("0", "1", center="1", velocity="-1")],
                                  [segment()]))
        self.assertFalse(final["uniformSameTimeNonselfSeparation"])

    def test_three_member_ordered_mapping_and_deterministic_check_hash(self):
        paths = histories([segment()], [segment(center="1")], [segment(center="2")])
        first, second = analyze(paths), analyze(deepcopy(paths))
        self.assertEqual(first["comparisonSha256"], second["comparisonSha256"])
        self.assertEqual(first["counts"]["unorderedNonselfPairs"], 3)
        self.assertEqual(first["counts"]["orderedNonselfPairs"], 6)
        flattened = [tuple(p) for item in first["clearancePairs"] for p in item["ordered"]]
        self.assertEqual(len(set(flattened)), 6)
        paths[2]["segments"][0]["coefficients"][0][0] = "2.1"
        self.assertNotEqual(first["comparisonSha256"], analyze(paths)["comparisonSha256"])


class StructureControls(unittest.TestCase):
    def test_fixed_identity_and_exact_census(self):
        document = identity_fixture()
        self.assertEqual(len(checker.validate_identity(document)), 8)
        for mutate in (lambda d: d.update(fieldSpeed="2"),
                       lambda d: d["counts"].update(members=True),
                       lambda d: d["counts"].update(segments=14079),
                       lambda d: d["retainedHistories"][0].update(pathKey=2),
                       lambda d: d["retainedHistories"][1].update(polarity=1),
                       lambda d: d["retainedHistories"][0]["segments"].pop()):
            changed = deepcopy(document)
            mutate(changed)
            with self.assertRaises(checker.GuardError):
                checker.validate_identity(changed)

    def test_malformed_tokens_json_and_shape_fail_closed(self):
        for raw in (b'{"x":1,"x":2}', b'{"x":0.1}', b'{"x":NaN}', b'\xff'):
            with self.assertRaises(checker.GuardError):
                checker.parse_export(raw)
        for mutate in (lambda s: s.update(endTime="-8"), lambda s: s.update(positionError="-1"),
                       lambda s: s.update(velocityErrors=["1", "0", "0"]),
                       lambda s: s.update(coefficients=[["0"]]), lambda s: s.update(extra=1)):
            raw = segment()
            mutate(raw)
            with self.assertRaises(checker.GuardError):
                checker.parse_segment(raw)

    def test_gaps_overlaps_duplicate_ids_and_uncovered_endpoints_reject(self):
        cases = [histories([segment("-8", "0"), segment("0.01", "1")], [segment()]),
                 histories([segment("-8", "0.01"), segment("0", "1")], [segment()]),
                 histories([segment("-7", "1")], [segment()]),
                 histories([segment("-8", "0.99")], [segment()])]
        duplicate = histories([segment()], [segment()])
        duplicate[1]["id"] = duplicate[0]["id"]
        cases.append(duplicate)
        for paths in cases:
            with self.assertRaises(checker.GuardError):
                analyze(paths)

    def test_synthetic_helper_does_not_bypass_production_contract(self):
        with self.assertRaises(checker.GuardError):
            checker.analyze_guards(histories([segment()], [segment(center="1")]), production=True)
        with patch.object(checker, "MAX_RECEPTION_CELLS", 1):
            with self.assertRaisesRegex(checker.GuardError, "partition exceeds"):
                analyze(histories([segment("-8", "0.5"), segment("0.5", "1")], [segment(center="1")]))


class CaptureControls(unittest.TestCase):
    def test_same_fd_recheck_and_replacement_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "input"
            target.write_bytes(b"original")
            with checker.BoundFile(target, 32) as bound:
                self.assertEqual(bound.recheck()["sha256"], sha256(b"original").hexdigest())
                replacement = Path(directory) / "new"
                replacement.write_bytes(b"original")
                os.replace(replacement, target)
                with self.assertRaises(checker.GuardError):
                    bound.recheck()

    def test_fifo_symlink_empty_oversize_and_mutation_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            fifo, empty, big, link = (root / name for name in ("fifo", "empty", "big", "link"))
            os.mkfifo(fifo)
            empty.write_bytes(b"")
            big.write_bytes(b"0123456789")
            link.symlink_to(big)
            began = time.monotonic()
            for path in (fifo, empty, big, link):
                with self.assertRaises((checker.GuardError, OSError)):
                    with checker.BoundFile(path, 8):
                        self.fail("invalid input accepted")
            self.assertLess(time.monotonic() - began, 2)
            with checker.BoundFile(big, 32) as bound:
                big.write_bytes(b"012345678X")
                with self.assertRaises(checker.GuardError):
                    bound.recheck()

    def test_executing_generation_not_late_disk_hash(self):
        source = SCRIPT.read_bytes()
        checker.verify_executing_source(source)
        changed = source.replace(b"HEARTBEAT_SECONDS = 15", b"HEARTBEAT_SECONDS = 14")
        self.assertNotEqual(source, changed)
        with self.assertRaisesRegex(checker.GuardError, "executing instrument"):
            checker.verify_executing_source(changed)

    def test_cli_wrong_frozen_input_publishes_explicit_rejection_only(self):
        with tempfile.TemporaryDirectory() as directory:
            source, output = Path(directory) / "not-export.json", Path(directory) / "receipt.json"
            source.write_bytes(b"{}")
            child = subprocess.run([sys.executable, str(SCRIPT), "--history-export", str(source), "--out", str(output)],
                                   capture_output=True, text=True, timeout=10)
            self.assertEqual(child.returncode, 1, child.stderr)
            completion = json.loads(child.stdout)
            packet = json.loads(output.read_bytes())
            self.assertFalse(packet["accepted"])
            self.assertTrue(all(flag is False for flag in packet["claims"].values()))
            self.assertEqual(completion["receiptSha256"], sha256(output.read_bytes()).hexdigest())
            self.assertIn("frozen original export SHA-256 mismatch", packet["failures"][0]["detail"])


class PublicationControls(unittest.TestCase):
    def _packet(self):
        return {"accepted": True, "claims": {"conditionalGuard": True, "h3EvidenceEligible": False}, "failures": []}

    def test_exclusive_success_matching_hash_and_existing_output_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "receipt.json"
            with checker.ProofWatch() as watch:
                publication = checker.ReceiptPublication(target, self._packet(), watch)
                digest = publication.publish()
            self.assertEqual(digest, sha256(target.read_bytes()).hexdigest())
            self.assertLess(watch.publication_elapsed, checker.DEADLINE_SECONDS)
            original = target.read_bytes()
            with checker.ProofWatch() as watch:
                with self.assertRaises(FileExistsError):
                    checker.ReceiptPublication(target, self._packet(), watch)
            self.assertEqual(target.read_bytes(), original)

    def test_late_private_write_rejected_with_private_candidate_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "receipt.json"
            clock = [0.0]
            original = checker.write_exclusive

            def slow_write(path, packet):
                digest = original(path, packet)
                if Path(path).name == "candidate.json":
                    clock[0] = 1801.0
                return digest

            with patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]):
                with self.assertRaises(checker.GuardError):
                    with checker.ProofWatch() as watch:
                        publication = checker.ReceiptPublication(target, self._packet(), watch)
                        clock[0] = 1799.0
                        with patch.object(checker, "write_exclusive", side_effect=slow_write):
                            publication.publish()
            self.assertFalse(json.loads(target.read_bytes())["accepted"])
            self.assertTrue(json.loads(publication.candidate.read_bytes())["accepted"])
            self.assertEqual(signal.getitimer(signal.ITIMER_REAL), (0.0, 0.0))

    def test_late_final_link_retracts_only_own_public_inode(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "receipt.json"
            clock = [0.0]
            original_link = os.link

            def slow_link(source, output):
                original_link(source, output)
                if Path(source).name == "candidate.json":
                    clock[0] = 1801.0

            with patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]), patch.object(checker.os, "link", side_effect=slow_link):
                with self.assertRaises(checker.GuardError):
                    with checker.ProofWatch() as watch:
                        publication = checker.ReceiptPublication(target, self._packet(), watch)
                        publication.publish()
            self.assertFalse(json.loads(target.read_bytes())["accepted"])
            self.assertNotEqual(target.stat().st_ino, publication.candidate.stat().st_ino)

    def test_final_watch_deadline_and_interruption_retract_public_acceptance(self):
        for interrupted in (False, True):
            with self.subTest(interrupted=interrupted), tempfile.TemporaryDirectory() as directory:
                target = Path(directory) / "receipt.json"
                clock = [0.0]
                with patch.object(checker.time, "monotonic", side_effect=lambda: clock[0]):
                    with self.assertRaises((checker.GuardError, KeyboardInterrupt)):
                        with checker.ProofWatch() as watch:
                            publication = checker.ReceiptPublication(target, self._packet(), watch)
                            publication.publish()
                            if interrupted:
                                raise KeyboardInterrupt("synthetic interruption")
                            clock[0] = 1801.0
                self.assertFalse(json.loads(target.read_bytes())["accepted"])
                self.assertTrue(publication.candidate.exists())

    def test_interrupted_fsync_cannot_publish_accepted_receipt(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "receipt.json"
            original = os.fsync
            calls = [0]

            def interrupt_once(fd):
                calls[0] += 1
                if calls[0] == 1:
                    raise KeyboardInterrupt("synthetic fsync interruption")
                return original(fd)

            with patch.object(checker.os, "fsync", side_effect=interrupt_once):
                with self.assertRaises(KeyboardInterrupt):
                    with checker.ProofWatch() as watch:
                        publication = checker.ReceiptPublication(target, self._packet(), watch)
                        publication.publish()
            self.assertFalse(json.loads(target.read_bytes())["accepted"])
            self.assertTrue(publication.candidate.exists())


if __name__ == "__main__":
    unittest.main()
