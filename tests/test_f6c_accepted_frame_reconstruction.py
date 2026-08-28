"""Independent exact controls only; no actual F6c acceptance calculation.

Expected polynomial identities are hand-derived here. Synthetic metadata and
publication packets test plumbing, never scientific production acceptance.
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

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/eom/verify-f6c-accepted-frame-reconstruction.py"
SPEC = importlib.util.spec_from_file_location("f6c_reconstruction_controls", SCRIPT)
proof = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(proof)


def segment(a, b, row=("0", "0", "0", "0"), px="0", pv="0"):
    return {"startTime": a, "endTime": b, "coefficients": [list(row), ["0"]*4, ["0"]*4],
            "positionErrors": [px]*3, "velocityErrors": [pv]*3,
            "positionError": px, "velocityError": pv}


def frame(position, velocity):
    return ((F(position), F(0), F(0)), (F(velocity), F(0), F(0)))


def read_ratio(value):
    return F(int(value["numerator"]), int(value["denominator"]))


def metadata_fixture():
    """Complete structural census with non-mathematical segment placeholders."""
    labels = ("0+", "0-", "1+", "1-", "2+", "2-", "3+", "3-")
    histories, frames = [], []
    for index, label in enumerate(labels):
        histories.append({"id": label, "pathKey": index+1, "polarity": 1 if index % 2 == 0 else -1,
                          "stateFlags": 1 if index % 2 == 0 else 2,
                          "charge": ("" if index % 2 == 0 else "-") + "0.1666666666666666666666666666666667",
                          "coverageStart": "-8", "coverageEnd": "0.13",
                          "declaredPrehistorySegmentCount": 1600, "evolvedSegmentCount": 160,
                          "segments": [None]*1760})
    for index in range(81):
        micros = index*1625
        token = (f"{micros//1000000}.{micros%1000000:06d}").rstrip("0").rstrip(".")
        rows = [{"pathKey": member+1, "stateFlags": 1 if member % 2 == 0 else 2,
                 "position": {"x": "0", "y": "0", "z": "0"},
                 "velocity": {"x": "0", "y": "0", "z": "0"},
                 "positionErrorBound": "1e-10"} for member in range(8)]
        frames.append({"frameIndex": index, "time": token, "members": rows})
    return {"schema": "braid-program/f6c-retained-history-export.v1", "status": "exported-data-only",
            "runId": "f6c-balanced-tetrahedral-p0.678-n1.25-th3.36-br0.787-cp1.76-hp0.0771-hm-0.147-rp0.0463-rm-0.134-tp0.116-tm-0.254-hhp4.82-hhm2.21-hrp6-hrm3.44-v1",
            "modelFingerprint": "fnv1a64:6b87d1f138d33e13", "generatingSpec": "F6c-nonlinear-return-map-search-v2-return-continuation",
            "fieldSpeed": "1", "coupling": "10.304229970992187", "interval": {"start": "0", "end": "0.13"},
            "counts": {"members": 8, "segments": 14080, "declaredSegmentsPerMember": 1600,
                       "evolvedSegmentsPerMember": 160, "acceptedFrames": 81, "acceptedFrameIntervals": 80, "orderedPairs": 64},
            "retainedHistories": histories, "acceptedFrames": frames,
            "acceptedFrameIntervals": [{"leftFrameIndex": index, "rightFrameIndex": index+1,
                                        "startTime": frames[index]["time"], "endTime": frames[index+1]["time"]}
                                       for index in range(80)]}


class ExactMathematics(unittest.TestCase):
    def test_hermite_known_cubic_at_two_durations(self):
        # H(T)=1+2T+3T^2+4T^3: endpoints and slopes are independent integers.
        for h, right, rate in ((F(1), F(10), F(20)), (F(2), F(49), F(62))):
            self.assertEqual(proof.hermite(F(1), F(2), right, rate, h), (F(1), F(2), F(3), F(4)))
        with self.assertRaises(proof.ProofError):
            proof.hermite(F(0), F(0), F(0), F(0), F(0))
        with self.assertRaises(proof.ProofError):
            proof.hermite(F(0), F(0), F(0), F(0), 1.0)

    def test_exact_origin_translation_and_derivative(self):
        shifted = proof.shifted((F(1), F(2), F(3), F(4)), F(2))
        self.assertEqual(shifted, (F(49), F(62), F(27), F(4)))
        self.assertEqual(proof.state(shifted, F(1, 2)), (F(349, 4), F(92)))

    def test_difference_controls_are_exact_time_derivatives(self):
        position, velocity = proof.difference_controls((F(1), F(2), F(3), F(4)), F(2))
        self.assertEqual(position, (F(1), F(7, 3), F(23, 3), F(49)))
        self.assertEqual(velocity, (F(2), F(8), F(62)))

    def test_correction_controls_independently_known(self):
        position, velocity = proof.correction_controls(F(2), F(1, 6), F(-1, 3), F(1, 5), F(-2, 5))
        self.assertEqual(position, (F(1, 6), F(3, 10), F(-1, 15), F(-1, 3)))
        self.assertEqual(velocity, (F(1, 5), F(-11, 20), F(-2, 5)))

    def test_anchor_position_and_velocity_are_exact_not_midpoint(self):
        past = segment("-8", "0", px="0.1", pv="0.03")
        future = segment("0", "1", ("0.1", "0.01", "0", "0"))
        summary, audit = proof.prove_member([past, future], [F(0), F(1)],
                                             [frame("0.1", "0.01"), frame("0.11", "0.01")], prehistory_count=1)
        self.assertFalse(audit.failures)
        self.assertEqual(summary["releasePosition"][0], {"numerator": "1", "denominator": "10"})
        self.assertEqual(summary["releaseVelocity"][0], {"numerator": "1", "denominator": "100"})
        self.assertEqual(read_ratio(audit.worst["anchoredPrehistory:velocity:axis"][1]["absoluteControl"]), F(11, 400))
        self.assertEqual(audit.comparisons, 84)
        self.assertNotIn("accepted", summary)

    def test_unanchored_zero_past_does_not_prove_nonzero_anchor(self):
        past = segment("-8", "0")
        future = segment("0", "1", ("0.1", "0", "0", "0"))
        _, audit = proof.prove_member([past, future], [F(0), F(1)], [frame("0.1", "0")]*2, prehistory_count=1)
        self.assertTrue(audit.failures)
        self.assertTrue(all(item["phase"] == "anchoredPrehistory" for item in audit.failures))
        self.assertIsNone(audit.worst["anchoredPrehistory:position:axis"][0])

    def test_internal_prehistory_midpoint_and_final_anchor_are_distinct(self):
        pieces = [segment("-8", "-4", px="0.1", pv="0.12"),
                  segment("-4", "0", ("0.1", "0", "0", "0"), px="0.1", pv="0.12"),
                  segment("0", "1", ("0.2", "0", "0", "0"))]
        summary, audit = proof.prove_member(pieces, [F(0), F(1)], [frame("0.2", "0")]*2, prehistory_count=2)
        self.assertFalse(audit.failures)
        self.assertEqual(summary["prehistoryInternalJoins"], 1)
        self.assertEqual(summary["releaseAnchors"], 1)
        self.assertEqual(read_ratio(audit.worst["anchoredPrehistory:velocity:axis"][1]["absoluteControl"]), F(9, 80))

    def test_shifted_future_pieces_and_zero_allowance_fit(self):
        # H=T^2; second stored cubic has its own origin at T=1/2.
        pieces = [segment("-8", "0"), segment("0", "0.5", ("0", "0", "1", "0")),
                  segment("0.5", "1", ("0.25", "1", "1", "0"))]
        summary, audit = proof.prove_member(pieces, [F(0), F(1)], [frame("0", "0"), frame("1", "2")], prehistory_count=1)
        self.assertFalse(audit.failures)
        self.assertEqual(summary["futureContainmentCells"], 2)
        self.assertEqual(read_ratio(summary["futureCellWidthSum"]), 1)
        for _, record in audit.worst.values():
            self.assertEqual(read_ratio(record["ratio"]), 0)

    def test_shared_frame_knot_selects_next_cubic_and_checks_both_sides(self):
        pieces = [segment("-8", "0"), segment("0", "0.5", ("0", "0", "1", "0")),
                  segment("0.5", "1", ("0.25", "1", "1", "0"))]
        summary, audit = proof.prove_member(pieces, [F(0), F(1, 2), F(1)],
                                             [frame("0", "0"), frame("0.25", "1"), frame("1", "2")], prehistory_count=1)
        self.assertFalse(audit.failures)
        self.assertEqual(summary["futureFrameC1Joins"], 1)
        self.assertEqual(summary["hermiteEndpointScalarEqualities"], 24)

    def test_failed_future_bernstein_bound_is_not_necessarily_escape(self):
        # H=4T(1-T) is in [0,1], yet its interior cubic Bernstein controls are4/3.
        pieces = [segment("-8", "0", ("-32", "4", "0", "0")), segment("0", "1", px="1", pv="4")]
        _, audit = proof.prove_member(pieces, [F(0), F(1)], [frame("0", "4"), frame("0", "-4")], prehistory_count=1)
        self.assertTrue(audit.failures)
        self.assertTrue(all(row["phase"] == "acceptedFrameFuture" and row["kind"] == "position" for row in audit.failures))
        self.assertEqual(len(audit.failures), 4)
        self.assertTrue(all(read_ratio(row["signedControl"]) == F(4, 3) for row in audit.failures))

    def test_long_tokens_and_ambient_precision_do_not_round(self):
        token = "1.000000000000000000000000000001"
        for precision in (3, 28, 90):
            with localcontext() as context:
                context.prec = precision
                self.assertEqual(proof.exact(token), F(10**30+1, 10**30))
                self.assertEqual(proof.state((proof.exact(token), F(-1), F(0), F(0)), F(1))[0], F(1, 10**30))


class StructuralControls(unittest.TestCase):
    def test_full_structural_census_does_not_become_actual_evidence(self):
        document = metadata_fixture()
        histories, times, frames = proof.validate_export(document)
        self.assertEqual((len(histories), len(times), sum(map(len, frames))), (8, 81, 648))
        with self.assertRaises(proof.ProofError):
            proof.analyze_export(document)  # No actual segment polynomials in this fixture.

    def test_member_frame_interval_and_count_mutations_fail_closed(self):
        mutations = [lambda d: d["retainedHistories"].pop(),
                     lambda d: d["retainedHistories"][0]["segments"].pop(),
                     lambda d: d["retainedHistories"][0].update(charge="1/6"),
                     lambda d: d["retainedHistories"][0].update(id="0-"),
                     lambda d: d["acceptedFrames"].pop(),
                     lambda d: d["acceptedFrames"][0]["members"].pop(),
                     lambda d: d["acceptedFrames"][0]["members"][0].update(pathKey=True),
                     lambda d: d["acceptedFrames"][0]["members"][0].update(stateFlags=2),
                     lambda d: d["acceptedFrames"][0]["members"][0]["velocity"].update(x=0.0),
                     lambda d: d["acceptedFrames"][1].update(time="0"),
                     lambda d: d["acceptedFrameIntervals"][0].update(endTime="0.1"),
                     lambda d: d["counts"].update(segments=14079), lambda d: d.update(fieldSpeed="2")]
        for index, mutate in enumerate(mutations):
            document = metadata_fixture()
            mutate(document)
            with self.subTest(index=index), self.assertRaises(proof.ProofError):
                proof.validate_export(document)

    def test_frame_error_field_is_provenance_not_a_new_allowance(self):
        document = metadata_fixture()
        before = proof.validate_export(document)[2]
        document["acceptedFrames"][0]["members"][0]["positionErrorBound"] = "1000000000"
        self.assertEqual(proof.validate_export(document)[2], before)

    def test_gap_overlap_and_unaligned_frame_knots_rejected(self):
        for a in ("0.49", "0.51"):
            rows = [proof.parse_segment(segment("0", "0.5")), proof.parse_segment(segment(a, "1"))]
            with self.assertRaises(proof.ProofError):
                proof.aligned_cells(rows, [F(0), F(1)])
        with self.assertRaisesRegex(proof.ProofError, "aligned"):
            proof.aligned_cells([proof.parse_segment(segment("0", "1"))], [F(0), F(1, 2), F(1)])

    def test_exact_scalar_and_axis_radii_both_retained(self):
        source = segment("0", "1", px="0.1", pv="0.1")
        source["positionErrors"][0] = "0.100000000000000000000000000001"
        with self.assertRaises(proof.ProofError):
            proof.parse_segment(source)
        source["positionError"] = source["positionErrors"][0]
        self.assertEqual(proof.parse_segment(source)["radii"]["position"][0][0], F(100000000000000000000000000001, 10**30))

    def test_bad_decimal_json_and_shape_rejected(self):
        for value in (1, 0.0, None, True, "+1", "01", "NaN", "Infinity", "1e999999", "1/3", "1"*257):
            with self.subTest(value=value), self.assertRaises(proof.ProofError):
                proof.exact(value)
        for raw in (b'[NaN]', b'[0.1]', b'{"x":1,"x":2}', b'"\xff"'):
            with self.subTest(raw=raw), self.assertRaises(proof.ProofError):
                proof.parse_json(raw)
        for source in (segment("0", "0"), segment("1", "0")):
            with self.assertRaises(proof.ProofError):
                proof.parse_segment(source)


class BindingAndPublication(unittest.TestCase):
    def test_bound_regular_file_and_replacement_with_same_bytes(self):
        with tempfile.TemporaryDirectory() as directory:
            path, replacement = Path(directory)/"input", Path(directory)/"replacement"
            path.write_bytes(b"same")
            replacement.write_bytes(b"same")
            with proof.BoundFile(path, 16) as bound:
                self.assertEqual(bound.binding(), bound.recheck())
                os.replace(replacement, path)
                with self.assertRaises(proof.ProofError):
                    bound.recheck()

    def test_byte_change_empty_oversize_symlink_and_nonregular(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source, empty, link, fifo = (root/name for name in ("source", "empty", "link", "fifo"))
            source.write_bytes(b"abcd")
            with proof.BoundFile(source, 8) as bound:
                source.write_bytes(b"abce")
                with self.assertRaises(proof.ProofError):
                    bound.recheck()
            empty.write_bytes(b"")
            link.symlink_to(source)
            os.mkfifo(fifo)
            for target, limit in ((root, 10000), (source, 2), (empty, 8), (link, 8), (fifo, 8)):
                with self.subTest(target=target), self.assertRaises((OSError, proof.ProofError)):
                    with proof.BoundFile(target, limit):
                        self.fail("invalid file admitted")

    def test_source_code_binding_and_exclusive_output(self):
        data = SCRIPT.read_bytes()
        proof.verify_executing_source(data)
        changed = data.replace(b"15, 1800", b"15, 1801")
        self.assertNotEqual(changed, data)
        with self.assertRaises(proof.ProofError):
            proof.verify_executing_source(changed)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)/"out.json"
            proof.write_exclusive(output, {"testOnly": True, "accepted": False})
            before = output.read_bytes()
            with self.assertRaises(FileExistsError):
                proof.write_exclusive(output, {})
            self.assertEqual(output.read_bytes(), before)

    def test_fresh_cli_wrong_export_never_claims_proof_or_allows_override(self):
        with tempfile.TemporaryDirectory() as directory:
            source, output = Path(directory)/"control.json", Path(directory)/"out.json"
            source.write_text('{"testOnly":true}')
            command = [sys.executable, "-B", str(SCRIPT), "--history-export", str(source), "--out", str(output)]
            completed = subprocess.run(command, capture_output=True, text=True, timeout=10)
            self.assertEqual(completed.returncode, 1, completed.stderr)
            packet = json.loads(output.read_text())
            self.assertFalse(packet["accepted"])
            self.assertTrue(all(value is False for value in packet["claims"].values()))
            self.assertNotIn("analysis", packet)
            self.assertIn("export SHA-256 mismatch", packet["failures"][0]["detail"])
            self.assertEqual(packet["theoremsBefore"], packet["theoremsAfter"])
            self.assertEqual(packet["historyExportBefore"], packet["historyExportAfter"])
            self.assertEqual(packet["instrumentBefore"], packet["instrumentAfter"])
            completion = json.loads(completed.stdout)
            self.assertGreaterEqual(completion["publicationElapsedSeconds"], packet["proofElapsedSeconds"])
            original = output.read_bytes()
            self.assertEqual(subprocess.run(command, capture_output=True, timeout=10).returncode, 2)
            self.assertEqual(output.read_bytes(), original)
            self.assertEqual(subprocess.run(command+["--expected-sha256", "0"*64], capture_output=True, timeout=10).returncode, 2)

    def test_altered_theorem_is_rejected_before_export(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            script = root/"scripts/eom/verify-f6c-accepted-frame-reconstruction.py"
            script.parent.mkdir(parents=True)
            script.write_bytes(SCRIPT.read_bytes())
            for index, relative in enumerate(proof.THEOREMS):
                target = root/relative
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes((ROOT/relative).read_bytes() + (b"\n" if index == 0 else b""))
            output = root/"out.json"
            completed = subprocess.run([sys.executable, "-B", str(script), "--history-export", str(root/"absent"),
                                        "--out", str(output)], capture_output=True, text=True, timeout=10)
            self.assertEqual(completed.returncode, 1, completed.stderr)
            packet = json.loads(output.read_text())
            self.assertFalse(packet["accepted"])
            self.assertNotIn("historyExportBefore", packet)
            self.assertIn("theorem SHA-256 mismatch", packet["failures"][0]["detail"])

    def test_late_candidate_write_and_final_watch_exit_preserve_rejection(self):
        for failure_point in ("write", "watch-exit"):
            clock = [0]
            writer = proof.write_exclusive
            with tempfile.TemporaryDirectory() as directory, patch.object(proof.time, "monotonic", side_effect=lambda: clock[0]):
                output = Path(directory)/"out.json"
                packet = {"testOnly": True, "accepted": True, "claims": {}, "failures": []}
                def slow_write(path, value):
                    digest = writer(path, value)
                    if Path(path).name == "candidate.json" and failure_point == "write":
                        clock[0] = 1801
                    return digest
                with self.assertRaisesRegex(proof.ProofError, "deadline"):
                    with proof.Watch() as watch:
                        clock[0] = 1799
                        with patch.object(proof, "write_exclusive", side_effect=slow_write):
                            proof.Publication(output, packet, watch).publish()
                        clock[0] = 1801
                rejected = json.loads(output.read_text())
                self.assertFalse(rejected["accepted"])
                self.assertTrue(rejected["testOnly"])
                self.assertEqual(rejected["failures"][-1]["code"], "publication_rejected")
                self.assertFalse(rejected["publication"]["privateCandidateHasAuthority"])
                self.assertEqual(signal.getitimer(signal.ITIMER_REAL), (0.0, 0.0))

    def test_interrupted_publication_does_not_leave_accepted_output(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)/"out.json"
            with self.assertRaises(KeyboardInterrupt):
                with proof.Watch() as watch:
                    proof.Publication(output, {"testOnly": True, "accepted": True, "claims": {}, "failures": []}, watch).publish()
                    raise KeyboardInterrupt("synthetic publication interruption")
            self.assertFalse(json.loads(output.read_text())["accepted"])

    def test_interrupted_publication_never_removes_different_public_inode(self):
        with tempfile.TemporaryDirectory() as directory:
            output, replacement = Path(directory)/"out.json", Path(directory)/"replacement"
            replacement.write_bytes(b"independently-owned replacement")
            packet = {"testOnly": True, "accepted": True, "claims": {}, "failures": []}
            with self.assertRaises(KeyboardInterrupt):
                with proof.Watch() as watch:
                    proof.Publication(output, packet, watch).publish()
                    os.replace(replacement, output)
                    raise KeyboardInterrupt("synthetic interruption after external replacement")
            self.assertEqual(output.read_bytes(), b"independently-owned replacement")
            rejected = Path(packet["publication"]["attemptDirectory"])/"rejection.json"
            self.assertFalse(json.loads(rejected.read_text())["accepted"])


if __name__ == "__main__":
    unittest.main()
